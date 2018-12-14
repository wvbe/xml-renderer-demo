/**
 * Transforms the XML W3C recommendation, which is published in XML, to an HTML page that approximates the functionality
 * of the W3C's webpage.
 *
 * - Contains a clickable table of contents generated from the XML
 * - Section headers are dynamically numbered
 * - Cross references to sections, term definitions, etc.
 */

import React from 'react';
import Experience from 'xml-renderer';

import flatEarthExperience from './flatEarthExperience';
import { renderTypography } from '../styling/Typography';

const xp = new Experience(
	flatEarthExperience
);

xp.register('self::section', renderTypography({
	padding: 'reasonable'
}));

xp.register('self::title', renderTypography({
	extraBold: true,
	slightlyLarger: true
}));

xp.register('self::p', renderTypography({
}));
xp.register('self::codeblock', renderTypography({
	preformatted: true,
	padding: 'reasonable'
}));
xp.register('self::filepath', renderTypography({
	monospace: true,
	inline: true
}));

xp.register('self::li', renderTypography({
	bullet: 'normal'
}));


xp.register('self::ph', renderTypography({
	inline: true,
	italic: true
}));



export default xp;