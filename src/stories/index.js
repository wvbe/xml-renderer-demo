/**
 * Storybook.
 */

import React from 'react';
import { storiesOf } from '@storybook/react';
import DocumentShowcase from './components/DocumentShowcase';

import nasaExperience from './nasaExperience';
import macbethExperience from './macbethExperience';
import xmlSpecExperience from './xmlSpecExperience';
import ditaExperience from './ditaExperience';

storiesOf('Documents', module)
  .add('nasa.rss', () => <DocumentShowcase documentId='nasa.rss' experience={nasaExperience} />)
  .add('macbeth.xml', () => <DocumentShowcase documentId='macbeth.xml' experience={macbethExperience} />)
  .add('xml-spec.xml', () => <DocumentShowcase documentId='xml-spec.xml' experience={xmlSpecExperience} />);

storiesOf('Documents DITA', module)
  .add('assessments.dita', () => <DocumentShowcase documentId='learningdita/assessments.dita' experience={ditaExperience} />)
  .add('filenaming.dita', () => <DocumentShowcase documentId='learningdita/filenaming.dita' experience={ditaExperience} />)
  .add('guidelines.ditamap', () => <DocumentShowcase documentId='learningdita/guidelines.ditamap' experience={ditaExperience} />)
  .add('learningmod_structure.dita', () => <DocumentShowcase documentId='learningdita/learningmod_structure.dita' experience={ditaExperience} />)
  .add('metadata.dita', () => <DocumentShowcase documentId='learningdita/metadata.dita' experience={ditaExperience} />)
  .add('reuse.dita', () => <DocumentShowcase documentId='learningdita/reuse.dita' experience={ditaExperience} />)
  .add('style_and_approach.dita', () => <DocumentShowcase documentId='learningdita/style_and_approach.dita' experience={ditaExperience} />)
  .add('style.dita', () => <DocumentShowcase documentId='learningdita/style.dita' experience={ditaExperience} />)
  .add('task.dita', () => <DocumentShowcase documentId='learningdita/task.dita' experience={ditaExperience} />)
  .add('usage.dita', () => <DocumentShowcase documentId='learningdita/usage.dita' experience={ditaExperience} />)

