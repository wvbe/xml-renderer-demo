import { css, length } from './styles';
import React from 'react';

function mergeStylingProps (props, className = null) {
	const rules = [];
	if (props.spaceBetween) {
		rules.push(css`
			> * {
				margin-bottom: ${length[props.spaceBetween]};

				&:last-child {
					margin-bottom: 0;
				}
			}
		`)
	}
	return rules.reduce((all, rule) => css`${rule};${all}`, className);
}

export default function Section ({ children, className, label, ...stylingProps }) {
	return <div>
		{ label ? label : null }
		<div className={ mergeStylingProps(stylingProps, className) }>
			{ children }
		</div>
	</div>;
}

export function renderSection ({ className, label, ...stylingProps }) {
	const cName = mergeStylingProps(stylingProps, className);

	return ({ key, traverse }) => (
		<Section key={ key() } className={ cName } label={ label }>
			{ traverse() }
		</Section>
	);
}