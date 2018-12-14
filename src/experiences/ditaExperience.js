/**
 * Transforms a multi-document DITA publication (dita maps and topics)
 *
 * - Resolve relative references between files
 * - Render topics referred from the ditamap
 */

import React from 'react';
import Experience from 'xml-renderer';
import { css } from '../styling/styles';
import flatEarthExperience from './flatEarthExperience';
import Typography, { renderTypography } from '../styling/Typography';
import Section, { renderSection } from '../styling/Section';
import DocumentFromPublicDir from './components/DocumentFromPublicDir';

const xp = new Experience(
	flatEarthExperience
);

xp.register('self::prolog', () => null);

xp.register('self::document-node() or self::section or self::conbody', renderSection({
	spaceBetween: 'line'
}));

xp.register('self::title', renderTypography({
	slightlyBold: true,
	slightlyLarger: true,
	className: css`margin-bottom: 6px`
}));

xp.register('self::title[parent::concept]', renderTypography({
	extraBold: true,
	slightlyLarger: true,
	className: css`margin-bottom: 6px`
}));

xp.register('self::p', renderTypography({
}));

xp.register('self::codeblock', renderTypography({
	preformatted: true,
	indent: 'line'
}));

xp.register('self::filepath', renderTypography({
	monospace: true,
	inline: true
}));

xp.register('self::ul or self::ol', renderSection({
	//spaceBetween: 'small'
}));

xp.register('self::li', renderTypography({
	bullet: 'normal'
}));

xp.register('self::related-links', ({ key, traverse }) => <Section key={ key() } spaceBetween='line'>
	<Typography slightlyLarger slightlyBold className={ css`margin-bottom: 6px` }>
		Related links
	</Typography>
	<Section>
		{ traverse() }
	</Section>
</Section>);

xp.register('self::link', ({ key, traverse, query }) => <Typography
	key={ key() }
	interactive
	bullet='normal'
	onClick={ () => window.open(query('string(@href)'), '_blank') }
	target='_blank'
>{ traverse () }</Typography>)

xp.register('self::ph', renderTypography({
	inline: true,
	italic: true
}));

xp.register('self::topicref', ({ key, traverse, query, resolve, experience }) => <DocumentFromPublicDir
	key={ key() }
	documentId={ resolve(query('string(@href)')) }
	experience={ experience }
>
	{
		// render topicrefs in topicrefs, so essentially documents in documents
		traverse()
	}
</DocumentFromPublicDir>);



export default xp;