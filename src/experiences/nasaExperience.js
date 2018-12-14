/**
 * Transforms a simple RSS file to some headers and links in a list.
 */

import React from 'react';
import Experience from 'xml-renderer';

const xp = new Experience();

// By default, nodes only render their children and text nodes render as text.
xp.register('self::node()', ({ traverse }) => traverse());
xp.register('self::text()', ({ node }) => node().nodeValue);

// The <title> XML element translates to a HTML <h1>
xp.register('self::title', ({ key, traverse }) => <h1 key={ key() }>
	{ traverse() }
</h1>);

// The <channel> is like the document root, and we want to present the title + description of it, followed by a list of
// RSS items.
xp.register('self::channel', ({ key, traverse }) => <div key={ key() }>
	{ traverse('./title') }
	{ traverse('./description') }
	<ul>
		{ traverse('./item') }
	</ul>
</div>);

// For each <item>, show the title and a subtitle of the publication date (+ link), followed by a paragraph of the
// item description.
xp.register('self::item', ({ key, traverse, query }) => <li key={ key() }>
	<p>
		{ traverse('./title') }
		<br />
		<span className='dim'>
			({query('./pubDate/string()')}, <a href={query('./link/string()')} target='_blank'>visit</a>)
		</span>
	</p>

	<p>{ traverse('./description') }</p>
</li>);

// A <title> is rendered differently between when it occurs in a <channel> or an <item>
xp.register('self::title[parent::item]', ({ key, traverse }) => <strong key={ key() }>
	{ traverse() }
</strong>);

export default xp;