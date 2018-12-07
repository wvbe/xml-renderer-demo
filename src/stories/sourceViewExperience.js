import React from 'react';
import Experience from 'xml-renderer';

const stylesPerCodePart = {
		comment: { color: '#aaa' },
		piName: { color: 'blue' },
		piValue: { color: 'purple' },
		attributeName: { color: 'purple' },
		attributeValue: { color: 'blue' },
		linkedAttributeValue: { color: 'blue', textDecoration: 'underline', cursor: 'pointer' },
		elementName: { color: 'green' },
		namespaceName: { color: 'yellow' },
		nodeContent: { color: 'black' },
		syntax: { color: 'red' }
	},
	style = Object.keys(stylesPerCodePart)
		.reduce((style, name) => Object.assign(style, {
			[name]: Object.assign({
				fontFamily: 'monospace',
				whiteSpace: 'pre-wrap'
			}, stylesPerCodePart[name])
		}), {});

const experience = new Experience();

experience.register('self::node()', ({ traverse }) => traverse());

experience.register('self::text()', ({ node }) => node().nodeValue);

experience.register('self::element()', ({ traverse, key, query, node, open, resolve }) => {
	const isSelfClosing = query('boolean(not(child::node()))');
	const name = query('name()');
	return <div key={ key() }>
		<span style={ style.syntax }>{'<'}</span>
		<span style={ style.elementName }>{ name }</span>
		{
			Array.from(node().attributes).map((attr) => <span key={ attr.name }>
				<span>{' '}</span>
				<span style={ style.attributeName}>{ attr.name }</span>
				<span style={ style.syntax }>{ '="' }</span>
				{
					attr.name === 'reference' ?
						<span style={ style.linkedAttributeValue} onClick={() => open(resolve(attr.value))}>{ attr.value }</span> :
						<span style={ style.attributeValue}>{ attr.value }</span>
				}
				<span style={ style.syntax }>{ '"' }</span>
			</span>)
		}

		{ isSelfClosing && <span style={ style.syntax }> /</span> }

		<span style={ style.syntax }>{'>'}</span>

		{ !isSelfClosing && <div style={ { marginLeft: '1em', paddingLeft: '0em', borderLeft: '1px dotted #eee' } }>
			{ traverse() }
		</div> }

		{ !isSelfClosing && <span>
			<span style={ style.syntax }>{'</'}</span>
			<span style={ style.elementName }>{ name }</span>
			<span style={ style.syntax }>{'>'}</span>
		</span> }
	</div>;
});

experience.register('self::comment()', ({ key, node }) => {
	return <div key={ key() }>
		<span style={ style.comment }>
			{'<!--'}
			{ node().nodeValue }
			{'-->'}
		</span>
	</div>
});

experience.register('self::processing-instruction()', ({ key, node }) => {
	return <div key={ key() }>
		<span style={ style.syntax }>{'<?'}</span>
			<span style={ style.piName }>{ node().nodeName }</span>
			{' '}
			<span style={ style.piValue }>{ node().nodeValue }</span>
			{ node().data ? ' ' : null }
		<span style={ style.syntax }>{'?>'}</span>
	</div>
});

export default experience;