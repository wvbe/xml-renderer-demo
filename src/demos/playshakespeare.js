/**
 * Transforms a simple RSS file to some headers and links in a list.
 */

import React from 'react';
import * as fontoxpath from 'fontoxpath';
import Experience from 'xml-renderer';

const rules = new Experience();

rules.add('self::node()', ({ traverse }) => traverse());
rules.add('self::text()', ({ node }) => node.nodeValue);

rules.add('self::title', ({ traverse }) => <h1>{traverse()}</h1>);
rules.add('self::edition', ({ traverse }) => <i>{traverse()}</i>);
rules.add('self::lb', ({}) => <br />);
rules.add('self::personae', ({ traverse }) => (
	<div>
		<h2>Personae</h2>
		<ul>{traverse()}</ul>
	</div>
));

rules.add('self::persona', ({ traverse, node }) => (
	<li>
		<b>{traverse('./persname')}</b> (
		{fontoxpath.evaluateXPathToString('./@gender', node) === 'male' ? 'M' : 'F'})
	</li>
));
rules.add('self::act', ({ traverse }) => <div>{traverse()}</div>);
rules.add('self::acttitle', ({ traverse }) => <h2>{traverse()}</h2>);
rules.add('self::scene', ({ traverse }) => <div>{traverse()}</div>);
rules.add('self::scenetitle', ({ traverse }) => <h3>{traverse()}</h3>);
rules.add('self::stagedir', ({ traverse }) => (
	<p style={{ fontStyle: 'italic' }}>- {traverse()} -</p>
));
rules.add('self::speech', ({ traverse }) => <dl>{traverse()}</dl>);
rules.add('self::speaker', ({ traverse }) => <dt>{traverse()}</dt>);
rules.add('self::line', ({ traverse }) => <dd>{traverse()}</dd>);
rules.add('self::name', ({ traverse }) => <i>{traverse()}</i>);

export default rules;
