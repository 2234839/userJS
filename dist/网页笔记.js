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
})({"../node_modules/@babel/runtime/helpers/arrayWithoutHoles.js":[function(require,module,exports) {
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  }
}

module.exports = _arrayWithoutHoles;
},{}],"../node_modules/@babel/runtime/helpers/iterableToArray.js":[function(require,module,exports) {
function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

module.exports = _iterableToArray;
},{}],"../node_modules/@babel/runtime/helpers/nonIterableSpread.js":[function(require,module,exports) {
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

module.exports = _nonIterableSpread;
},{}],"../node_modules/@babel/runtime/helpers/toConsumableArray.js":[function(require,module,exports) {
var arrayWithoutHoles = require("./arrayWithoutHoles");

var iterableToArray = require("./iterableToArray");

var nonIterableSpread = require("./nonIterableSpread");

function _toConsumableArray(arr) {
  return arrayWithoutHoles(arr) || iterableToArray(arr) || nonIterableSpread();
}

module.exports = _toConsumableArray;
},{"./arrayWithoutHoles":"../node_modules/@babel/runtime/helpers/arrayWithoutHoles.js","./iterableToArray":"../node_modules/@babel/runtime/helpers/iterableToArray.js","./nonIterableSpread":"../node_modules/@babel/runtime/helpers/nonIterableSpread.js"}],"../node_modules/regenerator-runtime/runtime.js":[function(require,module,exports) {
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

},{}],"../node_modules/regenerator-runtime/runtime-module.js":[function(require,module,exports) {
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

},{"./runtime":"../node_modules/regenerator-runtime/runtime.js"}],"../node_modules/@babel/runtime/regenerator/index.js":[function(require,module,exports) {
module.exports = require("regenerator-runtime");

},{"regenerator-runtime":"../node_modules/regenerator-runtime/runtime-module.js"}],"util.ts":[function(require,module,exports) {
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
      result.done ? resolve(result.value) : new P(function (resolve) {
        resolve(result.value);
      }).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
/** 用于复制文本的input */


var input_copy = document.createElement('input');
input_copy.id = '__'; // input_copy.style.display='none'//不能设置为none因为会导致没有可访问性

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
},{"@babel/runtime/regenerator":"../node_modules/@babel/runtime/regenerator/index.js"}],"config.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  state: 0,

  /** 是否开启编辑 */
  elemtEdit: location.href.includes('127.0.0.1'),

  /** 服务器地址 */
  serverIp: 'https://127.0.0.1/note/'
};
exports.default = _default;
},{}],"../node_modules/@babel/runtime/helpers/typeof.js":[function(require,module,exports) {
function _typeof2(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof2 = function _typeof2(obj) { return typeof obj; }; } else { _typeof2 = function _typeof2(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof2(obj); }

function _typeof(obj) {
  if (typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol") {
    module.exports = _typeof = function _typeof(obj) {
      return _typeof2(obj);
    };
  } else {
    module.exports = _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
    };
  }

  return _typeof(obj);
}

module.exports = _typeof;
},{}],"../node_modules/@babel/runtime/helpers/assertThisInitialized.js":[function(require,module,exports) {
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

module.exports = _assertThisInitialized;
},{}],"../node_modules/@babel/runtime/helpers/possibleConstructorReturn.js":[function(require,module,exports) {
var _typeof = require("../helpers/typeof");

var assertThisInitialized = require("./assertThisInitialized");

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }

  return assertThisInitialized(self);
}

module.exports = _possibleConstructorReturn;
},{"../helpers/typeof":"../node_modules/@babel/runtime/helpers/typeof.js","./assertThisInitialized":"../node_modules/@babel/runtime/helpers/assertThisInitialized.js"}],"../node_modules/@babel/runtime/helpers/getPrototypeOf.js":[function(require,module,exports) {
function _getPrototypeOf(o) {
  module.exports = _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

module.exports = _getPrototypeOf;
},{}],"../node_modules/@babel/runtime/helpers/setPrototypeOf.js":[function(require,module,exports) {
function _setPrototypeOf(o, p) {
  module.exports = _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

module.exports = _setPrototypeOf;
},{}],"../node_modules/@babel/runtime/helpers/inherits.js":[function(require,module,exports) {
var setPrototypeOf = require("./setPrototypeOf");

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) setPrototypeOf(subClass, superClass);
}

module.exports = _inherits;
},{"./setPrototypeOf":"../node_modules/@babel/runtime/helpers/setPrototypeOf.js"}],"../node_modules/@babel/runtime/helpers/classCallCheck.js":[function(require,module,exports) {
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

module.exports = _classCallCheck;
},{}],"../node_modules/@babel/runtime/helpers/createClass.js":[function(require,module,exports) {
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

module.exports = _createClass;
},{}],"ui/style.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Style = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Style = function Style() {
  (0, _classCallCheck2.default)(this, Style);
};

