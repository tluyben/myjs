// TYCHO - Multi-select-form-component

function _tag(s) {
  return '*[multi-select-component="' + s + '"]';
}

// selector for the green tag completely (.active-checkbox_tag)
const tagSelector = _tag("tag");

// select for the checkboxes in the cms content (.w-dyn-items .w-dyn-item input[type="checkbox"]')
const itemsCheckboxSelector = _tag("checkbox");

// the actual search textbox (.search-field)
const searchInputSelector = _tag("search-field");

// the top content list ('.w-dyn-list')
const topContentListSelector = _tag("results-wrapper");

// all selected tag elements selected by the user ('.active-checkbox_wrapper .active-checkbox_tag-text')
const selectedTagTextSelector = _tag("tag-label");

// all labels in the content management ('.w-dyn-items .w-dyn-item .w-form-label')
const contentListTextSelector = _tag("checkbox-label");

// content list textbox ('input[type="checkbox"]')
const constentListCheckboxSelector = itemsCheckboxSelector;

// ------ codezzzzzzor
function tagSearchInit(topLevelParent) {
  let template = topLevelParent.querySelectorAll(tagSelector)[0];
  jQuery(template).hide();

  let checkboxes = topLevelParent.querySelectorAll(itemsCheckboxSelector);
  let search = topLevelParent.querySelectorAll(searchInputSelector)[0];
  let dynlist = topLevelParent.querySelectorAll(topContentListSelector)[0];

  function doSearch(searchQuery) {
    let textElements = topLevelParent.querySelectorAll(selectedTagTextSelector);
    let texts = Array.from(textElements).map((el) => el.textContent);
    let labels = topLevelParent.querySelectorAll(contentListTextSelector);

    if (searchQuery.trim() === "") {
      labels.forEach((label) => {
        let item = label.closest(".w-dyn-item");
        if (texts.includes(label.textContent)) return;
        item.style.display = "";
        dynlist.style.display = "";
      });
      return;
    }

    // dynlist.style.display = 'none'

    labels.forEach((label) => {
      let item = label.closest(".w-dyn-item");
      if (texts.includes(label.textContent)) return;
      if (
        label.textContent.toLowerCase().startsWith(searchQuery.toLowerCase())
      ) {
        item.style.display = "";
        dynlist.style.display = "";
      } else {
        item.style.display = "none";
      }
    });
  }

  //dynlist.style.display = 'none'
  if (!search.alreadyDone) {
    search.addEventListener("input", function () {
      // Using 'input' instead of 'change' for better user experience
      let searchQuery = this.value; // Value of the search field

      doSearch(searchQuery);
    });
    search.alreadyDone = true;
  }

  checkboxes.forEach((checkbox) => {
    if (checkbox.alreadyFlagged) return;
    checkbox.alreadyFlagged = true;
    checkbox.addEventListener("change", function () {
      if (this.checked) {
        // Set display of the parent .w-dyn-item to none
        let parentDynItem = this.closest(".w-dyn-item");
        if (parentDynItem) {
          parentDynItem.style.display = "none";
        }

        // Log the text of the corresponding .w-form-label
        let label = this.nextElementSibling;
        if (label && label.classList.contains("w-form-label")) {
          const clone = jQuery(template).clone().show()[0];
          let textElement = clone.querySelector(".active-checkbox_tag-text");
          if (textElement) {
            textElement.textContent = label.textContent;
          }
          jQuery(clone).insertAfter(template);

          let items = topLevelParent.querySelectorAll(
            ".w-dyn-items .w-dyn-item"
          );
          //dynlist.style.display = 'none'
          items.forEach((item) => {
            if (item.style.display !== "none") {
              dynlist.style.display = "";
            }
          });

          let imgElement = clone.querySelector(".active-checkbox_tag-remove");

          if (imgElement) {
            imgElement.addEventListener("click", function () {
              let textElement = clone.querySelector(
                ".active-checkbox_tag-text"
              );
              if (textElement) {
                let dynItems = topLevelParent.querySelectorAll(
                  ".w-dyn-items .w-dyn-item"
                );

                dynItems.forEach((item) => {
                  let label = item.querySelector(".w-form-label");
                  if (
                    label &&
                    label.textContent.trim() === textElement.textContent
                  ) {
                    // If found, unhide (show) the .w-dyn-item
                    item.style.display = "";
                    let checkbox = item.querySelector(
                      constentListCheckboxSelector
                    );
                    if (checkbox) {
                      checkbox.checked = false;
                    }

                    let checkboxInputDiv =
                      item.querySelector(".w-checkbox-input");
                    if (checkboxInputDiv) {
                      checkboxInputDiv.classList.remove(
                        "w--redirected-checked"
                      );
                    }
                  }
                });
              }
              clone.parentNode.removeChild(clone);
              doSearch(search.value);
            });
          }
        }
      }
    });
  });
}

