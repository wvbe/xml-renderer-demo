import styled from '@emotion/styled';
import React, { useState } from 'react';
import { slimdom } from 'slimdom-sax-parser';
import Spinner from './Spinner';
import Document from './Document';
import useDocument from './useDocument';

const RouteWrapper = styled.div`
	flex: 1 1 auto;
	display: flex;
	flex-direction: column;
`;
const OptionsWrapper = styled.nav`
	background-color: #eee;
	flex: 0 0 auto;
	padding: var(--spacing-small);
`;
const ContentWrapper = styled.div`
	flex: 1 1 auto;
`;

const Input = styled.input`
	margin: 1em;
`;
function AsyncDocument({ xml, rules, showSource }) {
	const document = useDocument(xml);

	if (!document) {
		return <Spinner />;
	}

	if (document instanceof Error) {
		return (
			<>
				<p>Encountered an error in demonstrating this document</p>
				<pre>{document.stack || document.message}</pre>
			</>
		);
	}

	return showSource ? (
		<pre style={{ whiteSpace: 'pre-wrap' }}>
			{slimdom.serializeToWellFormedString(document)}
		</pre>
	) : (
		<Document node={document} rules={rules} />
	);
}

export default ({ xml, rules }) => {
	const [showSource, setShowSource] = useState(false);

	return (
		<RouteWrapper>
			<OptionsWrapper>
				<label>
					<Input
						type="checkbox"
						onClick={() => setShowSource(!showSource)}
						checked={showSource ? 'checked' : null}
					/>
					<span>Show original XML source</span>
				</label>
			</OptionsWrapper>
			<ContentWrapper>
				<AsyncDocument xml={xml} rules={rules} showSource={showSource} />
			</ContentWrapper>
		</RouteWrapper>
	);
};
