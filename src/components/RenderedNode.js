export default function RenderedNode ({ node, children, ...props }) {
	// props.experience is used but also passed on
	// the children prop does not have to be used, but MUST NOT be passed on into xml-renderer as render data
	return [
		props.experience.render(node, props),
		children
	];
};
