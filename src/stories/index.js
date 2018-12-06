import React from 'react';

import { storiesOf } from '@storybook/react';
import RenderedDocument, { withAsyncDocumentLoader } from '../components/RenderedDocument';
import { withCatch } from '../components/RenderedError';

import rssExperience from './rssExperience';
import shakespeareExperience from './shakespeareExperience';

// Render promised documents or as an error
const DocumentFromPublicDir = withAsyncDocumentLoader((documentId) => fetch('/xml/' + documentId)
  .then(response => response.text())
  .then(content => ({ documentId, content })),
withCatch(RenderedDocument));

storiesOf('Documents', module)
  .add('nasa.rss', () => <DocumentFromPublicDir documentId='nasa.rss' experience={rssExperience} />)
  .add('macbeth.xml', () => <DocumentFromPublicDir documentId='macbeth.xml' experience={shakespeareExperience} />)
