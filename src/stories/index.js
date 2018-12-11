/**
 * Storybook.
 */

import React from 'react';
import { storiesOf } from '@storybook/react';
import DocumentShowcase from './components/DocumentShowcase';

import nasaExperience from './nasaExperience';
import macbethExperience from './macbethExperience';
import xmlSpecExperience from './xmlSpecExperience';

storiesOf('Documents', module)
  .add('nasa.rss', () => <DocumentShowcase documentId='nasa.rss' experience={nasaExperience} />)
  .add('macbeth.xml', () => <DocumentShowcase documentId='macbeth.xml' experience={macbethExperience} />)
  .add('xml-spec.xml', () => <DocumentShowcase documentId='xml-spec.xml' experience={xmlSpecExperience} />)
