var app = (function () {
    'use strict';

    function noop() { }
    const identity = x => x;
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
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
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

    const is_client = typeof window !== 'undefined';
    let now = is_client
        ? () => window.performance.now()
        : () => Date.now();
    let raf = is_client ? cb => requestAnimationFrame(cb) : noop;

    const tasks = new Set();
    function run_tasks(now) {
        tasks.forEach(task => {
            if (!task.c(now)) {
                tasks.delete(task);
                task.f();
            }
        });
        if (tasks.size !== 0)
            raf(run_tasks);
    }
    /**
     * Creates a new task that runs on each raf frame
     * until it returns a falsy value or is aborted
     */
    function loop(callback) {
        let task;
        if (tasks.size === 0)
            raf(run_tasks);
        return {
            promise: new Promise(fulfill => {
                tasks.add(task = { c: callback, f: fulfill });
            }),
            abort() {
                tasks.delete(task);
            }
        };
    }

    // Track which nodes are claimed during hydration. Unclaimed nodes can then be removed from the DOM
    // at the end of hydration without touching the remaining nodes.
    let is_hydrating = false;
    function start_hydrating() {
        is_hydrating = true;
    }
    function end_hydrating() {
        is_hydrating = false;
    }
    function upper_bound(low, high, key, value) {
        // Return first index of value larger than input value in the range [low, high)
        while (low < high) {
            const mid = low + ((high - low) >> 1);
            if (key(mid) <= value) {
                low = mid + 1;
            }
            else {
                high = mid;
            }
        }
        return low;
    }
    function init_hydrate(target) {
        if (target.hydrate_init)
            return;
        target.hydrate_init = true;
        // We know that all children have claim_order values since the unclaimed have been detached
        const children = target.childNodes;
        /*
        * Reorder claimed children optimally.
        * We can reorder claimed children optimally by finding the longest subsequence of
        * nodes that are already claimed in order and only moving the rest. The longest
        * subsequence subsequence of nodes that are claimed in order can be found by
        * computing the longest increasing subsequence of .claim_order values.
        *
        * This algorithm is optimal in generating the least amount of reorder operations
        * possible.
        *
        * Proof:
        * We know that, given a set of reordering operations, the nodes that do not move
        * always form an increasing subsequence, since they do not move among each other
        * meaning that they must be already ordered among each other. Thus, the maximal
        * set of nodes that do not move form a longest increasing subsequence.
        */
        // Compute longest increasing subsequence
        // m: subsequence length j => index k of smallest value that ends an increasing subsequence of length j
        const m = new Int32Array(children.length + 1);
        // Predecessor indices + 1
        const p = new Int32Array(children.length);
        m[0] = -1;
        let longest = 0;
        for (let i = 0; i < children.length; i++) {
            const current = children[i].claim_order;
            // Find the largest subsequence length such that it ends in a value less than our current value
            // upper_bound returns first greater value, so we subtract one
            const seqLen = upper_bound(1, longest + 1, idx => children[m[idx]].claim_order, current) - 1;
            p[i] = m[seqLen] + 1;
            const newLen = seqLen + 1;
            // We can guarantee that current is the smallest value. Otherwise, we would have generated a longer sequence.
            m[newLen] = i;
            longest = Math.max(newLen, longest);
        }
        // The longest increasing subsequence of nodes (initially reversed)
        const lis = [];
        // The rest of the nodes, nodes that will be moved
        const toMove = [];
        let last = children.length - 1;
        for (let cur = m[longest] + 1; cur != 0; cur = p[cur - 1]) {
            lis.push(children[cur - 1]);
            for (; last >= cur; last--) {
                toMove.push(children[last]);
            }
            last--;
        }
        for (; last >= 0; last--) {
            toMove.push(children[last]);
        }
        lis.reverse();
        // We sort the nodes being moved to guarantee that their insertion order matches the claim order
        toMove.sort((a, b) => a.claim_order - b.claim_order);
        // Finally, we move the nodes
        for (let i = 0, j = 0; i < toMove.length; i++) {
            while (j < lis.length && toMove[i].claim_order >= lis[j].claim_order) {
                j++;
            }
            const anchor = j < lis.length ? lis[j] : null;
            target.insertBefore(toMove[i], anchor);
        }
    }
    function append(target, node) {
        if (is_hydrating) {
            init_hydrate(target);
            if ((target.actual_end_child === undefined) || ((target.actual_end_child !== null) && (target.actual_end_child.parentElement !== target))) {
                target.actual_end_child = target.firstChild;
            }
            if (node !== target.actual_end_child) {
                target.insertBefore(node, target.actual_end_child);
            }
            else {
                target.actual_end_child = node.nextSibling;
            }
        }
        else if (node.parentNode !== target) {
            target.appendChild(node);
        }
    }
    function insert(target, node, anchor) {
        if (is_hydrating && !anchor) {
            append(target, node);
        }
        else if (node.parentNode !== target || (anchor && node.nextSibling !== anchor)) {
            target.insertBefore(node, anchor || null);
        }
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function destroy_each(iterations, detaching) {
        for (let i = 0; i < iterations.length; i += 1) {
            if (iterations[i])
                iterations[i].d(detaching);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function set_data(text, data) {
        data = '' + data;
        if (text.wholeText !== data)
            text.data = data;
    }
    function set_input_value(input, value) {
        input.value = value == null ? '' : value;
    }
    function set_style(node, key, value, important) {
        node.style.setProperty(key, value, important ? 'important' : '');
    }
    function custom_event(type, detail) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, false, false, detail);
        return e;
    }
    class HtmlTag {
        constructor(claimed_nodes) {
            this.e = this.n = null;
            this.l = claimed_nodes;
        }
        m(html, target, anchor = null) {
            if (!this.e) {
                this.e = element(target.nodeName);
                this.t = target;
                if (this.l) {
                    this.n = this.l;
                }
                else {
                    this.h(html);
                }
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

    const active_docs = new Set();
    let active = 0;
    // https://github.com/darkskyapp/string-hash/blob/master/index.js
    function hash(str) {
        let hash = 5381;
        let i = str.length;
        while (i--)
            hash = ((hash << 5) - hash) ^ str.charCodeAt(i);
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
        node.style.animation = `${animation ? `${animation}, ` : ''}${name} ${duration}ms linear ${delay}ms 1 both`;
        active += 1;
        return name;
    }
    function delete_rule(node, name) {
        const previous = (node.style.animation || '').split(', ');
        const next = previous.filter(name
            ? anim => anim.indexOf(name) < 0 // remove specific animation
            : anim => anim.indexOf('__svelte') === -1 // remove all Svelte animations
        );
        const deleted = previous.length - next.length;
        if (deleted) {
            node.style.animation = next.join(', ');
            active -= deleted;
            if (!active)
                clear_rules();
        }
    }
    function clear_rules() {
        raf(() => {
            if (active)
                return;
            active_docs.forEach(doc => {
                const stylesheet = doc.__svelte_stylesheet;
                let i = stylesheet.cssRules.length;
                while (i--)
                    stylesheet.deleteRule(i);
                doc.__svelte_rules = {};
            });
            active_docs.clear();
        });
    }

    function create_animation(node, from, fn, params) {
        if (!from)
            return noop;
        const to = node.getBoundingClientRect();
        if (from.left === to.left && from.right === to.right && from.top === to.top && from.bottom === to.bottom)
            return noop;
        const { delay = 0, duration = 300, easing = identity, 
        // @ts-ignore todo: should this be separated from destructuring? Or start/end added to public api and documentation?
        start: start_time = now() + delay, 
        // @ts-ignore todo:
        end = start_time + duration, tick = noop, css } = fn(node, { from, to }, params);
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
            if (css)
                delete_rule(node, name);
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
            const { width, height } = style;
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
    function set_current_component(component) {
        current_component = component;
    }
    function get_current_component() {
        if (!current_component)
            throw new Error('Function called outside component initialization');
        return current_component;
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

    const dirty_components = [];
    const binding_callbacks = [];
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
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    function add_flush_callback(fn) {
        flush_callbacks.push(fn);
    }
    let flushing = false;
    const seen_callbacks = new Set();
    function flush() {
        if (flushing)
            return;
        flushing = true;
        do {
            // first, call beforeUpdate functions
            // and update components
            for (let i = 0; i < dirty_components.length; i += 1) {
                const component = dirty_components[i];
                set_current_component(component);
                update(component.$$);
            }
            set_current_component(null);
            dirty_components.length = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
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
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
    }
    const null_transition = { duration: 0 };
    function create_bidirectional_transition(node, fn, params, intro) {
        let config = fn(node, params);
        let t = intro ? 0 : 1;
        let running_program = null;
        let pending_program = null;
        let animation_name = null;
        function clear_animation() {
            if (animation_name)
                delete_rule(node, animation_name);
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
            const { delay = 0, duration = 300, easing = identity, tick = noop, css } = config || null_transition;
            const program = {
                start: now() + delay,
                b
            };
            if (!b) {
                // @ts-ignore todo: improve typings
                program.group = outros;
                outros.r += 1;
            }
            if (running_program || pending_program) {
                pending_program = program;
            }
            else {
                // if this is an intro, and there's a delay, we need to do
                // an initial tick and/or apply CSS animation immediately
                if (css) {
                    clear_animation();
                    animation_name = create_rule(node, t, b, duration, delay, easing, css);
                }
                if (b)
                    tick(0, 1);
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
                                }
                                else {
                                    // outro — needs to be coordinated
                                    if (!--running_program.group.r)
                                        run_all(running_program.group.c);
                                }
                            }
                            running_program = null;
                        }
                        else if (now >= running_program.start) {
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
                }
                else {
                    go(b);
                }
            },
            end() {
                clear_animation();
                running_program = pending_program = null;
            }
        };
    }

    function destroy_block(block, lookup) {
        block.d(1);
        lookup.delete(block.key);
    }
    function outro_and_destroy_block(block, lookup) {
        transition_out(block, 1, 1, () => {
            lookup.delete(block.key);
        });
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
        while (i--)
            old_indexes[old_blocks[i].key] = i;
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
            }
            else if (dynamic) {
                block.p(child_ctx, dirty);
            }
            new_lookup.set(key, new_blocks[i] = block);
            if (key in old_indexes)
                deltas.set(key, Math.abs(i - old_indexes[key]));
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
            }
            else if (!new_lookup.has(old_key)) {
                // remove old block
                destroy(old_block, lookup);
                o--;
            }
            else if (!lookup.has(new_key) || will_move.has(new_key)) {
                insert(new_block);
            }
            else if (did_move.has(old_key)) {
                o--;
            }
            else if (deltas.get(new_key) > deltas.get(old_key)) {
                did_move.add(new_key);
                insert(new_block);
            }
            else {
                will_move.add(old_key);
                o--;
            }
        }
        while (o--) {
            const old_block = old_blocks[o];
            if (!new_lookup.has(old_block.key))
                destroy(old_block, lookup);
        }
        while (n)
            insert(new_blocks[n - 1]);
        return new_blocks;
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
    function mount_component(component, target, anchor, customElement) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
            // onMount happens before the initial afterUpdate
            add_render_callback(() => {
                const new_on_destroy = on_mount.map(run).filter(is_function);
                if (on_destroy) {
                    on_destroy.push(...new_on_destroy);
                }
                else {
                    // Edge case - component was destroyed immediately,
                    // most likely as a result of a binding initialising
                    run_all(new_on_destroy);
                }
                component.$$.on_mount = [];
            });
        }
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
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
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
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
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(parent_component ? parent_component.$$.context : options.context || []),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false
        };
        let ready = false;
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                start_hydrating();
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor, options.customElement);
            end_hydrating();
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

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
    function writable(value, start = noop) {
        let stop;
        const subscribers = [];
        function set(new_value) {
            if (safe_not_equal(value, new_value)) {
                value = new_value;
                if (stop) { // store is ready
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
        function subscribe(run, invalidate = noop) {
            const subscriber = [run, invalidate];
            subscribers.push(subscriber);
            if (subscribers.length === 1) {
                stop = start(set) || noop;
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
        return { set, update, subscribe };
    }
    function derived(stores, fn, initial_value) {
        const single = !Array.isArray(stores);
        const stores_array = single
            ? [stores]
            : stores;
        const auto = fn.length < 2;
        return readable(initial_value, (set) => {
            let inited = false;
            const values = [];
            let pending = 0;
            let cleanup = noop;
            const sync = () => {
                if (pending) {
                    return;
                }
                cleanup();
                const result = fn(single ? values[0] : values, set);
                if (auto) {
                    set(result);
                }
                else {
                    cleanup = is_function(result) ? result : noop;
                }
            };
            const unsubscribers = stores_array.map((store, i) => subscribe(store, (value) => {
                values[i] = value;
                pending &= ~(1 << i);
                if (inited) {
                    sync();
                }
            }, () => {
                pending |= (1 << i);
            }));
            inited = true;
            sync();
            return function stop() {
                run_all(unsubscribers);
                cleanup();
            };
        });
    }

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
    }

    const GLOBALS_WHITE_LISTED = 'Infinity,undefined,NaN,isFinite,isNaN,parseFloat,parseInt,decodeURI,' +
        'decodeURIComponent,encodeURI,encodeURIComponent,Math,Number,Date,Array,' +
        'Object,Boolean,String,RegExp,Map,Set,JSON,Intl,BigInt';
    const isGloballyWhitelisted = /*#__PURE__*/ makeMap(GLOBALS_WHITE_LISTED);
    const EMPTY_OBJ = {};
    const NOOP = () => { };
    const extend = Object.assign;
    const remove = (arr, el) => {
        const i = arr.indexOf(el);
        if (i > -1) {
            arr.splice(i, 1);
        }
    };
    const hasOwnProperty = Object.prototype.hasOwnProperty;
    const hasOwn = (val, key) => hasOwnProperty.call(val, key);
    const isArray = Array.isArray;
    const isMap = (val) => toTypeString(val) === '[object Map]';
    const isSet = (val) => toTypeString(val) === '[object Set]';
    const isFunction = (val) => typeof val === 'function';
    const isString = (val) => typeof val === 'string';
    const isSymbol = (val) => typeof val === 'symbol';
    const isObject = (val) => val !== null && typeof val === 'object';
    const isPromise = (val) => {
        return isObject(val) && isFunction(val.then) && isFunction(val.catch);
    };
    const objectToString = Object.prototype.toString;
    const toTypeString = (value) => objectToString.call(value);
    const toRawType = (value) => {
        // extract "RawType" from strings like "[object RawType]"
        return toTypeString(value).slice(8, -1);
    };
    const isPlainObject = (val) => toTypeString(val) === '[object Object]';
    const isIntegerKey = (key) => isString(key) &&
        key !== 'NaN' &&
        key[0] !== '-' &&
        '' + parseInt(key, 10) === key;
    // compare whether a value has changed, accounting for NaN.
    const hasChanged = (value, oldValue) => value !== oldValue && (value === value || oldValue === oldValue);

    const targetMap = new WeakMap();
    const effectStack = [];
    let activeEffect;
    const ITERATE_KEY = Symbol('');
    const MAP_KEY_ITERATE_KEY = Symbol('');
    function isEffect(fn) {
        return fn && fn._isEffect === true;
    }
    function effect(fn, options = EMPTY_OBJ) {
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
                return fn();
            }
            if (!effectStack.includes(effect)) {
                cleanup(effect);
                try {
                    enableTracking();
                    effectStack.push(effect);
                    activeEffect = effect;
                    return fn();
                }
                finally {
                    effectStack.pop();
                    resetTracking();
                    activeEffect = effectStack[effectStack.length - 1];
                }
            }
        };
        effect.id = uid++;
        effect.allowRecurse = !!options.allowRecurse;
        effect._isEffect = true;
        effect.active = true;
        effect.raw = fn;
        effect.deps = [];
        effect.options = options;
        return effect;
    }
    function cleanup(effect) {
        const { deps } = effect;
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
            targetMap.set(target, (depsMap = new Map()));
        }
        let dep = depsMap.get(key);
        if (!dep) {
            depsMap.set(key, (dep = new Set()));
        }
        if (!dep.has(activeEffect)) {
            dep.add(activeEffect);
            activeEffect.deps.push(dep);
        }
    }
    function trigger(target, type, key, newValue, oldValue, oldTarget) {
        const depsMap = targetMap.get(target);
        if (!depsMap) {
            // never been tracked
            return;
        }
        const effects = new Set();
        const add = (effectsToAdd) => {
            if (effectsToAdd) {
                effectsToAdd.forEach(effect => {
                    if (effect !== activeEffect || effect.allowRecurse) {
                        effects.add(effect);
                    }
                });
            }
        };
        if (type === "clear" /* CLEAR */) {
            // collection being cleared
            // trigger all effects for target
            depsMap.forEach(add);
        }
        else if (key === 'length' && isArray(target)) {
            depsMap.forEach((dep, key) => {
                if (key === 'length' || key >= newValue) {
                    add(dep);
                }
            });
        }
        else {
            // schedule runs for SET | ADD | DELETE
            if (key !== void 0) {
                add(depsMap.get(key));
            }
            // also run for iteration key on ADD | DELETE | Map.SET
            switch (type) {
                case "add" /* ADD */:
                    if (!isArray(target)) {
                        add(depsMap.get(ITERATE_KEY));
                        if (isMap(target)) {
                            add(depsMap.get(MAP_KEY_ITERATE_KEY));
                        }
                    }
                    else if (isIntegerKey(key)) {
                        // new index added to array -> length changes
                        add(depsMap.get('length'));
                    }
                    break;
                case "delete" /* DELETE */:
                    if (!isArray(target)) {
                        add(depsMap.get(ITERATE_KEY));
                        if (isMap(target)) {
                            add(depsMap.get(MAP_KEY_ITERATE_KEY));
                        }
                    }
                    break;
                case "set" /* SET */:
                    if (isMap(target)) {
                        add(depsMap.get(ITERATE_KEY));
                    }
                    break;
            }
        }
        const run = (effect) => {
            if (effect.options.scheduler) {
                effect.options.scheduler(effect);
            }
            else {
                effect();
            }
        };
        effects.forEach(run);
    }

    const isNonTrackableKeys = /*#__PURE__*/ makeMap(`__proto__,__v_isRef,__isVue`);
    const builtInSymbols = new Set(Object.getOwnPropertyNames(Symbol)
        .map(key => Symbol[key])
        .filter(isSymbol));
    const get = /*#__PURE__*/ createGetter();
    const shallowGet = /*#__PURE__*/ createGetter(false, true);
    const readonlyGet = /*#__PURE__*/ createGetter(true);
    const shallowReadonlyGet = /*#__PURE__*/ createGetter(true, true);
    const arrayInstrumentations = {};
    ['includes', 'indexOf', 'lastIndexOf'].forEach(key => {
        const method = Array.prototype[key];
        arrayInstrumentations[key] = function (...args) {
            const arr = toRaw(this);
            for (let i = 0, l = this.length; i < l; i++) {
                track(arr, "get" /* GET */, i + '');
            }
            // we run the method using the original args first (which may be reactive)
            const res = method.apply(arr, args);
            if (res === -1 || res === false) {
                // if that didn't work, run it again using raw values.
                return method.apply(arr, args.map(toRaw));
            }
            else {
                return res;
            }
        };
    });
    ['push', 'pop', 'shift', 'unshift', 'splice'].forEach(key => {
        const method = Array.prototype[key];
        arrayInstrumentations[key] = function (...args) {
            pauseTracking();
            const res = method.apply(this, args);
            resetTracking();
            return res;
        };
    });
    function createGetter(isReadonly = false, shallow = false) {
        return function get(target, key, receiver) {
            if (key === "__v_isReactive" /* IS_REACTIVE */) {
                return !isReadonly;
            }
            else if (key === "__v_isReadonly" /* IS_READONLY */) {
                return isReadonly;
            }
            else if (key === "__v_raw" /* RAW */ &&
                receiver ===
                    (isReadonly
                        ? shallow
                            ? shallowReadonlyMap
                            : readonlyMap
                        : shallow
                            ? shallowReactiveMap
                            : reactiveMap).get(target)) {
                return target;
            }
            const targetIsArray = isArray(target);
            if (!isReadonly && targetIsArray && hasOwn(arrayInstrumentations, key)) {
                return Reflect.get(arrayInstrumentations, key, receiver);
            }
            const res = Reflect.get(target, key, receiver);
            if (isSymbol(key) ? builtInSymbols.has(key) : isNonTrackableKeys(key)) {
                return res;
            }
            if (!isReadonly) {
                track(target, "get" /* GET */, key);
            }
            if (shallow) {
                return res;
            }
            if (isRef(res)) {
                // ref unwrapping - does not apply for Array + integer key.
                const shouldUnwrap = !targetIsArray || !isIntegerKey(key);
                return shouldUnwrap ? res.value : res;
            }
            if (isObject(res)) {
                // Convert returned value into a proxy as well. we do the isObject check
                // here to avoid invalid value warning. Also need to lazy access readonly
                // and reactive here to avoid circular dependency.
                return isReadonly ? readonly(res) : reactive(res);
            }
            return res;
        };
    }
    const set = /*#__PURE__*/ createSetter();
    const shallowSet = /*#__PURE__*/ createSetter(true);
    function createSetter(shallow = false) {
        return function set(target, key, value, receiver) {
            let oldValue = target[key];
            if (!shallow) {
                value = toRaw(value);
                oldValue = toRaw(oldValue);
                if (!isArray(target) && isRef(oldValue) && !isRef(value)) {
                    oldValue.value = value;
                    return true;
                }
            }
            const hadKey = isArray(target) && isIntegerKey(key)
                ? Number(key) < target.length
                : hasOwn(target, key);
            const result = Reflect.set(target, key, value, receiver);
            // don't trigger if target is something up in the prototype chain of original
            if (target === toRaw(receiver)) {
                if (!hadKey) {
                    trigger(target, "add" /* ADD */, key, value);
                }
                else if (hasChanged(value, oldValue)) {
                    trigger(target, "set" /* SET */, key, value);
                }
            }
            return result;
        };
    }
    function deleteProperty(target, key) {
        const hadKey = hasOwn(target, key);
        target[key];
        const result = Reflect.deleteProperty(target, key);
        if (result && hadKey) {
            trigger(target, "delete" /* DELETE */, key, undefined);
        }
        return result;
    }
    function has(target, key) {
        const result = Reflect.has(target, key);
        if (!isSymbol(key) || !builtInSymbols.has(key)) {
            track(target, "has" /* HAS */, key);
        }
        return result;
    }
    function ownKeys(target) {
        track(target, "iterate" /* ITERATE */, isArray(target) ? 'length' : ITERATE_KEY);
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
        set(target, key) {
            return true;
        },
        deleteProperty(target, key) {
            return true;
        }
    };
    extend({}, mutableHandlers, {
        get: shallowGet,
        set: shallowSet
    });
    // Props handlers are special in the sense that it should not unwrap top-level
    // refs (in order to allow refs to be explicitly passed down), but should
    // retain the reactivity of the normal readonly object.
    extend({}, readonlyHandlers, {
        get: shallowReadonlyGet
    });

    const toReactive = (value) => isObject(value) ? reactive(value) : value;
    const toReadonly = (value) => isObject(value) ? readonly(value) : value;
    const toShallow = (value) => value;
    const getProto = (v) => Reflect.getPrototypeOf(v);
    function get$1(target, key, isReadonly = false, isShallow = false) {
        // #1772: readonly(reactive(Map)) should return readonly + reactive version
        // of the value
        target = target["__v_raw" /* RAW */];
        const rawTarget = toRaw(target);
        const rawKey = toRaw(key);
        if (key !== rawKey) {
            !isReadonly && track(rawTarget, "get" /* GET */, key);
        }
        !isReadonly && track(rawTarget, "get" /* GET */, rawKey);
        const { has } = getProto(rawTarget);
        const wrap = isShallow ? toShallow : isReadonly ? toReadonly : toReactive;
        if (has.call(rawTarget, key)) {
            return wrap(target.get(key));
        }
        else if (has.call(rawTarget, rawKey)) {
            return wrap(target.get(rawKey));
        }
        else if (target !== rawTarget) {
            // #3602 readonly(reactive(Map))
            // ensure that the nested reactive `Map` can do tracking for itself
            target.get(key);
        }
    }
    function has$1(key, isReadonly = false) {
        const target = this["__v_raw" /* RAW */];
        const rawTarget = toRaw(target);
        const rawKey = toRaw(key);
        if (key !== rawKey) {
            !isReadonly && track(rawTarget, "has" /* HAS */, key);
        }
        !isReadonly && track(rawTarget, "has" /* HAS */, rawKey);
        return key === rawKey
            ? target.has(key)
            : target.has(key) || target.has(rawKey);
    }
    function size(target, isReadonly = false) {
        target = target["__v_raw" /* RAW */];
        !isReadonly && track(toRaw(target), "iterate" /* ITERATE */, ITERATE_KEY);
        return Reflect.get(target, 'size', target);
    }
    function add(value) {
        value = toRaw(value);
        const target = toRaw(this);
        const proto = getProto(target);
        const hadKey = proto.has.call(target, value);
        if (!hadKey) {
            target.add(value);
            trigger(target, "add" /* ADD */, value, value);
        }
        return this;
    }
    function set$1(key, value) {
        value = toRaw(value);
        const target = toRaw(this);
        const { has, get } = getProto(target);
        let hadKey = has.call(target, key);
        if (!hadKey) {
            key = toRaw(key);
            hadKey = has.call(target, key);
        }
        const oldValue = get.call(target, key);
        target.set(key, value);
        if (!hadKey) {
            trigger(target, "add" /* ADD */, key, value);
        }
        else if (hasChanged(value, oldValue)) {
            trigger(target, "set" /* SET */, key, value);
        }
        return this;
    }
    function deleteEntry(key) {
        const target = toRaw(this);
        const { has, get } = getProto(target);
        let hadKey = has.call(target, key);
        if (!hadKey) {
            key = toRaw(key);
            hadKey = has.call(target, key);
        }
        get ? get.call(target, key) : undefined;
        // forward the operation before queueing reactions
        const result = target.delete(key);
        if (hadKey) {
            trigger(target, "delete" /* DELETE */, key, undefined);
        }
        return result;
    }
    function clear() {
        const target = toRaw(this);
        const hadItems = target.size !== 0;
        // forward the operation before queueing reactions
        const result = target.clear();
        if (hadItems) {
            trigger(target, "clear" /* CLEAR */, undefined, undefined);
        }
        return result;
    }
    function createForEach(isReadonly, isShallow) {
        return function forEach(callback, thisArg) {
            const observed = this;
            const target = observed["__v_raw" /* RAW */];
            const rawTarget = toRaw(target);
            const wrap = isShallow ? toShallow : isReadonly ? toReadonly : toReactive;
            !isReadonly && track(rawTarget, "iterate" /* ITERATE */, ITERATE_KEY);
            return target.forEach((value, key) => {
                // important: make sure the callback is
                // 1. invoked with the reactive map as `this` and 3rd arg
                // 2. the value received should be a corresponding reactive/readonly.
                return callback.call(thisArg, wrap(value), wrap(key), observed);
            });
        };
    }
    function createIterableMethod(method, isReadonly, isShallow) {
        return function (...args) {
            const target = this["__v_raw" /* RAW */];
            const rawTarget = toRaw(target);
            const targetIsMap = isMap(rawTarget);
            const isPair = method === 'entries' || (method === Symbol.iterator && targetIsMap);
            const isKeyOnly = method === 'keys' && targetIsMap;
            const innerIterator = target[method](...args);
            const wrap = isShallow ? toShallow : isReadonly ? toReadonly : toReactive;
            !isReadonly &&
                track(rawTarget, "iterate" /* ITERATE */, isKeyOnly ? MAP_KEY_ITERATE_KEY : ITERATE_KEY);
            // return a wrapped iterator which returns observed versions of the
            // values emitted from the real iterator
            return {
                // iterator protocol
                next() {
                    const { value, done } = innerIterator.next();
                    return done
                        ? { value, done }
                        : {
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
            return type === "delete" /* DELETE */ ? false : this;
        };
    }
    const mutableInstrumentations = {
        get(key) {
            return get$1(this, key);
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
            return get$1(this, key, false, true);
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
            return get$1(this, key, true);
        },
        get size() {
            return size(this, true);
        },
        has(key) {
            return has$1.call(this, key, true);
        },
        add: createReadonlyMethod("add" /* ADD */),
        set: createReadonlyMethod("set" /* SET */),
        delete: createReadonlyMethod("delete" /* DELETE */),
        clear: createReadonlyMethod("clear" /* CLEAR */),
        forEach: createForEach(true, false)
    };
    const shallowReadonlyInstrumentations = {
        get(key) {
            return get$1(this, key, true, true);
        },
        get size() {
            return size(this, true);
        },
        has(key) {
            return has$1.call(this, key, true);
        },
        add: createReadonlyMethod("add" /* ADD */),
        set: createReadonlyMethod("set" /* SET */),
        delete: createReadonlyMethod("delete" /* DELETE */),
        clear: createReadonlyMethod("clear" /* CLEAR */),
        forEach: createForEach(true, true)
    };
    const iteratorMethods = ['keys', 'values', 'entries', Symbol.iterator];
    iteratorMethods.forEach(method => {
        mutableInstrumentations[method] = createIterableMethod(method, false, false);
        readonlyInstrumentations[method] = createIterableMethod(method, true, false);
        shallowInstrumentations[method] = createIterableMethod(method, false, true);
        shallowReadonlyInstrumentations[method] = createIterableMethod(method, true, true);
    });
    function createInstrumentationGetter(isReadonly, shallow) {
        const instrumentations = shallow
            ? isReadonly
                ? shallowReadonlyInstrumentations
                : shallowInstrumentations
            : isReadonly
                ? readonlyInstrumentations
                : mutableInstrumentations;
        return (target, key, receiver) => {
            if (key === "__v_isReactive" /* IS_REACTIVE */) {
                return !isReadonly;
            }
            else if (key === "__v_isReadonly" /* IS_READONLY */) {
                return isReadonly;
            }
            else if (key === "__v_raw" /* RAW */) {
                return target;
            }
            return Reflect.get(hasOwn(instrumentations, key) && key in target
                ? instrumentations
                : target, key, receiver);
        };
    }
    const mutableCollectionHandlers = {
        get: createInstrumentationGetter(false, false)
    };
    const readonlyCollectionHandlers = {
        get: createInstrumentationGetter(true, false)
    };

    const reactiveMap = new WeakMap();
    const shallowReactiveMap = new WeakMap();
    const readonlyMap = new WeakMap();
    const shallowReadonlyMap = new WeakMap();
    function targetTypeMap(rawType) {
        switch (rawType) {
            case 'Object':
            case 'Array':
                return 1 /* COMMON */;
            case 'Map':
            case 'Set':
            case 'WeakMap':
            case 'WeakSet':
                return 2 /* COLLECTION */;
            default:
                return 0 /* INVALID */;
        }
    }
    function getTargetType(value) {
        return value["__v_skip" /* SKIP */] || !Object.isExtensible(value)
            ? 0 /* INVALID */
            : targetTypeMap(toRawType(value));
    }
    function reactive(target) {
        // if trying to observe a readonly proxy, return the readonly version.
        if (target && target["__v_isReadonly" /* IS_READONLY */]) {
            return target;
        }
        return createReactiveObject(target, false, mutableHandlers, mutableCollectionHandlers, reactiveMap);
    }
    /**
     * Creates a readonly copy of the original object. Note the returned copy is not
     * made reactive, but `readonly` can be called on an already reactive object.
     */
    function readonly(target) {
        return createReactiveObject(target, true, readonlyHandlers, readonlyCollectionHandlers, readonlyMap);
    }
    function createReactiveObject(target, isReadonly, baseHandlers, collectionHandlers, proxyMap) {
        if (!isObject(target)) {
            return target;
        }
        // target is already a Proxy, return it.
        // exception: calling readonly() on a reactive object
        if (target["__v_raw" /* RAW */] &&
            !(isReadonly && target["__v_isReactive" /* IS_REACTIVE */])) {
            return target;
        }
        // target already has corresponding Proxy
        const existingProxy = proxyMap.get(target);
        if (existingProxy) {
            return existingProxy;
        }
        // only a whitelist of value types can be observed.
        const targetType = getTargetType(target);
        if (targetType === 0 /* INVALID */) {
            return target;
        }
        const proxy = new Proxy(target, targetType === 2 /* COLLECTION */ ? collectionHandlers : baseHandlers);
        proxyMap.set(target, proxy);
        return proxy;
    }
    function isReactive(value) {
        if (isReadonly(value)) {
            return isReactive(value["__v_raw" /* RAW */]);
        }
        return !!(value && value["__v_isReactive" /* IS_REACTIVE */]);
    }
    function isReadonly(value) {
        return !!(value && value["__v_isReadonly" /* IS_READONLY */]);
    }
    function toRaw(observed) {
        return ((observed && toRaw(observed["__v_raw" /* RAW */])) || observed);
    }
    function isRef(r) {
        return Boolean(r && r.__v_isRef === true);
    }

    const stack = [];
    function warn(msg, ...args) {
        // avoid props formatting or warn handler tracking deps that might be mutated
        // during patch, leading to infinite recursion.
        pauseTracking();
        const instance = stack.length ? stack[stack.length - 1].component : null;
        const appWarnHandler = instance && instance.appContext.config.warnHandler;
        const trace = getComponentTrace();
        if (appWarnHandler) {
            callWithErrorHandling(appWarnHandler, instance, 11 /* APP_WARN_HANDLER */, [
                msg + args.join(''),
                instance && instance.proxy,
                trace
                    .map(({ vnode }) => `at <${formatComponentName(instance, vnode.type)}>`)
                    .join('\n'),
                trace
            ]);
        }
        else {
            const warnArgs = [`[Vue warn]: ${msg}`, ...args];
            /* istanbul ignore if */
            if (trace.length &&
                // avoid spamming console during tests
                !false) {
                warnArgs.push(`\n`, ...formatTrace(trace));
            }
            console.warn(...warnArgs);
        }
        resetTracking();
    }
    function getComponentTrace() {
        let currentVNode = stack[stack.length - 1];
        if (!currentVNode) {
            return [];
        }
        // we can't just use the stack because it will be incomplete during updates
        // that did not start from the root. Re-construct the parent chain using
        // instance parent pointers.
        const normalizedStack = [];
        while (currentVNode) {
            const last = normalizedStack[0];
            if (last && last.vnode === currentVNode) {
                last.recurseCount++;
            }
            else {
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
    function formatTraceEntry({ vnode, recurseCount }) {
        const postfix = recurseCount > 0 ? `... (${recurseCount} recursive calls)` : ``;
        const isRoot = vnode.component ? vnode.component.parent == null : false;
        const open = ` at <${formatComponentName(vnode.component, vnode.type, isRoot)}`;
        const close = `>` + postfix;
        return vnode.props
            ? [open, ...formatProps(vnode.props), close]
            : [open + close];
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
        if (isString(value)) {
            value = JSON.stringify(value);
            return raw ? value : [`${key}=${value}`];
        }
        else if (typeof value === 'number' ||
            typeof value === 'boolean' ||
            value == null) {
            return raw ? value : [`${key}=${value}`];
        }
        else if (isRef(value)) {
            value = formatProp(key, toRaw(value.value), true);
            return raw ? value : [`${key}=Ref<`, value, `>`];
        }
        else if (isFunction(value)) {
            return [`${key}=fn${value.name ? `<${value.name}>` : ``}`];
        }
        else {
            value = toRaw(value);
            return raw ? value : [`${key}=`, value];
        }
    }
    function callWithErrorHandling(fn, instance, type, args) {
        let res;
        try {
            res = args ? fn(...args) : fn();
        }
        catch (err) {
            handleError(err, instance, type);
        }
        return res;
    }
    function callWithAsyncErrorHandling(fn, instance, type, args) {
        if (isFunction(fn)) {
            const res = callWithErrorHandling(fn, instance, type, args);
            if (res && isPromise(res)) {
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
    function handleError(err, instance, type, throwInDev = true) {
        const contextVNode = instance ? instance.vnode : null;
        if (instance) {
            let cur = instance.parent;
            // the exposed instance is the render proxy to keep it consistent with 2.x
            const exposedInstance = instance.proxy;
            // in production the hook receives only the error code
            const errorInfo = type;
            while (cur) {
                const errorCapturedHooks = cur.ec;
                if (errorCapturedHooks) {
                    for (let i = 0; i < errorCapturedHooks.length; i++) {
                        if (errorCapturedHooks[i](err, exposedInstance, errorInfo) === false) {
                            return;
                        }
                    }
                }
                cur = cur.parent;
            }
            // app-level handling
            const appErrorHandler = instance.appContext.config.errorHandler;
            if (appErrorHandler) {
                callWithErrorHandling(appErrorHandler, null, 10 /* APP_ERROR_HANDLER */, [err, exposedInstance, errorInfo]);
                return;
            }
        }
        logError(err, type, contextVNode, throwInDev);
    }
    function logError(err, type, contextVNode, throwInDev = true) {
        {
            // recover in prod to reduce the impact on end-user
            console.error(err);
        }
    }

    let isFlushing = false;
    let isFlushPending = false;
    const queue = [];
    let flushIndex = 0;
    const pendingPreFlushCbs = [];
    let activePreFlushCbs = null;
    let preFlushIndex = 0;
    const pendingPostFlushCbs = [];
    let activePostFlushCbs = null;
    let postFlushIndex = 0;
    const resolvedPromise = Promise.resolve();
    let currentFlushPromise = null;
    let currentPreFlushParentJob = null;
    const RECURSION_LIMIT = 100;
    function nextTick(fn) {
        const p = currentFlushPromise || resolvedPromise;
        return fn ? p.then(this ? fn.bind(this) : fn) : p;
    }
    // #2768
    // Use binary-search to find a suitable position in the queue,
    // so that the queue maintains the increasing order of job's id,
    // which can prevent the job from being skipped and also can avoid repeated patching.
    function findInsertionIndex(job) {
        // the start index should be `flushIndex + 1`
        let start = flushIndex + 1;
        let end = queue.length;
        const jobId = getId(job);
        while (start < end) {
            const middle = (start + end) >>> 1;
            const middleJobId = getId(queue[middle]);
            middleJobId < jobId ? (start = middle + 1) : (end = middle);
        }
        return start;
    }
    function queueJob(job) {
        // the dedupe search uses the startIndex argument of Array.includes()
        // by default the search index includes the current job that is being run
        // so it cannot recursively trigger itself again.
        // if the job is a watch() callback, the search will start with a +1 index to
        // allow it recursively trigger itself - it is the user's responsibility to
        // ensure it doesn't end up in an infinite loop.
        if ((!queue.length ||
            !queue.includes(job, isFlushing && job.allowRecurse ? flushIndex + 1 : flushIndex)) &&
            job !== currentPreFlushParentJob) {
            const pos = findInsertionIndex(job);
            if (pos > -1) {
                queue.splice(pos, 0, job);
            }
            else {
                queue.push(job);
            }
            queueFlush();
        }
    }
    function queueFlush() {
        if (!isFlushing && !isFlushPending) {
            isFlushPending = true;
            currentFlushPromise = resolvedPromise.then(flushJobs);
        }
    }
    function queueCb(cb, activeQueue, pendingQueue, index) {
        if (!isArray(cb)) {
            if (!activeQueue ||
                !activeQueue.includes(cb, cb.allowRecurse ? index + 1 : index)) {
                pendingQueue.push(cb);
            }
        }
        else {
            // if cb is an array, it is a component lifecycle hook which can only be
            // triggered by a job, which is already deduped in the main queue, so
            // we can skip duplicate check here to improve perf
            pendingQueue.push(...cb);
        }
        queueFlush();
    }
    function queuePreFlushCb(cb) {
        queueCb(cb, activePreFlushCbs, pendingPreFlushCbs, preFlushIndex);
    }
    function queuePostFlushCb(cb) {
        queueCb(cb, activePostFlushCbs, pendingPostFlushCbs, postFlushIndex);
    }
    function flushPreFlushCbs(seen, parentJob = null) {
        if (pendingPreFlushCbs.length) {
            currentPreFlushParentJob = parentJob;
            activePreFlushCbs = [...new Set(pendingPreFlushCbs)];
            pendingPreFlushCbs.length = 0;
            for (preFlushIndex = 0; preFlushIndex < activePreFlushCbs.length; preFlushIndex++) {
                activePreFlushCbs[preFlushIndex]();
            }
            activePreFlushCbs = null;
            preFlushIndex = 0;
            currentPreFlushParentJob = null;
            // recursively flush until it drains
            flushPreFlushCbs(seen, parentJob);
        }
    }
    function flushPostFlushCbs(seen) {
        if (pendingPostFlushCbs.length) {
            const deduped = [...new Set(pendingPostFlushCbs)];
            pendingPostFlushCbs.length = 0;
            // #1947 already has active queue, nested flushPostFlushCbs call
            if (activePostFlushCbs) {
                activePostFlushCbs.push(...deduped);
                return;
            }
            activePostFlushCbs = deduped;
            activePostFlushCbs.sort((a, b) => getId(a) - getId(b));
            for (postFlushIndex = 0; postFlushIndex < activePostFlushCbs.length; postFlushIndex++) {
                activePostFlushCbs[postFlushIndex]();
            }
            activePostFlushCbs = null;
            postFlushIndex = 0;
        }
    }
    const getId = (job) => job.id == null ? Infinity : job.id;
    function flushJobs(seen) {
        isFlushPending = false;
        isFlushing = true;
        flushPreFlushCbs(seen);
        // Sort queue before flush.
        // This ensures that:
        // 1. Components are updated from parent to child. (because parent is always
        //    created before the child so its render effect will have smaller
        //    priority number)
        // 2. If a component is unmounted during a parent component's update,
        //    its update can be skipped.
        queue.sort((a, b) => getId(a) - getId(b));
        try {
            for (flushIndex = 0; flushIndex < queue.length; flushIndex++) {
                const job = queue[flushIndex];
                if (job && job.active !== false) {
                    if (("production" !== 'production') && checkRecursiveUpdates(seen, job)) ;
                    callWithErrorHandling(job, null, 14 /* SCHEDULER */);
                }
            }
        }
        finally {
            flushIndex = 0;
            queue.length = 0;
            flushPostFlushCbs();
            isFlushing = false;
            currentFlushPromise = null;
            // some postFlushCb queued jobs!
            // keep flushing until it drains.
            if (queue.length ||
                pendingPreFlushCbs.length ||
                pendingPostFlushCbs.length) {
                flushJobs(seen);
            }
        }
    }
    function checkRecursiveUpdates(seen, fn) {
        if (!seen.has(fn)) {
            seen.set(fn, 1);
        }
        else {
            const count = seen.get(fn);
            if (count > RECURSION_LIMIT) {
                const instance = fn.ownerInstance;
                const componentName = instance && getComponentName(instance.type);
                warn(`Maximum recursive updates exceeded${componentName ? ` in component <${componentName}>` : ``}. ` +
                    `This means you have a reactive effect that is mutating its own ` +
                    `dependencies and thus recursively triggering itself. Possible sources ` +
                    `include component template, render function, updated hook or ` +
                    `watcher source function.`);
                return true;
            }
            else {
                seen.set(fn, count + 1);
            }
        }
    }
    function queueEffectWithSuspense(fn, suspense) {
        if (suspense && suspense.pendingBranch) {
            if (isArray(fn)) {
                suspense.effects.push(...fn);
            }
            else {
                suspense.effects.push(fn);
            }
        }
        else {
            queuePostFlushCb(fn);
        }
    }

    // Simple effect.
    function watchEffect(effect, options) {
        return doWatch(effect, null, options);
    }
    // initial value for watchers to trigger on undefined initial values
    const INITIAL_WATCHER_VALUE = {};
    function doWatch(source, cb, { immediate, deep, flush, onTrack, onTrigger } = EMPTY_OBJ, instance = currentInstance) {
        let getter;
        let forceTrigger = false;
        let isMultiSource = false;
        if (isRef(source)) {
            getter = () => source.value;
            forceTrigger = !!source._shallow;
        }
        else if (isReactive(source)) {
            getter = () => source;
            deep = true;
        }
        else if (isArray(source)) {
            isMultiSource = true;
            forceTrigger = source.some(isReactive);
            getter = () => source.map(s => {
                if (isRef(s)) {
                    return s.value;
                }
                else if (isReactive(s)) {
                    return traverse(s);
                }
                else if (isFunction(s)) {
                    return callWithErrorHandling(s, instance, 2 /* WATCH_GETTER */);
                }
                else ;
            });
        }
        else if (isFunction(source)) {
            if (cb) {
                // getter with cb
                getter = () => callWithErrorHandling(source, instance, 2 /* WATCH_GETTER */);
            }
            else {
                // no cb -> simple effect
                getter = () => {
                    if (instance && instance.isUnmounted) {
                        return;
                    }
                    if (cleanup) {
                        cleanup();
                    }
                    return callWithAsyncErrorHandling(source, instance, 3 /* WATCH_CALLBACK */, [onInvalidate]);
                };
            }
        }
        else {
            getter = NOOP;
        }
        if (cb && deep) {
            const baseGetter = getter;
            getter = () => traverse(baseGetter());
        }
        let cleanup;
        let onInvalidate = (fn) => {
            cleanup = runner.options.onStop = () => {
                callWithErrorHandling(fn, instance, 4 /* WATCH_CLEANUP */);
            };
        };
        let oldValue = isMultiSource ? [] : INITIAL_WATCHER_VALUE;
        const job = () => {
            if (!runner.active) {
                return;
            }
            if (cb) {
                // watch(source, cb)
                const newValue = runner();
                if (deep ||
                    forceTrigger ||
                    (isMultiSource
                        ? newValue.some((v, i) => hasChanged(v, oldValue[i]))
                        : hasChanged(newValue, oldValue)) ||
                    (false  )) {
                    // cleanup before running cb again
                    if (cleanup) {
                        cleanup();
                    }
                    callWithAsyncErrorHandling(cb, instance, 3 /* WATCH_CALLBACK */, [
                        newValue,
                        // pass undefined as the old value when it's changed for the first time
                        oldValue === INITIAL_WATCHER_VALUE ? undefined : oldValue,
                        onInvalidate
                    ]);
                    oldValue = newValue;
                }
            }
            else {
                // watchEffect
                runner();
            }
        };
        // important: mark the job as a watcher callback so that scheduler knows
        // it is allowed to self-trigger (#1727)
        job.allowRecurse = !!cb;
        let scheduler;
        if (flush === 'sync') {
            scheduler = job; // the scheduler function gets called directly
        }
        else if (flush === 'post') {
            scheduler = () => queuePostRenderEffect(job, instance && instance.suspense);
        }
        else {
            // default: 'pre'
            scheduler = () => {
                if (!instance || instance.isMounted) {
                    queuePreFlushCb(job);
                }
                else {
                    // with 'pre' option, the first call must happen before
                    // the component is mounted so it is called synchronously.
                    job();
                }
            };
        }
        const runner = effect(getter, {
            lazy: true,
            onTrack,
            onTrigger,
            scheduler
        });
        recordInstanceBoundEffect(runner, instance);
        // initial run
        if (cb) {
            if (immediate) {
                job();
            }
            else {
                oldValue = runner();
            }
        }
        else if (flush === 'post') {
            queuePostRenderEffect(runner, instance && instance.suspense);
        }
        else {
            runner();
        }
        return () => {
            stop(runner);
            if (instance) {
                remove(instance.effects, runner);
            }
        };
    }
    // this.$watch
    function instanceWatch(source, value, options) {
        const publicThis = this.proxy;
        const getter = isString(source)
            ? source.includes('.')
                ? createPathGetter(publicThis, source)
                : () => publicThis[source]
            : source.bind(publicThis, publicThis);
        let cb;
        if (isFunction(value)) {
            cb = value;
        }
        else {
            cb = value.handler;
            options = value;
        }
        return doWatch(getter, cb.bind(publicThis), options, this);
    }
    function createPathGetter(ctx, path) {
        const segments = path.split('.');
        return () => {
            let cur = ctx;
            for (let i = 0; i < segments.length && cur; i++) {
                cur = cur[segments[i]];
            }
            return cur;
        };
    }
    function traverse(value, seen = new Set()) {
        if (!isObject(value) ||
            seen.has(value) ||
            value["__v_skip" /* SKIP */]) {
            return value;
        }
        seen.add(value);
        if (isRef(value)) {
            traverse(value.value, seen);
        }
        else if (isArray(value)) {
            for (let i = 0; i < value.length; i++) {
                traverse(value[i], seen);
            }
        }
        else if (isSet(value) || isMap(value)) {
            value.forEach((v) => {
                traverse(v, seen);
            });
        }
        else if (isPlainObject(value)) {
            for (const key in value) {
                traverse(value[key], seen);
            }
        }
        return value;
    }
    let shouldCacheAccess = true;
    /**
     * Resolve merged options and cache it on the component.
     * This is done only once per-component since the merging does not involve
     * instances.
     */
    function resolveMergedOptions(instance) {
        const base = instance.type;
        const { mixins, extends: extendsOptions } = base;
        const { mixins: globalMixins, optionsCache: cache, config: { optionMergeStrategies } } = instance.appContext;
        const cached = cache.get(base);
        let resolved;
        if (cached) {
            resolved = cached;
        }
        else if (!globalMixins.length && !mixins && !extendsOptions) {
            {
                resolved = base;
            }
        }
        else {
            resolved = {};
            if (globalMixins.length) {
                globalMixins.forEach(m => mergeOptions(resolved, m, optionMergeStrategies, true));
            }
            mergeOptions(resolved, base, optionMergeStrategies);
        }
        cache.set(base, resolved);
        return resolved;
    }
    function mergeOptions(to, from, strats, asMixin = false) {
        const { mixins, extends: extendsOptions } = from;
        if (extendsOptions) {
            mergeOptions(to, extendsOptions, strats, true);
        }
        if (mixins) {
            mixins.forEach((m) => mergeOptions(to, m, strats, true));
        }
        for (const key in from) {
            if (asMixin && key === 'expose') ;
            else {
                const strat = internalOptionMergeStrats[key] || (strats && strats[key]);
                to[key] = strat ? strat(to[key], from[key]) : from[key];
            }
        }
        return to;
    }
    const internalOptionMergeStrats = {
        data: mergeDataFn,
        props: mergeObjectOptions,
        emits: mergeObjectOptions,
        // objects
        methods: mergeObjectOptions,
        computed: mergeObjectOptions,
        // lifecycle
        beforeCreate: mergeAsArray,
        created: mergeAsArray,
        beforeMount: mergeAsArray,
        mounted: mergeAsArray,
        beforeUpdate: mergeAsArray,
        updated: mergeAsArray,
        beforeDestroy: mergeAsArray,
        destroyed: mergeAsArray,
        activated: mergeAsArray,
        deactivated: mergeAsArray,
        errorCaptured: mergeAsArray,
        serverPrefetch: mergeAsArray,
        // assets
        components: mergeObjectOptions,
        directives: mergeObjectOptions,
        // watch
        watch: mergeWatchOptions,
        // provide / inject
        provide: mergeDataFn,
        inject: mergeInject
    };
    function mergeDataFn(to, from) {
        if (!from) {
            return to;
        }
        if (!to) {
            return from;
        }
        return function mergedDataFn() {
            return (extend)(isFunction(to) ? to.call(this, this) : to, isFunction(from) ? from.call(this, this) : from);
        };
    }
    function mergeInject(to, from) {
        return mergeObjectOptions(normalizeInject(to), normalizeInject(from));
    }
    function normalizeInject(raw) {
        if (isArray(raw)) {
            const res = {};
            for (let i = 0; i < raw.length; i++) {
                res[raw[i]] = raw[i];
            }
            return res;
        }
        return raw;
    }
    function mergeAsArray(to, from) {
        return to ? [...new Set([].concat(to, from))] : from;
    }
    function mergeObjectOptions(to, from) {
        return to ? extend(extend(Object.create(null), to), from) : from;
    }
    function mergeWatchOptions(to, from) {
        if (!to)
            return from;
        if (!from)
            return to;
        const merged = extend(Object.create(null), to);
        for (const key in from) {
            merged[key] = mergeAsArray(to[key], from[key]);
        }
        return merged;
    }
    const queuePostRenderEffect = queueEffectWithSuspense
        ;

    /**
     * #2437 In Vue 3, functional components do not have a public instance proxy but
     * they exist in the internal parent chain. For code that relies on traversing
     * public $parent chains, skip functional ones and go to the parent instead.
     */
    const getPublicInstance = (i) => {
        if (!i)
            return null;
        if (isStatefulComponent(i))
            return i.exposed ? i.exposed : i.proxy;
        return getPublicInstance(i.parent);
    };
    const publicPropertiesMap = extend(Object.create(null), {
        $: i => i,
        $el: i => i.vnode.el,
        $data: i => i.data,
        $props: i => (i.props),
        $attrs: i => (i.attrs),
        $slots: i => (i.slots),
        $refs: i => (i.refs),
        $parent: i => getPublicInstance(i.parent),
        $root: i => getPublicInstance(i.root),
        $emit: i => i.emit,
        $options: i => (__VUE_OPTIONS_API__ ? resolveMergedOptions(i) : i.type),
        $forceUpdate: i => () => queueJob(i.update),
        $nextTick: i => nextTick.bind(i.proxy),
        $watch: i => (__VUE_OPTIONS_API__ ? instanceWatch.bind(i) : NOOP)
    });
    const PublicInstanceProxyHandlers = {
        get({ _: instance }, key) {
            const { ctx, setupState, data, props, accessCache, type, appContext } = instance;
            // data / props / ctx
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
                        case 0 /* SETUP */:
                            return setupState[key];
                        case 1 /* DATA */:
                            return data[key];
                        case 3 /* CONTEXT */:
                            return ctx[key];
                        case 2 /* PROPS */:
                            return props[key];
                        // default: just fallthrough
                    }
                }
                else if (setupState !== EMPTY_OBJ && hasOwn(setupState, key)) {
                    accessCache[key] = 0 /* SETUP */;
                    return setupState[key];
                }
                else if (data !== EMPTY_OBJ && hasOwn(data, key)) {
                    accessCache[key] = 1 /* DATA */;
                    return data[key];
                }
                else if (
                // only cache other properties when instance has declared (thus stable)
                // props
                (normalizedProps = instance.propsOptions[0]) &&
                    hasOwn(normalizedProps, key)) {
                    accessCache[key] = 2 /* PROPS */;
                    return props[key];
                }
                else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) {
                    accessCache[key] = 3 /* CONTEXT */;
                    return ctx[key];
                }
                else if (!__VUE_OPTIONS_API__ || shouldCacheAccess) {
                    accessCache[key] = 4 /* OTHER */;
                }
            }
            const publicGetter = publicPropertiesMap[key];
            let cssModule, globalProperties;
            // public $xxx properties
            if (publicGetter) {
                if (key === '$attrs') {
                    track(instance, "get" /* GET */, key);
                }
                return publicGetter(instance);
            }
            else if (
            // css module (injected by vue-loader)
            (cssModule = type.__cssModules) &&
                (cssModule = cssModule[key])) {
                return cssModule;
            }
            else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) {
                // user may set custom properties to `this` that start with `$`
                accessCache[key] = 3 /* CONTEXT */;
                return ctx[key];
            }
            else if (
            // global properties
            ((globalProperties = appContext.config.globalProperties),
                hasOwn(globalProperties, key))) {
                {
                    return globalProperties[key];
                }
            }
            else ;
        },
        set({ _: instance }, key, value) {
            const { data, setupState, ctx } = instance;
            if (setupState !== EMPTY_OBJ && hasOwn(setupState, key)) {
                setupState[key] = value;
            }
            else if (data !== EMPTY_OBJ && hasOwn(data, key)) {
                data[key] = value;
            }
            else if (hasOwn(instance.props, key)) {
                return false;
            }
            if (key[0] === '$' && key.slice(1) in instance) {
                return false;
            }
            else {
                {
                    ctx[key] = value;
                }
            }
            return true;
        },
        has({ _: { data, setupState, accessCache, ctx, appContext, propsOptions } }, key) {
            let normalizedProps;
            return (accessCache[key] !== undefined ||
                (data !== EMPTY_OBJ && hasOwn(data, key)) ||
                (setupState !== EMPTY_OBJ && hasOwn(setupState, key)) ||
                ((normalizedProps = propsOptions[0]) && hasOwn(normalizedProps, key)) ||
                hasOwn(ctx, key) ||
                hasOwn(publicPropertiesMap, key) ||
                hasOwn(appContext.config.globalProperties, key));
        }
    };
    extend({}, PublicInstanceProxyHandlers, {
        get(target, key) {
            // fast path for unscopables when using `with` block
            if (key === Symbol.unscopables) {
                return;
            }
            return PublicInstanceProxyHandlers.get(target, key, target);
        },
        has(_, key) {
            const has = key[0] !== '_' && !isGloballyWhitelisted(key);
            return has;
        }
    });
    let currentInstance = null;
    function isStatefulComponent(instance) {
        return instance.vnode.shapeFlag & 4 /* STATEFUL_COMPONENT */;
    }
    // record effects created during a component's setup() so that they can be
    // stopped when the component unmounts
    function recordInstanceBoundEffect(effect, instance = currentInstance) {
        if (instance) {
            (instance.effects || (instance.effects = [])).push(effect);
        }
    }
    const classifyRE = /(?:^|[-_])(\w)/g;
    const classify = (str) => str.replace(classifyRE, c => c.toUpperCase()).replace(/[-_]/g, '');
    function getComponentName(Component) {
        return isFunction(Component)
            ? Component.displayName || Component.name
            : Component.name;
    }
    /* istanbul ignore next */
    function formatComponentName(instance, Component, isRoot = false) {
        let name = getComponentName(Component);
        if (!name && Component.__file) {
            const match = Component.__file.match(/([^/\\]+)\.\w+$/);
            if (match) {
                name = match[1];
            }
        }
        if (!name && instance && instance.parent) {
            // try to infer the name based on reverse resolution
            const inferFromRegistry = (registry) => {
                for (const key in registry) {
                    if (registry[key] === Component) {
                        return key;
                    }
                }
            };
            name =
                inferFromRegistry(instance.components ||
                    instance.parent.type.components) || inferFromRegistry(instance.appContext.components);
        }
        return name ? classify(name) : isRoot ? `App` : `Anonymous`;
    }

    /** 目前在呈现的消息列表 */
    const messageList = writable([]);
    /** 消息的基类 扩展类记得重写 thatMessage 以免公用出现bug */
    class Message {
        constructor(par) {
            this.par = par;
            /** 用来指向不同的类，以便扩展这个类的类的old_message不被公用 */
            this.autoHideTime = 1000 * 3;
        }
        /** 展示el */
        show() {
            messageList.update((r) => [...r, this]);
            return this;
        }
        /** 隐藏el */
        hide() {
            messageList.update((r) => r.filter((el) => this !== el));
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

    /** 是不是开发环境 */
    const isDev = window.__llej__userjs__dev__ === true;
    const config = reactive({
        state: 0,
        /** 是否开启编辑 */ elementEdit: isDev,
        /** 服务器地址 */
        serverIp: "https://shenzilong.cn/note/",
        /** 页面的url */
        locationUrl: decodeURIComponent(location.origin + location.pathname),
        /** 存储登录凭证的 */
        loginCredentials: "loginCredentials",
    });
    const elementEdit = writable(config.elementEdit, (set) => {
        watchEffect(() => {
            set(config.elementEdit);
        });
    });
    elementEdit.subscribe((value) => {
        config.elementEdit = value;
    });
    let t1 = Date.now();
    watchEffect(() => {
        if (Date.now() - t1 < 100) {
            return;
        }
        console.log("[config.elementEdit]", config.elementEdit);
        new Message({
            msg: `${config.elementEdit ? "开启" : "关闭"}编辑模式`,
        }).autoHide();
    });
    /** 存储命令栈的地方 */
    const AllStoreName = "_storeName_llej_" + config.locationUrl;

    /** 当前被选中的元素 */
    let currentElement;
    /** 修改当前指向的元素和路径 */
    function setPath(elList) {
        currentElement = elList[0];
    }
    /** 标记被修改后的元素(被污染了的元素)，以便保存修改的内容 */
    const editElement = new Set();
    // const globalSettingRef = fireStore.doc("setting/global");
    // globalSettingRef.onSnapshot({
    //   next(r) {
    //     console.log("[    r]", r.data());
    //   },
    // });
    // globalSettingRef.update({
    //   test: 3,
    // });
    // globalSettingRef
    //   //   .doc("samples/sandwichData")
    //   .get()
    //   .then((r) => {});

    const DomFun = {
        ancestorShadowRoot(el) {
            let current = el;
            while (current) {
                if (current instanceof Element && !current.shadowRoot) {
                    return current;
                }
                current = current.parentNode;
            }
            return null;
        },
        nodeNameInCorrectCase(el) {
            // If there is no local name, it's case sensitive
            if (!el.localName) {
                return el.nodeName;
            }
            // If the names are different lengths, there is a prefix and it's case sensitive
            if (el.localName.length !== el.nodeName.length) {
                return el.nodeName;
            }
            // Return the localname, which will be case insensitive if its an html node
            return el.localName;
        }
    };
    const cssPath = function (node, optimized) {
        if (node.nodeType !== Node.ELEMENT_NODE) {
            return '';
        }
        const steps = [];
        let contextNode = node;
        while (contextNode) {
            const step = _cssPathStep(contextNode, Boolean(optimized), contextNode === node);
            if (!step) {
                break;
            } // Error - bail out early.
            steps.push(step);
            if (step.optimized) {
                break;
            }
            //@ts-ignore
            contextNode = contextNode.parentElement;
        }
        steps.reverse();
        return steps.join(' > ');
    };
    // TODO(crbug.com/1172300) Ignored during the jsdoc to ts migration
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const _cssPathStep = function (node, optimized, isTargetNode) {
        if (node.nodeType !== Node.ELEMENT_NODE) {
            return null;
        }
        const id = node.getAttribute('id');
        if (optimized) {
            if (id) {
                return new Step(idSelector(id), true);
            }
            const nodeNameLower = node.nodeName.toLowerCase();
            if (nodeNameLower === 'body' || nodeNameLower === 'head' || nodeNameLower === 'html') {
                return new Step(DomFun.nodeNameInCorrectCase(node), true);
            }
        }
        const nodeName = DomFun.nodeNameInCorrectCase(node);
        if (id) {
            return new Step(nodeName + idSelector(id), true);
        }
        const parent = node.parentElement;
        if (!parent || parent.nodeType === Node.DOCUMENT_NODE) {
            return new Step(nodeName, true);
        }
        function prefixedElementClassNames(node) {
            const classAttribute = node.getAttribute('class');
            if (!classAttribute) {
                return [];
            }
            return classAttribute.split(/\s+/g).filter(Boolean).map(function (name) {
                // The prefix is required to store "__proto__" in a object-based map.
                return '$' + name;
            });
        }
        function idSelector(id) {
            return '#' + CSS.escape(id);
        }
        const prefixedOwnClassNamesArray = prefixedElementClassNames(node);
        let needsClassNames = false;
        let needsNthChild = false;
        let ownIndex = -1;
        let elementIndex = -1;
        const siblings = parent.children;
        for (let i = 0; siblings && (ownIndex === -1 || !needsNthChild) && i < siblings.length; ++i) {
            const sibling = siblings[i];
            if (sibling.nodeType !== Node.ELEMENT_NODE) {
                continue;
            }
            elementIndex += 1;
            if (sibling === node) {
                ownIndex = elementIndex;
                continue;
            }
            if (needsNthChild) {
                continue;
            }
            if (DomFun.nodeNameInCorrectCase(sibling) !== nodeName) {
                continue;
            }
            needsClassNames = true;
            const ownClassNames = new Set(prefixedOwnClassNamesArray);
            if (!ownClassNames.size) {
                needsNthChild = true;
                continue;
            }
            const siblingClassNamesArray = prefixedElementClassNames(sibling);
            for (let j = 0; j < siblingClassNamesArray.length; ++j) {
                const siblingClass = siblingClassNamesArray[j];
                if (!ownClassNames.has(siblingClass)) {
                    continue;
                }
                ownClassNames.delete(siblingClass);
                if (!ownClassNames.size) {
                    needsNthChild = true;
                    break;
                }
            }
        }
        let result = nodeName;
        if (isTargetNode && nodeName.toLowerCase() === 'input' && node.getAttribute('type') && !node.getAttribute('id') &&
            !node.getAttribute('class')) {
            result += '[type=' + CSS.escape((node.getAttribute('type')) || '') + ']';
        }
        if (needsNthChild) {
            result += ':nth-child(' + (ownIndex + 1) + ')';
        }
        else if (needsClassNames) {
            for (const prefixedName of prefixedOwnClassNamesArray) {
                result += '.' + CSS.escape(prefixedName.slice(1));
            }
        }
        return new Step(result, false);
    };
    class Step {
        constructor(value, optimized) {
            this.value = value;
            this.optimized = optimized || false;
        }
        toString() {
            return this.value;
        }
    }

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
        let title = typeof el === "string" ? el : el.getAttribute("title") || "";
        input_copy.setAttribute("readonly", "readonly");
        input_copy.setAttribute("value", title);
        input_copy.value = title;
        input_copy.select();
        input_copy.setSelectionRange(0, 9999);
        document.execCommand("copy");
    }
    /** 工具类 */
    var $ = {
        copyTitle,
    };
    /** 获取一个元素的选择器 */
    function getSelectors(el) {
        return cssPath(el, true);
    }
    /** 获取一个元素的所有父节点到html为止  */
    function nodePath(...path) {
        while (path[path.length - 1].parentElement != null ||
            path[path.length - 1].tagName !== "HTML") {
            const p = path[path.length - 1].parentElement;
            if (p) {
                path.push(p);
            }
        }
        /** 只需要是HTMLElement的 */
        const HTMLElementPath = (path.filter((el) => el instanceof HTMLElement));
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
        if (data)
            url += "?" + jsonToURLpar(data);
        if (window.hasOwnProperty("GM") && window.hasOwnProperty("GM"))
            return new Promise((resolve, reject) => {
                GM.xmlHttpRequest({
                    method: "GET",
                    url,
                    onload: function (response) {
                        resolve(response.responseText);
                    },
                    onerror: reject,
                });
            });
        else
            return new Promise((resolve, reject) => {
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
        return Object.keys(json)
            .map(function (key) {
            return encodeURIComponent(key) + "=" + encodeURIComponent(json[key]);
        })
            .join("&");
    }
    /** 开发时的调试log */
    function log(...arg) {
        if (isDev)
            console.log(`[dev] `, ...arg);
    }
    /** 用户选中事件 */
    var SelectionEvent;
    (function (SelectionEvent) {
        /** 表示用户选中的对象，唯一的。不用每次去获取 */
        const s = window.getSelection();
        /** 是否处于 range 的选中状态 */
        SelectionEvent.isRange = writable(false);
        /** 选区开始位置的元素的 rect */
        SelectionEvent.anchorRect = derived(SelectionEvent.isRange, ($isRange) => {
            if (!$isRange)
                return;
            const node = s.anchorNode;
            const el = node instanceof Element ? node : node.parentElement;
            const rect = el.getBoundingClientRect();
            return rect;
        });
        function 高亮(options = {}) {
            var _a, _b;
            const h = new Highlighted(options.style || "");
            CommandControl.run(h);
            const className = h.className;
            const tagName = "span";
            let 选中的所有节点 = [];
            if ( /** 跨元素了 */s.anchorNode !== s.focusNode) {
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
                    (_a = cur.parentNode) === null || _a === void 0 ? void 0 : _a.insertBefore(wrap, t3);
                }
                cur = endNode;
                if (cur instanceof Text) {
                    const s = endRange;
                    const t2 = cur.splitText(s.endOffset);
                    const wrap = document.createElement(tagName);
                    wrap.appendChild(cur);
                    (_b = t2.parentNode) === null || _b === void 0 ? void 0 : _b.insertBefore(wrap, t2);
                    endNode = t2;
                }
                选中的所有节点 = getIntermediateNodes(startNode, endNode);
            }
            else {
                /** 单元素类 */
                const cur = s.anchorNode;
                if (cur instanceof Text) {
                    const t2 = cur.splitText(s.anchorOffset);
                    t2.splitText(s.focusOffset);
                    选中的所有节点.push(t2);
                }
                else {
                    选中的所有节点.push(cur);
                }
            }
            console.log("选中的所有节点", 选中的所有节点);
            选中的所有节点.forEach((node) => {
                let el;
                if (node instanceof Element) {
                    el = node;
                }
                else {
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
            const 共存层 = getIntermediateNodes.寻找共存层(...选中的所有节点);
            // console.log("[共存层]", 共存层);
            let parent = 共存层[0].parentElement;
            /** 避免标记的是不够大的元素，实际上也是因为寻找元素的方法不够好否则也用不着这个 */
            while (parent.className.includes("llej-page_notes-style")) {
                parent = parent.parentElement;
            }
            editElement.add(parent);
        }
        SelectionEvent.高亮 = 高亮;
        document.addEventListener("selectionchange", () => {
            SelectionEvent.isRange.set(s.type === "Range");
        });
    })(SelectionEvent || (SelectionEvent = {}));
    function getIntermediateNodes(a, b) {
        return getIntermediateNodes.获取两元素之间的元素(a, b);
    }
    (function (getIntermediateNodes) {
        function 寻找共存层(...args) {
            if (args.length === 1) {
                return args;
            }
            const parentList = args
                .map((el) => 获取父链路(el).reverse())
                .sort((a, b) => {
                return a.length - b.length;
            });
            const 最短链路 = parentList[0];
            for (let i = 0; i < 最短链路.length; i++) {
                const element = 最短链路[i];
                const 此层是否全相似 = parentList
                    .map((el) => el[i])
                    .every((el) => el === element);
                if (此层是否全相似 === false) {
                    return Array.from(最短链路[i - 1].childNodes);
                }
            }
            return [];
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

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */

    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m) return m.call(o);
        if (o && typeof o.length === "number") return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }

    function __asyncValues(o) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
    }

    /** 用来识别身份的key */
    let key = '';
    /** 附带登录信息的ajax */
    async function au_getJSON(url, data) {
        if (data === undefined)
            data = {};
        data.key = key ? key : await getLocalItem(config.loginCredentials);
        return getJSon(url, data);
    }
    /** 登录 */
    async function _login(par) {
        const res = await getJSon(config.serverIp + 'login', par);
        if (res.body && res.body.length > 0)
            key = res.body;
        setLocalItem(config.loginCredentials, key);
        return res;
    }
    /** 注册 */
    async function remote_register(par) {
        return await getJSon(config.serverIp + 'register', par);
    }
    /** 获取存储库 */
    async function remote_getStore(par) {
        return await au_getJSON(config.serverIp + 'getStore', par);
    }
    /** 设置存储库 */
    async function remote_setStore(par) {
        return await au_getJSON(config.serverIp + 'setStore', par);
    }

    class Style {
    }
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

    class Warning extends Message {
        constructor({ msg }) {
            super({ msg, style: Style.warning });
        }
    }

    /** ════════════════════════🏳‍🌈 提供给用户使用的功能 🏳‍🌈════════════════════════
     *
     ** ════════════════════════🚧 提供给用户使用的功能 🚧════════════════════════ */
    const fun = {
        /** 使元素可编辑 */
        editElement() {
            if (currentElement.innerHTML.length > 10 * 1000)
                return new Warning({ msg: "该元素内容过大，请选择更确定的文本元素。" }).autoHide();
            CommandControl.run(new editSelect(currentElement));
        },
        /** 删除元素 */
        deleteElement() {
            CommandControl.run(new deleteSelect(currentElement));
        },
        /** 复制title */
        copyTitle() {
            $.copyTitle(currentElement);
        },
        /** 关闭可编辑 */
        closeEdit() {
            CommandControl.run(new closeEditSelect(currentElement));
        },
        /** 撤销 */
        backOut() {
            CommandControl.backOut();
        },
        /** 重做 */
        undo() {
            CommandControl.reform();
        },
        /** 新增笔记 */
        addNote() {
            CommandControl.run(new addNote(currentElement));
        },
        /** 保存所有的修改 */
        saveChanges() {
            saveChanges(editElement);
            new Message({ msg: "保存成功" }).autoHide();
        },
        /** 将修改上传到云端 */
        async uploadThe() {
            remote_setStore({
                url: config.locationUrl,
                store: await saveChanges(editElement),
            }).then((r) => {
                new Message({ msg: "云端存储:" + r.message }).autoHide();
            });
        },
        /** 从云端下载修改 */
        downloadThe() {
            new Message({ msg: "正在读取云端存储" }).autoHide();
            remote_getStore({
                url: config.locationUrl,
            }).then((r) => {
                if (r.body === undefined || r.body.length === 0)
                    return new Message({ msg: "云端存储:" + r.message }).autoHide();
                const allStore = JSON.parse(r.body[0].store);
                loadChanges(allStore);
                new Message({ msg: "云端存储:" + r.message }).autoHide();
            });
        },
        /** 注册 */
        register() {
            register();
        },
        /** 登录 */
        login() {
            login();
        },
    };
    /** 按键和函数的映射关系 */
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
        KeyL: [fun.login],
        F2: [],
        KeyM: [],
    };
    /** 保存修改 */
    async function saveChanges(editElement) {
        const data = {
            element_List: {},
            CommandStack: CommandControl.commandStack,
        };
        /** 获取修改过的元素的html */
        editElement.forEach((el) => {
            const selectors = getSelectors(el);
            data.element_List[selectors] = el.innerHTML;
        });
        const data_str = JSON.stringify(Object.assign(curStore, data));
        await setLocalItem(AllStoreName, JSON.stringify(data));
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
            }
            else {
                editElement.add(el);
                el.innerHTML = html;
                log("-重写-", selectors, el);
            }
        }
        /** 重新执行命令栈 */
        CommandControl.loadCommandJsonAndRun(allStore.CommandStack);
    }
    function login() {
        const title = ">>>网页笔记<<<\n";
        const user = prompt(title + "请输入用户名");
        if (user === null)
            return;
        const secret_key = prompt(title + "请输入密钥。");
        if (secret_key === null)
            return;
        _login({
            user,
            secret_key,
        }).then((r) => {
            new Message({ msg: r.message }).autoHide();
        });
    }
    function register() {
        const title = ">>>网页笔记<<<\n";
        const user = prompt(title + "请输入用户名");
        if (user === null)
            return;
        const secret_key = prompt(title + "请输入密钥。要记住哦，没有提供找回功能");
        if (secret_key === null)
            return;
        remote_register({
            user,
            secret_key,
        }).then((r) => {
            new Message({ msg: r.message }).autoHide();
        });
    }
    /** 轮廓线,用以显示当前元素 */
    function outline(el) {
        el.classList.add("user_js_llej_outline");
        setTimeout(reduction, 400);
        function reduction() {
            if (el == currentElement) {
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
            setPath(nodePath(event.target));
            if (config.elementEdit) {
                outline(event.target);
            }
        }
    }
    /** 监测按键事件 */
    async function on_keydown(event) {
        var e_1, _a;
        const code = event.code;
        if (code in KeyMap) {
            if (isEditing()) {
                // return new Message({ msg: "有元素获得焦点，视为正在输入文本，不执行指令" }).autoHide();
                return;
            }
            else {
                if (code === "F2" || code === "KeyM") {
                    /** 切换编辑模式 */
                    return switchState();
                }
                else if (config.elementEdit === false) {
                    log("没有开启编辑功能");
                }
                else {
                    /** 执行按键绑定的函数 */
                    const func_list = KeyMap[code];
                    log(`[按下了] ${code},执行了: ${func_list.map((f) => f.name).join(" ")}`);
                    try {
                        for (var func_list_1 = __asyncValues(func_list), func_list_1_1; func_list_1_1 = await func_list_1.next(), !func_list_1_1.done;) {
                            const f = func_list_1_1.value;
                            await f();
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (func_list_1_1 && !func_list_1_1.done && (_a = func_list_1.return)) await _a.call(func_list_1);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                }
            }
        }
        else {
            log("未注册该按键处理程序 " + code);
        }
        function isEditing() {
            return (document.querySelector(":focus") ||
                /** 如果目标元素是自定义组件的话上面这个还检测不了，需要检测 shadow 中是否存在焦点 */
                //@ts-expect-error
                (event.target.shadowRoot && event.target.shadowRoot.querySelector(":focus")));
        }
    }
    /** 编辑事件 */
    function on_input(event) {
        if (event.target instanceof HTMLElement) {
            const el = event.target;
            if (el.innerHTML.length > 10 * 1000)
                new Warning({
                    msg: "该元素html内容过大，将不会保存这里的修改，请选择更确定的文本元素。",
                }).autoHide();
            else
                editElement.add(el);
        }
    }
    /** 切换状态 */
    function switchState() {
        return (config.elementEdit = !config.elementEdit);
    }

    /** 设置一条本地存储 */
    async function setLocalItem(name, value) {
        //为了在非油猴环境下存储依旧能起一部分的作用
        if (typeof unsafeWindow !== "undefined") {
            return await GM.setValue(name, value);
        }
        else {
            return await localStorage.setItem(name, String(value));
        }
    }
    /** 读取一条本地存储 */
    async function getLocalItem(/** 键名 */ name, /** 没有的时候的默认值 */ defaultValue) {
        if (typeof unsafeWindow !== "undefined") {
            const res = await GM.getValue(name, defaultValue);
            return res;
        }
        else {
            //为了在非油猴环境下存储依旧能起一部分的作用
            const value = localStorage.getItem(name);
            if (value === null)
                return await defaultValue;
            return await value;
        }
    }
    const curStore = reactive({
        CommandStack: [],
        element_List: {},
        /** 用于记录高亮 id 避免新高亮出现重复 */
        Highlighted_count: 0,
    });
    getLocalItem(AllStoreName, "{}").then((s) => {
        try {
            if (s) {
                Object.assign(curStore, JSON.parse(s));
            }
        }
        catch (error) {
            log("本地存储序列化失败", s);
        }
        /** 自动加载本地暂存更改 */
        (async () => {
            console.log(curStore);
            if (document.readyState === "complete") {
                loadChanges(curStore);
            }
            else {
                window.addEventListener("load", function () {
                    loadChanges(curStore);
                });
            }
        })();
    });

    /** 用来显示笔记的地方 */
    const note_list_store = writable([]);
    const defaultSetting = {
        a: 3,
        swatches: {
            textColor: {
                default: "#333",
                list: [
                    "#EB5757",
                    "#F2C94C",
                    "#9B51E0",
                    "#E0E0E0",
                    "#2F80ED",
                    "#2F80ED",
                    "#828282",
                    "#27AE60",
                    "#27AE60",
                    "#EB5757",
                    "#56CCF2",
                    "#F2994A",
                    "#4F4F4F",
                    "#219653",
                    "#BB6BD9",
                    "#F2F2F2",
                    "#2D9CDB",
                    "#2D9CDB",
                    "#BDBDBD",
                    "#6FCF97",
                    "#6FCF97",
                ],
            },
            bgColor: {
                default: "#EB5757",
                list: [
                    "#EB5757",
                    "#F2C94C",
                    "#9B51E0",
                    "#E0E0E0",
                    "#2F80ED",
                    "#2F80ED",
                    "#828282",
                    "#27AE60",
                    "#27AE60",
                    "#EB5757",
                    "#56CCF2",
                    "#F2994A",
                    "#4F4F4F",
                    "#219653",
                    "#BB6BD9",
                    "#F2F2F2",
                    "#2D9CDB",
                    "#2D9CDB",
                    "#BDBDBD",
                    "#6FCF97",
                    "#6FCF97",
                ],
            },
            underlineColor: {
                default: "#EB5757",
                list: [
                    "#EB5757",
                    "#F2C94C",
                    "#9B51E0",
                    "#E0E0E0",
                    "#2F80ED",
                    "#2F80ED",
                    "#828282",
                    "#27AE60",
                    "#27AE60",
                    "#EB5757",
                    "#56CCF2",
                    "#F2994A",
                    "#4F4F4F",
                    "#219653",
                    "#BB6BD9",
                    "#F2F2F2",
                    "#2D9CDB",
                    "#2D9CDB",
                    "#BDBDBD",
                    "#6FCF97",
                    "#6FCF97",
                ],
            },
        },
    };
    class PageNotesStore {
        constructor(storePath) {
            this.storePath = storePath;
            this.store = {};
            this._writable = writable({});
            this.initializing = getLocalItem(storePath, JSON.stringify(defaultSetting)).then((r) => {
                if (r) {
                    this.store = JSON.parse(r);
                }
                this._writable.set(this.store);
                this._writable.subscribe((r) => {
                    this.store = r;
                    this.save(r);
                });
                return;
            });
        }
        async getStore() {
            await this.initializing;
            return this.store;
        }
        save(r) {
            setLocalItem(this.storePath, JSON.stringify(r));
        }
        getWritable() {
            return this._writable;
        }
        async get(k) {
            return (await this.getStore())[k];
        }
        async set(k, value) {
            const s = await this.getStore();
            s[k] = value;
            this._writable.set(s);
            this.save(s);
        }
    }
    /** 设置相关的存储 */
    const settingStore = new PageNotesStore("__setting__");

    const styleList = writable([]);
    /** 根据 styleList 计算出来的 css 片段 */
    const styleText = derived(styleList, ($styleList) => {
        return `<style>
  ${get_store_value(styleList).join("\n")}
  </style>`;
    });

    /** 每一个命令都应该实现的东西 */
    class Command {
        constructor(/** 命令执行的元素 */ select) {
            if (select === undefined) {
                //TODO 这里
                this.selectEL = document.createElement("div");
            }
            else {
                this.selectEL = select;
            }
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
                selectEL: this.selectEL ? getSelectors(this.selectEL) : "",
                constructor: this.__proto__.constructor.name,
            };
        }
        /** 用于可以使用 toJSON 生成的数据重建功能效果 */
        static 重建(obj) {
            return new this(document.querySelector(obj.selectEL) || undefined);
        }
        /** 加载commandJSON转变为命令,通过泛型来构造对象的方式 */
        static load(obj, CLASS) {
            return CLASS.重建(obj);
        }
    }
    /** 删除一个元素 */
    class deleteSelect extends Command {
        do() {
            this.selectEL_display = this.selectEL.style.display;
            this.selectEL.style.display = "none";
            return this;
        }
        undo() {
            if (this.selectEL_display) {
                this.selectEL.style.display = this.selectEL_display;
            }
            return this;
        }
    }
    /** 使元素可编辑 */
    class editSelect extends Command {
        constructor() {
            super(...arguments);
            this.selectEL_contentEditable = "";
        }
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
    class closeEditSelect extends Command {
        constructor() {
            super(...arguments);
            this.selectEL_contentEditable = "";
        }
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
    class addNote extends Command {
        do() {
            this.selectEL;
            note_list_store.update((list) => {
                list.push({
                    point: this.selectEL,
                    content: "6666666",
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
    class Highlighted extends Command {
        constructor(styleText) {
            super();
            this.styleText = styleText;
            /** css 类名 */
            this.className = `llej-page_notes-style-${curStore.Highlighted_count++}`;
        }
        do() {
            styleList.update((r) => {
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
            styleList.update((r) => {
                return r.filter((el) => el !== this.getRawStyleText());
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
                constructor: this.__proto__.constructor.name,
            };
        }
    }
    /** 命令控制器 */
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
            }
            catch (error) {
                console.error("命令执行失败", command);
            }
            return -1;
        },
        backOut() {
            if (this.commandStack.length === 0) {
                Message.getMessage({ msg: "命令栈已空，无法进行撤销" }).autoHide();
                return -1;
            }
            const command = this.commandStack.pop();
            if (command) {
                return this.backOutStack.push(command.undo());
            }
            return -1;
        },
        reform() {
            if (this.backOutStack.length === 0) {
                Message.getMessage({ msg: "撤销栈已空，无法进行重做" }).autoHide();
                return -1;
            }
            const command = this.backOutStack.pop();
            if (command) {
                return this.commandStack.push(command.redo());
            }
            return -1;
        },
        /** 从json重建命令栈 */
        loadCommandJSON(obj) {
            log("-执行命令-", obj.constructor);
            if (obj.constructor === "deleteSelect")
                return Command.load(obj, deleteSelect);
            if (obj.constructor === "editSelect")
                return Command.load(obj, editSelect);
            if (obj.constructor === "closeEditSelect")
                return Command.load(obj, closeEditSelect);
            if (obj.constructor === "addNote")
                return Command.load(obj, addNote);
            if (obj.constructor === "Highlighted")
                return Command.load(obj, Highlighted);
        },
        getCommandStackJSON() {
            return JSON.stringify(this.commandStack);
        },
        loadCommandJsonAndRun(commandJSON) {
            commandJSON.map(this.loadCommandJSON).forEach((command) => {
                if (command) {
                    this.run(command);
                }
            });
            return true;
        },
    };

    /* src/svelte/global_style.svelte generated by Svelte v3.38.3 */

    function add_css$5() {
    	var style = element("style");
    	style.id = "svelte-1g4ohrx-style";
    	style.textContent = ".user_js_llej_outline{outline:2px solid red !important}";
    	append(document.head, style);
    }

    class Global_style extends SvelteComponent {
    	constructor(options) {
    		super();
    		if (!document.getElementById("svelte-1g4ohrx-style")) add_css$5();
    		init(this, options, null, null, safe_not_equal, {});
    	}
    }

    function cubicOut(t) {
        const f = t - 1.0;
        return f * f * f + 1.0;
    }

    function fly(node, { delay = 0, duration = 400, easing = cubicOut, x = 0, y = 0, opacity = 0 } = {}) {
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
			opacity: ${target_opacity - (od * u)}`
        };
    }

    function flip(node, animation, params = {}) {
        const style = getComputedStyle(node);
        const transform = style.transform === 'none' ? '' : style.transform;
        const scaleX = animation.from.width / node.clientWidth;
        const scaleY = animation.from.height / node.clientHeight;
        const dx = (animation.from.left - animation.to.left) / scaleX;
        const dy = (animation.from.top - animation.to.top) / scaleY;
        const d = Math.sqrt(dx * dx + dy * dy);
        const { delay = 0, duration = (d) => Math.sqrt(d) * 120, easing = cubicOut } = params;
        return {
            delay,
            duration: is_function(duration) ? duration(d) : duration,
            easing,
            css: (_t, u) => `transform: ${transform} translate(${u * dx}px, ${u * dy}px);`
        };
    }

    /* src/svelte/msg.svelte generated by Svelte v3.38.3 */

    function add_css$4() {
    	var style = element("style");
    	style.id = "svelte-nrh36t-style";
    	style.textContent = ".llej-msg_list.svelte-nrh36t{position:fixed;top:20px;left:20px;z-index:9998}.llej-msg_list-item.svelte-nrh36t{background:#fff;box-shadow:0 4px 10px 0 rgba(0, 0, 0, 0.1);margin:6px 12px;padding:3px 7px;display:flex;align-items:center;z-index:900}.llej-msg_list-item-point.svelte-nrh36t{--s:4px;width:var(--s);height:var(--s);background-color:#367dd9;margin:var(--s);border-radius:999px}";
    	append(document.head, style);
    }

    function get_each_context$2(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[1] = list[i];
    	child_ctx[3] = i;
    	return child_ctx;
    }

    // (34:2) {#each $messageList as item, index (index)}
    function create_each_block$2(key_1, ctx) {
    	let div1;
    	let div0;
    	let t0;
    	let t1_value = /*item*/ ctx[1].par.msg + "";
    	let t1;
    	let t2;
    	let div1_style_value;
    	let div1_transition;
    	let rect;
    	let stop_animation = noop;
    	let current;

    	return {
    		key: key_1,
    		first: null,
    		c() {
    			div1 = element("div");
    			div0 = element("div");
    			t0 = space();
    			t1 = text(t1_value);
    			t2 = space();
    			attr(div0, "class", "llej-msg_list-item-point svelte-nrh36t");
    			attr(div1, "class", "llej-msg_list-item svelte-nrh36t");
    			attr(div1, "style", div1_style_value = /*item*/ ctx[1].par.style);
    			this.first = div1;
    		},
    		m(target, anchor) {
    			insert(target, div1, anchor);
    			append(div1, div0);
    			append(div1, t0);
    			append(div1, t1);
    			append(div1, t2);
    			current = true;
    		},
    		p(new_ctx, dirty) {
    			ctx = new_ctx;
    			if ((!current || dirty & /*$messageList*/ 1) && t1_value !== (t1_value = /*item*/ ctx[1].par.msg + "")) set_data(t1, t1_value);

    			if (!current || dirty & /*$messageList*/ 1 && div1_style_value !== (div1_style_value = /*item*/ ctx[1].par.style)) {
    				attr(div1, "style", div1_style_value);
    			}
    		},
    		r() {
    			rect = div1.getBoundingClientRect();
    		},
    		f() {
    			fix_position(div1);
    			stop_animation();
    			add_transform(div1, rect);
    		},
    		a() {
    			stop_animation();
    			stop_animation = create_animation(div1, rect, flip, {});
    		},
    		i(local) {
    			if (current) return;

    			add_render_callback(() => {
    				if (!div1_transition) div1_transition = create_bidirectional_transition(div1, fly, { x: -200, duration: 1000 }, true);
    				div1_transition.run(1);
    			});

    			current = true;
    		},
    		o(local) {
    			if (!div1_transition) div1_transition = create_bidirectional_transition(div1, fly, { x: -200, duration: 1000 }, false);
    			div1_transition.run(0);
    			current = false;
    		},
    		d(detaching) {
    			if (detaching) detach(div1);
    			if (detaching && div1_transition) div1_transition.end();
    		}
    	};
    }

    function create_fragment$5(ctx) {
    	let div;
    	let each_blocks = [];
    	let each_1_lookup = new Map();
    	let current;
    	let each_value = /*$messageList*/ ctx[0];
    	const get_key = ctx => /*index*/ ctx[3];

    	for (let i = 0; i < each_value.length; i += 1) {
    		let child_ctx = get_each_context$2(ctx, each_value, i);
    		let key = get_key(child_ctx);
    		each_1_lookup.set(key, each_blocks[i] = create_each_block$2(key, child_ctx));
    	}

    	return {
    		c() {
    			div = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr(div, "class", "llej-msg_list svelte-nrh36t");
    		},
    		m(target, anchor) {
    			insert(target, div, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div, null);
    			}

    			current = true;
    		},
    		p(ctx, [dirty]) {
    			if (dirty & /*$messageList*/ 1) {
    				each_value = /*$messageList*/ ctx[0];
    				group_outros();
    				for (let i = 0; i < each_blocks.length; i += 1) each_blocks[i].r();
    				each_blocks = update_keyed_each(each_blocks, dirty, get_key, 1, ctx, each_value, each_1_lookup, div, fix_and_outro_and_destroy_block, create_each_block$2, null, get_each_context$2);
    				for (let i = 0; i < each_blocks.length; i += 1) each_blocks[i].a();
    				check_outros();
    			}
    		},
    		i(local) {
    			if (current) return;

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o(local) {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d(detaching) {
    			if (detaching) detach(div);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].d();
    			}
    		}
    	};
    }

    function instance$4($$self, $$props, $$invalidate) {
    	let $messageList;
    	component_subscribe($$self, messageList, $$value => $$invalidate(0, $messageList = $$value));
    	return [$messageList];
    }

    class Msg extends SvelteComponent {
    	constructor(options) {
    		super();
    		if (!document.getElementById("svelte-nrh36t-style")) add_css$4();
    		init(this, options, instance$4, create_fragment$5, safe_not_equal, {});
    	}
    }

    /* src/svelte/Note.svelte generated by Svelte v3.38.3 */

    function add_css$3() {
    	var style = element("style");
    	style.id = "svelte-dn4h7-style";
    	style.textContent = ".c-note.svelte-dn4h7{outline:rgb(187, 181, 181) 2px solid;background:rgba(red, green, blue, 0.6);padding:0.3rem 0.4rem;position:absolute;z-index:60}";
    	append(document.head, style);
    }

    function create_fragment$4(ctx) {
    	let div;
    	let t_value = /*note*/ ctx[0].content + "";
    	let t;

    	return {
    		c() {
    			div = element("div");
    			t = text(t_value);
    			attr(div, "class", "c-note svelte-dn4h7");
    			set_style(div, "top", p(/*note*/ ctx[0]).top + p(/*note*/ ctx[0]).height / 2 + "px");
    			set_style(div, "left", p(/*note*/ ctx[0]).left + p(/*note*/ ctx[0]).width + "px");
    		},
    		m(target, anchor) {
    			insert(target, div, anchor);
    			append(div, t);
    		},
    		p(ctx, [dirty]) {
    			if (dirty & /*note*/ 1 && t_value !== (t_value = /*note*/ ctx[0].content + "")) set_data(t, t_value);

    			if (dirty & /*note*/ 1) {
    				set_style(div, "top", p(/*note*/ ctx[0]).top + p(/*note*/ ctx[0]).height / 2 + "px");
    			}

    			if (dirty & /*note*/ 1) {
    				set_style(div, "left", p(/*note*/ ctx[0]).left + p(/*note*/ ctx[0]).width + "px");
    			}
    		},
    		i: noop,
    		o: noop,
    		d(detaching) {
    			if (detaching) detach(div);
    		}
    	};
    }

    function p(note) {
    	return note.point.getBoundingClientRect();
    }

    function instance$3($$self, $$props, $$invalidate) {
    	let { note } = $$props;

    	//   document.querySelector(note.point)
    	console.log(note.point.getBoundingClientRect());

    	console.log(111, note);

    	$$self.$$set = $$props => {
    		if ("note" in $$props) $$invalidate(0, note = $$props.note);
    	};

    	return [note];
    }

    class Note extends SvelteComponent {
    	constructor(options) {
    		super();
    		if (!document.getElementById("svelte-dn4h7-style")) add_css$3();
    		init(this, options, instance$3, create_fragment$4, safe_not_equal, { note: 0 });
    	}
    }

    /* src/svelte/component/ColorBlock.svelte generated by Svelte v3.38.3 */

    function add_css$2() {
    	var style = element("style");
    	style.id = "svelte-j44t3k-style";
    	style.textContent = ".c.svelte-j44t3k.svelte-j44t3k{position:relative}.c-color_block.svelte-j44t3k.svelte-j44t3k{width:22px;height:22px;background:var(--color);border-radius:6px}.c.svelte-j44t3k:hover .c-swatches.svelte-j44t3k{display:flex}.c.svelte-j44t3k .c-swatches.svelte-j44t3k{display:none}.c-swatches.svelte-j44t3k.svelte-j44t3k{position:absolute;background:#f8f8f8;box-shadow:0px 4px 4px rgba(0, 0, 0, 0.25);border-radius:12px;width:218px;display:flex;flex-wrap:wrap}.c-swatches-item.svelte-j44t3k.svelte-j44t3k{margin:4px}";
    	append(document.head, style);
    }

    function get_each_context$1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[7] = list[i];
    	child_ctx[9] = i;
    	return child_ctx;
    }

    // (72:4) {#each defaultColorList as c, i (i)}
    function create_each_block$1(key_1, ctx) {
    	let div;
    	let mounted;
    	let dispose;

    	function click_handler() {
    		return /*click_handler*/ ctx[5](/*c*/ ctx[7]);
    	}

    	return {
    		key: key_1,
    		first: null,
    		c() {
    			div = element("div");
    			attr(div, "class", "c-swatches-item c-color_block svelte-j44t3k");
    			set_style(div, "--color", /*c*/ ctx[7]);
    			this.first = div;
    		},
    		m(target, anchor) {
    			insert(target, div, anchor);

    			if (!mounted) {
    				dispose = listen(div, "click", click_handler);
    				mounted = true;
    			}
    		},
    		p(new_ctx, dirty) {
    			ctx = new_ctx;

    			if (dirty & /*defaultColorList*/ 2) {
    				set_style(div, "--color", /*c*/ ctx[7]);
    			}
    		},
    		d(detaching) {
    			if (detaching) detach(div);
    			mounted = false;
    			dispose();
    		}
    	};
    }

    function create_fragment$3(ctx) {
    	let div1;
    	let label;
    	let input;
    	let t;
    	let div0;
    	let each_blocks = [];
    	let each_1_lookup = new Map();
    	let mounted;
    	let dispose;
    	let each_value = /*defaultColorList*/ ctx[1];
    	const get_key = ctx => /*i*/ ctx[9];

    	for (let i = 0; i < each_value.length; i += 1) {
    		let child_ctx = get_each_context$1(ctx, each_value, i);
    		let key = get_key(child_ctx);
    		each_1_lookup.set(key, each_blocks[i] = create_each_block$1(key, child_ctx));
    	}

    	return {
    		c() {
    			div1 = element("div");
    			label = element("label");
    			input = element("input");
    			t = space();
    			div0 = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr(input, "type", "color");
    			set_style(input, "display", "none");
    			attr(label, "class", "c-color_block svelte-j44t3k");
    			set_style(label, "--color", /*defaultColor*/ ctx[0]);
    			set_style(label, "display", "flex");
    			attr(label, "title", "点击此处选择自定义颜色");
    			attr(div0, "class", "c-swatches svelte-j44t3k");
    			attr(div1, "class", "c svelte-j44t3k");
    		},
    		m(target, anchor) {
    			insert(target, div1, anchor);
    			append(div1, label);
    			append(label, input);
    			set_input_value(input, /*defaultColor*/ ctx[0]);
    			append(div1, t);
    			append(div1, div0);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div0, null);
    			}

    			if (!mounted) {
    				dispose = [
    					listen(input, "input", /*input_input_handler*/ ctx[3]),
    					listen(input, "change", /*change_handler*/ ctx[4])
    				];

    				mounted = true;
    			}
    		},
    		p(ctx, [dirty]) {
    			if (dirty & /*defaultColor*/ 1) {
    				set_input_value(input, /*defaultColor*/ ctx[0]);
    			}

    			if (dirty & /*defaultColor*/ 1) {
    				set_style(label, "--color", /*defaultColor*/ ctx[0]);
    			}

    			if (dirty & /*defaultColorList, changeColor*/ 6) {
    				each_value = /*defaultColorList*/ ctx[1];
    				each_blocks = update_keyed_each(each_blocks, dirty, get_key, 1, ctx, each_value, each_1_lookup, div0, destroy_block, create_each_block$1, null, get_each_context$1);
    			}
    		},
    		i: noop,
    		o: noop,
    		d(detaching) {
    			if (detaching) detach(div1);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].d();
    			}

    			mounted = false;
    			run_all(dispose);
    		}
    	};
    }

    function instance$2($$self, $$props, $$invalidate) {
    	const dispatch = createEventDispatcher();
    	let { defaultColor = "#EB5757" } = $$props;

    	let { defaultColorList = [
    		"#EB5757",
    		"#F2C94C",
    		"#9B51E0",
    		"#E0E0E0",
    		"#2F80ED",
    		"#2F80ED",
    		"#828282",
    		"#27AE60",
    		"#27AE60",
    		"#EB5757",
    		"#56CCF2",
    		"#F2994A",
    		"#4F4F4F",
    		"#219653",
    		"#BB6BD9",
    		"#F2F2F2",
    		"#2D9CDB",
    		"#2D9CDB",
    		"#BDBDBD",
    		"#6FCF97",
    		"#6FCF97"
    	] } = $$props;

    	function changeColor(c) {
    		$$invalidate(0, defaultColor = c);
    		dispatch("change", c);
    	}

    	function input_input_handler() {
    		defaultColor = this.value;
    		$$invalidate(0, defaultColor);
    	}

    	const change_handler = () => changeColor(defaultColor);
    	const click_handler = c => changeColor(c);

    	$$self.$$set = $$props => {
    		if ("defaultColor" in $$props) $$invalidate(0, defaultColor = $$props.defaultColor);
    		if ("defaultColorList" in $$props) $$invalidate(1, defaultColorList = $$props.defaultColorList);
    	};

    	return [
    		defaultColor,
    		defaultColorList,
    		changeColor,
    		input_input_handler,
    		change_handler,
    		click_handler
    	];
    }

    class ColorBlock extends SvelteComponent {
    	constructor(options) {
    		super();
    		if (!document.getElementById("svelte-j44t3k-style")) add_css$2();
    		init(this, options, instance$2, create_fragment$3, safe_not_equal, { defaultColor: 0, defaultColorList: 1 });
    	}
    }

    /* src/svelte/Toolbar.svelte generated by Svelte v3.38.3 */

    function add_css$1() {
    	var style = element("style");
    	style.id = "svelte-17scrbx-style";
    	style.textContent = ".llej-toolbar.svelte-17scrbx{z-index:1000;height:36px;border-radius:4px;font-size:14px;display:flex;align-items:center;padding:0px 6px;user-select:none;font-size:18px;background:#f8f8f8;box-shadow:0px 4px 4px rgba(0, 0, 0, 0.25);border-radius:12px}.llej-toolbar-btn.svelte-17scrbx{transition:0.3s all;padding:2px 5px;display:flex;align-items:center}.llej-toolbar-btn.svelte-17scrbx:hover{background:rgb(231, 231, 231)}";
    	append(document.head, style);
    }

    function create_fragment$2(ctx) {
    	let div9;
    	let div2;
    	let div0;
    	let t1;
    	let div1;
    	let colorblock0;
    	let t2;
    	let div5;
    	let div3;
    	let t4;
    	let div4;
    	let colorblock1;
    	let t5;
    	let div8;
    	let div6;
    	let t7;
    	let div7;
    	let colorblock2;
    	let current;
    	let mounted;
    	let dispose;

    	colorblock0 = new ColorBlock({
    			props: {
    				defaultColor: /*$s*/ ctx[0].swatches.textColor.default
    			}
    		});

    	colorblock0.$on("change", /*change_handler*/ ctx[6]);

    	colorblock1 = new ColorBlock({
    			props: {
    				defaultColor: /*$s*/ ctx[0].swatches.bgColor.default
    			}
    		});

    	colorblock1.$on("change", /*change_handler_1*/ ctx[8]);

    	colorblock2 = new ColorBlock({
    			props: {
    				defaultColor: /*$s*/ ctx[0].swatches.underlineColor.default
    			}
    		});

    	colorblock2.$on("change", /*change_handler_2*/ ctx[10]);

    	return {
    		c() {
    			div9 = element("div");
    			div2 = element("div");
    			div0 = element("div");
    			div0.textContent = "文字颜色";
    			t1 = space();
    			div1 = element("div");
    			create_component(colorblock0.$$.fragment);
    			t2 = space();
    			div5 = element("div");
    			div3 = element("div");
    			div3.textContent = "背景颜色";
    			t4 = space();
    			div4 = element("div");
    			create_component(colorblock1.$$.fragment);
    			t5 = space();
    			div8 = element("div");
    			div6 = element("div");
    			div6.textContent = "下划线";
    			t7 = space();
    			div7 = element("div");
    			create_component(colorblock2.$$.fragment);
    			set_style(div1, "margin", "0 8px");
    			attr(div2, "class", "llej-toolbar-btn svelte-17scrbx");
    			set_style(div4, "margin", "0 8px");
    			attr(div5, "class", "llej-toolbar-btn svelte-17scrbx");
    			set_style(div7, "margin", "0 8px");
    			attr(div8, "class", "llej-toolbar-btn svelte-17scrbx");
    			attr(div9, "class", "llej-toolbar svelte-17scrbx");
    		},
    		m(target, anchor) {
    			insert(target, div9, anchor);
    			append(div9, div2);
    			append(div2, div0);
    			append(div2, t1);
    			append(div2, div1);
    			mount_component(colorblock0, div1, null);
    			append(div9, t2);
    			append(div9, div5);
    			append(div5, div3);
    			append(div5, t4);
    			append(div5, div4);
    			mount_component(colorblock1, div4, null);
    			append(div9, t5);
    			append(div9, div8);
    			append(div8, div6);
    			append(div8, t7);
    			append(div8, div7);
    			mount_component(colorblock2, div7, null);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen(div2, "click", /*click_handler*/ ctx[7]),
    					listen(div5, "click", /*click_handler_1*/ ctx[9]),
    					listen(div8, "click", /*click_handler_2*/ ctx[11])
    				];

    				mounted = true;
    			}
    		},
    		p(ctx, [dirty]) {
    			const colorblock0_changes = {};
    			if (dirty & /*$s*/ 1) colorblock0_changes.defaultColor = /*$s*/ ctx[0].swatches.textColor.default;
    			colorblock0.$set(colorblock0_changes);
    			const colorblock1_changes = {};
    			if (dirty & /*$s*/ 1) colorblock1_changes.defaultColor = /*$s*/ ctx[0].swatches.bgColor.default;
    			colorblock1.$set(colorblock1_changes);
    			const colorblock2_changes = {};
    			if (dirty & /*$s*/ 1) colorblock2_changes.defaultColor = /*$s*/ ctx[0].swatches.underlineColor.default;
    			colorblock2.$set(colorblock2_changes);
    		},
    		i(local) {
    			if (current) return;
    			transition_in(colorblock0.$$.fragment, local);
    			transition_in(colorblock1.$$.fragment, local);
    			transition_in(colorblock2.$$.fragment, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(colorblock0.$$.fragment, local);
    			transition_out(colorblock1.$$.fragment, local);
    			transition_out(colorblock2.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			if (detaching) detach(div9);
    			destroy_component(colorblock0);
    			destroy_component(colorblock1);
    			destroy_component(colorblock2);
    			mounted = false;
    			run_all(dispose);
    		}
    	};
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let $s;

    	let { highlighted = () => {
    		console.warn("没有传入高亮处理函数");
    	} } = $$props;

    	const s = settingStore.getWritable();
    	component_subscribe($$self, s, value => $$invalidate(0, $s = value));

    	function textHighlight(c) {
    		if (c) {
    			s.update(r => {
    				r.swatches.textColor.default = c;
    				return r;
    			});
    		}

    		highlighted({
    			style: `color:${$s.swatches.textColor.default};`
    		});
    	}

    	function bgHighlight(c) {
    		if (c) {
    			s.update(r => {
    				r.swatches.bgColor.default = c;
    				return r;
    			});
    		}

    		highlighted({
    			style: `background-color:${$s.swatches.bgColor.default};`
    		});
    	}

    	function underlineHighlight(c) {
    		if (c) {
    			s.update(r => {
    				r.swatches.underlineColor.default = c;
    				return r;
    			});
    		}

    		highlighted({
    			style: `text-decoration: underline;text-decoration-color:${$s.swatches.underlineColor.default};`
    		});
    	}

    	const change_handler = e => textHighlight(e.detail);
    	const click_handler = () => textHighlight();
    	const change_handler_1 = e => bgHighlight(e.detail);
    	const click_handler_1 = () => bgHighlight();
    	const change_handler_2 = e => underlineHighlight(e.detail);
    	const click_handler_2 = () => underlineHighlight();

    	$$self.$$set = $$props => {
    		if ("highlighted" in $$props) $$invalidate(5, highlighted = $$props.highlighted);
    	};

    	return [
    		$s,
    		s,
    		textHighlight,
    		bgHighlight,
    		underlineHighlight,
    		highlighted,
    		change_handler,
    		click_handler,
    		change_handler_1,
    		click_handler_1,
    		change_handler_2,
    		click_handler_2
    	];
    }

    class Toolbar extends SvelteComponent {
    	constructor(options) {
    		super();
    		if (!document.getElementById("svelte-17scrbx-style")) add_css$1();
    		init(this, options, instance$1, create_fragment$2, safe_not_equal, { highlighted: 5 });
    	}
    }

    /* src/layout_div.svelte generated by Svelte v3.38.3 */

    function add_css() {
    	var style = element("style");
    	style.id = "svelte-1phlxcz-style";
    	style.textContent = ".root.svelte-1phlxcz{z-index:60;position:absolute;top:3rem}";
    	append(document.head, style);
    }

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[10] = list[i];
    	child_ctx[11] = list;
    	child_ctx[12] = i;
    	return child_ctx;
    }

    // (38:0) {#if $isRange}
    function create_if_block(ctx) {
    	let div;
    	let toolbar;
    	let updating_highlighted;
    	let current;

    	function toolbar_highlighted_binding(value) {
    		/*toolbar_highlighted_binding*/ ctx[8](value);
    	}

    	let toolbar_props = {};

    	if (/*SelectionEvent*/ ctx[0].高亮 !== void 0) {
    		toolbar_props.highlighted = /*SelectionEvent*/ ctx[0].高亮;
    	}

    	toolbar = new Toolbar({ props: toolbar_props });
    	binding_callbacks.push(() => bind(toolbar, "highlighted", toolbar_highlighted_binding));

    	return {
    		c() {
    			div = element("div");
    			create_component(toolbar.$$.fragment);
    			set_style(div, "position", "fixed");
    			set_style(div, "top", /*$anchorRect*/ ctx[4].top + "px");
    			set_style(div, "left", /*$anchorRect*/ ctx[4].left + "px");
    			set_style(div, "transform", "translateY(-100%)");
    			set_style(div, "user-select", "none");
    			set_style(div, "z-index", "900");
    		},
    		m(target, anchor) {
    			insert(target, div, anchor);
    			mount_component(toolbar, div, null);
    			current = true;
    		},
    		p(ctx, dirty) {
    			const toolbar_changes = {};

    			if (!updating_highlighted && dirty & /*SelectionEvent*/ 1) {
    				updating_highlighted = true;
    				toolbar_changes.highlighted = /*SelectionEvent*/ ctx[0].高亮;
    				add_flush_callback(() => updating_highlighted = false);
    			}

    			toolbar.$set(toolbar_changes);

    			if (!current || dirty & /*$anchorRect*/ 16) {
    				set_style(div, "top", /*$anchorRect*/ ctx[4].top + "px");
    			}

    			if (!current || dirty & /*$anchorRect*/ 16) {
    				set_style(div, "left", /*$anchorRect*/ ctx[4].left + "px");
    			}
    		},
    		i(local) {
    			if (current) return;
    			transition_in(toolbar.$$.fragment, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(toolbar.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			if (detaching) detach(div);
    			destroy_component(toolbar);
    		}
    	};
    }

    // (45:0) {#each note_list as note}
    function create_each_block(ctx) {
    	let note;
    	let updating_note;
    	let current;

    	function note_note_binding(value) {
    		/*note_note_binding*/ ctx[9](value, /*note*/ ctx[10], /*each_value*/ ctx[11], /*note_index*/ ctx[12]);
    	}

    	let note_props = {};

    	if (/*note*/ ctx[10] !== void 0) {
    		note_props.note = /*note*/ ctx[10];
    	}

    	note = new Note({ props: note_props });
    	binding_callbacks.push(() => bind(note, "note", note_note_binding));

    	return {
    		c() {
    			create_component(note.$$.fragment);
    		},
    		m(target, anchor) {
    			mount_component(note, target, anchor);
    			current = true;
    		},
    		p(new_ctx, dirty) {
    			ctx = new_ctx;
    			const note_changes = {};

    			if (!updating_note && dirty & /*note_list*/ 2) {
    				updating_note = true;
    				note_changes.note = /*note*/ ctx[10];
    				add_flush_callback(() => updating_note = false);
    			}

    			note.$set(note_changes);
    		},
    		i(local) {
    			if (current) return;
    			transition_in(note.$$.fragment, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(note.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			destroy_component(note, detaching);
    		}
    	};
    }

    function create_fragment$1(ctx) {
    	let div;
    	let html_tag;
    	let t0;
    	let msg;
    	let t1;
    	let t2;
    	let t3;
    	let globalstyle;
    	let current;
    	let mounted;
    	let dispose;
    	msg = new Msg({});
    	let if_block = /*$isRange*/ ctx[3] && create_if_block(ctx);
    	let each_value = /*note_list*/ ctx[1];
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	globalstyle = new Global_style({});

    	return {
    		c() {
    			div = element("div");
    			html_tag = new HtmlTag();
    			t0 = space();
    			create_component(msg.$$.fragment);
    			t1 = space();
    			if (if_block) if_block.c();
    			t2 = space();

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t3 = space();
    			create_component(globalstyle.$$.fragment);
    			html_tag.a = t0;
    			attr(div, "class", "root svelte-1phlxcz");
    		},
    		m(target, anchor) {
    			insert(target, div, anchor);
    			html_tag.m(/*$styleText*/ ctx[2], div);
    			append(div, t0);
    			mount_component(msg, div, null);
    			insert(target, t1, anchor);
    			if (if_block) if_block.m(target, anchor);
    			insert(target, t2, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(target, anchor);
    			}

    			insert(target, t3, anchor);
    			mount_component(globalstyle, target, anchor);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen(window, "keydown", on_keydown),
    					listen(window, "input", on_input),
    					listen(window, "mouseover", on_mouse)
    				];

    				mounted = true;
    			}
    		},
    		p(ctx, [dirty]) {
    			if (!current || dirty & /*$styleText*/ 4) html_tag.p(/*$styleText*/ ctx[2]);

    			if (/*$isRange*/ ctx[3]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty & /*$isRange*/ 8) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(t2.parentNode, t2);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}

    			if (dirty & /*note_list*/ 2) {
    				each_value = /*note_list*/ ctx[1];
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(t3.parentNode, t3);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}
    		},
    		i(local) {
    			if (current) return;
    			transition_in(msg.$$.fragment, local);
    			transition_in(if_block);

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			transition_in(globalstyle.$$.fragment, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(msg.$$.fragment, local);
    			transition_out(if_block);
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			transition_out(globalstyle.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			if (detaching) detach(div);
    			destroy_component(msg);
    			if (detaching) detach(t1);
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach(t2);
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach(t3);
    			destroy_component(globalstyle, detaching);
    			mounted = false;
    			run_all(dispose);
    		}
    	};
    }

    function instance($$self, $$props, $$invalidate) {
    	let $elementEdit;
    	let $styleText;
    	let $isRange;
    	let $anchorRect;
    	component_subscribe($$self, elementEdit, $$value => $$invalidate(7, $elementEdit = $$value));
    	component_subscribe($$self, styleText, $$value => $$invalidate(2, $styleText = $$value));
    	let note_list = [];

    	note_list_store.subscribe(list => {
    		$$invalidate(1, note_list = list);
    	});

    	const { isRange, anchorRect } = SelectionEvent;
    	component_subscribe($$self, isRange, value => $$invalidate(3, $isRange = value));
    	component_subscribe($$self, anchorRect, value => $$invalidate(4, $anchorRect = value));

    	function toolbar_highlighted_binding(value) {
    		if ($$self.$$.not_equal(SelectionEvent.高亮, value)) {
    			SelectionEvent.高亮 = value;
    			$$invalidate(0, SelectionEvent);
    		}
    	}

    	function note_note_binding(value, note, each_value, note_index) {
    		each_value[note_index] = value;
    		$$invalidate(1, note_list);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*$elementEdit*/ 128) {
    			console.log($elementEdit);
    		}
    	};

    	return [
    		SelectionEvent,
    		note_list,
    		$styleText,
    		$isRange,
    		$anchorRect,
    		isRange,
    		anchorRect,
    		$elementEdit,
    		toolbar_highlighted_binding,
    		note_note_binding
    	];
    }

    class Layout_div extends SvelteComponent {
    	constructor(options) {
    		super();
    		if (!document.getElementById("svelte-1phlxcz-style")) add_css();
    		init(this, options, instance, create_fragment$1, safe_not_equal, {});
    	}
    }

    // ==UserScript==
    // @name         网页文本编辑,做笔记的好选择
    // @namespace    http://tampermonkey.net/
    // @version      1.45
    // @description  所见即所得！
    // @author       崮生 2234839456@qq.com
    // @match        *
    // @include      *
    // @connect      shenzilong.cn
    // @grant        GM.setValue
    // @grant        GM.getValue
    // @grant        GM.deleteValue
    // @grant        unsafeWindow
    // @grant        GM.xmlHttpRequest
    // ==/UserScript==
    (async function () {
        let global = (typeof unsafeWindow === "undefined" ? window : unsafeWindow);
        /** 调试用 */
        global.CommandControl = CommandControl;
        /** 清除当前这个页面的修改 */
        global.llej_pageNotes_clearCurrentStore = () => {
            setLocalItem(AllStoreName, "");
            location.reload();
        };
        console.log("[global]", typeof unsafeWindow === "undefined", global);
        const app_div = document.createElement("div");
        document.body.appendChild(app_div);
        new Layout_div({
            target: app_div,
        });
        /** 自动保存修改后的html  */
        setInterval(
        /**
         *  **一分钟保存一次**
         */
        function () {
            saveChanges(editElement);
        }, 1000 * 60);
    })();

    /* src/App.svelte generated by Svelte v3.38.3 */

    function create_fragment(ctx) {
    	let div;

    	return {
    		c() {
    			div = element("div");
    			div.textContent = "33333";
    		},
    		m(target, anchor) {
    			insert(target, div, anchor);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d(detaching) {
    			if (detaching) detach(div);
    		}
    	};
    }

    class App extends SvelteComponent {
    	constructor(options) {
    		super();
    		init(this, options, null, create_fragment, safe_not_equal, {});
    	}
    }

    return App;

}());
