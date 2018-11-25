/* eslint-disable no-mixed-operators */

import React, { PureComponent } from 'react';

export default function RenderedError ({ documentId, message, stack, code, componentStack }) {
	return <div>
		<h1>ERROR</h1>
		{
			documentId ?
				<p>An error occurred while rendering document <code>{documentId}</code>.</p> :
				<p>An error occurred.</p>
		}

		{ message && <p><b>{message}</b></p> || null }

		{ code && <p><b>Code: {code}</b></p> || null }

		{ stack && <pre>{stack}</pre> || null }

		{ componentStack && <pre>{componentStack}</pre> || null }
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
				return <RenderedError {...this.state.error} />
			}

			return <Comp {...this.props} />;
		}
	}
}