exports.Style = Style;
Style.message = "\n    border: 1px solid black;\n    background-color: white;\n    position: fixed;\n    top: 20px;\n    left: 30px;\n    animation: llej_myfirst 5s;\n    ";
Style.warning = "\n    border: 1px solid black;\n    background-color: red;\n    position: fixed;\n    top: 20px;\n    left: 30px;\n    ";
Style.note = "\n    border: 1px solid black;\n    background-color: #c6c5ba;\n    position: sticky;\n    top: 20px;\n    left: 30px;\n    width: auto;\n    height: auto;\n    ";
/** 注入动画 */

var keyframes = document.createElement('style');
keyframes.innerHTML = "\n@keyframes llej_myfirst\n{\n    from { background: red; }\n    to { background: yellow; }\n}\n";
document.head.appendChild(keyframes);
},{"@babel/runtime/helpers/classCallCheck":"../node_modules/@babel/runtime/helpers/classCallCheck.js"}],"ui/message.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Message = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _style = require("./style");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** 消息的基类 扩展类记得重写 thatMessage 以免公用出现bug */
var Message =
/*#__PURE__*/
function () {
  function Message(par) {
    (0, _classCallCheck2.default)(this, Message);
    this.el = document.createElement('msg-llej');
    /** 用来指向不同的类，以便扩展这个类的类的old_message不被公用 */

    this.autoHideTime = 1000 * 3;
    this.setThis(par);
  }
  /** 进行一些赋值工作 */


  (0, _createClass2.default)(Message, [{
    key: "setThis",
    value: function setThis(_ref) {
      var _ref$style = _ref.style,
          style = _ref$style === void 0 ? _style.Style.message : _ref$style,
          msg = _ref.msg;
      this.el.innerHTML = "\n        <div style=\"".concat(style, "\">").concat(msg, "</div>\n        ");
    }
    /** 展示el */

  }, {
    key: "show",
    value: function show() {
      document.body.appendChild(this.el);
      return this;
    }
    /** 隐藏el */

  }, {
    key: "hide",
    value: function hide() {
      this.el.remove();
      return this;
    }
    /** 展示el  autoHideTime 毫秒后隐藏*/

  }, {
    key: "autoHide",
    value: function autoHide() {
      var _this = this;

      this.show();
      setTimeout(function () {
        _this.hide();
      }, this.autoHideTime);
      return this;
    }
    /** 获取一个Messag对象，它不一定是新的。这是为了优化内存占用 */

  }], [{
    key: "getMessage",
    value: function getMessage(par) {
      return new Message(par);
    }
  }]);
  return Message;
}();

exports.Message = Message;
},{"@babel/runtime/helpers/classCallCheck":"../node_modules/@babel/runtime/helpers/classCallCheck.js","@babel/runtime/helpers/createClass":"../node_modules/@babel/runtime/helpers/createClass.js","./style":"ui/style.ts"}],"ui/note.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.note = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _message = require("./message");

var _style = require("./style");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** 笔记的 */
var note =
/*#__PURE__*/
function (_Message) {
  (0, _inherits2.default)(note, _Message);

  function note(_ref) {
    var _this;

    var el = _ref.el;
    (0, _classCallCheck2.default)(this, note);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(note).call(this, {
      msg: '111111111111111111111',
      style: _style.Style.note
    }));
    _this.selectEl = el;
    return _this;
  }

  (0, _createClass2.default)(note, [{
    key: "show",
    value: function show() {
      this.selectEl.appendChild(this.el);
      return this;
    }
  }]);
  return note;
}(_message.Message);

exports.note = note;
},{"@babel/runtime/helpers/classCallCheck":"../node_modules/@babel/runtime/helpers/classCallCheck.js","@babel/runtime/helpers/createClass":"../node_modules/@babel/runtime/helpers/createClass.js","@babel/runtime/helpers/possibleConstructorReturn":"../node_modules/@babel/runtime/helpers/possibleConstructorReturn.js","@babel/runtime/helpers/getPrototypeOf":"../node_modules/@babel/runtime/helpers/getPrototypeOf.js","@babel/runtime/helpers/inherits":"../node_modules/@babel/runtime/helpers/inherits.js","./message":"ui/message.ts","./style":"ui/style.ts"}],"Command.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommandControl = exports.addNote = exports.closeEditSelect = exports.editSelect = exports.deleteSelect = void 0;

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _message = require("./ui/message");

