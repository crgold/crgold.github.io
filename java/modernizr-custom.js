/*!
 * modernizr v3.6.0
 * Build https://modernizr.com/download?-appearance-backdropfilter-checked-cssall-cssanimations-csscalc-csschunit-cssexunit-cssfilters-cssgradients-csshyphens_softhyphens_softhyphensfind-cssinvalid-cssmask-csspointerevents-csspositionsticky-csspseudoanimations-csspseudotransitions-cssreflections-cssresize-cssscrollbar-csstransforms-csstransforms3d-csstransformslevel2-csstransitions-cssvalid-cssvhunit-cssvmaxunit-cssvminunit-cssvwunit-cubicbezierrange-display_runin-displaytable-flexbox-flexboxlegacy-flexboxtweener-flexwrap-generatedcontent-hairline-hsla-lastchild-multiplebgs-nthchild-objectfit-overflowscrolling-preserve3d-regions-shapes-siblinggeneral-subpixelfont-svgasimg-target-textalignlast-textshadow-userselect-variablefonts-wrapflow-dontmin
 *
 * Copyright (c)
 *  Faruk Ates
 *  Paul Irish
 *  Alex Sexton
 *  Ryan Seddon
 *  Patrick Kettner
 *  Stu Cox
 *  Richard Herrera

 * MIT License
 */

/*
 * Modernizr tests which native CSS3 and HTML5 features are available in the
 * current UA and makes the results available to you in two ways: as properties on
 * a global `Modernizr` object, and as classes on the `<html>` element. This
 * information allows you to progressively enhance your pages with a granular level
 * of control over the experience.
*/

