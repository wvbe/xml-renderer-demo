import React from 'react';
import styled from '@emotion/styled';

import { Switch, Route, Link } from 'react-router-dom';

import NavigationMasthead from './navigation-masthead/NavigationMasthead';
import NavigationSidebar from './navigation-sidebar/NavigationSidebar';
import NavigationCaption from './navigation-sidebar/NavigationCaption';
import NavigationItem from './navigation-sidebar/NavigationItem';

import DocumentRoute from './DocumentRoute';

import w3cspec from '../demos/w3cspec';
import shakespeare from '../demos/playshakespeare';
import rss from '../demos/rss';
import w3cspecXml from '../demos/w3cspec.xml.xml';
import w3cspecXquery from '../demos/w3cspec.xquery.xml';
import w3cspecXpath from '../demos/w3cspec.xpath.xml';
import w3cspecXquf from '../demos/w3cspec.xquf.xml';
import shakespeareMacbeth from '../demos/playshakespeare.macbeth.xml';
import shakespeareRomeoAndJuliet from '../demos/playshakespeare.romeoandjuliet.xml';
import shakespeareMidsummerNightsDream from '../demos/playshakespeare.midsummernightsdream.xml';
import shakespeareTempest from '../demos/playshakespeare.tempest.xml';
import Spinner from './Spinner';

const PageWrapper = styled.div`
	width: 100vw;
	min-height: 100vh;
	display: flex;
	flex-direction: row;
`;

const MenuWrapper = styled.div`
	width: 20vw;
	min-width: 300px;
	max-width: 500px;
	flex: 0 0 auto;
	overflow-y: auto;
`;

const BodyWrapper = styled.div`
	flex: 1 1 auto;
`;

function App() {
	return (
		<PageWrapper>
			<MenuWrapper>
				<NavigationSidebar>
					<NavigationCaption text="W3C Spec">
						<NavigationItem text="XML" route="/w3c-spec/xml" />
						<NavigationItem text="XPath" route="/w3c-spec/xpath" />
						<NavigationItem text="XQuery" route="/w3c-spec/xquery" />
						<NavigationItem text="XQUF" route="/w3c-spec/xquf" />
					</NavigationCaption>
					<NavigationCaption text="RSS">
						<NavigationItem text="Wired" route="/rss/wired" />
					</NavigationCaption>
					<NavigationCaption text="PlayShakespeare">
						<NavigationItem text="Macbeth" route="/shakespeare/macbeth" />
						<NavigationItem
							text="Romeo & Juliet"
							route="/shakespeare/romeo-and-juliet"
						/>
						<NavigationItem
							text="Midsummer night's dream"
							route="/shakespeare/midsummer-nights-dream"
						/>
						<NavigationItem text="The Tempest" route="/shakespeare/the-tempest" />
					</NavigationCaption>
				</NavigationSidebar>
			</MenuWrapper>
			<BodyWrapper>
				<Switch>
					<Route path="/w3c-spec/xml">
						<DocumentRoute xml={w3cspecXml} rules={w3cspec} />
					</Route>
					<Route path="/w3c-spec/xquery">
						<DocumentRoute xml={w3cspecXquery} rules={w3cspec} />
					</Route>
					<Route path="/w3c-spec/xpath">
						<DocumentRoute xml={w3cspecXpath} rules={w3cspec} />
					</Route>
					<Route path="/w3c-spec/xquf">
						<DocumentRoute xml={w3cspecXquf} rules={w3cspec} />
					</Route>
					<Route path="/shakespeare/macbeth">
						<DocumentRoute xml={shakespeareMacbeth} rules={shakespeare} />
					</Route>
					<Route path="/shakespeare/romeo-and-juliet">
						<DocumentRoute xml={shakespeareRomeoAndJuliet} rules={shakespeare} />
					</Route>
					<Route path="/shakespeare/midsummer-nights-dream">
						<DocumentRoute xml={shakespeareMidsummerNightsDream} rules={shakespeare} />
					</Route>
					<Route path="/shakespeare/the-tempest">
						<DocumentRoute xml={shakespeareTempest} rules={shakespeare} />
					</Route>
					<Route path="/rss/wired">
						<DocumentRoute xml={'https://www.wired.com/feed/rss'} rules={rss} />
					</Route>
					<Route path="/rss/al-jazeera">
						<DocumentRoute
							xml={
								'http://feeds.bbci.co.uk/news/video_and_audio/news_front_page/rss.xml'
							}
							rules={rss}
						/>
					</Route>
					<Route>
						<Spinner />
						<p style={{ textAlign: 'center' }}>
							Waiting for you to select a page from the left.
						</p>
					</Route>
				</Switch>
			</BodyWrapper>
		</PageWrapper>
	);
}

export default App;
