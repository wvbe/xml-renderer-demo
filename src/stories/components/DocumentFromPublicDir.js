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

