/**
 * @license
 * Video.js 5.13.1 <http://videojs.com/>
 * Copyright Brightcove, Inc. <https://www.brightcove.com/>
 * Available under Apache License Version 2.0
 * <https://github.com/videojs/video.js/blob/master/LICENSE>
 *
 * Includes vtt.js <https://github.com/mozilla/vtt.js>
 * Available under Apache License Version 2.0
 * <https://github.com/mozilla/vtt.js/blob/master/LICENSE>
 */

var $jscomp = {scope:{}};
$jscomp.defineProperty = "function" == typeof Object.defineProperties ? Object.defineProperty : function(k, n, y) {
  if (y.get || y.set) {
    throw new TypeError("ES3 does not support getters and setters.");
  }
  k != Array.prototype && k != Object.prototype && (k[n] = y.value);
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
  var n = 0;
  return $jscomp.iteratorPrototype(function() {
    return n < k.length ? {done:!1, value:k[n++]} : {done:!0};
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
$jscomp.iteratorFromArray = function(k, n) {
  $jscomp.initSymbolIterator();
  k instanceof String && (k += "");
  var y = 0, u = {next:function() {
    if (y < k.length) {
      var D = y++;
      return {value:n(D, k[D]), done:!1};
    }
    u.next = function() {
      return {done:!0, value:void 0};
    };
    return u.next();
  }};
  u[Symbol.iterator] = function() {
    return u;
  };
  return u;
};
$jscomp.polyfill = function(k, n, y, u) {
  if (n) {
    y = $jscomp.global;
    k = k.split(".");
    for (u = 0;u < k.length - 1;u++) {
      var D = k[u];
      D in y || (y[D] = {});
      y = y[D];
    }
    k = k[k.length - 1];
    u = y[k];
    n = n(u);
    n != u && null != n && $jscomp.defineProperty(y, k, {configurable:!0, writable:!0, value:n});
  }
};
$jscomp.polyfill("Array.prototype.keys", function(k) {
  return k ? k : function() {
    return $jscomp.iteratorFromArray(this, function(k) {
      return k;
    });
  };
}, "es6-impl", "es3");
$jscomp.polyfill("Object.getOwnPropertySymbols", function(k) {
  return k ? k : function() {
    return [];
  };
}, "es6-impl", "es5");
$jscomp.owns = function(k, n) {
  return Object.prototype.hasOwnProperty.call(k, n);
};
$jscomp.polyfill("Object.assign", function(k) {
  return k ? k : function(k, y) {
    for (var n = 1;n < arguments.length;n++) {
      var D = arguments[n];
      if (D) {
        for (var ga in D) {
          $jscomp.owns(D, ga) && (k[ga] = D[ga]);
        }
      }
    }
    return k;
  };
}, "es6-impl", "es3");
$jscomp.polyfill("Array.prototype.fill", function(k) {
  return k ? k : function(k, y, u) {
    var n = this.length || 0;
    0 > y && (y = Math.max(0, n + y));
    if (null == u || u > n) {
      u = n;
    }
    u = Number(u);
    0 > u && (u = Math.max(0, n + u));
    for (y = Number(y || 0);y < u;y++) {
      this[y] = k;
    }
    return this;
  };
}, "es6-impl", "es3");
$jscomp.polyfill("Array.prototype.values", function(k) {
  return k ? k : function() {
    return $jscomp.iteratorFromArray(this, function(k, y) {
      return y;
    });
  };
}, "es6", "es3");
var __extends = this && this.__extends || function(k, n) {
  function y() {
    this.constructor = k;
  }
  for (var u in n) {
    n.hasOwnProperty(u) && (k[u] = n[u]);
  }
  k.prototype = null === n ? Object.create(n) : (y.prototype = n.prototype, new y);
}, videojs = function() {
  function k(a, b) {
    return b = {exports:{}}, a(b, b.exports), b.exports;
  }
  function n(a, b) {
    if (!(this instanceof n)) {
      return new n(a, b);
    }
    this.nodeValue = this.data = a;
    this.length = a.length;
    this.ownerDocument = b || null;
  }
  function y(a, b) {
    if (!(this instanceof y)) {
      return new y(a);
    }
    this.data = a || "";
    this.length = this.data.length;
    this.ownerDocument = b || null;
  }
  function u(a) {
    switch(a.nodeType) {
      case 3:
        return J(a.data);
      case 8:
        return "\x3c!--" + a.data + "--\x3e";
      default:
        var b = [], c = a.tagName;
        "http://www.w3.org/1999/xhtml" === a.namespaceURI && (c = c.toLowerCase());
        b.push("<" + c + pb(a) + ga(a));
        -1 < me.indexOf(c) ? b.push(" />") : (b.push(">"), a.childNodes.length ? b.push.apply(b, a.childNodes.map(u)) : a.textContent || a.innerText ? b.push(J(a.textContent || a.innerText)) : a.innerHTML && b.push(a.innerHTML), b.push("</" + c + ">"));
        return b.join("");
    }
  }
  function D(a) {
    if ("string" === typeof a) {
      return a;
    }
    var b = "";
    Object.keys(a).forEach(function(c) {
      var d = a[c];
      c = c.replace(/[A-Z]/g, function(c) {
        return "-" + c.toLowerCase();
      });
      b += c + ":" + d + ";";
    });
    return b;
  }
  function ga(a) {
    a = a.dataset;
    var b = [], c;
    for (c in a) {
      b.push({name:"data-" + c, value:a[c]});
    }
    return b.length ? ia(b) : "";
  }
  function ia(a) {
    var b = [];
    a.forEach(function(c) {
      var a = c.name;
      c = c.value;
      "style" === a && (c = D(c));
      b.push(a + '="' + J(c).replace(/"/g, "&quot;") + '"');
    });
    return b.length ? " " + b.join(" ") : "";
  }
  function pb(a) {
    var b = [], c;
    for (c in a) {
      var d;
      d = a;
      var f = c, g = typeof d[f];
      d = "style" === f && 0 < Object.keys(d.style).length ? !0 : d.hasOwnProperty(f) && ("string" === g || "boolean" === g || "number" === g) && "nodeName" !== f && "className" !== f && "tagName" !== f && "textContent" !== f && "innerText" !== f && "namespaceURI" !== f && "innerHTML" !== f;
      d && b.push({name:c, value:a[c]});
    }
    for (var w in a._attributes) {
      for (var e in a._attributes[w]) {
        c = a._attributes[w][e], b.push({name:(c.prefix ? c.prefix + ":" : "") + e, value:c.value});
      }
    }
    a.className && b.push({name:"class", value:a.className});
    return b.length ? ia(b) : "";
  }
  function J(a) {
    var b = "";
    "string" === typeof a ? b = a : a && (b = a.toString());
    return b.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
  function B(a, b, c) {
    if (!(this instanceof B)) {
      return new B(a);
    }
    c = void 0 === c ? "http://www.w3.org/1999/xhtml" : c || null;
    this.nodeName = this.tagName = "http://www.w3.org/1999/xhtml" === c ? String(a).toUpperCase() : a;
    this.className = "";
    this.dataset = {};
    this.childNodes = [];
    this.parentNode = null;
    this.style = {};
    this.ownerDocument = b || null;
    this.namespaceURI = c;
    this._attributes = {};
    "INPUT" === this.tagName && (this.type = "text");
  }
  function v(a) {
    if (!(this instanceof v)) {
      return new v;
    }
    this.childNodes = [];
    this.parentNode = null;
    this.ownerDocument = a || null;
  }
  function V(a) {
  }
  function H() {
    if (!(this instanceof H)) {
      return new H;
    }
    this.head = this.createElement("head");
    this.body = this.createElement("body");
    this.documentElement = this.createElement("html");
    this.documentElement.appendChild(this.head);
    this.documentElement.appendChild(this.body);
    this.childNodes = [this.documentElement];
    this.nodeType = 9;
  }
  function Ua(a) {
    if (/\s/.test(a)) {
      throw Error("class has illegal whitespace characters");
    }
  }
  function Fa(a) {
    return !!a && "object" === typeof a && 1 === a.nodeType;
  }
  function ua(a) {
    return function(b, c) {
      if ("string" !== typeof b || !/\S/.test(b)) {
        return z[a](null);
      }
      "string" === typeof c && /\S/.test(c) && (c = z.querySelector(c));
      c = Fa(c) ? c : z;
      return c[a] && c[a](b);
    };
  }
  function ja(a) {
    0 === a.indexOf("#") && (a = a.slice(1));
    return z.getElementById(a);
  }
  function r(a, b, c, d) {
    void 0 === a && (a = "div");
    void 0 === b && (b = {});
    void 0 === c && (c = {});
    var f = z.createElement(a);
    Object.getOwnPropertyNames(b).forEach(function(c) {
      var a = b[c];
      -1 !== c.indexOf("aria-") || "role" === c || "type" === c ? (E.warn((d = ["Setting attributes in the second argument of createEl()\n                has been deprecated. Use the third argument instead.\n                createEl(type, properties, attributes). Attempting to set ", " to ", "."], d.raw = ["Setting attributes in the second argument of createEl()\n                has been deprecated. Use the third argument instead.\n                createEl(type, properties, attributes). Attempting to set ", 
      " to ", "."], pc(d, c, a))), f.setAttribute(c, a)) : "textContent" === c ? e(f, a) : f[c] = a;
      var d;
    });
    Object.getOwnPropertyNames(c).forEach(function(b) {
      f.setAttribute(b, c[b]);
    });
    d && M(f, d);
    return f;
  }
  function e(a, b) {
    "undefined" === typeof a.textContent ? a.innerText = b : a.textContent = b;
    return a;
  }
  function h(a, b) {
    b.firstChild ? b.insertBefore(a, b.firstChild) : b.appendChild(a);
  }
  function P(a) {
    var b = a[va];
    b || (b = a[va] = wa++);
    Ga[b] || (Ga[b] = {});
    return Ga[b];
  }
  function Ha(a) {
    return (a = a[va]) ? !!Object.getOwnPropertyNames(Ga[a]).length : !1;
  }
  function m(a) {
    var b = a[va];
    if (b) {
      delete Ga[b];
      try {
        delete a[va];
      } catch (c) {
        a.removeAttribute ? a.removeAttribute(va) : a[va] = null;
      }
    }
  }
  function Q(a, b) {
    Ua(b);
    return a.classList ? a.classList.contains(b) : (new RegExp("(^|\\s)" + b + "($|\\s)")).test(a.className);
  }
  function ma(a, b) {
    a.classList ? a.classList.add(b) : Q(a, b) || (a.className = (a.className + " " + b).trim());
    return a;
  }
  function oa(a, b) {
    a.classList ? a.classList.remove(b) : (Ua(b), a.className = a.className.split(/\s+/).filter(function(c) {
      return c !== b;
    }).join(" "));
    return a;
  }
  function C(a, b, c) {
    var d = Q(a, b);
    "function" === typeof c && (c = c(a, b));
    "boolean" !== typeof c && (c = !d);
    if (c !== d) {
      return c ? ma(a, b) : oa(a, b), a;
    }
  }
  function p(a, b) {
    Object.getOwnPropertyNames(b).forEach(function(c) {
      var d = b[c];
      null === d || "undefined" === typeof d || !1 === d ? a.removeAttribute(c) : a.setAttribute(c, !0 === d ? "" : d);
    });
  }
  function pa(a) {
    var b = {};
    if (a && a.attributes && 0 < a.attributes.length) {
      for (var c = a.attributes, d = c.length - 1;0 <= d;d--) {
        var f = c[d].name, g = c[d].value;
        if ("boolean" === typeof a[f] || -1 !== ",autoplay,controls,loop,muted,default,".indexOf("," + f + ",")) {
          g = null !== g ? !0 : !1;
        }
        b[f] = g;
      }
    }
    return b;
  }
  function N() {
    z.body.focus();
    z.onselectstart = function() {
      return !1;
    };
  }
  function ne() {
    z.onselectstart = function() {
      return !0;
    };
  }
  function qc(a) {
    var b;
    a.getBoundingClientRect && a.parentNode && (b = a.getBoundingClientRect());
    if (!b) {
      return {left:0, top:0};
    }
    a = z.documentElement;
    var c = z.body;
    return {left:Math.round(b.left + (q.pageXOffset || c.scrollLeft) - (a.clientLeft || c.clientLeft || 0)), top:Math.round(b.top + (q.pageYOffset || c.scrollTop) - (a.clientTop || c.clientTop || 0))};
  }
  function rc(a, b) {
    var c = {}, d = qc(a), f = a.offsetWidth;
    a = a.offsetHeight;
    var g = d.top, d = d.left, w = b.pageY, e = b.pageX;
    b.changedTouches && (e = b.changedTouches[0].pageX, w = b.changedTouches[0].pageY);
    c.y = Math.max(0, Math.min(1, (g - w + a) / a));
    c.x = Math.max(0, Math.min(1, (e - d) / f));
    return c;
  }
  function W(a) {
    return !!a && "object" === typeof a && 3 === a.nodeType;
  }
  function F(a) {
    for (;a.firstChild;) {
      a.removeChild(a.firstChild);
    }
    return a;
  }
  function R(a) {
    "function" === typeof a && (a = a());
    return (Array.isArray(a) ? a : [a]).map(function(b) {
      "function" === typeof b && (b = b());
      if (Fa(b) || W(b)) {
        return b;
      }
      if ("string" === typeof b && /\S/.test(b)) {
        return z.createTextNode(b);
      }
    }).filter(function(b) {
      return b;
    });
  }
  function M(a, b) {
    R(b).forEach(function(c) {
      return a.appendChild(c);
    });
    return a;
  }
  function sc(a, b) {
    return M(F(a), b);
  }
  function tc(a, b) {
    var c = P(a);
    0 === c.handlers[b].length && (delete c.handlers[b], a.removeEventListener ? a.removeEventListener(b, c.dispatcher, !1) : a.detachEvent && a.detachEvent("on" + b, c.dispatcher));
    0 >= Object.getOwnPropertyNames(c.handlers).length && (delete c.handlers, delete c.dispatcher, delete c.disabled);
    0 === Object.getOwnPropertyNames(c).length && m(a);
  }
  function qb(a, b, c, d) {
    c.forEach(function(c) {
      a(b, c, d);
    });
  }
  function rb(a) {
    function b() {
      return !0;
    }
    function c() {
      return !1;
    }
    if (!a || !a.isPropagationStopped) {
      var d = a || q.event;
      a = {};
      for (var f in d) {
        "layerX" !== f && "layerY" !== f && "keyLocation" !== f && "webkitMovementX" !== f && "webkitMovementY" !== f && ("returnValue" === f && d.preventDefault || (a[f] = d[f]));
      }
      a.target || (a.target = a.srcElement || z);
      a.relatedTarget || (a.relatedTarget = a.fromElement === a.target ? a.toElement : a.fromElement);
      a.preventDefault = function() {
        d.preventDefault && d.preventDefault();
        a.returnValue = !1;
        d.returnValue = !1;
        a.defaultPrevented = !0;
      };
      a.defaultPrevented = !1;
      a.stopPropagation = function() {
        d.stopPropagation && d.stopPropagation();
        a.cancelBubble = !0;
        d.cancelBubble = !0;
        a.isPropagationStopped = b;
      };
      a.isPropagationStopped = c;
      a.stopImmediatePropagation = function() {
        d.stopImmediatePropagation && d.stopImmediatePropagation();
        a.isImmediatePropagationStopped = b;
        a.stopPropagation();
      };
      a.isImmediatePropagationStopped = c;
      if (null !== a.clientX && void 0 !== a.clientX) {
        f = z.documentElement;
        var g = z.body;
        a.pageX = a.clientX + (f && f.scrollLeft || g && g.scrollLeft || 0) - (f && f.clientLeft || g && g.clientLeft || 0);
        a.pageY = a.clientY + (f && f.scrollTop || g && g.scrollTop || 0) - (f && f.clientTop || g && g.clientTop || 0);
      }
      a.which = a.charCode || a.keyCode;
      null !== a.button && void 0 !== a.button && (a.button = a.button & 1 ? 0 : a.button & 4 ? 1 : a.button & 2 ? 2 : 0);
    }
    return a;
  }
  function da(a, b, c) {
    if (Array.isArray(b)) {
      return qb(da, a, b, c);
    }
    var d = P(a);
    d.handlers || (d.handlers = {});
    d.handlers[b] || (d.handlers[b] = []);
    c.guid || (c.guid = wa++);
    d.handlers[b].push(c);
    d.dispatcher || (d.disabled = !1, d.dispatcher = function(c, b) {
      if (!d.disabled) {
        c = rb(c);
        var f = d.handlers[c.type];
        if (f) {
          for (var f = f.slice(0), g = 0, e = f.length;g < e && !c.isImmediatePropagationStopped();g++) {
            try {
              f[g].call(a, c, b);
            } catch (oe) {
              E.error(oe);
            }
          }
        }
      }
    });
    1 === d.handlers[b].length && (a.addEventListener ? a.addEventListener(b, d.dispatcher, !1) : a.attachEvent && a.attachEvent("on" + b, d.dispatcher));
  }
  function ka(a, b, c) {
    if (Ha(a)) {
      var d = P(a);
      if (d.handlers) {
        if (Array.isArray(b)) {
          return qb(ka, a, b, c);
        }
        if (b) {
          var f = d.handlers[b];
          if (f) {
            if (!c) {
              d.handlers[b] = [];
            } else {
              if (c.guid) {
                for (d = 0;d < f.length;d++) {
                  f[d].guid === c.guid && f.splice(d--, 1);
                }
              }
            }
            tc(a, b);
          }
        } else {
          for (f in d.handlers) {
            b = f, d.handlers[b] = [], tc(a, b);
          }
        }
      }
    }
  }
  function Va(a, b, c) {
    var d = Ha(a) ? P(a) : {}, f = a.parentNode || a.ownerDocument;
    "string" === typeof b && (b = {type:b, target:a});
    b = rb(b);
    d.dispatcher && d.dispatcher.call(a, b, c);
    if (f && !b.isPropagationStopped() && !0 === b.bubbles) {
      Va.call(null, f, b, c);
    } else {
      if (!f && !b.defaultPrevented && (a = P(b.target), b.target[b.type])) {
        a.disabled = !0;
        if ("function" === typeof b.target[b.type]) {
          b.target[b.type]();
        }
        a.disabled = !1;
      }
    }
    return !b.defaultPrevented;
  }
  function Ia(a, b, c) {
    if (Array.isArray(b)) {
      return qb(Ia, a, b, c);
    }
    var d = function() {
      ka(a, b, d);
      c.apply(this, arguments);
    };
    d.guid = c.guid = c.guid || wa++;
    da(a, b, d);
  }
  function S(a) {
    return "string" !== typeof a ? a : a.charAt(0).toUpperCase() + a.slice(1);
  }
  function uc(a, b, c, d, f) {
    if (!pe(a)) {
      return a;
    }
    var g = qe(b) && (re(b) || se(b)), w = g ? void 0 : te(b);
    ue(w || b, function(e, h) {
      w && (h = e, e = b[h]);
      if (ve(e)) {
        a: {
          d || (d = []), f || (f = []), e = h;
          h = d;
          for (var ha = f, p = h.length, L = b[e];p--;) {
            if (h[p] == L) {
              a[e] = ha[p];
              break a;
            }
          }
          var p = a[e], l = c ? c(p, L, e, a, b) : void 0, C = void 0 === l;
          if (C) {
            if (l = L, vc(L) && (wc(L) || we(L))) {
              if (wc(p)) {
                l = p;
              } else {
                if (vc(p)) {
                  var l = void 0, m = -1, k = p.length;
                  for (l || (l = Array(k));++m < k;) {
                    l[m] = p[m];
                  }
                } else {
                  l = [];
                }
              }
            } else {
              if (xc(L) || yc(L)) {
                if (yc(p)) {
                  for (var l = sb(p), m = {}, k = -1, q = l.length;++k < q;) {
                    var t = l[k];
                    m[t] = p[t];
                  }
                  l = m;
                } else {
                  l = xc(p) ? p : {};
                }
              } else {
                C = !1;
              }
            }
          }
          h.push(L);
          ha.push(l);
          if (C) {
            a[e] = uc(l, L, c, h, ha);
          } else {
            if (l === l ? l !== p : p === p) {
              a[e] = l;
            }
          }
        }
      } else {
        ha = a[h], L = c ? c(ha, e, h, a, b) : void 0, (p = void 0 === L) && (L = e), void 0 === L && (!g || h in a) || !p && (L === L ? L === ha : ha !== ha) || (a[h] = L);
      }
    });
    return a;
  }
  function zc(a) {
    return !!a && "object" === typeof a && "[object Object]" === a.toString() && a.constructor === Object;
  }
  function xe(a, b) {
    if (!zc(b)) {
      return b;
    }
    if (!zc(a)) {
      return U(b);
    }
  }
  function U() {
    for (var a = [], b = 0;b < arguments.length;b++) {
      a[b] = arguments[b];
    }
    a.unshift({});
    a.push(xe);
    Ac.apply(null, a);
    return a[0];
  }
  function Bc(a, b, c, d) {
    void 0 === d && (E.warn("DEPRECATED: Function '" + a + "' on 'TimeRanges' called without an index argument."), d = 0);
    var f = c.length - 1;
    if (0 > d || d > f) {
      throw Error("Failed to execute '" + a + "' on 'TimeRanges': The index provided (" + d + ") is greater than or equal to the maximum bound (" + f + ").");
    }
    return c[d][b];
  }
  function tb(a) {
    return void 0 === a || 0 === a.length ? {length:0, start:function() {
      throw Error("This TimeRanges object is empty");
    }, end:function() {
      throw Error("This TimeRanges object is empty");
    }} : {length:a.length, start:Bc.bind(null, "start", 0, a), end:Bc.bind(null, "end", 1, a)};
  }
  function la(a, b) {
    return Array.isArray(a) ? tb(a) : void 0 === a || void 0 === b ? tb() : tb([[a, b]]);
  }
  function Cc(a, b) {
    var c = 0, d, f;
    if (!b) {
      return 0;
    }
    a && a.length || (a = la(0, 0));
    for (var g = 0;g < a.length;g++) {
      d = a.start(g), f = a.end(g), f > b && (f = b), c += f - d;
    }
    return c / b;
  }
  function X(a) {
    if (a instanceof X) {
      return a;
    }
    "number" === typeof a ? this.code = a : "string" === typeof a ? this.message = a : "object" === typeof a && ("number" === typeof a.code && (this.code = a.code), O(this, a));
    this.message || (this.message = X.defaultMessages[this.code] || "");
  }
  function ye(a) {
    for (var b in a) {
      if (a.hasOwnProperty(b)) {
        return !1;
      }
    }
    return !0;
  }
  function Dc(a, b, c) {
    var d = a;
    ze(b) ? (c = b, "string" === typeof a && (d = {uri:a})) : d = Ae(b, {uri:a});
    d.callback = c;
    return d;
  }
  function na(a, b, c) {
    b = Dc(a, b, c);
    return Ec(b);
  }
  function Ec(a) {
    function b(c) {
      clearTimeout(k);
      c instanceof Error || (c = Error("" + (c || "Unknown XMLHttpRequest Error")));
      c.statusCode = 0;
      var b = q;
      d || (d = !0, a.callback(c, b, void 0));
    }
    function c() {
      if (!w) {
        var c;
        clearTimeout(k);
        c = a.useXDR && void 0 === f.status ? 200 : 1223 === f.status ? 204 : f.status;
        var b = q, g = null;
        if (0 !== c) {
          f.response ? b = f.response : (b = f.responseText) || ("document" === f.responseType ? b = f.responseXML : (b = 204 === f.status && f.responseXML && "parsererror" === f.responseXML.documentElement.nodeName, b = "" !== f.responseType || b ? null : f.responseXML));
          if (C) {
            try {
              b = JSON.parse(b);
            } catch (ig) {
            }
          }
          b = {body:b, statusCode:c, method:p, headers:{}, url:e, rawRequest:f};
          f.getAllResponseHeaders && (b.headers = Be(f.getAllResponseHeaders()));
        } else {
          g = Error("Internal XMLHttpRequest Error");
        }
        c = b.body;
        d || (d = !0, a.callback(g, b, c));
      }
    }
    if ("undefined" === typeof a.callback) {
      throw Error("callback argument missing");
    }
    var d = !1, f = a.xhr || null;
    f || (f = a.cors || a.useXDR ? new na.XDomainRequest : new na.XMLHttpRequest);
    var g, w, e = f.url = a.uri || a.url, p = f.method = a.method || "GET", h = a.body || a.data || null, l = f.headers = a.headers || {}, m = !!a.sync, C = !1, k, q = {body:void 0, headers:{}, statusCode:0, method:p, url:e, rawRequest:f};
    "json" in a && !1 !== a.json && (C = !0, l.accept || l.Accept || (l.Accept = "application/json"), "GET" !== p && "HEAD" !== p && (l["content-type"] || l["Content-Type"] || (l["Content-Type"] = "application/json"), h = JSON.stringify(!0 === a.json ? h : a.json)));
    f.onreadystatechange = function() {
      4 === f.readyState && c();
    };
    f.onload = c;
    f.onerror = b;
    f.onprogress = function() {
    };
    f.onabort = function() {
      w = !0;
    };
    f.ontimeout = b;
    f.open(p, e, !m, a.username, a.password);
    m || (f.withCredentials = !!a.withCredentials);
    !m && 0 < a.timeout && (k = setTimeout(function() {
      if (!w) {
        w = !0;
        f.abort("timeout");
        var c = Error("XMLHttpRequest timeout");
        c.code = "ETIMEDOUT";
        b(c);
      }
    }, a.timeout));
    if (f.setRequestHeader) {
      for (g in l) {
        l.hasOwnProperty(g) && f.setRequestHeader(g, l[g]);
      }
    } else {
      if (a.headers && !ye(a.headers)) {
        throw Error("Headers cannot be set on an XDomainRequest object");
      }
    }
    "responseType" in a && (f.responseType = a.responseType);
    "beforeSend" in a && "function" === typeof a.beforeSend && a.beforeSend(f);
    f.send(h);
    return f;
  }
  function Ce() {
  }
  function Fc(a, b) {
    var c = function() {
      var d = (new Date).getTime();
      d - c.lastCheckTime_ >= b && (c.lastCheckTime_ = d, c.cache_ = a());
      return c.cache_;
    };
    c.lastCheckTime_ = -Infinity;
    return c;
  }
  function De(a) {
    var b = a.charAt(0).toUpperCase() + a.slice(1);
    Gc["set" + b] = function(c) {
      return this.el_.vjs_setProperty(a, c);
    };
  }
  function Hc(a) {
    Gc[a] = function() {
      return this.el_.vjs_getProperty(a);
    };
  }
  function ub(a, b) {
    return "rgba(" + parseInt(a[1] + a[1], 16) + "," + parseInt(a[2] + a[2], 16) + "," + parseInt(a[3] + a[3], 16) + "," + b + ")";
  }
  function qa(a, b) {
    void 0 === b && (b = a);
    a = 0 > a ? 0 : a;
    var c = Math.floor(a % 60), d = Math.floor(a / 60 % 60), f = Math.floor(a / 3600), g = Math.floor(b / 60 % 60);
    b = Math.floor(b / 3600);
    if (isNaN(a) || Infinity === a) {
      f = d = c = "-";
    }
    f = 0 < f || 0 < b ? f + ":" : "";
    return f + (((f || 10 <= g) && 10 > d ? "0" + d : d) + ":") + (10 > c ? "0" + c : c);
  }
  function za(a, b) {
    return a && b ? "function" === typeof q.getComputedStyle ? (a = q.getComputedStyle(a)) ? a[b] : "" : a.currentStyle[b] || "" : "";
  }
  function vb(a, b) {
    Object.keys(a).forEach(function(c) {
      return b(a[c], c);
    });
  }
  function Ee(a, b, c) {
    void 0 === c && (c = 0);
    return Object.keys(a).reduce(function(c, f) {
      return b(c, a[f], f);
    }, c);
  }
  function Ic(a, b) {
    b && (a = b(a));
    if (a && "none" !== a) {
      return a;
    }
  }
  function t(a, b, c) {
    var d;
    b = b || {};
    if ("string" === typeof a) {
      0 === a.indexOf("#") && (a = a.slice(1));
      if (t.getPlayers()[a]) {
        return b && E.warn('Player "' + a + '" is already initialised. Options will not be applied.'), c && t.getPlayers()[a].ready(c), t.getPlayers()[a];
      }
      d = ja(a);
    } else {
      d = a;
    }
    if (!d || !d.nodeName) {
      throw new TypeError("The element or ID supplied is not valid. (videojs)");
    }
    if (d.player || ea.players[d.playerId]) {
      return d.player || ea.players[d.playerId];
    }
    t.hooks("beforesetup").forEach(function(c) {
      c = c(d, U(b));
      !c || "object" !== typeof c || Array.isArray(c) ? t.log.error("please return an object in beforesetup hooks") : b = U(b, c);
    });
    var f = new ea(d, b, c);
    t.hooks("setup").forEach(function(c) {
      return c(f);
    });
    return f;
  }
  var Wa = "undefined" !== typeof window ? window : "undefined" !== typeof global ? global : "undefined" !== typeof self ? self : {}, q = k(function(a) {
    a.exports = "undefined" !== typeof window ? window : "undefined" !== typeof Wa ? Wa : "undefined" !== typeof self ? self : {};
  }), Jc = Array.prototype.slice, Xa = function(a, b) {
    "length" in a || (a = [a]);
    for (a = Jc.call(a);a.length;) {
      var c = a.shift(), d = b(c);
      if (d) {
        return d;
      }
      c.childNodes && c.childNodes.length && (a = Jc.call(c.childNodes).concat(a));
    }
  };
  n.prototype.nodeType = 8;
  n.prototype.nodeName = "#comment";
  n.prototype.toString = function() {
    return "[object Comment]";
  };
  y.prototype.type = "DOMTextNode";
  y.prototype.nodeType = 3;
  y.prototype.nodeName = "#text";
  y.prototype.toString = function() {
    return this.data;
  };
  y.prototype.replaceData = function(a, b, c) {
    var d = this.data, f = d.substring(0, a);
    a = d.substring(a + b, d.length);
    this.data = f + c + a;
    this.length = this.data.length;
  };
  var Kc = function(a) {
    var b = this, c = a.type;
    a.target || (a.target = b);
    b.listeners || (b.listeners = {});
    if (c = b.listeners[c]) {
      return c.forEach(function(c) {
        a.currentTarget = b;
        "function" === typeof c ? c(a) : c.handleEvent(a);
      });
    }
    b.parentNode && b.parentNode.dispatchEvent(a);
  }, Lc = function(a, b) {
    this.listeners || (this.listeners = {});
    this.listeners[a] || (this.listeners[a] = []);
    -1 === this.listeners[a].indexOf(b) && this.listeners[a].push(b);
  }, Mc = function(a, b) {
    this.listeners && this.listeners[a] && (a = this.listeners[a], b = a.indexOf(b), -1 !== b && a.splice(b, 1));
  }, me = "area base br col embed hr img input keygen link menuitem meta param source track wbr".split(" ");
  B.prototype.type = "DOMElement";
  B.prototype.nodeType = 1;
  B.prototype.appendChild = function(a) {
    a.parentNode && a.parentNode.removeChild(a);
    this.childNodes.push(a);
    a.parentNode = this;
    return a;
  };
  B.prototype.replaceChild = function(a, b) {
    a.parentNode && a.parentNode.removeChild(a);
    var c = this.childNodes.indexOf(b);
    b.parentNode = null;
    this.childNodes[c] = a;
    a.parentNode = this;
    return b;
  };
  B.prototype.removeChild = function(a) {
    var b = this.childNodes.indexOf(a);
    this.childNodes.splice(b, 1);
    a.parentNode = null;
    return a;
  };
  B.prototype.insertBefore = function(a, b) {
    a.parentNode && a.parentNode.removeChild(a);
    b = null === b || void 0 === b ? -1 : this.childNodes.indexOf(b);
    -1 < b ? this.childNodes.splice(b, 0, a) : this.childNodes.push(a);
    a.parentNode = this;
    return a;
  };
  B.prototype.setAttributeNS = function(a, b, c) {
    var d = null, f = b, g = b.indexOf(":");
    -1 < g && (d = b.substr(0, g), f = b.substr(g + 1));
    "INPUT" === this.tagName && "type" === b ? this.type = c : (this._attributes[a] || (this._attributes[a] = {}))[f] = {value:c, prefix:d};
  };
  B.prototype.getAttributeNS = function(a, b) {
    a = (a = this._attributes[a]) && a[b] && a[b].value;
    return "INPUT" === this.tagName && "type" === b ? this.type : "string" !== typeof a ? null : a;
  };
  B.prototype.removeAttributeNS = function(a, b) {
    (a = this._attributes[a]) && delete a[b];
  };
  B.prototype.hasAttributeNS = function(a, b) {
    a = this._attributes[a];
    return !!a && b in a;
  };
  B.prototype.setAttribute = function(a, b) {
    return this.setAttributeNS(null, a, b);
  };
  B.prototype.getAttribute = function(a) {
    return this.getAttributeNS(null, a);
  };
  B.prototype.removeAttribute = function(a) {
    return this.removeAttributeNS(null, a);
  };
  B.prototype.hasAttribute = function(a) {
    return this.hasAttributeNS(null, a);
  };
  B.prototype.removeEventListener = Mc;
  B.prototype.addEventListener = Lc;
  B.prototype.dispatchEvent = Kc;
  B.prototype.focus = function() {
  };
  B.prototype.toString = function() {
    return u(this);
  };
  B.prototype.getElementsByClassName = function(a) {
    var b = a.split(" "), c = [];
    Xa(this, function(a) {
      if (1 === a.nodeType) {
        var d = (a.className || "").split(" ");
        b.every(function(c) {
          return -1 !== d.indexOf(c);
        }) && c.push(a);
      }
    });
    return c;
  };
  B.prototype.getElementsByTagName = function(a) {
    a = a.toLowerCase();
    var b = [];
    Xa(this.childNodes, function(c) {
      1 !== c.nodeType || "*" !== a && c.tagName.toLowerCase() !== a || b.push(c);
    });
    return b;
  };
  B.prototype.contains = function(a) {
    return Xa(this, function(b) {
      return a === b;
    }) || !1;
  };
  v.prototype.type = "DocumentFragment";
  v.prototype.nodeType = 11;
  v.prototype.nodeName = "#document-fragment";
  v.prototype.appendChild = B.prototype.appendChild;
  v.prototype.replaceChild = B.prototype.replaceChild;
  v.prototype.removeChild = B.prototype.removeChild;
  v.prototype.toString = function() {
    return this.childNodes.map(function(a) {
      return String(a);
    }).join("");
  };
  V.prototype.initEvent = function(a, b, c) {
    this.type = a;
    this.bubbles = b;
    this.cancelable = c;
  };
  V.prototype.preventDefault = function() {
  };
  var ba = H.prototype;
  ba.createTextNode = function(a) {
    return new y(a, this);
  };
  ba.createElementNS = function(a, b) {
    return new B(b, this, null === a ? null : String(a));
  };
  ba.createElement = function(a) {
    return new B(a, this);
  };
  ba.createDocumentFragment = function() {
    return new v(this);
  };
  ba.createEvent = function(a) {
    return new V(a);
  };
  ba.createComment = function(a) {
    return new n(a, this);
  };
  ba.getElementById = function(a) {
    a = String(a);
    return Xa(this.childNodes, function(b) {
      if (String(b.id) === a) {
        return b;
      }
    }) || null;
  };
  ba.getElementsByClassName = B.prototype.getElementsByClassName;
  ba.getElementsByTagName = B.prototype.getElementsByTagName;
  ba.contains = B.prototype.contains;
  ba.removeEventListener = Mc;
  ba.addEventListener = Lc;
  ba.dispatchEvent = Kc;
  var Fe = new H, z = k(function(a) {
    var b = "undefined" !== typeof Wa ? Wa : "undefined" !== typeof window ? window : {};
    if ("undefined" !== typeof document) {
      a.exports = document;
    } else {
      var c = b["__GLOBAL_DOCUMENT_CACHE@4"];
      c || (c = b["__GLOBAL_DOCUMENT_CACHE@4"] = Fe);
      a.exports = c;
    }
  }), wa = 1, ca = q.navigator && q.navigator.userAgent || "", Nc = /AppleWebKit\/([\d.]+)/i.exec(ca), Ge = Nc ? parseFloat(Nc.pop()) : null, wb = /iPad/i.test(ca), xb = /iPhone/i.test(ca) && !wb, Oc = /iPod/i.test(ca), yb = xb || wb || Oc, He = function() {
    var a = ca.match(/OS (\d+)_/i);
    return a && a[1] ? a[1] : null;
  }(), Ja = /Android/i.test(ca), Ya = function() {
    var a = ca.match(/Android (\d+)(?:\.(\d+))?(?:\.(\d+))*/i);
    if (!a) {
      return null;
    }
    var b = a[1] && parseFloat(a[1]), c = a[2] && parseFloat(a[2]);
    return b && c ? parseFloat(a[1] + "." + a[2]) : b ? b : null;
  }(), Pc = Ja && /webkit/i.test(ca) && 2.3 > Ya, Qc = Ja && 5 > Ya && 537 > Ge, zb = /Firefox/i.test(ca), Rc = /Edge/i.test(ca), Ab = !Rc && /Chrome/i.test(ca), Y = /MSIE\s8\.0/.test(ca), Bb = function(a) {
    return a && parseFloat(a[1]);
  }(/MSIE\s(\d+)\.\d/.exec(ca)), Za = !!("ontouchstart" in q || q.DocumentTouch && z instanceof q.DocumentTouch), Sc = "backgroundSize" in z.createElement("video").style, Ie = Object.freeze({IS_IPAD:wb, IS_IPHONE:xb, IS_IPOD:Oc, IS_IOS:yb, IOS_VERSION:He, IS_ANDROID:Ja, ANDROID_VERSION:Ya, IS_OLD_ANDROID:Pc, IS_NATIVE_ANDROID:Qc, IS_FIREFOX:zb, IS_EDGE:Rc, IS_CHROME:Ab, IS_IE8:Y, IE_VERSION:Bb, TOUCH_ENABLED:Za, BACKGROUND_SIZE_SUPPORTED:Sc}), Aa, Cb = function(a, b, c) {
    void 0 === c && (c = !!Bb && 11 > Bb);
    "log" !== a && b.unshift(a.toUpperCase() + ":");
    Aa.history.push(b);
    b.unshift("VIDEOJS:");
    if (a = q.console && q.console[a]) {
      if (c && (b = b.map(function(c) {
        if (c && "object" === typeof c || Array.isArray(c)) {
          try {
            return JSON.stringify(c);
          } catch (f) {
          }
        }
        return String(c);
      }).join(" ")), a.apply) {
        a[Array.isArray(b) ? "apply" : "call"](q.console, b);
      } else {
        a(b);
      }
    }
  };
  Aa = function() {
    for (var a = [], b = 0;b < arguments.length;b++) {
      a[b] = arguments[b];
    }
    Cb("log", a);
  };
  Aa.history = [];
  Aa.error = function() {
    for (var a = [], b = 0;b < arguments.length;b++) {
      a[b] = arguments[b];
    }
    return Cb("error", a);
  };
  Aa.warn = function() {
    for (var a = [], b = 0;b < arguments.length;b++) {
      a[b] = arguments[b];
    }
    return Cb("warn", a);
  };
  var E = Aa, pc = function(a) {
    for (var b = "", c = 0;c < arguments.length;c++) {
      b += a[c].replace(/\n\r?\s*/g, "") + (arguments[c + 1] || "");
    }
    return b;
  }, Ga = {}, va = "vdata" + (new Date).getTime(), Ka = ua("querySelector"), Je = ua("querySelectorAll"), Db = !1, Tc, Eb = function() {
    var a = z.getElementsByTagName("video"), b = z.getElementsByTagName("audio"), c = [];
    if (a && 0 < a.length) {
      for (var d = 0, f = a.length;d < f;d++) {
        c.push(a[d]);
      }
    }
    if (b && 0 < b.length) {
      for (d = 0, f = b.length;d < f;d++) {
        c.push(b[d]);
      }
    }
    if (c && 0 < c.length) {
      for (d = 0, f = c.length;d < f;d++) {
        if ((a = c[d]) && a.getAttribute) {
          void 0 === a.player && null !== a.getAttribute("data-setup") && Tc(a);
        } else {
          setTimeout(Eb, 1);
          break;
        }
      }
    } else {
      Db || setTimeout(Eb, 1);
    }
  };
  "complete" === z.readyState ? Db = !0 : Ia(q, "load", function() {
    Db = !0;
  });
  var Uc = function(a) {
    var b = z.createElement("style");
    b.className = a;
    return b;
  }, Vc = function(a, b) {
    a.styleSheet ? a.styleSheet.cssText = b : a.textContent = b;
  }, A = function(a, b, c) {
    b.guid || (b.guid = wa++);
    var d = function() {
      return b.apply(a, arguments);
    };
    d.guid = c ? c + "_" + b.guid : b.guid;
    return d;
  }, Wc = function(a, b) {
    for (var c = -1, d = a.length;++c < d && !1 !== b(a[c], c, a);) {
    }
    return a;
  }, ra = function(a) {
    var b = typeof a;
    return !!a && ("object" == b || "function" == b);
  }, xa = function(a) {
    return !!a && "object" == typeof a;
  }, Ke = Object.prototype.toString, Fb = function(a) {
    return "string" == typeof a || xa(a) && "[object String]" == Ke.call(a);
  }, Xc = Error.prototype, Gb = Object.prototype.propertyIsEnumerable, Le = Array.prototype.splice, Yc, Hb, Zc, $c, ad;
  (function(a) {
    var b = function() {
      this.x = a;
    }, c = {0:a, length:a}, d = [];
    b.prototype = {valueOf:a, y:a};
    for (var f in new b) {
      d.push(f);
    }
    Yc = Gb.call(Xc, "message") || Gb.call(Xc, "name");
    Hb = Gb.call(b, "prototype");
    Zc = !/valueOf/.test(d);
    $c = "x" != d[0];
    Le.call(c, 0, 1);
    ad = "xx" != "x" + Object("x")[0];
  })(1, 0);
  var bd = function(a) {
    if (ad && Fb(a)) {
      for (var b = -1, c = a.length, d = Object(a);++b < c;) {
        d[b] = a.charAt(b);
      }
      return d;
    }
    return ra(a) ? a : Object(a);
  }, La = function(a) {
    return "number" == typeof a && -1 < a && 0 == a % 1 && 9007199254740991 >= a;
  }, Me = function(a) {
    return function(b) {
      return null == b ? void 0 : bd(b)[a];
    };
  }("length"), Ma = function(a) {
    return null != a && La(Me(a));
  }, cd = Object.prototype, Ne = cd.hasOwnProperty, Oe = cd.propertyIsEnumerable, $a = function(a) {
    return xa(a) && Ma(a) && Ne.call(a, "callee") && !Oe.call(a, "callee");
  }, Pe = Object.prototype.toString, Ib = function(a) {
    return ra(a) && "[object Function]" == Pe.call(a);
  }, dd = function() {
    try {
      Object("[object Object]");
    } catch (a) {
      return function() {
        return !1;
      };
    }
    return function(a) {
      return "function" != typeof a.toString && "string" == typeof(a + "");
    };
  }(), Qe = /^\[object .+?Constructor\]$/, ed = Function.prototype.toString, fd = RegExp("^" + ed.call(Object.prototype.hasOwnProperty).replace(/[\\^$.*+?()[\]{}|]/g, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"), Jb = function(a, b) {
    a = null == a ? void 0 : a[b];
    return (null == a ? 0 : Ib(a) ? fd.test(ed.call(a)) : xa(a) && (dd(a) ? fd : Qe).test(a)) ? a : void 0;
  }, Re = Object.prototype.toString, ab = Jb(Array, "isArray") || function(a) {
    return xa(a) && La(a.length) && "[object Array]" == Re.call(a);
  }, Se = function(a) {
    return function(b, c, d) {
      var f = bd(b);
      d = d(b);
      for (var g = d.length, w = a ? g : -1;a ? w-- : ++w < g;) {
        var e = d[w];
        if (!1 === c(f[e], e, f)) {
          break;
        }
      }
      return b;
    };
  }(), Te = /^\d+$/, Kb = function(a, b) {
    a = "number" == typeof a || Te.test(a) ? +a : -1;
    return -1 < a && 0 == a % 1 && a < (null == b ? 9007199254740991 : b);
  }, Lb = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" "), gd = Error.prototype, Na = Object.prototype, Ue = String.prototype, bb = Na.hasOwnProperty, Ve = Na.toString, aa = {};
  aa["[object Array]"] = aa["[object Date]"] = aa["[object Number]"] = {constructor:!0, toLocaleString:!0, toString:!0, valueOf:!0};
  aa["[object Boolean]"] = aa["[object String]"] = {constructor:!0, toString:!0, valueOf:!0};
  aa["[object Error]"] = aa["[object Function]"] = aa["[object RegExp]"] = {constructor:!0, toString:!0};
  aa["[object Object]"] = {constructor:!0};
  Wc(Lb, function(a) {
    for (var b in aa) {
      if (bb.call(aa, b)) {
        var c = aa[b];
        c[a] = bb.call(c, a);
      }
    }
  });
  var sb = function(a) {
    if (null == a) {
      return [];
    }
    ra(a) || (a = Object(a));
    for (var b = a.length, b = b && La(b) && (ab(a) || $a(a) || Fb(a)) && b || 0, c = a.constructor, d = -1, c = Ib(c) && c.prototype || Na, f = c === a, g = Array(b), w = 0 < b, e = Yc && (a === gd || a instanceof Error), p = Hb && Ib(a);++d < b;) {
      g[d] = d + "";
    }
    for (var h in a) {
      p && "prototype" == h || e && ("message" == h || "name" == h) || w && Kb(h, b) || "constructor" == h && (f || !bb.call(a, h)) || g.push(h);
    }
    if (Zc && a !== Na) {
      for (b = a === Ue ? "[object String]" : a === gd ? "[object Error]" : Ve.call(a), d = aa[b] || aa["[object Object]"], "[object Object]" == b && (c = Na), b = Lb.length;b--;) {
        h = Lb[b], w = d[h], f && w || (w ? !bb.call(a, h) : a[h] === c[h]) || g.push(h);
      }
    }
    return g;
  }, hd = function(a, b) {
    return Se(a, b, sb);
  }, id = Object.prototype, Mb = id.hasOwnProperty, We = id.toString, K = {};
  K["[object Float32Array]"] = K["[object Float64Array]"] = K["[object Int8Array]"] = K["[object Int16Array]"] = K["[object Int32Array]"] = K["[object Uint8Array]"] = K["[object Uint8ClampedArray]"] = K["[object Uint16Array]"] = K["[object Uint32Array]"] = !0;
  K["[object Arguments]"] = K["[object Array]"] = K["[object ArrayBuffer]"] = K["[object Boolean]"] = K["[object Date]"] = K["[object Error]"] = K["[object Function]"] = K["[object Map]"] = K["[object Number]"] = K["[object Object]"] = K["[object RegExp]"] = K["[object Set]"] = K["[object String]"] = K["[object WeakMap]"] = !1;
  var Xe = Object.prototype.toString, jd = function(a) {
    return xa(a) && La(a.length) && !!K[Xe.call(a)];
  }, yc = $a, wc = ab, vc = Ma, xc = function(a) {
    var b;
    if (!xa(a) || "[object Object]" != We.call(a) || dd(a) || $a(a) || !(Mb.call(a, "constructor") || (b = a.constructor, "function" != typeof b || b instanceof b))) {
      return !1;
    }
    var c;
    if ($c) {
      return hd(a, function(b, a, g) {
        c = Mb.call(g, a);
        return !1;
      }), !1 !== c;
    }
    hd(a, function(b, a) {
      c = a;
    });
    return void 0 === c || Mb.call(a, c);
  }, we = jd, Ye = Object.prototype.hasOwnProperty, kd = function(a) {
    for (var b = sb(a), c = b.length, d = c && a.length, f = !!d && La(d) && (ab(a) || $a(a) || Fb(a)), g = -1, w = [];++g < c;) {
      var e = b[g];
      (f && Kb(e, d) || Ye.call(a, e)) && w.push(e);
    }
    return w;
  }, ld = Jb(Object, "keys"), ue = Wc, re = ab, qe = Ma, pe = ra, ve = xa, se = jd, te = ld ? function(a) {
    var b = null == a ? void 0 : a.constructor;
    return "function" == typeof b && b.prototype === a || ("function" == typeof a ? Hb : Ma(a)) ? kd(a) : ra(a) ? ld(a) : [];
  } : kd, Ze = function(a) {
    return a;
  }, md = Math.max, $e = function(a, b, c) {
    if ("function" != typeof a) {
      return Ze;
    }
    if (void 0 === b) {
      return a;
    }
    switch(c) {
      case 1:
        return function(c) {
          return a.call(b, c);
        };
      case 3:
        return function(c, f, g) {
          return a.call(b, c, f, g);
        };
      case 4:
        return function(c, f, g, w) {
          return a.call(b, c, f, g, w);
        };
      case 5:
        return function(c, f, g, w, e) {
          return a.call(b, c, f, g, w, e);
        };
    }
    return function() {
      return a.apply(b, arguments);
    };
  }, af = function(a, b) {
    if ("function" != typeof a) {
      throw new TypeError("Expected a function");
    }
    b = md(void 0 === b ? a.length - 1 : +b || 0, 0);
    return function() {
      for (var c = arguments, d = -1, f = md(c.length - b, 0), g = Array(f);++d < f;) {
        g[d] = c[b + d];
      }
      switch(b) {
        case 0:
          return a.call(this, g);
        case 1:
          return a.call(this, c[0], g);
        case 2:
          return a.call(this, c[0], c[1], g);
      }
      f = Array(b + 1);
      for (d = -1;++d < b;) {
        f[d] = c[d];
      }
      f[b] = g;
      return a.apply(this, f);
    };
  }, Ac = function(a) {
    return af(function(b, c) {
      var d = -1, f = null == b ? 0 : c.length, g = 2 < f ? c[f - 2] : void 0, w = 2 < f ? c[2] : void 0, e = 1 < f ? c[f - 1] : void 0;
      "function" == typeof g ? (g = $e(g, e, 5), f -= 2) : (g = "function" == typeof e ? e : void 0, f -= g ? 1 : 0);
      if (e = w) {
        var e = c[0], h = c[1];
        if (ra(w)) {
          var p = typeof h;
          ("number" == p ? Ma(w) && Kb(h, w.length) : "string" == p && h in w) ? (w = w[h], e = e === e ? e === w : w !== w) : e = !1;
        } else {
          e = !1;
        }
      }
      e && (g = 3 > f ? void 0 : g, f = 1);
      for (;++d < f;) {
        (w = c[d]) && a(b, w, g);
      }
      return b;
    });
  }(uc), l = function() {
    function a(b, c, a) {
      this.player_ = !b && this.play ? b = this : b;
      this.options_ = U({}, this.options_);
      c = this.options_ = U(this.options_, c);
      this.id_ = c.id || c.el && c.el.id;
      this.id_ || (this.id_ = (b && b.id && b.id() || "no_player") + "_component_" + wa++);
      this.name_ = c.name || null;
      c.el ? this.el_ = c.el : !1 !== c.createEl && (this.el_ = this.createEl());
      this.children_ = [];
      this.childIndex_ = {};
      this.childNameIndex_ = {};
      !1 !== c.initChildren && this.initChildren();
      this.ready(a);
      !1 !== c.reportTouchActivity && this.enableTouchActivity();
    }
    a.prototype.dispose = function() {
      this.trigger({type:"dispose", bubbles:!1});
      if (this.children_) {
        for (var b = this.children_.length - 1;0 <= b;b--) {
          this.children_[b].dispose && this.children_[b].dispose();
        }
      }
      this.childNameIndex_ = this.childIndex_ = this.children_ = null;
      this.off();
      this.el_.parentNode && this.el_.parentNode.removeChild(this.el_);
      m(this.el_);
      this.el_ = null;
    };
    a.prototype.player = function() {
      return this.player_;
    };
    a.prototype.options = function(b) {
      E.warn("this.options() has been deprecated and will be moved to the constructor in 6.0");
      return b ? this.options_ = U(this.options_, b) : this.options_;
    };
    a.prototype.el = function() {
      return this.el_;
    };
    a.prototype.createEl = function(b, c, a) {
      return r(b, c, a);
    };
    a.prototype.localize = function(b) {
      var c = this.player_.language && this.player_.language(), a = this.player_.languages && this.player_.languages();
      if (!c || !a) {
        return b;
      }
      var f = a[c];
      if (f && f[b]) {
        return f[b];
      }
      c = c.split("-")[0];
      return (a = a[c]) && a[b] ? a[b] : b;
    };
    a.prototype.contentEl = function() {
      return this.contentEl_ || this.el_;
    };
    a.prototype.id = function() {
      return this.id_;
    };
    a.prototype.name = function() {
      return this.name_;
    };
    a.prototype.children = function() {
      return this.children_;
    };
    a.prototype.getChildById = function(b) {
      return this.childIndex_[b];
    };
    a.prototype.getChild = function(b) {
      if (b) {
        return b = S(b), this.childNameIndex_[b];
      }
    };
    a.prototype.addChild = function(b, c, d) {
      void 0 === c && (c = {});
      void 0 === d && (d = this.children_.length);
      var f;
      if ("string" === typeof b) {
        f = S(b);
        c || (c = {});
        !0 === c && (E.warn("Initializing a child component with `true` is deprecated. Children should be defined in an array when possible, but if necessary use an object instead of `true`."), c = {});
        b = c.componentClass || f;
        c.name = f;
        var g = a.getComponent(b);
        if (!g) {
          throw Error("Component " + b + " does not exist");
        }
        if ("function" !== typeof g) {
          return null;
        }
        c = new g(this.player_ || this, c);
      } else {
        c = b;
      }
      this.children_.splice(d, 0, c);
      "function" === typeof c.id && (this.childIndex_[c.id()] = c);
      (f = f || c.name && c.name()) && (this.childNameIndex_[f] = c);
      "function" === typeof c.el && c.el() && (d = this.contentEl().children[d] || null, this.contentEl().insertBefore(c.el(), d));
      return c;
    };
    a.prototype.removeChild = function(b) {
      "string" === typeof b && (b = this.getChild(b));
      if (b && this.children_) {
        for (var c = !1, a = this.children_.length - 1;0 <= a;a--) {
          if (this.children_[a] === b) {
            c = !0;
            this.children_.splice(a, 1);
            break;
          }
        }
        c && (this.childIndex_[b.id()] = null, this.childNameIndex_[b.name()] = null, (c = b.el()) && c.parentNode === this.contentEl() && this.contentEl().removeChild(b.el()));
      }
    };
    a.prototype.initChildren = function() {
      var b = this, c = this.options_.children;
      if (c) {
        var d = this.options_, f, g = a.getComponent("Tech");
        f = Array.isArray(c) ? c : Object.keys(c);
        f.concat(Object.keys(this.options_).filter(function(c) {
          return !f.some(function(b) {
            return "string" === typeof b ? c === b : c === b.name;
          });
        })).map(function(a) {
          var d;
          "string" === typeof a ? (d = a, a = c[d] || b.options_[d] || {}) : d = a.name;
          return {name:d, opts:a};
        }).filter(function(c) {
          return (c = a.getComponent(c.opts.componentClass || S(c.name))) && !g.isTech(c);
        }).forEach(function(c) {
          var a = c.name;
          c = c.opts;
          void 0 !== d[a] && (c = d[a]);
          !1 !== c && (!0 === c && (c = {}), c.playerOptions = b.options_.playerOptions, (c = b.addChild(a, c)) && (b[a] = c));
        });
      }
    };
    a.prototype.buildCSSClass = function() {
      return "";
    };
    a.prototype.on = function(b, c, a) {
      var d = this;
      if ("string" === typeof b || Array.isArray(b)) {
        da(this.el_, b, A(this, c));
      } else {
        var g = A(this, a), w = function() {
          return d.off(b, c, g);
        };
        w.guid = g.guid;
        this.on("dispose", w);
        a = function() {
          return d.off("dispose", w);
        };
        a.guid = g.guid;
        b.nodeName ? (da(b, c, g), da(b, "dispose", a)) : "function" === typeof b.on && (b.on(c, g), b.on("dispose", a));
      }
      return this;
    };
    a.prototype.off = function(a, c, d) {
      !a || "string" === typeof a || Array.isArray(a) ? ka(this.el_, a, c) : (d = A(this, d), this.off("dispose", d), a.nodeName ? (ka(a, c, d), ka(a, "dispose", d)) : (a.off(c, d), a.off("dispose", d)));
      return this;
    };
    a.prototype.one = function(a, c, d) {
      var b = this;
      if ("string" === typeof a || Array.isArray(a)) {
        Ia(this.el_, a, A(this, c));
      } else {
        var g = A(this, d), w = function() {
          b.off(a, c, w);
          g.apply(null, arguments);
        };
        w.guid = g.guid;
        this.on(a, c, w);
      }
      return this;
    };
    a.prototype.trigger = function(a, c) {
      Va(this.el_, a, c);
      return this;
    };
    a.prototype.ready = function(a, c) {
      void 0 === c && (c = !1);
      a && (this.isReady_ ? c ? a.call(this) : this.setTimeout(a, 1) : (this.readyQueue_ = this.readyQueue_ || [], this.readyQueue_.push(a)));
      return this;
    };
    a.prototype.triggerReady = function() {
      this.isReady_ = !0;
      this.setTimeout(function() {
        var a = this.readyQueue_;
        this.readyQueue_ = [];
        a && 0 < a.length && a.forEach(function(c) {
          c.call(this);
        }, this);
        this.trigger("ready");
      }, 1);
    };
    a.prototype.$ = function(a, c) {
      return Ka(a, c || this.contentEl());
    };
    a.prototype.$$ = function(a, c) {
      return Je(a, c || this.contentEl());
    };
    a.prototype.hasClass = function(a) {
      return Q(this.el_, a);
    };
    a.prototype.addClass = function(a) {
      ma(this.el_, a);
      return this;
    };
    a.prototype.removeClass = function(a) {
      oa(this.el_, a);
      return this;
    };
    a.prototype.toggleClass = function(a, c) {
      C(this.el_, a, c);
      return this;
    };
    a.prototype.show = function() {
      this.removeClass("vjs-hidden");
      return this;
    };
    a.prototype.hide = function() {
      this.addClass("vjs-hidden");
      return this;
    };
    a.prototype.lockShowing = function() {
      this.addClass("vjs-lock-showing");
      return this;
    };
    a.prototype.unlockShowing = function() {
      this.removeClass("vjs-lock-showing");
      return this;
    };
    a.prototype.getAttribute = function(a) {
      return this.el_.getAttribute(a);
    };
    a.prototype.setAttribute = function(a, c) {
      this.el_.setAttribute(a, c);
      return this;
    };
    a.prototype.removeAttribute = function(a) {
      this.el_.removeAttribute(a);
      return this;
    };
    a.prototype.width = function(a, c) {
      return this.dimension("width", a, c);
    };
    a.prototype.height = function(a, c) {
      return this.dimension("height", a, c);
    };
    a.prototype.dimensions = function(a, c) {
      return this.width(a, !0).height(c);
    };
    a.prototype.dimension = function(a, c, d) {
      if (void 0 !== c) {
        if (null === c || c !== c) {
          c = 0;
        }
        -1 !== ("" + c).indexOf("%") || -1 !== ("" + c).indexOf("px") ? this.el_.style[a] = c : this.el_.style[a] = "auto" === c ? "" : c + "px";
        d || this.trigger("resize");
        return this;
      }
      if (!this.el_) {
        return 0;
      }
      c = this.el_.style[a];
      d = c.indexOf("px");
      return -1 !== d ? parseInt(c.slice(0, d), 10) : parseInt(this.el_["offset" + S(a)], 10);
    };
    a.prototype.currentDimension = function(a) {
      var c = 0;
      if ("width" !== a && "height" !== a) {
        throw Error("currentDimension only accepts width or height value");
      }
      "function" === typeof q.getComputedStyle && (c = q.getComputedStyle(this.el_), c = c.getPropertyValue(a) || c[a]);
      c = parseFloat(c);
      0 === c && (a = "offset" + S(a), c = this.el_[a]);
      return c;
    };
    a.prototype.currentDimensions = function() {
      return {width:this.currentDimension("width"), height:this.currentDimension("height")};
    };
    a.prototype.currentWidth = function() {
      return this.currentDimension("width");
    };
    a.prototype.currentHeight = function() {
      return this.currentDimension("height");
    };
    a.prototype.emitTapEvents = function() {
      var a = 0, c = null, d;
      this.on("touchstart", function(b) {
        1 === b.touches.length && (c = {pageX:b.touches[0].pageX, pageY:b.touches[0].pageY}, a = (new Date).getTime(), d = !0);
      });
      this.on("touchmove", function(a) {
        if (1 < a.touches.length) {
          d = !1;
        } else {
          if (c) {
            var b = a.touches[0].pageX - c.pageX;
            a = a.touches[0].pageY - c.pageY;
            10 < Math.sqrt(b * b + a * a) && (d = !1);
          }
        }
      });
      var f = function() {
        d = !1;
      };
      this.on("touchleave", f);
      this.on("touchcancel", f);
      this.on("touchend", function(b) {
        c = null;
        !0 === d && 200 > (new Date).getTime() - a && (b.preventDefault(), this.trigger("tap"));
      });
    };
    a.prototype.enableTouchActivity = function() {
      if (this.player() && this.player().reportUserActivity) {
        var a = A(this.player(), this.player().reportUserActivity), c;
        this.on("touchstart", function() {
          a();
          this.clearInterval(c);
          c = this.setInterval(a, 250);
        });
        var d = function(b) {
          a();
          this.clearInterval(c);
        };
        this.on("touchmove", a);
        this.on("touchend", d);
        this.on("touchcancel", d);
      }
    };
    a.prototype.setTimeout = function(a, c) {
      a = A(this, a);
      var b = q.setTimeout(a, c);
      a = function() {
        this.clearTimeout(b);
      };
      a.guid = "vjs-timeout-" + b;
      this.on("dispose", a);
      return b;
    };
    a.prototype.clearTimeout = function(a) {
      q.clearTimeout(a);
      var c = function() {
      };
      c.guid = "vjs-timeout-" + a;
      this.off("dispose", c);
      return a;
    };
    a.prototype.setInterval = function(a, c) {
      a = A(this, a);
      var b = q.setInterval(a, c);
      a = function() {
        this.clearInterval(b);
      };
      a.guid = "vjs-interval-" + b;
      this.on("dispose", a);
      return b;
    };
    a.prototype.clearInterval = function(a) {
      q.clearInterval(a);
      var c = function() {
      };
      c.guid = "vjs-interval-" + a;
      this.off("dispose", c);
      return a;
    };
    a.registerComponent = function(b, c) {
      if (b) {
        return b = S(b), a.components_ || (a.components_ = {}), a.components_[b] = c;
      }
    };
    a.getComponent = function(b) {
      if (b) {
        b = S(b);
        if (a.components_ && a.components_[b]) {
          return a.components_[b];
        }
        if (q && q.videojs && q.videojs[b]) {
          return E.warn("The " + b + " component was added to the videojs object when it should be registered using videojs.registerComponent(name, component)"), q.videojs[b];
        }
      }
    };
    a.extend = function(b) {
      b = b || {};
      E.warn("Component.extend({}) has been deprecated, use videojs.extend(Component, {}) instead");
      var c = b.init || b.init || this.prototype.init || this.prototype.init || function() {
      }, d = function() {
        c.apply(this, arguments);
      };
      d.prototype = Object.create(this.prototype);
      d.prototype.constructor = d;
      d.extend = a.extend;
      for (var f in b) {
        b.hasOwnProperty(f) && (d.prototype[f] = b[f]);
      }
      return d;
    };
    return a;
  }();
  l.registerComponent("Component", l);
  var Z = function() {
  };
  Z.prototype.allowedEvents_ = {};
  Z.prototype.on = function(a, b) {
    var c = this.addEventListener;
    this.addEventListener = function() {
    };
    da(this, a, b);
    this.addEventListener = c;
  };
  Z.prototype.addEventListener = Z.prototype.on;
  Z.prototype.off = function(a, b) {
    ka(this, a, b);
  };
  Z.prototype.removeEventListener = Z.prototype.off;
  Z.prototype.one = function(a, b) {
    var c = this.addEventListener;
    this.addEventListener = function() {
    };
    Ia(this, a, b);
    this.addEventListener = c;
  };
  Z.prototype.trigger = function(a) {
    var b = a.type || a;
    "string" === typeof a && (a = {type:b});
    a = rb(a);
    if (this.allowedEvents_[b] && this["on" + b]) {
      this["on" + b](a);
    }
    Va(this, a);
  };
  Z.prototype.dispatchEvent = Z.prototype.trigger;
  for (var sa = {}, cb = ["requestFullscreen exitFullscreen fullscreenElement fullscreenEnabled fullscreenchange fullscreenerror".split(" "), "webkitRequestFullscreen webkitExitFullscreen webkitFullscreenElement webkitFullscreenEnabled webkitfullscreenchange webkitfullscreenerror".split(" "), "webkitRequestFullScreen webkitCancelFullScreen webkitCurrentFullScreenElement webkitCancelFullScreen webkitfullscreenchange webkitfullscreenerror".split(" "), "mozRequestFullScreen mozCancelFullScreen mozFullScreenElement mozFullScreenEnabled mozfullscreenchange mozfullscreenerror".split(" "), 
  "msRequestFullscreen msExitFullscreen msFullscreenElement msFullscreenEnabled MSFullscreenChange MSFullscreenError".split(" ")], bf = cb[0], db, T = 0;T < cb.length;T++) {
    if (cb[T][1] in z) {
      db = cb[T];
      break;
    }
  }
  if (db) {
    for (T = 0;T < db.length;T++) {
      sa[bf[T]] = db[T];
    }
  }
  var nd = Object.prototype.toString, eb = Object.prototype.hasOwnProperty, od = Object.prototype.toString, cf = Array.prototype.slice, pd = function(a) {
    var b = nd.call(a), c = "[object Arguments]" === b;
    c || (c = "[object Array]" !== b && null !== a && "object" === typeof a && "number" === typeof a.length && 0 <= a.length && "[object Function]" === nd.call(a.callee));
    return c;
  }, qd = Object.prototype.propertyIsEnumerable, df = !qd.call({toString:null}, "toString"), ef = qd.call(function() {
  }, "prototype"), fb = "toString toLocaleString valueOf hasOwnProperty isPrototypeOf propertyIsEnumerable constructor".split(" "), Nb = function(a) {
    var b = a.constructor;
    return b && b.prototype === a;
  }, ff = {$console:!0, $external:!0, $frame:!0, $frameElement:!0, $frames:!0, $innerHeight:!0, $innerWidth:!0, $outerHeight:!0, $outerWidth:!0, $pageXOffset:!0, $pageYOffset:!0, $parent:!0, $scrollLeft:!0, $scrollTop:!0, $scrollX:!0, $scrollY:!0, $self:!0, $webkitIndexedDB:!0, $webkitStorageInfo:!0, $window:!0}, gf = function() {
    if ("undefined" === typeof window) {
      return !1;
    }
    for (var a in window) {
      try {
        if (!ff["$" + a] && eb.call(window, a) && null !== window[a] && "object" === typeof window[a]) {
          try {
            Nb(window[a]);
          } catch (b) {
            return !0;
          }
        }
      } catch (b) {
        return !0;
      }
    }
    return !1;
  }(), gb = function(a) {
    var b = null !== a && "object" === typeof a, c = "[object Function]" === od.call(a), d = pd(a), f = b && "[object String]" === od.call(a), g = [];
    if (!b && !c && !d) {
      throw new TypeError("Object.keys called on a non-object");
    }
    b = ef && c;
    if (f && 0 < a.length && !eb.call(a, 0)) {
      for (f = 0;f < a.length;++f) {
        g.push(String(f));
      }
    }
    if (d && 0 < a.length) {
      for (d = 0;d < a.length;++d) {
        g.push(String(d));
      }
    } else {
      for (var w in a) {
        b && "prototype" === w || !eb.call(a, w) || g.push(String(w));
      }
    }
    if (df) {
      var e;
      if ("undefined" !== typeof window && gf) {
        try {
          e = Nb(a);
        } catch (L) {
          e = !1;
        }
      } else {
        e = Nb(a);
      }
      for (d = 0;d < fb.length;++d) {
        e && "constructor" === fb[d] || !eb.call(a, fb[d]) || g.push(fb[d]);
      }
    }
    return g;
  };
  gb.shim = function() {
    if (Object.keys) {
      if (!function() {
        return 2 === (Object.keys(arguments) || "").length;
      }(1, 2)) {
        var a = Object.keys;
        Object.keys = function(b) {
          return pd(b) ? a(cf.call(b)) : a(b);
        };
      }
    } else {
      Object.keys = gb;
    }
    return Object.keys || gb;
  };
  var hf = Object.prototype.hasOwnProperty, jf = Object.prototype.toString, kf = function(a, b, c) {
    if ("[object Function]" !== jf.call(b)) {
      throw new TypeError("iterator must be a function");
    }
    var d = a.length;
    if (d === +d) {
      for (var f = 0;f < d;f++) {
        b.call(c, a[f], f, a);
      }
    } else {
      for (f in a) {
        hf.call(a, f) && b.call(c, a[f], f, a);
      }
    }
  }, lf = "function" === typeof Symbol && "symbol" === typeof Symbol(), mf = Object.prototype.toString, nf = function() {
    var a = {};
    try {
      Object.defineProperty(a, "x", {enumerable:!1, value:a});
      for (var b in a) {
        return !1;
      }
      return a.x === a;
    } catch (c) {
      return !1;
    }
  }, rd = Object.defineProperty && nf(), Ob = function(a, b) {
    var c = 2 < arguments.length ? arguments[2] : {}, d = gb(b);
    lf && (d = d.concat(Object.getOwnPropertySymbols(b)));
    kf(d, function(d) {
      var f = b[d], w = c[d];
      if (!(d in a) || "function" === typeof w && "[object Function]" === mf.call(w) && w()) {
        rd ? Object.defineProperty(a, d, {configurable:!0, enumerable:!1, value:f, writable:!0}) : a[d] = f;
      }
    });
  };
  Ob.supportsDescriptors = !!rd;
  var sd = Object.prototype.toString, hb = Object.prototype.hasOwnProperty, td = Object.prototype.toString, of = Array.prototype.slice, ud = function(a) {
    var b = sd.call(a), c = "[object Arguments]" === b;
    c || (c = "[object Array]" !== b && null !== a && "object" === typeof a && "number" === typeof a.length && 0 <= a.length && "[object Function]" === sd.call(a.callee));
    return c;
  }, vd = Object.prototype.propertyIsEnumerable, pf = !vd.call({toString:null}, "toString"), qf = vd.call(function() {
  }, "prototype"), ib = "toString toLocaleString valueOf hasOwnProperty isPrototypeOf propertyIsEnumerable constructor".split(" "), Pb = function(a) {
    var b = a.constructor;
    return b && b.prototype === a;
  }, rf = {$console:!0, $external:!0, $frame:!0, $frameElement:!0, $frames:!0, $innerHeight:!0, $innerWidth:!0, $outerHeight:!0, $outerWidth:!0, $pageXOffset:!0, $pageYOffset:!0, $parent:!0, $scrollLeft:!0, $scrollTop:!0, $scrollX:!0, $scrollY:!0, $self:!0, $webkitIndexedDB:!0, $webkitStorageInfo:!0, $window:!0}, sf = function() {
    if ("undefined" === typeof window) {
      return !1;
    }
    for (var a in window) {
      try {
        if (!rf["$" + a] && hb.call(window, a) && null !== window[a] && "object" === typeof window[a]) {
          try {
            Pb(window[a]);
          } catch (b) {
            return !0;
          }
        }
      } catch (b) {
        return !0;
      }
    }
    return !1;
  }(), Oa = function(a) {
    var b = null !== a && "object" === typeof a, c = "[object Function]" === td.call(a), d = ud(a), f = b && "[object String]" === td.call(a), g = [];
    if (!b && !c && !d) {
      throw new TypeError("Object.keys called on a non-object");
    }
    b = qf && c;
    if (f && 0 < a.length && !hb.call(a, 0)) {
      for (f = 0;f < a.length;++f) {
        g.push(String(f));
      }
    }
    if (d && 0 < a.length) {
      for (d = 0;d < a.length;++d) {
        g.push(String(d));
      }
    } else {
      for (var w in a) {
        b && "prototype" === w || !hb.call(a, w) || g.push(String(w));
      }
    }
    if (pf) {
      var e;
      if ("undefined" !== typeof window && sf) {
        try {
          e = Pb(a);
        } catch (L) {
          e = !1;
        }
      } else {
        e = Pb(a);
      }
      for (d = 0;d < ib.length;++d) {
        e && "constructor" === ib[d] || !hb.call(a, ib[d]) || g.push(ib[d]);
      }
    }
    return g;
  };
  Oa.shim = function() {
    if (Object.keys) {
      if (!function() {
        return 2 === (Object.keys(arguments) || "").length;
      }(1, 2)) {
        var a = Object.keys;
        Object.keys = function(b) {
          return ud(b) ? a(of.call(b)) : a(b);
        };
      }
    } else {
      Object.keys = Oa;
    }
    return Object.keys || Oa;
  };
  var Qb = Array.prototype.slice, tf = Object.prototype.toString, uf = function(a) {
    var b = this;
    if ("function" !== typeof b || "[object Function]" !== tf.call(b)) {
      throw new TypeError("Function.prototype.bind called on incompatible " + b);
    }
    for (var c = Qb.call(arguments, 1), d, f = Math.max(0, b.length - c.length), g = [], w = 0;w < f;w++) {
      g.push("$" + w);
    }
    d = Function("binder", "return function (" + g.join(",") + "){ return binder.apply(this,arguments); }")(function() {
      if (this instanceof d) {
        var f = b.apply(this, c.concat(Qb.call(arguments)));
        return Object(f) === f ? f : this;
      }
      return b.apply(a, c.concat(Qb.call(arguments)));
    });
    b.prototype && (f = function() {
    }, f.prototype = b.prototype, d.prototype = new f, f.prototype = null);
    return d;
  }, wd = Function.prototype.bind || uf, xd = function() {
    if ("function" !== typeof Symbol || "function" !== typeof Object.getOwnPropertySymbols) {
      return !1;
    }
    if ("symbol" === typeof Symbol.iterator) {
      return !0;
    }
    var a = {}, b = Symbol("test"), c = Object(b);
    if ("string" === typeof b || "[object Symbol]" !== Object.prototype.toString.call(b) || "[object Symbol]" !== Object.prototype.toString.call(c)) {
      return !1;
    }
    a[b] = 42;
    for (b in a) {
      return !1;
    }
    if (0 !== Oa(a).length || "function" === typeof Object.keys && 0 !== Object.keys(a).length || "function" === typeof Object.getOwnPropertyNames && 0 !== Object.getOwnPropertyNames(a).length) {
      return !1;
    }
    c = Object.getOwnPropertySymbols(a);
    return 1 !== c.length || c[0] !== b || !Object.prototype.propertyIsEnumerable.call(a, b) || "function" === typeof Object.getOwnPropertyDescriptor && (a = Object.getOwnPropertyDescriptor(a, b), 42 !== a.value || !0 !== a.enumerable) ? !1 : !0;
  }(), yd = Object, vf = wd.call(Function.call, Array.prototype.push), zd = wd.call(Function.call, Object.prototype.propertyIsEnumerable), wf = xd ? Object.getOwnPropertySymbols : null, Rb = function(a, b) {
    if ("undefined" === typeof a || null === a) {
      throw new TypeError("target must be an object");
    }
    var c = yd(a), d, f, g, w, e, h;
    for (d = 1;d < arguments.length;++d) {
      f = yd(arguments[d]);
      w = Oa(f);
      if (g = xd && (Object.getOwnPropertySymbols || wf)) {
        for (e = g(f), g = 0;g < e.length;++g) {
          h = e[g], zd(f, h) && vf(w, h);
        }
      }
      for (g = 0;g < w.length;++g) {
        h = w[g], e = f[h], zd(f, h) && (c[h] = e);
      }
    }
    return c;
  }, xf = function() {
    if (!Object.assign || !Object.preventExtensions) {
      return !1;
    }
    var a = Object.preventExtensions({1:2});
    try {
      Object.assign(a, "xy");
    } catch (b) {
      return "y" === a[1];
    }
    return !1;
  }, Sb = function() {
    if (!Object.assign) {
      return Rb;
    }
    var a;
    if (Object.assign) {
      for (var b = "abcdefghijklmnopqrst".split(""), c = {}, d = 0;d < b.length;++d) {
        c[b[d]] = b[d];
      }
      b = Object.assign({}, c);
      c = "";
      for (a in b) {
        c += a;
      }
      a = "abcdefghijklmnopqrst" !== c;
    } else {
      a = !1;
    }
    return a || xf() ? Rb : Object.assign;
  }, Ad = Sb();
  Ob(Ad, {implementation:Rb, getPolyfill:Sb, shim:function() {
    var a = Sb();
    Ob(Object, {assign:a}, {assign:function() {
      return Object.assign !== a;
    }});
    return a;
  }});
  var O = Ad;
  X.prototype.code = 0;
  X.prototype.message = "";
  X.prototype.status = null;
  X.errorTypes = "MEDIA_ERR_CUSTOM MEDIA_ERR_ABORTED MEDIA_ERR_NETWORK MEDIA_ERR_DECODE MEDIA_ERR_SRC_NOT_SUPPORTED MEDIA_ERR_ENCRYPTED".split(" ");
  X.defaultMessages = {1:"You aborted the media playback", 2:"A network error caused the media download to fail part-way.", 3:"The media playback was aborted due to a corruption problem or because the media used features your browser did not support.", 4:"The media could not be loaded, either because the server or network failed or because the format is not supported.", 5:"The media is encrypted and we do not have the keys to decrypt it."};
  for (var Ba = 0;Ba < X.errorTypes.length;Ba++) {
    X[X.errorTypes[Ba]] = Ba, X.prototype[X.errorTypes[Ba]] = Ba;
  }
  var Tb = function(a) {
    return "kind label language id inBandMetadataTrackDispatchType mode src".split(" ").reduce(function(b, c, d) {
      a[c] && (b[c] = a[c]);
      return b;
    }, {cues:a.cues && Array.prototype.map.call(a.cues, function(a) {
      return {startTime:a.startTime, endTime:a.endTime, text:a.text, id:a.id};
    })});
  }, Bd = {textTracksToJson:function(a) {
    var b = a.$$("track"), c = Array.prototype.map.call(b, function(c) {
      return c.track;
    });
    return Array.prototype.map.call(b, function(c) {
      var a = Tb(c.track);
      c.src && (a.src = c.src);
      return a;
    }).concat(Array.prototype.filter.call(a.textTracks(), function(a) {
      return -1 === c.indexOf(a);
    }).map(Tb));
  }, jsonToTextTracks:function(a, b) {
    a.forEach(function(c) {
      var a = b.addRemoteTextTrack(c).track;
      !c.src && c.cues && c.cues.forEach(function(c) {
        return a.addCue(c);
      });
    });
    return b.textTracks();
  }, trackToJson_:Tb}, Pa = function(a) {
    function b(c, b) {
      c = a.call(this, c, b) || this;
      c.opened_ = c.hasBeenOpened_ = c.hasBeenFilled_ = !1;
      c.closeable(!c.options_.uncloseable);
      c.content(c.options_.content);
      c.contentEl_ = r("div", {className:"vjs-modal-dialog-content"}, {role:"document"});
      c.descEl_ = r("p", {className:"vjs-modal-dialog-description vjs-offscreen", id:c.el().getAttribute("aria-describedby")});
      e(c.descEl_, c.description());
      c.el_.appendChild(c.descEl_);
      c.el_.appendChild(c.contentEl_);
      return c;
    }
    __extends(b, a);
    b.prototype.createEl = function() {
      return a.prototype.createEl.call(this, "div", {className:this.buildCSSClass(), tabIndex:-1}, {"aria-describedby":this.id() + "_description", "aria-hidden":"true", "aria-label":this.label(), role:"dialog"});
    };
    b.prototype.buildCSSClass = function() {
      return "vjs-modal-dialog vjs-hidden " + a.prototype.buildCSSClass.call(this);
    };
    b.prototype.handleKeyPress = function(c) {
      27 === c.which && this.closeable() && this.close();
    };
    b.prototype.label = function() {
      return this.options_.label || this.localize("Modal Window");
    };
    b.prototype.description = function() {
      var c = this.options_.description || this.localize("This is a modal window.");
      this.closeable() && (c += " " + this.localize("This modal can be closed by pressing the Escape key or activating the close button."));
      return c;
    };
    b.prototype.open = function() {
      if (!this.opened_) {
        var c = this.player();
        this.trigger("beforemodalopen");
        this.opened_ = !0;
        (this.options_.fillAlways || !this.hasBeenOpened_ && !this.hasBeenFilled_) && this.fill();
        (this.wasPlaying_ = !c.paused()) && c.pause();
        if (this.closeable()) {
          this.on(this.el_.ownerDocument, "keydown", A(this, this.handleKeyPress));
        }
        c.controls(!1);
        this.show();
        this.el().setAttribute("aria-hidden", "false");
        this.trigger("modalopen");
        this.hasBeenOpened_ = !0;
      }
      return this;
    };
    b.prototype.opened = function(c) {
      if ("boolean" === typeof c) {
        this[c ? "open" : "close"]();
      }
      return this.opened_;
    };
    b.prototype.close = function() {
      if (this.opened_) {
        var c = this.player();
        this.trigger("beforemodalclose");
        this.opened_ = !1;
        this.wasPlaying_ && c.play();
        this.closeable() && this.off(this.el_.ownerDocument, "keydown", A(this, this.handleKeyPress));
        c.controls(!0);
        this.hide();
        this.el().setAttribute("aria-hidden", "true");
        this.trigger("modalclose");
        this.options_.temporary && this.dispose();
      }
      return this;
    };
    b.prototype.closeable = function(c) {
      if ("boolean" === typeof c) {
        c = this.closeable_ = !!c;
        var a = this.getChild("closeButton");
        if (c && !a) {
          var b = this.contentEl_;
          this.contentEl_ = this.el_;
          a = this.addChild("closeButton", {controlText:"Close Modal Dialog"});
          this.contentEl_ = b;
          this.on(a, "close", this.close);
        }
        !c && a && (this.off(a, "close", this.close), this.removeChild(a), a.dispose());
      }
      return this.closeable_;
    };
    b.prototype.fill = function() {
      return this.fillWith(this.content());
    };
    b.prototype.fillWith = function(c) {
      var a = this.contentEl(), b = a.parentNode, g = a.nextSibling;
      this.trigger("beforemodalfill");
      this.hasBeenFilled_ = !0;
      b.removeChild(a);
      this.empty();
      sc(a, c);
      this.trigger("modalfill");
      g ? b.insertBefore(a, g) : b.appendChild(a);
      return this;
    };
    b.prototype.empty = function() {
      this.trigger("beforemodalempty");
      F(this.contentEl());
      this.trigger("modalempty");
      return this;
    };
    b.prototype.content = function(c) {
      "undefined" !== typeof c && (this.content_ = c);
      return this.content_;
    };
    return b;
  }(l);
  Pa.prototype.options_ = {temporary:!0};
  l.registerComponent("ModalDialog", Pa);
  var Cd = function() {
    function a(b) {
      var c = this;
      if (Y) {
        var c = z.createElement("custom"), d;
        for (d in a.prototype) {
          "constructor" !== d && (c[d] = a.prototype[d]);
        }
      }
      a.prototype.setCues_.call(c, b);
      Object.defineProperty(c, "length", {get:function() {
        return this.length_;
      }});
      if (Y) {
        return c;
      }
    }
    a.prototype.setCues_ = function(a) {
      var c = this.length || 0, b = 0, f = a.length;
      this.cues_ = a;
      this.length_ = a.length;
      a = function(c) {
        "" + c in this || Object.defineProperty(this, "" + c, {get:function() {
          return this.cues_[c];
        }});
      };
      if (c < f) {
        for (b = c;b < f;b++) {
          a.call(this, b);
        }
      }
    };
    a.prototype.getCueById = function(a) {
      for (var c = null, b = 0, f = this.length;b < f;b++) {
        var g = this[b];
        if (g.id === a) {
          c = g;
          break;
        }
      }
      return c;
    };
    return a;
  }(), yf = {alternative:"alternative", captions:"captions", main:"main", sign:"sign", subtitles:"subtitles", commentary:"commentary"}, zf = {alternative:"alternative", descriptions:"descriptions", main:"main", "main-desc":"main-desc", translation:"translation", commentary:"commentary"}, Af = {subtitles:"subtitles", captions:"captions", descriptions:"descriptions", chapters:"chapters", metadata:"metadata"}, Dd = {disabled:"disabled", hidden:"hidden", showing:"showing"}, Ub = function(a) {
    function b(c) {
      void 0 === c && (c = {});
      var d = a.call(this) || this;
      if (Y) {
        var d = z.createElement("custom"), f;
        for (f in b.prototype) {
          "constructor" !== f && (d[f] = b.prototype[f]);
        }
      }
      var g = {id:c.id || "vjs_track_" + wa++, kind:c.kind || "", label:c.label || "", language:c.language || ""};
      c = function(c) {
        Object.defineProperty(d, c, {get:function() {
          return g[c];
        }, set:function() {
        }});
      };
      for (var e in g) {
        c(e);
      }
      return d;
    }
    __extends(b, a);
    return b;
  }(Z), Ed = function(a) {
    var b = "protocol hostname port pathname search hash host".split(" "), c = z.createElement("a");
    c.href = a;
    var d = "" === c.host && "file:" !== c.protocol, f;
    d && (f = z.createElement("div"), f.innerHTML = '<a href="' + a + '"></a>', c = f.firstChild, f.setAttribute("style", "display:none; position:absolute;"), z.body.appendChild(f));
    a = {};
    for (var g = 0;g < b.length;g++) {
      a[b[g]] = c[b[g]];
    }
    "http:" === a.protocol && (a.host = a.host.replace(/:80$/, ""));
    "https:" === a.protocol && (a.host = a.host.replace(/:443$/, ""));
    d && z.body.removeChild(f);
    return a;
  }, Bf = function(a) {
    if (!a.match(/^https?:\/\//)) {
      var b = z.createElement("div");
      b.innerHTML = '<a href="' + a + '">x</a>';
      a = b.firstChild.href;
    }
    return a;
  }, Fd = function(a) {
    return "string" === typeof a && (a = /^(\/?)([\s\S]*?)((?:\.{1,2}|[^\/]+?)(\.([^\.\/\?]+)))(?:[\/]*|[\?].*)$/i.exec(a)) ? a.pop().toLowerCase() : "";
  }, Vb = function(a) {
    var b = q.location;
    a = Ed(a);
    return (":" === a.protocol ? b.protocol : a.protocol) + a.host !== b.protocol + b.host;
  }, Gd = function(a) {
    var b = Cf.call(a);
    return "[object Function]" === b || "function" === typeof a && "[object RegExp]" !== b || "undefined" !== typeof window && (a === window.setTimeout || a === window.alert || a === window.confirm || a === window.prompt);
  }, Cf = Object.prototype.toString, Wb = k(function(a, b) {
    b = a.exports = function(c) {
      return c.replace(/^\s*|\s*$/g, "");
    };
    b.left = function(c) {
      return c.replace(/^\s*/, "");
    };
    b.right = function(c) {
      return c.replace(/\s*$/, "");
    };
  }), Df = Object.prototype.toString, Hd = Object.prototype.hasOwnProperty, Ef = function(a, b, c) {
    if (!Gd(b)) {
      throw new TypeError("iterator must be a function");
    }
    3 > arguments.length && (c = this);
    if ("[object Array]" === Df.call(a)) {
      for (var d = c, f = 0, g = a.length;f < g;f++) {
        Hd.call(a, f) && b.call(d, a[f], f, a);
      }
    } else {
      if ("string" === typeof a) {
        for (d = c, f = 0, g = a.length;f < g;f++) {
          b.call(d, a.charAt(f), f, a);
        }
      } else {
        for (f in d = c, a) {
          Hd.call(a, f) && b.call(d, a[f], f, a);
        }
      }
    }
  }, Ff = Object.prototype.hasOwnProperty, Id = q, ze = Gd, Be = function(a) {
    if (!a) {
      return {};
    }
    var b = {};
    Ef(Wb(a).split("\n"), function(c) {
      var a = c.indexOf(":"), f = Wb(c.slice(0, a)).toLowerCase();
      c = Wb(c.slice(a + 1));
      "undefined" === typeof b[f] ? b[f] = c : "[object Array]" === Object.prototype.toString.call(b[f]) ? b[f].push(c) : b[f] = [b[f], c];
    });
    return b;
  }, Ae = function() {
    for (var a = {}, b = 0;b < arguments.length;b++) {
      var c = arguments[b], d;
      for (d in c) {
        Ff.call(c, d) && (a[d] = c[d]);
      }
    }
    return a;
  };
  na.XMLHttpRequest = Id.XMLHttpRequest || Ce;
  na.XDomainRequest = "withCredentials" in new na.XMLHttpRequest ? na.XMLHttpRequest : Id.XDomainRequest;
  (function(a, b) {
    for (var c = 0;c < a.length;c++) {
      b(a[c]);
    }
  })("get put post patch head delete".split(" "), function(a) {
    na["delete" === a ? "del" : a] = function(b, c, d) {
      c = Dc(b, c, d);
      c.method = a.toUpperCase();
      return Ec(c);
    };
  });
  var Jd = function(a, b) {
    var c = new q.WebVTT.Parser(q, q.vttjs, q.WebVTT.StringDecoder()), d = [];
    c.oncue = function(c) {
      b.addCue(c);
    };
    c.onparsingerror = function(c) {
      d.push(c);
    };
    c.onflush = function() {
      b.trigger({type:"loadeddata", target:b});
    };
    c.parse(a);
    0 < d.length && (q.console && q.console.groupCollapsed && q.console.groupCollapsed("Text Track parsing errors for " + b.src), d.forEach(function(c) {
      return E.error(c);
    }), q.console && q.console.groupEnd && q.console.groupEnd());
    c.flush();
  }, Gf = function(a, b) {
    var c = {uri:a};
    if (a = Vb(a)) {
      c.cors = a;
    }
    na(c, A(this, function(c, a, g) {
      if (c) {
        return E.error(c, a);
      }
      b.loaded_ = !0;
      if ("function" !== typeof q.WebVTT) {
        if (b.tech_) {
          var d = function() {
            return Jd(g, b);
          };
          b.tech_.on("vttjsloaded", d);
          b.tech_.on("vttjserror", function() {
            E.error("vttjs failed to load, stopping trying to process " + b.src);
            b.tech_.off("vttjsloaded", d);
          });
        }
      } else {
        Jd(g, b);
      }
    }));
  }, jb = function(a) {
    function b(c) {
      void 0 === c && (c = {});
      if (!c.tech) {
        throw Error("A tech was not provided.");
      }
      c = U(c, {kind:Af[c.kind] || "subtitles", language:c.language || c.srclang || ""});
      var d = Dd[c.mode] || "disabled", f = c["default"];
      if ("metadata" === c.kind || "chapters" === c.kind) {
        d = "hidden";
      }
      var g = a.call(this, c) || this;
      g.tech_ = c.tech;
      if (Y) {
        for (var e in b.prototype) {
          "constructor" !== e && (g[e] = b.prototype[e]);
        }
      }
      g.cues_ = [];
      g.activeCues_ = [];
      var h = new Cd(g.cues_), p = new Cd(g.activeCues_), l = !1, m = A(g, function() {
        this.activeCues;
        l && (this.trigger("cuechange"), l = !1);
      });
      if ("disabled" !== d) {
        g.tech_.on("timeupdate", m);
      }
      Object.defineProperty(g, "default", {get:function() {
        return f;
      }, set:function() {
      }});
      Object.defineProperty(g, "mode", {get:function() {
        return d;
      }, set:function(c) {
        if (Dd[c]) {
          d = c;
          if ("showing" === d) {
            this.tech_.on("timeupdate", m);
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
          return p;
        }
        for (var c = this.tech_.currentTime(), a = [], b = 0, d = this.cues.length;b < d;b++) {
          var f = this.cues[b];
          f.startTime <= c && f.endTime >= c ? a.push(f) : f.startTime === f.endTime && f.startTime <= c && f.startTime + .5 >= c && a.push(f);
        }
        l = !1;
        if (a.length !== this.activeCues_.length) {
          l = !0;
        } else {
          for (b = 0;b < a.length;b++) {
            -1 === this.activeCues_.indexOf(a[b]) && (l = !0);
          }
        }
        this.activeCues_ = a;
        p.setCues_(this.activeCues_);
        return p;
      }, set:function() {
      }});
      c.src ? (g.src = c.src, Gf(c.src, g)) : g.loaded_ = !0;
      return g;
    }
    __extends(b, a);
    b.prototype.addCue = function(c) {
      var a = this.tech_.textTracks();
      if (a) {
        for (var b = 0;b < a.length;b++) {
          a[b] !== this && a[b].removeCue(c);
        }
      }
      this.cues_.push(c);
      this.cues.setCues_(this.cues_);
    };
    b.prototype.removeCue = function(c) {
      for (var a = !1, b = 0, g = this.cues_.length;b < g;b++) {
        this.cues_[b] === c && (this.cues_.splice(b, 1), a = !0);
      }
      a && this.cues.setCues_(this.cues_);
    };
    return b;
  }(Ub);
  jb.prototype.allowedEvents_ = {cuechange:"cuechange"};
  var Ca = function(a) {
    function b(c) {
      void 0 === c && (c = {});
      var d = a.call(this) || this, f, g = d;
      if (Y) {
        var g = z.createElement("custom"), e;
        for (e in b.prototype) {
          "constructor" !== e && (g[e] = b.prototype[e]);
        }
      }
      var h = new jb(c);
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
      return Y ? g : d;
    }
    __extends(b, a);
    return b;
  }(Z);
  Ca.prototype.allowedEvents_ = {load:"load"};
  Ca.NONE = 0;
  Ca.LOADING = 1;
  Ca.LOADED = 2;
  Ca.ERROR = 3;
  var Hf = function() {
    function a(b) {
      void 0 === b && (b = []);
      var c = this;
      if (Y) {
        var c = z.createElement("custom"), d;
        for (d in a.prototype) {
          "constructor" !== d && (c[d] = a.prototype[d]);
        }
      }
      c.trackElements_ = [];
      Object.defineProperty(c, "length", {get:function() {
        return this.trackElements_.length;
      }});
      d = 0;
      for (var f = b.length;d < f;d++) {
        c.addTrackElement_(b[d]);
      }
      if (Y) {
        return c;
      }
    }
    a.prototype.addTrackElement_ = function(a) {
      this.trackElements_.push(a);
    };
    a.prototype.getTrackElementByTrack_ = function(a) {
      for (var c, b = 0, f = this.trackElements_.length;b < f;b++) {
        if (a === this.trackElements_[b].track) {
          c = this.trackElements_[b];
          break;
        }
      }
      return c;
    };
    a.prototype.removeTrackElement_ = function(a) {
      for (var c = 0, b = this.trackElements_.length;c < b;c++) {
        if (a === this.trackElements_[c]) {
          this.trackElements_.splice(c, 1);
          break;
        }
      }
    };
    return a;
  }(), fa = function(a) {
    function b(c, d) {
      void 0 === c && (c = []);
      void 0 === d && (d = null);
      var f = a.call(this) || this;
      if (!d && (d = f, Y)) {
        d = z.createElement("custom");
        for (var g in b.prototype) {
          "constructor" !== g && (d[g] = b.prototype[g]);
        }
      }
      d.tracks_ = [];
      Object.defineProperty(d, "length", {get:function() {
        return this.tracks_.length;
      }});
      for (f = 0;f < c.length;f++) {
        d.addTrack_(c[f]);
      }
      return d;
    }
    __extends(b, a);
    b.prototype.addTrack_ = function(c) {
      var a = this.tracks_.length;
      "" + a in this || Object.defineProperty(this, a, {get:function() {
        return this.tracks_[a];
      }});
      -1 === this.tracks_.indexOf(c) && (this.tracks_.push(c), this.trigger({track:c, type:"addtrack"}));
    };
    b.prototype.removeTrack_ = function(c) {
      for (var a, b = 0, g = this.length;b < g;b++) {
        if (this[b] === c) {
          a = this[b];
          a.off && a.off();
          this.tracks_.splice(b, 1);
          break;
        }
      }
      a && this.trigger({track:a, type:"removetrack"});
    };
    b.prototype.getTrackById = function(c) {
      for (var a = null, b = 0, g = this.length;b < g;b++) {
        var e = this[b];
        if (e.id === c) {
          a = e;
          break;
        }
      }
      return a;
    };
    return b;
  }(Z);
  fa.prototype.allowedEvents_ = {change:"change", addtrack:"addtrack", removetrack:"removetrack"};
  for (var If in fa.prototype.allowedEvents_) {
    fa.prototype["on" + If] = null;
  }
  var Xb = function(a) {
    function b(c) {
      void 0 === c && (c = []);
      var d;
      if (Y) {
        d = z.createElement("custom");
        for (var f in fa.prototype) {
          "constructor" !== f && (d[f] = fa.prototype[f]);
        }
        for (f in b.prototype) {
          "constructor" !== f && (d[f] = b.prototype[f]);
        }
      }
      return d = a.call(this, c, d) || this;
    }
    __extends(b, a);
    b.prototype.addTrack_ = function(c) {
      a.prototype.addTrack_.call(this, c);
      c.addEventListener("modechange", A(this, function() {
        this.trigger("change");
      }));
    };
    b.prototype.removeTrack_ = function(c) {
      for (var a, b = 0, g = this.length;b < g;b++) {
        if (this[b] === c) {
          a = this[b];
          a.off && a.off();
          this.tracks_.splice(b, 1);
          break;
        }
      }
      a && this.trigger({track:a, type:"removetrack"});
    };
    b.prototype.getTrackById = function(c) {
      for (var a = null, b = 0, g = this.length;b < g;b++) {
        var e = this[b];
        if (e.id === c) {
          a = e;
          break;
        }
      }
      return a;
    };
    return b;
  }(fa), Yb = function(a, b) {
    for (var c = 0;c < a.length;c++) {
      b.id !== a[c].id && (a[c].selected = !1);
    }
  }, Kd = function(a) {
    function b(c) {
      void 0 === c && (c = []);
      for (var d, f = c.length - 1;0 <= f;f--) {
        if (c[f].selected) {
          Yb(c, c[f]);
          break;
        }
      }
      if (Y) {
        d = z.createElement("custom");
        for (var g in fa.prototype) {
          "constructor" !== g && (d[g] = fa.prototype[g]);
        }
        for (g in b.prototype) {
          "constructor" !== g && (d[g] = b.prototype[g]);
        }
      }
      d = a.call(this, c, d) || this;
      d.changing_ = !1;
      Object.defineProperty(d, "selectedIndex", {get:function() {
        for (var c = 0;c < this.length;c++) {
          if (this[c].selected) {
            return c;
          }
        }
        return -1;
      }, set:function() {
      }});
      return d;
    }
    __extends(b, a);
    b.prototype.addTrack_ = function(c) {
      var b = this;
      c.selected && Yb(this, c);
      a.prototype.addTrack_.call(this, c);
      c.addEventListener && c.addEventListener("selectedchange", function() {
        b.changing_ || (b.changing_ = !0, Yb(b, c), b.changing_ = !1, b.trigger("change"));
      });
    };
    b.prototype.addTrack = function(c) {
      this.addTrack_(c);
    };
    b.prototype.removeTrack = function(c) {
      a.prototype.removeTrack_.call(this, c);
    };
    return b;
  }(fa), Zb = function(a, b) {
    for (var c = 0;c < a.length;c++) {
      b.id !== a[c].id && (a[c].enabled = !1);
    }
  }, Ld = function(a) {
    function b(c) {
      void 0 === c && (c = []);
      for (var d, f = c.length - 1;0 <= f;f--) {
        if (c[f].enabled) {
          Zb(c, c[f]);
          break;
        }
      }
      if (Y) {
        d = z.createElement("custom");
        for (var g in fa.prototype) {
          "constructor" !== g && (d[g] = fa.prototype[g]);
        }
        for (g in b.prototype) {
          "constructor" !== g && (d[g] = b.prototype[g]);
        }
      }
      d = a.call(this, c, d) || this;
      d.changing_ = !1;
      return d;
    }
    __extends(b, a);
    b.prototype.addTrack_ = function(c) {
      var b = this;
      c.enabled && Zb(this, c);
      a.prototype.addTrack_.call(this, c);
      c.addEventListener && c.addEventListener("enabledchange", function() {
        b.changing_ || (b.changing_ = !0, Zb(b, c), b.changing_ = !1, b.trigger("change"));
      });
    };
    b.prototype.addTrack = function(c) {
      this.addTrack_(c);
    };
    b.prototype.removeTrack = function(c) {
      a.prototype.removeTrack_.call(this, c);
    };
    return b;
  }(fa), I = function(a) {
    function b(c, b) {
      void 0 === c && (c = {});
      void 0 === b && (b = function() {
      });
      c.reportTouchActivity = !1;
      b = a.call(this, null, c, b) || this;
      b.hasStarted_ = !1;
      b.on("playing", function() {
        this.hasStarted_ = !0;
      });
      b.on("loadstart", function() {
        this.hasStarted_ = !1;
      });
      b.textTracks_ = c.textTracks;
      b.videoTracks_ = c.videoTracks;
      b.audioTracks_ = c.audioTracks;
      b.featuresProgressEvents || b.manualProgressOn();
      b.featuresTimeupdateEvents || b.manualTimeUpdatesOn();
      if (!1 === c.nativeCaptions || !1 === c.nativeTextTracks) {
        b.featuresNativeTextTracks = !1;
      }
      b.featuresNativeTextTracks || b.emulateTextTracks();
      b.autoRemoteTextTracks_ = new Xb;
      b.initTextTrackListeners();
      b.initTrackListeners();
      b.emitTapEvents();
      return b;
    }
    __extends(b, a);
    b.prototype.manualProgressOn = function() {
      this.on("durationchange", this.onDurationChange);
      this.manualProgress = !0;
      this.one("ready", this.trackProgress);
    };
    b.prototype.manualProgressOff = function() {
      this.manualProgress = !1;
      this.stopTrackingProgress();
      this.off("durationchange", this.onDurationChange);
    };
    b.prototype.trackProgress = function() {
      this.stopTrackingProgress();
      this.progressInterval = this.setInterval(A(this, function() {
        var c = this.bufferedPercent();
        this.bufferedPercent_ !== c && this.trigger("progress");
        this.bufferedPercent_ = c;
        1 === c && this.stopTrackingProgress();
      }), 500);
    };
    b.prototype.onDurationChange = function() {
      this.duration_ = this.duration();
    };
    b.prototype.buffered = function() {
      return la(0, 0);
    };
    b.prototype.bufferedPercent = function() {
      return Cc(this.buffered(), this.duration_);
    };
    b.prototype.stopTrackingProgress = function() {
      this.clearInterval(this.progressInterval);
    };
    b.prototype.manualTimeUpdatesOn = function() {
      this.manualTimeUpdates = !0;
      this.on("play", this.trackCurrentTime);
      this.on("pause", this.stopTrackingCurrentTime);
    };
    b.prototype.manualTimeUpdatesOff = function() {
      this.manualTimeUpdates = !1;
      this.stopTrackingCurrentTime();
      this.off("play", this.trackCurrentTime);
      this.off("pause", this.stopTrackingCurrentTime);
    };
    b.prototype.trackCurrentTime = function() {
      this.currentTimeInterval && this.stopTrackingCurrentTime();
      this.currentTimeInterval = this.setInterval(function() {
        this.trigger({type:"timeupdate", target:this, manuallyTriggered:!0});
      }, 250);
    };
    b.prototype.stopTrackingCurrentTime = function() {
      this.clearInterval(this.currentTimeInterval);
      this.trigger({type:"timeupdate", target:this, manuallyTriggered:!0});
    };
    b.prototype.dispose = function() {
      this.clearTracks(["audio", "video", "text"]);
      this.manualProgress && this.manualProgressOff();
      this.manualTimeUpdates && this.manualTimeUpdatesOff();
      a.prototype.dispose.call(this);
    };
    b.prototype.clearTracks = function(c) {
      var a = this;
      c = [].concat(c);
      c.forEach(function(c) {
        for (var b = a[c + "Tracks"]() || [], d = b.length;d--;) {
          var f = b[d];
          "text" === c && a.removeRemoteTextTrack(f);
          b.removeTrack_(f);
        }
      });
    };
    b.prototype.cleanupAutoTextTracks = function() {
      for (var c = this.autoRemoteTextTracks_ || [], a = c.length;a--;) {
        this.removeRemoteTextTrack(c[a]);
      }
    };
    b.prototype.reset = function() {
    };
    b.prototype.error = function(c) {
      void 0 !== c && (this.error_ = new X(c), this.trigger("error"));
      return this.error_;
    };
    b.prototype.played = function() {
      return this.hasStarted_ ? la(0, 0) : la();
    };
    b.prototype.setCurrentTime = function() {
      this.manualTimeUpdates && this.trigger({type:"timeupdate", target:this, manuallyTriggered:!0});
    };
    b.prototype.initTextTrackListeners = function() {
      var c = A(this, function() {
        this.trigger("texttrackchange");
      }), a = this.textTracks();
      a && (a.addEventListener("removetrack", c), a.addEventListener("addtrack", c), this.on("dispose", A(this, function() {
        a.removeEventListener("removetrack", c);
        a.removeEventListener("addtrack", c);
      })));
    };
    b.prototype.initTrackListeners = function() {
      var c = this;
      ["video", "audio"].forEach(function(a) {
        var b = function() {
          c.trigger(a + "trackchange");
        }, d = c[a + "Tracks"]();
        d.addEventListener("removetrack", b);
        d.addEventListener("addtrack", b);
        c.on("dispose", function() {
          d.removeEventListener("removetrack", b);
          d.removeEventListener("addtrack", b);
        });
      });
    };
    b.prototype.addWebVttScript_ = function() {
      var c = this;
      if (!q.WebVTT && null !== this.el().parentNode && void 0 !== this.el().parentNode) {
        var a = z.createElement("script");
        a.src = this.options_["vtt.js"] || "../node_modules/videojs-vtt.js/dist/vtt.js";
        a.onload = function() {
          c.trigger("vttjsloaded");
        };
        a.onerror = function() {
          c.trigger("vttjserror");
        };
        this.on("dispose", function() {
          a.onload = null;
          a.onerror = null;
        });
        q.WebVTT = !0;
        this.el().parentNode.appendChild(a);
      }
    };
    b.prototype.emulateTextTracks = function() {
      var c = this, a = this.textTracks();
      if (a) {
        this.remoteTextTracks().on("addtrack", function(a) {
          c.textTracks().addTrack_(a.track);
        });
        this.remoteTextTracks().on("removetrack", function(a) {
          c.textTracks().removeTrack_(a.track);
        });
        this.on("ready", this.addWebVttScript_);
        var b = function() {
          return c.trigger("texttrackchange");
        }, g = function() {
          b();
          for (var c = 0;c < a.length;c++) {
            var d = a[c];
            d.removeEventListener("cuechange", b);
            "showing" === d.mode && d.addEventListener("cuechange", b);
          }
        };
        g();
        a.addEventListener("change", g);
        this.on("dispose", function() {
          a.removeEventListener("change", g);
        });
      }
    };
    b.prototype.videoTracks = function() {
      return this.videoTracks_ = this.videoTracks_ || new Kd;
    };
    b.prototype.audioTracks = function() {
      return this.audioTracks_ = this.audioTracks_ || new Ld;
    };
    b.prototype.textTracks = function() {
      return this.textTracks_ = this.textTracks_ || new Xb;
    };
    b.prototype.remoteTextTracks = function() {
      return this.remoteTextTracks_ = this.remoteTextTracks_ || new Xb;
    };
    b.prototype.remoteTextTrackEls = function() {
      return this.remoteTextTrackEls_ = this.remoteTextTrackEls_ || new Hf;
    };
    b.prototype.addTextTrack = function(c, a, b) {
      if (!c) {
        throw Error("TextTrack kind is required but was not provided");
      }
      var d = void 0;
      void 0 === d && (d = {});
      var f = this.textTracks();
      d.kind = c;
      a && (d.label = a);
      b && (d.language = b);
      d.tech = this;
      c = new jb(d);
      f.addTrack_(c);
      return c;
    };
    b.prototype.createRemoteTextTrack = function(c) {
      c = U(c, {tech:this});
      return new Ca(c);
    };
    b.prototype.addRemoteTextTrack = function(c, a) {
      void 0 === c && (c = {});
      c = this.createRemoteTextTrack(c);
      !0 !== a && !1 !== a && (E.warn('Calling addRemoteTextTrack without explicitly setting the "manualCleanup" parameter to `true` is deprecated and default to `false` in future version of video.js'), a = !0);
      this.remoteTextTrackEls().addTrackElement_(c);
      this.remoteTextTracks().addTrack_(c.track);
      !0 !== a && this.autoRemoteTextTracks_.addTrack_(c.track);
      return c;
    };
    b.prototype.removeRemoteTextTrack = function(c) {
      var a = this.remoteTextTrackEls().getTrackElementByTrack_(c);
      this.remoteTextTrackEls().removeTrackElement_(a);
      this.remoteTextTracks().removeTrack_(c);
      this.autoRemoteTextTracks_.removeTrack_(c);
    };
    b.prototype.setPoster = function() {
    };
    b.prototype.canPlayType = function() {
      return "";
    };
    b.isTech = function(c) {
      return c.prototype instanceof b || c instanceof b || c === b;
    };
    b.registerTech = function(c, a) {
      b.techs_ || (b.techs_ = {});
      if (!b.isTech(a)) {
        throw Error("Tech " + c + " must be a Tech");
      }
      return b.techs_[c] = a;
    };
    b.getTech = function(c) {
      if (b.techs_ && b.techs_[c]) {
        return b.techs_[c];
      }
      if (q && q.videojs && q.videojs[c]) {
        return E.warn("The " + c + " tech was added to the videojs object when it should be registered using videojs.registerTech(name, tech)"), q.videojs[c];
      }
    };
    return b;
  }(l);
  I.prototype.featuresVolumeControl = !0;
  I.prototype.featuresFullscreenResize = !1;
  I.prototype.featuresPlaybackRate = !1;
  I.prototype.featuresProgressEvents = !1;
  I.prototype.featuresTimeupdateEvents = !1;
  I.prototype.featuresNativeTextTracks = !1;
  I.withSourceHandlers = function(a) {
    a.registerSourceHandler = function(b, c) {
      var d = a.sourceHandlers;
      d || (d = a.sourceHandlers = []);
      void 0 === c && (c = d.length);
      d.splice(c, 0, b);
    };
    a.canPlayType = function(b) {
      for (var c = a.sourceHandlers || [], d, f = 0;f < c.length;f++) {
        if (d = c[f].canPlayType(b)) {
          return d;
        }
      }
      return "";
    };
    a.selectSourceHandler = function(b, c) {
      for (var d = a.sourceHandlers || [], f, g = 0;g < d.length;g++) {
        if (f = d[g].canHandleSource(b, c)) {
          return d[g];
        }
      }
      return null;
    };
    a.canPlaySource = function(b, c) {
      var d = a.selectSourceHandler(b, c);
      return d ? d.canHandleSource(b, c) : "";
    };
    ["seekable", "duration"].forEach(function(a) {
      var c = this[a];
      "function" === typeof c && (this[a] = function() {
        return this.sourceHandler_ && this.sourceHandler_[a] ? this.sourceHandler_[a].apply(this.sourceHandler_, arguments) : c.apply(this, arguments);
      });
    }, a.prototype);
    a.prototype.setSource = function(b) {
      var c = a.selectSourceHandler(b, this.options_);
      c || (a.nativeSourceHandler ? c = a.nativeSourceHandler : E.error("No source hander found for the current source."));
      this.disposeSourceHandler();
      this.off("dispose", this.disposeSourceHandler);
      c !== a.nativeSourceHandler && (this.currentSource_ = b, this.off(this.el_, "loadstart", a.prototype.firstLoadStartListener_), this.off(this.el_, "loadstart", a.prototype.successiveLoadStartListener_), this.one(this.el_, "loadstart", a.prototype.firstLoadStartListener_));
      this.sourceHandler_ = c.handleSource(b, this, this.options_);
      this.on("dispose", this.disposeSourceHandler);
      return this;
    };
    a.prototype.firstLoadStartListener_ = function() {
      this.one(this.el_, "loadstart", a.prototype.successiveLoadStartListener_);
    };
    a.prototype.successiveLoadStartListener_ = function() {
      this.disposeSourceHandler();
      this.one(this.el_, "loadstart", a.prototype.successiveLoadStartListener_);
    };
    a.prototype.disposeSourceHandler = function() {
      this.currentSource_ && (this.clearTracks(["audio", "video"]), this.currentSource_ = null);
      this.cleanupAutoTextTracks();
      this.sourceHandler_ && (this.off(this.el_, "loadstart", a.prototype.firstLoadStartListener_), this.off(this.el_, "loadstart", a.prototype.successiveLoadStartListener_), this.sourceHandler_.dispose && this.sourceHandler_.dispose(), this.sourceHandler_ = null);
    };
  };
  l.registerComponent("Tech", I);
  l.registerComponent("MediaTechController", I);
  I.registerTech("Tech", I);
  var Jf = function(a) {
    function b(c, b, f) {
      f = a.call(this, c, b, f) || this;
      if (b.playerOptions.sources && 0 !== b.playerOptions.sources.length) {
        c.src(b.playerOptions.sources);
      } else {
        var d = 0;
        for (b = b.playerOptions.techOrder;d < b.length;d++) {
          var e = S(b[d]), h = I.getTech(e);
          e || (h = l.getComponent(e));
          if (h && h.isSupported()) {
            c.loadTech_(e);
            break;
          }
        }
      }
      return f;
    }
    __extends(b, a);
    return b;
  }(l);
  l.registerComponent("MediaLoader", Jf);
  for (var $b = q.navigator, G = function(a) {
    function b(c, d) {
      var f = a.call(this, c, d) || this;
      c.source && f.ready(function() {
        this.setSource(c.source);
      }, !0);
      c.startTime && f.ready(function() {
        this.load();
        this.play();
        this.currentTime(c.startTime);
      }, !0);
      q.videojs = q.videojs || {};
      q.videojs.Flash = q.videojs.Flash || {};
      q.videojs.Flash.onReady = b.onReady;
      q.videojs.Flash.onEvent = b.onEvent;
      q.videojs.Flash.onError = b.onError;
      f.on("seeked", function() {
        this.lastSeekTarget_ = void 0;
      });
      var g = Fc(function() {
        return f.el_.vjs_getProperty("currentTime");
      }, 100);
      f.currentTime = function(c) {
        return f.seeking() ? f.lastSeekTarget_ || 0 : g();
      };
      f.buffered = Fc(function() {
        var c = f.el_.vjs_getProperty("buffered");
        return 0 === c.length ? la() : la(c[0][0], c[0][1]);
      }, 100);
      return f;
    }
    __extends(b, a);
    b.prototype.createEl = function() {
      var c = this.options_;
      c.swf || (c.swf = "//vjs.zencdn.net/swf/5.1.0/video-js.swf");
      var a = c.techId, f = O({readyFunction:"videojs.Flash.onReady", eventProxyFunction:"videojs.Flash.onEvent", errorEventProxyFunction:"videojs.Flash.onError", autoplay:c.autoplay, preload:c.preload, loop:c.loop, muted:c.muted}, c.flashVars), g = O({wmode:"opaque", bgcolor:"#000000"}, c.params), a = O({id:a, name:a, "class":"vjs-tech"}, c.attributes);
      this.el_ = b.embed(c.swf, f, g, a);
      this.el_.tech = this;
      return this.el_;
    };
    b.prototype.play = function() {
      this.ended() && this.setCurrentTime(0);
      this.el_.vjs_play();
    };
    b.prototype.pause = function() {
      this.el_.vjs_pause();
    };
    b.prototype.src = function(c) {
      return void 0 === c ? this.currentSrc() : this.setSrc(c);
    };
    b.prototype.setSrc = function(c) {
      var a = this;
      c = Bf(c);
      this.el_.vjs_src(c);
      this.autoplay() && this.setTimeout(function() {
        return a.play();
      }, 0);
    };
    b.prototype.seeking = function() {
      return void 0 !== this.lastSeekTarget_;
    };
    b.prototype.setCurrentTime = function(c) {
      var b = this.seekable();
      b.length && (c = c > b.start(0) ? c : b.start(0), this.lastSeekTarget_ = c = c < b.end(b.length - 1) ? c : b.end(b.length - 1), this.trigger("seeking"), this.el_.vjs_setProperty("currentTime", c), a.prototype.setCurrentTime.call(this));
    };
    b.prototype.currentSrc = function() {
      return this.currentSource_ ? this.currentSource_.src : this.el_.vjs_getProperty("currentSrc");
    };
    b.prototype.duration = function() {
      if (0 === this.readyState()) {
        return NaN;
      }
      var c = this.el_.vjs_getProperty("duration");
      return 0 <= c ? c : Infinity;
    };
    b.prototype.load = function() {
      this.el_.vjs_load();
    };
    b.prototype.poster = function() {
      this.el_.vjs_getProperty("poster");
    };
    b.prototype.setPoster = function() {
    };
    b.prototype.seekable = function() {
      var c = this.duration();
      return 0 === c ? la() : la(0, c);
    };
    b.prototype.supportsFullScreen = function() {
      return !1;
    };
    b.prototype.enterFullScreen = function() {
      return !1;
    };
    return b;
  }(I), Gc = G.prototype, ac = "rtmpConnection rtmpStream preload defaultPlaybackRate playbackRate autoplay loop mediaGroup controller controls volume muted defaultMuted".split(" "), Md = "networkState readyState initialTime startOffsetTime paused ended videoWidth videoHeight".split(" "), T = 0;T < ac.length;T++) {
    Hc(ac[T]), De(ac[T]);
  }
  for (T = 0;T < Md.length;T++) {
    Hc(Md[T]);
  }
  G.isSupported = function() {
    return 10 <= G.version()[0];
  };
  I.withSourceHandlers(G);
  G.nativeSourceHandler = {};
  G.nativeSourceHandler.canPlayType = function(a) {
    return a in G.formats ? "maybe" : "";
  };
  G.nativeSourceHandler.canHandleSource = function(a, b) {
    a = a.type ? a.type.replace(/;.*/, "").toLowerCase() : (a = Fd(a.src)) ? "video/" + a : "";
    return G.nativeSourceHandler.canPlayType(a);
  };
  G.nativeSourceHandler.handleSource = function(a, b, c) {
    b.setSrc(a.src);
  };
  G.nativeSourceHandler.dispose = function() {
  };
  G.registerSourceHandler(G.nativeSourceHandler);
  G.formats = {"video/flv":"FLV", "video/x-flv":"FLV", "video/mp4":"MP4", "video/m4v":"MP4"};
  G.onReady = function(a) {
    (a = (a = ja(a)) && a.tech) && a.el() && G.checkReady(a);
  };
  G.checkReady = function(a) {
    a.el() && (a.el().vjs_getProperty ? a.triggerReady() : this.setTimeout(function() {
      G.checkReady(a);
    }, 50));
  };
  G.onEvent = function(a, b) {
    var c = ja(a).tech, d = Array.prototype.slice.call(arguments, 2);
    c.setTimeout(function() {
      c.trigger(b, d);
    }, 1);
  };
  G.onError = function(a, b) {
    a = ja(a).tech;
    if ("srcnotfound" === b) {
      return a.error(4);
    }
    a.error("FLASH: " + b);
  };
  G.version = function() {
    var a = "0,0,0";
    try {
      a = (new q.ActiveXObject("ShockwaveFlash.ShockwaveFlash")).GetVariable("$version").replace(/\D+/g, ",").match(/^,?(.+),?$/)[1];
    } catch (b) {
      try {
        $b.mimeTypes["application/x-shockwave-flash"].enabledPlugin && (a = ($b.plugins["Shockwave Flash 2.0"] || $b.plugins["Shockwave Flash"]).description.replace(/\D+/g, ",").match(/^,?(.+),?$/)[1]);
      } catch (c) {
      }
    }
    return a.split(",");
  };
  G.embed = function(a, b, c, d) {
    a = G.getEmbedCode(a, b, c, d);
    return r("div", {innerHTML:a}).childNodes[0];
  };
  G.getEmbedCode = function(a, b, c, d) {
    var f = "", g = "", e = "";
    b && Object.getOwnPropertyNames(b).forEach(function(c) {
      f += c + "=" + b[c] + "&amp;";
    });
    c = O({movie:a, flashvars:f, allowScriptAccess:"always", allowNetworking:"all"}, c);
    Object.getOwnPropertyNames(c).forEach(function(a) {
      g += '<param name="' + a + '" value="' + c[a] + '" />';
    });
    d = O({data:a, width:"100%", height:"100%"}, d);
    Object.getOwnPropertyNames(d).forEach(function(c) {
      e += c + '="' + d[c] + '" ';
    });
    return '<object type="application/x-shockwave-flash" ' + e + ">" + g + "</object>";
  };
  (function(a) {
    a.streamingFormats = {"rtmp/mp4":"MP4", "rtmp/flv":"FLV"};
    a.streamFromParts = function(a, c) {
      return a + "&" + c;
    };
    a.streamToParts = function(a) {
      var c = {connection:"", stream:""};
      if (!a) {
        return c;
      }
      var b = a.search(/&(?!\w+=)/), f;
      -1 !== b ? f = b + 1 : (b = f = a.lastIndexOf("/") + 1, 0 === b && (b = f = a.length));
      c.connection = a.substring(0, b);
      c.stream = a.substring(f, a.length);
      return c;
    };
    a.isStreamingType = function(b) {
      return b in a.streamingFormats;
    };
    a.RTMP_RE = /^rtmp[set]?:\/\//i;
    a.isStreamingSrc = function(b) {
      return a.RTMP_RE.test(b);
    };
    a.rtmpSourceHandler = {};
    a.rtmpSourceHandler.canPlayType = function(b) {
      return a.isStreamingType(b) ? "maybe" : "";
    };
    a.rtmpSourceHandler.canHandleSource = function(b, c) {
      return (c = a.rtmpSourceHandler.canPlayType(b.type)) ? c : a.isStreamingSrc(b.src) ? "maybe" : "";
    };
    a.rtmpSourceHandler.handleSource = function(b, c, d) {
      b = a.streamToParts(b.src);
      c.setRtmpConnection(b.connection);
      c.setRtmpStream(b.stream);
    };
    a.registerSourceHandler(a.rtmpSourceHandler);
    return a;
  })(G);
  l.registerComponent("Flash", G);
  I.registerTech("Flash", G);
  var Da = function(a) {
    function b(c, b) {
      c = a.call(this, c, b) || this;
      c.emitTapEvents();
      c.enable();
      return c;
    }
    __extends(b, a);
    b.prototype.createEl = function(c, b, f) {
      void 0 === c && (c = "div");
      void 0 === b && (b = {});
      void 0 === f && (f = {});
      b = O({className:this.buildCSSClass(), tabIndex:0}, b);
      "button" === c && E.error("Creating a ClickableComponent with an HTML element of " + c + " is not supported; use a Button instead.");
      f = O({role:"button", "aria-live":"polite"}, f);
      this.tabIndex_ = b.tabIndex;
      c = a.prototype.createEl.call(this, c, b, f);
      this.createControlTextEl(c);
      return c;
    };
    b.prototype.createControlTextEl = function(c) {
      this.controlTextEl_ = r("span", {className:"vjs-control-text"});
      c && c.appendChild(this.controlTextEl_);
      this.controlText(this.controlText_, c);
      return this.controlTextEl_;
    };
    b.prototype.controlText = function(c, a) {
      void 0 === a && (a = this.el());
      if (!c) {
        return this.controlText_ || "Need Text";
      }
      var b = this.localize(c);
      this.controlText_ = c;
      this.controlTextEl_.innerHTML = b;
      a.setAttribute("title", b);
      return this;
    };
    b.prototype.buildCSSClass = function() {
      return "vjs-control vjs-button " + a.prototype.buildCSSClass.call(this);
    };
    b.prototype.enable = function() {
      this.removeClass("vjs-disabled");
      this.el_.setAttribute("aria-disabled", "false");
      "undefined" !== typeof this.tabIndex_ && this.el_.setAttribute("tabIndex", this.tabIndex_);
      this.on("tap", this.handleClick);
      this.on("click", this.handleClick);
      this.on("focus", this.handleFocus);
      this.on("blur", this.handleBlur);
      return this;
    };
    b.prototype.disable = function() {
      this.addClass("vjs-disabled");
      this.el_.setAttribute("aria-disabled", "true");
      "undefined" !== typeof this.tabIndex_ && this.el_.removeAttribute("tabIndex");
      this.off("tap", this.handleClick);
      this.off("click", this.handleClick);
      this.off("focus", this.handleFocus);
      this.off("blur", this.handleBlur);
      return this;
    };
    b.prototype.handleClick = function() {
    };
    b.prototype.handleFocus = function() {
      da(z, "keydown", A(this, this.handleKeyPress));
    };
    b.prototype.handleKeyPress = function(c) {
      32 === c.which || 13 === c.which ? (c.preventDefault(), this.handleClick(c)) : a.prototype.handleKeyPress && a.prototype.handleKeyPress.call(this, c);
    };
    b.prototype.handleBlur = function() {
      ka(z, "keydown", A(this, this.handleKeyPress));
    };
    return b;
  }(l);
  l.registerComponent("ClickableComponent", Da);
  var Kf = function(a) {
    function b(c, b) {
      b = a.call(this, c, b) || this;
      b.update();
      c.on("posterchange", A(b, b.update));
      return b;
    }
    __extends(b, a);
    b.prototype.dispose = function() {
      this.player().off("posterchange", this.update);
      a.prototype.dispose.call(this);
    };
    b.prototype.createEl = function() {
      var c = r("div", {className:"vjs-poster", tabIndex:-1});
      Sc || (this.fallbackImg_ = r("img"), c.appendChild(this.fallbackImg_));
      return c;
    };
    b.prototype.update = function() {
      var c = this.player().poster();
      this.setSrc(c);
      c ? this.show() : this.hide();
    };
    b.prototype.setSrc = function(c) {
      if (this.fallbackImg_) {
        this.fallbackImg_.src = c;
      } else {
        var a = "";
        c && (a = 'url("' + c + '")');
        this.el_.style.backgroundImage = a;
      }
    };
    b.prototype.handleClick = function() {
      this.player_.paused() ? this.player_.play() : this.player_.pause();
    };
    return b;
  }(Da);
  l.registerComponent("PosterImage", Kf);
  var Lf = {monospace:"monospace", sansSerif:"sans-serif", serif:"serif", monospaceSansSerif:'"Andale Mono", "Lucida Console", monospace', monospaceSerif:'"Courier New", monospace', proportionalSansSerif:"sans-serif", proportionalSerif:"serif", casual:'"Comic Sans MS", Impact, fantasy', script:'"Monotype Corsiva", cursive', smallcaps:'"Andale Mono", "Lucida Console", monospace, sans-serif'}, Mf = function(a) {
    function b(c, b, f) {
      b = a.call(this, c, b, f) || this;
      c.on("loadstart", A(b, b.toggleDisplay));
      c.on("texttrackchange", A(b, b.updateDisplay));
      c.ready(A(b, function() {
        if (c.tech_ && c.tech_.featuresNativeTextTracks) {
          this.hide();
        } else {
          c.on("fullscreenchange", A(this, this.updateDisplay));
          for (var a = this.options_.playerOptions.tracks || [], b = 0;b < a.length;b++) {
            this.player_.addRemoteTextTrack(a[b]);
          }
          var a = {captions:1, subtitles:1}, d = this.player_.textTracks(), f, e;
          if (d) {
            for (b = 0;b < d.length;b++) {
              var h = d[b];
              h["default"] && ("descriptions" !== h.kind || f ? h.kind in a && !e && (e = h) : f = h);
            }
            e ? e.mode = "showing" : f && (f.mode = "showing");
          }
        }
      }));
      return b;
    }
    __extends(b, a);
    b.prototype.toggleDisplay = function() {
      this.player_.tech_ && this.player_.tech_.featuresNativeTextTracks ? this.hide() : this.show();
    };
    b.prototype.createEl = function() {
      return a.prototype.createEl.call(this, "div", {className:"vjs-text-track-display"}, {"aria-live":"off", "aria-atomic":"true"});
    };
    b.prototype.clearDisplay = function() {
      "function" === typeof q.WebVTT && q.WebVTT.processCues(q, [], this.el_);
    };
    b.prototype.updateDisplay = function() {
      var c = this.player_.textTracks();
      this.clearDisplay();
      if (c) {
        for (var a = null, b = null, g = c.length;g--;) {
          var e = c[g];
          "showing" === e.mode && ("descriptions" === e.kind ? a = e : b = e);
        }
        b ? ("off" !== this.getAttribute("aria-live") && this.setAttribute("aria-live", "off"), this.updateForTrack(b)) : a && ("assertive" !== this.getAttribute("aria-live") && this.setAttribute("aria-live", "assertive"), this.updateForTrack(a));
      }
    };
    b.prototype.updateForTrack = function(c) {
      if ("function" === typeof q.WebVTT && c.activeCues) {
        for (var a = this.player_.textTrackSettings.getValues(), b = [], g = 0;g < c.activeCues.length;g++) {
          b.push(c.activeCues[g]);
        }
        q.WebVTT.processCues(q, b, this.el_);
        for (c = b.length;c--;) {
          if (g = b[c]) {
            g = g.displayState;
            a.color && (g.firstChild.style.color = a.color);
            if (a.textOpacity) {
              var e = ub(a.color || "#fff", a.textOpacity);
              try {
                g.firstChild.style.color = e;
              } catch (ha) {
              }
            }
            a.backgroundColor && (g.firstChild.style.backgroundColor = a.backgroundColor);
            if (a.backgroundOpacity) {
              e = ub(a.backgroundColor || "#000", a.backgroundOpacity);
              try {
                g.firstChild.style.backgroundColor = e;
              } catch (ha) {
              }
            }
            if (a.windowColor) {
              if (a.windowOpacity) {
                e = ub(a.windowColor, a.windowOpacity);
                try {
                  g.style.backgroundColor = e;
                } catch (ha) {
                }
              } else {
                g.style.backgroundColor = a.windowColor;
              }
            }
            a.edgeStyle && ("dropshadow" === a.edgeStyle ? g.firstChild.style.textShadow = "2px 2px 3px #222, 2px 2px 4px #222, 2px 2px 5px #222" : "raised" === a.edgeStyle ? g.firstChild.style.textShadow = "1px 1px #222, 2px 2px #222, 3px 3px #222" : "depressed" === a.edgeStyle ? g.firstChild.style.textShadow = "1px 1px #ccc, 0 1px #ccc, -1px -1px #222, 0 -1px #222" : "uniform" === a.edgeStyle && (g.firstChild.style.textShadow = "0 0 4px #222, 0 0 4px #222, 0 0 4px #222, 0 0 4px #222"));
            a.fontPercent && 1 !== a.fontPercent && (e = q.parseFloat(g.style.fontSize), g.style.fontSize = e * a.fontPercent + "px", g.style.height = "auto", g.style.top = "auto", g.style.bottom = "2px");
            a.fontFamily && "default" !== a.fontFamily && ("small-caps" === a.fontFamily ? g.firstChild.style.fontVariant = "small-caps" : g.firstChild.style.fontFamily = Lf[a.fontFamily]);
          }
        }
      }
    };
    return b;
  }(l);
  l.registerComponent("TextTrackDisplay", Mf);
  var Nf = function(a) {
    function b() {
      return a.apply(this, arguments) || this;
    }
    __extends(b, a);
    b.prototype.createEl = function() {
      return a.prototype.createEl.call(this, "div", {className:"vjs-loading-spinner", dir:"ltr"});
    };
    return b;
  }(l);
  l.registerComponent("LoadingSpinner", Nf);
  var Ea = function(a) {
    function b() {
      return a.apply(this, arguments) || this;
    }
    __extends(b, a);
    b.prototype.createEl = function(c, a, b) {
      void 0 === c && (c = "button");
      void 0 === a && (a = {});
      void 0 === b && (b = {});
      a = O({className:this.buildCSSClass()}, a);
      "button" !== c && (E.warn("Creating a Button with an HTML element of " + c + " is deprecated; use ClickableComponent instead."), a = O({tabIndex:0}, a), b = O({role:"button"}, b));
      b = O({type:"button", "aria-live":"polite"}, b);
      c = l.prototype.createEl.call(this, c, a, b);
      this.createControlTextEl(c);
      return c;
    };
    b.prototype.addChild = function(c, a) {
      void 0 === a && (a = {});
      E.warn("Adding an actionable (user controllable) child to a Button (" + this.constructor.name + ") is not supported; use a ClickableComponent instead.");
      return l.prototype.addChild.call(this, c, a);
    };
    b.prototype.enable = function() {
      a.prototype.enable.call(this);
      this.el_.removeAttribute("disabled");
    };
    b.prototype.disable = function() {
      a.prototype.disable.call(this);
      this.el_.setAttribute("disabled", "disabled");
    };
    b.prototype.handleKeyPress = function(c) {
      32 !== c.which && 13 !== c.which && a.prototype.handleKeyPress.call(this, c);
    };
    return b;
  }(Da);
  l.registerComponent("Button", Ea);
  var Nd = function(a) {
    function b() {
      return a.apply(this, arguments) || this;
    }
    __extends(b, a);
    b.prototype.buildCSSClass = function() {
      return "vjs-big-play-button";
    };
    b.prototype.handleClick = function() {
      this.player_.play();
    };
    return b;
  }(Ea);
  Nd.prototype.controlText_ = "Play Video";
  l.registerComponent("BigPlayButton", Nd);
  var Of = function(a) {
    function b(c, b) {
      c = a.call(this, c, b) || this;
      c.controlText(b && b.controlText || c.localize("Close"));
      return c;
    }
    __extends(b, a);
    b.prototype.buildCSSClass = function() {
      return "vjs-close-button " + a.prototype.buildCSSClass.call(this);
    };
    b.prototype.handleClick = function() {
      this.trigger({type:"close", bubbles:!1});
    };
    return b;
  }(Ea);
  l.registerComponent("CloseButton", Of);
  var Od = function(a) {
    function b(c, b) {
      b = a.call(this, c, b) || this;
      b.on(c, "play", b.handlePlay);
      b.on(c, "pause", b.handlePause);
      return b;
    }
    __extends(b, a);
    b.prototype.buildCSSClass = function() {
      return "vjs-play-control " + a.prototype.buildCSSClass.call(this);
    };
    b.prototype.handleClick = function() {
      this.player_.paused() ? this.player_.play() : this.player_.pause();
    };
    b.prototype.handlePlay = function() {
      this.removeClass("vjs-paused");
      this.addClass("vjs-playing");
      this.controlText("Pause");
    };
    b.prototype.handlePause = function() {
      this.removeClass("vjs-playing");
      this.addClass("vjs-paused");
      this.controlText("Play");
    };
    return b;
  }(Ea);
  Od.prototype.controlText_ = "Play";
  l.registerComponent("PlayToggle", Od);
  var Pf = function(a) {
    function b(c, b) {
      b = a.call(this, c, b) || this;
      b.on(c, "timeupdate", b.updateContent);
      return b;
    }
    __extends(b, a);
    b.prototype.createEl = function() {
      var c = a.prototype.createEl.call(this, "div", {className:"vjs-current-time vjs-time-control vjs-control"});
      this.contentEl_ = r("div", {className:"vjs-current-time-display", innerHTML:'<span class="vjs-control-text">Current Time </span>0:00'}, {"aria-live":"off"});
      c.appendChild(this.contentEl_);
      return c;
    };
    b.prototype.updateContent = function() {
      var c = this.player_.scrubbing() ? this.player_.getCache().currentTime : this.player_.currentTime(), a = this.localize("Current Time"), c = qa(c, this.player_.duration());
      c !== this.formattedTime_ && (this.formattedTime_ = c, this.contentEl_.innerHTML = '<span class="vjs-control-text">' + a + "</span> " + c);
    };
    return b;
  }(l);
  l.registerComponent("CurrentTimeDisplay", Pf);
  var Qf = function(a) {
    function b(c, b) {
      b = a.call(this, c, b) || this;
      b.on(c, "durationchange", b.updateContent);
      b.on(c, "timeupdate", b.updateContent);
      b.on(c, "loadedmetadata", b.updateContent);
      return b;
    }
    __extends(b, a);
    b.prototype.createEl = function() {
      var c = a.prototype.createEl.call(this, "div", {className:"vjs-duration vjs-time-control vjs-control"});
      this.contentEl_ = r("div", {className:"vjs-duration-display", innerHTML:'<span class="vjs-control-text">' + this.localize("Duration Time") + "</span> 0:00"}, {"aria-live":"off"});
      c.appendChild(this.contentEl_);
      return c;
    };
    b.prototype.updateContent = function() {
      var c = this.player_.duration();
      if (c && this.duration_ !== c) {
        this.duration_ = c;
        var a = this.localize("Duration Time"), c = qa(c);
        this.contentEl_.innerHTML = '<span class="vjs-control-text">' + a + "</span> " + c;
      }
    };
    return b;
  }(l);
  l.registerComponent("DurationDisplay", Qf);
  var Rf = function(a) {
    function b() {
      return a.apply(this, arguments) || this;
    }
    __extends(b, a);
    b.prototype.createEl = function() {
      return a.prototype.createEl.call(this, "div", {className:"vjs-time-control vjs-time-divider", innerHTML:"<div><span>/</span></div>"});
    };
    return b;
  }(l);
  l.registerComponent("TimeDivider", Rf);
  var Sf = function(a) {
    function b(c, b) {
      b = a.call(this, c, b) || this;
      b.on(c, "timeupdate", b.updateContent);
      b.on(c, "durationchange", b.updateContent);
      return b;
    }
    __extends(b, a);
    b.prototype.createEl = function() {
      var c = a.prototype.createEl.call(this, "div", {className:"vjs-remaining-time vjs-time-control vjs-control"});
      this.contentEl_ = r("div", {className:"vjs-remaining-time-display", innerHTML:'<span class="vjs-control-text">' + this.localize("Remaining Time") + "</span> -0:00"}, {"aria-live":"off"});
      c.appendChild(this.contentEl_);
      return c;
    };
    b.prototype.updateContent = function() {
      if (this.player_.duration()) {
        var c = this.localize("Remaining Time"), a = qa(this.player_.remainingTime());
        a !== this.formattedTime_ && (this.formattedTime_ = a, this.contentEl_.innerHTML = '<span class="vjs-control-text">' + c + "</span> -" + a);
      }
    };
    return b;
  }(l);
  l.registerComponent("RemainingTimeDisplay", Sf);
  var Tf = function(a) {
    function b(c, b) {
      c = a.call(this, c, b) || this;
      c.updateShowing();
      c.on(c.player(), "durationchange", c.updateShowing);
      return c;
    }
    __extends(b, a);
    b.prototype.createEl = function() {
      var c = a.prototype.createEl.call(this, "div", {className:"vjs-live-control vjs-control"});
      this.contentEl_ = r("div", {className:"vjs-live-display", innerHTML:'<span class="vjs-control-text">' + this.localize("Stream Type") + "</span>" + this.localize("LIVE")}, {"aria-live":"off"});
      c.appendChild(this.contentEl_);
      return c;
    };
    b.prototype.updateShowing = function() {
      Infinity === this.player().duration() ? this.show() : this.hide();
    };
    return b;
  }(l);
  l.registerComponent("LiveDisplay", Tf);
  var bc = function(a) {
    function b(c, b) {
      b = a.call(this, c, b) || this;
      b.bar = b.getChild(b.options_.barName);
      b.vertical(!!b.options_.vertical);
      b.on("mousedown", b.handleMouseDown);
      b.on("touchstart", b.handleMouseDown);
      b.on("focus", b.handleFocus);
      b.on("blur", b.handleBlur);
      b.on("click", b.handleClick);
      b.on(c, "controlsvisible", b.update);
      b.on(c, b.playerEvent, b.update);
      return b;
    }
    __extends(b, a);
    b.prototype.createEl = function(c, b, f) {
      void 0 === b && (b = {});
      void 0 === f && (f = {});
      b.className += " vjs-slider";
      b = O({tabIndex:0}, b);
      f = O({role:"slider", "aria-valuenow":0, "aria-valuemin":0, "aria-valuemax":100, tabIndex:0}, f);
      return a.prototype.createEl.call(this, c, b, f);
    };
    b.prototype.handleMouseDown = function(c) {
      var a = this.bar.el_.ownerDocument;
      c.preventDefault();
      N();
      this.addClass("vjs-sliding");
      this.trigger("slideractive");
      this.on(a, "mousemove", this.handleMouseMove);
      this.on(a, "mouseup", this.handleMouseUp);
      this.on(a, "touchmove", this.handleMouseMove);
      this.on(a, "touchend", this.handleMouseUp);
      this.handleMouseMove(c);
    };
    b.prototype.handleMouseMove = function() {
    };
    b.prototype.handleMouseUp = function() {
      var c = this.bar.el_.ownerDocument;
      ne();
      this.removeClass("vjs-sliding");
      this.trigger("sliderinactive");
      this.off(c, "mousemove", this.handleMouseMove);
      this.off(c, "mouseup", this.handleMouseUp);
      this.off(c, "touchmove", this.handleMouseMove);
      this.off(c, "touchend", this.handleMouseUp);
      this.update();
    };
    b.prototype.update = function() {
      if (this.el_) {
        var c = this.getPercent(), a = this.bar;
        if (a) {
          if ("number" !== typeof c || c !== c || 0 > c || Infinity === c) {
            c = 0;
          }
          c = (100 * c).toFixed(2) + "%";
          this.vertical() ? a.el().style.height = c : a.el().style.width = c;
        }
      }
    };
    b.prototype.calculateDistance = function(c) {
      c = rc(this.el_, c);
      return this.vertical() ? c.y : c.x;
    };
    b.prototype.handleFocus = function() {
      this.on(this.bar.el_.ownerDocument, "keydown", this.handleKeyPress);
    };
    b.prototype.handleKeyPress = function(c) {
      if (37 === c.which || 40 === c.which) {
        c.preventDefault(), this.stepBack();
      } else {
        if (38 === c.which || 39 === c.which) {
          c.preventDefault(), this.stepForward();
        }
      }
    };
    b.prototype.handleBlur = function() {
      this.off(this.bar.el_.ownerDocument, "keydown", this.handleKeyPress);
    };
    b.prototype.handleClick = function(c) {
      c.stopImmediatePropagation();
      c.preventDefault();
    };
    b.prototype.vertical = function(c) {
      if (void 0 === c) {
        return this.vertical_ || !1;
      }
      (this.vertical_ = !!c) ? this.addClass("vjs-slider-vertical") : this.addClass("vjs-slider-horizontal");
      return this;
    };
    return b;
  }(l);
  l.registerComponent("Slider", bc);
  var Uf = function(a) {
    function b(c, b) {
      b = a.call(this, c, b) || this;
      b.partEls_ = [];
      b.on(c, "progress", b.update);
      return b;
    }
    __extends(b, a);
    b.prototype.createEl = function() {
      return a.prototype.createEl.call(this, "div", {className:"vjs-load-progress", innerHTML:'<span class="vjs-control-text"><span>' + this.localize("Loaded") + "</span>: 0%</span>"});
    };
    b.prototype.update = function() {
      var c = this.player_.buffered(), a = this.player_.duration(), b = this.player_.bufferedEnd(), g = this.partEls_, e = function(c, a) {
        c = c / a || 0;
        return 100 * (1 <= c ? 1 : c) + "%";
      };
      this.el_.style.width = e(b, a);
      for (a = 0;a < c.length;a++) {
        var h = c.start(a), p = c.end(a), l = g[a];
        l || (l = this.el_.appendChild(r()), g[a] = l);
        l.style.left = e(h, b);
        l.style.width = e(p - h, b);
      }
      for (a = g.length;a > c.length;a--) {
        this.el_.removeChild(g[a - 1]);
      }
      g.length = c.length;
    };
    return b;
  }(l);
  l.registerComponent("LoadProgressBar", Uf);
  var Vf = function(a) {
    function b(c, b) {
      var d = a.call(this, c, b) || this;
      d.updateDataAttr();
      d.on(c, "timeupdate", d.updateDataAttr);
      c.ready(A(d, d.updateDataAttr));
      b.playerOptions && b.playerOptions.controlBar && b.playerOptions.controlBar.progressControl && b.playerOptions.controlBar.progressControl.keepTooltipsInside && (d.keepTooltipsInside = b.playerOptions.controlBar.progressControl.keepTooltipsInside);
      d.keepTooltipsInside && d.addClass("vjs-keep-tooltips-inside");
      return d;
    }
    __extends(b, a);
    b.prototype.createEl = function() {
      return a.prototype.createEl.call(this, "div", {className:"vjs-play-progress vjs-slider-bar", innerHTML:'<span class="vjs-control-text"><span>' + this.localize("Progress") + "</span>: 0%</span>"});
    };
    b.prototype.updateDataAttr = function() {
      var c = this.player_.scrubbing() ? this.player_.getCache().currentTime : this.player_.currentTime();
      this.el_.setAttribute("data-current-time", qa(c, this.player_.duration()));
    };
    return b;
  }(l);
  l.registerComponent("PlayProgressBar", Vf);
  var Wf = function(a) {
    function b(c, b) {
      b = a.call(this, c, b) || this;
      b.updateDataAttr();
      b.on(c, "timeupdate", b.updateDataAttr);
      c.ready(A(b, b.updateDataAttr));
      return b;
    }
    __extends(b, a);
    b.prototype.createEl = function() {
      var c = a.prototype.createEl.call(this, "div", {className:"vjs-tooltip-progress-bar vjs-slider-bar", innerHTML:'<div class="vjs-time-tooltip"></div>\n        <span class="vjs-control-text"><span>' + this.localize("Progress") + "</span>: 0%</span>"});
      this.tooltip = c.querySelector(".vjs-time-tooltip");
      return c;
    };
    b.prototype.updateDataAttr = function() {
      var c = this.player_.scrubbing() ? this.player_.getCache().currentTime : this.player_.currentTime(), c = qa(c, this.player_.duration());
      this.el_.setAttribute("data-current-time", c);
      this.tooltip.innerHTML = c;
    };
    return b;
  }(l);
  l.registerComponent("TooltipProgressBar", Wf);
  var cc = function(a) {
    function b(c, b) {
      var d = a.call(this, c, b) || this;
      d.on(c, "timeupdate", d.updateProgress);
      d.on(c, "ended", d.updateProgress);
      c.ready(A(d, d.updateProgress));
      b.playerOptions && b.playerOptions.controlBar && b.playerOptions.controlBar.progressControl && b.playerOptions.controlBar.progressControl.keepTooltipsInside && (d.keepTooltipsInside = b.playerOptions.controlBar.progressControl.keepTooltipsInside);
      d.keepTooltipsInside && (d.tooltipProgressBar = d.addChild("TooltipProgressBar"));
      return d;
    }
    __extends(b, a);
    b.prototype.createEl = function() {
      return a.prototype.createEl.call(this, "div", {className:"vjs-progress-holder"}, {"aria-label":"progress bar"});
    };
    b.prototype.updateProgress = function() {
      this.updateAriaAttributes(this.el_);
      if (this.keepTooltipsInside) {
        this.updateAriaAttributes(this.tooltipProgressBar.el_);
        this.tooltipProgressBar.el_.style.width = this.bar.el_.style.width;
        var c = parseFloat(za(this.player().el(), "width")), a = parseFloat(za(this.tooltipProgressBar.tooltip, "width")), b = this.tooltipProgressBar.el().style;
        b.maxWidth = Math.floor(c - a / 2) + "px";
        b.minWidth = Math.ceil(a / 2) + "px";
        b.right = "-" + a / 2 + "px";
      }
    };
    b.prototype.updateAriaAttributes = function(c) {
      var a = this.player_.scrubbing() ? this.player_.getCache().currentTime : this.player_.currentTime();
      c.setAttribute("aria-valuenow", (100 * this.getPercent()).toFixed(2));
      c.setAttribute("aria-valuetext", qa(a, this.player_.duration()));
    };
    b.prototype.getPercent = function() {
      var c = this.player_.currentTime() / this.player_.duration();
      return 1 <= c ? 1 : c;
    };
    b.prototype.handleMouseDown = function(c) {
      a.prototype.handleMouseDown.call(this, c);
      this.player_.scrubbing(!0);
      this.videoWasPlaying = !this.player_.paused();
      this.player_.pause();
    };
    b.prototype.handleMouseMove = function(c) {
      c = this.calculateDistance(c) * this.player_.duration();
      c === this.player_.duration() && (c -= .1);
      this.player_.currentTime(c);
    };
    b.prototype.handleMouseUp = function(c) {
      a.prototype.handleMouseUp.call(this, c);
      this.player_.scrubbing(!1);
      this.videoWasPlaying && this.player_.play();
    };
    b.prototype.stepForward = function() {
      this.player_.currentTime(this.player_.currentTime() + 5);
    };
    b.prototype.stepBack = function() {
      this.player_.currentTime(this.player_.currentTime() - 5);
    };
    return b;
  }(bc);
  cc.prototype.options_ = {children:["loadProgressBar", "mouseTimeDisplay", "playProgressBar"], barName:"playProgressBar"};
  cc.prototype.playerEvent = "timeupdate";
  l.registerComponent("SeekBar", cc);
  var dc = Jb(Date, "now") || function() {
    return (new Date).getTime();
  }, Xf = Math.max, Yf = function(a, b, c) {
    function d(c, b) {
      b && clearTimeout(b);
      p = k = q = void 0;
      c && (t = dc(), l = a.apply(C, h), k || p || (h = C = void 0));
    }
    function f() {
      var c = b - (dc() - m);
      0 >= c || c > b ? d(q, p) : k = setTimeout(f, c);
    }
    function g() {
      d(x, k);
    }
    function e() {
      h = arguments;
      m = dc();
      C = this;
      q = x && (k || !z);
      if (!1 === n) {
        var c = z && !k;
      } else {
        p || z || (t = m);
        var d = n - (m - t), e = 0 >= d || d > n;
        e ? (p && (p = clearTimeout(p)), t = m, l = a.apply(C, h)) : p || (p = setTimeout(g, d));
      }
      e && k ? k = clearTimeout(k) : k || b === n || (k = setTimeout(f, b));
      c && (e = !0, l = a.apply(C, h));
      !e || k || p || (h = C = void 0);
      return l;
    }
    var h, p, l, m, C, k, q, t = 0, n = !1, x = !0;
    if ("function" != typeof a) {
      throw new TypeError("Expected a function");
    }
    b = 0 > b ? 0 : +b || 0;
    if (!0 === c) {
      var z = !0, x = !1;
    } else {
      ra(c) && (z = !!c.leading, n = "maxWait" in c && Xf(+c.maxWait || 0, b), x = "trailing" in c ? !!c.trailing : x);
    }
    e.cancel = function() {
      k && clearTimeout(k);
      p && clearTimeout(p);
      t = 0;
      p = k = q = void 0;
    };
    return e;
  }, Zf = function(a, b, c) {
    var d = !0, f = !0;
    if ("function" != typeof a) {
      throw new TypeError("Expected a function");
    }
    !1 === c ? d = !1 : ra(c) && (d = "leading" in c ? !!c.leading : d, f = "trailing" in c ? !!c.trailing : f);
    return Yf(a, b, {leading:d, maxWait:+b, trailing:f});
  }, $f = function(a) {
    function b(c, b) {
      var d = a.call(this, c, b) || this;
      b.playerOptions && b.playerOptions.controlBar && b.playerOptions.controlBar.progressControl && b.playerOptions.controlBar.progressControl.keepTooltipsInside && (d.keepTooltipsInside = b.playerOptions.controlBar.progressControl.keepTooltipsInside);
      d.keepTooltipsInside && (d.tooltip = r("div", {className:"vjs-time-tooltip"}), d.el().appendChild(d.tooltip), d.addClass("vjs-keep-tooltips-inside"));
      d.update(0, 0);
      c.on("ready", function() {
        d.on(c.controlBar.progressControl.el(), "mousemove", Zf(A(d, d.handleMouseMove), 25));
      });
      return d;
    }
    __extends(b, a);
    b.prototype.createEl = function() {
      return a.prototype.createEl.call(this, "div", {className:"vjs-mouse-display"});
    };
    b.prototype.handleMouseMove = function(c) {
      var a = this.player_.duration(), a = this.calculateDistance(c) * a;
      c = c.pageX - qc(this.el().parentNode).left;
      this.update(a, c);
    };
    b.prototype.update = function(c, a) {
      c = qa(c, this.player_.duration());
      this.el().style.left = a + "px";
      this.el().setAttribute("data-current-time", c);
      if (this.keepTooltipsInside) {
        var b = this.clampPosition_(a);
        a = a - b + 1;
        b = parseFloat(za(this.tooltip, "width"));
        this.tooltip.innerHTML = c;
        this.tooltip.style.right = "-" + (b / 2 - a) + "px";
      }
    };
    b.prototype.calculateDistance = function(c) {
      return rc(this.el().parentNode, c).x;
    };
    b.prototype.clampPosition_ = function(c) {
      if (!this.keepTooltipsInside) {
        return c;
      }
      var a = parseFloat(za(this.player().el(), "width")), b = parseFloat(za(this.tooltip, "width")) / 2, g = c;
      c < b ? g = Math.ceil(b) : c > a - b && (g = Math.floor(a - b));
      return g;
    };
    return b;
  }(l);
  l.registerComponent("MouseTimeDisplay", $f);
  var Pd = function(a) {
    function b() {
      return a.apply(this, arguments) || this;
    }
    __extends(b, a);
    b.prototype.createEl = function() {
      return a.prototype.createEl.call(this, "div", {className:"vjs-progress-control vjs-control"});
    };
    return b;
  }(l);
  Pd.prototype.options_ = {children:["seekBar"]};
  l.registerComponent("ProgressControl", Pd);
  var Qd = function(a) {
    function b(c, b) {
      b = a.call(this, c, b) || this;
      b.on(c, "fullscreenchange", b.handleFullscreenChange);
      return b;
    }
    __extends(b, a);
    b.prototype.buildCSSClass = function() {
      return "vjs-fullscreen-control " + a.prototype.buildCSSClass.call(this);
    };
    b.prototype.handleFullscreenChange = function() {
      this.player_.isFullscreen() ? this.controlText("Non-Fullscreen") : this.controlText("Fullscreen");
    };
    b.prototype.handleClick = function() {
      this.player_.isFullscreen() ? this.player_.exitFullscreen() : this.player_.requestFullscreen();
    };
    return b;
  }(Ea);
  Qd.prototype.controlText_ = "Fullscreen";
  l.registerComponent("FullscreenToggle", Qd);
  var ag = function(a) {
    function b() {
      return a.apply(this, arguments) || this;
    }
    __extends(b, a);
    b.prototype.createEl = function() {
      return a.prototype.createEl.call(this, "div", {className:"vjs-volume-level", innerHTML:'<span class="vjs-control-text"></span>'});
    };
    return b;
  }(l);
  l.registerComponent("VolumeLevel", ag);
  var kb = function(a) {
    function b(c, b) {
      b = a.call(this, c, b) || this;
      b.on(c, "volumechange", b.updateARIAAttributes);
      c.ready(A(b, b.updateARIAAttributes));
      return b;
    }
    __extends(b, a);
    b.prototype.createEl = function() {
      return a.prototype.createEl.call(this, "div", {className:"vjs-volume-bar vjs-slider-bar"}, {"aria-label":"volume level"});
    };
    b.prototype.handleMouseMove = function(c) {
      this.checkMuted();
      this.player_.volume(this.calculateDistance(c));
    };
    b.prototype.checkMuted = function() {
      this.player_.muted() && this.player_.muted(!1);
    };
    b.prototype.getPercent = function() {
      return this.player_.muted() ? 0 : this.player_.volume();
    };
    b.prototype.stepForward = function() {
      this.checkMuted();
      this.player_.volume(this.player_.volume() + .1);
    };
    b.prototype.stepBack = function() {
      this.checkMuted();
      this.player_.volume(this.player_.volume() - .1);
    };
    b.prototype.updateARIAAttributes = function() {
      var c = (100 * this.player_.volume()).toFixed(2);
      this.el_.setAttribute("aria-valuenow", c);
      this.el_.setAttribute("aria-valuetext", c + "%");
    };
    return b;
  }(bc);
  kb.prototype.options_ = {children:["volumeLevel"], barName:"volumeLevel"};
  kb.prototype.playerEvent = "volumechange";
  l.registerComponent("VolumeBar", kb);
  var Rd = function(a) {
    function b(c, b) {
      b = a.call(this, c, b) || this;
      c.tech_ && !1 === c.tech_.featuresVolumeControl && b.addClass("vjs-hidden");
      b.on(c, "loadstart", function() {
        !1 === c.tech_.featuresVolumeControl ? this.addClass("vjs-hidden") : this.removeClass("vjs-hidden");
      });
      return b;
    }
    __extends(b, a);
    b.prototype.createEl = function() {
      return a.prototype.createEl.call(this, "div", {className:"vjs-volume-control vjs-control"});
    };
    return b;
  }(l);
  Rd.prototype.options_ = {children:["volumeBar"]};
  l.registerComponent("VolumeControl", Rd);
  var Sd = function(a) {
    function b() {
      return a.apply(this, arguments) || this;
    }
    __extends(b, a);
    b.prototype.addItem = function(c) {
      this.addChild(c);
      c.on("click", A(this, function() {
        this.unlockShowing();
      }));
    };
    b.prototype.createEl = function() {
      this.contentEl_ = r(this.options_.contentElType || "ul", {className:"vjs-menu-content"});
      var c = a.prototype.createEl.call(this, "div", {append:this.contentEl_, className:"vjs-menu"});
      c.appendChild(this.contentEl_);
      da(c, "click", function(c) {
        c.preventDefault();
        c.stopImmediatePropagation();
      });
      return c;
    };
    return b;
  }(l);
  l.registerComponent("Popup", Sd);
  var Td = function(a) {
    function b(c, b) {
      void 0 === b && (b = {});
      c = a.call(this, c, b) || this;
      c.update();
      return c;
    }
    __extends(b, a);
    b.prototype.update = function() {
      var c = this.createPopup();
      this.popup && this.removeChild(this.popup);
      this.popup = c;
      this.addChild(c);
      this.items && 0 === this.items.length ? this.hide() : this.items && 1 < this.items.length && this.show();
    };
    b.prototype.createPopup = function() {
    };
    b.prototype.createEl = function() {
      return a.prototype.createEl.call(this, "div", {className:this.buildCSSClass()});
    };
    b.prototype.buildCSSClass = function() {
      var c = "vjs-menu-button", c = !0 === this.options_.inline ? c + "-inline" : c + "-popup";
      return "vjs-menu-button " + c + " " + a.prototype.buildCSSClass.call(this);
    };
    return b;
  }(Da);
  l.registerComponent("PopupButton", Td);
  var lb = function(a) {
    function b(c, b) {
      b = a.call(this, c, b) || this;
      b.on(c, "volumechange", b.update);
      c.tech_ && !1 === c.tech_.featuresVolumeControl && b.addClass("vjs-hidden");
      b.on(c, "loadstart", function() {
        this.update();
        !1 === c.tech_.featuresVolumeControl ? this.addClass("vjs-hidden") : this.removeClass("vjs-hidden");
      });
      return b;
    }
    __extends(b, a);
    b.prototype.buildCSSClass = function() {
      return "vjs-mute-control " + a.prototype.buildCSSClass.call(this);
    };
    b.prototype.handleClick = function() {
      this.player_.muted(this.player_.muted() ? !1 : !0);
    };
    b.prototype.update = function() {
      var c = this.player_.volume(), a = 3;
      0 === c || this.player_.muted() ? a = 0 : .33 > c ? a = 1 : .67 > c && (a = 2);
      c = this.player_.muted() ? "Unmute" : "Mute";
      this.controlText() !== c && this.controlText(c);
      for (c = 0;4 > c;c++) {
        oa(this.el_, "vjs-vol-" + c);
      }
      ma(this.el_, "vjs-vol-" + a);
    };
    return b;
  }(Ea);
  lb.prototype.controlText_ = "Mute";
  l.registerComponent("MuteToggle", lb);
  var ec = function(a) {
    function b(c, b) {
      function d() {
        c.tech_ && !1 === c.tech_.featuresVolumeControl ? this.addClass("vjs-hidden") : this.removeClass("vjs-hidden");
      }
      void 0 === b && (b = {});
      void 0 === b.inline && (b.inline = !0);
      void 0 === b.vertical && (b.vertical = b.inline ? !1 : !0);
      b.volumeBar = b.volumeBar || {};
      b.volumeBar.vertical = !!b.vertical;
      b = a.call(this, c, b) || this;
      b.on(c, "volumechange", b.volumeUpdate);
      b.on(c, "loadstart", b.volumeUpdate);
      d.call(b);
      b.on(c, "loadstart", d);
      b.on(b.volumeBar, ["slideractive", "focus"], function() {
        this.addClass("vjs-slider-active");
      });
      b.on(b.volumeBar, ["sliderinactive", "blur"], function() {
        this.removeClass("vjs-slider-active");
      });
      b.on(b.volumeBar, ["focus"], function() {
        this.addClass("vjs-lock-showing");
      });
      b.on(b.volumeBar, ["blur"], function() {
        this.removeClass("vjs-lock-showing");
      });
      return b;
    }
    __extends(b, a);
    b.prototype.buildCSSClass = function() {
      var c;
      c = this.options_.vertical ? "vjs-volume-menu-button-vertical" : "vjs-volume-menu-button-horizontal";
      return "vjs-volume-menu-button " + a.prototype.buildCSSClass.call(this) + " " + c;
    };
    b.prototype.createPopup = function() {
      var c = new Sd(this.player_, {contentElType:"div"}), a = new kb(this.player_, this.options_.volumeBar);
      c.addChild(a);
      this.menuContent = c;
      this.volumeBar = a;
      this.attachVolumeBarEvents();
      return c;
    };
    b.prototype.handleClick = function() {
      lb.prototype.handleClick.call(this);
      a.prototype.handleClick.call(this);
    };
    b.prototype.attachVolumeBarEvents = function() {
      this.menuContent.on(["mousedown", "touchdown"], A(this, this.handleMouseDown));
    };
    b.prototype.handleMouseDown = function(c) {
      this.on(["mousemove", "touchmove"], A(this.volumeBar, this.volumeBar.handleMouseMove));
      this.on(this.el_.ownerDocument, ["mouseup", "touchend"], this.handleMouseUp);
    };
    b.prototype.handleMouseUp = function(c) {
      this.off(["mousemove", "touchmove"], A(this.volumeBar, this.volumeBar.handleMouseMove));
    };
    return b;
  }(Td);
  ec.prototype.volumeUpdate = lb.prototype.update;
  ec.prototype.controlText_ = "Mute";
  l.registerComponent("VolumeMenuButton", ec);
  var mb = function(a) {
    function b(c, b) {
      c = a.call(this, c, b) || this;
      c.focusedChild_ = -1;
      c.on("keydown", c.handleKeyPress);
      return c;
    }
    __extends(b, a);
    b.prototype.addItem = function(c) {
      this.addChild(c);
      c.on("click", A(this, function() {
        this.unlockShowing();
      }));
    };
    b.prototype.createEl = function() {
      this.contentEl_ = r(this.options_.contentElType || "ul", {className:"vjs-menu-content"});
      this.contentEl_.setAttribute("role", "menu");
      var c = a.prototype.createEl.call(this, "div", {append:this.contentEl_, className:"vjs-menu"});
      c.setAttribute("role", "presentation");
      c.appendChild(this.contentEl_);
      da(c, "click", function(c) {
        c.preventDefault();
        c.stopImmediatePropagation();
      });
      return c;
    };
    b.prototype.handleKeyPress = function(c) {
      if (37 === c.which || 40 === c.which) {
        c.preventDefault(), this.stepForward();
      } else {
        if (38 === c.which || 39 === c.which) {
          c.preventDefault(), this.stepBack();
        }
      }
    };
    b.prototype.stepForward = function() {
      var c = 0;
      void 0 !== this.focusedChild_ && (c = this.focusedChild_ + 1);
      this.focus(c);
    };
    b.prototype.stepBack = function() {
      var c = 0;
      void 0 !== this.focusedChild_ && (c = this.focusedChild_ - 1);
      this.focus(c);
    };
    b.prototype.focus = function(c) {
      void 0 === c && (c = 0);
      var a = this.children().slice();
      a.length && a[0].className && /vjs-menu-title/.test(a[0].className) && a.shift();
      0 < a.length && (0 > c ? c = 0 : c >= a.length && (c = a.length - 1), this.focusedChild_ = c, a[c].el_.focus());
    };
    return b;
  }(l);
  l.registerComponent("Menu", mb);
  var fc = function(a) {
    function b(c, b) {
      void 0 === b && (b = {});
      c = a.call(this, c, b) || this;
      c.update();
      c.enabled_ = !0;
      c.el_.setAttribute("aria-haspopup", "true");
      c.el_.setAttribute("role", "menuitem");
      c.on("keydown", c.handleSubmenuKeyPress);
      return c;
    }
    __extends(b, a);
    b.prototype.update = function() {
      var c = this.createMenu();
      this.menu && this.removeChild(this.menu);
      this.menu = c;
      this.addChild(c);
      this.buttonPressed_ = !1;
      this.el_.setAttribute("aria-expanded", "false");
      this.items && 0 === this.items.length ? this.hide() : this.items && 1 < this.items.length && this.show();
    };
    b.prototype.createMenu = function() {
      var c = new mb(this.player_);
      if (this.options_.title) {
        var a = r("li", {className:"vjs-menu-title", innerHTML:S(this.options_.title), tabIndex:-1});
        c.children_.unshift(a);
        h(a, c.contentEl());
      }
      if (this.items = this.createItems()) {
        for (a = 0;a < this.items.length;a++) {
          c.addItem(this.items[a]);
        }
      }
      return c;
    };
    b.prototype.createItems = function() {
    };
    b.prototype.createEl = function() {
      return a.prototype.createEl.call(this, "div", {className:this.buildCSSClass()});
    };
    b.prototype.buildCSSClass = function() {
      var c = "vjs-menu-button", c = !0 === this.options_.inline ? c + "-inline" : c + "-popup";
      return "vjs-menu-button " + c + " " + a.prototype.buildCSSClass.call(this);
    };
    b.prototype.handleClick = function() {
      this.one(this.menu.contentEl(), "mouseleave", A(this, function(c) {
        this.unpressButton();
        this.el_.blur();
      }));
      this.buttonPressed_ ? this.unpressButton() : this.pressButton();
    };
    b.prototype.handleKeyPress = function(c) {
      27 === c.which || 9 === c.which ? (this.buttonPressed_ && this.unpressButton(), 9 !== c.which && c.preventDefault()) : 38 === c.which || 40 === c.which ? this.buttonPressed_ || (this.pressButton(), c.preventDefault()) : a.prototype.handleKeyPress.call(this, c);
    };
    b.prototype.handleSubmenuKeyPress = function(c) {
      if (27 === c.which || 9 === c.which) {
        this.buttonPressed_ && this.unpressButton(), 9 !== c.which && c.preventDefault();
      }
    };
    b.prototype.pressButton = function() {
      this.enabled_ && (this.buttonPressed_ = !0, this.menu.lockShowing(), this.el_.setAttribute("aria-expanded", "true"), this.menu.focus());
    };
    b.prototype.unpressButton = function() {
      this.enabled_ && (this.buttonPressed_ = !1, this.menu.unlockShowing(), this.el_.setAttribute("aria-expanded", "false"), this.el_.focus());
    };
    b.prototype.disable = function() {
      this.buttonPressed_ = !1;
      this.menu.unlockShowing();
      this.el_.setAttribute("aria-expanded", "false");
      this.enabled_ = !1;
      return a.prototype.disable.call(this);
    };
    b.prototype.enable = function() {
      this.enabled_ = !0;
      return a.prototype.enable.call(this);
    };
    return b;
  }(Da);
  l.registerComponent("MenuButton", fc);
  var gc = function(a) {
    function b(c, b) {
      var d = b.tracks;
      c = a.call(this, c, b) || this;
      1 >= c.items.length && c.hide();
      if (d) {
        var g = A(c, c.update);
        d.addEventListener("removetrack", g);
        d.addEventListener("addtrack", g);
        c.player_.on("dispose", function() {
          d.removeEventListener("removetrack", g);
          d.removeEventListener("addtrack", g);
        });
        return c;
      }
    }
    __extends(b, a);
    return b;
  }(fc);
  l.registerComponent("TrackButton", gc);
  var Qa = function(a) {
    function b(c, b) {
      c = a.call(this, c, b) || this;
      c.selectable = b.selectable;
      c.selected(b.selected);
      c.selectable ? c.el_.setAttribute("role", "menuitemcheckbox") : c.el_.setAttribute("role", "menuitem");
      return c;
    }
    __extends(b, a);
    b.prototype.createEl = function(c, b, f) {
      return a.prototype.createEl.call(this, "li", O({className:"vjs-menu-item", innerHTML:this.localize(this.options_.label), tabIndex:-1}, b), f);
    };
    b.prototype.handleClick = function() {
      this.selected(!0);
    };
    b.prototype.selected = function(c) {
      this.selectable && (c ? (this.addClass("vjs-selected"), this.el_.setAttribute("aria-checked", "true"), this.controlText(", selected")) : (this.removeClass("vjs-selected"), this.el_.setAttribute("aria-checked", "false"), this.controlText(" ")));
    };
    return b;
  }(Da);
  l.registerComponent("MenuItem", Qa);
  var Ra = function(a) {
    function b(c, b) {
      var d = b.track, g = c.textTracks();
      b.label = d.label || d.language || "Unknown";
      b.selected = d["default"] || "showing" === d.mode;
      c = a.call(this, c, b) || this;
      c.track = d;
      if (g) {
        var e = A(c, c.handleTracksChange);
        g.addEventListener("change", e);
        c.on("dispose", function() {
          g.removeEventListener("change", e);
        });
      }
      if (g && void 0 === g.onchange) {
        var h;
        c.on(["tap", "click"], function() {
          if ("object" !== typeof q.Event) {
            try {
              h = new q.Event("change");
            } catch (L) {
            }
          }
          h || (h = z.createEvent("Event"), h.initEvent("change", !0, !0));
          g.dispatchEvent(h);
        });
      }
      return c;
    }
    __extends(b, a);
    b.prototype.handleClick = function(c) {
      var b = this.track.kind, f = this.player_.textTracks();
      a.prototype.handleClick.call(this, c);
      if (f) {
        for (c = 0;c < f.length;c++) {
          var g = f[c];
          g.kind === b && (g.mode = g === this.track ? "showing" : "disabled");
        }
      }
    };
    b.prototype.handleTracksChange = function(c) {
      this.selected("showing" === this.track.mode);
    };
    return b;
  }(Qa);
  l.registerComponent("TextTrackMenuItem", Ra);
  var Ud = function(a) {
    function b(c, b) {
      b.track = {player:c, kind:b.kind, label:b.kind + " off", "default":!1, mode:"disabled"};
      b.selectable = !0;
      c = a.call(this, c, b) || this;
      c.selected(!0);
      return c;
    }
    __extends(b, a);
    b.prototype.handleTracksChange = function(c) {
      c = this.player().textTracks();
      for (var a = !0, b = 0, g = c.length;b < g;b++) {
        var e = c[b];
        if (e.kind === this.track.kind && "showing" === e.mode) {
          a = !1;
          break;
        }
      }
      this.selected(a);
    };
    return b;
  }(Ra);
  l.registerComponent("OffTextTrackMenuItem", Ud);
  var Sa = function(a) {
    function b(c, b) {
      void 0 === b && (b = {});
      b.tracks = c.textTracks();
      return a.call(this, c, b) || this;
    }
    __extends(b, a);
    b.prototype.createItems = function(c) {
      void 0 === c && (c = []);
      c.push(new Ud(this.player_, {kind:this.kind_}));
      var a = this.player_.textTracks();
      if (!a) {
        return c;
      }
      for (var b = 0;b < a.length;b++) {
        var g = a[b];
        g.kind === this.kind_ && c.push(new Ra(this.player_, {track:g, selectable:!0}));
      }
      return c;
    };
    return b;
  }(gc);
  l.registerComponent("TextTrackButton", Sa);
  var Vd = function(a) {
    function b(c, b) {
      var d = b.track, g = b.cue, e = c.currentTime();
      b.label = g.text;
      b.selected = g.startTime <= e && e < g.endTime;
      c = a.call(this, c, b) || this;
      c.track = d;
      c.cue = g;
      d.addEventListener("cuechange", A(c, c.update));
      return c;
    }
    __extends(b, a);
    b.prototype.handleClick = function() {
      a.prototype.handleClick.call(this);
      this.player_.currentTime(this.cue.startTime);
      this.update(this.cue.startTime);
    };
    b.prototype.update = function() {
      var c = this.cue, a = this.player_.currentTime();
      this.selected(c.startTime <= a && a < c.endTime);
    };
    return b;
  }(Qa);
  l.registerComponent("ChaptersTrackMenuItem", Vd);
  var hc = function(a) {
    function b(c, b, f) {
      c = a.call(this, c, b, f) || this;
      c.el_.setAttribute("aria-label", "Chapters Menu");
      return c;
    }
    __extends(b, a);
    b.prototype.buildCSSClass = function() {
      return "vjs-chapters-button " + a.prototype.buildCSSClass.call(this);
    };
    b.prototype.createItems = function() {
      var c = [], a = this.player_.textTracks();
      if (!a) {
        return c;
      }
      for (var b = 0;b < a.length;b++) {
        var g = a[b];
        g.kind === this.kind_ && c.push(new Ra(this.player_, {track:g}));
      }
      return c;
    };
    b.prototype.createMenu = function() {
      for (var c = this, a = this.player_.textTracks() || [], b, g = this.items || [], e = a.length - 1;0 <= e;e--) {
        var p = a[e];
        if (p.kind === this.kind_) {
          b = p;
          break;
        }
      }
      var l = this.menu;
      void 0 === l ? (l = new mb(this.player_), e = r("li", {className:"vjs-menu-title", innerHTML:S(this.kind_), tabIndex:-1}), l.children_.unshift(e), h(e, l.contentEl())) : (g.forEach(function(c) {
        return l.removeChild(c);
      }), g = []);
      !b || null !== b.cues && void 0 !== b.cues || (b.mode = "hidden", (e = this.player_.remoteTextTrackEls().getTrackElementByTrack_(b)) && e.addEventListener("load", function(a) {
        return c.update();
      }));
      if (b && b.cues && 0 < b.cues.length) {
        for (a = b.cues, e = 0, p = a.length;e < p;e++) {
          var k = new Vd(this.player_, {cue:a[e], track:b});
          g.push(k);
          l.addChild(k);
        }
      }
      0 < g.length && this.show();
      this.items = g;
      return l;
    };
    return b;
  }(Sa);
  hc.prototype.kind_ = "chapters";
  hc.prototype.controlText_ = "Chapters";
  l.registerComponent("ChaptersButton", hc);
  var ic = function(a) {
    function b(c, b, f) {
      b = a.call(this, c, b, f) || this;
      b.el_.setAttribute("aria-label", "Descriptions Menu");
      var d = c.textTracks();
      if (d) {
        var e = A(b, b.handleTracksChange);
        d.addEventListener("change", e);
        b.on("dispose", function() {
          d.removeEventListener("change", e);
        });
      }
      return b;
    }
    __extends(b, a);
    b.prototype.handleTracksChange = function(c) {
      c = this.player().textTracks();
      for (var a = !1, b = 0, g = c.length;b < g;b++) {
        var e = c[b];
        if (e.kind !== this.kind_ && "showing" === e.mode) {
          a = !0;
          break;
        }
      }
      a ? this.disable() : this.enable();
    };
    b.prototype.buildCSSClass = function() {
      return "vjs-descriptions-button " + a.prototype.buildCSSClass.call(this);
    };
    return b;
  }(Sa);
  ic.prototype.kind_ = "descriptions";
  ic.prototype.controlText_ = "Descriptions";
  l.registerComponent("DescriptionsButton", ic);
  var jc = function(a) {
    function b(c, b, f) {
      c = a.call(this, c, b, f) || this;
      c.el_.setAttribute("aria-label", "Subtitles Menu");
      return c;
    }
    __extends(b, a);
    b.prototype.buildCSSClass = function() {
      return "vjs-subtitles-button " + a.prototype.buildCSSClass.call(this);
    };
    return b;
  }(Sa);
  jc.prototype.kind_ = "subtitles";
  jc.prototype.controlText_ = "Subtitles";
  l.registerComponent("SubtitlesButton", jc);
  var Wd = function(a) {
    function b(c, b) {
      b.track = {player:c, kind:b.kind, label:b.kind + " settings", selectable:!1, "default":!1, mode:"disabled"};
      b.selectable = !1;
      c = a.call(this, c, b) || this;
      c.addClass("vjs-texttrack-settings");
      c.controlText(", opens " + b.kind + " settings dialog");
      return c;
    }
    __extends(b, a);
    b.prototype.handleClick = function() {
      this.player().getChild("textTrackSettings").show();
      this.player().getChild("textTrackSettings").el_.focus();
    };
    return b;
  }(Ra);
  l.registerComponent("CaptionSettingsMenuItem", Wd);
  var kc = function(a) {
    function b(c, b, f) {
      c = a.call(this, c, b, f) || this;
      c.el_.setAttribute("aria-label", "Captions Menu");
      return c;
    }
    __extends(b, a);
    b.prototype.buildCSSClass = function() {
      return "vjs-captions-button " + a.prototype.buildCSSClass.call(this);
    };
    b.prototype.update = function() {
      var c = 2;
      a.prototype.update.call(this);
      this.player().tech_ && this.player().tech_.featuresNativeTextTracks && (c = 1);
      this.items && this.items.length > c ? this.show() : this.hide();
    };
    b.prototype.createItems = function() {
      var c = [];
      this.player().tech_ && this.player().tech_.featuresNativeTextTracks || c.push(new Wd(this.player_, {kind:this.kind_}));
      return a.prototype.createItems.call(this, c);
    };
    return b;
  }(Sa);
  kc.prototype.kind_ = "captions";
  kc.prototype.controlText_ = "Captions";
  l.registerComponent("CaptionsButton", kc);
  var Xd = function(a) {
    function b(c, b) {
      var d = b.track, g = c.audioTracks();
      b.label = d.label || d.language || "Unknown";
      b.selected = d.enabled;
      c = a.call(this, c, b) || this;
      c.track = d;
      if (g) {
        var e = A(c, c.handleTracksChange);
        g.addEventListener("change", e);
        c.on("dispose", function() {
          g.removeEventListener("change", e);
        });
      }
      return c;
    }
    __extends(b, a);
    b.prototype.handleClick = function(c) {
      var b = this.player_.audioTracks();
      a.prototype.handleClick.call(this, c);
      if (b) {
        for (c = 0;c < b.length;c++) {
          var f = b[c];
          f.enabled = f === this.track;
        }
      }
    };
    b.prototype.handleTracksChange = function(c) {
      this.selected(this.track.enabled);
    };
    return b;
  }(Qa);
  l.registerComponent("AudioTrackMenuItem", Xd);
  var Yd = function(a) {
    function b(c, b) {
      void 0 === b && (b = {});
      b.tracks = c.audioTracks && c.audioTracks();
      c = a.call(this, c, b) || this;
      c.el_.setAttribute("aria-label", "Audio Menu");
      return c;
    }
    __extends(b, a);
    b.prototype.buildCSSClass = function() {
      return "vjs-audio-button " + a.prototype.buildCSSClass.call(this);
    };
    b.prototype.createItems = function(c) {
      void 0 === c && (c = []);
      var a = this.player_.audioTracks && this.player_.audioTracks();
      if (!a) {
        return c;
      }
      for (var b = 0;b < a.length;b++) {
        c.push(new Xd(this.player_, {track:a[b], selectable:!0}));
      }
      return c;
    };
    return b;
  }(gc);
  Yd.prototype.controlText_ = "Audio Track";
  l.registerComponent("AudioTrackButton", Yd);
  var lc = function(a) {
    function b(c, b) {
      var d = b.rate, g = parseFloat(d, 10);
      b.label = d;
      b.selected = 1 === g;
      b = a.call(this, c, b) || this;
      b.label = d;
      b.rate = g;
      b.on(c, "ratechange", b.update);
      return b;
    }
    __extends(b, a);
    b.prototype.handleClick = function() {
      a.prototype.handleClick.call(this);
      this.player().playbackRate(this.rate);
    };
    b.prototype.update = function() {
      this.selected(this.player().playbackRate() === this.rate);
    };
    return b;
  }(Qa);
  lc.prototype.contentElType = "button";
  l.registerComponent("PlaybackRateMenuItem", lc);
  var Zd = function(a) {
    function b(c, b) {
      b = a.call(this, c, b) || this;
      b.updateVisibility();
      b.updateLabel();
      b.on(c, "loadstart", b.updateVisibility);
      b.on(c, "ratechange", b.updateLabel);
      return b;
    }
    __extends(b, a);
    b.prototype.createEl = function() {
      var c = a.prototype.createEl.call(this);
      this.labelEl_ = r("div", {className:"vjs-playback-rate-value", innerHTML:1});
      c.appendChild(this.labelEl_);
      return c;
    };
    b.prototype.buildCSSClass = function() {
      return "vjs-playback-rate " + a.prototype.buildCSSClass.call(this);
    };
    b.prototype.createMenu = function() {
      var c = new mb(this.player()), a = this.playbackRates();
      if (a) {
        for (var b = a.length - 1;0 <= b;b--) {
          c.addChild(new lc(this.player(), {rate:a[b] + "x"}));
        }
      }
      return c;
    };
    b.prototype.updateARIAAttributes = function() {
      this.el().setAttribute("aria-valuenow", this.player().playbackRate());
    };
    b.prototype.handleClick = function() {
      for (var c = this.player().playbackRate(), a = this.playbackRates(), b = a[0], g = 0;g < a.length;g++) {
        if (a[g] > c) {
          b = a[g];
          break;
        }
      }
      this.player().playbackRate(b);
    };
    b.prototype.playbackRates = function() {
      return this.options_.playbackRates || this.options_.playerOptions && this.options_.playerOptions.playbackRates;
    };
    b.prototype.playbackRateSupported = function() {
      return this.player().tech_ && this.player().tech_.featuresPlaybackRate && this.playbackRates() && 0 < this.playbackRates().length;
    };
    b.prototype.updateVisibility = function() {
      this.playbackRateSupported() ? this.removeClass("vjs-hidden") : this.addClass("vjs-hidden");
    };
    b.prototype.updateLabel = function() {
      this.playbackRateSupported() && (this.labelEl_.innerHTML = this.player().playbackRate() + "x");
    };
    return b;
  }(fc);
  Zd.prototype.controlText_ = "Playback Rate";
  l.registerComponent("PlaybackRateMenuButton", Zd);
  var $d = function(a) {
    function b() {
      return a.apply(this, arguments) || this;
    }
    __extends(b, a);
    b.prototype.buildCSSClass = function() {
      return "vjs-spacer " + a.prototype.buildCSSClass.call(this);
    };
    b.prototype.createEl = function() {
      return a.prototype.createEl.call(this, "div", {className:this.buildCSSClass()});
    };
    return b;
  }(l);
  l.registerComponent("Spacer", $d);
  var bg = function(a) {
    function b() {
      return a.apply(this, arguments) || this;
    }
    __extends(b, a);
    b.prototype.buildCSSClass = function() {
      return "vjs-custom-control-spacer " + a.prototype.buildCSSClass.call(this);
    };
    b.prototype.createEl = function() {
      var c = a.prototype.createEl.call(this, {className:this.buildCSSClass()});
      c.innerHTML = "&nbsp;";
      return c;
    };
    return b;
  }($d);
  l.registerComponent("CustomControlSpacer", bg);
  var ae = function(a) {
    function b() {
      return a.apply(this, arguments) || this;
    }
    __extends(b, a);
    b.prototype.createEl = function() {
      return a.prototype.createEl.call(this, "div", {className:"vjs-control-bar", dir:"ltr"}, {role:"group"});
    };
    return b;
  }(l);
  ae.prototype.options_ = {children:"playToggle volumeMenuButton currentTimeDisplay timeDivider durationDisplay progressControl liveDisplay remainingTimeDisplay customControlSpacer playbackRateMenuButton chaptersButton descriptionsButton subtitlesButton captionsButton audioTrackButton fullscreenToggle".split(" ")};
  l.registerComponent("ControlBar", ae);
  var be = function(a) {
    function b(c, b) {
      b = a.call(this, c, b) || this;
      b.on(c, "error", b.open);
      return b;
    }
    __extends(b, a);
    b.prototype.buildCSSClass = function() {
      return "vjs-error-display " + a.prototype.buildCSSClass.call(this);
    };
    b.prototype.content = function() {
      var c = this.player().error();
      return c ? this.localize(c.message) : "";
    };
    return b;
  }(Pa);
  be.prototype.options_ = U(Pa.prototype.options_, {fillAlways:!0, temporary:!1, uncloseable:!0});
  l.registerComponent("ErrorDisplay", be);
  var ce = ["#000", "Black"], de = ["#00F", "Blue"], ee = ["#0FF", "Cyan"], fe = ["#0F0", "Green"], ge = ["#F0F", "Magenta"], he = ["#F00", "Red"], ie = ["#FFF", "White"], je = ["#FF0", "Yellow"], mc = ["1", "Opaque"], nc = ["0.5", "Semi-Transparent"], ke = ["0", "Transparent"], ya = {backgroundColor:{selector:".vjs-bg-color > select", id:"captions-background-color-%s", label:"Color", options:[ce, ie, he, fe, de, je, ge, ee]}, backgroundOpacity:{selector:".vjs-bg-opacity > select", id:"captions-background-opacity-%s", 
  label:"Transparency", options:[mc, nc, ke]}, color:{selector:".vjs-fg-color > select", id:"captions-foreground-color-%s", label:"Color", options:[ie, ce, he, fe, de, je, ge, ee]}, edgeStyle:{selector:".vjs-edge-style > select", id:"%s", label:"Text Edge Style", options:[["none", "None"], ["raised", "Raised"], ["depressed", "Depressed"], ["uniform", "Uniform"], ["dropshadow", "Dropshadow"]]}, fontFamily:{selector:".vjs-font-family > select", id:"captions-font-family-%s", label:"Font Family", options:[["proportionalSansSerif", 
  "Proportional Sans-Serif"], ["monospaceSansSerif", "Monospace Sans-Serif"], ["proportionalSerif", "Proportional Serif"], ["monospaceSerif", "Monospace Serif"], ["casual", "Casual"], ["script", "Script"], ["small-caps", "Small Caps"]]}, fontPercent:{selector:".vjs-font-percent > select", id:"captions-font-size-%s", label:"Font Size", options:[["0.50", "50%"], ["0.75", "75%"], ["1.00", "100%"], ["1.25", "125%"], ["1.50", "150%"], ["1.75", "175%"], ["2.00", "200%"], ["3.00", "300%"], ["4.00", "400%"]], 
  "default":2, parser:function(a) {
    return "1.00" === a ? null : Number(a);
  }}, textOpacity:{selector:".vjs-text-opacity > select", id:"captions-foreground-opacity-%s", label:"Transparency", options:[mc, nc]}, windowColor:{selector:".vjs-window-color > select", id:"captions-window-color-%s", label:"Color"}, windowOpacity:{selector:".vjs-window-opacity > select", id:"captions-window-opacity-%s", label:"Transparency", options:[ke, nc, mc]}};
  ya.windowColor.options = ya.backgroundColor.options;
  var cg = function(a) {
    function b(c, b) {
      var d = a.call(this, c, b) || this;
      d.setDefaults();
      d.hide();
      d.updateDisplay = A(d, d.updateDisplay);
      void 0 === b.persistTextTrackSettings && (d.options_.persistTextTrackSettings = d.options_.playerOptions.persistTextTrackSettings);
      d.on(d.$(".vjs-done-button"), "click", function() {
        d.saveSettings();
        d.hide();
      });
      d.on(d.$(".vjs-default-button"), "click", function() {
        d.setDefaults();
        d.updateDisplay();
      });
      vb(ya, function(c) {
        d.on(d.$(c.selector), "change", d.updateDisplay);
      });
      d.options_.persistTextTrackSettings && d.restoreSettings();
      return d;
    }
    __extends(b, a);
    b.prototype.createElSelect_ = function(c) {
      var a = this;
      c = ya[c];
      var b = c.id.replace("%s", this.id_);
      return [r("label", {className:"vjs-label", textContent:c.label}, {"for":b}), r("select", {id:b}, void 0, c.options.map(function(c) {
        return r("option", {textContent:a.localize(c[1]), value:c[0]});
      }))];
    };
    b.prototype.createElFgColor_ = function() {
      var c = r("legend", {textContent:this.localize("Text")}), a = this.createElSelect_("color"), b = r("span", {className:"vjs-text-opacity vjs-opacity"}, void 0, this.createElSelect_("textOpacity"));
      return r("fieldset", {className:"vjs-fg-color vjs-tracksetting"}, void 0, [c].concat(a, b));
    };
    b.prototype.createElBgColor_ = function() {
      var c = r("legend", {textContent:this.localize("Background")}), a = this.createElSelect_("backgroundColor"), b = r("span", {className:"vjs-bg-opacity vjs-opacity"}, void 0, this.createElSelect_("backgroundOpacity"));
      return r("fieldset", {className:"vjs-bg-color vjs-tracksetting"}, void 0, [c].concat(a, b));
    };
    b.prototype.createElWinColor_ = function() {
      var c = r("legend", {textContent:this.localize("Window")}), a = this.createElSelect_("windowColor"), b = r("span", {className:"vjs-window-opacity vjs-opacity"}, void 0, this.createElSelect_("windowOpacity"));
      return r("fieldset", {className:"vjs-window-color vjs-tracksetting"}, void 0, [c].concat(a, b));
    };
    b.prototype.createElColors_ = function() {
      return r("div", {className:"vjs-tracksettings-colors"}, void 0, [this.createElFgColor_(), this.createElBgColor_(), this.createElWinColor_()]);
    };
    b.prototype.createElFont_ = function() {
      var c = r("div", {className:"vjs-font-percent vjs-tracksetting"}, void 0, this.createElSelect_("fontPercent")), a = r("div", {className:"vjs-edge-style vjs-tracksetting"}, void 0, this.createElSelect_("edgeStyle")), b = r("div", {className:"vjs-font-family vjs-tracksetting"}, void 0, this.createElSelect_("fontFamily"));
      return r("div", {className:"vjs-tracksettings-font"}, void 0, [c, a, b]);
    };
    b.prototype.createElControls_ = function() {
      var c = r("button", {className:"vjs-default-button", textContent:this.localize("Defaults")}), a = r("button", {className:"vjs-done-button", textContent:"Done"});
      return r("div", {className:"vjs-tracksettings-controls"}, void 0, [c, a]);
    };
    b.prototype.createEl = function() {
      var c = r("div", {className:"vjs-tracksettings"}, void 0, [this.createElColors_(), this.createElFont_(), this.createElControls_()]), a = r("div", {className:"vjs-control-text", id:"TTsettingsDialogLabel-" + this.id_, textContent:"Caption Settings Dialog"}, {"aria-level":"1", role:"heading"}), b = r("div", {className:"vjs-control-text", id:"TTsettingsDialogDescription-" + this.id_, textContent:"Beginning of dialog window. Escape will cancel and close the window."}), c = r("div", void 0, {role:"document"}, 
      [a, b, c]);
      return r("div", {className:"vjs-caption-settings vjs-modal-overlay", tabIndex:-1}, {role:"dialog", "aria-labelledby":a.id, "aria-describedby":b.id}, c);
    };
    b.prototype.getValues = function() {
      var c = this;
      return Ee(ya, function(a, b, g) {
        var d = c.$(b.selector);
        b = Ic(d.options[d.options.selectedIndex].value, b.parser);
        void 0 !== b && (a[g] = b);
        return a;
      }, {});
    };
    b.prototype.setValues = function(c) {
      var a = this;
      vb(ya, function(b, d) {
        var f = a.$(b.selector);
        d = c[d];
        b = b.parser;
        if (d) {
          for (var g = 0;g < f.options.length;g++) {
            if (Ic(f.options[g].value, b) === d) {
              f.selectedIndex = g;
              break;
            }
          }
        }
      });
    };
    b.prototype.setDefaults = function() {
      var c = this;
      vb(ya, function(a) {
        var b = a.hasOwnProperty("default") ? a["default"] : 0;
        c.$(a.selector).selectedIndex = b;
      });
    };
    b.prototype.restoreSettings = function() {
      var c;
      try {
        c = JSON.parse(q.localStorage.getItem("vjs-text-track-settings"));
      } catch (d) {
        E.warn(d);
      }
      c && this.setValues(c);
    };
    b.prototype.saveSettings = function() {
      if (this.options_.persistTextTrackSettings) {
        var c = this.getValues();
        try {
          Object.keys(c).length ? q.localStorage.setItem("vjs-text-track-settings", JSON.stringify(c)) : q.localStorage.removeItem("vjs-text-track-settings");
        } catch (d) {
          E.warn(d);
        }
      }
    };
    b.prototype.updateDisplay = function() {
      var c = this.player_.getChild("textTrackDisplay");
      c && c.updateDisplay();
    };
    return b;
  }(l);
  l.registerComponent("TextTrackSettings", cg);
  var x = function(a) {
    function b(c, b) {
      var d = a.call(this, c, b) || this, g = c.source;
      b = !1;
      g && (d.el_.currentSrc !== g.src || c.tag && 3 === c.tag.initNetworkState_) ? d.setSource(g) : d.handleLateInit_(d.el_);
      if (d.el_.hasChildNodes()) {
        for (var e = d.el_.childNodes, h = e.length, g = [];h--;) {
          var p = e[h];
          "track" === p.nodeName.toLowerCase() && (d.featuresNativeTextTracks ? (d.remoteTextTrackEls().addTrackElement_(p), d.remoteTextTracks().addTrack_(p.track), b || d.el_.hasAttribute("crossorigin") || !Vb(p.src) || (b = !0)) : g.push(p));
        }
        for (e = 0;e < g.length;e++) {
          d.el_.removeChild(g[e]);
        }
      }
      ["audio", "video"].forEach(function(c) {
        var a = d.el()[c + "Tracks"], b = d[c + "Tracks"]();
        c = S(c);
        d["featuresNative" + c + "Tracks"] && a && a.addEventListener && (d["handle" + c + "TrackChange_"] = function(c) {
          b.trigger({type:"change", target:b, currentTarget:b, srcElement:b});
        }, d["handle" + c + "TrackAdd_"] = function(c) {
          return b.addTrack(c.track);
        }, d["handle" + c + "TrackRemove_"] = function(c) {
          return b.removeTrack(c.track);
        }, a.addEventListener("change", d["handle" + c + "TrackChange_"]), a.addEventListener("addtrack", d["handle" + c + "TrackAdd_"]), a.addEventListener("removetrack", d["handle" + c + "TrackRemove_"]), d["removeOld" + c + "Tracks_"] = function(c) {
          return d.removeOldTracks_(b, a);
        }, d.on("loadstart", d["removeOld" + c + "Tracks_"]));
      });
      d.featuresNativeTextTracks && (b && E.warn((l = ["Text Tracks are being loaded from another origin but the crossorigin attribute isn't used.\n            This may prevent text tracks from loading."], l.raw = ["Text Tracks are being loaded from another origin but the crossorigin attribute isn't used.\n            This may prevent text tracks from loading."], pc(l))), d.handleTextTrackChange_ = A(d, d.handleTextTrackChange), d.handleTextTrackAdd_ = A(d, d.handleTextTrackAdd), d.handleTextTrackRemove_ = 
      A(d, d.handleTextTrackRemove), d.proxyNativeTextTracks_());
      (Za || xb || Qc) && !0 === c.nativeControlsForTouch && d.setControls(!0);
      d.proxyWebkitFullscreen_();
      d.triggerReady();
      return d;
      var l;
    }
    __extends(b, a);
    b.prototype.dispose = function() {
      var c = this;
      ["audio", "video", "text"].forEach(function(a) {
        var b = S(a);
        (a = c.el_[a + "Tracks"]) && a.removeEventListener && (a.removeEventListener("change", c["handle" + b + "TrackChange_"]), a.removeEventListener("addtrack", c["handle" + b + "TrackAdd_"]), a.removeEventListener("removetrack", c["handle" + b + "TrackRemove_"]));
        a && c.off("loadstart", c["removeOld" + b + "Tracks_"]);
      });
      b.disposeMediaElement(this.el_);
      a.prototype.dispose.call(this);
    };
    b.prototype.createEl = function() {
      var c = this.options_.tag;
      if (!c || !1 === this.movingMediaElementInDOM) {
        if (c) {
          var a = c.cloneNode(!0);
          c.parentNode.insertBefore(a, c);
          b.disposeMediaElement(c);
          c = a;
        } else {
          c = z.createElement("video"), a = this.options_.tag && pa(this.options_.tag), a = U({}, a), Za && !0 === this.options_.nativeControlsForTouch || delete a.controls, p(c, O(a, {id:this.options_.techId, "class":"vjs-tech"}));
        }
        c.playerId = this.options_.playerId;
      }
      for (var a = ["autoplay", "preload", "loop", "muted"], f = a.length - 1;0 <= f;f--) {
        var g = a[f], e = {};
        "undefined" !== typeof this.options_[g] && (e[g] = this.options_[g]);
        p(c, e);
      }
      return c;
    };
    b.prototype.handleLateInit_ = function(a) {
      if (0 !== a.networkState && 3 !== a.networkState) {
        if (0 === a.readyState) {
          var c = !1, b = function() {
            c = !0;
          };
          this.on("loadstart", b);
          var g = function() {
            c || this.trigger("loadstart");
          };
          this.on("loadedmetadata", g);
          this.ready(function() {
            this.off("loadstart", b);
            this.off("loadedmetadata", g);
            c || this.trigger("loadstart");
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
    b.prototype.proxyNativeTextTracks_ = function() {
      var a = this.el().textTracks;
      if (a) {
        for (var b = 0;b < a.length;b++) {
          this.textTracks().addTrack_(a[b]);
        }
        a.addEventListener && (a.addEventListener("change", this.handleTextTrackChange_), a.addEventListener("addtrack", this.handleTextTrackAdd_), a.addEventListener("removetrack", this.handleTextTrackRemove_));
        this.on("loadstart", this.removeOldTextTracks_);
      }
    };
    b.prototype.handleTextTrackChange = function(a) {
      a = this.textTracks();
      this.textTracks().trigger({type:"change", target:a, currentTarget:a, srcElement:a});
    };
    b.prototype.handleTextTrackAdd = function(a) {
      this.textTracks().addTrack_(a.track);
    };
    b.prototype.handleTextTrackRemove = function(a) {
      this.textTracks().removeTrack_(a.track);
    };
    b.prototype.removeOldTracks_ = function(a, b) {
      var c = [];
      if (b) {
        for (var d = 0;d < a.length;d++) {
          for (var e = a[d], h = !1, p = 0;p < b.length;p++) {
            if (b[p] === e) {
              h = !0;
              break;
            }
          }
          h || c.push(e);
        }
        for (d = 0;d < c.length;d++) {
          a.removeTrack_(c[d]);
        }
      }
    };
    b.prototype.removeOldTextTracks_ = function() {
      var a = this.textTracks(), b = this.el().textTracks;
      this.removeOldTracks_(a, b);
    };
    b.prototype.play = function() {
      var a = this.el_.play();
      void 0 !== a && "function" === typeof a.then && a.then(null, function(a) {
      });
    };
    b.prototype.setCurrentTime = function(a) {
      try {
        this.el_.currentTime = a;
      } catch (d) {
        E(d, "Video is not ready. (Video.js)");
      }
    };
    b.prototype.duration = function() {
      var a = this;
      if (Infinity === this.el_.duration && Ja && Ab && 0 === this.el_.currentTime) {
        var b = function() {
          0 < a.el_.currentTime && (Infinity === a.el_.duration && a.trigger("durationchange"), a.off(a.player_, "timeupdate", b));
        };
        this.on(this.player_, "timeupdate", b);
        return NaN;
      }
      return this.el_.duration || NaN;
    };
    b.prototype.width = function() {
      return this.el_.offsetWidth;
    };
    b.prototype.height = function() {
      return this.el_.offsetHeight;
    };
    b.prototype.proxyWebkitFullscreen_ = function() {
      var a = this;
      if ("webkitDisplayingFullscreen" in this.el_) {
        var b = function() {
          this.trigger("fullscreenchange", {isFullscreen:!1});
        }, f = function() {
          this.one("webkitendfullscreen", b);
          this.trigger("fullscreenchange", {isFullscreen:!0});
        };
        this.on("webkitbeginfullscreen", f);
        this.on("dispose", function() {
          a.off("webkitbeginfullscreen", f);
          a.off("webkitendfullscreen", b);
        });
      }
    };
    b.prototype.supportsFullScreen = function() {
      if ("function" === typeof this.el_.webkitEnterFullScreen) {
        var a = q.navigator && q.navigator.userAgent || "";
        if (/Android/.test(a) || !/Chrome|Mac OS X 10.5/.test(a)) {
          return !0;
        }
      }
      return !1;
    };
    b.prototype.enterFullScreen = function() {
      var a = this.el_;
      a.paused && a.networkState <= a.HAVE_METADATA ? (this.el_.play(), this.setTimeout(function() {
        a.pause();
        a.webkitEnterFullScreen();
      }, 0)) : a.webkitEnterFullScreen();
    };
    b.prototype.exitFullScreen = function() {
      this.el_.webkitExitFullScreen();
    };
    b.prototype.src = function(a) {
      if (void 0 === a) {
        return this.el_.src;
      }
      this.setSrc(a);
    };
    b.prototype.reset = function() {
      b.resetMediaElement(this.el_);
    };
    b.prototype.currentSrc = function() {
      return this.currentSource_ ? this.currentSource_.src : this.el_.currentSrc;
    };
    b.prototype.setControls = function(a) {
      this.el_.controls = !!a;
    };
    b.prototype.addTextTrack = function(b, d, f) {
      return this.featuresNativeTextTracks ? this.el_.addTextTrack(b, d, f) : a.prototype.addTextTrack.call(this, b, d, f);
    };
    b.prototype.createRemoteTextTrack = function(b) {
      if (!this.featuresNativeTextTracks) {
        return a.prototype.createRemoteTextTrack.call(this, b);
      }
      var c = z.createElement("track");
      b.kind && (c.kind = b.kind);
      b.label && (c.label = b.label);
      if (b.language || b.srclang) {
        c.srclang = b.language || b.srclang;
      }
      b["default"] && (c["default"] = b["default"]);
      b.id && (c.id = b.id);
      b.src && (c.src = b.src);
      return c;
    };
    b.prototype.addRemoteTextTrack = function(b, d) {
      b = a.prototype.addRemoteTextTrack.call(this, b, d);
      this.el().appendChild(b);
      return b;
    };
    b.prototype.removeRemoteTextTrack = function(b) {
      a.prototype.removeRemoteTextTrack.call(this, b);
      for (var c = this.$$("track"), f = c.length;f--;) {
        b !== c[f] && b !== c[f].track || this.el().removeChild(c[f]);
      }
    };
    return b;
  }(I);
  x.TEST_VID = z.createElement("video");
  var nb = z.createElement("track");
  nb.kind = "captions";
  nb.srclang = "en";
  nb.label = "English";
  x.TEST_VID.appendChild(nb);
  x.isSupported = function() {
    try {
      x.TEST_VID.volume = .5;
    } catch (a) {
      return !1;
    }
    return !!x.TEST_VID.canPlayType;
  };
  x.canControlVolume = function() {
    try {
      var a = x.TEST_VID.volume;
      x.TEST_VID.volume = a / 2 + .1;
      return a !== x.TEST_VID.volume;
    } catch (b) {
      return !1;
    }
  };
  x.canControlPlaybackRate = function() {
    if (Ja && Ab) {
      return !1;
    }
    try {
      var a = x.TEST_VID.playbackRate;
      x.TEST_VID.playbackRate = a / 2 + .1;
      return a !== x.TEST_VID.playbackRate;
    } catch (b) {
      return !1;
    }
  };
  x.supportsNativeTextTracks = function() {
    var a;
    (a = !!x.TEST_VID.textTracks) && 0 < x.TEST_VID.textTracks.length && (a = "number" !== typeof x.TEST_VID.textTracks[0].mode);
    a && zb && (a = !1);
    !a || "onremovetrack" in x.TEST_VID.textTracks || (a = !1);
    return a;
  };
  x.supportsNativeVideoTracks = function() {
    return !!x.TEST_VID.videoTracks;
  };
  x.supportsNativeAudioTracks = function() {
    return !!x.TEST_VID.audioTracks;
  };
  x.Events = "loadstart suspend abort error emptied stalled loadedmetadata loadeddata canplay canplaythrough playing waiting seeking seeked ended durationchange timeupdate progress play pause ratechange volumechange".split(" ");
  x.prototype.featuresVolumeControl = x.canControlVolume();
  x.prototype.featuresPlaybackRate = x.canControlPlaybackRate();
  x.prototype.movingMediaElementInDOM = !yb;
  x.prototype.featuresFullscreenResize = !0;
  x.prototype.featuresProgressEvents = !0;
  x.prototype.featuresTimeupdateEvents = !0;
  x.prototype.featuresNativeTextTracks = x.supportsNativeTextTracks();
  x.prototype.featuresNativeVideoTracks = x.supportsNativeVideoTracks();
  x.prototype.featuresNativeAudioTracks = x.supportsNativeAudioTracks();
  var ta, dg = /^application\/(?:x-|vnd\.apple\.)mpegurl/i, eg = /^video\/mp4/i;
  x.patchCanPlayType = function() {
    4 <= Ya && !zb && (ta || (ta = x.TEST_VID.constructor.prototype.canPlayType), x.TEST_VID.constructor.prototype.canPlayType = function(a) {
      return a && dg.test(a) ? "maybe" : ta.call(this, a);
    });
    Pc && (ta || (ta = x.TEST_VID.constructor.prototype.canPlayType), x.TEST_VID.constructor.prototype.canPlayType = function(a) {
      return a && eg.test(a) ? "maybe" : ta.call(this, a);
    });
  };
  x.unpatchCanPlayType = function() {
    var a = x.TEST_VID.constructor.prototype.canPlayType;
    x.TEST_VID.constructor.prototype.canPlayType = ta;
    ta = null;
    return a;
  };
  x.patchCanPlayType();
  x.disposeMediaElement = function(a) {
    if (a) {
      for (a.parentNode && a.parentNode.removeChild(a);a.hasChildNodes();) {
        a.removeChild(a.firstChild);
      }
      a.removeAttribute("src");
      if ("function" === typeof a.load) {
        try {
          a.load();
        } catch (b) {
        }
      }
    }
  };
  x.resetMediaElement = function(a) {
    if (a) {
      for (var b = a.querySelectorAll("source"), c = b.length;c--;) {
        a.removeChild(b[c]);
      }
      a.removeAttribute("src");
      if ("function" === typeof a.load) {
        try {
          a.load();
        } catch (d) {
        }
      }
    }
  };
  "paused currentTime buffered volume muted poster preload autoplay controls loop error seeking seekable ended defaultMuted playbackRate played networkState readyState videoWidth videoHeight".split(" ").forEach(function(a) {
    x.prototype[a] = function() {
      return this.el_[a];
    };
  });
  "volume muted src poster preload autoplay loop playbackRate".split(" ").forEach(function(a) {
    x.prototype["set" + S(a)] = function(b) {
      this.el_[a] = b;
    };
  });
  ["pause", "load"].forEach(function(a) {
    x.prototype[a] = function() {
      return this.el_[a]();
    };
  });
  I.withSourceHandlers(x);
  x.nativeSourceHandler = {};
  x.nativeSourceHandler.canPlayType = function(a) {
    try {
      return x.TEST_VID.canPlayType(a);
    } catch (b) {
      return "";
    }
  };
  x.nativeSourceHandler.canHandleSource = function(a, b) {
    return a.type ? x.nativeSourceHandler.canPlayType(a.type) : a.src ? (a = Fd(a.src), x.nativeSourceHandler.canPlayType("video/" + a)) : "";
  };
  x.nativeSourceHandler.handleSource = function(a, b, c) {
    b.setSrc(a.src);
  };
  x.nativeSourceHandler.dispose = function() {
  };
  x.registerSourceHandler(x.nativeSourceHandler);
  l.registerComponent("Html5", x);
  I.registerTech("Html5", x);
  var le = "progress abort suspend emptied stalled loadedmetadata loadeddata timeupdate ratechange volumechange texttrackchange".split(" "), ea = function(a) {
    function b(c, d, f) {
      c.id = c.id || "vjs_video_" + wa++;
      d = O(b.getTagSettings(c), d);
      d.initChildren = !1;
      d.createEl = !1;
      d.reportTouchActivity = !1;
      if (!d.language) {
        if ("function" === typeof c.closest) {
          var g = c.closest("[lang]");
          g && (d.language = g.getAttribute("lang"));
        } else {
          for (g = c;g && 1 === g.nodeType;) {
            if (pa(g).hasOwnProperty("lang")) {
              d.language = g.getAttribute("lang");
              break;
            }
            g = g.parentNode;
          }
        }
      }
      f = a.call(this, null, d, f) || this;
      if (!f.options_ || !f.options_.techOrder || !f.options_.techOrder.length) {
        throw Error("No techOrder specified. Did you overwrite videojs.options instead of just changing the properties you want to override?");
      }
      f.tag = c;
      f.tagAttributes = c && pa(c);
      f.language(f.options_.language);
      if (d.languages) {
        var e = {};
        Object.getOwnPropertyNames(d.languages).forEach(function(a) {
          e[a.toLowerCase()] = d.languages[a];
        });
        f.languages_ = e;
      } else {
        f.languages_ = b.prototype.options_.languages;
      }
      f.cache_ = {};
      f.poster_ = d.poster || "";
      f.controls_ = !!d.controls;
      c.controls = !1;
      f.scrubbing_ = !1;
      f.el_ = f.createEl();
      g = U(f.options_);
      if (d.plugins) {
        var h = d.plugins;
        Object.getOwnPropertyNames(h).forEach(function(a) {
          if ("function" === typeof this[a]) {
            this[a](h[a]);
          } else {
            E.error("Unable to find plugin:", a);
          }
        }, f);
      }
      f.options_.playerOptions = g;
      f.initChildren();
      f.isAudio("audio" === c.nodeName.toLowerCase());
      f.controls() ? f.addClass("vjs-controls-enabled") : f.addClass("vjs-controls-disabled");
      f.el_.setAttribute("role", "region");
      f.isAudio() ? f.el_.setAttribute("aria-label", "audio player") : f.el_.setAttribute("aria-label", "video player");
      f.isAudio() && f.addClass("vjs-audio");
      f.flexNotSupported_() && f.addClass("vjs-no-flex");
      yb || f.addClass("vjs-workinghover");
      b.players[f.id_] = f;
      f.userActive(!0);
      f.reportUserActivity();
      f.listenForUserActivity_();
      f.on("fullscreenchange", f.handleFullscreenChange_);
      f.on("stageclick", f.handleStageClick_);
      return f;
    }
    __extends(b, a);
    b.prototype.dispose = function() {
      this.trigger("dispose");
      this.off("dispose");
      this.styleEl_ && this.styleEl_.parentNode && this.styleEl_.parentNode.removeChild(this.styleEl_);
      b.players[this.id_] = null;
      this.tag && this.tag.player && (this.tag.player = null);
      this.el_ && this.el_.player && (this.el_.player = null);
      this.tech_ && this.tech_.dispose();
      a.prototype.dispose.call(this);
    };
    b.prototype.createEl = function() {
      var b = this.el_ = a.prototype.createEl.call(this, "div"), d = this.tag;
      d.removeAttribute("width");
      d.removeAttribute("height");
      var f = pa(d);
      Object.getOwnPropertyNames(f).forEach(function(a) {
        "class" === a ? b.className = f[a] : b.setAttribute(a, f[a]);
      });
      d.playerId = d.id;
      d.id += "_html5_api";
      d.className = "vjs-tech";
      d.player = b.player = this;
      this.addClass("vjs-paused");
      if (!0 !== q.VIDEOJS_NO_DYNAMIC_STYLE) {
        this.styleEl_ = Uc("vjs-styles-dimensions");
        var g = Ka(".vjs-styles-defaults"), e = Ka("head");
        e.insertBefore(this.styleEl_, g ? g.nextSibling : e.firstChild);
      }
      this.width(this.options_.width);
      this.height(this.options_.height);
      this.fluid(this.options_.fluid);
      this.aspectRatio(this.options_.aspectRatio);
      g = d.getElementsByTagName("a");
      for (e = 0;e < g.length;e++) {
        var p = g.item(e);
        ma(p, "vjs-hidden");
        p.setAttribute("hidden", "hidden");
      }
      d.initNetworkState_ = d.networkState;
      d.parentNode && d.parentNode.insertBefore(b, d);
      h(d, b);
      this.children_.unshift(d);
      return this.el_ = b;
    };
    b.prototype.width = function(a) {
      return this.dimension("width", a);
    };
    b.prototype.height = function(a) {
      return this.dimension("height", a);
    };
    b.prototype.dimension = function(a, b) {
      var c = a + "_";
      if (void 0 === b) {
        return this[c] || 0;
      }
      if ("" === b) {
        this[c] = void 0;
      } else {
        var d = parseFloat(b);
        if (isNaN(d)) {
          return E.error('Improper value "' + b + '" supplied for for ' + a), this;
        }
        this[c] = d;
      }
      this.updateStyleEl_();
      return this;
    };
    b.prototype.fluid = function(a) {
      if (void 0 === a) {
        return !!this.fluid_;
      }
      this.fluid_ = !!a;
      a ? this.addClass("vjs-fluid") : this.removeClass("vjs-fluid");
      this.updateStyleEl_();
    };
    b.prototype.aspectRatio = function(a) {
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
    b.prototype.updateStyleEl_ = function() {
      if (!0 === q.VIDEOJS_NO_DYNAMIC_STYLE) {
        var a = "number" === typeof this.width_ ? this.width_ : this.options_.width, b = "number" === typeof this.height_ ? this.height_ : this.options_.height, f = this.tech_ && this.tech_.el();
        f && (0 <= a && (f.width = a), 0 <= b && (f.height = b));
      } else {
        var a = (void 0 !== this.aspectRatio_ && "auto" !== this.aspectRatio_ ? this.aspectRatio_ : 0 < this.videoWidth() ? this.videoWidth() + ":" + this.videoHeight() : "16:9").split(":"), g = a[1] / a[0], a = void 0 !== this.width_ ? this.width_ : void 0 !== this.height_ ? this.height_ / g : this.videoWidth() || 300, b = void 0 !== this.height_ ? this.height_ : a * g, f = /^[^a-zA-Z]/.test(this.id()) ? "dimensions-" + this.id() : this.id() + "-dimensions";
        this.addClass(f);
        Vc(this.styleEl_, "\n      ." + f + " {\n        width: " + a + "px;\n        height: " + b + "px;\n      }\n\n      ." + f + ".vjs-fluid {\n        padding-top: " + 100 * g + "%;\n      }\n    ");
      }
    };
    b.prototype.loadTech_ = function(a, b) {
      var c = this;
      this.tech_ && this.unloadTech_();
      "Html5" !== a && this.tag && (I.getTech("Html5").disposeMediaElement(this.tag), this.tag = this.tag.player = null);
      this.techName_ = a;
      this.isReady_ = !1;
      var d = O({source:b, nativeControlsForTouch:this.options_.nativeControlsForTouch, playerId:this.id(), techId:this.id() + "_" + a + "_api", videoTracks:this.videoTracks_, textTracks:this.textTracks_, audioTracks:this.audioTracks_, autoplay:this.options_.autoplay, preload:this.options_.preload, loop:this.options_.loop, muted:this.options_.muted, poster:this.poster(), language:this.language(), "vtt.js":this.options_["vtt.js"]}, this.options_[a.toLowerCase()]);
      this.tag && (d.tag = this.tag);
      b && (this.currentType_ = b.type, b.src === this.cache_.src && 0 < this.cache_.currentTime && (d.startTime = this.cache_.currentTime), this.cache_.sources = null, this.cache_.source = b, this.cache_.src = b.src);
      (b = I.getTech(a)) || (b = l.getComponent(a));
      this.tech_ = new b(d);
      this.tech_.ready(A(this, this.handleTechReady_), !0);
      Bd.jsonToTextTracks(this.textTracksJson_ || [], this.tech_);
      le.forEach(function(a) {
        c.on(c.tech_, a, c["handleTech" + S(a) + "_"]);
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
      this.tech_.el().parentNode === this.el() || "Html5" === a && this.tag || h(this.tech_.el(), this.el());
      this.tag && (this.tag = this.tag.player = null);
    };
    b.prototype.unloadTech_ = function() {
      this.videoTracks_ = this.videoTracks();
      this.textTracks_ = this.textTracks();
      this.audioTracks_ = this.audioTracks();
      this.textTracksJson_ = Bd.textTracksToJson(this.tech_);
      this.isReady_ = !1;
      this.tech_.dispose();
      this.tech_ = !1;
    };
    b.prototype.tech = function(a) {
      if (a && a.IWillNotUseThisInPlugins) {
        return this.tech_;
      }
      q.alert("\n      Please make sure that you are not using this inside of a plugin.\n      To disable this alert and error, please pass in an object with\n      `IWillNotUseThisInPlugins` to the `tech` method. See\n      https://github.com/videojs/video.js/issues/2617 for more info.\n    ");
      throw Error("\n      Please make sure that you are not using this inside of a plugin.\n      To disable this alert and error, please pass in an object with\n      `IWillNotUseThisInPlugins` to the `tech` method. See\n      https://github.com/videojs/video.js/issues/2617 for more info.\n    ");
    };
    b.prototype.addTechControlsListeners_ = function() {
      this.removeTechControlsListeners_();
      this.on(this.tech_, "mousedown", this.handleTechClick_);
      this.on(this.tech_, "touchstart", this.handleTechTouchStart_);
      this.on(this.tech_, "touchmove", this.handleTechTouchMove_);
      this.on(this.tech_, "touchend", this.handleTechTouchEnd_);
      this.on(this.tech_, "tap", this.handleTechTap_);
    };
    b.prototype.removeTechControlsListeners_ = function() {
      this.off(this.tech_, "tap", this.handleTechTap_);
      this.off(this.tech_, "touchstart", this.handleTechTouchStart_);
      this.off(this.tech_, "touchmove", this.handleTechTouchMove_);
      this.off(this.tech_, "touchend", this.handleTechTouchEnd_);
      this.off(this.tech_, "mousedown", this.handleTechClick_);
    };
    b.prototype.handleTechReady_ = function() {
      this.triggerReady();
      this.cache_.volume && this.techCall_("setVolume", this.cache_.volume);
      this.handleTechPosterChange_();
      this.handleTechDurationChange_();
      if ((this.src() || this.currentSrc()) && this.tag && this.options_.autoplay && this.paused()) {
        try {
          delete this.tag.poster;
        } catch (c) {
          E("deleting tag.poster throws in some browsers", c);
        }
        this.play();
      }
    };
    b.prototype.handleTechLoadStart_ = function() {
      this.removeClass("vjs-ended");
      this.error(null);
      this.paused() ? (this.hasStarted(!1), this.trigger("loadstart")) : (this.trigger("loadstart"), this.trigger("firstplay"));
    };
    b.prototype.hasStarted = function(a) {
      return void 0 !== a ? (this.hasStarted_ !== a && ((this.hasStarted_ = a) ? (this.addClass("vjs-has-started"), this.trigger("firstplay")) : this.removeClass("vjs-has-started")), this) : !!this.hasStarted_;
    };
    b.prototype.handleTechPlay_ = function() {
      this.removeClass("vjs-ended");
      this.removeClass("vjs-paused");
      this.addClass("vjs-playing");
      this.hasStarted(!0);
      this.trigger("play");
    };
    b.prototype.handleTechWaiting_ = function() {
      var a = this;
      this.addClass("vjs-waiting");
      this.trigger("waiting");
      this.one("timeupdate", function() {
        return a.removeClass("vjs-waiting");
      });
    };
    b.prototype.handleTechCanPlay_ = function() {
      this.removeClass("vjs-waiting");
      this.trigger("canplay");
    };
    b.prototype.handleTechCanPlayThrough_ = function() {
      this.removeClass("vjs-waiting");
      this.trigger("canplaythrough");
    };
    b.prototype.handleTechPlaying_ = function() {
      this.removeClass("vjs-waiting");
      this.trigger("playing");
    };
    b.prototype.handleTechSeeking_ = function() {
      this.addClass("vjs-seeking");
      this.trigger("seeking");
    };
    b.prototype.handleTechSeeked_ = function() {
      this.removeClass("vjs-seeking");
      this.trigger("seeked");
    };
    b.prototype.handleTechFirstPlay_ = function() {
      this.options_.starttime && this.currentTime(this.options_.starttime);
      this.addClass("vjs-has-started");
      this.trigger("firstplay");
    };
    b.prototype.handleTechPause_ = function() {
      this.removeClass("vjs-playing");
      this.addClass("vjs-paused");
      this.trigger("pause");
    };
    b.prototype.handleTechEnded_ = function() {
      this.addClass("vjs-ended");
      this.options_.loop ? (this.currentTime(0), this.play()) : this.paused() || this.pause();
      this.trigger("ended");
    };
    b.prototype.handleTechDurationChange_ = function() {
      this.duration(this.techGet_("duration"));
    };
    b.prototype.handleTechClick_ = function(a) {
      0 === a.button && this.controls() && (this.paused() ? this.play() : this.pause());
    };
    b.prototype.handleTechTap_ = function() {
      this.userActive(!this.userActive());
    };
    b.prototype.handleTechTouchStart_ = function() {
      this.userWasActive = this.userActive();
    };
    b.prototype.handleTechTouchMove_ = function() {
      this.userWasActive && this.reportUserActivity();
    };
    b.prototype.handleTechTouchEnd_ = function(a) {
      a.preventDefault();
    };
    b.prototype.handleFullscreenChange_ = function() {
      this.isFullscreen() ? this.addClass("vjs-fullscreen") : this.removeClass("vjs-fullscreen");
    };
    b.prototype.handleStageClick_ = function() {
      this.reportUserActivity();
    };
    b.prototype.handleTechFullscreenChange_ = function(a, b) {
      b && this.isFullscreen(b.isFullscreen);
      this.trigger("fullscreenchange");
    };
    b.prototype.handleTechError_ = function() {
      var a = this.tech_.error();
      this.error(a);
    };
    b.prototype.handleTechTextData_ = function() {
      var a = null;
      1 < arguments.length && (a = arguments[1]);
      this.trigger("textdata", a);
    };
    b.prototype.getCache = function() {
      return this.cache_;
    };
    b.prototype.techCall_ = function(a, b) {
      if (this.tech_ && !this.tech_.isReady_) {
        this.tech_.ready(function() {
          this[a](b);
        }, !0);
      } else {
        try {
          if (this.tech_) {
            this.tech_[a](b);
          }
        } catch (f) {
          throw E(f), f;
        }
      }
    };
    b.prototype.techGet_ = function(a) {
      if (this.tech_ && this.tech_.isReady_) {
        try {
          return this.tech_[a]();
        } catch (d) {
          throw void 0 === this.tech_[a] ? E("Video.js: " + a + " method not defined for " + this.techName_ + " playback technology.", d) : "TypeError" === d.name ? (E("Video.js: " + a + " unavailable on " + this.techName_ + " playback technology element.", d), this.tech_.isReady_ = !1) : E(d), d;
        }
      }
    };
    b.prototype.play = function() {
      if (this.src() || this.currentSrc()) {
        this.techCall_("play");
      } else {
        this.tech_.one("loadstart", function() {
          this.play();
        });
      }
      return this;
    };
    b.prototype.pause = function() {
      this.techCall_("pause");
      return this;
    };
    b.prototype.paused = function() {
      return !1 === this.techGet_("paused") ? !1 : !0;
    };
    b.prototype.scrubbing = function(a) {
      return void 0 !== a ? (this.scrubbing_ = !!a, a ? this.addClass("vjs-scrubbing") : this.removeClass("vjs-scrubbing"), this) : this.scrubbing_;
    };
    b.prototype.currentTime = function(a) {
      if (void 0 !== a) {
        return this.techCall_("setCurrentTime", a), this;
      }
      this.cache_.currentTime = this.techGet_("currentTime") || 0;
      return this.cache_.currentTime;
    };
    b.prototype.duration = function(a) {
      if (void 0 === a) {
        return this.cache_.duration || 0;
      }
      a = parseFloat(a) || 0;
      0 > a && (a = Infinity);
      a !== this.cache_.duration && (this.cache_.duration = a, Infinity === a ? this.addClass("vjs-live") : this.removeClass("vjs-live"), this.trigger("durationchange"));
      return this;
    };
    b.prototype.remainingTime = function() {
      return this.duration() - this.currentTime();
    };
    b.prototype.buffered = function() {
      var a = this.techGet_("buffered");
      a && a.length || (a = la(0, 0));
      return a;
    };
    b.prototype.bufferedPercent = function() {
      return Cc(this.buffered(), this.duration());
    };
    b.prototype.bufferedEnd = function() {
      var a = this.buffered(), b = this.duration(), a = a.end(a.length - 1);
      a > b && (a = b);
      return a;
    };
    b.prototype.volume = function(a) {
      if (void 0 !== a) {
        return a = Math.max(0, Math.min(1, parseFloat(a))), this.cache_.volume = a, this.techCall_("setVolume", a), this;
      }
      a = parseFloat(this.techGet_("volume"));
      return isNaN(a) ? 1 : a;
    };
    b.prototype.muted = function(a) {
      return void 0 !== a ? (this.techCall_("setMuted", a), this) : this.techGet_("muted") || !1;
    };
    b.prototype.supportsFullScreen = function() {
      return this.techGet_("supportsFullScreen") || !1;
    };
    b.prototype.isFullscreen = function(a) {
      return void 0 !== a ? (this.isFullscreen_ = !!a, this) : !!this.isFullscreen_;
    };
    b.prototype.requestFullscreen = function() {
      this.isFullscreen(!0);
      sa.requestFullscreen ? (da(z, sa.fullscreenchange, A(this, function d(a) {
        this.isFullscreen(z[sa.fullscreenElement]);
        !1 === this.isFullscreen() && ka(z, sa.fullscreenchange, d);
        this.trigger("fullscreenchange");
      })), this.el_[sa.requestFullscreen]()) : this.tech_.supportsFullScreen() ? this.techCall_("enterFullScreen") : (this.enterFullWindow(), this.trigger("fullscreenchange"));
      return this;
    };
    b.prototype.exitFullscreen = function() {
      this.isFullscreen(!1);
      if (sa.requestFullscreen) {
        z[sa.exitFullscreen]();
      } else {
        this.tech_.supportsFullScreen() ? this.techCall_("exitFullScreen") : (this.exitFullWindow(), this.trigger("fullscreenchange"));
      }
      return this;
    };
    b.prototype.enterFullWindow = function() {
      this.isFullWindow = !0;
      this.docOrigOverflow = z.documentElement.style.overflow;
      da(z, "keydown", A(this, this.fullWindowOnEscKey));
      z.documentElement.style.overflow = "hidden";
      ma(z.body, "vjs-full-window");
      this.trigger("enterFullWindow");
    };
    b.prototype.fullWindowOnEscKey = function(a) {
      27 === a.keyCode && (!0 === this.isFullscreen() ? this.exitFullscreen() : this.exitFullWindow());
    };
    b.prototype.exitFullWindow = function() {
      this.isFullWindow = !1;
      ka(z, "keydown", this.fullWindowOnEscKey);
      z.documentElement.style.overflow = this.docOrigOverflow;
      oa(z.body, "vjs-full-window");
      this.trigger("exitFullWindow");
    };
    b.prototype.canPlayType = function(a) {
      for (var b, c = 0, g = this.options_.techOrder;c < g.length;c++) {
        b = S(g[c]);
        var e = I.getTech(b);
        e || (e = l.getComponent(b));
        if (!e) {
          E.error('The "' + b + '" tech is undefined. Skipped browser support check for that tech.');
        } else {
          if (e.isSupported() && (b = e.canPlayType(a))) {
            return b;
          }
        }
      }
      return "";
    };
    b.prototype.selectSource = function(a) {
      var b = this, c = this.options_.techOrder.map(S).map(function(a) {
        return [a, I.getTech(a) || l.getComponent(a)];
      }).filter(function(a) {
        var b = a[0];
        if (a = a[1]) {
          return a.isSupported();
        }
        E.error('The "' + b + '" tech is undefined. Skipped browser support check for that tech.');
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
    b.prototype.src = function(a) {
      if (void 0 === a) {
        return this.techGet_("src");
      }
      var b = I.getTech(this.techName_);
      b || (b = l.getComponent(this.techName_));
      Array.isArray(a) ? this.sourceList_(a) : "string" === typeof a ? this.src({src:a}) : a instanceof Object && (a.type && !b.canPlaySource(a, this.options_[this.techName_.toLowerCase()]) ? this.sourceList_([a]) : (this.cache_.sources = null, this.cache_.source = a, this.cache_.src = a.src, this.currentType_ = a.type || "", this.ready(function() {
        b.prototype.hasOwnProperty("setSource") ? this.techCall_("setSource", a) : this.techCall_("src", a.src);
        "auto" === this.options_.preload && this.load();
        this.options_.autoplay && this.play();
      }, !0)));
      return this;
    };
    b.prototype.sourceList_ = function(a) {
      var b = this.selectSource(a);
      b ? (b.tech === this.techName_ ? this.src(b.source) : this.loadTech_(b.tech, b.source), this.cache_.sources = a) : (this.setTimeout(function() {
        this.error({code:4, message:this.localize(this.options_.notSupportedMessage)});
      }, 0), this.triggerReady());
    };
    b.prototype.load = function() {
      this.techCall_("load");
      return this;
    };
    b.prototype.reset = function() {
      this.loadTech_(S(this.options_.techOrder[0]), null);
      this.techCall_("reset");
      return this;
    };
    b.prototype.currentSources = function() {
      var a = this.currentSource(), b = [];
      0 !== Object.keys(a).length && b.push(a);
      return this.cache_.sources || b;
    };
    b.prototype.currentSource = function() {
      var a = {}, b = this.currentSrc();
      b && (a.src = b);
      return this.cache_.source || a;
    };
    b.prototype.currentSrc = function() {
      return this.techGet_("currentSrc") || this.cache_.src || "";
    };
    b.prototype.currentType = function() {
      return this.currentType_ || "";
    };
    b.prototype.preload = function(a) {
      return void 0 !== a ? (this.techCall_("setPreload", a), this.options_.preload = a, this) : this.techGet_("preload");
    };
    b.prototype.autoplay = function(a) {
      return void 0 !== a ? (this.techCall_("setAutoplay", a), this.options_.autoplay = a, this) : this.techGet_("autoplay", a);
    };
    b.prototype.loop = function(a) {
      return void 0 !== a ? (this.techCall_("setLoop", a), this.options_.loop = a, this) : this.techGet_("loop");
    };
    b.prototype.poster = function(a) {
      if (void 0 === a) {
        return this.poster_;
      }
      a || (a = "");
      this.poster_ = a;
      this.techCall_("setPoster", a);
      this.trigger("posterchange");
      return this;
    };
    b.prototype.handleTechPosterChange_ = function() {
      !this.poster_ && this.tech_ && this.tech_.poster && (this.poster_ = this.tech_.poster() || "", this.trigger("posterchange"));
    };
    b.prototype.controls = function(a) {
      return void 0 !== a ? (a = !!a, this.controls_ !== a && (this.controls_ = a, this.usingNativeControls() && this.techCall_("setControls", a), a ? (this.removeClass("vjs-controls-disabled"), this.addClass("vjs-controls-enabled"), this.trigger("controlsenabled"), this.usingNativeControls() || this.addTechControlsListeners_()) : (this.removeClass("vjs-controls-enabled"), this.addClass("vjs-controls-disabled"), this.trigger("controlsdisabled"), this.usingNativeControls() || this.removeTechControlsListeners_())), 
      this) : !!this.controls_;
    };
    b.prototype.usingNativeControls = function(a) {
      return void 0 !== a ? (a = !!a, this.usingNativeControls_ !== a && ((this.usingNativeControls_ = a) ? (this.addClass("vjs-using-native-controls"), this.trigger("usingnativecontrols")) : (this.removeClass("vjs-using-native-controls"), this.trigger("usingcustomcontrols"))), this) : !!this.usingNativeControls_;
    };
    b.prototype.error = function(a) {
      if (void 0 === a) {
        return this.error_ || null;
      }
      if (null === a) {
        return this.error_ = a, this.removeClass("vjs-error"), this.errorDisplay && this.errorDisplay.close(), this;
      }
      this.error_ = new X(a);
      this.addClass("vjs-error");
      E.error("(CODE:" + this.error_.code + " " + X.errorTypes[this.error_.code] + ")", this.error_.message, this.error_);
      this.trigger("error");
      return this;
    };
    b.prototype.reportUserActivity = function(a) {
      this.userActivity_ = !0;
    };
    b.prototype.userActive = function(a) {
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
    b.prototype.listenForUserActivity_ = function() {
      var a, b, f, g = A(this, this.reportUserActivity);
      this.on("mousedown", function() {
        g();
        this.clearInterval(a);
        a = this.setInterval(g, 250);
      });
      this.on("mousemove", function(a) {
        if (a.screenX !== b || a.screenY !== f) {
          b = a.screenX, f = a.screenY, g();
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
    b.prototype.playbackRate = function(a) {
      return void 0 !== a ? (this.techCall_("setPlaybackRate", a), this) : this.tech_ && this.tech_.featuresPlaybackRate ? this.techGet_("playbackRate") : 1;
    };
    b.prototype.isAudio = function(a) {
      return void 0 !== a ? (this.isAudio_ = !!a, this) : !!this.isAudio_;
    };
    b.prototype.videoTracks = function() {
      return this.tech_ ? this.tech_.videoTracks() : this.videoTracks_ = this.videoTracks_ || new Kd;
    };
    b.prototype.audioTracks = function() {
      return this.tech_ ? this.tech_.audioTracks() : this.audioTracks_ = this.audioTracks_ || new Ld;
    };
    b.prototype.textTracks = function() {
      if (this.tech_) {
        return this.tech_.textTracks();
      }
    };
    b.prototype.remoteTextTracks = function() {
      if (this.tech_) {
        return this.tech_.remoteTextTracks();
      }
    };
    b.prototype.remoteTextTrackEls = function() {
      if (this.tech_) {
        return this.tech_.remoteTextTrackEls();
      }
    };
    b.prototype.addTextTrack = function(a, b, f) {
      if (this.tech_) {
        return this.tech_.addTextTrack(a, b, f);
      }
    };
    b.prototype.addRemoteTextTrack = function(a, b) {
      if (this.tech_) {
        return this.tech_.addRemoteTextTrack(a, b);
      }
    };
    b.prototype.removeRemoteTextTrack = function(a) {
      var b = (void 0 === a ? {} : a).track;
      if (this.tech_) {
        return this.tech_.removeRemoteTextTrack(void 0 === b ? a : b);
      }
    };
    b.prototype.videoWidth = function() {
      return this.tech_ && this.tech_.videoWidth && this.tech_.videoWidth() || 0;
    };
    b.prototype.videoHeight = function() {
      return this.tech_ && this.tech_.videoHeight && this.tech_.videoHeight() || 0;
    };
    b.prototype.language = function(a) {
      if (void 0 === a) {
        return this.language_;
      }
      this.language_ = String(a).toLowerCase();
      return this;
    };
    b.prototype.languages = function() {
      return U(b.prototype.options_.languages, this.languages_);
    };
    b.prototype.toJSON = function() {
      var a = U(this.options_), b = a.tracks;
      a.tracks = [];
      for (var f = 0;f < b.length;f++) {
        var g = b[f], g = U(g);
        g.player = void 0;
        a.tracks[f] = g;
      }
      return a;
    };
    b.prototype.createModal = function(a, b) {
      var c = this;
      b = b || {};
      b.content = a || "";
      var d = new Pa(this, b);
      this.addChild(d);
      d.on("dispose", function() {
        c.removeChild(d);
      });
      return d.open();
    };
    b.getTagSettings = function(a) {
      var b = {sources:[], tracks:[]}, c = pa(a), g = c["data-setup"];
      Q(a, "vjs-fluid") && (c.fluid = !0);
      if (null !== g) {
        var e, h = null;
        try {
          e = JSON.parse(g || "{}", void 0);
        } catch (L) {
          h = L;
        }
        e = [h, e];
        g = e[0];
        e = e[1];
        g && E.error(g);
        O(c, e);
      }
      O(b, c);
      if (a.hasChildNodes()) {
        for (a = a.childNodes, c = 0, g = a.length;c < g;c++) {
          e = a[c], h = e.nodeName.toLowerCase(), "source" === h ? b.sources.push(pa(e)) : "track" === h && b.tracks.push(pa(e));
        }
      }
      return b;
    };
    b.prototype.flexNotSupported_ = function() {
      var a = z.createElement("i");
      return !("flexBasis" in a.style || "webkitFlexBasis" in a.style || "mozFlexBasis" in a.style || "msFlexBasis" in a.style || "msFlexOrder" in a.style);
    };
    return b;
  }(l);
  ea.players = {};
  var Ta = q.navigator;
  ea.prototype.options_ = {techOrder:["html5", "flash"], html5:{}, flash:{}, defaultVolume:0, inactivityTimeout:2E3, playbackRates:[], children:"mediaLoader posterImage textTrackDisplay loadingSpinner bigPlayButton controlBar errorDisplay textTrackSettings".split(" "), language:Ta && (Ta.languages && Ta.languages[0] || Ta.userLanguage || Ta.language) || "en", languages:{}, notSupportedMessage:"No compatible source was found for this media."};
  ["ended", "seeking", "seekable", "networkState", "readyState"].forEach(function(a) {
    ea.prototype[a] = function() {
      return this.techGet_(a);
    };
  });
  le.forEach(function(a) {
    ea.prototype["handleTech" + S(a) + "_"] = function() {
      return this.trigger(a);
    };
  });
  l.registerComponent("Player", ea);
  var fg = function(a) {
    function b(c) {
      void 0 === c && (c = {});
      c = U(c, {kind:zf[c.kind] || ""});
      var d = a.call(this, c) || this, f = !1;
      if (Y) {
        for (var e in b.prototype) {
          "constructor" !== e && (d[e] = b.prototype[e]);
        }
      }
      Object.defineProperty(d, "enabled", {get:function() {
        return f;
      }, set:function(a) {
        "boolean" === typeof a && a !== f && (f = a, this.trigger("enabledchange"));
      }});
      c.enabled && (d.enabled = c.enabled);
      d.loaded_ = !0;
      return d;
    }
    __extends(b, a);
    return b;
  }(Ub), gg = function(a) {
    function b(c) {
      void 0 === c && (c = {});
      c = U(c, {kind:yf[c.kind] || ""});
      var d = a.call(this, c) || this, f = !1;
      if (Y) {
        for (var e in b.prototype) {
          "constructor" !== e && (d[e] = b.prototype[e]);
        }
      }
      Object.defineProperty(d, "selected", {get:function() {
        return f;
      }, set:function(a) {
        "boolean" === typeof a && a !== f && (f = a, this.trigger("selectedchange"));
      }});
      c.selected && (d.selected = c.selected);
      return d;
    }
    __extends(b, a);
    return b;
  }(Ub), hg = function(a, b) {
    if ("function" !== typeof b && null !== b) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof b);
    }
    a.prototype = Object.create(b && b.prototype, {constructor:{value:a, enumerable:!1, writable:!0, configurable:!0}});
    b && (a.super_ = b);
  };
  "undefined" === typeof HTMLVideoElement && q.document && q.document.createElement && (z.createElement("video"), z.createElement("audio"), z.createElement("track"));
  t.hooks_ = {};
  t.hooks = function(a, b) {
    t.hooks_[a] = t.hooks_[a] || [];
    b && (t.hooks_[a] = t.hooks_[a].concat(b));
    return t.hooks_[a];
  };
  t.hook = function(a, b) {
    t.hooks(a, b);
  };
  t.removeHook = function(a, b) {
    b = t.hooks(a).indexOf(b);
    if (-1 >= b) {
      return !1;
    }
    t.hooks_[a] = t.hooks_[a].slice();
    t.hooks_[a].splice(b, 1);
    return !0;
  };
  if (!0 !== q.VIDEOJS_NO_DYNAMIC_STYLE) {
    var ob = Ka(".vjs-styles-defaults");
    if (!ob) {
      var ob = Uc("vjs-styles-defaults"), oc = Ka("head");
      oc && oc.insertBefore(ob, oc.firstChild);
      Vc(ob, "\n      .video-js {\n        width: 300px;\n        height: 150px;\n      }\n\n      .vjs-fluid {\n        padding-top: 56.25%\n      }\n    ");
    }
  }
  t && (Tc = t);
  setTimeout(Eb, 1);
  t.VERSION = "5.13.1";
  t.options = ea.prototype.options_;
  t.getPlayers = function() {
    return ea.players;
  };
  t.players = ea.players;
  t.getComponent = l.getComponent;
  t.registerComponent = function(a, b) {
    I.isTech(b) && E.warn("The " + a + " tech was registered as a component. It should instead be registered using videojs.registerTech(name, tech)");
    l.registerComponent.call(l, a, b);
  };
  t.getTech = I.getTech;
  t.registerTech = I.registerTech;
  t.browser = Ie;
  t.TOUCH_ENABLED = Za;
  t.extend = function(a, b) {
    void 0 === b && (b = {});
    var c = function() {
      a.apply(this, arguments);
    }, d = {};
    "object" === typeof b ? ("function" === typeof b.init && (E.warn("Constructor logic via init() is deprecated; please use constructor() instead."), b.constructor = b.init), b.constructor !== Object.prototype.constructor && (c = b.constructor), d = b) : "function" === typeof b && (c = b);
    hg(c, a);
    for (var f in d) {
      d.hasOwnProperty(f) && (c.prototype[f] = d[f]);
    }
    return c;
  };
  t.mergeOptions = U;
  t.bind = A;
  t.plugin = function(a, b) {
    ea.prototype[a] = b;
  };
  t.addLanguage = function(a, b) {
    a = ("" + a).toLowerCase();
    return Ac(t.options.languages, (c = {}, c[a] = b, c))[a];
    var c;
  };
  t.log = E;
  t.createTimeRange = t.createTimeRanges = la;
  t.formatTime = qa;
  t.parseUrl = Ed;
  t.isCrossOrigin = Vb;
  t.EventTarget = Z;
  t.on = da;
  t.one = Ia;
  t.off = ka;
  t.trigger = Va;
  t.xhr = na;
  t.TextTrack = jb;
  t.AudioTrack = fg;
  t.VideoTrack = gg;
  t.isEl = Fa;
  t.isTextNode = W;
  t.createEl = r;
  t.hasClass = Q;
  t.addClass = ma;
  t.removeClass = oa;
  t.toggleClass = C;
  t.setAttributes = p;
  t.getAttributes = pa;
  t.emptyEl = F;
  t.appendContent = M;
  t.insertContent = sc;
  t.computedStyle = za;
  "function" === typeof define && define.amd ? define("videojs", [], function() {
    return t;
  }) : "object" === typeof exports && "object" === typeof module && (module.exports = t);
  return t;
}();
(function(k) {
  var n = k.vttjs = {}, y = n.VTTCue, u = n.VTTRegion, D = k.VTTCue, ga = k.VTTRegion;
  n.shim = function() {
    n.VTTCue = y;
    n.VTTRegion = u;
  };
  n.restore = function() {
    n.VTTCue = D;
    n.VTTRegion = ga;
  };
})(this);
(function(k, n) {
  function y(k) {
    return "string" !== typeof k ? !1 : ia[k.toLowerCase()] ? k.toLowerCase() : !1;
  }
  function u(k) {
    for (var n = 1;n < arguments.length;n++) {
      var u = arguments[n], y;
      for (y in u) {
        k[y] = u[y];
      }
    }
    return k;
  }
  function D(k, n, B) {
    var v = this, D = /MSIE\s8\.0/.test(navigator.userAgent), H = {};
    D ? v = document.createElement("custom") : H.enumerable = !0;
    v.hasBeenReset = !1;
    var J = "", ia = !1, ua = k, ja = n, r = B, e = null, h = "", P = !0, Ha = "auto", m = "start", Q = 50, ma = "middle", oa = 50, C = "middle";
    Object.defineProperty(v, "id", u({}, H, {get:function() {
      return J;
    }, set:function(e) {
      J = "" + e;
    }}));
    Object.defineProperty(v, "pauseOnExit", u({}, H, {get:function() {
      return ia;
    }, set:function(e) {
      ia = !!e;
    }}));
    Object.defineProperty(v, "startTime", u({}, H, {get:function() {
      return ua;
    }, set:function(e) {
      if ("number" !== typeof e) {
        throw new TypeError("Start time must be set to a number.");
      }
      ua = e;
      this.hasBeenReset = !0;
    }}));
    Object.defineProperty(v, "endTime", u({}, H, {get:function() {
      return ja;
    }, set:function(e) {
      if ("number" !== typeof e) {
        throw new TypeError("End time must be set to a number.");
      }
      ja = e;
      this.hasBeenReset = !0;
    }}));
    Object.defineProperty(v, "text", u({}, H, {get:function() {
      return r;
    }, set:function(e) {
      r = "" + e;
      this.hasBeenReset = !0;
    }}));
    Object.defineProperty(v, "region", u({}, H, {get:function() {
      return e;
    }, set:function(h) {
      e = h;
      this.hasBeenReset = !0;
    }}));
    Object.defineProperty(v, "vertical", u({}, H, {get:function() {
      return h;
    }, set:function(e) {
      e = "string" !== typeof e ? !1 : ga[e.toLowerCase()] ? e.toLowerCase() : !1;
      if (!1 === e) {
        throw new SyntaxError("An invalid or illegal string was specified.");
      }
      h = e;
      this.hasBeenReset = !0;
    }}));
    Object.defineProperty(v, "snapToLines", u({}, H, {get:function() {
      return P;
    }, set:function(e) {
      P = !!e;
      this.hasBeenReset = !0;
    }}));
    Object.defineProperty(v, "line", u({}, H, {get:function() {
      return Ha;
    }, set:function(e) {
      if ("number" !== typeof e && "auto" !== e) {
        throw new SyntaxError("An invalid number or illegal string was specified.");
      }
      Ha = e;
      this.hasBeenReset = !0;
    }}));
    Object.defineProperty(v, "lineAlign", u({}, H, {get:function() {
      return m;
    }, set:function(e) {
      e = y(e);
      if (!e) {
        throw new SyntaxError("An invalid or illegal string was specified.");
      }
      m = e;
      this.hasBeenReset = !0;
    }}));
    Object.defineProperty(v, "position", u({}, H, {get:function() {
      return Q;
    }, set:function(e) {
      if (0 > e || 100 < e) {
        throw Error("Position must be between 0 and 100.");
      }
      Q = e;
      this.hasBeenReset = !0;
    }}));
    Object.defineProperty(v, "positionAlign", u({}, H, {get:function() {
      return ma;
    }, set:function(e) {
      e = y(e);
      if (!e) {
        throw new SyntaxError("An invalid or illegal string was specified.");
      }
      ma = e;
      this.hasBeenReset = !0;
    }}));
    Object.defineProperty(v, "size", u({}, H, {get:function() {
      return oa;
    }, set:function(e) {
      if (0 > e || 100 < e) {
        throw Error("Size must be between 0 and 100.");
      }
      oa = e;
      this.hasBeenReset = !0;
    }}));
    Object.defineProperty(v, "align", u({}, H, {get:function() {
      return C;
    }, set:function(e) {
      e = y(e);
      if (!e) {
        throw new SyntaxError("An invalid or illegal string was specified.");
      }
      C = e;
      this.hasBeenReset = !0;
    }}));
    v.displayState = void 0;
    if (D) {
      return v;
    }
  }
  var ga = {"":!0, lr:!0, rl:!0}, ia = {start:!0, middle:!0, end:!0, left:!0, right:!0};
  D.prototype.getCueAsHTML = function() {
    return WebVTT.convertCueToDOMTree(window, this.text);
  };
  k.VTTCue = k.VTTCue || D;
  n.VTTCue = D;
})(this, this.vttjs || {});
(function(k, n) {
  function y(k) {
    return "number" === typeof k && 0 <= k && 100 >= k;
  }
  function u() {
    var k = 100, n = 3, u = 0, J = 100, B = 0, v = 100, V = "";
    Object.defineProperties(this, {width:{enumerable:!0, get:function() {
      return k;
    }, set:function(n) {
      if (!y(n)) {
        throw Error("Width must be between 0 and 100.");
      }
      k = n;
    }}, lines:{enumerable:!0, get:function() {
      return n;
    }, set:function(k) {
      if ("number" !== typeof k) {
        throw new TypeError("Lines must be set to a number.");
      }
      n = k;
    }}, regionAnchorY:{enumerable:!0, get:function() {
      return J;
    }, set:function(k) {
      if (!y(k)) {
        throw Error("RegionAnchorX must be between 0 and 100.");
      }
      J = k;
    }}, regionAnchorX:{enumerable:!0, get:function() {
      return u;
    }, set:function(k) {
      if (!y(k)) {
        throw Error("RegionAnchorY must be between 0 and 100.");
      }
      u = k;
    }}, viewportAnchorY:{enumerable:!0, get:function() {
      return v;
    }, set:function(k) {
      if (!y(k)) {
        throw Error("ViewportAnchorY must be between 0 and 100.");
      }
      v = k;
    }}, viewportAnchorX:{enumerable:!0, get:function() {
      return B;
    }, set:function(k) {
      if (!y(k)) {
        throw Error("ViewportAnchorX must be between 0 and 100.");
      }
      B = k;
    }}, scroll:{enumerable:!0, get:function() {
      return V;
    }, set:function(k) {
      k = "string" !== typeof k ? !1 : D[k.toLowerCase()] ? k.toLowerCase() : !1;
      if (!1 === k) {
        throw new SyntaxError("An invalid or illegal string was specified.");
      }
      V = k;
    }}});
  }
  var D = {"":!0, up:!0};
  k.VTTRegion = k.VTTRegion || u;
  n.VTTRegion = u;
})(this, this.vttjs || {});
(function(k) {
  function n(e, h) {
    this.name = "ParsingError";
    this.code = e.code;
    this.message = h || e.message;
  }
  function y(e) {
    e = e.match(/^(\d+):(\d{2})(:\d{2})?\.(\d{3})/);
    if (!e) {
      return null;
    }
    if (e[3]) {
      var h = e[3].replace(":", "");
      return 3600 * (e[1] | 0) + 60 * (e[2] | 0) + (h | 0) + (e[4] | 0) / 1E3;
    }
    return 59 < e[1] ? 3600 * (e[1] | 0) + 60 * (e[2] | 0) + 0 + (e[4] | 0) / 1E3 : 0 + 60 * (e[1] | 0) + (e[2] | 0) + (e[4] | 0) / 1E3;
  }
  function u() {
    this.values = H(null);
  }
  function D(e, h, k, n) {
    e = n ? e.split(n) : [e];
    for (var m in e) {
      "string" === typeof e[m] && (n = e[m].split(k), 2 === n.length && h(n[0], n[1]));
    }
  }
  function ga(e, h, k) {
    function r() {
      var h = y(e);
      if (null === h) {
        throw new n(n.Errors.BadTimeStamp, "Malformed timestamp: " + v);
      }
      e = e.replace(/^[^\sa-zA-Z-]+/, "");
      return h;
    }
    function m() {
      e = e.replace(/^\s+/, "");
    }
    var v = e;
    m();
    h.startTime = r();
    m();
    if ("--\x3e" !== e.substr(0, 3)) {
      throw new n(n.Errors.BadTimeStamp, "Malformed time stamp (time stamps must be separated by '--\x3e'): " + v);
    }
    e = e.substr(3);
    m();
    h.endTime = r();
    m();
    (function(e, h) {
      var m = new u;
      D(e, function(e, h) {
        switch(e) {
          case "region":
            for (var p = k.length - 1;0 <= p;p--) {
              if (k[p].id === h) {
                m.set(e, k[p].region);
                break;
              }
            }
            break;
          case "vertical":
            m.alt(e, h, ["rl", "lr"]);
            break;
          case "line":
            h = h.split(",");
            p = h[0];
            m.integer(e, p);
            m.percent(e, p) ? m.set("snapToLines", !1) : null;
            m.alt(e, p, ["auto"]);
            2 === h.length && m.alt("lineAlign", h[1], ["start", "middle", "end"]);
            break;
          case "position":
            h = h.split(",");
            m.percent(e, h[0]);
            2 === h.length && m.alt("positionAlign", h[1], ["start", "middle", "end"]);
            break;
          case "size":
            m.percent(e, h);
            break;
          case "align":
            m.alt(e, h, ["start", "middle", "end", "left", "right"]);
        }
      }, /:/, /\s/);
      h.region = m.get("region", null);
      h.vertical = m.get("vertical", "");
      h.line = m.get("line", "auto");
      h.lineAlign = m.get("lineAlign", "start");
      h.snapToLines = m.get("snapToLines", !0);
      h.size = m.get("size", 100);
      h.align = m.get("align", "middle");
      h.position = m.get("position", {start:0, left:0, middle:50, end:100, right:100}, h.align);
      h.positionAlign = m.get("positionAlign", {start:"start", left:"start", middle:"middle", end:"end", right:"end"}, h.align);
    })(e, h);
  }
  function ia(e, h) {
    function k() {
      if (!h) {
        return null;
      }
      var e = h.match(/^([^<]*)(<[^>]+>?)?/), e = e[1] ? e[1] : e[2];
      h = h.substr(e.length);
      return e;
    }
    function n(e) {
      return Ua[e];
    }
    function m(e) {
      for (;N = e.match(/&(amp|lt|gt|lrm|rlm|nbsp);/);) {
        e = e.replace(N[0], n);
      }
      return e;
    }
    function u(h, k) {
      var p = Fa[h];
      if (!p) {
        return null;
      }
      var m = e.document.createElement(p);
      m.localName = p;
      (h = ua[h]) && k && (m[h] = k.trim());
      return m;
    }
    for (var r = e.document.createElement("div"), v = r, C, p = [];null !== (C = k());) {
      if ("<" === C[0]) {
        if ("/" === C[1]) {
          p.length && p[p.length - 1] === C.substr(2).replace(">", "") && (p.pop(), v = v.parentNode);
        } else {
          var B = y(C.substr(1, C.length - 2));
          if (B) {
            C = e.document.createProcessingInstruction("timestamp", B), v.appendChild(C);
          } else {
            var N = C.match(/^<([^.\s/0-9>]+)(\.[^\s\\>]+)?([^>\\]+)?(\\?)>?$/);
            N && (!(C = u(N[1], N[3])) || ja[C.localName] && ja[C.localName] !== v.localName || (N[2] && (C.className = N[2].substr(1).replace(".", " ")), p.push(N[1]), v.appendChild(C), v = C));
          }
        }
      } else {
        v.appendChild(e.document.createTextNode(m(C)));
      }
    }
    return r;
  }
  function pb(e) {
    function h(e, h) {
      for (var k = h.childNodes.length - 1;0 <= k;k--) {
        e.push(h.childNodes[k]);
      }
    }
    function k(e) {
      if (!e || !e.length) {
        return null;
      }
      var m = e.pop(), p = m.textContent || m.innerText;
      if (p) {
        return (m = p.match(/^.*(\n|\r)/)) ? (e.length = 0, m[0]) : p;
      }
      if ("ruby" === m.tagName) {
        return k(e);
      }
      if (m.childNodes) {
        return h(e, m), k(e);
      }
    }
    var n = [], m = "";
    if (!e || !e.childNodes) {
      return "ltr";
    }
    for (h(n, e);m = k(n);) {
      for (var u = 0;u < m.length;u++) {
        e = m.charCodeAt(u);
        for (var v = 0;v < r.length;v++) {
          if (r[v] === e) {
            return "rtl";
          }
        }
      }
    }
    return "ltr";
  }
  function J() {
  }
  function B(e, h, k) {
    var n = /MSIE\s8\.0/.test(navigator.userAgent), m = "rgba(255, 255, 255, 1)", u = "rgba(0, 0, 0, 0.8)";
    n && (m = "rgb(255, 255, 255)", u = "rgb(0, 0, 0)");
    this.cue = h;
    this.cueDiv = ia(e, h.text);
    m = {color:m, backgroundColor:u, position:"relative", left:0, right:0, top:0, bottom:0, display:"inline"};
    n || (m.writingMode = "" === h.vertical ? "horizontal-tb" : "lr" === h.vertical ? "vertical-lr" : "vertical-rl", m.unicodeBidi = "plaintext");
    this.applyStyles(m, this.cueDiv);
    this.div = e.document.createElement("div");
    m = {textAlign:"middle" === h.align ? "center" : h.align, font:k.font, whiteSpace:"pre-line", position:"absolute"};
    n || (m.direction = pb(this.cueDiv), m.writingMode = "" === h.vertical ? "horizontal-tb" : "lr" === h.vertical ? "vertical-lr" : "vertical-rl".stylesunicodeBidi = "plaintext");
    this.applyStyles(m);
    this.div.appendChild(this.cueDiv);
    e = 0;
    switch(h.positionAlign) {
      case "start":
        e = h.position;
        break;
      case "middle":
        e = h.position - h.size / 2;
        break;
      case "end":
        e = h.position - h.size;
    }
    "" === h.vertical ? this.applyStyles({left:this.formatStyle(e, "%"), width:this.formatStyle(h.size, "%")}) : this.applyStyles({top:this.formatStyle(e, "%"), height:this.formatStyle(h.size, "%")});
    this.move = function(e) {
      this.applyStyles({top:this.formatStyle(e.top, "px"), bottom:this.formatStyle(e.bottom, "px"), left:this.formatStyle(e.left, "px"), right:this.formatStyle(e.right, "px"), height:this.formatStyle(e.height, "px"), width:this.formatStyle(e.width, "px")});
    };
  }
  function v(e) {
    var h = /MSIE\s8\.0/.test(navigator.userAgent), k, n, m, u;
    if (e.div) {
      n = e.div.offsetHeight;
      m = e.div.offsetWidth;
      u = e.div.offsetTop;
      var v = (v = e.div.childNodes) && (v = v[0]) && v.getClientRects && v.getClientRects();
      e = e.div.getBoundingClientRect();
      k = v ? Math.max(v[0] && v[0].height || 0, e.height / v.length) : 0;
    }
    this.left = e.left;
    this.right = e.right;
    this.top = e.top || u;
    this.height = e.height || n;
    this.bottom = e.bottom || u + (e.height || n);
    this.width = e.width || m;
    this.lineHeight = void 0 !== k ? k : e.lineHeight;
    h && !this.lineHeight && (this.lineHeight = 13);
  }
  function V() {
  }
  var H = Object.create || function() {
    function e() {
    }
    return function(h) {
      if (1 !== arguments.length) {
        throw Error("Object.create shim only accepts one parameter.");
      }
      e.prototype = h;
      return new e;
    };
  }();
  n.prototype = H(Error.prototype);
  n.prototype.constructor = n;
  n.Errors = {BadSignature:{code:0, message:"Malformed WebVTT signature."}, BadTimeStamp:{code:1, message:"Malformed time stamp."}};
  u.prototype = {set:function(e, h) {
    this.get(e) || "" === h || (this.values[e] = h);
  }, get:function(e, h, k) {
    return k ? this.has(e) ? this.values[e] : h[k] : this.has(e) ? this.values[e] : h;
  }, has:function(e) {
    return e in this.values;
  }, alt:function(e, h, k) {
    for (var n = 0;n < k.length;++n) {
      if (h === k[n]) {
        this.set(e, h);
        break;
      }
    }
  }, integer:function(e, h) {
    /^-?\d+$/.test(h) && this.set(e, parseInt(h, 10));
  }, percent:function(e, h) {
    return h.match(/^([\d]{1,3})(\.[\d]*)?%$/) && (h = parseFloat(h), 0 <= h && 100 >= h) ? (this.set(e, h), !0) : !1;
  }};
  var Ua = {"&amp;":"&", "&lt;":"<", "&gt;":">", "&lrm;":"\u200e", "&rlm;":"\u200f", "&nbsp;":"\u00a0"}, Fa = {c:"span", i:"i", b:"b", u:"u", ruby:"ruby", rt:"rt", v:"span", lang:"span"}, ua = {v:"title", lang:"lang"}, ja = {rt:"ruby"}, r = [1470, 1472, 1475, 1478, 1488, 1489, 1490, 1491, 1492, 1493, 1494, 1495, 1496, 1497, 1498, 1499, 1500, 1501, 1502, 1503, 1504, 1505, 1506, 1507, 1508, 1509, 1510, 1511, 1512, 1513, 1514, 1520, 1521, 1522, 1523, 1524, 1544, 1547, 1549, 1563, 1566, 1567, 1568, 1569, 
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
  J.prototype.applyStyles = function(e, h) {
    h = h || this.div;
    for (var k in e) {
      e.hasOwnProperty(k) && (h.style[k] = e[k]);
    }
  };
  J.prototype.formatStyle = function(e, h) {
    return 0 === e ? 0 : e + h;
  };
  B.prototype = H(J.prototype);
  B.prototype.constructor = B;
  v.prototype.move = function(e, h) {
    h = void 0 !== h ? h : this.lineHeight;
    switch(e) {
      case "+x":
        this.left += h;
        this.right += h;
        break;
      case "-x":
        this.left -= h;
        this.right -= h;
        break;
      case "+y":
        this.top += h;
        this.bottom += h;
        break;
      case "-y":
        this.top -= h, this.bottom -= h;
    }
  };
  v.prototype.overlaps = function(e) {
    return this.left < e.right && this.right > e.left && this.top < e.bottom && this.bottom > e.top;
  };
  v.prototype.overlapsAny = function(e) {
    for (var h = 0;h < e.length;h++) {
      if (this.overlaps(e[h])) {
        return !0;
      }
    }
    return !1;
  };
  v.prototype.within = function(e) {
    return this.top >= e.top && this.bottom <= e.bottom && this.left >= e.left && this.right <= e.right;
  };
  v.prototype.overlapsOppositeAxis = function(e, h) {
    switch(h) {
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
  v.prototype.intersectPercentage = function(e) {
    return Math.max(0, Math.min(this.right, e.right) - Math.max(this.left, e.left)) * Math.max(0, Math.min(this.bottom, e.bottom) - Math.max(this.top, e.top)) / (this.height * this.width);
  };
  v.prototype.toCSSCompatValues = function(e) {
    return {top:this.top - e.top, bottom:e.bottom - this.bottom, left:this.left - e.left, right:e.right - this.right, height:this.height, width:this.width};
  };
  v.getSimpleBoxPosition = function(e) {
    var h = e.div ? e.div.offsetHeight : e.tagName ? e.offsetHeight : 0, k = e.div ? e.div.offsetWidth : e.tagName ? e.offsetWidth : 0, n = e.div ? e.div.offsetTop : e.tagName ? e.offsetTop : 0;
    e = e.div ? e.div.getBoundingClientRect() : e.tagName ? e.getBoundingClientRect() : e;
    return {left:e.left, right:e.right, top:e.top || n, height:e.height || h, bottom:e.bottom || n + (e.height || h), width:e.width || k};
  };
  V.StringDecoder = function() {
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
  V.convertCueToDOMTree = function(e, h) {
    return e && h ? ia(e, h) : null;
  };
  V.processCues = function(e, h, k) {
    if (!e || !h || !k) {
      return null;
    }
    for (;k.firstChild;) {
      k.removeChild(k.firstChild);
    }
    var n = e.document.createElement("div");
    n.style.position = "absolute";
    n.style.left = "0";
    n.style.right = "0";
    n.style.top = "0";
    n.style.bottom = "0";
    n.style.margin = "1.5%";
    k.appendChild(n);
    if (function(e) {
      for (var h = 0;h < e.length;h++) {
        if (e[h].hasBeenReset || !e[h].displayState) {
          return !0;
        }
      }
      return !1;
    }(h)) {
      var m = [], u = v.getSimpleBoxPosition(n), y = {font:Math.round(5 * u.height) / 100 + "px sans-serif"};
      (function() {
        for (var k, C, p = 0;p < h.length;p++) {
          C = h[p];
          k = new B(e, C, y);
          n.appendChild(k.div);
          var r = void 0, N = void 0, D = k, Q = u, H = m, W = new v(D), F = D.cue, R;
          if ("number" === typeof F.line && (F.snapToLines || 0 <= F.line && 100 >= F.line)) {
            R = F.line;
          } else {
            if (F.track && F.track.textTrackList && F.track.textTrackList.mediaElement) {
              R = F.track;
              for (var M = R.textTrackList, P = 0, J = 0;J < M.length && M[J] !== R;J++) {
                "showing" === M[J].mode && P++;
              }
              R = -1 * ++P;
            } else {
              R = -1;
            }
          }
          M = [];
          if (F.snapToLines) {
            switch(F.vertical) {
              case "":
                M = ["+y", "-y"];
                N = "height";
                break;
              case "rl":
                M = ["+x", "-x"];
                N = "width";
                break;
              case "lr":
                M = ["-x", "+x"], N = "width";
            }
            var P = W.lineHeight, J = P * Math.round(R), N = Q[N] + P, V = M[0];
            Math.abs(J) > N && (J = (0 > J ? -1 : 1) * Math.ceil(N / P) * P);
            0 > R && (J += "" === F.vertical ? Q.height : Q.width, M = M.reverse());
            W.move(V, J);
          } else {
            W = W.lineHeight / Q.height * 100;
            switch(F.lineAlign) {
              case "middle":
                R -= W / 2;
                break;
              case "end":
                R -= W;
            }
            switch(F.vertical) {
              case "":
                D.applyStyles({top:D.formatStyle(R, "%")});
                break;
              case "rl":
                D.applyStyles({left:D.formatStyle(R, "%")});
                break;
              case "lr":
                D.applyStyles({right:D.formatStyle(R, "%")});
            }
            M = ["+y", "-x", "+x", "-y"];
            W = new v(D);
          }
          a: {
            F = W;
            W = M;
            N = new v(F);
            R = 1;
            for (M = 0;M < W.length;M++) {
              for (;F.overlapsOppositeAxis(Q, W[M]) || F.within(Q) && F.overlapsAny(H);) {
                F.move(W[M]);
              }
              if (F.within(Q)) {
                r = F;
                break a;
              }
              P = F.intersectPercentage(Q);
              R > P && (r = new v(F), R = P);
              F = new v(N);
            }
            r = r || N;
          }
          D.move(r.toCSSCompatValues(Q));
          C.displayState = k.div;
          m.push(v.getSimpleBoxPosition(k));
        }
      })();
    } else {
      for (k = 0;k < h.length;k++) {
        n.appendChild(h[k].displayState);
      }
    }
  };
  V.Parser = function(e, h, k) {
    k || (k = h, h = {});
    h || (h = {});
    this.window = e;
    this.vttjs = h;
    this.state = "INITIAL";
    this.buffer = "";
    this.decoder = k || new TextDecoder("utf8");
    this.regionList = [];
  };
  V.Parser.prototype = {reportOrThrowError:function(e) {
    if (e instanceof n) {
      this.onparsingerror && this.onparsingerror(e);
    } else {
      throw e;
    }
  }, parse:function(e) {
    function h() {
      for (var e = m.buffer, h = 0;h < e.length && "\r" !== e[h] && "\n" !== e[h];) {
        ++h;
      }
      var k = e.substr(0, h);
      "\r" === e[h] && ++h;
      "\n" === e[h] && ++h;
      m.buffer = e.substr(h);
      return k;
    }
    function k(e) {
      var h = new u;
      D(e, function(e, k) {
        switch(e) {
          case "id":
            h.set(e, k);
            break;
          case "width":
            h.percent(e, k);
            break;
          case "lines":
            h.integer(e, k);
            break;
          case "regionanchor":
          case "viewportanchor":
            k = k.split(",");
            if (2 !== k.length) {
              break;
            }
            var m = new u;
            m.percent("x", k[0]);
            m.percent("y", k[1]);
            if (!m.has("x") || !m.has("y")) {
              break;
            }
            h.set(e + "X", m.get("x"));
            h.set(e + "Y", m.get("y"));
            break;
          case "scroll":
            h.alt(e, k, ["up"]);
        }
      }, /=/, /\s/);
      h.has("id") && (e = new (m.vttjs.VTTRegion || m.window.VTTRegion), e.width = h.get("width", 100), e.lines = h.get("lines", 3), e.regionAnchorX = h.get("regionanchorX", 0), e.regionAnchorY = h.get("regionanchorY", 100), e.viewportAnchorX = h.get("viewportanchorX", 0), e.viewportAnchorY = h.get("viewportanchorY", 100), e.scroll = h.get("scroll", ""), m.onregion && m.onregion(e), m.regionList.push({id:h.get("id"), region:e}));
    }
    function v(e) {
      D(e, function(e, h) {
        switch(e) {
          case "Region":
            k(h);
        }
      }, /:/);
    }
    var m = this;
    e && (m.buffer += m.decoder.decode(e, {stream:!0}));
    try {
      var r;
      if ("INITIAL" === m.state) {
        if (!/\r\n|\n/.test(m.buffer)) {
          return this;
        }
        r = h();
        var y = r.match(/^WEBVTT([ \t].*)?$/);
        if (!y || !y[0]) {
          throw new n(n.Errors.BadSignature);
        }
        m.state = "HEADER";
      }
      for (e = !1;m.buffer;) {
        if (!/\r\n|\n/.test(m.buffer)) {
          return this;
        }
        e ? e = !1 : r = h();
        switch(m.state) {
          case "HEADER":
            /:/.test(r) ? v(r) : r || (m.state = "ID");
            continue;
          case "NOTE":
            r || (m.state = "ID");
            continue;
          case "ID":
            if (/^NOTE($|[ \t])/.test(r)) {
              m.state = "NOTE";
              break;
            }
            if (!r) {
              continue;
            }
            m.cue = new (m.vttjs.VTTCue || m.window.VTTCue)(0, 0, "");
            m.state = "CUE";
            if (-1 === r.indexOf("--\x3e")) {
              m.cue.id = r;
              continue;
            }
          case "CUE":
            try {
              ga(r, m.cue, m.regionList);
            } catch (C) {
              m.reportOrThrowError(C);
              m.cue = null;
              m.state = "BADCUE";
              continue;
            }
            m.state = "CUETEXT";
            continue;
          case "CUETEXT":
            var B = -1 !== r.indexOf("--\x3e");
            if (!r || B && (e = !0)) {
              m.oncue && m.oncue(m.cue);
              m.cue = null;
              m.state = "ID";
              continue;
            }
            m.cue.text && (m.cue.text += "\n");
            m.cue.text += r;
            continue;
          case "BADCUE":
            r || (m.state = "ID");
        }
      }
    } catch (C) {
      m.reportOrThrowError(C);
      if ("CUETEXT" === m.state && m.cue && m.oncue) {
        m.oncue(m.cue);
      }
      m.cue = null;
      m.state = "INITIAL" === m.state ? "BADWEBVTT" : "BADCUE";
    }
    return this;
  }, flush:function() {
    try {
      this.buffer += this.decoder.decode();
      if (this.cue || "HEADER" === this.state) {
        this.buffer += "\n\n", this.parse();
      }
      if ("INITIAL" === this.state) {
        throw new n(n.Errors.BadSignature);
      }
    } catch (e) {
      this.reportOrThrowError(e);
    }
    this.onflush && this.onflush();
    return this;
  }};
  k.WebVTT = V;
})(this, this.vttjs || {});

