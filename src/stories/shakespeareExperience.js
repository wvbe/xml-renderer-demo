import React from 'react';
import Experience from 'xml-renderer';

const xp = new Experience();

xp.register('self::text()', ({ node }) => node().nodeValue);

xp.register('self::node()', ({ traverse }) => traverse());

xp.register('self::P', ({ key, traverse }) => <p key={ key() }>
	{ traverse() }
</p>);

xp.register('self::TITLE', ({ key, traverse }) => <h1 key={ key() } style={{
	marginBottom: '1em'
}}>
	{ traverse() }
</h1>);

xp.register('self::TITLE[parent::ACT or parent::PERSONAE]', ({ key, traverse }) => <h2 key={ key() }>
	{ traverse() }
</h2>);

xp.register('self::TITLE[parent::SCENE]', ({ key, traverse }) => <h3 key={ key() } style={{
	marginBottom: '1em'
}}>
	{ traverse() }
</h3>);

xp.register('self::FM or self::ACT', ({ key, traverse }) => <div key={ key() } style={{
	marginBottom: '2em'
}}>
	{ traverse() }
</div>);

xp.register('self::PERSONAE', ({ key, traverse }) => <div key={ key() } style={{
	marginBottom: '2em'
}}>
	{ traverse('./TITLE') }
	<ul>
		{ traverse('./(PERSONA|PGROUP)') }
	</ul>
</div>);

xp.register('self::PERSONA', ({ key, traverse }) => <li key={ key() }>
	{ traverse() }
</li>);

xp.register('self::PGROUP', ({ key, traverse }) => <li key={ key() }>
	{ traverse('./GRPDESCR') }
	<ul>
	{ traverse('./PERSONA') }
	</ul>
</li>);

xp.register('self::STAGEDIR', ({ key, traverse }) => <p key={ key() }>
	<em>
		{ traverse() }
	</em>
</p>);

xp.register('self::SPEECH', ({ key, traverse, query }) => <div key={ key() } style={{
	marginBottom: '1em'
}}>
	{ traverse() }
</div>);

xp.register('self::SPEAKER', ({ key, traverse }) => <div key={ key() }>
	<b>
		{ traverse() }
	</b>
</div>);

xp.register('self::LINE', ({ key, traverse }) => <div key={ key() } style={{
	marginLeft: '2em'
}}>
	{ traverse() }
</div>);


export default xp;