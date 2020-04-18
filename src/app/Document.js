import React, { useMemo } from 'react';

export default ({ node, rules }) => {
	return useMemo(() => rules.createReactRenderer(React), [rules])(node);
};
