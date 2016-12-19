/**
 * @license
 * Video.js 5.12.6 <http://videojs.com/>
 * Copyright Brightcove, Inc. <https://www.brightcove.com/>
 * Available under Apache License Version 2.0
 * <https://github.com/videojs/video.js/blob/master/LICENSE>
 *
 * Includes vtt.js <https://github.com/mozilla/vtt.js>
 * Available under Apache License Version 2.0
 * <https://github.com/mozilla/vtt.js/blob/master/LICENSE>
 */

var $jscomp = {scope:{}};
$jscomp.defineProperty = "function" == typeof Object.defineProperties ? Object.defineProperty : function(f, h, q) {
  if (q.get || q.set) {
    throw new TypeError("ES3 does not support getters and setters.");
  }
  f != Array.prototype && f != Object.prototype && (f[h] = q.value);
};
$jscomp.getGlobal = function(f) {
  return "undefined" != typeof window && window === f ? f : "undefined" != typeof global && null != global ? global : f;
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.SYMBOL_PREFIX = "jscomp_symbol_";
$jscomp.initSymbol = function() {
  $jscomp.initSymbol = function() {
  };
  $jscomp.global.Symbol || ($jscomp.global.Symbol = $jscomp.Symbol);
};
$jscomp.symbolCounter_ = 0;
$jscomp.Symbol = function(f) {
  return $jscomp.SYMBOL_PREFIX + (f || "") + $jscomp.symbolCounter_++;
};
$jscomp.initSymbolIterator = function() {
  $jscomp.initSymbol();
  var f = $jscomp.global.Symbol.iterator;
  f || (f = $jscomp.global.Symbol.iterator = $jscomp.global.Symbol("iterator"));
  "function" != typeof Array.prototype[f] && $jscomp.defineProperty(Array.prototype, f, {configurable:!0, writable:!0, value:function() {
    return $jscomp.arrayIterator(this);
  }});
  $jscomp.initSymbolIterator = function() {
  };
};
$jscomp.arrayIterator = function(f) {
  var h = 0;
  return $jscomp.iteratorPrototype(function() {
    return h < f.length ? {done:!1, value:f[h++]} : {done:!0};
  });
};
$jscomp.iteratorPrototype = function(f) {
  $jscomp.initSymbolIterator();
  f = {next:f};
  f[$jscomp.global.Symbol.iterator] = function() {
    return this;
  };
  return f;
};
$jscomp.array = $jscomp.array || {};
$jscomp.iteratorFromArray = function(f, h) {
  $jscomp.initSymbolIterator();
  f instanceof String && (f += "");
  var q = 0, m = {next:function() {
    if (q < f.length) {
      var G = q++;
      return {value:h(G, f[G]), done:!1};
    }
    m.next = function() {
      return {done:!0, value:void 0};
    };
    return m.next();
  }};
  m[Symbol.iterator] = function() {
    return m;
  };
  return m;
};
$jscomp.polyfill = function(f, h, q, m) {
  if (h) {
    q = $jscomp.global;
    f = f.split(".");
    for (m = 0;m < f.length - 1;m++) {
      var G = f[m];
      G in q || (q[G] = {});
      q = q[G];
    }
    f = f[f.length - 1];
    m = q[f];
    h = h(m);
    h != m && null != h && $jscomp.defineProperty(q, f, {configurable:!0, writable:!0, value:h});
  }
};
$jscomp.polyfill("Array.prototype.values", function(f) {
  return f ? f : function() {
    return $jscomp.iteratorFromArray(this, function(f, q) {
      return q;
    });
  };
}, "es6", "es3");
$jscomp.polyfill("Array.prototype.keys", function(f) {
  return f ? f : function() {
    return $jscomp.iteratorFromArray(this, function(f) {
      return f;
    });
  };
}, "es6-impl", "es3");
$jscomp.polyfill("Object.getOwnPropertySymbols", function(f) {
  return f ? f : function() {
    return [];
  };
}, "es6-impl", "es5");
$jscomp.owns = function(f, h) {
  return Object.prototype.hasOwnProperty.call(f, h);
};
$jscomp.polyfill("Object.assign", function(f) {
  return f ? f : function(f, q) {
    for (var m = 1;m < arguments.length;m++) {
      var h = arguments[m];
      if (h) {
        for (var ga in h) {
          $jscomp.owns(h, ga) && (f[ga] = h[ga]);
        }
      }
    }
    return f;
  };
}, "es6-impl", "es3");
$jscomp.polyfill("Array.prototype.fill", function(f) {
  return f ? f : function(f, q, m) {
    var h = this.length || 0;
    0 > q && (q = Math.max(0, h + q));
    if (null == m || m > h) {
      m = h;
    }
    m = Number(m);
    0 > m && (m = Math.max(0, h + m));
    for (q = Number(q || 0);q < m;q++) {
      this[q] = f;
    }
    return this;
  };
}, "es6-impl", "es3");
(function(f) {
  var h = f.vttjs = {}, q = h.VTTCue, m = h.VTTRegion, G = f.VTTCue, ga = f.VTTRegion;
  h.shim = function() {
    h.VTTCue = q;
    h.VTTRegion = m;
  };
  h.restore = function() {
    h.VTTCue = G;
    h.VTTRegion = ga;
  };
})(this);
(function(f, h) {
  function q(f) {
    return "string" !== typeof f ? !1 : ja[f.toLowerCase()] ? f.toLowerCase() : !1;
  }
  function m(f) {
    for (var h = 1;h < arguments.length;h++) {
      var m = arguments[h], q;
      for (q in m) {
        f[q] = m[q];
      }
    }
    return f;
  }
  function G(f, h, u) {
    var r = this, G = /MSIE\s8\.0/.test(navigator.userAgent), z = {};
    G ? r = document.createElement("custom") : z.enumerable = !0;
    r.hasBeenReset = !1;
    var ja = "", T = !1, va = f, ka = h, A = u, d = null, t = "", L = !0, Fa = "auto", l = "start", M = 50, qa = "middle", Ga = 50, C = "middle";
    Object.defineProperty(r, "id", m({}, z, {get:function() {
      return ja;
    }, set:function(d) {
      ja = "" + d;
    }}));
    Object.defineProperty(r, "pauseOnExit", m({}, z, {get:function() {
      return T;
    }, set:function(d) {
      T = !!d;
    }}));
    Object.defineProperty(r, "startTime", m({}, z, {get:function() {
      return va;
    }, set:function(d) {
      if ("number" !== typeof d) {
        throw new TypeError("Start time must be set to a number.");
      }
      va = d;
      this.hasBeenReset = !0;
    }}));
    Object.defineProperty(r, "endTime", m({}, z, {get:function() {
      return ka;
    }, set:function(d) {
      if ("number" !== typeof d) {
        throw new TypeError("End time must be set to a number.");
      }
      ka = d;
      this.hasBeenReset = !0;
    }}));
    Object.defineProperty(r, "text", m({}, z, {get:function() {
      return A;
    }, set:function(d) {
      A = "" + d;
      this.hasBeenReset = !0;
    }}));
    Object.defineProperty(r, "region", m({}, z, {get:function() {
      return d;
    }, set:function(t) {
      d = t;
      this.hasBeenReset = !0;
    }}));
    Object.defineProperty(r, "vertical", m({}, z, {get:function() {
      return t;
    }, set:function(d) {
      d = "string" !== typeof d ? !1 : ga[d.toLowerCase()] ? d.toLowerCase() : !1;
      if (!1 === d) {
        throw new SyntaxError("An invalid or illegal string was specified.");
      }
      t = d;
      this.hasBeenReset = !0;
    }}));
    Object.defineProperty(r, "snapToLines", m({}, z, {get:function() {
      return L;
    }, set:function(d) {
      L = !!d;
      this.hasBeenReset = !0;
    }}));
    Object.defineProperty(r, "line", m({}, z, {get:function() {
      return Fa;
    }, set:function(d) {
      if ("number" !== typeof d && "auto" !== d) {
        throw new SyntaxError("An invalid number or illegal string was specified.");
      }
      Fa = d;
      this.hasBeenReset = !0;
    }}));
    Object.defineProperty(r, "lineAlign", m({}, z, {get:function() {
      return l;
    }, set:function(d) {
      d = q(d);
      if (!d) {
        throw new SyntaxError("An invalid or illegal string was specified.");
      }
      l = d;
      this.hasBeenReset = !0;
    }}));
    Object.defineProperty(r, "position", m({}, z, {get:function() {
      return M;
    }, set:function(d) {
      if (0 > d || 100 < d) {
        throw Error("Position must be between 0 and 100.");
      }
      M = d;
      this.hasBeenReset = !0;
    }}));
    Object.defineProperty(r, "positionAlign", m({}, z, {get:function() {
      return qa;
    }, set:function(d) {
      d = q(d);
      if (!d) {
        throw new SyntaxError("An invalid or illegal string was specified.");
      }
      qa = d;
      this.hasBeenReset = !0;
    }}));
    Object.defineProperty(r, "size", m({}, z, {get:function() {
      return Ga;
    }, set:function(d) {
      if (0 > d || 100 < d) {
        throw Error("Size must be between 0 and 100.");
      }
      Ga = d;
      this.hasBeenReset = !0;
    }}));
    Object.defineProperty(r, "align", m({}, z, {get:function() {
      return C;
    }, set:function(d) {
      d = q(d);
      if (!d) {
        throw new SyntaxError("An invalid or illegal string was specified.");
      }
      C = d;
      this.hasBeenReset = !0;
    }}));
    r.displayState = void 0;
    if (G) {
      return r;
    }
  }
  var ga = {"":!0, lr:!0, rl:!0}, ja = {start:!0, middle:!0, end:!0, left:!0, right:!0};
  G.prototype.getCueAsHTML = function() {
    return WebVTT.convertCueToDOMTree(window, this.text);
  };
  f.VTTCue = f.VTTCue || G;
  h.VTTCue = G;
})(this, this.vttjs || {});
(function(f, h) {
  function q(f) {
    return "number" === typeof f && 0 <= f && 100 >= f;
  }
  function m() {
    var f = 100, h = 3, m = 0, T = 100, u = 0, r = 100, ba = "";
    Object.defineProperties(this, {width:{enumerable:!0, get:function() {
      return f;
    }, set:function(h) {
      if (!q(h)) {
        throw Error("Width must be between 0 and 100.");
      }
      f = h;
    }}, lines:{enumerable:!0, get:function() {
      return h;
    }, set:function(f) {
      if ("number" !== typeof f) {
        throw new TypeError("Lines must be set to a number.");
      }
      h = f;
    }}, regionAnchorY:{enumerable:!0, get:function() {
      return T;
    }, set:function(f) {
      if (!q(f)) {
        throw Error("RegionAnchorX must be between 0 and 100.");
      }
      T = f;
    }}, regionAnchorX:{enumerable:!0, get:function() {
      return m;
    }, set:function(f) {
      if (!q(f)) {
        throw Error("RegionAnchorY must be between 0 and 100.");
      }
      m = f;
    }}, viewportAnchorY:{enumerable:!0, get:function() {
      return r;
    }, set:function(f) {
      if (!q(f)) {
        throw Error("ViewportAnchorY must be between 0 and 100.");
      }
      r = f;
    }}, viewportAnchorX:{enumerable:!0, get:function() {
      return u;
    }, set:function(f) {
      if (!q(f)) {
        throw Error("ViewportAnchorX must be between 0 and 100.");
      }
      u = f;
    }}, scroll:{enumerable:!0, get:function() {
      return ba;
    }, set:function(f) {
      f = "string" !== typeof f ? !1 : G[f.toLowerCase()] ? f.toLowerCase() : !1;
      if (!1 === f) {
        throw new SyntaxError("An invalid or illegal string was specified.");
      }
      ba = f;
    }}});
  }
  var G = {"":!0, up:!0};
  f.VTTRegion = f.VTTRegion || m;
  h.VTTRegion = m;
})(this, this.vttjs || {});
(function(f) {
  function h(d, f) {
    this.name = "ParsingError";
    this.code = d.code;
    this.message = f || d.message;
  }
  function q(d) {
    d = d.match(/^(\d+):(\d{2})(:\d{2})?\.(\d{3})/);
    if (!d) {
      return null;
    }
    if (d[3]) {
      var f = d[3].replace(":", "");
      return 3600 * (d[1] | 0) + 60 * (d[2] | 0) + (f | 0) + (d[4] | 0) / 1E3;
    }
    return 59 < d[1] ? 3600 * (d[1] | 0) + 60 * (d[2] | 0) + 0 + (d[4] | 0) / 1E3 : 0 + 60 * (d[1] | 0) + (d[2] | 0) + (d[4] | 0) / 1E3;
  }
  function m() {
    this.values = z(null);
  }
  function G(d, f, h, m) {
    d = m ? d.split(m) : [d];
    for (var t in d) {
      "string" === typeof d[t] && (m = d[t].split(h), 2 === m.length && f(m[0], m[1]));
    }
  }
  function ga(d, f, L) {
    function t() {
      var f = q(d);
      if (null === f) {
        throw new h(h.Errors.BadTimeStamp, "Malformed timestamp: " + r);
      }
      d = d.replace(/^[^\sa-zA-Z-]+/, "");
      return f;
    }
    function l() {
      d = d.replace(/^\s+/, "");
    }
    var r = d;
    l();
    f.startTime = t();
    l();
    if ("--\x3e" !== d.substr(0, 3)) {
      throw new h(h.Errors.BadTimeStamp, "Malformed time stamp (time stamps must be separated by '--\x3e'): " + r);
    }
    d = d.substr(3);
    l();
    f.endTime = t();
    l();
    (function(d, f) {
      var t = new m;
      G(d, function(d, f) {
        switch(d) {
          case "region":
            for (var l = L.length - 1;0 <= l;l--) {
              if (L[l].id === f) {
                t.set(d, L[l].region);
                break;
              }
            }
            break;
          case "vertical":
            t.alt(d, f, ["rl", "lr"]);
            break;
          case "line":
            f = f.split(",");
            l = f[0];
            t.integer(d, l);
            t.percent(d, l) ? t.set("snapToLines", !1) : null;
            t.alt(d, l, ["auto"]);
            2 === f.length && t.alt("lineAlign", f[1], ["start", "middle", "end"]);
            break;
          case "position":
            f = f.split(",");
            t.percent(d, f[0]);
            2 === f.length && t.alt("positionAlign", f[1], ["start", "middle", "end"]);
            break;
          case "size":
            t.percent(d, f);
            break;
          case "align":
            t.alt(d, f, ["start", "middle", "end", "left", "right"]);
        }
      }, /:/, /\s/);
      f.region = t.get("region", null);
      f.vertical = t.get("vertical", "");
      f.line = t.get("line", "auto");
      f.lineAlign = t.get("lineAlign", "start");
      f.snapToLines = t.get("snapToLines", !0);
      f.size = t.get("size", 100);
      f.align = t.get("align", "middle");
      f.position = t.get("position", {start:0, left:0, middle:50, end:100, right:100}, f.align);
      f.positionAlign = t.get("positionAlign", {start:"start", left:"start", middle:"middle", end:"end", right:"end"}, f.align);
    })(d, f);
  }
  function ja(d, f) {
    function t() {
      if (!f) {
        return null;
      }
      var d = f.match(/^([^<]*)(<[^>]+>?)?/), d = d[1] ? d[1] : d[2];
      f = f.substr(d.length);
      return d;
    }
    function h(d) {
      return Ta[d];
    }
    function l(d) {
      for (;K = d.match(/&(amp|lt|gt|lrm|rlm|nbsp);/);) {
        d = d.replace(K[0], h);
      }
      return d;
    }
    function m(f, t) {
      var l = Ea[f];
      if (!l) {
        return null;
      }
      var h = d.document.createElement(l);
      h.localName = l;
      (f = va[f]) && t && (h[f] = t.trim());
      return h;
    }
    for (var r = d.document.createElement("div"), u = r, C, Q = [];null !== (C = t());) {
      if ("<" === C[0]) {
        if ("/" === C[1]) {
          Q.length && Q[Q.length - 1] === C.substr(2).replace(">", "") && (Q.pop(), u = u.parentNode);
        } else {
          var A = q(C.substr(1, C.length - 2));
          if (A) {
            C = d.document.createProcessingInstruction("timestamp", A), u.appendChild(C);
          } else {
            var K = C.match(/^<([^.\s/0-9>]+)(\.[^\s\\>]+)?([^>\\]+)?(\\?)>?$/);
            K && (!(C = m(K[1], K[3])) || ka[C.localName] && ka[C.localName] !== u.localName || (K[2] && (C.className = K[2].substr(1).replace(".", " ")), Q.push(K[1]), u.appendChild(C), u = C));
          }
        }
      } else {
        u.appendChild(d.document.createTextNode(l(C)));
      }
    }
    return r;
  }
  function pb(d) {
    function f(d, f) {
      for (var t = f.childNodes.length - 1;0 <= t;t--) {
        d.push(f.childNodes[t]);
      }
    }
    function h(d) {
      if (!d || !d.length) {
        return null;
      }
      var t = d.pop(), l = t.textContent || t.innerText;
      if (l) {
        return (t = l.match(/^.*(\n|\r)/)) ? (d.length = 0, t[0]) : l;
      }
      if ("ruby" === t.tagName) {
        return h(d);
      }
      if (t.childNodes) {
        return f(d, t), h(d);
      }
    }
    var m = [], l = "";
    if (!d || !d.childNodes) {
      return "ltr";
    }
    for (f(m, d);l = h(m);) {
      for (var q = 0;q < l.length;q++) {
        d = l.charCodeAt(q);
        for (var r = 0;r < A.length;r++) {
          if (A[r] === d) {
            return "rtl";
          }
        }
      }
    }
    return "ltr";
  }
  function T() {
  }
  function u(d, f, h) {
    var t = /MSIE\s8\.0/.test(navigator.userAgent), l = "rgba(255, 255, 255, 1)", m = "rgba(0, 0, 0, 0.8)";
    t && (l = "rgb(255, 255, 255)", m = "rgb(0, 0, 0)");
    this.cue = f;
    this.cueDiv = ja(d, f.text);
    l = {color:l, backgroundColor:m, position:"relative", left:0, right:0, top:0, bottom:0, display:"inline"};
    t || (l.writingMode = "" === f.vertical ? "horizontal-tb" : "lr" === f.vertical ? "vertical-lr" : "vertical-rl", l.unicodeBidi = "plaintext");
    this.applyStyles(l, this.cueDiv);
    this.div = d.document.createElement("div");
    l = {textAlign:"middle" === f.align ? "center" : f.align, font:h.font, whiteSpace:"pre-line", position:"absolute"};
    t || (l.direction = pb(this.cueDiv), l.writingMode = "" === f.vertical ? "horizontal-tb" : "lr" === f.vertical ? "vertical-lr" : "vertical-rl".stylesunicodeBidi = "plaintext");
    this.applyStyles(l);
    this.div.appendChild(this.cueDiv);
    d = 0;
    switch(f.positionAlign) {
      case "start":
        d = f.position;
        break;
      case "middle":
        d = f.position - f.size / 2;
        break;
      case "end":
        d = f.position - f.size;
    }
    "" === f.vertical ? this.applyStyles({left:this.formatStyle(d, "%"), width:this.formatStyle(f.size, "%")}) : this.applyStyles({top:this.formatStyle(d, "%"), height:this.formatStyle(f.size, "%")});
    this.move = function(d) {
      this.applyStyles({top:this.formatStyle(d.top, "px"), bottom:this.formatStyle(d.bottom, "px"), left:this.formatStyle(d.left, "px"), right:this.formatStyle(d.right, "px"), height:this.formatStyle(d.height, "px"), width:this.formatStyle(d.width, "px")});
    };
  }
  function r(d) {
    var f = /MSIE\s8\.0/.test(navigator.userAgent), h, m, l, q;
    if (d.div) {
      m = d.div.offsetHeight;
      l = d.div.offsetWidth;
      q = d.div.offsetTop;
      var r = (r = d.div.childNodes) && (r = r[0]) && r.getClientRects && r.getClientRects();
      d = d.div.getBoundingClientRect();
      h = r ? Math.max(r[0] && r[0].height || 0, d.height / r.length) : 0;
    }
    this.left = d.left;
    this.right = d.right;
    this.top = d.top || q;
    this.height = d.height || m;
    this.bottom = d.bottom || q + (d.height || m);
    this.width = d.width || l;
    this.lineHeight = void 0 !== h ? h : d.lineHeight;
    f && !this.lineHeight && (this.lineHeight = 13);
  }
  function ba() {
  }
  var z = Object.create || function() {
    function d() {
    }
    return function(f) {
      if (1 !== arguments.length) {
        throw Error("Object.create shim only accepts one parameter.");
      }
      d.prototype = f;
      return new d;
    };
  }();
  h.prototype = z(Error.prototype);
  h.prototype.constructor = h;
  h.Errors = {BadSignature:{code:0, message:"Malformed WebVTT signature."}, BadTimeStamp:{code:1, message:"Malformed time stamp."}};
  m.prototype = {set:function(d, f) {
    this.get(d) || "" === f || (this.values[d] = f);
  }, get:function(d, f, h) {
    return h ? this.has(d) ? this.values[d] : f[h] : this.has(d) ? this.values[d] : f;
  }, has:function(d) {
    return d in this.values;
  }, alt:function(d, f, h) {
    for (var t = 0;t < h.length;++t) {
      if (f === h[t]) {
        this.set(d, f);
        break;
      }
    }
  }, integer:function(d, f) {
    /^-?\d+$/.test(f) && this.set(d, parseInt(f, 10));
  }, percent:function(d, f) {
    return f.match(/^([\d]{1,3})(\.[\d]*)?%$/) && (f = parseFloat(f), 0 <= f && 100 >= f) ? (this.set(d, f), !0) : !1;
  }};
  var Ta = {"&amp;":"&", "&lt;":"<", "&gt;":">", "&lrm;":"\u200e", "&rlm;":"\u200f", "&nbsp;":"\u00a0"}, Ea = {c:"span", i:"i", b:"b", u:"u", ruby:"ruby", rt:"rt", v:"span", lang:"span"}, va = {v:"title", lang:"lang"}, ka = {rt:"ruby"}, A = [1470, 1472, 1475, 1478, 1488, 1489, 1490, 1491, 1492, 1493, 1494, 1495, 1496, 1497, 1498, 1499, 1500, 1501, 1502, 1503, 1504, 1505, 1506, 1507, 1508, 1509, 1510, 1511, 1512, 1513, 1514, 1520, 1521, 1522, 1523, 1524, 1544, 1547, 1549, 1563, 1566, 1567, 1568, 1569, 
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
  T.prototype.applyStyles = function(d, f) {
    f = f || this.div;
    for (var t in d) {
      d.hasOwnProperty(t) && (f.style[t] = d[t]);
    }
  };
  T.prototype.formatStyle = function(d, f) {
    return 0 === d ? 0 : d + f;
  };
  u.prototype = z(T.prototype);
  u.prototype.constructor = u;
  r.prototype.move = function(d, f) {
    f = void 0 !== f ? f : this.lineHeight;
    switch(d) {
      case "+x":
        this.left += f;
        this.right += f;
        break;
      case "-x":
        this.left -= f;
        this.right -= f;
        break;
      case "+y":
        this.top += f;
        this.bottom += f;
        break;
      case "-y":
        this.top -= f, this.bottom -= f;
    }
  };
  r.prototype.overlaps = function(d) {
    return this.left < d.right && this.right > d.left && this.top < d.bottom && this.bottom > d.top;
  };
  r.prototype.overlapsAny = function(d) {
    for (var f = 0;f < d.length;f++) {
      if (this.overlaps(d[f])) {
        return !0;
      }
    }
    return !1;
  };
  r.prototype.within = function(d) {
    return this.top >= d.top && this.bottom <= d.bottom && this.left >= d.left && this.right <= d.right;
  };
  r.prototype.overlapsOppositeAxis = function(d, f) {
    switch(f) {
      case "+x":
        return this.left < d.left;
      case "-x":
        return this.right > d.right;
      case "+y":
        return this.top < d.top;
      case "-y":
        return this.bottom > d.bottom;
    }
  };
  r.prototype.intersectPercentage = function(d) {
    return Math.max(0, Math.min(this.right, d.right) - Math.max(this.left, d.left)) * Math.max(0, Math.min(this.bottom, d.bottom) - Math.max(this.top, d.top)) / (this.height * this.width);
  };
  r.prototype.toCSSCompatValues = function(d) {
    return {top:this.top - d.top, bottom:d.bottom - this.bottom, left:this.left - d.left, right:d.right - this.right, height:this.height, width:this.width};
  };
  r.getSimpleBoxPosition = function(d) {
    var f = d.div ? d.div.offsetHeight : d.tagName ? d.offsetHeight : 0, h = d.div ? d.div.offsetWidth : d.tagName ? d.offsetWidth : 0, m = d.div ? d.div.offsetTop : d.tagName ? d.offsetTop : 0;
    d = d.div ? d.div.getBoundingClientRect() : d.tagName ? d.getBoundingClientRect() : d;
    return {left:d.left, right:d.right, top:d.top || m, height:d.height || f, bottom:d.bottom || m + (d.height || f), width:d.width || h};
  };
  ba.StringDecoder = function() {
    return {decode:function(d) {
      if (!d) {
        return "";
      }
      if ("string" !== typeof d) {
        throw Error("Error - expected string data.");
      }
      return decodeURIComponent(encodeURIComponent(d));
    }};
  };
  ba.convertCueToDOMTree = function(d, f) {
    return d && f ? ja(d, f) : null;
  };
  ba.processCues = function(d, f, h) {
    if (!d || !f || !h) {
      return null;
    }
    for (;h.firstChild;) {
      h.removeChild(h.firstChild);
    }
    var m = d.document.createElement("div");
    m.style.position = "absolute";
    m.style.left = "0";
    m.style.right = "0";
    m.style.top = "0";
    m.style.bottom = "0";
    m.style.margin = "1.5%";
    h.appendChild(m);
    if (function(d) {
      for (var f = 0;f < d.length;f++) {
        if (d[f].hasBeenReset || !d[f].displayState) {
          return !0;
        }
      }
      return !1;
    }(f)) {
      var l = [], t = r.getSimpleBoxPosition(m), q = {font:Math.round(5 * t.height) / 100 + "px sans-serif"};
      (function() {
        for (var h, C, Q = 0;Q < f.length;Q++) {
          C = f[Q];
          h = new u(d, C, q);
          m.appendChild(h.div);
          var A = void 0, K = void 0, M = h, z = t, G = l, S = new r(M), D = M.cue, P;
          if ("number" === typeof D.line && (D.snapToLines || 0 <= D.line && 100 >= D.line)) {
            P = D.line;
          } else {
            if (D.track && D.track.textTrackList && D.track.textTrackList.mediaElement) {
              P = D.track;
              for (var N = P.textTrackList, L = 0, Z = 0;Z < N.length && N[Z] !== P;Z++) {
                "showing" === N[Z].mode && L++;
              }
              P = -1 * ++L;
            } else {
              P = -1;
            }
          }
          N = [];
          if (D.snapToLines) {
            switch(D.vertical) {
              case "":
                N = ["+y", "-y"];
                K = "height";
                break;
              case "rl":
                N = ["+x", "-x"];
                K = "width";
                break;
              case "lr":
                N = ["-x", "+x"], K = "width";
            }
            var L = S.lineHeight, Z = L * Math.round(P), K = z[K] + L, T = N[0];
            Math.abs(Z) > K && (Z = (0 > Z ? -1 : 1) * Math.ceil(K / L) * L);
            0 > P && (Z += "" === D.vertical ? z.height : z.width, N = N.reverse());
            S.move(T, Z);
          } else {
            S = S.lineHeight / z.height * 100;
            switch(D.lineAlign) {
              case "middle":
                P -= S / 2;
                break;
              case "end":
                P -= S;
            }
            switch(D.vertical) {
              case "":
                M.applyStyles({top:M.formatStyle(P, "%")});
                break;
              case "rl":
                M.applyStyles({left:M.formatStyle(P, "%")});
                break;
              case "lr":
                M.applyStyles({right:M.formatStyle(P, "%")});
            }
            N = ["+y", "-x", "+x", "-y"];
            S = new r(M);
          }
          a: {
            D = S;
            S = N;
            K = new r(D);
            P = 1;
            for (N = 0;N < S.length;N++) {
              for (;D.overlapsOppositeAxis(z, S[N]) || D.within(z) && D.overlapsAny(G);) {
                D.move(S[N]);
              }
              if (D.within(z)) {
                A = D;
                break a;
              }
              L = D.intersectPercentage(z);
              P > L && (A = new r(D), P = L);
              D = new r(K);
            }
            A = A || K;
          }
          M.move(A.toCSSCompatValues(z));
          C.displayState = h.div;
          l.push(r.getSimpleBoxPosition(h));
        }
      })();
    } else {
      for (h = 0;h < f.length;h++) {
        m.appendChild(f[h].displayState);
      }
    }
  };
  ba.Parser = function(d, f, h) {
    h || (h = f, f = {});
    f || (f = {});
    this.window = d;
    this.vttjs = f;
    this.state = "INITIAL";
    this.buffer = "";
    this.decoder = h || new TextDecoder("utf8");
    this.regionList = [];
  };
  ba.Parser.prototype = {reportOrThrowError:function(d) {
    if (d instanceof h) {
      this.onparsingerror && this.onparsingerror(d);
    } else {
      throw d;
    }
  }, parse:function(d) {
    function f() {
      for (var d = l.buffer, f = 0;f < d.length && "\r" !== d[f] && "\n" !== d[f];) {
        ++f;
      }
      var h = d.substr(0, f);
      "\r" === d[f] && ++f;
      "\n" === d[f] && ++f;
      l.buffer = d.substr(f);
      return h;
    }
    function r(d) {
      var f = new m;
      G(d, function(d, h) {
        switch(d) {
          case "id":
            f.set(d, h);
            break;
          case "width":
            f.percent(d, h);
            break;
          case "lines":
            f.integer(d, h);
            break;
          case "regionanchor":
          case "viewportanchor":
            h = h.split(",");
            if (2 !== h.length) {
              break;
            }
            var l = new m;
            l.percent("x", h[0]);
            l.percent("y", h[1]);
            if (!l.has("x") || !l.has("y")) {
              break;
            }
            f.set(d + "X", l.get("x"));
            f.set(d + "Y", l.get("y"));
            break;
          case "scroll":
            f.alt(d, h, ["up"]);
        }
      }, /=/, /\s/);
      f.has("id") && (d = new (l.vttjs.VTTRegion || l.window.VTTRegion), d.width = f.get("width", 100), d.lines = f.get("lines", 3), d.regionAnchorX = f.get("regionanchorX", 0), d.regionAnchorY = f.get("regionanchorY", 100), d.viewportAnchorX = f.get("viewportanchorX", 0), d.viewportAnchorY = f.get("viewportanchorY", 100), d.scroll = f.get("scroll", ""), l.onregion && l.onregion(d), l.regionList.push({id:f.get("id"), region:d}));
    }
    function q(d) {
      G(d, function(d, f) {
        switch(d) {
          case "Region":
            r(f);
        }
      }, /:/);
    }
    var l = this;
    d && (l.buffer += l.decoder.decode(d, {stream:!0}));
    try {
      var u;
      if ("INITIAL" === l.state) {
        if (!/\r\n|\n/.test(l.buffer)) {
          return this;
        }
        u = f();
        var z = u.match(/^WEBVTT([ \t].*)?$/);
        if (!z || !z[0]) {
          throw new h(h.Errors.BadSignature);
        }
        l.state = "HEADER";
      }
      for (d = !1;l.buffer;) {
        if (!/\r\n|\n/.test(l.buffer)) {
          return this;
        }
        d ? d = !1 : u = f();
        switch(l.state) {
          case "HEADER":
            /:/.test(u) ? q(u) : u || (l.state = "ID");
            continue;
          case "NOTE":
            u || (l.state = "ID");
            continue;
          case "ID":
            if (/^NOTE($|[ \t])/.test(u)) {
              l.state = "NOTE";
              break;
            }
            if (!u) {
              continue;
            }
            l.cue = new (l.vttjs.VTTCue || l.window.VTTCue)(0, 0, "");
            l.state = "CUE";
            if (-1 === u.indexOf("--\x3e")) {
              l.cue.id = u;
              continue;
            }
          case "CUE":
            try {
              ga(u, l.cue, l.regionList);
            } catch (C) {
              l.reportOrThrowError(C);
              l.cue = null;
              l.state = "BADCUE";
              continue;
            }
            l.state = "CUETEXT";
            continue;
          case "CUETEXT":
            var A = -1 !== u.indexOf("--\x3e");
            if (!u || A && (d = !0)) {
              l.oncue && l.oncue(l.cue);
              l.cue = null;
              l.state = "ID";
              continue;
            }
            l.cue.text && (l.cue.text += "\n");
            l.cue.text += u;
            continue;
          case "BADCUE":
            u || (l.state = "ID");
        }
      }
    } catch (C) {
      l.reportOrThrowError(C);
      if ("CUETEXT" === l.state && l.cue && l.oncue) {
        l.oncue(l.cue);
      }
      l.cue = null;
      l.state = "INITIAL" === l.state ? "BADWEBVTT" : "BADCUE";
    }
    return this;
  }, flush:function() {
    try {
      this.buffer += this.decoder.decode();
      if (this.cue || "HEADER" === this.state) {
        this.buffer += "\n\n", this.parse();
      }
      if ("INITIAL" === this.state) {
        throw new h(h.Errors.BadSignature);
      }
    } catch (d) {
      this.reportOrThrowError(d);
    }
    this.onflush && this.onflush();
    return this;
  }};
  f.WebVTT = ba;
})(this, this.vttjs || {});
var __extends = this && this.__extends || function(f, h) {
  function q() {
    this.constructor = f;
  }
  for (var m in h) {
    h.hasOwnProperty(m) && (f[m] = h[m]);
  }
  f.prototype = null === h ? Object.create(h) : (q.prototype = h.prototype, new q);
}, videojs = function() {
  function f(a, c) {
    return c = {exports:{}}, a(c, c.exports), c.exports;
  }
  function h(a, c) {
    if (!(this instanceof h)) {
      return new h(a, c);
    }
    this.nodeValue = this.data = a;
    this.length = a.length;
    this.ownerDocument = c || null;
  }
  function q(a, c) {
    if (!(this instanceof q)) {
      return new q(a);
    }
    this.data = a || "";
    this.length = this.data.length;
    this.ownerDocument = c || null;
  }
  function m(a) {
    switch(a.nodeType) {
      case 3:
        return T(a.data);
      case 8:
        return "\x3c!--" + a.data + "--\x3e";
      default:
        var c = [], b = a.tagName;
        "http://www.w3.org/1999/xhtml" === a.namespaceURI && (b = b.toLowerCase());
        c.push("<" + b + pb(a) + ga(a));
        -1 < $d.indexOf(b) ? c.push(" />") : (c.push(">"), a.childNodes.length ? c.push.apply(c, a.childNodes.map(m)) : a.textContent || a.innerText ? c.push(T(a.textContent || a.innerText)) : a.innerHTML && c.push(a.innerHTML), c.push("</" + b + ">"));
        return c.join("");
    }
  }
  function G(a) {
    if ("string" === typeof a) {
      return a;
    }
    var c = "";
    Object.keys(a).forEach(function(b) {
      var e = a[b];
      b = b.replace(/[A-Z]/g, function(b) {
        return "-" + b.toLowerCase();
      });
      c += b + ":" + e + ";";
    });
    return c;
  }
  function ga(a) {
    a = a.dataset;
    var c = [], b;
    for (b in a) {
      c.push({name:"data-" + b, value:a[b]});
    }
    return c.length ? ja(c) : "";
  }
  function ja(a) {
    var c = [];
    a.forEach(function(b) {
      var a = b.name;
      b = b.value;
      "style" === a && (b = G(b));
      c.push(a + '="' + T(b).replace(/"/g, "&quot;") + '"');
    });
    return c.length ? " " + c.join(" ") : "";
  }
  function pb(a) {
    var c = [], b;
    for (b in a) {
      var e;
      e = a;
      var g = b, k = typeof e[g];
      e = "style" === g && 0 < Object.keys(e.style).length ? !0 : e.hasOwnProperty(g) && ("string" === k || "boolean" === k || "number" === k) && "nodeName" !== g && "className" !== g && "tagName" !== g && "textContent" !== g && "innerText" !== g && "namespaceURI" !== g && "innerHTML" !== g;
      e && c.push({name:b, value:a[b]});
    }
    for (var d in a._attributes) {
      for (var f in a._attributes[d]) {
        b = a._attributes[d][f], c.push({name:(b.prefix ? b.prefix + ":" : "") + f, value:b.value});
      }
    }
    a.className && c.push({name:"class", value:a.className});
    return c.length ? ja(c) : "";
  }
  function T(a) {
    var c = "";
    "string" === typeof a ? c = a : a && (c = a.toString());
    return c.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
  function u(a, c, b) {
    if (!(this instanceof u)) {
      return new u(a);
    }
    b = void 0 === b ? "http://www.w3.org/1999/xhtml" : b || null;
    this.nodeName = this.tagName = "http://www.w3.org/1999/xhtml" === b ? String(a).toUpperCase() : a;
    this.className = "";
    this.dataset = {};
    this.childNodes = [];
    this.parentNode = null;
    this.style = {};
    this.ownerDocument = c || null;
    this.namespaceURI = b;
    this._attributes = {};
    "INPUT" === this.tagName && (this.type = "text");
  }
  function r(a) {
    if (!(this instanceof r)) {
      return new r;
    }
    this.childNodes = [];
    this.parentNode = null;
    this.ownerDocument = a || null;
  }
  function ba(a) {
  }
  function z() {
    if (!(this instanceof z)) {
      return new z;
    }
    this.head = this.createElement("head");
    this.body = this.createElement("body");
    this.documentElement = this.createElement("html");
    this.documentElement.appendChild(this.head);
    this.documentElement.appendChild(this.body);
    this.childNodes = [this.documentElement];
    this.nodeType = 9;
  }
  function Ta(a) {
    if (/\s/.test(a)) {
      throw Error("class has illegal whitespace characters");
    }
  }
  function Ea(a) {
    return !!a && "object" === typeof a && 1 === a.nodeType;
  }
  function va(a) {
    return function(c, b) {
      if ("string" !== typeof c || !/\S/.test(c)) {
        return x[a](null);
      }
      "string" === typeof b && /\S/.test(b) && (b = x.querySelector(b));
      b = Ea(b) ? b : x;
      return b[a] && b[a](c);
    };
  }
  function ka(a) {
    0 === a.indexOf("#") && (a = a.slice(1));
    return x.getElementById(a);
  }
  function A(a, c, b) {
    void 0 === a && (a = "div");
    void 0 === c && (c = {});
    void 0 === b && (b = {});
    var e = x.createElement(a);
    Object.getOwnPropertyNames(c).forEach(function(b) {
      var a = c[b];
      -1 !== b.indexOf("aria-") || "role" === b || "type" === b ? (B.warn((g = ["Setting attributes in the second argument of createEl()\n                has been deprecated. Use the third argument instead.\n                createEl(type, properties, attributes). Attempting to set ", " to ", "."], g.raw = ["Setting attributes in the second argument of createEl()\n                has been deprecated. Use the third argument instead.\n                createEl(type, properties, attributes). Attempting to set ", 
      " to ", "."], nc(g, b, a))), e.setAttribute(b, a)) : e[b] = a;
      var g;
    });
    Object.getOwnPropertyNames(b).forEach(function(a) {
      e.setAttribute(a, b[a]);
    });
    return e;
  }
  function d(a, c) {
    c.firstChild ? c.insertBefore(a, c.firstChild) : c.appendChild(a);
  }
  function t(a) {
    var c = a[wa];
    c || (c = a[wa] = xa++);
    Ha[c] || (Ha[c] = {});
    return Ha[c];
  }
  function L(a) {
    return (a = a[wa]) ? !!Object.getOwnPropertyNames(Ha[a]).length : !1;
  }
  function Fa(a) {
    var c = a[wa];
    if (c) {
      delete Ha[c];
      try {
        delete a[wa];
      } catch (b) {
        a.removeAttribute ? a.removeAttribute(wa) : a[wa] = null;
      }
    }
  }
  function l(a, c) {
    Ta(c);
    return a.classList ? a.classList.contains(c) : (new RegExp("(^|\\s)" + c + "($|\\s)")).test(a.className);
  }
  function M(a, c) {
    a.classList ? a.classList.add(c) : l(a, c) || (a.className = (a.className + " " + c).trim());
    return a;
  }
  function qa(a, c) {
    a.classList ? a.classList.remove(c) : (Ta(c), a.className = a.className.split(/\s+/).filter(function(b) {
      return b !== c;
    }).join(" "));
    return a;
  }
  function Ga(a, c, b) {
    var e = l(a, c);
    "function" === typeof b && (b = b(a, c));
    "boolean" !== typeof b && (b = !e);
    if (b !== e) {
      return b ? M(a, c) : qa(a, c), a;
    }
  }
  function C(a, c) {
    Object.getOwnPropertyNames(c).forEach(function(b) {
      var e = c[b];
      null === e || "undefined" === typeof e || !1 === e ? a.removeAttribute(b) : a.setAttribute(b, !0 === e ? "" : e);
    });
  }
  function Q(a) {
    var c = {};
    if (a && a.attributes && 0 < a.attributes.length) {
      for (var b = a.attributes, e = b.length - 1;0 <= e;e--) {
        var g = b[e].name, k = b[e].value;
        if ("boolean" === typeof a[g] || -1 !== ",autoplay,controls,loop,muted,default,".indexOf("," + g + ",")) {
          k = null !== k ? !0 : !1;
        }
        c[g] = k;
      }
    }
    return c;
  }
  function Zd() {
    x.body.focus();
    x.onselectstart = function() {
      return !1;
    };
  }
  function K() {
    x.onselectstart = function() {
      return !0;
    };
  }
  function jc(a) {
    var c;
    a.getBoundingClientRect && a.parentNode && (c = a.getBoundingClientRect());
    if (!c) {
      return {left:0, top:0};
    }
    a = x.documentElement;
    var b = x.body;
    return {left:Math.round(c.left + (p.pageXOffset || b.scrollLeft) - (a.clientLeft || b.clientLeft || 0)), top:Math.round(c.top + (p.pageYOffset || b.scrollTop) - (a.clientTop || b.clientTop || 0))};
  }
  function kc(a, c) {
    var b = {}, e = jc(a), g = a.offsetWidth;
    a = a.offsetHeight;
    var k = e.top, e = e.left, d = c.pageY, f = c.pageX;
    c.changedTouches && (f = c.changedTouches[0].pageX, d = c.changedTouches[0].pageY);
    b.y = Math.max(0, Math.min(1, (k - d + a) / a));
    b.x = Math.max(0, Math.min(1, (f - e) / g));
    return b;
  }
  function lc(a) {
    return !!a && "object" === typeof a && 3 === a.nodeType;
  }
  function S(a) {
    for (;a.firstChild;) {
      a.removeChild(a.firstChild);
    }
    return a;
  }
  function D(a) {
    "function" === typeof a && (a = a());
    return (Array.isArray(a) ? a : [a]).map(function(a) {
      "function" === typeof a && (a = a());
      if (Ea(a) || lc(a)) {
        return a;
      }
      if ("string" === typeof a && /\S/.test(a)) {
        return x.createTextNode(a);
      }
    }).filter(function(a) {
      return a;
    });
  }
  function P(a, c) {
    D(c).forEach(function(b) {
      return a.appendChild(b);
    });
    return a;
  }
  function N(a, c) {
    return P(S(a), c);
  }
  function mc(a, c) {
    var b = t(a);
    0 === b.handlers[c].length && (delete b.handlers[c], a.removeEventListener ? a.removeEventListener(c, b.dispatcher, !1) : a.detachEvent && a.detachEvent("on" + c, b.dispatcher));
    0 >= Object.getOwnPropertyNames(b.handlers).length && (delete b.handlers, delete b.dispatcher, delete b.disabled);
    0 === Object.getOwnPropertyNames(b).length && Fa(a);
  }
  function Z(a, c, b, e) {
    b.forEach(function(b) {
      a(c, b, e);
    });
  }
  function qb(a) {
    function c() {
      return !0;
    }
    function b() {
      return !1;
    }
    if (!a || !a.isPropagationStopped) {
      var e = a || p.event;
      a = {};
      for (var g in e) {
        "layerX" !== g && "layerY" !== g && "keyLocation" !== g && "webkitMovementX" !== g && "webkitMovementY" !== g && ("returnValue" === g && e.preventDefault || (a[g] = e[g]));
      }
      a.target || (a.target = a.srcElement || x);
      a.relatedTarget || (a.relatedTarget = a.fromElement === a.target ? a.toElement : a.fromElement);
      a.preventDefault = function() {
        e.preventDefault && e.preventDefault();
        a.returnValue = !1;
        e.returnValue = !1;
        a.defaultPrevented = !0;
      };
      a.defaultPrevented = !1;
      a.stopPropagation = function() {
        e.stopPropagation && e.stopPropagation();
        a.cancelBubble = !0;
        e.cancelBubble = !0;
        a.isPropagationStopped = c;
      };
      a.isPropagationStopped = b;
      a.stopImmediatePropagation = function() {
        e.stopImmediatePropagation && e.stopImmediatePropagation();
        a.isImmediatePropagationStopped = c;
        a.stopPropagation();
      };
      a.isImmediatePropagationStopped = b;
      if (null !== a.clientX && void 0 !== a.clientX) {
        g = x.documentElement;
        var k = x.body;
        a.pageX = a.clientX + (g && g.scrollLeft || k && k.scrollLeft || 0) - (g && g.clientLeft || k && k.clientLeft || 0);
        a.pageY = a.clientY + (g && g.scrollTop || k && k.scrollTop || 0) - (g && g.clientTop || k && k.clientTop || 0);
      }
      a.which = a.charCode || a.keyCode;
      null !== a.button && void 0 !== a.button && (a.button = a.button & 1 ? 0 : a.button & 4 ? 1 : a.button & 2 ? 2 : 0);
    }
    return a;
  }
  function I(a, c, b) {
    if (Array.isArray(c)) {
      return Z(I, a, c, b);
    }
    var e = t(a);
    e.handlers || (e.handlers = {});
    e.handlers[c] || (e.handlers[c] = []);
    b.guid || (b.guid = xa++);
    e.handlers[c].push(b);
    e.dispatcher || (e.disabled = !1, e.dispatcher = function(b, c) {
      if (!e.disabled) {
        b = qb(b);
        var g = e.handlers[b.type];
        if (g) {
          for (var g = g.slice(0), k = 0, d = g.length;k < d && !b.isImmediatePropagationStopped();k++) {
            try {
              g[k].call(a, b, c);
            } catch (ae) {
              B.error(ae);
            }
          }
        }
      }
    });
    1 === e.handlers[c].length && (a.addEventListener ? a.addEventListener(c, e.dispatcher, !1) : a.attachEvent && a.attachEvent("on" + c, e.dispatcher));
  }
  function la(a, c, b) {
    if (L(a)) {
      var e = t(a);
      if (e.handlers) {
        if (Array.isArray(c)) {
          return Z(la, a, c, b);
        }
        if (c) {
          var g = e.handlers[c];
          if (g) {
            if (!b) {
              e.handlers[c] = [];
            } else {
              if (b.guid) {
                for (e = 0;e < g.length;e++) {
                  g[e].guid === b.guid && g.splice(e--, 1);
                }
              }
            }
            mc(a, c);
          }
        } else {
          for (g in e.handlers) {
            c = g, e.handlers[c] = [], mc(a, c);
          }
        }
      }
    }
  }
  function Ua(a, c, b) {
    var e = L(a) ? t(a) : {}, g = a.parentNode || a.ownerDocument;
    "string" === typeof c && (c = {type:c, target:a});
    c = qb(c);
    e.dispatcher && e.dispatcher.call(a, c, b);
    if (g && !c.isPropagationStopped() && !0 === c.bubbles) {
      Ua.call(null, g, c, b);
    } else {
      if (!g && !c.defaultPrevented && (a = t(c.target), c.target[c.type])) {
        a.disabled = !0;
        if ("function" === typeof c.target[c.type]) {
          c.target[c.type]();
        }
        a.disabled = !1;
      }
    }
    return !c.defaultPrevented;
  }
  function Ia(a, c, b) {
    if (Array.isArray(c)) {
      return Z(Ia, a, c, b);
    }
    var e = function() {
      la(a, c, e);
      b.apply(this, arguments);
    };
    e.guid = b.guid = b.guid || xa++;
    I(a, c, e);
  }
  function U(a) {
    return a.charAt(0).toUpperCase() + a.slice(1);
  }
  function oc(a, c, b, e, g) {
    if (!be(a)) {
      return a;
    }
    var k = ce(c) && (de(c) || ee(c)), d = k ? void 0 : fe(c);
    ge(d || c, function(f, ea) {
      d && (ea = f, f = c[ea]);
      if (he(f)) {
        a: {
          e || (e = []), g || (g = []), f = ea;
          ea = e;
          for (var ha = g, h = ea.length, l = c[f];h--;) {
            if (ea[h] == l) {
              a[f] = ha[h];
              break a;
            }
          }
          var h = a[f], J = b ? b(h, l, f, a, c) : void 0, m = void 0 === J;
          if (m) {
            if (J = l, pc(l) && (qc(l) || ie(l))) {
              if (qc(h)) {
                J = h;
              } else {
                if (pc(h)) {
                  var J = void 0, n = -1, p = h.length;
                  for (J || (J = Array(p));++n < p;) {
                    J[n] = h[n];
                  }
                } else {
                  J = [];
                }
              }
            } else {
              if (rc(l) || sc(l)) {
                if (sc(h)) {
                  for (var J = rb(h), n = {}, p = -1, r = J.length;++p < r;) {
                    var q = J[p];
                    n[q] = h[q];
                  }
                  J = n;
                } else {
                  J = rc(h) ? h : {};
                }
              } else {
                m = !1;
              }
            }
          }
          ea.push(l);
          ha.push(J);
          if (m) {
            a[f] = oc(J, l, b, ea, ha);
          } else {
            if (J === J ? J !== h : h === h) {
              a[f] = J;
            }
          }
        }
      } else {
        ha = a[ea], l = b ? b(ha, f, ea, a, c) : void 0, (h = void 0 === l) && (l = f), void 0 === l && (!k || ea in a) || !h && (l === l ? l === ha : ha !== ha) || (a[ea] = l);
      }
    });
    return a;
  }
  function tc(a) {
    return !!a && "object" === typeof a && "[object Object]" === a.toString() && a.constructor === Object;
  }
  function je(a, c) {
    if (!tc(c)) {
      return c;
    }
    if (!tc(a)) {
      return V(c);
    }
  }
  function V() {
    var a = Array.prototype.slice.call(arguments);
    a.unshift({});
    a.push(je);
    uc.apply(null, a);
    return a[0];
  }
  function vc(a, c, b, e) {
    void 0 === e && (B.warn("DEPRECATED: Function '" + a + "' on 'TimeRanges' called without an index argument."), e = 0);
    var g = b.length - 1;
    if (0 > e || e > g) {
      throw Error("Failed to execute '" + a + "' on 'TimeRanges': The index provided (" + e + ") is greater than or equal to the maximum bound (" + g + ").");
    }
    return b[e][c];
  }
  function sb(a) {
    return void 0 === a || 0 === a.length ? {length:0, start:function() {
      throw Error("This TimeRanges object is empty");
    }, end:function() {
      throw Error("This TimeRanges object is empty");
    }} : {length:a.length, start:vc.bind(null, "start", 0, a), end:vc.bind(null, "end", 1, a)};
  }
  function ma(a, c) {
    return Array.isArray(a) ? sb(a) : void 0 === a || void 0 === c ? sb() : sb([[a, c]]);
  }
  function wc(a, c) {
    var b = 0, e, g;
    if (!c) {
      return 0;
    }
    a && a.length || (a = ma(0, 0));
    for (var k = 0;k < a.length;k++) {
      e = a.start(k), g = a.end(k), g > c && (g = c), b += g - e;
    }
    return b / c;
  }
  function W(a) {
    if (a instanceof W) {
      return a;
    }
    "number" === typeof a ? this.code = a : "string" === typeof a ? this.message = a : "object" === typeof a && ("number" === typeof a.code && (this.code = a.code), O(this, a));
    this.message || (this.message = W.defaultMessages[this.code] || "");
  }
  function ke(a) {
    for (var c in a) {
      if (a.hasOwnProperty(c)) {
        return !1;
      }
    }
    return !0;
  }
  function xc(a, c, b) {
    var e = a;
    le(c) ? (b = c, "string" === typeof a && (e = {uri:a})) : e = me(c, {uri:a});
    e.callback = b;
    return e;
  }
  function na(a, c, b) {
    c = xc(a, c, b);
    return yc(c);
  }
  function yc(a) {
    function c(b) {
      clearTimeout(q);
      b instanceof Error || (b = Error("" + (b || "Unknown XMLHttpRequest Error")));
      b.statusCode = 0;
      var c = r;
      e || (e = !0, a.callback(b, c, void 0));
    }
    function b() {
      if (!d) {
        var b;
        clearTimeout(q);
        b = a.useXDR && void 0 === g.status ? 200 : 1223 === g.status ? 204 : g.status;
        var c = r, k = null;
        if (0 !== b) {
          g.response ? c = g.response : (c = g.responseText) || ("document" === g.responseType ? c = g.responseXML : (c = 204 === g.status && g.responseXML && "parsererror" === g.responseXML.documentElement.nodeName, c = "" !== g.responseType || c ? null : g.responseXML));
          if (p) {
            try {
              c = JSON.parse(c);
            } catch (Uf) {
            }
          }
          c = {body:c, statusCode:b, method:h, headers:{}, url:f, rawRequest:g};
          g.getAllResponseHeaders && (c.headers = ne(g.getAllResponseHeaders()));
        } else {
          k = Error("Internal XMLHttpRequest Error");
        }
        b = c.body;
        e || (e = !0, a.callback(k, c, b));
      }
    }
    if ("undefined" === typeof a.callback) {
      throw Error("callback argument missing");
    }
    var e = !1, g = a.xhr || null;
    g || (g = a.cors || a.useXDR ? new na.XDomainRequest : new na.XMLHttpRequest);
    var k, d, f = g.url = a.uri || a.url, h = g.method = a.method || "GET", l = a.body || a.data || null, m = g.headers = a.headers || {}, n = !!a.sync, p = !1, q, r = {body:void 0, headers:{}, statusCode:0, method:h, url:f, rawRequest:g};
    "json" in a && !1 !== a.json && (p = !0, m.accept || m.Accept || (m.Accept = "application/json"), "GET" !== h && "HEAD" !== h && (m["content-type"] || m["Content-Type"] || (m["Content-Type"] = "application/json"), l = JSON.stringify(!0 === a.json ? l : a.json)));
    g.onreadystatechange = function() {
      4 === g.readyState && b();
    };
    g.onload = b;
    g.onerror = c;
    g.onprogress = function() {
    };
    g.onabort = function() {
      d = !0;
    };
    g.ontimeout = c;
    g.open(h, f, !n, a.username, a.password);
    n || (g.withCredentials = !!a.withCredentials);
    !n && 0 < a.timeout && (q = setTimeout(function() {
      if (!d) {
        d = !0;
        g.abort("timeout");
        var b = Error("XMLHttpRequest timeout");
        b.code = "ETIMEDOUT";
        c(b);
      }
    }, a.timeout));
    if (g.setRequestHeader) {
      for (k in m) {
        m.hasOwnProperty(k) && g.setRequestHeader(k, m[k]);
      }
    } else {
      if (a.headers && !ke(a.headers)) {
        throw Error("Headers cannot be set on an XDomainRequest object");
      }
    }
    "responseType" in a && (g.responseType = a.responseType);
    "beforeSend" in a && "function" === typeof a.beforeSend && a.beforeSend(g);
    g.send(l);
    return g;
  }
  function oe() {
  }
  function pe(a) {
    var c = a.charAt(0).toUpperCase() + a.slice(1);
    zc["set" + c] = function(b) {
      return this.el_.vjs_setProperty(a, b);
    };
  }
  function Ac(a) {
    zc[a] = function() {
      return this.el_.vjs_getProperty(a);
    };
  }
  function tb(a, c) {
    return "rgba(" + parseInt(a[1] + a[1], 16) + "," + parseInt(a[2] + a[2], 16) + "," + parseInt(a[3] + a[3], 16) + "," + c + ")";
  }
  function ra(a, c) {
    void 0 === c && (c = a);
    a = 0 > a ? 0 : a;
    var b = Math.floor(a % 60), e = Math.floor(a / 60 % 60), g = Math.floor(a / 3600), k = Math.floor(c / 60 % 60);
    c = Math.floor(c / 3600);
    if (isNaN(a) || Infinity === a) {
      g = e = b = "-";
    }
    g = 0 < g || 0 < c ? g + ":" : "";
    return g + (((g || 10 <= k) && 10 > e ? "0" + e : e) + ":") + (10 > b ? "0" + b : b);
  }
  function oa(a) {
    var c;
    a.selectedOptions ? c = a.selectedOptions[0] : a.options && (c = a.options[a.options.selectedIndex]);
    return c.value;
  }
  function pa(a, c) {
    if (c) {
      var b;
      for (b = 0;b < a.options.length && a.options[b].value !== c;b++) {
      }
      a.selectedIndex = b;
    }
  }
  function y(a, c, b) {
    if ("string" === typeof a) {
      0 === a.indexOf("#") && (a = a.slice(1));
      if (y.getPlayers()[a]) {
        return c && B.warn('Player "' + a + '" is already initialised. Options will not be applied.'), b && y.getPlayers()[a].ready(b), y.getPlayers()[a];
      }
      a = ka(a);
    }
    if (!a || !a.nodeName) {
      throw new TypeError("The element or ID supplied is not valid. (videojs)");
    }
    return a.player || ia.players[a.playerId] || new ia(a, c, b);
  }
  var Va = "undefined" !== typeof window ? window : "undefined" !== typeof global ? global : "undefined" !== typeof self ? self : {}, p = f(function(a) {
    a.exports = "undefined" !== typeof window ? window : "undefined" !== typeof Va ? Va : "undefined" !== typeof self ? self : {};
  }), Bc = Array.prototype.slice, Wa = function(a, c) {
    "length" in a || (a = [a]);
    for (a = Bc.call(a);a.length;) {
      var b = a.shift(), e = c(b);
      if (e) {
        return e;
      }
      b.childNodes && b.childNodes.length && (a = Bc.call(b.childNodes).concat(a));
    }
  };
  h.prototype.nodeType = 8;
  h.prototype.nodeName = "#comment";
  h.prototype.toString = function() {
    return "[object Comment]";
  };
  q.prototype.type = "DOMTextNode";
  q.prototype.nodeType = 3;
  q.prototype.nodeName = "#text";
  q.prototype.toString = function() {
    return this.data;
  };
  q.prototype.replaceData = function(a, c, b) {
    var e = this.data, g = e.substring(0, a);
    a = e.substring(a + c, e.length);
    this.data = g + b + a;
    this.length = this.data.length;
  };
  var Cc = function(a) {
    var c = this, b = a.type;
    a.target || (a.target = c);
    c.listeners || (c.listeners = {});
    if (b = c.listeners[b]) {
      return b.forEach(function(b) {
        a.currentTarget = c;
        "function" === typeof b ? b(a) : b.handleEvent(a);
      });
    }
    c.parentNode && c.parentNode.dispatchEvent(a);
  }, Dc = function(a, c) {
    this.listeners || (this.listeners = {});
    this.listeners[a] || (this.listeners[a] = []);
    -1 === this.listeners[a].indexOf(c) && this.listeners[a].push(c);
  }, Ec = function(a, c) {
    this.listeners && this.listeners[a] && (a = this.listeners[a], c = a.indexOf(c), -1 !== c && a.splice(c, 1));
  }, $d = "area base br col embed hr img input keygen link menuitem meta param source track wbr".split(" ");
  u.prototype.type = "DOMElement";
  u.prototype.nodeType = 1;
  u.prototype.appendChild = function(a) {
    a.parentNode && a.parentNode.removeChild(a);
    this.childNodes.push(a);
    a.parentNode = this;
    return a;
  };
  u.prototype.replaceChild = function(a, c) {
    a.parentNode && a.parentNode.removeChild(a);
    var b = this.childNodes.indexOf(c);
    c.parentNode = null;
    this.childNodes[b] = a;
    a.parentNode = this;
    return c;
  };
  u.prototype.removeChild = function(a) {
    var c = this.childNodes.indexOf(a);
    this.childNodes.splice(c, 1);
    a.parentNode = null;
    return a;
  };
  u.prototype.insertBefore = function(a, c) {
    a.parentNode && a.parentNode.removeChild(a);
    c = null === c || void 0 === c ? -1 : this.childNodes.indexOf(c);
    -1 < c ? this.childNodes.splice(c, 0, a) : this.childNodes.push(a);
    a.parentNode = this;
    return a;
  };
  u.prototype.setAttributeNS = function(a, c, b) {
    var e = null, g = c, k = c.indexOf(":");
    -1 < k && (e = c.substr(0, k), g = c.substr(k + 1));
    "INPUT" === this.tagName && "type" === c ? this.type = b : (this._attributes[a] || (this._attributes[a] = {}))[g] = {value:b, prefix:e};
  };
  u.prototype.getAttributeNS = function(a, c) {
    a = (a = this._attributes[a]) && a[c] && a[c].value;
    return "INPUT" === this.tagName && "type" === c ? this.type : "string" !== typeof a ? null : a;
  };
  u.prototype.removeAttributeNS = function(a, c) {
    (a = this._attributes[a]) && delete a[c];
  };
  u.prototype.hasAttributeNS = function(a, c) {
    a = this._attributes[a];
    return !!a && c in a;
  };
  u.prototype.setAttribute = function(a, c) {
    return this.setAttributeNS(null, a, c);
  };
  u.prototype.getAttribute = function(a) {
    return this.getAttributeNS(null, a);
  };
  u.prototype.removeAttribute = function(a) {
    return this.removeAttributeNS(null, a);
  };
  u.prototype.hasAttribute = function(a) {
    return this.hasAttributeNS(null, a);
  };
  u.prototype.removeEventListener = Ec;
  u.prototype.addEventListener = Dc;
  u.prototype.dispatchEvent = Cc;
  u.prototype.focus = function() {
  };
  u.prototype.toString = function() {
    return m(this);
  };
  u.prototype.getElementsByClassName = function(a) {
    var c = a.split(" "), b = [];
    Wa(this, function(a) {
      if (1 === a.nodeType) {
        var e = (a.className || "").split(" ");
        c.every(function(b) {
          return -1 !== e.indexOf(b);
        }) && b.push(a);
      }
    });
    return b;
  };
  u.prototype.getElementsByTagName = function(a) {
    a = a.toLowerCase();
    var c = [];
    Wa(this.childNodes, function(b) {
      1 !== b.nodeType || "*" !== a && b.tagName.toLowerCase() !== a || c.push(b);
    });
    return c;
  };
  u.prototype.contains = function(a) {
    return Wa(this, function(c) {
      return a === c;
    }) || !1;
  };
  r.prototype.type = "DocumentFragment";
  r.prototype.nodeType = 11;
  r.prototype.nodeName = "#document-fragment";
  r.prototype.appendChild = u.prototype.appendChild;
  r.prototype.replaceChild = u.prototype.replaceChild;
  r.prototype.removeChild = u.prototype.removeChild;
  r.prototype.toString = function() {
    return this.childNodes.map(function(a) {
      return String(a);
    }).join("");
  };
  ba.prototype.initEvent = function(a, c, b) {
    this.type = a;
    this.bubbles = c;
    this.cancelable = b;
  };
  ba.prototype.preventDefault = function() {
  };
  var ca = z.prototype;
  ca.createTextNode = function(a) {
    return new q(a, this);
  };
  ca.createElementNS = function(a, c) {
    return new u(c, this, null === a ? null : String(a));
  };
  ca.createElement = function(a) {
    return new u(a, this);
  };
  ca.createDocumentFragment = function() {
    return new r(this);
  };
  ca.createEvent = function(a) {
    return new ba(a);
  };
  ca.createComment = function(a) {
    return new h(a, this);
  };
  ca.getElementById = function(a) {
    a = String(a);
    return Wa(this.childNodes, function(c) {
      if (String(c.id) === a) {
        return c;
      }
    }) || null;
  };
  ca.getElementsByClassName = u.prototype.getElementsByClassName;
  ca.getElementsByTagName = u.prototype.getElementsByTagName;
  ca.contains = u.prototype.contains;
  ca.removeEventListener = Ec;
  ca.addEventListener = Dc;
  ca.dispatchEvent = Cc;
  var qe = new z, x = f(function(a) {
    var c = "undefined" !== typeof Va ? Va : "undefined" !== typeof window ? window : {};
    if ("undefined" !== typeof document) {
      a.exports = document;
    } else {
      var b = c["__GLOBAL_DOCUMENT_CACHE@4"];
      b || (b = c["__GLOBAL_DOCUMENT_CACHE@4"] = qe);
      a.exports = b;
    }
  }), xa = 1, da = p.navigator && p.navigator.userAgent || "", Fc = /AppleWebKit\/([\d.]+)/i.exec(da), re = Fc ? parseFloat(Fc.pop()) : null, ub = /iPad/i.test(da), vb = /iPhone/i.test(da) && !ub, Gc = /iPod/i.test(da), wb = vb || ub || Gc, se = function() {
    var a = da.match(/OS (\d+)_/i);
    return a && a[1] ? a[1] : null;
  }(), Xa = /Android/i.test(da), Ya = function() {
    var a = da.match(/Android (\d+)(?:\.(\d+))?(?:\.(\d+))*/i);
    if (!a) {
      return null;
    }
    var c = a[1] && parseFloat(a[1]), b = a[2] && parseFloat(a[2]);
    return c && b ? parseFloat(a[1] + "." + a[2]) : c ? c : null;
  }(), Hc = Xa && /webkit/i.test(da) && 2.3 > Ya, Ic = Xa && 5 > Ya && 537 > re, xb = /Firefox/i.test(da), Jc = /Edge/i.test(da), Kc = !Jc && /Chrome/i.test(da), X = /MSIE\s8\.0/.test(da), yb = function(a) {
    return a && parseFloat(a[1]);
  }(/MSIE\s(\d+)\.\d/.exec(da)), Za = !!("ontouchstart" in p || p.DocumentTouch && x instanceof p.DocumentTouch), Lc = "backgroundSize" in x.createElement("video").style, te = Object.freeze({IS_IPAD:ub, IS_IPHONE:vb, IS_IPOD:Gc, IS_IOS:wb, IOS_VERSION:se, IS_ANDROID:Xa, ANDROID_VERSION:Ya, IS_OLD_ANDROID:Hc, IS_NATIVE_ANDROID:Ic, IS_FIREFOX:xb, IS_EDGE:Jc, IS_CHROME:Kc, IS_IE8:X, IE_VERSION:yb, TOUCH_ENABLED:Za, BACKGROUND_SIZE_SUPPORTED:Lc}), za, zb = function(a, c, b) {
    void 0 === b && (b = !!yb && 11 > yb);
    "log" !== a && c.unshift(a.toUpperCase() + ":");
    za.history.push(c);
    c.unshift("VIDEOJS:");
    if (a = p.console && p.console[a]) {
      if (b && (c = c.map(function(b) {
        if (b && "object" === typeof b || Array.isArray(b)) {
          try {
            return JSON.stringify(b);
          } catch (g) {
          }
        }
        return String(b);
      }).join(" ")), a.apply) {
        a[Array.isArray(c) ? "apply" : "call"](p.console, c);
      } else {
        a(c);
      }
    }
  };
  za = function() {
    for (var a = [], c = 0;c < arguments.length;c++) {
      a[c] = arguments[c];
    }
    zb("log", a);
  };
  za.history = [];
  za.error = function() {
    for (var a = [], c = 0;c < arguments.length;c++) {
      a[c] = arguments[c];
    }
    return zb("error", a);
  };
  za.warn = function() {
    for (var a = [], c = 0;c < arguments.length;c++) {
      a[c] = arguments[c];
    }
    return zb("warn", a);
  };
  var B = za, nc = function(a) {
    for (var c = "", b = 0;b < arguments.length;b++) {
      c += a[b].replace(/\n\r?\s*/g, "") + (arguments[b + 1] || "");
    }
    return c;
  }, Ha = {}, wa = "vdata" + (new Date).getTime(), Ja = va("querySelector"), ue = va("querySelectorAll"), Ab = !1, Mc, Bb = function() {
    var a = x.getElementsByTagName("video"), c = x.getElementsByTagName("audio"), b = [];
    if (a && 0 < a.length) {
      for (var e = 0, g = a.length;e < g;e++) {
        b.push(a[e]);
      }
    }
    if (c && 0 < c.length) {
      for (e = 0, g = c.length;e < g;e++) {
        b.push(c[e]);
      }
    }
    if (b && 0 < b.length) {
      for (e = 0, g = b.length;e < g;e++) {
        if ((a = b[e]) && a.getAttribute) {
          void 0 === a.player && null !== a.getAttribute("data-setup") && Mc(a);
        } else {
          setTimeout(Bb, 1);
          break;
        }
      }
    } else {
      Ab || setTimeout(Bb, 1);
    }
  };
  "complete" === x.readyState ? Ab = !0 : Ia(p, "load", function() {
    Ab = !0;
  });
  var Nc = function(a) {
    var c = x.createElement("style");
    c.className = a;
    return c;
  }, Oc = function(a, c) {
    a.styleSheet ? a.styleSheet.cssText = c : a.textContent = c;
  }, w = function(a, c, b) {
    c.guid || (c.guid = xa++);
    var e = function() {
      return c.apply(a, arguments);
    };
    e.guid = b ? b + "_" + c.guid : c.guid;
    return e;
  }, Pc = function(a, c) {
    for (var b = -1, e = a.length;++b < e && !1 !== c(a[b], b, a);) {
    }
    return a;
  }, sa = function(a) {
    var c = typeof a;
    return !!a && ("object" == c || "function" == c);
  }, ya = function(a) {
    return !!a && "object" == typeof a;
  }, ve = Object.prototype.toString, Cb = function(a) {
    return "string" == typeof a || ya(a) && "[object String]" == ve.call(a);
  }, Qc = Error.prototype, Db = Object.prototype.propertyIsEnumerable, we = Array.prototype.splice, Rc, Eb, Sc, Tc, Uc;
  (function(a) {
    var c = function() {
      this.x = a;
    }, b = {0:a, length:a}, e = [];
    c.prototype = {valueOf:a, y:a};
    for (var g in new c) {
      e.push(g);
    }
    Rc = Db.call(Qc, "message") || Db.call(Qc, "name");
    Eb = Db.call(c, "prototype");
    Sc = !/valueOf/.test(e);
    Tc = "x" != e[0];
    we.call(b, 0, 1);
    Uc = "xx" != "x" + Object("x")[0];
  })(1, 0);
  var Vc = function(a) {
    if (Uc && Cb(a)) {
      for (var c = -1, b = a.length, e = Object(a);++c < b;) {
        e[c] = a.charAt(c);
      }
      return e;
    }
    return sa(a) ? a : Object(a);
  }, Ka = function(a) {
    return "number" == typeof a && -1 < a && 0 == a % 1 && 9007199254740991 >= a;
  }, xe = function(a) {
    return function(c) {
      return null == c ? void 0 : Vc(c)[a];
    };
  }("length"), La = function(a) {
    return null != a && Ka(xe(a));
  }, Wc = Object.prototype, ye = Wc.hasOwnProperty, ze = Wc.propertyIsEnumerable, $a = function(a) {
    return ya(a) && La(a) && ye.call(a, "callee") && !ze.call(a, "callee");
  }, Ae = Object.prototype.toString, Fb = function(a) {
    return sa(a) && "[object Function]" == Ae.call(a);
  }, Xc = function() {
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
  }(), Be = /^\[object .+?Constructor\]$/, Yc = Function.prototype.toString, Zc = RegExp("^" + Yc.call(Object.prototype.hasOwnProperty).replace(/[\\^$.*+?()[\]{}|]/g, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"), Gb = function(a, c) {
    a = null == a ? void 0 : a[c];
    return (null == a ? 0 : Fb(a) ? Zc.test(Yc.call(a)) : ya(a) && (Xc(a) ? Zc : Be).test(a)) ? a : void 0;
  }, Ce = Object.prototype.toString, ab = Gb(Array, "isArray") || function(a) {
    return ya(a) && Ka(a.length) && "[object Array]" == Ce.call(a);
  }, De = function(a) {
    return function(c, b, e) {
      var g = Vc(c);
      e = e(c);
      for (var k = e.length, d = a ? k : -1;a ? d-- : ++d < k;) {
        var f = e[d];
        if (!1 === b(g[f], f, g)) {
          break;
        }
      }
      return c;
    };
  }(), Ee = /^\d+$/, Hb = function(a, c) {
    a = "number" == typeof a || Ee.test(a) ? +a : -1;
    return -1 < a && 0 == a % 1 && a < (null == c ? 9007199254740991 : c);
  }, Ib = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" "), $c = Error.prototype, Ma = Object.prototype, Fe = String.prototype, bb = Ma.hasOwnProperty, Ge = Ma.toString, aa = {};
  aa["[object Array]"] = aa["[object Date]"] = aa["[object Number]"] = {constructor:!0, toLocaleString:!0, toString:!0, valueOf:!0};
  aa["[object Boolean]"] = aa["[object String]"] = {constructor:!0, toString:!0, valueOf:!0};
  aa["[object Error]"] = aa["[object Function]"] = aa["[object RegExp]"] = {constructor:!0, toString:!0};
  aa["[object Object]"] = {constructor:!0};
  Pc(Ib, function(a) {
    for (var c in aa) {
      if (bb.call(aa, c)) {
        var b = aa[c];
        b[a] = bb.call(b, a);
      }
    }
  });
  var rb = function(a) {
    if (null == a) {
      return [];
    }
    sa(a) || (a = Object(a));
    for (var c = a.length, c = c && Ka(c) && (ab(a) || $a(a) || Cb(a)) && c || 0, b = a.constructor, e = -1, b = Fb(b) && b.prototype || Ma, g = b === a, k = Array(c), d = 0 < c, f = Rc && (a === $c || a instanceof Error), h = Eb && Fb(a);++e < c;) {
      k[e] = e + "";
    }
    for (var l in a) {
      h && "prototype" == l || f && ("message" == l || "name" == l) || d && Hb(l, c) || "constructor" == l && (g || !bb.call(a, l)) || k.push(l);
    }
    if (Sc && a !== Ma) {
      for (c = a === Fe ? "[object String]" : a === $c ? "[object Error]" : Ge.call(a), e = aa[c] || aa["[object Object]"], "[object Object]" == c && (b = Ma), c = Ib.length;c--;) {
        l = Ib[c], d = e[l], g && d || (d ? !bb.call(a, l) : a[l] === b[l]) || k.push(l);
      }
    }
    return k;
  }, ad = function(a, c) {
    return De(a, c, rb);
  }, bd = Object.prototype, Jb = bd.hasOwnProperty, He = bd.toString, H = {};
  H["[object Float32Array]"] = H["[object Float64Array]"] = H["[object Int8Array]"] = H["[object Int16Array]"] = H["[object Int32Array]"] = H["[object Uint8Array]"] = H["[object Uint8ClampedArray]"] = H["[object Uint16Array]"] = H["[object Uint32Array]"] = !0;
  H["[object Arguments]"] = H["[object Array]"] = H["[object ArrayBuffer]"] = H["[object Boolean]"] = H["[object Date]"] = H["[object Error]"] = H["[object Function]"] = H["[object Map]"] = H["[object Number]"] = H["[object Object]"] = H["[object RegExp]"] = H["[object Set]"] = H["[object String]"] = H["[object WeakMap]"] = !1;
  var Ie = Object.prototype.toString, cd = function(a) {
    return ya(a) && Ka(a.length) && !!H[Ie.call(a)];
  }, sc = $a, qc = ab, pc = La, rc = function(a) {
    var c;
    if (!ya(a) || "[object Object]" != He.call(a) || Xc(a) || $a(a) || !(Jb.call(a, "constructor") || (c = a.constructor, "function" != typeof c || c instanceof c))) {
      return !1;
    }
    var b;
    if (Tc) {
      return ad(a, function(a, c, k) {
        b = Jb.call(k, c);
        return !1;
      }), !1 !== b;
    }
    ad(a, function(a, c) {
      b = c;
    });
    return void 0 === b || Jb.call(a, b);
  }, ie = cd, Je = Object.prototype.hasOwnProperty, dd = function(a) {
    for (var c = rb(a), b = c.length, e = b && a.length, g = !!e && Ka(e) && (ab(a) || $a(a) || Cb(a)), k = -1, d = [];++k < b;) {
      var f = c[k];
      (g && Hb(f, e) || Je.call(a, f)) && d.push(f);
    }
    return d;
  }, ed = Gb(Object, "keys"), ge = Pc, de = ab, ce = La, be = sa, he = ya, ee = cd, fe = ed ? function(a) {
    var c = null == a ? void 0 : a.constructor;
    return "function" == typeof c && c.prototype === a || ("function" == typeof a ? Eb : La(a)) ? dd(a) : sa(a) ? ed(a) : [];
  } : dd, Ke = function(a) {
    return a;
  }, fd = Math.max, Le = function(a, c, b) {
    if ("function" != typeof a) {
      return Ke;
    }
    if (void 0 === c) {
      return a;
    }
    switch(b) {
      case 1:
        return function(b) {
          return a.call(c, b);
        };
      case 3:
        return function(b, g, k) {
          return a.call(c, b, g, k);
        };
      case 4:
        return function(b, g, k, d) {
          return a.call(c, b, g, k, d);
        };
      case 5:
        return function(b, g, k, d, f) {
          return a.call(c, b, g, k, d, f);
        };
    }
    return function() {
      return a.apply(c, arguments);
    };
  }, Me = function(a, c) {
    if ("function" != typeof a) {
      throw new TypeError("Expected a function");
    }
    c = fd(void 0 === c ? a.length - 1 : +c || 0, 0);
    return function() {
      for (var b = arguments, e = -1, g = fd(b.length - c, 0), k = Array(g);++e < g;) {
        k[e] = b[c + e];
      }
      switch(c) {
        case 0:
          return a.call(this, k);
        case 1:
          return a.call(this, b[0], k);
        case 2:
          return a.call(this, b[0], b[1], k);
      }
      g = Array(c + 1);
      for (e = -1;++e < c;) {
        g[e] = b[e];
      }
      g[c] = k;
      return a.apply(this, g);
    };
  }, uc = function(a) {
    return Me(function(c, b) {
      var e = -1, g = null == c ? 0 : b.length, k = 2 < g ? b[g - 2] : void 0, d = 2 < g ? b[2] : void 0, f = 1 < g ? b[g - 1] : void 0;
      "function" == typeof k ? (k = Le(k, f, 5), g -= 2) : (k = "function" == typeof f ? f : void 0, g -= k ? 1 : 0);
      if (f = d) {
        var f = b[0], h = b[1];
        if (sa(d)) {
          var l = typeof h;
          ("number" == l ? La(d) && Hb(h, d.length) : "string" == l && h in d) ? (d = d[h], f = f === f ? f === d : d !== d) : f = !1;
        } else {
          f = !1;
        }
      }
      f && (k = 3 > g ? void 0 : k, g = 1);
      for (;++e < g;) {
        (d = b[e]) && a(c, d, k);
      }
      return c;
    });
  }(oc), n = function() {
    function a(a, b, e) {
      this.player_ = !a && this.play ? a = this : a;
      this.options_ = V({}, this.options_);
      b = this.options_ = V(this.options_, b);
      this.id_ = b.id || b.el && b.el.id;
      this.id_ || (this.id_ = (a && a.id && a.id() || "no_player") + "_component_" + xa++);
      this.name_ = b.name || null;
      b.el ? this.el_ = b.el : !1 !== b.createEl && (this.el_ = this.createEl());
      this.children_ = [];
      this.childIndex_ = {};
      this.childNameIndex_ = {};
      !1 !== b.initChildren && this.initChildren();
      this.ready(e);
      !1 !== b.reportTouchActivity && this.enableTouchActivity();
    }
    a.prototype.dispose = function() {
      this.trigger({type:"dispose", bubbles:!1});
      if (this.children_) {
        for (var a = this.children_.length - 1;0 <= a;a--) {
          this.children_[a].dispose && this.children_[a].dispose();
        }
      }
      this.childNameIndex_ = this.childIndex_ = this.children_ = null;
      this.off();
      this.el_.parentNode && this.el_.parentNode.removeChild(this.el_);
      Fa(this.el_);
      this.el_ = null;
    };
    a.prototype.player = function() {
      return this.player_;
    };
    a.prototype.options = function(a) {
      B.warn("this.options() has been deprecated and will be moved to the constructor in 6.0");
      return a ? this.options_ = V(this.options_, a) : this.options_;
    };
    a.prototype.el = function() {
      return this.el_;
    };
    a.prototype.createEl = function(a, b, e) {
      return A(a, b, e);
    };
    a.prototype.localize = function(a) {
      var b = this.player_.language && this.player_.language(), c = this.player_.languages && this.player_.languages();
      if (!b || !c) {
        return a;
      }
      var g = c[b];
      if (g && g[a]) {
        return g[a];
      }
      b = b.split("-")[0];
      return (c = c[b]) && c[a] ? c[a] : a;
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
    a.prototype.getChildById = function(a) {
      return this.childIndex_[a];
    };
    a.prototype.getChild = function(a) {
      return this.childNameIndex_[a];
    };
    a.prototype.addChild = function(c, b, e) {
      void 0 === b && (b = {});
      void 0 === e && (e = this.children_.length);
      var g;
      if ("string" === typeof c) {
        g = c;
        b || (b = {});
        !0 === b && (B.warn("Initializing a child component with `true` is deprecated. Children should be defined in an array when possible, but if necessary use an object instead of `true`."), b = {});
        c = b.componentClass || U(g);
        b.name = g;
        var k = a.getComponent(c);
        if (!k) {
          throw Error("Component " + c + " does not exist");
        }
        if ("function" !== typeof k) {
          return null;
        }
        b = new k(this.player_ || this, b);
      } else {
        b = c;
      }
      this.children_.splice(e, 0, b);
      "function" === typeof b.id && (this.childIndex_[b.id()] = b);
      (g = g || b.name && b.name()) && (this.childNameIndex_[g] = b);
      "function" === typeof b.el && b.el() && (e = this.contentEl().children[e] || null, this.contentEl().insertBefore(b.el(), e));
      return b;
    };
    a.prototype.removeChild = function(a) {
      "string" === typeof a && (a = this.getChild(a));
      if (a && this.children_) {
        for (var b = !1, c = this.children_.length - 1;0 <= c;c--) {
          if (this.children_[c] === a) {
            b = !0;
            this.children_.splice(c, 1);
            break;
          }
        }
        b && (this.childIndex_[a.id()] = null, this.childNameIndex_[a.name()] = null, (b = a.el()) && b.parentNode === this.contentEl() && this.contentEl().removeChild(a.el()));
      }
    };
    a.prototype.initChildren = function() {
      var c = this, b = this.options_.children;
      if (b) {
        var e = this.options_, g, k = a.getComponent("Tech");
        g = Array.isArray(b) ? b : Object.keys(b);
        g.concat(Object.keys(this.options_).filter(function(b) {
          return !g.some(function(a) {
            return "string" === typeof a ? b === a : b === a.name;
          });
        })).map(function(a) {
          var e;
          "string" === typeof a ? (e = a, a = b[e] || c.options_[e] || {}) : e = a.name;
          return {name:e, opts:a};
        }).filter(function(b) {
          return (b = a.getComponent(b.opts.componentClass || U(b.name))) && !k.isTech(b);
        }).forEach(function(b) {
          var a = b.name;
          b = b.opts;
          void 0 !== e[a] && (b = e[a]);
          !1 !== b && (!0 === b && (b = {}), b.playerOptions = c.options_.playerOptions, (b = c.addChild(a, b)) && (c[a] = b));
        });
      }
    };
    a.prototype.buildCSSClass = function() {
      return "";
    };
    a.prototype.on = function(a, b, e) {
      var c = this;
      if ("string" === typeof a || Array.isArray(a)) {
        I(this.el_, a, w(this, b));
      } else {
        var k = w(this, e), d = function() {
          return c.off(a, b, k);
        };
        d.guid = k.guid;
        this.on("dispose", d);
        e = function() {
          return c.off("dispose", d);
        };
        e.guid = k.guid;
        a.nodeName ? (I(a, b, k), I(a, "dispose", e)) : "function" === typeof a.on && (a.on(b, k), a.on("dispose", e));
      }
      return this;
    };
    a.prototype.off = function(a, b, e) {
      !a || "string" === typeof a || Array.isArray(a) ? la(this.el_, a, b) : (e = w(this, e), this.off("dispose", e), a.nodeName ? (la(a, b, e), la(a, "dispose", e)) : (a.off(b, e), a.off("dispose", e)));
      return this;
    };
    a.prototype.one = function(a, b, e) {
      var c = this;
      if ("string" === typeof a || Array.isArray(a)) {
        Ia(this.el_, a, w(this, b));
      } else {
        var k = w(this, e), d = function() {
          c.off(a, b, d);
          k.apply(null, arguments);
        };
        d.guid = k.guid;
        this.on(a, b, d);
      }
      return this;
    };
    a.prototype.trigger = function(a, b) {
      Ua(this.el_, a, b);
      return this;
    };
    a.prototype.ready = function(a, b) {
      void 0 === b && (b = !1);
      a && (this.isReady_ ? b ? a.call(this) : this.setTimeout(a, 1) : (this.readyQueue_ = this.readyQueue_ || [], this.readyQueue_.push(a)));
      return this;
    };
    a.prototype.triggerReady = function() {
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
    a.prototype.$ = function(a, b) {
      return Ja(a, b || this.contentEl());
    };
    a.prototype.$$ = function(a, b) {
      return ue(a, b || this.contentEl());
    };
    a.prototype.hasClass = function(a) {
      return l(this.el_, a);
    };
    a.prototype.addClass = function(a) {
      M(this.el_, a);
      return this;
    };
    a.prototype.removeClass = function(a) {
      qa(this.el_, a);
      return this;
    };
    a.prototype.toggleClass = function(a, b) {
      Ga(this.el_, a, b);
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
    a.prototype.width = function(a, b) {
      return this.dimension("width", a, b);
    };
    a.prototype.height = function(a, b) {
      return this.dimension("height", a, b);
    };
    a.prototype.dimensions = function(a, b) {
      return this.width(a, !0).height(b);
    };
    a.prototype.dimension = function(a, b, e) {
      if (void 0 !== b) {
        if (null === b || b !== b) {
          b = 0;
        }
        -1 !== ("" + b).indexOf("%") || -1 !== ("" + b).indexOf("px") ? this.el_.style[a] = b : this.el_.style[a] = "auto" === b ? "" : b + "px";
        e || this.trigger("resize");
        return this;
      }
      if (!this.el_) {
        return 0;
      }
      b = this.el_.style[a];
      e = b.indexOf("px");
      return -1 !== e ? parseInt(b.slice(0, e), 10) : parseInt(this.el_["offset" + U(a)], 10);
    };
    a.prototype.currentDimension = function(a) {
      var b = 0;
      if ("width" !== a && "height" !== a) {
        throw Error("currentDimension only accepts width or height value");
      }
      "function" === typeof p.getComputedStyle ? (b = p.getComputedStyle(this.el_), b = b.getPropertyValue(a) || b[a]) : this.el_.currentStyle && (a = "offset" + U(a), b = this.el_[a]);
      return b = parseFloat(b);
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
      var a = 0, b = null, e;
      this.on("touchstart", function(c) {
        1 === c.touches.length && (b = {pageX:c.touches[0].pageX, pageY:c.touches[0].pageY}, a = (new Date).getTime(), e = !0);
      });
      this.on("touchmove", function(a) {
        if (1 < a.touches.length) {
          e = !1;
        } else {
          if (b) {
            var c = a.touches[0].pageX - b.pageX;
            a = a.touches[0].pageY - b.pageY;
            10 < Math.sqrt(c * c + a * a) && (e = !1);
          }
        }
      });
      var g = function() {
        e = !1;
      };
      this.on("touchleave", g);
      this.on("touchcancel", g);
      this.on("touchend", function(c) {
        b = null;
        !0 === e && 200 > (new Date).getTime() - a && (c.preventDefault(), this.trigger("tap"));
      });
    };
    a.prototype.enableTouchActivity = function() {
      if (this.player() && this.player().reportUserActivity) {
        var a = w(this.player(), this.player().reportUserActivity), b;
        this.on("touchstart", function() {
          a();
          this.clearInterval(b);
          b = this.setInterval(a, 250);
        });
        var e = function(c) {
          a();
          this.clearInterval(b);
        };
        this.on("touchmove", a);
        this.on("touchend", e);
        this.on("touchcancel", e);
      }
    };
    a.prototype.setTimeout = function(a, b) {
      a = w(this, a);
      var c = p.setTimeout(a, b);
      a = function() {
        this.clearTimeout(c);
      };
      a.guid = "vjs-timeout-" + c;
      this.on("dispose", a);
      return c;
    };
    a.prototype.clearTimeout = function(a) {
      p.clearTimeout(a);
      var b = function() {
      };
      b.guid = "vjs-timeout-" + a;
      this.off("dispose", b);
      return a;
    };
    a.prototype.setInterval = function(a, b) {
      a = w(this, a);
      var c = p.setInterval(a, b);
      a = function() {
        this.clearInterval(c);
      };
      a.guid = "vjs-interval-" + c;
      this.on("dispose", a);
      return c;
    };
    a.prototype.clearInterval = function(a) {
      p.clearInterval(a);
      var b = function() {
      };
      b.guid = "vjs-interval-" + a;
      this.off("dispose", b);
      return a;
    };
    a.registerComponent = function(c, b) {
      a.components_ || (a.components_ = {});
      return a.components_[c] = b;
    };
    a.getComponent = function(c) {
      if (a.components_ && a.components_[c]) {
        return a.components_[c];
      }
      if (p && p.videojs && p.videojs[c]) {
        return B.warn("The " + c + " component was added to the videojs object when it should be registered using videojs.registerComponent(name, component)"), p.videojs[c];
      }
    };
    a.extend = function(c) {
      c = c || {};
      B.warn("Component.extend({}) has been deprecated, use videojs.extend(Component, {}) instead");
      var b = c.init || c.init || this.prototype.init || this.prototype.init || function() {
      }, e = function() {
        b.apply(this, arguments);
      };
      e.prototype = Object.create(this.prototype);
      e.prototype.constructor = e;
      e.extend = a.extend;
      for (var g in c) {
        c.hasOwnProperty(g) && (e.prototype[g] = c[g]);
      }
      return e;
    };
    return a;
  }();
  n.registerComponent("Component", n);
  var Y = function() {
  };
  Y.prototype.allowedEvents_ = {};
  Y.prototype.on = function(a, c) {
    var b = this.addEventListener;
    this.addEventListener = function() {
    };
    I(this, a, c);
    this.addEventListener = b;
  };
  Y.prototype.addEventListener = Y.prototype.on;
  Y.prototype.off = function(a, c) {
    la(this, a, c);
  };
  Y.prototype.removeEventListener = Y.prototype.off;
  Y.prototype.one = function(a, c) {
    var b = this.addEventListener;
    this.addEventListener = function() {
    };
    Ia(this, a, c);
    this.addEventListener = b;
  };
  Y.prototype.trigger = function(a) {
    var c = a.type || a;
    "string" === typeof a && (a = {type:c});
    a = qb(a);
    if (this.allowedEvents_[c] && this["on" + c]) {
      this["on" + c](a);
    }
    Ua(this, a);
  };
  Y.prototype.dispatchEvent = Y.prototype.trigger;
  for (var ta = {}, cb = ["requestFullscreen exitFullscreen fullscreenElement fullscreenEnabled fullscreenchange fullscreenerror".split(" "), "webkitRequestFullscreen webkitExitFullscreen webkitFullscreenElement webkitFullscreenEnabled webkitfullscreenchange webkitfullscreenerror".split(" "), "webkitRequestFullScreen webkitCancelFullScreen webkitCurrentFullScreenElement webkitCancelFullScreen webkitfullscreenchange webkitfullscreenerror".split(" "), "mozRequestFullScreen mozCancelFullScreen mozFullScreenElement mozFullScreenEnabled mozfullscreenchange mozfullscreenerror".split(" "), 
  "msRequestFullscreen msExitFullscreen msFullscreenElement msFullscreenEnabled MSFullscreenChange MSFullscreenError".split(" ")], Ne = cb[0], db, R = 0;R < cb.length;R++) {
    if (cb[R][1] in x) {
      db = cb[R];
      break;
    }
  }
  if (db) {
    for (R = 0;R < db.length;R++) {
      ta[Ne[R]] = db[R];
    }
  }
  var gd = Object.prototype.toString, eb = Object.prototype.hasOwnProperty, hd = Object.prototype.toString, Oe = Array.prototype.slice, id = function(a) {
    var c = gd.call(a), b = "[object Arguments]" === c;
    b || (b = "[object Array]" !== c && null !== a && "object" === typeof a && "number" === typeof a.length && 0 <= a.length && "[object Function]" === gd.call(a.callee));
    return b;
  }, jd = Object.prototype.propertyIsEnumerable, Pe = !jd.call({toString:null}, "toString"), Qe = jd.call(function() {
  }, "prototype"), fb = "toString toLocaleString valueOf hasOwnProperty isPrototypeOf propertyIsEnumerable constructor".split(" "), Kb = function(a) {
    var c = a.constructor;
    return c && c.prototype === a;
  }, Re = {$console:!0, $external:!0, $frame:!0, $frameElement:!0, $frames:!0, $innerHeight:!0, $innerWidth:!0, $outerHeight:!0, $outerWidth:!0, $pageXOffset:!0, $pageYOffset:!0, $parent:!0, $scrollLeft:!0, $scrollTop:!0, $scrollX:!0, $scrollY:!0, $self:!0, $webkitIndexedDB:!0, $webkitStorageInfo:!0, $window:!0}, Se = function() {
    if ("undefined" === typeof window) {
      return !1;
    }
    for (var a in window) {
      try {
        if (!Re["$" + a] && eb.call(window, a) && null !== window[a] && "object" === typeof window[a]) {
          try {
            Kb(window[a]);
          } catch (c) {
            return !0;
          }
        }
      } catch (c) {
        return !0;
      }
    }
    return !1;
  }(), gb = function(a) {
    var c = null !== a && "object" === typeof a, b = "[object Function]" === hd.call(a), e = id(a), g = c && "[object String]" === hd.call(a), k = [];
    if (!c && !b && !e) {
      throw new TypeError("Object.keys called on a non-object");
    }
    c = Qe && b;
    if (g && 0 < a.length && !eb.call(a, 0)) {
      for (g = 0;g < a.length;++g) {
        k.push(String(g));
      }
    }
    if (e && 0 < a.length) {
      for (e = 0;e < a.length;++e) {
        k.push(String(e));
      }
    } else {
      for (var d in a) {
        c && "prototype" === d || !eb.call(a, d) || k.push(String(d));
      }
    }
    if (Pe) {
      var f;
      if ("undefined" !== typeof window && Se) {
        try {
          f = Kb(a);
        } catch (J) {
          f = !1;
        }
      } else {
        f = Kb(a);
      }
      for (e = 0;e < fb.length;++e) {
        f && "constructor" === fb[e] || !eb.call(a, fb[e]) || k.push(fb[e]);
      }
    }
    return k;
  };
  gb.shim = function() {
    if (Object.keys) {
      if (!function() {
        return 2 === (Object.keys(arguments) || "").length;
      }(1, 2)) {
        var a = Object.keys;
        Object.keys = function(c) {
          return id(c) ? a(Oe.call(c)) : a(c);
        };
      }
    } else {
      Object.keys = gb;
    }
    return Object.keys || gb;
  };
  var Te = Object.prototype.hasOwnProperty, Ue = Object.prototype.toString, Ve = function(a, c, b) {
    if ("[object Function]" !== Ue.call(c)) {
      throw new TypeError("iterator must be a function");
    }
    var e = a.length;
    if (e === +e) {
      for (var g = 0;g < e;g++) {
        c.call(b, a[g], g, a);
      }
    } else {
      for (g in a) {
        Te.call(a, g) && c.call(b, a[g], g, a);
      }
    }
  }, We = "function" === typeof Symbol && "symbol" === typeof Symbol(), Xe = Object.prototype.toString, Ye = function() {
    var a = {};
    try {
      Object.defineProperty(a, "x", {enumerable:!1, value:a});
      for (var c in a) {
        return !1;
      }
      return a.x === a;
    } catch (b) {
      return !1;
    }
  }, kd = Object.defineProperty && Ye(), Lb = function(a, c) {
    var b = 2 < arguments.length ? arguments[2] : {}, e = gb(c);
    We && (e = e.concat(Object.getOwnPropertySymbols(c)));
    Ve(e, function(e) {
      var g = c[e], d = b[e];
      if (!(e in a) || "function" === typeof d && "[object Function]" === Xe.call(d) && d()) {
        kd ? Object.defineProperty(a, e, {configurable:!0, enumerable:!1, value:g, writable:!0}) : a[e] = g;
      }
    });
  };
  Lb.supportsDescriptors = !!kd;
  var ld = Object.prototype.toString, hb = Object.prototype.hasOwnProperty, md = Object.prototype.toString, Ze = Array.prototype.slice, nd = function(a) {
    var c = ld.call(a), b = "[object Arguments]" === c;
    b || (b = "[object Array]" !== c && null !== a && "object" === typeof a && "number" === typeof a.length && 0 <= a.length && "[object Function]" === ld.call(a.callee));
    return b;
  }, od = Object.prototype.propertyIsEnumerable, $e = !od.call({toString:null}, "toString"), af = od.call(function() {
  }, "prototype"), ib = "toString toLocaleString valueOf hasOwnProperty isPrototypeOf propertyIsEnumerable constructor".split(" "), Mb = function(a) {
    var c = a.constructor;
    return c && c.prototype === a;
  }, bf = {$console:!0, $external:!0, $frame:!0, $frameElement:!0, $frames:!0, $innerHeight:!0, $innerWidth:!0, $outerHeight:!0, $outerWidth:!0, $pageXOffset:!0, $pageYOffset:!0, $parent:!0, $scrollLeft:!0, $scrollTop:!0, $scrollX:!0, $scrollY:!0, $self:!0, $webkitIndexedDB:!0, $webkitStorageInfo:!0, $window:!0}, cf = function() {
    if ("undefined" === typeof window) {
      return !1;
    }
    for (var a in window) {
      try {
        if (!bf["$" + a] && hb.call(window, a) && null !== window[a] && "object" === typeof window[a]) {
          try {
            Mb(window[a]);
          } catch (c) {
            return !0;
          }
        }
      } catch (c) {
        return !0;
      }
    }
    return !1;
  }(), Na = function(a) {
    var c = null !== a && "object" === typeof a, b = "[object Function]" === md.call(a), e = nd(a), g = c && "[object String]" === md.call(a), k = [];
    if (!c && !b && !e) {
      throw new TypeError("Object.keys called on a non-object");
    }
    c = af && b;
    if (g && 0 < a.length && !hb.call(a, 0)) {
      for (g = 0;g < a.length;++g) {
        k.push(String(g));
      }
    }
    if (e && 0 < a.length) {
      for (e = 0;e < a.length;++e) {
        k.push(String(e));
      }
    } else {
      for (var d in a) {
        c && "prototype" === d || !hb.call(a, d) || k.push(String(d));
      }
    }
    if ($e) {
      var f;
      if ("undefined" !== typeof window && cf) {
        try {
          f = Mb(a);
        } catch (J) {
          f = !1;
        }
      } else {
        f = Mb(a);
      }
      for (e = 0;e < ib.length;++e) {
        f && "constructor" === ib[e] || !hb.call(a, ib[e]) || k.push(ib[e]);
      }
    }
    return k;
  };
  Na.shim = function() {
    if (Object.keys) {
      if (!function() {
        return 2 === (Object.keys(arguments) || "").length;
      }(1, 2)) {
        var a = Object.keys;
        Object.keys = function(c) {
          return nd(c) ? a(Ze.call(c)) : a(c);
        };
      }
    } else {
      Object.keys = Na;
    }
    return Object.keys || Na;
  };
  var Nb = Array.prototype.slice, df = Object.prototype.toString, ef = function(a) {
    var c = this;
    if ("function" !== typeof c || "[object Function]" !== df.call(c)) {
      throw new TypeError("Function.prototype.bind called on incompatible " + c);
    }
    for (var b = Nb.call(arguments, 1), e, g = Math.max(0, c.length - b.length), k = [], d = 0;d < g;d++) {
      k.push("$" + d);
    }
    e = Function("binder", "return function (" + k.join(",") + "){ return binder.apply(this,arguments); }")(function() {
      if (this instanceof e) {
        var g = c.apply(this, b.concat(Nb.call(arguments)));
        return Object(g) === g ? g : this;
      }
      return c.apply(a, b.concat(Nb.call(arguments)));
    });
    c.prototype && (g = function() {
    }, g.prototype = c.prototype, e.prototype = new g, g.prototype = null);
    return e;
  }, pd = Function.prototype.bind || ef, qd = function() {
    if ("function" !== typeof Symbol || "function" !== typeof Object.getOwnPropertySymbols) {
      return !1;
    }
    if ("symbol" === typeof Symbol.iterator) {
      return !0;
    }
    var a = {}, c = Symbol("test"), b = Object(c);
    if ("string" === typeof c || "[object Symbol]" !== Object.prototype.toString.call(c) || "[object Symbol]" !== Object.prototype.toString.call(b)) {
      return !1;
    }
    a[c] = 42;
    for (c in a) {
      return !1;
    }
    if (0 !== Na(a).length || "function" === typeof Object.keys && 0 !== Object.keys(a).length || "function" === typeof Object.getOwnPropertyNames && 0 !== Object.getOwnPropertyNames(a).length) {
      return !1;
    }
    b = Object.getOwnPropertySymbols(a);
    return 1 !== b.length || b[0] !== c || !Object.prototype.propertyIsEnumerable.call(a, c) || "function" === typeof Object.getOwnPropertyDescriptor && (a = Object.getOwnPropertyDescriptor(a, c), 42 !== a.value || !0 !== a.enumerable) ? !1 : !0;
  }(), rd = Object, ff = pd.call(Function.call, Array.prototype.push), sd = pd.call(Function.call, Object.prototype.propertyIsEnumerable), gf = qd ? Object.getOwnPropertySymbols : null, Ob = function(a, c) {
    if ("undefined" === typeof a || null === a) {
      throw new TypeError("target must be an object");
    }
    var b = rd(a), e, g, k, d, f, h;
    for (e = 1;e < arguments.length;++e) {
      g = rd(arguments[e]);
      d = Na(g);
      if (k = qd && (Object.getOwnPropertySymbols || gf)) {
        for (f = k(g), k = 0;k < f.length;++k) {
          h = f[k], sd(g, h) && ff(d, h);
        }
      }
      for (k = 0;k < d.length;++k) {
        h = d[k], f = g[h], sd(g, h) && (b[h] = f);
      }
    }
    return b;
  }, hf = function() {
    if (!Object.assign || !Object.preventExtensions) {
      return !1;
    }
    var a = Object.preventExtensions({1:2});
    try {
      Object.assign(a, "xy");
    } catch (c) {
      return "y" === a[1];
    }
    return !1;
  }, Pb = function() {
    if (!Object.assign) {
      return Ob;
    }
    var a;
    if (Object.assign) {
      for (var c = "abcdefghijklmnopqrst".split(""), b = {}, e = 0;e < c.length;++e) {
        b[c[e]] = c[e];
      }
      c = Object.assign({}, b);
      b = "";
      for (a in c) {
        b += a;
      }
      a = "abcdefghijklmnopqrst" !== b;
    } else {
      a = !1;
    }
    return a || hf() ? Ob : Object.assign;
  }, td = Pb();
  Lb(td, {implementation:Ob, getPolyfill:Pb, shim:function() {
    var a = Pb();
    Lb(Object, {assign:a}, {assign:function() {
      return Object.assign !== a;
    }});
    return a;
  }});
  var O = td;
  W.prototype.code = 0;
  W.prototype.message = "";
  W.prototype.status = null;
  W.errorTypes = "MEDIA_ERR_CUSTOM MEDIA_ERR_ABORTED MEDIA_ERR_NETWORK MEDIA_ERR_DECODE MEDIA_ERR_SRC_NOT_SUPPORTED MEDIA_ERR_ENCRYPTED".split(" ");
  W.defaultMessages = {1:"You aborted the media playback", 2:"A network error caused the media download to fail part-way.", 3:"The media playback was aborted due to a corruption problem or because the media used features your browser did not support.", 4:"The media could not be loaded, either because the server or network failed or because the format is not supported.", 5:"The media is encrypted and we do not have the keys to decrypt it."};
  for (var Aa = 0;Aa < W.errorTypes.length;Aa++) {
    W[W.errorTypes[Aa]] = Aa, W.prototype[W.errorTypes[Aa]] = Aa;
  }
  var ud = function(a, c) {
    var b, e = null;
    try {
      b = JSON.parse(a, c);
    } catch (g) {
      e = g;
    }
    return [e, b];
  }, Qb = function(a) {
    return "kind label language id inBandMetadataTrackDispatchType mode src".split(" ").reduce(function(c, b, e) {
      a[b] && (c[b] = a[b]);
      return c;
    }, {cues:a.cues && Array.prototype.map.call(a.cues, function(a) {
      return {startTime:a.startTime, endTime:a.endTime, text:a.text, id:a.id};
    })});
  }, vd = {textTracksToJson:function(a) {
    var c = a.$$("track"), b = Array.prototype.map.call(c, function(b) {
      return b.track;
    });
    return Array.prototype.map.call(c, function(b) {
      var a = Qb(b.track);
      b.src && (a.src = b.src);
      return a;
    }).concat(Array.prototype.filter.call(a.textTracks(), function(a) {
      return -1 === b.indexOf(a);
    }).map(Qb));
  }, jsonToTextTracks:function(a, c) {
    a.forEach(function(b) {
      var a = c.addRemoteTextTrack(b).track;
      !b.src && b.cues && b.cues.forEach(function(b) {
        return a.addCue(b);
      });
    });
    return c.textTracks();
  }, trackToJson_:Qb}, Oa = function(a) {
    function c(b, c) {
      b = a.call(this, b, c) || this;
      b.opened_ = b.hasBeenOpened_ = b.hasBeenFilled_ = !1;
      b.closeable(!b.options_.uncloseable);
      b.content(b.options_.content);
      b.contentEl_ = A("div", {className:"vjs-modal-dialog-content"}, {role:"document"});
      b.descEl_ = A("p", {className:"vjs-modal-dialog-description vjs-offscreen", id:b.el().getAttribute("aria-describedby")});
      c = b.descEl_;
      var e = b.description();
      "undefined" === typeof c.textContent ? c.innerText = e : c.textContent = e;
      b.el_.appendChild(b.descEl_);
      b.el_.appendChild(b.contentEl_);
      return b;
    }
    __extends(c, a);
    c.prototype.createEl = function() {
      return a.prototype.createEl.call(this, "div", {className:this.buildCSSClass(), tabIndex:-1}, {"aria-describedby":this.id() + "_description", "aria-hidden":"true", "aria-label":this.label(), role:"dialog"});
    };
    c.prototype.buildCSSClass = function() {
      return "vjs-modal-dialog vjs-hidden " + a.prototype.buildCSSClass.call(this);
    };
    c.prototype.handleKeyPress = function(b) {
      27 === b.which && this.closeable() && this.close();
    };
    c.prototype.label = function() {
      return this.options_.label || this.localize("Modal Window");
    };
    c.prototype.description = function() {
      var b = this.options_.description || this.localize("This is a modal window.");
      this.closeable() && (b += " " + this.localize("This modal can be closed by pressing the Escape key or activating the close button."));
      return b;
    };
    c.prototype.open = function() {
      if (!this.opened_) {
        var b = this.player();
        this.trigger("beforemodalopen");
        this.opened_ = !0;
        (this.options_.fillAlways || !this.hasBeenOpened_ && !this.hasBeenFilled_) && this.fill();
        (this.wasPlaying_ = !b.paused()) && b.pause();
        if (this.closeable()) {
          this.on(this.el_.ownerDocument, "keydown", w(this, this.handleKeyPress));
        }
        b.controls(!1);
        this.show();
        this.el().setAttribute("aria-hidden", "false");
        this.trigger("modalopen");
        this.hasBeenOpened_ = !0;
      }
      return this;
    };
    c.prototype.opened = function(b) {
      if ("boolean" === typeof b) {
        this[b ? "open" : "close"]();
      }
      return this.opened_;
    };
    c.prototype.close = function() {
      if (this.opened_) {
        var b = this.player();
        this.trigger("beforemodalclose");
        this.opened_ = !1;
        this.wasPlaying_ && b.play();
        this.closeable() && this.off(this.el_.ownerDocument, "keydown", w(this, this.handleKeyPress));
        b.controls(!0);
        this.hide();
        this.el().setAttribute("aria-hidden", "true");
        this.trigger("modalclose");
        this.options_.temporary && this.dispose();
      }
      return this;
    };
    c.prototype.closeable = function(b) {
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
    c.prototype.fill = function() {
      return this.fillWith(this.content());
    };
    c.prototype.fillWith = function(b) {
      var a = this.contentEl(), c = a.parentNode, k = a.nextSibling;
      this.trigger("beforemodalfill");
      this.hasBeenFilled_ = !0;
      c.removeChild(a);
      this.empty();
      N(a, b);
      this.trigger("modalfill");
      k ? c.insertBefore(a, k) : c.appendChild(a);
      return this;
    };
    c.prototype.empty = function() {
      this.trigger("beforemodalempty");
      S(this.contentEl());
      this.trigger("modalempty");
      return this;
    };
    c.prototype.content = function(b) {
      "undefined" !== typeof b && (this.content_ = b);
      return this.content_;
    };
    return c;
  }(n);
  Oa.prototype.options_ = {temporary:!0};
  n.registerComponent("ModalDialog", Oa);
  var wd = function() {
    function a(c) {
      var b = this;
      if (X) {
        var b = x.createElement("custom"), e;
        for (e in a.prototype) {
          "constructor" !== e && (b[e] = a.prototype[e]);
        }
      }
      a.prototype.setCues_.call(b, c);
      Object.defineProperty(b, "length", {get:function() {
        return this.length_;
      }});
      if (X) {
        return b;
      }
    }
    a.prototype.setCues_ = function(a) {
      var b = this.length || 0, c = 0, g = a.length;
      this.cues_ = a;
      this.length_ = a.length;
      a = function(b) {
        "" + b in this || Object.defineProperty(this, "" + b, {get:function() {
          return this.cues_[b];
        }});
      };
      if (b < g) {
        for (c = b;c < g;c++) {
          a.call(this, c);
        }
      }
    };
    a.prototype.getCueById = function(a) {
      for (var b = null, c = 0, g = this.length;c < g;c++) {
        var k = this[c];
        if (k.id === a) {
          b = k;
          break;
        }
      }
      return b;
    };
    return a;
  }(), jf = {alternative:"alternative", captions:"captions", main:"main", sign:"sign", subtitles:"subtitles", commentary:"commentary"}, kf = {alternative:"alternative", descriptions:"descriptions", main:"main", "main-desc":"main-desc", translation:"translation", commentary:"commentary"}, lf = {subtitles:"subtitles", captions:"captions", descriptions:"descriptions", chapters:"chapters", metadata:"metadata"}, xd = {disabled:"disabled", hidden:"hidden", showing:"showing"}, Rb = function(a) {
    function c(b) {
      void 0 === b && (b = {});
      var e = a.call(this) || this;
      if (X) {
        var e = x.createElement("custom"), g;
        for (g in c.prototype) {
          "constructor" !== g && (e[g] = c.prototype[g]);
        }
      }
      var k = {id:b.id || "vjs_track_" + xa++, kind:b.kind || "", label:b.label || "", language:b.language || ""};
      b = function(b) {
        Object.defineProperty(e, b, {get:function() {
          return k[b];
        }, set:function() {
        }});
      };
      for (var d in k) {
        b(d);
      }
      return e;
    }
    __extends(c, a);
    return c;
  }(Y), yd = function(a) {
    var c = "protocol hostname port pathname search hash host".split(" "), b = x.createElement("a");
    b.href = a;
    var e = "" === b.host && "file:" !== b.protocol, g;
    e && (g = x.createElement("div"), g.innerHTML = '<a href="' + a + '"></a>', b = g.firstChild, g.setAttribute("style", "display:none; position:absolute;"), x.body.appendChild(g));
    a = {};
    for (var k = 0;k < c.length;k++) {
      a[c[k]] = b[c[k]];
    }
    "http:" === a.protocol && (a.host = a.host.replace(/:80$/, ""));
    "https:" === a.protocol && (a.host = a.host.replace(/:443$/, ""));
    e && x.body.removeChild(g);
    return a;
  }, mf = function(a) {
    if (!a.match(/^https?:\/\//)) {
      var c = x.createElement("div");
      c.innerHTML = '<a href="' + a + '">x</a>';
      a = c.firstChild.href;
    }
    return a;
  }, zd = function(a) {
    return "string" === typeof a && (a = /^(\/?)([\s\S]*?)((?:\.{1,2}|[^\/]+?)(\.([^\.\/\?]+)))(?:[\/]*|[\?].*)$/i.exec(a)) ? a.pop().toLowerCase() : "";
  }, Sb = function(a) {
    var c = p.location;
    a = yd(a);
    return (":" === a.protocol ? c.protocol : a.protocol) + a.host !== c.protocol + c.host;
  }, Ad = function(a) {
    var c = nf.call(a);
    return "[object Function]" === c || "function" === typeof a && "[object RegExp]" !== c || "undefined" !== typeof window && (a === window.setTimeout || a === window.alert || a === window.confirm || a === window.prompt);
  }, nf = Object.prototype.toString, Tb = f(function(a, c) {
    c = a.exports = function(b) {
      return b.replace(/^\s*|\s*$/g, "");
    };
    c.left = function(b) {
      return b.replace(/^\s*/, "");
    };
    c.right = function(b) {
      return b.replace(/\s*$/, "");
    };
  }), of = Object.prototype.toString, Bd = Object.prototype.hasOwnProperty, pf = function(a, c, b) {
    if (!Ad(c)) {
      throw new TypeError("iterator must be a function");
    }
    3 > arguments.length && (b = this);
    if ("[object Array]" === of.call(a)) {
      for (var e = b, g = 0, k = a.length;g < k;g++) {
        Bd.call(a, g) && c.call(e, a[g], g, a);
      }
    } else {
      if ("string" === typeof a) {
        for (e = b, g = 0, k = a.length;g < k;g++) {
          c.call(e, a.charAt(g), g, a);
        }
      } else {
        for (g in e = b, a) {
          Bd.call(a, g) && c.call(e, a[g], g, a);
        }
      }
    }
  }, qf = Object.prototype.hasOwnProperty, Cd = p, le = Ad, ne = function(a) {
    if (!a) {
      return {};
    }
    var c = {};
    pf(Tb(a).split("\n"), function(b) {
      var a = b.indexOf(":"), g = Tb(b.slice(0, a)).toLowerCase();
      b = Tb(b.slice(a + 1));
      "undefined" === typeof c[g] ? c[g] = b : "[object Array]" === Object.prototype.toString.call(c[g]) ? c[g].push(b) : c[g] = [c[g], b];
    });
    return c;
  }, me = function() {
    for (var a = {}, c = 0;c < arguments.length;c++) {
      var b = arguments[c], e;
      for (e in b) {
        qf.call(b, e) && (a[e] = b[e]);
      }
    }
    return a;
  };
  na.XMLHttpRequest = Cd.XMLHttpRequest || oe;
  na.XDomainRequest = "withCredentials" in new na.XMLHttpRequest ? na.XMLHttpRequest : Cd.XDomainRequest;
  (function(a, c) {
    for (var b = 0;b < a.length;b++) {
      c(a[b]);
    }
  })("get put post patch head delete".split(" "), function(a) {
    na["delete" === a ? "del" : a] = function(c, b, e) {
      b = xc(c, b, e);
      b.method = a.toUpperCase();
      return yc(b);
    };
  });
  var Dd = function(a, c) {
    var b = new p.WebVTT.Parser(p, p.vttjs, p.WebVTT.StringDecoder()), e = [];
    b.oncue = function(b) {
      c.addCue(b);
    };
    b.onparsingerror = function(b) {
      e.push(b);
    };
    b.onflush = function() {
      c.trigger({type:"loadeddata", target:c});
    };
    b.parse(a);
    0 < e.length && (p.console && p.console.groupCollapsed && p.console.groupCollapsed("Text Track parsing errors for " + c.src), e.forEach(function(b) {
      return B.error(b);
    }), p.console && p.console.groupEnd && p.console.groupEnd());
    b.flush();
  }, rf = function(a, c) {
    var b = {uri:a};
    if (a = Sb(a)) {
      b.cors = a;
    }
    na(b, w(this, function(b, a, k) {
      if (b) {
        return B.error(b, a);
      }
      c.loaded_ = !0;
      if ("function" !== typeof p.WebVTT) {
        if (c.tech_) {
          var e = function() {
            return Dd(k, c);
          };
          c.tech_.on("vttjsloaded", e);
          c.tech_.on("vttjserror", function() {
            B.error("vttjs failed to load, stopping trying to process " + c.src);
            c.tech_.off("vttjsloaded", e);
          });
        }
      } else {
        Dd(k, c);
      }
    }));
  }, jb = function(a) {
    function c(b) {
      void 0 === b && (b = {});
      if (!b.tech) {
        throw Error("A tech was not provided.");
      }
      b = V(b, {kind:lf[b.kind] || "subtitles", language:b.language || b.srclang || ""});
      var e = xd[b.mode] || "disabled", g = b["default"];
      if ("metadata" === b.kind || "chapters" === b.kind) {
        e = "hidden";
      }
      var k = a.call(this, b) || this;
      k.tech_ = b.tech;
      if (X) {
        for (var d in c.prototype) {
          "constructor" !== d && (k[d] = c.prototype[d]);
        }
      }
      k.cues_ = [];
      k.activeCues_ = [];
      var f = new wd(k.cues_), h = new wd(k.activeCues_), l = !1, m = w(k, function() {
        this.activeCues;
        l && (this.trigger("cuechange"), l = !1);
      });
      if ("disabled" !== e) {
        k.tech_.on("timeupdate", m);
      }
      Object.defineProperty(k, "default", {get:function() {
        return g;
      }, set:function() {
      }});
      Object.defineProperty(k, "mode", {get:function() {
        return e;
      }, set:function(b) {
        if (xd[b]) {
          e = b;
          if ("showing" === e) {
            this.tech_.on("timeupdate", m);
          }
          this.trigger("modechange");
        }
      }});
      Object.defineProperty(k, "cues", {get:function() {
        return this.loaded_ ? f : null;
      }, set:function() {
      }});
      Object.defineProperty(k, "activeCues", {get:function() {
        if (!this.loaded_) {
          return null;
        }
        if (0 === this.cues.length) {
          return h;
        }
        for (var b = this.tech_.currentTime(), a = [], c = 0, e = this.cues.length;c < e;c++) {
          var g = this.cues[c];
          g.startTime <= b && g.endTime >= b ? a.push(g) : g.startTime === g.endTime && g.startTime <= b && g.startTime + .5 >= b && a.push(g);
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
        h.setCues_(this.activeCues_);
        return h;
      }, set:function() {
      }});
      b.src ? (k.src = b.src, rf(b.src, k)) : k.loaded_ = !0;
      return k;
    }
    __extends(c, a);
    c.prototype.addCue = function(b) {
      var a = this.tech_.textTracks();
      if (a) {
        for (var c = 0;c < a.length;c++) {
          a[c] !== this && a[c].removeCue(b);
        }
      }
      this.cues_.push(b);
      this.cues.setCues_(this.cues_);
    };
    c.prototype.removeCue = function(b) {
      for (var a = !1, c = 0, k = this.cues_.length;c < k;c++) {
        this.cues_[c] === b && (this.cues_.splice(c, 1), a = !0);
      }
      a && this.cues.setCues_(this.cues_);
    };
    return c;
  }(Rb);
  jb.prototype.allowedEvents_ = {cuechange:"cuechange"};
  var Ba = function(a) {
    function c(b) {
      void 0 === b && (b = {});
      var e = a.call(this) || this, g, k = e;
      if (X) {
        var k = x.createElement("custom"), d;
        for (d in c.prototype) {
          "constructor" !== d && (k[d] = c.prototype[d]);
        }
      }
      var f = new jb(b);
      k.kind = f.kind;
      k.src = f.src;
      k.srclang = f.language;
      k.label = f.label;
      k["default"] = f["default"];
      Object.defineProperty(k, "readyState", {get:function() {
        return g;
      }});
      Object.defineProperty(k, "track", {get:function() {
        return f;
      }});
      g = 0;
      f.addEventListener("loadeddata", function() {
        g = 2;
        k.trigger({type:"load", target:k});
      });
      return X ? k : e;
    }
    __extends(c, a);
    return c;
  }(Y);
  Ba.prototype.allowedEvents_ = {load:"load"};
  Ba.NONE = 0;
  Ba.LOADING = 1;
  Ba.LOADED = 2;
  Ba.ERROR = 3;
  var sf = function() {
    function a(c) {
      void 0 === c && (c = []);
      var b = this;
      if (X) {
        var b = x.createElement("custom"), e;
        for (e in a.prototype) {
          "constructor" !== e && (b[e] = a.prototype[e]);
        }
      }
      b.trackElements_ = [];
      Object.defineProperty(b, "length", {get:function() {
        return this.trackElements_.length;
      }});
      e = 0;
      for (var g = c.length;e < g;e++) {
        b.addTrackElement_(c[e]);
      }
      if (X) {
        return b;
      }
    }
    a.prototype.addTrackElement_ = function(a) {
      this.trackElements_.push(a);
    };
    a.prototype.getTrackElementByTrack_ = function(a) {
      for (var b, c = 0, g = this.trackElements_.length;c < g;c++) {
        if (a === this.trackElements_[c].track) {
          b = this.trackElements_[c];
          break;
        }
      }
      return b;
    };
    a.prototype.removeTrackElement_ = function(a) {
      for (var b = 0, c = this.trackElements_.length;b < c;b++) {
        if (a === this.trackElements_[b]) {
          this.trackElements_.splice(b, 1);
          break;
        }
      }
    };
    return a;
  }(), fa = function(a) {
    function c(b, e) {
      void 0 === b && (b = []);
      void 0 === e && (e = null);
      var g = a.call(this) || this;
      if (!e && (e = g, X)) {
        e = x.createElement("custom");
        for (var k in c.prototype) {
          "constructor" !== k && (e[k] = c.prototype[k]);
        }
      }
      e.tracks_ = [];
      Object.defineProperty(e, "length", {get:function() {
        return this.tracks_.length;
      }});
      for (g = 0;g < b.length;g++) {
        e.addTrack_(b[g]);
      }
      return e;
    }
    __extends(c, a);
    c.prototype.addTrack_ = function(b) {
      var a = this.tracks_.length;
      "" + a in this || Object.defineProperty(this, a, {get:function() {
        return this.tracks_[a];
      }});
      -1 === this.tracks_.indexOf(b) && (this.tracks_.push(b), this.trigger({track:b, type:"addtrack"}));
    };
    c.prototype.removeTrack_ = function(b) {
      for (var a, c = 0, k = this.length;c < k;c++) {
        if (this[c] === b) {
          a = this[c];
          a.off && a.off();
          this.tracks_.splice(c, 1);
          break;
        }
      }
      a && this.trigger({track:a, type:"removetrack"});
    };
    c.prototype.getTrackById = function(b) {
      for (var a = null, c = 0, k = this.length;c < k;c++) {
        var d = this[c];
        if (d.id === b) {
          a = d;
          break;
        }
      }
      return a;
    };
    return c;
  }(Y);
  fa.prototype.allowedEvents_ = {change:"change", addtrack:"addtrack", removetrack:"removetrack"};
  for (var tf in fa.prototype.allowedEvents_) {
    fa.prototype["on" + tf] = null;
  }
  var Ed = function(a) {
    function c(b) {
      void 0 === b && (b = []);
      var e;
      if (X) {
        e = x.createElement("custom");
        for (var g in fa.prototype) {
          "constructor" !== g && (e[g] = fa.prototype[g]);
        }
        for (g in c.prototype) {
          "constructor" !== g && (e[g] = c.prototype[g]);
        }
      }
      return e = a.call(this, b, e) || this;
    }
    __extends(c, a);
    c.prototype.addTrack_ = function(b) {
      a.prototype.addTrack_.call(this, b);
      b.addEventListener("modechange", w(this, function() {
        this.trigger("change");
      }));
    };
    c.prototype.removeTrack_ = function(b) {
      for (var a, c = 0, k = this.length;c < k;c++) {
        if (this[c] === b) {
          a = this[c];
          a.off && a.off();
          this.tracks_.splice(c, 1);
          break;
        }
      }
      a && this.trigger({track:a, type:"removetrack"});
    };
    c.prototype.getTrackById = function(b) {
      for (var a = null, c = 0, k = this.length;c < k;c++) {
        var d = this[c];
        if (d.id === b) {
          a = d;
          break;
        }
      }
      return a;
    };
    return c;
  }(fa), Ub = function(a, c) {
    for (var b = 0;b < a.length;b++) {
      c.id !== a[b].id && (a[b].selected = !1);
    }
  }, Fd = function(a) {
    function c(b) {
      void 0 === b && (b = []);
      for (var e, g = b.length - 1;0 <= g;g--) {
        if (b[g].selected) {
          Ub(b, b[g]);
          break;
        }
      }
      if (X) {
        e = x.createElement("custom");
        for (var k in fa.prototype) {
          "constructor" !== k && (e[k] = fa.prototype[k]);
        }
        for (k in c.prototype) {
          "constructor" !== k && (e[k] = c.prototype[k]);
        }
      }
      e = a.call(this, b, e) || this;
      e.changing_ = !1;
      Object.defineProperty(e, "selectedIndex", {get:function() {
        for (var b = 0;b < this.length;b++) {
          if (this[b].selected) {
            return b;
          }
        }
        return -1;
      }, set:function() {
      }});
      return e;
    }
    __extends(c, a);
    c.prototype.addTrack_ = function(b) {
      var c = this;
      b.selected && Ub(this, b);
      a.prototype.addTrack_.call(this, b);
      b.addEventListener && b.addEventListener("selectedchange", function() {
        c.changing_ || (c.changing_ = !0, Ub(c, b), c.changing_ = !1, c.trigger("change"));
      });
    };
    c.prototype.addTrack = function(b) {
      this.addTrack_(b);
    };
    c.prototype.removeTrack = function(b) {
      a.prototype.removeTrack_.call(this, b);
    };
    return c;
  }(fa), Vb = function(a, c) {
    for (var b = 0;b < a.length;b++) {
      c.id !== a[b].id && (a[b].enabled = !1);
    }
  }, Gd = function(a) {
    function c(b) {
      void 0 === b && (b = []);
      for (var e, g = b.length - 1;0 <= g;g--) {
        if (b[g].enabled) {
          Vb(b, b[g]);
          break;
        }
      }
      if (X) {
        e = x.createElement("custom");
        for (var k in fa.prototype) {
          "constructor" !== k && (e[k] = fa.prototype[k]);
        }
        for (k in c.prototype) {
          "constructor" !== k && (e[k] = c.prototype[k]);
        }
      }
      e = a.call(this, b, e) || this;
      e.changing_ = !1;
      return e;
    }
    __extends(c, a);
    c.prototype.addTrack_ = function(b) {
      var c = this;
      b.enabled && Vb(this, b);
      a.prototype.addTrack_.call(this, b);
      b.addEventListener && b.addEventListener("enabledchange", function() {
        c.changing_ || (c.changing_ = !0, Vb(c, b), c.changing_ = !1, c.trigger("change"));
      });
    };
    c.prototype.addTrack = function(b) {
      this.addTrack_(b);
    };
    c.prototype.removeTrack = function(b) {
      a.prototype.removeTrack_.call(this, b);
    };
    return c;
  }(fa), F = function(a) {
    function c(b, c) {
      void 0 === b && (b = {});
      void 0 === c && (c = function() {
      });
      b.reportTouchActivity = !1;
      c = a.call(this, null, b, c) || this;
      c.hasStarted_ = !1;
      c.on("playing", function() {
        this.hasStarted_ = !0;
      });
      c.on("loadstart", function() {
        this.hasStarted_ = !1;
      });
      c.textTracks_ = b.textTracks;
      c.videoTracks_ = b.videoTracks;
      c.audioTracks_ = b.audioTracks;
      c.featuresProgressEvents || c.manualProgressOn();
      c.featuresTimeupdateEvents || c.manualTimeUpdatesOn();
      if (!1 === b.nativeCaptions || !1 === b.nativeTextTracks) {
        c.featuresNativeTextTracks = !1;
      }
      if (!c.featuresNativeTextTracks) {
        c.on("ready", c.emulateTextTracks);
      }
      c.initTextTrackListeners();
      c.initTrackListeners();
      c.emitTapEvents();
      return c;
    }
    __extends(c, a);
    c.prototype.manualProgressOn = function() {
      this.on("durationchange", this.onDurationChange);
      this.manualProgress = !0;
      this.one("ready", this.trackProgress);
    };
    c.prototype.manualProgressOff = function() {
      this.manualProgress = !1;
      this.stopTrackingProgress();
      this.off("durationchange", this.onDurationChange);
    };
    c.prototype.trackProgress = function() {
      this.stopTrackingProgress();
      this.progressInterval = this.setInterval(w(this, function() {
        var b = this.bufferedPercent();
        this.bufferedPercent_ !== b && this.trigger("progress");
        this.bufferedPercent_ = b;
        1 === b && this.stopTrackingProgress();
      }), 500);
    };
    c.prototype.onDurationChange = function() {
      this.duration_ = this.duration();
    };
    c.prototype.buffered = function() {
      return ma(0, 0);
    };
    c.prototype.bufferedPercent = function() {
      return wc(this.buffered(), this.duration_);
    };
    c.prototype.stopTrackingProgress = function() {
      this.clearInterval(this.progressInterval);
    };
    c.prototype.manualTimeUpdatesOn = function() {
      this.manualTimeUpdates = !0;
      this.on("play", this.trackCurrentTime);
      this.on("pause", this.stopTrackingCurrentTime);
    };
    c.prototype.manualTimeUpdatesOff = function() {
      this.manualTimeUpdates = !1;
      this.stopTrackingCurrentTime();
      this.off("play", this.trackCurrentTime);
      this.off("pause", this.stopTrackingCurrentTime);
    };
    c.prototype.trackCurrentTime = function() {
      this.currentTimeInterval && this.stopTrackingCurrentTime();
      this.currentTimeInterval = this.setInterval(function() {
        this.trigger({type:"timeupdate", target:this, manuallyTriggered:!0});
      }, 250);
    };
    c.prototype.stopTrackingCurrentTime = function() {
      this.clearInterval(this.currentTimeInterval);
      this.trigger({type:"timeupdate", target:this, manuallyTriggered:!0});
    };
    c.prototype.dispose = function() {
      this.clearTracks(["audio", "video", "text"]);
      this.manualProgress && this.manualProgressOff();
      this.manualTimeUpdates && this.manualTimeUpdatesOff();
      a.prototype.dispose.call(this);
    };
    c.prototype.clearTracks = function(b) {
      var a = this;
      b = [].concat(b);
      b.forEach(function(b) {
        for (var c = a[b + "Tracks"]() || [], e = c.length;e--;) {
          var g = c[e];
          "text" === b && a.removeRemoteTextTrack(g);
          c.removeTrack_(g);
        }
      });
    };
    c.prototype.reset = function() {
    };
    c.prototype.error = function(b) {
      void 0 !== b && (this.error_ = new W(b), this.trigger("error"));
      return this.error_;
    };
    c.prototype.played = function() {
      return this.hasStarted_ ? ma(0, 0) : ma();
    };
    c.prototype.setCurrentTime = function() {
      this.manualTimeUpdates && this.trigger({type:"timeupdate", target:this, manuallyTriggered:!0});
    };
    c.prototype.initTextTrackListeners = function() {
      var b = w(this, function() {
        this.trigger("texttrackchange");
      }), a = this.textTracks();
      a && (a.addEventListener("removetrack", b), a.addEventListener("addtrack", b), this.on("dispose", w(this, function() {
        a.removeEventListener("removetrack", b);
        a.removeEventListener("addtrack", b);
      })));
    };
    c.prototype.initTrackListeners = function() {
      var b = this;
      ["video", "audio"].forEach(function(a) {
        var c = function() {
          b.trigger(a + "trackchange");
        }, e = b[a + "Tracks"]();
        e.addEventListener("removetrack", c);
        e.addEventListener("addtrack", c);
        b.on("dispose", function() {
          e.removeEventListener("removetrack", c);
          e.removeEventListener("addtrack", c);
        });
      });
    };
    c.prototype.emulateTextTracks = function() {
      var b = this, a = this.textTracks();
      if (a) {
        if (!p.WebVTT && null !== this.el().parentNode && void 0 !== this.el().parentNode) {
          var c = x.createElement("script");
          c.src = this.options_["vtt.js"] || "../node_modules/videojs-vtt.js/dist/vtt.js";
          c.onload = function() {
            b.trigger("vttjsloaded");
          };
          c.onerror = function() {
            b.trigger("vttjserror");
          };
          this.on("dispose", function() {
            c.onload = null;
            c.onerror = null;
          });
          p.WebVTT = !0;
          this.el().parentNode.appendChild(c);
        }
        var k = function() {
          return b.trigger("texttrackchange");
        }, d = function() {
          k();
          for (var b = 0;b < a.length;b++) {
            var c = a[b];
            c.removeEventListener("cuechange", k);
            "showing" === c.mode && c.addEventListener("cuechange", k);
          }
        };
        d();
        a.addEventListener("change", d);
        this.on("dispose", function() {
          a.removeEventListener("change", d);
        });
      }
    };
    c.prototype.videoTracks = function() {
      return this.videoTracks_ = this.videoTracks_ || new Fd;
    };
    c.prototype.audioTracks = function() {
      return this.audioTracks_ = this.audioTracks_ || new Gd;
    };
    c.prototype.textTracks = function() {
      return this.textTracks_ = this.textTracks_ || new Ed;
    };
    c.prototype.remoteTextTracks = function() {
      return this.remoteTextTracks_ = this.remoteTextTracks_ || new Ed;
    };
    c.prototype.remoteTextTrackEls = function() {
      return this.remoteTextTrackEls_ = this.remoteTextTrackEls_ || new sf;
    };
    c.prototype.addTextTrack = function(b, a, c) {
      if (!b) {
        throw Error("TextTrack kind is required but was not provided");
      }
      var e = void 0;
      void 0 === e && (e = {});
      var g = this.textTracks();
      e.kind = b;
      a && (e.label = a);
      c && (e.language = c);
      e.tech = this;
      b = new jb(e);
      g.addTrack_(b);
      return b;
    };
    c.prototype.addRemoteTextTrack = function(b) {
      b = V(b, {tech:this});
      b = new Ba(b);
      this.remoteTextTrackEls().addTrackElement_(b);
      this.remoteTextTracks().addTrack_(b.track);
      this.textTracks().addTrack_(b.track);
      return b;
    };
    c.prototype.removeRemoteTextTrack = function(b) {
      this.textTracks().removeTrack_(b);
      var a = this.remoteTextTrackEls().getTrackElementByTrack_(b);
      this.remoteTextTrackEls().removeTrackElement_(a);
      this.remoteTextTracks().removeTrack_(b);
    };
    c.prototype.setPoster = function() {
    };
    c.prototype.canPlayType = function() {
      return "";
    };
    c.isTech = function(b) {
      return b.prototype instanceof c || b instanceof c || b === c;
    };
    c.registerTech = function(b, a) {
      c.techs_ || (c.techs_ = {});
      if (!c.isTech(a)) {
        throw Error("Tech " + b + " must be a Tech");
      }
      return c.techs_[b] = a;
    };
    c.getTech = function(b) {
      if (c.techs_ && c.techs_[b]) {
        return c.techs_[b];
      }
      if (p && p.videojs && p.videojs[b]) {
        return B.warn("The " + b + " tech was added to the videojs object when it should be registered using videojs.registerTech(name, tech)"), p.videojs[b];
      }
    };
    return c;
  }(n);
  F.prototype.featuresVolumeControl = !0;
  F.prototype.featuresFullscreenResize = !1;
  F.prototype.featuresPlaybackRate = !1;
  F.prototype.featuresProgressEvents = !1;
  F.prototype.featuresTimeupdateEvents = !1;
  F.prototype.featuresNativeTextTracks = !1;
  F.withSourceHandlers = function(a) {
    a.registerSourceHandler = function(c, b) {
      var e = a.sourceHandlers;
      e || (e = a.sourceHandlers = []);
      void 0 === b && (b = e.length);
      e.splice(b, 0, c);
    };
    a.canPlayType = function(c) {
      for (var b = a.sourceHandlers || [], e, g = 0;g < b.length;g++) {
        if (e = b[g].canPlayType(c)) {
          return e;
        }
      }
      return "";
    };
    a.selectSourceHandler = function(c, b) {
      for (var e = a.sourceHandlers || [], g, d = 0;d < e.length;d++) {
        if (g = e[d].canHandleSource(c, b)) {
          return e[d];
        }
      }
      return null;
    };
    a.canPlaySource = function(c, b) {
      var e = a.selectSourceHandler(c, b);
      return e ? e.canHandleSource(c, b) : "";
    };
    ["seekable", "duration"].forEach(function(a) {
      var b = this[a];
      "function" === typeof b && (this[a] = function() {
        return this.sourceHandler_ && this.sourceHandler_[a] ? this.sourceHandler_[a].apply(this.sourceHandler_, arguments) : b.apply(this, arguments);
      });
    }, a.prototype);
    a.prototype.setSource = function(c) {
      var b = a.selectSourceHandler(c, this.options_);
      b || (a.nativeSourceHandler ? b = a.nativeSourceHandler : B.error("No source hander found for the current source."));
      this.disposeSourceHandler();
      this.off("dispose", this.disposeSourceHandler);
      this.currentSource_ && (this.clearTracks(["audio", "video"]), this.currentSource_ = null);
      b !== a.nativeSourceHandler && (this.currentSource_ = c, this.off(this.el_, "loadstart", a.prototype.firstLoadStartListener_), this.off(this.el_, "loadstart", a.prototype.successiveLoadStartListener_), this.one(this.el_, "loadstart", a.prototype.firstLoadStartListener_));
      this.sourceHandler_ = b.handleSource(c, this, this.options_);
      this.on("dispose", this.disposeSourceHandler);
      return this;
    };
    a.prototype.firstLoadStartListener_ = function() {
      this.one(this.el_, "loadstart", a.prototype.successiveLoadStartListener_);
    };
    a.prototype.successiveLoadStartListener_ = function() {
      this.currentSource_ = null;
      this.disposeSourceHandler();
      this.one(this.el_, "loadstart", a.prototype.successiveLoadStartListener_);
    };
    a.prototype.disposeSourceHandler = function() {
      this.sourceHandler_ && this.sourceHandler_.dispose && (this.off(this.el_, "loadstart", a.prototype.firstLoadStartListener_), this.off(this.el_, "loadstart", a.prototype.successiveLoadStartListener_), this.sourceHandler_.dispose(), this.sourceHandler_ = null);
    };
  };
  n.registerComponent("Tech", F);
  n.registerComponent("MediaTechController", F);
  F.registerTech("Tech", F);
  var uf = function(a) {
    function c(b, c, g) {
      g = a.call(this, b, c, g) || this;
      if (c.playerOptions.sources && 0 !== c.playerOptions.sources.length) {
        b.src(c.playerOptions.sources);
      } else {
        var e = 0;
        for (c = c.playerOptions.techOrder;e < c.length;e++) {
          var d = U(c[e]), f = F.getTech(d);
          d || (f = n.getComponent(d));
          if (f && f.isSupported()) {
            b.loadTech_(d);
            break;
          }
        }
      }
      return g;
    }
    __extends(c, a);
    return c;
  }(n);
  n.registerComponent("MediaLoader", uf);
  for (var Wb = p.navigator, E = function(a) {
    function c(b, e) {
      e = a.call(this, b, e) || this;
      b.source && e.ready(function() {
        this.setSource(b.source);
      }, !0);
      b.startTime && e.ready(function() {
        this.load();
        this.play();
        this.currentTime(b.startTime);
      }, !0);
      p.videojs = p.videojs || {};
      p.videojs.Flash = p.videojs.Flash || {};
      p.videojs.Flash.onReady = c.onReady;
      p.videojs.Flash.onEvent = c.onEvent;
      p.videojs.Flash.onError = c.onError;
      e.on("seeked", function() {
        this.lastSeekTarget_ = void 0;
      });
      return e;
    }
    __extends(c, a);
    c.prototype.createEl = function() {
      var b = this.options_;
      b.swf || (b.swf = "//vjs.zencdn.net/swf/5.1.0/video-js.swf");
      var a = b.techId, g = O({readyFunction:"videojs.Flash.onReady", eventProxyFunction:"videojs.Flash.onEvent", errorEventProxyFunction:"videojs.Flash.onError", autoplay:b.autoplay, preload:b.preload, loop:b.loop, muted:b.muted}, b.flashVars), d = O({wmode:"opaque", bgcolor:"#000000"}, b.params), a = O({id:a, name:a, "class":"vjs-tech"}, b.attributes);
      this.el_ = c.embed(b.swf, g, d, a);
      this.el_.tech = this;
      return this.el_;
    };
    c.prototype.play = function() {
      this.ended() && this.setCurrentTime(0);
      this.el_.vjs_play();
    };
    c.prototype.pause = function() {
      this.el_.vjs_pause();
    };
    c.prototype.src = function(b) {
      return void 0 === b ? this.currentSrc() : this.setSrc(b);
    };
    c.prototype.setSrc = function(b) {
      var a = this;
      b = mf(b);
      this.el_.vjs_src(b);
      this.autoplay() && this.setTimeout(function() {
        return a.play();
      }, 0);
    };
    c.prototype.seeking = function() {
      return void 0 !== this.lastSeekTarget_;
    };
    c.prototype.setCurrentTime = function(b) {
      var c = this.seekable();
      c.length && (b = b > c.start(0) ? b : c.start(0), this.lastSeekTarget_ = b = b < c.end(c.length - 1) ? b : c.end(c.length - 1), this.trigger("seeking"), this.el_.vjs_setProperty("currentTime", b), a.prototype.setCurrentTime.call(this));
    };
    c.prototype.currentTime = function(b) {
      return this.seeking() ? this.lastSeekTarget_ || 0 : this.el_.vjs_getProperty("currentTime");
    };
    c.prototype.currentSrc = function() {
      return this.currentSource_ ? this.currentSource_.src : this.el_.vjs_getProperty("currentSrc");
    };
    c.prototype.duration = function() {
      if (0 === this.readyState()) {
        return NaN;
      }
      var b = this.el_.vjs_getProperty("duration");
      return 0 <= b ? b : Infinity;
    };
    c.prototype.load = function() {
      this.el_.vjs_load();
    };
    c.prototype.poster = function() {
      this.el_.vjs_getProperty("poster");
    };
    c.prototype.setPoster = function() {
    };
    c.prototype.seekable = function() {
      var b = this.duration();
      return 0 === b ? ma() : ma(0, b);
    };
    c.prototype.buffered = function() {
      var b = this.el_.vjs_getProperty("buffered");
      return 0 === b.length ? ma() : ma(b[0][0], b[0][1]);
    };
    c.prototype.supportsFullScreen = function() {
      return !1;
    };
    c.prototype.enterFullScreen = function() {
      return !1;
    };
    return c;
  }(F), zc = E.prototype, Xb = "rtmpConnection rtmpStream preload defaultPlaybackRate playbackRate autoplay loop mediaGroup controller controls volume muted defaultMuted".split(" "), Hd = "networkState readyState initialTime startOffsetTime paused ended videoWidth videoHeight".split(" "), R = 0;R < Xb.length;R++) {
    Ac(Xb[R]), pe(Xb[R]);
  }
  for (R = 0;R < Hd.length;R++) {
    Ac(Hd[R]);
  }
  E.isSupported = function() {
    return 10 <= E.version()[0];
  };
  F.withSourceHandlers(E);
  E.nativeSourceHandler = {};
  E.nativeSourceHandler.canPlayType = function(a) {
    return a in E.formats ? "maybe" : "";
  };
  E.nativeSourceHandler.canHandleSource = function(a, c) {
    a = a.type ? a.type.replace(/;.*/, "").toLowerCase() : (a = zd(a.src)) ? "video/" + a : "";
    return E.nativeSourceHandler.canPlayType(a);
  };
  E.nativeSourceHandler.handleSource = function(a, c, b) {
    c.setSrc(a.src);
  };
  E.nativeSourceHandler.dispose = function() {
  };
  E.registerSourceHandler(E.nativeSourceHandler);
  E.formats = {"video/flv":"FLV", "video/x-flv":"FLV", "video/mp4":"MP4", "video/m4v":"MP4"};
  E.onReady = function(a) {
    (a = (a = ka(a)) && a.tech) && a.el() && E.checkReady(a);
  };
  E.checkReady = function(a) {
    a.el() && (a.el().vjs_getProperty ? a.triggerReady() : this.setTimeout(function() {
      E.checkReady(a);
    }, 50));
  };
  E.onEvent = function(a, c) {
    ka(a).tech.trigger(c, Array.prototype.slice.call(arguments, 2));
  };
  E.onError = function(a, c) {
    a = ka(a).tech;
    if ("srcnotfound" === c) {
      return a.error(4);
    }
    a.error("FLASH: " + c);
  };
  E.version = function() {
    var a = "0,0,0";
    try {
      a = (new p.ActiveXObject("ShockwaveFlash.ShockwaveFlash")).GetVariable("$version").replace(/\D+/g, ",").match(/^,?(.+),?$/)[1];
    } catch (c) {
      try {
        Wb.mimeTypes["application/x-shockwave-flash"].enabledPlugin && (a = (Wb.plugins["Shockwave Flash 2.0"] || Wb.plugins["Shockwave Flash"]).description.replace(/\D+/g, ",").match(/^,?(.+),?$/)[1]);
      } catch (b) {
      }
    }
    return a.split(",");
  };
  E.embed = function(a, c, b, e) {
    a = E.getEmbedCode(a, c, b, e);
    return A("div", {innerHTML:a}).childNodes[0];
  };
  E.getEmbedCode = function(a, c, b, e) {
    var g = "", d = "", f = "";
    c && Object.getOwnPropertyNames(c).forEach(function(b) {
      g += b + "=" + c[b] + "&amp;";
    });
    b = O({movie:a, flashvars:g, allowScriptAccess:"always", allowNetworking:"all"}, b);
    Object.getOwnPropertyNames(b).forEach(function(a) {
      d += '<param name="' + a + '" value="' + b[a] + '" />';
    });
    e = O({data:a, width:"100%", height:"100%"}, e);
    Object.getOwnPropertyNames(e).forEach(function(b) {
      f += b + '="' + e[b] + '" ';
    });
    return '<object type="application/x-shockwave-flash" ' + f + ">" + d + "</object>";
  };
  (function(a) {
    a.streamingFormats = {"rtmp/mp4":"MP4", "rtmp/flv":"FLV"};
    a.streamFromParts = function(a, b) {
      return a + "&" + b;
    };
    a.streamToParts = function(a) {
      var b = {connection:"", stream:""};
      if (!a) {
        return b;
      }
      var c = a.search(/&(?!\w+=)/), g;
      -1 !== c ? g = c + 1 : (c = g = a.lastIndexOf("/") + 1, 0 === c && (c = g = a.length));
      b.connection = a.substring(0, c);
      b.stream = a.substring(g, a.length);
      return b;
    };
    a.isStreamingType = function(c) {
      return c in a.streamingFormats;
    };
    a.RTMP_RE = /^rtmp[set]?:\/\//i;
    a.isStreamingSrc = function(c) {
      return a.RTMP_RE.test(c);
    };
    a.rtmpSourceHandler = {};
    a.rtmpSourceHandler.canPlayType = function(c) {
      return a.isStreamingType(c) ? "maybe" : "";
    };
    a.rtmpSourceHandler.canHandleSource = function(c, b) {
      return (b = a.rtmpSourceHandler.canPlayType(c.type)) ? b : a.isStreamingSrc(c.src) ? "maybe" : "";
    };
    a.rtmpSourceHandler.handleSource = function(c, b, e) {
      c = a.streamToParts(c.src);
      b.setRtmpConnection(c.connection);
      b.setRtmpStream(c.stream);
    };
    a.registerSourceHandler(a.rtmpSourceHandler);
    return a;
  })(E);
  n.registerComponent("Flash", E);
  F.registerTech("Flash", E);
  var Ca = function(a) {
    function c(b, c) {
      b = a.call(this, b, c) || this;
      b.emitTapEvents();
      b.on("tap", b.handleClick);
      b.on("click", b.handleClick);
      b.on("focus", b.handleFocus);
      b.on("blur", b.handleBlur);
      return b;
    }
    __extends(c, a);
    c.prototype.createEl = function(b, c, g) {
      void 0 === b && (b = "div");
      void 0 === c && (c = {});
      void 0 === g && (g = {});
      c = O({className:this.buildCSSClass(), tabIndex:0}, c);
      "button" === b && B.error("Creating a ClickableComponent with an HTML element of " + b + " is not supported; use a Button instead.");
      g = O({role:"button", "aria-live":"polite"}, g);
      b = a.prototype.createEl.call(this, b, c, g);
      this.createControlTextEl(b);
      return b;
    };
    c.prototype.createControlTextEl = function(b) {
      this.controlTextEl_ = A("span", {className:"vjs-control-text"});
      b && b.appendChild(this.controlTextEl_);
      this.controlText(this.controlText_, b);
      return this.controlTextEl_;
    };
    c.prototype.controlText = function(b, a) {
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
    c.prototype.buildCSSClass = function() {
      return "vjs-control vjs-button " + a.prototype.buildCSSClass.call(this);
    };
    c.prototype.addChild = function(b, c) {
      void 0 === c && (c = {});
      return a.prototype.addChild.call(this, b, c);
    };
    c.prototype.enable = function() {
      this.removeClass("vjs-disabled");
      this.el_.setAttribute("aria-disabled", "false");
      return this;
    };
    c.prototype.disable = function() {
      this.addClass("vjs-disabled");
      this.el_.setAttribute("aria-disabled", "true");
      return this;
    };
    c.prototype.handleClick = function() {
    };
    c.prototype.handleFocus = function() {
      I(x, "keydown", w(this, this.handleKeyPress));
    };
    c.prototype.handleKeyPress = function(b) {
      32 === b.which || 13 === b.which ? (b.preventDefault(), this.handleClick(b)) : a.prototype.handleKeyPress && a.prototype.handleKeyPress.call(this, b);
    };
    c.prototype.handleBlur = function() {
      la(x, "keydown", w(this, this.handleKeyPress));
    };
    return c;
  }(n);
  n.registerComponent("ClickableComponent", Ca);
  var vf = function(a) {
    function c(b, c) {
      c = a.call(this, b, c) || this;
      c.update();
      b.on("posterchange", w(c, c.update));
      return c;
    }
    __extends(c, a);
    c.prototype.dispose = function() {
      this.player().off("posterchange", this.update);
      a.prototype.dispose.call(this);
    };
    c.prototype.createEl = function() {
      var b = A("div", {className:"vjs-poster", tabIndex:-1});
      Lc || (this.fallbackImg_ = A("img"), b.appendChild(this.fallbackImg_));
      return b;
    };
    c.prototype.update = function() {
      var b = this.player().poster();
      this.setSrc(b);
      b ? this.show() : this.hide();
    };
    c.prototype.setSrc = function(b) {
      if (this.fallbackImg_) {
        this.fallbackImg_.src = b;
      } else {
        var a = "";
        b && (a = 'url("' + b + '")');
        this.el_.style.backgroundImage = a;
      }
    };
    c.prototype.handleClick = function() {
      this.player_.paused() ? this.player_.play() : this.player_.pause();
    };
    return c;
  }(Ca);
  n.registerComponent("PosterImage", vf);
  var wf = {monospace:"monospace", sansSerif:"sans-serif", serif:"serif", monospaceSansSerif:'"Andale Mono", "Lucida Console", monospace', monospaceSerif:'"Courier New", monospace', proportionalSansSerif:"sans-serif", proportionalSerif:"serif", casual:'"Comic Sans MS", Impact, fantasy', script:'"Monotype Corsiva", cursive', smallcaps:'"Andale Mono", "Lucida Console", monospace, sans-serif'}, xf = function(a) {
    function c(b, c, g) {
      c = a.call(this, b, c, g) || this;
      b.on("loadstart", w(c, c.toggleDisplay));
      b.on("texttrackchange", w(c, c.updateDisplay));
      b.ready(w(c, function() {
        if (b.tech_ && b.tech_.featuresNativeTextTracks) {
          this.hide();
        } else {
          b.on("fullscreenchange", w(this, this.updateDisplay));
          for (var a = this.options_.playerOptions.tracks || [], c = 0;c < a.length;c++) {
            this.player_.addRemoteTextTrack(a[c]);
          }
          var a = {captions:1, subtitles:1}, e = this.player_.textTracks(), g, d;
          if (e) {
            for (c = 0;c < e.length;c++) {
              var f = e[c];
              f["default"] && ("descriptions" !== f.kind || g ? f.kind in a && !d && (d = f) : g = f);
            }
            d ? d.mode = "showing" : g && (g.mode = "showing");
          }
        }
      }));
      return c;
    }
    __extends(c, a);
    c.prototype.toggleDisplay = function() {
      this.player_.tech_ && this.player_.tech_.featuresNativeTextTracks ? this.hide() : this.show();
    };
    c.prototype.createEl = function() {
      return a.prototype.createEl.call(this, "div", {className:"vjs-text-track-display"}, {"aria-live":"assertive", "aria-atomic":"true"});
    };
    c.prototype.clearDisplay = function() {
      "function" === typeof p.WebVTT && p.WebVTT.processCues(p, [], this.el_);
    };
    c.prototype.updateDisplay = function() {
      var b = this.player_.textTracks();
      this.clearDisplay();
      if (b) {
        for (var a = null, c = null, d = b.length;d--;) {
          var f = b[d];
          "showing" === f.mode && ("descriptions" === f.kind ? a = f : c = f);
        }
        c ? this.updateForTrack(c) : a && this.updateForTrack(a);
      }
    };
    c.prototype.updateForTrack = function(b) {
      if ("function" === typeof p.WebVTT && b.activeCues) {
        for (var a = this.player_.textTrackSettings.getValues(), c = [], d = 0;d < b.activeCues.length;d++) {
          c.push(b.activeCues[d]);
        }
        p.WebVTT.processCues(p, c, this.el_);
        for (b = c.length;b--;) {
          if (d = c[b]) {
            d = d.displayState;
            a.color && (d.firstChild.style.color = a.color);
            if (a.textOpacity) {
              var f = tb(a.color || "#fff", a.textOpacity);
              try {
                d.firstChild.style.color = f;
              } catch (ha) {
              }
            }
            a.backgroundColor && (d.firstChild.style.backgroundColor = a.backgroundColor);
            if (a.backgroundOpacity) {
              f = tb(a.backgroundColor || "#000", a.backgroundOpacity);
              try {
                d.firstChild.style.backgroundColor = f;
              } catch (ha) {
              }
            }
            if (a.windowColor) {
              if (a.windowOpacity) {
                f = tb(a.windowColor, a.windowOpacity);
                try {
                  d.style.backgroundColor = f;
                } catch (ha) {
                }
              } else {
                d.style.backgroundColor = a.windowColor;
              }
            }
            a.edgeStyle && ("dropshadow" === a.edgeStyle ? d.firstChild.style.textShadow = "2px 2px 3px #222, 2px 2px 4px #222, 2px 2px 5px #222" : "raised" === a.edgeStyle ? d.firstChild.style.textShadow = "1px 1px #222, 2px 2px #222, 3px 3px #222" : "depressed" === a.edgeStyle ? d.firstChild.style.textShadow = "1px 1px #ccc, 0 1px #ccc, -1px -1px #222, 0 -1px #222" : "uniform" === a.edgeStyle && (d.firstChild.style.textShadow = "0 0 4px #222, 0 0 4px #222, 0 0 4px #222, 0 0 4px #222"));
            a.fontPercent && 1 !== a.fontPercent && (f = p.parseFloat(d.style.fontSize), d.style.fontSize = f * a.fontPercent + "px", d.style.height = "auto", d.style.top = "auto", d.style.bottom = "2px");
            a.fontFamily && "default" !== a.fontFamily && ("small-caps" === a.fontFamily ? d.firstChild.style.fontVariant = "small-caps" : d.firstChild.style.fontFamily = wf[a.fontFamily]);
          }
        }
      }
    };
    return c;
  }(n);
  n.registerComponent("TextTrackDisplay", xf);
  var yf = function(a) {
    function c() {
      return a.apply(this, arguments) || this;
    }
    __extends(c, a);
    c.prototype.createEl = function() {
      return a.prototype.createEl.call(this, "div", {className:"vjs-loading-spinner", dir:"ltr"});
    };
    return c;
  }(n);
  n.registerComponent("LoadingSpinner", yf);
  var Da = function(a) {
    function c(b, c) {
      return a.call(this, b, c) || this;
    }
    __extends(c, a);
    c.prototype.createEl = function(b, a, c) {
      void 0 === b && (b = "button");
      void 0 === a && (a = {});
      void 0 === c && (c = {});
      a = O({className:this.buildCSSClass()}, a);
      "button" !== b && (B.warn("Creating a Button with an HTML element of " + b + " is deprecated; use ClickableComponent instead."), a = O({tabIndex:0}, a), c = O({role:"button"}, c));
      c = O({type:"button", "aria-live":"polite"}, c);
      b = n.prototype.createEl.call(this, b, a, c);
      this.createControlTextEl(b);
      return b;
    };
    c.prototype.addChild = function(b, a) {
      void 0 === a && (a = {});
      B.warn("Adding an actionable (user controllable) child to a Button (" + this.constructor.name + ") is not supported; use a ClickableComponent instead.");
      return n.prototype.addChild.call(this, b, a);
    };
    c.prototype.handleKeyPress = function(b) {
      32 !== b.which && 13 !== b.which && a.prototype.handleKeyPress.call(this, b);
    };
    return c;
  }(Ca);
  n.registerComponent("Button", Da);
  var Id = function(a) {
    function c(b, c) {
      return a.call(this, b, c) || this;
    }
    __extends(c, a);
    c.prototype.buildCSSClass = function() {
      return "vjs-big-play-button";
    };
    c.prototype.handleClick = function() {
      this.player_.play();
    };
    return c;
  }(Da);
  Id.prototype.controlText_ = "Play Video";
  n.registerComponent("BigPlayButton", Id);
  var zf = function(a) {
    function c(b, c) {
      b = a.call(this, b, c) || this;
      b.controlText(c && c.controlText || b.localize("Close"));
      return b;
    }
    __extends(c, a);
    c.prototype.buildCSSClass = function() {
      return "vjs-close-button " + a.prototype.buildCSSClass.call(this);
    };
    c.prototype.handleClick = function() {
      this.trigger({type:"close", bubbles:!1});
    };
    return c;
  }(Da);
  n.registerComponent("CloseButton", zf);
  var Jd = function(a) {
    function c(b, c) {
      c = a.call(this, b, c) || this;
      c.on(b, "play", c.handlePlay);
      c.on(b, "pause", c.handlePause);
      return c;
    }
    __extends(c, a);
    c.prototype.buildCSSClass = function() {
      return "vjs-play-control " + a.prototype.buildCSSClass.call(this);
    };
    c.prototype.handleClick = function() {
      this.player_.paused() ? this.player_.play() : this.player_.pause();
    };
    c.prototype.handlePlay = function() {
      this.removeClass("vjs-paused");
      this.addClass("vjs-playing");
      this.controlText("Pause");
    };
    c.prototype.handlePause = function() {
      this.removeClass("vjs-playing");
      this.addClass("vjs-paused");
      this.controlText("Play");
    };
    return c;
  }(Da);
  Jd.prototype.controlText_ = "Play";
  n.registerComponent("PlayToggle", Jd);
  var Af = function(a) {
    function c(b, c) {
      c = a.call(this, b, c) || this;
      c.on(b, "timeupdate", c.updateContent);
      return c;
    }
    __extends(c, a);
    c.prototype.createEl = function() {
      var b = a.prototype.createEl.call(this, "div", {className:"vjs-current-time vjs-time-control vjs-control"});
      this.contentEl_ = A("div", {className:"vjs-current-time-display", innerHTML:'<span class="vjs-control-text">Current Time </span>0:00'}, {"aria-live":"off"});
      b.appendChild(this.contentEl_);
      return b;
    };
    c.prototype.updateContent = function() {
      var b = this.player_.scrubbing() ? this.player_.getCache().currentTime : this.player_.currentTime(), a = this.localize("Current Time"), b = ra(b, this.player_.duration());
      b !== this.formattedTime_ && (this.formattedTime_ = b, this.contentEl_.innerHTML = '<span class="vjs-control-text">' + a + "</span> " + b);
    };
    return c;
  }(n);
  n.registerComponent("CurrentTimeDisplay", Af);
  var Bf = function(a) {
    function c(b, c) {
      c = a.call(this, b, c) || this;
      c.on(b, "durationchange", c.updateContent);
      c.on(b, "timeupdate", c.updateContent);
      c.on(b, "loadedmetadata", c.updateContent);
      return c;
    }
    __extends(c, a);
    c.prototype.createEl = function() {
      var b = a.prototype.createEl.call(this, "div", {className:"vjs-duration vjs-time-control vjs-control"});
      this.contentEl_ = A("div", {className:"vjs-duration-display", innerHTML:'<span class="vjs-control-text">' + this.localize("Duration Time") + "</span> 0:00"}, {"aria-live":"off"});
      b.appendChild(this.contentEl_);
      return b;
    };
    c.prototype.updateContent = function() {
      var b = this.player_.duration();
      if (b && this.duration_ !== b) {
        this.duration_ = b;
        var a = this.localize("Duration Time"), b = ra(b);
        this.contentEl_.innerHTML = '<span class="vjs-control-text">' + a + "</span> " + b;
      }
    };
    return c;
  }(n);
  n.registerComponent("DurationDisplay", Bf);
  var Cf = function(a) {
    function c() {
      return a.apply(this, arguments) || this;
    }
    __extends(c, a);
    c.prototype.createEl = function() {
      return a.prototype.createEl.call(this, "div", {className:"vjs-time-control vjs-time-divider", innerHTML:"<div><span>/</span></div>"});
    };
    return c;
  }(n);
  n.registerComponent("TimeDivider", Cf);
  var Df = function(a) {
    function c(b, c) {
      c = a.call(this, b, c) || this;
      c.on(b, "timeupdate", c.updateContent);
      c.on(b, "durationchange", c.updateContent);
      return c;
    }
    __extends(c, a);
    c.prototype.createEl = function() {
      var b = a.prototype.createEl.call(this, "div", {className:"vjs-remaining-time vjs-time-control vjs-control"});
      this.contentEl_ = A("div", {className:"vjs-remaining-time-display", innerHTML:'<span class="vjs-control-text">' + this.localize("Remaining Time") + "</span> -0:00"}, {"aria-live":"off"});
      b.appendChild(this.contentEl_);
      return b;
    };
    c.prototype.updateContent = function() {
      if (this.player_.duration()) {
        var b = this.localize("Remaining Time"), a = ra(this.player_.remainingTime());
        a !== this.formattedTime_ && (this.formattedTime_ = a, this.contentEl_.innerHTML = '<span class="vjs-control-text">' + b + "</span> -" + a);
      }
    };
    return c;
  }(n);
  n.registerComponent("RemainingTimeDisplay", Df);
  var Ef = function(a) {
    function c(b, c) {
      b = a.call(this, b, c) || this;
      b.updateShowing();
      b.on(b.player(), "durationchange", b.updateShowing);
      return b;
    }
    __extends(c, a);
    c.prototype.createEl = function() {
      var b = a.prototype.createEl.call(this, "div", {className:"vjs-live-control vjs-control"});
      this.contentEl_ = A("div", {className:"vjs-live-display", innerHTML:'<span class="vjs-control-text">' + this.localize("Stream Type") + "</span>" + this.localize("LIVE")}, {"aria-live":"off"});
      b.appendChild(this.contentEl_);
      return b;
    };
    c.prototype.updateShowing = function() {
      Infinity === this.player().duration() ? this.show() : this.hide();
    };
    return c;
  }(n);
  n.registerComponent("LiveDisplay", Ef);
  var Yb = function(a) {
    function c(b, c) {
      c = a.call(this, b, c) || this;
      c.bar = c.getChild(c.options_.barName);
      c.vertical(!!c.options_.vertical);
      c.on("mousedown", c.handleMouseDown);
      c.on("touchstart", c.handleMouseDown);
      c.on("focus", c.handleFocus);
      c.on("blur", c.handleBlur);
      c.on("click", c.handleClick);
      c.on(b, "controlsvisible", c.update);
      c.on(b, c.playerEvent, c.update);
      return c;
    }
    __extends(c, a);
    c.prototype.createEl = function(b, c, g) {
      void 0 === c && (c = {});
      void 0 === g && (g = {});
      c.className += " vjs-slider";
      c = O({tabIndex:0}, c);
      g = O({role:"slider", "aria-valuenow":0, "aria-valuemin":0, "aria-valuemax":100, tabIndex:0}, g);
      return a.prototype.createEl.call(this, b, c, g);
    };
    c.prototype.handleMouseDown = function(b) {
      var a = this.bar.el_.ownerDocument;
      b.preventDefault();
      Zd();
      this.addClass("vjs-sliding");
      this.trigger("slideractive");
      this.on(a, "mousemove", this.handleMouseMove);
      this.on(a, "mouseup", this.handleMouseUp);
      this.on(a, "touchmove", this.handleMouseMove);
      this.on(a, "touchend", this.handleMouseUp);
      this.handleMouseMove(b);
    };
    c.prototype.handleMouseMove = function() {
    };
    c.prototype.handleMouseUp = function() {
      var b = this.bar.el_.ownerDocument;
      K();
      this.removeClass("vjs-sliding");
      this.trigger("sliderinactive");
      this.off(b, "mousemove", this.handleMouseMove);
      this.off(b, "mouseup", this.handleMouseUp);
      this.off(b, "touchmove", this.handleMouseMove);
      this.off(b, "touchend", this.handleMouseUp);
      this.update();
    };
    c.prototype.update = function() {
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
    c.prototype.calculateDistance = function(b) {
      b = kc(this.el_, b);
      return this.vertical() ? b.y : b.x;
    };
    c.prototype.handleFocus = function() {
      this.on(this.bar.el_.ownerDocument, "keydown", this.handleKeyPress);
    };
    c.prototype.handleKeyPress = function(b) {
      if (37 === b.which || 40 === b.which) {
        b.preventDefault(), this.stepBack();
      } else {
        if (38 === b.which || 39 === b.which) {
          b.preventDefault(), this.stepForward();
        }
      }
    };
    c.prototype.handleBlur = function() {
      this.off(this.bar.el_.ownerDocument, "keydown", this.handleKeyPress);
    };
    c.prototype.handleClick = function(b) {
      b.stopImmediatePropagation();
      b.preventDefault();
    };
    c.prototype.vertical = function(b) {
      if (void 0 === b) {
        return this.vertical_ || !1;
      }
      (this.vertical_ = !!b) ? this.addClass("vjs-slider-vertical") : this.addClass("vjs-slider-horizontal");
      return this;
    };
    return c;
  }(n);
  n.registerComponent("Slider", Yb);
  var Ff = function(a) {
    function c(b, c) {
      c = a.call(this, b, c) || this;
      c.partEls_ = [];
      c.on(b, "progress", c.update);
      return c;
    }
    __extends(c, a);
    c.prototype.createEl = function() {
      return a.prototype.createEl.call(this, "div", {className:"vjs-load-progress", innerHTML:'<span class="vjs-control-text"><span>' + this.localize("Loaded") + "</span>: 0%</span>"});
    };
    c.prototype.update = function() {
      var b = this.player_.buffered(), a = this.player_.duration(), c = this.player_.bufferedEnd(), d = this.partEls_, f = function(b, a) {
        b = b / a || 0;
        return 100 * (1 <= b ? 1 : b) + "%";
      };
      this.el_.style.width = f(c, a);
      for (a = 0;a < b.length;a++) {
        var h = b.start(a), l = b.end(a), m = d[a];
        m || (m = this.el_.appendChild(A()), d[a] = m);
        m.style.left = f(h, c);
        m.style.width = f(l - h, c);
      }
      for (a = d.length;a > b.length;a--) {
        this.el_.removeChild(d[a - 1]);
      }
      d.length = b.length;
    };
    return c;
  }(n);
  n.registerComponent("LoadProgressBar", Ff);
  var Gf = function(a) {
    function c(b, c) {
      var e = a.call(this, b, c) || this;
      e.updateDataAttr();
      e.on(b, "timeupdate", e.updateDataAttr);
      b.ready(w(e, e.updateDataAttr));
      c.playerOptions && c.playerOptions.controlBar && c.playerOptions.controlBar.progressControl && c.playerOptions.controlBar.progressControl.keepTooltipsInside && (e.keepTooltipsInside = c.playerOptions.controlBar.progressControl.keepTooltipsInside);
      e.keepTooltipsInside && e.addClass("vjs-keep-tooltips-inside");
      return e;
    }
    __extends(c, a);
    c.prototype.createEl = function() {
      return a.prototype.createEl.call(this, "div", {className:"vjs-play-progress vjs-slider-bar", innerHTML:'<span class="vjs-control-text"><span>' + this.localize("Progress") + "</span>: 0%</span>"});
    };
    c.prototype.updateDataAttr = function() {
      var b = this.player_.scrubbing() ? this.player_.getCache().currentTime : this.player_.currentTime();
      this.el_.setAttribute("data-current-time", ra(b, this.player_.duration()));
    };
    return c;
  }(n);
  n.registerComponent("PlayProgressBar", Gf);
  var Hf = function(a) {
    function c(b, c) {
      c = a.call(this, b, c) || this;
      c.updateDataAttr();
      c.on(b, "timeupdate", c.updateDataAttr);
      b.ready(w(c, c.updateDataAttr));
      return c;
    }
    __extends(c, a);
    c.prototype.createEl = function() {
      var b = a.prototype.createEl.call(this, "div", {className:"vjs-tooltip-progress-bar vjs-slider-bar", innerHTML:'<div class="vjs-time-tooltip"></div>\n        <span class="vjs-control-text"><span>' + this.localize("Progress") + "</span>: 0%</span>"});
      this.tooltip = b.querySelector(".vjs-time-tooltip");
      return b;
    };
    c.prototype.updateDataAttr = function() {
      var b = this.player_.scrubbing() ? this.player_.getCache().currentTime : this.player_.currentTime(), b = ra(b, this.player_.duration());
      this.el_.setAttribute("data-current-time", b);
      this.tooltip.innerHTML = b;
    };
    return c;
  }(n);
  n.registerComponent("TooltipProgressBar", Hf);
  var Zb = function(a) {
    function c(b, c) {
      var e = a.call(this, b, c) || this;
      e.on(b, "timeupdate", e.updateProgress);
      e.on(b, "ended", e.updateProgress);
      b.ready(w(e, e.updateProgress));
      c.playerOptions && c.playerOptions.controlBar && c.playerOptions.controlBar.progressControl && c.playerOptions.controlBar.progressControl.keepTooltipsInside && (e.keepTooltipsInside = c.playerOptions.controlBar.progressControl.keepTooltipsInside);
      e.keepTooltipsInside && (e.tooltipProgressBar = e.addChild("TooltipProgressBar"));
      return e;
    }
    __extends(c, a);
    c.prototype.createEl = function() {
      return a.prototype.createEl.call(this, "div", {className:"vjs-progress-holder"}, {"aria-label":"progress bar"});
    };
    c.prototype.updateProgress = function() {
      this.updateAriaAttributes(this.el_);
      if (this.keepTooltipsInside) {
        this.updateAriaAttributes(this.tooltipProgressBar.el_);
        this.tooltipProgressBar.el_.style.width = this.bar.el_.style.width;
        var b = parseFloat(p.getComputedStyle(this.player().el()).width), a = parseFloat(p.getComputedStyle(this.tooltipProgressBar.tooltip).width), c = this.tooltipProgressBar.el().style;
        c.maxWidth = Math.floor(b - a / 2) + "px";
        c.minWidth = Math.ceil(a / 2) + "px";
        c.right = "-" + a / 2 + "px";
      }
    };
    c.prototype.updateAriaAttributes = function(b) {
      var a = this.player_.scrubbing() ? this.player_.getCache().currentTime : this.player_.currentTime();
      b.setAttribute("aria-valuenow", (100 * this.getPercent()).toFixed(2));
      b.setAttribute("aria-valuetext", ra(a, this.player_.duration()));
    };
    c.prototype.getPercent = function() {
      var b = this.player_.currentTime() / this.player_.duration();
      return 1 <= b ? 1 : b;
    };
    c.prototype.handleMouseDown = function(b) {
      a.prototype.handleMouseDown.call(this, b);
      this.player_.scrubbing(!0);
      this.videoWasPlaying = !this.player_.paused();
      this.player_.pause();
    };
    c.prototype.handleMouseMove = function(b) {
      b = this.calculateDistance(b) * this.player_.duration();
      b === this.player_.duration() && (b -= .1);
      this.player_.currentTime(b);
    };
    c.prototype.handleMouseUp = function(b) {
      a.prototype.handleMouseUp.call(this, b);
      this.player_.scrubbing(!1);
      this.videoWasPlaying && this.player_.play();
    };
    c.prototype.stepForward = function() {
      this.player_.currentTime(this.player_.currentTime() + 5);
    };
    c.prototype.stepBack = function() {
      this.player_.currentTime(this.player_.currentTime() - 5);
    };
    return c;
  }(Yb);
  Zb.prototype.options_ = {children:["loadProgressBar", "mouseTimeDisplay", "playProgressBar"], barName:"playProgressBar"};
  Zb.prototype.playerEvent = "timeupdate";
  n.registerComponent("SeekBar", Zb);
  var $b = Gb(Date, "now") || function() {
    return (new Date).getTime();
  }, If = Math.max, Jf = function(a, c, b) {
    function e(b, c) {
      c && clearTimeout(c);
      l = q = r = void 0;
      b && (t = $b(), m = a.apply(p, h), q || l || (h = p = void 0));
    }
    function g() {
      var b = c - ($b() - n);
      0 >= b || b > c ? e(r, l) : q = setTimeout(g, b);
    }
    function d() {
      e(v, q);
    }
    function f() {
      h = arguments;
      n = $b();
      p = this;
      r = v && (q || !w);
      if (!1 === u) {
        var b = w && !q;
      } else {
        l || w || (t = n);
        var e = u - (n - t), f = 0 >= e || e > u;
        f ? (l && (l = clearTimeout(l)), t = n, m = a.apply(p, h)) : l || (l = setTimeout(d, e));
      }
      f && q ? q = clearTimeout(q) : q || c === u || (q = setTimeout(g, c));
      b && (f = !0, m = a.apply(p, h));
      !f || q || l || (h = p = void 0);
      return m;
    }
    var h, l, m, n, p, q, r, t = 0, u = !1, v = !0;
    if ("function" != typeof a) {
      throw new TypeError("Expected a function");
    }
    c = 0 > c ? 0 : +c || 0;
    if (!0 === b) {
      var w = !0, v = !1;
    } else {
      sa(b) && (w = !!b.leading, u = "maxWait" in b && If(+b.maxWait || 0, c), v = "trailing" in b ? !!b.trailing : v);
    }
    f.cancel = function() {
      q && clearTimeout(q);
      l && clearTimeout(l);
      t = 0;
      l = q = r = void 0;
    };
    return f;
  }, Kf = function(a, c, b) {
    var e = !0, g = !0;
    if ("function" != typeof a) {
      throw new TypeError("Expected a function");
    }
    !1 === b ? e = !1 : sa(b) && (e = "leading" in b ? !!b.leading : e, g = "trailing" in b ? !!b.trailing : g);
    return Jf(a, c, {leading:e, maxWait:+c, trailing:g});
  }, Lf = function(a) {
    function c(b, c) {
      var e = a.call(this, b, c) || this;
      c.playerOptions && c.playerOptions.controlBar && c.playerOptions.controlBar.progressControl && c.playerOptions.controlBar.progressControl.keepTooltipsInside && (e.keepTooltipsInside = c.playerOptions.controlBar.progressControl.keepTooltipsInside);
      e.keepTooltipsInside && (e.tooltip = A("div", {className:"vjs-time-tooltip"}), e.el().appendChild(e.tooltip), e.addClass("vjs-keep-tooltips-inside"));
      e.update(0, 0);
      b.on("ready", function() {
        e.on(b.controlBar.progressControl.el(), "mousemove", Kf(w(e, e.handleMouseMove), 25));
      });
      return e;
    }
    __extends(c, a);
    c.prototype.createEl = function() {
      return a.prototype.createEl.call(this, "div", {className:"vjs-mouse-display"});
    };
    c.prototype.handleMouseMove = function(b) {
      var a = this.player_.duration(), a = this.calculateDistance(b) * a;
      b = b.pageX - jc(this.el().parentNode).left;
      this.update(a, b);
    };
    c.prototype.update = function(b, a) {
      b = ra(b, this.player_.duration());
      this.el().style.left = a + "px";
      this.el().setAttribute("data-current-time", b);
      if (this.keepTooltipsInside) {
        var c = this.clampPosition_(a);
        a = a - c + 1;
        c = parseFloat(p.getComputedStyle(this.tooltip).width);
        this.tooltip.innerHTML = b;
        this.tooltip.style.right = "-" + (c / 2 - a) + "px";
      }
    };
    c.prototype.calculateDistance = function(b) {
      return kc(this.el().parentNode, b).x;
    };
    c.prototype.clampPosition_ = function(b) {
      if (!this.keepTooltipsInside) {
        return b;
      }
      var a = parseFloat(p.getComputedStyle(this.player().el()).width), c = parseFloat(p.getComputedStyle(this.tooltip).width) / 2, d = b;
      b < c ? d = Math.ceil(c) : b > a - c && (d = Math.floor(a - c));
      return d;
    };
    return c;
  }(n);
  n.registerComponent("MouseTimeDisplay", Lf);
  var Kd = function(a) {
    function c() {
      return a.apply(this, arguments) || this;
    }
    __extends(c, a);
    c.prototype.createEl = function() {
      return a.prototype.createEl.call(this, "div", {className:"vjs-progress-control vjs-control"});
    };
    return c;
  }(n);
  Kd.prototype.options_ = {children:["seekBar"]};
  n.registerComponent("ProgressControl", Kd);
  var Ld = function(a) {
    function c(b, c) {
      c = a.call(this, b, c) || this;
      c.on(b, "fullscreenchange", c.handleFullscreenChange);
      return c;
    }
    __extends(c, a);
    c.prototype.buildCSSClass = function() {
      return "vjs-fullscreen-control " + a.prototype.buildCSSClass.call(this);
    };
    c.prototype.handleFullscreenChange = function() {
      this.player_.isFullscreen() ? this.controlText("Non-Fullscreen") : this.controlText("Fullscreen");
    };
    c.prototype.handleClick = function() {
      this.player_.isFullscreen() ? this.player_.exitFullscreen() : this.player_.requestFullscreen();
    };
    return c;
  }(Da);
  Ld.prototype.controlText_ = "Fullscreen";
  n.registerComponent("FullscreenToggle", Ld);
  var Mf = function(a) {
    function c() {
      return a.apply(this, arguments) || this;
    }
    __extends(c, a);
    c.prototype.createEl = function() {
      return a.prototype.createEl.call(this, "div", {className:"vjs-volume-level", innerHTML:'<span class="vjs-control-text"></span>'});
    };
    return c;
  }(n);
  n.registerComponent("VolumeLevel", Mf);
  var kb = function(a) {
    function c(b, c) {
      c = a.call(this, b, c) || this;
      c.on(b, "volumechange", c.updateARIAAttributes);
      b.ready(w(c, c.updateARIAAttributes));
      return c;
    }
    __extends(c, a);
    c.prototype.createEl = function() {
      return a.prototype.createEl.call(this, "div", {className:"vjs-volume-bar vjs-slider-bar"}, {"aria-label":"volume level"});
    };
    c.prototype.handleMouseMove = function(b) {
      this.checkMuted();
      this.player_.volume(this.calculateDistance(b));
    };
    c.prototype.checkMuted = function() {
      this.player_.muted() && this.player_.muted(!1);
    };
    c.prototype.getPercent = function() {
      return this.player_.muted() ? 0 : this.player_.volume();
    };
    c.prototype.stepForward = function() {
      this.checkMuted();
      this.player_.volume(this.player_.volume() + .1);
    };
    c.prototype.stepBack = function() {
      this.checkMuted();
      this.player_.volume(this.player_.volume() - .1);
    };
    c.prototype.updateARIAAttributes = function() {
      var b = (100 * this.player_.volume()).toFixed(2);
      this.el_.setAttribute("aria-valuenow", b);
      this.el_.setAttribute("aria-valuetext", b + "%");
    };
    return c;
  }(Yb);
  kb.prototype.options_ = {children:["volumeLevel"], barName:"volumeLevel"};
  kb.prototype.playerEvent = "volumechange";
  n.registerComponent("VolumeBar", kb);
  var Md = function(a) {
    function c(b, c) {
      c = a.call(this, b, c) || this;
      b.tech_ && !1 === b.tech_.featuresVolumeControl && c.addClass("vjs-hidden");
      c.on(b, "loadstart", function() {
        !1 === b.tech_.featuresVolumeControl ? this.addClass("vjs-hidden") : this.removeClass("vjs-hidden");
      });
      return c;
    }
    __extends(c, a);
    c.prototype.createEl = function() {
      return a.prototype.createEl.call(this, "div", {className:"vjs-volume-control vjs-control"});
    };
    return c;
  }(n);
  Md.prototype.options_ = {children:["volumeBar"]};
  n.registerComponent("VolumeControl", Md);
  var Nd = function(a) {
    function c() {
      return a.apply(this, arguments) || this;
    }
    __extends(c, a);
    c.prototype.addItem = function(b) {
      this.addChild(b);
      b.on("click", w(this, function() {
        this.unlockShowing();
      }));
    };
    c.prototype.createEl = function() {
      this.contentEl_ = A(this.options_.contentElType || "ul", {className:"vjs-menu-content"});
      var b = a.prototype.createEl.call(this, "div", {append:this.contentEl_, className:"vjs-menu"});
      b.appendChild(this.contentEl_);
      I(b, "click", function(b) {
        b.preventDefault();
        b.stopImmediatePropagation();
      });
      return b;
    };
    return c;
  }(n);
  n.registerComponent("Popup", Nd);
  var Od = function(a) {
    function c(b, c) {
      void 0 === c && (c = {});
      b = a.call(this, b, c) || this;
      b.update();
      return b;
    }
    __extends(c, a);
    c.prototype.update = function() {
      var b = this.createPopup();
      this.popup && this.removeChild(this.popup);
      this.popup = b;
      this.addChild(b);
      this.items && 0 === this.items.length ? this.hide() : this.items && 1 < this.items.length && this.show();
    };
    c.prototype.createPopup = function() {
    };
    c.prototype.createEl = function() {
      return a.prototype.createEl.call(this, "div", {className:this.buildCSSClass()});
    };
    c.prototype.buildCSSClass = function() {
      var b = "vjs-menu-button", b = !0 === this.options_.inline ? b + "-inline" : b + "-popup";
      return "vjs-menu-button " + b + " " + a.prototype.buildCSSClass.call(this);
    };
    return c;
  }(Ca);
  n.registerComponent("PopupButton", Od);
  var lb = function(a) {
    function c(b, c) {
      c = a.call(this, b, c) || this;
      c.on(b, "volumechange", c.update);
      b.tech_ && !1 === b.tech_.featuresVolumeControl && c.addClass("vjs-hidden");
      c.on(b, "loadstart", function() {
        this.update();
        !1 === b.tech_.featuresVolumeControl ? this.addClass("vjs-hidden") : this.removeClass("vjs-hidden");
      });
      return c;
    }
    __extends(c, a);
    c.prototype.buildCSSClass = function() {
      return "vjs-mute-control " + a.prototype.buildCSSClass.call(this);
    };
    c.prototype.handleClick = function() {
      this.player_.muted(this.player_.muted() ? !1 : !0);
    };
    c.prototype.update = function() {
      var b = this.player_.volume(), a = 3;
      0 === b || this.player_.muted() ? a = 0 : .33 > b ? a = 1 : .67 > b && (a = 2);
      b = this.player_.muted() ? "Unmute" : "Mute";
      this.controlText() !== b && this.controlText(b);
      for (b = 0;4 > b;b++) {
        qa(this.el_, "vjs-vol-" + b);
      }
      M(this.el_, "vjs-vol-" + a);
    };
    return c;
  }(Da);
  lb.prototype.controlText_ = "Mute";
  n.registerComponent("MuteToggle", lb);
  var ac = function(a) {
    function c(b, c) {
      function e() {
        b.tech_ && !1 === b.tech_.featuresVolumeControl ? this.addClass("vjs-hidden") : this.removeClass("vjs-hidden");
      }
      void 0 === c && (c = {});
      void 0 === c.inline && (c.inline = !0);
      void 0 === c.vertical && (c.vertical = c.inline ? !1 : !0);
      c.volumeBar = c.volumeBar || {};
      c.volumeBar.vertical = !!c.vertical;
      c = a.call(this, b, c) || this;
      c.on(b, "volumechange", c.volumeUpdate);
      c.on(b, "loadstart", c.volumeUpdate);
      e.call(c);
      c.on(b, "loadstart", e);
      c.on(c.volumeBar, ["slideractive", "focus"], function() {
        this.addClass("vjs-slider-active");
      });
      c.on(c.volumeBar, ["sliderinactive", "blur"], function() {
        this.removeClass("vjs-slider-active");
      });
      c.on(c.volumeBar, ["focus"], function() {
        this.addClass("vjs-lock-showing");
      });
      c.on(c.volumeBar, ["blur"], function() {
        this.removeClass("vjs-lock-showing");
      });
      return c;
    }
    __extends(c, a);
    c.prototype.buildCSSClass = function() {
      var b;
      b = this.options_.vertical ? "vjs-volume-menu-button-vertical" : "vjs-volume-menu-button-horizontal";
      return "vjs-volume-menu-button " + a.prototype.buildCSSClass.call(this) + " " + b;
    };
    c.prototype.createPopup = function() {
      var b = new Nd(this.player_, {contentElType:"div"}), a = new kb(this.player_, this.options_.volumeBar);
      b.addChild(a);
      this.menuContent = b;
      this.volumeBar = a;
      this.attachVolumeBarEvents();
      return b;
    };
    c.prototype.handleClick = function() {
      lb.prototype.handleClick.call(this);
      a.prototype.handleClick.call(this);
    };
    c.prototype.attachVolumeBarEvents = function() {
      this.menuContent.on(["mousedown", "touchdown"], w(this, this.handleMouseDown));
    };
    c.prototype.handleMouseDown = function(b) {
      this.on(["mousemove", "touchmove"], w(this.volumeBar, this.volumeBar.handleMouseMove));
      this.on(this.el_.ownerDocument, ["mouseup", "touchend"], this.handleMouseUp);
    };
    c.prototype.handleMouseUp = function(b) {
      this.off(["mousemove", "touchmove"], w(this.volumeBar, this.volumeBar.handleMouseMove));
    };
    return c;
  }(Od);
  ac.prototype.volumeUpdate = lb.prototype.update;
  ac.prototype.controlText_ = "Mute";
  n.registerComponent("VolumeMenuButton", ac);
  var mb = function(a) {
    function c(b, c) {
      b = a.call(this, b, c) || this;
      b.focusedChild_ = -1;
      b.on("keydown", b.handleKeyPress);
      return b;
    }
    __extends(c, a);
    c.prototype.addItem = function(b) {
      this.addChild(b);
      b.on("click", w(this, function() {
        this.unlockShowing();
      }));
    };
    c.prototype.createEl = function() {
      this.contentEl_ = A(this.options_.contentElType || "ul", {className:"vjs-menu-content"});
      this.contentEl_.setAttribute("role", "menu");
      var b = a.prototype.createEl.call(this, "div", {append:this.contentEl_, className:"vjs-menu"});
      b.setAttribute("role", "presentation");
      b.appendChild(this.contentEl_);
      I(b, "click", function(b) {
        b.preventDefault();
        b.stopImmediatePropagation();
      });
      return b;
    };
    c.prototype.handleKeyPress = function(b) {
      if (37 === b.which || 40 === b.which) {
        b.preventDefault(), this.stepForward();
      } else {
        if (38 === b.which || 39 === b.which) {
          b.preventDefault(), this.stepBack();
        }
      }
    };
    c.prototype.stepForward = function() {
      var b = 0;
      void 0 !== this.focusedChild_ && (b = this.focusedChild_ + 1);
      this.focus(b);
    };
    c.prototype.stepBack = function() {
      var b = 0;
      void 0 !== this.focusedChild_ && (b = this.focusedChild_ - 1);
      this.focus(b);
    };
    c.prototype.focus = function(b) {
      void 0 === b && (b = 0);
      var a = this.children().slice();
      a.length && a[0].className && /vjs-menu-title/.test(a[0].className) && a.shift();
      0 < a.length && (0 > b ? b = 0 : b >= a.length && (b = a.length - 1), this.focusedChild_ = b, a[b].el_.focus());
    };
    return c;
  }(n);
  n.registerComponent("Menu", mb);
  var bc = function(a) {
    function c(b, c) {
      void 0 === c && (c = {});
      b = a.call(this, b, c) || this;
      b.update();
      b.enabled_ = !0;
      b.el_.setAttribute("aria-haspopup", "true");
      b.el_.setAttribute("role", "menuitem");
      b.on("keydown", b.handleSubmenuKeyPress);
      return b;
    }
    __extends(c, a);
    c.prototype.update = function() {
      var b = this.createMenu();
      this.menu && this.removeChild(this.menu);
      this.menu = b;
      this.addChild(b);
      this.buttonPressed_ = !1;
      this.el_.setAttribute("aria-expanded", "false");
      this.items && 0 === this.items.length ? this.hide() : this.items && 1 < this.items.length && this.show();
    };
    c.prototype.createMenu = function() {
      var b = new mb(this.player_);
      if (this.options_.title) {
        var a = A("li", {className:"vjs-menu-title", innerHTML:U(this.options_.title), tabIndex:-1});
        b.children_.unshift(a);
        d(a, b.contentEl());
      }
      if (this.items = this.createItems()) {
        for (a = 0;a < this.items.length;a++) {
          b.addItem(this.items[a]);
        }
      }
      return b;
    };
    c.prototype.createItems = function() {
    };
    c.prototype.createEl = function() {
      return a.prototype.createEl.call(this, "div", {className:this.buildCSSClass()});
    };
    c.prototype.buildCSSClass = function() {
      var b = "vjs-menu-button", b = !0 === this.options_.inline ? b + "-inline" : b + "-popup";
      return "vjs-menu-button " + b + " " + a.prototype.buildCSSClass.call(this);
    };
    c.prototype.handleClick = function() {
      this.one(this.menu.contentEl(), "mouseleave", w(this, function(b) {
        this.unpressButton();
        this.el_.blur();
      }));
      this.buttonPressed_ ? this.unpressButton() : this.pressButton();
    };
    c.prototype.handleKeyPress = function(b) {
      27 === b.which || 9 === b.which ? (this.buttonPressed_ && this.unpressButton(), 9 !== b.which && b.preventDefault()) : 38 === b.which || 40 === b.which ? this.buttonPressed_ || (this.pressButton(), b.preventDefault()) : a.prototype.handleKeyPress.call(this, b);
    };
    c.prototype.handleSubmenuKeyPress = function(b) {
      if (27 === b.which || 9 === b.which) {
        this.buttonPressed_ && this.unpressButton(), 9 !== b.which && b.preventDefault();
      }
    };
    c.prototype.pressButton = function() {
      this.enabled_ && (this.buttonPressed_ = !0, this.menu.lockShowing(), this.el_.setAttribute("aria-expanded", "true"), this.menu.focus());
    };
    c.prototype.unpressButton = function() {
      this.enabled_ && (this.buttonPressed_ = !1, this.menu.unlockShowing(), this.el_.setAttribute("aria-expanded", "false"), this.el_.focus());
    };
    c.prototype.disable = function() {
      this.buttonPressed_ = !1;
      this.menu.unlockShowing();
      this.el_.setAttribute("aria-expanded", "false");
      this.enabled_ = !1;
      return a.prototype.disable.call(this);
    };
    c.prototype.enable = function() {
      this.enabled_ = !0;
      return a.prototype.enable.call(this);
    };
    return c;
  }(Ca);
  n.registerComponent("MenuButton", bc);
  var cc = function(a) {
    function c(b, c) {
      var e = c.tracks;
      b = a.call(this, b, c) || this;
      1 >= b.items.length && b.hide();
      if (e) {
        var d = w(b, b.update);
        e.addEventListener("removetrack", d);
        e.addEventListener("addtrack", d);
        b.player_.on("dispose", function() {
          e.removeEventListener("removetrack", d);
          e.removeEventListener("addtrack", d);
        });
        return b;
      }
    }
    __extends(c, a);
    return c;
  }(bc);
  n.registerComponent("TrackButton", cc);
  var Pa = function(a) {
    function c(b, c) {
      b = a.call(this, b, c) || this;
      b.selectable = c.selectable;
      b.selected(c.selected);
      b.selectable ? b.el_.setAttribute("role", "menuitemcheckbox") : b.el_.setAttribute("role", "menuitem");
      return b;
    }
    __extends(c, a);
    c.prototype.createEl = function(b, c, g) {
      return a.prototype.createEl.call(this, "li", O({className:"vjs-menu-item", innerHTML:this.localize(this.options_.label), tabIndex:-1}, c), g);
    };
    c.prototype.handleClick = function() {
      this.selected(!0);
    };
    c.prototype.selected = function(b) {
      this.selectable && (b ? (this.addClass("vjs-selected"), this.el_.setAttribute("aria-checked", "true"), this.controlText(", selected")) : (this.removeClass("vjs-selected"), this.el_.setAttribute("aria-checked", "false"), this.controlText(" ")));
    };
    return c;
  }(Ca);
  n.registerComponent("MenuItem", Pa);
  var Qa = function(a) {
    function c(b, c) {
      var e = c.track, d = b.textTracks();
      c.label = e.label || e.language || "Unknown";
      c.selected = e["default"] || "showing" === e.mode;
      b = a.call(this, b, c) || this;
      b.track = e;
      if (d) {
        var f = w(b, b.handleTracksChange);
        d.addEventListener("change", f);
        b.on("dispose", function() {
          d.removeEventListener("change", f);
        });
      }
      if (d && void 0 === d.onchange) {
        var h;
        b.on(["tap", "click"], function() {
          if ("object" !== typeof p.Event) {
            try {
              h = new p.Event("change");
            } catch (J) {
            }
          }
          h || (h = x.createEvent("Event"), h.initEvent("change", !0, !0));
          d.dispatchEvent(h);
        });
      }
      return b;
    }
    __extends(c, a);
    c.prototype.handleClick = function(b) {
      var c = this.track.kind, g = this.player_.textTracks();
      a.prototype.handleClick.call(this, b);
      if (g) {
        for (b = 0;b < g.length;b++) {
          var d = g[b];
          d.kind === c && (d.mode = d === this.track ? "showing" : "disabled");
        }
      }
    };
    c.prototype.handleTracksChange = function(b) {
      this.selected("showing" === this.track.mode);
    };
    return c;
  }(Pa);
  n.registerComponent("TextTrackMenuItem", Qa);
  var Pd = function(a) {
    function c(b, c) {
      c.track = {player:b, kind:c.kind, label:c.kind + " off", "default":!1, mode:"disabled"};
      c.selectable = !0;
      b = a.call(this, b, c) || this;
      b.selected(!0);
      return b;
    }
    __extends(c, a);
    c.prototype.handleTracksChange = function(b) {
      b = this.player().textTracks();
      for (var a = !0, c = 0, d = b.length;c < d;c++) {
        var f = b[c];
        if (f.kind === this.track.kind && "showing" === f.mode) {
          a = !1;
          break;
        }
      }
      this.selected(a);
    };
    return c;
  }(Qa);
  n.registerComponent("OffTextTrackMenuItem", Pd);
  var Ra = function(a) {
    function c(b, c) {
      void 0 === c && (c = {});
      c.tracks = b.textTracks();
      return a.call(this, b, c) || this;
    }
    __extends(c, a);
    c.prototype.createItems = function(b) {
      void 0 === b && (b = []);
      b.push(new Pd(this.player_, {kind:this.kind_}));
      var a = this.player_.textTracks();
      if (!a) {
        return b;
      }
      for (var c = 0;c < a.length;c++) {
        var d = a[c];
        d.kind === this.kind_ && b.push(new Qa(this.player_, {track:d, selectable:!0}));
      }
      return b;
    };
    return c;
  }(cc);
  n.registerComponent("TextTrackButton", Ra);
  var Qd = function(a) {
    function c(b, c) {
      var e = c.track, d = c.cue, f = b.currentTime();
      c.label = d.text;
      c.selected = d.startTime <= f && f < d.endTime;
      b = a.call(this, b, c) || this;
      b.track = e;
      b.cue = d;
      e.addEventListener("cuechange", w(b, b.update));
      return b;
    }
    __extends(c, a);
    c.prototype.handleClick = function() {
      a.prototype.handleClick.call(this);
      this.player_.currentTime(this.cue.startTime);
      this.update(this.cue.startTime);
    };
    c.prototype.update = function() {
      var b = this.cue, a = this.player_.currentTime();
      this.selected(b.startTime <= a && a < b.endTime);
    };
    return c;
  }(Pa);
  n.registerComponent("ChaptersTrackMenuItem", Qd);
  var dc = function(a) {
    function c(b, c, g) {
      b = a.call(this, b, c, g) || this;
      b.el_.setAttribute("aria-label", "Chapters Menu");
      return b;
    }
    __extends(c, a);
    c.prototype.buildCSSClass = function() {
      return "vjs-chapters-button " + a.prototype.buildCSSClass.call(this);
    };
    c.prototype.createItems = function() {
      var b = [], a = this.player_.textTracks();
      if (!a) {
        return b;
      }
      for (var c = 0;c < a.length;c++) {
        var d = a[c];
        d.kind === this.kind_ && b.push(new Qa(this.player_, {track:d}));
      }
      return b;
    };
    c.prototype.createMenu = function() {
      for (var b = this, a = this.player_.textTracks() || [], c, f = this.items || [], h = a.length - 1;0 <= h;h--) {
        var l = a[h];
        if (l.kind === this.kind_) {
          c = l;
          break;
        }
      }
      var m = this.menu;
      void 0 === m ? (m = new mb(this.player_), h = A("li", {className:"vjs-menu-title", innerHTML:U(this.kind_), tabIndex:-1}), m.children_.unshift(h), d(h, m.contentEl())) : (f.forEach(function(b) {
        return m.removeChild(b);
      }), f = []);
      !c || null !== c.cues && void 0 !== c.cues || (c.mode = "hidden", (h = this.player_.remoteTextTrackEls().getTrackElementByTrack_(c)) && h.addEventListener("load", function(a) {
        return b.update();
      }));
      if (c && c.cues && 0 < c.cues.length) {
        for (a = c.cues, h = 0, l = a.length;h < l;h++) {
          var n = new Qd(this.player_, {cue:a[h], track:c});
          f.push(n);
          m.addChild(n);
        }
      }
      0 < f.length && this.show();
      this.items = f;
      return m;
    };
    return c;
  }(Ra);
  dc.prototype.kind_ = "chapters";
  dc.prototype.controlText_ = "Chapters";
  n.registerComponent("ChaptersButton", dc);
  var ec = function(a) {
    function c(b, c, g) {
      c = a.call(this, b, c, g) || this;
      c.el_.setAttribute("aria-label", "Descriptions Menu");
      var e = b.textTracks();
      if (e) {
        var d = w(c, c.handleTracksChange);
        e.addEventListener("change", d);
        c.on("dispose", function() {
          e.removeEventListener("change", d);
        });
      }
      return c;
    }
    __extends(c, a);
    c.prototype.handleTracksChange = function(b) {
      b = this.player().textTracks();
      for (var a = !1, c = 0, d = b.length;c < d;c++) {
        var f = b[c];
        if (f.kind !== this.kind_ && "showing" === f.mode) {
          a = !0;
          break;
        }
      }
      a ? this.disable() : this.enable();
    };
    c.prototype.buildCSSClass = function() {
      return "vjs-descriptions-button " + a.prototype.buildCSSClass.call(this);
    };
    return c;
  }(Ra);
  ec.prototype.kind_ = "descriptions";
  ec.prototype.controlText_ = "Descriptions";
  n.registerComponent("DescriptionsButton", ec);
  var fc = function(a) {
    function c(b, c, g) {
      b = a.call(this, b, c, g) || this;
      b.el_.setAttribute("aria-label", "Subtitles Menu");
      return b;
    }
    __extends(c, a);
    c.prototype.buildCSSClass = function() {
      return "vjs-subtitles-button " + a.prototype.buildCSSClass.call(this);
    };
    return c;
  }(Ra);
  fc.prototype.kind_ = "subtitles";
  fc.prototype.controlText_ = "Subtitles";
  n.registerComponent("SubtitlesButton", fc);
  var Rd = function(a) {
    function c(b, c) {
      c.track = {player:b, kind:c.kind, label:c.kind + " settings", selectable:!1, "default":!1, mode:"disabled"};
      c.selectable = !1;
      b = a.call(this, b, c) || this;
      b.addClass("vjs-texttrack-settings");
      b.controlText(", opens " + c.kind + " settings dialog");
      return b;
    }
    __extends(c, a);
    c.prototype.handleClick = function() {
      this.player().getChild("textTrackSettings").show();
      this.player().getChild("textTrackSettings").el_.focus();
    };
    return c;
  }(Qa);
  n.registerComponent("CaptionSettingsMenuItem", Rd);
  var gc = function(a) {
    function c(b, c, g) {
      b = a.call(this, b, c, g) || this;
      b.el_.setAttribute("aria-label", "Captions Menu");
      return b;
    }
    __extends(c, a);
    c.prototype.buildCSSClass = function() {
      return "vjs-captions-button " + a.prototype.buildCSSClass.call(this);
    };
    c.prototype.update = function() {
      var b = 2;
      a.prototype.update.call(this);
      this.player().tech_ && this.player().tech_.featuresNativeTextTracks && (b = 1);
      this.items && this.items.length > b ? this.show() : this.hide();
    };
    c.prototype.createItems = function() {
      var b = [];
      this.player().tech_ && this.player().tech_.featuresNativeTextTracks || b.push(new Rd(this.player_, {kind:this.kind_}));
      return a.prototype.createItems.call(this, b);
    };
    return c;
  }(Ra);
  gc.prototype.kind_ = "captions";
  gc.prototype.controlText_ = "Captions";
  n.registerComponent("CaptionsButton", gc);
  var Sd = function(a) {
    function c(b, c) {
      var e = c.track, d = b.audioTracks();
      c.label = e.label || e.language || "Unknown";
      c.selected = e.enabled;
      b = a.call(this, b, c) || this;
      b.track = e;
      if (d) {
        var f = w(b, b.handleTracksChange);
        d.addEventListener("change", f);
        b.on("dispose", function() {
          d.removeEventListener("change", f);
        });
      }
      return b;
    }
    __extends(c, a);
    c.prototype.handleClick = function(b) {
      var c = this.player_.audioTracks();
      a.prototype.handleClick.call(this, b);
      if (c) {
        for (b = 0;b < c.length;b++) {
          var g = c[b];
          g.enabled = g === this.track;
        }
      }
    };
    c.prototype.handleTracksChange = function(b) {
      this.selected(this.track.enabled);
    };
    return c;
  }(Pa);
  n.registerComponent("AudioTrackMenuItem", Sd);
  var Td = function(a) {
    function c(b, c) {
      void 0 === c && (c = {});
      c.tracks = b.audioTracks && b.audioTracks();
      b = a.call(this, b, c) || this;
      b.el_.setAttribute("aria-label", "Audio Menu");
      return b;
    }
    __extends(c, a);
    c.prototype.buildCSSClass = function() {
      return "vjs-audio-button " + a.prototype.buildCSSClass.call(this);
    };
    c.prototype.createItems = function(b) {
      void 0 === b && (b = []);
      var a = this.player_.audioTracks && this.player_.audioTracks();
      if (!a) {
        return b;
      }
      for (var c = 0;c < a.length;c++) {
        b.push(new Sd(this.player_, {track:a[c], selectable:!0}));
      }
      return b;
    };
    return c;
  }(cc);
  Td.prototype.controlText_ = "Audio Track";
  n.registerComponent("AudioTrackButton", Td);
  var hc = function(a) {
    function c(b, c) {
      var e = c.rate, d = parseFloat(e, 10);
      c.label = e;
      c.selected = 1 === d;
      c = a.call(this, b, c) || this;
      c.label = e;
      c.rate = d;
      c.on(b, "ratechange", c.update);
      return c;
    }
    __extends(c, a);
    c.prototype.handleClick = function() {
      a.prototype.handleClick.call(this);
      this.player().playbackRate(this.rate);
    };
    c.prototype.update = function() {
      this.selected(this.player().playbackRate() === this.rate);
    };
    return c;
  }(Pa);
  hc.prototype.contentElType = "button";
  n.registerComponent("PlaybackRateMenuItem", hc);
  var Ud = function(a) {
    function c(b, c) {
      c = a.call(this, b, c) || this;
      c.updateVisibility();
      c.updateLabel();
      c.on(b, "loadstart", c.updateVisibility);
      c.on(b, "ratechange", c.updateLabel);
      return c;
    }
    __extends(c, a);
    c.prototype.createEl = function() {
      var b = a.prototype.createEl.call(this);
      this.labelEl_ = A("div", {className:"vjs-playback-rate-value", innerHTML:1});
      b.appendChild(this.labelEl_);
      return b;
    };
    c.prototype.buildCSSClass = function() {
      return "vjs-playback-rate " + a.prototype.buildCSSClass.call(this);
    };
    c.prototype.createMenu = function() {
      var b = new mb(this.player()), a = this.playbackRates();
      if (a) {
        for (var c = a.length - 1;0 <= c;c--) {
          b.addChild(new hc(this.player(), {rate:a[c] + "x"}));
        }
      }
      return b;
    };
    c.prototype.updateARIAAttributes = function() {
      this.el().setAttribute("aria-valuenow", this.player().playbackRate());
    };
    c.prototype.handleClick = function() {
      for (var b = this.player().playbackRate(), a = this.playbackRates(), c = a[0], d = 0;d < a.length;d++) {
        if (a[d] > b) {
          c = a[d];
          break;
        }
      }
      this.player().playbackRate(c);
    };
    c.prototype.playbackRates = function() {
      return this.options_.playbackRates || this.options_.playerOptions && this.options_.playerOptions.playbackRates;
    };
    c.prototype.playbackRateSupported = function() {
      return this.player().tech_ && this.player().tech_.featuresPlaybackRate && this.playbackRates() && 0 < this.playbackRates().length;
    };
    c.prototype.updateVisibility = function() {
      this.playbackRateSupported() ? this.removeClass("vjs-hidden") : this.addClass("vjs-hidden");
    };
    c.prototype.updateLabel = function() {
      this.playbackRateSupported() && (this.labelEl_.innerHTML = this.player().playbackRate() + "x");
    };
    return c;
  }(bc);
  Ud.prototype.controlText_ = "Playback Rate";
  n.registerComponent("PlaybackRateMenuButton", Ud);
  var Vd = function(a) {
    function c() {
      return a.apply(this, arguments) || this;
    }
    __extends(c, a);
    c.prototype.buildCSSClass = function() {
      return "vjs-spacer " + a.prototype.buildCSSClass.call(this);
    };
    c.prototype.createEl = function() {
      return a.prototype.createEl.call(this, "div", {className:this.buildCSSClass()});
    };
    return c;
  }(n);
  n.registerComponent("Spacer", Vd);
  var Nf = function(a) {
    function c() {
      return a.apply(this, arguments) || this;
    }
    __extends(c, a);
    c.prototype.buildCSSClass = function() {
      return "vjs-custom-control-spacer " + a.prototype.buildCSSClass.call(this);
    };
    c.prototype.createEl = function() {
      var b = a.prototype.createEl.call(this, {className:this.buildCSSClass()});
      b.innerHTML = "&nbsp;";
      return b;
    };
    return c;
  }(Vd);
  n.registerComponent("CustomControlSpacer", Nf);
  var Wd = function(a) {
    function c() {
      return a.apply(this, arguments) || this;
    }
    __extends(c, a);
    c.prototype.createEl = function() {
      return a.prototype.createEl.call(this, "div", {className:"vjs-control-bar", dir:"ltr"}, {role:"group"});
    };
    return c;
  }(n);
  Wd.prototype.options_ = {children:"playToggle volumeMenuButton currentTimeDisplay timeDivider durationDisplay progressControl liveDisplay remainingTimeDisplay customControlSpacer playbackRateMenuButton chaptersButton descriptionsButton subtitlesButton captionsButton audioTrackButton fullscreenToggle".split(" ")};
  n.registerComponent("ControlBar", Wd);
  var Xd = function(a) {
    function c(b, c) {
      c = a.call(this, b, c) || this;
      c.on(b, "error", c.open);
      return c;
    }
    __extends(c, a);
    c.prototype.buildCSSClass = function() {
      return "vjs-error-display " + a.prototype.buildCSSClass.call(this);
    };
    c.prototype.content = function() {
      var b = this.player().error();
      return b ? this.localize(b.message) : "";
    };
    return c;
  }(Oa);
  Xd.prototype.options_ = V(Oa.prototype.options_, {fillAlways:!0, temporary:!1, uncloseable:!0});
  n.registerComponent("ErrorDisplay", Xd);
  var Of = function(a) {
    function c(b, c) {
      b = a.call(this, b, c) || this;
      b.hide();
      void 0 === c.persistTextTrackSettings && (b.options_.persistTextTrackSettings = b.options_.playerOptions.persistTextTrackSettings);
      I(b.$(".vjs-done-button"), "click", w(b, function() {
        this.saveSettings();
        this.hide();
      }));
      I(b.$(".vjs-default-button"), "click", w(b, function() {
        this.$(".vjs-fg-color > select").selectedIndex = 0;
        this.$(".vjs-bg-color > select").selectedIndex = 0;
        this.$(".window-color > select").selectedIndex = 0;
        this.$(".vjs-text-opacity > select").selectedIndex = 0;
        this.$(".vjs-bg-opacity > select").selectedIndex = 0;
        this.$(".vjs-window-opacity > select").selectedIndex = 0;
        this.$(".vjs-edge-style select").selectedIndex = 0;
        this.$(".vjs-font-family select").selectedIndex = 0;
        this.$(".vjs-font-percent select").selectedIndex = 2;
        this.updateDisplay();
      }));
      I(b.$(".vjs-fg-color > select"), "change", w(b, b.updateDisplay));
      I(b.$(".vjs-bg-color > select"), "change", w(b, b.updateDisplay));
      I(b.$(".window-color > select"), "change", w(b, b.updateDisplay));
      I(b.$(".vjs-text-opacity > select"), "change", w(b, b.updateDisplay));
      I(b.$(".vjs-bg-opacity > select"), "change", w(b, b.updateDisplay));
      I(b.$(".vjs-window-opacity > select"), "change", w(b, b.updateDisplay));
      I(b.$(".vjs-font-percent select"), "change", w(b, b.updateDisplay));
      I(b.$(".vjs-edge-style select"), "change", w(b, b.updateDisplay));
      I(b.$(".vjs-font-family select"), "change", w(b, b.updateDisplay));
      b.options_.persistTextTrackSettings && b.restoreSettings();
      return b;
    }
    __extends(c, a);
    c.prototype.createEl = function() {
      var b = this.id_, c = "TTsettingsDialogLabel-" + b, g = "TTsettingsDialogDescription-" + b;
      return a.prototype.createEl.call(this, "div", {className:"vjs-caption-settings vjs-modal-overlay", innerHTML:'\n    <div role="document">\n      <div role="heading" aria-level="1" id="' + c + '" class="vjs-control-text">Captions Settings Dialog</div>\n      <div id="' + g + '" class="vjs-control-text">Beginning of dialog window. Escape will cancel and close the window.</div>\n      <div class="vjs-tracksettings">\n        <div class="vjs-tracksettings-colors">\n          <fieldset class="vjs-fg-color vjs-tracksetting">\n            <legend>Text</legend>\n            <label class="vjs-label" for="captions-foreground-color-' + 
      b + '">Color</label>\n            <select id="captions-foreground-color-' + b + '">\n              <option value="#FFF" selected>White</option>\n              <option value="#000">Black</option>\n              <option value="#F00">Red</option>\n              <option value="#0F0">Green</option>\n              <option value="#00F">Blue</option>\n              <option value="#FF0">Yellow</option>\n              <option value="#F0F">Magenta</option>\n              <option value="#0FF">Cyan</option>\n            </select>\n            <span class="vjs-text-opacity vjs-opacity">\n              <label class="vjs-label" for="captions-foreground-opacity-' + 
      b + '">Transparency</label>\n              <select id="captions-foreground-opacity-' + b + '">\n                <option value="1" selected>Opaque</option>\n                <option value="0.5">Semi-Opaque</option>\n              </select>\n            </span>\n          </fieldset>\n          <fieldset class="vjs-bg-color vjs-tracksetting">\n            <legend>Background</legend>\n            <label class="vjs-label" for="captions-background-color-' + b + '">Color</label>\n            <select id="captions-background-color-' + 
      b + '">\n              <option value="#000" selected>Black</option>\n              <option value="#FFF">White</option>\n              <option value="#F00">Red</option>\n              <option value="#0F0">Green</option>\n              <option value="#00F">Blue</option>\n              <option value="#FF0">Yellow</option>\n              <option value="#F0F">Magenta</option>\n              <option value="#0FF">Cyan</option>\n            </select>\n            <span class="vjs-bg-opacity vjs-opacity">\n              <label class="vjs-label" for="captions-background-opacity-' + 
      b + '">Transparency</label>\n              <select id="captions-background-opacity-' + b + '">\n                <option value="1" selected>Opaque</option>\n                <option value="0.5">Semi-Transparent</option>\n                <option value="0">Transparent</option>\n              </select>\n            </span>\n          </fieldset>\n          <fieldset class="window-color vjs-tracksetting">\n            <legend>Window</legend>\n            <label class="vjs-label" for="captions-window-color-' + 
      b + '">Color</label>\n            <select id="captions-window-color-' + b + '">\n              <option value="#000" selected>Black</option>\n              <option value="#FFF">White</option>\n              <option value="#F00">Red</option>\n              <option value="#0F0">Green</option>\n              <option value="#00F">Blue</option>\n              <option value="#FF0">Yellow</option>\n              <option value="#F0F">Magenta</option>\n              <option value="#0FF">Cyan</option>\n            </select>\n            <span class="vjs-window-opacity vjs-opacity">\n              <label class="vjs-label" for="captions-window-opacity-' + 
      b + '">Transparency</label>\n              <select id="captions-window-opacity-' + b + '">\n                <option value="0" selected>Transparent</option>\n                <option value="0.5">Semi-Transparent</option>\n                <option value="1">Opaque</option>\n              </select>\n            </span>\n          </fieldset>\n        </div> \x3c!-- vjs-tracksettings-colors --\x3e\n        <div class="vjs-tracksettings-font">\n          <div class="vjs-font-percent vjs-tracksetting">\n            <label class="vjs-label" for="captions-font-size-' + 
      b + '">Font Size</label>\n            <select id="captions-font-size-' + b + '">\n              <option value="0.50">50%</option>\n              <option value="0.75">75%</option>\n              <option value="1.00" selected>100%</option>\n              <option value="1.25">125%</option>\n              <option value="1.50">150%</option>\n              <option value="1.75">175%</option>\n              <option value="2.00">200%</option>\n              <option value="3.00">300%</option>\n              <option value="4.00">400%</option>\n            </select>\n          </div>\n          <div class="vjs-edge-style vjs-tracksetting">\n            <label class="vjs-label" for="captions-edge-style-' + 
      b + '">Text Edge Style</label>\n            <select id="captions-edge-style-' + b + '">\n              <option value="none" selected>None</option>\n              <option value="raised">Raised</option>\n              <option value="depressed">Depressed</option>\n              <option value="uniform">Uniform</option>\n              <option value="dropshadow">Dropshadow</option>\n            </select>\n          </div>\n          <div class="vjs-font-family vjs-tracksetting">\n            <label class="vjs-label" for="captions-font-family-' + 
      b + '">Font Family</label>\n            <select id="captions-font-family-' + b + '">\n              <option value="proportionalSansSerif" selected>Proportional Sans-Serif</option>\n              <option value="monospaceSansSerif">Monospace Sans-Serif</option>\n              <option value="proportionalSerif">Proportional Serif</option>\n              <option value="monospaceSerif">Monospace Serif</option>\n              <option value="casual">Casual</option>\n              <option value="script">Script</option>\n              <option value="small-caps">Small Caps</option>\n            </select>\n          </div>\n        </div> \x3c!-- vjs-tracksettings-font --\x3e\n        <div class="vjs-tracksettings-controls">\n          <button class="vjs-default-button">Defaults</button>\n          <button class="vjs-done-button">Done</button>\n        </div>\n      </div> \x3c!-- vjs-tracksettings --\x3e\n    </div> \x3c!--  role="document" --\x3e\n  ', 
      tabIndex:-1}, {role:"dialog", "aria-labelledby":c, "aria-describedby":g});
    };
    c.prototype.getValues = function() {
      var b = oa(this.$(".vjs-edge-style select")), a = oa(this.$(".vjs-font-family select")), c = oa(this.$(".vjs-fg-color > select")), d = oa(this.$(".vjs-text-opacity > select")), f = oa(this.$(".vjs-bg-color > select")), h = oa(this.$(".vjs-bg-opacity > select")), l = oa(this.$(".window-color > select")), m = oa(this.$(".vjs-window-opacity > select")), b = {fontPercent:p.parseFloat(oa(this.$(".vjs-font-percent > select"))), fontFamily:a, textOpacity:d, windowColor:l, windowOpacity:m, backgroundOpacity:h, 
      edgeStyle:b, color:c, backgroundColor:f}, n;
      for (n in b) {
        ("" === b[n] || "none" === b[n] || "fontPercent" === n && 1 === b[n]) && delete b[n];
      }
      return b;
    };
    c.prototype.setValues = function(b) {
      pa(this.$(".vjs-edge-style select"), b.edgeStyle);
      pa(this.$(".vjs-font-family select"), b.fontFamily);
      pa(this.$(".vjs-fg-color > select"), b.color);
      pa(this.$(".vjs-text-opacity > select"), b.textOpacity);
      pa(this.$(".vjs-bg-color > select"), b.backgroundColor);
      pa(this.$(".vjs-bg-opacity > select"), b.backgroundOpacity);
      pa(this.$(".window-color > select"), b.windowColor);
      pa(this.$(".vjs-window-opacity > select"), b.windowOpacity);
      (b = b.fontPercent) && (b = b.toFixed(2));
      pa(this.$(".vjs-font-percent > select"), b);
    };
    c.prototype.restoreSettings = function() {
      var b, a;
      try {
        c = ud(p.localStorage.getItem("vjs-text-track-settings")), b = c[0], a = c[1], b && B.error(b);
      } catch (k) {
        B.warn(k);
      }
      a && this.setValues(a);
      var c;
    };
    c.prototype.saveSettings = function() {
      if (this.options_.persistTextTrackSettings) {
        var b = this.getValues();
        try {
          0 < Object.getOwnPropertyNames(b).length ? p.localStorage.setItem("vjs-text-track-settings", JSON.stringify(b)) : p.localStorage.removeItem("vjs-text-track-settings");
        } catch (e) {
          B.warn(e);
        }
      }
    };
    c.prototype.updateDisplay = function() {
      var b = this.player_.getChild("textTrackDisplay");
      b && b.updateDisplay();
    };
    return c;
  }(n);
  n.registerComponent("TextTrackSettings", Of);
  var v = function(a) {
    function c(b, c) {
      var e = a.call(this, b, c) || this, d = b.source;
      c = !1;
      d && (e.el_.currentSrc !== d.src || b.tag && 3 === b.tag.initNetworkState_) ? e.setSource(d) : e.handleLateInit_(e.el_);
      if (e.el_.hasChildNodes()) {
        for (var f = e.el_.childNodes, h = f.length, d = [];h--;) {
          var l = f[h];
          "track" === l.nodeName.toLowerCase() && (e.featuresNativeTextTracks ? (e.remoteTextTrackEls().addTrackElement_(l), e.remoteTextTracks().addTrack_(l.track), c || e.el_.hasAttribute("crossorigin") || !Sb(l.src) || (c = !0)) : d.push(l));
        }
        for (f = 0;f < d.length;f++) {
          e.el_.removeChild(d[f]);
        }
      }
      ["audio", "video"].forEach(function(b) {
        var a = e.el()[b + "Tracks"], c = e[b + "Tracks"]();
        b = U(b);
        e["featuresNative" + b + "Tracks"] && a && a.addEventListener && (e["handle" + b + "TrackChange_"] = function(b) {
          c.trigger({type:"change", target:c, currentTarget:c, srcElement:c});
        }, e["handle" + b + "TrackAdd_"] = function(b) {
          return c.addTrack(b.track);
        }, e["handle" + b + "TrackRemove_"] = function(b) {
          return c.removeTrack(b.track);
        }, a.addEventListener("change", e["handle" + b + "TrackChange_"]), a.addEventListener("addtrack", e["handle" + b + "TrackAdd_"]), a.addEventListener("removetrack", e["handle" + b + "TrackRemove_"]), e["removeOld" + b + "Tracks_"] = function(b) {
          return e.removeOldTracks_(c, a);
        }, e.on("loadstart", e["removeOld" + b + "Tracks_"]));
      });
      e.featuresNativeTextTracks && (c && B.warn((m = ["Text Tracks are being loaded from another origin but the crossorigin attribute isn't used.\n            This may prevent text tracks from loading."], m.raw = ["Text Tracks are being loaded from another origin but the crossorigin attribute isn't used.\n            This may prevent text tracks from loading."], nc(m))), e.handleTextTrackChange_ = w(e, e.handleTextTrackChange), e.handleTextTrackAdd_ = w(e, e.handleTextTrackAdd), e.handleTextTrackRemove_ = 
      w(e, e.handleTextTrackRemove), e.proxyNativeTextTracks_());
      (Za || vb || Ic) && !0 === b.nativeControlsForTouch && e.setControls(!0);
      e.proxyWebkitFullscreen_();
      e.triggerReady();
      return e;
      var m;
    }
    __extends(c, a);
    c.prototype.dispose = function() {
      var b = this;
      ["audio", "video", "text"].forEach(function(a) {
        var c = U(a);
        (a = b.el_[a + "Tracks"]) && a.removeEventListener && (a.removeEventListener("change", b["handle" + c + "TrackChange_"]), a.removeEventListener("addtrack", b["handle" + c + "TrackAdd_"]), a.removeEventListener("removetrack", b["handle" + c + "TrackRemove_"]));
        a && b.off("loadstart", b["removeOld" + c + "Tracks_"]);
      });
      c.disposeMediaElement(this.el_);
      a.prototype.dispose.call(this);
    };
    c.prototype.createEl = function() {
      var b = this.options_.tag;
      if (!b || !1 === this.movingMediaElementInDOM) {
        if (b) {
          var a = b.cloneNode(!0);
          b.parentNode.insertBefore(a, b);
          c.disposeMediaElement(b);
          b = a;
        } else {
          b = x.createElement("video"), a = this.options_.tag && Q(this.options_.tag), a = V({}, a), Za && !0 === this.options_.nativeControlsForTouch || delete a.controls, C(b, O(a, {id:this.options_.techId, "class":"vjs-tech"}));
        }
        b.playerId = this.options_.playerId;
      }
      for (var a = ["autoplay", "preload", "loop", "muted"], d = a.length - 1;0 <= d;d--) {
        var f = a[d], h = {};
        "undefined" !== typeof this.options_[f] && (h[f] = this.options_[f]);
        C(b, h);
      }
      return b;
    };
    c.prototype.handleLateInit_ = function(b) {
      if (0 !== b.networkState && 3 !== b.networkState) {
        if (0 === b.readyState) {
          var a = !1, c = function() {
            a = !0;
          };
          this.on("loadstart", c);
          var d = function() {
            a || this.trigger("loadstart");
          };
          this.on("loadedmetadata", d);
          this.ready(function() {
            this.off("loadstart", c);
            this.off("loadedmetadata", d);
            a || this.trigger("loadstart");
          });
        } else {
          var f = ["loadstart"];
          f.push("loadedmetadata");
          2 <= b.readyState && f.push("loadeddata");
          3 <= b.readyState && f.push("canplay");
          4 <= b.readyState && f.push("canplaythrough");
          this.ready(function() {
            f.forEach(function(b) {
              this.trigger(b);
            }, this);
          });
        }
      }
    };
    c.prototype.proxyNativeTextTracks_ = function() {
      var b = this.el().textTracks;
      if (b) {
        for (var a = 0;a < b.length;a++) {
          this.textTracks().addTrack_(b[a]);
        }
        b.addEventListener && (b.addEventListener("change", this.handleTextTrackChange_), b.addEventListener("addtrack", this.handleTextTrackAdd_), b.addEventListener("removetrack", this.handleTextTrackRemove_));
        this.on("loadstart", this.removeOldTextTracks_);
      }
    };
    c.prototype.handleTextTrackChange = function(b) {
      b = this.textTracks();
      this.textTracks().trigger({type:"change", target:b, currentTarget:b, srcElement:b});
    };
    c.prototype.handleTextTrackAdd = function(b) {
      this.textTracks().addTrack_(b.track);
    };
    c.prototype.handleTextTrackRemove = function(b) {
      this.textTracks().removeTrack_(b.track);
    };
    c.prototype.removeOldTracks_ = function(b, a) {
      var c = [];
      if (a) {
        for (var e = 0;e < b.length;e++) {
          for (var d = b[e], f = !1, h = 0;h < a.length;h++) {
            if (a[h] === d) {
              f = !0;
              break;
            }
          }
          f || c.push(d);
        }
        for (e = 0;e < c.length;e++) {
          b.removeTrack_(c[e]);
        }
      }
    };
    c.prototype.removeOldTextTracks_ = function() {
      var b = this.textTracks(), a = this.el().textTracks;
      this.removeOldTracks_(b, a);
    };
    c.prototype.play = function() {
      var b = this.el_.play();
      void 0 !== b && "function" === typeof b.then && b.then(null, function(b) {
      });
    };
    c.prototype.setCurrentTime = function(b) {
      try {
        this.el_.currentTime = b;
      } catch (e) {
        B(e, "Video is not ready. (Video.js)");
      }
    };
    c.prototype.duration = function() {
      return this.el_.duration || 0;
    };
    c.prototype.width = function() {
      return this.el_.offsetWidth;
    };
    c.prototype.height = function() {
      return this.el_.offsetHeight;
    };
    c.prototype.proxyWebkitFullscreen_ = function() {
      var b = this;
      if ("webkitDisplayingFullscreen" in this.el_) {
        var a = function() {
          this.trigger("fullscreenchange", {isFullscreen:!1});
        }, c = function() {
          this.one("webkitendfullscreen", a);
          this.trigger("fullscreenchange", {isFullscreen:!0});
        };
        this.on("webkitbeginfullscreen", c);
        this.on("dispose", function() {
          b.off("webkitbeginfullscreen", c);
          b.off("webkitendfullscreen", a);
        });
      }
    };
    c.prototype.supportsFullScreen = function() {
      if ("function" === typeof this.el_.webkitEnterFullScreen) {
        var b = p.navigator && p.navigator.userAgent || "";
        if (/Android/.test(b) || !/Chrome|Mac OS X 10.5/.test(b)) {
          return !0;
        }
      }
      return !1;
    };
    c.prototype.enterFullScreen = function() {
      var b = this.el_;
      b.paused && b.networkState <= b.HAVE_METADATA ? (this.el_.play(), this.setTimeout(function() {
        b.pause();
        b.webkitEnterFullScreen();
      }, 0)) : b.webkitEnterFullScreen();
    };
    c.prototype.exitFullScreen = function() {
      this.el_.webkitExitFullScreen();
    };
    c.prototype.src = function(b) {
      if (void 0 === b) {
        return this.el_.src;
      }
      this.setSrc(b);
    };
    c.prototype.reset = function() {
      c.resetMediaElement(this.el_);
    };
    c.prototype.currentSrc = function() {
      return this.currentSource_ ? this.currentSource_.src : this.el_.currentSrc;
    };
    c.prototype.setControls = function(b) {
      this.el_.controls = !!b;
    };
    c.prototype.addTextTrack = function(b, c, d) {
      return this.featuresNativeTextTracks ? this.el_.addTextTrack(b, c, d) : a.prototype.addTextTrack.call(this, b, c, d);
    };
    c.prototype.addRemoteTextTrack = function(b) {
      void 0 === b && (b = {});
      if (!this.featuresNativeTextTracks) {
        return a.prototype.addRemoteTextTrack.call(this, b);
      }
      var c = x.createElement("track");
      b.kind && (c.kind = b.kind);
      b.label && (c.label = b.label);
      if (b.language || b.srclang) {
        c.srclang = b.language || b.srclang;
      }
      b["default"] && (c["default"] = b["default"]);
      b.id && (c.id = b.id);
      b.src && (c.src = b.src);
      this.el().appendChild(c);
      this.remoteTextTrackEls().addTrackElement_(c);
      this.remoteTextTracks().addTrack_(c.track);
      return c;
    };
    c.prototype.removeRemoteTextTrack = function(b) {
      if (!this.featuresNativeTextTracks) {
        return a.prototype.removeRemoteTextTrack.call(this, b);
      }
      var c = this.remoteTextTrackEls().getTrackElementByTrack_(b);
      this.remoteTextTrackEls().removeTrackElement_(c);
      this.remoteTextTracks().removeTrack_(b);
      for (var c = this.$$("track"), d = c.length;d--;) {
        b !== c[d] && b !== c[d].track || this.el().removeChild(c[d]);
      }
    };
    return c;
  }(F);
  v.TEST_VID = x.createElement("video");
  var nb = x.createElement("track");
  nb.kind = "captions";
  nb.srclang = "en";
  nb.label = "English";
  v.TEST_VID.appendChild(nb);
  v.isSupported = function() {
    try {
      v.TEST_VID.volume = .5;
    } catch (a) {
      return !1;
    }
    return !!v.TEST_VID.canPlayType;
  };
  v.canControlVolume = function() {
    try {
      var a = v.TEST_VID.volume;
      v.TEST_VID.volume = a / 2 + .1;
      return a !== v.TEST_VID.volume;
    } catch (c) {
      return !1;
    }
  };
  v.canControlPlaybackRate = function() {
    if (Xa && Kc) {
      return !1;
    }
    try {
      var a = v.TEST_VID.playbackRate;
      v.TEST_VID.playbackRate = a / 2 + .1;
      return a !== v.TEST_VID.playbackRate;
    } catch (c) {
      return !1;
    }
  };
  v.supportsNativeTextTracks = function() {
    var a;
    (a = !!v.TEST_VID.textTracks) && 0 < v.TEST_VID.textTracks.length && (a = "number" !== typeof v.TEST_VID.textTracks[0].mode);
    a && xb && (a = !1);
    !a || "onremovetrack" in v.TEST_VID.textTracks || (a = !1);
    return a;
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
  v.prototype.movingMediaElementInDOM = !wb;
  v.prototype.featuresFullscreenResize = !0;
  v.prototype.featuresProgressEvents = !0;
  v.prototype.featuresTimeupdateEvents = !0;
  v.prototype.featuresNativeTextTracks = v.supportsNativeTextTracks();
  v.prototype.featuresNativeVideoTracks = v.supportsNativeVideoTracks();
  v.prototype.featuresNativeAudioTracks = v.supportsNativeAudioTracks();
  var ua, Pf = /^application\/(?:x-|vnd\.apple\.)mpegurl/i, Qf = /^video\/mp4/i;
  v.patchCanPlayType = function() {
    4 <= Ya && !xb && (ua || (ua = v.TEST_VID.constructor.prototype.canPlayType), v.TEST_VID.constructor.prototype.canPlayType = function(a) {
      return a && Pf.test(a) ? "maybe" : ua.call(this, a);
    });
    Hc && (ua || (ua = v.TEST_VID.constructor.prototype.canPlayType), v.TEST_VID.constructor.prototype.canPlayType = function(a) {
      return a && Qf.test(a) ? "maybe" : ua.call(this, a);
    });
  };
  v.unpatchCanPlayType = function() {
    var a = v.TEST_VID.constructor.prototype.canPlayType;
    v.TEST_VID.constructor.prototype.canPlayType = ua;
    ua = null;
    return a;
  };
  v.patchCanPlayType();
  v.disposeMediaElement = function(a) {
    if (a) {
      for (a.parentNode && a.parentNode.removeChild(a);a.hasChildNodes();) {
        a.removeChild(a.firstChild);
      }
      a.removeAttribute("src");
      if ("function" === typeof a.load) {
        try {
          a.load();
        } catch (c) {
        }
      }
    }
  };
  v.resetMediaElement = function(a) {
    if (a) {
      for (var c = a.querySelectorAll("source"), b = c.length;b--;) {
        a.removeChild(c[b]);
      }
      a.removeAttribute("src");
      if ("function" === typeof a.load) {
        try {
          a.load();
        } catch (e) {
        }
      }
    }
  };
  "paused currentTime buffered volume muted poster preload autoplay controls loop error seeking seekable ended defaultMuted playbackRate played networkState readyState videoWidth videoHeight".split(" ").forEach(function(a) {
    v.prototype[a] = function() {
      return this.el_[a];
    };
  });
  "volume muted src poster preload autoplay loop playbackRate".split(" ").forEach(function(a) {
    v.prototype["set" + U(a)] = function(c) {
      this.el_[a] = c;
    };
  });
  ["pause", "load"].forEach(function(a) {
    v.prototype[a] = function() {
      return this.el_[a]();
    };
  });
  F.withSourceHandlers(v);
  v.nativeSourceHandler = {};
  v.nativeSourceHandler.canPlayType = function(a) {
    try {
      return v.TEST_VID.canPlayType(a);
    } catch (c) {
      return "";
    }
  };
  v.nativeSourceHandler.canHandleSource = function(a, c) {
    return a.type ? v.nativeSourceHandler.canPlayType(a.type) : a.src ? (a = zd(a.src), v.nativeSourceHandler.canPlayType("video/" + a)) : "";
  };
  v.nativeSourceHandler.handleSource = function(a, c, b) {
    c.setSrc(a.src);
  };
  v.nativeSourceHandler.dispose = function() {
  };
  v.registerSourceHandler(v.nativeSourceHandler);
  n.registerComponent("Html5", v);
  F.registerTech("Html5", v);
  var Yd = "progress abort suspend emptied stalled loadedmetadata loadeddata timeupdate ratechange volumechange texttrackchange".split(" "), ia = function(a) {
    function c(b, e, d) {
      b.id = b.id || "vjs_video_" + xa++;
      e = O(c.getTagSettings(b), e);
      e.initChildren = !1;
      e.createEl = !1;
      e.reportTouchActivity = !1;
      if (!e.language) {
        if ("function" === typeof b.closest) {
          var f = b.closest("[lang]");
          f && (e.language = f.getAttribute("lang"));
        } else {
          for (f = b;f && 1 === f.nodeType;) {
            if (Q(f).hasOwnProperty("lang")) {
              e.language = f.getAttribute("lang");
              break;
            }
            f = f.parentNode;
          }
        }
      }
      d = a.call(this, null, e, d) || this;
      if (!d.options_ || !d.options_.techOrder || !d.options_.techOrder.length) {
        throw Error("No techOrder specified. Did you overwrite videojs.options instead of just changing the properties you want to override?");
      }
      d.tag = b;
      d.tagAttributes = b && Q(b);
      d.language(d.options_.language);
      if (e.languages) {
        var g = {};
        Object.getOwnPropertyNames(e.languages).forEach(function(b) {
          g[b.toLowerCase()] = e.languages[b];
        });
        d.languages_ = g;
      } else {
        d.languages_ = c.prototype.options_.languages;
      }
      d.cache_ = {};
      d.poster_ = e.poster || "";
      d.controls_ = !!e.controls;
      b.controls = !1;
      d.scrubbing_ = !1;
      d.el_ = d.createEl();
      f = V(d.options_);
      if (e.plugins) {
        var h = e.plugins;
        Object.getOwnPropertyNames(h).forEach(function(b) {
          if ("function" === typeof this[b]) {
            this[b](h[b]);
          } else {
            B.error("Unable to find plugin:", b);
          }
        }, d);
      }
      d.options_.playerOptions = f;
      d.initChildren();
      d.isAudio("audio" === b.nodeName.toLowerCase());
      d.controls() ? d.addClass("vjs-controls-enabled") : d.addClass("vjs-controls-disabled");
      d.el_.setAttribute("role", "region");
      d.isAudio() ? d.el_.setAttribute("aria-label", "audio player") : d.el_.setAttribute("aria-label", "video player");
      d.isAudio() && d.addClass("vjs-audio");
      d.flexNotSupported_() && d.addClass("vjs-no-flex");
      wb || d.addClass("vjs-workinghover");
      c.players[d.id_] = d;
      d.userActive(!0);
      d.reportUserActivity();
      d.listenForUserActivity_();
      d.on("fullscreenchange", d.handleFullscreenChange_);
      d.on("stageclick", d.handleStageClick_);
      return d;
    }
    __extends(c, a);
    c.prototype.dispose = function() {
      this.trigger("dispose");
      this.off("dispose");
      this.styleEl_ && this.styleEl_.parentNode && this.styleEl_.parentNode.removeChild(this.styleEl_);
      c.players[this.id_] = null;
      this.tag && this.tag.player && (this.tag.player = null);
      this.el_ && this.el_.player && (this.el_.player = null);
      this.tech_ && this.tech_.dispose();
      a.prototype.dispose.call(this);
    };
    c.prototype.createEl = function() {
      var b = this.el_ = a.prototype.createEl.call(this, "div"), c = this.tag;
      c.removeAttribute("width");
      c.removeAttribute("height");
      var f = Q(c);
      Object.getOwnPropertyNames(f).forEach(function(a) {
        "class" === a ? b.className = f[a] : b.setAttribute(a, f[a]);
      });
      c.playerId = c.id;
      c.id += "_html5_api";
      c.className = "vjs-tech";
      c.player = b.player = this;
      this.addClass("vjs-paused");
      if (!0 !== p.VIDEOJS_NO_DYNAMIC_STYLE) {
        this.styleEl_ = Nc("vjs-styles-dimensions");
        var k = Ja(".vjs-styles-defaults"), h = Ja("head");
        h.insertBefore(this.styleEl_, k ? k.nextSibling : h.firstChild);
      }
      this.width(this.options_.width);
      this.height(this.options_.height);
      this.fluid(this.options_.fluid);
      this.aspectRatio(this.options_.aspectRatio);
      k = c.getElementsByTagName("a");
      for (h = 0;h < k.length;h++) {
        var l = k.item(h);
        M(l, "vjs-hidden");
        l.setAttribute("hidden", "hidden");
      }
      c.initNetworkState_ = c.networkState;
      c.parentNode && c.parentNode.insertBefore(b, c);
      d(c, b);
      this.children_.unshift(c);
      return this.el_ = b;
    };
    c.prototype.width = function(b) {
      return this.dimension("width", b);
    };
    c.prototype.height = function(b) {
      return this.dimension("height", b);
    };
    c.prototype.dimension = function(b, a) {
      var c = b + "_";
      if (void 0 === a) {
        return this[c] || 0;
      }
      if ("" === a) {
        this[c] = void 0;
      } else {
        var e = parseFloat(a);
        if (isNaN(e)) {
          return B.error('Improper value "' + a + '" supplied for for ' + b), this;
        }
        this[c] = e;
      }
      this.updateStyleEl_();
      return this;
    };
    c.prototype.fluid = function(b) {
      if (void 0 === b) {
        return !!this.fluid_;
      }
      this.fluid_ = !!b;
      b ? this.addClass("vjs-fluid") : this.removeClass("vjs-fluid");
    };
    c.prototype.aspectRatio = function(b) {
      if (void 0 === b) {
        return this.aspectRatio_;
      }
      if (!/^\d+\:\d+$/.test(b)) {
        throw Error("Improper value supplied for aspect ratio. The format should be width:height, for example 16:9.");
      }
      this.aspectRatio_ = b;
      this.fluid(!0);
      this.updateStyleEl_();
    };
    c.prototype.updateStyleEl_ = function() {
      if (!0 === p.VIDEOJS_NO_DYNAMIC_STYLE) {
        var b = "number" === typeof this.width_ ? this.width_ : this.options_.width, a = "number" === typeof this.height_ ? this.height_ : this.options_.height, c = this.tech_ && this.tech_.el();
        c && (0 <= b && (c.width = b), 0 <= a && (c.height = a));
      } else {
        var b = (void 0 !== this.aspectRatio_ && "auto" !== this.aspectRatio_ ? this.aspectRatio_ : this.videoWidth() ? this.videoWidth() + ":" + this.videoHeight() : "16:9").split(":"), d = b[1] / b[0], b = void 0 !== this.width_ ? this.width_ : void 0 !== this.height_ ? this.height_ / d : this.videoWidth() || 300, a = void 0 !== this.height_ ? this.height_ : b * d, c = /^[^a-zA-Z]/.test(this.id()) ? "dimensions-" + this.id() : this.id() + "-dimensions";
        this.addClass(c);
        Oc(this.styleEl_, "\n      ." + c + " {\n        width: " + b + "px;\n        height: " + a + "px;\n      }\n\n      ." + c + ".vjs-fluid {\n        padding-top: " + 100 * d + "%;\n      }\n    ");
      }
    };
    c.prototype.loadTech_ = function(b, a) {
      var c = this;
      this.tech_ && this.unloadTech_();
      "Html5" !== b && this.tag && (F.getTech("Html5").disposeMediaElement(this.tag), this.tag = this.tag.player = null);
      this.techName_ = b;
      this.isReady_ = !1;
      var e = O({source:a, nativeControlsForTouch:this.options_.nativeControlsForTouch, playerId:this.id(), techId:this.id() + "_" + b + "_api", videoTracks:this.videoTracks_, textTracks:this.textTracks_, audioTracks:this.audioTracks_, autoplay:this.options_.autoplay, preload:this.options_.preload, loop:this.options_.loop, muted:this.options_.muted, poster:this.poster(), language:this.language(), "vtt.js":this.options_["vtt.js"]}, this.options_[b.toLowerCase()]);
      this.tag && (e.tag = this.tag);
      a && (this.currentType_ = a.type, a.src === this.cache_.src && 0 < this.cache_.currentTime && (e.startTime = this.cache_.currentTime), this.cache_.src = a.src);
      (a = F.getTech(b)) || (a = n.getComponent(b));
      this.tech_ = new a(e);
      this.tech_.ready(w(this, this.handleTechReady_), !0);
      vd.jsonToTextTracks(this.textTracksJson_ || [], this.tech_);
      Yd.forEach(function(b) {
        c.on(c.tech_, b, c["handleTech" + U(b) + "_"]);
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
      this.tech_.el().parentNode === this.el() || "Html5" === b && this.tag || d(this.tech_.el(), this.el());
      this.tag && (this.tag = this.tag.player = null);
    };
    c.prototype.unloadTech_ = function() {
      this.videoTracks_ = this.videoTracks();
      this.textTracks_ = this.textTracks();
      this.audioTracks_ = this.audioTracks();
      this.textTracksJson_ = vd.textTracksToJson(this.tech_);
      this.isReady_ = !1;
      this.tech_.dispose();
      this.tech_ = !1;
    };
    c.prototype.tech = function(b) {
      if (b && b.IWillNotUseThisInPlugins) {
        return this.tech_;
      }
      p.alert("\n      Please make sure that you are not using this inside of a plugin.\n      To disable this alert and error, please pass in an object with\n      `IWillNotUseThisInPlugins` to the `tech` method. See\n      https://github.com/videojs/video.js/issues/2617 for more info.\n    ");
      throw Error("\n      Please make sure that you are not using this inside of a plugin.\n      To disable this alert and error, please pass in an object with\n      `IWillNotUseThisInPlugins` to the `tech` method. See\n      https://github.com/videojs/video.js/issues/2617 for more info.\n    ");
    };
    c.prototype.addTechControlsListeners_ = function() {
      this.removeTechControlsListeners_();
      this.on(this.tech_, "mousedown", this.handleTechClick_);
      this.on(this.tech_, "touchstart", this.handleTechTouchStart_);
      this.on(this.tech_, "touchmove", this.handleTechTouchMove_);
      this.on(this.tech_, "touchend", this.handleTechTouchEnd_);
      this.on(this.tech_, "tap", this.handleTechTap_);
    };
    c.prototype.removeTechControlsListeners_ = function() {
      this.off(this.tech_, "tap", this.handleTechTap_);
      this.off(this.tech_, "touchstart", this.handleTechTouchStart_);
      this.off(this.tech_, "touchmove", this.handleTechTouchMove_);
      this.off(this.tech_, "touchend", this.handleTechTouchEnd_);
      this.off(this.tech_, "mousedown", this.handleTechClick_);
    };
    c.prototype.handleTechReady_ = function() {
      this.triggerReady();
      this.cache_.volume && this.techCall_("setVolume", this.cache_.volume);
      this.handleTechPosterChange_();
      this.handleTechDurationChange_();
      if ((this.src() || this.currentSrc()) && this.tag && this.options_.autoplay && this.paused()) {
        try {
          delete this.tag.poster;
        } catch (b) {
          B("deleting tag.poster throws in some browsers", b);
        }
        this.play();
      }
    };
    c.prototype.handleTechLoadStart_ = function() {
      this.removeClass("vjs-ended");
      this.error(null);
      this.paused() ? (this.hasStarted(!1), this.trigger("loadstart")) : (this.trigger("loadstart"), this.trigger("firstplay"));
    };
    c.prototype.hasStarted = function(b) {
      return void 0 !== b ? (this.hasStarted_ !== b && ((this.hasStarted_ = b) ? (this.addClass("vjs-has-started"), this.trigger("firstplay")) : this.removeClass("vjs-has-started")), this) : !!this.hasStarted_;
    };
    c.prototype.handleTechPlay_ = function() {
      this.removeClass("vjs-ended");
      this.removeClass("vjs-paused");
      this.addClass("vjs-playing");
      this.hasStarted(!0);
      this.trigger("play");
    };
    c.prototype.handleTechWaiting_ = function() {
      var b = this;
      this.addClass("vjs-waiting");
      this.trigger("waiting");
      this.one("timeupdate", function() {
        return b.removeClass("vjs-waiting");
      });
    };
    c.prototype.handleTechCanPlay_ = function() {
      this.removeClass("vjs-waiting");
      this.trigger("canplay");
    };
    c.prototype.handleTechCanPlayThrough_ = function() {
      this.removeClass("vjs-waiting");
      this.trigger("canplaythrough");
    };
    c.prototype.handleTechPlaying_ = function() {
      this.removeClass("vjs-waiting");
      this.trigger("playing");
    };
    c.prototype.handleTechSeeking_ = function() {
      this.addClass("vjs-seeking");
      this.trigger("seeking");
    };
    c.prototype.handleTechSeeked_ = function() {
      this.removeClass("vjs-seeking");
      this.trigger("seeked");
    };
    c.prototype.handleTechFirstPlay_ = function() {
      this.options_.starttime && this.currentTime(this.options_.starttime);
      this.addClass("vjs-has-started");
      this.trigger("firstplay");
    };
    c.prototype.handleTechPause_ = function() {
      this.removeClass("vjs-playing");
      this.addClass("vjs-paused");
      this.trigger("pause");
    };
    c.prototype.handleTechEnded_ = function() {
      this.addClass("vjs-ended");
      this.options_.loop ? (this.currentTime(0), this.play()) : this.paused() || this.pause();
      this.trigger("ended");
    };
    c.prototype.handleTechDurationChange_ = function() {
      this.duration(this.techGet_("duration"));
    };
    c.prototype.handleTechClick_ = function(b) {
      0 === b.button && this.controls() && (this.paused() ? this.play() : this.pause());
    };
    c.prototype.handleTechTap_ = function() {
      this.userActive(!this.userActive());
    };
    c.prototype.handleTechTouchStart_ = function() {
      this.userWasActive = this.userActive();
    };
    c.prototype.handleTechTouchMove_ = function() {
      this.userWasActive && this.reportUserActivity();
    };
    c.prototype.handleTechTouchEnd_ = function(b) {
      b.preventDefault();
    };
    c.prototype.handleFullscreenChange_ = function() {
      this.isFullscreen() ? this.addClass("vjs-fullscreen") : this.removeClass("vjs-fullscreen");
    };
    c.prototype.handleStageClick_ = function() {
      this.reportUserActivity();
    };
    c.prototype.handleTechFullscreenChange_ = function(b, a) {
      a && this.isFullscreen(a.isFullscreen);
      this.trigger("fullscreenchange");
    };
    c.prototype.handleTechError_ = function() {
      var b = this.tech_.error();
      this.error(b);
    };
    c.prototype.handleTechTextData_ = function() {
      var b = null;
      1 < arguments.length && (b = arguments[1]);
      this.trigger("textdata", b);
    };
    c.prototype.getCache = function() {
      return this.cache_;
    };
    c.prototype.techCall_ = function(b, a) {
      if (this.tech_ && !this.tech_.isReady_) {
        this.tech_.ready(function() {
          this[b](a);
        }, !0);
      } else {
        try {
          if (this.tech_) {
            this.tech_[b](a);
          }
        } catch (g) {
          throw B(g), g;
        }
      }
    };
    c.prototype.techGet_ = function(b) {
      if (this.tech_ && this.tech_.isReady_) {
        try {
          return this.tech_[b]();
        } catch (e) {
          throw void 0 === this.tech_[b] ? B("Video.js: " + b + " method not defined for " + this.techName_ + " playback technology.", e) : "TypeError" === e.name ? (B("Video.js: " + b + " unavailable on " + this.techName_ + " playback technology element.", e), this.tech_.isReady_ = !1) : B(e), e;
        }
      }
    };
    c.prototype.play = function() {
      if (this.src() || this.currentSrc()) {
        this.techCall_("play");
      } else {
        this.tech_.one("loadstart", function() {
          this.play();
        });
      }
      return this;
    };
    c.prototype.pause = function() {
      this.techCall_("pause");
      return this;
    };
    c.prototype.paused = function() {
      return !1 === this.techGet_("paused") ? !1 : !0;
    };
    c.prototype.scrubbing = function(b) {
      return void 0 !== b ? (this.scrubbing_ = !!b, b ? this.addClass("vjs-scrubbing") : this.removeClass("vjs-scrubbing"), this) : this.scrubbing_;
    };
    c.prototype.currentTime = function(b) {
      if (void 0 !== b) {
        return this.techCall_("setCurrentTime", b), this;
      }
      this.cache_.currentTime = this.techGet_("currentTime") || 0;
      return this.cache_.currentTime;
    };
    c.prototype.duration = function(b) {
      if (void 0 === b) {
        return this.cache_.duration || 0;
      }
      b = parseFloat(b) || 0;
      0 > b && (b = Infinity);
      b !== this.cache_.duration && (this.cache_.duration = b, Infinity === b ? this.addClass("vjs-live") : this.removeClass("vjs-live"), this.trigger("durationchange"));
      return this;
    };
    c.prototype.remainingTime = function() {
      return this.duration() - this.currentTime();
    };
    c.prototype.buffered = function() {
      var b = this.techGet_("buffered");
      b && b.length || (b = ma(0, 0));
      return b;
    };
    c.prototype.bufferedPercent = function() {
      return wc(this.buffered(), this.duration());
    };
    c.prototype.bufferedEnd = function() {
      var b = this.buffered(), a = this.duration(), b = b.end(b.length - 1);
      b > a && (b = a);
      return b;
    };
    c.prototype.volume = function(b) {
      if (void 0 !== b) {
        return b = Math.max(0, Math.min(1, parseFloat(b))), this.cache_.volume = b, this.techCall_("setVolume", b), this;
      }
      b = parseFloat(this.techGet_("volume"));
      return isNaN(b) ? 1 : b;
    };
    c.prototype.muted = function(b) {
      return void 0 !== b ? (this.techCall_("setMuted", b), this) : this.techGet_("muted") || !1;
    };
    c.prototype.supportsFullScreen = function() {
      return this.techGet_("supportsFullScreen") || !1;
    };
    c.prototype.isFullscreen = function(b) {
      return void 0 !== b ? (this.isFullscreen_ = !!b, this) : !!this.isFullscreen_;
    };
    c.prototype.requestFullscreen = function() {
      this.isFullscreen(!0);
      ta.requestFullscreen ? (I(x, ta.fullscreenchange, w(this, function e(a) {
        this.isFullscreen(x[ta.fullscreenElement]);
        !1 === this.isFullscreen() && la(x, ta.fullscreenchange, e);
        this.trigger("fullscreenchange");
      })), this.el_[ta.requestFullscreen]()) : this.tech_.supportsFullScreen() ? this.techCall_("enterFullScreen") : (this.enterFullWindow(), this.trigger("fullscreenchange"));
      return this;
    };
    c.prototype.exitFullscreen = function() {
      this.isFullscreen(!1);
      if (ta.requestFullscreen) {
        x[ta.exitFullscreen]();
      } else {
        this.tech_.supportsFullScreen() ? this.techCall_("exitFullScreen") : (this.exitFullWindow(), this.trigger("fullscreenchange"));
      }
      return this;
    };
    c.prototype.enterFullWindow = function() {
      this.isFullWindow = !0;
      this.docOrigOverflow = x.documentElement.style.overflow;
      I(x, "keydown", w(this, this.fullWindowOnEscKey));
      x.documentElement.style.overflow = "hidden";
      M(x.body, "vjs-full-window");
      this.trigger("enterFullWindow");
    };
    c.prototype.fullWindowOnEscKey = function(b) {
      27 === b.keyCode && (!0 === this.isFullscreen() ? this.exitFullscreen() : this.exitFullWindow());
    };
    c.prototype.exitFullWindow = function() {
      this.isFullWindow = !1;
      la(x, "keydown", this.fullWindowOnEscKey);
      x.documentElement.style.overflow = this.docOrigOverflow;
      qa(x.body, "vjs-full-window");
      this.trigger("exitFullWindow");
    };
    c.prototype.canPlayType = function(b) {
      for (var a, c = 0, d = this.options_.techOrder;c < d.length;c++) {
        a = U(d[c]);
        var f = F.getTech(a);
        f || (f = n.getComponent(a));
        if (!f) {
          B.error('The "' + a + '" tech is undefined. Skipped browser support check for that tech.');
        } else {
          if (f.isSupported() && (a = f.canPlayType(b))) {
            return a;
          }
        }
      }
      return "";
    };
    c.prototype.selectSource = function(b) {
      var a = this, c = this.options_.techOrder.map(U).map(function(b) {
        return [b, F.getTech(b) || n.getComponent(b)];
      }).filter(function(b) {
        var a = b[0];
        if (b = b[1]) {
          return b.isSupported();
        }
        B.error('The "' + a + '" tech is undefined. Skipped browser support check for that tech.');
        return !1;
      }), d = function(b, a, c) {
        var e;
        b.some(function(b) {
          return a.some(function(a) {
            if (e = c(b, a)) {
              return !0;
            }
          });
        });
        return e;
      }, f = function(b) {
        return function(a, c) {
          return b(c, a);
        };
      }, h = function(b, c) {
        var e = b[0];
        if (b[1].canPlaySource(c, a.options_[e.toLowerCase()])) {
          return {source:c, tech:e};
        }
      };
      return (this.options_.sourceOrder ? d(b, c, f(h)) : d(c, b, h)) || !1;
    };
    c.prototype.src = function(b) {
      if (void 0 === b) {
        return this.techGet_("src");
      }
      var a = F.getTech(this.techName_);
      a || (a = n.getComponent(this.techName_));
      Array.isArray(b) ? this.sourceList_(b) : "string" === typeof b ? this.src({src:b}) : b instanceof Object && (b.type && !a.canPlaySource(b, this.options_[this.techName_.toLowerCase()]) ? this.sourceList_([b]) : (this.cache_.src = b.src, this.currentType_ = b.type || "", this.ready(function() {
        a.prototype.hasOwnProperty("setSource") ? this.techCall_("setSource", b) : this.techCall_("src", b.src);
        "auto" === this.options_.preload && this.load();
        this.options_.autoplay && this.play();
      }, !0)));
      return this;
    };
    c.prototype.sourceList_ = function(b) {
      (b = this.selectSource(b)) ? b.tech === this.techName_ ? this.src(b.source) : this.loadTech_(b.tech, b.source) : (this.setTimeout(function() {
        this.error({code:4, message:this.localize(this.options_.notSupportedMessage)});
      }, 0), this.triggerReady());
    };
    c.prototype.load = function() {
      this.techCall_("load");
      return this;
    };
    c.prototype.reset = function() {
      this.loadTech_(U(this.options_.techOrder[0]), null);
      this.techCall_("reset");
      return this;
    };
    c.prototype.currentSrc = function() {
      return this.techGet_("currentSrc") || this.cache_.src || "";
    };
    c.prototype.currentType = function() {
      return this.currentType_ || "";
    };
    c.prototype.preload = function(b) {
      return void 0 !== b ? (this.techCall_("setPreload", b), this.options_.preload = b, this) : this.techGet_("preload");
    };
    c.prototype.autoplay = function(b) {
      return void 0 !== b ? (this.techCall_("setAutoplay", b), this.options_.autoplay = b, this) : this.techGet_("autoplay", b);
    };
    c.prototype.loop = function(b) {
      return void 0 !== b ? (this.techCall_("setLoop", b), this.options_.loop = b, this) : this.techGet_("loop");
    };
    c.prototype.poster = function(b) {
      if (void 0 === b) {
        return this.poster_;
      }
      b || (b = "");
      this.poster_ = b;
      this.techCall_("setPoster", b);
      this.trigger("posterchange");
      return this;
    };
    c.prototype.handleTechPosterChange_ = function() {
      !this.poster_ && this.tech_ && this.tech_.poster && (this.poster_ = this.tech_.poster() || "", this.trigger("posterchange"));
    };
    c.prototype.controls = function(b) {
      return void 0 !== b ? (b = !!b, this.controls_ !== b && (this.controls_ = b, this.usingNativeControls() && this.techCall_("setControls", b), b ? (this.removeClass("vjs-controls-disabled"), this.addClass("vjs-controls-enabled"), this.trigger("controlsenabled"), this.usingNativeControls() || this.addTechControlsListeners_()) : (this.removeClass("vjs-controls-enabled"), this.addClass("vjs-controls-disabled"), this.trigger("controlsdisabled"), this.usingNativeControls() || this.removeTechControlsListeners_())), 
      this) : !!this.controls_;
    };
    c.prototype.usingNativeControls = function(b) {
      return void 0 !== b ? (b = !!b, this.usingNativeControls_ !== b && ((this.usingNativeControls_ = b) ? (this.addClass("vjs-using-native-controls"), this.trigger("usingnativecontrols")) : (this.removeClass("vjs-using-native-controls"), this.trigger("usingcustomcontrols"))), this) : !!this.usingNativeControls_;
    };
    c.prototype.error = function(b) {
      if (void 0 === b) {
        return this.error_ || null;
      }
      if (null === b) {
        return this.error_ = b, this.removeClass("vjs-error"), this.errorDisplay && this.errorDisplay.close(), this;
      }
      this.error_ = new W(b);
      this.addClass("vjs-error");
      B.error("(CODE:" + this.error_.code + " " + W.errorTypes[this.error_.code] + ")", this.error_.message, this.error_);
      this.trigger("error");
      return this;
    };
    c.prototype.reportUserActivity = function(b) {
      this.userActivity_ = !0;
    };
    c.prototype.userActive = function(b) {
      if (void 0 !== b) {
        b = !!b;
        if (b !== this.userActive_) {
          if (this.userActive_ = b) {
            this.userActivity_ = !0, this.removeClass("vjs-user-inactive"), this.addClass("vjs-user-active"), this.trigger("useractive");
          } else {
            this.userActivity_ = !1;
            if (this.tech_) {
              this.tech_.one("mousemove", function(b) {
                b.stopPropagation();
                b.preventDefault();
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
    c.prototype.listenForUserActivity_ = function() {
      var b, a, c, d = w(this, this.reportUserActivity);
      this.on("mousedown", function() {
        d();
        this.clearInterval(b);
        b = this.setInterval(d, 250);
      });
      this.on("mousemove", function(b) {
        if (b.screenX !== a || b.screenY !== c) {
          a = b.screenX, c = b.screenY, d();
        }
      });
      this.on("mouseup", function(a) {
        d();
        this.clearInterval(b);
      });
      this.on("keydown", d);
      this.on("keyup", d);
      var f;
      this.setInterval(function() {
        if (this.userActivity_) {
          this.userActivity_ = !1;
          this.userActive(!0);
          this.clearTimeout(f);
          var b = this.options_.inactivityTimeout;
          0 < b && (f = this.setTimeout(function() {
            this.userActivity_ || this.userActive(!1);
          }, b));
        }
      }, 250);
    };
    c.prototype.playbackRate = function(b) {
      return void 0 !== b ? (this.techCall_("setPlaybackRate", b), this) : this.tech_ && this.tech_.featuresPlaybackRate ? this.techGet_("playbackRate") : 1;
    };
    c.prototype.isAudio = function(b) {
      return void 0 !== b ? (this.isAudio_ = !!b, this) : !!this.isAudio_;
    };
    c.prototype.videoTracks = function() {
      return this.tech_ ? this.tech_.videoTracks() : this.videoTracks_ = this.videoTracks_ || new Fd;
    };
    c.prototype.audioTracks = function() {
      return this.tech_ ? this.tech_.audioTracks() : this.audioTracks_ = this.audioTracks_ || new Gd;
    };
    c.prototype.textTracks = function() {
      if (this.tech_) {
        return this.tech_.textTracks();
      }
    };
    c.prototype.remoteTextTracks = function() {
      if (this.tech_) {
        return this.tech_.remoteTextTracks();
      }
    };
    c.prototype.remoteTextTrackEls = function() {
      if (this.tech_) {
        return this.tech_.remoteTextTrackEls();
      }
    };
    c.prototype.addTextTrack = function(b, a, c) {
      if (this.tech_) {
        return this.tech_.addTextTrack(b, a, c);
      }
    };
    c.prototype.addRemoteTextTrack = function(b) {
      if (this.tech_) {
        return this.tech_.addRemoteTextTrack(b);
      }
    };
    c.prototype.removeRemoteTextTrack = function(b) {
      var a = (void 0 === b ? {} : b).track;
      if (this.tech_) {
        return this.tech_.removeRemoteTextTrack(void 0 === a ? b : a);
      }
    };
    c.prototype.videoWidth = function() {
      return this.tech_ && this.tech_.videoWidth && this.tech_.videoWidth() || 0;
    };
    c.prototype.videoHeight = function() {
      return this.tech_ && this.tech_.videoHeight && this.tech_.videoHeight() || 0;
    };
    c.prototype.language = function(b) {
      if (void 0 === b) {
        return this.language_;
      }
      this.language_ = String(b).toLowerCase();
      return this;
    };
    c.prototype.languages = function() {
      return V(c.prototype.options_.languages, this.languages_);
    };
    c.prototype.toJSON = function() {
      var b = V(this.options_), a = b.tracks;
      b.tracks = [];
      for (var c = 0;c < a.length;c++) {
        var d = a[c], d = V(d);
        d.player = void 0;
        b.tracks[c] = d;
      }
      return b;
    };
    c.prototype.createModal = function(b, a) {
      var c = this;
      a = a || {};
      a.content = b || "";
      var e = new Oa(this, a);
      this.addChild(e);
      e.on("dispose", function() {
        c.removeChild(e);
      });
      return e.open();
    };
    c.getTagSettings = function(b) {
      var a = {sources:[], tracks:[]}, c = Q(b), d = c["data-setup"];
      if (null !== d) {
        var f = ud(d || "{}"), d = f[0], f = f[1];
        d && B.error(d);
        O(c, f);
      }
      O(a, c);
      if (b.hasChildNodes()) {
        for (b = b.childNodes, c = 0, d = b.length;c < d;c++) {
          var f = b[c], h = f.nodeName.toLowerCase();
          "source" === h ? a.sources.push(Q(f)) : "track" === h && a.tracks.push(Q(f));
        }
      }
      return a;
    };
    c.prototype.flexNotSupported_ = function() {
      var a = x.createElement("i");
      return !("flexBasis" in a.style || "webkitFlexBasis" in a.style || "mozFlexBasis" in a.style || "msFlexBasis" in a.style || "msFlexOrder" in a.style);
    };
    return c;
  }(n);
  ia.players = {};
  var Sa = p.navigator;
  ia.prototype.options_ = {techOrder:["html5", "flash"], html5:{}, flash:{}, defaultVolume:0, inactivityTimeout:2E3, playbackRates:[], children:"mediaLoader posterImage textTrackDisplay loadingSpinner bigPlayButton controlBar errorDisplay textTrackSettings".split(" "), language:Sa && (Sa.languages && Sa.languages[0] || Sa.userLanguage || Sa.language) || "en", languages:{}, notSupportedMessage:"No compatible source was found for this media."};
  ["ended", "seeking", "seekable", "networkState", "readyState"].forEach(function(a) {
    ia.prototype[a] = function() {
      return this.techGet_(a);
    };
  });
  Yd.forEach(function(a) {
    ia.prototype["handleTech" + U(a) + "_"] = function() {
      return this.trigger(a);
    };
  });
  n.registerComponent("Player", ia);
  var Rf = function(a) {
    function c(b) {
      void 0 === b && (b = {});
      b = V(b, {kind:kf[b.kind] || ""});
      var d = a.call(this, b) || this, f = !1;
      if (X) {
        for (var h in c.prototype) {
          "constructor" !== h && (d[h] = c.prototype[h]);
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
    __extends(c, a);
    return c;
  }(Rb), Sf = function(a) {
    function c(b) {
      void 0 === b && (b = {});
      b = V(b, {kind:jf[b.kind] || ""});
      var d = a.call(this, b) || this, f = !1;
      if (X) {
        for (var h in c.prototype) {
          "constructor" !== h && (d[h] = c.prototype[h]);
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
    __extends(c, a);
    return c;
  }(Rb), Tf = function(a, c) {
    if ("function" !== typeof c && null !== c) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof c);
    }
    a.prototype = Object.create(c && c.prototype, {constructor:{value:a, enumerable:!1, writable:!0, configurable:!0}});
    c && (a.super_ = c);
  };
  "undefined" === typeof HTMLVideoElement && p.document && p.document.createElement && (x.createElement("video"), x.createElement("audio"), x.createElement("track"));
  if (!0 !== p.VIDEOJS_NO_DYNAMIC_STYLE) {
    var ob = Ja(".vjs-styles-defaults");
    if (!ob) {
      var ob = Nc("vjs-styles-defaults"), ic = Ja("head");
      ic && ic.insertBefore(ob, ic.firstChild);
      Oc(ob, "\n      .video-js {\n        width: 300px;\n        height: 150px;\n      }\n\n      .vjs-fluid {\n        padding-top: 56.25%\n      }\n    ");
    }
  }
  y && (Mc = y);
  setTimeout(Bb, 1);
  y.VERSION = "5.12.6";
  y.options = ia.prototype.options_;
  y.getPlayers = function() {
    return ia.players;
  };
  y.players = ia.players;
  y.getComponent = n.getComponent;
  y.registerComponent = function(a, c) {
    F.isTech(c) && B.warn("The " + a + " tech was registered as a component. It should instead be registered using videojs.registerTech(name, tech)");
    n.registerComponent.call(n, a, c);
  };
  y.getTech = F.getTech;
  y.registerTech = F.registerTech;
  y.browser = te;
  y.TOUCH_ENABLED = Za;
  y.extend = function(a, c) {
    void 0 === c && (c = {});
    var b = function() {
      a.apply(this, arguments);
    }, d = {};
    "object" === typeof c ? ("function" === typeof c.init && (B.warn("Constructor logic via init() is deprecated; please use constructor() instead."), c.constructor = c.init), c.constructor !== Object.prototype.constructor && (b = c.constructor), d = c) : "function" === typeof c && (b = c);
    Tf(b, a);
    for (var f in d) {
      d.hasOwnProperty(f) && (b.prototype[f] = d[f]);
    }
    return b;
  };
  y.mergeOptions = V;
  y.bind = w;
  y.plugin = function(a, c) {
    ia.prototype[a] = c;
  };
  y.addLanguage = function(a, c) {
    a = ("" + a).toLowerCase();
    return uc(y.options.languages, (b = {}, b[a] = c, b))[a];
    var b;
  };
  y.log = B;
  y.createTimeRange = y.createTimeRanges = ma;
  y.formatTime = ra;
  y.parseUrl = yd;
  y.isCrossOrigin = Sb;
  y.EventTarget = Y;
  y.on = I;
  y.one = Ia;
  y.off = la;
  y.trigger = Ua;
  y.xhr = na;
  y.TextTrack = jb;
  y.AudioTrack = Rf;
  y.VideoTrack = Sf;
  y.isEl = Ea;
  y.isTextNode = lc;
  y.createEl = A;
  y.hasClass = l;
  y.addClass = M;
  y.removeClass = qa;
  y.toggleClass = Ga;
  y.setAttributes = C;
  y.getAttributes = Q;
  y.emptyEl = S;
  y.appendContent = P;
  y.insertContent = N;
  "function" === typeof define && define.amd ? define("videojs", [], function() {
    return y;
  }) : "object" === typeof exports && "object" === typeof module && (module.exports = y);
  return y;
}();

