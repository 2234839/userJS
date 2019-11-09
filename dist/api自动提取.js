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
})({"QVnC":[function(require,module,exports) {
var global = arguments[3];
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() {
    return this || (typeof self === "object" && self);
  })() || Function("return this")()
);

},{}],"QYzI":[function(require,module,exports) {
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() {
  return this || (typeof self === "object" && self);
})() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = require("./runtime");

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}

},{"./runtime":"QVnC"}],"PMvg":[function(require,module,exports) {
module.exports = require("regenerator-runtime");

},{"regenerator-runtime":"QYzI"}],"Cb2N":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSelectors = getSelectors;
exports.getIndex = getIndex;
exports.nodePath = nodePath;
exports.getJSon = getJSon;
exports.ajax_get = ajax_get;
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var __awaiter = void 0 && (void 0).__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
/** 用于复制文本的input */


var input_copy = document.createElement('textarea');
input_copy.id = '__';
input_copy.style.display = 'none'; //不能设置为none因为会导致没有可访问性

input_copy.setAttribute('style', "\n        position: absolute;\n        top: -9999px;\n        left: -9999px;");
document.body.appendChild(input_copy);
/** 工具类 */

var _default = {
  /** 复制一个元素的titil 或者一段字符串到剪贴板 */
  copyTitle: function copyTitle(el) {
    var title;
    if (typeof el === 'string') title = el;else title = el.getAttribute("title");
    input_copy.setAttribute('readonly', 'readonly');
    input_copy.setAttribute('value', title);
    input_copy.value = title;
    input_copy.select();
    input_copy.setSelectionRange(0, 9999);
    document.execCommand('copy');
  }
};
/** 获取一个元素的选择器 */

exports.default = _default;

function getSelectors(el) {
  /** 通过path路径来确定元素 */
  var pathSelectors = nodePath(el).reverse().map(function (el) {
    return el.nodeName + ":nth-child(".concat(getIndex(el), ")");
  }).join('>');
  /** 通过id以及class来确定元素 */

  var id_className = "";
  var id = el.id;
  if (id) id_className += "#".concat(id);
  el.classList.forEach(function (className) {
    id_className += ".".concat(className);
  });
  /** nth-child 选择 看它是第几个元素 */

  var index = getIndex(el);
  /** 最终构造出来的选择器 */

  return "".concat(pathSelectors).concat(id_className, ":nth-child(").concat(index, ")");
}
/** 获取元素它在第几位 */


function getIndex(el) {
  if (el.nodeName === 'HTML') return 1;
  return 1 + Array.from(el.parentElement.children).findIndex(function (child) {
    return child === el;
  });
}
/** 获取一个元素的所有父节点到html为止  */


function nodePath() {
  for (var _len = arguments.length, path = new Array(_len), _key = 0; _key < _len; _key++) {
    path[_key] = arguments[_key];
  }

  while (path[path.length - 1].parentElement != null) {
    path.push(path[path.length - 1].parentElement);
  }
  /** 只需要是HTMLElement的 */


  var HTMLElementPath = path.filter(function (el) {
    return el instanceof HTMLElement;
  });
  return HTMLElementPath;
}

function getJSon(url, data) {
  return __awaiter(this, void 0, void 0,
  /*#__PURE__*/
  _regenerator.default.mark(function _callee() {
    var str;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return ajax_get(url, data);

          case 2:
            str = _context.sent;
            return _context.abrupt("return", JSON.parse(str));

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
}
/** 油猴的ajaxget */


function ajax_get(url, data) {
  if (data) url += '?' + jsonToURLpar(data);
  if (window.hasOwnProperty("GM") && window.hasOwnProperty("GM")) return new Promise(function (resolve, reject) {
    GM.xmlHttpRequest({
      method: "GET",
      url: url,
      onload: function onload(response) {
        resolve(response.responseText);
      },
      onerror: reject
    });
  });else return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.addEventListener('load', function () {
      resolve(xhr.responseText);
    });
    xhr.addEventListener('error', reject);
    xhr.open('get', url);
    xhr.send();
  });
}
/** json 转 urlpar 只能转一层 */


function jsonToURLpar(json) {
  return Object.keys(json).map(function (key) {
    return encodeURIComponent(key) + "=" + encodeURIComponent(json[key]);
  }).join("&");
}
},{"@babel/runtime/regenerator":"PMvg"}],"BHXf":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.urlToName = urlToName;
exports.qALL = qALL;
exports.getTextConten = getTextConten;
exports.getTable = getTable;
exports.getElText = getElText;
exports.copyStr = copyStr;

