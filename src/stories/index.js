import React from 'react';

import { storiesOf } from '@storybook/react';

import rssExperience from './rssExperience';
import shakespeareExperience from './shakespeareExperience';
import xmlSpecExperience from './xmlSpecExperience';
import DocumentShowcase from './components/DocumentShowcase';

storiesOf('Documents', module)
  .add('nasa.rss', () => <DocumentShowcase documentId='nasa.rss' experience={rssExperience} />)
  .add('macbeth.xml', () => <DocumentShowcase documentId='macbeth.xml' experience={shakespeareExperience} />)
  .add('xml-spec.xml', () => <DocumentShowcase documentId='xml-spec.xml' experience={xmlSpecExperience} />)
