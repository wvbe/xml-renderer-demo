import { configure } from '@storybook/react';
import { setOptions } from "@storybook/addon-options";

setOptions({
  name: "xml-renderer",
  url: "https://github.com/wvbe/xml-renderer",
  showDownPanel: false
});

function loadStories() {
  require('../src/stories');
}

configure(loadStories, module);
