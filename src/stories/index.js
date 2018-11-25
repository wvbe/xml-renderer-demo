import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Button, Welcome } from '@storybook/react/demo';

import RenderedDocument, { withAsyncDocumentLoader } from '../components/RenderedDocument';
import { withCatch } from '../components/RenderedError';

import rssExperience from './rssExperience';

// Render promised documents or as an error
const DocumentFromPublicDir = withAsyncDocumentLoader((documentId) => fetch('/xml/' + documentId)
  .then(response => response.text())
  .then(content => ({ documentId, content })),
withCatch(RenderedDocument));

storiesOf('Documents', module)
  .add('nasa.rss', () => <DocumentFromPublicDir documentId='nasa.rss' experience={rssExperience} />)
