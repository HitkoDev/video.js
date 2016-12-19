/**
 * @license
 * Video.js 5.14.0 <http://videojs.com/>
 * Copyright Brightcove, Inc. <https://www.brightcove.com/>
 * Available under Apache License Version 2.0
 * <https://github.com/videojs/video.js/blob/master/LICENSE>
 *
 * Includes vtt.js <https://github.com/mozilla/vtt.js>
 * Available under Apache License Version 2.0
 * <https://github.com/mozilla/vtt.js/blob/master/LICENSE>
 */

var $jscomp = {scope:{}};
$jscomp.defineProperty = "function" == typeof Object.defineProperties ? Object.defineProperty : function(f, k, r) {
  if (r.get || r.set) {
    throw new TypeError("ES3 does not support getters and setters.");
  }
  f != Array.prototype && f != Object.prototype && (f[k] = r.value);
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
  var k = 0;
  return $jscomp.iteratorPrototype(function() {
    return k < f.length ? {done:!1, value:f[k++]} : {done:!0};
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
$jscomp.iteratorFromArray = function(f, k) {
  $jscomp.initSymbolIterator();
  f instanceof String && (f += "");
  var r = 0, m = {next:function() {
    if (r < f.length) {
      var H = r++;
      return {value:k(H, f[H]), done:!1};
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
$jscomp.polyfill = function(f, k, r, m) {
  if (k) {
    r = $jscomp.global;
    f = f.split(".");
    for (m = 0;m < f.length - 1;m++) {
      var H = f[m];
      H in r || (r[H] = {});
      r = r[H];
    }
    f = f[f.length - 1];
    m = r[f];
    k = k(m);
    k != m && null != k && $jscomp.defineProperty(r, f, {configurable:!0, writable:!0, value:k});
  }
};
$jscomp.polyfill("Array.prototype.values", function(f) {
  return f ? f : function() {
    return $jscomp.iteratorFromArray(this, function(f, r) {
      return r;
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
$jscomp.owns = function(f, k) {
  return Object.prototype.hasOwnProperty.call(f, k);
};
$jscomp.polyfill("Object.assign", function(f) {
  return f ? f : function(f, r) {
    for (var m = 1;m < arguments.length;m++) {
      var k = arguments[m];
      if (k) {
        for (var ba in k) {
          $jscomp.owns(k, ba) && (f[ba] = k[ba]);
        }
      }
    }
    return f;
  };
}, "es6-impl", "es3");
$jscomp.polyfill("Array.prototype.fill", function(f) {
  return f ? f : function(f, r, m) {
    var k = this.length || 0;
    0 > r && (r = Math.max(0, k + r));
    if (null == m || m > k) {
      m = k;
    }
    m = Number(m);
    0 > m && (m = Math.max(0, k + m));
    for (r = Number(r || 0);r < m;r++) {
      this[r] = f;
    }
    return this;
  };
}, "es6-impl", "es3");
(function(f) {
  var k = f.vttjs = {}, r = k.VTTCue, m = k.VTTRegion, H = f.VTTCue, ba = f.VTTRegion;
  k.shim = function() {
    k.VTTCue = r;
    k.VTTRegion = m;
  };
  k.restore = function() {
    k.VTTCue = H;
    k.VTTRegion = ba;
  };
})(this);
(function(f, k) {
  function r(f) {
    return "string" !== typeof f ? !1 : da[f.toLowerCase()] ? f.toLowerCase() : !1;
  }
  function m(f) {
    for (var k = 1;k < arguments.length;k++) {
      var m = arguments[k], r;
      for (r in m) {
        f[r] = m[r];
      }
    }
    return f;
  }
  function H(f, k, u) {
    var t = this, H = /MSIE\s8\.0/.test(navigator.userAgent), A = {};
    H ? t = document.createElement("custom") : A.enumerable = !0;
    t.hasBeenReset = !1;
    var da = "", I = !1, y = f, W = k, ha = u, e = null, z = "", J = !0, oa = "auto", h = "start", L = 50, sa = "middle", ia = 50, C = "middle";
    Object.defineProperty(t, "id", m({}, A, {get:function() {
      return da;
    }, set:function(e) {
      da = "" + e;
    }}));
    Object.defineProperty(t, "pauseOnExit", m({}, A, {get:function() {
      return I;
    }, set:function(e) {
      I = !!e;
    }}));
    Object.defineProperty(t, "startTime", m({}, A, {get:function() {
      return y;
    }, set:function(e) {
      if ("number" !== typeof e) {
        throw new TypeError("Start time must be set to a number.");
      }
      y = e;
      this.hasBeenReset = !0;
    }}));
    Object.defineProperty(t, "endTime", m({}, A, {get:function() {
      return W;
    }, set:function(e) {
      if ("number" !== typeof e) {
        throw new TypeError("End time must be set to a number.");
      }
      W = e;
      this.hasBeenReset = !0;
    }}));
    Object.defineProperty(t, "text", m({}, A, {get:function() {
      return ha;
    }, set:function(e) {
      ha = "" + e;
      this.hasBeenReset = !0;
    }}));
    Object.defineProperty(t, "region", m({}, A, {get:function() {
      return e;
    }, set:function(h) {
      e = h;
      this.hasBeenReset = !0;
    }}));
    Object.defineProperty(t, "vertical", m({}, A, {get:function() {
      return z;
    }, set:function(e) {
      e = "string" !== typeof e ? !1 : ba[e.toLowerCase()] ? e.toLowerCase() : !1;
      if (!1 === e) {
        throw new SyntaxError("An invalid or illegal string was specified.");
      }
      z = e;
      this.hasBeenReset = !0;
    }}));
    Object.defineProperty(t, "snapToLines", m({}, A, {get:function() {
      return J;
    }, set:function(e) {
      J = !!e;
      this.hasBeenReset = !0;
    }}));
    Object.defineProperty(t, "line", m({}, A, {get:function() {
      return oa;
    }, set:function(e) {
      if ("number" !== typeof e && "auto" !== e) {
        throw new SyntaxError("An invalid number or illegal string was specified.");
      }
      oa = e;
      this.hasBeenReset = !0;
    }}));
    Object.defineProperty(t, "lineAlign", m({}, A, {get:function() {
      return h;
    }, set:function(e) {
      e = r(e);
      if (!e) {
        throw new SyntaxError("An invalid or illegal string was specified.");
      }
      h = e;
      this.hasBeenReset = !0;
    }}));
    Object.defineProperty(t, "position", m({}, A, {get:function() {
      return L;
    }, set:function(e) {
      if (0 > e || 100 < e) {
        throw Error("Position must be between 0 and 100.");
      }
      L = e;
      this.hasBeenReset = !0;
    }}));
    Object.defineProperty(t, "positionAlign", m({}, A, {get:function() {
      return sa;
    }, set:function(e) {
      e = r(e);
      if (!e) {
        throw new SyntaxError("An invalid or illegal string was specified.");
      }
      sa = e;
      this.hasBeenReset = !0;
    }}));
    Object.defineProperty(t, "size", m({}, A, {get:function() {
      return ia;
    }, set:function(e) {
      if (0 > e || 100 < e) {
        throw Error("Size must be between 0 and 100.");
      }
      ia = e;
      this.hasBeenReset = !0;
    }}));
    Object.defineProperty(t, "align", m({}, A, {get:function() {
      return C;
    }, set:function(e) {
      e = r(e);
      if (!e) {
        throw new SyntaxError("An invalid or illegal string was specified.");
      }
      C = e;
      this.hasBeenReset = !0;
    }}));
    t.displayState = void 0;
    if (H) {
      return t;
    }
  }
  var ba = {"":!0, lr:!0, rl:!0}, da = {start:!0, middle:!0, end:!0, left:!0, right:!0};
  H.prototype.getCueAsHTML = function() {
    return WebVTT.convertCueToDOMTree(window, this.text);
  };
  f.VTTCue = f.VTTCue || H;
  k.VTTCue = H;
})(this, this.vttjs || {});
(function(f, k) {
  function r(f) {
    return "number" === typeof f && 0 <= f && 100 >= f;
  }
  function m() {
    var f = 100, k = 3, m = 0, I = 100, u = 0, t = 100, Q = "";
    Object.defineProperties(this, {width:{enumerable:!0, get:function() {
      return f;
    }, set:function(k) {
      if (!r(k)) {
        throw Error("Width must be between 0 and 100.");
      }
      f = k;
    }}, lines:{enumerable:!0, get:function() {
      return k;
    }, set:function(f) {
      if ("number" !== typeof f) {
        throw new TypeError("Lines must be set to a number.");
      }
      k = f;
    }}, regionAnchorY:{enumerable:!0, get:function() {
      return I;
    }, set:function(f) {
      if (!r(f)) {
        throw Error("RegionAnchorX must be between 0 and 100.");
      }
      I = f;
    }}, regionAnchorX:{enumerable:!0, get:function() {
      return m;
    }, set:function(f) {
      if (!r(f)) {
        throw Error("RegionAnchorY must be between 0 and 100.");
      }
      m = f;
    }}, viewportAnchorY:{enumerable:!0, get:function() {
      return t;
    }, set:function(f) {
      if (!r(f)) {
        throw Error("ViewportAnchorY must be between 0 and 100.");
      }
      t = f;
    }}, viewportAnchorX:{enumerable:!0, get:function() {
      return u;
    }, set:function(f) {
      if (!r(f)) {
        throw Error("ViewportAnchorX must be between 0 and 100.");
      }
      u = f;
    }}, scroll:{enumerable:!0, get:function() {
      return Q;
    }, set:function(f) {
      f = "string" !== typeof f ? !1 : H[f.toLowerCase()] ? f.toLowerCase() : !1;
      if (!1 === f) {
        throw new SyntaxError("An invalid or illegal string was specified.");
      }
      Q = f;
    }}});
  }
  var H = {"":!0, up:!0};
  f.VTTRegion = f.VTTRegion || m;
  k.VTTRegion = m;
})(this, this.vttjs || {});
(function(f) {
  function k(e, f) {
    this.name = "ParsingError";
    this.code = e.code;
    this.message = f || e.message;
  }
  function r(e) {
    e = e.match(/^(\d+):(\d{2})(:\d{2})?\.(\d{3})/);
    if (!e) {
      return null;
    }
    if (e[3]) {
      var f = e[3].replace(":", "");
      return 3600 * (e[1] | 0) + 60 * (e[2] | 0) + (f | 0) + (e[4] | 0) / 1E3;
    }
    return 59 < e[1] ? 3600 * (e[1] | 0) + 60 * (e[2] | 0) + 0 + (e[4] | 0) / 1E3 : 0 + 60 * (e[1] | 0) + (e[2] | 0) + (e[4] | 0) / 1E3;
  }
  function m() {
    this.values = A(null);
  }
  function H(e, f, k, m) {
    e = m ? e.split(m) : [e];
    for (var h in e) {
      "string" === typeof e[h] && (m = e[h].split(k), 2 === m.length && f(m[0], m[1]));
    }
  }
  function ba(e, f, J) {
    function z() {
      var h = r(e);
      if (null === h) {
        throw new k(k.Errors.BadTimeStamp, "Malformed timestamp: " + t);
      }
      e = e.replace(/^[^\sa-zA-Z-]+/, "");
      return h;
    }
    function h() {
      e = e.replace(/^\s+/, "");
    }
    var t = e;
    h();
    f.startTime = z();
    h();
    if ("--\x3e" !== e.substr(0, 3)) {
      throw new k(k.Errors.BadTimeStamp, "Malformed time stamp (time stamps must be separated by '--\x3e'): " + t);
    }
    e = e.substr(3);
    h();
    f.endTime = z();
    h();
    (function(e, h) {
      var f = new m;
      H(e, function(e, h) {
        switch(e) {
          case "region":
            for (var z = J.length - 1;0 <= z;z--) {
              if (J[z].id === h) {
                f.set(e, J[z].region);
                break;
              }
            }
            break;
          case "vertical":
            f.alt(e, h, ["rl", "lr"]);
            break;
          case "line":
            h = h.split(",");
            z = h[0];
            f.integer(e, z);
            f.percent(e, z) ? f.set("snapToLines", !1) : null;
            f.alt(e, z, ["auto"]);
            2 === h.length && f.alt("lineAlign", h[1], ["start", "middle", "end"]);
            break;
          case "position":
            h = h.split(",");
            f.percent(e, h[0]);
            2 === h.length && f.alt("positionAlign", h[1], ["start", "middle", "end"]);
            break;
          case "size":
            f.percent(e, h);
            break;
          case "align":
            f.alt(e, h, ["start", "middle", "end", "left", "right"]);
        }
      }, /:/, /\s/);
      h.region = f.get("region", null);
      h.vertical = f.get("vertical", "");
      h.line = f.get("line", "auto");
      h.lineAlign = f.get("lineAlign", "start");
      h.snapToLines = f.get("snapToLines", !0);
      h.size = f.get("size", 100);
      h.align = f.get("align", "middle");
      h.position = f.get("position", {start:0, left:0, middle:50, end:100, right:100}, h.align);
      h.positionAlign = f.get("positionAlign", {start:"start", left:"start", middle:"middle", end:"end", right:"end"}, h.align);
    })(e, f);
  }
  function da(e, f) {
    function z() {
      if (!f) {
        return null;
      }
      var e = f.match(/^([^<]*)(<[^>]+>?)?/), e = e[1] ? e[1] : e[2];
      f = f.substr(e.length);
      return e;
    }
    function k(e) {
      return na[e];
    }
    function h(e) {
      for (;F = e.match(/&(amp|lt|gt|lrm|rlm|nbsp);/);) {
        e = e.replace(F[0], k);
      }
      return e;
    }
    function m(h, f) {
      var z = Ya[h];
      if (!z) {
        return null;
      }
      var k = e.document.createElement(z);
      k.localName = z;
      (h = y[h]) && f && (k[h] = f.trim());
      return k;
    }
    for (var t = e.document.createElement("div"), u = t, C, Y = [];null !== (C = z());) {
      if ("<" === C[0]) {
        if ("/" === C[1]) {
          Y.length && Y[Y.length - 1] === C.substr(2).replace(">", "") && (Y.pop(), u = u.parentNode);
        } else {
          var U = r(C.substr(1, C.length - 2));
          if (U) {
            C = e.document.createProcessingInstruction("timestamp", U), u.appendChild(C);
          } else {
            var F = C.match(/^<([^.\s/0-9>]+)(\.[^\s\\>]+)?([^>\\]+)?(\\?)>?$/);
            F && (!(C = m(F[1], F[3])) || W[C.localName] && W[C.localName] !== u.localName || (F[2] && (C.className = F[2].substr(1).replace(".", " ")), Y.push(F[1]), u.appendChild(C), u = C));
          }
        }
      } else {
        u.appendChild(e.document.createTextNode(h(C)));
      }
    }
    return t;
  }
  function Xa(e) {
    function f(e, h) {
      for (var f = h.childNodes.length - 1;0 <= f;f--) {
        e.push(h.childNodes[f]);
      }
    }
    function k(e) {
      if (!e || !e.length) {
        return null;
      }
      var h = e.pop(), z = h.textContent || h.innerText;
      if (z) {
        return (h = z.match(/^.*(\n|\r)/)) ? (e.length = 0, h[0]) : z;
      }
      if ("ruby" === h.tagName) {
        return k(e);
      }
      if (h.childNodes) {
        return f(e, h), k(e);
      }
    }
    var m = [], h = "";
    if (!e || !e.childNodes) {
      return "ltr";
    }
    for (f(m, e);h = k(m);) {
      for (var r = 0;r < h.length;r++) {
        e = h.charCodeAt(r);
        for (var t = 0;t < ha.length;t++) {
          if (ha[t] === e) {
            return "rtl";
          }
        }
      }
    }
    return "ltr";
  }
  function I() {
  }
  function u(e, f, k) {
    var z = /MSIE\s8\.0/.test(navigator.userAgent), h = "rgba(255, 255, 255, 1)", m = "rgba(0, 0, 0, 0.8)";
    z && (h = "rgb(255, 255, 255)", m = "rgb(0, 0, 0)");
    this.cue = f;
    this.cueDiv = da(e, f.text);
    h = {color:h, backgroundColor:m, position:"relative", left:0, right:0, top:0, bottom:0, display:"inline"};
    z || (h.writingMode = "" === f.vertical ? "horizontal-tb" : "lr" === f.vertical ? "vertical-lr" : "vertical-rl", h.unicodeBidi = "plaintext");
    this.applyStyles(h, this.cueDiv);
    this.div = e.document.createElement("div");
    h = {textAlign:"middle" === f.align ? "center" : f.align, font:k.font, whiteSpace:"pre-line", position:"absolute"};
    z || (h.direction = Xa(this.cueDiv), h.writingMode = "" === f.vertical ? "horizontal-tb" : "lr" === f.vertical ? "vertical-lr" : "vertical-rl".stylesunicodeBidi = "plaintext");
    this.applyStyles(h);
    this.div.appendChild(this.cueDiv);
    e = 0;
    switch(f.positionAlign) {
      case "start":
        e = f.position;
        break;
      case "middle":
        e = f.position - f.size / 2;
        break;
      case "end":
        e = f.position - f.size;
    }
    "" === f.vertical ? this.applyStyles({left:this.formatStyle(e, "%"), width:this.formatStyle(f.size, "%")}) : this.applyStyles({top:this.formatStyle(e, "%"), height:this.formatStyle(f.size, "%")});
    this.move = function(e) {
      this.applyStyles({top:this.formatStyle(e.top, "px"), bottom:this.formatStyle(e.bottom, "px"), left:this.formatStyle(e.left, "px"), right:this.formatStyle(e.right, "px"), height:this.formatStyle(e.height, "px"), width:this.formatStyle(e.width, "px")});
    };
  }
  function t(e) {
    var f = /MSIE\s8\.0/.test(navigator.userAgent), k, m, h, r;
    if (e.div) {
      m = e.div.offsetHeight;
      h = e.div.offsetWidth;
      r = e.div.offsetTop;
      var t = (t = e.div.childNodes) && (t = t[0]) && t.getClientRects && t.getClientRects();
      e = e.div.getBoundingClientRect();
      k = t ? Math.max(t[0] && t[0].height || 0, e.height / t.length) : 0;
    }
    this.left = e.left;
    this.right = e.right;
    this.top = e.top || r;
    this.height = e.height || m;
    this.bottom = e.bottom || r + (e.height || m);
    this.width = e.width || h;
    this.lineHeight = void 0 !== k ? k : e.lineHeight;
    f && !this.lineHeight && (this.lineHeight = 13);
  }
  function Q() {
  }
  var A = Object.create || function() {
    function e() {
    }
    return function(f) {
      if (1 !== arguments.length) {
        throw Error("Object.create shim only accepts one parameter.");
      }
      e.prototype = f;
      return new e;
    };
  }();
  k.prototype = A(Error.prototype);
  k.prototype.constructor = k;
  k.Errors = {BadSignature:{code:0, message:"Malformed WebVTT signature."}, BadTimeStamp:{code:1, message:"Malformed time stamp."}};
  m.prototype = {set:function(e, f) {
    this.get(e) || "" === f || (this.values[e] = f);
  }, get:function(e, f, k) {
    return k ? this.has(e) ? this.values[e] : f[k] : this.has(e) ? this.values[e] : f;
  }, has:function(e) {
    return e in this.values;
  }, alt:function(e, f, k) {
    for (var z = 0;z < k.length;++z) {
      if (f === k[z]) {
        this.set(e, f);
        break;
      }
    }
  }, integer:function(e, f) {
    /^-?\d+$/.test(f) && this.set(e, parseInt(f, 10));
  }, percent:function(e, f) {
    return f.match(/^([\d]{1,3})(\.[\d]*)?%$/) && (f = parseFloat(f), 0 <= f && 100 >= f) ? (this.set(e, f), !0) : !1;
  }};
  var na = {"&amp;":"&", "&lt;":"<", "&gt;":">", "&lrm;":"\u200e", "&rlm;":"\u200f", "&nbsp;":"\u00a0"}, Ya = {c:"span", i:"i", b:"b", u:"u", ruby:"ruby", rt:"rt", v:"span", lang:"span"}, y = {v:"title", lang:"lang"}, W = {rt:"ruby"}, ha = [1470, 1472, 1475, 1478, 1488, 1489, 1490, 1491, 1492, 1493, 1494, 1495, 1496, 1497, 1498, 1499, 1500, 1501, 1502, 1503, 1504, 1505, 1506, 1507, 1508, 1509, 1510, 1511, 1512, 1513, 1514, 1520, 1521, 1522, 1523, 1524, 1544, 1547, 1549, 1563, 1566, 1567, 1568, 1569, 
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
  I.prototype.applyStyles = function(e, f) {
    f = f || this.div;
    for (var k in e) {
      e.hasOwnProperty(k) && (f.style[k] = e[k]);
    }
  };
  I.prototype.formatStyle = function(e, f) {
    return 0 === e ? 0 : e + f;
  };
  u.prototype = A(I.prototype);
  u.prototype.constructor = u;
  t.prototype.move = function(e, f) {
    f = void 0 !== f ? f : this.lineHeight;
    switch(e) {
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
  t.prototype.overlaps = function(e) {
    return this.left < e.right && this.right > e.left && this.top < e.bottom && this.bottom > e.top;
  };
  t.prototype.overlapsAny = function(e) {
    for (var f = 0;f < e.length;f++) {
      if (this.overlaps(e[f])) {
        return !0;
      }
    }
    return !1;
  };
  t.prototype.within = function(e) {
    return this.top >= e.top && this.bottom <= e.bottom && this.left >= e.left && this.right <= e.right;
  };
  t.prototype.overlapsOppositeAxis = function(e, f) {
    switch(f) {
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
  t.prototype.intersectPercentage = function(e) {
    return Math.max(0, Math.min(this.right, e.right) - Math.max(this.left, e.left)) * Math.max(0, Math.min(this.bottom, e.bottom) - Math.max(this.top, e.top)) / (this.height * this.width);
  };
  t.prototype.toCSSCompatValues = function(e) {
    return {top:this.top - e.top, bottom:e.bottom - this.bottom, left:this.left - e.left, right:e.right - this.right, height:this.height, width:this.width};
  };
  t.getSimpleBoxPosition = function(e) {
    var f = e.div ? e.div.offsetHeight : e.tagName ? e.offsetHeight : 0, k = e.div ? e.div.offsetWidth : e.tagName ? e.offsetWidth : 0, m = e.div ? e.div.offsetTop : e.tagName ? e.offsetTop : 0;
    e = e.div ? e.div.getBoundingClientRect() : e.tagName ? e.getBoundingClientRect() : e;
    return {left:e.left, right:e.right, top:e.top || m, height:e.height || f, bottom:e.bottom || m + (e.height || f), width:e.width || k};
  };
  Q.StringDecoder = function() {
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
  Q.convertCueToDOMTree = function(e, f) {
    return e && f ? da(e, f) : null;
  };
  Q.processCues = function(e, f, k) {
    if (!e || !f || !k) {
      return null;
    }
    for (;k.firstChild;) {
      k.removeChild(k.firstChild);
    }
    var m = e.document.createElement("div");
    m.style.position = "absolute";
    m.style.left = "0";
    m.style.right = "0";
    m.style.top = "0";
    m.style.bottom = "0";
    m.style.margin = "1.5%";
    k.appendChild(m);
    if (function(e) {
      for (var f = 0;f < e.length;f++) {
        if (e[f].hasBeenReset || !e[f].displayState) {
          return !0;
        }
      }
      return !1;
    }(f)) {
      var h = [], r = t.getSimpleBoxPosition(m), z = {font:Math.round(5 * r.height) / 100 + "px sans-serif"};
      (function() {
        for (var k, C, Y = 0;Y < f.length;Y++) {
          C = f[Y];
          k = new u(e, C, z);
          m.appendChild(k.div);
          var U = void 0, F = void 0, y = k, A = r, H = h, L = new t(y), D = y.cue, M;
          if ("number" === typeof D.line && (D.snapToLines || 0 <= D.line && 100 >= D.line)) {
            M = D.line;
          } else {
            if (D.track && D.track.textTrackList && D.track.textTrackList.mediaElement) {
              M = D.track;
              for (var K = M.textTrackList, J = 0, I = 0;I < K.length && K[I] !== M;I++) {
                "showing" === K[I].mode && J++;
              }
              M = -1 * ++J;
            } else {
              M = -1;
            }
          }
          K = [];
          if (D.snapToLines) {
            switch(D.vertical) {
              case "":
                K = ["+y", "-y"];
                F = "height";
                break;
              case "rl":
                K = ["+x", "-x"];
                F = "width";
                break;
              case "lr":
                K = ["-x", "+x"], F = "width";
            }
            var J = L.lineHeight, I = J * Math.round(M), F = A[F] + J, Q = K[0];
            Math.abs(I) > F && (I = (0 > I ? -1 : 1) * Math.ceil(F / J) * J);
            0 > M && (I += "" === D.vertical ? A.height : A.width, K = K.reverse());
            L.move(Q, I);
          } else {
            L = L.lineHeight / A.height * 100;
            switch(D.lineAlign) {
              case "middle":
                M -= L / 2;
                break;
              case "end":
                M -= L;
            }
            switch(D.vertical) {
              case "":
                y.applyStyles({top:y.formatStyle(M, "%")});
                break;
              case "rl":
                y.applyStyles({left:y.formatStyle(M, "%")});
                break;
              case "lr":
                y.applyStyles({right:y.formatStyle(M, "%")});
            }
            K = ["+y", "-x", "+x", "-y"];
            L = new t(y);
          }
          a: {
            D = L;
            L = K;
            F = new t(D);
            M = 1;
            for (K = 0;K < L.length;K++) {
              for (;D.overlapsOppositeAxis(A, L[K]) || D.within(A) && D.overlapsAny(H);) {
                D.move(L[K]);
              }
              if (D.within(A)) {
                U = D;
                break a;
              }
              J = D.intersectPercentage(A);
              M > J && (U = new t(D), M = J);
              D = new t(F);
            }
            U = U || F;
          }
          y.move(U.toCSSCompatValues(A));
          C.displayState = k.div;
          h.push(t.getSimpleBoxPosition(k));
        }
      })();
    } else {
      for (k = 0;k < f.length;k++) {
        m.appendChild(f[k].displayState);
      }
    }
  };
  Q.Parser = function(e, f, k) {
    k || (k = f, f = {});
    f || (f = {});
    this.window = e;
    this.vttjs = f;
    this.state = "INITIAL";
    this.buffer = "";
    this.decoder = k || new TextDecoder("utf8");
    this.regionList = [];
  };
  Q.Parser.prototype = {reportOrThrowError:function(e) {
    if (e instanceof k) {
      this.onparsingerror && this.onparsingerror(e);
    } else {
      throw e;
    }
  }, parse:function(e) {
    function f() {
      for (var e = h.buffer, f = 0;f < e.length && "\r" !== e[f] && "\n" !== e[f];) {
        ++f;
      }
      var k = e.substr(0, f);
      "\r" === e[f] && ++f;
      "\n" === e[f] && ++f;
      h.buffer = e.substr(f);
      return k;
    }
    function r(e) {
      var f = new m;
      H(e, function(e, h) {
        switch(e) {
          case "id":
            f.set(e, h);
            break;
          case "width":
            f.percent(e, h);
            break;
          case "lines":
            f.integer(e, h);
            break;
          case "regionanchor":
          case "viewportanchor":
            h = h.split(",");
            if (2 !== h.length) {
              break;
            }
            var k = new m;
            k.percent("x", h[0]);
            k.percent("y", h[1]);
            if (!k.has("x") || !k.has("y")) {
              break;
            }
            f.set(e + "X", k.get("x"));
            f.set(e + "Y", k.get("y"));
            break;
          case "scroll":
            f.alt(e, h, ["up"]);
        }
      }, /=/, /\s/);
      f.has("id") && (e = new (h.vttjs.VTTRegion || h.window.VTTRegion), e.width = f.get("width", 100), e.lines = f.get("lines", 3), e.regionAnchorX = f.get("regionanchorX", 0), e.regionAnchorY = f.get("regionanchorY", 100), e.viewportAnchorX = f.get("viewportanchorX", 0), e.viewportAnchorY = f.get("viewportanchorY", 100), e.scroll = f.get("scroll", ""), h.onregion && h.onregion(e), h.regionList.push({id:f.get("id"), region:e}));
    }
    function t(e) {
      H(e, function(e, f) {
        switch(e) {
          case "Region":
            r(f);
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
        u = f();
        var y = u.match(/^WEBVTT([ \t].*)?$/);
        if (!y || !y[0]) {
          throw new k(k.Errors.BadSignature);
        }
        h.state = "HEADER";
      }
      for (e = !1;h.buffer;) {
        if (!/\r\n|\n/.test(h.buffer)) {
          return this;
        }
        e ? e = !1 : u = f();
        switch(h.state) {
          case "HEADER":
            /:/.test(u) ? t(u) : u || (h.state = "ID");
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
              ba(u, h.cue, h.regionList);
            } catch (C) {
              h.reportOrThrowError(C);
              h.cue = null;
              h.state = "BADCUE";
              continue;
            }
            h.state = "CUETEXT";
            continue;
          case "CUETEXT":
            var A = -1 !== u.indexOf("--\x3e");
            if (!u || A && (e = !0)) {
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
    } catch (C) {
      h.reportOrThrowError(C);
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
        throw new k(k.Errors.BadSignature);
      }
    } catch (e) {
      this.reportOrThrowError(e);
    }
    this.onflush && this.onflush();
    return this;
  }};
  f.WebVTT = Q;
})(this, this.vttjs || {});
var __extends = this && this.__extends || function(f, k) {
  function r() {
    this.constructor = f;
  }
  for (var m in k) {
    k.hasOwnProperty(m) && (f[m] = k[m]);
  }
  f.prototype = null === k ? Object.create(k) : (r.prototype = k.prototype, new r);
}, videojs = function() {
  function f(c, a) {
    return a = {exports:{}}, c(a, a.exports), a.exports;
  }
  function k(c, a) {
    if (!(this instanceof k)) {
      return new k(c, a);
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
  function m(c) {
    switch(c.nodeType) {
      case 3:
        return I(c.data);
      case 8:
        return "\x3c!--" + c.data + "--\x3e";
      default:
        var a = [], b = c.tagName;
        "http://www.w3.org/1999/xhtml" === c.namespaceURI && (b = b.toLowerCase());
        a.push("<" + b + Xa(c) + ba(c));
        -1 < Yc.indexOf(b) ? a.push(" />") : (a.push(">"), c.childNodes.length ? a.push.apply(a, c.childNodes.map(m)) : c.textContent || c.innerText ? a.push(I(c.textContent || c.innerText)) : c.innerHTML && a.push(c.innerHTML), a.push("</" + b + ">"));
        return a.join("");
    }
  }
  function H(c) {
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
  function ba(c) {
    c = c.dataset;
    var a = [], b;
    for (b in c) {
      a.push({name:"data-" + b, value:c[b]});
    }
    return a.length ? da(a) : "";
  }
  function da(c) {
    var a = [];
    c.forEach(function(b) {
      var d = b.name;
      b = b.value;
      "style" === d && (b = H(b));
      a.push(d + '="' + I(b).replace(/"/g, "&quot;") + '"');
    });
    return a.length ? " " + a.join(" ") : "";
  }
  function Xa(c) {
    var a = [], b;
    for (b in c) {
      var d;
      d = c;
      var g = b, l = typeof d[g];
      d = "style" === g && 0 < Object.keys(d.style).length ? !0 : d.hasOwnProperty(g) && ("string" === l || "boolean" === l || "number" === l) && "nodeName" !== g && "className" !== g && "tagName" !== g && "textContent" !== g && "innerText" !== g && "namespaceURI" !== g && "innerHTML" !== g;
      d && a.push({name:b, value:c[b]});
    }
    for (var e in c._attributes) {
      for (var f in c._attributes[e]) {
        b = c._attributes[e][f], a.push({name:(b.prefix ? b.prefix + ":" : "") + f, value:b.value});
      }
    }
    c.className && a.push({name:"class", value:c.className});
    return a.length ? da(a) : "";
  }
  function I(c) {
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
  function t(c) {
    if (!(this instanceof t)) {
      return new t;
    }
    this.childNodes = [];
    this.parentNode = null;
    this.ownerDocument = c || null;
  }
  function Q(c) {
  }
  function A() {
    if (!(this instanceof A)) {
      return new A;
    }
    this.head = this.createElement("head");
    this.body = this.createElement("body");
    this.documentElement = this.createElement("html");
    this.documentElement.appendChild(this.head);
    this.documentElement.appendChild(this.body);
    this.childNodes = [this.documentElement];
    this.nodeType = 9;
  }
  function na(c, a) {
    Object.keys(c).forEach(function(b) {
      return a(c[b], b);
    });
  }
  function Ya(c, a, b) {
    void 0 === b && (b = 0);
    return Object.keys(c).reduce(function(b, g) {
      return a(b, c[g], g);
    }, b);
  }
  function y(c) {
    for (var a = [], b = 1;b < arguments.length;b++) {
      a[b - 1] = arguments[b];
    }
    if (Object.assign) {
      return Object.assign.apply(Object, [c].concat(a));
    }
    a.forEach(function(b) {
      b && na(b, function(b, a) {
        c[a] = b;
      });
    });
    return c;
  }
  function W(c) {
    return !!c && "object" === typeof c;
  }
  function ha(c) {
    return W(c) && "[object Object]" === Zc.call(c) && c.constructor === Object;
  }
  function e(c) {
    if (/\s/.test(c)) {
      throw Error("class has illegal whitespace characters");
    }
  }
  function z(c) {
    return W(c) && 1 === c.nodeType;
  }
  function J(c) {
    return function(a, b) {
      if ("string" !== typeof a || !/\S/.test(a)) {
        return w[c](null);
      }
      "string" === typeof b && /\S/.test(b) && (b = w.querySelector(b));
      b = z(b) ? b : w;
      return b[c] && b[c](a);
    };
  }
  function oa(c) {
    0 === c.indexOf("#") && (c = c.slice(1));
    return w.getElementById(c);
  }
  function h(c, a, b, d) {
    void 0 === c && (c = "div");
    void 0 === a && (a = {});
    void 0 === b && (b = {});
    var g = w.createElement(c);
    Object.getOwnPropertyNames(a).forEach(function(b) {
      var d = a[b];
      -1 !== b.indexOf("aria-") || "role" === b || "type" === b ? (B.warn((c = ["Setting attributes in the second argument of createEl()\n                has been deprecated. Use the third argument instead.\n                createEl(type, properties, attributes). Attempting to set ", " to ", "."], c.raw = ["Setting attributes in the second argument of createEl()\n                has been deprecated. Use the third argument instead.\n                createEl(type, properties, attributes). Attempting to set ", 
      " to ", "."], Nb(c, b, d))), g.setAttribute(b, d)) : "textContent" === b ? L(g, d) : g[b] = d;
      var c;
    });
    Object.getOwnPropertyNames(b).forEach(function(a) {
      g.setAttribute(a, b[a]);
    });
    d && ab(g, d);
    return g;
  }
  function L(c, a) {
    "undefined" === typeof c.textContent ? c.innerText = a : c.textContent = a;
    return c;
  }
  function sa(c, a) {
    a.firstChild ? a.insertBefore(c, a.firstChild) : a.appendChild(c);
  }
  function ia(c) {
    var a = c[pa];
    a || (a = c[pa] = qa++);
    Ba[a] || (Ba[a] = {});
    return Ba[a];
  }
  function C(c) {
    return (c = c[pa]) ? !!Object.getOwnPropertyNames(Ba[c]).length : !1;
  }
  function Y(c) {
    var a = c[pa];
    if (a) {
      delete Ba[a];
      try {
        delete c[pa];
      } catch (b) {
        c.removeAttribute ? c.removeAttribute(pa) : c[pa] = null;
      }
    }
  }
  function U(c, a) {
    e(a);
    return c.classList ? c.classList.contains(a) : (new RegExp("(^|\\s)" + a + "($|\\s)")).test(c.className);
  }
  function F(c, a) {
    c.classList ? c.classList.add(a) : U(c, a) || (c.className = (c.className + " " + a).trim());
    return c;
  }
  function Aa(c, a) {
    c.classList ? c.classList.remove(a) : (e(a), c.className = c.className.split(/\s+/).filter(function(b) {
      return b !== a;
    }).join(" "));
    return c;
  }
  function Jb(c, a, b) {
    var d = U(c, a);
    "function" === typeof b && (b = b(c, a));
    "boolean" !== typeof b && (b = !d);
    if (b !== d) {
      return b ? F(c, a) : Aa(c, a), c;
    }
  }
  function Za(c, a) {
    Object.getOwnPropertyNames(a).forEach(function(b) {
      var d = a[b];
      null === d || "undefined" === typeof d || !1 === d ? c.removeAttribute(b) : c.setAttribute(b, !0 === d ? "" : d);
    });
  }
  function ja(c) {
    var a = {};
    if (c && c.attributes && 0 < c.attributes.length) {
      for (var b = c.attributes, d = b.length - 1;0 <= d;d--) {
        var g = b[d].name, l = b[d].value;
        if ("boolean" === typeof c[g] || -1 !== ",autoplay,controls,loop,muted,default,".indexOf("," + g + ",")) {
          l = null !== l ? !0 : !1;
        }
        a[g] = l;
      }
    }
    return a;
  }
  function D() {
    w.body.focus();
    w.onselectstart = function() {
      return !1;
    };
  }
  function M() {
    w.onselectstart = function() {
      return !0;
    };
  }
  function K(c) {
    var a;
    c.getBoundingClientRect && c.parentNode && (a = c.getBoundingClientRect());
    if (!a) {
      return {left:0, top:0};
    }
    c = w.documentElement;
    var b = w.body;
    return {left:Math.round(a.left + (p.pageXOffset || b.scrollLeft) - (c.clientLeft || b.clientLeft || 0)), top:Math.round(a.top + (p.pageYOffset || b.scrollTop) - (c.clientTop || b.clientTop || 0))};
  }
  function Kb(c, a) {
    var b = {}, d = K(c), g = c.offsetWidth;
    c = c.offsetHeight;
    var l = d.top, d = d.left, e = a.pageY, f = a.pageX;
    a.changedTouches && (f = a.changedTouches[0].pageX, e = a.changedTouches[0].pageY);
    b.y = Math.max(0, Math.min(1, (l - e + c) / c));
    b.x = Math.max(0, Math.min(1, (f - d) / g));
    return b;
  }
  function Lb(c) {
    return W(c) && 3 === c.nodeType;
  }
  function $a(c) {
    for (;c.firstChild;) {
      c.removeChild(c.firstChild);
    }
    return c;
  }
  function $c(c) {
    "function" === typeof c && (c = c());
    return (Array.isArray(c) ? c : [c]).map(function(a) {
      "function" === typeof a && (a = a());
      if (z(a) || Lb(a)) {
        return a;
      }
      if ("string" === typeof a && /\S/.test(a)) {
        return w.createTextNode(a);
      }
    }).filter(function(a) {
      return a;
    });
  }
  function ab(c, a) {
    $c(a).forEach(function(b) {
      return c.appendChild(b);
    });
    return c;
  }
  function Ob(c, a) {
    return ab($a(c), a);
  }
  function Pb(c, a) {
    var b = ia(c);
    0 === b.handlers[a].length && (delete b.handlers[a], c.removeEventListener ? c.removeEventListener(a, b.dispatcher, !1) : c.detachEvent && c.detachEvent("on" + a, b.dispatcher));
    0 >= Object.getOwnPropertyNames(b.handlers).length && (delete b.handlers, delete b.dispatcher, delete b.disabled);
    0 === Object.getOwnPropertyNames(b).length && Y(c);
  }
  function bb(c, a, b, d) {
    b.forEach(function(b) {
      c(a, b, d);
    });
  }
  function cb(c) {
    function a() {
      return !0;
    }
    function b() {
      return !1;
    }
    if (!c || !c.isPropagationStopped) {
      var d = c || p.event;
      c = {};
      for (var g in d) {
        "layerX" !== g && "layerY" !== g && "keyLocation" !== g && "webkitMovementX" !== g && "webkitMovementY" !== g && ("returnValue" === g && d.preventDefault || (c[g] = d[g]));
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
        g = w.documentElement;
        var l = w.body;
        c.pageX = c.clientX + (g && g.scrollLeft || l && l.scrollLeft || 0) - (g && g.clientLeft || l && l.clientLeft || 0);
        c.pageY = c.clientY + (g && g.scrollTop || l && l.scrollTop || 0) - (g && g.clientTop || l && l.clientTop || 0);
      }
      c.which = c.charCode || c.keyCode;
      null !== c.button && void 0 !== c.button && (c.button = c.button & 1 ? 0 : c.button & 4 ? 1 : c.button & 2 ? 2 : 0);
    }
    return c;
  }
  function Z(c, a, b) {
    if (Array.isArray(a)) {
      return bb(Z, c, a, b);
    }
    var d = ia(c);
    d.handlers || (d.handlers = {});
    d.handlers[a] || (d.handlers[a] = []);
    b.guid || (b.guid = qa++);
    d.handlers[a].push(b);
    d.dispatcher || (d.disabled = !1, d.dispatcher = function(b, a) {
      if (!d.disabled) {
        b = cb(b);
        var g = d.handlers[b.type];
        if (g) {
          for (var g = g.slice(0), l = 0, e = g.length;l < e && !b.isImmediatePropagationStopped();l++) {
            try {
              g[l].call(c, b, a);
            } catch (ad) {
              B.error(ad);
            }
          }
        }
      }
    });
    1 === d.handlers[a].length && (c.addEventListener ? c.addEventListener(a, d.dispatcher, !1) : c.attachEvent && c.attachEvent("on" + a, d.dispatcher));
  }
  function ea(c, a, b) {
    if (C(c)) {
      var d = ia(c);
      if (d.handlers) {
        if (Array.isArray(a)) {
          return bb(ea, c, a, b);
        }
        if (a) {
          var g = d.handlers[a];
          if (g) {
            if (!b) {
              d.handlers[a] = [];
            } else {
              if (b.guid) {
                for (d = 0;d < g.length;d++) {
                  g[d].guid === b.guid && g.splice(d--, 1);
                }
              }
            }
            Pb(c, a);
          }
        } else {
          for (g in d.handlers) {
            a = g, d.handlers[a] = [], Pb(c, a);
          }
        }
      }
    }
  }
  function Ia(c, a, b) {
    var d = C(c) ? ia(c) : {}, g = c.parentNode || c.ownerDocument;
    "string" === typeof a && (a = {type:a, target:c});
    a = cb(a);
    d.dispatcher && d.dispatcher.call(c, a, b);
    if (g && !a.isPropagationStopped() && !0 === a.bubbles) {
      Ia.call(null, g, a, b);
    } else {
      if (!g && !a.defaultPrevented && (c = ia(a.target), a.target[a.type])) {
        c.disabled = !0;
        if ("function" === typeof a.target[a.type]) {
          a.target[a.type]();
        }
        c.disabled = !1;
      }
    }
    return !a.defaultPrevented;
  }
  function Ca(c, a, b) {
    if (Array.isArray(a)) {
      return bb(Ca, c, a, b);
    }
    var d = function() {
      ea(c, a, d);
      b.apply(this, arguments);
    };
    d.guid = b.guid = b.guid || qa++;
    Z(c, a, d);
  }
  function N(c) {
    return "string" !== typeof c ? c : c.charAt(0).toUpperCase() + c.slice(1);
  }
  function O() {
    for (var c = [], a = 0;a < arguments.length;a++) {
      c[a] = arguments[a];
    }
    var b = {};
    c.forEach(function(a) {
      a && na(a, function(a, d) {
        ha(a) ? (ha(b[d]) || (b[d] = {}), b[d] = O(b[d], a)) : b[d] = a;
      });
    });
    return b;
  }
  function Rb(c, a, b, d) {
    void 0 === d && (B.warn("DEPRECATED: Function '" + c + "' on 'TimeRanges' called without an index argument."), d = 0);
    var g = b.length - 1;
    if (0 > d || d > g) {
      throw Error("Failed to execute '" + c + "' on 'TimeRanges': The index provided (" + d + ") is greater than or equal to the maximum bound (" + g + ").");
    }
    return b[d][a];
  }
  function db(c) {
    return void 0 === c || 0 === c.length ? {length:0, start:function() {
      throw Error("This TimeRanges object is empty");
    }, end:function() {
      throw Error("This TimeRanges object is empty");
    }} : {length:c.length, start:Rb.bind(null, "start", 0, c), end:Rb.bind(null, "end", 1, c)};
  }
  function fa(c, a) {
    return Array.isArray(c) ? db(c) : void 0 === c || void 0 === a ? db() : db([[c, a]]);
  }
  function Sb(c, a) {
    var b = 0, d, g;
    if (!a) {
      return 0;
    }
    c && c.length || (c = fa(0, 0));
    for (var l = 0;l < c.length;l++) {
      d = c.start(l), g = c.end(l), g > a && (g = a), b += g - d;
    }
    return b / a;
  }
  function R(c) {
    if (c instanceof R) {
      return c;
    }
    "number" === typeof c ? this.code = c : "string" === typeof c ? this.message = c : W(c) && ("number" === typeof c.code && (this.code = c.code), y(this, c));
    this.message || (this.message = R.defaultMessages[this.code] || "");
  }
  function bd(c) {
    for (var a in c) {
      if (c.hasOwnProperty(a)) {
        return !1;
      }
    }
    return !0;
  }
  function Tb(c, a, b) {
    var d = c;
    cd(a) ? (b = a, "string" === typeof c && (d = {uri:c})) : d = dd(a, {uri:c});
    d.callback = b;
    return d;
  }
  function ga(c, a, b) {
    a = Tb(c, a, b);
    return Ub(a);
  }
  function Ub(c) {
    function a(b) {
      clearTimeout(q);
      b instanceof Error || (b = Error("" + (b || "Unknown XMLHttpRequest Error")));
      b.statusCode = 0;
      var a = r;
      d || (d = !0, c.callback(b, a, void 0));
    }
    function b() {
      if (!e) {
        var b;
        clearTimeout(q);
        b = c.useXDR && void 0 === g.status ? 200 : 1223 === g.status ? 204 : g.status;
        var a = r, l = null;
        if (0 !== b) {
          g.response ? a = g.response : (a = g.responseText) || ("document" === g.responseType ? a = g.responseXML : (a = 204 === g.status && g.responseXML && "parsererror" === g.responseXML.documentElement.nodeName, a = "" !== g.responseType || a ? null : g.responseXML));
          if (p) {
            try {
              a = JSON.parse(a);
            } catch (Wd) {
            }
          }
          a = {body:a, statusCode:b, method:h, headers:{}, url:f, rawRequest:g};
          g.getAllResponseHeaders && (a.headers = ed(g.getAllResponseHeaders()));
        } else {
          l = Error("Internal XMLHttpRequest Error");
        }
        b = a.body;
        d || (d = !0, c.callback(l, a, b));
      }
    }
    if ("undefined" === typeof c.callback) {
      throw Error("callback argument missing");
    }
    var d = !1, g = c.xhr || null;
    g || (g = c.cors || c.useXDR ? new ga.XDomainRequest : new ga.XMLHttpRequest);
    var l, e, f = g.url = c.uri || c.url, h = g.method = c.method || "GET", k = c.body || c.data || null, m = g.headers = c.headers || {}, n = !!c.sync, p = !1, q, r = {body:void 0, headers:{}, statusCode:0, method:h, url:f, rawRequest:g};
    "json" in c && !1 !== c.json && (p = !0, m.accept || m.Accept || (m.Accept = "application/json"), "GET" !== h && "HEAD" !== h && (m["content-type"] || m["Content-Type"] || (m["Content-Type"] = "application/json"), k = JSON.stringify(!0 === c.json ? k : c.json)));
    g.onreadystatechange = function() {
      4 === g.readyState && b();
    };
    g.onload = b;
    g.onerror = a;
    g.onprogress = function() {
    };
    g.onabort = function() {
      e = !0;
    };
    g.ontimeout = a;
    g.open(h, f, !n, c.username, c.password);
    n || (g.withCredentials = !!c.withCredentials);
    !n && 0 < c.timeout && (q = setTimeout(function() {
      if (!e) {
        e = !0;
        g.abort("timeout");
        var b = Error("XMLHttpRequest timeout");
        b.code = "ETIMEDOUT";
        a(b);
      }
    }, c.timeout));
    if (g.setRequestHeader) {
      for (l in m) {
        m.hasOwnProperty(l) && g.setRequestHeader(l, m[l]);
      }
    } else {
      if (c.headers && !bd(c.headers)) {
        throw Error("Headers cannot be set on an XDomainRequest object");
      }
    }
    "responseType" in c && (g.responseType = c.responseType);
    "beforeSend" in c && "function" === typeof c.beforeSend && c.beforeSend(g);
    g.send(k);
    return g;
  }
  function fd() {
  }
  function gd(c) {
    var a = c.charAt(0).toUpperCase() + c.slice(1);
    Vb["set" + a] = function(b) {
      return this.el_.vjs_setProperty(c, b);
    };
  }
  function Wb(c) {
    Vb[c] = function() {
      return this.el_.vjs_getProperty(c);
    };
  }
  function eb(c, a) {
    return "rgba(" + parseInt(c[1] + c[1], 16) + "," + parseInt(c[2] + c[2], 16) + "," + parseInt(c[3] + c[3], 16) + "," + a + ")";
  }
  function ka(c, a) {
    void 0 === a && (a = c);
    c = 0 > c ? 0 : c;
    var b = Math.floor(c % 60), d = Math.floor(c / 60 % 60), g = Math.floor(c / 3600), l = Math.floor(a / 60 % 60);
    a = Math.floor(a / 3600);
    if (isNaN(c) || Infinity === c) {
      g = d = b = "-";
    }
    g = 0 < g || 0 < a ? g + ":" : "";
    return g + (((g || 10 <= l) && 10 > d ? "0" + d : d) + ":") + (10 > b ? "0" + b : b);
  }
  function ta(c, a) {
    return c && a ? "function" === typeof p.getComputedStyle ? (c = p.getComputedStyle(c)) ? c[a] : "" : c.currentStyle[a] || "" : "";
  }
  function Xb(c, a) {
    a && (c = a(c));
    if (c && "none" !== c) {
      return c;
    }
  }
  function q(c, a, b) {
    var d;
    a = a || {};
    if ("string" === typeof c) {
      0 === c.indexOf("#") && (c = c.slice(1));
      if (q.getPlayers()[c]) {
        return a && B.warn('Player "' + c + '" is already initialised. Options will not be applied.'), b && q.getPlayers()[c].ready(b), q.getPlayers()[c];
      }
      d = oa(c);
    } else {
      d = c;
    }
    if (!d || !d.nodeName) {
      throw new TypeError("The element or ID supplied is not valid. (videojs)");
    }
    if (d.player || ca.players[d.playerId]) {
      return d.player || ca.players[d.playerId];
    }
    q.hooks("beforesetup").forEach(function(b) {
      b = b(d, O(a));
      !W(b) || Array.isArray(b) ? q.log.error("please return an object in beforesetup hooks") : a = O(a, b);
    });
    var g = new (n.getComponent("Player"))(d, a, b);
    q.hooks("setup").forEach(function(b) {
      return b(g);
    });
    return g;
  }
  var Ja = "undefined" !== typeof window ? window : "undefined" !== typeof global ? global : "undefined" !== typeof self ? self : {}, p = f(function(c) {
    c.exports = "undefined" !== typeof window ? window : "undefined" !== typeof Ja ? Ja : "undefined" !== typeof self ? self : {};
  }), Yb = Array.prototype.slice, Ka = function(c, a) {
    "length" in c || (c = [c]);
    for (c = Yb.call(c);c.length;) {
      var b = c.shift(), d = a(b);
      if (d) {
        return d;
      }
      b.childNodes && b.childNodes.length && (c = Yb.call(b.childNodes).concat(c));
    }
  };
  k.prototype.nodeType = 8;
  k.prototype.nodeName = "#comment";
  k.prototype.toString = function() {
    return "[object Comment]";
  };
  r.prototype.type = "DOMTextNode";
  r.prototype.nodeType = 3;
  r.prototype.nodeName = "#text";
  r.prototype.toString = function() {
    return this.data;
  };
  r.prototype.replaceData = function(c, a, b) {
    var d = this.data, g = d.substring(0, c);
    c = d.substring(c + a, d.length);
    this.data = g + b + c;
    this.length = this.data.length;
  };
  var Zb = function(c) {
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
  }, $b = function(c, a) {
    this.listeners || (this.listeners = {});
    this.listeners[c] || (this.listeners[c] = []);
    -1 === this.listeners[c].indexOf(a) && this.listeners[c].push(a);
  }, ac = function(c, a) {
    this.listeners && this.listeners[c] && (c = this.listeners[c], a = c.indexOf(a), -1 !== a && c.splice(a, 1));
  }, Yc = "area base br col embed hr img input keygen link menuitem meta param source track wbr".split(" ");
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
    var d = null, g = a, l = a.indexOf(":");
    -1 < l && (d = a.substr(0, l), g = a.substr(l + 1));
    "INPUT" === this.tagName && "type" === a ? this.type = b : (this._attributes[c] || (this._attributes[c] = {}))[g] = {value:b, prefix:d};
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
  u.prototype.removeEventListener = ac;
  u.prototype.addEventListener = $b;
  u.prototype.dispatchEvent = Zb;
  u.prototype.focus = function() {
  };
  u.prototype.toString = function() {
    return m(this);
  };
  u.prototype.getElementsByClassName = function(c) {
    var a = c.split(" "), b = [];
    Ka(this, function(d) {
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
    Ka(this.childNodes, function(b) {
      1 !== b.nodeType || "*" !== c && b.tagName.toLowerCase() !== c || a.push(b);
    });
    return a;
  };
  u.prototype.contains = function(c) {
    return Ka(this, function(a) {
      return c === a;
    }) || !1;
  };
  t.prototype.type = "DocumentFragment";
  t.prototype.nodeType = 11;
  t.prototype.nodeName = "#document-fragment";
  t.prototype.appendChild = u.prototype.appendChild;
  t.prototype.replaceChild = u.prototype.replaceChild;
  t.prototype.removeChild = u.prototype.removeChild;
  t.prototype.toString = function() {
    return this.childNodes.map(function(c) {
      return String(c);
    }).join("");
  };
  Q.prototype.initEvent = function(c, a, b) {
    this.type = c;
    this.bubbles = a;
    this.cancelable = b;
  };
  Q.prototype.preventDefault = function() {
  };
  var X = A.prototype;
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
    return new t(this);
  };
  X.createEvent = function(c) {
    return new Q(c);
  };
  X.createComment = function(c) {
    return new k(c, this);
  };
  X.getElementById = function(c) {
    c = String(c);
    return Ka(this.childNodes, function(a) {
      if (String(a.id) === c) {
        return a;
      }
    }) || null;
  };
  X.getElementsByClassName = u.prototype.getElementsByClassName;
  X.getElementsByTagName = u.prototype.getElementsByTagName;
  X.contains = u.prototype.contains;
  X.removeEventListener = ac;
  X.addEventListener = $b;
  X.dispatchEvent = Zb;
  var hd = new A, w = f(function(c) {
    var a = "undefined" !== typeof Ja ? Ja : "undefined" !== typeof window ? window : {};
    if ("undefined" !== typeof document) {
      c.exports = document;
    } else {
      var b = a["__GLOBAL_DOCUMENT_CACHE@4"];
      b || (b = a["__GLOBAL_DOCUMENT_CACHE@4"] = hd);
      c.exports = b;
    }
  }), qa = 1, V = p.navigator && p.navigator.userAgent || "", bc = /AppleWebKit\/([\d.]+)/i.exec(V), id = bc ? parseFloat(bc.pop()) : null, fb = /iPad/i.test(V), gb = /iPhone/i.test(V) && !fb, cc = /iPod/i.test(V), La = gb || fb || cc, jd = function() {
    var c = V.match(/OS (\d+)_/i);
    return c && c[1] ? c[1] : null;
  }(), ua = /Android/i.test(V), Ma = function() {
    var c = V.match(/Android (\d+)(?:\.(\d+))?(?:\.(\d+))*/i);
    if (!c) {
      return null;
    }
    var a = c[1] && parseFloat(c[1]), b = c[2] && parseFloat(c[2]);
    return a && b ? parseFloat(c[1] + "." + c[2]) : a ? a : null;
  }(), dc = ua && /webkit/i.test(V) && 2.3 > Ma, ec = ua && 5 > Ma && 537 > id, fc = /Firefox/i.test(V), hb = /Edge/i.test(V), Na = !hb && /Chrome/i.test(V), S = /MSIE\s8\.0/.test(V), ib = function(c) {
    return c && parseFloat(c[1]);
  }(/MSIE\s(\d+)\.\d/.exec(V)), gc = /Safari/i.test(V) && !Na && !ua && !hb, hc = gc || La, Oa = !!("ontouchstart" in p || p.DocumentTouch && w instanceof p.DocumentTouch), ic = "backgroundSize" in w.createElement("video").style, kd = Object.freeze({IS_IPAD:fb, IS_IPHONE:gb, IS_IPOD:cc, IS_IOS:La, IOS_VERSION:jd, IS_ANDROID:ua, ANDROID_VERSION:Ma, IS_OLD_ANDROID:dc, IS_NATIVE_ANDROID:ec, IS_FIREFOX:fc, IS_EDGE:hb, IS_CHROME:Na, IS_IE8:S, IE_VERSION:ib, IS_SAFARI:gc, IS_ANY_SAFARI:hc, TOUCH_ENABLED:Oa, 
  BACKGROUND_SIZE_SUPPORTED:ic}), Zc = Object.prototype.toString, va, jb = function(c, a, b) {
    void 0 === b && (b = !!ib && 11 > ib);
    "log" !== c && a.unshift(c.toUpperCase() + ":");
    va.history.push(a);
    a.unshift("VIDEOJS:");
    if (c = p.console && p.console[c]) {
      if (b && (a = a.map(function(b) {
        if (W(b) || Array.isArray(b)) {
          try {
            return JSON.stringify(b);
          } catch (g) {
          }
        }
        return String(b);
      }).join(" ")), c.apply) {
        c[Array.isArray(a) ? "apply" : "call"](p.console, a);
      } else {
        c(a);
      }
    }
  };
  va = function() {
    for (var c = [], a = 0;a < arguments.length;a++) {
      c[a] = arguments[a];
    }
    jb("log", c);
  };
  va.history = [];
  va.error = function() {
    for (var c = [], a = 0;a < arguments.length;a++) {
      c[a] = arguments[a];
    }
    return jb("error", c);
  };
  va.warn = function() {
    for (var c = [], a = 0;a < arguments.length;a++) {
      c[a] = arguments[a];
    }
    return jb("warn", c);
  };
  var B = va, Nb = function(c) {
    for (var a = "", b = 0;b < arguments.length;b++) {
      a += c[b].replace(/\n\r?\s*/g, "") + (arguments[b + 1] || "");
    }
    return a;
  }, Ba = {}, pa = "vdata" + (new Date).getTime(), Da = J("querySelector"), ld = J("querySelectorAll"), kb = !1, jc, lb = function() {
    var c = w.getElementsByTagName("video"), a = w.getElementsByTagName("audio"), b = [];
    if (c && 0 < c.length) {
      for (var d = 0, g = c.length;d < g;d++) {
        b.push(c[d]);
      }
    }
    if (a && 0 < a.length) {
      for (d = 0, g = a.length;d < g;d++) {
        b.push(a[d]);
      }
    }
    if (b && 0 < b.length) {
      for (d = 0, g = b.length;d < g;d++) {
        if ((c = b[d]) && c.getAttribute) {
          void 0 === c.player && null !== c.getAttribute("data-setup") && jc(c);
        } else {
          setTimeout(lb, 1);
          break;
        }
      }
    } else {
      kb || setTimeout(lb, 1);
    }
  };
  "complete" === w.readyState ? kb = !0 : Ca(p, "load", function() {
    kb = !0;
  });
  var kc = function(c) {
    var a = w.createElement("style");
    a.className = c;
    return a;
  }, lc = function(c, a) {
    c.styleSheet ? c.styleSheet.cssText = a : c.textContent = a;
  }, x = function(c, a, b) {
    a.guid || (a.guid = qa++);
    var d = function() {
      return a.apply(c, arguments);
    };
    d.guid = b ? b + "_" + a.guid : a.guid;
    return d;
  }, md = function(c, a) {
    var b;
    return function() {
      for (var d = [], g = 0;g < arguments.length;g++) {
        d[g] = arguments[g];
      }
      g = Date.now();
      g - b >= a && (c.apply(void 0, d), b = g);
    };
  }, n = function() {
    function c(a, b, d) {
      this.player_ = !a && this.play ? a = this : a;
      this.options_ = O({}, this.options_);
      b = this.options_ = O(this.options_, b);
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
      Y(this.el_);
      this.el_ = null;
    };
    c.prototype.player = function() {
      return this.player_;
    };
    c.prototype.options = function(a) {
      B.warn("this.options() has been deprecated and will be moved to the constructor in 6.0");
      return a ? this.options_ = O(this.options_, a) : this.options_;
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
        return a = N(a), this.childNameIndex_[a];
      }
    };
    c.prototype.addChild = function(a, b, d) {
      void 0 === b && (b = {});
      void 0 === d && (d = this.children_.length);
      var g;
      if ("string" === typeof a) {
        g = N(a);
        b || (b = {});
        !0 === b && (B.warn("Initializing a child component with `true` is deprecated.Children should be defined in an array when possible, but if necessary use an object instead of `true`."), b = {});
        a = b.componentClass || g;
        b.name = g;
        var l = c.getComponent(a);
        if (!l) {
          throw Error("Component " + a + " does not exist");
        }
        if ("function" !== typeof l) {
          return null;
        }
        b = new l(this.player_ || this, b);
      } else {
        b = a;
      }
      this.children_.splice(d, 0, b);
      "function" === typeof b.id && (this.childIndex_[b.id()] = b);
      (g = g || b.name && b.name()) && (this.childNameIndex_[g] = b);
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
        var d = this.options_, g, l = c.getComponent("Tech");
        g = Array.isArray(b) ? b : Object.keys(b);
        g.concat(Object.keys(this.options_).filter(function(b) {
          return !g.some(function(a) {
            return "string" === typeof a ? b === a : b === a.name;
          });
        })).map(function(d) {
          var c;
          "string" === typeof d ? (c = d, d = b[c] || a.options_[c] || {}) : c = d.name;
          return {name:c, opts:d};
        }).filter(function(b) {
          return (b = c.getComponent(b.opts.componentClass || N(b.name))) && !l.isTech(b);
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
        Z(this.el_, a, x(this, b));
      } else {
        var l = x(this, d), e = function() {
          return c.off(a, b, l);
        };
        e.guid = l.guid;
        this.on("dispose", e);
        d = function() {
          return c.off("dispose", e);
        };
        d.guid = l.guid;
        a.nodeName ? (Z(a, b, l), Z(a, "dispose", d)) : "function" === typeof a.on && (a.on(b, l), a.on("dispose", d));
      }
      return this;
    };
    c.prototype.off = function(a, b, d) {
      !a || "string" === typeof a || Array.isArray(a) ? ea(this.el_, a, b) : (d = x(this, d), this.off("dispose", d), a.nodeName ? (ea(a, b, d), ea(a, "dispose", d)) : (a.off(b, d), a.off("dispose", d)));
      return this;
    };
    c.prototype.one = function(a, b, d) {
      var c = this;
      if ("string" === typeof a || Array.isArray(a)) {
        Ca(this.el_, a, x(this, b));
      } else {
        var l = x(this, d), e = function() {
          c.off(a, b, e);
          l.apply(null, arguments);
        };
        e.guid = l.guid;
        this.on(a, b, e);
      }
      return this;
    };
    c.prototype.trigger = function(a, b) {
      Ia(this.el_, a, b);
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
      return Da(a, b || this.contentEl());
    };
    c.prototype.$$ = function(a, b) {
      return ld(a, b || this.contentEl());
    };
    c.prototype.hasClass = function(a) {
      return U(this.el_, a);
    };
    c.prototype.addClass = function(a) {
      F(this.el_, a);
      return this;
    };
    c.prototype.removeClass = function(a) {
      Aa(this.el_, a);
      return this;
    };
    c.prototype.toggleClass = function(a, b) {
      Jb(this.el_, a, b);
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
      return -1 !== d ? parseInt(b.slice(0, d), 10) : parseInt(this.el_["offset" + N(a)], 10);
    };
    c.prototype.currentDimension = function(a) {
      var b = 0;
      if ("width" !== a && "height" !== a) {
        throw Error("currentDimension only accepts width or height value");
      }
      "function" === typeof p.getComputedStyle && (b = p.getComputedStyle(this.el_), b = b.getPropertyValue(a) || b[a]);
      b = parseFloat(b);
      0 === b && (a = "offset" + N(a), b = this.el_[a]);
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
        var a = x(this.player(), this.player().reportUserActivity), b;
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
      a = x(this, a);
      var c = p.setTimeout(a, b);
      a = function() {
        this.clearTimeout(c);
      };
      a.guid = "vjs-timeout-" + c;
      this.on("dispose", a);
      return c;
    };
    c.prototype.clearTimeout = function(a) {
      p.clearTimeout(a);
      var b = function() {
      };
      b.guid = "vjs-timeout-" + a;
      this.off("dispose", b);
      return a;
    };
    c.prototype.setInterval = function(a, b) {
      a = x(this, a);
      var c = p.setInterval(a, b);
      a = function() {
        this.clearInterval(c);
      };
      a.guid = "vjs-interval-" + c;
      this.on("dispose", a);
      return c;
    };
    c.prototype.clearInterval = function(a) {
      p.clearInterval(a);
      var b = function() {
      };
      b.guid = "vjs-interval-" + a;
      this.off("dispose", b);
      return a;
    };
    c.registerComponent = function(a, b) {
      if (a) {
        a = N(a);
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
        a = N(a);
        if (c.components_ && c.components_[a]) {
          return c.components_[a];
        }
        if (p && p.videojs && p.videojs[a]) {
          return B.warn("The " + a + " component was added to the videojs object when it should be registered using videojs.registerComponent(name, component)"), p.videojs[a];
        }
      }
    };
    c.extend = function(a) {
      a = a || {};
      B.warn("Component.extend({}) has been deprecated,  use videojs.extend(Component, {}) instead");
      var b = a.init || a.init || this.prototype.init || this.prototype.init || function() {
      }, d = function() {
        b.apply(this, arguments);
      };
      d.prototype = Object.create(this.prototype);
      d.prototype.constructor = d;
      d.extend = c.extend;
      for (var g in a) {
        a.hasOwnProperty(g) && (d.prototype[g] = a[g]);
      }
      return d;
    };
    return c;
  }();
  n.registerComponent("Component", n);
  var T = function() {
  };
  T.prototype.allowedEvents_ = {};
  T.prototype.on = function(c, a) {
    var b = this.addEventListener;
    this.addEventListener = function() {
    };
    Z(this, c, a);
    this.addEventListener = b;
  };
  T.prototype.addEventListener = T.prototype.on;
  T.prototype.off = function(c, a) {
    ea(this, c, a);
  };
  T.prototype.removeEventListener = T.prototype.off;
  T.prototype.one = function(c, a) {
    var b = this.addEventListener;
    this.addEventListener = function() {
    };
    Ca(this, c, a);
    this.addEventListener = b;
  };
  T.prototype.trigger = function(c) {
    var a = c.type || c;
    "string" === typeof c && (c = {type:a});
    c = cb(c);
    if (this.allowedEvents_[a] && this["on" + a]) {
      this["on" + a](c);
    }
    Ia(this, c);
  };
  T.prototype.dispatchEvent = T.prototype.trigger;
  for (var la = {}, Pa = ["requestFullscreen exitFullscreen fullscreenElement fullscreenEnabled fullscreenchange fullscreenerror".split(" "), "webkitRequestFullscreen webkitExitFullscreen webkitFullscreenElement webkitFullscreenEnabled webkitfullscreenchange webkitfullscreenerror".split(" "), "webkitRequestFullScreen webkitCancelFullScreen webkitCurrentFullScreenElement webkitCancelFullScreen webkitfullscreenchange webkitfullscreenerror".split(" "), "mozRequestFullScreen mozCancelFullScreen mozFullScreenElement mozFullScreenEnabled mozfullscreenchange mozfullscreenerror".split(" "), 
  "msRequestFullscreen msExitFullscreen msFullscreenElement msFullscreenEnabled MSFullscreenChange MSFullscreenError".split(" ")], nd = Pa[0], Qa, P = 0;P < Pa.length;P++) {
    if (Pa[P][1] in w) {
      Qa = Pa[P];
      break;
    }
  }
  if (Qa) {
    for (P = 0;P < Qa.length;P++) {
      la[nd[P]] = Qa[P];
    }
  }
  R.prototype.code = 0;
  R.prototype.message = "";
  R.prototype.status = null;
  R.errorTypes = "MEDIA_ERR_CUSTOM MEDIA_ERR_ABORTED MEDIA_ERR_NETWORK MEDIA_ERR_DECODE MEDIA_ERR_SRC_NOT_SUPPORTED MEDIA_ERR_ENCRYPTED".split(" ");
  R.defaultMessages = {1:"You aborted the media playback", 2:"A network error caused the media download to fail part-way.", 3:"The media playback was aborted due to a corruption problem or because the media used features your browser did not support.", 4:"The media could not be loaded, either because the server or network failed or because the format is not supported.", 5:"The media is encrypted and we do not have the keys to decrypt it."};
  for (var wa = 0;wa < R.errorTypes.length;wa++) {
    R[R.errorTypes[wa]] = wa, R.prototype[R.errorTypes[wa]] = wa;
  }
  var mb = function(c) {
    return "kind label language id inBandMetadataTrackDispatchType mode src".split(" ").reduce(function(a, b, d) {
      c[b] && (a[b] = c[b]);
      return a;
    }, {cues:c.cues && Array.prototype.map.call(c.cues, function(a) {
      return {startTime:a.startTime, endTime:a.endTime, text:a.text, id:a.id};
    })});
  }, mc = {textTracksToJson:function(c) {
    var a = c.$$("track"), b = Array.prototype.map.call(a, function(b) {
      return b.track;
    });
    return Array.prototype.map.call(a, function(b) {
      var a = mb(b.track);
      b.src && (a.src = b.src);
      return a;
    }).concat(Array.prototype.filter.call(c.textTracks(), function(a) {
      return -1 === b.indexOf(a);
    }).map(mb));
  }, jsonToTextTracks:function(c, a) {
    c.forEach(function(b) {
      var c = a.addRemoteTextTrack(b).track;
      !b.src && b.cues && b.cues.forEach(function(b) {
        return c.addCue(b);
      });
    });
    return a.textTracks();
  }, trackToJson_:mb}, Ea = function(c) {
    function a(b, a) {
      b = c.call(this, b, a) || this;
      b.opened_ = b.hasBeenOpened_ = b.hasBeenFilled_ = !1;
      b.closeable(!b.options_.uncloseable);
      b.content(b.options_.content);
      b.contentEl_ = h("div", {className:"vjs-modal-dialog-content"}, {role:"document"});
      b.descEl_ = h("p", {className:"vjs-modal-dialog-description vjs-offscreen", id:b.el().getAttribute("aria-describedby")});
      L(b.descEl_, b.description());
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
          this.on(this.el_.ownerDocument, "keydown", x(this, this.handleKeyPress));
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
        this.closeable() && this.off(this.el_.ownerDocument, "keydown", x(this, this.handleKeyPress));
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
      var a = this.contentEl(), c = a.parentNode, l = a.nextSibling;
      this.trigger("beforemodalfill");
      this.hasBeenFilled_ = !0;
      c.removeChild(a);
      this.empty();
      Ob(a, b);
      this.trigger("modalfill");
      l ? c.insertBefore(a, l) : c.appendChild(a);
      return this;
    };
    a.prototype.empty = function() {
      this.trigger("beforemodalempty");
      $a(this.contentEl());
      this.trigger("modalempty");
      return this;
    };
    a.prototype.content = function(b) {
      "undefined" !== typeof b && (this.content_ = b);
      return this.content_;
    };
    return a;
  }(n);
  Ea.prototype.options_ = {temporary:!0};
  n.registerComponent("ModalDialog", Ea);
  var nc = function() {
    function c(a) {
      var b = this;
      if (S) {
        var b = w.createElement("custom"), d;
        for (d in c.prototype) {
          "constructor" !== d && (b[d] = c.prototype[d]);
        }
      }
      c.prototype.setCues_.call(b, a);
      Object.defineProperty(b, "length", {get:function() {
        return this.length_;
      }});
      if (S) {
        return b;
      }
    }
    c.prototype.setCues_ = function(a) {
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
    c.prototype.getCueById = function(a) {
      for (var b = null, c = 0, g = this.length;c < g;c++) {
        var l = this[c];
        if (l.id === a) {
          b = l;
          break;
        }
      }
      return b;
    };
    return c;
  }(), od = {alternative:"alternative", captions:"captions", main:"main", sign:"sign", subtitles:"subtitles", commentary:"commentary"}, pd = {alternative:"alternative", descriptions:"descriptions", main:"main", "main-desc":"main-desc", translation:"translation", commentary:"commentary"}, qd = {subtitles:"subtitles", captions:"captions", descriptions:"descriptions", chapters:"chapters", metadata:"metadata"}, oc = {disabled:"disabled", hidden:"hidden", showing:"showing"}, nb = function(c) {
    function a(b) {
      void 0 === b && (b = {});
      var d = c.call(this) || this;
      if (S) {
        var d = w.createElement("custom"), g;
        for (g in a.prototype) {
          "constructor" !== g && (d[g] = a.prototype[g]);
        }
      }
      var l = {id:b.id || "vjs_track_" + qa++, kind:b.kind || "", label:b.label || "", language:b.language || ""};
      b = function(b) {
        Object.defineProperty(d, b, {get:function() {
          return l[b];
        }, set:function() {
        }});
      };
      for (var e in l) {
        b(e);
      }
      return d;
    }
    __extends(a, c);
    return a;
  }(T), pc = function(c) {
    var a = "protocol hostname port pathname search hash host".split(" "), b = w.createElement("a");
    b.href = c;
    var d = "" === b.host && "file:" !== b.protocol, g;
    d && (g = w.createElement("div"), g.innerHTML = '<a href="' + c + '"></a>', b = g.firstChild, g.setAttribute("style", "display:none; position:absolute;"), w.body.appendChild(g));
    c = {};
    for (var l = 0;l < a.length;l++) {
      c[a[l]] = b[a[l]];
    }
    "http:" === c.protocol && (c.host = c.host.replace(/:80$/, ""));
    "https:" === c.protocol && (c.host = c.host.replace(/:443$/, ""));
    d && w.body.removeChild(g);
    return c;
  }, rd = function(c) {
    if (!c.match(/^https?:\/\//)) {
      var a = w.createElement("div");
      a.innerHTML = '<a href="' + c + '">x</a>';
      c = a.firstChild.href;
    }
    return c;
  }, qc = function(c) {
    return "string" === typeof c && (c = /^(\/?)([\s\S]*?)((?:\.{1,2}|[^\/]+?)(\.([^\.\/\?]+)))(?:[\/]*|[\?].*)$/i.exec(c)) ? c.pop().toLowerCase() : "";
  }, ob = function(c) {
    var a = p.location;
    c = pc(c);
    return (":" === c.protocol ? a.protocol : c.protocol) + c.host !== a.protocol + a.host;
  }, rc = function(c) {
    var a = sd.call(c);
    return "[object Function]" === a || "function" === typeof c && "[object RegExp]" !== a || "undefined" !== typeof window && (c === window.setTimeout || c === window.alert || c === window.confirm || c === window.prompt);
  }, sd = Object.prototype.toString, pb = f(function(c, a) {
    a = c.exports = function(b) {
      return b.replace(/^\s*|\s*$/g, "");
    };
    a.left = function(b) {
      return b.replace(/^\s*/, "");
    };
    a.right = function(b) {
      return b.replace(/\s*$/, "");
    };
  }), td = Object.prototype.toString, sc = Object.prototype.hasOwnProperty, ud = function(c, a, b) {
    if (!rc(a)) {
      throw new TypeError("iterator must be a function");
    }
    3 > arguments.length && (b = this);
    if ("[object Array]" === td.call(c)) {
      for (var d = b, g = 0, l = c.length;g < l;g++) {
        sc.call(c, g) && a.call(d, c[g], g, c);
      }
    } else {
      if ("string" === typeof c) {
        for (d = b, g = 0, l = c.length;g < l;g++) {
          a.call(d, c.charAt(g), g, c);
        }
      } else {
        for (g in d = b, c) {
          sc.call(c, g) && a.call(d, c[g], g, c);
        }
      }
    }
  }, vd = Object.prototype.hasOwnProperty, tc = p, cd = rc, ed = function(c) {
    if (!c) {
      return {};
    }
    var a = {};
    ud(pb(c).split("\n"), function(b) {
      var c = b.indexOf(":"), g = pb(b.slice(0, c)).toLowerCase();
      b = pb(b.slice(c + 1));
      "undefined" === typeof a[g] ? a[g] = b : "[object Array]" === Object.prototype.toString.call(a[g]) ? a[g].push(b) : a[g] = [a[g], b];
    });
    return a;
  }, dd = function() {
    for (var c = {}, a = 0;a < arguments.length;a++) {
      var b = arguments[a], d;
      for (d in b) {
        vd.call(b, d) && (c[d] = b[d]);
      }
    }
    return c;
  };
  ga.XMLHttpRequest = tc.XMLHttpRequest || fd;
  ga.XDomainRequest = "withCredentials" in new ga.XMLHttpRequest ? ga.XMLHttpRequest : tc.XDomainRequest;
  (function(c, a) {
    for (var b = 0;b < c.length;b++) {
      a(c[b]);
    }
  })("get put post patch head delete".split(" "), function(c) {
    ga["delete" === c ? "del" : c] = function(a, b, d) {
      b = Tb(a, b, d);
      b.method = c.toUpperCase();
      return Ub(b);
    };
  });
  var uc = function(c, a) {
    var b = new p.WebVTT.Parser(p, p.vttjs, p.WebVTT.StringDecoder()), d = [];
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
    0 < d.length && (p.console && p.console.groupCollapsed && p.console.groupCollapsed("Text Track parsing errors for " + a.src), d.forEach(function(b) {
      return B.error(b);
    }), p.console && p.console.groupEnd && p.console.groupEnd());
    b.flush();
  }, wd = function(c, a) {
    var b = {uri:c};
    if (c = ob(c)) {
      b.cors = c;
    }
    ga(b, x(this, function(b, c, l) {
      if (b) {
        return B.error(b, c);
      }
      a.loaded_ = !0;
      if ("function" !== typeof p.WebVTT) {
        if (a.tech_) {
          var d = function() {
            return uc(l, a);
          };
          a.tech_.on("vttjsloaded", d);
          a.tech_.on("vttjserror", function() {
            B.error("vttjs failed to load, stopping trying to process " + a.src);
            a.tech_.off("vttjsloaded", d);
          });
        }
      } else {
        uc(l, a);
      }
    }));
  }, Ra = function(c) {
    function a(b) {
      void 0 === b && (b = {});
      if (!b.tech) {
        throw Error("A tech was not provided.");
      }
      b = O(b, {kind:qd[b.kind] || "subtitles", language:b.language || b.srclang || ""});
      var d = oc[b.mode] || "disabled", g = b["default"];
      if ("metadata" === b.kind || "chapters" === b.kind) {
        d = "hidden";
      }
      var l = c.call(this, b) || this;
      l.tech_ = b.tech;
      if (S) {
        for (var e in a.prototype) {
          "constructor" !== e && (l[e] = a.prototype[e]);
        }
      }
      l.cues_ = [];
      l.activeCues_ = [];
      var f = new nc(l.cues_), h = new nc(l.activeCues_), k = !1, m = x(l, function() {
        this.activeCues;
        k && (this.trigger("cuechange"), k = !1);
      });
      if ("disabled" !== d) {
        l.tech_.on("timeupdate", m);
      }
      Object.defineProperty(l, "default", {get:function() {
        return g;
      }, set:function() {
      }});
      Object.defineProperty(l, "mode", {get:function() {
        return d;
      }, set:function(b) {
        if (oc[b]) {
          d = b;
          if ("showing" === d) {
            this.tech_.on("timeupdate", m);
          }
          this.trigger("modechange");
        }
      }});
      Object.defineProperty(l, "cues", {get:function() {
        return this.loaded_ ? f : null;
      }, set:function() {
      }});
      Object.defineProperty(l, "activeCues", {get:function() {
        if (!this.loaded_) {
          return null;
        }
        if (0 === this.cues.length) {
          return h;
        }
        for (var b = this.tech_.currentTime(), a = [], c = 0, d = this.cues.length;c < d;c++) {
          var g = this.cues[c];
          g.startTime <= b && g.endTime >= b ? a.push(g) : g.startTime === g.endTime && g.startTime <= b && g.startTime + .5 >= b && a.push(g);
        }
        k = !1;
        if (a.length !== this.activeCues_.length) {
          k = !0;
        } else {
          for (c = 0;c < a.length;c++) {
            -1 === this.activeCues_.indexOf(a[c]) && (k = !0);
          }
        }
        this.activeCues_ = a;
        h.setCues_(this.activeCues_);
        return h;
      }, set:function() {
      }});
      b.src ? (l.src = b.src, wd(b.src, l)) : l.loaded_ = !0;
      return l;
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
      for (var a = !1, c = 0, l = this.cues_.length;c < l;c++) {
        this.cues_[c] === b && (this.cues_.splice(c, 1), a = !0);
      }
      a && this.cues.setCues_(this.cues_);
    };
    return a;
  }(nb);
  Ra.prototype.allowedEvents_ = {cuechange:"cuechange"};
  var xa = function(c) {
    function a(b) {
      void 0 === b && (b = {});
      var d = c.call(this) || this, g, l = d;
      if (S) {
        var l = w.createElement("custom"), e;
        for (e in a.prototype) {
          "constructor" !== e && (l[e] = a.prototype[e]);
        }
      }
      var f = new Ra(b);
      l.kind = f.kind;
      l.src = f.src;
      l.srclang = f.language;
      l.label = f.label;
      l["default"] = f["default"];
      Object.defineProperty(l, "readyState", {get:function() {
        return g;
      }});
      Object.defineProperty(l, "track", {get:function() {
        return f;
      }});
      g = 0;
      f.addEventListener("loadeddata", function() {
        g = 2;
        l.trigger({type:"load", target:l});
      });
      return S ? l : d;
    }
    __extends(a, c);
    return a;
  }(T);
  xa.prototype.allowedEvents_ = {load:"load"};
  xa.NONE = 0;
  xa.LOADING = 1;
  xa.LOADED = 2;
  xa.ERROR = 3;
  var xd = function() {
    function c(a) {
      void 0 === a && (a = []);
      var b = this;
      if (S) {
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
      for (var g = a.length;d < g;d++) {
        b.addTrackElement_(a[d]);
      }
      if (S) {
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
      for (var b, c = 0, g = this.trackElements_.length;c < g;c++) {
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
  }(), aa = function(c) {
    function a(b, d) {
      void 0 === b && (b = []);
      void 0 === d && (d = null);
      var g = c.call(this) || this;
      if (!d && (d = g, S)) {
        d = w.createElement("custom");
        for (var l in a.prototype) {
          "constructor" !== l && (d[l] = a.prototype[l]);
        }
      }
      d.tracks_ = [];
      Object.defineProperty(d, "length", {get:function() {
        return this.tracks_.length;
      }});
      for (g = 0;g < b.length;g++) {
        d.addTrack_(b[g]);
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
      for (var a, c = 0, l = this.length;c < l;c++) {
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
      for (var a = null, c = 0, l = this.length;c < l;c++) {
        var e = this[c];
        if (e.id === b) {
          a = e;
          break;
        }
      }
      return a;
    };
    return a;
  }(T);
  aa.prototype.allowedEvents_ = {change:"change", addtrack:"addtrack", removetrack:"removetrack"};
  for (var yd in aa.prototype.allowedEvents_) {
    aa.prototype["on" + yd] = null;
  }
  var qb = function(c) {
    function a(b) {
      void 0 === b && (b = []);
      var d;
      if (S) {
        d = w.createElement("custom");
        for (var g in aa.prototype) {
          "constructor" !== g && (d[g] = aa.prototype[g]);
        }
        for (g in a.prototype) {
          "constructor" !== g && (d[g] = a.prototype[g]);
        }
      }
      return d = c.call(this, b, d) || this;
    }
    __extends(a, c);
    a.prototype.addTrack_ = function(b) {
      c.prototype.addTrack_.call(this, b);
      b.addEventListener("modechange", x(this, function() {
        this.trigger("change");
      }));
    };
    return a;
  }(aa), rb = function(c, a) {
    for (var b = 0;b < c.length;b++) {
      a.id !== c[b].id && (c[b].selected = !1);
    }
  }, vc = function(c) {
    function a(b) {
      void 0 === b && (b = []);
      for (var d, g = b.length - 1;0 <= g;g--) {
        if (b[g].selected) {
          rb(b, b[g]);
          break;
        }
      }
      if (S) {
        d = w.createElement("custom");
        for (var l in aa.prototype) {
          "constructor" !== l && (d[l] = aa.prototype[l]);
        }
        for (l in a.prototype) {
          "constructor" !== l && (d[l] = a.prototype[l]);
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
      b.selected && rb(this, b);
      c.prototype.addTrack_.call(this, b);
      b.addEventListener && b.addEventListener("selectedchange", function() {
        a.changing_ || (a.changing_ = !0, rb(a, b), a.changing_ = !1, a.trigger("change"));
      });
    };
    a.prototype.addTrack = function(b) {
      this.addTrack_(b);
    };
    a.prototype.removeTrack = function(b) {
      c.prototype.removeTrack_.call(this, b);
    };
    return a;
  }(aa), sb = function(c, a) {
    for (var b = 0;b < c.length;b++) {
      a.id !== c[b].id && (c[b].enabled = !1);
    }
  }, wc = function(c) {
    function a(b) {
      void 0 === b && (b = []);
      for (var d, g = b.length - 1;0 <= g;g--) {
        if (b[g].enabled) {
          sb(b, b[g]);
          break;
        }
      }
      if (S) {
        d = w.createElement("custom");
        for (var l in aa.prototype) {
          "constructor" !== l && (d[l] = aa.prototype[l]);
        }
        for (l in a.prototype) {
          "constructor" !== l && (d[l] = a.prototype[l]);
        }
      }
      d = c.call(this, b, d) || this;
      d.changing_ = !1;
      return d;
    }
    __extends(a, c);
    a.prototype.addTrack_ = function(b) {
      var a = this;
      b.enabled && sb(this, b);
      c.prototype.addTrack_.call(this, b);
      b.addEventListener && b.addEventListener("enabledchange", function() {
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
  }(aa), G = function(c) {
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
      d.autoRemoteTextTracks_ = new qb;
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
      this.progressInterval = this.setInterval(x(this, function() {
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
      return Sb(this.buffered(), this.duration_);
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
          var g = c[d];
          "text" === b && a.removeRemoteTextTrack(g);
          c.removeTrack_(g);
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
      void 0 !== b && (this.error_ = new R(b), this.trigger("error"));
      return this.error_;
    };
    a.prototype.played = function() {
      return this.hasStarted_ ? fa(0, 0) : fa();
    };
    a.prototype.setCurrentTime = function() {
      this.manualTimeUpdates && this.trigger({type:"timeupdate", target:this, manuallyTriggered:!0});
    };
    a.prototype.initTextTrackListeners = function() {
      var b = x(this, function() {
        this.trigger("texttrackchange");
      }), a = this.textTracks();
      a && (a.addEventListener("removetrack", b), a.addEventListener("addtrack", b), this.on("dispose", x(this, function() {
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
      if (!p.WebVTT && null !== this.el().parentNode && void 0 !== this.el().parentNode) {
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
        p.WebVTT = !0;
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
        }, l = function() {
          c();
          for (var b = 0;b < a.length;b++) {
            var d = a[b];
            d.removeEventListener("cuechange", c);
            "showing" === d.mode && d.addEventListener("cuechange", c);
          }
        };
        l();
        a.addEventListener("change", l);
        this.on("dispose", function() {
          a.removeEventListener("change", l);
        });
      }
    };
    a.prototype.videoTracks = function() {
      return this.videoTracks_ = this.videoTracks_ || new vc;
    };
    a.prototype.audioTracks = function() {
      return this.audioTracks_ = this.audioTracks_ || new wc;
    };
    a.prototype.textTracks = function() {
      return this.textTracks_ = this.textTracks_ || new qb;
    };
    a.prototype.remoteTextTracks = function() {
      return this.remoteTextTracks_ = this.remoteTextTracks_ || new qb;
    };
    a.prototype.remoteTextTrackEls = function() {
      return this.remoteTextTrackEls_ = this.remoteTextTrackEls_ || new xd;
    };
    a.prototype.addTextTrack = function(b, a, c) {
      if (!b) {
        throw Error("TextTrack kind is required but was not provided");
      }
      var d = void 0;
      void 0 === d && (d = {});
      var g = this.textTracks();
      d.kind = b;
      a && (d.label = a);
      c && (d.language = c);
      d.tech = this;
      b = new Ra(d);
      g.addTrack_(b);
      return b;
    };
    a.prototype.createRemoteTextTrack = function(b) {
      b = O(b, {tech:this});
      return new xa(b);
    };
    a.prototype.addRemoteTextTrack = function(b, a) {
      void 0 === b && (b = {});
      b = this.createRemoteTextTrack(b);
      !0 !== a && !1 !== a && (B.warn('Calling addRemoteTextTrack without explicitly setting the "manualCleanup" parameter to `true` is deprecated and default to `false` in future version of video.js'), a = !0);
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
      if (p && p.videojs && p.videojs[b]) {
        return B.warn("The " + b + " tech was added to the videojs object when it should be registered using videojs.registerTech(name, tech)"), p.videojs[b];
      }
    };
    return a;
  }(n);
  G.prototype.featuresVolumeControl = !0;
  G.prototype.featuresFullscreenResize = !1;
  G.prototype.featuresPlaybackRate = !1;
  G.prototype.featuresProgressEvents = !1;
  G.prototype.featuresTimeupdateEvents = !1;
  G.prototype.featuresNativeTextTracks = !1;
  G.withSourceHandlers = function(c) {
    c.registerSourceHandler = function(a, b) {
      var d = c.sourceHandlers;
      d || (d = c.sourceHandlers = []);
      void 0 === b && (b = d.length);
      d.splice(b, 0, a);
    };
    c.canPlayType = function(a) {
      for (var b = c.sourceHandlers || [], d, g = 0;g < b.length;g++) {
        if (d = b[g].canPlayType(a)) {
          return d;
        }
      }
      return "";
    };
    c.selectSourceHandler = function(a, b) {
      for (var d = c.sourceHandlers || [], g, e = 0;e < d.length;e++) {
        if (g = d[e].canHandleSource(a, b)) {
          return d[e];
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
      b || (c.nativeSourceHandler ? b = c.nativeSourceHandler : B.error("No source hander found for the current source."));
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
  n.registerComponent("Tech", G);
  n.registerComponent("MediaTechController", G);
  G.registerTech("Tech", G);
  var zd = function(c) {
    function a(b, a, g) {
      g = c.call(this, b, a, g) || this;
      if (a.playerOptions.sources && 0 !== a.playerOptions.sources.length) {
        b.src(a.playerOptions.sources);
      } else {
        var d = 0;
        for (a = a.playerOptions.techOrder;d < a.length;d++) {
          var e = N(a[d]), f = G.getTech(e);
          e || (f = n.getComponent(e));
          if (f && f.isSupported()) {
            b.loadTech_(e);
            break;
          }
        }
      }
      return g;
    }
    __extends(a, c);
    return a;
  }(n);
  n.registerComponent("MediaLoader", zd);
  for (var tb = p.navigator, E = function(c) {
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
      p.videojs = p.videojs || {};
      p.videojs.Flash = p.videojs.Flash || {};
      p.videojs.Flash.onReady = a.onReady;
      p.videojs.Flash.onEvent = a.onEvent;
      p.videojs.Flash.onError = a.onError;
      d.on("seeked", function() {
        this.lastSeekTarget_ = void 0;
      });
      return d;
    }
    __extends(a, c);
    a.prototype.createEl = function() {
      var b = this.options_;
      b.swf || (b.swf = "//vjs.zencdn.net/swf/5.1.0/video-js.swf");
      var c = b.techId, g = y({readyFunction:"videojs.Flash.onReady", eventProxyFunction:"videojs.Flash.onEvent", errorEventProxyFunction:"videojs.Flash.onError", autoplay:b.autoplay, preload:b.preload, loop:b.loop, muted:b.muted}, b.flashVars), e = y({wmode:"opaque", bgcolor:"#000000"}, b.params), c = y({id:c, name:c, "class":"vjs-tech"}, b.attributes);
      this.el_ = a.embed(b.swf, g, e, c);
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
      b = rd(b);
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
  }(G), Vb = E.prototype, ub = "rtmpConnection rtmpStream preload defaultPlaybackRate playbackRate autoplay loop mediaGroup controller controls volume muted defaultMuted".split(" "), xc = "networkState readyState initialTime startOffsetTime paused ended videoWidth videoHeight".split(" "), P = 0;P < ub.length;P++) {
    Wb(ub[P]), gd(ub[P]);
  }
  for (P = 0;P < xc.length;P++) {
    Wb(xc[P]);
  }
  E.isSupported = function() {
    return 10 <= E.version()[0];
  };
  G.withSourceHandlers(E);
  E.nativeSourceHandler = {};
  E.nativeSourceHandler.canPlayType = function(c) {
    return c in E.formats ? "maybe" : "";
  };
  E.nativeSourceHandler.canHandleSource = function(c, a) {
    c = c.type ? c.type.replace(/;.*/, "").toLowerCase() : (c = qc(c.src)) ? "video/" + c : "";
    return E.nativeSourceHandler.canPlayType(c);
  };
  E.nativeSourceHandler.handleSource = function(c, a, b) {
    a.setSrc(c.src);
  };
  E.nativeSourceHandler.dispose = function() {
  };
  E.registerSourceHandler(E.nativeSourceHandler);
  E.formats = {"video/flv":"FLV", "video/x-flv":"FLV", "video/mp4":"MP4", "video/m4v":"MP4"};
  E.onReady = function(c) {
    (c = (c = oa(c)) && c.tech) && c.el() && E.checkReady(c);
  };
  E.checkReady = function(c) {
    c.el() && (c.el().vjs_getProperty ? c.triggerReady() : this.setTimeout(function() {
      E.checkReady(c);
    }, 50));
  };
  E.onEvent = function(c, a) {
    var b = oa(c).tech, d = Array.prototype.slice.call(arguments, 2);
    b.setTimeout(function() {
      b.trigger(a, d);
    }, 1);
  };
  E.onError = function(c, a) {
    c = oa(c).tech;
    if ("srcnotfound" === a) {
      return c.error(4);
    }
    c.error("FLASH: " + a);
  };
  E.version = function() {
    var c = "0,0,0";
    try {
      c = (new p.ActiveXObject("ShockwaveFlash.ShockwaveFlash")).GetVariable("$version").replace(/\D+/g, ",").match(/^,?(.+),?$/)[1];
    } catch (a) {
      try {
        tb.mimeTypes["application/x-shockwave-flash"].enabledPlugin && (c = (tb.plugins["Shockwave Flash 2.0"] || tb.plugins["Shockwave Flash"]).description.replace(/\D+/g, ",").match(/^,?(.+),?$/)[1]);
      } catch (b) {
      }
    }
    return c.split(",");
  };
  E.embed = function(c, a, b, d) {
    c = E.getEmbedCode(c, a, b, d);
    return h("div", {innerHTML:c}).childNodes[0];
  };
  E.getEmbedCode = function(c, a, b, d) {
    var g = "", e = "", f = "";
    a && Object.getOwnPropertyNames(a).forEach(function(b) {
      g += b + "=" + a[b] + "&amp;";
    });
    b = y({movie:c, flashvars:g, allowScriptAccess:"always", allowNetworking:"all"}, b);
    Object.getOwnPropertyNames(b).forEach(function(a) {
      e += '<param name="' + a + '" value="' + b[a] + '" />';
    });
    d = y({data:c, width:"100%", height:"100%"}, d);
    Object.getOwnPropertyNames(d).forEach(function(b) {
      f += b + '="' + d[b] + '" ';
    });
    return '<object type="application/x-shockwave-flash" ' + f + ">" + e + "</object>";
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
      var c = a.search(/&(?!\w+=)/), g;
      -1 !== c ? g = c + 1 : (c = g = a.lastIndexOf("/") + 1, 0 === c && (c = g = a.length));
      b.connection = a.substring(0, c);
      b.stream = a.substring(g, a.length);
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
  })(E);
  n.registerComponent("Flash", E);
  G.registerTech("Flash", E);
  var ya = function(c) {
    function a(b, a) {
      b = c.call(this, b, a) || this;
      b.emitTapEvents();
      b.enable();
      return b;
    }
    __extends(a, c);
    a.prototype.createEl = function(b, a, g) {
      void 0 === b && (b = "div");
      void 0 === a && (a = {});
      void 0 === g && (g = {});
      a = y({className:this.buildCSSClass(), tabIndex:0}, a);
      "button" === b && B.error("Creating a ClickableComponent with an HTML element of " + b + " is not supported; use a Button instead.");
      g = y({role:"button", "aria-live":"polite"}, g);
      this.tabIndex_ = a.tabIndex;
      b = c.prototype.createEl.call(this, b, a, g);
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
      Z(w, "keydown", x(this, this.handleKeyPress));
    };
    a.prototype.handleKeyPress = function(b) {
      32 === b.which || 13 === b.which ? (b.preventDefault(), this.handleClick(b)) : c.prototype.handleKeyPress && c.prototype.handleKeyPress.call(this, b);
    };
    a.prototype.handleBlur = function(b) {
      ea(w, "keydown", x(this, this.handleKeyPress));
    };
    return a;
  }(n);
  n.registerComponent("ClickableComponent", ya);
  var Ad = function(c) {
    function a(b, a) {
      a = c.call(this, b, a) || this;
      a.update();
      b.on("posterchange", x(a, a.update));
      return a;
    }
    __extends(a, c);
    a.prototype.dispose = function() {
      this.player().off("posterchange", this.update);
      c.prototype.dispose.call(this);
    };
    a.prototype.createEl = function() {
      var b = h("div", {className:"vjs-poster", tabIndex:-1});
      ic || (this.fallbackImg_ = h("img"), b.appendChild(this.fallbackImg_));
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
  n.registerComponent("PosterImage", Ad);
  var Bd = {monospace:"monospace", sansSerif:"sans-serif", serif:"serif", monospaceSansSerif:'"Andale Mono", "Lucida Console", monospace', monospaceSerif:'"Courier New", monospace', proportionalSansSerif:"sans-serif", proportionalSerif:"serif", casual:'"Comic Sans MS", Impact, fantasy', script:'"Monotype Corsiva", cursive', smallcaps:'"Andale Mono", "Lucida Console", monospace, sans-serif'}, Cd = function(c) {
    function a(b, a, g) {
      a = c.call(this, b, a, g) || this;
      b.on("loadstart", x(a, a.toggleDisplay));
      b.on("texttrackchange", x(a, a.updateDisplay));
      b.ready(x(a, function() {
        if (b.tech_ && b.tech_.featuresNativeTextTracks) {
          this.hide();
        } else {
          b.on("fullscreenchange", x(this, this.updateDisplay));
          for (var a = this.options_.playerOptions.tracks || [], c = 0;c < a.length;c++) {
            this.player_.addRemoteTextTrack(a[c]);
          }
          var a = {captions:1, subtitles:1}, d = this.player_.textTracks(), g, e;
          if (d) {
            for (c = 0;c < d.length;c++) {
              var f = d[c];
              f["default"] && ("descriptions" !== f.kind || g ? f.kind in a && !e && (e = f) : g = f);
            }
            e ? e.mode = "showing" : g && (g.mode = "showing");
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
      "function" === typeof p.WebVTT && p.WebVTT.processCues(p, [], this.el_);
    };
    a.prototype.updateDisplay = function() {
      var b = this.player_.textTracks();
      this.clearDisplay();
      if (b) {
        for (var a = null, c = null, e = b.length;e--;) {
          var f = b[e];
          "showing" === f.mode && ("descriptions" === f.kind ? a = f : c = f);
        }
        c ? ("off" !== this.getAttribute("aria-live") && this.setAttribute("aria-live", "off"), this.updateForTrack(c)) : a && ("assertive" !== this.getAttribute("aria-live") && this.setAttribute("aria-live", "assertive"), this.updateForTrack(a));
      }
    };
    a.prototype.updateForTrack = function(b) {
      if ("function" === typeof p.WebVTT && b.activeCues) {
        for (var a = this.player_.textTrackSettings.getValues(), c = [], e = 0;e < b.activeCues.length;e++) {
          c.push(b.activeCues[e]);
        }
        p.WebVTT.processCues(p, c, this.el_);
        for (b = c.length;b--;) {
          if (e = c[b]) {
            e = e.displayState;
            a.color && (e.firstChild.style.color = a.color);
            if (a.textOpacity) {
              var f = eb(a.color || "#fff", a.textOpacity);
              try {
                e.firstChild.style.color = f;
              } catch (Mb) {
              }
            }
            a.backgroundColor && (e.firstChild.style.backgroundColor = a.backgroundColor);
            if (a.backgroundOpacity) {
              f = eb(a.backgroundColor || "#000", a.backgroundOpacity);
              try {
                e.firstChild.style.backgroundColor = f;
              } catch (Mb) {
              }
            }
            if (a.windowColor) {
              if (a.windowOpacity) {
                f = eb(a.windowColor, a.windowOpacity);
                try {
                  e.style.backgroundColor = f;
                } catch (Mb) {
                }
              } else {
                e.style.backgroundColor = a.windowColor;
              }
            }
            a.edgeStyle && ("dropshadow" === a.edgeStyle ? e.firstChild.style.textShadow = "2px 2px 3px #222, 2px 2px 4px #222, 2px 2px 5px #222" : "raised" === a.edgeStyle ? e.firstChild.style.textShadow = "1px 1px #222, 2px 2px #222, 3px 3px #222" : "depressed" === a.edgeStyle ? e.firstChild.style.textShadow = "1px 1px #ccc, 0 1px #ccc, -1px -1px #222, 0 -1px #222" : "uniform" === a.edgeStyle && (e.firstChild.style.textShadow = "0 0 4px #222, 0 0 4px #222, 0 0 4px #222, 0 0 4px #222"));
            a.fontPercent && 1 !== a.fontPercent && (f = p.parseFloat(e.style.fontSize), e.style.fontSize = f * a.fontPercent + "px", e.style.height = "auto", e.style.top = "auto", e.style.bottom = "2px");
            a.fontFamily && "default" !== a.fontFamily && ("small-caps" === a.fontFamily ? e.firstChild.style.fontVariant = "small-caps" : e.firstChild.style.fontFamily = Bd[a.fontFamily]);
          }
        }
      }
    };
    return a;
  }(n);
  n.registerComponent("TextTrackDisplay", Cd);
  var Dd = function(c) {
    function a() {
      return c.apply(this, arguments) || this;
    }
    __extends(a, c);
    a.prototype.createEl = function() {
      return c.prototype.createEl.call(this, "div", {className:"vjs-loading-spinner", dir:"ltr"});
    };
    return a;
  }(n);
  n.registerComponent("LoadingSpinner", Dd);
  var za = function(c) {
    function a() {
      return c.apply(this, arguments) || this;
    }
    __extends(a, c);
    a.prototype.createEl = function(b, a, c) {
      void 0 === b && (b = "button");
      void 0 === a && (a = {});
      void 0 === c && (c = {});
      a = y({className:this.buildCSSClass()}, a);
      "button" !== b && (B.warn("Creating a Button with an HTML element of " + b + " is deprecated; use ClickableComponent instead."), a = y({tabIndex:0}, a), c = y({role:"button"}, c));
      c = y({type:"button", "aria-live":"polite"}, c);
      b = n.prototype.createEl.call(this, b, a, c);
      this.createControlTextEl(b);
      return b;
    };
    a.prototype.addChild = function(b, a) {
      void 0 === a && (a = {});
      B.warn("Adding an actionable (user controllable) child to a Button (" + this.constructor.name + ") is not supported; use a ClickableComponent instead.");
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
  var yc = function(c) {
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
  yc.prototype.controlText_ = "Play Video";
  n.registerComponent("BigPlayButton", yc);
  var Ed = function(c) {
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
  n.registerComponent("CloseButton", Ed);
  var zc = function(c) {
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
  zc.prototype.controlText_ = "Play";
  n.registerComponent("PlayToggle", zc);
  var Fd = function(c) {
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
      a = ka(a, this.player_.duration());
      a !== this.formattedTime_ && (this.formattedTime_ = a, this.contentEl_.innerHTML = '<span class="vjs-control-text">' + b + "</span> " + a);
    };
    return a;
  }(n);
  n.registerComponent("CurrentTimeDisplay", Fd);
  var Gd = function(c) {
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
      a && this.duration_ !== a && (this.duration_ = a, b = this.localize("Duration Time"), a = ka(a), this.contentEl_.innerHTML = '<span class="vjs-control-text">' + b + "</span> " + a);
    };
    return a;
  }(n);
  n.registerComponent("DurationDisplay", Gd);
  var Hd = function(c) {
    function a() {
      return c.apply(this, arguments) || this;
    }
    __extends(a, c);
    a.prototype.createEl = function() {
      return c.prototype.createEl.call(this, "div", {className:"vjs-time-control vjs-time-divider", innerHTML:"<div><span>/</span></div>"});
    };
    return a;
  }(n);
  n.registerComponent("TimeDivider", Hd);
  var Id = function(c) {
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
        var a = ka(this.player_.remainingTime());
        a !== this.formattedTime_ && (this.formattedTime_ = a, this.contentEl_.innerHTML = '<span class="vjs-control-text">' + b + "</span> -" + a);
      }
    };
    return a;
  }(n);
  n.registerComponent("RemainingTimeDisplay", Id);
  var Jd = function(c) {
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
  n.registerComponent("LiveDisplay", Jd);
  var vb = function(c) {
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
    a.prototype.createEl = function(b, a, g) {
      void 0 === a && (a = {});
      void 0 === g && (g = {});
      a.className += " vjs-slider";
      a = y({tabIndex:0}, a);
      g = y({role:"slider", "aria-valuenow":0, "aria-valuemin":0, "aria-valuemax":100, tabIndex:0}, g);
      return c.prototype.createEl.call(this, b, a, g);
    };
    a.prototype.handleMouseDown = function(b) {
      var a = this.bar.el_.ownerDocument;
      b.preventDefault();
      D();
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
      M();
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
      b = Kb(this.el_, b);
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
  n.registerComponent("Slider", vb);
  var Kd = function(c) {
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
      var a = this.player_.duration(), c = this.player_.bufferedEnd(), e = this.partEls_, f = function(b, a) {
        b = b / a || 0;
        return 100 * (1 <= b ? 1 : b) + "%";
      };
      this.el_.style.width = f(c, a);
      for (a = 0;a < b.length;a++) {
        var k = b.start(a), m = b.end(a), n = e[a];
        n || (n = this.el_.appendChild(h()), e[a] = n);
        n.style.left = f(k, c);
        n.style.width = f(m - k, c);
      }
      for (a = e.length;a > b.length;a--) {
        this.el_.removeChild(e[a - 1]);
      }
      e.length = b.length;
    };
    return a;
  }(n);
  n.registerComponent("LoadProgressBar", Kd);
  var Ld = function(c) {
    function a(b, a) {
      var d = c.call(this, b, a) || this;
      d.updateDataAttr();
      d.on(b, "timeupdate", d.updateDataAttr);
      b.ready(x(d, d.updateDataAttr));
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
      this.el_.setAttribute("data-current-time", ka(b, this.player_.duration()));
    };
    return a;
  }(n);
  n.registerComponent("PlayProgressBar", Ld);
  var Md = function(c) {
    function a(b, a) {
      a = c.call(this, b, a) || this;
      a.updateDataAttr();
      a.on(b, "timeupdate", a.updateDataAttr);
      b.ready(x(a, a.updateDataAttr));
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
      b = ka(b, this.player_.duration());
      this.el_.setAttribute("data-current-time", b);
      this.tooltip.innerHTML = b;
    };
    return a;
  }(n);
  n.registerComponent("TooltipProgressBar", Md);
  var wb = function(c) {
    function a(b, a) {
      var d = c.call(this, b, a) || this;
      d.on(b, "timeupdate", d.updateProgress);
      d.on(b, "ended", d.updateProgress);
      b.ready(x(d, d.updateProgress));
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
      b.setAttribute("aria-valuetext", ka(a, this.player_.duration()));
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
  }(vb);
  wb.prototype.options_ = {children:["loadProgressBar", "mouseTimeDisplay", "playProgressBar"], barName:"playProgressBar"};
  wb.prototype.playerEvent = "timeupdate";
  n.registerComponent("SeekBar", wb);
  var Nd = function(c) {
    function a(b, a) {
      var d = c.call(this, b, a) || this;
      a.playerOptions && a.playerOptions.controlBar && a.playerOptions.controlBar.progressControl && a.playerOptions.controlBar.progressControl.keepTooltipsInside && (d.keepTooltipsInside = a.playerOptions.controlBar.progressControl.keepTooltipsInside);
      d.keepTooltipsInside && (d.tooltip = h("div", {className:"vjs-time-tooltip"}), d.el().appendChild(d.tooltip), d.addClass("vjs-keep-tooltips-inside"));
      d.update(0, 0);
      b.on("ready", function() {
        d.on(b.controlBar.progressControl.el(), "mousemove", md(x(d, d.handleMouseMove), 25));
      });
      return d;
    }
    __extends(a, c);
    a.prototype.createEl = function() {
      return c.prototype.createEl.call(this, "div", {className:"vjs-mouse-display"});
    };
    a.prototype.handleMouseMove = function(b) {
      var a = this.player_.duration(), a = this.calculateDistance(b) * a;
      b = b.pageX - K(this.el().parentNode).left;
      this.update(a, b);
    };
    a.prototype.update = function(b, a) {
      b = ka(b, this.player_.duration());
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
      return Kb(this.el().parentNode, b).x;
    };
    a.prototype.clampPosition_ = function(b) {
      if (!this.keepTooltipsInside) {
        return b;
      }
      var a = parseFloat(ta(this.player().el(), "width")), c = parseFloat(ta(this.tooltip, "width")) / 2, e = b;
      b < c ? e = Math.ceil(c) : b > a - c && (e = Math.floor(a - c));
      return e;
    };
    return a;
  }(n);
  n.registerComponent("MouseTimeDisplay", Nd);
  var Ac = function(c) {
    function a() {
      return c.apply(this, arguments) || this;
    }
    __extends(a, c);
    a.prototype.createEl = function() {
      return c.prototype.createEl.call(this, "div", {className:"vjs-progress-control vjs-control"});
    };
    return a;
  }(n);
  Ac.prototype.options_ = {children:["seekBar"]};
  n.registerComponent("ProgressControl", Ac);
  var Bc = function(c) {
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
  Bc.prototype.controlText_ = "Fullscreen";
  n.registerComponent("FullscreenToggle", Bc);
  var Od = function(c) {
    function a() {
      return c.apply(this, arguments) || this;
    }
    __extends(a, c);
    a.prototype.createEl = function() {
      return c.prototype.createEl.call(this, "div", {className:"vjs-volume-level", innerHTML:'<span class="vjs-control-text"></span>'});
    };
    return a;
  }(n);
  n.registerComponent("VolumeLevel", Od);
  var Sa = function(c) {
    function a(b, a) {
      a = c.call(this, b, a) || this;
      a.on(b, "volumechange", a.updateARIAAttributes);
      b.ready(x(a, a.updateARIAAttributes));
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
  }(vb);
  Sa.prototype.options_ = {children:["volumeLevel"], barName:"volumeLevel"};
  Sa.prototype.playerEvent = "volumechange";
  n.registerComponent("VolumeBar", Sa);
  var Cc = function(c) {
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
  Cc.prototype.options_ = {children:["volumeBar"]};
  n.registerComponent("VolumeControl", Cc);
  var Dc = function(c) {
    function a() {
      return c.apply(this, arguments) || this;
    }
    __extends(a, c);
    a.prototype.addItem = function(b) {
      this.addChild(b);
      b.on("click", x(this, function() {
        this.unlockShowing();
      }));
    };
    a.prototype.createEl = function() {
      this.contentEl_ = h(this.options_.contentElType || "ul", {className:"vjs-menu-content"});
      var b = c.prototype.createEl.call(this, "div", {append:this.contentEl_, className:"vjs-menu"});
      b.appendChild(this.contentEl_);
      Z(b, "click", function(b) {
        b.preventDefault();
        b.stopImmediatePropagation();
      });
      return b;
    };
    return a;
  }(n);
  n.registerComponent("Popup", Dc);
  var Ec = function(c) {
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
  n.registerComponent("PopupButton", Ec);
  var Ta = function(c) {
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
        Aa(this.el_, "vjs-vol-" + a);
      }
      F(this.el_, "vjs-vol-" + b);
    };
    return a;
  }(za);
  Ta.prototype.controlText_ = "Mute";
  n.registerComponent("MuteToggle", Ta);
  var xb = function(c) {
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
      var b = new Dc(this.player_, {contentElType:"div"}), a = new Sa(this.player_, this.options_.volumeBar);
      b.addChild(a);
      this.menuContent = b;
      this.volumeBar = a;
      this.attachVolumeBarEvents();
      return b;
    };
    a.prototype.handleClick = function(b) {
      Ta.prototype.handleClick.call(this);
      c.prototype.handleClick.call(this);
    };
    a.prototype.attachVolumeBarEvents = function() {
      this.menuContent.on(["mousedown", "touchdown"], x(this, this.handleMouseDown));
    };
    a.prototype.handleMouseDown = function(b) {
      this.on(["mousemove", "touchmove"], x(this.volumeBar, this.volumeBar.handleMouseMove));
      this.on(this.el_.ownerDocument, ["mouseup", "touchend"], this.handleMouseUp);
    };
    a.prototype.handleMouseUp = function(b) {
      this.off(["mousemove", "touchmove"], x(this.volumeBar, this.volumeBar.handleMouseMove));
    };
    return a;
  }(Ec);
  xb.prototype.volumeUpdate = Ta.prototype.update;
  xb.prototype.controlText_ = "Mute";
  n.registerComponent("VolumeMenuButton", xb);
  var yb = function(c) {
    function a(b, a) {
      b = c.call(this, b, a) || this;
      b.focusedChild_ = -1;
      b.on("keydown", b.handleKeyPress);
      return b;
    }
    __extends(a, c);
    a.prototype.addItem = function(b) {
      this.addChild(b);
      b.on("click", x(this, function(b) {
        this.unlockShowing();
      }));
    };
    a.prototype.createEl = function() {
      this.contentEl_ = h(this.options_.contentElType || "ul", {className:"vjs-menu-content"});
      this.contentEl_.setAttribute("role", "menu");
      var b = c.prototype.createEl.call(this, "div", {append:this.contentEl_, className:"vjs-menu"});
      b.setAttribute("role", "presentation");
      b.appendChild(this.contentEl_);
      Z(b, "click", function(b) {
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
  n.registerComponent("Menu", yb);
  var zb = function(c) {
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
      var b = new yb(this.player_);
      if (this.options_.title) {
        var a = h("li", {className:"vjs-menu-title", innerHTML:N(this.options_.title), tabIndex:-1});
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
      this.one(this.menu.contentEl(), "mouseleave", x(this, function(b) {
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
  n.registerComponent("MenuButton", zb);
  var Ab = function(c) {
    function a(b, a) {
      var d = a.tracks;
      b = c.call(this, b, a) || this;
      1 >= b.items.length && b.hide();
      if (d) {
        var e = x(b, b.update);
        d.addEventListener("removetrack", e);
        d.addEventListener("addtrack", e);
        b.player_.on("dispose", function() {
          d.removeEventListener("removetrack", e);
          d.removeEventListener("addtrack", e);
        });
        return b;
      }
    }
    __extends(a, c);
    return a;
  }(zb);
  n.registerComponent("TrackButton", Ab);
  var Fa = function(c) {
    function a(b, a) {
      b = c.call(this, b, a) || this;
      b.selectable = a.selectable;
      b.selected(a.selected);
      b.selectable ? b.el_.setAttribute("role", "menuitemcheckbox") : b.el_.setAttribute("role", "menuitem");
      return b;
    }
    __extends(a, c);
    a.prototype.createEl = function(b, a, g) {
      return c.prototype.createEl.call(this, "li", y({className:"vjs-menu-item", innerHTML:this.localize(this.options_.label), tabIndex:-1}, a), g);
    };
    a.prototype.handleClick = function(b) {
      this.selected(!0);
    };
    a.prototype.selected = function(b) {
      this.selectable && (b ? (this.addClass("vjs-selected"), this.el_.setAttribute("aria-checked", "true"), this.controlText(", selected")) : (this.removeClass("vjs-selected"), this.el_.setAttribute("aria-checked", "false"), this.controlText(" ")));
    };
    return a;
  }(ya);
  n.registerComponent("MenuItem", Fa);
  var Ua = function(c) {
    function a(b, a) {
      var d = a.track, e = b.textTracks();
      a.label = d.label || d.language || "Unknown";
      a.selected = d["default"] || "showing" === d.mode;
      b = c.call(this, b, a) || this;
      b.track = d;
      if (e) {
        var f = x(b, b.handleTracksChange);
        e.addEventListener("change", f);
        b.on("dispose", function() {
          e.removeEventListener("change", f);
        });
      }
      if (e && void 0 === e.onchange) {
        var h;
        b.on(["tap", "click"], function() {
          if ("object" !== typeof p.Event) {
            try {
              h = new p.Event("change");
            } catch (Qb) {
            }
          }
          h || (h = w.createEvent("Event"), h.initEvent("change", !0, !0));
          e.dispatchEvent(h);
        });
      }
      return b;
    }
    __extends(a, c);
    a.prototype.handleClick = function(b) {
      var a = this.track.kind, g = this.player_.textTracks();
      c.prototype.handleClick.call(this, b);
      if (g) {
        for (b = 0;b < g.length;b++) {
          var e = g[b];
          e.kind === a && (e.mode = e === this.track ? "showing" : "disabled");
        }
      }
    };
    a.prototype.handleTracksChange = function(b) {
      this.selected("showing" === this.track.mode);
    };
    return a;
  }(Fa);
  n.registerComponent("TextTrackMenuItem", Ua);
  var Fc = function(c) {
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
      for (var a = !0, c = 0, e = b.length;c < e;c++) {
        var f = b[c];
        if (f.kind === this.track.kind && "showing" === f.mode) {
          a = !1;
          break;
        }
      }
      this.selected(a);
    };
    return a;
  }(Ua);
  n.registerComponent("OffTextTrackMenuItem", Fc);
  var Ga = function(c) {
    function a(b, a) {
      void 0 === a && (a = {});
      a.tracks = b.textTracks();
      return c.call(this, b, a) || this;
    }
    __extends(a, c);
    a.prototype.createItems = function(b) {
      void 0 === b && (b = []);
      b.push(new Fc(this.player_, {kind:this.kind_}));
      var a = this.player_.textTracks();
      if (!a) {
        return b;
      }
      for (var c = 0;c < a.length;c++) {
        var e = a[c];
        e.kind === this.kind_ && b.push(new Ua(this.player_, {track:e, selectable:!0}));
      }
      return b;
    };
    return a;
  }(Ab);
  n.registerComponent("TextTrackButton", Ga);
  var Gc = function(c) {
    function a(b, a) {
      var d = a.track, e = a.cue, f = b.currentTime();
      a.selectable = !0;
      a.label = e.text;
      a.selected = e.startTime <= f && f < e.endTime;
      b = c.call(this, b, a) || this;
      b.track = d;
      b.cue = e;
      d.addEventListener("cuechange", x(b, b.update));
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
  }(Fa);
  n.registerComponent("ChaptersTrackMenuItem", Gc);
  var Bb = function(c) {
    function a(a, d, g) {
      a = c.call(this, a, d, g) || this;
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
        var g = a[c];
        if (g.kind === this.kind_) {
          return g;
        }
      }
    };
    a.prototype.getMenuCaption = function() {
      return this.track_ && this.track_.label ? this.track_.label : this.localize(N(this.kind_));
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
      for (var g = 0, e = c.length;g < e;g++) {
        var f = new Gc(this.player_, {track:this.track_, cue:c[g]});
        a.push(f);
      }
      return a;
    };
    return a;
  }(Ga);
  Bb.prototype.kind_ = "chapters";
  Bb.prototype.controlText_ = "Chapters";
  n.registerComponent("ChaptersButton", Bb);
  var Cb = function(c) {
    function a(a, d, g) {
      d = c.call(this, a, d, g) || this;
      d.el_.setAttribute("aria-label", "Descriptions Menu");
      var b = a.textTracks();
      if (b) {
        var e = x(d, d.handleTracksChange);
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
      for (var b = !1, c = 0, e = a.length;c < e;c++) {
        var f = a[c];
        if (f.kind !== this.kind_ && "showing" === f.mode) {
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
  }(Ga);
  Cb.prototype.kind_ = "descriptions";
  Cb.prototype.controlText_ = "Descriptions";
  n.registerComponent("DescriptionsButton", Cb);
  var Db = function(c) {
    function a(a, d, g) {
      a = c.call(this, a, d, g) || this;
      a.el_.setAttribute("aria-label", "Subtitles Menu");
      return a;
    }
    __extends(a, c);
    a.prototype.buildCSSClass = function() {
      return "vjs-subtitles-button " + c.prototype.buildCSSClass.call(this);
    };
    return a;
  }(Ga);
  Db.prototype.kind_ = "subtitles";
  Db.prototype.controlText_ = "Subtitles";
  n.registerComponent("SubtitlesButton", Db);
  var Hc = function(c) {
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
  }(Ua);
  n.registerComponent("CaptionSettingsMenuItem", Hc);
  var Eb = function(c) {
    function a(a, d, g) {
      a = c.call(this, a, d, g) || this;
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
      this.player().tech_ && this.player().tech_.featuresNativeTextTracks || a.push(new Hc(this.player_, {kind:this.kind_}));
      return c.prototype.createItems.call(this, a);
    };
    return a;
  }(Ga);
  Eb.prototype.kind_ = "captions";
  Eb.prototype.controlText_ = "Captions";
  n.registerComponent("CaptionsButton", Eb);
  var Ic = function(c) {
    function a(a, d) {
      var b = d.track, e = a.audioTracks();
      d.label = b.label || b.language || "Unknown";
      d.selected = b.enabled;
      a = c.call(this, a, d) || this;
      a.track = b;
      if (e) {
        var f = x(a, a.handleTracksChange);
        e.addEventListener("change", f);
        a.on("dispose", function() {
          e.removeEventListener("change", f);
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
          var g = b[a];
          g.enabled = g === this.track;
        }
      }
    };
    a.prototype.handleTracksChange = function(a) {
      this.selected(this.track.enabled);
    };
    return a;
  }(Fa);
  n.registerComponent("AudioTrackMenuItem", Ic);
  var Jc = function(c) {
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
        a.push(new Ic(this.player_, {track:b[c], selectable:!0}));
      }
      return a;
    };
    return a;
  }(Ab);
  Jc.prototype.controlText_ = "Audio Track";
  n.registerComponent("AudioTrackButton", Jc);
  var Fb = function(c) {
    function a(a, d) {
      var b = d.rate, e = parseFloat(b, 10);
      d.label = b;
      d.selected = 1 === e;
      d = c.call(this, a, d) || this;
      d.label = b;
      d.rate = e;
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
  }(Fa);
  Fb.prototype.contentElType = "button";
  n.registerComponent("PlaybackRateMenuItem", Fb);
  var Kc = function(c) {
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
      var a = new yb(this.player()), c = this.playbackRates();
      if (c) {
        for (var g = c.length - 1;0 <= g;g--) {
          a.addChild(new Fb(this.player(), {rate:c[g] + "x"}));
        }
      }
      return a;
    };
    a.prototype.updateARIAAttributes = function() {
      this.el().setAttribute("aria-valuenow", this.player().playbackRate());
    };
    a.prototype.handleClick = function(a) {
      a = this.player().playbackRate();
      for (var b = this.playbackRates(), c = b[0], e = 0;e < b.length;e++) {
        if (b[e] > a) {
          c = b[e];
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
  }(zb);
  Kc.prototype.controlText_ = "Playback Rate";
  n.registerComponent("PlaybackRateMenuButton", Kc);
  var Lc = function(c) {
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
  n.registerComponent("Spacer", Lc);
  var Pd = function(c) {
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
  }(Lc);
  n.registerComponent("CustomControlSpacer", Pd);
  var Mc = function(c) {
    function a() {
      return c.apply(this, arguments) || this;
    }
    __extends(a, c);
    a.prototype.createEl = function() {
      return c.prototype.createEl.call(this, "div", {className:"vjs-control-bar", dir:"ltr"}, {role:"group"});
    };
    return a;
  }(n);
  Mc.prototype.options_ = {children:"playToggle volumeMenuButton currentTimeDisplay timeDivider durationDisplay progressControl liveDisplay remainingTimeDisplay customControlSpacer playbackRateMenuButton chaptersButton descriptionsButton subtitlesButton captionsButton audioTrackButton fullscreenToggle".split(" ")};
  n.registerComponent("ControlBar", Mc);
  var Nc = function(c) {
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
  }(Ea);
  Nc.prototype.options_ = O(Ea.prototype.options_, {fillAlways:!0, temporary:!1, uncloseable:!0});
  n.registerComponent("ErrorDisplay", Nc);
  var Oc = ["#000", "Black"], Pc = ["#00F", "Blue"], Qc = ["#0FF", "Cyan"], Rc = ["#0F0", "Green"], Sc = ["#F0F", "Magenta"], Tc = ["#F00", "Red"], Uc = ["#FFF", "White"], Vc = ["#FF0", "Yellow"], Gb = ["1", "Opaque"], Hb = ["0.5", "Semi-Transparent"], Wc = ["0", "Transparent"], ra = {backgroundColor:{selector:".vjs-bg-color > select", id:"captions-background-color-%s", label:"Color", options:[Oc, Uc, Tc, Rc, Pc, Vc, Sc, Qc]}, backgroundOpacity:{selector:".vjs-bg-opacity > select", id:"captions-background-opacity-%s", 
  label:"Transparency", options:[Gb, Hb, Wc]}, color:{selector:".vjs-fg-color > select", id:"captions-foreground-color-%s", label:"Color", options:[Uc, Oc, Tc, Rc, Pc, Vc, Sc, Qc]}, edgeStyle:{selector:".vjs-edge-style > select", id:"%s", label:"Text Edge Style", options:[["none", "None"], ["raised", "Raised"], ["depressed", "Depressed"], ["uniform", "Uniform"], ["dropshadow", "Dropshadow"]]}, fontFamily:{selector:".vjs-font-family > select", id:"captions-font-family-%s", label:"Font Family", options:[["proportionalSansSerif", 
  "Proportional Sans-Serif"], ["monospaceSansSerif", "Monospace Sans-Serif"], ["proportionalSerif", "Proportional Serif"], ["monospaceSerif", "Monospace Serif"], ["casual", "Casual"], ["script", "Script"], ["small-caps", "Small Caps"]]}, fontPercent:{selector:".vjs-font-percent > select", id:"captions-font-size-%s", label:"Font Size", options:[["0.50", "50%"], ["0.75", "75%"], ["1.00", "100%"], ["1.25", "125%"], ["1.50", "150%"], ["1.75", "175%"], ["2.00", "200%"], ["3.00", "300%"], ["4.00", "400%"]], 
  "default":2, parser:function(c) {
    return "1.00" === c ? null : Number(c);
  }}, textOpacity:{selector:".vjs-text-opacity > select", id:"captions-foreground-opacity-%s", label:"Transparency", options:[Gb, Hb]}, windowColor:{selector:".vjs-window-color > select", id:"captions-window-color-%s", label:"Color"}, windowOpacity:{selector:".vjs-window-opacity > select", id:"captions-window-opacity-%s", label:"Transparency", options:[Wc, Hb, Gb]}};
  ra.windowColor.options = ra.backgroundColor.options;
  var Qd = function(c) {
    function a(a, d) {
      var b = c.call(this, a, d) || this;
      b.setDefaults();
      b.hide();
      b.updateDisplay = x(b, b.updateDisplay);
      void 0 === d.persistTextTrackSettings && (b.options_.persistTextTrackSettings = b.options_.playerOptions.persistTextTrackSettings);
      b.on(b.$(".vjs-done-button"), "click", function() {
        b.saveSettings();
        b.hide();
      });
      b.on(b.$(".vjs-default-button"), "click", function() {
        b.setDefaults();
        b.updateDisplay();
      });
      na(ra, function(a) {
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
      var a = h("legend", {textContent:this.localize("Text")}), c = this.createElSelect_("color"), g = h("span", {className:"vjs-text-opacity vjs-opacity"}, void 0, this.createElSelect_("textOpacity"));
      return h("fieldset", {className:"vjs-fg-color vjs-tracksetting"}, void 0, [a].concat(c, g));
    };
    a.prototype.createElBgColor_ = function() {
      var a = h("legend", {textContent:this.localize("Background")}), c = this.createElSelect_("backgroundColor"), g = h("span", {className:"vjs-bg-opacity vjs-opacity"}, void 0, this.createElSelect_("backgroundOpacity"));
      return h("fieldset", {className:"vjs-bg-color vjs-tracksetting"}, void 0, [a].concat(c, g));
    };
    a.prototype.createElWinColor_ = function() {
      var a = h("legend", {textContent:this.localize("Window")}), c = this.createElSelect_("windowColor"), g = h("span", {className:"vjs-window-opacity vjs-opacity"}, void 0, this.createElSelect_("windowOpacity"));
      return h("fieldset", {className:"vjs-window-color vjs-tracksetting"}, void 0, [a].concat(c, g));
    };
    a.prototype.createElColors_ = function() {
      return h("div", {className:"vjs-tracksettings-colors"}, void 0, [this.createElFgColor_(), this.createElBgColor_(), this.createElWinColor_()]);
    };
    a.prototype.createElFont_ = function() {
      var a = h("div", {className:"vjs-font-percent vjs-tracksetting"}, void 0, this.createElSelect_("fontPercent")), c = h("div", {className:"vjs-edge-style vjs-tracksetting"}, void 0, this.createElSelect_("edgeStyle")), g = h("div", {className:"vjs-font-family vjs-tracksetting"}, void 0, this.createElSelect_("fontFamily"));
      return h("div", {className:"vjs-tracksettings-font"}, void 0, [a, c, g]);
    };
    a.prototype.createElControls_ = function() {
      var a = h("button", {className:"vjs-default-button", textContent:this.localize("Defaults")}), c = h("button", {className:"vjs-done-button", textContent:"Done"});
      return h("div", {className:"vjs-tracksettings-controls"}, void 0, [a, c]);
    };
    a.prototype.createEl = function() {
      var a = h("div", {className:"vjs-tracksettings"}, void 0, [this.createElColors_(), this.createElFont_(), this.createElControls_()]), c = h("div", {className:"vjs-control-text", id:"TTsettingsDialogLabel-" + this.id_, textContent:"Caption Settings Dialog"}, {"aria-level":"1", role:"heading"}), g = h("div", {className:"vjs-control-text", id:"TTsettingsDialogDescription-" + this.id_, textContent:"Beginning of dialog window. Escape will cancel and close the window."}), a = h("div", void 0, {role:"document"}, 
      [c, g, a]);
      return h("div", {className:"vjs-caption-settings vjs-modal-overlay", tabIndex:-1}, {role:"dialog", "aria-labelledby":c.id, "aria-describedby":g.id}, a);
    };
    a.prototype.getValues = function() {
      var a = this;
      return Ya(ra, function(b, c, e) {
        var d = a.$(c.selector);
        c = Xb(d.options[d.options.selectedIndex].value, c.parser);
        void 0 !== c && (b[e] = c);
        return b;
      }, {});
    };
    a.prototype.setValues = function(a) {
      var b = this;
      na(ra, function(c, d) {
        var g = b.$(c.selector);
        d = a[d];
        c = c.parser;
        if (d) {
          for (var e = 0;e < g.options.length;e++) {
            if (Xb(g.options[e].value, c) === d) {
              g.selectedIndex = e;
              break;
            }
          }
        }
      });
    };
    a.prototype.setDefaults = function() {
      var a = this;
      na(ra, function(b) {
        var c = b.hasOwnProperty("default") ? b["default"] : 0;
        a.$(b.selector).selectedIndex = c;
      });
    };
    a.prototype.restoreSettings = function() {
      var a;
      try {
        a = JSON.parse(p.localStorage.getItem("vjs-text-track-settings"));
      } catch (d) {
        B.warn(d);
      }
      a && this.setValues(a);
    };
    a.prototype.saveSettings = function() {
      if (this.options_.persistTextTrackSettings) {
        var a = this.getValues();
        try {
          Object.keys(a).length ? p.localStorage.setItem("vjs-text-track-settings", JSON.stringify(a)) : p.localStorage.removeItem("vjs-text-track-settings");
        } catch (d) {
          B.warn(d);
        }
      }
    };
    a.prototype.updateDisplay = function() {
      var a = this.player_.getChild("textTrackDisplay");
      a && a.updateDisplay();
    };
    return a;
  }(n);
  n.registerComponent("TextTrackSettings", Qd);
  var v = function(c) {
    function a(a, d) {
      var b = c.call(this, a, d) || this, e = a.source;
      d = !1;
      e && (b.el_.currentSrc !== e.src || a.tag && 3 === a.tag.initNetworkState_) ? b.setSource(e) : b.handleLateInit_(b.el_);
      if (b.el_.hasChildNodes()) {
        for (var f = b.el_.childNodes, h = f.length, e = [];h--;) {
          var k = f[h];
          "track" === k.nodeName.toLowerCase() && (b.featuresNativeTextTracks ? (b.remoteTextTrackEls().addTrackElement_(k), b.remoteTextTracks().addTrack_(k.track), d || b.el_.hasAttribute("crossorigin") || !ob(k.src) || (d = !0)) : e.push(k));
        }
        for (f = 0;f < e.length;f++) {
          b.el_.removeChild(e[f]);
        }
      }
      ["audio", "video"].forEach(function(a) {
        var c = b.el()[a + "Tracks"], d = b[a + "Tracks"]();
        a = N(a);
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
      b.featuresNativeTextTracks && (d && B.warn((m = ["Text Tracks are being loaded from another origin but the crossorigin attribute isn't used.\n            This may prevent text tracks from loading."], m.raw = ["Text Tracks are being loaded from another origin but the crossorigin attribute isn't used.\n            This may prevent text tracks from loading."], Nb(m))), b.handleTextTrackChange_ = x(b, b.handleTextTrackChange), b.handleTextTrackAdd_ = x(b, b.handleTextTrackAdd), b.handleTextTrackRemove_ = 
      x(b, b.handleTextTrackRemove), b.proxyNativeTextTracks_());
      (Oa || gb || ec) && !0 === a.nativeControlsForTouch && b.setControls(!0);
      b.proxyWebkitFullscreen_();
      b.triggerReady();
      return b;
      var m;
    }
    __extends(a, c);
    a.prototype.dispose = function() {
      var b = this;
      ["audio", "video", "text"].forEach(function(a) {
        var c = N(a);
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
          b = w.createElement("video"), c = this.options_.tag && ja(this.options_.tag), c = O({}, c), Oa && !0 === this.options_.nativeControlsForTouch || delete c.controls, Za(b, y(c, {id:this.options_.techId, "class":"vjs-tech"}));
        }
        b.playerId = this.options_.playerId;
      }
      for (var c = ["autoplay", "preload", "loop", "muted"], e = c.length - 1;0 <= e;e--) {
        var f = c[e], h = {};
        "undefined" !== typeof this.options_[f] && (h[f] = this.options_[f]);
        Za(b, h);
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
          var e = function() {
            b || this.trigger("loadstart");
          };
          this.on("loadedmetadata", e);
          this.ready(function() {
            this.off("loadstart", c);
            this.off("loadedmetadata", e);
            b || this.trigger("loadstart");
          });
        } else {
          var f = ["loadstart"];
          f.push("loadedmetadata");
          2 <= a.readyState && f.push("loadeddata");
          3 <= a.readyState && f.push("canplay");
          4 <= a.readyState && f.push("canplaythrough");
          this.ready(function() {
            f.forEach(function(a) {
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
          for (var e = a[d], f = !1, h = 0;h < c.length;h++) {
            if (c[h] === e) {
              f = !0;
              break;
            }
          }
          f || b.push(e);
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
        B(d, "Video is not ready. (Video.js)");
      }
    };
    a.prototype.duration = function() {
      var a = this;
      if (Infinity === this.el_.duration && ua && Na && 0 === this.el_.currentTime) {
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
        }, e = function() {
          this.one("webkitendfullscreen", c);
          this.trigger("fullscreenchange", {isFullscreen:!0});
        };
        this.on("webkitbeginfullscreen", e);
        this.on("dispose", function() {
          a.off("webkitbeginfullscreen", e);
          a.off("webkitendfullscreen", c);
        });
      }
    };
    a.prototype.supportsFullScreen = function() {
      if ("function" === typeof this.el_.webkitEnterFullScreen) {
        var a = p.navigator && p.navigator.userAgent || "";
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
    a.prototype.addTextTrack = function(a, d, e) {
      return this.featuresNativeTextTracks ? this.el_.addTextTrack(a, d, e) : c.prototype.addTextTrack.call(this, a, d, e);
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
        for (var b = this.$$("track"), e = b.length;e--;) {
          a !== b[e] && a !== b[e].track || this.el().removeChild(b[e]);
        }
      }
    };
    return a;
  }(G);
  v.TEST_VID = w.createElement("video");
  var Va = w.createElement("track");
  Va.kind = "captions";
  Va.srclang = "en";
  Va.label = "English";
  v.TEST_VID.appendChild(Va);
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
    if (ua && Na) {
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
    return hc;
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
  v.prototype.movingMediaElementInDOM = !La;
  v.prototype.featuresFullscreenResize = !0;
  v.prototype.featuresProgressEvents = !0;
  v.prototype.featuresTimeupdateEvents = !0;
  v.prototype.featuresNativeTextTracks = v.supportsNativeTextTracks();
  v.prototype.featuresNativeVideoTracks = v.supportsNativeVideoTracks();
  v.prototype.featuresNativeAudioTracks = v.supportsNativeAudioTracks();
  var ma, Rd = /^application\/(?:x-|vnd\.apple\.)mpegurl/i, Sd = /^video\/mp4/i;
  v.patchCanPlayType = function() {
    4 <= Ma && !fc && (ma || (ma = v.TEST_VID.constructor.prototype.canPlayType), v.TEST_VID.constructor.prototype.canPlayType = function(c) {
      return c && Rd.test(c) ? "maybe" : ma.call(this, c);
    });
    dc && (ma || (ma = v.TEST_VID.constructor.prototype.canPlayType), v.TEST_VID.constructor.prototype.canPlayType = function(c) {
      return c && Sd.test(c) ? "maybe" : ma.call(this, c);
    });
  };
  v.unpatchCanPlayType = function() {
    var c = v.TEST_VID.constructor.prototype.canPlayType;
    v.TEST_VID.constructor.prototype.canPlayType = ma;
    ma = null;
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
    v.prototype["set" + N(c)] = function(a) {
      this.el_[c] = a;
    };
  });
  ["pause", "load"].forEach(function(c) {
    v.prototype[c] = function() {
      return this.el_[c]();
    };
  });
  G.withSourceHandlers(v);
  v.nativeSourceHandler = {};
  v.nativeSourceHandler.canPlayType = function(c) {
    try {
      return v.TEST_VID.canPlayType(c);
    } catch (a) {
      return "";
    }
  };
  v.nativeSourceHandler.canHandleSource = function(c, a) {
    return c.type ? v.nativeSourceHandler.canPlayType(c.type) : c.src ? (c = qc(c.src), v.nativeSourceHandler.canPlayType("video/" + c)) : "";
  };
  v.nativeSourceHandler.handleSource = function(c, a, b) {
    a.setSrc(c.src);
  };
  v.nativeSourceHandler.dispose = function() {
  };
  v.registerSourceHandler(v.nativeSourceHandler);
  n.registerComponent("Html5", v);
  G.registerTech("Html5", v);
  var Xc = "progress abort suspend emptied stalled loadedmetadata loadeddata timeupdate ratechange volumechange texttrackchange".split(" "), ca = function(c) {
    function a(b, d, e) {
      b.id = b.id || "vjs_video_" + qa++;
      d = y(a.getTagSettings(b), d);
      d.initChildren = !1;
      d.createEl = !1;
      d.reportTouchActivity = !1;
      if (!d.language) {
        if ("function" === typeof b.closest) {
          var g = b.closest("[lang]");
          g && (d.language = g.getAttribute("lang"));
        } else {
          for (g = b;g && 1 === g.nodeType;) {
            if (ja(g).hasOwnProperty("lang")) {
              d.language = g.getAttribute("lang");
              break;
            }
            g = g.parentNode;
          }
        }
      }
      e = c.call(this, null, d, e) || this;
      if (!e.options_ || !e.options_.techOrder || !e.options_.techOrder.length) {
        throw Error("No techOrder specified. Did you overwrite videojs.options instead of just changing the properties you want to override?");
      }
      e.tag = b;
      e.tagAttributes = b && ja(b);
      e.language(e.options_.language);
      if (d.languages) {
        var f = {};
        Object.getOwnPropertyNames(d.languages).forEach(function(a) {
          f[a.toLowerCase()] = d.languages[a];
        });
        e.languages_ = f;
      } else {
        e.languages_ = a.prototype.options_.languages;
      }
      e.cache_ = {};
      e.poster_ = d.poster || "";
      e.controls_ = !!d.controls;
      b.controls = !1;
      e.scrubbing_ = !1;
      e.el_ = e.createEl();
      g = O(e.options_);
      if (d.plugins) {
        var h = d.plugins;
        Object.getOwnPropertyNames(h).forEach(function(a) {
          if ("function" === typeof this[a]) {
            this[a](h[a]);
          } else {
            B.error("Unable to find plugin:", a);
          }
        }, e);
      }
      e.options_.playerOptions = g;
      e.initChildren();
      e.isAudio("audio" === b.nodeName.toLowerCase());
      e.controls() ? e.addClass("vjs-controls-enabled") : e.addClass("vjs-controls-disabled");
      e.el_.setAttribute("role", "region");
      e.isAudio() ? e.el_.setAttribute("aria-label", "audio player") : e.el_.setAttribute("aria-label", "video player");
      e.isAudio() && e.addClass("vjs-audio");
      e.flexNotSupported_() && e.addClass("vjs-no-flex");
      La || e.addClass("vjs-workinghover");
      a.players[e.id_] = e;
      e.userActive(!0);
      e.reportUserActivity();
      e.listenForUserActivity_();
      e.on("fullscreenchange", e.handleFullscreenChange_);
      e.on("stageclick", e.handleStageClick_);
      return e;
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
      var e = ja(d);
      Object.getOwnPropertyNames(e).forEach(function(b) {
        "class" === b ? a.className = e[b] : a.setAttribute(b, e[b]);
      });
      d.playerId = d.id;
      d.id += "_html5_api";
      d.className = "vjs-tech";
      d.player = a.player = this;
      this.addClass("vjs-paused");
      if (!0 !== p.VIDEOJS_NO_DYNAMIC_STYLE) {
        this.styleEl_ = kc("vjs-styles-dimensions");
        var f = Da(".vjs-styles-defaults"), h = Da("head");
        h.insertBefore(this.styleEl_, f ? f.nextSibling : h.firstChild);
      }
      this.width(this.options_.width);
      this.height(this.options_.height);
      this.fluid(this.options_.fluid);
      this.aspectRatio(this.options_.aspectRatio);
      f = d.getElementsByTagName("a");
      for (h = 0;h < f.length;h++) {
        var k = f.item(h);
        F(k, "vjs-hidden");
        k.setAttribute("hidden", "hidden");
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
          return B.error('Improper value "' + c + '" supplied for for ' + a), this;
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
      if (!0 === p.VIDEOJS_NO_DYNAMIC_STYLE) {
        var a = "number" === typeof this.width_ ? this.width_ : this.options_.width, c = "number" === typeof this.height_ ? this.height_ : this.options_.height, e = this.tech_ && this.tech_.el();
        e && (0 <= a && (e.width = a), 0 <= c && (e.height = c));
      } else {
        var a = (void 0 !== this.aspectRatio_ && "auto" !== this.aspectRatio_ ? this.aspectRatio_ : 0 < this.videoWidth() ? this.videoWidth() + ":" + this.videoHeight() : "16:9").split(":"), f = a[1] / a[0], a = void 0 !== this.width_ ? this.width_ : void 0 !== this.height_ ? this.height_ / f : this.videoWidth() || 300, c = void 0 !== this.height_ ? this.height_ : a * f, e = /^[^a-zA-Z]/.test(this.id()) ? "dimensions-" + this.id() : this.id() + "-dimensions";
        this.addClass(e);
        lc(this.styleEl_, "\n      ." + e + " {\n        width: " + a + "px;\n        height: " + c + "px;\n      }\n\n      ." + e + ".vjs-fluid {\n        padding-top: " + 100 * f + "%;\n      }\n    ");
      }
    };
    a.prototype.loadTech_ = function(a, c) {
      var b = this;
      this.tech_ && this.unloadTech_();
      "Html5" !== a && this.tag && (G.getTech("Html5").disposeMediaElement(this.tag), this.tag = this.tag.player = null);
      this.techName_ = a;
      this.isReady_ = !1;
      var d = y({source:c, nativeControlsForTouch:this.options_.nativeControlsForTouch, playerId:this.id(), techId:this.id() + "_" + a + "_api", videoTracks:this.videoTracks_, textTracks:this.textTracks_, audioTracks:this.audioTracks_, autoplay:this.options_.autoplay, preload:this.options_.preload, loop:this.options_.loop, muted:this.options_.muted, poster:this.poster(), language:this.language(), "vtt.js":this.options_["vtt.js"]}, this.options_[a.toLowerCase()]);
      this.tag && (d.tag = this.tag);
      c && (this.currentType_ = c.type, c.src === this.cache_.src && 0 < this.cache_.currentTime && (d.startTime = this.cache_.currentTime), this.cache_.sources = null, this.cache_.source = c, this.cache_.src = c.src);
      (c = G.getTech(a)) || (c = n.getComponent(a));
      this.tech_ = new c(d);
      this.tech_.ready(x(this, this.handleTechReady_), !0);
      mc.jsonToTextTracks(this.textTracksJson_ || [], this.tech_);
      Xc.forEach(function(a) {
        b.on(b.tech_, a, b["handleTech" + N(a) + "_"]);
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
      this.textTracksJson_ = mc.textTracksToJson(this.tech_);
      this.isReady_ = !1;
      this.tech_.dispose();
      this.tech_ = !1;
    };
    a.prototype.tech = function(a) {
      if (a && a.IWillNotUseThisInPlugins) {
        return this.tech_;
      }
      p.alert("\n      Please make sure that you are not using this inside of a plugin.\n      To disable this alert and error, please pass in an object with\n      `IWillNotUseThisInPlugins` to the `tech` method. See\n      https://github.com/videojs/video.js/issues/2617 for more info.\n    ");
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
          B("deleting tag.poster throws in some browsers", b);
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
        } catch (g) {
          throw B(g), g;
        }
      }
    };
    a.prototype.techGet_ = function(a) {
      if (this.tech_ && this.tech_.isReady_) {
        try {
          return this.tech_[a]();
        } catch (d) {
          throw void 0 === this.tech_[a] ? B("Video.js: " + a + " method not defined for " + this.techName_ + " playback technology.", d) : "TypeError" === d.name ? (B("Video.js: " + a + " unavailable on " + this.techName_ + " playback technology element.", d), this.tech_.isReady_ = !1) : B(d), d;
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
      return Sb(this.buffered(), this.duration());
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
      la.requestFullscreen ? (Z(w, la.fullscreenchange, x(this, function d(a) {
        this.isFullscreen(w[la.fullscreenElement]);
        !1 === this.isFullscreen() && ea(w, la.fullscreenchange, d);
        this.trigger("fullscreenchange");
      })), this.el_[la.requestFullscreen]()) : this.tech_.supportsFullScreen() ? this.techCall_("enterFullScreen") : (this.enterFullWindow(), this.trigger("fullscreenchange"));
      return this;
    };
    a.prototype.exitFullscreen = function() {
      this.isFullscreen(!1);
      if (la.requestFullscreen) {
        w[la.exitFullscreen]();
      } else {
        this.tech_.supportsFullScreen() ? this.techCall_("exitFullScreen") : (this.exitFullWindow(), this.trigger("fullscreenchange"));
      }
      return this;
    };
    a.prototype.enterFullWindow = function() {
      this.isFullWindow = !0;
      this.docOrigOverflow = w.documentElement.style.overflow;
      Z(w, "keydown", x(this, this.fullWindowOnEscKey));
      w.documentElement.style.overflow = "hidden";
      F(w.body, "vjs-full-window");
      this.trigger("enterFullWindow");
    };
    a.prototype.fullWindowOnEscKey = function(a) {
      27 === a.keyCode && (!0 === this.isFullscreen() ? this.exitFullscreen() : this.exitFullWindow());
    };
    a.prototype.exitFullWindow = function() {
      this.isFullWindow = !1;
      ea(w, "keydown", this.fullWindowOnEscKey);
      w.documentElement.style.overflow = this.docOrigOverflow;
      Aa(w.body, "vjs-full-window");
      this.trigger("exitFullWindow");
    };
    a.prototype.canPlayType = function(a) {
      for (var b, c = 0, e = this.options_.techOrder;c < e.length;c++) {
        b = N(e[c]);
        var f = G.getTech(b);
        f || (f = n.getComponent(b));
        if (!f) {
          B.error('The "' + b + '" tech is undefined. Skipped browser support check for that tech.');
        } else {
          if (f.isSupported() && (b = f.canPlayType(a))) {
            return b;
          }
        }
      }
      return "";
    };
    a.prototype.selectSource = function(a) {
      var b = this, c = this.options_.techOrder.map(N).map(function(a) {
        return [a, G.getTech(a) || n.getComponent(a)];
      }).filter(function(a) {
        var b = a[0];
        if (a = a[1]) {
          return a.isSupported();
        }
        B.error('The "' + b + '" tech is undefined. Skipped browser support check for that tech.');
        return !1;
      }), e = function(a, b, c) {
        var d;
        a.some(function(a) {
          return b.some(function(b) {
            if (d = c(a, b)) {
              return !0;
            }
          });
        });
        return d;
      }, f = function(a) {
        return function(b, c) {
          return a(c, b);
        };
      }, h = function(a, c) {
        var d = a[0];
        if (a[1].canPlaySource(c, b.options_[d.toLowerCase()])) {
          return {source:c, tech:d};
        }
      };
      return (this.options_.sourceOrder ? e(a, c, f(h)) : e(c, a, h)) || !1;
    };
    a.prototype.src = function(a) {
      if (void 0 === a) {
        return this.techGet_("src");
      }
      var b = G.getTech(this.techName_);
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
      this.loadTech_(N(this.options_.techOrder[0]), null);
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
      this.error_ = new R(a);
      this.addClass("vjs-error");
      B.error("(CODE:" + this.error_.code + " " + R.errorTypes[this.error_.code] + ")", this.error_.message, this.error_);
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
      var a, c, e, f = x(this, this.reportUserActivity);
      this.on("mousedown", function() {
        f();
        this.clearInterval(a);
        a = this.setInterval(f, 250);
      });
      this.on("mousemove", function(a) {
        if (a.screenX !== c || a.screenY !== e) {
          c = a.screenX, e = a.screenY, f();
        }
      });
      this.on("mouseup", function(b) {
        f();
        this.clearInterval(a);
      });
      this.on("keydown", f);
      this.on("keyup", f);
      var h;
      this.setInterval(function() {
        if (this.userActivity_) {
          this.userActivity_ = !1;
          this.userActive(!0);
          this.clearTimeout(h);
          var a = this.options_.inactivityTimeout;
          0 < a && (h = this.setTimeout(function() {
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
      return this.tech_ ? this.tech_.videoTracks() : this.videoTracks_ = this.videoTracks_ || new vc;
    };
    a.prototype.audioTracks = function() {
      return this.tech_ ? this.tech_.audioTracks() : this.audioTracks_ = this.audioTracks_ || new wc;
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
    a.prototype.addTextTrack = function(a, c, e) {
      if (this.tech_) {
        return this.tech_.addTextTrack(a, c, e);
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
      return O(a.prototype.options_.languages, this.languages_);
    };
    a.prototype.toJSON = function() {
      var a = O(this.options_), c = a.tracks;
      a.tracks = [];
      for (var e = 0;e < c.length;e++) {
        var f = c[e], f = O(f);
        f.player = void 0;
        a.tracks[e] = f;
      }
      return a;
    };
    a.prototype.createModal = function(a, c) {
      var b = this;
      c = c || {};
      c.content = a || "";
      var d = new Ea(this, c);
      this.addChild(d);
      d.on("dispose", function() {
        b.removeChild(d);
      });
      return d.open();
    };
    a.getTagSettings = function(a) {
      var b = {sources:[], tracks:[]}, c = ja(a), e = c["data-setup"];
      U(a, "vjs-fluid") && (c.fluid = !0);
      if (null !== e) {
        var f, h = null;
        try {
          f = JSON.parse(e || "{}", void 0);
        } catch (Qb) {
          h = Qb;
        }
        f = [h, f];
        e = f[0];
        f = f[1];
        e && B.error(e);
        y(c, f);
      }
      y(b, c);
      if (a.hasChildNodes()) {
        for (a = a.childNodes, c = 0, e = a.length;c < e;c++) {
          f = a[c], h = f.nodeName.toLowerCase(), "source" === h ? b.sources.push(ja(f)) : "track" === h && b.tracks.push(ja(f));
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
  ca.players = {};
  var Ha = p.navigator;
  ca.prototype.options_ = {techOrder:["html5", "flash"], html5:{}, flash:{}, defaultVolume:0, inactivityTimeout:2E3, playbackRates:[], children:"mediaLoader posterImage textTrackDisplay loadingSpinner bigPlayButton controlBar errorDisplay textTrackSettings".split(" "), language:Ha && (Ha.languages && Ha.languages[0] || Ha.userLanguage || Ha.language) || "en", languages:{}, notSupportedMessage:"No compatible source was found for this media."};
  ["ended", "seeking", "seekable", "networkState", "readyState"].forEach(function(c) {
    ca.prototype[c] = function() {
      return this.techGet_(c);
    };
  });
  Xc.forEach(function(c) {
    ca.prototype["handleTech" + N(c) + "_"] = function() {
      return this.trigger(c);
    };
  });
  n.registerComponent("Player", ca);
  var Td = function(c) {
    function a(b) {
      void 0 === b && (b = {});
      b = O(b, {kind:pd[b.kind] || ""});
      var d = c.call(this, b) || this, e = !1;
      if (S) {
        for (var f in a.prototype) {
          "constructor" !== f && (d[f] = a.prototype[f]);
        }
      }
      Object.defineProperty(d, "enabled", {get:function() {
        return e;
      }, set:function(a) {
        "boolean" === typeof a && a !== e && (e = a, this.trigger("enabledchange"));
      }});
      b.enabled && (d.enabled = b.enabled);
      d.loaded_ = !0;
      return d;
    }
    __extends(a, c);
    return a;
  }(nb), Ud = function(c) {
    function a(b) {
      void 0 === b && (b = {});
      b = O(b, {kind:od[b.kind] || ""});
      var d = c.call(this, b) || this, e = !1;
      if (S) {
        for (var f in a.prototype) {
          "constructor" !== f && (d[f] = a.prototype[f]);
        }
      }
      Object.defineProperty(d, "selected", {get:function() {
        return e;
      }, set:function(a) {
        "boolean" === typeof a && a !== e && (e = a, this.trigger("selectedchange"));
      }});
      b.selected && (d.selected = b.selected);
      return d;
    }
    __extends(a, c);
    return a;
  }(nb), Vd = function(c, a) {
    if ("function" !== typeof a && null !== a) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof a);
    }
    c.prototype = Object.create(a && a.prototype, {constructor:{value:c, enumerable:!1, writable:!0, configurable:!0}});
    a && (c.super_ = a);
  };
  "undefined" === typeof HTMLVideoElement && p.document && p.document.createElement && (w.createElement("video"), w.createElement("audio"), w.createElement("track"));
  q.hooks_ = {};
  q.hooks = function(c, a) {
    q.hooks_[c] = q.hooks_[c] || [];
    a && (q.hooks_[c] = q.hooks_[c].concat(a));
    return q.hooks_[c];
  };
  q.hook = function(c, a) {
    q.hooks(c, a);
  };
  q.removeHook = function(c, a) {
    a = q.hooks(c).indexOf(a);
    if (-1 >= a) {
      return !1;
    }
    q.hooks_[c] = q.hooks_[c].slice();
    q.hooks_[c].splice(a, 1);
    return !0;
  };
  if (!0 !== p.VIDEOJS_NO_DYNAMIC_STYLE) {
    var Wa = Da(".vjs-styles-defaults");
    if (!Wa) {
      var Wa = kc("vjs-styles-defaults"), Ib = Da("head");
      Ib && Ib.insertBefore(Wa, Ib.firstChild);
      lc(Wa, "\n      .video-js {\n        width: 300px;\n        height: 150px;\n      }\n\n      .vjs-fluid {\n        padding-top: 56.25%\n      }\n    ");
    }
  }
  q && (jc = q);
  setTimeout(lb, 1);
  q.VERSION = "5.14.0";
  q.options = ca.prototype.options_;
  q.getPlayers = function() {
    return ca.players;
  };
  q.players = ca.players;
  q.getComponent = n.getComponent;
  q.registerComponent = function(c, a) {
    G.isTech(a) && B.warn("The " + c + " tech was registered as a component. It should instead be registered using videojs.registerTech(name, tech)");
    n.registerComponent.call(n, c, a);
  };
  q.getTech = G.getTech;
  q.registerTech = G.registerTech;
  q.browser = kd;
  q.TOUCH_ENABLED = Oa;
  q.extend = function(c, a) {
    void 0 === a && (a = {});
    var b = function() {
      c.apply(this, arguments);
    }, d = {};
    W(a) ? ("function" === typeof a.init && (B.warn("Constructor logic via init() is deprecated; please use constructor() instead."), a.constructor = a.init), a.constructor !== Object.prototype.constructor && (b = a.constructor), d = a) : "function" === typeof a && (b = a);
    Vd(b, c);
    for (var e in d) {
      d.hasOwnProperty(e) && (b.prototype[e] = d[e]);
    }
    return b;
  };
  q.mergeOptions = O;
  q.bind = x;
  q.plugin = function(c, a) {
    ca.prototype[c] = a;
  };
  q.addLanguage = function(c, a) {
    c = ("" + c).toLowerCase();
    q.options.languages = O(q.options.languages, (b = {}, b[c] = a, b));
    return q.options.languages[c];
    var b;
  };
  q.log = B;
  q.createTimeRange = q.createTimeRanges = fa;
  q.formatTime = ka;
  q.parseUrl = pc;
  q.isCrossOrigin = ob;
  q.EventTarget = T;
  q.on = Z;
  q.one = Ca;
  q.off = ea;
  q.trigger = Ia;
  q.xhr = ga;
  q.TextTrack = Ra;
  q.AudioTrack = Td;
  q.VideoTrack = Ud;
  q.isEl = z;
  q.isTextNode = Lb;
  q.createEl = h;
  q.hasClass = U;
  q.addClass = F;
  q.removeClass = Aa;
  q.toggleClass = Jb;
  q.setAttributes = Za;
  q.getAttributes = ja;
  q.emptyEl = $a;
  q.appendContent = ab;
  q.insertContent = Ob;
  q.computedStyle = ta;
  "function" === typeof define && define.amd ? define("videojs", [], function() {
    return q;
  }) : "object" === typeof exports && "object" === typeof module && (module.exports = q);
  return q;
}();

