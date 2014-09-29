/**
 * Lo-Dash 3.0.0-pre (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize exports="node" -o ./compat/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var isArguments = require('../lang/isArguments'),
    isArray = require('../lang/isArray'),
    isString = require('../lang/isString'),
    keysIn = require('../object/keysIn'),
    support = require('../support');

/** Used for native method references */
var objectProto = Object.prototype;

/** Used to check objects for own properties */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * A fallback implementation of `Object.keys` which creates an array of the
 * own enumerable property names of `object`.
 *
 * @private
 * @param {Object} object The object to inspect.
 * @returns {Array} Returns the array of property names.
 */
function shimKeys(object) {
  var keyIndex,
      index = -1,
      props = keysIn(object),
      length = props.length,
      objLength = length && object.length,
      maxIndex = objLength - 1,
      result = [];

  var allowIndexes = typeof objLength == 'number' && objLength > 0 &&
    (isArray(object) || (support.nonEnumStrings && isString(object)) ||
      (support.nonEnumArgs && isArguments(object)));

  while (++index < length) {
    var key = props[index];
    if ((allowIndexes && (keyIndex = +key, keyIndex > -1 && keyIndex <= maxIndex && keyIndex % 1 == 0)) ||
        hasOwnProperty.call(object, key)) {
      result.push(key);
    }
  }
  return result;
}

module.exports = shimKeys;
