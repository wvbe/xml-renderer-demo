/**
 * Transforms the XML W3C recommendation, which is published in XML, to an HTML page that approximates the functionality
 * of the W3C's webpage.
 *
 * - Contains a clickable table of contents generated from the XML
 * - Section headers are dynamically numbered
 * - Cross references to sections, term definitions, etc.
 */

import React from 'react';
import Experience, { getKeyForNode } from 'xml-renderer';
import * as fontoxpath from 'fontoxpath';

/**
 * A useless transformation of XML to flat text.
 */

const rules = new Experience();

// Nodes only render their children
rules.add('self::document', ({ traverse }) => traverse());
rules.add('self::node()', ({ traverse }) => traverse());

// Text nodes render as their text value, since they can not contain anything else.
rules.add('self::text()', ({ node }) => node.nodeValue);

// An XPath test to assert wether a node is one of the elements that determine this document's hierarchy of sections.
// I'd die for the DRY.
const isDivElement = 'self::div1 or self::div2 or self::div3';

/**
 * Get the section number (eg. "1.2.2") for a given node. This function is useful for rendering the title of a section.
 * @param {Node} node
 * @returns {string}
 */
function getDivNumber(node) {
	return fontoxpath
		.evaluateXPathToNodes(`./ancestor-or-self::*[${isDivElement}]`, node)
		.map((divNode) =>
			fontoxpath.evaluateXPathToNumber(
				`count(preceding-sibling::*[${isDivElement}])`,
				divNode
			)
		)
		.map((number) => number + 1)
		.join('.');
}

/*
 * Regular content, inlines, and elements that are a one-to-one translation to HTML
 */
const oneToOneTranslationMapping = {
	'self::p': 'p',
	'self::olist': 'ol',
	'self::ulist': 'ul',
	'self::item': 'li',
	'self::emph': 'em',
	'self::code': 'code',
	'self::eg': 'pre',
	'self::glist': 'dl',
	'self::label': 'dt',
	'self::def': 'dd',
};
Object.keys(oneToOneTranslationMapping).forEach((xPathTest) =>
	rules.add(xPathTest, ({ traverse }) =>
		React.createElement(oneToOneTranslationMapping[xPathTest], {}, traverse())
	)
);

rules.add('self::quote', ({ traverse }) => ['"', ...traverse(), '"']);

rules.add('self::term', ({ traverse }) => (
	<span
		style={{
			color: 'green',
			fontWeight: 'bold',
		}}
	>
		{traverse()}
	</span>
));

rules.add('self::rfc2119', ({ traverse }) => (
	<span
		style={{
			fontVariant: 'small-caps',
			textTransform: 'lowercase',
		}}
	>
		{traverse()}
	</span>
));

/*
 * Different kind of notes, each with a border
 */
rules.add('self::wfcnote', ({ traverse }) => (
	<div
		style={{
			padding: '0em 1em',
			border: '1px solid blue',
			marginBottom: '1em',
		}}
	>
		{traverse()}
	</div>
));

rules.add('self::vcnote', ({ traverse }) => (
	<div
		style={{
			padding: '0em 1em',
			border: '1px solid red',
			marginBottom: '1em',
		}}
	>
		{traverse()}
	</div>
));

rules.add('self::scrap', ({ traverse }) => (
	<div
		style={{
			padding: '0em 1em',
			border: '1px solid green',
			marginBottom: '1em',
		}}
	>
		{traverse('./head')}
		<table style={{ fontFamily: 'monospace', marginBottom: '1em' }}>
			<tbody>{traverse('./*[self::prod or self::prodgroup]')}</tbody>
		</table>
	</div>
));

rules.add('self::prod', ({ traverse, node }) => (
	<tr>
		<td>
			<a name={fontoxpath.evaluateXPathToString('string(@id)', node)} />[
			{fontoxpath.evaluateXPathToString('string(./@num)', node)}]
		</td>
		<td>{traverse('./lhs')}</td>
		<td>::=</td>
		<td>{traverse('./rhs')}</td>
	</tr>
));

/*
 * Structural elements
 */
// <div1>, <div2> and <div3>, which might as well be all the same if you ask me.
rules.add(isDivElement, ({ node, traverse }) => {
	const key = getKeyForNode(node);

	return (
		<div
			style={{
				paddingLeft: '1em',
				borderLeft: '0.5em solid #eeeeee',
				transform: 'translateX(-0.5em)',
			}}
		>
			<a name={key} />
			{traverse()}
		</div>
	);
});

