import React from 'react';
import parser from 'slimdom-sax-parser';

import RenderedNode from './RenderedNode';

export default function RenderedXml ({ xml, ...additionalProps }) {
	const xmlString = xml
		.toString()
		// .replace(/\<\?xml.+\?\>/s, '')
		// .replace(/\<\!--.+-->/s, '')
		// .replace(/\<\!DOCTYPE.+]\>/s, '')
		.trim();
	console.log('xmlString', xmlString.substr(0, 128))
	return <RenderedNode { ...additionalProps } node={ parser.sync(xmlString) } />;
};
