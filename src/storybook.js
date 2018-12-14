/**
 * Storybook.
 */

import React from 'react';
import { storiesOf } from '@storybook/react';

import DocumentShowcase from './experiences/components/DocumentShowcase';

import nasaExperience from './experiences/nasaExperience';
import macbethExperience from './experiences/macbethExperience';
import xmlSpecExperience from './experiences/xmlSpecExperience';
import ditaExperience from './experiences/ditaExperience';

storiesOf('Documents', module)
  .add('nasa.rss', () => <DocumentShowcase documentId='nasa.rss' experience={nasaExperience} />)
  .add('macbeth.xml', () => <DocumentShowcase documentId='macbeth.xml' experience={macbethExperience} />)
  .add('xml-spec.xml', () => <DocumentShowcase documentId='xml-spec.xml' experience={xmlSpecExperience} />)
  .add('guidelines.ditamap', () => <DocumentShowcase documentId='https://raw.githubusercontent.com/ScriptoriumDev/LearningDITA/master/docs/guidelines.ditamap' experience={ditaExperience} />)
