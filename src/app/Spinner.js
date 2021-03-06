/* @jsx jsx */
import { jsx, css, keyframes } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';
const spinnerKeyframes = keyframes`
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
`;
export default styled.div`
	margin: 60px auto;
	font-size: 10px;
	position: relative;
	border-top: 1px solid #e4e4e4;
	border-right: 1px solid #e4e4e4;
	border-bottom: 1px solid #e4e4e4;
	border-left: 1px solid #000000;
	transform: translateZ(0);
	animation: ${spinnerKeyframes} 0.3s infinite linear;

	&,
	&:after {
		border-radius: 50%;
		width: 5em;
		height: 5em;
	}
`;