(async () => {
  var qe = Object.create;
  var G = Object.defineProperty;
  var je = Object.getOwnPropertyDescriptor;
  var Xe = Object.getOwnPropertyNames;
  var Qe = Object.getPrototypeOf,
    ze = Object.prototype.hasOwnProperty;
  var Je = (e, t, o) =>
    t in e
      ? G(e, t, {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: o,
        })
      : (e[t] = o);
  var Ze = (e, t) => () => (
    t ||
      e(
        (t = {
          exports: {},
        }).exports,
        t
      ),
    t.exports
  );
  var et = (e, t, o, r) => {
    if ((t && typeof t == "object") || typeof t == "function")
      for (let n of Xe(t))
        !ze.call(e, n) &&
          n !== o &&
          G(e, n, {
            get: () => t[n],
            enumerable: !(r = je(t, n)) || r.enumerable,
          });
    return e;
  };
  var tt = (e, t, o) => (
    (o = e != null ? qe(Qe(e)) : {}),
    et(
      t || !e || !e.__esModule
        ? G(o, "default", {
            value: e,
            enumerable: !0,
          })
        : o,
      e
    )
  );
  var oe = (e, t, o) => (Je(e, typeof t != "symbol" ? t + "" : t, o), o);
  var $e = Ze((Jn, De) => {
    De.exports = jt;

    function jt(e, t, o, r) {
      var n, s, i;
      return function () {
        if (
          ((i = this),
          (s = Array.prototype.slice.call(arguments)),
          n && (o || r))
        )
          return;
        if (!o) return c(), (n = setTimeout(m, t)), n;
        (n = setTimeout(c, t)), e.apply(i, s);

        function m() {
          c(), e.apply(i, s);
        }

        function c() {
          clearTimeout(n), (n = null);
        }
      };
    }
  });
  var L = "fs-attributes";
  var ne = "animation";
  var re = "cmscore";
  var h = "cmsload";
  var W = "support";
  var A = class {
    static activateAlerts() {
      this.alertsActivated = !0;
    }
    static alert(t, o) {
      if ((this.alertsActivated && window.alert(t), o === "error"))
        throw new Error(t);
    }
  };
  oe(A, "alertsActivated", !1);
  var v = () => {};

  function I(e, t, o, r) {
    return e
      ? (e.addEventListener(t, o, r), () => e.removeEventListener(t, o, r))
      : v;
  }
  var ie = (e) => e instanceof Element;
  var se = (e) => e instanceof HTMLAnchorElement;
  var ae = (e, t) => !!e && t.includes(e);
  var Y = (e) => e != null;
  var N = (e) => typeof e == "string",
    ce = (e) => typeof e == "number";
  var U = "w--current";
  var le = {
    wrapper: "w-dyn-list",
    list: "w-dyn-items",
    item: "w-dyn-item",
    paginationWrapper: "w-pagination-wrapper",
    paginationNext: "w-pagination-next",
    paginationPrevious: "w-pagination-previous",
    pageCount: "w-page-count",
    emptyState: "w-dyn-empty",
  };
  var me = {
      addToCartForm: "w-commerce-commerceaddtocartform",
    },
    ue = {
      trigger: "w-lightbox",
    };
  var O = (e, t = !0) => e.cloneNode(t);

  function D(e, t, o, r = !0) {
    let n = o ? [o] : [];
    if (!e) return n;
    let s = e.split(",").reduce((i, a) => {
      let m = a.trim();
      return (!r || m) && i.push(m), i;
    }, []);
    if (t) {
      let i = s.filter((a) => ae(a, t));
      return i.length ? i : n;
    }
    return s;
  }
  var pe = new Map([
    ["tiny", "(max-width: 479px)"],
    ["small", "(max-width: 767px)"],
    ["medium", "(max-width: 991px)"],
    ["main", "(min-width: 992px)"],
  ]);
  var q = () => {
    for (let [e, t] of pe) if (window.matchMedia(t).matches) return e;
    return "main";
  };
  var j = (e = document) => {
    var o;
    let t = "Last Published:";
    for (let r of e.childNodes)
      if (
        r.nodeType === Node.COMMENT_NODE &&
        (o = r.textContent) != null &&
        o.includes(t)
      ) {
        let n = r.textContent.trim().split(t)[1];
        if (n) return new Date(n);
      }
  };
  var $ = (e = document) => e.documentElement.getAttribute("data-wf-site");

  function de(e, t, o) {
    var n;
    let r = window.fsAttributes[e];
    return (r.destroy = o || v), (n = r.resolve) == null || n.call(r, t), t;
  }
  var R = (e, t = "1", o = "iife") => {
    let n = `${e}${o === "esm" ? ".esm" : ""}.js`;
    return `https://cdn.jsdelivr.net/npm/@finsweet/attributes-${e}@${t}/${n}`;
  };
  var ot = R(ne, "1", "esm"),
    fe = async () => {
      let { fsAttributes: e } = window;
      e.animation || (e.animation = {});
      let { animation: t } = e;
      if (t.import) return t.import;
      try {
        return (t.import = import(ot)), t.import;
      } catch (o) {
        A.alert(`${o}`, "error");
        return;
      }
    };
  var nt = R(re, "1"),
    Ee = async () => {
      let { fsAttributes: e } = window;
      e.cmscore || (e.cmscore = {});
      let { cmscore: t } = e;
      if (t.import) return t.import;
      try {
        return (
          (t.import = import(nt)),
          t.import.then((o) => {
            o && (t.version || (t.version = o.version));
          }),
          t.import
        );
      } catch (o) {
        A.alert(`${o}`, "error");
        return;
      }
    };
  var rt = `${L}-${W}`,
    ge = async () => {
      var n;
      let { fsAttributes: e, location: t } = window,
        { host: o, searchParams: r } = new URL(t.href);
      return !o.includes("webflow.io") || !r.has(rt)
        ? !1
        : (n = e.import) == null
        ? void 0
        : n.call(e, W, "1");
    };
  var y = (e) => (t) => `${e}${t ? `-${t}` : ""}`,
    k = (e) => {
      let t = (n, s, i) => {
        let a = e[n],
          { key: m, values: c } = a,
          u;
        if (!s) return `[${m}]`;
        let p = c == null ? void 0 : c[s];
        N(p)
          ? (u = p)
          : (u = p(i && "instanceIndex" in i ? i.instanceIndex : void 0));
        let d = i && "caseInsensitive" in i && i.caseInsensitive ? "i" : "";
        if (!(i != null && i.operator)) return `[${m}="${u}"${d}]`;
        switch (i.operator) {
          case "prefixed":
            return `[${m}^="${u}"${d}]`;
          case "suffixed":
            return `[${m}$="${u}"${d}]`;
          case "contains":
            return `[${m}*="${u}"${d}]`;
        }
      };

      function o(n, s) {
        let i = t("element", n, s),
          a = (s == null ? void 0 : s.scope) || document;
        return s != null && s.all
          ? [...a.querySelectorAll(i)]
          : a.querySelector(i);
      }
      return [
        t,
        o,
        (n, s) => {
          let i = e[s];
          return i ? n.getAttribute(i.key) : null;
        },
      ];
    };
  var M = {
      preventLoad: {
        key: `${L}-preventload`,
      },
      debugMode: {
        key: `${L}-debug`,
      },
      src: {
        key: "src",
        values: {
          finsweet: "@finsweet/attributes",
        },
      },
      dev: {
        key: `${L}-dev`,
      },
    },
    [X, En] = k(M);
  var Te = (e) => {
    let { currentScript: t } = document,
      o = {};
    if (!t)
      return {
        attributes: o,
        preventsLoad: !1,
      };
    let n = {
      preventsLoad: N(t.getAttribute(M.preventLoad.key)),
      attributes: o,
    };
    for (let s in e) {
      let i = t.getAttribute(e[s]);
      n.attributes[s] = i;
    }
    return n;
  };
  var Se = ({ scriptAttributes: e, attributeKey: t, version: o, init: r }) => {
      var a;
      it(), (a = window.fsAttributes)[t] || (a[t] = {});
      let { preventsLoad: n, attributes: s } = Te(e),
        i = window.fsAttributes[t];
      (i.version = o),
        (i.init = r),
        n ||
          (window.Webflow || (window.Webflow = []),
          window.Webflow.push(() => r(s)));
    },
    it = () => {
      let e = at();
      if (window.fsAttributes && !Array.isArray(window.fsAttributes)) {
        Q(window.fsAttributes, e);
        return;
      }
      let t = st(e);
      Q(t, e),
        ct(t),
        (window.fsAttributes = t),
        (window.FsAttributes = window.fsAttributes),
        ge();
    },
    st = (e) => {
      let t = {
        cms: {},
        push(...o) {
          var r, n;
          for (let [s, i] of o)
            (n = (r = this[s]) == null ? void 0 : r.loading) == null ||
              n.then(i);
        },
        async import(o, r) {
          let n = t[o];
          return (
            n ||
            new Promise((s) => {
              let i = document.createElement("script");
              (i.src = R(o, r)),
                (i.async = !0),
                (i.onload = () => {
                  let [a] = Q(t, [o]);
                  s(a);
                }),
                document.head.append(i);
            })
          );
        },
        destroy() {
          var o, r;
          for (let n of e)
            (r = (o = window.fsAttributes[n]) == null ? void 0 : o.destroy) ==
              null || r.call(o);
        },
      };
      return t;
    },
    at = () => {
      let e = X("src", "finsweet", {
          operator: "contains",
        }),
        t = X("dev");
      return [...document.querySelectorAll(`script${e}, script${t}`)].reduce(
        (n, s) => {
          var a;
          let i =
            s.getAttribute(M.dev.key) ||
            ((a = s.src.match(/[\w-. ]+(?=(\.js)$)/)) == null ? void 0 : a[0]);
          return i && !n.includes(i) && n.push(i), n;
        },
        []
      );
    },
    Q = (e, t) =>
      t.map((r) => {
        let n = e[r];
        return (
          n ||
          ((e[r] = {}),
          (n = e[r]),
          (n.loading = new Promise((s) => {
            n.resolve = (i) => {
              s(i), delete n.resolve;
            };
          })),
          n)
        );
      }),
    ct = (e) => {
      let t = Array.isArray(window.fsAttributes) ? window.fsAttributes : [];
      e.push(...t);
    };
  var be = "1.12.0";
  var mt = "fs-cms-element",
    ut = {
      wrapper: "wrapper",
      list: "list",
      item: "item",
      paginationWrapper: "pagination-wrapper",
      paginationNext: "pagination-next",
      paginationPrevious: "pagination-previous",
      pageCount: "page-count",
      emptyState: "empty",
    },
    T = (e) => {
      let t = `.${le[e]}`,
        o = `[${mt}="${ut[e]}"]`;
      return `:is(${t}, ${o})`;
    },
    xe = (e, t = document) => {
      e = e.filter((s) => s);
      let o = e.join(", ") || T("wrapper");
      return [...t.querySelectorAll(o)].reduce((s, i) => {
        if (!i) return s;
        let a = _(i, "wrapper");
        return !a || s.includes(a) || s.push(a), s;
      }, []);
    };

  function _(e, t, o = document) {
    let r = typeof e == "string" ? o.querySelector(e) : e;
    if (!r) return;
    let n = r.closest(T("wrapper"));
    if (!n) return;
    let s = n.querySelector(T("list"));
    return t === "wrapper"
      ? n
      : t === "list"
      ? s
      : t === "items"
      ? [
          ...((s == null
            ? void 0
            : s.querySelectorAll(`:scope > ${T("item")}`)) || []),
        ]
      : t === "pageCount"
      ? n.querySelector(T("pageCount"))
      : t === "empty"
      ? n.querySelector(`:scope > ${T("emptyState")}`)
      : t === "pagination"
      ? n.querySelector(T("paginationWrapper"))
      : n.querySelector(
          T(t === "next" ? "paginationNext" : "paginationPrevious")
        );
  }
  var w = "pages",
    z = new Map(),
    K = async (
      e,
      { cache: t = !0, cacheExternal: o, cacheKey: r, cacheVersion: n } = {}
    ) => {
      var s, i;
      try {
        let a = new URL(e, window.location.origin),
          m = await pt(a);
        if (m) return m;
        let c = $(),
          u = j(),
          p = c || r,
          d =
            (i = (s = u == null ? void 0 : u.getTime()) != null ? s : n) != null
              ? i
              : 1,
          f = p ? await dt(p, d) : null;
        if (!t || !f) {
          let { page: x } = await Ae(a);
          return x;
        }
        let l = await ft(f, a.href);
        if (l) {
          let x = J(l);
          return o && !Ce(x, c) && ye(f, a, c, o), x;
        }
        return await ye(f, a, c, o);
      } catch {
        return null;
      }
    },
    pt = async (e) => {
      let t = await z.get(e.href);
      if (t) return J(t);
    },
    Ae = async (e) => {
      let t = fetch(e.href).then((n) => n.text());
      z.set(e.href, t);
      let o = await t;
      return {
        page: J(o),
        rawPage: o,
      };
    },
    ye = async (e, t, o, r) => {
      let { page: n, rawPage: s } = await Ae(t),
        i = Ce(n, o);
      return (!i && !r) || (await Et(e, t.href, s), i && z.delete(t.href)), n;
    },
    Ce = (e, t) => {
      if (!t) return !1;
      let o = $(e);
      return o && o === t;
    },
    J = (e) => new DOMParser().parseFromString(e, "text/html"),
    dt = (e, t) =>
      new Promise((o) => {
        try {
          let r = window.indexedDB.open(e, t);
          (r.onblocked = () => {
            o(null);
          }),
            (r.onupgradeneeded = () => {
              let n = r.result;
              n.objectStoreNames.contains(w) && n.deleteObjectStore(w),
                n.createObjectStore(w);
            }),
            (r.onerror = () => o(null)),
            (r.onsuccess = () => {
              let n = r.result;
              (n.onversionchange = () => n.close()), o(n);
            });
        } catch {
          o(null);
        }
      }),
    ft = async (e, t) =>
      new Promise((o) => {
        let s = e.transaction(w).objectStore(w).get(t);
        (s.onerror = () => o(null)), (s.onsuccess = () => o(s.result));
      }),
    Et = async (e, t, o) =>
      new Promise((r) => {
        let i = e.transaction(w, "readwrite").objectStore(w).put(o, t);
        (i.onerror = () => r()), (i.onsuccess = () => r());
      });
  var _e = ({ textContent: e }) => {
      if (!e) return;
      let [, t] = e.split("/");
      return t ? parseInt(t.trim()) : void 0;
    },
    V = async (e, t, o, r) => {
      r == null || r.preventDefault();
      let { items: n, itemsPerPage: s } = e;
      if (!(!t && s === n.length)) {
        if (s + o <= n.length) e.itemsPerPage = s + o;
        else if (t) {
          let i = await e.once("renderitems");
          e.itemsPerPage = s + i.length;
        } else e.itemsPerPage += n.length - s;
        await e.renderItems(!0);
      }
    },
    we = (e) => {
      let {
        pagesQuery: t,
        currentPage: o,
        totalPages: r,
        paginationNext: n,
        paginationPrevious: s,
      } = e;
      o &&
        (s &&
          ((s.style.display = o !== 1 ? "" : "none"),
          (s.href = `?${t}=${o - 1}`)),
        n &&
          ((n.style.display = o !== r ? "" : "none"),
          (n.href = `?${t}=${o + 1}`)));
    },
    Pe = (e, { currentPage: t, totalPages: o }) => {
      e.setAttribute("aria-label", `Page ${t} of ${o}`),
        (e.textContent = `${t} / ${o}`);
    };
  var H = async (e, t, o) => {
    var p;
    let {
        index: r,
        paginationNext: n,
        paginationPrevious: s,
        originalItemsPerPage: i,
      } = t,
      a = xe([], e)[r];
    if (!a) return;
    if (!s || !n) {
      let d = _(a, "pagination"),
        f = _(a, "previous"),
        l = _(a, "next");
      if (f) {
        let E = [...((d == null ? void 0 : d.children) || [])].indexOf(f);
        t.addPaginationButton(f, "paginationPrevious", E);
      }
      if (l) {
        let E = [...((d == null ? void 0 : d.children) || [])].indexOf(l);
        f || (E += 1), t.addPaginationButton(l, "paginationNext", E);
      }
    }
    let m = (p = _(a, "next")) == null ? void 0 : p.href,
      c = _(a, "items"),
      { length: u } = c;
    return (
      m && i !== u && (t.originalItemsPerPage = t.itemsPerPage = u),
      await t.addItems(c, o),
      m
    );
  };
  var C = async (e) => {
      let {
        paginationNext: t,
        paginationPrevious: o,
        paginationCount: r,
        extractingPaginationData: n,
        cacheItems: s,
      } = e;
      if (!t && !o) return;
      await n;
      let i = r ? _e(r) : void 0;
      await e.displayElement("loader"),
        i ? await Le(e, i, s) : await gt(e, s),
        await e.emit("finishload"),
        await e.displayElement("loader", !1);
    },
    gt = async (e, t) => {
      let { paginationNext: o, currentPage: r } = e;
      if ((r && (await Le(e, r, t)), !o)) return;
      let { href: n } = o,
        s = [n],
        i = async (a) => {
          let m = await K(a, {
            cache: t,
          });
          if (!m) return;
          let c = await H(m, e);
          !c || s.includes(c) || (s.push(c), await i(c));
        };
      await i(n);
    },
    Le = async (e, t, o) => {
      let { paginationNext: r, paginationPrevious: n } = e;
      if (!r && !n) return;
      let { pagesQuery: s, currentPage: i } = e;
      if (!s || !i) return;
      let { origin: a, pathname: m } = window.location;
      for (let u = i - 1; u >= 1; u--) {
        let p = await K(`${a}${m}?${s}=${u}`, {
          cache: o,
        });
        if (!p) return;
        await H(p, e, "unshift");
      }
      let c = [];
      for (let u = i + 1; u <= t; u++)
        c[u] = (async () => {
          let p = c[u - 1],
            d = await K(`${a}${m}?${s}=${u}`, {
              cache: o,
            });
          await p, d && (await H(d, e));
        })();
      await Promise.all(c);
    };
  var he = async (e) => {
    let {
      paginationNext: t,
      paginationPrevious: o,
      paginationCount: r,
      itemsPerPage: n,
    } = e;
    if (!t) return;
    o && (o.style.display = "none"), r == null || r.remove();
    let s = !0,
      i = !1;
    e.initPagination(),
      e.on("renderitems", () => {
        let { validItems: u, items: p, itemsPerPage: d } = e;
        if (!s && p.length === d) return c();
        t.style.display = u.length > d ? "" : "none";
      });
    let m = I(t, "click", async (u) => {
        u.preventDefault(), !i && ((i = !0), await V(e, s, n, u), (i = !1));
      }),
      c = () => {
        m(), (t.style.display = "none");
      };
    return await C(e), (s = !1), c;
  };
  var Ie = Tt;

  function Tt(e, t, o) {
    var r = null,
      n = null,
      s = o && o.leading,
      i = o && o.trailing;
    s == null && (s = !0), i == null && (i = !s), s == !0 && (i = !1);
    var a = function () {
        r && (clearTimeout(r), (r = null));
      },
      m = function () {
        var u = n;
        a(), u && u();
      },
      c = function () {
        var u = s && !r,
          p = this,
          d = arguments;
        if (
          ((n = function () {
            return e.apply(p, d);
          }),
          r ||
            (r = setTimeout(function () {
              if (((r = null), i)) return n();
            }, t)),
          u)
        )
          return (u = !1), n();
      };
    return (c.cancel = a), (c.flush = m), c;
  }
  var S = `fs-${h}`,
    St = "list",
    bt = "loader",
    xt = "items-count",
    yt = "visible-count",
    At = "visible-count-from",
    Ct = "visible-count-to",
    _t = "scroll-anchor",
    wt = "page-button",
    Pt = "page-dots",
    Lt = "empty",
    ht = "mode",
    It = {
      loadUnder: "load-under",
      renderAll: "render-all",
      pagination: "pagination",
      infinite: "infinite",
    },
    Rt = "threshold",
    vt = "pagesiblings",
    Mt = "pageboundary",
    Bt = "animation",
    Nt = "easing",
    Ut = "duration",
    Ot = "stagger",
    Dt = "resetix",
    $t = {
      true: "true",
    },
    kt = "showquery",
    Kt = {
      true: "true",
    },
    Vt = "cache",
    Ht = {
      false: "false",
    },
    B = {
      element: {
        key: `${S}-element`,
        values: {
          list: y(St),
          loader: y(bt),
          itemsCount: y(xt),
          visibleCount: y(yt),
          visibleCountFrom: y(At),
          visibleCountTo: y(Ct),
          scrollAnchor: y(_t),
          empty: y(Lt),
          pageButton: wt,
          pageDots: Pt,
        },
      },
      mode: {
        key: `${S}-${ht}`,
        values: It,
      },
      threshold: {
        key: `${S}-${Rt}`,
      },
      pageSiblings: {
        key: `${S}-${vt}`,
      },
      pageBoundary: {
        key: `${S}-${Mt}`,
      },
      animation: {
        key: `${S}-${Bt}`,
      },
      easing: {
        key: `${S}-${Nt}`,
      },
      duration: {
        key: `${S}-${Ut}`,
      },
      stagger: {
        key: `${S}-${Ot}`,
      },
      resetIx: {
        key: `${S}-${Dt}`,
        values: $t,
      },
      showQuery: {
        key: `${S}-${kt}`,
        values: Kt,
      },
      cacheItems: {
        key: `${S}-${Vt}`,
        values: Ht,
      },
    },
    [F, b] = k(B),
    Re = "-20",
    ve = 1,
    Me = 1,
    Be = {
      main: 0,
      medium: 1,
      small: 2,
      tiny: 3,
    };
  var {
      pageSiblings: { key: Ft },
      pageBoundary: { key: Gt },
      threshold: { key: Wt },
      showQuery: { key: Yt, values: qt },
    } = B,
    Ne = (e) => {
      let { paginationWrapper: t, paginationCount: o } = e;
      if (!t) return;
      let r = b("pageButton", {
          operator: "prefixed",
          scope: t,
        }),
        n = b("pageDots", {
          operator: "prefixed",
          scope: t,
        });
      n
        ? n.remove()
        : ((n = document.createElement("div")), (n.textContent = "..."));
      let s = e.getAttribute(Gt),
        i = (s ? D(s) : []).map((f) => parseInt(f)),
        a = e.getAttribute(Ft),
        m = (a ? D(a) : []).map((f) => parseInt(f)),
        [c, u] = Z(i, m),
        p = [i, m].some(({ length: f }) => f > 1),
        d = e.getAttribute(Yt) === qt.true;
      return {
        paginationWrapper: t,
        pageButtonTemplate: r,
        pageDotsTemplate: n,
        paginationCount: o,
        pageBoundary: c,
        pageBoundaryValues: i,
        pageSiblings: u,
        pageSiblingsValues: m,
        hasBreakpoints: p,
        showQueryParams: d,
      };
    },
    Z = (e, t) => {
      let o = q(),
        r = Be[o],
        n = [];
      [e, t].forEach((a, m) => {
        for (let c = r; c >= 0; c--) {
          let u = a[c];
          if (ce(u)) {
            n[m] = u;
            break;
          }
        }
      });
      let [s, i] = n;
      return s != null || (s = Me), i != null || (i = ve), [s, i];
    },
    Ue = (e) => 1 - parseInt(e.getAttribute(Wt) || Re) / 100;
  var Oe = async (e) => {
    let {
      list: t,
      paginationNext: o,
      paginationPrevious: r,
      paginationCount: n,
      itemsPerPage: s,
    } = e;
    if (!t || !o) return;
    r && (r.style.display = "none"), n == null || n.remove();
    let i = Ue(e),
      a = !0,
      m = !1;
    e.initPagination(),
      e.on("renderitems", () => {
        let { validItems: f, items: l, itemsPerPage: E } = e;
        if (!a && l.length === E) {
          d();
          return;
        }
        o.style.display = f.length > E ? "" : "none";
      });
    let c = async (f) => {
        f.preventDefault();
      },
      u = Ie(async () => {
        if (m) return;
        let { innerHeight: f } = window,
          { bottom: l } = t.getBoundingClientRect(),
          E = i * f;
        l > 0 && l <= E && ((m = !0), await V(e, a, s), (m = !1));
      }, 100),
      p = new IntersectionObserver((f) => {
        for (let { isIntersecting: l } of f)
          window[l ? "addEventListener" : "removeEventListener"]("scroll", u);
      }),
      d = () => {
        window.removeEventListener("scroll", u),
          o.removeEventListener("click", c),
          (o.style.display = "none"),
          p.disconnect();
      };
    return (
      o.addEventListener("click", c), p.observe(t), await C(e), (a = !1), d
    );
  };
  var ke = tt($e(), 1);
  var Ke = async (e) => {
      let t = Ne(e);
      if (!t) return;
      let {
          paginationWrapper: o,
          pageButtonTemplate: r,
          pageDotsTemplate: n,
          paginationCount: s,
          pageBoundary: i,
          pageBoundaryValues: a,
          pageSiblings: m,
          pageSiblingsValues: c,
          hasBreakpoints: u,
          showQueryParams: p,
        } = t,
        d;
      if (r) {
        let { parentElement: E } = r;
        r.remove(),
          E &&
            (d = {
              parentElement: E,
              pageButtonTemplate: r,
              pageDotsTemplate: n,
              pageBoundary: i,
              pageSiblings: m,
              renderedElements: new Map([]),
            });
      }
      e.initPagination(p), e.on("renderitems", () => Xt(e, d, s));
      let f = I(o, "click", (E) => Jt(E, d, e)),
        l;
      return (
        d &&
          u &&
          (l = I(
            window,
            "resize",
            (0, ke.default)(() => {
              Zt(d, e, a, c);
            }, 100)
          )),
        await C(e),
        () => {
          f(), l == null || l();
        }
      );
    },
    Xt = (e, t, o, r = !0) => {
      t && Ve(t, e), o && Pe(o, e), r && we(e);
    },
    Ve = (e, t) => {
      let { currentPage: o, totalPages: r } = t;
      if (!o) return;
      let {
          parentElement: n,
          renderedElements: s,
          pageBoundary: i,
          pageSiblings: a,
        } = e,
        m = [...s],
        c = a * 2 + 1,
        p = i * 2 + c + 2,
        d = o - 1 < p - c,
        f = r - o < p - c;
      for (let l = 1; l <= p; l++) {
        let [E, x] = m[l - 1] || [],
          [ee] = m[l - 2] || [];
        if (l > r) {
          E && (E.remove(), (m[l - 1] = void 0));
          continue;
        }
        let g;
        r <= p
          ? (g = l)
          : d
          ? l > p - i
            ? (g = r - (p - l))
            : l === p - i
            ? (g = null)
            : (g = l)
          : f
          ? l < i + 1
            ? (g = l)
            : l === i + 1
            ? (g = null)
            : (g = r - (p - l))
          : l < i + 1
          ? (g = l)
          : l > p - i
          ? (g = r - (p - l))
          : l === i + 1 || l === p - i
          ? (g = null)
          : (g = o + (l - (i + 1) - (1 + a)));
        let P;
        x !== g &&
          (E == null || E.remove(),
          (P = Qt(e, g, t)),
          (m[l - 1] = [P, g]),
          ee ? n.insertBefore(P, ee.nextSibling) : n.appendChild(P),
          (P.style.opacity = ""));
        let te = P || E;
        te && zt(te, g === o);
      }
      e.renderedElements = new Map([...m.filter(Y)]);
    },
    Qt = (
      { pageButtonTemplate: e, pageDotsTemplate: t },
      o,
      { pagesQuery: r }
    ) => {
      if (!o) return O(t);
      let n = O(e);
      return (
        n.classList.remove(U),
        (n.textContent = `${o}`),
        se(n) && r && (n.href = `?${r}=${o}`),
        n
      );
    },
    zt = (e, t) => {
      t
        ? (e.classList.add(U), e.setAttribute("aria-current", "page"))
        : (e.classList.remove(U), e.removeAttribute("aria-current"));
    },
    Jt = (e, t, o) => {
      let { target: r } = e;
      if (!ie(r)) return;
      let n = r.closest(
          F("element", "pageButton", {
            operator: "prefixed",
          })
        ),
        s = r.closest(T("paginationNext")),
        i = r.closest(T("paginationPrevious"));
      if (!n && !s && !i) return;
      e.preventDefault();
      let { currentPage: a, totalPages: m } = o;
      if (!a) return;
      let c;
      s && (c = a + 1),
        i && (c = a - 1),
        n && (c = t == null ? void 0 : t.renderedElements.get(n)),
        c && c >= 1 && c <= m && o.switchPage(c);
    },
    Zt = (e, t, ...o) => {
      let { pageBoundary: r, pageSiblings: n, renderedElements: s } = e,
        [i, a] = Z(...o);
      if (!(r === i && n === a)) {
        (e.pageBoundary = i), (e.pageSiblings = a);
        for (let [m] of s) m.remove();
        s.clear(), Ve(e, t);
      }
    };
  var He = async (e) => {
    let { paginationNext: t, paginationPrevious: o, paginationCount: r } = e;
    t &&
      ((t.style.display = "none"),
      o && (o.style.display = "none"),
      r == null || r.remove(),
      await C(e));
  };
  var {
      element: { key: eo },
      mode: {
        key: to,
        values: { renderAll: oo, infinite: no, pagination: ro },
      },
      animation: { key: io },
      duration: { key: Fe },
      easing: { key: Ge },
      stagger: { key: so },
      resetIx: { key: ao, values: co },
      cacheItems: { key: lo, values: mo },
    } = B,
    We = async (e, t) => {
      let o = e.getInstanceIndex(eo),
        { items: r } = e,
        { Webflow: n } = window,
        s = !!n && "require" in n;
      t.addItemsAnimation(e, {
        animationKey: io,
        durationKey: Fe,
        easingKey: Ge,
        staggerKey: so,
      }),
        t.addListAnimation(e, {
          durationKey: Fe,
          easingKey: Ge,
        });
      let i =
        s &&
        !!n.require("commerce") &&
        r.some(({ element: l }) => l.querySelector(`.${me.addToCartForm}`));
      i && (e.restartCommerce = i);
      let a =
        s &&
        !!n.require("lightbox") &&
        r.some(({ element: l }) => l.querySelector(`.${ue.trigger}`));
      a && (e.restartLightbox = a);
      let m = e.getAttribute(ao) === co.true;
      m && (e.restartIx = m);
      let c = b("loader", {
        instanceIndex: o,
      });
      c && e.addLoader(c);
      let u = b("empty", {
        instanceIndex: o,
      });
      if ((u && e.addEmptyElement(u), !e.itemsCount)) {
        let l = b("itemsCount", {
          instanceIndex: o,
        });
        l && e.addItemsCount(l);
      }
      if (!e.visibleCount || !e.visibleCountFrom || !e.visibleCountTo) {
        let l = b("visibleCount", {
            instanceIndex: o,
          }),
          E = b("visibleCountFrom", {
            instanceIndex: o,
          }),
          x = b("visibleCountTo", {
            instanceIndex: o,
          });
        e.addVisibleCount(l, E, x);
      }
      if (!e.scrollAnchor) {
        let l = b("scrollAnchor", {
          instanceIndex: o,
        });
        l && (e.scrollAnchor = l);
      }
      e.getAttribute(lo) === mo.false && (e.cacheItems = !1);
      let d = e.getAttribute(to);
      return d === oo
        ? await He(e)
        : d === no
        ? await Oe(e)
        : d === ro
        ? await Ke(e)
        : await he(e);
    };
  var Ye = async () => {
    let e = await Ee();
    if (!e) return [];
    let t = e.createCMSListInstances([
        F("element", "list", {
          operator: "prefixed",
        }),
      ]),
      o = await Promise.all(t.map((r) => We(r, e)));
    return de(h, t, () => {
      var r;
      for (let n of t) (r = n.destroy) == null || r.call(n);
      for (let n of o) n == null || n();
    });
  };
  //   Se({
  //     init: Ye,
  //     version: be,
  //     attributeKey: h,
  //   });
  //   await fe();
  let topLevelParents = document.querySelectorAll(_tag("parent-container"));
  topLevelParents.forEach((parent) => {
    tagSearchInit(parent);
  });
  setInterval(() => {
    topLevelParents.forEach((parent) => {
      tagSearchInit(parent);
    });
  }, 400);
})();
