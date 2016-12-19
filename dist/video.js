/**
 * @license
 * Video.js 5.14.1 <http://videojs.com/>
 * Copyright Brightcove, Inc. <https://www.brightcove.com/>
 * Available under Apache License Version 2.0
 * <https://github.com/videojs/video.js/blob/master/LICENSE>
 *
 * Includes vtt.js <https://github.com/mozilla/vtt.js>
 * Available under Apache License Version 2.0
 * <https://github.com/mozilla/vtt.js/blob/master/LICENSE>
 */

var $jscomp = {scope:{}};
$jscomp.defineProperty = "function" == typeof Object.defineProperties ? Object.defineProperty : function(k, m, r) {
  if (r.get || r.set) {
    throw new TypeError("ES3 does not support getters and setters.");
  }
  k != Array.prototype && k != Object.prototype && (k[m] = r.value);
};
$jscomp.getGlobal = function(k) {
  return "undefined" != typeof window && window === k ? k : "undefined" != typeof global && null != global ? global : k;
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.SYMBOL_PREFIX = "jscomp_symbol_";
$jscomp.initSymbol = function() {
  $jscomp.initSymbol = function() {
  };
  $jscomp.global.Symbol || ($jscomp.global.Symbol = $jscomp.Symbol);
};
$jscomp.symbolCounter_ = 0;
$jscomp.Symbol = function(k) {
  return $jscomp.SYMBOL_PREFIX + (k || "") + $jscomp.symbolCounter_++;
};
$jscomp.initSymbolIterator = function() {
  $jscomp.initSymbol();
  var k = $jscomp.global.Symbol.iterator;
  k || (k = $jscomp.global.Symbol.iterator = $jscomp.global.Symbol("iterator"));
  "function" != typeof Array.prototype[k] && $jscomp.defineProperty(Array.prototype, k, {configurable:!0, writable:!0, value:function() {
    return $jscomp.arrayIterator(this);
  }});
  $jscomp.initSymbolIterator = function() {
  };
};
$jscomp.arrayIterator = function(k) {
  var m = 0;
  return $jscomp.iteratorPrototype(function() {
    return m < k.length ? {done:!1, value:k[m++]} : {done:!0};
  });
};
$jscomp.iteratorPrototype = function(k) {
  $jscomp.initSymbolIterator();
  k = {next:k};
  k[$jscomp.global.Symbol.iterator] = function() {
    return this;
  };
  return k;
};
$jscomp.array = $jscomp.array || {};
$jscomp.iteratorFromArray = function(k, m) {
  $jscomp.initSymbolIterator();
  k instanceof String && (k += "");
  var r = 0, p = {next:function() {
    if (r < k.length) {
      var B = r++;
      return {value:m(B, k[B]), done:!1};
    }
    p.next = function() {
      return {done:!0, value:void 0};
    };
    return p.next();
  }};
  p[Symbol.iterator] = function() {
    return p;
  };
  return p;
};
$jscomp.polyfill = function(k, m, r, p) {
  if (m) {
    r = $jscomp.global;
    k = k.split(".");
    for (p = 0;p < k.length - 1;p++) {
      var B = k[p];
      B in r || (r[B] = {});
      r = r[B];
    }
    k = k[k.length - 1];
    p = r[k];
    m = m(p);
    m != p && null != m && $jscomp.defineProperty(r, k, {configurable:!0, writable:!0, value:m});
  }
};
$jscomp.polyfill("Array.prototype.keys", function(k) {
  return k ? k : function() {
    return $jscomp.iteratorFromArray(this, function(k) {
      return k;
    });
  };
}, "es6-impl", "es3");
$jscomp.owns = function(k, m) {
  return Object.prototype.hasOwnProperty.call(k, m);
};
$jscomp.polyfill("Object.assign", function(k) {
  return k ? k : function(k, r) {
    for (var m = 1;m < arguments.length;m++) {
      var B = arguments[m];
      if (B) {
        for (var aa in B) {
          $jscomp.owns(B, aa) && (k[aa] = B[aa]);
        }
      }
    }
    return k;
  };
}, "es6-impl", "es3");
$jscomp.polyfill("Array.prototype.fill", function(k) {
  return k ? k : function(k, r, p) {
    var m = this.length || 0;
    0 > r && (r = Math.max(0, m + r));
    if (null == p || p > m) {
      p = m;
    }
    p = Number(p);
    0 > p && (p = Math.max(0, m + p));
    for (r = Number(r || 0);r < p;r++) {
      this[r] = k;
    }
    return this;
  };
}, "es6-impl", "es3");
$jscomp.polyfill("Array.prototype.values", function(k) {
  return k ? k : function() {
    return $jscomp.iteratorFromArray(this, function(k, r) {
      return r;
    });
  };
}, "es6", "es3");
var __extends = this && this.__extends || function(k, m) {
  function r() {
    this.constructor = k;
  }
  for (var p in m) {
    m.hasOwnProperty(p) && (k[p] = m[p]);
  }
  k.prototype = null === m ? Object.create(m) : (r.prototype = m.prototype, new r);
}, videojs = function() {
  function k(c, a) {
    return a = {exports:{}}, c(a, a.exports), a.exports;
  }
  function m(c, a) {
    if (!(this instanceof m)) {
      return new m(c, a);
    }
    this.nodeValue = this.data = c;
    this.length = c.length;
    this.ownerDocument = a || null;
  }
  function r(c, a) {
    if (!(this instanceof r)) {
      return new r(c);
    }
    this.data = c || "";
    this.length = this.data.length;
    this.ownerDocument = a || null;
  }
  function p(c) {
    switch(c.nodeType) {
      case 3:
        return J(c.data);
      case 8:
        return "\x3c!--" + c.data + "--\x3e";
      default:
        var a = [], b = c.tagName;
        "http://www.w3.org/1999/xhtml" === c.namespaceURI && (b = b.toLowerCase());
        a.push("<" + b + Ya(c) + aa(c));
        -1 < Zc.indexOf(b) ? a.push(" />") : (a.push(">"), c.childNodes.length ? a.push.apply(a, c.childNodes.map(p)) : c.textContent || c.innerText ? a.push(J(c.textContent || c.innerText)) : c.innerHTML && a.push(c.innerHTML), a.push("</" + b + ">"));
        return a.join("");
    }
  }
  function B(c) {
    if ("string" === typeof c) {
      return c;
    }
    var a = "";
    Object.keys(c).forEach(function(b) {
      var d = c[b];
      b = b.replace(/[A-Z]/g, function(b) {
        return "-" + b.toLowerCase();
      });
      a += b + ":" + d + ";";
    });
    return a;
  }
  function aa(c) {
    c = c.dataset;
    var a = [], b;
    for (b in c) {
      a.push({name:"data-" + b, value:c[b]});
    }
    return a.length ? ca(a) : "";
  }
  function ca(c) {
    var a = [];
    c.forEach(function(b) {
      var d = b.name;
      b = b.value;
      "style" === d && (b = B(b));
      a.push(d + '="' + J(b).replace(/"/g, "&quot;") + '"');
    });
    return a.length ? " " + a.join(" ") : "";
  }
  function Ya(c) {
    var a = [], b;
    for (b in c) {
      var d;
      d = c;
      var f = b, g = typeof d[f];
      d = "style" === f && 0 < Object.keys(d.style).length ? !0 : d.hasOwnProperty(f) && ("string" === g || "boolean" === g || "number" === g) && "nodeName" !== f && "className" !== f && "tagName" !== f && "textContent" !== f && "innerText" !== f && "namespaceURI" !== f && "innerHTML" !== f;
      d && a.push({name:b, value:c[b]});
    }
    for (var da in c._attributes) {
      for (var e in c._attributes[da]) {
        b = c._attributes[da][e], a.push({name:(b.prefix ? b.prefix + ":" : "") + e, value:b.value});
      }
    }
    c.className && a.push({name:"class", value:c.className});
    return a.length ? ca(a) : "";
  }
  function J(c) {
    var a = "";
    "string" === typeof c ? a = c : c && (a = c.toString());
    return a.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
  function u(c, a, b) {
    if (!(this instanceof u)) {
      return new u(c);
    }
    b = void 0 === b ? "http://www.w3.org/1999/xhtml" : b || null;
    this.nodeName = this.tagName = "http://www.w3.org/1999/xhtml" === b ? String(c).toUpperCase() : c;
    this.className = "";
    this.dataset = {};
    this.childNodes = [];
    this.parentNode = null;
    this.style = {};
    this.ownerDocument = a || null;
    this.namespaceURI = b;
    this._attributes = {};
    "INPUT" === this.tagName && (this.type = "text");
  }
  function x(c) {
    if (!(this instanceof x)) {
      return new x;
    }
    this.childNodes = [];
    this.parentNode = null;
    this.ownerDocument = c || null;
  }
  function R(c) {
  }
  function C() {
    if (!(this instanceof C)) {
      return new C;
    }
    this.head = this.createElement("head");
    this.body = this.createElement("body");
    this.documentElement = this.createElement("html");
    this.documentElement.appendChild(this.head);
    this.documentElement.appendChild(this.body);
    this.childNodes = [this.documentElement];
    this.nodeType = 9;
  }
  function ma(c, a) {
    Object.keys(c).forEach(function(b) {
      return a(c[b], b);
    });
  }
  function Za(c, a, b) {
    void 0 === b && (b = 0);
    return Object.keys(c).reduce(function(b, f) {
      return a(b, c[f], f);
    }, b);
  }
  function A(c) {
    for (var a = [], b = 1;b < arguments.length;b++) {
      a[b - 1] = arguments[b];
    }
    if (Object.assign) {
      return Object.assign.apply(Object, [c].concat(a));
    }
    a.forEach(function(b) {
      b && ma(b, function(b, a) {
        c[a] = b;
      });
    });
    return c;
  }
  function W(c) {
    return !!c && "object" === typeof c;
  }
  function ha(c) {
    return W(c) && "[object Object]" === $c.call(c) && c.constructor === Object;
  }
  function e(c) {
    if (/\s/.test(c)) {
      throw Error("class has illegal whitespace characters");
    }
  }
  function l(c) {
    return W(c) && 1 === c.nodeType;
  }
  function M(c) {
    return function(a, b) {
      if ("string" !== typeof a || !/\S/.test(a)) {
        return w[c](null);
      }
      "string" === typeof b && /\S/.test(b) && (b = w.querySelector(b));
      b = l(b) ? b : w;
      return b[c] && b[c](a);
    };
  }
  function na(c) {
    0 === c.indexOf("#") && (c = c.slice(1));
    return w.getElementById(c);
  }
  function h(c, a, b, d) {
    void 0 === c && (c = "div");
    void 0 === a && (a = {});
    void 0 === b && (b = {});
    var f = w.createElement(c);
    Object.getOwnPropertyNames(a).forEach(function(b) {
      var d = a[b];
      -1 !== b.indexOf("aria-") || "role" === b || "type" === b ? (D.warn((c = ["Setting attributes in the second argument of createEl()\n                has been deprecated. Use the third argument instead.\n                createEl(type, properties, attributes). Attempting to set ", " to ", "."], c.raw = ["Setting attributes in the second argument of createEl()\n                has been deprecated. Use the third argument instead.\n                createEl(type, properties, attributes). Attempting to set ", 
      " to ", "."], Lb(c, b, d))), f.setAttribute(b, d)) : "textContent" === b ? oa(f, d) : f[b] = d;
      var c;
    });
    Object.getOwnPropertyNames(b).forEach(function(a) {
      f.setAttribute(a, b[a]);
    });
    d && $a(f, d);
    return f;
  }
  function oa(c, a) {
    "undefined" === typeof c.textContent ? c.innerText = a : c.textContent = a;
    return c;
  }
  function sa(c, a) {
    a.firstChild ? a.insertBefore(c, a.firstChild) : a.appendChild(c);
  }
  function ia(c) {
    var a = c[pa];
    a || (a = c[pa] = qa++);
    Aa[a] || (Aa[a] = {});
    return Aa[a];
  }
  function E(c) {
    return (c = c[pa]) ? !!Object.getOwnPropertyNames(Aa[c]).length : !1;
  }
  function z(c) {
    var a = c[pa];
    if (a) {
      delete Aa[a];
      try {
        delete c[pa];
      } catch (b) {
        c.removeAttribute ? c.removeAttribute(pa) : c[pa] = null;
      }
    }
  }
  function Ba(c, a) {
    e(a);
    return c.classList ? c.classList.contains(a) : (new RegExp("(^|\\s)" + a + "($|\\s)")).test(c.className);
  }
  function H(c, a) {
    c.classList ? c.classList.add(a) : Ba(c, a) || (c.className = (c.className + " " + a).trim());
    return c;
  }
  function Ca(c, a) {
    c.classList ? c.classList.remove(a) : (e(a), c.className = c.className.split(/\s+/).filter(function(b) {
      return b !== a;
    }).join(" "));
    return c;
  }
  function Mb(c, a, b) {
    var d = Ba(c, a);
    "function" === typeof b && (b = b(c, a));
    "boolean" !== typeof b && (b = !d);
    if (b !== d) {
      return b ? H(c, a) : Ca(c, a), c;
    }
  }
  function ab(c, a) {
    Object.getOwnPropertyNames(a).forEach(function(b) {
      var d = a[b];
      null === d || "undefined" === typeof d || !1 === d ? c.removeAttribute(b) : c.setAttribute(b, !0 === d ? "" : d);
    });
  }
  function K(c) {
    var a = {};
    if (c && c.attributes && 0 < c.attributes.length) {
      for (var b = c.attributes, d = b.length - 1;0 <= d;d--) {
        var f = b[d].name, g = b[d].value;
        if ("boolean" === typeof c[f] || -1 !== ",autoplay,controls,loop,muted,default,".indexOf("," + f + ",")) {
          g = null !== g ? !0 : !1;
        }
        a[f] = g;
      }
    }
    return a;
  }
  function F() {
    w.body.focus();
    w.onselectstart = function() {
      return !1;
    };
  }
  function N() {
    w.onselectstart = function() {
      return !0;
    };
  }
  function L(c) {
    var a;
    c.getBoundingClientRect && c.parentNode && (a = c.getBoundingClientRect());
    if (!a) {
      return {left:0, top:0};
    }
    c = w.documentElement;
    var b = w.body;
    return {left:Math.round(a.left + (q.pageXOffset || b.scrollLeft) - (c.clientLeft || b.clientLeft || 0)), top:Math.round(a.top + (q.pageYOffset || b.scrollTop) - (c.clientTop || b.clientTop || 0))};
  }
  function Nb(c, a) {
    var b = {}, d = L(c), f = c.offsetWidth;
    c = c.offsetHeight;
    var g = d.top, d = d.left, da = a.pageY, e = a.pageX;
    a.changedTouches && (e = a.changedTouches[0].pageX, da = a.changedTouches[0].pageY);
    b.y = Math.max(0, Math.min(1, (g - da + c) / c));
    b.x = Math.max(0, Math.min(1, (e - d) / f));
    return b;
  }
  function Ob(c) {
    return W(c) && 3 === c.nodeType;
  }
  function bb(c) {
    for (;c.firstChild;) {
      c.removeChild(c.firstChild);
    }
    return c;
  }
  function ad(c) {
    "function" === typeof c && (c = c());
    return (Array.isArray(c) ? c : [c]).map(function(a) {
      "function" === typeof a && (a = a());
      if (l(a) || Ob(a)) {
        return a;
      }
      if ("string" === typeof a && /\S/.test(a)) {
        return w.createTextNode(a);
      }
    }).filter(function(a) {
      return a;
    });
  }
  function $a(c, a) {
    ad(a).forEach(function(b) {
      return c.appendChild(b);
    });
    return c;
  }
  function Pb(c, a) {
    return $a(bb(c), a);
  }
  function Qb(c, a) {
    var b = ia(c);
    0 === b.handlers[a].length && (delete b.handlers[a], c.removeEventListener ? c.removeEventListener(a, b.dispatcher, !1) : c.detachEvent && c.detachEvent("on" + a, b.dispatcher));
    0 >= Object.getOwnPropertyNames(b.handlers).length && (delete b.handlers, delete b.dispatcher, delete b.disabled);
    0 === Object.getOwnPropertyNames(b).length && z(c);
  }
  function cb(c, a, b, d) {
    b.forEach(function(b) {
      c(a, b, d);
    });
  }
  function db(c) {
    function a() {
      return !0;
    }
    function b() {
      return !1;
    }
    if (!c || !c.isPropagationStopped) {
      var d = c || q.event;
      c = {};
      for (var f in d) {
        "layerX" !== f && "layerY" !== f && "keyLocation" !== f && "webkitMovementX" !== f && "webkitMovementY" !== f && ("returnValue" === f && d.preventDefault || (c[f] = d[f]));
      }
      c.target || (c.target = c.srcElement || w);
      c.relatedTarget || (c.relatedTarget = c.fromElement === c.target ? c.toElement : c.fromElement);
      c.preventDefault = function() {
        d.preventDefault && d.preventDefault();
        c.returnValue = !1;
        d.returnValue = !1;
        c.defaultPrevented = !0;
      };
      c.defaultPrevented = !1;
      c.stopPropagation = function() {
        d.stopPropagation && d.stopPropagation();
        c.cancelBubble = !0;
        d.cancelBubble = !0;
        c.isPropagationStopped = a;
      };
      c.isPropagationStopped = b;
      c.stopImmediatePropagation = function() {
        d.stopImmediatePropagation && d.stopImmediatePropagation();
        c.isImmediatePropagationStopped = a;
        c.stopPropagation();
      };
      c.isImmediatePropagationStopped = b;
      if (null !== c.clientX && void 0 !== c.clientX) {
        f = w.documentElement;
        var g = w.body;
        c.pageX = c.clientX + (f && f.scrollLeft || g && g.scrollLeft || 0) - (f && f.clientLeft || g && g.clientLeft || 0);
        c.pageY = c.clientY + (f && f.scrollTop || g && g.scrollTop || 0) - (f && f.clientTop || g && g.clientTop || 0);
      }
      c.which = c.charCode || c.keyCode;
      null !== c.button && void 0 !== c.button && (c.button = c.button & 1 ? 0 : c.button & 4 ? 1 : c.button & 2 ? 2 : 0);
    }
    return c;
  }
  function Y(c, a, b) {
    if (Array.isArray(a)) {
      return cb(Y, c, a, b);
    }
    var d = ia(c);
    d.handlers || (d.handlers = {});
    d.handlers[a] || (d.handlers[a] = []);
    b.guid || (b.guid = qa++);
    d.handlers[a].push(b);
    d.dispatcher || (d.disabled = !1, d.dispatcher = function(b, a) {
      if (!d.disabled) {
        b = db(b);
        var f = d.handlers[b.type];
        if (f) {
          for (var f = f.slice(0), g = 0, e = f.length;g < e && !b.isImmediatePropagationStopped();g++) {
            try {
              f[g].call(c, b, a);
            } catch (bd) {
              D.error(bd);
            }
          }
        }
      }
    });
    1 === d.handlers[a].length && (c.addEventListener ? c.addEventListener(a, d.dispatcher, !1) : c.attachEvent && c.attachEvent("on" + a, d.dispatcher));
  }
  function ea(c, a, b) {
    if (E(c)) {
      var d = ia(c);
      if (d.handlers) {
        if (Array.isArray(a)) {
          return cb(ea, c, a, b);
        }
        if (a) {
          var f = d.handlers[a];
          if (f) {
            if (!b) {
              d.handlers[a] = [];
            } else {
              if (b.guid) {
                for (d = 0;d < f.length;d++) {
                  f[d].guid === b.guid && f.splice(d--, 1);
                }
              }
            }
            Qb(c, a);
          }
        } else {
          for (f in d.handlers) {
            a = f, d.handlers[a] = [], Qb(c, a);
          }
        }
      }
    }
  }
  function Ja(c, a, b) {
    var d = E(c) ? ia(c) : {}, f = c.parentNode || c.ownerDocument;
    "string" === typeof a && (a = {type:a, target:c});
    a = db(a);
    d.dispatcher && d.dispatcher.call(c, a, b);
    if (f && !a.isPropagationStopped() && !0 === a.bubbles) {
      Ja.call(null, f, a, b);
    } else {
      if (!f && !a.defaultPrevented && (c = ia(a.target), a.target[a.type])) {
        c.disabled = !0;
        if ("function" === typeof a.target[a.type]) {
          a.target[a.type]();
        }
        c.disabled = !1;
      }
    }
    return !a.defaultPrevented;
  }
  function Da(c, a, b) {
    if (Array.isArray(a)) {
      return cb(Da, c, a, b);
    }
    var d = function() {
      ea(c, a, d);
      b.apply(this, arguments);
    };
    d.guid = b.guid = b.guid || qa++;
    Y(c, a, d);
  }
  function O(c) {
    return "string" !== typeof c ? c : c.charAt(0).toUpperCase() + c.slice(1);
  }
  function P() {
    for (var c = [], a = 0;a < arguments.length;a++) {
      c[a] = arguments[a];
    }
    var b = {};
    c.forEach(function(a) {
      a && ma(a, function(a, d) {
        ha(a) ? (ha(b[d]) || (b[d] = {}), b[d] = P(b[d], a)) : b[d] = a;
      });
    });
    return b;
  }
  function Sb(c, a, b, d) {
    void 0 === d && (D.warn("DEPRECATED: Function '" + c + "' on 'TimeRanges' called without an index argument."), d = 0);
    var f = b.length - 1;
    if (0 > d || d > f) {
      throw Error("Failed to execute '" + c + "' on 'TimeRanges': The index provided (" + d + ") is greater than or equal to the maximum bound (" + f + ").");
    }
    return b[d][a];
  }
  function eb(c) {
    return void 0 === c || 0 === c.length ? {length:0, start:function() {
      throw Error("This TimeRanges object is empty");
    }, end:function() {
      throw Error("This TimeRanges object is empty");
    }} : {length:c.length, start:Sb.bind(null, "start", 0, c), end:Sb.bind(null, "end", 1, c)};
  }
  function fa(c, a) {
    return Array.isArray(c) ? eb(c) : void 0 === c || void 0 === a ? eb() : eb([[c, a]]);
  }
  function Tb(c, a) {
    var b = 0, d, f;
    if (!a) {
      return 0;
    }
    c && c.length || (c = fa(0, 0));
    for (var g = 0;g < c.length;g++) {
      d = c.start(g), f = c.end(g), f > a && (f = a), b += f - d;
    }
    return b / a;
  }
  function S(c) {
    if (c instanceof S) {
      return c;
    }
    "number" === typeof c ? this.code = c : "string" === typeof c ? this.message = c : W(c) && ("number" === typeof c.code && (this.code = c.code), A(this, c));
    this.message || (this.message = S.defaultMessages[this.code] || "");
  }
  function cd(c) {
    for (var a in c) {
      if (c.hasOwnProperty(a)) {
        return !1;
      }
    }
    return !0;
  }
  function Ub(c, a, b) {
    var d = c;
    dd(a) ? (b = a, "string" === typeof c && (d = {uri:c})) : d = ed(a, {uri:c});
    d.callback = b;
    return d;
  }
  function ga(c, a, b) {
    a = Ub(c, a, b);
    return Vb(a);
  }
  function Vb(c) {
    function a(b) {
      clearTimeout(k);
      b instanceof Error || (b = Error("" + (b || "Unknown XMLHttpRequest Error")));
      b.statusCode = 0;
      var a = q;
      d || (d = !0, c.callback(b, a, void 0));
    }
    function b() {
      if (!da) {
        var b;
        clearTimeout(k);
        b = c.useXDR && void 0 === f.status ? 200 : 1223 === f.status ? 204 : f.status;
        var a = q, g = null;
        if (0 !== b) {
          f.response ? a = f.response : (a = f.responseText) || ("document" === f.responseType ? a = f.responseXML : (a = 204 === f.status && f.responseXML && "parsererror" === f.responseXML.documentElement.nodeName, a = "" !== f.responseType || a ? null : f.responseXML));
          if (E) {
            try {
              a = JSON.parse(a);
            } catch (Xd) {
            }
          }
          a = {body:a, statusCode:b, method:h, headers:{}, url:e, rawRequest:f};
          f.getAllResponseHeaders && (a.headers = fd(f.getAllResponseHeaders()));
        } else {
          g = Error("Internal XMLHttpRequest Error");
        }
        b = a.body;
        d || (d = !0, c.callback(g, a, b));
      }
    }
    if ("undefined" === typeof c.callback) {
      throw Error("callback argument missing");
    }
    var d = !1, f = c.xhr || null;
    f || (f = c.cors || c.useXDR ? new ga.XDomainRequest : new ga.XMLHttpRequest);
    var g, da, e = f.url = c.uri || c.url, h = f.method = c.method || "GET", l = c.body || c.data || null, z = f.headers = c.headers || {}, n = !!c.sync, E = !1, k, q = {body:void 0, headers:{}, statusCode:0, method:h, url:e, rawRequest:f};
    "json" in c && !1 !== c.json && (E = !0, z.accept || z.Accept || (z.Accept = "application/json"), "GET" !== h && "HEAD" !== h && (z["content-type"] || z["Content-Type"] || (z["Content-Type"] = "application/json"), l = JSON.stringify(!0 === c.json ? l : c.json)));
    f.onreadystatechange = function() {
      4 === f.readyState && b();
    };
    f.onload = b;
    f.onerror = a;
    f.onprogress = function() {
    };
    f.onabort = function() {
      da = !0;
    };
    f.ontimeout = a;
    f.open(h, e, !n, c.username, c.password);
    n || (f.withCredentials = !!c.withCredentials);
    !n && 0 < c.timeout && (k = setTimeout(function() {
      if (!da) {
        da = !0;
        f.abort("timeout");
        var b = Error("XMLHttpRequest timeout");
        b.code = "ETIMEDOUT";
        a(b);
      }
    }, c.timeout));
    if (f.setRequestHeader) {
      for (g in z) {
        z.hasOwnProperty(g) && f.setRequestHeader(g, z[g]);
      }
    } else {
      if (c.headers && !cd(c.headers)) {
        throw Error("Headers cannot be set on an XDomainRequest object");
      }
    }
    "responseType" in c && (f.responseType = c.responseType);
    "beforeSend" in c && "function" === typeof c.beforeSend && c.beforeSend(f);
    f.send(l);
    return f;
  }
  function gd() {
  }
  function hd(c) {
    var a = c.charAt(0).toUpperCase() + c.slice(1);
    Wb["set" + a] = function(b) {
      return this.el_.vjs_setProperty(c, b);
    };
  }
  function Xb(c) {
    Wb[c] = function() {
      return this.el_.vjs_getProperty(c);
    };
  }
  function fb(c, a) {
    return "rgba(" + parseInt(c[1] + c[1], 16) + "," + parseInt(c[2] + c[2], 16) + "," + parseInt(c[3] + c[3], 16) + "," + a + ")";
  }
  function ja(c, a) {
    void 0 === a && (a = c);
    c = 0 > c ? 0 : c;
    var b = Math.floor(c % 60), d = Math.floor(c / 60 % 60), f = Math.floor(c / 3600), g = Math.floor(a / 60 % 60);
    a = Math.floor(a / 3600);
    if (isNaN(c) || Infinity === c) {
      f = d = b = "-";
    }
    f = 0 < f || 0 < a ? f + ":" : "";
    return f + (((f || 10 <= g) && 10 > d ? "0" + d : d) + ":") + (10 > b ? "0" + b : b);
  }
  function ta(c, a) {
    return c && a ? "function" === typeof q.getComputedStyle ? (c = q.getComputedStyle(c)) ? c[a] : "" : c.currentStyle[a] || "" : "";
  }
  function Yb(c, a) {
    a && (c = a(c));
    if (c && "none" !== c) {
      return c;
    }
  }
  function t(c, a, b) {
    var d;
    a = a || {};
    if ("string" === typeof c) {
      0 === c.indexOf("#") && (c = c.slice(1));
      if (t.getPlayers()[c]) {
        return a && D.warn('Player "' + c + '" is already initialised. Options will not be applied.'), b && t.getPlayers()[c].ready(b), t.getPlayers()[c];
      }
      d = na(c);
    } else {
      d = c;
    }
    if (!d || !d.nodeName) {
      throw new TypeError("The element or ID supplied is not valid. (videojs)");
    }
    if (d.player || ba.players[d.playerId]) {
      return d.player || ba.players[d.playerId];
    }
    t.hooks("beforesetup").forEach(function(b) {
      b = b(d, P(a));
      !W(b) || Array.isArray(b) ? t.log.error("please return an object in beforesetup hooks") : a = P(a, b);
    });
    var f = new (n.getComponent("Player"))(d, a, b);
    t.hooks("setup").forEach(function(b) {
      return b(f);
    });
    return f;
  }
  var Ka = "undefined" !== typeof window ? window : "undefined" !== typeof global ? global : "undefined" !== typeof self ? self : {}, q = k(function(c) {
    c.exports = "undefined" !== typeof window ? window : "undefined" !== typeof Ka ? Ka : "undefined" !== typeof self ? self : {};
  }), Zb = Array.prototype.slice, La = function(c, a) {
    "length" in c || (c = [c]);
    for (c = Zb.call(c);c.length;) {
      var b = c.shift(), d = a(b);
      if (d) {
        return d;
      }
      b.childNodes && b.childNodes.length && (c = Zb.call(b.childNodes).concat(c));
    }
  };
  m.prototype.nodeType = 8;
  m.prototype.nodeName = "#comment";
  m.prototype.toString = function() {
    return "[object Comment]";
  };
  r.prototype.type = "DOMTextNode";
  r.prototype.nodeType = 3;
  r.prototype.nodeName = "#text";
  r.prototype.toString = function() {
    return this.data;
  };
  r.prototype.replaceData = function(c, a, b) {
    var d = this.data, f = d.substring(0, c);
    c = d.substring(c + a, d.length);
    this.data = f + b + c;
    this.length = this.data.length;
  };
  var $b = function(c) {
    var a = this, b = c.type;
    c.target || (c.target = a);
    a.listeners || (a.listeners = {});
    if (b = a.listeners[b]) {
      return b.forEach(function(b) {
        c.currentTarget = a;
        "function" === typeof b ? b(c) : b.handleEvent(c);
      });
    }
    a.parentNode && a.parentNode.dispatchEvent(c);
  }, ac = function(c, a) {
    this.listeners || (this.listeners = {});
    this.listeners[c] || (this.listeners[c] = []);
    -1 === this.listeners[c].indexOf(a) && this.listeners[c].push(a);
  }, bc = function(c, a) {
    this.listeners && this.listeners[c] && (c = this.listeners[c], a = c.indexOf(a), -1 !== a && c.splice(a, 1));
  }, Zc = "area base br col embed hr img input keygen link menuitem meta param source track wbr".split(" ");
  u.prototype.type = "DOMElement";
  u.prototype.nodeType = 1;
  u.prototype.appendChild = function(c) {
    c.parentNode && c.parentNode.removeChild(c);
    this.childNodes.push(c);
    c.parentNode = this;
    return c;
  };
  u.prototype.replaceChild = function(c, a) {
    c.parentNode && c.parentNode.removeChild(c);
    var b = this.childNodes.indexOf(a);
    a.parentNode = null;
    this.childNodes[b] = c;
    c.parentNode = this;
    return a;
  };
  u.prototype.removeChild = function(c) {
    var a = this.childNodes.indexOf(c);
    this.childNodes.splice(a, 1);
    c.parentNode = null;
    return c;
  };
  u.prototype.insertBefore = function(c, a) {
    c.parentNode && c.parentNode.removeChild(c);
    a = null === a || void 0 === a ? -1 : this.childNodes.indexOf(a);
    -1 < a ? this.childNodes.splice(a, 0, c) : this.childNodes.push(c);
    c.parentNode = this;
    return c;
  };
  u.prototype.setAttributeNS = function(c, a, b) {
    var d = null, f = a, g = a.indexOf(":");
    -1 < g && (d = a.substr(0, g), f = a.substr(g + 1));
    "INPUT" === this.tagName && "type" === a ? this.type = b : (this._attributes[c] || (this._attributes[c] = {}))[f] = {value:b, prefix:d};
  };
  u.prototype.getAttributeNS = function(c, a) {
    c = (c = this._attributes[c]) && c[a] && c[a].value;
    return "INPUT" === this.tagName && "type" === a ? this.type : "string" !== typeof c ? null : c;
  };
  u.prototype.removeAttributeNS = function(c, a) {
    (c = this._attributes[c]) && delete c[a];
  };
  u.prototype.hasAttributeNS = function(c, a) {
    c = this._attributes[c];
    return !!c && a in c;
  };
  u.prototype.setAttribute = function(c, a) {
    return this.setAttributeNS(null, c, a);
  };
  u.prototype.getAttribute = function(c) {
    return this.getAttributeNS(null, c);
  };
  u.prototype.removeAttribute = function(c) {
    return this.removeAttributeNS(null, c);
  };
  u.prototype.hasAttribute = function(c) {
    return this.hasAttributeNS(null, c);
  };
  u.prototype.removeEventListener = bc;
  u.prototype.addEventListener = ac;
  u.prototype.dispatchEvent = $b;
  u.prototype.focus = function() {
  };
  u.prototype.toString = function() {
    return p(this);
  };
  u.prototype.getElementsByClassName = function(c) {
    var a = c.split(" "), b = [];
    La(this, function(d) {
      if (1 === d.nodeType) {
        var c = (d.className || "").split(" ");
        a.every(function(b) {
          return -1 !== c.indexOf(b);
        }) && b.push(d);
      }
    });
    return b;
  };
  u.prototype.getElementsByTagName = function(c) {
    c = c.toLowerCase();
    var a = [];
    La(this.childNodes, function(b) {
      1 !== b.nodeType || "*" !== c && b.tagName.toLowerCase() !== c || a.push(b);
    });
    return a;
  };
  u.prototype.contains = function(c) {
    return La(this, function(a) {
      return c === a;
    }) || !1;
  };
  x.prototype.type = "DocumentFragment";
  x.prototype.nodeType = 11;
  x.prototype.nodeName = "#document-fragment";
  x.prototype.appendChild = u.prototype.appendChild;
  x.prototype.replaceChild = u.prototype.replaceChild;
  x.prototype.removeChild = u.prototype.removeChild;
  x.prototype.toString = function() {
    return this.childNodes.map(function(c) {
      return String(c);
    }).join("");
  };
  R.prototype.initEvent = function(c, a, b) {
    this.type = c;
    this.bubbles = a;
    this.cancelable = b;
  };
  R.prototype.preventDefault = function() {
  };
  var X = C.prototype;
  X.createTextNode = function(c) {
    return new r(c, this);
  };
  X.createElementNS = function(c, a) {
    return new u(a, this, null === c ? null : String(c));
  };
  X.createElement = function(c) {
    return new u(c, this);
  };
  X.createDocumentFragment = function() {
    return new x(this);
  };
  X.createEvent = function(c) {
    return new R(c);
  };
  X.createComment = function(c) {
    return new m(c, this);
  };
  X.getElementById = function(c) {
    c = String(c);
    return La(this.childNodes, function(a) {
      if (String(a.id) === c) {
        return a;
      }
    }) || null;
  };
  X.getElementsByClassName = u.prototype.getElementsByClassName;
  X.getElementsByTagName = u.prototype.getElementsByTagName;
  X.contains = u.prototype.contains;
  X.removeEventListener = bc;
  X.addEventListener = ac;
  X.dispatchEvent = $b;
  var id = new C, w = k(function(c) {
    var a = "undefined" !== typeof Ka ? Ka : "undefined" !== typeof window ? window : {};
    if ("undefined" !== typeof document) {
      c.exports = document;
    } else {
      var b = a["__GLOBAL_DOCUMENT_CACHE@4"];
      b || (b = a["__GLOBAL_DOCUMENT_CACHE@4"] = id);
      c.exports = b;
    }
  }), qa = 1, V = q.navigator && q.navigator.userAgent || "", cc = /AppleWebKit\/([\d.]+)/i.exec(V), jd = cc ? parseFloat(cc.pop()) : null, gb = /iPad/i.test(V), hb = /iPhone/i.test(V) && !gb, dc = /iPod/i.test(V), Ma = hb || gb || dc, kd = function() {
    var c = V.match(/OS (\d+)_/i);
    return c && c[1] ? c[1] : null;
  }(), ua = /Android/i.test(V), Na = function() {
    var c = V.match(/Android (\d+)(?:\.(\d+))?(?:\.(\d+))*/i);
    if (!c) {
      return null;
    }
    var a = c[1] && parseFloat(c[1]), b = c[2] && parseFloat(c[2]);
    return a && b ? parseFloat(c[1] + "." + c[2]) : a ? a : null;
  }(), ec = ua && /webkit/i.test(V) && 2.3 > Na, fc = ua && 5 > Na && 537 > jd, gc = /Firefox/i.test(V), ib = /Edge/i.test(V), Oa = !ib && /Chrome/i.test(V), T = /MSIE\s8\.0/.test(V), jb = function(c) {
    return c && parseFloat(c[1]);
  }(/MSIE\s(\d+)\.\d/.exec(V)), hc = /Safari/i.test(V) && !Oa && !ua && !ib, ic = hc || Ma, Pa = !!("ontouchstart" in q || q.DocumentTouch && w instanceof q.DocumentTouch), jc = "backgroundSize" in w.createElement("video").style, ld = Object.freeze({IS_IPAD:gb, IS_IPHONE:hb, IS_IPOD:dc, IS_IOS:Ma, IOS_VERSION:kd, IS_ANDROID:ua, ANDROID_VERSION:Na, IS_OLD_ANDROID:ec, IS_NATIVE_ANDROID:fc, IS_FIREFOX:gc, IS_EDGE:ib, IS_CHROME:Oa, IS_IE8:T, IE_VERSION:jb, IS_SAFARI:hc, IS_ANY_SAFARI:ic, TOUCH_ENABLED:Pa, 
  BACKGROUND_SIZE_SUPPORTED:jc}), $c = Object.prototype.toString, va, kb = function(c, a, b) {
    void 0 === b && (b = !!jb && 11 > jb);
    "log" !== c && a.unshift(c.toUpperCase() + ":");
    va.history.push(a);
    a.unshift("VIDEOJS:");
    if (c = q.console && q.console[c]) {
      if (b && (a = a.map(function(b) {
        if (W(b) || Array.isArray(b)) {
          try {
            return JSON.stringify(b);
          } catch (f) {
          }
        }
        return String(b);
      }).join(" ")), c.apply) {
        c[Array.isArray(a) ? "apply" : "call"](q.console, a);
      } else {
        c(a);
      }
    }
  };
  va = function() {
    for (var c = [], a = 0;a < arguments.length;a++) {
      c[a] = arguments[a];
    }
    kb("log", c);
  };
  va.history = [];
  va.error = function() {
    for (var c = [], a = 0;a < arguments.length;a++) {
      c[a] = arguments[a];
    }
    return kb("error", c);
  };
  va.warn = function() {
    for (var c = [], a = 0;a < arguments.length;a++) {
      c[a] = arguments[a];
    }
    return kb("warn", c);
  };
  var D = va, Lb = function(c) {
    for (var a = "", b = 0;b < arguments.length;b++) {
      a += c[b].replace(/\n\r?\s*/g, "") + (arguments[b + 1] || "");
    }
    return a;
  }, Aa = {}, pa = "vdata" + (new Date).getTime(), Ea = M("querySelector"), md = M("querySelectorAll"), lb = !1, kc, mb = function() {
    var c = w.getElementsByTagName("video"), a = w.getElementsByTagName("audio"), b = [];
    if (c && 0 < c.length) {
      for (var d = 0, f = c.length;d < f;d++) {
        b.push(c[d]);
      }
    }
    if (a && 0 < a.length) {
      for (d = 0, f = a.length;d < f;d++) {
        b.push(a[d]);
      }
    }
    if (b && 0 < b.length) {
      for (d = 0, f = b.length;d < f;d++) {
        if ((c = b[d]) && c.getAttribute) {
          void 0 === c.player && null !== c.getAttribute("data-setup") && kc(c);
        } else {
          setTimeout(mb, 1);
          break;
        }
      }
    } else {
      lb || setTimeout(mb, 1);
    }
  };
  "complete" === w.readyState ? lb = !0 : Da(q, "load", function() {
    lb = !0;
  });
  var lc = function(c) {
    var a = w.createElement("style");
    a.className = c;
    return a;
  }, mc = function(c, a) {
    c.styleSheet ? c.styleSheet.cssText = a : c.textContent = a;
  }, y = function(c, a, b) {
    a.guid || (a.guid = qa++);
    var d = function() {
      return a.apply(c, arguments);
    };
    d.guid = b ? b + "_" + a.guid : a.guid;
    return d;
  }, nd = function(c, a) {
    var b = Date.now();
    return function() {
      for (var d = [], f = 0;f < arguments.length;f++) {
        d[f] = arguments[f];
      }
      f = Date.now();
      f - b >= a && (c.apply(void 0, d), b = f);
    };
  }, n = function() {
    function c(a, b, d) {
      this.player_ = !a && this.play ? a = this : a;
      this.options_ = P({}, this.options_);
      b = this.options_ = P(this.options_, b);
      this.id_ = b.id || b.el && b.el.id;
      this.id_ || (this.id_ = (a && a.id && a.id() || "no_player") + "_component_" + qa++);
      this.name_ = b.name || null;
      b.el ? this.el_ = b.el : !1 !== b.createEl && (this.el_ = this.createEl());
      this.children_ = [];
      this.childIndex_ = {};
      this.childNameIndex_ = {};
      !1 !== b.initChildren && this.initChildren();
      this.ready(d);
      !1 !== b.reportTouchActivity && this.enableTouchActivity();
    }
    c.prototype.dispose = function() {
      this.trigger({type:"dispose", bubbles:!1});
      if (this.children_) {
        for (var a = this.children_.length - 1;0 <= a;a--) {
          this.children_[a].dispose && this.children_[a].dispose();
        }
      }
      this.childNameIndex_ = this.childIndex_ = this.children_ = null;
      this.off();
      this.el_.parentNode && this.el_.parentNode.removeChild(this.el_);
      z(this.el_);
      this.el_ = null;
    };
    c.prototype.player = function() {
      return this.player_;
    };
    c.prototype.options = function(a) {
      D.warn("this.options() has been deprecated and will be moved to the constructor in 6.0");
      return a ? this.options_ = P(this.options_, a) : this.options_;
    };
    c.prototype.el = function() {
      return this.el_;
    };
    c.prototype.createEl = function(a, b, d) {
      return h(a, b, d);
    };
    c.prototype.localize = function(a) {
      var b = this.player_.language && this.player_.language(), d = this.player_.languages && this.player_.languages();
      if (!b || !d) {
        return a;
      }
      var c = d[b];
      if (c && c[a]) {
        return c[a];
      }
      b = b.split("-")[0];
      return (d = d[b]) && d[a] ? d[a] : a;
    };
    c.prototype.contentEl = function() {
      return this.contentEl_ || this.el_;
    };
    c.prototype.id = function() {
      return this.id_;
    };
    c.prototype.name = function() {
      return this.name_;
    };
    c.prototype.children = function() {
      return this.children_;
    };
    c.prototype.getChildById = function(a) {
      return this.childIndex_[a];
    };
    c.prototype.getChild = function(a) {
      if (a) {
        return a = O(a), this.childNameIndex_[a];
      }
    };
    c.prototype.addChild = function(a, b, d) {
      void 0 === b && (b = {});
      void 0 === d && (d = this.children_.length);
      var f;
      if ("string" === typeof a) {
        f = O(a);
        b || (b = {});
        !0 === b && (D.warn("Initializing a child component with `true` is deprecated.Children should be defined in an array when possible, but if necessary use an object instead of `true`."), b = {});
        a = b.componentClass || f;
        b.name = f;
        var g = c.getComponent(a);
        if (!g) {
          throw Error("Component " + a + " does not exist");
        }
        if ("function" !== typeof g) {
          return null;
        }
        b = new g(this.player_ || this, b);
      } else {
        b = a;
      }
      this.children_.splice(d, 0, b);
      "function" === typeof b.id && (this.childIndex_[b.id()] = b);
      (f = f || b.name && b.name()) && (this.childNameIndex_[f] = b);
      "function" === typeof b.el && b.el() && (d = this.contentEl().children[d] || null, this.contentEl().insertBefore(b.el(), d));
      return b;
    };
    c.prototype.removeChild = function(a) {
      "string" === typeof a && (a = this.getChild(a));
      if (a && this.children_) {
        for (var b = !1, d = this.children_.length - 1;0 <= d;d--) {
          if (this.children_[d] === a) {
            b = !0;
            this.children_.splice(d, 1);
            break;
          }
        }
        b && (this.childIndex_[a.id()] = null, this.childNameIndex_[a.name()] = null, (b = a.el()) && b.parentNode === this.contentEl() && this.contentEl().removeChild(a.el()));
      }
    };
    c.prototype.initChildren = function() {
      var a = this, b = this.options_.children;
      if (b) {
        var d = this.options_, f, g = c.getComponent("Tech");
        f = Array.isArray(b) ? b : Object.keys(b);
        f.concat(Object.keys(this.options_).filter(function(b) {
          return !f.some(function(a) {
            return "string" === typeof a ? b === a : b === a.name;
          });
        })).map(function(d) {
          var c;
          "string" === typeof d ? (c = d, d = b[c] || a.options_[c] || {}) : c = d.name;
          return {name:c, opts:d};
        }).filter(function(b) {
          return (b = c.getComponent(b.opts.componentClass || O(b.name))) && !g.isTech(b);
        }).forEach(function(b) {
          var c = b.name;
          b = b.opts;
          void 0 !== d[c] && (b = d[c]);
          !1 !== b && (!0 === b && (b = {}), b.playerOptions = a.options_.playerOptions, (b = a.addChild(c, b)) && (a[c] = b));
        });
      }
    };
    c.prototype.buildCSSClass = function() {
      return "";
    };
    c.prototype.on = function(a, b, d) {
      var c = this;
      if ("string" === typeof a || Array.isArray(a)) {
        Y(this.el_, a, y(this, b));
      } else {
        var g = y(this, d), e = function() {
          return c.off(a, b, g);
        };
        e.guid = g.guid;
        this.on("dispose", e);
        d = function() {
          return c.off("dispose", e);
        };
        d.guid = g.guid;
        a.nodeName ? (Y(a, b, g), Y(a, "dispose", d)) : "function" === typeof a.on && (a.on(b, g), a.on("dispose", d));
      }
      return this;
    };
    c.prototype.off = function(a, b, d) {
      !a || "string" === typeof a || Array.isArray(a) ? ea(this.el_, a, b) : (d = y(this, d), this.off("dispose", d), a.nodeName ? (ea(a, b, d), ea(a, "dispose", d)) : (a.off(b, d), a.off("dispose", d)));
      return this;
    };
    c.prototype.one = function(a, b, d) {
      var c = this;
      if ("string" === typeof a || Array.isArray(a)) {
        Da(this.el_, a, y(this, b));
      } else {
        var g = y(this, d), e = function() {
          c.off(a, b, e);
          g.apply(null, arguments);
        };
        e.guid = g.guid;
        this.on(a, b, e);
      }
      return this;
    };
    c.prototype.trigger = function(a, b) {
      Ja(this.el_, a, b);
      return this;
    };
    c.prototype.ready = function(a, b) {
      void 0 === b && (b = !1);
      a && (this.isReady_ ? b ? a.call(this) : this.setTimeout(a, 1) : (this.readyQueue_ = this.readyQueue_ || [], this.readyQueue_.push(a)));
      return this;
    };
    c.prototype.triggerReady = function() {
      this.isReady_ = !0;
      this.setTimeout(function() {
        var a = this.readyQueue_;
        this.readyQueue_ = [];
        a && 0 < a.length && a.forEach(function(b) {
          b.call(this);
        }, this);
        this.trigger("ready");
      }, 1);
    };
    c.prototype.$ = function(a, b) {
      return Ea(a, b || this.contentEl());
    };
    c.prototype.$$ = function(a, b) {
      return md(a, b || this.contentEl());
    };
    c.prototype.hasClass = function(a) {
      return Ba(this.el_, a);
    };
    c.prototype.addClass = function(a) {
      H(this.el_, a);
      return this;
    };
    c.prototype.removeClass = function(a) {
      Ca(this.el_, a);
      return this;
    };
    c.prototype.toggleClass = function(a, b) {
      Mb(this.el_, a, b);
      return this;
    };
    c.prototype.show = function() {
      this.removeClass("vjs-hidden");
      return this;
    };
    c.prototype.hide = function() {
      this.addClass("vjs-hidden");
      return this;
    };
    c.prototype.lockShowing = function() {
      this.addClass("vjs-lock-showing");
      return this;
    };
    c.prototype.unlockShowing = function() {
      this.removeClass("vjs-lock-showing");
      return this;
    };
    c.prototype.getAttribute = function(a) {
      return this.el_.getAttribute(a);
    };
    c.prototype.setAttribute = function(a, b) {
      this.el_.setAttribute(a, b);
      return this;
    };
    c.prototype.removeAttribute = function(a) {
      this.el_.removeAttribute(a);
      return this;
    };
    c.prototype.width = function(a, b) {
      return this.dimension("width", a, b);
    };
    c.prototype.height = function(a, b) {
      return this.dimension("height", a, b);
    };
    c.prototype.dimensions = function(a, b) {
      return this.width(a, !0).height(b);
    };
    c.prototype.dimension = function(a, b, d) {
      if (void 0 !== b) {
        if (null === b || b !== b) {
          b = 0;
        }
        -1 !== ("" + b).indexOf("%") || -1 !== ("" + b).indexOf("px") ? this.el_.style[a] = b : this.el_.style[a] = "auto" === b ? "" : b + "px";
        d || this.trigger("resize");
        return this;
      }
      if (!this.el_) {
        return 0;
      }
      b = this.el_.style[a];
      d = b.indexOf("px");
      return -1 !== d ? parseInt(b.slice(0, d), 10) : parseInt(this.el_["offset" + O(a)], 10);
    };
    c.prototype.currentDimension = function(a) {
      var b = 0;
      if ("width" !== a && "height" !== a) {
        throw Error("currentDimension only accepts width or height value");
      }
      "function" === typeof q.getComputedStyle && (b = q.getComputedStyle(this.el_), b = b.getPropertyValue(a) || b[a]);
      b = parseFloat(b);
      0 === b && (a = "offset" + O(a), b = this.el_[a]);
      return b;
    };
    c.prototype.currentDimensions = function() {
      return {width:this.currentDimension("width"), height:this.currentDimension("height")};
    };
    c.prototype.currentWidth = function() {
      return this.currentDimension("width");
    };
    c.prototype.currentHeight = function() {
      return this.currentDimension("height");
    };
    c.prototype.emitTapEvents = function() {
      var a = 0, b = null, d;
      this.on("touchstart", function(c) {
        1 === c.touches.length && (b = {pageX:c.touches[0].pageX, pageY:c.touches[0].pageY}, a = (new Date).getTime(), d = !0);
      });
      this.on("touchmove", function(a) {
        if (1 < a.touches.length) {
          d = !1;
        } else {
          if (b) {
            var c = a.touches[0].pageX - b.pageX;
            a = a.touches[0].pageY - b.pageY;
            10 < Math.sqrt(c * c + a * a) && (d = !1);
          }
        }
      });
      var c = function() {
        d = !1;
      };
      this.on("touchleave", c);
      this.on("touchcancel", c);
      this.on("touchend", function(c) {
        b = null;
        !0 === d && 200 > (new Date).getTime() - a && (c.preventDefault(), this.trigger("tap"));
      });
    };
    c.prototype.enableTouchActivity = function() {
      if (this.player() && this.player().reportUserActivity) {
        var a = y(this.player(), this.player().reportUserActivity), b;
        this.on("touchstart", function() {
          a();
          this.clearInterval(b);
          b = this.setInterval(a, 250);
        });
        var c = function(c) {
          a();
          this.clearInterval(b);
        };
        this.on("touchmove", a);
        this.on("touchend", c);
        this.on("touchcancel", c);
      }
    };
    c.prototype.setTimeout = function(a, b) {
      a = y(this, a);
      var c = q.setTimeout(a, b);
      a = function() {
        this.clearTimeout(c);
      };
      a.guid = "vjs-timeout-" + c;
      this.on("dispose", a);
      return c;
    };
    c.prototype.clearTimeout = function(a) {
      q.clearTimeout(a);
      var b = function() {
      };
      b.guid = "vjs-timeout-" + a;
      this.off("dispose", b);
      return a;
    };
    c.prototype.setInterval = function(a, b) {
      a = y(this, a);
      var c = q.setInterval(a, b);
      a = function() {
        this.clearInterval(c);
      };
      a.guid = "vjs-interval-" + c;
      this.on("dispose", a);
      return c;
    };
    c.prototype.clearInterval = function(a) {
      q.clearInterval(a);
      var b = function() {
      };
      b.guid = "vjs-interval-" + a;
      this.off("dispose", b);
      return a;
    };
    c.registerComponent = function(a, b) {
      if (a) {
        a = O(a);
        c.components_ || (c.components_ = {});
        if ("Player" === a && c.components_[a]) {
          var d = c.components_[a];
          if (d.players && 0 < Object.keys(d.players).length && Object.keys(d.players).map(function(b) {
            return d.players[b];
          }).every(Boolean)) {
            throw Error("Can not register Player component after player has been created");
          }
        }
        return c.components_[a] = b;
      }
    };
    c.getComponent = function(a) {
      if (a) {
        a = O(a);
        if (c.components_ && c.components_[a]) {
          return c.components_[a];
        }
        if (q && q.videojs && q.videojs[a]) {
          return D.warn("The " + a + " component was added to the videojs object when it should be registered using videojs.registerComponent(name, component)"), q.videojs[a];
        }
      }
    };
    c.extend = function(a) {
      a = a || {};
      D.warn("Component.extend({}) has been deprecated,  use videojs.extend(Component, {}) instead");
      var b = a.init || a.init || this.prototype.init || this.prototype.init || function() {
      }, d = function() {
        b.apply(this, arguments);
      };
      d.prototype = Object.create(this.prototype);
      d.prototype.constructor = d;
      d.extend = c.extend;
      for (var f in a) {
        a.hasOwnProperty(f) && (d.prototype[f] = a[f]);
      }
      return d;
    };
    return c;
  }();
  n.registerComponent("Component", n);
  var U = function() {
  };
  U.prototype.allowedEvents_ = {};
  U.prototype.on = function(c, a) {
    var b = this.addEventListener;
    this.addEventListener = function() {
    };
    Y(this, c, a);
    this.addEventListener = b;
  };
  U.prototype.addEventListener = U.prototype.on;
  U.prototype.off = function(c, a) {
    ea(this, c, a);
  };
  U.prototype.removeEventListener = U.prototype.off;
  U.prototype.one = function(c, a) {
    var b = this.addEventListener;
    this.addEventListener = function() {
    };
    Da(this, c, a);
    this.addEventListener = b;
  };
  U.prototype.trigger = function(c) {
    var a = c.type || c;
    "string" === typeof c && (c = {type:a});
    c = db(c);
    if (this.allowedEvents_[a] && this["on" + a]) {
      this["on" + a](c);
    }
    Ja(this, c);
  };
  U.prototype.dispatchEvent = U.prototype.trigger;
  for (var ka = {}, Qa = ["requestFullscreen exitFullscreen fullscreenElement fullscreenEnabled fullscreenchange fullscreenerror".split(" "), "webkitRequestFullscreen webkitExitFullscreen webkitFullscreenElement webkitFullscreenEnabled webkitfullscreenchange webkitfullscreenerror".split(" "), "webkitRequestFullScreen webkitCancelFullScreen webkitCurrentFullScreenElement webkitCancelFullScreen webkitfullscreenchange webkitfullscreenerror".split(" "), "mozRequestFullScreen mozCancelFullScreen mozFullScreenElement mozFullScreenEnabled mozfullscreenchange mozfullscreenerror".split(" "), 
  "msRequestFullscreen msExitFullscreen msFullscreenElement msFullscreenEnabled MSFullscreenChange MSFullscreenError".split(" ")], od = Qa[0], Ra, Q = 0;Q < Qa.length;Q++) {
    if (Qa[Q][1] in w) {
      Ra = Qa[Q];
      break;
    }
  }
  if (Ra) {
    for (Q = 0;Q < Ra.length;Q++) {
      ka[od[Q]] = Ra[Q];
    }
  }
  S.prototype.code = 0;
  S.prototype.message = "";
  S.prototype.status = null;
  S.errorTypes = "MEDIA_ERR_CUSTOM MEDIA_ERR_ABORTED MEDIA_ERR_NETWORK MEDIA_ERR_DECODE MEDIA_ERR_SRC_NOT_SUPPORTED MEDIA_ERR_ENCRYPTED".split(" ");
  S.defaultMessages = {1:"You aborted the media playback", 2:"A network error caused the media download to fail part-way.", 3:"The media playback was aborted due to a corruption problem or because the media used features your browser did not support.", 4:"The media could not be loaded, either because the server or network failed or because the format is not supported.", 5:"The media is encrypted and we do not have the keys to decrypt it."};
  for (var wa = 0;wa < S.errorTypes.length;wa++) {
    S[S.errorTypes[wa]] = wa, S.prototype[S.errorTypes[wa]] = wa;
  }
  var nb = function(c) {
    return "kind label language id inBandMetadataTrackDispatchType mode src".split(" ").reduce(function(a, b, d) {
      c[b] && (a[b] = c[b]);
      return a;
    }, {cues:c.cues && Array.prototype.map.call(c.cues, function(a) {
      return {startTime:a.startTime, endTime:a.endTime, text:a.text, id:a.id};
    })});
  }, nc = {textTracksToJson:function(c) {
    var a = c.$$("track"), b = Array.prototype.map.call(a, function(b) {
      return b.track;
    });
    return Array.prototype.map.call(a, function(b) {
      var a = nb(b.track);
      b.src && (a.src = b.src);
      return a;
    }).concat(Array.prototype.filter.call(c.textTracks(), function(a) {
      return -1 === b.indexOf(a);
    }).map(nb));
  }, jsonToTextTracks:function(c, a) {
    c.forEach(function(b) {
      var c = a.addRemoteTextTrack(b).track;
      !b.src && b.cues && b.cues.forEach(function(b) {
        return c.addCue(b);
      });
    });
    return a.textTracks();
  }, trackToJson_:nb}, Fa = function(c) {
    function a(b, a) {
      b = c.call(this, b, a) || this;
      b.opened_ = b.hasBeenOpened_ = b.hasBeenFilled_ = !1;
      b.closeable(!b.options_.uncloseable);
      b.content(b.options_.content);
      b.contentEl_ = h("div", {className:"vjs-modal-dialog-content"}, {role:"document"});
      b.descEl_ = h("p", {className:"vjs-modal-dialog-description vjs-offscreen", id:b.el().getAttribute("aria-describedby")});
      oa(b.descEl_, b.description());
      b.el_.appendChild(b.descEl_);
      b.el_.appendChild(b.contentEl_);
      return b;
    }
    __extends(a, c);
    a.prototype.createEl = function() {
      return c.prototype.createEl.call(this, "div", {className:this.buildCSSClass(), tabIndex:-1}, {"aria-describedby":this.id() + "_description", "aria-hidden":"true", "aria-label":this.label(), role:"dialog"});
    };
    a.prototype.buildCSSClass = function() {
      return "vjs-modal-dialog vjs-hidden " + c.prototype.buildCSSClass.call(this);
    };
    a.prototype.handleKeyPress = function(b) {
      27 === b.which && this.closeable() && this.close();
    };
    a.prototype.label = function() {
      return this.options_.label || this.localize("Modal Window");
    };
    a.prototype.description = function() {
      var b = this.options_.description || this.localize("This is a modal window.");
      this.closeable() && (b += " " + this.localize("This modal can be closed by pressing the Escape key or activating the close button."));
      return b;
    };
    a.prototype.open = function() {
      if (!this.opened_) {
        var b = this.player();
        this.trigger("beforemodalopen");
        this.opened_ = !0;
        (this.options_.fillAlways || !this.hasBeenOpened_ && !this.hasBeenFilled_) && this.fill();
        (this.wasPlaying_ = !b.paused()) && b.pause();
        if (this.closeable()) {
          this.on(this.el_.ownerDocument, "keydown", y(this, this.handleKeyPress));
        }
        b.controls(!1);
        this.show();
        this.el().setAttribute("aria-hidden", "false");
        this.trigger("modalopen");
        this.hasBeenOpened_ = !0;
      }
      return this;
    };
    a.prototype.opened = function(b) {
      if ("boolean" === typeof b) {
        this[b ? "open" : "close"]();
      }
      return this.opened_;
    };
    a.prototype.close = function() {
      if (this.opened_) {
        var b = this.player();
        this.trigger("beforemodalclose");
        this.opened_ = !1;
        this.wasPlaying_ && b.play();
        this.closeable() && this.off(this.el_.ownerDocument, "keydown", y(this, this.handleKeyPress));
        b.controls(!0);
        this.hide();
        this.el().setAttribute("aria-hidden", "true");
        this.trigger("modalclose");
        this.options_.temporary && this.dispose();
      }
      return this;
    };
    a.prototype.closeable = function(b) {
      if ("boolean" === typeof b) {
        b = this.closeable_ = !!b;
        var a = this.getChild("closeButton");
        if (b && !a) {
          var c = this.contentEl_;
          this.contentEl_ = this.el_;
          a = this.addChild("closeButton", {controlText:"Close Modal Dialog"});
          this.contentEl_ = c;
          this.on(a, "close", this.close);
        }
        !b && a && (this.off(a, "close", this.close), this.removeChild(a), a.dispose());
      }
      return this.closeable_;
    };
    a.prototype.fill = function() {
      return this.fillWith(this.content());
    };
    a.prototype.fillWith = function(b) {
      var a = this.contentEl(), c = a.parentNode, g = a.nextSibling;
      this.trigger("beforemodalfill");
      this.hasBeenFilled_ = !0;
      c.removeChild(a);
      this.empty();
      Pb(a, b);
      this.trigger("modalfill");
      g ? c.insertBefore(a, g) : c.appendChild(a);
      return this;
    };
    a.prototype.empty = function() {
      this.trigger("beforemodalempty");
      bb(this.contentEl());
      this.trigger("modalempty");
      return this;
    };
    a.prototype.content = function(b) {
      "undefined" !== typeof b && (this.content_ = b);
      return this.content_;
    };
    return a;
  }(n);
  Fa.prototype.options_ = {temporary:!0};
  n.registerComponent("ModalDialog", Fa);
  var oc = function() {
    function c(a) {
      var b = this;
      if (T) {
        var b = w.createElement("custom"), d;
        for (d in c.prototype) {
          "constructor" !== d && (b[d] = c.prototype[d]);
        }
      }
      c.prototype.setCues_.call(b, a);
      Object.defineProperty(b, "length", {get:function() {
        return this.length_;
      }});
      if (T) {
        return b;
      }
    }
    c.prototype.setCues_ = function(a) {
      var b = this.length || 0, c = 0, f = a.length;
      this.cues_ = a;
      this.length_ = a.length;
      a = function(b) {
        "" + b in this || Object.defineProperty(this, "" + b, {get:function() {
          return this.cues_[b];
        }});
      };
      if (b < f) {
        for (c = b;c < f;c++) {
          a.call(this, c);
        }
      }
    };
    c.prototype.getCueById = function(a) {
      for (var b = null, c = 0, f = this.length;c < f;c++) {
        var g = this[c];
        if (g.id === a) {
          b = g;
          break;
        }
      }
      return b;
    };
    return c;
  }(), pd = {alternative:"alternative", captions:"captions", main:"main", sign:"sign", subtitles:"subtitles", commentary:"commentary"}, qd = {alternative:"alternative", descriptions:"descriptions", main:"main", "main-desc":"main-desc", translation:"translation", commentary:"commentary"}, rd = {subtitles:"subtitles", captions:"captions", descriptions:"descriptions", chapters:"chapters", metadata:"metadata"}, pc = {disabled:"disabled", hidden:"hidden", showing:"showing"}, ob = function(c) {
    function a(b) {
      void 0 === b && (b = {});
      var d = c.call(this) || this;
      if (T) {
        var d = w.createElement("custom"), f;
        for (f in a.prototype) {
          "constructor" !== f && (d[f] = a.prototype[f]);
        }
      }
      var g = {id:b.id || "vjs_track_" + qa++, kind:b.kind || "", label:b.label || "", language:b.language || ""};
      b = function(b) {
        Object.defineProperty(d, b, {get:function() {
          return g[b];
        }, set:function() {
        }});
      };
      for (var e in g) {
        b(e);
      }
      return d;
    }
    __extends(a, c);
    return a;
  }(U), qc = function(c) {
    var a = "protocol hostname port pathname search hash host".split(" "), b = w.createElement("a");
    b.href = c;
    var d = "" === b.host && "file:" !== b.protocol, f;
    d && (f = w.createElement("div"), f.innerHTML = '<a href="' + c + '"></a>', b = f.firstChild, f.setAttribute("style", "display:none; position:absolute;"), w.body.appendChild(f));
    c = {};
    for (var g = 0;g < a.length;g++) {
      c[a[g]] = b[a[g]];
    }
    "http:" === c.protocol && (c.host = c.host.replace(/:80$/, ""));
    "https:" === c.protocol && (c.host = c.host.replace(/:443$/, ""));
    d && w.body.removeChild(f);
    return c;
  }, sd = function(c) {
    if (!c.match(/^https?:\/\//)) {
      var a = w.createElement("div");
      a.innerHTML = '<a href="' + c + '">x</a>';
      c = a.firstChild.href;
    }
    return c;
  }, rc = function(c) {
    return "string" === typeof c && (c = /^(\/?)([\s\S]*?)((?:\.{1,2}|[^\/]+?)(\.([^\.\/\?]+)))(?:[\/]*|[\?].*)$/i.exec(c)) ? c.pop().toLowerCase() : "";
  }, pb = function(c) {
    var a = q.location;
    c = qc(c);
    return (":" === c.protocol ? a.protocol : c.protocol) + c.host !== a.protocol + a.host;
  }, sc = function(c) {
    var a = td.call(c);
    return "[object Function]" === a || "function" === typeof c && "[object RegExp]" !== a || "undefined" !== typeof window && (c === window.setTimeout || c === window.alert || c === window.confirm || c === window.prompt);
  }, td = Object.prototype.toString, qb = k(function(c, a) {
    a = c.exports = function(b) {
      return b.replace(/^\s*|\s*$/g, "");
    };
    a.left = function(b) {
      return b.replace(/^\s*/, "");
    };
    a.right = function(b) {
      return b.replace(/\s*$/, "");
    };
  }), ud = Object.prototype.toString, tc = Object.prototype.hasOwnProperty, vd = function(c, a, b) {
    if (!sc(a)) {
      throw new TypeError("iterator must be a function");
    }
    3 > arguments.length && (b = this);
    if ("[object Array]" === ud.call(c)) {
      for (var d = b, f = 0, g = c.length;f < g;f++) {
        tc.call(c, f) && a.call(d, c[f], f, c);
      }
    } else {
      if ("string" === typeof c) {
        for (d = b, f = 0, g = c.length;f < g;f++) {
          a.call(d, c.charAt(f), f, c);
        }
      } else {
        for (f in d = b, c) {
          tc.call(c, f) && a.call(d, c[f], f, c);
        }
      }
    }
  }, wd = Object.prototype.hasOwnProperty, uc = q, dd = sc, fd = function(c) {
    if (!c) {
      return {};
    }
    var a = {};
    vd(qb(c).split("\n"), function(b) {
      var c = b.indexOf(":"), f = qb(b.slice(0, c)).toLowerCase();
      b = qb(b.slice(c + 1));
      "undefined" === typeof a[f] ? a[f] = b : "[object Array]" === Object.prototype.toString.call(a[f]) ? a[f].push(b) : a[f] = [a[f], b];
    });
    return a;
  }, ed = function() {
    for (var c = {}, a = 0;a < arguments.length;a++) {
      var b = arguments[a], d;
      for (d in b) {
        wd.call(b, d) && (c[d] = b[d]);
      }
    }
    return c;
  };
  ga.XMLHttpRequest = uc.XMLHttpRequest || gd;
  ga.XDomainRequest = "withCredentials" in new ga.XMLHttpRequest ? ga.XMLHttpRequest : uc.XDomainRequest;
  (function(c, a) {
    for (var b = 0;b < c.length;b++) {
      a(c[b]);
    }
  })("get put post patch head delete".split(" "), function(c) {
    ga["delete" === c ? "del" : c] = function(a, b, d) {
      b = Ub(a, b, d);
      b.method = c.toUpperCase();
      return Vb(b);
    };
  });
  var vc = function(c, a) {
    var b = new q.WebVTT.Parser(q, q.vttjs, q.WebVTT.StringDecoder()), d = [];
    b.oncue = function(b) {
      a.addCue(b);
    };
    b.onparsingerror = function(b) {
      d.push(b);
    };
    b.onflush = function() {
      a.trigger({type:"loadeddata", target:a});
    };
    b.parse(c);
    0 < d.length && (q.console && q.console.groupCollapsed && q.console.groupCollapsed("Text Track parsing errors for " + a.src), d.forEach(function(b) {
      return D.error(b);
    }), q.console && q.console.groupEnd && q.console.groupEnd());
    b.flush();
  }, xd = function(c, a) {
    var b = {uri:c};
    if (c = pb(c)) {
      b.cors = c;
    }
    ga(b, y(this, function(b, c, g) {
      if (b) {
        return D.error(b, c);
      }
      a.loaded_ = !0;
      if ("function" !== typeof q.WebVTT) {
        if (a.tech_) {
          var d = function() {
            return vc(g, a);
          };
          a.tech_.on("vttjsloaded", d);
          a.tech_.on("vttjserror", function() {
            D.error("vttjs failed to load, stopping trying to process " + a.src);
            a.tech_.off("vttjsloaded", d);
          });
        }
      } else {
        vc(g, a);
      }
    }));
  }, Sa = function(c) {
    function a(b) {
      void 0 === b && (b = {});
      if (!b.tech) {
        throw Error("A tech was not provided.");
      }
      b = P(b, {kind:rd[b.kind] || "subtitles", language:b.language || b.srclang || ""});
      var d = pc[b.mode] || "disabled", f = b["default"];
      if ("metadata" === b.kind || "chapters" === b.kind) {
        d = "hidden";
      }
      var g = c.call(this, b) || this;
      g.tech_ = b.tech;
      if (T) {
        for (var e in a.prototype) {
          "constructor" !== e && (g[e] = a.prototype[e]);
        }
      }
      g.cues_ = [];
      g.activeCues_ = [];
      var h = new oc(g.cues_), z = new oc(g.activeCues_), l = !1, n = y(g, function() {
        this.activeCues;
        l && (this.trigger("cuechange"), l = !1);
      });
      if ("disabled" !== d) {
        g.tech_.on("timeupdate", n);
      }
      Object.defineProperty(g, "default", {get:function() {
        return f;
      }, set:function() {
      }});
      Object.defineProperty(g, "mode", {get:function() {
        return d;
      }, set:function(b) {
        if (pc[b]) {
          d = b;
          if ("showing" === d) {
            this.tech_.on("timeupdate", n);
          }
          this.trigger("modechange");
        }
      }});
      Object.defineProperty(g, "cues", {get:function() {
        return this.loaded_ ? h : null;
      }, set:function() {
      }});
      Object.defineProperty(g, "activeCues", {get:function() {
        if (!this.loaded_) {
          return null;
        }
        if (0 === this.cues.length) {
          return z;
        }
        for (var b = this.tech_.currentTime(), a = [], c = 0, d = this.cues.length;c < d;c++) {
          var f = this.cues[c];
          f.startTime <= b && f.endTime >= b ? a.push(f) : f.startTime === f.endTime && f.startTime <= b && f.startTime + .5 >= b && a.push(f);
        }
        l = !1;
        if (a.length !== this.activeCues_.length) {
          l = !0;
        } else {
          for (c = 0;c < a.length;c++) {
            -1 === this.activeCues_.indexOf(a[c]) && (l = !0);
          }
        }
        this.activeCues_ = a;
        z.setCues_(this.activeCues_);
        return z;
      }, set:function() {
      }});
      b.src ? (g.src = b.src, xd(b.src, g)) : g.loaded_ = !0;
      return g;
    }
    __extends(a, c);
    a.prototype.addCue = function(b) {
      var a = this.tech_.textTracks();
      if (a) {
        for (var c = 0;c < a.length;c++) {
          a[c] !== this && a[c].removeCue(b);
        }
      }
      this.cues_.push(b);
      this.cues.setCues_(this.cues_);
    };
    a.prototype.removeCue = function(b) {
      for (var a = !1, c = 0, g = this.cues_.length;c < g;c++) {
        this.cues_[c] === b && (this.cues_.splice(c, 1), a = !0);
      }
      a && this.cues.setCues_(this.cues_);
    };
    return a;
  }(ob);
  Sa.prototype.allowedEvents_ = {cuechange:"cuechange"};
  var xa = function(c) {
    function a(b) {
      void 0 === b && (b = {});
      var d = c.call(this) || this, f, g = d;
      if (T) {
        var g = w.createElement("custom"), e;
        for (e in a.prototype) {
          "constructor" !== e && (g[e] = a.prototype[e]);
        }
      }
      var h = new Sa(b);
      g.kind = h.kind;
      g.src = h.src;
      g.srclang = h.language;
      g.label = h.label;
      g["default"] = h["default"];
      Object.defineProperty(g, "readyState", {get:function() {
        return f;
      }});
      Object.defineProperty(g, "track", {get:function() {
        return h;
      }});
      f = 0;
      h.addEventListener("loadeddata", function() {
        f = 2;
        g.trigger({type:"load", target:g});
      });
      return T ? g : d;
    }
    __extends(a, c);
    return a;
  }(U);
  xa.prototype.allowedEvents_ = {load:"load"};
  xa.NONE = 0;
  xa.LOADING = 1;
  xa.LOADED = 2;
  xa.ERROR = 3;
  var yd = function() {
    function c(a) {
      void 0 === a && (a = []);
      var b = this;
      if (T) {
        var b = w.createElement("custom"), d;
        for (d in c.prototype) {
          "constructor" !== d && (b[d] = c.prototype[d]);
        }
      }
      b.trackElements_ = [];
      Object.defineProperty(b, "length", {get:function() {
        return this.trackElements_.length;
      }});
      d = 0;
      for (var f = a.length;d < f;d++) {
        b.addTrackElement_(a[d]);
      }
      if (T) {
        return b;
      }
    }
    c.prototype.addTrackElement_ = function(a) {
      var b = this.trackElements_.length;
      "" + b in this || Object.defineProperty(this, b, {get:function() {
        return this.trackElements_[b];
      }});
      -1 === this.trackElements_.indexOf(a) && this.trackElements_.push(a);
    };
    c.prototype.getTrackElementByTrack_ = function(a) {
      for (var b, c = 0, f = this.trackElements_.length;c < f;c++) {
        if (a === this.trackElements_[c].track) {
          b = this.trackElements_[c];
          break;
        }
      }
      return b;
    };
    c.prototype.removeTrackElement_ = function(a) {
      for (var b = 0, c = this.trackElements_.length;b < c;b++) {
        if (a === this.trackElements_[b]) {
          this.trackElements_.splice(b, 1);
          break;
        }
      }
    };
    return c;
  }(), Z = function(c) {
    function a(b, d) {
      void 0 === b && (b = []);
      void 0 === d && (d = null);
      var f = c.call(this) || this;
      if (!d && (d = f, T)) {
        d = w.createElement("custom");
        for (var g in a.prototype) {
          "constructor" !== g && (d[g] = a.prototype[g]);
        }
      }
      d.tracks_ = [];
      Object.defineProperty(d, "length", {get:function() {
        return this.tracks_.length;
      }});
      for (f = 0;f < b.length;f++) {
        d.addTrack_(b[f]);
      }
      return d;
    }
    __extends(a, c);
    a.prototype.addTrack_ = function(b) {
      var a = this.tracks_.length;
      "" + a in this || Object.defineProperty(this, a, {get:function() {
        return this.tracks_[a];
      }});
      -1 === this.tracks_.indexOf(b) && (this.tracks_.push(b), this.trigger({track:b, type:"addtrack"}));
    };
    a.prototype.removeTrack_ = function(b) {
      for (var a, c = 0, g = this.length;c < g;c++) {
        if (this[c] === b) {
          a = this[c];
          a.off && a.off();
          this.tracks_.splice(c, 1);
          break;
        }
      }
      a && this.trigger({track:a, type:"removetrack"});
    };
    a.prototype.getTrackById = function(b) {
      for (var a = null, c = 0, g = this.length;c < g;c++) {
        var e = this[c];
        if (e.id === b) {
          a = e;
          break;
        }
      }
      return a;
    };
    return a;
  }(U);
  Z.prototype.allowedEvents_ = {change:"change", addtrack:"addtrack", removetrack:"removetrack"};
  for (var zd in Z.prototype.allowedEvents_) {
    Z.prototype["on" + zd] = null;
  }
  var rb = function(c) {
    function a(b) {
      void 0 === b && (b = []);
      var d;
      if (T) {
        d = w.createElement("custom");
        for (var f in Z.prototype) {
          "constructor" !== f && (d[f] = Z.prototype[f]);
        }
        for (f in a.prototype) {
          "constructor" !== f && (d[f] = a.prototype[f]);
        }
      }
      return d = c.call(this, b, d) || this;
    }
    __extends(a, c);
    a.prototype.addTrack_ = function(b) {
      c.prototype.addTrack_.call(this, b);
      b.addEventListener("modechange", y(this, function() {
        this.trigger("change");
      }));
    };
    return a;
  }(Z), sb = function(c, a) {
    for (var b = 0;b < c.length;b++) {
      a.id !== c[b].id && (c[b].selected = !1);
    }
  }, wc = function(c) {
    function a(b) {
      void 0 === b && (b = []);
      for (var d, f = b.length - 1;0 <= f;f--) {
        if (b[f].selected) {
          sb(b, b[f]);
          break;
        }
      }
      if (T) {
        d = w.createElement("custom");
        for (var g in Z.prototype) {
          "constructor" !== g && (d[g] = Z.prototype[g]);
        }
        for (g in a.prototype) {
          "constructor" !== g && (d[g] = a.prototype[g]);
        }
      }
      d = c.call(this, b, d) || this;
      d.changing_ = !1;
      Object.defineProperty(d, "selectedIndex", {get:function() {
        for (var b = 0;b < this.length;b++) {
          if (this[b].selected) {
            return b;
          }
        }
        return -1;
      }, set:function() {
      }});
      return d;
    }
    __extends(a, c);
    a.prototype.addTrack_ = function(b) {
      var a = this;
      b.selected && sb(this, b);
      c.prototype.addTrack_.call(this, b);
      b.addEventListener && b.addEventListener("selectedchange", function() {
        a.changing_ || (a.changing_ = !0, sb(a, b), a.changing_ = !1, a.trigger("change"));
      });
    };
    a.prototype.addTrack = function(b) {
      this.addTrack_(b);
    };
    a.prototype.removeTrack = function(b) {
      c.prototype.removeTrack_.call(this, b);
    };
    return a;
  }(Z), tb = function(c, a) {
    for (var b = 0;b < c.length;b++) {
      a.id !== c[b].id && (c[b].enabled = !1);
    }
  }, xc = function(c) {
    function a(b) {
      void 0 === b && (b = []);
      for (var d, f = b.length - 1;0 <= f;f--) {
        if (b[f].enabled) {
          tb(b, b[f]);
          break;
        }
      }
      if (T) {
        d = w.createElement("custom");
        for (var g in Z.prototype) {
          "constructor" !== g && (d[g] = Z.prototype[g]);
        }
        for (g in a.prototype) {
          "constructor" !== g && (d[g] = a.prototype[g]);
        }
      }
      d = c.call(this, b, d) || this;
      d.changing_ = !1;
      return d;
    }
    __extends(a, c);
    a.prototype.addTrack_ = function(b) {
      var a = this;
      b.enabled && tb(this, b);
      c.prototype.addTrack_.call(this, b);
      b.addEventListener && b.addEventListener("enabledchange", function() {
        a.changing_ || (a.changing_ = !0, tb(a, b), a.changing_ = !1, a.trigger("change"));
      });
    };
    a.prototype.addTrack = function(b) {
      this.addTrack_(b);
    };
    a.prototype.removeTrack = function(b) {
      c.prototype.removeTrack_.call(this, b);
    };
    return a;
  }(Z), I = function(c) {
    function a(b, a) {
      void 0 === b && (b = {});
      void 0 === a && (a = function() {
      });
      var d;
      b.reportTouchActivity = !1;
      d = c.call(this, null, b, a) || this;
      d.hasStarted_ = !1;
      d.on("playing", function() {
        this.hasStarted_ = !0;
      });
      d.on("loadstart", function() {
        this.hasStarted_ = !1;
      });
      d.textTracks_ = b.textTracks;
      d.videoTracks_ = b.videoTracks;
      d.audioTracks_ = b.audioTracks;
      d.featuresProgressEvents || d.manualProgressOn();
      d.featuresTimeupdateEvents || d.manualTimeUpdatesOn();
      ["Text", "Audio", "Video"].forEach(function(a) {
        !1 === b["native" + a + "Tracks"] && (d["featuresNative" + a + "Tracks"] = !1);
      });
      !1 === b.nativeCaptions && (d.featuresNativeTextTracks = !1);
      d.featuresNativeTextTracks || d.emulateTextTracks();
      d.autoRemoteTextTracks_ = new rb;
      d.initTextTrackListeners();
      d.initTrackListeners();
      d.emitTapEvents();
      return d;
    }
    __extends(a, c);
    a.prototype.manualProgressOn = function() {
      this.on("durationchange", this.onDurationChange);
      this.manualProgress = !0;
      this.one("ready", this.trackProgress);
    };
    a.prototype.manualProgressOff = function() {
      this.manualProgress = !1;
      this.stopTrackingProgress();
      this.off("durationchange", this.onDurationChange);
    };
    a.prototype.trackProgress = function(b) {
      this.stopTrackingProgress();
      this.progressInterval = this.setInterval(y(this, function() {
        var b = this.bufferedPercent();
        this.bufferedPercent_ !== b && this.trigger("progress");
        this.bufferedPercent_ = b;
        1 === b && this.stopTrackingProgress();
      }), 500);
    };
    a.prototype.onDurationChange = function(b) {
      this.duration_ = this.duration();
    };
    a.prototype.buffered = function() {
      return fa(0, 0);
    };
    a.prototype.bufferedPercent = function() {
      return Tb(this.buffered(), this.duration_);
    };
    a.prototype.stopTrackingProgress = function() {
      this.clearInterval(this.progressInterval);
    };
    a.prototype.manualTimeUpdatesOn = function() {
      this.manualTimeUpdates = !0;
      this.on("play", this.trackCurrentTime);
      this.on("pause", this.stopTrackingCurrentTime);
    };
    a.prototype.manualTimeUpdatesOff = function() {
      this.manualTimeUpdates = !1;
      this.stopTrackingCurrentTime();
      this.off("play", this.trackCurrentTime);
      this.off("pause", this.stopTrackingCurrentTime);
    };
    a.prototype.trackCurrentTime = function() {
      this.currentTimeInterval && this.stopTrackingCurrentTime();
      this.currentTimeInterval = this.setInterval(function() {
        this.trigger({type:"timeupdate", target:this, manuallyTriggered:!0});
      }, 250);
    };
    a.prototype.stopTrackingCurrentTime = function() {
      this.clearInterval(this.currentTimeInterval);
      this.trigger({type:"timeupdate", target:this, manuallyTriggered:!0});
    };
    a.prototype.dispose = function() {
      this.clearTracks(["audio", "video", "text"]);
      this.manualProgress && this.manualProgressOff();
      this.manualTimeUpdates && this.manualTimeUpdatesOff();
      c.prototype.dispose.call(this);
    };
    a.prototype.clearTracks = function(b) {
      var a = this;
      b = [].concat(b);
      b.forEach(function(b) {
        for (var c = a[b + "Tracks"]() || [], d = c.length;d--;) {
          var f = c[d];
          "text" === b && a.removeRemoteTextTrack(f);
          c.removeTrack_(f);
        }
      });
    };
    a.prototype.cleanupAutoTextTracks = function() {
      for (var b = this.autoRemoteTextTracks_ || [], a = b.length;a--;) {
        this.removeRemoteTextTrack(b[a]);
      }
    };
    a.prototype.reset = function() {
    };
    a.prototype.error = function(b) {
      void 0 !== b && (this.error_ = new S(b), this.trigger("error"));
      return this.error_;
    };
    a.prototype.played = function() {
      return this.hasStarted_ ? fa(0, 0) : fa();
    };
    a.prototype.setCurrentTime = function() {
      this.manualTimeUpdates && this.trigger({type:"timeupdate", target:this, manuallyTriggered:!0});
    };
    a.prototype.initTextTrackListeners = function() {
      var b = y(this, function() {
        this.trigger("texttrackchange");
      }), a = this.textTracks();
      a && (a.addEventListener("removetrack", b), a.addEventListener("addtrack", b), this.on("dispose", y(this, function() {
        a.removeEventListener("removetrack", b);
        a.removeEventListener("addtrack", b);
      })));
    };
    a.prototype.initTrackListeners = function() {
      var b = this;
      ["video", "audio"].forEach(function(a) {
        var c = function() {
          b.trigger(a + "trackchange");
        }, d = b[a + "Tracks"]();
        d.addEventListener("removetrack", c);
        d.addEventListener("addtrack", c);
        b.on("dispose", function() {
          d.removeEventListener("removetrack", c);
          d.removeEventListener("addtrack", c);
        });
      });
    };
    a.prototype.addWebVttScript_ = function() {
      var b = this;
      if (!q.WebVTT && null !== this.el().parentNode && void 0 !== this.el().parentNode) {
        var a = w.createElement("script");
        a.src = this.options_["vtt.js"] || "../node_modules/videojs-vtt.js/dist/vtt.js";
        a.onload = function() {
          b.trigger("vttjsloaded");
        };
        a.onerror = function() {
          b.trigger("vttjserror");
        };
        this.on("dispose", function() {
          a.onload = null;
          a.onerror = null;
        });
        q.WebVTT = !0;
        this.el().parentNode.appendChild(a);
      }
    };
    a.prototype.emulateTextTracks = function() {
      var b = this, a = this.textTracks();
      if (a) {
        this.remoteTextTracks().on("addtrack", function(a) {
          b.textTracks().addTrack_(a.track);
        });
        this.remoteTextTracks().on("removetrack", function(a) {
          b.textTracks().removeTrack_(a.track);
        });
        this.on("ready", this.addWebVttScript_);
        var c = function() {
          return b.trigger("texttrackchange");
        }, g = function() {
          c();
          for (var b = 0;b < a.length;b++) {
            var d = a[b];
            d.removeEventListener("cuechange", c);
            "showing" === d.mode && d.addEventListener("cuechange", c);
          }
        };
        g();
        a.addEventListener("change", g);
        this.on("dispose", function() {
          a.removeEventListener("change", g);
        });
      }
    };
    a.prototype.videoTracks = function() {
      return this.videoTracks_ = this.videoTracks_ || new wc;
    };
    a.prototype.audioTracks = function() {
      return this.audioTracks_ = this.audioTracks_ || new xc;
    };
    a.prototype.textTracks = function() {
      return this.textTracks_ = this.textTracks_ || new rb;
    };
    a.prototype.remoteTextTracks = function() {
      return this.remoteTextTracks_ = this.remoteTextTracks_ || new rb;
    };
    a.prototype.remoteTextTrackEls = function() {
      return this.remoteTextTrackEls_ = this.remoteTextTrackEls_ || new yd;
    };
    a.prototype.addTextTrack = function(b, a, c) {
      if (!b) {
        throw Error("TextTrack kind is required but was not provided");
      }
      var d = void 0;
      void 0 === d && (d = {});
      var f = this.textTracks();
      d.kind = b;
      a && (d.label = a);
      c && (d.language = c);
      d.tech = this;
      b = new Sa(d);
      f.addTrack_(b);
      return b;
    };
    a.prototype.createRemoteTextTrack = function(b) {
      b = P(b, {tech:this});
      return new xa(b);
    };
    a.prototype.addRemoteTextTrack = function(b, a) {
      void 0 === b && (b = {});
      b = this.createRemoteTextTrack(b);
      !0 !== a && !1 !== a && (D.warn('Calling addRemoteTextTrack without explicitly setting the "manualCleanup" parameter to `true` is deprecated and default to `false` in future version of video.js'), a = !0);
      this.remoteTextTrackEls().addTrackElement_(b);
      this.remoteTextTracks().addTrack_(b.track);
      !0 !== a && this.autoRemoteTextTracks_.addTrack_(b.track);
      return b;
    };
    a.prototype.removeRemoteTextTrack = function(b) {
      var a = this.remoteTextTrackEls().getTrackElementByTrack_(b);
      this.remoteTextTrackEls().removeTrackElement_(a);
      this.remoteTextTracks().removeTrack_(b);
      this.autoRemoteTextTracks_.removeTrack_(b);
    };
    a.prototype.setPoster = function() {
    };
    a.prototype.canPlayType = function() {
      return "";
    };
    a.isTech = function(b) {
      return b.prototype instanceof a || b instanceof a || b === a;
    };
    a.registerTech = function(b, c) {
      a.techs_ || (a.techs_ = {});
      if (!a.isTech(c)) {
        throw Error("Tech " + b + " must be a Tech");
      }
      return a.techs_[b] = c;
    };
    a.getTech = function(b) {
      if (a.techs_ && a.techs_[b]) {
        return a.techs_[b];
      }
      if (q && q.videojs && q.videojs[b]) {
        return D.warn("The " + b + " tech was added to the videojs object when it should be registered using videojs.registerTech(name, tech)"), q.videojs[b];
      }
    };
    return a;
  }(n);
  I.prototype.featuresVolumeControl = !0;
  I.prototype.featuresFullscreenResize = !1;
  I.prototype.featuresPlaybackRate = !1;
  I.prototype.featuresProgressEvents = !1;
  I.prototype.featuresTimeupdateEvents = !1;
  I.prototype.featuresNativeTextTracks = !1;
  I.withSourceHandlers = function(c) {
    c.registerSourceHandler = function(a, b) {
      var d = c.sourceHandlers;
      d || (d = c.sourceHandlers = []);
      void 0 === b && (b = d.length);
      d.splice(b, 0, a);
    };
    c.canPlayType = function(a) {
      for (var b = c.sourceHandlers || [], d, f = 0;f < b.length;f++) {
        if (d = b[f].canPlayType(a)) {
          return d;
        }
      }
      return "";
    };
    c.selectSourceHandler = function(a, b) {
      for (var d = c.sourceHandlers || [], f, g = 0;g < d.length;g++) {
        if (f = d[g].canHandleSource(a, b)) {
          return d[g];
        }
      }
      return null;
    };
    c.canPlaySource = function(a, b) {
      var d = c.selectSourceHandler(a, b);
      return d ? d.canHandleSource(a, b) : "";
    };
    ["seekable", "duration"].forEach(function(a) {
      var b = this[a];
      "function" === typeof b && (this[a] = function() {
        return this.sourceHandler_ && this.sourceHandler_[a] ? this.sourceHandler_[a].apply(this.sourceHandler_, arguments) : b.apply(this, arguments);
      });
    }, c.prototype);
    c.prototype.setSource = function(a) {
      var b = c.selectSourceHandler(a, this.options_);
      b || (c.nativeSourceHandler ? b = c.nativeSourceHandler : D.error("No source hander found for the current source."));
      this.disposeSourceHandler();
      this.off("dispose", this.disposeSourceHandler);
      b !== c.nativeSourceHandler && (this.currentSource_ = a, this.off(this.el_, "loadstart", c.prototype.firstLoadStartListener_), this.off(this.el_, "loadstart", c.prototype.successiveLoadStartListener_), this.one(this.el_, "loadstart", c.prototype.firstLoadStartListener_));
      this.sourceHandler_ = b.handleSource(a, this, this.options_);
      this.on("dispose", this.disposeSourceHandler);
      return this;
    };
    c.prototype.firstLoadStartListener_ = function() {
      this.one(this.el_, "loadstart", c.prototype.successiveLoadStartListener_);
    };
    c.prototype.successiveLoadStartListener_ = function() {
      this.disposeSourceHandler();
      this.one(this.el_, "loadstart", c.prototype.successiveLoadStartListener_);
    };
    c.prototype.disposeSourceHandler = function() {
      this.currentSource_ && (this.clearTracks(["audio", "video"]), this.currentSource_ = null);
      this.cleanupAutoTextTracks();
      this.sourceHandler_ && (this.off(this.el_, "loadstart", c.prototype.firstLoadStartListener_), this.off(this.el_, "loadstart", c.prototype.successiveLoadStartListener_), this.sourceHandler_.dispose && this.sourceHandler_.dispose(), this.sourceHandler_ = null);
    };
  };
  n.registerComponent("Tech", I);
  n.registerComponent("MediaTechController", I);
  I.registerTech("Tech", I);
  var Ad = function(c) {
    function a(b, a, f) {
      f = c.call(this, b, a, f) || this;
      if (a.playerOptions.sources && 0 !== a.playerOptions.sources.length) {
        b.src(a.playerOptions.sources);
      } else {
        var d = 0;
        for (a = a.playerOptions.techOrder;d < a.length;d++) {
          var e = O(a[d]), h = I.getTech(e);
          e || (h = n.getComponent(e));
          if (h && h.isSupported()) {
            b.loadTech_(e);
            break;
          }
        }
      }
      return f;
    }
    __extends(a, c);
    return a;
  }(n);
  n.registerComponent("MediaLoader", Ad);
  for (var ub = q.navigator, G = function(c) {
    function a(b, d) {
      d = c.call(this, b, d) || this;
      b.source && d.ready(function() {
        this.setSource(b.source);
      }, !0);
      b.startTime && d.ready(function() {
        this.load();
        this.play();
        this.currentTime(b.startTime);
      }, !0);
      q.videojs = q.videojs || {};
      q.videojs.Flash = q.videojs.Flash || {};
      q.videojs.Flash.onReady = a.onReady;
      q.videojs.Flash.onEvent = a.onEvent;
      q.videojs.Flash.onError = a.onError;
      d.on("seeked", function() {
        this.lastSeekTarget_ = void 0;
      });
      return d;
    }
    __extends(a, c);
    a.prototype.createEl = function() {
      var b = this.options_;
      b.swf || (b.swf = "//vjs.zencdn.net/swf/5.1.0/video-js.swf");
      var c = b.techId, f = A({readyFunction:"videojs.Flash.onReady", eventProxyFunction:"videojs.Flash.onEvent", errorEventProxyFunction:"videojs.Flash.onError", autoplay:b.autoplay, preload:b.preload, loop:b.loop, muted:b.muted}, b.flashVars), g = A({wmode:"opaque", bgcolor:"#000000"}, b.params), c = A({id:c, name:c, "class":"vjs-tech"}, b.attributes);
      this.el_ = a.embed(b.swf, f, g, c);
      this.el_.tech = this;
      return this.el_;
    };
    a.prototype.play = function() {
      this.ended() && this.setCurrentTime(0);
      this.el_.vjs_play();
    };
    a.prototype.pause = function() {
      this.el_.vjs_pause();
    };
    a.prototype.src = function(b) {
      return void 0 === b ? this.currentSrc() : this.setSrc(b);
    };
    a.prototype.setSrc = function(b) {
      var a = this;
      b = sd(b);
      this.el_.vjs_src(b);
      this.autoplay() && this.setTimeout(function() {
        return a.play();
      }, 0);
    };
    a.prototype.seeking = function() {
      return void 0 !== this.lastSeekTarget_;
    };
    a.prototype.setCurrentTime = function(b) {
      var a = this.seekable();
      a.length && (b = b > a.start(0) ? b : a.start(0), this.lastSeekTarget_ = b = b < a.end(a.length - 1) ? b : a.end(a.length - 1), this.trigger("seeking"), this.el_.vjs_setProperty("currentTime", b), c.prototype.setCurrentTime.call(this));
    };
    a.prototype.currentTime = function() {
      return this.seeking() ? this.lastSeekTarget_ || 0 : this.el_.vjs_getProperty("currentTime");
    };
    a.prototype.currentSrc = function() {
      return this.currentSource_ ? this.currentSource_.src : this.el_.vjs_getProperty("currentSrc");
    };
    a.prototype.duration = function() {
      if (0 === this.readyState()) {
        return NaN;
      }
      var b = this.el_.vjs_getProperty("duration");
      return 0 <= b ? b : Infinity;
    };
    a.prototype.load = function() {
      this.el_.vjs_load();
    };
    a.prototype.poster = function() {
      this.el_.vjs_getProperty("poster");
    };
    a.prototype.setPoster = function() {
    };
    a.prototype.seekable = function() {
      var b = this.duration();
      return 0 === b ? fa() : fa(0, b);
    };
    a.prototype.buffered = function() {
      var b = this.el_.vjs_getProperty("buffered");
      return 0 === b.length ? fa() : fa(b[0][0], b[0][1]);
    };
    a.prototype.supportsFullScreen = function() {
      return !1;
    };
    a.prototype.enterFullScreen = function() {
      return !1;
    };
    return a;
  }(I), Wb = G.prototype, vb = "rtmpConnection rtmpStream preload defaultPlaybackRate playbackRate autoplay loop mediaGroup controller controls volume muted defaultMuted".split(" "), yc = "networkState readyState initialTime startOffsetTime paused ended videoWidth videoHeight".split(" "), Q = 0;Q < vb.length;Q++) {
    Xb(vb[Q]), hd(vb[Q]);
  }
  for (Q = 0;Q < yc.length;Q++) {
    Xb(yc[Q]);
  }
  G.isSupported = function() {
    return 10 <= G.version()[0];
  };
  I.withSourceHandlers(G);
  G.nativeSourceHandler = {};
  G.nativeSourceHandler.canPlayType = function(c) {
    return c in G.formats ? "maybe" : "";
  };
  G.nativeSourceHandler.canHandleSource = function(c, a) {
    c = c.type ? c.type.replace(/;.*/, "").toLowerCase() : (c = rc(c.src)) ? "video/" + c : "";
    return G.nativeSourceHandler.canPlayType(c);
  };
  G.nativeSourceHandler.handleSource = function(c, a, b) {
    a.setSrc(c.src);
  };
  G.nativeSourceHandler.dispose = function() {
  };
  G.registerSourceHandler(G.nativeSourceHandler);
  G.formats = {"video/flv":"FLV", "video/x-flv":"FLV", "video/mp4":"MP4", "video/m4v":"MP4"};
  G.onReady = function(c) {
    (c = (c = na(c)) && c.tech) && c.el() && G.checkReady(c);
  };
  G.checkReady = function(c) {
    c.el() && (c.el().vjs_getProperty ? c.triggerReady() : this.setTimeout(function() {
      G.checkReady(c);
    }, 50));
  };
  G.onEvent = function(c, a) {
    var b = na(c).tech, d = Array.prototype.slice.call(arguments, 2);
    b.setTimeout(function() {
      b.trigger(a, d);
    }, 1);
  };
  G.onError = function(c, a) {
    c = na(c).tech;
    if ("srcnotfound" === a) {
      return c.error(4);
    }
    c.error("FLASH: " + a);
  };
  G.version = function() {
    var c = "0,0,0";
    try {
      c = (new q.ActiveXObject("ShockwaveFlash.ShockwaveFlash")).GetVariable("$version").replace(/\D+/g, ",").match(/^,?(.+),?$/)[1];
    } catch (a) {
      try {
        ub.mimeTypes["application/x-shockwave-flash"].enabledPlugin && (c = (ub.plugins["Shockwave Flash 2.0"] || ub.plugins["Shockwave Flash"]).description.replace(/\D+/g, ",").match(/^,?(.+),?$/)[1]);
      } catch (b) {
      }
    }
    return c.split(",");
  };
  G.embed = function(c, a, b, d) {
    c = G.getEmbedCode(c, a, b, d);
    return h("div", {innerHTML:c}).childNodes[0];
  };
  G.getEmbedCode = function(c, a, b, d) {
    var f = "", g = "", e = "";
    a && Object.getOwnPropertyNames(a).forEach(function(b) {
      f += b + "=" + a[b] + "&amp;";
    });
    b = A({movie:c, flashvars:f, allowScriptAccess:"always", allowNetworking:"all"}, b);
    Object.getOwnPropertyNames(b).forEach(function(a) {
      g += '<param name="' + a + '" value="' + b[a] + '" />';
    });
    d = A({data:c, width:"100%", height:"100%"}, d);
    Object.getOwnPropertyNames(d).forEach(function(b) {
      e += b + '="' + d[b] + '" ';
    });
    return '<object type="application/x-shockwave-flash" ' + e + ">" + g + "</object>";
  };
  (function(c) {
    c.streamingFormats = {"rtmp/mp4":"MP4", "rtmp/flv":"FLV"};
    c.streamFromParts = function(a, b) {
      return a + "&" + b;
    };
    c.streamToParts = function(a) {
      var b = {connection:"", stream:""};
      if (!a) {
        return b;
      }
      var c = a.search(/&(?!\w+=)/), f;
      -1 !== c ? f = c + 1 : (c = f = a.lastIndexOf("/") + 1, 0 === c && (c = f = a.length));
      b.connection = a.substring(0, c);
      b.stream = a.substring(f, a.length);
      return b;
    };
    c.isStreamingType = function(a) {
      return a in c.streamingFormats;
    };
    c.RTMP_RE = /^rtmp[set]?:\/\//i;
    c.isStreamingSrc = function(a) {
      return c.RTMP_RE.test(a);
    };
    c.rtmpSourceHandler = {};
    c.rtmpSourceHandler.canPlayType = function(a) {
      return c.isStreamingType(a) ? "maybe" : "";
    };
    c.rtmpSourceHandler.canHandleSource = function(a, b) {
      return (b = c.rtmpSourceHandler.canPlayType(a.type)) ? b : c.isStreamingSrc(a.src) ? "maybe" : "";
    };
    c.rtmpSourceHandler.handleSource = function(a, b, d) {
      a = c.streamToParts(a.src);
      b.setRtmpConnection(a.connection);
      b.setRtmpStream(a.stream);
    };
    c.registerSourceHandler(c.rtmpSourceHandler);
    return c;
  })(G);
  n.registerComponent("Flash", G);
  I.registerTech("Flash", G);
  var ya = function(c) {
    function a(b, a) {
      b = c.call(this, b, a) || this;
      b.emitTapEvents();
      b.enable();
      return b;
    }
    __extends(a, c);
    a.prototype.createEl = function(b, a, f) {
      void 0 === b && (b = "div");
      void 0 === a && (a = {});
      void 0 === f && (f = {});
      a = A({className:this.buildCSSClass(), tabIndex:0}, a);
      "button" === b && D.error("Creating a ClickableComponent with an HTML element of " + b + " is not supported; use a Button instead.");
      f = A({role:"button", "aria-live":"polite"}, f);
      this.tabIndex_ = a.tabIndex;
      b = c.prototype.createEl.call(this, b, a, f);
      this.createControlTextEl(b);
      return b;
    };
    a.prototype.createControlTextEl = function(b) {
      this.controlTextEl_ = h("span", {className:"vjs-control-text"});
      b && b.appendChild(this.controlTextEl_);
      this.controlText(this.controlText_, b);
      return this.controlTextEl_;
    };
    a.prototype.controlText = function(b, a) {
      void 0 === a && (a = this.el());
      if (!b) {
        return this.controlText_ || "Need Text";
      }
      var c = this.localize(b);
      this.controlText_ = b;
      this.controlTextEl_.innerHTML = c;
      a.setAttribute("title", c);
      return this;
    };
    a.prototype.buildCSSClass = function() {
      return "vjs-control vjs-button " + c.prototype.buildCSSClass.call(this);
    };
    a.prototype.enable = function() {
      this.removeClass("vjs-disabled");
      this.el_.setAttribute("aria-disabled", "false");
      "undefined" !== typeof this.tabIndex_ && this.el_.setAttribute("tabIndex", this.tabIndex_);
      this.on("tap", this.handleClick);
      this.on("click", this.handleClick);
      this.on("focus", this.handleFocus);
      this.on("blur", this.handleBlur);
      return this;
    };
    a.prototype.disable = function() {
      this.addClass("vjs-disabled");
      this.el_.setAttribute("aria-disabled", "true");
      "undefined" !== typeof this.tabIndex_ && this.el_.removeAttribute("tabIndex");
      this.off("tap", this.handleClick);
      this.off("click", this.handleClick);
      this.off("focus", this.handleFocus);
      this.off("blur", this.handleBlur);
      return this;
    };
    a.prototype.handleClick = function(b) {
    };
    a.prototype.handleFocus = function(b) {
      Y(w, "keydown", y(this, this.handleKeyPress));
    };
    a.prototype.handleKeyPress = function(b) {
      32 === b.which || 13 === b.which ? (b.preventDefault(), this.handleClick(b)) : c.prototype.handleKeyPress && c.prototype.handleKeyPress.call(this, b);
    };
    a.prototype.handleBlur = function(b) {
      ea(w, "keydown", y(this, this.handleKeyPress));
    };
    return a;
  }(n);
  n.registerComponent("ClickableComponent", ya);
  var Bd = function(c) {
    function a(b, a) {
      a = c.call(this, b, a) || this;
      a.update();
      b.on("posterchange", y(a, a.update));
      return a;
    }
    __extends(a, c);
    a.prototype.dispose = function() {
      this.player().off("posterchange", this.update);
      c.prototype.dispose.call(this);
    };
    a.prototype.createEl = function() {
      var b = h("div", {className:"vjs-poster", tabIndex:-1});
      jc || (this.fallbackImg_ = h("img"), b.appendChild(this.fallbackImg_));
      return b;
    };
    a.prototype.update = function(b) {
      b = this.player().poster();
      this.setSrc(b);
      b ? this.show() : this.hide();
    };
    a.prototype.setSrc = function(b) {
      if (this.fallbackImg_) {
        this.fallbackImg_.src = b;
      } else {
        var a = "";
        b && (a = 'url("' + b + '")');
        this.el_.style.backgroundImage = a;
      }
    };
    a.prototype.handleClick = function(b) {
      this.player_.paused() ? this.player_.play() : this.player_.pause();
    };
    return a;
  }(ya);
  n.registerComponent("PosterImage", Bd);
  var Cd = {monospace:"monospace", sansSerif:"sans-serif", serif:"serif", monospaceSansSerif:'"Andale Mono", "Lucida Console", monospace', monospaceSerif:'"Courier New", monospace', proportionalSansSerif:"sans-serif", proportionalSerif:"serif", casual:'"Comic Sans MS", Impact, fantasy', script:'"Monotype Corsiva", cursive', smallcaps:'"Andale Mono", "Lucida Console", monospace, sans-serif'}, Dd = function(c) {
    function a(b, a, f) {
      a = c.call(this, b, a, f) || this;
      b.on("loadstart", y(a, a.toggleDisplay));
      b.on("texttrackchange", y(a, a.updateDisplay));
      b.ready(y(a, function() {
        if (b.tech_ && b.tech_.featuresNativeTextTracks) {
          this.hide();
        } else {
          b.on("fullscreenchange", y(this, this.updateDisplay));
          for (var a = this.options_.playerOptions.tracks || [], c = 0;c < a.length;c++) {
            this.player_.addRemoteTextTrack(a[c]);
          }
          var a = {captions:1, subtitles:1}, d = this.player_.textTracks(), f, e;
          if (d) {
            for (c = 0;c < d.length;c++) {
              var h = d[c];
              h["default"] && ("descriptions" !== h.kind || f ? h.kind in a && !e && (e = h) : f = h);
            }
            e ? e.mode = "showing" : f && (f.mode = "showing");
          }
        }
      }));
      return a;
    }
    __extends(a, c);
    a.prototype.toggleDisplay = function() {
      this.player_.tech_ && this.player_.tech_.featuresNativeTextTracks ? this.hide() : this.show();
    };
    a.prototype.createEl = function() {
      return c.prototype.createEl.call(this, "div", {className:"vjs-text-track-display"}, {"aria-live":"off", "aria-atomic":"true"});
    };
    a.prototype.clearDisplay = function() {
      "function" === typeof q.WebVTT && q.WebVTT.processCues(q, [], this.el_);
    };
    a.prototype.updateDisplay = function() {
      var b = this.player_.textTracks();
      this.clearDisplay();
      if (b) {
        for (var a = null, c = null, g = b.length;g--;) {
          var e = b[g];
          "showing" === e.mode && ("descriptions" === e.kind ? a = e : c = e);
        }
        c ? ("off" !== this.getAttribute("aria-live") && this.setAttribute("aria-live", "off"), this.updateForTrack(c)) : a && ("assertive" !== this.getAttribute("aria-live") && this.setAttribute("aria-live", "assertive"), this.updateForTrack(a));
      }
    };
    a.prototype.updateForTrack = function(b) {
      if ("function" === typeof q.WebVTT && b.activeCues) {
        for (var a = this.player_.textTrackSettings.getValues(), c = [], g = 0;g < b.activeCues.length;g++) {
          c.push(b.activeCues[g]);
        }
        q.WebVTT.processCues(q, c, this.el_);
        for (b = c.length;b--;) {
          if (g = c[b]) {
            g = g.displayState;
            a.color && (g.firstChild.style.color = a.color);
            if (a.textOpacity) {
              var e = fb(a.color || "#fff", a.textOpacity);
              try {
                g.firstChild.style.color = e;
              } catch (Kb) {
              }
            }
            a.backgroundColor && (g.firstChild.style.backgroundColor = a.backgroundColor);
            if (a.backgroundOpacity) {
              e = fb(a.backgroundColor || "#000", a.backgroundOpacity);
              try {
                g.firstChild.style.backgroundColor = e;
              } catch (Kb) {
              }
            }
            if (a.windowColor) {
              if (a.windowOpacity) {
                e = fb(a.windowColor, a.windowOpacity);
                try {
                  g.style.backgroundColor = e;
                } catch (Kb) {
                }
              } else {
                g.style.backgroundColor = a.windowColor;
              }
            }
            a.edgeStyle && ("dropshadow" === a.edgeStyle ? g.firstChild.style.textShadow = "2px 2px 3px #222, 2px 2px 4px #222, 2px 2px 5px #222" : "raised" === a.edgeStyle ? g.firstChild.style.textShadow = "1px 1px #222, 2px 2px #222, 3px 3px #222" : "depressed" === a.edgeStyle ? g.firstChild.style.textShadow = "1px 1px #ccc, 0 1px #ccc, -1px -1px #222, 0 -1px #222" : "uniform" === a.edgeStyle && (g.firstChild.style.textShadow = "0 0 4px #222, 0 0 4px #222, 0 0 4px #222, 0 0 4px #222"));
            a.fontPercent && 1 !== a.fontPercent && (e = q.parseFloat(g.style.fontSize), g.style.fontSize = e * a.fontPercent + "px", g.style.height = "auto", g.style.top = "auto", g.style.bottom = "2px");
            a.fontFamily && "default" !== a.fontFamily && ("small-caps" === a.fontFamily ? g.firstChild.style.fontVariant = "small-caps" : g.firstChild.style.fontFamily = Cd[a.fontFamily]);
          }
        }
      }
    };
    return a;
  }(n);
  n.registerComponent("TextTrackDisplay", Dd);
  var Ed = function(c) {
    function a() {
      return c.apply(this, arguments) || this;
    }
    __extends(a, c);
    a.prototype.createEl = function() {
      return c.prototype.createEl.call(this, "div", {className:"vjs-loading-spinner", dir:"ltr"});
    };
    return a;
  }(n);
  n.registerComponent("LoadingSpinner", Ed);
  var za = function(c) {
    function a() {
      return c.apply(this, arguments) || this;
    }
    __extends(a, c);
    a.prototype.createEl = function(b, a, c) {
      void 0 === b && (b = "button");
      void 0 === a && (a = {});
      void 0 === c && (c = {});
      a = A({className:this.buildCSSClass()}, a);
      "button" !== b && (D.warn("Creating a Button with an HTML element of " + b + " is deprecated; use ClickableComponent instead."), a = A({tabIndex:0}, a), c = A({role:"button"}, c));
      c = A({type:"button", "aria-live":"polite"}, c);
      b = n.prototype.createEl.call(this, b, a, c);
      this.createControlTextEl(b);
      return b;
    };
    a.prototype.addChild = function(b, a) {
      void 0 === a && (a = {});
      D.warn("Adding an actionable (user controllable) child to a Button (" + this.constructor.name + ") is not supported; use a ClickableComponent instead.");
      return n.prototype.addChild.call(this, b, a);
    };
    a.prototype.enable = function() {
      c.prototype.enable.call(this);
      this.el_.removeAttribute("disabled");
    };
    a.prototype.disable = function() {
      c.prototype.disable.call(this);
      this.el_.setAttribute("disabled", "disabled");
    };
    a.prototype.handleKeyPress = function(b) {
      32 !== b.which && 13 !== b.which && c.prototype.handleKeyPress.call(this, b);
    };
    return a;
  }(ya);
  n.registerComponent("Button", za);
  var zc = function(c) {
    function a() {
      return c.apply(this, arguments) || this;
    }
    __extends(a, c);
    a.prototype.buildCSSClass = function() {
      return "vjs-big-play-button";
    };
    a.prototype.handleClick = function(b) {
      this.player_.play();
    };
    return a;
  }(za);
  zc.prototype.controlText_ = "Play Video";
  n.registerComponent("BigPlayButton", zc);
  var Fd = function(c) {
    function a(b, a) {
      b = c.call(this, b, a) || this;
      b.controlText(a && a.controlText || b.localize("Close"));
      return b;
    }
    __extends(a, c);
    a.prototype.buildCSSClass = function() {
      return "vjs-close-button " + c.prototype.buildCSSClass.call(this);
    };
    a.prototype.handleClick = function(b) {
      this.trigger({type:"close", bubbles:!1});
    };
    return a;
  }(za);
  n.registerComponent("CloseButton", Fd);
  var Ac = function(c) {
    function a(b, a) {
      a = c.call(this, b, a) || this;
      a.on(b, "play", a.handlePlay);
      a.on(b, "pause", a.handlePause);
      return a;
    }
    __extends(a, c);
    a.prototype.buildCSSClass = function() {
      return "vjs-play-control " + c.prototype.buildCSSClass.call(this);
    };
    a.prototype.handleClick = function(b) {
      this.player_.paused() ? this.player_.play() : this.player_.pause();
    };
    a.prototype.handlePlay = function(b) {
      this.removeClass("vjs-paused");
      this.addClass("vjs-playing");
      this.controlText("Pause");
    };
    a.prototype.handlePause = function(b) {
      this.removeClass("vjs-playing");
      this.addClass("vjs-paused");
      this.controlText("Play");
    };
    return a;
  }(za);
  Ac.prototype.controlText_ = "Play";
  n.registerComponent("PlayToggle", Ac);
  var Gd = function(c) {
    function a(b, a) {
      a = c.call(this, b, a) || this;
      a.on(b, "timeupdate", a.updateContent);
      return a;
    }
    __extends(a, c);
    a.prototype.createEl = function() {
      var b = c.prototype.createEl.call(this, "div", {className:"vjs-current-time vjs-time-control vjs-control"});
      this.contentEl_ = h("div", {className:"vjs-current-time-display", innerHTML:'<span class="vjs-control-text">Current Time </span>0:00'}, {"aria-live":"off"});
      b.appendChild(this.contentEl_);
      return b;
    };
    a.prototype.updateContent = function(b) {
      var a = this.player_.scrubbing() ? this.player_.getCache().currentTime : this.player_.currentTime();
      b = this.localize("Current Time");
      a = ja(a, this.player_.duration());
      a !== this.formattedTime_ && (this.formattedTime_ = a, this.contentEl_.innerHTML = '<span class="vjs-control-text">' + b + "</span> " + a);
    };
    return a;
  }(n);
  n.registerComponent("CurrentTimeDisplay", Gd);
  var Hd = function(c) {
    function a(b, a) {
      a = c.call(this, b, a) || this;
      a.on(b, "durationchange", a.updateContent);
      a.on(b, "timeupdate", a.updateContent);
      a.on(b, "loadedmetadata", a.updateContent);
      return a;
    }
    __extends(a, c);
    a.prototype.createEl = function() {
      var b = c.prototype.createEl.call(this, "div", {className:"vjs-duration vjs-time-control vjs-control"});
      this.contentEl_ = h("div", {className:"vjs-duration-display", innerHTML:'<span class="vjs-control-text">' + this.localize("Duration Time") + "</span> 0:00"}, {"aria-live":"off"});
      b.appendChild(this.contentEl_);
      return b;
    };
    a.prototype.updateContent = function(b) {
      var a = this.player_.duration();
      a && this.duration_ !== a && (this.duration_ = a, b = this.localize("Duration Time"), a = ja(a), this.contentEl_.innerHTML = '<span class="vjs-control-text">' + b + "</span> " + a);
    };
    return a;
  }(n);
  n.registerComponent("DurationDisplay", Hd);
  var Id = function(c) {
    function a() {
      return c.apply(this, arguments) || this;
    }
    __extends(a, c);
    a.prototype.createEl = function() {
      return c.prototype.createEl.call(this, "div", {className:"vjs-time-control vjs-time-divider", innerHTML:"<div><span>/</span></div>"});
    };
    return a;
  }(n);
  n.registerComponent("TimeDivider", Id);
  var Jd = function(c) {
    function a(b, a) {
      a = c.call(this, b, a) || this;
      a.on(b, "timeupdate", a.updateContent);
      a.on(b, "durationchange", a.updateContent);
      return a;
    }
    __extends(a, c);
    a.prototype.createEl = function() {
      var b = c.prototype.createEl.call(this, "div", {className:"vjs-remaining-time vjs-time-control vjs-control"});
      this.contentEl_ = h("div", {className:"vjs-remaining-time-display", innerHTML:'<span class="vjs-control-text">' + this.localize("Remaining Time") + "</span> -0:00"}, {"aria-live":"off"});
      b.appendChild(this.contentEl_);
      return b;
    };
    a.prototype.updateContent = function(b) {
      if (this.player_.duration()) {
        b = this.localize("Remaining Time");
        var a = ja(this.player_.remainingTime());
        a !== this.formattedTime_ && (this.formattedTime_ = a, this.contentEl_.innerHTML = '<span class="vjs-control-text">' + b + "</span> -" + a);
      }
    };
    return a;
  }(n);
  n.registerComponent("RemainingTimeDisplay", Jd);
  var Kd = function(c) {
    function a(b, a) {
      b = c.call(this, b, a) || this;
      b.updateShowing();
      b.on(b.player(), "durationchange", b.updateShowing);
      return b;
    }
    __extends(a, c);
    a.prototype.createEl = function() {
      var b = c.prototype.createEl.call(this, "div", {className:"vjs-live-control vjs-control"});
      this.contentEl_ = h("div", {className:"vjs-live-display", innerHTML:'<span class="vjs-control-text">' + this.localize("Stream Type") + "</span>" + this.localize("LIVE")}, {"aria-live":"off"});
      b.appendChild(this.contentEl_);
      return b;
    };
    a.prototype.updateShowing = function(b) {
      Infinity === this.player().duration() ? this.show() : this.hide();
    };
    return a;
  }(n);
  n.registerComponent("LiveDisplay", Kd);
  var wb = function(c) {
    function a(b, a) {
      a = c.call(this, b, a) || this;
      a.bar = a.getChild(a.options_.barName);
      a.vertical(!!a.options_.vertical);
      a.on("mousedown", a.handleMouseDown);
      a.on("touchstart", a.handleMouseDown);
      a.on("focus", a.handleFocus);
      a.on("blur", a.handleBlur);
      a.on("click", a.handleClick);
      a.on(b, "controlsvisible", a.update);
      a.on(b, a.playerEvent, a.update);
      return a;
    }
    __extends(a, c);
    a.prototype.createEl = function(b, a, f) {
      void 0 === a && (a = {});
      void 0 === f && (f = {});
      a.className += " vjs-slider";
      a = A({tabIndex:0}, a);
      f = A({role:"slider", "aria-valuenow":0, "aria-valuemin":0, "aria-valuemax":100, tabIndex:0}, f);
      return c.prototype.createEl.call(this, b, a, f);
    };
    a.prototype.handleMouseDown = function(b) {
      var a = this.bar.el_.ownerDocument;
      b.preventDefault();
      F();
      this.addClass("vjs-sliding");
      this.trigger("slideractive");
      this.on(a, "mousemove", this.handleMouseMove);
      this.on(a, "mouseup", this.handleMouseUp);
      this.on(a, "touchmove", this.handleMouseMove);
      this.on(a, "touchend", this.handleMouseUp);
      this.handleMouseMove(b);
    };
    a.prototype.handleMouseMove = function(b) {
    };
    a.prototype.handleMouseUp = function() {
      var b = this.bar.el_.ownerDocument;
      N();
      this.removeClass("vjs-sliding");
      this.trigger("sliderinactive");
      this.off(b, "mousemove", this.handleMouseMove);
      this.off(b, "mouseup", this.handleMouseUp);
      this.off(b, "touchmove", this.handleMouseMove);
      this.off(b, "touchend", this.handleMouseUp);
      this.update();
    };
    a.prototype.update = function() {
      if (this.el_) {
        var b = this.getPercent(), a = this.bar;
        if (a) {
          if ("number" !== typeof b || b !== b || 0 > b || Infinity === b) {
            b = 0;
          }
          b = (100 * b).toFixed(2) + "%";
          this.vertical() ? a.el().style.height = b : a.el().style.width = b;
        }
      }
    };
    a.prototype.calculateDistance = function(b) {
      b = Nb(this.el_, b);
      return this.vertical() ? b.y : b.x;
    };
    a.prototype.handleFocus = function() {
      this.on(this.bar.el_.ownerDocument, "keydown", this.handleKeyPress);
    };
    a.prototype.handleKeyPress = function(b) {
      if (37 === b.which || 40 === b.which) {
        b.preventDefault(), this.stepBack();
      } else {
        if (38 === b.which || 39 === b.which) {
          b.preventDefault(), this.stepForward();
        }
      }
    };
    a.prototype.handleBlur = function() {
      this.off(this.bar.el_.ownerDocument, "keydown", this.handleKeyPress);
    };
    a.prototype.handleClick = function(b) {
      b.stopImmediatePropagation();
      b.preventDefault();
    };
    a.prototype.vertical = function(b) {
      if (void 0 === b) {
        return this.vertical_ || !1;
      }
      (this.vertical_ = !!b) ? this.addClass("vjs-slider-vertical") : this.addClass("vjs-slider-horizontal");
      return this;
    };
    return a;
  }(n);
  n.registerComponent("Slider", wb);
  var Ld = function(c) {
    function a(b, a) {
      a = c.call(this, b, a) || this;
      a.partEls_ = [];
      a.on(b, "progress", a.update);
      return a;
    }
    __extends(a, c);
    a.prototype.createEl = function() {
      return c.prototype.createEl.call(this, "div", {className:"vjs-load-progress", innerHTML:'<span class="vjs-control-text"><span>' + this.localize("Loaded") + "</span>: 0%</span>"});
    };
    a.prototype.update = function(b) {
      b = this.player_.buffered();
      var a = this.player_.duration(), c = this.player_.bufferedEnd(), g = this.partEls_, e = function(b, a) {
        b = b / a || 0;
        return 100 * (1 <= b ? 1 : b) + "%";
      };
      this.el_.style.width = e(c, a);
      for (a = 0;a < b.length;a++) {
        var z = b.start(a), l = b.end(a), n = g[a];
        n || (n = this.el_.appendChild(h()), g[a] = n);
        n.style.left = e(z, c);
        n.style.width = e(l - z, c);
      }
      for (a = g.length;a > b.length;a--) {
        this.el_.removeChild(g[a - 1]);
      }
      g.length = b.length;
    };
    return a;
  }(n);
  n.registerComponent("LoadProgressBar", Ld);
  var Md = function(c) {
    function a(b, a) {
      var d = c.call(this, b, a) || this;
      d.updateDataAttr();
      d.on(b, "timeupdate", d.updateDataAttr);
      b.ready(y(d, d.updateDataAttr));
      a.playerOptions && a.playerOptions.controlBar && a.playerOptions.controlBar.progressControl && a.playerOptions.controlBar.progressControl.keepTooltipsInside && (d.keepTooltipsInside = a.playerOptions.controlBar.progressControl.keepTooltipsInside);
      d.keepTooltipsInside && d.addClass("vjs-keep-tooltips-inside");
      return d;
    }
    __extends(a, c);
    a.prototype.createEl = function() {
      return c.prototype.createEl.call(this, "div", {className:"vjs-play-progress vjs-slider-bar", innerHTML:'<span class="vjs-control-text"><span>' + this.localize("Progress") + "</span>: 0%</span>"});
    };
    a.prototype.updateDataAttr = function(b) {
      b = this.player_.scrubbing() ? this.player_.getCache().currentTime : this.player_.currentTime();
      this.el_.setAttribute("data-current-time", ja(b, this.player_.duration()));
    };
    return a;
  }(n);
  n.registerComponent("PlayProgressBar", Md);
  var Nd = function(c) {
    function a(b, a) {
      a = c.call(this, b, a) || this;
      a.updateDataAttr();
      a.on(b, "timeupdate", a.updateDataAttr);
      b.ready(y(a, a.updateDataAttr));
      return a;
    }
    __extends(a, c);
    a.prototype.createEl = function() {
      var b = c.prototype.createEl.call(this, "div", {className:"vjs-tooltip-progress-bar vjs-slider-bar", innerHTML:'<div class="vjs-time-tooltip"></div>\n        <span class="vjs-control-text"><span>' + this.localize("Progress") + "</span>: 0%</span>"});
      this.tooltip = b.querySelector(".vjs-time-tooltip");
      return b;
    };
    a.prototype.updateDataAttr = function(b) {
      b = this.player_.scrubbing() ? this.player_.getCache().currentTime : this.player_.currentTime();
      b = ja(b, this.player_.duration());
      this.el_.setAttribute("data-current-time", b);
      this.tooltip.innerHTML = b;
    };
    return a;
  }(n);
  n.registerComponent("TooltipProgressBar", Nd);
  var xb = function(c) {
    function a(b, a) {
      var d = c.call(this, b, a) || this;
      d.on(b, "timeupdate", d.updateProgress);
      d.on(b, "ended", d.updateProgress);
      b.ready(y(d, d.updateProgress));
      a.playerOptions && a.playerOptions.controlBar && a.playerOptions.controlBar.progressControl && a.playerOptions.controlBar.progressControl.keepTooltipsInside && (d.keepTooltipsInside = a.playerOptions.controlBar.progressControl.keepTooltipsInside);
      d.keepTooltipsInside && (d.tooltipProgressBar = d.addChild("TooltipProgressBar"));
      return d;
    }
    __extends(a, c);
    a.prototype.createEl = function() {
      return c.prototype.createEl.call(this, "div", {className:"vjs-progress-holder"}, {"aria-label":"progress bar"});
    };
    a.prototype.updateProgress = function(b) {
      this.updateAriaAttributes(this.el_);
      if (this.keepTooltipsInside) {
        this.updateAriaAttributes(this.tooltipProgressBar.el_);
        this.tooltipProgressBar.el_.style.width = this.bar.el_.style.width;
        b = parseFloat(ta(this.player().el(), "width"));
        var a = parseFloat(ta(this.tooltipProgressBar.tooltip, "width")), c = this.tooltipProgressBar.el().style;
        c.maxWidth = Math.floor(b - a / 2) + "px";
        c.minWidth = Math.ceil(a / 2) + "px";
        c.right = "-" + a / 2 + "px";
      }
    };
    a.prototype.updateAriaAttributes = function(b) {
      var a = this.player_.scrubbing() ? this.player_.getCache().currentTime : this.player_.currentTime();
      b.setAttribute("aria-valuenow", (100 * this.getPercent()).toFixed(2));
      b.setAttribute("aria-valuetext", ja(a, this.player_.duration()));
    };
    a.prototype.getPercent = function() {
      var b = this.player_.currentTime() / this.player_.duration();
      return 1 <= b ? 1 : b;
    };
    a.prototype.handleMouseDown = function(b) {
      c.prototype.handleMouseDown.call(this, b);
      this.player_.scrubbing(!0);
      this.videoWasPlaying = !this.player_.paused();
      this.player_.pause();
    };
    a.prototype.handleMouseMove = function(b) {
      b = this.calculateDistance(b) * this.player_.duration();
      b === this.player_.duration() && (b -= .1);
      this.player_.currentTime(b);
    };
    a.prototype.handleMouseUp = function(b) {
      c.prototype.handleMouseUp.call(this, b);
      this.player_.scrubbing(!1);
      this.videoWasPlaying && this.player_.play();
    };
    a.prototype.stepForward = function() {
      this.player_.currentTime(this.player_.currentTime() + 5);
    };
    a.prototype.stepBack = function() {
      this.player_.currentTime(this.player_.currentTime() - 5);
    };
    return a;
  }(wb);
  xb.prototype.options_ = {children:["loadProgressBar", "mouseTimeDisplay", "playProgressBar"], barName:"playProgressBar"};
  xb.prototype.playerEvent = "timeupdate";
  n.registerComponent("SeekBar", xb);
  var Od = function(c) {
    function a(b, a) {
      var d = c.call(this, b, a) || this;
      a.playerOptions && a.playerOptions.controlBar && a.playerOptions.controlBar.progressControl && a.playerOptions.controlBar.progressControl.keepTooltipsInside && (d.keepTooltipsInside = a.playerOptions.controlBar.progressControl.keepTooltipsInside);
      d.keepTooltipsInside && (d.tooltip = h("div", {className:"vjs-time-tooltip"}), d.el().appendChild(d.tooltip), d.addClass("vjs-keep-tooltips-inside"));
      d.update(0, 0);
      b.on("ready", function() {
        d.on(b.controlBar.progressControl.el(), "mousemove", nd(y(d, d.handleMouseMove), 25));
      });
      return d;
    }
    __extends(a, c);
    a.prototype.createEl = function() {
      return c.prototype.createEl.call(this, "div", {className:"vjs-mouse-display"});
    };
    a.prototype.handleMouseMove = function(b) {
      var a = this.player_.duration(), a = this.calculateDistance(b) * a;
      b = b.pageX - L(this.el().parentNode).left;
      this.update(a, b);
    };
    a.prototype.update = function(b, a) {
      b = ja(b, this.player_.duration());
      this.el().style.left = a + "px";
      this.el().setAttribute("data-current-time", b);
      if (this.keepTooltipsInside) {
        var c = this.clampPosition_(a);
        a = a - c + 1;
        c = parseFloat(ta(this.tooltip, "width"));
        this.tooltip.innerHTML = b;
        this.tooltip.style.right = "-" + (c / 2 - a) + "px";
      }
    };
    a.prototype.calculateDistance = function(b) {
      return Nb(this.el().parentNode, b).x;
    };
    a.prototype.clampPosition_ = function(b) {
      if (!this.keepTooltipsInside) {
        return b;
      }
      var a = parseFloat(ta(this.player().el(), "width")), c = parseFloat(ta(this.tooltip, "width")) / 2, g = b;
      b < c ? g = Math.ceil(c) : b > a - c && (g = Math.floor(a - c));
      return g;
    };
    return a;
  }(n);
  n.registerComponent("MouseTimeDisplay", Od);
  var Bc = function(c) {
    function a() {
      return c.apply(this, arguments) || this;
    }
    __extends(a, c);
    a.prototype.createEl = function() {
      return c.prototype.createEl.call(this, "div", {className:"vjs-progress-control vjs-control"});
    };
    return a;
  }(n);
  Bc.prototype.options_ = {children:["seekBar"]};
  n.registerComponent("ProgressControl", Bc);
  var Cc = function(c) {
    function a(b, a) {
      a = c.call(this, b, a) || this;
      a.on(b, "fullscreenchange", a.handleFullscreenChange);
      return a;
    }
    __extends(a, c);
    a.prototype.buildCSSClass = function() {
      return "vjs-fullscreen-control " + c.prototype.buildCSSClass.call(this);
    };
    a.prototype.handleFullscreenChange = function(b) {
      this.player_.isFullscreen() ? this.controlText("Non-Fullscreen") : this.controlText("Fullscreen");
    };
    a.prototype.handleClick = function(b) {
      this.player_.isFullscreen() ? this.player_.exitFullscreen() : this.player_.requestFullscreen();
    };
    return a;
  }(za);
  Cc.prototype.controlText_ = "Fullscreen";
  n.registerComponent("FullscreenToggle", Cc);
  var Pd = function(c) {
    function a() {
      return c.apply(this, arguments) || this;
    }
    __extends(a, c);
    a.prototype.createEl = function() {
      return c.prototype.createEl.call(this, "div", {className:"vjs-volume-level", innerHTML:'<span class="vjs-control-text"></span>'});
    };
    return a;
  }(n);
  n.registerComponent("VolumeLevel", Pd);
  var Ta = function(c) {
    function a(b, a) {
      a = c.call(this, b, a) || this;
      a.on(b, "volumechange", a.updateARIAAttributes);
      b.ready(y(a, a.updateARIAAttributes));
      return a;
    }
    __extends(a, c);
    a.prototype.createEl = function() {
      return c.prototype.createEl.call(this, "div", {className:"vjs-volume-bar vjs-slider-bar"}, {"aria-label":"volume level"});
    };
    a.prototype.handleMouseMove = function(b) {
      this.checkMuted();
      this.player_.volume(this.calculateDistance(b));
    };
    a.prototype.checkMuted = function() {
      this.player_.muted() && this.player_.muted(!1);
    };
    a.prototype.getPercent = function() {
      return this.player_.muted() ? 0 : this.player_.volume();
    };
    a.prototype.stepForward = function() {
      this.checkMuted();
      this.player_.volume(this.player_.volume() + .1);
    };
    a.prototype.stepBack = function() {
      this.checkMuted();
      this.player_.volume(this.player_.volume() - .1);
    };
    a.prototype.updateARIAAttributes = function(b) {
      b = (100 * this.player_.volume()).toFixed(2);
      this.el_.setAttribute("aria-valuenow", b);
      this.el_.setAttribute("aria-valuetext", b + "%");
    };
    return a;
  }(wb);
  Ta.prototype.options_ = {children:["volumeLevel"], barName:"volumeLevel"};
  Ta.prototype.playerEvent = "volumechange";
  n.registerComponent("VolumeBar", Ta);
  var Dc = function(c) {
    function a(b, a) {
      a = c.call(this, b, a) || this;
      b.tech_ && !1 === b.tech_.featuresVolumeControl && a.addClass("vjs-hidden");
      a.on(b, "loadstart", function() {
        !1 === b.tech_.featuresVolumeControl ? this.addClass("vjs-hidden") : this.removeClass("vjs-hidden");
      });
      return a;
    }
    __extends(a, c);
    a.prototype.createEl = function() {
      return c.prototype.createEl.call(this, "div", {className:"vjs-volume-control vjs-control"});
    };
    return a;
  }(n);
  Dc.prototype.options_ = {children:["volumeBar"]};
  n.registerComponent("VolumeControl", Dc);
  var Ec = function(c) {
    function a() {
      return c.apply(this, arguments) || this;
    }
    __extends(a, c);
    a.prototype.addItem = function(b) {
      this.addChild(b);
      b.on("click", y(this, function() {
        this.unlockShowing();
      }));
    };
    a.prototype.createEl = function() {
      this.contentEl_ = h(this.options_.contentElType || "ul", {className:"vjs-menu-content"});
      var b = c.prototype.createEl.call(this, "div", {append:this.contentEl_, className:"vjs-menu"});
      b.appendChild(this.contentEl_);
      Y(b, "click", function(b) {
        b.preventDefault();
        b.stopImmediatePropagation();
      });
      return b;
    };
    return a;
  }(n);
  n.registerComponent("Popup", Ec);
  var Fc = function(c) {
    function a(b, a) {
      void 0 === a && (a = {});
      b = c.call(this, b, a) || this;
      b.update();
      return b;
    }
    __extends(a, c);
    a.prototype.update = function() {
      var b = this.createPopup();
      this.popup && this.removeChild(this.popup);
      this.popup = b;
      this.addChild(b);
      this.items && 0 === this.items.length ? this.hide() : this.items && 1 < this.items.length && this.show();
    };
    a.prototype.createPopup = function() {
    };
    a.prototype.createEl = function() {
      return c.prototype.createEl.call(this, "div", {className:this.buildCSSClass()});
    };
    a.prototype.buildCSSClass = function() {
      var b = "vjs-menu-button", b = !0 === this.options_.inline ? b + "-inline" : b + "-popup";
      return "vjs-menu-button " + b + " " + c.prototype.buildCSSClass.call(this);
    };
    return a;
  }(ya);
  n.registerComponent("PopupButton", Fc);
  var Ua = function(c) {
    function a(b, a) {
      a = c.call(this, b, a) || this;
      a.on(b, "volumechange", a.update);
      b.tech_ && !1 === b.tech_.featuresVolumeControl && a.addClass("vjs-hidden");
      a.on(b, "loadstart", function() {
        this.update();
        !1 === b.tech_.featuresVolumeControl ? this.addClass("vjs-hidden") : this.removeClass("vjs-hidden");
      });
      return a;
    }
    __extends(a, c);
    a.prototype.buildCSSClass = function() {
      return "vjs-mute-control " + c.prototype.buildCSSClass.call(this);
    };
    a.prototype.handleClick = function(b) {
      this.player_.muted(this.player_.muted() ? !1 : !0);
    };
    a.prototype.update = function(b) {
      var a = this.player_.volume();
      b = 3;
      0 === a || this.player_.muted() ? b = 0 : .33 > a ? b = 1 : .67 > a && (b = 2);
      a = this.player_.muted() ? "Unmute" : "Mute";
      this.controlText() !== a && this.controlText(a);
      for (a = 0;4 > a;a++) {
        Ca(this.el_, "vjs-vol-" + a);
      }
      H(this.el_, "vjs-vol-" + b);
    };
    return a;
  }(za);
  Ua.prototype.controlText_ = "Mute";
  n.registerComponent("MuteToggle", Ua);
  var yb = function(c) {
    function a(b, a) {
      function d() {
        b.tech_ && !1 === b.tech_.featuresVolumeControl ? this.addClass("vjs-hidden") : this.removeClass("vjs-hidden");
      }
      void 0 === a && (a = {});
      void 0 === a.inline && (a.inline = !0);
      void 0 === a.vertical && (a.vertical = a.inline ? !1 : !0);
      a.volumeBar = a.volumeBar || {};
      a.volumeBar.vertical = !!a.vertical;
      a = c.call(this, b, a) || this;
      a.on(b, "volumechange", a.volumeUpdate);
      a.on(b, "loadstart", a.volumeUpdate);
      d.call(a);
      a.on(b, "loadstart", d);
      a.on(a.volumeBar, ["slideractive", "focus"], function() {
        this.addClass("vjs-slider-active");
      });
      a.on(a.volumeBar, ["sliderinactive", "blur"], function() {
        this.removeClass("vjs-slider-active");
      });
      a.on(a.volumeBar, ["focus"], function() {
        this.addClass("vjs-lock-showing");
      });
      a.on(a.volumeBar, ["blur"], function() {
        this.removeClass("vjs-lock-showing");
      });
      return a;
    }
    __extends(a, c);
    a.prototype.buildCSSClass = function() {
      var b;
      b = this.options_.vertical ? "vjs-volume-menu-button-vertical" : "vjs-volume-menu-button-horizontal";
      return "vjs-volume-menu-button " + c.prototype.buildCSSClass.call(this) + " " + b;
    };
    a.prototype.createPopup = function() {
      var b = new Ec(this.player_, {contentElType:"div"}), a = new Ta(this.player_, this.options_.volumeBar);
      b.addChild(a);
      this.menuContent = b;
      this.volumeBar = a;
      this.attachVolumeBarEvents();
      return b;
    };
    a.prototype.handleClick = function(b) {
      Ua.prototype.handleClick.call(this);
      c.prototype.handleClick.call(this);
    };
    a.prototype.attachVolumeBarEvents = function() {
      this.menuContent.on(["mousedown", "touchdown"], y(this, this.handleMouseDown));
    };
    a.prototype.handleMouseDown = function(b) {
      this.on(["mousemove", "touchmove"], y(this.volumeBar, this.volumeBar.handleMouseMove));
      this.on(this.el_.ownerDocument, ["mouseup", "touchend"], this.handleMouseUp);
    };
    a.prototype.handleMouseUp = function(b) {
      this.off(["mousemove", "touchmove"], y(this.volumeBar, this.volumeBar.handleMouseMove));
    };
    return a;
  }(Fc);
  yb.prototype.volumeUpdate = Ua.prototype.update;
  yb.prototype.controlText_ = "Mute";
  n.registerComponent("VolumeMenuButton", yb);
  var zb = function(c) {
    function a(b, a) {
      b = c.call(this, b, a) || this;
      b.focusedChild_ = -1;
      b.on("keydown", b.handleKeyPress);
      return b;
    }
    __extends(a, c);
    a.prototype.addItem = function(b) {
      this.addChild(b);
      b.on("click", y(this, function(b) {
        this.unlockShowing();
      }));
    };
    a.prototype.createEl = function() {
      this.contentEl_ = h(this.options_.contentElType || "ul", {className:"vjs-menu-content"});
      this.contentEl_.setAttribute("role", "menu");
      var b = c.prototype.createEl.call(this, "div", {append:this.contentEl_, className:"vjs-menu"});
      b.setAttribute("role", "presentation");
      b.appendChild(this.contentEl_);
      Y(b, "click", function(b) {
        b.preventDefault();
        b.stopImmediatePropagation();
      });
      return b;
    };
    a.prototype.handleKeyPress = function(b) {
      if (37 === b.which || 40 === b.which) {
        b.preventDefault(), this.stepForward();
      } else {
        if (38 === b.which || 39 === b.which) {
          b.preventDefault(), this.stepBack();
        }
      }
    };
    a.prototype.stepForward = function() {
      var b = 0;
      void 0 !== this.focusedChild_ && (b = this.focusedChild_ + 1);
      this.focus(b);
    };
    a.prototype.stepBack = function() {
      var b = 0;
      void 0 !== this.focusedChild_ && (b = this.focusedChild_ - 1);
      this.focus(b);
    };
    a.prototype.focus = function(b) {
      void 0 === b && (b = 0);
      var a = this.children().slice();
      a.length && a[0].className && /vjs-menu-title/.test(a[0].className) && a.shift();
      0 < a.length && (0 > b ? b = 0 : b >= a.length && (b = a.length - 1), this.focusedChild_ = b, a[b].el_.focus());
    };
    return a;
  }(n);
  n.registerComponent("Menu", zb);
  var Ab = function(c) {
    function a(b, a) {
      void 0 === a && (a = {});
      b = c.call(this, b, a) || this;
      b.update();
      b.enabled_ = !0;
      b.el_.setAttribute("aria-haspopup", "true");
      b.el_.setAttribute("role", "menuitem");
      b.on("keydown", b.handleSubmenuKeyPress);
      return b;
    }
    __extends(a, c);
    a.prototype.update = function() {
      var b = this.createMenu();
      this.menu && this.removeChild(this.menu);
      this.menu = b;
      this.addChild(b);
      this.buttonPressed_ = !1;
      this.el_.setAttribute("aria-expanded", "false");
      this.items && 0 === this.items.length ? this.hide() : this.items && 1 < this.items.length && this.show();
    };
    a.prototype.createMenu = function() {
      var b = new zb(this.player_);
      if (this.options_.title) {
        var a = h("li", {className:"vjs-menu-title", innerHTML:O(this.options_.title), tabIndex:-1});
        b.children_.unshift(a);
        sa(a, b.contentEl());
      }
      if (this.items = this.createItems()) {
        for (a = 0;a < this.items.length;a++) {
          b.addItem(this.items[a]);
        }
      }
      return b;
    };
    a.prototype.createItems = function() {
    };
    a.prototype.createEl = function() {
      return c.prototype.createEl.call(this, "div", {className:this.buildCSSClass()});
    };
    a.prototype.buildCSSClass = function() {
      var b = "vjs-menu-button", b = !0 === this.options_.inline ? b + "-inline" : b + "-popup";
      return "vjs-menu-button " + b + " " + c.prototype.buildCSSClass.call(this);
    };
    a.prototype.handleClick = function(b) {
      this.one(this.menu.contentEl(), "mouseleave", y(this, function(b) {
        this.unpressButton();
        this.el_.blur();
      }));
      this.buttonPressed_ ? this.unpressButton() : this.pressButton();
    };
    a.prototype.handleKeyPress = function(b) {
      27 === b.which || 9 === b.which ? (this.buttonPressed_ && this.unpressButton(), 9 !== b.which && b.preventDefault()) : 38 === b.which || 40 === b.which ? this.buttonPressed_ || (this.pressButton(), b.preventDefault()) : c.prototype.handleKeyPress.call(this, b);
    };
    a.prototype.handleSubmenuKeyPress = function(b) {
      if (27 === b.which || 9 === b.which) {
        this.buttonPressed_ && this.unpressButton(), 9 !== b.which && b.preventDefault();
      }
    };
    a.prototype.pressButton = function() {
      this.enabled_ && (this.buttonPressed_ = !0, this.menu.lockShowing(), this.el_.setAttribute("aria-expanded", "true"), this.menu.focus());
    };
    a.prototype.unpressButton = function() {
      this.enabled_ && (this.buttonPressed_ = !1, this.menu.unlockShowing(), this.el_.setAttribute("aria-expanded", "false"), this.el_.focus());
    };
    a.prototype.disable = function() {
      this.buttonPressed_ = !1;
      this.menu.unlockShowing();
      this.el_.setAttribute("aria-expanded", "false");
      this.enabled_ = !1;
      return c.prototype.disable.call(this);
    };
    a.prototype.enable = function() {
      this.enabled_ = !0;
      return c.prototype.enable.call(this);
    };
    return a;
  }(ya);
  n.registerComponent("MenuButton", Ab);
  var Bb = function(c) {
    function a(b, a) {
      var d = a.tracks;
      b = c.call(this, b, a) || this;
      1 >= b.items.length && b.hide();
      if (d) {
        var g = y(b, b.update);
        d.addEventListener("removetrack", g);
        d.addEventListener("addtrack", g);
        b.player_.on("dispose", function() {
          d.removeEventListener("removetrack", g);
          d.removeEventListener("addtrack", g);
        });
        return b;
      }
    }
    __extends(a, c);
    return a;
  }(Ab);
  n.registerComponent("TrackButton", Bb);
  var Ga = function(c) {
    function a(b, a) {
      b = c.call(this, b, a) || this;
      b.selectable = a.selectable;
      b.selected(a.selected);
      b.selectable ? b.el_.setAttribute("role", "menuitemcheckbox") : b.el_.setAttribute("role", "menuitem");
      return b;
    }
    __extends(a, c);
    a.prototype.createEl = function(b, a, f) {
      return c.prototype.createEl.call(this, "li", A({className:"vjs-menu-item", innerHTML:this.localize(this.options_.label), tabIndex:-1}, a), f);
    };
    a.prototype.handleClick = function(b) {
      this.selected(!0);
    };
    a.prototype.selected = function(b) {
      this.selectable && (b ? (this.addClass("vjs-selected"), this.el_.setAttribute("aria-checked", "true"), this.controlText(", selected")) : (this.removeClass("vjs-selected"), this.el_.setAttribute("aria-checked", "false"), this.controlText(" ")));
    };
    return a;
  }(ya);
  n.registerComponent("MenuItem", Ga);
  var Va = function(c) {
    function a(b, a) {
      var d = a.track, g = b.textTracks();
      a.label = d.label || d.language || "Unknown";
      a.selected = d["default"] || "showing" === d.mode;
      b = c.call(this, b, a) || this;
      b.track = d;
      if (g) {
        var e = y(b, b.handleTracksChange);
        g.addEventListener("change", e);
        b.on("dispose", function() {
          g.removeEventListener("change", e);
        });
      }
      if (g && void 0 === g.onchange) {
        var h;
        b.on(["tap", "click"], function() {
          if ("object" !== typeof q.Event) {
            try {
              h = new q.Event("change");
            } catch (Rb) {
            }
          }
          h || (h = w.createEvent("Event"), h.initEvent("change", !0, !0));
          g.dispatchEvent(h);
        });
      }
      return b;
    }
    __extends(a, c);
    a.prototype.handleClick = function(b) {
      var a = this.track.kind, f = this.player_.textTracks();
      c.prototype.handleClick.call(this, b);
      if (f) {
        for (b = 0;b < f.length;b++) {
          var g = f[b];
          g.kind === a && (g.mode = g === this.track ? "showing" : "disabled");
        }
      }
    };
    a.prototype.handleTracksChange = function(b) {
      this.selected("showing" === this.track.mode);
    };
    return a;
  }(Ga);
  n.registerComponent("TextTrackMenuItem", Va);
  var Gc = function(c) {
    function a(b, a) {
      a.track = {player:b, kind:a.kind, label:a.kind + " off", "default":!1, mode:"disabled"};
      a.selectable = !0;
      b = c.call(this, b, a) || this;
      b.selected(!0);
      return b;
    }
    __extends(a, c);
    a.prototype.handleTracksChange = function(b) {
      b = this.player().textTracks();
      for (var a = !0, c = 0, g = b.length;c < g;c++) {
        var e = b[c];
        if (e.kind === this.track.kind && "showing" === e.mode) {
          a = !1;
          break;
        }
      }
      this.selected(a);
    };
    return a;
  }(Va);
  n.registerComponent("OffTextTrackMenuItem", Gc);
  var Ha = function(c) {
    function a(b, a) {
      void 0 === a && (a = {});
      a.tracks = b.textTracks();
      return c.call(this, b, a) || this;
    }
    __extends(a, c);
    a.prototype.createItems = function(b) {
      void 0 === b && (b = []);
      b.push(new Gc(this.player_, {kind:this.kind_}));
      var a = this.player_.textTracks();
      if (!a) {
        return b;
      }
      for (var c = 0;c < a.length;c++) {
        var g = a[c];
        g.kind === this.kind_ && b.push(new Va(this.player_, {track:g, selectable:!0}));
      }
      return b;
    };
    return a;
  }(Bb);
  n.registerComponent("TextTrackButton", Ha);
  var Hc = function(c) {
    function a(b, a) {
      var d = a.track, g = a.cue, e = b.currentTime();
      a.selectable = !0;
      a.label = g.text;
      a.selected = g.startTime <= e && e < g.endTime;
      b = c.call(this, b, a) || this;
      b.track = d;
      b.cue = g;
      d.addEventListener("cuechange", y(b, b.update));
      return b;
    }
    __extends(a, c);
    a.prototype.handleClick = function(a) {
      c.prototype.handleClick.call(this);
      this.player_.currentTime(this.cue.startTime);
      this.update(this.cue.startTime);
    };
    a.prototype.update = function(a) {
      a = this.cue;
      var b = this.player_.currentTime();
      this.selected(a.startTime <= b && b < a.endTime);
    };
    return a;
  }(Ga);
  n.registerComponent("ChaptersTrackMenuItem", Hc);
  var Cb = function(c) {
    function a(a, d, f) {
      a = c.call(this, a, d, f) || this;
      a.el_.setAttribute("aria-label", "Chapters Menu");
      return a;
    }
    __extends(a, c);
    a.prototype.buildCSSClass = function() {
      return "vjs-chapters-button " + c.prototype.buildCSSClass.call(this);
    };
    a.prototype.update = function(a) {
      this.track_ && (!a || "addtrack" !== a.type && "removetrack" !== a.type) || this.setTrack(this.findChaptersTrack());
      c.prototype.update.call(this);
    };
    a.prototype.setTrack = function(a) {
      if (this.track_ !== a) {
        this.updateHandler_ || (this.updateHandler_ = this.update.bind(this));
        if (this.track_) {
          var b = this.player_.remoteTextTrackEls().getTrackElementByTrack_(this.track_);
          b && b.removeEventListener("load", this.updateHandler_);
          this.track_ = null;
        }
        if (this.track_ = a) {
          this.track_.mode = "hidden", (b = this.player_.remoteTextTrackEls().getTrackElementByTrack_(this.track_)) && b.addEventListener("load", this.updateHandler_);
        }
      }
    };
    a.prototype.findChaptersTrack = function() {
      for (var a = this.player_.textTracks() || [], c = a.length - 1;0 <= c;c--) {
        var f = a[c];
        if (f.kind === this.kind_) {
          return f;
        }
      }
    };
    a.prototype.getMenuCaption = function() {
      return this.track_ && this.track_.label ? this.track_.label : this.localize(O(this.kind_));
    };
    a.prototype.createMenu = function() {
      this.options_.title = this.getMenuCaption();
      return c.prototype.createMenu.call(this);
    };
    a.prototype.createItems = function() {
      var a = [];
      if (!this.track_) {
        return a;
      }
      var c = this.track_.cues;
      if (!c) {
        return a;
      }
      for (var f = 0, g = c.length;f < g;f++) {
        var e = new Hc(this.player_, {track:this.track_, cue:c[f]});
        a.push(e);
      }
      return a;
    };
    return a;
  }(Ha);
  Cb.prototype.kind_ = "chapters";
  Cb.prototype.controlText_ = "Chapters";
  n.registerComponent("ChaptersButton", Cb);
  var Db = function(c) {
    function a(a, d, f) {
      d = c.call(this, a, d, f) || this;
      d.el_.setAttribute("aria-label", "Descriptions Menu");
      var b = a.textTracks();
      if (b) {
        var e = y(d, d.handleTracksChange);
        b.addEventListener("change", e);
        d.on("dispose", function() {
          b.removeEventListener("change", e);
        });
      }
      return d;
    }
    __extends(a, c);
    a.prototype.handleTracksChange = function(a) {
      a = this.player().textTracks();
      for (var b = !1, c = 0, g = a.length;c < g;c++) {
        var e = a[c];
        if (e.kind !== this.kind_ && "showing" === e.mode) {
          b = !0;
          break;
        }
      }
      b ? this.disable() : this.enable();
    };
    a.prototype.buildCSSClass = function() {
      return "vjs-descriptions-button " + c.prototype.buildCSSClass.call(this);
    };
    return a;
  }(Ha);
  Db.prototype.kind_ = "descriptions";
  Db.prototype.controlText_ = "Descriptions";
  n.registerComponent("DescriptionsButton", Db);
  var Eb = function(c) {
    function a(a, d, f) {
      a = c.call(this, a, d, f) || this;
      a.el_.setAttribute("aria-label", "Subtitles Menu");
      return a;
    }
    __extends(a, c);
    a.prototype.buildCSSClass = function() {
      return "vjs-subtitles-button " + c.prototype.buildCSSClass.call(this);
    };
    return a;
  }(Ha);
  Eb.prototype.kind_ = "subtitles";
  Eb.prototype.controlText_ = "Subtitles";
  n.registerComponent("SubtitlesButton", Eb);
  var Ic = function(c) {
    function a(a, d) {
      d.track = {player:a, kind:d.kind, label:d.kind + " settings", selectable:!1, "default":!1, mode:"disabled"};
      d.selectable = !1;
      a = c.call(this, a, d) || this;
      a.addClass("vjs-texttrack-settings");
      a.controlText(", opens " + d.kind + " settings dialog");
      return a;
    }
    __extends(a, c);
    a.prototype.handleClick = function(a) {
      this.player().getChild("textTrackSettings").show();
      this.player().getChild("textTrackSettings").el_.focus();
    };
    return a;
  }(Va);
  n.registerComponent("CaptionSettingsMenuItem", Ic);
  var Fb = function(c) {
    function a(a, d, f) {
      a = c.call(this, a, d, f) || this;
      a.el_.setAttribute("aria-label", "Captions Menu");
      return a;
    }
    __extends(a, c);
    a.prototype.buildCSSClass = function() {
      return "vjs-captions-button " + c.prototype.buildCSSClass.call(this);
    };
    a.prototype.update = function(a) {
      a = 2;
      c.prototype.update.call(this);
      this.player().tech_ && this.player().tech_.featuresNativeTextTracks && (a = 1);
      this.items && this.items.length > a ? this.show() : this.hide();
    };
    a.prototype.createItems = function() {
      var a = [];
      this.player().tech_ && this.player().tech_.featuresNativeTextTracks || a.push(new Ic(this.player_, {kind:this.kind_}));
      return c.prototype.createItems.call(this, a);
    };
    return a;
  }(Ha);
  Fb.prototype.kind_ = "captions";
  Fb.prototype.controlText_ = "Captions";
  n.registerComponent("CaptionsButton", Fb);
  var Jc = function(c) {
    function a(a, d) {
      var b = d.track, g = a.audioTracks();
      d.label = b.label || b.language || "Unknown";
      d.selected = b.enabled;
      a = c.call(this, a, d) || this;
      a.track = b;
      if (g) {
        var e = y(a, a.handleTracksChange);
        g.addEventListener("change", e);
        a.on("dispose", function() {
          g.removeEventListener("change", e);
        });
      }
      return a;
    }
    __extends(a, c);
    a.prototype.handleClick = function(a) {
      var b = this.player_.audioTracks();
      c.prototype.handleClick.call(this, a);
      if (b) {
        for (a = 0;a < b.length;a++) {
          var f = b[a];
          f.enabled = f === this.track;
        }
      }
    };
    a.prototype.handleTracksChange = function(a) {
      this.selected(this.track.enabled);
    };
    return a;
  }(Ga);
  n.registerComponent("AudioTrackMenuItem", Jc);
  var Kc = function(c) {
    function a(a, d) {
      void 0 === d && (d = {});
      d.tracks = a.audioTracks && a.audioTracks();
      a = c.call(this, a, d) || this;
      a.el_.setAttribute("aria-label", "Audio Menu");
      return a;
    }
    __extends(a, c);
    a.prototype.buildCSSClass = function() {
      return "vjs-audio-button " + c.prototype.buildCSSClass.call(this);
    };
    a.prototype.createItems = function(a) {
      void 0 === a && (a = []);
      var b = this.player_.audioTracks && this.player_.audioTracks();
      if (!b) {
        return a;
      }
      for (var c = 0;c < b.length;c++) {
        a.push(new Jc(this.player_, {track:b[c], selectable:!0}));
      }
      return a;
    };
    return a;
  }(Bb);
  Kc.prototype.controlText_ = "Audio Track";
  n.registerComponent("AudioTrackButton", Kc);
  var Gb = function(c) {
    function a(a, d) {
      var b = d.rate, g = parseFloat(b, 10);
      d.label = b;
      d.selected = 1 === g;
      d = c.call(this, a, d) || this;
      d.label = b;
      d.rate = g;
      d.on(a, "ratechange", d.update);
      return d;
    }
    __extends(a, c);
    a.prototype.handleClick = function(a) {
      c.prototype.handleClick.call(this);
      this.player().playbackRate(this.rate);
    };
    a.prototype.update = function(a) {
      this.selected(this.player().playbackRate() === this.rate);
    };
    return a;
  }(Ga);
  Gb.prototype.contentElType = "button";
  n.registerComponent("PlaybackRateMenuItem", Gb);
  var Lc = function(c) {
    function a(a, d) {
      d = c.call(this, a, d) || this;
      d.updateVisibility();
      d.updateLabel();
      d.on(a, "loadstart", d.updateVisibility);
      d.on(a, "ratechange", d.updateLabel);
      return d;
    }
    __extends(a, c);
    a.prototype.createEl = function() {
      var a = c.prototype.createEl.call(this);
      this.labelEl_ = h("div", {className:"vjs-playback-rate-value", innerHTML:1});
      a.appendChild(this.labelEl_);
      return a;
    };
    a.prototype.buildCSSClass = function() {
      return "vjs-playback-rate " + c.prototype.buildCSSClass.call(this);
    };
    a.prototype.createMenu = function() {
      var a = new zb(this.player()), c = this.playbackRates();
      if (c) {
        for (var f = c.length - 1;0 <= f;f--) {
          a.addChild(new Gb(this.player(), {rate:c[f] + "x"}));
        }
      }
      return a;
    };
    a.prototype.updateARIAAttributes = function() {
      this.el().setAttribute("aria-valuenow", this.player().playbackRate());
    };
    a.prototype.handleClick = function(a) {
      a = this.player().playbackRate();
      for (var b = this.playbackRates(), c = b[0], g = 0;g < b.length;g++) {
        if (b[g] > a) {
          c = b[g];
          break;
        }
      }
      this.player().playbackRate(c);
    };
    a.prototype.playbackRates = function() {
      return this.options_.playbackRates || this.options_.playerOptions && this.options_.playerOptions.playbackRates;
    };
    a.prototype.playbackRateSupported = function() {
      return this.player().tech_ && this.player().tech_.featuresPlaybackRate && this.playbackRates() && 0 < this.playbackRates().length;
    };
    a.prototype.updateVisibility = function(a) {
      this.playbackRateSupported() ? this.removeClass("vjs-hidden") : this.addClass("vjs-hidden");
    };
    a.prototype.updateLabel = function(a) {
      this.playbackRateSupported() && (this.labelEl_.innerHTML = this.player().playbackRate() + "x");
    };
    return a;
  }(Ab);
  Lc.prototype.controlText_ = "Playback Rate";
  n.registerComponent("PlaybackRateMenuButton", Lc);
  var Mc = function(c) {
    function a() {
      return c.apply(this, arguments) || this;
    }
    __extends(a, c);
    a.prototype.buildCSSClass = function() {
      return "vjs-spacer " + c.prototype.buildCSSClass.call(this);
    };
    a.prototype.createEl = function() {
      return c.prototype.createEl.call(this, "div", {className:this.buildCSSClass()});
    };
    return a;
  }(n);
  n.registerComponent("Spacer", Mc);
  var Qd = function(c) {
    function a() {
      return c.apply(this, arguments) || this;
    }
    __extends(a, c);
    a.prototype.buildCSSClass = function() {
      return "vjs-custom-control-spacer " + c.prototype.buildCSSClass.call(this);
    };
    a.prototype.createEl = function() {
      var a = c.prototype.createEl.call(this, {className:this.buildCSSClass()});
      a.innerHTML = "&nbsp;";
      return a;
    };
    return a;
  }(Mc);
  n.registerComponent("CustomControlSpacer", Qd);
  var Nc = function(c) {
    function a() {
      return c.apply(this, arguments) || this;
    }
    __extends(a, c);
    a.prototype.createEl = function() {
      return c.prototype.createEl.call(this, "div", {className:"vjs-control-bar", dir:"ltr"}, {role:"group"});
    };
    return a;
  }(n);
  Nc.prototype.options_ = {children:"playToggle volumeMenuButton currentTimeDisplay timeDivider durationDisplay progressControl liveDisplay remainingTimeDisplay customControlSpacer playbackRateMenuButton chaptersButton descriptionsButton subtitlesButton captionsButton audioTrackButton fullscreenToggle".split(" ")};
  n.registerComponent("ControlBar", Nc);
  var Oc = function(c) {
    function a(a, d) {
      d = c.call(this, a, d) || this;
      d.on(a, "error", d.open);
      return d;
    }
    __extends(a, c);
    a.prototype.buildCSSClass = function() {
      return "vjs-error-display " + c.prototype.buildCSSClass.call(this);
    };
    a.prototype.content = function() {
      var a = this.player().error();
      return a ? this.localize(a.message) : "";
    };
    return a;
  }(Fa);
  Oc.prototype.options_ = P(Fa.prototype.options_, {fillAlways:!0, temporary:!1, uncloseable:!0});
  n.registerComponent("ErrorDisplay", Oc);
  var Pc = ["#000", "Black"], Qc = ["#00F", "Blue"], Rc = ["#0FF", "Cyan"], Sc = ["#0F0", "Green"], Tc = ["#F0F", "Magenta"], Uc = ["#F00", "Red"], Vc = ["#FFF", "White"], Wc = ["#FF0", "Yellow"], Hb = ["1", "Opaque"], Ib = ["0.5", "Semi-Transparent"], Xc = ["0", "Transparent"], ra = {backgroundColor:{selector:".vjs-bg-color > select", id:"captions-background-color-%s", label:"Color", options:[Pc, Vc, Uc, Sc, Qc, Wc, Tc, Rc]}, backgroundOpacity:{selector:".vjs-bg-opacity > select", id:"captions-background-opacity-%s", 
  label:"Transparency", options:[Hb, Ib, Xc]}, color:{selector:".vjs-fg-color > select", id:"captions-foreground-color-%s", label:"Color", options:[Vc, Pc, Uc, Sc, Qc, Wc, Tc, Rc]}, edgeStyle:{selector:".vjs-edge-style > select", id:"%s", label:"Text Edge Style", options:[["none", "None"], ["raised", "Raised"], ["depressed", "Depressed"], ["uniform", "Uniform"], ["dropshadow", "Dropshadow"]]}, fontFamily:{selector:".vjs-font-family > select", id:"captions-font-family-%s", label:"Font Family", options:[["proportionalSansSerif", 
  "Proportional Sans-Serif"], ["monospaceSansSerif", "Monospace Sans-Serif"], ["proportionalSerif", "Proportional Serif"], ["monospaceSerif", "Monospace Serif"], ["casual", "Casual"], ["script", "Script"], ["small-caps", "Small Caps"]]}, fontPercent:{selector:".vjs-font-percent > select", id:"captions-font-size-%s", label:"Font Size", options:[["0.50", "50%"], ["0.75", "75%"], ["1.00", "100%"], ["1.25", "125%"], ["1.50", "150%"], ["1.75", "175%"], ["2.00", "200%"], ["3.00", "300%"], ["4.00", "400%"]], 
  "default":2, parser:function(c) {
    return "1.00" === c ? null : Number(c);
  }}, textOpacity:{selector:".vjs-text-opacity > select", id:"captions-foreground-opacity-%s", label:"Transparency", options:[Hb, Ib]}, windowColor:{selector:".vjs-window-color > select", id:"captions-window-color-%s", label:"Color"}, windowOpacity:{selector:".vjs-window-opacity > select", id:"captions-window-opacity-%s", label:"Transparency", options:[Xc, Ib, Hb]}};
  ra.windowColor.options = ra.backgroundColor.options;
  var Rd = function(c) {
    function a(a, d) {
      var b = c.call(this, a, d) || this;
      b.setDefaults();
      b.hide();
      b.updateDisplay = y(b, b.updateDisplay);
      void 0 === d.persistTextTrackSettings && (b.options_.persistTextTrackSettings = b.options_.playerOptions.persistTextTrackSettings);
      b.on(b.$(".vjs-done-button"), "click", function() {
        b.saveSettings();
        b.hide();
      });
      b.on(b.$(".vjs-default-button"), "click", function() {
        b.setDefaults();
        b.updateDisplay();
      });
      ma(ra, function(a) {
        b.on(b.$(a.selector), "change", b.updateDisplay);
      });
      b.options_.persistTextTrackSettings && b.restoreSettings();
      return b;
    }
    __extends(a, c);
    a.prototype.createElSelect_ = function(a) {
      var b = this;
      a = ra[a];
      var c = a.id.replace("%s", this.id_);
      return [h("label", {className:"vjs-label", textContent:a.label}, {"for":c}), h("select", {id:c}, void 0, a.options.map(function(a) {
        return h("option", {textContent:b.localize(a[1]), value:a[0]});
      }))];
    };
    a.prototype.createElFgColor_ = function() {
      var a = h("legend", {textContent:this.localize("Text")}), c = this.createElSelect_("color"), f = h("span", {className:"vjs-text-opacity vjs-opacity"}, void 0, this.createElSelect_("textOpacity"));
      return h("fieldset", {className:"vjs-fg-color vjs-tracksetting"}, void 0, [a].concat(c, f));
    };
    a.prototype.createElBgColor_ = function() {
      var a = h("legend", {textContent:this.localize("Background")}), c = this.createElSelect_("backgroundColor"), f = h("span", {className:"vjs-bg-opacity vjs-opacity"}, void 0, this.createElSelect_("backgroundOpacity"));
      return h("fieldset", {className:"vjs-bg-color vjs-tracksetting"}, void 0, [a].concat(c, f));
    };
    a.prototype.createElWinColor_ = function() {
      var a = h("legend", {textContent:this.localize("Window")}), c = this.createElSelect_("windowColor"), f = h("span", {className:"vjs-window-opacity vjs-opacity"}, void 0, this.createElSelect_("windowOpacity"));
      return h("fieldset", {className:"vjs-window-color vjs-tracksetting"}, void 0, [a].concat(c, f));
    };
    a.prototype.createElColors_ = function() {
      return h("div", {className:"vjs-tracksettings-colors"}, void 0, [this.createElFgColor_(), this.createElBgColor_(), this.createElWinColor_()]);
    };
    a.prototype.createElFont_ = function() {
      var a = h("div", {className:"vjs-font-percent vjs-tracksetting"}, void 0, this.createElSelect_("fontPercent")), c = h("div", {className:"vjs-edge-style vjs-tracksetting"}, void 0, this.createElSelect_("edgeStyle")), f = h("div", {className:"vjs-font-family vjs-tracksetting"}, void 0, this.createElSelect_("fontFamily"));
      return h("div", {className:"vjs-tracksettings-font"}, void 0, [a, c, f]);
    };
    a.prototype.createElControls_ = function() {
      var a = h("button", {className:"vjs-default-button", textContent:this.localize("Defaults")}), c = h("button", {className:"vjs-done-button", textContent:"Done"});
      return h("div", {className:"vjs-tracksettings-controls"}, void 0, [a, c]);
    };
    a.prototype.createEl = function() {
      var a = h("div", {className:"vjs-tracksettings"}, void 0, [this.createElColors_(), this.createElFont_(), this.createElControls_()]), c = h("div", {className:"vjs-control-text", id:"TTsettingsDialogLabel-" + this.id_, textContent:"Caption Settings Dialog"}, {"aria-level":"1", role:"heading"}), f = h("div", {className:"vjs-control-text", id:"TTsettingsDialogDescription-" + this.id_, textContent:"Beginning of dialog window. Escape will cancel and close the window."}), a = h("div", void 0, {role:"document"}, 
      [c, f, a]);
      return h("div", {className:"vjs-caption-settings vjs-modal-overlay", tabIndex:-1}, {role:"dialog", "aria-labelledby":c.id, "aria-describedby":f.id}, a);
    };
    a.prototype.getValues = function() {
      var a = this;
      return Za(ra, function(b, c, g) {
        var d = a.$(c.selector);
        c = Yb(d.options[d.options.selectedIndex].value, c.parser);
        void 0 !== c && (b[g] = c);
        return b;
      }, {});
    };
    a.prototype.setValues = function(a) {
      var b = this;
      ma(ra, function(c, d) {
        var f = b.$(c.selector);
        d = a[d];
        c = c.parser;
        if (d) {
          for (var g = 0;g < f.options.length;g++) {
            if (Yb(f.options[g].value, c) === d) {
              f.selectedIndex = g;
              break;
            }
          }
        }
      });
    };
    a.prototype.setDefaults = function() {
      var a = this;
      ma(ra, function(b) {
        var c = b.hasOwnProperty("default") ? b["default"] : 0;
        a.$(b.selector).selectedIndex = c;
      });
    };
    a.prototype.restoreSettings = function() {
      var a;
      try {
        a = JSON.parse(q.localStorage.getItem("vjs-text-track-settings"));
      } catch (d) {
        D.warn(d);
      }
      a && this.setValues(a);
    };
    a.prototype.saveSettings = function() {
      if (this.options_.persistTextTrackSettings) {
        var a = this.getValues();
        try {
          Object.keys(a).length ? q.localStorage.setItem("vjs-text-track-settings", JSON.stringify(a)) : q.localStorage.removeItem("vjs-text-track-settings");
        } catch (d) {
          D.warn(d);
        }
      }
    };
    a.prototype.updateDisplay = function() {
      var a = this.player_.getChild("textTrackDisplay");
      a && a.updateDisplay();
    };
    return a;
  }(n);
  n.registerComponent("TextTrackSettings", Rd);
  var v = function(c) {
    function a(a, d) {
      var b = c.call(this, a, d) || this, g = a.source;
      d = !1;
      g && (b.el_.currentSrc !== g.src || a.tag && 3 === a.tag.initNetworkState_) ? b.setSource(g) : b.handleLateInit_(b.el_);
      if (b.el_.hasChildNodes()) {
        for (var e = b.el_.childNodes, h = e.length, g = [];h--;) {
          var z = e[h];
          "track" === z.nodeName.toLowerCase() && (b.featuresNativeTextTracks ? (b.remoteTextTrackEls().addTrackElement_(z), b.remoteTextTracks().addTrack_(z.track), d || b.el_.hasAttribute("crossorigin") || !pb(z.src) || (d = !0)) : g.push(z));
        }
        for (e = 0;e < g.length;e++) {
          b.el_.removeChild(g[e]);
        }
      }
      ["audio", "video"].forEach(function(a) {
        var c = b.el()[a + "Tracks"], d = b[a + "Tracks"]();
        a = O(a);
        b["featuresNative" + a + "Tracks"] && c && c.addEventListener && (b["handle" + a + "TrackChange_"] = function(a) {
          d.trigger({type:"change", target:d, currentTarget:d, srcElement:d});
        }, b["handle" + a + "TrackAdd_"] = function(a) {
          return d.addTrack(a.track);
        }, b["handle" + a + "TrackRemove_"] = function(a) {
          return d.removeTrack(a.track);
        }, c.addEventListener("change", b["handle" + a + "TrackChange_"]), c.addEventListener("addtrack", b["handle" + a + "TrackAdd_"]), c.addEventListener("removetrack", b["handle" + a + "TrackRemove_"]), b["removeOld" + a + "Tracks_"] = function(a) {
          return b.removeOldTracks_(d, c);
        }, b.on("loadstart", b["removeOld" + a + "Tracks_"]));
      });
      b.featuresNativeTextTracks && (d && D.warn((l = ["Text Tracks are being loaded from another origin but the crossorigin attribute isn't used.\n            This may prevent text tracks from loading."], l.raw = ["Text Tracks are being loaded from another origin but the crossorigin attribute isn't used.\n            This may prevent text tracks from loading."], Lb(l))), b.handleTextTrackChange_ = y(b, b.handleTextTrackChange), b.handleTextTrackAdd_ = y(b, b.handleTextTrackAdd), b.handleTextTrackRemove_ = 
      y(b, b.handleTextTrackRemove), b.proxyNativeTextTracks_());
      (Pa || hb || fc) && !0 === a.nativeControlsForTouch && b.setControls(!0);
      b.proxyWebkitFullscreen_();
      b.triggerReady();
      return b;
      var l;
    }
    __extends(a, c);
    a.prototype.dispose = function() {
      var b = this;
      ["audio", "video", "text"].forEach(function(a) {
        var c = O(a);
        (a = b.el_[a + "Tracks"]) && a.removeEventListener && (a.removeEventListener("change", b["handle" + c + "TrackChange_"]), a.removeEventListener("addtrack", b["handle" + c + "TrackAdd_"]), a.removeEventListener("removetrack", b["handle" + c + "TrackRemove_"]));
        a && b.off("loadstart", b["removeOld" + c + "Tracks_"]);
      });
      a.disposeMediaElement(this.el_);
      c.prototype.dispose.call(this);
    };
    a.prototype.createEl = function() {
      var b = this.options_.tag;
      if (!b || !1 === this.movingMediaElementInDOM) {
        if (b) {
          var c = b.cloneNode(!0);
          b.parentNode.insertBefore(c, b);
          a.disposeMediaElement(b);
          b = c;
        } else {
          b = w.createElement("video"), c = this.options_.tag && K(this.options_.tag), c = P({}, c), Pa && !0 === this.options_.nativeControlsForTouch || delete c.controls, ab(b, A(c, {id:this.options_.techId, "class":"vjs-tech"}));
        }
        b.playerId = this.options_.playerId;
      }
      for (var c = ["autoplay", "preload", "loop", "muted"], f = c.length - 1;0 <= f;f--) {
        var g = c[f], e = {};
        "undefined" !== typeof this.options_[g] && (e[g] = this.options_[g]);
        ab(b, e);
      }
      return b;
    };
    a.prototype.handleLateInit_ = function(a) {
      if (0 !== a.networkState && 3 !== a.networkState) {
        if (0 === a.readyState) {
          var b = !1, c = function() {
            b = !0;
          };
          this.on("loadstart", c);
          var g = function() {
            b || this.trigger("loadstart");
          };
          this.on("loadedmetadata", g);
          this.ready(function() {
            this.off("loadstart", c);
            this.off("loadedmetadata", g);
            b || this.trigger("loadstart");
          });
        } else {
          var e = ["loadstart"];
          e.push("loadedmetadata");
          2 <= a.readyState && e.push("loadeddata");
          3 <= a.readyState && e.push("canplay");
          4 <= a.readyState && e.push("canplaythrough");
          this.ready(function() {
            e.forEach(function(a) {
              this.trigger(a);
            }, this);
          });
        }
      }
    };
    a.prototype.proxyNativeTextTracks_ = function() {
      var a = this.el().textTracks;
      if (a) {
        for (var c = 0;c < a.length;c++) {
          this.textTracks().addTrack_(a[c]);
        }
        a.addEventListener && (a.addEventListener("change", this.handleTextTrackChange_), a.addEventListener("addtrack", this.handleTextTrackAdd_), a.addEventListener("removetrack", this.handleTextTrackRemove_));
        this.on("loadstart", this.removeOldTextTracks_);
      }
    };
    a.prototype.handleTextTrackChange = function(a) {
      a = this.textTracks();
      this.textTracks().trigger({type:"change", target:a, currentTarget:a, srcElement:a});
    };
    a.prototype.handleTextTrackAdd = function(a) {
      this.textTracks().addTrack_(a.track);
    };
    a.prototype.handleTextTrackRemove = function(a) {
      this.textTracks().removeTrack_(a.track);
    };
    a.prototype.removeOldTracks_ = function(a, c) {
      var b = [];
      if (c) {
        for (var d = 0;d < a.length;d++) {
          for (var e = a[d], h = !1, z = 0;z < c.length;z++) {
            if (c[z] === e) {
              h = !0;
              break;
            }
          }
          h || b.push(e);
        }
        for (d = 0;d < b.length;d++) {
          a.removeTrack_(b[d]);
        }
      }
    };
    a.prototype.removeOldTextTracks_ = function(a) {
      a = this.textTracks();
      var b = this.el().textTracks;
      this.removeOldTracks_(a, b);
    };
    a.prototype.play = function() {
      var a = this.el_.play();
      void 0 !== a && "function" === typeof a.then && a.then(null, function(a) {
      });
    };
    a.prototype.setCurrentTime = function(a) {
      try {
        this.el_.currentTime = a;
      } catch (d) {
        D(d, "Video is not ready. (Video.js)");
      }
    };
    a.prototype.duration = function() {
      var a = this;
      if (Infinity === this.el_.duration && ua && Oa && 0 === this.el_.currentTime) {
        var c = function() {
          0 < a.el_.currentTime && (Infinity === a.el_.duration && a.trigger("durationchange"), a.off("timeupdate", c));
        };
        this.on("timeupdate", c);
        return NaN;
      }
      return this.el_.duration || NaN;
    };
    a.prototype.width = function() {
      return this.el_.offsetWidth;
    };
    a.prototype.height = function() {
      return this.el_.offsetHeight;
    };
    a.prototype.proxyWebkitFullscreen_ = function() {
      var a = this;
      if ("webkitDisplayingFullscreen" in this.el_) {
        var c = function() {
          this.trigger("fullscreenchange", {isFullscreen:!1});
        }, f = function() {
          this.one("webkitendfullscreen", c);
          this.trigger("fullscreenchange", {isFullscreen:!0});
        };
        this.on("webkitbeginfullscreen", f);
        this.on("dispose", function() {
          a.off("webkitbeginfullscreen", f);
          a.off("webkitendfullscreen", c);
        });
      }
    };
    a.prototype.supportsFullScreen = function() {
      if ("function" === typeof this.el_.webkitEnterFullScreen) {
        var a = q.navigator && q.navigator.userAgent || "";
        if (/Android/.test(a) || !/Chrome|Mac OS X 10.5/.test(a)) {
          return !0;
        }
      }
      return !1;
    };
    a.prototype.enterFullScreen = function() {
      var a = this.el_;
      a.paused && a.networkState <= a.HAVE_METADATA ? (this.el_.play(), this.setTimeout(function() {
        a.pause();
        a.webkitEnterFullScreen();
      }, 0)) : a.webkitEnterFullScreen();
    };
    a.prototype.exitFullScreen = function() {
      this.el_.webkitExitFullScreen();
    };
    a.prototype.src = function(a) {
      if (void 0 === a) {
        return this.el_.src;
      }
      this.setSrc(a);
    };
    a.prototype.reset = function() {
      a.resetMediaElement(this.el_);
    };
    a.prototype.currentSrc = function() {
      return this.currentSource_ ? this.currentSource_.src : this.el_.currentSrc;
    };
    a.prototype.setControls = function(a) {
      this.el_.controls = !!a;
    };
    a.prototype.addTextTrack = function(a, d, f) {
      return this.featuresNativeTextTracks ? this.el_.addTextTrack(a, d, f) : c.prototype.addTextTrack.call(this, a, d, f);
    };
    a.prototype.createRemoteTextTrack = function(a) {
      if (!this.featuresNativeTextTracks) {
        return c.prototype.createRemoteTextTrack.call(this, a);
      }
      var b = w.createElement("track");
      a.kind && (b.kind = a.kind);
      a.label && (b.label = a.label);
      if (a.language || a.srclang) {
        b.srclang = a.language || a.srclang;
      }
      a["default"] && (b["default"] = a["default"]);
      a.id && (b.id = a.id);
      a.src && (b.src = a.src);
      return b;
    };
    a.prototype.addRemoteTextTrack = function(a, d) {
      a = c.prototype.addRemoteTextTrack.call(this, a, d);
      this.featuresNativeTextTracks && this.el().appendChild(a);
      return a;
    };
    a.prototype.removeRemoteTextTrack = function(a) {
      c.prototype.removeRemoteTextTrack.call(this, a);
      if (this.featuresNativeTextTracks) {
        for (var b = this.$$("track"), f = b.length;f--;) {
          a !== b[f] && a !== b[f].track || this.el().removeChild(b[f]);
        }
      }
    };
    return a;
  }(I);
  v.TEST_VID = w.createElement("video");
  var Wa = w.createElement("track");
  Wa.kind = "captions";
  Wa.srclang = "en";
  Wa.label = "English";
  v.TEST_VID.appendChild(Wa);
  v.isSupported = function() {
    try {
      v.TEST_VID.volume = .5;
    } catch (c) {
      return !1;
    }
    return !!v.TEST_VID.canPlayType;
  };
  v.canControlVolume = function() {
    try {
      var c = v.TEST_VID.volume;
      v.TEST_VID.volume = c / 2 + .1;
      return c !== v.TEST_VID.volume;
    } catch (a) {
      return !1;
    }
  };
  v.canControlPlaybackRate = function() {
    if (ua && Oa) {
      return !1;
    }
    try {
      var c = v.TEST_VID.playbackRate;
      v.TEST_VID.playbackRate = c / 2 + .1;
      return c !== v.TEST_VID.playbackRate;
    } catch (a) {
      return !1;
    }
  };
  v.supportsNativeTextTracks = function() {
    return ic;
  };
  v.supportsNativeVideoTracks = function() {
    return !!v.TEST_VID.videoTracks;
  };
  v.supportsNativeAudioTracks = function() {
    return !!v.TEST_VID.audioTracks;
  };
  v.Events = "loadstart suspend abort error emptied stalled loadedmetadata loadeddata canplay canplaythrough playing waiting seeking seeked ended durationchange timeupdate progress play pause ratechange volumechange".split(" ");
  v.prototype.featuresVolumeControl = v.canControlVolume();
  v.prototype.featuresPlaybackRate = v.canControlPlaybackRate();
  v.prototype.movingMediaElementInDOM = !Ma;
  v.prototype.featuresFullscreenResize = !0;
  v.prototype.featuresProgressEvents = !0;
  v.prototype.featuresTimeupdateEvents = !0;
  v.prototype.featuresNativeTextTracks = v.supportsNativeTextTracks();
  v.prototype.featuresNativeVideoTracks = v.supportsNativeVideoTracks();
  v.prototype.featuresNativeAudioTracks = v.supportsNativeAudioTracks();
  var la, Sd = /^application\/(?:x-|vnd\.apple\.)mpegurl/i, Td = /^video\/mp4/i;
  v.patchCanPlayType = function() {
    4 <= Na && !gc && (la || (la = v.TEST_VID.constructor.prototype.canPlayType), v.TEST_VID.constructor.prototype.canPlayType = function(c) {
      return c && Sd.test(c) ? "maybe" : la.call(this, c);
    });
    ec && (la || (la = v.TEST_VID.constructor.prototype.canPlayType), v.TEST_VID.constructor.prototype.canPlayType = function(c) {
      return c && Td.test(c) ? "maybe" : la.call(this, c);
    });
  };
  v.unpatchCanPlayType = function() {
    var c = v.TEST_VID.constructor.prototype.canPlayType;
    v.TEST_VID.constructor.prototype.canPlayType = la;
    la = null;
    return c;
  };
  v.patchCanPlayType();
  v.disposeMediaElement = function(c) {
    if (c) {
      for (c.parentNode && c.parentNode.removeChild(c);c.hasChildNodes();) {
        c.removeChild(c.firstChild);
      }
      c.removeAttribute("src");
      if ("function" === typeof c.load) {
        try {
          c.load();
        } catch (a) {
        }
      }
    }
  };
  v.resetMediaElement = function(c) {
    if (c) {
      for (var a = c.querySelectorAll("source"), b = a.length;b--;) {
        c.removeChild(a[b]);
      }
      c.removeAttribute("src");
      if ("function" === typeof c.load) {
        try {
          c.load();
        } catch (d) {
        }
      }
    }
  };
  "paused currentTime buffered volume muted poster preload autoplay controls loop error seeking seekable ended defaultMuted playbackRate played networkState readyState videoWidth videoHeight".split(" ").forEach(function(c) {
    v.prototype[c] = function() {
      return this.el_[c];
    };
  });
  "volume muted src poster preload autoplay loop playbackRate".split(" ").forEach(function(c) {
    v.prototype["set" + O(c)] = function(a) {
      this.el_[c] = a;
    };
  });
  ["pause", "load"].forEach(function(c) {
    v.prototype[c] = function() {
      return this.el_[c]();
    };
  });
  I.withSourceHandlers(v);
  v.nativeSourceHandler = {};
  v.nativeSourceHandler.canPlayType = function(c) {
    try {
      return v.TEST_VID.canPlayType(c);
    } catch (a) {
      return "";
    }
  };
  v.nativeSourceHandler.canHandleSource = function(c, a) {
    return c.type ? v.nativeSourceHandler.canPlayType(c.type) : c.src ? (c = rc(c.src), v.nativeSourceHandler.canPlayType("video/" + c)) : "";
  };
  v.nativeSourceHandler.handleSource = function(c, a, b) {
    a.setSrc(c.src);
  };
  v.nativeSourceHandler.dispose = function() {
  };
  v.registerSourceHandler(v.nativeSourceHandler);
  n.registerComponent("Html5", v);
  I.registerTech("Html5", v);
  var Yc = "progress abort suspend emptied stalled loadedmetadata loadeddata timeupdate ratechange volumechange texttrackchange".split(" "), ba = function(c) {
    function a(b, d, f) {
      b.id = b.id || "vjs_video_" + qa++;
      d = A(a.getTagSettings(b), d);
      d.initChildren = !1;
      d.createEl = !1;
      d.reportTouchActivity = !1;
      if (!d.language) {
        if ("function" === typeof b.closest) {
          var g = b.closest("[lang]");
          g && (d.language = g.getAttribute("lang"));
        } else {
          for (g = b;g && 1 === g.nodeType;) {
            if (K(g).hasOwnProperty("lang")) {
              d.language = g.getAttribute("lang");
              break;
            }
            g = g.parentNode;
          }
        }
      }
      f = c.call(this, null, d, f) || this;
      if (!f.options_ || !f.options_.techOrder || !f.options_.techOrder.length) {
        throw Error("No techOrder specified. Did you overwrite videojs.options instead of just changing the properties you want to override?");
      }
      f.tag = b;
      f.tagAttributes = b && K(b);
      f.language(f.options_.language);
      if (d.languages) {
        var e = {};
        Object.getOwnPropertyNames(d.languages).forEach(function(a) {
          e[a.toLowerCase()] = d.languages[a];
        });
        f.languages_ = e;
      } else {
        f.languages_ = a.prototype.options_.languages;
      }
      f.cache_ = {};
      f.poster_ = d.poster || "";
      f.controls_ = !!d.controls;
      b.controls = !1;
      f.scrubbing_ = !1;
      f.el_ = f.createEl();
      g = P(f.options_);
      if (d.plugins) {
        var h = d.plugins;
        Object.getOwnPropertyNames(h).forEach(function(a) {
          if ("function" === typeof this[a]) {
            this[a](h[a]);
          } else {
            D.error("Unable to find plugin:", a);
          }
        }, f);
      }
      f.options_.playerOptions = g;
      f.initChildren();
      f.isAudio("audio" === b.nodeName.toLowerCase());
      f.controls() ? f.addClass("vjs-controls-enabled") : f.addClass("vjs-controls-disabled");
      f.el_.setAttribute("role", "region");
      f.isAudio() ? f.el_.setAttribute("aria-label", "audio player") : f.el_.setAttribute("aria-label", "video player");
      f.isAudio() && f.addClass("vjs-audio");
      f.flexNotSupported_() && f.addClass("vjs-no-flex");
      Ma || f.addClass("vjs-workinghover");
      a.players[f.id_] = f;
      f.userActive(!0);
      f.reportUserActivity();
      f.listenForUserActivity_();
      f.on("fullscreenchange", f.handleFullscreenChange_);
      f.on("stageclick", f.handleStageClick_);
      return f;
    }
    __extends(a, c);
    a.prototype.dispose = function() {
      this.trigger("dispose");
      this.off("dispose");
      this.styleEl_ && this.styleEl_.parentNode && this.styleEl_.parentNode.removeChild(this.styleEl_);
      a.players[this.id_] = null;
      this.tag && this.tag.player && (this.tag.player = null);
      this.el_ && this.el_.player && (this.el_.player = null);
      this.tech_ && this.tech_.dispose();
      c.prototype.dispose.call(this);
    };
    a.prototype.createEl = function() {
      var a = this.el_ = c.prototype.createEl.call(this, "div"), d = this.tag;
      d.removeAttribute("width");
      d.removeAttribute("height");
      var f = K(d);
      Object.getOwnPropertyNames(f).forEach(function(b) {
        "class" === b ? a.className = f[b] : a.setAttribute(b, f[b]);
      });
      d.playerId = d.id;
      d.id += "_html5_api";
      d.className = "vjs-tech";
      d.player = a.player = this;
      this.addClass("vjs-paused");
      if (!0 !== q.VIDEOJS_NO_DYNAMIC_STYLE) {
        this.styleEl_ = lc("vjs-styles-dimensions");
        var g = Ea(".vjs-styles-defaults"), e = Ea("head");
        e.insertBefore(this.styleEl_, g ? g.nextSibling : e.firstChild);
      }
      this.width(this.options_.width);
      this.height(this.options_.height);
      this.fluid(this.options_.fluid);
      this.aspectRatio(this.options_.aspectRatio);
      g = d.getElementsByTagName("a");
      for (e = 0;e < g.length;e++) {
        var h = g.item(e);
        H(h, "vjs-hidden");
        h.setAttribute("hidden", "hidden");
      }
      d.initNetworkState_ = d.networkState;
      d.parentNode && d.parentNode.insertBefore(a, d);
      sa(d, a);
      this.children_.unshift(d);
      return this.el_ = a;
    };
    a.prototype.width = function(a) {
      return this.dimension("width", a);
    };
    a.prototype.height = function(a) {
      return this.dimension("height", a);
    };
    a.prototype.dimension = function(a, c) {
      var b = a + "_";
      if (void 0 === c) {
        return this[b] || 0;
      }
      if ("" === c) {
        this[b] = void 0;
      } else {
        var d = parseFloat(c);
        if (isNaN(d)) {
          return D.error('Improper value "' + c + '" supplied for for ' + a), this;
        }
        this[b] = d;
      }
      this.updateStyleEl_();
      return this;
    };
    a.prototype.fluid = function(a) {
      if (void 0 === a) {
        return !!this.fluid_;
      }
      this.fluid_ = !!a;
      a ? this.addClass("vjs-fluid") : this.removeClass("vjs-fluid");
      this.updateStyleEl_();
    };
    a.prototype.aspectRatio = function(a) {
      if (void 0 === a) {
        return this.aspectRatio_;
      }
      if (!/^\d+\:\d+$/.test(a)) {
        throw Error("Improper value supplied for aspect ratio. The format should be width:height, for example 16:9.");
      }
      this.aspectRatio_ = a;
      this.fluid(!0);
      this.updateStyleEl_();
    };
    a.prototype.updateStyleEl_ = function() {
      if (!0 === q.VIDEOJS_NO_DYNAMIC_STYLE) {
        var a = "number" === typeof this.width_ ? this.width_ : this.options_.width, c = "number" === typeof this.height_ ? this.height_ : this.options_.height, f = this.tech_ && this.tech_.el();
        f && (0 <= a && (f.width = a), 0 <= c && (f.height = c));
      } else {
        var a = (void 0 !== this.aspectRatio_ && "auto" !== this.aspectRatio_ ? this.aspectRatio_ : 0 < this.videoWidth() ? this.videoWidth() + ":" + this.videoHeight() : "16:9").split(":"), g = a[1] / a[0], a = void 0 !== this.width_ ? this.width_ : void 0 !== this.height_ ? this.height_ / g : this.videoWidth() || 300, c = void 0 !== this.height_ ? this.height_ : a * g, f = /^[^a-zA-Z]/.test(this.id()) ? "dimensions-" + this.id() : this.id() + "-dimensions";
        this.addClass(f);
        mc(this.styleEl_, "\n      ." + f + " {\n        width: " + a + "px;\n        height: " + c + "px;\n      }\n\n      ." + f + ".vjs-fluid {\n        padding-top: " + 100 * g + "%;\n      }\n    ");
      }
    };
    a.prototype.loadTech_ = function(a, c) {
      var b = this;
      this.tech_ && this.unloadTech_();
      "Html5" !== a && this.tag && (I.getTech("Html5").disposeMediaElement(this.tag), this.tag = this.tag.player = null);
      this.techName_ = a;
      this.isReady_ = !1;
      var d = A({source:c, nativeControlsForTouch:this.options_.nativeControlsForTouch, playerId:this.id(), techId:this.id() + "_" + a + "_api", videoTracks:this.videoTracks_, textTracks:this.textTracks_, audioTracks:this.audioTracks_, autoplay:this.options_.autoplay, preload:this.options_.preload, loop:this.options_.loop, muted:this.options_.muted, poster:this.poster(), language:this.language(), "vtt.js":this.options_["vtt.js"]}, this.options_[a.toLowerCase()]);
      this.tag && (d.tag = this.tag);
      c && (this.currentType_ = c.type, c.src === this.cache_.src && 0 < this.cache_.currentTime && (d.startTime = this.cache_.currentTime), this.cache_.sources = null, this.cache_.source = c, this.cache_.src = c.src);
      (c = I.getTech(a)) || (c = n.getComponent(a));
      this.tech_ = new c(d);
      this.tech_.ready(y(this, this.handleTechReady_), !0);
      nc.jsonToTextTracks(this.textTracksJson_ || [], this.tech_);
      Yc.forEach(function(a) {
        b.on(b.tech_, a, b["handleTech" + O(a) + "_"]);
      });
      this.on(this.tech_, "loadstart", this.handleTechLoadStart_);
      this.on(this.tech_, "waiting", this.handleTechWaiting_);
      this.on(this.tech_, "canplay", this.handleTechCanPlay_);
      this.on(this.tech_, "canplaythrough", this.handleTechCanPlayThrough_);
      this.on(this.tech_, "playing", this.handleTechPlaying_);
      this.on(this.tech_, "ended", this.handleTechEnded_);
      this.on(this.tech_, "seeking", this.handleTechSeeking_);
      this.on(this.tech_, "seeked", this.handleTechSeeked_);
      this.on(this.tech_, "play", this.handleTechPlay_);
      this.on(this.tech_, "firstplay", this.handleTechFirstPlay_);
      this.on(this.tech_, "pause", this.handleTechPause_);
      this.on(this.tech_, "durationchange", this.handleTechDurationChange_);
      this.on(this.tech_, "fullscreenchange", this.handleTechFullscreenChange_);
      this.on(this.tech_, "error", this.handleTechError_);
      this.on(this.tech_, "loadedmetadata", this.updateStyleEl_);
      this.on(this.tech_, "posterchange", this.handleTechPosterChange_);
      this.on(this.tech_, "textdata", this.handleTechTextData_);
      this.usingNativeControls(this.techGet_("controls"));
      this.controls() && !this.usingNativeControls() && this.addTechControlsListeners_();
      this.tech_.el().parentNode === this.el() || "Html5" === a && this.tag || sa(this.tech_.el(), this.el());
      this.tag && (this.tag = this.tag.player = null);
    };
    a.prototype.unloadTech_ = function() {
      this.videoTracks_ = this.videoTracks();
      this.textTracks_ = this.textTracks();
      this.audioTracks_ = this.audioTracks();
      this.textTracksJson_ = nc.textTracksToJson(this.tech_);
      this.isReady_ = !1;
      this.tech_.dispose();
      this.tech_ = !1;
    };
    a.prototype.tech = function(a) {
      if (a && a.IWillNotUseThisInPlugins) {
        return this.tech_;
      }
      q.alert("\n      Please make sure that you are not using this inside of a plugin.\n      To disable this alert and error, please pass in an object with\n      `IWillNotUseThisInPlugins` to the `tech` method. See\n      https://github.com/videojs/video.js/issues/2617 for more info.\n    ");
      throw Error("\n      Please make sure that you are not using this inside of a plugin.\n      To disable this alert and error, please pass in an object with\n      `IWillNotUseThisInPlugins` to the `tech` method. See\n      https://github.com/videojs/video.js/issues/2617 for more info.\n    ");
    };
    a.prototype.addTechControlsListeners_ = function() {
      this.removeTechControlsListeners_();
      this.on(this.tech_, "mousedown", this.handleTechClick_);
      this.on(this.tech_, "touchstart", this.handleTechTouchStart_);
      this.on(this.tech_, "touchmove", this.handleTechTouchMove_);
      this.on(this.tech_, "touchend", this.handleTechTouchEnd_);
      this.on(this.tech_, "tap", this.handleTechTap_);
    };
    a.prototype.removeTechControlsListeners_ = function() {
      this.off(this.tech_, "tap", this.handleTechTap_);
      this.off(this.tech_, "touchstart", this.handleTechTouchStart_);
      this.off(this.tech_, "touchmove", this.handleTechTouchMove_);
      this.off(this.tech_, "touchend", this.handleTechTouchEnd_);
      this.off(this.tech_, "mousedown", this.handleTechClick_);
    };
    a.prototype.handleTechReady_ = function() {
      this.triggerReady();
      this.cache_.volume && this.techCall_("setVolume", this.cache_.volume);
      this.handleTechPosterChange_();
      this.handleTechDurationChange_();
      if ((this.src() || this.currentSrc()) && this.tag && this.options_.autoplay && this.paused()) {
        try {
          delete this.tag.poster;
        } catch (b) {
          D("deleting tag.poster throws in some browsers", b);
        }
        this.play();
      }
    };
    a.prototype.handleTechLoadStart_ = function() {
      this.removeClass("vjs-ended");
      this.error(null);
      this.paused() ? (this.hasStarted(!1), this.trigger("loadstart")) : (this.trigger("loadstart"), this.trigger("firstplay"));
    };
    a.prototype.hasStarted = function(a) {
      return void 0 !== a ? (this.hasStarted_ !== a && ((this.hasStarted_ = a) ? (this.addClass("vjs-has-started"), this.trigger("firstplay")) : this.removeClass("vjs-has-started")), this) : !!this.hasStarted_;
    };
    a.prototype.handleTechPlay_ = function() {
      this.removeClass("vjs-ended");
      this.removeClass("vjs-paused");
      this.addClass("vjs-playing");
      this.hasStarted(!0);
      this.trigger("play");
    };
    a.prototype.handleTechWaiting_ = function() {
      var a = this;
      this.addClass("vjs-waiting");
      this.trigger("waiting");
      this.one("timeupdate", function() {
        return a.removeClass("vjs-waiting");
      });
    };
    a.prototype.handleTechCanPlay_ = function() {
      this.removeClass("vjs-waiting");
      this.trigger("canplay");
    };
    a.prototype.handleTechCanPlayThrough_ = function() {
      this.removeClass("vjs-waiting");
      this.trigger("canplaythrough");
    };
    a.prototype.handleTechPlaying_ = function() {
      this.removeClass("vjs-waiting");
      this.trigger("playing");
    };
    a.prototype.handleTechSeeking_ = function() {
      this.addClass("vjs-seeking");
      this.trigger("seeking");
    };
    a.prototype.handleTechSeeked_ = function() {
      this.removeClass("vjs-seeking");
      this.trigger("seeked");
    };
    a.prototype.handleTechFirstPlay_ = function() {
      this.options_.starttime && this.currentTime(this.options_.starttime);
      this.addClass("vjs-has-started");
      this.trigger("firstplay");
    };
    a.prototype.handleTechPause_ = function() {
      this.removeClass("vjs-playing");
      this.addClass("vjs-paused");
      this.trigger("pause");
    };
    a.prototype.handleTechEnded_ = function() {
      this.addClass("vjs-ended");
      this.options_.loop ? (this.currentTime(0), this.play()) : this.paused() || this.pause();
      this.trigger("ended");
    };
    a.prototype.handleTechDurationChange_ = function() {
      this.duration(this.techGet_("duration"));
    };
    a.prototype.handleTechClick_ = function(a) {
      0 === a.button && this.controls() && (this.paused() ? this.play() : this.pause());
    };
    a.prototype.handleTechTap_ = function() {
      this.userActive(!this.userActive());
    };
    a.prototype.handleTechTouchStart_ = function() {
      this.userWasActive = this.userActive();
    };
    a.prototype.handleTechTouchMove_ = function() {
      this.userWasActive && this.reportUserActivity();
    };
    a.prototype.handleTechTouchEnd_ = function(a) {
      a.preventDefault();
    };
    a.prototype.handleFullscreenChange_ = function() {
      this.isFullscreen() ? this.addClass("vjs-fullscreen") : this.removeClass("vjs-fullscreen");
    };
    a.prototype.handleStageClick_ = function() {
      this.reportUserActivity();
    };
    a.prototype.handleTechFullscreenChange_ = function(a, c) {
      c && this.isFullscreen(c.isFullscreen);
      this.trigger("fullscreenchange");
    };
    a.prototype.handleTechError_ = function() {
      var a = this.tech_.error();
      this.error(a);
    };
    a.prototype.handleTechTextData_ = function() {
      var a = null;
      1 < arguments.length && (a = arguments[1]);
      this.trigger("textdata", a);
    };
    a.prototype.getCache = function() {
      return this.cache_;
    };
    a.prototype.techCall_ = function(a, c) {
      if (this.tech_ && !this.tech_.isReady_) {
        this.tech_.ready(function() {
          this[a](c);
        }, !0);
      } else {
        try {
          if (this.tech_) {
            this.tech_[a](c);
          }
        } catch (f) {
          throw D(f), f;
        }
      }
    };
    a.prototype.techGet_ = function(a) {
      if (this.tech_ && this.tech_.isReady_) {
        try {
          return this.tech_[a]();
        } catch (d) {
          throw void 0 === this.tech_[a] ? D("Video.js: " + a + " method not defined for " + this.techName_ + " playback technology.", d) : "TypeError" === d.name ? (D("Video.js: " + a + " unavailable on " + this.techName_ + " playback technology element.", d), this.tech_.isReady_ = !1) : D(d), d;
        }
      }
    };
    a.prototype.play = function() {
      if (this.src() || this.currentSrc()) {
        this.techCall_("play");
      } else {
        this.tech_.one("loadstart", function() {
          this.play();
        });
      }
      return this;
    };
    a.prototype.pause = function() {
      this.techCall_("pause");
      return this;
    };
    a.prototype.paused = function() {
      return !1 === this.techGet_("paused") ? !1 : !0;
    };
    a.prototype.scrubbing = function(a) {
      return void 0 !== a ? (this.scrubbing_ = !!a, a ? this.addClass("vjs-scrubbing") : this.removeClass("vjs-scrubbing"), this) : this.scrubbing_;
    };
    a.prototype.currentTime = function(a) {
      if (void 0 !== a) {
        return this.techCall_("setCurrentTime", a), this;
      }
      this.cache_.currentTime = this.techGet_("currentTime") || 0;
      return this.cache_.currentTime;
    };
    a.prototype.duration = function(a) {
      if (void 0 === a) {
        return this.cache_.duration || 0;
      }
      a = parseFloat(a) || 0;
      0 > a && (a = Infinity);
      a !== this.cache_.duration && (this.cache_.duration = a, Infinity === a ? this.addClass("vjs-live") : this.removeClass("vjs-live"), this.trigger("durationchange"));
      return this;
    };
    a.prototype.remainingTime = function() {
      return this.duration() - this.currentTime();
    };
    a.prototype.buffered = function() {
      var a = this.techGet_("buffered");
      a && a.length || (a = fa(0, 0));
      return a;
    };
    a.prototype.bufferedPercent = function() {
      return Tb(this.buffered(), this.duration());
    };
    a.prototype.bufferedEnd = function() {
      var a = this.buffered(), c = this.duration(), a = a.end(a.length - 1);
      a > c && (a = c);
      return a;
    };
    a.prototype.volume = function(a) {
      if (void 0 !== a) {
        return a = Math.max(0, Math.min(1, parseFloat(a))), this.cache_.volume = a, this.techCall_("setVolume", a), this;
      }
      a = parseFloat(this.techGet_("volume"));
      return isNaN(a) ? 1 : a;
    };
    a.prototype.muted = function(a) {
      return void 0 !== a ? (this.techCall_("setMuted", a), this) : this.techGet_("muted") || !1;
    };
    a.prototype.supportsFullScreen = function() {
      return this.techGet_("supportsFullScreen") || !1;
    };
    a.prototype.isFullscreen = function(a) {
      return void 0 !== a ? (this.isFullscreen_ = !!a, this) : !!this.isFullscreen_;
    };
    a.prototype.requestFullscreen = function() {
      this.isFullscreen(!0);
      ka.requestFullscreen ? (Y(w, ka.fullscreenchange, y(this, function d(a) {
        this.isFullscreen(w[ka.fullscreenElement]);
        !1 === this.isFullscreen() && ea(w, ka.fullscreenchange, d);
        this.trigger("fullscreenchange");
      })), this.el_[ka.requestFullscreen]()) : this.tech_.supportsFullScreen() ? this.techCall_("enterFullScreen") : (this.enterFullWindow(), this.trigger("fullscreenchange"));
      return this;
    };
    a.prototype.exitFullscreen = function() {
      this.isFullscreen(!1);
      if (ka.requestFullscreen) {
        w[ka.exitFullscreen]();
      } else {
        this.tech_.supportsFullScreen() ? this.techCall_("exitFullScreen") : (this.exitFullWindow(), this.trigger("fullscreenchange"));
      }
      return this;
    };
    a.prototype.enterFullWindow = function() {
      this.isFullWindow = !0;
      this.docOrigOverflow = w.documentElement.style.overflow;
      Y(w, "keydown", y(this, this.fullWindowOnEscKey));
      w.documentElement.style.overflow = "hidden";
      H(w.body, "vjs-full-window");
      this.trigger("enterFullWindow");
    };
    a.prototype.fullWindowOnEscKey = function(a) {
      27 === a.keyCode && (!0 === this.isFullscreen() ? this.exitFullscreen() : this.exitFullWindow());
    };
    a.prototype.exitFullWindow = function() {
      this.isFullWindow = !1;
      ea(w, "keydown", this.fullWindowOnEscKey);
      w.documentElement.style.overflow = this.docOrigOverflow;
      Ca(w.body, "vjs-full-window");
      this.trigger("exitFullWindow");
    };
    a.prototype.canPlayType = function(a) {
      for (var b, c = 0, g = this.options_.techOrder;c < g.length;c++) {
        b = O(g[c]);
        var e = I.getTech(b);
        e || (e = n.getComponent(b));
        if (!e) {
          D.error('The "' + b + '" tech is undefined. Skipped browser support check for that tech.');
        } else {
          if (e.isSupported() && (b = e.canPlayType(a))) {
            return b;
          }
        }
      }
      return "";
    };
    a.prototype.selectSource = function(a) {
      var b = this, c = this.options_.techOrder.map(O).map(function(a) {
        return [a, I.getTech(a) || n.getComponent(a)];
      }).filter(function(a) {
        var b = a[0];
        if (a = a[1]) {
          return a.isSupported();
        }
        D.error('The "' + b + '" tech is undefined. Skipped browser support check for that tech.');
        return !1;
      }), g = function(a, b, c) {
        var d;
        a.some(function(a) {
          return b.some(function(b) {
            if (d = c(a, b)) {
              return !0;
            }
          });
        });
        return d;
      }, e = function(a) {
        return function(b, c) {
          return a(c, b);
        };
      }, h = function(a, c) {
        var d = a[0];
        if (a[1].canPlaySource(c, b.options_[d.toLowerCase()])) {
          return {source:c, tech:d};
        }
      };
      return (this.options_.sourceOrder ? g(a, c, e(h)) : g(c, a, h)) || !1;
    };
    a.prototype.src = function(a) {
      if (void 0 === a) {
        return this.techGet_("src");
      }
      var b = I.getTech(this.techName_);
      b || (b = n.getComponent(this.techName_));
      Array.isArray(a) ? this.sourceList_(a) : "string" === typeof a ? this.src({src:a}) : a instanceof Object && (a.type && !b.canPlaySource(a, this.options_[this.techName_.toLowerCase()]) ? this.sourceList_([a]) : (this.cache_.sources = null, this.cache_.source = a, this.cache_.src = a.src, this.currentType_ = a.type || "", this.ready(function() {
        b.prototype.hasOwnProperty("setSource") ? this.techCall_("setSource", a) : this.techCall_("src", a.src);
        "auto" === this.options_.preload && this.load();
        this.options_.autoplay && this.play();
      }, !0)));
      return this;
    };
    a.prototype.sourceList_ = function(a) {
      var b = this.selectSource(a);
      b ? (b.tech === this.techName_ ? this.src(b.source) : this.loadTech_(b.tech, b.source), this.cache_.sources = a) : (this.setTimeout(function() {
        this.error({code:4, message:this.localize(this.options_.notSupportedMessage)});
      }, 0), this.triggerReady());
    };
    a.prototype.load = function() {
      this.techCall_("load");
      return this;
    };
    a.prototype.reset = function() {
      this.loadTech_(O(this.options_.techOrder[0]), null);
      this.techCall_("reset");
      return this;
    };
    a.prototype.currentSources = function() {
      var a = this.currentSource(), c = [];
      0 !== Object.keys(a).length && c.push(a);
      return this.cache_.sources || c;
    };
    a.prototype.currentSource = function() {
      var a = {}, c = this.currentSrc();
      c && (a.src = c);
      return this.cache_.source || a;
    };
    a.prototype.currentSrc = function() {
      return this.techGet_("currentSrc") || this.cache_.src || "";
    };
    a.prototype.currentType = function() {
      return this.currentType_ || "";
    };
    a.prototype.preload = function(a) {
      return void 0 !== a ? (this.techCall_("setPreload", a), this.options_.preload = a, this) : this.techGet_("preload");
    };
    a.prototype.autoplay = function(a) {
      return void 0 !== a ? (this.techCall_("setAutoplay", a), this.options_.autoplay = a, this) : this.techGet_("autoplay", a);
    };
    a.prototype.loop = function(a) {
      return void 0 !== a ? (this.techCall_("setLoop", a), this.options_.loop = a, this) : this.techGet_("loop");
    };
    a.prototype.poster = function(a) {
      if (void 0 === a) {
        return this.poster_;
      }
      a || (a = "");
      this.poster_ = a;
      this.techCall_("setPoster", a);
      this.trigger("posterchange");
      return this;
    };
    a.prototype.handleTechPosterChange_ = function() {
      !this.poster_ && this.tech_ && this.tech_.poster && (this.poster_ = this.tech_.poster() || "", this.trigger("posterchange"));
    };
    a.prototype.controls = function(a) {
      return void 0 !== a ? (a = !!a, this.controls_ !== a && (this.controls_ = a, this.usingNativeControls() && this.techCall_("setControls", a), a ? (this.removeClass("vjs-controls-disabled"), this.addClass("vjs-controls-enabled"), this.trigger("controlsenabled"), this.usingNativeControls() || this.addTechControlsListeners_()) : (this.removeClass("vjs-controls-enabled"), this.addClass("vjs-controls-disabled"), this.trigger("controlsdisabled"), this.usingNativeControls() || this.removeTechControlsListeners_())), 
      this) : !!this.controls_;
    };
    a.prototype.usingNativeControls = function(a) {
      return void 0 !== a ? (a = !!a, this.usingNativeControls_ !== a && ((this.usingNativeControls_ = a) ? (this.addClass("vjs-using-native-controls"), this.trigger("usingnativecontrols")) : (this.removeClass("vjs-using-native-controls"), this.trigger("usingcustomcontrols"))), this) : !!this.usingNativeControls_;
    };
    a.prototype.error = function(a) {
      if (void 0 === a) {
        return this.error_ || null;
      }
      if (null === a) {
        return this.error_ = a, this.removeClass("vjs-error"), this.errorDisplay && this.errorDisplay.close(), this;
      }
      this.error_ = new S(a);
      this.addClass("vjs-error");
      D.error("(CODE:" + this.error_.code + " " + S.errorTypes[this.error_.code] + ")", this.error_.message, this.error_);
      this.trigger("error");
      return this;
    };
    a.prototype.reportUserActivity = function(a) {
      this.userActivity_ = !0;
    };
    a.prototype.userActive = function(a) {
      if (void 0 !== a) {
        a = !!a;
        if (a !== this.userActive_) {
          if (this.userActive_ = a) {
            this.userActivity_ = !0, this.removeClass("vjs-user-inactive"), this.addClass("vjs-user-active"), this.trigger("useractive");
          } else {
            this.userActivity_ = !1;
            if (this.tech_) {
              this.tech_.one("mousemove", function(a) {
                a.stopPropagation();
                a.preventDefault();
              });
            }
            this.removeClass("vjs-user-active");
            this.addClass("vjs-user-inactive");
            this.trigger("userinactive");
          }
        }
        return this;
      }
      return this.userActive_;
    };
    a.prototype.listenForUserActivity_ = function() {
      var a, c, f, g = y(this, this.reportUserActivity);
      this.on("mousedown", function() {
        g();
        this.clearInterval(a);
        a = this.setInterval(g, 250);
      });
      this.on("mousemove", function(a) {
        if (a.screenX !== c || a.screenY !== f) {
          c = a.screenX, f = a.screenY, g();
        }
      });
      this.on("mouseup", function(b) {
        g();
        this.clearInterval(a);
      });
      this.on("keydown", g);
      this.on("keyup", g);
      var e;
      this.setInterval(function() {
        if (this.userActivity_) {
          this.userActivity_ = !1;
          this.userActive(!0);
          this.clearTimeout(e);
          var a = this.options_.inactivityTimeout;
          0 < a && (e = this.setTimeout(function() {
            this.userActivity_ || this.userActive(!1);
          }, a));
        }
      }, 250);
    };
    a.prototype.playbackRate = function(a) {
      return void 0 !== a ? (this.techCall_("setPlaybackRate", a), this) : this.tech_ && this.tech_.featuresPlaybackRate ? this.techGet_("playbackRate") : 1;
    };
    a.prototype.isAudio = function(a) {
      return void 0 !== a ? (this.isAudio_ = !!a, this) : !!this.isAudio_;
    };
    a.prototype.videoTracks = function() {
      return this.tech_ ? this.tech_.videoTracks() : this.videoTracks_ = this.videoTracks_ || new wc;
    };
    a.prototype.audioTracks = function() {
      return this.tech_ ? this.tech_.audioTracks() : this.audioTracks_ = this.audioTracks_ || new xc;
    };
    a.prototype.textTracks = function() {
      if (this.tech_) {
        return this.tech_.textTracks();
      }
    };
    a.prototype.remoteTextTracks = function() {
      if (this.tech_) {
        return this.tech_.remoteTextTracks();
      }
    };
    a.prototype.remoteTextTrackEls = function() {
      if (this.tech_) {
        return this.tech_.remoteTextTrackEls();
      }
    };
    a.prototype.addTextTrack = function(a, c, f) {
      if (this.tech_) {
        return this.tech_.addTextTrack(a, c, f);
      }
    };
    a.prototype.addRemoteTextTrack = function(a, c) {
      if (this.tech_) {
        return this.tech_.addRemoteTextTrack(a, c);
      }
    };
    a.prototype.removeRemoteTextTrack = function(a) {
      var b = (void 0 === a ? {} : a).track;
      if (this.tech_) {
        return this.tech_.removeRemoteTextTrack(void 0 === b ? a : b);
      }
    };
    a.prototype.videoWidth = function() {
      return this.tech_ && this.tech_.videoWidth && this.tech_.videoWidth() || 0;
    };
    a.prototype.videoHeight = function() {
      return this.tech_ && this.tech_.videoHeight && this.tech_.videoHeight() || 0;
    };
    a.prototype.language = function(a) {
      if (void 0 === a) {
        return this.language_;
      }
      this.language_ = String(a).toLowerCase();
      return this;
    };
    a.prototype.languages = function() {
      return P(a.prototype.options_.languages, this.languages_);
    };
    a.prototype.toJSON = function() {
      var a = P(this.options_), c = a.tracks;
      a.tracks = [];
      for (var f = 0;f < c.length;f++) {
        var e = c[f], e = P(e);
        e.player = void 0;
        a.tracks[f] = e;
      }
      return a;
    };
    a.prototype.createModal = function(a, c) {
      var b = this;
      c = c || {};
      c.content = a || "";
      var d = new Fa(this, c);
      this.addChild(d);
      d.on("dispose", function() {
        b.removeChild(d);
      });
      return d.open();
    };
    a.getTagSettings = function(a) {
      var b = {sources:[], tracks:[]}, c = K(a), e = c["data-setup"];
      Ba(a, "vjs-fluid") && (c.fluid = !0);
      if (null !== e) {
        var h, z = null;
        try {
          h = JSON.parse(e || "{}", void 0);
        } catch (Rb) {
          z = Rb;
        }
        h = [z, h];
        e = h[0];
        h = h[1];
        e && D.error(e);
        A(c, h);
      }
      A(b, c);
      if (a.hasChildNodes()) {
        for (a = a.childNodes, c = 0, e = a.length;c < e;c++) {
          h = a[c], z = h.nodeName.toLowerCase(), "source" === z ? b.sources.push(K(h)) : "track" === z && b.tracks.push(K(h));
        }
      }
      return b;
    };
    a.prototype.flexNotSupported_ = function() {
      var a = w.createElement("i");
      return !("flexBasis" in a.style || "webkitFlexBasis" in a.style || "mozFlexBasis" in a.style || "msFlexBasis" in a.style || "msFlexOrder" in a.style);
    };
    return a;
  }(n);
  ba.players = {};
  var Ia = q.navigator;
  ba.prototype.options_ = {techOrder:["html5", "flash"], html5:{}, flash:{}, defaultVolume:0, inactivityTimeout:2E3, playbackRates:[], children:"mediaLoader posterImage textTrackDisplay loadingSpinner bigPlayButton controlBar errorDisplay textTrackSettings".split(" "), language:Ia && (Ia.languages && Ia.languages[0] || Ia.userLanguage || Ia.language) || "en", languages:{}, notSupportedMessage:"No compatible source was found for this media."};
  ["ended", "seeking", "seekable", "networkState", "readyState"].forEach(function(c) {
    ba.prototype[c] = function() {
      return this.techGet_(c);
    };
  });
  Yc.forEach(function(c) {
    ba.prototype["handleTech" + O(c) + "_"] = function() {
      return this.trigger(c);
    };
  });
  n.registerComponent("Player", ba);
  var Ud = function(c) {
    function a(b) {
      void 0 === b && (b = {});
      b = P(b, {kind:qd[b.kind] || ""});
      var d = c.call(this, b) || this, f = !1;
      if (T) {
        for (var e in a.prototype) {
          "constructor" !== e && (d[e] = a.prototype[e]);
        }
      }
      Object.defineProperty(d, "enabled", {get:function() {
        return f;
      }, set:function(a) {
        "boolean" === typeof a && a !== f && (f = a, this.trigger("enabledchange"));
      }});
      b.enabled && (d.enabled = b.enabled);
      d.loaded_ = !0;
      return d;
    }
    __extends(a, c);
    return a;
  }(ob), Vd = function(c) {
    function a(b) {
      void 0 === b && (b = {});
      b = P(b, {kind:pd[b.kind] || ""});
      var d = c.call(this, b) || this, f = !1;
      if (T) {
        for (var e in a.prototype) {
          "constructor" !== e && (d[e] = a.prototype[e]);
        }
      }
      Object.defineProperty(d, "selected", {get:function() {
        return f;
      }, set:function(a) {
        "boolean" === typeof a && a !== f && (f = a, this.trigger("selectedchange"));
      }});
      b.selected && (d.selected = b.selected);
      return d;
    }
    __extends(a, c);
    return a;
  }(ob), Wd = function(c, a) {
    if ("function" !== typeof a && null !== a) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof a);
    }
    c.prototype = Object.create(a && a.prototype, {constructor:{value:c, enumerable:!1, writable:!0, configurable:!0}});
    a && (c.super_ = a);
  };
  "undefined" === typeof HTMLVideoElement && q.document && q.document.createElement && (w.createElement("video"), w.createElement("audio"), w.createElement("track"));
  t.hooks_ = {};
  t.hooks = function(c, a) {
    t.hooks_[c] = t.hooks_[c] || [];
    a && (t.hooks_[c] = t.hooks_[c].concat(a));
    return t.hooks_[c];
  };
  t.hook = function(c, a) {
    t.hooks(c, a);
  };
  t.removeHook = function(c, a) {
    a = t.hooks(c).indexOf(a);
    if (-1 >= a) {
      return !1;
    }
    t.hooks_[c] = t.hooks_[c].slice();
    t.hooks_[c].splice(a, 1);
    return !0;
  };
  if (!0 !== q.VIDEOJS_NO_DYNAMIC_STYLE) {
    var Xa = Ea(".vjs-styles-defaults");
    if (!Xa) {
      var Xa = lc("vjs-styles-defaults"), Jb = Ea("head");
      Jb && Jb.insertBefore(Xa, Jb.firstChild);
      mc(Xa, "\n      .video-js {\n        width: 300px;\n        height: 150px;\n      }\n\n      .vjs-fluid {\n        padding-top: 56.25%\n      }\n    ");
    }
  }
  t && (kc = t);
  setTimeout(mb, 1);
  t.VERSION = "5.14.1";
  t.options = ba.prototype.options_;
  t.getPlayers = function() {
    return ba.players;
  };
  t.players = ba.players;
  t.getComponent = n.getComponent;
  t.registerComponent = function(c, a) {
    I.isTech(a) && D.warn("The " + c + " tech was registered as a component. It should instead be registered using videojs.registerTech(name, tech)");
    n.registerComponent.call(n, c, a);
  };
  t.getTech = I.getTech;
  t.registerTech = I.registerTech;
  t.browser = ld;
  t.TOUCH_ENABLED = Pa;
  t.extend = function(c, a) {
    void 0 === a && (a = {});
    var b = function() {
      c.apply(this, arguments);
    }, d = {};
    W(a) ? ("function" === typeof a.init && (D.warn("Constructor logic via init() is deprecated; please use constructor() instead."), a.constructor = a.init), a.constructor !== Object.prototype.constructor && (b = a.constructor), d = a) : "function" === typeof a && (b = a);
    Wd(b, c);
    for (var f in d) {
      d.hasOwnProperty(f) && (b.prototype[f] = d[f]);
    }
    return b;
  };
  t.mergeOptions = P;
  t.bind = y;
  t.plugin = function(c, a) {
    ba.prototype[c] = a;
  };
  t.addLanguage = function(c, a) {
    c = ("" + c).toLowerCase();
    t.options.languages = P(t.options.languages, (b = {}, b[c] = a, b));
    return t.options.languages[c];
    var b;
  };
  t.log = D;
  t.createTimeRange = t.createTimeRanges = fa;
  t.formatTime = ja;
  t.parseUrl = qc;
  t.isCrossOrigin = pb;
  t.EventTarget = U;
  t.on = Y;
  t.one = Da;
  t.off = ea;
  t.trigger = Ja;
  t.xhr = ga;
  t.TextTrack = Sa;
  t.AudioTrack = Ud;
  t.VideoTrack = Vd;
  t.isEl = l;
  t.isTextNode = Ob;
  t.createEl = h;
  t.hasClass = Ba;
  t.addClass = H;
  t.removeClass = Ca;
  t.toggleClass = Mb;
  t.setAttributes = ab;
  t.getAttributes = K;
  t.emptyEl = bb;
  t.appendContent = $a;
  t.insertContent = Pb;
  t.computedStyle = ta;
  "function" === typeof define && define.amd ? define("videojs", [], function() {
    return t;
  }) : "object" === typeof exports && "object" === typeof module && (module.exports = t);
  return t;
}();
(function(k) {
  var m = k.vttjs = {}, r = m.VTTCue, p = m.VTTRegion, B = k.VTTCue, aa = k.VTTRegion;
  m.shim = function() {
    m.VTTCue = r;
    m.VTTRegion = p;
  };
  m.restore = function() {
    m.VTTCue = B;
    m.VTTRegion = aa;
  };
})(this);
(function(k, m) {
  function r(k) {
    return "string" !== typeof k ? !1 : ca[k.toLowerCase()] ? k.toLowerCase() : !1;
  }
  function p(k) {
    for (var m = 1;m < arguments.length;m++) {
      var p = arguments[m], r;
      for (r in p) {
        k[r] = p[r];
      }
    }
    return k;
  }
  function B(k, m, u) {
    var x = this, B = /MSIE\s8\.0/.test(navigator.userAgent), C = {};
    B ? x = document.createElement("custom") : C.enumerable = !0;
    x.hasBeenReset = !1;
    var J = "", ca = !1, A = k, W = m, ha = u, e = null, l = "", M = !0, na = "auto", h = "start", oa = 50, sa = "middle", ia = 50, E = "middle";
    Object.defineProperty(x, "id", p({}, C, {get:function() {
      return J;
    }, set:function(e) {
      J = "" + e;
    }}));
    Object.defineProperty(x, "pauseOnExit", p({}, C, {get:function() {
      return ca;
    }, set:function(e) {
      ca = !!e;
    }}));
    Object.defineProperty(x, "startTime", p({}, C, {get:function() {
      return A;
    }, set:function(e) {
      if ("number" !== typeof e) {
        throw new TypeError("Start time must be set to a number.");
      }
      A = e;
      this.hasBeenReset = !0;
    }}));
    Object.defineProperty(x, "endTime", p({}, C, {get:function() {
      return W;
    }, set:function(e) {
      if ("number" !== typeof e) {
        throw new TypeError("End time must be set to a number.");
      }
      W = e;
      this.hasBeenReset = !0;
    }}));
    Object.defineProperty(x, "text", p({}, C, {get:function() {
      return ha;
    }, set:function(e) {
      ha = "" + e;
      this.hasBeenReset = !0;
    }}));
    Object.defineProperty(x, "region", p({}, C, {get:function() {
      return e;
    }, set:function(h) {
      e = h;
      this.hasBeenReset = !0;
    }}));
    Object.defineProperty(x, "vertical", p({}, C, {get:function() {
      return l;
    }, set:function(e) {
      e = "string" !== typeof e ? !1 : aa[e.toLowerCase()] ? e.toLowerCase() : !1;
      if (!1 === e) {
        throw new SyntaxError("An invalid or illegal string was specified.");
      }
      l = e;
      this.hasBeenReset = !0;
    }}));
    Object.defineProperty(x, "snapToLines", p({}, C, {get:function() {
      return M;
    }, set:function(e) {
      M = !!e;
      this.hasBeenReset = !0;
    }}));
    Object.defineProperty(x, "line", p({}, C, {get:function() {
      return na;
    }, set:function(e) {
      if ("number" !== typeof e && "auto" !== e) {
        throw new SyntaxError("An invalid number or illegal string was specified.");
      }
      na = e;
      this.hasBeenReset = !0;
    }}));
    Object.defineProperty(x, "lineAlign", p({}, C, {get:function() {
      return h;
    }, set:function(e) {
      e = r(e);
      if (!e) {
        throw new SyntaxError("An invalid or illegal string was specified.");
      }
      h = e;
      this.hasBeenReset = !0;
    }}));
    Object.defineProperty(x, "position", p({}, C, {get:function() {
      return oa;
    }, set:function(e) {
      if (0 > e || 100 < e) {
        throw Error("Position must be between 0 and 100.");
      }
      oa = e;
      this.hasBeenReset = !0;
    }}));
    Object.defineProperty(x, "positionAlign", p({}, C, {get:function() {
      return sa;
    }, set:function(e) {
      e = r(e);
      if (!e) {
        throw new SyntaxError("An invalid or illegal string was specified.");
      }
      sa = e;
      this.hasBeenReset = !0;
    }}));
    Object.defineProperty(x, "size", p({}, C, {get:function() {
      return ia;
    }, set:function(e) {
      if (0 > e || 100 < e) {
        throw Error("Size must be between 0 and 100.");
      }
      ia = e;
      this.hasBeenReset = !0;
    }}));
    Object.defineProperty(x, "align", p({}, C, {get:function() {
      return E;
    }, set:function(e) {
      e = r(e);
      if (!e) {
        throw new SyntaxError("An invalid or illegal string was specified.");
      }
      E = e;
      this.hasBeenReset = !0;
    }}));
    x.displayState = void 0;
    if (B) {
      return x;
    }
  }
  var aa = {"":!0, lr:!0, rl:!0}, ca = {start:!0, middle:!0, end:!0, left:!0, right:!0};
  B.prototype.getCueAsHTML = function() {
    return WebVTT.convertCueToDOMTree(window, this.text);
  };
  k.VTTCue = k.VTTCue || B;
  m.VTTCue = B;
})(this, this.vttjs || {});
(function(k, m) {
  function r(k) {
    return "number" === typeof k && 0 <= k && 100 >= k;
  }
  function p() {
    var k = 100, m = 3, p = 0, J = 100, u = 0, x = 100, R = "";
    Object.defineProperties(this, {width:{enumerable:!0, get:function() {
      return k;
    }, set:function(m) {
      if (!r(m)) {
        throw Error("Width must be between 0 and 100.");
      }
      k = m;
    }}, lines:{enumerable:!0, get:function() {
      return m;
    }, set:function(k) {
      if ("number" !== typeof k) {
        throw new TypeError("Lines must be set to a number.");
      }
      m = k;
    }}, regionAnchorY:{enumerable:!0, get:function() {
      return J;
    }, set:function(k) {
      if (!r(k)) {
        throw Error("RegionAnchorX must be between 0 and 100.");
      }
      J = k;
    }}, regionAnchorX:{enumerable:!0, get:function() {
      return p;
    }, set:function(k) {
      if (!r(k)) {
        throw Error("RegionAnchorY must be between 0 and 100.");
      }
      p = k;
    }}, viewportAnchorY:{enumerable:!0, get:function() {
      return x;
    }, set:function(k) {
      if (!r(k)) {
        throw Error("ViewportAnchorY must be between 0 and 100.");
      }
      x = k;
    }}, viewportAnchorX:{enumerable:!0, get:function() {
      return u;
    }, set:function(k) {
      if (!r(k)) {
        throw Error("ViewportAnchorX must be between 0 and 100.");
      }
      u = k;
    }}, scroll:{enumerable:!0, get:function() {
      return R;
    }, set:function(k) {
      k = "string" !== typeof k ? !1 : B[k.toLowerCase()] ? k.toLowerCase() : !1;
      if (!1 === k) {
        throw new SyntaxError("An invalid or illegal string was specified.");
      }
      R = k;
    }}});
  }
  var B = {"":!0, up:!0};
  k.VTTRegion = k.VTTRegion || p;
  m.VTTRegion = p;
})(this, this.vttjs || {});
(function(k) {
  function m(e, l) {
    this.name = "ParsingError";
    this.code = e.code;
    this.message = l || e.message;
  }
  function r(e) {
    e = e.match(/^(\d+):(\d{2})(:\d{2})?\.(\d{3})/);
    if (!e) {
      return null;
    }
    if (e[3]) {
      var l = e[3].replace(":", "");
      return 3600 * (e[1] | 0) + 60 * (e[2] | 0) + (l | 0) + (e[4] | 0) / 1E3;
    }
    return 59 < e[1] ? 3600 * (e[1] | 0) + 60 * (e[2] | 0) + 0 + (e[4] | 0) / 1E3 : 0 + 60 * (e[1] | 0) + (e[2] | 0) + (e[4] | 0) / 1E3;
  }
  function p() {
    this.values = C(null);
  }
  function B(e, l, k, m) {
    e = m ? e.split(m) : [e];
    for (var h in e) {
      "string" === typeof e[h] && (m = e[h].split(k), 2 === m.length && l(m[0], m[1]));
    }
  }
  function aa(e, l, k) {
    function x() {
      var h = r(e);
      if (null === h) {
        throw new m(m.Errors.BadTimeStamp, "Malformed timestamp: " + M);
      }
      e = e.replace(/^[^\sa-zA-Z-]+/, "");
      return h;
    }
    function h() {
      e = e.replace(/^\s+/, "");
    }
    var M = e;
    h();
    l.startTime = x();
    h();
    if ("--\x3e" !== e.substr(0, 3)) {
      throw new m(m.Errors.BadTimeStamp, "Malformed time stamp (time stamps must be separated by '--\x3e'): " + M);
    }
    e = e.substr(3);
    h();
    l.endTime = x();
    h();
    (function(e, h) {
      var l = new p;
      B(e, function(e, h) {
        switch(e) {
          case "region":
            for (var m = k.length - 1;0 <= m;m--) {
              if (k[m].id === h) {
                l.set(e, k[m].region);
                break;
              }
            }
            break;
          case "vertical":
            l.alt(e, h, ["rl", "lr"]);
            break;
          case "line":
            h = h.split(",");
            m = h[0];
            l.integer(e, m);
            l.percent(e, m) ? l.set("snapToLines", !1) : null;
            l.alt(e, m, ["auto"]);
            2 === h.length && l.alt("lineAlign", h[1], ["start", "middle", "end"]);
            break;
          case "position":
            h = h.split(",");
            l.percent(e, h[0]);
            2 === h.length && l.alt("positionAlign", h[1], ["start", "middle", "end"]);
            break;
          case "size":
            l.percent(e, h);
            break;
          case "align":
            l.alt(e, h, ["start", "middle", "end", "left", "right"]);
        }
      }, /:/, /\s/);
      h.region = l.get("region", null);
      h.vertical = l.get("vertical", "");
      h.line = l.get("line", "auto");
      h.lineAlign = l.get("lineAlign", "start");
      h.snapToLines = l.get("snapToLines", !0);
      h.size = l.get("size", 100);
      h.align = l.get("align", "middle");
      h.position = l.get("position", {start:0, left:0, middle:50, end:100, right:100}, h.align);
      h.positionAlign = l.get("positionAlign", {start:"start", left:"start", middle:"middle", end:"end", right:"end"}, h.align);
    })(e, l);
  }
  function ca(e, l) {
    function k() {
      if (!l) {
        return null;
      }
      var e = l.match(/^([^<]*)(<[^>]+>?)?/), e = e[1] ? e[1] : e[2];
      l = l.substr(e.length);
      return e;
    }
    function m(e) {
      return ma[e];
    }
    function h(e) {
      for (;H = e.match(/&(amp|lt|gt|lrm|rlm|nbsp);/);) {
        e = e.replace(H[0], m);
      }
      return e;
    }
    function p(h, l) {
      var k = Za[h];
      if (!k) {
        return null;
      }
      var m = e.document.createElement(k);
      m.localName = k;
      (h = A[h]) && l && (m[h] = l.trim());
      return m;
    }
    for (var x = e.document.createElement("div"), u = x, E, z = [];null !== (E = k());) {
      if ("<" === E[0]) {
        if ("/" === E[1]) {
          z.length && z[z.length - 1] === E.substr(2).replace(">", "") && (z.pop(), u = u.parentNode);
        } else {
          var B = r(E.substr(1, E.length - 2));
          if (B) {
            E = e.document.createProcessingInstruction("timestamp", B), u.appendChild(E);
          } else {
            var H = E.match(/^<([^.\s/0-9>]+)(\.[^\s\\>]+)?([^>\\]+)?(\\?)>?$/);
            H && (!(E = p(H[1], H[3])) || W[E.localName] && W[E.localName] !== u.localName || (H[2] && (E.className = H[2].substr(1).replace(".", " ")), z.push(H[1]), u.appendChild(E), u = E));
          }
        }
      } else {
        u.appendChild(e.document.createTextNode(h(E)));
      }
    }
    return x;
  }
  function Ya(e) {
    function l(e, h) {
      for (var l = h.childNodes.length - 1;0 <= l;l--) {
        e.push(h.childNodes[l]);
      }
    }
    function k(e) {
      if (!e || !e.length) {
        return null;
      }
      var h = e.pop(), m = h.textContent || h.innerText;
      if (m) {
        return (h = m.match(/^.*(\n|\r)/)) ? (e.length = 0, h[0]) : m;
      }
      if ("ruby" === h.tagName) {
        return k(e);
      }
      if (h.childNodes) {
        return l(e, h), k(e);
      }
    }
    var m = [], h = "";
    if (!e || !e.childNodes) {
      return "ltr";
    }
    for (l(m, e);h = k(m);) {
      for (var p = 0;p < h.length;p++) {
        e = h.charCodeAt(p);
        for (var r = 0;r < ha.length;r++) {
          if (ha[r] === e) {
            return "rtl";
          }
        }
      }
    }
    return "ltr";
  }
  function J() {
  }
  function u(e, l, k) {
    var m = /MSIE\s8\.0/.test(navigator.userAgent), h = "rgba(255, 255, 255, 1)", p = "rgba(0, 0, 0, 0.8)";
    m && (h = "rgb(255, 255, 255)", p = "rgb(0, 0, 0)");
    this.cue = l;
    this.cueDiv = ca(e, l.text);
    h = {color:h, backgroundColor:p, position:"relative", left:0, right:0, top:0, bottom:0, display:"inline"};
    m || (h.writingMode = "" === l.vertical ? "horizontal-tb" : "lr" === l.vertical ? "vertical-lr" : "vertical-rl", h.unicodeBidi = "plaintext");
    this.applyStyles(h, this.cueDiv);
    this.div = e.document.createElement("div");
    h = {textAlign:"middle" === l.align ? "center" : l.align, font:k.font, whiteSpace:"pre-line", position:"absolute"};
    m || (h.direction = Ya(this.cueDiv), h.writingMode = "" === l.vertical ? "horizontal-tb" : "lr" === l.vertical ? "vertical-lr" : "vertical-rl".stylesunicodeBidi = "plaintext");
    this.applyStyles(h);
    this.div.appendChild(this.cueDiv);
    e = 0;
    switch(l.positionAlign) {
      case "start":
        e = l.position;
        break;
      case "middle":
        e = l.position - l.size / 2;
        break;
      case "end":
        e = l.position - l.size;
    }
    "" === l.vertical ? this.applyStyles({left:this.formatStyle(e, "%"), width:this.formatStyle(l.size, "%")}) : this.applyStyles({top:this.formatStyle(e, "%"), height:this.formatStyle(l.size, "%")});
    this.move = function(e) {
      this.applyStyles({top:this.formatStyle(e.top, "px"), bottom:this.formatStyle(e.bottom, "px"), left:this.formatStyle(e.left, "px"), right:this.formatStyle(e.right, "px"), height:this.formatStyle(e.height, "px"), width:this.formatStyle(e.width, "px")});
    };
  }
  function x(e) {
    var l = /MSIE\s8\.0/.test(navigator.userAgent), k, m, h, p;
    if (e.div) {
      m = e.div.offsetHeight;
      h = e.div.offsetWidth;
      p = e.div.offsetTop;
      var r = (r = e.div.childNodes) && (r = r[0]) && r.getClientRects && r.getClientRects();
      e = e.div.getBoundingClientRect();
      k = r ? Math.max(r[0] && r[0].height || 0, e.height / r.length) : 0;
    }
    this.left = e.left;
    this.right = e.right;
    this.top = e.top || p;
    this.height = e.height || m;
    this.bottom = e.bottom || p + (e.height || m);
    this.width = e.width || h;
    this.lineHeight = void 0 !== k ? k : e.lineHeight;
    l && !this.lineHeight && (this.lineHeight = 13);
  }
  function R() {
  }
  var C = Object.create || function() {
    function e() {
    }
    return function(l) {
      if (1 !== arguments.length) {
        throw Error("Object.create shim only accepts one parameter.");
      }
      e.prototype = l;
      return new e;
    };
  }();
  m.prototype = C(Error.prototype);
  m.prototype.constructor = m;
  m.Errors = {BadSignature:{code:0, message:"Malformed WebVTT signature."}, BadTimeStamp:{code:1, message:"Malformed time stamp."}};
  p.prototype = {set:function(e, l) {
    this.get(e) || "" === l || (this.values[e] = l);
  }, get:function(e, l, k) {
    return k ? this.has(e) ? this.values[e] : l[k] : this.has(e) ? this.values[e] : l;
  }, has:function(e) {
    return e in this.values;
  }, alt:function(e, l, k) {
    for (var m = 0;m < k.length;++m) {
      if (l === k[m]) {
        this.set(e, l);
        break;
      }
    }
  }, integer:function(e, l) {
    /^-?\d+$/.test(l) && this.set(e, parseInt(l, 10));
  }, percent:function(e, l) {
    return l.match(/^([\d]{1,3})(\.[\d]*)?%$/) && (l = parseFloat(l), 0 <= l && 100 >= l) ? (this.set(e, l), !0) : !1;
  }};
  var ma = {"&amp;":"&", "&lt;":"<", "&gt;":">", "&lrm;":"\u200e", "&rlm;":"\u200f", "&nbsp;":"\u00a0"}, Za = {c:"span", i:"i", b:"b", u:"u", ruby:"ruby", rt:"rt", v:"span", lang:"span"}, A = {v:"title", lang:"lang"}, W = {rt:"ruby"}, ha = [1470, 1472, 1475, 1478, 1488, 1489, 1490, 1491, 1492, 1493, 1494, 1495, 1496, 1497, 1498, 1499, 1500, 1501, 1502, 1503, 1504, 1505, 1506, 1507, 1508, 1509, 1510, 1511, 1512, 1513, 1514, 1520, 1521, 1522, 1523, 1524, 1544, 1547, 1549, 1563, 1566, 1567, 1568, 1569, 
  1570, 1571, 1572, 1573, 1574, 1575, 1576, 1577, 1578, 1579, 1580, 1581, 1582, 1583, 1584, 1585, 1586, 1587, 1588, 1589, 1590, 1591, 1592, 1593, 1594, 1595, 1596, 1597, 1598, 1599, 1600, 1601, 1602, 1603, 1604, 1605, 1606, 1607, 1608, 1609, 1610, 1645, 1646, 1647, 1649, 1650, 1651, 1652, 1653, 1654, 1655, 1656, 1657, 1658, 1659, 1660, 1661, 1662, 1663, 1664, 1665, 1666, 1667, 1668, 1669, 1670, 1671, 1672, 1673, 1674, 1675, 1676, 1677, 1678, 1679, 1680, 1681, 1682, 1683, 1684, 1685, 1686, 1687, 1688, 
  1689, 1690, 1691, 1692, 1693, 1694, 1695, 1696, 1697, 1698, 1699, 1700, 1701, 1702, 1703, 1704, 1705, 1706, 1707, 1708, 1709, 1710, 1711, 1712, 1713, 1714, 1715, 1716, 1717, 1718, 1719, 1720, 1721, 1722, 1723, 1724, 1725, 1726, 1727, 1728, 1729, 1730, 1731, 1732, 1733, 1734, 1735, 1736, 1737, 1738, 1739, 1740, 1741, 1742, 1743, 1744, 1745, 1746, 1747, 1748, 1749, 1765, 1766, 1774, 1775, 1786, 1787, 1788, 1789, 1790, 1791, 1792, 1793, 1794, 1795, 1796, 1797, 1798, 1799, 1800, 1801, 1802, 1803, 1804, 
  1805, 1807, 1808, 1810, 1811, 1812, 1813, 1814, 1815, 1816, 1817, 1818, 1819, 1820, 1821, 1822, 1823, 1824, 1825, 1826, 1827, 1828, 1829, 1830, 1831, 1832, 1833, 1834, 1835, 1836, 1837, 1838, 1839, 1869, 1870, 1871, 1872, 1873, 1874, 1875, 1876, 1877, 1878, 1879, 1880, 1881, 1882, 1883, 1884, 1885, 1886, 1887, 1888, 1889, 1890, 1891, 1892, 1893, 1894, 1895, 1896, 1897, 1898, 1899, 1900, 1901, 1902, 1903, 1904, 1905, 1906, 1907, 1908, 1909, 1910, 1911, 1912, 1913, 1914, 1915, 1916, 1917, 1918, 1919, 
  1920, 1921, 1922, 1923, 1924, 1925, 1926, 1927, 1928, 1929, 1930, 1931, 1932, 1933, 1934, 1935, 1936, 1937, 1938, 1939, 1940, 1941, 1942, 1943, 1944, 1945, 1946, 1947, 1948, 1949, 1950, 1951, 1952, 1953, 1954, 1955, 1956, 1957, 1969, 1984, 1985, 1986, 1987, 1988, 1989, 1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2E3, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2036, 2037, 
  2042, 2048, 2049, 2050, 2051, 2052, 2053, 2054, 2055, 2056, 2057, 2058, 2059, 2060, 2061, 2062, 2063, 2064, 2065, 2066, 2067, 2068, 2069, 2074, 2084, 2088, 2096, 2097, 2098, 2099, 2100, 2101, 2102, 2103, 2104, 2105, 2106, 2107, 2108, 2109, 2110, 2112, 2113, 2114, 2115, 2116, 2117, 2118, 2119, 2120, 2121, 2122, 2123, 2124, 2125, 2126, 2127, 2128, 2129, 2130, 2131, 2132, 2133, 2134, 2135, 2136, 2142, 2208, 2210, 2211, 2212, 2213, 2214, 2215, 2216, 2217, 2218, 2219, 2220, 8207, 64285, 64287, 64288, 
  64289, 64290, 64291, 64292, 64293, 64294, 64295, 64296, 64298, 64299, 64300, 64301, 64302, 64303, 64304, 64305, 64306, 64307, 64308, 64309, 64310, 64312, 64313, 64314, 64315, 64316, 64318, 64320, 64321, 64323, 64324, 64326, 64327, 64328, 64329, 64330, 64331, 64332, 64333, 64334, 64335, 64336, 64337, 64338, 64339, 64340, 64341, 64342, 64343, 64344, 64345, 64346, 64347, 64348, 64349, 64350, 64351, 64352, 64353, 64354, 64355, 64356, 64357, 64358, 64359, 64360, 64361, 64362, 64363, 64364, 64365, 64366, 
  64367, 64368, 64369, 64370, 64371, 64372, 64373, 64374, 64375, 64376, 64377, 64378, 64379, 64380, 64381, 64382, 64383, 64384, 64385, 64386, 64387, 64388, 64389, 64390, 64391, 64392, 64393, 64394, 64395, 64396, 64397, 64398, 64399, 64400, 64401, 64402, 64403, 64404, 64405, 64406, 64407, 64408, 64409, 64410, 64411, 64412, 64413, 64414, 64415, 64416, 64417, 64418, 64419, 64420, 64421, 64422, 64423, 64424, 64425, 64426, 64427, 64428, 64429, 64430, 64431, 64432, 64433, 64434, 64435, 64436, 64437, 64438, 
  64439, 64440, 64441, 64442, 64443, 64444, 64445, 64446, 64447, 64448, 64449, 64467, 64468, 64469, 64470, 64471, 64472, 64473, 64474, 64475, 64476, 64477, 64478, 64479, 64480, 64481, 64482, 64483, 64484, 64485, 64486, 64487, 64488, 64489, 64490, 64491, 64492, 64493, 64494, 64495, 64496, 64497, 64498, 64499, 64500, 64501, 64502, 64503, 64504, 64505, 64506, 64507, 64508, 64509, 64510, 64511, 64512, 64513, 64514, 64515, 64516, 64517, 64518, 64519, 64520, 64521, 64522, 64523, 64524, 64525, 64526, 64527, 
  64528, 64529, 64530, 64531, 64532, 64533, 64534, 64535, 64536, 64537, 64538, 64539, 64540, 64541, 64542, 64543, 64544, 64545, 64546, 64547, 64548, 64549, 64550, 64551, 64552, 64553, 64554, 64555, 64556, 64557, 64558, 64559, 64560, 64561, 64562, 64563, 64564, 64565, 64566, 64567, 64568, 64569, 64570, 64571, 64572, 64573, 64574, 64575, 64576, 64577, 64578, 64579, 64580, 64581, 64582, 64583, 64584, 64585, 64586, 64587, 64588, 64589, 64590, 64591, 64592, 64593, 64594, 64595, 64596, 64597, 64598, 64599, 
  64600, 64601, 64602, 64603, 64604, 64605, 64606, 64607, 64608, 64609, 64610, 64611, 64612, 64613, 64614, 64615, 64616, 64617, 64618, 64619, 64620, 64621, 64622, 64623, 64624, 64625, 64626, 64627, 64628, 64629, 64630, 64631, 64632, 64633, 64634, 64635, 64636, 64637, 64638, 64639, 64640, 64641, 64642, 64643, 64644, 64645, 64646, 64647, 64648, 64649, 64650, 64651, 64652, 64653, 64654, 64655, 64656, 64657, 64658, 64659, 64660, 64661, 64662, 64663, 64664, 64665, 64666, 64667, 64668, 64669, 64670, 64671, 
  64672, 64673, 64674, 64675, 64676, 64677, 64678, 64679, 64680, 64681, 64682, 64683, 64684, 64685, 64686, 64687, 64688, 64689, 64690, 64691, 64692, 64693, 64694, 64695, 64696, 64697, 64698, 64699, 64700, 64701, 64702, 64703, 64704, 64705, 64706, 64707, 64708, 64709, 64710, 64711, 64712, 64713, 64714, 64715, 64716, 64717, 64718, 64719, 64720, 64721, 64722, 64723, 64724, 64725, 64726, 64727, 64728, 64729, 64730, 64731, 64732, 64733, 64734, 64735, 64736, 64737, 64738, 64739, 64740, 64741, 64742, 64743, 
  64744, 64745, 64746, 64747, 64748, 64749, 64750, 64751, 64752, 64753, 64754, 64755, 64756, 64757, 64758, 64759, 64760, 64761, 64762, 64763, 64764, 64765, 64766, 64767, 64768, 64769, 64770, 64771, 64772, 64773, 64774, 64775, 64776, 64777, 64778, 64779, 64780, 64781, 64782, 64783, 64784, 64785, 64786, 64787, 64788, 64789, 64790, 64791, 64792, 64793, 64794, 64795, 64796, 64797, 64798, 64799, 64800, 64801, 64802, 64803, 64804, 64805, 64806, 64807, 64808, 64809, 64810, 64811, 64812, 64813, 64814, 64815, 
  64816, 64817, 64818, 64819, 64820, 64821, 64822, 64823, 64824, 64825, 64826, 64827, 64828, 64829, 64848, 64849, 64850, 64851, 64852, 64853, 64854, 64855, 64856, 64857, 64858, 64859, 64860, 64861, 64862, 64863, 64864, 64865, 64866, 64867, 64868, 64869, 64870, 64871, 64872, 64873, 64874, 64875, 64876, 64877, 64878, 64879, 64880, 64881, 64882, 64883, 64884, 64885, 64886, 64887, 64888, 64889, 64890, 64891, 64892, 64893, 64894, 64895, 64896, 64897, 64898, 64899, 64900, 64901, 64902, 64903, 64904, 64905, 
  64906, 64907, 64908, 64909, 64910, 64911, 64914, 64915, 64916, 64917, 64918, 64919, 64920, 64921, 64922, 64923, 64924, 64925, 64926, 64927, 64928, 64929, 64930, 64931, 64932, 64933, 64934, 64935, 64936, 64937, 64938, 64939, 64940, 64941, 64942, 64943, 64944, 64945, 64946, 64947, 64948, 64949, 64950, 64951, 64952, 64953, 64954, 64955, 64956, 64957, 64958, 64959, 64960, 64961, 64962, 64963, 64964, 64965, 64966, 64967, 65008, 65009, 65010, 65011, 65012, 65013, 65014, 65015, 65016, 65017, 65018, 65019, 
  65020, 65136, 65137, 65138, 65139, 65140, 65142, 65143, 65144, 65145, 65146, 65147, 65148, 65149, 65150, 65151, 65152, 65153, 65154, 65155, 65156, 65157, 65158, 65159, 65160, 65161, 65162, 65163, 65164, 65165, 65166, 65167, 65168, 65169, 65170, 65171, 65172, 65173, 65174, 65175, 65176, 65177, 65178, 65179, 65180, 65181, 65182, 65183, 65184, 65185, 65186, 65187, 65188, 65189, 65190, 65191, 65192, 65193, 65194, 65195, 65196, 65197, 65198, 65199, 65200, 65201, 65202, 65203, 65204, 65205, 65206, 65207, 
  65208, 65209, 65210, 65211, 65212, 65213, 65214, 65215, 65216, 65217, 65218, 65219, 65220, 65221, 65222, 65223, 65224, 65225, 65226, 65227, 65228, 65229, 65230, 65231, 65232, 65233, 65234, 65235, 65236, 65237, 65238, 65239, 65240, 65241, 65242, 65243, 65244, 65245, 65246, 65247, 65248, 65249, 65250, 65251, 65252, 65253, 65254, 65255, 65256, 65257, 65258, 65259, 65260, 65261, 65262, 65263, 65264, 65265, 65266, 65267, 65268, 65269, 65270, 65271, 65272, 65273, 65274, 65275, 65276, 67584, 67585, 67586, 
  67587, 67588, 67589, 67592, 67594, 67595, 67596, 67597, 67598, 67599, 67600, 67601, 67602, 67603, 67604, 67605, 67606, 67607, 67608, 67609, 67610, 67611, 67612, 67613, 67614, 67615, 67616, 67617, 67618, 67619, 67620, 67621, 67622, 67623, 67624, 67625, 67626, 67627, 67628, 67629, 67630, 67631, 67632, 67633, 67634, 67635, 67636, 67637, 67639, 67640, 67644, 67647, 67648, 67649, 67650, 67651, 67652, 67653, 67654, 67655, 67656, 67657, 67658, 67659, 67660, 67661, 67662, 67663, 67664, 67665, 67666, 67667, 
  67668, 67669, 67671, 67672, 67673, 67674, 67675, 67676, 67677, 67678, 67679, 67840, 67841, 67842, 67843, 67844, 67845, 67846, 67847, 67848, 67849, 67850, 67851, 67852, 67853, 67854, 67855, 67856, 67857, 67858, 67859, 67860, 67861, 67862, 67863, 67864, 67865, 67866, 67867, 67872, 67873, 67874, 67875, 67876, 67877, 67878, 67879, 67880, 67881, 67882, 67883, 67884, 67885, 67886, 67887, 67888, 67889, 67890, 67891, 67892, 67893, 67894, 67895, 67896, 67897, 67903, 67968, 67969, 67970, 67971, 67972, 67973, 
  67974, 67975, 67976, 67977, 67978, 67979, 67980, 67981, 67982, 67983, 67984, 67985, 67986, 67987, 67988, 67989, 67990, 67991, 67992, 67993, 67994, 67995, 67996, 67997, 67998, 67999, 68E3, 68001, 68002, 68003, 68004, 68005, 68006, 68007, 68008, 68009, 68010, 68011, 68012, 68013, 68014, 68015, 68016, 68017, 68018, 68019, 68020, 68021, 68022, 68023, 68030, 68031, 68096, 68112, 68113, 68114, 68115, 68117, 68118, 68119, 68121, 68122, 68123, 68124, 68125, 68126, 68127, 68128, 68129, 68130, 68131, 68132, 
  68133, 68134, 68135, 68136, 68137, 68138, 68139, 68140, 68141, 68142, 68143, 68144, 68145, 68146, 68147, 68160, 68161, 68162, 68163, 68164, 68165, 68166, 68167, 68176, 68177, 68178, 68179, 68180, 68181, 68182, 68183, 68184, 68192, 68193, 68194, 68195, 68196, 68197, 68198, 68199, 68200, 68201, 68202, 68203, 68204, 68205, 68206, 68207, 68208, 68209, 68210, 68211, 68212, 68213, 68214, 68215, 68216, 68217, 68218, 68219, 68220, 68221, 68222, 68223, 68352, 68353, 68354, 68355, 68356, 68357, 68358, 68359, 
  68360, 68361, 68362, 68363, 68364, 68365, 68366, 68367, 68368, 68369, 68370, 68371, 68372, 68373, 68374, 68375, 68376, 68377, 68378, 68379, 68380, 68381, 68382, 68383, 68384, 68385, 68386, 68387, 68388, 68389, 68390, 68391, 68392, 68393, 68394, 68395, 68396, 68397, 68398, 68399, 68400, 68401, 68402, 68403, 68404, 68405, 68416, 68417, 68418, 68419, 68420, 68421, 68422, 68423, 68424, 68425, 68426, 68427, 68428, 68429, 68430, 68431, 68432, 68433, 68434, 68435, 68436, 68437, 68440, 68441, 68442, 68443, 
  68444, 68445, 68446, 68447, 68448, 68449, 68450, 68451, 68452, 68453, 68454, 68455, 68456, 68457, 68458, 68459, 68460, 68461, 68462, 68463, 68464, 68465, 68466, 68472, 68473, 68474, 68475, 68476, 68477, 68478, 68479, 68608, 68609, 68610, 68611, 68612, 68613, 68614, 68615, 68616, 68617, 68618, 68619, 68620, 68621, 68622, 68623, 68624, 68625, 68626, 68627, 68628, 68629, 68630, 68631, 68632, 68633, 68634, 68635, 68636, 68637, 68638, 68639, 68640, 68641, 68642, 68643, 68644, 68645, 68646, 68647, 68648, 
  68649, 68650, 68651, 68652, 68653, 68654, 68655, 68656, 68657, 68658, 68659, 68660, 68661, 68662, 68663, 68664, 68665, 68666, 68667, 68668, 68669, 68670, 68671, 68672, 68673, 68674, 68675, 68676, 68677, 68678, 68679, 68680, 126464, 126465, 126466, 126467, 126469, 126470, 126471, 126472, 126473, 126474, 126475, 126476, 126477, 126478, 126479, 126480, 126481, 126482, 126483, 126484, 126485, 126486, 126487, 126488, 126489, 126490, 126491, 126492, 126493, 126494, 126495, 126497, 126498, 126500, 126503, 
  126505, 126506, 126507, 126508, 126509, 126510, 126511, 126512, 126513, 126514, 126516, 126517, 126518, 126519, 126521, 126523, 126530, 126535, 126537, 126539, 126541, 126542, 126543, 126545, 126546, 126548, 126551, 126553, 126555, 126557, 126559, 126561, 126562, 126564, 126567, 126568, 126569, 126570, 126572, 126573, 126574, 126575, 126576, 126577, 126578, 126580, 126581, 126582, 126583, 126585, 126586, 126587, 126588, 126590, 126592, 126593, 126594, 126595, 126596, 126597, 126598, 126599, 126600, 
  126601, 126603, 126604, 126605, 126606, 126607, 126608, 126609, 126610, 126611, 126612, 126613, 126614, 126615, 126616, 126617, 126618, 126619, 126625, 126626, 126627, 126629, 126630, 126631, 126632, 126633, 126635, 126636, 126637, 126638, 126639, 126640, 126641, 126642, 126643, 126644, 126645, 126646, 126647, 126648, 126649, 126650, 126651, 1114109];
  J.prototype.applyStyles = function(e, l) {
    l = l || this.div;
    for (var k in e) {
      e.hasOwnProperty(k) && (l.style[k] = e[k]);
    }
  };
  J.prototype.formatStyle = function(e, l) {
    return 0 === e ? 0 : e + l;
  };
  u.prototype = C(J.prototype);
  u.prototype.constructor = u;
  x.prototype.move = function(e, l) {
    l = void 0 !== l ? l : this.lineHeight;
    switch(e) {
      case "+x":
        this.left += l;
        this.right += l;
        break;
      case "-x":
        this.left -= l;
        this.right -= l;
        break;
      case "+y":
        this.top += l;
        this.bottom += l;
        break;
      case "-y":
        this.top -= l, this.bottom -= l;
    }
  };
  x.prototype.overlaps = function(e) {
    return this.left < e.right && this.right > e.left && this.top < e.bottom && this.bottom > e.top;
  };
  x.prototype.overlapsAny = function(e) {
    for (var l = 0;l < e.length;l++) {
      if (this.overlaps(e[l])) {
        return !0;
      }
    }
    return !1;
  };
  x.prototype.within = function(e) {
    return this.top >= e.top && this.bottom <= e.bottom && this.left >= e.left && this.right <= e.right;
  };
  x.prototype.overlapsOppositeAxis = function(e, l) {
    switch(l) {
      case "+x":
        return this.left < e.left;
      case "-x":
        return this.right > e.right;
      case "+y":
        return this.top < e.top;
      case "-y":
        return this.bottom > e.bottom;
    }
  };
  x.prototype.intersectPercentage = function(e) {
    return Math.max(0, Math.min(this.right, e.right) - Math.max(this.left, e.left)) * Math.max(0, Math.min(this.bottom, e.bottom) - Math.max(this.top, e.top)) / (this.height * this.width);
  };
  x.prototype.toCSSCompatValues = function(e) {
    return {top:this.top - e.top, bottom:e.bottom - this.bottom, left:this.left - e.left, right:e.right - this.right, height:this.height, width:this.width};
  };
  x.getSimpleBoxPosition = function(e) {
    var l = e.div ? e.div.offsetHeight : e.tagName ? e.offsetHeight : 0, k = e.div ? e.div.offsetWidth : e.tagName ? e.offsetWidth : 0, m = e.div ? e.div.offsetTop : e.tagName ? e.offsetTop : 0;
    e = e.div ? e.div.getBoundingClientRect() : e.tagName ? e.getBoundingClientRect() : e;
    return {left:e.left, right:e.right, top:e.top || m, height:e.height || l, bottom:e.bottom || m + (e.height || l), width:e.width || k};
  };
  R.StringDecoder = function() {
    return {decode:function(e) {
      if (!e) {
        return "";
      }
      if ("string" !== typeof e) {
        throw Error("Error - expected string data.");
      }
      return decodeURIComponent(encodeURIComponent(e));
    }};
  };
  R.convertCueToDOMTree = function(e, k) {
    return e && k ? ca(e, k) : null;
  };
  R.processCues = function(e, k, m) {
    if (!e || !k || !m) {
      return null;
    }
    for (;m.firstChild;) {
      m.removeChild(m.firstChild);
    }
    var l = e.document.createElement("div");
    l.style.position = "absolute";
    l.style.left = "0";
    l.style.right = "0";
    l.style.top = "0";
    l.style.bottom = "0";
    l.style.margin = "1.5%";
    m.appendChild(l);
    if (function(e) {
      for (var h = 0;h < e.length;h++) {
        if (e[h].hasBeenReset || !e[h].displayState) {
          return !0;
        }
      }
      return !1;
    }(k)) {
      var h = [], p = x.getSimpleBoxPosition(l), r = {font:Math.round(5 * p.height) / 100 + "px sans-serif"};
      (function() {
        for (var m, E, z = 0;z < k.length;z++) {
          E = k[z];
          m = new u(e, E, r);
          l.appendChild(m.div);
          var B = void 0, H = void 0, A = m, C = p, oa = h, K = new x(A), F = A.cue, N;
          if ("number" === typeof F.line && (F.snapToLines || 0 <= F.line && 100 >= F.line)) {
            N = F.line;
          } else {
            if (F.track && F.track.textTrackList && F.track.textTrackList.mediaElement) {
              N = F.track;
              for (var L = N.textTrackList, M = 0, J = 0;J < L.length && L[J] !== N;J++) {
                "showing" === L[J].mode && M++;
              }
              N = -1 * ++M;
            } else {
              N = -1;
            }
          }
          L = [];
          if (F.snapToLines) {
            switch(F.vertical) {
              case "":
                L = ["+y", "-y"];
                H = "height";
                break;
              case "rl":
                L = ["+x", "-x"];
                H = "width";
                break;
              case "lr":
                L = ["-x", "+x"], H = "width";
            }
            var M = K.lineHeight, J = M * Math.round(N), H = C[H] + M, R = L[0];
            Math.abs(J) > H && (J = (0 > J ? -1 : 1) * Math.ceil(H / M) * M);
            0 > N && (J += "" === F.vertical ? C.height : C.width, L = L.reverse());
            K.move(R, J);
          } else {
            K = K.lineHeight / C.height * 100;
            switch(F.lineAlign) {
              case "middle":
                N -= K / 2;
                break;
              case "end":
                N -= K;
            }
            switch(F.vertical) {
              case "":
                A.applyStyles({top:A.formatStyle(N, "%")});
                break;
              case "rl":
                A.applyStyles({left:A.formatStyle(N, "%")});
                break;
              case "lr":
                A.applyStyles({right:A.formatStyle(N, "%")});
            }
            L = ["+y", "-x", "+x", "-y"];
            K = new x(A);
          }
          a: {
            F = K;
            K = L;
            H = new x(F);
            N = 1;
            for (L = 0;L < K.length;L++) {
              for (;F.overlapsOppositeAxis(C, K[L]) || F.within(C) && F.overlapsAny(oa);) {
                F.move(K[L]);
              }
              if (F.within(C)) {
                B = F;
                break a;
              }
              M = F.intersectPercentage(C);
              N > M && (B = new x(F), N = M);
              F = new x(H);
            }
            B = B || H;
          }
          A.move(B.toCSSCompatValues(C));
          E.displayState = m.div;
          h.push(x.getSimpleBoxPosition(m));
        }
      })();
    } else {
      for (m = 0;m < k.length;m++) {
        l.appendChild(k[m].displayState);
      }
    }
  };
  R.Parser = function(e, k, m) {
    m || (m = k, k = {});
    k || (k = {});
    this.window = e;
    this.vttjs = k;
    this.state = "INITIAL";
    this.buffer = "";
    this.decoder = m || new TextDecoder("utf8");
    this.regionList = [];
  };
  R.Parser.prototype = {reportOrThrowError:function(e) {
    if (e instanceof m) {
      this.onparsingerror && this.onparsingerror(e);
    } else {
      throw e;
    }
  }, parse:function(e) {
    function k() {
      for (var e = h.buffer, k = 0;k < e.length && "\r" !== e[k] && "\n" !== e[k];) {
        ++k;
      }
      var l = e.substr(0, k);
      "\r" === e[k] && ++k;
      "\n" === e[k] && ++k;
      h.buffer = e.substr(k);
      return l;
    }
    function r(e) {
      var k = new p;
      B(e, function(e, h) {
        switch(e) {
          case "id":
            k.set(e, h);
            break;
          case "width":
            k.percent(e, h);
            break;
          case "lines":
            k.integer(e, h);
            break;
          case "regionanchor":
          case "viewportanchor":
            h = h.split(",");
            if (2 !== h.length) {
              break;
            }
            var l = new p;
            l.percent("x", h[0]);
            l.percent("y", h[1]);
            if (!l.has("x") || !l.has("y")) {
              break;
            }
            k.set(e + "X", l.get("x"));
            k.set(e + "Y", l.get("y"));
            break;
          case "scroll":
            k.alt(e, h, ["up"]);
        }
      }, /=/, /\s/);
      k.has("id") && (e = new (h.vttjs.VTTRegion || h.window.VTTRegion), e.width = k.get("width", 100), e.lines = k.get("lines", 3), e.regionAnchorX = k.get("regionanchorX", 0), e.regionAnchorY = k.get("regionanchorY", 100), e.viewportAnchorX = k.get("viewportanchorX", 0), e.viewportAnchorY = k.get("viewportanchorY", 100), e.scroll = k.get("scroll", ""), h.onregion && h.onregion(e), h.regionList.push({id:k.get("id"), region:e}));
    }
    function x(e) {
      B(e, function(e, h) {
        switch(e) {
          case "Region":
            r(h);
        }
      }, /:/);
    }
    var h = this;
    e && (h.buffer += h.decoder.decode(e, {stream:!0}));
    try {
      var u;
      if ("INITIAL" === h.state) {
        if (!/\r\n|\n/.test(h.buffer)) {
          return this;
        }
        u = k();
        var A = u.match(/^WEBVTT([ \t].*)?$/);
        if (!A || !A[0]) {
          throw new m(m.Errors.BadSignature);
        }
        h.state = "HEADER";
      }
      for (e = !1;h.buffer;) {
        if (!/\r\n|\n/.test(h.buffer)) {
          return this;
        }
        e ? e = !1 : u = k();
        switch(h.state) {
          case "HEADER":
            /:/.test(u) ? x(u) : u || (h.state = "ID");
            continue;
          case "NOTE":
            u || (h.state = "ID");
            continue;
          case "ID":
            if (/^NOTE($|[ \t])/.test(u)) {
              h.state = "NOTE";
              break;
            }
            if (!u) {
              continue;
            }
            h.cue = new (h.vttjs.VTTCue || h.window.VTTCue)(0, 0, "");
            h.state = "CUE";
            if (-1 === u.indexOf("--\x3e")) {
              h.cue.id = u;
              continue;
            }
          case "CUE":
            try {
              aa(u, h.cue, h.regionList);
            } catch (E) {
              h.reportOrThrowError(E);
              h.cue = null;
              h.state = "BADCUE";
              continue;
            }
            h.state = "CUETEXT";
            continue;
          case "CUETEXT":
            var C = -1 !== u.indexOf("--\x3e");
            if (!u || C && (e = !0)) {
              h.oncue && h.oncue(h.cue);
              h.cue = null;
              h.state = "ID";
              continue;
            }
            h.cue.text && (h.cue.text += "\n");
            h.cue.text += u;
            continue;
          case "BADCUE":
            u || (h.state = "ID");
        }
      }
    } catch (E) {
      h.reportOrThrowError(E);
      if ("CUETEXT" === h.state && h.cue && h.oncue) {
        h.oncue(h.cue);
      }
      h.cue = null;
      h.state = "INITIAL" === h.state ? "BADWEBVTT" : "BADCUE";
    }
    return this;
  }, flush:function() {
    try {
      this.buffer += this.decoder.decode();
      if (this.cue || "HEADER" === this.state) {
        this.buffer += "\n\n", this.parse();
      }
      if ("INITIAL" === this.state) {
        throw new m(m.Errors.BadSignature);
      }
    } catch (e) {
      this.reportOrThrowError(e);
    }
    this.onflush && this.onflush();
    return this;
  }};
  k.WebVTT = R;
})(this, this.vttjs || {});

