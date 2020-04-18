import React from 'react';
import styled from '@emotion/styled';

const LogoWrapper = styled.div`
	flex: 0 0 auto;
	padding: var(--spacing-medium);
	height: 50%;
`;

const OptionsWrapper = styled.div`
	flex: 1 1 auto;
`;

const SearchWrapper = styled.div`
	flex: 1 1 auto;
`;

const EverythingWrapper = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;

	height: calc(4 * var(--spacing-medium));
`;

export default () => {
	return (
		<EverythingWrapper>
			<LogoWrapper>Derp</LogoWrapper>
			<SearchWrapper>Search goes here</SearchWrapper>
			<OptionsWrapper>
				<span>Opt1</span>
				<span>Opt2</span>
			</OptionsWrapper>
		</EverythingWrapper>
	);
};
