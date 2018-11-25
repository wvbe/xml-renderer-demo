import React, { PureComponent } from 'react';

import RenderedError from './RenderedError';
import RenderedXml from './RenderedXml';

export default function RenderedDocument ({
	documentId,
	documentError,
	documentContent,
	documentIsLoading,
	...additionalProps
}) {
	if (documentIsLoading) {
		// Returning <div> or anyother default may briefly confuse
		// React if this document is "conreffed" inside a table
		return null;
	}

	if (documentError) {
		return <RenderedError {...documentError} documentId={documentId} />;
	}

	return <RenderedXml {...additionalProps} xml={ documentContent } />;
};

export function withSyncDocumentLoader (getDocument, DocumentComponent) {
	return function ({ documentId, ...additionalProps }) {
		let response = null;
		let error = null;
		try {
			response = getDocument(documentId);
		}
		catch (err) {
			error = err;
		}

		const projectedError = error || response.error || null;
		const projectedContent = !projectedError ? response.content : null;

		return <DocumentComponent
			{ ...additionalProps }
			documentId={ documentId }
			documentContent={ projectedContent }
			documentError={ projectedError }
			documentIsLoading={ false }
		/>
	}
};

export function withAsyncDocumentLoader (getDocument, DocumentComponent) {
	return class AsyncRenderedDocument extends PureComponent {
		documentId = null;
		componentIsMounted = false;

		state = {
			loading: true,
			error: null,
			content: null
		};

		getDocument = (documentId) => {
			if (!this.componentIsMounted) {
				return;
			}

			this.documentId = documentId;

			this.setState({
				loading: true
			});

			return getDocument(documentId)
				.then(({ documentId: responseDocumentId, error, content }) => {
					if (!this.componentIsMounted || this.documentId !== responseDocumentId) {
						console.log(this.componentIsMounted, this.documentId, responseDocumentId)
						return;
					}

					this.setState({
						content: error ? null : content,
						error: error ? error : null,
						loading: false
					});
				})
				.catch(error => {
					if (!this.componentIsMounted) {
						return;
					}

					this.setState({
						content: null,
						error: error,
						loading: false
					});
				});
		}

		componentDidMount () {
			this.componentIsMounted = true;
			this.getDocument(this.props.documentId);
		}

		componentWillUnmount () {
			this.componentIsMounted = false;
		}

		componentDidUpdate () {
			if (this.documentId === this.props.documentId) {
				return;
			}
			// When the documentId prop changed, make new async request
			this.getDocument(this.props.documentId)
		}

		render () {
			const { content, error, loading } = this.state;

			return <DocumentComponent
				{ ...this.props }
				documentContent={ error ? null : content }
				documentError={ error ? error : null }
				documentIsLoading={ loading }
			/>;
		}
	}
}

export function withEventBasedDocumentLoader (onBindEvents, DocumentComponent) {
	return class EventBasedRenderedDocument extends PureComponent {
		unbindLast = null;
		componentIsMounted = false;

		state = {
			loading: true,
			error: null,
			content: null
		};

		bindEvents = (documentId) => {
			const unbindLast = onBindEvents(
				documentId,
				({ documentId, content }) => {
					if (!this.componentIsMounted || documentId !== this.documentId) {
						return false;
					}

					this.setState({
						content: content,
						error: null,
						loading: false
					});
				},
				(error) => {
					if (!this.componentIsMounted) {
						return;
					}

					this.setState({
						content: null,
						error: error,
						loading: false
					});
				});

			if (typeof unbindLast !== 'function') {
				throw new Error('Your onBindEvents callback must return a function to unbind listeners');
			}

			this.documentId = documentId;
			this.unbindLast = unbindLast;
		}

		componentDidMount () {
			this.componentIsMounted = true;
			this.bindEvents(this.props.documentId);
		}
		componentWillUnmount () {
			this.componentIsMounted = false;
			this.unbindLast();
		}
		componentDidUpdate () {
			if (this.documentId === this.props.documentId) {
				return;
			}
			this.unbindLast();

			// When the documentId prop changed, make new async request
			this.bindEvents(this.props.documentId);
		}

		render () {
			const { content, error, loading } = this.state;

			return <DocumentComponent
				{...this.props}
				documentContent={ error ? null : content }
				documentError={ error ? error : null }
				documentIsLoading={ loading }
			/>;
		}
	}
}