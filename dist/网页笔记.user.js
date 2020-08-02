// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../node_modules/svelte/internal/index.mjs":[function(require,module,exports) {
var global = arguments[3];
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.action_destroyer = action_destroyer;
exports.add_attribute = add_attribute;
exports.add_classes = add_classes;
exports.add_flush_callback = add_flush_callback;
exports.add_location = add_location;
exports.add_render_callback = add_render_callback;
exports.add_resize_listener = add_resize_listener;
exports.add_transform = add_transform;
exports.afterUpdate = afterUpdate;
exports.append = append;
exports.append_dev = append_dev;
exports.assign = assign;
exports.attr = attr;
exports.attr_dev = attr_dev;
exports.beforeUpdate = beforeUpdate;
exports.bind = bind;
exports.blank_object = blank_object;
exports.bubble = bubble;
exports.check_outros = check_outros;
exports.children = children;
exports.claim_component = claim_component;
exports.claim_element = claim_element;
exports.claim_space = claim_space;
exports.claim_text = claim_text;
exports.clear_loops = clear_loops;
exports.component_subscribe = component_subscribe;
exports.compute_rest_props = compute_rest_props;
exports.createEventDispatcher = createEventDispatcher;
exports.create_animation = create_animation;
exports.create_bidirectional_transition = create_bidirectional_transition;
exports.create_component = create_component;
exports.create_in_transition = create_in_transition;
exports.create_out_transition = create_out_transition;
exports.create_slot = create_slot;
exports.create_ssr_component = create_ssr_component;
exports.custom_event = custom_event;
exports.dataset_dev = dataset_dev;
exports.debug = debug;
exports.destroy_block = destroy_block;
exports.destroy_component = destroy_component;
exports.destroy_each = destroy_each;
exports.detach = detach;
exports.detach_after_dev = detach_after_dev;
exports.detach_before_dev = detach_before_dev;
exports.detach_between_dev = detach_between_dev;
exports.detach_dev = detach_dev;
exports.dispatch_dev = dispatch_dev;
exports.each = each;
exports.element = element;
exports.element_is = element_is;
exports.empty = empty;
exports.escape = escape;
exports.exclude_internal_props = exclude_internal_props;
exports.fix_and_destroy_block = fix_and_destroy_block;
exports.fix_and_outro_and_destroy_block = fix_and_outro_and_destroy_block;
exports.fix_position = fix_position;
exports.flush = flush;
exports.getContext = getContext;
exports.get_binding_group_value = get_binding_group_value;
exports.get_current_component = get_current_component;
exports.get_slot_changes = get_slot_changes;
exports.get_slot_context = get_slot_context;
exports.get_spread_object = get_spread_object;
exports.get_spread_update = get_spread_update;
exports.get_store_value = get_store_value;
exports.group_outros = group_outros;
exports.handle_promise = handle_promise;
exports.init = init;
exports.insert = insert;
exports.insert_dev = insert_dev;
exports.is_crossorigin = is_crossorigin;
exports.is_function = is_function;
exports.is_promise = is_promise;
exports.listen = listen;
exports.listen_dev = listen_dev;
exports.loop = loop;
exports.loop_guard = loop_guard;
exports.mount_component = mount_component;
exports.noop = noop;
exports.not_equal = not_equal;
exports.null_to_empty = null_to_empty;
exports.object_without_properties = object_without_properties;
exports.onDestroy = onDestroy;
exports.onMount = onMount;
exports.once = once;
exports.outro_and_destroy_block = outro_and_destroy_block;
exports.prevent_default = prevent_default;
exports.prop_dev = prop_dev;
exports.query_selector_all = query_selector_all;
exports.run = run;
exports.run_all = run_all;
exports.safe_not_equal = safe_not_equal;
exports.schedule_update = schedule_update;
exports.select_multiple_value = select_multiple_value;
exports.select_option = select_option;
exports.select_options = select_options;
exports.select_value = select_value;
exports.self = self;
exports.setContext = setContext;
exports.set_attributes = set_attributes;
exports.set_current_component = set_current_component;
exports.set_custom_element_data = set_custom_element_data;
exports.set_data = set_data;
exports.set_data_dev = set_data_dev;
exports.set_input_type = set_input_type;
exports.set_input_value = set_input_value;
exports.set_now = set_now;
exports.set_raf = set_raf;
exports.set_store_value = set_store_value;
exports.set_style = set_style;
exports.set_svg_attributes = set_svg_attributes;
exports.space = space;
exports.spread = spread;
exports.stop_propagation = stop_propagation;
exports.subscribe = subscribe;
exports.svg_element = svg_element;
exports.text = text;
exports.tick = tick;
exports.time_ranges_to_array = time_ranges_to_array;
exports.to_number = to_number;
exports.toggle_class = toggle_class;
exports.transition_in = transition_in;
exports.transition_out = transition_out;
exports.update_keyed_each = update_keyed_each;
exports.update_slot = update_slot;
exports.validate_component = validate_component;
exports.validate_each_argument = validate_each_argument;
exports.validate_each_keys = validate_each_keys;
exports.validate_slots = validate_slots;
exports.validate_store = validate_store;
exports.xlink_attr = xlink_attr;
exports.raf = exports.now = exports.missing_component = exports.is_client = exports.invalid_attribute_name_character = exports.intros = exports.identity = exports.has_prop = exports.globals = exports.escaped = exports.dirty_components = exports.current_component = exports.binding_callbacks = exports.SvelteElement = exports.SvelteComponentDev = exports.SvelteComponent = exports.HtmlTag = void 0;

function noop() {}

const identity = x => x;

exports.identity = identity;

function assign(tar, src) {
  // @ts-ignore
  for (const k in src) tar[k] = src[k];

  return tar;
}

function is_promise(value) {
  return value && typeof value === 'object' && typeof value.then === 'function';
}

function add_location(element, file, line, column, char) {
  element.__svelte_meta = {
    loc: {
      file,
      line,
      column,
      char
    }
  };
}

function run(fn) {
  return fn();
}

function blank_object() {
  return Object.create(null);
}

function run_all(fns) {
  fns.forEach(run);
}

function is_function(thing) {
  return typeof thing === 'function';
}

function safe_not_equal(a, b) {
  return a != a ? b == b : a !== b || a && typeof a === 'object' || typeof a === 'function';
}

function not_equal(a, b) {
  return a != a ? b == b : a !== b;
}

function validate_store(store, name) {
  if (store != null && typeof store.subscribe !== 'function') {
    throw new Error(`'${name}' is not a store with a 'subscribe' method`);
  }
}

function subscribe(store, ...callbacks) {
  if (store == null) {
    return noop;
  }

  const unsub = store.subscribe(...callbacks);
  return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
}

function get_store_value(store) {
  let value;
  subscribe(store, _ => value = _)();
  return value;
}

function component_subscribe(component, store, callback) {
  component.$$.on_destroy.push(subscribe(store, callback));
}

function create_slot(definition, ctx, $$scope, fn) {
  if (definition) {
    const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
    return definition[0](slot_ctx);
  }
}

function get_slot_context(definition, ctx, $$scope, fn) {
  return definition[1] && fn ? assign($$scope.ctx.slice(), definition[1](fn(ctx))) : $$scope.ctx;
}

function get_slot_changes(definition, $$scope, dirty, fn) {
  if (definition[2] && fn) {
    const lets = definition[2](fn(dirty));

    if ($$scope.dirty === undefined) {
      return lets;
    }

    if (typeof lets === 'object') {
      const merged = [];
      const len = Math.max($$scope.dirty.length, lets.length);

      for (let i = 0; i < len; i += 1) {
        merged[i] = $$scope.dirty[i] | lets[i];
      }

      return merged;
    }

    return $$scope.dirty | lets;
  }

  return $$scope.dirty;
}

function update_slot(slot, slot_definition, ctx, $$scope, dirty, get_slot_changes_fn, get_slot_context_fn) {
  const slot_changes = get_slot_changes(slot_definition, $$scope, dirty, get_slot_changes_fn);

  if (slot_changes) {
    const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
    slot.p(slot_context, slot_changes);
  }
}

function exclude_internal_props(props) {
  const result = {};

  for (const k in props) if (k[0] !== '$') result[k] = props[k];

  return result;
}

function compute_rest_props(props, keys) {
  const rest = {};
  keys = new Set(keys);

  for (const k in props) if (!keys.has(k) && k[0] !== '$') rest[k] = props[k];

  return rest;
}

function once(fn) {
  let ran = false;
  return function (...args) {
    if (ran) return;
    ran = true;
    fn.call(this, ...args);
  };
}

function null_to_empty(value) {
  return value == null ? '' : value;
}

function set_store_value(store, ret, value = ret) {
  store.set(value);
  return ret;
}

const has_prop = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);

exports.has_prop = has_prop;

function action_destroyer(action_result) {
  return action_result && is_function(action_result.destroy) ? action_result.destroy : noop;
}

const is_client = typeof window !== 'undefined';
exports.is_client = is_client;
let now = is_client ? () => window.performance.now() : () => Date.now();
exports.now = now;
let raf = is_client ? cb => requestAnimationFrame(cb) : noop; // used internally for testing

exports.raf = raf;

function set_now(fn) {
  exports.now = now = fn;
}

function set_raf(fn) {
  exports.raf = raf = fn;
}

const tasks = new Set();

function run_tasks(now) {
  tasks.forEach(task => {
    if (!task.c(now)) {
      tasks.delete(task);
      task.f();
    }
  });
  if (tasks.size !== 0) raf(run_tasks);
}
/**
 * For testing purposes only!
 */


function clear_loops() {
  tasks.clear();
}
/**
 * Creates a new task that runs on each raf frame
 * until it returns a falsy value or is aborted
 */


function loop(callback) {
  let task;
  if (tasks.size === 0) raf(run_tasks);
  return {
    promise: new Promise(fulfill => {
      tasks.add(task = {
        c: callback,
        f: fulfill
      });
    }),

    abort() {
      tasks.delete(task);
    }

  };
}

function append(target, node) {
  target.appendChild(node);
}

function insert(target, node, anchor) {
  target.insertBefore(node, anchor || null);
}

function detach(node) {
  node.parentNode.removeChild(node);
}

function destroy_each(iterations, detaching) {
  for (let i = 0; i < iterations.length; i += 1) {
    if (iterations[i]) iterations[i].d(detaching);
  }
}

function element(name) {
  return document.createElement(name);
}

function element_is(name, is) {
  return document.createElement(name, {
    is
  });
}

function object_without_properties(obj, exclude) {
  const target = {};

  for (const k in obj) {
    if (has_prop(obj, k) // @ts-ignore
    && exclude.indexOf(k) === -1) {
      // @ts-ignore
      target[k] = obj[k];
    }
  }

  return target;
}

function svg_element(name) {
  return document.createElementNS('http://www.w3.org/2000/svg', name);
}

function text(data) {
  return document.createTextNode(data);
}

function space() {
  return text(' ');
}

function empty() {
  return text('');
}

function listen(node, event, handler, options) {
  node.addEventListener(event, handler, options);
  return () => node.removeEventListener(event, handler, options);
}

function prevent_default(fn) {
  return function (event) {
    event.preventDefault(); // @ts-ignore

    return fn.call(this, event);
  };
}

function stop_propagation(fn) {
  return function (event) {
    event.stopPropagation(); // @ts-ignore

    return fn.call(this, event);
  };
}

function self(fn) {
  return function (event) {
    // @ts-ignore
    if (event.target === this) fn.call(this, event);
  };
}

function attr(node, attribute, value) {
  if (value == null) node.removeAttribute(attribute);else if (node.getAttribute(attribute) !== value) node.setAttribute(attribute, value);
}

function set_attributes(node, attributes) {
  // @ts-ignore
  const descriptors = Object.getOwnPropertyDescriptors(node.__proto__);

  for (const key in attributes) {
    if (attributes[key] == null) {
      node.removeAttribute(key);
    } else if (key === 'style') {
      node.style.cssText = attributes[key];
    } else if (key === '__value') {
      node.value = node[key] = attributes[key];
    } else if (descriptors[key] && descriptors[key].set) {
      node[key] = attributes[key];
    } else {
      attr(node, key, attributes[key]);
    }
  }
}

function set_svg_attributes(node, attributes) {
  for (const key in attributes) {
    attr(node, key, attributes[key]);
  }
}

function set_custom_element_data(node, prop, value) {
  if (prop in node) {
    node[prop] = value;
  } else {
    attr(node, prop, value);
  }
}

function xlink_attr(node, attribute, value) {
  node.setAttributeNS('http://www.w3.org/1999/xlink', attribute, value);
}

function get_binding_group_value(group, __value, checked) {
  const value = new Set();

  for (let i = 0; i < group.length; i += 1) {
    if (group[i].checked) value.add(group[i].__value);
  }

  if (!checked) {
    value.delete(__value);
  }

  return Array.from(value);
}

function to_number(value) {
  return value === '' ? undefined : +value;
}

function time_ranges_to_array(ranges) {
  const array = [];

  for (let i = 0; i < ranges.length; i += 1) {
    array.push({
      start: ranges.start(i),
      end: ranges.end(i)
    });
  }

  return array;
}

function children(element) {
  return Array.from(element.childNodes);
}

function claim_element(nodes, name, attributes, svg) {
  for (let i = 0; i < nodes.length; i += 1) {
    const node = nodes[i];

    if (node.nodeName === name) {
      let j = 0;
      const remove = [];

      while (j < node.attributes.length) {
        const attribute = node.attributes[j++];

        if (!attributes[attribute.name]) {
          remove.push(attribute.name);
        }
      }

      for (let k = 0; k < remove.length; k++) {
        node.removeAttribute(remove[k]);
      }

      return nodes.splice(i, 1)[0];
    }
  }

  return svg ? svg_element(name) : element(name);
}

function claim_text(nodes, data) {
  for (let i = 0; i < nodes.length; i += 1) {
    const node = nodes[i];

    if (node.nodeType === 3) {
      node.data = '' + data;
      return nodes.splice(i, 1)[0];
    }
  }

  return text(data);
}

function claim_space(nodes) {
  return claim_text(nodes, ' ');
}

function set_data(text, data) {
  data = '' + data;
  if (text.wholeText !== data) text.data = data;
}

function set_input_value(input, value) {
  input.value = value == null ? '' : value;
}

function set_input_type(input, type) {
  try {
    input.type = type;
  } catch (e) {// do nothing
  }
}

function set_style(node, key, value, important) {
  node.style.setProperty(key, value, important ? 'important' : '');
}

function select_option(select, value) {
  for (let i = 0; i < select.options.length; i += 1) {
    const option = select.options[i];

    if (option.__value === value) {
      option.selected = true;
      return;
    }
  }
}

function select_options(select, value) {
  for (let i = 0; i < select.options.length; i += 1) {
    const option = select.options[i];
    option.selected = ~value.indexOf(option.__value);
  }
}

function select_value(select) {
  const selected_option = select.querySelector(':checked') || select.options[0];
  return selected_option && selected_option.__value;
}

function select_multiple_value(select) {
  return [].map.call(select.querySelectorAll(':checked'), option => option.__value);
} // unfortunately this can't be a constant as that wouldn't be tree-shakeable
// so we cache the result instead


let crossorigin;

function is_crossorigin() {
  if (crossorigin === undefined) {
    crossorigin = false;

    try {
      if (typeof window !== 'undefined' && window.parent) {
        void window.parent.document;
      }
    } catch (error) {
      crossorigin = true;
    }
  }

  return crossorigin;
}

function add_resize_listener(node, fn) {
  const computed_style = getComputedStyle(node);
  const z_index = (parseInt(computed_style.zIndex) || 0) - 1;

  if (computed_style.position === 'static') {
    node.style.position = 'relative';
  }

  const iframe = element('iframe');
  iframe.setAttribute('style', `display: block; position: absolute; top: 0; left: 0; width: 100%; height: 100%; ` + `overflow: hidden; border: 0; opacity: 0; pointer-events: none; z-index: ${z_index};`);
  iframe.setAttribute('aria-hidden', 'true');
  iframe.tabIndex = -1;
  const crossorigin = is_crossorigin();
  let unsubscribe;

  if (crossorigin) {
    iframe.src = `data:text/html,<script>onresize=function(){parent.postMessage(0,'*')}</script>`;
    unsubscribe = listen(window, 'message', event => {
      if (event.source === iframe.contentWindow) fn();
    });
  } else {
    iframe.src = 'about:blank';

    iframe.onload = () => {
      unsubscribe = listen(iframe.contentWindow, 'resize', fn);
    };
  }

  append(node, iframe);
  return () => {
    if (crossorigin) {
      unsubscribe();
    } else if (unsubscribe && iframe.contentWindow) {
      unsubscribe();
    }

    detach(iframe);
  };
}

function toggle_class(element, name, toggle) {
  element.classList[toggle ? 'add' : 'remove'](name);
}

function custom_event(type, detail) {
  const e = document.createEvent('CustomEvent');
  e.initCustomEvent(type, false, false, detail);
  return e;
}

function query_selector_all(selector, parent = document.body) {
  return Array.from(parent.querySelectorAll(selector));
}

class HtmlTag {
  constructor(anchor = null) {
    this.a = anchor;
    this.e = this.n = null;
  }

  m(html, target, anchor = null) {
    if (!this.e) {
      this.e = element(target.nodeName);
      this.t = target;
      this.h(html);
    }

    this.i(anchor);
  }

  h(html) {
    this.e.innerHTML = html;
    this.n = Array.from(this.e.childNodes);
  }

  i(anchor) {
    for (let i = 0; i < this.n.length; i += 1) {
      insert(this.t, this.n[i], anchor);
    }
  }

  p(html) {
    this.d();
    this.h(html);
    this.i(this.a);
  }

  d() {
    this.n.forEach(detach);
  }

}

exports.HtmlTag = HtmlTag;
const active_docs = new Set();
let active = 0; // https://github.com/darkskyapp/string-hash/blob/master/index.js

function hash(str) {
  let hash = 5381;
  let i = str.length;

  while (i--) hash = (hash << 5) - hash ^ str.charCodeAt(i);

  return hash >>> 0;
}

function create_rule(node, a, b, duration, delay, ease, fn, uid = 0) {
  const step = 16.666 / duration;
  let keyframes = '{\n';

  for (let p = 0; p <= 1; p += step) {
    const t = a + (b - a) * ease(p);
    keyframes += p * 100 + `%{${fn(t, 1 - t)}}\n`;
  }

  const rule = keyframes + `100% {${fn(b, 1 - b)}}\n}`;
  const name = `__svelte_${hash(rule)}_${uid}`;
  const doc = node.ownerDocument;
  active_docs.add(doc);
  const stylesheet = doc.__svelte_stylesheet || (doc.__svelte_stylesheet = doc.head.appendChild(element('style')).sheet);
  const current_rules = doc.__svelte_rules || (doc.__svelte_rules = {});

  if (!current_rules[name]) {
    current_rules[name] = true;
    stylesheet.insertRule(`@keyframes ${name} ${rule}`, stylesheet.cssRules.length);
  }

  const animation = node.style.animation || '';
  node.style.animation = `${animation ? `${animation}, ` : ``}${name} ${duration}ms linear ${delay}ms 1 both`;
  active += 1;
  return name;
}

function delete_rule(node, name) {
  const previous = (node.style.animation || '').split(', ');
  const next = previous.filter(name ? anim => anim.indexOf(name) < 0 // remove specific animation
  : anim => anim.indexOf('__svelte') === -1 // remove all Svelte animations
  );
  const deleted = previous.length - next.length;

  if (deleted) {
    node.style.animation = next.join(', ');
    active -= deleted;
    if (!active) clear_rules();
  }
}

function clear_rules() {
  raf(() => {
    if (active) return;
    active_docs.forEach(doc => {
      const stylesheet = doc.__svelte_stylesheet;
      let i = stylesheet.cssRules.length;

      while (i--) stylesheet.deleteRule(i);

      doc.__svelte_rules = {};
    });
    active_docs.clear();
  });
}

function create_animation(node, from, fn, params) {
  if (!from) return noop;
  const to = node.getBoundingClientRect();
  if (from.left === to.left && from.right === to.right && from.top === to.top && from.bottom === to.bottom) return noop;
  const {
    delay = 0,
    duration = 300,
    easing = identity,
    // @ts-ignore todo: should this be separated from destructuring? Or start/end added to public api and documentation?
    start: start_time = now() + delay,
    // @ts-ignore todo:
    end = start_time + duration,
    tick = noop,
    css
  } = fn(node, {
    from,
    to
  }, params);
  let running = true;
  let started = false;
  let name;

  function start() {
    if (css) {
      name = create_rule(node, 0, 1, duration, delay, easing, css);
    }

    if (!delay) {
      started = true;
    }
  }

  function stop() {
    if (css) delete_rule(node, name);
    running = false;
  }

  loop(now => {
    if (!started && now >= start_time) {
      started = true;
    }

    if (started && now >= end) {
      tick(1, 0);
      stop();
    }

    if (!running) {
      return false;
    }

    if (started) {
      const p = now - start_time;
      const t = 0 + 1 * easing(p / duration);
      tick(t, 1 - t);
    }

    return true;
  });
  start();
  tick(0, 1);
  return stop;
}

function fix_position(node) {
  const style = getComputedStyle(node);

  if (style.position !== 'absolute' && style.position !== 'fixed') {
    const {
      width,
      height
    } = style;
    const a = node.getBoundingClientRect();
    node.style.position = 'absolute';
    node.style.width = width;
    node.style.height = height;
    add_transform(node, a);
  }
}

function add_transform(node, a) {
  const b = node.getBoundingClientRect();

  if (a.left !== b.left || a.top !== b.top) {
    const style = getComputedStyle(node);
    const transform = style.transform === 'none' ? '' : style.transform;
    node.style.transform = `${transform} translate(${a.left - b.left}px, ${a.top - b.top}px)`;
  }
}

let current_component;
exports.current_component = current_component;

function set_current_component(component) {
  exports.current_component = current_component = component;
}

function get_current_component() {
  if (!current_component) throw new Error(`Function called outside component initialization`);
  return current_component;
}

function beforeUpdate(fn) {
  get_current_component().$$.before_update.push(fn);
}

function onMount(fn) {
  get_current_component().$$.on_mount.push(fn);
}

function afterUpdate(fn) {
  get_current_component().$$.after_update.push(fn);
}

function onDestroy(fn) {
  get_current_component().$$.on_destroy.push(fn);
}

function createEventDispatcher() {
  const component = get_current_component();
  return (type, detail) => {
    const callbacks = component.$$.callbacks[type];

    if (callbacks) {
      // TODO are there situations where events could be dispatched
      // in a server (non-DOM) environment?
      const event = custom_event(type, detail);
      callbacks.slice().forEach(fn => {
        fn.call(component, event);
      });
    }
  };
}

function setContext(key, context) {
  get_current_component().$$.context.set(key, context);
}

function getContext(key) {
  return get_current_component().$$.context.get(key);
} // TODO figure out if we still want to support
// shorthand events, or if we want to implement
// a real bubbling mechanism


function bubble(component, event) {
  const callbacks = component.$$.callbacks[event.type];

  if (callbacks) {
    callbacks.slice().forEach(fn => fn(event));
  }
}

const dirty_components = [];
exports.dirty_components = dirty_components;
const intros = {
  enabled: false
};
exports.intros = intros;
const binding_callbacks = [];
exports.binding_callbacks = binding_callbacks;
const render_callbacks = [];
const flush_callbacks = [];
const resolved_promise = Promise.resolve();
let update_scheduled = false;

function schedule_update() {
  if (!update_scheduled) {
    update_scheduled = true;
    resolved_promise.then(flush);
  }
}

function tick() {
  schedule_update();
  return resolved_promise;
}

function add_render_callback(fn) {
  render_callbacks.push(fn);
}

function add_flush_callback(fn) {
  flush_callbacks.push(fn);
}

let flushing = false;
const seen_callbacks = new Set();

function flush() {
  if (flushing) return;
  flushing = true;

  do {
    // first, call beforeUpdate functions
    // and update components
    for (let i = 0; i < dirty_components.length; i += 1) {
      const component = dirty_components[i];
      set_current_component(component);
      update(component.$$);
    }

    dirty_components.length = 0;

    while (binding_callbacks.length) binding_callbacks.pop()(); // then, once components are updated, call
    // afterUpdate functions. This may cause
    // subsequent updates...


    for (let i = 0; i < render_callbacks.length; i += 1) {
      const callback = render_callbacks[i];

      if (!seen_callbacks.has(callback)) {
        // ...so guard against infinite loops
        seen_callbacks.add(callback);
        callback();
      }
    }

    render_callbacks.length = 0;
  } while (dirty_components.length);

  while (flush_callbacks.length) {
    flush_callbacks.pop()();
  }

  update_scheduled = false;
  flushing = false;
  seen_callbacks.clear();
}

function update($$) {
  if ($$.fragment !== null) {
    $$.update();
    run_all($$.before_update);
    const dirty = $$.dirty;
    $$.dirty = [-1];
    $$.fragment && $$.fragment.p($$.ctx, dirty);
    $$.after_update.forEach(add_render_callback);
  }
}

let promise;

function wait() {
  if (!promise) {
    promise = Promise.resolve();
    promise.then(() => {
      promise = null;
    });
  }

  return promise;
}

function dispatch(node, direction, kind) {
  node.dispatchEvent(custom_event(`${direction ? 'intro' : 'outro'}${kind}`));
}

const outroing = new Set();
let outros;

function group_outros() {
  outros = {
    r: 0,
    c: [],
    p: outros // parent group

  };
}

function check_outros() {
  if (!outros.r) {
    run_all(outros.c);
  }

  outros = outros.p;
}

function transition_in(block, local) {
  if (block && block.i) {
    outroing.delete(block);
    block.i(local);
  }
}

function transition_out(block, local, detach, callback) {
  if (block && block.o) {
    if (outroing.has(block)) return;
    outroing.add(block);
    outros.c.push(() => {
      outroing.delete(block);

      if (callback) {
        if (detach) block.d(1);
        callback();
      }
    });
    block.o(local);
  }
}

const null_transition = {
  duration: 0
};

function create_in_transition(node, fn, params) {
  let config = fn(node, params);
  let running = false;
  let animation_name;
  let task;
  let uid = 0;

  function cleanup() {
    if (animation_name) delete_rule(node, animation_name);
  }

  function go() {
    const {
      delay = 0,
      duration = 300,
      easing = identity,
      tick = noop,
      css
    } = config || null_transition;
    if (css) animation_name = create_rule(node, 0, 1, duration, delay, easing, css, uid++);
    tick(0, 1);
    const start_time = now() + delay;
    const end_time = start_time + duration;
    if (task) task.abort();
    running = true;
    add_render_callback(() => dispatch(node, true, 'start'));
    task = loop(now => {
      if (running) {
        if (now >= end_time) {
          tick(1, 0);
          dispatch(node, true, 'end');
          cleanup();
          return running = false;
        }

        if (now >= start_time) {
          const t = easing((now - start_time) / duration);
          tick(t, 1 - t);
        }
      }

      return running;
    });
  }

  let started = false;
  return {
    start() {
      if (started) return;
      delete_rule(node);

      if (is_function(config)) {
        config = config();
        wait().then(go);
      } else {
        go();
      }
    },

    invalidate() {
      started = false;
    },

    end() {
      if (running) {
        cleanup();
        running = false;
      }
    }

  };
}

function create_out_transition(node, fn, params) {
  let config = fn(node, params);
  let running = true;
  let animation_name;
  const group = outros;
  group.r += 1;

  function go() {
    const {
      delay = 0,
      duration = 300,
      easing = identity,
      tick = noop,
      css
    } = config || null_transition;
    if (css) animation_name = create_rule(node, 1, 0, duration, delay, easing, css);
    const start_time = now() + delay;
    const end_time = start_time + duration;
    add_render_callback(() => dispatch(node, false, 'start'));
    loop(now => {
      if (running) {
        if (now >= end_time) {
          tick(0, 1);
          dispatch(node, false, 'end');

          if (! --group.r) {
            // this will result in `end()` being called,
            // so we don't need to clean up here
            run_all(group.c);
          }

          return false;
        }

        if (now >= start_time) {
          const t = easing((now - start_time) / duration);
          tick(1 - t, t);
        }
      }

      return running;
    });
  }

  if (is_function(config)) {
    wait().then(() => {
      // @ts-ignore
      config = config();
      go();
    });
  } else {
    go();
  }

  return {
    end(reset) {
      if (reset && config.tick) {
        config.tick(1, 0);
      }

      if (running) {
        if (animation_name) delete_rule(node, animation_name);
        running = false;
      }
    }

  };
}

function create_bidirectional_transition(node, fn, params, intro) {
  let config = fn(node, params);
  let t = intro ? 0 : 1;
  let running_program = null;
  let pending_program = null;
  let animation_name = null;

  function clear_animation() {
    if (animation_name) delete_rule(node, animation_name);
  }

  function init(program, duration) {
    const d = program.b - t;
    duration *= Math.abs(d);
    return {
      a: t,
      b: program.b,
      d,
      duration,
      start: program.start,
      end: program.start + duration,
      group: program.group
    };
  }

  function go(b) {
    const {
      delay = 0,
      duration = 300,
      easing = identity,
      tick = noop,
      css
    } = config || null_transition;
    const program = {
      start: now() + delay,
      b
    };

    if (!b) {
      // @ts-ignore todo: improve typings
      program.group = outros;
      outros.r += 1;
    }

    if (running_program) {
      pending_program = program;
    } else {
      // if this is an intro, and there's a delay, we need to do
      // an initial tick and/or apply CSS animation immediately
      if (css) {
        clear_animation();
        animation_name = create_rule(node, t, b, duration, delay, easing, css);
      }

      if (b) tick(0, 1);
      running_program = init(program, duration);
      add_render_callback(() => dispatch(node, b, 'start'));
      loop(now => {
        if (pending_program && now > pending_program.start) {
          running_program = init(pending_program, duration);
          pending_program = null;
          dispatch(node, running_program.b, 'start');

          if (css) {
            clear_animation();
            animation_name = create_rule(node, t, running_program.b, running_program.duration, 0, easing, config.css);
          }
        }

        if (running_program) {
          if (now >= running_program.end) {
            tick(t = running_program.b, 1 - t);
            dispatch(node, running_program.b, 'end');

            if (!pending_program) {
              // we're done
              if (running_program.b) {
                // intro — we can tidy up immediately
                clear_animation();
              } else {
                // outro — needs to be coordinated
                if (! --running_program.group.r) run_all(running_program.group.c);
              }
            }

            running_program = null;
          } else if (now >= running_program.start) {
            const p = now - running_program.start;
            t = running_program.a + running_program.d * easing(p / running_program.duration);
            tick(t, 1 - t);
          }
        }

        return !!(running_program || pending_program);
      });
    }
  }

  return {
    run(b) {
      if (is_function(config)) {
        wait().then(() => {
          // @ts-ignore
          config = config();
          go(b);
        });
      } else {
        go(b);
      }
    },

    end() {
      clear_animation();
      running_program = pending_program = null;
    }

  };
}

function handle_promise(promise, info) {
  const token = info.token = {};

  function update(type, index, key, value) {
    if (info.token !== token) return;
    info.resolved = value;
    let child_ctx = info.ctx;

    if (key !== undefined) {
      child_ctx = child_ctx.slice();
      child_ctx[key] = value;
    }

    const block = type && (info.current = type)(child_ctx);
    let needs_flush = false;

    if (info.block) {
      if (info.blocks) {
        info.blocks.forEach((block, i) => {
          if (i !== index && block) {
            group_outros();
            transition_out(block, 1, 1, () => {
              info.blocks[i] = null;
            });
            check_outros();
          }
        });
      } else {
        info.block.d(1);
      }

      block.c();
      transition_in(block, 1);
      block.m(info.mount(), info.anchor);
      needs_flush = true;
    }

    info.block = block;
    if (info.blocks) info.blocks[index] = block;

    if (needs_flush) {
      flush();
    }
  }

  if (is_promise(promise)) {
    const current_component = get_current_component();
    promise.then(value => {
      set_current_component(current_component);
      update(info.then, 1, info.value, value);
      set_current_component(null);
    }, error => {
      set_current_component(current_component);
      update(info.catch, 2, info.error, error);
      set_current_component(null);
    }); // if we previously had a then/catch block, destroy it

    if (info.current !== info.pending) {
      update(info.pending, 0);
      return true;
    }
  } else {
    if (info.current !== info.then) {
      update(info.then, 1, info.value, promise);
      return true;
    }

    info.resolved = promise;
  }
}

const globals = typeof window !== 'undefined' ? window : typeof globalThis !== 'undefined' ? globalThis : global;
exports.globals = globals;

function destroy_block(block, lookup) {
  block.d(1);
  lookup.delete(block.key);
}

function outro_and_destroy_block(block, lookup) {
  transition_out(block, 1, 1, () => {
    lookup.delete(block.key);
  });
}

function fix_and_destroy_block(block, lookup) {
  block.f();
  destroy_block(block, lookup);
}

function fix_and_outro_and_destroy_block(block, lookup) {
  block.f();
  outro_and_destroy_block(block, lookup);
}

function update_keyed_each(old_blocks, dirty, get_key, dynamic, ctx, list, lookup, node, destroy, create_each_block, next, get_context) {
  let o = old_blocks.length;
  let n = list.length;
  let i = o;
  const old_indexes = {};

  while (i--) old_indexes[old_blocks[i].key] = i;

  const new_blocks = [];
  const new_lookup = new Map();
  const deltas = new Map();
  i = n;

  while (i--) {
    const child_ctx = get_context(ctx, list, i);
    const key = get_key(child_ctx);
    let block = lookup.get(key);

    if (!block) {
      block = create_each_block(key, child_ctx);
      block.c();
    } else if (dynamic) {
      block.p(child_ctx, dirty);
    }

    new_lookup.set(key, new_blocks[i] = block);
    if (key in old_indexes) deltas.set(key, Math.abs(i - old_indexes[key]));
  }

  const will_move = new Set();
  const did_move = new Set();

  function insert(block) {
    transition_in(block, 1);
    block.m(node, next);
    lookup.set(block.key, block);
    next = block.first;
    n--;
  }

  while (o && n) {
    const new_block = new_blocks[n - 1];
    const old_block = old_blocks[o - 1];
    const new_key = new_block.key;
    const old_key = old_block.key;

    if (new_block === old_block) {
      // do nothing
      next = new_block.first;
      o--;
      n--;
    } else if (!new_lookup.has(old_key)) {
      // remove old block
      destroy(old_block, lookup);
      o--;
    } else if (!lookup.has(new_key) || will_move.has(new_key)) {
      insert(new_block);
    } else if (did_move.has(old_key)) {
      o--;
    } else if (deltas.get(new_key) > deltas.get(old_key)) {
      did_move.add(new_key);
      insert(new_block);
    } else {
      will_move.add(old_key);
      o--;
    }
  }

  while (o--) {
    const old_block = old_blocks[o];
    if (!new_lookup.has(old_block.key)) destroy(old_block, lookup);
  }

  while (n) insert(new_blocks[n - 1]);

  return new_blocks;
}

function validate_each_keys(ctx, list, get_context, get_key) {
  const keys = new Set();

  for (let i = 0; i < list.length; i++) {
    const key = get_key(get_context(ctx, list, i));

    if (keys.has(key)) {
      throw new Error(`Cannot have duplicate keys in a keyed each`);
    }

    keys.add(key);
  }
}

function get_spread_update(levels, updates) {
  const update = {};
  const to_null_out = {};
  const accounted_for = {
    $$scope: 1
  };
  let i = levels.length;

  while (i--) {
    const o = levels[i];
    const n = updates[i];

    if (n) {
      for (const key in o) {
        if (!(key in n)) to_null_out[key] = 1;
      }

      for (const key in n) {
        if (!accounted_for[key]) {
          update[key] = n[key];
          accounted_for[key] = 1;
        }
      }

      levels[i] = n;
    } else {
      for (const key in o) {
        accounted_for[key] = 1;
      }
    }
  }

  for (const key in to_null_out) {
    if (!(key in update)) update[key] = undefined;
  }

  return update;
}

function get_spread_object(spread_props) {
  return typeof spread_props === 'object' && spread_props !== null ? spread_props : {};
} // source: https://html.spec.whatwg.org/multipage/indices.html


const boolean_attributes = new Set(['allowfullscreen', 'allowpaymentrequest', 'async', 'autofocus', 'autoplay', 'checked', 'controls', 'default', 'defer', 'disabled', 'formnovalidate', 'hidden', 'ismap', 'loop', 'multiple', 'muted', 'nomodule', 'novalidate', 'open', 'playsinline', 'readonly', 'required', 'reversed', 'selected']);
const invalid_attribute_name_character = /[\s'">/=\u{FDD0}-\u{FDEF}\u{FFFE}\u{FFFF}\u{1FFFE}\u{1FFFF}\u{2FFFE}\u{2FFFF}\u{3FFFE}\u{3FFFF}\u{4FFFE}\u{4FFFF}\u{5FFFE}\u{5FFFF}\u{6FFFE}\u{6FFFF}\u{7FFFE}\u{7FFFF}\u{8FFFE}\u{8FFFF}\u{9FFFE}\u{9FFFF}\u{AFFFE}\u{AFFFF}\u{BFFFE}\u{BFFFF}\u{CFFFE}\u{CFFFF}\u{DFFFE}\u{DFFFF}\u{EFFFE}\u{EFFFF}\u{FFFFE}\u{FFFFF}\u{10FFFE}\u{10FFFF}]/u; // https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
// https://infra.spec.whatwg.org/#noncharacter

exports.invalid_attribute_name_character = invalid_attribute_name_character;

function spread(args, classes_to_add) {
  const attributes = Object.assign({}, ...args);

  if (classes_to_add) {
    if (attributes.class == null) {
      attributes.class = classes_to_add;
    } else {
      attributes.class += ' ' + classes_to_add;
    }
  }

  let str = '';
  Object.keys(attributes).forEach(name => {
    if (invalid_attribute_name_character.test(name)) return;
    const value = attributes[name];
    if (value === true) str += " " + name;else if (boolean_attributes.has(name.toLowerCase())) {
      if (value) str += " " + name;
    } else if (value != null) {
      str += ` ${name}="${String(value).replace(/"/g, '&#34;').replace(/'/g, '&#39;')}"`;
    }
  });
  return str;
}

const escaped = {
  '"': '&quot;',
  "'": '&#39;',
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;'
};
exports.escaped = escaped;

function escape(html) {
  return String(html).replace(/["'&<>]/g, match => escaped[match]);
}

function each(items, fn) {
  let str = '';

  for (let i = 0; i < items.length; i += 1) {
    str += fn(items[i], i);
  }

  return str;
}

const missing_component = {
  $$render: () => ''
};
exports.missing_component = missing_component;

function validate_component(component, name) {
  if (!component || !component.$$render) {
    if (name === 'svelte:component') name += ' this={...}';
    throw new Error(`<${name}> is not a valid SSR component. You may need to review your build config to ensure that dependencies are compiled, rather than imported as pre-compiled modules`);
  }

  return component;
}

function debug(file, line, column, values) {
  console.log(`{@debug} ${file ? file + ' ' : ''}(${line}:${column})`); // eslint-disable-line no-console

  console.log(values); // eslint-disable-line no-console

  return '';
}

let on_destroy;

function create_ssr_component(fn) {
  function $$render(result, props, bindings, slots) {
    const parent_component = current_component;
    const $$ = {
      on_destroy,
      context: new Map(parent_component ? parent_component.$$.context : []),
      // these will be immediately discarded
      on_mount: [],
      before_update: [],
      after_update: [],
      callbacks: blank_object()
    };
    set_current_component({
      $$
    });
    const html = fn(result, props, bindings, slots);
    set_current_component(parent_component);
    return html;
  }

  return {
    render: (props = {}, options = {}) => {
      on_destroy = [];
      const result = {
        title: '',
        head: '',
        css: new Set()
      };
      const html = $$render(result, props, {}, options);
      run_all(on_destroy);
      return {
        html,
        css: {
          code: Array.from(result.css).map(css => css.code).join('\n'),
          map: null // TODO

        },
        head: result.title + result.head
      };
    },
    $$render
  };
}

function add_attribute(name, value, boolean) {
  if (value == null || boolean && !value) return '';
  return ` ${name}${value === true ? '' : `=${typeof value === 'string' ? JSON.stringify(escape(value)) : `"${value}"`}`}`;
}

function add_classes(classes) {
  return classes ? ` class="${classes}"` : ``;
}

function bind(component, name, callback) {
  const index = component.$$.props[name];

  if (index !== undefined) {
    component.$$.bound[index] = callback;
    callback(component.$$.ctx[index]);
  }
}

function create_component(block) {
  block && block.c();
}

function claim_component(block, parent_nodes) {
  block && block.l(parent_nodes);
}

function mount_component(component, target, anchor) {
  const {
    fragment,
    on_mount,
    on_destroy,
    after_update
  } = component.$$;
  fragment && fragment.m(target, anchor); // onMount happens before the initial afterUpdate

  add_render_callback(() => {
    const new_on_destroy = on_mount.map(run).filter(is_function);

    if (on_destroy) {
      on_destroy.push(...new_on_destroy);
    } else {
      // Edge case - component was destroyed immediately,
      // most likely as a result of a binding initialising
      run_all(new_on_destroy);
    }

    component.$$.on_mount = [];
  });
  after_update.forEach(add_render_callback);
}

function destroy_component(component, detaching) {
  const $$ = component.$$;

  if ($$.fragment !== null) {
    run_all($$.on_destroy);
    $$.fragment && $$.fragment.d(detaching); // TODO null out other refs, including component.$$ (but need to
    // preserve final state?)

    $$.on_destroy = $$.fragment = null;
    $$.ctx = [];
  }
}

function make_dirty(component, i) {
  if (component.$$.dirty[0] === -1) {
    dirty_components.push(component);
    schedule_update();
    component.$$.dirty.fill(0);
  }

  component.$$.dirty[i / 31 | 0] |= 1 << i % 31;
}

function init(component, options, instance, create_fragment, not_equal, props, dirty = [-1]) {
  const parent_component = current_component;
  set_current_component(component);
  const prop_values = options.props || {};
  const $$ = component.$$ = {
    fragment: null,
    ctx: null,
    // state
    props,
    update: noop,
    not_equal,
    bound: blank_object(),
    // lifecycle
    on_mount: [],
    on_destroy: [],
    before_update: [],
    after_update: [],
    context: new Map(parent_component ? parent_component.$$.context : []),
    // everything else
    callbacks: blank_object(),
    dirty
  };
  let ready = false;
  $$.ctx = instance ? instance(component, prop_values, (i, ret, ...rest) => {
    const value = rest.length ? rest[0] : ret;

    if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
      if ($$.bound[i]) $$.bound[i](value);
      if (ready) make_dirty(component, i);
    }

    return ret;
  }) : [];
  $$.update();
  ready = true;
  run_all($$.before_update); // `false` as a special case of no DOM component

  $$.fragment = create_fragment ? create_fragment($$.ctx) : false;

  if (options.target) {
    if (options.hydrate) {
      const nodes = children(options.target); // eslint-disable-next-line @typescript-eslint/no-non-null-assertion

      $$.fragment && $$.fragment.l(nodes);
      nodes.forEach(detach);
    } else {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      $$.fragment && $$.fragment.c();
    }

    if (options.intro) transition_in(component.$$.fragment);
    mount_component(component, options.target, options.anchor);
    flush();
  }

  set_current_component(parent_component);
}

let SvelteElement;
exports.SvelteElement = SvelteElement;

if (typeof HTMLElement === 'function') {
  exports.SvelteElement = SvelteElement = class extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({
        mode: 'open'
      });
    }

    connectedCallback() {
      // @ts-ignore todo: improve typings
      for (const key in this.$$.slotted) {
        // @ts-ignore todo: improve typings
        this.appendChild(this.$$.slotted[key]);
      }
    }

    attributeChangedCallback(attr, _oldValue, newValue) {
      this[attr] = newValue;
    }

    $destroy() {
      destroy_component(this, 1);
      this.$destroy = noop;
    }

    $on(type, callback) {
      // TODO should this delegate to addEventListener?
      const callbacks = this.$$.callbacks[type] || (this.$$.callbacks[type] = []);
      callbacks.push(callback);
      return () => {
        const index = callbacks.indexOf(callback);
        if (index !== -1) callbacks.splice(index, 1);
      };
    }

    $set() {// overridden by instance, if it has props
    }

  };
}

class SvelteComponent {
  $destroy() {
    destroy_component(this, 1);
    this.$destroy = noop;
  }

  $on(type, callback) {
    const callbacks = this.$$.callbacks[type] || (this.$$.callbacks[type] = []);
    callbacks.push(callback);
    return () => {
      const index = callbacks.indexOf(callback);
      if (index !== -1) callbacks.splice(index, 1);
    };
  }

  $set() {// overridden by instance, if it has props
  }

}

exports.SvelteComponent = SvelteComponent;

function dispatch_dev(type, detail) {
  document.dispatchEvent(custom_event(type, Object.assign({
    version: '3.24.0'
  }, detail)));
}

function append_dev(target, node) {
  dispatch_dev("SvelteDOMInsert", {
    target,
    node
  });
  append(target, node);
}

function insert_dev(target, node, anchor) {
  dispatch_dev("SvelteDOMInsert", {
    target,
    node,
    anchor
  });
  insert(target, node, anchor);
}

function detach_dev(node) {
  dispatch_dev("SvelteDOMRemove", {
    node
  });
  detach(node);
}

function detach_between_dev(before, after) {
  while (before.nextSibling && before.nextSibling !== after) {
    detach_dev(before.nextSibling);
  }
}

function detach_before_dev(after) {
  while (after.previousSibling) {
    detach_dev(after.previousSibling);
  }
}

function detach_after_dev(before) {
  while (before.nextSibling) {
    detach_dev(before.nextSibling);
  }
}

function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
  const modifiers = options === true ? ["capture"] : options ? Array.from(Object.keys(options)) : [];
  if (has_prevent_default) modifiers.push('preventDefault');
  if (has_stop_propagation) modifiers.push('stopPropagation');
  dispatch_dev("SvelteDOMAddEventListener", {
    node,
    event,
    handler,
    modifiers
  });
  const dispose = listen(node, event, handler, options);
  return () => {
    dispatch_dev("SvelteDOMRemoveEventListener", {
      node,
      event,
      handler,
      modifiers
    });
    dispose();
  };
}

function attr_dev(node, attribute, value) {
  attr(node, attribute, value);
  if (value == null) dispatch_dev("SvelteDOMRemoveAttribute", {
    node,
    attribute
  });else dispatch_dev("SvelteDOMSetAttribute", {
    node,
    attribute,
    value
  });
}

function prop_dev(node, property, value) {
  node[property] = value;
  dispatch_dev("SvelteDOMSetProperty", {
    node,
    property,
    value
  });
}

function dataset_dev(node, property, value) {
  node.dataset[property] = value;
  dispatch_dev("SvelteDOMSetDataset", {
    node,
    property,
    value
  });
}

function set_data_dev(text, data) {
  data = '' + data;
  if (text.wholeText === data) return;
  dispatch_dev("SvelteDOMSetData", {
    node: text,
    data
  });
  text.data = data;
}

function validate_each_argument(arg) {
  if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
    let msg = '{#each} only iterates over array-like objects.';

    if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
      msg += ' You can use a spread to convert this iterable into an array.';
    }

    throw new Error(msg);
  }
}

function validate_slots(name, slot, keys) {
  for (const slot_key of Object.keys(slot)) {
    if (!~keys.indexOf(slot_key)) {
      console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
    }
  }
}

class SvelteComponentDev extends SvelteComponent {
  constructor(options) {
    if (!options || !options.target && !options.$$inline) {
      throw new Error(`'target' is a required option`);
    }

    super();
  }

  $destroy() {
    super.$destroy();

    this.$destroy = () => {
      console.warn(`Component was already destroyed`); // eslint-disable-line no-console
    };
  }

  $capture_state() {}

  $inject_state() {}

}

exports.SvelteComponentDev = SvelteComponentDev;

function loop_guard(timeout) {
  const start = Date.now();
  return () => {
    if (Date.now() - start > timeout) {
      throw new Error(`Infinite loop detected`);
    }
  };
}
},{}],"../node_modules/svelte/easing/index.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.backIn = backIn;
exports.backInOut = backInOut;
exports.backOut = backOut;
exports.bounceIn = bounceIn;
exports.bounceInOut = bounceInOut;
exports.bounceOut = bounceOut;
exports.circIn = circIn;
exports.circInOut = circInOut;
exports.circOut = circOut;
exports.cubicIn = cubicIn;
exports.cubicInOut = cubicInOut;
exports.cubicOut = cubicOut;
exports.elasticIn = elasticIn;
exports.elasticInOut = elasticInOut;
exports.elasticOut = elasticOut;
exports.expoIn = expoIn;
exports.expoInOut = expoInOut;
exports.expoOut = expoOut;
exports.quadIn = quadIn;
exports.quadInOut = quadInOut;
exports.quadOut = quadOut;
exports.quartIn = quartIn;
exports.quartInOut = quartInOut;
exports.quartOut = quartOut;
exports.quintIn = quintIn;
exports.quintInOut = quintInOut;
exports.quintOut = quintOut;
exports.sineIn = sineIn;
exports.sineInOut = sineInOut;
exports.sineOut = sineOut;
Object.defineProperty(exports, "linear", {
  enumerable: true,
  get: function () {
    return _internal.identity;
  }
});

var _internal = require("../internal");

/*
Adapted from https://github.com/mattdesl
Distributed under MIT License https://github.com/mattdesl/eases/blob/master/LICENSE.md
*/
function backInOut(t) {
  const s = 1.70158 * 1.525;
  if ((t *= 2) < 1) return 0.5 * (t * t * ((s + 1) * t - s));
  return 0.5 * ((t -= 2) * t * ((s + 1) * t + s) + 2);
}

function backIn(t) {
  const s = 1.70158;
  return t * t * ((s + 1) * t - s);
}

function backOut(t) {
  const s = 1.70158;
  return --t * t * ((s + 1) * t + s) + 1;
}

function bounceOut(t) {
  const a = 4.0 / 11.0;
  const b = 8.0 / 11.0;
  const c = 9.0 / 10.0;
  const ca = 4356.0 / 361.0;
  const cb = 35442.0 / 1805.0;
  const cc = 16061.0 / 1805.0;
  const t2 = t * t;
  return t < a ? 7.5625 * t2 : t < b ? 9.075 * t2 - 9.9 * t + 3.4 : t < c ? ca * t2 - cb * t + cc : 10.8 * t * t - 20.52 * t + 10.72;
}

function bounceInOut(t) {
  return t < 0.5 ? 0.5 * (1.0 - bounceOut(1.0 - t * 2.0)) : 0.5 * bounceOut(t * 2.0 - 1.0) + 0.5;
}

function bounceIn(t) {
  return 1.0 - bounceOut(1.0 - t);
}

function circInOut(t) {
  if ((t *= 2) < 1) return -0.5 * (Math.sqrt(1 - t * t) - 1);
  return 0.5 * (Math.sqrt(1 - (t -= 2) * t) + 1);
}

function circIn(t) {
  return 1.0 - Math.sqrt(1.0 - t * t);
}

function circOut(t) {
  return Math.sqrt(1 - --t * t);
}

function cubicInOut(t) {
  return t < 0.5 ? 4.0 * t * t * t : 0.5 * Math.pow(2.0 * t - 2.0, 3.0) + 1.0;
}

function cubicIn(t) {
  return t * t * t;
}

function cubicOut(t) {
  const f = t - 1.0;
  return f * f * f + 1.0;
}

function elasticInOut(t) {
  return t < 0.5 ? 0.5 * Math.sin(+13.0 * Math.PI / 2 * 2.0 * t) * Math.pow(2.0, 10.0 * (2.0 * t - 1.0)) : 0.5 * Math.sin(-13.0 * Math.PI / 2 * (2.0 * t - 1.0 + 1.0)) * Math.pow(2.0, -10.0 * (2.0 * t - 1.0)) + 1.0;
}

function elasticIn(t) {
  return Math.sin(13.0 * t * Math.PI / 2) * Math.pow(2.0, 10.0 * (t - 1.0));
}

function elasticOut(t) {
  return Math.sin(-13.0 * (t + 1.0) * Math.PI / 2) * Math.pow(2.0, -10.0 * t) + 1.0;
}

function expoInOut(t) {
  return t === 0.0 || t === 1.0 ? t : t < 0.5 ? +0.5 * Math.pow(2.0, 20.0 * t - 10.0) : -0.5 * Math.pow(2.0, 10.0 - t * 20.0) + 1.0;
}

function expoIn(t) {
  return t === 0.0 ? t : Math.pow(2.0, 10.0 * (t - 1.0));
}

function expoOut(t) {
  return t === 1.0 ? t : 1.0 - Math.pow(2.0, -10.0 * t);
}

function quadInOut(t) {
  t /= 0.5;
  if (t < 1) return 0.5 * t * t;
  t--;
  return -0.5 * (t * (t - 2) - 1);
}

function quadIn(t) {
  return t * t;
}

function quadOut(t) {
  return -t * (t - 2.0);
}

function quartInOut(t) {
  return t < 0.5 ? +8.0 * Math.pow(t, 4.0) : -8.0 * Math.pow(t - 1.0, 4.0) + 1.0;
}

function quartIn(t) {
  return Math.pow(t, 4.0);
}

function quartOut(t) {
  return Math.pow(t - 1.0, 3.0) * (1.0 - t) + 1.0;
}

function quintInOut(t) {
  if ((t *= 2) < 1) return 0.5 * t * t * t * t * t;
  return 0.5 * ((t -= 2) * t * t * t * t + 2);
}

function quintIn(t) {
  return t * t * t * t * t;
}

function quintOut(t) {
  return --t * t * t * t * t + 1;
}

function sineInOut(t) {
  return -0.5 * (Math.cos(Math.PI * t) - 1);
}

function sineIn(t) {
  const v = Math.cos(t * Math.PI * 0.5);
  if (Math.abs(v) < 1e-14) return 1;else return 1 - v;
}

function sineOut(t) {
  return Math.sin(t * Math.PI / 2);
}
},{"../internal":"../node_modules/svelte/internal/index.mjs"}],"../node_modules/svelte/transition/index.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.blur = blur;
exports.crossfade = crossfade;
exports.draw = draw;
exports.fade = fade;
exports.fly = fly;
exports.scale = scale;
exports.slide = slide;

var _easing = require("../easing");

var _internal = require("../internal");

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
function __rest(s, e) {
  var t = {};

  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
}

function blur(node, {
  delay = 0,
  duration = 400,
  easing = _easing.cubicInOut,
  amount = 5,
  opacity = 0
}) {
  const style = getComputedStyle(node);
  const target_opacity = +style.opacity;
  const f = style.filter === 'none' ? '' : style.filter;
  const od = target_opacity * (1 - opacity);
  return {
    delay,
    duration,
    easing,
    css: (_t, u) => `opacity: ${target_opacity - od * u}; filter: ${f} blur(${u * amount}px);`
  };
}

function fade(node, {
  delay = 0,
  duration = 400,
  easing = _easing.linear
}) {
  const o = +getComputedStyle(node).opacity;
  return {
    delay,
    duration,
    easing,
    css: t => `opacity: ${t * o}`
  };
}

function fly(node, {
  delay = 0,
  duration = 400,
  easing = _easing.cubicOut,
  x = 0,
  y = 0,
  opacity = 0
}) {
  const style = getComputedStyle(node);
  const target_opacity = +style.opacity;
  const transform = style.transform === 'none' ? '' : style.transform;
  const od = target_opacity * (1 - opacity);
  return {
    delay,
    duration,
    easing,
    css: (t, u) => `
			transform: ${transform} translate(${(1 - t) * x}px, ${(1 - t) * y}px);
			opacity: ${target_opacity - od * u}`
  };
}

function slide(node, {
  delay = 0,
  duration = 400,
  easing = _easing.cubicOut
}) {
  const style = getComputedStyle(node);
  const opacity = +style.opacity;
  const height = parseFloat(style.height);
  const padding_top = parseFloat(style.paddingTop);
  const padding_bottom = parseFloat(style.paddingBottom);
  const margin_top = parseFloat(style.marginTop);
  const margin_bottom = parseFloat(style.marginBottom);
  const border_top_width = parseFloat(style.borderTopWidth);
  const border_bottom_width = parseFloat(style.borderBottomWidth);
  return {
    delay,
    duration,
    easing,
    css: t => `overflow: hidden;` + `opacity: ${Math.min(t * 20, 1) * opacity};` + `height: ${t * height}px;` + `padding-top: ${t * padding_top}px;` + `padding-bottom: ${t * padding_bottom}px;` + `margin-top: ${t * margin_top}px;` + `margin-bottom: ${t * margin_bottom}px;` + `border-top-width: ${t * border_top_width}px;` + `border-bottom-width: ${t * border_bottom_width}px;`
  };
}

function scale(node, {
  delay = 0,
  duration = 400,
  easing = _easing.cubicOut,
  start = 0,
  opacity = 0
}) {
  const style = getComputedStyle(node);
  const target_opacity = +style.opacity;
  const transform = style.transform === 'none' ? '' : style.transform;
  const sd = 1 - start;
  const od = target_opacity * (1 - opacity);
  return {
    delay,
    duration,
    easing,
    css: (_t, u) => `
			transform: ${transform} scale(${1 - sd * u});
			opacity: ${target_opacity - od * u}
		`
  };
}

function draw(node, {
  delay = 0,
  speed,
  duration,
  easing = _easing.cubicInOut
}) {
  const len = node.getTotalLength();

  if (duration === undefined) {
    if (speed === undefined) {
      duration = 800;
    } else {
      duration = len / speed;
    }
  } else if (typeof duration === 'function') {
    duration = duration(len);
  }

  return {
    delay,
    duration,
    easing,
    css: (t, u) => `stroke-dasharray: ${t * len} ${u * len}`
  };
}

function crossfade(_a) {
  var {
    fallback
  } = _a,
      defaults = __rest(_a, ["fallback"]);

  const to_receive = new Map();
  const to_send = new Map();

  function crossfade(from, node, params) {
    const {
      delay = 0,
      duration = d => Math.sqrt(d) * 30,
      easing = _easing.cubicOut
    } = (0, _internal.assign)((0, _internal.assign)({}, defaults), params);
    const to = node.getBoundingClientRect();
    const dx = from.left - to.left;
    const dy = from.top - to.top;
    const dw = from.width / to.width;
    const dh = from.height / to.height;
    const d = Math.sqrt(dx * dx + dy * dy);
    const style = getComputedStyle(node);
    const transform = style.transform === 'none' ? '' : style.transform;
    const opacity = +style.opacity;
    return {
      delay,
      duration: (0, _internal.is_function)(duration) ? duration(d) : duration,
      easing,
      css: (t, u) => `
				opacity: ${t * opacity};
				transform-origin: top left;
				transform: ${transform} translate(${u * dx}px,${u * dy}px) scale(${t + (1 - t) * dw}, ${t + (1 - t) * dh});
			`
    };
  }

  function transition(items, counterparts, intro) {
    return (node, params) => {
      items.set(params.key, {
        rect: node.getBoundingClientRect()
      });
      return () => {
        if (counterparts.has(params.key)) {
          const {
            rect
          } = counterparts.get(params.key);
          counterparts.delete(params.key);
          return crossfade(rect, node, params);
        } // if the node is disappearing altogether
        // (i.e. wasn't claimed by the other list)
        // then we need to supply an outro


        items.delete(params.key);
        return fallback && fallback(node, params, intro);
      };
    };
  }

  return [transition(to_send, to_receive, false), transition(to_receive, to_send, true)];
}
},{"../easing":"../node_modules/svelte/easing/index.mjs","../internal":"../node_modules/svelte/internal/index.mjs"}],"../node_modules/svelte/store/index.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.derived = derived;
exports.readable = readable;
exports.writable = writable;
Object.defineProperty(exports, "get", {
  enumerable: true,
  get: function () {
    return _internal.get_store_value;
  }
});

var _internal = require("../internal");

const subscriber_queue = [];
/**
 * Creates a `Readable` store that allows reading by subscription.
 * @param value initial value
 * @param {StartStopNotifier}start start and stop notifications for subscriptions
 */

function readable(value, start) {
  return {
    subscribe: writable(value, start).subscribe
  };
}
/**
 * Create a `Writable` store that allows both updating and reading by subscription.
 * @param {*=}value initial value
 * @param {StartStopNotifier=}start start and stop notifications for subscriptions
 */


function writable(value, start = _internal.noop) {
  let stop;
  const subscribers = [];

  function set(new_value) {
    if ((0, _internal.safe_not_equal)(value, new_value)) {
      value = new_value;

      if (stop) {
        // store is ready
        const run_queue = !subscriber_queue.length;

        for (let i = 0; i < subscribers.length; i += 1) {
          const s = subscribers[i];
          s[1]();
          subscriber_queue.push(s, value);
        }

        if (run_queue) {
          for (let i = 0; i < subscriber_queue.length; i += 2) {
            subscriber_queue[i][0](subscriber_queue[i + 1]);
          }

          subscriber_queue.length = 0;
        }
      }
    }
  }

  function update(fn) {
    set(fn(value));
  }

  function subscribe(run, invalidate = _internal.noop) {
    const subscriber = [run, invalidate];
    subscribers.push(subscriber);

    if (subscribers.length === 1) {
      stop = start(set) || _internal.noop;
    }

    run(value);
    return () => {
      const index = subscribers.indexOf(subscriber);

      if (index !== -1) {
        subscribers.splice(index, 1);
      }

      if (subscribers.length === 0) {
        stop();
        stop = null;
      }
    };
  }

  return {
    set,
    update,
    subscribe
  };
}

function derived(stores, fn, initial_value) {
  const single = !Array.isArray(stores);
  const stores_array = single ? [stores] : stores;
  const auto = fn.length < 2;
  return readable(initial_value, set => {
    let inited = false;
    const values = [];
    let pending = 0;
    let cleanup = _internal.noop;

    const sync = () => {
      if (pending) {
        return;
      }

      cleanup();
      const result = fn(single ? values[0] : values, set);

      if (auto) {
        set(result);
      } else {
        cleanup = (0, _internal.is_function)(result) ? result : _internal.noop;
      }
    };

    const unsubscribers = stores_array.map((store, i) => (0, _internal.subscribe)(store, value => {
      values[i] = value;
      pending &= ~(1 << i);

      if (inited) {
        sync();
      }
    }, () => {
      pending |= 1 << i;
    }));
    inited = true;
    sync();
    return function stop() {
      (0, _internal.run_all)(unsubscribers);
      cleanup();
    };
  });
}
},{"../internal":"../node_modules/svelte/internal/index.mjs"}],"state/store.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.note_list_store = exports.msg = void 0;

var _store = require("svelte/store");

const msg = (0, _store.writable)("");
/** 用来显示笔记的地方 */

exports.msg = msg;
const note_list_store = (0, _store.writable)([]);
exports.note_list_store = note_list_store;
},{"svelte/store":"../node_modules/svelte/store/index.mjs"}],"../node_modules/svelte/animate/index.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.flip = flip;

var _easing = require("../easing");

var _internal = require("../internal");

function flip(node, animation, params) {
  const style = getComputedStyle(node);
  const transform = style.transform === 'none' ? '' : style.transform;
  const scaleX = animation.from.width / node.clientWidth;
  const scaleY = animation.from.height / node.clientHeight;
  const dx = (animation.from.left - animation.to.left) / scaleX;
  const dy = (animation.from.top - animation.to.top) / scaleY;
  const d = Math.sqrt(dx * dx + dy * dy);
  const {
    delay = 0,
    duration = d => Math.sqrt(d) * 120,
    easing = _easing.cubicOut
  } = params;
  return {
    delay,
    duration: (0, _internal.is_function)(duration) ? duration(d) : duration,
    easing,
    css: (_t, u) => `transform: ${transform} translate(${u * dx}px, ${u * dy}px);`
  };
}
},{"../easing":"../node_modules/svelte/easing/index.mjs","../internal":"../node_modules/svelte/internal/index.mjs"}],"ui/message.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Message = exports.messageList = void 0;

var _store = require("svelte/store");

/** 目前在呈现的消息列表 */
const messageList = (0, _store.writable)([]);
/** 消息的基类 扩展类记得重写 thatMessage 以免公用出现bug */

exports.messageList = messageList;

class Message {
  constructor(par) {
    this.par = par;
    /** 用来指向不同的类，以便扩展这个类的类的old_message不被公用 */

    this.autoHideTime = 1000 * 3;
  }
  /** 展示el */


  show() {
    messageList.update(r => [...r, this]);
    return this;
  }
  /** 隐藏el */


  hide() {
    messageList.update(r => r.filter(el => this !== el));
    return this;
  }
  /** 展示el  autoHideTime 毫秒后隐藏*/


  autoHide() {
    this.show();
    setTimeout(() => {
      this.hide();
    }, this.autoHideTime);
    return this;
  }
  /** 获取一个Message对象 */


  static getMessage(par) {
    return new Message(par);
  }

}

exports.Message = Message;
},{"svelte/store":"../node_modules/svelte/store/index.mjs"}],"../node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"../node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"../node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"svelte/msg.svelte":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _internal = require("svelte/internal");

var _transition = require("svelte/transition");

var _animate = require("svelte/animate");

var _message = require("../ui/message");

/* svelte/msg.svelte generated by Svelte v3.24.0 */
const file = "svelte/msg.svelte";

function add_css() {
  var style = (0, _internal.element)("style");
  style.id = "svelte-jplvpw-style";
  style.textContent = ".llej-msg_list.svelte-jplvpw{position:fixed;top:20px;left:20px;z-index:9998}.llej-msg_list-item.svelte-jplvpw{background:#fff;box-shadow:0 4px 10px 0 rgba(0, 0, 0, 0.1);margin:6px 12px;padding:3px 7px;display:flex;align-items:center}.llej-msg_list-item-point.svelte-jplvpw{--s:4px;width:var(--s);height:var(--s);background-color:#367dd9;margin:var(--s);border-radius:999px}\n";
  (0, _internal.append_dev)(document.head, style);
}

function get_each_context(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[1] = list[i];
  child_ctx[3] = i;
  return child_ctx;
} // (33:2) {#each $messageList as item, index (item)}


function create_each_block(key_1, ctx) {
  let div1;
  let div0;
  let t0;
  let t1_value =
  /*item*/
  ctx[1].par.msg + "";
  let t1;
  let t2;
  let div1_style_value;
  let div1_transition;
  let rect;
  let stop_animation = _internal.noop;
  let current;
  const block = {
    key: key_1,
    first: null,
    c: function create() {
      div1 = (0, _internal.element)("div");
      div0 = (0, _internal.element)("div");
      t0 = (0, _internal.space)();
      t1 = (0, _internal.text)(t1_value);
      t2 = (0, _internal.space)();
      (0, _internal.attr_dev)(div0, "class", "llej-msg_list-item-point svelte-jplvpw");
      (0, _internal.add_location)(div0, file, 34, 6, 851);
      (0, _internal.attr_dev)(div1, "class", "llej-msg_list-item svelte-jplvpw");
      (0, _internal.attr_dev)(div1, "style", div1_style_value =
      /*item*/
      ctx[1].par.style);
      (0, _internal.add_location)(div1, file, 33, 4, 730);
      this.first = div1;
    },
    m: function mount(target, anchor) {
      (0, _internal.insert_dev)(target, div1, anchor);
      (0, _internal.append_dev)(div1, div0);
      (0, _internal.append_dev)(div1, t0);
      (0, _internal.append_dev)(div1, t1);
      (0, _internal.append_dev)(div1, t2);
      current = true;
    },
    p: function update(ctx, dirty) {
      if ((!current || dirty &
      /*$messageList*/
      1) && t1_value !== (t1_value =
      /*item*/
      ctx[1].par.msg + "")) (0, _internal.set_data_dev)(t1, t1_value);

      if (!current || dirty &
      /*$messageList*/
      1 && div1_style_value !== (div1_style_value =
      /*item*/
      ctx[1].par.style)) {
        (0, _internal.attr_dev)(div1, "style", div1_style_value);
      }
    },
    r: function measure() {
      rect = div1.getBoundingClientRect();
    },
    f: function fix() {
      (0, _internal.fix_position)(div1);
      stop_animation();
      (0, _internal.add_transform)(div1, rect);
    },
    a: function animate() {
      stop_animation();
      stop_animation = (0, _internal.create_animation)(div1, rect, _animate.flip, {});
    },
    i: function intro(local) {
      if (current) return;
      (0, _internal.add_render_callback)(() => {
        if (!div1_transition) div1_transition = (0, _internal.create_bidirectional_transition)(div1, _transition.fly, {
          x: -200,
          duration: 1000
        }, true);
        div1_transition.run(1);
      });
      current = true;
    },
    o: function outro(local) {
      if (!div1_transition) div1_transition = (0, _internal.create_bidirectional_transition)(div1, _transition.fly, {
        x: -200,
        duration: 1000
      }, false);
      div1_transition.run(0);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) (0, _internal.detach_dev)(div1);
      if (detaching && div1_transition) div1_transition.end();
    }
  };
  (0, _internal.dispatch_dev)("SvelteRegisterBlock", {
    block,
    id: create_each_block.name,
    type: "each",
    source: "(33:2) {#each $messageList as item, index (item)}",
    ctx
  });
  return block;
}

function create_fragment(ctx) {
  let div;
  let each_blocks = [];
  let each_1_lookup = new Map();
  let current;
  let each_value =
  /*$messageList*/
  ctx[0];
  (0, _internal.validate_each_argument)(each_value);

  const get_key = ctx =>
  /*item*/
  ctx[1];

  (0, _internal.validate_each_keys)(ctx, each_value, get_each_context, get_key);

  for (let i = 0; i < each_value.length; i += 1) {
    let child_ctx = get_each_context(ctx, each_value, i);
    let key = get_key(child_ctx);
    each_1_lookup.set(key, each_blocks[i] = create_each_block(key, child_ctx));
  }

  const block = {
    c: function create() {
      div = (0, _internal.element)("div");

      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }

      (0, _internal.attr_dev)(div, "class", "llej-msg_list svelte-jplvpw");
      (0, _internal.add_location)(div, file, 31, 0, 651);
    },
    l: function claim(nodes) {
      throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    },
    m: function mount(target, anchor) {
      (0, _internal.insert_dev)(target, div, anchor);

      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].m(div, null);
      }

      current = true;
    },
    p: function update(ctx, [dirty]) {
      if (dirty &
      /*$messageList*/
      1) {
        const each_value =
        /*$messageList*/
        ctx[0];
        (0, _internal.validate_each_argument)(each_value);
        (0, _internal.group_outros)();

        for (let i = 0; i < each_blocks.length; i += 1) each_blocks[i].r();

        (0, _internal.validate_each_keys)(ctx, each_value, get_each_context, get_key);
        each_blocks = (0, _internal.update_keyed_each)(each_blocks, dirty, get_key, 1, ctx, each_value, each_1_lookup, div, _internal.fix_and_outro_and_destroy_block, create_each_block, null, get_each_context);

        for (let i = 0; i < each_blocks.length; i += 1) each_blocks[i].a();

        (0, _internal.check_outros)();
      }
    },
    i: function intro(local) {
      if (current) return;

      for (let i = 0; i < each_value.length; i += 1) {
        (0, _internal.transition_in)(each_blocks[i]);
      }

      current = true;
    },
    o: function outro(local) {
      for (let i = 0; i < each_blocks.length; i += 1) {
        (0, _internal.transition_out)(each_blocks[i]);
      }

      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) (0, _internal.detach_dev)(div);

      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].d();
      }
    }
  };
  (0, _internal.dispatch_dev)("SvelteRegisterBlock", {
    block,
    id: create_fragment.name,
    type: "component",
    source: "",
    ctx
  });
  return block;
}

function instance($$self, $$props, $$invalidate) {
  let $messageList;
  (0, _internal.validate_store)(_message.messageList, "messageList");
  (0, _internal.component_subscribe)($$self, _message.messageList, $$value => $$invalidate(0, $messageList = $$value));
  const writable_props = [];
  Object.keys($$props).forEach(key => {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Msg> was created with unknown prop '${key}'`);
  });
  let {
    $$slots = {},
    $$scope
  } = $$props;
  (0, _internal.validate_slots)("Msg", $$slots, []);

  $$self.$capture_state = () => ({
    fly: _transition.fly,
    flip: _animate.flip,
    messageList: _message.messageList,
    $messageList
  });

  return [$messageList];
}

class Msg extends _internal.SvelteComponentDev {
  constructor(options) {
    super(options);
    if (!document.getElementById("svelte-jplvpw-style")) add_css();
    (0, _internal.init)(this, options, instance, create_fragment, _internal.safe_not_equal, {});
    (0, _internal.dispatch_dev)("SvelteRegisterComponent", {
      component: this,
      tagName: "Msg",
      options,
      id: create_fragment.name
    });
  }

}

var _default = Msg;
exports.default = _default;
},{"svelte/internal":"../node_modules/svelte/internal/index.mjs","svelte/transition":"../node_modules/svelte/transition/index.mjs","svelte/animate":"../node_modules/svelte/animate/index.mjs","../ui/message":"ui/message.ts","_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"svelte/Note.svelte":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _internal = require("svelte/internal");

/* svelte/Note.svelte generated by Svelte v3.24.0 */
const {
  console: console_1
} = _internal.globals;
const file = "svelte/Note.svelte";

function add_css() {
  var style = (0, _internal.element)("style");
  style.id = "svelte-dn4h7-style";
  style.textContent = ".c-note.svelte-dn4h7{outline:rgb(187, 181, 181) 2px solid;background:rgba(red, green, blue, 0.6);padding:0.3rem 0.4rem;position:absolute;z-index:60}\n";
  (0, _internal.append_dev)(document.head, style);
}

function create_fragment(ctx) {
  let div;
  let t_value =
  /*note*/
  ctx[0].content + "";
  let t;
  const block = {
    c: function create() {
      div = (0, _internal.element)("div");
      t = (0, _internal.text)(t_value);
      (0, _internal.attr_dev)(div, "class", "c-note svelte-dn4h7");
      (0, _internal.set_style)(div, "top", p(
      /*note*/
      ctx[0]).top + p(
      /*note*/
      ctx[0]).height / 2 + "px");
      (0, _internal.set_style)(div, "left", p(
      /*note*/
      ctx[0]).left + p(
      /*note*/
      ctx[0]).width + "px");
      (0, _internal.add_location)(div, file, 21, 0, 461);
    },
    l: function claim(nodes) {
      throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    },
    m: function mount(target, anchor) {
      (0, _internal.insert_dev)(target, div, anchor);
      (0, _internal.append_dev)(div, t);
    },
    p: function update(ctx, [dirty]) {
      if (dirty &
      /*note*/
      1 && t_value !== (t_value =
      /*note*/
      ctx[0].content + "")) (0, _internal.set_data_dev)(t, t_value);

      if (dirty &
      /*note*/
      1) {
        (0, _internal.set_style)(div, "top", p(
        /*note*/
        ctx[0]).top + p(
        /*note*/
        ctx[0]).height / 2 + "px");
      }

      if (dirty &
      /*note*/
      1) {
        (0, _internal.set_style)(div, "left", p(
        /*note*/
        ctx[0]).left + p(
        /*note*/
        ctx[0]).width + "px");
      }
    },
    i: _internal.noop,
    o: _internal.noop,
    d: function destroy(detaching) {
      if (detaching) (0, _internal.detach_dev)(div);
    }
  };
  (0, _internal.dispatch_dev)("SvelteRegisterBlock", {
    block,
    id: create_fragment.name,
    type: "component",
    source: "",
    ctx
  });
  return block;
}

function p(note) {
  return note.point.getBoundingClientRect();
}

function instance($$self, $$props, $$invalidate) {
  let {
    note
  } = $$props; //   document.querySelector(note.point)

  console.log(note.point.getBoundingClientRect());
  console.log(111, note);
  const writable_props = ["note"];
  Object.keys($$props).forEach(key => {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console_1.warn(`<Note> was created with unknown prop '${key}'`);
  });
  let {
    $$slots = {},
    $$scope
  } = $$props;
  (0, _internal.validate_slots)("Note", $$slots, []);

  $$self.$set = $$props => {
    if ("note" in $$props) $$invalidate(0, note = $$props.note);
  };

  $$self.$capture_state = () => ({
    note,
    p
  });

  $$self.$inject_state = $$props => {
    if ("note" in $$props) $$invalidate(0, note = $$props.note);
  };

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  return [note];
}

class Note extends _internal.SvelteComponentDev {
  constructor(options) {
    super(options);
    if (!document.getElementById("svelte-dn4h7-style")) add_css();
    (0, _internal.init)(this, options, instance, create_fragment, _internal.safe_not_equal, {
      note: 0
    });
    (0, _internal.dispatch_dev)("SvelteRegisterComponent", {
      component: this,
      tagName: "Note",
      options,
      id: create_fragment.name
    });
    const {
      ctx
    } = this.$$;
    const props = options.props || {};

    if (
    /*note*/
    ctx[0] === undefined && !("note" in props)) {
      console_1.warn("<Note> was created without expected prop 'note'");
    }
  }

  get note() {
    throw new Error("<Note>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }

  set note(value) {
    throw new Error("<Note>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }

}

var _default = Note;
exports.default = _default;
},{"svelte/internal":"../node_modules/svelte/internal/index.mjs","_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"svelte/Toolbar.svelte":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _internal = require("svelte/internal");

/* svelte/Toolbar.svelte generated by Svelte v3.24.0 */
const {
  console: console_1
} = _internal.globals;
const file = "svelte/Toolbar.svelte";

function add_css() {
  var style = (0, _internal.element)("style");
  style.id = "svelte-au5nxg-style";
  style.textContent = ".llej-toolbar.svelte-au5nxg{z-index:1000;background:#fff;height:32px;box-shadow:0 4px 10px 0 rgba(0, 0, 0, 0.1);border-radius:4px;font-size:14px;display:flex;align-items:center;padding:0px 6px;user-select:none}.llej-toolbar-btn.svelte-au5nxg{transition:0.3s all;padding:2px 5px;margin:2px 5px;border:1px solid rgb(163, 163, 163);display:flex;align-items:center}.llej-toolbar-btn.svelte-au5nxg:hover{background:rgb(231, 231, 231)}\n";
  (0, _internal.append_dev)(document.head, style);
}

function create_fragment(ctx) {
  let div2;
  let label;
  let t0;
  let input0;
  let t1;
  let div0;
  let t2;
  let input1;
  let t3;
  let div1;
  let mounted;
  let dispose;
  const block = {
    c: function create() {
      div2 = (0, _internal.element)("div");
      label = (0, _internal.element)("label");
      t0 = (0, _internal.text)("文字颜色\r\n    ");
      input0 = (0, _internal.element)("input");
      t1 = (0, _internal.space)();
      div0 = (0, _internal.element)("div");
      t2 = (0, _internal.text)("背景颜色\r\n    ");
      input1 = (0, _internal.element)("input");
      t3 = (0, _internal.space)();
      div1 = (0, _internal.element)("div");
      div1.textContent = "下划线";
      (0, _internal.attr_dev)(input0, "type", "color");
      (0, _internal.add_location)(input0, file, 37, 4, 795);
      (0, _internal.attr_dev)(label, "class", "llej-toolbar-btn svelte-au5nxg");
      (0, _internal.add_location)(label, file, 35, 2, 747);
      (0, _internal.attr_dev)(input1, "type", "color");
      (0, _internal.add_location)(input1, file, 46, 4, 993);
      (0, _internal.attr_dev)(div0, "class", "llej-toolbar-btn svelte-au5nxg");
      (0, _internal.add_location)(div0, file, 44, 2, 947);
      (0, _internal.attr_dev)(div1, "class", "llej-toolbar-btn svelte-au5nxg");
      (0, _internal.add_location)(div1, file, 54, 2, 1176);
      (0, _internal.attr_dev)(div2, "class", "llej-toolbar svelte-au5nxg");
      (0, _internal.add_location)(div2, file, 34, 0, 717);
    },
    l: function claim(nodes) {
      throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    },
    m: function mount(target, anchor) {
      (0, _internal.insert_dev)(target, div2, anchor);
      (0, _internal.append_dev)(div2, label);
      (0, _internal.append_dev)(label, t0);
      (0, _internal.append_dev)(label, input0);
      (0, _internal.set_input_value)(input0,
      /*color*/
      ctx[1]);
      (0, _internal.append_dev)(div2, t1);
      (0, _internal.append_dev)(div2, div0);
      (0, _internal.append_dev)(div0, t2);
      (0, _internal.append_dev)(div0, input1);
      (0, _internal.set_input_value)(input1,
      /*backgroundColor*/
      ctx[2]);
      (0, _internal.append_dev)(div2, t3);
      (0, _internal.append_dev)(div2, div1);

      if (!mounted) {
        dispose = [(0, _internal.listen_dev)(input0, "input",
        /*input0_input_handler*/
        ctx[3]), (0, _internal.listen_dev)(input0, "change",
        /*change_handler*/
        ctx[4], false, false, false), (0, _internal.listen_dev)(input1, "input",
        /*input1_input_handler*/
        ctx[5]), (0, _internal.listen_dev)(input1, "change",
        /*change_handler_1*/
        ctx[6], false, false, false), (0, _internal.listen_dev)(div1, "click",
        /*click_handler*/
        ctx[7], false, false, false)];
        mounted = true;
      }
    },
    p: function update(ctx, [dirty]) {
      if (dirty &
      /*color*/
      2) {
        (0, _internal.set_input_value)(input0,
        /*color*/
        ctx[1]);
      }

      if (dirty &
      /*backgroundColor*/
      4) {
        (0, _internal.set_input_value)(input1,
        /*backgroundColor*/
        ctx[2]);
      }
    },
    i: _internal.noop,
    o: _internal.noop,
    d: function destroy(detaching) {
      if (detaching) (0, _internal.detach_dev)(div2);
      mounted = false;
      (0, _internal.run_all)(dispose);
    }
  };
  (0, _internal.dispatch_dev)("SvelteRegisterBlock", {
    block,
    id: create_fragment.name,
    type: "component",
    source: "",
    ctx
  });
  return block;
}

function instance($$self, $$props, $$invalidate) {
  let {
    highlighted = () => {
      console.warn("没有传入高亮处理函数");
    }
  } = $$props;
  let color = "#ffff80";
  let backgroundColor = "#ffff80";
  const writable_props = ["highlighted"];
  Object.keys($$props).forEach(key => {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console_1.warn(`<Toolbar> was created with unknown prop '${key}'`);
  });
  let {
    $$slots = {},
    $$scope
  } = $$props;
  (0, _internal.validate_slots)("Toolbar", $$slots, []);

  function input0_input_handler() {
    color = this.value;
    $$invalidate(1, color);
  }

  const change_handler = () => highlighted({
    style: `
      color:${color};
    `
  });

  function input1_input_handler() {
    backgroundColor = this.value;
    $$invalidate(2, backgroundColor);
  }

  const change_handler_1 = () => highlighted({
    style: `
      background-color:${backgroundColor};
    `
  });

  const click_handler = () => highlighted({
    style: `
      text-decoration: underline;
    `
  });

  $$self.$set = $$props => {
    if ("highlighted" in $$props) $$invalidate(0, highlighted = $$props.highlighted);
  };

  $$self.$capture_state = () => ({
    highlighted,
    color,
    backgroundColor
  });

  $$self.$inject_state = $$props => {
    if ("highlighted" in $$props) $$invalidate(0, highlighted = $$props.highlighted);
    if ("color" in $$props) $$invalidate(1, color = $$props.color);
    if ("backgroundColor" in $$props) $$invalidate(2, backgroundColor = $$props.backgroundColor);
  };

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  return [highlighted, color, backgroundColor, input0_input_handler, change_handler, input1_input_handler, change_handler_1, click_handler];
}

class Toolbar extends _internal.SvelteComponentDev {
  constructor(options) {
    super(options);
    if (!document.getElementById("svelte-au5nxg-style")) add_css();
    (0, _internal.init)(this, options, instance, create_fragment, _internal.safe_not_equal, {
      highlighted: 0
    });
    (0, _internal.dispatch_dev)("SvelteRegisterComponent", {
      component: this,
      tagName: "Toolbar",
      options,
      id: create_fragment.name
    });
  }

  get highlighted() {
    throw new Error("<Toolbar>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }

  set highlighted(value) {
    throw new Error("<Toolbar>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }

}

var _default = Toolbar;
exports.default = _default;
},{"svelte/internal":"../node_modules/svelte/internal/index.mjs","_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"../node_modules/@vue/shared/dist/shared.esm-bundler.js":[function(require,module,exports) {
var global = arguments[3];
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.escapeHtml = escapeHtml;
exports.escapeHtmlComment = escapeHtmlComment;
exports.generateCodeFrame = generateCodeFrame;
exports.isSSRSafeAttrName = isSSRSafeAttrName;
exports.looseEqual = looseEqual;
exports.looseIndexOf = looseIndexOf;
exports.makeMap = makeMap;
exports.normalizeClass = normalizeClass;
exports.normalizeStyle = normalizeStyle;
exports.parseStringStyle = parseStringStyle;
exports.stringifyStyle = stringifyStyle;
exports.toTypeString = exports.toRawType = exports.toNumber = exports.toDisplayString = exports.remove = exports.propsToAttrMap = exports.objectToString = exports.isVoidTag = exports.isSymbol = exports.isString = exports.isSpecialBooleanAttr = exports.isSVGTag = exports.isReservedProp = exports.isPromise = exports.isPlainObject = exports.isOn = exports.isObject = exports.isNoUnitNumericStyleProp = exports.isModelListener = exports.isKnownAttr = exports.isHTMLTag = exports.isGloballyWhitelisted = exports.isFunction = exports.isDate = exports.isBooleanAttr = exports.isArray = exports.invokeArrayFns = exports.hyphenate = exports.hasOwn = exports.hasChanged = exports.getGlobalThis = exports.extend = exports.def = exports.capitalize = exports.camelize = exports.babelParserDefautPlugins = exports.PatchFlagNames = exports.NOOP = exports.NO = exports.EMPTY_OBJ = exports.EMPTY_ARR = void 0;

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 * IMPORTANT: all calls of this function must be prefixed with
 * \/\*#\_\_PURE\_\_\*\/
 * So that rollup can tree-shake them if necessary.
 */
function makeMap(str, expectsLowerCase) {
  const map = Object.create(null);
  const list = str.split(',');

  for (let i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }

  return expectsLowerCase ? val => !!map[val.toLowerCase()] : val => !!map[val];
} // Patch flags are optimization hints generated by the compiler.
// when a block with dynamicChildren is encountered during diff, the algorithm
// enters "optimized mode". In this mode, we know that the vdom is produced by
// a render function generated by the compiler, so the algorithm only needs to
// handle updates explicitly marked by these patch flags.
// dev only flag -> name mapping


const PatchFlagNames = {
  [1
  /* TEXT */
  ]: `TEXT`,
  [2
  /* CLASS */
  ]: `CLASS`,
  [4
  /* STYLE */
  ]: `STYLE`,
  [8
  /* PROPS */
  ]: `PROPS`,
  [16
  /* FULL_PROPS */
  ]: `FULL_PROPS`,
  [32
  /* HYDRATE_EVENTS */
  ]: `HYDRATE_EVENTS`,
  [64
  /* STABLE_FRAGMENT */
  ]: `STABLE_FRAGMENT`,
  [128
  /* KEYED_FRAGMENT */
  ]: `KEYED_FRAGMENT`,
  [256
  /* UNKEYED_FRAGMENT */
  ]: `UNKEYED_FRAGMENT`,
  [1024
  /* DYNAMIC_SLOTS */
  ]: `DYNAMIC_SLOTS`,
  [512
  /* NEED_PATCH */
  ]: `NEED_PATCH`,
  [-1
  /* HOISTED */
  ]: `HOISTED`,
  [-2
  /* BAIL */
  ]: `BAIL`
};
exports.PatchFlagNames = PatchFlagNames;
const GLOBALS_WHITE_LISTED = 'Infinity,undefined,NaN,isFinite,isNaN,parseFloat,parseInt,decodeURI,' + 'decodeURIComponent,encodeURI,encodeURIComponent,Math,Number,Date,Array,' + 'Object,Boolean,String,RegExp,Map,Set,JSON,Intl';
const isGloballyWhitelisted = /*#__PURE__*/makeMap(GLOBALS_WHITE_LISTED);
exports.isGloballyWhitelisted = isGloballyWhitelisted;
const range = 2;

function generateCodeFrame(source, start = 0, end = source.length) {
  const lines = source.split(/\r?\n/);
  let count = 0;
  const res = [];

  for (let i = 0; i < lines.length; i++) {
    count += lines[i].length + 1;

    if (count >= start) {
      for (let j = i - range; j <= i + range || end > count; j++) {
        if (j < 0 || j >= lines.length) continue;
        const line = j + 1;
        res.push(`${line}${' '.repeat(3 - String(line).length)}|  ${lines[j]}`);
        const lineLength = lines[j].length;

        if (j === i) {
          // push underline
          const pad = start - (count - lineLength) + 1;
          const length = Math.max(1, end > count ? lineLength - pad : end - start);
          res.push(`   |  ` + ' '.repeat(pad) + '^'.repeat(length));
        } else if (j > i) {
          if (end > count) {
            const length = Math.max(Math.min(end - count, lineLength), 1);
            res.push(`   |  ` + '^'.repeat(length));
          }

          count += lineLength + 1;
        }
      }

      break;
    }
  }

  return res.join('\n');
}
/**
 * On the client we only need to offer special cases for boolean attributes that
 * have different names from their corresponding dom properties:
 * - itemscope -> N/A
 * - allowfullscreen -> allowFullscreen
 * - formnovalidate -> formNoValidate
 * - ismap -> isMap
 * - nomodule -> noModule
 * - novalidate -> noValidate
 * - readonly -> readOnly
 */


const specialBooleanAttrs = `itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly`;
const isSpecialBooleanAttr = /*#__PURE__*/makeMap(specialBooleanAttrs);
/**
 * The full list is needed during SSR to produce the correct initial markup.
 */

exports.isSpecialBooleanAttr = isSpecialBooleanAttr;
const isBooleanAttr = /*#__PURE__*/makeMap(specialBooleanAttrs + `,async,autofocus,autoplay,controls,default,defer,disabled,hidden,` + `loop,open,required,reversed,scoped,seamless,` + `checked,muted,multiple,selected`);
exports.isBooleanAttr = isBooleanAttr;
const unsafeAttrCharRE = /[>/="'\u0009\u000a\u000c\u0020]/;
const attrValidationCache = {};

function isSSRSafeAttrName(name) {
  if (attrValidationCache.hasOwnProperty(name)) {
    return attrValidationCache[name];
  }

  const isUnsafe = unsafeAttrCharRE.test(name);

  if (isUnsafe) {
    console.error(`unsafe attribute name: ${name}`);
  }

  return attrValidationCache[name] = !isUnsafe;
}

const propsToAttrMap = {
  acceptCharset: 'accept-charset',
  className: 'class',
  htmlFor: 'for',
  httpEquiv: 'http-equiv'
};
/**
 * CSS properties that accept plain numbers
 */

exports.propsToAttrMap = propsToAttrMap;
const isNoUnitNumericStyleProp = /*#__PURE__*/makeMap(`animation-iteration-count,border-image-outset,border-image-slice,` + `border-image-width,box-flex,box-flex-group,box-ordinal-group,column-count,` + `columns,flex,flex-grow,flex-positive,flex-shrink,flex-negative,flex-order,` + `grid-row,grid-row-end,grid-row-span,grid-row-start,grid-column,` + `grid-column-end,grid-column-span,grid-column-start,font-weight,line-clamp,` + `line-height,opacity,order,orphans,tab-size,widows,z-index,zoom,` + // SVG
`fill-opacity,flood-opacity,stop-opacity,stroke-dasharray,stroke-dashoffset,` + `stroke-miterlimit,stroke-opacity,stroke-width`);
/**
 * Known attributes, this is used for stringification of runtime static nodes
 * so that we don't stringify bindings that cannot be set from HTML.
 * Don't also forget to allow `data-*` and `aria-*`!
 * Generated from https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes
 */

exports.isNoUnitNumericStyleProp = isNoUnitNumericStyleProp;
const isKnownAttr = /*#__PURE__*/makeMap(`accept,accept-charset,accesskey,action,align,allow,alt,async,` + `autocapitalize,autocomplete,autofocus,autoplay,background,bgcolor,` + `border,buffered,capture,challenge,charset,checked,cite,class,code,` + `codebase,color,cols,colspan,content,contenteditable,contextmenu,controls,` + `coords,crossorigin,csp,data,datetime,decoding,default,defer,dir,dirname,` + `disabled,download,draggable,dropzone,enctype,enterkeyhint,for,form,` + `formaction,formenctype,formmethod,formnovalidate,formtarget,headers,` + `height,hidden,high,href,hreflang,http-equiv,icon,id,importance,integrity,` + `ismap,itemprop,keytype,kind,label,lang,language,loading,list,loop,low,` + `manifest,max,maxlength,minlength,media,min,multiple,muted,name,novalidate,` + `open,optimum,pattern,ping,placeholder,poster,preload,radiogroup,readonly,` + `referrerpolicy,rel,required,reversed,rows,rowspan,sandbox,scope,scoped,` + `selected,shape,size,sizes,slot,span,spellcheck,src,srcdoc,srclang,srcset,` + `start,step,style,summary,tabindex,target,title,translate,type,usemap,` + `value,width,wrap`);
exports.isKnownAttr = isKnownAttr;

function normalizeStyle(value) {
  if (isArray(value)) {
    const res = {};

    for (let i = 0; i < value.length; i++) {
      const item = value[i];
      const normalized = normalizeStyle(isString(item) ? parseStringStyle(item) : item);

      if (normalized) {
        for (const key in normalized) {
          res[key] = normalized[key];
        }
      }
    }

    return res;
  } else if (isObject(value)) {
    return value;
  }
}

const listDelimiterRE = /;(?![^(]*\))/g;
const propertyDelimiterRE = /:(.+)/;

function parseStringStyle(cssText) {
  const ret = {};
  cssText.split(listDelimiterRE).forEach(item => {
    if (item) {
      const tmp = item.split(propertyDelimiterRE);
      tmp.length > 1 && (ret[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return ret;
}

function stringifyStyle(styles) {
  let ret = '';

  if (!styles) {
    return ret;
  }

  for (const key in styles) {
    const value = styles[key];
    const normalizedKey = key.startsWith(`--`) ? key : hyphenate(key);

    if (isString(value) || typeof value === 'number' && isNoUnitNumericStyleProp(normalizedKey)) {
      // only render valid values
      ret += `${normalizedKey}:${value};`;
    }
  }

  return ret;
}

function normalizeClass(value) {
  let res = '';

  if (isString(value)) {
    res = value;
  } else if (isArray(value)) {
    for (let i = 0; i < value.length; i++) {
      res += normalizeClass(value[i]) + ' ';
    }
  } else if (isObject(value)) {
    for (const name in value) {
      if (value[name]) {
        res += name + ' ';
      }
    }
  }

  return res.trim();
} // These tag configs are shared between compiler-dom and runtime-dom, so they
// https://developer.mozilla.org/en-US/docs/Web/HTML/Element


const HTML_TAGS = 'html,body,base,head,link,meta,style,title,address,article,aside,footer,' + 'header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,div,dd,dl,dt,figcaption,' + 'figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,' + 'data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,s,samp,small,span,strong,sub,sup,' + 'time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,' + 'canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,' + 'th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,' + 'option,output,progress,select,textarea,details,dialog,menu,' + 'summary,content,template,blockquote,iframe,tfoot'; // https://developer.mozilla.org/en-US/docs/Web/SVG/Element

const SVG_TAGS = 'svg,animate,animateMotion,animateTransform,circle,clipPath,color-profile,' + 'defs,desc,discard,ellipse,feBlend,feColorMatrix,feComponentTransfer,' + 'feComposite,feConvolveMatrix,feDiffuseLighting,feDisplacementMap,' + 'feDistanceLight,feDropShadow,feFlood,feFuncA,feFuncB,feFuncG,feFuncR,' + 'feGaussianBlur,feImage,feMerge,feMergeNode,feMorphology,feOffset,' + 'fePointLight,feSpecularLighting,feSpotLight,feTile,feTurbulence,filter,' + 'foreignObject,g,hatch,hatchpath,image,line,linearGradient,marker,mask,' + 'mesh,meshgradient,meshpatch,meshrow,metadata,mpath,path,pattern,' + 'polygon,polyline,radialGradient,rect,set,solidcolor,stop,switch,symbol,' + 'text,textPath,title,tspan,unknown,use,view';
const VOID_TAGS = 'area,base,br,col,embed,hr,img,input,link,meta,param,source,track,wbr';
const isHTMLTag = /*#__PURE__*/makeMap(HTML_TAGS);
exports.isHTMLTag = isHTMLTag;
const isSVGTag = /*#__PURE__*/makeMap(SVG_TAGS);
exports.isSVGTag = isSVGTag;
const isVoidTag = /*#__PURE__*/makeMap(VOID_TAGS);
exports.isVoidTag = isVoidTag;
const escapeRE = /["'&<>]/;

function escapeHtml(string) {
  const str = '' + string;
  const match = escapeRE.exec(str);

  if (!match) {
    return str;
  }

  let html = '';
  let escaped;
  let index;
  let lastIndex = 0;

  for (index = match.index; index < str.length; index++) {
    switch (str.charCodeAt(index)) {
      case 34:
        // "
        escaped = '&quot;';
        break;

      case 38:
        // &
        escaped = '&amp;';
        break;

      case 39:
        // '
        escaped = '&#39;';
        break;

      case 60:
        // <
        escaped = '&lt;';
        break;

      case 62:
        // >
        escaped = '&gt;';
        break;

      default:
        continue;
    }

    if (lastIndex !== index) {
      html += str.substring(lastIndex, index);
    }

    lastIndex = index + 1;
    html += escaped;
  }

  return lastIndex !== index ? html + str.substring(lastIndex, index) : html;
} // https://www.w3.org/TR/html52/syntax.html#comments


const commentStripRE = /^-?>|<!--|-->|--!>|<!-$/g;

function escapeHtmlComment(src) {
  return src.replace(commentStripRE, '');
}

function looseCompareArrays(a, b) {
  if (a.length !== b.length) return false;
  let equal = true;

  for (let i = 0; equal && i < a.length; i++) {
    equal = looseEqual(a[i], b[i]);
  }

  return equal;
}

function looseEqual(a, b) {
  if (a === b) return true;
  let aValidType = isDate(a);
  let bValidType = isDate(b);

  if (aValidType || bValidType) {
    return aValidType && bValidType ? a.getTime() === b.getTime() : false;
  }

  aValidType = isArray(a);
  bValidType = isArray(b);

  if (aValidType || bValidType) {
    return aValidType && bValidType ? looseCompareArrays(a, b) : false;
  }

  aValidType = isObject(a);
  bValidType = isObject(b);

  if (aValidType || bValidType) {
    /* istanbul ignore if: this if will probably never be called */
    if (!aValidType || !bValidType) {
      return false;
    }

    const aKeysCount = Object.keys(a).length;
    const bKeysCount = Object.keys(b).length;

    if (aKeysCount !== bKeysCount) {
      return false;
    }

    for (const key in a) {
      const aHasKey = a.hasOwnProperty(key);
      const bHasKey = b.hasOwnProperty(key);

      if (aHasKey && !bHasKey || !aHasKey && bHasKey || !looseEqual(a[key], b[key])) {
        return false;
      }
    }
  }

  return String(a) === String(b);
}

function looseIndexOf(arr, val) {
  return arr.findIndex(item => looseEqual(item, val));
}
/**
 * For converting {{ interpolation }} values to displayed strings.
 * @private
 */


const toDisplayString = val => {
  return val == null ? '' : isObject(val) ? JSON.stringify(val, replacer, 2) : String(val);
};

exports.toDisplayString = toDisplayString;

const replacer = (_key, val) => {
  if (val instanceof Map) {
    return {
      [`Map(${val.size})`]: [...val.entries()].reduce((entries, [key, val]) => {
        entries[`${key} =>`] = val;
        return entries;
      }, {})
    };
  } else if (val instanceof Set) {
    return {
      [`Set(${val.size})`]: [...val.values()]
    };
  } else if (isObject(val) && !isArray(val) && !isPlainObject(val)) {
    return String(val);
  }

  return val;
};
/**
 * List of @babel/parser plugins that are used for template expression
 * transforms and SFC script transforms. By default we enable proposals slated
 * for ES2020. This will need to be updated as the spec moves forward.
 * Full list at https://babeljs.io/docs/en/next/babel-parser#plugins
 */


const babelParserDefautPlugins = ['bigInt', 'optionalChaining', 'nullishCoalescingOperator'];
exports.babelParserDefautPlugins = babelParserDefautPlugins;
const EMPTY_OBJ = "development" !== 'production' ? Object.freeze({}) : {};
exports.EMPTY_OBJ = EMPTY_OBJ;
const EMPTY_ARR = [];
exports.EMPTY_ARR = EMPTY_ARR;

const NOOP = () => {};
/**
 * Always return false.
 */


exports.NOOP = NOOP;

const NO = () => false;

exports.NO = NO;
const onRE = /^on[^a-z]/;

const isOn = key => onRE.test(key);

exports.isOn = isOn;

const isModelListener = key => key.startsWith('onUpdate:');

exports.isModelListener = isModelListener;
const extend = Object.assign;
exports.extend = extend;

const remove = (arr, el) => {
  const i = arr.indexOf(el);

  if (i > -1) {
    arr.splice(i, 1);
  }
};

exports.remove = remove;
const hasOwnProperty = Object.prototype.hasOwnProperty;

const hasOwn = (val, key) => hasOwnProperty.call(val, key);

exports.hasOwn = hasOwn;
const isArray = Array.isArray;
exports.isArray = isArray;

const isDate = val => val instanceof Date;

exports.isDate = isDate;

const isFunction = val => typeof val === 'function';

exports.isFunction = isFunction;

const isString = val => typeof val === 'string';

exports.isString = isString;

const isSymbol = val => typeof val === 'symbol';

exports.isSymbol = isSymbol;

const isObject = val => val !== null && typeof val === 'object';

exports.isObject = isObject;

const isPromise = val => {
  return isObject(val) && isFunction(val.then) && isFunction(val.catch);
};

exports.isPromise = isPromise;
const objectToString = Object.prototype.toString;
exports.objectToString = objectToString;

const toTypeString = value => objectToString.call(value);

exports.toTypeString = toTypeString;

const toRawType = value => {
  return toTypeString(value).slice(8, -1);
};

exports.toRawType = toRawType;

const isPlainObject = val => toTypeString(val) === '[object Object]';

exports.isPlainObject = isPlainObject;
const isReservedProp = /*#__PURE__*/makeMap('key,ref,' + 'onVnodeBeforeMount,onVnodeMounted,' + 'onVnodeBeforeUpdate,onVnodeUpdated,' + 'onVnodeBeforeUnmount,onVnodeUnmounted');
exports.isReservedProp = isReservedProp;

const cacheStringFunction = fn => {
  const cache = Object.create(null);
  return str => {
    const hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
};

const camelizeRE = /-(\w)/g;
/**
 * @private
 */

const camelize = cacheStringFunction(str => {
  return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : '');
});
exports.camelize = camelize;
const hyphenateRE = /\B([A-Z])/g;
/**
 * @private
 */

const hyphenate = cacheStringFunction(str => {
  return str.replace(hyphenateRE, '-$1').toLowerCase();
});
/**
 * @private
 */

exports.hyphenate = hyphenate;
const capitalize = cacheStringFunction(str => {
  return str.charAt(0).toUpperCase() + str.slice(1);
}); // compare whether a value has changed, accounting for NaN.

exports.capitalize = capitalize;

const hasChanged = (value, oldValue) => value !== oldValue && (value === value || oldValue === oldValue);

exports.hasChanged = hasChanged;

const invokeArrayFns = (fns, arg) => {
  for (let i = 0; i < fns.length; i++) {
    fns[i](arg);
  }
};

exports.invokeArrayFns = invokeArrayFns;

const def = (obj, key, value) => {
  Object.defineProperty(obj, key, {
    configurable: true,
    enumerable: false,
    value
  });
};

exports.def = def;

const toNumber = val => {
  const n = parseFloat(val);
  return isNaN(n) ? val : n;
};

exports.toNumber = toNumber;

let _globalThis;

const getGlobalThis = () => {
  return _globalThis || (_globalThis = typeof globalThis !== 'undefined' ? globalThis : typeof self !== 'undefined' ? self : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : {});
};

exports.getGlobalThis = getGlobalThis;
},{}],"../node_modules/@vue/reactivity/dist/reactivity.esm-bundler.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.computed = computed;
exports.customRef = customRef;
exports.effect = effect;
exports.enableTracking = enableTracking;
exports.isProxy = isProxy;
exports.isReactive = isReactive;
exports.isReadonly = isReadonly;
exports.isRef = isRef;
exports.markRaw = markRaw;
exports.pauseTracking = pauseTracking;
exports.proxyRefs = proxyRefs;
exports.reactive = reactive;
exports.readonly = readonly;
exports.ref = ref;
exports.resetTracking = resetTracking;
exports.shallowReactive = shallowReactive;
exports.shallowReadonly = shallowReadonly;
exports.shallowRef = shallowRef;
exports.stop = stop;
exports.toRaw = toRaw;
exports.toRef = toRef;
exports.toRefs = toRefs;
exports.track = track;
exports.trigger = trigger;
exports.triggerRef = triggerRef;
exports.unref = unref;
exports.ITERATE_KEY = void 0;

var _shared = require("@vue/shared");

const targetMap = new WeakMap();
const effectStack = [];
let activeEffect;
const ITERATE_KEY = Symbol("development" !== 'production' ? 'iterate' : '');
exports.ITERATE_KEY = ITERATE_KEY;
const MAP_KEY_ITERATE_KEY = Symbol("development" !== 'production' ? 'Map key iterate' : '');

function isEffect(fn) {
  return fn && fn._isEffect === true;
}

function effect(fn, options = _shared.EMPTY_OBJ) {
  if (isEffect(fn)) {
    fn = fn.raw;
  }

  const effect = createReactiveEffect(fn, options);

  if (!options.lazy) {
    effect();
  }

  return effect;
}

function stop(effect) {
  if (effect.active) {
    cleanup(effect);

    if (effect.options.onStop) {
      effect.options.onStop();
    }

    effect.active = false;
  }
}

let uid = 0;

function createReactiveEffect(fn, options) {
  const effect = function reactiveEffect() {
    if (!effect.active) {
      return options.scheduler ? undefined : fn();
    }

    if (!effectStack.includes(effect)) {
      cleanup(effect);

      try {
        enableTracking();
        effectStack.push(effect);
        activeEffect = effect;
        return fn();
      } finally {
        effectStack.pop();
        resetTracking();
        activeEffect = effectStack[effectStack.length - 1];
      }
    }
  };

  effect.id = uid++;
  effect._isEffect = true;
  effect.active = true;
  effect.raw = fn;
  effect.deps = [];
  effect.options = options;
  return effect;
}

function cleanup(effect) {
  const {
    deps
  } = effect;

  if (deps.length) {
    for (let i = 0; i < deps.length; i++) {
      deps[i].delete(effect);
    }

    deps.length = 0;
  }
}

let shouldTrack = true;
const trackStack = [];

function pauseTracking() {
  trackStack.push(shouldTrack);
  shouldTrack = false;
}

function enableTracking() {
  trackStack.push(shouldTrack);
  shouldTrack = true;
}

function resetTracking() {
  const last = trackStack.pop();
  shouldTrack = last === undefined ? true : last;
}

function track(target, type, key) {
  if (!shouldTrack || activeEffect === undefined) {
    return;
  }

  let depsMap = targetMap.get(target);

  if (!depsMap) {
    targetMap.set(target, depsMap = new Map());
  }

  let dep = depsMap.get(key);

  if (!dep) {
    depsMap.set(key, dep = new Set());
  }

  if (!dep.has(activeEffect)) {
    dep.add(activeEffect);
    activeEffect.deps.push(dep);

    if ("development" !== 'production' && activeEffect.options.onTrack) {
      activeEffect.options.onTrack({
        effect: activeEffect,
        target,
        type,
        key
      });
    }
  }
}

function trigger(target, type, key, newValue, oldValue, oldTarget) {
  const depsMap = targetMap.get(target);

  if (!depsMap) {
    // never been tracked
    return;
  }

  const effects = new Set();

  const add = effectsToAdd => {
    if (effectsToAdd) {
      effectsToAdd.forEach(effect => effects.add(effect));
    }
  };

  if (type === "clear"
  /* CLEAR */
  ) {
      // collection being cleared
      // trigger all effects for target
      depsMap.forEach(add);
    } else if (key === 'length' && (0, _shared.isArray)(target)) {
    depsMap.forEach((dep, key) => {
      if (key === 'length' || key >= newValue) {
        add(dep);
      }
    });
  } else {
    // schedule runs for SET | ADD | DELETE
    if (key !== void 0) {
      add(depsMap.get(key));
    } // also run for iteration key on ADD | DELETE | Map.SET


    const isAddOrDelete = type === "add"
    /* ADD */
    || type === "delete"
    /* DELETE */
    && !(0, _shared.isArray)(target);

    if (isAddOrDelete || type === "set"
    /* SET */
    && target instanceof Map) {
      add(depsMap.get((0, _shared.isArray)(target) ? 'length' : ITERATE_KEY));
    }

    if (isAddOrDelete && target instanceof Map) {
      add(depsMap.get(MAP_KEY_ITERATE_KEY));
    }
  }

  const run = effect => {
    if ("development" !== 'production' && effect.options.onTrigger) {
      effect.options.onTrigger({
        effect,
        target,
        key,
        type,
        newValue,
        oldValue,
        oldTarget
      });
    }

    if (effect.options.scheduler) {
      effect.options.scheduler(effect);
    } else {
      effect();
    }
  };

  effects.forEach(run);
}

const builtInSymbols = new Set(Object.getOwnPropertyNames(Symbol).map(key => Symbol[key]).filter(_shared.isSymbol));
const get = /*#__PURE__*/createGetter();
const shallowGet = /*#__PURE__*/createGetter(false, true);
const readonlyGet = /*#__PURE__*/createGetter(true);
const shallowReadonlyGet = /*#__PURE__*/createGetter(true, true);
const arrayInstrumentations = {};
['includes', 'indexOf', 'lastIndexOf'].forEach(key => {
  arrayInstrumentations[key] = function (...args) {
    const arr = toRaw(this);

    for (let i = 0, l = this.length; i < l; i++) {
      track(arr, "get"
      /* GET */
      , i + '');
    } // we run the method using the original args first (which may be reactive)


    const res = arr[key](...args);

    if (res === -1 || res === false) {
      // if that didn't work, run it again using raw values.
      return arr[key](...args.map(toRaw));
    } else {
      return res;
    }
  };
});

function createGetter(isReadonly = false, shallow = false) {
  return function get(target, key, receiver) {
    if (key === "__v_isReactive"
    /* IS_REACTIVE */
    ) {
        return !isReadonly;
      } else if (key === "__v_isReadonly"
    /* IS_READONLY */
    ) {
        return isReadonly;
      } else if (key === "__v_raw"
    /* RAW */
    && receiver === (isReadonly ? target["__v_readonly"
    /* READONLY */
    ] : target["__v_reactive"
    /* REACTIVE */
    ])) {
      return target;
    }

    const targetIsArray = (0, _shared.isArray)(target);

    if (targetIsArray && (0, _shared.hasOwn)(arrayInstrumentations, key)) {
      return Reflect.get(arrayInstrumentations, key, receiver);
    }

    const res = Reflect.get(target, key, receiver);

    if ((0, _shared.isSymbol)(key) ? builtInSymbols.has(key) : key === `__proto__` || key === `__v_isRef`) {
      return res;
    }

    if (!isReadonly) {
      track(target, "get"
      /* GET */
      , key);
    }

    if (shallow) {
      return res;
    }

    if (isRef(res)) {
      // ref unwrapping, only for Objects, not for Arrays.
      return targetIsArray ? res : res.value;
    }

    if ((0, _shared.isObject)(res)) {
      // Convert returned value into a proxy as well. we do the isObject check
      // here to avoid invalid value warning. Also need to lazy access readonly
      // and reactive here to avoid circular dependency.
      return isReadonly ? readonly(res) : reactive(res);
    }

    return res;
  };
}

const set = /*#__PURE__*/createSetter();
const shallowSet = /*#__PURE__*/createSetter(true);

function createSetter(shallow = false) {
  return function set(target, key, value, receiver) {
    const oldValue = target[key];

    if (!shallow) {
      value = toRaw(value);

      if (!(0, _shared.isArray)(target) && isRef(oldValue) && !isRef(value)) {
        oldValue.value = value;
        return true;
      }
    }

    const hadKey = (0, _shared.hasOwn)(target, key);
    const result = Reflect.set(target, key, value, receiver); // don't trigger if target is something up in the prototype chain of original

    if (target === toRaw(receiver)) {
      if (!hadKey) {
        trigger(target, "add"
        /* ADD */
        , key, value);
      } else if ((0, _shared.hasChanged)(value, oldValue)) {
        trigger(target, "set"
        /* SET */
        , key, value, oldValue);
      }
    }

    return result;
  };
}

function deleteProperty(target, key) {
  const hadKey = (0, _shared.hasOwn)(target, key);
  const oldValue = target[key];
  const result = Reflect.deleteProperty(target, key);

  if (result && hadKey) {
    trigger(target, "delete"
    /* DELETE */
    , key, undefined, oldValue);
  }

  return result;
}

function has(target, key) {
  const result = Reflect.has(target, key);

  if (!(0, _shared.isSymbol)(key) || !builtInSymbols.has(key)) {
    track(target, "has"
    /* HAS */
    , key);
  }

  return result;
}

function ownKeys(target) {
  track(target, "iterate"
  /* ITERATE */
  , ITERATE_KEY);
  return Reflect.ownKeys(target);
}

const mutableHandlers = {
  get,
  set,
  deleteProperty,
  has,
  ownKeys
};
const readonlyHandlers = {
  get: readonlyGet,
  has,
  ownKeys,

  set(target, key) {
    if ("development" !== 'production') {
      console.warn(`Set operation on key "${String(key)}" failed: target is readonly.`, target);
    }

    return true;
  },

  deleteProperty(target, key) {
    if ("development" !== 'production') {
      console.warn(`Delete operation on key "${String(key)}" failed: target is readonly.`, target);
    }

    return true;
  }

};
const shallowReactiveHandlers = (0, _shared.extend)({}, mutableHandlers, {
  get: shallowGet,
  set: shallowSet
}); // Props handlers are special in the sense that it should not unwrap top-level
// refs (in order to allow refs to be explicitly passed down), but should
// retain the reactivity of the normal readonly object.

const shallowReadonlyHandlers = (0, _shared.extend)({}, readonlyHandlers, {
  get: shallowReadonlyGet
});

const toReactive = value => (0, _shared.isObject)(value) ? reactive(value) : value;

const toReadonly = value => (0, _shared.isObject)(value) ? readonly(value) : value;

const toShallow = value => value;

const getProto = v => Reflect.getPrototypeOf(v);

function get$1(target, key, wrap) {
  target = toRaw(target);
  const rawKey = toRaw(key);

  if (key !== rawKey) {
    track(target, "get"
    /* GET */
    , key);
  }

  track(target, "get"
  /* GET */
  , rawKey);
  const {
    has,
    get
  } = getProto(target);

  if (has.call(target, key)) {
    return wrap(get.call(target, key));
  } else if (has.call(target, rawKey)) {
    return wrap(get.call(target, rawKey));
  }
}

function has$1(key) {
  const target = toRaw(this);
  const rawKey = toRaw(key);

  if (key !== rawKey) {
    track(target, "has"
    /* HAS */
    , key);
  }

  track(target, "has"
  /* HAS */
  , rawKey);
  const has = getProto(target).has;
  return has.call(target, key) || has.call(target, rawKey);
}

function size(target) {
  target = toRaw(target);
  track(target, "iterate"
  /* ITERATE */
  , ITERATE_KEY);
  return Reflect.get(getProto(target), 'size', target);
}

function add(value) {
  value = toRaw(value);
  const target = toRaw(this);
  const proto = getProto(target);
  const hadKey = proto.has.call(target, value);
  const result = proto.add.call(target, value);

  if (!hadKey) {
    trigger(target, "add"
    /* ADD */
    , value, value);
  }

  return result;
}

function set$1(key, value) {
  value = toRaw(value);
  const target = toRaw(this);
  const {
    has,
    get,
    set
  } = getProto(target);
  let hadKey = has.call(target, key);

  if (!hadKey) {
    key = toRaw(key);
    hadKey = has.call(target, key);
  } else if ("development" !== 'production') {
    checkIdentityKeys(target, has, key);
  }

  const oldValue = get.call(target, key);
  const result = set.call(target, key, value);

  if (!hadKey) {
    trigger(target, "add"
    /* ADD */
    , key, value);
  } else if ((0, _shared.hasChanged)(value, oldValue)) {
    trigger(target, "set"
    /* SET */
    , key, value, oldValue);
  }

  return result;
}

function deleteEntry(key) {
  const target = toRaw(this);
  const {
    has,
    get,
    delete: del
  } = getProto(target);
  let hadKey = has.call(target, key);

  if (!hadKey) {
    key = toRaw(key);
    hadKey = has.call(target, key);
  } else if ("development" !== 'production') {
    checkIdentityKeys(target, has, key);
  }

  const oldValue = get ? get.call(target, key) : undefined; // forward the operation before queueing reactions

  const result = del.call(target, key);

  if (hadKey) {
    trigger(target, "delete"
    /* DELETE */
    , key, undefined, oldValue);
  }

  return result;
}

function clear() {
  const target = toRaw(this);
  const hadItems = target.size !== 0;
  const oldTarget = "development" !== 'production' ? target instanceof Map ? new Map(target) : new Set(target) : undefined; // forward the operation before queueing reactions

  const result = getProto(target).clear.call(target);

  if (hadItems) {
    trigger(target, "clear"
    /* CLEAR */
    , undefined, undefined, oldTarget);
  }

  return result;
}

function createForEach(isReadonly, shallow) {
  return function forEach(callback, thisArg) {
    const observed = this;
    const target = toRaw(observed);
    const wrap = isReadonly ? toReadonly : shallow ? toShallow : toReactive;
    !isReadonly && track(target, "iterate"
    /* ITERATE */
    , ITERATE_KEY); // important: create sure the callback is
    // 1. invoked with the reactive map as `this` and 3rd arg
    // 2. the value received should be a corresponding reactive/readonly.

    function wrappedCallback(value, key) {
      return callback.call(thisArg, wrap(value), wrap(key), observed);
    }

    return getProto(target).forEach.call(target, wrappedCallback);
  };
}

function createIterableMethod(method, isReadonly, shallow) {
  return function (...args) {
    const target = toRaw(this);
    const isMap = target instanceof Map;
    const isPair = method === 'entries' || method === Symbol.iterator && isMap;
    const isKeyOnly = method === 'keys' && isMap;
    const innerIterator = getProto(target)[method].apply(target, args);
    const wrap = isReadonly ? toReadonly : shallow ? toShallow : toReactive;
    !isReadonly && track(target, "iterate"
    /* ITERATE */
    , isKeyOnly ? MAP_KEY_ITERATE_KEY : ITERATE_KEY); // return a wrapped iterator which returns observed versions of the
    // values emitted from the real iterator

    return {
      // iterator protocol
      next() {
        const {
          value,
          done
        } = innerIterator.next();
        return done ? {
          value,
          done
        } : {
          value: isPair ? [wrap(value[0]), wrap(value[1])] : wrap(value),
          done
        };
      },

      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }

    };
  };
}

function createReadonlyMethod(type) {
  return function (...args) {
    if ("development" !== 'production') {
      const key = args[0] ? `on key "${args[0]}" ` : ``;
      console.warn(`${(0, _shared.capitalize)(type)} operation ${key}failed: target is readonly.`, toRaw(this));
    }

    return type === "delete"
    /* DELETE */
    ? false : this;
  };
}

const mutableInstrumentations = {
  get(key) {
    return get$1(this, key, toReactive);
  },

  get size() {
    return size(this);
  },

  has: has$1,
  add,
  set: set$1,
  delete: deleteEntry,
  clear,
  forEach: createForEach(false, false)
};
const shallowInstrumentations = {
  get(key) {
    return get$1(this, key, toShallow);
  },

  get size() {
    return size(this);
  },

  has: has$1,
  add,
  set: set$1,
  delete: deleteEntry,
  clear,
  forEach: createForEach(false, true)
};
const readonlyInstrumentations = {
  get(key) {
    return get$1(this, key, toReadonly);
  },

  get size() {
    return size(this);
  },

  has: has$1,
  add: createReadonlyMethod("add"
  /* ADD */
  ),
  set: createReadonlyMethod("set"
  /* SET */
  ),
  delete: createReadonlyMethod("delete"
  /* DELETE */
  ),
  clear: createReadonlyMethod("clear"
  /* CLEAR */
  ),
  forEach: createForEach(true, false)
};
const iteratorMethods = ['keys', 'values', 'entries', Symbol.iterator];
iteratorMethods.forEach(method => {
  mutableInstrumentations[method] = createIterableMethod(method, false, false);
  readonlyInstrumentations[method] = createIterableMethod(method, true, false);
  shallowInstrumentations[method] = createIterableMethod(method, false, true);
});

function createInstrumentationGetter(isReadonly, shallow) {
  const instrumentations = shallow ? shallowInstrumentations : isReadonly ? readonlyInstrumentations : mutableInstrumentations;
  return (target, key, receiver) => {
    if (key === "__v_isReactive"
    /* IS_REACTIVE */
    ) {
        return !isReadonly;
      } else if (key === "__v_isReadonly"
    /* IS_READONLY */
    ) {
        return isReadonly;
      } else if (key === "__v_raw"
    /* RAW */
    ) {
        return target;
      }

    return Reflect.get((0, _shared.hasOwn)(instrumentations, key) && key in target ? instrumentations : target, key, receiver);
  };
}

const mutableCollectionHandlers = {
  get: createInstrumentationGetter(false, false)
};
const shallowCollectionHandlers = {
  get: createInstrumentationGetter(false, true)
};
const readonlyCollectionHandlers = {
  get: createInstrumentationGetter(true, false)
};

function checkIdentityKeys(target, has, key) {
  const rawKey = toRaw(key);

  if (rawKey !== key && has.call(target, rawKey)) {
    const type = (0, _shared.toRawType)(target);
    console.warn(`Reactive ${type} contains both the raw and reactive ` + `versions of the same object${type === `Map` ? `as keys` : ``}, ` + `which can lead to inconsistencies. ` + `Avoid differentiating between the raw and reactive versions ` + `of an object and only use the reactive version if possible.`);
  }
}

const collectionTypes = new Set([Set, Map, WeakMap, WeakSet]);
const isObservableType = /*#__PURE__*/(0, _shared.makeMap)('Object,Array,Map,Set,WeakMap,WeakSet');

const canObserve = value => {
  return !value["__v_skip"
  /* SKIP */
  ] && isObservableType((0, _shared.toRawType)(value)) && !Object.isFrozen(value);
};

function reactive(target) {
  // if trying to observe a readonly proxy, return the readonly version.
  if (target && target["__v_isReadonly"
  /* IS_READONLY */
  ]) {
    return target;
  }

  return createReactiveObject(target, false, mutableHandlers, mutableCollectionHandlers);
} // Return a reactive-copy of the original object, where only the root level
// properties are reactive, and does NOT unwrap refs nor recursively convert
// returned properties.


function shallowReactive(target) {
  return createReactiveObject(target, false, shallowReactiveHandlers, shallowCollectionHandlers);
}

function readonly(target) {
  return createReactiveObject(target, true, readonlyHandlers, readonlyCollectionHandlers);
} // Return a reactive-copy of the original object, where only the root level
// properties are readonly, and does NOT unwrap refs nor recursively convert
// returned properties.
// This is used for creating the props proxy object for stateful components.


function shallowReadonly(target) {
  return createReactiveObject(target, true, shallowReadonlyHandlers, readonlyCollectionHandlers);
}

function createReactiveObject(target, isReadonly, baseHandlers, collectionHandlers) {
  if (!(0, _shared.isObject)(target)) {
    if ("development" !== 'production') {
      console.warn(`value cannot be made reactive: ${String(target)}`);
    }

    return target;
  } // target is already a Proxy, return it.
  // exception: calling readonly() on a reactive object


  if (target["__v_raw"
  /* RAW */
  ] && !(isReadonly && target["__v_isReactive"
  /* IS_REACTIVE */
  ])) {
    return target;
  } // target already has corresponding Proxy


  const reactiveFlag = isReadonly ? "__v_readonly"
  /* READONLY */
  : "__v_reactive"
  /* REACTIVE */
  ;

  if ((0, _shared.hasOwn)(target, reactiveFlag)) {
    return target[reactiveFlag];
  } // only a whitelist of value types can be observed.


  if (!canObserve(target)) {
    return target;
  }

  const observed = new Proxy(target, collectionTypes.has(target.constructor) ? collectionHandlers : baseHandlers);
  (0, _shared.def)(target, reactiveFlag, observed);
  return observed;
}

function isReactive(value) {
  if (isReadonly(value)) {
    return isReactive(value["__v_raw"
    /* RAW */
    ]);
  }

  return !!(value && value["__v_isReactive"
  /* IS_REACTIVE */
  ]);
}

function isReadonly(value) {
  return !!(value && value["__v_isReadonly"
  /* IS_READONLY */
  ]);
}

function isProxy(value) {
  return isReactive(value) || isReadonly(value);
}

function toRaw(observed) {
  return observed && toRaw(observed["__v_raw"
  /* RAW */
  ]) || observed;
}

function markRaw(value) {
  (0, _shared.def)(value, "__v_skip"
  /* SKIP */
  , true);
  return value;
}

const convert = val => (0, _shared.isObject)(val) ? reactive(val) : val;

function isRef(r) {
  return r ? r.__v_isRef === true : false;
}

function ref(value) {
  return createRef(value);
}

function shallowRef(value) {
  return createRef(value, true);
}

function createRef(rawValue, shallow = false) {
  if (isRef(rawValue)) {
    return rawValue;
  }

  let value = shallow ? rawValue : convert(rawValue);
  const r = {
    __v_isRef: true,

    get value() {
      track(r, "get"
      /* GET */
      , 'value');
      return value;
    },

    set value(newVal) {
      if ((0, _shared.hasChanged)(toRaw(newVal), rawValue)) {
        rawValue = newVal;
        value = shallow ? newVal : convert(newVal);
        trigger(r, "set"
        /* SET */
        , 'value', newVal);
      }
    }

  };
  return r;
}

function triggerRef(ref) {
  trigger(ref, "set"
  /* SET */
  , 'value', "development" !== 'production' ? ref.value : void 0);
}

function unref(ref) {
  return isRef(ref) ? ref.value : ref;
}

const shallowUnwrapHandlers = {
  get: (target, key, receiver) => unref(Reflect.get(target, key, receiver)),
  set: (target, key, value, receiver) => {
    const oldValue = target[key];

    if (isRef(oldValue) && !isRef(value)) {
      oldValue.value = value;
      return true;
    } else {
      return Reflect.set(target, key, value, receiver);
    }
  }
};

function proxyRefs(objectWithRefs) {
  return isReactive(objectWithRefs) ? objectWithRefs : new Proxy(objectWithRefs, shallowUnwrapHandlers);
}

function customRef(factory) {
  const {
    get,
    set
  } = factory(() => track(r, "get"
  /* GET */
  , 'value'), () => trigger(r, "set"
  /* SET */
  , 'value'));
  const r = {
    __v_isRef: true,

    get value() {
      return get();
    },

    set value(v) {
      set(v);
    }

  };
  return r;
}

function toRefs(object) {
  if ("development" !== 'production' && !isProxy(object)) {
    console.warn(`toRefs() expects a reactive object but received a plain one.`);
  }

  const ret = {};

  for (const key in object) {
    ret[key] = toRef(object, key);
  }

  return ret;
}

function toRef(object, key) {
  return {
    __v_isRef: true,

    get value() {
      return object[key];
    },

    set value(newVal) {
      object[key] = newVal;
    }

  };
}

function computed(getterOrOptions) {
  let getter;
  let setter;

  if ((0, _shared.isFunction)(getterOrOptions)) {
    getter = getterOrOptions;
    setter = "development" !== 'production' ? () => {
      console.warn('Write operation failed: computed value is readonly');
    } : _shared.NOOP;
  } else {
    getter = getterOrOptions.get;
    setter = getterOrOptions.set;
  }

  let dirty = true;
  let value;
  let computed;
  const runner = effect(getter, {
    lazy: true,
    scheduler: () => {
      if (!dirty) {
        dirty = true;
        trigger(computed, "set"
        /* SET */
        , 'value');
      }
    }
  });
  computed = {
    __v_isRef: true,
    ["__v_isReadonly"
    /* IS_READONLY */
    ]: (0, _shared.isFunction)(getterOrOptions) || !getterOrOptions.set,
    // expose effect so computed can be stopped
    effect: runner,

    get value() {
      if (dirty) {
        value = runner();
        dirty = false;
      }

      track(computed, "get"
      /* GET */
      , 'value');
      return value;
    },

    set value(newValue) {
      setter(newValue);
    }

  };
  return computed;
}
},{"@vue/shared":"../node_modules/@vue/shared/dist/shared.esm-bundler.js"}],"../node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js":[function(require,module,exports) {
var global = arguments[3];
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.callWithAsyncErrorHandling = callWithAsyncErrorHandling;
exports.callWithErrorHandling = callWithErrorHandling;
exports.cloneVNode = cloneVNode;
exports.computed = computed;
exports.createBlock = createBlock;
exports.createCommentVNode = createCommentVNode;
exports.createHydrationRenderer = createHydrationRenderer;
exports.createRenderer = createRenderer;
exports.createSlots = createSlots;
exports.createStaticVNode = createStaticVNode;
exports.createTextVNode = createTextVNode;
exports.defineAsyncComponent = defineAsyncComponent;
exports.defineComponent = defineComponent;
exports.getTransitionRawChildren = getTransitionRawChildren;
exports.h = h;
exports.handleError = handleError;
exports.inject = inject;
exports.isVNode = isVNode;
exports.mergeProps = mergeProps;
exports.nextTick = nextTick;
exports.onActivated = onActivated;
exports.onDeactivated = onDeactivated;
exports.openBlock = openBlock;
exports.popScopeId = popScopeId;
exports.provide = provide;
exports.pushScopeId = pushScopeId;
exports.queuePostFlushCb = queuePostFlushCb;
exports.registerRuntimeCompiler = registerRuntimeCompiler;
exports.renderList = renderList;
exports.renderSlot = renderSlot;
exports.resolveComponent = resolveComponent;
exports.resolveDirective = resolveDirective;
exports.resolveDynamicComponent = resolveDynamicComponent;
exports.resolveTransitionHooks = resolveTransitionHooks;
exports.setBlockTracking = setBlockTracking;
exports.setDevtoolsHook = setDevtoolsHook;
exports.setTransitionHooks = setTransitionHooks;
exports.toHandlers = toHandlers;
exports.transformVNodeArgs = transformVNodeArgs;
exports.useTransitionState = useTransitionState;
exports.warn = warn;
exports.watch = watch;
exports.watchEffect = watchEffect;
exports.withCtx = withCtx;
exports.withDirectives = withDirectives;
exports.withScopeId = withScopeId;
Object.defineProperty(exports, "customRef", {
  enumerable: true,
  get: function () {
    return _reactivity.customRef;
  }
});
Object.defineProperty(exports, "isProxy", {
  enumerable: true,
  get: function () {
    return _reactivity.isProxy;
  }
});
Object.defineProperty(exports, "isReactive", {
  enumerable: true,
  get: function () {
    return _reactivity.isReactive;
  }
});
Object.defineProperty(exports, "isReadonly", {
  enumerable: true,
  get: function () {
    return _reactivity.isReadonly;
  }
});
Object.defineProperty(exports, "isRef", {
  enumerable: true,
  get: function () {
    return _reactivity.isRef;
  }
});
Object.defineProperty(exports, "markRaw", {
  enumerable: true,
  get: function () {
    return _reactivity.markRaw;
  }
});
Object.defineProperty(exports, "proxyRefs", {
  enumerable: true,
  get: function () {
    return _reactivity.proxyRefs;
  }
});
Object.defineProperty(exports, "reactive", {
  enumerable: true,
  get: function () {
    return _reactivity.reactive;
  }
});
Object.defineProperty(exports, "readonly", {
  enumerable: true,
  get: function () {
    return _reactivity.readonly;
  }
});
Object.defineProperty(exports, "ref", {
  enumerable: true,
  get: function () {
    return _reactivity.ref;
  }
});
Object.defineProperty(exports, "shallowReactive", {
  enumerable: true,
  get: function () {
    return _reactivity.shallowReactive;
  }
});
Object.defineProperty(exports, "shallowReadonly", {
  enumerable: true,
  get: function () {
    return _reactivity.shallowReadonly;
  }
});
Object.defineProperty(exports, "shallowRef", {
  enumerable: true,
  get: function () {
    return _reactivity.shallowRef;
  }
});
Object.defineProperty(exports, "toRaw", {
  enumerable: true,
  get: function () {
    return _reactivity.toRaw;
  }
});
Object.defineProperty(exports, "toRef", {
  enumerable: true,
  get: function () {
    return _reactivity.toRef;
  }
});
Object.defineProperty(exports, "toRefs", {
  enumerable: true,
  get: function () {
    return _reactivity.toRefs;
  }
});
Object.defineProperty(exports, "triggerRef", {
  enumerable: true,
  get: function () {
    return _reactivity.triggerRef;
  }
});
Object.defineProperty(exports, "unref", {
  enumerable: true,
  get: function () {
    return _reactivity.unref;
  }
});
Object.defineProperty(exports, "camelize", {
  enumerable: true,
  get: function () {
    return _shared.camelize;
  }
});
Object.defineProperty(exports, "capitalize", {
  enumerable: true,
  get: function () {
    return _shared.capitalize;
  }
});
Object.defineProperty(exports, "toDisplayString", {
  enumerable: true,
  get: function () {
    return _shared.toDisplayString;
  }
});
exports.version = exports.useSSRContext = exports.ssrUtils = exports.ssrContextKey = exports.onUpdated = exports.onUnmounted = exports.onRenderTriggered = exports.onRenderTracked = exports.onMounted = exports.onErrorCaptured = exports.onBeforeUpdate = exports.onBeforeUnmount = exports.onBeforeMount = exports.getCurrentInstance = exports.devtools = exports.createVNode = exports.Text = exports.Teleport = exports.Suspense = exports.Static = exports.KeepAlive = exports.Fragment = exports.Comment = exports.BaseTransition = void 0;

var _reactivity = require("@vue/reactivity");

var _shared = require("@vue/shared");

const stack = [];

function pushWarningContext(vnode) {
  stack.push(vnode);
}

function popWarningContext() {
  stack.pop();
}

function warn(msg, ...args) {
  // avoid props formatting or warn handler tracking deps that might be mutated
  // during patch, leading to infinite recursion.
  (0, _reactivity.pauseTracking)();
  const instance = stack.length ? stack[stack.length - 1].component : null;
  const appWarnHandler = instance && instance.appContext.config.warnHandler;
  const trace = getComponentTrace();

  if (appWarnHandler) {
    callWithErrorHandling(appWarnHandler, instance, 11
    /* APP_WARN_HANDLER */
    , [msg + args.join(''), instance && instance.proxy, trace.map(({
      vnode
    }) => `at <${formatComponentName(instance, vnode.type)}>`).join('\n'), trace]);
  } else {
    const warnArgs = [`[Vue warn]: ${msg}`, ...args];
    /* istanbul ignore if */

    if (trace.length && // avoid spamming console during tests
    !false) {
      warnArgs.push(`\n`, ...formatTrace(trace));
    }

    console.warn(...warnArgs);
  }

  (0, _reactivity.resetTracking)();
}

function getComponentTrace() {
  let currentVNode = stack[stack.length - 1];

  if (!currentVNode) {
    return [];
  } // we can't just use the stack because it will be incomplete during updates
  // that did not start from the root. Re-construct the parent chain using
  // instance parent pointers.


  const normalizedStack = [];

  while (currentVNode) {
    const last = normalizedStack[0];

    if (last && last.vnode === currentVNode) {
      last.recurseCount++;
    } else {
      normalizedStack.push({
        vnode: currentVNode,
        recurseCount: 0
      });
    }

    const parentInstance = currentVNode.component && currentVNode.component.parent;
    currentVNode = parentInstance && parentInstance.vnode;
  }

  return normalizedStack;
}
/* istanbul ignore next */


function formatTrace(trace) {
  const logs = [];
  trace.forEach((entry, i) => {
    logs.push(...(i === 0 ? [] : [`\n`]), ...formatTraceEntry(entry));
  });
  return logs;
}

function formatTraceEntry({
  vnode,
  recurseCount
}) {
  const postfix = recurseCount > 0 ? `... (${recurseCount} recursive calls)` : ``;
  const isRoot = vnode.component ? vnode.component.parent == null : false;
  const open = ` at <${formatComponentName(vnode.component, vnode.type, isRoot)}`;
  const close = `>` + postfix;
  return vnode.props ? [open, ...formatProps(vnode.props), close] : [open + close];
}
/* istanbul ignore next */


function formatProps(props) {
  const res = [];
  const keys = Object.keys(props);
  keys.slice(0, 3).forEach(key => {
    res.push(...formatProp(key, props[key]));
  });

  if (keys.length > 3) {
    res.push(` ...`);
  }

  return res;
}
/* istanbul ignore next */


function formatProp(key, value, raw) {
  if ((0, _shared.isString)(value)) {
    value = JSON.stringify(value);
    return raw ? value : [`${key}=${value}`];
  } else if (typeof value === 'number' || typeof value === 'boolean' || value == null) {
    return raw ? value : [`${key}=${value}`];
  } else if ((0, _reactivity.isRef)(value)) {
    value = formatProp(key, (0, _reactivity.toRaw)(value.value), true);
    return raw ? value : [`${key}=Ref<`, value, `>`];
  } else if ((0, _shared.isFunction)(value)) {
    return [`${key}=fn${value.name ? `<${value.name}>` : ``}`];
  } else {
    value = (0, _reactivity.toRaw)(value);
    return raw ? value : [`${key}=`, value];
  }
}

const ErrorTypeStrings = {
  ["bc"
  /* BEFORE_CREATE */
  ]: 'beforeCreate hook',
  ["c"
  /* CREATED */
  ]: 'created hook',
  ["bm"
  /* BEFORE_MOUNT */
  ]: 'beforeMount hook',
  ["m"
  /* MOUNTED */
  ]: 'mounted hook',
  ["bu"
  /* BEFORE_UPDATE */
  ]: 'beforeUpdate hook',
  ["u"
  /* UPDATED */
  ]: 'updated',
  ["bum"
  /* BEFORE_UNMOUNT */
  ]: 'beforeUnmount hook',
  ["um"
  /* UNMOUNTED */
  ]: 'unmounted hook',
  ["a"
  /* ACTIVATED */
  ]: 'activated hook',
  ["da"
  /* DEACTIVATED */
  ]: 'deactivated hook',
  ["ec"
  /* ERROR_CAPTURED */
  ]: 'errorCaptured hook',
  ["rtc"
  /* RENDER_TRACKED */
  ]: 'renderTracked hook',
  ["rtg"
  /* RENDER_TRIGGERED */
  ]: 'renderTriggered hook',
  [0
  /* SETUP_FUNCTION */
  ]: 'setup function',
  [1
  /* RENDER_FUNCTION */
  ]: 'render function',
  [2
  /* WATCH_GETTER */
  ]: 'watcher getter',
  [3
  /* WATCH_CALLBACK */
  ]: 'watcher callback',
  [4
  /* WATCH_CLEANUP */
  ]: 'watcher cleanup function',
  [5
  /* NATIVE_EVENT_HANDLER */
  ]: 'native event handler',
  [6
  /* COMPONENT_EVENT_HANDLER */
  ]: 'component event handler',
  [7
  /* VNODE_HOOK */
  ]: 'vnode hook',
  [8
  /* DIRECTIVE_HOOK */
  ]: 'directive hook',
  [9
  /* TRANSITION_HOOK */
  ]: 'transition hook',
  [10
  /* APP_ERROR_HANDLER */
  ]: 'app errorHandler',
  [11
  /* APP_WARN_HANDLER */
  ]: 'app warnHandler',
  [12
  /* FUNCTION_REF */
  ]: 'ref function',
  [13
  /* ASYNC_COMPONENT_LOADER */
  ]: 'async component loader',
  [14
  /* SCHEDULER */
  ]: 'scheduler flush. This is likely a Vue internals bug. ' + 'Please open an issue at https://new-issue.vuejs.org/?repo=vuejs/vue-next'
};

function callWithErrorHandling(fn, instance, type, args) {
  let res;

  try {
    res = args ? fn(...args) : fn();
  } catch (err) {
    handleError(err, instance, type);
  }

  return res;
}

function callWithAsyncErrorHandling(fn, instance, type, args) {
  if ((0, _shared.isFunction)(fn)) {
    const res = callWithErrorHandling(fn, instance, type, args);

    if (res && (0, _shared.isPromise)(res)) {
      res.catch(err => {
        handleError(err, instance, type);
      });
    }

    return res;
  }

  const values = [];

  for (let i = 0; i < fn.length; i++) {
    values.push(callWithAsyncErrorHandling(fn[i], instance, type, args));
  }

  return values;
}

function handleError(err, instance, type) {
  const contextVNode = instance ? instance.vnode : null;

  if (instance) {
    let cur = instance.parent; // the exposed instance is the render proxy to keep it consistent with 2.x

    const exposedInstance = instance.proxy; // in production the hook receives only the error code

    const errorInfo = "development" !== 'production' ? ErrorTypeStrings[type] : type;

    while (cur) {
      const errorCapturedHooks = cur.ec;

      if (errorCapturedHooks) {
        for (let i = 0; i < errorCapturedHooks.length; i++) {
          if (errorCapturedHooks[i](err, exposedInstance, errorInfo)) {
            return;
          }
        }
      }

      cur = cur.parent;
    } // app-level handling


    const appErrorHandler = instance.appContext.config.errorHandler;

    if (appErrorHandler) {
      callWithErrorHandling(appErrorHandler, null, 10
      /* APP_ERROR_HANDLER */
      , [err, exposedInstance, errorInfo]);
      return;
    }
  }

  logError(err, type, contextVNode);
}

function logError(err, type, contextVNode) {
  if ("development" !== 'production') {
    const info = ErrorTypeStrings[type];

    if (contextVNode) {
      pushWarningContext(contextVNode);
    }

    warn(`Unhandled error${info ? ` during execution of ${info}` : ``}`);

    if (contextVNode) {
      popWarningContext();
    } // crash in dev so it's more noticeable


    throw err;
  } else {
    // recover in prod to reduce the impact on end-user
    console.error(err);
  }
}

const queue = [];
const postFlushCbs = [];
const resolvedPromise = Promise.resolve();
let currentFlushPromise = null;
let isFlushing = false;
let isFlushPending = false;
let flushIndex = -1;
let pendingPostFlushCbs = null;
let pendingPostFlushIndex = 0;
const RECURSION_LIMIT = 100;

function nextTick(fn) {
  const p = currentFlushPromise || resolvedPromise;
  return fn ? p.then(fn) : p;
}

function queueJob(job) {
  if (!queue.includes(job, flushIndex + 1)) {
    queue.push(job);
    queueFlush();
  }
}

function invalidateJob(job) {
  const i = queue.indexOf(job);

  if (i > -1) {
    queue[i] = null;
  }
}

function queuePostFlushCb(cb) {
  if (!(0, _shared.isArray)(cb)) {
    if (!pendingPostFlushCbs || !pendingPostFlushCbs.includes(cb, pendingPostFlushIndex + 1)) {
      postFlushCbs.push(cb);
    }
  } else {
    // if cb is an array, it is a component lifecycle hook which can only be
    // triggered by a job, which is already deduped in the main queue, so
    // we can skip dupicate check here to improve perf
    postFlushCbs.push(...cb);
  }

  queueFlush();
}

function queueFlush() {
  if (!isFlushing && !isFlushPending) {
    isFlushPending = true;
    currentFlushPromise = resolvedPromise.then(flushJobs);
  }
}

function flushPostFlushCbs(seen) {
  if (postFlushCbs.length) {
    pendingPostFlushCbs = [...new Set(postFlushCbs)];
    postFlushCbs.length = 0;

    if ("development" !== 'production') {
      seen = seen || new Map();
    }

    for (pendingPostFlushIndex = 0; pendingPostFlushIndex < pendingPostFlushCbs.length; pendingPostFlushIndex++) {
      if ("development" !== 'production') {
        checkRecursiveUpdates(seen, pendingPostFlushCbs[pendingPostFlushIndex]);
      }

      pendingPostFlushCbs[pendingPostFlushIndex]();
    }

    pendingPostFlushCbs = null;
    pendingPostFlushIndex = 0;
  }
}

const getId = job => job.id == null ? Infinity : job.id;

function flushJobs(seen) {
  isFlushPending = false;
  isFlushing = true;

  if ("development" !== 'production') {
    seen = seen || new Map();
  } // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child so its render effect will have smaller
  //    priority number)
  // 2. If a component is unmounted during a parent component's update,
  //    its update can be skipped.
  // Jobs can never be null before flush starts, since they are only invalidated
  // during execution of another flushed job.


  queue.sort((a, b) => getId(a) - getId(b));

  for (flushIndex = 0; flushIndex < queue.length; flushIndex++) {
    const job = queue[flushIndex];

    if (job) {
      if ("development" !== 'production') {
        checkRecursiveUpdates(seen, job);
      }

      callWithErrorHandling(job, null, 14
      /* SCHEDULER */
      );
    }
  }

  flushIndex = -1;
  queue.length = 0;
  flushPostFlushCbs(seen);
  isFlushing = false;
  currentFlushPromise = null; // some postFlushCb queued jobs!
  // keep flushing until it drains.

  if (queue.length || postFlushCbs.length) {
    flushJobs(seen);
  }
}

function checkRecursiveUpdates(seen, fn) {
  if (!seen.has(fn)) {
    seen.set(fn, 1);
  } else {
    const count = seen.get(fn);

    if (count > RECURSION_LIMIT) {
      throw new Error('Maximum recursive updates exceeded. ' + "You may have code that is mutating state in your component's " + 'render function or updated hook or watcher source function.');
    } else {
      seen.set(fn, count + 1);
    }
  }
}

let isHmrUpdating = false;
const hmrDirtyComponents = new Set(); // Expose the HMR runtime on the global object
// This makes it entirely tree-shakable without polluting the exports and makes
// it easier to be used in toolings like vue-loader
// Note: for a component to be eligible for HMR it also needs the __hmrId option
// to be set so that its instances can be registered / removed.

if ("development" !== 'production') {
  const globalObject = typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : typeof window !== 'undefined' ? window : {};
  globalObject.__VUE_HMR_RUNTIME__ = {
    createRecord: tryWrap(createRecord),
    rerender: tryWrap(rerender),
    reload: tryWrap(reload)
  };
}

const map = new Map();

function registerHMR(instance) {
  const id = instance.type.__hmrId;
  let record = map.get(id);

  if (!record) {
    createRecord(id);
    record = map.get(id);
  }

  record.add(instance);
}

function unregisterHMR(instance) {
  map.get(instance.type.__hmrId).delete(instance);
}

function createRecord(id) {
  if (map.has(id)) {
    return false;
  }

  map.set(id, new Set());
  return true;
}

function rerender(id, newRender) {
  const record = map.get(id);
  if (!record) return; // Array.from creates a snapshot which avoids the set being mutated during
  // updates

  Array.from(record).forEach(instance => {
    if (newRender) {
      instance.render = newRender;
    }

    instance.renderCache = []; // this flag forces child components with slot content to update

    isHmrUpdating = true;
    instance.update();
    isHmrUpdating = false;
  });
}

function reload(id, newComp) {
  const record = map.get(id);
  if (!record) return; // Array.from creates a snapshot which avoids the set being mutated during
  // updates

  Array.from(record).forEach(instance => {
    const comp = instance.type;

    if (!hmrDirtyComponents.has(comp)) {
      // 1. Update existing comp definition to match new one
      (0, _shared.extend)(comp, newComp);

      for (const key in comp) {
        if (!(key in newComp)) {
          delete comp[key];
        }
      } // 2. Mark component dirty. This forces the renderer to replace the component
      // on patch.


      hmrDirtyComponents.add(comp); // 3. Make sure to unmark the component after the reload.

      queuePostFlushCb(() => {
        hmrDirtyComponents.delete(comp);
      });
    }

    if (instance.parent) {
      // 4. Force the parent instance to re-render. This will cause all updated
      // components to be unmounted and re-mounted. Queue the update so that we
      // don't end up forcing the same parent to re-render multiple times.
      queueJob(instance.parent.update);
    } else if (instance.appContext.reload) {
      // root instance mounted via createApp() has a reload method
      instance.appContext.reload();
    } else if (typeof window !== 'undefined') {
      // root instance inside tree created via raw render(). Force reload.
      window.location.reload();
    } else {
      console.warn('[HMR] Root or manually mounted instance modified. Full reload required.');
    }
  });
}

function tryWrap(fn) {
  return (id, arg) => {
    try {
      return fn(id, arg);
    } catch (e) {
      console.error(e);
      console.warn(`[HMR] Something went wrong during Vue component hot-reload. ` + `Full reload required.`);
    }
  };
} // mark the current rendering instance for asset resolution (e.g.
// resolveComponent, resolveDirective) during render


let currentRenderingInstance = null;

function setCurrentRenderingInstance(instance) {
  currentRenderingInstance = instance;
} // dev only flag to track whether $attrs was used during render.
// If $attrs was used during render then the warning for failed attrs
// fallthrough can be suppressed.


let accessedAttrs = false;

function markAttrsAccessed() {
  accessedAttrs = true;
}

function renderComponentRoot(instance) {
  const {
    type: Component,
    parent,
    vnode,
    proxy,
    withProxy,
    props,
    slots,
    attrs,
    emit,
    render,
    renderCache,
    data,
    setupState,
    ctx
  } = instance;
  let result;
  currentRenderingInstance = instance;

  if ("development" !== 'production') {
    accessedAttrs = false;
  }

  try {
    let fallthroughAttrs;

    if (vnode.shapeFlag & 4
    /* STATEFUL_COMPONENT */
    ) {
        // withProxy is a proxy with a different `has` trap only for
        // runtime-compiled render functions using `with` block.
        const proxyToUse = withProxy || proxy;
        result = normalizeVNode(render.call(proxyToUse, proxyToUse, renderCache, props, setupState, data, ctx));
        fallthroughAttrs = attrs;
      } else {
      // functional
      const render = Component; // in dev, mark attrs accessed if optional props (attrs === props)

      if ("development" !== 'production' && attrs === props) {
        markAttrsAccessed();
      }

      result = normalizeVNode(render.length > 1 ? render(props, "development" !== 'production' ? {
        get attrs() {
          markAttrsAccessed();
          return attrs;
        },

        slots,
        emit
      } : {
        attrs,
        slots,
        emit
      }) : render(props, null
      /* we know it doesn't need it */
      ));
      fallthroughAttrs = Component.props ? attrs : getFunctionalFallthrough(attrs);
    } // attr merging
    // in dev mode, comments are preserved, and it's possible for a template
    // to have comments along side the root element which makes it a fragment


    let root = result;
    let setRoot = undefined;

    if ("development" !== 'production') {
      ;
      [root, setRoot] = getChildRoot(result);
    }

    if (Component.inheritAttrs !== false && fallthroughAttrs) {
      const keys = Object.keys(fallthroughAttrs);
      const {
        shapeFlag
      } = root;

      if (keys.length) {
        if (shapeFlag & 1
        /* ELEMENT */
        || shapeFlag & 6
        /* COMPONENT */
        ) {
            if (shapeFlag & 1
            /* ELEMENT */
            && keys.some(_shared.isModelListener)) {
              // #1643, #1543
              // component v-model listeners should only fallthrough for component
              // HOCs
              fallthroughAttrs = filterModelListeners(fallthroughAttrs);
            }

            root = cloneVNode(root, fallthroughAttrs);
          } else if ("development" !== 'production' && !accessedAttrs && root.type !== Comment) {
          const allAttrs = Object.keys(attrs);
          const eventAttrs = [];
          const extraAttrs = [];

          for (let i = 0, l = allAttrs.length; i < l; i++) {
            const key = allAttrs[i];

            if ((0, _shared.isOn)(key)) {
              // ignore v-model handlers when they fail to fallthrough
              if (!(0, _shared.isModelListener)(key)) {
                // remove `on`, lowercase first letter to reflect event casing
                // accurately
                eventAttrs.push(key[2].toLowerCase() + key.slice(3));
              }
            } else {
              extraAttrs.push(key);
            }
          }

          if (extraAttrs.length) {
            warn(`Extraneous non-props attributes (` + `${extraAttrs.join(', ')}) ` + `were passed to component but could not be automatically inherited ` + `because component renders fragment or text root nodes.`);
          }

          if (eventAttrs.length) {
            warn(`Extraneous non-emits event listeners (` + `${eventAttrs.join(', ')}) ` + `were passed to component but could not be automatically inherited ` + `because component renders fragment or text root nodes. ` + `If the listener is intended to be a component custom event listener only, ` + `declare it using the "emits" option.`);
          }
        }
      }
    } // inherit scopeId


    const scopeId = vnode.scopeId; // vite#536: if subtree root is created from parent slot if would already
    // have the correct scopeId, in this case adding the scopeId will cause
    // it to be removed if the original slot vnode is reused.

    const needScopeId = scopeId && root.scopeId !== scopeId;
    const treeOwnerId = parent && parent.type.__scopeId;
    const slotScopeId = treeOwnerId && treeOwnerId !== scopeId ? treeOwnerId + '-s' : null;

    if (needScopeId || slotScopeId) {
      const extras = {};
      if (needScopeId) extras[scopeId] = '';
      if (slotScopeId) extras[slotScopeId] = '';
      root = cloneVNode(root, extras);
    } // inherit directives


    if (vnode.dirs) {
      if ("development" !== 'production' && !isElementRoot(root)) {
        warn(`Runtime directive used on component with non-element root node. ` + `The directives will not function as intended.`);
      }

      root.dirs = vnode.dirs;
    } // inherit transition data


    if (vnode.transition) {
      if ("development" !== 'production' && !isElementRoot(root)) {
        warn(`Component inside <Transition> renders non-element root node ` + `that cannot be animated.`);
      }

      root.transition = vnode.transition;
    }

    if ("development" !== 'production' && setRoot) {
      setRoot(root);
    } else {
      result = root;
    }
  } catch (err) {
    handleError(err, instance, 1
    /* RENDER_FUNCTION */
    );
    result = createVNode(Comment);
  }

  currentRenderingInstance = null;
  return result;
}
/**
 * dev only
 */


const getChildRoot = vnode => {
  if (vnode.type !== Fragment) {
    return [vnode, undefined];
  }

  const rawChildren = vnode.children;
  const dynamicChildren = vnode.dynamicChildren;
  const children = rawChildren.filter(child => {
    return !(isVNode(child) && child.type === Comment && child.children !== 'v-if');
  });

  if (children.length !== 1) {
    return [vnode, undefined];
  }

  const childRoot = children[0];
  const index = rawChildren.indexOf(childRoot);
  const dynamicIndex = dynamicChildren ? dynamicChildren.indexOf(childRoot) : -1;

  const setRoot = updatedRoot => {
    rawChildren[index] = updatedRoot;

    if (dynamicIndex > -1) {
      dynamicChildren[dynamicIndex] = updatedRoot;
    } else if (dynamicChildren && updatedRoot.patchFlag > 0) {
      dynamicChildren.push(updatedRoot);
    }
  };

  return [normalizeVNode(childRoot), setRoot];
};

const getFunctionalFallthrough = attrs => {
  let res;

  for (const key in attrs) {
    if (key === 'class' || key === 'style' || (0, _shared.isOn)(key)) {
      (res || (res = {}))[key] = attrs[key];
    }
  }

  return res;
};

const filterModelListeners = attrs => {
  const res = {};

  for (const key in attrs) {
    if (!(0, _shared.isModelListener)(key)) {
      res[key] = attrs[key];
    }
  }

  return res;
};

const isElementRoot = vnode => {
  return vnode.shapeFlag & 6
  /* COMPONENT */
  || vnode.shapeFlag & 1
  /* ELEMENT */
  || vnode.type === Comment // potential v-if branch switch
  ;
};

function shouldUpdateComponent(prevVNode, nextVNode, optimized) {
  const {
    props: prevProps,
    children: prevChildren
  } = prevVNode;
  const {
    props: nextProps,
    children: nextChildren,
    patchFlag
  } = nextVNode; // Parent component's render function was hot-updated. Since this may have
  // caused the child component's slots content to have changed, we need to
  // force the child to update as well.

  if ("development" !== 'production' && (prevChildren || nextChildren) && isHmrUpdating) {
    return true;
  } // force child update for runtime directive or transition on component vnode.


  if (nextVNode.dirs || nextVNode.transition) {
    return true;
  }

  if (optimized && patchFlag > 0) {
    if (patchFlag & 1024
    /* DYNAMIC_SLOTS */
    ) {
        // slot content that references values that might have changed,
        // e.g. in a v-for
        return true;
      }

    if (patchFlag & 16
    /* FULL_PROPS */
    ) {
        if (!prevProps) {
          return !!nextProps;
        } // presence of this flag indicates props are always non-null


        return hasPropsChanged(prevProps, nextProps);
      } else if (patchFlag & 8
    /* PROPS */
    ) {
        const dynamicProps = nextVNode.dynamicProps;

        for (let i = 0; i < dynamicProps.length; i++) {
          const key = dynamicProps[i];

          if (nextProps[key] !== prevProps[key]) {
            return true;
          }
        }
      }
  } else {
    // this path is only taken by manually written render functions
    // so presence of any children leads to a forced update
    if (prevChildren || nextChildren) {
      if (!nextChildren || !nextChildren.$stable) {
        return true;
      }
    }

    if (prevProps === nextProps) {
      return false;
    }

    if (!prevProps) {
      return !!nextProps;
    }

    if (!nextProps) {
      return true;
    }

    return hasPropsChanged(prevProps, nextProps);
  }

  return false;
}

function hasPropsChanged(prevProps, nextProps) {
  const nextKeys = Object.keys(nextProps);

  if (nextKeys.length !== Object.keys(prevProps).length) {
    return true;
  }

  for (let i = 0; i < nextKeys.length; i++) {
    const key = nextKeys[i];

    if (nextProps[key] !== prevProps[key]) {
      return true;
    }
  }

  return false;
}

function updateHOCHostEl({
  vnode,
  parent
}, el // HostNode
) {
  while (parent && parent.subTree === vnode) {
    (vnode = parent.vnode).el = el;
    parent = parent.parent;
  }
}

const isSuspense = type => type.__isSuspense; // Suspense exposes a component-like API, and is treated like a component
// in the compiler, but internally it's a special built-in type that hooks
// directly into the renderer.


const SuspenseImpl = {
  // In order to make Suspense tree-shakable, we need to avoid importing it
  // directly in the renderer. The renderer checks for the __isSuspense flag
  // on a vnode's type and calls the `process` method, passing in renderer
  // internals.
  __isSuspense: true,

  process(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, optimized, // platform-specific impl passed from renderer
  rendererInternals) {
    if (n1 == null) {
      mountSuspense(n2, container, anchor, parentComponent, parentSuspense, isSVG, optimized, rendererInternals);
    } else {
      patchSuspense(n1, n2, container, anchor, parentComponent, isSVG, optimized, rendererInternals);
    }
  },

  hydrate: hydrateSuspense
}; // Force-casted public typing for h and TSX props inference

const Suspense = SuspenseImpl;
exports.Suspense = Suspense;

function mountSuspense(n2, container, anchor, parentComponent, parentSuspense, isSVG, optimized, rendererInternals) {
  const {
    p: patch,
    o: {
      createElement
    }
  } = rendererInternals;
  const hiddenContainer = createElement('div');
  const suspense = n2.suspense = createSuspenseBoundary(n2, parentSuspense, parentComponent, container, hiddenContainer, anchor, isSVG, optimized, rendererInternals); // start mounting the content subtree in an off-dom container

  patch(null, suspense.subTree, hiddenContainer, null, parentComponent, suspense, isSVG, optimized); // now check if we have encountered any async deps

  if (suspense.deps > 0) {
    // mount the fallback tree
    patch(null, suspense.fallbackTree, container, anchor, parentComponent, null, // fallback tree will not have suspense context
    isSVG, optimized);
    n2.el = suspense.fallbackTree.el;
  } else {
    // Suspense has no async deps. Just resolve.
    suspense.resolve();
  }
}

function patchSuspense(n1, n2, container, anchor, parentComponent, isSVG, optimized, {
  p: patch
}) {
  const suspense = n2.suspense = n1.suspense;
  suspense.vnode = n2;
  const {
    content,
    fallback
  } = normalizeSuspenseChildren(n2);
  const oldSubTree = suspense.subTree;
  const oldFallbackTree = suspense.fallbackTree;

  if (!suspense.isResolved) {
    patch(oldSubTree, content, suspense.hiddenContainer, null, parentComponent, suspense, isSVG, optimized);

    if (suspense.deps > 0) {
      // still pending. patch the fallback tree.
      patch(oldFallbackTree, fallback, container, anchor, parentComponent, null, // fallback tree will not have suspense context
      isSVG, optimized);
      n2.el = fallback.el;
    } // If deps somehow becomes 0 after the patch it means the patch caused an
    // async dep component to unmount and removed its dep. It will cause the
    // suspense to resolve and we don't need to do anything here.

  } else {
    // just normal patch inner content as a fragment
    patch(oldSubTree, content, container, anchor, parentComponent, suspense, isSVG, optimized);
    n2.el = content.el;
  }

  suspense.subTree = content;
  suspense.fallbackTree = fallback;
}

let hasWarned = false;

function createSuspenseBoundary(vnode, parent, parentComponent, container, hiddenContainer, anchor, isSVG, optimized, rendererInternals, isHydrating = false) {
  /* istanbul ignore if */
  if ("development" !== 'production' && !false && !hasWarned) {
    hasWarned = true; // @ts-ignore `console.info` cannot be null error

    console[console.info ? 'info' : 'log'](`<Suspense> is an experimental feature and its API will likely change.`);
  }

  const {
    p: patch,
    m: move,
    um: unmount,
    n: next,
    o: {
      parentNode
    }
  } = rendererInternals;

  const getCurrentTree = () => suspense.isResolved || suspense.isHydrating ? suspense.subTree : suspense.fallbackTree;

  const {
    content,
    fallback
  } = normalizeSuspenseChildren(vnode);
  const suspense = {
    vnode,
    parent,
    parentComponent,
    isSVG,
    optimized,
    container,
    hiddenContainer,
    anchor,
    deps: 0,
    subTree: content,
    fallbackTree: fallback,
    isHydrating,
    isResolved: false,
    isUnmounted: false,
    effects: [],

    resolve() {
      if ("development" !== 'production') {
        if (suspense.isResolved) {
          throw new Error(`resolveSuspense() is called on an already resolved suspense boundary.`);
        }

        if (suspense.isUnmounted) {
          throw new Error(`resolveSuspense() is called on an already unmounted suspense boundary.`);
        }
      }

      const {
        vnode,
        subTree,
        fallbackTree,
        effects,
        parentComponent,
        container
      } = suspense;

      if (suspense.isHydrating) {
        suspense.isHydrating = false;
      } else {
        // this is initial anchor on mount
        let {
          anchor
        } = suspense; // unmount fallback tree

        if (fallbackTree.el) {
          // if the fallback tree was mounted, it may have been moved
          // as part of a parent suspense. get the latest anchor for insertion
          anchor = next(fallbackTree);
          unmount(fallbackTree, parentComponent, suspense, true);
        } // move content from off-dom container to actual container


        move(subTree, container, anchor, 0
        /* ENTER */
        );
      }

      const el = vnode.el = subTree.el; // suspense as the root node of a component...

      if (parentComponent && parentComponent.subTree === vnode) {
        parentComponent.vnode.el = el;
        updateHOCHostEl(parentComponent, el);
      } // check if there is a pending parent suspense


      let parent = suspense.parent;
      let hasUnresolvedAncestor = false;

      while (parent) {
        if (!parent.isResolved) {
          // found a pending parent suspense, merge buffered post jobs
          // into that parent
          parent.effects.push(...effects);
          hasUnresolvedAncestor = true;
          break;
        }

        parent = parent.parent;
      } // no pending parent suspense, flush all jobs


      if (!hasUnresolvedAncestor) {
        queuePostFlushCb(effects);
      }

      suspense.isResolved = true;
      suspense.effects = []; // invoke @resolve event

      const onResolve = vnode.props && vnode.props.onResolve;

      if ((0, _shared.isFunction)(onResolve)) {
        onResolve();
      }
    },

    recede() {
      suspense.isResolved = false;
      const {
        vnode,
        subTree,
        fallbackTree,
        parentComponent,
        container,
        hiddenContainer,
        isSVG,
        optimized
      } = suspense; // move content tree back to the off-dom container

      const anchor = next(subTree);
      move(subTree, hiddenContainer, null, 1
      /* LEAVE */
      ); // remount the fallback tree

      patch(null, fallbackTree, container, anchor, parentComponent, null, // fallback tree will not have suspense context
      isSVG, optimized);
      const el = vnode.el = fallbackTree.el; // suspense as the root node of a component...

      if (parentComponent && parentComponent.subTree === vnode) {
        parentComponent.vnode.el = el;
        updateHOCHostEl(parentComponent, el);
      } // invoke @recede event


      const onRecede = vnode.props && vnode.props.onRecede;

      if ((0, _shared.isFunction)(onRecede)) {
        onRecede();
      }
    },

    move(container, anchor, type) {
      move(getCurrentTree(), container, anchor, type);
      suspense.container = container;
    },

    next() {
      return next(getCurrentTree());
    },

    registerDep(instance, setupRenderEffect) {
      // suspense is already resolved, need to recede.
      // use queueJob so it's handled synchronously after patching the current
      // suspense tree
      if (suspense.isResolved) {
        queueJob(() => {
          suspense.recede();
        });
      }

      const hydratedEl = instance.vnode.el;
      suspense.deps++;
      instance.asyncDep.catch(err => {
        handleError(err, instance, 0
        /* SETUP_FUNCTION */
        );
      }).then(asyncSetupResult => {
        // retry when the setup() promise resolves.
        // component may have been unmounted before resolve.
        if (instance.isUnmounted || suspense.isUnmounted) {
          return;
        }

        suspense.deps--; // retry from this component

        instance.asyncResolved = true;
        const {
          vnode
        } = instance;

        if ("development" !== 'production') {
          pushWarningContext(vnode);
        }

        handleSetupResult(instance, asyncSetupResult);

        if (hydratedEl) {
          // vnode may have been replaced if an update happened before the
          // async dep is resolved.
          vnode.el = hydratedEl;
        }

        setupRenderEffect(instance, vnode, // component may have been moved before resolve.
        // if this is not a hydration, instance.subTree will be the comment
        // placeholder.
        hydratedEl ? parentNode(hydratedEl) : parentNode(instance.subTree.el), // anchor will not be used if this is hydration, so only need to
        // consider the comment placeholder case.
        hydratedEl ? null : next(instance.subTree), suspense, isSVG, optimized);
        updateHOCHostEl(instance, vnode.el);

        if ("development" !== 'production') {
          popWarningContext();
        }

        if (suspense.deps === 0) {
          suspense.resolve();
        }
      });
    },

    unmount(parentSuspense, doRemove) {
      suspense.isUnmounted = true;
      unmount(suspense.subTree, parentComponent, parentSuspense, doRemove);

      if (!suspense.isResolved) {
        unmount(suspense.fallbackTree, parentComponent, parentSuspense, doRemove);
      }
    }

  };
  return suspense;
}

function hydrateSuspense(node, vnode, parentComponent, parentSuspense, isSVG, optimized, rendererInternals, hydrateNode) {
  /* eslint-disable no-restricted-globals */
  const suspense = vnode.suspense = createSuspenseBoundary(vnode, parentSuspense, parentComponent, node.parentNode, document.createElement('div'), null, isSVG, optimized, rendererInternals, true
  /* hydrating */
  ); // there are two possible scenarios for server-rendered suspense:
  // - success: ssr content should be fully resolved
  // - failure: ssr content should be the fallback branch.
  // however, on the client we don't really know if it has failed or not
  // attempt to hydrate the DOM assuming it has succeeded, but we still
  // need to construct a suspense boundary first

  const result = hydrateNode(node, suspense.subTree, parentComponent, suspense, optimized);

  if (suspense.deps === 0) {
    suspense.resolve();
  }

  return result;
  /* eslint-enable no-restricted-globals */
}

function normalizeSuspenseChildren(vnode) {
  const {
    shapeFlag,
    children
  } = vnode;

  if (shapeFlag & 32
  /* SLOTS_CHILDREN */
  ) {
      const {
        default: d,
        fallback
      } = children;
      return {
        content: normalizeVNode((0, _shared.isFunction)(d) ? d() : d),
        fallback: normalizeVNode((0, _shared.isFunction)(fallback) ? fallback() : fallback)
      };
    } else {
    return {
      content: normalizeVNode(children),
      fallback: normalizeVNode(null)
    };
  }
}

function queueEffectWithSuspense(fn, suspense) {
  if (suspense && !suspense.isResolved) {
    if ((0, _shared.isArray)(fn)) {
      suspense.effects.push(...fn);
    } else {
      suspense.effects.push(fn);
    }
  } else {
    queuePostFlushCb(fn);
  }
}
/**
 * Wrap a slot function to memoize current rendering instance
 * @private
 */


function withCtx(fn, ctx = currentRenderingInstance) {
  if (!ctx) return fn;
  return function renderFnWithContext() {
    const owner = currentRenderingInstance;
    setCurrentRenderingInstance(ctx);
    const res = fn.apply(null, arguments);
    setCurrentRenderingInstance(owner);
    return res;
  };
} // SFC scoped style ID management.


let currentScopeId = null;
const scopeIdStack = [];
/**
 * @private
 */

function pushScopeId(id) {
  scopeIdStack.push(currentScopeId = id);
}
/**
 * @private
 */


function popScopeId() {
  scopeIdStack.pop();
  currentScopeId = scopeIdStack[scopeIdStack.length - 1] || null;
}
/**
 * @private
 */


function withScopeId(id) {
  return fn => withCtx(function () {
    pushScopeId(id);
    const res = fn.apply(this, arguments);
    popScopeId();
    return res;
  });
}

const isTeleport = type => type.__isTeleport;

const isTeleportDisabled = props => props && (props.disabled || props.disabled === '');

const resolveTarget = (props, select) => {
  const targetSelector = props && props.to;

  if ((0, _shared.isString)(targetSelector)) {
    if (!select) {
      "development" !== 'production' && warn(`Current renderer does not support string target for Teleports. ` + `(missing querySelector renderer option)`);
      return null;
    } else {
      const target = select(targetSelector);

      if (!target) {
        "development" !== 'production' && warn(`Failed to locate Teleport target with selector "${targetSelector}". ` + `Note the target element must exist before the component is mounted - ` + `i.e. the target cannot be rendered by the component itself, and ` + `ideally should be outside of the entire Vue component tree.`);
      }

      return target;
    }
  } else {
    if ("development" !== 'production' && !targetSelector) {
      warn(`Invalid Teleport target: ${targetSelector}`);
    }

    return targetSelector;
  }
};

const TeleportImpl = {
  __isTeleport: true,

  process(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, optimized, internals) {
    const {
      mc: mountChildren,
      pc: patchChildren,
      pbc: patchBlockChildren,
      o: {
        insert,
        querySelector,
        createText,
        createComment
      }
    } = internals;
    const disabled = isTeleportDisabled(n2.props);
    const {
      shapeFlag,
      children
    } = n2;

    if (n1 == null) {
      // insert anchors in the main view
      const placeholder = n2.el = "development" !== 'production' ? createComment('teleport start') : createText('');
      const mainAnchor = n2.anchor = "development" !== 'production' ? createComment('teleport end') : createText('');
      insert(placeholder, container, anchor);
      insert(mainAnchor, container, anchor);
      const target = n2.target = resolveTarget(n2.props, querySelector);
      const targetAnchor = n2.targetAnchor = createText('');

      if (target) {
        insert(targetAnchor, target);
      } else if ("development" !== 'production') {
        warn('Invalid Teleport target on mount:', target, `(${typeof target})`);
      }

      const mount = (container, anchor) => {
        // Teleport *always* has Array children. This is enforced in both the
        // compiler and vnode children normalization.
        if (shapeFlag & 16
        /* ARRAY_CHILDREN */
        ) {
            mountChildren(children, container, anchor, parentComponent, parentSuspense, isSVG, optimized);
          }
      };

      if (disabled) {
        mount(container, mainAnchor);
      } else if (target) {
        mount(target, targetAnchor);
      }
    } else {
      // update content
      n2.el = n1.el;
      const mainAnchor = n2.anchor = n1.anchor;
      const target = n2.target = n1.target;
      const targetAnchor = n2.targetAnchor = n1.targetAnchor;
      const wasDisabled = isTeleportDisabled(n1.props);
      const currentContainer = wasDisabled ? container : target;
      const currentAnchor = wasDisabled ? mainAnchor : targetAnchor;

      if (n2.dynamicChildren) {
        // fast path when the teleport happens to be a block root
        patchBlockChildren(n1.dynamicChildren, n2.dynamicChildren, currentContainer, parentComponent, parentSuspense, isSVG);

        if (n2.patchFlag > 0 && n2.shapeFlag & 16
        /* ARRAY_CHILDREN */
        ) {
            const oldChildren = n1.children;
            const children = n2.children;

            for (let i = 0; i < children.length; i++) {
              children[i].el = oldChildren[i].el;
            }
          }
      } else if (!optimized) {
        patchChildren(n1, n2, currentContainer, currentAnchor, parentComponent, parentSuspense, isSVG);
      }

      if (disabled) {
        if (!wasDisabled) {
          // enabled -> disabled
          // move into main container
          moveTeleport(n2, container, mainAnchor, internals, 1
          /* TOGGLE */
          );
        }
      } else {
        // target changed
        if ((n2.props && n2.props.to) !== (n1.props && n1.props.to)) {
          const nextTarget = n2.target = resolveTarget(n2.props, querySelector);

          if (nextTarget) {
            moveTeleport(n2, nextTarget, null, internals, 0
            /* TARGET_CHANGE */
            );
          } else if ("development" !== 'production') {
            warn('Invalid Teleport target on update:', target, `(${typeof target})`);
          }
        } else if (wasDisabled) {
          // disabled -> enabled
          // move into teleport target
          moveTeleport(n2, target, targetAnchor, internals, 1
          /* TOGGLE */
          );
        }
      }
    }
  },

  remove(vnode, {
    r: remove,
    o: {
      remove: hostRemove
    }
  }) {
    const {
      shapeFlag,
      children,
      anchor
    } = vnode;
    hostRemove(anchor);

    if (shapeFlag & 16
    /* ARRAY_CHILDREN */
    ) {
        for (let i = 0; i < children.length; i++) {
          remove(children[i]);
        }
      }
  },

  move: moveTeleport,
  hydrate: hydrateTeleport
};

function moveTeleport(vnode, container, parentAnchor, {
  o: {
    insert
  },
  m: move
}, moveType = 2
/* REORDER */
) {
  // move target anchor if this is a target change.
  if (moveType === 0
  /* TARGET_CHANGE */
  ) {
      insert(vnode.targetAnchor, container, parentAnchor);
    }

  const {
    el,
    anchor,
    shapeFlag,
    children,
    props
  } = vnode;
  const isReorder = moveType === 2
  /* REORDER */
  ; // move main view anchor if this is a re-order.

  if (isReorder) {
    insert(el, container, parentAnchor);
  } // if this is a re-order and teleport is enabled (content is in target)
  // do not move children. So the opposite is: only move children if this
  // is not a reorder, or the teleport is disabled


  if (!isReorder || isTeleportDisabled(props)) {
    // Teleport has either Array children or no children.
    if (shapeFlag & 16
    /* ARRAY_CHILDREN */
    ) {
        for (let i = 0; i < children.length; i++) {
          move(children[i], container, parentAnchor, 2
          /* REORDER */
          );
        }
      }
  } // move main view anchor if this is a re-order.


  if (isReorder) {
    insert(anchor, container, parentAnchor);
  }
}

function hydrateTeleport(node, vnode, parentComponent, parentSuspense, optimized, {
  o: {
    nextSibling,
    parentNode,
    querySelector
  }
}, hydrateChildren) {
  const target = vnode.target = resolveTarget(vnode.props, querySelector);

  if (target) {
    // if multiple teleports rendered to the same target element, we need to
    // pick up from where the last teleport finished instead of the first node
    const targetNode = target._lpa || target.firstChild;

    if (vnode.shapeFlag & 16
    /* ARRAY_CHILDREN */
    ) {
        if (isTeleportDisabled(vnode.props)) {
          vnode.anchor = hydrateChildren(nextSibling(node), vnode, parentNode(node), parentComponent, parentSuspense, optimized);
          vnode.targetAnchor = targetNode;
        } else {
          vnode.anchor = nextSibling(node);
          vnode.targetAnchor = hydrateChildren(targetNode, vnode, target, parentComponent, parentSuspense, optimized);
        }

        target._lpa = vnode.targetAnchor && nextSibling(vnode.targetAnchor);
      }
  }

  return vnode.anchor && nextSibling(vnode.anchor);
} // Force-casted public typing for h and TSX props inference


const Teleport = TeleportImpl;
exports.Teleport = Teleport;
const COMPONENTS = 'components';
const DIRECTIVES = 'directives';
/**
 * @private
 */

function resolveComponent(name) {
  return resolveAsset(COMPONENTS, name) || name;
}

const NULL_DYNAMIC_COMPONENT = Symbol();
/**
 * @private
 */

function resolveDynamicComponent(component) {
  if ((0, _shared.isString)(component)) {
    return resolveAsset(COMPONENTS, component, false) || component;
  } else {
    // invalid types will fallthrough to createVNode and raise warning
    return component || NULL_DYNAMIC_COMPONENT;
  }
}
/**
 * @private
 */


function resolveDirective(name) {
  return resolveAsset(DIRECTIVES, name);
} // implementation


function resolveAsset(type, name, warnMissing = true) {
  const instance = currentRenderingInstance || currentInstance;

  if (instance) {
    const Component = instance.type; // self name has highest priority

    if (type === COMPONENTS) {
      const selfName = Component.displayName || Component.name;

      if (selfName && (selfName === name || selfName === (0, _shared.camelize)(name) || selfName === (0, _shared.capitalize)((0, _shared.camelize)(name)))) {
        return Component;
      }
    }

    const res = // local registration
    resolve(Component[type], name) || // global registration
    resolve(instance.appContext[type], name);

    if ("development" !== 'production' && warnMissing && !res) {
      warn(`Failed to resolve ${type.slice(0, -1)}: ${name}`);
    }

    return res;
  } else if ("development" !== 'production') {
    warn(`resolve${(0, _shared.capitalize)(type.slice(0, -1))} ` + `can only be used in render() or setup().`);
  }
}

function resolve(registry, name) {
  return registry && (registry[name] || registry[(0, _shared.camelize)(name)] || registry[(0, _shared.capitalize)((0, _shared.camelize)(name))]);
}

const Fragment = Symbol("development" !== 'production' ? 'Fragment' : undefined);
exports.Fragment = Fragment;
const Text = Symbol("development" !== 'production' ? 'Text' : undefined);
exports.Text = Text;
const Comment = Symbol("development" !== 'production' ? 'Comment' : undefined);
exports.Comment = Comment;
const Static = Symbol("development" !== 'production' ? 'Static' : undefined); // Since v-if and v-for are the two possible ways node structure can dynamically
// change, once we consider v-if branches and each v-for fragment a block, we
// can divide a template into nested blocks, and within each block the node
// structure would be stable. This allows us to skip most children diffing
// and only worry about the dynamic nodes (indicated by patch flags).

exports.Static = Static;
const blockStack = [];
let currentBlock = null;
/**
 * Open a block.
 * This must be called before `createBlock`. It cannot be part of `createBlock`
 * because the children of the block are evaluated before `createBlock` itself
 * is called. The generated code typically looks like this:
 *
 * ```js
 * function render() {
 *   return (openBlock(),createBlock('div', null, [...]))
 * }
 * ```
 * disableTracking is true when creating a v-for fragment block, since a v-for
 * fragment always diffs its children.
 *
 * @private
 */

function openBlock(disableTracking = false) {
  blockStack.push(currentBlock = disableTracking ? null : []);
} // Whether we should be tracking dynamic child nodes inside a block.
// Only tracks when this value is > 0
// We are not using a simple boolean because this value may need to be
// incremented/decremented by nested usage of v-once (see below)


let shouldTrack = 1;
/**
 * Block tracking sometimes needs to be disabled, for example during the
 * creation of a tree that needs to be cached by v-once. The compiler generates
 * code like this:
 *
 * ``` js
 * _cache[1] || (
 *   setBlockTracking(-1),
 *   _cache[1] = createVNode(...),
 *   setBlockTracking(1),
 *   _cache[1]
 * )
 * ```
 *
 * @private
 */

function setBlockTracking(value) {
  shouldTrack += value;
}
/**
 * Create a block root vnode. Takes the same exact arguments as `createVNode`.
 * A block root keeps track of dynamic nodes within the block in the
 * `dynamicChildren` array.
 *
 * @private
 */


function createBlock(type, props, children, patchFlag, dynamicProps) {
  const vnode = createVNode(type, props, children, patchFlag, dynamicProps, true
  /* isBlock: prevent a block from tracking itself */
  ); // save current block children on the block vnode

  vnode.dynamicChildren = currentBlock || _shared.EMPTY_ARR; // close block

  blockStack.pop();
  currentBlock = blockStack[blockStack.length - 1] || null; // a block is always going to be patched, so track it as a child of its
  // parent block

  if (currentBlock) {
    currentBlock.push(vnode);
  }

  return vnode;
}

function isVNode(value) {
  return value ? value.__v_isVNode === true : false;
}

function isSameVNodeType(n1, n2) {
  if ("development" !== 'production' && n2.shapeFlag & 6
  /* COMPONENT */
  && hmrDirtyComponents.has(n2.type)) {
    // HMR only: if the component has been hot-updated, force a reload.
    return false;
  }

  return n1.type === n2.type && n1.key === n2.key;
}

let vnodeArgsTransformer;
/**
 * Internal API for registering an arguments transform for createVNode
 * used for creating stubs in the test-utils
 * It is *internal* but needs to be exposed for test-utils to pick up proper
 * typings
 */

function transformVNodeArgs(transformer) {
  vnodeArgsTransformer = transformer;
}

const createVNodeWithArgsTransform = (...args) => {
  return _createVNode(...(vnodeArgsTransformer ? vnodeArgsTransformer(args, currentRenderingInstance) : args));
};

const InternalObjectKey = `__vInternal`;

const normalizeKey = ({
  key
}) => key != null ? key : null;

const normalizeRef = ({
  ref
}) => {
  return ref != null ? (0, _shared.isArray)(ref) ? ref : [currentRenderingInstance, ref] : null;
};

const createVNode = "development" !== 'production' ? createVNodeWithArgsTransform : _createVNode;
exports.createVNode = createVNode;

function _createVNode(type, props = null, children = null, patchFlag = 0, dynamicProps = null, isBlockNode = false) {
  if (!type || type === NULL_DYNAMIC_COMPONENT) {
    if ("development" !== 'production' && !type) {
      warn(`Invalid vnode type when creating vnode: ${type}.`);
    }

    type = Comment;
  }

  if (isVNode(type)) {
    const cloned = cloneVNode(type, props);

    if (children) {
      normalizeChildren(cloned, children);
    }

    return cloned;
  } // class component normalization.


  if ((0, _shared.isFunction)(type) && '__vccOpts' in type) {
    type = type.__vccOpts;
  } // class & style normalization.


  if (props) {
    // for reactive or proxy objects, we need to clone it to enable mutation.
    if ((0, _reactivity.isProxy)(props) || InternalObjectKey in props) {
      props = (0, _shared.extend)({}, props);
    }

    let {
      class: klass,
      style
    } = props;

    if (klass && !(0, _shared.isString)(klass)) {
      props.class = (0, _shared.normalizeClass)(klass);
    }

    if ((0, _shared.isObject)(style)) {
      // reactive state objects need to be cloned since they are likely to be
      // mutated
      if ((0, _reactivity.isProxy)(style) && !(0, _shared.isArray)(style)) {
        style = (0, _shared.extend)({}, style);
      }

      props.style = (0, _shared.normalizeStyle)(style);
    }
  } // encode the vnode type information into a bitmap


  const shapeFlag = (0, _shared.isString)(type) ? 1
  /* ELEMENT */
  : isSuspense(type) ? 128
  /* SUSPENSE */
  : isTeleport(type) ? 64
  /* TELEPORT */
  : (0, _shared.isObject)(type) ? 4
  /* STATEFUL_COMPONENT */
  : (0, _shared.isFunction)(type) ? 2
  /* FUNCTIONAL_COMPONENT */
  : 0;

  if ("development" !== 'production' && shapeFlag & 4
  /* STATEFUL_COMPONENT */
  && (0, _reactivity.isProxy)(type)) {
    type = (0, _reactivity.toRaw)(type);
    warn(`Vue received a Component which was made a reactive object. This can ` + `lead to unnecessary performance overhead, and should be avoided by ` + `marking the component with \`markRaw\` or using \`shallowRef\` ` + `instead of \`ref\`.`, `\nComponent that was made reactive: `, type);
  }

  const vnode = {
    __v_isVNode: true,
    __v_skip: true,
    type,
    props,
    key: props && normalizeKey(props),
    ref: props && normalizeRef(props),
    scopeId: currentScopeId,
    children: null,
    component: null,
    suspense: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag,
    patchFlag,
    dynamicProps,
    dynamicChildren: null,
    appContext: null
  }; // validate key

  if ("development" !== 'production' && vnode.key !== vnode.key) {
    warn(`VNode created with invalid key (NaN). VNode type:`, vnode.type);
  }

  normalizeChildren(vnode, children); // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.

  if (shouldTrack > 0 && !isBlockNode && currentBlock && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  patchFlag !== 32
  /* HYDRATE_EVENTS */
  && (patchFlag > 0 || shapeFlag & 6
  /* COMPONENT */
  )) {
    currentBlock.push(vnode);
  }

  return vnode;
}

function cloneVNode(vnode, extraProps) {
  // This is intentionally NOT using spread or extend to avoid the runtime
  // key enumeration cost.
  const {
    props,
    patchFlag
  } = vnode;
  const mergedProps = extraProps ? props ? mergeProps(props, extraProps) : (0, _shared.extend)({}, extraProps) : props;
  return {
    __v_isVNode: true,
    __v_skip: true,
    type: vnode.type,
    props: mergedProps,
    key: mergedProps && normalizeKey(mergedProps),
    ref: extraProps && extraProps.ref ? normalizeRef(extraProps) : vnode.ref,
    scopeId: vnode.scopeId,
    children: vnode.children,
    target: vnode.target,
    targetAnchor: vnode.targetAnchor,
    staticCount: vnode.staticCount,
    shapeFlag: vnode.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: perserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: extraProps && vnode.type !== Fragment ? patchFlag === -1 // hoisted node
    ? 16
    /* FULL_PROPS */
    : patchFlag | 16
    /* FULL_PROPS */
    : patchFlag,
    dynamicProps: vnode.dynamicProps,
    dynamicChildren: vnode.dynamicChildren,
    appContext: vnode.appContext,
    dirs: vnode.dirs,
    transition: vnode.transition,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: vnode.component,
    suspense: vnode.suspense,
    el: vnode.el,
    anchor: vnode.anchor
  };
}
/**
 * @private
 */


function createTextVNode(text = ' ', flag = 0) {
  return createVNode(Text, null, text, flag);
}
/**
 * @private
 */


function createStaticVNode(content, numberOfNodes) {
  // A static vnode can contain multiple stringified elements, and the number
  // of elements is necessary for hydration.
  const vnode = createVNode(Static, null, content);
  vnode.staticCount = numberOfNodes;
  return vnode;
}
/**
 * @private
 */


function createCommentVNode(text = '', // when used as the v-else branch, the comment node must be created as a
// block to ensure correct updates.
asBlock = false) {
  return asBlock ? (openBlock(), createBlock(Comment, null, text)) : createVNode(Comment, null, text);
}

function normalizeVNode(child) {
  if (child == null || typeof child === 'boolean') {
    // empty placeholder
    return createVNode(Comment);
  } else if ((0, _shared.isArray)(child)) {
    // fragment
    return createVNode(Fragment, null, child);
  } else if (typeof child === 'object') {
    // already vnode, this should be the most common since compiled templates
    // always produce all-vnode children arrays
    return child.el === null ? child : cloneVNode(child);
  } else {
    // strings and numbers
    return createVNode(Text, null, String(child));
  }
} // optimized normalization for template-compiled render fns


function cloneIfMounted(child) {
  return child.el === null ? child : cloneVNode(child);
}

function normalizeChildren(vnode, children) {
  let type = 0;
  const {
    shapeFlag
  } = vnode;

  if (children == null) {
    children = null;
  } else if ((0, _shared.isArray)(children)) {
    type = 16
    /* ARRAY_CHILDREN */
    ;
  } else if (typeof children === 'object') {
    // Normalize slot to plain children
    if ((shapeFlag & 1
    /* ELEMENT */
    || shapeFlag & 64
    /* TELEPORT */
    ) && children.default) {
      normalizeChildren(vnode, children.default());
      return;
    } else {
      type = 32
      /* SLOTS_CHILDREN */
      ;
      const slotFlag = children._;

      if (!slotFlag && !(InternalObjectKey in children)) {
        children._ctx = currentRenderingInstance;
      } else if (slotFlag === 3
      /* FORWARDED */
      && currentRenderingInstance) {
        // a child component receives forwarded slots from the parent.
        // its slot type is determined by its parent's slot type.
        if (currentRenderingInstance.vnode.patchFlag & 1024
        /* DYNAMIC_SLOTS */
        ) {
            children._ = 2
            /* DYNAMIC */
            ;
            vnode.patchFlag |= 1024
            /* DYNAMIC_SLOTS */
            ;
          } else {
          children._ = 1
          /* STABLE */
          ;
        }
      }
    }
  } else if ((0, _shared.isFunction)(children)) {
    children = {
      default: children,
      _ctx: currentRenderingInstance
    };
    type = 32
    /* SLOTS_CHILDREN */
    ;
  } else {
    children = String(children); // force teleport children to array so it can be moved around

    if (shapeFlag & 64
    /* TELEPORT */
    ) {
        type = 16
        /* ARRAY_CHILDREN */
        ;
        children = [createTextVNode(children)];
      } else {
      type = 8
      /* TEXT_CHILDREN */
      ;
    }
  }

  vnode.children = children;
  vnode.shapeFlag |= type;
}

function mergeProps(...args) {
  const ret = (0, _shared.extend)({}, args[0]);

  for (let i = 1; i < args.length; i++) {
    const toMerge = args[i];

    for (const key in toMerge) {
      if (key === 'class') {
        if (ret.class !== toMerge.class) {
          ret.class = (0, _shared.normalizeClass)([ret.class, toMerge.class]);
        }
      } else if (key === 'style') {
        ret.style = (0, _shared.normalizeStyle)([ret.style, toMerge.style]);
      } else if ((0, _shared.isOn)(key)) {
        const existing = ret[key];
        const incoming = toMerge[key];

        if (existing !== incoming) {
          ret[key] = existing ? [].concat(existing, toMerge[key]) : incoming;
        }
      } else {
        ret[key] = toMerge[key];
      }
    }
  }

  return ret;
}

function emit(instance, event, ...args) {
  const props = instance.vnode.props || _shared.EMPTY_OBJ;

  if ("development" !== 'production') {
    const options = normalizeEmitsOptions(instance.type);

    if (options) {
      if (!(event in options)) {
        const propsOptions = normalizePropsOptions(instance.type)[0];

        if (!propsOptions || !(`on` + (0, _shared.capitalize)(event) in propsOptions)) {
          warn(`Component emitted event "${event}" but it is neither declared in ` + `the emits option nor as an "on${(0, _shared.capitalize)(event)}" prop.`);
        }
      } else {
        const validator = options[event];

        if ((0, _shared.isFunction)(validator)) {
          const isValid = validator(...args);

          if (!isValid) {
            warn(`Invalid event arguments: event validation failed for event "${event}".`);
          }
        }
      }
    }
  }

  let handlerName = `on${(0, _shared.capitalize)(event)}`;
  let handler = props[handlerName]; // for v-model update:xxx events, also trigger kebab-case equivalent
  // for props passed via kebab-case

  if (!handler && event.startsWith('update:')) {
    handlerName = `on${(0, _shared.capitalize)((0, _shared.hyphenate)(event))}`;
    handler = props[handlerName];
  }

  if (!handler) {
    handler = props[handlerName + `Once`];

    if (!instance.emitted) {
      (instance.emitted = {})[handlerName] = true;
    } else if (instance.emitted[handlerName]) {
      return;
    }
  }

  if (handler) {
    callWithAsyncErrorHandling(handler, instance, 6
    /* COMPONENT_EVENT_HANDLER */
    , args);
  }
}

function normalizeEmitsOptions(comp) {
  if ((0, _shared.hasOwn)(comp, '__emits')) {
    return comp.__emits;
  }

  const raw = comp.emits;
  let normalized = {}; // apply mixin/extends props

  let hasExtends = false;

  if (__VUE_OPTIONS_API__ && !(0, _shared.isFunction)(comp)) {
    if (comp.extends) {
      hasExtends = true;
      (0, _shared.extend)(normalized, normalizeEmitsOptions(comp.extends));
    }

    if (comp.mixins) {
      hasExtends = true;
      comp.mixins.forEach(m => (0, _shared.extend)(normalized, normalizeEmitsOptions(m)));
    }
  }

  if (!raw && !hasExtends) {
    return comp.__emits = undefined;
  }

  if ((0, _shared.isArray)(raw)) {
    raw.forEach(key => normalized[key] = null);
  } else {
    (0, _shared.extend)(normalized, raw);
  }

  return comp.__emits = normalized;
} // Check if an incoming prop key is a declared emit event listener.
// e.g. With `emits: { click: null }`, props named `onClick` and `onclick` are
// both considered matched listeners.


function isEmitListener(comp, key) {
  let emits;

  if (!(0, _shared.isOn)(key) || !(emits = normalizeEmitsOptions(comp))) {
    return false;
  }

  key = key.replace(/Once$/, '');
  return (0, _shared.hasOwn)(emits, key[2].toLowerCase() + key.slice(3)) || (0, _shared.hasOwn)(emits, key.slice(2));
}

function initProps(instance, rawProps, isStateful, // result of bitwise flag comparison
isSSR = false) {
  const props = {};
  const attrs = {};
  (0, _shared.def)(attrs, InternalObjectKey, 1);
  setFullProps(instance, rawProps, props, attrs); // validation

  if ("development" !== 'production') {
    validateProps(props, instance.type);
  }

  if (isStateful) {
    // stateful
    instance.props = isSSR ? props : (0, _reactivity.shallowReactive)(props);
  } else {
    if (!instance.type.props) {
      // functional w/ optional props, props === attrs
      instance.props = attrs;
    } else {
      // functional w/ declared props
      instance.props = props;
    }
  }

  instance.attrs = attrs;
}

function updateProps(instance, rawProps, rawPrevProps, optimized) {
  const {
    props,
    attrs,
    vnode: {
      patchFlag
    }
  } = instance;
  const rawCurrentProps = (0, _reactivity.toRaw)(props);
  const [options] = normalizePropsOptions(instance.type);

  if ((optimized || patchFlag > 0) && !(patchFlag & 16
  /* FULL_PROPS */
  )) {
    if (patchFlag & 8
    /* PROPS */
    ) {
        // Compiler-generated props & no keys change, just set the updated
        // the props.
        const propsToUpdate = instance.vnode.dynamicProps;

        for (let i = 0; i < propsToUpdate.length; i++) {
          const key = propsToUpdate[i]; // PROPS flag guarantees rawProps to be non-null

          const value = rawProps[key];

          if (options) {
            // attr / props separation was done on init and will be consistent
            // in this code path, so just check if attrs have it.
            if ((0, _shared.hasOwn)(attrs, key)) {
              attrs[key] = value;
            } else {
              const camelizedKey = (0, _shared.camelize)(key);
              props[camelizedKey] = resolvePropValue(options, rawCurrentProps, camelizedKey, value);
            }
          } else {
            attrs[key] = value;
          }
        }
      }
  } else {
    // full props update.
    setFullProps(instance, rawProps, props, attrs); // in case of dynamic props, check if we need to delete keys from
    // the props object

    let kebabKey;

    for (const key in rawCurrentProps) {
      if (!rawProps || // for camelCase
      !(0, _shared.hasOwn)(rawProps, key) && ( // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      (kebabKey = (0, _shared.hyphenate)(key)) === key || !(0, _shared.hasOwn)(rawProps, kebabKey))) {
        if (options) {
          if (rawPrevProps && ( // for camelCase
          rawPrevProps[key] !== undefined || // for kebab-case
          rawPrevProps[kebabKey] !== undefined)) {
            props[key] = resolvePropValue(options, rawProps || _shared.EMPTY_OBJ, key, undefined);
          }
        } else {
          delete props[key];
        }
      }
    } // in the case of functional component w/o props declaration, props and
    // attrs point to the same object so it should already have been updated.


    if (attrs !== rawCurrentProps) {
      for (const key in attrs) {
        if (!rawProps || !(0, _shared.hasOwn)(rawProps, key)) {
          delete attrs[key];
        }
      }
    }
  } // trigger updates for $attrs in case it's used in component slots


  (0, _reactivity.trigger)(instance, "set"
  /* SET */
  , '$attrs');

  if ("development" !== 'production' && rawProps) {
    validateProps(props, instance.type);
  }
}

function setFullProps(instance, rawProps, props, attrs) {
  const [options, needCastKeys] = normalizePropsOptions(instance.type);

  if (rawProps) {
    for (const key in rawProps) {
      const value = rawProps[key]; // key, ref are reserved and never passed down

      if ((0, _shared.isReservedProp)(key)) {
        continue;
      } // prop option names are camelized during normalization, so to support
      // kebab -> camel conversion here we need to camelize the key.


      let camelKey;

      if (options && (0, _shared.hasOwn)(options, camelKey = (0, _shared.camelize)(key))) {
        props[camelKey] = value;
      } else if (!isEmitListener(instance.type, key)) {
        // Any non-declared (either as a prop or an emitted event) props are put
        // into a separate `attrs` object for spreading. Make sure to preserve
        // original key casing
        attrs[key] = value;
      }
    }
  }

  if (needCastKeys) {
    const rawCurrentProps = (0, _reactivity.toRaw)(props);

    for (let i = 0; i < needCastKeys.length; i++) {
      const key = needCastKeys[i];
      props[key] = resolvePropValue(options, rawCurrentProps, key, rawCurrentProps[key]);
    }
  }
}

function resolvePropValue(options, props, key, value) {
  const opt = options[key];

  if (opt != null) {
    const hasDefault = (0, _shared.hasOwn)(opt, 'default'); // default values

    if (hasDefault && value === undefined) {
      const defaultValue = opt.default;
      value = opt.type !== Function && (0, _shared.isFunction)(defaultValue) ? defaultValue() : defaultValue;
    } // boolean casting


    if (opt[0
    /* shouldCast */
    ]) {
      if (!(0, _shared.hasOwn)(props, key) && !hasDefault) {
        value = false;
      } else if (opt[1
      /* shouldCastTrue */
      ] && (value === '' || value === (0, _shared.hyphenate)(key))) {
        value = true;
      }
    }
  }

  return value;
}

function normalizePropsOptions(comp) {
  if (comp.__props) {
    return comp.__props;
  }

  const raw = comp.props;
  const normalized = {};
  const needCastKeys = []; // apply mixin/extends props

  let hasExtends = false;

  if (__VUE_OPTIONS_API__ && !(0, _shared.isFunction)(comp)) {
    const extendProps = raw => {
      const [props, keys] = normalizePropsOptions(raw);
      (0, _shared.extend)(normalized, props);
      if (keys) needCastKeys.push(...keys);
    };

    if (comp.extends) {
      hasExtends = true;
      extendProps(comp.extends);
    }

    if (comp.mixins) {
      hasExtends = true;
      comp.mixins.forEach(extendProps);
    }
  }

  if (!raw && !hasExtends) {
    return comp.__props = _shared.EMPTY_ARR;
  }

  if ((0, _shared.isArray)(raw)) {
    for (let i = 0; i < raw.length; i++) {
      if ("development" !== 'production' && !(0, _shared.isString)(raw[i])) {
        warn(`props must be strings when using array syntax.`, raw[i]);
      }

      const normalizedKey = (0, _shared.camelize)(raw[i]);

      if (validatePropName(normalizedKey)) {
        normalized[normalizedKey] = _shared.EMPTY_OBJ;
      }
    }
  } else if (raw) {
    if ("development" !== 'production' && !(0, _shared.isObject)(raw)) {
      warn(`invalid props options`, raw);
    }

    for (const key in raw) {
      const normalizedKey = (0, _shared.camelize)(key);

      if (validatePropName(normalizedKey)) {
        const opt = raw[key];
        const prop = normalized[normalizedKey] = (0, _shared.isArray)(opt) || (0, _shared.isFunction)(opt) ? {
          type: opt
        } : opt;

        if (prop) {
          const booleanIndex = getTypeIndex(Boolean, prop.type);
          const stringIndex = getTypeIndex(String, prop.type);
          prop[0
          /* shouldCast */
          ] = booleanIndex > -1;
          prop[1
          /* shouldCastTrue */
          ] = stringIndex < 0 || booleanIndex < stringIndex; // if the prop needs boolean casting or default value

          if (booleanIndex > -1 || (0, _shared.hasOwn)(prop, 'default')) {
            needCastKeys.push(normalizedKey);
          }
        }
      }
    }
  }

  const normalizedEntry = [normalized, needCastKeys];
  comp.__props = normalizedEntry;
  return normalizedEntry;
} // use function string name to check type constructors
// so that it works across vms / iframes.


function getType(ctor) {
  const match = ctor && ctor.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : '';
}

function isSameType(a, b) {
  return getType(a) === getType(b);
}

function getTypeIndex(type, expectedTypes) {
  if ((0, _shared.isArray)(expectedTypes)) {
    for (let i = 0, len = expectedTypes.length; i < len; i++) {
      if (isSameType(expectedTypes[i], type)) {
        return i;
      }
    }
  } else if ((0, _shared.isFunction)(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1;
  }

  return -1;
}
/**
 * dev only
 */


function validateProps(props, comp) {
  const rawValues = (0, _reactivity.toRaw)(props);
  const options = normalizePropsOptions(comp)[0];

  for (const key in options) {
    let opt = options[key];
    if (opt == null) continue;
    validateProp(key, rawValues[key], opt, !(0, _shared.hasOwn)(rawValues, key));
  }
}
/**
 * dev only
 */


function validatePropName(key) {
  if (key[0] !== '$') {
    return true;
  } else if ("development" !== 'production') {
    warn(`Invalid prop name: "${key}" is a reserved property.`);
  }

  return false;
}
/**
 * dev only
 */


function validateProp(name, value, prop, isAbsent) {
  const {
    type,
    required,
    validator
  } = prop; // required!

  if (required && isAbsent) {
    warn('Missing required prop: "' + name + '"');
    return;
  } // missing but optional


  if (value == null && !prop.required) {
    return;
  } // type check


  if (type != null && type !== true) {
    let isValid = false;
    const types = (0, _shared.isArray)(type) ? type : [type];
    const expectedTypes = []; // value is valid as long as one of the specified types match

    for (let i = 0; i < types.length && !isValid; i++) {
      const {
        valid,
        expectedType
      } = assertType(value, types[i]);
      expectedTypes.push(expectedType || '');
      isValid = valid;
    }

    if (!isValid) {
      warn(getInvalidTypeMessage(name, value, expectedTypes));
      return;
    }
  } // custom validator


  if (validator && !validator(value)) {
    warn('Invalid prop: custom validator check failed for prop "' + name + '".');
  }
}

const isSimpleType = /*#__PURE__*/(0, _shared.makeMap)('String,Number,Boolean,Function,Symbol');
/**
 * dev only
 */

function assertType(value, type) {
  let valid;
  const expectedType = getType(type);

  if (isSimpleType(expectedType)) {
    const t = typeof value;
    valid = t === expectedType.toLowerCase(); // for primitive wrapper objects

    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = (0, _shared.toRawType)(value) === 'Object';
  } else if (expectedType === 'Array') {
    valid = (0, _shared.isArray)(value);
  } else {
    valid = value instanceof type;
  }

  return {
    valid,
    expectedType
  };
}
/**
 * dev only
 */


function getInvalidTypeMessage(name, value, expectedTypes) {
  let message = `Invalid prop: type check failed for prop "${name}".` + ` Expected ${expectedTypes.map(_shared.capitalize).join(', ')}`;
  const expectedType = expectedTypes[0];
  const receivedType = (0, _shared.toRawType)(value);
  const expectedValue = styleValue(value, expectedType);
  const receivedValue = styleValue(value, receivedType); // check if we need to specify expected value

  if (expectedTypes.length === 1 && isExplicable(expectedType) && !isBoolean(expectedType, receivedType)) {
    message += ` with value ${expectedValue}`;
  }

  message += `, got ${receivedType} `; // check if we need to specify received value

  if (isExplicable(receivedType)) {
    message += `with value ${receivedValue}.`;
  }

  return message;
}
/**
 * dev only
 */


function styleValue(value, type) {
  if (type === 'String') {
    return `"${value}"`;
  } else if (type === 'Number') {
    return `${Number(value)}`;
  } else {
    return `${value}`;
  }
}
/**
 * dev only
 */


function isExplicable(type) {
  const explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(elem => type.toLowerCase() === elem);
}
/**
 * dev only
 */


function isBoolean(...args) {
  return args.some(elem => elem.toLowerCase() === 'boolean');
}

function injectHook(type, hook, target = currentInstance, prepend = false) {
  if (target) {
    const hooks = target[type] || (target[type] = []); // cache the error handling wrapper for injected hooks so the same hook
    // can be properly deduped by the scheduler. "__weh" stands for "with error
    // handling".

    const wrappedHook = hook.__weh || (hook.__weh = (...args) => {
      if (target.isUnmounted) {
        return;
      } // disable tracking inside all lifecycle hooks
      // since they can potentially be called inside effects.


      (0, _reactivity.pauseTracking)(); // Set currentInstance during hook invocation.
      // This assumes the hook does not synchronously trigger other hooks, which
      // can only be false when the user does something really funky.

      setCurrentInstance(target);
      const res = callWithAsyncErrorHandling(hook, target, type, args);
      setCurrentInstance(null);
      (0, _reactivity.resetTracking)();
      return res;
    });

    if (prepend) {
      hooks.unshift(wrappedHook);
    } else {
      hooks.push(wrappedHook);
    }
  } else if ("development" !== 'production') {
    const apiName = `on${(0, _shared.capitalize)(ErrorTypeStrings[type].replace(/ hook$/, ''))}`;
    warn(`${apiName} is called when there is no active component instance to be ` + `associated with. ` + `Lifecycle injection APIs can only be used during execution of setup().` + (` If you are using async setup(), make sure to register lifecycle ` + `hooks before the first await statement.`));
  }
}

const createHook = lifecycle => (hook, target = currentInstance) => // post-create lifecycle registrations are noops during SSR
!isInSSRComponentSetup && injectHook(lifecycle, hook, target);

const onBeforeMount = createHook("bm"
/* BEFORE_MOUNT */
);
exports.onBeforeMount = onBeforeMount;
const onMounted = createHook("m"
/* MOUNTED */
);
exports.onMounted = onMounted;
const onBeforeUpdate = createHook("bu"
/* BEFORE_UPDATE */
);
exports.onBeforeUpdate = onBeforeUpdate;
const onUpdated = createHook("u"
/* UPDATED */
);
exports.onUpdated = onUpdated;
const onBeforeUnmount = createHook("bum"
/* BEFORE_UNMOUNT */
);
exports.onBeforeUnmount = onBeforeUnmount;
const onUnmounted = createHook("um"
/* UNMOUNTED */
);
exports.onUnmounted = onUnmounted;
const onRenderTriggered = createHook("rtg"
/* RENDER_TRIGGERED */
);
exports.onRenderTriggered = onRenderTriggered;
const onRenderTracked = createHook("rtc"
/* RENDER_TRACKED */
);
exports.onRenderTracked = onRenderTracked;

const onErrorCaptured = (hook, target = currentInstance) => {
  injectHook("ec"
  /* ERROR_CAPTURED */
  , hook, target);
};

exports.onErrorCaptured = onErrorCaptured;

function useTransitionState() {
  const state = {
    isMounted: false,
    isLeaving: false,
    isUnmounting: false,
    leavingVNodes: new Map()
  };
  onMounted(() => {
    state.isMounted = true;
  });
  onBeforeUnmount(() => {
    state.isUnmounting = true;
  });
  return state;
}

const BaseTransitionImpl = {
  name: `BaseTransition`,
  props: {
    mode: String,
    appear: Boolean,
    persisted: Boolean,
    // enter
    onBeforeEnter: Function,
    onEnter: Function,
    onAfterEnter: Function,
    onEnterCancelled: Function,
    // leave
    onBeforeLeave: Function,
    onLeave: Function,
    onAfterLeave: Function,
    onLeaveCancelled: Function,
    // appear
    onBeforeAppear: Function,
    onAppear: Function,
    onAfterAppear: Function,
    onAppearCancelled: Function
  },

  setup(props, {
    slots
  }) {
    const instance = getCurrentInstance();
    const state = useTransitionState();
    let prevTransitionKey;
    return () => {
      const children = slots.default && getTransitionRawChildren(slots.default(), true);

      if (!children || !children.length) {
        return;
      } // warn multiple elements


      if ("development" !== 'production' && children.length > 1) {
        warn('<transition> can only be used on a single element or component. Use ' + '<transition-group> for lists.');
      } // there's no need to track reactivity for these props so use the raw
      // props for a bit better perf


      const rawProps = (0, _reactivity.toRaw)(props);
      const {
        mode
      } = rawProps; // check mode

      if ("development" !== 'production' && mode && !['in-out', 'out-in', 'default'].includes(mode)) {
        warn(`invalid <transition> mode: ${mode}`);
      } // at this point children has a guaranteed length of 1.


      const child = children[0];

      if (state.isLeaving) {
        return emptyPlaceholder(child);
      } // in the case of <transition><keep-alive/></transition>, we need to
      // compare the type of the kept-alive children.


      const innerChild = getKeepAliveChild(child);

      if (!innerChild) {
        return emptyPlaceholder(child);
      }

      const enterHooks = innerChild.transition = resolveTransitionHooks(innerChild, rawProps, state, instance);
      const oldChild = instance.subTree;
      const oldInnerChild = oldChild && getKeepAliveChild(oldChild);
      let transitionKeyChanged = false;
      const {
        getTransitionKey
      } = innerChild.type;

      if (getTransitionKey) {
        const key = getTransitionKey();

        if (prevTransitionKey === undefined) {
          prevTransitionKey = key;
        } else if (key !== prevTransitionKey) {
          prevTransitionKey = key;
          transitionKeyChanged = true;
        }
      } // handle mode


      if (oldInnerChild && oldInnerChild.type !== Comment && (!isSameVNodeType(innerChild, oldInnerChild) || transitionKeyChanged)) {
        const leavingHooks = resolveTransitionHooks(oldInnerChild, rawProps, state, instance); // update old tree's hooks in case of dynamic transition

        setTransitionHooks(oldInnerChild, leavingHooks); // switching between different views

        if (mode === 'out-in') {
          state.isLeaving = true; // return placeholder node and queue update when leave finishes

          leavingHooks.afterLeave = () => {
            state.isLeaving = false;
            instance.update();
          };

          return emptyPlaceholder(child);
        } else if (mode === 'in-out') {
          leavingHooks.delayLeave = (el, earlyRemove, delayedLeave) => {
            const leavingVNodesCache = getLeavingNodesForType(state, oldInnerChild);
            leavingVNodesCache[String(oldInnerChild.key)] = oldInnerChild; // early removal callback

            el._leaveCb = () => {
              earlyRemove();
              el._leaveCb = undefined;
              delete enterHooks.delayedLeave;
            };

            enterHooks.delayedLeave = delayedLeave;
          };
        }
      }

      return child;
    };
  }

}; // export the public type for h/tsx inference
// also to avoid inline import() in generated d.ts files

const BaseTransition = BaseTransitionImpl;
exports.BaseTransition = BaseTransition;

function getLeavingNodesForType(state, vnode) {
  const {
    leavingVNodes
  } = state;
  let leavingVNodesCache = leavingVNodes.get(vnode.type);

  if (!leavingVNodesCache) {
    leavingVNodesCache = Object.create(null);
    leavingVNodes.set(vnode.type, leavingVNodesCache);
  }

  return leavingVNodesCache;
} // The transition hooks are attached to the vnode as vnode.transition
// and will be called at appropriate timing in the renderer.


function resolveTransitionHooks(vnode, {
  appear,
  persisted = false,
  onBeforeEnter,
  onEnter,
  onAfterEnter,
  onEnterCancelled,
  onBeforeLeave,
  onLeave,
  onAfterLeave,
  onLeaveCancelled,
  onBeforeAppear,
  onAppear,
  onAfterAppear,
  onAppearCancelled
}, state, instance) {
  const key = String(vnode.key);
  const leavingVNodesCache = getLeavingNodesForType(state, vnode);

  const callHook = (hook, args) => {
    hook && callWithAsyncErrorHandling(hook, instance, 9
    /* TRANSITION_HOOK */
    , args);
  };

  const hooks = {
    persisted,

    beforeEnter(el) {
      let hook = onBeforeEnter;

      if (!state.isMounted) {
        if (appear) {
          hook = onBeforeAppear || onBeforeEnter;
        } else {
          return;
        }
      } // for same element (v-show)


      if (el._leaveCb) {
        el._leaveCb(true
        /* cancelled */
        );
      } // for toggled element with same key (v-if)


      const leavingVNode = leavingVNodesCache[key];

      if (leavingVNode && isSameVNodeType(vnode, leavingVNode) && leavingVNode.el._leaveCb) {
        // force early removal (not cancelled)
        leavingVNode.el._leaveCb();
      }

      callHook(hook, [el]);
    },

    enter(el) {
      let hook = onEnter;
      let afterHook = onAfterEnter;
      let cancelHook = onEnterCancelled;

      if (!state.isMounted) {
        if (appear) {
          hook = onAppear || onEnter;
          afterHook = onAfterAppear || onAfterEnter;
          cancelHook = onAppearCancelled || onEnterCancelled;
        } else {
          return;
        }
      }

      let called = false;

      const done = el._enterCb = cancelled => {
        if (called) return;
        called = true;

        if (cancelled) {
          callHook(cancelHook, [el]);
        } else {
          callHook(afterHook, [el]);
        }

        if (hooks.delayedLeave) {
          hooks.delayedLeave();
        }

        el._enterCb = undefined;
      };

      if (hook) {
        hook(el, done);

        if (hook.length <= 1) {
          done();
        }
      } else {
        done();
      }
    },

    leave(el, remove) {
      const key = String(vnode.key);

      if (el._enterCb) {
        el._enterCb(true
        /* cancelled */
        );
      }

      if (state.isUnmounting) {
        return remove();
      }

      callHook(onBeforeLeave, [el]);
      let called = false;

      const done = el._leaveCb = cancelled => {
        if (called) return;
        called = true;
        remove();

        if (cancelled) {
          callHook(onLeaveCancelled, [el]);
        } else {
          callHook(onAfterLeave, [el]);
        }

        el._leaveCb = undefined;

        if (leavingVNodesCache[key] === vnode) {
          delete leavingVNodesCache[key];
        }
      };

      leavingVNodesCache[key] = vnode;

      if (onLeave) {
        onLeave(el, done);

        if (onLeave.length <= 1) {
          done();
        }
      } else {
        done();
      }
    }

  };
  return hooks;
} // the placeholder really only handles one special case: KeepAlive
// in the case of a KeepAlive in a leave phase we need to return a KeepAlive
// placeholder with empty content to avoid the KeepAlive instance from being
// unmounted.


function emptyPlaceholder(vnode) {
  if (isKeepAlive(vnode)) {
    vnode = cloneVNode(vnode);
    vnode.children = null;
    return vnode;
  }
}

function getKeepAliveChild(vnode) {
  return isKeepAlive(vnode) ? vnode.children ? vnode.children[0] : undefined : vnode;
}

function setTransitionHooks(vnode, hooks) {
  if (vnode.shapeFlag & 6
  /* COMPONENT */
  && vnode.component) {
    setTransitionHooks(vnode.component.subTree, hooks);
  } else {
    vnode.transition = hooks;
  }
}

function getTransitionRawChildren(children, keepComment = false) {
  let ret = [];
  let keyedFragmentCount = 0;

  for (let i = 0; i < children.length; i++) {
    const child = children[i]; // handle fragment children case, e.g. v-for

    if (child.type === Fragment) {
      if (child.patchFlag & 128
      /* KEYED_FRAGMENT */
      ) keyedFragmentCount++;
      ret = ret.concat(getTransitionRawChildren(child.children, keepComment));
    } // comment placeholders should be skipped, e.g. v-if
    else if (keepComment || child.type !== Comment) {
        ret.push(child);
      }
  } // #1126 if a transition children list contains multiple sub fragments, these
  // fragments will be merged into a flat children array. Since each v-for
  // fragment may contain different static bindings inside, we need to de-top
  // these children to force full diffs to ensure correct behavior.


  if (keyedFragmentCount > 1) {
    for (let i = 0; i < ret.length; i++) {
      ret[i].patchFlag = -2
      /* BAIL */
      ;
    }
  }

  return ret;
}

const isKeepAlive = vnode => vnode.type.__isKeepAlive;

const KeepAliveImpl = {
  name: `KeepAlive`,
  // Marker for special handling inside the renderer. We are not using a ===
  // check directly on KeepAlive in the renderer, because importing it directly
  // would prevent it from being tree-shaken.
  __isKeepAlive: true,
  inheritRef: true,
  props: {
    include: [String, RegExp, Array],
    exclude: [String, RegExp, Array],
    max: [String, Number]
  },

  setup(props, {
    slots
  }) {
    const cache = new Map();
    const keys = new Set();
    let current = null;
    const instance = getCurrentInstance();
    const parentSuspense = instance.suspense; // KeepAlive communicates with the instantiated renderer via the
    // ctx where the renderer passes in its internals,
    // and the KeepAlive instance exposes activate/deactivate implementations.
    // The whole point of this is to avoid importing KeepAlive directly in the
    // renderer to facilitate tree-shaking.

    const sharedContext = instance.ctx;
    const {
      renderer: {
        p: patch,
        m: move,
        um: _unmount,
        o: {
          createElement
        }
      }
    } = sharedContext;
    const storageContainer = createElement('div');

    sharedContext.activate = (vnode, container, anchor, isSVG, optimized) => {
      const instance = vnode.component;
      move(vnode, container, anchor, 0
      /* ENTER */
      , parentSuspense); // in case props have changed

      patch(instance.vnode, vnode, container, anchor, instance, parentSuspense, isSVG, optimized);
      queuePostRenderEffect(() => {
        instance.isDeactivated = false;

        if (instance.a) {
          (0, _shared.invokeArrayFns)(instance.a);
        }

        const vnodeHook = vnode.props && vnode.props.onVnodeMounted;

        if (vnodeHook) {
          invokeVNodeHook(vnodeHook, instance.parent, vnode);
        }
      }, parentSuspense);
    };

    sharedContext.deactivate = vnode => {
      const instance = vnode.component;
      move(vnode, storageContainer, null, 1
      /* LEAVE */
      , parentSuspense);
      queuePostRenderEffect(() => {
        if (instance.da) {
          (0, _shared.invokeArrayFns)(instance.da);
        }

        const vnodeHook = vnode.props && vnode.props.onVnodeUnmounted;

        if (vnodeHook) {
          invokeVNodeHook(vnodeHook, instance.parent, vnode);
        }

        instance.isDeactivated = true;
      }, parentSuspense);
    };

    function unmount(vnode) {
      // reset the shapeFlag so it can be properly unmounted
      resetShapeFlag(vnode);

      _unmount(vnode, instance, parentSuspense);
    }

    function pruneCache(filter) {
      cache.forEach((vnode, key) => {
        const name = getName(vnode.type);

        if (name && (!filter || !filter(name))) {
          pruneCacheEntry(key);
        }
      });
    }

    function pruneCacheEntry(key) {
      const cached = cache.get(key);

      if (!current || cached.type !== current.type) {
        unmount(cached);
      } else if (current) {
        // current active instance should no longer be kept-alive.
        // we can't unmount it now but it might be later, so reset its flag now.
        resetShapeFlag(current);
      }

      cache.delete(key);
      keys.delete(key);
    }

    watch(() => [props.include, props.exclude], ([include, exclude]) => {
      include && pruneCache(name => matches(include, name));
      exclude && pruneCache(name => matches(exclude, name));
    }); // cache sub tree in beforeMount/Update (i.e. right after the render)

    let pendingCacheKey = null;

    const cacheSubtree = () => {
      // fix #1621, the pendingCacheKey could be 0
      if (pendingCacheKey != null) {
        cache.set(pendingCacheKey, instance.subTree);
      }
    };

    onBeforeMount(cacheSubtree);
    onBeforeUpdate(cacheSubtree);
    onBeforeUnmount(() => {
      cache.forEach(cached => {
        const {
          subTree,
          suspense
        } = instance;

        if (cached.type === subTree.type) {
          // current instance will be unmounted as part of keep-alive's unmount
          resetShapeFlag(subTree); // but invoke its deactivated hook here

          const da = subTree.component.da;
          da && queuePostRenderEffect(da, suspense);
          return;
        }

        unmount(cached);
      });
    });
    return () => {
      pendingCacheKey = null;

      if (!slots.default) {
        return null;
      }

      const children = slots.default();
      let vnode = children[0];

      if (children.length > 1) {
        if ("development" !== 'production') {
          warn(`KeepAlive should contain exactly one component child.`);
        }

        current = null;
        return children;
      } else if (!isVNode(vnode) || !(vnode.shapeFlag & 4
      /* STATEFUL_COMPONENT */
      )) {
        current = null;
        return vnode;
      }

      const comp = vnode.type;
      const name = getName(comp);
      const {
        include,
        exclude,
        max
      } = props;

      if (include && (!name || !matches(include, name)) || exclude && name && matches(exclude, name)) {
        return current = vnode;
      }

      const key = vnode.key == null ? comp : vnode.key;
      const cachedVNode = cache.get(key); // clone vnode if it's reused because we are going to mutate it

      if (vnode.el) {
        vnode = cloneVNode(vnode);
      } // #1513 it's possible for the returned vnode to be cloned due to attr
      // fallthrough or scopeId, so the vnode here may not be the final vnode
      // that is mounted. Instead of caching it directly, we store the pending
      // key and cache `instance.subTree` (the normalized vnode) in
      // beforeMount/beforeUpdate hooks.


      pendingCacheKey = key;

      if (cachedVNode) {
        // copy over mounted state
        vnode.el = cachedVNode.el;
        vnode.component = cachedVNode.component;

        if (vnode.transition) {
          // recursively update transition hooks on subTree
          setTransitionHooks(vnode, vnode.transition);
        } // avoid vnode being mounted as fresh


        vnode.shapeFlag |= 512
        /* COMPONENT_KEPT_ALIVE */
        ; // make this key the freshest

        keys.delete(key);
        keys.add(key);
      } else {
        keys.add(key); // prune oldest entry

        if (max && keys.size > parseInt(max, 10)) {
          pruneCacheEntry(keys.values().next().value);
        }
      } // avoid vnode being unmounted


      vnode.shapeFlag |= 256
      /* COMPONENT_SHOULD_KEEP_ALIVE */
      ;
      current = vnode;
      return vnode;
    };
  }

}; // export the public type for h/tsx inference
// also to avoid inline import() in generated d.ts files

const KeepAlive = KeepAliveImpl;
exports.KeepAlive = KeepAlive;

function getName(comp) {
  return comp.displayName || comp.name;
}

function matches(pattern, name) {
  if ((0, _shared.isArray)(pattern)) {
    return pattern.some(p => matches(p, name));
  } else if ((0, _shared.isString)(pattern)) {
    return pattern.split(',').indexOf(name) > -1;
  } else if (pattern.test) {
    return pattern.test(name);
  }
  /* istanbul ignore next */


  return false;
}

function onActivated(hook, target) {
  registerKeepAliveHook(hook, "a"
  /* ACTIVATED */
  , target);
}

function onDeactivated(hook, target) {
  registerKeepAliveHook(hook, "da"
  /* DEACTIVATED */
  , target);
}

function registerKeepAliveHook(hook, type, target = currentInstance) {
  // cache the deactivate branch check wrapper for injected hooks so the same
  // hook can be properly deduped by the scheduler. "__wdc" stands for "with
  // deactivation check".
  const wrappedHook = hook.__wdc || (hook.__wdc = () => {
    // only fire the hook if the target instance is NOT in a deactivated branch.
    let current = target;

    while (current) {
      if (current.isDeactivated) {
        return;
      }

      current = current.parent;
    }

    hook();
  });

  injectHook(type, wrappedHook, target); // In addition to registering it on the target instance, we walk up the parent
  // chain and register it on all ancestor instances that are keep-alive roots.
  // This avoids the need to walk the entire component tree when invoking these
  // hooks, and more importantly, avoids the need to track child components in
  // arrays.

  if (target) {
    let current = target.parent;

    while (current && current.parent) {
      if (isKeepAlive(current.parent.vnode)) {
        injectToKeepAliveRoot(wrappedHook, type, target, current);
      }

      current = current.parent;
    }
  }
}

function injectToKeepAliveRoot(hook, type, target, keepAliveRoot) {
  injectHook(type, hook, keepAliveRoot, true
  /* prepend */
  );
  onUnmounted(() => {
    (0, _shared.remove)(keepAliveRoot[type], hook);
  }, target);
}

function resetShapeFlag(vnode) {
  let shapeFlag = vnode.shapeFlag;

  if (shapeFlag & 256
  /* COMPONENT_SHOULD_KEEP_ALIVE */
  ) {
      shapeFlag -= 256
      /* COMPONENT_SHOULD_KEEP_ALIVE */
      ;
    }

  if (shapeFlag & 512
  /* COMPONENT_KEPT_ALIVE */
  ) {
      shapeFlag -= 512
      /* COMPONENT_KEPT_ALIVE */
      ;
    }

  vnode.shapeFlag = shapeFlag;
}

const isInternalKey = key => key[0] === '_' || key === '$stable';

const normalizeSlotValue = value => (0, _shared.isArray)(value) ? value.map(normalizeVNode) : [normalizeVNode(value)];

const normalizeSlot = (key, rawSlot, ctx) => withCtx(props => {
  if ("development" !== 'production' && currentInstance) {
    warn(`Slot "${key}" invoked outside of the render function: ` + `this will not track dependencies used in the slot. ` + `Invoke the slot function inside the render function instead.`);
  }

  return normalizeSlotValue(rawSlot(props));
}, ctx);

const normalizeObjectSlots = (rawSlots, slots) => {
  const ctx = rawSlots._ctx;

  for (const key in rawSlots) {
    if (isInternalKey(key)) continue;
    const value = rawSlots[key];

    if ((0, _shared.isFunction)(value)) {
      slots[key] = normalizeSlot(key, value, ctx);
    } else if (value != null) {
      if ("development" !== 'production') {
        warn(`Non-function value encountered for slot "${key}". ` + `Prefer function slots for better performance.`);
      }

      const normalized = normalizeSlotValue(value);

      slots[key] = () => normalized;
    }
  }
};

const normalizeVNodeSlots = (instance, children) => {
  if ("development" !== 'production' && !isKeepAlive(instance.vnode)) {
    warn(`Non-function value encountered for default slot. ` + `Prefer function slots for better performance.`);
  }

  const normalized = normalizeSlotValue(children);

  instance.slots.default = () => normalized;
};

const initSlots = (instance, children) => {
  if (instance.vnode.shapeFlag & 32
  /* SLOTS_CHILDREN */
  ) {
      const type = children._;

      if (type) {
        instance.slots = children; // make compiler marker non-enumerable

        (0, _shared.def)(children, '_', type);
      } else {
        normalizeObjectSlots(children, instance.slots = {});
      }
    } else {
    instance.slots = {};

    if (children) {
      normalizeVNodeSlots(instance, children);
    }
  }

  (0, _shared.def)(instance.slots, InternalObjectKey, 1);
};

const updateSlots = (instance, children) => {
  const {
    vnode,
    slots
  } = instance;
  let needDeletionCheck = true;
  let deletionComparisonTarget = _shared.EMPTY_OBJ;

  if (vnode.shapeFlag & 32
  /* SLOTS_CHILDREN */
  ) {
      const type = children._;

      if (type) {
        // compiled slots.
        if ("development" !== 'production' && isHmrUpdating) {
          // Parent was HMR updated so slot content may have changed.
          // force update slots and mark instance for hmr as well
          (0, _shared.extend)(slots, children);
        } else if (type === 1
        /* STABLE */
        ) {
            // compiled AND stable.
            // no need to update, and skip stale slots removal.
            needDeletionCheck = false;
          } else {
          // compiled but dynamic (v-if/v-for on slots) - update slots, but skip
          // normalization.
          (0, _shared.extend)(slots, children);
        }
      } else {
        needDeletionCheck = !children.$stable;
        normalizeObjectSlots(children, slots);
      }

      deletionComparisonTarget = children;
    } else if (children) {
    // non slot object children (direct value) passed to a component
    normalizeVNodeSlots(instance, children);
    deletionComparisonTarget = {
      default: 1
    };
  } // delete stale slots


  if (needDeletionCheck) {
    for (const key in slots) {
      if (!isInternalKey(key) && !(key in deletionComparisonTarget)) {
        delete slots[key];
      }
    }
  }
};
/**
Runtime helper for applying directives to a vnode. Example usage:

const comp = resolveComponent('comp')
const foo = resolveDirective('foo')
const bar = resolveDirective('bar')

return withDirectives(h(comp), [
  [foo, this.x],
  [bar, this.y]
])
*/


const isBuiltInDirective = /*#__PURE__*/(0, _shared.makeMap)('bind,cloak,else-if,else,for,html,if,model,on,once,pre,show,slot,text');

function validateDirectiveName(name) {
  if (isBuiltInDirective(name)) {
    warn('Do not use built-in directive ids as custom directive id: ' + name);
  }
}
/**
 * Adds directives to a VNode.
 */


function withDirectives(vnode, directives) {
  const internalInstance = currentRenderingInstance;

  if (internalInstance === null) {
    "development" !== 'production' && warn(`withDirectives can only be used inside render functions.`);
    return vnode;
  }

  const instance = internalInstance.proxy;
  const bindings = vnode.dirs || (vnode.dirs = []);

  for (let i = 0; i < directives.length; i++) {
    let [dir, value, arg, modifiers = _shared.EMPTY_OBJ] = directives[i];

    if ((0, _shared.isFunction)(dir)) {
      dir = {
        mounted: dir,
        updated: dir
      };
    }

    bindings.push({
      dir,
      instance,
      value,
      oldValue: void 0,
      arg,
      modifiers
    });
  }

  return vnode;
}

function invokeDirectiveHook(vnode, prevVNode, instance, name) {
  const bindings = vnode.dirs;
  const oldBindings = prevVNode && prevVNode.dirs;

  for (let i = 0; i < bindings.length; i++) {
    const binding = bindings[i];

    if (oldBindings) {
      binding.oldValue = oldBindings[i].value;
    }

    const hook = binding.dir[name];

    if (hook) {
      callWithAsyncErrorHandling(hook, instance, 8
      /* DIRECTIVE_HOOK */
      , [vnode.el, binding, vnode, prevVNode]);
    }
  }
}

let devtools;
exports.devtools = devtools;

function setDevtoolsHook(hook) {
  exports.devtools = devtools = hook;
}

function devtoolsInitApp(app, version) {
  // TODO queue if devtools is undefined
  if (!devtools) return;
  devtools.emit("app:init"
  /* APP_INIT */
  , app, version, {
    Fragment,
    Text,
    Comment,
    Static
  });
}

function devtoolsUnmountApp(app) {
  if (!devtools) return;
  devtools.emit("app:unmount"
  /* APP_UNMOUNT */
  , app);
}

const devtoolsComponentAdded = /*#__PURE__*/createDevtoolsHook("component:added"
/* COMPONENT_ADDED */
);
const devtoolsComponentUpdated = /*#__PURE__*/createDevtoolsHook("component:updated"
/* COMPONENT_UPDATED */
);
const devtoolsComponentRemoved = /*#__PURE__*/createDevtoolsHook("component:removed"
/* COMPONENT_REMOVED */
);

function createDevtoolsHook(hook) {
  return component => {
    if (!devtools) return;
    devtools.emit(hook, component.appContext.app, component.uid, component.parent ? component.parent.uid : undefined);
  };
}

function createAppContext() {
  return {
    app: null,
    config: {
      isNativeTag: _shared.NO,
      performance: false,
      globalProperties: {},
      optionMergeStrategies: {},
      isCustomElement: _shared.NO,
      errorHandler: undefined,
      warnHandler: undefined
    },
    mixins: [],
    components: {},
    directives: {},
    provides: Object.create(null)
  };
}

function createAppAPI(render, hydrate) {
  return function createApp(rootComponent, rootProps = null) {
    if (rootProps != null && !(0, _shared.isObject)(rootProps)) {
      "development" !== 'production' && warn(`root props passed to app.mount() must be an object.`);
      rootProps = null;
    }

    const context = createAppContext();
    const installedPlugins = new Set();
    let isMounted = false;
    const app = context.app = {
      _component: rootComponent,
      _props: rootProps,
      _container: null,
      _context: context,
      version,

      get config() {
        return context.config;
      },

      set config(v) {
        if ("development" !== 'production') {
          warn(`app.config cannot be replaced. Modify individual options instead.`);
        }
      },

      use(plugin, ...options) {
        if (installedPlugins.has(plugin)) {
          "development" !== 'production' && warn(`Plugin has already been applied to target app.`);
        } else if (plugin && (0, _shared.isFunction)(plugin.install)) {
          installedPlugins.add(plugin);
          plugin.install(app, ...options);
        } else if ((0, _shared.isFunction)(plugin)) {
          installedPlugins.add(plugin);
          plugin(app, ...options);
        } else if ("development" !== 'production') {
          warn(`A plugin must either be a function or an object with an "install" ` + `function.`);
        }

        return app;
      },

      mixin(mixin) {
        if (__VUE_OPTIONS_API__) {
          if (!context.mixins.includes(mixin)) {
            context.mixins.push(mixin);
          } else if ("development" !== 'production') {
            warn('Mixin has already been applied to target app' + (mixin.name ? `: ${mixin.name}` : ''));
          }
        } else if ("development" !== 'production') {
          warn('Mixins are only available in builds supporting Options API');
        }

        return app;
      },

      component(name, component) {
        if ("development" !== 'production') {
          validateComponentName(name, context.config);
        }

        if (!component) {
          return context.components[name];
        }

        if ("development" !== 'production' && context.components[name]) {
          warn(`Component "${name}" has already been registered in target app.`);
        }

        context.components[name] = component;
        return app;
      },

      directive(name, directive) {
        if ("development" !== 'production') {
          validateDirectiveName(name);
        }

        if (!directive) {
          return context.directives[name];
        }

        if ("development" !== 'production' && context.directives[name]) {
          warn(`Directive "${name}" has already been registered in target app.`);
        }

        context.directives[name] = directive;
        return app;
      },

      mount(rootContainer, isHydrate) {
        if (!isMounted) {
          const vnode = createVNode(rootComponent, rootProps); // store app context on the root VNode.
          // this will be set on the root instance on initial mount.

          vnode.appContext = context; // HMR root reload

          if ("development" !== 'production') {
            context.reload = () => {
              render(cloneVNode(vnode), rootContainer);
            };
          }

          if (isHydrate && hydrate) {
            hydrate(vnode, rootContainer);
          } else {
            render(vnode, rootContainer);
          }

          isMounted = true;
          app._container = rootContainer;
          rootContainer.__vue_app__ = app;

          if ("development" !== 'production' || __VUE_PROD_DEVTOOLS__) {
            devtoolsInitApp(app, version);
          }

          return vnode.component.proxy;
        } else if ("development" !== 'production') {
          warn(`App has already been mounted.\n` + `If you want to remount the same app, move your app creation logic ` + `into a factory function and create fresh app instances for each ` + `mount - e.g. \`const createMyApp = () => createApp(App)\``);
        }
      },

      unmount() {
        if (isMounted) {
          render(null, app._container);
          devtoolsUnmountApp(app);
        } else if ("development" !== 'production') {
          warn(`Cannot unmount an app that is not mounted.`);
        }
      },

      provide(key, value) {
        if ("development" !== 'production' && key in context.provides) {
          warn(`App already provides property with key "${String(key)}". ` + `It will be overwritten with the new value.`);
        } // TypeScript doesn't allow symbols as index type
        // https://github.com/Microsoft/TypeScript/issues/24587


        context.provides[key] = value;
        return app;
      }

    };
    return app;
  };
}

let hasMismatch = false;

const isSVGContainer = container => /svg/.test(container.namespaceURI) && container.tagName !== 'foreignObject';

const isComment = node => node.nodeType === 8
/* COMMENT */
; // Note: hydration is DOM-specific
// But we have to place it in core due to tight coupling with core - splitting
// it out creates a ton of unnecessary complexity.
// Hydration also depends on some renderer internal logic which needs to be
// passed in via arguments.


function createHydrationFunctions(rendererInternals) {
  const {
    mt: mountComponent,
    p: patch,
    o: {
      patchProp,
      nextSibling,
      parentNode,
      remove,
      insert,
      createComment
    }
  } = rendererInternals;

  const hydrate = (vnode, container) => {
    if ("development" !== 'production' && !container.hasChildNodes()) {
      warn(`Attempting to hydrate existing markup but container is empty. ` + `Performing full mount instead.`);
      patch(null, vnode, container);
      return;
    }

    hasMismatch = false;
    hydrateNode(container.firstChild, vnode, null, null);
    flushPostFlushCbs();

    if (hasMismatch && !false) {
      // this error should show up in production
      console.error(`Hydration completed but contains mismatches.`);
    }
  };

  const hydrateNode = (node, vnode, parentComponent, parentSuspense, optimized = false) => {
    const isFragmentStart = isComment(node) && node.data === '[';

    const onMismatch = () => handleMismatch(node, vnode, parentComponent, parentSuspense, isFragmentStart);

    const {
      type,
      ref,
      shapeFlag
    } = vnode;
    const domType = node.nodeType;
    vnode.el = node;
    let nextNode = null;

    switch (type) {
      case Text:
        if (domType !== 3
        /* TEXT */
        ) {
            nextNode = onMismatch();
          } else {
          if (node.data !== vnode.children) {
            hasMismatch = true;
            "development" !== 'production' && warn(`Hydration text mismatch:` + `\n- Client: ${JSON.stringify(node.data)}` + `\n- Server: ${JSON.stringify(vnode.children)}`);
            node.data = vnode.children;
          }

          nextNode = nextSibling(node);
        }

        break;

      case Comment:
        if (domType !== 8
        /* COMMENT */
        || isFragmentStart) {
          nextNode = onMismatch();
        } else {
          nextNode = nextSibling(node);
        }

        break;

      case Static:
        if (domType !== 1
        /* ELEMENT */
        ) {
            nextNode = onMismatch();
          } else {
          // determine anchor, adopt content
          nextNode = node; // if the static vnode has its content stripped during build,
          // adopt it from the server-rendered HTML.

          const needToAdoptContent = !vnode.children.length;

          for (let i = 0; i < vnode.staticCount; i++) {
            if (needToAdoptContent) vnode.children += nextNode.outerHTML;

            if (i === vnode.staticCount - 1) {
              vnode.anchor = nextNode;
            }

            nextNode = nextSibling(nextNode);
          }

          return nextNode;
        }

        break;

      case Fragment:
        if (!isFragmentStart) {
          nextNode = onMismatch();
        } else {
          nextNode = hydrateFragment(node, vnode, parentComponent, parentSuspense, optimized);
        }

        break;

      default:
        if (shapeFlag & 1
        /* ELEMENT */
        ) {
            if (domType !== 1
            /* ELEMENT */
            || vnode.type !== node.tagName.toLowerCase()) {
              nextNode = onMismatch();
            } else {
              nextNode = hydrateElement(node, vnode, parentComponent, parentSuspense, optimized);
            }
          } else if (shapeFlag & 6
        /* COMPONENT */
        ) {
            // when setting up the render effect, if the initial vnode already
            // has .el set, the component will perform hydration instead of mount
            // on its sub-tree.
            const container = parentNode(node);

            const hydrateComponent = () => {
              mountComponent(vnode, container, null, parentComponent, parentSuspense, isSVGContainer(container), optimized);
            }; // async component


            const loadAsync = vnode.type.__asyncLoader;

            if (loadAsync) {
              loadAsync().then(hydrateComponent);
            } else {
              hydrateComponent();
            } // component may be async, so in the case of fragments we cannot rely
            // on component's rendered output to determine the end of the fragment
            // instead, we do a lookahead to find the end anchor node.


            nextNode = isFragmentStart ? locateClosingAsyncAnchor(node) : nextSibling(node);
          } else if (shapeFlag & 64
        /* TELEPORT */
        ) {
            if (domType !== 8
            /* COMMENT */
            ) {
                nextNode = onMismatch();
              } else {
              nextNode = vnode.type.hydrate(node, vnode, parentComponent, parentSuspense, optimized, rendererInternals, hydrateChildren);
            }
          } else if (shapeFlag & 128
        /* SUSPENSE */
        ) {
            nextNode = vnode.type.hydrate(node, vnode, parentComponent, parentSuspense, isSVGContainer(parentNode(node)), optimized, rendererInternals, hydrateNode);
          } else if ("development" !== 'production') {
          warn('Invalid HostVNode type:', type, `(${typeof type})`);
        }

    }

    if (ref != null && parentComponent) {
      setRef(ref, null, parentComponent, parentSuspense, vnode);
    }

    return nextNode;
  };

  const hydrateElement = (el, vnode, parentComponent, parentSuspense, optimized) => {
    optimized = optimized || !!vnode.dynamicChildren;
    const {
      props,
      patchFlag,
      shapeFlag,
      dirs
    } = vnode; // skip props & children if this is hoisted static nodes

    if (patchFlag !== -1
    /* HOISTED */
    ) {
        // props
        if (props) {
          if (!optimized || patchFlag & 16
          /* FULL_PROPS */
          || patchFlag & 32
          /* HYDRATE_EVENTS */
          ) {
            for (const key in props) {
              if (!(0, _shared.isReservedProp)(key) && (0, _shared.isOn)(key)) {
                patchProp(el, key, null, props[key]);
              }
            }
          } else if (props.onClick) {
            // Fast path for click listeners (which is most often) to avoid
            // iterating through props.
            patchProp(el, 'onClick', null, props.onClick);
          }
        } // vnode / directive hooks


        let vnodeHooks;

        if (vnodeHooks = props && props.onVnodeBeforeMount) {
          invokeVNodeHook(vnodeHooks, parentComponent, vnode);
        }

        if (dirs) {
          invokeDirectiveHook(vnode, null, parentComponent, 'beforeMount');
        }

        if ((vnodeHooks = props && props.onVnodeMounted) || dirs) {
          queueEffectWithSuspense(() => {
            vnodeHooks && invokeVNodeHook(vnodeHooks, parentComponent, vnode);
            dirs && invokeDirectiveHook(vnode, null, parentComponent, 'mounted');
          }, parentSuspense);
        } // children


        if (shapeFlag & 16
        /* ARRAY_CHILDREN */
        && // skip if element has innerHTML / textContent
        !(props && (props.innerHTML || props.textContent))) {
          let next = hydrateChildren(el.firstChild, vnode, el, parentComponent, parentSuspense, optimized);
          let hasWarned = false;

          while (next) {
            hasMismatch = true;

            if ("development" !== 'production' && !hasWarned) {
              warn(`Hydration children mismatch in <${vnode.type}>: ` + `server rendered element contains more child nodes than client vdom.`);
              hasWarned = true;
            } // The SSRed DOM contains more nodes than it should. Remove them.


            const cur = next;
            next = next.nextSibling;
            remove(cur);
          }
        } else if (shapeFlag & 8
        /* TEXT_CHILDREN */
        ) {
            if (el.textContent !== vnode.children) {
              hasMismatch = true;
              "development" !== 'production' && warn(`Hydration text content mismatch in <${vnode.type}>:\n` + `- Client: ${el.textContent}\n` + `- Server: ${vnode.children}`);
              el.textContent = vnode.children;
            }
          }
      }

    return el.nextSibling;
  };

  const hydrateChildren = (node, vnode, container, parentComponent, parentSuspense, optimized) => {
    optimized = optimized || !!vnode.dynamicChildren;
    const children = vnode.children;
    const l = children.length;
    let hasWarned = false;

    for (let i = 0; i < l; i++) {
      const vnode = optimized ? children[i] : children[i] = normalizeVNode(children[i]);

      if (node) {
        node = hydrateNode(node, vnode, parentComponent, parentSuspense, optimized);
      } else {
        hasMismatch = true;

        if ("development" !== 'production' && !hasWarned) {
          warn(`Hydration children mismatch in <${container.tagName.toLowerCase()}>: ` + `server rendered element contains fewer child nodes than client vdom.`);
          hasWarned = true;
        } // the SSRed DOM didn't contain enough nodes. Mount the missing ones.


        patch(null, vnode, container, null, parentComponent, parentSuspense, isSVGContainer(container));
      }
    }

    return node;
  };

  const hydrateFragment = (node, vnode, parentComponent, parentSuspense, optimized) => {
    const container = parentNode(node);
    const next = hydrateChildren(nextSibling(node), vnode, container, parentComponent, parentSuspense, optimized);

    if (next && isComment(next) && next.data === ']') {
      return nextSibling(vnode.anchor = next);
    } else {
      // fragment didn't hydrate successfully, since we didn't get a end anchor
      // back. This should have led to node/children mismatch warnings.
      hasMismatch = true; // since the anchor is missing, we need to create one and insert it

      insert(vnode.anchor = createComment(`]`), container, next);
      return next;
    }
  };

  const handleMismatch = (node, vnode, parentComponent, parentSuspense, isFragment) => {
    hasMismatch = true;
    "development" !== 'production' && warn(`Hydration node mismatch:\n- Client vnode:`, vnode.type, `\n- Server rendered DOM:`, node, node.nodeType === 3
    /* TEXT */
    ? `(text)` : isComment(node) && node.data === '[' ? `(start of fragment)` : ``);
    vnode.el = null;

    if (isFragment) {
      // remove excessive fragment nodes
      const end = locateClosingAsyncAnchor(node);

      while (true) {
        const next = nextSibling(node);

        if (next && next !== end) {
          remove(next);
        } else {
          break;
        }
      }
    }

    const next = nextSibling(node);
    const container = parentNode(node);
    remove(node);
    patch(null, vnode, container, next, parentComponent, parentSuspense, isSVGContainer(container));
    return next;
  };

  const locateClosingAsyncAnchor = node => {
    let match = 0;

    while (node) {
      node = nextSibling(node);

      if (node && isComment(node)) {
        if (node.data === '[') match++;

        if (node.data === ']') {
          if (match === 0) {
            return nextSibling(node);
          } else {
            match--;
          }
        }
      }
    }

    return node;
  };

  return [hydrate, hydrateNode];
}

let supported;
let perf;

function startMeasure(instance, type) {
  if (instance.appContext.config.performance && isSupported()) {
    perf.mark(`vue-${type}-${instance.uid}`);
  }
}

function endMeasure(instance, type) {
  if (instance.appContext.config.performance && isSupported()) {
    const startTag = `vue-${type}-${instance.uid}`;
    const endTag = startTag + `:end`;
    perf.mark(endTag);
    perf.measure(`<${formatComponentName(instance, instance.type)}> ${type}`, startTag, endTag);
    perf.clearMarks(startTag);
    perf.clearMarks(endTag);
  }
}

function isSupported() {
  if (supported !== undefined) {
    return supported;
  }
  /* eslint-disable no-restricted-globals */


  if (typeof window !== 'undefined' && window.performance) {
    supported = true;
    perf = window.performance;
  } else {
    supported = false;
  }
  /* eslint-enable no-restricted-globals */


  return supported;
}
/**
 * This is only called in esm-bundler builds.
 * It is called when a renderer is created, in `baseCreateRenderer` so that
 * importing runtime-core is side-effects free.
 *
 * istanbul-ignore-next
 */


function initFeatureFlags() {
  let needWarn = false;

  if (typeof __VUE_OPTIONS_API__ !== 'boolean') {
    needWarn = true;
    (0, _shared.getGlobalThis)().__VUE_OPTIONS_API__ = true;
  }

  if (typeof __VUE_PROD_DEVTOOLS__ !== 'boolean') {
    needWarn = true;
    (0, _shared.getGlobalThis)().__VUE_PROD_DEVTOOLS__ = false;
  }

  if ("development" !== 'production' && needWarn) {
    console.warn(`You are running the esm-bundler build of Vue. It is recommended to ` + `configure your bundler to explicitly replace feature flag globals ` + `with boolean literals to get proper tree-shaking in the final bundle. ` + `See http://link.vuejs.org/feature-flags for more details.`);
  }
}

const prodEffectOptions = {
  scheduler: queueJob
};

function createDevEffectOptions(instance) {
  return {
    scheduler: queueJob,
    onTrack: instance.rtc ? e => (0, _shared.invokeArrayFns)(instance.rtc, e) : void 0,
    onTrigger: instance.rtg ? e => (0, _shared.invokeArrayFns)(instance.rtg, e) : void 0
  };
}

const queuePostRenderEffect = queueEffectWithSuspense;

const setRef = (rawRef, oldRawRef, parentComponent, parentSuspense, vnode) => {
  let value;

  if (!vnode) {
    value = null;
  } else {
    if (vnode.shapeFlag & 4
    /* STATEFUL_COMPONENT */
    ) {
        value = vnode.component.proxy;
      } else {
      value = vnode.el;
    }
  }

  const [owner, ref] = rawRef;

  if ("development" !== 'production' && !owner) {
    warn(`Missing ref owner context. ref cannot be used on hoisted vnodes. ` + `A vnode with ref must be created inside the render function.`);
    return;
  }

  const oldRef = oldRawRef && oldRawRef[1];
  const refs = owner.refs === _shared.EMPTY_OBJ ? owner.refs = {} : owner.refs;
  const setupState = owner.setupState; // unset old ref

  if (oldRef != null && oldRef !== ref) {
    if ((0, _shared.isString)(oldRef)) {
      refs[oldRef] = null;

      if ((0, _shared.hasOwn)(setupState, oldRef)) {
        queuePostRenderEffect(() => {
          setupState[oldRef] = null;
        }, parentSuspense);
      }
    } else if ((0, _reactivity.isRef)(oldRef)) {
      oldRef.value = null;
    }
  }

  if ((0, _shared.isString)(ref)) {
    refs[ref] = value;

    if ((0, _shared.hasOwn)(setupState, ref)) {
      queuePostRenderEffect(() => {
        setupState[ref] = value;
      }, parentSuspense);
    }
  } else if ((0, _reactivity.isRef)(ref)) {
    ref.value = value;
  } else if ((0, _shared.isFunction)(ref)) {
    callWithErrorHandling(ref, parentComponent, 12
    /* FUNCTION_REF */
    , [value, refs]);
  } else if ("development" !== 'production') {
    warn('Invalid template ref type:', value, `(${typeof value})`);
  }
};
/**
 * The createRenderer function accepts two generic arguments:
 * HostNode and HostElement, corresponding to Node and Element types in the
 * host environment. For example, for runtime-dom, HostNode would be the DOM
 * `Node` interface and HostElement would be the DOM `Element` interface.
 *
 * Custom renderers can pass in the platform specific types like this:
 *
 * ``` js
 * const { render, createApp } = createRenderer<Node, Element>({
 *   patchProp,
 *   ...nodeOps
 * })
 * ```
 */


function createRenderer(options) {
  return baseCreateRenderer(options);
} // Separate API for creating hydration-enabled renderer.
// Hydration logic is only used when calling this function, making it
// tree-shakable.


function createHydrationRenderer(options) {
  return baseCreateRenderer(options, createHydrationFunctions);
} // implementation


function baseCreateRenderer(options, createHydrationFns) {
  // compile-time feature flags check
  {
    initFeatureFlags();
  }
  const {
    insert: hostInsert,
    remove: hostRemove,
    patchProp: hostPatchProp,
    forcePatchProp: hostForcePatchProp,
    createElement: hostCreateElement,
    createText: hostCreateText,
    createComment: hostCreateComment,
    setText: hostSetText,
    setElementText: hostSetElementText,
    parentNode: hostParentNode,
    nextSibling: hostNextSibling,
    setScopeId: hostSetScopeId = _shared.NOOP,
    cloneNode: hostCloneNode,
    insertStaticContent: hostInsertStaticContent
  } = options; // Note: functions inside this closure should use `const xxx = () => {}`
  // style in order to prevent being inlined by minifiers.

  const patch = (n1, n2, container, anchor = null, parentComponent = null, parentSuspense = null, isSVG = false, optimized = false) => {
    // patching & not same type, unmount old tree
    if (n1 && !isSameVNodeType(n1, n2)) {
      anchor = getNextHostNode(n1);
      unmount(n1, parentComponent, parentSuspense, true);
      n1 = null;
    }

    if (n2.patchFlag === -2
    /* BAIL */
    ) {
        optimized = false;
        n2.dynamicChildren = null;
      }

    const {
      type,
      ref,
      shapeFlag
    } = n2;

    switch (type) {
      case Text:
        processText(n1, n2, container, anchor);
        break;

      case Comment:
        processCommentNode(n1, n2, container, anchor);
        break;

      case Static:
        if (n1 == null) {
          mountStaticNode(n2, container, anchor, isSVG);
        } else if ("development" !== 'production') {
          patchStaticNode(n1, n2, container, isSVG);
        }

        break;

      case Fragment:
        processFragment(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, optimized);
        break;

      default:
        if (shapeFlag & 1
        /* ELEMENT */
        ) {
            processElement(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, optimized);
          } else if (shapeFlag & 6
        /* COMPONENT */
        ) {
            processComponent(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, optimized);
          } else if (shapeFlag & 64
        /* TELEPORT */
        ) {
            type.process(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, optimized, internals);
          } else if (shapeFlag & 128
        /* SUSPENSE */
        ) {
            type.process(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, optimized, internals);
          } else if ("development" !== 'production') {
          warn('Invalid VNode type:', type, `(${typeof type})`);
        }

    } // set ref


    if (ref != null && parentComponent) {
      setRef(ref, n1 && n1.ref, parentComponent, parentSuspense, n2);
    }
  };

  const processText = (n1, n2, container, anchor) => {
    if (n1 == null) {
      hostInsert(n2.el = hostCreateText(n2.children), container, anchor);
    } else {
      const el = n2.el = n1.el;

      if (n2.children !== n1.children) {
        hostSetText(el, n2.children);
      }
    }
  };

  const processCommentNode = (n1, n2, container, anchor) => {
    if (n1 == null) {
      hostInsert(n2.el = hostCreateComment(n2.children || ''), container, anchor);
    } else {
      // there's no support for dynamic comments
      n2.el = n1.el;
    }
  };

  const mountStaticNode = (n2, container, anchor, isSVG) => {
    [n2.el, n2.anchor] = hostInsertStaticContent(n2.children, container, anchor, isSVG);
  };
  /**
   * Dev / HMR only
   */


  const patchStaticNode = (n1, n2, container, isSVG) => {
    // static nodes are only patched during dev for HMR
    if (n2.children !== n1.children) {
      const anchor = hostNextSibling(n1.anchor); // remove existing

      removeStaticNode(n1);
      [n2.el, n2.anchor] = hostInsertStaticContent(n2.children, container, anchor, isSVG);
    } else {
      n2.el = n1.el;
      n2.anchor = n1.anchor;
    }
  };
  /**
   * Dev / HMR only
   */


  const moveStaticNode = (vnode, container, anchor) => {
    let cur = vnode.el;
    const end = vnode.anchor;

    while (cur && cur !== end) {
      const next = hostNextSibling(cur);
      hostInsert(cur, container, anchor);
      cur = next;
    }

    hostInsert(end, container, anchor);
  };
  /**
   * Dev / HMR only
   */


  const removeStaticNode = vnode => {
    let cur = vnode.el;

    while (cur && cur !== vnode.anchor) {
      const next = hostNextSibling(cur);
      hostRemove(cur);
      cur = next;
    }

    hostRemove(vnode.anchor);
  };

  const processElement = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, optimized) => {
    isSVG = isSVG || n2.type === 'svg';

    if (n1 == null) {
      mountElement(n2, container, anchor, parentComponent, parentSuspense, isSVG, optimized);
    } else {
      patchElement(n1, n2, parentComponent, parentSuspense, isSVG, optimized);
    }
  };

  const mountElement = (vnode, container, anchor, parentComponent, parentSuspense, isSVG, optimized) => {
    let el;
    let vnodeHook;
    const {
      type,
      props,
      shapeFlag,
      transition,
      scopeId,
      patchFlag,
      dirs
    } = vnode;

    if (!("development" !== 'production') && vnode.el && hostCloneNode !== undefined && patchFlag === -1
    /* HOISTED */
    ) {
        // If a vnode has non-null el, it means it's being reused.
        // Only static vnodes can be reused, so its mounted DOM nodes should be
        // exactly the same, and we can simply do a clone here.
        // only do this in production since cloned trees cannot be HMR updated.
        el = vnode.el = hostCloneNode(vnode.el);
      } else {
      el = vnode.el = hostCreateElement(vnode.type, isSVG, props && props.is); // mount children first, since some props may rely on child content
      // being already rendered, e.g. `<select value>`

      if (shapeFlag & 8
      /* TEXT_CHILDREN */
      ) {
          hostSetElementText(el, vnode.children);
        } else if (shapeFlag & 16
      /* ARRAY_CHILDREN */
      ) {
          mountChildren(vnode.children, el, null, parentComponent, parentSuspense, isSVG && type !== 'foreignObject', optimized || !!vnode.dynamicChildren);
        } // props


      if (props) {
        for (const key in props) {
          if (!(0, _shared.isReservedProp)(key)) {
            hostPatchProp(el, key, null, props[key], isSVG, vnode.children, parentComponent, parentSuspense, unmountChildren);
          }
        }

        if (vnodeHook = props.onVnodeBeforeMount) {
          invokeVNodeHook(vnodeHook, parentComponent, vnode);
        }
      }

      if (dirs) {
        invokeDirectiveHook(vnode, null, parentComponent, 'beforeMount');
      } // scopeId


      if (scopeId) {
        hostSetScopeId(el, scopeId);
      }

      const treeOwnerId = parentComponent && parentComponent.type.__scopeId; // vnode's own scopeId and the current patched component's scopeId is
      // different - this is a slot content node.

      if (treeOwnerId && treeOwnerId !== scopeId) {
        hostSetScopeId(el, treeOwnerId + '-s');
      }

      if (transition && !transition.persisted) {
        transition.beforeEnter(el);
      }
    }

    hostInsert(el, container, anchor); // #1583 For inside suspense + suspense not resolved case, enter hook should call when suspense resolved
    // #1689 For inside suspense + suspense resolved case, just call it

    const needCallTransitionHooks = (!parentSuspense || parentSuspense && parentSuspense.isResolved) && transition && !transition.persisted;

    if ((vnodeHook = props && props.onVnodeMounted) || needCallTransitionHooks || dirs) {
      queuePostRenderEffect(() => {
        vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
        needCallTransitionHooks && transition.enter(el);
        dirs && invokeDirectiveHook(vnode, null, parentComponent, 'mounted');
      }, parentSuspense);
    }
  };

  const mountChildren = (children, container, anchor, parentComponent, parentSuspense, isSVG, optimized, start = 0) => {
    for (let i = start; i < children.length; i++) {
      const child = children[i] = optimized ? cloneIfMounted(children[i]) : normalizeVNode(children[i]);
      patch(null, child, container, anchor, parentComponent, parentSuspense, isSVG, optimized);
    }
  };

  const patchElement = (n1, n2, parentComponent, parentSuspense, isSVG, optimized) => {
    const el = n2.el = n1.el;
    let {
      patchFlag,
      dynamicChildren,
      dirs
    } = n2; // #1426 take the old vnode's patch flag into account since user may clone a
    // compiler-generated vnode, which de-opts to FULL_PROPS

    patchFlag |= n1.patchFlag & 16
    /* FULL_PROPS */
    ;
    const oldProps = n1.props || _shared.EMPTY_OBJ;
    const newProps = n2.props || _shared.EMPTY_OBJ;
    let vnodeHook;

    if (vnodeHook = newProps.onVnodeBeforeUpdate) {
      invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
    }

    if (dirs) {
      invokeDirectiveHook(n2, n1, parentComponent, 'beforeUpdate');
    }

    if ("development" !== 'production' && isHmrUpdating) {
      // HMR updated, force full diff
      patchFlag = 0;
      optimized = false;
      dynamicChildren = null;
    }

    if (patchFlag > 0) {
      // the presence of a patchFlag means this element's render code was
      // generated by the compiler and can take the fast path.
      // in this path old node and new node are guaranteed to have the same shape
      // (i.e. at the exact same position in the source template)
      if (patchFlag & 16
      /* FULL_PROPS */
      ) {
          // element props contain dynamic keys, full diff needed
          patchProps(el, n2, oldProps, newProps, parentComponent, parentSuspense, isSVG);
        } else {
        // class
        // this flag is matched when the element has dynamic class bindings.
        if (patchFlag & 2
        /* CLASS */
        ) {
            if (oldProps.class !== newProps.class) {
              hostPatchProp(el, 'class', null, newProps.class, isSVG);
            }
          } // style
        // this flag is matched when the element has dynamic style bindings


        if (patchFlag & 4
        /* STYLE */
        ) {
            hostPatchProp(el, 'style', oldProps.style, newProps.style, isSVG);
          } // props
        // This flag is matched when the element has dynamic prop/attr bindings
        // other than class and style. The keys of dynamic prop/attrs are saved for
        // faster iteration.
        // Note dynamic keys like :[foo]="bar" will cause this optimization to
        // bail out and go through a full diff because we need to unset the old key


        if (patchFlag & 8
        /* PROPS */
        ) {
            // if the flag is present then dynamicProps must be non-null
            const propsToUpdate = n2.dynamicProps;

            for (let i = 0; i < propsToUpdate.length; i++) {
              const key = propsToUpdate[i];
              const prev = oldProps[key];
              const next = newProps[key];

              if (next !== prev || hostForcePatchProp && hostForcePatchProp(el, key)) {
                hostPatchProp(el, key, prev, next, isSVG, n1.children, parentComponent, parentSuspense, unmountChildren);
              }
            }
          }
      } // text
      // This flag is matched when the element has only dynamic text children.


      if (patchFlag & 1
      /* TEXT */
      ) {
          if (n1.children !== n2.children) {
            hostSetElementText(el, n2.children);
          }
        }
    } else if (!optimized && dynamicChildren == null) {
      // unoptimized, full diff
      patchProps(el, n2, oldProps, newProps, parentComponent, parentSuspense, isSVG);
    }

    const areChildrenSVG = isSVG && n2.type !== 'foreignObject';

    if (dynamicChildren) {
      patchBlockChildren(n1.dynamicChildren, dynamicChildren, el, parentComponent, parentSuspense, areChildrenSVG);

      if ("development" !== 'production' && parentComponent && parentComponent.type.__hmrId) {
        traverseStaticChildren(n1, n2);
      }
    } else if (!optimized) {
      // full diff
      patchChildren(n1, n2, el, null, parentComponent, parentSuspense, areChildrenSVG);
    }

    if ((vnodeHook = newProps.onVnodeUpdated) || dirs) {
      queuePostRenderEffect(() => {
        vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
        dirs && invokeDirectiveHook(n2, n1, parentComponent, 'updated');
      }, parentSuspense);
    }
  }; // The fast path for blocks.


  const patchBlockChildren = (oldChildren, newChildren, fallbackContainer, parentComponent, parentSuspense, isSVG) => {
    for (let i = 0; i < newChildren.length; i++) {
      const oldVNode = oldChildren[i];
      const newVNode = newChildren[i]; // Determine the container (parent element) for the patch.

      const container = // - In the case of a Fragment, we need to provide the actual parent
      // of the Fragment itself so it can move its children.
      oldVNode.type === Fragment || // - In the case of different nodes, there is going to be a replacement
      // which also requires the correct parent container
      !isSameVNodeType(oldVNode, newVNode) || // - In the case of a component, it could contain anything.
      oldVNode.shapeFlag & 6
      /* COMPONENT */
      || oldVNode.shapeFlag & 64
      /* TELEPORT */
      ? hostParentNode(oldVNode.el) : // In other cases, the parent container is not actually used so we
      // just pass the block element here to avoid a DOM parentNode call.
      fallbackContainer;
      patch(oldVNode, newVNode, container, null, parentComponent, parentSuspense, isSVG, true);
    }
  };

  const patchProps = (el, vnode, oldProps, newProps, parentComponent, parentSuspense, isSVG) => {
    if (oldProps !== newProps) {
      for (const key in newProps) {
        if ((0, _shared.isReservedProp)(key)) continue;
        const next = newProps[key];
        const prev = oldProps[key];

        if (next !== prev || hostForcePatchProp && hostForcePatchProp(el, key)) {
          hostPatchProp(el, key, prev, next, isSVG, vnode.children, parentComponent, parentSuspense, unmountChildren);
        }
      }

      if (oldProps !== _shared.EMPTY_OBJ) {
        for (const key in oldProps) {
          if (!(0, _shared.isReservedProp)(key) && !(key in newProps)) {
            hostPatchProp(el, key, oldProps[key], null, isSVG, vnode.children, parentComponent, parentSuspense, unmountChildren);
          }
        }
      }
    }
  };

  const processFragment = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, optimized) => {
    const fragmentStartAnchor = n2.el = n1 ? n1.el : hostCreateText('');
    const fragmentEndAnchor = n2.anchor = n1 ? n1.anchor : hostCreateText('');
    let {
      patchFlag,
      dynamicChildren
    } = n2;

    if (patchFlag > 0) {
      optimized = true;
    }

    if ("development" !== 'production' && isHmrUpdating) {
      // HMR updated, force full diff
      patchFlag = 0;
      optimized = false;
      dynamicChildren = null;
    }

    if (n1 == null) {
      hostInsert(fragmentStartAnchor, container, anchor);
      hostInsert(fragmentEndAnchor, container, anchor); // a fragment can only have array children
      // since they are either generated by the compiler, or implicitly created
      // from arrays.

      mountChildren(n2.children, container, fragmentEndAnchor, parentComponent, parentSuspense, isSVG, optimized);
    } else {
      if (patchFlag > 0 && patchFlag & 64
      /* STABLE_FRAGMENT */
      && dynamicChildren) {
        // a stable fragment (template root or <template v-for>) doesn't need to
        // patch children order, but it may contain dynamicChildren.
        patchBlockChildren(n1.dynamicChildren, dynamicChildren, container, parentComponent, parentSuspense, isSVG);

        if ("development" !== 'production' && parentComponent && parentComponent.type.__hmrId) {
          traverseStaticChildren(n1, n2);
        }
      } else {
        // keyed / unkeyed, or manual fragments.
        // for keyed & unkeyed, since they are compiler generated from v-for,
        // each child is guaranteed to be a block so the fragment will never
        // have dynamicChildren.
        patchChildren(n1, n2, container, fragmentEndAnchor, parentComponent, parentSuspense, isSVG, optimized);
      }
    }
  };

  const processComponent = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, optimized) => {
    if (n1 == null) {
      if (n2.shapeFlag & 512
      /* COMPONENT_KEPT_ALIVE */
      ) {
          parentComponent.ctx.activate(n2, container, anchor, isSVG, optimized);
        } else {
        mountComponent(n2, container, anchor, parentComponent, parentSuspense, isSVG, optimized);
      }
    } else {
      updateComponent(n1, n2, optimized);
    }
  };

  const mountComponent = (initialVNode, container, anchor, parentComponent, parentSuspense, isSVG, optimized) => {
    const instance = initialVNode.component = createComponentInstance(initialVNode, parentComponent, parentSuspense);

    if ("development" !== 'production' && instance.type.__hmrId) {
      registerHMR(instance);
    }

    if ("development" !== 'production') {
      pushWarningContext(initialVNode);
      startMeasure(instance, `mount`);
    } // inject renderer internals for keepAlive


    if (isKeepAlive(initialVNode)) {
      instance.ctx.renderer = internals;
    } // resolve props and slots for setup context


    if ("development" !== 'production') {
      startMeasure(instance, `init`);
    }

    setupComponent(instance);

    if ("development" !== 'production') {
      endMeasure(instance, `init`);
    } // setup() is async. This component relies on async logic to be resolved
    // before proceeding


    if (instance.asyncDep) {
      if (!parentSuspense) {
        if ("development" !== 'production') warn('async setup() is used without a suspense boundary!');
        return;
      }

      parentSuspense.registerDep(instance, setupRenderEffect); // Give it a placeholder if this is not hydration

      if (!initialVNode.el) {
        const placeholder = instance.subTree = createVNode(Comment);
        processCommentNode(null, placeholder, container, anchor);
      }

      return;
    }

    setupRenderEffect(instance, initialVNode, container, anchor, parentSuspense, isSVG, optimized);

    if ("development" !== 'production') {
      popWarningContext();
      endMeasure(instance, `mount`);
    }
  };

  const updateComponent = (n1, n2, optimized) => {
    const instance = n2.component = n1.component;

    if (shouldUpdateComponent(n1, n2, optimized)) {
      if (instance.asyncDep && !instance.asyncResolved) {
        // async & still pending - just update props and slots
        // since the component's reactive effect for render isn't set-up yet
        if ("development" !== 'production') {
          pushWarningContext(n2);
        }

        updateComponentPreRender(instance, n2, optimized);

        if ("development" !== 'production') {
          popWarningContext();
        }

        return;
      } else {
        // normal update
        instance.next = n2; // in case the child component is also queued, remove it to avoid
        // double updating the same child component in the same flush.

        invalidateJob(instance.update); // instance.update is the reactive effect runner.

        instance.update();
      }
    } else {
      // no update needed. just copy over properties
      n2.component = n1.component;
      n2.el = n1.el;
      instance.vnode = n2;
    }
  };

  const setupRenderEffect = (instance, initialVNode, container, anchor, parentSuspense, isSVG, optimized) => {
    // create reactive effect for rendering
    instance.update = (0, _reactivity.effect)(function componentEffect() {
      if (!instance.isMounted) {
        let vnodeHook;
        const {
          el,
          props
        } = initialVNode;
        const {
          bm,
          m,
          a,
          parent
        } = instance;

        if ("development" !== 'production') {
          startMeasure(instance, `render`);
        }

        const subTree = instance.subTree = renderComponentRoot(instance);

        if ("development" !== 'production') {
          endMeasure(instance, `render`);
        } // beforeMount hook


        if (bm) {
          (0, _shared.invokeArrayFns)(bm);
        } // onVnodeBeforeMount


        if (vnodeHook = props && props.onVnodeBeforeMount) {
          invokeVNodeHook(vnodeHook, parent, initialVNode);
        }

        if (el && hydrateNode) {
          if ("development" !== 'production') {
            startMeasure(instance, `hydrate`);
          } // vnode has adopted host node - perform hydration instead of mount.


          hydrateNode(initialVNode.el, subTree, instance, parentSuspense);

          if ("development" !== 'production') {
            endMeasure(instance, `hydrate`);
          }
        } else {
          if ("development" !== 'production') {
            startMeasure(instance, `patch`);
          }

          patch(null, subTree, container, anchor, instance, parentSuspense, isSVG);

          if ("development" !== 'production') {
            endMeasure(instance, `patch`);
          }

          initialVNode.el = subTree.el;
        } // mounted hook


        if (m) {
          queuePostRenderEffect(m, parentSuspense);
        } // onVnodeMounted


        if (vnodeHook = props && props.onVnodeMounted) {
          queuePostRenderEffect(() => {
            invokeVNodeHook(vnodeHook, parent, initialVNode);
          }, parentSuspense);
        } // activated hook for keep-alive roots.


        if (a && initialVNode.shapeFlag & 256
        /* COMPONENT_SHOULD_KEEP_ALIVE */
        ) {
            queuePostRenderEffect(a, parentSuspense);
          }

        instance.isMounted = true;
      } else {
        // updateComponent
        // This is triggered by mutation of component's own state (next: null)
        // OR parent calling processComponent (next: VNode)
        let {
          next,
          bu,
          u,
          parent,
          vnode
        } = instance;
        let originNext = next;
        let vnodeHook;

        if ("development" !== 'production') {
          pushWarningContext(next || instance.vnode);
        }

        if (next) {
          updateComponentPreRender(instance, next, optimized);
        } else {
          next = vnode;
        }

        if ("development" !== 'production') {
          startMeasure(instance, `render`);
        }

        const nextTree = renderComponentRoot(instance);

        if ("development" !== 'production') {
          endMeasure(instance, `render`);
        }

        const prevTree = instance.subTree;
        instance.subTree = nextTree;
        next.el = vnode.el; // beforeUpdate hook

        if (bu) {
          (0, _shared.invokeArrayFns)(bu);
        } // onVnodeBeforeUpdate


        if (vnodeHook = next.props && next.props.onVnodeBeforeUpdate) {
          invokeVNodeHook(vnodeHook, parent, next, vnode);
        } // reset refs
        // only needed if previous patch had refs


        if (instance.refs !== _shared.EMPTY_OBJ) {
          instance.refs = {};
        }

        if ("development" !== 'production') {
          startMeasure(instance, `patch`);
        }

        patch(prevTree, nextTree, // parent may have changed if it's in a teleport
        hostParentNode(prevTree.el), // anchor may have changed if it's in a fragment
        getNextHostNode(prevTree), instance, parentSuspense, isSVG);

        if ("development" !== 'production') {
          endMeasure(instance, `patch`);
        }

        next.el = nextTree.el;

        if (originNext === null) {
          // self-triggered update. In case of HOC, update parent component
          // vnode el. HOC is indicated by parent instance's subTree pointing
          // to child component's vnode
          updateHOCHostEl(instance, nextTree.el);
        } // updated hook


        if (u) {
          queuePostRenderEffect(u, parentSuspense);
        } // onVnodeUpdated


        if (vnodeHook = next.props && next.props.onVnodeUpdated) {
          queuePostRenderEffect(() => {
            invokeVNodeHook(vnodeHook, parent, next, vnode);
          }, parentSuspense);
        }

        if ("development" !== 'production' || __VUE_PROD_DEVTOOLS__) {
          devtoolsComponentUpdated(instance);
        }

        if ("development" !== 'production') {
          popWarningContext();
        }
      }
    }, "development" !== 'production' ? createDevEffectOptions(instance) : prodEffectOptions);
  };

  const updateComponentPreRender = (instance, nextVNode, optimized) => {
    if ("development" !== 'production' && instance.type.__hmrId) {
      optimized = false;
    }

    nextVNode.component = instance;
    const prevProps = instance.vnode.props;
    instance.vnode = nextVNode;
    instance.next = null;
    updateProps(instance, nextVNode.props, prevProps, optimized);
    updateSlots(instance, nextVNode.children);
  };

  const patchChildren = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, optimized = false) => {
    const c1 = n1 && n1.children;
    const prevShapeFlag = n1 ? n1.shapeFlag : 0;
    const c2 = n2.children;
    const {
      patchFlag,
      shapeFlag
    } = n2; // fast path

    if (patchFlag > 0) {
      if (patchFlag & 128
      /* KEYED_FRAGMENT */
      ) {
          // this could be either fully-keyed or mixed (some keyed some not)
          // presence of patchFlag means children are guaranteed to be arrays
          patchKeyedChildren(c1, c2, container, anchor, parentComponent, parentSuspense, isSVG, optimized);
          return;
        } else if (patchFlag & 256
      /* UNKEYED_FRAGMENT */
      ) {
          // unkeyed
          patchUnkeyedChildren(c1, c2, container, anchor, parentComponent, parentSuspense, isSVG, optimized);
          return;
        }
    } // children has 3 possibilities: text, array or no children.


    if (shapeFlag & 8
    /* TEXT_CHILDREN */
    ) {
        // text children fast path
        if (prevShapeFlag & 16
        /* ARRAY_CHILDREN */
        ) {
            unmountChildren(c1, parentComponent, parentSuspense);
          }

        if (c2 !== c1) {
          hostSetElementText(container, c2);
        }
      } else {
      if (prevShapeFlag & 16
      /* ARRAY_CHILDREN */
      ) {
          // prev children was array
          if (shapeFlag & 16
          /* ARRAY_CHILDREN */
          ) {
              // two arrays, cannot assume anything, do full diff
              patchKeyedChildren(c1, c2, container, anchor, parentComponent, parentSuspense, isSVG, optimized);
            } else {
            // no new children, just unmount old
            unmountChildren(c1, parentComponent, parentSuspense, true);
          }
        } else {
        // prev children was text OR null
        // new children is array OR null
        if (prevShapeFlag & 8
        /* TEXT_CHILDREN */
        ) {
            hostSetElementText(container, '');
          } // mount new if array


        if (shapeFlag & 16
        /* ARRAY_CHILDREN */
        ) {
            mountChildren(c2, container, anchor, parentComponent, parentSuspense, isSVG, optimized);
          }
      }
    }
  };

  const patchUnkeyedChildren = (c1, c2, container, anchor, parentComponent, parentSuspense, isSVG, optimized) => {
    c1 = c1 || _shared.EMPTY_ARR;
    c2 = c2 || _shared.EMPTY_ARR;
    const oldLength = c1.length;
    const newLength = c2.length;
    const commonLength = Math.min(oldLength, newLength);
    let i;

    for (i = 0; i < commonLength; i++) {
      const nextChild = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
      patch(c1[i], nextChild, container, null, parentComponent, parentSuspense, isSVG, optimized);
    }

    if (oldLength > newLength) {
      // remove old
      unmountChildren(c1, parentComponent, parentSuspense, true, commonLength);
    } else {
      // mount new
      mountChildren(c2, container, anchor, parentComponent, parentSuspense, isSVG, optimized, commonLength);
    }
  }; // can be all-keyed or mixed


  const patchKeyedChildren = (c1, c2, container, parentAnchor, parentComponent, parentSuspense, isSVG, optimized) => {
    let i = 0;
    const l2 = c2.length;
    let e1 = c1.length - 1; // prev ending index

    let e2 = l2 - 1; // next ending index
    // 1. sync from start
    // (a b) c
    // (a b) d e

    while (i <= e1 && i <= e2) {
      const n1 = c1[i];
      const n2 = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);

      if (isSameVNodeType(n1, n2)) {
        patch(n1, n2, container, null, parentComponent, parentSuspense, isSVG, optimized);
      } else {
        break;
      }

      i++;
    } // 2. sync from end
    // a (b c)
    // d e (b c)


    while (i <= e1 && i <= e2) {
      const n1 = c1[e1];
      const n2 = c2[e2] = optimized ? cloneIfMounted(c2[e2]) : normalizeVNode(c2[e2]);

      if (isSameVNodeType(n1, n2)) {
        patch(n1, n2, container, null, parentComponent, parentSuspense, isSVG, optimized);
      } else {
        break;
      }

      e1--;
      e2--;
    } // 3. common sequence + mount
    // (a b)
    // (a b) c
    // i = 2, e1 = 1, e2 = 2
    // (a b)
    // c (a b)
    // i = 0, e1 = -1, e2 = 0


    if (i > e1) {
      if (i <= e2) {
        const nextPos = e2 + 1;
        const anchor = nextPos < l2 ? c2[nextPos].el : parentAnchor;

        while (i <= e2) {
          patch(null, c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]), container, anchor, parentComponent, parentSuspense, isSVG);
          i++;
        }
      }
    } // 4. common sequence + unmount
    // (a b) c
    // (a b)
    // i = 2, e1 = 2, e2 = 1
    // a (b c)
    // (b c)
    // i = 0, e1 = 0, e2 = -1
    else if (i > e2) {
        while (i <= e1) {
          unmount(c1[i], parentComponent, parentSuspense, true);
          i++;
        }
      } // 5. unknown sequence
      // [i ... e1 + 1]: a b [c d e] f g
      // [i ... e2 + 1]: a b [e d c h] f g
      // i = 2, e1 = 4, e2 = 5
      else {
          const s1 = i; // prev starting index

          const s2 = i; // next starting index
          // 5.1 build key:index map for newChildren

          const keyToNewIndexMap = new Map();

          for (i = s2; i <= e2; i++) {
            const nextChild = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);

            if (nextChild.key != null) {
              if ("development" !== 'production' && keyToNewIndexMap.has(nextChild.key)) {
                warn(`Duplicate keys found during update:`, JSON.stringify(nextChild.key), `Make sure keys are unique.`);
              }

              keyToNewIndexMap.set(nextChild.key, i);
            }
          } // 5.2 loop through old children left to be patched and try to patch
          // matching nodes & remove nodes that are no longer present


          let j;
          let patched = 0;
          const toBePatched = e2 - s2 + 1;
          let moved = false; // used to track whether any node has moved

          let maxNewIndexSoFar = 0; // works as Map<newIndex, oldIndex>
          // Note that oldIndex is offset by +1
          // and oldIndex = 0 is a special value indicating the new node has
          // no corresponding old node.
          // used for determining longest stable subsequence

          const newIndexToOldIndexMap = new Array(toBePatched);

          for (i = 0; i < toBePatched; i++) newIndexToOldIndexMap[i] = 0;

          for (i = s1; i <= e1; i++) {
            const prevChild = c1[i];

            if (patched >= toBePatched) {
              // all new children have been patched so this can only be a removal
              unmount(prevChild, parentComponent, parentSuspense, true);
              continue;
            }

            let newIndex;

            if (prevChild.key != null) {
              newIndex = keyToNewIndexMap.get(prevChild.key);
            } else {
              // key-less node, try to locate a key-less node of the same type
              for (j = s2; j <= e2; j++) {
                if (newIndexToOldIndexMap[j - s2] === 0 && isSameVNodeType(prevChild, c2[j])) {
                  newIndex = j;
                  break;
                }
              }
            }

            if (newIndex === undefined) {
              unmount(prevChild, parentComponent, parentSuspense, true);
            } else {
              newIndexToOldIndexMap[newIndex - s2] = i + 1;

              if (newIndex >= maxNewIndexSoFar) {
                maxNewIndexSoFar = newIndex;
              } else {
                moved = true;
              }

              patch(prevChild, c2[newIndex], container, null, parentComponent, parentSuspense, isSVG, optimized);
              patched++;
            }
          } // 5.3 move and mount
          // generate longest stable subsequence only when nodes have moved


          const increasingNewIndexSequence = moved ? getSequence(newIndexToOldIndexMap) : _shared.EMPTY_ARR;
          j = increasingNewIndexSequence.length - 1; // looping backwards so that we can use last patched node as anchor

          for (i = toBePatched - 1; i >= 0; i--) {
            const nextIndex = s2 + i;
            const nextChild = c2[nextIndex];
            const anchor = nextIndex + 1 < l2 ? c2[nextIndex + 1].el : parentAnchor;

            if (newIndexToOldIndexMap[i] === 0) {
              // mount new
              patch(null, nextChild, container, anchor, parentComponent, parentSuspense, isSVG);
            } else if (moved) {
              // move if:
              // There is no stable subsequence (e.g. a reverse)
              // OR current node is not among the stable sequence
              if (j < 0 || i !== increasingNewIndexSequence[j]) {
                move(nextChild, container, anchor, 2
                /* REORDER */
                );
              } else {
                j--;
              }
            }
          }
        }
  };

  const move = (vnode, container, anchor, moveType, parentSuspense = null) => {
    const {
      el,
      type,
      transition,
      children,
      shapeFlag
    } = vnode;

    if (shapeFlag & 6
    /* COMPONENT */
    ) {
        move(vnode.component.subTree, container, anchor, moveType);
        return;
      }

    if (shapeFlag & 128
    /* SUSPENSE */
    ) {
        vnode.suspense.move(container, anchor, moveType);
        return;
      }

    if (shapeFlag & 64
    /* TELEPORT */
    ) {
        type.move(vnode, container, anchor, internals);
        return;
      }

    if (type === Fragment) {
      hostInsert(el, container, anchor);

      for (let i = 0; i < children.length; i++) {
        move(children[i], container, anchor, moveType);
      }

      hostInsert(vnode.anchor, container, anchor);
      return;
    } // static node move can only happen when force updating HMR


    if ("development" !== 'production' && type === Static) {
      moveStaticNode(vnode, container, anchor);
      return;
    } // single nodes


    const needTransition = moveType !== 2
    /* REORDER */
    && shapeFlag & 1
    /* ELEMENT */
    && transition;

    if (needTransition) {
      if (moveType === 0
      /* ENTER */
      ) {
          transition.beforeEnter(el);
          hostInsert(el, container, anchor);
          queuePostRenderEffect(() => transition.enter(el), parentSuspense);
        } else {
        const {
          leave,
          delayLeave,
          afterLeave
        } = transition;

        const remove = () => hostInsert(el, container, anchor);

        const performLeave = () => {
          leave(el, () => {
            remove();
            afterLeave && afterLeave();
          });
        };

        if (delayLeave) {
          delayLeave(el, remove, performLeave);
        } else {
          performLeave();
        }
      }
    } else {
      hostInsert(el, container, anchor);
    }
  };

  const unmount = (vnode, parentComponent, parentSuspense, doRemove = false) => {
    const {
      type,
      props,
      ref,
      children,
      dynamicChildren,
      shapeFlag,
      patchFlag,
      dirs
    } = vnode; // unset ref

    if (ref != null && parentComponent) {
      setRef(ref, null, parentComponent, parentSuspense, null);
    }

    if (shapeFlag & 256
    /* COMPONENT_SHOULD_KEEP_ALIVE */
    ) {
        parentComponent.ctx.deactivate(vnode);
        return;
      }

    const shouldInvokeDirs = shapeFlag & 1
    /* ELEMENT */
    && dirs;
    let vnodeHook;

    if (vnodeHook = props && props.onVnodeBeforeUnmount) {
      invokeVNodeHook(vnodeHook, parentComponent, vnode);
    }

    if (shapeFlag & 6
    /* COMPONENT */
    ) {
        unmountComponent(vnode.component, parentSuspense, doRemove);
      } else {
      if (shapeFlag & 128
      /* SUSPENSE */
      ) {
          vnode.suspense.unmount(parentSuspense, doRemove);
          return;
        }

      if (shouldInvokeDirs) {
        invokeDirectiveHook(vnode, null, parentComponent, 'beforeUnmount');
      }

      if (dynamicChildren && ( // #1153: fast path should not be taken for non-stable (v-for) fragments
      type !== Fragment || patchFlag > 0 && patchFlag & 64
      /* STABLE_FRAGMENT */
      )) {
        // fast path for block nodes: only need to unmount dynamic children.
        unmountChildren(dynamicChildren, parentComponent, parentSuspense);
      } else if (shapeFlag & 16
      /* ARRAY_CHILDREN */
      ) {
          unmountChildren(children, parentComponent, parentSuspense);
        } // an unmounted teleport should always remove its children


      if (shapeFlag & 64
      /* TELEPORT */
      ) {
          vnode.type.remove(vnode, internals);
        }

      if (doRemove) {
        remove(vnode);
      }
    }

    if ((vnodeHook = props && props.onVnodeUnmounted) || shouldInvokeDirs) {
      queuePostRenderEffect(() => {
        vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
        shouldInvokeDirs && invokeDirectiveHook(vnode, null, parentComponent, 'unmounted');
      }, parentSuspense);
    }
  };

  const remove = vnode => {
    const {
      type,
      el,
      anchor,
      transition
    } = vnode;

    if (type === Fragment) {
      removeFragment(el, anchor);
      return;
    }

    if ("development" !== 'production' && type === Static) {
      removeStaticNode(vnode);
      return;
    }

    const performRemove = () => {
      hostRemove(el);

      if (transition && !transition.persisted && transition.afterLeave) {
        transition.afterLeave();
      }
    };

    if (vnode.shapeFlag & 1
    /* ELEMENT */
    && transition && !transition.persisted) {
      const {
        leave,
        delayLeave
      } = transition;

      const performLeave = () => leave(el, performRemove);

      if (delayLeave) {
        delayLeave(vnode.el, performRemove, performLeave);
      } else {
        performLeave();
      }
    } else {
      performRemove();
    }
  };

  const removeFragment = (cur, end) => {
    // For fragments, directly remove all contained DOM nodes.
    // (fragment child nodes cannot have transition)
    let next;

    while (cur !== end) {
      next = hostNextSibling(cur);
      hostRemove(cur);
      cur = next;
    }

    hostRemove(end);
  };

  const unmountComponent = (instance, parentSuspense, doRemove) => {
    if ("development" !== 'production' && instance.type.__hmrId) {
      unregisterHMR(instance);
    }

    const {
      bum,
      effects,
      update,
      subTree,
      um,
      da,
      isDeactivated
    } = instance; // beforeUnmount hook

    if (bum) {
      (0, _shared.invokeArrayFns)(bum);
    }

    if (effects) {
      for (let i = 0; i < effects.length; i++) {
        (0, _reactivity.stop)(effects[i]);
      }
    } // update may be null if a component is unmounted before its async
    // setup has resolved.


    if (update) {
      (0, _reactivity.stop)(update);
      unmount(subTree, instance, parentSuspense, doRemove);
    } // unmounted hook


    if (um) {
      queuePostRenderEffect(um, parentSuspense);
    } // deactivated hook


    if (da && !isDeactivated && instance.vnode.shapeFlag & 256
    /* COMPONENT_SHOULD_KEEP_ALIVE */
    ) {
        queuePostRenderEffect(da, parentSuspense);
      }

    queuePostRenderEffect(() => {
      instance.isUnmounted = true;
    }, parentSuspense); // A component with async dep inside a pending suspense is unmounted before
    // its async dep resolves. This should remove the dep from the suspense, and
    // cause the suspense to resolve immediately if that was the last dep.

    if (parentSuspense && !parentSuspense.isResolved && !parentSuspense.isUnmounted && instance.asyncDep && !instance.asyncResolved) {
      parentSuspense.deps--;

      if (parentSuspense.deps === 0) {
        parentSuspense.resolve();
      }
    }

    if ("development" !== 'production' || __VUE_PROD_DEVTOOLS__) {
      devtoolsComponentRemoved(instance);
    }
  };

  const unmountChildren = (children, parentComponent, parentSuspense, doRemove = false, start = 0) => {
    for (let i = start; i < children.length; i++) {
      unmount(children[i], parentComponent, parentSuspense, doRemove);
    }
  };

  const getNextHostNode = vnode => {
    if (vnode.shapeFlag & 6
    /* COMPONENT */
    ) {
        return getNextHostNode(vnode.component.subTree);
      }

    if (vnode.shapeFlag & 128
    /* SUSPENSE */
    ) {
        return vnode.suspense.next();
      }

    return hostNextSibling(vnode.anchor || vnode.el);
  };
  /**
   * #1156
   * When a component is HMR-enabled, we need to make sure that all static nodes
   * inside a block also inherit the DOM element from the previous tree so that
   * HMR updates (which are full updates) can retrieve the element for patching.
   *
   * Dev only.
   */


  const traverseStaticChildren = (n1, n2) => {
    const ch1 = n1.children;
    const ch2 = n2.children;

    if ((0, _shared.isArray)(ch1) && (0, _shared.isArray)(ch2)) {
      for (let i = 0; i < ch1.length; i++) {
        // this is only called in the optimized path so array children are
        // guaranteed to be vnodes
        const c1 = ch1[i];
        const c2 = ch2[i] = cloneIfMounted(ch2[i]);

        if (c2.shapeFlag & 1
        /* ELEMENT */
        && !c2.dynamicChildren) {
          if (c2.patchFlag <= 0 || c2.patchFlag === 32
          /* HYDRATE_EVENTS */
          ) {
              c2.el = c1.el;
            }

          traverseStaticChildren(c1, c2);
        }
      }
    }
  };

  const render = (vnode, container) => {
    if (vnode == null) {
      if (container._vnode) {
        unmount(container._vnode, null, null, true);
      }
    } else {
      patch(container._vnode || null, vnode, container);
    }

    flushPostFlushCbs();
    container._vnode = vnode;
  };

  const internals = {
    p: patch,
    um: unmount,
    m: move,
    r: remove,
    mt: mountComponent,
    mc: mountChildren,
    pc: patchChildren,
    pbc: patchBlockChildren,
    n: getNextHostNode,
    o: options
  };
  let hydrate;
  let hydrateNode;

  if (createHydrationFns) {
    [hydrate, hydrateNode] = createHydrationFns(internals);
  }

  return {
    render,
    hydrate,
    createApp: createAppAPI(render, hydrate)
  };
}

function invokeVNodeHook(hook, instance, vnode, prevVNode = null) {
  callWithAsyncErrorHandling(hook, instance, 7
  /* VNODE_HOOK */
  , [vnode, prevVNode]);
} // https://en.wikipedia.org/wiki/Longest_increasing_subsequence


function getSequence(arr) {
  const p = arr.slice();
  const result = [0];
  let i, j, u, v, c;
  const len = arr.length;

  for (i = 0; i < len; i++) {
    const arrI = arr[i];

    if (arrI !== 0) {
      j = result[result.length - 1];

      if (arr[j] < arrI) {
        p[i] = j;
        result.push(i);
        continue;
      }

      u = 0;
      v = result.length - 1;

      while (u < v) {
        c = (u + v) / 2 | 0;

        if (arr[result[c]] < arrI) {
          u = c + 1;
        } else {
          v = c;
        }
      }

      if (arrI < arr[result[u]]) {
        if (u > 0) {
          p[i] = result[u - 1];
        }

        result[u] = i;
      }
    }
  }

  u = result.length;
  v = result[u - 1];

  while (u-- > 0) {
    result[u] = v;
    v = p[v];
  }

  return result;
} // Simple effect.


function watchEffect(effect, options) {
  return doWatch(effect, null, options);
} // initial value for watchers to trigger on undefined initial values


const INITIAL_WATCHER_VALUE = {}; // implementation

function watch(source, cb, options) {
  if ("development" !== 'production' && !(0, _shared.isFunction)(cb)) {
    warn(`\`watch(fn, options?)\` signature has been moved to a separate API. ` + `Use \`watchEffect(fn, options?)\` instead. \`watch\` now only ` + `supports \`watch(source, cb, options?) signature.`);
  }

  return doWatch(source, cb, options);
}

function doWatch(source, cb, {
  immediate,
  deep,
  flush,
  onTrack,
  onTrigger
} = _shared.EMPTY_OBJ, instance = currentInstance) {
  if ("development" !== 'production' && !cb) {
    if (immediate !== undefined) {
      warn(`watch() "immediate" option is only respected when using the ` + `watch(source, callback, options?) signature.`);
    }

    if (deep !== undefined) {
      warn(`watch() "deep" option is only respected when using the ` + `watch(source, callback, options?) signature.`);
    }
  }

  const warnInvalidSource = s => {
    warn(`Invalid watch source: `, s, `A watch source can only be a getter/effect function, a ref, ` + `a reactive object, or an array of these types.`);
  };

  let getter;

  if ((0, _reactivity.isRef)(source)) {
    getter = () => source.value;
  } else if ((0, _reactivity.isReactive)(source)) {
    getter = () => source;

    deep = true;
  } else if ((0, _shared.isArray)(source)) {
    getter = () => source.map(s => {
      if ((0, _reactivity.isRef)(s)) {
        return s.value;
      } else if ((0, _reactivity.isReactive)(s)) {
        return traverse(s);
      } else if ((0, _shared.isFunction)(s)) {
        return callWithErrorHandling(s, instance, 2
        /* WATCH_GETTER */
        );
      } else {
        "development" !== 'production' && warnInvalidSource(s);
      }
    });
  } else if ((0, _shared.isFunction)(source)) {
    if (cb) {
      // getter with cb
      getter = () => callWithErrorHandling(source, instance, 2
      /* WATCH_GETTER */
      );
    } else {
      // no cb -> simple effect
      getter = () => {
        if (instance && instance.isUnmounted) {
          return;
        }

        if (cleanup) {
          cleanup();
        }

        return callWithErrorHandling(source, instance, 3
        /* WATCH_CALLBACK */
        , [onInvalidate]);
      };
    }
  } else {
    getter = _shared.NOOP;
    "development" !== 'production' && warnInvalidSource(source);
  }

  if (cb && deep) {
    const baseGetter = getter;

    getter = () => traverse(baseGetter());
  }

  let cleanup;

  const onInvalidate = fn => {
    cleanup = runner.options.onStop = () => {
      callWithErrorHandling(fn, instance, 4
      /* WATCH_CLEANUP */
      );
    };
  };

  let oldValue = (0, _shared.isArray)(source) ? [] : INITIAL_WATCHER_VALUE;

  const job = () => {
    if (!runner.active) {
      return;
    }

    if (cb) {
      // watch(source, cb)
      const newValue = runner();

      if (deep || (0, _shared.hasChanged)(newValue, oldValue)) {
        // cleanup before running cb again
        if (cleanup) {
          cleanup();
        }

        callWithAsyncErrorHandling(cb, instance, 3
        /* WATCH_CALLBACK */
        , [newValue, // pass undefined as the old value when it's changed for the first time
        oldValue === INITIAL_WATCHER_VALUE ? undefined : oldValue, onInvalidate]);
        oldValue = newValue;
      }
    } else {
      // watchEffect
      runner();
    }
  };

  let scheduler;

  if (flush === 'sync') {
    scheduler = job;
  } else if (flush === 'pre') {
    // ensure it's queued before component updates (which have positive ids)
    job.id = -1;

    scheduler = () => {
      if (!instance || instance.isMounted) {
        queueJob(job);
      } else {
        // with 'pre' option, the first call must happen before
        // the component is mounted so it is called synchronously.
        job();
      }
    };
  } else {
    scheduler = () => queuePostRenderEffect(job, instance && instance.suspense);
  }

  const runner = (0, _reactivity.effect)(getter, {
    lazy: true,
    onTrack,
    onTrigger,
    scheduler
  });
  recordInstanceBoundEffect(runner); // initial run

  if (cb) {
    if (immediate) {
      job();
    } else {
      oldValue = runner();
    }
  } else {
    runner();
  }

  return () => {
    (0, _reactivity.stop)(runner);

    if (instance) {
      (0, _shared.remove)(instance.effects, runner);
    }
  };
} // this.$watch


function instanceWatch(source, cb, options) {
  const publicThis = this.proxy;
  const getter = (0, _shared.isString)(source) ? () => publicThis[source] : source.bind(publicThis);
  return doWatch(getter, cb.bind(publicThis), options, this);
}

function traverse(value, seen = new Set()) {
  if (!(0, _shared.isObject)(value) || seen.has(value)) {
    return value;
  }

  seen.add(value);

  if ((0, _shared.isArray)(value)) {
    for (let i = 0; i < value.length; i++) {
      traverse(value[i], seen);
    }
  } else if (value instanceof Map) {
    value.forEach((v, key) => {
      // to register mutation dep for existing keys
      traverse(value.get(key), seen);
    });
  } else if (value instanceof Set) {
    value.forEach(v => {
      traverse(v, seen);
    });
  } else {
    for (const key in value) {
      traverse(value[key], seen);
    }
  }

  return value;
}

function provide(key, value) {
  if (!currentInstance) {
    if ("development" !== 'production') {
      warn(`provide() can only be used inside setup().`);
    }
  } else {
    let provides = currentInstance.provides; // by default an instance inherits its parent's provides object
    // but when it needs to provide values of its own, it creates its
    // own provides object using parent provides object as prototype.
    // this way in `inject` we can simply look up injections from direct
    // parent and let the prototype chain do the work.

    const parentProvides = currentInstance.parent && currentInstance.parent.provides;

    if (parentProvides === provides) {
      provides = currentInstance.provides = Object.create(parentProvides);
    } // TS doesn't allow symbol as index type


    provides[key] = value;
  }
}

function inject(key, defaultValue) {
  // fallback to `currentRenderingInstance` so that this can be called in
  // a functional component
  const instance = currentInstance || currentRenderingInstance;

  if (instance) {
    const provides = instance.provides;

    if (key in provides) {
      // TS doesn't allow symbol as index type
      return provides[key];
    } else if (arguments.length > 1) {
      return defaultValue;
    } else if ("development" !== 'production') {
      warn(`injection "${String(key)}" not found.`);
    }
  } else if ("development" !== 'production') {
    warn(`inject() can only be used inside setup() or functional components.`);
  }
}

function createDuplicateChecker() {
  const cache = Object.create(null);
  return (type, key) => {
    if (cache[key]) {
      warn(`${type} property "${key}" is already defined in ${cache[key]}.`);
    } else {
      cache[key] = type;
    }
  };
}

function applyOptions(instance, options, deferredData = [], deferredWatch = [], asMixin = false) {
  const {
    // composition
    mixins,
    extends: extendsOptions,
    // state
    data: dataOptions,
    computed: computedOptions,
    methods,
    watch: watchOptions,
    provide: provideOptions,
    inject: injectOptions,
    // lifecycle
    beforeMount,
    mounted,
    beforeUpdate,
    updated,
    activated,
    deactivated,
    beforeUnmount,
    unmounted,
    render,
    renderTracked,
    renderTriggered,
    errorCaptured
  } = options;
  const publicThis = instance.proxy;
  const ctx = instance.ctx;
  const globalMixins = instance.appContext.mixins;

  if (asMixin && render && instance.render === _shared.NOOP) {
    instance.render = render;
  } // applyOptions is called non-as-mixin once per instance


  if (!asMixin) {
    callSyncHook('beforeCreate', options, publicThis, globalMixins); // global mixins are applied first

    applyMixins(instance, globalMixins, deferredData, deferredWatch);
  } // extending a base component...


  if (extendsOptions) {
    applyOptions(instance, extendsOptions, deferredData, deferredWatch, true);
  } // local mixins


  if (mixins) {
    applyMixins(instance, mixins, deferredData, deferredWatch);
  }

  const checkDuplicateProperties = "development" !== 'production' ? createDuplicateChecker() : null;

  if ("development" !== 'production') {
    const propsOptions = normalizePropsOptions(options)[0];

    if (propsOptions) {
      for (const key in propsOptions) {
        checkDuplicateProperties("Props"
        /* PROPS */
        , key);
      }
    }
  } // options initialization order (to be consistent with Vue 2):
  // - props (already done outside of this function)
  // - inject
  // - methods
  // - data (deferred since it relies on `this` access)
  // - computed
  // - watch (deferred since it relies on `this` access)


  if (injectOptions) {
    if ((0, _shared.isArray)(injectOptions)) {
      for (let i = 0; i < injectOptions.length; i++) {
        const key = injectOptions[i];
        ctx[key] = inject(key);

        if ("development" !== 'production') {
          checkDuplicateProperties("Inject"
          /* INJECT */
          , key);
        }
      }
    } else {
      for (const key in injectOptions) {
        const opt = injectOptions[key];

        if ((0, _shared.isObject)(opt)) {
          ctx[key] = inject(opt.from, opt.default);
        } else {
          ctx[key] = inject(opt);
        }

        if ("development" !== 'production') {
          checkDuplicateProperties("Inject"
          /* INJECT */
          , key);
        }
      }
    }
  }

  if (methods) {
    for (const key in methods) {
      const methodHandler = methods[key];

      if ((0, _shared.isFunction)(methodHandler)) {
        ctx[key] = methodHandler.bind(publicThis);

        if ("development" !== 'production') {
          checkDuplicateProperties("Methods"
          /* METHODS */
          , key);
        }
      } else if ("development" !== 'production') {
        warn(`Method "${key}" has type "${typeof methodHandler}" in the component definition. ` + `Did you reference the function correctly?`);
      }
    }
  }

  if (dataOptions) {
    if ("development" !== 'production' && !(0, _shared.isFunction)(dataOptions)) {
      warn(`The data option must be a function. ` + `Plain object usage is no longer supported.`);
    }

    if (asMixin) {
      deferredData.push(dataOptions);
    } else {
      resolveData(instance, dataOptions, publicThis);
    }
  }

  if (!asMixin) {
    if (deferredData.length) {
      deferredData.forEach(dataFn => resolveData(instance, dataFn, publicThis));
    }

    if ("development" !== 'production') {
      const rawData = (0, _reactivity.toRaw)(instance.data);

      for (const key in rawData) {
        checkDuplicateProperties("Data"
        /* DATA */
        , key); // expose data on ctx during dev

        if (key[0] !== '$' && key[0] !== '_') {
          Object.defineProperty(ctx, key, {
            configurable: true,
            enumerable: true,
            get: () => rawData[key],
            set: _shared.NOOP
          });
        }
      }
    }
  }

  if (computedOptions) {
    for (const key in computedOptions) {
      const opt = computedOptions[key];
      const get = (0, _shared.isFunction)(opt) ? opt.bind(publicThis, publicThis) : (0, _shared.isFunction)(opt.get) ? opt.get.bind(publicThis, publicThis) : _shared.NOOP;

      if ("development" !== 'production' && get === _shared.NOOP) {
        warn(`Computed property "${key}" has no getter.`);
      }

      const set = !(0, _shared.isFunction)(opt) && (0, _shared.isFunction)(opt.set) ? opt.set.bind(publicThis) : "development" !== 'production' ? () => {
        warn(`Write operation failed: computed property "${key}" is readonly.`);
      } : _shared.NOOP;
      const c = computed({
        get,
        set
      });
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => c.value,
        set: v => c.value = v
      });

      if ("development" !== 'production') {
        checkDuplicateProperties("Computed"
        /* COMPUTED */
        , key);
      }
    }
  }

  if (watchOptions) {
    deferredWatch.push(watchOptions);
  }

  if (!asMixin && deferredWatch.length) {
    deferredWatch.forEach(watchOptions => {
      for (const key in watchOptions) {
        createWatcher(watchOptions[key], ctx, publicThis, key);
      }
    });
  }

  if (provideOptions) {
    const provides = (0, _shared.isFunction)(provideOptions) ? provideOptions.call(publicThis) : provideOptions;

    for (const key in provides) {
      provide(key, provides[key]);
    }
  } // lifecycle options


  if (!asMixin) {
    callSyncHook('created', options, publicThis, globalMixins);
  }

  if (beforeMount) {
    onBeforeMount(beforeMount.bind(publicThis));
  }

  if (mounted) {
    onMounted(mounted.bind(publicThis));
  }

  if (beforeUpdate) {
    onBeforeUpdate(beforeUpdate.bind(publicThis));
  }

  if (updated) {
    onUpdated(updated.bind(publicThis));
  }

  if (activated) {
    onActivated(activated.bind(publicThis));
  }

  if (deactivated) {
    onDeactivated(deactivated.bind(publicThis));
  }

  if (errorCaptured) {
    onErrorCaptured(errorCaptured.bind(publicThis));
  }

  if (renderTracked) {
    onRenderTracked(renderTracked.bind(publicThis));
  }

  if (renderTriggered) {
    onRenderTriggered(renderTriggered.bind(publicThis));
  }

  if (beforeUnmount) {
    onBeforeUnmount(beforeUnmount.bind(publicThis));
  }

  if (unmounted) {
    onUnmounted(unmounted.bind(publicThis));
  }
}

function callSyncHook(name, options, ctx, globalMixins) {
  callHookFromMixins(name, globalMixins, ctx);
  const baseHook = options.extends && options.extends[name];

  if (baseHook) {
    baseHook.call(ctx);
  }

  const mixins = options.mixins;

  if (mixins) {
    callHookFromMixins(name, mixins, ctx);
  }

  const selfHook = options[name];

  if (selfHook) {
    selfHook.call(ctx);
  }
}

function callHookFromMixins(name, mixins, ctx) {
  for (let i = 0; i < mixins.length; i++) {
    const fn = mixins[i][name];

    if (fn) {
      fn.call(ctx);
    }
  }
}

function applyMixins(instance, mixins, deferredData, deferredWatch) {
  for (let i = 0; i < mixins.length; i++) {
    applyOptions(instance, mixins[i], deferredData, deferredWatch, true);
  }
}

function resolveData(instance, dataFn, publicThis) {
  const data = dataFn.call(publicThis, publicThis);

  if ("development" !== 'production' && (0, _shared.isPromise)(data)) {
    warn(`data() returned a Promise - note data() cannot be async; If you ` + `intend to perform data fetching before component renders, use ` + `async setup() + <Suspense>.`);
  }

  if (!(0, _shared.isObject)(data)) {
    "development" !== 'production' && warn(`data() should return an object.`);
  } else if (instance.data === _shared.EMPTY_OBJ) {
    instance.data = (0, _reactivity.reactive)(data);
  } else {
    // existing data: this is a mixin or extends.
    (0, _shared.extend)(instance.data, data);
  }
}

function createWatcher(raw, ctx, publicThis, key) {
  const getter = () => publicThis[key];

  if ((0, _shared.isString)(raw)) {
    const handler = ctx[raw];

    if ((0, _shared.isFunction)(handler)) {
      watch(getter, handler);
    } else if ("development" !== 'production') {
      warn(`Invalid watch handler specified by key "${raw}"`, handler);
    }
  } else if ((0, _shared.isFunction)(raw)) {
    watch(getter, raw.bind(publicThis));
  } else if ((0, _shared.isObject)(raw)) {
    if ((0, _shared.isArray)(raw)) {
      raw.forEach(r => createWatcher(r, ctx, publicThis, key));
    } else {
      watch(getter, raw.handler.bind(publicThis), raw);
    }
  } else if ("development" !== 'production') {
    warn(`Invalid watch option: "${key}"`);
  }
}

function resolveMergedOptions(instance) {
  const raw = instance.type;
  const {
    __merged,
    mixins,
    extends: extendsOptions
  } = raw;
  if (__merged) return __merged;
  const globalMixins = instance.appContext.mixins;
  if (!globalMixins.length && !mixins && !extendsOptions) return raw;
  const options = {};
  globalMixins.forEach(m => mergeOptions(options, m, instance));
  extendsOptions && mergeOptions(options, extendsOptions, instance);
  mixins && mixins.forEach(m => mergeOptions(options, m, instance));
  mergeOptions(options, raw, instance);
  return raw.__merged = options;
}

function mergeOptions(to, from, instance) {
  const strats = instance.appContext.config.optionMergeStrategies;

  for (const key in from) {
    if (strats && (0, _shared.hasOwn)(strats, key)) {
      to[key] = strats[key](to[key], from[key], instance.proxy, key);
    } else if (!(0, _shared.hasOwn)(to, key)) {
      to[key] = from[key];
    }
  }
}

const publicPropertiesMap = (0, _shared.extend)(Object.create(null), {
  $: i => i,
  $el: i => i.vnode.el,
  $data: i => i.data,
  $props: i => "development" !== 'production' ? (0, _reactivity.shallowReadonly)(i.props) : i.props,
  $attrs: i => "development" !== 'production' ? (0, _reactivity.shallowReadonly)(i.attrs) : i.attrs,
  $slots: i => "development" !== 'production' ? (0, _reactivity.shallowReadonly)(i.slots) : i.slots,
  $refs: i => "development" !== 'production' ? (0, _reactivity.shallowReadonly)(i.refs) : i.refs,
  $parent: i => i.parent && i.parent.proxy,
  $root: i => i.root && i.root.proxy,
  $emit: i => i.emit,
  $options: i => __VUE_OPTIONS_API__ ? resolveMergedOptions(i) : i.type,
  $forceUpdate: i => () => queueJob(i.update),
  $nextTick: () => nextTick,
  $watch: i => __VUE_OPTIONS_API__ ? instanceWatch.bind(i) : _shared.NOOP
});
const PublicInstanceProxyHandlers = {
  get({
    _: instance
  }, key) {
    const {
      ctx,
      setupState,
      data,
      props,
      accessCache,
      type,
      appContext
    } = instance; // let @vue/reactivity know it should never observe Vue public instances.

    if (key === "__v_skip"
    /* SKIP */
    ) {
        return true;
      } // data / props / ctx
    // This getter gets called for every property access on the render context
    // during render and is a major hotspot. The most expensive part of this
    // is the multiple hasOwn() calls. It's much faster to do a simple property
    // access on a plain object, so we use an accessCache object (with null
    // prototype) to memoize what access type a key corresponds to.


    let normalizedProps;

    if (key[0] !== '$') {
      const n = accessCache[key];

      if (n !== undefined) {
        switch (n) {
          case 0
          /* SETUP */
          :
            return setupState[key];

          case 1
          /* DATA */
          :
            return data[key];

          case 3
          /* CONTEXT */
          :
            return ctx[key];

          case 2
          /* PROPS */
          :
            return props[key];
          // default: just fallthrough
        }
      } else if (setupState !== _shared.EMPTY_OBJ && (0, _shared.hasOwn)(setupState, key)) {
        accessCache[key] = 0
        /* SETUP */
        ;
        return setupState[key];
      } else if (data !== _shared.EMPTY_OBJ && (0, _shared.hasOwn)(data, key)) {
        accessCache[key] = 1
        /* DATA */
        ;
        return data[key];
      } else if ( // only cache other properties when instance has declared (thus stable)
      // props
      (normalizedProps = normalizePropsOptions(type)[0]) && (0, _shared.hasOwn)(normalizedProps, key)) {
        accessCache[key] = 2
        /* PROPS */
        ;
        return props[key];
      } else if (ctx !== _shared.EMPTY_OBJ && (0, _shared.hasOwn)(ctx, key)) {
        accessCache[key] = 3
        /* CONTEXT */
        ;
        return ctx[key];
      } else {
        accessCache[key] = 4
        /* OTHER */
        ;
      }
    }

    const publicGetter = publicPropertiesMap[key];
    let cssModule, globalProperties; // public $xxx properties

    if (publicGetter) {
      if (key === '$attrs') {
        (0, _reactivity.track)(instance, "get"
        /* GET */
        , key);
        "development" !== 'production' && markAttrsAccessed();
      }

      return publicGetter(instance);
    } else if ( // css module (injected by vue-loader)
    (cssModule = type.__cssModules) && (cssModule = cssModule[key])) {
      return cssModule;
    } else if (ctx !== _shared.EMPTY_OBJ && (0, _shared.hasOwn)(ctx, key)) {
      // user may set custom properties to `this` that start with `$`
      accessCache[key] = 3
      /* CONTEXT */
      ;
      return ctx[key];
    } else if ( // global properties
    globalProperties = appContext.config.globalProperties, (0, _shared.hasOwn)(globalProperties, key)) {
      return globalProperties[key];
    } else if ("development" !== 'production' && currentRenderingInstance && // #1091 avoid internal isRef/isVNode checks on component instance leading
    // to infinite warning loop
    key.indexOf('__v') !== 0) {
      if (data !== _shared.EMPTY_OBJ && key[0] === '$' && (0, _shared.hasOwn)(data, key)) {
        warn(`Property ${JSON.stringify(key)} must be accessed via $data because it starts with a reserved ` + `character and is not proxied on the render context.`);
      } else {
        warn(`Property ${JSON.stringify(key)} was accessed during render ` + `but is not defined on instance.`);
      }
    }
  },

  set({
    _: instance
  }, key, value) {
    const {
      data,
      setupState,
      ctx
    } = instance;

    if (setupState !== _shared.EMPTY_OBJ && (0, _shared.hasOwn)(setupState, key)) {
      setupState[key] = value;
    } else if (data !== _shared.EMPTY_OBJ && (0, _shared.hasOwn)(data, key)) {
      data[key] = value;
    } else if (key in instance.props) {
      "development" !== 'production' && warn(`Attempting to mutate prop "${key}". Props are readonly.`, instance);
      return false;
    }

    if (key[0] === '$' && key.slice(1) in instance) {
      "development" !== 'production' && warn(`Attempting to mutate public property "${key}". ` + `Properties starting with $ are reserved and readonly.`, instance);
      return false;
    } else {
      if ("development" !== 'production' && key in instance.appContext.config.globalProperties) {
        Object.defineProperty(ctx, key, {
          enumerable: true,
          configurable: true,
          value
        });
      } else {
        ctx[key] = value;
      }
    }

    return true;
  },

  has({
    _: {
      data,
      setupState,
      accessCache,
      ctx,
      type,
      appContext
    }
  }, key) {
    let normalizedProps;
    return accessCache[key] !== undefined || data !== _shared.EMPTY_OBJ && (0, _shared.hasOwn)(data, key) || setupState !== _shared.EMPTY_OBJ && (0, _shared.hasOwn)(setupState, key) || (normalizedProps = normalizePropsOptions(type)[0]) && (0, _shared.hasOwn)(normalizedProps, key) || (0, _shared.hasOwn)(ctx, key) || (0, _shared.hasOwn)(publicPropertiesMap, key) || (0, _shared.hasOwn)(appContext.config.globalProperties, key);
  }

};

if ("development" !== 'production' && !false) {
  PublicInstanceProxyHandlers.ownKeys = target => {
    warn(`Avoid app logic that relies on enumerating keys on a component instance. ` + `The keys will be empty in production mode to avoid performance overhead.`);
    return Reflect.ownKeys(target);
  };
}

const RuntimeCompiledPublicInstanceProxyHandlers = (0, _shared.extend)({}, PublicInstanceProxyHandlers, {
  get(target, key) {
    // fast path for unscopables when using `with` block
    if (key === Symbol.unscopables) {
      return;
    }

    return PublicInstanceProxyHandlers.get(target, key, target);
  },

  has(_, key) {
    const has = key[0] !== '_' && !(0, _shared.isGloballyWhitelisted)(key);

    if ("development" !== 'production' && !has && PublicInstanceProxyHandlers.has(_, key)) {
      warn(`Property ${JSON.stringify(key)} should not start with _ which is a reserved prefix for Vue internals.`);
    }

    return has;
  }

}); // In dev mode, the proxy target exposes the same properties as seen on `this`
// for easier console inspection. In prod mode it will be an empty object so
// these properties definitions can be skipped.

function createRenderContext(instance) {
  const target = {}; // expose internal instance for proxy handlers

  Object.defineProperty(target, `_`, {
    configurable: true,
    enumerable: false,
    get: () => instance
  }); // expose public properties

  Object.keys(publicPropertiesMap).forEach(key => {
    Object.defineProperty(target, key, {
      configurable: true,
      enumerable: false,
      get: () => publicPropertiesMap[key](instance),
      // intercepted by the proxy so no need for implementation,
      // but needed to prevent set errors
      set: _shared.NOOP
    });
  }); // expose global properties

  const {
    globalProperties
  } = instance.appContext.config;
  Object.keys(globalProperties).forEach(key => {
    Object.defineProperty(target, key, {
      configurable: true,
      enumerable: false,
      get: () => globalProperties[key],
      set: _shared.NOOP
    });
  });
  return target;
} // dev only


function exposePropsOnRenderContext(instance) {
  const {
    ctx,
    type
  } = instance;
  const propsOptions = normalizePropsOptions(type)[0];

  if (propsOptions) {
    Object.keys(propsOptions).forEach(key => {
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => instance.props[key],
        set: _shared.NOOP
      });
    });
  }
} // dev only


function exposeSetupStateOnRenderContext(instance) {
  const {
    ctx,
    setupState
  } = instance;
  Object.keys((0, _reactivity.toRaw)(setupState)).forEach(key => {
    Object.defineProperty(ctx, key, {
      enumerable: true,
      configurable: true,
      get: () => setupState[key],
      set: _shared.NOOP
    });
  });
}

const emptyAppContext = createAppContext();
let uid = 0;

function createComponentInstance(vnode, parent, suspense) {
  const type = vnode.type; // inherit parent app context - or - if root, adopt from root vnode

  const appContext = (parent ? parent.appContext : vnode.appContext) || emptyAppContext;
  const instance = {
    uid: uid++,
    vnode,
    type,
    parent,
    appContext,
    root: null,
    next: null,
    subTree: null,
    update: null,
    render: null,
    proxy: null,
    withProxy: null,
    effects: null,
    provides: parent ? parent.provides : Object.create(appContext.provides),
    accessCache: null,
    renderCache: [],
    // state
    ctx: _shared.EMPTY_OBJ,
    data: _shared.EMPTY_OBJ,
    props: _shared.EMPTY_OBJ,
    attrs: _shared.EMPTY_OBJ,
    slots: _shared.EMPTY_OBJ,
    refs: _shared.EMPTY_OBJ,
    setupState: _shared.EMPTY_OBJ,
    setupContext: null,
    // suspense related
    suspense,
    asyncDep: null,
    asyncResolved: false,
    // lifecycle hooks
    // not using enums here because it results in computed properties
    isMounted: false,
    isUnmounted: false,
    isDeactivated: false,
    bc: null,
    c: null,
    bm: null,
    m: null,
    bu: null,
    u: null,
    um: null,
    bum: null,
    da: null,
    a: null,
    rtg: null,
    rtc: null,
    ec: null,
    emit: null,
    emitted: null
  };

  if ("development" !== 'production') {
    instance.ctx = createRenderContext(instance);
  } else {
    instance.ctx = {
      _: instance
    };
  }

  instance.root = parent ? parent.root : instance;
  instance.emit = emit.bind(null, instance);

  if ("development" !== 'production' || __VUE_PROD_DEVTOOLS__) {
    devtoolsComponentAdded(instance);
  }

  return instance;
}

let currentInstance = null;

const getCurrentInstance = () => currentInstance || currentRenderingInstance;

exports.getCurrentInstance = getCurrentInstance;

const setCurrentInstance = instance => {
  currentInstance = instance;
};

const isBuiltInTag = /*#__PURE__*/(0, _shared.makeMap)('slot,component');

function validateComponentName(name, config) {
  const appIsNativeTag = config.isNativeTag || _shared.NO;

  if (isBuiltInTag(name) || appIsNativeTag(name)) {
    warn('Do not use built-in or reserved HTML elements as component id: ' + name);
  }
}

let isInSSRComponentSetup = false;

function setupComponent(instance, isSSR = false) {
  isInSSRComponentSetup = isSSR;
  const {
    props,
    children,
    shapeFlag
  } = instance.vnode;
  const isStateful = shapeFlag & 4
  /* STATEFUL_COMPONENT */
  ;
  initProps(instance, props, isStateful, isSSR);
  initSlots(instance, children);
  const setupResult = isStateful ? setupStatefulComponent(instance, isSSR) : undefined;
  isInSSRComponentSetup = false;
  return setupResult;
}

function setupStatefulComponent(instance, isSSR) {
  const Component = instance.type;

  if ("development" !== 'production') {
    if (Component.name) {
      validateComponentName(Component.name, instance.appContext.config);
    }

    if (Component.components) {
      const names = Object.keys(Component.components);

      for (let i = 0; i < names.length; i++) {
        validateComponentName(names[i], instance.appContext.config);
      }
    }

    if (Component.directives) {
      const names = Object.keys(Component.directives);

      for (let i = 0; i < names.length; i++) {
        validateDirectiveName(names[i]);
      }
    }
  } // 0. create render proxy property access cache


  instance.accessCache = {}; // 1. create public instance / render proxy
  // also mark it raw so it's never observed

  instance.proxy = new Proxy(instance.ctx, PublicInstanceProxyHandlers);

  if ("development" !== 'production') {
    exposePropsOnRenderContext(instance);
  } // 2. call setup()


  const {
    setup
  } = Component;

  if (setup) {
    const setupContext = instance.setupContext = setup.length > 1 ? createSetupContext(instance) : null;
    currentInstance = instance;
    (0, _reactivity.pauseTracking)();
    const setupResult = callWithErrorHandling(setup, instance, 0
    /* SETUP_FUNCTION */
    , ["development" !== 'production' ? (0, _reactivity.shallowReadonly)(instance.props) : instance.props, setupContext]);
    (0, _reactivity.resetTracking)();
    currentInstance = null;

    if ((0, _shared.isPromise)(setupResult)) {
      if (isSSR) {
        // return the promise so server-renderer can wait on it
        return setupResult.then(resolvedResult => {
          handleSetupResult(instance, resolvedResult);
        });
      } else {
        // async setup returned Promise.
        // bail here and wait for re-entry.
        instance.asyncDep = setupResult;
      }
    } else {
      handleSetupResult(instance, setupResult);
    }
  } else {
    finishComponentSetup(instance);
  }
}

function handleSetupResult(instance, setupResult, isSSR) {
  if ((0, _shared.isFunction)(setupResult)) {
    // setup returned an inline render function
    instance.render = setupResult;
  } else if ((0, _shared.isObject)(setupResult)) {
    if ("development" !== 'production' && isVNode(setupResult)) {
      warn(`setup() should not return VNodes directly - ` + `return a render function instead.`);
    } // setup returned bindings.
    // assuming a render function compiled from template is present.


    instance.setupState = (0, _reactivity.proxyRefs)(setupResult);

    if ("development" !== 'production') {
      exposeSetupStateOnRenderContext(instance);
    }
  } else if ("development" !== 'production' && setupResult !== undefined) {
    warn(`setup() should return an object. Received: ${setupResult === null ? 'null' : typeof setupResult}`);
  }

  finishComponentSetup(instance);
}

let compile;
/**
 * For runtime-dom to register the compiler.
 * Note the exported method uses any to avoid d.ts relying on the compiler types.
 */

function registerRuntimeCompiler(_compile) {
  compile = _compile;
}

function finishComponentSetup(instance, isSSR) {
  const Component = instance.type; // template / render function normalization

  if (!instance.render) {
    // could be set from setup()
    if (compile && Component.template && !Component.render) {
      if ("development" !== 'production') {
        startMeasure(instance, `compile`);
      }

      Component.render = compile(Component.template, {
        isCustomElement: instance.appContext.config.isCustomElement,
        delimiters: Component.delimiters
      });

      if ("development" !== 'production') {
        endMeasure(instance, `compile`);
      }
    }

    instance.render = Component.render || _shared.NOOP; // for runtime-compiled render functions using `with` blocks, the render
    // proxy used needs a different `has` handler which is more performant and
    // also only allows a whitelist of globals to fallthrough.

    if (instance.render._rc) {
      instance.withProxy = new Proxy(instance.ctx, RuntimeCompiledPublicInstanceProxyHandlers);
    }
  } // support for 2.x options


  if (__VUE_OPTIONS_API__) {
    currentInstance = instance;
    applyOptions(instance, Component);
    currentInstance = null;
  } // warn missing template/render


  if ("development" !== 'production' && !Component.render && instance.render === _shared.NOOP) {
    /* istanbul ignore if */
    if (!compile && Component.template) {
      warn(`Component provided template option but ` + `runtime compilation is not supported in this build of Vue.` + ` Configure your bundler to alias "vue" to "vue/dist/vue.esm-bundler.js".`
      /* should not happen */
      );
    } else {
      warn(`Component is missing template or render function.`);
    }
  }
}

const attrHandlers = {
  get: (target, key) => {
    if ("development" !== 'production') {
      markAttrsAccessed();
    }

    return target[key];
  },
  set: () => {
    warn(`setupContext.attrs is readonly.`);
    return false;
  },
  deleteProperty: () => {
    warn(`setupContext.attrs is readonly.`);
    return false;
  }
};

function createSetupContext(instance) {
  if ("development" !== 'production') {
    // We use getters in dev in case libs like test-utils overwrite instance
    // properties (overwrites should not be done in prod)
    return Object.freeze({
      get attrs() {
        return new Proxy(instance.attrs, attrHandlers);
      },

      get slots() {
        return (0, _reactivity.shallowReadonly)(instance.slots);
      },

      get emit() {
        return (event, ...args) => instance.emit(event, ...args);
      }

    });
  } else {
    return {
      attrs: instance.attrs,
      slots: instance.slots,
      emit: instance.emit
    };
  }
} // record effects created during a component's setup() so that they can be
// stopped when the component unmounts


function recordInstanceBoundEffect(effect) {
  if (currentInstance) {
    (currentInstance.effects || (currentInstance.effects = [])).push(effect);
  }
}

const classifyRE = /(?:^|[-_])(\w)/g;

const classify = str => str.replace(classifyRE, c => c.toUpperCase()).replace(/[-_]/g, '');
/* istanbul ignore next */


function formatComponentName(instance, Component, isRoot = false) {
  let name = (0, _shared.isFunction)(Component) ? Component.displayName || Component.name : Component.name;

  if (!name && Component.__file) {
    const match = Component.__file.match(/([^/\\]+)\.vue$/);

    if (match) {
      name = match[1];
    }
  }

  if (!name && instance && instance.parent) {
    // try to infer the name based on reverse resolution
    const inferFromRegistry = registry => {
      for (const key in registry) {
        if (registry[key] === Component) {
          return key;
        }
      }
    };

    name = inferFromRegistry(instance.parent.type.components) || inferFromRegistry(instance.appContext.components);
  }

  return name ? classify(name) : isRoot ? `App` : `Anonymous`;
}

function computed(getterOrOptions) {
  const c = (0, _reactivity.computed)(getterOrOptions);
  recordInstanceBoundEffect(c.effect);
  return c;
} // implementation, close to no-op


function defineComponent(options) {
  return (0, _shared.isFunction)(options) ? {
    setup: options,
    name: options.name
  } : options;
}

function defineAsyncComponent(source) {
  if ((0, _shared.isFunction)(source)) {
    source = {
      loader: source
    };
  }

  const {
    loader,
    loadingComponent: loadingComponent,
    errorComponent: errorComponent,
    delay = 200,
    timeout,
    // undefined = never times out
    suspensible = true,
    onError: userOnError
  } = source;
  let pendingRequest = null;
  let resolvedComp;
  let retries = 0;

  const retry = () => {
    retries++;
    pendingRequest = null;
    return load();
  };

  const load = () => {
    let thisRequest;
    return pendingRequest || (thisRequest = pendingRequest = loader().catch(err => {
      err = err instanceof Error ? err : new Error(String(err));

      if (userOnError) {
        return new Promise((resolve, reject) => {
          const userRetry = () => resolve(retry());

          const userFail = () => reject(err);

          userOnError(err, userRetry, userFail, retries + 1);
        });
      } else {
        throw err;
      }
    }).then(comp => {
      if (thisRequest !== pendingRequest && pendingRequest) {
        return pendingRequest;
      }

      if ("development" !== 'production' && !comp) {
        warn(`Async component loader resolved to undefined. ` + `If you are using retry(), make sure to return its return value.`);
      } // interop module default


      if (comp && (comp.__esModule || comp[Symbol.toStringTag] === 'Module')) {
        comp = comp.default;
      }

      if ("development" !== 'production' && comp && !(0, _shared.isObject)(comp) && !(0, _shared.isFunction)(comp)) {
        throw new Error(`Invalid async component load result: ${comp}`);
      }

      resolvedComp = comp;
      return comp;
    }));
  };

  return defineComponent({
    __asyncLoader: load,
    name: 'AsyncComponentWrapper',

    setup() {
      const instance = currentInstance; // already resolved

      if (resolvedComp) {
        return () => createInnerComp(resolvedComp, instance);
      }

      const onError = err => {
        pendingRequest = null;
        handleError(err, instance, 13
        /* ASYNC_COMPONENT_LOADER */
        );
      }; // suspense-controlled or SSR.


      if (suspensible && instance.suspense || false) {
        return load().then(comp => {
          return () => createInnerComp(comp, instance);
        }).catch(err => {
          onError(err);
          return () => errorComponent ? createVNode(errorComponent, {
            error: err
          }) : null;
        });
      }

      const loaded = (0, _reactivity.ref)(false);
      const error = (0, _reactivity.ref)();
      const delayed = (0, _reactivity.ref)(!!delay);

      if (delay) {
        setTimeout(() => {
          delayed.value = false;
        }, delay);
      }

      if (timeout != null) {
        setTimeout(() => {
          if (!loaded.value) {
            const err = new Error(`Async component timed out after ${timeout}ms.`);
            onError(err);
            error.value = err;
          }
        }, timeout);
      }

      load().then(() => {
        loaded.value = true;
      }).catch(err => {
        onError(err);
        error.value = err;
      });
      return () => {
        if (loaded.value && resolvedComp) {
          return createInnerComp(resolvedComp, instance);
        } else if (error.value && errorComponent) {
          return createVNode(errorComponent, {
            error: error.value
          });
        } else if (loadingComponent && !delayed.value) {
          return createVNode(loadingComponent);
        }
      };
    }

  });
}

function createInnerComp(comp, {
  vnode: {
    props,
    children
  }
}) {
  return createVNode(comp, props, children);
} // Actual implementation


function h(type, propsOrChildren, children) {
  if (arguments.length === 2) {
    if ((0, _shared.isObject)(propsOrChildren) && !(0, _shared.isArray)(propsOrChildren)) {
      // single vnode without props
      if (isVNode(propsOrChildren)) {
        return createVNode(type, null, [propsOrChildren]);
      } // props without children


      return createVNode(type, propsOrChildren);
    } else {
      // omit props
      return createVNode(type, null, propsOrChildren);
    }
  } else {
    if (isVNode(children)) {
      children = [children];
    }

    return createVNode(type, propsOrChildren, children);
  }
}

const ssrContextKey = Symbol("development" !== 'production' ? `ssrContext` : ``);
exports.ssrContextKey = ssrContextKey;

const useSSRContext = () => {
  {
    const ctx = inject(ssrContextKey);

    if (!ctx) {
      warn(`Server rendering context not provided. Make sure to only call ` + `useSsrContext() conditionally in the server build.`);
    }

    return ctx;
  }
};
/**
 * Actual implementation
 */


exports.useSSRContext = useSSRContext;

function renderList(source, renderItem) {
  let ret;

  if ((0, _shared.isArray)(source) || (0, _shared.isString)(source)) {
    ret = new Array(source.length);

    for (let i = 0, l = source.length; i < l; i++) {
      ret[i] = renderItem(source[i], i);
    }
  } else if (typeof source === 'number') {
    ret = new Array(source);

    for (let i = 0; i < source; i++) {
      ret[i] = renderItem(i + 1, i);
    }
  } else if ((0, _shared.isObject)(source)) {
    if (source[Symbol.iterator]) {
      ret = Array.from(source, renderItem);
    } else {
      const keys = Object.keys(source);
      ret = new Array(keys.length);

      for (let i = 0, l = keys.length; i < l; i++) {
        const key = keys[i];
        ret[i] = renderItem(source[key], key, i);
      }
    }
  } else {
    ret = [];
  }

  return ret;
}
/**
 * For prefixing keys in v-on="obj" with "on"
 * @private
 */


function toHandlers(obj) {
  const ret = {};

  if ("development" !== 'production' && !(0, _shared.isObject)(obj)) {
    warn(`v-on with no argument expects an object value.`);
    return ret;
  }

  for (const key in obj) {
    ret[`on${(0, _shared.capitalize)(key)}`] = obj[key];
  }

  return ret;
}
/**
 * Compiler runtime helper for rendering `<slot/>`
 * @private
 */


function renderSlot(slots, name, props = {}, // this is not a user-facing function, so the fallback is always generated by
// the compiler and guaranteed to be a function returning an array
fallback) {
  let slot = slots[name];

  if ("development" !== 'production' && slot && slot.length > 1) {
    warn(`SSR-optimized slot function detected in a non-SSR-optimized render ` + `function. You need to mark this component with $dynamic-slots in the ` + `parent template.`);

    slot = () => [];
  }

  return openBlock(), createBlock(Fragment, {
    key: props.key
  }, slot ? slot(props) : fallback ? fallback() : [], slots._ === 1
  /* STABLE */
  ? 64
  /* STABLE_FRAGMENT */
  : -2
  /* BAIL */
  );
}
/**
 * Compiler runtime helper for creating dynamic slots object
 * @private
 */


function createSlots(slots, dynamicSlots) {
  for (let i = 0; i < dynamicSlots.length; i++) {
    const slot = dynamicSlots[i]; // array of dynamic slot generated by <template v-for="..." #[...]>

    if ((0, _shared.isArray)(slot)) {
      for (let j = 0; j < slot.length; j++) {
        slots[slot[j].name] = slot[j].fn;
      }
    } else if (slot) {
      // conditional single slot generated by <template v-if="..." #foo>
      slots[slot.name] = slot.fn;
    }
  }

  return slots;
} // Core API ------------------------------------------------------------------


const version = "3.0.0-rc.5";
/**
 * SSR utils for \@vue/server-renderer. Only exposed in cjs builds.
 * @internal
 */

exports.version = version;
const ssrUtils = null;
exports.ssrUtils = ssrUtils;
},{"@vue/reactivity":"../node_modules/@vue/reactivity/dist/reactivity.esm-bundler.js","@vue/shared":"../node_modules/@vue/shared/dist/shared.esm-bundler.js"}],"../node_modules/@vue/runtime-dom/dist/runtime-dom.esm-bundler.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  Transition: true,
  TransitionGroup: true,
  createApp: true,
  createSSRApp: true,
  hydrate: true,
  render: true,
  useCssModule: true,
  useCssVars: true,
  vModelCheckbox: true,
  vModelDynamic: true,
  vModelRadio: true,
  vModelSelect: true,
  vModelText: true,
  vShow: true,
  withKeys: true,
  withModifiers: true
};
exports.useCssModule = useCssModule;
exports.useCssVars = useCssVars;
exports.withModifiers = exports.withKeys = exports.vShow = exports.vModelText = exports.vModelSelect = exports.vModelRadio = exports.vModelDynamic = exports.vModelCheckbox = exports.render = exports.hydrate = exports.createSSRApp = exports.createApp = exports.TransitionGroup = exports.Transition = void 0;

var _runtimeCore = require("@vue/runtime-core");

Object.keys(_runtimeCore).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _runtimeCore[key];
    }
  });
});

var _shared = require("@vue/shared");

const svgNS = 'http://www.w3.org/2000/svg';
const doc = typeof document !== 'undefined' ? document : null;
let tempContainer;
let tempSVGContainer;
const nodeOps = {
  insert: (child, parent, anchor) => {
    parent.insertBefore(child, anchor || null);
  },
  remove: child => {
    const parent = child.parentNode;

    if (parent) {
      parent.removeChild(child);
    }
  },
  createElement: (tag, isSVG, is) => isSVG ? doc.createElementNS(svgNS, tag) : doc.createElement(tag, is ? {
    is
  } : undefined),
  createText: text => doc.createTextNode(text),
  createComment: text => doc.createComment(text),
  setText: (node, text) => {
    node.nodeValue = text;
  },
  setElementText: (el, text) => {
    el.textContent = text;
  },
  parentNode: node => node.parentNode,
  nextSibling: node => node.nextSibling,
  querySelector: selector => doc.querySelector(selector),

  setScopeId(el, id) {
    el.setAttribute(id, '');
  },

  cloneNode(el) {
    return el.cloneNode(true);
  },

  // __UNSAFE__
  // Reason: innerHTML.
  // Static content here can only come from compiled templates.
  // As long as the user only uses trusted templates, this is safe.
  insertStaticContent(content, parent, anchor, isSVG) {
    const temp = isSVG ? tempSVGContainer || (tempSVGContainer = doc.createElementNS(svgNS, 'svg')) : tempContainer || (tempContainer = doc.createElement('div'));
    temp.innerHTML = content;
    const first = temp.firstChild;
    let node = first;
    let last = node;

    while (node) {
      last = node;
      nodeOps.insert(node, parent, anchor);
      node = temp.firstChild;
    }

    return [first, last];
  }

}; // compiler should normalize class + :class bindings on the same element
// into a single binding ['staticClass', dynamic]

function patchClass(el, value, isSVG) {
  if (value == null) {
    value = '';
  }

  if (isSVG) {
    el.setAttribute('class', value);
  } else {
    // directly setting className should be faster than setAttribute in theory
    // if this is an element during a transition, take the temporary transition
    // classes into account.
    const transitionClasses = el._vtc;

    if (transitionClasses) {
      value = (value ? [value, ...transitionClasses] : [...transitionClasses]).join(' ');
    }

    el.className = value;
  }
}

function patchStyle(el, prev, next) {
  const style = el.style;

  if (!next) {
    el.removeAttribute('style');
  } else if ((0, _shared.isString)(next)) {
    if (prev !== next) {
      style.cssText = next;
    }
  } else {
    for (const key in next) {
      setStyle(style, key, next[key]);
    }

    if (prev && !(0, _shared.isString)(prev)) {
      for (const key in prev) {
        if (next[key] == null) {
          setStyle(style, key, '');
        }
      }
    }
  }
}

const importantRE = /\s*!important$/;

function setStyle(style, name, val) {
  if (name.startsWith('--')) {
    // custom property definition
    style.setProperty(name, val);
  } else {
    const prefixed = autoPrefix(style, name);

    if (importantRE.test(val)) {
      // !important
      style.setProperty((0, _shared.hyphenate)(prefixed), val.replace(importantRE, ''), 'important');
    } else {
      style[prefixed] = val;
    }
  }
}

const prefixes = ['Webkit', 'Moz', 'ms'];
const prefixCache = {};

function autoPrefix(style, rawName) {
  const cached = prefixCache[rawName];

  if (cached) {
    return cached;
  }

  let name = (0, _runtimeCore.camelize)(rawName);

  if (name !== 'filter' && name in style) {
    return prefixCache[rawName] = name;
  }

  name = (0, _shared.capitalize)(name);

  for (let i = 0; i < prefixes.length; i++) {
    const prefixed = prefixes[i] + name;

    if (prefixed in style) {
      return prefixCache[rawName] = prefixed;
    }
  }

  return rawName;
}

const xlinkNS = 'http://www.w3.org/1999/xlink';

function patchAttr(el, key, value, isSVG) {
  if (isSVG && key.startsWith('xlink:')) {
    if (value == null) {
      el.removeAttributeNS(xlinkNS, key.slice(6, key.length));
    } else {
      el.setAttributeNS(xlinkNS, key, value);
    }
  } else {
    // note we are only checking boolean attributes that don't have a
    // corresponding dom prop of the same name here.
    const isBoolean = (0, _shared.isSpecialBooleanAttr)(key);

    if (value == null || isBoolean && value === false) {
      el.removeAttribute(key);
    } else {
      el.setAttribute(key, isBoolean ? '' : value);
    }
  }
} // __UNSAFE__
// functions. The user is responsible for using them with only trusted content.


function patchDOMProp(el, key, value, // the following args are passed only due to potential innerHTML/textContent
// overriding existing VNodes, in which case the old tree must be properly
// unmounted.
prevChildren, parentComponent, parentSuspense, unmountChildren) {
  if (key === 'innerHTML' || key === 'textContent') {
    if (prevChildren) {
      unmountChildren(prevChildren, parentComponent, parentSuspense);
    }

    el[key] = value == null ? '' : value;
    return;
  }

  if (key === 'value' && el.tagName !== 'PROGRESS') {
    // store value as _value as well since
    // non-string values will be stringified.
    el._value = value;
    el.value = value == null ? '' : value;
    return;
  }

  if (value === '' && typeof el[key] === 'boolean') {
    // e.g. <select multiple> compiles to { multiple: '' }
    el[key] = true;
  } else if (value == null && typeof el[key] === 'string') {
    // e.g. <div :id="null">
    el[key] = '';
    el.removeAttribute(key);
  } else {
    // some properties perform value validation and throw
    try {
      el[key] = value;
    } catch (e) {
      if ("development" !== 'production') {
        (0, _runtimeCore.warn)(`Failed setting prop "${key}" on <${el.tagName.toLowerCase()}>: ` + `value ${value} is invalid.`, e);
      }
    }
  }
} // Async edge case fix requires storing an event listener's attach timestamp.


let _getNow = Date.now; // Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.

if (typeof document !== 'undefined' && _getNow() > document.createEvent('Event').timeStamp) {
  // if the low-res timestamp which is bigger than the event timestamp
  // (which is evaluated AFTER) it means the event is using a hi-res timestamp,
  // and we need to use the hi-res version for event listeners as well.
  _getNow = () => performance.now();
} // To avoid the overhead of repeatedly calling performance.now(), we cache
// and use the same timestamp for all event listeners attached in the same tick.


let cachedNow = 0;
const p = Promise.resolve();

const reset = () => {
  cachedNow = 0;
};

const getNow = () => cachedNow || (p.then(reset), cachedNow = _getNow());

function addEventListener(el, event, handler, options) {
  el.addEventListener(event, handler, options);
}

function removeEventListener(el, event, handler, options) {
  el.removeEventListener(event, handler, options);
}

function patchEvent(el, rawName, prevValue, nextValue, instance = null) {
  const invoker = prevValue && prevValue.invoker;

  if (nextValue && invoker) {
    prevValue.invoker = null;
    invoker.value = nextValue;
    nextValue.invoker = invoker;
  } else {
    const [name, options] = parseName(rawName);

    if (nextValue) {
      addEventListener(el, name, createInvoker(nextValue, instance), options);
    } else if (invoker) {
      // remove
      removeEventListener(el, name, invoker, options);
    }
  }
}

const optionsModifierRE = /(?:Once|Passive|Capture)$/;

function parseName(name) {
  let options;

  if (optionsModifierRE.test(name)) {
    options = {};
    let m;

    while (m = name.match(optionsModifierRE)) {
      name = name.slice(0, name.length - m[0].length);
      options[m[0].toLowerCase()] = true;
    }
  }

  return [name.slice(2).toLowerCase(), options];
}

function createInvoker(initialValue, instance) {
  const invoker = e => {
    // async edge case #6566: inner click event triggers patch, event handler
    // attached to outer element during patch, and triggered again. This
    // happens because browsers fire microtask ticks between event propagation.
    // the solution is simple: we save the timestamp when a handler is attached,
    // and the handler would only fire if the event passed to it was fired
    // AFTER it was attached.
    const timeStamp = e.timeStamp || _getNow();

    if (timeStamp >= invoker.attached - 1) {
      (0, _runtimeCore.callWithAsyncErrorHandling)(patchStopImmediatePropagation(e, invoker.value), instance, 5
      /* NATIVE_EVENT_HANDLER */
      , [e]);
    }
  };

  invoker.value = initialValue;
  initialValue.invoker = invoker;
  invoker.attached = getNow();
  return invoker;
}

function patchStopImmediatePropagation(e, value) {
  if ((0, _shared.isArray)(value)) {
    const originalStop = e.stopImmediatePropagation;

    e.stopImmediatePropagation = () => {
      originalStop.call(e);
      e._stopped = true;
    };

    return value.map(fn => e => !e._stopped && fn(e));
  } else {
    return value;
  }
}

const nativeOnRE = /^on[a-z]/;

const forcePatchProp = (_, key) => key === 'value';

const patchProp = (el, key, prevValue, nextValue, isSVG = false, prevChildren, parentComponent, parentSuspense, unmountChildren) => {
  switch (key) {
    // special
    case 'class':
      patchClass(el, nextValue, isSVG);
      break;

    case 'style':
      patchStyle(el, prevValue, nextValue);
      break;

    default:
      if ((0, _shared.isOn)(key)) {
        // ignore v-model listeners
        if (!(0, _shared.isModelListener)(key)) {
          patchEvent(el, key, prevValue, nextValue, parentComponent);
        }
      } else if (shouldSetAsProp(el, key, nextValue, isSVG)) {
        patchDOMProp(el, key, nextValue, prevChildren, parentComponent, parentSuspense, unmountChildren);
      } else {
        // special case for <input v-model type="checkbox"> with
        // :true-value & :false-value
        // store value as dom properties since non-string values will be
        // stringified.
        if (key === 'true-value') {
          el._trueValue = nextValue;
        } else if (key === 'false-value') {
          el._falseValue = nextValue;
        }

        patchAttr(el, key, nextValue, isSVG);
      }

      break;
  }
};

function shouldSetAsProp(el, key, value, isSVG) {
  if (isSVG) {
    // most keys must be set as attribute on svg elements to work
    // ...except innerHTML
    if (key === 'innerHTML') {
      return true;
    } // or native onclick with function values


    if (key in el && nativeOnRE.test(key) && (0, _shared.isFunction)(value)) {
      return true;
    }

    return false;
  } // spellcheck and draggable are numerated attrs, however their
  // corresponding DOM properties are actually booleans - this leads to
  // setting it with a string "false" value leading it to be coerced to
  // `true`, so we need to always treat them as attributes.
  // Note that `contentEditable` doesn't have this problem: its DOM
  // property is also enumerated string values.


  if (key === 'spellcheck' || key === 'draggable') {
    return false;
  } // #1526 <input list> must be set as attribute


  if (key === 'list' && el.tagName === 'INPUT') {
    return false;
  } // native onclick with string value, must be set as attribute


  if (nativeOnRE.test(key) && (0, _shared.isString)(value)) {
    return false;
  }

  return key in el;
}

function useCssModule(name = '$style') {
  /* istanbul ignore else */
  {
    const instance = (0, _runtimeCore.getCurrentInstance)();

    if (!instance) {
      "development" !== 'production' && (0, _runtimeCore.warn)(`useCssModule must be called inside setup()`);
      return _shared.EMPTY_OBJ;
    }

    const modules = instance.type.__cssModules;

    if (!modules) {
      "development" !== 'production' && (0, _runtimeCore.warn)(`Current instance does not have CSS modules injected.`);
      return _shared.EMPTY_OBJ;
    }

    const mod = modules[name];

    if (!mod) {
      "development" !== 'production' && (0, _runtimeCore.warn)(`Current instance does not have CSS module named "${name}".`);
      return _shared.EMPTY_OBJ;
    }

    return mod;
  }
}

function useCssVars(getter, scoped = false) {
  const instance = (0, _runtimeCore.getCurrentInstance)();
  /* istanbul ignore next */

  if (!instance) {
    "development" !== 'production' && (0, _runtimeCore.warn)(`useCssVars is called without current active component instance.`);
    return;
  }

  const prefix = scoped && instance.type.__scopeId ? `${instance.type.__scopeId.replace(/^data-v-/, '')}-` : ``;
  (0, _runtimeCore.onMounted)(() => {
    (0, _runtimeCore.watchEffect)(() => {
      setVarsOnVNode(instance.subTree, getter(instance.proxy), prefix);
    });
  });
}

function setVarsOnVNode(vnode, vars, prefix) {
  if (vnode.shapeFlag & 128
  /* SUSPENSE */
  ) {
      const {
        isResolved,
        isHydrating,
        fallbackTree,
        subTree
      } = vnode.suspense;

      if (isResolved || isHydrating) {
        vnode = subTree;
      } else {
        vnode.suspense.effects.push(() => {
          setVarsOnVNode(subTree, vars, prefix);
        });
        vnode = fallbackTree;
      }
    } // drill down HOCs until it's a non-component vnode


  while (vnode.component) {
    vnode = vnode.component.subTree;
  }

  if (vnode.shapeFlag & 1
  /* ELEMENT */
  && vnode.el) {
    const style = vnode.el.style;

    for (const key in vars) {
      style.setProperty(`--${prefix}${key}`, (0, _runtimeCore.unref)(vars[key]));
    }
  } else if (vnode.type === _runtimeCore.Fragment) {
    vnode.children.forEach(c => setVarsOnVNode(c, vars, prefix));
  }
}

const TRANSITION = 'transition';
const ANIMATION = 'animation'; // DOM Transition is a higher-order-component based on the platform-agnostic
// base Transition component, with DOM-specific logic.

const Transition = (props, {
  slots
}) => (0, _runtimeCore.h)(_runtimeCore.BaseTransition, resolveTransitionProps(props), slots);

exports.Transition = Transition;
Transition.displayName = 'Transition';
const DOMTransitionPropsValidators = {
  name: String,
  type: String,
  css: {
    type: Boolean,
    default: true
  },
  duration: [String, Number, Object],
  enterFromClass: String,
  enterActiveClass: String,
  enterToClass: String,
  appearFromClass: String,
  appearActiveClass: String,
  appearToClass: String,
  leaveFromClass: String,
  leaveActiveClass: String,
  leaveToClass: String
};
const TransitionPropsValidators = Transition.props = /*#__PURE__*/(0, _shared.extend)({}, _runtimeCore.BaseTransition.props, DOMTransitionPropsValidators);

function resolveTransitionProps(rawProps) {
  let {
    name = 'v',
    type,
    css = true,
    duration,
    enterFromClass = `${name}-enter-from`,
    enterActiveClass = `${name}-enter-active`,
    enterToClass = `${name}-enter-to`,
    appearFromClass = enterFromClass,
    appearActiveClass = enterActiveClass,
    appearToClass = enterToClass,
    leaveFromClass = `${name}-leave-from`,
    leaveActiveClass = `${name}-leave-active`,
    leaveToClass = `${name}-leave-to`
  } = rawProps;
  const baseProps = {};

  for (const key in rawProps) {
    if (!(key in DOMTransitionPropsValidators)) {
      baseProps[key] = rawProps[key];
    }
  }

  if (!css) {
    return baseProps;
  }

  const durations = normalizeDuration(duration);
  const enterDuration = durations && durations[0];
  const leaveDuration = durations && durations[1];
  const {
    onBeforeEnter,
    onEnter,
    onEnterCancelled,
    onLeave,
    onLeaveCancelled,
    onBeforeAppear = onBeforeEnter,
    onAppear = onEnter,
    onAppearCancelled = onEnterCancelled
  } = baseProps;

  const finishEnter = (el, isAppear, done) => {
    removeTransitionClass(el, isAppear ? appearToClass : enterToClass);
    removeTransitionClass(el, isAppear ? appearActiveClass : enterActiveClass);
    done && done();
  };

  const finishLeave = (el, done) => {
    removeTransitionClass(el, leaveToClass);
    removeTransitionClass(el, leaveActiveClass);
    done && done();
  };

  const makeEnterHook = isAppear => {
    return (el, done) => {
      const hook = isAppear ? onAppear : onEnter;

      const resolve = () => finishEnter(el, isAppear, done);

      hook && hook(el, resolve);
      nextFrame(() => {
        removeTransitionClass(el, isAppear ? appearFromClass : enterFromClass);
        addTransitionClass(el, isAppear ? appearToClass : enterToClass);

        if (!(hook && hook.length > 1)) {
          if (enterDuration) {
            setTimeout(resolve, enterDuration);
          } else {
            whenTransitionEnds(el, type, resolve);
          }
        }
      });
    };
  };

  return (0, _shared.extend)(baseProps, {
    onBeforeEnter(el) {
      onBeforeEnter && onBeforeEnter(el);
      addTransitionClass(el, enterActiveClass);
      addTransitionClass(el, enterFromClass);
    },

    onBeforeAppear(el) {
      onBeforeAppear && onBeforeAppear(el);
      addTransitionClass(el, appearActiveClass);
      addTransitionClass(el, appearFromClass);
    },

    onEnter: makeEnterHook(false),
    onAppear: makeEnterHook(true),

    onLeave(el, done) {
      const resolve = () => finishLeave(el, done);

      addTransitionClass(el, leaveActiveClass);
      addTransitionClass(el, leaveFromClass);
      nextFrame(() => {
        removeTransitionClass(el, leaveFromClass);
        addTransitionClass(el, leaveToClass);

        if (!(onLeave && onLeave.length > 1)) {
          if (leaveDuration) {
            setTimeout(resolve, leaveDuration);
          } else {
            whenTransitionEnds(el, type, resolve);
          }
        }
      });
      onLeave && onLeave(el, resolve);
    },

    onEnterCancelled(el) {
      finishEnter(el, false);
      onEnterCancelled && onEnterCancelled(el);
    },

    onAppearCancelled(el) {
      finishEnter(el, true);
      onAppearCancelled && onAppearCancelled(el);
    },

    onLeaveCancelled(el) {
      finishLeave(el);
      onLeaveCancelled && onLeaveCancelled(el);
    }

  });
}

function normalizeDuration(duration) {
  if (duration == null) {
    return null;
  } else if ((0, _shared.isObject)(duration)) {
    return [NumberOf(duration.enter), NumberOf(duration.leave)];
  } else {
    const n = NumberOf(duration);
    return [n, n];
  }
}

function NumberOf(val) {
  const res = (0, _shared.toNumber)(val);
  if ("development" !== 'production') validateDuration(res);
  return res;
}

function validateDuration(val) {
  if (typeof val !== 'number') {
    (0, _runtimeCore.warn)(`<transition> explicit duration is not a valid number - ` + `got ${JSON.stringify(val)}.`);
  } else if (isNaN(val)) {
    (0, _runtimeCore.warn)(`<transition> explicit duration is NaN - ` + 'the duration expression might be incorrect.');
  }
}

function addTransitionClass(el, cls) {
  cls.split(/\s+/).forEach(c => c && el.classList.add(c));
  (el._vtc || (el._vtc = new Set())).add(cls);
}

function removeTransitionClass(el, cls) {
  cls.split(/\s+/).forEach(c => c && el.classList.remove(c));
  const {
    _vtc
  } = el;

  if (_vtc) {
    _vtc.delete(cls);

    if (!_vtc.size) {
      el._vtc = undefined;
    }
  }
}

function nextFrame(cb) {
  requestAnimationFrame(() => {
    requestAnimationFrame(cb);
  });
}

function whenTransitionEnds(el, expectedType, cb) {
  const {
    type,
    timeout,
    propCount
  } = getTransitionInfo(el, expectedType);

  if (!type) {
    return cb();
  }

  const endEvent = type + 'end';
  let ended = 0;

  const end = () => {
    el.removeEventListener(endEvent, onEnd);
    cb();
  };

  const onEnd = e => {
    if (e.target === el) {
      if (++ended >= propCount) {
        end();
      }
    }
  };

  setTimeout(() => {
    if (ended < propCount) {
      end();
    }
  }, timeout + 1);
  el.addEventListener(endEvent, onEnd);
}

function getTransitionInfo(el, expectedType) {
  const styles = window.getComputedStyle(el); // JSDOM may return undefined for transition properties

  const getStyleProperties = key => (styles[key] || '').split(', ');

  const transitionDelays = getStyleProperties(TRANSITION + 'Delay');
  const transitionDurations = getStyleProperties(TRANSITION + 'Duration');
  const transitionTimeout = getTimeout(transitionDelays, transitionDurations);
  const animationDelays = getStyleProperties(ANIMATION + 'Delay');
  const animationDurations = getStyleProperties(ANIMATION + 'Duration');
  const animationTimeout = getTimeout(animationDelays, animationDurations);
  let type = null;
  let timeout = 0;
  let propCount = 0;
  /* istanbul ignore if */

  if (expectedType === TRANSITION) {
    if (transitionTimeout > 0) {
      type = TRANSITION;
      timeout = transitionTimeout;
      propCount = transitionDurations.length;
    }
  } else if (expectedType === ANIMATION) {
    if (animationTimeout > 0) {
      type = ANIMATION;
      timeout = animationTimeout;
      propCount = animationDurations.length;
    }
  } else {
    timeout = Math.max(transitionTimeout, animationTimeout);
    type = timeout > 0 ? transitionTimeout > animationTimeout ? TRANSITION : ANIMATION : null;
    propCount = type ? type === TRANSITION ? transitionDurations.length : animationDurations.length : 0;
  }

  const hasTransform = type === TRANSITION && /\b(transform|all)(,|$)/.test(styles[TRANSITION + 'Property']);
  return {
    type,
    timeout,
    propCount,
    hasTransform
  };
}

function getTimeout(delays, durations) {
  while (delays.length < durations.length) {
    delays = delays.concat(delays);
  }

  return Math.max(...durations.map((d, i) => toMs(d) + toMs(delays[i])));
} // Old versions of Chromium (below 61.0.3163.100) formats floating pointer
// numbers in a locale-dependent way, using a comma instead of a dot.
// If comma is not replaced with a dot, the input will be rounded down
// (i.e. acting as a floor function) causing unexpected behaviors


function toMs(s) {
  return Number(s.slice(0, -1).replace(',', '.')) * 1000;
}

function toRaw(observed) {
  return observed && toRaw(observed["__v_raw"
  /* RAW */
  ]) || observed;
}

const positionMap = new WeakMap();
const newPositionMap = new WeakMap();
const TransitionGroupImpl = {
  name: 'TransitionGroup',
  props: /*#__PURE__*/(0, _shared.extend)({}, TransitionPropsValidators, {
    tag: String,
    moveClass: String
  }),

  setup(props, {
    slots
  }) {
    const instance = (0, _runtimeCore.getCurrentInstance)();
    const state = (0, _runtimeCore.useTransitionState)();
    let prevChildren;
    let children;
    (0, _runtimeCore.onUpdated)(() => {
      // children is guaranteed to exist after initial render
      if (!prevChildren.length) {
        return;
      }

      const moveClass = props.moveClass || `${props.name || 'v'}-move`;

      if (!hasCSSTransform(prevChildren[0].el, instance.vnode.el, moveClass)) {
        return;
      } // we divide the work into three loops to avoid mixing DOM reads and writes
      // in each iteration - which helps prevent layout thrashing.


      prevChildren.forEach(callPendingCbs);
      prevChildren.forEach(recordPosition);
      const movedChildren = prevChildren.filter(applyTranslation); // force reflow to put everything in position

      forceReflow();
      movedChildren.forEach(c => {
        const el = c.el;
        const style = el.style;
        addTransitionClass(el, moveClass);
        style.transform = style.webkitTransform = style.transitionDuration = '';

        const cb = el._moveCb = e => {
          if (e && e.target !== el) {
            return;
          }

          if (!e || /transform$/.test(e.propertyName)) {
            el.removeEventListener('transitionend', cb);
            el._moveCb = null;
            removeTransitionClass(el, moveClass);
          }
        };

        el.addEventListener('transitionend', cb);
      });
    });
    return () => {
      const rawProps = toRaw(props);
      const cssTransitionProps = resolveTransitionProps(rawProps);
      const tag = rawProps.tag || _runtimeCore.Fragment;
      prevChildren = children;
      children = slots.default ? (0, _runtimeCore.getTransitionRawChildren)(slots.default()) : [];

      for (let i = 0; i < children.length; i++) {
        const child = children[i];

        if (child.key != null) {
          (0, _runtimeCore.setTransitionHooks)(child, (0, _runtimeCore.resolveTransitionHooks)(child, cssTransitionProps, state, instance));
        } else if ("development" !== 'production') {
          (0, _runtimeCore.warn)(`<TransitionGroup> children must be keyed.`);
        }
      }

      if (prevChildren) {
        for (let i = 0; i < prevChildren.length; i++) {
          const child = prevChildren[i];
          (0, _runtimeCore.setTransitionHooks)(child, (0, _runtimeCore.resolveTransitionHooks)(child, cssTransitionProps, state, instance));
          positionMap.set(child, child.el.getBoundingClientRect());
        }
      }

      return (0, _runtimeCore.createVNode)(tag, null, children);
    };
  }

};
const TransitionGroup = TransitionGroupImpl;
exports.TransitionGroup = TransitionGroup;

function callPendingCbs(c) {
  const el = c.el;

  if (el._moveCb) {
    el._moveCb();
  }

  if (el._enterCb) {
    el._enterCb();
  }
}

function recordPosition(c) {
  newPositionMap.set(c, c.el.getBoundingClientRect());
}

function applyTranslation(c) {
  const oldPos = positionMap.get(c);
  const newPos = newPositionMap.get(c);
  const dx = oldPos.left - newPos.left;
  const dy = oldPos.top - newPos.top;

  if (dx || dy) {
    const s = c.el.style;
    s.transform = s.webkitTransform = `translate(${dx}px,${dy}px)`;
    s.transitionDuration = '0s';
    return c;
  }
} // this is put in a dedicated function to avoid the line from being treeshaken


function forceReflow() {
  return document.body.offsetHeight;
}

function hasCSSTransform(el, root, moveClass) {
  // Detect whether an element with the move class applied has
  // CSS transitions. Since the element may be inside an entering
  // transition at this very moment, we make a clone of it and remove
  // all other transition classes applied to ensure only the move class
  // is applied.
  const clone = el.cloneNode();

  if (el._vtc) {
    el._vtc.forEach(cls => {
      cls.split(/\s+/).forEach(c => c && clone.classList.remove(c));
    });
  }

  moveClass.split(/\s+/).forEach(c => c && clone.classList.add(c));
  clone.style.display = 'none';
  const container = root.nodeType === 1 ? root : root.parentNode;
  container.appendChild(clone);
  const {
    hasTransform
  } = getTransitionInfo(clone);
  container.removeChild(clone);
  return hasTransform;
}

const getModelAssigner = vnode => {
  const fn = vnode.props['onUpdate:modelValue'];
  return (0, _shared.isArray)(fn) ? value => (0, _shared.invokeArrayFns)(fn, value) : fn;
};

function onCompositionStart(e) {
  e.target.composing = true;
}

function onCompositionEnd(e) {
  const target = e.target;

  if (target.composing) {
    target.composing = false;
    trigger(target, 'input');
  }
}

function trigger(el, type) {
  const e = document.createEvent('HTMLEvents');
  e.initEvent(type, true, true);
  el.dispatchEvent(e);
} // We are exporting the v-model runtime directly as vnode hooks so that it can
// be tree-shaken in case v-model is never used.


const vModelText = {
  beforeMount(el, {
    value,
    modifiers: {
      lazy,
      trim,
      number
    }
  }, vnode) {
    el.value = value == null ? '' : value;
    el._assign = getModelAssigner(vnode);
    const castToNumber = number || el.type === 'number';
    addEventListener(el, lazy ? 'change' : 'input', e => {
      if (e.target.composing) return;
      let domValue = el.value;

      if (trim) {
        domValue = domValue.trim();
      } else if (castToNumber) {
        domValue = (0, _shared.toNumber)(domValue);
      }

      el._assign(domValue);
    });

    if (trim) {
      addEventListener(el, 'change', () => {
        el.value = el.value.trim();
      });
    }

    if (!lazy) {
      addEventListener(el, 'compositionstart', onCompositionStart);
      addEventListener(el, 'compositionend', onCompositionEnd); // Safari < 10.2 & UIWebView doesn't fire compositionend when
      // switching focus before confirming composition choice
      // this also fixes the issue where some browsers e.g. iOS Chrome
      // fires "change" instead of "input" on autocomplete.

      addEventListener(el, 'change', onCompositionEnd);
    }
  },

  beforeUpdate(el, {
    value,
    modifiers: {
      trim,
      number
    }
  }, vnode) {
    el._assign = getModelAssigner(vnode);

    if (document.activeElement === el) {
      if (trim && el.value.trim() === value) {
        return;
      }

      if ((number || el.type === 'number') && (0, _shared.toNumber)(el.value) === value) {
        return;
      }
    }

    el.value = value == null ? '' : value;
  }

};
exports.vModelText = vModelText;
const vModelCheckbox = {
  beforeMount(el, binding, vnode) {
    setChecked(el, binding, vnode);
    el._assign = getModelAssigner(vnode);
    addEventListener(el, 'change', () => {
      const modelValue = el._modelValue;
      const elementValue = getValue(el);
      const checked = el.checked;
      const assign = el._assign;

      if ((0, _shared.isArray)(modelValue)) {
        const index = (0, _shared.looseIndexOf)(modelValue, elementValue);
        const found = index !== -1;

        if (checked && !found) {
          assign(modelValue.concat(elementValue));
        } else if (!checked && found) {
          const filtered = [...modelValue];
          filtered.splice(index, 1);
          assign(filtered);
        }
      } else {
        assign(getCheckboxValue(el, checked));
      }
    });
  },

  beforeUpdate(el, binding, vnode) {
    el._assign = getModelAssigner(vnode);
    setChecked(el, binding, vnode);
  }

};
exports.vModelCheckbox = vModelCheckbox;

function setChecked(el, {
  value,
  oldValue
}, vnode) {
  el._modelValue = value;

  if ((0, _shared.isArray)(value)) {
    el.checked = (0, _shared.looseIndexOf)(value, vnode.props.value) > -1;
  } else if (value !== oldValue) {
    el.checked = (0, _shared.looseEqual)(value, getCheckboxValue(el, true));
  }
}

const vModelRadio = {
  beforeMount(el, {
    value
  }, vnode) {
    el.checked = (0, _shared.looseEqual)(value, vnode.props.value);
    el._assign = getModelAssigner(vnode);
    addEventListener(el, 'change', () => {
      el._assign(getValue(el));
    });
  },

  beforeUpdate(el, {
    value,
    oldValue
  }, vnode) {
    el._assign = getModelAssigner(vnode);

    if (value !== oldValue) {
      el.checked = (0, _shared.looseEqual)(value, vnode.props.value);
    }
  }

};
exports.vModelRadio = vModelRadio;
const vModelSelect = {
  // use mounted & updated because <select> relies on its children <option>s.
  mounted(el, {
    value
  }, vnode) {
    setSelected(el, value);
    el._assign = getModelAssigner(vnode);
    addEventListener(el, 'change', () => {
      const selectedVal = Array.prototype.filter.call(el.options, o => o.selected).map(getValue);

      el._assign(el.multiple ? selectedVal : selectedVal[0]);
    });
  },

  beforeUpdate(el, _binding, vnode) {
    el._assign = getModelAssigner(vnode);
  },

  updated(el, {
    value
  }) {
    setSelected(el, value);
  }

};
exports.vModelSelect = vModelSelect;

function setSelected(el, value) {
  const isMultiple = el.multiple;

  if (isMultiple && !(0, _shared.isArray)(value)) {
    "development" !== 'production' && (0, _runtimeCore.warn)(`<select multiple v-model> expects an Array value for its binding, ` + `but got ${Object.prototype.toString.call(value).slice(8, -1)}.`);
    return;
  }

  for (let i = 0, l = el.options.length; i < l; i++) {
    const option = el.options[i];
    const optionValue = getValue(option);

    if (isMultiple) {
      option.selected = (0, _shared.looseIndexOf)(value, optionValue) > -1;
    } else {
      if ((0, _shared.looseEqual)(getValue(option), value)) {
        el.selectedIndex = i;
        return;
      }
    }
  }

  if (!isMultiple) {
    el.selectedIndex = -1;
  }
} // retrieve raw value set via :value bindings


function getValue(el) {
  return '_value' in el ? el._value : el.value;
} // retrieve raw value for true-value and false-value set via :true-value or :false-value bindings


function getCheckboxValue(el, checked) {
  const key = checked ? '_trueValue' : '_falseValue';
  return key in el ? el[key] : checked;
}

const vModelDynamic = {
  beforeMount(el, binding, vnode) {
    callModelHook(el, binding, vnode, null, 'beforeMount');
  },

  mounted(el, binding, vnode) {
    callModelHook(el, binding, vnode, null, 'mounted');
  },

  beforeUpdate(el, binding, vnode, prevVNode) {
    callModelHook(el, binding, vnode, prevVNode, 'beforeUpdate');
  },

  updated(el, binding, vnode, prevVNode) {
    callModelHook(el, binding, vnode, prevVNode, 'updated');
  }

};
exports.vModelDynamic = vModelDynamic;

function callModelHook(el, binding, vnode, prevVNode, hook) {
  let modelToUse;

  switch (el.tagName) {
    case 'SELECT':
      modelToUse = vModelSelect;
      break;

    case 'TEXTAREA':
      modelToUse = vModelText;
      break;

    default:
      switch (el.type) {
        case 'checkbox':
          modelToUse = vModelCheckbox;
          break;

        case 'radio':
          modelToUse = vModelRadio;
          break;

        default:
          modelToUse = vModelText;
      }

  }

  const fn = modelToUse[hook];
  fn && fn(el, binding, vnode, prevVNode);
}

const systemModifiers = ['ctrl', 'shift', 'alt', 'meta'];
const modifierGuards = {
  stop: e => e.stopPropagation(),
  prevent: e => e.preventDefault(),
  self: e => e.target !== e.currentTarget,
  ctrl: e => !e.ctrlKey,
  shift: e => !e.shiftKey,
  alt: e => !e.altKey,
  meta: e => !e.metaKey,
  left: e => 'button' in e && e.button !== 0,
  middle: e => 'button' in e && e.button !== 1,
  right: e => 'button' in e && e.button !== 2,
  exact: (e, modifiers) => systemModifiers.some(m => e[`${m}Key`] && !modifiers.includes(m))
};
/**
 * @private
 */

const withModifiers = (fn, modifiers) => {
  return (event, ...args) => {
    for (let i = 0; i < modifiers.length; i++) {
      const guard = modifierGuards[modifiers[i]];
      if (guard && guard(event, modifiers)) return;
    }

    return fn(event, ...args);
  };
}; // Kept for 2.x compat.
// Note: IE11 compat for `spacebar` and `del` is removed for now.


exports.withModifiers = withModifiers;
const keyNames = {
  esc: 'escape',
  space: ' ',
  up: 'arrow-up',
  left: 'arrow-left',
  right: 'arrow-right',
  down: 'arrow-down',
  delete: 'backspace'
};
/**
 * @private
 */

const withKeys = (fn, modifiers) => {
  return event => {
    if (!('key' in event)) return;
    const eventKey = (0, _shared.hyphenate)(event.key);

    if ( // None of the provided key modifiers match the current event key
    !modifiers.some(k => k === eventKey || keyNames[k] === eventKey)) {
      return;
    }

    return fn(event);
  };
};

exports.withKeys = withKeys;
const vShow = {
  beforeMount(el, {
    value
  }, {
    transition
  }) {
    el._vod = el.style.display === 'none' ? '' : el.style.display;

    if (transition && value) {
      transition.beforeEnter(el);
    } else {
      setDisplay(el, value);
    }
  },

  mounted(el, {
    value
  }, {
    transition
  }) {
    if (transition && value) {
      transition.enter(el);
    }
  },

  updated(el, {
    value,
    oldValue
  }, {
    transition
  }) {
    if (!value === !oldValue) return;

    if (transition) {
      if (value) {
        transition.beforeEnter(el);
        setDisplay(el, true);
        transition.enter(el);
      } else {
        transition.leave(el, () => {
          setDisplay(el, false);
        });
      }
    } else {
      setDisplay(el, value);
    }
  },

  beforeUnmount(el, {
    value
  }) {
    setDisplay(el, value);
  }

};
exports.vShow = vShow;

function setDisplay(el, value) {
  el.style.display = value ? el._vod : 'none';
}

const rendererOptions = (0, _shared.extend)({
  patchProp,
  forcePatchProp
}, nodeOps); // lazy create the renderer - this makes core renderer logic tree-shakable
// in case the user only imports reactivity utilities from Vue.

let renderer;
let enabledHydration = false;

function ensureRenderer() {
  return renderer || (renderer = (0, _runtimeCore.createRenderer)(rendererOptions));
}

function ensureHydrationRenderer() {
  renderer = enabledHydration ? renderer : (0, _runtimeCore.createHydrationRenderer)(rendererOptions);
  enabledHydration = true;
  return renderer;
} // use explicit type casts here to avoid import() calls in rolled-up d.ts


const render = (...args) => {
  ensureRenderer().render(...args);
};

exports.render = render;

const hydrate = (...args) => {
  ensureHydrationRenderer().hydrate(...args);
};

exports.hydrate = hydrate;

const createApp = (...args) => {
  const app = ensureRenderer().createApp(...args);

  if ("development" !== 'production') {
    injectNativeTagCheck(app);
  }

  const {
    mount
  } = app;

  app.mount = containerOrSelector => {
    const container = normalizeContainer(containerOrSelector);
    if (!container) return;
    const component = app._component;

    if (!(0, _shared.isFunction)(component) && !component.render && !component.template) {
      component.template = container.innerHTML;
    } // clear content before mounting


    container.innerHTML = '';
    const proxy = mount(container);
    container.removeAttribute('v-cloak');
    container.setAttribute('data-v-app', '');
    return proxy;
  };

  return app;
};

exports.createApp = createApp;

const createSSRApp = (...args) => {
  const app = ensureHydrationRenderer().createApp(...args);

  if ("development" !== 'production') {
    injectNativeTagCheck(app);
  }

  const {
    mount
  } = app;

  app.mount = containerOrSelector => {
    const container = normalizeContainer(containerOrSelector);

    if (container) {
      return mount(container, true);
    }
  };

  return app;
};

exports.createSSRApp = createSSRApp;

function injectNativeTagCheck(app) {
  // Inject `isNativeTag`
  // this is used for component name validation (dev only)
  Object.defineProperty(app.config, 'isNativeTag', {
    value: tag => (0, _shared.isHTMLTag)(tag) || (0, _shared.isSVGTag)(tag),
    writable: false
  });
}

function normalizeContainer(container) {
  if ((0, _shared.isString)(container)) {
    const res = document.querySelector(container);

    if ("development" !== 'production' && !res) {
      (0, _runtimeCore.warn)(`Failed to mount app: mount target selector returned null.`);
    }

    return res;
  }

  return container;
}
},{"@vue/runtime-core":"../node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js","@vue/shared":"../node_modules/@vue/shared/dist/shared.esm-bundler.js"}],"../node_modules/vue/dist/vue.runtime.esm-bundler.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  compile: true
};
exports.compile = void 0;

var _runtimeDom = require("@vue/runtime-dom");

Object.keys(_runtimeDom).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _runtimeDom[key];
    }
  });
});

var _shared = require("@vue/shared");

function initDev() {
  const target = (0, _shared.getGlobalThis)();
  target.__VUE__ = true;
  (0, _runtimeDom.setDevtoolsHook)(target.__VUE_DEVTOOLS_GLOBAL_HOOK__);
  {
    console.info(`You are running a development build of Vue.\n` + `Make sure to use the production build (*.prod.js) when deploying for production.`);
  }
} // This entry exports the runtime only, and is built as


"development" !== 'production' && initDev();

const compile = () => {
  if ("development" !== 'production') {
    (0, _runtimeDom.warn)(`Runtime compilation is not supported in this build of Vue.` + ` Configure your bundler to alias "vue" to "vue/dist/vue.esm-bundler.js".`
    /* should not happen */
    );
  }
};

exports.compile = compile;
},{"@vue/runtime-dom":"../node_modules/@vue/runtime-dom/dist/runtime-dom.esm-bundler.js","@vue/shared":"../node_modules/@vue/shared/dist/shared.esm-bundler.js"}],"config.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.AllStoreName = exports.config = exports.elementEdit = exports.isDev = void 0;

var _store = require("svelte/store");

var _vue = require("vue");

/** 是不是开发环境 */
const isDev = window.__llej__userjs__dev__ === true;
/** 是否开启编辑 */

exports.isDev = isDev;
const elementEdit = (0, _store.writable)(false);
exports.elementEdit = elementEdit;
const config = (0, _vue.reactive)({
  state: 0,

  /** 是否开启编辑 */
  elementEdit: isDev,

  /** 服务器地址 */
  serverIp: "https://shenzilong.cn/note/",

  /** 页面的url */
  locationUrl: decodeURIComponent(location.origin + location.pathname),

  /** 存储登录凭证的 */
  loginCredentials: "loginCredentials"
});
exports.config = config;
(0, _vue.watchEffect)(() => {
  /** 同步是否开启编辑的状态给 writable  */
  elementEdit.set(config.elementEdit);
});
/** 存储命令栈的地方 */

const AllStoreName = "_storeName_llej_" + config.locationUrl;
exports.AllStoreName = AllStoreName;
var _default = config;
exports.default = _default;
},{"svelte/store":"../node_modules/svelte/store/index.mjs","vue":"../node_modules/vue/dist/vue.runtime.esm-bundler.js"}],"lib/store.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setLocalItem = setLocalItem;
exports.getLocalItem = getLocalItem;
exports.curStore = void 0;

var _vue = require("vue");

var _fun = require("../fun/fun");

var _config = require("../config");

/** 设置一条本地存储 */
async function setLocalItem(name, value) {
  //为了在非油猴环境下存储依旧能起一部分的作用
  if (typeof unsafeWindow !== "undefined") {
    return await GM.setValue(name, value);
  } else {
    return await localStorage.setItem(name, String(value));
  }
}
/** 读取一条本地存储 */


async function getLocalItem(
/** 键名 */
name,
/** 没有的时候的默认值 */
defaultValue) {
  if (typeof unsafeWindow !== "undefined") {
    const res = await GM.getValue(name, defaultValue);
    return res;
  } else {
    //为了在非油猴环境下存储依旧能起一部分的作用
    const value = localStorage.getItem(name);
    if (value === null) return await defaultValue;
    return await value;
  }
}

const curStore = (0, _vue.reactive)({
  CommandStack: [],
  element_List: {},

  /** 用于记录高亮 id 避免新高亮出现重复 */
  Highlighted_count: 0
});
exports.curStore = curStore;
getLocalItem(_config.AllStoreName, "{}").then(s => {
  Object.assign(curStore, JSON.parse(s));
  /** 自动加载本地暂存更改 */

  (async () => {
    console.log(curStore);

    if (document.readyState === "complete") {
      (0, _fun.loadChanges)(curStore);
    } else {
      window.addEventListener("load", function () {
        (0, _fun.loadChanges)(curStore);
      });
    }
  })();
});
},{"vue":"../node_modules/vue/dist/vue.runtime.esm-bundler.js","../fun/fun":"fun/fun.ts","../config":"config.ts"}],"state/highlighted_style.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.styleText = exports.styleList = void 0;

var _store = require("svelte/store");

const styleList = (0, _store.writable)([]);
/** 根据 styleList 计算出来的 css 片段 */

exports.styleList = styleList;
const styleText = (0, _store.derived)(styleList, $styleList => {
  return `<style>
  ${(0, _store.get)(styleList).join("\n")}
  </style>`;
});
exports.styleText = styleText;
},{"svelte/store":"../node_modules/svelte/store/index.mjs"}],"fun/command.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommandControl = exports.Highlighted = exports.addNote = exports.closeEditSelect = exports.editSelect = exports.deleteSelect = exports.Command = void 0;

var _message = require("../ui/message");

var _util = require("../util");

var _store = require("../state/store");

var _highlighted_style = require("../state/highlighted_style");

var _store2 = require("../lib/store");

/** 每一个命令都应该实现的东西 */
class Command {
  constructor(
  /** 命令执行的元素 */
  select) {
    this.selectEL = select;
  }
  /** 执行这个命令 */


  do() {
    return this;
  }
  /** 撤销这个命令 */


  undo() {
    return this;
  }
  /** 重新执行命令 */


  redo() {
    return this.do();
  }
  /** 将命令变成可以转化为json字符串的对象 */


  toJSON() {
    return {
      selectEL: (0, _util.getSelectors)(this.selectEL),
      constructor: this.__proto__.constructor.name
    };
  }
  /** 用于可以使用 toJSON 生成的数据重建功能效果 */


  static 重建(obj) {
    return new this(document.querySelector(obj.selectEL));
  }
  /** 加载commandJSON转变为命令,通过泛型来构造对象的方式 */


  static load(obj, CLASS) {
    return CLASS.重建(obj);
  }

}
/** 删除一个元素 */


exports.Command = Command;

class deleteSelect extends Command {
  do() {
    this.selectEL_display = this.selectEL.style.display;
    this.selectEL.style.display = "none";
    return this;
  }

  undo() {
    this.selectEL.style.display = this.selectEL_display;
    return this;
  }

}
/** 使元素可编辑 */


exports.deleteSelect = deleteSelect;

class editSelect extends Command {
  do() {
    this.selectEL_contentEditable = this.selectEL.contentEditable;
    this.selectEL.contentEditable = "true";
    return this;
  }

  undo() {
    this.selectEL.contentEditable = this.selectEL_contentEditable;
    return this;
  }

}
/** 使元素不可编辑 */


exports.editSelect = editSelect;

class closeEditSelect extends Command {
  do() {
    this.selectEL_contentEditable = this.selectEL.contentEditable;
    this.selectEL.contentEditable = "false";
    return this;
  }

  undo() {
    this.selectEL.contentEditable = this.selectEL_contentEditable;
    return this;
  }

}
/** 新增一个笔记 */


exports.closeEditSelect = closeEditSelect;

class addNote extends Command {
  do() {
    this.selectEL;

    _store.note_list_store.update(list => {
      list.push({
        point: this.selectEL,
        content: "6666666"
      });
      return list;
    });

    return this;
  }

  undo() {
    return this;
  }

  redo() {
    return this;
  }

}
/** 高亮功能 */


exports.addNote = addNote;

class Highlighted extends Command {
  constructor(styleText) {
    super();
    this.styleText = styleText;
    /** css 类名 */

    this.className = `llej-page_notes-style-${_store2.curStore.Highlighted_count++}`;
  }

  do() {
    _highlighted_style.styleList.update(r => {
      return [...r, this.getRawStyleText()];
    });

    return this;
  }

  getRawStyleText() {
    return `
    .${this.className}{
      ${this.styleText}
    }
    `;
  }

  undo() {
    _highlighted_style.styleList.update(r => {
      return r.filter(el => el !== this.getRawStyleText());
    });

    return this;
  }

  static 重建(obj) {
    const r = new this(obj.styleText);
    r.className = obj.className;
    return r;
  }

  toJSON() {
    return {
      selectEL: "",
      className: this.className,
      styleText: this.styleText,
      constructor: this.__proto__.constructor.name
    };
  }

}
/** 命令控制器 */


exports.Highlighted = Highlighted;
const CommandControl = {
  commandStack: [],
  backOutStack: [],

  pushCommand(command) {
    return this.commandStack.push(command);
  },

  run(command) {
    try {
      this.backOutStack.splice(0, this.backOutStack.length);
      return this.pushCommand(command.do());
    } catch (error) {
      console.error("命令执行失败", command, error);
    }

    return -1;
  },

  backOut() {
    if (this.commandStack.length === 0) {
      _message.Message.getMessage({
        msg: "命令栈已空，无法进行撤销"
      }).autoHide();

      return;
    }

    const command = this.commandStack.pop();
    return this.backOutStack.push(command.undo());
  },

  reform() {
    if (this.backOutStack.length === 0) {
      _message.Message.getMessage({
        msg: "撤销栈已空，无法进行重做"
      }).autoHide();

      return;
    }

    const command = this.backOutStack.pop();
    return this.commandStack.push(command.redo());
  },

  /** 从json重建命令栈 */
  loadCommandJSON(obj) {
    (0, _util.log)("-执行命令-", obj.constructor);
    if (obj.constructor === "deleteSelect") return Command.load(obj, deleteSelect);
    if (obj.constructor === "editSelect") return Command.load(obj, editSelect);
    if (obj.constructor === "closeEditSelect") return Command.load(obj, closeEditSelect);
    if (obj.constructor === "addNote") return Command.load(obj, addNote);
    if (obj.constructor === "Highlighted") return Command.load(obj, Highlighted);
  },

  getCommandStackJSON() {
    return JSON.stringify(this.commandStack);
  },

  loadCommandJsonAndRun(commandJSON) {
    commandJSON.map(this.loadCommandJSON).forEach(command => this.run(command));
    return true;
  }

};
exports.CommandControl = CommandControl;
},{"../ui/message":"ui/message.ts","../util":"util.ts","../state/store":"state/store.ts","../state/highlighted_style":"state/highlighted_style.ts","../lib/store":"lib/store.ts"}],"state/index.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setPath = setPath;
exports.editElement = exports.path = exports.currentElement = void 0;

/** 当前被选中的元素 */
let currentElement;
exports.currentElement = currentElement;
let path;
/** 修改当前指向的元素和路径 */

exports.path = path;

function setPath(elList) {
  exports.path = path = elList;
  exports.currentElement = currentElement = elList[0];
}
/** 标记被修改后的元素(被污染了的元素)，以便保存修改的内容 */


const editElement = new Set();
exports.editElement = editElement;
},{}],"util.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.copyTitle = copyTitle;
exports.getSelectors = getSelectors;
exports.getIndex = getIndex;
exports.nodePath = nodePath;
exports.getJSon = getJSon;
exports.ajax_get = ajax_get;
exports.log = log;
exports.getWindow = getWindow;
exports.SelectionEvent = exports.default = void 0;

var _store = require("svelte/store");

var _config = require("./config");

var _command = require("./fun/command");

var _state = require("./state");

/** 用于复制文本的input   */
const input_copy = document.createElement("textarea");
input_copy.id = "__";
input_copy.style.display = "none"; //不能设置为none因为会导致没有可访问性

input_copy.setAttribute("style", `
        position: absolute;
        top: -9999px;
        left: -9999px;`);
document.body.appendChild(input_copy);
/** 复制一个元素的titil 或者一段字符串到剪贴板 */

function copyTitle(el) {
  let title;
  if (typeof el === "string") title = el;else title = el.getAttribute("title");
  input_copy.setAttribute("readonly", "readonly");
  input_copy.setAttribute("value", title);
  input_copy.value = title;
  input_copy.select();
  input_copy.setSelectionRange(0, 9999);
  document.execCommand("copy");
}
/** 工具类 */


var _default = {
  copyTitle
};
/** 获取一个元素的选择器 */

exports.default = _default;

function getSelectors(el) {
  /** 通过path路径来确定元素 */
  let pathSelectors = nodePath(el).reverse().map(el => {
    return el.nodeName + `:nth-child(${getIndex(el)})`;
  }).join(">");
  /** 通过id以及class来确定元素 */

  let id_className = "";
  const id = el.id;
  if (id) id_className += `#${id}`;
  el.classList.forEach(className => {
    id_className += `.${className}`;
  });
  /** nth-child 选择 看它是第几个元素 */

  const index = getIndex(el);
  /** 最终构造出来的选择器 */

  return `${pathSelectors}${id_className}:nth-child(${index})`;
}
/** 获取元素它在第几位 */


function getIndex(el) {
  if (el.nodeName === "HTML") return 1;

  if (el.parentElement === null) {
    return 1;
  }

  return 1 + Array.from(el.parentElement.children).findIndex(child => child === el);
}
/** 获取一个元素的所有父节点到html为止  */


function nodePath(...path) {
  while (path[path.length - 1].parentElement != null) {
    path.push(path[path.length - 1].parentElement);
  }
  /** 只需要是HTMLElement的 */


  const HTMLElementPath = path.filter(el => el instanceof HTMLElement);
  return HTMLElementPath;
}

async function getJSon(url, data) {
  const str = await ajax_get(url, data);
  const res = JSON.parse(str);
  console.log(url, data, res);
  return res;
}
/** 油猴的ajaxget */


function ajax_get(url, data) {
  if (data) url += "?" + jsonToURLpar(data);
  if (window.hasOwnProperty("GM") && window.hasOwnProperty("GM")) return new Promise((resolve, reject) => {
    GM.xmlHttpRequest({
      method: "GET",
      url,
      onload: function (response) {
        resolve(response.responseText);
      },
      onerror: reject
    });
  });else return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener("load", function () {
      resolve(xhr.responseText);
    });
    xhr.addEventListener("error", reject);
    xhr.open("get", url);
    xhr.send();
  });
}
/** json 转 urlpar 只能转一层 */


function jsonToURLpar(json) {
  return Object.keys(json).map(function (key) {
    return encodeURIComponent(key) + "=" + encodeURIComponent(json[key]);
  }).join("&");
}
/** 开发时的调试log */


function log(...arg) {
  if (_config.isDev) console.log(`[dev] `, ...arg);
}
/** 用户选中事件 */


var SelectionEvent;
exports.SelectionEvent = SelectionEvent;

(function (SelectionEvent) {
  /** 表示用户选中的对象，唯一的。不用每次去获取 */
  const s = window.getSelection();
  /** 是否处于 range 的选中状态 */

  SelectionEvent.isRange = (0, _store.writable)(false);
  /** 选区开始位置的元素的 rect */

  SelectionEvent.anchorRect = (0, _store.derived)(SelectionEvent.isRange, $isRange => {
    if (!$isRange) return;
    const node = s.anchorNode;
    const el = node instanceof Element ? node : node.parentElement;
    const rect = el.getBoundingClientRect();
    return rect;
  });

  function 高亮(options = {}) {
    const h = new _command.Highlighted(options.style);

    _command.CommandControl.run(h);

    const className = h.className;
    const tagName = "span";
    let 选中的所有节点 = [];

    if (
    /** 跨元素了 */
    s.anchorNode !== s.focusNode) {
      const startRange = s.getRangeAt(0);
      const endRange = s.getRangeAt(s.rangeCount - 1);
      let startNode = startRange.startContainer;
      let endNode = endRange.endContainer;
      let cur = startNode;

      if (cur instanceof Text) {
        const s = startRange;
        const t2 = cur.splitText(s.startOffset);
        const t3 = t2.nextSibling;
        const wrap = document.createElement(tagName);
        wrap.appendChild(t2);
        cur.parentNode.insertBefore(wrap, t3);
      }

      cur = endNode;

      if (cur instanceof Text) {
        const s = endRange;
        const t2 = cur.splitText(s.endOffset);
        const wrap = document.createElement(tagName);
        wrap.appendChild(cur);
        t2.parentNode.insertBefore(wrap, t2);
        endNode = t2;
      }

      选中的所有节点 = getIntermediateNodes(startNode, endNode);
    } else {
      /** 单元素类 */
      const cur = s.anchorNode;

      if (cur instanceof Text) {
        const t2 = cur.splitText(s.anchorOffset);
        const t3 = t2.splitText(s.focusOffset);
        选中的所有节点.push(t2);
      } else {
        选中的所有节点.push(cur);
      }
    }

    console.log("选中的所有节点", 选中的所有节点);
    选中的所有节点.forEach(node => {
      let el;

      if (node instanceof Element) {
        el = node;
      } else {
        /** 对纯文本节点进行包装，因为纯文本节点无法附加样式等属性 */
        const wrap = document.createElement(tagName);
        const t2 = node.nextSibling;
        const parent = node.parentNode;
        wrap.appendChild(node);
        parent.insertBefore(wrap, t2);
        el = wrap;
      }

      el.classList.add(className);
    });
    /** 这些元素被添加了类名，甚至被包裹了一层。属于被污染的元素,直接标记他们的父亲 */

    const 共存层 = getIntermediateNodes.寻找共存层(...选中的所有节点); // console.log("[共存层]", 共存层);

    let parent = 共存层[0].parentElement;
    /** 避免标记的是不够大的元素，实际上也是因为寻找元素的方法不够好否则也用不着这个 */

    while (parent.className.includes("llej-page_notes-style")) {
      parent = parent.parentElement;
    }

    _state.editElement.add(parent);
  }

  SelectionEvent.高亮 = 高亮;
  document.addEventListener("selectionchange", () => {
    SelectionEvent.isRange.set(s.type === "Range");
  });
})(SelectionEvent || (exports.SelectionEvent = SelectionEvent = {}));

function getIntermediateNodes(a, b) {
  return getIntermediateNodes.获取两元素之间的元素(a, b);
}

(function (getIntermediateNodes) {
  function 寻找共存层(...args) {
    if (args.length === 1) {
      return args;
    }

    const parentList = args.map(el => 获取父链路(el).reverse()).sort((a, b) => {
      return a.length - b.length;
    });
    const 最短链路 = parentList[0];

    for (let i = 0; i < 最短链路.length; i++) {
      const element = 最短链路[i];
      const 此层是否全相似 = parentList.map(el => el[i]).every(el => el === element);

      if (此层是否全相似 === false) {
        return Array.from(最短链路[i - 1].childNodes);
      }
    }
  }

  getIntermediateNodes.寻找共存层 = 寻找共存层;
  /** 越接近node的元素越在前面 */

  function 获取父链路(node) {
    const list = [];
    list.push(node);
    let cur = node;

    while (cur.parentNode) {
      list.push(cur.parentNode);
      cur = cur.parentNode;
    }

    return list;
  }

  getIntermediateNodes.获取父链路 = 获取父链路;

  function 后面的兄弟元素(node) {
    const list = [];
    let cur = node;

    while (cur.nextSibling) {
      list.push(cur.nextSibling);
      cur = cur.nextSibling;
    }

    return list;
  }

  getIntermediateNodes.后面的兄弟元素 = 后面的兄弟元素;

  function 前面的兄弟元素(node) {
    const list = [];
    let cur = node;

    while (cur.previousSibling) {
      list.push(cur.previousSibling);
      cur = cur.previousSibling;
    }

    return list;
  }

  getIntermediateNodes.前面的兄弟元素 = 前面的兄弟元素;

  function 获取两元素之间的元素(a, b) {
    const list = [];
    const aParentList = 获取父链路(a).reverse();
    const bParentList = 获取父链路(b).reverse();
    /** 找出 a 与 b 在共存层的父元素 */

    const 短链路 = aParentList.length > bParentList.length ? bParentList : aParentList;
    let n1 = 短链路[0];
    let n2 = 短链路[0];

    for (let i = 0; i < 短链路.length; i++) {
      n1 = aParentList[i];
      n2 = bParentList[i];

      if (n1 !== n2) {
        break;
      }
    }
    /** 获取共存层中间的元素 */


    let cur = n1.nextSibling;

    while (cur !== n2 && cur.nextSibling !== null) {
      list.push(cur);
      cur = cur.nextSibling;
    }
    /** 判断 a 是否在 b前面 */


    cur = n1;
    let n1在前 = false;

    while (cur.nextSibling) {
      if (n2 === cur) {
        n1在前 = true;
        break;
      }

      cur = cur.nextSibling;
    }

    const [pre, next] = n1在前 ? [a, b] : [b, a];
    const 共存层 = 寻找共存层(a, b);
    cur = pre;

    while (!共存层.includes(cur)) {
      list.push(...后面的兄弟元素(cur));
      cur = cur.parentNode;
    }

    cur = next;

    while (!共存层.includes(cur)) {
      list.push(...前面的兄弟元素(cur));
      cur = cur.parentNode;
    }

    return list;
  }

  getIntermediateNodes.获取两元素之间的元素 = 获取两元素之间的元素;
})(getIntermediateNodes || (getIntermediateNodes = {}));

function getWindow() {
  return typeof unsafeWindow === "undefined" ? window : unsafeWindow;
}
},{"svelte/store":"../node_modules/svelte/store/index.mjs","./config":"config.ts","./fun/command":"fun/command.ts","./state":"state/index.ts"}],"fun/ajax.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.au_getJSON = au_getJSON;
exports._login = _login;
exports.remote_register = remote_register;
exports.remote_getStore = remote_getStore;
exports.remote_setStore = remote_setStore;
exports.remote_getAllStore = remote_getAllStore;

var _config = _interopRequireDefault(require("../config"));

var _store = require("../lib/store");

var _util = require("../util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** 用来识别身份的key */
let key = '';
/** 附带登录信息的ajax */

async function au_getJSON(url, data) {
  if (data === undefined) data = {};
  data.key = key ? key : await (0, _store.getLocalItem)(_config.default.loginCredentials);
  return (0, _util.getJSon)(url, data);
}
/** 登录 */


async function _login(par) {
  const res = await (0, _util.getJSon)(_config.default.serverIp + 'login', par);
  if (res.body && res.body.length > 0) key = res.body;
  (0, _store.setLocalItem)(_config.default.loginCredentials, key);
  return res;
}
/** 注册 */


async function remote_register(par) {
  return await (0, _util.getJSon)(_config.default.serverIp + 'register', par);
}
/** 获取存储库 */


async function remote_getStore(par) {
  return await au_getJSON(_config.default.serverIp + 'getStore', par);
}
/** 设置存储库 */


async function remote_setStore(par) {
  return await au_getJSON(_config.default.serverIp + 'setStore', par);
}
/** 获取存储库 */


async function remote_getAllStore() {
  return await au_getJSON(_config.default.serverIp + 'getAllStore');
}
},{"../config":"config.ts","../lib/store":"lib/store.ts","../util":"util.ts"}],"ui/style.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Style = void 0;

class Style {}

exports.Style = Style;
Style.message = `
    border: 1px solid black;
    background-color: white;
    position: fixed;
    top: 20px;
    left: 30px;
    animation: llej_myfirst 5s;
    z-index:800;
    `;
Style.warning = `
    border: 1px solid black;
    background-color: red;
    position: fixed;
    top: 20px;
    left: 30px;
    z-index:800;
    `;
Style.note = `
    border: 1px solid black;
    background-color: #c6c5ba;
    position: sticky;
    top: 20px;
    left: 30px;
    width: auto;
    height: auto;
    z-index:800;
    `;
/** 注入动画 */

const keyframes = document.createElement('style');
keyframes.innerHTML = `
@keyframes llej_myfirst
{
    from { background: red;color:white; }
    to { background: yellow;color:black; }
}
`;
document.head.appendChild(keyframes);
},{}],"ui/warning.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Warning = void 0;

var _message = require("./message");

var _style = require("./style");

class Warning extends _message.Message {
  constructor({
    msg
  }) {
    super({
      msg,
      style: _style.Style.warning
    });
  }

}

exports.Warning = Warning;
},{"./message":"ui/message.ts","./style":"ui/style.ts"}],"fun/fun.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.saveChanges = saveChanges;
exports.loadChanges = loadChanges;
exports.outline = outline;
exports.on_mouse = on_mouse;
exports.on_keydown = on_keydown;
exports.on_input = on_input;
exports.switchState = switchState;
exports.KeyMap = exports.fun = void 0;

var _config = _interopRequireWildcard(require("../config"));

var _store = require("../lib/store");

var _message = require("../ui/message");

var _ajax = require("./ajax");

var _command = require("./command");

var _index = require("../state/index");

var _warning = require("../ui/warning");

var _util = _interopRequireWildcard(require("../util"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/** ════════════════════════🏳‍🌈 提供给用户使用的功能 🏳‍🌈════════════════════════
 *
 ** ════════════════════════🚧 提供给用户使用的功能 🚧════════════════════════ */
const fun = {
  /** 使元素可编辑 */
  editElement() {
    if (_index.currentElement.innerHTML.length > 10 * 1000) return new _warning.Warning({
      msg: "该元素内容过大，请选择更确定的文本元素。"
    }).autoHide();

    _command.CommandControl.run(new _command.editSelect(_index.currentElement));
  },

  /** 删除元素 */
  deleteElement() {
    _command.CommandControl.run(new _command.deleteSelect(_index.currentElement));
  },

  /** 复制title */
  copyTitle() {
    _util.default.copyTitle(_index.currentElement);
  },

  /** 关闭可编辑 */
  closeEdit() {
    _command.CommandControl.run(new _command.closeEditSelect(_index.currentElement));
  },

  /** 撤销 */
  backOut() {
    _command.CommandControl.backOut();
  },

  /** 重做 */
  undo() {
    _command.CommandControl.reform();
  },

  /** 新增笔记 */
  addNote() {
    _command.CommandControl.run(new _command.addNote(_index.currentElement));
  },

  /** 保存所有的修改 */
  saveChanges() {
    saveChanges(_index.editElement);
    new _message.Message({
      msg: "保存成功"
    }).autoHide();
  },

  /** 将修改上传到云端 */
  async uploadThe() {
    (0, _ajax.remote_setStore)({
      url: _config.default.locationUrl,
      store: await saveChanges(_index.editElement)
    }).then(r => {
      new _message.Message({
        msg: "云端存储:" + r.message
      }).autoHide();
    });
  },

  /** 从云端下载修改 */
  downloadThe() {
    new _message.Message({
      msg: "正在读取云端存储"
    }).autoHide();
    (0, _ajax.remote_getStore)({
      url: _config.default.locationUrl
    }).then(r => {
      if (r.body === undefined || r.body.length === 0) return new _message.Message({
        msg: "云端存储:" + r.message
      }).autoHide();
      const allStore = JSON.parse(r.body[0].store);
      loadChanges(allStore);
      new _message.Message({
        msg: "云端存储:" + r.message
      }).autoHide();
    });
  },

  /** 注册 */
  register() {
    register();
  },

  /** 登录 */
  login() {
    login();
  }

};
/** 按键和函数的映射关系 */

exports.fun = fun;
const KeyMap = {
  KeyQ: [fun.editElement],
  KeyD: [fun.deleteElement],
  KeyC: [fun.copyTitle],
  KeyW: [fun.closeEdit],
  KeyZ: [fun.backOut],
  KeyY: [fun.undo],
  KeyN: [fun.addNote],
  KeyS: [fun.saveChanges],
  KeyO: [fun.uploadThe],
  KeyP: [fun.downloadThe, fun.saveChanges],
  KeyK: [fun.register],
  KeyL: [fun.login]
};
/** 保存修改 */

exports.KeyMap = KeyMap;

async function saveChanges(editElement) {
  const data = {
    element_List: {},
    CommandStack: _command.CommandControl.commandStack
  };
  /** 获取修改过的元素的html */

  editElement.forEach(el => {
    const selectors = (0, _util.getSelectors)(el);
    data.element_List[selectors] = el.innerHTML;
  });
  const data_str = JSON.stringify(Object.assign(_store.curStore, data));
  await (0, _store.setLocalItem)(_config.AllStoreName, JSON.stringify(data));
  return data_str;
}
/** 加载修改 */


async function loadChanges(allStore) {
  /** 将修改过的 html 写回去 */
  for (const selectors in allStore.element_List) {
    const html = allStore.element_List[selectors];
    const el = document.querySelector(selectors);

    if (el === null) {
      console.error(`${selectors} 的元素无法找到，无法重写`);
    } else {
      _index.editElement.add(el);

      el.innerHTML = html;
      (0, _util.log)("-重写-", el);
    }
  }
  /** 重新执行命令栈 */


  _command.CommandControl.loadCommandJsonAndRun(allStore.CommandStack);
}

function login() {
  const title = ">>>网页笔记<<<\n";
  const user = prompt(title + "请输入用户名");
  if (user === null) return;
  const secret_key = prompt(title + "请输入密钥。");
  if (secret_key === null) return;
  (0, _ajax._login)({
    user,
    secret_key
  }).then(r => {
    new _message.Message({
      msg: r.message
    }).autoHide();
  });
}

function register() {
  const title = ">>>网页笔记<<<\n";
  const user = prompt(title + "请输入用户名");
  if (user === null) return;
  const secret_key = prompt(title + "请输入密钥。要记住哦，没有提供找回功能");
  if (secret_key === null) return;
  (0, _ajax.remote_register)({
    user,
    secret_key
  }).then(r => {
    new _message.Message({
      msg: r.message
    }).autoHide();
  });
}
/** 轮廓线,用以显示当前元素 */


function outline(el) {
  el.classList.add("user_js_llej_outline");
  setTimeout(reduction, 400);

  function reduction() {
    if (el == _index.currentElement) {
      outline(el);
      /** 鼠标还在这个元素上，再等会 */

      return;
    }

    el.classList.remove("user_js_llej_outline");
  }
}
/** 监听鼠标移动 */


function on_mouse(event) {
  if (event.target instanceof HTMLElement) {
    (0, _index.setPath)((0, _util.nodePath)(event.target));

    if (_config.default.elementEdit) {
      outline(event.target);
    }
  }
}
/** 监测按键事件 */


async function on_keydown(event) {
  const code = event.code; //有元素获得焦点，视为正在输入文本，不执行指令

  if (document.querySelectorAll(":focus").length > 0) {
    return;
  }
  /** 切换编辑模式 */


  if (code === "F2" || code === "KeyM") {
    return switchState(event);
  }
  /** 没有开启编辑功能 */


  if (_config.default.elementEdit === false) {
    return;
  }

  if (code in KeyMap) {
    /** 执行按键绑定的函数 */
    const func_list = KeyMap[code];
    (0, _util.log)(`[按下了] ${code},执行了:`, func_list.map(f => f.name));
    func_list.forEach(func => {
      func();
    });
  }
}
/** 编辑事件 */


function on_input(event) {
  if (event.target instanceof HTMLElement) {
    const el = event.target;
    if (el.innerHTML.length > 10 * 1000) new _warning.Warning({
      msg: "该元素html内容过大，将不会保存这里的修改，请选择更确定的文本元素。"
    }).autoHide();else _index.editElement.add(el);
  }
}
/** 切换状态 */


function switchState(event) {
  _config.default.elementEdit = !_config.default.elementEdit;
  event.preventDefault();
  event.returnValue = false;
  return false;
}
},{"../config":"config.ts","../lib/store":"lib/store.ts","../ui/message":"ui/message.ts","./ajax":"fun/ajax.ts","./command":"fun/command.ts","../state/index":"state/index.ts","../ui/warning":"ui/warning.ts","../util":"util.ts"}],"layout_div.svelte":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _internal = require("svelte/internal");

var _transition = require("svelte/transition");

var _store = require("./state/store");

var _msg = _interopRequireDefault(require("./svelte/msg"));

var _Note = _interopRequireDefault(require("./svelte/Note"));

var _Toolbar = _interopRequireDefault(require("./svelte/Toolbar"));

var _fun = require("./fun/fun");

var _util = require("./util");

var _config = require("./config");

var _highlighted_style = require("./state/highlighted_style");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* layout_div.svelte generated by Svelte v3.24.0 */
const file = "layout_div.svelte";

function add_css() {
  var style = (0, _internal.element)("style");
  style.id = "svelte-t1o6s3-style";
  style.textContent = ".root.svelte-t1o6s3{z-index:60;position:absolute;top:3rem}\n";
  (0, _internal.append_dev)(document.head, style);
}

function get_each_context(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[12] = list[i];
  child_ctx[13] = list;
  child_ctx[14] = i;
  return child_ctx;
} // (52:0) {#if $isRange && $elementEdit}


function create_if_block(ctx) {
  let div;
  let toolbar;
  let updating_highlighted;
  let current;

  function toolbar_highlighted_binding(value) {
    /*toolbar_highlighted_binding*/
    ctx[9].call(null, value);
  }

  let toolbar_props = {};

  if (
  /*SelectionEvent*/
  ctx[0].高亮 !== void 0) {
    toolbar_props.highlighted =
    /*SelectionEvent*/
    ctx[0].高亮;
  }

  toolbar = new _Toolbar.default({
    props: toolbar_props,
    $$inline: true
  });

  _internal.binding_callbacks.push(() => (0, _internal.bind)(toolbar, "highlighted", toolbar_highlighted_binding));

  const block = {
    c: function create() {
      div = (0, _internal.element)("div");
      (0, _internal.create_component)(toolbar.$$.fragment);
      (0, _internal.set_style)(div, "position", "fixed");
      (0, _internal.set_style)(div, "top",
      /*$anchorRect*/
      ctx[6].top + "px");
      (0, _internal.set_style)(div, "left",
      /*$anchorRect*/
      ctx[6].left + "px");
      (0, _internal.set_style)(div, "transform", "translateY(-100%)");
      (0, _internal.set_style)(div, "user-select", "none");
      (0, _internal.add_location)(div, file, 52, 2, 1092);
    },
    m: function mount(target, anchor) {
      (0, _internal.insert_dev)(target, div, anchor);
      (0, _internal.mount_component)(toolbar, div, null);
      current = true;
    },
    p: function update(ctx, dirty) {
      const toolbar_changes = {};

      if (!updating_highlighted && dirty &
      /*SelectionEvent*/
      1) {
        updating_highlighted = true;
        toolbar_changes.highlighted =
        /*SelectionEvent*/
        ctx[0].高亮;
        (0, _internal.add_flush_callback)(() => updating_highlighted = false);
      }

      toolbar.$set(toolbar_changes);

      if (!current || dirty &
      /*$anchorRect*/
      64) {
        (0, _internal.set_style)(div, "top",
        /*$anchorRect*/
        ctx[6].top + "px");
      }

      if (!current || dirty &
      /*$anchorRect*/
      64) {
        (0, _internal.set_style)(div, "left",
        /*$anchorRect*/
        ctx[6].left + "px");
      }
    },
    i: function intro(local) {
      if (current) return;
      (0, _internal.transition_in)(toolbar.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      (0, _internal.transition_out)(toolbar.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) (0, _internal.detach_dev)(div);
      (0, _internal.destroy_component)(toolbar);
    }
  };
  (0, _internal.dispatch_dev)("SvelteRegisterBlock", {
    block,
    id: create_if_block.name,
    type: "if",
    source: "(52:0) {#if $isRange && $elementEdit}",
    ctx
  });
  return block;
} // (58:0) {#each note_list as note}


function create_each_block(ctx) {
  let note;
  let updating_note;
  let current;

  function note_note_binding(value) {
    /*note_note_binding*/
    ctx[10].call(null, value,
    /*note*/
    ctx[12],
    /*each_value*/
    ctx[13],
    /*note_index*/
    ctx[14]);
  }

  let note_props = {};

  if (
  /*note*/
  ctx[12] !== void 0) {
    note_props.note =
    /*note*/
    ctx[12];
  }

  note = new _Note.default({
    props: note_props,
    $$inline: true
  });

  _internal.binding_callbacks.push(() => (0, _internal.bind)(note, "note", note_note_binding));

  const block = {
    c: function create() {
      (0, _internal.create_component)(note.$$.fragment);
    },
    m: function mount(target, anchor) {
      (0, _internal.mount_component)(note, target, anchor);
      current = true;
    },
    p: function update(new_ctx, dirty) {
      ctx = new_ctx;
      const note_changes = {};

      if (!updating_note && dirty &
      /*note_list*/
      2) {
        updating_note = true;
        note_changes.note =
        /*note*/
        ctx[12];
        (0, _internal.add_flush_callback)(() => updating_note = false);
      }

      note.$set(note_changes);
    },
    i: function intro(local) {
      if (current) return;
      (0, _internal.transition_in)(note.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      (0, _internal.transition_out)(note.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      (0, _internal.destroy_component)(note, detaching);
    }
  };
  (0, _internal.dispatch_dev)("SvelteRegisterBlock", {
    block,
    id: create_each_block.name,
    type: "each",
    source: "(58:0) {#each note_list as note}",
    ctx
  });
  return block;
}

function create_fragment(ctx) {
  let div;
  let html_tag;
  let t0;
  let html_tag_1;
  let t1;
  let msg_1;
  let t2;
  let t3;
  let t4;
  let html_tag_2;
  let raw2_value = "<style>.user_js_llej_outline{outline:2px solid red}</style>" + "";
  let html_anchor;
  let current;
  let mounted;
  let dispose;
  msg_1 = new _msg.default({
    $$inline: true
  });
  let if_block =
  /*$isRange*/
  ctx[4] &&
  /*$elementEdit*/
  ctx[5] && create_if_block(ctx);
  let each_value =
  /*note_list*/
  ctx[1];
  (0, _internal.validate_each_argument)(each_value);
  let each_blocks = [];

  for (let i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
  }

  const out = i => (0, _internal.transition_out)(each_blocks[i], 1, 1, () => {
    each_blocks[i] = null;
  });

  const block = {
    c: function create() {
      div = (0, _internal.element)("div");
      t0 = (0, _internal.space)();
      t1 = (0, _internal.space)();
      (0, _internal.create_component)(msg_1.$$.fragment);
      t2 = (0, _internal.space)();
      if (if_block) if_block.c();
      t3 = (0, _internal.space)();

      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }

      t4 = (0, _internal.space)();
      html_anchor = (0, _internal.empty)();
      html_tag = new _internal.HtmlTag(t0);
      html_tag_1 = new _internal.HtmlTag(t1);
      (0, _internal.attr_dev)(div, "class", "root svelte-t1o6s3");
      (0, _internal.add_location)(div, file, 45, 0, 979);
      html_tag_2 = new _internal.HtmlTag(html_anchor);
    },
    l: function claim(nodes) {
      throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    },
    m: function mount(target, anchor) {
      (0, _internal.insert_dev)(target, div, anchor);
      html_tag.m(
      /*html*/
      ctx[2], div);
      (0, _internal.append_dev)(div, t0);
      html_tag_1.m(
      /*$styleText*/
      ctx[3], div);
      (0, _internal.append_dev)(div, t1);
      (0, _internal.mount_component)(msg_1, div, null);
      (0, _internal.insert_dev)(target, t2, anchor);
      if (if_block) if_block.m(target, anchor);
      (0, _internal.insert_dev)(target, t3, anchor);

      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].m(target, anchor);
      }

      (0, _internal.insert_dev)(target, t4, anchor);
      html_tag_2.m(raw2_value, target, anchor);
      (0, _internal.insert_dev)(target, html_anchor, anchor);
      current = true;

      if (!mounted) {
        dispose = [(0, _internal.listen_dev)(window, "keydown", _fun.on_keydown, false, false, false), (0, _internal.listen_dev)(window, "input", _fun.on_input, false, false, false), (0, _internal.listen_dev)(window, "mouseover", _fun.on_mouse, false, false, false)];
        mounted = true;
      }
    },
    p: function update(ctx, [dirty]) {
      if (!current || dirty &
      /*html*/
      4) html_tag.p(
      /*html*/
      ctx[2]);
      if (!current || dirty &
      /*$styleText*/
      8) html_tag_1.p(
      /*$styleText*/
      ctx[3]);

      if (
      /*$isRange*/
      ctx[4] &&
      /*$elementEdit*/
      ctx[5]) {
        if (if_block) {
          if_block.p(ctx, dirty);

          if (dirty &
          /*$isRange, $elementEdit*/
          48) {
            (0, _internal.transition_in)(if_block, 1);
          }
        } else {
          if_block = create_if_block(ctx);
          if_block.c();
          (0, _internal.transition_in)(if_block, 1);
          if_block.m(t3.parentNode, t3);
        }
      } else if (if_block) {
        (0, _internal.group_outros)();
        (0, _internal.transition_out)(if_block, 1, 1, () => {
          if_block = null;
        });
        (0, _internal.check_outros)();
      }

      if (dirty &
      /*note_list*/
      2) {
        each_value =
        /*note_list*/
        ctx[1];
        (0, _internal.validate_each_argument)(each_value);
        let i;

        for (i = 0; i < each_value.length; i += 1) {
          const child_ctx = get_each_context(ctx, each_value, i);

          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
            (0, _internal.transition_in)(each_blocks[i], 1);
          } else {
            each_blocks[i] = create_each_block(child_ctx);
            each_blocks[i].c();
            (0, _internal.transition_in)(each_blocks[i], 1);
            each_blocks[i].m(t4.parentNode, t4);
          }
        }

        (0, _internal.group_outros)();

        for (i = each_value.length; i < each_blocks.length; i += 1) {
          out(i);
        }

        (0, _internal.check_outros)();
      }
    },
    i: function intro(local) {
      if (current) return;
      (0, _internal.transition_in)(msg_1.$$.fragment, local);
      (0, _internal.transition_in)(if_block);

      for (let i = 0; i < each_value.length; i += 1) {
        (0, _internal.transition_in)(each_blocks[i]);
      }

      current = true;
    },
    o: function outro(local) {
      (0, _internal.transition_out)(msg_1.$$.fragment, local);
      (0, _internal.transition_out)(if_block);
      each_blocks = each_blocks.filter(Boolean);

      for (let i = 0; i < each_blocks.length; i += 1) {
        (0, _internal.transition_out)(each_blocks[i]);
      }

      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) (0, _internal.detach_dev)(div);
      (0, _internal.destroy_component)(msg_1);
      if (detaching) (0, _internal.detach_dev)(t2);
      if (if_block) if_block.d(detaching);
      if (detaching) (0, _internal.detach_dev)(t3);
      (0, _internal.destroy_each)(each_blocks, detaching);
      if (detaching) (0, _internal.detach_dev)(t4);
      if (detaching) (0, _internal.detach_dev)(html_anchor);
      if (detaching) html_tag_2.d();
      mounted = false;
      (0, _internal.run_all)(dispose);
    }
  };
  (0, _internal.dispatch_dev)("SvelteRegisterBlock", {
    block,
    id: create_fragment.name,
    type: "component",
    source: "",
    ctx
  });
  return block;
}

function instance($$self, $$props, $$invalidate) {
  let $styleText;
  let $isRange;
  let $elementEdit;
  let $anchorRect;
  (0, _internal.validate_store)(_highlighted_style.styleText, "styleText");
  (0, _internal.component_subscribe)($$self, _highlighted_style.styleText, $$value => $$invalidate(3, $styleText = $$value));
  (0, _internal.validate_store)(_config.elementEdit, "elementEdit");
  (0, _internal.component_subscribe)($$self, _config.elementEdit, $$value => $$invalidate(5, $elementEdit = $$value));
  let note_list = [];

  _store.note_list_store.subscribe(list => {
    $$invalidate(1, note_list = list);
  });

  let html = "";

  function paste(e) {
    $$invalidate(2, html = e.clipboardData.getData("text/html"));
  }

  const {
    isRange,
    anchorRect
  } = _util.SelectionEvent;
  (0, _internal.validate_store)(isRange, "isRange");
  (0, _internal.component_subscribe)($$self, isRange, value => $$invalidate(4, $isRange = value));
  (0, _internal.validate_store)(anchorRect, "anchorRect");
  (0, _internal.component_subscribe)($$self, anchorRect, value => $$invalidate(6, $anchorRect = value));
  const writable_props = [];
  Object.keys($$props).forEach(key => {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Layout_div> was created with unknown prop '${key}'`);
  });
  let {
    $$slots = {},
    $$scope
  } = $$props;
  (0, _internal.validate_slots)("Layout_div", $$slots, []);

  function toolbar_highlighted_binding(value) {
    _util.SelectionEvent.高亮 = value;
    $$invalidate(0, _util.SelectionEvent);
  }

  function note_note_binding(value, note, each_value, note_index) {
    each_value[note_index] = value;
    $$invalidate(1, note_list);
  }

  $$self.$capture_state = () => ({
    fade: _transition.fade,
    blur: _transition.blur,
    crossfade: _transition.crossfade,
    draw: _transition.draw,
    fly: _transition.fly,
    scale: _transition.scale,
    slide: _transition.slide,
    msg: _store.msg,
    note_list_store: _store.note_list_store,
    Msg: _msg.default,
    Note: _Note.default,
    Toolbar: _Toolbar.default,
    on_mouse: _fun.on_mouse,
    on_keydown: _fun.on_keydown,
    on_input: _fun.on_input,
    SelectionEvent: _util.SelectionEvent,
    elementEdit: _config.elementEdit,
    styleText: _highlighted_style.styleText,
    note_list,
    html,
    paste,
    isRange,
    anchorRect,
    $styleText,
    $isRange,
    $elementEdit,
    $anchorRect
  });

  $$self.$inject_state = $$props => {
    if ("note_list" in $$props) $$invalidate(1, note_list = $$props.note_list);
    if ("html" in $$props) $$invalidate(2, html = $$props.html);
  };

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  return [_util.SelectionEvent, note_list, html, $styleText, $isRange, $elementEdit, $anchorRect, isRange, anchorRect, toolbar_highlighted_binding, note_note_binding];
}

class Layout_div extends _internal.SvelteComponentDev {
  constructor(options) {
    super(options);
    if (!document.getElementById("svelte-t1o6s3-style")) add_css();
    (0, _internal.init)(this, options, instance, create_fragment, _internal.safe_not_equal, {});
    (0, _internal.dispatch_dev)("SvelteRegisterComponent", {
      component: this,
      tagName: "Layout_div",
      options,
      id: create_fragment.name
    });
  }

}

var _default = Layout_div;
exports.default = _default;
},{"svelte/internal":"../node_modules/svelte/internal/index.mjs","svelte/transition":"../node_modules/svelte/transition/index.mjs","./state/store":"state/store.ts","./svelte/msg":"svelte/msg.svelte","./svelte/Note":"svelte/Note.svelte","./svelte/Toolbar":"svelte/Toolbar.svelte","./fun/fun":"fun/fun.ts","./util":"util.ts","./config":"config.ts","./state/highlighted_style":"state/highlighted_style.ts","_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"网页笔记.user.ts":[function(require,module,exports) {
"use strict";

var _layout_div = _interopRequireDefault(require("./layout_div.svelte"));

var _fun = require("./fun/fun");

var _index = require("./state/index");

var _store = require("./lib/store");

var _config = require("./config");

var _command = require("./fun/command");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ==UserScript==
// @name         网页文本编辑,做笔记的好选择
// @namespace    http://tampermonkey.net/
// @version      1.40
// @description  所见即所得！
// @author       崮生 2234839456@qq.com
// @match        *
// @include      *
// @connect      shenzilong.cn
// @grant        GM.setValue
// @grant        GM.getValue
// @grant        unsafeWindow
// @grant        GM.xmlHttpRequest
// ==/UserScript==
(async function () {
  if (typeof unsafeWindow !== "undefined") {
    window = unsafeWindow;
  }
  /** 调试用 */


  window.CommandControl = _command.CommandControl;
  /** 清除当前这个页面的修改 */

  window.llej_pageNotes_clearCurrentStore = () => {
    (0, _store.setLocalItem)(_config.AllStoreName, undefined);
    location.reload();
  };

  const app_div = document.createElement("div");
  document.body.appendChild(app_div);
  const app = new _layout_div.default({
    target: app_div
  });
  /** 自动保存修改后的html  */

  setInterval(
  /**
   *  **一分钟保存一次**
   */
  function () {
    (0, _fun.saveChanges)(_index.editElement);
  }, 1000 * 60);
})();
},{"./layout_div.svelte":"layout_div.svelte","./fun/fun":"fun/fun.ts","./state/index":"state/index.ts","./lib/store":"lib/store.ts","./config":"config.ts","./fun/command":"fun/command.ts"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "51228" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","网页笔记.user.ts"], null)
//# sourceMappingURL=/网页笔记.user.js.map