var _note = require("./ui/note");

var _util = require("./util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** 每一个命令都应该实现的东西 */
var Command =
/*#__PURE__*/
function () {
  function Command(
  /** 要被删除的元素 */
  select) {
    (0, _classCallCheck2.default)(this, Command);
    this.selectEL = select;
  }
  /** 执行这个命令 */


  (0, _createClass2.default)(Command, [{
    key: "do",
    value: function _do() {
      return this;
    }
    /** 撤销这个命令 */

  }, {
    key: "undo",
    value: function undo() {
      return this;
    }
    /** 重新执行命令 */

  }, {
    key: "redo",
    value: function redo() {
      return this.do();
    }
    /** 将命令变成可以转化为json字符串的对象 */

  }, {
    key: "toCommandJSON",
    value: function toCommandJSON() {
      return {
        selectEL: (0, _util.getSelectors)(this.selectEL),
        constructor: this.__proto__.constructor.name
      };
    }
    /** 加载commandJSON转变为命令,通过泛型来构造对象的方式 */

  }], [{
    key: "load",
    value: function load(obj, CLASS) {
      return new CLASS(document.querySelector(obj.selectEL));
    }
  }]);
  return Command;
}();
/** 删除一个元素 */


var deleteSelect =
/*#__PURE__*/
function (_Command) {
  (0, _inherits2.default)(deleteSelect, _Command);

  function deleteSelect() {
    (0, _classCallCheck2.default)(this, deleteSelect);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(deleteSelect).apply(this, arguments));
  }

  (0, _createClass2.default)(deleteSelect, [{
    key: "do",
    value: function _do() {
      this.selectEL_display = this.selectEL.style.display;
      this.selectEL.style.display = "none";
      return this;
    }
  }, {
    key: "undo",
    value: function undo() {
      this.selectEL.style.display = this.selectEL_display;
      return this;
    }
  }]);
  return deleteSelect;
}(Command);
/** 使元素可编辑 */


exports.deleteSelect = deleteSelect;

var editSelect =
/*#__PURE__*/
function (_Command2) {
  (0, _inherits2.default)(editSelect, _Command2);

  function editSelect() {
    (0, _classCallCheck2.default)(this, editSelect);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(editSelect).apply(this, arguments));
  }

  (0, _createClass2.default)(editSelect, [{
    key: "do",
    value: function _do() {
      this.selectEL_contentEditable = this.selectEL.contentEditable;
      this.selectEL.contentEditable = 'true';
      return this;
    }
  }, {
    key: "undo",
    value: function undo() {
      this.selectEL.contentEditable = this.selectEL_contentEditable;
      return this;
    }
  }]);
  return editSelect;
}(Command);
/** 使元素不可编辑 */


exports.editSelect = editSelect;

var closeEditSelect =
/*#__PURE__*/
function (_Command3) {
  (0, _inherits2.default)(closeEditSelect, _Command3);

  function closeEditSelect() {
    (0, _classCallCheck2.default)(this, closeEditSelect);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(closeEditSelect).apply(this, arguments));
  }

  (0, _createClass2.default)(closeEditSelect, [{
    key: "do",
    value: function _do() {
      this.selectEL_contentEditable = this.selectEL.contentEditable;
      this.selectEL.contentEditable = 'false';
      return this;
    }
  }, {
    key: "undo",
    value: function undo() {
      this.selectEL.contentEditable = this.selectEL_contentEditable;
      return this;
    }
  }]);
  return closeEditSelect;
}(Command);
/** 新增一个笔记 */


exports.closeEditSelect = closeEditSelect;

var addNote =
/*#__PURE__*/
function (_Command4) {
  (0, _inherits2.default)(addNote, _Command4);

  function addNote() {
    (0, _classCallCheck2.default)(this, addNote);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(addNote).apply(this, arguments));
  }

  (0, _createClass2.default)(addNote, [{
    key: "do",
    value: function _do() {
      this.note = new _note.note({
        el: this.selectEL
      }).show();
      return this;
    }
  }, {
    key: "undo",
    value: function undo() {
      this.note.hide();
      return this;
    }
  }, {
    key: "redo",
    value: function redo() {
      this.note.show();
      return this;
    }
  }]);
  return addNote;
}(Command);
/** 命令控制器 */


