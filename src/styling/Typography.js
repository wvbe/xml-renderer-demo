import { css, steno, padding, bullet, length } from './styles';
import React from 'react';

const enumerableStyles = {
	padding, bullet
};
function mergeStylingProps (props, className = null) {
	if (!props) {
		return className;
	}

	if (props.base === undefined) {
		props.base = true;
	}

	const stenoStyles = Object.keys(steno)
		.filter(property => !!props[property])
		.map(property => steno[property]);

	const enumeratedStyles = Object.keys(enumerableStyles)
		.filter(property => !!props[property])
		.reduce((s, property) => {
			const values = Array.isArray(props[property]) ?
				props[property] :
				props[property].split(' ');
			return s.concat(values.map(value => enumerableStyles[property][value]));
		}, []);

	const indentStyle = props.indent ?
		css`margin-left: ${length[props.indent]};` :
		null;

	return css`
		${stenoStyles};
		${enumeratedStyles};
		${indentStyle};
		${className};
	`;
}
/**
 * Props:
 * @param {Boolean} [base] Enabled by default
 * @param {Boolean} [inline]
 * @param {Boolean} [base]
 * @param {Boolean} [slightlyLarger]
 * @param {Boolean} [extraLarge]
 * @param {Boolean} [dimmed]
 * @param {Boolean} [slightlyBold]
 * @param {Boolean} [extraBold]
 * @param {Boolean} [italic]
 * @param {Boolean} [code]
 * @param {Boolean} [inverted]
 * @param {Boolean} [interactive]
 * @param {string} [padding]
 * @param {string} [bullet]
 */
export default function Typography ({ children, inline, className, onClick, ...stylingProps }) {
	return React.createElement(inline ? 'span' : 'div', {
		className: mergeStylingProps(stylingProps, className),
		onClick
	}, children);
}

export function renderTypography ({ inline, className, ...stylingProps }) {
	const cName = mergeStylingProps(stylingProps, className);

	return ({ key, traverse }) => (
		<Typography inline={ inline } key={ key() } className={ cName }>
			{ traverse() }
		</Typography>
	);
}