import { css, injectGlobal } from 'emotion';

// import './reset';

export { css, keyframes } from 'emotion';

export const palette = {
	// Dimmed regular text
	foregroundDimmed: '#aaa',

	interactiveColor: '#61c',
	interactiveColorHighlight: '#a7f'
}

export const length = {
	tiny:   (24 / 4) + 'px',
	small:  (24 / 2) + 'px',
	line:   (1 * 24) + 'px',
	medium: (2 * 24) + 'px',
	large:  (4 * 24) + 'px'
};

export const padding = {
	fat: css`
		padding: ${length.medium} ${length.large};
	`,
	reasonable: css`
		padding: ${length.line} calc(${length.line} * 2);
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
		padding-left: ${length.line};
		position: relative;
		:before {
			position: absolute;
			left: 0;
			content: '•';
		}
	`
}

export const steno = {
	// The base style for text is sized to line height. The font size is 2/3rd of that length
	base: css`
		line-height: ${length.line};
		font-size: calc(${length.line} * 1/2);

		font-family: 'Fira Sans', sans-serif;
		font-weight: 300;
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
