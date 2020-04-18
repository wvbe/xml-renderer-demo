import React, { useEffect, useState } from 'react';
import { sync } from 'slimdom-sax-parser';

const CACHE = {};

async function getXml(xmlUrl, setOutcome) {
	setOutcome(null);
	await new Promise((resolve) => setTimeout(resolve, 25));

	const cachedOutcome = CACHE[xmlUrl];
	if (cachedOutcome instanceof Error) {
		setOutcome(cachedOutcome);
		return;
	}

	if (cachedOutcome) {
		try {
			setOutcome(sync(cachedOutcome));
		} catch (error) {
			setOutcome(error);
		}
		return;
	}

	const lastXmlUrl = xmlUrl;

	let response;

	try {
		response = await fetch(xmlUrl, {
			method: 'GET',
			mode: 'cors',
			cache: 'no-cache',
			// credentials: 'include'
		});
	} catch (error) {
		setOutcome(error);
		return;
	}

	if (lastXmlUrl !== xmlUrl) {
		return;
	}
	if (!response.ok) {
		setOutcome(new Error('The response for ' + xmlUrl + ' was not OK'));
		return;
	}

	const xmlString = await response.text();
	try {
		setOutcome(sync(xmlString.trim()));
	} catch (error) {
		setOutcome(error);
	}
}

export default function (xmlUrl) {
	const [outcome, setOutcome] = useState(null);

	useEffect(() => {
		getXml(xmlUrl, setOutcome);
	}, [xmlUrl]);

	return outcome;
}