;(function(window, document, undefined){
  /**
   * docElement is a convenience wrapper to grab the root element of the document
   *
   * @access private
   * @returns {HTMLElement|SVGElement} The root element of the document
   */

  var docElement = document.documentElement;
  

  var tests = [];
  

  /**
   *
   * ModernizrProto is the constructor for Modernizr
   *
   * @class
   * @access public
   */

  var ModernizrProto = {
    // The current version, dummy
    _version: '3.6.0',

    // Any settings that don't work as separate modules
    // can go in here as configuration.
    _config: {
      'classPrefix': '',
      'enableClasses': true,
      'enableJSClass': true,
      'usePrefixes': true
    },

    // Queue of tests
    _q: [],

    // Stub these for people who are listening
    on: function(test, cb) {
      // I don't really think people should do this, but we can
      // safe guard it a bit.
      // -- NOTE:: this gets WAY overridden in src/addTest for actual async tests.
      // This is in case people listen to synchronous tests. I would leave it out,
      // but the code to *disallow* sync tests in the real version of this
      // function is actually larger than this.
      var self = this;
      setTimeout(function() {
        cb(self[test]);
      }, 0);
    },

    addTest: function(name, fn, options) {
      tests.push({name: name, fn: fn, options: options});
    },

    addAsyncTest: function(fn) {
      tests.push({name: null, fn: fn});
    }
  };

  

  // Fake some of Object.create so we can force non test results to be non "own" properties.
  var Modernizr = function() {};
  Modernizr.prototype = ModernizrProto;

  // Leak modernizr globally when you `require` it rather than force it here.
  // Overwrite name so constructor name is nicer :D
  Modernizr = new Modernizr();

  
/*!
{
  "name": "cssall",
  "property": "cssall",
  "notes": [{
    "name": "Spec",
    "href": "https://drafts.csswg.org/css-cascade/#all-shorthand"
  }]
}
!*/
/* DOC
Detects support for the `all` css property, which is a shorthand to reset all css properties (except direction and unicode-bidi) to their original value
*/


  Modernizr.addTest('cssall', 'all' in docElement.style);

/*!
{
  "name": "CSS :target pseudo-class",
  "caniuse": "css-sel3",
  "property": "target",
  "tags": ["css"],
  "notes": [{
    "name": "MDN documentation",
    "href": "https://developer.mozilla.org/en-US/docs/Web/CSS/:target"
  }],
  "authors": ["@zachleat"],
  "warnings": ["Opera Mini supports :target but doesn't update the hash for anchor links."]
}
!*/
/* DOC
Detects support for the ':target' CSS pseudo-class.
*/

  // querySelector
  Modernizr.addTest('target', function() {
    var doc = window.document;
    if (!('querySelectorAll' in doc)) {
      return false;
    }

    try {
      doc.querySelectorAll(':target');
      return true;
    } catch (e) {
      return false;
    }
  });


  var classes = [];
  

  /**
   * is returns a boolean if the typeof an obj is exactly type.
   *
   * @access private
   * @function is
   * @param {*} obj - A thing we want to check the type of
   * @param {string} type - A string to compare the typeof against
   * @returns {boolean}
   */

  function is(obj, type) {
    return typeof obj === type;
  }
  ;

  /**
   * Run through all tests and detect their support in the current UA.
   *
   * @access private
   */

  function testRunner() {
    var featureNames;
    var feature;
    var aliasIdx;
    var result;
    var nameIdx;
    var featureName;
    var featureNameSplit;

    for (var featureIdx in tests) {
      if (tests.hasOwnProperty(featureIdx)) {
        featureNames = [];
        feature = tests[featureIdx];
        // run the test, throw the return value into the Modernizr,
        // then based on that boolean, define an appropriate className
        // and push it into an array of classes we'll join later.
        //
        // If there is no name, it's an 'async' test that is run,
        // but not directly added to the object. That should
        // be done with a post-run addTest call.
        if (feature.name) {
          featureNames.push(feature.name.toLowerCase());

          if (feature.options && feature.options.aliases && feature.options.aliases.length) {
            // Add all the aliases into the names list
            for (aliasIdx = 0; aliasIdx < feature.options.aliases.length; aliasIdx++) {
              featureNames.push(feature.options.aliases[aliasIdx].toLowerCase());
            }
          }
        }

        // Run the test, or use the raw value if it's not a function
        result = is(feature.fn, 'function') ? feature.fn() : feature.fn;


        // Set each of the names on the Modernizr object
        for (nameIdx = 0; nameIdx < featureNames.length; nameIdx++) {
          featureName = featureNames[nameIdx];
          // Support dot properties as sub tests. We don't do checking to make sure
          // that the implied parent tests have been added. You must call them in
          // order (either in the test, or make the parent test a dependency).
          //
          // Cap it to TWO to make the logic simple and because who needs that kind of subtesting
          // hashtag famous last words
          featureNameSplit = featureName.split('.');

          if (featureNameSplit.length === 1) {
            Modernizr[featureNameSplit[0]] = result;
          } else {
            // cast to a Boolean, if not one already
            if (Modernizr[featureNameSplit[0]] && !(Modernizr[featureNameSplit[0]] instanceof Boolean)) {
              Modernizr[featureNameSplit[0]] = new Boolean(Modernizr[featureNameSplit[0]]);
            }

            Modernizr[featureNameSplit[0]][featureNameSplit[1]] = result;
          }

          classes.push((result ? '' : 'no-') + featureNameSplit.join('-'));
        }
      }
    }
  }
  ;

  /**
   * List of property values to set for css tests. See ticket #21
   * http://git.io/vUGl4
   *
   * @memberof Modernizr
   * @name Modernizr._prefixes
   * @optionName Modernizr._prefixes
   * @optionProp prefixes
   * @access public
   * @example
   *
   * Modernizr._prefixes is the internal list of prefixes that we test against
   * inside of things like [prefixed](#modernizr-prefixed) and [prefixedCSS](#-code-modernizr-prefixedcss). It is simply
   * an array of kebab-case vendor prefixes you can use within your code.
   *
   * Some common use cases include
   *
   * Generating all possible prefixed version of a CSS property
   * ```js
   * var rule = Modernizr._prefixes.join('transform: rotate(20deg); ');
   *
   * rule === 'transform: rotate(20deg); webkit-transform: rotate(20deg); moz-transform: rotate(20deg); o-transform: rotate(20deg); ms-transform: rotate(20deg);'
   * ```
   *
   * Generating all possible prefixed version of a CSS value
   * ```js
   * rule = 'display:' +  Modernizr._prefixes.join('flex; display:') + 'flex';
   *
   * rule === 'display:flex; display:-webkit-flex; display:-moz-flex; display:-o-flex; display:-ms-flex; display:flex'
   * ```
   */

  // we use ['',''] rather than an empty array in order to allow a pattern of .`join()`ing prefixes to test
  // values in feature detects to continue to work
  var prefixes = (ModernizrProto._config.usePrefixes ? ' -webkit- -moz- -o- -ms- '.split(' ') : ['','']);

  // expose these for the plugin API. Look in the source for how to join() them against your input
  ModernizrProto._prefixes = prefixes;

  
/*!
{
  "name": "CSS Supports",
  "property": "supports",
  "caniuse": "css-featurequeries",
  "tags": ["css"],
  "builderAliases": ["css_supports"],
  "notes": [{
    "name": "W3 Spec",
    "href": "http://dev.w3.org/csswg/css3-conditional/#at-supports"
  },{
    "name": "Related Github Issue",
    "href": "https://github.com/Modernizr/Modernizr/issues/648"
  },{
    "name": "W3 Info",
    "href": "http://dev.w3.org/csswg/css3-conditional/#the-csssupportsrule-interface"
  }]
}
!*/

  var newSyntax = 'CSS' in window && 'supports' in window.CSS;
  var oldSyntax = 'supportsCSS' in window;
  Modernizr.addTest('supports', newSyntax || oldSyntax);



  /**
   * contains checks to see if a string contains another string
   *
   * @access private
   * @function contains
   * @param {string} str - The string we want to check for substrings
   * @param {string} substr - The substring we want to search the first string for
   * @returns {boolean}
   */

  function contains(str, substr) {
    return !!~('' + str).indexOf(substr);
  }

  ;

  /**
   * A convenience helper to check if the document we are running in is an SVG document
   *
   * @access private
   * @returns {boolean}
   */

  var isSVG = docElement.nodeName.toLowerCase() === 'svg';
  

  /**
   * createElement is a convenience wrapper around document.createElement. Since we
   * use createElement all over the place, this allows for (slightly) smaller code
   * as well as abstracting away issues with creating elements in contexts other than
   * HTML documents (e.g. SVG documents).
   *
   * @access private
   * @function createElement
   * @returns {HTMLElement|SVGElement} An HTML or SVG element
   */

  function createElement() {
    if (typeof document.createElement !== 'function') {
      // This is the case in IE7, where the type of createElement is "object".
      // For this reason, we cannot call apply() as Object is not a Function.
      return document.createElement(arguments[0]);
    } else if (isSVG) {
      return document.createElementNS.call(document, 'http://www.w3.org/2000/svg', arguments[0]);
    } else {
      return document.createElement.apply(document, arguments);
    }
  }

  ;
/*!
{
  "name": "CSS Calc",
  "property": "csscalc",
  "caniuse": "calc",
  "tags": ["css"],
  "builderAliases": ["css_calc"],
  "authors": ["@calvein"]
}
!*/
/* DOC
Method of allowing calculated values for length units. For example:

```css
//lem {
  width: calc(100% - 3em);
}
```
*/

  Modernizr.addTest('csscalc', function() {
    var prop = 'width:';
    var value = 'calc(10px);';
    var el = createElement('a');

    el.style.cssText = prop + prefixes.join(value + prop);

    return !!el.style.length;
  });

/*!
{
  "name": "CSS Cubic Bezier Range",
  "property": "cubicbezierrange",
  "tags": ["css"],
  "builderAliases": ["css_cubicbezierrange"],
  "doc" : null,
  "authors": ["@calvein"],
  "warnings": ["cubic-bezier values can't be > 1 for Webkit until [bug #45761](https://bugs.webkit.org/show_bug.cgi?id=45761) is fixed"],
  "notes": [{
    "name": "Comprehensive Compat Chart",
    "href": "http://muddledramblings.com/table-of-css3-border-radius-compliance"
  }]
}
!*/

  Modernizr.addTest('cubicbezierrange', function() {
    var el = createElement('a');
    el.style.cssText = prefixes.join('transition-timing-function:cubic-bezier(1,0,0,1.1); ');
    return !!el.style.length;
  });

/*!
{
  "name": "CSS Gradients",
  "caniuse": "css-gradients",
  "property": "cssgradients",
  "tags": ["css"],
  "knownBugs": ["False-positives on webOS (https://github.com/Modernizr/Modernizr/issues/202)"],
  "notes": [{
    "name": "Webkit Gradient Syntax",
    "href": "https://webkit.org/blog/175/introducing-css-gradients/"
  },{
    "name": "Linear Gradient Syntax",
    "href": "https://developer.mozilla.org/en-US/docs/Web/CSS/linear-gradient"
  },{
    "name": "W3C Gradient Spec",
    "href": "https://drafts.csswg.org/css-images-3/#gradients"
  }]
}
!*/


  Modernizr.addTest('cssgradients', function() {

    var str1 = 'background-image:';
    var str2 = 'gradient(linear,left top,right bottom,from(#9f9),to(white));';
    var css = '';
    var angle;

    for (var i = 0, len = prefixes.length - 1; i < len; i++) {
      angle = (i === 0 ? 'to ' : '');
      css += str1 + prefixes[i] + 'linear-gradient(' + angle + 'left top, #9f9, white);';
    }

    if (Modernizr._config.usePrefixes) {
    // legacy webkit syntax (FIXME: remove when syntax not in use anymore)
      css += str1 + '-webkit-' + str2;
    }

    var elem = createElement('a');
    var style = elem.style;
    style.cssText = css;

    // IE6 returns undefined so cast to string
    return ('' + style.backgroundImage).indexOf('gradient') > -1;
  });

/*!
{
  "name": "CSS HSLA Colors",
  "caniuse": "css3-colors",
  "property": "hsla",
  "tags": ["css"]
}
!*/

  Modernizr.addTest('hsla', function() {
    var style = createElement('a').style;
    style.cssText = 'background-color:hsla(120,40%,100%,.5)';
    return contains(style.backgroundColor, 'rgba') || contains(style.backgroundColor, 'hsla');
  });

/*!
{
  "name": "CSS Multiple Backgrounds",
  "caniuse": "multibackgrounds",
  "property": "multiplebgs",
  "tags": ["css"]
}
!*/

  // Setting multiple images AND a color on the background shorthand property
  // and then querying the style.background property value for the number of
  // occurrences of "url(" is a reliable method for detecting ACTUAL support for this!

  Modernizr.addTest('multiplebgs', function() {
    var style = createElement('a').style;
    style.cssText = 'background:url(https://),url(https://),red url(https://)';

    // If the UA supports multiple backgrounds, there should be three occurrences
    // of the string "url(" in the return value for elemStyle.background
    return (/(url\s*\(.*?){3}/).test(style.background);
  });

/*!
{
  "name": "CSS Pointer Events",
  "caniuse": "pointer-events",
  "property": "csspointerevents",
  "authors": ["ausi"],
  "tags": ["css"],
  "builderAliases": ["css_pointerevents"],
  "notes": [
    {
      "name": "MDN Docs",
      "href": "https://developer.mozilla.org/en-US/docs/Web/CSS/pointer-events"
    },{
      "name": "Test Project Page",
      "href": "https://ausi.github.com/Feature-detection-technique-for-pointer-events/"
    },{
      "name": "Test Project Wiki",
      "href": "https://github.com/ausi/Feature-detection-technique-for-pointer-events/wiki"
    },
    {
      "name": "Related Github Issue",
      "href": "https://github.com/Modernizr/Modernizr/issues/80"
    }
  ]
}
!*/

  Modernizr.addTest('csspointerevents', function() {
    var style = createElement('a').style;
    style.cssText = 'pointer-events:auto';
    return style.pointerEvents === 'auto';
  });

/*!
{
  "name": "CSS position: sticky",
  "property": "csspositionsticky",
  "tags": ["css"],
  "builderAliases": ["css_positionsticky"],
  "notes": [{
    "name": "Chrome bug report",
    "href":"https://code.google.com/p/chromium/issues/detail?id=322972"
  }],
  "warnings": [ "using position:sticky on anything but top aligned elements is buggy in Chrome < 37 and iOS <=7+" ]
}
!*/

  // Sticky positioning - constrains an element to be positioned inside the
  // intersection of its container box, and the viewport.
  Modernizr.addTest('csspositionsticky', function() {
    var prop = 'position:';
    var value = 'sticky';
    var el = createElement('a');
    var mStyle = el.style;

    mStyle.cssText = prop + prefixes.join(value + ';' + prop).slice(0, -prop.length);

    return mStyle.position.indexOf(value) !== -1;
  });

/*!
{
  "name": "CSS Transform Style preserve-3d",
  "property": "preserve3d",
  "authors": ["denyskoch", "aFarkas"],
  "tags": ["css"],
  "notes": [{
    "name": "MDN Docs",
    "href": "https://developer.mozilla.org/en-US/docs/Web/CSS/transform-style"
  },{
    "name": "Related Github Issue",
    "href": "https://github.com/Modernizr/Modernizr/issues/1748"
  }]
}
!*/
/* DOC
Detects support for `transform-style: preserve-3d`, for getting a proper 3D perspective on elements.
*/

  Modernizr.addTest('preserve3d', function() {
    var outerAnchor, innerAnchor;
    var CSS = window.CSS;
    var result = false;

    if (CSS && CSS.supports && CSS.supports('(transform-style: preserve-3d)')) {
      return true;
    }

    outerAnchor = createElement('a');
    innerAnchor = createElement('a');

    outerAnchor.style.cssText = 'display: block; transform-style: preserve-3d; transform-origin: right; transform: rotateY(40deg);';
    innerAnchor.style.cssText = 'display: block; width: 9px; height: 1px; background: #000; transform-origin: right; transform: rotateY(40deg);';

    outerAnchor.appendChild(innerAnchor);
    docElement.appendChild(outerAnchor);

    result = innerAnchor.getBoundingClientRect();
    docElement.removeChild(outerAnchor);

    result = result.width && result.width < 4;
    return result;
  });


  /**
   * Create our "modernizr" element that we do most feature tests on.
   *
   * @access private
   */

  var modElem = {
    elem: createElement('modernizr')
  };

  // Clean up this element
  Modernizr._q.push(function() {
    delete modElem.elem;
  });

  
/*!
{
  "name": "CSS Font ch Units",
  "authors": ["Ron Waldon (@jokeyrhyme)"],
  "property": "csschunit",
  "tags": ["css"],
  "notes": [{
    "name": "W3C Spec",
    "href": "https://www.w3.org/TR/css3-values/#font-relative-lengths"
  }]
}
!*/

  Modernizr.addTest('csschunit', function() {
    var elemStyle = modElem.elem.style;
    var supports;
    try {
      elemStyle.fontSize = '3ch';
      supports = elemStyle.fontSize.indexOf('ch') !== -1;
    } catch (e) {
      supports = false;
    }
    return supports;
  });

/*!
{
  "name": "CSS Font ex Units",
  "authors": ["Ron Waldon (@jokeyrhyme)"],
  "property": "cssexunit",
  "tags": ["css"],
  "notes": [{
    "name": "W3C Spec",
    "href": "https://www.w3.org/TR/css3-values/#font-relative-lengths"
  }]
}
!*/

  Modernizr.addTest('cssexunit', function() {
    var elemStyle = modElem.elem.style;
    var supports;
    try {
      elemStyle.fontSize = '3ex';
      supports = elemStyle.fontSize.indexOf('ex') !== -1;
    } catch (e) {
      supports = false;
    }
    return supports;
  });



  /**
   * wrapper around getComputedStyle, to fix issues with Firefox returning null when
   * called inside of a hidden iframe
   *
   * @access private
   * @function computedStyle
   * @param {HTMLElement|SVGElement} - The element we want to find the computed styles of
   * @param {string|null} [pseudoSelector]- An optional pseudo element selector (e.g. :before), of null if none
   * @returns {CSSStyleDeclaration}
   */

  function computedStyle(elem, pseudo, prop) {
    var result;

    if ('getComputedStyle' in window) {
      result = getComputedStyle.call(window, elem, pseudo);
      var console = window.console;

      if (result !== null) {
        if (prop) {
          result = result.getPropertyValue(prop);
        }
      } else {
        if (console) {
          var method = console.error ? 'error' : 'log';
          console[method].call(console, 'getComputedStyle returning null, its possible modernizr test results are inaccurate');
        }
      }
    } else {
      result = !pseudo && elem.currentStyle && elem.currentStyle[prop];
    }

    return result;
  }

  ;

  /**
   * roundedEquals takes two integers and checks if the first is within 1 of the second
   *
   * @access private
   * @function roundedEquals
   * @param {number} a
   * @param {number} b
   * @returns {boolean}
   */

  function roundedEquals(a, b) {
    return a - 1 === b || a === b || a + 1 === b;
  }

  ;

  /**
   * hasOwnProp is a shim for hasOwnProperty that is needed for Safari 2.0 support
   *
   * @author kangax
   * @access private
   * @function hasOwnProp
   * @param {object} object - The object to check for a property
   * @param {string} property - The property to check for
   * @returns {boolean}
   */

  // hasOwnProperty shim by kangax needed for Safari 2.0 support
  var hasOwnProp;

  (function() {
    var _hasOwnProperty = ({}).hasOwnProperty;
    /* istanbul ignore else */
    /* we have no way of testing IE 5.5 or safari 2,
     * so just assume the else gets hit */
    if (!is(_hasOwnProperty, 'undefined') && !is(_hasOwnProperty.call, 'undefined')) {
      hasOwnProp = function(object, property) {
        return _hasOwnProperty.call(object, property);
      };
    }
    else {
      hasOwnProp = function(object, property) { /* yes, this can give false positives/negatives, but most of the time we don't care about those */
        return ((property in object) && is(object.constructor.prototype[property], 'undefined'));
      };
    }
  })();

  

  /**
   * setClasses takes an array of class names and adds them to the root element
   *
   * @access private
   * @function setClasses
   * @param {string[]} classes - Array of class names
   */

  // Pass in an and array of class names, e.g.:
  //  ['no-webp', 'borderradius', ...]
  function setClasses(classes) {
    var className = docElement.className;
    var classPrefix = Modernizr._config.classPrefix || '';

    if (isSVG) {
      className = className.baseVal;
    }

    // Change `no-js` to `js` (independently of the `enableClasses` option)
    // Handle classPrefix on this too
    if (Modernizr._config.enableJSClass) {
      var reJS = new RegExp('(^|\\s)' + classPrefix + 'no-js(\\s|$)');
      className = className.replace(reJS, '$1' + classPrefix + 'js$2');
    }

    if (Modernizr._config.enableClasses) {
      // Add the new classes
      className += ' ' + classPrefix + classes.join(' ' + classPrefix);
      if (isSVG) {
        docElement.className.baseVal = className;
      } else {
        docElement.className = className;
      }
    }

  }

  ;


   // _l tracks listeners for async tests, as well as tests that execute after the initial run
  ModernizrProto._l = {};

  /**
   * Modernizr.on is a way to listen for the completion of async tests. Being
   * asynchronous, they may not finish before your scripts run. As a result you
   * will get a possibly false negative `undefined` value.
   *
   * @memberof Modernizr
   * @name Modernizr.on
   * @access public
   * @function on
   * @param {string} feature - String name of the feature detect
   * @param {function} cb - Callback function returning a Boolean - true if feature is supported, false if not
   * @example
   *
   * ```js
   * Modernizr.on('flash', function( result ) {
   *   if (result) {
   *    // the browser has flash
   *   } else {
   *     // the browser does not have flash
   *   }
   * });
   * ```
   */

  ModernizrProto.on = function(feature, cb) {
    // Create the list of listeners if it doesn't exist
    if (!this._l[feature]) {
      this._l[feature] = [];
    }

    // Push this test on to the listener list
    this._l[feature].push(cb);

    // If it's already been resolved, trigger it on next tick
    if (Modernizr.hasOwnProperty(feature)) {
      // Next Tick
      setTimeout(function() {
        Modernizr._trigger(feature, Modernizr[feature]);
      }, 0);
    }
  };

  /**
   * _trigger is the private function used to signal test completion and run any
   * callbacks registered through [Modernizr.on](#modernizr-on)
   *
   * @memberof Modernizr
   * @name Modernizr._trigger
   * @access private
   * @function _trigger
   * @param {string} feature - string name of the feature detect
   * @param {function|boolean} [res] - A feature detection function, or the boolean =
   * result of a feature detection function
   */

  ModernizrProto._trigger = function(feature, res) {
    if (!this._l[feature]) {
      return;
    }

    var cbs = this._l[feature];

    // Force async
    setTimeout(function() {
      var i, cb;
      for (i = 0; i < cbs.length; i++) {
        cb = cbs[i];
        cb(res);
      }
    }, 0);

    // Don't trigger these again
    delete this._l[feature];
  };

  /**
   * addTest allows you to define your own feature detects that are not currently
   * included in Modernizr (under the covers it's the exact same code Modernizr
   * uses for its own [feature detections](https://github.com/Modernizr/Modernizr/tree/master/feature-detects)). Just like the offical detects, the result
   * will be added onto the Modernizr object, as well as an appropriate className set on
   * the html element when configured to do so
   *
   * @memberof Modernizr
   * @name Modernizr.addTest
   * @optionName Modernizr.addTest()
   * @optionProp addTest
   * @access public
   * @function addTest
   * @param {string|object} feature - The string name of the feature detect, or an
   * object of feature detect names and test
   * @param {function|boolean} test - Function returning true if feature is supported,
   * false if not. Otherwise a boolean representing the results of a feature detection
   * @example
   *
   * The most common way of creating your own feature detects is by calling
   * `Modernizr.addTest` with a string (preferably just lowercase, without any
   * punctuation), and a function you want executed that will return a boolean result
   *
   * ```js
   * Modernizr.addTest('itsTuesday', function() {
   *  var d = new Date();
   *  return d.getDay() === 2;
   * });
   * ```
   *
   * When the above is run, it will set Modernizr.itstuesday to `true` when it is tuesday,
   * and to `false` every other day of the week. One thing to notice is that the names of
   * feature detect functions are always lowercased when added to the Modernizr object. That
   * means that `Modernizr.itsTuesday` will not exist, but `Modernizr.itstuesday` will.
   *
   *
   *  Since we only look at the returned value from any feature detection function,
   *  you do not need to actually use a function. For simple detections, just passing
   *  in a statement that will return a boolean value works just fine.
   *
   * ```js
   * Modernizr.addTest('hasJquery', 'jQuery' in window);
   * ```
   *
   * Just like before, when the above runs `Modernizr.hasjquery` will be true if
   * jQuery has been included on the page. Not using a function saves a small amount
   * of overhead for the browser, as well as making your code much more readable.
   *
   * Finally, you also have the ability to pass in an object of feature names and
   * their tests. This is handy if you want to add multiple detections in one go.
   * The keys should always be a string, and the value can be either a boolean or
   * function that returns a boolean.
   *
   * ```js
   * var detects = {
   *  'hasjquery': 'jQuery' in window,
   *  'itstuesday': function() {
   *    var d = new Date();
   *    return d.getDay() === 2;
   *  }
   * }
   *
   * Modernizr.addTest(detects);
   * ```
   *
   * There is really no difference between the first methods and this one, it is
   * just a convenience to let you write more readable code.
   */

  function addTest(feature, test) {

    if (typeof feature == 'object') {
      for (var key in feature) {
        if (hasOwnProp(feature, key)) {
          addTest(key, feature[ key ]);
        }
      }
    } else {

      feature = feature.toLowerCase();
      var featureNameSplit = feature.split('.');
      var last = Modernizr[featureNameSplit[0]];

      // Again, we don't check for parent test existence. Get that right, though.
      if (featureNameSplit.length == 2) {
        last = last[featureNameSplit[1]];
      }

      if (typeof last != 'undefined') {
        // we're going to quit if you're trying to overwrite an existing test
        // if we were to allow it, we'd do this:
        //   var re = new RegExp("\\b(no-)?" + feature + "\\b");
        //   docElement.className = docElement.className.replace( re, '' );
        // but, no rly, stuff 'em.
        return Modernizr;
      }

      test = typeof test == 'function' ? test() : test;

      // Set the value (this is the magic, right here).
      if (featureNameSplit.length == 1) {
        Modernizr[featureNameSplit[0]] = test;
      } else {
        // cast to a Boolean, if not one already
        if (Modernizr[featureNameSplit[0]] && !(Modernizr[featureNameSplit[0]] instanceof Boolean)) {
          Modernizr[featureNameSplit[0]] = new Boolean(Modernizr[featureNameSplit[0]]);
        }

        Modernizr[featureNameSplit[0]][featureNameSplit[1]] = test;
      }

      // Set a single class (either `feature` or `no-feature`)
      setClasses([(!!test && test != false ? '' : 'no-') + featureNameSplit.join('-')]);

      // Trigger the event
      Modernizr._trigger(feature, test);
    }

    return Modernizr; // allow chaining.
  }

  // After all the tests are run, add self to the Modernizr prototype
  Modernizr._q.push(function() {
    ModernizrProto.addTest = addTest;
  });

  

/*!
{
  "name": "SVG as an <img> tag source",
  "property": "svgasimg",
  "caniuse" : "svg-img",
  "tags": ["svg"],
  "aliases": ["svgincss"],
  "authors": ["Chris Coyier"],
  "notes": [{
    "name": "HTML5 Spec",
    "href": "http://www.w3.org/TR/html5/embedded-content-0.html#the-img-element"
  }]
}
!*/


  // Original Async test by Stu Cox
  // https://gist.github.com/chriscoyier/8774501

  // Now a Sync test based on good results here
  // http://codepen.io/chriscoyier/pen/bADFx

  // Note http://www.w3.org/TR/SVG11/feature#Image is *supposed* to represent
  // support for the `<image>` tag in SVG, not an SVG file linked from an `<img>`
  // tag in HTML – but it’s a heuristic which works
  Modernizr.addTest('svgasimg', document.implementation.hasFeature('http://www.w3.org/TR/SVG11/feature#Image', '1.1'));


  /**
   * cssToDOM takes a kebab-case string and converts it to camelCase
   * e.g. box-sizing -> boxSizing
   *
   * @access private
   * @function cssToDOM
   * @param {string} name - String name of kebab-case prop we want to convert
   * @returns {string} The camelCase version of the supplied name
   */

  function cssToDOM(name) {
    return name.replace(/([a-z])-([a-z])/g, function(str, m1, m2) {
      return m1 + m2.toUpperCase();
    }).replace(/^-/, '');
  }
  ;

  /**
   * getBody returns the body of a document, or an element that can stand in for
   * the body if a real body does not exist
   *
   * @access private
   * @function getBody
   * @returns {HTMLElement|SVGElement} Returns the real body of a document, or an
   * artificially created element that stands in for the body
   */

  function getBody() {
    // After page load injecting a fake body doesn't work so check if body exists
    var body = document.body;

    if (!body) {
      // Can't use the real body create a fake one.
      body = createElement(isSVG ? 'svg' : 'body');
      body.fake = true;
    }

    return body;
  }

  ;

  /**
   * injectElementWithStyles injects an element with style element and some CSS rules
   *
   * @access private
   * @function injectElementWithStyles
   * @param {string} rule - String representing a css rule
   * @param {function} callback - A function that is used to test the injected element
   * @param {number} [nodes] - An integer representing the number of additional nodes you want injected
   * @param {string[]} [testnames] - An array of strings that are used as ids for the additional nodes
   * @returns {boolean}
   */

  function injectElementWithStyles(rule, callback, nodes, testnames) {
    var mod = 'modernizr';
    var style;
    var ret;
    var node;
    var docOverflow;
    var div = createElement('div');
    var body = getBody();

    if (parseInt(nodes, 10)) {
      // In order not to give false positives we create a node for each test
      // This also allows the method to scale for unspecified uses
      while (nodes--) {
        node = createElement('div');
        node.id = testnames ? testnames[nodes] : mod + (nodes + 1);
        div.appendChild(node);
      }
    }

    style = createElement('style');
    style.type = 'text/css';
    style.id = 's' + mod;

    // IE6 will false positive on some tests due to the style element inside the test div somehow interfering offsetHeight, so insert it into body or fakebody.
    // Opera will act all quirky when injecting elements in documentElement when page is served as xml, needs fakebody too. #270
    (!body.fake ? div : body).appendChild(style);
    body.appendChild(div);

    if (style.styleSheet) {
      style.styleSheet.cssText = rule;
    } else {
      style.appendChild(document.createTextNode(rule));
    }
    div.id = mod;

    if (body.fake) {
      //avoid crashing IE8, if background image is used
      body.style.background = '';
      //Safari 5.13/5.1.4 OSX stops loading if ::-webkit-scrollbar is used and scrollbars are visible
      body.style.overflow = 'hidden';
      docOverflow = docElement.style.overflow;
      docElement.style.overflow = 'hidden';
      docElement.appendChild(body);
    }

    ret = callback(div, rule);
    // If this is done after page load we don't want to remove the body so check if body exists
    if (body.fake) {
      body.parentNode.removeChild(body);
      docElement.style.overflow = docOverflow;
      // Trigger layout so kinetic scrolling isn't disabled in iOS6+
      // eslint-disable-next-line
      docElement.offsetHeight;
    } else {
      div.parentNode.removeChild(div);
    }

    return !!ret;

  }

  ;

  /**
   * testStyles injects an element with style element and some CSS rules
   *
   * @memberof Modernizr
   * @name Modernizr.testStyles
   * @optionName Modernizr.testStyles()
   * @optionProp testStyles
   * @access public
   * @function testStyles
   * @param {string} rule - String representing a css rule
   * @param {function} callback - A function that is used to test the injected element
   * @param {number} [nodes] - An integer representing the number of additional nodes you want injected
   * @param {string[]} [testnames] - An array of strings that are used as ids for the additional nodes
   * @returns {boolean}
   * @example
   *
   * `Modernizr.testStyles` takes a CSS rule and injects it onto the current page
   * along with (possibly multiple) DOM elements. This lets you check for features
   * that can not be detected by simply checking the [IDL](https://developer.mozilla.org/en-US/docs/Mozilla/Developer_guide/Interface_development_guide/IDL_interface_rules).
   *
   * ```js
   * Modernizr.testStyles('#modernizr { width: 9px; color: papayawhip; }', function(elem, rule) {
   *   // elem is the first DOM node in the page (by default #modernizr)
   *   // rule is the first argument you supplied - the CSS rule in string form
   *
   *   addTest('widthworks', elem.style.width === '9px')
   * });
   * ```
   *
   * If your test requires multiple nodes, you can include a third argument
   * indicating how many additional div elements to include on the page. The
   * additional nodes are injected as children of the `elem` that is returned as
   * the first argument to the callback.
   *
   * ```js
   * Modernizr.testStyles('#modernizr {width: 1px}; #modernizr2 {width: 2px}', function(elem) {
   *   document.getElementById('modernizr').style.width === '1px'; // true
   *   document.getElementById('modernizr2').style.width === '2px'; // true
   *   elem.firstChild === document.getElementById('modernizr2'); // true
   * }, 1);
   * ```
   *
   * By default, all of the additional elements have an ID of `modernizr[n]`, where
   * `n` is its index (e.g. the first additional, second overall is `#modernizr2`,
   * the second additional is `#modernizr3`, etc.).
   * If you want to have more meaningful IDs for your function, you can provide
   * them as the fourth argument, as an array of strings
   *
   * ```js
   * Modernizr.testStyles('#foo {width: 10px}; #bar {height: 20px}', function(elem) {
   *   elem.firstChild === document.getElementById('foo'); // true
   *   elem.lastChild === document.getElementById('bar'); // true
   * }, 2, ['foo', 'bar']);
   * ```
   *
   */

  var testStyles = ModernizrProto.testStyles = injectElementWithStyles;
  
/*!
{
  "name": "CSS :checked pseudo-selector",
  "caniuse": "css-sel3",
  "property": "checked",
  "tags": ["css"],
  "notes": [{
    "name": "Related Github Issue",
    "href": "https://github.com/Modernizr/Modernizr/pull/879"
  }]
}
!*/

  Modernizr.addTest('checked', function() {
    return testStyles('#modernizr {position:absolute} #modernizr input {margin-left:10px} #modernizr :checked {margin-left:20px;display:block}', function(elem) {
      var cb = createElement('input');
      cb.setAttribute('type', 'checkbox');
      cb.setAttribute('checked', 'checked');
      elem.appendChild(cb);
      return cb.offsetLeft === 20;
    });
  });

/*!
{
  "name": "CSS Display table",
  "property": "displaytable",
  "caniuse": "css-table",
  "authors": ["scottjehl"],
  "tags": ["css"],
  "builderAliases": ["css_displaytable"],
  "notes": [{
    "name": "Detects for all additional table display values",
    "href": "http://pastebin.com/Gk9PeVaQ"
  }]
}
!*/
/* DOC
`display: table` and `table-cell` test. (both are tested under one name `table-cell` )
*/

  // If a document is in rtl mode this test will fail so we force ltr mode on the injeced
  // element https://github.com/Modernizr/Modernizr/issues/716
  testStyles('#modernizr{display: table; direction: ltr}#modernizr div{display: table-cell; padding: 10px}', function(elem) {
    var ret;
    var child = elem.childNodes;
    ret = child[0].offsetLeft < child[1].offsetLeft;
    Modernizr.addTest('displaytable', ret, {aliases: ['display-table']});
  }, 2);

/*!
{
  "name": "CSS Generated Content",
  "property": "generatedcontent",
  "tags": ["css"],
  "warnings": ["Android won't return correct height for anything below 7px #738"],
  "notes": [{
    "name": "W3C CSS Selectors Level 3 spec",
    "href": "https://www.w3.org/TR/css3-selectors/#gen-content"
  },{
    "name": "MDN article on :before",
    "href": "https://developer.mozilla.org/en-US/docs/Web/CSS/::before"
  },{
    "name": "MDN article on :after",
    "href": "https://developer.mozilla.org/en-US/docs/Web/CSS/::before"
  }]
}
!*/

  testStyles('#modernizr{font:0/0 a}#modernizr:after{content:":)";visibility:hidden;font:7px/1 a}', function(node) {
    // See bug report on why this value is 6 crbug.com/608142
    Modernizr.addTest('generatedcontent', node.offsetHeight >= 6);
  });

/*! {
  "name": "CSS Hairline",
  "property": "hairline",
  "tags": ["css"],
  "authors": ["strarsis"],
  "notes": [{
    "name": "Blog post about CSS retina hairlines",
    "href": "http://dieulot.net/css-retina-hairline"
  },{
    "name": "Derived from",
    "href": "https://gist.github.com/dieulot/520a49463f6058fbc8d1"
  }]
}
!*/
/* DOC
Detects support for hidpi/retina hairlines, which are CSS borders with less than 1px in width, for being physically 1px on hidpi screens.
*/


  Modernizr.addTest('hairline', function() {
    return testStyles('#modernizr {border:.5px solid transparent}', function(elem) {
      return elem.offsetHeight === 1;
    });
  });

/*!
{
  "name": "CSS :invalid pseudo-class",
  "property": "cssinvalid",
  "notes": [{
    "name": "MDN documentation",
    "href": "https://developer.mozilla.org/en-US/docs/Web/CSS/:invalid"
  }]
}
!*/
/* DOC
  Detects support for the ':invalid' CSS pseudo-class.
*/

  Modernizr.addTest('cssinvalid', function() {
    return testStyles('#modernizr input{height:0;border:0;padding:0;margin:0;width:10px} #modernizr input:invalid{width:50px}', function(elem) {
      var input = createElement('input');
      input.required = true;
      elem.appendChild(input);
      return input.clientWidth > 10;
    });
  });

/*!
{
  "name": "CSS :last-child pseudo-selector",
  "caniuse": "css-sel3",
  "property": "lastchild",
  "tags": ["css"],
  "builderAliases": ["css_lastchild"],
  "notes": [{
    "name": "Related Github Issue",
    "href": "https://github.com/Modernizr/Modernizr/pull/304"
  }]
}
!*/

  testStyles('#modernizr div {width:100px} #modernizr :last-child{width:200px;display:block}', function(elem) {
    Modernizr.addTest('lastchild', elem.lastChild.offsetWidth > elem.firstChild.offsetWidth);
  }, 2);

/*!
{
  "name": "CSS :nth-child pseudo-selector",
  "caniuse": "css-sel3",
  "property": "nthchild",
  "tags": ["css"],
  "notes": [
    {
      "name": "Related Github Issue",
      "href": "https://github.com/Modernizr/Modernizr/pull/685"
    },
    {
      "name": "Sitepoint :nth-child documentation",
      "href": "http://reference.sitepoint.com/css/pseudoclass-nthchild"
    }
  ],
  "authors": ["@emilchristensen"],
  "warnings": ["Known false negative in Safari 3.1 and Safari 3.2.2"]
}
!*/
/* DOC
Detects support for the ':nth-child()' CSS pseudo-selector.
*/

  // 5 `<div>` elements with `1px` width are created.
  // Then every other element has its `width` set to `2px`.
  // A Javascript loop then tests if the `<div>`s have the expected width
  // using the modulus operator.
  testStyles('#modernizr div {width:1px} #modernizr div:nth-child(2n) {width:2px;}', function(elem) {
    var elems = elem.getElementsByTagName('div');
    var correctWidths = true;

    for (var i = 0; i < 5; i++) {
      correctWidths = correctWidths && elems[i].offsetWidth === i % 2 + 1;
    }
    Modernizr.addTest('nthchild', correctWidths);
  }, 5);

/*!
{
  "name": "CSS Stylable Scrollbars",
  "property": "cssscrollbar",
  "tags": ["css"],
  "builderAliases": ["css_scrollbars"]
}
!*/

  testStyles('#modernizr{overflow: scroll; width: 40px; height: 40px; }#' + prefixes
    .join('scrollbar{width:10px}' + ' #modernizr::')
    .split('#')
    .slice(1)
    .join('#') + 'scrollbar{width:10px}',
  function(node) {
    Modernizr.addTest('cssscrollbar', 'scrollWidth' in node && node.scrollWidth == 30);
  });

/*!
{
  "name": "CSS general sibling selector",
  "caniuse": "css-sel3",
  "property": "siblinggeneral",
  "tags": ["css"],
  "notes": [{
    "name": "Related Github Issue",
    "href": "https://github.com/Modernizr/Modernizr/pull/889"
  }]
}
!*/

  Modernizr.addTest('siblinggeneral', function() {
    return testStyles('#modernizr div {width:100px} #modernizr div ~ div {width:200px;display:block}', function(elem) {
      return elem.lastChild.offsetWidth == 200;
    }, 2);
  });

/*!
{
  "name": "CSS Subpixel Fonts",
  "property": "subpixelfont",
  "tags": ["css"],
  "builderAliases": ["css_subpixelfont"],
  "authors": [
    "@derSchepp",
    "@gerritvanaaken",
    "@rodneyrehm",
    "@yatil",
    "@ryanseddon"
  ],
  "notes": [{
    "name": "Origin Test",
    "href": "https://github.com/gerritvanaaken/subpixeldetect"
  }]
}
!*/

  /*
   * (to infer if GDI or DirectWrite is used on Windows)
   */
  testStyles(
    '#modernizr{position: absolute; top: -10em; visibility:hidden; font: normal 10px arial;}#subpixel{float: left; font-size: 33.3333%;}',
  function(elem) {
    var subpixel = elem.firstChild;
    subpixel.innerHTML = 'This is a text written in Arial';
    Modernizr.addTest('subpixelfont', window.getComputedStyle ?
      window.getComputedStyle(subpixel, null).getPropertyValue('width') !== '44px'
    : false);
  }, 1, ['subpixel']);

/*!
{
  "name": "CSS :valid pseudo-class",
  "property": "cssvalid",
  "notes": [{
    "name": "MDN documentation",
    "href": "https://developer.mozilla.org/en-US/docs/Web/CSS/:valid"
  }]
}
!*/
/* DOC
  Detects support for the ':valid' CSS pseudo-class.
*/

  Modernizr.addTest('cssvalid', function() {
    return testStyles('#modernizr input{height:0;border:0;padding:0;margin:0;width:10px} #modernizr input:valid{width:50px}', function(elem) {
      var input = createElement('input');
      elem.appendChild(input);
      return input.clientWidth > 10;
    });
  });

/*!
{
  "name": "CSS vh unit",
  "property": "cssvhunit",
  "caniuse": "viewport-units",
  "tags": ["css"],
  "builderAliases": ["css_vhunit"],
  "notes": [{
    "name": "Related Modernizr Issue",
    "href": "https://github.com/Modernizr/Modernizr/issues/572"
  },{
    "name": "Similar JSFiddle",
    "href": "https://jsfiddle.net/FWeinb/etnYC/"
  }]
}
!*/

  testStyles('#modernizr { height: 50vh; }', function(elem) {
    var height = parseInt(window.innerHeight / 2, 10);
    var compStyle = parseInt(computedStyle(elem, null, 'height'), 10);

    Modernizr.addTest('cssvhunit', roundedEquals(compStyle, height));
  });

/*!
{
  "name": "CSS vmax unit",
  "property": "cssvmaxunit",
  "caniuse": "viewport-units",
  "tags": ["css"],
  "builderAliases": ["css_vmaxunit"],
  "notes": [{
    "name": "Related Modernizr Issue",
    "href": "https://github.com/Modernizr/Modernizr/issues/572"
  },{
    "name": "JSFiddle Example",
    "href": "https://jsfiddle.net/glsee/JDsWQ/4/"
  }]
}
!*/

  testStyles('#modernizr1{width: 50vmax}#modernizr2{width:50px;height:50px;overflow:scroll}#modernizr3{position:fixed;top:0;left:0;bottom:0;right:0}', function(node) {
    var elem = node.childNodes[2];
    var scroller = node.childNodes[1];
    var fullSizeElem = node.childNodes[0];
    var scrollbarWidth = parseInt((scroller.offsetWidth - scroller.clientWidth) / 2, 10);

    var one_vw = fullSizeElem.clientWidth / 100;
    var one_vh = fullSizeElem.clientHeight / 100;
    var expectedWidth = parseInt(Math.max(one_vw, one_vh) * 50, 10);
    var compWidth = parseInt(computedStyle(elem, null, 'width'), 10);

    Modernizr.addTest('cssvmaxunit', roundedEquals(expectedWidth, compWidth) || roundedEquals(expectedWidth, compWidth - scrollbarWidth));
  }, 3);

/*!
{
  "name": "CSS vmin unit",
  "property": "cssvminunit",
  "caniuse": "viewport-units",
  "tags": ["css"],
  "builderAliases": ["css_vminunit"],
  "notes": [{
    "name": "Related Modernizr Issue",
    "href": "https://github.com/Modernizr/Modernizr/issues/572"
  },{
    "name": "JSFiddle Example",
    "href": "https://jsfiddle.net/glsee/JRmdq/8/"
  }]
}
!*/

  testStyles('#modernizr1{width: 50vm;width:50vmin}#modernizr2{width:50px;height:50px;overflow:scroll}#modernizr3{position:fixed;top:0;left:0;bottom:0;right:0}', function(node) {
    var elem = node.childNodes[2];
    var scroller = node.childNodes[1];
    var fullSizeElem = node.childNodes[0];
    var scrollbarWidth = parseInt((scroller.offsetWidth - scroller.clientWidth) / 2, 10);

    var one_vw = fullSizeElem.clientWidth / 100;
    var one_vh = fullSizeElem.clientHeight / 100;
    var expectedWidth = parseInt(Math.min(one_vw, one_vh) * 50, 10);
    var compWidth = parseInt(computedStyle(elem, null, 'width'), 10);

    Modernizr.addTest('cssvminunit', roundedEquals(expectedWidth, compWidth) || roundedEquals(expectedWidth, compWidth - scrollbarWidth));
  }, 3);

/*!
{
  "name": "CSS vw unit",
  "property": "cssvwunit",
  "caniuse": "viewport-units",
  "tags": ["css"],
  "builderAliases": ["css_vwunit"],
  "notes": [{
    "name": "Related Modernizr Issue",
    "href": "https://github.com/Modernizr/Modernizr/issues/572"
  },{
    "name": "JSFiddle Example",
    "href": "https://jsfiddle.net/FWeinb/etnYC/"
  }]
}
!*/

  testStyles('#modernizr { width: 50vw; }', function(elem) {
    var width = parseInt(window.innerWidth / 2, 10);
    var compStyle = parseInt(computedStyle(elem, null, 'width'), 10);

    Modernizr.addTest('cssvwunit', roundedEquals(compStyle, width));
  });


  var mStyle = {
    style: modElem.elem.style
  };

  // kill ref for gc, must happen before mod.elem is removed, so we unshift on to
  // the front of the queue.
  Modernizr._q.unshift(function() {
    delete mStyle.style;
  });

  

  /**
   * If the browsers follow the spec, then they would expose vendor-specific styles as:
   *   elem.style.WebkitBorderRadius
   * instead of something like the following (which is technically incorrect):
   *   elem.style.webkitBorderRadius

   * WebKit ghosts their properties in lowercase but Opera & Moz do not.
   * Microsoft uses a lowercase `ms` instead of the correct `Ms` in IE8+
   *   erik.eae.net/archives/2008/03/10/21.48.10/

   * More here: github.com/Modernizr/Modernizr/issues/issue/21
   *
   * @access private
   * @returns {string} The string representing the vendor-specific style properties
   */

  var omPrefixes = 'Moz O ms Webkit';
  

  var cssomPrefixes = (ModernizrProto._config.usePrefixes ? omPrefixes.split(' ') : []);
  ModernizrProto._cssomPrefixes = cssomPrefixes;
  

  /**
   * atRule returns a given CSS property at-rule (eg @keyframes), possibly in
   * some prefixed form, or false, in the case of an unsupported rule
   *
   * @memberof Modernizr
   * @name Modernizr.atRule
   * @optionName Modernizr.atRule()
   * @optionProp atRule
   * @access public
   * @function atRule
   * @param {string} prop - String name of the @-rule to test for
   * @returns {string|boolean} The string representing the (possibly prefixed)
   * valid version of the @-rule, or `false` when it is unsupported.
   * @example
   * ```js
   *  var keyframes = Modernizr.atRule('@keyframes');
   *
   *  if (keyframes) {
   *    // keyframes are supported
   *    // could be `@-webkit-keyframes` or `@keyframes`
   *  } else {
   *    // keyframes === `false`
   *  }
   * ```
   *
   */

  var atRule = function(prop) {
    var length = prefixes.length;
    var cssrule = window.CSSRule;
    var rule;

    if (typeof cssrule === 'undefined') {
      return undefined;
    }

    if (!prop) {
      return false;
    }

    // remove literal @ from beginning of provided property
    prop = prop.replace(/^@/, '');

    // CSSRules use underscores instead of dashes
    rule = prop.replace(/-/g, '_').toUpperCase() + '_RULE';

    if (rule in cssrule) {
      return '@' + prop;
    }

    for (var i = 0; i < length; i++) {
      // prefixes gives us something like -o-, and we want O_
      var prefix = prefixes[i];
      var thisRule = prefix.toUpperCase() + '_' + rule;

      if (thisRule in cssrule) {
        return '@-' + prefix.toLowerCase() + '-' + prop;
      }
    }

    return false;
  };

  ModernizrProto.atRule = atRule;

  

  /**
   * List of JavaScript DOM values used for tests
   *
   * @memberof Modernizr
   * @name Modernizr._domPrefixes
   * @optionName Modernizr._domPrefixes
   * @optionProp domPrefixes
   * @access public
   * @example
   *
   * Modernizr._domPrefixes is exactly the same as [_prefixes](#modernizr-_prefixes), but rather
   * than kebab-case properties, all properties are their Capitalized variant
   *
   * ```js
   * Modernizr._domPrefixes === [ "Moz", "O", "ms", "Webkit" ];
   * ```
   */

  var domPrefixes = (ModernizrProto._config.usePrefixes ? omPrefixes.toLowerCase().split(' ') : []);
  ModernizrProto._domPrefixes = domPrefixes;
  

  /**
   * fnBind is a super small [bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind) polyfill.
   *
   * @access private
   * @function fnBind
   * @param {function} fn - a function you want to change `this` reference to
   * @param {object} that - the `this` you want to call the function with
   * @returns {function} The wrapped version of the supplied function
   */

  function fnBind(fn, that) {
    return function() {
      return fn.apply(that, arguments);
    };
  }

  ;

  /**
   * testDOMProps is a generic DOM property test; if a browser supports
   *   a certain property, it won't return undefined for it.
   *
   * @access private
   * @function testDOMProps
   * @param {array.<string>} props - An array of properties to test for
   * @param {object} obj - An object or Element you want to use to test the parameters again
   * @param {boolean|object} elem - An Element to bind the property lookup again. Use `false` to prevent the check
   * @returns {false|*} returns false if the prop is unsupported, otherwise the value that is supported
   */
  function testDOMProps(props, obj, elem) {
    var item;

    for (var i in props) {
      if (props[i] in obj) {

        // return the property name as a string
        if (elem === false) {
          return props[i];
        }

        item = obj[props[i]];

        // let's bind a function
        if (is(item, 'function')) {
          // bind to obj unless overriden
          return fnBind(item, elem || obj);
        }

        // return the unbound function or obj or value
        return item;
      }
    }
    return false;
  }

  ;

  /**
   * domToCSS takes a camelCase string and converts it to kebab-case
   * e.g. boxSizing -> box-sizing
   *
   * @access private
   * @function domToCSS
   * @param {string} name - String name of camelCase prop we want to convert
   * @returns {string} The kebab-case version of the supplied name
   */

  function domToCSS(name) {
    return name.replace(/([A-Z])/g, function(str, m1) {
      return '-' + m1.toLowerCase();
    }).replace(/^ms-/, '-ms-');
  }
  ;

  /**
   * nativeTestProps allows for us to use native feature detection functionality if available.
   * some prefixed form, or false, in the case of an unsupported rule
   *
   * @access private
   * @function nativeTestProps
   * @param {array} props - An array of property names
   * @param {string} value - A string representing the value we want to check via @supports
   * @returns {boolean|undefined} A boolean when @supports exists, undefined otherwise
   */

  // Accepts a list of property names and a single value
  // Returns `undefined` if native detection not available
  function nativeTestProps(props, value) {
    var i = props.length;
    // Start with the JS API: http://www.w3.org/TR/css3-conditional/#the-css-interface
    if ('CSS' in window && 'supports' in window.CSS) {
      // Try every prefixed variant of the property
      while (i--) {
        if (window.CSS.supports(domToCSS(props[i]), value)) {
          return true;
        }
      }
      return false;
    }
    // Otherwise fall back to at-rule (for Opera 12.x)
    else if ('CSSSupportsRule' in window) {
      // Build a condition string for every prefixed variant
      var conditionText = [];
      while (i--) {
        conditionText.push('(' + domToCSS(props[i]) + ':' + value + ')');
      }
      conditionText = conditionText.join(' or ');
      return injectElementWithStyles('@supports (' + conditionText + ') { #modernizr { position: absolute; } }', function(node) {
        return computedStyle(node, null, 'position') == 'absolute';
      });
    }
    return undefined;
  }
  ;

  // testProps is a generic CSS / DOM property test.

  // In testing support for a given CSS property, it's legit to test:
  //    `elem.style[styleName] !== undefined`
  // If the property is supported it will return an empty string,
  // if unsupported it will return undefined.

  // We'll take advantage of this quick test and skip setting a style
  // on our modernizr element, but instead just testing undefined vs
  // empty string.

  // Property names can be provided in either camelCase or kebab-case.

  function testProps(props, prefixed, value, skipValueTest) {
    skipValueTest = is(skipValueTest, 'undefined') ? false : skipValueTest;

    // Try native detect first
    if (!is(value, 'undefined')) {
      var result = nativeTestProps(props, value);
      if (!is(result, 'undefined')) {
        return result;
      }
    }

    // Otherwise do it properly
    var afterInit, i, propsLength, prop, before;

    // If we don't have a style element, that means we're running async or after
    // the core tests, so we'll need to create our own elements to use

    // inside of an SVG element, in certain browsers, the `style` element is only
    // defined for valid tags. Therefore, if `modernizr` does not have one, we
    // fall back to a less used element and hope for the best.
    // for strict XHTML browsers the hardly used samp element is used
    var elems = ['modernizr', 'tspan', 'samp'];
    while (!mStyle.style && elems.length) {
      afterInit = true;
      mStyle.modElem = createElement(elems.shift());
      mStyle.style = mStyle.modElem.style;
    }

    // Delete the objects if we created them.
    function cleanElems() {
      if (afterInit) {
        delete mStyle.style;
        delete mStyle.modElem;
      }
    }

    propsLength = props.length;
    for (i = 0; i < propsLength; i++) {
      prop = props[i];
      before = mStyle.style[prop];

      if (contains(prop, '-')) {
        prop = cssToDOM(prop);
      }

      if (mStyle.style[prop] !== undefined) {

        // If value to test has been passed in, do a set-and-check test.
        // 0 (integer) is a valid property value, so check that `value` isn't
        // undefined, rather than just checking it's truthy.
        if (!skipValueTest && !is(value, 'undefined')) {

          // Needs a try catch block because of old IE. This is slow, but will
          // be avoided in most cases because `skipValueTest` will be used.
          try {
            mStyle.style[prop] = value;
          } catch (e) {}

          // If the property value has changed, we assume the value used is
          // supported. If `value` is empty string, it'll fail here (because
          // it hasn't changed), which matches how browsers have implemented
          // CSS.supports()
          if (mStyle.style[prop] != before) {
            cleanElems();
            return prefixed == 'pfx' ? prop : true;
          }
        }
        // Otherwise just return true, or the property name if this is a
        // `prefixed()` call
        else {
          cleanElems();
          return prefixed == 'pfx' ? prop : true;
        }
      }
    }
    cleanElems();
    return false;
  }

  ;

  /**
   * testProp() investigates whether a given style property is recognized
   * Property names can be provided in either camelCase or kebab-case.
   *
   * @memberof Modernizr
   * @name Modernizr.testProp
   * @access public
   * @optionName Modernizr.testProp()
   * @optionProp testProp
   * @function testProp
   * @param {string} prop - Name of the CSS property to check
   * @param {string} [value] - Name of the CSS value to check
   * @param {boolean} [useValue] - Whether or not to check the value if @supports isn't supported
   * @returns {boolean}
   * @example
   *
   * Just like [testAllProps](#modernizr-testallprops), only it does not check any vendor prefixed
   * version of the string.
   *
   * Note that the property name must be provided in camelCase (e.g. boxSizing not box-sizing)
   *
   * ```js
   * Modernizr.testProp('pointerEvents')  // true
   * ```
   *
   * You can also provide a value as an optional second argument to check if a
   * specific value is supported
   *
   * ```js
   * Modernizr.testProp('pointerEvents', 'none') // true
   * Modernizr.testProp('pointerEvents', 'penguin') // false
   * ```
   */

  var testProp = ModernizrProto.testProp = function(prop, value, useValue) {
    return testProps([prop], undefined, value, useValue);
  };
  
/*!
{
  "name": "CSS textshadow",
  "property": "textshadow",
  "caniuse": "css-textshadow",
  "tags": ["css"],
  "knownBugs": ["FF3.0 will false positive on this test"]
}
!*/

  Modernizr.addTest('textshadow', testProp('textShadow', '1px 1px'));


  /**
   * testPropsAll tests a list of DOM properties we want to check against.
   * We specify literally ALL possible (known and/or likely) properties on
   * the element including the non-vendor prefixed one, for forward-
   * compatibility.
   *
   * @access private
   * @function testPropsAll
   * @param {string} prop - A string of the property to test for
   * @param {string|object} [prefixed] - An object to check the prefixed properties on. Use a string to skip
   * @param {HTMLElement|SVGElement} [elem] - An element used to test the property and value against
   * @param {string} [value] - A string of a css value
   * @param {boolean} [skipValueTest] - An boolean representing if you want to test if value sticks when set
   * @returns {false|string} returns the string version of the property, or false if it is unsupported
   */
  function testPropsAll(prop, prefixed, elem, value, skipValueTest) {

    var ucProp = prop.charAt(0).toUpperCase() + prop.slice(1),
      props = (prop + ' ' + cssomPrefixes.join(ucProp + ' ') + ucProp).split(' ');

    // did they call .prefixed('boxSizing') or are we just testing a prop?
    if (is(prefixed, 'string') || is(prefixed, 'undefined')) {
      return testProps(props, prefixed, value, skipValueTest);

      // otherwise, they called .prefixed('requestAnimationFrame', window[, elem])
    } else {
      props = (prop + ' ' + (domPrefixes).join(ucProp + ' ') + ucProp).split(' ');
      return testDOMProps(props, prefixed, elem);
    }
  }

  // Modernizr.testAllProps() investigates whether a given style property,
  // or any of its vendor-prefixed variants, is recognized
  //
  // Note that the property names must be provided in the camelCase variant.
  // Modernizr.testAllProps('boxSizing')
  ModernizrProto.testAllProps = testPropsAll;

  

  /**
   * testAllProps determines whether a given CSS property is supported in the browser
   *
   * @memberof Modernizr
   * @name Modernizr.testAllProps
   * @optionName Modernizr.testAllProps()
   * @optionProp testAllProps
   * @access public
   * @function testAllProps
   * @param {string} prop - String naming the property to test (either camelCase or kebab-case)
   * @param {string} [value] - String of the value to test
   * @param {boolean} [skipValueTest=false] - Whether to skip testing that the value is supported when using non-native detection
   * @example
   *
   * testAllProps determines whether a given CSS property, in some prefixed form,
   * is supported by the browser.
   *
   * ```js
   * testAllProps('boxSizing')  // true
   * ```
   *
   * It can optionally be given a CSS value in string form to test if a property
   * value is valid
   *
   * ```js
   * testAllProps('display', 'block') // true
   * testAllProps('display', 'penguin') // false
   * ```
   *
   * A boolean can be passed as a third parameter to skip the value check when
   * native detection (@supports) isn't available.
   *
   * ```js
   * testAllProps('shapeOutside', 'content-box', true);
   * ```
   */

  function testAllProps(prop, value, skipValueTest) {
    return testPropsAll(prop, undefined, undefined, value, skipValueTest);
  }
  ModernizrProto.testAllProps = testAllProps;
  
/*!
{
  "name": "CSS Animations",
  "property": "cssanimations",
  "caniuse": "css-animation",
  "polyfills": ["transformie", "csssandpaper"],
  "tags": ["css"],
  "warnings": ["Android < 4 will pass this test, but can only animate a single property at a time"],
  "notes": [{
    "name" : "Article: 'Dispelling the Android CSS animation myths'",
    "href": "https://goo.gl/OGw5Gm"
  }]
}
!*/
/* DOC
Detects whether or not elements can be animated using CSS
*/

  Modernizr.addTest('cssanimations', testAllProps('animationName', 'a', true));

/*!
{
  "name": "CSS Generated Content Animations",
  "property": "csspseudoanimations",
  "tags": ["css"]
}
!*/

  Modernizr.addTest('csspseudoanimations', function() {
    var result = false;

    if (!Modernizr.cssanimations || !window.getComputedStyle) {
      return result;
    }

    var styles = [
      '@', Modernizr._prefixes.join('keyframes csspseudoanimations { from { font-size: 10px; } }@').replace(/\@$/, ''),
      '#modernizr:before { content:" "; font-size:5px;',
      Modernizr._prefixes.join('animation:csspseudoanimations 1ms infinite;'),
      '}'
    ].join('');

    Modernizr.testStyles(styles, function(elem) {
      result = window.getComputedStyle(elem, ':before').getPropertyValue('font-size') === '10px';
    });

    return result;
  });

/*!
{
  "name": "Appearance",
  "property": "appearance",
  "caniuse": "css-appearance",
  "tags": ["css"],
  "notes": [{
    "name": "MDN documentation",
    "href": "https://developer.mozilla.org/en-US/docs/Web/CSS/-moz-appearance"
  },{
    "name": "CSS-Tricks CSS Almanac: appearance",
    "href": "https://css-tricks.com/almanac/properties/a/appearance/"
  }]
}
!*/
/* DOC
Detects support for the `appearance` css property, which is used to make an
element inherit the style of a standard user interface element. It can also be
used to remove the default styles of an element, such as input and buttons.
*/

  Modernizr.addTest('appearance', testAllProps('appearance'));

/*!
{
  "name": "Backdrop Filter",
  "property": "backdropfilter",
  "authors": ["Brian Seward"],
  "tags": ["css"],
  "notes": [
    {
      "name": "W3C Editor’s Draft specification",
      "href": "https://drafts.fxtf.org/filters-2/#BackdropFilterProperty"
    },
    {
      "name": "Caniuse for CSS Backdrop Filter",
      "href": "http://caniuse.com/#feat=css-backdrop-filter"
    },
    {
      "name": "WebKit Blog introduction + Demo",
      "href": "https://www.webkit.org/blog/3632/introducing-backdrop-filters/"
    }
  ]
}
!*/
/* DOC
Detects support for CSS Backdrop Filters, allowing for background blur effects like those introduced in iOS 7. Support for this was added to iOS Safari/WebKit in iOS 9.
*/

  Modernizr.addTest('backdropfilter', testAllProps('backdropFilter'));

/*!
{
  "name": "CSS Display run-in",
  "property": "display-runin",
  "authors": ["alanhogan"],
  "tags": ["css"],
  "builderAliases": ["css_displayrunin"],
  "notes": [{
    "name": "CSS Tricks Article",
    "href": "https://css-tricks.com/596-run-in/"
  },{
    "name": "Related Github Issue",
    "href": "https://github.com/Modernizr/Modernizr/issues/198"
  }]
}
!*/

  Modernizr.addTest('displayrunin', testAllProps('display', 'run-in'),
    {aliases: ['display-runin']});

/*!
{
  "name": "CSS Filters",
  "property": "cssfilters",
  "caniuse": "css-filters",
  "polyfills": ["polyfilter"],
  "tags": ["css"],
  "builderAliases": ["css_filters"],
  "notes": [{
    "name": "MDN article on CSS filters",
    "href": "https://developer.mozilla.org/en-US/docs/Web/CSS/filter"
  }]
}
!*/

  Modernizr.addTest('cssfilters', function() {
    if (Modernizr.supports) {
      return testAllProps('filter', 'blur(2px)');
    } else {
      var el = createElement('a');
      el.style.cssText = prefixes.join('filter:blur(2px); ');
      // https://github.com/Modernizr/Modernizr/issues/615
      // documentMode is needed for false positives in oldIE, please see issue above
      return !!el.style.length && ((document.documentMode === undefined || document.documentMode > 9));
    }
  });


/*!
{
  "name": "Flexbox",
  "property": "flexbox",
  "caniuse": "flexbox",
  "tags": ["css"],
  "notes": [{
    "name": "The _new_ flexbox",
    "href": "http://dev.w3.org/csswg/css3-flexbox"
  }],
  "warnings": [
    "A `true` result for this detect does not imply that the `flex-wrap` property is supported; see the `flexwrap` detect."
  ]
}
!*/
/* DOC
Detects support for the Flexible Box Layout model, a.k.a. Flexbox, which allows easy manipulation of layout order and sizing within a container.
*/

  Modernizr.addTest('flexbox', testAllProps('flexBasis', '1px', true));

/*!
{
  "name": "Flexbox (legacy)",
  "property": "flexboxlegacy",
  "tags": ["css"],
  "polyfills": ["flexie"],
  "notes": [{
    "name": "The _old_ flexbox",
    "href": "https://www.w3.org/TR/2009/WD-css3-flexbox-20090723/"
  }]
}
!*/

  Modernizr.addTest('flexboxlegacy', testAllProps('boxDirection', 'reverse', true));

/*!
{
  "name": "Flexbox (tweener)",
  "property": "flexboxtweener",
  "tags": ["css"],
  "polyfills": ["flexie"],
  "notes": [{
    "name": "The _inbetween_ flexbox",
    "href": "https://www.w3.org/TR/2011/WD-css3-flexbox-20111129/"
  }],
  "warnings": ["This represents an old syntax, not the latest standard syntax."]
}
!*/

  Modernizr.addTest('flexboxtweener', testAllProps('flexAlign', 'end', true));

/*!
{
  "name": "Flex Line Wrapping",
  "property": "flexwrap",
  "tags": ["css", "flexbox"],
  "notes": [{
    "name": "W3C Flexible Box Layout spec",
    "href": "http://dev.w3.org/csswg/css3-flexbox"
  }],
  "warnings": [
    "Does not imply a modern implementation – see documentation."
  ]
}
!*/
/* DOC
Detects support for the `flex-wrap` CSS property, part of Flexbox, which isn’t present in all Flexbox implementations (notably Firefox).

This featured in both the 'tweener' syntax (implemented by IE10) and the 'modern' syntax (implemented by others). This detect will return `true` for either of these implementations, as long as the `flex-wrap` property is supported. So to ensure the modern syntax is supported, use together with `Modernizr.flexbox`:

```javascript
if (Modernizr.flexbox && Modernizr.flexwrap) {
  // Modern Flexbox with `flex-wrap` supported
}
else {
  // Either old Flexbox syntax, or `flex-wrap` not supported
}
```
*/

  Modernizr.addTest('flexwrap', testAllProps('flexWrap', 'wrap', true));

/*!
{
  "name": "CSS Hyphens",
  "caniuse": "css-hyphens",
  "property": ["csshyphens", "softhyphens", "softhyphensfind"],
  "tags": ["css"],
  "builderAliases": ["css_hyphens"],
  "async" : true,
  "authors": ["David Newton"],
  "warnings": [
    "These tests currently require document.body to be present",
    "If loading Hyphenator.js via yepnope, be cautious of issue 158: http://code.google.com/p/hyphenator/issues/detail?id=158",
    "This is very large – only include it if you absolutely need it"
    ],
  "notes": [{
    "name": "The Current State of Hyphenation on the Web.",
    "href": "http://davidnewton.ca/the-current-state-of-hyphenation-on-the-web"
  },{
    "name": "Hyphenation Test Page",
    "href": "http://davidnewton.ca/demos/hyphenation/test.html"
  },{
    "name": "Hyphenation is Language Specific",
    "href": " http://code.google.com/p/hyphenator/source/diff?spec=svn975&r=975&format=side&path=/trunk/Hyphenator.js#sc_svn975_313"
  },{
    "name": "Related Modernizr Issue",
    "href": "https://github.com/Modernizr/Modernizr/issues/312"
  }]
}
!*/


  Modernizr.addAsyncTest(function() {
    var waitTime = 300;
    setTimeout(runHyphenTest, waitTime);
    // Wait 1000ms so we can hope for document.body
    function runHyphenTest() {
      if (!document.body && !document.getElementsByTagName('body')[0]) {
        setTimeout(runHyphenTest, waitTime);
        return;
      }

      // functional test of adding hyphens:auto
      function test_hyphens_css() {
        try {
          /* create a div container and a span within that
           * these have to be appended to document.body, otherwise some browsers can give false negative */
          var div = createElement('div');
          var span = createElement('span');
          var divStyle = div.style;
          var spanHeight = 0;
          var spanWidth = 0;
          var result = false;
          var firstChild = document.body.firstElementChild || document.body.firstChild;

          div.appendChild(span);
          span.innerHTML = 'Bacon ipsum dolor sit amet jerky velit in culpa hamburger et. Laborum dolor proident, enim dolore duis commodo et strip steak. Salami anim et, veniam consectetur dolore qui tenderloin jowl velit sirloin. Et ad culpa, fatback cillum jowl ball tip ham hock nulla short ribs pariatur aute. Pig pancetta ham bresaola, ut boudin nostrud commodo flank esse cow tongue culpa. Pork belly bresaola enim pig, ea consectetur nisi. Fugiat officia turkey, ea cow jowl pariatur ullamco proident do laborum velit sausage. Magna biltong sint tri-tip commodo sed bacon, esse proident aliquip. Ullamco ham sint fugiat, velit in enim sed mollit nulla cow ut adipisicing nostrud consectetur. Proident dolore beef ribs, laborum nostrud meatball ea laboris rump cupidatat labore culpa. Shankle minim beef, velit sint cupidatat fugiat tenderloin pig et ball tip. Ut cow fatback salami, bacon ball tip et in shank strip steak bresaola. In ut pork belly sed mollit tri-tip magna culpa veniam, short ribs qui in andouille ham consequat. Dolore bacon t-bone, velit short ribs enim strip steak nulla. Voluptate labore ut, biltong swine irure jerky. Cupidatat excepteur aliquip salami dolore. Ball tip strip steak in pork dolor. Ad in esse biltong. Dolore tenderloin exercitation ad pork loin t-bone, dolore in chicken ball tip qui pig. Ut culpa tongue, sint ribeye dolore ex shank voluptate hamburger. Jowl et tempor, boudin pork chop labore ham hock drumstick consectetur tri-tip elit swine meatball chicken ground round. Proident shankle mollit dolore. Shoulder ut duis t-bone quis reprehenderit. Meatloaf dolore minim strip steak, laboris ea aute bacon beef ribs elit shank in veniam drumstick qui. Ex laboris meatball cow tongue pork belly. Ea ball tip reprehenderit pig, sed fatback boudin dolore flank aliquip laboris eu quis. Beef ribs duis beef, cow corned beef adipisicing commodo nisi deserunt exercitation. Cillum dolor t-bone spare ribs, ham hock est sirloin. Brisket irure meatloaf in, boudin pork belly sirloin ball tip. Sirloin sint irure nisi nostrud aliqua. Nostrud nulla aute, enim officia culpa ham hock. Aliqua reprehenderit dolore sunt nostrud sausage, ea boudin pork loin ut t-bone ham tempor. Tri-tip et pancetta drumstick laborum. Ham hock magna do nostrud in proident. Ex ground round fatback, venison non ribeye in.';

          document.body.insertBefore(div, firstChild);

          /* get size of unhyphenated text */
          divStyle.cssText = 'position:absolute;top:0;left:0;width:5em;text-align:justify;text-justification:newspaper;';
          spanHeight = span.offsetHeight;
          spanWidth = span.offsetWidth;

          /* compare size with hyphenated text */
          divStyle.cssText = 'position:absolute;top:0;left:0;width:5em;text-align:justify;' +
            'text-justification:newspaper;' +
            prefixes.join('hyphens:auto; ');

          result = (span.offsetHeight != spanHeight || span.offsetWidth != spanWidth);

          /* results and cleanup */
          document.body.removeChild(div);
          div.removeChild(span);

          return result;
        } catch (e) {
          return false;
        }
      }

      // for the softhyphens test
      function test_hyphens(delimiter, testWidth) {
        try {
          /* create a div container and a span within that
           * these have to be appended to document.body, otherwise some browsers can give false negative */
          var div = createElement('div');
          var span = createElement('span');
          var divStyle = div.style;
          var spanSize = 0;
          var result = false;
          var result1 = false;
          var result2 = false;
          var firstChild = document.body.firstElementChild || document.body.firstChild;

          divStyle.cssText = 'position:absolute;top:0;left:0;overflow:visible;width:1.25em;';
          div.appendChild(span);
          document.body.insertBefore(div, firstChild);


          /* get height of unwrapped text */
          span.innerHTML = 'mm';
          spanSize = span.offsetHeight;

          /* compare height w/ delimiter, to see if it wraps to new line */
          span.innerHTML = 'm' + delimiter + 'm';
          result1 = (span.offsetHeight > spanSize);

          /* if we're testing the width too (i.e. for soft-hyphen, not zws),
           * this is because tested Blackberry devices will wrap the text but not display the hyphen */
          if (testWidth) {
            /* get width of wrapped, non-hyphenated text */
            span.innerHTML = 'm<br />m';
            spanSize = span.offsetWidth;

            /* compare width w/ wrapped w/ delimiter to see if hyphen is present */
            span.innerHTML = 'm' + delimiter + 'm';
            result2 = (span.offsetWidth > spanSize);
          } else {
            result2 = true;
          }

          /* results and cleanup */
          if (result1 === true && result2 === true) { result = true; }
          document.body.removeChild(div);
          div.removeChild(span);

          return result;
        } catch (e) {
          return false;
        }
      }

      // testing if in-browser Find functionality will work on hyphenated text
      function test_hyphens_find(delimiter) {
        try {
          /* create a dummy input for resetting selection location, and a div container
           * these have to be appended to document.body, otherwise some browsers can give false negative
           * div container gets the doubled testword, separated by the delimiter
           * Note: giving a width to div gives false positive in iOS Safari */
          var dummy = createElement('input');
          var div = createElement('div');
          var testword = 'lebowski';
          var result = false;
          var textrange;
          var firstChild = document.body.firstElementChild || document.body.firstChild;

          div.innerHTML = testword + delimiter + testword;

          document.body.insertBefore(div, firstChild);
          document.body.insertBefore(dummy, div);


          /* reset the selection to the dummy input element, i.e. BEFORE the div container
           *   stackoverflow.com/questions/499126/jquery-set-cursor-position-in-text-area */
          if (dummy.setSelectionRange) {
            dummy.focus();
            dummy.setSelectionRange(0, 0);
          } else if (dummy.createTextRange) {
            textrange = dummy.createTextRange();
            textrange.collapse(true);
            textrange.moveEnd('character', 0);
            textrange.moveStart('character', 0);
            textrange.select();
          }

          /* try to find the doubled testword, without the delimiter */
          try {
            if (window.find) {
              result = window.find(testword + testword);
            } else {
              textrange = window.self.document.body.createTextRange();
              result = textrange.findText(testword + testword);
            }
          } catch (e) {
            result = false;
          }

          document.body.removeChild(div);
          document.body.removeChild(dummy);

          return result;
        } catch (e) {
          return false;
        }
      }

      addTest('csshyphens', function() {

        if (!testAllProps('hyphens', 'auto', true)) {
          return false;
        }

        /* Chrome lies about its hyphens support so we need a more robust test
           crbug.com/107111
           */
        try {
          return test_hyphens_css();
        } catch (e) {
          return false;
        }
      });

      addTest('softhyphens', function() {
        try {
          // use numeric entity instead of &shy; in case it's XHTML
          return test_hyphens('&#173;', true) && test_hyphens('&#8203;', false);
        } catch (e) {
          return false;
        }
      });

      addTest('softhyphensfind', function() {
        try {
          return test_hyphens_find('&#173;') && test_hyphens_find('&#8203;');
        } catch (e) {
          return false;
        }
      });

    }
  });

/*!
{
  "name": "CSS Mask",
  "caniuse": "css-masks",
  "property": "cssmask",
  "tags": ["css"],
  "builderAliases": ["css_mask"],
  "notes": [
    {
      "name": "Webkit blog on CSS Masks",
      "href": "https://webkit.org/blog/181/css-masks/"
    },
    {
      "name": "Safari Docs",
      "href": "https://developer.apple.com/library/safari/#documentation/InternetWeb/Conceptual/SafariVisualEffectsProgGuide/Masks/Masks.html"
    },
    {
      "name": "CSS SVG mask",
      "href": "https://developer.mozilla.org/en-US/docs/Web/CSS/mask"
    },
    {
      "name": "Combine with clippaths for awesomeness",
      "href": "https://generic.cx/for/webkit/test.html"
    }
  ]
}
!*/

  Modernizr.addTest('cssmask', testAllProps('maskRepeat', 'repeat-x', true));

/*!
{
  "name": "CSS Overflow Scrolling",
  "property": "overflowscrolling",
  "tags": ["css"],
  "builderAliases": ["css_overflow_scrolling"],
  "warnings": ["Introduced in iOS5b2. API is subject to change."],
  "notes": [{
    "name": "Article on iOS overflow scrolling",
    "href": "https://css-tricks.com/snippets/css/momentum-scrolling-on-ios-overflow-elements/"
  }]
}
!*/

  Modernizr.addTest('overflowscrolling', testAllProps('overflowScrolling', 'touch', true));

/*!
{
  "name": "CSS Reflections",
  "caniuse": "css-reflections",
  "property": "cssreflections",
  "tags": ["css"]
}
!*/

  Modernizr.addTest('cssreflections', testAllProps('boxReflect', 'above', true));

/*!
{
  "name": "CSS UI Resize",
  "property": "cssresize",
  "caniuse": "css-resize",
  "tags": ["css"],
  "builderAliases": ["css_resize"],
  "notes": [{
    "name": "W3C Specification",
    "href": "https://www.w3.org/TR/css3-ui/#resize"
  },{
    "name": "MDN Docs",
    "href": "https://developer.mozilla.org/en/CSS/resize"
  }]
}
!*/
/* DOC
Test for CSS 3 UI "resize" property
*/

  Modernizr.addTest('cssresize', testAllProps('resize', 'both', true));

/*!
{
  "name": "CSS Shapes",
  "property": "shapes",
  "tags": ["css"],
  "notes": [{
    "name": "CSS Shapes W3C specification",
    "href": "https://www.w3.org/TR/css-shapes"
  },{
    "name": "Examples from Adobe",
    "href": "http://webplatform.adobe.com/shapes/"
  }, {
    "name": "Samples showcasing uses of Shapes",
    "href": "http://codepen.io/collection/qFesk"
  }]
}
!*/

  Modernizr.addTest('shapes', testAllProps('shapeOutside', 'content-box', true));

/*!
{
  "name": "CSS text-align-last",
  "property": "textalignlast",
  "tags": ["css"],
  "knownBugs": ["IE does not support the 'start' or 'end' values."],
  "notes": [{
      "name": "Quicksmode",
      "href": "http://www.quirksmode.org/css/text/textalignlast.html"
    },{
      "name": "MDN",
      "href": "https://developer.mozilla.org/en-US/docs/Web/CSS/text-align-last"
    }]
}
!*/

  Modernizr.addTest('textalignlast', testAllProps('textAlignLast'));

/*!
{
  "name": "CSS Transforms",
  "property": "csstransforms",
  "caniuse": "transforms2d",
  "tags": ["css"]
}
!*/

  Modernizr.addTest('csstransforms', function() {
    // Android < 3.0 is buggy, so we sniff and blacklist
    // http://git.io/hHzL7w
    return navigator.userAgent.indexOf('Android 2.') === -1 &&
           testAllProps('transform', 'scale(1)', true);
  });

/*!
{
  "name": "CSS Transforms 3D",
  "property": "csstransforms3d",
  "caniuse": "transforms3d",
  "tags": ["css"],
  "warnings": [
    "Chrome may occassionally fail this test on some systems; more info: https://code.google.com/p/chromium/issues/detail?id=129004"
  ]
}
!*/

  Modernizr.addTest('csstransforms3d', function() {
    return !!testAllProps('perspective', '1px', true);
  });

/*!
{
  "name": "CSS Transforms Level 2",
  "property": "csstransformslevel2",
  "authors": ["rupl"],
  "tags": ["css"],
  "notes": [{
    "name": "CSSWG Draft Spec",
    "href": "https://drafts.csswg.org/css-transforms-2/"
  }]
}
!*/

  Modernizr.addTest('csstransformslevel2', function() {
    return testAllProps('translate', '45px', true);
  });

/*!
{
  "name": "CSS Transitions",
  "property": "csstransitions",
  "caniuse": "css-transitions",
  "tags": ["css"]
}
!*/

  Modernizr.addTest('csstransitions', testAllProps('transition', 'all', true));

/*!
{
  "name": "CSS Generated Content Transitions",
  "property": "csspseudotransitions",
  "tags": ["css"]
}
!*/

  Modernizr.addTest('csspseudotransitions', function() {
    var result = false;

    if (!Modernizr.csstransitions || !window.getComputedStyle) {
      return result;
    }

    var styles =
      '#modernizr:before { content:" "; font-size:5px;' + Modernizr._prefixes.join('transition:0s 100s;') + '}' +
      '#modernizr.trigger:before { font-size:10px; }';

    Modernizr.testStyles(styles, function(elem) {
      // Force rendering of the element's styles so that the transition will trigger
      window.getComputedStyle(elem, ':before').getPropertyValue('font-size');
      elem.className += 'trigger';
      result = window.getComputedStyle(elem, ':before').getPropertyValue('font-size') === '5px';
    });

    return result;
  });

/*!
{
  "name": "CSS user-select",
  "property": "userselect",
  "caniuse": "user-select-none",
  "authors": ["ryan seddon"],
  "tags": ["css"],
  "builderAliases": ["css_userselect"],
  "notes": [{
    "name": "Related Modernizr Issue",
    "href": "https://github.com/Modernizr/Modernizr/issues/250"
  }]
}
!*/

  //https://github.com/Modernizr/Modernizr/issues/250
  Modernizr.addTest('userselect', testAllProps('userSelect', 'none', true));

/*!
{
  "name": "Variable Open Type Fonts",
  "property": ["variablefonts"],
  "authors": ["Patrick Kettner"],
  "tags": ["css"],
  "notes": [{
    "name": "Variable fonts on the web",
    "href": "https://webkit.org/blog/7051/variable-fonts-on-the-web/"
  }, {
    "name": "Variable fonts for responsive design",
    "href": "https://alistapart.com/blog/post/variable-fonts-for-responsive-design"
  }]
}
!*/

  Modernizr.addTest('variablefonts', testAllProps('fontVariationSettings'));


  /**
   * prefixed returns the prefixed or nonprefixed property name variant of your input
   *
   * @memberof Modernizr
   * @name Modernizr.prefixed
   * @optionName Modernizr.prefixed()
   * @optionProp prefixed
   * @access public
   * @function prefixed
   * @param {string} prop - String name of the property to test for
   * @param {object} [obj] - An object to test for the prefixed properties on
   * @param {HTMLElement} [elem] - An element used to test specific properties against
   * @returns {string|false} The string representing the (possibly prefixed) valid
   * version of the property, or `false` when it is unsupported.
   * @example
   *
   * Modernizr.prefixed takes a string css value in the DOM style camelCase (as
   * opposed to the css style kebab-case) form and returns the (possibly prefixed)
   * version of that property that the browser actually supports.
   *
   * For example, in older Firefox...
   * ```js
   * prefixed('boxSizing')
   * ```
   * returns 'MozBoxSizing'
   *
   * In newer Firefox, as well as any other browser that support the unprefixed
   * version would simply return `boxSizing`. Any browser that does not support
   * the property at all, it will return `false`.
   *
   * By default, prefixed is checked against a DOM element. If you want to check
   * for a property on another object, just pass it as a second argument
   *
   * ```js
   * var rAF = prefixed('requestAnimationFrame', window);
   *
   * raf(function() {
   *  renderFunction();
   * })
   * ```
   *
   * Note that this will return _the actual function_ - not the name of the function.
   * If you need the actual name of the property, pass in `false` as a third argument
   *
   * ```js
   * var rAFProp = prefixed('requestAnimationFrame', window, false);
   *
   * rafProp === 'WebkitRequestAnimationFrame' // in older webkit
   * ```
   *
   * One common use case for prefixed is if you're trying to determine which transition
   * end event to bind to, you might do something like...
   * ```js
   * var transEndEventNames = {
   *     'WebkitTransition' : 'webkitTransitionEnd', * Saf 6, Android Browser
   *     'MozTransition'    : 'transitionend',       * only for FF < 15
   *     'transition'       : 'transitionend'        * IE10, Opera, Chrome, FF 15+, Saf 7+
   * };
   *
   * var transEndEventName = transEndEventNames[ Modernizr.prefixed('transition') ];
   * ```
   *
   * If you want a similar lookup, but in kebab-case, you can use [prefixedCSS](#modernizr-prefixedcss).
   */

  var prefixed = ModernizrProto.prefixed = function(prop, obj, elem) {
    if (prop.indexOf('@') === 0) {
      return atRule(prop);
    }

    if (prop.indexOf('-') != -1) {
      // Convert kebab-case to camelCase
      prop = cssToDOM(prop);
    }
    if (!obj) {
      return testPropsAll(prop, 'pfx');
    } else {
      // Testing DOM property e.g. Modernizr.prefixed('requestAnimationFrame', window) // 'mozRequestAnimationFrame'
      return testPropsAll(prop, obj, elem);
    }
  };

  
/*!
{
  "name": "CSS Object Fit",
  "caniuse": "object-fit",
  "property": "objectfit",
  "tags": ["css"],
  "builderAliases": ["css_objectfit"],
  "notes": [{
    "name": "Opera Article on Object Fit",
    "href": "https://dev.opera.com/articles/css3-object-fit-object-position/"
  }]
}
!*/

  Modernizr.addTest('objectfit', !!prefixed('objectFit'), {aliases: ['object-fit']});

/*!
{
  "name": "CSS Regions",
  "caniuse": "css-regions",
  "authors": ["Mihai Balan"],
  "property": "regions",
  "tags": ["css"],
  "builderAliases": ["css_regions"],
  "notes": [{
    "name": "W3C Specification",
    "href": "https://www.w3.org/TR/css3-regions/"
  }]
}
!*/

  // We start with a CSS parser test then we check page geometry to see if it's affected by regions
  // Later we might be able to retire the second part, as WebKit builds with the false positives die out

  Modernizr.addTest('regions', function() {

    if (isSVG) {
      // css regions don't work inside of SVG elements. Rather than update the
      // below test to work in an SVG context, just exit early to save bytes
      return false;
    }

    /* Get the 'flowFrom' property name available in the browser. Either default or vendor prefixed.
       If the property name can't be found we'll get Boolean 'false' and fail quickly */
    var flowFromProperty = prefixed('flowFrom');
    var flowIntoProperty = prefixed('flowInto');
    var result = false;

    if (!flowFromProperty || !flowIntoProperty) {
      return result;
    }

    /* If CSS parsing is there, try to determine if regions actually work. */
    var iframeContainer = createElement('iframe');
    var container = createElement('div');
    var content = createElement('div');
    var region = createElement('div');

    /* we create a random, unlikely to be generated flow number to make sure we don't
       clash with anything more vanilla, like 'flow', or 'article', or 'f1' */
    var flowName = 'modernizr_flow_for_regions_check';

    /* First create a div with two adjacent divs inside it. The first will be the
       content, the second will be the region. To be able to distinguish between the two,
       we'll give the region a particular padding */
    content.innerText = 'M';
    container.style.cssText = 'top: 150px; left: 150px; padding: 0px;';
    region.style.cssText = 'width: 50px; height: 50px; padding: 42px;';

    region.style[flowFromProperty] = flowName;
    container.appendChild(content);
    container.appendChild(region);
    docElement.appendChild(container);

    /* Now compute the bounding client rect, before and after attempting to flow the
       content div in the region div. If regions are enabled, the after bounding rect
       should reflect the padding of the region div.*/
    var flowedRect, delta;
    var plainRect = content.getBoundingClientRect();


    content.style[flowIntoProperty] = flowName;
    flowedRect = content.getBoundingClientRect();

    delta = parseInt(flowedRect.left - plainRect.left, 10);
    docElement.removeChild(container);

    if (delta == 42) {
      result = true;
    } else {
      /* IE only allows for the content to come from iframes. This has the
       * side effect of automatic collapsing of iframes once they get the flow-into
       * property set. checking for a change on the height allows us to detect this
       * in a sync way, without having to wait for a frame to load */

      docElement.appendChild(iframeContainer);
      plainRect = iframeContainer.getBoundingClientRect();
      iframeContainer.style[flowIntoProperty] = flowName;
      flowedRect = iframeContainer.getBoundingClientRect();

      if (plainRect.height > 0 && plainRect.height !== flowedRect.height && flowedRect.height === 0) {
        result = true;
      }
    }

    content = region = container = iframeContainer = undefined;

    return result;
  });

/*!
{
  "name": "CSS wrap-flow",
  "property": "wrapflow",
  "tags": ["css"],
  "notes": [
    {
      "name": "W3C Exclusions spec",
      "href": "https://www.w3.org/TR/css3-exclusions"
    },
    {
      "name": "Example by Adobe",
      "href": "http://html.adobe.com/webstandards/cssexclusions"
    }
  ]
}
!*/

  Modernizr.addTest('wrapflow', function() {
    var prefixedProperty = prefixed('wrapFlow');
    if (!prefixedProperty || isSVG) {
      return false;
    }

    var wrapFlowProperty = prefixedProperty.replace(/([A-Z])/g, function(str, m1) { return '-' + m1.toLowerCase(); }).replace(/^ms-/, '-ms-');

    /* If the CSS parsing is there we need to determine if wrap-flow actually works to avoid false positive cases, e.g. the browser parses
       the property, but it hasn't got the implementation for the functionality yet. */
    var container = createElement('div');
    var exclusion = createElement('div');
    var content = createElement('span');

    /* First we create a div with two adjacent divs inside it. The first div will be the content, the second div will be the exclusion area.
       We use the "wrap-flow: end" property to test the actual behavior. (http://dev.w3.org/csswg/css3-exclusions/#wrap-flow-property)
       The wrap-flow property is applied to the exclusion area what has a 50px left offset and a 100px width.
       If the wrap-flow property is working correctly then the content should start after the exclusion area, so the content's left offset should be 150px. */
    exclusion.style.cssText = 'position: absolute; left: 50px; width: 100px; height: 20px;' + wrapFlowProperty + ':end;';
    content.innerText = 'X';

    container.appendChild(exclusion);
    container.appendChild(content);
    docElement.appendChild(container);

    var leftOffset = content.offsetLeft;

    docElement.removeChild(container);
    exclusion = content = container = undefined;

    return (leftOffset == 150);
  });


  // Run each test
  testRunner();

  delete ModernizrProto.addTest;
  delete ModernizrProto.addAsyncTest;

  // Run the things that are supposed to run after the tests
  for (var i = 0; i < Modernizr._q.length; i++) {
    Modernizr._q[i]();
  }

  // Leak Modernizr namespace
  window.Modernizr = Modernizr;


;

})(window, document);