/** 将url转为友好的名字 */
function urlToName(url) {
  // return url.match(/\d+\.\d+\.\d+\.\d+(.*)/)[1].split('/').map(str => str.replace(/\//g, '')).join('_')
  return url.split('/').map(function (str) {
    return str.replace(/[^a-zA-Z0-9]/g, '_');
  }).join('_');
}

function qALL(selector, t) {
  var res = document.querySelectorAll(selector);

  res.includes = function (text) {
    return Array.from(res).filter(function (el) {
      return el.textContent.includes(text);
    });
  };

  return res;
}

function getTextConten(el) {
  if (el !== undefined && 'textContent' in el) {
    return el.textContent;
  } else {
    console.warn('textContent 属性不存在', el);
    return '';
  }
}
/** 将table元素解析为字符串二维数组 */


function getTable(el) {
  var tr_selector = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "tr";
  var td_selector = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "td";
  var recognizer = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var table = [];

  for (var i = 0; i < el.querySelectorAll(tr_selector).length; i++) {
    /** tr */
    var tr_el = el.querySelectorAll(tr_selector)[i];
    var tr = [];

    for (var j = 0; j < tr_el.querySelectorAll(td_selector).length; j++) {
      /** tr */
      var td_el = tr_el.querySelectorAll(td_selector)[j];

      if (recognizer[j] !== undefined) {
        tr.push(recognizer[j](td_el));
      } else {
        tr.push(td_el.textContent.trim());
      }
    }

    table.push(tr);
  }

  return table;
}
/** 获取指定元素的TextContent */


function getElText(selsector) {
  var el = document.querySelector(selsector);

  if (el === null) {
    return "";
  }

  return el.textContent;
}
/** 复制某个字符串多少次 */


function copyStr(el, length) {
  var str = "";

  for (var index = 0; index < length; index++) {
    str += el;
  }

  return str;
}
},{}],"ZABJ":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.apiToTypeScriptCode = apiToTypeScriptCode;

var _util = require("../util");

/** 将api转为ts的代码 */
function apiToTypeScriptCode(api) {
  console.log(api);
  var name = (0, _util.urlToName)(api.url);
  return "\n        /** ".concat(api.name, " */\n        static ").concat(name, "(params?:\n            ").concat(parse_par_List(api.parList), "\n        ):Promise< ").concat(parse_par_List(api.resList), " >{ return ").concat(api.method.toLocaleLowerCase(), "('").concat(api.url, "', params) }");
}
/** 解析api的par为字符串 */


function parse_par_item(par) {
  var level = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  return "".concat((0, _util.copyStr)('\t', level), "/** ").concat(par.type, " ").concat(par.describe, " */").concat(par.name).concat(par.must ? '' : '?', ": ").concat(function () {
    if (par.children === undefined) return par.type.replace("string(", '_string(')
    /** string 这种基本类型不能够使用引用的方式解决，所以加上一个_来区分 */
    .replace("number(", '_number(').replace("String", 'string')
    /** 基元类型不要用 */
    .replace("String", 'string').replace('(', '<').replace(')', '>').replace('-', '_');
    return "".concat(parse_par_List(par.children, level + 1));
  }());
}
/** 解析api的par数组为字符串 */


function parse_par_List(par) {
  var level = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  return "{\r".concat(par.map(function (el) {
    return parse_par_item(el, level);
  }).join(',\n'), "}");
}
},{"../util":"BHXf"}],"kJX2":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getShowDocApi = getShowDocApi;

var _util = require("../util");

