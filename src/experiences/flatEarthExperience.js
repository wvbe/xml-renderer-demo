/**
 * A useless transformation of XML to flat text.
 */

import Experience from 'xml-renderer';

const xp = new Experience();

// Nodes only render their children
xp.register('self::node()', ({ traverse }) => traverse());

// Text nodes render as their text value, since they can not contain anything else.
xp.register('self::text()', ({ node }) => node().nodeValue);

export default xp;