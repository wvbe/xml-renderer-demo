/* eslint-disable no-mixed-operators */

import React, { PureComponent } from 'react';

export default function RenderedError ({ documentId, error, ...restProps }) { //documentId, message, stack, code, componentStack }) {
	const e = error || restProps;
	return <div>
		<h1>ERROR</h1>
		{
			documentId ?
				<p>An error occurred while rendering document <code>{documentId}</code>.</p> :
				<p>An error occurred.</p>
		}

		{ e.message && <p><b>{e.message}</b></p> || null }

		{ e.code && <p><b>Code: {e.code}</b></p> || null }

		{ e.stack && <pre>{e.stack}</pre> || null }

		{ e.componentStack && <pre>{e.componentStack}</pre> || null }
	</div>;
}

export function withCatch (Comp) {
	return class CaughtComponent extends PureComponent {
		state = {
			error: null
		};

		componentDidCatch (error, info) {
			console.log('Catching error', error);
			this.unseen = true;
			this.setState({
				error: {
					message: error.message,
					code: error.code,
					stack: error.stack,
					componentStack: info.componentStack
				}
			});
		}

		render () {
			if (this.state.error && this.unseen) {
				this.unseen = false;
				return <RenderedError documentId={ this.props.documentId } {...this.state.error} />
			}

			return <Comp {...this.props} />;
		}
	}
}