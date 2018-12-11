# What is it?
- This is a demonstration of [xml-renderer](//github.com/wvbe/xml-renderer).
- It is served online at https://wvbe.github.io/xml-renderer.
- Using [slimdom.js](//github.com/bwrrp/slimdom.js) as Document Object Model, and
  [fontoxpath](//github.com/fontoxml/fontoxpath) as XPath engine.
- This project was bootstrapped with [Create React App](//github.com/facebook/create-react-app), and then
  [Storybook](//github.com/storybooks/storybook) was added.

# Available Scripts

- `npm run storybook`, developer experience for the site, default port is [9009](http://localhost:9009).
- `npm run deploy`, build Storybook and push [gh-pages](https://www.npmjs.com/package/gh-pages) to the
  [wvbe/xml-renderer] repository.

# What's the interesting parts?

An easy-access demonstration of `xml-renderer` for three different documents adressing a range of design patterns
and publication concerns in structures content:

- `nasa.rss` with `nasaExperience.js`, a straight-forward, annotated configuration for a simple XML model.
- `macbeth.xml` with `macbethExperience.js`, larger document but also straight-forward.
- `xml-spec.xml` with `xmlSpecExperience.js`, rich webpage with dynamic TOC and cross references.

`src/components/` are generic components and HOCs that may be useful for server-side and client-side React rendering.

