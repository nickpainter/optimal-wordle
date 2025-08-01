"use strict";
var eL = Object.defineProperty,
  tL = Object.defineProperties,
  nL = Object.getOwnPropertyDescriptors,
  yw = Object.getOwnPropertySymbols,
  rL = Object.prototype.hasOwnProperty,
  iL = Object.prototype.propertyIsEnumerable,
  fw = ($, Me, Oe) =>
    Me in $
      ? eL($, Me, { enumerable: !0, configurable: !0, writable: !0, value: Oe })
      : ($[Me] = Oe),
  hw = ($, Me) => {
    for (var Oe in Me || (Me = {})) rL.call(Me, Oe) && fw($, Oe, Me[Oe]);
    if (yw) for (var Oe of yw(Me)) iL.call(Me, Oe) && fw($, Oe, Me[Oe]);
    return $;
  },
  pw = ($, Me) => tL($, nL(Me));
(self.webpackChunkwordle = self.webpackChunkwordle || []).push([
  [179],
  {
    287: () => {
      function $(t) {
        return "function" == typeof t;
      }
      function Me(t) {
        const n = t((r) => {
          Error.call(r), (r.stack = new Error().stack);
        });
        return (
          (n.prototype = Object.create(Error.prototype)),
          (n.prototype.constructor = n),
          n
        );
      }
      const Oe = Me(
        (t) =>
          function (n) {
            t(this),
              (this.message = n
                ? `${n.length} errors occurred during unsubscription:\n${n
                    .map((r, i) => `${i + 1}) ${r.toString()}`)
                    .join("\n  ")}`
                : ""),
              (this.name = "UnsubscriptionError"),
              (this.errors = n);
          }
      );
      function Di(t, e) {
        if (t) {
          const n = t.indexOf(e);
          0 <= n && t.splice(n, 1);
        }
      }
      class Rt {
        constructor(e) {
          (this.initialTeardown = e),
            (this.closed = !1),
            (this._parentage = null),
            (this._finalizers = null);
        }
        unsubscribe() {
          let e;
          if (!this.closed) {
            this.closed = !0;
            const { _parentage: n } = this;
            if (n)
              if (((this._parentage = null), Array.isArray(n)))
                for (const s of n) s.remove(this);
              else n.remove(this);
            const { initialTeardown: r } = this;
            if ($(r))
              try {
                r();
              } catch (s) {
                e = s instanceof Oe ? s.errors : [s];
              }
            const { _finalizers: i } = this;
            if (i) {
              this._finalizers = null;
              for (const s of i)
                try {
                  nd(s);
                } catch (o) {
                  (e = null != e ? e : []),
                    o instanceof Oe ? (e = [...e, ...o.errors]) : e.push(o);
                }
            }
            if (e) throw new Oe(e);
          }
        }
        add(e) {
          var n;
          if (e && e !== this)
            if (this.closed) nd(e);
            else {
              if (e instanceof Rt) {
                if (e.closed || e._hasParent(this)) return;
                e._addParent(this);
              }
              (this._finalizers =
                null !== (n = this._finalizers) && void 0 !== n ? n : []).push(
                e
              );
            }
        }
        _hasParent(e) {
          const { _parentage: n } = this;
          return n === e || (Array.isArray(n) && n.includes(e));
        }
        _addParent(e) {
          const { _parentage: n } = this;
          this._parentage = Array.isArray(n) ? (n.push(e), n) : n ? [n, e] : e;
        }
        _removeParent(e) {
          const { _parentage: n } = this;
          n === e ? (this._parentage = null) : Array.isArray(n) && Di(n, e);
        }
        remove(e) {
          const { _finalizers: n } = this;
          n && Di(n, e), e instanceof Rt && e._removeParent(this);
        }
      }
      Rt.EMPTY = (() => {
        const t = new Rt();
        return (t.closed = !0), t;
      })();
      const ed = Rt.EMPTY;
      function td(t) {
        return (
          t instanceof Rt ||
          (t && "closed" in t && $(t.remove) && $(t.add) && $(t.unsubscribe))
        );
      }
      function nd(t) {
        $(t) ? t() : t.unsubscribe();
      }
      const Vn = {
          onUnhandledError: null,
          onStoppedNotification: null,
          Promise: void 0,
          useDeprecatedSynchronousErrorHandling: !1,
          useDeprecatedNextContext: !1,
        },
        Zs = {
          setTimeout(t, e, ...n) {
            const { delegate: r } = Zs;
            return (null == r ? void 0 : r.setTimeout)
              ? r.setTimeout(t, e, ...n)
              : setTimeout(t, e, ...n);
          },
          clearTimeout(t) {
            const { delegate: e } = Zs;
            return ((null == e ? void 0 : e.clearTimeout) || clearTimeout)(t);
          },
          delegate: void 0,
        };
      function rd(t) {
        Zs.setTimeout(() => {
          const { onUnhandledError: e } = Vn;
          if (!e) throw t;
          e(t);
        });
      }
      function ua() {}
      const mw = ca("C", void 0, void 0);
      function ca(t, e, n) {
        return { kind: t, value: e, error: n };
      }
      let jn = null;
      function Js(t) {
        if (Vn.useDeprecatedSynchronousErrorHandling) {
          const e = !jn;
          if ((e && (jn = { errorThrown: !1, error: null }), t(), e)) {
            const { errorThrown: n, error: r } = jn;
            if (((jn = null), n)) throw r;
          }
        } else t();
      }
      class ga extends Rt {
        constructor(e) {
          super(),
            (this.isStopped = !1),
            e
              ? ((this.destination = e), td(e) && e.add(this))
              : (this.destination = Iw);
        }
        static create(e, n, r) {
          return new wi(e, n, r);
        }
        next(e) {
          this.isStopped
            ? ya(
                (function vw(t) {
                  return ca("N", t, void 0);
                })(e),
                this
              )
            : this._next(e);
        }
        error(e) {
          this.isStopped
            ? ya(
                (function _w(t) {
                  return ca("E", void 0, t);
                })(e),
                this
              )
            : ((this.isStopped = !0), this._error(e));
        }
        complete() {
          this.isStopped
            ? ya(mw, this)
            : ((this.isStopped = !0), this._complete());
        }
        unsubscribe() {
          this.closed ||
            ((this.isStopped = !0),
            super.unsubscribe(),
            (this.destination = null));
        }
        _next(e) {
          this.destination.next(e);
        }
        _error(e) {
          try {
            this.destination.error(e);
          } finally {
            this.unsubscribe();
          }
        }
        _complete() {
          try {
            this.destination.complete();
          } finally {
            this.unsubscribe();
          }
        }
      }
      const ww = Function.prototype.bind;
      function da(t, e) {
        return ww.call(t, e);
      }
      class Cw {
        constructor(e) {
          this.partialObserver = e;
        }
        next(e) {
          const { partialObserver: n } = this;
          if (n.next)
            try {
              n.next(e);
            } catch (r) {
              Xs(r);
            }
        }
        error(e) {
          const { partialObserver: n } = this;
          if (n.error)
            try {
              n.error(e);
            } catch (r) {
              Xs(r);
            }
          else Xs(e);
        }
        complete() {
          const { partialObserver: e } = this;
          if (e.complete)
            try {
              e.complete();
            } catch (n) {
              Xs(n);
            }
        }
      }
      class wi extends ga {
        constructor(e, n, r) {
          let i;
          if ((super(), $(e) || !e))
            i = {
              next: null != e ? e : void 0,
              error: null != n ? n : void 0,
              complete: null != r ? r : void 0,
            };
          else {
            let s;
            this && Vn.useDeprecatedNextContext
              ? ((s = Object.create(e)),
                (s.unsubscribe = () => this.unsubscribe()),
                (i = {
                  next: e.next && da(e.next, s),
                  error: e.error && da(e.error, s),
                  complete: e.complete && da(e.complete, s),
                }))
              : (i = e);
          }
          this.destination = new Cw(i);
        }
      }
      function Xs(t) {
        Vn.useDeprecatedSynchronousErrorHandling
          ? (function Dw(t) {
              Vn.useDeprecatedSynchronousErrorHandling &&
                jn &&
                ((jn.errorThrown = !0), (jn.error = t));
            })(t)
          : rd(t);
      }
      function ya(t, e) {
        const { onStoppedNotification: n } = Vn;
        n && Zs.setTimeout(() => n(t, e));
      }
      const Iw = {
          closed: !0,
          next: ua,
          error: function Ew(t) {
            throw t;
          },
          complete: ua,
        },
        fa =
          ("function" == typeof Symbol && Symbol.observable) || "@@observable";
      function id(t) {
        return t;
      }
      let $e = (() => {
        class t {
          constructor(n) {
            n && (this._subscribe = n);
          }
          lift(n) {
            const r = new t();
            return (r.source = this), (r.operator = n), r;
          }
          subscribe(n, r, i) {
            const s = (function Sw(t) {
              return (
                (t && t instanceof ga) ||
                ((function Tw(t) {
                  return t && $(t.next) && $(t.error) && $(t.complete);
                })(t) &&
                  td(t))
              );
            })(n)
              ? n
              : new wi(n, r, i);
            return (
              Js(() => {
                const { operator: o, source: b } = this;
                s.add(
                  o
                    ? o.call(s, b)
                    : b
                    ? this._subscribe(s)
                    : this._trySubscribe(s)
                );
              }),
              s
            );
          }
          _trySubscribe(n) {
            try {
              return this._subscribe(n);
            } catch (r) {
              n.error(r);
            }
          }
          forEach(n, r) {
            return new (r = od(r))((i, s) => {
              const o = new wi({
                next: (b) => {
                  try {
                    n(b);
                  } catch (a) {
                    s(a), o.unsubscribe();
                  }
                },
                error: s,
                complete: i,
              });
              this.subscribe(o);
            });
          }
          _subscribe(n) {
            var r;
            return null === (r = this.source) || void 0 === r
              ? void 0
              : r.subscribe(n);
          }
          [fa]() {
            return this;
          }
          pipe(...n) {
            return (function sd(t) {
              return 0 === t.length
                ? id
                : 1 === t.length
                ? t[0]
                : function (n) {
                    return t.reduce((r, i) => i(r), n);
                  };
            })(n)(this);
          }
          toPromise(n) {
            return new (n = od(n))((r, i) => {
              let s;
              this.subscribe(
                (o) => (s = o),
                (o) => i(o),
                () => r(s)
              );
            });
          }
        }
        return (t.create = (e) => new t(e)), t;
      })();
      function od(t) {
        var e;
        return null !== (e = null != t ? t : Vn.Promise) && void 0 !== e
          ? e
          : Promise;
      }
      const Mw = Me(
        (t) =>
          function () {
            t(this),
              (this.name = "ObjectUnsubscribedError"),
              (this.message = "object unsubscribed");
          }
      );
      let Ci = (() => {
        class t extends $e {
          constructor() {
            super(),
              (this.closed = !1),
              (this.currentObservers = null),
              (this.observers = []),
              (this.isStopped = !1),
              (this.hasError = !1),
              (this.thrownError = null);
          }
          lift(n) {
            const r = new bd(this, this);
            return (r.operator = n), r;
          }
          _throwIfClosed() {
            if (this.closed) throw new Mw();
          }
          next(n) {
            Js(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                this.currentObservers ||
                  (this.currentObservers = Array.from(this.observers));
                for (const r of this.currentObservers) r.next(n);
              }
            });
          }
          error(n) {
            Js(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                (this.hasError = this.isStopped = !0), (this.thrownError = n);
                const { observers: r } = this;
                for (; r.length; ) r.shift().error(n);
              }
            });
          }
          complete() {
            Js(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                this.isStopped = !0;
                const { observers: n } = this;
                for (; n.length; ) n.shift().complete();
              }
            });
          }
          unsubscribe() {
            (this.isStopped = this.closed = !0),
              (this.observers = this.currentObservers = null);
          }
          get observed() {
            var n;
            return (
              (null === (n = this.observers) || void 0 === n
                ? void 0
                : n.length) > 0
            );
          }
          _trySubscribe(n) {
            return this._throwIfClosed(), super._trySubscribe(n);
          }
          _subscribe(n) {
            return (
              this._throwIfClosed(),
              this._checkFinalizedStatuses(n),
              this._innerSubscribe(n)
            );
          }
          _innerSubscribe(n) {
            const { hasError: r, isStopped: i, observers: s } = this;
            return r || i
              ? ed
              : ((this.currentObservers = null),
                s.push(n),
                new Rt(() => {
                  (this.currentObservers = null), Di(s, n);
                }));
          }
          _checkFinalizedStatuses(n) {
            const { hasError: r, thrownError: i, isStopped: s } = this;
            r ? n.error(i) : s && n.complete();
          }
          asObservable() {
            const n = new $e();
            return (n.source = this), n;
          }
        }
        return (t.create = (e, n) => new bd(e, n)), t;
      })();
      class bd extends Ci {
        constructor(e, n) {
          super(), (this.destination = e), (this.source = n);
        }
        next(e) {
          var n, r;
          null ===
            (r =
              null === (n = this.destination) || void 0 === n
                ? void 0
                : n.next) ||
            void 0 === r ||
            r.call(n, e);
        }
        error(e) {
          var n, r;
          null ===
            (r =
              null === (n = this.destination) || void 0 === n
                ? void 0
                : n.error) ||
            void 0 === r ||
            r.call(n, e);
        }
        complete() {
          var e, n;
          null ===
            (n =
              null === (e = this.destination) || void 0 === e
                ? void 0
                : e.complete) ||
            void 0 === n ||
            n.call(e);
        }
        _subscribe(e) {
          var n, r;
          return null !==
            (r =
              null === (n = this.source) || void 0 === n
                ? void 0
                : n.subscribe(e)) && void 0 !== r
            ? r
            : ed;
        }
      }
      function gr(t) {
        return (e) => {
          if (
            (function Aw(t) {
              return $(null == t ? void 0 : t.lift);
            })(e)
          )
            return e.lift(function (n) {
              try {
                return t(n, this);
              } catch (r) {
                this.error(r);
              }
            });
          throw new TypeError("Unable to lift unknown Observable type");
        };
      }
      function Ei(t, e, n, r, i) {
        return new xw(t, e, n, r, i);
      }
      class xw extends ga {
        constructor(e, n, r, i, s, o) {
          super(e),
            (this.onFinalize = s),
            (this.shouldUnsubscribe = o),
            (this._next = n
              ? function (b) {
                  try {
                    n(b);
                  } catch (a) {
                    e.error(a);
                  }
                }
              : super._next),
            (this._error = i
              ? function (b) {
                  try {
                    i(b);
                  } catch (a) {
                    e.error(a);
                  } finally {
                    this.unsubscribe();
                  }
                }
              : super._error),
            (this._complete = r
              ? function () {
                  try {
                    r();
                  } catch (b) {
                    e.error(b);
                  } finally {
                    this.unsubscribe();
                  }
                }
              : super._complete);
        }
        unsubscribe() {
          var e;
          if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
            const { closed: n } = this;
            super.unsubscribe(),
              !n &&
                (null === (e = this.onFinalize) ||
                  void 0 === e ||
                  e.call(this));
          }
        }
      }
      function Hn(t) {
        return this instanceof Hn ? ((this.v = t), this) : new Hn(t);
      }
      function kw(t, e, n) {
        if (!Symbol.asyncIterator)
          throw new TypeError("Symbol.asyncIterator is not defined.");
        var i,
          r = n.apply(t, e || []),
          s = [];
        return (
          (i = {}),
          o("next"),
          o("throw"),
          o("return"),
          (i[Symbol.asyncIterator] = function () {
            return this;
          }),
          i
        );
        function o(g) {
          r[g] &&
            (i[g] = function (d) {
              return new Promise(function (y, f) {
                s.push([g, d, y, f]) > 1 || b(g, d);
              });
            });
        }
        function b(g, d) {
          try {
            !(function a(g) {
              g.value instanceof Hn
                ? Promise.resolve(g.value.v).then(l, u)
                : c(s[0][2], g);
            })(r[g](d));
          } catch (y) {
            c(s[0][3], y);
          }
        }
        function l(g) {
          b("next", g);
        }
        function u(g) {
          b("throw", g);
        }
        function c(g, d) {
          g(d), s.shift(), s.length && b(s[0][0], s[0][1]);
        }
      }
      function Fw(t) {
        if (!Symbol.asyncIterator)
          throw new TypeError("Symbol.asyncIterator is not defined.");
        var n,
          e = t[Symbol.asyncIterator];
        return e
          ? e.call(t)
          : ((t = (function ud(t) {
              var e = "function" == typeof Symbol && Symbol.iterator,
                n = e && t[e],
                r = 0;
              if (n) return n.call(t);
              if (t && "number" == typeof t.length)
                return {
                  next: function () {
                    return (
                      t && r >= t.length && (t = void 0),
                      { value: t && t[r++], done: !t }
                    );
                  },
                };
              throw new TypeError(
                e
                  ? "Object is not iterable."
                  : "Symbol.iterator is not defined."
              );
            })(t)),
            (n = {}),
            r("next"),
            r("throw"),
            r("return"),
            (n[Symbol.asyncIterator] = function () {
              return this;
            }),
            n);
        function r(s) {
          n[s] =
            t[s] &&
            function (o) {
              return new Promise(function (b, a) {
                !(function i(s, o, b, a) {
                  Promise.resolve(a).then(function (l) {
                    s({ value: l, done: b });
                  }, o);
                })(b, a, (o = t[s](o)).done, o.value);
              });
            };
        }
      }
      const cd = (t) =>
        t && "number" == typeof t.length && "function" != typeof t;
      function gd(t) {
        return $(null == t ? void 0 : t.then);
      }
      function dd(t) {
        return $(t[fa]);
      }
      function yd(t) {
        return (
          Symbol.asyncIterator &&
          $(null == t ? void 0 : t[Symbol.asyncIterator])
        );
      }
      function fd(t) {
        return new TypeError(
          `You provided ${
            null !== t && "object" == typeof t ? "an invalid object" : `'${t}'`
          } where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`
        );
      }
      const hd = (function Lw() {
        return "function" == typeof Symbol && Symbol.iterator
          ? Symbol.iterator
          : "@@iterator";
      })();
      function pd(t) {
        return $(null == t ? void 0 : t[hd]);
      }
      function md(t) {
        return kw(this, arguments, function* () {
          const n = t.getReader();
          try {
            for (;;) {
              const { value: r, done: i } = yield Hn(n.read());
              if (i) return yield Hn(void 0);
              yield yield Hn(r);
            }
          } finally {
            n.releaseLock();
          }
        });
      }
      function _d(t) {
        return $(null == t ? void 0 : t.getReader);
      }
      function dn(t) {
        if (t instanceof $e) return t;
        if (null != t) {
          if (dd(t))
            return (function Bw(t) {
              return new $e((e) => {
                const n = t[fa]();
                if ($(n.subscribe)) return n.subscribe(e);
                throw new TypeError(
                  "Provided object does not correctly implement Symbol.observable"
                );
              });
            })(t);
          if (cd(t))
            return (function Vw(t) {
              return new $e((e) => {
                for (let n = 0; n < t.length && !e.closed; n++) e.next(t[n]);
                e.complete();
              });
            })(t);
          if (gd(t))
            return (function jw(t) {
              return new $e((e) => {
                t.then(
                  (n) => {
                    e.closed || (e.next(n), e.complete());
                  },
                  (n) => e.error(n)
                ).then(null, rd);
              });
            })(t);
          if (yd(t)) return vd(t);
          if (pd(t))
            return (function Hw(t) {
              return new $e((e) => {
                for (const n of t) if ((e.next(n), e.closed)) return;
                e.complete();
              });
            })(t);
          if (_d(t))
            return (function Uw(t) {
              return vd(md(t));
            })(t);
        }
        throw fd(t);
      }
      function vd(t) {
        return new $e((e) => {
          (function $w(t, e) {
            var n, r, i, s;
            return (function Pw(t, e, n, r) {
              return new (n || (n = Promise))(function (s, o) {
                function b(u) {
                  try {
                    l(r.next(u));
                  } catch (c) {
                    o(c);
                  }
                }
                function a(u) {
                  try {
                    l(r.throw(u));
                  } catch (c) {
                    o(c);
                  }
                }
                function l(u) {
                  u.done
                    ? s(u.value)
                    : (function i(s) {
                        return s instanceof n
                          ? s
                          : new n(function (o) {
                              o(s);
                            });
                      })(u.value).then(b, a);
                }
                l((r = r.apply(t, e || [])).next());
              });
            })(this, void 0, void 0, function* () {
              try {
                for (n = Fw(t); !(r = yield n.next()).done; )
                  if ((e.next(r.value), e.closed)) return;
              } catch (o) {
                i = { error: o };
              } finally {
                try {
                  r && !r.done && (s = n.return) && (yield s.call(n));
                } finally {
                  if (i) throw i.error;
                }
              }
              e.complete();
            });
          })(t, e).catch((n) => e.error(n));
        });
      }
      function yn(t, e, n, r = 0, i = !1) {
        const s = e.schedule(function () {
          n(), i ? t.add(this.schedule(null, r)) : this.unsubscribe();
        }, r);
        if ((t.add(s), !i)) return s;
      }
      function Dd(t, e, n = 1 / 0) {
        return $(e)
          ? Dd(
              (r, i) =>
                (function Nw(t, e) {
                  return gr((n, r) => {
                    let i = 0;
                    n.subscribe(
                      Ei(r, (s) => {
                        r.next(t.call(e, s, i++));
                      })
                    );
                  });
                })((s, o) => e(r, s, i, o))(dn(t(r, i))),
              n
            )
          : ("number" == typeof e && (n = e),
            gr((r, i) =>
              (function Ww(t, e, n, r, i, s, o, b) {
                const a = [];
                let l = 0,
                  u = 0,
                  c = !1;
                const g = () => {
                    c && !a.length && !l && e.complete();
                  },
                  d = (f) => (l < r ? y(f) : a.push(f)),
                  y = (f) => {
                    s && e.next(f), l++;
                    let p = !1;
                    dn(n(f, u++)).subscribe(
                      Ei(
                        e,
                        (_) => {
                          null == i || i(_), s ? d(_) : e.next(_);
                        },
                        () => {
                          p = !0;
                        },
                        void 0,
                        () => {
                          if (p)
                            try {
                              for (l--; a.length && l < r; ) {
                                const _ = a.shift();
                                o ? yn(e, o, () => y(_)) : y(_);
                              }
                              g();
                            } catch (_) {
                              e.error(_);
                            }
                        }
                      )
                    );
                  };
                return (
                  t.subscribe(
                    Ei(e, d, () => {
                      (c = !0), g();
                    })
                  ),
                  () => {
                    null == b || b();
                  }
                );
              })(r, i, t, n)
            ));
      }
      const wd = new $e((t) => t.complete());
      function pa(t) {
        return t[t.length - 1];
      }
      function Cd(t, e = 0) {
        return gr((n, r) => {
          n.subscribe(
            Ei(
              r,
              (i) => yn(r, t, () => r.next(i), e),
              () => yn(r, t, () => r.complete(), e),
              (i) => yn(r, t, () => r.error(i), e)
            )
          );
        });
      }
      function Ed(t, e = 0) {
        return gr((n, r) => {
          r.add(t.schedule(() => n.subscribe(r), e));
        });
      }
      function Id(t, e) {
        if (!t) throw new Error("Iterable cannot be null");
        return new $e((n) => {
          yn(n, e, () => {
            const r = t[Symbol.asyncIterator]();
            yn(
              n,
              e,
              () => {
                r.next().then((i) => {
                  i.done ? n.complete() : n.next(i.value);
                });
              },
              0,
              !0
            );
          });
        });
      }
      function rC(...t) {
        const e = (function Qw(t) {
            return (function qw(t) {
              return t && $(t.schedule);
            })(pa(t))
              ? t.pop()
              : void 0;
          })(t),
          n = (function Yw(t, e) {
            return "number" == typeof pa(t) ? t.pop() : e;
          })(t, 1 / 0),
          r = t;
        return r.length
          ? 1 === r.length
            ? dn(r[0])
            : (function Gw(t = 1 / 0) {
                return Dd(id, t);
              })(n)(
                (function nC(t, e) {
                  return e
                    ? (function tC(t, e) {
                        if (null != t) {
                          if (dd(t))
                            return (function Kw(t, e) {
                              return dn(t).pipe(Ed(e), Cd(e));
                            })(t, e);
                          if (cd(t))
                            return (function Jw(t, e) {
                              return new $e((n) => {
                                let r = 0;
                                return e.schedule(function () {
                                  r === t.length
                                    ? n.complete()
                                    : (n.next(t[r++]),
                                      n.closed || this.schedule());
                                });
                              });
                            })(t, e);
                          if (gd(t))
                            return (function Zw(t, e) {
                              return dn(t).pipe(Ed(e), Cd(e));
                            })(t, e);
                          if (yd(t)) return Id(t, e);
                          if (pd(t))
                            return (function Xw(t, e) {
                              return new $e((n) => {
                                let r;
                                return (
                                  yn(n, e, () => {
                                    (r = t[hd]()),
                                      yn(
                                        n,
                                        e,
                                        () => {
                                          let i, s;
                                          try {
                                            ({ value: i, done: s } = r.next());
                                          } catch (o) {
                                            return void n.error(o);
                                          }
                                          s ? n.complete() : n.next(i);
                                        },
                                        0,
                                        !0
                                      );
                                  }),
                                  () =>
                                    $(null == r ? void 0 : r.return) &&
                                    r.return()
                                );
                              });
                            })(t, e);
                          if (_d(t))
                            return (function eC(t, e) {
                              return Id(md(t), e);
                            })(t, e);
                        }
                        throw fd(t);
                      })(t, e)
                    : dn(t);
                })(r, e)
              )
          : wd;
      }
      function ma(t, e, ...n) {
        if (!0 === e) return void t();
        if (!1 === e) return;
        const r = new wi({
          next: () => {
            r.unsubscribe(), t();
          },
        });
        return e(...n).subscribe(r);
      }
      function Z(t) {
        for (let e in t) if (t[e] === Z) return e;
        throw Error("Could not find renamed property on target object.");
      }
      function q(t) {
        if ("string" == typeof t) return t;
        if (Array.isArray(t)) return "[" + t.map(q).join(", ") + "]";
        if (null == t) return "" + t;
        if (t.overriddenName) return `${t.overriddenName}`;
        if (t.name) return `${t.name}`;
        const e = t.toString();
        if (null == e) return "" + e;
        const n = e.indexOf("\n");
        return -1 === n ? e : e.substring(0, n);
      }
      function va(t, e) {
        return null == t || "" === t
          ? null === e
            ? ""
            : e
          : null == e || "" === e
          ? t
          : t + " " + e;
      }
      const sC = Z({ __forward_ref__: Z });
      function Da(t) {
        return (
          (t.__forward_ref__ = Da),
          (t.toString = function () {
            return q(this());
          }),
          t
        );
      }
      function P(t) {
        return (function Td(t) {
          return (
            "function" == typeof t &&
            t.hasOwnProperty(sC) &&
            t.__forward_ref__ === Da
          );
        })(t)
          ? t()
          : t;
      }
      class G extends Error {
        constructor(e, n) {
          super(
            (function wa(t, e) {
              return `NG0${Math.abs(t)}${e ? ": " + e : ""}`;
            })(e, n)
          ),
            (this.code = e);
        }
      }
      function T(t) {
        return "string" == typeof t ? t : null == t ? "" : String(t);
      }
      function Ae(t) {
        return "function" == typeof t
          ? t.name || t.toString()
          : "object" == typeof t && null != t && "function" == typeof t.type
          ? t.type.name || t.type.toString()
          : T(t);
      }
      function eo(t, e) {
        const n = e ? ` in ${e}` : "";
        throw new G(-201, `No provider for ${Ae(t)} found${n}`);
      }
      function Ze(t, e) {
        null == t &&
          (function J(t, e, n, r) {
            throw new Error(
              `ASSERTION ERROR: ${t}` +
                (null == r ? "" : ` [Expected=> ${n} ${r} ${e} <=Actual]`)
            );
          })(e, t, null, "!=");
      }
      function oe(t) {
        return {
          token: t.token,
          providedIn: t.providedIn || null,
          factory: t.factory,
          value: void 0,
        };
      }
      function dr(t) {
        return { providers: t.providers || [], imports: t.imports || [] };
      }
      function Ca(t) {
        return Sd(t, to) || Sd(t, Ad);
      }
      function Sd(t, e) {
        return t.hasOwnProperty(e) ? t[e] : null;
      }
      function Md(t) {
        return t && (t.hasOwnProperty(Ea) || t.hasOwnProperty(gC))
          ? t[Ea]
          : null;
      }
      const to = Z({ ɵprov: Z }),
        Ea = Z({ ɵinj: Z }),
        Ad = Z({ ngInjectableDef: Z }),
        gC = Z({ ngInjectorDef: Z });
      var A = (() => (
        ((A = A || {})[(A.Default = 0)] = "Default"),
        (A[(A.Host = 1)] = "Host"),
        (A[(A.Self = 2)] = "Self"),
        (A[(A.SkipSelf = 4)] = "SkipSelf"),
        (A[(A.Optional = 8)] = "Optional"),
        A
      ))();
      let Ia;
      function fn(t) {
        const e = Ia;
        return (Ia = t), e;
      }
      function xd(t, e, n) {
        const r = Ca(t);
        return r && "root" == r.providedIn
          ? void 0 === r.value
            ? (r.value = r.factory())
            : r.value
          : n & A.Optional
          ? null
          : void 0 !== e
          ? e
          : void eo(q(t), "Injector");
      }
      function hn(t) {
        return { toString: t }.toString();
      }
      var mt = (() => (
          ((mt = mt || {})[(mt.OnPush = 0)] = "OnPush"),
          (mt[(mt.Default = 1)] = "Default"),
          mt
        ))(),
        kt = (() => {
          return (
            ((t = kt || (kt = {}))[(t.Emulated = 0)] = "Emulated"),
            (t[(t.None = 2)] = "None"),
            (t[(t.ShadowDom = 3)] = "ShadowDom"),
            kt
          );
          var t;
        })();
      const yC = "undefined" != typeof globalThis && globalThis,
        fC = "undefined" != typeof window && window,
        hC =
          "undefined" != typeof self &&
          "undefined" != typeof WorkerGlobalScope &&
          self instanceof WorkerGlobalScope &&
          self,
        Y = yC || ("undefined" != typeof global && global) || fC || hC,
        yr = {},
        X = [],
        no = Z({ ɵcmp: Z }),
        Ta = Z({ ɵdir: Z }),
        Sa = Z({ ɵpipe: Z }),
        Nd = Z({ ɵmod: Z }),
        Jt = Z({ ɵfac: Z }),
        Ii = Z({ __NG_ELEMENT_ID__: Z });
      let pC = 0;
      function Ma(t) {
        return hn(() => {
          const n = {},
            r = {
              type: t.type,
              providersResolver: null,
              decls: t.decls,
              vars: t.vars,
              factory: null,
              template: t.template || null,
              consts: t.consts || null,
              ngContentSelectors: t.ngContentSelectors,
              hostBindings: t.hostBindings || null,
              hostVars: t.hostVars || 0,
              hostAttrs: t.hostAttrs || null,
              contentQueries: t.contentQueries || null,
              declaredInputs: n,
              inputs: null,
              outputs: null,
              exportAs: t.exportAs || null,
              onPush: t.changeDetection === mt.OnPush,
              directiveDefs: null,
              pipeDefs: null,
              selectors: t.selectors || X,
              viewQuery: t.viewQuery || null,
              features: t.features || null,
              data: t.data || {},
              encapsulation: t.encapsulation || kt.Emulated,
              id: "c",
              styles: t.styles || X,
              _: null,
              setInput: null,
              schemas: t.schemas || null,
              tView: null,
            },
            i = t.directives,
            s = t.features,
            o = t.pipes;
          return (
            (r.id += pC++),
            (r.inputs = Fd(t.inputs, n)),
            (r.outputs = Fd(t.outputs)),
            s && s.forEach((b) => b(r)),
            (r.directiveDefs = i
              ? () => ("function" == typeof i ? i() : i).map(Pd)
              : null),
            (r.pipeDefs = o
              ? () => ("function" == typeof o ? o() : o).map(Rd)
              : null),
            r
          );
        });
      }
      function Pd(t) {
        return (
          Ne(t) ||
          (function pn(t) {
            return t[Ta] || null;
          })(t)
        );
      }
      function Rd(t) {
        return (function Un(t) {
          return t[Sa] || null;
        })(t);
      }
      const kd = {};
      function Ti(t) {
        return hn(() => {
          const e = {
            type: t.type,
            bootstrap: t.bootstrap || X,
            declarations: t.declarations || X,
            imports: t.imports || X,
            exports: t.exports || X,
            transitiveCompileScopes: null,
            schemas: t.schemas || null,
            id: t.id || null,
          };
          return null != t.id && (kd[t.id] = t.type), e;
        });
      }
      function Fd(t, e) {
        if (null == t) return yr;
        const n = {};
        for (const r in t)
          if (t.hasOwnProperty(r)) {
            let i = t[r],
              s = i;
            Array.isArray(i) && ((s = i[1]), (i = i[0])),
              (n[i] = r),
              e && (e[i] = s);
          }
        return n;
      }
      const bt = Ma;
      function We(t) {
        return {
          type: t.type,
          name: t.name,
          factory: null,
          pure: !1 !== t.pure,
          onDestroy: t.type.prototype.ngOnDestroy || null,
        };
      }
      function Ne(t) {
        return t[no] || null;
      }
      function at(t, e) {
        const n = t[Nd] || null;
        if (!n && !0 === e)
          throw new Error(`Type ${q(t)} does not have '\u0275mod' property.`);
        return n;
      }
      const R = 11;
      function Ft(t) {
        return Array.isArray(t) && "object" == typeof t[1];
      }
      function vt(t) {
        return Array.isArray(t) && !0 === t[1];
      }
      function Na(t) {
        return 0 != (8 & t.flags);
      }
      function oo(t) {
        return 2 == (2 & t.flags);
      }
      function bo(t) {
        return 1 == (1 & t.flags);
      }
      function Dt(t) {
        return null !== t.template;
      }
      function CC(t) {
        return 0 != (512 & t[2]);
      }
      function zn(t, e) {
        return t.hasOwnProperty(Jt) ? t[Jt] : null;
      }
      class TC {
        constructor(e, n, r) {
          (this.previousValue = e),
            (this.currentValue = n),
            (this.firstChange = r);
        }
        isFirstChange() {
          return this.firstChange;
        }
      }
      function Ld(t) {
        return t.type.prototype.ngOnChanges && (t.setInput = MC), SC;
      }
      function SC() {
        const t = Vd(this),
          e = null == t ? void 0 : t.current;
        if (e) {
          const n = t.previous;
          if (n === yr) t.previous = e;
          else for (let r in e) n[r] = e[r];
          (t.current = null), this.ngOnChanges(e);
        }
      }
      function MC(t, e, n, r) {
        const i =
            Vd(t) ||
            (function AC(t, e) {
              return (t[Bd] = e);
            })(t, { previous: yr, current: null }),
          s = i.current || (i.current = {}),
          o = i.previous,
          b = this.declaredInputs[n],
          a = o[b];
        (s[b] = new TC(a && a.currentValue, e, o === yr)), (t[r] = e);
      }
      const Bd = "__ngSimpleChanges__";
      function Vd(t) {
        return t[Bd] || null;
      }
      let Oa;
      function ce(t) {
        return !!t.listen;
      }
      const jd = {
        createRenderer: (t, e) =>
          (function La() {
            return void 0 !== Oa
              ? Oa
              : "undefined" != typeof document
              ? document
              : void 0;
          })(),
      };
      function he(t) {
        for (; Array.isArray(t); ) t = t[0];
        return t;
      }
      function ct(t, e) {
        return he(e[t.index]);
      }
      function Ba(t, e) {
        return t.data[e];
      }
      function Xe(t, e) {
        const n = e[t];
        return Ft(n) ? n : n[0];
      }
      function Va(t) {
        return 128 == (128 & t[2]);
      }
      function mn(t, e) {
        return null == e ? null : t[e];
      }
      function Ud(t) {
        t[18] = 0;
      }
      function ja(t, e) {
        t[5] += e;
        let n = t,
          r = t[3];
        for (
          ;
          null !== r && ((1 === e && 1 === n[5]) || (-1 === e && 0 === n[5]));

        )
          (r[5] += e), (n = r), (r = r[3]);
      }
      const S = { lFrame: Jd(null), bindingsEnabled: !0 };
      function Wd() {
        return S.bindingsEnabled;
      }
      function m() {
        return S.lFrame.lView;
      }
      function H() {
        return S.lFrame.tView;
      }
      function ve() {
        let t = zd();
        for (; null !== t && 64 === t.type; ) t = t.parent;
        return t;
      }
      function zd() {
        return S.lFrame.currentTNode;
      }
      function Ot(t, e) {
        const n = S.lFrame;
        (n.currentTNode = t), (n.isParent = e);
      }
      function Ha() {
        return S.lFrame.isParent;
      }
      function Ua() {
        S.lFrame.isParent = !1;
      }
      function Le() {
        const t = S.lFrame;
        let e = t.bindingRootIndex;
        return (
          -1 === e && (e = t.bindingRootIndex = t.tView.bindingStartIndex), e
        );
      }
      function vr() {
        return S.lFrame.bindingIndex++;
      }
      function zC(t, e) {
        const n = S.lFrame;
        (n.bindingIndex = n.bindingRootIndex = t), $a(e);
      }
      function $a(t) {
        S.lFrame.currentDirectiveIndex = t;
      }
      function Ga(t) {
        S.lFrame.currentQueryIndex = t;
      }
      function QC(t) {
        const e = t[1];
        return 2 === e.type ? e.declTNode : 1 === e.type ? t[6] : null;
      }
      function Kd(t, e, n) {
        if (n & A.SkipSelf) {
          let i = e,
            s = t;
          for (
            ;
            !((i = i.parent),
            null !== i ||
              n & A.Host ||
              ((i = QC(s)), null === i || ((s = s[15]), 10 & i.type)));

          );
          if (null === i) return !1;
          (e = i), (t = s);
        }
        const r = (S.lFrame = Zd());
        return (r.currentTNode = e), (r.lView = t), !0;
      }
      function co(t) {
        const e = Zd(),
          n = t[1];
        (S.lFrame = e),
          (e.currentTNode = n.firstChild),
          (e.lView = t),
          (e.tView = n),
          (e.contextLView = t),
          (e.bindingIndex = n.bindingStartIndex),
          (e.inI18n = !1);
      }
      function Zd() {
        const t = S.lFrame,
          e = null === t ? null : t.child;
        return null === e ? Jd(t) : e;
      }
      function Jd(t) {
        const e = {
          currentTNode: null,
          isParent: !0,
          lView: null,
          tView: null,
          selectedIndex: -1,
          contextLView: null,
          elementDepthCount: 0,
          currentNamespace: null,
          currentDirectiveIndex: -1,
          bindingRootIndex: -1,
          bindingIndex: -1,
          currentQueryIndex: 0,
          parent: t,
          child: null,
          inI18n: !1,
        };
        return null !== t && (t.child = e), e;
      }
      function Xd() {
        const t = S.lFrame;
        return (
          (S.lFrame = t.parent), (t.currentTNode = null), (t.lView = null), t
        );
      }
      const ey = Xd;
      function go() {
        const t = Xd();
        (t.isParent = !0),
          (t.tView = null),
          (t.selectedIndex = -1),
          (t.contextLView = null),
          (t.elementDepthCount = 0),
          (t.currentDirectiveIndex = -1),
          (t.currentNamespace = null),
          (t.bindingRootIndex = -1),
          (t.bindingIndex = -1),
          (t.currentQueryIndex = 0);
      }
      function Be() {
        return S.lFrame.selectedIndex;
      }
      function _n(t) {
        S.lFrame.selectedIndex = t;
      }
      function yo(t, e) {
        for (let n = e.directiveStart, r = e.directiveEnd; n < r; n++) {
          const s = t.data[n].type.prototype,
            {
              ngAfterContentInit: o,
              ngAfterContentChecked: b,
              ngAfterViewInit: a,
              ngAfterViewChecked: l,
              ngOnDestroy: u,
            } = s;
          o && (t.contentHooks || (t.contentHooks = [])).push(-n, o),
            b &&
              ((t.contentHooks || (t.contentHooks = [])).push(n, b),
              (t.contentCheckHooks || (t.contentCheckHooks = [])).push(n, b)),
            a && (t.viewHooks || (t.viewHooks = [])).push(-n, a),
            l &&
              ((t.viewHooks || (t.viewHooks = [])).push(n, l),
              (t.viewCheckHooks || (t.viewCheckHooks = [])).push(n, l)),
            null != u && (t.destroyHooks || (t.destroyHooks = [])).push(n, u);
        }
      }
      function fo(t, e, n) {
        ty(t, e, 3, n);
      }
      function ho(t, e, n, r) {
        (3 & t[2]) === n && ty(t, e, n, r);
      }
      function za(t, e) {
        let n = t[2];
        (3 & n) === e && ((n &= 2047), (n += 1), (t[2] = n));
      }
      function ty(t, e, n, r) {
        const s = null != r ? r : -1,
          o = e.length - 1;
        let b = 0;
        for (let a = void 0 !== r ? 65535 & t[18] : 0; a < o; a++)
          if ("number" == typeof e[a + 1]) {
            if (((b = e[a]), null != r && b >= r)) break;
          } else
            e[a] < 0 && (t[18] += 65536),
              (b < s || -1 == s) &&
                (rE(t, n, e, a), (t[18] = (4294901760 & t[18]) + a + 2)),
              a++;
      }
      function rE(t, e, n, r) {
        const i = n[r] < 0,
          s = n[r + 1],
          b = t[i ? -n[r] : n[r]];
        if (i) {
          if (t[2] >> 11 < t[18] >> 16 && (3 & t[2]) === e) {
            t[2] += 2048;
            try {
              s.call(b);
            } finally {
            }
          }
        } else
          try {
            s.call(b);
          } finally {
          }
      }
      class Ni {
        constructor(e, n, r) {
          (this.factory = e),
            (this.resolving = !1),
            (this.canSeeViewProviders = n),
            (this.injectImpl = r);
        }
      }
      function po(t, e, n) {
        const r = ce(t);
        let i = 0;
        for (; i < n.length; ) {
          const s = n[i];
          if ("number" == typeof s) {
            if (0 !== s) break;
            i++;
            const o = n[i++],
              b = n[i++],
              a = n[i++];
            r ? t.setAttribute(e, b, a, o) : e.setAttributeNS(o, b, a);
          } else {
            const o = s,
              b = n[++i];
            Qa(o)
              ? r && t.setProperty(e, o, b)
              : r
              ? t.setAttribute(e, o, b)
              : e.setAttribute(o, b),
              i++;
          }
        }
        return i;
      }
      function ny(t) {
        return 3 === t || 4 === t || 6 === t;
      }
      function Qa(t) {
        return 64 === t.charCodeAt(0);
      }
      function mo(t, e) {
        if (null !== e && 0 !== e.length)
          if (null === t || 0 === t.length) t = e.slice();
          else {
            let n = -1;
            for (let r = 0; r < e.length; r++) {
              const i = e[r];
              "number" == typeof i
                ? (n = i)
                : 0 === n ||
                  ry(t, n, i, null, -1 === n || 2 === n ? e[++r] : null);
            }
          }
        return t;
      }
      function ry(t, e, n, r, i) {
        let s = 0,
          o = t.length;
        if (-1 === e) o = -1;
        else
          for (; s < t.length; ) {
            const b = t[s++];
            if ("number" == typeof b) {
              if (b === e) {
                o = -1;
                break;
              }
              if (b > e) {
                o = s - 1;
                break;
              }
            }
          }
        for (; s < t.length; ) {
          const b = t[s];
          if ("number" == typeof b) break;
          if (b === n) {
            if (null === r) return void (null !== i && (t[s + 1] = i));
            if (r === t[s + 1]) return void (t[s + 2] = i);
          }
          s++, null !== r && s++, null !== i && s++;
        }
        -1 !== o && (t.splice(o, 0, e), (s = o + 1)),
          t.splice(s++, 0, n),
          null !== r && t.splice(s++, 0, r),
          null !== i && t.splice(s++, 0, i);
      }
      function iy(t) {
        return -1 !== t;
      }
      function Dr(t) {
        return 32767 & t;
      }
      function wr(t, e) {
        let n = (function aE(t) {
            return t >> 16;
          })(t),
          r = e;
        for (; n > 0; ) (r = r[15]), n--;
        return r;
      }
      let Ya = !0;
      function _o(t) {
        const e = Ya;
        return (Ya = t), e;
      }
      let lE = 0;
      function Ri(t, e) {
        const n = Za(t, e);
        if (-1 !== n) return n;
        const r = e[1];
        r.firstCreatePass &&
          ((t.injectorIndex = e.length),
          Ka(r.data, t),
          Ka(e, null),
          Ka(r.blueprint, null));
        const i = vo(t, e),
          s = t.injectorIndex;
        if (iy(i)) {
          const o = Dr(i),
            b = wr(i, e),
            a = b[1].data;
          for (let l = 0; l < 8; l++) e[s + l] = b[o + l] | a[o + l];
        }
        return (e[s + 8] = i), s;
      }
      function Ka(t, e) {
        t.push(0, 0, 0, 0, 0, 0, 0, 0, e);
      }
      function Za(t, e) {
        return -1 === t.injectorIndex ||
          (t.parent && t.parent.injectorIndex === t.injectorIndex) ||
          null === e[t.injectorIndex + 8]
          ? -1
          : t.injectorIndex;
      }
      function vo(t, e) {
        if (t.parent && -1 !== t.parent.injectorIndex)
          return t.parent.injectorIndex;
        let n = 0,
          r = null,
          i = e;
        for (; null !== i; ) {
          const s = i[1],
            o = s.type;
          if (((r = 2 === o ? s.declTNode : 1 === o ? i[6] : null), null === r))
            return -1;
          if ((n++, (i = i[15]), -1 !== r.injectorIndex))
            return r.injectorIndex | (n << 16);
        }
        return -1;
      }
      function Do(t, e, n) {
        !(function uE(t, e, n) {
          let r;
          "string" == typeof n
            ? (r = n.charCodeAt(0) || 0)
            : n.hasOwnProperty(Ii) && (r = n[Ii]),
            null == r && (r = n[Ii] = lE++);
          const i = 255 & r;
          e.data[t + (i >> 5)] |= 1 << i;
        })(t, e, n);
      }
      function by(t, e, n) {
        if (n & A.Optional) return t;
        eo(e, "NodeInjector");
      }
      function ay(t, e, n, r) {
        if (
          (n & A.Optional && void 0 === r && (r = null),
          0 == (n & (A.Self | A.Host)))
        ) {
          const i = t[9],
            s = fn(void 0);
          try {
            return i ? i.get(e, r, n & A.Optional) : xd(e, r, n & A.Optional);
          } finally {
            fn(s);
          }
        }
        return by(r, e, n);
      }
      function ly(t, e, n, r = A.Default, i) {
        if (null !== t) {
          const s = (function yE(t) {
            if ("string" == typeof t) return t.charCodeAt(0) || 0;
            const e = t.hasOwnProperty(Ii) ? t[Ii] : void 0;
            return "number" == typeof e ? (e >= 0 ? 255 & e : gE) : e;
          })(n);
          if ("function" == typeof s) {
            if (!Kd(e, t, r)) return r & A.Host ? by(i, n, r) : ay(e, n, r, i);
            try {
              const o = s(r);
              if (null != o || r & A.Optional) return o;
              eo(n);
            } finally {
              ey();
            }
          } else if ("number" == typeof s) {
            let o = null,
              b = Za(t, e),
              a = -1,
              l = r & A.Host ? e[16][6] : null;
            for (
              (-1 === b || r & A.SkipSelf) &&
              ((a = -1 === b ? vo(t, e) : e[b + 8]),
              -1 !== a && gy(r, !1)
                ? ((o = e[1]), (b = Dr(a)), (e = wr(a, e)))
                : (b = -1));
              -1 !== b;

            ) {
              const u = e[1];
              if (cy(s, b, u.data)) {
                const c = dE(b, e, n, o, r, l);
                if (c !== uy) return c;
              }
              (a = e[b + 8]),
                -1 !== a && gy(r, e[1].data[b + 8] === l) && cy(s, b, e)
                  ? ((o = u), (b = Dr(a)), (e = wr(a, e)))
                  : (b = -1);
            }
          }
        }
        return ay(e, n, r, i);
      }
      const uy = {};
      function gE() {
        return new Cr(ve(), m());
      }
      function dE(t, e, n, r, i, s) {
        const o = e[1],
          b = o.data[t + 8],
          u = (function wo(t, e, n, r, i) {
            const s = t.providerIndexes,
              o = e.data,
              b = 1048575 & s,
              a = t.directiveStart,
              u = s >> 20,
              g = i ? b + u : t.directiveEnd;
            for (let d = r ? b : b + u; d < g; d++) {
              const y = o[d];
              if ((d < a && n === y) || (d >= a && y.type === n)) return d;
            }
            if (i) {
              const d = o[a];
              if (d && Dt(d) && d.type === n) return a;
            }
            return null;
          })(
            b,
            o,
            n,
            null == r ? oo(b) && Ya : r != o && 0 != (3 & b.type),
            i & A.Host && s === b
          );
        return null !== u ? ki(e, o, u, b) : uy;
      }
      function ki(t, e, n, r) {
        let i = t[n];
        const s = e.data;
        if (
          (function iE(t) {
            return t instanceof Ni;
          })(i)
        ) {
          const o = i;
          o.resolving &&
            (function oC(t, e) {
              const n = e ? `. Dependency path: ${e.join(" > ")} > ${t}` : "";
              throw new G(
                -200,
                `Circular dependency in DI detected for ${t}${n}`
              );
            })(Ae(s[n]));
          const b = _o(o.canSeeViewProviders);
          o.resolving = !0;
          const a = o.injectImpl ? fn(o.injectImpl) : null;
          Kd(t, r, A.Default);
          try {
            (i = t[n] = o.factory(void 0, s, t, r)),
              e.firstCreatePass &&
                n >= r.directiveStart &&
                (function nE(t, e, n) {
                  const {
                    ngOnChanges: r,
                    ngOnInit: i,
                    ngDoCheck: s,
                  } = e.type.prototype;
                  if (r) {
                    const o = Ld(e);
                    (n.preOrderHooks || (n.preOrderHooks = [])).push(t, o),
                      (
                        n.preOrderCheckHooks || (n.preOrderCheckHooks = [])
                      ).push(t, o);
                  }
                  i &&
                    (n.preOrderHooks || (n.preOrderHooks = [])).push(0 - t, i),
                    s &&
                      ((n.preOrderHooks || (n.preOrderHooks = [])).push(t, s),
                      (
                        n.preOrderCheckHooks || (n.preOrderCheckHooks = [])
                      ).push(t, s));
                })(n, s[n], e);
          } finally {
            null !== a && fn(a), _o(b), (o.resolving = !1), ey();
          }
        }
        return i;
      }
      function cy(t, e, n) {
        return !!(n[e + (t >> 5)] & (1 << t));
      }
      function gy(t, e) {
        return !(t & A.Self || (t & A.Host && e));
      }
      class Cr {
        constructor(e, n) {
          (this._tNode = e), (this._lView = n);
        }
        get(e, n, r) {
          return ly(this._tNode, this._lView, e, r, n);
        }
      }
      const Ir = "__parameters__";
      function Sr(t, e, n) {
        return hn(() => {
          const r = (function el(t) {
            return function (...n) {
              if (t) {
                const r = t(...n);
                for (const i in r) this[i] = r[i];
              }
            };
          })(e);
          function i(...s) {
            if (this instanceof i) return r.apply(this, s), this;
            const o = new i(...s);
            return (b.annotation = o), b;
            function b(a, l, u) {
              const c = a.hasOwnProperty(Ir)
                ? a[Ir]
                : Object.defineProperty(a, Ir, { value: [] })[Ir];
              for (; c.length <= u; ) c.push(null);
              return (c[u] = c[u] || []).push(o), a;
            }
          }
          return (
            n && (i.prototype = Object.create(n.prototype)),
            (i.prototype.ngMetadataName = t),
            (i.annotationCls = i),
            i
          );
        });
      }
      class Q {
        constructor(e, n) {
          (this._desc = e),
            (this.ngMetadataName = "InjectionToken"),
            (this.ɵprov = void 0),
            "number" == typeof n
              ? (this.__NG_ELEMENT_ID__ = n)
              : void 0 !== n &&
                (this.ɵprov = oe({
                  token: this,
                  providedIn: n.providedIn || "root",
                  factory: n.factory,
                }));
        }
        toString() {
          return `InjectionToken ${this._desc}`;
        }
      }
      function Lt(t, e) {
        t.forEach((n) => (Array.isArray(n) ? Lt(n, e) : e(n)));
      }
      function yy(t, e, n) {
        e >= t.length ? t.push(n) : t.splice(e, 0, n);
      }
      function Co(t, e) {
        return e >= t.length - 1 ? t.pop() : t.splice(e, 1)[0];
      }
      const Bi = {},
        il = "__NG_DI_FLAG__",
        Io = "ngTempTokenPath",
        TE = /\n/gm,
        _y = "__source",
        ME = Z({ provide: String, useValue: Z });
      let Vi;
      function vy(t) {
        const e = Vi;
        return (Vi = t), e;
      }
      function AE(t, e = A.Default) {
        if (void 0 === Vi) throw new G(203, "");
        return null === Vi
          ? xd(t, void 0, e)
          : Vi.get(t, e & A.Optional ? null : void 0, e);
      }
      function ee(t, e = A.Default) {
        return (
          (function dC() {
            return Ia;
          })() || AE
        )(P(t), e);
      }
      const xE = ee;
      function sl(t) {
        const e = [];
        for (let n = 0; n < t.length; n++) {
          const r = P(t[n]);
          if (Array.isArray(r)) {
            if (0 === r.length) throw new G(900, "");
            let i,
              s = A.Default;
            for (let o = 0; o < r.length; o++) {
              const b = r[o],
                a = NE(b);
              "number" == typeof a
                ? -1 === a
                  ? (i = b.token)
                  : (s |= a)
                : (i = b);
            }
            e.push(ee(i, s));
          } else e.push(ee(r));
        }
        return e;
      }
      function ji(t, e) {
        return (t[il] = e), (t.prototype[il] = e), t;
      }
      function NE(t) {
        return t[il];
      }
      const To = ji(Sr("Optional"), 8),
        So = ji(Sr("SkipSelf"), 4),
        jy = "__ngContext__";
      function Re(t, e) {
        t[jy] = e;
      }
      function fl(t) {
        const e = (function Gi(t) {
          return t[jy] || null;
        })(t);
        return e ? (Array.isArray(e) ? e : e.lView) : null;
      }
      function pl(t) {
        return t.ngOriginalError;
      }
      function CI(t, ...e) {
        t.error(...e);
      }
      class zi {
        constructor() {
          this._console = console;
        }
        handleError(e) {
          const n = this._findOriginalError(e),
            r = (function wI(t) {
              return (t && t.ngErrorLogger) || CI;
            })(e);
          r(this._console, "ERROR", e),
            n && r(this._console, "ORIGINAL ERROR", n);
        }
        _findOriginalError(e) {
          let n = e && pl(e);
          for (; n && pl(n); ) n = pl(n);
          return n || null;
        }
      }
      const RI = (() =>
        (
          ("undefined" != typeof requestAnimationFrame &&
            requestAnimationFrame) ||
          setTimeout
        ).bind(Y))();
      function Vt(t) {
        return t instanceof Function ? t() : t;
      }
      var tt = (() => (
        ((tt = tt || {})[(tt.Important = 1)] = "Important"),
        (tt[(tt.DashCase = 2)] = "DashCase"),
        tt
      ))();
      function _l(t, e) {
        return undefined(t, e);
      }
      function qi(t) {
        const e = t[3];
        return vt(e) ? e[3] : e;
      }
      function vl(t) {
        return Yy(t[13]);
      }
      function Dl(t) {
        return Yy(t[4]);
      }
      function Yy(t) {
        for (; null !== t && !vt(t); ) t = t[4];
        return t;
      }
      function Pr(t, e, n, r, i) {
        if (null != r) {
          let s,
            o = !1;
          vt(r) ? (s = r) : Ft(r) && ((o = !0), (r = r[0]));
          const b = he(r);
          0 === t && null !== n
            ? null == i
              ? tf(e, n, b)
              : qn(e, n, b, i || null, !0)
            : 1 === t && null !== n
            ? qn(e, n, b, i || null, !0)
            : 2 === t
            ? (function lf(t, e, n) {
                const r = Ro(t, e);
                r &&
                  (function qI(t, e, n, r) {
                    ce(t) ? t.removeChild(e, n, r) : e.removeChild(n);
                  })(t, r, e, n);
              })(e, b, o)
            : 3 === t && e.destroyNode(b),
            null != s &&
              (function KI(t, e, n, r, i) {
                const s = n[7];
                s !== he(n) && Pr(e, t, r, s, i);
                for (let b = 10; b < n.length; b++) {
                  const a = n[b];
                  Qi(a[1], a, t, e, r, s);
                }
              })(e, t, s, n, i);
        }
      }
      function Cl(t, e, n) {
        if (ce(t)) return t.createElement(e, n);
        {
          const r =
            null !== n
              ? (function RC(t) {
                  const e = t.toLowerCase();
                  return "svg" === e
                    ? "http://www.w3.org/2000/svg"
                    : "math" === e
                    ? "http://www.w3.org/1998/MathML/"
                    : null;
                })(n)
              : null;
          return null === r ? t.createElement(e) : t.createElementNS(r, e);
        }
      }
      function Zy(t, e) {
        const n = t[9],
          r = n.indexOf(e),
          i = e[3];
        1024 & e[2] && ((e[2] &= -1025), ja(i, -1)), n.splice(r, 1);
      }
      function El(t, e) {
        if (t.length <= 10) return;
        const n = 10 + e,
          r = t[n];
        if (r) {
          const i = r[17];
          null !== i && i !== t && Zy(i, r), e > 0 && (t[n - 1][4] = r[4]);
          const s = Co(t, 10 + e);
          !(function VI(t, e) {
            Qi(t, e, e[R], 2, null, null), (e[0] = null), (e[6] = null);
          })(r[1], r);
          const o = s[19];
          null !== o && o.detachView(s[1]),
            (r[3] = null),
            (r[4] = null),
            (r[2] &= -129);
        }
        return r;
      }
      function Jy(t, e) {
        if (!(256 & e[2])) {
          const n = e[R];
          ce(n) && n.destroyNode && Qi(t, e, n, 3, null, null),
            (function UI(t) {
              let e = t[13];
              if (!e) return Il(t[1], t);
              for (; e; ) {
                let n = null;
                if (Ft(e)) n = e[13];
                else {
                  const r = e[10];
                  r && (n = r);
                }
                if (!n) {
                  for (; e && !e[4] && e !== t; )
                    Ft(e) && Il(e[1], e), (e = e[3]);
                  null === e && (e = t), Ft(e) && Il(e[1], e), (n = e && e[4]);
                }
                e = n;
              }
            })(e);
        }
      }
      function Il(t, e) {
        if (!(256 & e[2])) {
          (e[2] &= -129),
            (e[2] |= 256),
            (function zI(t, e) {
              let n;
              if (null != t && null != (n = t.destroyHooks))
                for (let r = 0; r < n.length; r += 2) {
                  const i = e[n[r]];
                  if (!(i instanceof Ni)) {
                    const s = n[r + 1];
                    if (Array.isArray(s))
                      for (let o = 0; o < s.length; o += 2) {
                        const b = i[s[o]],
                          a = s[o + 1];
                        try {
                          a.call(b);
                        } finally {
                        }
                      }
                    else
                      try {
                        s.call(i);
                      } finally {
                      }
                  }
                }
            })(t, e),
            (function GI(t, e) {
              const n = t.cleanup,
                r = e[7];
              let i = -1;
              if (null !== n)
                for (let s = 0; s < n.length - 1; s += 2)
                  if ("string" == typeof n[s]) {
                    const o = n[s + 1],
                      b = "function" == typeof o ? o(e) : he(e[o]),
                      a = r[(i = n[s + 2])],
                      l = n[s + 3];
                    "boolean" == typeof l
                      ? b.removeEventListener(n[s], a, l)
                      : l >= 0
                      ? r[(i = l)]()
                      : r[(i = -l)].unsubscribe(),
                      (s += 2);
                  } else {
                    const o = r[(i = n[s + 1])];
                    n[s].call(o);
                  }
              if (null !== r) {
                for (let s = i + 1; s < r.length; s++) r[s]();
                e[7] = null;
              }
            })(t, e),
            1 === e[1].type && ce(e[R]) && e[R].destroy();
          const n = e[17];
          if (null !== n && vt(e[3])) {
            n !== e[3] && Zy(n, e);
            const r = e[19];
            null !== r && r.detachView(t);
          }
        }
      }
      function Xy(t, e, n) {
        return (function ef(t, e, n) {
          let r = e;
          for (; null !== r && 40 & r.type; ) r = (e = r).parent;
          if (null === r) return n[0];
          if (2 & r.flags) {
            const i = t.data[r.directiveStart].encapsulation;
            if (i === kt.None || i === kt.Emulated) return null;
          }
          return ct(r, n);
        })(t, e.parent, n);
      }
      function qn(t, e, n, r, i) {
        ce(t) ? t.insertBefore(e, n, r, i) : e.insertBefore(n, r, i);
      }
      function tf(t, e, n) {
        ce(t) ? t.appendChild(e, n) : e.appendChild(n);
      }
      function nf(t, e, n, r, i) {
        null !== r ? qn(t, e, n, r, i) : tf(t, e, n);
      }
      function Ro(t, e) {
        return ce(t) ? t.parentNode(e) : e.parentNode;
      }
      let of = function sf(t, e, n) {
        return 40 & t.type ? ct(t, n) : null;
      };
      function ko(t, e, n, r) {
        const i = Xy(t, r, e),
          s = e[R],
          b = (function rf(t, e, n) {
            return of(t, e, n);
          })(r.parent || e[6], r, e);
        if (null != i)
          if (Array.isArray(n))
            for (let a = 0; a < n.length; a++) nf(s, i, n[a], b, !1);
          else nf(s, i, n, b, !1);
      }
      function Fo(t, e) {
        if (null !== e) {
          const n = e.type;
          if (3 & n) return ct(e, t);
          if (4 & n) return Sl(-1, t[e.index]);
          if (8 & n) {
            const r = e.child;
            if (null !== r) return Fo(t, r);
            {
              const i = t[e.index];
              return vt(i) ? Sl(-1, i) : he(i);
            }
          }
          if (32 & n) return _l(e, t)() || he(t[e.index]);
          {
            const r = af(t, e);
            return null !== r
              ? Array.isArray(r)
                ? r[0]
                : Fo(qi(t[16]), r)
              : Fo(t, e.next);
          }
        }
        return null;
      }
      function af(t, e) {
        return null !== e ? t[16][6].projection[e.projection] : null;
      }
      function Sl(t, e) {
        const n = 10 + t + 1;
        if (n < e.length) {
          const r = e[n],
            i = r[1].firstChild;
          if (null !== i) return Fo(r, i);
        }
        return e[7];
      }
      function Ml(t, e, n, r, i, s, o) {
        for (; null != n; ) {
          const b = r[n.index],
            a = n.type;
          if (
            (o && 0 === e && (b && Re(he(b), r), (n.flags |= 4)),
            64 != (64 & n.flags))
          )
            if (8 & a) Ml(t, e, n.child, r, i, s, !1), Pr(e, t, i, b, s);
            else if (32 & a) {
              const l = _l(n, r);
              let u;
              for (; (u = l()); ) Pr(e, t, i, u, s);
              Pr(e, t, i, b, s);
            } else 16 & a ? uf(t, e, r, n, i, s) : Pr(e, t, i, b, s);
          n = o ? n.projectionNext : n.next;
        }
      }
      function Qi(t, e, n, r, i, s) {
        Ml(n, r, t.firstChild, e, i, s, !1);
      }
      function uf(t, e, n, r, i, s) {
        const o = n[16],
          a = o[6].projection[r.projection];
        if (Array.isArray(a))
          for (let l = 0; l < a.length; l++) Pr(e, t, i, a[l], s);
        else Ml(t, e, a, o[3], i, s, !0);
      }
      function cf(t, e, n) {
        ce(t) ? t.setAttribute(e, "style", n) : (e.style.cssText = n);
      }
      function Al(t, e, n) {
        ce(t)
          ? "" === n
            ? t.removeAttribute(e, "class")
            : t.setAttribute(e, "class", n)
          : (e.className = n);
      }
      function gf(t, e, n) {
        let r = t.length;
        for (;;) {
          const i = t.indexOf(e, n);
          if (-1 === i) return i;
          if (0 === i || t.charCodeAt(i - 1) <= 32) {
            const s = e.length;
            if (i + s === r || t.charCodeAt(i + s) <= 32) return i;
          }
          n = i + 1;
        }
      }
      const df = "ng-template";
      function JI(t, e, n) {
        let r = 0;
        for (; r < t.length; ) {
          let i = t[r++];
          if (n && "class" === i) {
            if (((i = t[r]), -1 !== gf(i.toLowerCase(), e, 0))) return !0;
          } else if (1 === i) {
            for (; r < t.length && "string" == typeof (i = t[r++]); )
              if (i.toLowerCase() === e) return !0;
            return !1;
          }
        }
        return !1;
      }
      function yf(t) {
        return 4 === t.type && t.value !== df;
      }
      function XI(t, e, n) {
        return e === (4 !== t.type || n ? t.value : df);
      }
      function e0(t, e, n) {
        let r = 4;
        const i = t.attrs || [],
          s = (function r0(t) {
            for (let e = 0; e < t.length; e++) if (ny(t[e])) return e;
            return t.length;
          })(i);
        let o = !1;
        for (let b = 0; b < e.length; b++) {
          const a = e[b];
          if ("number" != typeof a) {
            if (!o)
              if (4 & r) {
                if (
                  ((r = 2 | (1 & r)),
                  ("" !== a && !XI(t, a, n)) || ("" === a && 1 === e.length))
                ) {
                  if (wt(r)) return !1;
                  o = !0;
                }
              } else {
                const l = 8 & r ? a : e[++b];
                if (8 & r && null !== t.attrs) {
                  if (!JI(t.attrs, l, n)) {
                    if (wt(r)) return !1;
                    o = !0;
                  }
                  continue;
                }
                const c = t0(8 & r ? "class" : a, i, yf(t), n);
                if (-1 === c) {
                  if (wt(r)) return !1;
                  o = !0;
                  continue;
                }
                if ("" !== l) {
                  let g;
                  g = c > s ? "" : i[c + 1].toLowerCase();
                  const d = 8 & r ? g : null;
                  if ((d && -1 !== gf(d, l, 0)) || (2 & r && l !== g)) {
                    if (wt(r)) return !1;
                    o = !0;
                  }
                }
              }
          } else {
            if (!o && !wt(r) && !wt(a)) return !1;
            if (o && wt(a)) continue;
            (o = !1), (r = a | (1 & r));
          }
        }
        return wt(r) || o;
      }
      function wt(t) {
        return 0 == (1 & t);
      }
      function t0(t, e, n, r) {
        if (null === e) return -1;
        let i = 0;
        if (r || !n) {
          let s = !1;
          for (; i < e.length; ) {
            const o = e[i];
            if (o === t) return i;
            if (3 === o || 6 === o) s = !0;
            else {
              if (1 === o || 2 === o) {
                let b = e[++i];
                for (; "string" == typeof b; ) b = e[++i];
                continue;
              }
              if (4 === o) break;
              if (0 === o) {
                i += 4;
                continue;
              }
            }
            i += s ? 1 : 2;
          }
          return -1;
        }
        return (function s0(t, e) {
          let n = t.indexOf(4);
          if (n > -1)
            for (n++; n < t.length; ) {
              const r = t[n];
              if ("number" == typeof r) return -1;
              if (r === e) return n;
              n++;
            }
          return -1;
        })(e, t);
      }
      function ff(t, e, n = !1) {
        for (let r = 0; r < e.length; r++) if (e0(t, e[r], n)) return !0;
        return !1;
      }
      function hf(t, e) {
        return t ? ":not(" + e.trim() + ")" : e;
      }
      function b0(t) {
        let e = t[0],
          n = 1,
          r = 2,
          i = "",
          s = !1;
        for (; n < t.length; ) {
          let o = t[n];
          if ("string" == typeof o)
            if (2 & r) {
              const b = t[++n];
              i += "[" + o + (b.length > 0 ? '="' + b + '"' : "") + "]";
            } else 8 & r ? (i += "." + o) : 4 & r && (i += " " + o);
          else
            "" !== i && !wt(o) && ((e += hf(s, i)), (i = "")),
              (r = o),
              (s = s || !wt(r));
          n++;
        }
        return "" !== i && (e += hf(s, i)), e;
      }
      const M = {};
      function wn(t) {
        pf(H(), m(), Be() + t, !1);
      }
      function pf(t, e, n, r) {
        if (!r)
          if (3 == (3 & e[2])) {
            const s = t.preOrderCheckHooks;
            null !== s && fo(e, s, n);
          } else {
            const s = t.preOrderHooks;
            null !== s && ho(e, s, 0, n);
          }
        _n(n);
      }
      function Mf(t, e) {
        const n = t.contentQueries;
        if (null !== n)
          for (let r = 0; r < n.length; r += 2) {
            const i = n[r],
              s = n[r + 1];
            if (-1 !== s) {
              const o = t.data[s];
              Ga(i), o.contentQueries(2, e[s], s);
            }
          }
      }
      function Yi(t, e, n, r, i, s, o, b, a, l) {
        const u = e.blueprint.slice();
        return (
          (u[0] = i),
          (u[2] = 140 | r),
          Ud(u),
          (u[3] = u[15] = t),
          (u[8] = n),
          (u[10] = o || (t && t[10])),
          (u[R] = b || (t && t[R])),
          (u[12] = a || (t && t[12]) || null),
          (u[9] = l || (t && t[9]) || null),
          (u[6] = s),
          (u[16] = 2 == e.type ? t[16] : u),
          u
        );
      }
      function Rr(t, e, n, r, i) {
        let s = t.data[e];
        if (null === s)
          (s = (function Hl(t, e, n, r, i) {
            const s = zd(),
              o = Ha(),
              a = (t.data[e] = (function I0(t, e, n, r, i, s) {
                return {
                  type: n,
                  index: r,
                  insertBeforeIndex: null,
                  injectorIndex: e ? e.injectorIndex : -1,
                  directiveStart: -1,
                  directiveEnd: -1,
                  directiveStylingLast: -1,
                  propertyBindings: null,
                  flags: 0,
                  providerIndexes: 0,
                  value: i,
                  attrs: s,
                  mergedAttrs: null,
                  localNames: null,
                  initialInputs: void 0,
                  inputs: null,
                  outputs: null,
                  tViews: null,
                  next: null,
                  projectionNext: null,
                  child: null,
                  parent: e,
                  projection: null,
                  styles: null,
                  stylesWithoutHost: null,
                  residualStyles: void 0,
                  classes: null,
                  classesWithoutHost: null,
                  residualClasses: void 0,
                  classBindings: 0,
                  styleBindings: 0,
                };
              })(0, o ? s : s && s.parent, n, e, r, i));
            return (
              null === t.firstChild && (t.firstChild = a),
              null !== s &&
                (o
                  ? null == s.child && null !== a.parent && (s.child = a)
                  : null === s.next && (s.next = a)),
              a
            );
          })(t, e, n, r, i)),
            (function GC() {
              return S.lFrame.inI18n;
            })() && (s.flags |= 64);
        else if (64 & s.type) {
          (s.type = n), (s.value = r), (s.attrs = i);
          const o = (function xi() {
            const t = S.lFrame,
              e = t.currentTNode;
            return t.isParent ? e : e.parent;
          })();
          s.injectorIndex = null === o ? -1 : o.injectorIndex;
        }
        return Ot(s, !0), s;
      }
      function kr(t, e, n, r) {
        if (0 === n) return -1;
        const i = e.length;
        for (let s = 0; s < n; s++)
          e.push(r), t.blueprint.push(r), t.data.push(null);
        return i;
      }
      function Ki(t, e, n) {
        co(e);
        try {
          const r = t.viewQuery;
          null !== r && Kl(1, r, n);
          const i = t.template;
          null !== i && Af(t, e, i, 1, n),
            t.firstCreatePass && (t.firstCreatePass = !1),
            t.staticContentQueries && Mf(t, e),
            t.staticViewQueries && Kl(2, t.viewQuery, n);
          const s = t.components;
          null !== s &&
            (function w0(t, e) {
              for (let n = 0; n < e.length; n++) $0(t, e[n]);
            })(e, s);
        } catch (r) {
          throw (
            (t.firstCreatePass &&
              ((t.incompleteFirstPass = !0), (t.firstCreatePass = !1)),
            r)
          );
        } finally {
          (e[2] &= -5), go();
        }
      }
      function Fr(t, e, n, r) {
        const i = e[2];
        if (256 != (256 & i)) {
          co(e);
          try {
            Ud(e),
              (function qd(t) {
                return (S.lFrame.bindingIndex = t);
              })(t.bindingStartIndex),
              null !== n && Af(t, e, n, 2, r);
            const o = 3 == (3 & i);
            if (o) {
              const l = t.preOrderCheckHooks;
              null !== l && fo(e, l, null);
            } else {
              const l = t.preOrderHooks;
              null !== l && ho(e, l, 0, null), za(e, 0);
            }
            if (
              ((function H0(t) {
                for (let e = vl(t); null !== e; e = Dl(e)) {
                  if (!e[2]) continue;
                  const n = e[9];
                  for (let r = 0; r < n.length; r++) {
                    const i = n[r],
                      s = i[3];
                    0 == (1024 & i[2]) && ja(s, 1), (i[2] |= 1024);
                  }
                }
              })(e),
              (function j0(t) {
                for (let e = vl(t); null !== e; e = Dl(e))
                  for (let n = 10; n < e.length; n++) {
                    const r = e[n],
                      i = r[1];
                    Va(r) && Fr(i, r, i.template, r[8]);
                  }
              })(e),
              null !== t.contentQueries && Mf(t, e),
              o)
            ) {
              const l = t.contentCheckHooks;
              null !== l && fo(e, l);
            } else {
              const l = t.contentHooks;
              null !== l && ho(e, l, 1), za(e, 1);
            }
            !(function v0(t, e) {
              const n = t.hostBindingOpCodes;
              if (null !== n)
                try {
                  for (let r = 0; r < n.length; r++) {
                    const i = n[r];
                    if (i < 0) _n(~i);
                    else {
                      const s = i,
                        o = n[++r],
                        b = n[++r];
                      zC(o, s), b(2, e[s]);
                    }
                  }
                } finally {
                  _n(-1);
                }
            })(t, e);
            const b = t.components;
            null !== b &&
              (function D0(t, e) {
                for (let n = 0; n < e.length; n++) U0(t, e[n]);
              })(e, b);
            const a = t.viewQuery;
            if ((null !== a && Kl(2, a, r), o)) {
              const l = t.viewCheckHooks;
              null !== l && fo(e, l);
            } else {
              const l = t.viewHooks;
              null !== l && ho(e, l, 2), za(e, 2);
            }
            !0 === t.firstUpdatePass && (t.firstUpdatePass = !1),
              (e[2] &= -73),
              1024 & e[2] && ((e[2] &= -1025), ja(e[3], -1));
          } finally {
            go();
          }
        }
      }
      function C0(t, e, n, r) {
        const i = e[10],
          o = (function Hd(t) {
            return 4 == (4 & t[2]);
          })(e);
        try {
          !o && i.begin && i.begin(), o && Ki(t, e, r), Fr(t, e, n, r);
        } finally {
          !o && i.end && i.end();
        }
      }
      function Af(t, e, n, r, i) {
        const s = Be(),
          o = 2 & r;
        try {
          _n(-1), o && e.length > 20 && pf(t, e, 20, !1), n(r, i);
        } finally {
          _n(s);
        }
      }
      function xf(t, e, n) {
        if (Na(e)) {
          const i = e.directiveEnd;
          for (let s = e.directiveStart; s < i; s++) {
            const o = t.data[s];
            o.contentQueries && o.contentQueries(1, n[s], s);
          }
        }
      }
      function Ul(t, e, n) {
        !Wd() ||
          ((function P0(t, e, n, r) {
            const i = n.directiveStart,
              s = n.directiveEnd;
            t.firstCreatePass || Ri(n, e), Re(r, e);
            const o = n.initialInputs;
            for (let b = i; b < s; b++) {
              const a = t.data[b],
                l = Dt(a);
              l && L0(e, n, a);
              const u = ki(e, t, b, n);
              Re(u, e),
                null !== o && B0(0, b - i, u, a, 0, o),
                l && (Xe(n.index, e)[8] = u);
            }
          })(t, e, n, ct(n, e)),
          128 == (128 & n.flags) &&
            (function R0(t, e, n) {
              const r = n.directiveStart,
                i = n.directiveEnd,
                o = n.index,
                b = (function qC() {
                  return S.lFrame.currentDirectiveIndex;
                })();
              try {
                _n(o);
                for (let a = r; a < i; a++) {
                  const l = t.data[a],
                    u = e[a];
                  $a(a),
                    (null !== l.hostBindings ||
                      0 !== l.hostVars ||
                      null !== l.hostAttrs) &&
                      Bf(l, u);
                }
              } finally {
                _n(-1), $a(b);
              }
            })(t, e, n));
      }
      function $l(t, e, n = ct) {
        const r = e.localNames;
        if (null !== r) {
          let i = e.index + 1;
          for (let s = 0; s < r.length; s += 2) {
            const o = r[s + 1],
              b = -1 === o ? n(e, t) : t[o];
            t[i++] = b;
          }
        }
      }
      function Nf(t) {
        const e = t.tView;
        return null === e || e.incompleteFirstPass
          ? (t.tView = Vo(
              1,
              null,
              t.template,
              t.decls,
              t.vars,
              t.directiveDefs,
              t.pipeDefs,
              t.viewQuery,
              t.schemas,
              t.consts
            ))
          : e;
      }
      function Vo(t, e, n, r, i, s, o, b, a, l) {
        const u = 20 + r,
          c = u + i,
          g = (function E0(t, e) {
            const n = [];
            for (let r = 0; r < e; r++) n.push(r < t ? null : M);
            return n;
          })(u, c),
          d = "function" == typeof l ? l() : l;
        return (g[1] = {
          type: t,
          blueprint: g,
          template: n,
          queries: null,
          viewQuery: b,
          declTNode: e,
          data: g.slice().fill(null, u),
          bindingStartIndex: u,
          expandoStartIndex: c,
          hostBindingOpCodes: null,
          firstCreatePass: !0,
          firstUpdatePass: !0,
          staticViewQueries: !1,
          staticContentQueries: !1,
          preOrderHooks: null,
          preOrderCheckHooks: null,
          contentHooks: null,
          contentCheckHooks: null,
          viewHooks: null,
          viewCheckHooks: null,
          destroyHooks: null,
          cleanup: null,
          contentQueries: null,
          components: null,
          directiveRegistry: "function" == typeof s ? s() : s,
          pipeRegistry: "function" == typeof o ? o() : o,
          firstChild: null,
          schemas: a,
          consts: d,
          incompleteFirstPass: !1,
        });
      }
      function Ff(t, e, n) {
        for (let r in t)
          if (t.hasOwnProperty(r)) {
            const i = t[r];
            (n = null === n ? {} : n).hasOwnProperty(r)
              ? n[r].push(e, i)
              : (n[r] = [e, i]);
          }
        return n;
      }
      function Wl(t, e, n, r) {
        let i = !1;
        if (Wd()) {
          const s = (function k0(t, e, n) {
              const r = t.directiveRegistry;
              let i = null;
              if (r)
                for (let s = 0; s < r.length; s++) {
                  const o = r[s];
                  ff(n, o.selectors, !1) &&
                    (i || (i = []),
                    Do(Ri(n, e), t, o.type),
                    Dt(o) ? (Vf(t, n), i.unshift(o)) : i.push(o));
                }
              return i;
            })(t, e, n),
            o = null === r ? null : { "": -1 };
          if (null !== s) {
            (i = !0), jf(n, t.data.length, s.length);
            for (let u = 0; u < s.length; u++) {
              const c = s[u];
              c.providersResolver && c.providersResolver(c);
            }
            let b = !1,
              a = !1,
              l = kr(t, e, s.length, null);
            for (let u = 0; u < s.length; u++) {
              const c = s[u];
              (n.mergedAttrs = mo(n.mergedAttrs, c.hostAttrs)),
                Hf(t, n, e, l, c),
                O0(l, c, o),
                null !== c.contentQueries && (n.flags |= 8),
                (null !== c.hostBindings ||
                  null !== c.hostAttrs ||
                  0 !== c.hostVars) &&
                  (n.flags |= 128);
              const g = c.type.prototype;
              !b &&
                (g.ngOnChanges || g.ngOnInit || g.ngDoCheck) &&
                ((t.preOrderHooks || (t.preOrderHooks = [])).push(n.index),
                (b = !0)),
                !a &&
                  (g.ngOnChanges || g.ngDoCheck) &&
                  ((t.preOrderCheckHooks || (t.preOrderCheckHooks = [])).push(
                    n.index
                  ),
                  (a = !0)),
                l++;
            }
            !(function T0(t, e) {
              const r = e.directiveEnd,
                i = t.data,
                s = e.attrs,
                o = [];
              let b = null,
                a = null;
              for (let l = e.directiveStart; l < r; l++) {
                const u = i[l],
                  c = u.inputs,
                  g = null === s || yf(e) ? null : V0(c, s);
                o.push(g), (b = Ff(c, l, b)), (a = Ff(u.outputs, l, a));
              }
              null !== b &&
                (b.hasOwnProperty("class") && (e.flags |= 16),
                b.hasOwnProperty("style") && (e.flags |= 32)),
                (e.initialInputs = o),
                (e.inputs = b),
                (e.outputs = a);
            })(t, n);
          }
          o &&
            (function F0(t, e, n) {
              if (e) {
                const r = (t.localNames = []);
                for (let i = 0; i < e.length; i += 2) {
                  const s = n[e[i + 1]];
                  if (null == s) throw new G(-301, !1);
                  r.push(e[i], s);
                }
              }
            })(n, r, o);
        }
        return (n.mergedAttrs = mo(n.mergedAttrs, n.attrs)), i;
      }
      function Lf(t, e, n, r, i, s) {
        const o = s.hostBindings;
        if (o) {
          let b = t.hostBindingOpCodes;
          null === b && (b = t.hostBindingOpCodes = []);
          const a = ~e.index;
          (function N0(t) {
            let e = t.length;
            for (; e > 0; ) {
              const n = t[--e];
              if ("number" == typeof n && n < 0) return n;
            }
            return 0;
          })(b) != a && b.push(a),
            b.push(r, i, o);
        }
      }
      function Bf(t, e) {
        null !== t.hostBindings && t.hostBindings(1, e);
      }
      function Vf(t, e) {
        (e.flags |= 2), (t.components || (t.components = [])).push(e.index);
      }
      function O0(t, e, n) {
        if (n) {
          if (e.exportAs)
            for (let r = 0; r < e.exportAs.length; r++) n[e.exportAs[r]] = t;
          Dt(e) && (n[""] = t);
        }
      }
      function jf(t, e, n) {
        (t.flags |= 1),
          (t.directiveStart = e),
          (t.directiveEnd = e + n),
          (t.providerIndexes = e);
      }
      function Hf(t, e, n, r, i) {
        t.data[r] = i;
        const s = i.factory || (i.factory = zn(i.type)),
          o = new Ni(s, Dt(i), null);
        (t.blueprint[r] = o),
          (n[r] = o),
          Lf(t, e, 0, r, kr(t, n, i.hostVars, M), i);
      }
      function L0(t, e, n) {
        const r = ct(e, t),
          i = Nf(n),
          s = t[10],
          o = jo(
            t,
            Yi(
              t,
              i,
              null,
              n.onPush ? 64 : 16,
              r,
              e,
              s,
              s.createRenderer(r, n),
              null,
              null
            )
          );
        t[e.index] = o;
      }
      function B0(t, e, n, r, i, s) {
        const o = s[e];
        if (null !== o) {
          const b = r.setInput;
          for (let a = 0; a < o.length; ) {
            const l = o[a++],
              u = o[a++],
              c = o[a++];
            null !== b ? r.setInput(n, c, l, u) : (n[u] = c);
          }
        }
      }
      function V0(t, e) {
        let n = null,
          r = 0;
        for (; r < e.length; ) {
          const i = e[r];
          if (0 !== i)
            if (5 !== i) {
              if ("number" == typeof i) break;
              t.hasOwnProperty(i) &&
                (null === n && (n = []), n.push(i, t[i], e[r + 1])),
                (r += 2);
            } else r += 2;
          else r += 4;
        }
        return n;
      }
      function Uf(t, e, n, r) {
        return new Array(t, !0, !1, e, null, 0, r, n, null, null);
      }
      function U0(t, e) {
        const n = Xe(e, t);
        if (Va(n)) {
          const r = n[1];
          80 & n[2] ? Fr(r, n, r.template, n[8]) : n[5] > 0 && zl(n);
        }
      }
      function zl(t) {
        for (let r = vl(t); null !== r; r = Dl(r))
          for (let i = 10; i < r.length; i++) {
            const s = r[i];
            if (1024 & s[2]) {
              const o = s[1];
              Fr(o, s, o.template, s[8]);
            } else s[5] > 0 && zl(s);
          }
        const n = t[1].components;
        if (null !== n)
          for (let r = 0; r < n.length; r++) {
            const i = Xe(n[r], t);
            Va(i) && i[5] > 0 && zl(i);
          }
      }
      function $0(t, e) {
        const n = Xe(e, t),
          r = n[1];
        (function W0(t, e) {
          for (let n = e.length; n < t.blueprint.length; n++)
            e.push(t.blueprint[n]);
        })(r, n),
          Ki(r, n, n[8]);
      }
      function jo(t, e) {
        return t[13] ? (t[14][4] = e) : (t[13] = e), (t[14] = e), e;
      }
      function ql(t) {
        for (; t; ) {
          t[2] |= 64;
          const e = qi(t);
          if (CC(t) && !e) return t;
          t = e;
        }
        return null;
      }
      function $f(t) {
        !(function Ql(t) {
          for (let e = 0; e < t.components.length; e++) {
            const n = t.components[e],
              r = fl(n),
              i = r[1];
            C0(i, r, i.template, n);
          }
        })(t[8]);
      }
      function Kl(t, e, n) {
        Ga(0), e(t, n);
      }
      const z0 = (() => Promise.resolve(null))();
      function Wf(t) {
        return t[7] || (t[7] = []);
      }
      function Gf(t) {
        return t.cleanup || (t.cleanup = []);
      }
      function qf(t, e) {
        const n = t[9],
          r = n ? n.get(zi, null) : null;
        r && r.handleError(e);
      }
      function Qf(t, e, n, r, i) {
        for (let s = 0; s < n.length; ) {
          const o = n[s++],
            b = n[s++],
            a = e[o],
            l = t.data[o];
          null !== l.setInput ? l.setInput(a, i, r, b) : (a[b] = i);
        }
      }
      function nn(t, e, n) {
        const r = (function lo(t, e) {
          return he(e[t]);
        })(e, t);
        !(function Ky(t, e, n) {
          ce(t) ? t.setValue(e, n) : (e.textContent = n);
        })(t[R], r, n);
      }
      function Ho(t, e, n) {
        let r = n ? t.styles : null,
          i = n ? t.classes : null,
          s = 0;
        if (null !== e)
          for (let o = 0; o < e.length; o++) {
            const b = e[o];
            "number" == typeof b
              ? (s = b)
              : 1 == s
              ? (i = va(i, b))
              : 2 == s && (r = va(r, b + ": " + e[++o] + ";"));
          }
        n ? (t.styles = r) : (t.stylesWithoutHost = r),
          n ? (t.classes = i) : (t.classesWithoutHost = i);
      }
      const Zl = new Q("INJECTOR", -1);
      class Yf {
        get(e, n = Bi) {
          if (n === Bi) {
            const r = new Error(`NullInjectorError: No provider for ${q(e)}!`);
            throw ((r.name = "NullInjectorError"), r);
          }
          return n;
        }
      }
      const Jl = new Q("Set Injector scope."),
        Zi = {},
        Y0 = {};
      let Xl;
      function Kf() {
        return void 0 === Xl && (Xl = new Yf()), Xl;
      }
      function Zf(t, e = null, n = null, r) {
        const i = Jf(t, e, n, r);
        return i._resolveInjectorDefTypes(), i;
      }
      function Jf(t, e = null, n = null, r) {
        return new K0(t, n, e || Kf(), r);
      }
      class K0 {
        constructor(e, n, r, i = null) {
          (this.parent = r),
            (this.records = new Map()),
            (this.injectorDefTypes = new Set()),
            (this.onDestroy = new Set()),
            (this._destroyed = !1);
          const s = [];
          n && Lt(n, (b) => this.processProvider(b, e, n)),
            Lt([e], (b) => this.processInjectorType(b, [], s)),
            this.records.set(Zl, Or(void 0, this));
          const o = this.records.get(Jl);
          (this.scope = null != o ? o.value : null),
            (this.source = i || ("object" == typeof e ? null : q(e)));
        }
        get destroyed() {
          return this._destroyed;
        }
        destroy() {
          this.assertNotDestroyed(), (this._destroyed = !0);
          try {
            this.onDestroy.forEach((e) => e.ngOnDestroy());
          } finally {
            this.records.clear(),
              this.onDestroy.clear(),
              this.injectorDefTypes.clear();
          }
        }
        get(e, n = Bi, r = A.Default) {
          this.assertNotDestroyed();
          const i = vy(this),
            s = fn(void 0);
          try {
            if (!(r & A.SkipSelf)) {
              let b = this.records.get(e);
              if (void 0 === b) {
                const a =
                  (function iT(t) {
                    return (
                      "function" == typeof t ||
                      ("object" == typeof t && t instanceof Q)
                    );
                  })(e) && Ca(e);
                (b = a && this.injectableDefInScope(a) ? Or(eu(e), Zi) : null),
                  this.records.set(e, b);
              }
              if (null != b) return this.hydrate(e, b);
            }
            return (r & A.Self ? Kf() : this.parent).get(
              e,
              (n = r & A.Optional && n === Bi ? null : n)
            );
          } catch (o) {
            if ("NullInjectorError" === o.name) {
              if (((o[Io] = o[Io] || []).unshift(q(e)), i)) throw o;
              return (function PE(t, e, n, r) {
                const i = t[Io];
                throw (
                  (e[_y] && i.unshift(e[_y]),
                  (t.message = (function RE(t, e, n, r = null) {
                    t =
                      t && "\n" === t.charAt(0) && "\u0275" == t.charAt(1)
                        ? t.substr(2)
                        : t;
                    let i = q(e);
                    if (Array.isArray(e)) i = e.map(q).join(" -> ");
                    else if ("object" == typeof e) {
                      let s = [];
                      for (let o in e)
                        if (e.hasOwnProperty(o)) {
                          let b = e[o];
                          s.push(
                            o +
                              ":" +
                              ("string" == typeof b ? JSON.stringify(b) : q(b))
                          );
                        }
                      i = `{${s.join(", ")}}`;
                    }
                    return `${n}${r ? "(" + r + ")" : ""}[${i}]: ${t.replace(
                      TE,
                      "\n  "
                    )}`;
                  })("\n" + t.message, i, n, r)),
                  (t.ngTokenPath = i),
                  (t[Io] = null),
                  t)
                );
              })(o, e, "R3InjectorError", this.source);
            }
            throw o;
          } finally {
            fn(s), vy(i);
          }
        }
        _resolveInjectorDefTypes() {
          this.injectorDefTypes.forEach((e) => this.get(e));
        }
        toString() {
          const e = [];
          return (
            this.records.forEach((r, i) => e.push(q(i))),
            `R3Injector[${e.join(", ")}]`
          );
        }
        assertNotDestroyed() {
          if (this._destroyed) throw new G(205, !1);
        }
        processInjectorType(e, n, r) {
          if (!(e = P(e))) return !1;
          let i = Md(e);
          const s = (null == i && e.ngModule) || void 0,
            o = void 0 === s ? e : s,
            b = -1 !== r.indexOf(o);
          if ((void 0 !== s && (i = Md(s)), null == i)) return !1;
          if (null != i.imports && !b) {
            let u;
            r.push(o);
            try {
              Lt(i.imports, (c) => {
                this.processInjectorType(c, n, r) &&
                  (void 0 === u && (u = []), u.push(c));
              });
            } finally {
            }
            if (void 0 !== u)
              for (let c = 0; c < u.length; c++) {
                const { ngModule: g, providers: d } = u[c];
                Lt(d, (y) => this.processProvider(y, g, d || X));
              }
          }
          this.injectorDefTypes.add(o);
          const a = zn(o) || (() => new o());
          this.records.set(o, Or(a, Zi));
          const l = i.providers;
          if (null != l && !b) {
            const u = e;
            Lt(l, (c) => this.processProvider(c, u, l));
          }
          return void 0 !== s && void 0 !== e.providers;
        }
        processProvider(e, n, r) {
          let i = Lr((e = P(e))) ? e : P(e && e.provide);
          const s = (function J0(t, e, n) {
            return eh(t)
              ? Or(void 0, t.useValue)
              : Or(
                  (function Xf(t, e, n) {
                    let r;
                    if (Lr(t)) {
                      const i = P(t);
                      return zn(i) || eu(i);
                    }
                    if (eh(t)) r = () => P(t.useValue);
                    else if (
                      (function eT(t) {
                        return !(!t || !t.useFactory);
                      })(t)
                    )
                      r = () => t.useFactory(...sl(t.deps || []));
                    else if (
                      (function X0(t) {
                        return !(!t || !t.useExisting);
                      })(t)
                    )
                      r = () => ee(P(t.useExisting));
                    else {
                      const i = P(t && (t.useClass || t.provide));
                      if (
                        !(function nT(t) {
                          return !!t.deps;
                        })(t)
                      )
                        return zn(i) || eu(i);
                      r = () => new i(...sl(t.deps));
                    }
                    return r;
                  })(t),
                  Zi
                );
          })(e);
          if (Lr(e) || !0 !== e.multi) this.records.get(i);
          else {
            let o = this.records.get(i);
            o ||
              ((o = Or(void 0, Zi, !0)),
              (o.factory = () => sl(o.multi)),
              this.records.set(i, o)),
              (i = e),
              o.multi.push(e);
          }
          this.records.set(i, s);
        }
        hydrate(e, n) {
          return (
            n.value === Zi && ((n.value = Y0), (n.value = n.factory())),
            "object" == typeof n.value &&
              n.value &&
              (function rT(t) {
                return (
                  null !== t &&
                  "object" == typeof t &&
                  "function" == typeof t.ngOnDestroy
                );
              })(n.value) &&
              this.onDestroy.add(n.value),
            n.value
          );
        }
        injectableDefInScope(e) {
          if (!e.providedIn) return !1;
          const n = P(e.providedIn);
          return "string" == typeof n
            ? "any" === n || n === this.scope
            : this.injectorDefTypes.has(n);
        }
      }
      function eu(t) {
        const e = Ca(t),
          n = null !== e ? e.factory : zn(t);
        if (null !== n) return n;
        if (t instanceof Q) throw new G(204, !1);
        if (t instanceof Function)
          return (function Z0(t) {
            const e = t.length;
            if (e > 0)
              throw (
                ((function Li(t, e) {
                  const n = [];
                  for (let r = 0; r < t; r++) n.push(e);
                  return n;
                })(e, "?"),
                new G(204, !1))
              );
            const n = (function uC(t) {
              const e = t && (t[to] || t[Ad]);
              if (e) {
                const n = (function cC(t) {
                  if (t.hasOwnProperty("name")) return t.name;
                  const e = ("" + t).match(/^function\s*([^\s(]+)/);
                  return null === e ? "" : e[1];
                })(t);
                return (
                  console.warn(
                    `DEPRECATED: DI is instantiating a token "${n}" that inherits its @Injectable decorator but does not provide one itself.\nThis will become an error in a future version of Angular. Please add @Injectable() to the "${n}" class.`
                  ),
                  e
                );
              }
              return null;
            })(t);
            return null !== n ? () => n.factory(t) : () => new t();
          })(t);
        throw new G(204, !1);
      }
      function Or(t, e, n = !1) {
        return { factory: t, value: e, multi: n ? [] : void 0 };
      }
      function eh(t) {
        return null !== t && "object" == typeof t && ME in t;
      }
      function Lr(t) {
        return "function" == typeof t;
      }
      let Ht = (() => {
        class t {
          static create(n, r) {
            var i;
            if (Array.isArray(n)) return Zf({ name: "" }, r, n, "");
            {
              const s = null !== (i = n.name) && void 0 !== i ? i : "";
              return Zf({ name: s }, n.parent, n.providers, s);
            }
          }
        }
        return (
          (t.THROW_IF_NOT_FOUND = Bi),
          (t.NULL = new Yf()),
          (t.ɵprov = oe({
            token: t,
            providedIn: "any",
            factory: () => ee(Zl),
          })),
          (t.__NG_ELEMENT_ID__ = -1),
          t
        );
      })();
      function gT(t, e) {
        yo(fl(t)[1], ve());
      }
      let Uo = null;
      function Br() {
        if (!Uo) {
          const t = Y.Symbol;
          if (t && t.iterator) Uo = t.iterator;
          else {
            const e = Object.getOwnPropertyNames(Map.prototype);
            for (let n = 0; n < e.length; ++n) {
              const r = e[n];
              "entries" !== r &&
                "size" !== r &&
                Map.prototype[r] === Map.prototype.entries &&
                (Uo = r);
            }
          }
        }
        return Uo;
      }
      function Ji(t) {
        return (
          !!iu(t) && (Array.isArray(t) || (!(t instanceof Map) && Br() in t))
        );
      }
      function iu(t) {
        return null !== t && ("function" == typeof t || "object" == typeof t);
      }
      function Ut(t, e, n) {
        return (t[e] = n);
      }
      function ke(t, e, n) {
        return !Object.is(t[e], n) && ((t[e] = n), !0);
      }
      function $o(t, e, n, r, i) {
        const s = (function Qn(t, e, n, r) {
          const i = ke(t, e, n);
          return ke(t, e + 1, r) || i;
        })(t, e, n, r);
        return ke(t, e + 2, i) || s;
      }
      function Qr(t, e, n, r, i, s, o, b) {
        const a = m(),
          l = H(),
          u = t + 20,
          c = l.firstCreatePass
            ? (function CT(t, e, n, r, i, s, o, b, a) {
                const l = e.consts,
                  u = Rr(e, t, 4, o || null, mn(l, b));
                Wl(e, n, u, mn(l, a)), yo(e, u);
                const c = (u.tViews = Vo(
                  2,
                  u,
                  r,
                  i,
                  s,
                  e.directiveRegistry,
                  e.pipeRegistry,
                  null,
                  e.schemas,
                  l
                ));
                return (
                  null !== e.queries &&
                    (e.queries.template(e, u),
                    (c.queries = e.queries.embeddedTView(u))),
                  u
                );
              })(u, l, a, e, n, r, i, s, o)
            : l.data[u];
        Ot(c, !1);
        const g = a[R].createComment("");
        ko(l, a, g, c),
          Re(g, a),
          jo(a, (a[u] = Uf(g, a, g, c))),
          bo(c) && Ul(l, a, c),
          null != o && $l(a, c, b);
      }
      function B(t, e = A.Default) {
        const n = m();
        return null === n ? ee(t, e) : ly(ve(), n, P(t), e);
      }
      function In(t, e, n) {
        const r = m();
        return (
          ke(r, vr(), e) &&
            (function nt(t, e, n, r, i, s, o, b) {
              const a = ct(e, n);
              let u,
                l = e.inputs;
              !b && null != l && (u = l[r])
                ? (Qf(t, n, u, r, i),
                  oo(e) &&
                    (function M0(t, e) {
                      const n = Xe(e, t);
                      16 & n[2] || (n[2] |= 64);
                    })(n, e.index))
                : 3 & e.type &&
                  ((r = (function S0(t) {
                    return "class" === t
                      ? "className"
                      : "for" === t
                      ? "htmlFor"
                      : "formaction" === t
                      ? "formAction"
                      : "innerHtml" === t
                      ? "innerHTML"
                      : "readonly" === t
                      ? "readOnly"
                      : "tabindex" === t
                      ? "tabIndex"
                      : t;
                  })(r)),
                  (i = null != o ? o(i, e.value || "", r) : i),
                  ce(s)
                    ? s.setProperty(a, r, i)
                    : Qa(r) ||
                      (a.setProperty ? a.setProperty(r, i) : (a[r] = i)));
            })(
              H(),
              (function ge() {
                const t = S.lFrame;
                return Ba(t.tView, t.selectedIndex);
              })(),
              r,
              t,
              e,
              r[R],
              n,
              !1
            ),
          In
        );
      }
      function lu(t, e, n, r, i) {
        const o = i ? "class" : "style";
        Qf(t, n, e.inputs[o], o, r);
      }
      function ze(t, e, n, r) {
        const i = m(),
          s = H(),
          o = 20 + t,
          b = i[R],
          a = (i[o] = Cl(
            b,
            e,
            (function tE() {
              return S.lFrame.currentNamespace;
            })()
          )),
          l = s.firstCreatePass
            ? (function zT(t, e, n, r, i, s, o) {
                const b = e.consts,
                  l = Rr(e, t, 2, i, mn(b, s));
                return (
                  Wl(e, n, l, mn(b, o)),
                  null !== l.attrs && Ho(l, l.attrs, !1),
                  null !== l.mergedAttrs && Ho(l, l.mergedAttrs, !0),
                  null !== e.queries && e.queries.elementStart(e, l),
                  l
                );
              })(o, s, i, 0, e, n, r)
            : s.data[o];
        Ot(l, !0);
        const u = l.mergedAttrs;
        null !== u && po(b, a, u);
        const c = l.classes;
        null !== c && Al(b, a, c);
        const g = l.styles;
        return (
          null !== g && cf(b, a, g),
          64 != (64 & l.flags) && ko(s, i, a, l),
          0 ===
            (function VC() {
              return S.lFrame.elementDepthCount;
            })() && Re(a, i),
          (function jC() {
            S.lFrame.elementDepthCount++;
          })(),
          bo(l) && (Ul(s, i, l), xf(s, l, i)),
          null !== r && $l(i, l),
          ze
        );
      }
      function xe() {
        let t = ve();
        Ha() ? Ua() : ((t = t.parent), Ot(t, !1));
        const e = t;
        !(function HC() {
          S.lFrame.elementDepthCount--;
        })();
        const n = H();
        return (
          n.firstCreatePass && (yo(n, t), Na(t) && n.queries.elementEnd(t)),
          null != e.classesWithoutHost &&
            (function oE(t) {
              return 0 != (16 & t.flags);
            })(e) &&
            lu(n, e, m(), e.classesWithoutHost, !0),
          null != e.stylesWithoutHost &&
            (function bE(t) {
              return 0 != (32 & t.flags);
            })(e) &&
            lu(n, e, m(), e.stylesWithoutHost, !1),
          xe
        );
      }
      function es(t, e, n) {
        const r = m(),
          i = H(),
          s = t + 20,
          o = i.firstCreatePass
            ? (function qT(t, e, n, r, i) {
                const s = e.consts,
                  o = mn(s, r),
                  b = Rr(e, t, 8, "ng-container", o);
                return (
                  null !== o && Ho(b, o, !0),
                  Wl(e, n, b, mn(s, i)),
                  null !== e.queries && e.queries.elementStart(e, b),
                  b
                );
              })(s, i, r, e, n)
            : i.data[s];
        Ot(o, !0);
        const b = (r[s] = r[R].createComment(""));
        return (
          ko(i, r, b, o),
          Re(b, r),
          bo(o) && (Ul(i, r, o), xf(i, o, r)),
          null != n && $l(r, o),
          es
        );
      }
      function ts() {
        let t = ve();
        const e = H();
        return (
          Ha() ? Ua() : ((t = t.parent), Ot(t, !1)),
          e.firstCreatePass && (yo(e, t), Na(t) && e.queries.elementEnd(t)),
          ts
        );
      }
      function uu(t) {
        return !!t && "function" == typeof t.then;
      }
      const QT = function Lh(t) {
        return !!t && "function" == typeof t.subscribe;
      };
      function cu(t, e, n, r) {
        const i = m(),
          s = H(),
          o = ve();
        return (
          (function Vh(t, e, n, r, i, s, o, b) {
            const a = bo(r),
              u = t.firstCreatePass && Gf(t),
              c = e[8],
              g = Wf(e);
            let d = !0;
            if (3 & r.type || b) {
              const p = ct(r, e),
                _ = b ? b(p) : p,
                h = g.length,
                C = b ? (N) => b(he(N[r.index])) : r.index;
              if (ce(n)) {
                let N = null;
                if (
                  (!b &&
                    a &&
                    (N = (function YT(t, e, n, r) {
                      const i = t.cleanup;
                      if (null != i)
                        for (let s = 0; s < i.length - 1; s += 2) {
                          const o = i[s];
                          if (o === n && i[s + 1] === r) {
                            const b = e[7],
                              a = i[s + 2];
                            return b.length > a ? b[a] : null;
                          }
                          "string" == typeof o && (s += 2);
                        }
                      return null;
                    })(t, e, i, r.index)),
                  null !== N)
                )
                  ((N.__ngLastListenerFn__ || N).__ngNextListenerFn__ = s),
                    (N.__ngLastListenerFn__ = s),
                    (d = !1);
                else {
                  s = gu(r, e, c, s, !1);
                  const U = n.listen(_, i, s);
                  g.push(s, U), u && u.push(i, C, h, h + 1);
                }
              } else
                (s = gu(r, e, c, s, !0)),
                  _.addEventListener(i, s, o),
                  g.push(s),
                  u && u.push(i, C, h, o);
            } else s = gu(r, e, c, s, !1);
            const y = r.outputs;
            let f;
            if (d && null !== y && (f = y[i])) {
              const p = f.length;
              if (p)
                for (let _ = 0; _ < p; _ += 2) {
                  const ot = e[f[_]][f[_ + 1]].subscribe(s),
                    cr = g.length;
                  g.push(s, ot), u && u.push(i, r.index, cr, -(cr + 1));
                }
            }
          })(s, i, i[R], o, t, e, !!n, r),
          cu
        );
      }
      function jh(t, e, n, r) {
        try {
          return !1 !== n(r);
        } catch (i) {
          return qf(t, i), !1;
        }
      }
      function gu(t, e, n, r, i) {
        return function s(o) {
          if (o === Function) return r;
          const b = 2 & t.flags ? Xe(t.index, e) : e;
          0 == (32 & e[2]) && ql(b);
          let a = jh(e, 0, r, o),
            l = s.__ngNextListenerFn__;
          for (; l; ) (a = jh(e, 0, l, o) && a), (l = l.__ngNextListenerFn__);
          return i && !1 === a && (o.preventDefault(), (o.returnValue = !1)), a;
        };
      }
      function ns(t = 1) {
        return (function YC(t) {
          return (S.lFrame.contextLView = (function KC(t, e) {
            for (; t > 0; ) (e = e[15]), t--;
            return e;
          })(t, S.lFrame.contextLView))[8];
        })(t);
      }
      function rt(t, e = "") {
        const n = m(),
          r = H(),
          i = t + 20,
          s = r.firstCreatePass ? Rr(r, i, 1, e, null) : r.data[i],
          o = (n[i] = (function wl(t, e) {
            return ce(t) ? t.createText(e) : t.createTextNode(e);
          })(n[R], e));
        ko(r, n, o, s), Ot(s, !1);
      }
      function fu(t) {
        return zo("", t, ""), fu;
      }
      function zo(t, e, n) {
        const r = m(),
          i = (function jr(t, e, n, r) {
            return ke(t, vr(), n) ? e + T(n) + r : M;
          })(r, t, e, n);
        return i !== M && nn(r, Be(), i), zo;
      }
      const qo = "en-US";
      let Pp = qo;
      class rm {}
      class VM {
        resolveComponentFactory(e) {
          throw (function BM(t) {
            const e = Error(
              `No component factory found for ${q(
                t
              )}. Did you add it to @NgModule.entryComponents?`
            );
            return (e.ngComponent = t), e;
          })(e);
        }
      }
      let Jo = (() => {
        class t {}
        return (t.NULL = new VM()), t;
      })();
      function jM() {
        return Xr(ve(), m());
      }
      function Xr(t, e) {
        return new ei(ct(t, e));
      }
      let ei = (() => {
        class t {
          constructor(n) {
            this.nativeElement = n;
          }
        }
        return (t.__NG_ELEMENT_ID__ = jM), t;
      })();
      class sm {}
      let om = (() => {
          class t {}
          return (
            (t.__NG_ELEMENT_ID__ = () =>
              (function $M() {
                const t = m(),
                  n = Xe(ve().index, t);
                return (function UM(t) {
                  return t[R];
                })(Ft(n) ? n : t);
              })()),
            t
          );
        })(),
        WM = (() => {
          class t {}
          return (
            (t.ɵprov = oe({
              token: t,
              providedIn: "root",
              factory: () => null,
            })),
            t
          );
        })();
      class wu {
        constructor(e) {
          (this.full = e),
            (this.major = e.split(".")[0]),
            (this.minor = e.split(".")[1]),
            (this.patch = e.split(".").slice(2).join("."));
        }
      }
      const GM = new wu("13.3.11"),
        Cu = {};
      function Xo(t, e, n, r, i = !1) {
        for (; null !== n; ) {
          const s = e[n.index];
          if ((null !== s && r.push(he(s)), vt(s)))
            for (let b = 10; b < s.length; b++) {
              const a = s[b],
                l = a[1].firstChild;
              null !== l && Xo(a[1], a, l, r);
            }
          const o = n.type;
          if (8 & o) Xo(t, e, n.child, r);
          else if (32 & o) {
            const b = _l(n, e);
            let a;
            for (; (a = b()); ) r.push(a);
          } else if (16 & o) {
            const b = af(e, n);
            if (Array.isArray(b)) r.push(...b);
            else {
              const a = qi(e[16]);
              Xo(a[1], a, b, r, !0);
            }
          }
          n = i ? n.projectionNext : n.next;
        }
        return r;
      }
      class as {
        constructor(e, n) {
          (this._lView = e),
            (this._cdRefInjectingView = n),
            (this._appRef = null),
            (this._attachedToViewContainer = !1);
        }
        get rootNodes() {
          const e = this._lView,
            n = e[1];
          return Xo(n, e, n.firstChild, []);
        }
        get context() {
          return this._lView[8];
        }
        set context(e) {
          this._lView[8] = e;
        }
        get destroyed() {
          return 256 == (256 & this._lView[2]);
        }
        destroy() {
          if (this._appRef) this._appRef.detachView(this);
          else if (this._attachedToViewContainer) {
            const e = this._lView[3];
            if (vt(e)) {
              const n = e[8],
                r = n ? n.indexOf(this) : -1;
              r > -1 && (El(e, r), Co(n, r));
            }
            this._attachedToViewContainer = !1;
          }
          Jy(this._lView[1], this._lView);
        }
        onDestroy(e) {
          !(function kf(t, e, n, r) {
            const i = Wf(e);
            null === n
              ? i.push(r)
              : (i.push(n), t.firstCreatePass && Gf(t).push(r, i.length - 1));
          })(this._lView[1], this._lView, null, e);
        }
        markForCheck() {
          ql(this._cdRefInjectingView || this._lView);
        }
        detach() {
          this._lView[2] &= -129;
        }
        reattach() {
          this._lView[2] |= 128;
        }
        detectChanges() {
          !(function Yl(t, e, n) {
            const r = e[10];
            r.begin && r.begin();
            try {
              Fr(t, e, t.template, n);
            } catch (i) {
              throw (qf(e, i), i);
            } finally {
              r.end && r.end();
            }
          })(this._lView[1], this._lView, this.context);
        }
        checkNoChanges() {}
        attachToViewContainerRef() {
          if (this._appRef) throw new G(902, "");
          this._attachedToViewContainer = !0;
        }
        detachFromAppRef() {
          (this._appRef = null),
            (function HI(t, e) {
              Qi(t, e, e[R], 2, null, null);
            })(this._lView[1], this._lView);
        }
        attachToAppRef(e) {
          if (this._attachedToViewContainer) throw new G(902, "");
          this._appRef = e;
        }
      }
      class zM extends as {
        constructor(e) {
          super(e), (this._view = e);
        }
        detectChanges() {
          $f(this._view);
        }
        checkNoChanges() {}
        get context() {
          return null;
        }
      }
      class bm extends Jo {
        constructor(e) {
          super(), (this.ngModule = e);
        }
        resolveComponentFactory(e) {
          const n = Ne(e);
          return new Eu(n, this.ngModule);
        }
      }
      function am(t) {
        const e = [];
        for (let n in t)
          t.hasOwnProperty(n) && e.push({ propName: t[n], templateName: n });
        return e;
      }
      class Eu extends rm {
        constructor(e, n) {
          super(),
            (this.componentDef = e),
            (this.ngModule = n),
            (this.componentType = e.type),
            (this.selector = (function a0(t) {
              return t.map(b0).join(",");
            })(e.selectors)),
            (this.ngContentSelectors = e.ngContentSelectors
              ? e.ngContentSelectors
              : []),
            (this.isBoundToModule = !!n);
        }
        get inputs() {
          return am(this.componentDef.inputs);
        }
        get outputs() {
          return am(this.componentDef.outputs);
        }
        create(e, n, r, i) {
          const s = (i = i || this.ngModule)
              ? (function QM(t, e) {
                  return {
                    get: (n, r, i) => {
                      const s = t.get(n, Cu, i);
                      return s !== Cu || r === Cu ? s : e.get(n, r, i);
                    },
                  };
                })(e, i.injector)
              : e,
            o = s.get(sm, jd),
            b = s.get(WM, null),
            a = o.createRenderer(null, this.componentDef),
            l = this.componentDef.selectors[0][0] || "div",
            u = r
              ? (function Rf(t, e, n) {
                  if (ce(t)) return t.selectRootElement(e, n === kt.ShadowDom);
                  let r = "string" == typeof e ? t.querySelector(e) : e;
                  return (r.textContent = ""), r;
                })(a, r, this.componentDef.encapsulation)
              : Cl(
                  o.createRenderer(null, this.componentDef),
                  l,
                  (function qM(t) {
                    const e = t.toLowerCase();
                    return "svg" === e ? "svg" : "math" === e ? "math" : null;
                  })(l)
                ),
            c = this.componentDef.onPush ? 576 : 528,
            g = (function ch(t, e) {
              return {
                components: [],
                scheduler: t || RI,
                clean: z0,
                playerHandler: e || null,
                flags: 0,
              };
            })(),
            d = Vo(0, null, null, 1, 0, null, null, null, null, null),
            y = Yi(null, d, g, c, null, null, o, a, b, s);
          let f, p;
          co(y);
          try {
            const _ = (function lh(t, e, n, r, i, s) {
              const o = n[1];
              n[20] = t;
              const a = Rr(o, 20, 2, "#host", null),
                l = (a.mergedAttrs = e.hostAttrs);
              null !== l &&
                (Ho(a, l, !0),
                null !== t &&
                  (po(i, t, l),
                  null !== a.classes && Al(i, t, a.classes),
                  null !== a.styles && cf(i, t, a.styles)));
              const u = r.createRenderer(t, e),
                c = Yi(
                  n,
                  Nf(e),
                  null,
                  e.onPush ? 64 : 16,
                  n[20],
                  a,
                  r,
                  u,
                  s || null,
                  null
                );
              return (
                o.firstCreatePass &&
                  (Do(Ri(a, n), o, e.type), Vf(o, a), jf(a, n.length, 1)),
                jo(n, c),
                (n[20] = c)
              );
            })(u, this.componentDef, y, o, a);
            if (u)
              if (r) po(a, u, ["ng-version", GM.full]);
              else {
                const { attrs: h, classes: C } = (function l0(t) {
                  const e = [],
                    n = [];
                  let r = 1,
                    i = 2;
                  for (; r < t.length; ) {
                    let s = t[r];
                    if ("string" == typeof s)
                      2 === i
                        ? "" !== s && e.push(s, t[++r])
                        : 8 === i && n.push(s);
                    else {
                      if (!wt(i)) break;
                      i = s;
                    }
                    r++;
                  }
                  return { attrs: e, classes: n };
                })(this.componentDef.selectors[0]);
                h && po(a, u, h), C && C.length > 0 && Al(a, u, C.join(" "));
              }
            if (((p = Ba(d, 20)), void 0 !== n)) {
              const h = (p.projection = []);
              for (let C = 0; C < this.ngContentSelectors.length; C++) {
                const N = n[C];
                h.push(null != N ? Array.from(N) : null);
              }
            }
            (f = (function uh(t, e, n, r, i) {
              const s = n[1],
                o = (function x0(t, e, n) {
                  const r = ve();
                  t.firstCreatePass &&
                    (n.providersResolver && n.providersResolver(n),
                    Hf(t, r, e, kr(t, e, 1, null), n));
                  const i = ki(e, t, r.directiveStart, r);
                  Re(i, e);
                  const s = ct(r, e);
                  return s && Re(s, e), i;
                })(s, n, e);
              if (
                (r.components.push(o),
                (t[8] = o),
                i && i.forEach((a) => a(o, e)),
                e.contentQueries)
              ) {
                const a = ve();
                e.contentQueries(1, o, a.directiveStart);
              }
              const b = ve();
              return (
                !s.firstCreatePass ||
                  (null === e.hostBindings && null === e.hostAttrs) ||
                  (_n(b.index),
                  Lf(n[1], b, 0, b.directiveStart, b.directiveEnd, e),
                  Bf(e, o)),
                o
              );
            })(_, this.componentDef, y, g, [gT])),
              Ki(d, y, null);
          } finally {
            go();
          }
          return new KM(this.componentType, f, Xr(p, y), y, p);
        }
      }
      class KM extends class LM {} {
        constructor(e, n, r, i, s) {
          super(),
            (this.location = r),
            (this._rootLView = i),
            (this._tNode = s),
            (this.instance = n),
            (this.hostView = this.changeDetectorRef = new zM(i)),
            (this.componentType = e);
        }
        get injector() {
          return new Cr(this._tNode, this._rootLView);
        }
        destroy() {
          this.hostView.destroy();
        }
        onDestroy(e) {
          this.hostView.onDestroy(e);
        }
      }
      class ti {}
      const ni = new Map();
      class cm extends ti {
        constructor(e, n) {
          super(),
            (this._parent = n),
            (this._bootstrapComponents = []),
            (this.injector = this),
            (this.destroyCbs = []),
            (this.componentFactoryResolver = new bm(this));
          const r = at(e);
          (this._bootstrapComponents = Vt(r.bootstrap)),
            (this._r3Injector = Jf(
              e,
              n,
              [
                { provide: ti, useValue: this },
                { provide: Jo, useValue: this.componentFactoryResolver },
              ],
              q(e)
            )),
            this._r3Injector._resolveInjectorDefTypes(),
            (this.instance = this.get(e));
        }
        get(e, n = Ht.THROW_IF_NOT_FOUND, r = A.Default) {
          return e === Ht || e === ti || e === Zl
            ? this
            : this._r3Injector.get(e, n, r);
        }
        destroy() {
          const e = this._r3Injector;
          !e.destroyed && e.destroy(),
            this.destroyCbs.forEach((n) => n()),
            (this.destroyCbs = null);
        }
        onDestroy(e) {
          this.destroyCbs.push(e);
        }
      }
      class Iu extends class JM {} {
        constructor(e) {
          super(),
            (this.moduleType = e),
            null !== at(e) &&
              (function XM(t) {
                const e = new Set();
                !(function n(r) {
                  const i = at(r, !0),
                    s = i.id;
                  null !== s &&
                    ((function lm(t, e, n) {
                      if (e && e !== n)
                        throw new Error(
                          `Duplicate module registered for ${t} - ${q(
                            e
                          )} vs ${q(e.name)}`
                        );
                    })(s, ni.get(s), r),
                    ni.set(s, r));
                  const o = Vt(i.imports);
                  for (const b of o) e.has(b) || (e.add(b), n(b));
                })(t);
              })(e);
        }
        create(e) {
          return new cm(this.moduleType, e);
        }
      }
      function gm(t, e, n, r, i, s) {
        return (function fm(t, e, n, r, i, s, o, b) {
          const a = e + n;
          return $o(t, a, i, s, o)
            ? Ut(t, a + 3, b ? r.call(b, i, s, o) : r(i, s, o))
            : ls(t, a + 3);
        })(m(), Le(), t, e, n, r, i, s);
      }
      function ls(t, e) {
        const n = t[e];
        return n === M ? void 0 : n;
      }
      function _m(t, e, n) {
        const r = t + 20,
          i = m(),
          s = (function _r(t, e) {
            return t[e];
          })(i, r);
        return (function us(t, e) {
          return t[1].data[e].pure;
        })(i, r)
          ? (function dm(t, e, n, r, i, s) {
              const o = e + n;
              return ke(t, o, i)
                ? Ut(t, o + 1, s ? r.call(s, i) : r(i))
                : ls(t, o + 1);
            })(i, Le(), e, s.transform, n, s)
          : s.transform(n);
      }
      function Tu(t) {
        return (e) => {
          setTimeout(t, void 0, e);
        };
      }
      const rn = class yA extends Ci {
        constructor(e = !1) {
          super(), (this.__isAsync = e);
        }
        emit(e) {
          super.next(e);
        }
        subscribe(e, n, r) {
          var i, s, o;
          let b = e,
            a = n || (() => null),
            l = r;
          if (e && "object" == typeof e) {
            const c = e;
            (b = null === (i = c.next) || void 0 === i ? void 0 : i.bind(c)),
              (a = null === (s = c.error) || void 0 === s ? void 0 : s.bind(c)),
              (l =
                null === (o = c.complete) || void 0 === o ? void 0 : o.bind(c));
          }
          this.__isAsync && ((a = Tu(a)), b && (b = Tu(b)), l && (l = Tu(l)));
          const u = super.subscribe({ next: b, error: a, complete: l });
          return e instanceof Rt && e.add(u), u;
        }
      };
      Symbol;
      let sn = (() => {
        class t {}
        return (t.__NG_ELEMENT_ID__ = mA), t;
      })();
      const hA = sn,
        pA = class extends hA {
          constructor(e, n, r) {
            super(),
              (this._declarationLView = e),
              (this._declarationTContainer = n),
              (this.elementRef = r);
          }
          createEmbeddedView(e) {
            const n = this._declarationTContainer.tViews,
              r = Yi(
                this._declarationLView,
                n,
                e,
                16,
                null,
                n.declTNode,
                null,
                null,
                null,
                null
              );
            r[17] = this._declarationLView[this._declarationTContainer.index];
            const s = this._declarationLView[19];
            return (
              null !== s && (r[19] = s.createEmbeddedView(n)),
              Ki(n, r, e),
              new as(r)
            );
          }
        };
      function mA() {
        return (function eb(t, e) {
          return 4 & t.type ? new pA(e, t, Xr(t, e)) : null;
        })(ve(), m());
      }
      let Gt = (() => {
        class t {}
        return (t.__NG_ELEMENT_ID__ = _A), t;
      })();
      function _A() {
        return (function wm(t, e) {
          let n;
          const r = e[t.index];
          if (vt(r)) n = r;
          else {
            let i;
            if (8 & t.type) i = he(r);
            else {
              const s = e[R];
              i = s.createComment("");
              const o = ct(t, e);
              qn(
                s,
                Ro(s, o),
                i,
                (function QI(t, e) {
                  return ce(t) ? t.nextSibling(e) : e.nextSibling;
                })(s, o),
                !1
              );
            }
            (e[t.index] = n = Uf(r, e, i, t)), jo(e, n);
          }
          return new vm(n, t, e);
        })(ve(), m());
      }
      const vA = Gt,
        vm = class extends vA {
          constructor(e, n, r) {
            super(),
              (this._lContainer = e),
              (this._hostTNode = n),
              (this._hostLView = r);
          }
          get element() {
            return Xr(this._hostTNode, this._hostLView);
          }
          get injector() {
            return new Cr(this._hostTNode, this._hostLView);
          }
          get parentInjector() {
            const e = vo(this._hostTNode, this._hostLView);
            if (iy(e)) {
              const n = wr(e, this._hostLView),
                r = Dr(e);
              return new Cr(n[1].data[r + 8], n);
            }
            return new Cr(null, this._hostLView);
          }
          clear() {
            for (; this.length > 0; ) this.remove(this.length - 1);
          }
          get(e) {
            const n = Dm(this._lContainer);
            return (null !== n && n[e]) || null;
          }
          get length() {
            return this._lContainer.length - 10;
          }
          createEmbeddedView(e, n, r) {
            const i = e.createEmbeddedView(n || {});
            return this.insert(i, r), i;
          }
          createComponent(e, n, r, i, s) {
            const o =
              e &&
              !(function Oi(t) {
                return "function" == typeof t;
              })(e);
            let b;
            if (o) b = n;
            else {
              const c = n || {};
              (b = c.index),
                (r = c.injector),
                (i = c.projectableNodes),
                (s = c.ngModuleRef);
            }
            const a = o ? e : new Eu(Ne(e)),
              l = r || this.parentInjector;
            if (!s && null == a.ngModule) {
              const g = (o ? l : this.parentInjector).get(ti, null);
              g && (s = g);
            }
            const u = a.create(l, i, void 0, s);
            return this.insert(u.hostView, b), u;
          }
          insert(e, n) {
            const r = e._lView,
              i = r[1];
            if (
              (function BC(t) {
                return vt(t[3]);
              })(r)
            ) {
              const u = this.indexOf(e);
              if (-1 !== u) this.detach(u);
              else {
                const c = r[3],
                  g = new vm(c, c[6], c[3]);
                g.detach(g.indexOf(e));
              }
            }
            const s = this._adjustIndex(n),
              o = this._lContainer;
            !(function $I(t, e, n, r) {
              const i = 10 + r,
                s = n.length;
              r > 0 && (n[i - 1][4] = e),
                r < s - 10
                  ? ((e[4] = n[i]), yy(n, 10 + r, e))
                  : (n.push(e), (e[4] = null)),
                (e[3] = n);
              const o = e[17];
              null !== o &&
                n !== o &&
                (function WI(t, e) {
                  const n = t[9];
                  e[16] !== e[3][3][16] && (t[2] = !0),
                    null === n ? (t[9] = [e]) : n.push(e);
                })(o, e);
              const b = e[19];
              null !== b && b.insertView(t), (e[2] |= 128);
            })(i, r, o, s);
            const b = Sl(s, o),
              a = r[R],
              l = Ro(a, o[7]);
            return (
              null !== l &&
                (function jI(t, e, n, r, i, s) {
                  (r[0] = i), (r[6] = e), Qi(t, r, n, 1, i, s);
                })(i, o[6], a, r, l, b),
              e.attachToViewContainerRef(),
              yy(Mu(o), s, e),
              e
            );
          }
          move(e, n) {
            return this.insert(e, n);
          }
          indexOf(e) {
            const n = Dm(this._lContainer);
            return null !== n ? n.indexOf(e) : -1;
          }
          remove(e) {
            const n = this._adjustIndex(e, -1),
              r = El(this._lContainer, n);
            r && (Co(Mu(this._lContainer), n), Jy(r[1], r));
          }
          detach(e) {
            const n = this._adjustIndex(e, -1),
              r = El(this._lContainer, n);
            return r && null != Co(Mu(this._lContainer), n) ? new as(r) : null;
          }
          _adjustIndex(e, n = 0) {
            return null == e ? this.length + n : e;
          }
        };
      function Dm(t) {
        return t[8];
      }
      function Mu(t) {
        return t[8] || (t[8] = []);
      }
      function rb(...t) {}
      const Wm = new Q("Application Initializer");
      let Vu = (() => {
        class t {
          constructor(n) {
            (this.appInits = n),
              (this.resolve = rb),
              (this.reject = rb),
              (this.initialized = !1),
              (this.done = !1),
              (this.donePromise = new Promise((r, i) => {
                (this.resolve = r), (this.reject = i);
              }));
          }
          runInitializers() {
            if (this.initialized) return;
            const n = [],
              r = () => {
                (this.done = !0), this.resolve();
              };
            if (this.appInits)
              for (let i = 0; i < this.appInits.length; i++) {
                const s = this.appInits[i]();
                if (uu(s)) n.push(s);
                else if (QT(s)) {
                  const o = new Promise((b, a) => {
                    s.subscribe({ complete: b, error: a });
                  });
                  n.push(o);
                }
              }
            Promise.all(n)
              .then(() => {
                r();
              })
              .catch((i) => {
                this.reject(i);
              }),
              0 === n.length && r(),
              (this.initialized = !0);
          }
        }
        return (
          (t.ɵfac = function (n) {
            return new (n || t)(ee(Wm, 8));
          }),
          (t.ɵprov = oe({ token: t, factory: t.ɵfac, providedIn: "root" })),
          t
        );
      })();
      const gs = new Q("AppId", {
        providedIn: "root",
        factory: function Gm() {
          return `${ju()}${ju()}${ju()}`;
        },
      });
      function ju() {
        return String.fromCharCode(97 + Math.floor(25 * Math.random()));
      }
      const zm = new Q("Platform Initializer"),
        qm = new Q("Platform ID", {
          providedIn: "platform",
          factory: () => "unknown",
        }),
        KA = new Q("appBootstrapListener"),
        Tn = new Q("LocaleId", {
          providedIn: "root",
          factory: () =>
            xE(Tn, A.Optional | A.SkipSelf) ||
            (function ZA() {
              return (
                ("undefined" != typeof $localize && $localize.locale) || qo
              );
            })(),
        }),
        tx = (() => Promise.resolve(0))();
      function Hu(t) {
        "undefined" == typeof Zone
          ? tx.then(() => {
              t && t.apply(null, null);
            })
          : Zone.current.scheduleMicroTask("scheduleMicrotask", t);
      }
      class qe {
        constructor({
          enableLongStackTrace: e = !1,
          shouldCoalesceEventChangeDetection: n = !1,
          shouldCoalesceRunChangeDetection: r = !1,
        }) {
          if (
            ((this.hasPendingMacrotasks = !1),
            (this.hasPendingMicrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new rn(!1)),
            (this.onMicrotaskEmpty = new rn(!1)),
            (this.onStable = new rn(!1)),
            (this.onError = new rn(!1)),
            "undefined" == typeof Zone)
          )
            throw new Error("In this configuration Angular requires Zone.js");
          Zone.assertZonePatched();
          const i = this;
          (i._nesting = 0),
            (i._outer = i._inner = Zone.current),
            Zone.TaskTrackingZoneSpec &&
              (i._inner = i._inner.fork(new Zone.TaskTrackingZoneSpec())),
            e &&
              Zone.longStackTraceZoneSpec &&
              (i._inner = i._inner.fork(Zone.longStackTraceZoneSpec)),
            (i.shouldCoalesceEventChangeDetection = !r && n),
            (i.shouldCoalesceRunChangeDetection = r),
            (i.lastRequestAnimationFrameId = -1),
            (i.nativeRequestAnimationFrame = (function nx() {
              let t = Y.requestAnimationFrame,
                e = Y.cancelAnimationFrame;
              if ("undefined" != typeof Zone && t && e) {
                const n = t[Zone.__symbol__("OriginalDelegate")];
                n && (t = n);
                const r = e[Zone.__symbol__("OriginalDelegate")];
                r && (e = r);
              }
              return {
                nativeRequestAnimationFrame: t,
                nativeCancelAnimationFrame: e,
              };
            })().nativeRequestAnimationFrame),
            (function sx(t) {
              const e = () => {
                !(function ix(t) {
                  t.isCheckStableRunning ||
                    -1 !== t.lastRequestAnimationFrameId ||
                    ((t.lastRequestAnimationFrameId =
                      t.nativeRequestAnimationFrame.call(Y, () => {
                        t.fakeTopEventTask ||
                          (t.fakeTopEventTask = Zone.root.scheduleEventTask(
                            "fakeTopEventTask",
                            () => {
                              (t.lastRequestAnimationFrameId = -1),
                                $u(t),
                                (t.isCheckStableRunning = !0),
                                Uu(t),
                                (t.isCheckStableRunning = !1);
                            },
                            void 0,
                            () => {},
                            () => {}
                          )),
                          t.fakeTopEventTask.invoke();
                      })),
                    $u(t));
                })(t);
              };
              t._inner = t._inner.fork({
                name: "angular",
                properties: { isAngularZone: !0 },
                onInvokeTask: (n, r, i, s, o, b) => {
                  try {
                    return Qm(t), n.invokeTask(i, s, o, b);
                  } finally {
                    ((t.shouldCoalesceEventChangeDetection &&
                      "eventTask" === s.type) ||
                      t.shouldCoalesceRunChangeDetection) &&
                      e(),
                      Ym(t);
                  }
                },
                onInvoke: (n, r, i, s, o, b, a) => {
                  try {
                    return Qm(t), n.invoke(i, s, o, b, a);
                  } finally {
                    t.shouldCoalesceRunChangeDetection && e(), Ym(t);
                  }
                },
                onHasTask: (n, r, i, s) => {
                  n.hasTask(i, s),
                    r === i &&
                      ("microTask" == s.change
                        ? ((t._hasPendingMicrotasks = s.microTask),
                          $u(t),
                          Uu(t))
                        : "macroTask" == s.change &&
                          (t.hasPendingMacrotasks = s.macroTask));
                },
                onHandleError: (n, r, i, s) => (
                  n.handleError(i, s),
                  t.runOutsideAngular(() => t.onError.emit(s)),
                  !1
                ),
              });
            })(i);
        }
        static isInAngularZone() {
          return (
            "undefined" != typeof Zone &&
            !0 === Zone.current.get("isAngularZone")
          );
        }
        static assertInAngularZone() {
          if (!qe.isInAngularZone())
            throw new Error("Expected to be in Angular Zone, but it is not!");
        }
        static assertNotInAngularZone() {
          if (qe.isInAngularZone())
            throw new Error("Expected to not be in Angular Zone, but it is!");
        }
        run(e, n, r) {
          return this._inner.run(e, n, r);
        }
        runTask(e, n, r, i) {
          const s = this._inner,
            o = s.scheduleEventTask("NgZoneEvent: " + i, e, rx, rb, rb);
          try {
            return s.runTask(o, n, r);
          } finally {
            s.cancelTask(o);
          }
        }
        runGuarded(e, n, r) {
          return this._inner.runGuarded(e, n, r);
        }
        runOutsideAngular(e) {
          return this._outer.run(e);
        }
      }
      const rx = {};
      function Uu(t) {
        if (0 == t._nesting && !t.hasPendingMicrotasks && !t.isStable)
          try {
            t._nesting++, t.onMicrotaskEmpty.emit(null);
          } finally {
            if ((t._nesting--, !t.hasPendingMicrotasks))
              try {
                t.runOutsideAngular(() => t.onStable.emit(null));
              } finally {
                t.isStable = !0;
              }
          }
      }
      function $u(t) {
        t.hasPendingMicrotasks = !!(
          t._hasPendingMicrotasks ||
          ((t.shouldCoalesceEventChangeDetection ||
            t.shouldCoalesceRunChangeDetection) &&
            -1 !== t.lastRequestAnimationFrameId)
        );
      }
      function Qm(t) {
        t._nesting++,
          t.isStable && ((t.isStable = !1), t.onUnstable.emit(null));
      }
      function Ym(t) {
        t._nesting--, Uu(t);
      }
      class ox {
        constructor() {
          (this.hasPendingMicrotasks = !1),
            (this.hasPendingMacrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new rn()),
            (this.onMicrotaskEmpty = new rn()),
            (this.onStable = new rn()),
            (this.onError = new rn());
        }
        run(e, n, r) {
          return e.apply(n, r);
        }
        runGuarded(e, n, r) {
          return e.apply(n, r);
        }
        runOutsideAngular(e) {
          return e();
        }
        runTask(e, n, r, i) {
          return e.apply(n, r);
        }
      }
      let Wu = (() => {
          class t {
            constructor(n) {
              (this._ngZone = n),
                (this._pendingCount = 0),
                (this._isZoneStable = !0),
                (this._didWork = !1),
                (this._callbacks = []),
                (this.taskTrackingZone = null),
                this._watchAngularEvents(),
                n.run(() => {
                  this.taskTrackingZone =
                    "undefined" == typeof Zone
                      ? null
                      : Zone.current.get("TaskTrackingZone");
                });
            }
            _watchAngularEvents() {
              this._ngZone.onUnstable.subscribe({
                next: () => {
                  (this._didWork = !0), (this._isZoneStable = !1);
                },
              }),
                this._ngZone.runOutsideAngular(() => {
                  this._ngZone.onStable.subscribe({
                    next: () => {
                      qe.assertNotInAngularZone(),
                        Hu(() => {
                          (this._isZoneStable = !0),
                            this._runCallbacksIfReady();
                        });
                    },
                  });
                });
            }
            increasePendingRequestCount() {
              return (
                (this._pendingCount += 1),
                (this._didWork = !0),
                this._pendingCount
              );
            }
            decreasePendingRequestCount() {
              if (((this._pendingCount -= 1), this._pendingCount < 0))
                throw new Error("pending async requests below zero");
              return this._runCallbacksIfReady(), this._pendingCount;
            }
            isStable() {
              return (
                this._isZoneStable &&
                0 === this._pendingCount &&
                !this._ngZone.hasPendingMacrotasks
              );
            }
            _runCallbacksIfReady() {
              if (this.isStable())
                Hu(() => {
                  for (; 0 !== this._callbacks.length; ) {
                    let n = this._callbacks.pop();
                    clearTimeout(n.timeoutId), n.doneCb(this._didWork);
                  }
                  this._didWork = !1;
                });
              else {
                let n = this.getPendingTasks();
                (this._callbacks = this._callbacks.filter(
                  (r) =>
                    !r.updateCb ||
                    !r.updateCb(n) ||
                    (clearTimeout(r.timeoutId), !1)
                )),
                  (this._didWork = !0);
              }
            }
            getPendingTasks() {
              return this.taskTrackingZone
                ? this.taskTrackingZone.macroTasks.map((n) => ({
                    source: n.source,
                    creationLocation: n.creationLocation,
                    data: n.data,
                  }))
                : [];
            }
            addCallback(n, r, i) {
              let s = -1;
              r &&
                r > 0 &&
                (s = setTimeout(() => {
                  (this._callbacks = this._callbacks.filter(
                    (o) => o.timeoutId !== s
                  )),
                    n(this._didWork, this.getPendingTasks());
                }, r)),
                this._callbacks.push({ doneCb: n, timeoutId: s, updateCb: i });
            }
            whenStable(n, r, i) {
              if (i && !this.taskTrackingZone)
                throw new Error(
                  'Task tracking zone is required when passing an update callback to whenStable(). Is "zone.js/plugins/task-tracking" loaded?'
                );
              this.addCallback(n, r, i), this._runCallbacksIfReady();
            }
            getPendingRequestCount() {
              return this._pendingCount;
            }
            findProviders(n, r, i) {
              return [];
            }
          }
          return (
            (t.ɵfac = function (n) {
              return new (n || t)(ee(qe));
            }),
            (t.ɵprov = oe({ token: t, factory: t.ɵfac })),
            t
          );
        })(),
        bx = (() => {
          class t {
            constructor() {
              (this._applications = new Map()), Gu.addToWindow(this);
            }
            registerApplication(n, r) {
              this._applications.set(n, r);
            }
            unregisterApplication(n) {
              this._applications.delete(n);
            }
            unregisterAllApplications() {
              this._applications.clear();
            }
            getTestability(n) {
              return this._applications.get(n) || null;
            }
            getAllTestabilities() {
              return Array.from(this._applications.values());
            }
            getAllRootElements() {
              return Array.from(this._applications.keys());
            }
            findTestabilityInTree(n, r = !0) {
              return Gu.findTestabilityInTree(this, n, r);
            }
          }
          return (
            (t.ɵfac = function (n) {
              return new (n || t)();
            }),
            (t.ɵprov = oe({
              token: t,
              factory: t.ɵfac,
              providedIn: "platform",
            })),
            t
          );
        })();
      class ax {
        addToWindow(e) {}
        findTestabilityInTree(e, n, r) {
          return null;
        }
      }
      let Gu = new ax(),
        Kn = null;
      const Km = new Q("AllowMultipleToken"),
        Zm = new Q("PlatformOnDestroy");
      function Jm(t, e, n = []) {
        const r = `Platform: ${e}`,
          i = new Q(r);
        return (s = []) => {
          let o = zu();
          if (!o || o.injector.get(Km, !1)) {
            const b = [...n, ...s, { provide: i, useValue: !0 }];
            t
              ? t(b)
              : (function gx(t) {
                  if (Kn && !Kn.get(Km, !1)) throw new G(400, "");
                  Kn = t;
                  const e = t.get(Xm),
                    n = t.get(zm, null);
                  n && n.forEach((r) => r());
                })(
                  (function yx(t = [], e) {
                    return Ht.create({
                      name: e,
                      providers: [
                        { provide: Jl, useValue: "platform" },
                        { provide: Zm, useValue: () => (Kn = null) },
                        ...t,
                      ],
                    });
                  })(b, r)
                );
          }
          return (function dx(t) {
            const e = zu();
            if (!e) throw new G(401, "");
            return e;
          })();
        };
      }
      function zu() {
        var t;
        return null !== (t = null == Kn ? void 0 : Kn.get(Xm)) && void 0 !== t
          ? t
          : null;
      }
      let Xm = (() => {
        class t {
          constructor(n) {
            (this._injector = n),
              (this._modules = []),
              (this._destroyListeners = []),
              (this._destroyed = !1);
          }
          bootstrapModuleFactory(n, r) {
            const b = (function fx(t, e) {
                let n;
                return (
                  (n =
                    "noop" === t
                      ? new ox()
                      : ("zone.js" === t ? void 0 : t) ||
                        new qe({
                          enableLongStackTrace: !1,
                          shouldCoalesceEventChangeDetection: !!(null == e
                            ? void 0
                            : e.ngZoneEventCoalescing),
                          shouldCoalesceRunChangeDetection: !!(null == e
                            ? void 0
                            : e.ngZoneRunCoalescing),
                        })),
                  n
                );
              })(r ? r.ngZone : void 0, {
                ngZoneEventCoalescing: (r && r.ngZoneEventCoalescing) || !1,
                ngZoneRunCoalescing: (r && r.ngZoneRunCoalescing) || !1,
              }),
              a = [{ provide: qe, useValue: b }];
            return b.run(() => {
              const l = Ht.create({
                  providers: a,
                  parent: this.injector,
                  name: n.moduleType.name,
                }),
                u = n.create(l),
                c = u.injector.get(zi, null);
              if (!c) throw new G(402, "");
              return (
                b.runOutsideAngular(() => {
                  const g = b.onError.subscribe({
                    next: (d) => {
                      c.handleError(d);
                    },
                  });
                  u.onDestroy(() => {
                    qu(this._modules, u), g.unsubscribe();
                  });
                }),
                (function hx(t, e, n) {
                  try {
                    const r = n();
                    return uu(r)
                      ? r.catch((i) => {
                          throw (
                            (e.runOutsideAngular(() => t.handleError(i)), i)
                          );
                        })
                      : r;
                  } catch (r) {
                    throw (e.runOutsideAngular(() => t.handleError(r)), r);
                  }
                })(c, b, () => {
                  const g = u.injector.get(Vu);
                  return (
                    g.runInitializers(),
                    g.donePromise.then(
                      () => (
                        (function HS(t) {
                          Ze(t, "Expected localeId to be defined"),
                            "string" == typeof t &&
                              (Pp = t.toLowerCase().replace(/_/g, "-"));
                        })(u.injector.get(Tn, qo) || qo),
                        this._moduleDoBootstrap(u),
                        u
                      )
                    )
                  );
                })
              );
            });
          }
          bootstrapModule(n, r = []) {
            const i = e_({}, r);
            return (function ux(t, e, n) {
              const r = new Iu(n);
              return Promise.resolve(r);
            })(0, 0, n).then((s) => this.bootstrapModuleFactory(s, i));
          }
          _moduleDoBootstrap(n) {
            const r = n.injector.get(t_);
            if (n._bootstrapComponents.length > 0)
              n._bootstrapComponents.forEach((i) => r.bootstrap(i));
            else {
              if (!n.instance.ngDoBootstrap) throw new G(403, "");
              n.instance.ngDoBootstrap(r);
            }
            this._modules.push(n);
          }
          onDestroy(n) {
            this._destroyListeners.push(n);
          }
          get injector() {
            return this._injector;
          }
          destroy() {
            if (this._destroyed) throw new G(404, "");
            this._modules.slice().forEach((r) => r.destroy()),
              this._destroyListeners.forEach((r) => r());
            const n = this._injector.get(Zm, null);
            null == n || n(), (this._destroyed = !0);
          }
          get destroyed() {
            return this._destroyed;
          }
        }
        return (
          (t.ɵfac = function (n) {
            return new (n || t)(ee(Ht));
          }),
          (t.ɵprov = oe({ token: t, factory: t.ɵfac, providedIn: "platform" })),
          t
        );
      })();
      function e_(t, e) {
        return Array.isArray(e)
          ? e.reduce(e_, t)
          : Object.assign(Object.assign({}, t), e);
      }
      let t_ = (() => {
        class t {
          constructor(n, r, i, s) {
            (this._zone = n),
              (this._injector = r),
              (this._exceptionHandler = i),
              (this._initStatus = s),
              (this._bootstrapListeners = []),
              (this._views = []),
              (this._runningTick = !1),
              (this._stable = !0),
              (this.componentTypes = []),
              (this.components = []),
              (this._onMicrotaskEmptySubscription =
                this._zone.onMicrotaskEmpty.subscribe({
                  next: () => {
                    this._zone.run(() => {
                      this.tick();
                    });
                  },
                }));
            const o = new $e((a) => {
                (this._stable =
                  this._zone.isStable &&
                  !this._zone.hasPendingMacrotasks &&
                  !this._zone.hasPendingMicrotasks),
                  this._zone.runOutsideAngular(() => {
                    a.next(this._stable), a.complete();
                  });
              }),
              b = new $e((a) => {
                let l;
                this._zone.runOutsideAngular(() => {
                  l = this._zone.onStable.subscribe(() => {
                    qe.assertNotInAngularZone(),
                      Hu(() => {
                        !this._stable &&
                          !this._zone.hasPendingMacrotasks &&
                          !this._zone.hasPendingMicrotasks &&
                          ((this._stable = !0), a.next(!0));
                      });
                  });
                });
                const u = this._zone.onUnstable.subscribe(() => {
                  qe.assertInAngularZone(),
                    this._stable &&
                      ((this._stable = !1),
                      this._zone.runOutsideAngular(() => {
                        a.next(!1);
                      }));
                });
                return () => {
                  l.unsubscribe(), u.unsubscribe();
                };
              });
            this.isStable = rC(
              o,
              b.pipe(
                (function iC(t = {}) {
                  const {
                    connector: e = () => new Ci(),
                    resetOnError: n = !0,
                    resetOnComplete: r = !0,
                    resetOnRefCountZero: i = !0,
                  } = t;
                  return (s) => {
                    let o,
                      b,
                      a,
                      l = 0,
                      u = !1,
                      c = !1;
                    const g = () => {
                        null == b || b.unsubscribe(), (b = void 0);
                      },
                      d = () => {
                        g(), (o = a = void 0), (u = c = !1);
                      },
                      y = () => {
                        const f = o;
                        d(), null == f || f.unsubscribe();
                      };
                    return gr((f, p) => {
                      l++, !c && !u && g();
                      const _ = (a = null != a ? a : e());
                      p.add(() => {
                        l--, 0 === l && !c && !u && (b = ma(y, i));
                      }),
                        _.subscribe(p),
                        !o &&
                          l > 0 &&
                          ((o = new wi({
                            next: (h) => _.next(h),
                            error: (h) => {
                              (c = !0), g(), (b = ma(d, n, h)), _.error(h);
                            },
                            complete: () => {
                              (u = !0), g(), (b = ma(d, r)), _.complete();
                            },
                          })),
                          dn(f).subscribe(o));
                    })(s);
                  };
                })()
              )
            );
          }
          bootstrap(n, r) {
            if (!this._initStatus.done) throw new G(405, "");
            let i;
            (i =
              n instanceof rm
                ? n
                : this._injector.get(Jo).resolveComponentFactory(n)),
              this.componentTypes.push(i.componentType);
            const s = (function cx(t) {
                return t.isBoundToModule;
              })(i)
                ? void 0
                : this._injector.get(ti),
              b = i.create(Ht.NULL, [], r || i.selector, s),
              a = b.location.nativeElement,
              l = b.injector.get(Wu, null),
              u = l && b.injector.get(bx);
            return (
              l && u && u.registerApplication(a, l),
              b.onDestroy(() => {
                this.detachView(b.hostView),
                  qu(this.components, b),
                  u && u.unregisterApplication(a);
              }),
              this._loadComponent(b),
              b
            );
          }
          tick() {
            if (this._runningTick) throw new G(101, "");
            try {
              this._runningTick = !0;
              for (let n of this._views) n.detectChanges();
            } catch (n) {
              this._zone.runOutsideAngular(() =>
                this._exceptionHandler.handleError(n)
              );
            } finally {
              this._runningTick = !1;
            }
          }
          attachView(n) {
            const r = n;
            this._views.push(r), r.attachToAppRef(this);
          }
          detachView(n) {
            const r = n;
            qu(this._views, r), r.detachFromAppRef();
          }
          _loadComponent(n) {
            this.attachView(n.hostView),
              this.tick(),
              this.components.push(n),
              this._injector
                .get(KA, [])
                .concat(this._bootstrapListeners)
                .forEach((i) => i(n));
          }
          ngOnDestroy() {
            this._views.slice().forEach((n) => n.destroy()),
              this._onMicrotaskEmptySubscription.unsubscribe();
          }
          get viewCount() {
            return this._views.length;
          }
        }
        return (
          (t.ɵfac = function (n) {
            return new (n || t)(ee(qe), ee(Ht), ee(zi), ee(Vu));
          }),
          (t.ɵprov = oe({ token: t, factory: t.ɵfac, providedIn: "root" })),
          t
        );
      })();
      function qu(t, e) {
        const n = t.indexOf(e);
        n > -1 && t.splice(n, 1);
      }
      let r_ = !0;
      class a_ {
        constructor() {}
        supports(e) {
          return Ji(e);
        }
        create(e) {
          return new Sx(e);
        }
      }
      const Tx = (t, e) => e;
      class Sx {
        constructor(e) {
          (this.length = 0),
            (this._linkedRecords = null),
            (this._unlinkedRecords = null),
            (this._previousItHead = null),
            (this._itHead = null),
            (this._itTail = null),
            (this._additionsHead = null),
            (this._additionsTail = null),
            (this._movesHead = null),
            (this._movesTail = null),
            (this._removalsHead = null),
            (this._removalsTail = null),
            (this._identityChangesHead = null),
            (this._identityChangesTail = null),
            (this._trackByFn = e || Tx);
        }
        forEachItem(e) {
          let n;
          for (n = this._itHead; null !== n; n = n._next) e(n);
        }
        forEachOperation(e) {
          let n = this._itHead,
            r = this._removalsHead,
            i = 0,
            s = null;
          for (; n || r; ) {
            const o = !r || (n && n.currentIndex < u_(r, i, s)) ? n : r,
              b = u_(o, i, s),
              a = o.currentIndex;
            if (o === r) i--, (r = r._nextRemoved);
            else if (((n = n._next), null == o.previousIndex)) i++;
            else {
              s || (s = []);
              const l = b - i,
                u = a - i;
              if (l != u) {
                for (let g = 0; g < l; g++) {
                  const d = g < s.length ? s[g] : (s[g] = 0),
                    y = d + g;
                  u <= y && y < l && (s[g] = d + 1);
                }
                s[o.previousIndex] = u - l;
              }
            }
            b !== a && e(o, b, a);
          }
        }
        forEachPreviousItem(e) {
          let n;
          for (n = this._previousItHead; null !== n; n = n._nextPrevious) e(n);
        }
        forEachAddedItem(e) {
          let n;
          for (n = this._additionsHead; null !== n; n = n._nextAdded) e(n);
        }
        forEachMovedItem(e) {
          let n;
          for (n = this._movesHead; null !== n; n = n._nextMoved) e(n);
        }
        forEachRemovedItem(e) {
          let n;
          for (n = this._removalsHead; null !== n; n = n._nextRemoved) e(n);
        }
        forEachIdentityChange(e) {
          let n;
          for (
            n = this._identityChangesHead;
            null !== n;
            n = n._nextIdentityChange
          )
            e(n);
        }
        diff(e) {
          if ((null == e && (e = []), !Ji(e))) throw new G(900, "");
          return this.check(e) ? this : null;
        }
        onDestroy() {}
        check(e) {
          this._reset();
          let i,
            s,
            o,
            n = this._itHead,
            r = !1;
          if (Array.isArray(e)) {
            this.length = e.length;
            for (let b = 0; b < this.length; b++)
              (s = e[b]),
                (o = this._trackByFn(b, s)),
                null !== n && Object.is(n.trackById, o)
                  ? (r && (n = this._verifyReinsertion(n, s, o, b)),
                    Object.is(n.item, s) || this._addIdentityChange(n, s))
                  : ((n = this._mismatch(n, s, o, b)), (r = !0)),
                (n = n._next);
          } else
            (i = 0),
              (function wT(t, e) {
                if (Array.isArray(t))
                  for (let n = 0; n < t.length; n++) e(t[n]);
                else {
                  const n = t[Br()]();
                  let r;
                  for (; !(r = n.next()).done; ) e(r.value);
                }
              })(e, (b) => {
                (o = this._trackByFn(i, b)),
                  null !== n && Object.is(n.trackById, o)
                    ? (r && (n = this._verifyReinsertion(n, b, o, i)),
                      Object.is(n.item, b) || this._addIdentityChange(n, b))
                    : ((n = this._mismatch(n, b, o, i)), (r = !0)),
                  (n = n._next),
                  i++;
              }),
              (this.length = i);
          return this._truncate(n), (this.collection = e), this.isDirty;
        }
        get isDirty() {
          return (
            null !== this._additionsHead ||
            null !== this._movesHead ||
            null !== this._removalsHead ||
            null !== this._identityChangesHead
          );
        }
        _reset() {
          if (this.isDirty) {
            let e;
            for (
              e = this._previousItHead = this._itHead;
              null !== e;
              e = e._next
            )
              e._nextPrevious = e._next;
            for (e = this._additionsHead; null !== e; e = e._nextAdded)
              e.previousIndex = e.currentIndex;
            for (
              this._additionsHead = this._additionsTail = null,
                e = this._movesHead;
              null !== e;
              e = e._nextMoved
            )
              e.previousIndex = e.currentIndex;
            (this._movesHead = this._movesTail = null),
              (this._removalsHead = this._removalsTail = null),
              (this._identityChangesHead = this._identityChangesTail = null);
          }
        }
        _mismatch(e, n, r, i) {
          let s;
          return (
            null === e ? (s = this._itTail) : ((s = e._prev), this._remove(e)),
            null !==
            (e =
              null === this._unlinkedRecords
                ? null
                : this._unlinkedRecords.get(r, null))
              ? (Object.is(e.item, n) || this._addIdentityChange(e, n),
                this._reinsertAfter(e, s, i))
              : null !==
                (e =
                  null === this._linkedRecords
                    ? null
                    : this._linkedRecords.get(r, i))
              ? (Object.is(e.item, n) || this._addIdentityChange(e, n),
                this._moveAfter(e, s, i))
              : (e = this._addAfter(new Mx(n, r), s, i)),
            e
          );
        }
        _verifyReinsertion(e, n, r, i) {
          let s =
            null === this._unlinkedRecords
              ? null
              : this._unlinkedRecords.get(r, null);
          return (
            null !== s
              ? (e = this._reinsertAfter(s, e._prev, i))
              : e.currentIndex != i &&
                ((e.currentIndex = i), this._addToMoves(e, i)),
            e
          );
        }
        _truncate(e) {
          for (; null !== e; ) {
            const n = e._next;
            this._addToRemovals(this._unlink(e)), (e = n);
          }
          null !== this._unlinkedRecords && this._unlinkedRecords.clear(),
            null !== this._additionsTail &&
              (this._additionsTail._nextAdded = null),
            null !== this._movesTail && (this._movesTail._nextMoved = null),
            null !== this._itTail && (this._itTail._next = null),
            null !== this._removalsTail &&
              (this._removalsTail._nextRemoved = null),
            null !== this._identityChangesTail &&
              (this._identityChangesTail._nextIdentityChange = null);
        }
        _reinsertAfter(e, n, r) {
          null !== this._unlinkedRecords && this._unlinkedRecords.remove(e);
          const i = e._prevRemoved,
            s = e._nextRemoved;
          return (
            null === i ? (this._removalsHead = s) : (i._nextRemoved = s),
            null === s ? (this._removalsTail = i) : (s._prevRemoved = i),
            this._insertAfter(e, n, r),
            this._addToMoves(e, r),
            e
          );
        }
        _moveAfter(e, n, r) {
          return (
            this._unlink(e),
            this._insertAfter(e, n, r),
            this._addToMoves(e, r),
            e
          );
        }
        _addAfter(e, n, r) {
          return (
            this._insertAfter(e, n, r),
            (this._additionsTail =
              null === this._additionsTail
                ? (this._additionsHead = e)
                : (this._additionsTail._nextAdded = e)),
            e
          );
        }
        _insertAfter(e, n, r) {
          const i = null === n ? this._itHead : n._next;
          return (
            (e._next = i),
            (e._prev = n),
            null === i ? (this._itTail = e) : (i._prev = e),
            null === n ? (this._itHead = e) : (n._next = e),
            null === this._linkedRecords && (this._linkedRecords = new l_()),
            this._linkedRecords.put(e),
            (e.currentIndex = r),
            e
          );
        }
        _remove(e) {
          return this._addToRemovals(this._unlink(e));
        }
        _unlink(e) {
          null !== this._linkedRecords && this._linkedRecords.remove(e);
          const n = e._prev,
            r = e._next;
          return (
            null === n ? (this._itHead = r) : (n._next = r),
            null === r ? (this._itTail = n) : (r._prev = n),
            e
          );
        }
        _addToMoves(e, n) {
          return (
            e.previousIndex === n ||
              (this._movesTail =
                null === this._movesTail
                  ? (this._movesHead = e)
                  : (this._movesTail._nextMoved = e)),
            e
          );
        }
        _addToRemovals(e) {
          return (
            null === this._unlinkedRecords &&
              (this._unlinkedRecords = new l_()),
            this._unlinkedRecords.put(e),
            (e.currentIndex = null),
            (e._nextRemoved = null),
            null === this._removalsTail
              ? ((this._removalsTail = this._removalsHead = e),
                (e._prevRemoved = null))
              : ((e._prevRemoved = this._removalsTail),
                (this._removalsTail = this._removalsTail._nextRemoved = e)),
            e
          );
        }
        _addIdentityChange(e, n) {
          return (
            (e.item = n),
            (this._identityChangesTail =
              null === this._identityChangesTail
                ? (this._identityChangesHead = e)
                : (this._identityChangesTail._nextIdentityChange = e)),
            e
          );
        }
      }
      class Mx {
        constructor(e, n) {
          (this.item = e),
            (this.trackById = n),
            (this.currentIndex = null),
            (this.previousIndex = null),
            (this._nextPrevious = null),
            (this._prev = null),
            (this._next = null),
            (this._prevDup = null),
            (this._nextDup = null),
            (this._prevRemoved = null),
            (this._nextRemoved = null),
            (this._nextAdded = null),
            (this._nextMoved = null),
            (this._nextIdentityChange = null);
        }
      }
      class Ax {
        constructor() {
          (this._head = null), (this._tail = null);
        }
        add(e) {
          null === this._head
            ? ((this._head = this._tail = e),
              (e._nextDup = null),
              (e._prevDup = null))
            : ((this._tail._nextDup = e),
              (e._prevDup = this._tail),
              (e._nextDup = null),
              (this._tail = e));
        }
        get(e, n) {
          let r;
          for (r = this._head; null !== r; r = r._nextDup)
            if (
              (null === n || n <= r.currentIndex) &&
              Object.is(r.trackById, e)
            )
              return r;
          return null;
        }
        remove(e) {
          const n = e._prevDup,
            r = e._nextDup;
          return (
            null === n ? (this._head = r) : (n._nextDup = r),
            null === r ? (this._tail = n) : (r._prevDup = n),
            null === this._head
          );
        }
      }
      class l_ {
        constructor() {
          this.map = new Map();
        }
        put(e) {
          const n = e.trackById;
          let r = this.map.get(n);
          r || ((r = new Ax()), this.map.set(n, r)), r.add(e);
        }
        get(e, n) {
          const i = this.map.get(e);
          return i ? i.get(e, n) : null;
        }
        remove(e) {
          const n = e.trackById;
          return this.map.get(n).remove(e) && this.map.delete(n), e;
        }
        get isEmpty() {
          return 0 === this.map.size;
        }
        clear() {
          this.map.clear();
        }
      }
      function u_(t, e, n) {
        const r = t.previousIndex;
        if (null === r) return r;
        let i = 0;
        return n && r < n.length && (i = n[r]), r + e + i;
      }
      class c_ {
        constructor() {}
        supports(e) {
          return e instanceof Map || iu(e);
        }
        create() {
          return new xx();
        }
      }
      class xx {
        constructor() {
          (this._records = new Map()),
            (this._mapHead = null),
            (this._appendAfter = null),
            (this._previousMapHead = null),
            (this._changesHead = null),
            (this._changesTail = null),
            (this._additionsHead = null),
            (this._additionsTail = null),
            (this._removalsHead = null),
            (this._removalsTail = null);
        }
        get isDirty() {
          return (
            null !== this._additionsHead ||
            null !== this._changesHead ||
            null !== this._removalsHead
          );
        }
        forEachItem(e) {
          let n;
          for (n = this._mapHead; null !== n; n = n._next) e(n);
        }
        forEachPreviousItem(e) {
          let n;
          for (n = this._previousMapHead; null !== n; n = n._nextPrevious) e(n);
        }
        forEachChangedItem(e) {
          let n;
          for (n = this._changesHead; null !== n; n = n._nextChanged) e(n);
        }
        forEachAddedItem(e) {
          let n;
          for (n = this._additionsHead; null !== n; n = n._nextAdded) e(n);
        }
        forEachRemovedItem(e) {
          let n;
          for (n = this._removalsHead; null !== n; n = n._nextRemoved) e(n);
        }
        diff(e) {
          if (e) {
            if (!(e instanceof Map || iu(e))) throw new G(900, "");
          } else e = new Map();
          return this.check(e) ? this : null;
        }
        onDestroy() {}
        check(e) {
          this._reset();
          let n = this._mapHead;
          if (
            ((this._appendAfter = null),
            this._forEach(e, (r, i) => {
              if (n && n.key === i)
                this._maybeAddToChanges(n, r),
                  (this._appendAfter = n),
                  (n = n._next);
              else {
                const s = this._getOrCreateRecordForKey(i, r);
                n = this._insertBeforeOrAppend(n, s);
              }
            }),
            n)
          ) {
            n._prev && (n._prev._next = null), (this._removalsHead = n);
            for (let r = n; null !== r; r = r._nextRemoved)
              r === this._mapHead && (this._mapHead = null),
                this._records.delete(r.key),
                (r._nextRemoved = r._next),
                (r.previousValue = r.currentValue),
                (r.currentValue = null),
                (r._prev = null),
                (r._next = null);
          }
          return (
            this._changesTail && (this._changesTail._nextChanged = null),
            this._additionsTail && (this._additionsTail._nextAdded = null),
            this.isDirty
          );
        }
        _insertBeforeOrAppend(e, n) {
          if (e) {
            const r = e._prev;
            return (
              (n._next = e),
              (n._prev = r),
              (e._prev = n),
              r && (r._next = n),
              e === this._mapHead && (this._mapHead = n),
              (this._appendAfter = e),
              e
            );
          }
          return (
            this._appendAfter
              ? ((this._appendAfter._next = n), (n._prev = this._appendAfter))
              : (this._mapHead = n),
            (this._appendAfter = n),
            null
          );
        }
        _getOrCreateRecordForKey(e, n) {
          if (this._records.has(e)) {
            const i = this._records.get(e);
            this._maybeAddToChanges(i, n);
            const s = i._prev,
              o = i._next;
            return (
              s && (s._next = o),
              o && (o._prev = s),
              (i._next = null),
              (i._prev = null),
              i
            );
          }
          const r = new Nx(e);
          return (
            this._records.set(e, r),
            (r.currentValue = n),
            this._addToAdditions(r),
            r
          );
        }
        _reset() {
          if (this.isDirty) {
            let e;
            for (
              this._previousMapHead = this._mapHead, e = this._previousMapHead;
              null !== e;
              e = e._next
            )
              e._nextPrevious = e._next;
            for (e = this._changesHead; null !== e; e = e._nextChanged)
              e.previousValue = e.currentValue;
            for (e = this._additionsHead; null != e; e = e._nextAdded)
              e.previousValue = e.currentValue;
            (this._changesHead = this._changesTail = null),
              (this._additionsHead = this._additionsTail = null),
              (this._removalsHead = null);
          }
        }
        _maybeAddToChanges(e, n) {
          Object.is(n, e.currentValue) ||
            ((e.previousValue = e.currentValue),
            (e.currentValue = n),
            this._addToChanges(e));
        }
        _addToAdditions(e) {
          null === this._additionsHead
            ? (this._additionsHead = this._additionsTail = e)
            : ((this._additionsTail._nextAdded = e), (this._additionsTail = e));
        }
        _addToChanges(e) {
          null === this._changesHead
            ? (this._changesHead = this._changesTail = e)
            : ((this._changesTail._nextChanged = e), (this._changesTail = e));
        }
        _forEach(e, n) {
          e instanceof Map
            ? e.forEach(n)
            : Object.keys(e).forEach((r) => n(e[r], r));
        }
      }
      class Nx {
        constructor(e) {
          (this.key = e),
            (this.previousValue = null),
            (this.currentValue = null),
            (this._nextPrevious = null),
            (this._next = null),
            (this._prev = null),
            (this._nextAdded = null),
            (this._nextRemoved = null),
            (this._nextChanged = null);
        }
      }
      function g_() {
        return new ob([new a_()]);
      }
      let ob = (() => {
        class t {
          constructor(n) {
            this.factories = n;
          }
          static create(n, r) {
            if (null != r) {
              const i = r.factories.slice();
              n = n.concat(i);
            }
            return new t(n);
          }
          static extend(n) {
            return {
              provide: t,
              useFactory: (r) => t.create(n, r || g_()),
              deps: [[t, new So(), new To()]],
            };
          }
          find(n) {
            const r = this.factories.find((i) => i.supports(n));
            if (null != r) return r;
            throw new G(901, "");
          }
        }
        return (t.ɵprov = oe({ token: t, providedIn: "root", factory: g_ })), t;
      })();
      function d_() {
        return new ds([new c_()]);
      }
      let ds = (() => {
        class t {
          constructor(n) {
            this.factories = n;
          }
          static create(n, r) {
            if (r) {
              const i = r.factories.slice();
              n = n.concat(i);
            }
            return new t(n);
          }
          static extend(n) {
            return {
              provide: t,
              useFactory: (r) => t.create(n, r || d_()),
              deps: [[t, new So(), new To()]],
            };
          }
          find(n) {
            const r = this.factories.find((s) => s.supports(n));
            if (r) return r;
            throw new G(901, "");
          }
        }
        return (t.ɵprov = oe({ token: t, providedIn: "root", factory: d_ })), t;
      })();
      const kx = Jm(null, "core", []);
      let Fx = (() => {
          class t {
            constructor(n) {}
          }
          return (
            (t.ɵfac = function (n) {
              return new (n || t)(ee(t_));
            }),
            (t.ɵmod = Ti({ type: t })),
            (t.ɵinj = dr({})),
            t
          );
        })(),
        bb = null;
      function ys() {
        return bb;
      }
      const zt = new Q("DocumentToken");
      let E_ = (() => {
        class t {
          constructor(n, r, i, s) {
            (this._iterableDiffers = n),
              (this._keyValueDiffers = r),
              (this._ngEl = i),
              (this._renderer = s),
              (this._iterableDiffer = null),
              (this._keyValueDiffer = null),
              (this._initialClasses = []),
              (this._rawClass = null);
          }
          set klass(n) {
            this._removeClasses(this._initialClasses),
              (this._initialClasses =
                "string" == typeof n ? n.split(/\s+/) : []),
              this._applyClasses(this._initialClasses),
              this._applyClasses(this._rawClass);
          }
          set ngClass(n) {
            this._removeClasses(this._rawClass),
              this._applyClasses(this._initialClasses),
              (this._iterableDiffer = null),
              (this._keyValueDiffer = null),
              (this._rawClass = "string" == typeof n ? n.split(/\s+/) : n),
              this._rawClass &&
                (Ji(this._rawClass)
                  ? (this._iterableDiffer = this._iterableDiffers
                      .find(this._rawClass)
                      .create())
                  : (this._keyValueDiffer = this._keyValueDiffers
                      .find(this._rawClass)
                      .create()));
          }
          ngDoCheck() {
            if (this._iterableDiffer) {
              const n = this._iterableDiffer.diff(this._rawClass);
              n && this._applyIterableChanges(n);
            } else if (this._keyValueDiffer) {
              const n = this._keyValueDiffer.diff(this._rawClass);
              n && this._applyKeyValueChanges(n);
            }
          }
          _applyKeyValueChanges(n) {
            n.forEachAddedItem((r) => this._toggleClass(r.key, r.currentValue)),
              n.forEachChangedItem((r) =>
                this._toggleClass(r.key, r.currentValue)
              ),
              n.forEachRemovedItem((r) => {
                r.previousValue && this._toggleClass(r.key, !1);
              });
          }
          _applyIterableChanges(n) {
            n.forEachAddedItem((r) => {
              if ("string" != typeof r.item)
                throw new Error(
                  `NgClass can only toggle CSS classes expressed as strings, got ${q(
                    r.item
                  )}`
                );
              this._toggleClass(r.item, !0);
            }),
              n.forEachRemovedItem((r) => this._toggleClass(r.item, !1));
          }
          _applyClasses(n) {
            n &&
              (Array.isArray(n) || n instanceof Set
                ? n.forEach((r) => this._toggleClass(r, !0))
                : Object.keys(n).forEach((r) => this._toggleClass(r, !!n[r])));
          }
          _removeClasses(n) {
            n &&
              (Array.isArray(n) || n instanceof Set
                ? n.forEach((r) => this._toggleClass(r, !1))
                : Object.keys(n).forEach((r) => this._toggleClass(r, !1)));
          }
          _toggleClass(n, r) {
            (n = n.trim()) &&
              n.split(/\s+/g).forEach((i) => {
                r
                  ? this._renderer.addClass(this._ngEl.nativeElement, i)
                  : this._renderer.removeClass(this._ngEl.nativeElement, i);
              });
          }
        }
        return (
          (t.ɵfac = function (n) {
            return new (n || t)(B(ob), B(ds), B(ei), B(om));
          }),
          (t.ɵdir = bt({
            type: t,
            selectors: [["", "ngClass", ""]],
            inputs: { klass: ["class", "klass"], ngClass: "ngClass" },
          })),
          t
        );
      })();
      class TN {
        constructor(e, n, r, i) {
          (this.$implicit = e),
            (this.ngForOf = n),
            (this.index = r),
            (this.count = i);
        }
        get first() {
          return 0 === this.index;
        }
        get last() {
          return this.index === this.count - 1;
        }
        get even() {
          return this.index % 2 == 0;
        }
        get odd() {
          return !this.even;
        }
      }
      let I_ = (() => {
        class t {
          constructor(n, r, i) {
            (this._viewContainer = n),
              (this._template = r),
              (this._differs = i),
              (this._ngForOf = null),
              (this._ngForOfDirty = !0),
              (this._differ = null);
          }
          set ngForOf(n) {
            (this._ngForOf = n), (this._ngForOfDirty = !0);
          }
          set ngForTrackBy(n) {
            this._trackByFn = n;
          }
          get ngForTrackBy() {
            return this._trackByFn;
          }
          set ngForTemplate(n) {
            n && (this._template = n);
          }
          ngDoCheck() {
            if (this._ngForOfDirty) {
              this._ngForOfDirty = !1;
              const n = this._ngForOf;
              !this._differ &&
                n &&
                (this._differ = this._differs
                  .find(n)
                  .create(this.ngForTrackBy));
            }
            if (this._differ) {
              const n = this._differ.diff(this._ngForOf);
              n && this._applyChanges(n);
            }
          }
          _applyChanges(n) {
            const r = this._viewContainer;
            n.forEachOperation((i, s, o) => {
              if (null == i.previousIndex)
                r.createEmbeddedView(
                  this._template,
                  new TN(i.item, this._ngForOf, -1, -1),
                  null === o ? void 0 : o
                );
              else if (null == o) r.remove(null === s ? void 0 : s);
              else if (null !== s) {
                const b = r.get(s);
                r.move(b, o), T_(b, i);
              }
            });
            for (let i = 0, s = r.length; i < s; i++) {
              const b = r.get(i).context;
              (b.index = i), (b.count = s), (b.ngForOf = this._ngForOf);
            }
            n.forEachIdentityChange((i) => {
              T_(r.get(i.currentIndex), i);
            });
          }
          static ngTemplateContextGuard(n, r) {
            return !0;
          }
        }
        return (
          (t.ɵfac = function (n) {
            return new (n || t)(B(Gt), B(sn), B(ob));
          }),
          (t.ɵdir = bt({
            type: t,
            selectors: [["", "ngFor", "", "ngForOf", ""]],
            inputs: {
              ngForOf: "ngForOf",
              ngForTrackBy: "ngForTrackBy",
              ngForTemplate: "ngForTemplate",
            },
          })),
          t
        );
      })();
      function T_(t, e) {
        t.context.$implicit = e.item;
      }
      let S_ = (() => {
        class t {
          constructor(n, r) {
            (this._viewContainer = n),
              (this._context = new SN()),
              (this._thenTemplateRef = null),
              (this._elseTemplateRef = null),
              (this._thenViewRef = null),
              (this._elseViewRef = null),
              (this._thenTemplateRef = r);
          }
          set ngIf(n) {
            (this._context.$implicit = this._context.ngIf = n),
              this._updateView();
          }
          set ngIfThen(n) {
            M_("ngIfThen", n),
              (this._thenTemplateRef = n),
              (this._thenViewRef = null),
              this._updateView();
          }
          set ngIfElse(n) {
            M_("ngIfElse", n),
              (this._elseTemplateRef = n),
              (this._elseViewRef = null),
              this._updateView();
          }
          _updateView() {
            this._context.$implicit
              ? this._thenViewRef ||
                (this._viewContainer.clear(),
                (this._elseViewRef = null),
                this._thenTemplateRef &&
                  (this._thenViewRef = this._viewContainer.createEmbeddedView(
                    this._thenTemplateRef,
                    this._context
                  )))
              : this._elseViewRef ||
                (this._viewContainer.clear(),
                (this._thenViewRef = null),
                this._elseTemplateRef &&
                  (this._elseViewRef = this._viewContainer.createEmbeddedView(
                    this._elseTemplateRef,
                    this._context
                  )));
          }
          static ngTemplateContextGuard(n, r) {
            return !0;
          }
        }
        return (
          (t.ɵfac = function (n) {
            return new (n || t)(B(Gt), B(sn));
          }),
          (t.ɵdir = bt({
            type: t,
            selectors: [["", "ngIf", ""]],
            inputs: {
              ngIf: "ngIf",
              ngIfThen: "ngIfThen",
              ngIfElse: "ngIfElse",
            },
          })),
          t
        );
      })();
      class SN {
        constructor() {
          (this.$implicit = null), (this.ngIf = null);
        }
      }
      function M_(t, e) {
        if (e && !e.createEmbeddedView)
          throw new Error(
            `${t} must be a TemplateRef, but received '${q(e)}'.`
          );
      }
      let x_ = (() => {
          class t {
            transform(n) {
              if (null == n) return null;
              if ("string" != typeof n)
                throw (function Mt(t, e) {
                  return new G(2100, "");
                })();
              return n.toUpperCase();
            }
          }
          return (
            (t.ɵfac = function (n) {
              return new (n || t)();
            }),
            (t.ɵpipe = We({ name: "uppercase", type: t, pure: !0 })),
            t
          );
        })(),
        XN = (() => {
          class t {}
          return (
            (t.ɵfac = function (n) {
              return new (n || t)();
            }),
            (t.ɵmod = Ti({ type: t })),
            (t.ɵinj = dr({})),
            t
          );
        })();
      class cc extends class sP extends class Bx {} {
        constructor() {
          super(...arguments), (this.supportsDOMEvents = !0);
        }
      } {
        static makeCurrent() {
          !(function Lx(t) {
            bb || (bb = t);
          })(new cc());
        }
        onAndCancel(e, n, r) {
          return (
            e.addEventListener(n, r, !1),
            () => {
              e.removeEventListener(n, r, !1);
            }
          );
        }
        dispatchEvent(e, n) {
          e.dispatchEvent(n);
        }
        remove(e) {
          e.parentNode && e.parentNode.removeChild(e);
        }
        createElement(e, n) {
          return (n = n || this.getDefaultDocument()).createElement(e);
        }
        createHtmlDocument() {
          return document.implementation.createHTMLDocument("fakeTitle");
        }
        getDefaultDocument() {
          return document;
        }
        isElementNode(e) {
          return e.nodeType === Node.ELEMENT_NODE;
        }
        isShadowRoot(e) {
          return e instanceof DocumentFragment;
        }
        getGlobalEventTarget(e, n) {
          return "window" === n
            ? window
            : "document" === n
            ? e
            : "body" === n
            ? e.body
            : null;
        }
        getBaseHref(e) {
          const n = (function oP() {
            return (
              (ps = ps || document.querySelector("base")),
              ps ? ps.getAttribute("href") : null
            );
          })();
          return null == n
            ? null
            : (function bP(t) {
                (pb = pb || document.createElement("a")),
                  pb.setAttribute("href", t);
                const e = pb.pathname;
                return "/" === e.charAt(0) ? e : `/${e}`;
              })(n);
        }
        resetBaseElement() {
          ps = null;
        }
        getUserAgent() {
          return window.navigator.userAgent;
        }
        getCookie(e) {
          return (function EN(t, e) {
            e = encodeURIComponent(e);
            for (const n of t.split(";")) {
              const r = n.indexOf("="),
                [i, s] = -1 == r ? [n, ""] : [n.slice(0, r), n.slice(r + 1)];
              if (i.trim() === e) return decodeURIComponent(s);
            }
            return null;
          })(document.cookie, e);
        }
      }
      let pb,
        ps = null;
      const k_ = new Q("TRANSITION_ID"),
        lP = [
          {
            provide: Wm,
            useFactory: function aP(t, e, n) {
              return () => {
                n.get(Vu).donePromise.then(() => {
                  const r = ys(),
                    i = e.querySelectorAll(`style[ng-transition="${t}"]`);
                  for (let s = 0; s < i.length; s++) r.remove(i[s]);
                });
              };
            },
            deps: [k_, zt, Ht],
            multi: !0,
          },
        ];
      class gc {
        static init() {
          !(function lx(t) {
            Gu = t;
          })(new gc());
        }
        addToWindow(e) {
          (Y.getAngularTestability = (r, i = !0) => {
            const s = e.findTestabilityInTree(r, i);
            if (null == s)
              throw new Error("Could not find testability for element.");
            return s;
          }),
            (Y.getAllAngularTestabilities = () => e.getAllTestabilities()),
            (Y.getAllAngularRootElements = () => e.getAllRootElements()),
            Y.frameworkStabilizers || (Y.frameworkStabilizers = []),
            Y.frameworkStabilizers.push((r) => {
              const i = Y.getAllAngularTestabilities();
              let s = i.length,
                o = !1;
              const b = function (a) {
                (o = o || a), s--, 0 == s && r(o);
              };
              i.forEach(function (a) {
                a.whenStable(b);
              });
            });
        }
        findTestabilityInTree(e, n, r) {
          if (null == n) return null;
          const i = e.getTestability(n);
          return null != i
            ? i
            : r
            ? ys().isShadowRoot(n)
              ? this.findTestabilityInTree(e, n.host, !0)
              : this.findTestabilityInTree(e, n.parentElement, !0)
            : null;
        }
      }
      let uP = (() => {
        class t {
          build() {
            return new XMLHttpRequest();
          }
        }
        return (
          (t.ɵfac = function (n) {
            return new (n || t)();
          }),
          (t.ɵprov = oe({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      const mb = new Q("EventManagerPlugins");
      let _b = (() => {
        class t {
          constructor(n, r) {
            (this._zone = r),
              (this._eventNameToPlugin = new Map()),
              n.forEach((i) => (i.manager = this)),
              (this._plugins = n.slice().reverse());
          }
          addEventListener(n, r, i) {
            return this._findPluginFor(r).addEventListener(n, r, i);
          }
          addGlobalEventListener(n, r, i) {
            return this._findPluginFor(r).addGlobalEventListener(n, r, i);
          }
          getZone() {
            return this._zone;
          }
          _findPluginFor(n) {
            const r = this._eventNameToPlugin.get(n);
            if (r) return r;
            const i = this._plugins;
            for (let s = 0; s < i.length; s++) {
              const o = i[s];
              if (o.supports(n)) return this._eventNameToPlugin.set(n, o), o;
            }
            throw new Error(`No event manager plugin found for event ${n}`);
          }
        }
        return (
          (t.ɵfac = function (n) {
            return new (n || t)(ee(mb), ee(qe));
          }),
          (t.ɵprov = oe({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      class F_ {
        constructor(e) {
          this._doc = e;
        }
        addGlobalEventListener(e, n, r) {
          const i = ys().getGlobalEventTarget(this._doc, e);
          if (!i)
            throw new Error(`Unsupported event target ${i} for event ${n}`);
          return this.addEventListener(i, n, r);
        }
      }
      let O_ = (() => {
          class t {
            constructor() {
              this._stylesSet = new Set();
            }
            addStyles(n) {
              const r = new Set();
              n.forEach((i) => {
                this._stylesSet.has(i) || (this._stylesSet.add(i), r.add(i));
              }),
                this.onStylesAdded(r);
            }
            onStylesAdded(n) {}
            getAllStyles() {
              return Array.from(this._stylesSet);
            }
          }
          return (
            (t.ɵfac = function (n) {
              return new (n || t)();
            }),
            (t.ɵprov = oe({ token: t, factory: t.ɵfac })),
            t
          );
        })(),
        ms = (() => {
          class t extends O_ {
            constructor(n) {
              super(),
                (this._doc = n),
                (this._hostNodes = new Map()),
                this._hostNodes.set(n.head, []);
            }
            _addStylesToHost(n, r, i) {
              n.forEach((s) => {
                const o = this._doc.createElement("style");
                (o.textContent = s), i.push(r.appendChild(o));
              });
            }
            addHost(n) {
              const r = [];
              this._addStylesToHost(this._stylesSet, n, r),
                this._hostNodes.set(n, r);
            }
            removeHost(n) {
              const r = this._hostNodes.get(n);
              r && r.forEach(L_), this._hostNodes.delete(n);
            }
            onStylesAdded(n) {
              this._hostNodes.forEach((r, i) => {
                this._addStylesToHost(n, i, r);
              });
            }
            ngOnDestroy() {
              this._hostNodes.forEach((n) => n.forEach(L_));
            }
          }
          return (
            (t.ɵfac = function (n) {
              return new (n || t)(ee(zt));
            }),
            (t.ɵprov = oe({ token: t, factory: t.ɵfac })),
            t
          );
        })();
      function L_(t) {
        ys().remove(t);
      }
      const dc = {
          svg: "http://www.w3.org/2000/svg",
          xhtml: "http://www.w3.org/1999/xhtml",
          xlink: "http://www.w3.org/1999/xlink",
          xml: "http://www.w3.org/XML/1998/namespace",
          xmlns: "http://www.w3.org/2000/xmlns/",
          math: "http://www.w3.org/1998/MathML/",
        },
        yc = /%COMP%/g;
      function vb(t, e, n) {
        for (let r = 0; r < e.length; r++) {
          let i = e[r];
          Array.isArray(i) ? vb(t, i, n) : ((i = i.replace(yc, t)), n.push(i));
        }
        return n;
      }
      function j_(t) {
        return (e) => {
          if ("__ngUnwrap__" === e) return t;
          !1 === t(e) && (e.preventDefault(), (e.returnValue = !1));
        };
      }
      let fc = (() => {
        class t {
          constructor(n, r, i) {
            (this.eventManager = n),
              (this.sharedStylesHost = r),
              (this.appId = i),
              (this.rendererByCompId = new Map()),
              (this.defaultRenderer = new hc(n));
          }
          createRenderer(n, r) {
            if (!n || !r) return this.defaultRenderer;
            switch (r.encapsulation) {
              case kt.Emulated: {
                let i = this.rendererByCompId.get(r.id);
                return (
                  i ||
                    ((i = new hP(
                      this.eventManager,
                      this.sharedStylesHost,
                      r,
                      this.appId
                    )),
                    this.rendererByCompId.set(r.id, i)),
                  i.applyToHost(n),
                  i
                );
              }
              case 1:
              case kt.ShadowDom:
                return new pP(this.eventManager, this.sharedStylesHost, n, r);
              default:
                if (!this.rendererByCompId.has(r.id)) {
                  const i = vb(r.id, r.styles, []);
                  this.sharedStylesHost.addStyles(i),
                    this.rendererByCompId.set(r.id, this.defaultRenderer);
                }
                return this.defaultRenderer;
            }
          }
          begin() {}
          end() {}
        }
        return (
          (t.ɵfac = function (n) {
            return new (n || t)(ee(_b), ee(ms), ee(gs));
          }),
          (t.ɵprov = oe({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      class hc {
        constructor(e) {
          (this.eventManager = e),
            (this.data = Object.create(null)),
            (this.destroyNode = null);
        }
        destroy() {}
        createElement(e, n) {
          return n
            ? document.createElementNS(dc[n] || n, e)
            : document.createElement(e);
        }
        createComment(e) {
          return document.createComment(e);
        }
        createText(e) {
          return document.createTextNode(e);
        }
        appendChild(e, n) {
          e.appendChild(n);
        }
        insertBefore(e, n, r) {
          e && e.insertBefore(n, r);
        }
        removeChild(e, n) {
          e && e.removeChild(n);
        }
        selectRootElement(e, n) {
          let r = "string" == typeof e ? document.querySelector(e) : e;
          if (!r)
            throw new Error(`The selector "${e}" did not match any elements`);
          return n || (r.textContent = ""), r;
        }
        parentNode(e) {
          return e.parentNode;
        }
        nextSibling(e) {
          return e.nextSibling;
        }
        setAttribute(e, n, r, i) {
          if (i) {
            n = i + ":" + n;
            const s = dc[i];
            s ? e.setAttributeNS(s, n, r) : e.setAttribute(n, r);
          } else e.setAttribute(n, r);
        }
        removeAttribute(e, n, r) {
          if (r) {
            const i = dc[r];
            i ? e.removeAttributeNS(i, n) : e.removeAttribute(`${r}:${n}`);
          } else e.removeAttribute(n);
        }
        addClass(e, n) {
          e.classList.add(n);
        }
        removeClass(e, n) {
          e.classList.remove(n);
        }
        setStyle(e, n, r, i) {
          i & (tt.DashCase | tt.Important)
            ? e.style.setProperty(n, r, i & tt.Important ? "important" : "")
            : (e.style[n] = r);
        }
        removeStyle(e, n, r) {
          r & tt.DashCase ? e.style.removeProperty(n) : (e.style[n] = "");
        }
        setProperty(e, n, r) {
          e[n] = r;
        }
        setValue(e, n) {
          e.nodeValue = n;
        }
        listen(e, n, r) {
          return "string" == typeof e
            ? this.eventManager.addGlobalEventListener(e, n, j_(r))
            : this.eventManager.addEventListener(e, n, j_(r));
        }
      }
      class hP extends hc {
        constructor(e, n, r, i) {
          super(e), (this.component = r);
          const s = vb(i + "-" + r.id, r.styles, []);
          n.addStyles(s),
            (this.contentAttr = (function dP(t) {
              return "_ngcontent-%COMP%".replace(yc, t);
            })(i + "-" + r.id)),
            (this.hostAttr = (function yP(t) {
              return "_nghost-%COMP%".replace(yc, t);
            })(i + "-" + r.id));
        }
        applyToHost(e) {
          super.setAttribute(e, this.hostAttr, "");
        }
        createElement(e, n) {
          const r = super.createElement(e, n);
          return super.setAttribute(r, this.contentAttr, ""), r;
        }
      }
      class pP extends hc {
        constructor(e, n, r, i) {
          super(e),
            (this.sharedStylesHost = n),
            (this.hostEl = r),
            (this.shadowRoot = r.attachShadow({ mode: "open" })),
            this.sharedStylesHost.addHost(this.shadowRoot);
          const s = vb(i.id, i.styles, []);
          for (let o = 0; o < s.length; o++) {
            const b = document.createElement("style");
            (b.textContent = s[o]), this.shadowRoot.appendChild(b);
          }
        }
        nodeOrShadowRoot(e) {
          return e === this.hostEl ? this.shadowRoot : e;
        }
        destroy() {
          this.sharedStylesHost.removeHost(this.shadowRoot);
        }
        appendChild(e, n) {
          return super.appendChild(this.nodeOrShadowRoot(e), n);
        }
        insertBefore(e, n, r) {
          return super.insertBefore(this.nodeOrShadowRoot(e), n, r);
        }
        removeChild(e, n) {
          return super.removeChild(this.nodeOrShadowRoot(e), n);
        }
        parentNode(e) {
          return this.nodeOrShadowRoot(
            super.parentNode(this.nodeOrShadowRoot(e))
          );
        }
      }
      let mP = (() => {
        class t extends F_ {
          constructor(n) {
            super(n);
          }
          supports(n) {
            return !0;
          }
          addEventListener(n, r, i) {
            return (
              n.addEventListener(r, i, !1),
              () => this.removeEventListener(n, r, i)
            );
          }
          removeEventListener(n, r, i) {
            return n.removeEventListener(r, i);
          }
        }
        return (
          (t.ɵfac = function (n) {
            return new (n || t)(ee(zt));
          }),
          (t.ɵprov = oe({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      const U_ = ["alt", "control", "meta", "shift"],
        vP = {
          "\b": "Backspace",
          "\t": "Tab",
          "\x7f": "Delete",
          "\x1b": "Escape",
          Del: "Delete",
          Esc: "Escape",
          Left: "ArrowLeft",
          Right: "ArrowRight",
          Up: "ArrowUp",
          Down: "ArrowDown",
          Menu: "ContextMenu",
          Scroll: "ScrollLock",
          Win: "OS",
        },
        $_ = {
          A: "1",
          B: "2",
          C: "3",
          D: "4",
          E: "5",
          F: "6",
          G: "7",
          H: "8",
          I: "9",
          J: "*",
          K: "+",
          M: "-",
          N: ".",
          O: "/",
          "`": "0",
          "\x90": "NumLock",
        },
        DP = {
          alt: (t) => t.altKey,
          control: (t) => t.ctrlKey,
          meta: (t) => t.metaKey,
          shift: (t) => t.shiftKey,
        };
      let wP = (() => {
        class t extends F_ {
          constructor(n) {
            super(n);
          }
          supports(n) {
            return null != t.parseEventName(n);
          }
          addEventListener(n, r, i) {
            const s = t.parseEventName(r),
              o = t.eventCallback(s.fullKey, i, this.manager.getZone());
            return this.manager
              .getZone()
              .runOutsideAngular(() => ys().onAndCancel(n, s.domEventName, o));
          }
          static parseEventName(n) {
            const r = n.toLowerCase().split("."),
              i = r.shift();
            if (0 === r.length || ("keydown" !== i && "keyup" !== i))
              return null;
            const s = t._normalizeKey(r.pop());
            let o = "";
            if (
              (U_.forEach((a) => {
                const l = r.indexOf(a);
                l > -1 && (r.splice(l, 1), (o += a + "."));
              }),
              (o += s),
              0 != r.length || 0 === s.length)
            )
              return null;
            const b = {};
            return (b.domEventName = i), (b.fullKey = o), b;
          }
          static getEventFullKey(n) {
            let r = "",
              i = (function CP(t) {
                let e = t.key;
                if (null == e) {
                  if (((e = t.keyIdentifier), null == e)) return "Unidentified";
                  e.startsWith("U+") &&
                    ((e = String.fromCharCode(parseInt(e.substring(2), 16))),
                    3 === t.location && $_.hasOwnProperty(e) && (e = $_[e]));
                }
                return vP[e] || e;
              })(n);
            return (
              (i = i.toLowerCase()),
              " " === i ? (i = "space") : "." === i && (i = "dot"),
              U_.forEach((s) => {
                s != i && DP[s](n) && (r += s + ".");
              }),
              (r += i),
              r
            );
          }
          static eventCallback(n, r, i) {
            return (s) => {
              t.getEventFullKey(s) === n && i.runGuarded(() => r(s));
            };
          }
          static _normalizeKey(n) {
            return "esc" === n ? "escape" : n;
          }
        }
        return (
          (t.ɵfac = function (n) {
            return new (n || t)(ee(zt));
          }),
          (t.ɵprov = oe({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      const SP = Jm(kx, "browser", [
          { provide: qm, useValue: "browser" },
          {
            provide: zm,
            useValue: function EP() {
              cc.makeCurrent(), gc.init();
            },
            multi: !0,
          },
          {
            provide: zt,
            useFactory: function TP() {
              return (
                (function kC(t) {
                  Oa = t;
                })(document),
                document
              );
            },
            deps: [],
          },
        ]),
        MP = [
          { provide: Jl, useValue: "root" },
          {
            provide: zi,
            useFactory: function IP() {
              return new zi();
            },
            deps: [],
          },
          { provide: mb, useClass: mP, multi: !0, deps: [zt, qe, qm] },
          { provide: mb, useClass: wP, multi: !0, deps: [zt] },
          { provide: fc, useClass: fc, deps: [_b, ms, gs] },
          { provide: sm, useExisting: fc },
          { provide: O_, useExisting: ms },
          { provide: ms, useClass: ms, deps: [zt] },
          { provide: Wu, useClass: Wu, deps: [qe] },
          { provide: _b, useClass: _b, deps: [mb, qe] },
          { provide: class iP {}, useClass: uP, deps: [] },
        ];
      let AP = (() => {
        class t {
          constructor(n) {
            if (n)
              throw new Error(
                "BrowserModule has already been loaded. If you need access to common directives such as NgIf and NgFor from a lazy loaded module, import CommonModule instead."
              );
          }
          static withServerTransition(n) {
            return {
              ngModule: t,
              providers: [
                { provide: gs, useValue: n.appId },
                { provide: k_, useExisting: gs },
                lP,
              ],
            };
          }
        }
        return (
          (t.ɵfac = function (n) {
            return new (n || t)(ee(t, 12));
          }),
          (t.ɵmod = Ti({ type: t })),
          (t.ɵinj = dr({ providers: MP, imports: [XN, Fx] })),
          t
        );
      })();
      "undefined" != typeof window && window;
      var bn = (() => {
        return (
          ((t = bn || (bn = {}))[(t.Black = 0)] = "Black"),
          (t[(t.Yellow = 1)] = "Yellow"),
          (t[(t.Green = 2)] = "Green"),
          bn
        );
        var t;
      })();
      const jP = JSON.parse(
        '[{"bybbb":"brond","bbbyg":"runic","gbbbb":"poncy","bbbbb":"courd","bybyb":"beard","ybybb":"floss","byybb":"corni","bgybb":"bingy","gbbyb":"prink","bybyy":"grate","bbygb":"bevor","bgbbb":"corny","gbbby":"pinko","bbbgg":"cerne","bbbyb":"drone","ybbyb":"rhone","ybbbg":"doric","gbyby":"stool","bbgbb":"fugly","yybyb":"abuse","bybyg":"cedar","bgbby":"pubco","bbgyb":"himbo","gybby":"prink","bgbgb":"gormy","bbbgb":"rownd","bbyyb":"doing","byyby":"trial","bbbby":"north","gbbgb":"hewer","bbbbg":"groin","bbybb":"courd","ybyyb":"flesh","gbbbg":"churn","bgygb":"ghyll","yybbb":"crags","bybgb":"anger","gbybb":"plink","bygyy":"delta","bbbgy":"mohur","gybbg":"start","bbggb":"idler","ybyby":"lusty","bybbg":"croup","ybggg":"islet","bbybg":"clung","ygbbb":"hings","gggbb":"aldol","gybbb":"cramp","byyyb":"gnarl","bbgbg":"pilot","bgbbg":"thing","gbbgy":"steed","yybbg":"acerb","bbbyy":"trite","bbgyy":"tilde","gbbyy":"minke","gbgyb":"solve","bbyyg":"exult","ybbgb":"risen","bybby":"train","ygbyb":"pause","ybbbb":"mucho","bbyby":"troll","ybbby":"durgy","gygbb":"solar","ybbyy":"troth","byyyg":"pecan","byybg":"fling","gybyb":"pharm","ygbby":"attap","gbbgg":"sweet","ygyyb":"lapse","gbyyg":"smelt","yybyy":"tease","bgbgy":"rehem","ggbyy":"saute","bygbb":"allay","ybbyg":"quich","gyybb":"child","bgyby":"natal","gyyyb":"shale","yybgb":"askew","yybby":"trash","bygyb":"relax","bgbyb":"crumb","byyyy":"plate","yyybb":"chals","yybgg":"asset","ybygb":"loser","gybyy":"grike","gyyby":"stalk","ybbgg":"unset","byygb":"alien","ygbyy":"cowps","bygyg":"eclat","ggbbg":"saint","bggbb":"rally","gbygb":"spiel","bgybg":"fault","bggby":"tally","gyyyy":"stale","gbyyb":"chemo","bbygg":"fleet","bggyb":"valve","bgggg":"valet","ggbgb":"safer","yyybg":"blast","bbyyy":"title","ggybb":"sadly","gbybg":"spilt","gbygg":"sleet","yggbb":"palsy","bgyyb":"cadge","ggbbb":"copsy","bgggb":"paler","gygbg":"splat","bbygy":"hotel","bgygy":"later","gbgbb":"silky","byggb":"alley","bbgby":"tulip","bgbyy":"bathe","bbggg":"filet","gbygy":"steel","gybyg":"sweat","gyybg":"shalt","gbyyy":"stole","ybbgy":"ester","yyyyg":"least","ygbbg":"waist","yggyb":"false","yybyg":"yeast","bybgy":"after","ygygb":"easel","ybgyb":"welsh","byygy":"alter","gbbyg":"swept","ygybb":"basil","bgyyy":"lathe","yyyyb":"leash","bgbgg":"facet","gggby":"salty","ggbby":"satyr","gbgbg":"split","gggyb":"salve","ggbyb":"sauce","bygbg":"allot","bybbbbybbb":"chair","bbbyggybbb":"rebut","gbbbbbbbbg":"sissy","bbbbbbbybb":"funny","bybybbygbb":"aking","ybybbbgbgb":"blush","byybbygbbb":"focal","bybybbygby":"evade","bgybbbbybb":"naval","gbbybbybbb":"chere","bybyybbggy":"heath","bybbbbybby":"dwarf","bbygbbybyb":"model","bgbbbbbgbb":"karma","gbbbybyyyb":"stink","bybybbygyy":"drake","bbbggbybbb":"quiet","bbbybbbbyy":"begun","bybyybbggg":"abate","bgbbbbyybb":"favor","ybbybyybby":"fresh","ybbbgbbyby":"crust","bbgbbbbbyb":"colon","yybybggbgg":"abase","bgbbbbbgbg":"parry","bybygygbyy":"react","bgbbybbybb":"batty","bbbybygbbg":"pride","bbgybgybbb":"helix","bybbbbggbb":"croak","gybbybbbbb":"staff","bgbgbbbybb":"caper","bbbgbbbbyg":"unfed","bbyybbbbbb":"clump","byybyggbyg":"trawl","bbbbybybyb":"outdo","bybybyyyby":"adobe","bybbbbgbbb":"crazy","gbbgbbbggg":"sower","bybybbgyyb":"repay","bbbbgybbgb":"digit","bybyybgggg":"crate","bbybbgbgbb":"cluck","gbbybybgby":"spike","bbbbbybbbb":"pinch","bbbbbbggbg":"bumph","bgbbbbbbbb":"gamma","bbygbbybbb":"chimp","bbbggbybyb":"unmet","bbbbbbgbbb":"boozy","bbbbybgggg":"forth","ybbbgbbgyb":"first","gybbybbbgb":"stand","bbgybbbbyb":"belly","bbbbbbybgb":"ivory","gbbybbbbbb":"seedy","bbbbgbgbyy":"print","bybybbgggb":"yearn","bybbbbgbyy":"drain","bbbybbgbbg":"campi","gbbbgbbybb":"stout","bgygbbbbbg":"panel","yybbbgggbg":"crass","byybbbybbb":"offal","bybgbgbygy":"agree","bbbybbgyby":"error","gbybbbygbb":"swirl","bybybbyyyb":"creak","bbygbgybbb":"bleed","bbybbybbbb":"flick","bbbgyygbbb":"totem","bbbgbygybb":"wooer","bbbbgbggby":"front","gbbbbbbbbb":"shrub","bbbybbbgbg":"biome","bgygbbbbyg":"lapel","bbbggbyyby":"greet","bbbgbygbyb":"goner","bbggbbbggb":"golem","bbybbbgbbb":"wooly","bbbbbbggyg":"round","bybbgbbbyb":"audit","bbybbbbbbb":"lying","bgybbybbbb":"labor","bbbbbgbbbb":"civic","bbbybbyybg":"forge","bbbbbggbyb":"corny","bbybgbygbb":"moult","ygbbbbybby":"basic","gggbbyyybb":"salad","bybyyybggg":"agate","gbbbbybbgg":"spicy","gybbbbyyby":"spray","yybybybbyy":"essay","bbbbbbybgg":"fjord","gbbybybbgb":"spend","bybybygybb":"kebab","bbybbbbybg":"guild","bybbbybbbb":"aback","bbbbybgyyb":"motor","byyybbyyby":"alone","bgbbybbbgb":"hawms","bbbgbybbbb":"pubic","bbbbybbbyy":"pithy","bbbbbbgbgy":"dowry","bbbbgybybb":"ought","bbgybybbyb":"belch","bbbbybbbyg":"biped","bbbgybbbbb":"tweed","bbbgggybbb":"comet","bgbbgybbgb":"jaunt","bybybbyybb":"enema","yybbbbbybg":"abyss","bbybbbybyb":"growl","bbbgbbgbyy":"dozen","bbbybyggbg":"erode","bbybbbgbyg":"world","bbbybbbybg":"voice","bbybbgbbbb":"clink","bybbbggbbb":"briar","bybygbybgy":"great","byybyyybgy":"altar","bbgbbbgbyg":"pulpy","bbybgbggbb":"blurt","yybbgyybbb":"coast","bbbbbybyby":"duchy","bbbbbbybyb":"gimpy","bbbbbbyyyb":"furor","bgybbgbbbg":"badly","gybbggbggg":"smart","bgbbbbbbbg":"podge","bbbybbyyyy":"heron","bybbbbbyby":"vodka","bbbgbybbyb":"finer","gbbgbbbbgg":"surer","bbbybbybby":"ferry","bbbyyyybby":"retro","bbbyybgbgg":"wrote","bbybbgybbb":"clock","gbbyybbbbg":"store","bbbybbggbg":"prove","bbbbbbbbyb":"bring","bybyggybgb":"cheat","ybbgbybygb":"usher","bbbybbbgby":"epoch","bybbyggyyb":"triad","bybybgyyyb":"break","byybbbbgby":"viral","bbbbbggbbb":"conic","ygbybbgbgg":"masse","gbbbbbggyb":"sonic","byybyybygg":"vital","bybyybggyg":"trace","ybbbbbybbb":"using","bybybbggbb":"weave","bybbbbbbbb":"champ","bgbbybbyby":"baton","bybybgygyb":"brake","bbybbybgbb":"pluck","bybybbygyb":"cezve","bybyybbygg":"acute","yybybgbbyg":"aside","bgbbyybbbb":"tapir","ybbybgbbby":"rebus","ybbbgbgbbb":"boost","ybbbybyybb":"truss","gbbybbbybb":"siege","bbbgybbbbg":"inter","bgybbgbgbb":"banal","gbybbygbbb":"slump","bybbbbgbgb":"crank","bbbbbbbbyy":"drink","bybgbgbbgb":"abbey","bgbbybbbbb":"trant","bgbbbybbyb":"panic","gbbybbygbb":"shire","bbbbgbbyyy":"point","bbbbgbyybb":"robot","bbbbbybbyb":"prick","bbbybbbbyg":"finch","bbbbbgbbyb":"crimp","bbybbbybbb":"blown","gybbbbyybb":"sugar","bbbbgbbyby":"mount","bbybbgggbg":"could","bbbbbbbgyb":"wrung","bbybgbybby":"light","ybbyygbgby":"those","ybbbgbgbyb":"fehme","gybbbbygbb":"shard","byyyggybgb":"pleat","byybgygbbb":"aloft","gbybbbygby":"skill","bbygbbybbg":"flier","byybyyybyy":"ultra","bbbbbbgbyb":"moron","bybbbbygbb":"agora","bgybbbbbbb":"larva","gybybbggbb":"shake","byybbbbbbb":"amply","bbbybgbybg":"dodge","bgbbggbybb":"tacit","bbbgybygbg":"other","bbbbyyyyyy":"thorn","bbbyyggbbg":"trove","bbyybbybbb":"elbow","bbbbbbbbbg":"vivid","gbybbyygbb":"spill","bybbggbbbb":"chant","bbbgbgbbbb":"rupee","ygbbyyybbb":"nasty","bbbbbbgggb":"mourn","bybybbyybg":"ahead","bbbybbgbgg":"brine","bbybyybgyb":"cloth","bybbbbyybg":"hoard","bbbbyygbgg":"month","bybbygbybb":"today","ybbbbbygby":"focus","bgbgyybbgb":"cater","bygbbgggbb":"allow","bbbgbgbyyb":"renew","bbbyygyyby":"their","gbybbbgbbb":"slosh","bbbybbybbg":"merge","ybbygbbbyy":"chest","bbbygbbbbb":"depot","bbbbbbbbbb":"nymph","gyybbbgbgb":"shall","gbbbgbbyby":"snout","bbbgbybgbb":"fewer","gyybbbgbyb":"shawl","bybbbbbybb":"comma","bybbbbyybb":"foray","gybybbbggb":"scare","gybbybyybb":"stair","byybbybbbb":"black","gybbbbbybb":"squad","byybbbgybb":"royal","bbbbbgbgbb":"chunk","gyyybgbgyg":"slave","gybybbggby":"shame","bbbgbbbbbb":"cheek","byyybbbyby":"ample","byybbbbyby":"flair","bbbgbygbbb":"chevy","bgbbbgygbb":"cargo","bbbybybybg":"oxide","byybgbgbgb":"plant","bbyybbygbb":"olive","bbbygybyyb":"inert","ybbygbbgby":"heist","gbbbbbyybb":"sworn","ybbyybbbgb":"zesty","bygybbggyb":"fella","gbbbybbbby":"story","bgbbbbbybg":"hairy","bgbybbbbby":"badge","ybbbgybbyb":"midst","bgbbbgbbgg":"canny","ybbyyybbbb":"fetus","bgbybyybbb":"farce","gbybbbgbgb":"slung","ybbbybbbbg":"tipsy","byyyybyyyy":"metal","bbyybybybb":"yield","bbgybbbbbb":"delve","bbbybbbbgy":"penny","gbbbbbybyb":"scour","yyybbbbgyg":"glass","bgbgbgbyyb":"gamer","gybbbyyybg":"scrap","bbbgbbgbyb":"money","bbbbbyggbb":"vouch","bybbygygyb":"tiara","bbbygybbby":"crept","bgbbbbybby":"bayou","byybyybbyg":"atoll","bgbbbbyyyb":"manor","gbbbbbybbg":"showy","yybybybbgg":"chase","bbbbybyygg":"froth","bbbyybbbgy":"depth","bbybbbybbg":"flood","bybbgbgbbb":"graft","bbbbybbggg":"girth","bbbyybbygy":"piety","bgbgbbbyby":"payer","ybbybbbgbg":"goose","byybgggbbb":"float","bbbbbbgbyy":"rowdy","bybyybbyyg":"atone","bybbbbyyyb":"apron","bgbbbgybbb":"cacao","bbbbgbbbyy":"input","byybgbgbby":"gloat","gbbyyyybbg":"smite","bybybgggby":"beady","ybbbybgybg":"rusty","bbybbbybyy":"droll","bbbbyyybgb":"pinto","bgybbbybyg":"gaily","bbbggbygby":"egret","bygbbbyggb":"lilac","gbbgbbgbgg":"sever","bbybbbbgbb":"flunk","bbbbbbybgy":"hydro","gybyybbbby":"stead","bbbyybybgy":"berth","bbbbgybbyy":"night","byybbbbbgb":"bland","bbygbbygbg":"liver","bbbybybbbg":"bijou","bgbbbybbbg":"wacky","bbybbyybbb":"flock","bybbbbybyb":"angry","bybbbbbbbg":"aphid","ybbbgbbybb":"tryst","bbbgbyggbb":"power","bbbbybgbgb":"motto","gbbbyybbby":"stomp","ybbgggbggg":"upset","bybbgbybyb":"quart","bbybbggbbb":"coyly","bbbbybgbgg":"youth","gybybbbyyy":"smear","bbbbgbbbgy":"unfit","bgbbygbbbb":"patty","byyybgyyby":"glean","bbygbbybby":"gruel","bbbyygbgbg":"twice","bybbygbgby":"twang","bbgbgbygbg":"unlit","ygbyybbyby":"waste","bbbygybbgb":"merit","bbbgbbgyyb":"woven","byybyybbgg":"octal","bbbybybbyy":"needy","bbbbbbybby":"widow","bbbgbgbbby":"ruder","bgbybbbgbb":"gauze","ybbggbgggg":"onset","bbgbbbgygg":"gully","bbbbbbybbb":"whoop","bgbbggbbgb":"taunt","yyybbgbgyg":"class","bbbyygbbbg":"theme","bbybyybyyb":"lofty","bybbygbygb":"tibia","bbbbgbbybb":"doubt","bgbgbbbgbb":"parer","bbbyybbbgg":"chute","gbbbybybyb":"stick","bbbyygggbg":"trice","bbyybbbyby":"liege","bbybbbybgb":"glory","bybbgbbbbb":"admit","ybbbbbbbbb":"brisk","gbbbbbgbbg":"soggy","gyybbybbgg":"scald","gbbbbbyyyb":"scorn","byyybbbgby":"fehme","gbbbybyybb":"sting","bbbbbbggbb":"bough","ygbbbybbby":"marsh","gbybygygby":"sloth","bgbbbbbbyg":"dandy","bbbbbbgbby":"howdy","bbbybbbyyy":"enjoy","bggbbbggbb":"valid","bbbbbygbbb":"ionic","byyybbbybg":"medal","gybybybgbb":"spade","gbbyybyyby":"stein","ybbygbbgbb":"exist","bbbbbbbygb":"furry","bbbybgbbyy":"denim","bbybgbgybb":"flout","bgbbbgbgbg":"carry","gybybbbybb":"sneak","bbygbyybbb":"libel","bggbyyggbb":"waltz","byybyybbyy":"aptly","bbbgbbbbyb":"piney","bbbygbbyyb":"inept","bbbbybybgy":"photo","bybybbyyyy":"dream","bbbbgbbygb":"vomit","bgbbbbbbgg":"fanny","bbbyybbggg":"unite","gyybbbbbyb":"snarl","bbbyygybbg":"there","gbyybbbgbb":"spell","bbgbbgbbgg":"folly","ybyybbyygb":"louse","bbgbbbgyyb":"gulch","bgybgbgggg":"vault","bbybbbgbby":"godly","bbbgybbyby":"threw","gbbbbbybgb":"shock","gbbyybybbg":"spite","gbbbbybbbb":"skimp","byybbgbbby":"claim","bgbbbbbygg":"rainy","ybbbybgbbg":"musty","bbbybbbbbg":"pique","yybbbbbgby":"quasi","yybybgbbgg":"arise","bybbbbbbgb":"aging","bbbbbbyybb":"jumbo","bybygbybyy":"avert","gbbbybbbyb":"stuck","bbbyggybby":"recut","bbgbbbgbyb":"mulch","bbbybbybyg":"genre","bbyybbbybb":"rifle","bbbbbybyyb":"incur","byybygbbgg":"total","ybbygbbbbb":"wrest","gbbbybbbbb":"study","bbygbbygyg":"lover","bbbggbyybb":"rivet","gbbybbbbby":"smoke","bbbybybbyg":"undue","bgbbbbbbyb":"pagan","gbbybbbggb":"swine","bbyybbbgby":"guile","ybbbybgbyg":"gusty","bbbybbbbby":"beech","bbbbybgbyg":"tough","bgbybgbbbb":"canoe","yybbbgbgbg":"chaos","bybbbbbbyb":"again","bbbgbybbby":"drier","bbybbybybb":"lunch","gybbybybbb":"stray","bbyyyybbyy":"lefty","bbbbbybybb":"hempy","ygbyybbbyy":"paste","bbbggyybbb":"octet","bybbbbggyb":"groan","bbbbbbbbyg":"grind","bgbybgybbb":"carve","gyybbybbyb":"slack","byybbbbbyy":"align","gbbgbyybgb":"sheen","bbbbyybbgb":"minty","gbybbbggbg":"slick","bbbybgybby":"derby","gbyyggbggg":"spelt","bbbygyybbb":"erupt","gbbybbbyyb":"singe","gybbbbbgby":"spawn","bbgbbgbbyg":"filmy","gybbybbbbg":"stack","ybbybbggbg":"chose","gbygbgybgy":"sleep","bybbbbgyby":"ardor","bbbbybybgb":"ditto","gybbybbbgg":"stank","yyybbbbyyy":"usual","bbbybgbgbg":"diode","bggbbyggbb":"valor","byyybygyby":"angle","bbbbbbbyby":"dumpy","bbbybbgggg":"prone","gbybbyyybb":"spoil","bybygbgbyy":"heart","bbbgbybbyy":"diner","yybbbbgyby":"arson","bbbbbgggbb":"couch","bbygbgybyb":"bowel","gbyybbbyyb":"smile","bgyybygbbg":"lance","bgyybbgbyg":"eagle","bbbbgbbyyb":"idiot","gbbgbbbbgy":"siren","bbybgbyybb":"built","bbbgbbbbbg":"embed","bybbbbybbg":"acrid","ybbbbbbbby":"dross","byybbbbbyb":"annul","bgbbygbbbg":"patio","bgygbbbbyb":"laden","bbbbbbbybg":"humid","bbyyyyybyg":"elite","bbbybybbby":"edify","bbbbgybbyb":"amowt","ybbggbbggg":"reset","ybbbgbbbgb":"visit","ybbbybgbyb":"gusto","ybbybybbbg":"purse","bbbbbgybyb":"crock","bbbyybgggg":"write","gbbbbbbgbg":"sunny","gbyybbbybb":"slide","gybbyybbbb":"stamp","gbybyggbbg":"still","bybbbbygyb":"acorn","ybbbbbgbgb":"pushy","bgbgyybbgy":"tamer","bgbgyybygb":"hater","bybbbggbyb":"brawn","gbbbgbbbbb":"swift","bbyybbbgbb":"exile","ybbbgbybbb":"ghost","byybbbbyyb":"lunar","ybbybybbyg":"nurse","ybbybbyybg":"house","bybbbgyybb":"borax","bbybbybyyb":"lurch","byyygbybyb":"exalt","bybbgbbggb":"about","ggbbbbbbyg":"savvy","bbbbyygbyb":"toxin","bbbbyybbyb":"tunic","bbbgbybbbg":"bicep","bygbbbbggg":"inlay","bgybbbbgbg":"lanky","ybbybybbby":"cress","bgbgyyybgb":"eater","bbyybybbbb":"elude","bbbbybbbgb":"betid","bbyybbgbbb":"boule","bbbggbgbyy":"tenet","bbbgbbbbyy":"index","bbbbbgyyyb":"croup","gybyyybbbg":"stage","bybybbgyby":"decay","gybbggbgbg":"shaft","bbbybyybbg":"ridge","bbygbbyyyb":"vowel","bbbybbbgyg":"gnome","gbbbbbbygb":"snuck","gbbbbybybg":"spiny","gyybbbbyyb":"snail","bgbbbbbybb":"rabid","ybbybybgbg":"prose","bbgbbbbbyg":"moldy","bybbygggbb":"track","bgbbbgbbbg":"caddy","bybybygyyb":"rebar","gybbbybybb":"scuba","ygbbbbbyby":"mason","bbbybbbggg":"ozone","bygbbbbggb":"molar","bgbbbybbbb":"magic","gbbbgbbbgb":"sport","bbbbybbygb":"fritz","bbbygbbbyy":"edict","bbybygybbg":"twirl","bgbgybybgb":"eaten","bgbybbybbb":"range","ybbbbbbbyb":"whisk","bbygbbygyb":"hovel","gybbbbbygb":"sigma","bbbbbbbbby":"dying","bbbyyybyby":"fetid","bgbbbgbbyg":"candy","bbbbbgybgg":"chord","ygbbbbyyby":"basin","bgbbbybgbb":"march","bbbbbgybyg":"crowd","bybbbygybb":"arbor","bgybbbbbyg":"gayly","ybbbbggbbb":"musky","gybbybbyyb":"stain","bggbbbgggg":"dally","ybyybbgggb":"bless","bybbbggybb":"bravo","gbbbybbybb":"stung","bbggbbbggg":"ruler","bgygbbbgyb":"layer","bbybbbbgbg":"fluid","bbbyyybybg":"cutie","bybybygygb":"zebra","bgbybbybby":"barge","bgbgybbbgy":"matey","bbygbgybbg":"bluer","bybgbgbbgg":"aider","gbbbbbybbb":"shook","bbygybbggg":"betel","bybybbyygb":"azure","gbbbbbgybb":"sound","bbyybbybby":"glove","bybbbggbbg":"braid","gbbybybbbb":"scope","bbybbbbbyb":"grill","bbbgbggbbb":"rover","yybbbbbyby":"assay","bbbybbgbby":"wreck","bbyygybbgg":"dwelt","gyyyygygyg":"slate","gybbbybgyb":"smack","gbgbbgygbb":"solid","bgygbbybbg":"hazel","ybbbgbbyyb":"wrist","bbgbbbbbgg":"bodhi","bbybgbgbgb":"flint","ybbybgbybg":"rouse","yybbyybyyb":"vista","bbbyyybbgy":"jetty","ybybbbgbgg":"bliss","bbbgybybbb":"often","bbbygbbbyb":"eight","bbbygbbybb":"event","ybbybbbbyg":"ensue","gbbbgbggby":"shunt","ybbgbybggb":"poser","ybbbgbggbb":"worst","gbbgbbyygb":"sweep","ybbbbybbby":"bosom","bbbybgbbyg":"dunce","gybyybybbg":"stare","bgbybbbbbb":"waive","gbbybybbby":"spoke","bygybbgggb":"delay","bbgybbgbyb":"bilge","yyybbgbgyy":"clasp","gbbybbbgbb":"seize","bbybyybygb":"hotly","bgybbbbbgb":"laugh","bybygbgbyb":"meant","ybbybbbgyg":"noose","gbbgbybbgb":"shied","byybbbbybb":"drawl","gbbbgbbyyb":"strut","bbbbgbybby":"burnt","bbybbbbbby":"idyll","gbbbybbbyy":"stork","bybbyybyby":"aunty","yybbbbggbg":"brass","bbbgybybyg":"outer","bbyyggbbyg":"elect","bybbyybybb":"quota","bgbgbbbbbb":"haven","bgybbbybbb":"cavil","gybybbbyyb":"swear","bbbbbgbgyb":"crump","bbbbbbggby":"dough","bgygbgbbbg":"gavel","bgbbbbybyb":"wagon","gggbbyybgb":"salon","bgbgbbbgyb":"harem","bbybbbbybb":"pupil","gbbbybbyby":"stony","bgbbbgbbyb":"cabin","bbbbgbggbb":"trout","bbgbbbbbyy":"polyp","bgbyybgyyy":"earth","bbybyybbbg":"until","bbybbgbbbg":"child","bybbgbbgby":"adopt","ybbbbbgbyb":"husky","gbyybbbygb":"slime","bbybgbgbgy":"glint","bybyybgyyy":"tread","gyyyyggyyy":"steal","byyybybyyg":"regal","ybbygbgbbb":"guest","bbbbbbbyyb":"murky","gybybbgggb":"share","gbbybyybbb":"spore","bbbgybybbg":"otter","bbygbbggbb":"level","gybbbybyyb":"sumac","gbybggbggg":"stilt","gbbgggbggg":"sheet","gbbbbbbbyb":"scrub","bgbbbybbyg":"fancy","gbybbbggbb":"slimy","byyybbbggg":"pearl","gbgbbgggbg":"silly","bbbbbygbyb":"porch","gybybybybb":"sepia","gybbbbbgbb":"shady","bybybgyyyg":"bread","bbbybbybyy":"reign","ybbbbbbyby":"cross","bbbbbbybyg":"brood","bbbgybbbyg":"tuber","gybybbgyyb":"shear","ybbbgbgbgb":"posit","bygbbyygbb":"villa","bybbbbbggb":"among","gbyybbggbb":"shell","bbybbbggbg":"would","byyybybyby":"algae","bgyybbgbgg":"large","yybybgbggg":"amuse","ybbybbbybg":"poise","yybbggybbb":"ascot","byyybbygby":"plane","bybbbygbyb":"urban","gbbybbbgyb":"snide","bygybggggb":"relay","byybbbybby":"viola","yybbbgggby":"crash","yybbbbbgbg":"amass","bbbbybbyyy":"third","bbbbybbyyb":"trick","bbbbybyyyb":"tutor","bbybbbbggb":"blurb","ybbbbbbybg":"disco","ggbbbbbbgg":"sassy","bybybgggbb":"beach","ggbbbbbbyb":"sauna","ygbyygbbby":"caste","gbbbbbbybb":"suing","bbbbbyybyb":"frock","bybbbbbyyg":"gonad","bbbbbbbgyy":"drunk","bbybbbbyyg":"lurid","bggybbgggg":"halve","bbyyyyybgg":"utile","gbyybbbgyb":"smell","bbbbbbgbgb":"worry","ygbbyyyybb":"tasty","yybgbggbgb":"ashen","byybbbgbbb":"modal","bgbbgybbgy":"gaunt","bybygyybyb":"enact","bybbbbygyy":"adorn","yybbgybbyb":"roast","gbbybybbbg":"speck","gbbybbbybg":"sheik","ybbbbgbbbb":"missy","bbbbgggbby":"grunt","gbbbbyyybb":"snoop","gbybbbybbg":"skulk","yybbggbbbb":"angst","bbygbbybyg":"lower","ybbygbbbyb":"crest","bybybbyygy":"adore","gybbbbbggb":"swami","bbbbyggbyg":"notch","bybybbggyy":"ready","gybbyyybbb":"strap","byyybbbgyy":"realm","gybbbbygyb":"swarm","bbbgbyybbb":"offer","gbbgbbgbgb":"seven","bbybbbbbyy":"dryly","bybbbbgbgy":"drank","bybybbggby":"heady","bybyybbygy":"theta","bbbbybybgg":"quoth","ybbbbbybby":"bonus","bbbybbbbgg":"penne","bgbbybybbb":"datum","bybbbbbygb":"piano","bbyybygbby":"lodge","byybbgggbb":"coral","bgbgbbbyyb":"ramen","yyybbbbggy":"psalm","bbbygybbbb":"overt","bgbbbbyyby":"mayor","bbbbbbybbg":"ovoid","bbyybybgby":"glide","yybybybyyg":"usage","bgbbbbbyyg":"randy","ybbbbbbbgb":"fishy","bbbgybbgbg":"ether","bbbybgggbg":"drove","gbbbgbbbby":"stint","bybygbgbgb":"begat","bgbbggbbbb":"tarot","bbbybygyby":"credo","bybybbyggb":"aware","bgbbbgybyb":"canon","gbbbgbgbbb":"shift","bbbgyybbbg":"timer","bygbbbbggy":"bylaw","gybyybbbyy":"steak","byybbybbby":"iliac","bbybgbgggb":"blunt","byyybbyybg":"penal","gybybyggbb":"shape","bbbggbgbby":"beget","bybygbyyyb":"adept","gbbbgbbgby":"stunt","bbbybbygbg":"chore","bybbgbbgbb":"afoot","byybgbgbbb":"bloat","bbgbbbgbgg":"bully","gbbgbbybgg":"sneer","bbyybbbbyy":"lunge","byybbbbbby":"avail","gbbbgbgbgb":"short","bbybgbgbbb":"flirt","bbbyygbbby":"tempo","bbbbbbybyy":"droop","ggbbbbybyg":"savoy","gbbgyggggb":"steep","gybyybbbgg":"stake","bbyybgbbbb":"dwell","bbbbybgbyb":"topic","gybbbbbgyb":"smash","byyybgbggy":"glare","gybbbbbggg":"swamp","byybbbybgb":"along","bgbgbybybb":"wager","gybbggbybg":"squat","bbbygbbbgb":"debit","bgbybbbbyb":"mange","gybyybbbyg":"skate","bbbbygbbgg":"ninth","gbbbbybybb":"spurn","bbbbbyybgb":"micro","bbygbygbby":"rebel","byyybbyggy":"learn","bgbbbbbyyb":"nadir","bgyybbgbbg":"maple","bbbyggbbgb":"remit","bbybbbgybb":"mogul","bbbyyybbby":"fetch","ygbybbgggg":"cause","bgbgbbybbb":"oaken","bygbbgbgbb":"aglow","gbybbbybbb":"shyly","bbbgybbybb":"thief","gbbyybbyby":"stern","ybbybbbyby":"poesy","bbbggbybby":"tweet","gbbybyygbb":"spire","bgbbbyybbb":"havoc","ygbbyybgby":"patsy","bbybyggbgb":"truly","bbbbybgggb":"forty","bbbyybbggy":"deity","bbyybbbbyb":"uncle","bbygbgggbb":"bevel","gbyybbbyby":"slope","bybbbbbyyb":"annoy","bbybbgbyyb":"curly","bybybbgyyy":"cedar","bbbybgybbg":"dirge","bbbybyyybg":"horde","gbbbbbbbgb":"shuck","bbbbgbgbbb":"crypt","bbbbbgbybb":"cumin","ybybbbyybg":"locus","bbbgbybyby":"wider","bbbybybbgy":"fiend","bbybbygbbb":"logic","bbyybybgbb":"elide","byyybbyyyg":"renal","bybbgbygbb":"abort","gbgbbgbggg":"sulky","bbbbyybyyb":"trunk","byyybbbyyy":"clear","gyybbybbgb":"scalp","bbbgbyyyyb":"owner","bybybbggyb":"reach","gbbgbbybgb":"speed","bybybbyyyg":"dread","ybbbgbbgbb":"burst","bybbyybyyb":"amity","gbbbgbbbgy":"snort","gbbbbbygby":"synod","bgbbgybggb":"faint","bgbbgyybgb":"haunt","bbybbbyyyb":"flour","gbbgbybygy":"shrew","ybbyygbbbb":"tense","bbybbbbyyb":"burly","gbbbybybby":"stoic","bbybyybbyb":"blitz","bbybbybbyb":"lyric","bbygybgygg":"towel","bbgybbbbyy":"below","yybbbbggby":"brash","gbbybbbbgb":"scone","yybbgybbbb":"toast","ggbbbybbyg":"saucy","bggybgggbg":"value","gbbybybgbb":"spice","bbbyybybgg":"route","gybbbbygbg":"sharp","gbybbbybby":"skull","ybbybbbbbg":"issue","bgygbybbyb":"lager","ygbbbbbbyy":"gassy","byybbbyybb":"flora","bgybybggby":"latch","yybbbbggyg":"grass","gybbbybgbb":"shack","bbyyyybbyg":"flute","bbyybbbbby":"bugle","byybbgbbbb":"chalk","yybygbgggg":"feast","bbbbbbbyyy":"ruddy","gybbbyygbb":"scarf","byyygbybgb":"bleat","byybygbygg":"tidal","ybbbyggbbg":"dusty","gggbbyybby":"sally","bbgbbbbyyb":"igloo","bbbybyybyy":"nerdy","bbygbbgbbb":"jewel","ygbbbbbgby":"pansy","gbbbbybbby":"syrup","ybbyygybbb":"terse","gybybbbgbb":"suave","bgbbgybbby":"gamut","bbbbggggbb":"grout","bbybbbybby":"oddly","bbbyygbyyg":"tithe","bbybbbbbbg":"lipid","bbbbybggyg":"torch","ybbybbbbby":"pesky","bgbgbgbybb":"gazer","bbyybbgbyb":"noble","ybbyyybyby":"ethos","bbyyybbgyy":"extol","bbbybgyyby":"decor","ybbyygbbby":"these","gbbbybgbbb":"sixth","bgybbbbgbb":"canal","gyybbbybyb":"slash","ygybbbggby":"lasso","gbbgbbbygy":"screw","gbbgbbybgy":"spree","gbbyggbgbg":"scent","byyybgbgby":"glade","gbbyggbgyg":"spent","ybbbbybbbb":"prism","gbbyybbbgg":"stoke","bbbbgbgygb":"orbit","bbybgbyyby":"guilt","ybbbbygbyb":"humus","bgyyyygybg":"table","gbbbbbbybg":"shiny","byyyybgggg":"elate","ybbybgbbyy":"resin","byyygbyygb":"cleat","bybbbyybbb":"rumba","bbybgggybb":"clout","bgbybybbbb":"dance","byybbgybbb":"cloak","gbbbgbbggb":"spurt","ybbyybbygb":"pesto","bggbbbggbg":"balmy","yyybbbygyy":"flash","bbbgbbbgyg":"unwed","bgyybbgbby":"early","bbbbbgbggb":"churn","gbbbyybbbb":"stump","yyyybggggb":"lease","gbbbbyybbb":"spoof","ggbgbggbgg":"saner","bbyybybbgb":"blend","gggbbyybbb":"salsa","byyybbbggy":"blare","bbbygbybbb":"debut","bbbgbyybby":"order","ygbyybbbby":"haste","bbbyygbbgy":"teeth","bybygbybyb":"agent","bbbgbbbyyy":"widen","gbyybybybb":"slice","bbbbgybyyy":"ingot","yyybbgygyy":"clash","bbbbybygyy":"throw","gbyyggbgyg":"slept","gybybybggb":"spare","gbbgbbgggg":"sewer","ygbybggbgg":"parse","bgbbybbbyb":"cacti","gbybbyybbb":"spool","bbbybgbyyy":"demon","bybgbggbgb":"annex","bgbbygbbgb":"patch","bybbbbbbyy":"admin","bbybgbybbb":"limit","bgbbybbgbb":"tabby","yyyybyyyyb":"aisle","ygbbbbybbg":"basis","byybbgbybb":"crawl","ybybbbyygb":"lousy","bgbgbbybyb":"cameo","bybbyyyybb":"actor","bybbbbgbbg":"fraud","gbbbbyybyb":"scoop","bybybygyyy":"debar","bgbbbgbyyb":"cairn","bbgyygbgbg":"tulle","bbybbbyybb":"ghoul","bybbgbybby":"apart","gyyybgbggg":"scale","bybbgbbybb":"abbot","ybbygggbbb":"quest","ybbbbbbybb":"crisp","bgygbybbbg":"bagel","bybbbgggbg":"broad","bgbbgybbbb":"caput","byyygbgbyy":"leant","ygbbbgbbby":"harsh","bbbbbbyyyg":"proud","bbbybbbygg":"opine","ybybbbybbg":"lupus","yybbbgbgby":"chasm","bybbbbgybb":"armor","ybbbbbybyb":"brush","byybbbbgbb":"mural","byggbgbggb":"abled","bgbbgyyybb":"habit","ybbbbbgbbb":"dusky","bbyyybggyg":"lithe","gbbybbbbyb":"sense","byyybybybg":"legal","bgybybgggg":"fatal","bybybggybb":"began","gyybbbbbgb":"small","gyybggbgyg":"slant","ybbbybygbb":"torus","bbbgbbgbbb":"covey","bgbgybbbgb":"taken","byybbbggbb":"moral","bbbgybgbbb":"token","bbbgybgbbg":"voter","bbyybbbyyb":"elfin","bbbybbbggy":"ebony","bbgybbbyby":"melon","bbbybgbyby":"decoy","byybbbgbby":"voila","byyybbgyby":"ankle","ybbbbggbgb":"mushy","bybyybyyyy":"terra","bbbybyybby":"weird","bbbgybbbby":"tried","bbbbbbggyb":"rough","bbbbgbbbby":"uncut","bgyybbggbg":"ladle","gbbbyyybbb":"strip","bybbgggbbb":"craft","ybbbbgybbb":"minus","bbbgbbbbby":"dicey","bybbygbyyg":"titan","bbybbybybg":"lucid","ygbbyyybyy":"pasta","gbbbgbybbb":"sight","bybyybygyy":"teary","bybbggybbb":"chart","gbbgbyybgg":"sheer","bbygbbgbbg":"leper","ybbgbbbggy":"nosey","ggbbbbybyb":"savor","bybbbggbgg":"brand","bbbyyybbgg":"butte","bbbyygybby":"tenor","ybbybybybg":"worse","bybbbbgbby":"drama","bbbbyybbyy":"think","bgbbybbbbg":"ratio","bybbbyyybb":"cobra","ybbgbbbggb":"bused","bybybbgggg":"heard","byygbgybgy":"angel","byyyygyyyy":"petal","bgbybbbbyy":"maybe","gbbybybggb":"spine","gbbbgbgybb":"shout","bgbggbgygg":"cadet","bgbbbyyybb":"macro","bbbyyggbby":"trend","bbbbygbbgb":"nutty","byyygygbyb":"leapt","bbbbbbbbgb":"myrrh","bbbbybbbgg":"width","bgbbbbygyb":"baron","gybbbbygby":"spark","bbgybbybyb":"belie","gbbyyybbbg":"smote","bgggbbgggg":"baler","bybybyyybb":"above","bbbbgbgbyb":"drift","bbygybgggg":"motel","bbbybbbyyg":"ounce","bbygbbggby":"revel","bggbygggbb":"talon","bbgybbbbbg":"cello","bbbybgbbby":"debug","bybybbyyby":"anode","gbbbgybybb":"scout","gybyybbbbg":"stave","bgbybbbybb":"vague","bbbbbgybbb":"chock","bbbgbbybby":"video","gbbyybbybg":"stone","bybyybbgyy":"teach","bbyygybbyg":"cleft","ybbbgbyybb":"frost","bybbbbgbyb":"prawn","ybbbgbbbyb":"twist","bybgbgybgb":"apnea","gbbbybybbb":"stiff","bbyybybbby":"ledge","bybyybbyyy":"tweak","bybbbgyybg":"board","bgbbbyybyb":"bacon","bgyybggbbg":"cable","gbybbbgbgg":"slunk","ygbbbbbbby":"raspy","bbbbbbgyyb":"forum","ybbbbgggbb":"mucus","yybbgybbby":"boast","bybbyyggbb":"wrath","gyybyggggb":"stall","bgybbbybbg":"daily","byybyggyyg":"trail","bybygbybgb":"wheat","gbbybybgyb":"snipe","gbbgbbbygb":"sinew","bbbgbbgbby":"modem","ggbbygggbb":"satin","gybbybybbg":"stark","ybbybgbbbg":"reuse","bgbbybbgbg":"taboo","bybbbbbgbg":"avoid","bbyybgbybb":"devil","ybybbbgggg":"gloss","bgbgbgbyby":"gayer","bbbggbggby":"beret","ybbybbbyyg":"noise","byyygbgbyb":"dealt","gbybbbgggb":"sling","bybbygbyby":"tonga","bbbyyybbbg":"etude","ybbybyyybg":"horse","byyybgbyby":"gleam","gggbbyybyb":"salvo","ybbbbbyyyb":"crush","bbbbgbgbgb":"fruit","ggbbbbbgyg":"sappy","bybbgygbbb":"tract","gbbbbybbbg":"spiky","bbgbyybgyb":"filth","gybbbbbgyy":"spasm","bgbbbbybbb":"mambo","bbbbgyybyb":"right","byybbgbbgb":"clank","bbbybbyygg":"borne","bbbbybbggb":"dirty","bygbbgggbg":"alloy","bgbbggbggb":"taint","bgbybbbgyb":"mauve","bgbbgyybbb":"yacht","bbbbgbgbby":"brunt","bbbbbgbyyb":"curvy","bgbgbybbbg":"cagey","ybbybgbbyg":"rinse","bbbybgbbbg":"deuce","yybbbbggyy":"grasp","yyybbbbgyy":"flask","bbbybybyyy":"endow","bbgybybbbb":"welch","ybbgbygggb":"miser","bbybbgyybg":"cloud","ybyybbgygb":"close","bybybbgybb":"pecan","bbbbgbgggb":"droit","bbyybbybgb":"clone","bggbbgggbb":"ralph","bgbgbbbbby":"payee","gbbybbyybb":"serif","bgbbbbbbby":"kayak","ybbyygbbgb":"testy","bbgbbggbgg":"fully","byybbbgbyb":"zonal","bbbbbgbygb":"curry","bybbbbgbgg":"grand","bbygbggbbb":"bezel","bbbbbyyyyb":"occur","ygybbbggbg":"nasal","bbggbybggg":"filer","yybbbbbgyy":"gnash","gbybbbgggg":"slink","bgbbbybyyb":"ranch","bbyybbybyb":"lemon","bbbgbybgyb":"newer","gbyyyggbgg":"style","bybbyybygy":"antic","ybbybbgbby":"chess","bbygbbggbg":"lever","bbybbbgbgb":"lorry","bbbbbbbgyg":"druid","bbbbybbygg":"truth","gybybybyyb":"spear","gbbbybbyyb":"stunk","bbbbybbbyb":"timid","bgbbybbygb":"batch","bgyyygggbg":"latte","bbygbbgbby":"repel","bbbgygbbbg":"meter","bgybbbbbbg":"madly","ybbbgbgybb":"roost","bbbbyyybyy":"thong","ygbbyyybby":"pasty","bbybbbbbgb":"whirl","bbbybggbbg":"drive","byyybbbgbg":"email","ybbbbggybb":"music","bbgbbgbbyb":"folio","gbbyybbbby":"setup","ybbybybyby":"verso","bgbbbbbbgb":"fauna","bbgybbybbb":"relic","bbbbbgbbgb":"chirp","byybbbbbbg":"alibi","bbgbbbbygg":"golly","byybgbgybb":"plait","bbgybbbbby":"felon","bbbbbbgggg":"gourd","bbbbybbgyy":"thrum","ybbbbbygbb":"ficus","bbbbybygyb":"turbo","bbgggbyggg":"inlet","ybgybbyggb":"pulse","ybbbbgbbby":"mossy","gybbybbybb":"staid","gbgbbgbgbg":"sully","gbbybbybyb":"snore","bbbgbgbbyb":"ripen","gbbbbbyybg":"snowy","bybbyybygb":"attic","bbbbgybyyb":"bigot","bgbyybgyyg":"haute","gbbgbbbbgb":"spied","bbbbyyyyyb":"intro","ygybbgggbg":"basal","bbbybbbyby":"gecko","bbbgbggbby":"rodeo","gybbbybggg":"scamp","gybbbyyyyb":"scram","bbgybgbbbg":"hello","bybbbbgyyb":"organ","byyybbbyyg":"feral","bbbbbyybbb":"knock","bbbbbggbby":"condo","bybbgbbbby":"adapt","bygbbybgbb":"polka","bgbbbbyyyy":"rayon","ybbbybbgbb":"torso","bbbyygbyby":"tepid","gbygbgbbgy":"sleek","ybbgbggggb":"riser","bbbbgbbbyb":"twixt","ybybbggbgb":"flush","bbbygbbbby":"eject","byybgbybbb":"adult","bbbgbgggbb":"rower","yybbyygygb":"artsy","bybbbbybbbgbyyg":"cigar","bbbbbbbybbbgbbb":"humph","bybybbygbbgybbb":"awake","gbbybbybbbbbyyg":"serve","bybybbygyyyggbg":"grade","bbbybbbbyyggbby":"bench","bbbybbbbyybgybg":"feign","bgbbbbyybbbgbgg":"major","bybyybbggybgggg":"death","bgbbbbbgbgbgggg":"marry","bgbgbbbybbbgggg":"paper","bbyybbbbbbbybbg":"whelp","bbbbbybbbbbgbyb":"mimic","bbbbbbggbgbybyb":"pound","bgbbbbbbbbbgyyb":"maxim","bbygbbybbbbbybb":"linen","bbbbbbgbbbgggbg":"booby","bbbybbgbbgbbbby":"bribe","bbyybbbbbbbgggb":"flume","bybybbyyybbgyyb":"argue","bbybbbgbbbbggyg":"loopy","bgbbybbbgbggbbb":"hatch","bbbgbybbbbybbbb":"hyper","bbbbybbbyybbyyb":"thumb","bbbbybbbygbbbby":"dutch","bbybbbbbbbybggg":"fling","bbbybbbybgbgbbg":"gouge","bbybbgbbbbgggbg":"click","bbbbbbybybgybbb":"groin","bbbgbybbbbbbbyb":"fixer","bbbbbbyyybbyyyb":"group","bbbybbyybgbgyyg":"rogue","bgbbbbbbbgbbyyb":"gaudy","bbybbgbbbbgygbb":"chill","bgbbbbyybbbgbyy":"radio","bbbybbyybgbgygg":"rouge","bbbybbybbybggbb":"perch","bbbyyyybbygggbb":"retch","bbbybbgbbgbbyby":"grime","bbbbbbybybbybbb":"rhino","bybybbggbbbggbb":"peach","bybybbygybgbybg":"craze","bbbybbgbbgbbbgy":"gripe","bybybbgggbygggb":"weary","bbbbbybbbbggbyb":"picky","bbbbbbbybbyyybg":"unify","bbbgybbbbgybygg":"tiger","bbbybbyybgbgggg":"gorge","bbbybbybbybybgg":"query","bgbbybbbbbgbyyb":"tangy","bbbbbbybybbbbyg":"proxy","bbbybbbbygbgggb":"wince","bbybbbybbbbygby":"knoll","bybbbbbbbbyggbb":"whack","bbbybbybbybggbg":"perky","ybbbgbgbybbbbyb":"moist","bbygbbybbgbgbgg":"elder","bybybbygybbbbbg":"frame","bbbbbbyyybbgbgg":"humor","bbbbbbgbybbgybg":"robin","bbbbbgbbbbgbbgg":"cynic","bybbbbggbbbggyb":"aroma","bgybbbbbbbygbbb":"caulk","byybbbbbbbybgyb":"pupal","gbybbbygbbgggbg":"swill","bbyybbybbbygyyb":"bloke","bbbybbbgbgbbgbg":"choke","bgbbybbbgbygybb":"watch","bbbybbbybgygybg":"movie","bbybbybbbbbybgb":"lynch","bbbybbybbgbbggg":"purge","bbbybbbgbygggbb":"epoxy","bbbbbbggbgbybbb":"found","gbbyybbbbggggbg":"stove","bbybbbgbbbygbgg":"lowly","bbbyyggbbggggbg":"trope","bbbybbybbgbbybg":"fibre","bbbgbygbbbbbyby":"foyer","gbbbbbyybbgygbg":"shown","ygbbyyybbbbgggg":"hasty","bbbbbbgbybbggyb":"forgo","bbbgbygbbbbyybb":"homer","bbbbybbbyggbbbb":"butch","bbbybbbbgybgbgb":"being","bbbybbbbygbggby":"hinge","byybbbbbbbgybyb":"album","yybybybbggbgggg":"phase","bbybbbybbbbggbb":"gloom","bybbgbgbbbbggbg":"trait","bbbbbbgbyyygbyb":"donor","bbbbbbybybbyyyb":"primo","byybbbbbbbgbbyb":"awful","bbbbbbbbybggggb":"brink","bgbbbbbbbgbbbyb":"gawky","bbbbybbbygbbbbb":"hutch","bbyybybybbbgggg":"field","bbybbbbgbbgggbb":"fluff","byybbybbbbbgggg":"flack","bybybbygbbgbbby":"agape","bbbybbbbyybgbby":"wench","bgbbbbbbbbbgyyy":"madam","bbbybybbbgbbbbb":"wedge","bybbbbybbbbbybg":"augur","bbbbbbgbybygyyb":"roomy","bbbbbbgbbbggbbg":"bobby","bbbybybbbgbgbbb":"midge","bbyybbybbbggbyb":"elope","bbbbbgbbbbggbby":"cinch","bbybbbbgbbyggbb":"bluff","bybbbbgbbbgggbb":"cramp","bbbybbybbgybybg":"rhyme","bbbbbbbybbbgbbg":"guppy","bbybbgbbbbggggb":"cling","bgygbbbbygggbgg":"label","bbbbbbbybbbggbg":"hunky","bybbbbbbbbbggbb":"khaki","bbbgbygbbbbbybb":"poker","gbbbbbbbbbggggb":"shrug","bybygbybgybgggg":"treat","bbybbgybbbgggbb":"clown","bbbbbbybybbybbg":"irony","bbbgbbbbbbggbgb":"chief","bbbybbgbbgbbbyy":"prize","bbbbbbbybbgggbb":"fungi","bybbbbybbbgggby":"charm","bbyybbbbbbbybbb":"leery","bbbybbbgbggbgbg":"booze","byybbbbbbbgbgyb":"alpha","bbbyygbbbgggbgg":"thyme","byyybbbybygbbyg":"alike","gbbbybbbbygygbb":"sooth","bybybbgyybggygb":"recap","ybbbbbybbbggbbb":"usurp","byyybbbgbybgbbg":"leave","bbbyygbgbggggbg":"twine","bbbbbbybybygbbb":"vigor","byyybbbybgbybgg":"equal","bbybbbybybbygby":"floor","bgbbybbbgbygbbb":"catch","bbbbbbbygbbgbgb":"quirk","bbbybbggbgbgggg":"grove","bbbbbbgbbbbgbbg":"foggy","byybbbybbbybbyy":"aloud","bbbybbyybgbyybg":"ombre","bgbgbbbybbbgbgg":"waver","bbybbbbbbbyybby":"glyph","bbbbbygbbbbgbby":"pooch","bbbbbbbbbbbybgy":"hippy","bybybbygybbbbgg":"grave","bybybbygbbybygb":"inane","bybybbygybgbbgg":"crave","bgbbbbbbbgbbgbb":"daddy","bbbbbbyybbbyyby":"opium","bbyybbbbbbbgggy":"plume","bbbbgbbybybgggg":"count","bybbbbbybbygybg":"mocha","bbbgybbbbgbbggg":"deter","bbbbbbggbgbyybb":"mound","gybybbbybbgyygb":"sedan","bbbybbbbbybybbb":"equip","bbbgggybbbggbgg":"covet","bybbbbbbybybbbg":"human","bbbgbybbbyybbgg":"udder","bgbbbbbbybbgyyy":"manga","bbggbbbggbbbggy":"melee","bbbbbybybbbbbbb":"quick","bbbgbbbbybbgygb":"given","byyybbbgbybgbbb":"leaky","ybyybbyygbggbgg":"loose","byyybbbybygbggg":"apple","bbbgbbgbybbgggg":"honey","byybbbbbyyyyyby":"final","bbbybbybbgbggbg":"eerie","bybbbbybbbbggby":"wharf","bybbbbbybbggbby":"coach","bbbybbgbbgybbyy":"price","bgbbbbbybgbgggg":"fairy","bbbbbbbbbbbybbb":"jiffy","bgbbbbbbggbgggg":"nanny","bbbybbbbygbgygb":"niece","bbbbbbgbbbbgggg":"woozy","bgbbbbbbygbgggg":"handy","bybybbygybybbbg":"grace","bybybbyyybggggb":"cream","bybbbbbbybybbyy":"ninja","bbbbbbbybyygybg":"muddy","bbyybbbbbbbybby":"reply","gybybbggbbgggbg":"shade","bbbbbbybbbbbygb":"onion","bbygbbybybbgygg":"dowel","bbbgbybbbbbbbby":"creek","bybbbbybbggbybg":"award","bbbbbbgbbybgbgg":"goody","bbbbbbybybbbbbb":"frown","bbybbbbbbbggbbb":"lymph","bbbbgybbybbybbg":"might","bgbbbbyybbbgygg":"vapor","byybyybbyyybyyb":"loath","bybbbbbbbbgggbb":"chaff","bbbgbybbbbbgbbb":"queer","bbbybbbyyyyybgb":"venom","gbbbbbgbbgggbbg":"sorry","bybbbbbbgbgbggg":"aping","bgbbbbbbybbgbyy":"mania","bybybbyybbybbby":"awoke","bbbbbybbybbyygb":"birch","bbybbybybbggbyb":"lucky","bbbgbybbbbbbbbb":"freer","ybbbbbbbbbbyyyy":"risky","bbygbbybbgbgggg":"plier","bbbbbybbbbbgggg":"winch","gybybbbggbgbggg":"snare","bbbgbybbybbgygg":"nicer","bbbgbybbbgbybgy":"pried","bbbbbgbgbbgggbb":"chump","bbyybbbbbbgybbb":"cycle","bbbbybbbgbbbgyb":"kitty","byyybbbgbybbbbg":"blaze","bbybbbgbbbbgbyg":"lobby","ybybbbgbgbbgggg":"plush","bbybbbbbbbybyby":"vigil","bbybbbbbbbybggb":"blink","bbybbgbgbbgggbb":"clung","byybbbbbbbyybgb":"qualm","bbbbbybybbbbbbg":"juicy","bbbybbybygbgyyg":"nerve","bbbbbgybybgggbg":"crook","byyybbyybyygbyy":"clean","bybbbbbbgbybggb":"china","bbbbbybbbbbyyyb":"icing","bbybbbybbbbgggg":"flown","bybbygbgbygbggb":"thank","bbbybybbbggbbby":"budge","bbbgbybbbbbbgyb":"fiber","bbbbbbgbbybgggg":"dowdy","bbygbbybbbbbbbb":"kneel","bbyybbbbbbbyybb":"quell","gbbybbybbbbbbgg":"swore","bbygbbybbgggbgg":"flyer","bbbbbbgbybbggby":"horny","bbbbbbgbbybgbyb":"doing","bybbbbyybbbyyyg":"ovary","ybbggbbgggbgggg":"beset","bbbybbbbbgbbygg":"queue","bbybbgbbbbgggbb":"cliff","bbbyyggbbgggbbg":"truce","ybbybybbbgbbggg":"verse","byybbbbbbbyybyb":"llama","bybybygyybggygb":"rehab","bgbbbybbbbggbby":"macaw","gbbbgbbybbgbggg":"spout","gbbbbbbbbbgybyb":"sushi","bybbbggbybgggbg":"brain","bbbbbbbybyygbbg":"buddy","bbbbybbbyyybyyb":"thump","gbbbbbyyybggybg":"scion","ybbbbbbbbybbggb":"kiosk","bbybbbybbgbggbg":"blond","bbbybbbbyybybgy":"ennui","bgbbybbbbbgbyby":"tatty","gbbybbybbbybbgg":"score","bbbgbgbbbbgbbgb":"river","bbbbbbbbybbggbb":"privy","ybbbbbbbbbbgggg":"frisk","bbbbbbgbbbggybb":"bongo","bbbybbbbygbygbb":"genie","bbybbbbbybbgbgb":"wryly","bybybbyybbbygby":"ocean","bbybbbybbbgggbb":"bloom","bybyybggggbgggg":"irate","bbbgbbgyybggbgg":"woken","bybybbygbbgbbbb":"amaze","bbgbbbbbggbgbbb":"jolly","bbyybbybbygggbg":"globe","bbybbgbbbbgyybb":"civil","bbbgbygbbbgbyyb":"cover","byybbygbbbbgggg":"vocal","bbgbbbbbggbgybb":"dolly","gbbybbbyybgggbg":"since","bbbgbybbbygbygg":"diver","bbbgbybbbgbbygb":"creed","bybybbyybbygbgy":"anime","byyybbbgbyygbbb":"leafy","bbbbbbbybyygbyg":"pudgy","bbbbbgybybgygbb":"choir","gbbbybbbbygggbb":"stood","bbbbybybybgggbg":"outgo","byyybbbybgbyygg":"ideal","gbbybbbybbgggbg":"sieve","bbybbyybbbbgggg":"block","bgbbbbbgbgbggbg":"hardy","ygbbbbybbybgyyb":"daisy","bbbbybbbgbbbgbb":"putty","bbbbbgbbybgggbb":"crick","bbbybbbbbybggbb":"geeky","bbbbbgggbbgggbg":"cough","bgbybbbbbbbgggg":"naive","gyybbbgbybggybg":"shoal","bbbybbbbbybbggy":"check","bbbybbgbbgbbyyy":"prime","bbbygbbbyygbggg":"evict","bbybbbbbbbyyybb":"imply","bbbybgybbyggybb":"demur","bbbybybbygyygbg":"nudge","bbbbybbbygbgybb":"pitch","bbygbbybbbybbbb":"excel","bbbbbbbybbbyybb":"unzip","bbbgbbbbybbbygb":"queen","gbbbybbbbyggggb":"storm","bgbgyybbgbbgygg":"taper","bbbgybbbbgbgggg":"enter","bbbbbbybybbgybb":"minor","bgbbybbbbbybyby":"fatty","bybybgygybgggbg":"brave","ybbbgbgbybbbybb":"hoist","bbbbbbyybbbgyyy":"buxom","bbbgbybbybbyggg":"inner","bbybbbbbbyyyygb":"dimly","bbbbgbbybybgyyg":"donut","bybybbyyybbggyb":"arena","bbbbbbybbybgyyb":"dingo","byyybbbybyggbgg":"amble","bybbbbgbbbbgybb":"friar","bbybbbbybbbgbyg":"quill","byybbbbbgbggggb":"blank","gybbbbbgbbgggbb":"shank","bbbbbbbbbbbybyb":"piggy","bybybbyyybbgggg":"freak","bbbbbybbbbbybgg":"which","byyybbbybgbgbgg":"fecal","bgbbbbbybbgggyb":"rabbi","bybbbbbggbgbggy":"agony","ybbbbbgbgbbgggg":"bushy","ybbybbbybgygbgg":"copse","gbbbbbyybbgggbg":"swoon","bbbybbbbygyyybb":"knife","bbbbbyggbbbgggg":"pouch","bbbbbgybybgggbb":"crown","bybybyyybygybyg":"abide","bgbbbbbybbggbbb":"rajah","gybbybybbbggggb":"straw","bbgbbbbbggbbyby":"dilly","bbbbbbgbbybgygg":"woody","bbbybbybbgbyybg":"where","bbbbbggbbbggbgg":"comic","bbygbbybbbgbbbb":"clued","bbbgbybbbbybbby":"creep","bybybbygybbbybg":"graze","gbbbbbbybbgybyb":"snuff","bbbbbbybybybbyb":"prong","bbbgbybbbbbgybb":"buyer","bbybbbbbbbyyyyb":"vinyl","bybybbygbybbgyg":"adage","bybyybggyggggbg":"trade","bbyybbybbbygbyb":"clove","bgbbygbbbbggbgg":"party","bbbbybgbyggggbg":"touch","bgbbbbbbbbbgybg":"mafia","bbbgbbbbbbybygb":"emcee","bybbbbgbbbbgybg":"array","gbbbybbbbygyybb":"south","bgbbbbbbbbbgbbb":"vapid","bbgybbbbbbbggbb":"jelly","byybygbbgggbbgg":"tubal","bbbgbybbbbbbgby":"cyber","bgbbybbbbbgyybb":"tardy","bbbbbbybybgbybb":"groom","bybbbbyybbbgyyb":"roach","bbbbybbbygbgbbb":"hitch","bbbbbbggbbbggyb":"young","bbbbbbybygbggbg":"frond","bbbgbybbbbggbbb":"puree","bbbybbbbygbbgbb":"venue","bbbgbybbbyggbgg":"dryer","bybbbbybbygbggb":"diary","bbbbyyybgbbbggg":"junto","bbbybbbbbgggbbg":"pixie","bybybbyybggbgbg":"amend","bbybbbbybgbgggg":"build","gbyybbggbbggggb":"shelf","bybybbgggbbgggb":"rearm","bbbbybggggbgggg":"worth","bbbgbybbybyyygg":"infer","bbbbbgbgbbgggbg":"chuck","bybbbbgbgbbgggg":"prank","bbbbybgbggbgbgg":"tooth","gybbybbbbbgygbb":"swath","bbyybbbgbbbbggg":"while","byybbbbbbbgbggg":"apply","gyybbbbbybgygby":"slang","bgbbbbbybbggbby":"radar","gbbybbybbbbbyyb":"serum","bbbgybbybyggggb":"three","gbbbbbbbbbggybb":"shirk","ybbbgbgbybbbbbb":"joist","bbbbbbbybbbgggg":"bunny","bbygbbybbbbgbbb":"wheel","bybbygbybbggbgb":"topaz","bbyybbbbbbbggbb":"fluke","ybbybbbbygyyybg":"dense","gybybybgbbgggbg":"space","gbybbygbbbgggbg":"slurp","byybbbgbbbbgbgg":"loyal","bybbbbbbbbbbyby":"pizza","bbbbbggbbbgggby":"conch","bbyybbbybbbgbgg":"bible","bbybbbbgbbbgggg":"plunk","byybbbybbbygbyg":"afoul","byyybybybygyybg":"agile","bybybbygbbyybyb":"knave","yybybgbbggggbgg":"arose","bbbbybgbybygbgb":"motif","bbybbbybybbggbg":"broil","gbbybbbbbbgybbb":"shove","bgbbbbbbbgbbbgb":"baggy","bgbbbbbbbgbbbbb":"mammy","bbbbbbbyybbgybg":"rugby","bybbbbbbbbybgbb":"quack","gybbbbbgbbgbgbg":"snaky","ybbbgbgbbbbgbgg":"joust","bybbygggbbgggbb":"tramp","byybbbbbgbbgggb":"flank","bbbbbggbbbggbbb":"comfy","bbbbbbbgybbggby":"gruff","bybyybbggybgggb":"meaty","bgbybbbbbbbgbbg":"gaffe","bgbgbbbybbygbgg":"racer","bbybbbybybbgggg":"prowl","bbbbbygbybbgyyb":"rocky","bbbybbggbgyggbg":"grope","gbbbbbbbbbgybbb":"swish","bbbgbybbybbbygy":"preen","bbyybbbbbbbyyyb":"lemur","bybbgbgbbbbgggg":"draft","bbybbbybbbbyyby":"lingo","byyybbbybyybbyy":"bleak","bbbbybbbgbbbgyy":"ditty","bbbbbbybybgbbbb":"grown","bbybbbybyygggbg":"drool","gbbbybbbyygggbg":"stock","bybbbbgbbbbggbg":"gravy","bbbgbybbbggbbgb":"breed","bbbyybbgggybggg":"quite","bybybbygbbybbbb":"chafe","bgbybgbbbbggbbg":"cache","bbybbbbbbbybgbb":"blimp","bbbybgbbyyggyyb":"deign","bybybbyybbbbgby":"cheap","bbbbbbbbygyyybg":"rigid","bbbybbbbygbbggb":"pence","gbbbgbgbbbggbbg":"shoot","bbbybbbyyyggbgg":"envoy","ybbybbbybgggbgg":"posse","bbbgbybbbbbbyyb":"brief","bbbgbybbybbbygg":"never","ybbybbbybgbgbgg":"mouse","bbbbbybybbbbybg":"mucky","bbbybbybbygybgg":"fiery","bybybbgybyygbyb":"media","gbbbbbbybbgybgb":"skunk","bbbbybbbgbgbgyb":"bitty","bbbgbybbbyybygg":"cider","byybbbgbbbbgbyy":"koala","bbbggbybbbbgbgg":"duvet","gbbybbbbbbggybb":"segue","bbbybbgbbggbybb":"creme","gbbgbbbbggggbgg":"super","bbbgbybbbbbbgbb":"ember","bbybbbgbbbbgbgg":"nobly","bbbyybbbgybyggb":"empty","ybbbbbbbbbbbygb":"gipsy","bbbybbybbybgyyb":"recur","gbbbbbybgbgbggg":"smock","bgbbbbbbbbbgbbg":"kappa","gybbbbbgbbgggbg":"shaky","bbbgbygbbbbyyyb":"hover","bgybbbbbbbyggbb":"carol","bbbyyybbbybggbb":"detox","bbygbbybbbbbgby":"plied","bybbbbybbbbbgby":"quark","bbygbbygybbgggg":"novel","bgbgbbbbbbbgbgg":"waxen","bbbybbbbbygggbb":"beefy","ybbbbbgbybgggbg":"hussy","bbybgbyybbbgggg":"quilt","bbbbbbybbbbbybb":"bingo","ybbbbbbbbbbbyyb":"wispy","bbbbbbgbybbgygy":"honor","bgbbbbbbbgbbybb":"bawdy","bgbbbbbybbggbgy":"radii","bbbbbbybbbbggby":"phony","gbyybbbgbbgbggg":"swell","bbbybbgbggbgggg":"urine","bbbgbybbbbyybbb":"upper","bbbbgybbybbbbyg":"wight","bbbbbybbybbgggg":"brick","bbbyyyybbyggggb":"retry","bbgbbbbbggbgbyb":"holly","byyybbbybgbgygg":"decal","bybbbbbybybgybg":"dogma","bbbgbygbbbbbyyb":"mover","bbbgbybbbygbbgg":"defer","gbbgbbbbgggbbgg":"sober","bbbbybybybgbgbb":"optic","bbbgbybbbbbbbyy":"crier","bbbbbbbbbbygbbb":"vying","bybbbbbyygbgygg":"nomad","bbbbbbybbbbyyby":"hippo","gybbbbygbbggggb":"shark","ybbybbbybgbybgg":"obese","bgbbybbbbbgbygb":"tawny","byyybbbybgbgggg":"pedal","bbygbbybbybgggg":"cruel","gbybbbgbbbggbgg":"slush","gbbgbbgbgbggbgg":"semen","bbbbbbbbbyyyyyb":"windy","gbbybbbbgbgbggg":"shone","byyybbbgbybbybg":"whale","bbbgbbbbybbbygy":"hymen","bbbybbbbbgbbbgg":"fugue","bbbbbgbgybggggb":"crumb","gbbbbbbybbgybgg":"swung","bbbgbybbbgbbbgb":"freed","bybybbyygbgbbgg":"afire","gbbbgbgbgbggbgg":"shirt","byybbbbbbybbggy":"plaid","bbbbbbbybygggbg":"dummy","bbbbbbybybbbybb":"broom","bbybbbbbbgyybbg":"blind","bbbybbbbyybybby":"enemy","bbbbyybbybgbyyb":"tying","bbbybygbbgbgggg":"bride","bbbbbbgbbbygbbg":"hobby","yybygbggggbgggg":"beast","bbbbbbybbybyygb":"idiom","bbbgybbbygyybgg":"utter","byybbbbybbbygby":"alarm","yybybybbggbbggg":"erase","bbyybbbbbybbyyy":"elegy","gbbbbybybbgggby":"spunk","bbbgbybbbbgbbyb":"piper","gyybbybbgbggggb":"scaly","gbybbbybbbgbbgb":"scold","bbbyybbbgybgbgy":"hefty","bbbbbgbbbbgybby":"chick","gbbbybbbbygygbg":"sooty","bbbbbbbbbbyybby":"whiny","bybybbygbbyybbb":"quake","bbbbgbbyyybgggg":"joint","bbbybygbbgggbgg":"prude","bybybbggbbbgggb":"heavy","bbbybbbbbgbbbbg":"femme","bgbybbbbybggbbg":"maize","gbbbbbybbggbgbg":"smoky","bbbbbbbbbbbbbby":"whiff","bbbgbgbbbbgbggb":"riper","bybbbbbybbggbbg":"cocoa","gbbbbbbbbbggbyb":"shush","gbbbbbbbbbgbybb":"smirk","bbbbbbybybybbbb":"wrong","ybbbbbbbbybbygb":"noisy","byyygbybybybyyg":"alert","bbyybbybbbyybyy":"whole","bbbbbybybbgbbbb":"hunch","bbygbbybbbbbyby":"pixel","bygbbbbggbbgggg":"polar","gbbbbbybbbgbgbb":"sword","bgbbbbybybbgyyy":"mango","bbbbbbbybbygbbg":"puffy","bbgbbgbbgggbggg":"filly","bbgbbbbbgggbbby":"billy","bybyybbgggbbggg":"ovate","bgbbgybggbbgggg":"paint","bbygbbybbgbyygg":"liner","bbbbbgyyybgyyyb":"curio","bybbbbbybybygby":"audio","gybybbbgbbgbgbg":"snake","bgyybbgbbgbgbgg":"fable","bgygbbbbbgbgygg":"navel","bbbybybbbyyybbg":"weedy","bbbbbbbbbbbyggb":"wimpy","bbbbybbbyybyyyb":"thick","bgbbybbbbbyyybb":"warty","bgbbbybbybbgggg":"manic","gbbbbbbbbbgbbyg":"squib","gbbbbyyybbgyggy":"spoon","bbbybbggbggggbg":"probe","bbbybbgbbggbbgb":"crepe","bybbbbbbybbbgby":"knack","bbbybbyybggggbg":"force","bbybbybbbbbygyb":"icily","bbbbbbyyybbgggg":"juror","bbybbbybbgbgggg":"blood","bybybyyybygygyg":"abode","bbbbyybbgbbyygg":"unity","bbbbgbbyybybbgg":"pivot","bbbbybyyybgbbgy":"troop","bbbbbbgbybgggbb":"morph","bgbbybbbybbggyb":"tacky","bbbybbbbyygggbg":"begin","bbbbbbbybbggbbg":"fuzzy","bgbgyybbgbbgggg":"water","bbybbbbybbygbby":"lumpy","bybybbyybbbbgyg":"omega","bgbbbyybbbygbyy":"macho","gbbbbbbbbbgbbbb":"skiff","bbbybbybbgbgggg":"verge","bbbbybgbygygbbg":"botch","gyybbbbyybgyggy":"slain","bbbbbgbybbggbgb":"cubic","ygbybbgbggbgbgg":"raise","bybbbbgbbbyggbb":"wrack","bbbybybbbgbybby":"guide","ybbbgbgbybgbbbb":"foist","bbbgbybbyyybygg":"under","bbbybbybbgbgybg":"revue","bgbbbbbgbgyggbg":"harpy","bbbgbgbbbbgbbgy":"refer","bbygbbybybbyggy":"olden","bbyybbbbbbggbbb":"clerk","bbbyyybybybyygb":"ethic","bbgbbbbbggbbbyy":"hilly","bbbybygbbgbgbgg":"crude","bbygbbybygyybgg":"older","byybbbbbyyygybg":"plain","gbbybyybbbggbgy":"sperm","bbbybbybyyggbbg":"rerun","bbbbbbggbggybbb":"bound","bbbygbbbgbbgygg":"befit","bybbbbgbyygggbg":"drawn","gbbyybybbggbggg":"suite","bbbbybbbyybyygg":"itchy","ybbybbbbbybyybb":"guess","bybbbbbybbbyyby":"axiom","bybbbbybbgyyybg":"chard","ybbybybbbgbgggg":"curse","gbbbbbbybbgbggg":"swing","ygbyybbbbybgggg":"taste","bbbbbbyybbbgggg":"gumbo","bbbgbybbybbgggg":"miner","bybybbygybgbbbg":"crane","ybbbbbbbbybbygy":"bossy","bgbgbbbyybygygb":"maker","bbbbbbbbbygyybb":"dizzy","bbbbybbbgbbbyyb":"fifty","bybbgbbbbbybbyg":"giant","gbybbbybbbgbbgg":"surly","bbbybbgbggbgbgg":"prune","gbbbbbybybgggbb":"scoff","bbbbbbbbbbgybbb":"ninny","bbbgbybbbbybbyb":"viper","bbbybbbybgggbbg":"vogue","bbbbbbybbbybybb":"owing","bbbyyyybbybyggb":"entry","bbbybybbbgbybbb":"chide","bbbybbbbyybgyby":"neigh","bbbbbbbbbbybybb":"minim","bbbgbbbbygbgbgg":"kneed","bybbbbgybbggbgy":"arrow","bbbyygggbggggbg":"tribe","yybybybbgggbggg":"cease","bgbgbybybbbgggg":"eager","bbbbybbgggbgggg":"birth","bybbbbgbbbbggbb":"graph","bbbgbyybbygbggg":"odder","byybbgbbbbgbgyg":"clack","bbgbbbbbybggggb":"color","bbbybbbbbybgbbg":"weigh","bybbbbybbbybyyg":"vicar","ybbybybbbybgggg":"dress","bbbbybbbygbgbby":"ditch","ybbbbbbbbbbbbgb":"gypsy","bgbbybbbbbgbybb":"taffy","byyybbbgbygbbgg":"flame","gbbbbyybbbgyggb":"swoop","byybbbybbbyybyy":"aloof","bbbybbggbgbggbg":"broke","gbbbybgbbbggggb":"sixty","bbbbbbgbyyygygg":"wordy","bbgybbbbybgygbb":"bulge","byybbgbbbbgbgyb":"clamp","bbbbbbbybbgggbg":"funky","bybbbbbybbbgbgy":"foamy","bbbbybgbybggbgg":"toxic","bbybbbbgbbbggbb":"plumb","bbbbbbbbbygyyyy":"dingy","bbybbbbbyyggbgb":"drill","bbbgbbbbbbybbgb":"bicep","bbybbbbbybbgggg":"krill","bybybbyybbbygbg":"hyena","gbbbbbbbybggggb":"scrum","bbbybbbgggbbggg":"phone","bbbbgbyybbygbbg":"court","bgygbbbbbgbgbgg":"camel","bbbbbbybybbbbyb":"proof","bbbbybgbgbbgbgb":"pouty","bbbbybygyyggggb":"throb","byyyybyyyybgggg":"fetal","gbbbbybbbbgbyby":"sprig","bbbbbbgbbybgbyg":"dodgy","bgbgbbbgbbbgggg":"rarer","bbbybbbbygbggbb":"binge","yybbbbbybggbbgg":"amiss","gybbbbyybbgbbgg":"sonar","bbbgybgbbgbgygg":"tower","gbybbygbbbggbbg":"sloop","bbygbbybbbbbbby":"expel","gybbggbgbggbgbg":"scant","yybbbbbgbybbggb":"awash","gybbbybgbbgbggg":"snack","gbybbbybbbgbbyb":"scowl","byybbbbybygyggy":"frail","bbybbbybbbyyybb":"limbo","bbbybbbbyggbggb":"fence","bbbbbbybybbybyb":"prior","bbyygybbggbbggg":"knelt","byyybbbgbygbbbg":"flake","bbbybbgbbggbyby":"crime","bbbybbbbbgbybgg":"imbue","bbbbbbbbbbyybyb":"pinky","bbbbgybbybbbbbg":"fight","bbbbybgbgbbgbgy":"booty","byybbbbbbbybyyb":"plaza","bybbgbgbbbgggbg":"grant","bbbybybbbyyyybb":"medic","byybbbbybbbgggg":"brawl","bbbbybgbybggbbb":"toddy","bbbgbbgbybbgygb":"coven","bbbbybyyybggbgg":"tumor","bbbgybbbyggybgg":"truer","gybyybbbbyggggb":"steam","byybbbbbbygbyyg":"axial","bbbybbbbygbgyyy":"niche","byyybbbgbybgbyb":"mealy","bbbybbbbbgbybyg":"juice","bbgbbbbbyybygyb":"nylon","bbbybbybbybgggg":"merry","byybbbbbbybbggg":"flail","bgybbbbbbbygbby":"papal","bbbgbyggbbbgggg":"cower","bbbygybbbyyggbg":"erect","bbbyybgbggbgbgg":"brute","bbyybbbbbybbgyy":"leggy","bybbbyybbbyyyyg":"umbra","gybbbyygbbggggb":"scary","ybbbbbbbbybgggg":"gross","bybbbbbbybgbyyg":"avian","bbbbyygbybggbgy":"tonic","bgbbbbbgbbyggbg":"parka","gbbbbbbybbgbgyb":"sniff","bbybbbbbbgggbgg":"livid","bbbbybbyybggbbb":"trump","bbbbbbbbbyyyyby":"giddy","bbbyybbbggbbygg":"quote","byybbbbbgbbgggg":"gland","bbbbbbyyybbgygg":"rumor","bybybbyygbybbgy":"opera","bbbbybbbygbybbb":"thigh","byyybbbggybgggg":"flare","bbbyybbgggbbggg":"white","bbgbbbgbygbggbg":"bulky","bybbbbybbbgbyyy":"circa","bgbbbbbbbggbgbb":"paddy","bbbbbbybbbbbbgb":"inbox","bybbbbgbybbggbg":"grain","bbbygybbbbbbggg":"exert","gbbybbybbbbbbyg":"surge","bbgybbbbybggggb":"belle","bbbybbbygggbggg":"ovine","bbbybyybbybgbyy":"reedy","bybybbggbbbgggg":"heave","ybbbgbbybbggbgg":"trust","bbygbbybbbbbbyb":"lumen","gbbbbyybbbggggb":"spook","bybgbgbbgggbbgg":"amber","bgbbgybbbbggbbg":"carat","bbbgbygbbbgbybb":"corer","gbybbbgbbbggbbb":"slyly","bybbbbbbbbbbybb":"affix","gbbgbyybgbggggb":"sheep","bbbbbbbbbbyybbb":"kinky","bbybbbbgbbggggb":"flung","bbbgbybbbgbybgb":"fried","bbbbbbbbybbggby":"grimy","gybyybbbbggggbg":"state","bbgbbbbbyggbgbg":"milky","ybbbbbbbbybbyyb":"bison","ggbbbbbbygggbbg":"sandy","bbybbbbbybgyygb":"girly","gybbbbbgbbgygbb":"swash","bbbybbbybgbgbyg":"coupe","bybbbyyybbbyyyy":"abhor","ybbybbbbbgbybbg":"geese","bgybbybbbbyggbb":"cabal","bbyybbbbbbyybbb":"leech","bbbyygbbgyggbgg":"tenth","byybbbbybybyggy":"grail","ybbybbbbbgyybyg":"guise","bgbbybbbbgbgybg":"tango","bbbbbbbbbyyyybb":"biddy","gbbbybybbbgygbb":"smith","bybybbygyygggbg":"drape","bbbbybbbggbgbgg":"fifth","gybbbbbgbygggby":"spank","byyybgbgbygggbg":"glaze","bbbbybbyybggbgg":"truck","ybbbbbybbbyyybb":"virus","bbbgybbbbbgbygb":"tepee","bbbyyyybbybgggg":"metro","bgbbbbybybbgbyy":"banjo","bybbbbbyybgybgb":"axion","bybbbbbbybbbggg":"chain","bbbgbbgbbbbgbgg":"gooey","bbbbbybybbbbbyb":"pubic","bgbgbbbybbbgbgy":"raven","byyybbbybyybyyy":"plead","byybbbbbbbybbyg":"flaky","bbbbbybybbybybb":"munch","bbgbbbgbggbgggg":"dully","bbbybbbbgybybgb":"eking","bbbbyybbyyggggb":"thing","bbbbbbbygbbgggg":"hurry","bbbygbbbbbbybbg":"theft","gbbbbbyybbgbggg":"shorn","bbbbbbbbbbbgyyb":"pygmy","bbbbbbbbybbgggg":"wring","gbbybbybbbbgbgg":"shore","bgbbbbbbbbbgggg":"mamma","ybbybbbgbgbgggg":"moose","bbbbbbybyygggbb":"drown","bybybbgybbbgbgg":"vegan","bbbbbbyybbbybby":"union","bybybbygbbybyby":"image","bgbbbgbbbgggbbg":"cabby","bybygyybybgbggg":"exact","bbbgbbgbbybgygb":"dopey","bbbgbybbbgbyygb":"cried","bbbybbbbbgbybbg":"chime","bgbybbbgbbgggbg":"gauge","bbbbybgyybbgggg":"rotor","bbbybbybbgbbgbg":"curve","bbbbbybybbybbbb":"bunch","byybbbbbyygyyby":"anvil","gybbbbbgbygygbb":"soapy","bbbbybyyggbgggg":"broth","gbbybbbbgbggbgg":"scene","bbbbbbybbbybgbb":"known","bgbbbbbbbbygygg":"magma","bybbbbbyybyybyb":"woman","bbbbbybybbybbyb":"punch","bbbbbbgbbybggyg":"downy","bybybbyybgbbggg":"knead","bgbbbbbybbggbgg":"rapid","byybbgbbgbggggb":"clang","bbbbbbgbbbbggbg":"goofy","gbbbybbbbbgggbb":"stuff","bbygbgybbbggggb":"bleep","bbbgbgbbbygbggg":"rider","bybybbgybbbggyb":"mecca","yybbbbbgbyggggb":"quash","bgbbbbbbbgybbbb":"happy","bbyybbbbybbybgy":"newly","ybbbbbgbbbbggbg":"fussy","bybbbbbbbbbbgbb":"guava","bgbbybbbbbyyyby":"ratty","bbbybybbbgbbbby":"fudge","bbbybbybbyggybb":"femur","bbbyybybggygbgg":"forte","bbbybbbbggbbbgg":"whine","bbbyyybbgybgggg":"petty","bbyybbbbbbygbbb":"fleck","gybbybbbbbgggbb":"stash","bbbybgybbyggybg":"decry","ybbgbygggbbgggg":"wiser","bybbyybybyygggb":"junta","ybbbbbbbbybyyyb":"visor","bgbbgybbgbbgggg":"daunt","gbbgbbybgygbggg":"scree","bbygbbybbbbbyyy":"impel","bybbgbbbbbgbbgg":"await","ybbybbggbgbgggg":"whose","gbbbyybbbygggbg":"stoop","gybybybybbgyyby":"speak","bgbbbbbbygbggbg":"mangy","bbbybbbbgybybgy":"eying","bbbybbggggbgggg":"crone","bbbybbbbygbbggy":"hence","bbbyygbbbyggbbb":"teddy","bbbbbbgbbbbgbbb":"going","byyybbbgbybgybb":"leach","bbbbybgbggbgggg":"mouth","bbbbbbggbgbybby":"hound","byybygbbggggbgg":"tonal","bbyybbbybbyybyy":"peril","byyybbbgbybbbgg":"blame","bbbbbbbybgbybgg":"undid","gbbybbbggbgbggg":"shine","bybbbbybbgybybg":"guard","gbbgyggggbggggb":"steer","byybbbgbbbygbyy":"loamy","bgybbbbgbgyggbg":"manly","bybyybyyyyyybgg":"extra","bbgbbbbbggbbbby":"willy","gbbbgbbbgbgbbgg":"skirt","bgbbybbbbbybybb":"faith","bgbbybbbgbygbyb":"match","bybybbggbbbggbg":"peace","bgbbybbbybggbgb":"catty","bbybbbgbbbbgbyb":"login","bbbgbggbbbggbgg":"roger","byybbbbybybyyyy":"rival","bbbyyybybgbyggg":"untie","bbbyggbbgbggbgg":"refit","bybbyyyybbgbyyy":"aorta","bbbybybbbgbbyby":"judge","byybbbbgbbbgggg":"rural","bbygbbybbgbgbggbgbgg":"ulcer","bgbbbbbgbgbggggbgggg":"harry","bbbybbbbygbgggbbgggg":"mince","bbbbbbbybbbgbbgygbbg":"buggy","bbbbbbbybbbgbbgbgbbg":"mummy","bgbgbbbybbbgbggbgbgg":"baker","bbbybbbgbgbbgbgbbggg":"evoke","byyybbbgbybbbbgbggbg":"place","bbbbbbybybygbbbbgggg":"rigor","bbbbbbgbbbbgbbgbgbbg":"poppy","bbbybbybbgbggbgbggbg":"verve","byyybbbybygbbyggggbg":"alive","bbbgbygbbbbbybbbgggg":"joker","bybybbygybbbbbgbggbg":"grape","bbbgbbbbybbgygbbgygg":"vixen","bgbbbbyybbbgbggbgbgg":"razor","bbbybbybbybybggbbggg":"every","bgbbbbbybgbggggbgggg":"dairy","bbbgbybbbbbbbybyybgy":"grief","byybbygbbbbggggbgggg":"local","bbbbbybbbbbggggbgggg":"finch","bbbbbbbybbbgbbgbgggg":"puppy","bbbgbygbbbbbybbbgbgg":"boxer","bbbgbybbbbbbbybbgbgg":"giver","bbbybbybbybggbgbgggg":"jerky","bbyybybybbbggggbgggg":"wield","bbybbgbbbbgygbbggggb":"chili","bbbbybbbgbbbgybbgggg":"witty","bbbbbbgbbybgbggbgggg":"moody","byybbbbbgbbgggbbgggg":"plank","bbybbgbbbbgggbbgggbb":"climb","bbbbbbbbybggggbggggb":"briny","bbbgbybbbbbbbbygyggb":"cheer","bbbgbybbybbbygybgggg":"green","bbbbbbybybbbbbbbggbb":"brook","bgbbbbbbbgbbbbbbgbbg":"jazzy","bbbbybgbggbgbggbgggg":"booth","bbbyygggbggggbggggbg":"tripe","bbbgbybbbbbbbbbgbygg":"fever","bgbgbbbybbbgbggggbgg":"wafer","bbybbbbbybbggggbgggg":"frill","bybybbyyybbggggbgggg":"wreak","bbbgbbgyybggbggggbgg":"women","bbbgbybbbbggbbbggggb":"purer","bbybbbbgbbbggbbggggb":"plump","bbbybbybbybggggbgggg":"berry","gbbgbbbbgggbbgggbbgg":"skier","bbbbbbbybbbgbbgbgbgg":"jumpy","bbbgbybbbgbbbgbbgggg":"greed","bbygbbybbbbbybbggbgg":"liken","bbbbbbggbgbybbbbgggg":"wound","bbbbbbbbbbbybbbbgybg":"fizzy","bgbgyybbgbbgyggggbgg":"taker","bybbbbgbgbbggggbgggg":"frank","byybbbbbbybbgggbbggg":"quail","ygbyybbbbybggggbgggg":"baste","bbbybybbbgbbbbbbgggg":"hedge","bbbgbbgbybbggggbgggg":"boney","byyybbbgbybbbbggggbg":"blade","bbbbgybbybbbbbgbgggg":"tight","bbbbybbgggbggggbgggg":"mirth","bbbgbyggbbbggggbgggg":"mower","bybybgygybgggbggggbg":"brace","bbbybbggbgbggbgbggbg":"froze","bbbbbgybybgggbbgggby":"crony","bybbbbgbbbgggbbgggbb":"crack","bbbbybbbygbgbbbbgggg":"witch","bbbgbybbbgbybgbbgggg":"dried","bbbbbbbybbbgbbgggbbg":"gummy","bbbbbbybybbbbbbbgggg":"brown","ybbybybbbybggggbgggg":"press","bbybbgbgbbgggbbgggbb":"clump","bbbybbbbbgggbbgggbbg":"piece","bgbbgybbgbbggggbgggg":"vaunt","bbbybbybbybggbgbggbg":"mercy","gybybbggbbgggbggggbg":"shave"}]'
      );
      class UP extends Ci {
        constructor(e) {
          super(), (this._value = e);
        }
        get value() {
          return this.getValue();
        }
        _subscribe(e) {
          const n = super._subscribe(e);
          return !n.closed && e.next(this._value), n;
        }
        getValue() {
          const { hasError: e, thrownError: n, _value: r } = this;
          if (e) throw n;
          return this._throwIfClosed(), r;
        }
        next(e) {
          super.next((this._value = e));
        }
      }
      function z_(t, e, n, r, i, s, o) {
        try {
          var b = t[s](o),
            a = b.value;
        } catch (l) {
          return void n(l);
        }
        b.done ? e(a) : Promise.resolve(a).then(r, i);
      }
      function At(t) {
        return function () {
          var e = this,
            n = arguments;
          return new Promise(function (r, i) {
            var s = t.apply(e, n);
            function o(a) {
              z_(s, r, i, o, b, "next", a);
            }
            function b(a) {
              z_(s, r, i, o, b, "throw", a);
            }
            o(void 0);
          });
        };
      }
      const v = function (t, e) {
          if (!t) throw ii(e);
        },
        ii = function (t) {
          return new Error(
            "Firebase Database (${JSCORE_VERSION}) INTERNAL ASSERT FAILED: " + t
          );
        },
        q_ = function (t) {
          const e = [];
          let n = 0;
          for (let r = 0; r < t.length; r++) {
            let i = t.charCodeAt(r);
            i < 128
              ? (e[n++] = i)
              : i < 2048
              ? ((e[n++] = (i >> 6) | 192), (e[n++] = (63 & i) | 128))
              : 55296 == (64512 & i) &&
                r + 1 < t.length &&
                56320 == (64512 & t.charCodeAt(r + 1))
              ? ((i = 65536 + ((1023 & i) << 10) + (1023 & t.charCodeAt(++r))),
                (e[n++] = (i >> 18) | 240),
                (e[n++] = ((i >> 12) & 63) | 128),
                (e[n++] = ((i >> 6) & 63) | 128),
                (e[n++] = (63 & i) | 128))
              : ((e[n++] = (i >> 12) | 224),
                (e[n++] = ((i >> 6) & 63) | 128),
                (e[n++] = (63 & i) | 128));
          }
          return e;
        },
        _c = {
          byteToCharMap_: null,
          charToByteMap_: null,
          byteToCharMapWebSafe_: null,
          charToByteMapWebSafe_: null,
          ENCODED_VALS_BASE:
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
          get ENCODED_VALS() {
            return this.ENCODED_VALS_BASE + "+/=";
          },
          get ENCODED_VALS_WEBSAFE() {
            return this.ENCODED_VALS_BASE + "-_.";
          },
          HAS_NATIVE_SUPPORT: "function" == typeof atob,
          encodeByteArray(t, e) {
            if (!Array.isArray(t))
              throw Error("encodeByteArray takes an array as a parameter");
            this.init_();
            const n = e ? this.byteToCharMapWebSafe_ : this.byteToCharMap_,
              r = [];
            for (let i = 0; i < t.length; i += 3) {
              const s = t[i],
                o = i + 1 < t.length,
                b = o ? t[i + 1] : 0,
                a = i + 2 < t.length,
                l = a ? t[i + 2] : 0;
              let g = ((15 & b) << 2) | (l >> 6),
                d = 63 & l;
              a || ((d = 64), o || (g = 64)),
                r.push(n[s >> 2], n[((3 & s) << 4) | (b >> 4)], n[g], n[d]);
            }
            return r.join("");
          },
          encodeString(t, e) {
            return this.HAS_NATIVE_SUPPORT && !e
              ? btoa(t)
              : this.encodeByteArray(q_(t), e);
          },
          decodeString(t, e) {
            return this.HAS_NATIVE_SUPPORT && !e
              ? atob(t)
              : (function (t) {
                  const e = [];
                  let n = 0,
                    r = 0;
                  for (; n < t.length; ) {
                    const i = t[n++];
                    if (i < 128) e[r++] = String.fromCharCode(i);
                    else if (i > 191 && i < 224) {
                      const s = t[n++];
                      e[r++] = String.fromCharCode(((31 & i) << 6) | (63 & s));
                    } else if (i > 239 && i < 365) {
                      const a =
                        (((7 & i) << 18) |
                          ((63 & t[n++]) << 12) |
                          ((63 & t[n++]) << 6) |
                          (63 & t[n++])) -
                        65536;
                      (e[r++] = String.fromCharCode(55296 + (a >> 10))),
                        (e[r++] = String.fromCharCode(56320 + (1023 & a)));
                    } else {
                      const s = t[n++],
                        o = t[n++];
                      e[r++] = String.fromCharCode(
                        ((15 & i) << 12) | ((63 & s) << 6) | (63 & o)
                      );
                    }
                  }
                  return e.join("");
                })(this.decodeStringToByteArray(t, e));
          },
          decodeStringToByteArray(t, e) {
            this.init_();
            const n = e ? this.charToByteMapWebSafe_ : this.charToByteMap_,
              r = [];
            for (let i = 0; i < t.length; ) {
              const s = n[t.charAt(i++)],
                b = i < t.length ? n[t.charAt(i)] : 0;
              ++i;
              const l = i < t.length ? n[t.charAt(i)] : 64;
              ++i;
              const c = i < t.length ? n[t.charAt(i)] : 64;
              if ((++i, null == s || null == b || null == l || null == c))
                throw new WP();
              r.push((s << 2) | (b >> 4)),
                64 !== l &&
                  (r.push(((b << 4) & 240) | (l >> 2)),
                  64 !== c && r.push(((l << 6) & 192) | c));
            }
            return r;
          },
          init_() {
            if (!this.byteToCharMap_) {
              (this.byteToCharMap_ = {}),
                (this.charToByteMap_ = {}),
                (this.byteToCharMapWebSafe_ = {}),
                (this.charToByteMapWebSafe_ = {});
              for (let t = 0; t < this.ENCODED_VALS.length; t++)
                (this.byteToCharMap_[t] = this.ENCODED_VALS.charAt(t)),
                  (this.charToByteMap_[this.byteToCharMap_[t]] = t),
                  (this.byteToCharMapWebSafe_[t] =
                    this.ENCODED_VALS_WEBSAFE.charAt(t)),
                  (this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]] =
                    t),
                  t >= this.ENCODED_VALS_BASE.length &&
                    ((this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)] =
                      t),
                    (this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)] =
                      t));
            }
          },
        };
      class WP extends Error {
        constructor() {
          super(...arguments), (this.name = "DecodeBase64StringError");
        }
      }
      const Q_ = function (t) {
          const e = q_(t);
          return _c.encodeByteArray(e, !0);
        },
        Db = function (t) {
          return Q_(t).replace(/\./g, "");
        },
        vc = function (t) {
          try {
            return _c.decodeString(t, !0);
          } catch (e) {
            console.error("base64Decode failed: ", e);
          }
          return null;
        };
      function GP(t) {
        return Y_(void 0, t);
      }
      function Y_(t, e) {
        if (!(e instanceof Object)) return e;
        switch (e.constructor) {
          case Date:
            return new Date(e.getTime());
          case Object:
            void 0 === t && (t = {});
            break;
          case Array:
            t = [];
            break;
          default:
            return e;
        }
        for (const n in e)
          !e.hasOwnProperty(n) || !zP(n) || (t[n] = Y_(t[n], e[n]));
        return t;
      }
      function zP(t) {
        return "__proto__" !== t;
      }
      const wb = () => {
          try {
            return (
              (function qP() {
                if ("undefined" != typeof self) return self;
                if ("undefined" != typeof window) return window;
                if ("undefined" != typeof global) return global;
                throw new Error("Unable to locate global object.");
              })().__FIREBASE_DEFAULTS__ ||
              (() => {
                if ("undefined" == typeof process || void 0 === process.env)
                  return;
                const t = process.env.__FIREBASE_DEFAULTS__;
                return t ? JSON.parse(t) : void 0;
              })() ||
              (() => {
                if ("undefined" == typeof document) return;
                let t;
                try {
                  t = document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/);
                } catch (n) {
                  return;
                }
                const e = t && vc(t[1]);
                return e && JSON.parse(e);
              })()
            );
          } catch (t) {
            return void console.info(
              `Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`
            );
          }
        },
        K_ = () => {
          var t;
          return null === (t = wb()) || void 0 === t ? void 0 : t.config;
        };
      class _s {
        constructor() {
          (this.reject = () => {}),
            (this.resolve = () => {}),
            (this.promise = new Promise((e, n) => {
              (this.resolve = e), (this.reject = n);
            }));
        }
        wrapCallback(e) {
          return (n, r) => {
            n ? this.reject(n) : this.resolve(r),
              "function" == typeof e &&
                (this.promise.catch(() => {}), 1 === e.length ? e(n) : e(n, r));
          };
        }
      }
      function Z_() {
        return (
          "undefined" != typeof window &&
          !!(window.cordova || window.phonegap || window.PhoneGap) &&
          /ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(
            (function Cb() {
              return "undefined" != typeof navigator &&
                "string" == typeof navigator.userAgent
                ? navigator.userAgent
                : "";
            })()
          )
        );
      }
      class vs extends Error {
        constructor(e, n, r) {
          super(n),
            (this.code = e),
            (this.customData = r),
            (this.name = "FirebaseError"),
            Object.setPrototypeOf(this, vs.prototype),
            Error.captureStackTrace &&
              Error.captureStackTrace(this, J_.prototype.create);
        }
      }
      class J_ {
        constructor(e, n, r) {
          (this.service = e), (this.serviceName = n), (this.errors = r);
        }
        create(e, ...n) {
          const r = n[0] || {},
            i = `${this.service}/${e}`,
            s = this.errors[e],
            o = s
              ? (function sR(t, e) {
                  return t.replace(oR, (n, r) => {
                    const i = e[r];
                    return null != i ? String(i) : `<${r}?>`;
                  });
                })(s, r)
              : "Error";
          return new vs(i, `${this.serviceName}: ${o} (${i}).`, r);
        }
      }
      const oR = /\{\$([^}]+)}/g;
      function Ds(t) {
        return JSON.parse(t);
      }
      function Ie(t) {
        return JSON.stringify(t);
      }
      const Eb = function (t) {
        let e = {},
          n = {},
          r = {},
          i = "";
        try {
          const s = t.split(".");
          (e = Ds(vc(s[0]) || "")),
            (n = Ds(vc(s[1]) || "")),
            (i = s[2]),
            (r = n.d || {}),
            delete n.d;
        } catch (s) {}
        return { header: e, claims: n, data: r, signature: i };
      };
      function ln(t, e) {
        return Object.prototype.hasOwnProperty.call(t, e);
      }
      function si(t, e) {
        if (Object.prototype.hasOwnProperty.call(t, e)) return t[e];
      }
      function X_(t) {
        for (const e in t)
          if (Object.prototype.hasOwnProperty.call(t, e)) return !1;
        return !0;
      }
      function Ib(t, e, n) {
        const r = {};
        for (const i in t)
          Object.prototype.hasOwnProperty.call(t, i) &&
            (r[i] = e.call(n, t[i], i, t));
        return r;
      }
      function Dc(t, e) {
        if (t === e) return !0;
        const n = Object.keys(t),
          r = Object.keys(e);
        for (const i of n) {
          if (!r.includes(i)) return !1;
          const s = t[i],
            o = e[i];
          if (ev(s) && ev(o)) {
            if (!Dc(s, o)) return !1;
          } else if (s !== o) return !1;
        }
        for (const i of r) if (!n.includes(i)) return !1;
        return !0;
      }
      function ev(t) {
        return null !== t && "object" == typeof t;
      }
      class uR {
        constructor() {
          (this.chain_ = []),
            (this.buf_ = []),
            (this.W_ = []),
            (this.pad_ = []),
            (this.inbuf_ = 0),
            (this.total_ = 0),
            (this.blockSize = 64),
            (this.pad_[0] = 128);
          for (let e = 1; e < this.blockSize; ++e) this.pad_[e] = 0;
          this.reset();
        }
        reset() {
          (this.chain_[0] = 1732584193),
            (this.chain_[1] = 4023233417),
            (this.chain_[2] = 2562383102),
            (this.chain_[3] = 271733878),
            (this.chain_[4] = 3285377520),
            (this.inbuf_ = 0),
            (this.total_ = 0);
        }
        compress_(e, n) {
          n || (n = 0);
          const r = this.W_;
          if ("string" == typeof e)
            for (let c = 0; c < 16; c++)
              (r[c] =
                (e.charCodeAt(n) << 24) |
                (e.charCodeAt(n + 1) << 16) |
                (e.charCodeAt(n + 2) << 8) |
                e.charCodeAt(n + 3)),
                (n += 4);
          else
            for (let c = 0; c < 16; c++)
              (r[c] =
                (e[n] << 24) | (e[n + 1] << 16) | (e[n + 2] << 8) | e[n + 3]),
                (n += 4);
          for (let c = 16; c < 80; c++) {
            const g = r[c - 3] ^ r[c - 8] ^ r[c - 14] ^ r[c - 16];
            r[c] = 4294967295 & ((g << 1) | (g >>> 31));
          }
          let l,
            u,
            i = this.chain_[0],
            s = this.chain_[1],
            o = this.chain_[2],
            b = this.chain_[3],
            a = this.chain_[4];
          for (let c = 0; c < 80; c++) {
            c < 40
              ? c < 20
                ? ((l = b ^ (s & (o ^ b))), (u = 1518500249))
                : ((l = s ^ o ^ b), (u = 1859775393))
              : c < 60
              ? ((l = (s & o) | (b & (s | o))), (u = 2400959708))
              : ((l = s ^ o ^ b), (u = 3395469782));
            const g = (((i << 5) | (i >>> 27)) + l + a + u + r[c]) & 4294967295;
            (a = b),
              (b = o),
              (o = 4294967295 & ((s << 30) | (s >>> 2))),
              (s = i),
              (i = g);
          }
          (this.chain_[0] = (this.chain_[0] + i) & 4294967295),
            (this.chain_[1] = (this.chain_[1] + s) & 4294967295),
            (this.chain_[2] = (this.chain_[2] + o) & 4294967295),
            (this.chain_[3] = (this.chain_[3] + b) & 4294967295),
            (this.chain_[4] = (this.chain_[4] + a) & 4294967295);
        }
        update(e, n) {
          if (null == e) return;
          void 0 === n && (n = e.length);
          const r = n - this.blockSize;
          let i = 0;
          const s = this.buf_;
          let o = this.inbuf_;
          for (; i < n; ) {
            if (0 === o)
              for (; i <= r; ) this.compress_(e, i), (i += this.blockSize);
            if ("string" == typeof e) {
              for (; i < n; )
                if (
                  ((s[o] = e.charCodeAt(i)), ++o, ++i, o === this.blockSize)
                ) {
                  this.compress_(s), (o = 0);
                  break;
                }
            } else
              for (; i < n; )
                if (((s[o] = e[i]), ++o, ++i, o === this.blockSize)) {
                  this.compress_(s), (o = 0);
                  break;
                }
          }
          (this.inbuf_ = o), (this.total_ += n);
        }
        digest() {
          const e = [];
          let n = 8 * this.total_;
          this.update(
            this.pad_,
            this.inbuf_ < 56
              ? 56 - this.inbuf_
              : this.blockSize - (this.inbuf_ - 56)
          );
          for (let i = this.blockSize - 1; i >= 56; i--)
            (this.buf_[i] = 255 & n), (n /= 256);
          this.compress_(this.buf_);
          let r = 0;
          for (let i = 0; i < 5; i++)
            for (let s = 24; s >= 0; s -= 8)
              (e[r] = (this.chain_[i] >> s) & 255), ++r;
          return e;
        }
      }
      function oi(t, e) {
        return `${t} failed: ${e} argument `;
      }
      const Tb = function (t) {
        let e = 0;
        for (let n = 0; n < t.length; n++) {
          const r = t.charCodeAt(n);
          r < 128
            ? e++
            : r < 2048
            ? (e += 2)
            : r >= 55296 && r <= 56319
            ? ((e += 4), n++)
            : (e += 3);
        }
        return e;
      };
      function ws(t) {
        return t && t._delegate ? t._delegate : t;
      }
      class Cs {
        constructor(e, n, r) {
          (this.name = e),
            (this.instanceFactory = n),
            (this.type = r),
            (this.multipleInstances = !1),
            (this.serviceProps = {}),
            (this.instantiationMode = "LAZY"),
            (this.onInstanceCreated = null);
        }
        setInstantiationMode(e) {
          return (this.instantiationMode = e), this;
        }
        setMultipleInstances(e) {
          return (this.multipleInstances = e), this;
        }
        setServiceProps(e) {
          return (this.serviceProps = e), this;
        }
        setInstanceCreatedCallback(e) {
          return (this.onInstanceCreated = e), this;
        }
      }
      const Jn = "[DEFAULT]";
      class _R {
        constructor(e, n) {
          (this.name = e),
            (this.container = n),
            (this.component = null),
            (this.instances = new Map()),
            (this.instancesDeferred = new Map()),
            (this.instancesOptions = new Map()),
            (this.onInitCallbacks = new Map());
        }
        get(e) {
          const n = this.normalizeInstanceIdentifier(e);
          if (!this.instancesDeferred.has(n)) {
            const r = new _s();
            if (
              (this.instancesDeferred.set(n, r),
              this.isInitialized(n) || this.shouldAutoInitialize())
            )
              try {
                const i = this.getOrInitializeService({
                  instanceIdentifier: n,
                });
                i && r.resolve(i);
              } catch (i) {}
          }
          return this.instancesDeferred.get(n).promise;
        }
        getImmediate(e) {
          var n;
          const r = this.normalizeInstanceIdentifier(
              null == e ? void 0 : e.identifier
            ),
            i =
              null !== (n = null == e ? void 0 : e.optional) &&
              void 0 !== n &&
              n;
          if (!this.isInitialized(r) && !this.shouldAutoInitialize()) {
            if (i) return null;
            throw Error(`Service ${this.name} is not available`);
          }
          try {
            return this.getOrInitializeService({ instanceIdentifier: r });
          } catch (s) {
            if (i) return null;
            throw s;
          }
        }
        getComponent() {
          return this.component;
        }
        setComponent(e) {
          if (e.name !== this.name)
            throw Error(
              `Mismatching Component ${e.name} for Provider ${this.name}.`
            );
          if (this.component)
            throw Error(`Component for ${this.name} has already been provided`);
          if (((this.component = e), this.shouldAutoInitialize())) {
            if (
              (function DR(t) {
                return "EAGER" === t.instantiationMode;
              })(e)
            )
              try {
                this.getOrInitializeService({ instanceIdentifier: Jn });
              } catch (n) {}
            for (const [n, r] of this.instancesDeferred.entries()) {
              const i = this.normalizeInstanceIdentifier(n);
              try {
                const s = this.getOrInitializeService({
                  instanceIdentifier: i,
                });
                r.resolve(s);
              } catch (s) {}
            }
          }
        }
        clearInstance(e = Jn) {
          this.instancesDeferred.delete(e),
            this.instancesOptions.delete(e),
            this.instances.delete(e);
        }
        delete() {
          var e = this;
          return At(function* () {
            const n = Array.from(e.instances.values());
            yield Promise.all([
              ...n
                .filter((r) => "INTERNAL" in r)
                .map((r) => r.INTERNAL.delete()),
              ...n.filter((r) => "_delete" in r).map((r) => r._delete()),
            ]);
          })();
        }
        isComponentSet() {
          return null != this.component;
        }
        isInitialized(e = Jn) {
          return this.instances.has(e);
        }
        getOptions(e = Jn) {
          return this.instancesOptions.get(e) || {};
        }
        initialize(e = {}) {
          const { options: n = {} } = e,
            r = this.normalizeInstanceIdentifier(e.instanceIdentifier);
          if (this.isInitialized(r))
            throw Error(`${this.name}(${r}) has already been initialized`);
          if (!this.isComponentSet())
            throw Error(`Component ${this.name} has not been registered yet`);
          const i = this.getOrInitializeService({
            instanceIdentifier: r,
            options: n,
          });
          for (const [s, o] of this.instancesDeferred.entries())
            r === this.normalizeInstanceIdentifier(s) && o.resolve(i);
          return i;
        }
        onInit(e, n) {
          var r;
          const i = this.normalizeInstanceIdentifier(n),
            s =
              null !== (r = this.onInitCallbacks.get(i)) && void 0 !== r
                ? r
                : new Set();
          s.add(e), this.onInitCallbacks.set(i, s);
          const o = this.instances.get(i);
          return (
            o && e(o, i),
            () => {
              s.delete(e);
            }
          );
        }
        invokeOnInitCallbacks(e, n) {
          const r = this.onInitCallbacks.get(n);
          if (r)
            for (const i of r)
              try {
                i(e, n);
              } catch (s) {}
        }
        getOrInitializeService({ instanceIdentifier: e, options: n = {} }) {
          let r = this.instances.get(e);
          if (
            !r &&
            this.component &&
            ((r = this.component.instanceFactory(this.container, {
              instanceIdentifier: ((t = e), t === Jn ? void 0 : t),
              options: n,
            })),
            this.instances.set(e, r),
            this.instancesOptions.set(e, n),
            this.invokeOnInitCallbacks(r, e),
            this.component.onInstanceCreated)
          )
            try {
              this.component.onInstanceCreated(this.container, e, r);
            } catch (i) {}
          var t;
          return r || null;
        }
        normalizeInstanceIdentifier(e = Jn) {
          return this.component
            ? this.component.multipleInstances
              ? e
              : Jn
            : e;
        }
        shouldAutoInitialize() {
          return (
            !!this.component && "EXPLICIT" !== this.component.instantiationMode
          );
        }
      }
      class wR {
        constructor(e) {
          (this.name = e), (this.providers = new Map());
        }
        addComponent(e) {
          const n = this.getProvider(e.name);
          if (n.isComponentSet())
            throw new Error(
              `Component ${e.name} has already been registered with ${this.name}`
            );
          n.setComponent(e);
        }
        addOrOverwriteComponent(e) {
          this.getProvider(e.name).isComponentSet() &&
            this.providers.delete(e.name),
            this.addComponent(e);
        }
        getProvider(e) {
          if (this.providers.has(e)) return this.providers.get(e);
          const n = new _R(e, this);
          return this.providers.set(e, n), n;
        }
        getProviders() {
          return Array.from(this.providers.values());
        }
      }
      const Cc = [];
      var K = (() => {
        return (
          ((t = K || (K = {}))[(t.DEBUG = 0)] = "DEBUG"),
          (t[(t.VERBOSE = 1)] = "VERBOSE"),
          (t[(t.INFO = 2)] = "INFO"),
          (t[(t.WARN = 3)] = "WARN"),
          (t[(t.ERROR = 4)] = "ERROR"),
          (t[(t.SILENT = 5)] = "SILENT"),
          K
        );
        var t;
      })();
      const tv = {
          debug: K.DEBUG,
          verbose: K.VERBOSE,
          info: K.INFO,
          warn: K.WARN,
          error: K.ERROR,
          silent: K.SILENT,
        },
        CR = K.INFO,
        ER = {
          [K.DEBUG]: "log",
          [K.VERBOSE]: "log",
          [K.INFO]: "info",
          [K.WARN]: "warn",
          [K.ERROR]: "error",
        },
        IR = (t, e, ...n) => {
          if (e < t.logLevel) return;
          const r = new Date().toISOString(),
            i = ER[e];
          if (!i)
            throw new Error(
              `Attempted to log a message with an invalid logType (value: ${e})`
            );
          console[i](`[${r}]  ${t.name}:`, ...n);
        };
      class nv {
        constructor(e) {
          (this.name = e),
            (this._logLevel = CR),
            (this._logHandler = IR),
            (this._userLogHandler = null),
            Cc.push(this);
        }
        get logLevel() {
          return this._logLevel;
        }
        set logLevel(e) {
          if (!(e in K))
            throw new TypeError(
              `Invalid value "${e}" assigned to \`logLevel\``
            );
          this._logLevel = e;
        }
        setLogLevel(e) {
          this._logLevel = "string" == typeof e ? tv[e] : e;
        }
        get logHandler() {
          return this._logHandler;
        }
        set logHandler(e) {
          if ("function" != typeof e)
            throw new TypeError(
              "Value assigned to `logHandler` must be a function"
            );
          this._logHandler = e;
        }
        get userLogHandler() {
          return this._userLogHandler;
        }
        set userLogHandler(e) {
          this._userLogHandler = e;
        }
        debug(...e) {
          this._userLogHandler && this._userLogHandler(this, K.DEBUG, ...e),
            this._logHandler(this, K.DEBUG, ...e);
        }
        log(...e) {
          this._userLogHandler && this._userLogHandler(this, K.VERBOSE, ...e),
            this._logHandler(this, K.VERBOSE, ...e);
        }
        info(...e) {
          this._userLogHandler && this._userLogHandler(this, K.INFO, ...e),
            this._logHandler(this, K.INFO, ...e);
        }
        warn(...e) {
          this._userLogHandler && this._userLogHandler(this, K.WARN, ...e),
            this._logHandler(this, K.WARN, ...e);
        }
        error(...e) {
          this._userLogHandler && this._userLogHandler(this, K.ERROR, ...e),
            this._logHandler(this, K.ERROR, ...e);
        }
      }
      let rv, iv;
      const sv = new WeakMap(),
        Ec = new WeakMap(),
        ov = new WeakMap(),
        Ic = new WeakMap(),
        Tc = new WeakMap();
      let Sc = {
        get(t, e, n) {
          if (t instanceof IDBTransaction) {
            if ("done" === e) return Ec.get(t);
            if ("objectStoreNames" === e)
              return t.objectStoreNames || ov.get(t);
            if ("store" === e)
              return n.objectStoreNames[1]
                ? void 0
                : n.objectStore(n.objectStoreNames[0]);
          }
          return Mn(t[e]);
        },
        set: (t, e, n) => ((t[e] = n), !0),
        has: (t, e) =>
          (t instanceof IDBTransaction && ("done" === e || "store" === e)) ||
          e in t,
      };
      function RR(t) {
        return "function" == typeof t
          ? (function PR(t) {
              return t !== IDBDatabase.prototype.transaction ||
                "objectStoreNames" in IDBTransaction.prototype
                ? (function MR() {
                    return (
                      iv ||
                      (iv = [
                        IDBCursor.prototype.advance,
                        IDBCursor.prototype.continue,
                        IDBCursor.prototype.continuePrimaryKey,
                      ])
                    );
                  })().includes(t)
                  ? function (...e) {
                      return t.apply(Mc(this), e), Mn(sv.get(this));
                    }
                  : function (...e) {
                      return Mn(t.apply(Mc(this), e));
                    }
                : function (e, ...n) {
                    const r = t.call(Mc(this), e, ...n);
                    return ov.set(r, e.sort ? e.sort() : [e]), Mn(r);
                  };
            })(t)
          : (t instanceof IDBTransaction &&
              (function xR(t) {
                if (Ec.has(t)) return;
                const e = new Promise((n, r) => {
                  const i = () => {
                      t.removeEventListener("complete", s),
                        t.removeEventListener("error", o),
                        t.removeEventListener("abort", o);
                    },
                    s = () => {
                      n(), i();
                    },
                    o = () => {
                      r(
                        t.error || new DOMException("AbortError", "AbortError")
                      ),
                        i();
                    };
                  t.addEventListener("complete", s),
                    t.addEventListener("error", o),
                    t.addEventListener("abort", o);
                });
                Ec.set(t, e);
              })(t),
            ((t, e) => e.some((n) => t instanceof n))(
              t,
              (function SR() {
                return (
                  rv ||
                  (rv = [
                    IDBDatabase,
                    IDBObjectStore,
                    IDBIndex,
                    IDBCursor,
                    IDBTransaction,
                  ])
                );
              })()
            )
              ? new Proxy(t, Sc)
              : t);
      }
      function Mn(t) {
        if (t instanceof IDBRequest)
          return (function AR(t) {
            const e = new Promise((n, r) => {
              const i = () => {
                  t.removeEventListener("success", s),
                    t.removeEventListener("error", o);
                },
                s = () => {
                  n(Mn(t.result)), i();
                },
                o = () => {
                  r(t.error), i();
                };
              t.addEventListener("success", s), t.addEventListener("error", o);
            });
            return (
              e
                .then((n) => {
                  n instanceof IDBCursor && sv.set(n, t);
                })
                .catch(() => {}),
              Tc.set(e, t),
              e
            );
          })(t);
        if (Ic.has(t)) return Ic.get(t);
        const e = RR(t);
        return e !== t && (Ic.set(t, e), Tc.set(e, t)), e;
      }
      const Mc = (t) => Tc.get(t),
        FR = ["get", "getKey", "getAll", "getAllKeys", "count"],
        OR = ["put", "add", "delete", "clear"],
        Ac = new Map();
      function bv(t, e) {
        if (!(t instanceof IDBDatabase) || e in t || "string" != typeof e)
          return;
        if (Ac.get(e)) return Ac.get(e);
        const n = e.replace(/FromIndex$/, ""),
          r = e !== n,
          i = OR.includes(n);
        if (
          !(n in (r ? IDBIndex : IDBObjectStore).prototype) ||
          (!i && !FR.includes(n))
        )
          return;
        const s = (function () {
          var o = At(function* (b, ...a) {
            const l = this.transaction(b, i ? "readwrite" : "readonly");
            let u = l.store;
            return (
              r && (u = u.index(a.shift())),
              (yield Promise.all([u[n](...a), i && l.done]))[0]
            );
          });
          return function (a) {
            return o.apply(this, arguments);
          };
        })();
        return Ac.set(e, s), s;
      }
      !(function NR(t) {
        Sc = t(Sc);
      })((t) =>
        pw(hw({}, t), {
          get: (e, n, r) => bv(e, n) || t.get(e, n, r),
          has: (e, n) => !!bv(e, n) || t.has(e, n),
        })
      );
      class LR {
        constructor(e) {
          this.container = e;
        }
        getPlatformInfoString() {
          return this.container
            .getProviders()
            .map((n) => {
              if (
                (function BR(t) {
                  const e = t.getComponent();
                  return "VERSION" === (null == e ? void 0 : e.type);
                })(n)
              ) {
                const r = n.getImmediate();
                return `${r.library}/${r.version}`;
              }
              return null;
            })
            .filter((n) => n)
            .join(" ");
        }
      }
      const xc = "@firebase/app",
        Xn = new nv("@firebase/app"),
        Sb = "[DEFAULT]",
        uk = {
          [xc]: "fire-core",
          "@firebase/app-compat": "fire-core-compat",
          "@firebase/analytics": "fire-analytics",
          "@firebase/analytics-compat": "fire-analytics-compat",
          "@firebase/app-check": "fire-app-check",
          "@firebase/app-check-compat": "fire-app-check-compat",
          "@firebase/auth": "fire-auth",
          "@firebase/auth-compat": "fire-auth-compat",
          "@firebase/database": "fire-rtdb",
          "@firebase/database-compat": "fire-rtdb-compat",
          "@firebase/functions": "fire-fn",
          "@firebase/functions-compat": "fire-fn-compat",
          "@firebase/installations": "fire-iid",
          "@firebase/installations-compat": "fire-iid-compat",
          "@firebase/messaging": "fire-fcm",
          "@firebase/messaging-compat": "fire-fcm-compat",
          "@firebase/performance": "fire-perf",
          "@firebase/performance-compat": "fire-perf-compat",
          "@firebase/remote-config": "fire-rc",
          "@firebase/remote-config-compat": "fire-rc-compat",
          "@firebase/storage": "fire-gcs",
          "@firebase/storage-compat": "fire-gcs-compat",
          "@firebase/firestore": "fire-fst",
          "@firebase/firestore-compat": "fire-fst-compat",
          "fire-js": "fire-js",
          firebase: "fire-js-all",
        },
        er = new Map(),
        Mb = new Map();
      function ck(t, e) {
        try {
          t.container.addComponent(e);
        } catch (n) {
          Xn.debug(
            `Component ${e.name} failed to register with FirebaseApp ${t.name}`,
            n
          );
        }
      }
      function Ab(t) {
        const e = t.name;
        if (Mb.has(e))
          return (
            Xn.debug(
              `There were multiple attempts to register component ${e}.`
            ),
            !1
          );
        Mb.set(e, t);
        for (const n of er.values()) ck(n, t);
        return !0;
      }
      const un = new J_("app", "Firebase", {
        "no-app":
          "No Firebase App '{$appName}' has been created - call initializeApp() first",
        "bad-app-name": "Illegal App name: '{$appName}",
        "duplicate-app":
          "Firebase App named '{$appName}' already exists with different options or config",
        "app-deleted": "Firebase App named '{$appName}' already deleted",
        "no-options":
          "Need to provide options, when not being deployed to hosting via source.",
        "invalid-app-argument":
          "firebase.{$appName}() takes either no argument or a Firebase App instance.",
        "invalid-log-argument":
          "First argument to `onLog` must be null or a function.",
        "idb-open":
          "Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.",
        "idb-get":
          "Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.",
        "idb-set":
          "Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.",
        "idb-delete":
          "Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.",
      });
      class dk {
        constructor(e, n, r) {
          (this._isDeleted = !1),
            (this._options = Object.assign({}, e)),
            (this._config = Object.assign({}, n)),
            (this._name = n.name),
            (this._automaticDataCollectionEnabled =
              n.automaticDataCollectionEnabled),
            (this._container = r),
            this.container.addComponent(new Cs("app", () => this, "PUBLIC"));
        }
        get automaticDataCollectionEnabled() {
          return this.checkDestroyed(), this._automaticDataCollectionEnabled;
        }
        set automaticDataCollectionEnabled(e) {
          this.checkDestroyed(), (this._automaticDataCollectionEnabled = e);
        }
        get name() {
          return this.checkDestroyed(), this._name;
        }
        get options() {
          return this.checkDestroyed(), this._options;
        }
        get config() {
          return this.checkDestroyed(), this._config;
        }
        get container() {
          return this._container;
        }
        get isDeleted() {
          return this._isDeleted;
        }
        set isDeleted(e) {
          this._isDeleted = e;
        }
        checkDestroyed() {
          if (this.isDeleted)
            throw un.create("app-deleted", { appName: this._name });
        }
      }
      function uv(t, e = {}) {
        let n = t;
        "object" != typeof e && (e = { name: e });
        const r = Object.assign(
            { name: Sb, automaticDataCollectionEnabled: !1 },
            e
          ),
          i = r.name;
        if ("string" != typeof i || !i)
          throw un.create("bad-app-name", { appName: String(i) });
        if ((n || (n = K_()), !n)) throw un.create("no-options");
        const s = er.get(i);
        if (s) {
          if (Dc(n, s.options) && Dc(r, s.config)) return s;
          throw un.create("duplicate-app", { appName: i });
        }
        const o = new wR(i);
        for (const a of Mb.values()) o.addComponent(a);
        const b = new dk(n, r, o);
        return er.set(i, b), b;
      }
      function bi(t, e, n) {
        var r;
        let i = null !== (r = uk[t]) && void 0 !== r ? r : t;
        n && (i += `-${n}`);
        const s = i.match(/\s|\//),
          o = e.match(/\s|\//);
        if (s || o) {
          const b = [`Unable to register library "${i}" with version "${e}":`];
          return (
            s &&
              b.push(
                `library name "${i}" contains illegal characters (whitespace or "/")`
              ),
            s && o && b.push("and"),
            o &&
              b.push(
                `version name "${e}" contains illegal characters (whitespace or "/")`
              ),
            void Xn.warn(b.join(" "))
          );
        }
        Ab(
          new Cs(`${i}-version`, () => ({ library: i, version: e }), "VERSION")
        );
      }
      const Es = "firebase-heartbeat-store";
      let Pc = null;
      function cv() {
        return (
          Pc ||
            (Pc = (function kR(
              t,
              e,
              { blocked: n, upgrade: r, blocking: i, terminated: s } = {}
            ) {
              const o = indexedDB.open(t, e),
                b = Mn(o);
              return (
                r &&
                  o.addEventListener("upgradeneeded", (a) => {
                    r(
                      Mn(o.result),
                      a.oldVersion,
                      a.newVersion,
                      Mn(o.transaction),
                      a
                    );
                  }),
                n &&
                  o.addEventListener("blocked", (a) =>
                    n(a.oldVersion, a.newVersion, a)
                  ),
                b
                  .then((a) => {
                    s && a.addEventListener("close", () => s()),
                      i &&
                        a.addEventListener("versionchange", (l) =>
                          i(l.oldVersion, l.newVersion, l)
                        );
                  })
                  .catch(() => {}),
                b
              );
            })("firebase-heartbeat-database", 1, {
              upgrade: (t, e) => {
                0 === e && t.createObjectStore(Es);
              },
            }).catch((t) => {
              throw un.create("idb-open", { originalErrorMessage: t.message });
            })),
          Pc
        );
      }
      function Rc() {
        return (Rc = At(function* (t) {
          try {
            return yield (yield cv())
              .transaction(Es)
              .objectStore(Es)
              .get(dv(t));
          } catch (e) {
            if (e instanceof vs) Xn.warn(e.message);
            else {
              const n = un.create("idb-get", {
                originalErrorMessage: null == e ? void 0 : e.message,
              });
              Xn.warn(n.message);
            }
          }
        })).apply(this, arguments);
      }
      function gv(t, e) {
        return kc.apply(this, arguments);
      }
      function kc() {
        return (kc = At(function* (t, e) {
          try {
            const r = (yield cv()).transaction(Es, "readwrite");
            yield r.objectStore(Es).put(e, dv(t)), yield r.done;
          } catch (n) {
            if (n instanceof vs) Xn.warn(n.message);
            else {
              const r = un.create("idb-set", {
                originalErrorMessage: null == n ? void 0 : n.message,
              });
              Xn.warn(r.message);
            }
          }
        })).apply(this, arguments);
      }
      function dv(t) {
        return `${t.name}!${t.options.appId}`;
      }
      class Dk {
        constructor(e) {
          (this.container = e), (this._heartbeatsCache = null);
          const n = this.container.getProvider("app").getImmediate();
          (this._storage = new Ck(n)),
            (this._heartbeatsCachePromise = this._storage
              .read()
              .then((r) => ((this._heartbeatsCache = r), r)));
        }
        triggerHeartbeat() {
          var e = this;
          return At(function* () {
            const r = e.container
                .getProvider("platform-logger")
                .getImmediate()
                .getPlatformInfoString(),
              i = yv();
            if (
              (null === e._heartbeatsCache &&
                (e._heartbeatsCache = yield e._heartbeatsCachePromise),
              e._heartbeatsCache.lastSentHeartbeatDate !== i &&
                !e._heartbeatsCache.heartbeats.some((s) => s.date === i))
            )
              return (
                e._heartbeatsCache.heartbeats.push({ date: i, agent: r }),
                (e._heartbeatsCache.heartbeats =
                  e._heartbeatsCache.heartbeats.filter((s) => {
                    const o = new Date(s.date).valueOf();
                    return Date.now() - o <= 2592e6;
                  })),
                e._storage.overwrite(e._heartbeatsCache)
              );
          })();
        }
        getHeartbeatsHeader() {
          var e = this;
          return At(function* () {
            if (
              (null === e._heartbeatsCache && (yield e._heartbeatsCachePromise),
              null === e._heartbeatsCache ||
                0 === e._heartbeatsCache.heartbeats.length)
            )
              return "";
            const n = yv(),
              { heartbeatsToSend: r, unsentEntries: i } = (function wk(
                t,
                e = 1024
              ) {
                const n = [];
                let r = t.slice();
                for (const i of t) {
                  const s = n.find((o) => o.agent === i.agent);
                  if (s) {
                    if ((s.dates.push(i.date), fv(n) > e)) {
                      s.dates.pop();
                      break;
                    }
                  } else if (
                    (n.push({ agent: i.agent, dates: [i.date] }), fv(n) > e)
                  ) {
                    n.pop();
                    break;
                  }
                  r = r.slice(1);
                }
                return { heartbeatsToSend: n, unsentEntries: r };
              })(e._heartbeatsCache.heartbeats),
              s = Db(JSON.stringify({ version: 2, heartbeats: r }));
            return (
              (e._heartbeatsCache.lastSentHeartbeatDate = n),
              i.length > 0
                ? ((e._heartbeatsCache.heartbeats = i),
                  yield e._storage.overwrite(e._heartbeatsCache))
                : ((e._heartbeatsCache.heartbeats = []),
                  e._storage.overwrite(e._heartbeatsCache)),
              s
            );
          })();
        }
      }
      function yv() {
        return new Date().toISOString().substring(0, 10);
      }
      class Ck {
        constructor(e) {
          (this.app = e),
            (this._canUseIndexedDBPromise =
              this.runIndexedDBEnvironmentCheck());
        }
        runIndexedDBEnvironmentCheck() {
          return At(function* () {
            return (
              !!(function nR() {
                try {
                  return "object" == typeof indexedDB;
                } catch (t) {
                  return !1;
                }
              })() &&
              (function rR() {
                return new Promise((t, e) => {
                  try {
                    let n = !0;
                    const r =
                        "validate-browser-context-for-indexeddb-analytics-module",
                      i = self.indexedDB.open(r);
                    (i.onsuccess = () => {
                      i.result.close(),
                        n || self.indexedDB.deleteDatabase(r),
                        t(!0);
                    }),
                      (i.onupgradeneeded = () => {
                        n = !1;
                      }),
                      (i.onerror = () => {
                        var s;
                        e(
                          (null === (s = i.error) || void 0 === s
                            ? void 0
                            : s.message) || ""
                        );
                      });
                  } catch (n) {
                    e(n);
                  }
                });
              })()
                .then(() => !0)
                .catch(() => !1)
            );
          })();
        }
        read() {
          var e = this;
          return At(function* () {
            return (
              ((yield e._canUseIndexedDBPromise) &&
                (yield (function mk(t) {
                  return Rc.apply(this, arguments);
                })(e.app))) || { heartbeats: [] }
            );
          })();
        }
        overwrite(e) {
          var n = this;
          return At(function* () {
            var r;
            if (yield n._canUseIndexedDBPromise) {
              const s = yield n.read();
              return gv(n.app, {
                lastSentHeartbeatDate:
                  null !== (r = e.lastSentHeartbeatDate) && void 0 !== r
                    ? r
                    : s.lastSentHeartbeatDate,
                heartbeats: e.heartbeats,
              });
            }
          })();
        }
        add(e) {
          var n = this;
          return At(function* () {
            var r;
            if (yield n._canUseIndexedDBPromise) {
              const s = yield n.read();
              return gv(n.app, {
                lastSentHeartbeatDate:
                  null !== (r = e.lastSentHeartbeatDate) && void 0 !== r
                    ? r
                    : s.lastSentHeartbeatDate,
                heartbeats: [...s.heartbeats, ...e.heartbeats],
              });
            }
          })();
        }
      }
      function fv(t) {
        return Db(JSON.stringify({ version: 2, heartbeats: t })).length;
      }
      !(function Ek(t) {
        Ab(new Cs("platform-logger", (e) => new LR(e), "PRIVATE")),
          Ab(new Cs("heartbeat", (e) => new Dk(e), "PRIVATE")),
          bi(xc, "0.9.12", t),
          bi(xc, "0.9.12", "esm2017"),
          bi("fire-js", "");
      })("");
      const hv = "@firebase/database";
      let Fc = "";
      class Tk {
        constructor(e) {
          (this.domStorage_ = e), (this.prefix_ = "firebase:");
        }
        set(e, n) {
          null == n
            ? this.domStorage_.removeItem(this.prefixedName_(e))
            : this.domStorage_.setItem(this.prefixedName_(e), Ie(n));
        }
        get(e) {
          const n = this.domStorage_.getItem(this.prefixedName_(e));
          return null == n ? null : Ds(n);
        }
        remove(e) {
          this.domStorage_.removeItem(this.prefixedName_(e));
        }
        prefixedName_(e) {
          return this.prefix_ + e;
        }
        toString() {
          return this.domStorage_.toString();
        }
      }
      class Sk {
        constructor() {
          (this.cache_ = {}), (this.isInMemoryStorage = !0);
        }
        set(e, n) {
          null == n ? delete this.cache_[e] : (this.cache_[e] = n);
        }
        get(e) {
          return ln(this.cache_, e) ? this.cache_[e] : null;
        }
        remove(e) {
          delete this.cache_[e];
        }
      }
      const mv = function (t) {
          try {
            if ("undefined" != typeof window && void 0 !== window[t]) {
              const e = window[t];
              return (
                e.setItem("firebase:sentinel", "cache"),
                e.removeItem("firebase:sentinel"),
                new Tk(e)
              );
            }
          } catch (e) {}
          return new Sk();
        },
        tr = mv("localStorage"),
        Oc = mv("sessionStorage"),
        ai = new nv("@firebase/database"),
        _v = (function () {
          let t = 1;
          return function () {
            return t++;
          };
        })(),
        vv = function (t) {
          const e = (function (t) {
              const e = [];
              let n = 0;
              for (let r = 0; r < t.length; r++) {
                let i = t.charCodeAt(r);
                if (i >= 55296 && i <= 56319) {
                  const s = i - 55296;
                  r++,
                    v(r < t.length, "Surrogate pair missing trail surrogate."),
                    (i = 65536 + (s << 10) + (t.charCodeAt(r) - 56320));
                }
                i < 128
                  ? (e[n++] = i)
                  : i < 2048
                  ? ((e[n++] = (i >> 6) | 192), (e[n++] = (63 & i) | 128))
                  : i < 65536
                  ? ((e[n++] = (i >> 12) | 224),
                    (e[n++] = ((i >> 6) & 63) | 128),
                    (e[n++] = (63 & i) | 128))
                  : ((e[n++] = (i >> 18) | 240),
                    (e[n++] = ((i >> 12) & 63) | 128),
                    (e[n++] = ((i >> 6) & 63) | 128),
                    (e[n++] = (63 & i) | 128));
              }
              return e;
            })(t),
            n = new uR();
          n.update(e);
          const r = n.digest();
          return _c.encodeByteArray(r);
        },
        Is = function (...t) {
          let e = "";
          for (let n = 0; n < t.length; n++) {
            const r = t[n];
            Array.isArray(r) ||
            (r && "object" == typeof r && "number" == typeof r.length)
              ? (e += Is.apply(null, r))
              : (e += "object" == typeof r ? Ie(r) : r),
              (e += " ");
          }
          return e;
        };
      let nr = null,
        Dv = !0;
      const Te = function (...t) {
          if (
            (!0 === Dv &&
              ((Dv = !1),
              null === nr &&
                !0 === Oc.get("logging_enabled") &&
                (function (t, e) {
                  v(
                    !e || !0 === t || !1 === t,
                    "Can't turn on custom loggers persistently."
                  ),
                    !0 === t
                      ? ((ai.logLevel = K.VERBOSE),
                        (nr = ai.log.bind(ai)),
                        e && Oc.set("logging_enabled", !0))
                      : "function" == typeof t
                      ? (nr = t)
                      : ((nr = null), Oc.remove("logging_enabled"));
                })(!0)),
            nr)
          ) {
            const e = Is.apply(null, t);
            nr(e);
          }
        },
        Ts = function (t) {
          return function (...e) {
            Te(t, ...e);
          };
        },
        Lc = function (...t) {
          const e = "FIREBASE INTERNAL ERROR: " + Is(...t);
          ai.error(e);
        },
        qt = function (...t) {
          const e = `FIREBASE FATAL ERROR: ${Is(...t)}`;
          throw (ai.error(e), new Error(e));
        },
        Fe = function (...t) {
          const e = "FIREBASE WARNING: " + Is(...t);
          ai.warn(e);
        },
        xb = function (t) {
          return (
            "number" == typeof t &&
            (t != t ||
              t === Number.POSITIVE_INFINITY ||
              t === Number.NEGATIVE_INFINITY)
          );
        },
        An = "[MIN_NAME]",
        cn = "[MAX_NAME]",
        rr = function (t, e) {
          if (t === e) return 0;
          if (t === An || e === cn) return -1;
          if (e === An || t === cn) return 1;
          {
            const n = Iv(t),
              r = Iv(e);
            return null !== n
              ? null !== r
                ? n - r == 0
                  ? t.length - e.length
                  : n - r
                : -1
              : null !== r
              ? 1
              : t < e
              ? -1
              : 1;
          }
        },
        xk = function (t, e) {
          return t === e ? 0 : t < e ? -1 : 1;
        },
        Ss = function (t, e) {
          if (e && t in e) return e[t];
          throw new Error(
            "Missing required key (" + t + ") in object: " + Ie(e)
          );
        },
        Bc = function (t) {
          if ("object" != typeof t || null === t) return Ie(t);
          const e = [];
          for (const r in t) e.push(r);
          e.sort();
          let n = "{";
          for (let r = 0; r < e.length; r++)
            0 !== r && (n += ","),
              (n += Ie(e[r])),
              (n += ":"),
              (n += Bc(t[e[r]]));
          return (n += "}"), n;
        },
        Cv = function (t, e) {
          const n = t.length;
          if (n <= e) return [t];
          const r = [];
          for (let i = 0; i < n; i += e)
            r.push(t.substring(i, i + e > n ? n : i + e));
          return r;
        };
      function Se(t, e) {
        for (const n in t) t.hasOwnProperty(n) && e(n, t[n]);
      }
      const Ev = function (t) {
          v(!xb(t), "Invalid JSON number");
          const r = 1023;
          let i, s, o, b, a;
          0 === t
            ? ((s = 0), (o = 0), (i = 1 / t == -1 / 0 ? 1 : 0))
            : ((i = t < 0),
              (t = Math.abs(t)) >= Math.pow(2, 1 - r)
                ? ((b = Math.min(Math.floor(Math.log(t) / Math.LN2), r)),
                  (s = b + r),
                  (o = Math.round(t * Math.pow(2, 52 - b) - Math.pow(2, 52))))
                : ((s = 0), (o = Math.round(t / Math.pow(2, -1074)))));
          const l = [];
          for (a = 52; a; a -= 1)
            l.push(o % 2 ? 1 : 0), (o = Math.floor(o / 2));
          for (a = 11; a; a -= 1)
            l.push(s % 2 ? 1 : 0), (s = Math.floor(s / 2));
          l.push(i ? 1 : 0), l.reverse();
          const u = l.join("");
          let c = "";
          for (a = 0; a < 64; a += 8) {
            let g = parseInt(u.substr(a, 8), 2).toString(16);
            1 === g.length && (g = "0" + g), (c += g);
          }
          return c.toLowerCase();
        },
        kk = new RegExp("^-?(0*)\\d{1,10}$"),
        Iv = function (t) {
          if (kk.test(t)) {
            const e = Number(t);
            if (e >= -2147483648 && e <= 2147483647) return e;
          }
          return null;
        },
        li = function (t) {
          try {
            t();
          } catch (e) {
            setTimeout(() => {
              throw (
                (Fe("Exception was thrown by user callback.", e.stack || ""), e)
              );
            }, Math.floor(0));
          }
        },
        Ms = function (t, e) {
          const n = setTimeout(t, e);
          return (
            "number" == typeof n &&
            "undefined" != typeof Deno &&
            Deno.unrefTimer
              ? Deno.unrefTimer(n)
              : "object" == typeof n && n.unref && n.unref(),
            n
          );
        };
      class Bk {
        constructor(e, n) {
          (this.appName_ = e),
            (this.appCheckProvider = n),
            (this.appCheck =
              null == n ? void 0 : n.getImmediate({ optional: !0 })),
            this.appCheck ||
              null == n ||
              n.get().then((r) => (this.appCheck = r));
        }
        getToken(e) {
          return this.appCheck
            ? this.appCheck.getToken(e)
            : new Promise((n, r) => {
                setTimeout(() => {
                  this.appCheck ? this.getToken(e).then(n, r) : n(null);
                }, 0);
              });
        }
        addTokenChangeListener(e) {
          var n;
          null === (n = this.appCheckProvider) ||
            void 0 === n ||
            n.get().then((r) => r.addTokenListener(e));
        }
        notifyForInvalidToken() {
          Fe(
            `Provided AppCheck credentials for the app named "${this.appName_}" are invalid. This usually indicates your app was not initialized correctly.`
          );
        }
      }
      class Vk {
        constructor(e, n, r) {
          (this.appName_ = e),
            (this.firebaseOptions_ = n),
            (this.authProvider_ = r),
            (this.auth_ = null),
            (this.auth_ = r.getImmediate({ optional: !0 })),
            this.auth_ || r.onInit((i) => (this.auth_ = i));
        }
        getToken(e) {
          return this.auth_
            ? this.auth_
                .getToken(e)
                .catch((n) =>
                  n && "auth/token-not-initialized" === n.code
                    ? (Te(
                        "Got auth/token-not-initialized error.  Treating as null token."
                      ),
                      null)
                    : Promise.reject(n)
                )
            : new Promise((n, r) => {
                setTimeout(() => {
                  this.auth_ ? this.getToken(e).then(n, r) : n(null);
                }, 0);
              });
        }
        addTokenChangeListener(e) {
          this.auth_
            ? this.auth_.addAuthTokenListener(e)
            : this.authProvider_.get().then((n) => n.addAuthTokenListener(e));
        }
        removeTokenChangeListener(e) {
          this.authProvider_.get().then((n) => n.removeAuthTokenListener(e));
        }
        notifyForInvalidToken() {
          let e =
            'Provided authentication credentials for the app named "' +
            this.appName_ +
            '" are invalid. This usually indicates your app was not initialized correctly. ';
          (e +=
            "credential" in this.firebaseOptions_
              ? 'Make sure the "credential" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.'
              : "serviceAccount" in this.firebaseOptions_
              ? 'Make sure the "serviceAccount" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.'
              : 'Make sure the "apiKey" and "databaseURL" properties provided to initializeApp() match the values provided for your app at https://console.firebase.google.com/.'),
            Fe(e);
        }
      }
      let As = (() => {
        class t {
          constructor(n) {
            this.accessToken = n;
          }
          getToken(n) {
            return Promise.resolve({ accessToken: this.accessToken });
          }
          addTokenChangeListener(n) {
            n(this.accessToken);
          }
          removeTokenChangeListener(n) {}
          notifyForInvalidToken() {}
        }
        return (t.OWNER = "owner"), t;
      })();
      const xv =
          /(console\.firebase|firebase-console-\w+\.corp|firebase\.corp)\.google\.com/,
        Rv = "websocket",
        kv = "long_polling";
      class jc {
        constructor(e, n, r, i, s = !1, o = "", b = !1, a = !1) {
          (this.secure = n),
            (this.namespace = r),
            (this.webSocketOnly = i),
            (this.nodeAdmin = s),
            (this.persistenceKey = o),
            (this.includeNamespaceInQueryParams = b),
            (this.isUsingEmulator = a),
            (this._host = e.toLowerCase()),
            (this._domain = this._host.substr(this._host.indexOf(".") + 1)),
            (this.internalHost = tr.get("host:" + e) || this._host);
        }
        isCacheableHost() {
          return "s-" === this.internalHost.substr(0, 2);
        }
        isCustomHost() {
          return (
            "firebaseio.com" !== this._domain &&
            "firebaseio-demo.com" !== this._domain
          );
        }
        get host() {
          return this._host;
        }
        set host(e) {
          e !== this.internalHost &&
            ((this.internalHost = e),
            this.isCacheableHost() &&
              tr.set("host:" + this._host, this.internalHost));
        }
        toString() {
          let e = this.toURLString();
          return (
            this.persistenceKey && (e += "<" + this.persistenceKey + ">"), e
          );
        }
        toURLString() {
          return `${this.secure ? "https://" : "http://"}${this.host}/${
            this.includeNamespaceInQueryParams ? `?ns=${this.namespace}` : ""
          }`;
        }
      }
      function Fv(t, e, n) {
        let r;
        if (
          (v("string" == typeof e, "typeof type must == string"),
          v("object" == typeof n, "typeof params must == object"),
          e === Rv)
        )
          r = (t.secure ? "wss://" : "ws://") + t.internalHost + "/.ws?";
        else {
          if (e !== kv) throw new Error("Unknown connection type: " + e);
          r = (t.secure ? "https://" : "http://") + t.internalHost + "/.lp?";
        }
        (function jk(t) {
          return (
            t.host !== t.internalHost ||
            t.isCustomHost() ||
            t.includeNamespaceInQueryParams
          );
        })(t) && (n.ns = t.namespace);
        const i = [];
        return (
          Se(n, (s, o) => {
            i.push(s + "=" + o);
          }),
          r + i.join("&")
        );
      }
      class Hk {
        constructor() {
          this.counters_ = {};
        }
        incrementCounter(e, n = 1) {
          ln(this.counters_, e) || (this.counters_[e] = 0),
            (this.counters_[e] += n);
        }
        get() {
          return GP(this.counters_);
        }
      }
      const Hc = {},
        Uc = {};
      function $c(t) {
        const e = t.toString();
        return Hc[e] || (Hc[e] = new Hk()), Hc[e];
      }
      class $k {
        constructor(e) {
          (this.onMessage_ = e),
            (this.pendingResponses = []),
            (this.currentResponseNum = 0),
            (this.closeAfterResponse = -1),
            (this.onClose = null);
        }
        closeAfter(e, n) {
          (this.closeAfterResponse = e),
            (this.onClose = n),
            this.closeAfterResponse < this.currentResponseNum &&
              (this.onClose(), (this.onClose = null));
        }
        handleResponse(e, n) {
          for (
            this.pendingResponses[e] = n;
            this.pendingResponses[this.currentResponseNum];

          ) {
            const r = this.pendingResponses[this.currentResponseNum];
            delete this.pendingResponses[this.currentResponseNum];
            for (let i = 0; i < r.length; ++i)
              r[i] &&
                li(() => {
                  this.onMessage_(r[i]);
                });
            if (this.currentResponseNum === this.closeAfterResponse) {
              this.onClose && (this.onClose(), (this.onClose = null));
              break;
            }
            this.currentResponseNum++;
          }
        }
      }
      class xn {
        constructor(e, n, r, i, s, o, b) {
          (this.connId = e),
            (this.repoInfo = n),
            (this.applicationId = r),
            (this.appCheckToken = i),
            (this.authToken = s),
            (this.transportSessionId = o),
            (this.lastSessionId = b),
            (this.bytesSent = 0),
            (this.bytesReceived = 0),
            (this.everConnected_ = !1),
            (this.log_ = Ts(e)),
            (this.stats_ = $c(n)),
            (this.urlFn = (a) => (
              this.appCheckToken && (a.ac = this.appCheckToken), Fv(n, kv, a)
            ));
        }
        open(e, n) {
          (this.curSegmentNum = 0),
            (this.onDisconnect_ = n),
            (this.myPacketOrderer = new $k(e)),
            (this.isClosed_ = !1),
            (this.connectTimeoutTimer_ = setTimeout(() => {
              this.log_("Timed out trying to connect."),
                this.onClosed_(),
                (this.connectTimeoutTimer_ = null);
            }, Math.floor(3e4))),
            (function (t) {
              if ("complete" === document.readyState) t();
              else {
                let e = !1;
                const n = function () {
                  document.body
                    ? e || ((e = !0), t())
                    : setTimeout(n, Math.floor(10));
                };
                document.addEventListener
                  ? (document.addEventListener("DOMContentLoaded", n, !1),
                    window.addEventListener("load", n, !1))
                  : document.attachEvent &&
                    (document.attachEvent("onreadystatechange", () => {
                      "complete" === document.readyState && n();
                    }),
                    window.attachEvent("onload", n));
              }
            })(() => {
              if (this.isClosed_) return;
              this.scriptTagHolder = new Wc(
                (...s) => {
                  const [o, b, a, l, u] = s;
                  if ((this.incrementIncomingBytes_(s), this.scriptTagHolder))
                    if (
                      (this.connectTimeoutTimer_ &&
                        (clearTimeout(this.connectTimeoutTimer_),
                        (this.connectTimeoutTimer_ = null)),
                      (this.everConnected_ = !0),
                      "start" === o)
                    )
                      (this.id = b), (this.password = a);
                    else {
                      if ("close" !== o)
                        throw new Error("Unrecognized command received: " + o);
                      b
                        ? ((this.scriptTagHolder.sendNewPolls = !1),
                          this.myPacketOrderer.closeAfter(b, () => {
                            this.onClosed_();
                          }))
                        : this.onClosed_();
                    }
                },
                (...s) => {
                  const [o, b] = s;
                  this.incrementIncomingBytes_(s),
                    this.myPacketOrderer.handleResponse(o, b);
                },
                () => {
                  this.onClosed_();
                },
                this.urlFn
              );
              const r = { start: "t" };
              (r.ser = Math.floor(1e8 * Math.random())),
                this.scriptTagHolder.uniqueCallbackIdentifier &&
                  (r.cb = this.scriptTagHolder.uniqueCallbackIdentifier),
                (r.v = "5"),
                this.transportSessionId && (r.s = this.transportSessionId),
                this.lastSessionId && (r.ls = this.lastSessionId),
                this.applicationId && (r.p = this.applicationId),
                this.appCheckToken && (r.ac = this.appCheckToken),
                "undefined" != typeof location &&
                  location.hostname &&
                  xv.test(location.hostname) &&
                  (r.r = "f");
              const i = this.urlFn(r);
              this.log_("Connecting via long-poll to " + i),
                this.scriptTagHolder.addTag(i, () => {});
            });
        }
        start() {
          this.scriptTagHolder.startLongPoll(this.id, this.password),
            this.addDisconnectPingFrame(this.id, this.password);
        }
        static forceAllow() {
          xn.forceAllow_ = !0;
        }
        static forceDisallow() {
          xn.forceDisallow_ = !0;
        }
        static isAvailable() {
          return !(
            !xn.forceAllow_ &&
            (xn.forceDisallow_ ||
              "undefined" == typeof document ||
              null == document.createElement ||
              ("object" == typeof window &&
                window.chrome &&
                window.chrome.extension &&
                !/^chrome/.test(window.location.href)) ||
              ("object" == typeof Windows && "object" == typeof Windows.UI))
          );
        }
        markConnectionHealthy() {}
        shutdown_() {
          (this.isClosed_ = !0),
            this.scriptTagHolder &&
              (this.scriptTagHolder.close(), (this.scriptTagHolder = null)),
            this.myDisconnFrame &&
              (document.body.removeChild(this.myDisconnFrame),
              (this.myDisconnFrame = null)),
            this.connectTimeoutTimer_ &&
              (clearTimeout(this.connectTimeoutTimer_),
              (this.connectTimeoutTimer_ = null));
        }
        onClosed_() {
          this.isClosed_ ||
            (this.log_("Longpoll is closing itself"),
            this.shutdown_(),
            this.onDisconnect_ &&
              (this.onDisconnect_(this.everConnected_),
              (this.onDisconnect_ = null)));
        }
        close() {
          this.isClosed_ ||
            (this.log_("Longpoll is being closed."), this.shutdown_());
        }
        send(e) {
          const n = Ie(e);
          (this.bytesSent += n.length),
            this.stats_.incrementCounter("bytes_sent", n.length);
          const r = Q_(n),
            i = Cv(r, 1840);
          for (let s = 0; s < i.length; s++)
            this.scriptTagHolder.enqueueSegment(
              this.curSegmentNum,
              i.length,
              i[s]
            ),
              this.curSegmentNum++;
        }
        addDisconnectPingFrame(e, n) {
          this.myDisconnFrame = document.createElement("iframe");
          const r = { dframe: "t" };
          (r.id = e),
            (r.pw = n),
            (this.myDisconnFrame.src = this.urlFn(r)),
            (this.myDisconnFrame.style.display = "none"),
            document.body.appendChild(this.myDisconnFrame);
        }
        incrementIncomingBytes_(e) {
          const n = Ie(e).length;
          (this.bytesReceived += n),
            this.stats_.incrementCounter("bytes_received", n);
        }
      }
      class Wc {
        constructor(e, n, r, i) {
          (this.onDisconnect = r),
            (this.urlFn = i),
            (this.outstandingRequests = new Set()),
            (this.pendingSegs = []),
            (this.currentSerial = Math.floor(1e8 * Math.random())),
            (this.sendNewPolls = !0);
          {
            (this.uniqueCallbackIdentifier = _v()),
              (window["pLPCommand" + this.uniqueCallbackIdentifier] = e),
              (window["pRTLPCB" + this.uniqueCallbackIdentifier] = n),
              (this.myIFrame = Wc.createIFrame_());
            let s = "";
            this.myIFrame.src &&
              "javascript:" === this.myIFrame.src.substr(0, 11) &&
              (s =
                '<script>document.domain="' + document.domain + '";</script>');
            const o = "<html><body>" + s + "</body></html>";
            try {
              this.myIFrame.doc.open(),
                this.myIFrame.doc.write(o),
                this.myIFrame.doc.close();
            } catch (b) {
              Te("frame writing exception"), b.stack && Te(b.stack), Te(b);
            }
          }
        }
        static createIFrame_() {
          const e = document.createElement("iframe");
          if (((e.style.display = "none"), !document.body))
            throw "Document body has not initialized. Wait to initialize Firebase until after the document is ready.";
          document.body.appendChild(e);
          try {
            e.contentWindow.document || Te("No IE domain setting required");
          } catch (n) {
            const r = document.domain;
            e.src =
              "javascript:void((function(){document.open();document.domain='" +
              r +
              "';document.close();})())";
          }
          return (
            e.contentDocument
              ? (e.doc = e.contentDocument)
              : e.contentWindow
              ? (e.doc = e.contentWindow.document)
              : e.document && (e.doc = e.document),
            e
          );
        }
        close() {
          (this.alive = !1),
            this.myIFrame &&
              ((this.myIFrame.doc.body.textContent = ""),
              setTimeout(() => {
                null !== this.myIFrame &&
                  (document.body.removeChild(this.myIFrame),
                  (this.myIFrame = null));
              }, Math.floor(0)));
          const e = this.onDisconnect;
          e && ((this.onDisconnect = null), e());
        }
        startLongPoll(e, n) {
          for (
            this.myID = e, this.myPW = n, this.alive = !0;
            this.newRequest_();

          );
        }
        newRequest_() {
          if (
            this.alive &&
            this.sendNewPolls &&
            this.outstandingRequests.size <
              (this.pendingSegs.length > 0 ? 2 : 1)
          ) {
            this.currentSerial++;
            const e = {};
            (e.id = this.myID),
              (e.pw = this.myPW),
              (e.ser = this.currentSerial);
            let n = this.urlFn(e),
              r = "",
              i = 0;
            for (
              ;
              this.pendingSegs.length > 0 &&
              this.pendingSegs[0].d.length + 30 + r.length <= 1870;

            ) {
              const o = this.pendingSegs.shift();
              (r =
                r +
                "&seg" +
                i +
                "=" +
                o.seg +
                "&ts" +
                i +
                "=" +
                o.ts +
                "&d" +
                i +
                "=" +
                o.d),
                i++;
            }
            return (n += r), this.addLongPollTag_(n, this.currentSerial), !0;
          }
          return !1;
        }
        enqueueSegment(e, n, r) {
          this.pendingSegs.push({ seg: e, ts: n, d: r }),
            this.alive && this.newRequest_();
        }
        addLongPollTag_(e, n) {
          this.outstandingRequests.add(n);
          const r = () => {
              this.outstandingRequests.delete(n), this.newRequest_();
            },
            i = setTimeout(r, Math.floor(25e3));
          this.addTag(e, () => {
            clearTimeout(i), r();
          });
        }
        addTag(e, n) {
          setTimeout(() => {
            try {
              if (!this.sendNewPolls) return;
              const r = this.myIFrame.doc.createElement("script");
              (r.type = "text/javascript"),
                (r.async = !0),
                (r.src = e),
                (r.onload = r.onreadystatechange =
                  function () {
                    const i = r.readyState;
                    (!i || "loaded" === i || "complete" === i) &&
                      ((r.onload = r.onreadystatechange = null),
                      r.parentNode && r.parentNode.removeChild(r),
                      n());
                  }),
                (r.onerror = () => {
                  Te("Long-poll script failed to load: " + e),
                    (this.sendNewPolls = !1),
                    this.close();
                }),
                this.myIFrame.doc.body.appendChild(r);
            } catch (r) {}
          }, Math.floor(1));
        }
      }
      let Pb = null;
      "undefined" != typeof MozWebSocket
        ? (Pb = MozWebSocket)
        : "undefined" != typeof WebSocket && (Pb = WebSocket);
      let ui = (() => {
          class t {
            constructor(n, r, i, s, o, b, a) {
              (this.connId = n),
                (this.applicationId = i),
                (this.appCheckToken = s),
                (this.authToken = o),
                (this.keepaliveTimer = null),
                (this.frames = null),
                (this.totalFrames = 0),
                (this.bytesSent = 0),
                (this.bytesReceived = 0),
                (this.log_ = Ts(this.connId)),
                (this.stats_ = $c(r)),
                (this.connURL = t.connectionURL_(r, b, a, s, i)),
                (this.nodeAdmin = r.nodeAdmin);
            }
            static connectionURL_(n, r, i, s, o) {
              const b = { v: "5" };
              return (
                "undefined" != typeof location &&
                  location.hostname &&
                  xv.test(location.hostname) &&
                  (b.r = "f"),
                r && (b.s = r),
                i && (b.ls = i),
                s && (b.ac = s),
                o && (b.p = o),
                Fv(n, Rv, b)
              );
            }
            open(n, r) {
              (this.onDisconnect = r),
                (this.onMessage = n),
                this.log_("Websocket connecting to " + this.connURL),
                (this.everConnected_ = !1),
                tr.set("previous_websocket_failure", !0);
              try {
                let i;
                0, (this.mySock = new Pb(this.connURL, [], i));
              } catch (i) {
                this.log_("Error instantiating WebSocket.");
                const s = i.message || i.data;
                return s && this.log_(s), void this.onClosed_();
              }
              (this.mySock.onopen = () => {
                this.log_("Websocket connected."), (this.everConnected_ = !0);
              }),
                (this.mySock.onclose = () => {
                  this.log_("Websocket connection was disconnected."),
                    (this.mySock = null),
                    this.onClosed_();
                }),
                (this.mySock.onmessage = (i) => {
                  this.handleIncomingFrame(i);
                }),
                (this.mySock.onerror = (i) => {
                  this.log_("WebSocket error.  Closing connection.");
                  const s = i.message || i.data;
                  s && this.log_(s), this.onClosed_();
                });
            }
            start() {}
            static forceDisallow() {
              t.forceDisallow_ = !0;
            }
            static isAvailable() {
              let n = !1;
              if ("undefined" != typeof navigator && navigator.userAgent) {
                const i = navigator.userAgent.match(
                  /Android ([0-9]{0,}\.[0-9]{0,})/
                );
                i && i.length > 1 && parseFloat(i[1]) < 4.4 && (n = !0);
              }
              return !n && null !== Pb && !t.forceDisallow_;
            }
            static previouslyFailed() {
              return (
                tr.isInMemoryStorage ||
                !0 === tr.get("previous_websocket_failure")
              );
            }
            markConnectionHealthy() {
              tr.remove("previous_websocket_failure");
            }
            appendFrame_(n) {
              if (
                (this.frames.push(n), this.frames.length === this.totalFrames)
              ) {
                const r = this.frames.join("");
                this.frames = null;
                const i = Ds(r);
                this.onMessage(i);
              }
            }
            handleNewFrameCount_(n) {
              (this.totalFrames = n), (this.frames = []);
            }
            extractFrameCount_(n) {
              if (
                (v(null === this.frames, "We already have a frame buffer"),
                n.length <= 6)
              ) {
                const r = Number(n);
                if (!isNaN(r)) return this.handleNewFrameCount_(r), null;
              }
              return this.handleNewFrameCount_(1), n;
            }
            handleIncomingFrame(n) {
              if (null === this.mySock) return;
              const r = n.data;
              if (
                ((this.bytesReceived += r.length),
                this.stats_.incrementCounter("bytes_received", r.length),
                this.resetKeepAlive(),
                null !== this.frames)
              )
                this.appendFrame_(r);
              else {
                const i = this.extractFrameCount_(r);
                null !== i && this.appendFrame_(i);
              }
            }
            send(n) {
              this.resetKeepAlive();
              const r = Ie(n);
              (this.bytesSent += r.length),
                this.stats_.incrementCounter("bytes_sent", r.length);
              const i = Cv(r, 16384);
              i.length > 1 && this.sendString_(String(i.length));
              for (let s = 0; s < i.length; s++) this.sendString_(i[s]);
            }
            shutdown_() {
              (this.isClosed_ = !0),
                this.keepaliveTimer &&
                  (clearInterval(this.keepaliveTimer),
                  (this.keepaliveTimer = null)),
                this.mySock && (this.mySock.close(), (this.mySock = null));
            }
            onClosed_() {
              this.isClosed_ ||
                (this.log_("WebSocket is closing itself"),
                this.shutdown_(),
                this.onDisconnect &&
                  (this.onDisconnect(this.everConnected_),
                  (this.onDisconnect = null)));
            }
            close() {
              this.isClosed_ ||
                (this.log_("WebSocket is being closed"), this.shutdown_());
            }
            resetKeepAlive() {
              clearInterval(this.keepaliveTimer),
                (this.keepaliveTimer = setInterval(() => {
                  this.mySock && this.sendString_("0"), this.resetKeepAlive();
                }, Math.floor(45e3)));
            }
            sendString_(n) {
              try {
                this.mySock.send(n);
              } catch (r) {
                this.log_(
                  "Exception thrown from WebSocket.send():",
                  r.message || r.data,
                  "Closing connection."
                ),
                  setTimeout(this.onClosed_.bind(this), 0);
              }
            }
          }
          return (
            (t.responsesRequiredToBeHealthy = 2), (t.healthyTimeout = 3e4), t
          );
        })(),
        Uv = (() => {
          class t {
            constructor(n) {
              this.initTransports_(n);
            }
            static get ALL_TRANSPORTS() {
              return [xn, ui];
            }
            static get IS_TRANSPORT_INITIALIZED() {
              return this.globalTransportInitialized_;
            }
            initTransports_(n) {
              const r = ui && ui.isAvailable();
              let i = r && !ui.previouslyFailed();
              if (
                (n.webSocketOnly &&
                  (r ||
                    Fe(
                      "wss:// URL used, but browser isn't known to support websockets.  Trying anyway."
                    ),
                  (i = !0)),
                i)
              )
                this.transports_ = [ui];
              else {
                const s = (this.transports_ = []);
                for (const o of t.ALL_TRANSPORTS)
                  o && o.isAvailable() && s.push(o);
                t.globalTransportInitialized_ = !0;
              }
            }
            initialTransport() {
              if (this.transports_.length > 0) return this.transports_[0];
              throw new Error("No transports available");
            }
            upgradeTransport() {
              return this.transports_.length > 1 ? this.transports_[1] : null;
            }
          }
          return (t.globalTransportInitialized_ = !1), t;
        })();
      class Yv {
        constructor(e, n, r, i, s, o, b, a, l, u) {
          (this.id = e),
            (this.repoInfo_ = n),
            (this.applicationId_ = r),
            (this.appCheckToken_ = i),
            (this.authToken_ = s),
            (this.onMessage_ = o),
            (this.onReady_ = b),
            (this.onDisconnect_ = a),
            (this.onKill_ = l),
            (this.lastSessionId = u),
            (this.connectionCount = 0),
            (this.pendingDataMessages = []),
            (this.state_ = 0),
            (this.log_ = Ts("c:" + this.id + ":")),
            (this.transportManager_ = new Uv(n)),
            this.log_("Connection created"),
            this.start_();
        }
        start_() {
          const e = this.transportManager_.initialTransport();
          (this.conn_ = new e(
            this.nextTransportId_(),
            this.repoInfo_,
            this.applicationId_,
            this.appCheckToken_,
            this.authToken_,
            null,
            this.lastSessionId
          )),
            (this.primaryResponsesRequired_ =
              e.responsesRequiredToBeHealthy || 0);
          const n = this.connReceiver_(this.conn_),
            r = this.disconnReceiver_(this.conn_);
          (this.tx_ = this.conn_),
            (this.rx_ = this.conn_),
            (this.secondaryConn_ = null),
            (this.isHealthy_ = !1),
            setTimeout(() => {
              this.conn_ && this.conn_.open(n, r);
            }, Math.floor(0));
          const i = e.healthyTimeout || 0;
          i > 0 &&
            (this.healthyTimeout_ = Ms(() => {
              (this.healthyTimeout_ = null),
                this.isHealthy_ ||
                  (this.conn_ && this.conn_.bytesReceived > 102400
                    ? (this.log_(
                        "Connection exceeded healthy timeout but has received " +
                          this.conn_.bytesReceived +
                          " bytes.  Marking connection healthy."
                      ),
                      (this.isHealthy_ = !0),
                      this.conn_.markConnectionHealthy())
                    : this.conn_ && this.conn_.bytesSent > 10240
                    ? this.log_(
                        "Connection exceeded healthy timeout but has sent " +
                          this.conn_.bytesSent +
                          " bytes.  Leaving connection alive."
                      )
                    : (this.log_("Closing unhealthy connection after timeout."),
                      this.close()));
            }, Math.floor(i)));
        }
        nextTransportId_() {
          return "c:" + this.id + ":" + this.connectionCount++;
        }
        disconnReceiver_(e) {
          return (n) => {
            e === this.conn_
              ? this.onConnectionLost_(n)
              : e === this.secondaryConn_
              ? (this.log_("Secondary connection lost."),
                this.onSecondaryConnectionLost_())
              : this.log_("closing an old connection");
          };
        }
        connReceiver_(e) {
          return (n) => {
            2 !== this.state_ &&
              (e === this.rx_
                ? this.onPrimaryMessageReceived_(n)
                : e === this.secondaryConn_
                ? this.onSecondaryMessageReceived_(n)
                : this.log_("message on old connection"));
          };
        }
        sendRequest(e) {
          this.sendData_({ t: "d", d: e });
        }
        tryCleanupConnection() {
          this.tx_ === this.secondaryConn_ &&
            this.rx_ === this.secondaryConn_ &&
            (this.log_(
              "cleaning up and promoting a connection: " +
                this.secondaryConn_.connId
            ),
            (this.conn_ = this.secondaryConn_),
            (this.secondaryConn_ = null));
        }
        onSecondaryControl_(e) {
          if ("t" in e) {
            const n = e.t;
            "a" === n
              ? this.upgradeIfSecondaryHealthy_()
              : "r" === n
              ? (this.log_("Got a reset on secondary, closing it"),
                this.secondaryConn_.close(),
                (this.tx_ === this.secondaryConn_ ||
                  this.rx_ === this.secondaryConn_) &&
                  this.close())
              : "o" === n &&
                (this.log_("got pong on secondary."),
                this.secondaryResponsesRequired_--,
                this.upgradeIfSecondaryHealthy_());
          }
        }
        onSecondaryMessageReceived_(e) {
          const n = Ss("t", e),
            r = Ss("d", e);
          if ("c" === n) this.onSecondaryControl_(r);
          else {
            if ("d" !== n) throw new Error("Unknown protocol layer: " + n);
            this.pendingDataMessages.push(r);
          }
        }
        upgradeIfSecondaryHealthy_() {
          this.secondaryResponsesRequired_ <= 0
            ? (this.log_("Secondary connection is healthy."),
              (this.isHealthy_ = !0),
              this.secondaryConn_.markConnectionHealthy(),
              this.proceedWithUpgrade_())
            : (this.log_("sending ping on secondary."),
              this.secondaryConn_.send({ t: "c", d: { t: "p", d: {} } }));
        }
        proceedWithUpgrade_() {
          this.secondaryConn_.start(),
            this.log_("sending client ack on secondary"),
            this.secondaryConn_.send({ t: "c", d: { t: "a", d: {} } }),
            this.log_("Ending transmission on primary"),
            this.conn_.send({ t: "c", d: { t: "n", d: {} } }),
            (this.tx_ = this.secondaryConn_),
            this.tryCleanupConnection();
        }
        onPrimaryMessageReceived_(e) {
          const n = Ss("t", e),
            r = Ss("d", e);
          "c" === n ? this.onControl_(r) : "d" === n && this.onDataMessage_(r);
        }
        onDataMessage_(e) {
          this.onPrimaryResponse_(), this.onMessage_(e);
        }
        onPrimaryResponse_() {
          this.isHealthy_ ||
            (this.primaryResponsesRequired_--,
            this.primaryResponsesRequired_ <= 0 &&
              (this.log_("Primary connection is healthy."),
              (this.isHealthy_ = !0),
              this.conn_.markConnectionHealthy()));
        }
        onControl_(e) {
          const n = Ss("t", e);
          if ("d" in e) {
            const r = e.d;
            if ("h" === n) {
              const i = Object.assign({}, r);
              this.repoInfo_.isUsingEmulator && (i.h = this.repoInfo_.host),
                this.onHandshake_(i);
            } else if ("n" === n) {
              this.log_("recvd end transmission on primary"),
                (this.rx_ = this.secondaryConn_);
              for (let i = 0; i < this.pendingDataMessages.length; ++i)
                this.onDataMessage_(this.pendingDataMessages[i]);
              (this.pendingDataMessages = []), this.tryCleanupConnection();
            } else
              "s" === n
                ? this.onConnectionShutdown_(r)
                : "r" === n
                ? this.onReset_(r)
                : "e" === n
                ? Lc("Server Error: " + r)
                : "o" === n
                ? (this.log_("got pong on primary."),
                  this.onPrimaryResponse_(),
                  this.sendPingOnPrimaryIfNecessary_())
                : Lc("Unknown control packet command: " + n);
          }
        }
        onHandshake_(e) {
          const n = e.ts,
            r = e.v,
            i = e.h;
          (this.sessionId = e.s),
            (this.repoInfo_.host = i),
            0 === this.state_ &&
              (this.conn_.start(),
              this.onConnectionEstablished_(this.conn_, n),
              "5" !== r && Fe("Protocol version mismatch detected"),
              this.tryStartUpgrade_());
        }
        tryStartUpgrade_() {
          const e = this.transportManager_.upgradeTransport();
          e && this.startUpgrade_(e);
        }
        startUpgrade_(e) {
          (this.secondaryConn_ = new e(
            this.nextTransportId_(),
            this.repoInfo_,
            this.applicationId_,
            this.appCheckToken_,
            this.authToken_,
            this.sessionId
          )),
            (this.secondaryResponsesRequired_ =
              e.responsesRequiredToBeHealthy || 0);
          const n = this.connReceiver_(this.secondaryConn_),
            r = this.disconnReceiver_(this.secondaryConn_);
          this.secondaryConn_.open(n, r),
            Ms(() => {
              this.secondaryConn_ &&
                (this.log_("Timed out trying to upgrade."),
                this.secondaryConn_.close());
            }, Math.floor(6e4));
        }
        onReset_(e) {
          this.log_("Reset packet received.  New host: " + e),
            (this.repoInfo_.host = e),
            1 === this.state_
              ? this.close()
              : (this.closeConnections_(), this.start_());
        }
        onConnectionEstablished_(e, n) {
          this.log_("Realtime connection established."),
            (this.conn_ = e),
            (this.state_ = 1),
            this.onReady_ &&
              (this.onReady_(n, this.sessionId), (this.onReady_ = null)),
            0 === this.primaryResponsesRequired_
              ? (this.log_("Primary connection is healthy."),
                (this.isHealthy_ = !0))
              : Ms(() => {
                  this.sendPingOnPrimaryIfNecessary_();
                }, Math.floor(5e3));
        }
        sendPingOnPrimaryIfNecessary_() {
          !this.isHealthy_ &&
            1 === this.state_ &&
            (this.log_("sending ping on primary."),
            this.sendData_({ t: "c", d: { t: "p", d: {} } }));
        }
        onSecondaryConnectionLost_() {
          const e = this.secondaryConn_;
          (this.secondaryConn_ = null),
            (this.tx_ === e || this.rx_ === e) && this.close();
        }
        onConnectionLost_(e) {
          (this.conn_ = null),
            e || 0 !== this.state_
              ? 1 === this.state_ && this.log_("Realtime connection lost.")
              : (this.log_("Realtime connection failed."),
                this.repoInfo_.isCacheableHost() &&
                  (tr.remove("host:" + this.repoInfo_.host),
                  (this.repoInfo_.internalHost = this.repoInfo_.host))),
            this.close();
        }
        onConnectionShutdown_(e) {
          this.log_("Connection shutdown command received. Shutting down..."),
            this.onKill_ && (this.onKill_(e), (this.onKill_ = null)),
            (this.onDisconnect_ = null),
            this.close();
        }
        sendData_(e) {
          if (1 !== this.state_) throw "Connection is not connected";
          this.tx_.send(e);
        }
        close() {
          2 !== this.state_ &&
            (this.log_("Closing realtime connection."),
            (this.state_ = 2),
            this.closeConnections_(),
            this.onDisconnect_ &&
              (this.onDisconnect_(), (this.onDisconnect_ = null)));
        }
        closeConnections_() {
          this.log_("Shutting down all connections"),
            this.conn_ && (this.conn_.close(), (this.conn_ = null)),
            this.secondaryConn_ &&
              (this.secondaryConn_.close(), (this.secondaryConn_ = null)),
            this.healthyTimeout_ &&
              (clearTimeout(this.healthyTimeout_),
              (this.healthyTimeout_ = null));
        }
      }
      class Kv {
        put(e, n, r, i) {}
        merge(e, n, r, i) {}
        refreshAuthToken(e) {}
        refreshAppCheckToken(e) {}
        onDisconnectPut(e, n, r) {}
        onDisconnectMerge(e, n, r) {}
        onDisconnectCancel(e, n) {}
        reportStats(e) {}
      }
      class Zv {
        constructor(e) {
          (this.allowedEvents_ = e),
            (this.listeners_ = {}),
            v(Array.isArray(e) && e.length > 0, "Requires a non-empty array");
        }
        trigger(e, ...n) {
          if (Array.isArray(this.listeners_[e])) {
            const r = [...this.listeners_[e]];
            for (let i = 0; i < r.length; i++)
              r[i].callback.apply(r[i].context, n);
          }
        }
        on(e, n, r) {
          this.validateEventType_(e),
            (this.listeners_[e] = this.listeners_[e] || []),
            this.listeners_[e].push({ callback: n, context: r });
          const i = this.getInitialEvent(e);
          i && n.apply(r, i);
        }
        off(e, n, r) {
          this.validateEventType_(e);
          const i = this.listeners_[e] || [];
          for (let s = 0; s < i.length; s++)
            if (i[s].callback === n && (!r || r === i[s].context))
              return void i.splice(s, 1);
        }
        validateEventType_(e) {
          v(
            this.allowedEvents_.find((n) => n === e),
            "Unknown event: " + e
          );
        }
      }
      class Rb extends Zv {
        constructor() {
          super(["online"]),
            (this.online_ = !0),
            "undefined" != typeof window &&
              void 0 !== window.addEventListener &&
              !Z_() &&
              (window.addEventListener(
                "online",
                () => {
                  this.online_ ||
                    ((this.online_ = !0), this.trigger("online", !0));
                },
                !1
              ),
              window.addEventListener(
                "offline",
                () => {
                  this.online_ &&
                    ((this.online_ = !1), this.trigger("online", !1));
                },
                !1
              ));
        }
        static getInstance() {
          return new Rb();
        }
        getInitialEvent(e) {
          return v("online" === e, "Unknown event type: " + e), [this.online_];
        }
        currentlyOnline() {
          return this.online_;
        }
      }
      class z {
        constructor(e, n) {
          if (void 0 === n) {
            this.pieces_ = e.split("/");
            let r = 0;
            for (let i = 0; i < this.pieces_.length; i++)
              this.pieces_[i].length > 0 &&
                ((this.pieces_[r] = this.pieces_[i]), r++);
            (this.pieces_.length = r), (this.pieceNum_ = 0);
          } else (this.pieces_ = e), (this.pieceNum_ = n);
        }
        toString() {
          let e = "";
          for (let n = this.pieceNum_; n < this.pieces_.length; n++)
            "" !== this.pieces_[n] && (e += "/" + this.pieces_[n]);
          return e || "/";
        }
      }
      function W() {
        return new z("");
      }
      function F(t) {
        return t.pieceNum_ >= t.pieces_.length ? null : t.pieces_[t.pieceNum_];
      }
      function Nn(t) {
        return t.pieces_.length - t.pieceNum_;
      }
      function te(t) {
        let e = t.pieceNum_;
        return e < t.pieces_.length && e++, new z(t.pieces_, e);
      }
      function zc(t) {
        return t.pieceNum_ < t.pieces_.length
          ? t.pieces_[t.pieces_.length - 1]
          : null;
      }
      function xs(t, e = 0) {
        return t.pieces_.slice(t.pieceNum_ + e);
      }
      function eD(t) {
        if (t.pieceNum_ >= t.pieces_.length) return null;
        const e = [];
        for (let n = t.pieceNum_; n < t.pieces_.length - 1; n++)
          e.push(t.pieces_[n]);
        return new z(e, 0);
      }
      function ae(t, e) {
        const n = [];
        for (let r = t.pieceNum_; r < t.pieces_.length; r++)
          n.push(t.pieces_[r]);
        if (e instanceof z)
          for (let r = e.pieceNum_; r < e.pieces_.length; r++)
            n.push(e.pieces_[r]);
        else {
          const r = e.split("/");
          for (let i = 0; i < r.length; i++) r[i].length > 0 && n.push(r[i]);
        }
        return new z(n, 0);
      }
      function O(t) {
        return t.pieceNum_ >= t.pieces_.length;
      }
      function Ue(t, e) {
        const n = F(t),
          r = F(e);
        if (null === n) return e;
        if (n === r) return Ue(te(t), te(e));
        throw new Error(
          "INTERNAL ERROR: innerPath (" +
            e +
            ") is not within outerPath (" +
            t +
            ")"
        );
      }
      function qc(t, e) {
        if (Nn(t) !== Nn(e)) return !1;
        for (
          let n = t.pieceNum_, r = e.pieceNum_;
          n <= t.pieces_.length;
          n++, r++
        )
          if (t.pieces_[n] !== e.pieces_[r]) return !1;
        return !0;
      }
      function ht(t, e) {
        let n = t.pieceNum_,
          r = e.pieceNum_;
        if (Nn(t) > Nn(e)) return !1;
        for (; n < t.pieces_.length; ) {
          if (t.pieces_[n] !== e.pieces_[r]) return !1;
          ++n, ++r;
        }
        return !0;
      }
      class gF {
        constructor(e, n) {
          (this.errorPrefix_ = n),
            (this.parts_ = xs(e, 0)),
            (this.byteLength_ = Math.max(1, this.parts_.length));
          for (let r = 0; r < this.parts_.length; r++)
            this.byteLength_ += Tb(this.parts_[r]);
          tD(this);
        }
      }
      function tD(t) {
        if (t.byteLength_ > 768)
          throw new Error(
            t.errorPrefix_ +
              "has a key path longer than 768 bytes (" +
              t.byteLength_ +
              ")."
          );
        if (t.parts_.length > 32)
          throw new Error(
            t.errorPrefix_ +
              "path specified exceeds the maximum depth that can be written (32) or object contains a cycle " +
              ir(t)
          );
      }
      function ir(t) {
        return 0 === t.parts_.length
          ? ""
          : "in property '" + t.parts_.join(".") + "'";
      }
      class Qc extends Zv {
        constructor() {
          let e, n;
          super(["visible"]),
            "undefined" != typeof document &&
              void 0 !== document.addEventListener &&
              (void 0 !== document.hidden
                ? ((n = "visibilitychange"), (e = "hidden"))
                : void 0 !== document.mozHidden
                ? ((n = "mozvisibilitychange"), (e = "mozHidden"))
                : void 0 !== document.msHidden
                ? ((n = "msvisibilitychange"), (e = "msHidden"))
                : void 0 !== document.webkitHidden &&
                  ((n = "webkitvisibilitychange"), (e = "webkitHidden"))),
            (this.visible_ = !0),
            n &&
              document.addEventListener(
                n,
                () => {
                  const r = !document[e];
                  r !== this.visible_ &&
                    ((this.visible_ = r), this.trigger("visible", r));
                },
                !1
              );
        }
        static getInstance() {
          return new Qc();
        }
        getInitialEvent(e) {
          return (
            v("visible" === e, "Unknown event type: " + e), [this.visible_]
          );
        }
      }
      const Ns = 1e3;
      let Fb,
        sr = (() => {
          class t extends Kv {
            constructor(n, r, i, s, o, b, a, l) {
              if (
                (super(),
                (this.repoInfo_ = n),
                (this.applicationId_ = r),
                (this.onDataUpdate_ = i),
                (this.onConnectStatus_ = s),
                (this.onServerInfoUpdate_ = o),
                (this.authTokenProvider_ = b),
                (this.appCheckTokenProvider_ = a),
                (this.authOverride_ = l),
                (this.id = t.nextPersistentConnectionId_++),
                (this.log_ = Ts("p:" + this.id + ":")),
                (this.interruptReasons_ = {}),
                (this.listens = new Map()),
                (this.outstandingPuts_ = []),
                (this.outstandingGets_ = []),
                (this.outstandingPutCount_ = 0),
                (this.outstandingGetCount_ = 0),
                (this.onDisconnectRequestQueue_ = []),
                (this.connected_ = !1),
                (this.reconnectDelay_ = Ns),
                (this.maxReconnectDelay_ = 3e5),
                (this.securityDebugCallback_ = null),
                (this.lastSessionId = null),
                (this.establishConnectionTimer_ = null),
                (this.visible_ = !1),
                (this.requestCBHash_ = {}),
                (this.requestNumber_ = 0),
                (this.realtime_ = null),
                (this.authToken_ = null),
                (this.appCheckToken_ = null),
                (this.forceTokenRefresh_ = !1),
                (this.invalidAuthTokenCount_ = 0),
                (this.invalidAppCheckTokenCount_ = 0),
                (this.firstConnection_ = !0),
                (this.lastConnectionAttemptTime_ = null),
                (this.lastConnectionEstablishedTime_ = null),
                l)
              )
                throw new Error(
                  "Auth override specified in options, but not supported on non Node.js platforms"
                );
              Qc.getInstance().on("visible", this.onVisible_, this),
                -1 === n.host.indexOf("fblocal") &&
                  Rb.getInstance().on("online", this.onOnline_, this);
            }
            sendRequest(n, r, i) {
              const s = ++this.requestNumber_,
                o = { r: s, a: n, b: r };
              this.log_(Ie(o)),
                v(
                  this.connected_,
                  "sendRequest call when we're not connected not allowed."
                ),
                this.realtime_.sendRequest(o),
                i && (this.requestCBHash_[s] = i);
            }
            get(n) {
              this.initConnection_();
              const r = new _s(),
                i = { p: n._path.toString(), q: n._queryObject };
              return (
                this.outstandingGets_.push({
                  action: "g",
                  request: i,
                  onComplete: (b) => {
                    const a = b.d;
                    "ok" === b.s ? r.resolve(a) : r.reject(a);
                  },
                }),
                this.outstandingGetCount_++,
                this.connected_ &&
                  this.sendGet_(this.outstandingGets_.length - 1),
                r.promise
              );
            }
            listen(n, r, i, s) {
              this.initConnection_();
              const o = n._queryIdentifier,
                b = n._path.toString();
              this.log_("Listen called for " + b + " " + o),
                this.listens.has(b) || this.listens.set(b, new Map()),
                v(
                  n._queryParams.isDefault() || !n._queryParams.loadsAllData(),
                  "listen() called for non-default but complete query"
                ),
                v(
                  !this.listens.get(b).has(o),
                  "listen() called twice for same path/queryId."
                );
              const a = { onComplete: s, hashFn: r, query: n, tag: i };
              this.listens.get(b).set(o, a),
                this.connected_ && this.sendListen_(a);
            }
            sendGet_(n) {
              const r = this.outstandingGets_[n];
              this.sendRequest("g", r.request, (i) => {
                delete this.outstandingGets_[n],
                  this.outstandingGetCount_--,
                  0 === this.outstandingGetCount_ &&
                    (this.outstandingGets_ = []),
                  r.onComplete && r.onComplete(i);
              });
            }
            sendListen_(n) {
              const r = n.query,
                i = r._path.toString(),
                s = r._queryIdentifier;
              this.log_("Listen on " + i + " for " + s);
              const o = { p: i };
              n.tag && ((o.q = r._queryObject), (o.t = n.tag)),
                (o.h = n.hashFn()),
                this.sendRequest("q", o, (a) => {
                  const l = a.d,
                    u = a.s;
                  t.warnOnListenWarnings_(l, r),
                    (this.listens.get(i) && this.listens.get(i).get(s)) === n &&
                      (this.log_("listen response", a),
                      "ok" !== u && this.removeListen_(i, s),
                      n.onComplete && n.onComplete(u, l));
                });
            }
            static warnOnListenWarnings_(n, r) {
              if (n && "object" == typeof n && ln(n, "w")) {
                const i = si(n, "w");
                if (Array.isArray(i) && ~i.indexOf("no_index")) {
                  const s =
                      '".indexOn": "' +
                      r._queryParams.getIndex().toString() +
                      '"',
                    o = r._path.toString();
                  Fe(
                    `Using an unspecified index. Your data will be downloaded and filtered on the client. Consider adding ${s} at ${o} to your security rules for better performance.`
                  );
                }
              }
            }
            refreshAuthToken(n) {
              (this.authToken_ = n),
                this.log_("Auth token refreshed"),
                this.authToken_
                  ? this.tryAuth()
                  : this.connected_ && this.sendRequest("unauth", {}, () => {}),
                this.reduceReconnectDelayIfAdminCredential_(n);
            }
            reduceReconnectDelayIfAdminCredential_(n) {
              ((n && 40 === n.length) ||
                (function (t) {
                  const e = Eb(t).claims;
                  return "object" == typeof e && !0 === e.admin;
                })(n)) &&
                (this.log_(
                  "Admin auth credential detected.  Reducing max reconnect time."
                ),
                (this.maxReconnectDelay_ = 3e4));
            }
            refreshAppCheckToken(n) {
              (this.appCheckToken_ = n),
                this.log_("App check token refreshed"),
                this.appCheckToken_
                  ? this.tryAppCheck()
                  : this.connected_ &&
                    this.sendRequest("unappeck", {}, () => {});
            }
            tryAuth() {
              if (this.connected_ && this.authToken_) {
                const n = this.authToken_,
                  r = (function (t) {
                    const n = Eb(t).claims;
                    return (
                      !!n && "object" == typeof n && n.hasOwnProperty("iat")
                    );
                  })(n)
                    ? "auth"
                    : "gauth",
                  i = { cred: n };
                null === this.authOverride_
                  ? (i.noauth = !0)
                  : "object" == typeof this.authOverride_ &&
                    (i.authvar = this.authOverride_),
                  this.sendRequest(r, i, (s) => {
                    const o = s.s,
                      b = s.d || "error";
                    this.authToken_ === n &&
                      ("ok" === o
                        ? (this.invalidAuthTokenCount_ = 0)
                        : this.onAuthRevoked_(o, b));
                  });
              }
            }
            tryAppCheck() {
              this.connected_ &&
                this.appCheckToken_ &&
                this.sendRequest(
                  "appcheck",
                  { token: this.appCheckToken_ },
                  (n) => {
                    const r = n.s,
                      i = n.d || "error";
                    "ok" === r
                      ? (this.invalidAppCheckTokenCount_ = 0)
                      : this.onAppCheckRevoked_(r, i);
                  }
                );
            }
            unlisten(n, r) {
              const i = n._path.toString(),
                s = n._queryIdentifier;
              this.log_("Unlisten called for " + i + " " + s),
                v(
                  n._queryParams.isDefault() || !n._queryParams.loadsAllData(),
                  "unlisten() called for non-default but complete query"
                ),
                this.removeListen_(i, s) &&
                  this.connected_ &&
                  this.sendUnlisten_(i, s, n._queryObject, r);
            }
            sendUnlisten_(n, r, i, s) {
              this.log_("Unlisten on " + n + " for " + r);
              const o = { p: n };
              s && ((o.q = i), (o.t = s)), this.sendRequest("n", o);
            }
            onDisconnectPut(n, r, i) {
              this.initConnection_(),
                this.connected_
                  ? this.sendOnDisconnect_("o", n, r, i)
                  : this.onDisconnectRequestQueue_.push({
                      pathString: n,
                      action: "o",
                      data: r,
                      onComplete: i,
                    });
            }
            onDisconnectMerge(n, r, i) {
              this.initConnection_(),
                this.connected_
                  ? this.sendOnDisconnect_("om", n, r, i)
                  : this.onDisconnectRequestQueue_.push({
                      pathString: n,
                      action: "om",
                      data: r,
                      onComplete: i,
                    });
            }
            onDisconnectCancel(n, r) {
              this.initConnection_(),
                this.connected_
                  ? this.sendOnDisconnect_("oc", n, null, r)
                  : this.onDisconnectRequestQueue_.push({
                      pathString: n,
                      action: "oc",
                      data: null,
                      onComplete: r,
                    });
            }
            sendOnDisconnect_(n, r, i, s) {
              const o = { p: r, d: i };
              this.log_("onDisconnect " + n, o),
                this.sendRequest(n, o, (b) => {
                  s &&
                    setTimeout(() => {
                      s(b.s, b.d);
                    }, Math.floor(0));
                });
            }
            put(n, r, i, s) {
              this.putInternal("p", n, r, i, s);
            }
            merge(n, r, i, s) {
              this.putInternal("m", n, r, i, s);
            }
            putInternal(n, r, i, s, o) {
              this.initConnection_();
              const b = { p: r, d: i };
              void 0 !== o && (b.h = o),
                this.outstandingPuts_.push({
                  action: n,
                  request: b,
                  onComplete: s,
                }),
                this.outstandingPutCount_++,
                this.connected_
                  ? this.sendPut_(this.outstandingPuts_.length - 1)
                  : this.log_("Buffering put: " + r);
            }
            sendPut_(n) {
              const r = this.outstandingPuts_[n].action,
                i = this.outstandingPuts_[n].request,
                s = this.outstandingPuts_[n].onComplete;
              (this.outstandingPuts_[n].queued = this.connected_),
                this.sendRequest(r, i, (o) => {
                  this.log_(r + " response", o),
                    delete this.outstandingPuts_[n],
                    this.outstandingPutCount_--,
                    0 === this.outstandingPutCount_ &&
                      (this.outstandingPuts_ = []),
                    s && s(o.s, o.d);
                });
            }
            reportStats(n) {
              if (this.connected_) {
                const r = { c: n };
                this.log_("reportStats", r),
                  this.sendRequest("s", r, (i) => {
                    "ok" !== i.s &&
                      this.log_("reportStats", "Error sending stats: " + i.d);
                  });
              }
            }
            onDataMessage_(n) {
              if ("r" in n) {
                this.log_("from server: " + Ie(n));
                const r = n.r,
                  i = this.requestCBHash_[r];
                i && (delete this.requestCBHash_[r], i(n.b));
              } else {
                if ("error" in n)
                  throw "A server-side error has occurred: " + n.error;
                "a" in n && this.onDataPush_(n.a, n.b);
              }
            }
            onDataPush_(n, r) {
              this.log_("handleServerMessage", n, r),
                "d" === n
                  ? this.onDataUpdate_(r.p, r.d, !1, r.t)
                  : "m" === n
                  ? this.onDataUpdate_(r.p, r.d, !0, r.t)
                  : "c" === n
                  ? this.onListenRevoked_(r.p, r.q)
                  : "ac" === n
                  ? this.onAuthRevoked_(r.s, r.d)
                  : "apc" === n
                  ? this.onAppCheckRevoked_(r.s, r.d)
                  : "sd" === n
                  ? this.onSecurityDebugPacket_(r)
                  : Lc(
                      "Unrecognized action received from server: " +
                        Ie(n) +
                        "\nAre you using the latest client?"
                    );
            }
            onReady_(n, r) {
              this.log_("connection ready"),
                (this.connected_ = !0),
                (this.lastConnectionEstablishedTime_ = new Date().getTime()),
                this.handleTimestamp_(n),
                (this.lastSessionId = r),
                this.firstConnection_ && this.sendConnectStats_(),
                this.restoreState_(),
                (this.firstConnection_ = !1),
                this.onConnectStatus_(!0);
            }
            scheduleConnect_(n) {
              v(
                !this.realtime_,
                "Scheduling a connect when we're already connected/ing?"
              ),
                this.establishConnectionTimer_ &&
                  clearTimeout(this.establishConnectionTimer_),
                (this.establishConnectionTimer_ = setTimeout(() => {
                  (this.establishConnectionTimer_ = null),
                    this.establishConnection_();
                }, Math.floor(n)));
            }
            initConnection_() {
              !this.realtime_ &&
                this.firstConnection_ &&
                this.scheduleConnect_(0);
            }
            onVisible_(n) {
              n &&
                !this.visible_ &&
                this.reconnectDelay_ === this.maxReconnectDelay_ &&
                (this.log_("Window became visible.  Reducing delay."),
                (this.reconnectDelay_ = Ns),
                this.realtime_ || this.scheduleConnect_(0)),
                (this.visible_ = n);
            }
            onOnline_(n) {
              n
                ? (this.log_("Browser went online."),
                  (this.reconnectDelay_ = Ns),
                  this.realtime_ || this.scheduleConnect_(0))
                : (this.log_("Browser went offline.  Killing connection."),
                  this.realtime_ && this.realtime_.close());
            }
            onRealtimeDisconnect_() {
              if (
                (this.log_("data client disconnected"),
                (this.connected_ = !1),
                (this.realtime_ = null),
                this.cancelSentTransactions_(),
                (this.requestCBHash_ = {}),
                this.shouldReconnect_())
              ) {
                this.visible_
                  ? this.lastConnectionEstablishedTime_ &&
                    (new Date().getTime() -
                      this.lastConnectionEstablishedTime_ >
                      3e4 && (this.reconnectDelay_ = Ns),
                    (this.lastConnectionEstablishedTime_ = null))
                  : (this.log_("Window isn't visible.  Delaying reconnect."),
                    (this.reconnectDelay_ = this.maxReconnectDelay_),
                    (this.lastConnectionAttemptTime_ = new Date().getTime()));
                const n =
                  new Date().getTime() - this.lastConnectionAttemptTime_;
                let r = Math.max(0, this.reconnectDelay_ - n);
                (r = Math.random() * r),
                  this.log_("Trying to reconnect in " + r + "ms"),
                  this.scheduleConnect_(r),
                  (this.reconnectDelay_ = Math.min(
                    this.maxReconnectDelay_,
                    1.3 * this.reconnectDelay_
                  ));
              }
              this.onConnectStatus_(!1);
            }
            establishConnection_() {
              var n = this;
              return At(function* () {
                if (n.shouldReconnect_()) {
                  n.log_("Making a connection attempt"),
                    (n.lastConnectionAttemptTime_ = new Date().getTime()),
                    (n.lastConnectionEstablishedTime_ = null);
                  const r = n.onDataMessage_.bind(n),
                    i = n.onReady_.bind(n),
                    s = n.onRealtimeDisconnect_.bind(n),
                    o = n.id + ":" + t.nextConnectionId_++,
                    b = n.lastSessionId;
                  let a = !1,
                    l = null;
                  const u = function () {
                    l ? l.close() : ((a = !0), s());
                  };
                  n.realtime_ = {
                    close: u,
                    sendRequest: function (d) {
                      v(
                        l,
                        "sendRequest call when we're not connected not allowed."
                      ),
                        l.sendRequest(d);
                    },
                  };
                  const g = n.forceTokenRefresh_;
                  n.forceTokenRefresh_ = !1;
                  try {
                    const [d, y] = yield Promise.all([
                      n.authTokenProvider_.getToken(g),
                      n.appCheckTokenProvider_.getToken(g),
                    ]);
                    a
                      ? Te("getToken() completed but was canceled")
                      : (Te("getToken() completed. Creating connection."),
                        (n.authToken_ = d && d.accessToken),
                        (n.appCheckToken_ = y && y.token),
                        (l = new Yv(
                          o,
                          n.repoInfo_,
                          n.applicationId_,
                          n.appCheckToken_,
                          n.authToken_,
                          r,
                          i,
                          s,
                          (f) => {
                            Fe(f + " (" + n.repoInfo_.toString() + ")"),
                              n.interrupt("server_kill");
                          },
                          b
                        )));
                  } catch (d) {
                    n.log_("Failed to get token: " + d),
                      a || (n.repoInfo_.nodeAdmin && Fe(d), u());
                  }
                }
              })();
            }
            interrupt(n) {
              Te("Interrupting connection for reason: " + n),
                (this.interruptReasons_[n] = !0),
                this.realtime_
                  ? this.realtime_.close()
                  : (this.establishConnectionTimer_ &&
                      (clearTimeout(this.establishConnectionTimer_),
                      (this.establishConnectionTimer_ = null)),
                    this.connected_ && this.onRealtimeDisconnect_());
            }
            resume(n) {
              Te("Resuming connection for reason: " + n),
                delete this.interruptReasons_[n],
                X_(this.interruptReasons_) &&
                  ((this.reconnectDelay_ = Ns),
                  this.realtime_ || this.scheduleConnect_(0));
            }
            handleTimestamp_(n) {
              const r = n - new Date().getTime();
              this.onServerInfoUpdate_({ serverTimeOffset: r });
            }
            cancelSentTransactions_() {
              for (let n = 0; n < this.outstandingPuts_.length; n++) {
                const r = this.outstandingPuts_[n];
                r &&
                  "h" in r.request &&
                  r.queued &&
                  (r.onComplete && r.onComplete("disconnect"),
                  delete this.outstandingPuts_[n],
                  this.outstandingPutCount_--);
              }
              0 === this.outstandingPutCount_ && (this.outstandingPuts_ = []);
            }
            onListenRevoked_(n, r) {
              let i;
              i = r ? r.map((o) => Bc(o)).join("$") : "default";
              const s = this.removeListen_(n, i);
              s && s.onComplete && s.onComplete("permission_denied");
            }
            removeListen_(n, r) {
              const i = new z(n).toString();
              let s;
              if (this.listens.has(i)) {
                const o = this.listens.get(i);
                (s = o.get(r)),
                  o.delete(r),
                  0 === o.size && this.listens.delete(i);
              } else s = void 0;
              return s;
            }
            onAuthRevoked_(n, r) {
              Te("Auth token revoked: " + n + "/" + r),
                (this.authToken_ = null),
                (this.forceTokenRefresh_ = !0),
                this.realtime_.close(),
                ("invalid_token" === n || "permission_denied" === n) &&
                  (this.invalidAuthTokenCount_++,
                  this.invalidAuthTokenCount_ >= 3 &&
                    ((this.reconnectDelay_ = 3e4),
                    this.authTokenProvider_.notifyForInvalidToken()));
            }
            onAppCheckRevoked_(n, r) {
              Te("App check token revoked: " + n + "/" + r),
                (this.appCheckToken_ = null),
                (this.forceTokenRefresh_ = !0),
                ("invalid_token" === n || "permission_denied" === n) &&
                  (this.invalidAppCheckTokenCount_++,
                  this.invalidAppCheckTokenCount_ >= 3 &&
                    this.appCheckTokenProvider_.notifyForInvalidToken());
            }
            onSecurityDebugPacket_(n) {
              this.securityDebugCallback_
                ? this.securityDebugCallback_(n)
                : "msg" in n &&
                  console.log(
                    "FIREBASE: " + n.msg.replace("\n", "\nFIREBASE: ")
                  );
            }
            restoreState_() {
              this.tryAuth(), this.tryAppCheck();
              for (const n of this.listens.values())
                for (const r of n.values()) this.sendListen_(r);
              for (let n = 0; n < this.outstandingPuts_.length; n++)
                this.outstandingPuts_[n] && this.sendPut_(n);
              for (; this.onDisconnectRequestQueue_.length; ) {
                const n = this.onDisconnectRequestQueue_.shift();
                this.sendOnDisconnect_(
                  n.action,
                  n.pathString,
                  n.data,
                  n.onComplete
                );
              }
              for (let n = 0; n < this.outstandingGets_.length; n++)
                this.outstandingGets_[n] && this.sendGet_(n);
            }
            sendConnectStats_() {
              const n = {};
              let r = "js";
              (n["sdk." + r + "." + Fc.replace(/\./g, "-")] = 1),
                Z_()
                  ? (n["framework.cordova"] = 1)
                  : (function tR() {
                      return (
                        "object" == typeof navigator &&
                        "ReactNative" === navigator.product
                      );
                    })() && (n["framework.reactnative"] = 1),
                this.reportStats(n);
            }
            shouldReconnect_() {
              const n = Rb.getInstance().currentlyOnline();
              return X_(this.interruptReasons_) && n;
            }
          }
          return (
            (t.nextPersistentConnectionId_ = 0), (t.nextConnectionId_ = 0), t
          );
        })();
      class V {
        constructor(e, n) {
          (this.name = e), (this.node = n);
        }
        static Wrap(e, n) {
          return new V(e, n);
        }
      }
      class kb {
        getCompare() {
          return this.compare.bind(this);
        }
        indexedValueChanged(e, n) {
          const r = new V(An, e),
            i = new V(An, n);
          return 0 !== this.compare(r, i);
        }
        minPost() {
          return V.MIN;
        }
      }
      class iD extends kb {
        static get __EMPTY_NODE() {
          return Fb;
        }
        static set __EMPTY_NODE(e) {
          Fb = e;
        }
        compare(e, n) {
          return rr(e.name, n.name);
        }
        isDefinedOn(e) {
          throw ii("KeyIndex.isDefinedOn not expected to be called.");
        }
        indexedValueChanged(e, n) {
          return !1;
        }
        minPost() {
          return V.MIN;
        }
        maxPost() {
          return new V(cn, Fb);
        }
        makePost(e, n) {
          return (
            v(
              "string" == typeof e,
              "KeyIndex indexValue must always be a string."
            ),
            new V(e, Fb)
          );
        }
        toString() {
          return ".key";
        }
      }
      const Qt = new iD();
      class Ob {
        constructor(e, n, r, i, s = null) {
          (this.isReverse_ = i),
            (this.resultGenerator_ = s),
            (this.nodeStack_ = []);
          let o = 1;
          for (; !e.isEmpty(); )
            if (((o = n ? r(e.key, n) : 1), i && (o *= -1), o < 0))
              e = this.isReverse_ ? e.left : e.right;
            else {
              if (0 === o) {
                this.nodeStack_.push(e);
                break;
              }
              this.nodeStack_.push(e), (e = this.isReverse_ ? e.right : e.left);
            }
        }
        getNext() {
          if (0 === this.nodeStack_.length) return null;
          let n,
            e = this.nodeStack_.pop();
          if (
            ((n = this.resultGenerator_
              ? this.resultGenerator_(e.key, e.value)
              : { key: e.key, value: e.value }),
            this.isReverse_)
          )
            for (e = e.left; !e.isEmpty(); )
              this.nodeStack_.push(e), (e = e.right);
          else
            for (e = e.right; !e.isEmpty(); )
              this.nodeStack_.push(e), (e = e.left);
          return n;
        }
        hasNext() {
          return this.nodeStack_.length > 0;
        }
        peek() {
          if (0 === this.nodeStack_.length) return null;
          const e = this.nodeStack_[this.nodeStack_.length - 1];
          return this.resultGenerator_
            ? this.resultGenerator_(e.key, e.value)
            : { key: e.key, value: e.value };
        }
      }
      let Kc,
        xt = (() => {
          class t {
            constructor(n, r, i, s, o) {
              (this.key = n),
                (this.value = r),
                (this.color = null != i ? i : t.RED),
                (this.left = null != s ? s : Ye.EMPTY_NODE),
                (this.right = null != o ? o : Ye.EMPTY_NODE);
            }
            copy(n, r, i, s, o) {
              return new t(
                null != n ? n : this.key,
                null != r ? r : this.value,
                null != i ? i : this.color,
                null != s ? s : this.left,
                null != o ? o : this.right
              );
            }
            count() {
              return this.left.count() + 1 + this.right.count();
            }
            isEmpty() {
              return !1;
            }
            inorderTraversal(n) {
              return (
                this.left.inorderTraversal(n) ||
                !!n(this.key, this.value) ||
                this.right.inorderTraversal(n)
              );
            }
            reverseTraversal(n) {
              return (
                this.right.reverseTraversal(n) ||
                n(this.key, this.value) ||
                this.left.reverseTraversal(n)
              );
            }
            min_() {
              return this.left.isEmpty() ? this : this.left.min_();
            }
            minKey() {
              return this.min_().key;
            }
            maxKey() {
              return this.right.isEmpty() ? this.key : this.right.maxKey();
            }
            insert(n, r, i) {
              let s = this;
              const o = i(n, s.key);
              return (
                (s =
                  o < 0
                    ? s.copy(null, null, null, s.left.insert(n, r, i), null)
                    : 0 === o
                    ? s.copy(null, r, null, null, null)
                    : s.copy(null, null, null, null, s.right.insert(n, r, i))),
                s.fixUp_()
              );
            }
            removeMin_() {
              if (this.left.isEmpty()) return Ye.EMPTY_NODE;
              let n = this;
              return (
                !n.left.isRed_() &&
                  !n.left.left.isRed_() &&
                  (n = n.moveRedLeft_()),
                (n = n.copy(null, null, null, n.left.removeMin_(), null)),
                n.fixUp_()
              );
            }
            remove(n, r) {
              let i, s;
              if (((i = this), r(n, i.key) < 0))
                !i.left.isEmpty() &&
                  !i.left.isRed_() &&
                  !i.left.left.isRed_() &&
                  (i = i.moveRedLeft_()),
                  (i = i.copy(null, null, null, i.left.remove(n, r), null));
              else {
                if (
                  (i.left.isRed_() && (i = i.rotateRight_()),
                  !i.right.isEmpty() &&
                    !i.right.isRed_() &&
                    !i.right.left.isRed_() &&
                    (i = i.moveRedRight_()),
                  0 === r(n, i.key))
                ) {
                  if (i.right.isEmpty()) return Ye.EMPTY_NODE;
                  (s = i.right.min_()),
                    (i = i.copy(
                      s.key,
                      s.value,
                      null,
                      null,
                      i.right.removeMin_()
                    ));
                }
                i = i.copy(null, null, null, null, i.right.remove(n, r));
              }
              return i.fixUp_();
            }
            isRed_() {
              return this.color;
            }
            fixUp_() {
              let n = this;
              return (
                n.right.isRed_() && !n.left.isRed_() && (n = n.rotateLeft_()),
                n.left.isRed_() &&
                  n.left.left.isRed_() &&
                  (n = n.rotateRight_()),
                n.left.isRed_() && n.right.isRed_() && (n = n.colorFlip_()),
                n
              );
            }
            moveRedLeft_() {
              let n = this.colorFlip_();
              return (
                n.right.left.isRed_() &&
                  ((n = n.copy(null, null, null, null, n.right.rotateRight_())),
                  (n = n.rotateLeft_()),
                  (n = n.colorFlip_())),
                n
              );
            }
            moveRedRight_() {
              let n = this.colorFlip_();
              return (
                n.left.left.isRed_() &&
                  ((n = n.rotateRight_()), (n = n.colorFlip_())),
                n
              );
            }
            rotateLeft_() {
              const n = this.copy(null, null, t.RED, null, this.right.left);
              return this.right.copy(null, null, this.color, n, null);
            }
            rotateRight_() {
              const n = this.copy(null, null, t.RED, this.left.right, null);
              return this.left.copy(null, null, this.color, null, n);
            }
            colorFlip_() {
              const n = this.left.copy(
                  null,
                  null,
                  !this.left.color,
                  null,
                  null
                ),
                r = this.right.copy(null, null, !this.right.color, null, null);
              return this.copy(null, null, !this.color, n, r);
            }
            checkMaxDepth_() {
              const n = this.check_();
              return Math.pow(2, n) <= this.count() + 1;
            }
            check_() {
              if (this.isRed_() && this.left.isRed_())
                throw new Error(
                  "Red node has red child(" + this.key + "," + this.value + ")"
                );
              if (this.right.isRed_())
                throw new Error(
                  "Right child of (" + this.key + "," + this.value + ") is red"
                );
              const n = this.left.check_();
              if (n !== this.right.check_())
                throw new Error("Black depths differ");
              return n + (this.isRed_() ? 0 : 1);
            }
          }
          return (t.RED = !0), (t.BLACK = !1), t;
        })();
      class Ye {
        constructor(e, n = Ye.EMPTY_NODE) {
          (this.comparator_ = e), (this.root_ = n);
        }
        insert(e, n) {
          return new Ye(
            this.comparator_,
            this.root_
              .insert(e, n, this.comparator_)
              .copy(null, null, xt.BLACK, null, null)
          );
        }
        remove(e) {
          return new Ye(
            this.comparator_,
            this.root_
              .remove(e, this.comparator_)
              .copy(null, null, xt.BLACK, null, null)
          );
        }
        get(e) {
          let n,
            r = this.root_;
          for (; !r.isEmpty(); ) {
            if (((n = this.comparator_(e, r.key)), 0 === n)) return r.value;
            n < 0 ? (r = r.left) : n > 0 && (r = r.right);
          }
          return null;
        }
        getPredecessorKey(e) {
          let n,
            r = this.root_,
            i = null;
          for (; !r.isEmpty(); ) {
            if (((n = this.comparator_(e, r.key)), 0 === n)) {
              if (r.left.isEmpty()) return i ? i.key : null;
              for (r = r.left; !r.right.isEmpty(); ) r = r.right;
              return r.key;
            }
            n < 0 ? (r = r.left) : n > 0 && ((i = r), (r = r.right));
          }
          throw new Error(
            "Attempted to find predecessor key for a nonexistent key.  What gives?"
          );
        }
        isEmpty() {
          return this.root_.isEmpty();
        }
        count() {
          return this.root_.count();
        }
        minKey() {
          return this.root_.minKey();
        }
        maxKey() {
          return this.root_.maxKey();
        }
        inorderTraversal(e) {
          return this.root_.inorderTraversal(e);
        }
        reverseTraversal(e) {
          return this.root_.reverseTraversal(e);
        }
        getIterator(e) {
          return new Ob(this.root_, null, this.comparator_, !1, e);
        }
        getIteratorFrom(e, n) {
          return new Ob(this.root_, e, this.comparator_, !1, n);
        }
        getReverseIteratorFrom(e, n) {
          return new Ob(this.root_, e, this.comparator_, !0, n);
        }
        getReverseIterator(e) {
          return new Ob(this.root_, null, this.comparator_, !0, e);
        }
      }
      function vF(t, e) {
        return rr(t.name, e.name);
      }
      function Yc(t, e) {
        return rr(t, e);
      }
      Ye.EMPTY_NODE = new (class _F {
        copy(e, n, r, i, s) {
          return this;
        }
        insert(e, n, r) {
          return new xt(e, n, null);
        }
        remove(e, n) {
          return this;
        }
        count() {
          return 0;
        }
        isEmpty() {
          return !0;
        }
        inorderTraversal(e) {
          return !1;
        }
        reverseTraversal(e) {
          return !1;
        }
        minKey() {
          return null;
        }
        maxKey() {
          return null;
        }
        check_() {
          return 0;
        }
        isRed_() {
          return !1;
        }
      })();
      const sD = function (t) {
          return "number" == typeof t ? "number:" + Ev(t) : "string:" + t;
        },
        oD = function (t) {
          if (t.isLeafNode()) {
            const e = t.val();
            v(
              "string" == typeof e ||
                "number" == typeof e ||
                ("object" == typeof e && ln(e, ".sv")),
              "Priority must be a string or number."
            );
          } else v(t === Kc || t.isEmpty(), "priority of unexpected type.");
          v(
            t === Kc || t.getPriority().isEmpty(),
            "Priority nodes can't have a priority of their own."
          );
        };
      let bD,
        aD,
        lD,
        ci = (() => {
          class t {
            constructor(n, r = t.__childrenNodeConstructor.EMPTY_NODE) {
              (this.value_ = n),
                (this.priorityNode_ = r),
                (this.lazyHash_ = null),
                v(
                  null != this.value_,
                  "LeafNode shouldn't be created with null/undefined value."
                ),
                oD(this.priorityNode_);
            }
            static set __childrenNodeConstructor(n) {
              bD = n;
            }
            static get __childrenNodeConstructor() {
              return bD;
            }
            isLeafNode() {
              return !0;
            }
            getPriority() {
              return this.priorityNode_;
            }
            updatePriority(n) {
              return new t(this.value_, n);
            }
            getImmediateChild(n) {
              return ".priority" === n
                ? this.priorityNode_
                : t.__childrenNodeConstructor.EMPTY_NODE;
            }
            getChild(n) {
              return O(n)
                ? this
                : ".priority" === F(n)
                ? this.priorityNode_
                : t.__childrenNodeConstructor.EMPTY_NODE;
            }
            hasChild() {
              return !1;
            }
            getPredecessorChildName(n, r) {
              return null;
            }
            updateImmediateChild(n, r) {
              return ".priority" === n
                ? this.updatePriority(r)
                : r.isEmpty() && ".priority" !== n
                ? this
                : t.__childrenNodeConstructor.EMPTY_NODE.updateImmediateChild(
                    n,
                    r
                  ).updatePriority(this.priorityNode_);
            }
            updateChild(n, r) {
              const i = F(n);
              return null === i
                ? r
                : r.isEmpty() && ".priority" !== i
                ? this
                : (v(
                    ".priority" !== i || 1 === Nn(n),
                    ".priority must be the last token in a path"
                  ),
                  this.updateImmediateChild(
                    i,
                    t.__childrenNodeConstructor.EMPTY_NODE.updateChild(te(n), r)
                  ));
            }
            isEmpty() {
              return !1;
            }
            numChildren() {
              return 0;
            }
            forEachChild(n, r) {
              return !1;
            }
            val(n) {
              return n && !this.getPriority().isEmpty()
                ? {
                    ".value": this.getValue(),
                    ".priority": this.getPriority().val(),
                  }
                : this.getValue();
            }
            hash() {
              if (null === this.lazyHash_) {
                let n = "";
                this.priorityNode_.isEmpty() ||
                  (n += "priority:" + sD(this.priorityNode_.val()) + ":");
                const r = typeof this.value_;
                (n += r + ":"),
                  (n += "number" === r ? Ev(this.value_) : this.value_),
                  (this.lazyHash_ = vv(n));
              }
              return this.lazyHash_;
            }
            getValue() {
              return this.value_;
            }
            compareTo(n) {
              return n === t.__childrenNodeConstructor.EMPTY_NODE
                ? 1
                : n instanceof t.__childrenNodeConstructor
                ? -1
                : (v(n.isLeafNode(), "Unknown node type"),
                  this.compareToLeafNode_(n));
            }
            compareToLeafNode_(n) {
              const r = typeof n.value_,
                i = typeof this.value_,
                s = t.VALUE_TYPE_ORDER.indexOf(r),
                o = t.VALUE_TYPE_ORDER.indexOf(i);
              return (
                v(s >= 0, "Unknown leaf type: " + r),
                v(o >= 0, "Unknown leaf type: " + i),
                s === o
                  ? "object" === i
                    ? 0
                    : this.value_ < n.value_
                    ? -1
                    : this.value_ === n.value_
                    ? 0
                    : 1
                  : o - s
              );
            }
            withIndex() {
              return this;
            }
            isIndexed() {
              return !0;
            }
            equals(n) {
              if (n === this) return !0;
              if (n.isLeafNode()) {
                const r = n;
                return (
                  this.value_ === r.value_ &&
                  this.priorityNode_.equals(r.priorityNode_)
                );
              }
              return !1;
            }
          }
          return (
            (t.VALUE_TYPE_ORDER = ["object", "boolean", "number", "string"]), t
          );
        })();
      const ie = new (class EF extends kb {
          compare(e, n) {
            const r = e.node.getPriority(),
              i = n.node.getPriority(),
              s = r.compareTo(i);
            return 0 === s ? rr(e.name, n.name) : s;
          }
          isDefinedOn(e) {
            return !e.getPriority().isEmpty();
          }
          indexedValueChanged(e, n) {
            return !e.getPriority().equals(n.getPriority());
          }
          minPost() {
            return V.MIN;
          }
          maxPost() {
            return new V(cn, new ci("[PRIORITY-POST]", lD));
          }
          makePost(e, n) {
            const r = aD(e);
            return new V(n, new ci("[PRIORITY-POST]", r));
          }
          toString() {
            return ".priority";
          }
        })(),
        IF = Math.log(2);
      class TF {
        constructor(e) {
          (this.count = parseInt(Math.log(e + 1) / IF, 10)),
            (this.current_ = this.count - 1);
          const i = ((s) => parseInt(Array(this.count + 1).join("1"), 2))();
          this.bits_ = (e + 1) & i;
        }
        nextBitIsOne() {
          const e = !(this.bits_ & (1 << this.current_));
          return this.current_--, e;
        }
      }
      const Lb = function (t, e, n, r) {
        t.sort(e);
        const i = function (a, l) {
            const u = l - a;
            let c, g;
            if (0 === u) return null;
            if (1 === u)
              return (
                (c = t[a]),
                (g = n ? n(c) : c),
                new xt(g, c.node, xt.BLACK, null, null)
              );
            {
              const d = parseInt(u / 2, 10) + a,
                y = i(a, d),
                f = i(d + 1, l);
              return (
                (c = t[d]),
                (g = n ? n(c) : c),
                new xt(g, c.node, xt.BLACK, y, f)
              );
            }
          },
          b = (function (a) {
            let l = null,
              u = null,
              c = t.length;
            const g = function (y, f) {
                const p = c - y,
                  _ = c;
                c -= y;
                const h = i(p + 1, _),
                  C = t[p],
                  N = n ? n(C) : C;
                d(new xt(N, C.node, f, null, h));
              },
              d = function (y) {
                l ? ((l.left = y), (l = y)) : ((u = y), (l = y));
              };
            for (let y = 0; y < a.count; ++y) {
              const f = a.nextBitIsOne(),
                p = Math.pow(2, a.count - (y + 1));
              f ? g(p, xt.BLACK) : (g(p, xt.BLACK), g(p, xt.RED));
            }
            return u;
          })(new TF(t.length));
        return new Ye(r || e, b);
      };
      let Zc;
      const gi = {};
      class gn {
        constructor(e, n) {
          (this.indexes_ = e), (this.indexSet_ = n);
        }
        static get Default() {
          return (
            v(gi && ie, "ChildrenNode.ts has not been loaded"),
            (Zc = Zc || new gn({ ".priority": gi }, { ".priority": ie })),
            Zc
          );
        }
        get(e) {
          const n = si(this.indexes_, e);
          if (!n) throw new Error("No index defined for " + e);
          return n instanceof Ye ? n : null;
        }
        hasIndex(e) {
          return ln(this.indexSet_, e.toString());
        }
        addIndex(e, n) {
          v(
            e !== Qt,
            "KeyIndex always exists and isn't meant to be added to the IndexMap."
          );
          const r = [];
          let i = !1;
          const s = n.getIterator(V.Wrap);
          let b,
            o = s.getNext();
          for (; o; )
            (i = i || e.isDefinedOn(o.node)), r.push(o), (o = s.getNext());
          b = i ? Lb(r, e.getCompare()) : gi;
          const a = e.toString(),
            l = Object.assign({}, this.indexSet_);
          l[a] = e;
          const u = Object.assign({}, this.indexes_);
          return (u[a] = b), new gn(u, l);
        }
        addToIndexes(e, n) {
          const r = Ib(this.indexes_, (i, s) => {
            const o = si(this.indexSet_, s);
            if ((v(o, "Missing index implementation for " + s), i === gi)) {
              if (o.isDefinedOn(e.node)) {
                const b = [],
                  a = n.getIterator(V.Wrap);
                let l = a.getNext();
                for (; l; ) l.name !== e.name && b.push(l), (l = a.getNext());
                return b.push(e), Lb(b, o.getCompare());
              }
              return gi;
            }
            {
              const b = n.get(e.name);
              let a = i;
              return b && (a = a.remove(new V(e.name, b))), a.insert(e, e.node);
            }
          });
          return new gn(r, this.indexSet_);
        }
        removeFromIndexes(e, n) {
          const r = Ib(this.indexes_, (i) => {
            if (i === gi) return i;
            {
              const s = n.get(e.name);
              return s ? i.remove(new V(e.name, s)) : i;
            }
          });
          return new gn(r, this.indexSet_);
        }
      }
      let Ps,
        x = (() => {
          class t {
            constructor(n, r, i) {
              (this.children_ = n),
                (this.priorityNode_ = r),
                (this.indexMap_ = i),
                (this.lazyHash_ = null),
                this.priorityNode_ && oD(this.priorityNode_),
                this.children_.isEmpty() &&
                  v(
                    !this.priorityNode_ || this.priorityNode_.isEmpty(),
                    "An empty node cannot have a priority"
                  );
            }
            static get EMPTY_NODE() {
              return Ps || (Ps = new t(new Ye(Yc), null, gn.Default));
            }
            isLeafNode() {
              return !1;
            }
            getPriority() {
              return this.priorityNode_ || Ps;
            }
            updatePriority(n) {
              return this.children_.isEmpty()
                ? this
                : new t(this.children_, n, this.indexMap_);
            }
            getImmediateChild(n) {
              if (".priority" === n) return this.getPriority();
              {
                const r = this.children_.get(n);
                return null === r ? Ps : r;
              }
            }
            getChild(n) {
              const r = F(n);
              return null === r
                ? this
                : this.getImmediateChild(r).getChild(te(n));
            }
            hasChild(n) {
              return null !== this.children_.get(n);
            }
            updateImmediateChild(n, r) {
              if (
                (v(r, "We should always be passing snapshot nodes"),
                ".priority" === n)
              )
                return this.updatePriority(r);
              {
                const i = new V(n, r);
                let s, o;
                r.isEmpty()
                  ? ((s = this.children_.remove(n)),
                    (o = this.indexMap_.removeFromIndexes(i, this.children_)))
                  : ((s = this.children_.insert(n, r)),
                    (o = this.indexMap_.addToIndexes(i, this.children_)));
                const b = s.isEmpty() ? Ps : this.priorityNode_;
                return new t(s, b, o);
              }
            }
            updateChild(n, r) {
              const i = F(n);
              if (null === i) return r;
              {
                v(
                  ".priority" !== F(n) || 1 === Nn(n),
                  ".priority must be the last token in a path"
                );
                const s = this.getImmediateChild(i).updateChild(te(n), r);
                return this.updateImmediateChild(i, s);
              }
            }
            isEmpty() {
              return this.children_.isEmpty();
            }
            numChildren() {
              return this.children_.count();
            }
            val(n) {
              if (this.isEmpty()) return null;
              const r = {};
              let i = 0,
                s = 0,
                o = !0;
              if (
                (this.forEachChild(ie, (b, a) => {
                  (r[b] = a.val(n)),
                    i++,
                    o && t.INTEGER_REGEXP_.test(b)
                      ? (s = Math.max(s, Number(b)))
                      : (o = !1);
                }),
                !n && o && s < 2 * i)
              ) {
                const b = [];
                for (const a in r) b[a] = r[a];
                return b;
              }
              return (
                n &&
                  !this.getPriority().isEmpty() &&
                  (r[".priority"] = this.getPriority().val()),
                r
              );
            }
            hash() {
              if (null === this.lazyHash_) {
                let n = "";
                this.getPriority().isEmpty() ||
                  (n += "priority:" + sD(this.getPriority().val()) + ":"),
                  this.forEachChild(ie, (r, i) => {
                    const s = i.hash();
                    "" !== s && (n += ":" + r + ":" + s);
                  }),
                  (this.lazyHash_ = "" === n ? "" : vv(n));
              }
              return this.lazyHash_;
            }
            getPredecessorChildName(n, r, i) {
              const s = this.resolveIndex_(i);
              if (s) {
                const o = s.getPredecessorKey(new V(n, r));
                return o ? o.name : null;
              }
              return this.children_.getPredecessorKey(n);
            }
            getFirstChildName(n) {
              const r = this.resolveIndex_(n);
              if (r) {
                const i = r.minKey();
                return i && i.name;
              }
              return this.children_.minKey();
            }
            getFirstChild(n) {
              const r = this.getFirstChildName(n);
              return r ? new V(r, this.children_.get(r)) : null;
            }
            getLastChildName(n) {
              const r = this.resolveIndex_(n);
              if (r) {
                const i = r.maxKey();
                return i && i.name;
              }
              return this.children_.maxKey();
            }
            getLastChild(n) {
              const r = this.getLastChildName(n);
              return r ? new V(r, this.children_.get(r)) : null;
            }
            forEachChild(n, r) {
              const i = this.resolveIndex_(n);
              return i
                ? i.inorderTraversal((s) => r(s.name, s.node))
                : this.children_.inorderTraversal(r);
            }
            getIterator(n) {
              return this.getIteratorFrom(n.minPost(), n);
            }
            getIteratorFrom(n, r) {
              const i = this.resolveIndex_(r);
              if (i) return i.getIteratorFrom(n, (s) => s);
              {
                const s = this.children_.getIteratorFrom(n.name, V.Wrap);
                let o = s.peek();
                for (; null != o && r.compare(o, n) < 0; )
                  s.getNext(), (o = s.peek());
                return s;
              }
            }
            getReverseIterator(n) {
              return this.getReverseIteratorFrom(n.maxPost(), n);
            }
            getReverseIteratorFrom(n, r) {
              const i = this.resolveIndex_(r);
              if (i) return i.getReverseIteratorFrom(n, (s) => s);
              {
                const s = this.children_.getReverseIteratorFrom(n.name, V.Wrap);
                let o = s.peek();
                for (; null != o && r.compare(o, n) > 0; )
                  s.getNext(), (o = s.peek());
                return s;
              }
            }
            compareTo(n) {
              return this.isEmpty()
                ? n.isEmpty()
                  ? 0
                  : -1
                : n.isLeafNode() || n.isEmpty()
                ? 1
                : n === Rs
                ? -1
                : 0;
            }
            withIndex(n) {
              if (n === Qt || this.indexMap_.hasIndex(n)) return this;
              {
                const r = this.indexMap_.addIndex(n, this.children_);
                return new t(this.children_, this.priorityNode_, r);
              }
            }
            isIndexed(n) {
              return n === Qt || this.indexMap_.hasIndex(n);
            }
            equals(n) {
              if (n === this) return !0;
              if (n.isLeafNode()) return !1;
              {
                const r = n;
                if (this.getPriority().equals(r.getPriority())) {
                  if (this.children_.count() === r.children_.count()) {
                    const i = this.getIterator(ie),
                      s = r.getIterator(ie);
                    let o = i.getNext(),
                      b = s.getNext();
                    for (; o && b; ) {
                      if (o.name !== b.name || !o.node.equals(b.node))
                        return !1;
                      (o = i.getNext()), (b = s.getNext());
                    }
                    return null === o && null === b;
                  }
                  return !1;
                }
                return !1;
              }
            }
            resolveIndex_(n) {
              return n === Qt ? null : this.indexMap_.get(n.toString());
            }
          }
          return (t.INTEGER_REGEXP_ = /^(0|[1-9]\d*)$/), t;
        })();
      const Rs = new (class SF extends x {
        constructor() {
          super(new Ye(Yc), x.EMPTY_NODE, gn.Default);
        }
        compareTo(e) {
          return e === this ? 0 : 1;
        }
        equals(e) {
          return e === this;
        }
        getPriority() {
          return this;
        }
        getImmediateChild(e) {
          return x.EMPTY_NODE;
        }
        isEmpty() {
          return !1;
        }
      })();
      function ue(t, e = null) {
        if (null === t) return x.EMPTY_NODE;
        if (
          ("object" == typeof t && ".priority" in t && (e = t[".priority"]),
          v(
            null === e ||
              "string" == typeof e ||
              "number" == typeof e ||
              ("object" == typeof e && ".sv" in e),
            "Invalid priority type found: " + typeof e
          ),
          "object" == typeof t &&
            ".value" in t &&
            null !== t[".value"] &&
            (t = t[".value"]),
          "object" != typeof t || ".sv" in t)
        )
          return new ci(t, ue(e));
        if (t instanceof Array) {
          let n = x.EMPTY_NODE;
          return (
            Se(t, (r, i) => {
              if (ln(t, r) && "." !== r.substring(0, 1)) {
                const s = ue(i);
                (s.isLeafNode() || !s.isEmpty()) &&
                  (n = n.updateImmediateChild(r, s));
              }
            }),
            n.updatePriority(ue(e))
          );
        }
        {
          const n = [];
          let r = !1;
          if (
            (Se(t, (o, b) => {
              if ("." !== o.substring(0, 1)) {
                const a = ue(b);
                a.isEmpty() ||
                  ((r = r || !a.getPriority().isEmpty()), n.push(new V(o, a)));
              }
            }),
            0 === n.length)
          )
            return x.EMPTY_NODE;
          const s = Lb(n, vF, (o) => o.name, Yc);
          if (r) {
            const o = Lb(n, ie.getCompare());
            return new x(
              s,
              ue(e),
              new gn({ ".priority": o }, { ".priority": ie })
            );
          }
          return new x(s, ue(e), gn.Default);
        }
      }
      Object.defineProperties(V, {
        MIN: { value: new V(An, x.EMPTY_NODE) },
        MAX: { value: new V(cn, Rs) },
      }),
        (iD.__EMPTY_NODE = x.EMPTY_NODE),
        (ci.__childrenNodeConstructor = x),
        (function DF(t) {
          Kc = t;
        })(Rs),
        (function CF(t) {
          lD = t;
        })(Rs),
        (function wF(t) {
          aD = t;
        })(ue);
      class Jc extends kb {
        constructor(e) {
          super(),
            (this.indexPath_ = e),
            v(
              !O(e) && ".priority" !== F(e),
              "Can't create PathIndex with empty path or .priority key"
            );
        }
        extractChild(e) {
          return e.getChild(this.indexPath_);
        }
        isDefinedOn(e) {
          return !e.getChild(this.indexPath_).isEmpty();
        }
        compare(e, n) {
          const r = this.extractChild(e.node),
            i = this.extractChild(n.node),
            s = r.compareTo(i);
          return 0 === s ? rr(e.name, n.name) : s;
        }
        makePost(e, n) {
          const r = ue(e),
            i = x.EMPTY_NODE.updateChild(this.indexPath_, r);
          return new V(n, i);
        }
        maxPost() {
          const e = x.EMPTY_NODE.updateChild(this.indexPath_, Rs);
          return new V(cn, e);
        }
        toString() {
          return xs(this.indexPath_, 0).join("/");
        }
      }
      const Xc = new (class AF extends kb {
        compare(e, n) {
          const r = e.node.compareTo(n.node);
          return 0 === r ? rr(e.name, n.name) : r;
        }
        isDefinedOn(e) {
          return !0;
        }
        indexedValueChanged(e, n) {
          return !e.equals(n);
        }
        minPost() {
          return V.MIN;
        }
        maxPost() {
          return V.MAX;
        }
        makePost(e, n) {
          const r = ue(e);
          return new V(n, r);
        }
        toString() {
          return ".value";
        }
      })();
      function uD(t) {
        return { type: "value", snapshotNode: t };
      }
      function di(t, e) {
        return { type: "child_added", snapshotNode: e, childName: t };
      }
      function ks(t, e) {
        return { type: "child_removed", snapshotNode: e, childName: t };
      }
      function Fs(t, e, n) {
        return {
          type: "child_changed",
          snapshotNode: e,
          childName: t,
          oldSnap: n,
        };
      }
      class eg {
        constructor(e) {
          this.index_ = e;
        }
        updateChild(e, n, r, i, s, o) {
          v(
            e.isIndexed(this.index_),
            "A node must be indexed if only a child is updated"
          );
          const b = e.getImmediateChild(n);
          return (b.getChild(i).equals(r.getChild(i)) &&
            b.isEmpty() === r.isEmpty()) ||
            (null != o &&
              (r.isEmpty()
                ? e.hasChild(n)
                  ? o.trackChildChange(ks(n, b))
                  : v(
                      e.isLeafNode(),
                      "A child remove without an old child only makes sense on a leaf node"
                    )
                : b.isEmpty()
                ? o.trackChildChange(di(n, r))
                : o.trackChildChange(Fs(n, r, b))),
            e.isLeafNode() && r.isEmpty())
            ? e
            : e.updateImmediateChild(n, r).withIndex(this.index_);
        }
        updateFullNode(e, n, r) {
          return (
            null != r &&
              (e.isLeafNode() ||
                e.forEachChild(ie, (i, s) => {
                  n.hasChild(i) || r.trackChildChange(ks(i, s));
                }),
              n.isLeafNode() ||
                n.forEachChild(ie, (i, s) => {
                  if (e.hasChild(i)) {
                    const o = e.getImmediateChild(i);
                    o.equals(s) || r.trackChildChange(Fs(i, s, o));
                  } else r.trackChildChange(di(i, s));
                })),
            n.withIndex(this.index_)
          );
        }
        updatePriority(e, n) {
          return e.isEmpty() ? x.EMPTY_NODE : e.updatePriority(n);
        }
        filtersNodes() {
          return !1;
        }
        getIndexedFilter() {
          return this;
        }
        getIndex() {
          return this.index_;
        }
      }
      class Os {
        constructor(e) {
          (this.indexedFilter_ = new eg(e.getIndex())),
            (this.index_ = e.getIndex()),
            (this.startPost_ = Os.getStartPost_(e)),
            (this.endPost_ = Os.getEndPost_(e)),
            (this.startIsInclusive_ = !e.startAfterSet_),
            (this.endIsInclusive_ = !e.endBeforeSet_);
        }
        getStartPost() {
          return this.startPost_;
        }
        getEndPost() {
          return this.endPost_;
        }
        matches(e) {
          const n = this.startIsInclusive_
              ? this.index_.compare(this.getStartPost(), e) <= 0
              : this.index_.compare(this.getStartPost(), e) < 0,
            r = this.endIsInclusive_
              ? this.index_.compare(e, this.getEndPost()) <= 0
              : this.index_.compare(e, this.getEndPost()) < 0;
          return n && r;
        }
        updateChild(e, n, r, i, s, o) {
          return (
            this.matches(new V(n, r)) || (r = x.EMPTY_NODE),
            this.indexedFilter_.updateChild(e, n, r, i, s, o)
          );
        }
        updateFullNode(e, n, r) {
          n.isLeafNode() && (n = x.EMPTY_NODE);
          let i = n.withIndex(this.index_);
          i = i.updatePriority(x.EMPTY_NODE);
          const s = this;
          return (
            n.forEachChild(ie, (o, b) => {
              s.matches(new V(o, b)) ||
                (i = i.updateImmediateChild(o, x.EMPTY_NODE));
            }),
            this.indexedFilter_.updateFullNode(e, i, r)
          );
        }
        updatePriority(e, n) {
          return e;
        }
        filtersNodes() {
          return !0;
        }
        getIndexedFilter() {
          return this.indexedFilter_;
        }
        getIndex() {
          return this.index_;
        }
        static getStartPost_(e) {
          if (e.hasStart()) {
            const n = e.getIndexStartName();
            return e.getIndex().makePost(e.getIndexStartValue(), n);
          }
          return e.getIndex().minPost();
        }
        static getEndPost_(e) {
          if (e.hasEnd()) {
            const n = e.getIndexEndName();
            return e.getIndex().makePost(e.getIndexEndValue(), n);
          }
          return e.getIndex().maxPost();
        }
      }
      class NF {
        constructor(e) {
          (this.withinDirectionalStart = (n) =>
            this.reverse_ ? this.withinEndPost(n) : this.withinStartPost(n)),
            (this.withinDirectionalEnd = (n) =>
              this.reverse_ ? this.withinStartPost(n) : this.withinEndPost(n)),
            (this.withinStartPost = (n) => {
              const r = this.index_.compare(
                this.rangedFilter_.getStartPost(),
                n
              );
              return this.startIsInclusive_ ? r <= 0 : r < 0;
            }),
            (this.withinEndPost = (n) => {
              const r = this.index_.compare(n, this.rangedFilter_.getEndPost());
              return this.endIsInclusive_ ? r <= 0 : r < 0;
            }),
            (this.rangedFilter_ = new Os(e)),
            (this.index_ = e.getIndex()),
            (this.limit_ = e.getLimit()),
            (this.reverse_ = !e.isViewFromLeft()),
            (this.startIsInclusive_ = !e.startAfterSet_),
            (this.endIsInclusive_ = !e.endBeforeSet_);
        }
        updateChild(e, n, r, i, s, o) {
          return (
            this.rangedFilter_.matches(new V(n, r)) || (r = x.EMPTY_NODE),
            e.getImmediateChild(n).equals(r)
              ? e
              : e.numChildren() < this.limit_
              ? this.rangedFilter_
                  .getIndexedFilter()
                  .updateChild(e, n, r, i, s, o)
              : this.fullLimitUpdateChild_(e, n, r, s, o)
          );
        }
        updateFullNode(e, n, r) {
          let i;
          if (n.isLeafNode() || n.isEmpty())
            i = x.EMPTY_NODE.withIndex(this.index_);
          else if (
            2 * this.limit_ < n.numChildren() &&
            n.isIndexed(this.index_)
          ) {
            let s;
            (i = x.EMPTY_NODE.withIndex(this.index_)),
              (s = this.reverse_
                ? n.getReverseIteratorFrom(
                    this.rangedFilter_.getEndPost(),
                    this.index_
                  )
                : n.getIteratorFrom(
                    this.rangedFilter_.getStartPost(),
                    this.index_
                  ));
            let o = 0;
            for (; s.hasNext() && o < this.limit_; ) {
              const b = s.getNext();
              if (this.withinDirectionalStart(b)) {
                if (!this.withinDirectionalEnd(b)) break;
                (i = i.updateImmediateChild(b.name, b.node)), o++;
              }
            }
          } else {
            let s;
            (i = n.withIndex(this.index_)),
              (i = i.updatePriority(x.EMPTY_NODE)),
              (s = this.reverse_
                ? i.getReverseIterator(this.index_)
                : i.getIterator(this.index_));
            let o = 0;
            for (; s.hasNext(); ) {
              const b = s.getNext();
              o < this.limit_ &&
              this.withinDirectionalStart(b) &&
              this.withinDirectionalEnd(b)
                ? o++
                : (i = i.updateImmediateChild(b.name, x.EMPTY_NODE));
            }
          }
          return this.rangedFilter_.getIndexedFilter().updateFullNode(e, i, r);
        }
        updatePriority(e, n) {
          return e;
        }
        filtersNodes() {
          return !0;
        }
        getIndexedFilter() {
          return this.rangedFilter_.getIndexedFilter();
        }
        getIndex() {
          return this.index_;
        }
        fullLimitUpdateChild_(e, n, r, i, s) {
          let o;
          if (this.reverse_) {
            const c = this.index_.getCompare();
            o = (g, d) => c(d, g);
          } else o = this.index_.getCompare();
          const b = e;
          v(b.numChildren() === this.limit_, "");
          const a = new V(n, r),
            l = this.reverse_
              ? b.getFirstChild(this.index_)
              : b.getLastChild(this.index_),
            u = this.rangedFilter_.matches(a);
          if (b.hasChild(n)) {
            const c = b.getImmediateChild(n);
            let g = i.getChildAfterChild(this.index_, l, this.reverse_);
            for (; null != g && (g.name === n || b.hasChild(g.name)); )
              g = i.getChildAfterChild(this.index_, g, this.reverse_);
            const d = null == g ? 1 : o(g, a);
            if (u && !r.isEmpty() && d >= 0)
              return (
                null != s && s.trackChildChange(Fs(n, r, c)),
                b.updateImmediateChild(n, r)
              );
            {
              null != s && s.trackChildChange(ks(n, c));
              const f = b.updateImmediateChild(n, x.EMPTY_NODE);
              return null != g && this.rangedFilter_.matches(g)
                ? (null != s && s.trackChildChange(di(g.name, g.node)),
                  f.updateImmediateChild(g.name, g.node))
                : f;
            }
          }
          return r.isEmpty()
            ? e
            : u && o(l, a) >= 0
            ? (null != s &&
                (s.trackChildChange(ks(l.name, l.node)),
                s.trackChildChange(di(n, r))),
              b
                .updateImmediateChild(n, r)
                .updateImmediateChild(l.name, x.EMPTY_NODE))
            : e;
        }
      }
      class tg {
        constructor() {
          (this.limitSet_ = !1),
            (this.startSet_ = !1),
            (this.startNameSet_ = !1),
            (this.startAfterSet_ = !1),
            (this.endSet_ = !1),
            (this.endNameSet_ = !1),
            (this.endBeforeSet_ = !1),
            (this.limit_ = 0),
            (this.viewFrom_ = ""),
            (this.indexStartValue_ = null),
            (this.indexStartName_ = ""),
            (this.indexEndValue_ = null),
            (this.indexEndName_ = ""),
            (this.index_ = ie);
        }
        hasStart() {
          return this.startSet_;
        }
        isViewFromLeft() {
          return "" === this.viewFrom_
            ? this.startSet_
            : "l" === this.viewFrom_;
        }
        getIndexStartValue() {
          return (
            v(this.startSet_, "Only valid if start has been set"),
            this.indexStartValue_
          );
        }
        getIndexStartName() {
          return (
            v(this.startSet_, "Only valid if start has been set"),
            this.startNameSet_ ? this.indexStartName_ : An
          );
        }
        hasEnd() {
          return this.endSet_;
        }
        getIndexEndValue() {
          return (
            v(this.endSet_, "Only valid if end has been set"),
            this.indexEndValue_
          );
        }
        getIndexEndName() {
          return (
            v(this.endSet_, "Only valid if end has been set"),
            this.endNameSet_ ? this.indexEndName_ : cn
          );
        }
        hasLimit() {
          return this.limitSet_;
        }
        hasAnchoredLimit() {
          return this.limitSet_ && "" !== this.viewFrom_;
        }
        getLimit() {
          return (
            v(this.limitSet_, "Only valid if limit has been set"), this.limit_
          );
        }
        getIndex() {
          return this.index_;
        }
        loadsAllData() {
          return !(this.startSet_ || this.endSet_ || this.limitSet_);
        }
        isDefault() {
          return this.loadsAllData() && this.index_ === ie;
        }
        copy() {
          const e = new tg();
          return (
            (e.limitSet_ = this.limitSet_),
            (e.limit_ = this.limit_),
            (e.startSet_ = this.startSet_),
            (e.startAfterSet_ = this.startAfterSet_),
            (e.indexStartValue_ = this.indexStartValue_),
            (e.startNameSet_ = this.startNameSet_),
            (e.indexStartName_ = this.indexStartName_),
            (e.endSet_ = this.endSet_),
            (e.endBeforeSet_ = this.endBeforeSet_),
            (e.indexEndValue_ = this.indexEndValue_),
            (e.endNameSet_ = this.endNameSet_),
            (e.indexEndName_ = this.indexEndName_),
            (e.index_ = this.index_),
            (e.viewFrom_ = this.viewFrom_),
            e
          );
        }
      }
      function cD(t) {
        const e = {};
        if (t.isDefault()) return e;
        let n;
        if (
          (t.index_ === ie
            ? (n = "$priority")
            : t.index_ === Xc
            ? (n = "$value")
            : t.index_ === Qt
            ? (n = "$key")
            : (v(t.index_ instanceof Jc, "Unrecognized index type!"),
              (n = t.index_.toString())),
          (e.orderBy = Ie(n)),
          t.startSet_)
        ) {
          const r = t.startAfterSet_ ? "startAfter" : "startAt";
          (e[r] = Ie(t.indexStartValue_)),
            t.startNameSet_ && (e[r] += "," + Ie(t.indexStartName_));
        }
        if (t.endSet_) {
          const r = t.endBeforeSet_ ? "endBefore" : "endAt";
          (e[r] = Ie(t.indexEndValue_)),
            t.endNameSet_ && (e[r] += "," + Ie(t.indexEndName_));
        }
        return (
          t.limitSet_ &&
            (t.isViewFromLeft()
              ? (e.limitToFirst = t.limit_)
              : (e.limitToLast = t.limit_)),
          e
        );
      }
      function gD(t) {
        const e = {};
        if (
          (t.startSet_ &&
            ((e.sp = t.indexStartValue_),
            t.startNameSet_ && (e.sn = t.indexStartName_),
            (e.sin = !t.startAfterSet_)),
          t.endSet_ &&
            ((e.ep = t.indexEndValue_),
            t.endNameSet_ && (e.en = t.indexEndName_),
            (e.ein = !t.endBeforeSet_)),
          t.limitSet_)
        ) {
          e.l = t.limit_;
          let n = t.viewFrom_;
          "" === n && (n = t.isViewFromLeft() ? "l" : "r"), (e.vf = n);
        }
        return t.index_ !== ie && (e.i = t.index_.toString()), e;
      }
      class Vb extends Kv {
        constructor(e, n, r, i) {
          super(),
            (this.repoInfo_ = e),
            (this.onDataUpdate_ = n),
            (this.authTokenProvider_ = r),
            (this.appCheckTokenProvider_ = i),
            (this.log_ = Ts("p:rest:")),
            (this.listens_ = {});
        }
        reportStats(e) {
          throw new Error("Method not implemented.");
        }
        static getListenId_(e, n) {
          return void 0 !== n
            ? "tag$" + n
            : (v(
                e._queryParams.isDefault(),
                "should have a tag if it's not a default query."
              ),
              e._path.toString());
        }
        listen(e, n, r, i) {
          const s = e._path.toString();
          this.log_("Listen called for " + s + " " + e._queryIdentifier);
          const o = Vb.getListenId_(e, r),
            b = {};
          this.listens_[o] = b;
          const a = cD(e._queryParams);
          this.restRequest_(s + ".json", a, (l, u) => {
            let c = u;
            if (
              (404 === l && ((c = null), (l = null)),
              null === l && this.onDataUpdate_(s, c, !1, r),
              si(this.listens_, o) === b)
            ) {
              let g;
              (g = l
                ? 401 === l
                  ? "permission_denied"
                  : "rest_error:" + l
                : "ok"),
                i(g, null);
            }
          });
        }
        unlisten(e, n) {
          const r = Vb.getListenId_(e, n);
          delete this.listens_[r];
        }
        get(e) {
          const n = cD(e._queryParams),
            r = e._path.toString(),
            i = new _s();
          return (
            this.restRequest_(r + ".json", n, (s, o) => {
              let b = o;
              404 === s && ((b = null), (s = null)),
                null === s
                  ? (this.onDataUpdate_(r, b, !1, null), i.resolve(b))
                  : i.reject(new Error(b));
            }),
            i.promise
          );
        }
        refreshAuthToken(e) {}
        restRequest_(e, n = {}, r) {
          return (
            (n.format = "export"),
            Promise.all([
              this.authTokenProvider_.getToken(!1),
              this.appCheckTokenProvider_.getToken(!1),
            ]).then(([i, s]) => {
              i && i.accessToken && (n.auth = i.accessToken),
                s && s.token && (n.ac = s.token);
              const o =
                (this.repoInfo_.secure ? "https://" : "http://") +
                this.repoInfo_.host +
                e +
                "?ns=" +
                this.repoInfo_.namespace +
                (function lR(t) {
                  const e = [];
                  for (const [n, r] of Object.entries(t))
                    Array.isArray(r)
                      ? r.forEach((i) => {
                          e.push(
                            encodeURIComponent(n) + "=" + encodeURIComponent(i)
                          );
                        })
                      : e.push(
                          encodeURIComponent(n) + "=" + encodeURIComponent(r)
                        );
                  return e.length ? "&" + e.join("&") : "";
                })(n);
              this.log_("Sending REST request for " + o);
              const b = new XMLHttpRequest();
              (b.onreadystatechange = () => {
                if (r && 4 === b.readyState) {
                  this.log_(
                    "REST Response for " + o + " received. status:",
                    b.status,
                    "response:",
                    b.responseText
                  );
                  let a = null;
                  if (b.status >= 200 && b.status < 300) {
                    try {
                      a = Ds(b.responseText);
                    } catch (l) {
                      Fe(
                        "Failed to parse JSON response for " +
                          o +
                          ": " +
                          b.responseText
                      );
                    }
                    r(null, a);
                  } else
                    401 !== b.status &&
                      404 !== b.status &&
                      Fe(
                        "Got unsuccessful REST response for " +
                          o +
                          " Status: " +
                          b.status
                      ),
                      r(b.status);
                  r = null;
                }
              }),
                b.open("GET", o, !0),
                b.send();
            })
          );
        }
      }
      class LF {
        constructor() {
          this.rootNode_ = x.EMPTY_NODE;
        }
        getNode(e) {
          return this.rootNode_.getChild(e);
        }
        updateSnapshot(e, n) {
          this.rootNode_ = this.rootNode_.updateChild(e, n);
        }
      }
      function jb() {
        return { value: null, children: new Map() };
      }
      function yi(t, e, n) {
        if (O(e)) (t.value = n), t.children.clear();
        else if (null !== t.value) t.value = t.value.updateChild(e, n);
        else {
          const r = F(e);
          t.children.has(r) || t.children.set(r, jb()),
            yi(t.children.get(r), (e = te(e)), n);
        }
      }
      function sg(t, e, n) {
        null !== t.value
          ? n(e, t.value)
          : (function BF(t, e) {
              t.children.forEach((n, r) => {
                e(r, n);
              });
            })(t, (r, i) => {
              sg(i, new z(e.toString() + "/" + r), n);
            });
      }
      class VF {
        constructor(e) {
          (this.collection_ = e), (this.last_ = null);
        }
        get() {
          const e = this.collection_.get(),
            n = Object.assign({}, e);
          return (
            this.last_ &&
              Se(this.last_, (r, i) => {
                n[r] = n[r] - i;
              }),
            (this.last_ = e),
            n
          );
        }
      }
      class UF {
        constructor(e, n) {
          (this.server_ = n),
            (this.statsToReport_ = {}),
            (this.statsListener_ = new VF(e));
          const r = 1e4 + 2e4 * Math.random();
          Ms(this.reportStats_.bind(this), Math.floor(r));
        }
        reportStats_() {
          const e = this.statsListener_.get(),
            n = {};
          let r = !1;
          Se(e, (i, s) => {
            s > 0 && ln(this.statsToReport_, i) && ((n[i] = s), (r = !0));
          }),
            r && this.server_.reportStats(n),
            Ms(
              this.reportStats_.bind(this),
              Math.floor(2 * Math.random() * 3e5)
            );
        }
      }
      var pt = (() => {
        return (
          ((t = pt || (pt = {}))[(t.OVERWRITE = 0)] = "OVERWRITE"),
          (t[(t.MERGE = 1)] = "MERGE"),
          (t[(t.ACK_USER_WRITE = 2)] = "ACK_USER_WRITE"),
          (t[(t.LISTEN_COMPLETE = 3)] = "LISTEN_COMPLETE"),
          pt
        );
        var t;
      })();
      function ag(t) {
        return { fromUser: !1, fromServer: !0, queryId: t, tagged: !0 };
      }
      class Hb {
        constructor(e, n, r) {
          (this.path = e),
            (this.affectedTree = n),
            (this.revert = r),
            (this.type = pt.ACK_USER_WRITE),
            (this.source = {
              fromUser: !0,
              fromServer: !1,
              queryId: null,
              tagged: !1,
            });
        }
        operationForChild(e) {
          if (O(this.path)) {
            if (null != this.affectedTree.value)
              return (
                v(
                  this.affectedTree.children.isEmpty(),
                  "affectedTree should not have overlapping affected paths."
                ),
                this
              );
            {
              const n = this.affectedTree.subtree(new z(e));
              return new Hb(W(), n, this.revert);
            }
          }
          return (
            v(
              F(this.path) === e,
              "operationForChild called for unrelated child."
            ),
            new Hb(te(this.path), this.affectedTree, this.revert)
          );
        }
      }
      class Ls {
        constructor(e, n) {
          (this.source = e), (this.path = n), (this.type = pt.LISTEN_COMPLETE);
        }
        operationForChild(e) {
          return O(this.path)
            ? new Ls(this.source, W())
            : new Ls(this.source, te(this.path));
        }
      }
      class or {
        constructor(e, n, r) {
          (this.source = e),
            (this.path = n),
            (this.snap = r),
            (this.type = pt.OVERWRITE);
        }
        operationForChild(e) {
          return O(this.path)
            ? new or(this.source, W(), this.snap.getImmediateChild(e))
            : new or(this.source, te(this.path), this.snap);
        }
      }
      class fi {
        constructor(e, n, r) {
          (this.source = e),
            (this.path = n),
            (this.children = r),
            (this.type = pt.MERGE);
        }
        operationForChild(e) {
          if (O(this.path)) {
            const n = this.children.subtree(new z(e));
            return n.isEmpty()
              ? null
              : n.value
              ? new or(this.source, W(), n.value)
              : new fi(this.source, W(), n);
          }
          return (
            v(
              F(this.path) === e,
              "Can't get a merge for a child not on the path of the operation"
            ),
            new fi(this.source, te(this.path), this.children)
          );
        }
        toString() {
          return (
            "Operation(" +
            this.path +
            ": " +
            this.source.toString() +
            " merge: " +
            this.children.toString() +
            ")"
          );
        }
      }
      class Pn {
        constructor(e, n, r) {
          (this.node_ = e), (this.fullyInitialized_ = n), (this.filtered_ = r);
        }
        isFullyInitialized() {
          return this.fullyInitialized_;
        }
        isFiltered() {
          return this.filtered_;
        }
        isCompleteForPath(e) {
          if (O(e)) return this.isFullyInitialized() && !this.filtered_;
          const n = F(e);
          return this.isCompleteForChild(n);
        }
        isCompleteForChild(e) {
          return (
            (this.isFullyInitialized() && !this.filtered_) ||
            this.node_.hasChild(e)
          );
        }
        getNode() {
          return this.node_;
        }
      }
      class $F {
        constructor(e) {
          (this.query_ = e),
            (this.index_ = this.query_._queryParams.getIndex());
        }
      }
      function Bs(t, e, n, r, i, s) {
        const o = r.filter((b) => b.type === n);
        o.sort((b, a) =>
          (function zF(t, e, n) {
            if (null == e.childName || null == n.childName)
              throw ii("Should only compare child_ events.");
            const r = new V(e.childName, e.snapshotNode),
              i = new V(n.childName, n.snapshotNode);
            return t.index_.compare(r, i);
          })(t, b, a)
        ),
          o.forEach((b) => {
            const a = (function GF(t, e, n) {
              return (
                "value" === e.type ||
                  "child_removed" === e.type ||
                  (e.prevName = n.getPredecessorChildName(
                    e.childName,
                    e.snapshotNode,
                    t.index_
                  )),
                e
              );
            })(t, b, s);
            i.forEach((l) => {
              l.respondsTo(b.type) && e.push(l.createEvent(a, t.query_));
            });
          });
      }
      function Ub(t, e) {
        return { eventCache: t, serverCache: e };
      }
      function Vs(t, e, n, r) {
        return Ub(new Pn(e, n, r), t.serverCache);
      }
      function yD(t, e, n, r) {
        return Ub(t.eventCache, new Pn(e, n, r));
      }
      function $b(t) {
        return t.eventCache.isFullyInitialized()
          ? t.eventCache.getNode()
          : null;
      }
      function br(t) {
        return t.serverCache.isFullyInitialized()
          ? t.serverCache.getNode()
          : null;
      }
      let lg;
      class se {
        constructor(e, n = (() => (lg || (lg = new Ye(xk)), lg))()) {
          (this.value = e), (this.children = n);
        }
        static fromObject(e) {
          let n = new se(null);
          return (
            Se(e, (r, i) => {
              n = n.set(new z(r), i);
            }),
            n
          );
        }
        isEmpty() {
          return null === this.value && this.children.isEmpty();
        }
        findRootMostMatchingPathAndValue(e, n) {
          if (null != this.value && n(this.value))
            return { path: W(), value: this.value };
          if (O(e)) return null;
          {
            const r = F(e),
              i = this.children.get(r);
            if (null !== i) {
              const s = i.findRootMostMatchingPathAndValue(te(e), n);
              return null != s
                ? { path: ae(new z(r), s.path), value: s.value }
                : null;
            }
            return null;
          }
        }
        findRootMostValueAndPath(e) {
          return this.findRootMostMatchingPathAndValue(e, () => !0);
        }
        subtree(e) {
          if (O(e)) return this;
          {
            const n = F(e),
              r = this.children.get(n);
            return null !== r ? r.subtree(te(e)) : new se(null);
          }
        }
        set(e, n) {
          if (O(e)) return new se(n, this.children);
          {
            const r = F(e),
              s = (this.children.get(r) || new se(null)).set(te(e), n),
              o = this.children.insert(r, s);
            return new se(this.value, o);
          }
        }
        remove(e) {
          if (O(e))
            return this.children.isEmpty()
              ? new se(null)
              : new se(null, this.children);
          {
            const n = F(e),
              r = this.children.get(n);
            if (r) {
              const i = r.remove(te(e));
              let s;
              return (
                (s = i.isEmpty()
                  ? this.children.remove(n)
                  : this.children.insert(n, i)),
                null === this.value && s.isEmpty()
                  ? new se(null)
                  : new se(this.value, s)
              );
            }
            return this;
          }
        }
        get(e) {
          if (O(e)) return this.value;
          {
            const n = F(e),
              r = this.children.get(n);
            return r ? r.get(te(e)) : null;
          }
        }
        setTree(e, n) {
          if (O(e)) return n;
          {
            const r = F(e),
              s = (this.children.get(r) || new se(null)).setTree(te(e), n);
            let o;
            return (
              (o = s.isEmpty()
                ? this.children.remove(r)
                : this.children.insert(r, s)),
              new se(this.value, o)
            );
          }
        }
        fold(e) {
          return this.fold_(W(), e);
        }
        fold_(e, n) {
          const r = {};
          return (
            this.children.inorderTraversal((i, s) => {
              r[i] = s.fold_(ae(e, i), n);
            }),
            n(e, this.value, r)
          );
        }
        findOnPath(e, n) {
          return this.findOnPath_(e, W(), n);
        }
        findOnPath_(e, n, r) {
          const i = !!this.value && r(n, this.value);
          if (i) return i;
          if (O(e)) return null;
          {
            const s = F(e),
              o = this.children.get(s);
            return o ? o.findOnPath_(te(e), ae(n, s), r) : null;
          }
        }
        foreachOnPath(e, n) {
          return this.foreachOnPath_(e, W(), n);
        }
        foreachOnPath_(e, n, r) {
          if (O(e)) return this;
          {
            this.value && r(n, this.value);
            const i = F(e),
              s = this.children.get(i);
            return s ? s.foreachOnPath_(te(e), ae(n, i), r) : new se(null);
          }
        }
        foreach(e) {
          this.foreach_(W(), e);
        }
        foreach_(e, n) {
          this.children.inorderTraversal((r, i) => {
            i.foreach_(ae(e, r), n);
          }),
            this.value && n(e, this.value);
        }
        foreachChild(e) {
          this.children.inorderTraversal((n, r) => {
            r.value && e(n, r.value);
          });
        }
      }
      class Nt {
        constructor(e) {
          this.writeTree_ = e;
        }
        static empty() {
          return new Nt(new se(null));
        }
      }
      function js(t, e, n) {
        if (O(e)) return new Nt(new se(n));
        {
          const r = t.writeTree_.findRootMostValueAndPath(e);
          if (null != r) {
            const i = r.path;
            let s = r.value;
            const o = Ue(i, e);
            return (s = s.updateChild(o, n)), new Nt(t.writeTree_.set(i, s));
          }
          {
            const i = new se(n),
              s = t.writeTree_.setTree(e, i);
            return new Nt(s);
          }
        }
      }
      function ug(t, e, n) {
        let r = t;
        return (
          Se(n, (i, s) => {
            r = js(r, ae(e, i), s);
          }),
          r
        );
      }
      function fD(t, e) {
        if (O(e)) return Nt.empty();
        {
          const n = t.writeTree_.setTree(e, new se(null));
          return new Nt(n);
        }
      }
      function cg(t, e) {
        return null != ar(t, e);
      }
      function ar(t, e) {
        const n = t.writeTree_.findRootMostValueAndPath(e);
        return null != n
          ? t.writeTree_.get(n.path).getChild(Ue(n.path, e))
          : null;
      }
      function hD(t) {
        const e = [],
          n = t.writeTree_.value;
        return (
          null != n
            ? n.isLeafNode() ||
              n.forEachChild(ie, (r, i) => {
                e.push(new V(r, i));
              })
            : t.writeTree_.children.inorderTraversal((r, i) => {
                null != i.value && e.push(new V(r, i.value));
              }),
          e
        );
      }
      function Rn(t, e) {
        if (O(e)) return t;
        {
          const n = ar(t, e);
          return new Nt(null != n ? new se(n) : t.writeTree_.subtree(e));
        }
      }
      function gg(t) {
        return t.writeTree_.isEmpty();
      }
      function hi(t, e) {
        return pD(W(), t.writeTree_, e);
      }
      function pD(t, e, n) {
        if (null != e.value) return n.updateChild(t, e.value);
        {
          let r = null;
          return (
            e.children.inorderTraversal((i, s) => {
              ".priority" === i
                ? (v(
                    null !== s.value,
                    "Priority writes must always be leaf nodes"
                  ),
                  (r = s.value))
                : (n = pD(ae(t, i), s, n));
            }),
            !n.getChild(t).isEmpty() &&
              null !== r &&
              (n = n.updateChild(ae(t, ".priority"), r)),
            n
          );
        }
      }
      function Wb(t, e) {
        return wD(e, t);
      }
      function JF(t, e) {
        if (t.snap) return ht(t.path, e);
        for (const n in t.children)
          if (t.children.hasOwnProperty(n) && ht(ae(t.path, n), e)) return !0;
        return !1;
      }
      function e1(t) {
        return t.visible;
      }
      function mD(t, e, n) {
        let r = Nt.empty();
        for (let i = 0; i < t.length; ++i) {
          const s = t[i];
          if (e(s)) {
            const o = s.path;
            let b;
            if (s.snap)
              ht(n, o)
                ? ((b = Ue(n, o)), (r = js(r, b, s.snap)))
                : ht(o, n) &&
                  ((b = Ue(o, n)), (r = js(r, W(), s.snap.getChild(b))));
            else {
              if (!s.children)
                throw ii("WriteRecord should have .snap or .children");
              if (ht(n, o)) (b = Ue(n, o)), (r = ug(r, b, s.children));
              else if (ht(o, n))
                if (((b = Ue(o, n)), O(b))) r = ug(r, W(), s.children);
                else {
                  const a = si(s.children, F(b));
                  if (a) {
                    const l = a.getChild(te(b));
                    r = js(r, W(), l);
                  }
                }
            }
          }
        }
        return r;
      }
      function _D(t, e, n, r, i) {
        if (r || i) {
          const s = Rn(t.visibleWrites, e);
          return !i && gg(s)
            ? n
            : i || null != n || cg(s, W())
            ? hi(
                mD(
                  t.allWrites,
                  function (l) {
                    return (
                      (l.visible || i) &&
                      (!r || !~r.indexOf(l.writeId)) &&
                      (ht(l.path, e) || ht(e, l.path))
                    );
                  },
                  e
                ),
                n || x.EMPTY_NODE
              )
            : null;
        }
        {
          const s = ar(t.visibleWrites, e);
          if (null != s) return s;
          {
            const o = Rn(t.visibleWrites, e);
            return gg(o)
              ? n
              : null != n || cg(o, W())
              ? hi(o, n || x.EMPTY_NODE)
              : null;
          }
        }
      }
      function Gb(t, e, n, r) {
        return _D(t.writeTree, t.treePath, e, n, r);
      }
      function dg(t, e) {
        return (function t1(t, e, n) {
          let r = x.EMPTY_NODE;
          const i = ar(t.visibleWrites, e);
          if (i)
            return (
              i.isLeafNode() ||
                i.forEachChild(ie, (s, o) => {
                  r = r.updateImmediateChild(s, o);
                }),
              r
            );
          if (n) {
            const s = Rn(t.visibleWrites, e);
            return (
              n.forEachChild(ie, (o, b) => {
                const a = hi(Rn(s, new z(o)), b);
                r = r.updateImmediateChild(o, a);
              }),
              hD(s).forEach((o) => {
                r = r.updateImmediateChild(o.name, o.node);
              }),
              r
            );
          }
          return (
            hD(Rn(t.visibleWrites, e)).forEach((o) => {
              r = r.updateImmediateChild(o.name, o.node);
            }),
            r
          );
        })(t.writeTree, t.treePath, e);
      }
      function vD(t, e, n, r) {
        return (function n1(t, e, n, r, i) {
          v(
            r || i,
            "Either existingEventSnap or existingServerSnap must exist"
          );
          const s = ae(e, n);
          if (cg(t.visibleWrites, s)) return null;
          {
            const o = Rn(t.visibleWrites, s);
            return gg(o) ? i.getChild(n) : hi(o, i.getChild(n));
          }
        })(t.writeTree, t.treePath, e, n, r);
      }
      function zb(t, e) {
        return (function i1(t, e) {
          return ar(t.visibleWrites, e);
        })(t.writeTree, ae(t.treePath, e));
      }
      function yg(t, e, n) {
        return (function r1(t, e, n, r) {
          const i = ae(e, n),
            s = ar(t.visibleWrites, i);
          return null != s
            ? s
            : r.isCompleteForChild(n)
            ? hi(Rn(t.visibleWrites, i), r.getNode().getImmediateChild(n))
            : null;
        })(t.writeTree, t.treePath, e, n);
      }
      function DD(t, e) {
        return wD(ae(t.treePath, e), t.writeTree);
      }
      function wD(t, e) {
        return { treePath: t, writeTree: e };
      }
      class a1 {
        constructor() {
          this.changeMap = new Map();
        }
        trackChildChange(e) {
          const n = e.type,
            r = e.childName;
          v(
            "child_added" === n ||
              "child_changed" === n ||
              "child_removed" === n,
            "Only child changes supported for tracking"
          ),
            v(
              ".priority" !== r,
              "Only non-priority child changes can be tracked."
            );
          const i = this.changeMap.get(r);
          if (i) {
            const s = i.type;
            if ("child_added" === n && "child_removed" === s)
              this.changeMap.set(r, Fs(r, e.snapshotNode, i.snapshotNode));
            else if ("child_removed" === n && "child_added" === s)
              this.changeMap.delete(r);
            else if ("child_removed" === n && "child_changed" === s)
              this.changeMap.set(r, ks(r, i.oldSnap));
            else if ("child_changed" === n && "child_added" === s)
              this.changeMap.set(r, di(r, e.snapshotNode));
            else {
              if ("child_changed" !== n || "child_changed" !== s)
                throw ii(
                  "Illegal combination of changes: " +
                    e +
                    " occurred after " +
                    i
                );
              this.changeMap.set(r, Fs(r, e.snapshotNode, i.oldSnap));
            }
          } else this.changeMap.set(r, e);
        }
        getChanges() {
          return Array.from(this.changeMap.values());
        }
      }
      const CD = new (class l1 {
        getCompleteChild(e) {
          return null;
        }
        getChildAfterChild(e, n, r) {
          return null;
        }
      })();
      class fg {
        constructor(e, n, r = null) {
          (this.writes_ = e),
            (this.viewCache_ = n),
            (this.optCompleteServerCache_ = r);
        }
        getCompleteChild(e) {
          const n = this.viewCache_.eventCache;
          if (n.isCompleteForChild(e)) return n.getNode().getImmediateChild(e);
          {
            const r =
              null != this.optCompleteServerCache_
                ? new Pn(this.optCompleteServerCache_, !0, !1)
                : this.viewCache_.serverCache;
            return yg(this.writes_, e, r);
          }
        }
        getChildAfterChild(e, n, r) {
          const i =
              null != this.optCompleteServerCache_
                ? this.optCompleteServerCache_
                : br(this.viewCache_),
            s = (function b1(t, e, n, r, i, s) {
              return (function s1(t, e, n, r, i, s, o) {
                let b;
                const a = Rn(t.visibleWrites, e),
                  l = ar(a, W());
                if (null != l) b = l;
                else {
                  if (null == n) return [];
                  b = hi(a, n);
                }
                if (((b = b.withIndex(o)), b.isEmpty() || b.isLeafNode()))
                  return [];
                {
                  const u = [],
                    c = o.getCompare(),
                    g = s
                      ? b.getReverseIteratorFrom(r, o)
                      : b.getIteratorFrom(r, o);
                  let d = g.getNext();
                  for (; d && u.length < i; )
                    0 !== c(d, r) && u.push(d), (d = g.getNext());
                  return u;
                }
              })(t.writeTree, t.treePath, e, n, r, i, s);
            })(this.writes_, i, n, 1, r, e);
          return 0 === s.length ? null : s[0];
        }
      }
      function ED(t, e, n, r, i, s) {
        const o = e.eventCache;
        if (null != zb(r, n)) return e;
        {
          let b, a;
          if (O(n))
            if (
              (v(
                e.serverCache.isFullyInitialized(),
                "If change path is empty, we must have complete server data"
              ),
              e.serverCache.isFiltered())
            ) {
              const l = br(e),
                c = dg(r, l instanceof x ? l : x.EMPTY_NODE);
              b = t.filter.updateFullNode(e.eventCache.getNode(), c, s);
            } else {
              const l = Gb(r, br(e));
              b = t.filter.updateFullNode(e.eventCache.getNode(), l, s);
            }
          else {
            const l = F(n);
            if (".priority" === l) {
              v(
                1 === Nn(n),
                "Can't have a priority with additional path components"
              );
              const u = o.getNode();
              a = e.serverCache.getNode();
              const c = vD(r, n, u, a);
              b = null != c ? t.filter.updatePriority(u, c) : o.getNode();
            } else {
              const u = te(n);
              let c;
              if (o.isCompleteForChild(l)) {
                a = e.serverCache.getNode();
                const g = vD(r, n, o.getNode(), a);
                c =
                  null != g
                    ? o.getNode().getImmediateChild(l).updateChild(u, g)
                    : o.getNode().getImmediateChild(l);
              } else c = yg(r, l, e.serverCache);
              b =
                null != c
                  ? t.filter.updateChild(o.getNode(), l, c, u, i, s)
                  : o.getNode();
            }
          }
          return Vs(
            e,
            b,
            o.isFullyInitialized() || O(n),
            t.filter.filtersNodes()
          );
        }
      }
      function qb(t, e, n, r, i, s, o, b) {
        const a = e.serverCache;
        let l;
        const u = o ? t.filter : t.filter.getIndexedFilter();
        if (O(n)) l = u.updateFullNode(a.getNode(), r, null);
        else if (u.filtersNodes() && !a.isFiltered()) {
          const d = a.getNode().updateChild(n, r);
          l = u.updateFullNode(a.getNode(), d, null);
        } else {
          const d = F(n);
          if (!a.isCompleteForPath(n) && Nn(n) > 1) return e;
          const y = te(n),
            p = a.getNode().getImmediateChild(d).updateChild(y, r);
          l =
            ".priority" === d
              ? u.updatePriority(a.getNode(), p)
              : u.updateChild(a.getNode(), d, p, y, CD, null);
        }
        const c = yD(e, l, a.isFullyInitialized() || O(n), u.filtersNodes());
        return ED(t, c, n, i, new fg(i, c, s), b);
      }
      function hg(t, e, n, r, i, s, o) {
        const b = e.eventCache;
        let a, l;
        const u = new fg(i, e, s);
        if (O(n))
          (l = t.filter.updateFullNode(e.eventCache.getNode(), r, o)),
            (a = Vs(e, l, !0, t.filter.filtersNodes()));
        else {
          const c = F(n);
          if (".priority" === c)
            (l = t.filter.updatePriority(e.eventCache.getNode(), r)),
              (a = Vs(e, l, b.isFullyInitialized(), b.isFiltered()));
          else {
            const g = te(n),
              d = b.getNode().getImmediateChild(c);
            let y;
            if (O(g)) y = r;
            else {
              const f = u.getCompleteChild(c);
              y =
                null != f
                  ? ".priority" === zc(g) && f.getChild(eD(g)).isEmpty()
                    ? f
                    : f.updateChild(g, r)
                  : x.EMPTY_NODE;
            }
            a = d.equals(y)
              ? e
              : Vs(
                  e,
                  t.filter.updateChild(b.getNode(), c, y, g, u, o),
                  b.isFullyInitialized(),
                  t.filter.filtersNodes()
                );
          }
        }
        return a;
      }
      function ID(t, e) {
        return t.eventCache.isCompleteForChild(e);
      }
      function TD(t, e, n) {
        return (
          n.foreach((r, i) => {
            e = e.updateChild(r, i);
          }),
          e
        );
      }
      function pg(t, e, n, r, i, s, o, b) {
        if (
          e.serverCache.getNode().isEmpty() &&
          !e.serverCache.isFullyInitialized()
        )
          return e;
        let l,
          a = e;
        l = O(n) ? r : new se(null).setTree(n, r);
        const u = e.serverCache.getNode();
        return (
          l.children.inorderTraversal((c, g) => {
            if (u.hasChild(c)) {
              const y = TD(0, e.serverCache.getNode().getImmediateChild(c), g);
              a = qb(t, a, new z(c), y, i, s, o, b);
            }
          }),
          l.children.inorderTraversal((c, g) => {
            const d = !e.serverCache.isCompleteForChild(c) && null === g.value;
            if (!u.hasChild(c) && !d) {
              const f = TD(0, e.serverCache.getNode().getImmediateChild(c), g);
              a = qb(t, a, new z(c), f, i, s, o, b);
            }
          }),
          a
        );
      }
      class m1 {
        constructor(e, n) {
          (this.query_ = e), (this.eventRegistrations_ = []);
          const r = this.query_._queryParams,
            i = new eg(r.getIndex()),
            s = (function PF(t) {
              return t.loadsAllData()
                ? new eg(t.getIndex())
                : t.hasLimit()
                ? new NF(t)
                : new Os(t);
            })(r);
          this.processor_ = (function u1(t) {
            return { filter: t };
          })(s);
          const o = n.serverCache,
            b = n.eventCache,
            a = i.updateFullNode(x.EMPTY_NODE, o.getNode(), null),
            l = s.updateFullNode(x.EMPTY_NODE, b.getNode(), null),
            u = new Pn(a, o.isFullyInitialized(), i.filtersNodes()),
            c = new Pn(l, b.isFullyInitialized(), s.filtersNodes());
          (this.viewCache_ = Ub(c, u)),
            (this.eventGenerator_ = new $F(this.query_));
        }
        get query() {
          return this.query_;
        }
      }
      function D1(t, e) {
        const n = br(t.viewCache_);
        return n &&
          (t.query._queryParams.loadsAllData() ||
            (!O(e) && !n.getImmediateChild(F(e)).isEmpty()))
          ? n.getChild(e)
          : null;
      }
      function SD(t) {
        return 0 === t.eventRegistrations_.length;
      }
      function MD(t, e, n) {
        const r = [];
        if (n) {
          v(null == e, "A cancel should cancel all event registrations.");
          const i = t.query._path;
          t.eventRegistrations_.forEach((s) => {
            const o = s.createCancelEvent(n, i);
            o && r.push(o);
          });
        }
        if (e) {
          let i = [];
          for (let s = 0; s < t.eventRegistrations_.length; ++s) {
            const o = t.eventRegistrations_[s];
            if (o.matches(e)) {
              if (e.hasAnyCallback()) {
                i = i.concat(t.eventRegistrations_.slice(s + 1));
                break;
              }
            } else i.push(o);
          }
          t.eventRegistrations_ = i;
        } else t.eventRegistrations_ = [];
        return r;
      }
      function AD(t, e, n, r) {
        e.type === pt.MERGE &&
          null !== e.source.queryId &&
          (v(
            br(t.viewCache_),
            "We should always have a full cache before handling merges"
          ),
          v(
            $b(t.viewCache_),
            "Missing event cache, even though we have a server cache"
          ));
        const i = t.viewCache_,
          s = (function g1(t, e, n, r, i) {
            const s = new a1();
            let o, b;
            if (n.type === pt.OVERWRITE) {
              const l = n;
              l.source.fromUser
                ? (o = hg(t, e, l.path, l.snap, r, i, s))
                : (v(l.source.fromServer, "Unknown source."),
                  (b =
                    l.source.tagged ||
                    (e.serverCache.isFiltered() && !O(l.path))),
                  (o = qb(t, e, l.path, l.snap, r, i, b, s)));
            } else if (n.type === pt.MERGE) {
              const l = n;
              l.source.fromUser
                ? (o = (function y1(t, e, n, r, i, s, o) {
                    let b = e;
                    return (
                      r.foreach((a, l) => {
                        const u = ae(n, a);
                        ID(e, F(u)) && (b = hg(t, b, u, l, i, s, o));
                      }),
                      r.foreach((a, l) => {
                        const u = ae(n, a);
                        ID(e, F(u)) || (b = hg(t, b, u, l, i, s, o));
                      }),
                      b
                    );
                  })(t, e, l.path, l.children, r, i, s))
                : (v(l.source.fromServer, "Unknown source."),
                  (b = l.source.tagged || e.serverCache.isFiltered()),
                  (o = pg(t, e, l.path, l.children, r, i, b, s)));
            } else if (n.type === pt.ACK_USER_WRITE) {
              const l = n;
              o = l.revert
                ? (function p1(t, e, n, r, i, s) {
                    let o;
                    if (null != zb(r, n)) return e;
                    {
                      const b = new fg(r, e, i),
                        a = e.eventCache.getNode();
                      let l;
                      if (O(n) || ".priority" === F(n)) {
                        let u;
                        if (e.serverCache.isFullyInitialized())
                          u = Gb(r, br(e));
                        else {
                          const c = e.serverCache.getNode();
                          v(
                            c instanceof x,
                            "serverChildren would be complete if leaf node"
                          ),
                            (u = dg(r, c));
                        }
                        l = t.filter.updateFullNode(a, u, s);
                      } else {
                        const u = F(n);
                        let c = yg(r, u, e.serverCache);
                        null == c &&
                          e.serverCache.isCompleteForChild(u) &&
                          (c = a.getImmediateChild(u)),
                          (l =
                            null != c
                              ? t.filter.updateChild(a, u, c, te(n), b, s)
                              : e.eventCache.getNode().hasChild(u)
                              ? t.filter.updateChild(
                                  a,
                                  u,
                                  x.EMPTY_NODE,
                                  te(n),
                                  b,
                                  s
                                )
                              : a),
                          l.isEmpty() &&
                            e.serverCache.isFullyInitialized() &&
                            ((o = Gb(r, br(e))),
                            o.isLeafNode() &&
                              (l = t.filter.updateFullNode(l, o, s)));
                      }
                      return (
                        (o =
                          e.serverCache.isFullyInitialized() ||
                          null != zb(r, W())),
                        Vs(e, l, o, t.filter.filtersNodes())
                      );
                    }
                  })(t, e, l.path, r, i, s)
                : (function f1(t, e, n, r, i, s, o) {
                    if (null != zb(i, n)) return e;
                    const b = e.serverCache.isFiltered(),
                      a = e.serverCache;
                    if (null != r.value) {
                      if (
                        (O(n) && a.isFullyInitialized()) ||
                        a.isCompleteForPath(n)
                      )
                        return qb(t, e, n, a.getNode().getChild(n), i, s, b, o);
                      if (O(n)) {
                        let l = new se(null);
                        return (
                          a.getNode().forEachChild(Qt, (u, c) => {
                            l = l.set(new z(u), c);
                          }),
                          pg(t, e, n, l, i, s, b, o)
                        );
                      }
                      return e;
                    }
                    {
                      let l = new se(null);
                      return (
                        r.foreach((u, c) => {
                          const g = ae(n, u);
                          a.isCompleteForPath(g) &&
                            (l = l.set(u, a.getNode().getChild(g)));
                        }),
                        pg(t, e, n, l, i, s, b, o)
                      );
                    }
                  })(t, e, l.path, l.affectedTree, r, i, s);
            } else {
              if (n.type !== pt.LISTEN_COMPLETE)
                throw ii("Unknown operation type: " + n.type);
              o = (function h1(t, e, n, r, i) {
                const s = e.serverCache;
                return ED(
                  t,
                  yD(
                    e,
                    s.getNode(),
                    s.isFullyInitialized() || O(n),
                    s.isFiltered()
                  ),
                  n,
                  r,
                  CD,
                  i
                );
              })(t, e, n.path, r, s);
            }
            const a = s.getChanges();
            return (
              (function d1(t, e, n) {
                const r = e.eventCache;
                if (r.isFullyInitialized()) {
                  const i = r.getNode().isLeafNode() || r.getNode().isEmpty(),
                    s = $b(t);
                  (n.length > 0 ||
                    !t.eventCache.isFullyInitialized() ||
                    (i && !r.getNode().equals(s)) ||
                    !r.getNode().getPriority().equals(s.getPriority())) &&
                    n.push(uD($b(e)));
                }
              })(e, o, a),
              { viewCache: o, changes: a }
            );
          })(t.processor_, i, e, n, r);
        return (
          (function c1(t, e) {
            v(
              e.eventCache.getNode().isIndexed(t.filter.getIndex()),
              "Event snap not indexed"
            ),
              v(
                e.serverCache.getNode().isIndexed(t.filter.getIndex()),
                "Server snap not indexed"
              );
          })(t.processor_, s.viewCache),
          v(
            s.viewCache.serverCache.isFullyInitialized() ||
              !i.serverCache.isFullyInitialized(),
            "Once a server snap is complete, it should never go back"
          ),
          (t.viewCache_ = s.viewCache),
          xD(t, s.changes, s.viewCache.eventCache.getNode(), null)
        );
      }
      function xD(t, e, n, r) {
        return (function WF(t, e, n, r) {
          const i = [],
            s = [];
          return (
            e.forEach((o) => {
              "child_changed" === o.type &&
                t.index_.indexedValueChanged(o.oldSnap, o.snapshotNode) &&
                s.push(
                  (function xF(t, e) {
                    return {
                      type: "child_moved",
                      snapshotNode: e,
                      childName: t,
                    };
                  })(o.childName, o.snapshotNode)
                );
            }),
            Bs(t, i, "child_removed", e, r, n),
            Bs(t, i, "child_added", e, r, n),
            Bs(t, i, "child_moved", s, r, n),
            Bs(t, i, "child_changed", e, r, n),
            Bs(t, i, "value", e, r, n),
            i
          );
        })(t.eventGenerator_, e, n, r ? [r] : t.eventRegistrations_);
      }
      let Qb, Kb;
      class ND {
        constructor() {
          this.views = new Map();
        }
      }
      function mg(t, e, n, r) {
        const i = e.source.queryId;
        if (null !== i) {
          const s = t.views.get(i);
          return (
            v(null != s, "SyncTree gave us an op for an invalid query."),
            AD(s, e, n, r)
          );
        }
        {
          let s = [];
          for (const o of t.views.values()) s = s.concat(AD(o, e, n, r));
          return s;
        }
      }
      function S1(t, e, n, r, i, s) {
        const o = (function PD(t, e, n, r, i) {
          const o = t.views.get(e._queryIdentifier);
          if (!o) {
            let b = Gb(n, i ? r : null),
              a = !1;
            b
              ? (a = !0)
              : r instanceof x
              ? ((b = dg(n, r)), (a = !1))
              : ((b = x.EMPTY_NODE), (a = !1));
            const l = Ub(new Pn(b, a, !1), new Pn(r, i, !1));
            return new m1(e, l);
          }
          return o;
        })(t, e, r, i, s);
        return (
          t.views.has(e._queryIdentifier) || t.views.set(e._queryIdentifier, o),
          (function w1(t, e) {
            t.eventRegistrations_.push(e);
          })(o, n),
          (function C1(t, e) {
            const n = t.viewCache_.eventCache,
              r = [];
            return (
              n.getNode().isLeafNode() ||
                n.getNode().forEachChild(ie, (s, o) => {
                  r.push(di(s, o));
                }),
              n.isFullyInitialized() && r.push(uD(n.getNode())),
              xD(t, r, n.getNode(), e)
            );
          })(o, n)
        );
      }
      function RD(t) {
        const e = [];
        for (const n of t.views.values())
          n.query._queryParams.loadsAllData() || e.push(n);
        return e;
      }
      function kn(t, e) {
        let n = null;
        for (const r of t.views.values()) n = n || D1(r, e);
        return n;
      }
      function kD(t, e) {
        return e._queryParams.loadsAllData()
          ? Yb(t)
          : t.views.get(e._queryIdentifier);
      }
      function FD(t, e) {
        return null != kD(t, e);
      }
      function Fn(t) {
        return null != Yb(t);
      }
      function Yb(t) {
        for (const e of t.views.values())
          if (e.query._queryParams.loadsAllData()) return e;
        return null;
      }
      let N1 = 1;
      class OD {
        constructor(e) {
          (this.listenProvider_ = e),
            (this.syncPointTree_ = new se(null)),
            (this.pendingWriteTree_ = (function o1() {
              return {
                visibleWrites: Nt.empty(),
                allWrites: [],
                lastWriteId: -1,
              };
            })()),
            (this.tagToQueryMap = new Map()),
            (this.queryToTagMap = new Map());
        }
      }
      function _g(t, e, n, r, i) {
        return (
          (function QF(t, e, n, r, i) {
            v(
              r > t.lastWriteId,
              "Stacking an older write on top of newer ones"
            ),
              void 0 === i && (i = !0),
              t.allWrites.push({ path: e, snap: n, writeId: r, visible: i }),
              i && (t.visibleWrites = js(t.visibleWrites, e, n)),
              (t.lastWriteId = r);
          })(t.pendingWriteTree_, e, n, r, i),
          i
            ? pi(
                t,
                new or(
                  { fromUser: !0, fromServer: !1, queryId: null, tagged: !1 },
                  e,
                  n
                )
              )
            : []
        );
      }
      function On(t, e, n = !1) {
        const r = (function KF(t, e) {
          for (let n = 0; n < t.allWrites.length; n++) {
            const r = t.allWrites[n];
            if (r.writeId === e) return r;
          }
          return null;
        })(t.pendingWriteTree_, e);
        if (
          (function ZF(t, e) {
            const n = t.allWrites.findIndex((b) => b.writeId === e);
            v(n >= 0, "removeWrite called with nonexistent writeId.");
            const r = t.allWrites[n];
            t.allWrites.splice(n, 1);
            let i = r.visible,
              s = !1,
              o = t.allWrites.length - 1;
            for (; i && o >= 0; ) {
              const b = t.allWrites[o];
              b.visible &&
                (o >= n && JF(b, r.path)
                  ? (i = !1)
                  : ht(r.path, b.path) && (s = !0)),
                o--;
            }
            return (
              !!i &&
              (s
                ? ((function XF(t) {
                    (t.visibleWrites = mD(t.allWrites, e1, W())),
                      (t.lastWriteId =
                        t.allWrites.length > 0
                          ? t.allWrites[t.allWrites.length - 1].writeId
                          : -1);
                  })(t),
                  !0)
                : (r.snap
                    ? (t.visibleWrites = fD(t.visibleWrites, r.path))
                    : Se(r.children, (a) => {
                        t.visibleWrites = fD(t.visibleWrites, ae(r.path, a));
                      }),
                  !0))
            );
          })(t.pendingWriteTree_, e)
        ) {
          let s = new se(null);
          return (
            null != r.snap
              ? (s = s.set(W(), !0))
              : Se(r.children, (o) => {
                  s = s.set(new z(o), !0);
                }),
            pi(t, new Hb(r.path, s, n))
          );
        }
        return [];
      }
      function Hs(t, e, n) {
        return pi(
          t,
          new or(
            { fromUser: !1, fromServer: !0, queryId: null, tagged: !1 },
            e,
            n
          )
        );
      }
      function Zb(t, e, n, r, i = !1) {
        const s = e._path,
          o = t.syncPointTree_.get(s);
        let b = [];
        if (o && ("default" === e._queryIdentifier || FD(o, e))) {
          const a = (function M1(t, e, n, r) {
            const i = e._queryIdentifier,
              s = [];
            let o = [];
            const b = Fn(t);
            if ("default" === i)
              for (const [a, l] of t.views.entries())
                (o = o.concat(MD(l, n, r))),
                  SD(l) &&
                    (t.views.delete(a),
                    l.query._queryParams.loadsAllData() || s.push(l.query));
            else {
              const a = t.views.get(i);
              a &&
                ((o = o.concat(MD(a, n, r))),
                SD(a) &&
                  (t.views.delete(i),
                  a.query._queryParams.loadsAllData() || s.push(a.query)));
            }
            return (
              b &&
                !Fn(t) &&
                s.push(
                  new ((function I1() {
                    return v(Qb, "Reference.ts has not been loaded"), Qb;
                  })())(e._repo, e._path)
                ),
              { removed: s, events: o }
            );
          })(o, e, n, r);
          (function T1(t) {
            return 0 === t.views.size;
          })(o) && (t.syncPointTree_ = t.syncPointTree_.remove(s));
          const l = a.removed;
          if (((b = a.events), !i)) {
            const u = -1 !== l.findIndex((g) => g._queryParams.loadsAllData()),
              c = t.syncPointTree_.findOnPath(s, (g, d) => Fn(d));
            if (u && !c) {
              const g = t.syncPointTree_.subtree(s);
              if (!g.isEmpty()) {
                const d = (function B1(t) {
                  return t.fold((e, n, r) => {
                    if (n && Fn(n)) return [Yb(n)];
                    {
                      let i = [];
                      return (
                        n && (i = RD(n)),
                        Se(r, (s, o) => {
                          i = i.concat(o);
                        }),
                        i
                      );
                    }
                  });
                })(g);
                for (let y = 0; y < d.length; ++y) {
                  const f = d[y],
                    p = f.query,
                    _ = jD(t, f);
                  t.listenProvider_.startListening(
                    $s(p),
                    Us(t, p),
                    _.hashFn,
                    _.onComplete
                  );
                }
              }
            }
            !c &&
              l.length > 0 &&
              !r &&
              (u
                ? t.listenProvider_.stopListening($s(e), null)
                : l.forEach((g) => {
                    const d = t.queryToTagMap.get(Xb(g));
                    t.listenProvider_.stopListening($s(g), d);
                  }));
          }
          !(function V1(t, e) {
            for (let n = 0; n < e.length; ++n) {
              const r = e[n];
              if (!r._queryParams.loadsAllData()) {
                const i = Xb(r),
                  s = t.queryToTagMap.get(i);
                t.queryToTagMap.delete(i), t.tagToQueryMap.delete(s);
              }
            }
          })(t, l);
        }
        return b;
      }
      function vg(t, e, n, r = !1) {
        const i = e._path;
        let s = null,
          o = !1;
        t.syncPointTree_.foreachOnPath(i, (g, d) => {
          const y = Ue(g, i);
          (s = s || kn(d, y)), (o = o || Fn(d));
        });
        let a,
          b = t.syncPointTree_.get(i);
        b
          ? ((o = o || Fn(b)), (s = s || kn(b, W())))
          : ((b = new ND()), (t.syncPointTree_ = t.syncPointTree_.set(i, b))),
          null != s
            ? (a = !0)
            : ((a = !1),
              (s = x.EMPTY_NODE),
              t.syncPointTree_.subtree(i).foreachChild((d, y) => {
                const f = kn(y, W());
                f && (s = s.updateImmediateChild(d, f));
              }));
        const l = FD(b, e);
        if (!l && !e._queryParams.loadsAllData()) {
          const g = Xb(e);
          v(!t.queryToTagMap.has(g), "View does not exist, but we have a tag");
          const d = (function j1() {
            return N1++;
          })();
          t.queryToTagMap.set(g, d), t.tagToQueryMap.set(d, g);
        }
        let c = S1(b, e, n, Wb(t.pendingWriteTree_, i), s, a);
        if (!l && !o && !r) {
          const g = kD(b, e);
          c = c.concat(
            (function H1(t, e, n) {
              const r = e._path,
                i = Us(t, e),
                s = jD(t, n),
                o = t.listenProvider_.startListening(
                  $s(e),
                  i,
                  s.hashFn,
                  s.onComplete
                ),
                b = t.syncPointTree_.subtree(r);
              if (i)
                v(
                  !Fn(b.value),
                  "If we're adding a query, it shouldn't be shadowed"
                );
              else {
                const a = b.fold((l, u, c) => {
                  if (!O(l) && u && Fn(u)) return [Yb(u).query];
                  {
                    let g = [];
                    return (
                      u && (g = g.concat(RD(u).map((d) => d.query))),
                      Se(c, (d, y) => {
                        g = g.concat(y);
                      }),
                      g
                    );
                  }
                });
                for (let l = 0; l < a.length; ++l) {
                  const u = a[l];
                  t.listenProvider_.stopListening($s(u), Us(t, u));
                }
              }
              return o;
            })(t, e, g)
          );
        }
        return c;
      }
      function Jb(t, e, n) {
        const i = t.pendingWriteTree_,
          s = t.syncPointTree_.findOnPath(e, (o, b) => {
            const l = kn(b, Ue(o, e));
            if (l) return l;
          });
        return _D(i, e, s, n, !0);
      }
      function pi(t, e) {
        return BD(e, t.syncPointTree_, null, Wb(t.pendingWriteTree_, W()));
      }
      function BD(t, e, n, r) {
        if (O(t.path)) return VD(t, e, n, r);
        {
          const i = e.get(W());
          null == n && null != i && (n = kn(i, W()));
          let s = [];
          const o = F(t.path),
            b = t.operationForChild(o),
            a = e.children.get(o);
          if (a && b) {
            const l = n ? n.getImmediateChild(o) : null,
              u = DD(r, o);
            s = s.concat(BD(b, a, l, u));
          }
          return i && (s = s.concat(mg(i, t, r, n))), s;
        }
      }
      function VD(t, e, n, r) {
        const i = e.get(W());
        null == n && null != i && (n = kn(i, W()));
        let s = [];
        return (
          e.children.inorderTraversal((o, b) => {
            const a = n ? n.getImmediateChild(o) : null,
              l = DD(r, o),
              u = t.operationForChild(o);
            u && (s = s.concat(VD(u, b, a, l)));
          }),
          i && (s = s.concat(mg(i, t, r, n))),
          s
        );
      }
      function jD(t, e) {
        const n = e.query,
          r = Us(t, n);
        return {
          hashFn: () =>
            (
              (function _1(t) {
                return t.viewCache_.serverCache.getNode();
              })(e) || x.EMPTY_NODE
            ).hash(),
          onComplete: (i) => {
            if ("ok" === i)
              return r
                ? (function F1(t, e, n) {
                    const r = Dg(t, n);
                    if (r) {
                      const i = wg(r),
                        s = i.path,
                        o = i.queryId,
                        b = Ue(s, e);
                      return Cg(t, s, new Ls(ag(o), b));
                    }
                    return [];
                  })(t, n._path, r)
                : (function k1(t, e) {
                    return pi(
                      t,
                      new Ls(
                        {
                          fromUser: !1,
                          fromServer: !0,
                          queryId: null,
                          tagged: !1,
                        },
                        e
                      )
                    );
                  })(t, n._path);
            {
              const s = (function Rk(t, e) {
                let n = "Unknown Error";
                "too_big" === t
                  ? (n =
                      "The data requested exceeds the maximum size that can be accessed with a single request.")
                  : "permission_denied" === t
                  ? (n =
                      "Client doesn't have permission to access the desired data.")
                  : "unavailable" === t && (n = "The service is unavailable");
                const r = new Error(t + " at " + e._path.toString() + ": " + n);
                return (r.code = t.toUpperCase()), r;
              })(i, n);
              return Zb(t, n, null, s);
            }
          },
        };
      }
      function Us(t, e) {
        const n = Xb(e);
        return t.queryToTagMap.get(n);
      }
      function Xb(t) {
        return t._path.toString() + "$" + t._queryIdentifier;
      }
      function Dg(t, e) {
        return t.tagToQueryMap.get(e);
      }
      function wg(t) {
        const e = t.indexOf("$");
        return (
          v(-1 !== e && e < t.length - 1, "Bad queryKey."),
          { queryId: t.substr(e + 1), path: new z(t.substr(0, e)) }
        );
      }
      function Cg(t, e, n) {
        const r = t.syncPointTree_.get(e);
        return (
          v(r, "Missing sync point for query tag that we're tracking"),
          mg(r, n, Wb(t.pendingWriteTree_, e), null)
        );
      }
      function $s(t) {
        return t._queryParams.loadsAllData() && !t._queryParams.isDefault()
          ? new ((function x1() {
              return v(Kb, "Reference.ts has not been loaded"), Kb;
            })())(t._repo, t._path)
          : t;
      }
      class Eg {
        constructor(e) {
          this.node_ = e;
        }
        getImmediateChild(e) {
          const n = this.node_.getImmediateChild(e);
          return new Eg(n);
        }
        node() {
          return this.node_;
        }
      }
      class Ig {
        constructor(e, n) {
          (this.syncTree_ = e), (this.path_ = n);
        }
        getImmediateChild(e) {
          const n = ae(this.path_, e);
          return new Ig(this.syncTree_, n);
        }
        node() {
          return Jb(this.syncTree_, this.path_);
        }
      }
      const HD = function (t, e, n) {
          return t && "object" == typeof t
            ? (v(".sv" in t, "Unexpected leaf node or priority contents"),
              "string" == typeof t[".sv"]
                ? $1(t[".sv"], e, n)
                : "object" == typeof t[".sv"]
                ? W1(t[".sv"], e)
                : void v(
                    !1,
                    "Unexpected server value: " + JSON.stringify(t, null, 2)
                  ))
            : t;
        },
        $1 = function (t, e, n) {
          if ("timestamp" === t) return n.timestamp;
          v(!1, "Unexpected server value: " + t);
        },
        W1 = function (t, e, n) {
          t.hasOwnProperty("increment") ||
            v(!1, "Unexpected server value: " + JSON.stringify(t, null, 2));
          const r = t.increment;
          "number" != typeof r && v(!1, "Unexpected increment value: " + r);
          const i = e.node();
          if (
            (v(null != i, "Expected ChildrenNode.EMPTY_NODE for nulls"),
            !i.isLeafNode())
          )
            return r;
          const o = i.getValue();
          return "number" != typeof o ? r : o + r;
        },
        Tg = function (t, e, n) {
          return Sg(t, new Eg(e), n);
        };
      function Sg(t, e, n) {
        const r = t.getPriority().val(),
          i = HD(r, e.getImmediateChild(".priority"), n);
        let s;
        if (t.isLeafNode()) {
          const o = t,
            b = HD(o.getValue(), e, n);
          return b !== o.getValue() || i !== o.getPriority().val()
            ? new ci(b, ue(i))
            : t;
        }
        {
          const o = t;
          return (
            (s = o),
            i !== o.getPriority().val() && (s = s.updatePriority(new ci(i))),
            o.forEachChild(ie, (b, a) => {
              const l = Sg(a, e.getImmediateChild(b), n);
              l !== a && (s = s.updateImmediateChild(b, l));
            }),
            s
          );
        }
      }
      class Mg {
        constructor(e = "", n = null, r = { children: {}, childCount: 0 }) {
          (this.name = e), (this.parent = n), (this.node = r);
        }
      }
      function ea(t, e) {
        let n = e instanceof z ? e : new z(e),
          r = t,
          i = F(n);
        for (; null !== i; ) {
          const s = si(r.node.children, i) || { children: {}, childCount: 0 };
          (r = new Mg(i, r, s)), (n = te(n)), (i = F(n));
        }
        return r;
      }
      function lr(t) {
        return t.node.value;
      }
      function Ag(t, e) {
        (t.node.value = e), xg(t);
      }
      function $D(t) {
        return t.node.childCount > 0;
      }
      function ta(t, e) {
        Se(t.node.children, (n, r) => {
          e(new Mg(n, t, r));
        });
      }
      function WD(t, e, n, r) {
        n && !r && e(t),
          ta(t, (i) => {
            WD(i, e, !0, r);
          }),
          n && r && e(t);
      }
      function Ws(t) {
        return new z(null === t.parent ? t.name : Ws(t.parent) + "/" + t.name);
      }
      function xg(t) {
        null !== t.parent &&
          (function q1(t, e, n) {
            const r = (function G1(t) {
                return void 0 === lr(t) && !$D(t);
              })(n),
              i = ln(t.node.children, e);
            r && i
              ? (delete t.node.children[e], t.node.childCount--, xg(t))
              : !r &&
                !i &&
                ((t.node.children[e] = n.node), t.node.childCount++, xg(t));
          })(t.parent, t.name, t);
      }
      const Q1 = /[\[\].#$\/\u0000-\u001F\u007F]/,
        Y1 = /[\[\].#$\u0000-\u001F\u007F]/,
        Ng = 10485760,
        na = function (t) {
          return "string" == typeof t && 0 !== t.length && !Q1.test(t);
        },
        GD = function (t) {
          return "string" == typeof t && 0 !== t.length && !Y1.test(t);
        },
        zs = function (t, e, n) {
          const r = n instanceof z ? new gF(n, t) : n;
          if (void 0 === e) throw new Error(t + "contains undefined " + ir(r));
          if ("function" == typeof e)
            throw new Error(
              t +
                "contains a function " +
                ir(r) +
                " with contents = " +
                e.toString()
            );
          if (xb(e))
            throw new Error(t + "contains " + e.toString() + " " + ir(r));
          if ("string" == typeof e && e.length > Ng / 3 && Tb(e) > Ng)
            throw new Error(
              t +
                "contains a string greater than " +
                Ng +
                " utf8 bytes " +
                ir(r) +
                " ('" +
                e.substring(0, 50) +
                "...')"
            );
          if (e && "object" == typeof e) {
            let i = !1,
              s = !1;
            if (
              (Se(e, (o, b) => {
                if (".value" === o) i = !0;
                else if (".priority" !== o && ".sv" !== o && ((s = !0), !na(o)))
                  throw new Error(
                    t +
                      " contains an invalid key (" +
                      o +
                      ") " +
                      ir(r) +
                      '.  Keys must be non-empty strings and can\'t contain ".", "#", "$", "/", "[", or "]"'
                  );
                (function dF(t, e) {
                  t.parts_.length > 0 && (t.byteLength_ += 1),
                    t.parts_.push(e),
                    (t.byteLength_ += Tb(e)),
                    tD(t);
                })(r, o),
                  zs(t, b, r),
                  (function yF(t) {
                    const e = t.parts_.pop();
                    (t.byteLength_ -= Tb(e)),
                      t.parts_.length > 0 && (t.byteLength_ -= 1);
                  })(r);
              }),
              i && s)
            )
              throw new Error(
                t +
                  ' contains ".value" child ' +
                  ir(r) +
                  " in addition to actual children."
              );
          }
        },
        Rg = function (t, e, n, r) {
          if (!((r && void 0 === n) || GD(n)))
            throw new Error(
              oi(t, e) +
                'was an invalid path = "' +
                n +
                '". Paths must be non-empty strings and can\'t contain ".", "#", "$", "[", or "]"'
            );
        };
      class X1 {
        constructor() {
          (this.eventLists_ = []), (this.recursionDepth_ = 0);
        }
      }
      function ra(t, e) {
        let n = null;
        for (let r = 0; r < e.length; r++) {
          const i = e[r],
            s = i.getPath();
          null !== n && !qc(s, n.path) && (t.eventLists_.push(n), (n = null)),
            null === n && (n = { events: [], path: s }),
            n.events.push(i);
        }
        n && t.eventLists_.push(n);
      }
      function QD(t, e, n) {
        ra(t, n), YD(t, (r) => qc(r, e));
      }
      function it(t, e, n) {
        ra(t, n), YD(t, (r) => ht(r, e) || ht(e, r));
      }
      function YD(t, e) {
        t.recursionDepth_++;
        let n = !0;
        for (let r = 0; r < t.eventLists_.length; r++) {
          const i = t.eventLists_[r];
          i &&
            (e(i.path)
              ? (eO(t.eventLists_[r]), (t.eventLists_[r] = null))
              : (n = !1));
        }
        n && (t.eventLists_ = []), t.recursionDepth_--;
      }
      function eO(t) {
        for (let e = 0; e < t.events.length; e++) {
          const n = t.events[e];
          if (null !== n) {
            t.events[e] = null;
            const r = n.getEventRunner();
            nr && Te("event: " + n.toString()), li(r);
          }
        }
      }
      class nO {
        constructor(e, n, r, i) {
          (this.repoInfo_ = e),
            (this.forceRestClient_ = n),
            (this.authTokenProvider_ = r),
            (this.appCheckProvider_ = i),
            (this.dataUpdateCount = 0),
            (this.statsListener_ = null),
            (this.eventQueue_ = new X1()),
            (this.nextWriteId_ = 1),
            (this.interceptServerDataCallback_ = null),
            (this.onDisconnect_ = jb()),
            (this.transactionQueueTree_ = new Mg()),
            (this.persistentConnection_ = null),
            (this.key = this.repoInfo_.toURLString());
        }
        toString() {
          return (
            (this.repoInfo_.secure ? "https://" : "http://") +
            this.repoInfo_.host
          );
        }
      }
      function ZD(t) {
        const n =
          t.infoData_.getNode(new z(".info/serverTimeOffset")).val() || 0;
        return new Date().getTime() + n;
      }
      function Qs(t) {
        return (function (t) {
          return (
            ((t = t || {}).timestamp = t.timestamp || new Date().getTime()), t
          );
        })({ timestamp: ZD(t) });
      }
      function JD(t, e, n, r, i) {
        t.dataUpdateCount++;
        const s = new z(e);
        n = t.interceptServerDataCallback_
          ? t.interceptServerDataCallback_(e, n)
          : n;
        let o = [];
        if (i)
          if (r) {
            const a = Ib(n, (l) => ue(l));
            o = (function O1(t, e, n, r) {
              const i = Dg(t, r);
              if (i) {
                const s = wg(i),
                  o = s.path,
                  b = s.queryId,
                  a = Ue(o, e),
                  l = se.fromObject(n);
                return Cg(t, o, new fi(ag(b), a, l));
              }
              return [];
            })(t.serverSyncTree_, s, a, i);
          } else {
            const a = ue(n);
            o = (function LD(t, e, n, r) {
              const i = Dg(t, r);
              if (null != i) {
                const s = wg(i),
                  o = s.path,
                  b = s.queryId,
                  a = Ue(o, e);
                return Cg(t, o, new or(ag(b), a, n));
              }
              return [];
            })(t.serverSyncTree_, s, a, i);
          }
        else if (r) {
          const a = Ib(n, (l) => ue(l));
          o = (function R1(t, e, n) {
            const r = se.fromObject(n);
            return pi(
              t,
              new fi(
                { fromUser: !1, fromServer: !0, queryId: null, tagged: !1 },
                e,
                r
              )
            );
          })(t.serverSyncTree_, s, a);
        } else {
          const a = ue(n);
          o = Hs(t.serverSyncTree_, s, a);
        }
        let b = s;
        o.length > 0 && (b = _i(t, s)), it(t.eventQueue_, b, o);
      }
      function XD(t, e) {
        kg(t, "connected", e),
          !1 === e &&
            (function bO(t) {
              mi(t, "onDisconnectEvents");
              const e = Qs(t),
                n = jb();
              sg(t.onDisconnect_, W(), (i, s) => {
                const o = (function (t, e, n, r) {
                  return Sg(e, new Ig(n, t), r);
                })(i, s, t.serverSyncTree_, e);
                yi(n, i, o);
              });
              let r = [];
              sg(n, W(), (i, s) => {
                r = r.concat(Hs(t.serverSyncTree_, i, s));
                const o = Bg(t, i);
                _i(t, o);
              }),
                (t.onDisconnect_ = jb()),
                it(t.eventQueue_, W(), r);
            })(t);
      }
      function kg(t, e, n) {
        const r = new z("/.info/" + e),
          i = ue(n);
        t.infoData_.updateSnapshot(r, i);
        const s = Hs(t.infoSyncTree_, r, i);
        it(t.eventQueue_, r, s);
      }
      function ia(t) {
        return t.nextWriteId_++;
      }
      function Fg(t, e, n, r, i) {
        mi(t, "set", { path: e.toString(), value: n, priority: r });
        const s = Qs(t),
          o = ue(n, r),
          b = Jb(t.serverSyncTree_, e),
          a = Tg(o, b, s),
          l = ia(t),
          u = _g(t.serverSyncTree_, e, a, l, !0);
        ra(t.eventQueue_, u),
          t.server_.put(e.toString(), o.val(!0), (g, d) => {
            const y = "ok" === g;
            y || Fe("set at " + e + " failed: " + g);
            const f = On(t.serverSyncTree_, l, !y);
            it(t.eventQueue_, e, f),
              (function Ln(t, e, n, r) {
                e &&
                  li(() => {
                    if ("ok" === n) e(null);
                    else {
                      const i = (n || "error").toUpperCase();
                      let s = i;
                      r && (s += ": " + r);
                      const o = new Error(s);
                      (o.code = i), e(o);
                    }
                  });
              })(0, i, g, d);
          });
        const c = Bg(t, e);
        _i(t, c), it(t.eventQueue_, c, []);
      }
      function Og(t, e, n) {
        let r;
        (r =
          ".info" === F(e._path)
            ? Zb(t.infoSyncTree_, e, n)
            : Zb(t.serverSyncTree_, e, n)),
          QD(t.eventQueue_, e._path, r);
      }
      function mi(t, ...e) {
        let n = "";
        t.persistentConnection_ && (n = t.persistentConnection_.id + ":"),
          Te(n, ...e);
      }
      function Lg(t, e, n) {
        return Jb(t.serverSyncTree_, e, n) || x.EMPTY_NODE;
      }
      function sa(t, e = t.transactionQueueTree_) {
        if ((e || oa(t, e), lr(e))) {
          const n = rw(t, e);
          v(n.length > 0, "Sending zero length transaction queue"),
            n.every((i) => 0 === i.status) &&
              (function yO(t, e, n) {
                const r = n.map((l) => l.currentWriteId),
                  i = Lg(t, e, r);
                let s = i;
                const o = i.hash();
                for (let l = 0; l < n.length; l++) {
                  const u = n[l];
                  v(
                    0 === u.status,
                    "tryToSendTransactionQueue_: items in queue should all be run."
                  ),
                    (u.status = 1),
                    u.retryCount++;
                  const c = Ue(e, u.path);
                  s = s.updateChild(c, u.currentOutputSnapshotRaw);
                }
                const b = s.val(!0),
                  a = e;
                t.server_.put(
                  a.toString(),
                  b,
                  (l) => {
                    mi(t, "transaction put response", {
                      path: a.toString(),
                      status: l,
                    });
                    let u = [];
                    if ("ok" === l) {
                      const c = [];
                      for (let g = 0; g < n.length; g++)
                        (n[g].status = 2),
                          (u = u.concat(
                            On(t.serverSyncTree_, n[g].currentWriteId)
                          )),
                          n[g].onComplete &&
                            c.push(() =>
                              n[g].onComplete(
                                null,
                                !0,
                                n[g].currentOutputSnapshotResolved
                              )
                            ),
                          n[g].unwatcher();
                      oa(t, ea(t.transactionQueueTree_, e)),
                        sa(t, t.transactionQueueTree_),
                        it(t.eventQueue_, e, u);
                      for (let g = 0; g < c.length; g++) li(c[g]);
                    } else {
                      if ("datastale" === l)
                        for (let c = 0; c < n.length; c++)
                          n[c].status = 3 === n[c].status ? 4 : 0;
                      else {
                        Fe("transaction at " + a.toString() + " failed: " + l);
                        for (let c = 0; c < n.length; c++)
                          (n[c].status = 4), (n[c].abortReason = l);
                      }
                      _i(t, e);
                    }
                  },
                  o
                );
              })(t, Ws(e), n);
        } else
          $D(e) &&
            ta(e, (n) => {
              sa(t, n);
            });
      }
      function _i(t, e) {
        const n = nw(t, e),
          r = Ws(n);
        return (
          (function fO(t, e, n) {
            if (0 === e.length) return;
            const r = [];
            let i = [];
            const o = e
              .filter((b) => 0 === b.status)
              .map((b) => b.currentWriteId);
            for (let b = 0; b < e.length; b++) {
              const a = e[b],
                l = Ue(n, a.path);
              let c,
                u = !1;
              if (
                (v(
                  null !== l,
                  "rerunTransactionsUnderNode_: relativePath should not be null."
                ),
                4 === a.status)
              )
                (u = !0),
                  (c = a.abortReason),
                  (i = i.concat(On(t.serverSyncTree_, a.currentWriteId, !0)));
              else if (0 === a.status)
                if (a.retryCount >= 25)
                  (u = !0),
                    (c = "maxretry"),
                    (i = i.concat(On(t.serverSyncTree_, a.currentWriteId, !0)));
                else {
                  const g = Lg(t, a.path, o);
                  a.currentInputSnapshot = g;
                  const d = e[b].update(g.val());
                  if (void 0 !== d) {
                    zs("transaction failed: Data returned ", d, a.path);
                    let y = ue(d);
                    ("object" == typeof d && null != d && ln(d, ".priority")) ||
                      (y = y.updatePriority(g.getPriority()));
                    const p = a.currentWriteId,
                      _ = Qs(t),
                      h = Tg(y, g, _);
                    (a.currentOutputSnapshotRaw = y),
                      (a.currentOutputSnapshotResolved = h),
                      (a.currentWriteId = ia(t)),
                      o.splice(o.indexOf(p), 1),
                      (i = i.concat(
                        _g(
                          t.serverSyncTree_,
                          a.path,
                          h,
                          a.currentWriteId,
                          a.applyLocally
                        )
                      )),
                      (i = i.concat(On(t.serverSyncTree_, p, !0)));
                  } else
                    (u = !0),
                      (c = "nodata"),
                      (i = i.concat(
                        On(t.serverSyncTree_, a.currentWriteId, !0)
                      ));
                }
              it(t.eventQueue_, n, i),
                (i = []),
                u &&
                  ((e[b].status = 2),
                  setTimeout(e[b].unwatcher, Math.floor(0)),
                  e[b].onComplete &&
                    r.push(
                      "nodata" === c
                        ? () =>
                            e[b].onComplete(null, !1, e[b].currentInputSnapshot)
                        : () => e[b].onComplete(new Error(c), !1, null)
                    ));
            }
            oa(t, t.transactionQueueTree_);
            for (let b = 0; b < r.length; b++) li(r[b]);
            sa(t, t.transactionQueueTree_);
          })(t, rw(t, n), r),
          r
        );
      }
      function nw(t, e) {
        let n,
          r = t.transactionQueueTree_;
        for (n = F(e); null !== n && void 0 === lr(r); )
          (r = ea(r, n)), (n = F((e = te(e))));
        return r;
      }
      function rw(t, e) {
        const n = [];
        return iw(t, e, n), n.sort((r, i) => r.order - i.order), n;
      }
      function iw(t, e, n) {
        const r = lr(e);
        if (r) for (let i = 0; i < r.length; i++) n.push(r[i]);
        ta(e, (i) => {
          iw(t, i, n);
        });
      }
      function oa(t, e) {
        const n = lr(e);
        if (n) {
          let r = 0;
          for (let i = 0; i < n.length; i++)
            2 !== n[i].status && ((n[r] = n[i]), r++);
          (n.length = r), Ag(e, n.length > 0 ? n : void 0);
        }
        ta(e, (r) => {
          oa(t, r);
        });
      }
      function Bg(t, e) {
        const n = Ws(nw(t, e)),
          r = ea(t.transactionQueueTree_, e);
        return (
          (function z1(t, e, n) {
            let r = n ? t : t.parent;
            for (; null !== r; ) {
              if (e(r)) return !0;
              r = r.parent;
            }
          })(r, (i) => {
            Vg(t, i);
          }),
          Vg(t, r),
          WD(r, (i) => {
            Vg(t, i);
          }),
          n
        );
      }
      function Vg(t, e) {
        const n = lr(e);
        if (n) {
          const r = [];
          let i = [],
            s = -1;
          for (let o = 0; o < n.length; o++)
            3 === n[o].status ||
              (1 === n[o].status
                ? (v(
                    s === o - 1,
                    "All SENT items should be at beginning of queue."
                  ),
                  (s = o),
                  (n[o].status = 3),
                  (n[o].abortReason = "set"))
                : (v(
                    0 === n[o].status,
                    "Unexpected transaction status in abort"
                  ),
                  n[o].unwatcher(),
                  (i = i.concat(
                    On(t.serverSyncTree_, n[o].currentWriteId, !0)
                  )),
                  n[o].onComplete &&
                    r.push(
                      n[o].onComplete.bind(null, new Error("set"), !1, null)
                    )));
          -1 === s ? Ag(e, void 0) : (n.length = s + 1),
            it(t.eventQueue_, Ws(e), i);
          for (let o = 0; o < r.length; o++) li(r[o]);
        }
      }
      const jg = function (t, e) {
          const n = mO(t),
            r = n.namespace;
          return (
            "firebase.com" === n.domain &&
              qt(
                n.host +
                  " is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead"
              ),
            (!r || "undefined" === r) &&
              "localhost" !== n.domain &&
              qt(
                "Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com"
              ),
            n.secure ||
              ("undefined" != typeof window &&
                window.location &&
                window.location.protocol &&
                -1 !== window.location.protocol.indexOf("https:") &&
                Fe(
                  "Insecure Firebase access from a secure page. Please use https in calls to new Firebase()."
                )),
            {
              repoInfo: new jc(
                n.host,
                n.secure,
                r,
                "ws" === n.scheme || "wss" === n.scheme,
                e,
                "",
                r !== n.subdomain
              ),
              path: new z(n.pathString),
            }
          );
        },
        mO = function (t) {
          let e = "",
            n = "",
            r = "",
            i = "",
            s = "",
            o = !0,
            b = "https",
            a = 443;
          if ("string" == typeof t) {
            let l = t.indexOf("//");
            l >= 0 && ((b = t.substring(0, l - 1)), (t = t.substring(l + 2)));
            let u = t.indexOf("/");
            -1 === u && (u = t.length);
            let c = t.indexOf("?");
            -1 === c && (c = t.length),
              (e = t.substring(0, Math.min(u, c))),
              u < c &&
                (i = (function hO(t) {
                  let e = "";
                  const n = t.split("/");
                  for (let r = 0; r < n.length; r++)
                    if (n[r].length > 0) {
                      let i = n[r];
                      try {
                        i = decodeURIComponent(i.replace(/\+/g, " "));
                      } catch (s) {}
                      e += "/" + i;
                    }
                  return e;
                })(t.substring(u, c)));
            const g = (function pO(t) {
              const e = {};
              "?" === t.charAt(0) && (t = t.substring(1));
              for (const n of t.split("&")) {
                if (0 === n.length) continue;
                const r = n.split("=");
                2 === r.length
                  ? (e[decodeURIComponent(r[0])] = decodeURIComponent(r[1]))
                  : Fe(`Invalid query segment '${n}' in query '${t}'`);
              }
              return e;
            })(t.substring(Math.min(t.length, c)));
            (l = e.indexOf(":")),
              l >= 0
                ? ((o = "https" === b || "wss" === b),
                  (a = parseInt(e.substring(l + 1), 10)))
                : (l = e.length);
            const d = e.slice(0, l);
            if ("localhost" === d.toLowerCase()) n = "localhost";
            else if (d.split(".").length <= 2) n = d;
            else {
              const y = e.indexOf(".");
              (r = e.substring(0, y).toLowerCase()),
                (n = e.substring(y + 1)),
                (s = r);
            }
            "ns" in g && (s = g.ns);
          }
          return {
            host: e,
            port: a,
            domain: n,
            subdomain: r,
            secure: o,
            scheme: b,
            pathString: i,
            namespace: s,
          };
        };
      class ow {
        constructor(e, n, r, i) {
          (this.eventType = e),
            (this.eventRegistration = n),
            (this.snapshot = r),
            (this.prevName = i);
        }
        getPath() {
          const e = this.snapshot.ref;
          return "value" === this.eventType ? e._path : e.parent._path;
        }
        getEventType() {
          return this.eventType;
        }
        getEventRunner() {
          return this.eventRegistration.getEventRunner(this);
        }
        toString() {
          return (
            this.getPath().toString() +
            ":" +
            this.eventType +
            ":" +
            Ie(this.snapshot.exportVal())
          );
        }
      }
      class bw {
        constructor(e, n, r) {
          (this.eventRegistration = e), (this.error = n), (this.path = r);
        }
        getPath() {
          return this.path;
        }
        getEventType() {
          return "cancel";
        }
        getEventRunner() {
          return this.eventRegistration.getEventRunner(this);
        }
        toString() {
          return this.path.toString() + ":cancel";
        }
      }
      class Hg {
        constructor(e, n) {
          (this.snapshotCallback = e), (this.cancelCallback = n);
        }
        onValue(e, n) {
          this.snapshotCallback.call(null, e, n);
        }
        onCancel(e) {
          return (
            v(
              this.hasCancelCallback,
              "Raising a cancel event on a listener with no cancel callback"
            ),
            this.cancelCallback.call(null, e)
          );
        }
        get hasCancelCallback() {
          return !!this.cancelCallback;
        }
        matches(e) {
          return (
            this.snapshotCallback === e.snapshotCallback ||
            (void 0 !== this.snapshotCallback.userCallback &&
              this.snapshotCallback.userCallback ===
                e.snapshotCallback.userCallback &&
              this.snapshotCallback.context === e.snapshotCallback.context)
          );
        }
      }
      class st {
        constructor(e, n, r, i) {
          (this._repo = e),
            (this._path = n),
            (this._queryParams = r),
            (this._orderByCalled = i);
        }
        get key() {
          return O(this._path) ? null : zc(this._path);
        }
        get ref() {
          return new Pt(this._repo, this._path);
        }
        get _queryIdentifier() {
          const e = gD(this._queryParams),
            n = Bc(e);
          return "{}" === n ? "default" : n;
        }
        get _queryObject() {
          return gD(this._queryParams);
        }
        isEqual(e) {
          if (!((e = ws(e)) instanceof st)) return !1;
          const n = this._repo === e._repo,
            r = qc(this._path, e._path);
          return n && r && this._queryIdentifier === e._queryIdentifier;
        }
        toJSON() {
          return this.toString();
        }
        toString() {
          return (
            this._repo.toString() +
            (function uF(t) {
              let e = "";
              for (let n = t.pieceNum_; n < t.pieces_.length; n++)
                "" !== t.pieces_[n] &&
                  (e += "/" + encodeURIComponent(String(t.pieces_[n])));
              return e || "/";
            })(this._path)
          );
        }
      }
      class Pt extends st {
        constructor(e, n) {
          super(e, n, new tg(), !1);
        }
        get parent() {
          const e = eD(this._path);
          return null === e ? null : new Pt(this._repo, e);
        }
        get root() {
          let e = this;
          for (; null !== e.parent; ) e = e.parent;
          return e;
        }
      }
      class ur {
        constructor(e, n, r) {
          (this._node = e), (this.ref = n), (this._index = r);
        }
        get priority() {
          return this._node.getPriority().val();
        }
        get key() {
          return this.ref.key;
        }
        get size() {
          return this._node.numChildren();
        }
        child(e) {
          const n = new z(e),
            r = vi(this.ref, e);
          return new ur(this._node.getChild(n), r, ie);
        }
        exists() {
          return !this._node.isEmpty();
        }
        exportVal() {
          return this._node.val(!0);
        }
        forEach(e) {
          return (
            !this._node.isLeafNode() &&
            !!this._node.forEachChild(this._index, (r, i) =>
              e(new ur(i, vi(this.ref, r), ie))
            )
          );
        }
        hasChild(e) {
          const n = new z(e);
          return !this._node.getChild(n).isEmpty();
        }
        hasChildren() {
          return !this._node.isLeafNode() && !this._node.isEmpty();
        }
        toJSON() {
          return this.exportVal();
        }
        val() {
          return this._node.val();
        }
      }
      function Ug(t, e) {
        return (
          (t = ws(t))._checkNotDeleted("ref"),
          void 0 !== e ? vi(t._root, e) : t._root
        );
      }
      function vi(t, e) {
        return (
          null === F((t = ws(t))._path)
            ? ((n = e),
              n && (n = n.replace(/^\/*\.info(\/|$)/, "/")),
              Rg("child", "path", n, !1))
            : Rg("child", "path", e, !1),
          new Pt(t._repo, ae(t._path, e))
        );
        var n;
      }
      function $g(t, e) {
        (function (t, e) {
          if (".info" === F(e))
            throw new Error(t + " failed = Can't modify data under /.info/");
        })("set", (t = ws(t))._path),
          (function (t, e, n, r) {
            (r && void 0 === e) || zs(oi(t, "value"), e, n);
          })("set", e, t._path, !1);
        const n = new _s();
        return (
          Fg(
            t._repo,
            t._path,
            e,
            null,
            n.wrapCallback(() => {})
          ),
          n.promise
        );
      }
      class Ys {
        constructor(e) {
          this.callbackContext = e;
        }
        respondsTo(e) {
          return "value" === e;
        }
        createEvent(e, n) {
          const r = n._queryParams.getIndex();
          return new ow(
            "value",
            this,
            new ur(e.snapshotNode, new Pt(n._repo, n._path), r)
          );
        }
        getEventRunner(e) {
          return "cancel" === e.getEventType()
            ? () => this.callbackContext.onCancel(e.error)
            : () => this.callbackContext.onValue(e.snapshot, null);
        }
        createCancelEvent(e, n) {
          return this.callbackContext.hasCancelCallback
            ? new bw(this, e, n)
            : null;
        }
        matches(e) {
          return (
            e instanceof Ys &&
            (!e.callbackContext ||
              !this.callbackContext ||
              e.callbackContext.matches(this.callbackContext))
          );
        }
        hasAnyCallback() {
          return null !== this.callbackContext;
        }
      }
      class la {
        constructor(e, n) {
          (this.eventType = e), (this.callbackContext = n);
        }
        respondsTo(e) {
          let n = "children_added" === e ? "child_added" : e;
          return (
            (n = "children_removed" === n ? "child_removed" : n),
            this.eventType === n
          );
        }
        createCancelEvent(e, n) {
          return this.callbackContext.hasCancelCallback
            ? new bw(this, e, n)
            : null;
        }
        createEvent(e, n) {
          v(null != e.childName, "Child events should have a childName.");
          const r = vi(new Pt(n._repo, n._path), e.childName),
            i = n._queryParams.getIndex();
          return new ow(e.type, this, new ur(e.snapshotNode, r, i), e.prevName);
        }
        getEventRunner(e) {
          return "cancel" === e.getEventType()
            ? () => this.callbackContext.onCancel(e.error)
            : () => this.callbackContext.onValue(e.snapshot, e.prevName);
        }
        matches(e) {
          return (
            e instanceof la &&
            this.eventType === e.eventType &&
            (!this.callbackContext ||
              !e.callbackContext ||
              this.callbackContext.matches(e.callbackContext))
          );
        }
        hasAnyCallback() {
          return !!this.callbackContext;
        }
      }
      function aw(t, e, n, r) {
        return (function Ks(t, e, n, r, i) {
          let s;
          if (
            ("object" == typeof r && ((s = void 0), (i = r)),
            "function" == typeof r && (s = r),
            i && i.onlyOnce)
          ) {
            const a = n,
              l = (u, c) => {
                Og(t._repo, t, b), a(u, c);
              };
            (l.userCallback = n.userCallback), (l.context = n.context), (n = l);
          }
          const o = new Hg(n, s || void 0),
            b = "value" === e ? new Ys(o) : new la(e, o);
          return (
            (function cO(t, e, n) {
              let r;
              (r =
                ".info" === F(e._path)
                  ? vg(t.infoSyncTree_, e, n)
                  : vg(t.serverSyncTree_, e, n)),
                QD(t.eventQueue_, e._path, r);
            })(t._repo, t, b),
            () => Og(t._repo, t, b)
          );
        })(t, "value", e, n, r);
      }
      (function E1(t) {
        v(!Qb, "__referenceConstructor has already been defined"), (Qb = t);
      })(Pt),
        (function A1(t) {
          v(!Kb, "__referenceConstructor has already been defined"), (Kb = t);
        })(Pt);
      const Wg = {};
      function PO(t, e, n, r, i) {
        let s = r || t.options.databaseURL;
        void 0 === s &&
          (t.options.projectId ||
            qt(
              "Can't determine Firebase Database URL. Be sure to include  a Project ID when calling firebase.initializeApp()."
            ),
          Te("Using default host for project ", t.options.projectId),
          (s = `${t.options.projectId}-default-rtdb.firebaseio.com`));
        let a,
          l,
          o = jg(s, i),
          b = o.repoInfo;
        "undefined" != typeof process &&
          process.env &&
          (l = process.env.FIREBASE_DATABASE_EMULATOR_HOST),
          l
            ? ((a = !0),
              (s = `http://${l}?ns=${b.namespace}`),
              (o = jg(s, i)),
              (b = o.repoInfo))
            : (a = !o.repoInfo.secure);
        const u = i && a ? new As(As.OWNER) : new Vk(t.name, t.options, e);
        (function (t, e) {
          const n = e.path.toString();
          if (
            "string" != typeof e.repoInfo.host ||
            0 === e.repoInfo.host.length ||
            (!na(e.repoInfo.namespace) &&
              "localhost" !== e.repoInfo.host.split(":")[0]) ||
            (0 !== n.length &&
              !(function (t) {
                return t && (t = t.replace(/^\/*\.info(\/|$)/, "/")), GD(t);
              })(n))
          )
            throw new Error(
              oi(t, "url") +
                'must be a valid firebase URL and the path can\'t contain ".", "#", "$", "[", or "]".'
            );
        })("Invalid Firebase Database URL", o),
          O(o.path) ||
            qt(
              "Database URL must point to the root of a Firebase Database (not including a child path)."
            );
        const c = (function kO(t, e, n, r) {
          let i = Wg[e.name];
          i || ((i = {}), (Wg[e.name] = i));
          let s = i[t.toURLString()];
          return (
            s &&
              qt(
                "Database initialized multiple times. Please make sure the format of the database URL matches with each database() call."
              ),
            (s = new nO(t, false, n, r)),
            (i[t.toURLString()] = s),
            s
          );
        })(b, t, u, new Bk(t.name, n));
        return new OO(c, t);
      }
      class OO {
        constructor(e, n) {
          (this._repoInternal = e),
            (this.app = n),
            (this.type = "database"),
            (this._instanceStarted = !1);
        }
        get _repo() {
          return (
            this._instanceStarted ||
              ((function rO(t, e, n) {
                if (
                  ((t.stats_ = $c(t.repoInfo_)),
                  t.forceRestClient_ ||
                    (
                      ("object" == typeof window &&
                        window.navigator &&
                        window.navigator.userAgent) ||
                      ""
                    ).search(
                      /googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i
                    ) >= 0)
                )
                  (t.server_ = new Vb(
                    t.repoInfo_,
                    (r, i, s, o) => {
                      JD(t, r, i, s, o);
                    },
                    t.authTokenProvider_,
                    t.appCheckProvider_
                  )),
                    setTimeout(() => XD(t, !0), 0);
                else {
                  if (null != n) {
                    if ("object" != typeof n)
                      throw new Error(
                        "Only objects are supported for option databaseAuthVariableOverride"
                      );
                    try {
                      Ie(n);
                    } catch (r) {
                      throw new Error("Invalid authOverride provided: " + r);
                    }
                  }
                  (t.persistentConnection_ = new sr(
                    t.repoInfo_,
                    e,
                    (r, i, s, o) => {
                      JD(t, r, i, s, o);
                    },
                    (r) => {
                      XD(t, r);
                    },
                    (r) => {
                      !(function iO(t, e) {
                        Se(e, (n, r) => {
                          kg(t, n, r);
                        });
                      })(t, r);
                    },
                    t.authTokenProvider_,
                    t.appCheckProvider_,
                    n
                  )),
                    (t.server_ = t.persistentConnection_);
                }
                t.authTokenProvider_.addTokenChangeListener((r) => {
                  t.server_.refreshAuthToken(r);
                }),
                  t.appCheckProvider_.addTokenChangeListener((r) => {
                    t.server_.refreshAppCheckToken(r.token);
                  }),
                  (t.statsReporter_ = (function Uk(t, e) {
                    const n = t.toString();
                    return Uc[n] || (Uc[n] = e()), Uc[n];
                  })(t.repoInfo_, () => new UF(t.stats_, t.server_))),
                  (t.infoData_ = new LF()),
                  (t.infoSyncTree_ = new OD({
                    startListening: (r, i, s, o) => {
                      let b = [];
                      const a = t.infoData_.getNode(r._path);
                      return (
                        a.isEmpty() ||
                          ((b = Hs(t.infoSyncTree_, r._path, a)),
                          setTimeout(() => {
                            o("ok");
                          }, 0)),
                        b
                      );
                    },
                    stopListening: () => {},
                  })),
                  kg(t, "connected", !1),
                  (t.serverSyncTree_ = new OD({
                    startListening: (r, i, s, o) => (
                      t.server_.listen(r, s, i, (b, a) => {
                        const l = o(b, a);
                        it(t.eventQueue_, r._path, l);
                      }),
                      []
                    ),
                    stopListening: (r, i) => {
                      t.server_.unlisten(r, i);
                    },
                  }));
              })(
                this._repoInternal,
                this.app.options.appId,
                this.app.options.databaseAuthVariableOverride
              ),
              (this._instanceStarted = !0)),
            this._repoInternal
          );
        }
        get _root() {
          return (
            this._rootInternal ||
              (this._rootInternal = new Pt(this._repo, W())),
            this._rootInternal
          );
        }
        _delete() {
          return (
            null !== this._rootInternal &&
              ((function RO(t, e) {
                const n = Wg[e];
                (!n || n[t.key] !== t) &&
                  qt(`Database ${e}(${t.repoInfo_}) has already been deleted.`),
                  (function tw(t) {
                    t.persistentConnection_ &&
                      t.persistentConnection_.interrupt("repo_interrupt");
                  })(t),
                  delete n[t.key];
              })(this._repo, this.app.name),
              (this._repoInternal = null),
              (this._rootInternal = null)),
            Promise.resolve()
          );
        }
        _checkNotDeleted(e) {
          null === this._rootInternal &&
            qt("Cannot call " + e + " on a deleted database.");
        }
      }
      function LO(
        t = (function fk(t = Sb) {
          const e = er.get(t);
          if (!e && t === Sb && K_()) return uv();
          if (!e) throw un.create("no-app", { appName: t });
          return e;
        })(),
        e
      ) {
        const n = (function lv(t, e) {
          const n = t.container
            .getProvider("heartbeat")
            .getImmediate({ optional: !0 });
          return n && n.triggerHeartbeat(), t.container.getProvider(e);
        })(t, "database").getImmediate({ identifier: e });
        if (!n._instanceStarted) {
          const r = ((t) => {
            const e = ((t) => {
              var e, n;
              return null ===
                (n =
                  null === (e = wb()) || void 0 === e
                    ? void 0
                    : e.emulatorHosts) || void 0 === n
                ? void 0
                : n[t];
            })(t);
            if (!e) return;
            const n = e.lastIndexOf(":");
            if (n <= 0 || n + 1 === e.length)
              throw new Error(
                `Invalid host ${e} with no separate hostname and port!`
              );
            const r = parseInt(e.substring(n + 1), 10);
            return "[" === e[0]
              ? [e.substring(1, n - 1), r]
              : [e.substring(0, n), r];
          })("database");
          r &&
            (function BO(t, e, n, r = {}) {
              (t = ws(t))._checkNotDeleted("useEmulator"),
                t._instanceStarted &&
                  qt(
                    "Cannot call useEmulator() after instance has already been initialized."
                  );
              const i = t._repoInternal;
              let s;
              if (i.repoInfo_.nodeAdmin)
                r.mockUserToken &&
                  qt(
                    'mockUserToken is not supported by the Admin SDK. For client access with mock users, please use the "firebase" package instead of "firebase-admin".'
                  ),
                  (s = new As(As.OWNER));
              else if (r.mockUserToken) {
                const o =
                  "string" == typeof r.mockUserToken
                    ? r.mockUserToken
                    : (function XP(t, e) {
                        if (t.uid)
                          throw new Error(
                            'The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.'
                          );
                        const r = e || "demo-project",
                          i = t.iat || 0,
                          s = t.sub || t.user_id;
                        if (!s)
                          throw new Error(
                            "mockUserToken must contain 'sub' or 'user_id' field!"
                          );
                        const o = Object.assign(
                          {
                            iss: `https://securetoken.google.com/${r}`,
                            aud: r,
                            iat: i,
                            exp: i + 3600,
                            auth_time: i,
                            sub: s,
                            user_id: s,
                            firebase: {
                              sign_in_provider: "custom",
                              identities: {},
                            },
                          },
                          t
                        );
                        return [
                          Db(JSON.stringify({ alg: "none", type: "JWT" })),
                          Db(JSON.stringify(o)),
                          "",
                        ].join(".");
                      })(r.mockUserToken, t.app.options.projectId);
                s = new As(o);
              }
              !(function NO(t, e, n, r) {
                (t.repoInfo_ = new jc(
                  `${e}:${n}`,
                  !1,
                  t.repoInfo_.namespace,
                  t.repoInfo_.webSocketOnly,
                  t.repoInfo_.nodeAdmin,
                  t.repoInfo_.persistenceKey,
                  t.repoInfo_.includeNamespaceInQueryParams,
                  !0
                )),
                  r && (t.authTokenProvider_ = r);
              })(i, e, n, s);
            })(n, ...r);
        }
        return n;
      }
      (sr.prototype.simpleListen = function (t, e) {
        this.sendRequest("q", { p: t }, e);
      }),
        (sr.prototype.echo = function (t, e) {
          this.sendRequest("echo", { d: t }, e);
        }),
        (function VO(t) {
          (function Ik(t) {
            Fc = t;
          })("9.22.2"),
            Ab(
              new Cs(
                "database",
                (e, { instanceIdentifier: n }) =>
                  PO(
                    e.getProvider("app").getImmediate(),
                    e.getProvider("auth-internal"),
                    e.getProvider("app-check-internal"),
                    n
                  ),
                "PUBLIC"
              ).setMultipleInstances(!0)
            ),
            bi(hv, "0.14.4", t),
            bi(hv, "0.14.4", "esm2017");
        })();
      let UO = (() => {
        class t {
          constructor() {
            (this._totalVisitor$ = new UP(null)),
              (this.db = null),
              // Mock implementation - load from localStorage or use default
              this.loadVisitorCount();
          }
          loadVisitorCount() {
            try {
              const stored = localStorage.getItem('wordle_visitor_count');
              const count = stored ? parseInt(stored, 10) : 1000;
              this._totalVisitor$.next(count);
            } catch (e) {
              // Fallback if localStorage is not available
              this._totalVisitor$.next(1000);
            }
          }
          get totalVisitorAsObs() {
            return this._totalVisitor$.asObservable();
          }
          updateVisitor(n) {
            // Mock implementation - save to localStorage
            try {
              localStorage.setItem('wordle_visitor_count', n.toString());
            } catch (e) {
              // Silently fail if localStorage is not available
            }
          }
        }
        return (
          (t.ɵfac = function (n) {
            return new (n || t)();
          }),
          (t.ɵprov = oe({ token: t, factory: t.ɵfac, providedIn: "root" })),
          t
        );
      })();
      const $O = function (t, e, n) {
        return { green: t, yellow: e, black: n };
      };
      function WO(t, e) {
        if (1 & t) {
          const n = (function Oh() {
            return m();
          })();
          ze(0, "div", 14),
            cu("click", function () {
              const s = (function Gd(t) {
                  return (S.lFrame.contextLView = t), t[8];
                })(n).index,
                o = ns().index;
              return ns().ChangeBoxColor(o, s);
            }),
            rt(1),
            (function mm(t, e) {
              const n = H();
              let r;
              const i = t + 20;
              n.firstCreatePass
                ? ((r = (function lA(t, e) {
                    if (e)
                      for (let n = e.length - 1; n >= 0; n--) {
                        const r = e[n];
                        if (t === r.name) return r;
                      }
                  })(e, n.pipeRegistry)),
                  (n.data[i] = r),
                  r.onDestroy &&
                    (n.destroyHooks || (n.destroyHooks = [])).push(
                      i,
                      r.onDestroy
                    ))
                : (r = n.data[i]);
              const s = r.factory || (r.factory = zn(r.type)),
                o = fn(B);
              try {
                const b = _o(!1),
                  a = s();
                return (
                  _o(b),
                  (function ET(t, e, n, r) {
                    n >= t.data.length &&
                      ((t.data[n] = null), (t.blueprint[n] = null)),
                      (e[n] = r);
                  })(n, m(), i, a),
                  a
                );
              } finally {
                fn(o);
              }
            })(2, "uppercase"),
            xe();
        }
        if (2 & t) {
          const n = e.$implicit,
            r = ns(2);
          In(
            "ngClass",
            gm(
              4,
              $O,
              n.color === r.colorIndex.Green,
              n.color === r.colorIndex.Yellow,
              n.color === r.colorIndex.Black
            )
          ),
            wn(1),
            zo(" ", _m(2, 2, n.letter), " ");
        }
      }
      function GO(t, e) {
        if (
          (1 & t &&
            (es(0), ze(1, "div", 12), Qr(2, WO, 3, 8, "div", 13), xe(), ts()),
          2 & t)
        ) {
          const n = e.$implicit;
          wn(2), In("ngForOf", n);
        }
      }
      function zO(t, e) {
        1 & t && (ze(0, "span"), rt(1, ","), xe());
      }
      function qO(t, e) {
        if (
          (1 & t &&
            (ze(0, "span")(1, "span", 17),
            rt(2),
            xe(),
            Qr(3, zO, 2, 0, "span", 18),
            xe()),
          2 & t)
        ) {
          const n = e.$implicit,
            r = e.index,
            i = e.last;
          wn(2), fu(n), wn(1), In("ngIf", (r + 1) % 3 == 0 && !1 === i);
        }
      }
      function QO(t, e) {
        // if (
        //   (1 & t &&
        //     (ze(0, "span", 15),
        //     rt(1, " Visited "),
        //     es(2),
        //     Qr(3, qO, 4, 2, "span", 16),
        //     ts(),
        //     rt(4, " Times "),
        //     xe()),
        //   2 & t)
        // ) {
        //   const n = ns();
        //   wn(3), In("ngForOf", n.digits)("ngForTrackBy", n.identify);
        // }
      }
      let YO = (() => {
        class t {
          constructor(n) {
            (this.visitorService = n),
              (this.allBoxes = []),
              (this.colorIndex = bn),
              (this.visitor = "#"),
              (this.subscription = new Ci()),
              (this.duration = 10),
              (this.digits = []),
              (this.init = !1),
              n.totalVisitorAsObs
                .pipe(
                  (function HP(t) {
                    return gr((e, n) => {
                      dn(t).subscribe(Ei(n, () => n.complete(), ua)),
                        !n.closed && e.subscribe(n);
                    });
                  })(this.subscription)
                )
                .subscribe((r) => {
                  "#" == this.visitor && null !== r
                    ? ((this.visitor = (++r).toString()),
                      this.updateCounter(),
                      this.visitorService.updateVisitor(r))
                    : null !== r &&
                      ((this.visitor = r.toString()), this.updateCounter());
                });
          }
          updateCounter() {
            (this.init = !1),
              console.log(this.visitor),
              (this.digits = this.visitor
                .toString()
                .split("")
                .map((n) => Number(n))),
              console.log(this.digits),
              setTimeout(() => {
                this.init = !0;
              }, 100);
          }
          ngOnInit() {
            this.allBoxes.push(this.createNewRowValues("salet"));
          }
          ChangeBoxColor(n, r) {
            let i = this.allBoxes[n][r].color + 1;
            if (
              (3 === i && (i = bn.Black),
              (this.allBoxes[n][r].color = i),
              n < this.allBoxes.length - 2)
            )
              for (let s = 0; s < this.allBoxes.length - 2 - n; s++)
                this.allBoxes.pop();
            this.updatedAllBoxes(n);
          }
          updatedAllBoxes(n) {
            n === this.allBoxes.length - 2 && this.allBoxes.pop();
            let r = this.fetchNewRowValue();
            if (!r) return;
            let i = this.createNewRowValues(r);
            this.allBoxes.push(i);
          }
          fetchNewRowValue() {
            let n = this.createKey();
            return this.getValueFromDictionary(n);
          }
          getValueFromDictionary(n) {
            return jP[0][n];
          }
          createKey() {
            let n = "";
            for (let r of this.allBoxes)
              for (let i of r) n += this.getColorLetter(i.color);
            return n;
          }
          getColorLetter(n) {
            let r = "";
            return (
              n === bn.Black
                ? (r = "b")
                : n === bn.Yellow
                ? (r = "y")
                : n === bn.Green && (r = "g"),
              r
            );
          }
          createNewRowValues(n) {
            let r = [],
              i = n.split("");
            for (let s of i) r.push({ color: bn.Black, letter: s });
            return r;
          }
          identify(n, r) {
            return r;
          }
        }
        return (
          (t.ɵfac = function (n) {
            return new (n || t)(B(UO));
          }),
          (t.ɵcmp = Ma({
            type: t,
            selectors: [["app-root"]],
            decls: 22,
            vars: 2,
            consts: [
              [1, "header"],
              [1, "title"],
              [1, "container", "p-3"],
              [1, "row"],
              [1, "col-md-12"],
              [1, "d-flex", "flex-column", "gap-2", "mb-5"],
              [4, "ngFor", "ngForOf"],
              [1, "footer"],
              [1, "mb-2"],
              [1, "mb-4"],
              ["href", "../assets/Wordle_Paper_Final.pdf"],
              ["class", "visitor", 4, "ngIf"],
              [1, "boxes-container"],
              ["class", "box", 3, "ngClass", "click", 4, "ngFor", "ngForOf"],
              [1, "box", 3, "ngClass", "click"],
              [1, "visitor"],
              [4, "ngFor", "ngForOf", "ngForTrackBy"],
              [1, "digit-counter"],
              [4, "ngIf"],
            ],
            template: function (n, r) {
              1 & n &&
                (ze(0, "div", 0)(1, "div", 1),
                rt(2, " Optimal Wordle "),
                xe()(),
                ze(3, "div", 2)(4, "div", 3)(5, "div", 4)(6, "div", 5),
                Qr(7, GO, 3, 1, "ng-container", 6),
                xe()()()(),
                ze(8, "div", 7)(9, "p", 8)(10, "strong"),
                rt(11, "Dimitris Bertsimas "),
                xe(),
                rt(12, " | Boeing Professor of Operations Research, MIT "),
                xe(),
                ze(13, "p", 9)(14, "strong"),
                rt(15, "Alex Paskov "),
                xe(),
                rt(16, " | MIT PhD Candidate, Columbia '21 Salutatorian "),
                xe(),
                ze(17, "p"),
                rt(18, " Article: "),
                ze(19, "a", 10),
                rt(20, " An Exact and Interpretable Solution to Wordle "),
                xe(),
                Qr(21, QO, 5, 2, "span", 11),
                xe()()),
                2 & n &&
                  (wn(7),
                  In("ngForOf", r.allBoxes),
                  wn(14),
                  In("ngIf", r.init));
            },
            directives: [I_, E_, S_],
            pipes: [x_],
            styles: [
              ".header[_ngcontent-%COMP%]{background:#CBEEE3}.title[_ngcontent-%COMP%]{padding:40px;font-size:40px;font-weight:500}.boxes-container[_ngcontent-%COMP%]{max-width:300px;display:flex;column-gap:10px;margin:auto}.box[_ngcontent-%COMP%]{width:50px;height:50px;background:#888888;color:#000;border-radius:2px;text-align:center;line-height:50px;font-size:25px;font-weight:500}.box.green[_ngcontent-%COMP%]{background:#07b907;color:#fff}.box.yellow[_ngcontent-%COMP%]{background:gold;color:#fff}.box.black[_ngcontent-%COMP%]{background:#000;color:#fff}.footer[_ngcontent-%COMP%]{position:absolute;bottom:0;width:100%;padding:10px;border-top:2px solid}.visitor[_ngcontent-%COMP%]{float:right}.digit-counter[_ngcontent-%COMP%]{background-image:linear-gradient(white,#e0e0e0);border:1px solid #dfdfdf!important;height:100px}",
            ],
          })),
          t
        );
      })();
      // Firebase version registration disabled
      const JO = null;
      let XO = (() => {
        class t {}
        return (
          (t.ɵfac = function (n) {
            return new (n || t)();
          }),
          (t.ɵmod = Ti({ type: t, bootstrap: [YO] })),
          (t.ɵinj = dr({ providers: [], imports: [[AP]] })),
          t
        );
      })();
      (function mx() {
        r_ = !1;
      })(),
        SP()
          .bootstrapModule(XO)
          .catch((t) => console.error(t));
    },
  },
  ($) => {
    $(($.s = 287));
  },
]);
