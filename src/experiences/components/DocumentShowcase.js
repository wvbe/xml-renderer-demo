/**
 * A wrapper for the Storybook stories, with tabs to see the rendering or XML source for each demonstrated document.
 */
import './DocumentShowcase.css';

import React, { Component } from 'react';

import DocumentFromPublicDir from './DocumentFromPublicDir';
import sourceViewExperience from '../sourceViewExperience';
import Spinner from '../../styling/Spinner';

export default class DocumentShowcase extends Component {
	tabs = [
		'source',
		'render'
	];

	state = {
		showSpinner: true,
		activeWindow: null,
		activeTab: 'render'
	};

	switchToTab (tab) {
		this.setState({
			showSpinner: true,
			activeTab: tab,
			activeWindow: null
		}, () => setTimeout(() => this.setState({
			showSpinner: false,
			activeWindow: tab
		}), 100));
	}

	getContentForTab = (tabName) => {
		const { documentId, experience } = this.props;

		switch (tabName) {
			case 'source':
				return <DocumentFromPublicDir
					documentId={ documentId }
					experience={ sourceViewExperience }
					forceDocumentIsLoading={ this.state.showSpinner }
				/>;

			case 'render':
				return <DocumentFromPublicDir
					documentId={ documentId }
					experience={ experience || flatEarthExperience }
					documentIsLoading={ this.state.showSpinner || undefined }
				/>;

			default:
				return <Spinner />;
		}
	}

	componentDidMount () {
		this.switchToTab('render');
	}
	render () {
		return <div className='document-showcase-root'>
			<div className='document-showcase-tabs'>
				{ this.tabs.map(tab => <div
					key={ tab }
					className={ tab === this.state.activeTab ? 'selected' : null }
					onClick={ () => this.switchToTab(tab) }
				>{ tab }</div>) }
				{ this.props.documentId }
			</div>
			<div className='document-showcase-content'>
				<div>
					{ this.getContentForTab(this.state.activeWindow) }
				</div>
			</div>
		</div>;
	}
}