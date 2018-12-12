/**
 * This component wraps a promised fetch from the `public/xml/` directory into some more generic convenience components
 * so that XML is rendered to browser DOM. This is the primitive component to render documents and referenced documents
 * served from a static file dir.
 *
 * Also, will not make the same fetch twice.
 */
import './DocumentFromPublicDir.css';
import React from 'react';
import { withAsyncDocumentLoader } from '../../components/RenderedDocument';
import RenderedXml from '../../components/RenderedXml';
import RenderedError, { withCatch } from '../../components/RenderedError';

const cacheResponseByDocumentId = {};

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
		return <div className='loader' />;
	}

	if (documentError) {
		return <RenderedError {...documentError} documentId={documentId} />;
	}

	return <RenderedXml {...additionalProps} xml={ documentContent } />;
};

export default withAsyncDocumentLoader(
	(documentId) => cacheResponseByDocumentId[documentId] ?
		Promise.resolve(cacheResponseByDocumentId[documentId]) :
		fetch('xml/' + documentId)
			.then(response => response.text())
			.then(content => {
				cacheResponseByDocumentId[documentId] = { documentId, content };
				return cacheResponseByDocumentId[documentId];
			}),
	withCatch(StorybookRenderedDocument));

