/**
 * A wrapper for the Storybook stories, with tabs to see the rendering or XML source for each demonstrated document.
 */
import './DocumentShowcase.css';

import React, { Component } from 'react';

import DocumentFromPublicDir from './DocumentFromPublicDir';
import sourceViewExperience from '../sourceViewExperience';

export default class DocumentShowcase extends Component {
	tabs = [
		'source',
		'render'
	];

	state = {
		activeWindow: 'render'
	};

	switchToTab (tab) {
		this.setState({
			activeWindow: tab
		});
	}

	getContentForTab = (tabName) => {
		const { documentId, experience } = this.props;

		switch (tabName) {
			case 'source':
				return <DocumentFromPublicDir
					documentId={ documentId }
					experience={ sourceViewExperience }
				/>;

			case 'render':
				return <DocumentFromPublicDir
					documentId={ documentId }
					experience={ experience || flatEarthExperience }
				/>;

			default:
				return <p>Please select a tab!</p>;
		}
	}

	render () {
		return <div className='document-showcase-root'>
			<div className='document-showcase-tabs'>
				{ this.tabs.map(tab => <div
					key={ tab }
					className={ tab === this.state.activeWindow ? 'selected' : null }
					onClick={ () => this.switchToTab(tab) }
				>{ tab }</div>) }
			</div>
			<div className='document-showcase-content'>
				<div>
					{ this.getContentForTab(this.state.activeWindow) }
				</div>
			</div>
		</div>;
	}
}