/**
 * This component wraps a promised fetch from the `public/xml/` directory into some more generic convenience components
 * so that XML is rendered to browser DOM. This is the primitive component to render documents and referenced documents
 * served from a static file dir.
 *
 * Also, will not make the same fetch twice.
 */
import React from 'react';
import { withAsyncDocumentLoader } from '../../components/RenderedDocument';
import RenderedXml from '../../components/RenderedXml';
import RenderedError, { withCatch } from '../../components/RenderedError';
import Spinner from '../../styling/Spinner';

const cacheResponseByDocumentId = {};

function pathRelativeResolve (referringDocument, targetDocument) {
	const referringPoints = referringDocument.split('/');

	('../' + targetDocument).split('/').forEach(step => {
		if (step === '.' || !step) {
			return;
		}
		else if (step === '..') {
			referringPoints.pop();
		}
		else {
			referringPoints.push(step);
		}
	});

	return referringPoints.join('/')
}

/**
 * React component that replaces RenderedDocument in order to add a loader and the "forceDocumentIsLoading" prop
 */
function StorybookRenderedDocument ({
	documentId,
	documentError,
	documentContent,
	documentIsLoading,
	forceDocumentIsLoading,
	...additionalProps
}) {
	if (forceDocumentIsLoading || documentIsLoading) {
		// Returning <div> or anyother default may briefly confuse
		// React if this document is "conreffed" inside a table
		return <Spinner />;
	}

	if (documentError) {
		return <RenderedError error={ documentError } documentId={documentId} />;
	}

	return <RenderedXml
		{...additionalProps}
		xml={ documentContent }

		// Pass the "resolve" render data, which is a function to resolve relative references from the context of
		// this documentId. That reference can then be used to load images, other documents, etc.
		resolve={ (relativeUrl) => pathRelativeResolve(documentId, relativeUrl) }
	/>;
};

function urlOrFromStaticDir (ref) {
	if (ref.indexOf('http://') === 0 || ref.indexOf('https://') === 0) {
		return ref;
	}
	return 'xml/' + ref;
}

export default withAsyncDocumentLoader(
	(documentId) => cacheResponseByDocumentId[documentId] ?
		Promise.resolve(cacheResponseByDocumentId[documentId]) :
		fetch(urlOrFromStaticDir(documentId), {
				method: 'GET',
				mode: 'cors',
				cache: 'no-cache',
				// credentials: 'include'
			})
			.then(response => {
				if (!response.ok) {
					throw new Error('The response for ' + documentId + ' was not OK');
				}
				return response.text();
			})
			.then(content => {
				cacheResponseByDocumentId[documentId] = { documentId, content: content.trim() };
				return cacheResponseByDocumentId[documentId];
			}),
	withCatch(StorybookRenderedDocument));