/** 获取showDoc平台的api */
function getShowDocApi() {
  var api = {
    url: (0, _util.getTextConten)((0, _util.qALL)('main .main-editor li')[1]),
    name: (0, _util.getTextConten)((0, _util.qALL)('main div')[0]),
    describe: (0, _util.getTextConten)((0, _util.qALL)('main .main-editor li')[1]),
    method: (0, _util.getTextConten)((0, _util.qALL)('main .main-editor li')[2]),
    parList: Array.from((0, _util.qALL)('table')[0].querySelectorAll('tr')).filter(function (el, i) {
      return i !== 0;
    }).filter(function (el) {
      /** 他有时参数列表不全，通过这个去除空 */
      if ((0, _util.getTextConten)(el.querySelectorAll('td')[0]) === '' && (0, _util.getTextConten)(el.querySelectorAll('td')[2]) === '') return false;
      return true;
    }).map(function (el) {
      return {
        name: (0, _util.getTextConten)(el.querySelectorAll('td')[0]),

        /** 是否必需 */
        must: (0, _util.getTextConten)(el.querySelectorAll('td')[1]) === '是',
        type: (0, _util.getTextConten)(el.querySelectorAll('td')[2]),
        describe: (0, _util.getTextConten)(el.querySelectorAll('td')[3])
      };
    }),

    /** 返回结果的列表 */
    resList: Array.from((0, _util.qALL)('table')[1].querySelectorAll('tr')).filter(function (el, i) {
      return i !== 0;
    }).map(function (el) {
      return {
        name: (0, _util.getTextConten)(el.querySelectorAll('td')[0]),

        /** 是否必需 */
        must: true,
        type: (0, _util.getTextConten)(el.querySelectorAll('td')[1]),
        describe: (0, _util.getTextConten)(el.querySelectorAll('td')[2])
      };
    })
  };
  return api;
}

;
},{"../util":"BHXf"}],"Q4CB":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.swagger_bootstrap_ui = swagger_bootstrap_ui;

var _util = require("../util");

/** 获取 swagger_bootstrap_ui 页面的ui */
function swagger_bootstrap_ui() {
  var this_tab = document.querySelector('.layui-tab-item.layui-show .swbu-main');
  var par_el = this_tab.querySelectorAll("table")[2];
  var res_el = this_tab.querySelectorAll("table")[6];
  /** 参数名称 参数说明 请求类型 是否必须 数据类型 schema */

  var par_table = (0, _util.getTable)(par_el);
  /** 参数名称 参数说明 类型 schema */

  var res_table = (0, _util.getTable)(res_el);
  console.log(par_table, res_table);
  var api = {
    url: this_tab.querySelector('div p:nth-child(1) code').textContent,
    name: (0, _util.getElText)('.layui-tab-item.layui-show .tab-pane div:nth-child(2) div'),
    describe: this_tab.querySelector('div p:nth-child(5) code').textContent,
    method: this_tab.querySelector('div p:nth-child(2) code').textContent,
    parList: reduction_tree(par_el, par_table.map(function (str_list) {
      return {
        name: str_list[0],
        must: str_list[3] === "true",
        type: str_list[4],
        describe: str_list[1]
      };
    })),
    resList: reduction_tree(res_el, res_table.map(function (str_list) {
      return {
        name: str_list[0],
        must: undefined,
        type: str_list[2],
        describe: str_list[1]
      };
    }))
  };
  console.log("最终结果", par_table, res_table, api);
  return api;
}
/** 根据table 获取到树的结构 */


function reduction_tree(table, parlist) {
  /** 等级数组 [0,1,1,1,2,2,1,1] 这样的 */
  var level_list = Array.from(table.querySelectorAll('tr td:nth-child(1)')).map(function (el) {
    /** swagger-bootstrap-ui 层级越高 这种元素越多 */
    return el.querySelectorAll('.treeTable-empty').length;
  });
  /** 最高级 */

  var hierarchy = [];
  var current_hierarchy = hierarchy;

  for (var i = 0; i < level_list.length; i++) {
    var level = level_list[i];

    if (i === 0) {
      current_hierarchy.push(parlist[i]);
      continue;
    }
    /** 同级元素 */


    if (level > level_list[i - 1]) {
      /** 按一般规律来说它就是 当前层级数组最后一个元素的 子级 */
      var parent = current_hierarchy[current_hierarchy.length - 1];

      if (parent.children === undefined) {
        parent.children = [];
      }
      /** 指向下一级 */


      current_hierarchy = parent.children;
    } else if (level === level_list[i - 1]) {
      /** 同级的 */
    } else {
      /** 小于的要提升当前层级 */

      /** 从最高的0级开始降级,直到它所在的等级 */
      var demotion_temp = hierarchy;
      /** 开始降级 */

      for (var _i = 0; _i < level; _i++) {
        /** 按一般规律来说 它一定生成在最后一个元素的子级 */
        demotion_temp = demotion_temp[demotion_temp.length - 1].children;
      }
      /** 指向将到的级别 */


      current_hierarchy = demotion_temp;
    }
    /** 将元素添加到当前层级 */


    current_hierarchy.push(parlist[i]);
  }

  return hierarchy;
}
},{"../util":"BHXf"}],"wRmx":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getYapiApi = getYapiApi;

