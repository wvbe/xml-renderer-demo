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
import * as fontoxpath from 'fontoxpath';

import flatEarthExperience from './flatEarthExperience';

// An XPath test to assert wether a node is one of the elements that determine this document's hierarchy of sections.
// I'd die for the DRY.
const isDivElement = 'self::div1 or self::div2 or self::div3';

/**
 * Get the section number (eg. "1.2.2") for a given node. This function is useful for rendering the title of a section.
 * @param {Node} node
 * @returns {string}
 */
function getDivNumber (node) {
	return fontoxpath.evaluateXPathToNodes(`./ancestor-or-self::*[${isDivElement}]`, node)
		.map(divNode => fontoxpath.evaluateXPathToNumber(`count(preceding-sibling::*[${isDivElement}])`, divNode))
		.map(number => number + 1)
		.join('.');
}

const xp = new Experience(
	// This experience can use components from another Experience
	flatEarthExperience
);

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
	'self::def': 'dd'
};
Object.keys(oneToOneTranslationMapping).forEach(
	xPathTest => xp.register(xPathTest, ({ key, traverse }) => React.createElement(
		oneToOneTranslationMapping[xPathTest],
		{ key: key() },
		traverse()
	)));

xp.register('self::quote', ({ key, traverse }) => [
	'"',
	...traverse(),
	'"'
]);

xp.register('self::term', ({ key, traverse }) => <span key={ key() } style={{
	color: 'green',
	fontWeight: 'bold'
}}>
	{ traverse() }
</span>);

xp.register('self::rfc2119', ({ key, traverse }) => <span key={ key() } style={{
	fontVariant: 'small-caps',
	textTransform: 'lowercase'
}}>
	{ traverse() }
</span>);

/*
 * Different kind of notes, each with a border
 */
xp.register('self::wfcnote', ({ key, traverse }) => <div key={ key() } style={{
	padding: '0em 1em',
	border: '1px solid blue',
	marginBottom: '1em'
}}>
	{ traverse() }
</div>);

xp.register('self::vcnote', ({ key, traverse }) => <div key={ key() } style={{
	padding: '0em 1em',
	border: '1px solid red',
	marginBottom: '1em'
}}>
	{ traverse() }
</div>);

xp.register('self::scrap', ({ key, traverse }) => <div key={ key() } style={{
	padding: '0em 1em',
	border: '1px solid green',
	marginBottom: '1em'
}}>
	{ traverse('./head') }
	<table style={{ fontFamily: 'monospace', marginBottom: '1em' }}>
		<tbody>
			{ traverse('./*[self::prod or self::prodgroup]') }
		</tbody>
	</table>
</div>);

xp.register('self::prod', ({ key, traverse, query }) => <tr key={ key() }>
	<td>
		<a name={ query('string(@id)') } />
		[{ query('string(./@num)') }]
	</td>
	<td>{ traverse('./lhs') }</td>
	<td>::=</td>
	<td>{ traverse('./rhs') }</td>
</tr>);

/*
 * Structural elements
 */
// <div1>, <div2> and <div3>, which might as well be all the same if you ask me.
xp.register(isDivElement, ({ key, traverse }) => <div key={ key() } style={{
	paddingLeft: '1em',
	borderLeft: '0.5em solid #eeeeee',
	transform: 'translateX(-0.5em)'
}}>
	<a name={ key() } />
	{ traverse() }
</div>);

xp.register('self::head[parent::div1]', ({ key, traverse, node }) => <h1 key={ key() }>
	{ getDivNumber(node()) + ' ' }
	{ traverse() }
</h1>);

xp.register('self::head[parent::div2]', ({ key, traverse, node }) => <h2 key={ key() }>
	{ getDivNumber(node()) + ' ' }
	{ traverse() }
</h2>);

xp.register('self::head[parent::div3]', ({ key, traverse, node }) => <h3 key={ key() }>
	{ getDivNumber(node()) + ' ' }
	{ traverse() }
</h3>);

xp.register('self::head[parent::vcnote or parent::wfcnote or parent::scrap]', ({ key, traverse, node }) => <h4 key={ key() }>
	{ traverse() }
</h4>);

/*
 * Document outline, table of contents
 */
// Use a secondary Experience to render the document as a hierarchical table of contents
const toc = new Experience();
toc.register('self::body', ({ traverse }) => traverse());
toc.register(isDivElement, ({ key, query, traverse, node }) => <li key={ key() + '-item' }>
	<p style={{ margin: 0 }}>
		{ getDivNumber(node()) + ' ' }
		<a href={ '#' + key() } target='_self'>
			{ query('string(./head)') }
		</a>
	</p>
	{
		query(`boolean(./*[${isDivElement}])`) ?
			<ul key={ key() + '-list' }>
				{ traverse(`./*[${isDivElement}]`) }
			</ul> :
			null
	}
</li>);

xp.register('self::spec', ({ key, traverse, query }) => <div key={ key() }>
	{ traverse('./header') }
	<div>
		<h1>Table of contents</h1>
		<ul>

		</ul>
	</div>
	{ traverse('./body') }
</div>);

/*
 * Front matter
 */
xp.register('self::header', ({ key, traverse }) => <div key={ key() }>
	<h1>{ traverse('./title') } { traverse('./version') }</h1>
	<h2>
		{ traverse('./w3c-doctype') }{' '}
		{ traverse('./pubdate/day') }{' '}
		{ traverse('./pubdate/month') }{' '}
		{ traverse('./pubdate/year') }
	</h2>
	<dl>
		<dt>This version</dt>
		<dd>{ traverse('./publoc') }</dd>
		<dt>Latest version</dt>
		<dd>{ traverse('./latestloc') }</dd>
		<dt>Previous versions</dt>
		<dd>{ traverse('./prevlocs') }</dd>
		<dt>Editors</dt>
		<dd>
			<ul>
				{ traverse('./authlist/author') }
			</ul>
		</dd>
	</dl>
	<div>
		<h1>Abstract</h1>
		{ traverse('./abstract') }
	</div>
	<div>
		<h1>Status of this document</h1>
		{ traverse('./status') }
	</div>
</div>);

xp.register('self::author', ({ key, traverse, query }) => <li key={ key() }>
	{ traverse('./name') }
	{ query('boolean(./affiliation)') ? ', ' : null}
	{ traverse('./affiliation') }
	{ query('boolean(./email)') ?
		[' <', traverse('./email'), '>'] :
		null
	}
</li>);

/*
 * Different kinds of references and cross links
 */
// Refers to external sources
xp.register('self::loc[@href] or self::email[@href]', ({ key, traverse, query }) => <a
key={ key() }
href={ query('./@href')}
target='_blank'
>
{ traverse() }
</a>);

// Refers to a <prod>
xp.register('self::nt[@def]', ({ key, traverse, query }) => <a
	key={ key() }
	href={ '#' + query('./@def')}
	target='_self'
>
	{ traverse() }
</a>);

// Refers to a <div1>, <div2> or <div3>
xp.register('self::titleref[@href]', ({ key, traverse, node, query }) => <a
	key={ key() }
	href={'#' + Experience.getKeyForNode(query(`//*[@id="${node().getAttribute('href').substr(1)}"][1]`))}
	target='_self'
	style={{ fontStyle: 'italic' }}
>
		{ traverse() }
</a>);

// @TODO: Make clickable
// Refers to a <termdef>
xp.register('self::termref', ({ key, traverse, query }) => <span key={ key() } style={{
	color: 'green',
	textDecoration: 'underline'
}}>
	{ traverse() }
</span>);

export default xp;