exports.addNote = addNote;
var CommandControl = {
  commandStack: [],
  backoutStack: [],
  pushCommand: function pushCommand(command) {
    return this.commandStack.push(command);
  },
  run: function run(command) {
    this.backoutStack.splice(0, this.backoutStack.length);
    return this.pushCommand(command.do());
  },
  backout: function backout() {
    if (this.commandStack.length === 0) {
      console.warn('命令栈已空，无法进行撤销');

      _message.Message.getMessage({
        msg: '命令栈已空，无法进行撤销'
      }).autoHide();

      return;
    }

    var command = this.commandStack.pop();
    return this.backoutStack.push(command.undo());
  },
  reform: function reform() {
    if (this.backoutStack.length === 0) {
      console.warn('撤销栈已空，无法进行重做');

      _message.Message.getMessage({
        msg: '撤销栈已空，无法进行重做'
      }).autoHide();

      return;
    }

    var command = this.backoutStack.pop();
    return this.commandStack.push(command.redo());
  },
  loadCommandJSON: function loadCommandJSON(obj) {
    if (obj.constructor === "deleteSelect") return Command.load(obj, deleteSelect);
    if (obj.constructor === "editSelect") return Command.load(obj, editSelect);
    if (obj.constructor === "closeEditSelect") return Command.load(obj, closeEditSelect);
    if (obj.constructor === "addNote") return Command.load(obj, addNote);
  },
  getCommandStackJsonObj: function getCommandStackJsonObj() {
    return this.commandStack.map(function (a) {
      return a.toCommandJSON();
    });
  },
  getCommandStackJSON: function getCommandStackJSON() {
    return JSON.stringify(this.getCommandStackJsonObj());
  },
  loadCommandJsonAndRun: function loadCommandJsonAndRun(str) {
    var _this = this;

    if (str === undefined) return false;
    var commandJSON = str ? JSON.parse(str) : [];
    commandJSON.map(this.loadCommandJSON).forEach(function (command) {
      return _this.run(command);
    });
    return true;
  }
};
exports.CommandControl = CommandControl;
},{"@babel/runtime/helpers/possibleConstructorReturn":"../node_modules/@babel/runtime/helpers/possibleConstructorReturn.js","@babel/runtime/helpers/getPrototypeOf":"../node_modules/@babel/runtime/helpers/getPrototypeOf.js","@babel/runtime/helpers/inherits":"../node_modules/@babel/runtime/helpers/inherits.js","@babel/runtime/helpers/classCallCheck":"../node_modules/@babel/runtime/helpers/classCallCheck.js","@babel/runtime/helpers/createClass":"../node_modules/@babel/runtime/helpers/createClass.js","./ui/message":"ui/message.ts","./ui/note":"ui/note.ts","./util":"util.ts"}],"ui/warning.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Warning = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _message = require("./message");

var _style = require("./style");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Warning =
/*#__PURE__*/
function (_Message) {
  (0, _inherits2.default)(Warning, _Message);

  function Warning(_ref) {
    var msg = _ref.msg;
    (0, _classCallCheck2.default)(this, Warning);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Warning).call(this, {
      msg: msg,
      style: _style.Style.warning
    }));
  }

  return Warning;
}(_message.Message);

