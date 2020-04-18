/** @jsx jsx */
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { jsx, css } from '@emotion/core';
import styled from '@emotion/styled';

const NavigationItemChildren = styled.div``;

const IndentationContext = React.createContext(0);

export default ({ text, children, route }) => {
	const indentation = useContext(IndentationContext);
	const linkCss = css`
		display: block;
		line-height: 2;
		padding-left: calc(var(--spacing-medium) * ${indentation + 1});

		&:hover {
			background-color: #eee;
			cursor: pointer;
		}
	`;
	return (
		<div>
			<Link css={linkCss} to={route} children={text} />
			<IndentationContext.Provider value={indentation + 1}>
				<NavigationItemChildren>{children}</NavigationItemChildren>
			</IndentationContext.Provider>
		</div>
	);
};
