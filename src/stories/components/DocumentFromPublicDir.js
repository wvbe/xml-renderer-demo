/**
 * This component wraps a promised fetch from the `public/xml/` directory into some more generic convenience components
 * so that XML is rendered to browser DOM. This is the primitive component to render documents and referenced documents
 * served from a static file dir.
 *
 * Also, will not make the same fetch twice.
 */

import RenderedDocument, { withAsyncDocumentLoader } from '../../components/RenderedDocument';
import { withCatch } from '../../components/RenderedError';

const cacheResponseByDocumentId = {};

export default withAsyncDocumentLoader(
	(documentId) => cacheResponseByDocumentId[documentId] ?
		Promise.resolve(cacheResponseByDocumentId[documentId]) :
		fetch('xml/' + documentId)
			.then(response => response.text())
			.then(content => {
				cacheResponseByDocumentId[documentId] = { documentId, content };
				return cacheResponseByDocumentId[documentId];
			}),
	withCatch(RenderedDocument));

