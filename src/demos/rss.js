/**
 * Transforms a simple RSS file to some headers and links in a list.
 */

import React from 'react';
import * as fontoxpath from 'fontoxpath';
import Experience from 'xml-renderer';

const rules = new Experience();

// By default, nodes only render their children and text nodes render as text.
rules.add('self::node()', ({ traverse }) => traverse());
rules.add('self::text()', ({ node }) => node.nodeValue);

// The <title> XML element translates to a HTML <h1>
rules.add('self::title', ({ traverse }) => <h1>{traverse()}</h1>);

// The <channel> is like the document root, and we want to present the title + description of it, followed by a list of
// RSS items.
rules.add('self::channel', ({ traverse }) => (
	<div>
		{traverse('./title')}
		{traverse('./description')}
		<ul>{traverse('./item')}</ul>
	</div>
));

// For each <item>, show the title and a subtitle of the publication date (+ link), followed by a paragraph of the
// item description.
rules.add('self::item', ({ traverse, node }) => (
	<li>
		<p>
			{traverse('./title')}
			<br />
			<span className="dim">
				({fontoxpath.evaluateXPathToString('./pubDate', node)},{' '}
				<a href={fontoxpath.evaluateXPathToString('./link', node)} target="_blank">
					visit
				</a>
				)
			</span>
		</p>

		<p>{traverse('./description')}</p>
	</li>
));

// A <title> is rendered differently between when it occurs in a <channel> or an <item>
rules.add('self::title[parent::item]', ({ traverse }) => <strong>{traverse()}</strong>);

export default rules;