rules.add('self::head[parent::div1]', ({ traverse, node }) => (
	<h1>
		{getDivNumber(node) + ' '}
		{traverse()}
	</h1>
));

rules.add('self::head[parent::div2]', ({ traverse, node }) => (
	<h2>
		{getDivNumber(node) + ' '}
		{traverse()}
	</h2>
));

rules.add('self::head[parent::div3]', ({ traverse, node }) => (
	<h3>
		{getDivNumber(node) + ' '}
		{traverse()}
	</h3>
));

rules.add(
	'self::head[parent::vcnote or parent::wfcnote or parent::scrap]',
	({ traverse, node }) => <h4>{traverse()}</h4>
);

/*
 * Document outline, table of contents
 */
// Use a secondary Experience to render the document as a hierarchical table of contents
const toc = new Experience();
toc.add('self::body', ({ traverse }) => traverse());
toc.add(isDivElement, ({ traverse, node }) => {
	const key = getKeyForNode(node);
	return (
		<li>
			<p style={{ margin: 0 }}>
				{getDivNumber(node) + ' '}
				<a href={'#' + key} target="_self">
					{fontoxpath.evaluateXPathToString('string(./head)', node)}
				</a>
			</p>
			{fontoxpath.evaluateXPathToBoolean(`./*[${isDivElement}]`, node) ? (
				<ul>{traverse(`./*[${isDivElement}]`)}</ul>
			) : null}
		</li>
	);
});

rules.add('self::spec', ({ traverse }) => (
	<div>
		{traverse('./header')}
		<div>
			<h1>Table of contents</h1>
			<ul></ul>
		</div>
		{traverse('./body')}
	</div>
));

/*
 * Front matter
 */
rules.add('self::header', ({ traverse }) => (
	<div>
		<h1>
			{traverse('./title')} {traverse('./version')}
		</h1>
		<h2>
			{traverse('./w3c-doctype')} {traverse('./pubdate/day')} {traverse('./pubdate/month')}{' '}
			{traverse('./pubdate/year')}
		</h2>
		<dl>
			<dt>This version</dt>
			<dd>{traverse('./publoc')}</dd>
			<dt>Latest version</dt>
			<dd>{traverse('./latestloc')}</dd>
			<dt>Previous versions</dt>
			<dd>{traverse('./prevlocs')}</dd>
			<dt>Editors</dt>
			<dd>
				<ul>{traverse('./authlist/author')}</ul>
			</dd>
		</dl>
		<div>
			<h1>Abstract</h1>
			{traverse('./abstract')}
		</div>
		<div>
			<h1>Status of this document</h1>
			{traverse('./status')}
		</div>
	</div>
));

rules.add('self::author', ({ traverse, node }) => (
	<li>
		{traverse('./name')}
		{fontoxpath.evaluateXPathToBoolean('boolean(./affiliation)', node) ? ', ' : null}
		{traverse('./affiliation')}
		{fontoxpath.evaluateXPathToBoolean('boolean(./email)', node)
			? [' <', traverse('./email'), '>']
			: null}
	</li>
));

/*
 * Different kinds of references and cross links
 */
// Refers to external sources
rules.add('self::loc[@href] or self::email[@href]', ({ traverse, node }) => (
	<a href={fontoxpath.evaluateXPathToString('./@href', node)} target="_blank">
		{traverse()}
	</a>
));

// Refers to a <prod>
rules.add('self::nt[@def]', ({ traverse, node }) => (
	<a href={'#' + fontoxpath.evaluateXPathToString('./@def', node)} target="_self">
		{traverse()}
	</a>
));

// Refers to a <div1>, <div2> or <div3>
rules.add('self::titleref[@href]', ({ traverse, node }) => (
	<a
		href={
			'#' +
			getKeyForNode(
				fontoxpath.evaluateXPathToFirstNode(
					`//*[@id="${node.getAttribute('href').substr(1)}"][1]`,
					node
				)
			)
		}
		target="_self"
		style={{ fontStyle: 'italic' }}
	>
		{traverse()}
	</a>
));

// @TODO: Make clickable
// Refers to a <termdef>
rules.add('self::termref', ({ traverse }) => (
	<span
		style={{
			color: 'green',
			textDecoration: 'underline',
		}}
	>
		{traverse()}
	</span>
));

export default rules;
