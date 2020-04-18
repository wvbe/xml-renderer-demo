/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';

const NavigationCaptionLabel = styled.h2`
	font-weight: bold;
	line-height: 2;
`;

const NavigationCaptionChildren = styled.div`
	margin-bottom: var(--spacing-medium);
`;

export default ({ text, children }) => {
	return (
		<section>
			<NavigationCaptionLabel>{text}</NavigationCaptionLabel>
			<NavigationCaptionChildren>{children}</NavigationCaptionChildren>
		</section>
	);
};