var _util = require("../util");

var $$ = _util.qALL;
/** 获取Yapi平台的api */

function getYapiApi() {
  var desNodeList = $$('.interface-title').includes('备注');
  var describe = desNodeList.length > 0 ? '' : desNodeList[0].nextElementSibling.textContent;
  var api = {
    url: $$('.tag-method + span')[0].textContent,
    name: $$('.interface-title + div div div:nth-child(2)')[0].textContent,
    describe: describe,
    method: $$('.tag-method')[0].textContent,
    parList: Array.from($$('table')[0].querySelectorAll('tr')).filter(function (el, i) {
      return i !== 0;
    }).map(function (el) {
      return {
        name: el.querySelectorAll('td')[0].textContent,

        /** 是否必需 */
        must: el.querySelectorAll('td')[1].textContent === '是',
        type: el.querySelectorAll('td')[2].textContent,
        describe: el.querySelectorAll('td')[3].textContent
      };
    }),
    resList: []
  };
  return api;
}

;
},{"../util":"BHXf"}],"wCVr":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRap2Api = getRap2Api;

var _util = require("../util");

/** 获取rap2平台的api */
function getRap2Api() {
  console.log("参数列表=========================");
  var par_el = document.querySelector("#root > article > div.body > article > div.body > div > article.InterfaceEditor > section:nth-child(2) > div.body > div > div.RSortableWrapper.depth-1");
  /** 参数名称 参数说明 请求类型 是否必须 数据类型 schema */

  var par_table = (0, _util.getTable)(par_el, ".SortableTreeTableRow", ".td.payload", [undefined, function (el) {
    return el.querySelector("input").checked ? "true" : "false";
  }]);
  var res_el = document.querySelector("#root > article > div.body > article > div.body > div > article.InterfaceEditor > section:nth-child(3) > div.body > div > div.RSortableWrapper.depth-1");
  /** 参数名称 参数说明 类型 schema */

  var res_table = (0, _util.getTable)(res_el, ".SortableTreeTableRow", ".td.payload", [undefined, function (el) {
    return el.querySelector("input").checked ? "true" : "false";
  }]);
  console.log("参数和响应", par_el, res_el, par_table, res_table);

  var get_level_list = function get_level_list(table) {
    var tr_list = table.querySelectorAll(".SortableTreeTableRow");
    return Array.from(tr_list).map(function (tr) {
      var match = tr.parentElement.className.match(/depth(\d)/);
      if (match === null) return 0;else {
        return Number(match[1]) + 1;
      }
    });
  };

  var api = {
    url: (0, _util.getElText)('.summary li:nth-child(1) a'),
    name: (0, _util.getElText)('#root > article > div.body > article > div.body > div > article.InterfaceEditor > div > div > span'),
    describe: "",
    method: (0, _util.getElText)("#root > article > div.body > article > div.body > div > article.InterfaceEditor > div > ul > li:nth-child(2) > span > span:nth-child(2)"),
    parList: reduction_tree(par_el, par_table.map(function (str_list) {
      return {
        name: str_list[0].replace(/BODY$/, '').replace(/QUERY$/, ''),
        must: str_list[1] === "true",
        type: str_list[2],
        describe: str_list[5]
      };
    }), get_level_list),
    resList: reduction_tree(res_el, res_table.map(function (str_list) {
      return {
        name: str_list[0],
        must: str_list[1] === "true",
        type: str_list[2],
        describe: str_list[5]
      };
    }), get_level_list)
  };
  console.log("最终结果", par_table, res_table, api);
  return api;
}
/** 根据table 获取到树的结构 */