exports.Warning = Warning;
},{"@babel/runtime/helpers/classCallCheck":"../node_modules/@babel/runtime/helpers/classCallCheck.js","@babel/runtime/helpers/possibleConstructorReturn":"../node_modules/@babel/runtime/helpers/possibleConstructorReturn.js","@babel/runtime/helpers/getPrototypeOf":"../node_modules/@babel/runtime/helpers/getPrototypeOf.js","@babel/runtime/helpers/inherits":"../node_modules/@babel/runtime/helpers/inherits.js","./message":"ui/message.ts","./style":"ui/style.ts"}],"store.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setLocalItem = setLocalItem;
exports.getLocalItem = getLocalItem;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var __awaiter = void 0 && (void 0).__awaiter || function (thisArg, _arguments, P, generator) {
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
      result.done ? resolve(result.value) : new P(function (resolve) {
        resolve(result.value);
      }).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
/** 设置一条本地存储 */


function setLocalItem(name, value) {
  return __awaiter(this, void 0, void 0,
  /*#__PURE__*/
  _regenerator.default.mark(function _callee() {
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(window.hasOwnProperty("GM") && window.hasOwnProperty("GM"))) {
              _context.next = 6;
              break;
            }

            _context.next = 3;
            return GM.setValue(name, value);

          case 3:
            return _context.abrupt("return", _context.sent);

          case 6:
            _context.next = 8;
            return localStorage.setItem(name, String(value));

          case 8:
            return _context.abrupt("return", _context.sent);

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
}
/** 读取一条本地存储 */


function getLocalItem(
/** 键名 */
name,
/** 没有的时候的默认值 */
defaultValue) {
  return __awaiter(this, void 0, void 0,
  /*#__PURE__*/
  _regenerator.default.mark(function _callee2() {
    var res, value;
    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (!(window.hasOwnProperty("GM") && window.hasOwnProperty("GM"))) {
              _context2.next = 8;
              break;
            }

            _context2.next = 3;
            return GM.getValue(name, defaultValue);

          case 3:
            res = _context2.sent;
            console.log(res);
            return _context2.abrupt("return", res);

          case 8:
            value = localStorage.getItem(name);

            if (!(value === null)) {
              _context2.next = 13;
              break;
            }

            _context2.next = 12;
            return defaultValue;

          case 12:
            return _context2.abrupt("return", _context2.sent);

          case 13:
            _context2.next = 15;
            return value;

          case 15:
            return _context2.abrupt("return", _context2.sent);

          case 16:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
}
},{"@babel/runtime/regenerator":"../node_modules/@babel/runtime/regenerator/index.js"}],"ajax.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.au_getJSON = au_getJSON;
exports.login = login;
exports.remote_getStore = remote_getStore;
exports.remote_setStore = remote_setStore;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _util = require("./util");

var _config = _interopRequireDefault(require("./config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var __awaiter = void 0 && (void 0).__awaiter || function (thisArg, _arguments, P, generator) {
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
      result.done ? resolve(result.value) : new P(function (resolve) {
        resolve(result.value);
      }).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

/** 用来识别身份的key */
var key = '';
/** 附带登录信息的ajax */

function au_getJSON(url, data) {
  return __awaiter(this, void 0, void 0,
  /*#__PURE__*/
  _regenerator.default.mark(function _callee() {
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            data.key = key;
            return _context.abrupt("return", (0, _util.getJSon)(url, data));

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
}
/** 登录 */


function login(par) {
  return __awaiter(this, void 0, void 0,
  /*#__PURE__*/
  _regenerator.default.mark(function _callee2() {
    var res;
    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return (0, _util.getJSon)(_config.default.serverIp + 'login', par);

          case 2:
            res = _context2.sent;
            if (res.body && res.body.length > 0) key = res.body;
            return _context2.abrupt("return", res);

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
}
/** 获取存储库 */


function remote_getStore(par) {
  return __awaiter(this, void 0, void 0,
  /*#__PURE__*/
  _regenerator.default.mark(function _callee3() {
    return _regenerator.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return au_getJSON(_config.default.serverIp + 'getStore', par);

          case 2:
            return _context3.abrupt("return", _context3.sent);

          case 3:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
}
/** 获取存储库 */


function remote_setStore(par) {
  return __awaiter(this, void 0, void 0,
  /*#__PURE__*/
  _regenerator.default.mark(function _callee4() {
    return _regenerator.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return au_getJSON(_config.default.serverIp + 'setStore', par);

          case 2:
            return _context4.abrupt("return", _context4.sent);

          case 3:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
}
},{"@babel/runtime/regenerator":"../node_modules/@babel/runtime/regenerator/index.js","./util":"util.ts","./config":"config.ts"}],"网页笔记.ts":[function(require,module,exports) {
"use strict";

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _util = _interopRequireWildcard(require("./util"));

var _config = _interopRequireDefault(require("./config"));

var _Command = require("./Command");

var _warning = require("./ui/warning");

var _message = require("./ui/message");

var _store = require("./store");

var _ajax = require("./ajax");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var __awaiter = void 0 && (void 0).__awaiter || function (thisArg, _arguments, P, generator) {
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
      result.done ? resolve(result.value) : new P(function (resolve) {
        resolve(result.value);
      }).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

// ==UserScript==
// @name         网页文本编辑,做笔记的好选择
// @namespace    http://tampermonkey.net/
// @version      1.33
// @description  所见即所得！
// @author       You
// @match        *
// @include      *
// @connect      shenzilong.cn
// @grant        GM.setValue
// @grant        GM.getValue
// @grant        GM.xmlHttpRequest
// ==/UserScript==
;

(function () {
  return __awaiter(this, void 0, void 0,
  /*#__PURE__*/
  _regenerator.default.mark(function _callee5() {
    var path, editElement, mouse, outline, switchState, element_List_storeName, CommandStack_storeName, saveChanges, loadChanges;
    return _regenerator.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            loadChanges = function _ref5() {
              return __awaiter(this, void 0, void 0,
              /*#__PURE__*/
              _regenerator.default.mark(function _callee4() {
                var _this = this;

                var localStorageSaveListStr, saveList;
                return _regenerator.default.wrap(function _callee4$(_context4) {
                  while (1) {
                    switch (_context4.prev = _context4.next) {
                      case 0:
                        _context4.next = 2;
                        return (0, _store.getLocalItem)(element_List_storeName, undefined);

                      case 2:
                        localStorageSaveListStr = _context4.sent;
                        saveList = localStorageSaveListStr ? JSON.parse(localStorageSaveListStr) : [];
                        _context4.t0 = _Command.CommandControl;
                        _context4.next = 7;
                        return (0, _store.getLocalItem)(CommandStack_storeName);

                      case 7:
                        _context4.t1 = _context4.sent;

                        _context4.t0.loadCommandJsonAndRun.call(_context4.t0, _context4.t1);

                        saveList.forEach(function (selectors) {
                          return __awaiter(_this, void 0, void 0,
                          /*#__PURE__*/
                          _regenerator.default.mark(function _callee3() {
                            var el;
                            return _regenerator.default.wrap(function _callee3$(_context3) {
                              while (1) {
                                switch (_context3.prev = _context3.next) {
                                  case 0:
                                    el = document.querySelector(selectors);

                                    if (!(el === null)) {
                                      _context3.next = 3;
                                      break;
                                    }

                                    return _context3.abrupt("return", console.error("".concat(selectors, " \u7684\u5143\u7D20\u65E0\u6CD5\u627E\u5230\uFF0C\u8D4B\u503C\u5931\u8D25")));

                                  case 3:
                                    _context3.next = 5;
                                    return (0, _store.getLocalItem)(selectors);

                                  case 5:
                                    el.innerHTML = _context3.sent;

                                  case 6:
                                  case "end":
                                    return _context3.stop();
                                }
                              }
                            }, _callee3);
                          }));
                        });
                        console.log('加载修改完毕');

                      case 11:
                      case "end":
                        return _context4.stop();
                    }
                  }
                }, _callee4);
              }));
            };

            saveChanges = function _ref4(editElement) {
              return __awaiter(this, void 0, void 0,
              /*#__PURE__*/
              _regenerator.default.mark(function _callee2() {
                var localStorageSaveListStr, saveList, data, saveSet, element_List_Str, CommandStack_str;
                return _regenerator.default.wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        _context2.next = 2;
                        return (0, _store.getLocalItem)(element_List_storeName, undefined);

                      case 2:
                        localStorageSaveListStr = _context2.sent;
                        saveList = localStorageSaveListStr ? JSON.parse(localStorageSaveListStr) : [];
                        data = {
                          a: {
                            sss: 11111
                          }
                        };
                        saveSet = new Set(saveList);
                        editElement.forEach(function (el) {
                          var selectors = (0, _util.getSelectors)(el);
                          saveSet.add(selectors);
                          data[selectors] = el.innerHTML;
                          (0, _store.setLocalItem)(selectors, el.innerHTML);
                        });
                        element_List_Str = JSON.stringify((0, _toConsumableArray2.default)(saveSet));
                        CommandStack_str = _Command.CommandControl.getCommandStackJSON();
                        (0, _store.setLocalItem)(element_List_storeName, element_List_Str);
                        (0, _store.setLocalItem)(CommandStack_storeName, CommandStack_str);
                        data.element_List = (0, _toConsumableArray2.default)(saveSet);
                        data.CommandStack = _Command.CommandControl.getCommandStackJsonObj();
                        return _context2.abrupt("return", data);

                      case 14:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, _callee2);
              }));
            };

            switchState = function _ref3(mouse, event) {
              _config.default.elemtEdit = !_config.default.elemtEdit;
              console.log('切换编辑状态', _config.default.elemtEdit);
              if (_config.default.elemtEdit) //不处于编辑状态则移除鼠标监听事件，降低性能的消耗
                document.addEventListener('mouseover', mouse);else document.removeEventListener("mouseover", mouse);
              event.preventDefault();
              event.returnValue = false;
              return false;
            };

            outline = function _ref2(elemt) {
              if (elemt.style.outline == "2px solid red") return;
              elemt.style.outline = "2px solid red";
              setTimeout(function () {
                if (elemt == path[0]) {
                  outline(elemt);
                  return;
                }

                elemt.style.outline = "";
              }, 400);
            };

            mouse = function _ref(event) {
              if (event.target instanceof HTMLElement) {
                path = (0, _util.nodePath)(event.target);
                outline(event.target);
              }
            };

            /** 调试用 */
            window.CommandControl = _Command.CommandControl; // console.log(await login({
            //     user:'崮生',
            //     secret_key:'1998'
            // }));
            // console.log(await remote_getStore({
            //     url: '崮生'
            // }));

            /** 存储鼠标所在位置的所有元素 */

            /** 被修改后的元素 */
            editElement = new Set();
            /** 监听鼠标移动 */

            if (_config.default.elemtEdit) {
              document.addEventListener('mouseover', mouse);
            }
            /** 监测按键事件 */


            document.addEventListener('keydown', function (event) {
              return __awaiter(this, void 0, void 0,
              /*#__PURE__*/
              _regenerator.default.mark(function _callee() {
                var code;
                return _regenerator.default.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        code = event.code;

                        if (!(code === 'F2')) {
                          _context.next = 3;
                          break;
                        }

                        return _context.abrupt("return", switchState(mouse, event));

                      case 3:
                        if (!(_config.default.elemtEdit === false)) {
                          _context.next = 5;
                          break;
                        }

                        return _context.abrupt("return");

                      case 5:
                        if (!(document.querySelectorAll(":focus").length > 0)) {
                          _context.next = 7;
                          break;
                        }

                        return _context.abrupt("return");

                      case 7:
                        _context.t0 = code;
                        _context.next = _context.t0 === 'KeyQ' ? 10 : _context.t0 === 'KeyD' ? 12 : _context.t0 === 'KeyC' ? 14 : _context.t0 === "KeyW" ? 17 : _context.t0 === 'KeyZ' ? 19 : _context.t0 === "KeyY" ? 21 : _context.t0 === "KeyN" ? 23 : _context.t0 === "KeyS" ? 25 : _context.t0 === "KeyO" ? 28 : _context.t0 === "KeyP" ? 39 : 41;
                        break;

                      case 10:
                        /** 使元素可编辑 */
                        _Command.CommandControl.run(new _Command.editSelect(path[0]));

                        return _context.abrupt("break", 42);

                      case 12:
                        /** 删除元素 */
                        _Command.CommandControl.run(new _Command.deleteSelect(path[0]));

                        return _context.abrupt("break", 42);

                      case 14:
                        /** 赋值titile */
                        _util.default.copyTitle(path[0]);

                        if (!(event.ctrlKey === false)) {
                          _context.next = 17;
                          break;
                        }

                        return _context.abrupt("break", 42);

                      case 17:
                        /** 关闭可编辑 */
                        _Command.CommandControl.run(new _Command.closeEditSelect(path[0]));

                        return _context.abrupt("break", 42);

                      case 19:
                        /** 撤销 */
                        _Command.CommandControl.backout();

                        return _context.abrupt("break", 42);

                      case 21:
                        /** 重做 */
                        _Command.CommandControl.reform();

                        return _context.abrupt("break", 42);

                      case 23:
                        /** 新增笔记 */
                        _Command.CommandControl.run(new _Command.addNote(path[0]));

                        return _context.abrupt("break", 42);

                      case 25:
                        /** 保存所有的修改 */
                        saveChanges(editElement);
                        new _message.Message({
                          msg: '保存成功'
                        }).autoHide();
                        return _context.abrupt("break", 42);

                      case 28:
                        _context.t1 = _ajax.remote_setStore;
                        _context.t2 = location.origin + location.pathname;
                        _context.t3 = JSON;
                        _context.next = 33;
                        return saveChanges(editElement);

                      case 33:
                        _context.t4 = _context.sent;
                        _context.t5 = _context.t3.stringify.call(_context.t3, _context.t4);
                        _context.t6 = {
                          url: _context.t2,
                          store: _context.t5
                        };

                        _context.t7 = function (r) {
                          new _message.Message({
                            msg: "云端存储:" + r.message
                          }).autoHide();
                        };

                        (0, _context.t1)(_context.t6).then(_context.t7);
                        return _context.abrupt("break", 42);

                      case 39:
                        /** 从云端下载修改 */
                        (0, _ajax.remote_getStore)({
                          url: location.origin + location.pathname
                        }).then(function (r) {
                          if (r.body === undefined || r.body.length === 0) return new _message.Message({
                            msg: "没有发现可用的云端存储"
                          }).autoHide();
                          var store = JSON.parse(r.body[0].store);
                          console.log(store);

                          for (var key in store) {
                            if (store.hasOwnProperty(key)) {
                              var element = store[key];
                              (0, _store.setLocalItem)(key, element);
                            }
                          }

                          loadChanges();
                          new _message.Message({
                            msg: "云端存储:" + r.message
                          }).autoHide();
                        });
                        return _context.abrupt("break", 42);

                      case 41:
                        return _context.abrupt("return", true);

                      case 42:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee);
              }));
            });
            /** 元素失去焦点 */

            document.addEventListener('focusout', function () {
              console.log('元素失去焦点', event.target);
            });
            /** 元素被编辑了 */

            document.addEventListener('input', function (event) {
              if (event.target instanceof HTMLElement) {
                var el = event.target;
                if (el.innerHTML.length > 10 * 1000) new _warning.Warning({
                  msg: '该元素文本过大，将不会保存这里的修改，请选择更确定的文本元素。'
                }).autoHide();else editElement.add(el);
              }
            });
            /** 轮廓线,用以显示当前元素 */

            /** 保存的路径是页面的路径 */
            element_List_storeName = '__saveList__llej__' + location.origin + location.pathname;
            /** commandJSON 命令栈 */

            CommandStack_storeName = '__CommandStack__llej__' + location.origin + location.pathname;
            /** 保存修改 */

            /** 自动保存 */
            setInterval(function () {
              saveChanges(editElement);
              new _message.Message({
                msg: '自动保存成功...'
              }).autoHide();
            }, 1000 * 60);
            /** 加载修改 */

            ;

            if (document.readyState === "complete") {
              loadChanges();
            } else {
              window.addEventListener('load', function () {
                loadChanges();
              });
            }

          case 16:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));
})();
/*
# 使网页可编辑
* 按下F2启用元素编辑，再次按下可以关闭
* 将鼠标移动到你要修改的文本上方
*      按下 q 就会将该元素设为可编辑，对于链接可以按住alt键点击，这样就不会跳转
*      按下 w 设置元素为不可编辑
*      按下 d 就会删除该元素
*      按下 c 会将元素的title（一般为该元素描述）复制到剪贴板（如果存在的话）,此命令不可被撤销和重做
*      按下 z 将会撤销一次命令
*      按下 y 将重做一次命令
*      按下 n 将添加一个便签笔记,此命令处于实验期，无法正常使用
*      按下 s 保存你的所有修改  每60秒会自动保存一次,实验性命令可能之后的不会兼容
* 注意！在元素获得焦点（一般是你在输入文本的时候）的情况下，上面这些按键将进行正常的输入
* 对本地打开的网页的修改 需要在浏览器中设置允许插件在文件地址上运行

## 为什么要开发这样一个插件?
* 这源于我一次在看mdn文档时,想要做笔记,正打算和以前一样将网页复制进word中添加笔记等等
* 突然察觉我为什么要多此一举?
* 直接在网页中写笔记不好吗
* 所以有了这个插件,你可以利用这个插件来修改网页上的文本,然后按下ctrl+s将这些改动永久保存在本地
* 建议允许插件在文件地址上运行
* 正在想方法让笔记存在云端

## v1.32 的更新介绍
* 最近得空了，开始更新
* 新增了撤销和重做功能，优化了代码
* 因为（ctrl + 其他键）的模式 在一些浏览器上还是会出现冲突，故改为F2键来作为开关
* 下一版本将实现便签功能.
* 正在进行云端存储的后台工作。在不远的将来将实现笔记备份至云端。
* 希望各位能将你们想要的功能进行一个反馈
*/
},{"@babel/runtime/helpers/toConsumableArray":"../node_modules/@babel/runtime/helpers/toConsumableArray.js","@babel/runtime/regenerator":"../node_modules/@babel/runtime/regenerator/index.js","./util":"util.ts","./config":"config.ts","./Command":"Command.ts","./ui/warning":"ui/warning.ts","./ui/message":"ui/message.ts","./store":"store.ts","./ajax":"ajax.ts"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "51956" + '/');

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
      } else {
        window.location.reload();
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
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","网页笔记.ts"], null)
//# sourceMappingURL=../dist/网页笔记.js.map