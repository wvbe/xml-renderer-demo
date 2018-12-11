import React from 'react';
import Experience from 'xml-renderer';

const xp = new Experience();

xp.register('self::text()', ({ node }) => node().nodeValue);

xp.register('self::node()', ({ traverse }) => traverse());

xp.register('self::title', ({ key, traverse }) => <h1 key={ key() }>
	{ traverse() }
</h1>);

xp.register('self::channel', ({ key, traverse }) => <div key={ key() }>
	{ traverse('./title') }
	{ traverse('./description') }
	<ul>
		{ traverse('./item') }
	</ul>
</div>);

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

xp.register('self::title[parent::item]', ({ key, traverse }) => <strong key={ key() }>
	{ traverse() }
</strong>);


export default xp;