function reduction_tree(table, parlist, get_level_list) {
  /** 等级数组 [0,1,1,1,2,2,1,1] 这样的 */
  var level_list = get_level_list(table);
  /** 最高级 */

  var hierarchy = [];
  var current_hierarchy = hierarchy;

  for (var i = 0; i < level_list.length; i++) {
    var level = level_list[i];

    if (i === 0) {
      current_hierarchy.push(parlist[i]);
      continue;
    }
    /** 同级元素 */


    if (level > level_list[i - 1]) {
      /** 按一般规律来说它就是 当前层级数组最后一个元素的 子级 */
      var parent = current_hierarchy[current_hierarchy.length - 1];

      if (parent.children === undefined) {
        parent.children = [];
      }
      /** 指向下一级 */


      current_hierarchy = parent.children;
    } else if (level === level_list[i - 1]) {
      /** 同级的 */
    } else {
      /** 小于的要提升当前层级 */

      /** 从最高的0级开始降级,直到它所在的等级 */
      var demotion_temp = hierarchy;
      /** 开始降级 */

      for (var _i = 0; _i < level; _i++) {
        /** 按一般规律来说 它一定生成在最后一个元素的子级 */
        demotion_temp = demotion_temp[demotion_temp.length - 1].children;
      }
      /** 指向将到的级别 */


      current_hierarchy = demotion_temp;
    }
    /** 将元素添加到当前层级 */


    current_hierarchy.push(parlist[i]);
  }

  return hierarchy;
}
},{"../util":"BHXf"}],"p9T3":[function(require,module,exports) {
"use strict";

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _util = _interopRequireDefault(require("../\u7F51\u9875\u7B14\u8BB0/util"));

var _apiToTypeScriptCode = require("./parse/apiToTypeScriptCode");

var _showDocApi = require("./parse/showDocApi");

var _swaggerBootstrapUi = require("./parse/swagger-bootstrap-ui");

var _yapi = require("./parse/yapi");

var _rap2Taobo = require("./parse/rap2-taobo");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var __awaiter = void 0 && (void 0).__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

// ==UserScript==
// @name         api自动提取
// @namespace    http://tampermonkey.net/
// @version      1.0.0
// @description  使用方式是打开控制台，输入_api你可以看到一些方法，在支持的网站执行对应的方法就ok了，
// @author       崮生 2234839456@qq.com
// @include      *://www.showdoc.cc/*
// @include      *://192.*
// @include      *://rap2.taobao.org/*
// @grant        unsafeWindow
// @connect      shenzilong.cn
// ==/UserScript==

/** 编译命令
parcel build --no-minify --no-source-maps .\api自动提取\api自动提取.ts
 */
;

(function () {
  return __awaiter(this, void 0, void 0,
  /*#__PURE__*/
  _regenerator.default.mark(function _callee() {
    var uw, getcode;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            getcode = function _ref(fun) {
              return function () {
                var api = (0, _apiToTypeScriptCode.apiToTypeScriptCode)(fun());

                _util.default.copyTitle(api);

                return api;
              };
            };

            console.log('api 自动提取开始运行');
            uw = window.unsafeWindow ? window.unsafeWindow : window;
            console.log("test");
            uw._api = {
              getShowDocApiCode: getcode(_showDocApi.getShowDocApi),
              getYapiApiCode: getcode(_yapi.getYapiApi),
              get_swagger_bootstrap_ui_code: getcode(_swaggerBootstrapUi.swagger_bootstrap_ui),
              get_rap2_taobao_code: getcode(_rap2Taobo.getRap2Api)
            };
            setTimeout(function () {
              _util.default.copyTitle(uw._api.get_rap2_taobao_code());
            }, 2000);

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
})();
},{"@babel/runtime/regenerator":"PMvg","../网页笔记/util":"Cb2N","./parse/apiToTypeScriptCode":"ZABJ","./parse/showDocApi":"kJX2","./parse/swagger-bootstrap-ui":"Q4CB","./parse/yapi":"wRmx","./parse/rap2-taobo":"wCVr"}]},{},["p9T3"], null)