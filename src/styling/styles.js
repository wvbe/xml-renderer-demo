import { css, injectGlobal } from 'emotion';

// import './reset';

export { css } from 'emotion';

export const palette = {
	// Dimmed regular text
	foregroundDimmed: '#aaa',

	// Also known as patrick-pink
	titlePageBackground: '#da1c5c',
	titlePageForeground: '#fff',

	// Interactive text hyperlinks
	interactiveColor: '#61c',
	interactiveColorHighlight: '#a7f'
}

export const lengths = {
	pageWidth: '210mm',
	pageHeight: '297mm',
	pageMargin: '21mm'
}

export const padding = {
	fat: css`
		padding: 10.5mm 21mm;
	`,
	reasonable: css`
		padding: 5.75mm 10.5mm;
	`
}

export const flex = {
	row: css`
		display: flex;
		flex-direction: row;
	`,
	column: css`
		display: flex;
		flex-direction: column;
	`,
	fluid: css`
		flex: 1 1 100%;
	`,
	fixed: css`
		flex: 0 0 auto;
	`
}

export const bullet = {
	normal: css`
		padding-left: 2em;
		position: relative;
		:before {
			position: absolute;
			left: 0;
			content: '•';
		}
	`
}

export const steno = {
	base: css`
		font-family: 'Fira Sans', sans-serif;
		line-height: 1.5;
		font-weight: 300;
		font-size: 16px;
	`,
	slightlyLarger: css`
		font-size: 18px;
	`,
	extraLarge: css`
		font-size: 22px;
		font-weight: 400;
	`,
	dimmed: css`
		color: ${palette.foregroundDimmed}
	`,
	slightlyBold: css`
		font-weight: 400;
	`,
	extraBold: css`
		font-weight: 700;
	`,
	italic: css`
		font-style: italic;
	`,
	monospace: css`
		font-family: 'Ubuntu mono', monospace;
	`,
	preformatted: css`
		font-family: 'Ubuntu mono', monospace;
		white-space: pre-wrap;
	`,
	inverted: css`
		color: ${palette.titlePageForeground}
	`,
	interactive: css`
		color: ${palette.interactiveColor};
		cursor: pointer;

		text-decoration: none;

		:hover {
			color: ${palette.interactiveColorHighlight};
			text-decoration: underline;
		}
	`
}

injectGlobal`
	@page {
		size: A4 portrait;
	}
	@page title-page {
		margin: 0;
	}
	@page generic-page {
		margin: 0;
	}
`;

export const pages = {
	genericPage: css`
		page: generic-page;
		padding: ${lengths.pageMargin};
		${steno.base};
	`,
	titlePage: css`
		page: title-page;
		background-color: ${palette.titlePageBackground};

		${steno.base};
		${steno.inverted};
	`
}
