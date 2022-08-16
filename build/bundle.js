var app = (function () {
  "use strict";
  function e() {}
  const t = (e) => e;
  function n(e, t) {
    for (const n in t) e[n] = t[n];
    return e;
  }
  function o(e) {
    return e();
  }
  function r() {
    return Object.create(null);
  }
  function i(e) {
    e.forEach(o);
  }
  function l(e) {
    return "function" == typeof e;
  }
  function s(e, t) {
    return e != e
      ? t == t
      : e !== t || (e && "object" == typeof e) || "function" == typeof e;
  }
  let a;
  function c(e, t) {
    return a || (a = document.createElement("a")), (a.href = t), e === a.href;
  }
  function d(e, t, n, o) {
    if (e) {
      const r = u(e, t, n, o);
      return e[0](r);
    }
  }
  function u(e, t, o, r) {
    return e[1] && r ? n(o.ctx.slice(), e[1](r(t))) : o.ctx;
  }
  function p(e, t, n, o) {
    if (e[2] && o) {
      const r = e[2](o(n));
      if (void 0 === t.dirty) return r;
      if ("object" == typeof r) {
        const e = [],
          n = Math.max(t.dirty.length, r.length);
        for (let o = 0; o < n; o += 1) e[o] = t.dirty[o] | r[o];
        return e;
      }
      return t.dirty | r;
    }
    return t.dirty;
  }
  function f(e, t, n, o, r, i) {
    if (r) {
      const l = u(t, n, o, i);
      e.p(l, r);
    }
  }
  function m(e) {
    if (e.ctx.length > 32) {
      const t = [],
        n = e.ctx.length / 32;
      for (let e = 0; e < n; e++) t[e] = -1;
      return t;
    }
    return -1;
  }
  function g(e) {
    const t = {};
    for (const n in e) "$" !== n[0] && (t[n] = e[n]);
    return t;
  }
  function b(e, t) {
    const n = {};
    t = new Set(t);
    for (const o in e) t.has(o) || "$" === o[0] || (n[o] = e[o]);
    return n;
  }
  function h(e) {
    return null == e ? "" : e;
  }
  function $(t) {
    return t && l(t.destroy) ? t.destroy : e;
  }
  const x = "undefined" != typeof window;
  let y = x ? () => window.performance.now() : () => Date.now(),
    v = x ? (e) => requestAnimationFrame(e) : e;
  const w = new Set();
  function k(e) {
    w.forEach((t) => {
      t.c(e) || (w.delete(t), t.f());
    }),
      0 !== w.size && v(k);
  }
  function S(e, t) {
    e.appendChild(t);
  }
  function z(e) {
    if (!e) return document;
    const t = e.getRootNode ? e.getRootNode() : e.ownerDocument;
    return t && t.host ? t : e.ownerDocument;
  }
  function _(e) {
    const t = T("style");
    return (
      (function (e, t) {
        S(e.head || e, t);
      })(z(e), t),
      t.sheet
    );
  }
  function I(e, t, n) {
    e.insertBefore(t, n || null);
  }
  function j(e) {
    e.parentNode.removeChild(e);
  }
  function B(e, t) {
    for (let n = 0; n < e.length; n += 1) e[n] && e[n].d(t);
  }
  function T(e) {
    return document.createElement(e);
  }
  function C(e) {
    return document.createTextNode(e);
  }
  function M() {
    return C(" ");
  }
  function R() {
    return C("");
  }
  function W(e, t, n, o) {
    return e.addEventListener(t, n, o), () => e.removeEventListener(t, n, o);
  }
  function H(e, t, n) {
    null == n
      ? e.removeAttribute(t)
      : e.getAttribute(t) !== n && e.setAttribute(t, n);
  }
  function A(e, t) {
    const n = Object.getOwnPropertyDescriptors(e.__proto__);
    for (const o in t)
      null == t[o]
        ? e.removeAttribute(o)
        : "style" === o
        ? (e.style.cssText = t[o])
        : "__value" === o
        ? (e.value = e[o] = t[o])
        : n[o] && n[o].set
        ? (e[o] = t[o])
        : H(e, o, t[o]);
  }
  function E(e, t) {
    (t = "" + t), e.wholeText !== t && (e.data = t);
  }
  function L(e, t, n, o) {
    null === n
      ? e.style.removeProperty(t)
      : e.style.setProperty(t, n, o ? "important" : "");
  }
  function O(e, t, { bubbles: n = !1, cancelable: o = !1 } = {}) {
    const r = document.createEvent("CustomEvent");
    return r.initCustomEvent(e, n, o, t), r;
  }
  const P = new Map();
  let N,
    D = 0;
  function V(e, t, n, o, r, i, l, s = 0) {
    const a = 16.666 / o;
    let c = "{\n";
    for (let e = 0; e <= 1; e += a) {
      const o = t + (n - t) * i(e);
      c += 100 * e + `%{${l(o, 1 - o)}}\n`;
    }
    const d = c + `100% {${l(n, 1 - n)}}\n}`,
      u = `__svelte_${(function (e) {
        let t = 5381,
          n = e.length;
        for (; n--; ) t = ((t << 5) - t) ^ e.charCodeAt(n);
        return t >>> 0;
      })(d)}_${s}`,
      p = z(e),
      { stylesheet: f, rules: m } =
        P.get(p) ||
        (function (e, t) {
          const n = { stylesheet: _(t), rules: {} };
          return P.set(e, n), n;
        })(p, e);
    m[u] ||
      ((m[u] = !0), f.insertRule(`@keyframes ${u} ${d}`, f.cssRules.length));
    const g = e.style.animation || "";
    return (
      (e.style.animation = `${
        g ? `${g}, ` : ""
      }${u} ${o}ms linear ${r}ms 1 both`),
      (D += 1),
      u
    );
  }
  function F(e, t) {
    const n = (e.style.animation || "").split(", "),
      o = n.filter(
        t ? (e) => e.indexOf(t) < 0 : (e) => -1 === e.indexOf("__svelte")
      ),
      r = n.length - o.length;
    r &&
      ((e.style.animation = o.join(", ")),
      (D -= r),
      D ||
        v(() => {
          D ||
            (P.forEach((e) => {
              const { stylesheet: t } = e;
              let n = t.cssRules.length;
              for (; n--; ) t.deleteRule(n);
              e.rules = {};
            }),
            P.clear());
        }));
  }
  function Y(e) {
    N = e;
  }
  function q() {
    if (!N) throw new Error("Function called outside component initialization");
    return N;
  }
  function G(e) {
    q().$$.on_mount.push(e);
  }
  const X = [],
    J = [],
    U = [],
    Q = [],
    K = Promise.resolve();
  let Z = !1;
  function ee() {
    Z || ((Z = !0), K.then(ie));
  }
  function te(e) {
    U.push(e);
  }
  const ne = new Set();
  let oe,
    re = 0;
  function ie() {
    const e = N;
    do {
      for (; re < X.length; ) {
        const e = X[re];
        re++, Y(e), le(e.$$);
      }
      for (Y(null), X.length = 0, re = 0; J.length; ) J.pop()();
      for (let e = 0; e < U.length; e += 1) {
        const t = U[e];
        ne.has(t) || (ne.add(t), t());
      }
      U.length = 0;
    } while (X.length);
    for (; Q.length; ) Q.pop()();
    (Z = !1), ne.clear(), Y(e);
  }
  function le(e) {
    if (null !== e.fragment) {
      e.update(), i(e.before_update);
      const t = e.dirty;
      (e.dirty = [-1]),
        e.fragment && e.fragment.p(e.ctx, t),
        e.after_update.forEach(te);
    }
  }
  function se(e, t, n) {
    e.dispatchEvent(O(`${t ? "intro" : "outro"}${n}`));
  }
  const ae = new Set();
  let ce;
  function de() {
    ce = { r: 0, c: [], p: ce };
  }
  function ue() {
    ce.r || i(ce.c), (ce = ce.p);
  }
  function pe(e, t) {
    e && e.i && (ae.delete(e), e.i(t));
  }
  function fe(e, t, n, o) {
    if (e && e.o) {
      if (ae.has(e)) return;
      ae.add(e),
        ce.c.push(() => {
          ae.delete(e), o && (n && e.d(1), o());
        }),
        e.o(t);
    } else o && o();
  }
  const me = { duration: 0 };
  function ge(n, o, r, s) {
    let a = o(n, r),
      c = s ? 0 : 1,
      d = null,
      u = null,
      p = null;
    function f() {
      p && F(n, p);
    }
    function m(e, t) {
      const n = e.b - c;
      return (
        (t *= Math.abs(n)),
        {
          a: c,
          b: e.b,
          d: n,
          duration: t,
          start: e.start,
          end: e.start + t,
          group: e.group,
        }
      );
    }
    function g(o) {
      const {
          delay: r = 0,
          duration: l = 300,
          easing: s = t,
          tick: g = e,
          css: b,
        } = a || me,
        h = { start: y() + r, b: o };
      o || ((h.group = ce), (ce.r += 1)),
        d || u
          ? (u = h)
          : (b && (f(), (p = V(n, c, o, l, r, s, b))),
            o && g(0, 1),
            (d = m(h, l)),
            te(() => se(n, o, "start")),
            (function (e) {
              let t;
              0 === w.size && v(k),
                new Promise((n) => {
                  w.add((t = { c: e, f: n }));
                });
            })((e) => {
              if (
                (u &&
                  e > u.start &&
                  ((d = m(u, l)),
                  (u = null),
                  se(n, d.b, "start"),
                  b && (f(), (p = V(n, c, d.b, d.duration, 0, s, a.css)))),
                d)
              )
                if (e >= d.end)
                  g((c = d.b), 1 - c),
                    se(n, d.b, "end"),
                    u || (d.b ? f() : --d.group.r || i(d.group.c)),
                    (d = null);
                else if (e >= d.start) {
                  const t = e - d.start;
                  (c = d.a + d.d * s(t / d.duration)), g(c, 1 - c);
                }
              return !(!d && !u);
            }));
    }
    return {
      run(e) {
        l(a)
          ? (oe ||
              ((oe = Promise.resolve()),
              oe.then(() => {
                oe = null;
              })),
            oe).then(() => {
              (a = a()), g(e);
            })
          : g(e);
      },
      end() {
        f(), (d = u = null);
      },
    };
  }
  const be =
    "undefined" != typeof window
      ? window
      : "undefined" != typeof globalThis
      ? globalThis
      : global;
  function he(e, t) {
    const n = {},
      o = {},
      r = { $$scope: 1 };
    let i = e.length;
    for (; i--; ) {
      const l = e[i],
        s = t[i];
      if (s) {
        for (const e in l) e in s || (o[e] = 1);
        for (const e in s) r[e] || ((n[e] = s[e]), (r[e] = 1));
        e[i] = s;
      } else for (const e in l) r[e] = 1;
    }
    for (const e in o) e in n || (n[e] = void 0);
    return n;
  }
  function $e(e) {
    return "object" == typeof e && null !== e ? e : {};
  }
  function xe(e) {
    e && e.c();
  }
  function ye(e, t, n, r) {
    const { fragment: s, on_mount: a, on_destroy: c, after_update: d } = e.$$;
    s && s.m(t, n),
      r ||
        te(() => {
          const t = a.map(o).filter(l);
          c ? c.push(...t) : i(t), (e.$$.on_mount = []);
        }),
      d.forEach(te);
  }
  function ve(e, t) {
    const n = e.$$;
    null !== n.fragment &&
      (i(n.on_destroy),
      n.fragment && n.fragment.d(t),
      (n.on_destroy = n.fragment = null),
      (n.ctx = []));
  }
  function we(t, n, o, l, s, a, c, d = [-1]) {
    const u = N;
    Y(t);
    const p = (t.$$ = {
      fragment: null,
      ctx: null,
      props: a,
      update: e,
      not_equal: s,
      bound: r(),
      on_mount: [],
      on_destroy: [],
      on_disconnect: [],
      before_update: [],
      after_update: [],
      context: new Map(n.context || (u ? u.$$.context : [])),
      callbacks: r(),
      dirty: d,
      skip_bound: !1,
      root: n.target || u.$$.root,
    });
    c && c(p.root);
    let f = !1;
    if (
      ((p.ctx = o
        ? o(t, n.props || {}, (e, n, ...o) => {
            const r = o.length ? o[0] : n;
            return (
              p.ctx &&
                s(p.ctx[e], (p.ctx[e] = r)) &&
                (!p.skip_bound && p.bound[e] && p.bound[e](r),
                f &&
                  (function (e, t) {
                    -1 === e.$$.dirty[0] &&
                      (X.push(e), ee(), e.$$.dirty.fill(0)),
                      (e.$$.dirty[(t / 31) | 0] |= 1 << t % 31);
                  })(t, e)),
              n
            );
          })
        : []),
      p.update(),
      (f = !0),
      i(p.before_update),
      (p.fragment = !!l && l(p.ctx)),
      n.target)
    ) {
      if (n.hydrate) {
        const e = (function (e) {
          return Array.from(e.childNodes);
        })(n.target);
        p.fragment && p.fragment.l(e), e.forEach(j);
      } else p.fragment && p.fragment.c();
      n.intro && pe(t.$$.fragment),
        ye(t, n.target, n.anchor, n.customElement),
        ie();
    }
    Y(u);
  }
  class ke {
    $destroy() {
      ve(this, 1), (this.$destroy = e);
    }
    $on(e, t) {
      const n = this.$$.callbacks[e] || (this.$$.callbacks[e] = []);
      return (
        n.push(t),
        () => {
          const e = n.indexOf(t);
          -1 !== e && n.splice(e, 1);
        }
      );
    }
    $set(e) {
      var t;
      this.$$set &&
        ((t = e), 0 !== Object.keys(t).length) &&
        ((this.$$.skip_bound = !0), this.$$set(e), (this.$$.skip_bound = !1));
    }
  }
  function Se(t) {
    let n, o, r, i;
    return {
      c() {
        (n = T("span")),
          (o = C(t[2])),
          (r = T("span")),
          (i = C("|")),
          H(r, "class", "blinker svelte-1v28f7p"),
          L(r, "animation-duration", t[0] + "ms"),
          L(r, "animation-iteration-count", t[1]),
          H(n, "class", "typing-animated");
      },
      m(e, t) {
        I(e, n, t), S(n, o), S(n, r), S(r, i);
      },
      p(e, [t]) {
        4 & t && E(o, e[2]),
          1 & t && L(r, "animation-duration", e[0] + "ms"),
          2 & t && L(r, "animation-iteration-count", e[1]);
      },
      i: e,
      o: e,
      d(e) {
        e && j(n);
      },
    };
  }
  function ze(e, t, n) {
    let { texts: o = [] } = t,
      { delay: r = 60 } = t,
      { word_complete_delay: i = 1e3 } = t,
      { num_loops: l = 1 } = t,
      { repeat_n_words: s = 0 } = t,
      { blink_time: a = 1e3 } = t,
      { blinker_iter_count: c = "infinite" } = t,
      d = "";
    return (
      G(() => {
        (() => {
          let e = 100;
          for (let t = 0; t < l; t++)
            1 != l &&
              0 != s &&
              t === l - 1 &&
              (n(3, (o = o.slice(0, s))),
              n(3, (o[o.length - 1].direction = "type"), o)),
              o.forEach(({ direction: t, word: o }) => {
                for (let t = 0; t < o.length; t++)
                  setTimeout(() => {
                    n(2, (d += o[t]));
                  }, e),
                    (e += r);
                if ("type&delete" === t)
                  for (let t = 0; t < o.length; t++)
                    0 === t
                      ? (setTimeout(() => {
                          n(2, (d = d.substr(0, d.length - 1)));
                        }, e + i),
                        (e = e + r + i))
                      : (setTimeout(() => {
                          n(2, (d = d.substr(0, d.length - 1)));
                        }, e),
                        (e += r));
              });
        })();
      }),
      (e.$$set = (e) => {
        "texts" in e && n(3, (o = e.texts)),
          "delay" in e && n(4, (r = e.delay)),
          "word_complete_delay" in e && n(5, (i = e.word_complete_delay)),
          "num_loops" in e && n(6, (l = e.num_loops)),
          "repeat_n_words" in e && n(7, (s = e.repeat_n_words)),
          "blink_time" in e && n(0, (a = e.blink_time)),
          "blinker_iter_count" in e && n(1, (c = e.blinker_iter_count));
      }),
      [a, c, d, o, r, i, l, s]
    );
  }
  class _e extends ke {
    constructor(e) {
      super(),
        we(this, e, ze, Se, s, {
          texts: 3,
          delay: 4,
          word_complete_delay: 5,
          num_loops: 6,
          repeat_n_words: 7,
          blink_time: 0,
          blinker_iter_count: 1,
        });
    }
  }
  function Ie(e) {
    let t, n;
    return (
      (t = new _e({
        props: {
          texts: e[0],
          delay: e[1],
          num_loops: e[2],
          repeat_n_words: e[3],
          blinker_iter_count: e[4],
        },
      })),
      {
        c() {
          xe(t.$$.fragment);
        },
        m(e, o) {
          ye(t, e, o), (n = !0);
        },
        p(e, [n]) {
          const o = {};
          1 & n && (o.texts = e[0]),
            2 & n && (o.delay = e[1]),
            4 & n && (o.num_loops = e[2]),
            8 & n && (o.repeat_n_words = e[3]),
            16 & n && (o.blinker_iter_count = e[4]),
            t.$set(o);
        },
        i(e) {
          n || (pe(t.$$.fragment, e), (n = !0));
        },
        o(e) {
          fe(t.$$.fragment, e), (n = !1);
        },
        d(e) {
          ve(t, e);
        },
      }
    );
  }
  function je(e, t, n) {
    let {
      texts: o,
      delay: r,
      num_loops: i,
      repeat_n_words: l,
      blinker_iter_count: s,
    } = t;
    class a {
      constructor(e, t) {
        Object.assign(this, { word: e, direction: t });
      }
    }
    let c = [];
    return (
      o.forEach((e) => {
        c.push(new a(e, "type&delete"));
      }),
      (o = c),
      (e.$$set = (e) => {
        "texts" in e && n(0, (o = e.texts)),
          "delay" in e && n(1, (r = e.delay)),
          "num_loops" in e && n(2, (i = e.num_loops)),
          "repeat_n_words" in e && n(3, (l = e.repeat_n_words)),
          "blinker_iter_count" in e && n(4, (s = e.blinker_iter_count));
      }),
      [o, r, i, l, s]
    );
  }
  class Be extends ke {
    constructor(e) {
      super(),
        we(this, e, je, Ie, s, {
          texts: 0,
          delay: 1,
          num_loops: 2,
          repeat_n_words: 3,
          blinker_iter_count: 4,
        });
    }
  }
  function Te(e, t, n) {
    const o = e.slice();
    return (o[7] = t[n]), o;
  }
  function Ce(e) {
    let t,
      n,
      o = e[5],
      r = [];
    for (let t = 0; t < o.length; t += 1) r[t] = Pe(Te(e, o, t));
    const i = (e) =>
      fe(r[e], 1, 1, () => {
        r[e] = null;
      });
    return {
      c() {
        t = T("div");
        for (let e = 0; e < r.length; e += 1) r[e].c();
        H(t, "id", "title"),
          H(t, "class", "parallax-container svelte-1d59v6c"),
          L(t, "height", e[0] - e[4] + "px");
      },
      m(e, o) {
        I(e, t, o);
        for (let e = 0; e < r.length; e += 1) r[e].m(t, null);
        n = !0;
      },
      p(e, l) {
        if (59 & l) {
          let n;
          for (o = e[5], n = 0; n < o.length; n += 1) {
            const i = Te(e, o, n);
            r[n]
              ? (r[n].p(i, l), pe(r[n], 1))
              : ((r[n] = Pe(i)), r[n].c(), pe(r[n], 1), r[n].m(t, null));
          }
          for (de(), n = o.length; n < r.length; n += 1) i(n);
          ue();
        }
        (!n || 17 & l) && L(t, "height", e[0] - e[4] + "px");
      },
      i(e) {
        if (!n) {
          for (let e = 0; e < o.length; e += 1) pe(r[e]);
          n = !0;
        }
      },
      o(e) {
        r = r.filter(Boolean);
        for (let e = 0; e < r.length; e += 1) fe(r[e]);
        n = !1;
      },
      d(e) {
        e && j(t), B(r, e);
      },
    };
  }
  function Me(t) {
    let n, o;
    return {
      c() {
        (n = T("img")),
          L(
            n,
            "transform",
            "translate(0," + (-t[4] * (t[7] - 1)) / (t[5].length - 1) + "px)"
          ),
          c(n.src, (o = "images/intro/0" + (t[7] - 1) + ".png")) ||
            H(n, "src", o),
          H(n, "alt", "parallax layer " + (t[7] - 1)),
          H(n, "height", t[0]),
          H(n, "class", "svelte-1d59v6c");
      },
      m(e, t) {
        I(e, n, t);
      },
      p(e, t) {
        16 & t &&
          L(
            n,
            "transform",
            "translate(0," + (-e[4] * (e[7] - 1)) / (e[5].length - 1) + "px)"
          ),
          1 & t && H(n, "height", e[0]);
      },
      i: e,
      o: e,
      d(e) {
        e && j(n);
      },
    };
  }
  function Re(t) {
    let n, o;
    return {
      c() {
        (n = T("img")),
          L(n, "transform", "translate(0," + (10 - t[4]) + "px)"),
          c(n.src, (o = "images/intro/0" + (t[7] - 1) + ".png")) ||
            H(n, "src", o),
          H(n, "alt", "parallax layer " + (t[7] - 1)),
          H(n, "height", t[0]),
          H(n, "class", "svelte-1d59v6c");
      },
      m(e, t) {
        I(e, n, t);
      },
      p(e, t) {
        16 & t && L(n, "transform", "translate(0," + (10 - e[4]) + "px)"),
          1 & t && H(n, "height", e[0]);
      },
      i: e,
      o: e,
      d(e) {
        e && j(n);
      },
    };
  }
  function We(t) {
    let n, o;
    return {
      c() {
        (n = T("img")),
          L(
            n,
            "transform",
            "translate(0," + (-t[4] * (t[7] - 1)) / (t[5].length - 1) + "px)"
          ),
          c(n.src, (o = "images/intro/00" + (t[7] - 1) + ".png")) ||
            H(n, "src", o),
          H(n, "alt", "parallax layer " + (t[7] - 1)),
          H(n, "height", t[0]),
          H(n, "class", "svelte-1d59v6c");
      },
      m(e, t) {
        I(e, n, t);
      },
      p(e, t) {
        16 & t &&
          L(
            n,
            "transform",
            "translate(0," + (-e[4] * (e[7] - 1)) / (e[5].length - 1) + "px)"
          ),
          1 & t && H(n, "height", e[0]);
      },
      i: e,
      o: e,
      d(e) {
        e && j(n);
      },
    };
  }
  function He(e) {
    let t,
      n,
      o = e[4] < e[0] && Ee(e);
    return {
      c() {
        o && o.c(), (t = R());
      },
      m(e, r) {
        o && o.m(e, r), I(e, t, r), (n = !0);
      },
      p(e, n) {
        e[4] < e[0]
          ? o
            ? (o.p(e, n), 17 & n && pe(o, 1))
            : ((o = Ee(e)), o.c(), pe(o, 1), o.m(t.parentNode, t))
          : o &&
            (de(),
            fe(o, 1, 1, () => {
              o = null;
            }),
            ue());
      },
      i(e) {
        n || (pe(o), (n = !0));
      },
      o(e) {
        fe(o), (n = !1);
      },
      d(e) {
        o && o.d(e), e && j(t);
      },
    };
  }
  function Ae(t) {
    let n, o;
    return {
      c() {
        (n = T("img")),
          H(n, "id", "img-parallax-" + t[7]),
          L(
            n,
            "transform",
            "translate(0," + (-t[4] * t[7]) / (t[5].length - 1) + "px)"
          ),
          c(n.src, (o = "images/intro/00" + t[7] + ".png")) || H(n, "src", o),
          H(n, "alt", "parallax layer " + t[7]),
          H(n, "height", t[0]),
          H(n, "class", "svelte-1d59v6c");
      },
      m(e, t) {
        I(e, n, t);
      },
      p(e, t) {
        16 & t &&
          L(
            n,
            "transform",
            "translate(0," + (-e[4] * e[7]) / (e[5].length - 1) + "px)"
          ),
          1 & t && H(n, "height", e[0]);
      },
      i: e,
      o: e,
      d(e) {
        e && j(n);
      },
    };
  }
  function Ee(e) {
    let t,
      n,
      o,
      r,
      i,
      l,
      s,
      a,
      c,
      d,
      u,
      p,
      f,
      m,
      g,
      b,
      h,
      $,
      x = e[3].preamble + "",
      y = e[3].title + "",
      v = e[3].subtitle + "",
      w = e[3].description + "";
    const k = [Oe, Le],
      z = [];
    function _(e, t) {
      return e[1] ? 0 : 1;
    }
    return (
      (d = _(e)),
      (u = z[d] = k[d](e)),
      {
        c() {
          (t = T("div")),
            (n = T("div")),
            (o = C(x)),
            (r = M()),
            (i = T("div")),
            (l = C(y)),
            (s = M()),
            (a = T("div")),
            (c = C(v)),
            u.c(),
            (p = M()),
            (f = T("div")),
            (m = C(w)),
            (g = M()),
            (b = T("div")),
            (b.innerHTML = '<i class="fa-solid fa-angles-down"></i>'),
            (h = M()),
            H(n, "class", "textLayer-preamble svelte-1d59v6c"),
            H(i, "class", "textLayer-title"),
            H(a, "class", "textLayer-subtitle svelte-1d59v6c"),
            H(f, "class", "textLayer-description svelte-1d59v6c"),
            H(b, "class", "scrolldown svelte-1d59v6c"),
            H(t, "class", "textLayer svelte-1d59v6c");
        },
        m(e, u) {
          I(e, t, u),
            S(t, n),
            S(n, o),
            S(t, r),
            S(t, i),
            S(i, l),
            S(t, s),
            S(t, a),
            S(a, c),
            z[d].m(a, null),
            S(t, p),
            S(t, f),
            S(f, m),
            S(t, g),
            S(t, b),
            S(t, h),
            ($ = !0);
        },
        p(e, t) {
          (!$ || 8 & t) && x !== (x = e[3].preamble + "") && E(o, x),
            (!$ || 8 & t) && y !== (y = e[3].title + "") && E(l, y),
            (!$ || 8 & t) && v !== (v = e[3].subtitle + "") && E(c, v);
          let n = d;
          (d = _(e)),
            d === n
              ? z[d].p(e, t)
              : (de(),
                fe(z[n], 1, 1, () => {
                  z[n] = null;
                }),
                ue(),
                (u = z[d]),
                u ? u.p(e, t) : ((u = z[d] = k[d](e)), u.c()),
                pe(u, 1),
                u.m(a, null)),
            (!$ || 8 & t) && w !== (w = e[3].description + "") && E(m, w);
        },
        i(e) {
          $ || (pe(u), ($ = !0));
        },
        o(e) {
          fe(u), ($ = !1);
        },
        d(e) {
          e && j(t), z[d].d();
        },
      }
    );
  }
  function Le(t) {
    let n,
      o = t[3].texts[0] + "";
    return {
      c() {
        n = C(o);
      },
      m(e, t) {
        I(e, n, t);
      },
      p(e, t) {
        8 & t && o !== (o = e[3].texts[0] + "") && E(n, o);
      },
      i: e,
      o: e,
      d(e) {
        e && j(n);
      },
    };
  }
  function Oe(e) {
    let t, n;
    return (
      (t = new Be({
        props: {
          texts: e[3].texts,
          delay: 100,
          num_loops: 2,
          repeat_n_words: 1,
          blinker_iter_count: 14,
        },
      })),
      {
        c() {
          xe(t.$$.fragment);
        },
        m(e, o) {
          ye(t, e, o), (n = !0);
        },
        p(e, n) {
          const o = {};
          8 & n && (o.texts = e[3].texts), t.$set(o);
        },
        i(e) {
          n || (pe(t.$$.fragment, e), (n = !0));
        },
        o(e) {
          fe(t.$$.fragment, e), (n = !1);
        },
        d(e) {
          ve(t, e);
        },
      }
    );
  }
  function Pe(e) {
    let t, n, o, r;
    const i = [Ae, He, We, Re, Me],
      l = [];
    return (
      (t = (function (e, t) {
        return e[7] < De
          ? 0
          : e[7] === De
          ? 1
          : e[7] > De && e[7] < 11
          ? 2
          : 14 === e[7]
          ? 3
          : 4;
      })(e)),
      (n = l[t] = i[t](e)),
      {
        c() {
          n.c(), (o = R());
        },
        m(e, n) {
          l[t].m(e, n), I(e, o, n), (r = !0);
        },
        p(e, t) {
          n.p(e, t);
        },
        i(e) {
          r || (pe(n), (r = !0));
        },
        o(e) {
          fe(n), (r = !1);
        },
        d(e) {
          l[t].d(e), e && j(o);
        },
      }
    );
  }
  function Ne(e) {
    let t,
      n,
      o,
      r,
      i,
      l = !1,
      s = () => {
        l = !1;
      },
      a = e[4] <= Math.max(0, e[2]);
    te(e[6]);
    let c = a && Ce(e);
    return {
      c() {
        c && c.c(), (n = R());
      },
      m(a, d) {
        c && c.m(a, d),
          I(a, n, d),
          (o = !0),
          r ||
            ((i = W(window, "scroll", () => {
              (l = !0), clearTimeout(t), (t = setTimeout(s, 100)), e[6]();
            })),
            (r = !0));
      },
      p(e, [o]) {
        16 & o &&
          !l &&
          ((l = !0),
          clearTimeout(t),
          scrollTo(window.pageXOffset, e[4]),
          (t = setTimeout(s, 100))),
          20 & o && (a = e[4] <= Math.max(0, e[2])),
          a
            ? c
              ? (c.p(e, o), 20 & o && pe(c, 1))
              : ((c = Ce(e)), c.c(), pe(c, 1), c.m(n.parentNode, n))
            : c &&
              (de(),
              fe(c, 1, 1, () => {
                c = null;
              }),
              ue());
      },
      i(e) {
        o || (pe(c), (o = !0));
      },
      o(e) {
        fe(c), (o = !1);
      },
      d(e) {
        c && c.d(e), e && j(n), (r = !1), i();
      },
    };
  }
  const De = 4;
  function Ve(e, t, n) {
    let { containerHeight: o } = t,
      { boolAnimateText: r = !0 } = t,
      { pageHalfDown: i = 1e3 } = t,
      { titleInfo: l } = t;
    const s = [...Array(15).keys()];
    let a;
    return (
      (e.$$set = (e) => {
        "containerHeight" in e && n(0, (o = e.containerHeight)),
          "boolAnimateText" in e && n(1, (r = e.boolAnimateText)),
          "pageHalfDown" in e && n(2, (i = e.pageHalfDown)),
          "titleInfo" in e && n(3, (l = e.titleInfo));
      }),
      [
        o,
        r,
        i,
        l,
        a,
        s,
        function () {
          n(4, (a = window.pageYOffset));
        },
      ]
    );
  }
  class Fe extends ke {
    constructor(e) {
      super(),
        we(this, e, Ve, Ne, s, {
          containerHeight: 0,
          boolAnimateText: 1,
          pageHalfDown: 2,
          titleInfo: 3,
        });
    }
  }
  function Ye(t) {
    let n,
      o = t[0].texts[0] + "";
    return {
      c() {
        n = C(o);
      },
      m(e, t) {
        I(e, n, t);
      },
      p(e, t) {
        1 & t && o !== (o = e[0].texts[0] + "") && E(n, o);
      },
      i: e,
      o: e,
      d(e) {
        e && j(n);
      },
    };
  }
  function qe(e) {
    let t, n;
    return (
      (t = new Be({
        props: {
          texts: e[0].texts,
          delay: 100,
          num_loops: 2,
          repeat_n_words: 1,
          blinker_iter_count: 14,
        },
      })),
      {
        c() {
          xe(t.$$.fragment);
        },
        m(e, o) {
          ye(t, e, o), (n = !0);
        },
        p(e, n) {
          const o = {};
          1 & n && (o.texts = e[0].texts), t.$set(o);
        },
        i(e) {
          n || (pe(t.$$.fragment, e), (n = !0));
        },
        o(e) {
          fe(t.$$.fragment, e), (n = !1);
        },
        d(e) {
          ve(t, e);
        },
      }
    );
  }
  function Ge(e) {
    let t,
      n,
      o,
      r,
      i,
      l,
      s,
      a,
      c,
      d,
      u,
      p,
      f,
      m,
      g,
      b,
      h,
      $,
      x,
      y,
      v = e[0].preamble + "",
      w = e[0].title + "",
      k = e[0].description + "",
      z = e[0].subtitle + "";
    const _ = [qe, Ye],
      B = [];
    function R(e, t) {
      return e[1] ? 0 : 1;
    }
    return (
      (b = R(e)),
      (h = B[b] = _[b](e)),
      {
        c() {
          (t = T("div")),
            (n = T("div")),
            (o = T("div")),
            (r = C(v)),
            (i = M()),
            (l = T("div")),
            (s = C(w)),
            (a = M()),
            (c = T("div")),
            (d = C(k)),
            (u = M()),
            (p = T("br")),
            (f = M()),
            (m = T("div")),
            (g = C(z)),
            h.c(),
            ($ = M()),
            (x = T("div")),
            (x.innerHTML = '<i class="fa-solid fa-angles-down"></i>'),
            H(o, "class", "textLayer-preamble svelte-1d90plp"),
            H(l, "class", "textLayer-title"),
            H(c, "class", "textLayer-description svelte-1d90plp"),
            H(m, "class", "textLayer-subtitle"),
            H(x, "class", "scrolldown svelte-1d90plp"),
            H(n, "class", "textLayer col-sm-10 offset-sm-1 svelte-1d90plp"),
            H(t, "class", "textLayerWrapper svelte-1d90plp");
        },
        m(e, h) {
          I(e, t, h),
            S(t, n),
            S(n, o),
            S(o, r),
            S(n, i),
            S(n, l),
            S(l, s),
            S(n, a),
            S(n, c),
            S(c, d),
            S(c, u),
            S(c, p),
            S(n, f),
            S(n, m),
            S(m, g),
            B[b].m(m, null),
            S(n, $),
            S(n, x),
            (y = !0);
        },
        p(e, [t]) {
          (!y || 1 & t) && v !== (v = e[0].preamble + "") && E(r, v),
            (!y || 1 & t) && w !== (w = e[0].title + "") && E(s, w),
            (!y || 1 & t) && k !== (k = e[0].description + "") && E(d, k),
            (!y || 1 & t) && z !== (z = e[0].subtitle + "") && E(g, z);
          let n = b;
          (b = R(e)),
            b === n
              ? B[b].p(e, t)
              : (de(),
                fe(B[n], 1, 1, () => {
                  B[n] = null;
                }),
                ue(),
                (h = B[b]),
                h ? h.p(e, t) : ((h = B[b] = _[b](e)), h.c()),
                pe(h, 1),
                h.m(m, null));
        },
        i(e) {
          y || (pe(h), (y = !0));
        },
        o(e) {
          fe(h), (y = !1);
        },
        d(e) {
          e && j(t), B[b].d();
        },
      }
    );
  }
  function Xe(e, t, n) {
    let { titleInfo: o, boolAnimateText: r } = t;
    return (
      (e.$$set = (e) => {
        "titleInfo" in e && n(0, (o = e.titleInfo)),
          "boolAnimateText" in e && n(1, (r = e.boolAnimateText));
      }),
      [o, r]
    );
  }
  class Je extends ke {
    constructor(e) {
      super(), we(this, e, Xe, Ge, s, { titleInfo: 0, boolAnimateText: 1 });
    }
  }
  function Ue(e, t, n) {
    const o = e.slice();
    return (o[2] = t[n]), o;
  }
  function Qe(e, t, n) {
    const o = e.slice();
    return (o[2] = t[n]), o;
  }
  function Ke(t) {
    let n,
      o,
      r = t[2] + "";
    return {
      c() {
        (n = T("div")), (o = C(r)), H(n, "class", "techstack svelte-b3y0c4");
      },
      m(e, t) {
        I(e, n, t), S(n, o);
      },
      p: e,
      d(e) {
        e && j(n);
      },
    };
  }
  function Ze(t) {
    let n,
      o,
      r = t[2] + "";
    return {
      c() {
        (n = T("div")), (o = C(r)), H(n, "class", "techstack svelte-b3y0c4");
      },
      m(e, t) {
        I(e, n, t), S(n, o);
      },
      p: e,
      d(e) {
        e && j(n);
      },
    };
  }
  function et(t) {
    let n,
      o,
      r,
      i,
      l,
      s,
      a,
      c,
      d,
      u,
      p,
      f,
      m,
      g,
      b = t[0],
      h = [];
    for (let e = 0; e < b.length; e += 1) h[e] = Ke(Qe(t, b, e));
    let $ = t[1],
      x = [];
    for (let e = 0; e < $.length; e += 1) x[e] = Ze(Ue(t, $, e));
    return {
      c() {
        (n = T("div")),
          (o = T("div")),
          (r = M()),
          (i = T("h1")),
          (i.textContent = "About me"),
          (l = M()),
          (s = T("div")),
          (a = T("div")),
          (c = T("div")),
          (c.innerHTML =
            "My interest began during my first co-op term as an accountant, when I\n        needed to manipulate data in Excel. It went from keyboard shortcuts to\n        VBA to quickly transferring out of my accounting program!\n        <br/><br/>\n        Since then, I&#39;ve worked as a Full Stack Developer, a Data Specialist, and\n        even an Innovation Catalyst! I recently enjoyed my post-graduation break\n        and now I’m looking for a company to join for my next adventure.\n        <br/>  <br/>\n        Here are a few technologies I’ve been working with:\n        <br/><br/>"),
          (d = M()),
          (u = T("div")),
          (p = T("div"));
        for (let e = 0; e < h.length; e += 1) h[e].c();
        f = M();
        for (let e = 0; e < x.length; e += 1) x[e].c();
        (m = M()),
          (g = T("div")),
          (g.innerHTML =
            '<div class="aboutmeimg-container svelte-b3y0c4"><img class="aboutmeimg svelte-b3y0c4" src="images/02-aboutme/self2.png" alt="tony kwok"/></div>'),
          H(o, "class", "empty row svelte-b3y0c4"),
          H(i, "class", "title col-md-9 svelte-b3y0c4"),
          H(c, "class", "description svelte-b3y0c4"),
          H(p, "class", "row svelte-b3y0c4"),
          H(u, "class", "row techlist1 m-0 p-0 svelte-b3y0c4"),
          H(a, "class", "text col-md-7 svelte-b3y0c4"),
          H(g, "class", "imgdiv col-md-5 svelte-b3y0c4"),
          H(s, "class", "row col-md-9 svelte-b3y0c4"),
          H(n, "id", "aboutme"),
          H(
            n,
            "class",
            "aboutMe container-fluid col-sm-10 offset-sm-1 svelte-b3y0c4"
          );
      },
      m(e, t) {
        I(e, n, t),
          S(n, o),
          S(n, r),
          S(n, i),
          S(n, l),
          S(n, s),
          S(s, a),
          S(a, c),
          S(a, d),
          S(a, u),
          S(u, p);
        for (let e = 0; e < h.length; e += 1) h[e].m(p, null);
        S(p, f);
        for (let e = 0; e < x.length; e += 1) x[e].m(p, null);
        S(s, m), S(s, g);
      },
      p(e, [t]) {
        if (1 & t) {
          let n;
          for (b = e[0], n = 0; n < b.length; n += 1) {
            const o = Qe(e, b, n);
            h[n] ? h[n].p(o, t) : ((h[n] = Ke(o)), h[n].c(), h[n].m(p, f));
          }
          for (; n < h.length; n += 1) h[n].d(1);
          h.length = b.length;
        }
        if (2 & t) {
          let n;
          for ($ = e[1], n = 0; n < $.length; n += 1) {
            const o = Ue(e, $, n);
            x[n] ? x[n].p(o, t) : ((x[n] = Ze(o)), x[n].c(), x[n].m(p, null));
          }
          for (; n < x.length; n += 1) x[n].d(1);
          x.length = $.length;
        }
      },
      i: e,
      o: e,
      d(e) {
        e && j(n), B(h, e), B(x, e);
      },
    };
  }
  function tt(e) {
    return [
      ["Python", "Javascript", "Svelte"],
      ["SQL", "Node.JS"],
    ];
  }
  class nt extends ke {
    constructor(e) {
      super(), we(this, e, tt, et, s, {});
    }
  }
  function ot(e, t, n) {
    const o = e.slice();
    return (o[5] = t[n]), (o[7] = n), o;
  }
  function rt(e) {
    let t,
      n,
      o = e[5] + "";
    return {
      c() {
        (t = T("li")), (n = C(o));
      },
      m(e, o) {
        I(e, t, o), S(t, n);
      },
      p(e, t) {
        8 & t && o !== (o = e[5] + "") && E(n, o);
      },
      d(e) {
        e && j(t);
      },
    };
  }
  function it(t) {
    let n,
      o,
      r,
      i,
      l,
      s,
      a,
      d,
      u,
      p,
      f,
      m,
      g,
      b,
      h = t[3],
      $ = [];
    for (let e = 0; e < h.length; e += 1) $[e] = rt(ot(t, h, e));
    return {
      c() {
        (n = T("div")),
          (o = T("div")),
          (r = T("div")),
          (i = T("div")),
          (l = T("img")),
          (a = M()),
          (d = T("h4")),
          (u = C(t[1])),
          (p = M()),
          (f = T("h6")),
          (m = C(t[2])),
          (g = M()),
          (b = T("p"));
        for (let e = 0; e < $.length; e += 1) $[e].c();
        H(l, "class", "logo svelte-1cupo5k"),
          c(l.src, (s = t[0])) || H(l, "src", s),
          H(l, "alt", "company logo"),
          H(i, "class", "circle-logo svelte-1cupo5k"),
          L(i, "background-image", t[4]),
          H(d, "class", "card-title svelte-1cupo5k"),
          H(f, "class", "card-subtitle svelte-1cupo5k"),
          H(b, "class", "card-text"),
          H(r, "class", "card-body svelte-1cupo5k"),
          H(o, "class", "card m-2 cb1 text-center svelte-1cupo5k"),
          H(n, "class", "container-fluid card-container svelte-1cupo5k");
      },
      m(e, t) {
        I(e, n, t),
          S(n, o),
          S(o, r),
          S(r, i),
          S(i, l),
          S(r, a),
          S(r, d),
          S(d, u),
          S(r, p),
          S(r, f),
          S(f, m),
          S(r, g),
          S(r, b);
        for (let e = 0; e < $.length; e += 1) $[e].m(b, null);
      },
      p(e, [t]) {
        if (
          (1 & t && !c(l.src, (s = e[0])) && H(l, "src", s),
          16 & t && L(i, "background-image", e[4]),
          2 & t && E(u, e[1]),
          4 & t && E(m, e[2]),
          8 & t)
        ) {
          let n;
          for (h = e[3], n = 0; n < h.length; n += 1) {
            const o = ot(e, h, n);
            $[n] ? $[n].p(o, t) : (($[n] = rt(o)), $[n].c(), $[n].m(b, null));
          }
          for (; n < $.length; n += 1) $[n].d(1);
          $.length = h.length;
        }
      },
      i: e,
      o: e,
      d(e) {
        e && j(n), B($, e);
      },
    };
  }
  function lt(e, t, n) {
    let { imgurl: o } = t,
      { title: r } = t,
      { subtitle: i } = t,
      { points: l } = t,
      { logoColor: s } = t;
    return (
      (e.$$set = (e) => {
        "imgurl" in e && n(0, (o = e.imgurl)),
          "title" in e && n(1, (r = e.title)),
          "subtitle" in e && n(2, (i = e.subtitle)),
          "points" in e && n(3, (l = e.points)),
          "logoColor" in e && n(4, (s = e.logoColor));
      }),
      [o, r, i, l, s]
    );
  }
  class st extends ke {
    constructor(e) {
      super(),
        we(this, e, lt, it, s, {
          imgurl: 0,
          title: 1,
          subtitle: 2,
          points: 3,
          logoColor: 4,
        });
    }
  }
  function at(e, t) {
    const n = [];
    if (t)
      for (let o = 0; o < t.length; o++) {
        const r = t[o],
          i = Array.isArray(r) ? r[0] : r;
        Array.isArray(r) && r.length > 1 ? n.push(i(e, r[1])) : n.push(i(e));
      }
    return {
      update(e) {
        if (((e && e.length) || 0) != n.length)
          throw new Error(
            "You must not change the length of an actions array."
          );
        if (e)
          for (let t = 0; t < e.length; t++) {
            const o = n[t];
            if (o && o.update) {
              const n = e[t];
              Array.isArray(n) && n.length > 1 ? o.update(n[1]) : o.update();
            }
          }
      },
      destroy() {
        for (let e = 0; e < n.length; e++) {
          const t = n[e];
          t && t.destroy && t.destroy();
        }
      },
    };
  }
  const ct = new RegExp(
    "^[^!]+(?:!(?:preventDefault|stopPropagation|passive|nonpassive|capture|once|self))+$"
  );
  function dt(e, { delay: n = 0, duration: o = 400, easing: r = t } = {}) {
    const i = +getComputedStyle(e).opacity;
    return {
      delay: n,
      duration: o,
      easing: r,
      css: (e) => "opacity: " + e * i,
    };
  }
  const ut = {};
  function pt() {
    return (function (e) {
      return q().$$.context.get(e);
    })(ut);
  }
  const ft = [];
  const mt = (function (t, n = e) {
    let o;
    const r = new Set();
    function i(e) {
      if (s(t, e) && ((t = e), o)) {
        const e = !ft.length;
        for (const e of r) e[1](), ft.push(e, t);
        if (e) {
          for (let e = 0; e < ft.length; e += 2) ft[e][0](ft[e + 1]);
          ft.length = 0;
        }
      }
    }
    return {
      set: i,
      update: function (e) {
        i(e(t));
      },
      subscribe: function (l, s = e) {
        const a = [l, s];
        return (
          r.add(a),
          1 === r.size && (o = n(i) || e),
          l(t),
          () => {
            r.delete(a), 0 === r.size && (o(), (o = null));
          }
        );
      },
    };
  })("light");
  function gt() {
    let e;
    mt?.subscribe((t) => {
      e = t;
    });
    return {
      ...In,
      colorNames: St,
      colorScheme: e,
      dark: Cn?.selector,
      fn: {
        themeColor: wt.themeColor,
        size: wt.size,
        radius: wt.radius,
        rgba: wt.rgba,
        variant: wt.variant,
      },
    };
  }
  function bt(e, t = 0) {
    const n = pt()?.theme || gt();
    let o = "50";
    return (function (e) {
      let t = !1;
      switch (e) {
        case "dark":
        case "gray":
        case "red":
        case "pink":
        case "grape":
        case "violet":
        case "indigo":
        case "blue":
        case "cyan":
        case "teal":
        case "green":
        case "lime":
        case "yellow":
        case "orange":
          t = !0;
          break;
        default:
          t = !1;
      }
      return t;
    })(e)
      ? (t !== Number(0) && (o = `${t.toString()}00`),
        n.colors[`${e}${o}`]?.value)
      : e;
  }
  function ht(e) {
    return (function (e) {
      const t = e.replace("#", "");
      return (
        "string" == typeof t &&
        6 === t.length &&
        !Number.isNaN(Number(`0x${t}`))
      );
    })(e)
      ? (function (e) {
          const t = e.replace("#", ""),
            n = parseInt(t, 16);
          return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: 255 & n, a: 1 };
        })(e)
      : e.startsWith("rgb")
      ? (function (e) {
          const [t, n, o, r] = e
            .replace(/[^0-9,.]/g, "")
            .split(",")
            .map(Number);
          return { r: t, g: n, b: o, a: r || 1 };
        })(e)
      : { r: 0, g: 0, b: 0, a: 1 };
  }
  function $t(e, t = 1) {
    if ("string" != typeof e || t > 1 || t < 0) return "rgba(0, 0, 0, 1)";
    const { r: n, g: o, b: r } = ht(e);
    return `rgba(${n}, ${o}, ${r}, ${t})`;
  }
  const xt = "indigo",
    yt = "cyan",
    vt = 45;
  const wt = {
      size: function (e) {
        return "number" == typeof e.size
          ? e.size
          : "number" == typeof e.sizes[e.size]
          ? e.sizes[e.size]
          : +e.sizes[e.size]?.value || +e.sizes.md?.value;
      },
      radius: function (e) {
        const t = pt()?.theme || gt();
        return "number" == typeof e ? e : t.radii[e].value;
      },
      themeColor: bt,
      variant: function ({ variant: e, color: t, gradient: n }) {
        const o = pt()?.theme || gt();
        if ("light" === e)
          return {
            border: "transparent",
            background: [$t(bt(t, 8), 0.35), $t(bt(t, 0), 1)],
            color: [
              "dark" === t ? bt("dark", 0) : bt(t, 2),
              "dark" === t ? bt("dark", 9) : bt(t, 6),
            ],
            hover: [$t(bt(t, 7), 0.45), $t(bt(t, 1), 0.65)],
          };
        if ("default" === e)
          return {
            border: [bt("dark", 5), bt("gray", 4)],
            background: [bt("dark", 5), o.colors.white.value],
            color: [o.colors.white.value, o.colors.black.value],
            hover: [bt("dark", 4), bt("gray", 0)],
          };
        if ("white" === e)
          return {
            border: "transparent",
            background: o.colors.white.value,
            color: bt(t, 6),
            hover: null,
          };
        if ("outline" === e)
          return {
            border: [bt(t, 4), bt(t, 6)],
            background: "transparent",
            color: [bt(t, 4), bt(t, 6)],
            hover: [$t(bt(t, 4), 0.05), $t(bt(t, 0), 0.35)],
          };
        if ("gradient" === e) {
          const e = { from: n?.from || xt, to: n?.to || yt, deg: n?.deg || vt };
          return {
            background: `linear-gradient(${e.deg}deg, ${bt(e.from, 6)} 0%, ${bt(
              e.to,
              6
            )} 100%)`,
            color: o.colors.white.value,
            border: "transparent",
            hover: null,
          };
        }
        return "subtle" === e
          ? {
              border: "transparent",
              background: "transparent",
              color: [
                "dark" === t ? bt("dark", 0) : bt(t, 2),
                "dark" === t ? bt("dark", 9) : bt(t, 6),
              ],
              hover: [$t(bt(t, 8), 0.35), $t(bt(t, 0), 1)],
            }
          : {
              border: "transparent",
              background: [bt(t, 8), bt(t, 6)],
              color: o.colors.white.value,
              hover: bt(t, 7),
            };
      },
      rgba: $t,
    },
    kt = {
      primary: "#228be6",
      white: "#ffffff",
      black: "#000000",
      dark50: "#C1C2C5",
      dark100: "#A6A7AB",
      dark200: "#909296",
      dark300: "#5c5f66",
      dark400: "#373A40",
      dark500: "#2C2E33",
      dark600: "#25262b",
      dark700: "#1A1B1E",
      dark800: "#141517",
      dark900: "#101113",
      gray50: "#f8f9fa",
      gray100: "#f1f3f5",
      gray200: "#e9ecef",
      gray300: "#dee2e6",
      gray400: "#ced4da",
      gray500: "#adb5bd",
      gray600: "#868e96",
      gray700: "#495057",
      gray800: "#343a40",
      gray900: "#212529",
      red50: "#fff5f5",
      red100: "#ffe3e3",
      red200: "#ffc9c9",
      red300: "#ffa8a8",
      red400: "#ff8787",
      red500: "#ff6b6b",
      red600: "#fa5252",
      red700: "#f03e3e",
      red800: "#e03131",
      red900: "#c92a2a",
      pink50: "#fff0f6",
      pink100: "#ffdeeb",
      pink200: "#fcc2d7",
      pink300: "#faa2c1",
      pink400: "#f783ac",
      pink500: "#f06595",
      pink600: "#e64980",
      pink700: "#d6336c",
      pink800: "#c2255c",
      pink900: "#a61e4d",
      grape50: "#f8f0fc",
      grape100: "#f3d9fa",
      grape200: "#eebefa",
      grape300: "#e599f7",
      grape400: "#da77f2",
      grape500: "#cc5de8",
      grape600: "#be4bdb",
      grape700: "#ae3ec9",
      grape800: "#9c36b5",
      grape900: "#862e9c",
      violet50: "#f3f0ff",
      violet100: "#e5dbff",
      violet200: "#d0bfff",
      violet300: "#b197fc",
      violet400: "#9775fa",
      violet500: "#845ef7",
      violet600: "#7950f2",
      violet700: "#7048e8",
      violet800: "#6741d9",
      violet900: "#5f3dc4",
      indigo50: "#edf2ff",
      indigo100: "#dbe4ff",
      indigo200: "#bac8ff",
      indigo300: "#91a7ff",
      indigo400: "#748ffc",
      indigo500: "#5c7cfa",
      indigo600: "#4c6ef5",
      indigo700: "#4263eb",
      indigo800: "#3b5bdb",
      indigo900: "#364fc7",
      blue50: "#e7f5ff",
      blue100: "#d0ebff",
      blue200: "#a5d8ff",
      blue300: "#74c0fc",
      blue400: "#4dabf7",
      blue500: "#339af0",
      blue600: "#228be6",
      blue700: "#1c7ed6",
      blue800: "#1971c2",
      blue900: "#1864ab",
      cyan50: "#e3fafc",
      cyan100: "#c5f6fa",
      cyan200: "#99e9f2",
      cyan300: "#66d9e8",
      cyan400: "#3bc9db",
      cyan500: "#22b8cf",
      cyan600: "#15aabf",
      cyan700: "#1098ad",
      cyan800: "#0c8599",
      cyan900: "#0b7285",
      teal50: "#e6fcf5",
      teal100: "#c3fae8",
      teal200: "#96f2d7",
      teal300: "#63e6be",
      teal400: "#38d9a9",
      teal500: "#20c997",
      teal600: "#12b886",
      teal700: "#0ca678",
      teal800: "#099268",
      teal900: "#087f5b",
      green50: "#ebfbee",
      green100: "#d3f9d8",
      green200: "#b2f2bb",
      green300: "#8ce99a",
      green400: "#69db7c",
      green500: "#51cf66",
      green600: "#40c057",
      green700: "#37b24d",
      green800: "#2f9e44",
      green900: "#2b8a3e",
      lime50: "#f4fce3",
      lime100: "#e9fac8",
      lime200: "#d8f5a2",
      lime300: "#c0eb75",
      lime400: "#a9e34b",
      lime500: "#94d82d",
      lime600: "#82c91e",
      lime700: "#74b816",
      lime800: "#66a80f",
      lime900: "#5c940d",
      yellow50: "#fff9db",
      yellow100: "#fff3bf",
      yellow200: "#ffec99",
      yellow300: "#ffe066",
      yellow400: "#ffd43b",
      yellow500: "#fcc419",
      yellow600: "#fab005",
      yellow700: "#f59f00",
      yellow800: "#f08c00",
      yellow900: "#e67700",
      orange50: "#fff4e6",
      orange100: "#ffe8cc",
      orange200: "#ffd8a8",
      orange300: "#ffc078",
      orange400: "#ffa94d",
      orange500: "#ff922b",
      orange600: "#fd7e14",
      orange700: "#f76707",
      orange800: "#e8590c",
      orange900: "#d9480f",
    },
    St = {
      blue: "blue",
      cyan: "cyan",
      dark: "dark",
      grape: "grape",
      gray: "gray",
      green: "green",
      indigo: "indigo",
      lime: "lime",
      orange: "orange",
      pink: "pink",
      red: "red",
      teal: "teal",
      violet: "violet",
      yellow: "yellow",
    },
    zt = {}.hasOwnProperty;
  function _t(...e) {
    const t = [];
    for (let n = 0; n < e.length; n++) {
      const o = e[n];
      if (!o) continue;
      const r = typeof o;
      if ("string" === r || "number" === r) t.push(o);
      else if (Array.isArray(o)) {
        if (o.length) {
          const e = { ...o };
          e && t.push(e);
        }
      } else if ("object" === r)
        if (o.toString === Object.prototype.toString)
          for (const e in o) zt.call(o, e) && o[e] && t.push(e);
        else t.push(o.toString());
    }
    return t.join(" ");
  }
  function It() {
    return { cx: _t };
  }
  function jt(e) {
    return `__svelteui-ref-${e || ""}`;
  }
  var Bt = "colors",
    Tt = "sizes",
    Ct = "space",
    Mt = {
      gap: Ct,
      gridGap: Ct,
      columnGap: Ct,
      gridColumnGap: Ct,
      rowGap: Ct,
      gridRowGap: Ct,
      inset: Ct,
      insetBlock: Ct,
      insetBlockEnd: Ct,
      insetBlockStart: Ct,
      insetInline: Ct,
      insetInlineEnd: Ct,
      insetInlineStart: Ct,
      margin: Ct,
      marginTop: Ct,
      marginRight: Ct,
      marginBottom: Ct,
      marginLeft: Ct,
      marginBlock: Ct,
      marginBlockEnd: Ct,
      marginBlockStart: Ct,
      marginInline: Ct,
      marginInlineEnd: Ct,
      marginInlineStart: Ct,
      padding: Ct,
      paddingTop: Ct,
      paddingRight: Ct,
      paddingBottom: Ct,
      paddingLeft: Ct,
      paddingBlock: Ct,
      paddingBlockEnd: Ct,
      paddingBlockStart: Ct,
      paddingInline: Ct,
      paddingInlineEnd: Ct,
      paddingInlineStart: Ct,
      top: Ct,
      right: Ct,
      bottom: Ct,
      left: Ct,
      scrollMargin: Ct,
      scrollMarginTop: Ct,
      scrollMarginRight: Ct,
      scrollMarginBottom: Ct,
      scrollMarginLeft: Ct,
      scrollMarginX: Ct,
      scrollMarginY: Ct,
      scrollMarginBlock: Ct,
      scrollMarginBlockEnd: Ct,
      scrollMarginBlockStart: Ct,
      scrollMarginInline: Ct,
      scrollMarginInlineEnd: Ct,
      scrollMarginInlineStart: Ct,
      scrollPadding: Ct,
      scrollPaddingTop: Ct,
      scrollPaddingRight: Ct,
      scrollPaddingBottom: Ct,
      scrollPaddingLeft: Ct,
      scrollPaddingX: Ct,
      scrollPaddingY: Ct,
      scrollPaddingBlock: Ct,
      scrollPaddingBlockEnd: Ct,
      scrollPaddingBlockStart: Ct,
      scrollPaddingInline: Ct,
      scrollPaddingInlineEnd: Ct,
      scrollPaddingInlineStart: Ct,
      fontSize: "fontSizes",
      background: Bt,
      backgroundColor: Bt,
      backgroundImage: Bt,
      borderImage: Bt,
      border: Bt,
      borderBlock: Bt,
      borderBlockEnd: Bt,
      borderBlockStart: Bt,
      borderBottom: Bt,
      borderBottomColor: Bt,
      borderColor: Bt,
      borderInline: Bt,
      borderInlineEnd: Bt,
      borderInlineStart: Bt,
      borderLeft: Bt,
      borderLeftColor: Bt,
      borderRight: Bt,
      borderRightColor: Bt,
      borderTop: Bt,
      borderTopColor: Bt,
      caretColor: Bt,
      color: Bt,
      columnRuleColor: Bt,
      fill: Bt,
      outline: Bt,
      outlineColor: Bt,
      stroke: Bt,
      textDecorationColor: Bt,
      fontFamily: "fonts",
      fontWeight: "fontWeights",
      lineHeight: "lineHeights",
      letterSpacing: "letterSpacings",
      blockSize: Tt,
      minBlockSize: Tt,
      maxBlockSize: Tt,
      inlineSize: Tt,
      minInlineSize: Tt,
      maxInlineSize: Tt,
      width: Tt,
      minWidth: Tt,
      maxWidth: Tt,
      height: Tt,
      minHeight: Tt,
      maxHeight: Tt,
      flexBasis: Tt,
      gridTemplateColumns: Tt,
      gridTemplateRows: Tt,
      borderWidth: "borderWidths",
      borderTopWidth: "borderWidths",
      borderRightWidth: "borderWidths",
      borderBottomWidth: "borderWidths",
      borderLeftWidth: "borderWidths",
      borderStyle: "borderStyles",
      borderTopStyle: "borderStyles",
      borderRightStyle: "borderStyles",
      borderBottomStyle: "borderStyles",
      borderLeftStyle: "borderStyles",
      borderRadius: "radii",
      borderTopLeftRadius: "radii",
      borderTopRightRadius: "radii",
      borderBottomRightRadius: "radii",
      borderBottomLeftRadius: "radii",
      boxShadow: "shadows",
      textShadow: "shadows",
      transition: "transitions",
      zIndex: "zIndices",
    },
    Rt = (e, t) =>
      "function" == typeof t
        ? { "()": Function.prototype.toString.call(t) }
        : t,
    Wt = () => {
      const e = Object.create(null);
      return (t, n, ...o) => {
        const r = ((e) => JSON.stringify(e, Rt))(t);
        return r in e ? e[r] : (e[r] = n(t, ...o));
      };
    },
    Ht = Symbol.for("sxs.internal"),
    At = (e, t) =>
      Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)),
    Et = (e) => {
      for (const t in e) return !0;
      return !1;
    },
    { hasOwnProperty: Lt } = Object.prototype,
    Ot = (e) =>
      e.includes("-") ? e : e.replace(/[A-Z]/g, (e) => "-" + e.toLowerCase()),
    Pt = /\s+(?![^()]*\))/,
    Nt = (e) => (t) => e(...("string" == typeof t ? String(t).split(Pt) : [t])),
    Dt = {
      appearance: (e) => ({ WebkitAppearance: e, appearance: e }),
      backfaceVisibility: (e) => ({
        WebkitBackfaceVisibility: e,
        backfaceVisibility: e,
      }),
      backdropFilter: (e) => ({ WebkitBackdropFilter: e, backdropFilter: e }),
      backgroundClip: (e) => ({ WebkitBackgroundClip: e, backgroundClip: e }),
      boxDecorationBreak: (e) => ({
        WebkitBoxDecorationBreak: e,
        boxDecorationBreak: e,
      }),
      clipPath: (e) => ({ WebkitClipPath: e, clipPath: e }),
      content: (e) => ({
        content:
          e.includes('"') ||
          e.includes("'") ||
          /^([A-Za-z]+\([^]*|[^]*-quote|inherit|initial|none|normal|revert|unset)$/.test(
            e
          )
            ? e
            : `"${e}"`,
      }),
      hyphens: (e) => ({ WebkitHyphens: e, hyphens: e }),
      maskImage: (e) => ({ WebkitMaskImage: e, maskImage: e }),
      maskSize: (e) => ({ WebkitMaskSize: e, maskSize: e }),
      tabSize: (e) => ({ MozTabSize: e, tabSize: e }),
      textSizeAdjust: (e) => ({ WebkitTextSizeAdjust: e, textSizeAdjust: e }),
      userSelect: (e) => ({ WebkitUserSelect: e, userSelect: e }),
      marginBlock: Nt((e, t) => ({
        marginBlockStart: e,
        marginBlockEnd: t || e,
      })),
      marginInline: Nt((e, t) => ({
        marginInlineStart: e,
        marginInlineEnd: t || e,
      })),
      maxSize: Nt((e, t) => ({ maxBlockSize: e, maxInlineSize: t || e })),
      minSize: Nt((e, t) => ({ minBlockSize: e, minInlineSize: t || e })),
      paddingBlock: Nt((e, t) => ({
        paddingBlockStart: e,
        paddingBlockEnd: t || e,
      })),
      paddingInline: Nt((e, t) => ({
        paddingInlineStart: e,
        paddingInlineEnd: t || e,
      })),
    },
    Vt = /([\d.]+)([^]*)/,
    Ft = (e, t) =>
      e.length
        ? e.reduce(
            (e, n) => (
              e.push(
                ...t.map((e) =>
                  e.includes("&")
                    ? e.replace(
                        /&/g,
                        /[ +>|~]/.test(n) && /&.*&/.test(e) ? `:is(${n})` : n
                      )
                    : n + " " + e
                )
              ),
              e
            ),
            []
          )
        : t,
    Yt = (e, t) =>
      e in qt && "string" == typeof t
        ? t.replace(
            /^((?:[^]*[^\w-])?)(fit-content|stretch)((?:[^\w-][^]*)?)$/,
            (t, n, o, r) =>
              n +
              ("stretch" === o
                ? `-moz-available${r};${Ot(e)}:${n}-webkit-fill-available`
                : `-moz-fit-content${r};${Ot(e)}:${n}fit-content`) +
              r
          )
        : String(t),
    qt = {
      blockSize: 1,
      height: 1,
      inlineSize: 1,
      maxBlockSize: 1,
      maxHeight: 1,
      maxInlineSize: 1,
      maxWidth: 1,
      minBlockSize: 1,
      minHeight: 1,
      minInlineSize: 1,
      minWidth: 1,
      width: 1,
    },
    Gt = (e) => (e ? e + "-" : ""),
    Xt = (e, t, n) =>
      e.replace(
        /([+-])?((?:\d+(?:\.\d*)?|\.\d+)(?:[Ee][+-]?\d+)?)?(\$|--)([$\w-]+)/g,
        (e, o, r, i, l) =>
          ("$" == i) == !!r
            ? e
            : (o || "--" == i ? "calc(" : "") +
              "var(--" +
              ("$" === i
                ? Gt(t) + (l.includes("$") ? "" : Gt(n)) + l.replace(/\$/g, "-")
                : l) +
              ")" +
              (o || "--" == i ? "*" + (o || "") + (r || "1") + ")" : "")
      ),
    Jt = /\s*,\s*(?![^()]*\))/,
    Ut = Object.prototype.toString,
    Qt = (e, t, n, o, r) => {
      let i, l, s;
      const a = (e, t, n) => {
        let c, d;
        const u = (e) => {
          for (c in e) {
            const m = 64 === c.charCodeAt(0),
              g = m && Array.isArray(e[c]) ? e[c] : [e[c]];
            for (d of g) {
              const e = /[A-Z]/.test((f = c))
                  ? f
                  : f.replace(/-[^]/g, (e) => e[1].toUpperCase()),
                g =
                  "object" == typeof d &&
                  d &&
                  d.toString === Ut &&
                  (!o.utils[e] || !t.length);
              if (e in o.utils && !g) {
                const t = o.utils[e];
                if (t !== l) {
                  (l = t), u(t(d)), (l = null);
                  continue;
                }
              } else if (e in Dt) {
                const t = Dt[e];
                if (t !== s) {
                  (s = t), u(t(d)), (s = null);
                  continue;
                }
              }
              if (
                (m &&
                  ((p =
                    c.slice(1) in o.media
                      ? "@media " + o.media[c.slice(1)]
                      : c),
                  (c = p.replace(
                    /\(\s*([\w-]+)\s*(=|<|<=|>|>=)\s*([\w-]+)\s*(?:(<|<=|>|>=)\s*([\w-]+)\s*)?\)/g,
                    (e, t, n, o, r, i) => {
                      const l = Vt.test(t),
                        s = 0.0625 * (l ? -1 : 1),
                        [a, c] = l ? [o, t] : [t, o];
                      return (
                        "(" +
                        ("=" === n[0]
                          ? ""
                          : (">" === n[0]) === l
                          ? "max-"
                          : "min-") +
                        a +
                        ":" +
                        ("=" !== n[0] && 1 === n.length
                          ? c.replace(
                              Vt,
                              (e, t, o) =>
                                Number(t) + s * (">" === n ? 1 : -1) + o
                            )
                          : c) +
                        (r
                          ? ") and (" +
                            (">" === r[0] ? "min-" : "max-") +
                            a +
                            ":" +
                            (1 === r.length
                              ? i.replace(
                                  Vt,
                                  (e, t, n) =>
                                    Number(t) + s * (">" === r ? -1 : 1) + n
                                )
                              : i)
                          : "") +
                        ")"
                      );
                    }
                  ))),
                g)
              ) {
                const e = m ? n.concat(c) : [...n],
                  o = m ? [...t] : Ft(t, c.split(Jt));
                void 0 !== i && r(Kt(...i)), (i = void 0), a(d, o, e);
              } else
                void 0 === i && (i = [[], t, n]),
                  (c =
                    m || 36 !== c.charCodeAt(0)
                      ? c
                      : `--${Gt(o.prefix)}${c.slice(1).replace(/\$/g, "-")}`),
                  (d = g
                    ? d
                    : "number" == typeof d
                    ? d && e in Zt
                      ? String(d) + "px"
                      : String(d)
                    : Xt(Yt(e, null == d ? "" : d), o.prefix, o.themeMap[e])),
                  i[0].push(`${m ? `${c} ` : `${Ot(c)}:`}${d}`);
            }
          }
          var p, f;
        };
        u(e), void 0 !== i && r(Kt(...i)), (i = void 0);
      };
      a(e, t, n);
    },
    Kt = (e, t, n) =>
      `${n.map((e) => `${e}{`).join("")}${
        t.length ? `${t.join(",")}{` : ""
      }${e.join(";")}${t.length ? "}" : ""}${Array(
        n.length ? n.length + 1 : 0
      ).join("}")}`,
    Zt = {
      animationDelay: 1,
      animationDuration: 1,
      backgroundSize: 1,
      blockSize: 1,
      border: 1,
      borderBlock: 1,
      borderBlockEnd: 1,
      borderBlockEndWidth: 1,
      borderBlockStart: 1,
      borderBlockStartWidth: 1,
      borderBlockWidth: 1,
      borderBottom: 1,
      borderBottomLeftRadius: 1,
      borderBottomRightRadius: 1,
      borderBottomWidth: 1,
      borderEndEndRadius: 1,
      borderEndStartRadius: 1,
      borderInlineEnd: 1,
      borderInlineEndWidth: 1,
      borderInlineStart: 1,
      borderInlineStartWidth: 1,
      borderInlineWidth: 1,
      borderLeft: 1,
      borderLeftWidth: 1,
      borderRadius: 1,
      borderRight: 1,
      borderRightWidth: 1,
      borderSpacing: 1,
      borderStartEndRadius: 1,
      borderStartStartRadius: 1,
      borderTop: 1,
      borderTopLeftRadius: 1,
      borderTopRightRadius: 1,
      borderTopWidth: 1,
      borderWidth: 1,
      bottom: 1,
      columnGap: 1,
      columnRule: 1,
      columnRuleWidth: 1,
      columnWidth: 1,
      containIntrinsicSize: 1,
      flexBasis: 1,
      fontSize: 1,
      gap: 1,
      gridAutoColumns: 1,
      gridAutoRows: 1,
      gridTemplateColumns: 1,
      gridTemplateRows: 1,
      height: 1,
      inlineSize: 1,
      inset: 1,
      insetBlock: 1,
      insetBlockEnd: 1,
      insetBlockStart: 1,
      insetInline: 1,
      insetInlineEnd: 1,
      insetInlineStart: 1,
      left: 1,
      letterSpacing: 1,
      margin: 1,
      marginBlock: 1,
      marginBlockEnd: 1,
      marginBlockStart: 1,
      marginBottom: 1,
      marginInline: 1,
      marginInlineEnd: 1,
      marginInlineStart: 1,
      marginLeft: 1,
      marginRight: 1,
      marginTop: 1,
      maxBlockSize: 1,
      maxHeight: 1,
      maxInlineSize: 1,
      maxWidth: 1,
      minBlockSize: 1,
      minHeight: 1,
      minInlineSize: 1,
      minWidth: 1,
      offsetDistance: 1,
      offsetRotate: 1,
      outline: 1,
      outlineOffset: 1,
      outlineWidth: 1,
      overflowClipMargin: 1,
      padding: 1,
      paddingBlock: 1,
      paddingBlockEnd: 1,
      paddingBlockStart: 1,
      paddingBottom: 1,
      paddingInline: 1,
      paddingInlineEnd: 1,
      paddingInlineStart: 1,
      paddingLeft: 1,
      paddingRight: 1,
      paddingTop: 1,
      perspective: 1,
      right: 1,
      rowGap: 1,
      scrollMargin: 1,
      scrollMarginBlock: 1,
      scrollMarginBlockEnd: 1,
      scrollMarginBlockStart: 1,
      scrollMarginBottom: 1,
      scrollMarginInline: 1,
      scrollMarginInlineEnd: 1,
      scrollMarginInlineStart: 1,
      scrollMarginLeft: 1,
      scrollMarginRight: 1,
      scrollMarginTop: 1,
      scrollPadding: 1,
      scrollPaddingBlock: 1,
      scrollPaddingBlockEnd: 1,
      scrollPaddingBlockStart: 1,
      scrollPaddingBottom: 1,
      scrollPaddingInline: 1,
      scrollPaddingInlineEnd: 1,
      scrollPaddingInlineStart: 1,
      scrollPaddingLeft: 1,
      scrollPaddingRight: 1,
      scrollPaddingTop: 1,
      shapeMargin: 1,
      textDecoration: 1,
      textDecorationThickness: 1,
      textIndent: 1,
      textUnderlineOffset: 1,
      top: 1,
      transitionDelay: 1,
      transitionDuration: 1,
      verticalAlign: 1,
      width: 1,
      wordSpacing: 1,
    },
    en = (e) => String.fromCharCode(e + (e > 25 ? 39 : 97)),
    tn = (e) =>
      ((e) => {
        let t,
          n = "";
        for (t = Math.abs(e); t > 52; t = (t / 52) | 0) n = en(t % 52) + n;
        return en(t % 52) + n;
      })(
        ((e, t) => {
          let n = t.length;
          for (; n; ) e = (33 * e) ^ t.charCodeAt(--n);
          return e;
        })(5381, JSON.stringify(e)) >>> 0
      ),
    nn = [
      "themed",
      "global",
      "styled",
      "onevar",
      "resonevar",
      "allvar",
      "inline",
    ],
    on = (e) => {
      if (e.href && !e.href.startsWith(location.origin)) return !1;
      try {
        return !!e.cssRules;
      } catch (e) {
        return !1;
      }
    },
    rn = (e) => {
      let t;
      const n = () => {
          const { cssRules: e } = t.sheet;
          return [].map
            .call(e, (n, o) => {
              const { cssText: r } = n;
              let i = "";
              if (r.startsWith("--sxs")) return "";
              if (e[o - 1] && (i = e[o - 1].cssText).startsWith("--sxs")) {
                if (!n.cssRules.length) return "";
                for (const e in t.rules)
                  if (t.rules[e].group === n)
                    return `--sxs{--sxs:${[...t.rules[e].cache].join(
                      " "
                    )}}${r}`;
                return n.cssRules.length ? `${i}${r}` : "";
              }
              return r;
            })
            .join("");
        },
        o = () => {
          if (t) {
            const { rules: e, sheet: n } = t;
            if (!n.deleteRule) {
              for (; 3 === Object(Object(n.cssRules)[0]).type; )
                n.cssRules.splice(0, 1);
              n.cssRules = [];
            }
            for (const t in e) delete e[t];
          }
          const r = Object(e).styleSheets || [];
          for (const e of r)
            if (on(e)) {
              for (let r = 0, i = e.cssRules; i[r]; ++r) {
                const l = Object(i[r]);
                if (1 !== l.type) continue;
                const s = Object(i[r + 1]);
                if (4 !== s.type) continue;
                ++r;
                const { cssText: a } = l;
                if (!a.startsWith("--sxs")) continue;
                const c = a.slice(14, -3).trim().split(/\s+/),
                  d = nn[c[0]];
                d &&
                  (t || (t = { sheet: e, reset: o, rules: {}, toString: n }),
                  (t.rules[d] = { group: s, index: r, cache: new Set(c) }));
              }
              if (t) break;
            }
          if (!t) {
            const r = (e, t) => ({
              type: t,
              cssRules: [],
              insertRule(e, t) {
                this.cssRules.splice(
                  t,
                  0,
                  r(
                    e,
                    { import: 3, undefined: 1 }[
                      (e.toLowerCase().match(/^@([a-z]+)/) || [])[1]
                    ] || 4
                  )
                );
              },
              get cssText() {
                return "@media{}" === e
                  ? `@media{${[].map
                      .call(this.cssRules, (e) => e.cssText)
                      .join("")}}`
                  : e;
              },
            });
            t = {
              sheet: e
                ? (e.head || e).appendChild(document.createElement("style"))
                    .sheet
                : r("", "text/css"),
              rules: {},
              reset: o,
              toString: n,
            };
          }
          const { sheet: i, rules: l } = t;
          for (let e = nn.length - 1; e >= 0; --e) {
            const t = nn[e];
            if (!l[t]) {
              const n = nn[e + 1],
                o = l[n] ? l[n].index : i.cssRules.length;
              i.insertRule("@media{}", o),
                i.insertRule(`--sxs{--sxs:${e}}`, o),
                (l[t] = {
                  group: i.cssRules[o + 1],
                  index: o,
                  cache: new Set([e]),
                });
            }
            ln(l[t]);
          }
        };
      return o(), t;
    },
    ln = (e) => {
      const t = e.group;
      let n = t.cssRules.length;
      e.apply = (e) => {
        try {
          t.insertRule(e, n), ++n;
        } catch (e) {}
      };
    },
    sn = Symbol(),
    an = Wt(),
    cn = (e, t) =>
      an(e, () => (...n) => {
        let o = { type: null, composers: new Set() };
        for (const t of n)
          if (null != t)
            if (t[Ht]) {
              null == o.type && (o.type = t[Ht].type);
              for (const e of t[Ht].composers) o.composers.add(e);
            } else
              t.constructor !== Object || t.$$typeof
                ? null == o.type && (o.type = t)
                : o.composers.add(dn(t, e));
        return (
          null == o.type && (o.type = "span"),
          o.composers.size || o.composers.add(["PJLV", {}, [], [], {}, []]),
          un(e, o, t)
        );
      }),
    dn = (
      { variants: e, compoundVariants: t, defaultVariants: n, ...o },
      r
    ) => {
      const i = `${Gt(r.prefix)}c-${tn(o)}`,
        l = [],
        s = [],
        a = Object.create(null),
        c = [];
      for (const e in n) a[e] = String(n[e]);
      if ("object" == typeof e && e)
        for (const t in e) {
          (d = a), (u = t), Lt.call(d, u) || (a[t] = "undefined");
          const n = e[t];
          for (const e in n) {
            const o = { [t]: String(e) };
            "undefined" === String(e) && c.push(t);
            const r = n[e],
              i = [o, r, !Et(r)];
            l.push(i);
          }
        }
      var d, u;
      if ("object" == typeof t && t)
        for (const e of t) {
          let { css: t, ...n } = e;
          t = ("object" == typeof t && t) || {};
          for (const e in n) n[e] = String(n[e]);
          const o = [n, t, !Et(t)];
          s.push(o);
        }
      return [i, o, l, s, a, c];
    },
    un = (e, t, n) => {
      const [o, r, i, l] = pn(t.composers),
        s =
          "function" == typeof t.type || t.type.$$typeof
            ? ((e) => {
                function t() {
                  for (let n = 0; n < t[sn].length; n++) {
                    const [o, r] = t[sn][n];
                    e.rules[o].apply(r);
                  }
                  return (t[sn] = []), null;
                }
                return (
                  (t[sn] = []),
                  (t.rules = {}),
                  nn.forEach(
                    (e) => (t.rules[e] = { apply: (n) => t[sn].push([e, n]) })
                  ),
                  t
                );
              })(n)
            : null,
        a = (s || n).rules,
        c = `.${o}${r.length > 1 ? `:where(.${r.slice(1).join(".")})` : ""}`,
        d = (d) => {
          d = ("object" == typeof d && d) || mn;
          const { css: u, ...p } = d,
            f = {};
          for (const e in i)
            if ((delete p[e], e in d)) {
              let t = d[e];
              "object" == typeof t && t
                ? (f[e] = { "@initial": i[e], ...t })
                : ((t = String(t)),
                  (f[e] = "undefined" !== t || l.has(e) ? t : i[e]));
            } else f[e] = i[e];
          const m = new Set([...r]);
          for (const [o, r, i, l] of t.composers) {
            n.rules.styled.cache.has(o) ||
              (n.rules.styled.cache.add(o),
              Qt(r, [`.${o}`], [], e, (e) => {
                a.styled.apply(e);
              }));
            const t = fn(i, f, e.media),
              s = fn(l, f, e.media, !0);
            for (const r of t)
              if (void 0 !== r)
                for (const [t, i, l] of r) {
                  const r = `${o}-${tn(i)}-${t}`;
                  m.add(r);
                  const s = (l ? n.rules.resonevar : n.rules.onevar).cache,
                    c = l ? a.resonevar : a.onevar;
                  s.has(r) ||
                    (s.add(r),
                    Qt(i, [`.${r}`], [], e, (e) => {
                      c.apply(e);
                    }));
                }
            for (const t of s)
              if (void 0 !== t)
                for (const [r, i] of t) {
                  const t = `${o}-${tn(i)}-${r}`;
                  m.add(t),
                    n.rules.allvar.cache.has(t) ||
                      (n.rules.allvar.cache.add(t),
                      Qt(i, [`.${t}`], [], e, (e) => {
                        a.allvar.apply(e);
                      }));
                }
          }
          if ("object" == typeof u && u) {
            const t = `${o}-i${tn(u)}-css`;
            m.add(t),
              n.rules.inline.cache.has(t) ||
                (n.rules.inline.cache.add(t),
                Qt(u, [`.${t}`], [], e, (e) => {
                  a.inline.apply(e);
                }));
          }
          for (const e of String(d.className || "")
            .trim()
            .split(/\s+/))
            e && m.add(e);
          const g = (p.className = [...m].join(" "));
          return {
            type: t.type,
            className: g,
            selector: c,
            props: p,
            toString: () => g,
            deferredInjector: s,
          };
        };
      return At(d, {
        className: o,
        selector: c,
        [Ht]: t,
        toString: () => (n.rules.styled.cache.has(o) || d(), o),
      });
    },
    pn = (e) => {
      let t = "";
      const n = [],
        o = {},
        r = [];
      for (const [i, , , , l, s] of e) {
        "" === t && (t = i), n.push(i), r.push(...s);
        for (const e in l) {
          const t = l[e];
          (void 0 === o[e] || "undefined" !== t || s.includes(t)) && (o[e] = t);
        }
      }
      return [t, n, o, new Set(r)];
    },
    fn = (e, t, n, o) => {
      const r = [];
      e: for (let [i, l, s] of e) {
        if (s) continue;
        let e,
          a = 0,
          c = !1;
        for (e in i) {
          const o = i[e];
          let r = t[e];
          if (r !== o) {
            if ("object" != typeof r || !r) continue e;
            {
              let e,
                t,
                i = 0;
              for (const l in r) {
                if (o === String(r[l])) {
                  if ("@initial" !== l) {
                    const e = l.slice(1);
                    (t = t || []).push(
                      e in n ? n[e] : l.replace(/^@media ?/, "")
                    ),
                      (c = !0);
                  }
                  (a += i), (e = !0);
                }
                ++i;
              }
              if (
                (t && t.length && (l = { ["@media " + t.join(", ")]: l }), !e)
              )
                continue e;
            }
          }
        }
        (r[a] = r[a] || []).push([o ? "cv" : `${e}-${i[e]}`, l, c]);
      }
      return r;
    },
    mn = {},
    gn = Wt(),
    bn = (e, t) =>
      gn(e, () => (...n) => {
        const o = () => {
          for (let o of n) {
            o = ("object" == typeof o && o) || {};
            let n = tn(o);
            if (!t.rules.global.cache.has(n)) {
              if ((t.rules.global.cache.add(n), "@import" in o)) {
                let e =
                  [].indexOf.call(t.sheet.cssRules, t.rules.themed.group) - 1;
                for (let n of [].concat(o["@import"]))
                  (n = n.includes('"') || n.includes("'") ? n : `"${n}"`),
                    t.sheet.insertRule(`@import ${n};`, e++);
                delete o["@import"];
              }
              Qt(o, [], [], e, (e) => {
                t.rules.global.apply(e);
              });
            }
          }
          return "";
        };
        return At(o, { toString: o });
      }),
    hn = Wt(),
    $n = (e, t) =>
      hn(e, () => (n) => {
        const o = `${Gt(e.prefix)}k-${tn(n)}`,
          r = () => {
            if (!t.rules.global.cache.has(o)) {
              t.rules.global.cache.add(o);
              const r = [];
              Qt(n, [], [], e, (e) => r.push(e));
              const i = `@keyframes ${o}{${r.join("")}}`;
              t.rules.global.apply(i);
            }
            return o;
          };
        return At(r, {
          get name() {
            return r();
          },
          toString: r,
        });
      }),
    xn = class {
      constructor(e, t, n, o) {
        (this.token = null == e ? "" : String(e)),
          (this.value = null == t ? "" : String(t)),
          (this.scale = null == n ? "" : String(n)),
          (this.prefix = null == o ? "" : String(o));
      }
      get computedValue() {
        return "var(" + this.variable + ")";
      }
      get variable() {
        return "--" + Gt(this.prefix) + Gt(this.scale) + this.token;
      }
      toString() {
        return this.computedValue;
      }
    },
    yn = Wt(),
    vn = (e, t) =>
      yn(e, () => (n, o) => {
        o = ("object" == typeof n && n) || Object(o);
        const r = `.${(n =
            (n = "string" == typeof n ? n : "") ||
            `${Gt(e.prefix)}t-${tn(o)}`)}`,
          i = {},
          l = [];
        for (const t in o) {
          i[t] = {};
          for (const n in o[t]) {
            const r = `--${Gt(e.prefix)}${t}-${n}`,
              s = Xt(String(o[t][n]), e.prefix, t);
            (i[t][n] = new xn(n, s, t, e.prefix)), l.push(`${r}:${s}`);
          }
        }
        const s = () => {
          if (l.length && !t.rules.themed.cache.has(n)) {
            t.rules.themed.cache.add(n);
            const r = `${o === e.theme ? ":root," : ""}.${n}{${l.join(";")}}`;
            t.rules.themed.apply(r);
          }
          return n;
        };
        return {
          ...i,
          get className() {
            return s();
          },
          selector: r,
          toString: s,
        };
      }),
    wn = Wt();
  const {
      css: kn,
      globalCss: Sn,
      keyframes: zn,
      getCssText: _n,
      theme: In,
      createTheme: jn,
      config: Bn,
      reset: Tn,
    } = ((e) => {
      let t = !1;
      const n = wn(e, (e) => {
        t = !0;
        const n =
            "prefix" in (e = ("object" == typeof e && e) || {})
              ? String(e.prefix)
              : "",
          o = ("object" == typeof e.media && e.media) || {},
          r =
            "object" == typeof e.root
              ? e.root || null
              : globalThis.document || null,
          i = ("object" == typeof e.theme && e.theme) || {},
          l = {
            prefix: n,
            media: o,
            theme: i,
            themeMap: ("object" == typeof e.themeMap && e.themeMap) || {
              ...Mt,
            },
            utils: ("object" == typeof e.utils && e.utils) || {},
          },
          s = rn(r),
          a = {
            css: cn(l, s),
            globalCss: bn(l, s),
            keyframes: $n(l, s),
            createTheme: vn(l, s),
            reset() {
              s.reset(), a.theme.toString();
            },
            theme: {},
            sheet: s,
            config: l,
            prefix: n,
            getCssText: s.toString,
            toString: s.toString,
          };
        return String((a.theme = a.createTheme(i))), a;
      });
      return t || n.reset(), n;
    })({
      prefix: "svelteui",
      theme: {
        colors: kt,
        space: {
          0: "0rem",
          xs: 10,
          sm: 12,
          md: 16,
          lg: 20,
          xl: 24,
          xsPX: "10px",
          smPX: "12px",
          mdPX: "16px",
          lgPX: "20px",
          xlPX: "24px",
          1: "0.125rem",
          2: "0.25rem",
          3: "0.375rem",
          4: "0.5rem",
          5: "0.625rem",
          6: "0.75rem",
          7: "0.875rem",
          8: "1rem",
          9: "1.25rem",
          10: "1.5rem",
          11: "1.75rem",
          12: "2rem",
          13: "2.25rem",
          14: "2.5rem",
          15: "2.75rem",
          16: "3rem",
          17: "3.5rem",
          18: "4rem",
          20: "5rem",
          24: "6rem",
          28: "7rem",
          32: "8rem",
          36: "9rem",
          40: "10rem",
          44: "11rem",
          48: "12rem",
          52: "13rem",
          56: "14rem",
          60: "15rem",
          64: "16rem",
          72: "18rem",
          80: "20rem",
          96: "24rem",
        },
        fontSizes: {
          xs: "12px",
          sm: "14px",
          md: "16px",
          lg: "18px",
          xl: "20px",
        },
        fonts: {
          standard:
            "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji",
          mono: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace",
          fallback: "Segoe UI, system-ui, sans-serif",
        },
        fontWeights: {
          thin: 100,
          extralight: 200,
          light: 300,
          normal: 400,
          medium: 500,
          semibold: 600,
          bold: 700,
          extrabold: 800,
        },
        lineHeights: { xs: 1, sm: 1.25, md: 1.5, lg: 1.625, xl: 1.75 },
        letterSpacings: {
          tighter: "-0.05em",
          tight: "-0.025em",
          normal: "0",
          wide: "0.025em",
          wider: "0.05em",
          widest: "0.1em",
        },
        sizes: {},
        radii: {
          xs: "2px",
          sm: "4px",
          md: "8px",
          lg: "16px",
          xl: "32px",
          squared: "33%",
          rounded: "50%",
          pill: "9999px",
        },
        shadows: {
          xs: "0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.1)",
          sm: "0 1px 3px rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0px 10px 15px -5px, rgba(0, 0, 0, 0.04) 0px 7px 7px -5px",
          md: "0 1px 3px rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px",
          lg: "0 1px 3px rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0px 28px 23px -7px, rgba(0, 0, 0, 0.04) 0px 12px 12px -7px",
          xl: "0 1px 3px rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0px 36px 28px -7px, rgba(0, 0, 0, 0.04) 0px 17px 17px -7px",
        },
        zIndices: {
          1: "100",
          2: "200",
          3: "300",
          4: "400",
          5: "500",
          10: "1000",
          max: "9999",
        },
        borderWidths: {
          light: "1px",
          normal: "2px",
          bold: "3px",
          extrabold: "4px",
          black: "5px",
          xs: "1px",
          sm: "2px",
          md: "3px",
          lg: "4px",
          xl: "5px",
        },
        breakpoints: { xs: 576, sm: 768, md: 992, lg: 1200, xl: 1400 },
        borderStyles: {},
        transitions: {},
      },
      media: {
        xs: "(min-width: 576px)",
        sm: "(min-width: 768px)",
        md: "(min-width: 992px)",
        lg: "(min-width: 1200px)",
        xl: "(min-width: 1400px)",
      },
      utils: {
        focusRing: (e) => ({
          WebkitTapHighlightColor: "transparent",
          "&:focus": {
            outlineOffset: 2,
            outline:
              "always" === e || "auto" === e ? "2px solid $primary" : "none",
          },
          "&:focus:not(:focus-visible)": {
            outline: "auto" === e || "never" === e ? "none" : void 0,
          },
        }),
        p: (e) => ({ padding: e }),
        pt: (e) => ({ paddingTop: e }),
        pr: (e) => ({ paddingRight: e }),
        pb: (e) => ({ paddingBottom: e }),
        pl: (e) => ({ paddingLeft: e }),
        px: (e) => ({ paddingLeft: e, paddingRight: e }),
        py: (e) => ({ paddingTop: e, paddingBottom: e }),
        m: (e) => ({ margin: e }),
        mt: (e) => ({ marginTop: e }),
        mr: (e) => ({ marginRight: e }),
        mb: (e) => ({ marginBottom: e }),
        ml: (e) => ({ marginLeft: e }),
        mx: (e) => ({ marginLeft: e, marginRight: e }),
        my: (e) => ({ marginTop: e, marginBottom: e }),
        ta: (e) => ({ textAlign: e }),
        tt: (e) => ({ textTransform: e }),
        to: (e) => ({ textOverflow: e }),
        d: (e) => ({ display: e }),
        dflex: (e) => ({ display: "flex", alignItems: e, justifyContent: e }),
        fd: (e) => ({ flexDirection: e }),
        fw: (e) => ({ flexWrap: e }),
        ai: (e) => ({ alignItems: e }),
        ac: (e) => ({ alignContent: e }),
        jc: (e) => ({ justifyContent: e }),
        as: (e) => ({ alignSelf: e }),
        fg: (e) => ({ flexGrow: e }),
        fs: (e) => ({ fontSize: e }),
        fb: (e) => ({ flexBasis: e }),
        bc: (e) => ({ backgroundColor: e }),
        bf: (e) => ({ backdropFilter: e }),
        bg: (e) => ({ background: e }),
        bgBlur: (e) => ({ bf: "saturate(180%) blur(10px)", bg: e }),
        bgColor: (e) => ({ backgroundColor: e }),
        backgroundClip: (e) => ({ WebkitBackgroundClip: e, backgroundClip: e }),
        bgClip: (e) => ({ WebkitBackgroundClip: e, backgroundClip: e }),
        br: (e) => ({ borderRadius: e }),
        bw: (e) => ({ borderWidth: e }),
        btrr: (e) => ({ borderTopRightRadius: e }),
        bbrr: (e) => ({ borderBottomRightRadius: e }),
        bblr: (e) => ({ borderBottomLeftRadius: e }),
        btlr: (e) => ({ borderTopLeftRadius: e }),
        bs: (e) => ({ boxShadow: e }),
        normalShadow: (e) => ({ boxShadow: `0 4px 14px 0 $${e}` }),
        lh: (e) => ({ lineHeight: e }),
        ov: (e) => ({ overflow: e }),
        ox: (e) => ({ overflowX: e }),
        oy: (e) => ({ overflowY: e }),
        pe: (e) => ({ pointerEvents: e }),
        events: (e) => ({ pointerEvents: e }),
        us: (e) => ({ WebkitUserSelect: e, userSelect: e }),
        userSelect: (e) => ({ WebkitUserSelect: e, userSelect: e }),
        w: (e) => ({ width: e }),
        h: (e) => ({ height: e }),
        minW: (e) => ({ minWidth: e }),
        minH: (e) => ({ minWidth: e }),
        mw: (e) => ({ maxWidth: e }),
        maxW: (e) => ({ maxWidth: e }),
        mh: (e) => ({ maxHeight: e }),
        maxH: (e) => ({ maxHeight: e }),
        size: (e) => ({ width: e, height: e }),
        minSize: (e) => ({ minWidth: e, minHeight: e, width: e, height: e }),
        sizeMin: (e) => ({ minWidth: e, minHeight: e, width: e, height: e }),
        maxSize: (e) => ({ maxWidth: e, maxHeight: e }),
        sizeMax: (e) => ({ maxWidth: e, maxHeight: e }),
        appearance: (e) => ({ WebkitAppearance: e, appearance: e }),
        scale: (e) => ({ transform: `scale(${e})` }),
        linearGradient: (e) => ({ backgroundImage: `linear-gradient(${e})` }),
        tdl: (e) => ({ textDecorationLine: e }),
        textGradient: (e) => ({
          backgroundImage: `linear-gradient(${e})`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }),
      },
      themeMap: {
        ...Mt,
        width: "space",
        height: "space",
        minWidth: "space",
        maxWidth: "space",
        minHeight: "space",
        maxHeight: "space",
        flexBasis: "space",
        gridTemplateColumns: "space",
        gridTemplateRows: "space",
        blockSize: "space",
        minBlockSize: "space",
        maxBlockSize: "space",
        inlineSize: "space",
        minInlineSize: "space",
        maxInlineSize: "space",
        borderWidth: "borderWeights",
      },
    }),
    Cn = jn("dark-theme", {
      colors: kt,
      shadows: {
        xs: "-4px 0 15px rgb(0 0 0 / 50%)",
        sm: "0 5px 20px -5px rgba(20, 20, 20, 0.1)",
        md: "0 8px 30px rgba(20, 20, 20, 0.15)",
        lg: "0 30px 60px rgba(20, 20, 20, 0.15)",
        xl: "0 40px 80px rgba(20, 20, 20, 0.25)",
      },
    });
  Sn({
    a: { focusRing: "auto" },
    body: {
      [`${Cn.selector} &`]: { backgroundColor: "$dark700", color: "$dark50" },
      backgroundColor: "$white",
      color: "$black",
    },
  }),
    Sn({
      html: {
        fontFamily: "sans-serif",
        lineHeight: "1.15",
        textSizeAdjust: "100%",
        margin: 0,
      },
      body: { margin: 0 },
      "article, aside, footer, header, nav, section, figcaption, figure, main":
        { display: "block" },
      h1: { fontSize: "2em", margin: 0 },
      hr: { boxSizing: "content-box", height: 0, overflow: "visible" },
      pre: { fontFamily: "monospace, monospace", fontSize: "1em" },
      a: { background: "transparent", textDecorationSkip: "objects" },
      "a:active, a:hover": { outlineWidth: 0 },
      "abbr[title]": { borderBottom: "none", textDecoration: "underline" },
      "b, strong": { fontWeight: "bolder" },
      "code, kbp, samp": {
        fontFamily: "monospace, monospace",
        fontSize: "1em",
      },
      dfn: { fontStyle: "italic" },
      mark: { backgroundColor: "#ff0", color: "#000" },
      small: { fontSize: "80%" },
      "sub, sup": {
        fontSize: "75%",
        lineHeight: 0,
        position: "relative",
        verticalAlign: "baseline",
      },
      sup: { top: "-0.5em" },
      sub: { bottom: "-0.25em" },
      "audio, video": { display: "inline-block" },
      "audio:not([controls])": { display: "none", height: 0 },
      img: { borderStyle: "none", verticalAlign: "middle" },
      "svg:not(:root)": { overflow: "hidden" },
      "button, input, optgroup, select, textarea": {
        fontFamily: "sans-serif",
        fontSize: "100%",
        lineHeight: "1.15",
        margin: 0,
      },
      "button, input": { overflow: "visible" },
      "button, select": { textTransform: "none" },
      "button, [type=reset], [type=submit]": { WebkitAppearance: "button" },
      "button::-moz-focus-inner, [type=button]::-moz-focus-inner, [type=reset]::-moz-focus-inner, [type=submit]::-moz-focus-inner":
        { borderStyle: "none", padding: 0 },
      "button:-moz-focusring, [type=button]:-moz-focusring, [type=reset]:-moz-focusring, [type=submit]:-moz-focusring":
        { outline: "1px dotted ButtonText" },
      legend: {
        boxSizing: "border-box",
        color: "inherit",
        display: "table",
        maxWidth: "100%",
        padding: 0,
        whiteSpace: "normal",
      },
      progress: { display: "inline-block", verticalAlign: "baseline" },
      textarea: { overflow: "auto" },
      "[type=checkbox], [type=radio]": { boxSizing: "border-box", padding: 0 },
      "[type=number]::-webkit-inner-spin-button, [type=number]::-webkit-outer-spin-button":
        { height: "auto" },
      "[type=search]": { appearance: "textfield", outlineOffset: "-2px" },
      "[type=search]::-webkit-search-cancel-button, [type=search]::-webkit-search-decoration":
        { appearance: "none" },
      "::-webkit-file-upload-button": { appearance: "button", font: "inherit" },
      "details, menu": { display: "block" },
      summary: { display: "list-item" },
      canvas: { display: "inline-block" },
      template: { display: "none" },
      "[hidden]": { display: "none" },
    });
  const Mn = {
      mt: "marginTop",
      mb: "marginBottom",
      ml: "marginLeft",
      mr: "marginRight",
      pt: "paddingTop",
      pb: "paddingBottom",
      pl: "paddingLeft",
      pr: "paddingRight",
    },
    Rn = ["-xs", "-sm", "-md", "-lg", "-xl"];
  function Wn(e) {
    return "string" == typeof e || "number" == typeof e;
  }
  function Hn(e, t) {
    return Rn.includes(e)
      ? -1 * t.fn.size({ size: e.replace("-", ""), sizes: t.space })
      : t.fn.size({ size: e, sizes: t.space });
  }
  function An(e) {
    let t, o, r, s, a, c;
    const u = e[28].default,
      g = d(u, e, e[32], null);
    let b = [
        {
          class: (o = e[2] + " " + e[7]({ css: { ...e[11](e[10]), ...e[6] } })),
        },
        e[12],
      ],
      h = {};
    for (let e = 0; e < b.length; e += 1) h = n(h, b[e]);
    return {
      c() {
        (t = T("div")), g && g.c(), A(t, h);
      },
      m(n, o) {
        I(n, t, o),
          g && g.m(t, null),
          e[31](t),
          (s = !0),
          a ||
            ((c = [$(e[8].call(null, t)), $((r = at.call(null, t, e[1])))]),
            (a = !0));
      },
      p(e, n) {
        g &&
          g.p &&
          (!s || 2 & n[1]) &&
          f(g, u, e, e[32], s ? p(u, e[32], n, null) : m(e[32]), null),
          A(
            t,
            (h = he(b, [
              (!s ||
                (196 & n[0] &&
                  o !==
                    (o =
                      e[2] +
                      " " +
                      e[7]({ css: { ...e[11](e[10]), ...e[6] } })))) && {
                class: o,
              },
              4096 & n[0] && e[12],
            ]))
          ),
          r && l(r.update) && 2 & n[0] && r.update.call(null, e[1]);
      },
      i(e) {
        s || (pe(g, e), (s = !0));
      },
      o(e) {
        fe(g, e), (s = !1);
      },
      d(n) {
        n && j(t), g && g.d(n), e[31](null), (a = !1), i(c);
      },
    };
  }
  function En(e) {
    let t, o, r;
    const i = [
      { use: [e[8], [at, e[1]]] },
      { class: e[2] + " " + e[7]({ css: { ...e[11](e[10]), ...e[6] } }) },
      e[12],
    ];
    var l = e[3];
    function s(e) {
      let t = { $$slots: { default: [On] }, $$scope: { ctx: e } };
      for (let e = 0; e < i.length; e += 1) t = n(t, i[e]);
      return { props: t };
    }
    return (
      l && ((t = new l(s(e))), e[30](t)),
      {
        c() {
          t && xe(t.$$.fragment), (o = R());
        },
        m(e, n) {
          t && ye(t, e, n), I(e, o, n), (r = !0);
        },
        p(e, n) {
          const r =
            7622 & n[0]
              ? he(i, [
                  258 & n[0] && { use: [e[8], [at, e[1]]] },
                  3268 & n[0] && {
                    class:
                      e[2] + " " + e[7]({ css: { ...e[11](e[10]), ...e[6] } }),
                  },
                  4096 & n[0] && $e(e[12]),
                ])
              : {};
          if (
            (2 & n[1] && (r.$$scope = { dirty: n, ctx: e }), l !== (l = e[3]))
          ) {
            if (t) {
              de();
              const e = t;
              fe(e.$$.fragment, 1, 0, () => {
                ve(e, 1);
              }),
                ue();
            }
            l
              ? ((t = new l(s(e))),
                e[30](t),
                xe(t.$$.fragment),
                pe(t.$$.fragment, 1),
                ye(t, o.parentNode, o))
              : (t = null);
          } else l && t.$set(r);
        },
        i(e) {
          r || (t && pe(t.$$.fragment, e), (r = !0));
        },
        o(e) {
          t && fe(t.$$.fragment, e), (r = !1);
        },
        d(n) {
          e[30](null), n && j(o), t && ve(t, n);
        },
      }
    );
  }
  function Ln(e) {
    let t,
      n,
      o = e[9](),
      r = e[9]() && Pn(e);
    return {
      c() {
        r && r.c(), (t = R());
      },
      m(e, o) {
        r && r.m(e, o), I(e, t, o), (n = !0);
      },
      p(e, n) {
        e[9]()
          ? o
            ? s(o, e[9]())
              ? (r.d(1), (r = Pn(e)), r.c(), r.m(t.parentNode, t))
              : r.p(e, n)
            : ((r = Pn(e)), r.c(), r.m(t.parentNode, t))
          : o && (r.d(1), (r = null)),
          (o = e[9]());
      },
      i(e) {
        n || (pe(r), (n = !0));
      },
      o(e) {
        fe(r), (n = !1);
      },
      d(e) {
        e && j(t), r && r.d(e);
      },
    };
  }
  function On(e) {
    let t;
    const n = e[28].default,
      o = d(n, e, e[32], null);
    return {
      c() {
        o && o.c();
      },
      m(e, n) {
        o && o.m(e, n), (t = !0);
      },
      p(e, r) {
        o &&
          o.p &&
          (!t || 2 & r[1]) &&
          f(o, n, e, e[32], t ? p(n, e[32], r, null) : m(e[32]), null);
      },
      i(e) {
        t || (pe(o, e), (t = !0));
      },
      o(e) {
        fe(o, e), (t = !1);
      },
      d(e) {
        o && o.d(e);
      },
    };
  }
  function Pn(e) {
    let t, o, r, s, a, c, u;
    const g = e[28].default,
      b = d(g, e, e[32], null);
    let h = [
        {
          class: (o = e[2] + " " + e[7]({ css: { ...e[11](e[10]), ...e[6] } })),
        },
        e[12],
      ],
      x = {};
    for (let e = 0; e < h.length; e += 1) x = n(x, h[e]);
    return {
      c() {
        (t = T(e[9]())), b && b.c(), A(t, x);
      },
      m(n, o) {
        I(n, t, o),
          b && b.m(t, null),
          e[29](t),
          (a = !0),
          c ||
            ((u = [
              $((r = e[8].call(null, t))),
              $((s = at.call(null, t, e[1]))),
            ]),
            (c = !0));
      },
      p(e, n) {
        b &&
          b.p &&
          (!a || 2 & n[1]) &&
          f(b, g, e, e[32], a ? p(g, e[32], n, null) : m(e[32]), null),
          A(
            t,
            (x = he(h, [
              (!a ||
                (196 & n[0] &&
                  o !==
                    (o =
                      e[2] +
                      " " +
                      e[7]({ css: { ...e[11](e[10]), ...e[6] } })))) && {
                class: o,
              },
              4096 & n[0] && e[12],
            ]))
          ),
          s && l(s.update) && 2 & n[0] && s.update.call(null, e[1]);
      },
      i(e) {
        a || (pe(b, e), (a = !0));
      },
      o(e) {
        fe(b, e), (a = !1);
      },
      d(n) {
        n && j(t), b && b.d(n), e[29](null), (c = !1), i(u);
      },
    };
  }
  function Nn(e) {
    let t, n, o, r;
    const i = [Ln, En, An],
      l = [];
    function s(e, t) {
      return e[4] ? 0 : e[5] ? 1 : 2;
    }
    return (
      (t = s(e)),
      (n = l[t] = i[t](e)),
      {
        c() {
          n.c(), (o = R());
        },
        m(e, n) {
          l[t].m(e, n), I(e, o, n), (r = !0);
        },
        p(e, r) {
          let a = t;
          (t = s(e)),
            t === a
              ? l[t].p(e, r)
              : (de(),
                fe(l[a], 1, 1, () => {
                  l[a] = null;
                }),
                ue(),
                (n = l[t]),
                n ? n.p(e, r) : ((n = l[t] = i[t](e)), n.c()),
                pe(n, 1),
                n.m(o.parentNode, o));
        },
        i(e) {
          r || (pe(n), (r = !0));
        },
        o(e) {
          fe(n), (r = !1);
        },
        d(e) {
          l[t].d(e), e && j(o);
        },
      }
    );
  }
  function Dn(e, t, o) {
    let r, i;
    const l = [
      "use",
      "element",
      "class",
      "css",
      "root",
      "m",
      "my",
      "mx",
      "mt",
      "mb",
      "ml",
      "mr",
      "p",
      "py",
      "px",
      "pt",
      "pb",
      "pl",
      "pr",
    ];
    let s = b(t, l),
      { $$slots: a = {}, $$scope: c } = t,
      {
        use: d = [],
        element: u,
        class: p = "",
        css: f = {},
        root: m,
        m: h,
        my: $,
        mx: x,
        mt: y,
        mb: v,
        ml: w,
        mr: k,
        p: S,
        py: z,
        px: _,
        pt: I,
        pb: j,
        pl: B,
        pr: T,
      } = t;
    const C = (function (e, t = []) {
        let n;
        const o = [];
        function r(t) {
          !(function (e, t) {
            const n = e.$$.callbacks[t.type];
            n && n.slice().forEach((e) => e.call(this, t));
          })(e, t);
        }
        return (
          (e.$on = (r, i) => {
            const l = r;
            let s = () => {};
            for (const n of t) {
              if ("string" == typeof n && n === l) {
                const t = e.$$.callbacks[l] || (e.$$.callbacks[l] = []);
                return (
                  t.push(i),
                  () => {
                    const e = t.indexOf(i);
                    -1 !== e && t.splice(e, 1);
                  }
                );
              }
              if ("object" == typeof n && n.name === l) {
                const e = i;
                i = (...t) => {
                  ("object" == typeof n && n.shouldExclude()) || e(...t);
                };
              }
            }
            return (
              n ? (s = n(l, i)) : o.push([l, i]),
              () => {
                s();
              }
            );
          }),
          (e) => {
            const t = [],
              i = {};
            n = (n, o) => {
              let l = n,
                s = o,
                a = !1;
              if (l.match(ct)) {
                const e = l.split("!");
                l = e[0];
                const t = Object.fromEntries(e.slice(1).map((e) => [e, !0]));
                t.passive && ((a = a || {}), (a.passive = !0)),
                  t.nonpassive && ((a = a || {}), (a.passive = !1)),
                  t.capture && ((a = a || {}), (a.capture = !0)),
                  t.once && ((a = a || {}), (a.once = !0)),
                  t.preventDefault &&
                    ((c = s),
                    (s = function (e) {
                      return e.preventDefault(), c.call(this, e);
                    })),
                  t.stopPropagation &&
                    (s = (function (e) {
                      return function (t) {
                        return t.stopPropagation(), e.call(this, t);
                      };
                    })(s));
              }
              var c;
              const d = W(e, l, s, a),
                u = () => {
                  d();
                  const e = t.indexOf(u);
                  e > -1 && t.splice(e, 1);
                };
              return t.push(u), l in i || (i[l] = W(e, l, r)), u;
            };
            for (let e = 0; e < o.length; e++) n(o[e][0], o[e][1]);
            return {
              destroy: () => {
                for (let e = 0; e < t.length; e++) t[e]();
                for (const e of Object.entries(i)) e[1]();
              },
            };
          }
        );
      })(q()),
      M = pt()?.theme || gt(),
      R = "function" == typeof f ? f : () => f;
    let H, A;
    return (
      (e.$$set = (e) => {
        (t = n(n({}, t), g(e))),
          o(12, (s = b(t, l))),
          "use" in e && o(1, (d = e.use)),
          "element" in e && o(0, (u = e.element)),
          "class" in e && o(2, (p = e.class)),
          "css" in e && o(13, (f = e.css)),
          "root" in e && o(3, (m = e.root)),
          "m" in e && o(14, (h = e.m)),
          "my" in e && o(15, ($ = e.my)),
          "mx" in e && o(16, (x = e.mx)),
          "mt" in e && o(17, (y = e.mt)),
          "mb" in e && o(18, (v = e.mb)),
          "ml" in e && o(19, (w = e.ml)),
          "mr" in e && o(20, (k = e.mr)),
          "p" in e && o(21, (S = e.p)),
          "py" in e && o(22, (z = e.py)),
          "px" in e && o(23, (_ = e.px)),
          "pt" in e && o(24, (I = e.pt)),
          "pb" in e && o(25, (j = e.pb)),
          "pl" in e && o(26, (B = e.pl)),
          "pr" in e && o(27, (T = e.pr)),
          "$$scope" in e && o(32, (c = e.$$scope));
      }),
      (e.$$.update = () => {
        8 & e.$$.dirty[0] &&
          (o(4, (H = m && "string" == typeof m)),
          o(5, (A = m && "function" == typeof m))),
          268419072 & e.$$.dirty[0] &&
            o(
              6,
              (i = (function (e, t) {
                const n = {};
                if (Wn(e.p)) {
                  const o = Hn(e.p, t);
                  n.padding = o;
                }
                if (Wn(e.m)) {
                  const o = Hn(e.m, t);
                  n.margin = o;
                }
                if (Wn(e.py)) {
                  const o = Hn(e.py, t);
                  (n.paddingTop = o), (n.paddingBottom = o);
                }
                if (Wn(e.px)) {
                  const o = Hn(e.px, t);
                  (n.paddingLeft = o), (n.paddingRight = o);
                }
                if (Wn(e.my)) {
                  const o = Hn(e.my, t);
                  (n.marginTop = o), (n.marginBottom = o);
                }
                if (Wn(e.mx)) {
                  const o = Hn(e.mx, t);
                  (n.marginLeft = o), (n.marginRight = o);
                }
                return (
                  Object.keys(Mn).forEach((o) => {
                    Wn(e[o]) &&
                      (n[Mn[o]] = t.fn.size({
                        size: Hn(e[o], t),
                        sizes: t.space,
                      }));
                  }),
                  n
                );
              })(
                {
                  m: h,
                  my: $,
                  mx: x,
                  mt: y,
                  mb: v,
                  ml: w,
                  mr: k,
                  p: S,
                  py: z,
                  px: _,
                  pt: I,
                  pb: j,
                  pl: B,
                  pr: T,
                },
                M
              ))
            );
      }),
      o(7, (r = kn({}))),
      [
        u,
        d,
        p,
        m,
        H,
        A,
        i,
        r,
        C,
        () => m,
        M,
        R,
        s,
        f,
        h,
        $,
        x,
        y,
        v,
        w,
        k,
        S,
        z,
        _,
        I,
        j,
        B,
        T,
        a,
        function (e) {
          J[e ? "unshift" : "push"](() => {
            (u = e), o(0, u);
          });
        },
        function (e) {
          J[e ? "unshift" : "push"](() => {
            (u = e), o(0, u);
          });
        },
        function (e) {
          J[e ? "unshift" : "push"](() => {
            (u = e), o(0, u);
          });
        },
        c,
      ]
    );
  }
  var Vn = class extends ke {
      constructor(e) {
        super(),
          we(
            this,
            e,
            Dn,
            Nn,
            s,
            {
              use: 1,
              element: 0,
              class: 2,
              css: 13,
              root: 3,
              m: 14,
              my: 15,
              mx: 16,
              mt: 17,
              mb: 18,
              ml: 19,
              mr: 20,
              p: 21,
              py: 22,
              px: 23,
              pt: 24,
              pb: 25,
              pl: 26,
              pr: 27,
            },
            null,
            [-1, -1]
          );
      }
    },
    Fn = (function (e) {
      const t = "function" == typeof e ? e : () => e;
      return function (e = {}, n) {
        const o = pt()?.theme || gt(),
          { cx: r } = It(),
          { override: i } = n || {},
          l = t(o, e, jt),
          s = Object.assign({}, l);
        !(function (e, t, n) {
          Object.keys(e).map((n) => {
            "variants" !== n &&
              ("ref" in e[n] && e[n].ref,
              "darkMode" in e[n] && (e[n][`${t.dark} &`] = e[n].darkMode),
              (e[`& .${n}`] = e[n]),
              delete e[n]);
          }),
            delete e["& .root"];
        })(s, o);
        const { root: a } = l,
          c = void 0 !== a ? { ...a, ...s } : l,
          d = kn(c),
          u = (function (e) {
            const t = {};
            return (
              Object.keys(e).forEach((n) => {
                const [o, r] = e[n];
                t[o] = r;
              }),
              t
            );
          })(
            Object.keys(l).map((e) => {
              let t = e.toString();
              return "root" === e && (t = d({ css: i }).toString()), [e, t];
            })
          );
        return { cx: r, theme: o, classes: u, getStyles: kn(c) };
      };
    })((e, { cols: t, spacing: n, gridBreakpoints: o }) => ({
      root: {
        boxSizing: "border-box",
        display: "grid",
        gridTemplateColumns: `repeat(${t}, minmax(0, 1fr))`,
        gap: e.fn.size({ size: n, sizes: e.space }),
        ...o,
      },
    }));
  const Yn = {
    spacing: { xs: 10, sm: 12, md: 16, lg: 20, xl: 24 },
    breakpoints: { xs: 576, sm: 768, md: 992, lg: 1200, xl: 1400 },
  };
  function qn(e) {
    return "number" == typeof e.size
      ? e.size
      : e.sizes[e.size] || e.size || e.sizes.md;
  }
  function Gn(e) {
    let t;
    const n = e[11].default,
      o = d(n, e, e[13], null);
    return {
      c() {
        o && o.c();
      },
      m(e, n) {
        o && o.m(e, n), (t = !0);
      },
      p(e, r) {
        o &&
          o.p &&
          (!t || 8192 & r) &&
          f(o, n, e, e[13], t ? p(n, e[13], r, null) : m(e[13]), null);
      },
      i(e) {
        t || (pe(o, e), (t = !0));
      },
      o(e) {
        fe(o, e), (t = !1);
      },
      d(e) {
        o && o.d(e);
      },
    };
  }
  function Xn(e) {
    let t, o, r;
    const i = [{ use: e[1] }, { class: e[5](e[2], e[4]({ css: e[3] })) }, e[6]];
    function l(t) {
      e[12](t);
    }
    let s = { $$slots: { default: [Gn] }, $$scope: { ctx: e } };
    for (let e = 0; e < i.length; e += 1) s = n(s, i[e]);
    return (
      void 0 !== e[0] && (s.element = e[0]),
      (t = new Vn({ props: s })),
      J.push(() =>
        (function (e, t, n) {
          const o = e.$$.props[t];
          void 0 !== o && ((e.$$.bound[o] = n), n(e.$$.ctx[o]));
        })(t, "element", l)
      ),
      {
        c() {
          xe(t.$$.fragment);
        },
        m(e, n) {
          ye(t, e, n), (r = !0);
        },
        p(e, [n]) {
          const r =
            126 & n
              ? he(i, [
                  2 & n && { use: e[1] },
                  60 & n && { class: e[5](e[2], e[4]({ css: e[3] })) },
                  64 & n && $e(e[6]),
                ])
              : {};
          var l;
          8192 & n && (r.$$scope = { dirty: n, ctx: e }),
            !o &&
              1 & n &&
              ((o = !0), (r.element = e[0]), (l = () => (o = !1)), Q.push(l)),
            t.$set(r);
        },
        i(e) {
          r || (pe(t.$$.fragment, e), (r = !0));
        },
        o(e) {
          fe(t.$$.fragment, e), (r = !1);
        },
        d(e) {
          ve(t, e);
        },
      }
    );
  }
  function Jn(e, t, o) {
    let r, i, l;
    const s = [
      "use",
      "element",
      "class",
      "override",
      "breakpoints",
      "cols",
      "spacing",
    ];
    let a = b(t, s),
      { $$slots: c = {}, $$scope: d } = t,
      {
        use: u = [],
        element: p,
        class: f = "",
        override: m = {},
        breakpoints: h = [],
        cols: $ = 1,
        spacing: x = "md",
      } = t;
    return (
      (e.$$set = (e) => {
        (t = n(n({}, t), g(e))),
          o(6, (a = b(t, s))),
          "use" in e && o(1, (u = e.use)),
          "element" in e && o(0, (p = e.element)),
          "class" in e && o(2, (f = e.class)),
          "override" in e && o(3, (m = e.override)),
          "breakpoints" in e && o(7, (h = e.breakpoints)),
          "cols" in e && o(8, ($ = e.cols)),
          "spacing" in e && o(9, (x = e.spacing)),
          "$$scope" in e && o(13, (d = e.$$scope));
      }),
      (e.$$.update = () => {
        640 & e.$$.dirty &&
          o(
            10,
            (r = (function (e, t) {
              if (0 === t.length) return t;
              const n = "maxWidth" in t[0] ? "maxWidth" : "minWidth",
                o = [...t].sort(
                  (t, o) =>
                    qn({ size: o[n], sizes: e.breakpoints }) -
                    qn({ size: t[n], sizes: e.breakpoints })
                );
              return "minWidth" === n ? o.reverse() : o;
            })(Yn, h).reduce((e, t) => {
              const n = "maxWidth" in t ? "max-width" : "min-width";
              return (
                (e[
                  `@media (${n}: ${
                    qn({
                      size: "max-width" === n ? t.maxWidth : t.minWidth,
                      sizes: Yn.breakpoints,
                    }) + ("max-width" === n ? 0 : 1)
                  }px)`
                ] = {
                  gridTemplateColumns: `repeat(${t.cols}, minmax(0, 1fr))`,
                  gap: qn({ size: t.spacing || x, sizes: Yn.spacing }),
                }),
                e
              );
            }, {}))
          ),
          1792 & e.$$.dirty &&
            o(
              5,
              ({ cx: i, getStyles: l } = Fn({
                cols: $,
                spacing: x,
                gridBreakpoints: r,
              })),
              i,
              (o(4, l), o(8, $), o(9, x), o(10, r), o(7, h))
            );
      }),
      [
        p,
        u,
        f,
        m,
        l,
        i,
        a,
        h,
        $,
        x,
        r,
        c,
        function (e) {
          (p = e), o(0, p);
        },
        d,
      ]
    );
  }
  var Un = class extends ke {
    constructor(e) {
      super(),
        we(this, e, Jn, Xn, s, {
          use: 1,
          element: 0,
          class: 2,
          override: 3,
          breakpoints: 7,
          cols: 8,
          spacing: 9,
        });
    }
  };
  function Qn(e, t, n) {
    const o = e.slice();
    return (
      (o[2] = t[n].imgurl),
      (o[3] = t[n].title),
      (o[4] = t[n].subtitle),
      (o[5] = t[n].points),
      (o[6] = t[n].logoColor),
      o
    );
  }
  function Kn(t) {
    let n, o;
    return (
      (n = new st({
        props: {
          imgurl: t[2],
          title: t[3],
          subtitle: t[4],
          points: t[5],
          logoColor: t[6],
        },
      })),
      {
        c() {
          xe(n.$$.fragment);
        },
        m(e, t) {
          ye(n, e, t), (o = !0);
        },
        p: e,
        i(e) {
          o || (pe(n.$$.fragment, e), (o = !0));
        },
        o(e) {
          fe(n.$$.fragment, e), (o = !1);
        },
        d(e) {
          ve(n, e);
        },
      }
    );
  }
  function Zn(e) {
    let t,
      n,
      o = e[0],
      r = [];
    for (let t = 0; t < o.length; t += 1) r[t] = Kn(Qn(e, o, t));
    const i = (e) =>
      fe(r[e], 1, 1, () => {
        r[e] = null;
      });
    return {
      c() {
        for (let e = 0; e < r.length; e += 1) r[e].c();
        t = R();
      },
      m(e, o) {
        for (let t = 0; t < r.length; t += 1) r[t].m(e, o);
        I(e, t, o), (n = !0);
      },
      p(e, n) {
        if (1 & n) {
          let l;
          for (o = e[0], l = 0; l < o.length; l += 1) {
            const i = Qn(e, o, l);
            r[l]
              ? (r[l].p(i, n), pe(r[l], 1))
              : ((r[l] = Kn(i)),
                r[l].c(),
                pe(r[l], 1),
                r[l].m(t.parentNode, t));
          }
          for (de(), l = o.length; l < r.length; l += 1) i(l);
          ue();
        }
      },
      i(e) {
        if (!n) {
          for (let e = 0; e < o.length; e += 1) pe(r[e]);
          n = !0;
        }
      },
      o(e) {
        r = r.filter(Boolean);
        for (let e = 0; e < r.length; e += 1) fe(r[e]);
        n = !1;
      },
      d(e) {
        B(r, e), e && j(t);
      },
    };
  }
  function eo(e) {
    let t, n, o, r, i, l;
    return (
      (i = new Un({
        props: { cols: 2, $$slots: { default: [Zn] }, $$scope: { ctx: e } },
      })),
      {
        c() {
          (t = T("div")),
            (n = T("h1")),
            (n.textContent = "Career"),
            (o = M()),
            (r = T("div")),
            xe(i.$$.fragment),
            H(n, "class", "title col-md-9"),
            H(r, "id", "card-list-container"),
            H(r, "class", "card container-fluid col-md-9 svelte-1ciet3r"),
            H(t, "id", "career"),
            H(t, "class", "container-fluid col-sm-10 col-sm-1 svelte-1ciet3r");
        },
        m(e, s) {
          I(e, t, s), S(t, n), S(t, o), S(t, r), ye(i, r, null), (l = !0);
        },
        p(e, [t]) {
          const n = {};
          512 & t && (n.$$scope = { dirty: t, ctx: e }), i.$set(n);
        },
        i(e) {
          l || (pe(i.$$.fragment, e), (l = !0));
        },
        o(e) {
          fe(i.$$.fragment, e), (l = !1);
        },
        d(e) {
          e && j(t), ve(i);
        },
      }
    );
  }
  function to(e) {
    class t {
      constructor(e, t, n, o, r) {
        Object.assign(this, {
          imgurl: e,
          title: t,
          subtitle: n,
          points: o,
          logoColor: r,
        });
      }
    }
    return [
      [
        new t(
          "images/03-career/white/360insights.png",
          "Full Stack Developer",
          "360insights",
          [
            "Reduced debugging time by 10 mins",
            "Increased testing efficiency by 5%",
          ],
          getComputedStyle(document.querySelector(":root")).getPropertyValue(
            "--gradient-telegram"
          )
        ),
        new t(
          "images/03-career/white/npx.png",
          "Innovation Catalyst Intern",
          "Nuclear Promise X",
          [
            "Prevented data conflicts costing over a day in restructuring",
            "Reduced data reporting time to zero",
          ],
          getComputedStyle(document.querySelector(":root")).getPropertyValue(
            "--gradient-lunada"
          )
        ),
        new t(
          "images/03-career/white/quarter4.png",
          "Database Specialist",
          "Quarter4",
          ["Cleaned data, allowing model prediction accuracy to rise >75%"],
          getComputedStyle(document.querySelector(":root")).getPropertyValue(
            "--gradient-cosmic-fusion"
          )
        ),
        new t(
          "images/03-career/white/marsh.png",
          "Business Application Developer",
          "Marsh",
          ["Automated 1hr of daily reporting"],
          getComputedStyle(document.querySelector(":root")).getPropertyValue(
            "--gradient-amin"
          )
        ),
      ],
    ];
  }
  class no extends ke {
    constructor(e) {
      super(), we(this, e, to, eo, s, {});
    }
  }
  function oo(e, t, n) {
    const o = e.slice();
    return (o[4] = t[n]), o;
  }
  function ro(e) {
    let t, n, o;
    return {
      c() {
        (t = T("a")),
          (n = T("h4")),
          (o = C(e[0])),
          H(n, "class", "title svelte-l32xjt"),
          H(t, "href", e[1]),
          H(t, "class", "svelte-l32xjt");
      },
      m(e, r) {
        I(e, t, r), S(t, n), S(n, o);
      },
      p(e, n) {
        1 & n && E(o, e[0]), 2 & n && H(t, "href", e[1]);
      },
      d(e) {
        e && j(t);
      },
    };
  }
  function io(e) {
    let t, n;
    return {
      c() {
        (t = T("h4")), (n = C(e[0])), H(t, "class", "title svelte-l32xjt");
      },
      m(e, o) {
        I(e, t, o), S(t, n);
      },
      p(e, t) {
        1 & t && E(n, e[0]);
      },
      d(e) {
        e && j(t);
      },
    };
  }
  function lo(e) {
    let t,
      n,
      o = e[4] + "";
    return {
      c() {
        (t = T("div")), (n = C(o)), H(t, "class", "techstack svelte-l32xjt");
      },
      m(e, o) {
        I(e, t, o), S(t, n);
      },
      p(e, t) {
        8 & t && o !== (o = e[4] + "") && E(n, o);
      },
      d(e) {
        e && j(t);
      },
    };
  }
  function so(t) {
    let n, o, r, i, l, s, a, c;
    function d(e, t) {
      return "" === e[1] ? io : ro;
    }
    let u = d(t),
      p = u(t),
      f = t[3],
      m = [];
    for (let e = 0; e < f.length; e += 1) m[e] = lo(oo(t, f, e));
    return {
      c() {
        (n = T("div")),
          (o = T("div")),
          (r = T("div")),
          p.c(),
          (i = M()),
          (l = T("p")),
          (s = C(t[2])),
          (a = M()),
          (c = T("div"));
        for (let e = 0; e < m.length; e += 1) m[e].c();
        H(l, "class", "text"),
          H(c, "class", "row"),
          H(r, "class", "card-body svelte-l32xjt"),
          H(o, "class", "card m-2 cb1 text-center svelte-l32xjt"),
          H(n, "class", "div container-fluid svelte-l32xjt");
      },
      m(e, t) {
        I(e, n, t),
          S(n, o),
          S(o, r),
          p.m(r, null),
          S(r, i),
          S(r, l),
          S(l, s),
          S(r, a),
          S(r, c);
        for (let e = 0; e < m.length; e += 1) m[e].m(c, null);
      },
      p(e, [t]) {
        if (
          (u === (u = d(e)) && p
            ? p.p(e, t)
            : (p.d(1), (p = u(e)), p && (p.c(), p.m(r, i))),
          4 & t && E(s, e[2]),
          8 & t)
        ) {
          let n;
          for (f = e[3], n = 0; n < f.length; n += 1) {
            const o = oo(e, f, n);
            m[n] ? m[n].p(o, t) : ((m[n] = lo(o)), m[n].c(), m[n].m(c, null));
          }
          for (; n < m.length; n += 1) m[n].d(1);
          m.length = f.length;
        }
      },
      i: e,
      o: e,
      d(e) {
        e && j(n), p.d(), B(m, e);
      },
    };
  }
  function ao(e, t, n) {
    let { title: o, url: r, text: i, techstack: l } = t;
    return (
      (e.$$set = (e) => {
        "title" in e && n(0, (o = e.title)),
          "url" in e && n(1, (r = e.url)),
          "text" in e && n(2, (i = e.text)),
          "techstack" in e && n(3, (l = e.techstack));
      }),
      [o, r, i, l]
    );
  }
  class co extends ke {
    constructor(e) {
      super(),
        we(this, e, ao, so, s, { title: 0, url: 1, text: 2, techstack: 3 });
    }
  }
  function uo(e, t, n) {
    const o = e.slice();
    return (
      (o[3] = t[n].title),
      (o[4] = t[n].imgurl1),
      (o[5] = t[n].imgurl2),
      (o[6] = t[n].url),
      (o[7] = t[n].text),
      (o[8] = t[n].techstack),
      (o[10] = n),
      o
    );
  }
  function po(e) {
    let t, n, o, r, i, l, s, a, d, u;
    o = new co({
      props: { title: e[3], url: e[6], text: e[7], techstack: e[8] },
    });
    let p = (function (e, t) {
        return "" === e[6] ? go : mo;
      })(e),
      f = p(e);
    return {
      c() {
        (t = T("div")),
          (n = T("div")),
          xe(o.$$.fragment),
          (r = M()),
          (i = T("div")),
          (l = T("div")),
          f.c(),
          (s = M()),
          (a = T("img")),
          H(n, "class", "proj-description col-md-5 svelte-1ncmgno"),
          H(
            l,
            "class",
            "main-img-container-odd col-md-10 offset-md-2 main-img-container svelte-1ncmgno"
          ),
          H(a, "class", "card card-odd svelte-1ncmgno"),
          c(a.src, (d = e[5])) || H(a, "src", d),
          H(a, "alt", "project 2"),
          H(i, "class", "img-container col-md-7 svelte-1ncmgno"),
          H(t, "class", "row project-container svelte-1ncmgno");
      },
      m(e, c) {
        I(e, t, c),
          S(t, n),
          ye(o, n, null),
          S(t, r),
          S(t, i),
          S(i, l),
          f.m(l, null),
          S(i, s),
          S(i, a),
          (u = !0);
      },
      p(e, t) {
        f.p(e, t);
      },
      i(e) {
        u || (pe(o.$$.fragment, e), (u = !0));
      },
      o(e) {
        fe(o.$$.fragment, e), (u = !1);
      },
      d(e) {
        e && j(t), ve(o), f.d();
      },
    };
  }
  function fo(e) {
    let t, n, o, r, i, l, s, a, d, u;
    let p = (function (e, t) {
        return "" === e[6] ? ho : bo;
      })(e),
      f = p(e);
    return (
      (d = new co({
        props: { title: e[3], url: e[6], text: e[7], techstack: e[8] },
      })),
      {
        c() {
          (t = T("div")),
            (n = T("div")),
            (o = T("div")),
            f.c(),
            (r = M()),
            (i = T("img")),
            (s = M()),
            (a = T("div")),
            xe(d.$$.fragment),
            H(
              o,
              "class",
              "main-img-container-even col-md-10 main-img-container svelte-1ncmgno"
            ),
            H(i, "class", "card svelte-1ncmgno"),
            c(i.src, (l = e[5])) || H(i, "src", l),
            H(i, "alt", "project 2"),
            H(n, "class", "img-container col-md-7 svelte-1ncmgno"),
            H(a, "class", "proj-description col-md-5 svelte-1ncmgno"),
            H(t, "class", "row project-container svelte-1ncmgno");
        },
        m(e, l) {
          I(e, t, l),
            S(t, n),
            S(n, o),
            f.m(o, null),
            S(n, r),
            S(n, i),
            S(t, s),
            S(t, a),
            ye(d, a, null),
            (u = !0);
        },
        p(e, t) {
          f.p(e, t);
        },
        i(e) {
          u || (pe(d.$$.fragment, e), (u = !0));
        },
        o(e) {
          fe(d.$$.fragment, e), (u = !1);
        },
        d(e) {
          e && j(t), f.d(), ve(d);
        },
      }
    );
  }
  function mo(t) {
    let n, o, r;
    return {
      c() {
        (n = T("a")),
          (o = T("img")),
          H(o, "class", "main main-odd svelte-1ncmgno"),
          c(o.src, (r = t[4])) || H(o, "src", r),
          H(o, "alt", "project"),
          H(n, "href", t[6]),
          H(n, "class", "svelte-1ncmgno");
      },
      m(e, t) {
        I(e, n, t), S(n, o);
      },
      p: e,
      d(e) {
        e && j(n);
      },
    };
  }
  function go(t) {
    let n, o;
    return {
      c() {
        (n = T("img")),
          H(n, "class", "main main-odd svelte-1ncmgno"),
          c(n.src, (o = t[4])) || H(n, "src", o),
          H(n, "alt", "project");
      },
      m(e, t) {
        I(e, n, t);
      },
      p: e,
      d(e) {
        e && j(n);
      },
    };
  }
  function bo(t) {
    let n, o, r;
    return {
      c() {
        (n = T("a")),
          (o = T("img")),
          H(o, "class", "main svelte-1ncmgno"),
          c(o.src, (r = t[4])) || H(o, "src", r),
          H(o, "alt", "project"),
          H(n, "href", t[6]),
          H(n, "class", "svelte-1ncmgno");
      },
      m(e, t) {
        I(e, n, t), S(n, o);
      },
      p: e,
      d(e) {
        e && j(n);
      },
    };
  }
  function ho(t) {
    let n, o;
    return {
      c() {
        (n = T("img")),
          H(n, "class", "main svelte-1ncmgno"),
          c(n.src, (o = t[4])) || H(n, "src", o),
          H(n, "alt", "project");
      },
      m(e, t) {
        I(e, n, t);
      },
      p: e,
      d(e) {
        e && j(n);
      },
    };
  }
  function $o(e) {
    let t, n, o, r, i, l;
    const s = [fo, po],
      a = [];
    function c(e, t) {
      return e[10] % 2 == 0 || e[0] ? 0 : 1;
    }
    return (
      (t = c(e)),
      (n = a[t] = s[t](e)),
      {
        c() {
          n.c(), (o = M()), (r = T("br")), (i = T("br"));
        },
        m(e, n) {
          a[t].m(e, n), I(e, o, n), I(e, r, n), I(e, i, n), (l = !0);
        },
        p(e, r) {
          let i = t;
          (t = c(e)),
            t === i
              ? a[t].p(e, r)
              : (de(),
                fe(a[i], 1, 1, () => {
                  a[i] = null;
                }),
                ue(),
                (n = a[t]),
                n ? n.p(e, r) : ((n = a[t] = s[t](e)), n.c()),
                pe(n, 1),
                n.m(o.parentNode, o));
        },
        i(e) {
          l || (pe(n), (l = !0));
        },
        o(e) {
          fe(n), (l = !1);
        },
        d(e) {
          a[t].d(e), e && j(o), e && j(r), e && j(i);
        },
      }
    );
  }
  function xo(e) {
    let t,
      n,
      o = e[1],
      r = [];
    for (let t = 0; t < o.length; t += 1) r[t] = $o(uo(e, o, t));
    const i = (e) =>
      fe(r[e], 1, 1, () => {
        r[e] = null;
      });
    return {
      c() {
        for (let e = 0; e < r.length; e += 1) r[e].c();
        t = R();
      },
      m(e, o) {
        for (let t = 0; t < r.length; t += 1) r[t].m(e, o);
        I(e, t, o), (n = !0);
      },
      p(e, n) {
        if (3 & n) {
          let l;
          for (o = e[1], l = 0; l < o.length; l += 1) {
            const i = uo(e, o, l);
            r[l]
              ? (r[l].p(i, n), pe(r[l], 1))
              : ((r[l] = $o(i)),
                r[l].c(),
                pe(r[l], 1),
                r[l].m(t.parentNode, t));
          }
          for (de(), l = o.length; l < r.length; l += 1) i(l);
          ue();
        }
      },
      i(e) {
        if (!n) {
          for (let e = 0; e < o.length; e += 1) pe(r[e]);
          n = !0;
        }
      },
      o(e) {
        r = r.filter(Boolean);
        for (let e = 0; e < r.length; e += 1) fe(r[e]);
        n = !1;
      },
      d(e) {
        B(r, e), e && j(t);
      },
    };
  }
  function yo(e) {
    let t, n, o, r, i, l;
    return (
      (i = new Un({
        props: { cols: 1, $$slots: { default: [xo] }, $$scope: { ctx: e } },
      })),
      {
        c() {
          (t = T("div")),
            (n = T("h1")),
            (n.textContent = "Projects"),
            (o = M()),
            (r = T("div")),
            xe(i.$$.fragment),
            H(n, "class", "title col-md-9"),
            H(r, "class", "projects container-fluid col-md-9 svelte-1ncmgno"),
            H(t, "id", "projects"),
            H(
              t,
              "class",
              "container-fluid col-sm-10 offset-sm-1 svelte-1ncmgno"
            );
        },
        m(e, s) {
          I(e, t, s), S(t, n), S(t, o), S(t, r), ye(i, r, null), (l = !0);
        },
        p(e, [t]) {
          const n = {};
          2049 & t && (n.$$scope = { dirty: t, ctx: e }), i.$set(n);
        },
        i(e) {
          l || (pe(i.$$.fragment, e), (l = !0));
        },
        o(e) {
          fe(i.$$.fragment, e), (l = !1);
        },
        d(e) {
          e && j(t), ve(i);
        },
      }
    );
  }
  function vo(e, t, n) {
    let { boolMobileView: o = !1 } = t;
    class r {
      constructor(e, t, n, o, r, i) {
        Object.assign(this, {
          title: e,
          imgurl1: t,
          imgurl2: n,
          url: o,
          text: r,
          techstack: i,
        });
      }
    }
    let i = [
      new r(
        "SoulDog",
        "images/04-project/souldog.PNG",
        "images/04-project/souldogcard.PNG",
        "https://souldog.herokuapp.com",
        'Webapp linked to database designed to match abandoned dogs with new dog owners. Features include account creation, Google authentication, search, and posting. Awarded "top project of the class" in CS348: Database Systems.',
        ["Javascript", "React", "Node.JS", "Knex JS", "SQL"]
      ),
      new r(
        "Wumpus World",
        "images/04-project/wumpus.PNG",
        "images/04-project/wumpuscard.PNG",
        "",
        "Modeled rpg-like problem using reinforcement learning algorithms such as Q-Learning and SARSA. Each algorithm was paired with one strategy (e.g. greedy, softmax, etc...) to find the best combination for the problem.",
        ["Python"]
      ),
    ];
    return (
      (e.$$set = (e) => {
        "boolMobileView" in e && n(0, (o = e.boolMobileView));
      }),
      [o, i]
    );
  }
  class wo extends ke {
    constructor(e) {
      super(), we(this, e, vo, yo, s, { boolMobileView: 0 });
    }
  }
  const { window: ko } = be;
  function So(e, t, n) {
    const o = e.slice();
    return (o[14] = t[n]), o;
  }
  function zo(t) {
    let n, o;
    return {
      c() {
        (n = T("img")),
          H(n, "id", "parallax-" + t[14]),
          L(
            n,
            "transform",
            "translateY(" +
              Math.max(
                -t[1],
                (t[5] * t[14]) / (t[7].length - 1) -
                  (t[4] * (1 + t[6]) * t[14]) / (t[7].length - 1)
              ) +
              "px)"
          ),
          c(n.src, (o = "images/intro/0" + t[14] + ".png")) || H(n, "src", o),
          H(n, "alt", "parallax layer " + t[14]),
          H(n, "height", t[0]),
          H(n, "class", "svelte-88tktz");
      },
      m(e, t) {
        I(e, n, t);
      },
      p(e, t) {
        114 & t &&
          L(
            n,
            "transform",
            "translateY(" +
              Math.max(
                -e[1],
                (e[5] * e[14]) / (e[7].length - 1) -
                  (e[4] * (1 + e[6]) * e[14]) / (e[7].length - 1)
              ) +
              "px)"
          ),
          1 & t && H(n, "height", e[0]);
      },
      i: e,
      o: e,
      d(e) {
        e && j(n);
      },
    };
  }
  function _o(t) {
    let n, o;
    return {
      c() {
        (n = T("img")),
          H(n, "id", "parallax-" + t[14]),
          L(
            n,
            "transform",
            "translateY(" +
              Math.max(
                -t[1],
                (t[5] * t[14]) / (t[7].length - 1) -
                  (t[4] * (1 + t[6]) * t[14]) / (t[7].length - 1)
              ) +
              "px)"
          ),
          c(n.src, (o = "images/intro/00" + t[14] + ".png")) || H(n, "src", o),
          H(n, "alt", "parallax layer " + t[14]),
          H(n, "height", t[0]),
          H(n, "class", "svelte-88tktz");
      },
      m(e, t) {
        I(e, n, t);
      },
      p(e, t) {
        114 & t &&
          L(
            n,
            "transform",
            "translateY(" +
              Math.max(
                -e[1],
                (e[5] * e[14]) / (e[7].length - 1) -
                  (e[4] * (1 + e[6]) * e[14]) / (e[7].length - 1)
              ) +
              "px)"
          ),
          1 & t && H(n, "height", e[0]);
      },
      i: e,
      o: e,
      d(e) {
        e && j(n);
      },
    };
  }
  function Io(e) {
    let t,
      n,
      o,
      r,
      i,
      l,
      s,
      a,
      c,
      d,
      u,
      p,
      f,
      m,
      g,
      b,
      h,
      $,
      x,
      y,
      v = e[2].preamble + "",
      w = e[2].description + "";
    return (
      (l = new Be({
        props: {
          texts: e[2].texts,
          delay: 100,
          num_loops: 999,
          repeat_n_words: 1,
          blinker_iter_count: "infinite",
        },
      })),
      {
        c() {
          (t = T("div")),
            (n = T("div")),
            (o = C(v)),
            (r = M()),
            (i = T("div")),
            xe(l.$$.fragment),
            (s = M()),
            (a = T("div")),
            (c = C(w)),
            (d = M()),
            (u = T("div")),
            (p = T("div")),
            (p.innerHTML =
              '<a href="https://www.linkedin.com/in/tony-k-kwok/" class="svelte-88tktz"><i class="fa-brands fa-linkedin fa-md"></i></a>'),
            (f = M()),
            (m = T("div")),
            (g = T("a")),
            (b = T("button")),
            (b.textContent = "Say Hello"),
            ($ = M()),
            H(n, "class", "textLayer-preamble svelte-88tktz"),
            H(i, "class", "textLayer-title svelte-88tktz"),
            H(a, "class", "textLayer-description svelte-88tktz"),
            H(p, "class", "linkedin-container col-md-3 svelte-88tktz"),
            H(b, "class", "btn btn-grad btn-lg svelte-88tktz"),
            H(
              g,
              "href",
              (h = "mailto:tnrzk13@gmail.com?subject=" + e[2].subject)
            ),
            H(g, "id", "emailLink"),
            H(g, "class", "svelte-88tktz"),
            H(m, "class", "button-container-column col-md-9"),
            H(u, "class", "button-container row"),
            H(t, "id", "parallax-" + e[14]),
            H(t, "class", "textLayer svelte-88tktz"),
            L(
              t,
              "transform",
              "translateY(" + Math.max(-e[1], e[5] - e[4]) + "px)"
            ),
            H(t, "height", (x = e[0] + "px"));
        },
        m(e, h) {
          I(e, t, h),
            S(t, n),
            S(n, o),
            S(t, r),
            S(t, i),
            ye(l, i, null),
            S(t, s),
            S(t, a),
            S(a, c),
            S(t, d),
            S(t, u),
            S(u, p),
            S(u, f),
            S(u, m),
            S(m, g),
            S(g, b),
            S(t, $),
            (y = !0);
        },
        p(e, n) {
          (!y || 4 & n) && v !== (v = e[2].preamble + "") && E(o, v);
          const r = {};
          4 & n && (r.texts = e[2].texts),
            l.$set(r),
            (!y || 4 & n) && w !== (w = e[2].description + "") && E(c, w),
            (!y ||
              (4 & n &&
                h !==
                  (h = "mailto:tnrzk13@gmail.com?subject=" + e[2].subject))) &&
              H(g, "href", h),
            (!y || 50 & n) &&
              L(
                t,
                "transform",
                "translateY(" + Math.max(-e[1], e[5] - e[4]) + "px)"
              ),
            (!y || (1 & n && x !== (x = e[0] + "px"))) && H(t, "height", x);
        },
        i(e) {
          y || (pe(l.$$.fragment, e), (y = !0));
        },
        o(e) {
          fe(l.$$.fragment, e), (y = !1);
        },
        d(e) {
          e && j(t), ve(l);
        },
      }
    );
  }
  function jo(e) {
    let t, n, o, r;
    const i = [Io, _o, zo],
      l = [];
    return (
      (t = (function (e, t) {
        return e[14] === To ? 0 : e[14] < 10 ? 1 : 2;
      })(e)),
      (n = l[t] = i[t](e)),
      {
        c() {
          n.c(), (o = R());
        },
        m(e, n) {
          l[t].m(e, n), I(e, o, n), (r = !0);
        },
        p(e, t) {
          n.p(e, t);
        },
        i(e) {
          r || (pe(n), (r = !0));
        },
        o(e) {
          fe(n), (r = !1);
        },
        d(e) {
          l[t].d(e), e && j(o);
        },
      }
    );
  }
  function Bo(e) {
    let t,
      n,
      o,
      r,
      i,
      l = !1,
      s = () => {
        l = !1;
      };
    te(e[9]);
    let a = e[7],
      c = [];
    for (let t = 0; t < a.length; t += 1) c[t] = jo(So(e, a, t));
    const d = (e) =>
      fe(c[e], 1, 1, () => {
        c[e] = null;
      });
    return {
      c() {
        n = T("div");
        for (let e = 0; e < c.length; e += 1) c[e].c();
        H(n, "class", "parallax-container svelte-88tktz");
      },
      m(a, d) {
        I(a, n, d);
        for (let e = 0; e < c.length; e += 1) c[e].m(n, null);
        (o = !0),
          r ||
            ((i = W(ko, "scroll", () => {
              (l = !0), clearTimeout(t), (t = setTimeout(s, 100)), e[9]();
            })),
            (r = !0));
      },
      p(e, [o]) {
        if (
          (8 & o &&
            !l &&
            ((l = !0),
            clearTimeout(t),
            scrollTo(ko.pageXOffset, e[3]),
            (t = setTimeout(s, 100))),
          247 & o)
        ) {
          let t;
          for (a = e[7], t = 0; t < a.length; t += 1) {
            const r = So(e, a, t);
            c[t]
              ? (c[t].p(r, o), pe(c[t], 1))
              : ((c[t] = jo(r)), c[t].c(), pe(c[t], 1), c[t].m(n, null));
          }
          for (de(), t = a.length; t < c.length; t += 1) d(t);
          ue();
        }
      },
      i(e) {
        if (!o) {
          for (let e = 0; e < a.length; e += 1) pe(c[e]);
          o = !0;
        }
      },
      o(e) {
        c = c.filter(Boolean);
        for (let e = 0; e < c.length; e += 1) fe(c[e]);
        o = !1;
      },
      d(e) {
        e && j(n), B(c, e), (r = !1), i();
      },
    };
  }
  const To = 14;
  function Co(e, t, n) {
    let { containerHeight: o, contactYOffset: r } = t,
      { contactInfo: i } = t;
    const l = [...Array(15).keys()];
    let s,
      a,
      c,
      d,
      u,
      p = document.getElementById("contact");
    const f = () => {
      n(8, (s = p.offsetTop)),
        n(5, (d = o - r)),
        n(6, (u = r / o)),
        n(4, (c = Math.max(0, a - s)));
    };
    return (
      G(() => {
        f();
      }),
      (window.onresize = f()),
      (e.$$set = (e) => {
        "containerHeight" in e && n(0, (o = e.containerHeight)),
          "contactYOffset" in e && n(1, (r = e.contactYOffset)),
          "contactInfo" in e && n(2, (i = e.contactInfo));
      }),
      (e.$$.update = () => {
        264 & e.$$.dirty && n(4, (c = Math.max(0, a - s)));
      }),
      [
        o,
        r,
        i,
        a,
        c,
        d,
        u,
        l,
        s,
        function () {
          n(3, (a = ko.pageYOffset));
        },
      ]
    );
  }
  class Mo extends ke {
    constructor(e) {
      super(),
        we(this, e, Co, Bo, s, {
          containerHeight: 0,
          contactYOffset: 1,
          contactInfo: 2,
        });
    }
  }
  function Ro(e) {
    let t,
      n,
      o,
      r,
      i,
      l,
      s,
      a,
      c,
      d,
      u,
      p,
      f,
      m,
      g,
      b,
      h,
      $,
      x,
      y,
      v,
      w,
      k = e[0].preamble + "",
      z = e[0].description + "";
    return (
      (s = new Be({
        props: {
          texts: e[0].texts,
          delay: 100,
          num_loops: 999,
          repeat_n_words: 1,
          blinker_iter_count: "infinite",
        },
      })),
      {
        c() {
          (t = T("div")),
            (n = T("div")),
            (o = T("div")),
            (r = C(k)),
            (i = M()),
            (l = T("div")),
            xe(s.$$.fragment),
            (a = M()),
            (c = T("div")),
            (d = C(z)),
            (u = M()),
            (p = T("br")),
            (f = T("br")),
            (m = M()),
            (g = T("div")),
            (b = T("span")),
            (b.innerHTML =
              '<a href="https://www.linkedin.com/in/tony-k-kwok/" class="svelte-1s4q2ok"><i class="fa-brands fa-linkedin fa-lg"></i></a>'),
            (h = M()),
            ($ = T("span")),
            (x = T("a")),
            (y = T("button")),
            (y.textContent = "Say Hello"),
            H(o, "class", "textLayer-preamble svelte-1s4q2ok"),
            H(l, "class", "textLayer-title"),
            H(c, "class", "textLayer-description svelte-1s4q2ok"),
            H(b, "class", "linkedin-container"),
            H(y, "class", "btn btn-grad btn-lg svelte-1s4q2ok"),
            H(
              x,
              "href",
              (v = "mailto:tnrzk13@gmail.com?subject=" + e[0].subject)
            ),
            H(x, "id", "emailLink"),
            H(x, "class", "svelte-1s4q2ok"),
            H($, "class", "button-container"),
            H(g, "class", "links-container svelte-1s4q2ok"),
            H(n, "class", "textLayer col-sm-10 offset-sm-1 svelte-1s4q2ok"),
            H(t, "id", "contact-mobile-wrapper"),
            H(t, "class", "svelte-1s4q2ok");
        },
        m(e, v) {
          I(e, t, v),
            S(t, n),
            S(n, o),
            S(o, r),
            S(n, i),
            S(n, l),
            ye(s, l, null),
            S(n, a),
            S(n, c),
            S(c, d),
            S(c, u),
            S(c, p),
            S(c, f),
            S(n, m),
            S(n, g),
            S(g, b),
            S(g, h),
            S(g, $),
            S($, x),
            S(x, y),
            (w = !0);
        },
        p(e, [t]) {
          (!w || 1 & t) && k !== (k = e[0].preamble + "") && E(r, k);
          const n = {};
          1 & t && (n.texts = e[0].texts),
            s.$set(n),
            (!w || 1 & t) && z !== (z = e[0].description + "") && E(d, z),
            (!w ||
              (1 & t &&
                v !==
                  (v = "mailto:tnrzk13@gmail.com?subject=" + e[0].subject))) &&
              H(x, "href", v);
        },
        i(e) {
          w || (pe(s.$$.fragment, e), (w = !0));
        },
        o(e) {
          fe(s.$$.fragment, e), (w = !1);
        },
        d(e) {
          e && j(t), ve(s);
        },
      }
    );
  }
  function Wo(e, t, n) {
    let { contactInfo: o } = t;
    return (
      (e.$$set = (e) => {
        "contactInfo" in e && n(0, (o = e.contactInfo));
      }),
      [o]
    );
  }
  class Ho extends ke {
    constructor(e) {
      super(), we(this, e, Wo, Ro, s, { contactInfo: 0 });
    }
  }
  function Ao(e) {
    let t, n, o, r;
    const i = [Lo, Eo],
      l = [];
    function s(e, t) {
      return e[3] ? 0 : 1;
    }
    return (
      (t = s(e)),
      (n = l[t] = i[t](e)),
      {
        c() {
          n.c(), (o = R());
        },
        m(e, n) {
          l[t].m(e, n), I(e, o, n), (r = !0);
        },
        p(e, r) {
          let a = t;
          (t = s(e)),
            t === a
              ? l[t].p(e, r)
              : (de(),
                fe(l[a], 1, 1, () => {
                  l[a] = null;
                }),
                ue(),
                (n = l[t]),
                n ? n.p(e, r) : ((n = l[t] = i[t](e)), n.c()),
                pe(n, 1),
                n.m(o.parentNode, o));
        },
        i(e) {
          r || (pe(n), (r = !0));
        },
        o(e) {
          fe(n), (r = !1);
        },
        d(e) {
          l[t].d(e), e && j(o);
        },
      }
    );
  }
  function Eo(e) {
    let t, n, o, r, i;
    return (
      (r = new Mo({
        props: {
          containerHeight: e[1],
          contactYOffset: e[4],
          contactInfo: e[2],
        },
      })),
      {
        c() {
          (t = T("div")),
            (n = M()),
            (o = T("div")),
            xe(r.$$.fragment),
            H(t, "class", "background-extension svelte-yk6can"),
            L(t, "bottom", e[0] + "px"),
            H(o, "id", "contact-wrapper"),
            L(o, "transform", "translateY(" + e[4] + "px)"),
            H(o, "class", "svelte-yk6can");
        },
        m(e, l) {
          I(e, t, l), I(e, n, l), I(e, o, l), ye(r, o, null), (i = !0);
        },
        p(e, n) {
          (!i || 1 & n) && L(t, "bottom", e[0] + "px");
          const l = {};
          2 & n && (l.containerHeight = e[1]),
            16 & n && (l.contactYOffset = e[4]),
            4 & n && (l.contactInfo = e[2]),
            r.$set(l),
            (!i || 16 & n) && L(o, "transform", "translateY(" + e[4] + "px)");
        },
        i(e) {
          i || (pe(r.$$.fragment, e), (i = !0));
        },
        o(e) {
          fe(r.$$.fragment, e), (i = !1);
        },
        d(e) {
          e && j(t), e && j(n), e && j(o), ve(r);
        },
      }
    );
  }
  function Lo(e) {
    let t, n, o;
    return (
      (n = new Ho({ props: { contactInfo: e[2] } })),
      {
        c() {
          (t = T("div")),
            xe(n.$$.fragment),
            H(t, "id", "contact-wrapper"),
            H(t, "class", "svelte-yk6can");
        },
        m(e, r) {
          I(e, t, r), ye(n, t, null), (o = !0);
        },
        p(e, t) {
          const o = {};
          4 & t && (o.contactInfo = e[2]), n.$set(o);
        },
        i(e) {
          o || (pe(n.$$.fragment, e), (o = !0));
        },
        o(e) {
          fe(n.$$.fragment, e), (o = !1);
        },
        d(e) {
          e && j(t), ve(n);
        },
      }
    );
  }
  function Oo(e) {
    let t,
      n,
      o,
      r,
      i,
      l = !1,
      s = () => {
        l = !1;
      },
      a = e[6] > Math.max(0, e[5]);
    te(e[7]);
    let c = a && Ao(e);
    return {
      c() {
        c && c.c(), (n = R());
      },
      m(a, d) {
        c && c.m(a, d),
          I(a, n, d),
          (o = !0),
          r ||
            ((i = W(window, "scroll", () => {
              (l = !0), clearTimeout(t), (t = setTimeout(s, 100)), e[7]();
            })),
            (r = !0));
      },
      p(e, [o]) {
        64 & o &&
          !l &&
          ((l = !0),
          clearTimeout(t),
          scrollTo(window.pageXOffset, e[6]),
          (t = setTimeout(s, 100))),
          96 & o && (a = e[6] > Math.max(0, e[5])),
          a
            ? c
              ? (c.p(e, o), 96 & o && pe(c, 1))
              : ((c = Ao(e)), c.c(), pe(c, 1), c.m(n.parentNode, n))
            : c &&
              (de(),
              fe(c, 1, 1, () => {
                c = null;
              }),
              ue());
      },
      i(e) {
        o || (pe(c), (o = !0));
      },
      o(e) {
        fe(c), (o = !1);
      },
      d(e) {
        c && c.d(e), e && j(n), (r = !1), i();
      },
    };
  }
  function Po(e, t, n) {
    let o,
      {
        contactHeight: r,
        containerHeight: i,
        contactInfo: l,
        boolMobileView: s,
      } = t,
      { contactYOffset: a = 100 } = t,
      { pageHalfDown: c = 1e3 } = t;
    return (
      (e.$$set = (e) => {
        "contactHeight" in e && n(0, (r = e.contactHeight)),
          "containerHeight" in e && n(1, (i = e.containerHeight)),
          "contactInfo" in e && n(2, (l = e.contactInfo)),
          "boolMobileView" in e && n(3, (s = e.boolMobileView)),
          "contactYOffset" in e && n(4, (a = e.contactYOffset)),
          "pageHalfDown" in e && n(5, (c = e.pageHalfDown));
      }),
      [
        r,
        i,
        l,
        s,
        a,
        c,
        o,
        function () {
          n(6, (o = window.pageYOffset));
        },
      ]
    );
  }
  class No extends ke {
    constructor(e) {
      super(),
        we(this, e, Po, Oo, s, {
          contactHeight: 0,
          containerHeight: 1,
          contactInfo: 2,
          boolMobileView: 3,
          contactYOffset: 4,
          pageHalfDown: 5,
        });
    }
  }
  function Do(e) {
    let t, n, o, r, i, l, s, a, c, d, u, p, f, m, g, b, $, x, y, v, w, k;
    return {
      c() {
        (t = T("nav")),
          (n = T("a")),
          (n.innerHTML =
            '<img src="images/navbar/gorilla.png" alt="logo gorilla" class="svelte-wo6wlw"/>'),
          (o = M()),
          (r = T("button")),
          (r.innerHTML = '<span class="navbar-toggler-icon"></span>'),
          (i = M()),
          (l = T("div")),
          (s = T("ul")),
          (a = T("a")),
          (a.textContent = "About"),
          (c = M()),
          (d = T("a")),
          (d.textContent = "Career"),
          (u = M()),
          (p = T("a")),
          (p.textContent = "Projects"),
          (f = M()),
          (m = T("a")),
          (m.textContent = "Contact"),
          (g = M()),
          (b = T("a")),
          ($ = T("button")),
          (x = C("Resume")),
          H(n, "class", "navbar-brand"),
          H(n, "href", "."),
          H(r, "class", "navbar-toggler"),
          H(r, "type", "button"),
          H(r, "data-bs-toggle", "collapse"),
          H(r, "data-bs-target", "#navbarNav"),
          H(r, "aria-controls", "navbarNav"),
          H(r, "aria-expanded", "false"),
          H(r, "aria-label", "Toggle navigation"),
          H(a, "class", "nav-item nav-link"),
          H(a, "href", "#aboutme"),
          H(d, "class", "nav-item nav-link"),
          H(d, "href", "#career"),
          H(p, "class", "nav-item nav-link"),
          H(p, "href", "#projects"),
          H(m, "class", "nav-item nav-link"),
          H(m, "href", "#contact"),
          H(
            $,
            "class",
            (y =
              "btn " +
              (e[0] ? "btn-grad-mobile" : "btn-grad") +
              " svelte-wo6wlw")
          ),
          H(
            b,
            "class",
            (v =
              h(e[0] ? "download-container-mobile" : "download-container") +
              " svelte-wo6wlw")
          ),
          H(b, "href", "download/Resume 2022 - Blue.pdf"),
          H(b, "download", "TonyKwokResume"),
          H(s, "class", "navbar-nav ms-auto"),
          H(l, "class", "collapse navbar-collapse"),
          H(l, "id", "navbarNav"),
          H(t, "id", "navbar"),
          H(
            t,
            "class",
            "navbar navbar-expand-lg navbar-dark fixed-top svelte-wo6wlw"
          );
      },
      m(e, h) {
        I(e, t, h),
          S(t, n),
          S(t, o),
          S(t, r),
          S(t, i),
          S(t, l),
          S(l, s),
          S(s, a),
          S(s, c),
          S(s, d),
          S(s, u),
          S(s, p),
          S(s, f),
          S(s, m),
          S(s, g),
          S(s, b),
          S(b, $),
          S($, x),
          (k = !0);
      },
      p(e, t) {
        (!k ||
          (1 & t &&
            y !==
              (y =
                "btn " +
                (e[0] ? "btn-grad-mobile" : "btn-grad") +
                " svelte-wo6wlw"))) &&
          H($, "class", y),
          (!k ||
            (1 & t &&
              v !==
                (v =
                  h(e[0] ? "download-container-mobile" : "download-container") +
                  " svelte-wo6wlw"))) &&
            H(b, "class", v);
      },
      i(e) {
        k ||
          (te(() => {
            w || (w = ge(t, dt, {}, !0)), w.run(1);
          }),
          (k = !0));
      },
      o(e) {
        w || (w = ge(t, dt, {}, !1)), w.run(0), (k = !1);
      },
      d(e) {
        e && j(t), e && w && w.end();
      },
    };
  }
  function Vo(e) {
    let t,
      n,
      o,
      r,
      i,
      l = !1,
      s = () => {
        l = !1;
      };
    te(e[4]);
    let a = e[2] && Do(e);
    return {
      c() {
        a && a.c(), (n = R());
      },
      m(c, d) {
        a && a.m(c, d),
          I(c, n, d),
          (o = !0),
          r ||
            ((i = W(window, "scroll", () => {
              (l = !0), clearTimeout(t), (t = setTimeout(s, 100)), e[4]();
            })),
            (r = !0));
      },
      p(e, [o]) {
        2 & o &&
          !l &&
          ((l = !0),
          clearTimeout(t),
          scrollTo(window.pageXOffset, e[1]),
          (t = setTimeout(s, 100))),
          e[2]
            ? a
              ? (a.p(e, o), 4 & o && pe(a, 1))
              : ((a = Do(e)), a.c(), pe(a, 1), a.m(n.parentNode, n))
            : a &&
              (de(),
              fe(a, 1, 1, () => {
                a = null;
              }),
              ue());
      },
      i(e) {
        o || (pe(a), (o = !0));
      },
      o(e) {
        fe(a), (o = !1);
      },
      d(e) {
        a && a.d(e), e && j(n), (r = !1), i();
      },
    };
  }
  function Fo(e, t, n) {
    let o,
      { titleHeight: r, boolMobileView: i } = t,
      l = !1;
    return (
      (e.$$set = (e) => {
        "titleHeight" in e && n(3, (r = e.titleHeight)),
          "boolMobileView" in e && n(0, (i = e.boolMobileView));
      }),
      (e.$$.update = () => {
        10 & e.$$.dirty && n(2, (l = o > r - 1));
      }),
      [
        i,
        o,
        l,
        r,
        function () {
          n(1, (o = window.pageYOffset));
        },
      ]
    );
  }
  class Yo extends ke {
    constructor(e) {
      super(), we(this, e, Fo, Vo, s, { titleHeight: 3, boolMobileView: 0 });
    }
  }
  function qo(e) {
    let t, n, o;
    const r = e[10].default,
      i = d(r, e, e[9], null);
    return {
      c() {
        (t = T("div")),
          i && i.c(),
          H(t, "style", (n = "animation: " + e[1] + "; " + e[3]));
      },
      m(e, n) {
        I(e, t, n), i && i.m(t, null), (o = !0);
      },
      p(e, l) {
        i &&
          i.p &&
          (!o || 512 & l) &&
          f(i, r, e, e[9], o ? p(r, e[9], l, null) : m(e[9]), null),
          (!o || (10 & l && n !== (n = "animation: " + e[1] + "; " + e[3]))) &&
            H(t, "style", n);
      },
      i(e) {
        o || (pe(i, e), (o = !0));
      },
      o(e) {
        fe(i, e), (o = !1);
      },
      d(e) {
        e && j(t), i && i.d(e);
      },
    };
  }
  function Go(e) {
    let t, n, o;
    const r = e[10].default,
      i = d(r, e, e[9], null);
    return {
      c() {
        (t = T("div")),
          i && i.c(),
          H(t, "style", (n = "animation: " + e[0] + "; " + e[3]));
      },
      m(e, n) {
        I(e, t, n), i && i.m(t, null), (o = !0);
      },
      p(e, l) {
        i &&
          i.p &&
          (!o || 512 & l) &&
          f(i, r, e, e[9], o ? p(r, e[9], l, null) : m(e[9]), null),
          (!o || (9 & l && n !== (n = "animation: " + e[0] + "; " + e[3]))) &&
            H(t, "style", n);
      },
      i(e) {
        o || (pe(i, e), (o = !0));
      },
      o(e) {
        fe(i, e), (o = !1);
      },
      d(e) {
        e && j(t), i && i.d(e);
      },
    };
  }
  function Xo(e) {
    let t, n, o, r;
    const i = [Go, qo],
      l = [];
    function s(e, t) {
      return e[4] ? 0 : 1;
    }
    return (
      (n = s(e)),
      (o = l[n] = i[n](e)),
      {
        c() {
          (t = T("div")), o.c(), H(t, "id", e[5]), H(t, "style", e[2]);
        },
        m(e, o) {
          I(e, t, o), l[n].m(t, null), (r = !0);
        },
        p(e, [a]) {
          let c = n;
          (n = s(e)),
            n === c
              ? l[n].p(e, a)
              : (de(),
                fe(l[c], 1, 1, () => {
                  l[c] = null;
                }),
                ue(),
                (o = l[n]),
                o ? o.p(e, a) : ((o = l[n] = i[n](e)), o.c()),
                pe(o, 1),
                o.m(t, null)),
            (!r || 4 & a) && H(t, "style", e[2]);
        },
        i(e) {
          r || (pe(o), (r = !0));
        },
        o(e) {
          fe(o), (r = !1);
        },
        d(e) {
          e && j(t), l[n].d();
        },
      }
    );
  }
  function Jo(e, t, n) {
    let { $$slots: o = {}, $$scope: r } = t,
      { animation: i = "none" } = t,
      { animation_out: l = "none; opacity: 0" } = t,
      { once: s = !1 } = t,
      { top: a = 0 } = t,
      { bottom: c = 0 } = t,
      { css_observer: d = "" } = t,
      { css_animation: u = "" } = t;
    const p = (function () {
      const e = q();
      return (t, n, { cancelable: o = !1 } = {}) => {
        const r = e.$$.callbacks[t];
        if (r) {
          const i = O(t, n, { cancelable: o });
          return (
            r.slice().forEach((t) => {
              t.call(e, i);
            }),
            !i.defaultPrevented
          );
        }
        return !0;
      };
    })();
    let f = !0;
    const m = `__saos-${Math.random()}__`;
    function g(e) {
      const t = e.getBoundingClientRect();
      return (
        n(4, (f = t.top + a < window.innerHeight && t.bottom - c > 0)),
        f && s && window.removeEventListener("scroll", verify),
        window.addEventListener("scroll", g),
        () => window.removeEventListener("scroll", g)
      );
    }
    return (
      G(() => {
        const e = document.getElementById(m);
        return IntersectionObserver
          ? (function (e) {
              const t = new IntersectionObserver(
                (o) => {
                  n(4, (f = o[0].isIntersecting)), f && s && t.unobserve(e);
                },
                { rootMargin: `${-c}px 0px ${-a}px 0px` }
              );
              return t.observe(e), () => t.unobserve(e);
            })(e)
          : g(e);
      }),
      (e.$$set = (e) => {
        "animation" in e && n(0, (i = e.animation)),
          "animation_out" in e && n(1, (l = e.animation_out)),
          "once" in e && n(6, (s = e.once)),
          "top" in e && n(7, (a = e.top)),
          "bottom" in e && n(8, (c = e.bottom)),
          "css_observer" in e && n(2, (d = e.css_observer)),
          "css_animation" in e && n(3, (u = e.css_animation)),
          "$$scope" in e && n(9, (r = e.$$scope));
      }),
      (e.$$.update = () => {
        16 & e.$$.dirty && p("update", { observing: f });
      }),
      [i, l, d, u, f, m, s, a, c, r, o]
    );
  }
  class Uo extends ke {
    constructor(e) {
      super(),
        we(this, e, Jo, Xo, s, {
          animation: 0,
          animation_out: 1,
          once: 6,
          top: 7,
          bottom: 8,
          css_observer: 2,
          css_animation: 3,
        });
    }
  }
  function Qo(e) {
    let t;
    const n = e[1].default,
      o = d(n, e, e[2], null);
    return {
      c() {
        o && o.c();
      },
      m(e, n) {
        o && o.m(e, n), (t = !0);
      },
      p(e, r) {
        o &&
          o.p &&
          (!t || 4 & r) &&
          f(o, n, e, e[2], t ? p(n, e[2], r, null) : m(e[2]), null);
      },
      i(e) {
        t || (pe(o, e), (t = !0));
      },
      o(e) {
        fe(o, e), (t = !1);
      },
      d(e) {
        o && o.d(e);
      },
    };
  }
  function Ko(e) {
    let t, n;
    return (
      (t = new Uo({
        props: {
          animation:
            "fade-in 1.2s cubic-bezier(0.390, 0.575, 0.565, 1.000) both",
          animation_out:
            "slide-out-fwd-center 0.7s cubic-bezier(0.550, 0.085, 0.680, 0.530) both",
          top: 250,
          bottom: 250,
          $$slots: { default: [Zo] },
          $$scope: { ctx: e },
        },
      })),
      {
        c() {
          xe(t.$$.fragment);
        },
        m(e, o) {
          ye(t, e, o), (n = !0);
        },
        p(e, n) {
          const o = {};
          4 & n && (o.$$scope = { dirty: n, ctx: e }), t.$set(o);
        },
        i(e) {
          n || (pe(t.$$.fragment, e), (n = !0));
        },
        o(e) {
          fe(t.$$.fragment, e), (n = !1);
        },
        d(e) {
          ve(t, e);
        },
      }
    );
  }
  function Zo(e) {
    let t;
    const n = e[1].default,
      o = d(n, e, e[2], null);
    return {
      c() {
        o && o.c();
      },
      m(e, n) {
        o && o.m(e, n), (t = !0);
      },
      p(e, r) {
        o &&
          o.p &&
          (!t || 4 & r) &&
          f(o, n, e, e[2], t ? p(n, e[2], r, null) : m(e[2]), null);
      },
      i(e) {
        t || (pe(o, e), (t = !0));
      },
      o(e) {
        fe(o, e), (t = !1);
      },
      d(e) {
        o && o.d(e);
      },
    };
  }
  function er(e) {
    let t, n, o, r;
    const i = [Ko, Qo],
      l = [];
    function s(e, t) {
      return e[0] ? 0 : 1;
    }
    return (
      (t = s(e)),
      (n = l[t] = i[t](e)),
      {
        c() {
          n.c(), (o = R());
        },
        m(e, n) {
          l[t].m(e, n), I(e, o, n), (r = !0);
        },
        p(e, [r]) {
          let a = t;
          (t = s(e)),
            t === a
              ? l[t].p(e, r)
              : (de(),
                fe(l[a], 1, 1, () => {
                  l[a] = null;
                }),
                ue(),
                (n = l[t]),
                n ? n.p(e, r) : ((n = l[t] = i[t](e)), n.c()),
                pe(n, 1),
                n.m(o.parentNode, o));
        },
        i(e) {
          r || (pe(n), (r = !0));
        },
        o(e) {
          fe(n), (r = !1);
        },
        d(e) {
          l[t].d(e), e && j(o);
        },
      }
    );
  }
  function tr(e, t, n) {
    let { $$slots: o = {}, $$scope: r } = t,
      { boolFadeAnimation: i } = t;
    return (
      (e.$$set = (e) => {
        "boolFadeAnimation" in e && n(0, (i = e.boolFadeAnimation)),
          "$$scope" in e && n(2, (r = e.$$scope));
      }),
      [i, o, r]
    );
  }
  class nr extends ke {
    constructor(e) {
      super(), we(this, e, tr, er, s, { boolFadeAnimation: 0 });
    }
  }
  const { window: or } = be;
  function rr(e) {
    let t, n, o, r, i, l, s, a, c, d, u, p, f, m, g, b, h, $;
    return (
      (n = new Fe({
        props: {
          containerHeight: e[2],
          pageHalfDown: e[4],
          boolAnimateText: e[7],
          titleInfo: e[8],
        },
      })),
      (l = new nr({
        props: {
          boolFadeAnimation: e[6],
          $$slots: { default: [lr] },
          $$scope: { ctx: e },
        },
      })),
      (a = new nr({
        props: {
          boolFadeAnimation: e[6],
          $$slots: { default: [sr] },
          $$scope: { ctx: e },
        },
      })),
      (d = new nr({
        props: {
          boolFadeAnimation: e[6],
          $$slots: { default: [ar] },
          $$scope: { ctx: e },
        },
      })),
      (g = new No({
        props: {
          contactHeight: e[3],
          containerHeight: e[2],
          contactYOffset: e[5],
          pageHalfDown: e[4],
          contactInfo: e[9],
          boolMobileView: e[0],
        },
      })),
      (h = new Yo({ props: { titleHeight: e[2], boolMobileView: e[0] } })),
      {
        c() {
          (t = T("div")),
            xe(n.$$.fragment),
            (o = M()),
            (r = T("div")),
            (i = T("div")),
            xe(l.$$.fragment),
            (s = M()),
            xe(a.$$.fragment),
            (c = M()),
            xe(d.$$.fragment),
            (u = M()),
            (p = T("div")),
            (m = M()),
            xe(g.$$.fragment),
            (b = M()),
            xe(h.$$.fragment),
            H(i, "id", "content"),
            H(i, "class", "svelte-jnqx4x"),
            H(p, "id", "contact"),
            H(p, "style", (f = "height: calc(" + (e[2] - e[5]) + "px); )")),
            H(p, "class", "svelte-jnqx4x"),
            H(r, "id", "content-container"),
            L(r, "top", e[2] + "px"),
            H(r, "class", "svelte-jnqx4x"),
            H(t, "class", "container-fluid svelte-jnqx4x");
        },
        m(e, f) {
          I(e, t, f),
            ye(n, t, null),
            S(t, o),
            S(t, r),
            S(r, i),
            ye(l, i, null),
            S(i, s),
            ye(a, i, null),
            S(i, c),
            ye(d, i, null),
            S(r, u),
            S(r, p),
            S(r, m),
            ye(g, r, null),
            I(e, b, f),
            ye(h, e, f),
            ($ = !0);
        },
        p(e, t) {
          const o = {};
          4 & t && (o.containerHeight = e[2]),
            16 & t && (o.pageHalfDown = e[4]),
            128 & t && (o.boolAnimateText = e[7]),
            n.$set(o);
          const i = {};
          64 & t && (i.boolFadeAnimation = e[6]),
            1048576 & t && (i.$$scope = { dirty: t, ctx: e }),
            l.$set(i);
          const s = {};
          64 & t && (s.boolFadeAnimation = e[6]),
            1048576 & t && (s.$$scope = { dirty: t, ctx: e }),
            a.$set(s);
          const c = {};
          64 & t && (c.boolFadeAnimation = e[6]),
            1048576 & t && (c.$$scope = { dirty: t, ctx: e }),
            d.$set(c),
            (!$ ||
              (36 & t &&
                f !== (f = "height: calc(" + (e[2] - e[5]) + "px); )"))) &&
              H(p, "style", f);
          const u = {};
          8 & t && (u.contactHeight = e[3]),
            4 & t && (u.containerHeight = e[2]),
            32 & t && (u.contactYOffset = e[5]),
            16 & t && (u.pageHalfDown = e[4]),
            1 & t && (u.boolMobileView = e[0]),
            g.$set(u),
            (!$ || 4 & t) && L(r, "top", e[2] + "px");
          const m = {};
          4 & t && (m.titleHeight = e[2]),
            1 & t && (m.boolMobileView = e[0]),
            h.$set(m);
        },
        i(e) {
          $ ||
            (pe(n.$$.fragment, e),
            pe(l.$$.fragment, e),
            pe(a.$$.fragment, e),
            pe(d.$$.fragment, e),
            pe(g.$$.fragment, e),
            pe(h.$$.fragment, e),
            ($ = !0));
        },
        o(e) {
          fe(n.$$.fragment, e),
            fe(l.$$.fragment, e),
            fe(a.$$.fragment, e),
            fe(d.$$.fragment, e),
            fe(g.$$.fragment, e),
            fe(h.$$.fragment, e),
            ($ = !1);
        },
        d(e) {
          e && j(t), ve(n), ve(l), ve(a), ve(d), ve(g), e && j(b), ve(h, e);
        },
      }
    );
  }
  function ir(e) {
    let t, n, o, r, i, l, s, a, c, d, u, p, f, m, g, b, h;
    return (
      (n = new Je({ props: { boolAnimateText: e[7], titleInfo: e[8] } })),
      (l = new nr({
        props: {
          boolFadeAnimation: e[6],
          $$slots: { default: [cr] },
          $$scope: { ctx: e },
        },
      })),
      (a = new nr({
        props: {
          boolFadeAnimation: e[6],
          $$slots: { default: [dr] },
          $$scope: { ctx: e },
        },
      })),
      (d = new nr({
        props: {
          boolFadeAnimation: e[6],
          $$slots: { default: [ur] },
          $$scope: { ctx: e },
        },
      })),
      (m = new No({
        props: {
          contactHeight: e[3],
          containerHeight: e[2],
          contactYOffset: e[5],
          pageHalfDown: e[4],
          contactInfo: e[9],
          boolMobileView: e[0],
        },
      })),
      (b = new Yo({ props: { titleHeight: 0, boolMobileView: e[0] } })),
      {
        c() {
          (t = T("div")),
            xe(n.$$.fragment),
            (o = M()),
            (r = T("div")),
            (i = T("div")),
            xe(l.$$.fragment),
            (s = M()),
            xe(a.$$.fragment),
            (c = M()),
            xe(d.$$.fragment),
            (u = M()),
            (p = T("div")),
            (f = M()),
            xe(m.$$.fragment),
            (g = M()),
            xe(b.$$.fragment),
            H(i, "id", "content"),
            H(i, "class", "svelte-jnqx4x"),
            H(p, "id", "contact"),
            L(p, "height", "75vh"),
            H(p, "class", "svelte-jnqx4x"),
            H(r, "id", "content-container"),
            H(r, "class", "svelte-jnqx4x"),
            H(t, "class", "container-fluid svelte-jnqx4x");
        },
        m(e, $) {
          I(e, t, $),
            ye(n, t, null),
            S(t, o),
            S(t, r),
            S(r, i),
            ye(l, i, null),
            S(i, s),
            ye(a, i, null),
            S(i, c),
            ye(d, i, null),
            S(r, u),
            S(r, p),
            S(r, f),
            ye(m, r, null),
            I(e, g, $),
            ye(b, e, $),
            (h = !0);
        },
        p(e, t) {
          const o = {};
          128 & t && (o.boolAnimateText = e[7]), n.$set(o);
          const r = {};
          64 & t && (r.boolFadeAnimation = e[6]),
            1048576 & t && (r.$$scope = { dirty: t, ctx: e }),
            l.$set(r);
          const i = {};
          64 & t && (i.boolFadeAnimation = e[6]),
            1048576 & t && (i.$$scope = { dirty: t, ctx: e }),
            a.$set(i);
          const s = {};
          64 & t && (s.boolFadeAnimation = e[6]),
            1048577 & t && (s.$$scope = { dirty: t, ctx: e }),
            d.$set(s);
          const c = {};
          8 & t && (c.contactHeight = e[3]),
            4 & t && (c.containerHeight = e[2]),
            32 & t && (c.contactYOffset = e[5]),
            16 & t && (c.pageHalfDown = e[4]),
            1 & t && (c.boolMobileView = e[0]),
            m.$set(c);
          const u = {};
          1 & t && (u.boolMobileView = e[0]), b.$set(u);
        },
        i(e) {
          h ||
            (pe(n.$$.fragment, e),
            pe(l.$$.fragment, e),
            pe(a.$$.fragment, e),
            pe(d.$$.fragment, e),
            pe(m.$$.fragment, e),
            pe(b.$$.fragment, e),
            (h = !0));
        },
        o(e) {
          fe(n.$$.fragment, e),
            fe(l.$$.fragment, e),
            fe(a.$$.fragment, e),
            fe(d.$$.fragment, e),
            fe(m.$$.fragment, e),
            fe(b.$$.fragment, e),
            (h = !1);
        },
        d(e) {
          e && j(t), ve(n), ve(l), ve(a), ve(d), ve(m), e && j(g), ve(b, e);
        },
      }
    );
  }
  function lr(e) {
    let t, n;
    return (
      (t = new nt({})),
      {
        c() {
          xe(t.$$.fragment);
        },
        m(e, o) {
          ye(t, e, o), (n = !0);
        },
        i(e) {
          n || (pe(t.$$.fragment, e), (n = !0));
        },
        o(e) {
          fe(t.$$.fragment, e), (n = !1);
        },
        d(e) {
          ve(t, e);
        },
      }
    );
  }
  function sr(e) {
    let t, n;
    return (
      (t = new no({})),
      {
        c() {
          xe(t.$$.fragment);
        },
        m(e, o) {
          ye(t, e, o), (n = !0);
        },
        i(e) {
          n || (pe(t.$$.fragment, e), (n = !0));
        },
        o(e) {
          fe(t.$$.fragment, e), (n = !1);
        },
        d(e) {
          ve(t, e);
        },
      }
    );
  }
  function ar(e) {
    let t, n;
    return (
      (t = new wo({})),
      {
        c() {
          xe(t.$$.fragment);
        },
        m(e, o) {
          ye(t, e, o), (n = !0);
        },
        i(e) {
          n || (pe(t.$$.fragment, e), (n = !0));
        },
        o(e) {
          fe(t.$$.fragment, e), (n = !1);
        },
        d(e) {
          ve(t, e);
        },
      }
    );
  }
  function cr(e) {
    let t, n;
    return (
      (t = new nt({})),
      {
        c() {
          xe(t.$$.fragment);
        },
        m(e, o) {
          ye(t, e, o), (n = !0);
        },
        i(e) {
          n || (pe(t.$$.fragment, e), (n = !0));
        },
        o(e) {
          fe(t.$$.fragment, e), (n = !1);
        },
        d(e) {
          ve(t, e);
        },
      }
    );
  }
  function dr(e) {
    let t, n;
    return (
      (t = new no({})),
      {
        c() {
          xe(t.$$.fragment);
        },
        m(e, o) {
          ye(t, e, o), (n = !0);
        },
        i(e) {
          n || (pe(t.$$.fragment, e), (n = !0));
        },
        o(e) {
          fe(t.$$.fragment, e), (n = !1);
        },
        d(e) {
          ve(t, e);
        },
      }
    );
  }
  function ur(e) {
    let t, n;
    return (
      (t = new wo({ props: { boolMobileView: e[0] } })),
      {
        c() {
          xe(t.$$.fragment);
        },
        m(e, o) {
          ye(t, e, o), (n = !0);
        },
        p(e, n) {
          const o = {};
          1 & n && (o.boolMobileView = e[0]), t.$set(o);
        },
        i(e) {
          n || (pe(t.$$.fragment, e), (n = !0));
        },
        o(e) {
          fe(t.$$.fragment, e), (n = !1);
        },
        d(e) {
          ve(t, e);
        },
      }
    );
  }
  function pr(e) {
    let t,
      n,
      o,
      r,
      i,
      l,
      s,
      a = !1,
      c = () => {
        a = !1;
      };
    te(e[11]);
    const d = [ir, rr],
      u = [];
    function p(e, t) {
      return e[0] ? 0 : 1;
    }
    return (
      (n = p(e)),
      (o = u[n] = d[n](e)),
      {
        c() {
          o.c(), (r = R());
        },
        m(o, d) {
          u[n].m(o, d),
            I(o, r, d),
            (i = !0),
            l ||
              ((s = W(or, "scroll", () => {
                (a = !0), clearTimeout(t), (t = setTimeout(c, 100)), e[11]();
              })),
              (l = !0));
        },
        p(e, [i]) {
          2 & i &&
            !a &&
            ((a = !0),
            clearTimeout(t),
            scrollTo(or.pageXOffset, e[1]),
            (t = setTimeout(c, 100)));
          let l = n;
          (n = p(e)),
            n === l
              ? u[n].p(e, i)
              : (de(),
                fe(u[l], 1, 1, () => {
                  u[l] = null;
                }),
                ue(),
                (o = u[n]),
                o ? o.p(e, i) : ((o = u[n] = d[n](e)), o.c()),
                pe(o, 1),
                o.m(r.parentNode, r));
        },
        i(e) {
          i || (pe(o), (i = !0));
        },
        o(e) {
          fe(o), (i = !1);
        },
        d(e) {
          u[n].d(e), e && j(r), (l = !1), s();
        },
      }
    );
  }
  function fr(e, t, n) {
    let o, r, i, l, s, a, c, d, u, p;
    var f;
    (p = 0),
      (r = !0),
      (i = 768),
      (f = async () => {
        await (ee(), K),
          (d = document.body),
          (u = document.getElementById("content-container")),
          document.getElementById("content"),
          (p = u.offsetHeight),
          n(4, (a = p / 2));
      }),
      q().$$.before_update.push(f);
    let m, g;
    (window.onload =
      (n(0, (r = window.innerWidth < i)),
      (d = document.body),
      n(2, (l = 0.5625 * d.offsetWidth)),
      n(5, (c = l / 3)),
      void n(3, (s = l - c)))),
      (window.onresize = () => {
        n(0, (r = window.innerWidth < i)),
          n(2, (l = 0.5625 * d.offsetWidth)),
          n(5, (c = l / 3)),
          n(3, (s = l - c)),
          (p = u.clientHeight),
          n(4, (a = p / 2));
      });
    var b;
    (b = !1),
      n(6, (m = n(7, (g = !1)))),
      b || n(6, (m = n(7, (g = !0)))),
      n(6, (m = !1));
    return (
      (e.$$.update = () => {
        if (1025 & e.$$.dirty) {
          n(0, (r = window.innerWidth < i));
          let e = { boolMobileView: r };
          console.log(e);
        }
      }),
      [
        r,
        o,
        l,
        s,
        a,
        c,
        m,
        g,
        {
          preamble: "Hi, my name is",
          title: "Tony Kwok.",
          subtitle: "I build things with ",
          texts: ["data.", "style.", "code.", "thought."],
          description:
            "I'm a software developer who builds solutions to problems using data. Currently, I'm looking to join a company for my next adventure.",
        },
        {
          preamble: "Interested?",
          title: "",
          subtitle: "",
          texts: ["Get in Touch!"],
          description:
            "I'm currently looking for my next adventure. Contact me if you have any questions, or if you just want to say hello! My inbox is always open for you.",
          subject: "Getting in touch from your website",
        },
        i,
        function () {
          n(1, (o = or.pageYOffset));
        },
      ]
    );
  }
  return new (class extends ke {
    constructor(e) {
      super(), we(this, e, fr, pr, s, {});
    }
  })({ target: document.body });
})();
//# sourceMappingURL=bundle.js.map
