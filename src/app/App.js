import React, { Component } from 'react';
import Experience from 'xml-renderer';
import logo from './logo.svg';
import './App.css';
import RenderedDocument, { withAsyncDocumentLoader } from '../components/RenderedDocument';
import { withCatch } from '../components/RenderedError';

// Insert lots of templating rules here
const testExperience = new Experience();
testExperience.register('self::text()', ({ node }) => node().nodeValue);
testExperience.register('self::node()', ({ traverse }) => traverse());

// Render promised documents or as an error
const DocumentFromPublicDir = withAsyncDocumentLoader((documentId) => fetch('/xml/' + documentId)
  .then(response => response.text())
  .then(content => ({ documentId, content })),
withCatch(RenderedDocument));

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <DocumentFromPublicDir documentId="nasa.rss" experience={testExperience} />
        </header>
      </div>
    );
  }
}

export default App;
