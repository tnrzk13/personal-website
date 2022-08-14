
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
var app = (function () {
    'use strict';

    function noop() { }
    const identity = x => x;
    function assign(tar, src) {
        // @ts-ignore
        for (const k in src)
            tar[k] = src[k];
        return tar;
    }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
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
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    let src_url_equal_anchor;
    function src_url_equal(element_src, url) {
        if (!src_url_equal_anchor) {
            src_url_equal_anchor = document.createElement('a');
        }
        src_url_equal_anchor.href = url;
        return element_src === src_url_equal_anchor.href;
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }
    function create_slot(definition, ctx, $$scope, fn) {
        if (definition) {
            const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
            return definition[0](slot_ctx);
        }
    }
    function get_slot_context(definition, ctx, $$scope, fn) {
        return definition[1] && fn
            ? assign($$scope.ctx.slice(), definition[1](fn(ctx)))
            : $$scope.ctx;
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
    function update_slot_base(slot, slot_definition, ctx, $$scope, slot_changes, get_slot_context_fn) {
        if (slot_changes) {
            const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
            slot.p(slot_context, slot_changes);
        }
    }
    function get_all_dirty_from_scope($$scope) {
        if ($$scope.ctx.length > 32) {
            const dirty = [];
            const length = $$scope.ctx.length / 32;
            for (let i = 0; i < length; i++) {
                dirty[i] = -1;
            }
            return dirty;
        }
        return -1;
    }
    function exclude_internal_props(props) {
        const result = {};
        for (const k in props)
            if (k[0] !== '$')
                result[k] = props[k];
        return result;
    }
    function compute_rest_props(props, keys) {
        const rest = {};
        keys = new Set(keys);
        for (const k in props)
            if (!keys.has(k) && k[0] !== '$')
                rest[k] = props[k];
        return rest;
    }
    function action_destroyer(action_result) {
        return action_result && is_function(action_result.destroy) ? action_result.destroy : noop;
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
    function append(target, node) {
        target.appendChild(node);
    }
    function get_root_for_style(node) {
        if (!node)
            return document;
        const root = node.getRootNode ? node.getRootNode() : node.ownerDocument;
        if (root && root.host) {
            return root;
        }
        return node.ownerDocument;
    }
    function append_empty_stylesheet(node) {
        const style_element = element('style');
        append_stylesheet(get_root_for_style(node), style_element);
        return style_element.sheet;
    }
    function append_stylesheet(node, style) {
        append(node.head || node, style);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
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
    function empty() {
        return text('');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function prevent_default(fn) {
        return function (event) {
            event.preventDefault();
            // @ts-ignore
            return fn.call(this, event);
        };
    }
    function stop_propagation(fn) {
        return function (event) {
            event.stopPropagation();
            // @ts-ignore
            return fn.call(this, event);
        };
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function set_attributes(node, attributes) {
        // @ts-ignore
        const descriptors = Object.getOwnPropertyDescriptors(node.__proto__);
        for (const key in attributes) {
            if (attributes[key] == null) {
                node.removeAttribute(key);
            }
            else if (key === 'style') {
                node.style.cssText = attributes[key];
            }
            else if (key === '__value') {
                node.value = node[key] = attributes[key];
            }
            else if (descriptors[key] && descriptors[key].set) {
                node[key] = attributes[key];
            }
            else {
                attr(node, key, attributes[key]);
            }
        }
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function set_style(node, key, value, important) {
        if (value === null) {
            node.style.removeProperty(key);
        }
        else {
            node.style.setProperty(key, value, important ? 'important' : '');
        }
    }
    function custom_event(type, detail, { bubbles = false, cancelable = false } = {}) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, bubbles, cancelable, detail);
        return e;
    }

    // we need to store the information for multiple documents because a Svelte application could also contain iframes
    // https://github.com/sveltejs/svelte/issues/3624
    const managed_styles = new Map();
    let active = 0;
    // https://github.com/darkskyapp/string-hash/blob/master/index.js
    function hash(str) {
        let hash = 5381;
        let i = str.length;
        while (i--)
            hash = ((hash << 5) - hash) ^ str.charCodeAt(i);
        return hash >>> 0;
    }
    function create_style_information(doc, node) {
        const info = { stylesheet: append_empty_stylesheet(node), rules: {} };
        managed_styles.set(doc, info);
        return info;
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
        const doc = get_root_for_style(node);
        const { stylesheet, rules } = managed_styles.get(doc) || create_style_information(doc, node);
        if (!rules[name]) {
            rules[name] = true;
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
            managed_styles.forEach(info => {
                const { stylesheet } = info;
                let i = stylesheet.cssRules.length;
                while (i--)
                    stylesheet.deleteRule(i);
                info.rules = {};
            });
            managed_styles.clear();
        });
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
    function beforeUpdate(fn) {
        get_current_component().$$.before_update.push(fn);
    }
    function onMount(fn) {
        get_current_component().$$.on_mount.push(fn);
    }
    function createEventDispatcher() {
        const component = get_current_component();
        return (type, detail, { cancelable = false } = {}) => {
            const callbacks = component.$$.callbacks[type];
            if (callbacks) {
                // TODO are there situations where events could be dispatched
                // in a server (non-DOM) environment?
                const event = custom_event(type, detail, { cancelable });
                callbacks.slice().forEach(fn => {
                    fn.call(component, event);
                });
                return !event.defaultPrevented;
            }
            return true;
        };
    }
    function getContext(key) {
        return get_current_component().$$.context.get(key);
    }
    // TODO figure out if we still want to support
    // shorthand events, or if we want to implement
    // a real bubbling mechanism
    function bubble(component, event) {
        const callbacks = component.$$.callbacks[event.type];
        if (callbacks) {
            // @ts-ignore
            callbacks.slice().forEach(fn => fn.call(this, event));
        }
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
    // flush() calls callbacks in this order:
    // 1. All beforeUpdate callbacks, in order: parents before children
    // 2. All bind:this callbacks, in reverse order: children before parents.
    // 3. All afterUpdate callbacks, in order: parents before children. EXCEPT
    //    for afterUpdates called during the initial onMount, which are called in
    //    reverse order: children before parents.
    // Since callbacks might update component values, which could trigger another
    // call to flush(), the following steps guard against this:
    // 1. During beforeUpdate, any updated components will be added to the
    //    dirty_components array and will cause a reentrant call to flush(). Because
    //    the flush index is kept outside the function, the reentrant call will pick
    //    up where the earlier call left off and go through all dirty components. The
    //    current_component value is saved and restored so that the reentrant call will
    //    not interfere with the "parent" flush() call.
    // 2. bind:this callbacks cannot trigger new flush() calls.
    // 3. During afterUpdate, any updated components will NOT have their afterUpdate
    //    callback called a second time; the seen_callbacks set, outside the flush()
    //    function, guarantees this behavior.
    const seen_callbacks = new Set();
    let flushidx = 0; // Do *not* move this inside the flush() function
    function flush() {
        const saved_component = current_component;
        do {
            // first, call beforeUpdate functions
            // and update components
            while (flushidx < dirty_components.length) {
                const component = dirty_components[flushidx];
                flushidx++;
                set_current_component(component);
                update(component.$$);
            }
            set_current_component(null);
            dirty_components.length = 0;
            flushidx = 0;
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
        seen_callbacks.clear();
        set_current_component(saved_component);
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
        else if (callback) {
            callback();
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
            const d = (program.b - t);
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

    const globals = (typeof window !== 'undefined'
        ? window
        : typeof globalThis !== 'undefined'
            ? globalThis
            : global);

    function get_spread_update(levels, updates) {
        const update = {};
        const to_null_out = {};
        const accounted_for = { $$scope: 1 };
        let i = levels.length;
        while (i--) {
            const o = levels[i];
            const n = updates[i];
            if (n) {
                for (const key in o) {
                    if (!(key in n))
                        to_null_out[key] = 1;
                }
                for (const key in n) {
                    if (!accounted_for[key]) {
                        update[key] = n[key];
                        accounted_for[key] = 1;
                    }
                }
                levels[i] = n;
            }
            else {
                for (const key in o) {
                    accounted_for[key] = 1;
                }
            }
        }
        for (const key in to_null_out) {
            if (!(key in update))
                update[key] = undefined;
        }
        return update;
    }
    function get_spread_object(spread_props) {
        return typeof spread_props === 'object' && spread_props !== null ? spread_props : {};
    }

    const void_element_names = /^(?:area|base|br|col|command|embed|hr|img|input|keygen|link|meta|param|source|track|wbr)$/;
    function is_void(name) {
        return void_element_names.test(name) || name.toLowerCase() === '!doctype';
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
    function init(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
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
            context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false,
            root: options.target || parent_component.$$.root
        };
        append_styles && append_styles($$.root);
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

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.49.0' }, detail), { bubbles: true }));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
        const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.wholeText === data)
            return;
        dispatch_dev('SvelteDOMSetData', { node: text, data });
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
    function validate_dynamic_element(tag) {
        const is_string = typeof tag === 'string';
        if (tag && !is_string) {
            throw new Error('<svelte:element> expects "this" attribute to be a string.');
        }
    }
    function validate_void_dynamic_element(tag) {
        if (tag && is_void(tag)) {
            throw new Error(`<svelte:element this="${tag}"> is self-closing and cannot have content.`);
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    /* src\components\TextType\AnimateType.svelte generated by Svelte v3.49.0 */
    const file$f = "src\\components\\TextType\\AnimateType.svelte";

    function create_fragment$i(ctx) {
    	let span1;
    	let t0;
    	let span0;
    	let t1;

    	const block = {
    		c: function create() {
    			span1 = element("span");
    			t0 = text(/*state*/ ctx[2]);
    			span0 = element("span");
    			t1 = text("|");
    			attr_dev(span0, "class", "blinker svelte-1v28f7p");
    			set_style(span0, "animation-duration", /*blink_time*/ ctx[0] + "ms");
    			set_style(span0, "animation-iteration-count", /*blinker_iter_count*/ ctx[1]);
    			add_location(span0, file$f, 57, 10, 1644);
    			attr_dev(span1, "class", "typing-animated");
    			add_location(span1, file$f, 56, 0, 1603);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span1, anchor);
    			append_dev(span1, t0);
    			append_dev(span1, span0);
    			append_dev(span0, t1);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*state*/ 4) set_data_dev(t0, /*state*/ ctx[2]);

    			if (dirty & /*blink_time*/ 1) {
    				set_style(span0, "animation-duration", /*blink_time*/ ctx[0] + "ms");
    			}

    			if (dirty & /*blinker_iter_count*/ 2) {
    				set_style(span0, "animation-iteration-count", /*blinker_iter_count*/ ctx[1]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$i.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$i($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('AnimateType', slots, []);
    	let { texts = [] } = $$props;
    	let { delay = 60 } = $$props;
    	let { word_complete_delay = 1000 } = $$props;
    	let { num_loops = 1 } = $$props;
    	let { repeat_n_words = 0 } = $$props;
    	let { blink_time = 1000 } = $$props;
    	let { blinker_iter_count = "infinite" } = $$props;
    	let state = "";

    	const createRepeatArray = () => {
    		$$invalidate(3, texts = texts.slice(0, repeat_n_words));
    		$$invalidate(3, texts[texts.length - 1].direction = "type", texts);
    	};

    	const animateType = () => {
    		let typing_delay = 100;

    		for (let loop = 0; loop < num_loops; loop++) {
    			if (num_loops != 1 && repeat_n_words != 0 && loop === num_loops - 1) {
    				createRepeatArray();
    			}

    			texts.forEach(({ direction, word }) => {
    				for (let i = 0; i < word.length; i++) {
    					setTimeout(
    						() => {
    							$$invalidate(2, state = state + word[i]);
    						},
    						typing_delay
    					);

    					typing_delay = typing_delay + delay;
    				}

    				if (direction === "type&delete") {
    					for (let i = 0; i < word.length; i++) {
    						if (i === 0) {
    							setTimeout(
    								() => {
    									$$invalidate(2, state = state.substr(0, state.length - 1));
    								},
    								typing_delay + word_complete_delay
    							);

    							typing_delay = typing_delay + delay + word_complete_delay;
    						} else {
    							setTimeout(
    								() => {
    									$$invalidate(2, state = state.substr(0, state.length - 1));
    								},
    								typing_delay
    							);

    							typing_delay = typing_delay + delay;
    						}
    					}
    				}
    			});
    		}
    	};

    	onMount(() => {
    		animateType();
    	});

    	const writable_props = [
    		'texts',
    		'delay',
    		'word_complete_delay',
    		'num_loops',
    		'repeat_n_words',
    		'blink_time',
    		'blinker_iter_count'
    	];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<AnimateType> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('texts' in $$props) $$invalidate(3, texts = $$props.texts);
    		if ('delay' in $$props) $$invalidate(4, delay = $$props.delay);
    		if ('word_complete_delay' in $$props) $$invalidate(5, word_complete_delay = $$props.word_complete_delay);
    		if ('num_loops' in $$props) $$invalidate(6, num_loops = $$props.num_loops);
    		if ('repeat_n_words' in $$props) $$invalidate(7, repeat_n_words = $$props.repeat_n_words);
    		if ('blink_time' in $$props) $$invalidate(0, blink_time = $$props.blink_time);
    		if ('blinker_iter_count' in $$props) $$invalidate(1, blinker_iter_count = $$props.blinker_iter_count);
    	};

    	$$self.$capture_state = () => ({
    		onMount,
    		texts,
    		delay,
    		word_complete_delay,
    		num_loops,
    		repeat_n_words,
    		blink_time,
    		blinker_iter_count,
    		state,
    		createRepeatArray,
    		animateType
    	});

    	$$self.$inject_state = $$props => {
    		if ('texts' in $$props) $$invalidate(3, texts = $$props.texts);
    		if ('delay' in $$props) $$invalidate(4, delay = $$props.delay);
    		if ('word_complete_delay' in $$props) $$invalidate(5, word_complete_delay = $$props.word_complete_delay);
    		if ('num_loops' in $$props) $$invalidate(6, num_loops = $$props.num_loops);
    		if ('repeat_n_words' in $$props) $$invalidate(7, repeat_n_words = $$props.repeat_n_words);
    		if ('blink_time' in $$props) $$invalidate(0, blink_time = $$props.blink_time);
    		if ('blinker_iter_count' in $$props) $$invalidate(1, blinker_iter_count = $$props.blinker_iter_count);
    		if ('state' in $$props) $$invalidate(2, state = $$props.state);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		blink_time,
    		blinker_iter_count,
    		state,
    		texts,
    		delay,
    		word_complete_delay,
    		num_loops,
    		repeat_n_words
    	];
    }

    class AnimateType extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$i, create_fragment$i, safe_not_equal, {
    			texts: 3,
    			delay: 4,
    			word_complete_delay: 5,
    			num_loops: 6,
    			repeat_n_words: 7,
    			blink_time: 0,
    			blinker_iter_count: 1
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "AnimateType",
    			options,
    			id: create_fragment$i.name
    		});
    	}

    	get texts() {
    		throw new Error("<AnimateType>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set texts(value) {
    		throw new Error("<AnimateType>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get delay() {
    		throw new Error("<AnimateType>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set delay(value) {
    		throw new Error("<AnimateType>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get word_complete_delay() {
    		throw new Error("<AnimateType>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set word_complete_delay(value) {
    		throw new Error("<AnimateType>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get num_loops() {
    		throw new Error("<AnimateType>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set num_loops(value) {
    		throw new Error("<AnimateType>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get repeat_n_words() {
    		throw new Error("<AnimateType>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set repeat_n_words(value) {
    		throw new Error("<AnimateType>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get blink_time() {
    		throw new Error("<AnimateType>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set blink_time(value) {
    		throw new Error("<AnimateType>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get blinker_iter_count() {
    		throw new Error("<AnimateType>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set blinker_iter_count(value) {
    		throw new Error("<AnimateType>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\components\TextType\TextType.svelte generated by Svelte v3.49.0 */

    const { Object: Object_1$2 } = globals;

    function create_fragment$h(ctx) {
    	let animatetype;
    	let current;

    	animatetype = new AnimateType({
    			props: {
    				texts: /*texts*/ ctx[0],
    				delay: /*delay*/ ctx[1],
    				num_loops: /*num_loops*/ ctx[2],
    				repeat_n_words: /*repeat_n_words*/ ctx[3],
    				blinker_iter_count: /*blinker_iter_count*/ ctx[4]
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(animatetype.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(animatetype, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const animatetype_changes = {};
    			if (dirty & /*texts*/ 1) animatetype_changes.texts = /*texts*/ ctx[0];
    			if (dirty & /*delay*/ 2) animatetype_changes.delay = /*delay*/ ctx[1];
    			if (dirty & /*num_loops*/ 4) animatetype_changes.num_loops = /*num_loops*/ ctx[2];
    			if (dirty & /*repeat_n_words*/ 8) animatetype_changes.repeat_n_words = /*repeat_n_words*/ ctx[3];
    			if (dirty & /*blinker_iter_count*/ 16) animatetype_changes.blinker_iter_count = /*blinker_iter_count*/ ctx[4];
    			animatetype.$set(animatetype_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(animatetype.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(animatetype.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(animatetype, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$h.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$h($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('TextType', slots, []);
    	let { texts, delay, num_loops, repeat_n_words, blinker_iter_count } = $$props;

    	class TypeText {
    		constructor(word, direction) {
    			Object.assign(this, { word, direction });
    		}
    	}

    	let typeTexts = [];

    	texts.forEach(element => {
    		typeTexts.push(new TypeText(element, "type&delete"));
    	});

    	texts = typeTexts;
    	const writable_props = ['texts', 'delay', 'num_loops', 'repeat_n_words', 'blinker_iter_count'];

    	Object_1$2.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<TextType> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('texts' in $$props) $$invalidate(0, texts = $$props.texts);
    		if ('delay' in $$props) $$invalidate(1, delay = $$props.delay);
    		if ('num_loops' in $$props) $$invalidate(2, num_loops = $$props.num_loops);
    		if ('repeat_n_words' in $$props) $$invalidate(3, repeat_n_words = $$props.repeat_n_words);
    		if ('blinker_iter_count' in $$props) $$invalidate(4, blinker_iter_count = $$props.blinker_iter_count);
    	};

    	$$self.$capture_state = () => ({
    		texts,
    		delay,
    		num_loops,
    		repeat_n_words,
    		blinker_iter_count,
    		AnimateType,
    		TypeText,
    		typeTexts
    	});

    	$$self.$inject_state = $$props => {
    		if ('texts' in $$props) $$invalidate(0, texts = $$props.texts);
    		if ('delay' in $$props) $$invalidate(1, delay = $$props.delay);
    		if ('num_loops' in $$props) $$invalidate(2, num_loops = $$props.num_loops);
    		if ('repeat_n_words' in $$props) $$invalidate(3, repeat_n_words = $$props.repeat_n_words);
    		if ('blinker_iter_count' in $$props) $$invalidate(4, blinker_iter_count = $$props.blinker_iter_count);
    		if ('typeTexts' in $$props) typeTexts = $$props.typeTexts;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [texts, delay, num_loops, repeat_n_words, blinker_iter_count];
    }

    class TextType extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$h, create_fragment$h, safe_not_equal, {
    			texts: 0,
    			delay: 1,
    			num_loops: 2,
    			repeat_n_words: 3,
    			blinker_iter_count: 4
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "TextType",
    			options,
    			id: create_fragment$h.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*texts*/ ctx[0] === undefined && !('texts' in props)) {
    			console.warn("<TextType> was created without expected prop 'texts'");
    		}

    		if (/*delay*/ ctx[1] === undefined && !('delay' in props)) {
    			console.warn("<TextType> was created without expected prop 'delay'");
    		}

    		if (/*num_loops*/ ctx[2] === undefined && !('num_loops' in props)) {
    			console.warn("<TextType> was created without expected prop 'num_loops'");
    		}

    		if (/*repeat_n_words*/ ctx[3] === undefined && !('repeat_n_words' in props)) {
    			console.warn("<TextType> was created without expected prop 'repeat_n_words'");
    		}

    		if (/*blinker_iter_count*/ ctx[4] === undefined && !('blinker_iter_count' in props)) {
    			console.warn("<TextType> was created without expected prop 'blinker_iter_count'");
    		}
    	}

    	get texts() {
    		throw new Error("<TextType>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set texts(value) {
    		throw new Error("<TextType>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get delay() {
    		throw new Error("<TextType>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set delay(value) {
    		throw new Error("<TextType>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get num_loops() {
    		throw new Error("<TextType>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set num_loops(value) {
    		throw new Error("<TextType>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get repeat_n_words() {
    		throw new Error("<TextType>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set repeat_n_words(value) {
    		throw new Error("<TextType>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get blinker_iter_count() {
    		throw new Error("<TextType>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set blinker_iter_count(value) {
    		throw new Error("<TextType>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\components\01-Title\TitleParallax.svelte generated by Svelte v3.49.0 */
    const file$e = "src\\components\\01-Title\\TitleParallax.svelte";

    function get_each_context$7(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[7] = list[i];
    	return child_ctx;
    }

    // (18:0) {#if y <= Math.max(0, pageHalfDown)}
    function create_if_block$b(ctx) {
    	let div;
    	let current;
    	let each_value = /*layers*/ ctx[5];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$7(get_each_context$7(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			div = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(div, "id", "title");
    			attr_dev(div, "class", "parallax-container svelte-1d59v6c");
    			set_style(div, "height", /*containerHeight*/ ctx[0] - /*y*/ ctx[4] + "px");
    			add_location(div, file$e, 18, 2, 398);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*layers, y, containerHeight, textLayer, titleInfo, boolAnimateText*/ 59) {
    				each_value = /*layers*/ ctx[5];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$7(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block$7(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(div, null);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}

    			if (!current || dirty & /*containerHeight, y*/ 17) {
    				set_style(div, "height", /*containerHeight*/ ctx[0] - /*y*/ ctx[4] + "px");
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$b.name,
    		type: "if",
    		source: "(18:0) {#if y <= Math.max(0, pageHalfDown)}",
    		ctx
    	});

    	return block;
    }

    // (72:6) {:else}
    function create_else_block_1$1(ctx) {
    	let img;
    	let img_src_value;

    	const block = {
    		c: function create() {
    			img = element("img");
    			set_style(img, "transform", "translate(0," + -/*y*/ ctx[4] * (/*layer*/ ctx[7] - 1) / (/*layers*/ ctx[5].length - 1) + "px)");
    			if (!src_url_equal(img.src, img_src_value = "images/intro/0" + (/*layer*/ ctx[7] - 1) + ".png")) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "parallax layer " + (/*layer*/ ctx[7] - 1));
    			attr_dev(img, "height", /*containerHeight*/ ctx[0]);
    			attr_dev(img, "class", "svelte-1d59v6c");
    			add_location(img, file$e, 72, 8, 2303);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, img, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*y*/ 16) {
    				set_style(img, "transform", "translate(0," + -/*y*/ ctx[4] * (/*layer*/ ctx[7] - 1) / (/*layers*/ ctx[5].length - 1) + "px)");
    			}

    			if (dirty & /*containerHeight*/ 1) {
    				attr_dev(img, "height", /*containerHeight*/ ctx[0]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(img);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block_1$1.name,
    		type: "else",
    		source: "(72:6) {:else}",
    		ctx
    	});

    	return block;
    }

    // (65:29) 
    function create_if_block_6(ctx) {
    	let img;
    	let img_src_value;

    	const block = {
    		c: function create() {
    			img = element("img");
    			set_style(img, "transform", "translate(0," + (-/*y*/ ctx[4] + 10) + "px)");
    			if (!src_url_equal(img.src, img_src_value = "images/intro/0" + (/*layer*/ ctx[7] - 1) + ".png")) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "parallax layer " + (/*layer*/ ctx[7] - 1));
    			attr_dev(img, "height", /*containerHeight*/ ctx[0]);
    			attr_dev(img, "class", "svelte-1d59v6c");
    			add_location(img, file$e, 65, 8, 2080);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, img, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*y*/ 16) {
    				set_style(img, "transform", "translate(0," + (-/*y*/ ctx[4] + 10) + "px)");
    			}

    			if (dirty & /*containerHeight*/ 1) {
    				attr_dev(img, "height", /*containerHeight*/ ctx[0]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(img);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_6.name,
    		type: "if",
    		source: "(65:29) ",
    		ctx
    	});

    	return block;
    }

    // (57:48) 
    function create_if_block_5(ctx) {
    	let img;
    	let img_src_value;

    	const block = {
    		c: function create() {
    			img = element("img");
    			set_style(img, "transform", "translate(0," + -/*y*/ ctx[4] * (/*layer*/ ctx[7] - 1) / (/*layers*/ ctx[5].length - 1) + "px)");
    			if (!src_url_equal(img.src, img_src_value = "images/intro/00" + (/*layer*/ ctx[7] - 1) + ".png")) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "parallax layer " + (/*layer*/ ctx[7] - 1));
    			attr_dev(img, "height", /*containerHeight*/ ctx[0]);
    			attr_dev(img, "class", "svelte-1d59v6c");
    			add_location(img, file$e, 57, 8, 1794);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, img, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*y*/ 16) {
    				set_style(img, "transform", "translate(0," + -/*y*/ ctx[4] * (/*layer*/ ctx[7] - 1) / (/*layers*/ ctx[5].length - 1) + "px)");
    			}

    			if (dirty & /*containerHeight*/ 1) {
    				attr_dev(img, "height", /*containerHeight*/ ctx[0]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(img);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_5.name,
    		type: "if",
    		source: "(57:48) ",
    		ctx
    	});

    	return block;
    }

    // (33:36) 
    function create_if_block_2$1(ctx) {
    	let if_block_anchor;
    	let current;
    	let if_block = /*y*/ ctx[4] < /*containerHeight*/ ctx[0] && create_if_block_3(ctx);

    	const block = {
    		c: function create() {
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (/*y*/ ctx[4] < /*containerHeight*/ ctx[0]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty & /*y, containerHeight*/ 17) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block_3(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2$1.name,
    		type: "if",
    		source: "(33:36) ",
    		ctx
    	});

    	return block;
    }

    // (25:6) {#if layer < textLayer}
    function create_if_block_1$4(ctx) {
    	let img;
    	let img_src_value;

    	const block = {
    		c: function create() {
    			img = element("img");
    			attr_dev(img, "id", "img-parallax-" + /*layer*/ ctx[7]);
    			set_style(img, "transform", "translate(0," + -/*y*/ ctx[4] * /*layer*/ ctx[7] / (/*layers*/ ctx[5].length - 1) + "px)");
    			if (!src_url_equal(img.src, img_src_value = "images/intro/00" + /*layer*/ ctx[7] + ".png")) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "parallax layer " + /*layer*/ ctx[7]);
    			attr_dev(img, "height", /*containerHeight*/ ctx[0]);
    			attr_dev(img, "class", "svelte-1d59v6c");
    			add_location(img, file$e, 25, 8, 571);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, img, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*y*/ 16) {
    				set_style(img, "transform", "translate(0," + -/*y*/ ctx[4] * /*layer*/ ctx[7] / (/*layers*/ ctx[5].length - 1) + "px)");
    			}

    			if (dirty & /*containerHeight*/ 1) {
    				attr_dev(img, "height", /*containerHeight*/ ctx[0]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(img);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$4.name,
    		type: "if",
    		source: "(25:6) {#if layer < textLayer}",
    		ctx
    	});

    	return block;
    }

    // (34:8) {#if y < containerHeight}
    function create_if_block_3(ctx) {
    	let div5;
    	let div0;
    	let t0_value = /*titleInfo*/ ctx[3].preamble + "";
    	let t0;
    	let t1;
    	let div1;
    	let t2_value = /*titleInfo*/ ctx[3].title + "";
    	let t2;
    	let t3;
    	let div2;
    	let t4_value = /*titleInfo*/ ctx[3].subtitle + "";
    	let t4;
    	let current_block_type_index;
    	let if_block;
    	let t5;
    	let div3;
    	let t6_value = /*titleInfo*/ ctx[3].description + "";
    	let t6;
    	let t7;
    	let div4;
    	let i;
    	let t8;
    	let current;
    	const if_block_creators = [create_if_block_4, create_else_block$9];
    	const if_blocks = [];

    	function select_block_type_1(ctx, dirty) {
    		if (/*boolAnimateText*/ ctx[1]) return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type_1(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block = {
    		c: function create() {
    			div5 = element("div");
    			div0 = element("div");
    			t0 = text(t0_value);
    			t1 = space();
    			div1 = element("div");
    			t2 = text(t2_value);
    			t3 = space();
    			div2 = element("div");
    			t4 = text(t4_value);
    			if_block.c();
    			t5 = space();
    			div3 = element("div");
    			t6 = text(t6_value);
    			t7 = space();
    			div4 = element("div");
    			i = element("i");
    			t8 = space();
    			attr_dev(div0, "class", "textLayer-preamble svelte-1d59v6c");
    			add_location(div0, file$e, 35, 12, 948);
    			attr_dev(div1, "class", "textLayer-title");
    			add_location(div1, file$e, 36, 12, 1020);
    			attr_dev(div2, "class", "textLayer-subtitle svelte-1d59v6c");
    			add_location(div2, file$e, 37, 12, 1086);
    			attr_dev(div3, "class", "textLayer-description svelte-1d59v6c");
    			add_location(div3, file$e, 50, 12, 1526);
    			attr_dev(i, "class", "fa-solid fa-angles-down");
    			add_location(i, file$e, 53, 36, 1658);
    			attr_dev(div4, "class", "scrolldown svelte-1d59v6c");
    			add_location(div4, file$e, 53, 12, 1634);
    			attr_dev(div5, "class", "textLayer svelte-1d59v6c");
    			add_location(div5, file$e, 34, 10, 911);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div5, anchor);
    			append_dev(div5, div0);
    			append_dev(div0, t0);
    			append_dev(div5, t1);
    			append_dev(div5, div1);
    			append_dev(div1, t2);
    			append_dev(div5, t3);
    			append_dev(div5, div2);
    			append_dev(div2, t4);
    			if_blocks[current_block_type_index].m(div2, null);
    			append_dev(div5, t5);
    			append_dev(div5, div3);
    			append_dev(div3, t6);
    			append_dev(div5, t7);
    			append_dev(div5, div4);
    			append_dev(div4, i);
    			append_dev(div5, t8);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if ((!current || dirty & /*titleInfo*/ 8) && t0_value !== (t0_value = /*titleInfo*/ ctx[3].preamble + "")) set_data_dev(t0, t0_value);
    			if ((!current || dirty & /*titleInfo*/ 8) && t2_value !== (t2_value = /*titleInfo*/ ctx[3].title + "")) set_data_dev(t2, t2_value);
    			if ((!current || dirty & /*titleInfo*/ 8) && t4_value !== (t4_value = /*titleInfo*/ ctx[3].subtitle + "")) set_data_dev(t4, t4_value);
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type_1(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				} else {
    					if_block.p(ctx, dirty);
    				}

    				transition_in(if_block, 1);
    				if_block.m(div2, null);
    			}

    			if ((!current || dirty & /*titleInfo*/ 8) && t6_value !== (t6_value = /*titleInfo*/ ctx[3].description + "")) set_data_dev(t6, t6_value);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div5);
    			if_blocks[current_block_type_index].d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_3.name,
    		type: "if",
    		source: "(34:8) {#if y < containerHeight}",
    		ctx
    	});

    	return block;
    }

    // (47:14) {:else}
    function create_else_block$9(ctx) {
    	let t_value = /*titleInfo*/ ctx[3].texts[0] + "";
    	let t;

    	const block = {
    		c: function create() {
    			t = text(t_value);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*titleInfo*/ 8 && t_value !== (t_value = /*titleInfo*/ ctx[3].texts[0] + "")) set_data_dev(t, t_value);
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$9.name,
    		type: "else",
    		source: "(47:14) {:else}",
    		ctx
    	});

    	return block;
    }

    // (39:34) {#if boolAnimateText}
    function create_if_block_4(ctx) {
    	let texttype;
    	let current;

    	texttype = new TextType({
    			props: {
    				texts: /*titleInfo*/ ctx[3].texts,
    				delay: 100,
    				num_loops: 2,
    				repeat_n_words: 1,
    				blinker_iter_count: 14
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(texttype.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(texttype, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const texttype_changes = {};
    			if (dirty & /*titleInfo*/ 8) texttype_changes.texts = /*titleInfo*/ ctx[3].texts;
    			texttype.$set(texttype_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(texttype.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(texttype.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(texttype, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_4.name,
    		type: "if",
    		source: "(39:34) {#if boolAnimateText}",
    		ctx
    	});

    	return block;
    }

    // (24:4) {#each layers as layer}
    function create_each_block$7(ctx) {
    	let current_block_type_index;
    	let if_block;
    	let if_block_anchor;
    	let current;

    	const if_block_creators = [
    		create_if_block_1$4,
    		create_if_block_2$1,
    		create_if_block_5,
    		create_if_block_6,
    		create_else_block_1$1
    	];

    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*layer*/ ctx[7] < textLayer$1) return 0;
    		if (/*layer*/ ctx[7] === textLayer$1) return 1;
    		if (/*layer*/ ctx[7] > textLayer$1 && /*layer*/ ctx[7] < 11) return 2;
    		if (/*layer*/ ctx[7] === 14) return 3;
    		return 4;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block = {
    		c: function create() {
    			if_block.c();
    			if_block_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if_blocks[current_block_type_index].m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if_block.p(ctx, dirty);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if_blocks[current_block_type_index].d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$7.name,
    		type: "each",
    		source: "(24:4) {#each layers as layer}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$g(ctx) {
    	let scrolling = false;

    	let clear_scrolling = () => {
    		scrolling = false;
    	};

    	let scrolling_timeout;
    	let show_if = /*y*/ ctx[4] <= Math.max(0, /*pageHalfDown*/ ctx[2]);
    	let if_block_anchor;
    	let current;
    	let mounted;
    	let dispose;
    	add_render_callback(/*onwindowscroll*/ ctx[6]);
    	let if_block = show_if && create_if_block$b(ctx);

    	const block = {
    		c: function create() {
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(window, "scroll", () => {
    					scrolling = true;
    					clearTimeout(scrolling_timeout);
    					scrolling_timeout = setTimeout(clear_scrolling, 100);
    					/*onwindowscroll*/ ctx[6]();
    				});

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*y*/ 16 && !scrolling) {
    				scrolling = true;
    				clearTimeout(scrolling_timeout);
    				scrollTo(window.pageXOffset, /*y*/ ctx[4]);
    				scrolling_timeout = setTimeout(clear_scrolling, 100);
    			}

    			if (dirty & /*y, pageHalfDown*/ 20) show_if = /*y*/ ctx[4] <= Math.max(0, /*pageHalfDown*/ ctx[2]);

    			if (show_if) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty & /*y, pageHalfDown*/ 20) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block$b(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$g.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    const numLayers$1 = 15;
    const textLayer$1 = 4;

    function instance$g($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('TitleParallax', slots, []);
    	let { containerHeight } = $$props;
    	let { boolAnimateText = true } = $$props;
    	let { pageHalfDown = 1000 } = $$props;
    	let { titleInfo } = $$props;
    	const layers = [...Array(numLayers$1).keys()];
    	let y;
    	const writable_props = ['containerHeight', 'boolAnimateText', 'pageHalfDown', 'titleInfo'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<TitleParallax> was created with unknown prop '${key}'`);
    	});

    	function onwindowscroll() {
    		$$invalidate(4, y = window.pageYOffset);
    	}

    	$$self.$$set = $$props => {
    		if ('containerHeight' in $$props) $$invalidate(0, containerHeight = $$props.containerHeight);
    		if ('boolAnimateText' in $$props) $$invalidate(1, boolAnimateText = $$props.boolAnimateText);
    		if ('pageHalfDown' in $$props) $$invalidate(2, pageHalfDown = $$props.pageHalfDown);
    		if ('titleInfo' in $$props) $$invalidate(3, titleInfo = $$props.titleInfo);
    	};

    	$$self.$capture_state = () => ({
    		TextType,
    		containerHeight,
    		boolAnimateText,
    		pageHalfDown,
    		titleInfo,
    		numLayers: numLayers$1,
    		layers,
    		textLayer: textLayer$1,
    		y
    	});

    	$$self.$inject_state = $$props => {
    		if ('containerHeight' in $$props) $$invalidate(0, containerHeight = $$props.containerHeight);
    		if ('boolAnimateText' in $$props) $$invalidate(1, boolAnimateText = $$props.boolAnimateText);
    		if ('pageHalfDown' in $$props) $$invalidate(2, pageHalfDown = $$props.pageHalfDown);
    		if ('titleInfo' in $$props) $$invalidate(3, titleInfo = $$props.titleInfo);
    		if ('y' in $$props) $$invalidate(4, y = $$props.y);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		containerHeight,
    		boolAnimateText,
    		pageHalfDown,
    		titleInfo,
    		y,
    		layers,
    		onwindowscroll
    	];
    }

    class TitleParallax extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$g, create_fragment$g, safe_not_equal, {
    			containerHeight: 0,
    			boolAnimateText: 1,
    			pageHalfDown: 2,
    			titleInfo: 3
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "TitleParallax",
    			options,
    			id: create_fragment$g.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*containerHeight*/ ctx[0] === undefined && !('containerHeight' in props)) {
    			console.warn("<TitleParallax> was created without expected prop 'containerHeight'");
    		}

    		if (/*titleInfo*/ ctx[3] === undefined && !('titleInfo' in props)) {
    			console.warn("<TitleParallax> was created without expected prop 'titleInfo'");
    		}
    	}

    	get containerHeight() {
    		throw new Error("<TitleParallax>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set containerHeight(value) {
    		throw new Error("<TitleParallax>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get boolAnimateText() {
    		throw new Error("<TitleParallax>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set boolAnimateText(value) {
    		throw new Error("<TitleParallax>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get pageHalfDown() {
    		throw new Error("<TitleParallax>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set pageHalfDown(value) {
    		throw new Error("<TitleParallax>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get titleInfo() {
    		throw new Error("<TitleParallax>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set titleInfo(value) {
    		throw new Error("<TitleParallax>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\components\01-Title\TitleMobile.svelte generated by Svelte v3.49.0 */
    const file$d = "src\\components\\01-Title\\TitleMobile.svelte";

    // (19:6) {:else}
    function create_else_block$8(ctx) {
    	let t_value = /*titleInfo*/ ctx[0].texts[0] + "";
    	let t;

    	const block = {
    		c: function create() {
    			t = text(t_value);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*titleInfo*/ 1 && t_value !== (t_value = /*titleInfo*/ ctx[0].texts[0] + "")) set_data_dev(t, t_value);
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$8.name,
    		type: "else",
    		source: "(19:6) {:else}",
    		ctx
    	});

    	return block;
    }

    // (11:26) {#if boolAnimateText}
    function create_if_block$a(ctx) {
    	let texttype;
    	let current;

    	texttype = new TextType({
    			props: {
    				texts: /*titleInfo*/ ctx[0].texts,
    				delay: 100,
    				num_loops: 2,
    				repeat_n_words: 1,
    				blinker_iter_count: 14
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(texttype.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(texttype, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const texttype_changes = {};
    			if (dirty & /*titleInfo*/ 1) texttype_changes.texts = /*titleInfo*/ ctx[0].texts;
    			texttype.$set(texttype_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(texttype.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(texttype.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(texttype, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$a.name,
    		type: "if",
    		source: "(11:26) {#if boolAnimateText}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$f(ctx) {
    	let div6;
    	let div5;
    	let div0;
    	let t0_value = /*titleInfo*/ ctx[0].preamble + "";
    	let t0;
    	let t1;
    	let div1;
    	let t2_value = /*titleInfo*/ ctx[0].title + "";
    	let t2;
    	let t3;
    	let div2;
    	let t4_value = /*titleInfo*/ ctx[0].subtitle + "";
    	let t4;
    	let current_block_type_index;
    	let if_block;
    	let t5;
    	let div3;
    	let t6_value = /*titleInfo*/ ctx[0].description + "";
    	let t6;
    	let t7;
    	let div4;
    	let i;
    	let current;
    	const if_block_creators = [create_if_block$a, create_else_block$8];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*boolAnimateText*/ ctx[1]) return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block = {
    		c: function create() {
    			div6 = element("div");
    			div5 = element("div");
    			div0 = element("div");
    			t0 = text(t0_value);
    			t1 = space();
    			div1 = element("div");
    			t2 = text(t2_value);
    			t3 = space();
    			div2 = element("div");
    			t4 = text(t4_value);
    			if_block.c();
    			t5 = space();
    			div3 = element("div");
    			t6 = text(t6_value);
    			t7 = space();
    			div4 = element("div");
    			i = element("i");
    			attr_dev(div0, "class", "textLayer-preamble svelte-n4srua");
    			add_location(div0, file$d, 7, 4, 205);
    			attr_dev(div1, "class", "textLayer-title");
    			add_location(div1, file$d, 8, 4, 269);
    			attr_dev(div2, "class", "textLayer-subtitle");
    			add_location(div2, file$d, 9, 4, 327);
    			attr_dev(div3, "class", "textLayer-description svelte-n4srua");
    			add_location(div3, file$d, 22, 4, 663);
    			attr_dev(i, "class", "fa-solid fa-angles-down");
    			add_location(i, file$d, 25, 28, 771);
    			attr_dev(div4, "class", "scrolldown svelte-n4srua");
    			add_location(div4, file$d, 25, 4, 747);
    			attr_dev(div5, "class", "textLayer col-sm-10 offset-sm-1 svelte-n4srua");
    			add_location(div5, file$d, 6, 2, 154);
    			attr_dev(div6, "class", "textLayerWrapper svelte-n4srua");
    			add_location(div6, file$d, 5, 0, 120);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div6, anchor);
    			append_dev(div6, div5);
    			append_dev(div5, div0);
    			append_dev(div0, t0);
    			append_dev(div5, t1);
    			append_dev(div5, div1);
    			append_dev(div1, t2);
    			append_dev(div5, t3);
    			append_dev(div5, div2);
    			append_dev(div2, t4);
    			if_blocks[current_block_type_index].m(div2, null);
    			append_dev(div5, t5);
    			append_dev(div5, div3);
    			append_dev(div3, t6);
    			append_dev(div5, t7);
    			append_dev(div5, div4);
    			append_dev(div4, i);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if ((!current || dirty & /*titleInfo*/ 1) && t0_value !== (t0_value = /*titleInfo*/ ctx[0].preamble + "")) set_data_dev(t0, t0_value);
    			if ((!current || dirty & /*titleInfo*/ 1) && t2_value !== (t2_value = /*titleInfo*/ ctx[0].title + "")) set_data_dev(t2, t2_value);
    			if ((!current || dirty & /*titleInfo*/ 1) && t4_value !== (t4_value = /*titleInfo*/ ctx[0].subtitle + "")) set_data_dev(t4, t4_value);
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				} else {
    					if_block.p(ctx, dirty);
    				}

    				transition_in(if_block, 1);
    				if_block.m(div2, null);
    			}

    			if ((!current || dirty & /*titleInfo*/ 1) && t6_value !== (t6_value = /*titleInfo*/ ctx[0].description + "")) set_data_dev(t6, t6_value);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div6);
    			if_blocks[current_block_type_index].d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$f.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$f($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('TitleMobile', slots, []);
    	let { titleInfo, boolAnimateText } = $$props;
    	const writable_props = ['titleInfo', 'boolAnimateText'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<TitleMobile> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('titleInfo' in $$props) $$invalidate(0, titleInfo = $$props.titleInfo);
    		if ('boolAnimateText' in $$props) $$invalidate(1, boolAnimateText = $$props.boolAnimateText);
    	};

    	$$self.$capture_state = () => ({ titleInfo, boolAnimateText, TextType });

    	$$self.$inject_state = $$props => {
    		if ('titleInfo' in $$props) $$invalidate(0, titleInfo = $$props.titleInfo);
    		if ('boolAnimateText' in $$props) $$invalidate(1, boolAnimateText = $$props.boolAnimateText);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [titleInfo, boolAnimateText];
    }

    class TitleMobile extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$f, create_fragment$f, safe_not_equal, { titleInfo: 0, boolAnimateText: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "TitleMobile",
    			options,
    			id: create_fragment$f.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*titleInfo*/ ctx[0] === undefined && !('titleInfo' in props)) {
    			console.warn("<TitleMobile> was created without expected prop 'titleInfo'");
    		}

    		if (/*boolAnimateText*/ ctx[1] === undefined && !('boolAnimateText' in props)) {
    			console.warn("<TitleMobile> was created without expected prop 'boolAnimateText'");
    		}
    	}

    	get titleInfo() {
    		throw new Error("<TitleMobile>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set titleInfo(value) {
    		throw new Error("<TitleMobile>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get boolAnimateText() {
    		throw new Error("<TitleMobile>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set boolAnimateText(value) {
    		throw new Error("<TitleMobile>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\components\02-AboutMe.svelte generated by Svelte v3.49.0 */

    const file$c = "src\\components\\02-AboutMe.svelte";

    function get_each_context$6(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[2] = list[i];
    	return child_ctx;
    }

    function get_each_context_1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[2] = list[i];
    	return child_ctx;
    }

    // (25:10) {#each techs1 as tech}
    function create_each_block_1(ctx) {
    	let div;
    	let t_value = /*tech*/ ctx[2] + "";
    	let t;

    	const block = {
    		c: function create() {
    			div = element("div");
    			t = text(t_value);
    			attr_dev(div, "class", "techstack svelte-uxtfd0");
    			add_location(div, file$c, 25, 12, 1077);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, t);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_1.name,
    		type: "each",
    		source: "(25:10) {#each techs1 as tech}",
    		ctx
    	});

    	return block;
    }

    // (28:10) {#each techs2 as tech}
    function create_each_block$6(ctx) {
    	let div;
    	let t_value = /*tech*/ ctx[2] + "";
    	let t;

    	const block = {
    		c: function create() {
    			div = element("div");
    			t = text(t_value);
    			attr_dev(div, "class", "techstack svelte-uxtfd0");
    			add_location(div, file$c, 28, 12, 1179);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, t);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$6.name,
    		type: "each",
    		source: "(28:10) {#each techs2 as tech}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$e(ctx) {
    	let div8;
    	let div0;
    	let t0;
    	let h1;
    	let t2;
    	let div7;
    	let div4;
    	let div1;
    	let t3;
    	let br0;
    	let br1;
    	let t4;
    	let br2;
    	let t5;
    	let br3;
    	let t6;
    	let br4;
    	let br5;
    	let t7;
    	let div3;
    	let div2;
    	let t8;
    	let t9;
    	let div6;
    	let div5;
    	let img;
    	let img_src_value;
    	let each_value_1 = /*techs1*/ ctx[0];
    	validate_each_argument(each_value_1);
    	let each_blocks_1 = [];

    	for (let i = 0; i < each_value_1.length; i += 1) {
    		each_blocks_1[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
    	}

    	let each_value = /*techs2*/ ctx[1];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$6(get_each_context$6(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			div8 = element("div");
    			div0 = element("div");
    			t0 = space();
    			h1 = element("h1");
    			h1.textContent = "About me";
    			t2 = space();
    			div7 = element("div");
    			div4 = element("div");
    			div1 = element("div");
    			t3 = text("My interest began during my first co-op term as an accountant, when I\r\n        needed to manipulate data in Excel. It went from keyboard shortcuts to\r\n        VBA to quickly transferring out of my accounting program!\r\n        ");
    			br0 = element("br");
    			br1 = element("br");
    			t4 = text("\r\n        Since then, I've worked as a Full Stack Developer, a Data Specialist, and\r\n        even an Innovation Catalyst! I recently enjoyed my post-graduation break\r\n        and now I’m looking for a company to join for my next adventure.\r\n        ");
    			br2 = element("br");
    			t5 = space();
    			br3 = element("br");
    			t6 = text("\r\n        Here are a few technologies I’ve been working with:\r\n        ");
    			br4 = element("br");
    			br5 = element("br");
    			t7 = space();
    			div3 = element("div");
    			div2 = element("div");

    			for (let i = 0; i < each_blocks_1.length; i += 1) {
    				each_blocks_1[i].c();
    			}

    			t8 = space();

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t9 = space();
    			div6 = element("div");
    			div5 = element("div");
    			img = element("img");
    			attr_dev(div0, "class", "empty row svelte-uxtfd0");
    			add_location(div0, file$c, 6, 2, 187);
    			attr_dev(h1, "class", "title col-md-9 svelte-uxtfd0");
    			add_location(h1, file$c, 7, 2, 216);
    			add_location(br0, file$c, 14, 8, 588);
    			add_location(br1, file$c, 14, 14, 594);
    			add_location(br2, file$c, 18, 8, 849);
    			add_location(br3, file$c, 18, 15, 856);
    			add_location(br4, file$c, 20, 8, 933);
    			add_location(br5, file$c, 20, 14, 939);
    			attr_dev(div1, "class", "description svelte-uxtfd0");
    			add_location(div1, file$c, 10, 6, 327);
    			attr_dev(div2, "class", "row svelte-uxtfd0");
    			add_location(div2, file$c, 23, 8, 1012);
    			attr_dev(div3, "class", "row techlist1 m-0 p-0 svelte-uxtfd0");
    			add_location(div3, file$c, 22, 6, 967);
    			attr_dev(div4, "class", "text col-md-7 svelte-uxtfd0");
    			add_location(div4, file$c, 9, 4, 292);
    			attr_dev(img, "class", "aboutmeimg svelte-uxtfd0");
    			if (!src_url_equal(img.src, img_src_value = "images/02-aboutme/self2.png")) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "tony kwok");
    			add_location(img, file$c, 35, 8, 1362);
    			attr_dev(div5, "class", "aboutmeimg-container svelte-uxtfd0");
    			add_location(div5, file$c, 34, 6, 1318);
    			attr_dev(div6, "class", "imgdiv col-md-5 svelte-uxtfd0");
    			add_location(div6, file$c, 33, 4, 1281);
    			attr_dev(div7, "class", "row col-md-9 svelte-uxtfd0");
    			add_location(div7, file$c, 8, 2, 260);
    			attr_dev(div8, "id", "aboutme");
    			attr_dev(div8, "class", "aboutMe container-fluid col-sm-10 offset-sm-1 svelte-uxtfd0");
    			add_location(div8, file$c, 5, 0, 111);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div8, anchor);
    			append_dev(div8, div0);
    			append_dev(div8, t0);
    			append_dev(div8, h1);
    			append_dev(div8, t2);
    			append_dev(div8, div7);
    			append_dev(div7, div4);
    			append_dev(div4, div1);
    			append_dev(div1, t3);
    			append_dev(div1, br0);
    			append_dev(div1, br1);
    			append_dev(div1, t4);
    			append_dev(div1, br2);
    			append_dev(div1, t5);
    			append_dev(div1, br3);
    			append_dev(div1, t6);
    			append_dev(div1, br4);
    			append_dev(div1, br5);
    			append_dev(div4, t7);
    			append_dev(div4, div3);
    			append_dev(div3, div2);

    			for (let i = 0; i < each_blocks_1.length; i += 1) {
    				each_blocks_1[i].m(div2, null);
    			}

    			append_dev(div2, t8);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div2, null);
    			}

    			append_dev(div7, t9);
    			append_dev(div7, div6);
    			append_dev(div6, div5);
    			append_dev(div5, img);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*techs1*/ 1) {
    				each_value_1 = /*techs1*/ ctx[0];
    				validate_each_argument(each_value_1);
    				let i;

    				for (i = 0; i < each_value_1.length; i += 1) {
    					const child_ctx = get_each_context_1(ctx, each_value_1, i);

    					if (each_blocks_1[i]) {
    						each_blocks_1[i].p(child_ctx, dirty);
    					} else {
    						each_blocks_1[i] = create_each_block_1(child_ctx);
    						each_blocks_1[i].c();
    						each_blocks_1[i].m(div2, t8);
    					}
    				}

    				for (; i < each_blocks_1.length; i += 1) {
    					each_blocks_1[i].d(1);
    				}

    				each_blocks_1.length = each_value_1.length;
    			}

    			if (dirty & /*techs2*/ 2) {
    				each_value = /*techs2*/ ctx[1];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$6(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$6(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(div2, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div8);
    			destroy_each(each_blocks_1, detaching);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$e.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$e($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('_02_AboutMe', slots, []);
    	let techs1 = ["Python", "Javascript", "Svelte"];
    	let techs2 = ["SQL", "Node.JS"];
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<_02_AboutMe> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ techs1, techs2 });

    	$$self.$inject_state = $$props => {
    		if ('techs1' in $$props) $$invalidate(0, techs1 = $$props.techs1);
    		if ('techs2' in $$props) $$invalidate(1, techs2 = $$props.techs2);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [techs1, techs2];
    }

    class _02_AboutMe extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$e, create_fragment$e, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "_02_AboutMe",
    			options,
    			id: create_fragment$e.name
    		});
    	}
    }

    /* src\components\Cards\CardCareer.svelte generated by Svelte v3.49.0 */

    const file$b = "src\\components\\Cards\\CardCareer.svelte";

    function get_each_context$5(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[5] = list[i];
    	child_ctx[7] = i;
    	return child_ctx;
    }

    // (20:8) {#each points as point, index}
    function create_each_block$5(ctx) {
    	let li;
    	let t_value = /*point*/ ctx[5] + "";
    	let t;

    	const block = {
    		c: function create() {
    			li = element("li");
    			t = text(t_value);
    			add_location(li, file$b, 20, 10, 604);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, li, anchor);
    			append_dev(li, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*points*/ 8 && t_value !== (t_value = /*point*/ ctx[5] + "")) set_data_dev(t, t_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(li);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$5.name,
    		type: "each",
    		source: "(20:8) {#each points as point, index}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$d(ctx) {
    	let div3;
    	let div2;
    	let div1;
    	let div0;
    	let img;
    	let img_src_value;
    	let t0;
    	let h4;
    	let t1;
    	let t2;
    	let h6;
    	let t3;
    	let t4;
    	let p;
    	let each_value = /*points*/ ctx[3];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$5(get_each_context$5(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			div3 = element("div");
    			div2 = element("div");
    			div1 = element("div");
    			div0 = element("div");
    			img = element("img");
    			t0 = space();
    			h4 = element("h4");
    			t1 = text(/*title*/ ctx[1]);
    			t2 = space();
    			h6 = element("h6");
    			t3 = text(/*subtitle*/ ctx[2]);
    			t4 = space();
    			p = element("p");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(img, "class", "logo svelte-1cupo5k");
    			if (!src_url_equal(img.src, img_src_value = /*imgurl*/ ctx[0])) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "company logo");
    			add_location(img, file$b, 14, 8, 365);
    			attr_dev(div0, "class", "circle-logo svelte-1cupo5k");
    			set_style(div0, "background-image", /*logoColor*/ ctx[4]);
    			add_location(div0, file$b, 13, 6, 292);
    			attr_dev(h4, "class", "card-title svelte-1cupo5k");
    			add_location(h4, file$b, 16, 6, 439);
    			attr_dev(h6, "class", "card-subtitle svelte-1cupo5k");
    			add_location(h6, file$b, 17, 6, 482);
    			attr_dev(p, "class", "card-text");
    			add_location(p, file$b, 18, 6, 531);
    			attr_dev(div1, "class", "card-body svelte-1cupo5k");
    			add_location(div1, file$b, 12, 4, 261);
    			attr_dev(div2, "class", "card m-2 cb1 text-center svelte-1cupo5k");
    			add_location(div2, file$b, 11, 2, 217);
    			attr_dev(div3, "class", "container-fluid card-container svelte-1cupo5k");
    			add_location(div3, file$b, 10, 0, 169);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div3, anchor);
    			append_dev(div3, div2);
    			append_dev(div2, div1);
    			append_dev(div1, div0);
    			append_dev(div0, img);
    			append_dev(div1, t0);
    			append_dev(div1, h4);
    			append_dev(h4, t1);
    			append_dev(div1, t2);
    			append_dev(div1, h6);
    			append_dev(h6, t3);
    			append_dev(div1, t4);
    			append_dev(div1, p);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(p, null);
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*imgurl*/ 1 && !src_url_equal(img.src, img_src_value = /*imgurl*/ ctx[0])) {
    				attr_dev(img, "src", img_src_value);
    			}

    			if (dirty & /*logoColor*/ 16) {
    				set_style(div0, "background-image", /*logoColor*/ ctx[4]);
    			}

    			if (dirty & /*title*/ 2) set_data_dev(t1, /*title*/ ctx[1]);
    			if (dirty & /*subtitle*/ 4) set_data_dev(t3, /*subtitle*/ ctx[2]);

    			if (dirty & /*points*/ 8) {
    				each_value = /*points*/ ctx[3];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$5(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$5(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(p, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div3);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$d.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$d($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('CardCareer', slots, []);
    	let { imgurl } = $$props;
    	let { title } = $$props;
    	let { subtitle } = $$props;
    	let { points } = $$props;
    	let { logoColor } = $$props;
    	const writable_props = ['imgurl', 'title', 'subtitle', 'points', 'logoColor'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<CardCareer> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('imgurl' in $$props) $$invalidate(0, imgurl = $$props.imgurl);
    		if ('title' in $$props) $$invalidate(1, title = $$props.title);
    		if ('subtitle' in $$props) $$invalidate(2, subtitle = $$props.subtitle);
    		if ('points' in $$props) $$invalidate(3, points = $$props.points);
    		if ('logoColor' in $$props) $$invalidate(4, logoColor = $$props.logoColor);
    	};

    	$$self.$capture_state = () => ({
    		imgurl,
    		title,
    		subtitle,
    		points,
    		logoColor
    	});

    	$$self.$inject_state = $$props => {
    		if ('imgurl' in $$props) $$invalidate(0, imgurl = $$props.imgurl);
    		if ('title' in $$props) $$invalidate(1, title = $$props.title);
    		if ('subtitle' in $$props) $$invalidate(2, subtitle = $$props.subtitle);
    		if ('points' in $$props) $$invalidate(3, points = $$props.points);
    		if ('logoColor' in $$props) $$invalidate(4, logoColor = $$props.logoColor);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [imgurl, title, subtitle, points, logoColor];
    }

    class CardCareer extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$d, create_fragment$d, safe_not_equal, {
    			imgurl: 0,
    			title: 1,
    			subtitle: 2,
    			points: 3,
    			logoColor: 4
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "CardCareer",
    			options,
    			id: create_fragment$d.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*imgurl*/ ctx[0] === undefined && !('imgurl' in props)) {
    			console.warn("<CardCareer> was created without expected prop 'imgurl'");
    		}

    		if (/*title*/ ctx[1] === undefined && !('title' in props)) {
    			console.warn("<CardCareer> was created without expected prop 'title'");
    		}

    		if (/*subtitle*/ ctx[2] === undefined && !('subtitle' in props)) {
    			console.warn("<CardCareer> was created without expected prop 'subtitle'");
    		}

    		if (/*points*/ ctx[3] === undefined && !('points' in props)) {
    			console.warn("<CardCareer> was created without expected prop 'points'");
    		}

    		if (/*logoColor*/ ctx[4] === undefined && !('logoColor' in props)) {
    			console.warn("<CardCareer> was created without expected prop 'logoColor'");
    		}
    	}

    	get imgurl() {
    		throw new Error("<CardCareer>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set imgurl(value) {
    		throw new Error("<CardCareer>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get title() {
    		throw new Error("<CardCareer>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set title(value) {
    		throw new Error("<CardCareer>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get subtitle() {
    		throw new Error("<CardCareer>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set subtitle(value) {
    		throw new Error("<CardCareer>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get points() {
    		throw new Error("<CardCareer>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set points(value) {
    		throw new Error("<CardCareer>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get logoColor() {
    		throw new Error("<CardCareer>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set logoColor(value) {
    		throw new Error("<CardCareer>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* eslint-disable @typescript-eslint/no-explicit-any */
    // This file taken from rgossiaux/svelte-headlessui
    // Copyright 2020-present Hunter Perrin
    function useActions(node, actions) {
        const actionReturns = [];
        if (actions) {
            for (let i = 0; i < actions.length; i++) {
                const actionEntry = actions[i];
                const action = Array.isArray(actionEntry) ? actionEntry[0] : actionEntry;
                if (Array.isArray(actionEntry) && actionEntry.length > 1) {
                    actionReturns.push(action(node, actionEntry[1]));
                }
                else {
                    actionReturns.push(action(node));
                }
            }
        }
        return {
            update(actions) {
                if (((actions && actions.length) || 0) != actionReturns.length) {
                    throw new Error('You must not change the length of an actions array.');
                }
                if (actions) {
                    for (let i = 0; i < actions.length; i++) {
                        const returnEntry = actionReturns[i];
                        if (returnEntry && returnEntry.update) {
                            const actionEntry = actions[i];
                            if (Array.isArray(actionEntry) && actionEntry.length > 1) {
                                returnEntry.update(actionEntry[1]);
                            }
                            else {
                                returnEntry.update();
                            }
                        }
                    }
                }
            },
            destroy() {
                for (let i = 0; i < actionReturns.length; i++) {
                    const returnEntry = actionReturns[i];
                    if (returnEntry && returnEntry.destroy) {
                        returnEntry.destroy();
                    }
                }
            }
        };
    }

    /* eslint-disable @typescript-eslint/no-empty-function */
    const MODIFIER_DIVIDER = '!';
    const modifierRegex = new RegExp(`^[^${MODIFIER_DIVIDER}]+(?:${MODIFIER_DIVIDER}(?:preventDefault|stopPropagation|passive|nonpassive|capture|once|self))+$`);
    /** Function for forwarding DOM events to the component's declaration */
    function createEventForwarder(component, except = []) {
        // This is our pseudo $on function. It is defined on component mount.
        let $on;
        // This is a list of events bound before mount.
        const events = [];
        // And we override the $on function to forward all bound events.
        component.$on = (fullEventType, callback) => {
            const eventType = fullEventType;
            let destructor = () => { };
            for (const exception of except) {
                if (typeof exception === 'string' && exception === eventType) {
                    // Bail out of the event forwarding and run the normal Svelte $on() code
                    const callbacks = component.$$.callbacks[eventType] || (component.$$.callbacks[eventType] = []);
                    callbacks.push(callback);
                    return () => {
                        const index = callbacks.indexOf(callback);
                        if (index !== -1)
                            callbacks.splice(index, 1);
                    };
                }
                if (typeof exception === 'object' && exception['name'] === eventType) {
                    const oldCallback = callback;
                    callback = (...props) => {
                        if (!(typeof exception === 'object' && exception['shouldExclude']())) {
                            oldCallback(...props);
                        }
                    };
                }
            }
            if ($on) {
                // The event was bound programmatically.
                destructor = $on(eventType, callback);
            }
            else {
                // The event was bound before mount by Svelte.
                events.push([eventType, callback]);
            }
            return () => {
                destructor();
            };
        };
        function forward(e) {
            // Internally bubble the event up from Svelte components.
            bubble(component, e);
        }
        return (node) => {
            const destructors = [];
            const forwardDestructors = {};
            // This function is responsible for listening and forwarding
            // all bound events.
            $on = (fullEventType, callback) => {
                let eventType = fullEventType;
                let handler = callback;
                // DOM addEventListener options argument.
                let options = false;
                const modifierMatch = eventType.match(modifierRegex);
                if (modifierMatch) {
                    // Parse the event modifiers.
                    // Supported modifiers:
                    // - preventDefault
                    // - stopPropagation
                    // - passive
                    // - nonpassive
                    // - capture
                    // - once
                    const parts = eventType.split(MODIFIER_DIVIDER);
                    eventType = parts[0];
                    const eventOptions = Object.fromEntries(parts.slice(1).map((mod) => [mod, true]));
                    if (eventOptions.passive) {
                        options = options || {};
                        options.passive = true;
                    }
                    if (eventOptions.nonpassive) {
                        options = options || {};
                        options.passive = false;
                    }
                    if (eventOptions.capture) {
                        options = options || {};
                        options.capture = true;
                    }
                    if (eventOptions.once) {
                        options = options || {};
                        options.once = true;
                    }
                    if (eventOptions.preventDefault) {
                        handler = prevent_default(handler);
                    }
                    if (eventOptions.stopPropagation) {
                        handler = stop_propagation(handler);
                    }
                }
                // Listen for the event directly, with the given options.
                const off = listen(node, eventType, handler, options);
                const destructor = () => {
                    off();
                    const idx = destructors.indexOf(destructor);
                    if (idx > -1) {
                        destructors.splice(idx, 1);
                    }
                };
                destructors.push(destructor);
                // Forward the event from Svelte.
                if (!(eventType in forwardDestructors)) {
                    forwardDestructors[eventType] = listen(node, eventType, forward);
                }
                return destructor;
            };
            for (let i = 0; i < events.length; i++) {
                // Listen to all the events added before mount.
                $on(events[i][0], events[i][1]);
            }
            return {
                destroy: () => {
                    // Remove all event listeners.
                    for (let i = 0; i < destructors.length; i++) {
                        destructors[i]();
                    }
                    // Remove all event forwarders.
                    for (const entry of Object.entries(forwardDestructors)) {
                        entry[1]();
                    }
                }
            };
        };
    }

    function fade(node, { delay = 0, duration = 400, easing = identity } = {}) {
        const o = +getComputedStyle(node).opacity;
        return {
            delay,
            duration,
            easing,
            css: t => `opacity: ${t * o}`
        };
    }

    /** --------------------- */
    const key = {};
    function useSvelteUIThemeContext() {
        return getContext(key);
    }

    const subscriber_queue = [];
    /**
     * Create a `Writable` store that allows both updating and reading by subscription.
     * @param {*=}value initial value
     * @param {StartStopNotifier=}start start and stop notifications for subscriptions
     */
    function writable(value, start = noop) {
        let stop;
        const subscribers = new Set();
        function set(new_value) {
            if (safe_not_equal(value, new_value)) {
                value = new_value;
                if (stop) { // store is ready
                    const run_queue = !subscriber_queue.length;
                    for (const subscriber of subscribers) {
                        subscriber[1]();
                        subscriber_queue.push(subscriber, value);
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
            subscribers.add(subscriber);
            if (subscribers.size === 1) {
                stop = start(set) || noop;
            }
            run(value);
            return () => {
                subscribers.delete(subscriber);
                if (subscribers.size === 0) {
                    stop();
                    stop = null;
                }
            };
        }
        return { set, update, subscribe };
    }

    const colorScheme = writable('light');

    /* eslint-disable @typescript-eslint/ban-ts-comment */
    function useSvelteUITheme() {
        let observer;
        colorScheme?.subscribe((mode) => {
            observer = mode;
        });
        const DEFAULT_THEME = {
            // @ts-ignore
            ...theme$1,
            colorNames: colorNameMap,
            colorScheme: observer,
            dark: dark?.selector,
            fn: {
                themeColor: fns.themeColor,
                size: fns.size,
                radius: fns.radius,
                rgba: fns.rgba,
                variant: fns.variant
            }
        };
        return DEFAULT_THEME;
    }

    function themeColor(color, shade = 0) {
        const theme = useSvelteUIThemeContext()?.theme || useSvelteUITheme();
        let _shade = '50';
        if (!isSvelteUIColor(color))
            return color;
        if (shade !== Number(0))
            _shade = `${shade.toString()}00`;
        return theme.colors[`${color}${_shade}`]?.value;
    }
    function isSvelteUIColor(color) {
        let valid = false;
        switch (color) {
            case 'dark':
                valid = true;
                break;
            case 'gray':
                valid = true;
                break;
            case 'red':
                valid = true;
                break;
            case 'pink':
                valid = true;
                break;
            case 'grape':
                valid = true;
                break;
            case 'violet':
                valid = true;
                break;
            case 'indigo':
                valid = true;
                break;
            case 'blue':
                valid = true;
                break;
            case 'cyan':
                valid = true;
                break;
            case 'teal':
                valid = true;
                break;
            case 'green':
                valid = true;
                break;
            case 'lime':
                valid = true;
                break;
            case 'yellow':
                valid = true;
                break;
            case 'orange':
                valid = true;
                break;
            default:
                valid = false;
                break;
        }
        return valid;
    }

    function size$1(props) {
        if (typeof props.size === 'number') {
            return props.size;
        }
        if (typeof props.sizes[props.size] === 'number') {
            return props.sizes[props.size];
        }
        return +props.sizes[props.size]?.value || +props.sizes.md?.value;
    }

    function radius(radii) {
        const theme = useSvelteUIThemeContext()?.theme || useSvelteUITheme();
        if (typeof radii === 'number') {
            return radii;
        }
        return theme.radii[radii].value;
    }

    function isHexColor(hex) {
        const replaced = hex.replace('#', '');
        return (typeof replaced === 'string' && replaced.length === 6 && !Number.isNaN(Number(`0x${replaced}`)));
    }
    function hexToRgba(color) {
        const replaced = color.replace('#', '');
        const parsed = parseInt(replaced, 16);
        const r = (parsed >> 16) & 255;
        const g = (parsed >> 8) & 255;
        const b = parsed & 255;
        return {
            r,
            g,
            b,
            a: 1
        };
    }
    function rgbStringToRgba(color) {
        const [r, g, b, a] = color
            .replace(/[^0-9,.]/g, '')
            .split(',')
            .map(Number);
        return { r, g, b, a: a || 1 };
    }
    function toRgba(color) {
        if (isHexColor(color)) {
            return hexToRgba(color);
        }
        if (color.startsWith('rgb')) {
            return rgbStringToRgba(color);
        }
        return {
            r: 0,
            g: 0,
            b: 0,
            a: 1
        };
    }

    function rgba(color, alpha = 1) {
        if (typeof color !== 'string' || alpha > 1 || alpha < 0) {
            return 'rgba(0, 0, 0, 1)';
        }
        const { r, g, b } = toRgba(color);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }

    const DEFAULT_GRADIENT = {
        from: 'indigo',
        to: 'cyan',
        deg: 45
    };
    /**
     * THe Variant function is a function that takes a variant, optional color/gradient and returns the desired styles for four specific properties.
     *
     * Some styles will return tuples of strings where the first value is the dark version of the specific style, and the second value is the light version.
     *
     * @param VariantInput - an object that has a variant, color, and optional gradient property
     * @returns an object with border, background, color, and hover property styles based on the variant
     */
    function variant({ variant, color, gradient }) {
        const theme = useSvelteUIThemeContext()?.theme || useSvelteUITheme();
        const primaryShade = 6;
        if (variant === 'light') {
            return {
                border: 'transparent',
                background: [rgba(themeColor(color, 8), 0.35), rgba(themeColor(color, 0), 1)],
                color: [
                    color === 'dark' ? themeColor('dark', 0) : themeColor(color, 2),
                    color === 'dark' ? themeColor('dark', 9) : themeColor(color, primaryShade)
                ],
                // themeColor(color, theme.colorScheme === 'dark' ? 2 : getPrimaryShade('light')),
                hover: [rgba(themeColor(color, 7), 0.45), rgba(themeColor(color, 1), 0.65)]
            };
        }
        if (variant === 'default') {
            return {
                border: [themeColor('dark', 5), themeColor('gray', 4)],
                background: [themeColor('dark', 5), theme.colors.white.value],
                color: [theme.colors.white.value, theme.colors.black.value],
                hover: [themeColor('dark', 4), themeColor('gray', 0)]
            };
        }
        if (variant === 'white') {
            return {
                border: 'transparent',
                background: theme.colors.white.value,
                color: themeColor(color, primaryShade),
                hover: null
            };
        }
        if (variant === 'outline') {
            return {
                border: [themeColor(color, 4), themeColor(color, primaryShade)],
                background: 'transparent',
                color: [themeColor(color, 4), themeColor(color, primaryShade)],
                hover: [rgba(themeColor(color, 4), 0.05), rgba(themeColor(color, 0), 0.35)]
            };
        }
        if (variant === 'gradient') {
            const merged = {
                from: gradient?.from || DEFAULT_GRADIENT.from,
                to: gradient?.to || DEFAULT_GRADIENT.to,
                deg: gradient?.deg || DEFAULT_GRADIENT.deg
            };
            return {
                background: `linear-gradient(${merged.deg}deg, ${themeColor(merged.from, primaryShade)} 0%, ${themeColor(merged.to, primaryShade)} 100%)`,
                color: theme.colors.white.value,
                border: 'transparent',
                hover: null
            };
        }
        if (variant === 'subtle') {
            return {
                border: 'transparent',
                background: 'transparent',
                color: [
                    color === 'dark' ? themeColor('dark', 0) : themeColor(color, 2),
                    color === 'dark' ? themeColor('dark', 9) : themeColor(color, primaryShade)
                ],
                hover: [rgba(themeColor(color, 8), 0.35), rgba(themeColor(color, 0), 1)]
            };
        }
        return {
            border: 'transparent',
            background: [themeColor(color, 8), themeColor(color, primaryShade)],
            color: theme.colors.white.value,
            hover: themeColor(color, 7)
        };
    }

    const fns = {
        size: size$1,
        radius,
        themeColor,
        variant,
        rgba
    };

    const colors = {
        primary: '#228be6',
        white: '#ffffff',
        black: '#000000',
        dark50: '#C1C2C5',
        dark100: '#A6A7AB',
        dark200: '#909296',
        dark300: '#5c5f66',
        dark400: '#373A40',
        dark500: '#2C2E33',
        dark600: '#25262b',
        dark700: '#1A1B1E',
        dark800: '#141517',
        dark900: '#101113',
        gray50: '#f8f9fa',
        gray100: '#f1f3f5',
        gray200: '#e9ecef',
        gray300: '#dee2e6',
        gray400: '#ced4da',
        gray500: '#adb5bd',
        gray600: '#868e96',
        gray700: '#495057',
        gray800: '#343a40',
        gray900: '#212529',
        red50: '#fff5f5',
        red100: '#ffe3e3',
        red200: '#ffc9c9',
        red300: '#ffa8a8',
        red400: '#ff8787',
        red500: '#ff6b6b',
        red600: '#fa5252',
        red700: '#f03e3e',
        red800: '#e03131',
        red900: '#c92a2a',
        pink50: '#fff0f6',
        pink100: '#ffdeeb',
        pink200: '#fcc2d7',
        pink300: '#faa2c1',
        pink400: '#f783ac',
        pink500: '#f06595',
        pink600: '#e64980',
        pink700: '#d6336c',
        pink800: '#c2255c',
        pink900: '#a61e4d',
        grape50: '#f8f0fc',
        grape100: '#f3d9fa',
        grape200: '#eebefa',
        grape300: '#e599f7',
        grape400: '#da77f2',
        grape500: '#cc5de8',
        grape600: '#be4bdb',
        grape700: '#ae3ec9',
        grape800: '#9c36b5',
        grape900: '#862e9c',
        violet50: '#f3f0ff',
        violet100: '#e5dbff',
        violet200: '#d0bfff',
        violet300: '#b197fc',
        violet400: '#9775fa',
        violet500: '#845ef7',
        violet600: '#7950f2',
        violet700: '#7048e8',
        violet800: '#6741d9',
        violet900: '#5f3dc4',
        indigo50: '#edf2ff',
        indigo100: '#dbe4ff',
        indigo200: '#bac8ff',
        indigo300: '#91a7ff',
        indigo400: '#748ffc',
        indigo500: '#5c7cfa',
        indigo600: '#4c6ef5',
        indigo700: '#4263eb',
        indigo800: '#3b5bdb',
        indigo900: '#364fc7',
        blue50: '#e7f5ff',
        blue100: '#d0ebff',
        blue200: '#a5d8ff',
        blue300: '#74c0fc',
        blue400: '#4dabf7',
        blue500: '#339af0',
        blue600: '#228be6',
        blue700: '#1c7ed6',
        blue800: '#1971c2',
        blue900: '#1864ab',
        cyan50: '#e3fafc',
        cyan100: '#c5f6fa',
        cyan200: '#99e9f2',
        cyan300: '#66d9e8',
        cyan400: '#3bc9db',
        cyan500: '#22b8cf',
        cyan600: '#15aabf',
        cyan700: '#1098ad',
        cyan800: '#0c8599',
        cyan900: '#0b7285',
        teal50: '#e6fcf5',
        teal100: '#c3fae8',
        teal200: '#96f2d7',
        teal300: '#63e6be',
        teal400: '#38d9a9',
        teal500: '#20c997',
        teal600: '#12b886',
        teal700: '#0ca678',
        teal800: '#099268',
        teal900: '#087f5b',
        green50: '#ebfbee',
        green100: '#d3f9d8',
        green200: '#b2f2bb',
        green300: '#8ce99a',
        green400: '#69db7c',
        green500: '#51cf66',
        green600: '#40c057',
        green700: '#37b24d',
        green800: '#2f9e44',
        green900: '#2b8a3e',
        lime50: '#f4fce3',
        lime100: '#e9fac8',
        lime200: '#d8f5a2',
        lime300: '#c0eb75',
        lime400: '#a9e34b',
        lime500: '#94d82d',
        lime600: '#82c91e',
        lime700: '#74b816',
        lime800: '#66a80f',
        lime900: '#5c940d',
        yellow50: '#fff9db',
        yellow100: '#fff3bf',
        yellow200: '#ffec99',
        yellow300: '#ffe066',
        yellow400: '#ffd43b',
        yellow500: '#fcc419',
        yellow600: '#fab005',
        yellow700: '#f59f00',
        yellow800: '#f08c00',
        yellow900: '#e67700',
        orange50: '#fff4e6',
        orange100: '#ffe8cc',
        orange200: '#ffd8a8',
        orange300: '#ffc078',
        orange400: '#ffa94d',
        orange500: '#ff922b',
        orange600: '#fd7e14',
        orange700: '#f76707',
        orange800: '#e8590c',
        orange900: '#d9480f'
    };
    const colorNameMap = {
        blue: 'blue',
        cyan: 'cyan',
        dark: 'dark',
        grape: 'grape',
        gray: 'gray',
        green: 'green',
        indigo: 'indigo',
        lime: 'lime',
        orange: 'orange',
        pink: 'pink',
        red: 'red',
        teal: 'teal',
        violet: 'violet',
        yellow: 'yellow'
    };

    const hasOwn = {}.hasOwnProperty;
    function cx(...args) {
        const classes = [];
        for (let i = 0; i < args.length; i++) {
            const arg = args[i];
            if (!arg)
                continue;
            const argType = typeof arg;
            if (argType === 'string' || argType === 'number') {
                classes.push(arg);
            }
            else if (Array.isArray(arg)) {
                if (arg.length) {
                    const inner = { ...arg };
                    if (inner) {
                        classes.push(inner);
                    }
                }
            }
            else if (argType === 'object') {
                if (arg.toString === Object.prototype.toString) {
                    for (const key in arg) {
                        if (hasOwn.call(arg, key) && arg[key]) {
                            classes.push(key);
                        }
                    }
                }
                else {
                    classes.push(arg.toString());
                }
            }
        }
        return classes.join(' ');
    }
    function cssFactory() {
        // This is a factory function to allow for scalability
        return { cx };
    }

    function fromEntries(entries) {
        const o = {};
        Object.keys(entries).forEach((key) => {
            const [k, v] = entries[key];
            o[k] = v;
        });
        return o;
    }

    /* eslint-disable @typescript-eslint/no-unused-vars */
    function createRef(refName) {
        return `__svelteui-ref-${refName || ''}`;
    }
    function createSanitizedObject(object, theme, ref) {
        Object.keys(object).map((value) => {
            /** special key mapping */
            if (value === 'variants')
                return;
            if ('ref' in object[value])
                object[value].ref;
            if ('darkMode' in object[value]) {
                object[value][`${theme.dark} &`] = object[value].darkMode;
            }
            /** general key mapping */
            object[`& .${value}`] = object[value];
            /** remove the old keys as they are not needed */
            delete object[value];
        });
        /** delete the root property as it is not needed */
        delete object['& .root'];
    }
    /**
     * custom made css-in-js styling function that is highly customizable and has many features
     *
     * allows you to subscribe to the current theme context
     *
     * @param getCssObjectOrCssObject - either an object of styles or a function that returns an object of styles
     * @returns
     */
    function createStyles(input) {
        const getCssObject = typeof input === 'function' ? input : () => input;
        function useStyles(params = {}, options) {
            /** create our new theme object */
            const theme = useSvelteUIThemeContext()?.theme || useSvelteUITheme();
            const { cx } = cssFactory();
            const { override } = options || {};
            let ref;
            /** store the created dirty object in a variable */
            const cssObjectDirty = getCssObject(theme, params, createRef);
            /** clone the dirty object to modify it's properties */
            const sanitizeObject = Object.assign({}, cssObjectDirty);
            /** takes all keys and maps them to the proper string values */
            createSanitizedObject(sanitizeObject, theme);
            const { root } = cssObjectDirty;
            /** create our clean object that will get passed to the css function */
            const cssObjectClean = root !== undefined ? { ...root, ...sanitizeObject } : cssObjectDirty;
            const getStyles = css(cssObjectClean);
            /** transform keys from dirty object into strings to be consumed by classes */
            const classes = fromEntries(Object.keys(cssObjectDirty).map((keys) => {
                const getRefName = ref?.split('-') ?? [];
                ref?.split('-')[getRefName?.length - 1] === keys;
                let value = keys.toString();
                if (keys === 'root') {
                    /** generate our styles */
                    value = getStyles({ css: override }).toString();
                }
                return [keys, value];
            }));
            return {
                cx,
                theme,
                classes,
                getStyles: css(cssObjectClean)
            };
        }
        return useStyles;
    }

    var t="colors",n="sizes",r="space",i={gap:r,gridGap:r,columnGap:r,gridColumnGap:r,rowGap:r,gridRowGap:r,inset:r,insetBlock:r,insetBlockEnd:r,insetBlockStart:r,insetInline:r,insetInlineEnd:r,insetInlineStart:r,margin:r,marginTop:r,marginRight:r,marginBottom:r,marginLeft:r,marginBlock:r,marginBlockEnd:r,marginBlockStart:r,marginInline:r,marginInlineEnd:r,marginInlineStart:r,padding:r,paddingTop:r,paddingRight:r,paddingBottom:r,paddingLeft:r,paddingBlock:r,paddingBlockEnd:r,paddingBlockStart:r,paddingInline:r,paddingInlineEnd:r,paddingInlineStart:r,top:r,right:r,bottom:r,left:r,scrollMargin:r,scrollMarginTop:r,scrollMarginRight:r,scrollMarginBottom:r,scrollMarginLeft:r,scrollMarginX:r,scrollMarginY:r,scrollMarginBlock:r,scrollMarginBlockEnd:r,scrollMarginBlockStart:r,scrollMarginInline:r,scrollMarginInlineEnd:r,scrollMarginInlineStart:r,scrollPadding:r,scrollPaddingTop:r,scrollPaddingRight:r,scrollPaddingBottom:r,scrollPaddingLeft:r,scrollPaddingX:r,scrollPaddingY:r,scrollPaddingBlock:r,scrollPaddingBlockEnd:r,scrollPaddingBlockStart:r,scrollPaddingInline:r,scrollPaddingInlineEnd:r,scrollPaddingInlineStart:r,fontSize:"fontSizes",background:t,backgroundColor:t,backgroundImage:t,borderImage:t,border:t,borderBlock:t,borderBlockEnd:t,borderBlockStart:t,borderBottom:t,borderBottomColor:t,borderColor:t,borderInline:t,borderInlineEnd:t,borderInlineStart:t,borderLeft:t,borderLeftColor:t,borderRight:t,borderRightColor:t,borderTop:t,borderTopColor:t,caretColor:t,color:t,columnRuleColor:t,fill:t,outline:t,outlineColor:t,stroke:t,textDecorationColor:t,fontFamily:"fonts",fontWeight:"fontWeights",lineHeight:"lineHeights",letterSpacing:"letterSpacings",blockSize:n,minBlockSize:n,maxBlockSize:n,inlineSize:n,minInlineSize:n,maxInlineSize:n,width:n,minWidth:n,maxWidth:n,height:n,minHeight:n,maxHeight:n,flexBasis:n,gridTemplateColumns:n,gridTemplateRows:n,borderWidth:"borderWidths",borderTopWidth:"borderWidths",borderRightWidth:"borderWidths",borderBottomWidth:"borderWidths",borderLeftWidth:"borderWidths",borderStyle:"borderStyles",borderTopStyle:"borderStyles",borderRightStyle:"borderStyles",borderBottomStyle:"borderStyles",borderLeftStyle:"borderStyles",borderRadius:"radii",borderTopLeftRadius:"radii",borderTopRightRadius:"radii",borderBottomRightRadius:"radii",borderBottomLeftRadius:"radii",boxShadow:"shadows",textShadow:"shadows",transition:"transitions",zIndex:"zIndices"},o=(e,t)=>"function"==typeof t?{"()":Function.prototype.toString.call(t)}:t,l=()=>{const e=Object.create(null);return (t,n,...r)=>{const i=(e=>JSON.stringify(e,o))(t);return i in e?e[i]:e[i]=n(t,...r)}},s=Symbol.for("sxs.internal"),a=(e,t)=>Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)),c=e=>{for(const t in e)return !0;return !1},{hasOwnProperty:d}=Object.prototype,g=e=>e.includes("-")?e:e.replace(/[A-Z]/g,(e=>"-"+e.toLowerCase())),p=/\s+(?![^()]*\))/,u=e=>t=>e(..."string"==typeof t?String(t).split(p):[t]),h={appearance:e=>({WebkitAppearance:e,appearance:e}),backfaceVisibility:e=>({WebkitBackfaceVisibility:e,backfaceVisibility:e}),backdropFilter:e=>({WebkitBackdropFilter:e,backdropFilter:e}),backgroundClip:e=>({WebkitBackgroundClip:e,backgroundClip:e}),boxDecorationBreak:e=>({WebkitBoxDecorationBreak:e,boxDecorationBreak:e}),clipPath:e=>({WebkitClipPath:e,clipPath:e}),content:e=>({content:e.includes('"')||e.includes("'")||/^([A-Za-z]+\([^]*|[^]*-quote|inherit|initial|none|normal|revert|unset)$/.test(e)?e:`"${e}"`}),hyphens:e=>({WebkitHyphens:e,hyphens:e}),maskImage:e=>({WebkitMaskImage:e,maskImage:e}),maskSize:e=>({WebkitMaskSize:e,maskSize:e}),tabSize:e=>({MozTabSize:e,tabSize:e}),textSizeAdjust:e=>({WebkitTextSizeAdjust:e,textSizeAdjust:e}),userSelect:e=>({WebkitUserSelect:e,userSelect:e}),marginBlock:u(((e,t)=>({marginBlockStart:e,marginBlockEnd:t||e}))),marginInline:u(((e,t)=>({marginInlineStart:e,marginInlineEnd:t||e}))),maxSize:u(((e,t)=>({maxBlockSize:e,maxInlineSize:t||e}))),minSize:u(((e,t)=>({minBlockSize:e,minInlineSize:t||e}))),paddingBlock:u(((e,t)=>({paddingBlockStart:e,paddingBlockEnd:t||e}))),paddingInline:u(((e,t)=>({paddingInlineStart:e,paddingInlineEnd:t||e})))},f=/([\d.]+)([^]*)/,m=(e,t)=>e.length?e.reduce(((e,n)=>(e.push(...t.map((e=>e.includes("&")?e.replace(/&/g,/[ +>|~]/.test(n)&&/&.*&/.test(e)?`:is(${n})`:n):n+" "+e))),e)),[]):t,b=(e,t)=>e in S&&"string"==typeof t?t.replace(/^((?:[^]*[^\w-])?)(fit-content|stretch)((?:[^\w-][^]*)?)$/,((t,n,r,i)=>n+("stretch"===r?`-moz-available${i};${g(e)}:${n}-webkit-fill-available`:`-moz-fit-content${i};${g(e)}:${n}fit-content`)+i)):String(t),S={blockSize:1,height:1,inlineSize:1,maxBlockSize:1,maxHeight:1,maxInlineSize:1,maxWidth:1,minBlockSize:1,minHeight:1,minInlineSize:1,minWidth:1,width:1},k=e=>e?e+"-":"",y=(e,t,n)=>e.replace(/([+-])?((?:\d+(?:\.\d*)?|\.\d+)(?:[Ee][+-]?\d+)?)?(\$|--)([$\w-]+)/g,((e,r,i,o,l)=>"$"==o==!!i?e:(r||"--"==o?"calc(":"")+"var(--"+("$"===o?k(t)+(l.includes("$")?"":k(n))+l.replace(/\$/g,"-"):l)+")"+(r||"--"==o?"*"+(r||"")+(i||"1")+")":""))),B=/\s*,\s*(?![^()]*\))/,$=Object.prototype.toString,x=(e,t,n,r,i)=>{let o,l,s;const a=(e,t,n)=>{let c,d;const p=e=>{for(c in e){const x=64===c.charCodeAt(0),z=x&&Array.isArray(e[c])?e[c]:[e[c]];for(d of z){const e=/[A-Z]/.test(S=c)?S:S.replace(/-[^]/g,(e=>e[1].toUpperCase())),z="object"==typeof d&&d&&d.toString===$&&(!r.utils[e]||!t.length);if(e in r.utils&&!z){const t=r.utils[e];if(t!==l){l=t,p(t(d)),l=null;continue}}else if(e in h){const t=h[e];if(t!==s){s=t,p(t(d)),s=null;continue}}if(x&&(u=c.slice(1)in r.media?"@media "+r.media[c.slice(1)]:c,c=u.replace(/\(\s*([\w-]+)\s*(=|<|<=|>|>=)\s*([\w-]+)\s*(?:(<|<=|>|>=)\s*([\w-]+)\s*)?\)/g,((e,t,n,r,i,o)=>{const l=f.test(t),s=.0625*(l?-1:1),[a,c]=l?[r,t]:[t,r];return "("+("="===n[0]?"":">"===n[0]===l?"max-":"min-")+a+":"+("="!==n[0]&&1===n.length?c.replace(f,((e,t,r)=>Number(t)+s*(">"===n?1:-1)+r)):c)+(i?") and ("+(">"===i[0]?"min-":"max-")+a+":"+(1===i.length?o.replace(f,((e,t,n)=>Number(t)+s*(">"===i?-1:1)+n)):o):"")+")"}))),z){const e=x?n.concat(c):[...n],r=x?[...t]:m(t,c.split(B));void 0!==o&&i(I(...o)),o=void 0,a(d,r,e);}else void 0===o&&(o=[[],t,n]),c=x||36!==c.charCodeAt(0)?c:`--${k(r.prefix)}${c.slice(1).replace(/\$/g,"-")}`,d=z?d:"number"==typeof d?d&&e in R?String(d)+"px":String(d):y(b(e,null==d?"":d),r.prefix,r.themeMap[e]),o[0].push(`${x?`${c} `:`${g(c)}:`}${d}`);}}var u,S;};p(e),void 0!==o&&i(I(...o)),o=void 0;};a(e,t,n);},I=(e,t,n)=>`${n.map((e=>`${e}{`)).join("")}${t.length?`${t.join(",")}{`:""}${e.join(";")}${t.length?"}":""}${Array(n.length?n.length+1:0).join("}")}`,R={animationDelay:1,animationDuration:1,backgroundSize:1,blockSize:1,border:1,borderBlock:1,borderBlockEnd:1,borderBlockEndWidth:1,borderBlockStart:1,borderBlockStartWidth:1,borderBlockWidth:1,borderBottom:1,borderBottomLeftRadius:1,borderBottomRightRadius:1,borderBottomWidth:1,borderEndEndRadius:1,borderEndStartRadius:1,borderInlineEnd:1,borderInlineEndWidth:1,borderInlineStart:1,borderInlineStartWidth:1,borderInlineWidth:1,borderLeft:1,borderLeftWidth:1,borderRadius:1,borderRight:1,borderRightWidth:1,borderSpacing:1,borderStartEndRadius:1,borderStartStartRadius:1,borderTop:1,borderTopLeftRadius:1,borderTopRightRadius:1,borderTopWidth:1,borderWidth:1,bottom:1,columnGap:1,columnRule:1,columnRuleWidth:1,columnWidth:1,containIntrinsicSize:1,flexBasis:1,fontSize:1,gap:1,gridAutoColumns:1,gridAutoRows:1,gridTemplateColumns:1,gridTemplateRows:1,height:1,inlineSize:1,inset:1,insetBlock:1,insetBlockEnd:1,insetBlockStart:1,insetInline:1,insetInlineEnd:1,insetInlineStart:1,left:1,letterSpacing:1,margin:1,marginBlock:1,marginBlockEnd:1,marginBlockStart:1,marginBottom:1,marginInline:1,marginInlineEnd:1,marginInlineStart:1,marginLeft:1,marginRight:1,marginTop:1,maxBlockSize:1,maxHeight:1,maxInlineSize:1,maxWidth:1,minBlockSize:1,minHeight:1,minInlineSize:1,minWidth:1,offsetDistance:1,offsetRotate:1,outline:1,outlineOffset:1,outlineWidth:1,overflowClipMargin:1,padding:1,paddingBlock:1,paddingBlockEnd:1,paddingBlockStart:1,paddingBottom:1,paddingInline:1,paddingInlineEnd:1,paddingInlineStart:1,paddingLeft:1,paddingRight:1,paddingTop:1,perspective:1,right:1,rowGap:1,scrollMargin:1,scrollMarginBlock:1,scrollMarginBlockEnd:1,scrollMarginBlockStart:1,scrollMarginBottom:1,scrollMarginInline:1,scrollMarginInlineEnd:1,scrollMarginInlineStart:1,scrollMarginLeft:1,scrollMarginRight:1,scrollMarginTop:1,scrollPadding:1,scrollPaddingBlock:1,scrollPaddingBlockEnd:1,scrollPaddingBlockStart:1,scrollPaddingBottom:1,scrollPaddingInline:1,scrollPaddingInlineEnd:1,scrollPaddingInlineStart:1,scrollPaddingLeft:1,scrollPaddingRight:1,scrollPaddingTop:1,shapeMargin:1,textDecoration:1,textDecorationThickness:1,textIndent:1,textUnderlineOffset:1,top:1,transitionDelay:1,transitionDuration:1,verticalAlign:1,width:1,wordSpacing:1},z=e=>String.fromCharCode(e+(e>25?39:97)),W=e=>(e=>{let t,n="";for(t=Math.abs(e);t>52;t=t/52|0)n=z(t%52)+n;return z(t%52)+n})(((e,t)=>{let n=t.length;for(;n;)e=33*e^t.charCodeAt(--n);return e})(5381,JSON.stringify(e))>>>0),j=["themed","global","styled","onevar","resonevar","allvar","inline"],E=e=>{if(e.href&&!e.href.startsWith(location.origin))return !1;try{return !!e.cssRules}catch(e){return !1}},T=e=>{let t;const n=()=>{const{cssRules:e}=t.sheet;return [].map.call(e,((n,r)=>{const{cssText:i}=n;let o="";if(i.startsWith("--sxs"))return "";if(e[r-1]&&(o=e[r-1].cssText).startsWith("--sxs")){if(!n.cssRules.length)return "";for(const e in t.rules)if(t.rules[e].group===n)return `--sxs{--sxs:${[...t.rules[e].cache].join(" ")}}${i}`;return n.cssRules.length?`${o}${i}`:""}return i})).join("")},r=()=>{if(t){const{rules:e,sheet:n}=t;if(!n.deleteRule){for(;3===Object(Object(n.cssRules)[0]).type;)n.cssRules.splice(0,1);n.cssRules=[];}for(const t in e)delete e[t];}const i=Object(e).styleSheets||[];for(const e of i)if(E(e)){for(let i=0,o=e.cssRules;o[i];++i){const l=Object(o[i]);if(1!==l.type)continue;const s=Object(o[i+1]);if(4!==s.type)continue;++i;const{cssText:a}=l;if(!a.startsWith("--sxs"))continue;const c=a.slice(14,-3).trim().split(/\s+/),d=j[c[0]];d&&(t||(t={sheet:e,reset:r,rules:{},toString:n}),t.rules[d]={group:s,index:i,cache:new Set(c)});}if(t)break}if(!t){const i=(e,t)=>({type:t,cssRules:[],insertRule(e,t){this.cssRules.splice(t,0,i(e,{import:3,undefined:1}[(e.toLowerCase().match(/^@([a-z]+)/)||[])[1]]||4));},get cssText(){return "@media{}"===e?`@media{${[].map.call(this.cssRules,(e=>e.cssText)).join("")}}`:e}});t={sheet:e?(e.head||e).appendChild(document.createElement("style")).sheet:i("","text/css"),rules:{},reset:r,toString:n};}const{sheet:o,rules:l}=t;for(let e=j.length-1;e>=0;--e){const t=j[e];if(!l[t]){const n=j[e+1],r=l[n]?l[n].index:o.cssRules.length;o.insertRule("@media{}",r),o.insertRule(`--sxs{--sxs:${e}}`,r),l[t]={group:o.cssRules[r+1],index:r,cache:new Set([e])};}v(l[t]);}};return r(),t},v=e=>{const t=e.group;let n=t.cssRules.length;e.apply=e=>{try{t.insertRule(e,n),++n;}catch(e){}};},M=Symbol(),w=l(),C=(e,t)=>w(e,(()=>(...n)=>{let r={type:null,composers:new Set};for(const t of n)if(null!=t)if(t[s]){null==r.type&&(r.type=t[s].type);for(const e of t[s].composers)r.composers.add(e);}else t.constructor!==Object||t.$$typeof?null==r.type&&(r.type=t):r.composers.add(P(t,e));return null==r.type&&(r.type="span"),r.composers.size||r.composers.add(["PJLV",{},[],[],{},[]]),L(e,r,t)})),P=({variants:e,compoundVariants:t,defaultVariants:n,...r},i)=>{const o=`${k(i.prefix)}c-${W(r)}`,l=[],s=[],a=Object.create(null),g=[];for(const e in n)a[e]=String(n[e]);if("object"==typeof e&&e)for(const t in e){p=a,u=t,d.call(p,u)||(a[t]="undefined");const n=e[t];for(const e in n){const r={[t]:String(e)};"undefined"===String(e)&&g.push(t);const i=n[e],o=[r,i,!c(i)];l.push(o);}}var p,u;if("object"==typeof t&&t)for(const e of t){let{css:t,...n}=e;t="object"==typeof t&&t||{};for(const e in n)n[e]=String(n[e]);const r=[n,t,!c(t)];s.push(r);}return [o,r,l,s,a,g]},L=(e,t,n)=>{const[r,i,o,l]=O(t.composers),c="function"==typeof t.type||t.type.$$typeof?(e=>{function t(){for(let n=0;n<t[M].length;n++){const[r,i]=t[M][n];e.rules[r].apply(i);}return t[M]=[],null}return t[M]=[],t.rules={},j.forEach((e=>t.rules[e]={apply:n=>t[M].push([e,n])})),t})(n):null,d=(c||n).rules,g=`.${r}${i.length>1?`:where(.${i.slice(1).join(".")})`:""}`,p=s=>{s="object"==typeof s&&s||D;const{css:a,...p}=s,u={};for(const e in o)if(delete p[e],e in s){let t=s[e];"object"==typeof t&&t?u[e]={"@initial":o[e],...t}:(t=String(t),u[e]="undefined"!==t||l.has(e)?t:o[e]);}else u[e]=o[e];const h=new Set([...i]);for(const[r,i,o,l]of t.composers){n.rules.styled.cache.has(r)||(n.rules.styled.cache.add(r),x(i,[`.${r}`],[],e,(e=>{d.styled.apply(e);})));const t=A(o,u,e.media),s=A(l,u,e.media,!0);for(const i of t)if(void 0!==i)for(const[t,o,l]of i){const i=`${r}-${W(o)}-${t}`;h.add(i);const s=(l?n.rules.resonevar:n.rules.onevar).cache,a=l?d.resonevar:d.onevar;s.has(i)||(s.add(i),x(o,[`.${i}`],[],e,(e=>{a.apply(e);})));}for(const t of s)if(void 0!==t)for(const[i,o]of t){const t=`${r}-${W(o)}-${i}`;h.add(t),n.rules.allvar.cache.has(t)||(n.rules.allvar.cache.add(t),x(o,[`.${t}`],[],e,(e=>{d.allvar.apply(e);})));}}if("object"==typeof a&&a){const t=`${r}-i${W(a)}-css`;h.add(t),n.rules.inline.cache.has(t)||(n.rules.inline.cache.add(t),x(a,[`.${t}`],[],e,(e=>{d.inline.apply(e);})));}for(const e of String(s.className||"").trim().split(/\s+/))e&&h.add(e);const f=p.className=[...h].join(" ");return {type:t.type,className:f,selector:g,props:p,toString:()=>f,deferredInjector:c}};return a(p,{className:r,selector:g,[s]:t,toString:()=>(n.rules.styled.cache.has(r)||p(),r)})},O=e=>{let t="";const n=[],r={},i=[];for(const[o,,,,l,s]of e){""===t&&(t=o),n.push(o),i.push(...s);for(const e in l){const t=l[e];(void 0===r[e]||"undefined"!==t||s.includes(t))&&(r[e]=t);}}return [t,n,r,new Set(i)]},A=(e,t,n,r)=>{const i=[];e:for(let[o,l,s]of e){if(s)continue;let e,a=0,c=!1;for(e in o){const r=o[e];let i=t[e];if(i!==r){if("object"!=typeof i||!i)continue e;{let e,t,o=0;for(const l in i){if(r===String(i[l])){if("@initial"!==l){const e=l.slice(1);(t=t||[]).push(e in n?n[e]:l.replace(/^@media ?/,"")),c=!0;}a+=o,e=!0;}++o;}if(t&&t.length&&(l={["@media "+t.join(", ")]:l}),!e)continue e}}}(i[a]=i[a]||[]).push([r?"cv":`${e}-${o[e]}`,l,c]);}return i},D={},H=l(),N=(e,t)=>H(e,(()=>(...n)=>{const r=()=>{for(let r of n){r="object"==typeof r&&r||{};let n=W(r);if(!t.rules.global.cache.has(n)){if(t.rules.global.cache.add(n),"@import"in r){let e=[].indexOf.call(t.sheet.cssRules,t.rules.themed.group)-1;for(let n of [].concat(r["@import"]))n=n.includes('"')||n.includes("'")?n:`"${n}"`,t.sheet.insertRule(`@import ${n};`,e++);delete r["@import"];}x(r,[],[],e,(e=>{t.rules.global.apply(e);}));}}return ""};return a(r,{toString:r})})),V=l(),G=(e,t)=>V(e,(()=>n=>{const r=`${k(e.prefix)}k-${W(n)}`,i=()=>{if(!t.rules.global.cache.has(r)){t.rules.global.cache.add(r);const i=[];x(n,[],[],e,(e=>i.push(e)));const o=`@keyframes ${r}{${i.join("")}}`;t.rules.global.apply(o);}return r};return a(i,{get name(){return i()},toString:i})})),F=class{constructor(e,t,n,r){this.token=null==e?"":String(e),this.value=null==t?"":String(t),this.scale=null==n?"":String(n),this.prefix=null==r?"":String(r);}get computedValue(){return "var("+this.variable+")"}get variable(){return "--"+k(this.prefix)+k(this.scale)+this.token}toString(){return this.computedValue}},J=l(),U=(e,t)=>J(e,(()=>(n,r)=>{r="object"==typeof n&&n||Object(r);const i=`.${n=(n="string"==typeof n?n:"")||`${k(e.prefix)}t-${W(r)}`}`,o={},l=[];for(const t in r){o[t]={};for(const n in r[t]){const i=`--${k(e.prefix)}${t}-${n}`,s=y(String(r[t][n]),e.prefix,t);o[t][n]=new F(n,s,t,e.prefix),l.push(`${i}:${s}`);}}const s=()=>{if(l.length&&!t.rules.themed.cache.has(n)){t.rules.themed.cache.add(n);const i=`${r===e.theme?":root,":""}.${n}{${l.join(";")}}`;t.rules.themed.apply(i);}return n};return {...o,get className(){return s()},selector:i,toString:s}})),Z=l(),X=e=>{let t=!1;const n=Z(e,(e=>{t=!0;const n="prefix"in(e="object"==typeof e&&e||{})?String(e.prefix):"",r="object"==typeof e.media&&e.media||{},o="object"==typeof e.root?e.root||null:globalThis.document||null,l="object"==typeof e.theme&&e.theme||{},s={prefix:n,media:r,theme:l,themeMap:"object"==typeof e.themeMap&&e.themeMap||{...i},utils:"object"==typeof e.utils&&e.utils||{}},a=T(o),c={css:C(s,a),globalCss:N(s,a),keyframes:G(s,a),createTheme:U(s,a),reset(){a.reset(),c.theme.toString();},theme:{},sheet:a,config:s,prefix:n,getCssText:a.toString,toString:a.toString};return String(c.theme=c.createTheme(l)),c}));return t||n.reset(),n};//# sourceMappingUrl=index.map

    const { css, globalCss, keyframes, getCssText, theme: theme$1, createTheme, config, reset } = X({
        prefix: 'svelteui',
        theme: {
            colors,
            space: {
                0: '0rem',
                xs: 10,
                sm: 12,
                md: 16,
                lg: 20,
                xl: 24,
                xsPX: '10px',
                smPX: '12px',
                mdPX: '16px',
                lgPX: '20px',
                xlPX: '24px',
                1: '0.125rem',
                2: '0.25rem',
                3: '0.375rem',
                4: '0.5rem',
                5: '0.625rem',
                6: '0.75rem',
                7: '0.875rem',
                8: '1rem',
                9: '1.25rem',
                10: '1.5rem',
                11: '1.75rem',
                12: '2rem',
                13: '2.25rem',
                14: '2.5rem',
                15: '2.75rem',
                16: '3rem',
                17: '3.5rem',
                18: '4rem',
                20: '5rem',
                24: '6rem',
                28: '7rem',
                32: '8rem',
                36: '9rem',
                40: '10rem',
                44: '11rem',
                48: '12rem',
                52: '13rem',
                56: '14rem',
                60: '15rem',
                64: '16rem',
                72: '18rem',
                80: '20rem',
                96: '24rem'
            },
            fontSizes: {
                xs: '12px',
                sm: '14px',
                md: '16px',
                lg: '18px',
                xl: '20px'
            },
            fonts: {
                standard: '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji',
                mono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace',
                fallback: 'Segoe UI, system-ui, sans-serif'
            },
            fontWeights: {
                thin: 100,
                extralight: 200,
                light: 300,
                normal: 400,
                medium: 500,
                semibold: 600,
                bold: 700,
                extrabold: 800
            },
            lineHeights: {
                xs: 1,
                sm: 1.25,
                md: 1.5,
                lg: 1.625,
                xl: 1.75
            },
            letterSpacings: {
                tighter: '-0.05em',
                tight: '-0.025em',
                normal: '0',
                wide: '0.025em',
                wider: '0.05em',
                widest: '0.1em'
            },
            sizes: {},
            radii: {
                xs: '2px',
                sm: '4px',
                md: '8px',
                lg: '16px',
                xl: '32px',
                squared: '33%',
                rounded: '50%',
                pill: '9999px'
            },
            shadows: {
                xs: '0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.1)',
                sm: '0 1px 3px rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0px 10px 15px -5px, rgba(0, 0, 0, 0.04) 0px 7px 7px -5px',
                md: '0 1px 3px rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px',
                lg: '0 1px 3px rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0px 28px 23px -7px, rgba(0, 0, 0, 0.04) 0px 12px 12px -7px',
                xl: '0 1px 3px rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0px 36px 28px -7px, rgba(0, 0, 0, 0.04) 0px 17px 17px -7px'
            },
            zIndices: {
                1: '100',
                2: '200',
                3: '300',
                4: '400',
                5: '500',
                10: '1000',
                max: '9999'
            },
            borderWidths: {
                light: '1px',
                normal: '2px',
                bold: '3px',
                extrabold: '4px',
                black: '5px',
                xs: '1px',
                sm: '2px',
                md: '3px',
                lg: '4px',
                xl: '5px'
            },
            breakpoints: {
                xs: 576,
                sm: 768,
                md: 992,
                lg: 1200,
                xl: 1400
            },
            borderStyles: {},
            transitions: {}
        },
        media: {
            xs: '(min-width: 576px)',
            sm: '(min-width: 768px)',
            md: '(min-width: 992px)',
            lg: '(min-width: 1200px)',
            xl: '(min-width: 1400px)'
        },
        utils: {
            focusRing: (value) => ({
                WebkitTapHighlightColor: 'transparent',
                '&:focus': {
                    outlineOffset: 2,
                    outline: value === 'always' || value === 'auto' ? '2px solid $primary' : 'none'
                },
                '&:focus:not(:focus-visible)': {
                    outline: value === 'auto' || value === 'never' ? 'none' : undefined
                }
            }),
            /** padding top */
            p: (value) => ({
                padding: value
            }),
            pt: (value) => ({
                paddingTop: value
            }),
            pr: (value) => ({
                paddingRight: value
            }),
            pb: (value) => ({
                paddingBottom: value
            }),
            pl: (value) => ({
                paddingLeft: value
            }),
            px: (value) => ({
                paddingLeft: value,
                paddingRight: value
            }),
            py: (value) => ({
                paddingTop: value,
                paddingBottom: value
            }),
            /** margin */
            m: (value) => ({
                margin: value
            }),
            /** margin-top */
            mt: (value) => ({
                marginTop: value
            }),
            mr: (value) => ({
                marginRight: value
            }),
            mb: (value) => ({
                marginBottom: value
            }),
            ml: (value) => ({
                marginLeft: value
            }),
            mx: (value) => ({
                marginLeft: value,
                marginRight: value
            }),
            my: (value) => ({
                marginTop: value,
                marginBottom: value
            }),
            ta: (value) => ({
                textAlign: value
            }),
            tt: (value) => ({
                textTransform: value
            }),
            to: (value) => ({
                textOverflow: value
            }),
            d: (value) => ({ display: value }),
            dflex: (value) => ({
                display: 'flex',
                alignItems: value,
                justifyContent: value
            }),
            fd: (value) => ({
                flexDirection: value
            }),
            fw: (value) => ({ flexWrap: value }),
            ai: (value) => ({
                alignItems: value
            }),
            ac: (value) => ({
                alignContent: value
            }),
            jc: (value) => ({
                justifyContent: value
            }),
            as: (value) => ({
                alignSelf: value
            }),
            fg: (value) => ({ flexGrow: value }),
            fs: (value) => ({
                fontSize: value
            }),
            fb: (value) => ({
                flexBasis: value
            }),
            bc: (value) => ({
                backgroundColor: value
            }),
            bf: (value) => ({
                backdropFilter: value
            }),
            bg: (value) => ({
                background: value
            }),
            bgBlur: (value) => ({
                bf: 'saturate(180%) blur(10px)',
                bg: value
            }),
            bgColor: (value) => ({
                backgroundColor: value
            }),
            backgroundClip: (value) => ({
                WebkitBackgroundClip: value,
                backgroundClip: value
            }),
            bgClip: (value) => ({
                WebkitBackgroundClip: value,
                backgroundClip: value
            }),
            br: (value) => ({
                borderRadius: value
            }),
            bw: (value) => ({
                borderWidth: value
            }),
            btrr: (value) => ({
                borderTopRightRadius: value
            }),
            bbrr: (value) => ({
                borderBottomRightRadius: value
            }),
            bblr: (value) => ({
                borderBottomLeftRadius: value
            }),
            btlr: (value) => ({
                borderTopLeftRadius: value
            }),
            bs: (value) => ({
                boxShadow: value
            }),
            normalShadow: (value) => ({
                boxShadow: `0 4px 14px 0 $${value}`
            }),
            lh: (value) => ({
                lineHeight: value
            }),
            ov: (value) => ({ overflow: value }),
            ox: (value) => ({
                overflowX: value
            }),
            oy: (value) => ({
                overflowY: value
            }),
            pe: (value) => ({
                pointerEvents: value
            }),
            events: (value) => ({
                pointerEvents: value
            }),
            us: (value) => ({
                WebkitUserSelect: value,
                userSelect: value
            }),
            userSelect: (value) => ({
                WebkitUserSelect: value,
                userSelect: value
            }),
            w: (value) => ({ width: value }),
            h: (value) => ({
                height: value
            }),
            minW: (value) => ({
                minWidth: value
            }),
            minH: (value) => ({
                minWidth: value
            }),
            mw: (value) => ({
                maxWidth: value
            }),
            maxW: (value) => ({
                maxWidth: value
            }),
            mh: (value) => ({
                maxHeight: value
            }),
            maxH: (value) => ({
                maxHeight: value
            }),
            size: (value) => ({
                width: value,
                height: value
            }),
            minSize: (value) => ({
                minWidth: value,
                minHeight: value,
                width: value,
                height: value
            }),
            sizeMin: (value) => ({
                minWidth: value,
                minHeight: value,
                width: value,
                height: value
            }),
            maxSize: (value) => ({
                maxWidth: value,
                maxHeight: value
            }),
            sizeMax: (value) => ({
                maxWidth: value,
                maxHeight: value
            }),
            appearance: (value) => ({
                WebkitAppearance: value,
                appearance: value
            }),
            scale: (value) => ({
                transform: `scale(${value})`
            }),
            linearGradient: (value) => ({
                backgroundImage: `linear-gradient(${value})`
            }),
            tdl: (value) => ({
                textDecorationLine: value
            }),
            // Text gradient effect
            textGradient: (value) => ({
                backgroundImage: `linear-gradient(${value})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
            })
        },
        themeMap: {
            ...i,
            width: 'space',
            height: 'space',
            minWidth: 'space',
            maxWidth: 'space',
            minHeight: 'space',
            maxHeight: 'space',
            flexBasis: 'space',
            gridTemplateColumns: 'space',
            gridTemplateRows: 'space',
            blockSize: 'space',
            minBlockSize: 'space',
            maxBlockSize: 'space',
            inlineSize: 'space',
            minInlineSize: 'space',
            maxInlineSize: 'space',
            borderWidth: 'borderWeights'
        }
    });
    /** Function for dark theme */
    const dark = createTheme('dark-theme', {
        colors,
        shadows: {
            xs: '-4px 0 15px rgb(0 0 0 / 50%)',
            sm: '0 5px 20px -5px rgba(20, 20, 20, 0.1)',
            md: '0 8px 30px rgba(20, 20, 20, 0.15)',
            lg: '0 30px 60px rgba(20, 20, 20, 0.15)',
            xl: '0 40px 80px rgba(20, 20, 20, 0.25)'
        }
    });
    /** Global styles for SvelteUI */
    globalCss({
        a: {
            focusRing: 'auto'
        },
        body: {
            [`${dark.selector} &`]: {
                backgroundColor: '$dark700',
                color: '$dark50'
            },
            backgroundColor: '$white',
            color: '$black'
        }
    });
    /** Normalize css function */
    globalCss({
        html: {
            fontFamily: 'sans-serif',
            lineHeight: '1.15',
            textSizeAdjust: '100%',
            margin: 0
        },
        body: {
            margin: 0
        },
        'article, aside, footer, header, nav, section, figcaption, figure, main': {
            display: 'block'
        },
        h1: {
            fontSize: '2em',
            margin: 0
        },
        hr: {
            boxSizing: 'content-box',
            height: 0,
            overflow: 'visible'
        },
        pre: {
            fontFamily: 'monospace, monospace',
            fontSize: '1em'
        },
        a: {
            background: 'transparent',
            textDecorationSkip: 'objects'
        },
        'a:active, a:hover': {
            outlineWidth: 0
        },
        'abbr[title]': {
            borderBottom: 'none',
            textDecoration: 'underline'
        },
        'b, strong': {
            fontWeight: 'bolder'
        },
        'code, kbp, samp': {
            fontFamily: 'monospace, monospace',
            fontSize: '1em'
        },
        dfn: {
            fontStyle: 'italic'
        },
        mark: {
            backgroundColor: '#ff0',
            color: '#000'
        },
        small: {
            fontSize: '80%'
        },
        'sub, sup': {
            fontSize: '75%',
            lineHeight: 0,
            position: 'relative',
            verticalAlign: 'baseline'
        },
        sup: {
            top: '-0.5em'
        },
        sub: {
            bottom: '-0.25em'
        },
        'audio, video': {
            display: 'inline-block'
        },
        'audio:not([controls])': {
            display: 'none',
            height: 0
        },
        img: {
            borderStyle: 'none',
            verticalAlign: 'middle'
        },
        'svg:not(:root)': {
            overflow: 'hidden'
        },
        'button, input, optgroup, select, textarea': {
            fontFamily: 'sans-serif',
            fontSize: '100%',
            lineHeight: '1.15',
            margin: 0
        },
        'button, input': {
            overflow: 'visible'
        },
        'button, select': {
            textTransform: 'none'
        },
        'button, [type=reset], [type=submit]': {
            WebkitAppearance: 'button'
        },
        'button::-moz-focus-inner, [type=button]::-moz-focus-inner, [type=reset]::-moz-focus-inner, [type=submit]::-moz-focus-inner': {
            borderStyle: 'none',
            padding: 0
        },
        'button:-moz-focusring, [type=button]:-moz-focusring, [type=reset]:-moz-focusring, [type=submit]:-moz-focusring': {
            outline: '1px dotted ButtonText'
        },
        legend: {
            boxSizing: 'border-box',
            color: 'inherit',
            display: 'table',
            maxWidth: '100%',
            padding: 0,
            whiteSpace: 'normal'
        },
        progress: {
            display: 'inline-block',
            verticalAlign: 'baseline'
        },
        textarea: {
            overflow: 'auto'
        },
        '[type=checkbox], [type=radio]': {
            boxSizing: 'border-box',
            padding: 0
        },
        '[type=number]::-webkit-inner-spin-button, [type=number]::-webkit-outer-spin-button': {
            height: 'auto'
        },
        '[type=search]': {
            appearance: 'textfield',
            outlineOffset: '-2px'
        },
        '[type=search]::-webkit-search-cancel-button, [type=search]::-webkit-search-decoration': {
            appearance: 'none'
        },
        '::-webkit-file-upload-button': {
            appearance: 'button',
            font: 'inherit'
        },
        'details, menu': {
            display: 'block'
        },
        summary: {
            display: 'list-item'
        },
        canvas: {
            display: 'inline-block'
        },
        template: {
            display: 'none'
        },
        '[hidden]': {
            display: 'none'
        }
    });

    const SYSTEM_PROPS = {
        mt: 'marginTop',
        mb: 'marginBottom',
        ml: 'marginLeft',
        mr: 'marginRight',
        pt: 'paddingTop',
        pb: 'paddingBottom',
        pl: 'paddingLeft',
        pr: 'paddingRight'
    };
    const NEGATIVE_VALUES = ['-xs', '-sm', '-md', '-lg', '-xl'];
    function isValidSizeValue(margin) {
        return typeof margin === 'string' || typeof margin === 'number';
    }
    function getSizeValue(margin, theme) {
        if (NEGATIVE_VALUES.includes(margin)) {
            return theme.fn.size({ size: margin.replace('-', ''), sizes: theme.space }) * -1;
        }
        return theme.fn.size({ size: margin, sizes: theme.space });
    }
    function getSystemStyles(systemStyles, theme) {
        const styles = {};
        if (isValidSizeValue(systemStyles.p)) {
            const value = getSizeValue(systemStyles.p, theme);
            styles.padding = value;
        }
        if (isValidSizeValue(systemStyles.m)) {
            const value = getSizeValue(systemStyles.m, theme);
            styles.margin = value;
        }
        if (isValidSizeValue(systemStyles.py)) {
            const value = getSizeValue(systemStyles.py, theme);
            styles.paddingTop = value;
            styles.paddingBottom = value;
        }
        if (isValidSizeValue(systemStyles.px)) {
            const value = getSizeValue(systemStyles.px, theme);
            styles.paddingLeft = value;
            styles.paddingRight = value;
        }
        if (isValidSizeValue(systemStyles.my)) {
            const value = getSizeValue(systemStyles.my, theme);
            styles.marginTop = value;
            styles.marginBottom = value;
        }
        if (isValidSizeValue(systemStyles.mx)) {
            const value = getSizeValue(systemStyles.mx, theme);
            styles.marginLeft = value;
            styles.marginRight = value;
        }
        Object.keys(SYSTEM_PROPS).forEach((property) => {
            if (isValidSizeValue(systemStyles[property])) {
                styles[SYSTEM_PROPS[property]] = theme.fn.size({
                    size: getSizeValue(systemStyles[property], theme),
                    sizes: theme.space
                });
            }
        });
        return styles;
    }

    /* node_modules\@svelteuidev\core\components\Box\Box.svelte generated by Svelte v3.49.0 */
    const file$a = "node_modules\\@svelteuidev\\core\\components\\Box\\Box.svelte";

    // (74:0) {:else}
    function create_else_block$7(ctx) {
    	let div;
    	let div_class_value;
    	let useActions_action;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*#slots*/ ctx[28].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[32], null);

    	let div_levels = [
    		{
    			class: div_class_value = "" + (/*className*/ ctx[2] + " " + /*BoxStyles*/ ctx[7]({
    				css: {
    					.../*getCSSStyles*/ ctx[11](/*theme*/ ctx[10]),
    					.../*systemStyles*/ ctx[6]
    				}
    			}))
    		},
    		/*$$restProps*/ ctx[12]
    	];

    	let div_data = {};

    	for (let i = 0; i < div_levels.length; i += 1) {
    		div_data = assign(div_data, div_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			div = element("div");
    			if (default_slot) default_slot.c();
    			set_attributes(div, div_data);
    			add_location(div, file$a, 74, 1, 2242);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			if (default_slot) {
    				default_slot.m(div, null);
    			}

    			/*div_binding*/ ctx[31](div);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					action_destroyer(/*forwardEvents*/ ctx[8].call(null, div)),
    					action_destroyer(useActions_action = useActions.call(null, div, /*use*/ ctx[1]))
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty[1] & /*$$scope*/ 2)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[32],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[32])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[32], dirty, null),
    						null
    					);
    				}
    			}

    			set_attributes(div, div_data = get_spread_update(div_levels, [
    				(!current || dirty[0] & /*className, BoxStyles, systemStyles*/ 196 && div_class_value !== (div_class_value = "" + (/*className*/ ctx[2] + " " + /*BoxStyles*/ ctx[7]({
    					css: {
    						.../*getCSSStyles*/ ctx[11](/*theme*/ ctx[10]),
    						.../*systemStyles*/ ctx[6]
    					}
    				})))) && { class: div_class_value },
    				dirty[0] & /*$$restProps*/ 4096 && /*$$restProps*/ ctx[12]
    			]));

    			if (useActions_action && is_function(useActions_action.update) && dirty[0] & /*use*/ 2) useActions_action.update.call(null, /*use*/ ctx[1]);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (default_slot) default_slot.d(detaching);
    			/*div_binding*/ ctx[31](null);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$7.name,
    		type: "else",
    		source: "(74:0) {:else}",
    		ctx
    	});

    	return block;
    }

    // (64:22) 
    function create_if_block_1$3(ctx) {
    	let switch_instance;
    	let switch_instance_anchor;
    	let current;

    	const switch_instance_spread_levels = [
    		{
    			use: [/*forwardEvents*/ ctx[8], [useActions, /*use*/ ctx[1]]]
    		},
    		{
    			class: "" + (/*className*/ ctx[2] + " " + /*BoxStyles*/ ctx[7]({
    				css: {
    					.../*getCSSStyles*/ ctx[11](/*theme*/ ctx[10]),
    					.../*systemStyles*/ ctx[6]
    				}
    			}))
    		},
    		/*$$restProps*/ ctx[12]
    	];

    	var switch_value = /*root*/ ctx[3];

    	function switch_props(ctx) {
    		let switch_instance_props = {
    			$$slots: { default: [create_default_slot$5] },
    			$$scope: { ctx }
    		};

    		for (let i = 0; i < switch_instance_spread_levels.length; i += 1) {
    			switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
    		}

    		return {
    			props: switch_instance_props,
    			$$inline: true
    		};
    	}

    	if (switch_value) {
    		switch_instance = new switch_value(switch_props(ctx));
    		/*switch_instance_binding*/ ctx[30](switch_instance);
    	}

    	const block = {
    		c: function create() {
    			if (switch_instance) create_component(switch_instance.$$.fragment);
    			switch_instance_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if (switch_instance) {
    				mount_component(switch_instance, target, anchor);
    			}

    			insert_dev(target, switch_instance_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const switch_instance_changes = (dirty[0] & /*forwardEvents, use, className, BoxStyles, getCSSStyles, theme, systemStyles, $$restProps*/ 7622)
    			? get_spread_update(switch_instance_spread_levels, [
    					dirty[0] & /*forwardEvents, use*/ 258 && {
    						use: [/*forwardEvents*/ ctx[8], [useActions, /*use*/ ctx[1]]]
    					},
    					dirty[0] & /*className, BoxStyles, getCSSStyles, theme, systemStyles*/ 3268 && {
    						class: "" + (/*className*/ ctx[2] + " " + /*BoxStyles*/ ctx[7]({
    							css: {
    								.../*getCSSStyles*/ ctx[11](/*theme*/ ctx[10]),
    								.../*systemStyles*/ ctx[6]
    							}
    						}))
    					},
    					dirty[0] & /*$$restProps*/ 4096 && get_spread_object(/*$$restProps*/ ctx[12])
    				])
    			: {};

    			if (dirty[1] & /*$$scope*/ 2) {
    				switch_instance_changes.$$scope = { dirty, ctx };
    			}

    			if (switch_value !== (switch_value = /*root*/ ctx[3])) {
    				if (switch_instance) {
    					group_outros();
    					const old_component = switch_instance;

    					transition_out(old_component.$$.fragment, 1, 0, () => {
    						destroy_component(old_component, 1);
    					});

    					check_outros();
    				}

    				if (switch_value) {
    					switch_instance = new switch_value(switch_props(ctx));
    					/*switch_instance_binding*/ ctx[30](switch_instance);
    					create_component(switch_instance.$$.fragment);
    					transition_in(switch_instance.$$.fragment, 1);
    					mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
    				} else {
    					switch_instance = null;
    				}
    			} else if (switch_value) {
    				switch_instance.$set(switch_instance_changes);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			/*switch_instance_binding*/ ctx[30](null);
    			if (detaching) detach_dev(switch_instance_anchor);
    			if (switch_instance) destroy_component(switch_instance, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$3.name,
    		type: "if",
    		source: "(64:22) ",
    		ctx
    	});

    	return block;
    }

    // (52:0) {#if isHTMLElement}
    function create_if_block$9(ctx) {
    	let previous_tag = /*castRoot*/ ctx[9]();
    	let svelte_element_anchor;
    	let current;
    	validate_dynamic_element(/*castRoot*/ ctx[9]());
    	validate_void_dynamic_element(/*castRoot*/ ctx[9]());
    	let svelte_element = /*castRoot*/ ctx[9]() && create_dynamic_element(ctx);

    	const block = {
    		c: function create() {
    			if (svelte_element) svelte_element.c();
    			svelte_element_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if (svelte_element) svelte_element.m(target, anchor);
    			insert_dev(target, svelte_element_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (/*castRoot*/ ctx[9]()) {
    				if (!previous_tag) {
    					svelte_element = create_dynamic_element(ctx);
    					svelte_element.c();
    					svelte_element.m(svelte_element_anchor.parentNode, svelte_element_anchor);
    				} else if (safe_not_equal(previous_tag, /*castRoot*/ ctx[9]())) {
    					svelte_element.d(1);
    					validate_dynamic_element(/*castRoot*/ ctx[9]());
    					validate_void_dynamic_element(/*castRoot*/ ctx[9]());
    					svelte_element = create_dynamic_element(ctx);
    					svelte_element.c();
    					svelte_element.m(svelte_element_anchor.parentNode, svelte_element_anchor);
    				} else {
    					svelte_element.p(ctx, dirty);
    				}
    			} else if (previous_tag) {
    				svelte_element.d(1);
    				svelte_element = null;
    			}

    			previous_tag = /*castRoot*/ ctx[9]();
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(svelte_element);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(svelte_element);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svelte_element_anchor);
    			if (svelte_element) svelte_element.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$9.name,
    		type: "if",
    		source: "(52:0) {#if isHTMLElement}",
    		ctx
    	});

    	return block;
    }

    // (65:1) <svelte:component   this={root}   bind:this={element}   use={[forwardEvents, [useActions, use]]}   class="{className} {BoxStyles({ css: { ...getCSSStyles(theme), ...systemStyles } })}"   {...$$restProps}  >
    function create_default_slot$5(ctx) {
    	let current;
    	const default_slot_template = /*#slots*/ ctx[28].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[32], null);

    	const block = {
    		c: function create() {
    			if (default_slot) default_slot.c();
    		},
    		m: function mount(target, anchor) {
    			if (default_slot) {
    				default_slot.m(target, anchor);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty[1] & /*$$scope*/ 2)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[32],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[32])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[32], dirty, null),
    						null
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$5.name,
    		type: "slot",
    		source: "(65:1) <svelte:component   this={root}   bind:this={element}   use={[forwardEvents, [useActions, use]]}   class=\\\"{className} {BoxStyles({ css: { ...getCSSStyles(theme), ...systemStyles } })}\\\"   {...$$restProps}  >",
    		ctx
    	});

    	return block;
    }

    // (54:1) <svelte:element   bind:this={element}   this={castRoot()}   use:forwardEvents   use:useActions={use}   class="{className} {BoxStyles({ css: {...getCSSStyles(theme), ...systemStyles} })}"   {...$$restProps}  >
    function create_dynamic_element(ctx) {
    	let svelte_element;
    	let svelte_element_class_value;
    	let useActions_action;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*#slots*/ ctx[28].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[32], null);

    	let svelte_element_levels = [
    		{
    			class: svelte_element_class_value = "" + (/*className*/ ctx[2] + " " + /*BoxStyles*/ ctx[7]({
    				css: {
    					.../*getCSSStyles*/ ctx[11](/*theme*/ ctx[10]),
    					.../*systemStyles*/ ctx[6]
    				}
    			}))
    		},
    		/*$$restProps*/ ctx[12]
    	];

    	let svelte_element_data = {};

    	for (let i = 0; i < svelte_element_levels.length; i += 1) {
    		svelte_element_data = assign(svelte_element_data, svelte_element_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			svelte_element = element(/*castRoot*/ ctx[9]());
    			if (default_slot) default_slot.c();
    			set_attributes(svelte_element, svelte_element_data);
    			add_location(svelte_element, file$a, 53, 1, 1726);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svelte_element, anchor);

    			if (default_slot) {
    				default_slot.m(svelte_element, null);
    			}

    			/*svelte_element_binding*/ ctx[29](svelte_element);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					action_destroyer(/*forwardEvents*/ ctx[8].call(null, svelte_element)),
    					action_destroyer(useActions_action = useActions.call(null, svelte_element, /*use*/ ctx[1]))
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty[1] & /*$$scope*/ 2)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[32],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[32])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[32], dirty, null),
    						null
    					);
    				}
    			}

    			set_attributes(svelte_element, svelte_element_data = get_spread_update(svelte_element_levels, [
    				(!current || dirty[0] & /*className, BoxStyles, systemStyles*/ 196 && svelte_element_class_value !== (svelte_element_class_value = "" + (/*className*/ ctx[2] + " " + /*BoxStyles*/ ctx[7]({
    					css: {
    						.../*getCSSStyles*/ ctx[11](/*theme*/ ctx[10]),
    						.../*systemStyles*/ ctx[6]
    					}
    				})))) && { class: svelte_element_class_value },
    				dirty[0] & /*$$restProps*/ 4096 && /*$$restProps*/ ctx[12]
    			]));

    			if (useActions_action && is_function(useActions_action.update) && dirty[0] & /*use*/ 2) useActions_action.update.call(null, /*use*/ ctx[1]);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svelte_element);
    			if (default_slot) default_slot.d(detaching);
    			/*svelte_element_binding*/ ctx[29](null);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_dynamic_element.name,
    		type: "child_dynamic_element",
    		source: "(54:1) <svelte:element   bind:this={element}   this={castRoot()}   use:forwardEvents   use:useActions={use}   class=\\\"{className} {BoxStyles({ css: {...getCSSStyles(theme), ...systemStyles} })}\\\"   {...$$restProps}  >",
    		ctx
    	});

    	return block;
    }

    function create_fragment$c(ctx) {
    	let current_block_type_index;
    	let if_block;
    	let if_block_anchor;
    	let current;
    	const if_block_creators = [create_if_block$9, create_if_block_1$3, create_else_block$7];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*isHTMLElement*/ ctx[4]) return 0;
    		if (/*isComponent*/ ctx[5]) return 1;
    		return 2;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block = {
    		c: function create() {
    			if_block.c();
    			if_block_anchor = empty();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if_blocks[current_block_type_index].m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				} else {
    					if_block.p(ctx, dirty);
    				}

    				transition_in(if_block, 1);
    				if_block.m(if_block_anchor.parentNode, if_block_anchor);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if_blocks[current_block_type_index].d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$c.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$c($$self, $$props, $$invalidate) {
    	let BoxStyles;
    	let systemStyles;

    	const omit_props_names = [
    		"use","element","class","css","root","m","my","mx","mt","mb","ml","mr","p","py","px","pt","pb","pl","pr"
    	];

    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Box', slots, ['default']);
    	let { use = [], element = undefined, class: className = '', css: css$1 = {}, root = undefined, m = undefined, my = undefined, mx = undefined, mt = undefined, mb = undefined, ml = undefined, mr = undefined, p = undefined, py = undefined, px = undefined, pt = undefined, pb = undefined, pl = undefined, pr = undefined } = $$props;

    	/** An action that forwards inner dom node events from parent component */
    	const forwardEvents = createEventForwarder(get_current_component());

    	/** workaround for root type errors, this should be replaced by a better type system */
    	const castRoot = () => root;

    	const theme = useSvelteUIThemeContext()?.theme || useSvelteUITheme();
    	const getCSSStyles = typeof css$1 === 'function' ? css$1 : () => css$1;
    	let isHTMLElement;
    	let isComponent;

    	function svelte_element_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			element = $$value;
    			$$invalidate(0, element);
    		});
    	}

    	function switch_instance_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			element = $$value;
    			$$invalidate(0, element);
    		});
    	}

    	function div_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			element = $$value;
    			$$invalidate(0, element);
    		});
    	}

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(12, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('use' in $$new_props) $$invalidate(1, use = $$new_props.use);
    		if ('element' in $$new_props) $$invalidate(0, element = $$new_props.element);
    		if ('class' in $$new_props) $$invalidate(2, className = $$new_props.class);
    		if ('css' in $$new_props) $$invalidate(13, css$1 = $$new_props.css);
    		if ('root' in $$new_props) $$invalidate(3, root = $$new_props.root);
    		if ('m' in $$new_props) $$invalidate(14, m = $$new_props.m);
    		if ('my' in $$new_props) $$invalidate(15, my = $$new_props.my);
    		if ('mx' in $$new_props) $$invalidate(16, mx = $$new_props.mx);
    		if ('mt' in $$new_props) $$invalidate(17, mt = $$new_props.mt);
    		if ('mb' in $$new_props) $$invalidate(18, mb = $$new_props.mb);
    		if ('ml' in $$new_props) $$invalidate(19, ml = $$new_props.ml);
    		if ('mr' in $$new_props) $$invalidate(20, mr = $$new_props.mr);
    		if ('p' in $$new_props) $$invalidate(21, p = $$new_props.p);
    		if ('py' in $$new_props) $$invalidate(22, py = $$new_props.py);
    		if ('px' in $$new_props) $$invalidate(23, px = $$new_props.px);
    		if ('pt' in $$new_props) $$invalidate(24, pt = $$new_props.pt);
    		if ('pb' in $$new_props) $$invalidate(25, pb = $$new_props.pb);
    		if ('pl' in $$new_props) $$invalidate(26, pl = $$new_props.pl);
    		if ('pr' in $$new_props) $$invalidate(27, pr = $$new_props.pr);
    		if ('$$scope' in $$new_props) $$invalidate(32, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		getSystemStyles,
    		_css: css,
    		useSvelteUITheme,
    		useSvelteUIThemeContext,
    		createEventForwarder,
    		useActions,
    		get_current_component,
    		use,
    		element,
    		className,
    		css: css$1,
    		root,
    		m,
    		my,
    		mx,
    		mt,
    		mb,
    		ml,
    		mr,
    		p,
    		py,
    		px,
    		pt,
    		pb,
    		pl,
    		pr,
    		forwardEvents,
    		castRoot,
    		theme,
    		getCSSStyles,
    		isHTMLElement,
    		isComponent,
    		systemStyles,
    		BoxStyles
    	});

    	$$self.$inject_state = $$new_props => {
    		if ('use' in $$props) $$invalidate(1, use = $$new_props.use);
    		if ('element' in $$props) $$invalidate(0, element = $$new_props.element);
    		if ('className' in $$props) $$invalidate(2, className = $$new_props.className);
    		if ('css' in $$props) $$invalidate(13, css$1 = $$new_props.css);
    		if ('root' in $$props) $$invalidate(3, root = $$new_props.root);
    		if ('m' in $$props) $$invalidate(14, m = $$new_props.m);
    		if ('my' in $$props) $$invalidate(15, my = $$new_props.my);
    		if ('mx' in $$props) $$invalidate(16, mx = $$new_props.mx);
    		if ('mt' in $$props) $$invalidate(17, mt = $$new_props.mt);
    		if ('mb' in $$props) $$invalidate(18, mb = $$new_props.mb);
    		if ('ml' in $$props) $$invalidate(19, ml = $$new_props.ml);
    		if ('mr' in $$props) $$invalidate(20, mr = $$new_props.mr);
    		if ('p' in $$props) $$invalidate(21, p = $$new_props.p);
    		if ('py' in $$props) $$invalidate(22, py = $$new_props.py);
    		if ('px' in $$props) $$invalidate(23, px = $$new_props.px);
    		if ('pt' in $$props) $$invalidate(24, pt = $$new_props.pt);
    		if ('pb' in $$props) $$invalidate(25, pb = $$new_props.pb);
    		if ('pl' in $$props) $$invalidate(26, pl = $$new_props.pl);
    		if ('pr' in $$props) $$invalidate(27, pr = $$new_props.pr);
    		if ('isHTMLElement' in $$props) $$invalidate(4, isHTMLElement = $$new_props.isHTMLElement);
    		if ('isComponent' in $$props) $$invalidate(5, isComponent = $$new_props.isComponent);
    		if ('systemStyles' in $$props) $$invalidate(6, systemStyles = $$new_props.systemStyles);
    		if ('BoxStyles' in $$props) $$invalidate(7, BoxStyles = $$new_props.BoxStyles);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty[0] & /*root*/ 8) {
    			{
    				$$invalidate(4, isHTMLElement = root && typeof root === 'string');
    				$$invalidate(5, isComponent = root && typeof root === 'function');
    			}
    		}

    		if ($$self.$$.dirty[0] & /*m, my, mx, mt, mb, ml, mr, p, py, px, pt, pb, pl, pr*/ 268419072) {
    			$$invalidate(6, systemStyles = getSystemStyles(
    				{
    					m,
    					my,
    					mx,
    					mt,
    					mb,
    					ml,
    					mr,
    					p,
    					py,
    					px,
    					pt,
    					pb,
    					pl,
    					pr
    				},
    				theme
    			));
    		}
    	};

    	$$invalidate(7, BoxStyles = css({}));

    	return [
    		element,
    		use,
    		className,
    		root,
    		isHTMLElement,
    		isComponent,
    		systemStyles,
    		BoxStyles,
    		forwardEvents,
    		castRoot,
    		theme,
    		getCSSStyles,
    		$$restProps,
    		css$1,
    		m,
    		my,
    		mx,
    		mt,
    		mb,
    		ml,
    		mr,
    		p,
    		py,
    		px,
    		pt,
    		pb,
    		pl,
    		pr,
    		slots,
    		svelte_element_binding,
    		switch_instance_binding,
    		div_binding,
    		$$scope
    	];
    }

    class Box extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(
    			this,
    			options,
    			instance$c,
    			create_fragment$c,
    			safe_not_equal,
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
    				pr: 27
    			},
    			null,
    			[-1, -1]
    		);

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Box",
    			options,
    			id: create_fragment$c.name
    		});
    	}

    	get use() {
    		throw new Error("<Box>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set use(value) {
    		throw new Error("<Box>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get element() {
    		throw new Error("<Box>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set element(value) {
    		throw new Error("<Box>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get class() {
    		throw new Error("<Box>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set class(value) {
    		throw new Error("<Box>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get css() {
    		throw new Error("<Box>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set css(value) {
    		throw new Error("<Box>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get root() {
    		throw new Error("<Box>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set root(value) {
    		throw new Error("<Box>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get m() {
    		throw new Error("<Box>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set m(value) {
    		throw new Error("<Box>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get my() {
    		throw new Error("<Box>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set my(value) {
    		throw new Error("<Box>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get mx() {
    		throw new Error("<Box>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set mx(value) {
    		throw new Error("<Box>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get mt() {
    		throw new Error("<Box>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set mt(value) {
    		throw new Error("<Box>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get mb() {
    		throw new Error("<Box>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set mb(value) {
    		throw new Error("<Box>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get ml() {
    		throw new Error("<Box>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set ml(value) {
    		throw new Error("<Box>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get mr() {
    		throw new Error("<Box>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set mr(value) {
    		throw new Error("<Box>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get p() {
    		throw new Error("<Box>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set p(value) {
    		throw new Error("<Box>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get py() {
    		throw new Error("<Box>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set py(value) {
    		throw new Error("<Box>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get px() {
    		throw new Error("<Box>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set px(value) {
    		throw new Error("<Box>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get pt() {
    		throw new Error("<Box>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set pt(value) {
    		throw new Error("<Box>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get pb() {
    		throw new Error("<Box>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set pb(value) {
    		throw new Error("<Box>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get pl() {
    		throw new Error("<Box>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set pl(value) {
    		throw new Error("<Box>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get pr() {
    		throw new Error("<Box>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set pr(value) {
    		throw new Error("<Box>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    var Box$1 = Box;

    var useStyles = createStyles((theme, { cols, spacing, gridBreakpoints }) => {
        return {
            root: {
                boxSizing: 'border-box',
                display: 'grid',
                gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
                gap: theme.fn.size({ size: spacing, sizes: theme.space }),
                ...gridBreakpoints
            }
        };
    });

    /** Makeshift theme object containing breakpoints for function */
    const theme = {
        spacing: {
            xs: 10,
            sm: 12,
            md: 16,
            lg: 20,
            xl: 24
        },
        breakpoints: {
            xs: 576,
            sm: 768,
            md: 992,
            lg: 1200,
            xl: 1400
        }
    };
    function size(props) {
        if (typeof props.size === 'number') {
            return props.size;
        }
        return props.sizes[props.size] || props.size || props.sizes.md;
    }
    function getSortedBreakpoints(theme, breakpoints) {
        if (breakpoints.length === 0) {
            return breakpoints;
        }
        const property = 'maxWidth' in breakpoints[0] ? 'maxWidth' : 'minWidth';
        const sorted = [...breakpoints].sort((a, b) => size({ size: b[property], sizes: theme.breakpoints }) -
            size({ size: a[property], sizes: theme.breakpoints }));
        return property === 'minWidth' ? sorted.reverse() : sorted;
    }

    /* node_modules\@svelteuidev\core\components\SimpleGrid\SimpleGrid.svelte generated by Svelte v3.49.0 */

    // (38:0) <Box bind:element {use} class={cx(className, getStyles({ css: override }))} {...$$restProps}>
    function create_default_slot$4(ctx) {
    	let current;
    	const default_slot_template = /*#slots*/ ctx[11].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[13], null);

    	const block = {
    		c: function create() {
    			if (default_slot) default_slot.c();
    		},
    		m: function mount(target, anchor) {
    			if (default_slot) {
    				default_slot.m(target, anchor);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 8192)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[13],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[13])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[13], dirty, null),
    						null
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$4.name,
    		type: "slot",
    		source: "(38:0) <Box bind:element {use} class={cx(className, getStyles({ css: override }))} {...$$restProps}>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$b(ctx) {
    	let box;
    	let updating_element;
    	let current;

    	const box_spread_levels = [
    		{ use: /*use*/ ctx[1] },
    		{
    			class: /*cx*/ ctx[5](/*className*/ ctx[2], /*getStyles*/ ctx[4]({ css: /*override*/ ctx[3] }))
    		},
    		/*$$restProps*/ ctx[6]
    	];

    	function box_element_binding(value) {
    		/*box_element_binding*/ ctx[12](value);
    	}

    	let box_props = {
    		$$slots: { default: [create_default_slot$4] },
    		$$scope: { ctx }
    	};

    	for (let i = 0; i < box_spread_levels.length; i += 1) {
    		box_props = assign(box_props, box_spread_levels[i]);
    	}

    	if (/*element*/ ctx[0] !== void 0) {
    		box_props.element = /*element*/ ctx[0];
    	}

    	box = new Box$1({ props: box_props, $$inline: true });
    	binding_callbacks.push(() => bind(box, 'element', box_element_binding));

    	const block = {
    		c: function create() {
    			create_component(box.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(box, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const box_changes = (dirty & /*use, cx, className, getStyles, override, $$restProps*/ 126)
    			? get_spread_update(box_spread_levels, [
    					dirty & /*use*/ 2 && { use: /*use*/ ctx[1] },
    					dirty & /*cx, className, getStyles, override*/ 60 && {
    						class: /*cx*/ ctx[5](/*className*/ ctx[2], /*getStyles*/ ctx[4]({ css: /*override*/ ctx[3] }))
    					},
    					dirty & /*$$restProps*/ 64 && get_spread_object(/*$$restProps*/ ctx[6])
    				])
    			: {};

    			if (dirty & /*$$scope*/ 8192) {
    				box_changes.$$scope = { dirty, ctx };
    			}

    			if (!updating_element && dirty & /*element*/ 1) {
    				updating_element = true;
    				box_changes.element = /*element*/ ctx[0];
    				add_flush_callback(() => updating_element = false);
    			}

    			box.$set(box_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(box.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(box.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(box, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$b.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$b($$self, $$props, $$invalidate) {
    	let gridBreakpoints;
    	let cx;
    	let getStyles;
    	const omit_props_names = ["use","element","class","override","breakpoints","cols","spacing"];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('SimpleGrid', slots, ['default']);
    	let { use = [], element = undefined, class: className = '', override = {}, breakpoints = [], cols = 1, spacing = 'md' } = $$props;

    	function box_element_binding(value) {
    		element = value;
    		$$invalidate(0, element);
    	}

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(6, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('use' in $$new_props) $$invalidate(1, use = $$new_props.use);
    		if ('element' in $$new_props) $$invalidate(0, element = $$new_props.element);
    		if ('class' in $$new_props) $$invalidate(2, className = $$new_props.class);
    		if ('override' in $$new_props) $$invalidate(3, override = $$new_props.override);
    		if ('breakpoints' in $$new_props) $$invalidate(7, breakpoints = $$new_props.breakpoints);
    		if ('cols' in $$new_props) $$invalidate(8, cols = $$new_props.cols);
    		if ('spacing' in $$new_props) $$invalidate(9, spacing = $$new_props.spacing);
    		if ('$$scope' in $$new_props) $$invalidate(13, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		useStyles,
    		Box: Box$1,
    		getSortedBreakpoints,
    		size,
    		theme,
    		use,
    		element,
    		className,
    		override,
    		breakpoints,
    		cols,
    		spacing,
    		gridBreakpoints,
    		getStyles,
    		cx
    	});

    	$$self.$inject_state = $$new_props => {
    		if ('use' in $$props) $$invalidate(1, use = $$new_props.use);
    		if ('element' in $$props) $$invalidate(0, element = $$new_props.element);
    		if ('className' in $$props) $$invalidate(2, className = $$new_props.className);
    		if ('override' in $$props) $$invalidate(3, override = $$new_props.override);
    		if ('breakpoints' in $$props) $$invalidate(7, breakpoints = $$new_props.breakpoints);
    		if ('cols' in $$props) $$invalidate(8, cols = $$new_props.cols);
    		if ('spacing' in $$props) $$invalidate(9, spacing = $$new_props.spacing);
    		if ('gridBreakpoints' in $$props) $$invalidate(10, gridBreakpoints = $$new_props.gridBreakpoints);
    		if ('getStyles' in $$props) $$invalidate(4, getStyles = $$new_props.getStyles);
    		if ('cx' in $$props) $$invalidate(5, cx = $$new_props.cx);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*breakpoints, spacing*/ 640) {
    			$$invalidate(10, gridBreakpoints = getSortedBreakpoints(theme, breakpoints).reduce(
    				(acc, breakpoint) => {
    					const property = 'maxWidth' in breakpoint ? 'max-width' : 'min-width';

    					const breakpointSize = size({
    						size: property === 'max-width'
    						? breakpoint.maxWidth
    						: breakpoint.minWidth,
    						sizes: theme.breakpoints
    					});

    					acc[`@media (${property}: ${breakpointSize + (property === 'max-width' ? 0 : 1)}px)`] = {
    						gridTemplateColumns: `repeat(${breakpoint.cols}, minmax(0, 1fr))`,
    						gap: size({
    							size: breakpoint.spacing || spacing,
    							sizes: theme.spacing
    						})
    					};

    					return acc;
    				},
    				{}
    			));
    		}

    		if ($$self.$$.dirty & /*cols, spacing, gridBreakpoints*/ 1792) {
    			$$invalidate(5, { cx, getStyles } = useStyles({ cols, spacing, gridBreakpoints }), cx, (((($$invalidate(4, getStyles), $$invalidate(8, cols)), $$invalidate(9, spacing)), $$invalidate(10, gridBreakpoints)), $$invalidate(7, breakpoints)));
    		}
    	};

    	return [
    		element,
    		use,
    		className,
    		override,
    		getStyles,
    		cx,
    		$$restProps,
    		breakpoints,
    		cols,
    		spacing,
    		gridBreakpoints,
    		slots,
    		box_element_binding,
    		$$scope
    	];
    }

    class SimpleGrid extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$b, create_fragment$b, safe_not_equal, {
    			use: 1,
    			element: 0,
    			class: 2,
    			override: 3,
    			breakpoints: 7,
    			cols: 8,
    			spacing: 9
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "SimpleGrid",
    			options,
    			id: create_fragment$b.name
    		});
    	}

    	get use() {
    		throw new Error("<SimpleGrid>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set use(value) {
    		throw new Error("<SimpleGrid>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get element() {
    		throw new Error("<SimpleGrid>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set element(value) {
    		throw new Error("<SimpleGrid>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get class() {
    		throw new Error("<SimpleGrid>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set class(value) {
    		throw new Error("<SimpleGrid>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get override() {
    		throw new Error("<SimpleGrid>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set override(value) {
    		throw new Error("<SimpleGrid>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get breakpoints() {
    		throw new Error("<SimpleGrid>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set breakpoints(value) {
    		throw new Error("<SimpleGrid>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get cols() {
    		throw new Error("<SimpleGrid>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set cols(value) {
    		throw new Error("<SimpleGrid>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get spacing() {
    		throw new Error("<SimpleGrid>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set spacing(value) {
    		throw new Error("<SimpleGrid>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    var SimpleGrid$1 = SimpleGrid;

    /* src\components\03-Career.svelte generated by Svelte v3.49.0 */

    const { Object: Object_1$1 } = globals;
    const file$9 = "src\\components\\03-Career.svelte";

    function get_each_context$4(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[2] = list[i].imgurl;
    	child_ctx[3] = list[i].title;
    	child_ctx[4] = list[i].subtitle;
    	child_ctx[5] = list[i].points;
    	child_ctx[6] = list[i].logoColor;
    	return child_ctx;
    }

    // (60:6) {#each cardList as { imgurl, title, subtitle, points, logoColor }}
    function create_each_block$4(ctx) {
    	let card;
    	let current;

    	card = new CardCareer({
    			props: {
    				imgurl: /*imgurl*/ ctx[2],
    				title: /*title*/ ctx[3],
    				subtitle: /*subtitle*/ ctx[4],
    				points: /*points*/ ctx[5],
    				logoColor: /*logoColor*/ ctx[6]
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(card.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(card, target, anchor);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(card.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(card.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(card, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$4.name,
    		type: "each",
    		source: "(60:6) {#each cardList as { imgurl, title, subtitle, points, logoColor }}",
    		ctx
    	});

    	return block;
    }

    // (59:4) <SimpleGrid cols={2}>
    function create_default_slot$3(ctx) {
    	let each_1_anchor;
    	let current;
    	let each_value = /*cardList*/ ctx[0];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$4(get_each_context$4(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			each_1_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(target, anchor);
    			}

    			insert_dev(target, each_1_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*cardList*/ 1) {
    				each_value = /*cardList*/ ctx[0];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$4(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block$4(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach_dev(each_1_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$3.name,
    		type: "slot",
    		source: "(59:4) <SimpleGrid cols={2}>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$a(ctx) {
    	let div1;
    	let h1;
    	let t1;
    	let div0;
    	let simplegrid;
    	let current;

    	simplegrid = new SimpleGrid$1({
    			props: {
    				cols: 2,
    				$$slots: { default: [create_default_slot$3] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			h1 = element("h1");
    			h1.textContent = "Career";
    			t1 = space();
    			div0 = element("div");
    			create_component(simplegrid.$$.fragment);
    			attr_dev(h1, "class", "title col-md-9");
    			add_location(h1, file$9, 56, 2, 1732);
    			attr_dev(div0, "id", "card-list-container");
    			attr_dev(div0, "class", "card container-fluid col-md-9 svelte-1ciet3r");
    			add_location(div0, file$9, 57, 2, 1774);
    			attr_dev(div1, "id", "career");
    			attr_dev(div1, "class", "container-fluid col-sm-10 col-sm-1 svelte-1ciet3r");
    			add_location(div1, file$9, 55, 0, 1668);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, h1);
    			append_dev(div1, t1);
    			append_dev(div1, div0);
    			mount_component(simplegrid, div0, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const simplegrid_changes = {};

    			if (dirty & /*$$scope*/ 512) {
    				simplegrid_changes.$$scope = { dirty, ctx };
    			}

    			simplegrid.$set(simplegrid_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(simplegrid.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(simplegrid.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			destroy_component(simplegrid);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$a.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$a($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('_03_Career', slots, []);

    	class CardClass {
    		constructor(imgurl, title, subtitle, points, logoColor) {
    			Object.assign(this, {
    				imgurl,
    				title,
    				subtitle,
    				points,
    				logoColor
    			});
    		}
    	}

    	let cardList = [
    		new CardClass("images/03-career/white/360insights.png", "Full Stack Developer", "360insights", ["Reduced debugging time by 10 mins", "Increased testing efficiency by 5%"], getComputedStyle(document.querySelector(":root")).getPropertyValue("--gradient-telegram")),
    		new CardClass("images/03-career/white/npx.png",
    		"Innovation Catalyst Intern",
    		"Nuclear Promise X",
    		[
    				"Prevented data conflicts costing over a day in restructuring",
    				"Reduced data reporting time to zero"
    			],
    		getComputedStyle(document.querySelector(":root")).getPropertyValue("--gradient-lunada")),
    		new CardClass("images/03-career/white/quarter4.png", "Database Specialist", "Quarter4", ["Cleaned data, allowing model prediction accuracy to rise >75%"], getComputedStyle(document.querySelector(":root")).getPropertyValue("--gradient-cosmic-fusion")),
    		new CardClass("images/03-career/white/marsh.png", "Business Application Developer", "Marsh", ["Automated 1hr of daily reporting"], getComputedStyle(document.querySelector(":root")).getPropertyValue("--gradient-amin"))
    	];

    	const writable_props = [];

    	Object_1$1.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<_03_Career> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ Card: CardCareer, SimpleGrid: SimpleGrid$1, CardClass, cardList });

    	$$self.$inject_state = $$props => {
    		if ('cardList' in $$props) $$invalidate(0, cardList = $$props.cardList);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [cardList];
    }

    class _03_Career extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$a, create_fragment$a, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "_03_Career",
    			options,
    			id: create_fragment$a.name
    		});
    	}
    }

    /* src\components\Cards\CardProject.svelte generated by Svelte v3.49.0 */

    const file$8 = "src\\components\\Cards\\CardProject.svelte";

    function get_each_context$3(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[4] = list[i];
    	return child_ctx;
    }

    // (10:6) {:else}
    function create_else_block$6(ctx) {
    	let a;
    	let h4;
    	let t;

    	const block = {
    		c: function create() {
    			a = element("a");
    			h4 = element("h4");
    			t = text(/*title*/ ctx[0]);
    			attr_dev(h4, "class", "title svelte-l32xjt");
    			add_location(h4, file$8, 11, 10, 285);
    			attr_dev(a, "href", /*url*/ ctx[1]);
    			attr_dev(a, "class", "svelte-l32xjt");
    			add_location(a, file$8, 10, 8, 259);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, a, anchor);
    			append_dev(a, h4);
    			append_dev(h4, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*title*/ 1) set_data_dev(t, /*title*/ ctx[0]);

    			if (dirty & /*url*/ 2) {
    				attr_dev(a, "href", /*url*/ ctx[1]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(a);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$6.name,
    		type: "else",
    		source: "(10:6) {:else}",
    		ctx
    	});

    	return block;
    }

    // (8:6) {#if url === ""}
    function create_if_block$8(ctx) {
    	let h4;
    	let t;

    	const block = {
    		c: function create() {
    			h4 = element("h4");
    			t = text(/*title*/ ctx[0]);
    			attr_dev(h4, "class", "title svelte-l32xjt");
    			add_location(h4, file$8, 8, 8, 204);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h4, anchor);
    			append_dev(h4, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*title*/ 1) set_data_dev(t, /*title*/ ctx[0]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h4);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$8.name,
    		type: "if",
    		source: "(8:6) {#if url === \\\"\\\"}",
    		ctx
    	});

    	return block;
    }

    // (17:8) {#each techstack as tech}
    function create_each_block$3(ctx) {
    	let div;
    	let t_value = /*tech*/ ctx[4] + "";
    	let t;

    	const block = {
    		c: function create() {
    			div = element("div");
    			t = text(t_value);
    			attr_dev(div, "class", "techstack svelte-l32xjt");
    			add_location(div, file$8, 17, 10, 448);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*techstack*/ 8 && t_value !== (t_value = /*tech*/ ctx[4] + "")) set_data_dev(t, t_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$3.name,
    		type: "each",
    		source: "(17:8) {#each techstack as tech}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$9(ctx) {
    	let div3;
    	let div2;
    	let div1;
    	let t0;
    	let p;
    	let t1;
    	let t2;
    	let div0;

    	function select_block_type(ctx, dirty) {
    		if (/*url*/ ctx[1] === "") return create_if_block$8;
    		return create_else_block$6;
    	}

    	let current_block_type = select_block_type(ctx);
    	let if_block = current_block_type(ctx);
    	let each_value = /*techstack*/ ctx[3];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$3(get_each_context$3(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			div3 = element("div");
    			div2 = element("div");
    			div1 = element("div");
    			if_block.c();
    			t0 = space();
    			p = element("p");
    			t1 = text(/*text*/ ctx[2]);
    			t2 = space();
    			div0 = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(p, "class", "text");
    			add_location(p, file$8, 14, 6, 350);
    			attr_dev(div0, "class", "row");
    			add_location(div0, file$8, 15, 6, 384);
    			attr_dev(div1, "class", "card-body svelte-l32xjt");
    			add_location(div1, file$8, 6, 4, 147);
    			attr_dev(div2, "class", "card m-2 cb1 text-center svelte-l32xjt");
    			add_location(div2, file$8, 5, 2, 103);
    			attr_dev(div3, "class", "div container-fluid svelte-l32xjt");
    			add_location(div3, file$8, 4, 0, 66);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div3, anchor);
    			append_dev(div3, div2);
    			append_dev(div2, div1);
    			if_block.m(div1, null);
    			append_dev(div1, t0);
    			append_dev(div1, p);
    			append_dev(p, t1);
    			append_dev(div1, t2);
    			append_dev(div1, div0);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div0, null);
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block) {
    				if_block.p(ctx, dirty);
    			} else {
    				if_block.d(1);
    				if_block = current_block_type(ctx);

    				if (if_block) {
    					if_block.c();
    					if_block.m(div1, t0);
    				}
    			}

    			if (dirty & /*text*/ 4) set_data_dev(t1, /*text*/ ctx[2]);

    			if (dirty & /*techstack*/ 8) {
    				each_value = /*techstack*/ ctx[3];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$3(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$3(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(div0, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div3);
    			if_block.d();
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$9.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$9($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('CardProject', slots, []);
    	let { title, url, text, techstack } = $$props;
    	const writable_props = ['title', 'url', 'text', 'techstack'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<CardProject> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('title' in $$props) $$invalidate(0, title = $$props.title);
    		if ('url' in $$props) $$invalidate(1, url = $$props.url);
    		if ('text' in $$props) $$invalidate(2, text = $$props.text);
    		if ('techstack' in $$props) $$invalidate(3, techstack = $$props.techstack);
    	};

    	$$self.$capture_state = () => ({ title, url, text, techstack });

    	$$self.$inject_state = $$props => {
    		if ('title' in $$props) $$invalidate(0, title = $$props.title);
    		if ('url' in $$props) $$invalidate(1, url = $$props.url);
    		if ('text' in $$props) $$invalidate(2, text = $$props.text);
    		if ('techstack' in $$props) $$invalidate(3, techstack = $$props.techstack);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [title, url, text, techstack];
    }

    class CardProject extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$9, create_fragment$9, safe_not_equal, { title: 0, url: 1, text: 2, techstack: 3 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "CardProject",
    			options,
    			id: create_fragment$9.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*title*/ ctx[0] === undefined && !('title' in props)) {
    			console.warn("<CardProject> was created without expected prop 'title'");
    		}

    		if (/*url*/ ctx[1] === undefined && !('url' in props)) {
    			console.warn("<CardProject> was created without expected prop 'url'");
    		}

    		if (/*text*/ ctx[2] === undefined && !('text' in props)) {
    			console.warn("<CardProject> was created without expected prop 'text'");
    		}

    		if (/*techstack*/ ctx[3] === undefined && !('techstack' in props)) {
    			console.warn("<CardProject> was created without expected prop 'techstack'");
    		}
    	}

    	get title() {
    		throw new Error("<CardProject>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set title(value) {
    		throw new Error("<CardProject>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get url() {
    		throw new Error("<CardProject>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set url(value) {
    		throw new Error("<CardProject>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get text() {
    		throw new Error("<CardProject>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set text(value) {
    		throw new Error("<CardProject>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get techstack() {
    		throw new Error("<CardProject>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set techstack(value) {
    		throw new Error("<CardProject>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\components\04-Projects.svelte generated by Svelte v3.49.0 */

    const { Object: Object_1 } = globals;
    const file$7 = "src\\components\\04-Projects.svelte";

    function get_each_context$2(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[2] = list[i].title;
    	child_ctx[3] = list[i].imgurl1;
    	child_ctx[4] = list[i].imgurl2;
    	child_ctx[5] = list[i].url;
    	child_ctx[6] = list[i].text;
    	child_ctx[7] = list[i].techstack;
    	child_ctx[9] = i;
    	return child_ctx;
    }

    // (54:8) {:else}
    function create_else_block_1(ctx) {
    	let div3;
    	let div0;
    	let cardproject;
    	let t0;
    	let div2;
    	let div1;
    	let t1;
    	let img;
    	let img_src_value;
    	let current;

    	cardproject = new CardProject({
    			props: {
    				title: /*title*/ ctx[2],
    				url: /*url*/ ctx[5],
    				text: /*text*/ ctx[6],
    				techstack: /*techstack*/ ctx[7]
    			},
    			$$inline: true
    		});

    	function select_block_type_2(ctx, dirty) {
    		if (/*url*/ ctx[5] === "") return create_if_block_2;
    		return create_else_block_2;
    	}

    	let current_block_type = select_block_type_2(ctx);
    	let if_block = current_block_type(ctx);

    	const block = {
    		c: function create() {
    			div3 = element("div");
    			div0 = element("div");
    			create_component(cardproject.$$.fragment);
    			t0 = space();
    			div2 = element("div");
    			div1 = element("div");
    			if_block.c();
    			t1 = space();
    			img = element("img");
    			attr_dev(div0, "class", "proj-description col-md-5 svelte-1cyurjj");
    			add_location(div0, file$7, 55, 12, 2283);
    			attr_dev(div1, "class", "main-img-container-odd col-md-10 offset-md-2 main-img-container svelte-1cyurjj");
    			add_location(div1, file$7, 59, 14, 2472);
    			attr_dev(img, "class", "card card-odd svelte-1cyurjj");
    			if (!src_url_equal(img.src, img_src_value = /*imgurl2*/ ctx[4])) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "project 2");
    			add_location(img, file$7, 70, 14, 2916);
    			attr_dev(div2, "class", "img-container col-md-7 svelte-1cyurjj");
    			add_location(div2, file$7, 58, 12, 2420);
    			attr_dev(div3, "class", "row project-container svelte-1cyurjj");
    			add_location(div3, file$7, 54, 10, 2234);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div3, anchor);
    			append_dev(div3, div0);
    			mount_component(cardproject, div0, null);
    			append_dev(div3, t0);
    			append_dev(div3, div2);
    			append_dev(div2, div1);
    			if_block.m(div1, null);
    			append_dev(div2, t1);
    			append_dev(div2, img);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if_block.p(ctx, dirty);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(cardproject.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(cardproject.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div3);
    			destroy_component(cardproject);
    			if_block.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block_1.name,
    		type: "else",
    		source: "(54:8) {:else}",
    		ctx
    	});

    	return block;
    }

    // (36:8) {#if index % 2 === 0}
    function create_if_block$7(ctx) {
    	let div3;
    	let div1;
    	let div0;
    	let t0;
    	let img;
    	let img_src_value;
    	let t1;
    	let div2;
    	let cardproject;
    	let current;

    	function select_block_type_1(ctx, dirty) {
    		if (/*url*/ ctx[5] === "") return create_if_block_1$2;
    		return create_else_block$5;
    	}

    	let current_block_type = select_block_type_1(ctx);
    	let if_block = current_block_type(ctx);

    	cardproject = new CardProject({
    			props: {
    				title: /*title*/ ctx[2],
    				url: /*url*/ ctx[5],
    				text: /*text*/ ctx[6],
    				techstack: /*techstack*/ ctx[7]
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div3 = element("div");
    			div1 = element("div");
    			div0 = element("div");
    			if_block.c();
    			t0 = space();
    			img = element("img");
    			t1 = space();
    			div2 = element("div");
    			create_component(cardproject.$$.fragment);
    			attr_dev(div0, "class", "main-img-container-even col-md-10 main-img-container svelte-1cyurjj");
    			add_location(div0, file$7, 38, 14, 1598);
    			attr_dev(img, "class", "card svelte-1cyurjj");
    			if (!src_url_equal(img.src, img_src_value = /*imgurl2*/ ctx[4])) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "project 2");
    			add_location(img, file$7, 47, 14, 1980);
    			attr_dev(div1, "class", "img-container col-md-7 svelte-1cyurjj");
    			add_location(div1, file$7, 37, 12, 1546);
    			attr_dev(div2, "class", "proj-description col-md-5 svelte-1cyurjj");
    			add_location(div2, file$7, 49, 12, 2064);
    			attr_dev(div3, "class", "row project-container svelte-1cyurjj");
    			add_location(div3, file$7, 36, 10, 1497);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div3, anchor);
    			append_dev(div3, div1);
    			append_dev(div1, div0);
    			if_block.m(div0, null);
    			append_dev(div1, t0);
    			append_dev(div1, img);
    			append_dev(div3, t1);
    			append_dev(div3, div2);
    			mount_component(cardproject, div2, null);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if_block.p(ctx, dirty);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(cardproject.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(cardproject.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div3);
    			if_block.d();
    			destroy_component(cardproject);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$7.name,
    		type: "if",
    		source: "(36:8) {#if index % 2 === 0}",
    		ctx
    	});

    	return block;
    }

    // (65:16) {:else}
    function create_else_block_2(ctx) {
    	let a;
    	let img;
    	let img_src_value;

    	const block = {
    		c: function create() {
    			a = element("a");
    			img = element("img");
    			attr_dev(img, "class", "main main-odd svelte-1cyurjj");
    			if (!src_url_equal(img.src, img_src_value = /*imgurl1*/ ctx[3])) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "project");
    			add_location(img, file$7, 66, 20, 2774);
    			attr_dev(a, "href", /*url*/ ctx[5]);
    			attr_dev(a, "class", "svelte-1cyurjj");
    			add_location(a, file$7, 65, 18, 2738);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, a, anchor);
    			append_dev(a, img);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(a);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block_2.name,
    		type: "else",
    		source: "(65:16) {:else}",
    		ctx
    	});

    	return block;
    }

    // (63:16) {#if url === ""}
    function create_if_block_2(ctx) {
    	let img;
    	let img_src_value;

    	const block = {
    		c: function create() {
    			img = element("img");
    			attr_dev(img, "class", "main main-odd svelte-1cyurjj");
    			if (!src_url_equal(img.src, img_src_value = /*imgurl1*/ ctx[3])) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "project");
    			add_location(img, file$7, 63, 18, 2636);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, img, anchor);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(img);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2.name,
    		type: "if",
    		source: "(63:16) {#if url === \\\"\\\"}",
    		ctx
    	});

    	return block;
    }

    // (42:16) {:else}
    function create_else_block$5(ctx) {
    	let a;
    	let img;
    	let img_src_value;

    	const block = {
    		c: function create() {
    			a = element("a");
    			img = element("img");
    			attr_dev(img, "class", "main svelte-1cyurjj");
    			if (!src_url_equal(img.src, img_src_value = /*imgurl1*/ ctx[3])) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "project");
    			add_location(img, file$7, 43, 20, 1847);
    			attr_dev(a, "href", /*url*/ ctx[5]);
    			attr_dev(a, "class", "svelte-1cyurjj");
    			add_location(a, file$7, 42, 18, 1811);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, a, anchor);
    			append_dev(a, img);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(a);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$5.name,
    		type: "else",
    		source: "(42:16) {:else}",
    		ctx
    	});

    	return block;
    }

    // (40:16) {#if url === ""}
    function create_if_block_1$2(ctx) {
    	let img;
    	let img_src_value;

    	const block = {
    		c: function create() {
    			img = element("img");
    			attr_dev(img, "class", "main svelte-1cyurjj");
    			if (!src_url_equal(img.src, img_src_value = /*imgurl1*/ ctx[3])) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "project");
    			add_location(img, file$7, 40, 18, 1718);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, img, anchor);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(img);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$2.name,
    		type: "if",
    		source: "(40:16) {#if url === \\\"\\\"}",
    		ctx
    	});

    	return block;
    }

    // (35:6) {#each projList as { title, imgurl1, imgurl2, url, text, techstack }
    function create_each_block$2(ctx) {
    	let current_block_type_index;
    	let if_block;
    	let t;
    	let br0;
    	let br1;
    	let current;
    	const if_block_creators = [create_if_block$7, create_else_block_1];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*index*/ ctx[9] % 2 === 0) return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block = {
    		c: function create() {
    			if_block.c();
    			t = space();
    			br0 = element("br");
    			br1 = element("br");
    			add_location(br0, file$7, 74, 8, 3038);
    			add_location(br1, file$7, 74, 14, 3044);
    		},
    		m: function mount(target, anchor) {
    			if_blocks[current_block_type_index].m(target, anchor);
    			insert_dev(target, t, anchor);
    			insert_dev(target, br0, anchor);
    			insert_dev(target, br1, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if_block.p(ctx, dirty);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if_blocks[current_block_type_index].d(detaching);
    			if (detaching) detach_dev(t);
    			if (detaching) detach_dev(br0);
    			if (detaching) detach_dev(br1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$2.name,
    		type: "each",
    		source: "(35:6) {#each projList as { title, imgurl1, imgurl2, url, text, techstack }",
    		ctx
    	});

    	return block;
    }

    // (34:4) <SimpleGrid cols={1}>
    function create_default_slot$2(ctx) {
    	let each_1_anchor;
    	let current;
    	let each_value = /*projList*/ ctx[0];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$2(get_each_context$2(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			each_1_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(target, anchor);
    			}

    			insert_dev(target, each_1_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*projList*/ 1) {
    				each_value = /*projList*/ ctx[0];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$2(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block$2(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach_dev(each_1_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$2.name,
    		type: "slot",
    		source: "(34:4) <SimpleGrid cols={1}>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$8(ctx) {
    	let div1;
    	let h1;
    	let t1;
    	let div0;
    	let simplegrid;
    	let current;

    	simplegrid = new SimpleGrid$1({
    			props: {
    				cols: 1,
    				$$slots: { default: [create_default_slot$2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			h1 = element("h1");
    			h1.textContent = "Projects";
    			t1 = space();
    			div0 = element("div");
    			create_component(simplegrid.$$.fragment);
    			attr_dev(h1, "class", "title col-md-9");
    			add_location(h1, file$7, 31, 2, 1252);
    			attr_dev(div0, "class", "projects container-fluid col-md-9 svelte-1cyurjj");
    			add_location(div0, file$7, 32, 2, 1296);
    			attr_dev(div1, "id", "projects");
    			attr_dev(div1, "class", "container-fluid col-sm-10 offset-sm-1 svelte-1cyurjj");
    			add_location(div1, file$7, 30, 0, 1183);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, h1);
    			append_dev(div1, t1);
    			append_dev(div1, div0);
    			mount_component(simplegrid, div0, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const simplegrid_changes = {};

    			if (dirty & /*$$scope*/ 1024) {
    				simplegrid_changes.$$scope = { dirty, ctx };
    			}

    			simplegrid.$set(simplegrid_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(simplegrid.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(simplegrid.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			destroy_component(simplegrid);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$8.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$8($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('_04_Projects', slots, []);

    	class Project {
    		constructor(title, imgurl1, imgurl2, url, text, techstack) {
    			Object.assign(this, {
    				title,
    				imgurl1,
    				imgurl2,
    				url,
    				text,
    				techstack
    			});
    		}
    	}

    	let projList = [
    		new Project("SoulDog", "images/04-project/souldog.PNG", "images/04-project/souldogcard.PNG", "https://souldog.herokuapp.com", 'Webapp linked to database designed to match abandoned dogs with new dog owners. Features include account creation, Google authentication, search, and posting. Awarded "top project of the class" in CS348: Database Systems.', ["Javascript", "React", "Node.JS", "Knex JS", "SQL"]),
    		new Project("Wumpus World", "images/04-project/wumpus.PNG", "images/04-project/wumpuscard.PNG", "", "Modeled rpg-like problem using reinforcement learning algorithms such as Q-Learning and SARSA. Each algorithm was paired with one strategy (e.g. greedy, softmax, etc...) to find the best combination for the problem.", ["Python"])
    	];

    	const writable_props = [];

    	Object_1.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<_04_Projects> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		CardProject,
    		SimpleGrid: SimpleGrid$1,
    		Project,
    		projList
    	});

    	$$self.$inject_state = $$props => {
    		if ('projList' in $$props) $$invalidate(0, projList = $$props.projList);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [projList];
    }

    class _04_Projects extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$8, create_fragment$8, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "_04_Projects",
    			options,
    			id: create_fragment$8.name
    		});
    	}
    }

    /* src\components\05-Contact\ContactDesktop.svelte generated by Svelte v3.49.0 */

    const { window: window_1$1 } = globals;
    const file$6 = "src\\components\\05-Contact\\ContactDesktop.svelte";

    function get_each_context$1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[14] = list[i];
    	return child_ctx;
    }

    // (93:4) {:else}
    function create_else_block$4(ctx) {
    	let img;
    	let img_src_value;

    	const block = {
    		c: function create() {
    			img = element("img");
    			attr_dev(img, "id", "parallax-" + /*layer*/ ctx[14]);
    			set_style(img, "transform", "translateY(" + Math.max(-/*contactYOffset*/ ctx[1], /*imgHeight*/ ctx[5] * /*layer*/ ctx[14] / (/*layers*/ ctx[7].length - 1) - /*yScroll*/ ctx[4] * (1 + /*offsetRatio*/ ctx[6]) * /*layer*/ ctx[14] / (/*layers*/ ctx[7].length - 1)) + "px)");
    			if (!src_url_equal(img.src, img_src_value = "images/intro/0" + /*layer*/ ctx[14] + ".png")) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "parallax layer " + /*layer*/ ctx[14]);
    			attr_dev(img, "height", /*containerHeight*/ ctx[0]);
    			attr_dev(img, "class", "svelte-88tktz");
    			add_location(img, file$6, 93, 6, 2749);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, img, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*contactYOffset, imgHeight, yScroll, offsetRatio*/ 114) {
    				set_style(img, "transform", "translateY(" + Math.max(-/*contactYOffset*/ ctx[1], /*imgHeight*/ ctx[5] * /*layer*/ ctx[14] / (/*layers*/ ctx[7].length - 1) - /*yScroll*/ ctx[4] * (1 + /*offsetRatio*/ ctx[6]) * /*layer*/ ctx[14] / (/*layers*/ ctx[7].length - 1)) + "px)");
    			}

    			if (dirty & /*containerHeight*/ 1) {
    				attr_dev(img, "height", /*containerHeight*/ ctx[0]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(img);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$4.name,
    		type: "else",
    		source: "(93:4) {:else}",
    		ctx
    	});

    	return block;
    }

    // (81:25) 
    function create_if_block_1$1(ctx) {
    	let img;
    	let img_src_value;

    	const block = {
    		c: function create() {
    			img = element("img");
    			attr_dev(img, "id", "parallax-" + /*layer*/ ctx[14]);
    			set_style(img, "transform", "translateY(" + Math.max(-/*contactYOffset*/ ctx[1], /*imgHeight*/ ctx[5] * /*layer*/ ctx[14] / (/*layers*/ ctx[7].length - 1) - /*yScroll*/ ctx[4] * (1 + /*offsetRatio*/ ctx[6]) * /*layer*/ ctx[14] / (/*layers*/ ctx[7].length - 1)) + "px)");
    			if (!src_url_equal(img.src, img_src_value = "images/intro/00" + /*layer*/ ctx[14] + ".png")) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "parallax layer " + /*layer*/ ctx[14]);
    			attr_dev(img, "height", /*containerHeight*/ ctx[0]);
    			attr_dev(img, "class", "svelte-88tktz");
    			add_location(img, file$6, 81, 6, 2348);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, img, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*contactYOffset, imgHeight, yScroll, offsetRatio*/ 114) {
    				set_style(img, "transform", "translateY(" + Math.max(-/*contactYOffset*/ ctx[1], /*imgHeight*/ ctx[5] * /*layer*/ ctx[14] / (/*layers*/ ctx[7].length - 1) - /*yScroll*/ ctx[4] * (1 + /*offsetRatio*/ ctx[6]) * /*layer*/ ctx[14] / (/*layers*/ ctx[7].length - 1)) + "px)");
    			}

    			if (dirty & /*containerHeight*/ 1) {
    				attr_dev(img, "height", /*containerHeight*/ ctx[0]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(img);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$1.name,
    		type: "if",
    		source: "(81:25) ",
    		ctx
    	});

    	return block;
    }

    // (42:4) {#if layer === textLayer}
    function create_if_block$6(ctx) {
    	let div6;
    	let div0;
    	let t0_value = /*contactInfo*/ ctx[2].preamble + "";
    	let t0;
    	let t1;
    	let div1;
    	let texttype;
    	let t2;
    	let div2;
    	let t3_value = /*contactInfo*/ ctx[2].description + "";
    	let t3;
    	let t4;
    	let div5;
    	let div3;
    	let a0;
    	let i;
    	let t5;
    	let div4;
    	let a1;
    	let button;
    	let a1_href_value;
    	let t7;
    	let div6_height_value;
    	let current;

    	texttype = new TextType({
    			props: {
    				texts: /*contactInfo*/ ctx[2].texts,
    				delay: 100,
    				num_loops: 999,
    				repeat_n_words: 1,
    				blinker_iter_count: "infinite"
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div6 = element("div");
    			div0 = element("div");
    			t0 = text(t0_value);
    			t1 = space();
    			div1 = element("div");
    			create_component(texttype.$$.fragment);
    			t2 = space();
    			div2 = element("div");
    			t3 = text(t3_value);
    			t4 = space();
    			div5 = element("div");
    			div3 = element("div");
    			a0 = element("a");
    			i = element("i");
    			t5 = space();
    			div4 = element("div");
    			a1 = element("a");
    			button = element("button");
    			button.textContent = "Say Hello";
    			t7 = space();
    			attr_dev(div0, "class", "textLayer-preamble svelte-88tktz");
    			add_location(div0, file$6, 51, 8, 1308);
    			attr_dev(div1, "class", "textLayer-title svelte-88tktz");
    			add_location(div1, file$6, 52, 8, 1378);
    			attr_dev(div2, "class", "textLayer-description svelte-88tktz");
    			add_location(div2, file$6, 61, 8, 1638);
    			attr_dev(i, "class", "fa-brands fa-linkedin fa-md");
    			add_location(i, file$6, 67, 14, 1904);
    			attr_dev(a0, "href", "https://www.linkedin.com/in/tony-k-kwok/");
    			attr_dev(a0, "class", "svelte-88tktz");
    			add_location(a0, file$6, 66, 12, 1837);
    			attr_dev(div3, "class", "linkedin-container col-md-3 svelte-88tktz");
    			add_location(div3, file$6, 65, 10, 1782);
    			attr_dev(button, "class", "btn btn-grad btn-lg svelte-88tktz");
    			add_location(button, file$6, 75, 14, 2193);
    			attr_dev(a1, "href", a1_href_value = "mailto:tnrzk13@gmail.com?subject=" + /*contactInfo*/ ctx[2].subject);
    			attr_dev(a1, "id", "emailLink");
    			attr_dev(a1, "class", "svelte-88tktz");
    			add_location(a1, file$6, 71, 12, 2053);
    			attr_dev(div4, "class", "button-container-column col-md-9");
    			add_location(div4, file$6, 70, 10, 1993);
    			attr_dev(div5, "class", "button-container row");
    			add_location(div5, file$6, 64, 8, 1736);
    			attr_dev(div6, "id", "parallax-" + /*layer*/ ctx[14]);
    			attr_dev(div6, "class", "textLayer svelte-88tktz");
    			set_style(div6, "transform", "translateY(" + Math.max(-/*contactYOffset*/ ctx[1], /*imgHeight*/ ctx[5] - /*yScroll*/ ctx[4]) + "px)");
    			attr_dev(div6, "height", div6_height_value = "" + (/*containerHeight*/ ctx[0] + "px"));
    			add_location(div6, file$6, 42, 6, 1065);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div6, anchor);
    			append_dev(div6, div0);
    			append_dev(div0, t0);
    			append_dev(div6, t1);
    			append_dev(div6, div1);
    			mount_component(texttype, div1, null);
    			append_dev(div6, t2);
    			append_dev(div6, div2);
    			append_dev(div2, t3);
    			append_dev(div6, t4);
    			append_dev(div6, div5);
    			append_dev(div5, div3);
    			append_dev(div3, a0);
    			append_dev(a0, i);
    			append_dev(div5, t5);
    			append_dev(div5, div4);
    			append_dev(div4, a1);
    			append_dev(a1, button);
    			append_dev(div6, t7);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if ((!current || dirty & /*contactInfo*/ 4) && t0_value !== (t0_value = /*contactInfo*/ ctx[2].preamble + "")) set_data_dev(t0, t0_value);
    			const texttype_changes = {};
    			if (dirty & /*contactInfo*/ 4) texttype_changes.texts = /*contactInfo*/ ctx[2].texts;
    			texttype.$set(texttype_changes);
    			if ((!current || dirty & /*contactInfo*/ 4) && t3_value !== (t3_value = /*contactInfo*/ ctx[2].description + "")) set_data_dev(t3, t3_value);

    			if (!current || dirty & /*contactInfo*/ 4 && a1_href_value !== (a1_href_value = "mailto:tnrzk13@gmail.com?subject=" + /*contactInfo*/ ctx[2].subject)) {
    				attr_dev(a1, "href", a1_href_value);
    			}

    			if (!current || dirty & /*contactYOffset, imgHeight, yScroll*/ 50) {
    				set_style(div6, "transform", "translateY(" + Math.max(-/*contactYOffset*/ ctx[1], /*imgHeight*/ ctx[5] - /*yScroll*/ ctx[4]) + "px)");
    			}

    			if (!current || dirty & /*containerHeight*/ 1 && div6_height_value !== (div6_height_value = "" + (/*containerHeight*/ ctx[0] + "px"))) {
    				attr_dev(div6, "height", div6_height_value);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(texttype.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(texttype.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div6);
    			destroy_component(texttype);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$6.name,
    		type: "if",
    		source: "(42:4) {#if layer === textLayer}",
    		ctx
    	});

    	return block;
    }

    // (41:2) {#each layers as layer}
    function create_each_block$1(ctx) {
    	let current_block_type_index;
    	let if_block;
    	let if_block_anchor;
    	let current;
    	const if_block_creators = [create_if_block$6, create_if_block_1$1, create_else_block$4];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*layer*/ ctx[14] === textLayer) return 0;
    		if (/*layer*/ ctx[14] < 10) return 1;
    		return 2;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block = {
    		c: function create() {
    			if_block.c();
    			if_block_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if_blocks[current_block_type_index].m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if_block.p(ctx, dirty);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if_blocks[current_block_type_index].d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$1.name,
    		type: "each",
    		source: "(41:2) {#each layers as layer}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$7(ctx) {
    	let scrolling = false;

    	let clear_scrolling = () => {
    		scrolling = false;
    	};

    	let scrolling_timeout;
    	let div;
    	let current;
    	let mounted;
    	let dispose;
    	add_render_callback(/*onwindowscroll*/ ctx[9]);
    	let each_value = /*layers*/ ctx[7];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			div = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(div, "class", "parallax-container svelte-88tktz");
    			add_location(div, file$6, 39, 0, 967);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div, null);
    			}

    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(window_1$1, "scroll", () => {
    					scrolling = true;
    					clearTimeout(scrolling_timeout);
    					scrolling_timeout = setTimeout(clear_scrolling, 100);
    					/*onwindowscroll*/ ctx[9]();
    				});

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*y*/ 8 && !scrolling) {
    				scrolling = true;
    				clearTimeout(scrolling_timeout);
    				scrollTo(window_1$1.pageXOffset, /*y*/ ctx[3]);
    				scrolling_timeout = setTimeout(clear_scrolling, 100);
    			}

    			if (dirty & /*layers, Math, contactYOffset, imgHeight, yScroll, containerHeight, contactInfo, textLayer, offsetRatio*/ 247) {
    				each_value = /*layers*/ ctx[7];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$1(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block$1(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(div, null);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_each(each_blocks, detaching);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$7.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    const numLayers = 15;
    const textLayer = 14;

    function instance$7($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('ContactDesktop', slots, []);
    	let { containerHeight, contactYOffset } = $$props;
    	let { contactInfo } = $$props;
    	const layers = [...Array(numLayers).keys()];
    	let texts = ["Get in Touch!"];
    	let contactDiv = document.getElementById("contact");
    	let contactTop, y, yScroll, imgHeight, offsetRatio;
    	let contactHeight;

    	const update = () => {
    		$$invalidate(8, contactTop = contactDiv.offsetTop);
    		contactHeight = contactDiv.offsetHeight;
    		$$invalidate(5, imgHeight = containerHeight - contactYOffset);
    		$$invalidate(6, offsetRatio = contactYOffset / containerHeight);
    		$$invalidate(4, yScroll = Math.max(0, y - contactTop));
    	};

    	onMount(() => {
    		update();
    	});

    	window.onresize = update();
    	const writable_props = ['containerHeight', 'contactYOffset', 'contactInfo'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<ContactDesktop> was created with unknown prop '${key}'`);
    	});

    	function onwindowscroll() {
    		$$invalidate(3, y = window_1$1.pageYOffset);
    	}

    	$$self.$$set = $$props => {
    		if ('containerHeight' in $$props) $$invalidate(0, containerHeight = $$props.containerHeight);
    		if ('contactYOffset' in $$props) $$invalidate(1, contactYOffset = $$props.contactYOffset);
    		if ('contactInfo' in $$props) $$invalidate(2, contactInfo = $$props.contactInfo);
    	};

    	$$self.$capture_state = () => ({
    		onMount,
    		TextType,
    		containerHeight,
    		contactYOffset,
    		contactInfo,
    		numLayers,
    		layers,
    		textLayer,
    		texts,
    		contactDiv,
    		contactTop,
    		y,
    		yScroll,
    		imgHeight,
    		offsetRatio,
    		contactHeight,
    		update
    	});

    	$$self.$inject_state = $$props => {
    		if ('containerHeight' in $$props) $$invalidate(0, containerHeight = $$props.containerHeight);
    		if ('contactYOffset' in $$props) $$invalidate(1, contactYOffset = $$props.contactYOffset);
    		if ('contactInfo' in $$props) $$invalidate(2, contactInfo = $$props.contactInfo);
    		if ('texts' in $$props) texts = $$props.texts;
    		if ('contactDiv' in $$props) contactDiv = $$props.contactDiv;
    		if ('contactTop' in $$props) $$invalidate(8, contactTop = $$props.contactTop);
    		if ('y' in $$props) $$invalidate(3, y = $$props.y);
    		if ('yScroll' in $$props) $$invalidate(4, yScroll = $$props.yScroll);
    		if ('imgHeight' in $$props) $$invalidate(5, imgHeight = $$props.imgHeight);
    		if ('offsetRatio' in $$props) $$invalidate(6, offsetRatio = $$props.offsetRatio);
    		if ('contactHeight' in $$props) contactHeight = $$props.contactHeight;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*y, contactTop*/ 264) {
    			{
    				$$invalidate(4, yScroll = Math.max(0, y - contactTop));
    			} // console.log(contactTop, contactTop + contactHeight, y);
    		}
    	};

    	return [
    		containerHeight,
    		contactYOffset,
    		contactInfo,
    		y,
    		yScroll,
    		imgHeight,
    		offsetRatio,
    		layers,
    		contactTop,
    		onwindowscroll
    	];
    }

    class ContactDesktop extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$7, create_fragment$7, safe_not_equal, {
    			containerHeight: 0,
    			contactYOffset: 1,
    			contactInfo: 2
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "ContactDesktop",
    			options,
    			id: create_fragment$7.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*containerHeight*/ ctx[0] === undefined && !('containerHeight' in props)) {
    			console.warn("<ContactDesktop> was created without expected prop 'containerHeight'");
    		}

    		if (/*contactYOffset*/ ctx[1] === undefined && !('contactYOffset' in props)) {
    			console.warn("<ContactDesktop> was created without expected prop 'contactYOffset'");
    		}

    		if (/*contactInfo*/ ctx[2] === undefined && !('contactInfo' in props)) {
    			console.warn("<ContactDesktop> was created without expected prop 'contactInfo'");
    		}
    	}

    	get containerHeight() {
    		throw new Error("<ContactDesktop>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set containerHeight(value) {
    		throw new Error("<ContactDesktop>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get contactYOffset() {
    		throw new Error("<ContactDesktop>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set contactYOffset(value) {
    		throw new Error("<ContactDesktop>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get contactInfo() {
    		throw new Error("<ContactDesktop>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set contactInfo(value) {
    		throw new Error("<ContactDesktop>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\components\05-Contact\ContactMobile.svelte generated by Svelte v3.49.0 */
    const file$5 = "src\\components\\05-Contact\\ContactMobile.svelte";

    function create_fragment$6(ctx) {
    	let div5;
    	let div4;
    	let div0;
    	let t0_value = /*contactInfo*/ ctx[0].preamble + "";
    	let t0;
    	let t1;
    	let div1;
    	let texttype;
    	let t2;
    	let div2;
    	let t3_value = /*contactInfo*/ ctx[0].description + "";
    	let t3;
    	let t4;
    	let br0;
    	let br1;
    	let t5;
    	let div3;
    	let span0;
    	let a0;
    	let i;
    	let t6;
    	let span1;
    	let a1;
    	let button;
    	let a1_href_value;
    	let current;

    	texttype = new TextType({
    			props: {
    				texts: /*contactInfo*/ ctx[0].texts,
    				delay: 100,
    				num_loops: 999,
    				repeat_n_words: 1,
    				blinker_iter_count: "infinite"
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div5 = element("div");
    			div4 = element("div");
    			div0 = element("div");
    			t0 = text(t0_value);
    			t1 = space();
    			div1 = element("div");
    			create_component(texttype.$$.fragment);
    			t2 = space();
    			div2 = element("div");
    			t3 = text(t3_value);
    			t4 = space();
    			br0 = element("br");
    			br1 = element("br");
    			t5 = space();
    			div3 = element("div");
    			span0 = element("span");
    			a0 = element("a");
    			i = element("i");
    			t6 = space();
    			span1 = element("span");
    			a1 = element("a");
    			button = element("button");
    			button.textContent = "Say Hello";
    			attr_dev(div0, "class", "textLayer-preamble svelte-1s4q2ok");
    			add_location(div0, file$5, 7, 4, 193);
    			attr_dev(div1, "class", "textLayer-title");
    			add_location(div1, file$5, 8, 4, 259);
    			add_location(br0, file$5, 19, 6, 559);
    			add_location(br1, file$5, 19, 12, 565);
    			attr_dev(div2, "class", "textLayer-description svelte-1s4q2ok");
    			add_location(div2, file$5, 17, 4, 483);
    			attr_dev(i, "class", "fa-brands fa-linkedin fa-lg");
    			add_location(i, file$5, 24, 10, 732);
    			attr_dev(a0, "href", "https://www.linkedin.com/in/tony-k-kwok/");
    			attr_dev(a0, "class", "svelte-1s4q2ok");
    			add_location(a0, file$5, 23, 8, 669);
    			attr_dev(span0, "class", "linkedin-container");
    			add_location(span0, file$5, 22, 6, 626);
    			attr_dev(button, "class", "btn btn-grad btn-lg svelte-1s4q2ok");
    			add_location(button, file$5, 32, 10, 975);
    			attr_dev(a1, "href", a1_href_value = "mailto:tnrzk13@gmail.com?subject=" + /*contactInfo*/ ctx[0].subject);
    			attr_dev(a1, "id", "emailLink");
    			attr_dev(a1, "class", "svelte-1s4q2ok");
    			add_location(a1, file$5, 28, 8, 851);
    			attr_dev(span1, "class", "button-container");
    			add_location(span1, file$5, 27, 6, 810);
    			attr_dev(div3, "class", "links-container svelte-1s4q2ok");
    			add_location(div3, file$5, 21, 4, 589);
    			attr_dev(div4, "class", "textLayer col-sm-10 offset-sm-1 svelte-1s4q2ok");
    			add_location(div4, file$5, 6, 2, 142);
    			attr_dev(div5, "id", "contact-mobile-wrapper");
    			attr_dev(div5, "class", "svelte-1s4q2ok");
    			add_location(div5, file$5, 5, 0, 105);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div5, anchor);
    			append_dev(div5, div4);
    			append_dev(div4, div0);
    			append_dev(div0, t0);
    			append_dev(div4, t1);
    			append_dev(div4, div1);
    			mount_component(texttype, div1, null);
    			append_dev(div4, t2);
    			append_dev(div4, div2);
    			append_dev(div2, t3);
    			append_dev(div2, t4);
    			append_dev(div2, br0);
    			append_dev(div2, br1);
    			append_dev(div4, t5);
    			append_dev(div4, div3);
    			append_dev(div3, span0);
    			append_dev(span0, a0);
    			append_dev(a0, i);
    			append_dev(div3, t6);
    			append_dev(div3, span1);
    			append_dev(span1, a1);
    			append_dev(a1, button);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if ((!current || dirty & /*contactInfo*/ 1) && t0_value !== (t0_value = /*contactInfo*/ ctx[0].preamble + "")) set_data_dev(t0, t0_value);
    			const texttype_changes = {};
    			if (dirty & /*contactInfo*/ 1) texttype_changes.texts = /*contactInfo*/ ctx[0].texts;
    			texttype.$set(texttype_changes);
    			if ((!current || dirty & /*contactInfo*/ 1) && t3_value !== (t3_value = /*contactInfo*/ ctx[0].description + "")) set_data_dev(t3, t3_value);

    			if (!current || dirty & /*contactInfo*/ 1 && a1_href_value !== (a1_href_value = "mailto:tnrzk13@gmail.com?subject=" + /*contactInfo*/ ctx[0].subject)) {
    				attr_dev(a1, "href", a1_href_value);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(texttype.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(texttype.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div5);
    			destroy_component(texttype);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$6.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$6($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('ContactMobile', slots, []);
    	let { contactInfo } = $$props;
    	const writable_props = ['contactInfo'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<ContactMobile> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('contactInfo' in $$props) $$invalidate(0, contactInfo = $$props.contactInfo);
    	};

    	$$self.$capture_state = () => ({ contactInfo, TextType });

    	$$self.$inject_state = $$props => {
    		if ('contactInfo' in $$props) $$invalidate(0, contactInfo = $$props.contactInfo);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [contactInfo];
    }

    class ContactMobile extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$6, create_fragment$6, safe_not_equal, { contactInfo: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "ContactMobile",
    			options,
    			id: create_fragment$6.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*contactInfo*/ ctx[0] === undefined && !('contactInfo' in props)) {
    			console.warn("<ContactMobile> was created without expected prop 'contactInfo'");
    		}
    	}

    	get contactInfo() {
    		throw new Error("<ContactMobile>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set contactInfo(value) {
    		throw new Error("<ContactMobile>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\components\05-Contact\ContactWrapper.svelte generated by Svelte v3.49.0 */
    const file$4 = "src\\components\\05-Contact\\ContactWrapper.svelte";

    // (14:0) {#if y > Math.max(0, pageHalfDown)}
    function create_if_block$5(ctx) {
    	let current_block_type_index;
    	let if_block;
    	let if_block_anchor;
    	let current;
    	const if_block_creators = [create_if_block_1, create_else_block$3];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*boolMobileView*/ ctx[3]) return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block = {
    		c: function create() {
    			if_block.c();
    			if_block_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if_blocks[current_block_type_index].m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				} else {
    					if_block.p(ctx, dirty);
    				}

    				transition_in(if_block, 1);
    				if_block.m(if_block_anchor.parentNode, if_block_anchor);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if_blocks[current_block_type_index].d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$5.name,
    		type: "if",
    		source: "(14:0) {#if y > Math.max(0, pageHalfDown)}",
    		ctx
    	});

    	return block;
    }

    // (19:2) {:else}
    function create_else_block$3(ctx) {
    	let div0;
    	let t;
    	let div1;
    	let contact;
    	let current;

    	contact = new ContactDesktop({
    			props: {
    				containerHeight: /*containerHeight*/ ctx[1],
    				contactYOffset: /*contactYOffset*/ ctx[4],
    				contactInfo: /*contactInfo*/ ctx[2]
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div0 = element("div");
    			t = space();
    			div1 = element("div");
    			create_component(contact.$$.fragment);
    			attr_dev(div0, "class", "background-extension svelte-yk6can");
    			set_style(div0, "bottom", /*contactHeight*/ ctx[0] + "px");
    			add_location(div0, file$4, 19, 4, 485);
    			attr_dev(div1, "id", "contact-wrapper");
    			set_style(div1, "transform", "translateY(" + /*contactYOffset*/ ctx[4] + "px)");
    			attr_dev(div1, "class", "svelte-yk6can");
    			add_location(div1, file$4, 20, 4, 562);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div0, anchor);
    			insert_dev(target, t, anchor);
    			insert_dev(target, div1, anchor);
    			mount_component(contact, div1, null);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (!current || dirty & /*contactHeight*/ 1) {
    				set_style(div0, "bottom", /*contactHeight*/ ctx[0] + "px");
    			}

    			const contact_changes = {};
    			if (dirty & /*containerHeight*/ 2) contact_changes.containerHeight = /*containerHeight*/ ctx[1];
    			if (dirty & /*contactYOffset*/ 16) contact_changes.contactYOffset = /*contactYOffset*/ ctx[4];
    			if (dirty & /*contactInfo*/ 4) contact_changes.contactInfo = /*contactInfo*/ ctx[2];
    			contact.$set(contact_changes);

    			if (!current || dirty & /*contactYOffset*/ 16) {
    				set_style(div1, "transform", "translateY(" + /*contactYOffset*/ ctx[4] + "px)");
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(contact.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(contact.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div0);
    			if (detaching) detach_dev(t);
    			if (detaching) detach_dev(div1);
    			destroy_component(contact);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$3.name,
    		type: "else",
    		source: "(19:2) {:else}",
    		ctx
    	});

    	return block;
    }

    // (15:2) {#if boolMobileView}
    function create_if_block_1(ctx) {
    	let div;
    	let contactmobile;
    	let current;

    	contactmobile = new ContactMobile({
    			props: { contactInfo: /*contactInfo*/ ctx[2] },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(contactmobile.$$.fragment);
    			attr_dev(div, "id", "contact-wrapper");
    			attr_dev(div, "class", "svelte-yk6can");
    			add_location(div, file$4, 15, 4, 391);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			mount_component(contactmobile, div, null);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const contactmobile_changes = {};
    			if (dirty & /*contactInfo*/ 4) contactmobile_changes.contactInfo = /*contactInfo*/ ctx[2];
    			contactmobile.$set(contactmobile_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(contactmobile.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(contactmobile.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(contactmobile);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1.name,
    		type: "if",
    		source: "(15:2) {#if boolMobileView}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$5(ctx) {
    	let scrolling = false;

    	let clear_scrolling = () => {
    		scrolling = false;
    	};

    	let scrolling_timeout;
    	let show_if = /*y*/ ctx[6] > Math.max(0, /*pageHalfDown*/ ctx[5]);
    	let if_block_anchor;
    	let current;
    	let mounted;
    	let dispose;
    	add_render_callback(/*onwindowscroll*/ ctx[7]);
    	let if_block = show_if && create_if_block$5(ctx);

    	const block = {
    		c: function create() {
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(window, "scroll", () => {
    					scrolling = true;
    					clearTimeout(scrolling_timeout);
    					scrolling_timeout = setTimeout(clear_scrolling, 100);
    					/*onwindowscroll*/ ctx[7]();
    				});

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*y*/ 64 && !scrolling) {
    				scrolling = true;
    				clearTimeout(scrolling_timeout);
    				scrollTo(window.pageXOffset, /*y*/ ctx[6]);
    				scrolling_timeout = setTimeout(clear_scrolling, 100);
    			}

    			if (dirty & /*y, pageHalfDown*/ 96) show_if = /*y*/ ctx[6] > Math.max(0, /*pageHalfDown*/ ctx[5]);

    			if (show_if) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty & /*y, pageHalfDown*/ 96) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block$5(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$5.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$5($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('ContactWrapper', slots, []);
    	let { contactHeight, containerHeight, contactInfo, boolMobileView } = $$props;
    	let { contactYOffset = 100 } = $$props;
    	let { pageHalfDown = 1000 } = $$props;
    	let y;

    	const writable_props = [
    		'contactHeight',
    		'containerHeight',
    		'contactInfo',
    		'boolMobileView',
    		'contactYOffset',
    		'pageHalfDown'
    	];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<ContactWrapper> was created with unknown prop '${key}'`);
    	});

    	function onwindowscroll() {
    		$$invalidate(6, y = window.pageYOffset);
    	}

    	$$self.$$set = $$props => {
    		if ('contactHeight' in $$props) $$invalidate(0, contactHeight = $$props.contactHeight);
    		if ('containerHeight' in $$props) $$invalidate(1, containerHeight = $$props.containerHeight);
    		if ('contactInfo' in $$props) $$invalidate(2, contactInfo = $$props.contactInfo);
    		if ('boolMobileView' in $$props) $$invalidate(3, boolMobileView = $$props.boolMobileView);
    		if ('contactYOffset' in $$props) $$invalidate(4, contactYOffset = $$props.contactYOffset);
    		if ('pageHalfDown' in $$props) $$invalidate(5, pageHalfDown = $$props.pageHalfDown);
    	};

    	$$self.$capture_state = () => ({
    		Contact: ContactDesktop,
    		ContactMobile,
    		contactHeight,
    		containerHeight,
    		contactInfo,
    		boolMobileView,
    		contactYOffset,
    		pageHalfDown,
    		y
    	});

    	$$self.$inject_state = $$props => {
    		if ('contactHeight' in $$props) $$invalidate(0, contactHeight = $$props.contactHeight);
    		if ('containerHeight' in $$props) $$invalidate(1, containerHeight = $$props.containerHeight);
    		if ('contactInfo' in $$props) $$invalidate(2, contactInfo = $$props.contactInfo);
    		if ('boolMobileView' in $$props) $$invalidate(3, boolMobileView = $$props.boolMobileView);
    		if ('contactYOffset' in $$props) $$invalidate(4, contactYOffset = $$props.contactYOffset);
    		if ('pageHalfDown' in $$props) $$invalidate(5, pageHalfDown = $$props.pageHalfDown);
    		if ('y' in $$props) $$invalidate(6, y = $$props.y);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		contactHeight,
    		containerHeight,
    		contactInfo,
    		boolMobileView,
    		contactYOffset,
    		pageHalfDown,
    		y,
    		onwindowscroll
    	];
    }

    class ContactWrapper extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$5, create_fragment$5, safe_not_equal, {
    			contactHeight: 0,
    			containerHeight: 1,
    			contactInfo: 2,
    			boolMobileView: 3,
    			contactYOffset: 4,
    			pageHalfDown: 5
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "ContactWrapper",
    			options,
    			id: create_fragment$5.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*contactHeight*/ ctx[0] === undefined && !('contactHeight' in props)) {
    			console.warn("<ContactWrapper> was created without expected prop 'contactHeight'");
    		}

    		if (/*containerHeight*/ ctx[1] === undefined && !('containerHeight' in props)) {
    			console.warn("<ContactWrapper> was created without expected prop 'containerHeight'");
    		}

    		if (/*contactInfo*/ ctx[2] === undefined && !('contactInfo' in props)) {
    			console.warn("<ContactWrapper> was created without expected prop 'contactInfo'");
    		}

    		if (/*boolMobileView*/ ctx[3] === undefined && !('boolMobileView' in props)) {
    			console.warn("<ContactWrapper> was created without expected prop 'boolMobileView'");
    		}
    	}

    	get contactHeight() {
    		throw new Error("<ContactWrapper>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set contactHeight(value) {
    		throw new Error("<ContactWrapper>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get containerHeight() {
    		throw new Error("<ContactWrapper>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set containerHeight(value) {
    		throw new Error("<ContactWrapper>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get contactInfo() {
    		throw new Error("<ContactWrapper>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set contactInfo(value) {
    		throw new Error("<ContactWrapper>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get boolMobileView() {
    		throw new Error("<ContactWrapper>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set boolMobileView(value) {
    		throw new Error("<ContactWrapper>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get contactYOffset() {
    		throw new Error("<ContactWrapper>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set contactYOffset(value) {
    		throw new Error("<ContactWrapper>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get pageHalfDown() {
    		throw new Error("<ContactWrapper>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set pageHalfDown(value) {
    		throw new Error("<ContactWrapper>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\components\Navbar.svelte generated by Svelte v3.49.0 */
    const file$3 = "src\\components\\Navbar.svelte";

    // (17:0) {#if showNavBar}
    function create_if_block$4(ctx) {
    	let nav;
    	let a0;
    	let img;
    	let img_src_value;
    	let t0;
    	let button0;
    	let span;
    	let t1;
    	let div;
    	let ul;
    	let a1;
    	let t3;
    	let a2;
    	let t5;
    	let a3;
    	let t7;
    	let a4;
    	let t9;
    	let a5;
    	let button1;
    	let nav_transition;
    	let current;

    	const block = {
    		c: function create() {
    			nav = element("nav");
    			a0 = element("a");
    			img = element("img");
    			t0 = space();
    			button0 = element("button");
    			span = element("span");
    			t1 = space();
    			div = element("div");
    			ul = element("ul");
    			a1 = element("a");
    			a1.textContent = "About";
    			t3 = space();
    			a2 = element("a");
    			a2.textContent = "Career";
    			t5 = space();
    			a3 = element("a");
    			a3.textContent = "Projects";
    			t7 = space();
    			a4 = element("a");
    			a4.textContent = "Contact";
    			t9 = space();
    			a5 = element("a");
    			button1 = element("button");
    			button1.textContent = "Resume";
    			if (!src_url_equal(img.src, img_src_value = "images/navbar/gorilla.png")) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "logo gorilla");
    			attr_dev(img, "class", "svelte-1sflfgp");
    			add_location(img, file$3, 23, 7, 464);
    			attr_dev(a0, "class", "navbar-brand");
    			attr_dev(a0, "href", ".");
    			add_location(a0, file$3, 22, 4, 423);
    			attr_dev(span, "class", "navbar-toggler-icon");
    			add_location(span, file$3, 34, 6, 773);
    			attr_dev(button0, "class", "navbar-toggler");
    			attr_dev(button0, "type", "button");
    			attr_dev(button0, "data-toggle", "collapse");
    			attr_dev(button0, "data-target", "#navbarNav");
    			attr_dev(button0, "aria-controls", "navbarNav");
    			attr_dev(button0, "aria-expanded", "false");
    			attr_dev(button0, "aria-label", "Toggle navigation");
    			add_location(button0, file$3, 25, 4, 538);
    			attr_dev(a1, "class", "nav-item nav-link");
    			attr_dev(a1, "href", "#aboutme");
    			add_location(a1, file$3, 38, 8, 932);
    			attr_dev(a2, "class", "nav-item nav-link");
    			attr_dev(a2, "href", "#career");
    			add_location(a2, file$3, 39, 8, 996);
    			attr_dev(a3, "class", "nav-item nav-link");
    			attr_dev(a3, "href", "#projects");
    			add_location(a3, file$3, 40, 8, 1060);
    			attr_dev(a4, "class", "nav-item nav-link");
    			attr_dev(a4, "href", "#contact");
    			add_location(a4, file$3, 41, 8, 1128);
    			attr_dev(button1, "class", "btn btn-grad svelte-1sflfgp");
    			add_location(button1, file$3, 47, 10, 1344);
    			attr_dev(a5, "class", "download-container svelte-1sflfgp");
    			attr_dev(a5, "href", "download/Resume 2022 - Blue.pdf");
    			attr_dev(a5, "download", "TonyKwokResume");
    			add_location(a5, file$3, 42, 8, 1194);
    			attr_dev(ul, "class", "navbar-nav ms-auto");
    			add_location(ul, file$3, 37, 6, 891);
    			attr_dev(div, "class", "collapse navbar-collapse");
    			attr_dev(div, "id", "navbarNav");
    			add_location(div, file$3, 36, 4, 830);
    			attr_dev(nav, "id", "navbar");
    			attr_dev(nav, "class", "navbar navbar-expand-lg navbar-dark fixed-top svelte-1sflfgp");
    			add_location(nav, file$3, 17, 2, 311);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, nav, anchor);
    			append_dev(nav, a0);
    			append_dev(a0, img);
    			append_dev(nav, t0);
    			append_dev(nav, button0);
    			append_dev(button0, span);
    			append_dev(nav, t1);
    			append_dev(nav, div);
    			append_dev(div, ul);
    			append_dev(ul, a1);
    			append_dev(ul, t3);
    			append_dev(ul, a2);
    			append_dev(ul, t5);
    			append_dev(ul, a3);
    			append_dev(ul, t7);
    			append_dev(ul, a4);
    			append_dev(ul, t9);
    			append_dev(ul, a5);
    			append_dev(a5, button1);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;

    			add_render_callback(() => {
    				if (!nav_transition) nav_transition = create_bidirectional_transition(nav, fade, {}, true);
    				nav_transition.run(1);
    			});

    			current = true;
    		},
    		o: function outro(local) {
    			if (!nav_transition) nav_transition = create_bidirectional_transition(nav, fade, {}, false);
    			nav_transition.run(0);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(nav);
    			if (detaching && nav_transition) nav_transition.end();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$4.name,
    		type: "if",
    		source: "(17:0) {#if showNavBar}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$4(ctx) {
    	let scrolling = false;

    	let clear_scrolling = () => {
    		scrolling = false;
    	};

    	let scrolling_timeout;
    	let if_block_anchor;
    	let current;
    	let mounted;
    	let dispose;
    	add_render_callback(/*onwindowscroll*/ ctx[3]);
    	let if_block = /*showNavBar*/ ctx[1] && create_if_block$4(ctx);

    	const block = {
    		c: function create() {
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(window, "scroll", () => {
    					scrolling = true;
    					clearTimeout(scrolling_timeout);
    					scrolling_timeout = setTimeout(clear_scrolling, 100);
    					/*onwindowscroll*/ ctx[3]();
    				});

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*y*/ 1 && !scrolling) {
    				scrolling = true;
    				clearTimeout(scrolling_timeout);
    				scrollTo(window.pageXOffset, /*y*/ ctx[0]);
    				scrolling_timeout = setTimeout(clear_scrolling, 100);
    			}

    			if (/*showNavBar*/ ctx[1]) {
    				if (if_block) {
    					if (dirty & /*showNavBar*/ 2) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block$4(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$4.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$4($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Navbar', slots, []);
    	let { titleHeight } = $$props;
    	let y; //The window scrolling
    	let showNavBar = false;
    	const writable_props = ['titleHeight'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Navbar> was created with unknown prop '${key}'`);
    	});

    	function onwindowscroll() {
    		$$invalidate(0, y = window.pageYOffset);
    	}

    	$$self.$$set = $$props => {
    		if ('titleHeight' in $$props) $$invalidate(2, titleHeight = $$props.titleHeight);
    	};

    	$$self.$capture_state = () => ({ fade, titleHeight, y, showNavBar });

    	$$self.$inject_state = $$props => {
    		if ('titleHeight' in $$props) $$invalidate(2, titleHeight = $$props.titleHeight);
    		if ('y' in $$props) $$invalidate(0, y = $$props.y);
    		if ('showNavBar' in $$props) $$invalidate(1, showNavBar = $$props.showNavBar);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*y, titleHeight*/ 5) {
    			{
    				if (y > titleHeight - 1) $$invalidate(1, showNavBar = true); else $$invalidate(1, showNavBar = false);
    			}
    		}
    	};

    	return [y, showNavBar, titleHeight, onwindowscroll];
    }

    class Navbar extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$4, create_fragment$4, safe_not_equal, { titleHeight: 2 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Navbar",
    			options,
    			id: create_fragment$4.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*titleHeight*/ ctx[2] === undefined && !('titleHeight' in props)) {
    			console.warn("<Navbar> was created without expected prop 'titleHeight'");
    		}
    	}

    	get titleHeight() {
    		throw new Error("<Navbar>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set titleHeight(value) {
    		throw new Error("<Navbar>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\components\Loader.svelte generated by Svelte v3.49.0 */
    const file$2 = "src\\components\\Loader.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[3] = list[i];
    	child_ctx[5] = i;
    	return child_ctx;
    }

    // (14:0) {#if boolShowLoadingScreen}
    function create_if_block$3(ctx) {
    	let div1;
    	let div0;
    	let div1_transition;
    	let current;
    	let each_value = /*loadingText*/ ctx[1];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(div0, "class", "loading-text container-fluid svelte-v1if7c");
    			add_location(div0, file$2, 15, 4, 443);
    			attr_dev(div1, "id", "loading-screen");
    			attr_dev(div1, "class", "loading container-fluid svelte-v1if7c");
    			add_location(div1, file$2, 14, 2, 364);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div0, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*loadingTextLength, loadingText*/ 6) {
    				each_value = /*loadingText*/ ctx[1];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(div0, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			add_render_callback(() => {
    				if (!div1_transition) div1_transition = create_bidirectional_transition(div1, fade, {}, true);
    				div1_transition.run(1);
    			});

    			current = true;
    		},
    		o: function outro(local) {
    			if (!div1_transition) div1_transition = create_bidirectional_transition(div1, fade, {}, false);
    			div1_transition.run(0);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			destroy_each(each_blocks, detaching);
    			if (detaching && div1_transition) div1_transition.end();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$3.name,
    		type: "if",
    		source: "(14:0) {#if boolShowLoadingScreen}",
    		ctx
    	});

    	return block;
    }

    // (17:6) {#each loadingText as letter, index}
    function create_each_block(ctx) {
    	let span;
    	let t_value = /*letter*/ ctx[3] + "";
    	let t;

    	const block = {
    		c: function create() {
    			span = element("span");
    			t = text(t_value);
    			set_style(span, "animation-delay", /*index*/ ctx[5] / /*loadingTextLength*/ ctx[2] + "s");
    			attr_dev(span, "class", "svelte-v1if7c");
    			add_location(span, file$2, 17, 8, 539);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    			append_dev(span, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*loadingText*/ 2 && t_value !== (t_value = /*letter*/ ctx[3] + "")) set_data_dev(t, t_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(17:6) {#each loadingText as letter, index}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$3(ctx) {
    	let if_block_anchor;
    	let current;
    	let if_block = /*boolShowLoadingScreen*/ ctx[0] && create_if_block$3(ctx);

    	const block = {
    		c: function create() {
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*boolShowLoadingScreen*/ ctx[0]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty & /*boolShowLoadingScreen*/ 1) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block$3(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$3($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Loader', slots, []);
    	let loadingText = "Tony Kwok";
    	loadingText = loadingText.toUpperCase().split("");
    	let loadingTextLength = loadingText.length;
    	let { boolShowLoadingScreen } = $$props;

    	window.onload = () => {
    		setTimeout($$invalidate(0, boolShowLoadingScreen = false), 3000);
    	};

    	const writable_props = ['boolShowLoadingScreen'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Loader> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('boolShowLoadingScreen' in $$props) $$invalidate(0, boolShowLoadingScreen = $$props.boolShowLoadingScreen);
    	};

    	$$self.$capture_state = () => ({
    		fade,
    		loadingText,
    		loadingTextLength,
    		boolShowLoadingScreen
    	});

    	$$self.$inject_state = $$props => {
    		if ('loadingText' in $$props) $$invalidate(1, loadingText = $$props.loadingText);
    		if ('loadingTextLength' in $$props) $$invalidate(2, loadingTextLength = $$props.loadingTextLength);
    		if ('boolShowLoadingScreen' in $$props) $$invalidate(0, boolShowLoadingScreen = $$props.boolShowLoadingScreen);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [boolShowLoadingScreen, loadingText, loadingTextLength];
    }

    class Loader extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, { boolShowLoadingScreen: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Loader",
    			options,
    			id: create_fragment$3.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*boolShowLoadingScreen*/ ctx[0] === undefined && !('boolShowLoadingScreen' in props)) {
    			console.warn("<Loader> was created without expected prop 'boolShowLoadingScreen'");
    		}
    	}

    	get boolShowLoadingScreen() {
    		throw new Error("<Loader>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set boolShowLoadingScreen(value) {
    		throw new Error("<Loader>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules\saos\src\Saos.svelte generated by Svelte v3.49.0 */
    const file$1 = "node_modules\\saos\\src\\Saos.svelte";

    // (75:2) {:else}
    function create_else_block$2(ctx) {
    	let div;
    	let div_style_value;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[10].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[9], null);

    	const block = {
    		c: function create() {
    			div = element("div");
    			if (default_slot) default_slot.c();
    			attr_dev(div, "style", div_style_value = "animation: " + /*animation_out*/ ctx[1] + "; " + /*css_animation*/ ctx[3]);
    			add_location(div, file$1, 75, 4, 2229);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			if (default_slot) {
    				default_slot.m(div, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 512)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[9],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[9])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[9], dirty, null),
    						null
    					);
    				}
    			}

    			if (!current || dirty & /*animation_out, css_animation*/ 10 && div_style_value !== (div_style_value = "animation: " + /*animation_out*/ ctx[1] + "; " + /*css_animation*/ ctx[3])) {
    				attr_dev(div, "style", div_style_value);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$2.name,
    		type: "else",
    		source: "(75:2) {:else}",
    		ctx
    	});

    	return block;
    }

    // (71:2) {#if observing}
    function create_if_block$2(ctx) {
    	let div;
    	let div_style_value;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[10].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[9], null);

    	const block = {
    		c: function create() {
    			div = element("div");
    			if (default_slot) default_slot.c();
    			attr_dev(div, "style", div_style_value = "animation: " + /*animation*/ ctx[0] + "; " + /*css_animation*/ ctx[3]);
    			add_location(div, file$1, 71, 4, 2135);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			if (default_slot) {
    				default_slot.m(div, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 512)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[9],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[9])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[9], dirty, null),
    						null
    					);
    				}
    			}

    			if (!current || dirty & /*animation, css_animation*/ 9 && div_style_value !== (div_style_value = "animation: " + /*animation*/ ctx[0] + "; " + /*css_animation*/ ctx[3])) {
    				attr_dev(div, "style", div_style_value);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$2.name,
    		type: "if",
    		source: "(71:2) {#if observing}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$2(ctx) {
    	let div;
    	let current_block_type_index;
    	let if_block;
    	let current;
    	const if_block_creators = [create_if_block$2, create_else_block$2];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*observing*/ ctx[4]) return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block = {
    		c: function create() {
    			div = element("div");
    			if_block.c();
    			attr_dev(div, "id", /*countainer*/ ctx[5]);
    			attr_dev(div, "style", /*css_observer*/ ctx[2]);
    			add_location(div, file$1, 69, 0, 2070);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			if_blocks[current_block_type_index].m(div, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				} else {
    					if_block.p(ctx, dirty);
    				}

    				transition_in(if_block, 1);
    				if_block.m(div, null);
    			}

    			if (!current || dirty & /*css_observer*/ 4) {
    				attr_dev(div, "style", /*css_observer*/ ctx[2]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if_blocks[current_block_type_index].d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$2($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Saos', slots, ['default']);
    	let { animation = "none" } = $$props;
    	let { animation_out = "none; opacity: 0" } = $$props;
    	let { once = false } = $$props;
    	let { top = 0 } = $$props;
    	let { bottom = 0 } = $$props;
    	let { css_observer = "" } = $$props;
    	let { css_animation = "" } = $$props;

    	// cute litle reactive dispatch to get if is observing :3
    	const dispatch = createEventDispatcher();

    	// be aware... he's looking...
    	let observing = true;

    	// for some reason the 'bind:this={box}' on div stops working after npm run build... so... workaround time >:|
    	const countainer = `__saos-${Math.random()}__`;

    	/// current in experimental support, no support for IE (only Edge)
    	/// see more in: https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver
    	function intersection_verify(box) {
    		// bottom left top right
    		const rootMargin = `${-bottom}px 0px ${-top}px 0px`;

    		const observer = new IntersectionObserver(entries => {
    				$$invalidate(4, observing = entries[0].isIntersecting);

    				if (observing && once) {
    					observer.unobserve(box);
    				}
    			},
    		{ rootMargin });

    		observer.observe(box);
    		return () => observer.unobserve(box);
    	}

    	/// Fallback in case the browser not have the IntersectionObserver
    	function bounding_verify(box) {
    		const c = box.getBoundingClientRect();
    		$$invalidate(4, observing = c.top + top < window.innerHeight && c.bottom - bottom > 0);

    		if (observing && once) {
    			window.removeEventListener("scroll", verify);
    		}

    		window.addEventListener("scroll", bounding_verify);
    		return () => window.removeEventListener("scroll", bounding_verify);
    	}

    	onMount(() => {
    		// for some reason the 'bind:this={box}' on div stops working after npm run build... so... workaround time >:|
    		const box = document.getElementById(countainer);

    		if (IntersectionObserver) {
    			return intersection_verify(box);
    		} else {
    			return bounding_verify(box);
    		}
    	});

    	const writable_props = [
    		'animation',
    		'animation_out',
    		'once',
    		'top',
    		'bottom',
    		'css_observer',
    		'css_animation'
    	];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Saos> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('animation' in $$props) $$invalidate(0, animation = $$props.animation);
    		if ('animation_out' in $$props) $$invalidate(1, animation_out = $$props.animation_out);
    		if ('once' in $$props) $$invalidate(6, once = $$props.once);
    		if ('top' in $$props) $$invalidate(7, top = $$props.top);
    		if ('bottom' in $$props) $$invalidate(8, bottom = $$props.bottom);
    		if ('css_observer' in $$props) $$invalidate(2, css_observer = $$props.css_observer);
    		if ('css_animation' in $$props) $$invalidate(3, css_animation = $$props.css_animation);
    		if ('$$scope' in $$props) $$invalidate(9, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		onMount,
    		createEventDispatcher,
    		animation,
    		animation_out,
    		once,
    		top,
    		bottom,
    		css_observer,
    		css_animation,
    		dispatch,
    		observing,
    		countainer,
    		intersection_verify,
    		bounding_verify
    	});

    	$$self.$inject_state = $$props => {
    		if ('animation' in $$props) $$invalidate(0, animation = $$props.animation);
    		if ('animation_out' in $$props) $$invalidate(1, animation_out = $$props.animation_out);
    		if ('once' in $$props) $$invalidate(6, once = $$props.once);
    		if ('top' in $$props) $$invalidate(7, top = $$props.top);
    		if ('bottom' in $$props) $$invalidate(8, bottom = $$props.bottom);
    		if ('css_observer' in $$props) $$invalidate(2, css_observer = $$props.css_observer);
    		if ('css_animation' in $$props) $$invalidate(3, css_animation = $$props.css_animation);
    		if ('observing' in $$props) $$invalidate(4, observing = $$props.observing);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*observing*/ 16) {
    			dispatch('update', { observing });
    		}
    	};

    	return [
    		animation,
    		animation_out,
    		css_observer,
    		css_animation,
    		observing,
    		countainer,
    		once,
    		top,
    		bottom,
    		$$scope,
    		slots
    	];
    }

    class Saos extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$2, create_fragment$2, safe_not_equal, {
    			animation: 0,
    			animation_out: 1,
    			once: 6,
    			top: 7,
    			bottom: 8,
    			css_observer: 2,
    			css_animation: 3
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Saos",
    			options,
    			id: create_fragment$2.name
    		});
    	}

    	get animation() {
    		throw new Error("<Saos>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set animation(value) {
    		throw new Error("<Saos>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get animation_out() {
    		throw new Error("<Saos>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set animation_out(value) {
    		throw new Error("<Saos>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get once() {
    		throw new Error("<Saos>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set once(value) {
    		throw new Error("<Saos>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get top() {
    		throw new Error("<Saos>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set top(value) {
    		throw new Error("<Saos>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get bottom() {
    		throw new Error("<Saos>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set bottom(value) {
    		throw new Error("<Saos>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get css_observer() {
    		throw new Error("<Saos>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set css_observer(value) {
    		throw new Error("<Saos>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get css_animation() {
    		throw new Error("<Saos>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set css_animation(value) {
    		throw new Error("<Saos>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\components\SaosWrapper.svelte generated by Svelte v3.49.0 */

    // (16:0) {:else}
    function create_else_block$1(ctx) {
    	let current;
    	const default_slot_template = /*#slots*/ ctx[1].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[2], null);

    	const block = {
    		c: function create() {
    			if (default_slot) default_slot.c();
    		},
    		m: function mount(target, anchor) {
    			if (default_slot) {
    				default_slot.m(target, anchor);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 4)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[2],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[2])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[2], dirty, null),
    						null
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$1.name,
    		type: "else",
    		source: "(16:0) {:else}",
    		ctx
    	});

    	return block;
    }

    // (7:0) {#if boolFadeAnimation}
    function create_if_block$1(ctx) {
    	let saos;
    	let current;

    	saos = new Saos({
    			props: {
    				animation: "fade-in 1.2s cubic-bezier(0.390, 0.575, 0.565, 1.000) both",
    				animation_out: "slide-out-fwd-center 0.7s cubic-bezier(0.550, 0.085, 0.680, 0.530) both",
    				top: 250,
    				bottom: 250,
    				$$slots: { default: [create_default_slot$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(saos.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(saos, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const saos_changes = {};

    			if (dirty & /*$$scope*/ 4) {
    				saos_changes.$$scope = { dirty, ctx };
    			}

    			saos.$set(saos_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(saos.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(saos.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(saos, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$1.name,
    		type: "if",
    		source: "(7:0) {#if boolFadeAnimation}",
    		ctx
    	});

    	return block;
    }

    // (8:2) <Saos      animation={"fade-in 1.2s cubic-bezier(0.390, 0.575, 0.565, 1.000) both"}      animation_out={"slide-out-fwd-center 0.7s cubic-bezier(0.550, 0.085, 0.680, 0.530) both"}      top={250}      bottom={250}    >
    function create_default_slot$1(ctx) {
    	let current;
    	const default_slot_template = /*#slots*/ ctx[1].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[2], null);

    	const block = {
    		c: function create() {
    			if (default_slot) default_slot.c();
    		},
    		m: function mount(target, anchor) {
    			if (default_slot) {
    				default_slot.m(target, anchor);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 4)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[2],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[2])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[2], dirty, null),
    						null
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$1.name,
    		type: "slot",
    		source: "(8:2) <Saos      animation={\\\"fade-in 1.2s cubic-bezier(0.390, 0.575, 0.565, 1.000) both\\\"}      animation_out={\\\"slide-out-fwd-center 0.7s cubic-bezier(0.550, 0.085, 0.680, 0.530) both\\\"}      top={250}      bottom={250}    >",
    		ctx
    	});

    	return block;
    }

    function create_fragment$1(ctx) {
    	let current_block_type_index;
    	let if_block;
    	let if_block_anchor;
    	let current;
    	const if_block_creators = [create_if_block$1, create_else_block$1];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*boolFadeAnimation*/ ctx[0]) return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block = {
    		c: function create() {
    			if_block.c();
    			if_block_anchor = empty();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if_blocks[current_block_type_index].m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				} else {
    					if_block.p(ctx, dirty);
    				}

    				transition_in(if_block, 1);
    				if_block.m(if_block_anchor.parentNode, if_block_anchor);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if_blocks[current_block_type_index].d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('SaosWrapper', slots, ['default']);
    	let { boolFadeAnimation } = $$props;
    	const writable_props = ['boolFadeAnimation'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<SaosWrapper> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('boolFadeAnimation' in $$props) $$invalidate(0, boolFadeAnimation = $$props.boolFadeAnimation);
    		if ('$$scope' in $$props) $$invalidate(2, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({ Saos, boolFadeAnimation });

    	$$self.$inject_state = $$props => {
    		if ('boolFadeAnimation' in $$props) $$invalidate(0, boolFadeAnimation = $$props.boolFadeAnimation);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [boolFadeAnimation, slots, $$scope];
    }

    class SaosWrapper extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, { boolFadeAnimation: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "SaosWrapper",
    			options,
    			id: create_fragment$1.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*boolFadeAnimation*/ ctx[0] === undefined && !('boolFadeAnimation' in props)) {
    			console.warn("<SaosWrapper> was created without expected prop 'boolFadeAnimation'");
    		}
    	}

    	get boolFadeAnimation() {
    		throw new Error("<SaosWrapper>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set boolFadeAnimation(value) {
    		throw new Error("<SaosWrapper>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\App.svelte generated by Svelte v3.49.0 */

    const { console: console_1, window: window_1 } = globals;
    const file = "src\\App.svelte";

    // (118:0) {:else}
    function create_else_block(ctx) {
    	let div3;
    	let titledesktop;
    	let t0;
    	let div2;
    	let div0;
    	let saoswrapper0;
    	let t1;
    	let saoswrapper1;
    	let t2;
    	let saoswrapper2;
    	let t3;
    	let div1;
    	let div1_style_value;
    	let t4;
    	let contactwrapper;
    	let current;

    	titledesktop = new TitleParallax({
    			props: {
    				containerHeight: /*titleHeight*/ ctx[2],
    				pageHalfDown: /*pageHalfDown*/ ctx[4],
    				boolAnimateText: /*boolAnimateText*/ ctx[7],
    				titleInfo: /*titleInfo*/ ctx[8]
    			},
    			$$inline: true
    		});

    	saoswrapper0 = new SaosWrapper({
    			props: {
    				boolFadeAnimation: /*boolFadeAnimation*/ ctx[6],
    				$$slots: { default: [create_default_slot_5] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	saoswrapper1 = new SaosWrapper({
    			props: {
    				boolFadeAnimation: /*boolFadeAnimation*/ ctx[6],
    				$$slots: { default: [create_default_slot_4] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	saoswrapper2 = new SaosWrapper({
    			props: {
    				boolFadeAnimation: /*boolFadeAnimation*/ ctx[6],
    				$$slots: { default: [create_default_slot_3] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	contactwrapper = new ContactWrapper({
    			props: {
    				contactHeight: /*contactHeight*/ ctx[3],
    				containerHeight: /*titleHeight*/ ctx[2],
    				contactYOffset: /*contactYOffset*/ ctx[5],
    				pageHalfDown: /*pageHalfDown*/ ctx[4],
    				contactInfo: /*contactInfo*/ ctx[9],
    				boolMobileView: /*boolMobileView*/ ctx[0]
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div3 = element("div");
    			create_component(titledesktop.$$.fragment);
    			t0 = space();
    			div2 = element("div");
    			div0 = element("div");
    			create_component(saoswrapper0.$$.fragment);
    			t1 = space();
    			create_component(saoswrapper1.$$.fragment);
    			t2 = space();
    			create_component(saoswrapper2.$$.fragment);
    			t3 = space();
    			div1 = element("div");
    			t4 = space();
    			create_component(contactwrapper.$$.fragment);
    			attr_dev(div0, "id", "content");
    			attr_dev(div0, "class", "svelte-jnqx4x");
    			add_location(div0, file, 126, 6, 4121);
    			attr_dev(div1, "id", "contact");
    			attr_dev(div1, "style", div1_style_value = "height: calc(" + (/*titleHeight*/ ctx[2] - /*contactYOffset*/ ctx[5]) + "px); )");
    			attr_dev(div1, "class", "svelte-jnqx4x");
    			add_location(div1, file, 131, 6, 4365);
    			attr_dev(div2, "id", "content-container");
    			set_style(div2, "top", /*titleHeight*/ ctx[2] + "px");
    			attr_dev(div2, "class", "svelte-jnqx4x");
    			add_location(div2, file, 125, 4, 4055);
    			attr_dev(div3, "class", "container-fluid svelte-jnqx4x");
    			add_location(div3, file, 118, 2, 3890);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div3, anchor);
    			mount_component(titledesktop, div3, null);
    			append_dev(div3, t0);
    			append_dev(div3, div2);
    			append_dev(div2, div0);
    			mount_component(saoswrapper0, div0, null);
    			append_dev(div0, t1);
    			mount_component(saoswrapper1, div0, null);
    			append_dev(div0, t2);
    			mount_component(saoswrapper2, div0, null);
    			append_dev(div2, t3);
    			append_dev(div2, div1);
    			append_dev(div2, t4);
    			mount_component(contactwrapper, div2, null);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const titledesktop_changes = {};
    			if (dirty & /*titleHeight*/ 4) titledesktop_changes.containerHeight = /*titleHeight*/ ctx[2];
    			if (dirty & /*pageHalfDown*/ 16) titledesktop_changes.pageHalfDown = /*pageHalfDown*/ ctx[4];
    			if (dirty & /*boolAnimateText*/ 128) titledesktop_changes.boolAnimateText = /*boolAnimateText*/ ctx[7];
    			titledesktop.$set(titledesktop_changes);
    			const saoswrapper0_changes = {};
    			if (dirty & /*boolFadeAnimation*/ 64) saoswrapper0_changes.boolFadeAnimation = /*boolFadeAnimation*/ ctx[6];

    			if (dirty & /*$$scope*/ 1048576) {
    				saoswrapper0_changes.$$scope = { dirty, ctx };
    			}

    			saoswrapper0.$set(saoswrapper0_changes);
    			const saoswrapper1_changes = {};
    			if (dirty & /*boolFadeAnimation*/ 64) saoswrapper1_changes.boolFadeAnimation = /*boolFadeAnimation*/ ctx[6];

    			if (dirty & /*$$scope*/ 1048576) {
    				saoswrapper1_changes.$$scope = { dirty, ctx };
    			}

    			saoswrapper1.$set(saoswrapper1_changes);
    			const saoswrapper2_changes = {};
    			if (dirty & /*boolFadeAnimation*/ 64) saoswrapper2_changes.boolFadeAnimation = /*boolFadeAnimation*/ ctx[6];

    			if (dirty & /*$$scope*/ 1048576) {
    				saoswrapper2_changes.$$scope = { dirty, ctx };
    			}

    			saoswrapper2.$set(saoswrapper2_changes);

    			if (!current || dirty & /*titleHeight, contactYOffset*/ 36 && div1_style_value !== (div1_style_value = "height: calc(" + (/*titleHeight*/ ctx[2] - /*contactYOffset*/ ctx[5]) + "px); )")) {
    				attr_dev(div1, "style", div1_style_value);
    			}

    			const contactwrapper_changes = {};
    			if (dirty & /*contactHeight*/ 8) contactwrapper_changes.contactHeight = /*contactHeight*/ ctx[3];
    			if (dirty & /*titleHeight*/ 4) contactwrapper_changes.containerHeight = /*titleHeight*/ ctx[2];
    			if (dirty & /*contactYOffset*/ 32) contactwrapper_changes.contactYOffset = /*contactYOffset*/ ctx[5];
    			if (dirty & /*pageHalfDown*/ 16) contactwrapper_changes.pageHalfDown = /*pageHalfDown*/ ctx[4];
    			if (dirty & /*boolMobileView*/ 1) contactwrapper_changes.boolMobileView = /*boolMobileView*/ ctx[0];
    			contactwrapper.$set(contactwrapper_changes);

    			if (!current || dirty & /*titleHeight*/ 4) {
    				set_style(div2, "top", /*titleHeight*/ ctx[2] + "px");
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(titledesktop.$$.fragment, local);
    			transition_in(saoswrapper0.$$.fragment, local);
    			transition_in(saoswrapper1.$$.fragment, local);
    			transition_in(saoswrapper2.$$.fragment, local);
    			transition_in(contactwrapper.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(titledesktop.$$.fragment, local);
    			transition_out(saoswrapper0.$$.fragment, local);
    			transition_out(saoswrapper1.$$.fragment, local);
    			transition_out(saoswrapper2.$$.fragment, local);
    			transition_out(contactwrapper.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div3);
    			destroy_component(titledesktop);
    			destroy_component(saoswrapper0);
    			destroy_component(saoswrapper1);
    			destroy_component(saoswrapper2);
    			destroy_component(contactwrapper);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block.name,
    		type: "else",
    		source: "(118:0) {:else}",
    		ctx
    	});

    	return block;
    }

    // (98:0) {#if boolMobileView}
    function create_if_block(ctx) {
    	let div3;
    	let titlemobile;
    	let t0;
    	let div2;
    	let div0;
    	let saoswrapper0;
    	let t1;
    	let saoswrapper1;
    	let t2;
    	let saoswrapper2;
    	let t3;
    	let div1;
    	let t4;
    	let contactwrapper;
    	let current;

    	titlemobile = new TitleMobile({
    			props: {
    				boolAnimateText: /*boolAnimateText*/ ctx[7],
    				titleInfo: /*titleInfo*/ ctx[8]
    			},
    			$$inline: true
    		});

    	saoswrapper0 = new SaosWrapper({
    			props: {
    				boolFadeAnimation: /*boolFadeAnimation*/ ctx[6],
    				$$slots: { default: [create_default_slot_2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	saoswrapper1 = new SaosWrapper({
    			props: {
    				boolFadeAnimation: /*boolFadeAnimation*/ ctx[6],
    				$$slots: { default: [create_default_slot_1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	saoswrapper2 = new SaosWrapper({
    			props: {
    				boolFadeAnimation: /*boolFadeAnimation*/ ctx[6],
    				$$slots: { default: [create_default_slot] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	contactwrapper = new ContactWrapper({
    			props: {
    				contactHeight: /*contactHeight*/ ctx[3],
    				containerHeight: /*titleHeight*/ ctx[2],
    				contactYOffset: /*contactYOffset*/ ctx[5],
    				pageHalfDown: /*pageHalfDown*/ ctx[4],
    				contactInfo: /*contactInfo*/ ctx[9],
    				boolMobileView: /*boolMobileView*/ ctx[0]
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div3 = element("div");
    			create_component(titlemobile.$$.fragment);
    			t0 = space();
    			div2 = element("div");
    			div0 = element("div");
    			create_component(saoswrapper0.$$.fragment);
    			t1 = space();
    			create_component(saoswrapper1.$$.fragment);
    			t2 = space();
    			create_component(saoswrapper2.$$.fragment);
    			t3 = space();
    			div1 = element("div");
    			t4 = space();
    			create_component(contactwrapper.$$.fragment);
    			attr_dev(div0, "id", "content");
    			attr_dev(div0, "class", "svelte-jnqx4x");
    			add_location(div0, file, 101, 6, 3373);
    			attr_dev(div1, "id", "contact");
    			set_style(div1, "height", "75vh");
    			attr_dev(div1, "class", "svelte-jnqx4x");
    			add_location(div1, file, 106, 6, 3617);
    			attr_dev(div2, "id", "content-container");
    			attr_dev(div2, "class", "svelte-jnqx4x");
    			add_location(div2, file, 100, 4, 3337);
    			attr_dev(div3, "class", "container-fluid svelte-jnqx4x");
    			add_location(div3, file, 98, 2, 3251);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div3, anchor);
    			mount_component(titlemobile, div3, null);
    			append_dev(div3, t0);
    			append_dev(div3, div2);
    			append_dev(div2, div0);
    			mount_component(saoswrapper0, div0, null);
    			append_dev(div0, t1);
    			mount_component(saoswrapper1, div0, null);
    			append_dev(div0, t2);
    			mount_component(saoswrapper2, div0, null);
    			append_dev(div2, t3);
    			append_dev(div2, div1);
    			append_dev(div2, t4);
    			mount_component(contactwrapper, div2, null);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const titlemobile_changes = {};
    			if (dirty & /*boolAnimateText*/ 128) titlemobile_changes.boolAnimateText = /*boolAnimateText*/ ctx[7];
    			titlemobile.$set(titlemobile_changes);
    			const saoswrapper0_changes = {};
    			if (dirty & /*boolFadeAnimation*/ 64) saoswrapper0_changes.boolFadeAnimation = /*boolFadeAnimation*/ ctx[6];

    			if (dirty & /*$$scope*/ 1048576) {
    				saoswrapper0_changes.$$scope = { dirty, ctx };
    			}

    			saoswrapper0.$set(saoswrapper0_changes);
    			const saoswrapper1_changes = {};
    			if (dirty & /*boolFadeAnimation*/ 64) saoswrapper1_changes.boolFadeAnimation = /*boolFadeAnimation*/ ctx[6];

    			if (dirty & /*$$scope*/ 1048576) {
    				saoswrapper1_changes.$$scope = { dirty, ctx };
    			}

    			saoswrapper1.$set(saoswrapper1_changes);
    			const saoswrapper2_changes = {};
    			if (dirty & /*boolFadeAnimation*/ 64) saoswrapper2_changes.boolFadeAnimation = /*boolFadeAnimation*/ ctx[6];

    			if (dirty & /*$$scope*/ 1048576) {
    				saoswrapper2_changes.$$scope = { dirty, ctx };
    			}

    			saoswrapper2.$set(saoswrapper2_changes);
    			const contactwrapper_changes = {};
    			if (dirty & /*contactHeight*/ 8) contactwrapper_changes.contactHeight = /*contactHeight*/ ctx[3];
    			if (dirty & /*titleHeight*/ 4) contactwrapper_changes.containerHeight = /*titleHeight*/ ctx[2];
    			if (dirty & /*contactYOffset*/ 32) contactwrapper_changes.contactYOffset = /*contactYOffset*/ ctx[5];
    			if (dirty & /*pageHalfDown*/ 16) contactwrapper_changes.pageHalfDown = /*pageHalfDown*/ ctx[4];
    			if (dirty & /*boolMobileView*/ 1) contactwrapper_changes.boolMobileView = /*boolMobileView*/ ctx[0];
    			contactwrapper.$set(contactwrapper_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(titlemobile.$$.fragment, local);
    			transition_in(saoswrapper0.$$.fragment, local);
    			transition_in(saoswrapper1.$$.fragment, local);
    			transition_in(saoswrapper2.$$.fragment, local);
    			transition_in(contactwrapper.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(titlemobile.$$.fragment, local);
    			transition_out(saoswrapper0.$$.fragment, local);
    			transition_out(saoswrapper1.$$.fragment, local);
    			transition_out(saoswrapper2.$$.fragment, local);
    			transition_out(contactwrapper.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div3);
    			destroy_component(titlemobile);
    			destroy_component(saoswrapper0);
    			destroy_component(saoswrapper1);
    			destroy_component(saoswrapper2);
    			destroy_component(contactwrapper);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(98:0) {#if boolMobileView}",
    		ctx
    	});

    	return block;
    }

    // (128:8) <SaosWrapper {boolFadeAnimation}>
    function create_default_slot_5(ctx) {
    	let aboutme;
    	let current;
    	aboutme = new _02_AboutMe({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(aboutme.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(aboutme, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(aboutme.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(aboutme.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(aboutme, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_5.name,
    		type: "slot",
    		source: "(128:8) <SaosWrapper {boolFadeAnimation}>",
    		ctx
    	});

    	return block;
    }

    // (129:8) <SaosWrapper {boolFadeAnimation}>
    function create_default_slot_4(ctx) {
    	let career;
    	let current;
    	career = new _03_Career({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(career.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(career, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(career.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(career.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(career, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_4.name,
    		type: "slot",
    		source: "(129:8) <SaosWrapper {boolFadeAnimation}>",
    		ctx
    	});

    	return block;
    }

    // (130:8) <SaosWrapper {boolFadeAnimation}>
    function create_default_slot_3(ctx) {
    	let projects;
    	let current;
    	projects = new _04_Projects({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(projects.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(projects, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(projects.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(projects.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(projects, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_3.name,
    		type: "slot",
    		source: "(130:8) <SaosWrapper {boolFadeAnimation}>",
    		ctx
    	});

    	return block;
    }

    // (103:8) <SaosWrapper {boolFadeAnimation}>
    function create_default_slot_2(ctx) {
    	let aboutme;
    	let current;
    	aboutme = new _02_AboutMe({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(aboutme.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(aboutme, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(aboutme.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(aboutme.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(aboutme, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_2.name,
    		type: "slot",
    		source: "(103:8) <SaosWrapper {boolFadeAnimation}>",
    		ctx
    	});

    	return block;
    }

    // (104:8) <SaosWrapper {boolFadeAnimation}>
    function create_default_slot_1(ctx) {
    	let career;
    	let current;
    	career = new _03_Career({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(career.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(career, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(career.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(career.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(career, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1.name,
    		type: "slot",
    		source: "(104:8) <SaosWrapper {boolFadeAnimation}>",
    		ctx
    	});

    	return block;
    }

    // (105:8) <SaosWrapper {boolFadeAnimation}>
    function create_default_slot(ctx) {
    	let projects;
    	let current;
    	projects = new _04_Projects({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(projects.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(projects, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(projects.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(projects.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(projects, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot.name,
    		type: "slot",
    		source: "(105:8) <SaosWrapper {boolFadeAnimation}>",
    		ctx
    	});

    	return block;
    }

    function create_fragment(ctx) {
    	let scrolling = false;

    	let clear_scrolling = () => {
    		scrolling = false;
    	};

    	let scrolling_timeout;
    	let current_block_type_index;
    	let if_block;
    	let t;
    	let navbar;
    	let current;
    	let mounted;
    	let dispose;
    	add_render_callback(/*onwindowscroll*/ ctx[11]);
    	const if_block_creators = [create_if_block, create_else_block];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*boolMobileView*/ ctx[0]) return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	navbar = new Navbar({
    			props: { titleHeight: /*titleHeight*/ ctx[2] },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			if_block.c();
    			t = space();
    			create_component(navbar.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if_blocks[current_block_type_index].m(target, anchor);
    			insert_dev(target, t, anchor);
    			mount_component(navbar, target, anchor);
    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(window_1, "scroll", () => {
    					scrolling = true;
    					clearTimeout(scrolling_timeout);
    					scrolling_timeout = setTimeout(clear_scrolling, 100);
    					/*onwindowscroll*/ ctx[11]();
    				});

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*y*/ 2 && !scrolling) {
    				scrolling = true;
    				clearTimeout(scrolling_timeout);
    				scrollTo(window_1.pageXOffset, /*y*/ ctx[1]);
    				scrolling_timeout = setTimeout(clear_scrolling, 100);
    			}

    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				} else {
    					if_block.p(ctx, dirty);
    				}

    				transition_in(if_block, 1);
    				if_block.m(t.parentNode, t);
    			}

    			const navbar_changes = {};
    			if (dirty & /*titleHeight*/ 4) navbar_changes.titleHeight = /*titleHeight*/ ctx[2];
    			navbar.$set(navbar_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			transition_in(navbar.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			transition_out(navbar.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if_blocks[current_block_type_index].d(detaching);
    			if (detaching) detach_dev(t);
    			destroy_component(navbar, detaching);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('App', slots, []);

    	let y,
    		boolMobileView,
    		medScreenSize,
    		titleHeight,
    		contactHeight,
    		pageHalfDown,
    		contactYOffset,
    		body,
    		contentContainer,
    		contentContainerHeight,
    		content,
    		contentHeight;

    	contentContainerHeight = 0;
    	boolMobileView = true;
    	medScreenSize = 768;

    	// wait for document.body to load first
    	beforeUpdate(async () => {
    		await tick();
    		body = document.body;
    		contentContainer = document.getElementById("content-container");
    		content = document.getElementById("content");
    		contentContainerHeight = contentContainer.offsetHeight;
    		contentHeight = content.offsetHeight;
    		$$invalidate(4, pageHalfDown = contentContainerHeight / 2);
    	});

    	let manageHeights = () => {
    		$$invalidate(0, boolMobileView = window.innerWidth < medScreenSize);
    		body = document.body;
    		$$invalidate(2, titleHeight = body.offsetWidth * 0.5625);
    		$$invalidate(5, contactYOffset = titleHeight / 3);
    		$$invalidate(3, contactHeight = titleHeight - contactYOffset);
    	};

    	window.onload = manageHeights();

    	window.onresize = () => {
    		$$invalidate(0, boolMobileView = window.innerWidth < medScreenSize);
    		$$invalidate(2, titleHeight = body.offsetWidth * 0.5625);
    		$$invalidate(5, contactYOffset = titleHeight / 3);
    		$$invalidate(3, contactHeight = titleHeight - contactYOffset);
    		contentContainerHeight = contentContainer.clientHeight;
    		$$invalidate(4, pageHalfDown = contentContainerHeight / 2);
    	};

    	let boolFadeAnimation, boolShowLoadingScreen, boolAnimateText;

    	const triggerDevMode = isOn => {
    		$$invalidate(6, boolFadeAnimation = boolShowLoadingScreen = $$invalidate(7, boolAnimateText = false));

    		if (!isOn) {
    			$$invalidate(6, boolFadeAnimation = boolShowLoadingScreen = $$invalidate(7, boolAnimateText = true));
    		}

    		$$invalidate(6, boolFadeAnimation = false);
    	};

    	triggerDevMode(false);

    	let titleInfo = {
    		preamble: "Hi, my name is",
    		title: "Tony Kwok.",
    		subtitle: "I build things with ",
    		texts: ["data.", "style.", "code.", "thought."],
    		description: "I'm a software developer who builds solutions to problems using data. Currently, I'm looking to join a company for my next adventure."
    	};

    	let contactInfo = {
    		preamble: "Interested?",
    		title: "",
    		subtitle: "",
    		texts: ["Get in Touch!"],
    		description: "I'm currently looking for my next adventure. Contact me if you have any questions, or if you just want to say hello! My inbox is always open for you.",
    		subject: "Getting in touch from your website"
    	};

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	function onwindowscroll() {
    		$$invalidate(1, y = window_1.pageYOffset);
    	}

    	$$self.$capture_state = () => ({
    		TitleDesktop: TitleParallax,
    		TitleMobile,
    		AboutMe: _02_AboutMe,
    		Career: _03_Career,
    		Projects: _04_Projects,
    		ContactWrapper,
    		Navbar,
    		Loader,
    		SaosWrapper,
    		beforeUpdate,
    		tick,
    		y,
    		boolMobileView,
    		medScreenSize,
    		titleHeight,
    		contactHeight,
    		pageHalfDown,
    		contactYOffset,
    		body,
    		contentContainer,
    		contentContainerHeight,
    		content,
    		contentHeight,
    		manageHeights,
    		boolFadeAnimation,
    		boolShowLoadingScreen,
    		boolAnimateText,
    		triggerDevMode,
    		titleInfo,
    		contactInfo
    	});

    	$$self.$inject_state = $$props => {
    		if ('y' in $$props) $$invalidate(1, y = $$props.y);
    		if ('boolMobileView' in $$props) $$invalidate(0, boolMobileView = $$props.boolMobileView);
    		if ('medScreenSize' in $$props) $$invalidate(10, medScreenSize = $$props.medScreenSize);
    		if ('titleHeight' in $$props) $$invalidate(2, titleHeight = $$props.titleHeight);
    		if ('contactHeight' in $$props) $$invalidate(3, contactHeight = $$props.contactHeight);
    		if ('pageHalfDown' in $$props) $$invalidate(4, pageHalfDown = $$props.pageHalfDown);
    		if ('contactYOffset' in $$props) $$invalidate(5, contactYOffset = $$props.contactYOffset);
    		if ('body' in $$props) body = $$props.body;
    		if ('contentContainer' in $$props) contentContainer = $$props.contentContainer;
    		if ('contentContainerHeight' in $$props) contentContainerHeight = $$props.contentContainerHeight;
    		if ('content' in $$props) content = $$props.content;
    		if ('contentHeight' in $$props) contentHeight = $$props.contentHeight;
    		if ('manageHeights' in $$props) manageHeights = $$props.manageHeights;
    		if ('boolFadeAnimation' in $$props) $$invalidate(6, boolFadeAnimation = $$props.boolFadeAnimation);
    		if ('boolShowLoadingScreen' in $$props) boolShowLoadingScreen = $$props.boolShowLoadingScreen;
    		if ('boolAnimateText' in $$props) $$invalidate(7, boolAnimateText = $$props.boolAnimateText);
    		if ('titleInfo' in $$props) $$invalidate(8, titleInfo = $$props.titleInfo);
    		if ('contactInfo' in $$props) $$invalidate(9, contactInfo = $$props.contactInfo);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*medScreenSize, boolMobileView*/ 1025) {
    			{
    				$$invalidate(0, boolMobileView = window.innerWidth < medScreenSize);
    				let clObject = { boolMobileView };
    				console.log(clObject);
    			}
    		}
    	};

    	return [
    		boolMobileView,
    		y,
    		titleHeight,
    		contactHeight,
    		pageHalfDown,
    		contactYOffset,
    		boolFadeAnimation,
    		boolAnimateText,
    		titleInfo,
    		contactInfo,
    		medScreenSize,
    		onwindowscroll
    	];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment.name
    		});
    	}
    }

    const app = new App({
      target: document.body,
    });

    return app;

})();
//# sourceMappingURL=bundle.js.map
