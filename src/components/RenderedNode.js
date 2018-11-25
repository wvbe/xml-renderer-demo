export default function RenderedNode ({ experience, node, ...additionalProps }) {
	return experience.render(node, additionalProps);
};
