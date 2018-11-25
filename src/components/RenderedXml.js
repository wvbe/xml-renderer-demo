import React from 'react';
import parser from 'slimdom-sax-parser';

import RenderedNode from './RenderedNode';

export default function RenderedXml ({ xml, ...additionalProps }) {
	try {
		parser.sync(xml.toString().trim());
	} catch (e) {
		throw e;
	}
	return <RenderedNode { ...additionalProps } node={ parser.sync(xml.toString().trim()) } />;
};
