(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
  var __esm = (fn, res) => function __init() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  };
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __export = (target, all) => {
    for (var name7 in all)
      __defProp(target, name7, { get: all[name7], enumerable: true });
  };
  var __reExport = (target, module, copyDefault, desc) => {
    if (module && typeof module === "object" || typeof module === "function") {
      for (let key of __getOwnPropNames(module))
        if (!__hasOwnProp.call(target, key) && (copyDefault || key !== "default"))
          __defProp(target, key, { get: () => module[key], enumerable: !(desc = __getOwnPropDesc(module, key)) || desc.enumerable });
    }
    return target;
  };
  var __toESM = (module, isNodeMode) => {
    return __reExport(__markAsModule(__defProp(module != null ? __create(__getProtoOf(module)) : {}, "default", !isNodeMode && module && module.__esModule ? { get: () => module.default, enumerable: true } : { value: module, enumerable: true })), module);
  };
  var __toCommonJS = /* @__PURE__ */ ((cache) => {
    return (module, temp) => {
      return cache && cache.get(module) || (temp = __reExport(__markAsModule({}), module, 1), cache && cache.set(module, temp), temp);
    };
  })(typeof WeakMap !== "undefined" ? /* @__PURE__ */ new WeakMap() : 0);

  // node_modules/@firebase/util/dist/index.esm2017.js
  function deepExtend(target, source) {
    if (!(source instanceof Object)) {
      return source;
    }
    switch (source.constructor) {
      case Date:
        const dateValue = source;
        return new Date(dateValue.getTime());
      case Object:
        if (target === void 0) {
          target = {};
        }
        break;
      case Array:
        target = [];
        break;
      default:
        return source;
    }
    for (const prop in source) {
      if (!source.hasOwnProperty(prop) || !isValidKey(prop)) {
        continue;
      }
      target[prop] = deepExtend(target[prop], source[prop]);
    }
    return target;
  }
  function isValidKey(key) {
    return key !== "__proto__";
  }
  function getUA() {
    if (typeof navigator !== "undefined" && typeof navigator["userAgent"] === "string") {
      return navigator["userAgent"];
    } else {
      return "";
    }
  }
  function isMobileCordova() {
    return typeof window !== "undefined" && !!(window["cordova"] || window["phonegap"] || window["PhoneGap"]) && /ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(getUA());
  }
  function isNode() {
    try {
      return Object.prototype.toString.call(global.process) === "[object process]";
    } catch (e) {
      return false;
    }
  }
  function isBrowser() {
    return typeof self === "object" && self.self === self;
  }
  function isBrowserExtension() {
    const runtime = typeof chrome === "object" ? chrome.runtime : typeof browser === "object" ? browser.runtime : void 0;
    return typeof runtime === "object" && runtime.id !== void 0;
  }
  function isReactNative() {
    return typeof navigator === "object" && navigator["product"] === "ReactNative";
  }
  function isIE() {
    const ua = getUA();
    return ua.indexOf("MSIE ") >= 0 || ua.indexOf("Trident/") >= 0;
  }
  function isIndexedDBAvailable() {
    return typeof indexedDB === "object";
  }
  function replaceTemplate(template, data) {
    return template.replace(PATTERN, (_, key) => {
      const value = data[key];
      return value != null ? String(value) : `<${key}?>`;
    });
  }
  function contains(obj, key) {
    return Object.prototype.hasOwnProperty.call(obj, key);
  }
  function isEmpty(obj) {
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        return false;
      }
    }
    return true;
  }
  function deepEqual(a, b) {
    if (a === b) {
      return true;
    }
    const aKeys = Object.keys(a);
    const bKeys = Object.keys(b);
    for (const k of aKeys) {
      if (!bKeys.includes(k)) {
        return false;
      }
      const aProp = a[k];
      const bProp = b[k];
      if (isObject(aProp) && isObject(bProp)) {
        if (!deepEqual(aProp, bProp)) {
          return false;
        }
      } else if (aProp !== bProp) {
        return false;
      }
    }
    for (const k of bKeys) {
      if (!aKeys.includes(k)) {
        return false;
      }
    }
    return true;
  }
  function isObject(thing) {
    return thing !== null && typeof thing === "object";
  }
  function querystring(querystringParams) {
    const params = [];
    for (const [key, value] of Object.entries(querystringParams)) {
      if (Array.isArray(value)) {
        value.forEach((arrayVal) => {
          params.push(encodeURIComponent(key) + "=" + encodeURIComponent(arrayVal));
        });
      } else {
        params.push(encodeURIComponent(key) + "=" + encodeURIComponent(value));
      }
    }
    return params.length ? "&" + params.join("&") : "";
  }
  function querystringDecode(querystring2) {
    const obj = {};
    const tokens = querystring2.replace(/^\?/, "").split("&");
    tokens.forEach((token) => {
      if (token) {
        const [key, value] = token.split("=");
        obj[decodeURIComponent(key)] = decodeURIComponent(value);
      }
    });
    return obj;
  }
  function extractQuerystring(url) {
    const queryStart = url.indexOf("?");
    if (!queryStart) {
      return "";
    }
    const fragmentStart = url.indexOf("#", queryStart);
    return url.substring(queryStart, fragmentStart > 0 ? fragmentStart : void 0);
  }
  function createSubscribe(executor, onNoObservers) {
    const proxy = new ObserverProxy(executor, onNoObservers);
    return proxy.subscribe.bind(proxy);
  }
  function implementsAnyMethods(obj, methods) {
    if (typeof obj !== "object" || obj === null) {
      return false;
    }
    for (const method of methods) {
      if (method in obj && typeof obj[method] === "function") {
        return true;
      }
    }
    return false;
  }
  function noop() {
  }
  function getModularInstance(service) {
    if (service && service._delegate) {
      return service._delegate;
    } else {
      return service;
    }
  }
  var stringToByteArray$1, byteArrayToString, base64, base64Decode, Deferred, ERROR_NAME, FirebaseError, ErrorFactory, PATTERN, ObserverProxy, MAX_VALUE_MILLIS;
  var init_index_esm2017 = __esm({
    "node_modules/@firebase/util/dist/index.esm2017.js"() {
      stringToByteArray$1 = function(str) {
        const out = [];
        let p = 0;
        for (let i = 0; i < str.length; i++) {
          let c = str.charCodeAt(i);
          if (c < 128) {
            out[p++] = c;
          } else if (c < 2048) {
            out[p++] = c >> 6 | 192;
            out[p++] = c & 63 | 128;
          } else if ((c & 64512) === 55296 && i + 1 < str.length && (str.charCodeAt(i + 1) & 64512) === 56320) {
            c = 65536 + ((c & 1023) << 10) + (str.charCodeAt(++i) & 1023);
            out[p++] = c >> 18 | 240;
            out[p++] = c >> 12 & 63 | 128;
            out[p++] = c >> 6 & 63 | 128;
            out[p++] = c & 63 | 128;
          } else {
            out[p++] = c >> 12 | 224;
            out[p++] = c >> 6 & 63 | 128;
            out[p++] = c & 63 | 128;
          }
        }
        return out;
      };
      byteArrayToString = function(bytes) {
        const out = [];
        let pos = 0, c = 0;
        while (pos < bytes.length) {
          const c1 = bytes[pos++];
          if (c1 < 128) {
            out[c++] = String.fromCharCode(c1);
          } else if (c1 > 191 && c1 < 224) {
            const c2 = bytes[pos++];
            out[c++] = String.fromCharCode((c1 & 31) << 6 | c2 & 63);
          } else if (c1 > 239 && c1 < 365) {
            const c2 = bytes[pos++];
            const c3 = bytes[pos++];
            const c4 = bytes[pos++];
            const u = ((c1 & 7) << 18 | (c2 & 63) << 12 | (c3 & 63) << 6 | c4 & 63) - 65536;
            out[c++] = String.fromCharCode(55296 + (u >> 10));
            out[c++] = String.fromCharCode(56320 + (u & 1023));
          } else {
            const c2 = bytes[pos++];
            const c3 = bytes[pos++];
            out[c++] = String.fromCharCode((c1 & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
          }
        }
        return out.join("");
      };
      base64 = {
        byteToCharMap_: null,
        charToByteMap_: null,
        byteToCharMapWebSafe_: null,
        charToByteMapWebSafe_: null,
        ENCODED_VALS_BASE: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
        get ENCODED_VALS() {
          return this.ENCODED_VALS_BASE + "+/=";
        },
        get ENCODED_VALS_WEBSAFE() {
          return this.ENCODED_VALS_BASE + "-_.";
        },
        HAS_NATIVE_SUPPORT: typeof atob === "function",
        encodeByteArray(input, webSafe) {
          if (!Array.isArray(input)) {
            throw Error("encodeByteArray takes an array as a parameter");
          }
          this.init_();
          const byteToCharMap = webSafe ? this.byteToCharMapWebSafe_ : this.byteToCharMap_;
          const output = [];
          for (let i = 0; i < input.length; i += 3) {
            const byte1 = input[i];
            const haveByte2 = i + 1 < input.length;
            const byte2 = haveByte2 ? input[i + 1] : 0;
            const haveByte3 = i + 2 < input.length;
            const byte3 = haveByte3 ? input[i + 2] : 0;
            const outByte1 = byte1 >> 2;
            const outByte2 = (byte1 & 3) << 4 | byte2 >> 4;
            let outByte3 = (byte2 & 15) << 2 | byte3 >> 6;
            let outByte4 = byte3 & 63;
            if (!haveByte3) {
              outByte4 = 64;
              if (!haveByte2) {
                outByte3 = 64;
              }
            }
            output.push(byteToCharMap[outByte1], byteToCharMap[outByte2], byteToCharMap[outByte3], byteToCharMap[outByte4]);
          }
          return output.join("");
        },
        encodeString(input, webSafe) {
          if (this.HAS_NATIVE_SUPPORT && !webSafe) {
            return btoa(input);
          }
          return this.encodeByteArray(stringToByteArray$1(input), webSafe);
        },
        decodeString(input, webSafe) {
          if (this.HAS_NATIVE_SUPPORT && !webSafe) {
            return atob(input);
          }
          return byteArrayToString(this.decodeStringToByteArray(input, webSafe));
        },
        decodeStringToByteArray(input, webSafe) {
          this.init_();
          const charToByteMap = webSafe ? this.charToByteMapWebSafe_ : this.charToByteMap_;
          const output = [];
          for (let i = 0; i < input.length; ) {
            const byte1 = charToByteMap[input.charAt(i++)];
            const haveByte2 = i < input.length;
            const byte2 = haveByte2 ? charToByteMap[input.charAt(i)] : 0;
            ++i;
            const haveByte3 = i < input.length;
            const byte3 = haveByte3 ? charToByteMap[input.charAt(i)] : 64;
            ++i;
            const haveByte4 = i < input.length;
            const byte4 = haveByte4 ? charToByteMap[input.charAt(i)] : 64;
            ++i;
            if (byte1 == null || byte2 == null || byte3 == null || byte4 == null) {
              throw Error();
            }
            const outByte1 = byte1 << 2 | byte2 >> 4;
            output.push(outByte1);
            if (byte3 !== 64) {
              const outByte2 = byte2 << 4 & 240 | byte3 >> 2;
              output.push(outByte2);
              if (byte4 !== 64) {
                const outByte3 = byte3 << 6 & 192 | byte4;
                output.push(outByte3);
              }
            }
          }
          return output;
        },
        init_() {
          if (!this.byteToCharMap_) {
            this.byteToCharMap_ = {};
            this.charToByteMap_ = {};
            this.byteToCharMapWebSafe_ = {};
            this.charToByteMapWebSafe_ = {};
            for (let i = 0; i < this.ENCODED_VALS.length; i++) {
              this.byteToCharMap_[i] = this.ENCODED_VALS.charAt(i);
              this.charToByteMap_[this.byteToCharMap_[i]] = i;
              this.byteToCharMapWebSafe_[i] = this.ENCODED_VALS_WEBSAFE.charAt(i);
              this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[i]] = i;
              if (i >= this.ENCODED_VALS_BASE.length) {
                this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(i)] = i;
                this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(i)] = i;
              }
            }
          }
        }
      };
      base64Decode = function(str) {
        try {
          return base64.decodeString(str, true);
        } catch (e) {
          console.error("base64Decode failed: ", e);
        }
        return null;
      };
      Deferred = class {
        constructor() {
          this.reject = () => {
          };
          this.resolve = () => {
          };
          this.promise = new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
          });
        }
        wrapCallback(callback) {
          return (error, value) => {
            if (error) {
              this.reject(error);
            } else {
              this.resolve(value);
            }
            if (typeof callback === "function") {
              this.promise.catch(() => {
              });
              if (callback.length === 1) {
                callback(error);
              } else {
                callback(error, value);
              }
            }
          };
        }
      };
      ERROR_NAME = "FirebaseError";
      FirebaseError = class extends Error {
        constructor(code, message, customData) {
          super(message);
          this.code = code;
          this.customData = customData;
          this.name = ERROR_NAME;
          Object.setPrototypeOf(this, FirebaseError.prototype);
          if (Error.captureStackTrace) {
            Error.captureStackTrace(this, ErrorFactory.prototype.create);
          }
        }
      };
      ErrorFactory = class {
        constructor(service, serviceName, errors) {
          this.service = service;
          this.serviceName = serviceName;
          this.errors = errors;
        }
        create(code, ...data) {
          const customData = data[0] || {};
          const fullCode = `${this.service}/${code}`;
          const template = this.errors[code];
          const message = template ? replaceTemplate(template, customData) : "Error";
          const fullMessage = `${this.serviceName}: ${message} (${fullCode}).`;
          const error = new FirebaseError(fullCode, fullMessage, customData);
          return error;
        }
      };
      PATTERN = /\{\$([^}]+)}/g;
      ObserverProxy = class {
        constructor(executor, onNoObservers) {
          this.observers = [];
          this.unsubscribes = [];
          this.observerCount = 0;
          this.task = Promise.resolve();
          this.finalized = false;
          this.onNoObservers = onNoObservers;
          this.task.then(() => {
            executor(this);
          }).catch((e) => {
            this.error(e);
          });
        }
        next(value) {
          this.forEachObserver((observer) => {
            observer.next(value);
          });
        }
        error(error) {
          this.forEachObserver((observer) => {
            observer.error(error);
          });
          this.close(error);
        }
        complete() {
          this.forEachObserver((observer) => {
            observer.complete();
          });
          this.close();
        }
        subscribe(nextOrObserver, error, complete) {
          let observer;
          if (nextOrObserver === void 0 && error === void 0 && complete === void 0) {
            throw new Error("Missing Observer.");
          }
          if (implementsAnyMethods(nextOrObserver, [
            "next",
            "error",
            "complete"
          ])) {
            observer = nextOrObserver;
          } else {
            observer = {
              next: nextOrObserver,
              error,
              complete
            };
          }
          if (observer.next === void 0) {
            observer.next = noop;
          }
          if (observer.error === void 0) {
            observer.error = noop;
          }
          if (observer.complete === void 0) {
            observer.complete = noop;
          }
          const unsub = this.unsubscribeOne.bind(this, this.observers.length);
          if (this.finalized) {
            this.task.then(() => {
              try {
                if (this.finalError) {
                  observer.error(this.finalError);
                } else {
                  observer.complete();
                }
              } catch (e) {
              }
              return;
            });
          }
          this.observers.push(observer);
          return unsub;
        }
        unsubscribeOne(i) {
          if (this.observers === void 0 || this.observers[i] === void 0) {
            return;
          }
          delete this.observers[i];
          this.observerCount -= 1;
          if (this.observerCount === 0 && this.onNoObservers !== void 0) {
            this.onNoObservers(this);
          }
        }
        forEachObserver(fn) {
          if (this.finalized) {
            return;
          }
          for (let i = 0; i < this.observers.length; i++) {
            this.sendOne(i, fn);
          }
        }
        sendOne(i, fn) {
          this.task.then(() => {
            if (this.observers !== void 0 && this.observers[i] !== void 0) {
              try {
                fn(this.observers[i]);
              } catch (e) {
                if (typeof console !== "undefined" && console.error) {
                  console.error(e);
                }
              }
            }
          });
        }
        close(err) {
          if (this.finalized) {
            return;
          }
          this.finalized = true;
          if (err !== void 0) {
            this.finalError = err;
          }
          this.task.then(() => {
            this.observers = void 0;
            this.onNoObservers = void 0;
          });
        }
      };
      MAX_VALUE_MILLIS = 4 * 60 * 60 * 1e3;
    }
  });

  // node_modules/@firebase/component/dist/esm/index.esm2017.js
  function normalizeIdentifierForFactory(identifier) {
    return identifier === DEFAULT_ENTRY_NAME ? void 0 : identifier;
  }
  function isComponentEager(component) {
    return component.instantiationMode === "EAGER";
  }
  var Component, DEFAULT_ENTRY_NAME, Provider, ComponentContainer;
  var init_index_esm20172 = __esm({
    "node_modules/@firebase/component/dist/esm/index.esm2017.js"() {
      init_index_esm2017();
      Component = class {
        constructor(name7, instanceFactory, type) {
          this.name = name7;
          this.instanceFactory = instanceFactory;
          this.type = type;
          this.multipleInstances = false;
          this.serviceProps = {};
          this.instantiationMode = "LAZY";
          this.onInstanceCreated = null;
        }
        setInstantiationMode(mode) {
          this.instantiationMode = mode;
          return this;
        }
        setMultipleInstances(multipleInstances) {
          this.multipleInstances = multipleInstances;
          return this;
        }
        setServiceProps(props) {
          this.serviceProps = props;
          return this;
        }
        setInstanceCreatedCallback(callback) {
          this.onInstanceCreated = callback;
          return this;
        }
      };
      DEFAULT_ENTRY_NAME = "[DEFAULT]";
      Provider = class {
        constructor(name7, container) {
          this.name = name7;
          this.container = container;
          this.component = null;
          this.instances = /* @__PURE__ */ new Map();
          this.instancesDeferred = /* @__PURE__ */ new Map();
          this.instancesOptions = /* @__PURE__ */ new Map();
          this.onInitCallbacks = /* @__PURE__ */ new Map();
        }
        get(identifier) {
          const normalizedIdentifier = this.normalizeInstanceIdentifier(identifier);
          if (!this.instancesDeferred.has(normalizedIdentifier)) {
            const deferred = new Deferred();
            this.instancesDeferred.set(normalizedIdentifier, deferred);
            if (this.isInitialized(normalizedIdentifier) || this.shouldAutoInitialize()) {
              try {
                const instance = this.getOrInitializeService({
                  instanceIdentifier: normalizedIdentifier
                });
                if (instance) {
                  deferred.resolve(instance);
                }
              } catch (e) {
              }
            }
          }
          return this.instancesDeferred.get(normalizedIdentifier).promise;
        }
        getImmediate(options) {
          var _a;
          const normalizedIdentifier = this.normalizeInstanceIdentifier(options === null || options === void 0 ? void 0 : options.identifier);
          const optional = (_a = options === null || options === void 0 ? void 0 : options.optional) !== null && _a !== void 0 ? _a : false;
          if (this.isInitialized(normalizedIdentifier) || this.shouldAutoInitialize()) {
            try {
              return this.getOrInitializeService({
                instanceIdentifier: normalizedIdentifier
              });
            } catch (e) {
              if (optional) {
                return null;
              } else {
                throw e;
              }
            }
          } else {
            if (optional) {
              return null;
            } else {
              throw Error(`Service ${this.name} is not available`);
            }
          }
        }
        getComponent() {
          return this.component;
        }
        setComponent(component) {
          if (component.name !== this.name) {
            throw Error(`Mismatching Component ${component.name} for Provider ${this.name}.`);
          }
          if (this.component) {
            throw Error(`Component for ${this.name} has already been provided`);
          }
          this.component = component;
          if (!this.shouldAutoInitialize()) {
            return;
          }
          if (isComponentEager(component)) {
            try {
              this.getOrInitializeService({ instanceIdentifier: DEFAULT_ENTRY_NAME });
            } catch (e) {
            }
          }
          for (const [instanceIdentifier, instanceDeferred] of this.instancesDeferred.entries()) {
            const normalizedIdentifier = this.normalizeInstanceIdentifier(instanceIdentifier);
            try {
              const instance = this.getOrInitializeService({
                instanceIdentifier: normalizedIdentifier
              });
              instanceDeferred.resolve(instance);
            } catch (e) {
            }
          }
        }
        clearInstance(identifier = DEFAULT_ENTRY_NAME) {
          this.instancesDeferred.delete(identifier);
          this.instancesOptions.delete(identifier);
          this.instances.delete(identifier);
        }
        async delete() {
          const services = Array.from(this.instances.values());
          await Promise.all([
            ...services.filter((service) => "INTERNAL" in service).map((service) => service.INTERNAL.delete()),
            ...services.filter((service) => "_delete" in service).map((service) => service._delete())
          ]);
        }
        isComponentSet() {
          return this.component != null;
        }
        isInitialized(identifier = DEFAULT_ENTRY_NAME) {
          return this.instances.has(identifier);
        }
        getOptions(identifier = DEFAULT_ENTRY_NAME) {
          return this.instancesOptions.get(identifier) || {};
        }
        initialize(opts = {}) {
          const { options = {} } = opts;
          const normalizedIdentifier = this.normalizeInstanceIdentifier(opts.instanceIdentifier);
          if (this.isInitialized(normalizedIdentifier)) {
            throw Error(`${this.name}(${normalizedIdentifier}) has already been initialized`);
          }
          if (!this.isComponentSet()) {
            throw Error(`Component ${this.name} has not been registered yet`);
          }
          const instance = this.getOrInitializeService({
            instanceIdentifier: normalizedIdentifier,
            options
          });
          for (const [instanceIdentifier, instanceDeferred] of this.instancesDeferred.entries()) {
            const normalizedDeferredIdentifier = this.normalizeInstanceIdentifier(instanceIdentifier);
            if (normalizedIdentifier === normalizedDeferredIdentifier) {
              instanceDeferred.resolve(instance);
            }
          }
          return instance;
        }
        onInit(callback, identifier) {
          var _a;
          const normalizedIdentifier = this.normalizeInstanceIdentifier(identifier);
          const existingCallbacks = (_a = this.onInitCallbacks.get(normalizedIdentifier)) !== null && _a !== void 0 ? _a : /* @__PURE__ */ new Set();
          existingCallbacks.add(callback);
          this.onInitCallbacks.set(normalizedIdentifier, existingCallbacks);
          const existingInstance = this.instances.get(normalizedIdentifier);
          if (existingInstance) {
            callback(existingInstance, normalizedIdentifier);
          }
          return () => {
            existingCallbacks.delete(callback);
          };
        }
        invokeOnInitCallbacks(instance, identifier) {
          const callbacks = this.onInitCallbacks.get(identifier);
          if (!callbacks) {
            return;
          }
          for (const callback of callbacks) {
            try {
              callback(instance, identifier);
            } catch (_a) {
            }
          }
        }
        getOrInitializeService({ instanceIdentifier, options = {} }) {
          let instance = this.instances.get(instanceIdentifier);
          if (!instance && this.component) {
            instance = this.component.instanceFactory(this.container, {
              instanceIdentifier: normalizeIdentifierForFactory(instanceIdentifier),
              options
            });
            this.instances.set(instanceIdentifier, instance);
            this.instancesOptions.set(instanceIdentifier, options);
            this.invokeOnInitCallbacks(instance, instanceIdentifier);
            if (this.component.onInstanceCreated) {
              try {
                this.component.onInstanceCreated(this.container, instanceIdentifier, instance);
              } catch (_a) {
              }
            }
          }
          return instance || null;
        }
        normalizeInstanceIdentifier(identifier = DEFAULT_ENTRY_NAME) {
          if (this.component) {
            return this.component.multipleInstances ? identifier : DEFAULT_ENTRY_NAME;
          } else {
            return identifier;
          }
        }
        shouldAutoInitialize() {
          return !!this.component && this.component.instantiationMode !== "EXPLICIT";
        }
      };
      ComponentContainer = class {
        constructor(name7) {
          this.name = name7;
          this.providers = /* @__PURE__ */ new Map();
        }
        addComponent(component) {
          const provider = this.getProvider(component.name);
          if (provider.isComponentSet()) {
            throw new Error(`Component ${component.name} has already been registered with ${this.name}`);
          }
          provider.setComponent(component);
        }
        addOrOverwriteComponent(component) {
          const provider = this.getProvider(component.name);
          if (provider.isComponentSet()) {
            this.providers.delete(component.name);
          }
          this.addComponent(component);
        }
        getProvider(name7) {
          if (this.providers.has(name7)) {
            return this.providers.get(name7);
          }
          const provider = new Provider(name7, this);
          this.providers.set(name7, provider);
          return provider;
        }
        getProviders() {
          return Array.from(this.providers.values());
        }
      };
    }
  });

  // node_modules/@firebase/logger/dist/esm/index.esm2017.js
  function setLogLevel(level) {
    instances.forEach((inst) => {
      inst.setLogLevel(level);
    });
  }
  function setUserLogHandler(logCallback, options) {
    for (const instance of instances) {
      let customLogLevel = null;
      if (options && options.level) {
        customLogLevel = levelStringToEnum[options.level];
      }
      if (logCallback === null) {
        instance.userLogHandler = null;
      } else {
        instance.userLogHandler = (instance2, level, ...args) => {
          const message = args.map((arg) => {
            if (arg == null) {
              return null;
            } else if (typeof arg === "string") {
              return arg;
            } else if (typeof arg === "number" || typeof arg === "boolean") {
              return arg.toString();
            } else if (arg instanceof Error) {
              return arg.message;
            } else {
              try {
                return JSON.stringify(arg);
              } catch (ignored) {
                return null;
              }
            }
          }).filter((arg) => arg).join(" ");
          if (level >= (customLogLevel !== null && customLogLevel !== void 0 ? customLogLevel : instance2.logLevel)) {
            logCallback({
              level: LogLevel[level].toLowerCase(),
              message,
              args,
              type: instance2.name
            });
          }
        };
      }
    }
  }
  var instances, LogLevel, levelStringToEnum, defaultLogLevel, ConsoleMethod, defaultLogHandler, Logger;
  var init_index_esm20173 = __esm({
    "node_modules/@firebase/logger/dist/esm/index.esm2017.js"() {
      instances = [];
      (function(LogLevel2) {
        LogLevel2[LogLevel2["DEBUG"] = 0] = "DEBUG";
        LogLevel2[LogLevel2["VERBOSE"] = 1] = "VERBOSE";
        LogLevel2[LogLevel2["INFO"] = 2] = "INFO";
        LogLevel2[LogLevel2["WARN"] = 3] = "WARN";
        LogLevel2[LogLevel2["ERROR"] = 4] = "ERROR";
        LogLevel2[LogLevel2["SILENT"] = 5] = "SILENT";
      })(LogLevel || (LogLevel = {}));
      levelStringToEnum = {
        "debug": LogLevel.DEBUG,
        "verbose": LogLevel.VERBOSE,
        "info": LogLevel.INFO,
        "warn": LogLevel.WARN,
        "error": LogLevel.ERROR,
        "silent": LogLevel.SILENT
      };
      defaultLogLevel = LogLevel.INFO;
      ConsoleMethod = {
        [LogLevel.DEBUG]: "log",
        [LogLevel.VERBOSE]: "log",
        [LogLevel.INFO]: "info",
        [LogLevel.WARN]: "warn",
        [LogLevel.ERROR]: "error"
      };
      defaultLogHandler = (instance, logType, ...args) => {
        if (logType < instance.logLevel) {
          return;
        }
        const now = new Date().toISOString();
        const method = ConsoleMethod[logType];
        if (method) {
          console[method](`[${now}]  ${instance.name}:`, ...args);
        } else {
          throw new Error(`Attempted to log a message with an invalid logType (value: ${logType})`);
        }
      };
      Logger = class {
        constructor(name7) {
          this.name = name7;
          this._logLevel = defaultLogLevel;
          this._logHandler = defaultLogHandler;
          this._userLogHandler = null;
          instances.push(this);
        }
        get logLevel() {
          return this._logLevel;
        }
        set logLevel(val) {
          if (!(val in LogLevel)) {
            throw new TypeError(`Invalid value "${val}" assigned to \`logLevel\``);
          }
          this._logLevel = val;
        }
        setLogLevel(val) {
          this._logLevel = typeof val === "string" ? levelStringToEnum[val] : val;
        }
        get logHandler() {
          return this._logHandler;
        }
        set logHandler(val) {
          if (typeof val !== "function") {
            throw new TypeError("Value assigned to `logHandler` must be a function");
          }
          this._logHandler = val;
        }
        get userLogHandler() {
          return this._userLogHandler;
        }
        set userLogHandler(val) {
          this._userLogHandler = val;
        }
        debug(...args) {
          this._userLogHandler && this._userLogHandler(this, LogLevel.DEBUG, ...args);
          this._logHandler(this, LogLevel.DEBUG, ...args);
        }
        log(...args) {
          this._userLogHandler && this._userLogHandler(this, LogLevel.VERBOSE, ...args);
          this._logHandler(this, LogLevel.VERBOSE, ...args);
        }
        info(...args) {
          this._userLogHandler && this._userLogHandler(this, LogLevel.INFO, ...args);
          this._logHandler(this, LogLevel.INFO, ...args);
        }
        warn(...args) {
          this._userLogHandler && this._userLogHandler(this, LogLevel.WARN, ...args);
          this._logHandler(this, LogLevel.WARN, ...args);
        }
        error(...args) {
          this._userLogHandler && this._userLogHandler(this, LogLevel.ERROR, ...args);
          this._logHandler(this, LogLevel.ERROR, ...args);
        }
      };
    }
  });

  // node_modules/@firebase/app/dist/esm/index.esm2017.js
  var index_esm2017_exports = {};
  __export(index_esm2017_exports, {
    FirebaseError: () => FirebaseError,
    SDK_VERSION: () => SDK_VERSION,
    _DEFAULT_ENTRY_NAME: () => DEFAULT_ENTRY_NAME2,
    _addComponent: () => _addComponent,
    _addOrOverwriteComponent: () => _addOrOverwriteComponent,
    _apps: () => _apps,
    _clearComponents: () => _clearComponents,
    _components: () => _components,
    _getProvider: () => _getProvider,
    _registerComponent: () => _registerComponent,
    _removeServiceInstance: () => _removeServiceInstance,
    deleteApp: () => deleteApp,
    getApp: () => getApp,
    getApps: () => getApps,
    initializeApp: () => initializeApp,
    onLog: () => onLog,
    registerVersion: () => registerVersion,
    setLogLevel: () => setLogLevel2
  });
  function isVersionServiceProvider(provider) {
    const component = provider.getComponent();
    return (component === null || component === void 0 ? void 0 : component.type) === "VERSION";
  }
  function _addComponent(app2, component) {
    try {
      app2.container.addComponent(component);
    } catch (e) {
      logger.debug(`Component ${component.name} failed to register with FirebaseApp ${app2.name}`, e);
    }
  }
  function _addOrOverwriteComponent(app2, component) {
    app2.container.addOrOverwriteComponent(component);
  }
  function _registerComponent(component) {
    const componentName = component.name;
    if (_components.has(componentName)) {
      logger.debug(`There were multiple attempts to register component ${componentName}.`);
      return false;
    }
    _components.set(componentName, component);
    for (const app2 of _apps.values()) {
      _addComponent(app2, component);
    }
    return true;
  }
  function _getProvider(app2, name7) {
    return app2.container.getProvider(name7);
  }
  function _removeServiceInstance(app2, name7, instanceIdentifier = DEFAULT_ENTRY_NAME2) {
    _getProvider(app2, name7).clearInstance(instanceIdentifier);
  }
  function _clearComponents() {
    _components.clear();
  }
  function initializeApp(options, rawConfig = {}) {
    if (typeof rawConfig !== "object") {
      const name8 = rawConfig;
      rawConfig = { name: name8 };
    }
    const config2 = Object.assign({ name: DEFAULT_ENTRY_NAME2, automaticDataCollectionEnabled: false }, rawConfig);
    const name7 = config2.name;
    if (typeof name7 !== "string" || !name7) {
      throw ERROR_FACTORY.create("bad-app-name", {
        appName: String(name7)
      });
    }
    const existingApp = _apps.get(name7);
    if (existingApp) {
      if (deepEqual(options, existingApp.options) && deepEqual(config2, existingApp.config)) {
        return existingApp;
      } else {
        throw ERROR_FACTORY.create("duplicate-app", { appName: name7 });
      }
    }
    const container = new ComponentContainer(name7);
    for (const component of _components.values()) {
      container.addComponent(component);
    }
    const newApp = new FirebaseAppImpl(options, config2, container);
    _apps.set(name7, newApp);
    return newApp;
  }
  function getApp(name7 = DEFAULT_ENTRY_NAME2) {
    const app2 = _apps.get(name7);
    if (!app2) {
      throw ERROR_FACTORY.create("no-app", { appName: name7 });
    }
    return app2;
  }
  function getApps() {
    return Array.from(_apps.values());
  }
  async function deleteApp(app2) {
    const name7 = app2.name;
    if (_apps.has(name7)) {
      _apps.delete(name7);
      await Promise.all(app2.container.getProviders().map((provider) => provider.delete()));
      app2.isDeleted = true;
    }
  }
  function registerVersion(libraryKeyOrName, version7, variant) {
    var _a;
    let library = (_a = PLATFORM_LOG_STRING[libraryKeyOrName]) !== null && _a !== void 0 ? _a : libraryKeyOrName;
    if (variant) {
      library += `-${variant}`;
    }
    const libraryMismatch = library.match(/\s|\//);
    const versionMismatch = version7.match(/\s|\//);
    if (libraryMismatch || versionMismatch) {
      const warning = [
        `Unable to register library "${library}" with version "${version7}":`
      ];
      if (libraryMismatch) {
        warning.push(`library name "${library}" contains illegal characters (whitespace or "/")`);
      }
      if (libraryMismatch && versionMismatch) {
        warning.push("and");
      }
      if (versionMismatch) {
        warning.push(`version name "${version7}" contains illegal characters (whitespace or "/")`);
      }
      logger.warn(warning.join(" "));
      return;
    }
    _registerComponent(new Component(`${library}-version`, () => ({ library, version: version7 }), "VERSION"));
  }
  function onLog(logCallback, options) {
    if (logCallback !== null && typeof logCallback !== "function") {
      throw ERROR_FACTORY.create("invalid-log-argument");
    }
    setUserLogHandler(logCallback, options);
  }
  function setLogLevel2(logLevel) {
    setLogLevel(logLevel);
  }
  function registerCoreComponents(variant) {
    _registerComponent(new Component("platform-logger", (container) => new PlatformLoggerServiceImpl(container), "PRIVATE"));
    registerVersion(name$o, version$1, variant);
    registerVersion(name$o, version$1, "esm2017");
    registerVersion("fire-js", "");
  }
  var PlatformLoggerServiceImpl, name$o, version$1, logger, name$n, name$m, name$l, name$k, name$j, name$i, name$h, name$g, name$f, name$e, name$d, name$c, name$b, name$a, name$9, name$8, name$7, name$6, name$5, name$4, name$3, name$2, name$1, name, version, DEFAULT_ENTRY_NAME2, PLATFORM_LOG_STRING, _apps, _components, ERRORS, ERROR_FACTORY, FirebaseAppImpl, SDK_VERSION;
  var init_index_esm20174 = __esm({
    "node_modules/@firebase/app/dist/esm/index.esm2017.js"() {
      init_index_esm20172();
      init_index_esm20173();
      init_index_esm2017();
      init_index_esm2017();
      PlatformLoggerServiceImpl = class {
        constructor(container) {
          this.container = container;
        }
        getPlatformInfoString() {
          const providers = this.container.getProviders();
          return providers.map((provider) => {
            if (isVersionServiceProvider(provider)) {
              const service = provider.getImmediate();
              return `${service.library}/${service.version}`;
            } else {
              return null;
            }
          }).filter((logString) => logString).join(" ");
        }
      };
      name$o = "@firebase/app";
      version$1 = "0.7.13";
      logger = new Logger("@firebase/app");
      name$n = "@firebase/app-compat";
      name$m = "@firebase/analytics-compat";
      name$l = "@firebase/analytics";
      name$k = "@firebase/app-check-compat";
      name$j = "@firebase/app-check";
      name$i = "@firebase/auth";
      name$h = "@firebase/auth-compat";
      name$g = "@firebase/database";
      name$f = "@firebase/database-compat";
      name$e = "@firebase/functions";
      name$d = "@firebase/functions-compat";
      name$c = "@firebase/installations";
      name$b = "@firebase/installations-compat";
      name$a = "@firebase/messaging";
      name$9 = "@firebase/messaging-compat";
      name$8 = "@firebase/performance";
      name$7 = "@firebase/performance-compat";
      name$6 = "@firebase/remote-config";
      name$5 = "@firebase/remote-config-compat";
      name$4 = "@firebase/storage";
      name$3 = "@firebase/storage-compat";
      name$2 = "@firebase/firestore";
      name$1 = "@firebase/firestore-compat";
      name = "firebase";
      version = "9.6.3";
      DEFAULT_ENTRY_NAME2 = "[DEFAULT]";
      PLATFORM_LOG_STRING = {
        [name$o]: "fire-core",
        [name$n]: "fire-core-compat",
        [name$l]: "fire-analytics",
        [name$m]: "fire-analytics-compat",
        [name$j]: "fire-app-check",
        [name$k]: "fire-app-check-compat",
        [name$i]: "fire-auth",
        [name$h]: "fire-auth-compat",
        [name$g]: "fire-rtdb",
        [name$f]: "fire-rtdb-compat",
        [name$e]: "fire-fn",
        [name$d]: "fire-fn-compat",
        [name$c]: "fire-iid",
        [name$b]: "fire-iid-compat",
        [name$a]: "fire-fcm",
        [name$9]: "fire-fcm-compat",
        [name$8]: "fire-perf",
        [name$7]: "fire-perf-compat",
        [name$6]: "fire-rc",
        [name$5]: "fire-rc-compat",
        [name$4]: "fire-gcs",
        [name$3]: "fire-gcs-compat",
        [name$2]: "fire-fst",
        [name$1]: "fire-fst-compat",
        "fire-js": "fire-js",
        [name]: "fire-js-all"
      };
      _apps = /* @__PURE__ */ new Map();
      _components = /* @__PURE__ */ new Map();
      ERRORS = {
        ["no-app"]: "No Firebase App '{$appName}' has been created - call Firebase App.initializeApp()",
        ["bad-app-name"]: "Illegal App name: '{$appName}",
        ["duplicate-app"]: "Firebase App named '{$appName}' already exists with different options or config",
        ["app-deleted"]: "Firebase App named '{$appName}' already deleted",
        ["invalid-app-argument"]: "firebase.{$appName}() takes either no argument or a Firebase App instance.",
        ["invalid-log-argument"]: "First argument to `onLog` must be null or a function."
      };
      ERROR_FACTORY = new ErrorFactory("app", "Firebase", ERRORS);
      FirebaseAppImpl = class {
        constructor(options, config2, container) {
          this._isDeleted = false;
          this._options = Object.assign({}, options);
          this._config = Object.assign({}, config2);
          this._name = config2.name;
          this._automaticDataCollectionEnabled = config2.automaticDataCollectionEnabled;
          this._container = container;
          this.container.addComponent(new Component("app", () => this, "PUBLIC"));
        }
        get automaticDataCollectionEnabled() {
          this.checkDestroyed();
          return this._automaticDataCollectionEnabled;
        }
        set automaticDataCollectionEnabled(val) {
          this.checkDestroyed();
          this._automaticDataCollectionEnabled = val;
        }
        get name() {
          this.checkDestroyed();
          return this._name;
        }
        get options() {
          this.checkDestroyed();
          return this._options;
        }
        get config() {
          this.checkDestroyed();
          return this._config;
        }
        get container() {
          return this._container;
        }
        get isDeleted() {
          return this._isDeleted;
        }
        set isDeleted(val) {
          this._isDeleted = val;
        }
        checkDestroyed() {
          if (this.isDeleted) {
            throw ERROR_FACTORY.create("app-deleted", { appName: this._name });
          }
        }
      };
      SDK_VERSION = version;
      registerCoreComponents("");
    }
  });

  // node_modules/tslib/tslib.js
  var require_tslib = __commonJS({
    "node_modules/tslib/tslib.js"(exports, module) {
      var __extends2;
      var __assign2;
      var __rest2;
      var __decorate2;
      var __param2;
      var __metadata2;
      var __awaiter2;
      var __generator2;
      var __exportStar2;
      var __values2;
      var __read2;
      var __spread2;
      var __spreadArrays2;
      var __spreadArray2;
      var __await2;
      var __asyncGenerator2;
      var __asyncDelegator2;
      var __asyncValues2;
      var __makeTemplateObject2;
      var __importStar2;
      var __importDefault2;
      var __classPrivateFieldGet2;
      var __classPrivateFieldSet2;
      var __createBinding2;
      (function(factory) {
        var root = typeof global === "object" ? global : typeof self === "object" ? self : typeof this === "object" ? this : {};
        if (typeof define === "function" && define.amd) {
          define("tslib", ["exports"], function(exports2) {
            factory(createExporter(root, createExporter(exports2)));
          });
        } else if (typeof module === "object" && typeof module.exports === "object") {
          factory(createExporter(root, createExporter(module.exports)));
        } else {
          factory(createExporter(root));
        }
        function createExporter(exports2, previous) {
          if (exports2 !== root) {
            if (typeof Object.create === "function") {
              Object.defineProperty(exports2, "__esModule", { value: true });
            } else {
              exports2.__esModule = true;
            }
          }
          return function(id, v) {
            return exports2[id] = previous ? previous(id, v) : v;
          };
        }
      })(function(exporter) {
        var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b)
            if (Object.prototype.hasOwnProperty.call(b, p))
              d[p] = b[p];
        };
        __extends2 = function(d, b) {
          if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
          extendStatics(d, b);
          function __() {
            this.constructor = d;
          }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
        __assign2 = Object.assign || function(t) {
          for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s)
              if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
          }
          return t;
        };
        __rest2 = function(s, e) {
          var t = {};
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
              t[p] = s[p];
          if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
              if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
            }
          return t;
        };
        __decorate2 = function(decorators, target, key, desc) {
          var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
          if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
          else
            for (var i = decorators.length - 1; i >= 0; i--)
              if (d = decorators[i])
                r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
          return c > 3 && r && Object.defineProperty(target, key, r), r;
        };
        __param2 = function(paramIndex, decorator) {
          return function(target, key) {
            decorator(target, key, paramIndex);
          };
        };
        __metadata2 = function(metadataKey, metadataValue) {
          if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
            return Reflect.metadata(metadataKey, metadataValue);
        };
        __awaiter2 = function(thisArg, _arguments, P, generator) {
          function adopt(value) {
            return value instanceof P ? value : new P(function(resolve) {
              resolve(value);
            });
          }
          return new (P || (P = Promise))(function(resolve, reject) {
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
        __generator2 = function(thisArg, body) {
          var _ = { label: 0, sent: function() {
            if (t[0] & 1)
              throw t[1];
            return t[1];
          }, trys: [], ops: [] }, f, y, t, g;
          return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
            return this;
          }), g;
          function verb(n) {
            return function(v) {
              return step([n, v]);
            };
          }
          function step(op) {
            if (f)
              throw new TypeError("Generator is already executing.");
            while (_)
              try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                  return t;
                if (y = 0, t)
                  op = [op[0] & 2, t.value];
                switch (op[0]) {
                  case 0:
                  case 1:
                    t = op;
                    break;
                  case 4:
                    _.label++;
                    return { value: op[1], done: false };
                  case 5:
                    _.label++;
                    y = op[1];
                    op = [0];
                    continue;
                  case 7:
                    op = _.ops.pop();
                    _.trys.pop();
                    continue;
                  default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                      _ = 0;
                      continue;
                    }
                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                      _.label = op[1];
                      break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                      _.label = t[1];
                      t = op;
                      break;
                    }
                    if (t && _.label < t[2]) {
                      _.label = t[2];
                      _.ops.push(op);
                      break;
                    }
                    if (t[2])
                      _.ops.pop();
                    _.trys.pop();
                    continue;
                }
                op = body.call(thisArg, _);
              } catch (e) {
                op = [6, e];
                y = 0;
              } finally {
                f = t = 0;
              }
            if (op[0] & 5)
              throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
          }
        };
        __exportStar2 = function(m, o) {
          for (var p in m)
            if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p))
              __createBinding2(o, m, p);
        };
        __createBinding2 = Object.create ? function(o, m, k, k2) {
          if (k2 === void 0)
            k2 = k;
          Object.defineProperty(o, k2, { enumerable: true, get: function() {
            return m[k];
          } });
        } : function(o, m, k, k2) {
          if (k2 === void 0)
            k2 = k;
          o[k2] = m[k];
        };
        __values2 = function(o) {
          var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
          if (m)
            return m.call(o);
          if (o && typeof o.length === "number")
            return {
              next: function() {
                if (o && i >= o.length)
                  o = void 0;
                return { value: o && o[i++], done: !o };
              }
            };
          throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
        };
        __read2 = function(o, n) {
          var m = typeof Symbol === "function" && o[Symbol.iterator];
          if (!m)
            return o;
          var i = m.call(o), r, ar = [], e;
          try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
              ar.push(r.value);
          } catch (error) {
            e = { error };
          } finally {
            try {
              if (r && !r.done && (m = i["return"]))
                m.call(i);
            } finally {
              if (e)
                throw e.error;
            }
          }
          return ar;
        };
        __spread2 = function() {
          for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read2(arguments[i]));
          return ar;
        };
        __spreadArrays2 = function() {
          for (var s = 0, i = 0, il = arguments.length; i < il; i++)
            s += arguments[i].length;
          for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
              r[k] = a[j];
          return r;
        };
        __spreadArray2 = function(to, from, pack) {
          if (pack || arguments.length === 2)
            for (var i = 0, l = from.length, ar; i < l; i++) {
              if (ar || !(i in from)) {
                if (!ar)
                  ar = Array.prototype.slice.call(from, 0, i);
                ar[i] = from[i];
              }
            }
          return to.concat(ar || Array.prototype.slice.call(from));
        };
        __await2 = function(v) {
          return this instanceof __await2 ? (this.v = v, this) : new __await2(v);
        };
        __asyncGenerator2 = function(thisArg, _arguments, generator) {
          if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
          var g = generator.apply(thisArg, _arguments || []), i, q = [];
          return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
            return this;
          }, i;
          function verb(n) {
            if (g[n])
              i[n] = function(v) {
                return new Promise(function(a, b) {
                  q.push([n, v, a, b]) > 1 || resume(n, v);
                });
              };
          }
          function resume(n, v) {
            try {
              step(g[n](v));
            } catch (e) {
              settle(q[0][3], e);
            }
          }
          function step(r) {
            r.value instanceof __await2 ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
          }
          function fulfill(value) {
            resume("next", value);
          }
          function reject(value) {
            resume("throw", value);
          }
          function settle(f, v) {
            if (f(v), q.shift(), q.length)
              resume(q[0][0], q[0][1]);
          }
        };
        __asyncDelegator2 = function(o) {
          var i, p;
          return i = {}, verb("next"), verb("throw", function(e) {
            throw e;
          }), verb("return"), i[Symbol.iterator] = function() {
            return this;
          }, i;
          function verb(n, f) {
            i[n] = o[n] ? function(v) {
              return (p = !p) ? { value: __await2(o[n](v)), done: n === "return" } : f ? f(v) : v;
            } : f;
          }
        };
        __asyncValues2 = function(o) {
          if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
          var m = o[Symbol.asyncIterator], i;
          return m ? m.call(o) : (o = typeof __values2 === "function" ? __values2(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
            return this;
          }, i);
          function verb(n) {
            i[n] = o[n] && function(v) {
              return new Promise(function(resolve, reject) {
                v = o[n](v), settle(resolve, reject, v.done, v.value);
              });
            };
          }
          function settle(resolve, reject, d, v) {
            Promise.resolve(v).then(function(v2) {
              resolve({ value: v2, done: d });
            }, reject);
          }
        };
        __makeTemplateObject2 = function(cooked, raw) {
          if (Object.defineProperty) {
            Object.defineProperty(cooked, "raw", { value: raw });
          } else {
            cooked.raw = raw;
          }
          return cooked;
        };
        var __setModuleDefault = Object.create ? function(o, v) {
          Object.defineProperty(o, "default", { enumerable: true, value: v });
        } : function(o, v) {
          o["default"] = v;
        };
        __importStar2 = function(mod) {
          if (mod && mod.__esModule)
            return mod;
          var result = {};
          if (mod != null) {
            for (var k in mod)
              if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
                __createBinding2(result, mod, k);
          }
          __setModuleDefault(result, mod);
          return result;
        };
        __importDefault2 = function(mod) {
          return mod && mod.__esModule ? mod : { "default": mod };
        };
        __classPrivateFieldGet2 = function(receiver, state, kind, f) {
          if (kind === "a" && !f)
            throw new TypeError("Private accessor was defined without a getter");
          if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
            throw new TypeError("Cannot read private member from an object whose class did not declare it");
          return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
        };
        __classPrivateFieldSet2 = function(receiver, state, value, kind, f) {
          if (kind === "m")
            throw new TypeError("Private method is not writable");
          if (kind === "a" && !f)
            throw new TypeError("Private accessor was defined without a setter");
          if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
            throw new TypeError("Cannot write private member to an object whose class did not declare it");
          return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
        };
        exporter("__extends", __extends2);
        exporter("__assign", __assign2);
        exporter("__rest", __rest2);
        exporter("__decorate", __decorate2);
        exporter("__param", __param2);
        exporter("__metadata", __metadata2);
        exporter("__awaiter", __awaiter2);
        exporter("__generator", __generator2);
        exporter("__exportStar", __exportStar2);
        exporter("__createBinding", __createBinding2);
        exporter("__values", __values2);
        exporter("__read", __read2);
        exporter("__spread", __spread2);
        exporter("__spreadArrays", __spreadArrays2);
        exporter("__spreadArray", __spreadArray2);
        exporter("__await", __await2);
        exporter("__asyncGenerator", __asyncGenerator2);
        exporter("__asyncDelegator", __asyncDelegator2);
        exporter("__asyncValues", __asyncValues2);
        exporter("__makeTemplateObject", __makeTemplateObject2);
        exporter("__importStar", __importStar2);
        exporter("__importDefault", __importDefault2);
        exporter("__classPrivateFieldGet", __classPrivateFieldGet2);
        exporter("__classPrivateFieldSet", __classPrivateFieldSet2);
      });
    }
  });

  // node_modules/tslib/modules/index.js
  var import_tslib, __extends, __assign, __rest, __decorate, __param, __metadata, __awaiter, __generator, __exportStar, __createBinding, __values, __read, __spread, __spreadArrays, __spreadArray, __await, __asyncGenerator, __asyncDelegator, __asyncValues, __makeTemplateObject, __importStar, __importDefault, __classPrivateFieldGet, __classPrivateFieldSet;
  var init_modules = __esm({
    "node_modules/tslib/modules/index.js"() {
      import_tslib = __toESM(require_tslib(), 1);
      ({
        __extends,
        __assign,
        __rest,
        __decorate,
        __param,
        __metadata,
        __awaiter,
        __generator,
        __exportStar,
        __createBinding,
        __values,
        __read,
        __spread,
        __spreadArrays,
        __spreadArray,
        __await,
        __asyncGenerator,
        __asyncDelegator,
        __asyncValues,
        __makeTemplateObject,
        __importStar,
        __importDefault,
        __classPrivateFieldGet,
        __classPrivateFieldSet
      } = import_tslib.default);
    }
  });

  // node_modules/@firebase/auth/dist/esm2017/index-1679a2b2.js
  function _debugErrorMap() {
    return {
      ["admin-restricted-operation"]: "This operation is restricted to administrators only.",
      ["argument-error"]: "",
      ["app-not-authorized"]: "This app, identified by the domain where it's hosted, is not authorized to use Firebase Authentication with the provided API key. Review your key configuration in the Google API console.",
      ["app-not-installed"]: "The requested mobile application corresponding to the identifier (Android package name or iOS bundle ID) provided is not installed on this device.",
      ["captcha-check-failed"]: "The reCAPTCHA response token provided is either invalid, expired, already used or the domain associated with it does not match the list of whitelisted domains.",
      ["code-expired"]: "The SMS code has expired. Please re-send the verification code to try again.",
      ["cordova-not-ready"]: "Cordova framework is not ready.",
      ["cors-unsupported"]: "This browser is not supported.",
      ["credential-already-in-use"]: "This credential is already associated with a different user account.",
      ["custom-token-mismatch"]: "The custom token corresponds to a different audience.",
      ["requires-recent-login"]: "This operation is sensitive and requires recent authentication. Log in again before retrying this request.",
      ["dependent-sdk-initialized-before-auth"]: "Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK.",
      ["dynamic-link-not-activated"]: "Please activate Dynamic Links in the Firebase Console and agree to the terms and conditions.",
      ["email-change-needs-verification"]: "Multi-factor users must always have a verified email.",
      ["email-already-in-use"]: "The email address is already in use by another account.",
      ["emulator-config-failed"]: 'Auth instance has already been used to make a network call. Auth can no longer be configured to use the emulator. Try calling "connectAuthEmulator()" sooner.',
      ["expired-action-code"]: "The action code has expired.",
      ["cancelled-popup-request"]: "This operation has been cancelled due to another conflicting popup being opened.",
      ["internal-error"]: "An internal AuthError has occurred.",
      ["invalid-app-credential"]: "The phone verification request contains an invalid application verifier. The reCAPTCHA token response is either invalid or expired.",
      ["invalid-app-id"]: "The mobile app identifier is not registed for the current project.",
      ["invalid-user-token"]: "This user's credential isn't valid for this project. This can happen if the user's token has been tampered with, or if the user isn't for the project associated with this API key.",
      ["invalid-auth-event"]: "An internal AuthError has occurred.",
      ["invalid-verification-code"]: "The SMS verification code used to create the phone auth credential is invalid. Please resend the verification code sms and be sure to use the verification code provided by the user.",
      ["invalid-continue-uri"]: "The continue URL provided in the request is invalid.",
      ["invalid-cordova-configuration"]: "The following Cordova plugins must be installed to enable OAuth sign-in: cordova-plugin-buildinfo, cordova-universal-links-plugin, cordova-plugin-browsertab, cordova-plugin-inappbrowser and cordova-plugin-customurlscheme.",
      ["invalid-custom-token"]: "The custom token format is incorrect. Please check the documentation.",
      ["invalid-dynamic-link-domain"]: "The provided dynamic link domain is not configured or authorized for the current project.",
      ["invalid-email"]: "The email address is badly formatted.",
      ["invalid-emulator-scheme"]: "Emulator URL must start with a valid scheme (http:// or https://).",
      ["invalid-api-key"]: "Your API key is invalid, please check you have copied it correctly.",
      ["invalid-cert-hash"]: "The SHA-1 certificate hash provided is invalid.",
      ["invalid-credential"]: "The supplied auth credential is malformed or has expired.",
      ["invalid-message-payload"]: "The email template corresponding to this action contains invalid characters in its message. Please fix by going to the Auth email templates section in the Firebase Console.",
      ["invalid-multi-factor-session"]: "The request does not contain a valid proof of first factor successful sign-in.",
      ["invalid-oauth-provider"]: "EmailAuthProvider is not supported for this operation. This operation only supports OAuth providers.",
      ["invalid-oauth-client-id"]: "The OAuth client ID provided is either invalid or does not match the specified API key.",
      ["unauthorized-domain"]: "This domain is not authorized for OAuth operations for your Firebase project. Edit the list of authorized domains from the Firebase console.",
      ["invalid-action-code"]: "The action code is invalid. This can happen if the code is malformed, expired, or has already been used.",
      ["wrong-password"]: "The password is invalid or the user does not have a password.",
      ["invalid-persistence-type"]: "The specified persistence type is invalid. It can only be local, session or none.",
      ["invalid-phone-number"]: "The format of the phone number provided is incorrect. Please enter the phone number in a format that can be parsed into E.164 format. E.164 phone numbers are written in the format [+][country code][subscriber number including area code].",
      ["invalid-provider-id"]: "The specified provider ID is invalid.",
      ["invalid-recipient-email"]: "The email corresponding to this action failed to send as the provided recipient email address is invalid.",
      ["invalid-sender"]: "The email template corresponding to this action contains an invalid sender email or name. Please fix by going to the Auth email templates section in the Firebase Console.",
      ["invalid-verification-id"]: "The verification ID used to create the phone auth credential is invalid.",
      ["invalid-tenant-id"]: "The Auth instance's tenant ID is invalid.",
      ["missing-android-pkg-name"]: "An Android Package Name must be provided if the Android App is required to be installed.",
      ["auth-domain-config-required"]: "Be sure to include authDomain when calling firebase.initializeApp(), by following the instructions in the Firebase console.",
      ["missing-app-credential"]: "The phone verification request is missing an application verifier assertion. A reCAPTCHA response token needs to be provided.",
      ["missing-verification-code"]: "The phone auth credential was created with an empty SMS verification code.",
      ["missing-continue-uri"]: "A continue URL must be provided in the request.",
      ["missing-iframe-start"]: "An internal AuthError has occurred.",
      ["missing-ios-bundle-id"]: "An iOS Bundle ID must be provided if an App Store ID is provided.",
      ["missing-or-invalid-nonce"]: "The request does not contain a valid nonce. This can occur if the SHA-256 hash of the provided raw nonce does not match the hashed nonce in the ID token payload.",
      ["missing-multi-factor-info"]: "No second factor identifier is provided.",
      ["missing-multi-factor-session"]: "The request is missing proof of first factor successful sign-in.",
      ["missing-phone-number"]: "To send verification codes, provide a phone number for the recipient.",
      ["missing-verification-id"]: "The phone auth credential was created with an empty verification ID.",
      ["app-deleted"]: "This instance of FirebaseApp has been deleted.",
      ["multi-factor-info-not-found"]: "The user does not have a second factor matching the identifier provided.",
      ["multi-factor-auth-required"]: "Proof of ownership of a second factor is required to complete sign-in.",
      ["account-exists-with-different-credential"]: "An account already exists with the same email address but different sign-in credentials. Sign in using a provider associated with this email address.",
      ["network-request-failed"]: "A network AuthError (such as timeout, interrupted connection or unreachable host) has occurred.",
      ["no-auth-event"]: "An internal AuthError has occurred.",
      ["no-such-provider"]: "User was not linked to an account with the given provider.",
      ["null-user"]: "A null user object was provided as the argument for an operation which requires a non-null user object.",
      ["operation-not-allowed"]: "The given sign-in provider is disabled for this Firebase project. Enable it in the Firebase console, under the sign-in method tab of the Auth section.",
      ["operation-not-supported-in-this-environment"]: 'This operation is not supported in the environment this application is running on. "location.protocol" must be http, https or chrome-extension and web storage must be enabled.',
      ["popup-blocked"]: "Unable to establish a connection with the popup. It may have been blocked by the browser.",
      ["popup-closed-by-user"]: "The popup has been closed by the user before finalizing the operation.",
      ["provider-already-linked"]: "User can only be linked to one identity for the given provider.",
      ["quota-exceeded"]: "The project's quota for this operation has been exceeded.",
      ["redirect-cancelled-by-user"]: "The redirect operation has been cancelled by the user before finalizing.",
      ["redirect-operation-pending"]: "A redirect sign-in operation is already pending.",
      ["rejected-credential"]: "The request contains malformed or mismatching credentials.",
      ["second-factor-already-in-use"]: "The second factor is already enrolled on this account.",
      ["maximum-second-factor-count-exceeded"]: "The maximum allowed number of second factors on a user has been exceeded.",
      ["tenant-id-mismatch"]: "The provided tenant ID does not match the Auth instance's tenant ID",
      ["timeout"]: "The operation has timed out.",
      ["user-token-expired"]: "The user's credential is no longer valid. The user must sign in again.",
      ["too-many-requests"]: "We have blocked all requests from this device due to unusual activity. Try again later.",
      ["unauthorized-continue-uri"]: "The domain of the continue URL is not whitelisted.  Please whitelist the domain in the Firebase console.",
      ["unsupported-first-factor"]: "Enrolling a second factor or signing in with a multi-factor account requires sign-in with a supported first factor.",
      ["unsupported-persistence-type"]: "The current environment does not support the specified persistence type.",
      ["unsupported-tenant-operation"]: "This operation is not supported in a multi-tenant context.",
      ["unverified-email"]: "The operation requires a verified email.",
      ["user-cancelled"]: "The user did not grant your application the permissions it requested.",
      ["user-not-found"]: "There is no user record corresponding to this identifier. The user may have been deleted.",
      ["user-disabled"]: "The user account has been disabled by an administrator.",
      ["user-mismatch"]: "The supplied credentials do not correspond to the previously signed in user.",
      ["user-signed-out"]: "",
      ["weak-password"]: "The password must be 6 characters long or more.",
      ["web-storage-unsupported"]: "This browser is not supported or 3rd party cookies and data may be disabled.",
      ["already-initialized"]: "initializeAuth() has already been called with different options. To avoid this error, call initializeAuth() with the same options as when it was originally called, or call getAuth() to return the already initialized instance."
    };
  }
  function _prodErrorMap() {
    return {
      ["dependent-sdk-initialized-before-auth"]: "Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."
    };
  }
  function _logError(msg, ...args) {
    if (logClient.logLevel <= LogLevel.ERROR) {
      logClient.error(`Auth (${SDK_VERSION}): ${msg}`, ...args);
    }
  }
  function _fail(authOrCode, ...rest) {
    throw createErrorInternal(authOrCode, ...rest);
  }
  function _createError(authOrCode, ...rest) {
    return createErrorInternal(authOrCode, ...rest);
  }
  function _errorWithCustomMessage(auth2, code, message) {
    const errorMap = Object.assign(Object.assign({}, prodErrorMap()), { [code]: message });
    const factory = new ErrorFactory("auth", "Firebase", errorMap);
    return factory.create(code, {
      appName: auth2.name
    });
  }
  function _assertInstanceOf(auth2, object, instance) {
    const constructorInstance = instance;
    if (!(object instanceof constructorInstance)) {
      if (constructorInstance.name !== object.constructor.name) {
        _fail(auth2, "argument-error");
      }
      throw _errorWithCustomMessage(auth2, "argument-error", `Type of ${object.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`);
    }
  }
  function createErrorInternal(authOrCode, ...rest) {
    if (typeof authOrCode !== "string") {
      const code = rest[0];
      const fullParams = [...rest.slice(1)];
      if (fullParams[0]) {
        fullParams[0].appName = authOrCode.name;
      }
      return authOrCode._errorFactory.create(code, ...fullParams);
    }
    return _DEFAULT_AUTH_ERROR_FACTORY.create(authOrCode, ...rest);
  }
  function _assert(assertion, authOrCode, ...rest) {
    if (!assertion) {
      throw createErrorInternal(authOrCode, ...rest);
    }
  }
  function debugFail(failure) {
    const message = `INTERNAL ASSERTION FAILED: ` + failure;
    _logError(message);
    throw new Error(message);
  }
  function debugAssert(assertion, message) {
    if (!assertion) {
      debugFail(message);
    }
  }
  function _getInstance(cls) {
    debugAssert(cls instanceof Function, "Expected a class definition");
    let instance = instanceCache.get(cls);
    if (instance) {
      debugAssert(instance instanceof cls, "Instance stored in cache mismatched with class");
      return instance;
    }
    instance = new cls();
    instanceCache.set(cls, instance);
    return instance;
  }
  function initializeAuth(app2, deps) {
    const provider = _getProvider(app2, "auth");
    if (provider.isInitialized()) {
      const auth3 = provider.getImmediate();
      const initialOptions = provider.getOptions();
      if (deepEqual(initialOptions, deps !== null && deps !== void 0 ? deps : {})) {
        return auth3;
      } else {
        _fail(auth3, "already-initialized");
      }
    }
    const auth2 = provider.initialize({ options: deps });
    return auth2;
  }
  function _initializeAuthInstance(auth2, deps) {
    const persistence = (deps === null || deps === void 0 ? void 0 : deps.persistence) || [];
    const hierarchy = (Array.isArray(persistence) ? persistence : [persistence]).map(_getInstance);
    if (deps === null || deps === void 0 ? void 0 : deps.errorMap) {
      auth2._updateErrorMap(deps.errorMap);
    }
    auth2._initializeWithPersistence(hierarchy, deps === null || deps === void 0 ? void 0 : deps.popupRedirectResolver);
  }
  function _getCurrentUrl() {
    var _a;
    return typeof self !== "undefined" && ((_a = self.location) === null || _a === void 0 ? void 0 : _a.href) || "";
  }
  function _isHttpOrHttps() {
    return _getCurrentScheme() === "http:" || _getCurrentScheme() === "https:";
  }
  function _getCurrentScheme() {
    var _a;
    return typeof self !== "undefined" && ((_a = self.location) === null || _a === void 0 ? void 0 : _a.protocol) || null;
  }
  function _isOnline() {
    if (typeof navigator !== "undefined" && navigator && "onLine" in navigator && typeof navigator.onLine === "boolean" && (_isHttpOrHttps() || isBrowserExtension() || "connection" in navigator)) {
      return navigator.onLine;
    }
    return true;
  }
  function _getUserLanguage() {
    if (typeof navigator === "undefined") {
      return null;
    }
    const navigatorLanguage = navigator;
    return navigatorLanguage.languages && navigatorLanguage.languages[0] || navigatorLanguage.language || null;
  }
  function _emulatorUrl(config2, path) {
    debugAssert(config2.emulator, "Emulator should always be set here");
    const { url } = config2.emulator;
    if (!path) {
      return url;
    }
    return `${url}${path.startsWith("/") ? path.slice(1) : path}`;
  }
  function _addTidIfNecessary(auth2, request) {
    if (auth2.tenantId && !request.tenantId) {
      return Object.assign(Object.assign({}, request), { tenantId: auth2.tenantId });
    }
    return request;
  }
  async function _performApiRequest(auth2, method, path, request, customErrorMap = {}) {
    return _performFetchWithErrorHandling(auth2, customErrorMap, async () => {
      let body = {};
      let params = {};
      if (request) {
        if (method === "GET") {
          params = request;
        } else {
          body = {
            body: JSON.stringify(request)
          };
        }
      }
      const query = querystring(Object.assign({ key: auth2.config.apiKey }, params)).slice(1);
      const headers = await auth2._getAdditionalHeaders();
      headers["Content-Type"] = "application/json";
      if (auth2.languageCode) {
        headers["X-Firebase-Locale"] = auth2.languageCode;
      }
      return FetchProvider.fetch()(_getFinalTarget(auth2, auth2.config.apiHost, path, query), Object.assign({
        method,
        headers,
        referrerPolicy: "no-referrer"
      }, body));
    });
  }
  async function _performFetchWithErrorHandling(auth2, customErrorMap, fetchFn) {
    auth2._canInitEmulator = false;
    const errorMap = Object.assign(Object.assign({}, SERVER_ERROR_MAP), customErrorMap);
    try {
      const networkTimeout = new NetworkTimeout(auth2);
      const response = await Promise.race([
        fetchFn(),
        networkTimeout.promise
      ]);
      networkTimeout.clearNetworkTimeout();
      const json = await response.json();
      if ("needConfirmation" in json) {
        throw _makeTaggedError(auth2, "account-exists-with-different-credential", json);
      }
      if (response.ok && !("errorMessage" in json)) {
        return json;
      } else {
        const errorMessage = response.ok ? json.errorMessage : json.error.message;
        const [serverErrorCode, serverErrorMessage] = errorMessage.split(" : ");
        if (serverErrorCode === "FEDERATED_USER_ID_ALREADY_LINKED") {
          throw _makeTaggedError(auth2, "credential-already-in-use", json);
        } else if (serverErrorCode === "EMAIL_EXISTS") {
          throw _makeTaggedError(auth2, "email-already-in-use", json);
        }
        const authError = errorMap[serverErrorCode] || serverErrorCode.toLowerCase().replace(/[_\s]+/g, "-");
        if (serverErrorMessage) {
          throw _errorWithCustomMessage(auth2, authError, serverErrorMessage);
        } else {
          _fail(auth2, authError);
        }
      }
    } catch (e) {
      if (e instanceof FirebaseError) {
        throw e;
      }
      _fail(auth2, "network-request-failed");
    }
  }
  async function _performSignInRequest(auth2, method, path, request, customErrorMap = {}) {
    const serverResponse = await _performApiRequest(auth2, method, path, request, customErrorMap);
    if ("mfaPendingCredential" in serverResponse) {
      _fail(auth2, "multi-factor-auth-required", {
        _serverResponse: serverResponse
      });
    }
    return serverResponse;
  }
  function _getFinalTarget(auth2, host, path, query) {
    const base = `${host}${path}?${query}`;
    if (!auth2.config.emulator) {
      return `${auth2.config.apiScheme}://${base}`;
    }
    return _emulatorUrl(auth2.config, base);
  }
  function _makeTaggedError(auth2, code, response) {
    const errorParams = {
      appName: auth2.name
    };
    if (response.email) {
      errorParams.email = response.email;
    }
    if (response.phoneNumber) {
      errorParams.phoneNumber = response.phoneNumber;
    }
    const error = _createError(auth2, code, errorParams);
    error.customData._tokenResponse = response;
    return error;
  }
  async function deleteAccount(auth2, request) {
    return _performApiRequest(auth2, "POST", "/v1/accounts:delete", request);
  }
  async function deleteLinkedAccounts(auth2, request) {
    return _performApiRequest(auth2, "POST", "/v1/accounts:update", request);
  }
  async function getAccountInfo(auth2, request) {
    return _performApiRequest(auth2, "POST", "/v1/accounts:lookup", request);
  }
  function utcTimestampToDateString(utcTimestamp) {
    if (!utcTimestamp) {
      return void 0;
    }
    try {
      const date = new Date(Number(utcTimestamp));
      if (!isNaN(date.getTime())) {
        return date.toUTCString();
      }
    } catch (e) {
    }
    return void 0;
  }
  async function getIdTokenResult(user, forceRefresh = false) {
    const userInternal = getModularInstance(user);
    const token = await userInternal.getIdToken(forceRefresh);
    const claims = _parseToken(token);
    _assert(claims && claims.exp && claims.auth_time && claims.iat, userInternal.auth, "internal-error");
    const firebase2 = typeof claims.firebase === "object" ? claims.firebase : void 0;
    const signInProvider = firebase2 === null || firebase2 === void 0 ? void 0 : firebase2["sign_in_provider"];
    return {
      claims,
      token,
      authTime: utcTimestampToDateString(secondsStringToMilliseconds(claims.auth_time)),
      issuedAtTime: utcTimestampToDateString(secondsStringToMilliseconds(claims.iat)),
      expirationTime: utcTimestampToDateString(secondsStringToMilliseconds(claims.exp)),
      signInProvider: signInProvider || null,
      signInSecondFactor: (firebase2 === null || firebase2 === void 0 ? void 0 : firebase2["sign_in_second_factor"]) || null
    };
  }
  function secondsStringToMilliseconds(seconds) {
    return Number(seconds) * 1e3;
  }
  function _parseToken(token) {
    const [algorithm, payload, signature] = token.split(".");
    if (algorithm === void 0 || payload === void 0 || signature === void 0) {
      _logError("JWT malformed, contained fewer than 3 sections");
      return null;
    }
    try {
      const decoded = base64Decode(payload);
      if (!decoded) {
        _logError("Failed to decode base64 JWT payload");
        return null;
      }
      return JSON.parse(decoded);
    } catch (e) {
      _logError("Caught error parsing JWT payload as JSON", e);
      return null;
    }
  }
  function _tokenExpiresIn(token) {
    const parsedToken = _parseToken(token);
    _assert(parsedToken, "internal-error");
    _assert(typeof parsedToken.exp !== "undefined", "internal-error");
    _assert(typeof parsedToken.iat !== "undefined", "internal-error");
    return Number(parsedToken.exp) - Number(parsedToken.iat);
  }
  async function _logoutIfInvalidated(user, promise, bypassAuthState = false) {
    if (bypassAuthState) {
      return promise;
    }
    try {
      return await promise;
    } catch (e) {
      if (e instanceof FirebaseError && isUserInvalidated(e)) {
        if (user.auth.currentUser === user) {
          await user.auth.signOut();
        }
      }
      throw e;
    }
  }
  function isUserInvalidated({ code }) {
    return code === `auth/${"user-disabled"}` || code === `auth/${"user-token-expired"}`;
  }
  async function _reloadWithoutSaving(user) {
    var _a;
    const auth2 = user.auth;
    const idToken = await user.getIdToken();
    const response = await _logoutIfInvalidated(user, getAccountInfo(auth2, { idToken }));
    _assert(response === null || response === void 0 ? void 0 : response.users.length, auth2, "internal-error");
    const coreAccount = response.users[0];
    user._notifyReloadListener(coreAccount);
    const newProviderData = ((_a = coreAccount.providerUserInfo) === null || _a === void 0 ? void 0 : _a.length) ? extractProviderData(coreAccount.providerUserInfo) : [];
    const providerData = mergeProviderData(user.providerData, newProviderData);
    const oldIsAnonymous = user.isAnonymous;
    const newIsAnonymous = !(user.email && coreAccount.passwordHash) && !(providerData === null || providerData === void 0 ? void 0 : providerData.length);
    const isAnonymous = !oldIsAnonymous ? false : newIsAnonymous;
    const updates = {
      uid: coreAccount.localId,
      displayName: coreAccount.displayName || null,
      photoURL: coreAccount.photoUrl || null,
      email: coreAccount.email || null,
      emailVerified: coreAccount.emailVerified || false,
      phoneNumber: coreAccount.phoneNumber || null,
      tenantId: coreAccount.tenantId || null,
      providerData,
      metadata: new UserMetadata(coreAccount.createdAt, coreAccount.lastLoginAt),
      isAnonymous
    };
    Object.assign(user, updates);
  }
  async function reload(user) {
    const userInternal = getModularInstance(user);
    await _reloadWithoutSaving(userInternal);
    await userInternal.auth._persistUserIfCurrent(userInternal);
    userInternal.auth._notifyListenersIfCurrent(userInternal);
  }
  function mergeProviderData(original, newData) {
    const deduped = original.filter((o) => !newData.some((n) => n.providerId === o.providerId));
    return [...deduped, ...newData];
  }
  function extractProviderData(providers) {
    return providers.map((_a) => {
      var { providerId } = _a, provider = __rest(_a, ["providerId"]);
      return {
        providerId,
        uid: provider.rawId || "",
        displayName: provider.displayName || null,
        email: provider.email || null,
        phoneNumber: provider.phoneNumber || null,
        photoURL: provider.photoUrl || null
      };
    });
  }
  async function requestStsToken(auth2, refreshToken) {
    const response = await _performFetchWithErrorHandling(auth2, {}, async () => {
      const body = querystring({
        "grant_type": "refresh_token",
        "refresh_token": refreshToken
      }).slice(1);
      const { tokenApiHost, apiKey } = auth2.config;
      const url = _getFinalTarget(auth2, tokenApiHost, "/v1/token", `key=${apiKey}`);
      const headers = await auth2._getAdditionalHeaders();
      headers["Content-Type"] = "application/x-www-form-urlencoded";
      return FetchProvider.fetch()(url, {
        method: "POST",
        headers,
        body
      });
    });
    return {
      accessToken: response.access_token,
      expiresIn: response.expires_in,
      refreshToken: response.refresh_token
    };
  }
  function assertStringOrUndefined(assertion, appName) {
    _assert(typeof assertion === "string" || typeof assertion === "undefined", "internal-error", { appName });
  }
  function _persistenceKeyName(key, apiKey, appName) {
    return `${"firebase"}:${key}:${apiKey}:${appName}`;
  }
  function _getBrowserName(userAgent) {
    const ua = userAgent.toLowerCase();
    if (ua.includes("opera/") || ua.includes("opr/") || ua.includes("opios/")) {
      return "Opera";
    } else if (_isIEMobile(ua)) {
      return "IEMobile";
    } else if (ua.includes("msie") || ua.includes("trident/")) {
      return "IE";
    } else if (ua.includes("edge/")) {
      return "Edge";
    } else if (_isFirefox(ua)) {
      return "Firefox";
    } else if (ua.includes("silk/")) {
      return "Silk";
    } else if (_isBlackBerry(ua)) {
      return "Blackberry";
    } else if (_isWebOS(ua)) {
      return "Webos";
    } else if (_isSafari(ua)) {
      return "Safari";
    } else if ((ua.includes("chrome/") || _isChromeIOS(ua)) && !ua.includes("edge/")) {
      return "Chrome";
    } else if (_isAndroid(ua)) {
      return "Android";
    } else {
      const re = /([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/;
      const matches = userAgent.match(re);
      if ((matches === null || matches === void 0 ? void 0 : matches.length) === 2) {
        return matches[1];
      }
    }
    return "Other";
  }
  function _isFirefox(ua = getUA()) {
    return /firefox\//i.test(ua);
  }
  function _isSafari(userAgent = getUA()) {
    const ua = userAgent.toLowerCase();
    return ua.includes("safari/") && !ua.includes("chrome/") && !ua.includes("crios/") && !ua.includes("android");
  }
  function _isChromeIOS(ua = getUA()) {
    return /crios\//i.test(ua);
  }
  function _isIEMobile(ua = getUA()) {
    return /iemobile/i.test(ua);
  }
  function _isAndroid(ua = getUA()) {
    return /android/i.test(ua);
  }
  function _isBlackBerry(ua = getUA()) {
    return /blackberry/i.test(ua);
  }
  function _isWebOS(ua = getUA()) {
    return /webos/i.test(ua);
  }
  function _isIOS(ua = getUA()) {
    return /iphone|ipad|ipod/i.test(ua);
  }
  function _isIOS7Or8(ua = getUA()) {
    return /(iPad|iPhone|iPod).*OS 7_\d/i.test(ua) || /(iPad|iPhone|iPod).*OS 8_\d/i.test(ua);
  }
  function _isIOSStandalone(ua = getUA()) {
    var _a;
    return _isIOS(ua) && !!((_a = window.navigator) === null || _a === void 0 ? void 0 : _a.standalone);
  }
  function _isIE10() {
    return isIE() && document.documentMode === 10;
  }
  function _isMobileBrowser(ua = getUA()) {
    return _isIOS(ua) || _isAndroid(ua) || _isWebOS(ua) || _isBlackBerry(ua) || /windows phone/i.test(ua) || _isIEMobile(ua);
  }
  function _isIframe() {
    try {
      return !!(window && window !== window.top);
    } catch (e) {
      return false;
    }
  }
  function _getClientVersion(clientPlatform, frameworks = []) {
    let reportedPlatform;
    switch (clientPlatform) {
      case "Browser":
        reportedPlatform = _getBrowserName(getUA());
        break;
      case "Worker":
        reportedPlatform = `${_getBrowserName(getUA())}-${clientPlatform}`;
        break;
      default:
        reportedPlatform = clientPlatform;
    }
    const reportedFrameworks = frameworks.length ? frameworks.join(",") : "FirebaseCore-web";
    return `${reportedPlatform}/${"JsCore"}/${SDK_VERSION}/${reportedFrameworks}`;
  }
  function _castAuth(auth2) {
    return getModularInstance(auth2);
  }
  function connectAuthEmulator(auth2, url, options) {
    const authInternal = _castAuth(auth2);
    _assert(authInternal._canInitEmulator, authInternal, "emulator-config-failed");
    _assert(/^https?:\/\//.test(url), authInternal, "invalid-emulator-scheme");
    const disableWarnings = !!(options === null || options === void 0 ? void 0 : options.disableWarnings);
    const protocol = extractProtocol(url);
    const { host, port } = extractHostAndPort(url);
    const portStr = port === null ? "" : `:${port}`;
    authInternal.config.emulator = { url: `${protocol}//${host}${portStr}/` };
    authInternal.settings.appVerificationDisabledForTesting = true;
    authInternal.emulatorConfig = Object.freeze({
      host,
      port,
      protocol: protocol.replace(":", ""),
      options: Object.freeze({ disableWarnings })
    });
    if (!disableWarnings) {
      emitEmulatorWarning();
    }
  }
  function extractProtocol(url) {
    const protocolEnd = url.indexOf(":");
    return protocolEnd < 0 ? "" : url.substr(0, protocolEnd + 1);
  }
  function extractHostAndPort(url) {
    const protocol = extractProtocol(url);
    const authority = /(\/\/)?([^?#/]+)/.exec(url.substr(protocol.length));
    if (!authority) {
      return { host: "", port: null };
    }
    const hostAndPort = authority[2].split("@").pop() || "";
    const bracketedIPv6 = /^(\[[^\]]+\])(:|$)/.exec(hostAndPort);
    if (bracketedIPv6) {
      const host = bracketedIPv6[1];
      return { host, port: parsePort(hostAndPort.substr(host.length + 1)) };
    } else {
      const [host, port] = hostAndPort.split(":");
      return { host, port: parsePort(port) };
    }
  }
  function parsePort(portStr) {
    if (!portStr) {
      return null;
    }
    const port = Number(portStr);
    if (isNaN(port)) {
      return null;
    }
    return port;
  }
  function emitEmulatorWarning() {
    function attachBanner() {
      const el = document.createElement("p");
      const sty = el.style;
      el.innerText = "Running in emulator mode. Do not use with production credentials.";
      sty.position = "fixed";
      sty.width = "100%";
      sty.backgroundColor = "#ffffff";
      sty.border = ".1em solid #000000";
      sty.color = "#b50000";
      sty.bottom = "0px";
      sty.left = "0px";
      sty.margin = "0px";
      sty.zIndex = "10000";
      sty.textAlign = "center";
      el.classList.add("firebase-emulator-warning");
      document.body.appendChild(el);
    }
    if (typeof console !== "undefined" && typeof console.info === "function") {
      console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials.");
    }
    if (typeof window !== "undefined" && typeof document !== "undefined") {
      if (document.readyState === "loading") {
        window.addEventListener("DOMContentLoaded", attachBanner);
      } else {
        attachBanner();
      }
    }
  }
  async function resetPassword(auth2, request) {
    return _performApiRequest(auth2, "POST", "/v1/accounts:resetPassword", _addTidIfNecessary(auth2, request));
  }
  async function updateEmailPassword(auth2, request) {
    return _performApiRequest(auth2, "POST", "/v1/accounts:update", request);
  }
  async function applyActionCode$1(auth2, request) {
    return _performApiRequest(auth2, "POST", "/v1/accounts:update", _addTidIfNecessary(auth2, request));
  }
  async function signInWithPassword(auth2, request) {
    return _performSignInRequest(auth2, "POST", "/v1/accounts:signInWithPassword", _addTidIfNecessary(auth2, request));
  }
  async function sendOobCode(auth2, request) {
    return _performApiRequest(auth2, "POST", "/v1/accounts:sendOobCode", _addTidIfNecessary(auth2, request));
  }
  async function sendEmailVerification$1(auth2, request) {
    return sendOobCode(auth2, request);
  }
  async function sendPasswordResetEmail$1(auth2, request) {
    return sendOobCode(auth2, request);
  }
  async function sendSignInLinkToEmail$1(auth2, request) {
    return sendOobCode(auth2, request);
  }
  async function verifyAndChangeEmail(auth2, request) {
    return sendOobCode(auth2, request);
  }
  async function signInWithEmailLink$1(auth2, request) {
    return _performSignInRequest(auth2, "POST", "/v1/accounts:signInWithEmailLink", _addTidIfNecessary(auth2, request));
  }
  async function signInWithEmailLinkForLinking(auth2, request) {
    return _performSignInRequest(auth2, "POST", "/v1/accounts:signInWithEmailLink", _addTidIfNecessary(auth2, request));
  }
  async function signInWithIdp(auth2, request) {
    return _performSignInRequest(auth2, "POST", "/v1/accounts:signInWithIdp", _addTidIfNecessary(auth2, request));
  }
  async function sendPhoneVerificationCode(auth2, request) {
    return _performApiRequest(auth2, "POST", "/v1/accounts:sendVerificationCode", _addTidIfNecessary(auth2, request));
  }
  async function signInWithPhoneNumber$1(auth2, request) {
    return _performSignInRequest(auth2, "POST", "/v1/accounts:signInWithPhoneNumber", _addTidIfNecessary(auth2, request));
  }
  async function linkWithPhoneNumber$1(auth2, request) {
    const response = await _performSignInRequest(auth2, "POST", "/v1/accounts:signInWithPhoneNumber", _addTidIfNecessary(auth2, request));
    if (response.temporaryProof) {
      throw _makeTaggedError(auth2, "account-exists-with-different-credential", response);
    }
    return response;
  }
  async function verifyPhoneNumberForExisting(auth2, request) {
    const apiRequest = Object.assign(Object.assign({}, request), { operation: "REAUTH" });
    return _performSignInRequest(auth2, "POST", "/v1/accounts:signInWithPhoneNumber", _addTidIfNecessary(auth2, apiRequest), VERIFY_PHONE_NUMBER_FOR_EXISTING_ERROR_MAP_);
  }
  function parseMode(mode) {
    switch (mode) {
      case "recoverEmail":
        return "RECOVER_EMAIL";
      case "resetPassword":
        return "PASSWORD_RESET";
      case "signIn":
        return "EMAIL_SIGNIN";
      case "verifyEmail":
        return "VERIFY_EMAIL";
      case "verifyAndChangeEmail":
        return "VERIFY_AND_CHANGE_EMAIL";
      case "revertSecondFactorAddition":
        return "REVERT_SECOND_FACTOR_ADDITION";
      default:
        return null;
    }
  }
  function parseDeepLink(url) {
    const link = querystringDecode(extractQuerystring(url))["link"];
    const doubleDeepLink = link ? querystringDecode(extractQuerystring(link))["deep_link_id"] : null;
    const iOSDeepLink = querystringDecode(extractQuerystring(url))["deep_link_id"];
    const iOSDoubleDeepLink = iOSDeepLink ? querystringDecode(extractQuerystring(iOSDeepLink))["link"] : null;
    return iOSDoubleDeepLink || iOSDeepLink || doubleDeepLink || link || url;
  }
  async function signUp(auth2, request) {
    return _performSignInRequest(auth2, "POST", "/v1/accounts:signUp", _addTidIfNecessary(auth2, request));
  }
  function providerIdForResponse(response) {
    if (response.providerId) {
      return response.providerId;
    }
    if ("phoneNumber" in response) {
      return "phone";
    }
    return null;
  }
  async function signInAnonymously(auth2) {
    var _a;
    const authInternal = _castAuth(auth2);
    await authInternal._initializationPromise;
    if ((_a = authInternal.currentUser) === null || _a === void 0 ? void 0 : _a.isAnonymous) {
      return new UserCredentialImpl({
        user: authInternal.currentUser,
        providerId: null,
        operationType: "signIn"
      });
    }
    const response = await signUp(authInternal, {
      returnSecureToken: true
    });
    const userCredential = await UserCredentialImpl._fromIdTokenResponse(authInternal, "signIn", response, true);
    await authInternal._updateCurrentUser(userCredential.user);
    return userCredential;
  }
  function _processCredentialSavingMfaContextIfNecessary(auth2, operationType, credential, user) {
    const idTokenProvider = operationType === "reauthenticate" ? credential._getReauthenticationResolver(auth2) : credential._getIdTokenResponse(auth2);
    return idTokenProvider.catch((error) => {
      if (error.code === `auth/${"multi-factor-auth-required"}`) {
        throw MultiFactorError._fromErrorAndOperation(auth2, error, operationType, user);
      }
      throw error;
    });
  }
  function providerDataAsNames(providerData) {
    return new Set(providerData.map(({ providerId }) => providerId).filter((pid) => !!pid));
  }
  async function unlink(user, providerId) {
    const userInternal = getModularInstance(user);
    await _assertLinkedStatus(true, userInternal, providerId);
    const { providerUserInfo } = await deleteLinkedAccounts(userInternal.auth, {
      idToken: await userInternal.getIdToken(),
      deleteProvider: [providerId]
    });
    const providersLeft = providerDataAsNames(providerUserInfo || []);
    userInternal.providerData = userInternal.providerData.filter((pd) => providersLeft.has(pd.providerId));
    if (!providersLeft.has("phone")) {
      userInternal.phoneNumber = null;
    }
    await userInternal.auth._persistUserIfCurrent(userInternal);
    return userInternal;
  }
  async function _link$1(user, credential, bypassAuthState = false) {
    const response = await _logoutIfInvalidated(user, credential._linkToIdToken(user.auth, await user.getIdToken()), bypassAuthState);
    return UserCredentialImpl._forOperation(user, "link", response);
  }
  async function _assertLinkedStatus(expected, user, provider) {
    await _reloadWithoutSaving(user);
    const providerIds = providerDataAsNames(user.providerData);
    const code = expected === false ? "provider-already-linked" : "no-such-provider";
    _assert(providerIds.has(provider) === expected, user.auth, code);
  }
  async function _reauthenticate(user, credential, bypassAuthState = false) {
    const { auth: auth2 } = user;
    const operationType = "reauthenticate";
    try {
      const response = await _logoutIfInvalidated(user, _processCredentialSavingMfaContextIfNecessary(auth2, operationType, credential, user), bypassAuthState);
      _assert(response.idToken, auth2, "internal-error");
      const parsed = _parseToken(response.idToken);
      _assert(parsed, auth2, "internal-error");
      const { sub: localId } = parsed;
      _assert(user.uid === localId, auth2, "user-mismatch");
      return UserCredentialImpl._forOperation(user, operationType, response);
    } catch (e) {
      if ((e === null || e === void 0 ? void 0 : e.code) === `auth/${"user-not-found"}`) {
        _fail(auth2, "user-mismatch");
      }
      throw e;
    }
  }
  async function _signInWithCredential(auth2, credential, bypassAuthState = false) {
    const operationType = "signIn";
    const response = await _processCredentialSavingMfaContextIfNecessary(auth2, operationType, credential);
    const userCredential = await UserCredentialImpl._fromIdTokenResponse(auth2, operationType, response);
    if (!bypassAuthState) {
      await auth2._updateCurrentUser(userCredential.user);
    }
    return userCredential;
  }
  async function signInWithCredential(auth2, credential) {
    return _signInWithCredential(_castAuth(auth2), credential);
  }
  async function linkWithCredential(user, credential) {
    const userInternal = getModularInstance(user);
    await _assertLinkedStatus(false, userInternal, credential.providerId);
    return _link$1(userInternal, credential);
  }
  async function reauthenticateWithCredential(user, credential) {
    return _reauthenticate(getModularInstance(user), credential);
  }
  async function signInWithCustomToken$1(auth2, request) {
    return _performSignInRequest(auth2, "POST", "/v1/accounts:signInWithCustomToken", _addTidIfNecessary(auth2, request));
  }
  async function signInWithCustomToken(auth2, customToken) {
    const authInternal = _castAuth(auth2);
    const response = await signInWithCustomToken$1(authInternal, {
      token: customToken,
      returnSecureToken: true
    });
    const cred = await UserCredentialImpl._fromIdTokenResponse(authInternal, "signIn", response);
    await authInternal._updateCurrentUser(cred.user);
    return cred;
  }
  function _setActionCodeSettingsOnRequest(auth2, request, actionCodeSettings) {
    var _a;
    _assert(((_a = actionCodeSettings.url) === null || _a === void 0 ? void 0 : _a.length) > 0, auth2, "invalid-continue-uri");
    _assert(typeof actionCodeSettings.dynamicLinkDomain === "undefined" || actionCodeSettings.dynamicLinkDomain.length > 0, auth2, "invalid-dynamic-link-domain");
    request.continueUrl = actionCodeSettings.url;
    request.dynamicLinkDomain = actionCodeSettings.dynamicLinkDomain;
    request.canHandleCodeInApp = actionCodeSettings.handleCodeInApp;
    if (actionCodeSettings.iOS) {
      _assert(actionCodeSettings.iOS.bundleId.length > 0, auth2, "missing-ios-bundle-id");
      request.iOSBundleId = actionCodeSettings.iOS.bundleId;
    }
    if (actionCodeSettings.android) {
      _assert(actionCodeSettings.android.packageName.length > 0, auth2, "missing-android-pkg-name");
      request.androidInstallApp = actionCodeSettings.android.installApp;
      request.androidMinimumVersionCode = actionCodeSettings.android.minimumVersion;
      request.androidPackageName = actionCodeSettings.android.packageName;
    }
  }
  async function sendPasswordResetEmail(auth2, email, actionCodeSettings) {
    const authModular = getModularInstance(auth2);
    const request = {
      requestType: "PASSWORD_RESET",
      email
    };
    if (actionCodeSettings) {
      _setActionCodeSettingsOnRequest(authModular, request, actionCodeSettings);
    }
    await sendPasswordResetEmail$1(authModular, request);
  }
  async function confirmPasswordReset(auth2, oobCode, newPassword) {
    await resetPassword(getModularInstance(auth2), {
      oobCode,
      newPassword
    });
  }
  async function applyActionCode(auth2, oobCode) {
    await applyActionCode$1(getModularInstance(auth2), { oobCode });
  }
  async function checkActionCode(auth2, oobCode) {
    const authModular = getModularInstance(auth2);
    const response = await resetPassword(authModular, { oobCode });
    const operation = response.requestType;
    _assert(operation, authModular, "internal-error");
    switch (operation) {
      case "EMAIL_SIGNIN":
        break;
      case "VERIFY_AND_CHANGE_EMAIL":
        _assert(response.newEmail, authModular, "internal-error");
        break;
      case "REVERT_SECOND_FACTOR_ADDITION":
        _assert(response.mfaInfo, authModular, "internal-error");
      default:
        _assert(response.email, authModular, "internal-error");
    }
    let multiFactorInfo = null;
    if (response.mfaInfo) {
      multiFactorInfo = MultiFactorInfoImpl._fromServerResponse(_castAuth(authModular), response.mfaInfo);
    }
    return {
      data: {
        email: (response.requestType === "VERIFY_AND_CHANGE_EMAIL" ? response.newEmail : response.email) || null,
        previousEmail: (response.requestType === "VERIFY_AND_CHANGE_EMAIL" ? response.email : response.newEmail) || null,
        multiFactorInfo
      },
      operation
    };
  }
  async function verifyPasswordResetCode(auth2, code) {
    const { data } = await checkActionCode(getModularInstance(auth2), code);
    return data.email;
  }
  async function createUserWithEmailAndPassword(auth2, email, password) {
    const authInternal = _castAuth(auth2);
    const response = await signUp(authInternal, {
      returnSecureToken: true,
      email,
      password
    });
    const userCredential = await UserCredentialImpl._fromIdTokenResponse(authInternal, "signIn", response);
    await authInternal._updateCurrentUser(userCredential.user);
    return userCredential;
  }
  function signInWithEmailAndPassword(auth2, email, password) {
    return signInWithCredential(getModularInstance(auth2), EmailAuthProvider.credential(email, password));
  }
  async function sendSignInLinkToEmail(auth2, email, actionCodeSettings) {
    const authModular = getModularInstance(auth2);
    const request = {
      requestType: "EMAIL_SIGNIN",
      email
    };
    _assert(actionCodeSettings.handleCodeInApp, authModular, "argument-error");
    if (actionCodeSettings) {
      _setActionCodeSettingsOnRequest(authModular, request, actionCodeSettings);
    }
    await sendSignInLinkToEmail$1(authModular, request);
  }
  function isSignInWithEmailLink(auth2, emailLink) {
    const actionCodeUrl = ActionCodeURL.parseLink(emailLink);
    return (actionCodeUrl === null || actionCodeUrl === void 0 ? void 0 : actionCodeUrl.operation) === "EMAIL_SIGNIN";
  }
  async function signInWithEmailLink(auth2, email, emailLink) {
    const authModular = getModularInstance(auth2);
    const credential = EmailAuthProvider.credentialWithLink(email, emailLink || _getCurrentUrl());
    _assert(credential._tenantId === (authModular.tenantId || null), authModular, "tenant-id-mismatch");
    return signInWithCredential(authModular, credential);
  }
  async function createAuthUri(auth2, request) {
    return _performApiRequest(auth2, "POST", "/v1/accounts:createAuthUri", _addTidIfNecessary(auth2, request));
  }
  async function fetchSignInMethodsForEmail(auth2, email) {
    const continueUri = _isHttpOrHttps() ? _getCurrentUrl() : "http://localhost";
    const request = {
      identifier: email,
      continueUri
    };
    const { signinMethods } = await createAuthUri(getModularInstance(auth2), request);
    return signinMethods || [];
  }
  async function sendEmailVerification(user, actionCodeSettings) {
    const userInternal = getModularInstance(user);
    const idToken = await user.getIdToken();
    const request = {
      requestType: "VERIFY_EMAIL",
      idToken
    };
    if (actionCodeSettings) {
      _setActionCodeSettingsOnRequest(userInternal.auth, request, actionCodeSettings);
    }
    const { email } = await sendEmailVerification$1(userInternal.auth, request);
    if (email !== user.email) {
      await user.reload();
    }
  }
  async function verifyBeforeUpdateEmail(user, newEmail, actionCodeSettings) {
    const userInternal = getModularInstance(user);
    const idToken = await user.getIdToken();
    const request = {
      requestType: "VERIFY_AND_CHANGE_EMAIL",
      idToken,
      newEmail
    };
    if (actionCodeSettings) {
      _setActionCodeSettingsOnRequest(userInternal.auth, request, actionCodeSettings);
    }
    const { email } = await verifyAndChangeEmail(userInternal.auth, request);
    if (email !== user.email) {
      await user.reload();
    }
  }
  async function updateProfile$1(auth2, request) {
    return _performApiRequest(auth2, "POST", "/v1/accounts:update", request);
  }
  async function updateProfile(user, { displayName, photoURL: photoUrl }) {
    if (displayName === void 0 && photoUrl === void 0) {
      return;
    }
    const userInternal = getModularInstance(user);
    const idToken = await userInternal.getIdToken();
    const profileRequest = {
      idToken,
      displayName,
      photoUrl,
      returnSecureToken: true
    };
    const response = await _logoutIfInvalidated(userInternal, updateProfile$1(userInternal.auth, profileRequest));
    userInternal.displayName = response.displayName || null;
    userInternal.photoURL = response.photoUrl || null;
    const passwordProvider = userInternal.providerData.find(({ providerId }) => providerId === "password");
    if (passwordProvider) {
      passwordProvider.displayName = userInternal.displayName;
      passwordProvider.photoURL = userInternal.photoURL;
    }
    await userInternal._updateTokensIfNecessary(response);
  }
  function updateEmail(user, newEmail) {
    return updateEmailOrPassword(getModularInstance(user), newEmail, null);
  }
  function updatePassword(user, newPassword) {
    return updateEmailOrPassword(getModularInstance(user), null, newPassword);
  }
  async function updateEmailOrPassword(user, email, password) {
    const { auth: auth2 } = user;
    const idToken = await user.getIdToken();
    const request = {
      idToken,
      returnSecureToken: true
    };
    if (email) {
      request.email = email;
    }
    if (password) {
      request.password = password;
    }
    const response = await _logoutIfInvalidated(user, updateEmailPassword(auth2, request));
    await user._updateTokensIfNecessary(response, true);
  }
  function _fromIdTokenResponse(idTokenResponse) {
    var _a, _b;
    if (!idTokenResponse) {
      return null;
    }
    const { providerId } = idTokenResponse;
    const profile = idTokenResponse.rawUserInfo ? JSON.parse(idTokenResponse.rawUserInfo) : {};
    const isNewUser = idTokenResponse.isNewUser || idTokenResponse.kind === "identitytoolkit#SignupNewUserResponse";
    if (!providerId && (idTokenResponse === null || idTokenResponse === void 0 ? void 0 : idTokenResponse.idToken)) {
      const signInProvider = (_b = (_a = _parseToken(idTokenResponse.idToken)) === null || _a === void 0 ? void 0 : _a.firebase) === null || _b === void 0 ? void 0 : _b["sign_in_provider"];
      if (signInProvider) {
        const filteredProviderId = signInProvider !== "anonymous" && signInProvider !== "custom" ? signInProvider : null;
        return new GenericAdditionalUserInfo(isNewUser, filteredProviderId);
      }
    }
    if (!providerId) {
      return null;
    }
    switch (providerId) {
      case "facebook.com":
        return new FacebookAdditionalUserInfo(isNewUser, profile);
      case "github.com":
        return new GithubAdditionalUserInfo(isNewUser, profile);
      case "google.com":
        return new GoogleAdditionalUserInfo(isNewUser, profile);
      case "twitter.com":
        return new TwitterAdditionalUserInfo(isNewUser, profile, idTokenResponse.screenName || null);
      case "custom":
      case "anonymous":
        return new GenericAdditionalUserInfo(isNewUser, null);
      default:
        return new GenericAdditionalUserInfo(isNewUser, providerId, profile);
    }
  }
  function getAdditionalUserInfo(userCredential) {
    const { user, _tokenResponse } = userCredential;
    if (user.isAnonymous && !_tokenResponse) {
      return {
        providerId: null,
        isNewUser: false,
        profile: null
      };
    }
    return _fromIdTokenResponse(_tokenResponse);
  }
  function getMultiFactorResolver(auth2, error) {
    var _a;
    const authModular = getModularInstance(auth2);
    const errorInternal = error;
    _assert(error.customData.operationType, authModular, "argument-error");
    _assert((_a = errorInternal.customData._serverResponse) === null || _a === void 0 ? void 0 : _a.mfaPendingCredential, authModular, "argument-error");
    return MultiFactorResolverImpl._fromError(authModular, errorInternal);
  }
  function startEnrollPhoneMfa(auth2, request) {
    return _performApiRequest(auth2, "POST", "/v2/accounts/mfaEnrollment:start", _addTidIfNecessary(auth2, request));
  }
  function finalizeEnrollPhoneMfa(auth2, request) {
    return _performApiRequest(auth2, "POST", "/v2/accounts/mfaEnrollment:finalize", _addTidIfNecessary(auth2, request));
  }
  function withdrawMfa(auth2, request) {
    return _performApiRequest(auth2, "POST", "/v2/accounts/mfaEnrollment:withdraw", _addTidIfNecessary(auth2, request));
  }
  function multiFactor(user) {
    const userModular = getModularInstance(user);
    if (!multiFactorUserCache.has(userModular)) {
      multiFactorUserCache.set(userModular, MultiFactorUserImpl._fromUser(userModular));
    }
    return multiFactorUserCache.get(userModular);
  }
  function _iframeCannotSyncWebStorage() {
    const ua = getUA();
    return _isSafari(ua) || _isIOS(ua);
  }
  function _allSettled(promises) {
    return Promise.all(promises.map(async (promise) => {
      try {
        const value = await promise;
        return {
          fulfilled: true,
          value
        };
      } catch (reason) {
        return {
          fulfilled: false,
          reason
        };
      }
    }));
  }
  function _generateEventId(prefix = "", digits = 10) {
    let random = "";
    for (let i = 0; i < digits; i++) {
      random += Math.floor(Math.random() * 10);
    }
    return prefix + random;
  }
  function _window() {
    return window;
  }
  function _setWindowLocation(url) {
    _window().location.href = url;
  }
  function _isWorker() {
    return typeof _window()["WorkerGlobalScope"] !== "undefined" && typeof _window()["importScripts"] === "function";
  }
  async function _getActiveServiceWorker() {
    if (!(navigator === null || navigator === void 0 ? void 0 : navigator.serviceWorker)) {
      return null;
    }
    try {
      const registration = await navigator.serviceWorker.ready;
      return registration.active;
    } catch (_a) {
      return null;
    }
  }
  function _getServiceWorkerController() {
    var _a;
    return ((_a = navigator === null || navigator === void 0 ? void 0 : navigator.serviceWorker) === null || _a === void 0 ? void 0 : _a.controller) || null;
  }
  function _getWorkerGlobalScope() {
    return _isWorker() ? self : null;
  }
  function getObjectStore(db, isReadWrite) {
    return db.transaction([DB_OBJECTSTORE_NAME], isReadWrite ? "readwrite" : "readonly").objectStore(DB_OBJECTSTORE_NAME);
  }
  function _deleteDatabase() {
    const request = indexedDB.deleteDatabase(DB_NAME);
    return new DBPromise(request).toPromise();
  }
  function _openDatabase() {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    return new Promise((resolve, reject) => {
      request.addEventListener("error", () => {
        reject(request.error);
      });
      request.addEventListener("upgradeneeded", () => {
        const db = request.result;
        try {
          db.createObjectStore(DB_OBJECTSTORE_NAME, { keyPath: DB_DATA_KEYPATH });
        } catch (e) {
          reject(e);
        }
      });
      request.addEventListener("success", async () => {
        const db = request.result;
        if (!db.objectStoreNames.contains(DB_OBJECTSTORE_NAME)) {
          db.close();
          await _deleteDatabase();
          resolve(await _openDatabase());
        } else {
          resolve(db);
        }
      });
    });
  }
  async function _putObject(db, key, value) {
    const request = getObjectStore(db, true).put({
      [DB_DATA_KEYPATH]: key,
      value
    });
    return new DBPromise(request).toPromise();
  }
  async function getObject(db, key) {
    const request = getObjectStore(db, false).get(key);
    const data = await new DBPromise(request).toPromise();
    return data === void 0 ? null : data.value;
  }
  function _deleteObject(db, key) {
    const request = getObjectStore(db, true).delete(key);
    return new DBPromise(request).toPromise();
  }
  function startSignInPhoneMfa(auth2, request) {
    return _performApiRequest(auth2, "POST", "/v2/accounts/mfaSignIn:start", _addTidIfNecessary(auth2, request));
  }
  function finalizeSignInPhoneMfa(auth2, request) {
    return _performApiRequest(auth2, "POST", "/v2/accounts/mfaSignIn:finalize", _addTidIfNecessary(auth2, request));
  }
  async function getRecaptchaParams(auth2) {
    return (await _performApiRequest(auth2, "GET", "/v1/recaptchaParams")).recaptchaSiteKey || "";
  }
  function getScriptParentElement() {
    var _a, _b;
    return (_b = (_a = document.getElementsByTagName("head")) === null || _a === void 0 ? void 0 : _a[0]) !== null && _b !== void 0 ? _b : document;
  }
  function _loadJS(url) {
    return new Promise((resolve, reject) => {
      const el = document.createElement("script");
      el.setAttribute("src", url);
      el.onload = resolve;
      el.onerror = (e) => {
        const error = _createError("internal-error");
        error.customData = e;
        reject(error);
      };
      el.type = "text/javascript";
      el.charset = "UTF-8";
      getScriptParentElement().appendChild(el);
    });
  }
  function _generateCallbackName(prefix) {
    return `__${prefix}${Math.floor(Math.random() * 1e6)}`;
  }
  function generateRandomAlphaNumericString(len) {
    const chars = [];
    const allowedChars = "1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (let i = 0; i < len; i++) {
      chars.push(allowedChars.charAt(Math.floor(Math.random() * allowedChars.length)));
    }
    return chars.join("");
  }
  function isHostLanguageValid(hl) {
    return hl.length <= 6 && /^\s*[a-zA-Z0-9\-]*\s*$/.test(hl);
  }
  function domReady() {
    let resolver = null;
    return new Promise((resolve) => {
      if (document.readyState === "complete") {
        resolve();
        return;
      }
      resolver = () => resolve();
      window.addEventListener("load", resolver);
    }).catch((e) => {
      if (resolver) {
        window.removeEventListener("load", resolver);
      }
      throw e;
    });
  }
  async function signInWithPhoneNumber(auth2, phoneNumber, appVerifier) {
    const authInternal = _castAuth(auth2);
    const verificationId = await _verifyPhoneNumber(authInternal, phoneNumber, getModularInstance(appVerifier));
    return new ConfirmationResultImpl(verificationId, (cred) => signInWithCredential(authInternal, cred));
  }
  async function linkWithPhoneNumber(user, phoneNumber, appVerifier) {
    const userInternal = getModularInstance(user);
    await _assertLinkedStatus(false, userInternal, "phone");
    const verificationId = await _verifyPhoneNumber(userInternal.auth, phoneNumber, getModularInstance(appVerifier));
    return new ConfirmationResultImpl(verificationId, (cred) => linkWithCredential(userInternal, cred));
  }
  async function reauthenticateWithPhoneNumber(user, phoneNumber, appVerifier) {
    const userInternal = getModularInstance(user);
    const verificationId = await _verifyPhoneNumber(userInternal.auth, phoneNumber, getModularInstance(appVerifier));
    return new ConfirmationResultImpl(verificationId, (cred) => reauthenticateWithCredential(userInternal, cred));
  }
  async function _verifyPhoneNumber(auth2, options, verifier) {
    var _a;
    const recaptchaToken = await verifier.verify();
    try {
      _assert(typeof recaptchaToken === "string", auth2, "argument-error");
      _assert(verifier.type === RECAPTCHA_VERIFIER_TYPE, auth2, "argument-error");
      let phoneInfoOptions;
      if (typeof options === "string") {
        phoneInfoOptions = {
          phoneNumber: options
        };
      } else {
        phoneInfoOptions = options;
      }
      if ("session" in phoneInfoOptions) {
        const session = phoneInfoOptions.session;
        if ("phoneNumber" in phoneInfoOptions) {
          _assert(session.type === "enroll", auth2, "internal-error");
          const response = await startEnrollPhoneMfa(auth2, {
            idToken: session.credential,
            phoneEnrollmentInfo: {
              phoneNumber: phoneInfoOptions.phoneNumber,
              recaptchaToken
            }
          });
          return response.phoneSessionInfo.sessionInfo;
        } else {
          _assert(session.type === "signin", auth2, "internal-error");
          const mfaEnrollmentId = ((_a = phoneInfoOptions.multiFactorHint) === null || _a === void 0 ? void 0 : _a.uid) || phoneInfoOptions.multiFactorUid;
          _assert(mfaEnrollmentId, auth2, "missing-multi-factor-info");
          const response = await startSignInPhoneMfa(auth2, {
            mfaPendingCredential: session.credential,
            mfaEnrollmentId,
            phoneSignInInfo: {
              recaptchaToken
            }
          });
          return response.phoneResponseInfo.sessionInfo;
        }
      } else {
        const { sessionInfo } = await sendPhoneVerificationCode(auth2, {
          phoneNumber: phoneInfoOptions.phoneNumber,
          recaptchaToken
        });
        return sessionInfo;
      }
    } finally {
      verifier._reset();
    }
  }
  async function updatePhoneNumber(user, credential) {
    await _link$1(getModularInstance(user), credential);
  }
  function _withDefaultResolver(auth2, resolverOverride) {
    if (resolverOverride) {
      return _getInstance(resolverOverride);
    }
    _assert(auth2._popupRedirectResolver, auth2, "argument-error");
    return auth2._popupRedirectResolver;
  }
  function _signIn(params) {
    return _signInWithCredential(params.auth, new IdpCredential(params), params.bypassAuthState);
  }
  function _reauth(params) {
    const { auth: auth2, user } = params;
    _assert(user, auth2, "internal-error");
    return _reauthenticate(user, new IdpCredential(params), params.bypassAuthState);
  }
  async function _link(params) {
    const { auth: auth2, user } = params;
    _assert(user, auth2, "internal-error");
    return _link$1(user, new IdpCredential(params), params.bypassAuthState);
  }
  async function signInWithPopup(auth2, provider, resolver) {
    const authInternal = _castAuth(auth2);
    _assertInstanceOf(auth2, provider, FederatedAuthProvider);
    const resolverInternal = _withDefaultResolver(authInternal, resolver);
    const action = new PopupOperation(authInternal, "signInViaPopup", provider, resolverInternal);
    return action.executeNotNull();
  }
  async function reauthenticateWithPopup(user, provider, resolver) {
    const userInternal = getModularInstance(user);
    _assertInstanceOf(userInternal.auth, provider, FederatedAuthProvider);
    const resolverInternal = _withDefaultResolver(userInternal.auth, resolver);
    const action = new PopupOperation(userInternal.auth, "reauthViaPopup", provider, resolverInternal, userInternal);
    return action.executeNotNull();
  }
  async function linkWithPopup(user, provider, resolver) {
    const userInternal = getModularInstance(user);
    _assertInstanceOf(userInternal.auth, provider, FederatedAuthProvider);
    const resolverInternal = _withDefaultResolver(userInternal.auth, resolver);
    const action = new PopupOperation(userInternal.auth, "linkViaPopup", provider, resolverInternal, userInternal);
    return action.executeNotNull();
  }
  async function _getAndClearPendingRedirectStatus(resolver, auth2) {
    const key = pendingRedirectKey(auth2);
    const persistence = resolverPersistence(resolver);
    if (!await persistence._isAvailable()) {
      return false;
    }
    const hasPendingRedirect = await persistence._get(key) === "true";
    await persistence._remove(key);
    return hasPendingRedirect;
  }
  async function _setPendingRedirectStatus(resolver, auth2) {
    return resolverPersistence(resolver)._set(pendingRedirectKey(auth2), "true");
  }
  function _clearRedirectOutcomes() {
    redirectOutcomeMap.clear();
  }
  function resolverPersistence(resolver) {
    return _getInstance(resolver._redirectPersistence);
  }
  function pendingRedirectKey(auth2) {
    return _persistenceKeyName(PENDING_REDIRECT_KEY, auth2.config.apiKey, auth2.name);
  }
  function signInWithRedirect(auth2, provider, resolver) {
    return _signInWithRedirect(auth2, provider, resolver);
  }
  async function _signInWithRedirect(auth2, provider, resolver) {
    const authInternal = _castAuth(auth2);
    _assertInstanceOf(auth2, provider, FederatedAuthProvider);
    const resolverInternal = _withDefaultResolver(authInternal, resolver);
    await _setPendingRedirectStatus(resolverInternal, authInternal);
    return resolverInternal._openRedirect(authInternal, provider, "signInViaRedirect");
  }
  function reauthenticateWithRedirect(user, provider, resolver) {
    return _reauthenticateWithRedirect(user, provider, resolver);
  }
  async function _reauthenticateWithRedirect(user, provider, resolver) {
    const userInternal = getModularInstance(user);
    _assertInstanceOf(userInternal.auth, provider, FederatedAuthProvider);
    const resolverInternal = _withDefaultResolver(userInternal.auth, resolver);
    await _setPendingRedirectStatus(resolverInternal, userInternal.auth);
    const eventId = await prepareUserForRedirect(userInternal);
    return resolverInternal._openRedirect(userInternal.auth, provider, "reauthViaRedirect", eventId);
  }
  function linkWithRedirect(user, provider, resolver) {
    return _linkWithRedirect(user, provider, resolver);
  }
  async function _linkWithRedirect(user, provider, resolver) {
    const userInternal = getModularInstance(user);
    _assertInstanceOf(userInternal.auth, provider, FederatedAuthProvider);
    const resolverInternal = _withDefaultResolver(userInternal.auth, resolver);
    await _assertLinkedStatus(false, userInternal, provider.providerId);
    await _setPendingRedirectStatus(resolverInternal, userInternal.auth);
    const eventId = await prepareUserForRedirect(userInternal);
    return resolverInternal._openRedirect(userInternal.auth, provider, "linkViaRedirect", eventId);
  }
  async function getRedirectResult(auth2, resolver) {
    await _castAuth(auth2)._initializationPromise;
    return _getRedirectResult(auth2, resolver, false);
  }
  async function _getRedirectResult(auth2, resolverExtern, bypassAuthState = false) {
    const authInternal = _castAuth(auth2);
    const resolver = _withDefaultResolver(authInternal, resolverExtern);
    const action = new RedirectAction(authInternal, resolver, bypassAuthState);
    const result = await action.execute();
    if (result && !bypassAuthState) {
      delete result.user._redirectEventId;
      await authInternal._persistUserIfCurrent(result.user);
      await authInternal._setRedirectUser(null, resolverExtern);
    }
    return result;
  }
  async function prepareUserForRedirect(user) {
    const eventId = _generateEventId(`${user.uid}:::`);
    user._redirectEventId = eventId;
    await user.auth._setRedirectUser(user);
    await user.auth._persistUserIfCurrent(user);
    return eventId;
  }
  function eventUid(e) {
    return [e.type, e.eventId, e.sessionId, e.tenantId].filter((v) => v).join("-");
  }
  function isNullRedirectEvent({ type, error }) {
    return type === "unknown" && (error === null || error === void 0 ? void 0 : error.code) === `auth/${"no-auth-event"}`;
  }
  function isRedirectEvent(event) {
    switch (event.type) {
      case "signInViaRedirect":
      case "linkViaRedirect":
      case "reauthViaRedirect":
        return true;
      case "unknown":
        return isNullRedirectEvent(event);
      default:
        return false;
    }
  }
  async function _getProjectConfig(auth2, request = {}) {
    return _performApiRequest(auth2, "GET", "/v1/projects", request);
  }
  async function _validateOrigin(auth2) {
    if (auth2.config.emulator) {
      return;
    }
    const { authorizedDomains } = await _getProjectConfig(auth2);
    for (const domain of authorizedDomains) {
      try {
        if (matchDomain(domain)) {
          return;
        }
      } catch (_a) {
      }
    }
    _fail(auth2, "unauthorized-domain");
  }
  function matchDomain(expected) {
    const currentUrl = _getCurrentUrl();
    const { protocol, hostname } = new URL(currentUrl);
    if (expected.startsWith("chrome-extension://")) {
      const ceUrl = new URL(expected);
      if (ceUrl.hostname === "" && hostname === "") {
        return protocol === "chrome-extension:" && expected.replace("chrome-extension://", "") === currentUrl.replace("chrome-extension://", "");
      }
      return protocol === "chrome-extension:" && ceUrl.hostname === hostname;
    }
    if (!HTTP_REGEX.test(protocol)) {
      return false;
    }
    if (IP_ADDRESS_REGEX.test(expected)) {
      return hostname === expected;
    }
    const escapedDomainPattern = expected.replace(/\./g, "\\.");
    const re = new RegExp("^(.+\\." + escapedDomainPattern + "|" + escapedDomainPattern + ")$", "i");
    return re.test(hostname);
  }
  function resetUnloadedGapiModules() {
    const beacon = _window().___jsl;
    if (beacon === null || beacon === void 0 ? void 0 : beacon.H) {
      for (const hint of Object.keys(beacon.H)) {
        beacon.H[hint].r = beacon.H[hint].r || [];
        beacon.H[hint].L = beacon.H[hint].L || [];
        beacon.H[hint].r = [...beacon.H[hint].L];
        if (beacon.CP) {
          for (let i = 0; i < beacon.CP.length; i++) {
            beacon.CP[i] = null;
          }
        }
      }
    }
  }
  function loadGapi(auth2) {
    return new Promise((resolve, reject) => {
      var _a, _b, _c;
      function loadGapiIframe() {
        resetUnloadedGapiModules();
        gapi.load("gapi.iframes", {
          callback: () => {
            resolve(gapi.iframes.getContext());
          },
          ontimeout: () => {
            resetUnloadedGapiModules();
            reject(_createError(auth2, "network-request-failed"));
          },
          timeout: NETWORK_TIMEOUT.get()
        });
      }
      if ((_b = (_a = _window().gapi) === null || _a === void 0 ? void 0 : _a.iframes) === null || _b === void 0 ? void 0 : _b.Iframe) {
        resolve(gapi.iframes.getContext());
      } else if (!!((_c = _window().gapi) === null || _c === void 0 ? void 0 : _c.load)) {
        loadGapiIframe();
      } else {
        const cbName = _generateCallbackName("iframefcb");
        _window()[cbName] = () => {
          if (!!gapi.load) {
            loadGapiIframe();
          } else {
            reject(_createError(auth2, "network-request-failed"));
          }
        };
        return _loadJS(`https://apis.google.com/js/api.js?onload=${cbName}`).catch((e) => reject(e));
      }
    }).catch((error) => {
      cachedGApiLoader = null;
      throw error;
    });
  }
  function _loadGapi(auth2) {
    cachedGApiLoader = cachedGApiLoader || loadGapi(auth2);
    return cachedGApiLoader;
  }
  function getIframeUrl(auth2) {
    const config2 = auth2.config;
    _assert(config2.authDomain, auth2, "auth-domain-config-required");
    const url = config2.emulator ? _emulatorUrl(config2, EMULATED_IFRAME_PATH) : `https://${auth2.config.authDomain}/${IFRAME_PATH}`;
    const params = {
      apiKey: config2.apiKey,
      appName: auth2.name,
      v: SDK_VERSION
    };
    const eid = EID_FROM_APIHOST.get(auth2.config.apiHost);
    if (eid) {
      params.eid = eid;
    }
    const frameworks = auth2._getFrameworks();
    if (frameworks.length) {
      params.fw = frameworks.join(",");
    }
    return `${url}?${querystring(params).slice(1)}`;
  }
  async function _openIframe(auth2) {
    const context = await _loadGapi(auth2);
    const gapi2 = _window().gapi;
    _assert(gapi2, auth2, "internal-error");
    return context.open({
      where: document.body,
      url: getIframeUrl(auth2),
      messageHandlersFilter: gapi2.iframes.CROSS_ORIGIN_IFRAMES_FILTER,
      attributes: IFRAME_ATTRIBUTES,
      dontclear: true
    }, (iframe) => new Promise(async (resolve, reject) => {
      await iframe.restyle({
        setHideOnLeave: false
      });
      const networkError = _createError(auth2, "network-request-failed");
      const networkErrorTimer = _window().setTimeout(() => {
        reject(networkError);
      }, PING_TIMEOUT.get());
      function clearTimerAndResolve() {
        _window().clearTimeout(networkErrorTimer);
        resolve(iframe);
      }
      iframe.ping(clearTimerAndResolve).then(clearTimerAndResolve, () => {
        reject(networkError);
      });
    }));
  }
  function _open(auth2, url, name7, width = DEFAULT_WIDTH, height = DEFAULT_HEIGHT) {
    const top = Math.max((window.screen.availHeight - height) / 2, 0).toString();
    const left = Math.max((window.screen.availWidth - width) / 2, 0).toString();
    let target = "";
    const options = Object.assign(Object.assign({}, BASE_POPUP_OPTIONS), {
      width: width.toString(),
      height: height.toString(),
      top,
      left
    });
    const ua = getUA().toLowerCase();
    if (name7) {
      target = _isChromeIOS(ua) ? TARGET_BLANK : name7;
    }
    if (_isFirefox(ua)) {
      url = url || FIREFOX_EMPTY_URL;
      options.scrollbars = "yes";
    }
    const optionsString = Object.entries(options).reduce((accum, [key, value]) => `${accum}${key}=${value},`, "");
    if (_isIOSStandalone(ua) && target !== "_self") {
      openAsNewWindowIOS(url || "", target);
      return new AuthPopup(null);
    }
    const newWin = window.open(url || "", target, optionsString);
    _assert(newWin, auth2, "popup-blocked");
    try {
      newWin.focus();
    } catch (e) {
    }
    return new AuthPopup(newWin);
  }
  function openAsNewWindowIOS(url, target) {
    const el = document.createElement("a");
    el.href = url;
    el.target = target;
    const click = document.createEvent("MouseEvent");
    click.initMouseEvent("click", true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 1, null);
    el.dispatchEvent(click);
  }
  function _getRedirectUrl(auth2, provider, authType, redirectUrl, eventId, additionalParams) {
    _assert(auth2.config.authDomain, auth2, "auth-domain-config-required");
    _assert(auth2.config.apiKey, auth2, "invalid-api-key");
    const params = {
      apiKey: auth2.config.apiKey,
      appName: auth2.name,
      authType,
      redirectUrl,
      v: SDK_VERSION,
      eventId
    };
    if (provider instanceof FederatedAuthProvider) {
      provider.setDefaultLanguage(auth2.languageCode);
      params.providerId = provider.providerId || "";
      if (!isEmpty(provider.getCustomParameters())) {
        params.customParameters = JSON.stringify(provider.getCustomParameters());
      }
      for (const [key, value] of Object.entries(additionalParams || {})) {
        params[key] = value;
      }
    }
    if (provider instanceof BaseOAuthProvider) {
      const scopes = provider.getScopes().filter((scope) => scope !== "");
      if (scopes.length > 0) {
        params.scopes = scopes.join(",");
      }
    }
    if (auth2.tenantId) {
      params.tid = auth2.tenantId;
    }
    const paramsDict = params;
    for (const key of Object.keys(paramsDict)) {
      if (paramsDict[key] === void 0) {
        delete paramsDict[key];
      }
    }
    return `${getHandlerBase(auth2)}?${querystring(paramsDict).slice(1)}`;
  }
  function getHandlerBase({ config: config2 }) {
    if (!config2.emulator) {
      return `https://${config2.authDomain}/${WIDGET_PATH}`;
    }
    return _emulatorUrl(config2, EMULATOR_WIDGET_PATH);
  }
  function getVersionForPlatform(clientPlatform) {
    switch (clientPlatform) {
      case "Node":
        return "node";
      case "ReactNative":
        return "rn";
      case "Worker":
        return "webworker";
      case "Cordova":
        return "cordova";
      default:
        return void 0;
    }
  }
  function registerAuth(clientPlatform) {
    _registerComponent(new Component("auth", (container, { options: deps }) => {
      const app2 = container.getProvider("app").getImmediate();
      const { apiKey, authDomain } = app2.options;
      return ((app3) => {
        _assert(apiKey && !apiKey.includes(":"), "invalid-api-key", { appName: app3.name });
        _assert(!(authDomain === null || authDomain === void 0 ? void 0 : authDomain.includes(":")), "argument-error", {
          appName: app3.name
        });
        const config2 = {
          apiKey,
          authDomain,
          clientPlatform,
          apiHost: "identitytoolkit.googleapis.com",
          tokenApiHost: "securetoken.googleapis.com",
          apiScheme: "https",
          sdkClientVersion: _getClientVersion(clientPlatform)
        };
        const authInstance = new AuthImpl(app3, config2);
        _initializeAuthInstance(authInstance, deps);
        return authInstance;
      })(app2);
    }, "PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((container, _instanceIdentifier, _instance) => {
      const authInternalProvider = container.getProvider("auth-internal");
      authInternalProvider.initialize();
    }));
    _registerComponent(new Component("auth-internal", (container) => {
      const auth2 = _castAuth(container.getProvider("auth").getImmediate());
      return ((auth3) => new AuthInterop(auth3))(auth2);
    }, "PRIVATE").setInstantiationMode("EXPLICIT"));
    registerVersion(name3, version3, getVersionForPlatform(clientPlatform));
    registerVersion(name3, version3, "esm2017");
  }
  function getAuth(app2 = getApp()) {
    const provider = _getProvider(app2, "auth");
    if (provider.isInitialized()) {
      return provider.getImmediate();
    }
    return initializeAuth(app2, {
      popupRedirectResolver: browserPopupRedirectResolver,
      persistence: [
        indexedDBLocalPersistence,
        browserLocalPersistence,
        browserSessionPersistence
      ]
    });
  }
  var ProviderId, ActionCodeOperation, debugErrorMap, prodErrorMap, _DEFAULT_AUTH_ERROR_FACTORY, logClient, instanceCache, Delay, FetchProvider, SERVER_ERROR_MAP, DEFAULT_API_TIMEOUT_MS, NetworkTimeout, ProactiveRefresh, UserMetadata, StsTokenManager, UserImpl, InMemoryPersistence, inMemoryPersistence, PersistenceUserManager, AuthImpl, Subscription, AuthCredential, EmailAuthCredential, IDP_REQUEST_URI$1, OAuthCredential, VERIFY_PHONE_NUMBER_FOR_EXISTING_ERROR_MAP_, PhoneAuthCredential, ActionCodeURL, EmailAuthProvider, FederatedAuthProvider, BaseOAuthProvider, OAuthProvider, FacebookAuthProvider, GoogleAuthProvider, GithubAuthProvider, IDP_REQUEST_URI, SAMLAuthCredential, SAML_PROVIDER_PREFIX, SAMLAuthProvider, TwitterAuthProvider, UserCredentialImpl, MultiFactorError, MultiFactorInfoImpl, PhoneMultiFactorInfo, GenericAdditionalUserInfo, FederatedAdditionalUserInfoWithUsername, FacebookAdditionalUserInfo, GithubAdditionalUserInfo, GoogleAdditionalUserInfo, TwitterAdditionalUserInfo, MultiFactorSessionImpl, MultiFactorResolverImpl, MultiFactorUserImpl, multiFactorUserCache, STORAGE_AVAILABLE_KEY, BrowserPersistenceClass, _POLLING_INTERVAL_MS$1, IE10_LOCAL_STORAGE_SYNC_DELAY, BrowserLocalPersistence, browserLocalPersistence, BrowserSessionPersistence, browserSessionPersistence, Receiver, Sender, DB_NAME, DB_VERSION, DB_OBJECTSTORE_NAME, DB_DATA_KEYPATH, DBPromise, _POLLING_INTERVAL_MS, _TRANSACTION_RETRY_COUNT, IndexedDBLocalPersistence, indexedDBLocalPersistence, _SOLVE_TIME_MS, _EXPIRATION_TIME_MS, _WIDGET_ID_START, MockReCaptcha, MockWidget, _JSLOAD_CALLBACK, NETWORK_TIMEOUT_DELAY, RECAPTCHA_BASE, ReCaptchaLoaderImpl, MockReCaptchaLoaderImpl, RECAPTCHA_VERIFIER_TYPE, DEFAULT_PARAMS, RecaptchaVerifier, ConfirmationResultImpl, PhoneAuthProvider, IdpCredential, AbstractPopupRedirectOperation, _POLL_WINDOW_CLOSE_TIMEOUT, PopupOperation, PENDING_REDIRECT_KEY, redirectOutcomeMap, RedirectAction, EVENT_DUPLICATION_CACHE_DURATION_MS, AuthEventManager, IP_ADDRESS_REGEX, HTTP_REGEX, NETWORK_TIMEOUT, cachedGApiLoader, PING_TIMEOUT, IFRAME_PATH, EMULATED_IFRAME_PATH, IFRAME_ATTRIBUTES, EID_FROM_APIHOST, BASE_POPUP_OPTIONS, DEFAULT_WIDTH, DEFAULT_HEIGHT, TARGET_BLANK, FIREFOX_EMPTY_URL, AuthPopup, WIDGET_PATH, EMULATOR_WIDGET_PATH, WEB_STORAGE_SUPPORT_KEY, BrowserPopupRedirectResolver, browserPopupRedirectResolver, MultiFactorAssertionImpl, PhoneMultiFactorAssertionImpl, PhoneMultiFactorGenerator, name3, version3, AuthInterop;
  var init_index_1679a2b2 = __esm({
    "node_modules/@firebase/auth/dist/esm2017/index-1679a2b2.js"() {
      init_index_esm2017();
      init_index_esm20174();
      init_modules();
      init_index_esm20173();
      init_index_esm20172();
      ProviderId = {
        FACEBOOK: "facebook.com",
        GITHUB: "github.com",
        GOOGLE: "google.com",
        PASSWORD: "password",
        PHONE: "phone",
        TWITTER: "twitter.com"
      };
      ActionCodeOperation = {
        EMAIL_SIGNIN: "EMAIL_SIGNIN",
        PASSWORD_RESET: "PASSWORD_RESET",
        RECOVER_EMAIL: "RECOVER_EMAIL",
        REVERT_SECOND_FACTOR_ADDITION: "REVERT_SECOND_FACTOR_ADDITION",
        VERIFY_AND_CHANGE_EMAIL: "VERIFY_AND_CHANGE_EMAIL",
        VERIFY_EMAIL: "VERIFY_EMAIL"
      };
      debugErrorMap = _debugErrorMap;
      prodErrorMap = _prodErrorMap;
      _DEFAULT_AUTH_ERROR_FACTORY = new ErrorFactory("auth", "Firebase", _prodErrorMap());
      logClient = new Logger("@firebase/auth");
      instanceCache = /* @__PURE__ */ new Map();
      Delay = class {
        constructor(shortDelay, longDelay) {
          this.shortDelay = shortDelay;
          this.longDelay = longDelay;
          debugAssert(longDelay > shortDelay, "Short delay should be less than long delay!");
          this.isMobile = isMobileCordova() || isReactNative();
        }
        get() {
          if (!_isOnline()) {
            return Math.min(5e3, this.shortDelay);
          }
          return this.isMobile ? this.longDelay : this.shortDelay;
        }
      };
      FetchProvider = class {
        static initialize(fetchImpl, headersImpl, responseImpl) {
          this.fetchImpl = fetchImpl;
          if (headersImpl) {
            this.headersImpl = headersImpl;
          }
          if (responseImpl) {
            this.responseImpl = responseImpl;
          }
        }
        static fetch() {
          if (this.fetchImpl) {
            return this.fetchImpl;
          }
          if (typeof self !== "undefined" && "fetch" in self) {
            return self.fetch;
          }
          debugFail("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill");
        }
        static headers() {
          if (this.headersImpl) {
            return this.headersImpl;
          }
          if (typeof self !== "undefined" && "Headers" in self) {
            return self.Headers;
          }
          debugFail("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill");
        }
        static response() {
          if (this.responseImpl) {
            return this.responseImpl;
          }
          if (typeof self !== "undefined" && "Response" in self) {
            return self.Response;
          }
          debugFail("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill");
        }
      };
      SERVER_ERROR_MAP = {
        ["CREDENTIAL_MISMATCH"]: "custom-token-mismatch",
        ["MISSING_CUSTOM_TOKEN"]: "internal-error",
        ["INVALID_IDENTIFIER"]: "invalid-email",
        ["MISSING_CONTINUE_URI"]: "internal-error",
        ["INVALID_PASSWORD"]: "wrong-password",
        ["MISSING_PASSWORD"]: "internal-error",
        ["EMAIL_EXISTS"]: "email-already-in-use",
        ["PASSWORD_LOGIN_DISABLED"]: "operation-not-allowed",
        ["INVALID_IDP_RESPONSE"]: "invalid-credential",
        ["INVALID_PENDING_TOKEN"]: "invalid-credential",
        ["FEDERATED_USER_ID_ALREADY_LINKED"]: "credential-already-in-use",
        ["MISSING_REQ_TYPE"]: "internal-error",
        ["EMAIL_NOT_FOUND"]: "user-not-found",
        ["RESET_PASSWORD_EXCEED_LIMIT"]: "too-many-requests",
        ["EXPIRED_OOB_CODE"]: "expired-action-code",
        ["INVALID_OOB_CODE"]: "invalid-action-code",
        ["MISSING_OOB_CODE"]: "internal-error",
        ["CREDENTIAL_TOO_OLD_LOGIN_AGAIN"]: "requires-recent-login",
        ["INVALID_ID_TOKEN"]: "invalid-user-token",
        ["TOKEN_EXPIRED"]: "user-token-expired",
        ["USER_NOT_FOUND"]: "user-token-expired",
        ["TOO_MANY_ATTEMPTS_TRY_LATER"]: "too-many-requests",
        ["INVALID_CODE"]: "invalid-verification-code",
        ["INVALID_SESSION_INFO"]: "invalid-verification-id",
        ["INVALID_TEMPORARY_PROOF"]: "invalid-credential",
        ["MISSING_SESSION_INFO"]: "missing-verification-id",
        ["SESSION_EXPIRED"]: "code-expired",
        ["MISSING_ANDROID_PACKAGE_NAME"]: "missing-android-pkg-name",
        ["UNAUTHORIZED_DOMAIN"]: "unauthorized-continue-uri",
        ["INVALID_OAUTH_CLIENT_ID"]: "invalid-oauth-client-id",
        ["ADMIN_ONLY_OPERATION"]: "admin-restricted-operation",
        ["INVALID_MFA_PENDING_CREDENTIAL"]: "invalid-multi-factor-session",
        ["MFA_ENROLLMENT_NOT_FOUND"]: "multi-factor-info-not-found",
        ["MISSING_MFA_ENROLLMENT_ID"]: "missing-multi-factor-info",
        ["MISSING_MFA_PENDING_CREDENTIAL"]: "missing-multi-factor-session",
        ["SECOND_FACTOR_EXISTS"]: "second-factor-already-in-use",
        ["SECOND_FACTOR_LIMIT_EXCEEDED"]: "maximum-second-factor-count-exceeded",
        ["BLOCKING_FUNCTION_ERROR_RESPONSE"]: "internal-error"
      };
      DEFAULT_API_TIMEOUT_MS = new Delay(3e4, 6e4);
      NetworkTimeout = class {
        constructor(auth2) {
          this.auth = auth2;
          this.timer = null;
          this.promise = new Promise((_, reject) => {
            this.timer = setTimeout(() => {
              return reject(_createError(this.auth, "timeout"));
            }, DEFAULT_API_TIMEOUT_MS.get());
          });
        }
        clearNetworkTimeout() {
          clearTimeout(this.timer);
        }
      };
      ProactiveRefresh = class {
        constructor(user) {
          this.user = user;
          this.isRunning = false;
          this.timerId = null;
          this.errorBackoff = 3e4;
        }
        _start() {
          if (this.isRunning) {
            return;
          }
          this.isRunning = true;
          this.schedule();
        }
        _stop() {
          if (!this.isRunning) {
            return;
          }
          this.isRunning = false;
          if (this.timerId !== null) {
            clearTimeout(this.timerId);
          }
        }
        getInterval(wasError) {
          var _a;
          if (wasError) {
            const interval = this.errorBackoff;
            this.errorBackoff = Math.min(this.errorBackoff * 2, 96e4);
            return interval;
          } else {
            this.errorBackoff = 3e4;
            const expTime = (_a = this.user.stsTokenManager.expirationTime) !== null && _a !== void 0 ? _a : 0;
            const interval = expTime - Date.now() - 3e5;
            return Math.max(0, interval);
          }
        }
        schedule(wasError = false) {
          if (!this.isRunning) {
            return;
          }
          const interval = this.getInterval(wasError);
          this.timerId = setTimeout(async () => {
            await this.iteration();
          }, interval);
        }
        async iteration() {
          try {
            await this.user.getIdToken(true);
          } catch (e) {
            if (e.code === `auth/${"network-request-failed"}`) {
              this.schedule(true);
            }
            return;
          }
          this.schedule();
        }
      };
      UserMetadata = class {
        constructor(createdAt, lastLoginAt) {
          this.createdAt = createdAt;
          this.lastLoginAt = lastLoginAt;
          this._initializeTime();
        }
        _initializeTime() {
          this.lastSignInTime = utcTimestampToDateString(this.lastLoginAt);
          this.creationTime = utcTimestampToDateString(this.createdAt);
        }
        _copy(metadata) {
          this.createdAt = metadata.createdAt;
          this.lastLoginAt = metadata.lastLoginAt;
          this._initializeTime();
        }
        toJSON() {
          return {
            createdAt: this.createdAt,
            lastLoginAt: this.lastLoginAt
          };
        }
      };
      StsTokenManager = class {
        constructor() {
          this.refreshToken = null;
          this.accessToken = null;
          this.expirationTime = null;
        }
        get isExpired() {
          return !this.expirationTime || Date.now() > this.expirationTime - 3e4;
        }
        updateFromServerResponse(response) {
          _assert(response.idToken, "internal-error");
          _assert(typeof response.idToken !== "undefined", "internal-error");
          _assert(typeof response.refreshToken !== "undefined", "internal-error");
          const expiresIn = "expiresIn" in response && typeof response.expiresIn !== "undefined" ? Number(response.expiresIn) : _tokenExpiresIn(response.idToken);
          this.updateTokensAndExpiration(response.idToken, response.refreshToken, expiresIn);
        }
        async getToken(auth2, forceRefresh = false) {
          _assert(!this.accessToken || this.refreshToken, auth2, "user-token-expired");
          if (!forceRefresh && this.accessToken && !this.isExpired) {
            return this.accessToken;
          }
          if (this.refreshToken) {
            await this.refresh(auth2, this.refreshToken);
            return this.accessToken;
          }
          return null;
        }
        clearRefreshToken() {
          this.refreshToken = null;
        }
        async refresh(auth2, oldToken) {
          const { accessToken, refreshToken, expiresIn } = await requestStsToken(auth2, oldToken);
          this.updateTokensAndExpiration(accessToken, refreshToken, Number(expiresIn));
        }
        updateTokensAndExpiration(accessToken, refreshToken, expiresInSec) {
          this.refreshToken = refreshToken || null;
          this.accessToken = accessToken || null;
          this.expirationTime = Date.now() + expiresInSec * 1e3;
        }
        static fromJSON(appName, object) {
          const { refreshToken, accessToken, expirationTime } = object;
          const manager = new StsTokenManager();
          if (refreshToken) {
            _assert(typeof refreshToken === "string", "internal-error", {
              appName
            });
            manager.refreshToken = refreshToken;
          }
          if (accessToken) {
            _assert(typeof accessToken === "string", "internal-error", {
              appName
            });
            manager.accessToken = accessToken;
          }
          if (expirationTime) {
            _assert(typeof expirationTime === "number", "internal-error", {
              appName
            });
            manager.expirationTime = expirationTime;
          }
          return manager;
        }
        toJSON() {
          return {
            refreshToken: this.refreshToken,
            accessToken: this.accessToken,
            expirationTime: this.expirationTime
          };
        }
        _assign(stsTokenManager) {
          this.accessToken = stsTokenManager.accessToken;
          this.refreshToken = stsTokenManager.refreshToken;
          this.expirationTime = stsTokenManager.expirationTime;
        }
        _clone() {
          return Object.assign(new StsTokenManager(), this.toJSON());
        }
        _performRefresh() {
          return debugFail("not implemented");
        }
      };
      UserImpl = class {
        constructor(_a) {
          var { uid, auth: auth2, stsTokenManager } = _a, opt = __rest(_a, ["uid", "auth", "stsTokenManager"]);
          this.providerId = "firebase";
          this.emailVerified = false;
          this.isAnonymous = false;
          this.tenantId = null;
          this.providerData = [];
          this.proactiveRefresh = new ProactiveRefresh(this);
          this.reloadUserInfo = null;
          this.reloadListener = null;
          this.uid = uid;
          this.auth = auth2;
          this.stsTokenManager = stsTokenManager;
          this.accessToken = stsTokenManager.accessToken;
          this.displayName = opt.displayName || null;
          this.email = opt.email || null;
          this.emailVerified = opt.emailVerified || false;
          this.phoneNumber = opt.phoneNumber || null;
          this.photoURL = opt.photoURL || null;
          this.isAnonymous = opt.isAnonymous || false;
          this.tenantId = opt.tenantId || null;
          this.metadata = new UserMetadata(opt.createdAt || void 0, opt.lastLoginAt || void 0);
        }
        async getIdToken(forceRefresh) {
          const accessToken = await _logoutIfInvalidated(this, this.stsTokenManager.getToken(this.auth, forceRefresh));
          _assert(accessToken, this.auth, "internal-error");
          if (this.accessToken !== accessToken) {
            this.accessToken = accessToken;
            await this.auth._persistUserIfCurrent(this);
            this.auth._notifyListenersIfCurrent(this);
          }
          return accessToken;
        }
        getIdTokenResult(forceRefresh) {
          return getIdTokenResult(this, forceRefresh);
        }
        reload() {
          return reload(this);
        }
        _assign(user) {
          if (this === user) {
            return;
          }
          _assert(this.uid === user.uid, this.auth, "internal-error");
          this.displayName = user.displayName;
          this.photoURL = user.photoURL;
          this.email = user.email;
          this.emailVerified = user.emailVerified;
          this.phoneNumber = user.phoneNumber;
          this.isAnonymous = user.isAnonymous;
          this.tenantId = user.tenantId;
          this.providerData = user.providerData.map((userInfo) => Object.assign({}, userInfo));
          this.metadata._copy(user.metadata);
          this.stsTokenManager._assign(user.stsTokenManager);
        }
        _clone(auth2) {
          return new UserImpl(Object.assign(Object.assign({}, this), { auth: auth2, stsTokenManager: this.stsTokenManager._clone() }));
        }
        _onReload(callback) {
          _assert(!this.reloadListener, this.auth, "internal-error");
          this.reloadListener = callback;
          if (this.reloadUserInfo) {
            this._notifyReloadListener(this.reloadUserInfo);
            this.reloadUserInfo = null;
          }
        }
        _notifyReloadListener(userInfo) {
          if (this.reloadListener) {
            this.reloadListener(userInfo);
          } else {
            this.reloadUserInfo = userInfo;
          }
        }
        _startProactiveRefresh() {
          this.proactiveRefresh._start();
        }
        _stopProactiveRefresh() {
          this.proactiveRefresh._stop();
        }
        async _updateTokensIfNecessary(response, reload2 = false) {
          let tokensRefreshed = false;
          if (response.idToken && response.idToken !== this.stsTokenManager.accessToken) {
            this.stsTokenManager.updateFromServerResponse(response);
            tokensRefreshed = true;
          }
          if (reload2) {
            await _reloadWithoutSaving(this);
          }
          await this.auth._persistUserIfCurrent(this);
          if (tokensRefreshed) {
            this.auth._notifyListenersIfCurrent(this);
          }
        }
        async delete() {
          const idToken = await this.getIdToken();
          await _logoutIfInvalidated(this, deleteAccount(this.auth, { idToken }));
          this.stsTokenManager.clearRefreshToken();
          return this.auth.signOut();
        }
        toJSON() {
          return Object.assign(Object.assign({
            uid: this.uid,
            email: this.email || void 0,
            emailVerified: this.emailVerified,
            displayName: this.displayName || void 0,
            isAnonymous: this.isAnonymous,
            photoURL: this.photoURL || void 0,
            phoneNumber: this.phoneNumber || void 0,
            tenantId: this.tenantId || void 0,
            providerData: this.providerData.map((userInfo) => Object.assign({}, userInfo)),
            stsTokenManager: this.stsTokenManager.toJSON(),
            _redirectEventId: this._redirectEventId
          }, this.metadata.toJSON()), {
            apiKey: this.auth.config.apiKey,
            appName: this.auth.name
          });
        }
        get refreshToken() {
          return this.stsTokenManager.refreshToken || "";
        }
        static _fromJSON(auth2, object) {
          var _a, _b, _c, _d, _e, _f, _g, _h;
          const displayName = (_a = object.displayName) !== null && _a !== void 0 ? _a : void 0;
          const email = (_b = object.email) !== null && _b !== void 0 ? _b : void 0;
          const phoneNumber = (_c = object.phoneNumber) !== null && _c !== void 0 ? _c : void 0;
          const photoURL = (_d = object.photoURL) !== null && _d !== void 0 ? _d : void 0;
          const tenantId = (_e = object.tenantId) !== null && _e !== void 0 ? _e : void 0;
          const _redirectEventId = (_f = object._redirectEventId) !== null && _f !== void 0 ? _f : void 0;
          const createdAt = (_g = object.createdAt) !== null && _g !== void 0 ? _g : void 0;
          const lastLoginAt = (_h = object.lastLoginAt) !== null && _h !== void 0 ? _h : void 0;
          const { uid, emailVerified, isAnonymous, providerData, stsTokenManager: plainObjectTokenManager } = object;
          _assert(uid && plainObjectTokenManager, auth2, "internal-error");
          const stsTokenManager = StsTokenManager.fromJSON(this.name, plainObjectTokenManager);
          _assert(typeof uid === "string", auth2, "internal-error");
          assertStringOrUndefined(displayName, auth2.name);
          assertStringOrUndefined(email, auth2.name);
          _assert(typeof emailVerified === "boolean", auth2, "internal-error");
          _assert(typeof isAnonymous === "boolean", auth2, "internal-error");
          assertStringOrUndefined(phoneNumber, auth2.name);
          assertStringOrUndefined(photoURL, auth2.name);
          assertStringOrUndefined(tenantId, auth2.name);
          assertStringOrUndefined(_redirectEventId, auth2.name);
          assertStringOrUndefined(createdAt, auth2.name);
          assertStringOrUndefined(lastLoginAt, auth2.name);
          const user = new UserImpl({
            uid,
            auth: auth2,
            email,
            emailVerified,
            displayName,
            isAnonymous,
            photoURL,
            phoneNumber,
            tenantId,
            stsTokenManager,
            createdAt,
            lastLoginAt
          });
          if (providerData && Array.isArray(providerData)) {
            user.providerData = providerData.map((userInfo) => Object.assign({}, userInfo));
          }
          if (_redirectEventId) {
            user._redirectEventId = _redirectEventId;
          }
          return user;
        }
        static async _fromIdTokenResponse(auth2, idTokenResponse, isAnonymous = false) {
          const stsTokenManager = new StsTokenManager();
          stsTokenManager.updateFromServerResponse(idTokenResponse);
          const user = new UserImpl({
            uid: idTokenResponse.localId,
            auth: auth2,
            stsTokenManager,
            isAnonymous
          });
          await _reloadWithoutSaving(user);
          return user;
        }
      };
      InMemoryPersistence = class {
        constructor() {
          this.type = "NONE";
          this.storage = {};
        }
        async _isAvailable() {
          return true;
        }
        async _set(key, value) {
          this.storage[key] = value;
        }
        async _get(key) {
          const value = this.storage[key];
          return value === void 0 ? null : value;
        }
        async _remove(key) {
          delete this.storage[key];
        }
        _addListener(_key, _listener) {
          return;
        }
        _removeListener(_key, _listener) {
          return;
        }
      };
      InMemoryPersistence.type = "NONE";
      inMemoryPersistence = InMemoryPersistence;
      PersistenceUserManager = class {
        constructor(persistence, auth2, userKey) {
          this.persistence = persistence;
          this.auth = auth2;
          this.userKey = userKey;
          const { config: config2, name: name7 } = this.auth;
          this.fullUserKey = _persistenceKeyName(this.userKey, config2.apiKey, name7);
          this.fullPersistenceKey = _persistenceKeyName("persistence", config2.apiKey, name7);
          this.boundEventHandler = auth2._onStorageEvent.bind(auth2);
          this.persistence._addListener(this.fullUserKey, this.boundEventHandler);
        }
        setCurrentUser(user) {
          return this.persistence._set(this.fullUserKey, user.toJSON());
        }
        async getCurrentUser() {
          const blob = await this.persistence._get(this.fullUserKey);
          return blob ? UserImpl._fromJSON(this.auth, blob) : null;
        }
        removeCurrentUser() {
          return this.persistence._remove(this.fullUserKey);
        }
        savePersistenceForRedirect() {
          return this.persistence._set(this.fullPersistenceKey, this.persistence.type);
        }
        async setPersistence(newPersistence) {
          if (this.persistence === newPersistence) {
            return;
          }
          const currentUser = await this.getCurrentUser();
          await this.removeCurrentUser();
          this.persistence = newPersistence;
          if (currentUser) {
            return this.setCurrentUser(currentUser);
          }
        }
        delete() {
          this.persistence._removeListener(this.fullUserKey, this.boundEventHandler);
        }
        static async create(auth2, persistenceHierarchy, userKey = "authUser") {
          if (!persistenceHierarchy.length) {
            return new PersistenceUserManager(_getInstance(inMemoryPersistence), auth2, userKey);
          }
          const availablePersistences = (await Promise.all(persistenceHierarchy.map(async (persistence) => {
            if (await persistence._isAvailable()) {
              return persistence;
            }
            return void 0;
          }))).filter((persistence) => persistence);
          let selectedPersistence = availablePersistences[0] || _getInstance(inMemoryPersistence);
          const key = _persistenceKeyName(userKey, auth2.config.apiKey, auth2.name);
          let userToMigrate = null;
          for (const persistence of persistenceHierarchy) {
            try {
              const blob = await persistence._get(key);
              if (blob) {
                const user = UserImpl._fromJSON(auth2, blob);
                if (persistence !== selectedPersistence) {
                  userToMigrate = user;
                }
                selectedPersistence = persistence;
                break;
              }
            } catch (_a) {
            }
          }
          const migrationHierarchy = availablePersistences.filter((p) => p._shouldAllowMigration);
          if (!selectedPersistence._shouldAllowMigration || !migrationHierarchy.length) {
            return new PersistenceUserManager(selectedPersistence, auth2, userKey);
          }
          selectedPersistence = migrationHierarchy[0];
          if (userToMigrate) {
            await selectedPersistence._set(key, userToMigrate.toJSON());
          }
          await Promise.all(persistenceHierarchy.map(async (persistence) => {
            if (persistence !== selectedPersistence) {
              try {
                await persistence._remove(key);
              } catch (_a) {
              }
            }
          }));
          return new PersistenceUserManager(selectedPersistence, auth2, userKey);
        }
      };
      AuthImpl = class {
        constructor(app2, config2) {
          this.app = app2;
          this.config = config2;
          this.currentUser = null;
          this.emulatorConfig = null;
          this.operations = Promise.resolve();
          this.authStateSubscription = new Subscription(this);
          this.idTokenSubscription = new Subscription(this);
          this.redirectUser = null;
          this.isProactiveRefreshEnabled = false;
          this._canInitEmulator = true;
          this._isInitialized = false;
          this._deleted = false;
          this._initializationPromise = null;
          this._popupRedirectResolver = null;
          this._errorFactory = _DEFAULT_AUTH_ERROR_FACTORY;
          this.lastNotifiedUid = void 0;
          this.languageCode = null;
          this.tenantId = null;
          this.settings = { appVerificationDisabledForTesting: false };
          this.frameworks = [];
          this.name = app2.name;
          this.clientVersion = config2.sdkClientVersion;
        }
        _initializeWithPersistence(persistenceHierarchy, popupRedirectResolver) {
          if (popupRedirectResolver) {
            this._popupRedirectResolver = _getInstance(popupRedirectResolver);
          }
          this._initializationPromise = this.queue(async () => {
            var _a, _b;
            if (this._deleted) {
              return;
            }
            this.persistenceManager = await PersistenceUserManager.create(this, persistenceHierarchy);
            if (this._deleted) {
              return;
            }
            if ((_a = this._popupRedirectResolver) === null || _a === void 0 ? void 0 : _a._shouldInitProactively) {
              try {
                await this._popupRedirectResolver._initialize(this);
              } catch (e) {
              }
            }
            await this.initializeCurrentUser(popupRedirectResolver);
            this.lastNotifiedUid = ((_b = this.currentUser) === null || _b === void 0 ? void 0 : _b.uid) || null;
            if (this._deleted) {
              return;
            }
            this._isInitialized = true;
          });
          return this._initializationPromise;
        }
        async _onStorageEvent() {
          if (this._deleted) {
            return;
          }
          const user = await this.assertedPersistence.getCurrentUser();
          if (!this.currentUser && !user) {
            return;
          }
          if (this.currentUser && user && this.currentUser.uid === user.uid) {
            this._currentUser._assign(user);
            await this.currentUser.getIdToken();
            return;
          }
          await this._updateCurrentUser(user);
        }
        async initializeCurrentUser(popupRedirectResolver) {
          var _a;
          let storedUser = await this.assertedPersistence.getCurrentUser();
          if (popupRedirectResolver && this.config.authDomain) {
            await this.getOrInitRedirectPersistenceManager();
            const redirectUserEventId = (_a = this.redirectUser) === null || _a === void 0 ? void 0 : _a._redirectEventId;
            const storedUserEventId = storedUser === null || storedUser === void 0 ? void 0 : storedUser._redirectEventId;
            const result = await this.tryRedirectSignIn(popupRedirectResolver);
            if ((!redirectUserEventId || redirectUserEventId === storedUserEventId) && (result === null || result === void 0 ? void 0 : result.user)) {
              storedUser = result.user;
            }
          }
          if (!storedUser) {
            return this.directlySetCurrentUser(null);
          }
          if (!storedUser._redirectEventId) {
            return this.reloadAndSetCurrentUserOrClear(storedUser);
          }
          _assert(this._popupRedirectResolver, this, "argument-error");
          await this.getOrInitRedirectPersistenceManager();
          if (this.redirectUser && this.redirectUser._redirectEventId === storedUser._redirectEventId) {
            return this.directlySetCurrentUser(storedUser);
          }
          return this.reloadAndSetCurrentUserOrClear(storedUser);
        }
        async tryRedirectSignIn(redirectResolver) {
          let result = null;
          try {
            result = await this._popupRedirectResolver._completeRedirectFn(this, redirectResolver, true);
          } catch (e) {
            await this._setRedirectUser(null);
          }
          return result;
        }
        async reloadAndSetCurrentUserOrClear(user) {
          try {
            await _reloadWithoutSaving(user);
          } catch (e) {
            if (e.code !== `auth/${"network-request-failed"}`) {
              return this.directlySetCurrentUser(null);
            }
          }
          return this.directlySetCurrentUser(user);
        }
        useDeviceLanguage() {
          this.languageCode = _getUserLanguage();
        }
        async _delete() {
          this._deleted = true;
        }
        async updateCurrentUser(userExtern) {
          const user = userExtern ? getModularInstance(userExtern) : null;
          if (user) {
            _assert(user.auth.config.apiKey === this.config.apiKey, this, "invalid-user-token");
          }
          return this._updateCurrentUser(user && user._clone(this));
        }
        async _updateCurrentUser(user) {
          if (this._deleted) {
            return;
          }
          if (user) {
            _assert(this.tenantId === user.tenantId, this, "tenant-id-mismatch");
          }
          return this.queue(async () => {
            await this.directlySetCurrentUser(user);
            this.notifyAuthListeners();
          });
        }
        async signOut() {
          if (this.redirectPersistenceManager || this._popupRedirectResolver) {
            await this._setRedirectUser(null);
          }
          return this._updateCurrentUser(null);
        }
        setPersistence(persistence) {
          return this.queue(async () => {
            await this.assertedPersistence.setPersistence(_getInstance(persistence));
          });
        }
        _getPersistence() {
          return this.assertedPersistence.persistence.type;
        }
        _updateErrorMap(errorMap) {
          this._errorFactory = new ErrorFactory("auth", "Firebase", errorMap());
        }
        onAuthStateChanged(nextOrObserver, error, completed) {
          return this.registerStateListener(this.authStateSubscription, nextOrObserver, error, completed);
        }
        onIdTokenChanged(nextOrObserver, error, completed) {
          return this.registerStateListener(this.idTokenSubscription, nextOrObserver, error, completed);
        }
        toJSON() {
          var _a;
          return {
            apiKey: this.config.apiKey,
            authDomain: this.config.authDomain,
            appName: this.name,
            currentUser: (_a = this._currentUser) === null || _a === void 0 ? void 0 : _a.toJSON()
          };
        }
        async _setRedirectUser(user, popupRedirectResolver) {
          const redirectManager = await this.getOrInitRedirectPersistenceManager(popupRedirectResolver);
          return user === null ? redirectManager.removeCurrentUser() : redirectManager.setCurrentUser(user);
        }
        async getOrInitRedirectPersistenceManager(popupRedirectResolver) {
          if (!this.redirectPersistenceManager) {
            const resolver = popupRedirectResolver && _getInstance(popupRedirectResolver) || this._popupRedirectResolver;
            _assert(resolver, this, "argument-error");
            this.redirectPersistenceManager = await PersistenceUserManager.create(this, [_getInstance(resolver._redirectPersistence)], "redirectUser");
            this.redirectUser = await this.redirectPersistenceManager.getCurrentUser();
          }
          return this.redirectPersistenceManager;
        }
        async _redirectUserForId(id) {
          var _a, _b;
          if (this._isInitialized) {
            await this.queue(async () => {
            });
          }
          if (((_a = this._currentUser) === null || _a === void 0 ? void 0 : _a._redirectEventId) === id) {
            return this._currentUser;
          }
          if (((_b = this.redirectUser) === null || _b === void 0 ? void 0 : _b._redirectEventId) === id) {
            return this.redirectUser;
          }
          return null;
        }
        async _persistUserIfCurrent(user) {
          if (user === this.currentUser) {
            return this.queue(async () => this.directlySetCurrentUser(user));
          }
        }
        _notifyListenersIfCurrent(user) {
          if (user === this.currentUser) {
            this.notifyAuthListeners();
          }
        }
        _key() {
          return `${this.config.authDomain}:${this.config.apiKey}:${this.name}`;
        }
        _startProactiveRefresh() {
          this.isProactiveRefreshEnabled = true;
          if (this.currentUser) {
            this._currentUser._startProactiveRefresh();
          }
        }
        _stopProactiveRefresh() {
          this.isProactiveRefreshEnabled = false;
          if (this.currentUser) {
            this._currentUser._stopProactiveRefresh();
          }
        }
        get _currentUser() {
          return this.currentUser;
        }
        notifyAuthListeners() {
          var _a, _b;
          if (!this._isInitialized) {
            return;
          }
          this.idTokenSubscription.next(this.currentUser);
          const currentUid = (_b = (_a = this.currentUser) === null || _a === void 0 ? void 0 : _a.uid) !== null && _b !== void 0 ? _b : null;
          if (this.lastNotifiedUid !== currentUid) {
            this.lastNotifiedUid = currentUid;
            this.authStateSubscription.next(this.currentUser);
          }
        }
        registerStateListener(subscription, nextOrObserver, error, completed) {
          if (this._deleted) {
            return () => {
            };
          }
          const cb = typeof nextOrObserver === "function" ? nextOrObserver : nextOrObserver.next.bind(nextOrObserver);
          const promise = this._isInitialized ? Promise.resolve() : this._initializationPromise;
          _assert(promise, this, "internal-error");
          promise.then(() => cb(this.currentUser));
          if (typeof nextOrObserver === "function") {
            return subscription.addObserver(nextOrObserver, error, completed);
          } else {
            return subscription.addObserver(nextOrObserver);
          }
        }
        async directlySetCurrentUser(user) {
          if (this.currentUser && this.currentUser !== user) {
            this._currentUser._stopProactiveRefresh();
            if (user && this.isProactiveRefreshEnabled) {
              user._startProactiveRefresh();
            }
          }
          this.currentUser = user;
          if (user) {
            await this.assertedPersistence.setCurrentUser(user);
          } else {
            await this.assertedPersistence.removeCurrentUser();
          }
        }
        queue(action) {
          this.operations = this.operations.then(action, action);
          return this.operations;
        }
        get assertedPersistence() {
          _assert(this.persistenceManager, this, "internal-error");
          return this.persistenceManager;
        }
        _logFramework(framework) {
          if (!framework || this.frameworks.includes(framework)) {
            return;
          }
          this.frameworks.push(framework);
          this.frameworks.sort();
          this.clientVersion = _getClientVersion(this.config.clientPlatform, this._getFrameworks());
        }
        _getFrameworks() {
          return this.frameworks;
        }
        async _getAdditionalHeaders() {
          const headers = {
            ["X-Client-Version"]: this.clientVersion
          };
          if (this.app.options.appId) {
            headers["X-Firebase-gmpid"] = this.app.options.appId;
          }
          return headers;
        }
      };
      Subscription = class {
        constructor(auth2) {
          this.auth = auth2;
          this.observer = null;
          this.addObserver = createSubscribe((observer) => this.observer = observer);
        }
        get next() {
          _assert(this.observer, this.auth, "internal-error");
          return this.observer.next.bind(this.observer);
        }
      };
      AuthCredential = class {
        constructor(providerId, signInMethod) {
          this.providerId = providerId;
          this.signInMethod = signInMethod;
        }
        toJSON() {
          return debugFail("not implemented");
        }
        _getIdTokenResponse(_auth) {
          return debugFail("not implemented");
        }
        _linkToIdToken(_auth, _idToken) {
          return debugFail("not implemented");
        }
        _getReauthenticationResolver(_auth) {
          return debugFail("not implemented");
        }
      };
      EmailAuthCredential = class extends AuthCredential {
        constructor(_email, _password, signInMethod, _tenantId = null) {
          super("password", signInMethod);
          this._email = _email;
          this._password = _password;
          this._tenantId = _tenantId;
        }
        static _fromEmailAndPassword(email, password) {
          return new EmailAuthCredential(email, password, "password");
        }
        static _fromEmailAndCode(email, oobCode, tenantId = null) {
          return new EmailAuthCredential(email, oobCode, "emailLink", tenantId);
        }
        toJSON() {
          return {
            email: this._email,
            password: this._password,
            signInMethod: this.signInMethod,
            tenantId: this._tenantId
          };
        }
        static fromJSON(json) {
          const obj = typeof json === "string" ? JSON.parse(json) : json;
          if ((obj === null || obj === void 0 ? void 0 : obj.email) && (obj === null || obj === void 0 ? void 0 : obj.password)) {
            if (obj.signInMethod === "password") {
              return this._fromEmailAndPassword(obj.email, obj.password);
            } else if (obj.signInMethod === "emailLink") {
              return this._fromEmailAndCode(obj.email, obj.password, obj.tenantId);
            }
          }
          return null;
        }
        async _getIdTokenResponse(auth2) {
          switch (this.signInMethod) {
            case "password":
              return signInWithPassword(auth2, {
                returnSecureToken: true,
                email: this._email,
                password: this._password
              });
            case "emailLink":
              return signInWithEmailLink$1(auth2, {
                email: this._email,
                oobCode: this._password
              });
            default:
              _fail(auth2, "internal-error");
          }
        }
        async _linkToIdToken(auth2, idToken) {
          switch (this.signInMethod) {
            case "password":
              return updateEmailPassword(auth2, {
                idToken,
                returnSecureToken: true,
                email: this._email,
                password: this._password
              });
            case "emailLink":
              return signInWithEmailLinkForLinking(auth2, {
                idToken,
                email: this._email,
                oobCode: this._password
              });
            default:
              _fail(auth2, "internal-error");
          }
        }
        _getReauthenticationResolver(auth2) {
          return this._getIdTokenResponse(auth2);
        }
      };
      IDP_REQUEST_URI$1 = "http://localhost";
      OAuthCredential = class extends AuthCredential {
        constructor() {
          super(...arguments);
          this.pendingToken = null;
        }
        static _fromParams(params) {
          const cred = new OAuthCredential(params.providerId, params.signInMethod);
          if (params.idToken || params.accessToken) {
            if (params.idToken) {
              cred.idToken = params.idToken;
            }
            if (params.accessToken) {
              cred.accessToken = params.accessToken;
            }
            if (params.nonce && !params.pendingToken) {
              cred.nonce = params.nonce;
            }
            if (params.pendingToken) {
              cred.pendingToken = params.pendingToken;
            }
          } else if (params.oauthToken && params.oauthTokenSecret) {
            cred.accessToken = params.oauthToken;
            cred.secret = params.oauthTokenSecret;
          } else {
            _fail("argument-error");
          }
          return cred;
        }
        toJSON() {
          return {
            idToken: this.idToken,
            accessToken: this.accessToken,
            secret: this.secret,
            nonce: this.nonce,
            pendingToken: this.pendingToken,
            providerId: this.providerId,
            signInMethod: this.signInMethod
          };
        }
        static fromJSON(json) {
          const obj = typeof json === "string" ? JSON.parse(json) : json;
          const { providerId, signInMethod } = obj, rest = __rest(obj, ["providerId", "signInMethod"]);
          if (!providerId || !signInMethod) {
            return null;
          }
          const cred = new OAuthCredential(providerId, signInMethod);
          cred.idToken = rest.idToken || void 0;
          cred.accessToken = rest.accessToken || void 0;
          cred.secret = rest.secret;
          cred.nonce = rest.nonce;
          cred.pendingToken = rest.pendingToken || null;
          return cred;
        }
        _getIdTokenResponse(auth2) {
          const request = this.buildRequest();
          return signInWithIdp(auth2, request);
        }
        _linkToIdToken(auth2, idToken) {
          const request = this.buildRequest();
          request.idToken = idToken;
          return signInWithIdp(auth2, request);
        }
        _getReauthenticationResolver(auth2) {
          const request = this.buildRequest();
          request.autoCreate = false;
          return signInWithIdp(auth2, request);
        }
        buildRequest() {
          const request = {
            requestUri: IDP_REQUEST_URI$1,
            returnSecureToken: true
          };
          if (this.pendingToken) {
            request.pendingToken = this.pendingToken;
          } else {
            const postBody = {};
            if (this.idToken) {
              postBody["id_token"] = this.idToken;
            }
            if (this.accessToken) {
              postBody["access_token"] = this.accessToken;
            }
            if (this.secret) {
              postBody["oauth_token_secret"] = this.secret;
            }
            postBody["providerId"] = this.providerId;
            if (this.nonce && !this.pendingToken) {
              postBody["nonce"] = this.nonce;
            }
            request.postBody = querystring(postBody);
          }
          return request;
        }
      };
      VERIFY_PHONE_NUMBER_FOR_EXISTING_ERROR_MAP_ = {
        ["USER_NOT_FOUND"]: "user-not-found"
      };
      PhoneAuthCredential = class extends AuthCredential {
        constructor(params) {
          super("phone", "phone");
          this.params = params;
        }
        static _fromVerification(verificationId, verificationCode) {
          return new PhoneAuthCredential({ verificationId, verificationCode });
        }
        static _fromTokenResponse(phoneNumber, temporaryProof) {
          return new PhoneAuthCredential({ phoneNumber, temporaryProof });
        }
        _getIdTokenResponse(auth2) {
          return signInWithPhoneNumber$1(auth2, this._makeVerificationRequest());
        }
        _linkToIdToken(auth2, idToken) {
          return linkWithPhoneNumber$1(auth2, Object.assign({ idToken }, this._makeVerificationRequest()));
        }
        _getReauthenticationResolver(auth2) {
          return verifyPhoneNumberForExisting(auth2, this._makeVerificationRequest());
        }
        _makeVerificationRequest() {
          const { temporaryProof, phoneNumber, verificationId, verificationCode } = this.params;
          if (temporaryProof && phoneNumber) {
            return { temporaryProof, phoneNumber };
          }
          return {
            sessionInfo: verificationId,
            code: verificationCode
          };
        }
        toJSON() {
          const obj = {
            providerId: this.providerId
          };
          if (this.params.phoneNumber) {
            obj.phoneNumber = this.params.phoneNumber;
          }
          if (this.params.temporaryProof) {
            obj.temporaryProof = this.params.temporaryProof;
          }
          if (this.params.verificationCode) {
            obj.verificationCode = this.params.verificationCode;
          }
          if (this.params.verificationId) {
            obj.verificationId = this.params.verificationId;
          }
          return obj;
        }
        static fromJSON(json) {
          if (typeof json === "string") {
            json = JSON.parse(json);
          }
          const { verificationId, verificationCode, phoneNumber, temporaryProof } = json;
          if (!verificationCode && !verificationId && !phoneNumber && !temporaryProof) {
            return null;
          }
          return new PhoneAuthCredential({
            verificationId,
            verificationCode,
            phoneNumber,
            temporaryProof
          });
        }
      };
      ActionCodeURL = class {
        constructor(actionLink) {
          var _a, _b, _c, _d, _e, _f;
          const searchParams = querystringDecode(extractQuerystring(actionLink));
          const apiKey = (_a = searchParams["apiKey"]) !== null && _a !== void 0 ? _a : null;
          const code = (_b = searchParams["oobCode"]) !== null && _b !== void 0 ? _b : null;
          const operation = parseMode((_c = searchParams["mode"]) !== null && _c !== void 0 ? _c : null);
          _assert(apiKey && code && operation, "argument-error");
          this.apiKey = apiKey;
          this.operation = operation;
          this.code = code;
          this.continueUrl = (_d = searchParams["continueUrl"]) !== null && _d !== void 0 ? _d : null;
          this.languageCode = (_e = searchParams["languageCode"]) !== null && _e !== void 0 ? _e : null;
          this.tenantId = (_f = searchParams["tenantId"]) !== null && _f !== void 0 ? _f : null;
        }
        static parseLink(link) {
          const actionLink = parseDeepLink(link);
          try {
            return new ActionCodeURL(actionLink);
          } catch (_a) {
            return null;
          }
        }
      };
      EmailAuthProvider = class {
        constructor() {
          this.providerId = EmailAuthProvider.PROVIDER_ID;
        }
        static credential(email, password) {
          return EmailAuthCredential._fromEmailAndPassword(email, password);
        }
        static credentialWithLink(email, emailLink) {
          const actionCodeUrl = ActionCodeURL.parseLink(emailLink);
          _assert(actionCodeUrl, "argument-error");
          return EmailAuthCredential._fromEmailAndCode(email, actionCodeUrl.code, actionCodeUrl.tenantId);
        }
      };
      EmailAuthProvider.PROVIDER_ID = "password";
      EmailAuthProvider.EMAIL_PASSWORD_SIGN_IN_METHOD = "password";
      EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD = "emailLink";
      FederatedAuthProvider = class {
        constructor(providerId) {
          this.providerId = providerId;
          this.defaultLanguageCode = null;
          this.customParameters = {};
        }
        setDefaultLanguage(languageCode) {
          this.defaultLanguageCode = languageCode;
        }
        setCustomParameters(customOAuthParameters) {
          this.customParameters = customOAuthParameters;
          return this;
        }
        getCustomParameters() {
          return this.customParameters;
        }
      };
      BaseOAuthProvider = class extends FederatedAuthProvider {
        constructor() {
          super(...arguments);
          this.scopes = [];
        }
        addScope(scope) {
          if (!this.scopes.includes(scope)) {
            this.scopes.push(scope);
          }
          return this;
        }
        getScopes() {
          return [...this.scopes];
        }
      };
      OAuthProvider = class extends BaseOAuthProvider {
        static credentialFromJSON(json) {
          const obj = typeof json === "string" ? JSON.parse(json) : json;
          _assert("providerId" in obj && "signInMethod" in obj, "argument-error");
          return OAuthCredential._fromParams(obj);
        }
        credential(params) {
          return this._credential(Object.assign(Object.assign({}, params), { nonce: params.rawNonce }));
        }
        _credential(params) {
          _assert(params.idToken || params.accessToken, "argument-error");
          return OAuthCredential._fromParams(Object.assign(Object.assign({}, params), { providerId: this.providerId, signInMethod: this.providerId }));
        }
        static credentialFromResult(userCredential) {
          return OAuthProvider.oauthCredentialFromTaggedObject(userCredential);
        }
        static credentialFromError(error) {
          return OAuthProvider.oauthCredentialFromTaggedObject(error.customData || {});
        }
        static oauthCredentialFromTaggedObject({ _tokenResponse: tokenResponse }) {
          if (!tokenResponse) {
            return null;
          }
          const { oauthIdToken, oauthAccessToken, oauthTokenSecret, pendingToken, nonce, providerId } = tokenResponse;
          if (!oauthAccessToken && !oauthTokenSecret && !oauthIdToken && !pendingToken) {
            return null;
          }
          if (!providerId) {
            return null;
          }
          try {
            return new OAuthProvider(providerId)._credential({
              idToken: oauthIdToken,
              accessToken: oauthAccessToken,
              nonce,
              pendingToken
            });
          } catch (e) {
            return null;
          }
        }
      };
      FacebookAuthProvider = class extends BaseOAuthProvider {
        constructor() {
          super("facebook.com");
        }
        static credential(accessToken) {
          return OAuthCredential._fromParams({
            providerId: FacebookAuthProvider.PROVIDER_ID,
            signInMethod: FacebookAuthProvider.FACEBOOK_SIGN_IN_METHOD,
            accessToken
          });
        }
        static credentialFromResult(userCredential) {
          return FacebookAuthProvider.credentialFromTaggedObject(userCredential);
        }
        static credentialFromError(error) {
          return FacebookAuthProvider.credentialFromTaggedObject(error.customData || {});
        }
        static credentialFromTaggedObject({ _tokenResponse: tokenResponse }) {
          if (!tokenResponse || !("oauthAccessToken" in tokenResponse)) {
            return null;
          }
          if (!tokenResponse.oauthAccessToken) {
            return null;
          }
          try {
            return FacebookAuthProvider.credential(tokenResponse.oauthAccessToken);
          } catch (_a) {
            return null;
          }
        }
      };
      FacebookAuthProvider.FACEBOOK_SIGN_IN_METHOD = "facebook.com";
      FacebookAuthProvider.PROVIDER_ID = "facebook.com";
      GoogleAuthProvider = class extends BaseOAuthProvider {
        constructor() {
          super("google.com");
          this.addScope("profile");
        }
        static credential(idToken, accessToken) {
          return OAuthCredential._fromParams({
            providerId: GoogleAuthProvider.PROVIDER_ID,
            signInMethod: GoogleAuthProvider.GOOGLE_SIGN_IN_METHOD,
            idToken,
            accessToken
          });
        }
        static credentialFromResult(userCredential) {
          return GoogleAuthProvider.credentialFromTaggedObject(userCredential);
        }
        static credentialFromError(error) {
          return GoogleAuthProvider.credentialFromTaggedObject(error.customData || {});
        }
        static credentialFromTaggedObject({ _tokenResponse: tokenResponse }) {
          if (!tokenResponse) {
            return null;
          }
          const { oauthIdToken, oauthAccessToken } = tokenResponse;
          if (!oauthIdToken && !oauthAccessToken) {
            return null;
          }
          try {
            return GoogleAuthProvider.credential(oauthIdToken, oauthAccessToken);
          } catch (_a) {
            return null;
          }
        }
      };
      GoogleAuthProvider.GOOGLE_SIGN_IN_METHOD = "google.com";
      GoogleAuthProvider.PROVIDER_ID = "google.com";
      GithubAuthProvider = class extends BaseOAuthProvider {
        constructor() {
          super("github.com");
        }
        static credential(accessToken) {
          return OAuthCredential._fromParams({
            providerId: GithubAuthProvider.PROVIDER_ID,
            signInMethod: GithubAuthProvider.GITHUB_SIGN_IN_METHOD,
            accessToken
          });
        }
        static credentialFromResult(userCredential) {
          return GithubAuthProvider.credentialFromTaggedObject(userCredential);
        }
        static credentialFromError(error) {
          return GithubAuthProvider.credentialFromTaggedObject(error.customData || {});
        }
        static credentialFromTaggedObject({ _tokenResponse: tokenResponse }) {
          if (!tokenResponse || !("oauthAccessToken" in tokenResponse)) {
            return null;
          }
          if (!tokenResponse.oauthAccessToken) {
            return null;
          }
          try {
            return GithubAuthProvider.credential(tokenResponse.oauthAccessToken);
          } catch (_a) {
            return null;
          }
        }
      };
      GithubAuthProvider.GITHUB_SIGN_IN_METHOD = "github.com";
      GithubAuthProvider.PROVIDER_ID = "github.com";
      IDP_REQUEST_URI = "http://localhost";
      SAMLAuthCredential = class extends AuthCredential {
        constructor(providerId, pendingToken) {
          super(providerId, providerId);
          this.pendingToken = pendingToken;
        }
        _getIdTokenResponse(auth2) {
          const request = this.buildRequest();
          return signInWithIdp(auth2, request);
        }
        _linkToIdToken(auth2, idToken) {
          const request = this.buildRequest();
          request.idToken = idToken;
          return signInWithIdp(auth2, request);
        }
        _getReauthenticationResolver(auth2) {
          const request = this.buildRequest();
          request.autoCreate = false;
          return signInWithIdp(auth2, request);
        }
        toJSON() {
          return {
            signInMethod: this.signInMethod,
            providerId: this.providerId,
            pendingToken: this.pendingToken
          };
        }
        static fromJSON(json) {
          const obj = typeof json === "string" ? JSON.parse(json) : json;
          const { providerId, signInMethod, pendingToken } = obj;
          if (!providerId || !signInMethod || !pendingToken || providerId !== signInMethod) {
            return null;
          }
          return new SAMLAuthCredential(providerId, pendingToken);
        }
        static _create(providerId, pendingToken) {
          return new SAMLAuthCredential(providerId, pendingToken);
        }
        buildRequest() {
          return {
            requestUri: IDP_REQUEST_URI,
            returnSecureToken: true,
            pendingToken: this.pendingToken
          };
        }
      };
      SAML_PROVIDER_PREFIX = "saml.";
      SAMLAuthProvider = class extends FederatedAuthProvider {
        constructor(providerId) {
          _assert(providerId.startsWith(SAML_PROVIDER_PREFIX), "argument-error");
          super(providerId);
        }
        static credentialFromResult(userCredential) {
          return SAMLAuthProvider.samlCredentialFromTaggedObject(userCredential);
        }
        static credentialFromError(error) {
          return SAMLAuthProvider.samlCredentialFromTaggedObject(error.customData || {});
        }
        static credentialFromJSON(json) {
          const credential = SAMLAuthCredential.fromJSON(json);
          _assert(credential, "argument-error");
          return credential;
        }
        static samlCredentialFromTaggedObject({ _tokenResponse: tokenResponse }) {
          if (!tokenResponse) {
            return null;
          }
          const { pendingToken, providerId } = tokenResponse;
          if (!pendingToken || !providerId) {
            return null;
          }
          try {
            return SAMLAuthCredential._create(providerId, pendingToken);
          } catch (e) {
            return null;
          }
        }
      };
      TwitterAuthProvider = class extends BaseOAuthProvider {
        constructor() {
          super("twitter.com");
        }
        static credential(token, secret) {
          return OAuthCredential._fromParams({
            providerId: TwitterAuthProvider.PROVIDER_ID,
            signInMethod: TwitterAuthProvider.TWITTER_SIGN_IN_METHOD,
            oauthToken: token,
            oauthTokenSecret: secret
          });
        }
        static credentialFromResult(userCredential) {
          return TwitterAuthProvider.credentialFromTaggedObject(userCredential);
        }
        static credentialFromError(error) {
          return TwitterAuthProvider.credentialFromTaggedObject(error.customData || {});
        }
        static credentialFromTaggedObject({ _tokenResponse: tokenResponse }) {
          if (!tokenResponse) {
            return null;
          }
          const { oauthAccessToken, oauthTokenSecret } = tokenResponse;
          if (!oauthAccessToken || !oauthTokenSecret) {
            return null;
          }
          try {
            return TwitterAuthProvider.credential(oauthAccessToken, oauthTokenSecret);
          } catch (_a) {
            return null;
          }
        }
      };
      TwitterAuthProvider.TWITTER_SIGN_IN_METHOD = "twitter.com";
      TwitterAuthProvider.PROVIDER_ID = "twitter.com";
      UserCredentialImpl = class {
        constructor(params) {
          this.user = params.user;
          this.providerId = params.providerId;
          this._tokenResponse = params._tokenResponse;
          this.operationType = params.operationType;
        }
        static async _fromIdTokenResponse(auth2, operationType, idTokenResponse, isAnonymous = false) {
          const user = await UserImpl._fromIdTokenResponse(auth2, idTokenResponse, isAnonymous);
          const providerId = providerIdForResponse(idTokenResponse);
          const userCred = new UserCredentialImpl({
            user,
            providerId,
            _tokenResponse: idTokenResponse,
            operationType
          });
          return userCred;
        }
        static async _forOperation(user, operationType, response) {
          await user._updateTokensIfNecessary(response, true);
          const providerId = providerIdForResponse(response);
          return new UserCredentialImpl({
            user,
            providerId,
            _tokenResponse: response,
            operationType
          });
        }
      };
      MultiFactorError = class extends FirebaseError {
        constructor(auth2, error, operationType, user) {
          var _a;
          super(error.code, error.message);
          this.operationType = operationType;
          this.user = user;
          Object.setPrototypeOf(this, MultiFactorError.prototype);
          this.customData = {
            appName: auth2.name,
            tenantId: (_a = auth2.tenantId) !== null && _a !== void 0 ? _a : void 0,
            _serverResponse: error.customData._serverResponse,
            operationType
          };
        }
        static _fromErrorAndOperation(auth2, error, operationType, user) {
          return new MultiFactorError(auth2, error, operationType, user);
        }
      };
      MultiFactorInfoImpl = class {
        constructor(factorId, response) {
          this.factorId = factorId;
          this.uid = response.mfaEnrollmentId;
          this.enrollmentTime = new Date(response.enrolledAt).toUTCString();
          this.displayName = response.displayName;
        }
        static _fromServerResponse(auth2, enrollment) {
          if ("phoneInfo" in enrollment) {
            return PhoneMultiFactorInfo._fromServerResponse(auth2, enrollment);
          }
          return _fail(auth2, "internal-error");
        }
      };
      PhoneMultiFactorInfo = class extends MultiFactorInfoImpl {
        constructor(response) {
          super("phone", response);
          this.phoneNumber = response.phoneInfo;
        }
        static _fromServerResponse(_auth, enrollment) {
          return new PhoneMultiFactorInfo(enrollment);
        }
      };
      GenericAdditionalUserInfo = class {
        constructor(isNewUser, providerId, profile = {}) {
          this.isNewUser = isNewUser;
          this.providerId = providerId;
          this.profile = profile;
        }
      };
      FederatedAdditionalUserInfoWithUsername = class extends GenericAdditionalUserInfo {
        constructor(isNewUser, providerId, profile, username) {
          super(isNewUser, providerId, profile);
          this.username = username;
        }
      };
      FacebookAdditionalUserInfo = class extends GenericAdditionalUserInfo {
        constructor(isNewUser, profile) {
          super(isNewUser, "facebook.com", profile);
        }
      };
      GithubAdditionalUserInfo = class extends FederatedAdditionalUserInfoWithUsername {
        constructor(isNewUser, profile) {
          super(isNewUser, "github.com", profile, typeof (profile === null || profile === void 0 ? void 0 : profile.login) === "string" ? profile === null || profile === void 0 ? void 0 : profile.login : null);
        }
      };
      GoogleAdditionalUserInfo = class extends GenericAdditionalUserInfo {
        constructor(isNewUser, profile) {
          super(isNewUser, "google.com", profile);
        }
      };
      TwitterAdditionalUserInfo = class extends FederatedAdditionalUserInfoWithUsername {
        constructor(isNewUser, profile, screenName) {
          super(isNewUser, "twitter.com", profile, screenName);
        }
      };
      MultiFactorSessionImpl = class {
        constructor(type, credential) {
          this.type = type;
          this.credential = credential;
        }
        static _fromIdtoken(idToken) {
          return new MultiFactorSessionImpl("enroll", idToken);
        }
        static _fromMfaPendingCredential(mfaPendingCredential) {
          return new MultiFactorSessionImpl("signin", mfaPendingCredential);
        }
        toJSON() {
          const key = this.type === "enroll" ? "idToken" : "pendingCredential";
          return {
            multiFactorSession: {
              [key]: this.credential
            }
          };
        }
        static fromJSON(obj) {
          var _a, _b;
          if (obj === null || obj === void 0 ? void 0 : obj.multiFactorSession) {
            if ((_a = obj.multiFactorSession) === null || _a === void 0 ? void 0 : _a.pendingCredential) {
              return MultiFactorSessionImpl._fromMfaPendingCredential(obj.multiFactorSession.pendingCredential);
            } else if ((_b = obj.multiFactorSession) === null || _b === void 0 ? void 0 : _b.idToken) {
              return MultiFactorSessionImpl._fromIdtoken(obj.multiFactorSession.idToken);
            }
          }
          return null;
        }
      };
      MultiFactorResolverImpl = class {
        constructor(session, hints, signInResolver) {
          this.session = session;
          this.hints = hints;
          this.signInResolver = signInResolver;
        }
        static _fromError(authExtern, error) {
          const auth2 = _castAuth(authExtern);
          const serverResponse = error.customData._serverResponse;
          const hints = (serverResponse.mfaInfo || []).map((enrollment) => MultiFactorInfoImpl._fromServerResponse(auth2, enrollment));
          _assert(serverResponse.mfaPendingCredential, auth2, "internal-error");
          const session = MultiFactorSessionImpl._fromMfaPendingCredential(serverResponse.mfaPendingCredential);
          return new MultiFactorResolverImpl(session, hints, async (assertion) => {
            const mfaResponse = await assertion._process(auth2, session);
            delete serverResponse.mfaInfo;
            delete serverResponse.mfaPendingCredential;
            const idTokenResponse = Object.assign(Object.assign({}, serverResponse), { idToken: mfaResponse.idToken, refreshToken: mfaResponse.refreshToken });
            switch (error.operationType) {
              case "signIn":
                const userCredential = await UserCredentialImpl._fromIdTokenResponse(auth2, error.operationType, idTokenResponse);
                await auth2._updateCurrentUser(userCredential.user);
                return userCredential;
              case "reauthenticate":
                _assert(error.user, auth2, "internal-error");
                return UserCredentialImpl._forOperation(error.user, error.operationType, idTokenResponse);
              default:
                _fail(auth2, "internal-error");
            }
          });
        }
        async resolveSignIn(assertionExtern) {
          const assertion = assertionExtern;
          return this.signInResolver(assertion);
        }
      };
      MultiFactorUserImpl = class {
        constructor(user) {
          this.user = user;
          this.enrolledFactors = [];
          user._onReload((userInfo) => {
            if (userInfo.mfaInfo) {
              this.enrolledFactors = userInfo.mfaInfo.map((enrollment) => MultiFactorInfoImpl._fromServerResponse(user.auth, enrollment));
            }
          });
        }
        static _fromUser(user) {
          return new MultiFactorUserImpl(user);
        }
        async getSession() {
          return MultiFactorSessionImpl._fromIdtoken(await this.user.getIdToken());
        }
        async enroll(assertionExtern, displayName) {
          const assertion = assertionExtern;
          const session = await this.getSession();
          const finalizeMfaResponse = await _logoutIfInvalidated(this.user, assertion._process(this.user.auth, session, displayName));
          await this.user._updateTokensIfNecessary(finalizeMfaResponse);
          return this.user.reload();
        }
        async unenroll(infoOrUid) {
          const mfaEnrollmentId = typeof infoOrUid === "string" ? infoOrUid : infoOrUid.uid;
          const idToken = await this.user.getIdToken();
          const idTokenResponse = await _logoutIfInvalidated(this.user, withdrawMfa(this.user.auth, {
            idToken,
            mfaEnrollmentId
          }));
          this.enrolledFactors = this.enrolledFactors.filter(({ uid }) => uid !== mfaEnrollmentId);
          await this.user._updateTokensIfNecessary(idTokenResponse);
          try {
            await this.user.reload();
          } catch (e) {
            if (e.code !== `auth/${"user-token-expired"}`) {
              throw e;
            }
          }
        }
      };
      multiFactorUserCache = /* @__PURE__ */ new WeakMap();
      STORAGE_AVAILABLE_KEY = "__sak";
      BrowserPersistenceClass = class {
        constructor(storageRetriever, type) {
          this.storageRetriever = storageRetriever;
          this.type = type;
        }
        _isAvailable() {
          try {
            if (!this.storage) {
              return Promise.resolve(false);
            }
            this.storage.setItem(STORAGE_AVAILABLE_KEY, "1");
            this.storage.removeItem(STORAGE_AVAILABLE_KEY);
            return Promise.resolve(true);
          } catch (_a) {
            return Promise.resolve(false);
          }
        }
        _set(key, value) {
          this.storage.setItem(key, JSON.stringify(value));
          return Promise.resolve();
        }
        _get(key) {
          const json = this.storage.getItem(key);
          return Promise.resolve(json ? JSON.parse(json) : null);
        }
        _remove(key) {
          this.storage.removeItem(key);
          return Promise.resolve();
        }
        get storage() {
          return this.storageRetriever();
        }
      };
      _POLLING_INTERVAL_MS$1 = 1e3;
      IE10_LOCAL_STORAGE_SYNC_DELAY = 10;
      BrowserLocalPersistence = class extends BrowserPersistenceClass {
        constructor() {
          super(() => window.localStorage, "LOCAL");
          this.boundEventHandler = (event, poll) => this.onStorageEvent(event, poll);
          this.listeners = {};
          this.localCache = {};
          this.pollTimer = null;
          this.safariLocalStorageNotSynced = _iframeCannotSyncWebStorage() && _isIframe();
          this.fallbackToPolling = _isMobileBrowser();
          this._shouldAllowMigration = true;
        }
        forAllChangedKeys(cb) {
          for (const key of Object.keys(this.listeners)) {
            const newValue = this.storage.getItem(key);
            const oldValue = this.localCache[key];
            if (newValue !== oldValue) {
              cb(key, oldValue, newValue);
            }
          }
        }
        onStorageEvent(event, poll = false) {
          if (!event.key) {
            this.forAllChangedKeys((key2, _oldValue, newValue) => {
              this.notifyListeners(key2, newValue);
            });
            return;
          }
          const key = event.key;
          if (poll) {
            this.detachListener();
          } else {
            this.stopPolling();
          }
          if (this.safariLocalStorageNotSynced) {
            const storedValue2 = this.storage.getItem(key);
            if (event.newValue !== storedValue2) {
              if (event.newValue !== null) {
                this.storage.setItem(key, event.newValue);
              } else {
                this.storage.removeItem(key);
              }
            } else if (this.localCache[key] === event.newValue && !poll) {
              return;
            }
          }
          const triggerListeners = () => {
            const storedValue2 = this.storage.getItem(key);
            if (!poll && this.localCache[key] === storedValue2) {
              return;
            }
            this.notifyListeners(key, storedValue2);
          };
          const storedValue = this.storage.getItem(key);
          if (_isIE10() && storedValue !== event.newValue && event.newValue !== event.oldValue) {
            setTimeout(triggerListeners, IE10_LOCAL_STORAGE_SYNC_DELAY);
          } else {
            triggerListeners();
          }
        }
        notifyListeners(key, value) {
          this.localCache[key] = value;
          const listeners = this.listeners[key];
          if (listeners) {
            for (const listener of Array.from(listeners)) {
              listener(value ? JSON.parse(value) : value);
            }
          }
        }
        startPolling() {
          this.stopPolling();
          this.pollTimer = setInterval(() => {
            this.forAllChangedKeys((key, oldValue, newValue) => {
              this.onStorageEvent(new StorageEvent("storage", {
                key,
                oldValue,
                newValue
              }), true);
            });
          }, _POLLING_INTERVAL_MS$1);
        }
        stopPolling() {
          if (this.pollTimer) {
            clearInterval(this.pollTimer);
            this.pollTimer = null;
          }
        }
        attachListener() {
          window.addEventListener("storage", this.boundEventHandler);
        }
        detachListener() {
          window.removeEventListener("storage", this.boundEventHandler);
        }
        _addListener(key, listener) {
          if (Object.keys(this.listeners).length === 0) {
            if (this.fallbackToPolling) {
              this.startPolling();
            } else {
              this.attachListener();
            }
          }
          if (!this.listeners[key]) {
            this.listeners[key] = /* @__PURE__ */ new Set();
            this.localCache[key] = this.storage.getItem(key);
          }
          this.listeners[key].add(listener);
        }
        _removeListener(key, listener) {
          if (this.listeners[key]) {
            this.listeners[key].delete(listener);
            if (this.listeners[key].size === 0) {
              delete this.listeners[key];
            }
          }
          if (Object.keys(this.listeners).length === 0) {
            this.detachListener();
            this.stopPolling();
          }
        }
        async _set(key, value) {
          await super._set(key, value);
          this.localCache[key] = JSON.stringify(value);
        }
        async _get(key) {
          const value = await super._get(key);
          this.localCache[key] = JSON.stringify(value);
          return value;
        }
        async _remove(key) {
          await super._remove(key);
          delete this.localCache[key];
        }
      };
      BrowserLocalPersistence.type = "LOCAL";
      browserLocalPersistence = BrowserLocalPersistence;
      BrowserSessionPersistence = class extends BrowserPersistenceClass {
        constructor() {
          super(() => window.sessionStorage, "SESSION");
        }
        _addListener(_key, _listener) {
          return;
        }
        _removeListener(_key, _listener) {
          return;
        }
      };
      BrowserSessionPersistence.type = "SESSION";
      browserSessionPersistence = BrowserSessionPersistence;
      Receiver = class {
        constructor(eventTarget) {
          this.eventTarget = eventTarget;
          this.handlersMap = {};
          this.boundEventHandler = this.handleEvent.bind(this);
        }
        static _getInstance(eventTarget) {
          const existingInstance = this.receivers.find((receiver) => receiver.isListeningto(eventTarget));
          if (existingInstance) {
            return existingInstance;
          }
          const newInstance = new Receiver(eventTarget);
          this.receivers.push(newInstance);
          return newInstance;
        }
        isListeningto(eventTarget) {
          return this.eventTarget === eventTarget;
        }
        async handleEvent(event) {
          const messageEvent = event;
          const { eventId, eventType, data } = messageEvent.data;
          const handlers = this.handlersMap[eventType];
          if (!(handlers === null || handlers === void 0 ? void 0 : handlers.size)) {
            return;
          }
          messageEvent.ports[0].postMessage({
            status: "ack",
            eventId,
            eventType
          });
          const promises = Array.from(handlers).map(async (handler) => handler(messageEvent.origin, data));
          const response = await _allSettled(promises);
          messageEvent.ports[0].postMessage({
            status: "done",
            eventId,
            eventType,
            response
          });
        }
        _subscribe(eventType, eventHandler) {
          if (Object.keys(this.handlersMap).length === 0) {
            this.eventTarget.addEventListener("message", this.boundEventHandler);
          }
          if (!this.handlersMap[eventType]) {
            this.handlersMap[eventType] = /* @__PURE__ */ new Set();
          }
          this.handlersMap[eventType].add(eventHandler);
        }
        _unsubscribe(eventType, eventHandler) {
          if (this.handlersMap[eventType] && eventHandler) {
            this.handlersMap[eventType].delete(eventHandler);
          }
          if (!eventHandler || this.handlersMap[eventType].size === 0) {
            delete this.handlersMap[eventType];
          }
          if (Object.keys(this.handlersMap).length === 0) {
            this.eventTarget.removeEventListener("message", this.boundEventHandler);
          }
        }
      };
      Receiver.receivers = [];
      Sender = class {
        constructor(target) {
          this.target = target;
          this.handlers = /* @__PURE__ */ new Set();
        }
        removeMessageHandler(handler) {
          if (handler.messageChannel) {
            handler.messageChannel.port1.removeEventListener("message", handler.onMessage);
            handler.messageChannel.port1.close();
          }
          this.handlers.delete(handler);
        }
        async _send(eventType, data, timeout = 50) {
          const messageChannel = typeof MessageChannel !== "undefined" ? new MessageChannel() : null;
          if (!messageChannel) {
            throw new Error("connection_unavailable");
          }
          let completionTimer;
          let handler;
          return new Promise((resolve, reject) => {
            const eventId = _generateEventId("", 20);
            messageChannel.port1.start();
            const ackTimer = setTimeout(() => {
              reject(new Error("unsupported_event"));
            }, timeout);
            handler = {
              messageChannel,
              onMessage(event) {
                const messageEvent = event;
                if (messageEvent.data.eventId !== eventId) {
                  return;
                }
                switch (messageEvent.data.status) {
                  case "ack":
                    clearTimeout(ackTimer);
                    completionTimer = setTimeout(() => {
                      reject(new Error("timeout"));
                    }, 3e3);
                    break;
                  case "done":
                    clearTimeout(completionTimer);
                    resolve(messageEvent.data.response);
                    break;
                  default:
                    clearTimeout(ackTimer);
                    clearTimeout(completionTimer);
                    reject(new Error("invalid_response"));
                    break;
                }
              }
            };
            this.handlers.add(handler);
            messageChannel.port1.addEventListener("message", handler.onMessage);
            this.target.postMessage({
              eventType,
              eventId,
              data
            }, [messageChannel.port2]);
          }).finally(() => {
            if (handler) {
              this.removeMessageHandler(handler);
            }
          });
        }
      };
      DB_NAME = "firebaseLocalStorageDb";
      DB_VERSION = 1;
      DB_OBJECTSTORE_NAME = "firebaseLocalStorage";
      DB_DATA_KEYPATH = "fbase_key";
      DBPromise = class {
        constructor(request) {
          this.request = request;
        }
        toPromise() {
          return new Promise((resolve, reject) => {
            this.request.addEventListener("success", () => {
              resolve(this.request.result);
            });
            this.request.addEventListener("error", () => {
              reject(this.request.error);
            });
          });
        }
      };
      _POLLING_INTERVAL_MS = 800;
      _TRANSACTION_RETRY_COUNT = 3;
      IndexedDBLocalPersistence = class {
        constructor() {
          this.type = "LOCAL";
          this._shouldAllowMigration = true;
          this.listeners = {};
          this.localCache = {};
          this.pollTimer = null;
          this.pendingWrites = 0;
          this.receiver = null;
          this.sender = null;
          this.serviceWorkerReceiverAvailable = false;
          this.activeServiceWorker = null;
          this._workerInitializationPromise = this.initializeServiceWorkerMessaging().then(() => {
          }, () => {
          });
        }
        async _openDb() {
          if (this.db) {
            return this.db;
          }
          this.db = await _openDatabase();
          return this.db;
        }
        async _withRetries(op) {
          let numAttempts = 0;
          while (true) {
            try {
              const db = await this._openDb();
              return await op(db);
            } catch (e) {
              if (numAttempts++ > _TRANSACTION_RETRY_COUNT) {
                throw e;
              }
              if (this.db) {
                this.db.close();
                this.db = void 0;
              }
            }
          }
        }
        async initializeServiceWorkerMessaging() {
          return _isWorker() ? this.initializeReceiver() : this.initializeSender();
        }
        async initializeReceiver() {
          this.receiver = Receiver._getInstance(_getWorkerGlobalScope());
          this.receiver._subscribe("keyChanged", async (_origin, data) => {
            const keys = await this._poll();
            return {
              keyProcessed: keys.includes(data.key)
            };
          });
          this.receiver._subscribe("ping", async (_origin, _data) => {
            return ["keyChanged"];
          });
        }
        async initializeSender() {
          var _a, _b;
          this.activeServiceWorker = await _getActiveServiceWorker();
          if (!this.activeServiceWorker) {
            return;
          }
          this.sender = new Sender(this.activeServiceWorker);
          const results = await this.sender._send("ping", {}, 800);
          if (!results) {
            return;
          }
          if (((_a = results[0]) === null || _a === void 0 ? void 0 : _a.fulfilled) && ((_b = results[0]) === null || _b === void 0 ? void 0 : _b.value.includes("keyChanged"))) {
            this.serviceWorkerReceiverAvailable = true;
          }
        }
        async notifyServiceWorker(key) {
          if (!this.sender || !this.activeServiceWorker || _getServiceWorkerController() !== this.activeServiceWorker) {
            return;
          }
          try {
            await this.sender._send("keyChanged", { key }, this.serviceWorkerReceiverAvailable ? 800 : 50);
          } catch (_a) {
          }
        }
        async _isAvailable() {
          try {
            if (!indexedDB) {
              return false;
            }
            const db = await _openDatabase();
            await _putObject(db, STORAGE_AVAILABLE_KEY, "1");
            await _deleteObject(db, STORAGE_AVAILABLE_KEY);
            return true;
          } catch (_a) {
          }
          return false;
        }
        async _withPendingWrite(write) {
          this.pendingWrites++;
          try {
            await write();
          } finally {
            this.pendingWrites--;
          }
        }
        async _set(key, value) {
          return this._withPendingWrite(async () => {
            await this._withRetries((db) => _putObject(db, key, value));
            this.localCache[key] = value;
            return this.notifyServiceWorker(key);
          });
        }
        async _get(key) {
          const obj = await this._withRetries((db) => getObject(db, key));
          this.localCache[key] = obj;
          return obj;
        }
        async _remove(key) {
          return this._withPendingWrite(async () => {
            await this._withRetries((db) => _deleteObject(db, key));
            delete this.localCache[key];
            return this.notifyServiceWorker(key);
          });
        }
        async _poll() {
          const result = await this._withRetries((db) => {
            const getAllRequest = getObjectStore(db, false).getAll();
            return new DBPromise(getAllRequest).toPromise();
          });
          if (!result) {
            return [];
          }
          if (this.pendingWrites !== 0) {
            return [];
          }
          const keys = [];
          const keysInResult = /* @__PURE__ */ new Set();
          for (const { fbase_key: key, value } of result) {
            keysInResult.add(key);
            if (JSON.stringify(this.localCache[key]) !== JSON.stringify(value)) {
              this.notifyListeners(key, value);
              keys.push(key);
            }
          }
          for (const localKey of Object.keys(this.localCache)) {
            if (this.localCache[localKey] && !keysInResult.has(localKey)) {
              this.notifyListeners(localKey, null);
              keys.push(localKey);
            }
          }
          return keys;
        }
        notifyListeners(key, newValue) {
          this.localCache[key] = newValue;
          const listeners = this.listeners[key];
          if (listeners) {
            for (const listener of Array.from(listeners)) {
              listener(newValue);
            }
          }
        }
        startPolling() {
          this.stopPolling();
          this.pollTimer = setInterval(async () => this._poll(), _POLLING_INTERVAL_MS);
        }
        stopPolling() {
          if (this.pollTimer) {
            clearInterval(this.pollTimer);
            this.pollTimer = null;
          }
        }
        _addListener(key, listener) {
          if (Object.keys(this.listeners).length === 0) {
            this.startPolling();
          }
          if (!this.listeners[key]) {
            this.listeners[key] = /* @__PURE__ */ new Set();
            void this._get(key);
          }
          this.listeners[key].add(listener);
        }
        _removeListener(key, listener) {
          if (this.listeners[key]) {
            this.listeners[key].delete(listener);
            if (this.listeners[key].size === 0) {
              delete this.listeners[key];
            }
          }
          if (Object.keys(this.listeners).length === 0) {
            this.stopPolling();
          }
        }
      };
      IndexedDBLocalPersistence.type = "LOCAL";
      indexedDBLocalPersistence = IndexedDBLocalPersistence;
      _SOLVE_TIME_MS = 500;
      _EXPIRATION_TIME_MS = 6e4;
      _WIDGET_ID_START = 1e12;
      MockReCaptcha = class {
        constructor(auth2) {
          this.auth = auth2;
          this.counter = _WIDGET_ID_START;
          this._widgets = /* @__PURE__ */ new Map();
        }
        render(container, parameters) {
          const id = this.counter;
          this._widgets.set(id, new MockWidget(container, this.auth.name, parameters || {}));
          this.counter++;
          return id;
        }
        reset(optWidgetId) {
          var _a;
          const id = optWidgetId || _WIDGET_ID_START;
          void ((_a = this._widgets.get(id)) === null || _a === void 0 ? void 0 : _a.delete());
          this._widgets.delete(id);
        }
        getResponse(optWidgetId) {
          var _a;
          const id = optWidgetId || _WIDGET_ID_START;
          return ((_a = this._widgets.get(id)) === null || _a === void 0 ? void 0 : _a.getResponse()) || "";
        }
        async execute(optWidgetId) {
          var _a;
          const id = optWidgetId || _WIDGET_ID_START;
          void ((_a = this._widgets.get(id)) === null || _a === void 0 ? void 0 : _a.execute());
          return "";
        }
      };
      MockWidget = class {
        constructor(containerOrId, appName, params) {
          this.params = params;
          this.timerId = null;
          this.deleted = false;
          this.responseToken = null;
          this.clickHandler = () => {
            this.execute();
          };
          const container = typeof containerOrId === "string" ? document.getElementById(containerOrId) : containerOrId;
          _assert(container, "argument-error", { appName });
          this.container = container;
          this.isVisible = this.params.size !== "invisible";
          if (this.isVisible) {
            this.execute();
          } else {
            this.container.addEventListener("click", this.clickHandler);
          }
        }
        getResponse() {
          this.checkIfDeleted();
          return this.responseToken;
        }
        delete() {
          this.checkIfDeleted();
          this.deleted = true;
          if (this.timerId) {
            clearTimeout(this.timerId);
            this.timerId = null;
          }
          this.container.removeEventListener("click", this.clickHandler);
        }
        execute() {
          this.checkIfDeleted();
          if (this.timerId) {
            return;
          }
          this.timerId = window.setTimeout(() => {
            this.responseToken = generateRandomAlphaNumericString(50);
            const { callback, "expired-callback": expiredCallback } = this.params;
            if (callback) {
              try {
                callback(this.responseToken);
              } catch (e) {
              }
            }
            this.timerId = window.setTimeout(() => {
              this.timerId = null;
              this.responseToken = null;
              if (expiredCallback) {
                try {
                  expiredCallback();
                } catch (e) {
                }
              }
              if (this.isVisible) {
                this.execute();
              }
            }, _EXPIRATION_TIME_MS);
          }, _SOLVE_TIME_MS);
        }
        checkIfDeleted() {
          if (this.deleted) {
            throw new Error("reCAPTCHA mock was already deleted!");
          }
        }
      };
      _JSLOAD_CALLBACK = _generateCallbackName("rcb");
      NETWORK_TIMEOUT_DELAY = new Delay(3e4, 6e4);
      RECAPTCHA_BASE = "https://www.google.com/recaptcha/api.js?";
      ReCaptchaLoaderImpl = class {
        constructor() {
          this.hostLanguage = "";
          this.counter = 0;
          this.librarySeparatelyLoaded = !!_window().grecaptcha;
        }
        load(auth2, hl = "") {
          _assert(isHostLanguageValid(hl), auth2, "argument-error");
          if (this.shouldResolveImmediately(hl)) {
            return Promise.resolve(_window().grecaptcha);
          }
          return new Promise((resolve, reject) => {
            const networkTimeout = _window().setTimeout(() => {
              reject(_createError(auth2, "network-request-failed"));
            }, NETWORK_TIMEOUT_DELAY.get());
            _window()[_JSLOAD_CALLBACK] = () => {
              _window().clearTimeout(networkTimeout);
              delete _window()[_JSLOAD_CALLBACK];
              const recaptcha = _window().grecaptcha;
              if (!recaptcha) {
                reject(_createError(auth2, "internal-error"));
                return;
              }
              const render = recaptcha.render;
              recaptcha.render = (container, params) => {
                const widgetId = render(container, params);
                this.counter++;
                return widgetId;
              };
              this.hostLanguage = hl;
              resolve(recaptcha);
            };
            const url = `${RECAPTCHA_BASE}?${querystring({
              onload: _JSLOAD_CALLBACK,
              render: "explicit",
              hl
            })}`;
            _loadJS(url).catch(() => {
              clearTimeout(networkTimeout);
              reject(_createError(auth2, "internal-error"));
            });
          });
        }
        clearedOneInstance() {
          this.counter--;
        }
        shouldResolveImmediately(hl) {
          return !!_window().grecaptcha && (hl === this.hostLanguage || this.counter > 0 || this.librarySeparatelyLoaded);
        }
      };
      MockReCaptchaLoaderImpl = class {
        async load(auth2) {
          return new MockReCaptcha(auth2);
        }
        clearedOneInstance() {
        }
      };
      RECAPTCHA_VERIFIER_TYPE = "recaptcha";
      DEFAULT_PARAMS = {
        theme: "light",
        type: "image"
      };
      RecaptchaVerifier = class {
        constructor(containerOrId, parameters = Object.assign({}, DEFAULT_PARAMS), authExtern) {
          this.parameters = parameters;
          this.type = RECAPTCHA_VERIFIER_TYPE;
          this.destroyed = false;
          this.widgetId = null;
          this.tokenChangeListeners = /* @__PURE__ */ new Set();
          this.renderPromise = null;
          this.recaptcha = null;
          this.auth = _castAuth(authExtern);
          this.isInvisible = this.parameters.size === "invisible";
          _assert(typeof document !== "undefined", this.auth, "operation-not-supported-in-this-environment");
          const container = typeof containerOrId === "string" ? document.getElementById(containerOrId) : containerOrId;
          _assert(container, this.auth, "argument-error");
          this.container = container;
          this.parameters.callback = this.makeTokenCallback(this.parameters.callback);
          this._recaptchaLoader = this.auth.settings.appVerificationDisabledForTesting ? new MockReCaptchaLoaderImpl() : new ReCaptchaLoaderImpl();
          this.validateStartingState();
        }
        async verify() {
          this.assertNotDestroyed();
          const id = await this.render();
          const recaptcha = this.getAssertedRecaptcha();
          const response = recaptcha.getResponse(id);
          if (response) {
            return response;
          }
          return new Promise((resolve) => {
            const tokenChange = (token) => {
              if (!token) {
                return;
              }
              this.tokenChangeListeners.delete(tokenChange);
              resolve(token);
            };
            this.tokenChangeListeners.add(tokenChange);
            if (this.isInvisible) {
              recaptcha.execute(id);
            }
          });
        }
        render() {
          try {
            this.assertNotDestroyed();
          } catch (e) {
            return Promise.reject(e);
          }
          if (this.renderPromise) {
            return this.renderPromise;
          }
          this.renderPromise = this.makeRenderPromise().catch((e) => {
            this.renderPromise = null;
            throw e;
          });
          return this.renderPromise;
        }
        _reset() {
          this.assertNotDestroyed();
          if (this.widgetId !== null) {
            this.getAssertedRecaptcha().reset(this.widgetId);
          }
        }
        clear() {
          this.assertNotDestroyed();
          this.destroyed = true;
          this._recaptchaLoader.clearedOneInstance();
          if (!this.isInvisible) {
            this.container.childNodes.forEach((node) => {
              this.container.removeChild(node);
            });
          }
        }
        validateStartingState() {
          _assert(!this.parameters.sitekey, this.auth, "argument-error");
          _assert(this.isInvisible || !this.container.hasChildNodes(), this.auth, "argument-error");
          _assert(typeof document !== "undefined", this.auth, "operation-not-supported-in-this-environment");
        }
        makeTokenCallback(existing) {
          return (token) => {
            this.tokenChangeListeners.forEach((listener) => listener(token));
            if (typeof existing === "function") {
              existing(token);
            } else if (typeof existing === "string") {
              const globalFunc = _window()[existing];
              if (typeof globalFunc === "function") {
                globalFunc(token);
              }
            }
          };
        }
        assertNotDestroyed() {
          _assert(!this.destroyed, this.auth, "internal-error");
        }
        async makeRenderPromise() {
          await this.init();
          if (!this.widgetId) {
            let container = this.container;
            if (!this.isInvisible) {
              const guaranteedEmpty = document.createElement("div");
              container.appendChild(guaranteedEmpty);
              container = guaranteedEmpty;
            }
            this.widgetId = this.getAssertedRecaptcha().render(container, this.parameters);
          }
          return this.widgetId;
        }
        async init() {
          _assert(_isHttpOrHttps() && !_isWorker(), this.auth, "internal-error");
          await domReady();
          this.recaptcha = await this._recaptchaLoader.load(this.auth, this.auth.languageCode || void 0);
          const siteKey = await getRecaptchaParams(this.auth);
          _assert(siteKey, this.auth, "internal-error");
          this.parameters.sitekey = siteKey;
        }
        getAssertedRecaptcha() {
          _assert(this.recaptcha, this.auth, "internal-error");
          return this.recaptcha;
        }
      };
      ConfirmationResultImpl = class {
        constructor(verificationId, onConfirmation) {
          this.verificationId = verificationId;
          this.onConfirmation = onConfirmation;
        }
        confirm(verificationCode) {
          const authCredential = PhoneAuthCredential._fromVerification(this.verificationId, verificationCode);
          return this.onConfirmation(authCredential);
        }
      };
      PhoneAuthProvider = class {
        constructor(auth2) {
          this.providerId = PhoneAuthProvider.PROVIDER_ID;
          this.auth = _castAuth(auth2);
        }
        verifyPhoneNumber(phoneOptions, applicationVerifier) {
          return _verifyPhoneNumber(this.auth, phoneOptions, getModularInstance(applicationVerifier));
        }
        static credential(verificationId, verificationCode) {
          return PhoneAuthCredential._fromVerification(verificationId, verificationCode);
        }
        static credentialFromResult(userCredential) {
          const credential = userCredential;
          return PhoneAuthProvider.credentialFromTaggedObject(credential);
        }
        static credentialFromError(error) {
          return PhoneAuthProvider.credentialFromTaggedObject(error.customData || {});
        }
        static credentialFromTaggedObject({ _tokenResponse: tokenResponse }) {
          if (!tokenResponse) {
            return null;
          }
          const { phoneNumber, temporaryProof } = tokenResponse;
          if (phoneNumber && temporaryProof) {
            return PhoneAuthCredential._fromTokenResponse(phoneNumber, temporaryProof);
          }
          return null;
        }
      };
      PhoneAuthProvider.PROVIDER_ID = "phone";
      PhoneAuthProvider.PHONE_SIGN_IN_METHOD = "phone";
      IdpCredential = class extends AuthCredential {
        constructor(params) {
          super("custom", "custom");
          this.params = params;
        }
        _getIdTokenResponse(auth2) {
          return signInWithIdp(auth2, this._buildIdpRequest());
        }
        _linkToIdToken(auth2, idToken) {
          return signInWithIdp(auth2, this._buildIdpRequest(idToken));
        }
        _getReauthenticationResolver(auth2) {
          return signInWithIdp(auth2, this._buildIdpRequest());
        }
        _buildIdpRequest(idToken) {
          const request = {
            requestUri: this.params.requestUri,
            sessionId: this.params.sessionId,
            postBody: this.params.postBody,
            tenantId: this.params.tenantId,
            pendingToken: this.params.pendingToken,
            returnSecureToken: true,
            returnIdpCredential: true
          };
          if (idToken) {
            request.idToken = idToken;
          }
          return request;
        }
      };
      AbstractPopupRedirectOperation = class {
        constructor(auth2, filter, resolver, user, bypassAuthState = false) {
          this.auth = auth2;
          this.resolver = resolver;
          this.user = user;
          this.bypassAuthState = bypassAuthState;
          this.pendingPromise = null;
          this.eventManager = null;
          this.filter = Array.isArray(filter) ? filter : [filter];
        }
        execute() {
          return new Promise(async (resolve, reject) => {
            this.pendingPromise = { resolve, reject };
            try {
              this.eventManager = await this.resolver._initialize(this.auth);
              await this.onExecution();
              this.eventManager.registerConsumer(this);
            } catch (e) {
              this.reject(e);
            }
          });
        }
        async onAuthEvent(event) {
          const { urlResponse, sessionId, postBody, tenantId, error, type } = event;
          if (error) {
            this.reject(error);
            return;
          }
          const params = {
            auth: this.auth,
            requestUri: urlResponse,
            sessionId,
            tenantId: tenantId || void 0,
            postBody: postBody || void 0,
            user: this.user,
            bypassAuthState: this.bypassAuthState
          };
          try {
            this.resolve(await this.getIdpTask(type)(params));
          } catch (e) {
            this.reject(e);
          }
        }
        onError(error) {
          this.reject(error);
        }
        getIdpTask(type) {
          switch (type) {
            case "signInViaPopup":
            case "signInViaRedirect":
              return _signIn;
            case "linkViaPopup":
            case "linkViaRedirect":
              return _link;
            case "reauthViaPopup":
            case "reauthViaRedirect":
              return _reauth;
            default:
              _fail(this.auth, "internal-error");
          }
        }
        resolve(cred) {
          debugAssert(this.pendingPromise, "Pending promise was never set");
          this.pendingPromise.resolve(cred);
          this.unregisterAndCleanUp();
        }
        reject(error) {
          debugAssert(this.pendingPromise, "Pending promise was never set");
          this.pendingPromise.reject(error);
          this.unregisterAndCleanUp();
        }
        unregisterAndCleanUp() {
          if (this.eventManager) {
            this.eventManager.unregisterConsumer(this);
          }
          this.pendingPromise = null;
          this.cleanUp();
        }
      };
      _POLL_WINDOW_CLOSE_TIMEOUT = new Delay(2e3, 1e4);
      PopupOperation = class extends AbstractPopupRedirectOperation {
        constructor(auth2, filter, provider, resolver, user) {
          super(auth2, filter, resolver, user);
          this.provider = provider;
          this.authWindow = null;
          this.pollId = null;
          if (PopupOperation.currentPopupAction) {
            PopupOperation.currentPopupAction.cancel();
          }
          PopupOperation.currentPopupAction = this;
        }
        async executeNotNull() {
          const result = await this.execute();
          _assert(result, this.auth, "internal-error");
          return result;
        }
        async onExecution() {
          debugAssert(this.filter.length === 1, "Popup operations only handle one event");
          const eventId = _generateEventId();
          this.authWindow = await this.resolver._openPopup(this.auth, this.provider, this.filter[0], eventId);
          this.authWindow.associatedEvent = eventId;
          this.resolver._originValidation(this.auth).catch((e) => {
            this.reject(e);
          });
          this.resolver._isIframeWebStorageSupported(this.auth, (isSupported) => {
            if (!isSupported) {
              this.reject(_createError(this.auth, "web-storage-unsupported"));
            }
          });
          this.pollUserCancellation();
        }
        get eventId() {
          var _a;
          return ((_a = this.authWindow) === null || _a === void 0 ? void 0 : _a.associatedEvent) || null;
        }
        cancel() {
          this.reject(_createError(this.auth, "cancelled-popup-request"));
        }
        cleanUp() {
          if (this.authWindow) {
            this.authWindow.close();
          }
          if (this.pollId) {
            window.clearTimeout(this.pollId);
          }
          this.authWindow = null;
          this.pollId = null;
          PopupOperation.currentPopupAction = null;
        }
        pollUserCancellation() {
          const poll = () => {
            var _a, _b;
            if ((_b = (_a = this.authWindow) === null || _a === void 0 ? void 0 : _a.window) === null || _b === void 0 ? void 0 : _b.closed) {
              this.pollId = window.setTimeout(() => {
                this.pollId = null;
                this.reject(_createError(this.auth, "popup-closed-by-user"));
              }, 2e3);
              return;
            }
            this.pollId = window.setTimeout(poll, _POLL_WINDOW_CLOSE_TIMEOUT.get());
          };
          poll();
        }
      };
      PopupOperation.currentPopupAction = null;
      PENDING_REDIRECT_KEY = "pendingRedirect";
      redirectOutcomeMap = /* @__PURE__ */ new Map();
      RedirectAction = class extends AbstractPopupRedirectOperation {
        constructor(auth2, resolver, bypassAuthState = false) {
          super(auth2, [
            "signInViaRedirect",
            "linkViaRedirect",
            "reauthViaRedirect",
            "unknown"
          ], resolver, void 0, bypassAuthState);
          this.eventId = null;
        }
        async execute() {
          let readyOutcome = redirectOutcomeMap.get(this.auth._key());
          if (!readyOutcome) {
            try {
              const hasPendingRedirect = await _getAndClearPendingRedirectStatus(this.resolver, this.auth);
              const result = hasPendingRedirect ? await super.execute() : null;
              readyOutcome = () => Promise.resolve(result);
            } catch (e) {
              readyOutcome = () => Promise.reject(e);
            }
            redirectOutcomeMap.set(this.auth._key(), readyOutcome);
          }
          if (!this.bypassAuthState) {
            redirectOutcomeMap.set(this.auth._key(), () => Promise.resolve(null));
          }
          return readyOutcome();
        }
        async onAuthEvent(event) {
          if (event.type === "signInViaRedirect") {
            return super.onAuthEvent(event);
          } else if (event.type === "unknown") {
            this.resolve(null);
            return;
          }
          if (event.eventId) {
            const user = await this.auth._redirectUserForId(event.eventId);
            if (user) {
              this.user = user;
              return super.onAuthEvent(event);
            } else {
              this.resolve(null);
            }
          }
        }
        async onExecution() {
        }
        cleanUp() {
        }
      };
      EVENT_DUPLICATION_CACHE_DURATION_MS = 10 * 60 * 1e3;
      AuthEventManager = class {
        constructor(auth2) {
          this.auth = auth2;
          this.cachedEventUids = /* @__PURE__ */ new Set();
          this.consumers = /* @__PURE__ */ new Set();
          this.queuedRedirectEvent = null;
          this.hasHandledPotentialRedirect = false;
          this.lastProcessedEventTime = Date.now();
        }
        registerConsumer(authEventConsumer) {
          this.consumers.add(authEventConsumer);
          if (this.queuedRedirectEvent && this.isEventForConsumer(this.queuedRedirectEvent, authEventConsumer)) {
            this.sendToConsumer(this.queuedRedirectEvent, authEventConsumer);
            this.saveEventToCache(this.queuedRedirectEvent);
            this.queuedRedirectEvent = null;
          }
        }
        unregisterConsumer(authEventConsumer) {
          this.consumers.delete(authEventConsumer);
        }
        onEvent(event) {
          if (this.hasEventBeenHandled(event)) {
            return false;
          }
          let handled = false;
          this.consumers.forEach((consumer) => {
            if (this.isEventForConsumer(event, consumer)) {
              handled = true;
              this.sendToConsumer(event, consumer);
              this.saveEventToCache(event);
            }
          });
          if (this.hasHandledPotentialRedirect || !isRedirectEvent(event)) {
            return handled;
          }
          this.hasHandledPotentialRedirect = true;
          if (!handled) {
            this.queuedRedirectEvent = event;
            handled = true;
          }
          return handled;
        }
        sendToConsumer(event, consumer) {
          var _a;
          if (event.error && !isNullRedirectEvent(event)) {
            const code = ((_a = event.error.code) === null || _a === void 0 ? void 0 : _a.split("auth/")[1]) || "internal-error";
            consumer.onError(_createError(this.auth, code));
          } else {
            consumer.onAuthEvent(event);
          }
        }
        isEventForConsumer(event, consumer) {
          const eventIdMatches = consumer.eventId === null || !!event.eventId && event.eventId === consumer.eventId;
          return consumer.filter.includes(event.type) && eventIdMatches;
        }
        hasEventBeenHandled(event) {
          if (Date.now() - this.lastProcessedEventTime >= EVENT_DUPLICATION_CACHE_DURATION_MS) {
            this.cachedEventUids.clear();
          }
          return this.cachedEventUids.has(eventUid(event));
        }
        saveEventToCache(event) {
          this.cachedEventUids.add(eventUid(event));
          this.lastProcessedEventTime = Date.now();
        }
      };
      IP_ADDRESS_REGEX = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;
      HTTP_REGEX = /^https?/;
      NETWORK_TIMEOUT = new Delay(3e4, 6e4);
      cachedGApiLoader = null;
      PING_TIMEOUT = new Delay(5e3, 15e3);
      IFRAME_PATH = "__/auth/iframe";
      EMULATED_IFRAME_PATH = "emulator/auth/iframe";
      IFRAME_ATTRIBUTES = {
        style: {
          position: "absolute",
          top: "-100px",
          width: "1px",
          height: "1px"
        },
        "aria-hidden": "true",
        tabindex: "-1"
      };
      EID_FROM_APIHOST = /* @__PURE__ */ new Map([
        ["identitytoolkit.googleapis.com", "p"],
        ["staging-identitytoolkit.sandbox.googleapis.com", "s"],
        ["test-identitytoolkit.sandbox.googleapis.com", "t"]
      ]);
      BASE_POPUP_OPTIONS = {
        location: "yes",
        resizable: "yes",
        statusbar: "yes",
        toolbar: "no"
      };
      DEFAULT_WIDTH = 500;
      DEFAULT_HEIGHT = 600;
      TARGET_BLANK = "_blank";
      FIREFOX_EMPTY_URL = "http://localhost";
      AuthPopup = class {
        constructor(window2) {
          this.window = window2;
          this.associatedEvent = null;
        }
        close() {
          if (this.window) {
            try {
              this.window.close();
            } catch (e) {
            }
          }
        }
      };
      WIDGET_PATH = "__/auth/handler";
      EMULATOR_WIDGET_PATH = "emulator/auth/handler";
      WEB_STORAGE_SUPPORT_KEY = "webStorageSupport";
      BrowserPopupRedirectResolver = class {
        constructor() {
          this.eventManagers = {};
          this.iframes = {};
          this.originValidationPromises = {};
          this._redirectPersistence = browserSessionPersistence;
          this._completeRedirectFn = _getRedirectResult;
        }
        async _openPopup(auth2, provider, authType, eventId) {
          var _a;
          debugAssert((_a = this.eventManagers[auth2._key()]) === null || _a === void 0 ? void 0 : _a.manager, "_initialize() not called before _openPopup()");
          const url = _getRedirectUrl(auth2, provider, authType, _getCurrentUrl(), eventId);
          return _open(auth2, url, _generateEventId());
        }
        async _openRedirect(auth2, provider, authType, eventId) {
          await this._originValidation(auth2);
          _setWindowLocation(_getRedirectUrl(auth2, provider, authType, _getCurrentUrl(), eventId));
          return new Promise(() => {
          });
        }
        _initialize(auth2) {
          const key = auth2._key();
          if (this.eventManagers[key]) {
            const { manager, promise: promise2 } = this.eventManagers[key];
            if (manager) {
              return Promise.resolve(manager);
            } else {
              debugAssert(promise2, "If manager is not set, promise should be");
              return promise2;
            }
          }
          const promise = this.initAndGetManager(auth2);
          this.eventManagers[key] = { promise };
          promise.catch(() => {
            delete this.eventManagers[key];
          });
          return promise;
        }
        async initAndGetManager(auth2) {
          const iframe = await _openIframe(auth2);
          const manager = new AuthEventManager(auth2);
          iframe.register("authEvent", (iframeEvent) => {
            _assert(iframeEvent === null || iframeEvent === void 0 ? void 0 : iframeEvent.authEvent, auth2, "invalid-auth-event");
            const handled = manager.onEvent(iframeEvent.authEvent);
            return { status: handled ? "ACK" : "ERROR" };
          }, gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER);
          this.eventManagers[auth2._key()] = { manager };
          this.iframes[auth2._key()] = iframe;
          return manager;
        }
        _isIframeWebStorageSupported(auth2, cb) {
          const iframe = this.iframes[auth2._key()];
          iframe.send(WEB_STORAGE_SUPPORT_KEY, { type: WEB_STORAGE_SUPPORT_KEY }, (result) => {
            var _a;
            const isSupported = (_a = result === null || result === void 0 ? void 0 : result[0]) === null || _a === void 0 ? void 0 : _a[WEB_STORAGE_SUPPORT_KEY];
            if (isSupported !== void 0) {
              cb(!!isSupported);
            }
            _fail(auth2, "internal-error");
          }, gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER);
        }
        _originValidation(auth2) {
          const key = auth2._key();
          if (!this.originValidationPromises[key]) {
            this.originValidationPromises[key] = _validateOrigin(auth2);
          }
          return this.originValidationPromises[key];
        }
        get _shouldInitProactively() {
          return _isMobileBrowser() || _isSafari() || _isIOS();
        }
      };
      browserPopupRedirectResolver = BrowserPopupRedirectResolver;
      MultiFactorAssertionImpl = class {
        constructor(factorId) {
          this.factorId = factorId;
        }
        _process(auth2, session, displayName) {
          switch (session.type) {
            case "enroll":
              return this._finalizeEnroll(auth2, session.credential, displayName);
            case "signin":
              return this._finalizeSignIn(auth2, session.credential);
            default:
              return debugFail("unexpected MultiFactorSessionType");
          }
        }
      };
      PhoneMultiFactorAssertionImpl = class extends MultiFactorAssertionImpl {
        constructor(credential) {
          super("phone");
          this.credential = credential;
        }
        static _fromCredential(credential) {
          return new PhoneMultiFactorAssertionImpl(credential);
        }
        _finalizeEnroll(auth2, idToken, displayName) {
          return finalizeEnrollPhoneMfa(auth2, {
            idToken,
            displayName,
            phoneVerificationInfo: this.credential._makeVerificationRequest()
          });
        }
        _finalizeSignIn(auth2, mfaPendingCredential) {
          return finalizeSignInPhoneMfa(auth2, {
            mfaPendingCredential,
            phoneVerificationInfo: this.credential._makeVerificationRequest()
          });
        }
      };
      PhoneMultiFactorGenerator = class {
        constructor() {
        }
        static assertion(credential) {
          return PhoneMultiFactorAssertionImpl._fromCredential(credential);
        }
      };
      PhoneMultiFactorGenerator.FACTOR_ID = "phone";
      name3 = "@firebase/auth";
      version3 = "0.19.5";
      AuthInterop = class {
        constructor(auth2) {
          this.auth = auth2;
          this.internalListeners = /* @__PURE__ */ new Map();
        }
        getUid() {
          var _a;
          this.assertAuthConfigured();
          return ((_a = this.auth.currentUser) === null || _a === void 0 ? void 0 : _a.uid) || null;
        }
        async getToken(forceRefresh) {
          this.assertAuthConfigured();
          await this.auth._initializationPromise;
          if (!this.auth.currentUser) {
            return null;
          }
          const accessToken = await this.auth.currentUser.getIdToken(forceRefresh);
          return { accessToken };
        }
        addAuthTokenListener(listener) {
          this.assertAuthConfigured();
          if (this.internalListeners.has(listener)) {
            return;
          }
          const unsubscribe = this.auth.onIdTokenChanged((user) => {
            var _a;
            listener(((_a = user) === null || _a === void 0 ? void 0 : _a.stsTokenManager.accessToken) || null);
          });
          this.internalListeners.set(listener, unsubscribe);
          this.updateProactiveRefresh();
        }
        removeAuthTokenListener(listener) {
          this.assertAuthConfigured();
          const unsubscribe = this.internalListeners.get(listener);
          if (!unsubscribe) {
            return;
          }
          this.internalListeners.delete(listener);
          unsubscribe();
          this.updateProactiveRefresh();
        }
        assertAuthConfigured() {
          _assert(this.auth._initializationPromise, "dependent-sdk-initialized-before-auth");
        }
        updateProactiveRefresh() {
          if (this.internalListeners.size > 0) {
            this.auth._startProactiveRefresh();
          } else {
            this.auth._stopProactiveRefresh();
          }
        }
      };
      registerAuth("Browser");
    }
  });

  // node_modules/@firebase/app-compat/dist/esm/index.esm2017.js
  function createFirebaseNamespaceCore(firebaseAppImpl) {
    const apps = {};
    const namespace = {
      __esModule: true,
      initializeApp: initializeAppCompat,
      app: app2,
      registerVersion,
      setLogLevel: setLogLevel2,
      onLog,
      apps: null,
      SDK_VERSION,
      INTERNAL: {
        registerComponent: registerComponentCompat,
        removeApp,
        useAsService,
        modularAPIs: index_esm2017_exports
      }
    };
    namespace["default"] = namespace;
    Object.defineProperty(namespace, "apps", {
      get: getApps2
    });
    function removeApp(name7) {
      delete apps[name7];
    }
    function app2(name7) {
      name7 = name7 || DEFAULT_ENTRY_NAME2;
      if (!contains(apps, name7)) {
        throw ERROR_FACTORY2.create("no-app", { appName: name7 });
      }
      return apps[name7];
    }
    app2["App"] = firebaseAppImpl;
    function initializeAppCompat(options, rawConfig = {}) {
      const app3 = initializeApp(options, rawConfig);
      if (contains(apps, app3.name)) {
        return apps[app3.name];
      }
      const appCompat = new firebaseAppImpl(app3, namespace);
      apps[app3.name] = appCompat;
      return appCompat;
    }
    function getApps2() {
      return Object.keys(apps).map((name7) => apps[name7]);
    }
    function registerComponentCompat(component) {
      const componentName = component.name;
      const componentNameWithoutCompat = componentName.replace("-compat", "");
      if (_registerComponent(component) && component.type === "PUBLIC") {
        const serviceNamespace = (appArg = app2()) => {
          if (typeof appArg[componentNameWithoutCompat] !== "function") {
            throw ERROR_FACTORY2.create("invalid-app-argument", {
              appName: componentName
            });
          }
          return appArg[componentNameWithoutCompat]();
        };
        if (component.serviceProps !== void 0) {
          deepExtend(serviceNamespace, component.serviceProps);
        }
        namespace[componentNameWithoutCompat] = serviceNamespace;
        firebaseAppImpl.prototype[componentNameWithoutCompat] = function(...args) {
          const serviceFxn = this._getService.bind(this, componentName);
          return serviceFxn.apply(this, component.multipleInstances ? args : []);
        };
      }
      return component.type === "PUBLIC" ? namespace[componentNameWithoutCompat] : null;
    }
    function useAsService(app3, name7) {
      if (name7 === "serverAuth") {
        return null;
      }
      const useService = name7;
      return useService;
    }
    return namespace;
  }
  function createFirebaseNamespace() {
    const namespace = createFirebaseNamespaceCore(FirebaseAppImpl2);
    namespace.INTERNAL = Object.assign(Object.assign({}, namespace.INTERNAL), {
      createFirebaseNamespace,
      extendNamespace,
      createSubscribe,
      ErrorFactory,
      deepExtend
    });
    function extendNamespace(props) {
      deepExtend(namespace, props);
    }
    return namespace;
  }
  function registerCoreComponents2(variant) {
    registerVersion(name4, version4, variant);
  }
  var FirebaseAppImpl2, ERRORS2, ERROR_FACTORY2, firebase$1, logger2, name4, version4, firebase;
  var init_index_esm20175 = __esm({
    "node_modules/@firebase/app-compat/dist/esm/index.esm2017.js"() {
      init_index_esm2017();
      init_index_esm20172();
      init_index_esm20174();
      init_index_esm20174();
      init_index_esm20173();
      FirebaseAppImpl2 = class {
        constructor(_delegate, firebase2) {
          this._delegate = _delegate;
          this.firebase = firebase2;
          _addComponent(_delegate, new Component("app-compat", () => this, "PUBLIC"));
          this.container = _delegate.container;
        }
        get automaticDataCollectionEnabled() {
          return this._delegate.automaticDataCollectionEnabled;
        }
        set automaticDataCollectionEnabled(val) {
          this._delegate.automaticDataCollectionEnabled = val;
        }
        get name() {
          return this._delegate.name;
        }
        get options() {
          return this._delegate.options;
        }
        delete() {
          return new Promise((resolve) => {
            this._delegate.checkDestroyed();
            resolve();
          }).then(() => {
            this.firebase.INTERNAL.removeApp(this.name);
            return deleteApp(this._delegate);
          });
        }
        _getService(name7, instanceIdentifier = DEFAULT_ENTRY_NAME2) {
          var _a;
          this._delegate.checkDestroyed();
          const provider = this._delegate.container.getProvider(name7);
          if (!provider.isInitialized() && ((_a = provider.getComponent()) === null || _a === void 0 ? void 0 : _a.instantiationMode) === "EXPLICIT") {
            provider.initialize();
          }
          return provider.getImmediate({
            identifier: instanceIdentifier
          });
        }
        _removeServiceInstance(name7, instanceIdentifier = DEFAULT_ENTRY_NAME2) {
          this._delegate.container.getProvider(name7).clearInstance(instanceIdentifier);
        }
        _addComponent(component) {
          _addComponent(this._delegate, component);
        }
        _addOrOverwriteComponent(component) {
          _addOrOverwriteComponent(this._delegate, component);
        }
        toJSON() {
          return {
            name: this.name,
            automaticDataCollectionEnabled: this.automaticDataCollectionEnabled,
            options: this.options
          };
        }
      };
      ERRORS2 = {
        ["no-app"]: "No Firebase App '{$appName}' has been created - call Firebase App.initializeApp()",
        ["invalid-app-argument"]: "firebase.{$appName}() takes either no argument or a Firebase App instance."
      };
      ERROR_FACTORY2 = new ErrorFactory("app-compat", "Firebase", ERRORS2);
      firebase$1 = createFirebaseNamespace();
      logger2 = new Logger("@firebase/app-compat");
      name4 = "@firebase/app-compat";
      version4 = "0.1.14";
      if (isBrowser() && self.firebase !== void 0) {
        logger2.warn(`
    Warning: Firebase is already defined in the global scope. Please make sure
    Firebase library is only loaded once.
  `);
        const sdkVersion = self.firebase.SDK_VERSION;
        if (sdkVersion && sdkVersion.indexOf("LITE") >= 0) {
          logger2.warn(`
    Warning: You are trying to load Firebase while using Firebase Performance standalone script.
    You should load Firebase Performance with this instance of Firebase to avoid loading duplicate code.
    `);
        }
      }
      firebase = firebase$1;
      registerCoreComponents2();
    }
  });

  // node_modules/firebase/compat/app/dist/index.esm.js
  var index_esm_exports = {};
  __export(index_esm_exports, {
    default: () => firebase
  });
  var name5, version5;
  var init_index_esm = __esm({
    "node_modules/firebase/compat/app/dist/index.esm.js"() {
      init_index_esm20175();
      init_index_esm20175();
      name5 = "firebase";
      version5 = "9.6.3";
      firebase.registerVersion(name5, version5, "app-compat");
    }
  });

  // node_modules/@firebase/auth/dist/esm2017/internal.js
  function _cordovaWindow() {
    return window;
  }
  async function _generateHandlerUrl(auth2, event, provider) {
    var _a;
    const { BuildInfo } = _cordovaWindow();
    debugAssert(event.sessionId, "AuthEvent did not contain a session ID");
    const sessionDigest = await computeSha256(event.sessionId);
    const additionalParams = {};
    if (_isIOS()) {
      additionalParams["ibi"] = BuildInfo.packageName;
    } else if (_isAndroid()) {
      additionalParams["apn"] = BuildInfo.packageName;
    } else {
      _fail(auth2, "operation-not-supported-in-this-environment");
    }
    if (BuildInfo.displayName) {
      additionalParams["appDisplayName"] = BuildInfo.displayName;
    }
    additionalParams["sessionId"] = sessionDigest;
    return _getRedirectUrl(auth2, provider, event.type, void 0, (_a = event.eventId) !== null && _a !== void 0 ? _a : void 0, additionalParams);
  }
  async function _validateOrigin2(auth2) {
    const { BuildInfo } = _cordovaWindow();
    const request = {};
    if (_isIOS()) {
      request.iosBundleId = BuildInfo.packageName;
    } else if (_isAndroid()) {
      request.androidPackageName = BuildInfo.packageName;
    } else {
      _fail(auth2, "operation-not-supported-in-this-environment");
    }
    await _getProjectConfig(auth2, request);
  }
  function _performRedirect(handlerUrl) {
    const { cordova } = _cordovaWindow();
    return new Promise((resolve) => {
      cordova.plugins.browsertab.isAvailable((browserTabIsAvailable) => {
        let iabRef = null;
        if (browserTabIsAvailable) {
          cordova.plugins.browsertab.openUrl(handlerUrl);
        } else {
          iabRef = cordova.InAppBrowser.open(handlerUrl, _isIOS7Or8() ? "_blank" : "_system", "location=yes");
        }
        resolve(iabRef);
      });
    });
  }
  async function _waitForAppResume(auth2, eventListener, iabRef) {
    const { cordova } = _cordovaWindow();
    let cleanup = () => {
    };
    try {
      await new Promise((resolve, reject) => {
        let onCloseTimer = null;
        function authEventSeen() {
          var _a;
          resolve();
          const closeBrowserTab = (_a = cordova.plugins.browsertab) === null || _a === void 0 ? void 0 : _a.close;
          if (typeof closeBrowserTab === "function") {
            closeBrowserTab();
          }
          if (typeof (iabRef === null || iabRef === void 0 ? void 0 : iabRef.close) === "function") {
            iabRef.close();
          }
        }
        function resumed() {
          if (onCloseTimer) {
            return;
          }
          onCloseTimer = window.setTimeout(() => {
            reject(_createError(auth2, "redirect-cancelled-by-user"));
          }, REDIRECT_TIMEOUT_MS);
        }
        function visibilityChanged() {
          if ((document === null || document === void 0 ? void 0 : document.visibilityState) === "visible") {
            resumed();
          }
        }
        eventListener.addPassiveListener(authEventSeen);
        document.addEventListener("resume", resumed, false);
        if (_isAndroid()) {
          document.addEventListener("visibilitychange", visibilityChanged, false);
        }
        cleanup = () => {
          eventListener.removePassiveListener(authEventSeen);
          document.removeEventListener("resume", resumed, false);
          document.removeEventListener("visibilitychange", visibilityChanged, false);
          if (onCloseTimer) {
            window.clearTimeout(onCloseTimer);
          }
        };
      });
    } finally {
      cleanup();
    }
  }
  function _checkCordovaConfiguration(auth2) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    const win = _cordovaWindow();
    _assert(typeof ((_a = win === null || win === void 0 ? void 0 : win.universalLinks) === null || _a === void 0 ? void 0 : _a.subscribe) === "function", auth2, "invalid-cordova-configuration", {
      missingPlugin: "cordova-universal-links-plugin-fix"
    });
    _assert(typeof ((_b = win === null || win === void 0 ? void 0 : win.BuildInfo) === null || _b === void 0 ? void 0 : _b.packageName) !== "undefined", auth2, "invalid-cordova-configuration", {
      missingPlugin: "cordova-plugin-buildInfo"
    });
    _assert(typeof ((_e = (_d = (_c = win === null || win === void 0 ? void 0 : win.cordova) === null || _c === void 0 ? void 0 : _c.plugins) === null || _d === void 0 ? void 0 : _d.browsertab) === null || _e === void 0 ? void 0 : _e.openUrl) === "function", auth2, "invalid-cordova-configuration", {
      missingPlugin: "cordova-plugin-browsertab"
    });
    _assert(typeof ((_h = (_g = (_f = win === null || win === void 0 ? void 0 : win.cordova) === null || _f === void 0 ? void 0 : _f.plugins) === null || _g === void 0 ? void 0 : _g.browsertab) === null || _h === void 0 ? void 0 : _h.isAvailable) === "function", auth2, "invalid-cordova-configuration", {
      missingPlugin: "cordova-plugin-browsertab"
    });
    _assert(typeof ((_k = (_j = win === null || win === void 0 ? void 0 : win.cordova) === null || _j === void 0 ? void 0 : _j.InAppBrowser) === null || _k === void 0 ? void 0 : _k.open) === "function", auth2, "invalid-cordova-configuration", {
      missingPlugin: "cordova-plugin-inappbrowser"
    });
  }
  async function computeSha256(sessionId) {
    const bytes = stringToArrayBuffer(sessionId);
    const buf = await crypto.subtle.digest("SHA-256", bytes);
    const arr = Array.from(new Uint8Array(buf));
    return arr.map((num) => num.toString(16).padStart(2, "0")).join("");
  }
  function stringToArrayBuffer(str) {
    debugAssert(/[0-9a-zA-Z]+/.test(str), "Can only convert alpha-numeric strings");
    if (typeof TextEncoder !== "undefined") {
      return new TextEncoder().encode(str);
    }
    const buff = new ArrayBuffer(str.length);
    const view = new Uint8Array(buff);
    for (let i = 0; i < str.length; i++) {
      view[i] = str.charCodeAt(i);
    }
    return view;
  }
  function _generateNewEvent(auth2, type, eventId = null) {
    return {
      type,
      eventId,
      urlResponse: null,
      sessionId: generateSessionId(),
      postBody: null,
      tenantId: auth2.tenantId,
      error: _createError(auth2, "no-auth-event")
    };
  }
  function _savePartialEvent(auth2, event) {
    return storage()._set(persistenceKey(auth2), event);
  }
  async function _getAndRemoveEvent(auth2) {
    const event = await storage()._get(persistenceKey(auth2));
    if (event) {
      await storage()._remove(persistenceKey(auth2));
    }
    return event;
  }
  function _eventFromPartialAndUrl(partialEvent, url) {
    var _a, _b;
    const callbackUrl = _getDeepLinkFromCallback(url);
    if (callbackUrl.includes("/__/auth/callback")) {
      const params = searchParamsOrEmpty(callbackUrl);
      const errorObject = params["firebaseError"] ? parseJsonOrNull(decodeURIComponent(params["firebaseError"])) : null;
      const code = (_b = (_a = errorObject === null || errorObject === void 0 ? void 0 : errorObject["code"]) === null || _a === void 0 ? void 0 : _a.split("auth/")) === null || _b === void 0 ? void 0 : _b[1];
      const error = code ? _createError(code) : null;
      if (error) {
        return {
          type: partialEvent.type,
          eventId: partialEvent.eventId,
          tenantId: partialEvent.tenantId,
          error,
          urlResponse: null,
          sessionId: null,
          postBody: null
        };
      } else {
        return {
          type: partialEvent.type,
          eventId: partialEvent.eventId,
          tenantId: partialEvent.tenantId,
          sessionId: partialEvent.sessionId,
          urlResponse: callbackUrl,
          postBody: null
        };
      }
    }
    return null;
  }
  function generateSessionId() {
    const chars = [];
    const allowedChars = "1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (let i = 0; i < SESSION_ID_LENGTH; i++) {
      const idx = Math.floor(Math.random() * allowedChars.length);
      chars.push(allowedChars.charAt(idx));
    }
    return chars.join("");
  }
  function storage() {
    return _getInstance(browserLocalPersistence);
  }
  function persistenceKey(auth2) {
    return _persistenceKeyName("authEvent", auth2.config.apiKey, auth2.name);
  }
  function parseJsonOrNull(json) {
    try {
      return JSON.parse(json);
    } catch (e) {
      return null;
    }
  }
  function _getDeepLinkFromCallback(url) {
    const params = searchParamsOrEmpty(url);
    const link = params["link"] ? decodeURIComponent(params["link"]) : void 0;
    const doubleDeepLink = searchParamsOrEmpty(link)["link"];
    const iOSDeepLink = params["deep_link_id"] ? decodeURIComponent(params["deep_link_id"]) : void 0;
    const iOSDoubleDeepLink = searchParamsOrEmpty(iOSDeepLink)["link"];
    return iOSDoubleDeepLink || iOSDeepLink || doubleDeepLink || link || url;
  }
  function searchParamsOrEmpty(url) {
    if (!(url === null || url === void 0 ? void 0 : url.includes("?"))) {
      return {};
    }
    const [_, ...rest] = url.split("?");
    return querystringDecode(rest.join("?"));
  }
  function generateNoEvent() {
    return {
      type: "unknown",
      eventId: null,
      sessionId: null,
      urlResponse: null,
      postBody: null,
      tenantId: null,
      error: _createError("no-auth-event")
    };
  }
  function addFrameworkForLogging(auth2, framework) {
    _castAuth(auth2)._logFramework(framework);
  }
  var REDIRECT_TIMEOUT_MS, SESSION_ID_LENGTH, CordovaAuthEventManager, INITIAL_EVENT_TIMEOUT_MS, CordovaPopupRedirectResolver, cordovaPopupRedirectResolver;
  var init_internal = __esm({
    "node_modules/@firebase/auth/dist/esm2017/internal.js"() {
      init_index_1679a2b2();
      init_index_1679a2b2();
      init_index_esm2017();
      init_index_esm20174();
      init_modules();
      init_index_esm20173();
      init_index_esm20172();
      REDIRECT_TIMEOUT_MS = 2e3;
      SESSION_ID_LENGTH = 20;
      CordovaAuthEventManager = class extends AuthEventManager {
        constructor() {
          super(...arguments);
          this.passiveListeners = /* @__PURE__ */ new Set();
          this.initPromise = new Promise((resolve) => {
            this.resolveInialized = resolve;
          });
        }
        addPassiveListener(cb) {
          this.passiveListeners.add(cb);
        }
        removePassiveListener(cb) {
          this.passiveListeners.delete(cb);
        }
        resetRedirect() {
          this.queuedRedirectEvent = null;
          this.hasHandledPotentialRedirect = false;
        }
        onEvent(event) {
          this.resolveInialized();
          this.passiveListeners.forEach((cb) => cb(event));
          return super.onEvent(event);
        }
        async initialized() {
          await this.initPromise;
        }
      };
      INITIAL_EVENT_TIMEOUT_MS = 500;
      CordovaPopupRedirectResolver = class {
        constructor() {
          this._redirectPersistence = browserSessionPersistence;
          this._shouldInitProactively = true;
          this.eventManagers = /* @__PURE__ */ new Map();
          this.originValidationPromises = {};
          this._completeRedirectFn = _getRedirectResult;
        }
        async _initialize(auth2) {
          const key = auth2._key();
          let manager = this.eventManagers.get(key);
          if (!manager) {
            manager = new CordovaAuthEventManager(auth2);
            this.eventManagers.set(key, manager);
            this.attachCallbackListeners(auth2, manager);
          }
          return manager;
        }
        _openPopup(auth2) {
          _fail(auth2, "operation-not-supported-in-this-environment");
        }
        async _openRedirect(auth2, provider, authType, eventId) {
          _checkCordovaConfiguration(auth2);
          const manager = await this._initialize(auth2);
          await manager.initialized();
          manager.resetRedirect();
          _clearRedirectOutcomes();
          await this._originValidation(auth2);
          const event = _generateNewEvent(auth2, authType, eventId);
          await _savePartialEvent(auth2, event);
          const url = await _generateHandlerUrl(auth2, event, provider);
          const iabRef = await _performRedirect(url);
          return _waitForAppResume(auth2, manager, iabRef);
        }
        _isIframeWebStorageSupported(_auth, _cb) {
          throw new Error("Method not implemented.");
        }
        _originValidation(auth2) {
          const key = auth2._key();
          if (!this.originValidationPromises[key]) {
            this.originValidationPromises[key] = _validateOrigin2(auth2);
          }
          return this.originValidationPromises[key];
        }
        attachCallbackListeners(auth2, manager) {
          const { universalLinks, handleOpenURL, BuildInfo } = _cordovaWindow();
          const noEventTimeout = setTimeout(async () => {
            await _getAndRemoveEvent(auth2);
            manager.onEvent(generateNoEvent());
          }, INITIAL_EVENT_TIMEOUT_MS);
          const universalLinksCb = async (eventData) => {
            clearTimeout(noEventTimeout);
            const partialEvent = await _getAndRemoveEvent(auth2);
            let finalEvent = null;
            if (partialEvent && (eventData === null || eventData === void 0 ? void 0 : eventData["url"])) {
              finalEvent = _eventFromPartialAndUrl(partialEvent, eventData["url"]);
            }
            manager.onEvent(finalEvent || generateNoEvent());
          };
          if (typeof universalLinks !== "undefined" && typeof universalLinks.subscribe === "function") {
            universalLinks.subscribe(null, universalLinksCb);
          }
          const existingHandleOpenURL = handleOpenURL;
          const packagePrefix = `${BuildInfo.packageName.toLowerCase()}://`;
          _cordovaWindow().handleOpenURL = async (url) => {
            if (url.toLowerCase().startsWith(packagePrefix)) {
              universalLinksCb({ url });
            }
            if (typeof existingHandleOpenURL === "function") {
              try {
                existingHandleOpenURL(url);
              } catch (e) {
                console.error(e);
              }
            }
          };
        }
      };
      cordovaPopupRedirectResolver = CordovaPopupRedirectResolver;
    }
  });

  // node_modules/@firebase/auth-compat/dist/index.esm2017.js
  function _getCurrentScheme2() {
    var _a;
    return ((_a = self === null || self === void 0 ? void 0 : self.location) === null || _a === void 0 ? void 0 : _a.protocol) || null;
  }
  function _isHttpOrHttps2() {
    return _getCurrentScheme2() === "http:" || _getCurrentScheme2() === "https:";
  }
  function _isAndroidOrIosCordovaScheme(ua = getUA()) {
    return !!((_getCurrentScheme2() === "file:" || _getCurrentScheme2() === "ionic:") && ua.toLowerCase().match(/iphone|ipad|ipod|android/));
  }
  function _isNativeEnvironment() {
    return isReactNative() || isNode();
  }
  function _isIe11() {
    return isIE() && (document === null || document === void 0 ? void 0 : document.documentMode) === 11;
  }
  function _isEdge(ua = getUA()) {
    return /Edge\/\d+/.test(ua);
  }
  function _isLocalStorageNotSynchronized(ua = getUA()) {
    return _isIe11() || _isEdge(ua);
  }
  function _isWebStorageSupported() {
    try {
      const storage2 = self.localStorage;
      const key = _generateEventId();
      if (storage2) {
        storage2["setItem"](key, "1");
        storage2["removeItem"](key);
        if (_isLocalStorageNotSynchronized()) {
          return isIndexedDBAvailable();
        }
        return true;
      }
    } catch (e) {
      return _isWorker2() && isIndexedDBAvailable();
    }
    return false;
  }
  function _isWorker2() {
    return typeof global !== "undefined" && "WorkerGlobalScope" in global && "importScripts" in global;
  }
  function _isPopupRedirectSupported() {
    return (_isHttpOrHttps2() || isBrowserExtension() || _isAndroidOrIosCordovaScheme()) && !_isNativeEnvironment() && _isWebStorageSupported() && !_isWorker2();
  }
  function _isLikelyCordova() {
    return _isAndroidOrIosCordovaScheme() && typeof document !== "undefined";
  }
  async function _isCordova() {
    if (!_isLikelyCordova()) {
      return false;
    }
    return new Promise((resolve) => {
      const timeoutId = setTimeout(() => {
        resolve(false);
      }, CORDOVA_ONDEVICEREADY_TIMEOUT_MS);
      document.addEventListener("deviceready", () => {
        clearTimeout(timeoutId);
        resolve(true);
      });
    });
  }
  function _validatePersistenceArgument(auth2, persistence) {
    _assert$3(Object.values(Persistence).includes(persistence), auth2, "invalid-persistence-type");
    if (isReactNative()) {
      _assert$3(persistence !== Persistence.SESSION, auth2, "unsupported-persistence-type");
      return;
    }
    if (isNode()) {
      _assert$3(persistence === Persistence.NONE, auth2, "unsupported-persistence-type");
      return;
    }
    if (_isWorker2()) {
      _assert$3(persistence === Persistence.NONE || persistence === Persistence.LOCAL && isIndexedDBAvailable(), auth2, "unsupported-persistence-type");
      return;
    }
    _assert$3(persistence === Persistence.NONE || _isWebStorageSupported(), auth2, "unsupported-persistence-type");
  }
  async function _savePersistenceForRedirect(auth2) {
    await auth2._initializationPromise;
    const win = getSelfWindow();
    const key = _persistenceKeyName(PERSISTENCE_KEY, auth2.config.apiKey, auth2.name);
    if (win === null || win === void 0 ? void 0 : win.sessionStorage) {
      win.sessionStorage.setItem(key, auth2._getPersistence());
    }
  }
  function _getPersistencesFromRedirect(apiKey, appName) {
    const win = getSelfWindow();
    if (!(win === null || win === void 0 ? void 0 : win.sessionStorage)) {
      return [];
    }
    const key = _persistenceKeyName(PERSISTENCE_KEY, apiKey, appName);
    const persistence = win.sessionStorage.getItem(key);
    switch (persistence) {
      case Persistence.NONE:
        return [inMemoryPersistence];
      case Persistence.LOCAL:
        return [indexedDBLocalPersistence, browserSessionPersistence];
      case Persistence.SESSION:
        return [browserSessionPersistence];
      default:
        return [];
    }
  }
  function getSelfWindow() {
    return typeof window !== "undefined" ? window : null;
  }
  function unwrap(object) {
    return object.unwrap();
  }
  function wrapped(object) {
    return object.wrapped();
  }
  function credentialFromResponse(userCredential) {
    return credentialFromObject(userCredential);
  }
  function attachExtraErrorFields(auth2, e) {
    var _a;
    const response = (_a = e.customData) === null || _a === void 0 ? void 0 : _a._tokenResponse;
    if (e.code === "auth/multi-factor-auth-required") {
      const mfaErr = e;
      mfaErr.resolver = new MultiFactorResolver(auth2, getMultiFactorResolver(auth2, e));
    } else if (response) {
      const credential = credentialFromObject(e);
      const credErr = e;
      if (credential) {
        credErr.credential = credential;
        credErr.tenantId = response.tenantId || void 0;
        credErr.email = response.email || void 0;
        credErr.phoneNumber = response.phoneNumber || void 0;
      }
    }
  }
  function credentialFromObject(object) {
    const { _tokenResponse } = object instanceof FirebaseError ? object.customData : object;
    if (!_tokenResponse) {
      return null;
    }
    if (!(object instanceof FirebaseError)) {
      if ("temporaryProof" in _tokenResponse && "phoneNumber" in _tokenResponse) {
        return PhoneAuthProvider.credentialFromResult(object);
      }
    }
    const providerId = _tokenResponse.providerId;
    if (!providerId || providerId === ProviderId.PASSWORD) {
      return null;
    }
    let provider;
    switch (providerId) {
      case ProviderId.GOOGLE:
        provider = GoogleAuthProvider;
        break;
      case ProviderId.FACEBOOK:
        provider = FacebookAuthProvider;
        break;
      case ProviderId.GITHUB:
        provider = GithubAuthProvider;
        break;
      case ProviderId.TWITTER:
        provider = TwitterAuthProvider;
        break;
      default:
        const { oauthIdToken, oauthAccessToken, oauthTokenSecret, pendingToken, nonce } = _tokenResponse;
        if (!oauthAccessToken && !oauthTokenSecret && !oauthIdToken && !pendingToken) {
          return null;
        }
        if (pendingToken) {
          if (providerId.startsWith("saml.")) {
            return SAMLAuthCredential._create(providerId, pendingToken);
          } else {
            return OAuthCredential._fromParams({
              providerId,
              signInMethod: providerId,
              pendingToken,
              idToken: oauthIdToken,
              accessToken: oauthAccessToken
            });
          }
        }
        return new OAuthProvider(providerId).credential({
          idToken: oauthIdToken,
          accessToken: oauthAccessToken,
          rawNonce: nonce
        });
    }
    return object instanceof FirebaseError ? provider.credentialFromError(object) : provider.credentialFromResult(object);
  }
  function convertCredential(auth2, credentialPromise) {
    return credentialPromise.catch((e) => {
      if (e instanceof FirebaseError) {
        attachExtraErrorFields(auth2, e);
      }
      throw e;
    }).then((credential) => {
      const operationType = credential.operationType;
      const user = credential.user;
      return {
        operationType,
        credential: credentialFromResponse(credential),
        additionalUserInfo: getAdditionalUserInfo(credential),
        user: User.getOrCreate(user)
      };
    });
  }
  async function convertConfirmationResult(auth2, confirmationResultPromise) {
    const confirmationResultExp = await confirmationResultPromise;
    return {
      verificationId: confirmationResultExp.verificationId,
      confirm: (verificationCode) => convertCredential(auth2, confirmationResultExp.confirm(verificationCode))
    };
  }
  function wrapObservers(nextOrObserver, error, complete) {
    let next = nextOrObserver;
    if (typeof nextOrObserver !== "function") {
      ({ next, error, complete } = nextOrObserver);
    }
    const oldNext = next;
    const newNext = (user) => oldNext(user && User.getOrCreate(user));
    return {
      next: newNext,
      error,
      complete
    };
  }
  function buildPersistenceHierarchy(apiKey, appName) {
    const persistences = _getPersistencesFromRedirect(apiKey, appName);
    if (typeof self !== "undefined" && !persistences.includes(indexedDBLocalPersistence)) {
      persistences.push(indexedDBLocalPersistence);
    }
    if (typeof window !== "undefined") {
      for (const persistence of [
        browserLocalPersistence,
        browserSessionPersistence
      ]) {
        if (!persistences.includes(persistence)) {
          persistences.push(persistence);
        }
      }
    }
    if (!persistences.includes(inMemoryPersistence)) {
      persistences.push(inMemoryPersistence);
    }
    return persistences;
  }
  function registerAuthCompat(instance) {
    instance.INTERNAL.registerComponent(new Component(AUTH_TYPE, (container) => {
      const app2 = container.getProvider("app-compat").getImmediate();
      const authProvider = container.getProvider("auth");
      return new Auth(app2, authProvider);
    }, "PUBLIC").setServiceProps({
      ActionCodeInfo: {
        Operation: {
          EMAIL_SIGNIN: ActionCodeOperation.EMAIL_SIGNIN,
          PASSWORD_RESET: ActionCodeOperation.PASSWORD_RESET,
          RECOVER_EMAIL: ActionCodeOperation.RECOVER_EMAIL,
          REVERT_SECOND_FACTOR_ADDITION: ActionCodeOperation.REVERT_SECOND_FACTOR_ADDITION,
          VERIFY_AND_CHANGE_EMAIL: ActionCodeOperation.VERIFY_AND_CHANGE_EMAIL,
          VERIFY_EMAIL: ActionCodeOperation.VERIFY_EMAIL
        }
      },
      EmailAuthProvider,
      FacebookAuthProvider,
      GithubAuthProvider,
      GoogleAuthProvider,
      OAuthProvider,
      SAMLAuthProvider,
      PhoneAuthProvider: PhoneAuthProvider2,
      PhoneMultiFactorGenerator,
      RecaptchaVerifier: RecaptchaVerifier2,
      TwitterAuthProvider,
      Auth,
      AuthCredential,
      Error: FirebaseError
    }).setInstantiationMode("LAZY").setMultipleInstances(false));
    instance.registerVersion(name6, version6);
  }
  var name6, version6, CORDOVA_ONDEVICEREADY_TIMEOUT_MS, Persistence, _assert$3, PERSISTENCE_KEY, _assert$2, CompatPopupRedirectResolver, MultiFactorResolver, User, _assert$1, Auth, PhoneAuthProvider2, _assert2, RecaptchaVerifier2, AUTH_TYPE;
  var init_index_esm20176 = __esm({
    "node_modules/@firebase/auth-compat/dist/index.esm2017.js"() {
      init_index_esm20175();
      init_internal();
      init_index_esm20172();
      init_index_esm2017();
      name6 = "@firebase/auth-compat";
      version6 = "0.2.5";
      CORDOVA_ONDEVICEREADY_TIMEOUT_MS = 1e3;
      Persistence = {
        LOCAL: "local",
        NONE: "none",
        SESSION: "session"
      };
      _assert$3 = _assert;
      PERSISTENCE_KEY = "persistence";
      _assert$2 = _assert;
      CompatPopupRedirectResolver = class {
        constructor() {
          this.browserResolver = _getInstance(browserPopupRedirectResolver);
          this.cordovaResolver = _getInstance(cordovaPopupRedirectResolver);
          this.underlyingResolver = null;
          this._redirectPersistence = browserSessionPersistence;
          this._completeRedirectFn = _getRedirectResult;
        }
        async _initialize(auth2) {
          await this.selectUnderlyingResolver();
          return this.assertedUnderlyingResolver._initialize(auth2);
        }
        async _openPopup(auth2, provider, authType, eventId) {
          await this.selectUnderlyingResolver();
          return this.assertedUnderlyingResolver._openPopup(auth2, provider, authType, eventId);
        }
        async _openRedirect(auth2, provider, authType, eventId) {
          await this.selectUnderlyingResolver();
          return this.assertedUnderlyingResolver._openRedirect(auth2, provider, authType, eventId);
        }
        _isIframeWebStorageSupported(auth2, cb) {
          this.assertedUnderlyingResolver._isIframeWebStorageSupported(auth2, cb);
        }
        _originValidation(auth2) {
          return this.assertedUnderlyingResolver._originValidation(auth2);
        }
        get _shouldInitProactively() {
          return _isLikelyCordova() || this.browserResolver._shouldInitProactively;
        }
        get assertedUnderlyingResolver() {
          _assert$2(this.underlyingResolver, "internal-error");
          return this.underlyingResolver;
        }
        async selectUnderlyingResolver() {
          if (this.underlyingResolver) {
            return;
          }
          const isCordova = await _isCordova();
          this.underlyingResolver = isCordova ? this.cordovaResolver : this.browserResolver;
        }
      };
      MultiFactorResolver = class {
        constructor(auth2, resolver) {
          this.resolver = resolver;
          this.auth = wrapped(auth2);
        }
        get session() {
          return this.resolver.session;
        }
        get hints() {
          return this.resolver.hints;
        }
        resolveSignIn(assertion) {
          return convertCredential(unwrap(this.auth), this.resolver.resolveSignIn(assertion));
        }
      };
      User = class {
        constructor(_delegate) {
          this._delegate = _delegate;
          this.multiFactor = multiFactor(_delegate);
        }
        static getOrCreate(user) {
          if (!User.USER_MAP.has(user)) {
            User.USER_MAP.set(user, new User(user));
          }
          return User.USER_MAP.get(user);
        }
        delete() {
          return this._delegate.delete();
        }
        reload() {
          return this._delegate.reload();
        }
        toJSON() {
          return this._delegate.toJSON();
        }
        getIdTokenResult(forceRefresh) {
          return this._delegate.getIdTokenResult(forceRefresh);
        }
        getIdToken(forceRefresh) {
          return this._delegate.getIdToken(forceRefresh);
        }
        linkAndRetrieveDataWithCredential(credential) {
          return this.linkWithCredential(credential);
        }
        async linkWithCredential(credential) {
          return convertCredential(this.auth, linkWithCredential(this._delegate, credential));
        }
        async linkWithPhoneNumber(phoneNumber, applicationVerifier) {
          return convertConfirmationResult(this.auth, linkWithPhoneNumber(this._delegate, phoneNumber, applicationVerifier));
        }
        async linkWithPopup(provider) {
          return convertCredential(this.auth, linkWithPopup(this._delegate, provider, CompatPopupRedirectResolver));
        }
        async linkWithRedirect(provider) {
          await _savePersistenceForRedirect(_castAuth(this.auth));
          return linkWithRedirect(this._delegate, provider, CompatPopupRedirectResolver);
        }
        reauthenticateAndRetrieveDataWithCredential(credential) {
          return this.reauthenticateWithCredential(credential);
        }
        async reauthenticateWithCredential(credential) {
          return convertCredential(this.auth, reauthenticateWithCredential(this._delegate, credential));
        }
        reauthenticateWithPhoneNumber(phoneNumber, applicationVerifier) {
          return convertConfirmationResult(this.auth, reauthenticateWithPhoneNumber(this._delegate, phoneNumber, applicationVerifier));
        }
        reauthenticateWithPopup(provider) {
          return convertCredential(this.auth, reauthenticateWithPopup(this._delegate, provider, CompatPopupRedirectResolver));
        }
        async reauthenticateWithRedirect(provider) {
          await _savePersistenceForRedirect(_castAuth(this.auth));
          return reauthenticateWithRedirect(this._delegate, provider, CompatPopupRedirectResolver);
        }
        sendEmailVerification(actionCodeSettings) {
          return sendEmailVerification(this._delegate, actionCodeSettings);
        }
        async unlink(providerId) {
          await unlink(this._delegate, providerId);
          return this;
        }
        updateEmail(newEmail) {
          return updateEmail(this._delegate, newEmail);
        }
        updatePassword(newPassword) {
          return updatePassword(this._delegate, newPassword);
        }
        updatePhoneNumber(phoneCredential) {
          return updatePhoneNumber(this._delegate, phoneCredential);
        }
        updateProfile(profile) {
          return updateProfile(this._delegate, profile);
        }
        verifyBeforeUpdateEmail(newEmail, actionCodeSettings) {
          return verifyBeforeUpdateEmail(this._delegate, newEmail, actionCodeSettings);
        }
        get emailVerified() {
          return this._delegate.emailVerified;
        }
        get isAnonymous() {
          return this._delegate.isAnonymous;
        }
        get metadata() {
          return this._delegate.metadata;
        }
        get phoneNumber() {
          return this._delegate.phoneNumber;
        }
        get providerData() {
          return this._delegate.providerData;
        }
        get refreshToken() {
          return this._delegate.refreshToken;
        }
        get tenantId() {
          return this._delegate.tenantId;
        }
        get displayName() {
          return this._delegate.displayName;
        }
        get email() {
          return this._delegate.email;
        }
        get photoURL() {
          return this._delegate.photoURL;
        }
        get providerId() {
          return this._delegate.providerId;
        }
        get uid() {
          return this._delegate.uid;
        }
        get auth() {
          return this._delegate.auth;
        }
      };
      User.USER_MAP = /* @__PURE__ */ new WeakMap();
      _assert$1 = _assert;
      Auth = class {
        constructor(app2, provider) {
          this.app = app2;
          if (provider.isInitialized()) {
            this._delegate = provider.getImmediate();
            this.linkUnderlyingAuth();
            return;
          }
          const { apiKey } = app2.options;
          _assert$1(apiKey, "invalid-api-key", {
            appName: app2.name
          });
          _assert$1(apiKey, "invalid-api-key", {
            appName: app2.name
          });
          const resolver = typeof window !== "undefined" ? CompatPopupRedirectResolver : void 0;
          this._delegate = provider.initialize({
            options: {
              persistence: buildPersistenceHierarchy(apiKey, app2.name),
              popupRedirectResolver: resolver
            }
          });
          this._delegate._updateErrorMap(debugErrorMap);
          this.linkUnderlyingAuth();
        }
        get emulatorConfig() {
          return this._delegate.emulatorConfig;
        }
        get currentUser() {
          if (!this._delegate.currentUser) {
            return null;
          }
          return User.getOrCreate(this._delegate.currentUser);
        }
        get languageCode() {
          return this._delegate.languageCode;
        }
        set languageCode(languageCode) {
          this._delegate.languageCode = languageCode;
        }
        get settings() {
          return this._delegate.settings;
        }
        get tenantId() {
          return this._delegate.tenantId;
        }
        set tenantId(tid) {
          this._delegate.tenantId = tid;
        }
        useDeviceLanguage() {
          this._delegate.useDeviceLanguage();
        }
        signOut() {
          return this._delegate.signOut();
        }
        useEmulator(url, options) {
          connectAuthEmulator(this._delegate, url, options);
        }
        applyActionCode(code) {
          return applyActionCode(this._delegate, code);
        }
        checkActionCode(code) {
          return checkActionCode(this._delegate, code);
        }
        confirmPasswordReset(code, newPassword) {
          return confirmPasswordReset(this._delegate, code, newPassword);
        }
        async createUserWithEmailAndPassword(email, password) {
          return convertCredential(this._delegate, createUserWithEmailAndPassword(this._delegate, email, password));
        }
        fetchProvidersForEmail(email) {
          return this.fetchSignInMethodsForEmail(email);
        }
        fetchSignInMethodsForEmail(email) {
          return fetchSignInMethodsForEmail(this._delegate, email);
        }
        isSignInWithEmailLink(emailLink) {
          return isSignInWithEmailLink(this._delegate, emailLink);
        }
        async getRedirectResult() {
          _assert$1(_isPopupRedirectSupported(), this._delegate, "operation-not-supported-in-this-environment");
          const credential = await getRedirectResult(this._delegate, CompatPopupRedirectResolver);
          if (!credential) {
            return {
              credential: null,
              user: null
            };
          }
          return convertCredential(this._delegate, Promise.resolve(credential));
        }
        addFrameworkForLogging(framework) {
          addFrameworkForLogging(this._delegate, framework);
        }
        onAuthStateChanged(nextOrObserver, errorFn, completed) {
          const { next, error, complete } = wrapObservers(nextOrObserver, errorFn, completed);
          return this._delegate.onAuthStateChanged(next, error, complete);
        }
        onIdTokenChanged(nextOrObserver, errorFn, completed) {
          const { next, error, complete } = wrapObservers(nextOrObserver, errorFn, completed);
          return this._delegate.onIdTokenChanged(next, error, complete);
        }
        sendSignInLinkToEmail(email, actionCodeSettings) {
          return sendSignInLinkToEmail(this._delegate, email, actionCodeSettings);
        }
        sendPasswordResetEmail(email, actionCodeSettings) {
          return sendPasswordResetEmail(this._delegate, email, actionCodeSettings || void 0);
        }
        async setPersistence(persistence) {
          _validatePersistenceArgument(this._delegate, persistence);
          let converted;
          switch (persistence) {
            case Persistence.SESSION:
              converted = browserSessionPersistence;
              break;
            case Persistence.LOCAL:
              const isIndexedDBFullySupported = await _getInstance(indexedDBLocalPersistence)._isAvailable();
              converted = isIndexedDBFullySupported ? indexedDBLocalPersistence : browserLocalPersistence;
              break;
            case Persistence.NONE:
              converted = inMemoryPersistence;
              break;
            default:
              return _fail("argument-error", {
                appName: this._delegate.name
              });
          }
          return this._delegate.setPersistence(converted);
        }
        signInAndRetrieveDataWithCredential(credential) {
          return this.signInWithCredential(credential);
        }
        signInAnonymously() {
          return convertCredential(this._delegate, signInAnonymously(this._delegate));
        }
        signInWithCredential(credential) {
          return convertCredential(this._delegate, signInWithCredential(this._delegate, credential));
        }
        signInWithCustomToken(token) {
          return convertCredential(this._delegate, signInWithCustomToken(this._delegate, token));
        }
        signInWithEmailAndPassword(email, password) {
          return convertCredential(this._delegate, signInWithEmailAndPassword(this._delegate, email, password));
        }
        signInWithEmailLink(email, emailLink) {
          return convertCredential(this._delegate, signInWithEmailLink(this._delegate, email, emailLink));
        }
        signInWithPhoneNumber(phoneNumber, applicationVerifier) {
          return convertConfirmationResult(this._delegate, signInWithPhoneNumber(this._delegate, phoneNumber, applicationVerifier));
        }
        async signInWithPopup(provider) {
          _assert$1(_isPopupRedirectSupported(), this._delegate, "operation-not-supported-in-this-environment");
          return convertCredential(this._delegate, signInWithPopup(this._delegate, provider, CompatPopupRedirectResolver));
        }
        async signInWithRedirect(provider) {
          _assert$1(_isPopupRedirectSupported(), this._delegate, "operation-not-supported-in-this-environment");
          await _savePersistenceForRedirect(this._delegate);
          return signInWithRedirect(this._delegate, provider, CompatPopupRedirectResolver);
        }
        updateCurrentUser(user) {
          return this._delegate.updateCurrentUser(user);
        }
        verifyPasswordResetCode(code) {
          return verifyPasswordResetCode(this._delegate, code);
        }
        unwrap() {
          return this._delegate;
        }
        _delete() {
          return this._delegate._delete();
        }
        linkUnderlyingAuth() {
          this._delegate.wrapped = () => this;
        }
      };
      Auth.Persistence = Persistence;
      PhoneAuthProvider2 = class {
        constructor() {
          this.providerId = "phone";
          this._delegate = new PhoneAuthProvider(unwrap(firebase.auth()));
        }
        static credential(verificationId, verificationCode) {
          return PhoneAuthProvider.credential(verificationId, verificationCode);
        }
        verifyPhoneNumber(phoneInfoOptions, applicationVerifier) {
          return this._delegate.verifyPhoneNumber(phoneInfoOptions, applicationVerifier);
        }
        unwrap() {
          return this._delegate;
        }
      };
      PhoneAuthProvider2.PHONE_SIGN_IN_METHOD = PhoneAuthProvider.PHONE_SIGN_IN_METHOD;
      PhoneAuthProvider2.PROVIDER_ID = PhoneAuthProvider.PROVIDER_ID;
      _assert2 = _assert;
      RecaptchaVerifier2 = class {
        constructor(container, parameters, app2 = firebase.app()) {
          var _a;
          _assert2((_a = app2.options) === null || _a === void 0 ? void 0 : _a.apiKey, "invalid-api-key", {
            appName: app2.name
          });
          this._delegate = new RecaptchaVerifier(container, parameters, app2.auth());
          this.type = this._delegate.type;
        }
        clear() {
          this._delegate.clear();
        }
        render() {
          return this._delegate.render();
        }
        verify() {
          return this._delegate.verify();
        }
      };
      AUTH_TYPE = "auth-compat";
      registerAuthCompat(firebase);
    }
  });

  // node_modules/firebase/compat/auth/dist/index.esm.js
  var index_esm_exports2 = {};
  var init_index_esm2 = __esm({
    "node_modules/firebase/compat/auth/dist/index.esm.js"() {
      init_index_esm20176();
    }
  });

  // node_modules/dialog-polyfill/dialog-polyfill.js
  var require_dialog_polyfill = __commonJS({
    "node_modules/dialog-polyfill/dialog-polyfill.js"(exports, module) {
      (function() {
        var supportCustomEvent = window.CustomEvent;
        if (!supportCustomEvent || typeof supportCustomEvent === "object") {
          supportCustomEvent = function CustomEvent2(event, x) {
            x = x || {};
            var ev = document.createEvent("CustomEvent");
            ev.initCustomEvent(event, !!x.bubbles, !!x.cancelable, x.detail || null);
            return ev;
          };
          supportCustomEvent.prototype = window.Event.prototype;
        }
        function createsStackingContext(el) {
          while (el && el !== document.body) {
            var s = window.getComputedStyle(el);
            var invalid = function(k, ok) {
              return !(s[k] === void 0 || s[k] === ok);
            };
            if (s.opacity < 1 || invalid("zIndex", "auto") || invalid("transform", "none") || invalid("mixBlendMode", "normal") || invalid("filter", "none") || invalid("perspective", "none") || s["isolation"] === "isolate" || s.position === "fixed" || s.webkitOverflowScrolling === "touch") {
              return true;
            }
            el = el.parentElement;
          }
          return false;
        }
        function findNearestDialog(el) {
          while (el) {
            if (el.localName === "dialog") {
              return el;
            }
            el = el.parentElement;
          }
          return null;
        }
        function safeBlur(el) {
          if (el && el.blur && el !== document.body) {
            el.blur();
          }
        }
        function inNodeList(nodeList, node) {
          for (var i = 0; i < nodeList.length; ++i) {
            if (nodeList[i] === node) {
              return true;
            }
          }
          return false;
        }
        function isFormMethodDialog(el) {
          if (!el || !el.hasAttribute("method")) {
            return false;
          }
          return el.getAttribute("method").toLowerCase() === "dialog";
        }
        function dialogPolyfillInfo(dialog) {
          this.dialog_ = dialog;
          this.replacedStyleTop_ = false;
          this.openAsModal_ = false;
          if (!dialog.hasAttribute("role")) {
            dialog.setAttribute("role", "dialog");
          }
          dialog.show = this.show.bind(this);
          dialog.showModal = this.showModal.bind(this);
          dialog.close = this.close.bind(this);
          if (!("returnValue" in dialog)) {
            dialog.returnValue = "";
          }
          if ("MutationObserver" in window) {
            var mo = new MutationObserver(this.maybeHideModal.bind(this));
            mo.observe(dialog, { attributes: true, attributeFilter: ["open"] });
          } else {
            var removed = false;
            var cb = function() {
              removed ? this.downgradeModal() : this.maybeHideModal();
              removed = false;
            }.bind(this);
            var timeout;
            var delayModel = function(ev) {
              if (ev.target !== dialog) {
                return;
              }
              var cand = "DOMNodeRemoved";
              removed |= ev.type.substr(0, cand.length) === cand;
              window.clearTimeout(timeout);
              timeout = window.setTimeout(cb, 0);
            };
            ["DOMAttrModified", "DOMNodeRemoved", "DOMNodeRemovedFromDocument"].forEach(function(name7) {
              dialog.addEventListener(name7, delayModel);
            });
          }
          Object.defineProperty(dialog, "open", {
            set: this.setOpen.bind(this),
            get: dialog.hasAttribute.bind(dialog, "open")
          });
          this.backdrop_ = document.createElement("div");
          this.backdrop_.className = "backdrop";
          this.backdrop_.addEventListener("click", this.backdropClick_.bind(this));
        }
        dialogPolyfillInfo.prototype = {
          get dialog() {
            return this.dialog_;
          },
          maybeHideModal: function() {
            if (this.dialog_.hasAttribute("open") && document.body.contains(this.dialog_)) {
              return;
            }
            this.downgradeModal();
          },
          downgradeModal: function() {
            if (!this.openAsModal_) {
              return;
            }
            this.openAsModal_ = false;
            this.dialog_.style.zIndex = "";
            if (this.replacedStyleTop_) {
              this.dialog_.style.top = "";
              this.replacedStyleTop_ = false;
            }
            this.backdrop_.parentNode && this.backdrop_.parentNode.removeChild(this.backdrop_);
            dialogPolyfill.dm.removeDialog(this);
          },
          setOpen: function(value) {
            if (value) {
              this.dialog_.hasAttribute("open") || this.dialog_.setAttribute("open", "");
            } else {
              this.dialog_.removeAttribute("open");
              this.maybeHideModal();
            }
          },
          backdropClick_: function(e) {
            if (!this.dialog_.hasAttribute("tabindex")) {
              var fake = document.createElement("div");
              this.dialog_.insertBefore(fake, this.dialog_.firstChild);
              fake.tabIndex = -1;
              fake.focus();
              this.dialog_.removeChild(fake);
            } else {
              this.dialog_.focus();
            }
            var redirectedEvent = document.createEvent("MouseEvents");
            redirectedEvent.initMouseEvent(e.type, e.bubbles, e.cancelable, window, e.detail, e.screenX, e.screenY, e.clientX, e.clientY, e.ctrlKey, e.altKey, e.shiftKey, e.metaKey, e.button, e.relatedTarget);
            this.dialog_.dispatchEvent(redirectedEvent);
            e.stopPropagation();
          },
          focus_: function() {
            var target = this.dialog_.querySelector("[autofocus]:not([disabled])");
            if (!target && this.dialog_.tabIndex >= 0) {
              target = this.dialog_;
            }
            if (!target) {
              var opts = ["button", "input", "keygen", "select", "textarea"];
              var query = opts.map(function(el) {
                return el + ":not([disabled])";
              });
              query.push('[tabindex]:not([disabled]):not([tabindex=""])');
              target = this.dialog_.querySelector(query.join(", "));
            }
            safeBlur(document.activeElement);
            target && target.focus();
          },
          updateZIndex: function(dialogZ, backdropZ) {
            if (dialogZ < backdropZ) {
              throw new Error("dialogZ should never be < backdropZ");
            }
            this.dialog_.style.zIndex = dialogZ;
            this.backdrop_.style.zIndex = backdropZ;
          },
          show: function() {
            if (!this.dialog_.open) {
              this.setOpen(true);
              this.focus_();
            }
          },
          showModal: function() {
            if (this.dialog_.hasAttribute("open")) {
              throw new Error("Failed to execute 'showModal' on dialog: The element is already open, and therefore cannot be opened modally.");
            }
            if (!document.body.contains(this.dialog_)) {
              throw new Error("Failed to execute 'showModal' on dialog: The element is not in a Document.");
            }
            if (!dialogPolyfill.dm.pushDialog(this)) {
              throw new Error("Failed to execute 'showModal' on dialog: There are too many open modal dialogs.");
            }
            if (createsStackingContext(this.dialog_.parentElement)) {
              console.warn("A dialog is being shown inside a stacking context. This may cause it to be unusable. For more information, see this link: https://github.com/GoogleChrome/dialog-polyfill/#stacking-context");
            }
            this.setOpen(true);
            this.openAsModal_ = true;
            if (dialogPolyfill.needsCentering(this.dialog_)) {
              dialogPolyfill.reposition(this.dialog_);
              this.replacedStyleTop_ = true;
            } else {
              this.replacedStyleTop_ = false;
            }
            this.dialog_.parentNode.insertBefore(this.backdrop_, this.dialog_.nextSibling);
            this.focus_();
          },
          close: function(opt_returnValue) {
            if (!this.dialog_.hasAttribute("open")) {
              throw new Error("Failed to execute 'close' on dialog: The element does not have an 'open' attribute, and therefore cannot be closed.");
            }
            this.setOpen(false);
            if (opt_returnValue !== void 0) {
              this.dialog_.returnValue = opt_returnValue;
            }
            var closeEvent = new supportCustomEvent("close", {
              bubbles: false,
              cancelable: false
            });
            this.dialog_.dispatchEvent(closeEvent);
          }
        };
        var dialogPolyfill = {};
        dialogPolyfill.reposition = function(element) {
          var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
          var topValue = scrollTop + (window.innerHeight - element.offsetHeight) / 2;
          element.style.top = Math.max(scrollTop, topValue) + "px";
        };
        dialogPolyfill.isInlinePositionSetByStylesheet = function(element) {
          for (var i = 0; i < document.styleSheets.length; ++i) {
            var styleSheet = document.styleSheets[i];
            var cssRules = null;
            try {
              cssRules = styleSheet.cssRules;
            } catch (e) {
            }
            if (!cssRules) {
              continue;
            }
            for (var j = 0; j < cssRules.length; ++j) {
              var rule = cssRules[j];
              var selectedNodes = null;
              try {
                selectedNodes = document.querySelectorAll(rule.selectorText);
              } catch (e) {
              }
              if (!selectedNodes || !inNodeList(selectedNodes, element)) {
                continue;
              }
              var cssTop = rule.style.getPropertyValue("top");
              var cssBottom = rule.style.getPropertyValue("bottom");
              if (cssTop && cssTop !== "auto" || cssBottom && cssBottom !== "auto") {
                return true;
              }
            }
          }
          return false;
        };
        dialogPolyfill.needsCentering = function(dialog) {
          var computedStyle = window.getComputedStyle(dialog);
          if (computedStyle.position !== "absolute") {
            return false;
          }
          if (dialog.style.top !== "auto" && dialog.style.top !== "" || dialog.style.bottom !== "auto" && dialog.style.bottom !== "") {
            return false;
          }
          return !dialogPolyfill.isInlinePositionSetByStylesheet(dialog);
        };
        dialogPolyfill.forceRegisterDialog = function(element) {
          if (window.HTMLDialogElement || element.showModal) {
            console.warn("This browser already supports <dialog>, the polyfill may not work correctly", element);
          }
          if (element.localName !== "dialog") {
            throw new Error("Failed to register dialog: The element is not a dialog.");
          }
          new dialogPolyfillInfo(element);
        };
        dialogPolyfill.registerDialog = function(element) {
          if (!element.showModal) {
            dialogPolyfill.forceRegisterDialog(element);
          }
        };
        dialogPolyfill.DialogManager = function() {
          this.pendingDialogStack = [];
          var checkDOM = this.checkDOM_.bind(this);
          this.overlay = document.createElement("div");
          this.overlay.className = "_dialog_overlay";
          this.overlay.addEventListener("click", function(e) {
            this.forwardTab_ = void 0;
            e.stopPropagation();
            checkDOM([]);
          }.bind(this));
          this.handleKey_ = this.handleKey_.bind(this);
          this.handleFocus_ = this.handleFocus_.bind(this);
          this.zIndexLow_ = 1e5;
          this.zIndexHigh_ = 1e5 + 150;
          this.forwardTab_ = void 0;
          if ("MutationObserver" in window) {
            this.mo_ = new MutationObserver(function(records) {
              var removed = [];
              records.forEach(function(rec) {
                for (var i = 0, c; c = rec.removedNodes[i]; ++i) {
                  if (!(c instanceof Element)) {
                    continue;
                  } else if (c.localName === "dialog") {
                    removed.push(c);
                  }
                  removed = removed.concat(c.querySelectorAll("dialog"));
                }
              });
              removed.length && checkDOM(removed);
            });
          }
        };
        dialogPolyfill.DialogManager.prototype.blockDocument = function() {
          document.documentElement.addEventListener("focus", this.handleFocus_, true);
          document.addEventListener("keydown", this.handleKey_);
          this.mo_ && this.mo_.observe(document, { childList: true, subtree: true });
        };
        dialogPolyfill.DialogManager.prototype.unblockDocument = function() {
          document.documentElement.removeEventListener("focus", this.handleFocus_, true);
          document.removeEventListener("keydown", this.handleKey_);
          this.mo_ && this.mo_.disconnect();
        };
        dialogPolyfill.DialogManager.prototype.updateStacking = function() {
          var zIndex = this.zIndexHigh_;
          for (var i = 0, dpi; dpi = this.pendingDialogStack[i]; ++i) {
            dpi.updateZIndex(--zIndex, --zIndex);
            if (i === 0) {
              this.overlay.style.zIndex = --zIndex;
            }
          }
          var last = this.pendingDialogStack[0];
          if (last) {
            var p = last.dialog.parentNode || document.body;
            p.appendChild(this.overlay);
          } else if (this.overlay.parentNode) {
            this.overlay.parentNode.removeChild(this.overlay);
          }
        };
        dialogPolyfill.DialogManager.prototype.containedByTopDialog_ = function(candidate) {
          while (candidate = findNearestDialog(candidate)) {
            for (var i = 0, dpi; dpi = this.pendingDialogStack[i]; ++i) {
              if (dpi.dialog === candidate) {
                return i === 0;
              }
            }
            candidate = candidate.parentElement;
          }
          return false;
        };
        dialogPolyfill.DialogManager.prototype.handleFocus_ = function(event) {
          if (this.containedByTopDialog_(event.target)) {
            return;
          }
          event.preventDefault();
          event.stopPropagation();
          safeBlur(event.target);
          if (this.forwardTab_ === void 0) {
            return;
          }
          var dpi = this.pendingDialogStack[0];
          var dialog = dpi.dialog;
          var position = dialog.compareDocumentPosition(event.target);
          if (position & Node.DOCUMENT_POSITION_PRECEDING) {
            if (this.forwardTab_) {
              dpi.focus_();
            } else {
              document.documentElement.focus();
            }
          } else {
          }
          return false;
        };
        dialogPolyfill.DialogManager.prototype.handleKey_ = function(event) {
          this.forwardTab_ = void 0;
          if (event.keyCode === 27) {
            event.preventDefault();
            event.stopPropagation();
            var cancelEvent = new supportCustomEvent("cancel", {
              bubbles: false,
              cancelable: true
            });
            var dpi = this.pendingDialogStack[0];
            if (dpi && dpi.dialog.dispatchEvent(cancelEvent)) {
              dpi.dialog.close();
            }
          } else if (event.keyCode === 9) {
            this.forwardTab_ = !event.shiftKey;
          }
        };
        dialogPolyfill.DialogManager.prototype.checkDOM_ = function(removed) {
          var clone = this.pendingDialogStack.slice();
          clone.forEach(function(dpi) {
            if (removed.indexOf(dpi.dialog) !== -1) {
              dpi.downgradeModal();
            } else {
              dpi.maybeHideModal();
            }
          });
        };
        dialogPolyfill.DialogManager.prototype.pushDialog = function(dpi) {
          var allowed = (this.zIndexHigh_ - this.zIndexLow_) / 2 - 1;
          if (this.pendingDialogStack.length >= allowed) {
            return false;
          }
          if (this.pendingDialogStack.unshift(dpi) === 1) {
            this.blockDocument();
          }
          this.updateStacking();
          return true;
        };
        dialogPolyfill.DialogManager.prototype.removeDialog = function(dpi) {
          var index = this.pendingDialogStack.indexOf(dpi);
          if (index === -1) {
            return;
          }
          this.pendingDialogStack.splice(index, 1);
          if (this.pendingDialogStack.length === 0) {
            this.unblockDocument();
          }
          this.updateStacking();
        };
        dialogPolyfill.dm = new dialogPolyfill.DialogManager();
        dialogPolyfill.formSubmitter = null;
        dialogPolyfill.useValue = null;
        if (window.HTMLDialogElement === void 0) {
          var testForm = document.createElement("form");
          testForm.setAttribute("method", "dialog");
          if (testForm.method !== "dialog") {
            var methodDescriptor = Object.getOwnPropertyDescriptor(HTMLFormElement.prototype, "method");
            if (methodDescriptor) {
              var realGet = methodDescriptor.get;
              methodDescriptor.get = function() {
                if (isFormMethodDialog(this)) {
                  return "dialog";
                }
                return realGet.call(this);
              };
              var realSet = methodDescriptor.set;
              methodDescriptor.set = function(v) {
                if (typeof v === "string" && v.toLowerCase() === "dialog") {
                  return this.setAttribute("method", v);
                }
                return realSet.call(this, v);
              };
              Object.defineProperty(HTMLFormElement.prototype, "method", methodDescriptor);
            }
          }
          document.addEventListener("click", function(ev) {
            dialogPolyfill.formSubmitter = null;
            dialogPolyfill.useValue = null;
            if (ev.defaultPrevented) {
              return;
            }
            var target = ev.target;
            if (!target || !isFormMethodDialog(target.form)) {
              return;
            }
            var valid = target.type === "submit" && ["button", "input"].indexOf(target.localName) > -1;
            if (!valid) {
              if (!(target.localName === "input" && target.type === "image")) {
                return;
              }
              dialogPolyfill.useValue = ev.offsetX + "," + ev.offsetY;
            }
            var dialog = findNearestDialog(target);
            if (!dialog) {
              return;
            }
            dialogPolyfill.formSubmitter = target;
          }, false);
          var nativeFormSubmit = HTMLFormElement.prototype.submit;
          var replacementFormSubmit = function() {
            if (!isFormMethodDialog(this)) {
              return nativeFormSubmit.call(this);
            }
            var dialog = findNearestDialog(this);
            dialog && dialog.close();
          };
          HTMLFormElement.prototype.submit = replacementFormSubmit;
          document.addEventListener("submit", function(ev) {
            var form = ev.target;
            if (!isFormMethodDialog(form)) {
              return;
            }
            ev.preventDefault();
            var dialog = findNearestDialog(form);
            if (!dialog) {
              return;
            }
            var s = dialogPolyfill.formSubmitter;
            if (s && s.form === form) {
              dialog.close(dialogPolyfill.useValue || s.value);
            } else {
              dialog.close();
            }
            dialogPolyfill.formSubmitter = null;
          }, true);
        }
        dialogPolyfill["forceRegisterDialog"] = dialogPolyfill.forceRegisterDialog;
        dialogPolyfill["registerDialog"] = dialogPolyfill.registerDialog;
        if (typeof define === "function" && "amd" in define) {
          define(function() {
            return dialogPolyfill;
          });
        } else if (typeof module === "object" && typeof module["exports"] === "object") {
          module["exports"] = dialogPolyfill;
        } else {
          window["dialogPolyfill"] = dialogPolyfill;
        }
      })();
    }
  });

  // node_modules/firebaseui/dist/npm.js
  var require_npm = __commonJS({
    "node_modules/firebaseui/dist/npm.js"(exports, module) {
      (function() {
        var firebase2 = (init_index_esm(), __toCommonJS(index_esm_exports));
        init_index_esm2();
        if (typeof firebase2.default !== "undefined") {
          firebase2 = firebase2.default;
        }
        (function() {
          var supportCustomEvent = window.CustomEvent;
          if (!supportCustomEvent || typeof supportCustomEvent === "object") {
            supportCustomEvent = function CustomEvent2(event, x) {
              x = x || {};
              var ev = document.createEvent("CustomEvent");
              ev.initCustomEvent(event, !!x.bubbles, !!x.cancelable, x.detail || null);
              return ev;
            };
            supportCustomEvent.prototype = window.Event.prototype;
          }
          function createsStackingContext(el) {
            while (el && el !== document.body) {
              var s = window.getComputedStyle(el);
              var invalid = function(k, ok) {
                return !(s[k] === void 0 || s[k] === ok);
              };
              if (s.opacity < 1 || invalid("zIndex", "auto") || invalid("transform", "none") || invalid("mixBlendMode", "normal") || invalid("filter", "none") || invalid("perspective", "none") || s["isolation"] === "isolate" || s.position === "fixed" || s.webkitOverflowScrolling === "touch")
                return true;
              el = el.parentElement;
            }
            return false;
          }
          function findNearestDialog(el) {
            while (el) {
              if (el.localName === "dialog")
                return el;
              el = el.parentElement;
            }
            return null;
          }
          function safeBlur(el) {
            if (el && el.blur && el !== document.body)
              el.blur();
          }
          function inNodeList(nodeList, node) {
            for (var i = 0; i < nodeList.length; ++i)
              if (nodeList[i] === node)
                return true;
            return false;
          }
          function isFormMethodDialog(el) {
            if (!el || !el.hasAttribute("method"))
              return false;
            return el.getAttribute("method").toLowerCase() === "dialog";
          }
          function dialogPolyfillInfo(dialog) {
            this.dialog_ = dialog;
            this.replacedStyleTop_ = false;
            this.openAsModal_ = false;
            if (!dialog.hasAttribute("role"))
              dialog.setAttribute("role", "dialog");
            dialog.show = this.show.bind(this);
            dialog.showModal = this.showModal.bind(this);
            dialog.close = this.close.bind(this);
            if (!("returnValue" in dialog))
              dialog.returnValue = "";
            if ("MutationObserver" in window) {
              var mo = new MutationObserver(this.maybeHideModal.bind(this));
              mo.observe(dialog, { attributes: true, attributeFilter: ["open"] });
            } else {
              var removed = false;
              var cb = function() {
                removed ? this.downgradeModal() : this.maybeHideModal();
                removed = false;
              }.bind(this);
              var timeout;
              var delayModel = function(ev) {
                if (ev.target !== dialog)
                  return;
                var cand = "DOMNodeRemoved";
                removed |= ev.type.substr(0, cand.length) === cand;
                window.clearTimeout(timeout);
                timeout = window.setTimeout(cb, 0);
              };
              ["DOMAttrModified", "DOMNodeRemoved", "DOMNodeRemovedFromDocument"].forEach(function(name7) {
                dialog.addEventListener(name7, delayModel);
              });
            }
            Object.defineProperty(dialog, "open", { set: this.setOpen.bind(this), get: dialog.hasAttribute.bind(dialog, "open") });
            this.backdrop_ = document.createElement("div");
            this.backdrop_.className = "backdrop";
            this.backdrop_.addEventListener("click", this.backdropClick_.bind(this));
          }
          dialogPolyfillInfo.prototype = {
            get dialog() {
              return this.dialog_;
            },
            maybeHideModal: function() {
              if (this.dialog_.hasAttribute("open") && document.body.contains(this.dialog_))
                return;
              this.downgradeModal();
            },
            downgradeModal: function() {
              if (!this.openAsModal_)
                return;
              this.openAsModal_ = false;
              this.dialog_.style.zIndex = "";
              if (this.replacedStyleTop_) {
                this.dialog_.style.top = "";
                this.replacedStyleTop_ = false;
              }
              this.backdrop_.parentNode && this.backdrop_.parentNode.removeChild(this.backdrop_);
              dialogPolyfill.dm.removeDialog(this);
            },
            setOpen: function(value) {
              if (value)
                this.dialog_.hasAttribute("open") || this.dialog_.setAttribute("open", "");
              else {
                this.dialog_.removeAttribute("open");
                this.maybeHideModal();
              }
            },
            backdropClick_: function(e) {
              if (!this.dialog_.hasAttribute("tabindex")) {
                var fake = document.createElement("div");
                this.dialog_.insertBefore(fake, this.dialog_.firstChild);
                fake.tabIndex = -1;
                fake.focus();
                this.dialog_.removeChild(fake);
              } else
                this.dialog_.focus();
              var redirectedEvent = document.createEvent("MouseEvents");
              redirectedEvent.initMouseEvent(e.type, e.bubbles, e.cancelable, window, e.detail, e.screenX, e.screenY, e.clientX, e.clientY, e.ctrlKey, e.altKey, e.shiftKey, e.metaKey, e.button, e.relatedTarget);
              this.dialog_.dispatchEvent(redirectedEvent);
              e.stopPropagation();
            },
            focus_: function() {
              var target = this.dialog_.querySelector("[autofocus]:not([disabled])");
              if (!target && this.dialog_.tabIndex >= 0)
                target = this.dialog_;
              if (!target) {
                var opts = ["button", "input", "keygen", "select", "textarea"];
                var query = opts.map(function(el) {
                  return el + ":not([disabled])";
                });
                query.push('[tabindex]:not([disabled]):not([tabindex=""])');
                target = this.dialog_.querySelector(query.join(", "));
              }
              safeBlur(document.activeElement);
              target && target.focus();
            },
            updateZIndex: function(dialogZ, backdropZ) {
              if (dialogZ < backdropZ)
                throw new Error("dialogZ should never be < backdropZ");
              this.dialog_.style.zIndex = dialogZ;
              this.backdrop_.style.zIndex = backdropZ;
            },
            show: function() {
              if (!this.dialog_.open) {
                this.setOpen(true);
                this.focus_();
              }
            },
            showModal: function() {
              if (this.dialog_.hasAttribute("open"))
                throw new Error("Failed to execute 'showModal' on dialog: The element is already open, and therefore cannot be opened modally.");
              if (!document.body.contains(this.dialog_))
                throw new Error("Failed to execute 'showModal' on dialog: The element is not in a Document.");
              if (!dialogPolyfill.dm.pushDialog(this))
                throw new Error("Failed to execute 'showModal' on dialog: There are too many open modal dialogs.");
              if (createsStackingContext(this.dialog_.parentElement))
                console.warn("A dialog is being shown inside a stacking context. This may cause it to be unusable. For more information, see this link: https://github.com/GoogleChrome/dialog-polyfill/#stacking-context");
              this.setOpen(true);
              this.openAsModal_ = true;
              if (dialogPolyfill.needsCentering(this.dialog_)) {
                dialogPolyfill.reposition(this.dialog_);
                this.replacedStyleTop_ = true;
              } else
                this.replacedStyleTop_ = false;
              this.dialog_.parentNode.insertBefore(this.backdrop_, this.dialog_.nextSibling);
              this.focus_();
            },
            close: function(opt_returnValue) {
              if (!this.dialog_.hasAttribute("open"))
                throw new Error("Failed to execute 'close' on dialog: The element does not have an 'open' attribute, and therefore cannot be closed.");
              this.setOpen(false);
              if (opt_returnValue !== void 0)
                this.dialog_.returnValue = opt_returnValue;
              var closeEvent = new supportCustomEvent("close", {
                bubbles: false,
                cancelable: false
              });
              this.dialog_.dispatchEvent(closeEvent);
            }
          };
          var dialogPolyfill = {};
          dialogPolyfill.reposition = function(element) {
            var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
            var topValue = scrollTop + (window.innerHeight - element.offsetHeight) / 2;
            element.style.top = Math.max(scrollTop, topValue) + "px";
          };
          dialogPolyfill.isInlinePositionSetByStylesheet = function(element) {
            for (var i = 0; i < document.styleSheets.length; ++i) {
              var styleSheet = document.styleSheets[i];
              var cssRules = null;
              try {
                cssRules = styleSheet.cssRules;
              } catch (e) {
              }
              if (!cssRules)
                continue;
              for (var j = 0; j < cssRules.length; ++j) {
                var rule = cssRules[j];
                var selectedNodes = null;
                try {
                  selectedNodes = document.querySelectorAll(rule.selectorText);
                } catch (e$0) {
                }
                if (!selectedNodes || !inNodeList(selectedNodes, element))
                  continue;
                var cssTop = rule.style.getPropertyValue("top");
                var cssBottom = rule.style.getPropertyValue("bottom");
                if (cssTop && cssTop !== "auto" || cssBottom && cssBottom !== "auto")
                  return true;
              }
            }
            return false;
          };
          dialogPolyfill.needsCentering = function(dialog) {
            var computedStyle = window.getComputedStyle(dialog);
            if (computedStyle.position !== "absolute")
              return false;
            if (dialog.style.top !== "auto" && dialog.style.top !== "" || dialog.style.bottom !== "auto" && dialog.style.bottom !== "")
              return false;
            return !dialogPolyfill.isInlinePositionSetByStylesheet(dialog);
          };
          dialogPolyfill.forceRegisterDialog = function(element) {
            if (window.HTMLDialogElement || element.showModal)
              console.warn("This browser already supports <dialog>, the polyfill may not work correctly", element);
            if (element.localName !== "dialog")
              throw new Error("Failed to register dialog: The element is not a dialog.");
            new dialogPolyfillInfo(element);
          };
          dialogPolyfill.registerDialog = function(element) {
            if (!element.showModal)
              dialogPolyfill.forceRegisterDialog(element);
          };
          dialogPolyfill.DialogManager = function() {
            this.pendingDialogStack = [];
            var checkDOM = this.checkDOM_.bind(this);
            this.overlay = document.createElement("div");
            this.overlay.className = "_dialog_overlay";
            this.overlay.addEventListener("click", function(e) {
              this.forwardTab_ = void 0;
              e.stopPropagation();
              checkDOM([]);
            }.bind(this));
            this.handleKey_ = this.handleKey_.bind(this);
            this.handleFocus_ = this.handleFocus_.bind(this);
            this.zIndexLow_ = 1e5;
            this.zIndexHigh_ = 1e5 + 150;
            this.forwardTab_ = void 0;
            if ("MutationObserver" in window)
              this.mo_ = new MutationObserver(function(records) {
                var removed = [];
                records.forEach(function(rec) {
                  for (var i = 0, c; c = rec.removedNodes[i]; ++i) {
                    if (!(c instanceof Element))
                      continue;
                    else if (c.localName === "dialog")
                      removed.push(c);
                    removed = removed.concat(c.querySelectorAll("dialog"));
                  }
                });
                removed.length && checkDOM(removed);
              });
          };
          dialogPolyfill.DialogManager.prototype.blockDocument = function() {
            document.documentElement.addEventListener("focus", this.handleFocus_, true);
            document.addEventListener("keydown", this.handleKey_);
            this.mo_ && this.mo_.observe(document, { childList: true, subtree: true });
          };
          dialogPolyfill.DialogManager.prototype.unblockDocument = function() {
            document.documentElement.removeEventListener("focus", this.handleFocus_, true);
            document.removeEventListener("keydown", this.handleKey_);
            this.mo_ && this.mo_.disconnect();
          };
          dialogPolyfill.DialogManager.prototype.updateStacking = function() {
            var zIndex = this.zIndexHigh_;
            for (var i = 0, dpi; dpi = this.pendingDialogStack[i]; ++i) {
              dpi.updateZIndex(--zIndex, --zIndex);
              if (i === 0)
                this.overlay.style.zIndex = --zIndex;
            }
            var last = this.pendingDialogStack[0];
            if (last) {
              var p = last.dialog.parentNode || document.body;
              p.appendChild(this.overlay);
            } else if (this.overlay.parentNode)
              this.overlay.parentNode.removeChild(this.overlay);
          };
          dialogPolyfill.DialogManager.prototype.containedByTopDialog_ = function(candidate) {
            while (candidate = findNearestDialog(candidate)) {
              for (var i = 0, dpi; dpi = this.pendingDialogStack[i]; ++i)
                if (dpi.dialog === candidate)
                  return i === 0;
              candidate = candidate.parentElement;
            }
            return false;
          };
          dialogPolyfill.DialogManager.prototype.handleFocus_ = function(event) {
            if (this.containedByTopDialog_(event.target))
              return;
            event.preventDefault();
            event.stopPropagation();
            safeBlur(event.target);
            if (this.forwardTab_ === void 0)
              return;
            var dpi = this.pendingDialogStack[0];
            var dialog = dpi.dialog;
            var position = dialog.compareDocumentPosition(event.target);
            if (position & Node.DOCUMENT_POSITION_PRECEDING)
              if (this.forwardTab_)
                dpi.focus_();
              else
                document.documentElement.focus();
            else
              ;
            return false;
          };
          dialogPolyfill.DialogManager.prototype.handleKey_ = function(event) {
            this.forwardTab_ = void 0;
            if (event.keyCode === 27) {
              event.preventDefault();
              event.stopPropagation();
              var cancelEvent = new supportCustomEvent("cancel", { bubbles: false, cancelable: true });
              var dpi = this.pendingDialogStack[0];
              if (dpi && dpi.dialog.dispatchEvent(cancelEvent))
                dpi.dialog.close();
            } else if (event.keyCode === 9)
              this.forwardTab_ = !event.shiftKey;
          };
          dialogPolyfill.DialogManager.prototype.checkDOM_ = function(removed) {
            var clone = this.pendingDialogStack.slice();
            clone.forEach(function(dpi) {
              if (removed.indexOf(dpi.dialog) !== -1)
                dpi.downgradeModal();
              else
                dpi.maybeHideModal();
            });
          };
          dialogPolyfill.DialogManager.prototype.pushDialog = function(dpi) {
            var allowed = (this.zIndexHigh_ - this.zIndexLow_) / 2 - 1;
            if (this.pendingDialogStack.length >= allowed)
              return false;
            if (this.pendingDialogStack.unshift(dpi) === 1)
              this.blockDocument();
            this.updateStacking();
            return true;
          };
          dialogPolyfill.DialogManager.prototype.removeDialog = function(dpi) {
            var index = this.pendingDialogStack.indexOf(dpi);
            if (index === -1)
              return;
            this.pendingDialogStack.splice(index, 1);
            if (this.pendingDialogStack.length === 0)
              this.unblockDocument();
            this.updateStacking();
          };
          dialogPolyfill.dm = new dialogPolyfill.DialogManager();
          dialogPolyfill.formSubmitter = null;
          dialogPolyfill.useValue = null;
          if (window.HTMLDialogElement === void 0) {
            var testForm = document.createElement("form");
            testForm.setAttribute("method", "dialog");
            if (testForm.method !== "dialog") {
              var methodDescriptor = Object.getOwnPropertyDescriptor(HTMLFormElement.prototype, "method");
              if (methodDescriptor) {
                var realGet = methodDescriptor.get;
                methodDescriptor.get = function() {
                  if (isFormMethodDialog(this))
                    return "dialog";
                  return realGet.call(this);
                };
                var realSet = methodDescriptor.set;
                methodDescriptor.set = function(v) {
                  if (typeof v === "string" && v.toLowerCase() === "dialog")
                    return this.setAttribute("method", v);
                  return realSet.call(this, v);
                };
                Object.defineProperty(HTMLFormElement.prototype, "method", methodDescriptor);
              }
            }
            document.addEventListener("click", function(ev) {
              dialogPolyfill.formSubmitter = null;
              dialogPolyfill.useValue = null;
              if (ev.defaultPrevented)
                return;
              var target = ev.target;
              if (!target || !isFormMethodDialog(target.form))
                return;
              var valid = target.type === "submit" && ["button", "input"].indexOf(target.localName) > -1;
              if (!valid) {
                if (!(target.localName === "input" && target.type === "image"))
                  return;
                dialogPolyfill.useValue = ev.offsetX + "," + ev.offsetY;
              }
              var dialog = findNearestDialog(target);
              if (!dialog)
                return;
              dialogPolyfill.formSubmitter = target;
            }, false);
            var nativeFormSubmit = HTMLFormElement.prototype.submit;
            var replacementFormSubmit = function() {
              if (!isFormMethodDialog(this))
                return nativeFormSubmit.call(this);
              var dialog = findNearestDialog(this);
              dialog && dialog.close();
            };
            HTMLFormElement.prototype.submit = replacementFormSubmit;
            document.addEventListener("submit", function(ev) {
              var form = ev.target;
              if (!isFormMethodDialog(form))
                return;
              ev.preventDefault();
              var dialog = findNearestDialog(form);
              if (!dialog)
                return;
              var s = dialogPolyfill.formSubmitter;
              if (s && s.form === form)
                dialog.close(dialogPolyfill.useValue || s.value);
              else
                dialog.close();
              dialogPolyfill.formSubmitter = null;
            }, true);
          }
          dialogPolyfill["forceRegisterDialog"] = dialogPolyfill.forceRegisterDialog;
          dialogPolyfill["registerDialog"] = dialogPolyfill.registerDialog;
          if (typeof define === "function" && "amd" in define)
            define(function() {
              return dialogPolyfill;
            });
          else if (typeof module === "object" && typeof module["exports"] === "object")
            module["exports"] = dialogPolyfill;
          else
            window["dialogPolyfill"] = dialogPolyfill;
        })();
        var componentHandler = { upgradeDom: function(optJsClass, optCssClass) {
        }, upgradeElement: function(element, optJsClass) {
        }, upgradeElements: function(elements) {
        }, upgradeAllRegistered: function() {
        }, registerUpgradedCallback: function(jsClass, callback) {
        }, register: function(config2) {
        }, downgradeElements: function(nodes) {
        } };
        componentHandler = function() {
          var registeredComponents_ = [];
          var createdComponents_ = [];
          var componentConfigProperty_ = "mdlComponentConfigInternal_";
          function findRegisteredClass_(name7, optReplace) {
            for (var i = 0; i < registeredComponents_.length; i++)
              if (registeredComponents_[i].className === name7) {
                if (typeof optReplace !== "undefined")
                  registeredComponents_[i] = optReplace;
                return registeredComponents_[i];
              }
            return false;
          }
          function getUpgradedListOfElement_(element) {
            var dataUpgraded = element.getAttribute("data-upgraded");
            return dataUpgraded === null ? [""] : dataUpgraded.split(",");
          }
          function isElementUpgraded_(element, jsClass) {
            var upgradedList = getUpgradedListOfElement_(element);
            return upgradedList.indexOf(jsClass) !== -1;
          }
          function createEvent_(eventType, bubbles, cancelable) {
            if ("CustomEvent" in window && typeof window.CustomEvent === "function")
              return new CustomEvent(eventType, { bubbles, cancelable });
            else {
              var ev = document.createEvent("Events");
              ev.initEvent(eventType, bubbles, cancelable);
              return ev;
            }
          }
          function upgradeDomInternal(optJsClass, optCssClass) {
            if (typeof optJsClass === "undefined" && typeof optCssClass === "undefined")
              for (var i = 0; i < registeredComponents_.length; i++)
                upgradeDomInternal(registeredComponents_[i].className, registeredComponents_[i].cssClass);
            else {
              var jsClass = optJsClass;
              if (typeof optCssClass === "undefined") {
                var registeredClass = findRegisteredClass_(jsClass);
                if (registeredClass)
                  optCssClass = registeredClass.cssClass;
              }
              var elements = document.querySelectorAll("." + optCssClass);
              for (var n = 0; n < elements.length; n++)
                upgradeElementInternal(elements[n], jsClass);
            }
          }
          function upgradeElementInternal(element, optJsClass) {
            if (!(typeof element === "object" && element instanceof Element))
              throw new Error("Invalid argument provided to upgrade MDL element.");
            var upgradingEv = createEvent_("mdl-componentupgrading", true, true);
            element.dispatchEvent(upgradingEv);
            if (upgradingEv.defaultPrevented)
              return;
            var upgradedList = getUpgradedListOfElement_(element);
            var classesToUpgrade = [];
            if (!optJsClass) {
              var classList = element.classList;
              registeredComponents_.forEach(function(component) {
                if (classList.contains(component.cssClass) && classesToUpgrade.indexOf(component) === -1 && !isElementUpgraded_(element, component.className))
                  classesToUpgrade.push(component);
              });
            } else if (!isElementUpgraded_(element, optJsClass))
              classesToUpgrade.push(findRegisteredClass_(optJsClass));
            for (var i = 0, n = classesToUpgrade.length, registeredClass; i < n; i++) {
              registeredClass = classesToUpgrade[i];
              if (registeredClass) {
                upgradedList.push(registeredClass.className);
                element.setAttribute("data-upgraded", upgradedList.join(","));
                var instance = new registeredClass.classConstructor(element);
                instance[componentConfigProperty_] = registeredClass;
                createdComponents_.push(instance);
                for (var j = 0, m = registeredClass.callbacks.length; j < m; j++)
                  registeredClass.callbacks[j](element);
                if (registeredClass.widget)
                  element[registeredClass.className] = instance;
              } else
                throw new Error("Unable to find a registered component for the given class.");
              var upgradedEv = createEvent_("mdl-componentupgraded", true, false);
              element.dispatchEvent(upgradedEv);
            }
          }
          function upgradeElementsInternal(elements) {
            if (!Array.isArray(elements))
              if (elements instanceof Element)
                elements = [elements];
              else
                elements = Array.prototype.slice.call(elements);
            for (var i = 0, n = elements.length, element; i < n; i++) {
              element = elements[i];
              if (element instanceof HTMLElement) {
                upgradeElementInternal(element);
                if (element.children.length > 0)
                  upgradeElementsInternal(element.children);
              }
            }
          }
          function registerInternal(config2) {
            var widgetMissing = typeof config2.widget === "undefined" && typeof config2["widget"] === "undefined";
            var widget = true;
            if (!widgetMissing)
              widget = config2.widget || config2["widget"];
            var newConfig = { classConstructor: config2.constructor || config2["constructor"], className: config2.classAsString || config2["classAsString"], cssClass: config2.cssClass || config2["cssClass"], widget, callbacks: [] };
            registeredComponents_.forEach(function(item) {
              if (item.cssClass === newConfig.cssClass)
                throw new Error("The provided cssClass has already been registered: " + item.cssClass);
              if (item.className === newConfig.className)
                throw new Error("The provided className has already been registered");
            });
            if (config2.constructor.prototype.hasOwnProperty(componentConfigProperty_))
              throw new Error("MDL component classes must not have " + componentConfigProperty_ + " defined as a property.");
            var found = findRegisteredClass_(config2.classAsString, newConfig);
            if (!found)
              registeredComponents_.push(newConfig);
          }
          function registerUpgradedCallbackInternal(jsClass, callback) {
            var regClass = findRegisteredClass_(jsClass);
            if (regClass)
              regClass.callbacks.push(callback);
          }
          function upgradeAllRegisteredInternal() {
            for (var n = 0; n < registeredComponents_.length; n++)
              upgradeDomInternal(registeredComponents_[n].className);
          }
          function deconstructComponentInternal(component) {
            if (component) {
              var componentIndex = createdComponents_.indexOf(component);
              createdComponents_.splice(componentIndex, 1);
              var upgrades = component.element_.getAttribute("data-upgraded").split(",");
              var componentPlace = upgrades.indexOf(component[componentConfigProperty_].classAsString);
              upgrades.splice(componentPlace, 1);
              component.element_.setAttribute("data-upgraded", upgrades.join(","));
              var ev = createEvent_("mdl-componentdowngraded", true, false);
              component.element_.dispatchEvent(ev);
            }
          }
          function downgradeNodesInternal(nodes) {
            var downgradeNode = function(node) {
              createdComponents_.filter(function(item) {
                return item.element_ === node;
              }).forEach(deconstructComponentInternal);
            };
            if (nodes instanceof Array || nodes instanceof NodeList)
              for (var n = 0; n < nodes.length; n++)
                downgradeNode(nodes[n]);
            else if (nodes instanceof Node)
              downgradeNode(nodes);
            else
              throw new Error("Invalid argument provided to downgrade MDL nodes.");
          }
          return {
            upgradeDom: upgradeDomInternal,
            upgradeElement: upgradeElementInternal,
            upgradeElements: upgradeElementsInternal,
            upgradeAllRegistered: upgradeAllRegisteredInternal,
            registerUpgradedCallback: registerUpgradedCallbackInternal,
            register: registerInternal,
            downgradeElements: downgradeNodesInternal
          };
        }();
        componentHandler.ComponentConfigPublic;
        componentHandler.ComponentConfig;
        componentHandler.Component;
        componentHandler["upgradeDom"] = componentHandler.upgradeDom;
        componentHandler["upgradeElement"] = componentHandler.upgradeElement;
        componentHandler["upgradeElements"] = componentHandler.upgradeElements;
        componentHandler["upgradeAllRegistered"] = componentHandler.upgradeAllRegistered;
        componentHandler["registerUpgradedCallback"] = componentHandler.registerUpgradedCallback;
        componentHandler["register"] = componentHandler.register;
        componentHandler["downgradeElements"] = componentHandler.downgradeElements;
        window.componentHandler = componentHandler;
        window["componentHandler"] = componentHandler;
        window.addEventListener("load", function() {
          if ("classList" in document.createElement("div") && "querySelector" in document && "addEventListener" in window && Array.prototype.forEach) {
            document.documentElement.classList.add("mdl-js");
            componentHandler.upgradeAllRegistered();
          } else {
            componentHandler.upgradeElement = function() {
            };
            componentHandler.register = function() {
            };
          }
        });
        (function() {
          var MaterialButton = function MaterialButton2(element) {
            this.element_ = element;
            this.init();
          };
          window["MaterialButton"] = MaterialButton;
          MaterialButton.prototype.Constant_ = {};
          MaterialButton.prototype.CssClasses_ = { RIPPLE_EFFECT: "mdl-js-ripple-effect", RIPPLE_CONTAINER: "mdl-button__ripple-container", RIPPLE: "mdl-ripple" };
          MaterialButton.prototype.blurHandler_ = function(event) {
            if (event)
              this.element_.blur();
          };
          MaterialButton.prototype.disable = function() {
            this.element_.disabled = true;
          };
          MaterialButton.prototype["disable"] = MaterialButton.prototype.disable;
          MaterialButton.prototype.enable = function() {
            this.element_.disabled = false;
          };
          MaterialButton.prototype["enable"] = MaterialButton.prototype.enable;
          MaterialButton.prototype.init = function() {
            if (this.element_) {
              if (this.element_.classList.contains(this.CssClasses_.RIPPLE_EFFECT)) {
                var rippleContainer = document.createElement("span");
                rippleContainer.classList.add(this.CssClasses_.RIPPLE_CONTAINER);
                this.rippleElement_ = document.createElement("span");
                this.rippleElement_.classList.add(this.CssClasses_.RIPPLE);
                rippleContainer.appendChild(this.rippleElement_);
                this.boundRippleBlurHandler = this.blurHandler_.bind(this);
                this.rippleElement_.addEventListener("mouseup", this.boundRippleBlurHandler);
                this.element_.appendChild(rippleContainer);
              }
              this.boundButtonBlurHandler = this.blurHandler_.bind(this);
              this.element_.addEventListener("mouseup", this.boundButtonBlurHandler);
              this.element_.addEventListener("mouseleave", this.boundButtonBlurHandler);
            }
          };
          componentHandler.register({
            constructor: MaterialButton,
            classAsString: "MaterialButton",
            cssClass: "mdl-js-button",
            widget: true
          });
        })();
        (function() {
          var MaterialProgress = function MaterialProgress2(element) {
            this.element_ = element;
            this.init();
          };
          window["MaterialProgress"] = MaterialProgress;
          MaterialProgress.prototype.Constant_ = {};
          MaterialProgress.prototype.CssClasses_ = { INDETERMINATE_CLASS: "mdl-progress__indeterminate" };
          MaterialProgress.prototype.setProgress = function(p) {
            if (this.element_.classList.contains(this.CssClasses_.INDETERMINATE_CLASS))
              return;
            this.progressbar_.style.width = p + "%";
          };
          MaterialProgress.prototype["setProgress"] = MaterialProgress.prototype.setProgress;
          MaterialProgress.prototype.setBuffer = function(p) {
            this.bufferbar_.style.width = p + "%";
            this.auxbar_.style.width = 100 - p + "%";
          };
          MaterialProgress.prototype["setBuffer"] = MaterialProgress.prototype.setBuffer;
          MaterialProgress.prototype.init = function() {
            if (this.element_) {
              var el = document.createElement("div");
              el.className = "progressbar bar bar1";
              this.element_.appendChild(el);
              this.progressbar_ = el;
              el = document.createElement("div");
              el.className = "bufferbar bar bar2";
              this.element_.appendChild(el);
              this.bufferbar_ = el;
              el = document.createElement("div");
              el.className = "auxbar bar bar3";
              this.element_.appendChild(el);
              this.auxbar_ = el;
              this.progressbar_.style.width = "0%";
              this.bufferbar_.style.width = "100%";
              this.auxbar_.style.width = "0%";
              this.element_.classList.add("is-upgraded");
            }
          };
          componentHandler.register({ constructor: MaterialProgress, classAsString: "MaterialProgress", cssClass: "mdl-js-progress", widget: true });
        })();
        (function() {
          var MaterialSpinner = function MaterialSpinner2(element) {
            this.element_ = element;
            this.init();
          };
          window["MaterialSpinner"] = MaterialSpinner;
          MaterialSpinner.prototype.Constant_ = { MDL_SPINNER_LAYER_COUNT: 4 };
          MaterialSpinner.prototype.CssClasses_ = { MDL_SPINNER_LAYER: "mdl-spinner__layer", MDL_SPINNER_CIRCLE_CLIPPER: "mdl-spinner__circle-clipper", MDL_SPINNER_CIRCLE: "mdl-spinner__circle", MDL_SPINNER_GAP_PATCH: "mdl-spinner__gap-patch", MDL_SPINNER_LEFT: "mdl-spinner__left", MDL_SPINNER_RIGHT: "mdl-spinner__right" };
          MaterialSpinner.prototype.createLayer = function(index) {
            var layer = document.createElement("div");
            layer.classList.add(this.CssClasses_.MDL_SPINNER_LAYER);
            layer.classList.add(this.CssClasses_.MDL_SPINNER_LAYER + "-" + index);
            var leftClipper = document.createElement("div");
            leftClipper.classList.add(this.CssClasses_.MDL_SPINNER_CIRCLE_CLIPPER);
            leftClipper.classList.add(this.CssClasses_.MDL_SPINNER_LEFT);
            var gapPatch = document.createElement("div");
            gapPatch.classList.add(this.CssClasses_.MDL_SPINNER_GAP_PATCH);
            var rightClipper = document.createElement("div");
            rightClipper.classList.add(this.CssClasses_.MDL_SPINNER_CIRCLE_CLIPPER);
            rightClipper.classList.add(this.CssClasses_.MDL_SPINNER_RIGHT);
            var circleOwners = [leftClipper, gapPatch, rightClipper];
            for (var i = 0; i < circleOwners.length; i++) {
              var circle = document.createElement("div");
              circle.classList.add(this.CssClasses_.MDL_SPINNER_CIRCLE);
              circleOwners[i].appendChild(circle);
            }
            layer.appendChild(leftClipper);
            layer.appendChild(gapPatch);
            layer.appendChild(rightClipper);
            this.element_.appendChild(layer);
          };
          MaterialSpinner.prototype["createLayer"] = MaterialSpinner.prototype.createLayer;
          MaterialSpinner.prototype.stop = function() {
            this.element_.classList.remove("is-active");
          };
          MaterialSpinner.prototype["stop"] = MaterialSpinner.prototype.stop;
          MaterialSpinner.prototype.start = function() {
            this.element_.classList.add("is-active");
          };
          MaterialSpinner.prototype["start"] = MaterialSpinner.prototype.start;
          MaterialSpinner.prototype.init = function() {
            if (this.element_) {
              for (var i = 1; i <= this.Constant_.MDL_SPINNER_LAYER_COUNT; i++)
                this.createLayer(i);
              this.element_.classList.add("is-upgraded");
            }
          };
          componentHandler.register({ constructor: MaterialSpinner, classAsString: "MaterialSpinner", cssClass: "mdl-js-spinner", widget: true });
        })();
        (function() {
          var MaterialTextfield = function MaterialTextfield2(element) {
            this.element_ = element;
            this.maxRows = this.Constant_.NO_MAX_ROWS;
            this.init();
          };
          window["MaterialTextfield"] = MaterialTextfield;
          MaterialTextfield.prototype.Constant_ = { NO_MAX_ROWS: -1, MAX_ROWS_ATTRIBUTE: "maxrows" };
          MaterialTextfield.prototype.CssClasses_ = { LABEL: "mdl-textfield__label", INPUT: "mdl-textfield__input", IS_DIRTY: "is-dirty", IS_FOCUSED: "is-focused", IS_DISABLED: "is-disabled", IS_INVALID: "is-invalid", IS_UPGRADED: "is-upgraded", HAS_PLACEHOLDER: "has-placeholder" };
          MaterialTextfield.prototype.onKeyDown_ = function(event) {
            var currentRowCount = event.target.value.split("\n").length;
            if (event.keyCode === 13) {
              if (currentRowCount >= this.maxRows)
                event.preventDefault();
            }
          };
          MaterialTextfield.prototype.onFocus_ = function(event) {
            this.element_.classList.add(this.CssClasses_.IS_FOCUSED);
          };
          MaterialTextfield.prototype.onBlur_ = function(event) {
            this.element_.classList.remove(this.CssClasses_.IS_FOCUSED);
          };
          MaterialTextfield.prototype.onReset_ = function(event) {
            this.updateClasses_();
          };
          MaterialTextfield.prototype.updateClasses_ = function() {
            this.checkDisabled();
            this.checkValidity();
            this.checkDirty();
            this.checkFocus();
          };
          MaterialTextfield.prototype.checkDisabled = function() {
            if (this.input_.disabled)
              this.element_.classList.add(this.CssClasses_.IS_DISABLED);
            else
              this.element_.classList.remove(this.CssClasses_.IS_DISABLED);
          };
          MaterialTextfield.prototype["checkDisabled"] = MaterialTextfield.prototype.checkDisabled;
          MaterialTextfield.prototype.checkFocus = function() {
            if (Boolean(this.element_.querySelector(":focus")))
              this.element_.classList.add(this.CssClasses_.IS_FOCUSED);
            else
              this.element_.classList.remove(this.CssClasses_.IS_FOCUSED);
          };
          MaterialTextfield.prototype["checkFocus"] = MaterialTextfield.prototype.checkFocus;
          MaterialTextfield.prototype.checkValidity = function() {
            if (this.input_.validity)
              if (this.input_.validity.valid)
                this.element_.classList.remove(this.CssClasses_.IS_INVALID);
              else
                this.element_.classList.add(this.CssClasses_.IS_INVALID);
          };
          MaterialTextfield.prototype["checkValidity"] = MaterialTextfield.prototype.checkValidity;
          MaterialTextfield.prototype.checkDirty = function() {
            if (this.input_.value && this.input_.value.length > 0)
              this.element_.classList.add(this.CssClasses_.IS_DIRTY);
            else
              this.element_.classList.remove(this.CssClasses_.IS_DIRTY);
          };
          MaterialTextfield.prototype["checkDirty"] = MaterialTextfield.prototype.checkDirty;
          MaterialTextfield.prototype.disable = function() {
            this.input_.disabled = true;
            this.updateClasses_();
          };
          MaterialTextfield.prototype["disable"] = MaterialTextfield.prototype.disable;
          MaterialTextfield.prototype.enable = function() {
            this.input_.disabled = false;
            this.updateClasses_();
          };
          MaterialTextfield.prototype["enable"] = MaterialTextfield.prototype.enable;
          MaterialTextfield.prototype.change = function(value) {
            this.input_.value = value || "";
            this.updateClasses_();
          };
          MaterialTextfield.prototype["change"] = MaterialTextfield.prototype.change;
          MaterialTextfield.prototype.init = function() {
            if (this.element_) {
              this.label_ = this.element_.querySelector("." + this.CssClasses_.LABEL);
              this.input_ = this.element_.querySelector("." + this.CssClasses_.INPUT);
              if (this.input_) {
                if (this.input_.hasAttribute(this.Constant_.MAX_ROWS_ATTRIBUTE)) {
                  this.maxRows = parseInt(this.input_.getAttribute(this.Constant_.MAX_ROWS_ATTRIBUTE), 10);
                  if (isNaN(this.maxRows))
                    this.maxRows = this.Constant_.NO_MAX_ROWS;
                }
                if (this.input_.hasAttribute("placeholder"))
                  this.element_.classList.add(this.CssClasses_.HAS_PLACEHOLDER);
                this.boundUpdateClassesHandler = this.updateClasses_.bind(this);
                this.boundFocusHandler = this.onFocus_.bind(this);
                this.boundBlurHandler = this.onBlur_.bind(this);
                this.boundResetHandler = this.onReset_.bind(this);
                this.input_.addEventListener("input", this.boundUpdateClassesHandler);
                this.input_.addEventListener("focus", this.boundFocusHandler);
                this.input_.addEventListener("blur", this.boundBlurHandler);
                this.input_.addEventListener("reset", this.boundResetHandler);
                if (this.maxRows !== this.Constant_.NO_MAX_ROWS) {
                  this.boundKeyDownHandler = this.onKeyDown_.bind(this);
                  this.input_.addEventListener("keydown", this.boundKeyDownHandler);
                }
                var invalid = this.element_.classList.contains(this.CssClasses_.IS_INVALID);
                this.updateClasses_();
                this.element_.classList.add(this.CssClasses_.IS_UPGRADED);
                if (invalid)
                  this.element_.classList.add(this.CssClasses_.IS_INVALID);
                if (this.input_.hasAttribute("autofocus")) {
                  this.element_.focus();
                  this.checkFocus();
                }
              }
            }
          };
          componentHandler.register({ constructor: MaterialTextfield, classAsString: "MaterialTextfield", cssClass: "mdl-js-textfield", widget: true });
        })();
        (function() {
          var l, aa = typeof Object.create == "function" ? Object.create : function(a) {
            function b() {
            }
            b.prototype = a;
            return new b();
          }, ba;
          if (typeof Object.setPrototypeOf == "function")
            ba = Object.setPrototypeOf;
          else {
            var ca;
            a: {
              var da = { xb: true }, ea = {};
              try {
                ea.__proto__ = da;
                ca = ea.xb;
                break a;
              } catch (a) {
              }
              ca = false;
            }
            ba = ca ? function(a, b) {
              a.__proto__ = b;
              if (a.__proto__ !== b)
                throw new TypeError(a + " is not extensible");
              return a;
            } : null;
          }
          var fa = ba;
          function m(a, b) {
            a.prototype = aa(b.prototype);
            a.prototype.constructor = a;
            if (fa)
              fa(a, b);
            else
              for (var c in b)
                if (c != "prototype")
                  if (Object.defineProperties) {
                    var d = Object.getOwnPropertyDescriptor(b, c);
                    d && Object.defineProperty(a, c, d);
                  } else
                    a[c] = b[c];
            a.K = b.prototype;
          }
          var ha = typeof Object.defineProperties == "function" ? Object.defineProperty : function(a, b, c) {
            a != Array.prototype && a != Object.prototype && (a[b] = c.value);
          }, ia = typeof window != "undefined" && window === this ? this : typeof global != "undefined" && global != null ? global : this;
          function ja(a, b) {
            if (b) {
              var c = ia;
              a = a.split(".");
              for (var d = 0; d < a.length - 1; d++) {
                var e = a[d];
                e in c || (c[e] = {});
                c = c[e];
              }
              a = a[a.length - 1];
              d = c[a];
              b = b(d);
              b != d && b != null && ha(c, a, { configurable: true, writable: true, value: b });
            }
          }
          ja("Object.is", function(a) {
            return a ? a : function(b, c) {
              return b === c ? b !== 0 || 1 / b === 1 / c : b !== b && c !== c;
            };
          });
          ja("Array.prototype.includes", function(a) {
            return a ? a : function(b, c) {
              var d = this;
              d instanceof String && (d = String(d));
              var e = d.length;
              c = c || 0;
              for (0 > c && (c = Math.max(c + e, 0)); c < e; c++) {
                var f = d[c];
                if (f === b || Object.is(f, b))
                  return true;
              }
              return false;
            };
          });
          var n = this;
          function ka(a) {
            return a !== void 0;
          }
          function q(a) {
            return typeof a == "string";
          }
          var la = /^[\w+/_-]+[=]{0,2}$/, ma = null;
          function na() {
          }
          function oa(a) {
            a.W = void 0;
            a.Xa = function() {
              return a.W ? a.W : a.W = new a();
            };
          }
          function pa(a) {
            var b = typeof a;
            if (b == "object")
              if (a) {
                if (a instanceof Array)
                  return "array";
                if (a instanceof Object)
                  return b;
                var c = Object.prototype.toString.call(a);
                if (c == "[object Window]")
                  return "object";
                if (c == "[object Array]" || typeof a.length == "number" && typeof a.splice != "undefined" && typeof a.propertyIsEnumerable != "undefined" && !a.propertyIsEnumerable("splice"))
                  return "array";
                if (c == "[object Function]" || typeof a.call != "undefined" && typeof a.propertyIsEnumerable != "undefined" && !a.propertyIsEnumerable("call"))
                  return "function";
              } else
                return "null";
            else if (b == "function" && typeof a.call == "undefined")
              return "object";
            return b;
          }
          function qa(a) {
            return pa(a) == "array";
          }
          function ra(a) {
            var b = pa(a);
            return b == "array" || b == "object" && typeof a.length == "number";
          }
          function sa(a) {
            return pa(a) == "function";
          }
          function ta(a) {
            var b = typeof a;
            return b == "object" && a != null || b == "function";
          }
          var ua = "closure_uid_" + (1e9 * Math.random() >>> 0), va = 0;
          function wa(a, b, c) {
            return a.call.apply(a.bind, arguments);
          }
          function xa(a, b, c) {
            if (!a)
              throw Error();
            if (2 < arguments.length) {
              var d = Array.prototype.slice.call(arguments, 2);
              return function() {
                var e = Array.prototype.slice.call(arguments);
                Array.prototype.unshift.apply(e, d);
                return a.apply(b, e);
              };
            }
            return function() {
              return a.apply(b, arguments);
            };
          }
          function r(a, b, c) {
            Function.prototype.bind && Function.prototype.bind.toString().indexOf("native code") != -1 ? r = wa : r = xa;
            return r.apply(null, arguments);
          }
          function za(a, b) {
            var c = Array.prototype.slice.call(arguments, 1);
            return function() {
              var d = c.slice();
              d.push.apply(d, arguments);
              return a.apply(this, d);
            };
          }
          function u(a, b) {
            for (var c in b)
              a[c] = b[c];
          }
          var Aa = Date.now || function() {
            return +new Date();
          };
          function v(a, b) {
            a = a.split(".");
            var c = n;
            a[0] in c || typeof c.execScript == "undefined" || c.execScript("var " + a[0]);
            for (var d; a.length && (d = a.shift()); )
              !a.length && ka(b) ? c[d] = b : c[d] && c[d] !== Object.prototype[d] ? c = c[d] : c = c[d] = {};
          }
          function w(a, b) {
            function c() {
            }
            c.prototype = b.prototype;
            a.K = b.prototype;
            a.prototype = new c();
            a.prototype.constructor = a;
            a.vc = function(d, e, f) {
              for (var g = Array(arguments.length - 2), h = 2; h < arguments.length; h++)
                g[h - 2] = arguments[h];
              return b.prototype[e].apply(d, g);
            };
          }
          function Ba(a) {
            if (Error.captureStackTrace)
              Error.captureStackTrace(this, Ba);
            else {
              var b = Error().stack;
              b && (this.stack = b);
            }
            a && (this.message = String(a));
          }
          w(Ba, Error);
          Ba.prototype.name = "CustomError";
          var Da;
          function Ea(a, b) {
            a = a.split("%s");
            for (var c = "", d = a.length - 1, e = 0; e < d; e++)
              c += a[e] + (e < b.length ? b[e] : "%s");
            Ba.call(this, c + a[d]);
          }
          w(Ea, Ba);
          Ea.prototype.name = "AssertionError";
          function Fa(a, b) {
            throw new Ea("Failure" + (a ? ": " + a : ""), Array.prototype.slice.call(arguments, 1));
          }
          var Ga = Array.prototype.indexOf ? function(a, b) {
            return Array.prototype.indexOf.call(a, b, void 0);
          } : function(a, b) {
            if (q(a))
              return q(b) && b.length == 1 ? a.indexOf(b, 0) : -1;
            for (var c = 0; c < a.length; c++)
              if (c in a && a[c] === b)
                return c;
            return -1;
          }, Ha = Array.prototype.forEach ? function(a, b, c) {
            Array.prototype.forEach.call(a, b, c);
          } : function(a, b, c) {
            for (var d = a.length, e = q(a) ? a.split("") : a, f = 0; f < d; f++)
              f in e && b.call(c, e[f], f, a);
          };
          function Ia(a, b) {
            for (var c = q(a) ? a.split("") : a, d = a.length - 1; 0 <= d; --d)
              d in c && b.call(void 0, c[d], d, a);
          }
          var Ja = Array.prototype.filter ? function(a, b) {
            return Array.prototype.filter.call(a, b, void 0);
          } : function(a, b) {
            for (var c = a.length, d = [], e = 0, f = q(a) ? a.split("") : a, g = 0; g < c; g++)
              if (g in f) {
                var h = f[g];
                b.call(void 0, h, g, a) && (d[e++] = h);
              }
            return d;
          }, Ka = Array.prototype.map ? function(a, b) {
            return Array.prototype.map.call(a, b, void 0);
          } : function(a, b) {
            for (var c = a.length, d = Array(c), e = q(a) ? a.split("") : a, f = 0; f < c; f++)
              f in e && (d[f] = b.call(void 0, e[f], f, a));
            return d;
          }, La = Array.prototype.some ? function(a, b) {
            return Array.prototype.some.call(a, b, void 0);
          } : function(a, b) {
            for (var c = a.length, d = q(a) ? a.split("") : a, e = 0; e < c; e++)
              if (e in d && b.call(void 0, d[e], e, a))
                return true;
            return false;
          };
          function Ma(a, b) {
            return 0 <= Ga(a, b);
          }
          function Na(a, b) {
            b = Ga(a, b);
            var c;
            (c = 0 <= b) && Oa(a, b);
            return c;
          }
          function Oa(a, b) {
            return Array.prototype.splice.call(a, b, 1).length == 1;
          }
          function Pa(a, b) {
            a: {
              for (var c = a.length, d = q(a) ? a.split("") : a, e = 0; e < c; e++)
                if (e in d && b.call(void 0, d[e], e, a)) {
                  b = e;
                  break a;
                }
              b = -1;
            }
            0 <= b && Oa(a, b);
          }
          function Qa(a, b) {
            var c = 0;
            Ia(a, function(d, e) {
              b.call(void 0, d, e, a) && Oa(a, e) && c++;
            });
          }
          function Ra(a) {
            return Array.prototype.concat.apply([], arguments);
          }
          function Sa(a) {
            var b = a.length;
            if (0 < b) {
              for (var c = Array(b), d = 0; d < b; d++)
                c[d] = a[d];
              return c;
            }
            return [];
          }
          function Ta(a, b, c) {
            return 2 >= arguments.length ? Array.prototype.slice.call(a, b) : Array.prototype.slice.call(a, b, c);
          }
          var Ua = String.prototype.trim ? function(a) {
            return a.trim();
          } : function(a) {
            return /^[\s\xa0]*([\s\S]*?)[\s\xa0]*$/.exec(a)[1];
          }, Va = /&/g, Wa = /</g, Xa = />/g, Ya = /"/g, Za = /'/g, $a = /\x00/g, ab = /[\x00&<>"']/;
          function bb(a, b) {
            return a < b ? -1 : a > b ? 1 : 0;
          }
          function cb(a) {
            ab.test(a) && (a.indexOf("&") != -1 && (a = a.replace(Va, "&amp;")), a.indexOf("<") != -1 && (a = a.replace(Wa, "&lt;")), a.indexOf(">") != -1 && (a = a.replace(Xa, "&gt;")), a.indexOf('"') != -1 && (a = a.replace(Ya, "&quot;")), a.indexOf("'") != -1 && (a = a.replace(Za, "&#39;")), a.indexOf("\0") != -1 && (a = a.replace($a, "&#0;")));
            return a;
          }
          function db(a, b, c) {
            for (var d in a)
              b.call(c, a[d], d, a);
          }
          function eb(a) {
            var b = {}, c;
            for (c in a)
              b[c] = a[c];
            return b;
          }
          var fb = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");
          function gb(a, b) {
            for (var c, d, e = 1; e < arguments.length; e++) {
              d = arguments[e];
              for (c in d)
                a[c] = d[c];
              for (var f = 0; f < fb.length; f++)
                c = fb[f], Object.prototype.hasOwnProperty.call(d, c) && (a[c] = d[c]);
            }
          }
          var hb = "StopIteration" in n ? n.StopIteration : { message: "StopIteration", stack: "" };
          function ib() {
          }
          ib.prototype.next = function() {
            throw hb;
          };
          ib.prototype.ha = function() {
            return this;
          };
          function jb(a) {
            if (a instanceof ib)
              return a;
            if (typeof a.ha == "function")
              return a.ha(false);
            if (ra(a)) {
              var b = 0, c = new ib();
              c.next = function() {
                for (; ; ) {
                  if (b >= a.length)
                    throw hb;
                  if (b in a)
                    return a[b++];
                  b++;
                }
              };
              return c;
            }
            throw Error("Not implemented");
          }
          function kb(a, b) {
            if (ra(a))
              try {
                Ha(a, b, void 0);
              } catch (c) {
                if (c !== hb)
                  throw c;
              }
            else {
              a = jb(a);
              try {
                for (; ; )
                  b.call(void 0, a.next(), void 0, a);
              } catch (c$1) {
                if (c$1 !== hb)
                  throw c$1;
              }
            }
          }
          function lb(a) {
            if (ra(a))
              return Sa(a);
            a = jb(a);
            var b = [];
            kb(a, function(c) {
              b.push(c);
            });
            return b;
          }
          function mb(a, b) {
            this.g = {};
            this.a = [];
            this.j = this.h = 0;
            var c = arguments.length;
            if (1 < c) {
              if (c % 2)
                throw Error("Uneven number of arguments");
              for (var d = 0; d < c; d += 2)
                this.set(arguments[d], arguments[d + 1]);
            } else if (a)
              if (a instanceof mb)
                for (c = a.ja(), d = 0; d < c.length; d++)
                  this.set(c[d], a.get(c[d]));
              else
                for (d in a)
                  this.set(d, a[d]);
          }
          l = mb.prototype;
          l.la = function() {
            nb(this);
            for (var a = [], b = 0; b < this.a.length; b++)
              a.push(this.g[this.a[b]]);
            return a;
          };
          l.ja = function() {
            nb(this);
            return this.a.concat();
          };
          l.clear = function() {
            this.g = {};
            this.j = this.h = this.a.length = 0;
          };
          function nb(a) {
            if (a.h != a.a.length) {
              for (var b = 0, c = 0; b < a.a.length; ) {
                var d = a.a[b];
                ob(a.g, d) && (a.a[c++] = d);
                b++;
              }
              a.a.length = c;
            }
            if (a.h != a.a.length) {
              var e = {};
              for (c = b = 0; b < a.a.length; )
                d = a.a[b], ob(e, d) || (a.a[c++] = d, e[d] = 1), b++;
              a.a.length = c;
            }
          }
          l.get = function(a, b) {
            return ob(this.g, a) ? this.g[a] : b;
          };
          l.set = function(a, b) {
            ob(this.g, a) || (this.h++, this.a.push(a), this.j++);
            this.g[a] = b;
          };
          l.forEach = function(a, b) {
            for (var c = this.ja(), d = 0; d < c.length; d++) {
              var e = c[d], f = this.get(e);
              a.call(b, f, e, this);
            }
          };
          l.ha = function(a) {
            nb(this);
            var b = 0, c = this.j, d = this, e = new ib();
            e.next = function() {
              if (c != d.j)
                throw Error("The map has changed since the iterator was created");
              if (b >= d.a.length)
                throw hb;
              var f = d.a[b++];
              return a ? f : d.g[f];
            };
            return e;
          };
          function ob(a, b) {
            return Object.prototype.hasOwnProperty.call(a, b);
          }
          var pb = /^(?:([^:/?#.]+):)?(?:\/\/(?:([^/?#]*)@)?([^/#?]*?)(?::([0-9]+))?(?=[/#?]|$))?([^?#]+)?(?:\?([^#]*))?(?:#([\s\S]*))?$/;
          function qb(a, b) {
            if (a) {
              a = a.split("&");
              for (var c = 0; c < a.length; c++) {
                var d = a[c].indexOf("="), e = null;
                if (0 <= d) {
                  var f = a[c].substring(0, d);
                  e = a[c].substring(d + 1);
                } else
                  f = a[c];
                b(f, e ? decodeURIComponent(e.replace(/\+/g, " ")) : "");
              }
            }
          }
          function rb(a, b, c, d) {
            for (var e = c.length; 0 <= (b = a.indexOf(c, b)) && b < d; ) {
              var f = a.charCodeAt(b - 1);
              if (f == 38 || f == 63) {
                if (f = a.charCodeAt(b + e), !f || f == 61 || f == 38 || f == 35)
                  return b;
              }
              b += e + 1;
            }
            return -1;
          }
          var sb = /#|$/;
          function tb(a, b) {
            var c = a.search(sb), d = rb(a, 0, b, c);
            if (0 > d)
              return null;
            var e = a.indexOf("&", d);
            if (0 > e || e > c)
              e = c;
            d += b.length + 1;
            return decodeURIComponent(a.substr(d, e - d).replace(/\+/g, " "));
          }
          var ub = /[?&]($|#)/;
          function vb(a, b) {
            this.h = this.A = this.j = "";
            this.C = null;
            this.s = this.g = "";
            this.i = false;
            var c;
            a instanceof vb ? (this.i = ka(b) ? b : a.i, wb(this, a.j), this.A = a.A, this.h = a.h, xb(this, a.C), this.g = a.g, yb(this, zb(a.a)), this.s = a.s) : a && (c = String(a).match(pb)) ? (this.i = !!b, wb(this, c[1] || "", true), this.A = Ab(c[2] || ""), this.h = Ab(c[3] || "", true), xb(this, c[4]), this.g = Ab(c[5] || "", true), yb(this, c[6] || "", true), this.s = Ab(c[7] || "")) : (this.i = !!b, this.a = new Bb(null, this.i));
          }
          vb.prototype.toString = function() {
            var a = [], b = this.j;
            b && a.push(Cb(b, Db, true), ":");
            var c = this.h;
            if (c || b == "file")
              a.push("//"), (b = this.A) && a.push(Cb(b, Db, true), "@"), a.push(encodeURIComponent(String(c)).replace(/%25([0-9a-fA-F]{2})/g, "%$1")), c = this.C, c != null && a.push(":", String(c));
            if (c = this.g)
              this.h && c.charAt(0) != "/" && a.push("/"), a.push(Cb(c, c.charAt(0) == "/" ? Eb : Fb, true));
            (c = this.a.toString()) && a.push("?", c);
            (c = this.s) && a.push("#", Cb(c, Gb));
            return a.join("");
          };
          function wb(a, b, c) {
            a.j = c ? Ab(b, true) : b;
            a.j && (a.j = a.j.replace(/:$/, ""));
          }
          function xb(a, b) {
            if (b) {
              b = Number(b);
              if (isNaN(b) || 0 > b)
                throw Error("Bad port number " + b);
              a.C = b;
            } else
              a.C = null;
          }
          function yb(a, b, c) {
            b instanceof Bb ? (a.a = b, Hb(a.a, a.i)) : (c || (b = Cb(b, Ib)), a.a = new Bb(b, a.i));
          }
          function Jb(a) {
            return a instanceof vb ? new vb(a) : new vb(a, void 0);
          }
          function Ab(a, b) {
            return a ? b ? decodeURI(a.replace(/%25/g, "%2525")) : decodeURIComponent(a) : "";
          }
          function Cb(a, b, c) {
            return q(a) ? (a = encodeURI(a).replace(b, Kb), c && (a = a.replace(/%25([0-9a-fA-F]{2})/g, "%$1")), a) : null;
          }
          function Kb(a) {
            a = a.charCodeAt(0);
            return "%" + (a >> 4 & 15).toString(16) + (a & 15).toString(16);
          }
          var Db = /[#\/\?@]/g, Fb = /[#\?:]/g, Eb = /[#\?]/g, Ib = /[#\?@]/g, Gb = /#/g;
          function Bb(a, b) {
            this.g = this.a = null;
            this.h = a || null;
            this.j = !!b;
          }
          function Lb(a) {
            a.a || (a.a = new mb(), a.g = 0, a.h && qb(a.h, function(b, c) {
              a.add(decodeURIComponent(b.replace(/\+/g, " ")), c);
            }));
          }
          l = Bb.prototype;
          l.add = function(a, b) {
            Lb(this);
            this.h = null;
            a = Mb(this, a);
            var c = this.a.get(a);
            c || this.a.set(a, c = []);
            c.push(b);
            this.g += 1;
            return this;
          };
          function Nb(a, b) {
            Lb(a);
            b = Mb(a, b);
            ob(a.a.g, b) && (a.h = null, a.g -= a.a.get(b).length, a = a.a, ob(a.g, b) && (delete a.g[b], a.h--, a.j++, a.a.length > 2 * a.h && nb(a)));
          }
          l.clear = function() {
            this.a = this.h = null;
            this.g = 0;
          };
          function Ob(a, b) {
            Lb(a);
            b = Mb(a, b);
            return ob(a.a.g, b);
          }
          l.forEach = function(a, b) {
            Lb(this);
            this.a.forEach(function(c, d) {
              Ha(c, function(e) {
                a.call(b, e, d, this);
              }, this);
            }, this);
          };
          l.ja = function() {
            Lb(this);
            for (var a = this.a.la(), b = this.a.ja(), c = [], d = 0; d < b.length; d++)
              for (var e = a[d], f = 0; f < e.length; f++)
                c.push(b[d]);
            return c;
          };
          l.la = function(a) {
            Lb(this);
            var b = [];
            if (q(a))
              Ob(this, a) && (b = Ra(b, this.a.get(Mb(this, a))));
            else {
              a = this.a.la();
              for (var c = 0; c < a.length; c++)
                b = Ra(b, a[c]);
            }
            return b;
          };
          l.set = function(a, b) {
            Lb(this);
            this.h = null;
            a = Mb(this, a);
            Ob(this, a) && (this.g -= this.a.get(a).length);
            this.a.set(a, [b]);
            this.g += 1;
            return this;
          };
          l.get = function(a, b) {
            if (!a)
              return b;
            a = this.la(a);
            return 0 < a.length ? String(a[0]) : b;
          };
          l.toString = function() {
            if (this.h)
              return this.h;
            if (!this.a)
              return "";
            for (var a = [], b = this.a.ja(), c = 0; c < b.length; c++) {
              var d = b[c], e = encodeURIComponent(String(d));
              d = this.la(d);
              for (var f = 0; f < d.length; f++) {
                var g = e;
                d[f] !== "" && (g += "=" + encodeURIComponent(String(d[f])));
                a.push(g);
              }
            }
            return this.h = a.join("&");
          };
          function zb(a) {
            var b = new Bb();
            b.h = a.h;
            a.a && (b.a = new mb(a.a), b.g = a.g);
            return b;
          }
          function Mb(a, b) {
            b = String(b);
            a.j && (b = b.toLowerCase());
            return b;
          }
          function Hb(a, b) {
            b && !a.j && (Lb(a), a.h = null, a.a.forEach(function(c, d) {
              var e = d.toLowerCase();
              d != e && (Nb(this, d), Nb(this, e), 0 < c.length && (this.h = null, this.a.set(Mb(this, e), Sa(c)), this.g += c.length));
            }, a));
            a.j = b;
          }
          function Pb(a) {
            this.a = Jb(a);
          }
          function Qb(a, b) {
            b ? a.a.a.set(x.Sa, b) : Nb(a.a.a, x.Sa);
          }
          function Rb(a, b) {
            b !== null ? a.a.a.set(x.Qa, b ? "1" : "0") : Nb(a.a.a, x.Qa);
          }
          function Sb(a) {
            return a.a.a.get(x.Pa) || null;
          }
          function Tb(a, b) {
            b ? a.a.a.set(x.PROVIDER_ID, b) : Nb(a.a.a, x.PROVIDER_ID);
          }
          Pb.prototype.toString = function() {
            return this.a.toString();
          };
          var x = { Pa: "ui_auid", lc: "apiKey", Qa: "ui_sd", ub: "mode", $a: "oobCode", PROVIDER_ID: "ui_pid", Sa: "ui_sid", vb: "tenantId" };
          var Ub;
          a: {
            var Vb = n.navigator;
            if (Vb) {
              var Wb = Vb.userAgent;
              if (Wb) {
                Ub = Wb;
                break a;
              }
            }
            Ub = "";
          }
          function y(a) {
            return Ub.indexOf(a) != -1;
          }
          function Xb() {
            return (y("Chrome") || y("CriOS")) && !y("Edge");
          }
          function Yb(a) {
            Yb[" "](a);
            return a;
          }
          Yb[" "] = na;
          function Zb(a, b) {
            var c = $b;
            return Object.prototype.hasOwnProperty.call(c, a) ? c[a] : c[a] = b(a);
          }
          var ac = y("Opera"), z = y("Trident") || y("MSIE"), bc = y("Edge"), cc = bc || z, dc = y("Gecko") && !(Ub.toLowerCase().indexOf("webkit") != -1 && !y("Edge")) && !(y("Trident") || y("MSIE")) && !y("Edge"), ec = Ub.toLowerCase().indexOf("webkit") != -1 && !y("Edge"), fc = ec && y("Mobile"), gc = y("Macintosh");
          function hc() {
            var a = n.document;
            return a ? a.documentMode : void 0;
          }
          var ic;
          a: {
            var jc = "", kc = function() {
              var a = Ub;
              if (dc)
                return /rv:([^\);]+)(\)|;)/.exec(a);
              if (bc)
                return /Edge\/([\d\.]+)/.exec(a);
              if (z)
                return /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);
              if (ec)
                return /WebKit\/(\S+)/.exec(a);
              if (ac)
                return /(?:Version)[ \/]?(\S+)/.exec(a);
            }();
            kc && (jc = kc ? kc[1] : "");
            if (z) {
              var lc = hc();
              if (lc != null && lc > parseFloat(jc)) {
                ic = String(lc);
                break a;
              }
            }
            ic = jc;
          }
          var $b = {};
          function mc(a) {
            return Zb(a, function() {
              for (var b = 0, c = Ua(String(ic)).split("."), d = Ua(String(a)).split("."), e = Math.max(c.length, d.length), f = 0; b == 0 && f < e; f++) {
                var g = c[f] || "", h = d[f] || "";
                do {
                  g = /(\d*)(\D*)(.*)/.exec(g) || ["", "", "", ""];
                  h = /(\d*)(\D*)(.*)/.exec(h) || ["", "", "", ""];
                  if (g[0].length == 0 && h[0].length == 0)
                    break;
                  b = bb(g[1].length == 0 ? 0 : parseInt(g[1], 10), h[1].length == 0 ? 0 : parseInt(h[1], 10)) || bb(g[2].length == 0, h[2].length == 0) || bb(g[2], h[2]);
                  g = g[3];
                  h = h[3];
                } while (b == 0);
              }
              return 0 <= b;
            });
          }
          var nc;
          var oc = n.document;
          nc = oc && z ? hc() || (oc.compatMode == "CSS1Compat" ? parseInt(ic, 10) : 5) : void 0;
          function pc(a, b) {
            this.a = a === qc && b || "";
            this.g = rc;
          }
          pc.prototype.ma = true;
          pc.prototype.ka = function() {
            return this.a;
          };
          pc.prototype.toString = function() {
            return "Const{" + this.a + "}";
          };
          var rc = {}, qc = {};
          function sc() {
            this.a = "";
            this.h = tc;
          }
          sc.prototype.ma = true;
          sc.prototype.ka = function() {
            return this.a.toString();
          };
          sc.prototype.g = function() {
            return 1;
          };
          sc.prototype.toString = function() {
            return "TrustedResourceUrl{" + this.a + "}";
          };
          function uc(a) {
            if (a instanceof sc && a.constructor === sc && a.h === tc)
              return a.a;
            Fa("expected object of type TrustedResourceUrl, got '" + a + "' of type " + pa(a));
            return "type_error:TrustedResourceUrl";
          }
          function vc() {
            var a = wc;
            a instanceof pc && a.constructor === pc && a.g === rc ? a = a.a : (Fa("expected object of type Const, got '" + a + "'"), a = "type_error:Const");
            var b = new sc();
            b.a = a;
            return b;
          }
          var tc = {};
          function xc() {
            this.a = "";
            this.h = yc;
          }
          xc.prototype.ma = true;
          xc.prototype.ka = function() {
            return this.a.toString();
          };
          xc.prototype.g = function() {
            return 1;
          };
          xc.prototype.toString = function() {
            return "SafeUrl{" + this.a + "}";
          };
          function zc(a) {
            if (a instanceof xc && a.constructor === xc && a.h === yc)
              return a.a;
            Fa("expected object of type SafeUrl, got '" + a + "' of type " + pa(a));
            return "type_error:SafeUrl";
          }
          var Ac = /^(?:(?:https?|mailto|ftp):|[^:/?#]*(?:[/?#]|$))/i;
          function Bc(a) {
            if (a instanceof xc)
              return a;
            a = typeof a == "object" && a.ma ? a.ka() : String(a);
            Ac.test(a) || (a = "about:invalid#zClosurez");
            return Cc(a);
          }
          function Dc(a) {
            if (a instanceof xc)
              return a;
            a = typeof a == "object" && a.ma ? a.ka() : String(a);
            Ac.test(a) || (a = "about:invalid#zClosurez");
            return Cc(a);
          }
          var yc = {};
          function Cc(a) {
            var b = new xc();
            b.a = a;
            return b;
          }
          Cc("about:blank");
          function Ec() {
            this.a = "";
            this.g = Fc;
          }
          Ec.prototype.ma = true;
          var Fc = {};
          Ec.prototype.ka = function() {
            return this.a;
          };
          Ec.prototype.toString = function() {
            return "SafeStyle{" + this.a + "}";
          };
          function Gc() {
            this.a = "";
            this.j = Hc;
            this.h = null;
          }
          Gc.prototype.g = function() {
            return this.h;
          };
          Gc.prototype.ma = true;
          Gc.prototype.ka = function() {
            return this.a.toString();
          };
          Gc.prototype.toString = function() {
            return "SafeHtml{" + this.a + "}";
          };
          function Ic(a) {
            if (a instanceof Gc && a.constructor === Gc && a.j === Hc)
              return a.a;
            Fa("expected object of type SafeHtml, got '" + a + "' of type " + pa(a));
            return "type_error:SafeHtml";
          }
          var Hc = {};
          function Jc(a, b) {
            var c = new Gc();
            c.a = a;
            c.h = b;
            return c;
          }
          Jc("<!DOCTYPE html>", 0);
          var Kc = Jc("", 0);
          Jc("<br>", 0);
          var Lc = function(a) {
            var b = false, c;
            return function() {
              b || (c = a(), b = true);
              return c;
            };
          }(function() {
            if (typeof document === "undefined")
              return false;
            var a = document.createElement("div"), b = document.createElement("div");
            b.appendChild(document.createElement("div"));
            a.appendChild(b);
            if (!a.firstChild)
              return false;
            b = a.firstChild.firstChild;
            a.innerHTML = Ic(Kc);
            return !b.parentElement;
          });
          function Mc(a, b) {
            a.src = uc(b);
            if (ma === null)
              b: {
                b = n.document;
                if ((b = b.querySelector && b.querySelector("script[nonce]")) && (b = b.nonce || b.getAttribute("nonce")) && la.test(b)) {
                  ma = b;
                  break b;
                }
                ma = "";
              }
            b = ma;
            b && a.setAttribute("nonce", b);
          }
          function Nc(a, b) {
            b = b instanceof xc ? b : Dc(b);
            a.assign(zc(b));
          }
          function Oc(a, b) {
            this.a = ka(a) ? a : 0;
            this.g = ka(b) ? b : 0;
          }
          Oc.prototype.toString = function() {
            return "(" + this.a + ", " + this.g + ")";
          };
          Oc.prototype.ceil = function() {
            this.a = Math.ceil(this.a);
            this.g = Math.ceil(this.g);
            return this;
          };
          Oc.prototype.floor = function() {
            this.a = Math.floor(this.a);
            this.g = Math.floor(this.g);
            return this;
          };
          Oc.prototype.round = function() {
            this.a = Math.round(this.a);
            this.g = Math.round(this.g);
            return this;
          };
          function Pc(a, b) {
            this.width = a;
            this.height = b;
          }
          l = Pc.prototype;
          l.toString = function() {
            return "(" + this.width + " x " + this.height + ")";
          };
          l.aspectRatio = function() {
            return this.width / this.height;
          };
          l.ceil = function() {
            this.width = Math.ceil(this.width);
            this.height = Math.ceil(this.height);
            return this;
          };
          l.floor = function() {
            this.width = Math.floor(this.width);
            this.height = Math.floor(this.height);
            return this;
          };
          l.round = function() {
            this.width = Math.round(this.width);
            this.height = Math.round(this.height);
            return this;
          };
          function Qc(a) {
            return a ? new Rc(Sc(a)) : Da || (Da = new Rc());
          }
          function Tc(a, b) {
            var c = b || document;
            return c.querySelectorAll && c.querySelector ? c.querySelectorAll("." + a) : Uc(document, a, b);
          }
          function Vc(a, b) {
            var c = b || document;
            if (c.getElementsByClassName)
              a = c.getElementsByClassName(a)[0];
            else {
              c = document;
              var d = b || c;
              a = d.querySelectorAll && d.querySelector && a ? d.querySelector(a ? "." + a : "") : Uc(c, a, b)[0] || null;
            }
            return a || null;
          }
          function Uc(a, b, c) {
            var d;
            a = c || a;
            if (a.querySelectorAll && a.querySelector && b)
              return a.querySelectorAll(b ? "." + b : "");
            if (b && a.getElementsByClassName) {
              var e = a.getElementsByClassName(b);
              return e;
            }
            e = a.getElementsByTagName("*");
            if (b) {
              var f = {};
              for (c = d = 0; a = e[c]; c++) {
                var g = a.className;
                typeof g.split == "function" && Ma(g.split(/\s+/), b) && (f[d++] = a);
              }
              f.length = d;
              return f;
            }
            return e;
          }
          function Wc(a, b) {
            db(b, function(c, d) {
              c && typeof c == "object" && c.ma && (c = c.ka());
              d == "style" ? a.style.cssText = c : d == "class" ? a.className = c : d == "for" ? a.htmlFor = c : Xc.hasOwnProperty(d) ? a.setAttribute(Xc[d], c) : d.lastIndexOf("aria-", 0) == 0 || d.lastIndexOf("data-", 0) == 0 ? a.setAttribute(d, c) : a[d] = c;
            });
          }
          var Xc = {
            cellpadding: "cellPadding",
            cellspacing: "cellSpacing",
            colspan: "colSpan",
            frameborder: "frameBorder",
            height: "height",
            maxlength: "maxLength",
            nonce: "nonce",
            role: "role",
            rowspan: "rowSpan",
            type: "type",
            usemap: "useMap",
            valign: "vAlign",
            width: "width"
          };
          function Yc(a) {
            return a.scrollingElement ? a.scrollingElement : ec || a.compatMode != "CSS1Compat" ? a.body || a.documentElement : a.documentElement;
          }
          function Zc(a) {
            a && a.parentNode && a.parentNode.removeChild(a);
          }
          function Sc(a) {
            return a.nodeType == 9 ? a : a.ownerDocument || a.document;
          }
          function $c(a, b) {
            if ("textContent" in a)
              a.textContent = b;
            else if (a.nodeType == 3)
              a.data = String(b);
            else if (a.firstChild && a.firstChild.nodeType == 3) {
              for (; a.lastChild != a.firstChild; )
                a.removeChild(a.lastChild);
              a.firstChild.data = String(b);
            } else {
              for (var c; c = a.firstChild; )
                a.removeChild(c);
              a.appendChild(Sc(a).createTextNode(String(b)));
            }
          }
          function ad(a, b) {
            return b ? bd(a, function(c) {
              return !b || q(c.className) && Ma(c.className.split(/\s+/), b);
            }) : null;
          }
          function bd(a, b) {
            for (var c = 0; a; ) {
              if (b(a))
                return a;
              a = a.parentNode;
              c++;
            }
            return null;
          }
          function Rc(a) {
            this.a = a || n.document || document;
          }
          Rc.prototype.N = function() {
            return q(void 0) ? this.a.getElementById(void 0) : void 0;
          };
          var cd = { Fc: true }, dd = { Hc: true }, ed = { Ec: true }, fd = { Gc: true };
          function gd() {
            throw Error("Do not instantiate directly");
          }
          gd.prototype.va = null;
          gd.prototype.toString = function() {
            return this.content;
          };
          function hd(a, b, c, d) {
            a = a(b || id, void 0, c);
            d = (d || Qc()).a.createElement("DIV");
            a = jd(a);
            a.match(kd);
            a = Jc(a, null);
            if (Lc())
              for (; d.lastChild; )
                d.removeChild(d.lastChild);
            d.innerHTML = Ic(a);
            d.childNodes.length == 1 && (a = d.firstChild, a.nodeType == 1 && (d = a));
            return d;
          }
          function jd(a) {
            if (!ta(a))
              return cb(String(a));
            if (a instanceof gd) {
              if (a.fa === cd)
                return a.content;
              if (a.fa === fd)
                return cb(a.content);
            }
            Fa("Soy template output is unsafe for use as HTML: " + a);
            return "zSoyz";
          }
          var kd = /^<(body|caption|col|colgroup|head|html|tr|td|th|tbody|thead|tfoot)>/i, id = {};
          function nd(a) {
            if (a != null)
              switch (a.va) {
                case 1:
                  return 1;
                case -1:
                  return -1;
                case 0:
                  return 0;
              }
            return null;
          }
          function od() {
            gd.call(this);
          }
          w(od, gd);
          od.prototype.fa = cd;
          function A(a) {
            return a != null && a.fa === cd ? a : a instanceof Gc ? B(Ic(a).toString(), a.g()) : B(cb(String(String(a))), nd(a));
          }
          function pd() {
            gd.call(this);
          }
          w(pd, gd);
          pd.prototype.fa = dd;
          pd.prototype.va = 1;
          function qd(a, b) {
            this.content = String(a);
            this.va = b != null ? b : null;
          }
          w(qd, gd);
          qd.prototype.fa = fd;
          function C(a) {
            return new qd(a, void 0);
          }
          var B = function(a) {
            function b(c) {
              this.content = c;
            }
            b.prototype = a.prototype;
            return function(c, d) {
              c = new b(String(c));
              d !== void 0 && (c.va = d);
              return c;
            };
          }(od), rd = function(a) {
            function b(c) {
              this.content = c;
            }
            b.prototype = a.prototype;
            return function(c) {
              return new b(String(c));
            };
          }(pd);
          function sd(a) {
            function b() {
            }
            var c = { label: D("New password") };
            b.prototype = a;
            a = new b();
            for (var d in c)
              a[d] = c[d];
            return a;
          }
          function D(a) {
            return (a = String(a)) ? new qd(a, void 0) : "";
          }
          var td = function(a) {
            function b(c) {
              this.content = c;
            }
            b.prototype = a.prototype;
            return function(c, d) {
              c = String(c);
              if (!c)
                return "";
              c = new b(c);
              d !== void 0 && (c.va = d);
              return c;
            };
          }(od);
          function ud(a) {
            return a != null && a.fa === cd ? String(String(a.content).replace(vd, "").replace(wd, "&lt;")).replace(xd, yd) : cb(String(a));
          }
          function zd(a) {
            a != null && a.fa === dd ? a = String(a).replace(Ad, Bd) : a instanceof xc ? a = String(zc(a).toString()).replace(Ad, Bd) : (a = String(a), Cd.test(a) ? a = a.replace(Ad, Bd) : (Fa("Bad value `%s` for |filterNormalizeUri", [a]), a = "#zSoyz"));
            return a;
          }
          function Dd(a) {
            a != null && a.fa === ed ? a = a.content : a == null ? a = "" : a instanceof Ec ? a instanceof Ec && a.constructor === Ec && a.g === Fc ? a = a.a : (Fa("expected object of type SafeStyle, got '" + a + "' of type " + pa(a)), a = "type_error:SafeStyle") : (a = String(a), Ed.test(a) || (Fa("Bad value `%s` for |filterCssValue", [a]), a = "zSoyz"));
            return a;
          }
          var Fd = {
            "\0": "&#0;",
            "	": "&#9;",
            "\n": "&#10;",
            "\v": "&#11;",
            "\f": "&#12;",
            "\r": "&#13;",
            " ": "&#32;",
            '"': "&quot;",
            "&": "&amp;",
            "'": "&#39;",
            "-": "&#45;",
            "/": "&#47;",
            "<": "&lt;",
            "=": "&#61;",
            ">": "&gt;",
            "`": "&#96;",
            "\x85": "&#133;",
            "\xA0": "&#160;",
            "\u2028": "&#8232;",
            "\u2029": "&#8233;"
          };
          function yd(a) {
            return Fd[a];
          }
          var Gd = {
            "\0": "%00",
            "": "%01",
            "": "%02",
            "": "%03",
            "": "%04",
            "": "%05",
            "": "%06",
            "\x07": "%07",
            "\b": "%08",
            "	": "%09",
            "\n": "%0A",
            "\v": "%0B",
            "\f": "%0C",
            "\r": "%0D",
            "": "%0E",
            "": "%0F",
            "": "%10",
            "": "%11",
            "": "%12",
            "": "%13",
            "": "%14",
            "": "%15",
            "": "%16",
            "": "%17",
            "": "%18",
            "": "%19",
            "": "%1A",
            "\x1B": "%1B",
            "": "%1C",
            "": "%1D",
            "": "%1E",
            "": "%1F",
            " ": "%20",
            '"': "%22",
            "'": "%27",
            "(": "%28",
            ")": "%29",
            "<": "%3C",
            ">": "%3E",
            "\\": "%5C",
            "{": "%7B",
            "}": "%7D",
            "\x7F": "%7F",
            "\x85": "%C2%85",
            "\xA0": "%C2%A0",
            "\u2028": "%E2%80%A8",
            "\u2029": "%E2%80%A9",
            "\uFF01": "%EF%BC%81",
            "\uFF03": "%EF%BC%83",
            "\uFF04": "%EF%BC%84",
            "\uFF06": "%EF%BC%86",
            "\uFF07": "%EF%BC%87",
            "\uFF08": "%EF%BC%88",
            "\uFF09": "%EF%BC%89",
            "\uFF0A": "%EF%BC%8A",
            "\uFF0B": "%EF%BC%8B",
            "\uFF0C": "%EF%BC%8C",
            "\uFF0F": "%EF%BC%8F",
            "\uFF1A": "%EF%BC%9A",
            "\uFF1B": "%EF%BC%9B",
            "\uFF1D": "%EF%BC%9D",
            "\uFF1F": "%EF%BC%9F",
            "\uFF20": "%EF%BC%A0",
            "\uFF3B": "%EF%BC%BB",
            "\uFF3D": "%EF%BC%BD"
          };
          function Bd(a) {
            return Gd[a];
          }
          var xd = /[\x00\x22\x27\x3c\x3e]/g, Ad = /[\x00- \x22\x27-\x29\x3c\x3e\\\x7b\x7d\x7f\x85\xa0\u2028\u2029\uff01\uff03\uff04\uff06-\uff0c\uff0f\uff1a\uff1b\uff1d\uff1f\uff20\uff3b\uff3d]/g, Ed = /^(?!-*(?:expression|(?:moz-)?binding))(?:[.#]?-?(?:[_a-z0-9-]+)(?:-[_a-z0-9-]+)*-?|-?(?:[0-9]+(?:\.[0-9]*)?|\.[0-9]+)(?:[a-z]{1,2}|%)?|!important|)$/i, Cd = /^(?![^#?]*\/(?:\.|%2E){2}(?:[\/?#]|$))(?:(?:https?|mailto):|[^&:\/?#]*(?:[\/?#]|$))/i, vd = /<(?:!|\/?([a-zA-Z][a-zA-Z0-9:\-]*))(?:[^>'"]|"[^"]*"|'[^']*')*>/g, wd = /</g;
          function Hd() {
            return C("Enter a valid phone number");
          }
          function Id() {
            return C("Unable to send password reset code to specified email");
          }
          function Jd() {
            return C("Something went wrong. Please try again.");
          }
          function Kd() {
            return C("This email already exists without any means of sign-in. Please reset the password to recover.");
          }
          function Ld(a) {
            a = a || {};
            var b = "";
            switch (a.code) {
              case "invalid-argument":
                b += "Client specified an invalid argument.";
                break;
              case "invalid-configuration":
                b += "Client specified an invalid project configuration.";
                break;
              case "failed-precondition":
                b += "Request can not be executed in the current system state.";
                break;
              case "out-of-range":
                b += "Client specified an invalid range.";
                break;
              case "unauthenticated":
                b += "Request not authenticated due to missing, invalid, or expired OAuth token.";
                break;
              case "permission-denied":
                b += "Client does not have sufficient permission.";
                break;
              case "not-found":
                b += "Specified resource is not found.";
                break;
              case "aborted":
                b += "Concurrency conflict, such as read-modify-write conflict.";
                break;
              case "already-exists":
                b += "The resource that a client tried to create already exists.";
                break;
              case "resource-exhausted":
                b += "Either out of resource quota or reaching rate limiting.";
                break;
              case "cancelled":
                b += "Request cancelled by the client.";
                break;
              case "data-loss":
                b += "Unrecoverable data loss or data corruption.";
                break;
              case "unknown":
                b += "Unknown server error.";
                break;
              case "internal":
                b += "Internal server error.";
                break;
              case "not-implemented":
                b += "API method not implemented by the server.";
                break;
              case "unavailable":
                b += "Service unavailable.";
                break;
              case "deadline-exceeded":
                b += "Request deadline exceeded.";
                break;
              case "auth/user-disabled":
                b += "The user account has been disabled by an administrator.";
                break;
              case "auth/timeout":
                b += "The operation has timed out.";
                break;
              case "auth/too-many-requests":
                b += "We have blocked all requests from this device due to unusual activity. Try again later.";
                break;
              case "auth/quota-exceeded":
                b += "The quota for this operation has been exceeded. Try again later.";
                break;
              case "auth/network-request-failed":
                b += "A network error has occurred. Try again later.";
                break;
              case "restart-process":
                b += "An issue was encountered when authenticating your request. Please visit the URL that redirected you to this page again to restart the authentication process.";
                break;
              case "no-matching-tenant-for-email":
                b += "No sign-in provider is available for the given email, please try with a different email.";
            }
            return C(b);
          }
          function Md() {
            return C("Please login again to perform this operation");
          }
          function Nd(a, b, c) {
            var d = Error.call(this);
            this.message = d.message;
            "stack" in d && (this.stack = d.stack);
            this.code = Od + a;
            if (!(a = b)) {
              a = "";
              switch (this.code) {
                case "firebaseui/merge-conflict":
                  a += "The current anonymous user failed to upgrade. The non-anonymous credential is already associated with a different user account.";
                  break;
                default:
                  a += Jd();
              }
              a = C(a).toString();
            }
            this.message = a || "";
            this.credential = c || null;
          }
          m(Nd, Error);
          Nd.prototype.toJSON = function() {
            return {
              code: this.code,
              message: this.message
            };
          };
          var Od = "firebaseui/";
          function Pd() {
            Qd != 0 && (Rd[this[ua] || (this[ua] = ++va)] = this);
            this.T = this.T;
            this.C = this.C;
          }
          var Qd = 0, Rd = {};
          Pd.prototype.T = false;
          Pd.prototype.m = function() {
            if (!this.T && (this.T = true, this.o(), Qd != 0)) {
              var a = this[ua] || (this[ua] = ++va);
              if (Qd != 0 && this.C && 0 < this.C.length)
                throw Error(this + " did not empty its onDisposeCallbacks queue. This probably means it overrode dispose() or disposeInternal() without calling the superclass' method.");
              delete Rd[a];
            }
          };
          function Sd(a, b) {
            a.T ? ka(void 0) ? b.call(void 0) : b() : (a.C || (a.C = []), a.C.push(ka(void 0) ? r(b, void 0) : b));
          }
          Pd.prototype.o = function() {
            if (this.C)
              for (; this.C.length; )
                this.C.shift()();
          };
          function Td(a) {
            a && typeof a.m == "function" && a.m();
          }
          var Ud = Object.freeze || function(a) {
            return a;
          };
          var Vd = !z || 9 <= Number(nc), Wd = z && !mc("9"), Xd = function() {
            if (!n.addEventListener || !Object.defineProperty)
              return false;
            var a = false, b = Object.defineProperty({}, "passive", { get: function() {
              a = true;
            } });
            try {
              n.addEventListener("test", na, b), n.removeEventListener("test", na, b);
            } catch (c) {
            }
            return a;
          }();
          function Yd(a, b) {
            this.type = a;
            this.g = this.target = b;
            this.h = false;
            this.qb = true;
          }
          Yd.prototype.stopPropagation = function() {
            this.h = true;
          };
          Yd.prototype.preventDefault = function() {
            this.qb = false;
          };
          function Zd(a, b) {
            Yd.call(this, a ? a.type : "");
            this.relatedTarget = this.g = this.target = null;
            this.button = this.screenY = this.screenX = this.clientY = this.clientX = 0;
            this.key = "";
            this.j = this.keyCode = 0;
            this.metaKey = this.shiftKey = this.altKey = this.ctrlKey = false;
            this.pointerId = 0;
            this.pointerType = "";
            this.a = null;
            if (a) {
              var c = this.type = a.type, d = a.changedTouches && a.changedTouches.length ? a.changedTouches[0] : null;
              this.target = a.target || a.srcElement;
              this.g = b;
              if (b = a.relatedTarget) {
                if (dc) {
                  a: {
                    try {
                      Yb(b.nodeName);
                      var e = true;
                      break a;
                    } catch (f) {
                    }
                    e = false;
                  }
                  e || (b = null);
                }
              } else
                c == "mouseover" ? b = a.fromElement : c == "mouseout" && (b = a.toElement);
              this.relatedTarget = b;
              d ? (this.clientX = d.clientX !== void 0 ? d.clientX : d.pageX, this.clientY = d.clientY !== void 0 ? d.clientY : d.pageY, this.screenX = d.screenX || 0, this.screenY = d.screenY || 0) : (this.clientX = a.clientX !== void 0 ? a.clientX : a.pageX, this.clientY = a.clientY !== void 0 ? a.clientY : a.pageY, this.screenX = a.screenX || 0, this.screenY = a.screenY || 0);
              this.button = a.button;
              this.keyCode = a.keyCode || 0;
              this.key = a.key || "";
              this.j = a.charCode || (c == "keypress" ? a.keyCode : 0);
              this.ctrlKey = a.ctrlKey;
              this.altKey = a.altKey;
              this.shiftKey = a.shiftKey;
              this.metaKey = a.metaKey;
              this.pointerId = a.pointerId || 0;
              this.pointerType = q(a.pointerType) ? a.pointerType : $d[a.pointerType] || "";
              this.a = a;
              a.defaultPrevented && this.preventDefault();
            }
          }
          w(Zd, Yd);
          var $d = Ud({ 2: "touch", 3: "pen", 4: "mouse" });
          Zd.prototype.stopPropagation = function() {
            Zd.K.stopPropagation.call(this);
            this.a.stopPropagation ? this.a.stopPropagation() : this.a.cancelBubble = true;
          };
          Zd.prototype.preventDefault = function() {
            Zd.K.preventDefault.call(this);
            var a = this.a;
            if (a.preventDefault)
              a.preventDefault();
            else if (a.returnValue = false, Wd)
              try {
                if (a.ctrlKey || 112 <= a.keyCode && 123 >= a.keyCode)
                  a.keyCode = -1;
              } catch (b) {
              }
          };
          var ae = "closure_listenable_" + (1e6 * Math.random() | 0), be = 0;
          function ce(a, b, c, d, e) {
            this.listener = a;
            this.proxy = null;
            this.src = b;
            this.type = c;
            this.capture = !!d;
            this.La = e;
            this.key = ++be;
            this.sa = this.Ia = false;
          }
          function de(a) {
            a.sa = true;
            a.listener = null;
            a.proxy = null;
            a.src = null;
            a.La = null;
          }
          function ee(a) {
            this.src = a;
            this.a = {};
            this.g = 0;
          }
          ee.prototype.add = function(a, b, c, d, e) {
            var f = a.toString();
            a = this.a[f];
            a || (a = this.a[f] = [], this.g++);
            var g = fe(a, b, d, e);
            -1 < g ? (b = a[g], c || (b.Ia = false)) : (b = new ce(b, this.src, f, !!d, e), b.Ia = c, a.push(b));
            return b;
          };
          function ge(a, b) {
            var c = b.type;
            c in a.a && Na(a.a[c], b) && (de(b), a.a[c].length == 0 && (delete a.a[c], a.g--));
          }
          function fe(a, b, c, d) {
            for (var e = 0; e < a.length; ++e) {
              var f = a[e];
              if (!f.sa && f.listener == b && f.capture == !!c && f.La == d)
                return e;
            }
            return -1;
          }
          var he = "closure_lm_" + (1e6 * Math.random() | 0), ie = {}, je = 0;
          function ke(a, b, c, d, e) {
            if (d && d.once)
              return le(a, b, c, d, e);
            if (qa(b)) {
              for (var f = 0; f < b.length; f++)
                ke(a, b[f], c, d, e);
              return null;
            }
            c = me(c);
            return a && a[ae] ? a.J.add(String(b), c, false, ta(d) ? !!d.capture : !!d, e) : ne(a, b, c, false, d, e);
          }
          function ne(a, b, c, d, e, f) {
            if (!b)
              throw Error("Invalid event type");
            var g = ta(e) ? !!e.capture : !!e, h = oe(a);
            h || (a[he] = h = new ee(a));
            c = h.add(b, c, d, g, f);
            if (c.proxy)
              return c;
            d = pe();
            c.proxy = d;
            d.src = a;
            d.listener = c;
            if (a.addEventListener)
              Xd || (e = g), e === void 0 && (e = false), a.addEventListener(b.toString(), d, e);
            else if (a.attachEvent)
              a.attachEvent(qe(b.toString()), d);
            else if (a.addListener && a.removeListener)
              a.addListener(d);
            else
              throw Error("addEventListener and attachEvent are unavailable.");
            je++;
            return c;
          }
          function pe() {
            var a = re, b = Vd ? function(c) {
              return a.call(b.src, b.listener, c);
            } : function(c) {
              c = a.call(b.src, b.listener, c);
              if (!c)
                return c;
            };
            return b;
          }
          function le(a, b, c, d, e) {
            if (qa(b)) {
              for (var f = 0; f < b.length; f++)
                le(a, b[f], c, d, e);
              return null;
            }
            c = me(c);
            return a && a[ae] ? a.J.add(String(b), c, true, ta(d) ? !!d.capture : !!d, e) : ne(a, b, c, true, d, e);
          }
          function se(a, b, c, d, e) {
            if (qa(b))
              for (var f = 0; f < b.length; f++)
                se(a, b[f], c, d, e);
            else
              (d = ta(d) ? !!d.capture : !!d, c = me(c), a && a[ae]) ? (a = a.J, b = String(b).toString(), b in a.a && (f = a.a[b], c = fe(f, c, d, e), -1 < c && (de(f[c]), Oa(f, c), f.length == 0 && (delete a.a[b], a.g--)))) : a && (a = oe(a)) && (b = a.a[b.toString()], a = -1, b && (a = fe(b, c, d, e)), (c = -1 < a ? b[a] : null) && te(c));
          }
          function te(a) {
            if (typeof a != "number" && a && !a.sa) {
              var b = a.src;
              if (b && b[ae])
                ge(b.J, a);
              else {
                var c = a.type, d = a.proxy;
                b.removeEventListener ? b.removeEventListener(c, d, a.capture) : b.detachEvent ? b.detachEvent(qe(c), d) : b.addListener && b.removeListener && b.removeListener(d);
                je--;
                (c = oe(b)) ? (ge(c, a), c.g == 0 && (c.src = null, b[he] = null)) : de(a);
              }
            }
          }
          function qe(a) {
            return a in ie ? ie[a] : ie[a] = "on" + a;
          }
          function ue(a, b, c, d) {
            var e = true;
            if (a = oe(a)) {
              if (b = a.a[b.toString()])
                for (b = b.concat(), a = 0; a < b.length; a++) {
                  var f = b[a];
                  f && f.capture == c && !f.sa && (f = ve(f, d), e = e && f !== false);
                }
            }
            return e;
          }
          function ve(a, b) {
            var c = a.listener, d = a.La || a.src;
            a.Ia && te(a);
            return c.call(d, b);
          }
          function re(a, b) {
            if (a.sa)
              return true;
            if (!Vd) {
              if (!b)
                a: {
                  b = ["window", "event"];
                  for (var c = n, d = 0; d < b.length; d++)
                    if (c = c[b[d]], c == null) {
                      b = null;
                      break a;
                    }
                  b = c;
                }
              d = b;
              b = new Zd(d, this);
              c = true;
              if (!(0 > d.keyCode || d.returnValue != void 0)) {
                a: {
                  var e = false;
                  if (d.keyCode == 0)
                    try {
                      d.keyCode = -1;
                      break a;
                    } catch (g) {
                      e = true;
                    }
                  if (e || d.returnValue == void 0)
                    d.returnValue = true;
                }
                d = [];
                for (e = b.g; e; e = e.parentNode)
                  d.push(e);
                a = a.type;
                for (e = d.length - 1; !b.h && 0 <= e; e--) {
                  b.g = d[e];
                  var f = ue(d[e], a, true, b);
                  c = c && f;
                }
                for (e = 0; !b.h && e < d.length; e++)
                  b.g = d[e], f = ue(d[e], a, false, b), c = c && f;
              }
              return c;
            }
            return ve(a, new Zd(b, this));
          }
          function oe(a) {
            a = a[he];
            return a instanceof ee ? a : null;
          }
          var we = "__closure_events_fn_" + (1e9 * Math.random() >>> 0);
          function me(a) {
            if (sa(a))
              return a;
            a[we] || (a[we] = function(b) {
              return a.handleEvent(b);
            });
            return a[we];
          }
          function E() {
            Pd.call(this);
            this.J = new ee(this);
            this.wb = this;
            this.Ha = null;
          }
          w(E, Pd);
          E.prototype[ae] = true;
          E.prototype.Za = function(a) {
            this.Ha = a;
          };
          E.prototype.removeEventListener = function(a, b, c, d) {
            se(this, a, b, c, d);
          };
          function xe(a, b) {
            var c, d = a.Ha;
            if (d)
              for (c = []; d; d = d.Ha)
                c.push(d);
            a = a.wb;
            d = b.type || b;
            if (q(b))
              b = new Yd(b, a);
            else if (b instanceof Yd)
              b.target = b.target || a;
            else {
              var e = b;
              b = new Yd(d, a);
              gb(b, e);
            }
            e = true;
            if (c)
              for (var f = c.length - 1; !b.h && 0 <= f; f--) {
                var g = b.g = c[f];
                e = ye(g, d, true, b) && e;
              }
            b.h || (g = b.g = a, e = ye(g, d, true, b) && e, b.h || (e = ye(g, d, false, b) && e));
            if (c)
              for (f = 0; !b.h && f < c.length; f++)
                g = b.g = c[f], e = ye(g, d, false, b) && e;
            return e;
          }
          E.prototype.o = function() {
            E.K.o.call(this);
            if (this.J) {
              var a = this.J, b = 0, c;
              for (c in a.a) {
                for (var d = a.a[c], e = 0; e < d.length; e++)
                  ++b, de(d[e]);
                delete a.a[c];
                a.g--;
              }
            }
            this.Ha = null;
          };
          function ye(a, b, c, d) {
            b = a.J.a[String(b)];
            if (!b)
              return true;
            b = b.concat();
            for (var e = true, f = 0; f < b.length; ++f) {
              var g = b[f];
              if (g && !g.sa && g.capture == c) {
                var h = g.listener, k = g.La || g.src;
                g.Ia && ge(a.J, g);
                e = h.call(k, d) !== false && e;
              }
            }
            return e && d.qb != 0;
          }
          var ze = {}, Ae = 0;
          function Be(a, b) {
            if (!a)
              throw Error("Event target element must be provided!");
            a = Ce(a);
            if (ze[a] && ze[a].length)
              for (var c = 0; c < ze[a].length; c++)
                xe(ze[a][c], b);
          }
          function De(a) {
            var b = Ce(a.N());
            ze[b] && ze[b].length && (Pa(ze[b], function(c) {
              return c == a;
            }), ze[b].length || delete ze[b]);
          }
          function Ce(a) {
            typeof a.a === "undefined" && (a.a = Ae, Ae++);
            return a.a;
          }
          function Ee(a) {
            if (!a)
              throw Error("Event target element must be provided!");
            E.call(this);
            this.a = a;
          }
          m(Ee, E);
          Ee.prototype.N = function() {
            return this.a;
          };
          Ee.prototype.register = function() {
            var a = Ce(this.N());
            ze[a] ? Ma(ze[a], this) || ze[a].push(this) : ze[a] = [this];
          };
          function Fe(a) {
            if (!a)
              return false;
            try {
              return !!a.$goog_Thenable;
            } catch (b) {
              return false;
            }
          }
          function Ge(a, b) {
            this.h = a;
            this.j = b;
            this.g = 0;
            this.a = null;
          }
          Ge.prototype.get = function() {
            if (0 < this.g) {
              this.g--;
              var a = this.a;
              this.a = a.next;
              a.next = null;
            } else
              a = this.h();
            return a;
          };
          function He(a, b) {
            a.j(b);
            100 > a.g && (a.g++, b.next = a.a, a.a = b);
          }
          function Ie() {
            this.g = this.a = null;
          }
          var Ke = new Ge(function() {
            return new Je();
          }, function(a) {
            a.reset();
          });
          Ie.prototype.add = function(a, b) {
            var c = Ke.get();
            c.set(a, b);
            this.g ? this.g.next = c : this.a = c;
            this.g = c;
          };
          function Le() {
            var a = Me, b = null;
            a.a && (b = a.a, a.a = a.a.next, a.a || (a.g = null), b.next = null);
            return b;
          }
          function Je() {
            this.next = this.g = this.a = null;
          }
          Je.prototype.set = function(a, b) {
            this.a = a;
            this.g = b;
            this.next = null;
          };
          Je.prototype.reset = function() {
            this.next = this.g = this.a = null;
          };
          function Ne(a) {
            n.setTimeout(function() {
              throw a;
            }, 0);
          }
          var Oe;
          function Pe() {
            var a = n.MessageChannel;
            typeof a === "undefined" && typeof window !== "undefined" && window.postMessage && window.addEventListener && !y("Presto") && (a = function() {
              var e = document.createElement("IFRAME");
              e.style.display = "none";
              e.src = "";
              document.documentElement.appendChild(e);
              var f = e.contentWindow;
              e = f.document;
              e.open();
              e.write("");
              e.close();
              var g = "callImmediate" + Math.random(), h = f.location.protocol == "file:" ? "*" : f.location.protocol + "//" + f.location.host;
              e = r(function(k) {
                if ((h == "*" || k.origin == h) && k.data == g)
                  this.port1.onmessage();
              }, this);
              f.addEventListener("message", e, false);
              this.port1 = {};
              this.port2 = { postMessage: function() {
                f.postMessage(g, h);
              } };
            });
            if (typeof a !== "undefined" && !y("Trident") && !y("MSIE")) {
              var b = new a(), c = {}, d = c;
              b.port1.onmessage = function() {
                if (ka(c.next)) {
                  c = c.next;
                  var e = c.gb;
                  c.gb = null;
                  e();
                }
              };
              return function(e) {
                d.next = { gb: e };
                d = d.next;
                b.port2.postMessage(0);
              };
            }
            return typeof document !== "undefined" && "onreadystatechange" in document.createElement("SCRIPT") ? function(e) {
              var f = document.createElement("SCRIPT");
              f.onreadystatechange = function() {
                f.onreadystatechange = null;
                f.parentNode.removeChild(f);
                f = null;
                e();
                e = null;
              };
              document.documentElement.appendChild(f);
            } : function(e) {
              n.setTimeout(e, 0);
            };
          }
          function Qe(a, b) {
            Re || Se();
            Te || (Re(), Te = true);
            Me.add(a, b);
          }
          var Re;
          function Se() {
            if (n.Promise && n.Promise.resolve) {
              var a = n.Promise.resolve(void 0);
              Re = function() {
                a.then(Ue);
              };
            } else
              Re = function() {
                var b = Ue;
                !sa(n.setImmediate) || n.Window && n.Window.prototype && !y("Edge") && n.Window.prototype.setImmediate == n.setImmediate ? (Oe || (Oe = Pe()), Oe(b)) : n.setImmediate(b);
              };
          }
          var Te = false, Me = new Ie();
          function Ue() {
            for (var a; a = Le(); ) {
              try {
                a.a.call(a.g);
              } catch (b) {
                Ne(b);
              }
              He(Ke, a);
            }
            Te = false;
          }
          function Ve(a) {
            this.a = We;
            this.A = void 0;
            this.j = this.g = this.h = null;
            this.s = this.i = false;
            if (a != na)
              try {
                var b = this;
                a.call(void 0, function(c) {
                  Xe(b, Ye, c);
                }, function(c) {
                  if (!(c instanceof Ze))
                    try {
                      if (c instanceof Error)
                        throw c;
                      throw Error("Promise rejected.");
                    } catch (d) {
                    }
                  Xe(b, $e, c);
                });
              } catch (c) {
                Xe(this, $e, c);
              }
          }
          var We = 0, Ye = 2, $e = 3;
          function af() {
            this.next = this.j = this.g = this.s = this.a = null;
            this.h = false;
          }
          af.prototype.reset = function() {
            this.j = this.g = this.s = this.a = null;
            this.h = false;
          };
          var bf = new Ge(function() {
            return new af();
          }, function(a) {
            a.reset();
          });
          function cf(a, b, c) {
            var d = bf.get();
            d.s = a;
            d.g = b;
            d.j = c;
            return d;
          }
          function F(a) {
            if (a instanceof Ve)
              return a;
            var b = new Ve(na);
            Xe(b, Ye, a);
            return b;
          }
          function df(a) {
            return new Ve(function(b, c) {
              c(a);
            });
          }
          Ve.prototype.then = function(a, b, c) {
            return ef(this, sa(a) ? a : null, sa(b) ? b : null, c);
          };
          Ve.prototype.$goog_Thenable = true;
          l = Ve.prototype;
          l.fc = function(a, b) {
            a = cf(a, a, b);
            a.h = true;
            ff(this, a);
            return this;
          };
          l.Ca = function(a, b) {
            return ef(this, null, a, b);
          };
          l.cancel = function(a) {
            this.a == We && Qe(function() {
              var b = new Ze(a);
              gf(this, b);
            }, this);
          };
          function gf(a, b) {
            if (a.a == We)
              if (a.h) {
                var c = a.h;
                if (c.g) {
                  for (var d = 0, e = null, f = null, g = c.g; g && (g.h || (d++, g.a == a && (e = g), !(e && 1 < d))); g = g.next)
                    e || (f = g);
                  e && (c.a == We && d == 1 ? gf(c, b) : (f ? (d = f, d.next == c.j && (c.j = d), d.next = d.next.next) : hf(c), jf(c, e, $e, b)));
                }
                a.h = null;
              } else
                Xe(a, $e, b);
          }
          function ff(a, b) {
            a.g || a.a != Ye && a.a != $e || kf(a);
            a.j ? a.j.next = b : a.g = b;
            a.j = b;
          }
          function ef(a, b, c, d) {
            var e = cf(null, null, null);
            e.a = new Ve(function(f, g) {
              e.s = b ? function(h) {
                try {
                  var k = b.call(d, h);
                  f(k);
                } catch (p) {
                  g(p);
                }
              } : f;
              e.g = c ? function(h) {
                try {
                  var k = c.call(d, h);
                  !ka(k) && h instanceof Ze ? g(h) : f(k);
                } catch (p) {
                  g(p);
                }
              } : g;
            });
            e.a.h = a;
            ff(a, e);
            return e.a;
          }
          l.hc = function(a) {
            this.a = We;
            Xe(this, Ye, a);
          };
          l.ic = function(a) {
            this.a = We;
            Xe(this, $e, a);
          };
          function Xe(a, b, c) {
            if (a.a == We) {
              a === c && (b = $e, c = new TypeError("Promise cannot resolve to itself"));
              a.a = 1;
              a: {
                var d = c, e = a.hc, f = a.ic;
                if (d instanceof Ve) {
                  ff(d, cf(e || na, f || null, a));
                  var g = true;
                } else if (Fe(d))
                  d.then(e, f, a), g = true;
                else {
                  if (ta(d))
                    try {
                      var h = d.then;
                      if (sa(h)) {
                        lf(d, h, e, f, a);
                        g = true;
                        break a;
                      }
                    } catch (k) {
                      f.call(a, k);
                      g = true;
                      break a;
                    }
                  g = false;
                }
              }
              g || (a.A = c, a.a = b, a.h = null, kf(a), b != $e || c instanceof Ze || mf(a, c));
            }
          }
          function lf(a, b, c, d, e) {
            function f(k) {
              h || (h = true, d.call(e, k));
            }
            function g(k) {
              h || (h = true, c.call(e, k));
            }
            var h = false;
            try {
              b.call(a, g, f);
            } catch (k) {
              f(k);
            }
          }
          function kf(a) {
            a.i || (a.i = true, Qe(a.Hb, a));
          }
          function hf(a) {
            var b = null;
            a.g && (b = a.g, a.g = b.next, b.next = null);
            a.g || (a.j = null);
            return b;
          }
          l.Hb = function() {
            for (var a; a = hf(this); )
              jf(this, a, this.a, this.A);
            this.i = false;
          };
          function jf(a, b, c, d) {
            if (c == $e && b.g && !b.h)
              for (; a && a.s; a = a.h)
                a.s = false;
            if (b.a)
              b.a.h = null, nf(b, c, d);
            else
              try {
                b.h ? b.s.call(b.j) : nf(b, c, d);
              } catch (e) {
                of.call(null, e);
              }
            He(bf, b);
          }
          function nf(a, b, c) {
            b == Ye ? a.s.call(a.j, c) : a.g && a.g.call(a.j, c);
          }
          function mf(a, b) {
            a.s = true;
            Qe(function() {
              a.s && of.call(null, b);
            });
          }
          var of = Ne;
          function Ze(a) {
            Ba.call(this, a);
          }
          w(Ze, Ba);
          Ze.prototype.name = "cancel";
          function pf(a, b, c) {
            b || (b = {});
            c = c || window;
            var d = a instanceof xc ? a : Bc(typeof a.href != "undefined" ? a.href : String(a));
            a = b.target || a.target;
            var e = [];
            for (f in b)
              switch (f) {
                case "width":
                case "height":
                case "top":
                case "left":
                  e.push(f + "=" + b[f]);
                  break;
                case "target":
                case "noopener":
                case "noreferrer":
                  break;
                default:
                  e.push(f + "=" + (b[f] ? 1 : 0));
              }
            var f = e.join(",");
            (y("iPhone") && !y("iPod") && !y("iPad") || y("iPad") || y("iPod")) && c.navigator && c.navigator.standalone && a && a != "_self" ? (f = c.document.createElement("A"), d = d instanceof xc ? d : Dc(d), f.href = zc(d), f.setAttribute("target", a), b.noreferrer && f.setAttribute("rel", "noreferrer"), b = document.createEvent("MouseEvent"), b.initMouseEvent("click", true, true, c, 1), f.dispatchEvent(b), c = {}) : b.noreferrer ? (c = c.open("", a, f), b = zc(d).toString(), c && (cc && b.indexOf(";") != -1 && (b = "'" + b.replace(/'/g, "%27") + "'"), c.opener = null, b = Jc('<meta name="referrer" content="no-referrer"><meta http-equiv="refresh" content="0; url=' + cb(b) + '">', null), c.document.write(Ic(b)), c.document.close())) : (c = c.open(zc(d).toString(), a, f)) && b.noopener && (c.opener = null);
            return c;
          }
          function qf() {
            try {
              return !(!window.opener || !window.opener.location || window.opener.location.hostname !== window.location.hostname || window.opener.location.protocol !== window.location.protocol);
            } catch (a$2) {
            }
            return false;
          }
          function rf(a) {
            pf(a, { target: window.cordova && window.cordova.InAppBrowser ? "_system" : "_blank" }, void 0);
          }
          function sf(a, b) {
            a = ta(a) && a.nodeType == 1 ? a : document.querySelector(String(a));
            if (a == null)
              throw Error(b || "Cannot find element.");
            return a;
          }
          function tf() {
            return window.location.href;
          }
          function uf() {
            var a = null;
            return new Ve(function(b) {
              n.document.readyState == "complete" ? b() : (a = function() {
                b();
              }, le(window, "load", a));
            }).Ca(function(b) {
              se(window, "load", a);
              throw b;
            });
          }
          function vf() {
            for (var a = 32, b = []; 0 < a; )
              b.push("1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".charAt(Math.floor(62 * Math.random()))), a--;
            return b.join("");
          }
          function wf(a, b, c) {
            c = c === void 0 ? {} : c;
            return Object.keys(a).filter(function(d) {
              return b.includes(d);
            }).reduce(function(d, e) {
              d[e] = a[e];
              return d;
            }, c);
          }
          function xf(a) {
            var b = yf;
            this.s = [];
            this.T = b;
            this.O = a || null;
            this.j = this.a = false;
            this.h = void 0;
            this.J = this.l = this.A = false;
            this.i = 0;
            this.g = null;
            this.C = 0;
          }
          xf.prototype.cancel = function(a) {
            if (this.a)
              this.h instanceof xf && this.h.cancel();
            else {
              if (this.g) {
                var b = this.g;
                delete this.g;
                a ? b.cancel(a) : (b.C--, 0 >= b.C && b.cancel());
              }
              this.T ? this.T.call(this.O, this) : this.J = true;
              this.a || (a = new zf(this), Af(this), Bf(this, false, a));
            }
          };
          xf.prototype.L = function(a, b) {
            this.A = false;
            Bf(this, a, b);
          };
          function Bf(a, b, c) {
            a.a = true;
            a.h = c;
            a.j = !b;
            Cf(a);
          }
          function Af(a) {
            if (a.a) {
              if (!a.J)
                throw new Df(a);
              a.J = false;
            }
          }
          xf.prototype.callback = function(a) {
            Af(this);
            Bf(this, true, a);
          };
          function Ef(a, b, c) {
            a.s.push([b, c, void 0]);
            a.a && Cf(a);
          }
          xf.prototype.then = function(a, b, c) {
            var d, e, f = new Ve(function(g, h) {
              d = g;
              e = h;
            });
            Ef(this, d, function(g) {
              g instanceof zf ? f.cancel() : e(g);
            });
            return f.then(a, b, c);
          };
          xf.prototype.$goog_Thenable = true;
          function Ff(a) {
            return La(a.s, function(b) {
              return sa(b[1]);
            });
          }
          function Cf(a) {
            if (a.i && a.a && Ff(a)) {
              var b = a.i, c = Gf[b];
              c && (n.clearTimeout(c.a), delete Gf[b]);
              a.i = 0;
            }
            a.g && (a.g.C--, delete a.g);
            b = a.h;
            for (var d = c = false; a.s.length && !a.A; ) {
              var e = a.s.shift(), f = e[0], g = e[1];
              e = e[2];
              if (f = a.j ? g : f)
                try {
                  var h = f.call(e || a.O, b);
                  ka(h) && (a.j = a.j && (h == b || h instanceof Error), a.h = b = h);
                  if (Fe(b) || typeof n.Promise === "function" && b instanceof n.Promise)
                    d = true, a.A = true;
                } catch (k) {
                  b = k, a.j = true, Ff(a) || (c = true);
                }
            }
            a.h = b;
            d && (h = r(a.L, a, true), d = r(a.L, a, false), b instanceof xf ? (Ef(b, h, d), b.l = true) : b.then(h, d));
            c && (b = new Hf(b), Gf[b.a] = b, a.i = b.a);
          }
          function Df() {
            Ba.call(this);
          }
          w(Df, Ba);
          Df.prototype.message = "Deferred has already fired";
          Df.prototype.name = "AlreadyCalledError";
          function zf() {
            Ba.call(this);
          }
          w(zf, Ba);
          zf.prototype.message = "Deferred was canceled";
          zf.prototype.name = "CanceledError";
          function Hf(a) {
            this.a = n.setTimeout(r(this.h, this), 0);
            this.g = a;
          }
          Hf.prototype.h = function() {
            delete Gf[this.a];
            throw this.g;
          };
          var Gf = {};
          function If(a) {
            var b = {}, c = b.document || document, d = uc(a).toString(), e = document.createElement("SCRIPT"), f = { rb: e, sb: void 0 }, g = new xf(f), h = null, k = b.timeout != null ? b.timeout : 5e3;
            0 < k && (h = window.setTimeout(function() {
              Jf(e, true);
              var p = new Kf(Lf, "Timeout reached for loading script " + d);
              Af(g);
              Bf(g, false, p);
            }, k), f.sb = h);
            e.onload = e.onreadystatechange = function() {
              e.readyState && e.readyState != "loaded" && e.readyState != "complete" || (Jf(e, b.xc || false, h), g.callback(null));
            };
            e.onerror = function() {
              Jf(e, true, h);
              var p = new Kf(Mf, "Error while loading script " + d);
              Af(g);
              Bf(g, false, p);
            };
            f = b.attributes || {};
            gb(f, { type: "text/javascript", charset: "UTF-8" });
            Wc(e, f);
            Mc(e, a);
            Nf(c).appendChild(e);
            return g;
          }
          function Nf(a) {
            var b = (a || document).getElementsByTagName("HEAD");
            return b && b.length != 0 ? b[0] : a.documentElement;
          }
          function yf() {
            if (this && this.rb) {
              var a = this.rb;
              a && a.tagName == "SCRIPT" && Jf(a, true, this.sb);
            }
          }
          function Jf(a, b, c) {
            c != null && n.clearTimeout(c);
            a.onload = na;
            a.onerror = na;
            a.onreadystatechange = na;
            b && window.setTimeout(function() {
              Zc(a);
            }, 0);
          }
          var Mf = 0, Lf = 1;
          function Kf(a, b) {
            var c = "Jsloader error (code #" + a + ")";
            b && (c += ": " + b);
            Ba.call(this, c);
            this.code = a;
          }
          w(Kf, Ba);
          function Of() {
            return n.google && n.google.accounts && n.google.accounts.id || null;
          }
          function Pf(a) {
            this.a = a || Of();
            this.h = false;
            this.g = null;
          }
          Pf.prototype.cancel = function() {
            this.a && this.h && (this.g && this.g(null), this.a.cancel());
          };
          function Qf(a, b, c) {
            if (a.a && b)
              return function() {
                a.h = true;
                return new Ve(function(e) {
                  a.g = e;
                  a.a.initialize({ client_id: b, callback: e, auto_select: !c });
                  a.a.prompt();
                });
              }();
            if (b) {
              var d = Rf.Xa().load().then(function() {
                a.a = Of();
                return Qf(a, b, c);
              }).Ca(function() {
                return null;
              });
              return F(d);
            }
            return F(null);
          }
          oa(Pf);
          var wc = new pc(qc, "https://accounts.google.com/gsi/client");
          function Rf() {
            this.a = null;
          }
          Rf.prototype.load = function() {
            var a = this;
            if (this.a)
              return this.a;
            var b = vc();
            return Of() ? F() : this.a = uf().then(function() {
              if (!Of())
                return new Ve(function(c, d) {
                  var e = setTimeout(function() {
                    a.a = null;
                    d(Error("Network error!"));
                  }, 1e4);
                  n.onGoogleLibraryLoad = function() {
                    clearTimeout(e);
                    c();
                  };
                  F(If(b)).then(function() {
                    Of() && c();
                  }).Ca(function(f) {
                    clearTimeout(e);
                    a.a = null;
                    d(f);
                  });
                });
            });
          };
          oa(Rf);
          function Sf(a, b) {
            this.a = a;
            this.g = b || function(c) {
              throw c;
            };
          }
          Sf.prototype.confirm = function(a) {
            return F(this.a.confirm(a)).Ca(this.g);
          };
          function Tf(a, b, c) {
            this.reset(a, b, c, void 0, void 0);
          }
          Tf.prototype.a = null;
          var Uf = 0;
          Tf.prototype.reset = function(a, b, c, d, e) {
            typeof e == "number" || Uf++;
            this.h = d || Aa();
            this.j = a;
            this.s = b;
            this.g = c;
            delete this.a;
          };
          function Vf(a) {
            this.s = a;
            this.a = this.h = this.j = this.g = null;
          }
          function Wf(a, b) {
            this.name = a;
            this.value = b;
          }
          Wf.prototype.toString = function() {
            return this.name;
          };
          var Xf = new Wf("SEVERE", 1e3), Yf = new Wf("WARNING", 900), Zf = new Wf("CONFIG", 700);
          function $f(a) {
            if (a.j)
              return a.j;
            if (a.g)
              return $f(a.g);
            Fa("Root logger has no level set.");
            return null;
          }
          Vf.prototype.log = function(a, b, c) {
            if (a.value >= $f(this).value)
              for (sa(b) && (b = b()), a = new Tf(a, String(b), this.s), c && (a.a = c), c = this; c; ) {
                var d = c, e = a;
                if (d.a)
                  for (var f = 0; b = d.a[f]; f++)
                    b(e);
                c = c.g;
              }
          };
          var ag = {}, bg = null;
          function cg() {
            bg || (bg = new Vf(""), ag[""] = bg, bg.j = Zf);
          }
          function dg(a) {
            cg();
            var b;
            if (!(b = ag[a])) {
              b = new Vf(a);
              var c = a.lastIndexOf("."), d = a.substr(c + 1);
              c = dg(a.substr(0, c));
              c.h || (c.h = {});
              c.h[d] = b;
              b.g = c;
              ag[a] = b;
            }
            return b;
          }
          function eg() {
            this.a = Aa();
          }
          var fg = null;
          eg.prototype.set = function(a) {
            this.a = a;
          };
          eg.prototype.reset = function() {
            this.set(Aa());
          };
          eg.prototype.get = function() {
            return this.a;
          };
          function gg(a) {
            this.j = a || "";
            fg || (fg = new eg());
            this.s = fg;
          }
          gg.prototype.a = true;
          gg.prototype.g = true;
          gg.prototype.h = false;
          function hg(a) {
            return 10 > a ? "0" + a : String(a);
          }
          function ig(a, b) {
            a = (a.h - b) / 1e3;
            b = a.toFixed(3);
            var c = 0;
            if (1 > a)
              c = 2;
            else
              for (; 100 > a; )
                c++, a *= 10;
            for (; 0 < c--; )
              b = " " + b;
            return b;
          }
          function jg(a) {
            gg.call(this, a);
          }
          w(jg, gg);
          function kg(a, b) {
            var c = [];
            c.push(a.j, " ");
            if (a.g) {
              var d = new Date(b.h);
              c.push("[", hg(d.getFullYear() - 2e3) + hg(d.getMonth() + 1) + hg(d.getDate()) + " " + hg(d.getHours()) + ":" + hg(d.getMinutes()) + ":" + hg(d.getSeconds()) + "." + hg(Math.floor(d.getMilliseconds() / 10)), "] ");
            }
            c.push("[", ig(b, a.s.get()), "s] ");
            c.push("[", b.g, "] ");
            c.push(b.s);
            a.h && (b = b.a) && c.push("\n", b instanceof Error ? b.message : b.toString());
            a.a && c.push("\n");
            return c.join("");
          }
          function lg() {
            this.s = r(this.h, this);
            this.a = new jg();
            this.a.g = false;
            this.a.h = false;
            this.g = this.a.a = false;
            this.j = {};
          }
          lg.prototype.h = function(a) {
            function b(f) {
              if (f) {
                if (f.value >= Xf.value)
                  return "error";
                if (f.value >= Yf.value)
                  return "warn";
                if (f.value >= Zf.value)
                  return "log";
              }
              return "debug";
            }
            if (!this.j[a.g]) {
              var c = kg(this.a, a), d = mg;
              if (d) {
                var e = b(a.j);
                ng(d, e, c, a.a);
              }
            }
          };
          var mg = n.console;
          function ng(a, b, c, d) {
            if (a[b])
              a[b](c, d || "");
            else
              a.log(c, d || "");
          }
          function og(a, b) {
            var c = pg;
            c && c.log(Xf, a, b);
          }
          var pg;
          pg = dg("firebaseui");
          var qg = new lg();
          if (qg.g != 1) {
            var rg;
            cg();
            rg = bg;
            var sg = qg.s;
            rg.a || (rg.a = []);
            rg.a.push(sg);
            qg.g = true;
          }
          function tg(a) {
            var b = pg;
            b && b.log(Yf, a, void 0);
          }
          function ug() {
            this.a = (typeof document == "undefined" ? null : document) || { cookie: "" };
          }
          l = ug.prototype;
          l.set = function(a, b, c, d, e, f) {
            if (/[;=\s]/.test(a))
              throw Error('Invalid cookie name "' + a + '"');
            if (/[;\r\n]/.test(b))
              throw Error('Invalid cookie value "' + b + '"');
            ka(c) || (c = -1);
            e = e ? ";domain=" + e : "";
            d = d ? ";path=" + d : "";
            f = f ? ";secure" : "";
            c = 0 > c ? "" : c == 0 ? ";expires=" + new Date(1970, 1, 1).toUTCString() : ";expires=" + new Date(Aa() + 1e3 * c).toUTCString();
            this.a.cookie = a + "=" + b + e + d + c + f;
          };
          l.get = function(a, b) {
            for (var c = a + "=", d = (this.a.cookie || "").split(";"), e = 0, f; e < d.length; e++) {
              f = Ua(d[e]);
              if (f.lastIndexOf(c, 0) == 0)
                return f.substr(c.length);
              if (f == a)
                return "";
            }
            return b;
          };
          l.ja = function() {
            return vg(this).keys;
          };
          l.la = function() {
            return vg(this).values;
          };
          l.clear = function() {
            for (var a = vg(this).keys, b = a.length - 1; 0 <= b; b--) {
              var c = a[b];
              this.get(c);
              this.set(c, "", 0, void 0, void 0);
            }
          };
          function vg(a) {
            a = (a.a.cookie || "").split(";");
            for (var b = [], c = [], d, e, f = 0; f < a.length; f++)
              e = Ua(a[f]), d = e.indexOf("="), d == -1 ? (b.push(""), c.push(e)) : (b.push(e.substring(0, d)), c.push(e.substring(d + 1)));
            return { keys: b, values: c };
          }
          var xg = new ug();
          function yg() {
          }
          function zg(a, b, c, d) {
            this.h = typeof a !== "undefined" && a !== null ? a : -1;
            this.g = b || null;
            this.a = c || null;
            this.j = !!d;
          }
          m(zg, yg);
          zg.prototype.set = function(a, b) {
            xg.set(a, b, this.h, this.g, this.a, this.j);
          };
          zg.prototype.get = function(a) {
            return xg.get(a) || null;
          };
          zg.prototype.ra = function(a) {
            var b = this.g, c = this.a;
            xg.get(a);
            xg.set(a, "", 0, b, c);
          };
          function Ag(a, b) {
            this.g = a;
            this.a = b || null;
          }
          function Bg(a) {
            return { email: a.g, credential: a.a && a.a.toJSON() };
          }
          function Cg(a) {
            if (a && a.email) {
              var b = a.credential && firebase2.auth.AuthCredential.fromJSON(a.credential);
              return new Ag(a.email, b);
            }
            return null;
          }
          function Dg(a) {
            this.a = a || null;
          }
          function Eg(a) {
            for (var b = [], c = 0, d = 0; d < a.length; d++) {
              var e = a.charCodeAt(d);
              255 < e && (b[c++] = e & 255, e >>= 8);
              b[c++] = e;
            }
            return b;
          }
          function Fg(a) {
            return Ka(a, function(b) {
              b = b.toString(16);
              return 1 < b.length ? b : "0" + b;
            }).join("");
          }
          function Gg(a) {
            this.i = a;
            this.g = this.i.length / 4;
            this.j = this.g + 6;
            this.h = [[], [], [], []];
            this.s = [[], [], [], []];
            this.a = Array(Hg * (this.j + 1));
            for (a = 0; a < this.g; a++)
              this.a[a] = [this.i[4 * a], this.i[4 * a + 1], this.i[4 * a + 2], this.i[4 * a + 3]];
            var b = Array(4);
            for (a = this.g; a < Hg * (this.j + 1); a++) {
              b[0] = this.a[a - 1][0];
              b[1] = this.a[a - 1][1];
              b[2] = this.a[a - 1][2];
              b[3] = this.a[a - 1][3];
              if (a % this.g == 0) {
                var c = b, d = c[0];
                c[0] = c[1];
                c[1] = c[2];
                c[2] = c[3];
                c[3] = d;
                Ig(b);
                b[0] ^= Jg[a / this.g][0];
                b[1] ^= Jg[a / this.g][1];
                b[2] ^= Jg[a / this.g][2];
                b[3] ^= Jg[a / this.g][3];
              } else
                6 < this.g && a % this.g == 4 && Ig(b);
              this.a[a] = Array(4);
              this.a[a][0] = this.a[a - this.g][0] ^ b[0];
              this.a[a][1] = this.a[a - this.g][1] ^ b[1];
              this.a[a][2] = this.a[a - this.g][2] ^ b[2];
              this.a[a][3] = this.a[a - this.g][3] ^ b[3];
            }
          }
          Gg.prototype.A = 16;
          var Hg = Gg.prototype.A / 4;
          function Kg(a, b) {
            for (var c, d = 0; d < Hg; d++)
              for (var e = 0; 4 > e; e++)
                c = 4 * e + d, c = b[c], a.h[d][e] = c;
          }
          function Lg(a) {
            for (var b = [], c = 0; c < Hg; c++)
              for (var d = 0; 4 > d; d++)
                b[4 * d + c] = a.h[c][d];
            return b;
          }
          function Mg(a, b) {
            for (var c = 0; 4 > c; c++)
              for (var d = 0; 4 > d; d++)
                a.h[c][d] ^= a.a[4 * b + d][c];
          }
          function Ng(a, b) {
            for (var c = 0; 4 > c; c++)
              for (var d = 0; 4 > d; d++)
                a.h[c][d] = b[a.h[c][d]];
          }
          function Og(a) {
            for (var b = 1; 4 > b; b++)
              for (var c = 0; 4 > c; c++)
                a.s[b][c] = a.h[b][c];
            for (b = 1; 4 > b; b++)
              for (c = 0; 4 > c; c++)
                a.h[b][c] = a.s[b][(c + b) % Hg];
          }
          function Pg(a) {
            for (var b = 1; 4 > b; b++)
              for (var c = 0; 4 > c; c++)
                a.s[b][(c + b) % Hg] = a.h[b][c];
            for (b = 1; 4 > b; b++)
              for (c = 0; 4 > c; c++)
                a.h[b][c] = a.s[b][c];
          }
          function Ig(a) {
            a[0] = Qg[a[0]];
            a[1] = Qg[a[1]];
            a[2] = Qg[a[2]];
            a[3] = Qg[a[3]];
          }
          var Qg = [
            99,
            124,
            119,
            123,
            242,
            107,
            111,
            197,
            48,
            1,
            103,
            43,
            254,
            215,
            171,
            118,
            202,
            130,
            201,
            125,
            250,
            89,
            71,
            240,
            173,
            212,
            162,
            175,
            156,
            164,
            114,
            192,
            183,
            253,
            147,
            38,
            54,
            63,
            247,
            204,
            52,
            165,
            229,
            241,
            113,
            216,
            49,
            21,
            4,
            199,
            35,
            195,
            24,
            150,
            5,
            154,
            7,
            18,
            128,
            226,
            235,
            39,
            178,
            117,
            9,
            131,
            44,
            26,
            27,
            110,
            90,
            160,
            82,
            59,
            214,
            179,
            41,
            227,
            47,
            132,
            83,
            209,
            0,
            237,
            32,
            252,
            177,
            91,
            106,
            203,
            190,
            57,
            74,
            76,
            88,
            207,
            208,
            239,
            170,
            251,
            67,
            77,
            51,
            133,
            69,
            249,
            2,
            127,
            80,
            60,
            159,
            168,
            81,
            163,
            64,
            143,
            146,
            157,
            56,
            245,
            188,
            182,
            218,
            33,
            16,
            255,
            243,
            210,
            205,
            12,
            19,
            236,
            95,
            151,
            68,
            23,
            196,
            167,
            126,
            61,
            100,
            93,
            25,
            115,
            96,
            129,
            79,
            220,
            34,
            42,
            144,
            136,
            70,
            238,
            184,
            20,
            222,
            94,
            11,
            219,
            224,
            50,
            58,
            10,
            73,
            6,
            36,
            92,
            194,
            211,
            172,
            98,
            145,
            149,
            228,
            121,
            231,
            200,
            55,
            109,
            141,
            213,
            78,
            169,
            108,
            86,
            244,
            234,
            101,
            122,
            174,
            8,
            186,
            120,
            37,
            46,
            28,
            166,
            180,
            198,
            232,
            221,
            116,
            31,
            75,
            189,
            139,
            138,
            112,
            62,
            181,
            102,
            72,
            3,
            246,
            14,
            97,
            53,
            87,
            185,
            134,
            193,
            29,
            158,
            225,
            248,
            152,
            17,
            105,
            217,
            142,
            148,
            155,
            30,
            135,
            233,
            206,
            85,
            40,
            223,
            140,
            161,
            137,
            13,
            191,
            230,
            66,
            104,
            65,
            153,
            45,
            15,
            176,
            84,
            187,
            22
          ], Rg = [
            82,
            9,
            106,
            213,
            48,
            54,
            165,
            56,
            191,
            64,
            163,
            158,
            129,
            243,
            215,
            251,
            124,
            227,
            57,
            130,
            155,
            47,
            255,
            135,
            52,
            142,
            67,
            68,
            196,
            222,
            233,
            203,
            84,
            123,
            148,
            50,
            166,
            194,
            35,
            61,
            238,
            76,
            149,
            11,
            66,
            250,
            195,
            78,
            8,
            46,
            161,
            102,
            40,
            217,
            36,
            178,
            118,
            91,
            162,
            73,
            109,
            139,
            209,
            37,
            114,
            248,
            246,
            100,
            134,
            104,
            152,
            22,
            212,
            164,
            92,
            204,
            93,
            101,
            182,
            146,
            108,
            112,
            72,
            80,
            253,
            237,
            185,
            218,
            94,
            21,
            70,
            87,
            167,
            141,
            157,
            132,
            144,
            216,
            171,
            0,
            140,
            188,
            211,
            10,
            247,
            228,
            88,
            5,
            184,
            179,
            69,
            6,
            208,
            44,
            30,
            143,
            202,
            63,
            15,
            2,
            193,
            175,
            189,
            3,
            1,
            19,
            138,
            107,
            58,
            145,
            17,
            65,
            79,
            103,
            220,
            234,
            151,
            242,
            207,
            206,
            240,
            180,
            230,
            115,
            150,
            172,
            116,
            34,
            231,
            173,
            53,
            133,
            226,
            249,
            55,
            232,
            28,
            117,
            223,
            110,
            71,
            241,
            26,
            113,
            29,
            41,
            197,
            137,
            111,
            183,
            98,
            14,
            170,
            24,
            190,
            27,
            252,
            86,
            62,
            75,
            198,
            210,
            121,
            32,
            154,
            219,
            192,
            254,
            120,
            205,
            90,
            244,
            31,
            221,
            168,
            51,
            136,
            7,
            199,
            49,
            177,
            18,
            16,
            89,
            39,
            128,
            236,
            95,
            96,
            81,
            127,
            169,
            25,
            181,
            74,
            13,
            45,
            229,
            122,
            159,
            147,
            201,
            156,
            239,
            160,
            224,
            59,
            77,
            174,
            42,
            245,
            176,
            200,
            235,
            187,
            60,
            131,
            83,
            153,
            97,
            23,
            43,
            4,
            126,
            186,
            119,
            214,
            38,
            225,
            105,
            20,
            99,
            85,
            33,
            12,
            125
          ], Jg = [[0, 0, 0, 0], [1, 0, 0, 0], [2, 0, 0, 0], [4, 0, 0, 0], [
            8,
            0,
            0,
            0
          ], [16, 0, 0, 0], [32, 0, 0, 0], [64, 0, 0, 0], [128, 0, 0, 0], [27, 0, 0, 0], [54, 0, 0, 0]], Sg = [
            0,
            2,
            4,
            6,
            8,
            10,
            12,
            14,
            16,
            18,
            20,
            22,
            24,
            26,
            28,
            30,
            32,
            34,
            36,
            38,
            40,
            42,
            44,
            46,
            48,
            50,
            52,
            54,
            56,
            58,
            60,
            62,
            64,
            66,
            68,
            70,
            72,
            74,
            76,
            78,
            80,
            82,
            84,
            86,
            88,
            90,
            92,
            94,
            96,
            98,
            100,
            102,
            104,
            106,
            108,
            110,
            112,
            114,
            116,
            118,
            120,
            122,
            124,
            126,
            128,
            130,
            132,
            134,
            136,
            138,
            140,
            142,
            144,
            146,
            148,
            150,
            152,
            154,
            156,
            158,
            160,
            162,
            164,
            166,
            168,
            170,
            172,
            174,
            176,
            178,
            180,
            182,
            184,
            186,
            188,
            190,
            192,
            194,
            196,
            198,
            200,
            202,
            204,
            206,
            208,
            210,
            212,
            214,
            216,
            218,
            220,
            222,
            224,
            226,
            228,
            230,
            232,
            234,
            236,
            238,
            240,
            242,
            244,
            246,
            248,
            250,
            252,
            254,
            27,
            25,
            31,
            29,
            19,
            17,
            23,
            21,
            11,
            9,
            15,
            13,
            3,
            1,
            7,
            5,
            59,
            57,
            63,
            61,
            51,
            49,
            55,
            53,
            43,
            41,
            47,
            45,
            35,
            33,
            39,
            37,
            91,
            89,
            95,
            93,
            83,
            81,
            87,
            85,
            75,
            73,
            79,
            77,
            67,
            65,
            71,
            69,
            123,
            121,
            127,
            125,
            115,
            113,
            119,
            117,
            107,
            105,
            111,
            109,
            99,
            97,
            103,
            101,
            155,
            153,
            159,
            157,
            147,
            145,
            151,
            149,
            139,
            137,
            143,
            141,
            131,
            129,
            135,
            133,
            187,
            185,
            191,
            189,
            179,
            177,
            183,
            181,
            171,
            169,
            175,
            173,
            163,
            161,
            167,
            165,
            219,
            217,
            223,
            221,
            211,
            209,
            215,
            213,
            203,
            201,
            207,
            205,
            195,
            193,
            199,
            197,
            251,
            249,
            255,
            253,
            243,
            241,
            247,
            245,
            235,
            233,
            239,
            237,
            227,
            225,
            231,
            229
          ], Tg = [
            0,
            3,
            6,
            5,
            12,
            15,
            10,
            9,
            24,
            27,
            30,
            29,
            20,
            23,
            18,
            17,
            48,
            51,
            54,
            53,
            60,
            63,
            58,
            57,
            40,
            43,
            46,
            45,
            36,
            39,
            34,
            33,
            96,
            99,
            102,
            101,
            108,
            111,
            106,
            105,
            120,
            123,
            126,
            125,
            116,
            119,
            114,
            113,
            80,
            83,
            86,
            85,
            92,
            95,
            90,
            89,
            72,
            75,
            78,
            77,
            68,
            71,
            66,
            65,
            192,
            195,
            198,
            197,
            204,
            207,
            202,
            201,
            216,
            219,
            222,
            221,
            212,
            215,
            210,
            209,
            240,
            243,
            246,
            245,
            252,
            255,
            250,
            249,
            232,
            235,
            238,
            237,
            228,
            231,
            226,
            225,
            160,
            163,
            166,
            165,
            172,
            175,
            170,
            169,
            184,
            187,
            190,
            189,
            180,
            183,
            178,
            177,
            144,
            147,
            150,
            149,
            156,
            159,
            154,
            153,
            136,
            139,
            142,
            141,
            132,
            135,
            130,
            129,
            155,
            152,
            157,
            158,
            151,
            148,
            145,
            146,
            131,
            128,
            133,
            134,
            143,
            140,
            137,
            138,
            171,
            168,
            173,
            174,
            167,
            164,
            161,
            162,
            179,
            176,
            181,
            182,
            191,
            188,
            185,
            186,
            251,
            248,
            253,
            254,
            247,
            244,
            241,
            242,
            227,
            224,
            229,
            230,
            239,
            236,
            233,
            234,
            203,
            200,
            205,
            206,
            199,
            196,
            193,
            194,
            211,
            208,
            213,
            214,
            223,
            220,
            217,
            218,
            91,
            88,
            93,
            94,
            87,
            84,
            81,
            82,
            67,
            64,
            69,
            70,
            79,
            76,
            73,
            74,
            107,
            104,
            109,
            110,
            103,
            100,
            97,
            98,
            115,
            112,
            117,
            118,
            127,
            124,
            121,
            122,
            59,
            56,
            61,
            62,
            55,
            52,
            49,
            50,
            35,
            32,
            37,
            38,
            47,
            44,
            41,
            42,
            11,
            8,
            13,
            14,
            7,
            4,
            1,
            2,
            19,
            16,
            21,
            22,
            31,
            28,
            25,
            26
          ], Ug = [
            0,
            9,
            18,
            27,
            36,
            45,
            54,
            63,
            72,
            65,
            90,
            83,
            108,
            101,
            126,
            119,
            144,
            153,
            130,
            139,
            180,
            189,
            166,
            175,
            216,
            209,
            202,
            195,
            252,
            245,
            238,
            231,
            59,
            50,
            41,
            32,
            31,
            22,
            13,
            4,
            115,
            122,
            97,
            104,
            87,
            94,
            69,
            76,
            171,
            162,
            185,
            176,
            143,
            134,
            157,
            148,
            227,
            234,
            241,
            248,
            199,
            206,
            213,
            220,
            118,
            127,
            100,
            109,
            82,
            91,
            64,
            73,
            62,
            55,
            44,
            37,
            26,
            19,
            8,
            1,
            230,
            239,
            244,
            253,
            194,
            203,
            208,
            217,
            174,
            167,
            188,
            181,
            138,
            131,
            152,
            145,
            77,
            68,
            95,
            86,
            105,
            96,
            123,
            114,
            5,
            12,
            23,
            30,
            33,
            40,
            51,
            58,
            221,
            212,
            207,
            198,
            249,
            240,
            235,
            226,
            149,
            156,
            135,
            142,
            177,
            184,
            163,
            170,
            236,
            229,
            254,
            247,
            200,
            193,
            218,
            211,
            164,
            173,
            182,
            191,
            128,
            137,
            146,
            155,
            124,
            117,
            110,
            103,
            88,
            81,
            74,
            67,
            52,
            61,
            38,
            47,
            16,
            25,
            2,
            11,
            215,
            222,
            197,
            204,
            243,
            250,
            225,
            232,
            159,
            150,
            141,
            132,
            187,
            178,
            169,
            160,
            71,
            78,
            85,
            92,
            99,
            106,
            113,
            120,
            15,
            6,
            29,
            20,
            43,
            34,
            57,
            48,
            154,
            147,
            136,
            129,
            190,
            183,
            172,
            165,
            210,
            219,
            192,
            201,
            246,
            255,
            228,
            237,
            10,
            3,
            24,
            17,
            46,
            39,
            60,
            53,
            66,
            75,
            80,
            89,
            102,
            111,
            116,
            125,
            161,
            168,
            179,
            186,
            133,
            140,
            151,
            158,
            233,
            224,
            251,
            242,
            205,
            196,
            223,
            214,
            49,
            56,
            35,
            42,
            21,
            28,
            7,
            14,
            121,
            112,
            107,
            98,
            93,
            84,
            79,
            70
          ], Vg = [
            0,
            11,
            22,
            29,
            44,
            39,
            58,
            49,
            88,
            83,
            78,
            69,
            116,
            127,
            98,
            105,
            176,
            187,
            166,
            173,
            156,
            151,
            138,
            129,
            232,
            227,
            254,
            245,
            196,
            207,
            210,
            217,
            123,
            112,
            109,
            102,
            87,
            92,
            65,
            74,
            35,
            40,
            53,
            62,
            15,
            4,
            25,
            18,
            203,
            192,
            221,
            214,
            231,
            236,
            241,
            250,
            147,
            152,
            133,
            142,
            191,
            180,
            169,
            162,
            246,
            253,
            224,
            235,
            218,
            209,
            204,
            199,
            174,
            165,
            184,
            179,
            130,
            137,
            148,
            159,
            70,
            77,
            80,
            91,
            106,
            97,
            124,
            119,
            30,
            21,
            8,
            3,
            50,
            57,
            36,
            47,
            141,
            134,
            155,
            144,
            161,
            170,
            183,
            188,
            213,
            222,
            195,
            200,
            249,
            242,
            239,
            228,
            61,
            54,
            43,
            32,
            17,
            26,
            7,
            12,
            101,
            110,
            115,
            120,
            73,
            66,
            95,
            84,
            247,
            252,
            225,
            234,
            219,
            208,
            205,
            198,
            175,
            164,
            185,
            178,
            131,
            136,
            149,
            158,
            71,
            76,
            81,
            90,
            107,
            96,
            125,
            118,
            31,
            20,
            9,
            2,
            51,
            56,
            37,
            46,
            140,
            135,
            154,
            145,
            160,
            171,
            182,
            189,
            212,
            223,
            194,
            201,
            248,
            243,
            238,
            229,
            60,
            55,
            42,
            33,
            16,
            27,
            6,
            13,
            100,
            111,
            114,
            121,
            72,
            67,
            94,
            85,
            1,
            10,
            23,
            28,
            45,
            38,
            59,
            48,
            89,
            82,
            79,
            68,
            117,
            126,
            99,
            104,
            177,
            186,
            167,
            172,
            157,
            150,
            139,
            128,
            233,
            226,
            255,
            244,
            197,
            206,
            211,
            216,
            122,
            113,
            108,
            103,
            86,
            93,
            64,
            75,
            34,
            41,
            52,
            63,
            14,
            5,
            24,
            19,
            202,
            193,
            220,
            215,
            230,
            237,
            240,
            251,
            146,
            153,
            132,
            143,
            190,
            181,
            168,
            163
          ], Wg = [
            0,
            13,
            26,
            23,
            52,
            57,
            46,
            35,
            104,
            101,
            114,
            127,
            92,
            81,
            70,
            75,
            208,
            221,
            202,
            199,
            228,
            233,
            254,
            243,
            184,
            181,
            162,
            175,
            140,
            129,
            150,
            155,
            187,
            182,
            161,
            172,
            143,
            130,
            149,
            152,
            211,
            222,
            201,
            196,
            231,
            234,
            253,
            240,
            107,
            102,
            113,
            124,
            95,
            82,
            69,
            72,
            3,
            14,
            25,
            20,
            55,
            58,
            45,
            32,
            109,
            96,
            119,
            122,
            89,
            84,
            67,
            78,
            5,
            8,
            31,
            18,
            49,
            60,
            43,
            38,
            189,
            176,
            167,
            170,
            137,
            132,
            147,
            158,
            213,
            216,
            207,
            194,
            225,
            236,
            251,
            246,
            214,
            219,
            204,
            193,
            226,
            239,
            248,
            245,
            190,
            179,
            164,
            169,
            138,
            135,
            144,
            157,
            6,
            11,
            28,
            17,
            50,
            63,
            40,
            37,
            110,
            99,
            116,
            121,
            90,
            87,
            64,
            77,
            218,
            215,
            192,
            205,
            238,
            227,
            244,
            249,
            178,
            191,
            168,
            165,
            134,
            139,
            156,
            145,
            10,
            7,
            16,
            29,
            62,
            51,
            36,
            41,
            98,
            111,
            120,
            117,
            86,
            91,
            76,
            65,
            97,
            108,
            123,
            118,
            85,
            88,
            79,
            66,
            9,
            4,
            19,
            30,
            61,
            48,
            39,
            42,
            177,
            188,
            171,
            166,
            133,
            136,
            159,
            146,
            217,
            212,
            195,
            206,
            237,
            224,
            247,
            250,
            183,
            186,
            173,
            160,
            131,
            142,
            153,
            148,
            223,
            210,
            197,
            200,
            235,
            230,
            241,
            252,
            103,
            106,
            125,
            112,
            83,
            94,
            73,
            68,
            15,
            2,
            21,
            24,
            59,
            54,
            33,
            44,
            12,
            1,
            22,
            27,
            56,
            53,
            34,
            47,
            100,
            105,
            126,
            115,
            80,
            93,
            74,
            71,
            220,
            209,
            198,
            203,
            232,
            229,
            242,
            255,
            180,
            185,
            174,
            163,
            128,
            141,
            154,
            151
          ], Xg = [
            0,
            14,
            28,
            18,
            56,
            54,
            36,
            42,
            112,
            126,
            108,
            98,
            72,
            70,
            84,
            90,
            224,
            238,
            252,
            242,
            216,
            214,
            196,
            202,
            144,
            158,
            140,
            130,
            168,
            166,
            180,
            186,
            219,
            213,
            199,
            201,
            227,
            237,
            255,
            241,
            171,
            165,
            183,
            185,
            147,
            157,
            143,
            129,
            59,
            53,
            39,
            41,
            3,
            13,
            31,
            17,
            75,
            69,
            87,
            89,
            115,
            125,
            111,
            97,
            173,
            163,
            177,
            191,
            149,
            155,
            137,
            135,
            221,
            211,
            193,
            207,
            229,
            235,
            249,
            247,
            77,
            67,
            81,
            95,
            117,
            123,
            105,
            103,
            61,
            51,
            33,
            47,
            5,
            11,
            25,
            23,
            118,
            120,
            106,
            100,
            78,
            64,
            82,
            92,
            6,
            8,
            26,
            20,
            62,
            48,
            34,
            44,
            150,
            152,
            138,
            132,
            174,
            160,
            178,
            188,
            230,
            232,
            250,
            244,
            222,
            208,
            194,
            204,
            65,
            79,
            93,
            83,
            121,
            119,
            101,
            107,
            49,
            63,
            45,
            35,
            9,
            7,
            21,
            27,
            161,
            175,
            189,
            179,
            153,
            151,
            133,
            139,
            209,
            223,
            205,
            195,
            233,
            231,
            245,
            251,
            154,
            148,
            134,
            136,
            162,
            172,
            190,
            176,
            234,
            228,
            246,
            248,
            210,
            220,
            206,
            192,
            122,
            116,
            102,
            104,
            66,
            76,
            94,
            80,
            10,
            4,
            22,
            24,
            50,
            60,
            46,
            32,
            236,
            226,
            240,
            254,
            212,
            218,
            200,
            198,
            156,
            146,
            128,
            142,
            164,
            170,
            184,
            182,
            12,
            2,
            16,
            30,
            52,
            58,
            40,
            38,
            124,
            114,
            96,
            110,
            68,
            74,
            88,
            86,
            55,
            57,
            43,
            37,
            15,
            1,
            19,
            29,
            71,
            73,
            91,
            85,
            127,
            113,
            99,
            109,
            215,
            217,
            203,
            197,
            239,
            225,
            243,
            253,
            167,
            169,
            187,
            181,
            159,
            145,
            131,
            141
          ];
          function Yg(a, b) {
            a = new Gg(Zg(a));
            b = Eg(b);
            for (var c = b.splice(0, 16), d = "", e; c.length; ) {
              e = 16 - c.length;
              for (var f = 0; f < e; f++)
                c.push(0);
              e = a;
              Kg(e, c);
              Mg(e, 0);
              for (c = 1; c < e.j; ++c) {
                Ng(e, Qg);
                Og(e);
                f = e.h;
                for (var g = e.s[0], h = 0; 4 > h; h++)
                  g[0] = f[0][h], g[1] = f[1][h], g[2] = f[2][h], g[3] = f[3][h], f[0][h] = Sg[g[0]] ^ Tg[g[1]] ^ g[2] ^ g[3], f[1][h] = g[0] ^ Sg[g[1]] ^ Tg[g[2]] ^ g[3], f[2][h] = g[0] ^ g[1] ^ Sg[g[2]] ^ Tg[g[3]], f[3][h] = Tg[g[0]] ^ g[1] ^ g[2] ^ Sg[g[3]];
                Mg(e, c);
              }
              Ng(e, Qg);
              Og(e);
              Mg(e, e.j);
              d += Fg(Lg(e));
              c = b.splice(0, 16);
            }
            return d;
          }
          function $g(a, b) {
            a = new Gg(Zg(a));
            for (var c = [], d = 0; d < b.length; d += 2)
              c.push(parseInt(b.substring(d, d + 2), 16));
            var e = c.splice(0, 16);
            for (b = ""; e.length; ) {
              d = a;
              Kg(d, e);
              Mg(d, d.j);
              for (e = 1; e < d.j; ++e) {
                Pg(d);
                Ng(d, Rg);
                Mg(d, d.j - e);
                for (var f = d.h, g = d.s[0], h = 0; 4 > h; h++)
                  g[0] = f[0][h], g[1] = f[1][h], g[2] = f[2][h], g[3] = f[3][h], f[0][h] = Xg[g[0]] ^ Vg[g[1]] ^ Wg[g[2]] ^ Ug[g[3]], f[1][h] = Ug[g[0]] ^ Xg[g[1]] ^ Vg[g[2]] ^ Wg[g[3]], f[2][h] = Wg[g[0]] ^ Ug[g[1]] ^ Xg[g[2]] ^ Vg[g[3]], f[3][h] = Vg[g[0]] ^ Wg[g[1]] ^ Ug[g[2]] ^ Xg[g[3]];
              }
              Pg(d);
              Ng(d, Rg);
              Mg(d, 0);
              d = Lg(d);
              if (8192 >= d.length)
                d = String.fromCharCode.apply(null, d);
              else {
                e = "";
                for (f = 0; f < d.length; f += 8192)
                  e += String.fromCharCode.apply(null, Ta(d, f, f + 8192));
                d = e;
              }
              b += d;
              e = c.splice(0, 16);
            }
            return b.replace(/(\x00)+$/, "");
          }
          function Zg(a) {
            a = Eg(a.substring(0, 32));
            for (var b = 32 - a.length, c = 0; c < b; c++)
              a.push(0);
            return a;
          }
          function ah(a) {
            var b = [];
            bh(new ch(), a, b);
            return b.join("");
          }
          function ch() {
          }
          function bh(a, b, c) {
            if (b == null)
              c.push("null");
            else {
              if (typeof b == "object") {
                if (qa(b)) {
                  var d = b;
                  b = d.length;
                  c.push("[");
                  for (var e = "", f = 0; f < b; f++)
                    c.push(e), bh(a, d[f], c), e = ",";
                  c.push("]");
                  return;
                }
                if (b instanceof String || b instanceof Number || b instanceof Boolean)
                  b = b.valueOf();
                else {
                  c.push("{");
                  e = "";
                  for (d in b)
                    Object.prototype.hasOwnProperty.call(b, d) && (f = b[d], typeof f != "function" && (c.push(e), dh(d, c), c.push(":"), bh(a, f, c), e = ","));
                  c.push("}");
                  return;
                }
              }
              switch (typeof b) {
                case "string":
                  dh(b, c);
                  break;
                case "number":
                  c.push(isFinite(b) && !isNaN(b) ? String(b) : "null");
                  break;
                case "boolean":
                  c.push(String(b));
                  break;
                case "function":
                  c.push("null");
                  break;
                default:
                  throw Error("Unknown type: " + typeof b);
              }
            }
          }
          var eh = { '"': '\\"', "\\": "\\\\", "/": "\\/", "\b": "\\b", "\f": "\\f", "\n": "\\n", "\r": "\\r", "	": "\\t", "\v": "\\u000b" }, fh = /\uffff/.test("\uFFFF") ? /[\\"\x00-\x1f\x7f-\uffff]/g : /[\\"\x00-\x1f\x7f-\xff]/g;
          function dh(a, b) {
            b.push('"', a.replace(fh, function(c) {
              var d = eh[c];
              d || (d = "\\u" + (c.charCodeAt(0) | 65536).toString(16).substr(1), eh[c] = d);
              return d;
            }), '"');
          }
          function gh(a) {
            this.a = a;
          }
          gh.prototype.set = function(a, b) {
            ka(b) ? this.a.set(a, ah(b)) : this.a.ra(a);
          };
          gh.prototype.get = function(a) {
            try {
              var b = this.a.get(a);
            } catch (c) {
              return;
            }
            if (b !== null)
              try {
                return JSON.parse(b);
              } catch (c$3) {
                throw "Storage: Invalid value was encountered";
              }
          };
          function hh() {
          }
          w(hh, yg);
          hh.prototype.clear = function() {
            var a = lb(this.ha(true)), b = this;
            Ha(a, function(c) {
              b.ra(c);
            });
          };
          function ih(a) {
            this.a = a;
          }
          w(ih, hh);
          function jh(a) {
            if (!a.a)
              return false;
            try {
              return a.a.setItem("__sak", "1"), a.a.removeItem("__sak"), true;
            } catch (b) {
              return false;
            }
          }
          l = ih.prototype;
          l.set = function(a, b) {
            try {
              this.a.setItem(a, b);
            } catch (c) {
              if (this.a.length == 0)
                throw "Storage mechanism: Storage disabled";
              throw "Storage mechanism: Quota exceeded";
            }
          };
          l.get = function(a) {
            a = this.a.getItem(a);
            if (!q(a) && a !== null)
              throw "Storage mechanism: Invalid value was encountered";
            return a;
          };
          l.ra = function(a) {
            this.a.removeItem(a);
          };
          l.ha = function(a) {
            var b = 0, c = this.a, d = new ib();
            d.next = function() {
              if (b >= c.length)
                throw hb;
              var e = c.key(b++);
              if (a)
                return e;
              e = c.getItem(e);
              if (!q(e))
                throw "Storage mechanism: Invalid value was encountered";
              return e;
            };
            return d;
          };
          l.clear = function() {
            this.a.clear();
          };
          l.key = function(a) {
            return this.a.key(a);
          };
          function kh() {
            var a = null;
            try {
              a = window.localStorage || null;
            } catch (b) {
            }
            this.a = a;
          }
          w(kh, ih);
          function lh() {
            var a = null;
            try {
              a = window.sessionStorage || null;
            } catch (b) {
            }
            this.a = a;
          }
          w(lh, ih);
          function mh(a, b) {
            this.g = a;
            this.a = b + "::";
          }
          w(mh, hh);
          mh.prototype.set = function(a, b) {
            this.g.set(this.a + a, b);
          };
          mh.prototype.get = function(a) {
            return this.g.get(this.a + a);
          };
          mh.prototype.ra = function(a) {
            this.g.ra(this.a + a);
          };
          mh.prototype.ha = function(a) {
            var b = this.g.ha(true), c = this, d = new ib();
            d.next = function() {
              for (var e = b.next(); e.substr(0, c.a.length) != c.a; )
                e = b.next();
              return a ? e.substr(c.a.length) : c.g.get(e);
            };
            return d;
          };
          jh(new kh());
          var nh, oh = new lh();
          nh = jh(oh) ? new mh(oh, "firebaseui") : null;
          var ph = new gh(nh), qh = { name: "pendingEmailCredential", storage: ph }, rh = { name: "redirectStatus", storage: ph }, sh = { name: "redirectUrl", storage: ph }, th = { name: "emailForSignIn", storage: new gh(new zg(3600, "/")) }, uh = { name: "pendingEncryptedCredential", storage: new gh(new zg(3600, "/")) };
          function vh(a, b) {
            return a.storage.get(b ? a.name + ":" + b : a.name);
          }
          function wh(a, b) {
            a.storage.a.ra(b ? a.name + ":" + b : a.name);
          }
          function xh(a, b, c) {
            a.storage.set(c ? a.name + ":" + c : a.name, b);
          }
          function yh(a) {
            return vh(sh, a) || null;
          }
          function zh(a) {
            a = vh(qh, a) || null;
            return Cg(a);
          }
          function Ah(a) {
            wh(qh, a);
          }
          function Bh(a, b) {
            xh(qh, Bg(a), b);
          }
          function Ch(a) {
            return (a = vh(rh, a) || null) && typeof a.tenantId !== "undefined" ? new Dg(a.tenantId) : null;
          }
          function Dh(a, b) {
            xh(rh, { tenantId: a.a }, b);
          }
          function Eh(a, b) {
            b = vh(th, b);
            var c = null;
            if (b)
              try {
                var d = $g(a, b), e = JSON.parse(d);
                c = e && e.email || null;
              } catch (f) {
              }
            return c;
          }
          function Fh(a, b) {
            b = vh(uh, b);
            var c = null;
            if (b)
              try {
                var d = $g(a, b);
                c = JSON.parse(d);
              } catch (e) {
              }
            return Cg(c || null);
          }
          function Gh(a, b, c) {
            xh(uh, Yg(a, JSON.stringify(Bg(b))), c);
          }
          function Hh() {
            this.W = {};
          }
          function G(a, b, c) {
            if (b.toLowerCase() in a.W)
              throw Error("Configuration " + b + " has already been defined.");
            a.W[b.toLowerCase()] = c;
          }
          function Ih(a, b, c) {
            if (!(b.toLowerCase() in a.W))
              throw Error("Configuration " + b + " is not defined.");
            a.W[b.toLowerCase()] = c;
          }
          Hh.prototype.get = function(a) {
            if (!(a.toLowerCase() in this.W))
              throw Error("Configuration " + a + " is not defined.");
            return this.W[a.toLowerCase()];
          };
          function Jh(a, b) {
            a = a.get(b);
            if (!a)
              throw Error("Configuration " + b + " is required.");
            return a;
          }
          function Kh() {
            this.g = void 0;
            this.a = {};
          }
          l = Kh.prototype;
          l.set = function(a, b) {
            Lh(this, a, b, false);
          };
          l.add = function(a, b) {
            Lh(this, a, b, true);
          };
          function Lh(a, b, c, d) {
            for (var e = 0; e < b.length; e++) {
              var f = b.charAt(e);
              a.a[f] || (a.a[f] = new Kh());
              a = a.a[f];
            }
            if (d && a.g !== void 0)
              throw Error('The collection already contains the key "' + b + '"');
            a.g = c;
          }
          l.get = function(a) {
            a: {
              for (var b = this, c = 0; c < a.length; c++)
                if (b = b.a[a.charAt(c)], !b) {
                  a = void 0;
                  break a;
                }
              a = b;
            }
            return a ? a.g : void 0;
          };
          l.la = function() {
            var a = [];
            Mh(this, a);
            return a;
          };
          function Mh(a, b) {
            a.g !== void 0 && b.push(a.g);
            for (var c in a.a)
              Mh(a.a[c], b);
          }
          l.ja = function() {
            var a = [];
            Nh(this, "", a);
            return a;
          };
          function Nh(a, b, c) {
            a.g !== void 0 && c.push(b);
            for (var d in a.a)
              Nh(a.a[d], b + d, c);
          }
          l.clear = function() {
            this.a = {};
            this.g = void 0;
          };
          function Oh(a) {
            this.a = a;
            this.g = new Kh();
            for (a = 0; a < this.a.length; a++) {
              var b = this.g.get("+" + this.a[a].b);
              b ? b.push(this.a[a]) : this.g.add("+" + this.a[a].b, [this.a[a]]);
            }
          }
          function Ph(a, b) {
            a = a.g;
            var c = {}, d = 0;
            a.g !== void 0 && (c[d] = a.g);
            for (; d < b.length; d++) {
              var e = b.charAt(d);
              if (!(e in a.a))
                break;
              a = a.a[e];
              a.g !== void 0 && (c[d] = a.g);
            }
            for (var f in c)
              if (c.hasOwnProperty(f))
                return c[f];
            return [];
          }
          function Qh(a) {
            for (var b = 0; b < Rh.length; b++)
              if (Rh[b].c === a)
                return Rh[b];
            return null;
          }
          function Sh(a) {
            a = a.toUpperCase();
            for (var b = [], c = 0; c < Rh.length; c++)
              Rh[c].f === a && b.push(Rh[c]);
            return b;
          }
          function Th(a) {
            if (0 < a.length && a.charAt(0) == "+") {
              a = a.substring(1);
              for (var b = [], c = 0; c < Rh.length; c++)
                Rh[c].b == a && b.push(Rh[c]);
              a = b;
            } else
              a = Sh(a);
            return a;
          }
          function Uh(a) {
            a.sort(function(b, c) {
              return b.name.localeCompare(c.name, "en");
            });
          }
          var Rh = [
            { name: "Afghanistan", c: "93-AF-0", b: "93", f: "AF" },
            { name: "\xC5land Islands", c: "358-AX-0", b: "358", f: "AX" },
            { name: "Albania", c: "355-AL-0", b: "355", f: "AL" },
            { name: "Algeria", c: "213-DZ-0", b: "213", f: "DZ" },
            { name: "American Samoa", c: "1-AS-0", b: "1", f: "AS" },
            { name: "Andorra", c: "376-AD-0", b: "376", f: "AD" },
            {
              name: "Angola",
              c: "244-AO-0",
              b: "244",
              f: "AO"
            },
            { name: "Anguilla", c: "1-AI-0", b: "1", f: "AI" },
            { name: "Antigua and Barbuda", c: "1-AG-0", b: "1", f: "AG" },
            { name: "Argentina", c: "54-AR-0", b: "54", f: "AR" },
            { name: "Armenia", c: "374-AM-0", b: "374", f: "AM" },
            { name: "Aruba", c: "297-AW-0", b: "297", f: "AW" },
            { name: "Ascension Island", c: "247-AC-0", b: "247", f: "AC" },
            { name: "Australia", c: "61-AU-0", b: "61", f: "AU" },
            { name: "Austria", c: "43-AT-0", b: "43", f: "AT" },
            { name: "Azerbaijan", c: "994-AZ-0", b: "994", f: "AZ" },
            { name: "Bahamas", c: "1-BS-0", b: "1", f: "BS" },
            {
              name: "Bahrain",
              c: "973-BH-0",
              b: "973",
              f: "BH"
            },
            { name: "Bangladesh", c: "880-BD-0", b: "880", f: "BD" },
            { name: "Barbados", c: "1-BB-0", b: "1", f: "BB" },
            { name: "Belarus", c: "375-BY-0", b: "375", f: "BY" },
            { name: "Belgium", c: "32-BE-0", b: "32", f: "BE" },
            { name: "Belize", c: "501-BZ-0", b: "501", f: "BZ" },
            { name: "Benin", c: "229-BJ-0", b: "229", f: "BJ" },
            { name: "Bermuda", c: "1-BM-0", b: "1", f: "BM" },
            { name: "Bhutan", c: "975-BT-0", b: "975", f: "BT" },
            { name: "Bolivia", c: "591-BO-0", b: "591", f: "BO" },
            { name: "Bosnia and Herzegovina", c: "387-BA-0", b: "387", f: "BA" },
            {
              name: "Botswana",
              c: "267-BW-0",
              b: "267",
              f: "BW"
            },
            { name: "Brazil", c: "55-BR-0", b: "55", f: "BR" },
            { name: "British Indian Ocean Territory", c: "246-IO-0", b: "246", f: "IO" },
            { name: "British Virgin Islands", c: "1-VG-0", b: "1", f: "VG" },
            { name: "Brunei", c: "673-BN-0", b: "673", f: "BN" },
            { name: "Bulgaria", c: "359-BG-0", b: "359", f: "BG" },
            { name: "Burkina Faso", c: "226-BF-0", b: "226", f: "BF" },
            { name: "Burundi", c: "257-BI-0", b: "257", f: "BI" },
            { name: "Cambodia", c: "855-KH-0", b: "855", f: "KH" },
            { name: "Cameroon", c: "237-CM-0", b: "237", f: "CM" },
            { name: "Canada", c: "1-CA-0", b: "1", f: "CA" },
            {
              name: "Cape Verde",
              c: "238-CV-0",
              b: "238",
              f: "CV"
            },
            { name: "Caribbean Netherlands", c: "599-BQ-0", b: "599", f: "BQ" },
            { name: "Cayman Islands", c: "1-KY-0", b: "1", f: "KY" },
            { name: "Central African Republic", c: "236-CF-0", b: "236", f: "CF" },
            { name: "Chad", c: "235-TD-0", b: "235", f: "TD" },
            { name: "Chile", c: "56-CL-0", b: "56", f: "CL" },
            { name: "China", c: "86-CN-0", b: "86", f: "CN" },
            { name: "Christmas Island", c: "61-CX-0", b: "61", f: "CX" },
            { name: "Cocos [Keeling] Islands", c: "61-CC-0", b: "61", f: "CC" },
            { name: "Colombia", c: "57-CO-0", b: "57", f: "CO" },
            {
              name: "Comoros",
              c: "269-KM-0",
              b: "269",
              f: "KM"
            },
            { name: "Democratic Republic Congo", c: "243-CD-0", b: "243", f: "CD" },
            { name: "Republic of Congo", c: "242-CG-0", b: "242", f: "CG" },
            { name: "Cook Islands", c: "682-CK-0", b: "682", f: "CK" },
            { name: "Costa Rica", c: "506-CR-0", b: "506", f: "CR" },
            { name: "C\xF4te d'Ivoire", c: "225-CI-0", b: "225", f: "CI" },
            { name: "Croatia", c: "385-HR-0", b: "385", f: "HR" },
            { name: "Cuba", c: "53-CU-0", b: "53", f: "CU" },
            { name: "Cura\xE7ao", c: "599-CW-0", b: "599", f: "CW" },
            { name: "Cyprus", c: "357-CY-0", b: "357", f: "CY" },
            {
              name: "Czech Republic",
              c: "420-CZ-0",
              b: "420",
              f: "CZ"
            },
            { name: "Denmark", c: "45-DK-0", b: "45", f: "DK" },
            { name: "Djibouti", c: "253-DJ-0", b: "253", f: "DJ" },
            { name: "Dominica", c: "1-DM-0", b: "1", f: "DM" },
            { name: "Dominican Republic", c: "1-DO-0", b: "1", f: "DO" },
            { name: "East Timor", c: "670-TL-0", b: "670", f: "TL" },
            { name: "Ecuador", c: "593-EC-0", b: "593", f: "EC" },
            { name: "Egypt", c: "20-EG-0", b: "20", f: "EG" },
            { name: "El Salvador", c: "503-SV-0", b: "503", f: "SV" },
            { name: "Equatorial Guinea", c: "240-GQ-0", b: "240", f: "GQ" },
            { name: "Eritrea", c: "291-ER-0", b: "291", f: "ER" },
            {
              name: "Estonia",
              c: "372-EE-0",
              b: "372",
              f: "EE"
            },
            { name: "Ethiopia", c: "251-ET-0", b: "251", f: "ET" },
            { name: "Falkland Islands [Islas Malvinas]", c: "500-FK-0", b: "500", f: "FK" },
            { name: "Faroe Islands", c: "298-FO-0", b: "298", f: "FO" },
            { name: "Fiji", c: "679-FJ-0", b: "679", f: "FJ" },
            { name: "Finland", c: "358-FI-0", b: "358", f: "FI" },
            { name: "France", c: "33-FR-0", b: "33", f: "FR" },
            { name: "French Guiana", c: "594-GF-0", b: "594", f: "GF" },
            { name: "French Polynesia", c: "689-PF-0", b: "689", f: "PF" },
            { name: "Gabon", c: "241-GA-0", b: "241", f: "GA" },
            { name: "Gambia", c: "220-GM-0", b: "220", f: "GM" },
            { name: "Georgia", c: "995-GE-0", b: "995", f: "GE" },
            { name: "Germany", c: "49-DE-0", b: "49", f: "DE" },
            { name: "Ghana", c: "233-GH-0", b: "233", f: "GH" },
            { name: "Gibraltar", c: "350-GI-0", b: "350", f: "GI" },
            { name: "Greece", c: "30-GR-0", b: "30", f: "GR" },
            { name: "Greenland", c: "299-GL-0", b: "299", f: "GL" },
            { name: "Grenada", c: "1-GD-0", b: "1", f: "GD" },
            { name: "Guadeloupe", c: "590-GP-0", b: "590", f: "GP" },
            { name: "Guam", c: "1-GU-0", b: "1", f: "GU" },
            { name: "Guatemala", c: "502-GT-0", b: "502", f: "GT" },
            { name: "Guernsey", c: "44-GG-0", b: "44", f: "GG" },
            {
              name: "Guinea Conakry",
              c: "224-GN-0",
              b: "224",
              f: "GN"
            },
            { name: "Guinea-Bissau", c: "245-GW-0", b: "245", f: "GW" },
            { name: "Guyana", c: "592-GY-0", b: "592", f: "GY" },
            { name: "Haiti", c: "509-HT-0", b: "509", f: "HT" },
            { name: "Heard Island and McDonald Islands", c: "672-HM-0", b: "672", f: "HM" },
            { name: "Honduras", c: "504-HN-0", b: "504", f: "HN" },
            { name: "Hong Kong", c: "852-HK-0", b: "852", f: "HK" },
            { name: "Hungary", c: "36-HU-0", b: "36", f: "HU" },
            { name: "Iceland", c: "354-IS-0", b: "354", f: "IS" },
            { name: "India", c: "91-IN-0", b: "91", f: "IN" },
            { name: "Indonesia", c: "62-ID-0", b: "62", f: "ID" },
            { name: "Iran", c: "98-IR-0", b: "98", f: "IR" },
            { name: "Iraq", c: "964-IQ-0", b: "964", f: "IQ" },
            { name: "Ireland", c: "353-IE-0", b: "353", f: "IE" },
            { name: "Isle of Man", c: "44-IM-0", b: "44", f: "IM" },
            { name: "Israel", c: "972-IL-0", b: "972", f: "IL" },
            { name: "Italy", c: "39-IT-0", b: "39", f: "IT" },
            { name: "Jamaica", c: "1-JM-0", b: "1", f: "JM" },
            { name: "Japan", c: "81-JP-0", b: "81", f: "JP" },
            { name: "Jersey", c: "44-JE-0", b: "44", f: "JE" },
            { name: "Jordan", c: "962-JO-0", b: "962", f: "JO" },
            { name: "Kazakhstan", c: "7-KZ-0", b: "7", f: "KZ" },
            {
              name: "Kenya",
              c: "254-KE-0",
              b: "254",
              f: "KE"
            },
            { name: "Kiribati", c: "686-KI-0", b: "686", f: "KI" },
            { name: "Kosovo", c: "377-XK-0", b: "377", f: "XK" },
            { name: "Kosovo", c: "381-XK-0", b: "381", f: "XK" },
            { name: "Kosovo", c: "386-XK-0", b: "386", f: "XK" },
            { name: "Kuwait", c: "965-KW-0", b: "965", f: "KW" },
            { name: "Kyrgyzstan", c: "996-KG-0", b: "996", f: "KG" },
            { name: "Laos", c: "856-LA-0", b: "856", f: "LA" },
            { name: "Latvia", c: "371-LV-0", b: "371", f: "LV" },
            { name: "Lebanon", c: "961-LB-0", b: "961", f: "LB" },
            { name: "Lesotho", c: "266-LS-0", b: "266", f: "LS" },
            { name: "Liberia", c: "231-LR-0", b: "231", f: "LR" },
            {
              name: "Libya",
              c: "218-LY-0",
              b: "218",
              f: "LY"
            },
            { name: "Liechtenstein", c: "423-LI-0", b: "423", f: "LI" },
            { name: "Lithuania", c: "370-LT-0", b: "370", f: "LT" },
            { name: "Luxembourg", c: "352-LU-0", b: "352", f: "LU" },
            { name: "Macau", c: "853-MO-0", b: "853", f: "MO" },
            { name: "Macedonia", c: "389-MK-0", b: "389", f: "MK" },
            { name: "Madagascar", c: "261-MG-0", b: "261", f: "MG" },
            { name: "Malawi", c: "265-MW-0", b: "265", f: "MW" },
            { name: "Malaysia", c: "60-MY-0", b: "60", f: "MY" },
            { name: "Maldives", c: "960-MV-0", b: "960", f: "MV" },
            { name: "Mali", c: "223-ML-0", b: "223", f: "ML" },
            {
              name: "Malta",
              c: "356-MT-0",
              b: "356",
              f: "MT"
            },
            { name: "Marshall Islands", c: "692-MH-0", b: "692", f: "MH" },
            { name: "Martinique", c: "596-MQ-0", b: "596", f: "MQ" },
            { name: "Mauritania", c: "222-MR-0", b: "222", f: "MR" },
            { name: "Mauritius", c: "230-MU-0", b: "230", f: "MU" },
            { name: "Mayotte", c: "262-YT-0", b: "262", f: "YT" },
            { name: "Mexico", c: "52-MX-0", b: "52", f: "MX" },
            { name: "Micronesia", c: "691-FM-0", b: "691", f: "FM" },
            { name: "Moldova", c: "373-MD-0", b: "373", f: "MD" },
            { name: "Monaco", c: "377-MC-0", b: "377", f: "MC" },
            { name: "Mongolia", c: "976-MN-0", b: "976", f: "MN" },
            {
              name: "Montenegro",
              c: "382-ME-0",
              b: "382",
              f: "ME"
            },
            { name: "Montserrat", c: "1-MS-0", b: "1", f: "MS" },
            { name: "Morocco", c: "212-MA-0", b: "212", f: "MA" },
            { name: "Mozambique", c: "258-MZ-0", b: "258", f: "MZ" },
            { name: "Myanmar [Burma]", c: "95-MM-0", b: "95", f: "MM" },
            { name: "Namibia", c: "264-NA-0", b: "264", f: "NA" },
            { name: "Nauru", c: "674-NR-0", b: "674", f: "NR" },
            { name: "Nepal", c: "977-NP-0", b: "977", f: "NP" },
            { name: "Netherlands", c: "31-NL-0", b: "31", f: "NL" },
            { name: "New Caledonia", c: "687-NC-0", b: "687", f: "NC" },
            { name: "New Zealand", c: "64-NZ-0", b: "64", f: "NZ" },
            {
              name: "Nicaragua",
              c: "505-NI-0",
              b: "505",
              f: "NI"
            },
            { name: "Niger", c: "227-NE-0", b: "227", f: "NE" },
            { name: "Nigeria", c: "234-NG-0", b: "234", f: "NG" },
            { name: "Niue", c: "683-NU-0", b: "683", f: "NU" },
            { name: "Norfolk Island", c: "672-NF-0", b: "672", f: "NF" },
            { name: "North Korea", c: "850-KP-0", b: "850", f: "KP" },
            { name: "Northern Mariana Islands", c: "1-MP-0", b: "1", f: "MP" },
            { name: "Norway", c: "47-NO-0", b: "47", f: "NO" },
            { name: "Oman", c: "968-OM-0", b: "968", f: "OM" },
            { name: "Pakistan", c: "92-PK-0", b: "92", f: "PK" },
            { name: "Palau", c: "680-PW-0", b: "680", f: "PW" },
            {
              name: "Palestinian Territories",
              c: "970-PS-0",
              b: "970",
              f: "PS"
            },
            { name: "Panama", c: "507-PA-0", b: "507", f: "PA" },
            { name: "Papua New Guinea", c: "675-PG-0", b: "675", f: "PG" },
            { name: "Paraguay", c: "595-PY-0", b: "595", f: "PY" },
            { name: "Peru", c: "51-PE-0", b: "51", f: "PE" },
            { name: "Philippines", c: "63-PH-0", b: "63", f: "PH" },
            { name: "Poland", c: "48-PL-0", b: "48", f: "PL" },
            { name: "Portugal", c: "351-PT-0", b: "351", f: "PT" },
            { name: "Puerto Rico", c: "1-PR-0", b: "1", f: "PR" },
            { name: "Qatar", c: "974-QA-0", b: "974", f: "QA" },
            { name: "R\xE9union", c: "262-RE-0", b: "262", f: "RE" },
            {
              name: "Romania",
              c: "40-RO-0",
              b: "40",
              f: "RO"
            },
            { name: "Russia", c: "7-RU-0", b: "7", f: "RU" },
            { name: "Rwanda", c: "250-RW-0", b: "250", f: "RW" },
            { name: "Saint Barth\xE9lemy", c: "590-BL-0", b: "590", f: "BL" },
            { name: "Saint Helena", c: "290-SH-0", b: "290", f: "SH" },
            { name: "St. Kitts", c: "1-KN-0", b: "1", f: "KN" },
            { name: "St. Lucia", c: "1-LC-0", b: "1", f: "LC" },
            { name: "Saint Martin", c: "590-MF-0", b: "590", f: "MF" },
            { name: "Saint Pierre and Miquelon", c: "508-PM-0", b: "508", f: "PM" },
            { name: "St. Vincent", c: "1-VC-0", b: "1", f: "VC" },
            { name: "Samoa", c: "685-WS-0", b: "685", f: "WS" },
            { name: "San Marino", c: "378-SM-0", b: "378", f: "SM" },
            { name: "S\xE3o Tom\xE9 and Pr\xEDncipe", c: "239-ST-0", b: "239", f: "ST" },
            { name: "Saudi Arabia", c: "966-SA-0", b: "966", f: "SA" },
            { name: "Senegal", c: "221-SN-0", b: "221", f: "SN" },
            { name: "Serbia", c: "381-RS-0", b: "381", f: "RS" },
            { name: "Seychelles", c: "248-SC-0", b: "248", f: "SC" },
            { name: "Sierra Leone", c: "232-SL-0", b: "232", f: "SL" },
            { name: "Singapore", c: "65-SG-0", b: "65", f: "SG" },
            { name: "Sint Maarten", c: "1-SX-0", b: "1", f: "SX" },
            { name: "Slovakia", c: "421-SK-0", b: "421", f: "SK" },
            {
              name: "Slovenia",
              c: "386-SI-0",
              b: "386",
              f: "SI"
            },
            { name: "Solomon Islands", c: "677-SB-0", b: "677", f: "SB" },
            { name: "Somalia", c: "252-SO-0", b: "252", f: "SO" },
            { name: "South Africa", c: "27-ZA-0", b: "27", f: "ZA" },
            { name: "South Georgia and the South Sandwich Islands", c: "500-GS-0", b: "500", f: "GS" },
            { name: "South Korea", c: "82-KR-0", b: "82", f: "KR" },
            { name: "South Sudan", c: "211-SS-0", b: "211", f: "SS" },
            { name: "Spain", c: "34-ES-0", b: "34", f: "ES" },
            { name: "Sri Lanka", c: "94-LK-0", b: "94", f: "LK" },
            { name: "Sudan", c: "249-SD-0", b: "249", f: "SD" },
            {
              name: "Suriname",
              c: "597-SR-0",
              b: "597",
              f: "SR"
            },
            { name: "Svalbard and Jan Mayen", c: "47-SJ-0", b: "47", f: "SJ" },
            { name: "Swaziland", c: "268-SZ-0", b: "268", f: "SZ" },
            { name: "Sweden", c: "46-SE-0", b: "46", f: "SE" },
            { name: "Switzerland", c: "41-CH-0", b: "41", f: "CH" },
            { name: "Syria", c: "963-SY-0", b: "963", f: "SY" },
            { name: "Taiwan", c: "886-TW-0", b: "886", f: "TW" },
            { name: "Tajikistan", c: "992-TJ-0", b: "992", f: "TJ" },
            { name: "Tanzania", c: "255-TZ-0", b: "255", f: "TZ" },
            { name: "Thailand", c: "66-TH-0", b: "66", f: "TH" },
            { name: "Togo", c: "228-TG-0", b: "228", f: "TG" },
            {
              name: "Tokelau",
              c: "690-TK-0",
              b: "690",
              f: "TK"
            },
            { name: "Tonga", c: "676-TO-0", b: "676", f: "TO" },
            { name: "Trinidad/Tobago", c: "1-TT-0", b: "1", f: "TT" },
            { name: "Tunisia", c: "216-TN-0", b: "216", f: "TN" },
            { name: "Turkey", c: "90-TR-0", b: "90", f: "TR" },
            { name: "Turkmenistan", c: "993-TM-0", b: "993", f: "TM" },
            { name: "Turks and Caicos Islands", c: "1-TC-0", b: "1", f: "TC" },
            { name: "Tuvalu", c: "688-TV-0", b: "688", f: "TV" },
            { name: "U.S. Virgin Islands", c: "1-VI-0", b: "1", f: "VI" },
            { name: "Uganda", c: "256-UG-0", b: "256", f: "UG" },
            { name: "Ukraine", c: "380-UA-0", b: "380", f: "UA" },
            {
              name: "United Arab Emirates",
              c: "971-AE-0",
              b: "971",
              f: "AE"
            },
            { name: "United Kingdom", c: "44-GB-0", b: "44", f: "GB" },
            { name: "United States", c: "1-US-0", b: "1", f: "US" },
            { name: "Uruguay", c: "598-UY-0", b: "598", f: "UY" },
            { name: "Uzbekistan", c: "998-UZ-0", b: "998", f: "UZ" },
            { name: "Vanuatu", c: "678-VU-0", b: "678", f: "VU" },
            { name: "Vatican City", c: "379-VA-0", b: "379", f: "VA" },
            { name: "Venezuela", c: "58-VE-0", b: "58", f: "VE" },
            { name: "Vietnam", c: "84-VN-0", b: "84", f: "VN" },
            { name: "Wallis and Futuna", c: "681-WF-0", b: "681", f: "WF" },
            {
              name: "Western Sahara",
              c: "212-EH-0",
              b: "212",
              f: "EH"
            },
            { name: "Yemen", c: "967-YE-0", b: "967", f: "YE" },
            { name: "Zambia", c: "260-ZM-0", b: "260", f: "ZM" },
            { name: "Zimbabwe", c: "263-ZW-0", b: "263", f: "ZW" }
          ];
          Uh(Rh);
          var Vh = new Oh(Rh);
          function Wh(a, b) {
            this.a = a;
            this.Aa = b;
          }
          function Xh(a) {
            a = Ua(a);
            var b = Ph(Vh, a);
            return 0 < b.length ? new Wh(b[0].b == "1" ? "1-US-0" : b[0].c, Ua(a.substr(b[0].b.length + 1))) : null;
          }
          function Yh(a) {
            var b = Qh(a.a);
            if (!b)
              throw Error("Country ID " + a.a + " not found.");
            return "+" + b.b + a.Aa;
          }
          function Zh(a, b) {
            for (var c = 0; c < a.length; c++)
              if (!Ma($h, a[c]) && (ai !== null && a[c] in ai || Ma(b, a[c])))
                return a[c];
            return null;
          }
          var $h = ["emailLink", "password", "phone"], ai = { "facebook.com": "FacebookAuthProvider", "github.com": "GithubAuthProvider", "google.com": "GoogleAuthProvider", password: "EmailAuthProvider", "twitter.com": "TwitterAuthProvider", phone: "PhoneAuthProvider" };
          function bi() {
            this.a = new Hh();
            G(this.a, "autoUpgradeAnonymousUsers");
            G(this.a, "callbacks");
            G(this.a, "credentialHelper", ci);
            G(this.a, "immediateFederatedRedirect", false);
            G(this.a, "popupMode", false);
            G(this.a, "privacyPolicyUrl");
            G(this.a, "queryParameterForSignInSuccessUrl", "signInSuccessUrl");
            G(this.a, "queryParameterForWidgetMode", "mode");
            G(this.a, "signInFlow");
            G(this.a, "signInOptions");
            G(this.a, "signInSuccessUrl");
            G(this.a, "siteName");
            G(this.a, "tosUrl");
            G(this.a, "widgetUrl");
            G(this.a, "adminRestrictedOperation");
          }
          function di(a) {
            var b = !!a.a.get("autoUpgradeAnonymousUsers");
            b && !ei(a) && og('Missing "signInFailure" callback: "signInFailure" callback needs to be provided when "autoUpgradeAnonymousUsers" is set to true.', void 0);
            return b;
          }
          function fi(a) {
            a = a.a.get("signInOptions") || [];
            for (var b = [], c = 0; c < a.length; c++) {
              var d = a[c];
              d = ta(d) ? d : { provider: d };
              d.provider && b.push(d);
            }
            return b;
          }
          function gi(a, b) {
            a = fi(a);
            for (var c = 0; c < a.length; c++)
              if (a[c].provider === b)
                return a[c];
            return null;
          }
          function hi(a) {
            return fi(a).map(function(b) {
              return b.provider;
            });
          }
          function ii(a, b) {
            a = ji(a);
            for (var c = 0; c < a.length; c++)
              if (a[c].providerId === b)
                return a[c];
            return null;
          }
          function ji(a) {
            return fi(a).map(function(b) {
              if (ai[b.provider] || Ma(ki, b.provider)) {
                b = {
                  providerId: b.provider,
                  S: b.providerName || null,
                  V: b.fullLabel || null,
                  ta: b.buttonColor || null,
                  za: b.iconUrl ? zc(Bc(b.iconUrl)).toString() : null
                };
                for (var c in b)
                  b[c] === null && delete b[c];
                return b;
              }
              return { providerId: b.provider, S: b.providerName || null, V: b.fullLabel || null, ta: b.buttonColor || null, za: b.iconUrl ? zc(Bc(b.iconUrl)).toString() : null, Ob: b.loginHintKey || null };
            });
          }
          function li(a) {
            var b = gi(a, firebase2.auth.GoogleAuthProvider.PROVIDER_ID), c;
            if (c = b && b.clientId) {
              a: {
                if ((window.location && window.location.protocol) === "http:" || (window.location && window.location.protocol) === "https:") {
                  for (d in a = a.a.get("credentialHelper"), mi)
                    if (mi[d] === a) {
                      var d = mi[d];
                      break a;
                    }
                }
                d = ci;
              }
              c = d === ni;
            }
            return c ? b.clientId || null : null;
          }
          function oi(a) {
            a = gi(a, firebase2.auth.EmailAuthProvider.PROVIDER_ID);
            return !!(a && a.disableSignUp && a.disableSignUp.status);
          }
          function pi(a) {
            a = a.a.get("adminRestrictedOperation") || null;
            return !(!a || !a.status);
          }
          function qi(a) {
            var b = null;
            fi(a).forEach(function(d) {
              d.provider == firebase2.auth.PhoneAuthProvider.PROVIDER_ID && ta(d.recaptchaParameters) && !Array.isArray(d.recaptchaParameters) && (b = eb(d.recaptchaParameters));
            });
            if (b) {
              var c = [];
              ri.forEach(function(d) {
                typeof b[d] !== "undefined" && (c.push(d), delete b[d]);
              });
              c.length && tg('The following provided "recaptchaParameters" keys are not allowed: ' + c.join(", "));
            }
            return b;
          }
          function si(a) {
            return (a = a.a.get("adminRestrictedOperation")) && a.adminEmail ? a.adminEmail : null;
          }
          function ti(a) {
            if (a = a.a.get("adminRestrictedOperation") || null) {
              var b = a.helpLink || null;
              if (b && typeof b === "string")
                return function() {
                  rf(b);
                };
            }
            return null;
          }
          function ui2(a) {
            return (a = gi(a, firebase2.auth.EmailAuthProvider.PROVIDER_ID)) && a.disableSignUp && a.disableSignUp.adminEmail || null;
          }
          function vi(a) {
            if ((a = gi(a, firebase2.auth.EmailAuthProvider.PROVIDER_ID)) && a.disableSignUp) {
              var b = a.disableSignUp.helpLink || null;
              if (b && typeof b === "string")
                return function() {
                  rf(b);
                };
            }
            return null;
          }
          function wi(a, b) {
            a = (a = gi(a, b)) && a.scopes;
            return Array.isArray(a) ? a : [];
          }
          function xi(a, b) {
            a = (a = gi(a, b)) && a.customParameters;
            return ta(a) ? (a = eb(a), b === firebase2.auth.GoogleAuthProvider.PROVIDER_ID && delete a.login_hint, b === firebase2.auth.GithubAuthProvider.PROVIDER_ID && delete a.login, a) : null;
          }
          function yi(a) {
            a = gi(a, firebase2.auth.PhoneAuthProvider.PROVIDER_ID);
            var b = null;
            a && typeof a.loginHint === "string" && (b = Xh(a.loginHint));
            return a && a.defaultNationalNumber || b && b.Aa || null;
          }
          function zi(a) {
            var b = (a = gi(a, firebase2.auth.PhoneAuthProvider.PROVIDER_ID)) && a.defaultCountry || null;
            b = b && Sh(b);
            var c = null;
            a && typeof a.loginHint === "string" && (c = Xh(a.loginHint));
            return b && b[0] || c && Qh(c.a) || null;
          }
          function Ai(a) {
            a = gi(a, firebase2.auth.PhoneAuthProvider.PROVIDER_ID);
            if (!a)
              return null;
            var b = a.whitelistedCountries, c = a.blacklistedCountries;
            if (typeof b !== "undefined" && (!Array.isArray(b) || b.length == 0))
              throw Error("WhitelistedCountries must be a non-empty array.");
            if (typeof c !== "undefined" && !Array.isArray(c))
              throw Error("BlacklistedCountries must be an array.");
            if (b && c)
              throw Error("Both whitelistedCountries and blacklistedCountries are provided.");
            if (!b && !c)
              return Rh;
            a = [];
            if (b) {
              c = {};
              for (var d = 0; d < b.length; d++) {
                var e = Th(b[d]);
                for (var f = 0; f < e.length; f++)
                  c[e[f].c] = e[f];
              }
              for (var g in c)
                c.hasOwnProperty(g) && a.push(c[g]);
            } else {
              g = {};
              for (b = 0; b < c.length; b++)
                for (e = Th(c[b]), d = 0; d < e.length; d++)
                  g[e[d].c] = e[d];
              for (e = 0; e < Rh.length; e++)
                g !== null && Rh[e].c in g || a.push(Rh[e]);
            }
            return a;
          }
          function Bi(a) {
            return Jh(a.a, "queryParameterForWidgetMode");
          }
          function H(a) {
            var b = a.a.get("tosUrl") || null;
            a = a.a.get("privacyPolicyUrl") || null;
            b && !a && tg("Privacy Policy URL is missing, the link will not be displayed.");
            if (b && a) {
              if (typeof b === "function")
                return b;
              if (typeof b === "string")
                return function() {
                  rf(b);
                };
            }
            return null;
          }
          function J(a) {
            var b = a.a.get("tosUrl") || null, c = a.a.get("privacyPolicyUrl") || null;
            c && !b && tg("Term of Service URL is missing, the link will not be displayed.");
            if (b && c) {
              if (typeof c === "function")
                return c;
              if (typeof c === "string")
                return function() {
                  rf(c);
                };
            }
            return null;
          }
          function Ci(a) {
            return (a = gi(a, firebase2.auth.EmailAuthProvider.PROVIDER_ID)) && typeof a.requireDisplayName !== "undefined" ? !!a.requireDisplayName : true;
          }
          function Di(a) {
            a = gi(a, firebase2.auth.EmailAuthProvider.PROVIDER_ID);
            return !(!a || a.signInMethod !== firebase2.auth.EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD);
          }
          function Ei(a) {
            a = gi(a, firebase2.auth.EmailAuthProvider.PROVIDER_ID);
            return !(!a || !a.forceSameDevice);
          }
          function Fi(a) {
            if (Di(a)) {
              var b = { url: tf(), handleCodeInApp: true };
              (a = gi(a, firebase2.auth.EmailAuthProvider.PROVIDER_ID)) && typeof a.emailLinkSignIn === "function" && gb(b, a.emailLinkSignIn());
              a = b.url;
              var c = tf();
              c instanceof vb || (c = Jb(c));
              a instanceof vb || (a = Jb(a));
              var d = c;
              c = new vb(d);
              var e = !!a.j;
              e ? wb(c, a.j) : e = !!a.A;
              e ? c.A = a.A : e = !!a.h;
              e ? c.h = a.h : e = a.C != null;
              var f = a.g;
              if (e)
                xb(c, a.C);
              else if (e = !!a.g) {
                if (f.charAt(0) != "/" && (d.h && !d.g ? f = "/" + f : (d = c.g.lastIndexOf("/"), d != -1 && (f = c.g.substr(0, d + 1) + f))), f == ".." || f == ".")
                  f = "";
                else if (f.indexOf("./") != -1 || f.indexOf("/.") != -1) {
                  d = f.lastIndexOf("/", 0) == 0;
                  f = f.split("/");
                  for (var g = [], h = 0; h < f.length; ) {
                    var k = f[h++];
                    k == "." ? d && h == f.length && g.push("") : k == ".." ? ((1 < g.length || g.length == 1 && g[0] != "") && g.pop(), d && h == f.length && g.push("")) : (g.push(k), d = true);
                  }
                  f = g.join("/");
                }
              }
              e ? c.g = f : e = a.a.toString() !== "";
              e ? yb(c, zb(a.a)) : e = !!a.s;
              e && (c.s = a.s);
              b.url = c.toString();
              return b;
            }
            return null;
          }
          function Gi(a) {
            var b = !!a.a.get("immediateFederatedRedirect"), c = hi(a);
            a = Hi(a);
            return b && c.length == 1 && !Ma($h, c[0]) && a == Ii;
          }
          function Hi(a) {
            a = a.a.get("signInFlow");
            for (var b in Ji)
              if (Ji[b] == a)
                return Ji[b];
            return Ii;
          }
          function Ki(a) {
            return Li(a).signInSuccess || null;
          }
          function Mi(a) {
            return Li(a).signInSuccessWithAuthResult || null;
          }
          function ei(a) {
            return Li(a).signInFailure || null;
          }
          function Li(a) {
            return a.a.get("callbacks") || {};
          }
          var ni = "googleyolo", ci = "none", mi = { nc: ni, NONE: ci }, Ii = "redirect", Ji = { qc: "popup", rc: Ii }, Ni = {
            mc: "callback",
            RECOVER_EMAIL: "recoverEmail",
            sc: "resetPassword",
            REVERT_SECOND_FACTOR_ADDITION: "revertSecondFactorAddition",
            tc: "select",
            uc: "signIn",
            VERIFY_AND_CHANGE_EMAIL: "verifyAndChangeEmail",
            VERIFY_EMAIL: "verifyEmail"
          }, ki = ["anonymous"], ri = ["sitekey", "tabindex", "callback", "expired-callback"];
          var Oi, Pi, Qi, Ri, K = {};
          function L(a, b, c, d) {
            K[a].apply(null, Array.prototype.slice.call(arguments, 1));
          }
          function Si(a) {
            if (a.classList)
              return a.classList;
            a = a.className;
            return q(a) && a.match(/\S+/g) || [];
          }
          function Ti(a, b) {
            return a.classList ? a.classList.contains(b) : Ma(Si(a), b);
          }
          function Ui(a, b) {
            a.classList ? a.classList.add(b) : Ti(a, b) || (a.className += 0 < a.className.length ? " " + b : b);
          }
          function Vi(a, b) {
            a.classList ? a.classList.remove(b) : Ti(a, b) && (a.className = Ja(Si(a), function(c) {
              return c != b;
            }).join(" "));
          }
          function Wi(a) {
            var b = a.type;
            switch (q(b) && b.toLowerCase()) {
              case "checkbox":
              case "radio":
                return a.checked ? a.value : null;
              case "select-one":
                return b = a.selectedIndex, 0 <= b ? a.options[b].value : null;
              case "select-multiple":
                b = [];
                for (var c, d = 0; c = a.options[d]; d++)
                  c.selected && b.push(c.value);
                return b.length ? b : null;
              default:
                return a.value != null ? a.value : null;
            }
          }
          function Xi(a, b) {
            var c = a.type;
            switch (q(c) && c.toLowerCase()) {
              case "checkbox":
              case "radio":
                a.checked = b;
                break;
              case "select-one":
                a.selectedIndex = -1;
                if (q(b)) {
                  for (var d = 0; c = a.options[d]; d++)
                    if (c.value == b) {
                      c.selected = true;
                      break;
                    }
                }
                break;
              case "select-multiple":
                q(b) && (b = [b]);
                for (d = 0; c = a.options[d]; d++)
                  if (c.selected = false, b)
                    for (var e, f = 0; e = b[f]; f++)
                      c.value == e && (c.selected = true);
                break;
              default:
                a.value = b != null ? b : "";
            }
          }
          function Yi(a) {
            if (a.altKey && !a.ctrlKey || a.metaKey || 112 <= a.keyCode && 123 >= a.keyCode)
              return false;
            if (Zi(a.keyCode))
              return true;
            switch (a.keyCode) {
              case 18:
              case 20:
              case 93:
              case 17:
              case 40:
              case 35:
              case 27:
              case 36:
              case 45:
              case 37:
              case 224:
              case 91:
              case 144:
              case 12:
              case 34:
              case 33:
              case 19:
              case 255:
              case 44:
              case 39:
              case 145:
              case 16:
              case 38:
              case 252:
              case 224:
              case 92:
                return false;
              case 0:
                return !dc;
              default:
                return 166 > a.keyCode || 183 < a.keyCode;
            }
          }
          function $i(a, b, c, d, e, f) {
            if (ec && !mc("525"))
              return true;
            if (gc && e)
              return Zi(a);
            if (e && !d)
              return false;
            if (!dc) {
              typeof b == "number" && (b = aj(b));
              var g = b == 17 || b == 18 || gc && b == 91;
              if ((!c || gc) && g || gc && b == 16 && (d || f))
                return false;
            }
            if ((ec || bc) && d && c)
              switch (a) {
                case 220:
                case 219:
                case 221:
                case 192:
                case 186:
                case 189:
                case 187:
                case 188:
                case 190:
                case 191:
                case 192:
                case 222:
                  return false;
              }
            if (z && d && b == a)
              return false;
            switch (a) {
              case 13:
                return dc ? f || e ? false : !(c && d) : true;
              case 27:
                return !(ec || bc || dc);
            }
            return dc && (d || e || f) ? false : Zi(a);
          }
          function Zi(a) {
            if (48 <= a && 57 >= a || 96 <= a && 106 >= a || 65 <= a && 90 >= a || (ec || bc) && a == 0)
              return true;
            switch (a) {
              case 32:
              case 43:
              case 63:
              case 64:
              case 107:
              case 109:
              case 110:
              case 111:
              case 186:
              case 59:
              case 189:
              case 187:
              case 61:
              case 188:
              case 190:
              case 191:
              case 192:
              case 222:
              case 219:
              case 220:
              case 221:
              case 163:
                return true;
              case 173:
                return dc;
              default:
                return false;
            }
          }
          function aj(a) {
            if (dc)
              a = bj(a);
            else if (gc && ec)
              switch (a) {
                case 93:
                  a = 91;
              }
            return a;
          }
          function bj(a) {
            switch (a) {
              case 61:
                return 187;
              case 59:
                return 186;
              case 173:
                return 189;
              case 224:
                return 91;
              case 0:
                return 224;
              default:
                return a;
            }
          }
          function cj(a) {
            E.call(this);
            this.a = a;
            ke(a, "keydown", this.g, false, this);
            ke(a, "click", this.h, false, this);
          }
          w(cj, E);
          cj.prototype.g = function(a) {
            (a.keyCode == 13 || ec && a.keyCode == 3) && dj(this, a);
          };
          cj.prototype.h = function(a) {
            dj(this, a);
          };
          function dj(a, b) {
            var c = new ej(b);
            if (xe(a, c)) {
              c = new fj(b);
              try {
                xe(a, c);
              } finally {
                b.stopPropagation();
              }
            }
          }
          cj.prototype.o = function() {
            cj.K.o.call(this);
            se(this.a, "keydown", this.g, false, this);
            se(this.a, "click", this.h, false, this);
            delete this.a;
          };
          function fj(a) {
            Zd.call(this, a.a);
            this.type = "action";
          }
          w(fj, Zd);
          function ej(a) {
            Zd.call(this, a.a);
            this.type = "beforeaction";
          }
          w(ej, Zd);
          function gj(a) {
            E.call(this);
            this.a = a;
            a = z ? "focusout" : "blur";
            this.g = ke(this.a, z ? "focusin" : "focus", this, !z);
            this.h = ke(this.a, a, this, !z);
          }
          w(gj, E);
          gj.prototype.handleEvent = function(a) {
            var b = new Zd(a.a);
            b.type = a.type == "focusin" || a.type == "focus" ? "focusin" : "focusout";
            xe(this, b);
          };
          gj.prototype.o = function() {
            gj.K.o.call(this);
            te(this.g);
            te(this.h);
            delete this.a;
          };
          function hj(a, b) {
            E.call(this);
            this.g = a || 1;
            this.a = b || n;
            this.h = r(this.gc, this);
            this.j = Aa();
          }
          w(hj, E);
          l = hj.prototype;
          l.Ka = false;
          l.aa = null;
          l.gc = function() {
            if (this.Ka) {
              var a = Aa() - this.j;
              0 < a && a < 0.8 * this.g ? this.aa = this.a.setTimeout(this.h, this.g - a) : (this.aa && (this.a.clearTimeout(this.aa), this.aa = null), xe(this, "tick"), this.Ka && (ij(this), this.start()));
            }
          };
          l.start = function() {
            this.Ka = true;
            this.aa || (this.aa = this.a.setTimeout(this.h, this.g), this.j = Aa());
          };
          function ij(a) {
            a.Ka = false;
            a.aa && (a.a.clearTimeout(a.aa), a.aa = null);
          }
          l.o = function() {
            hj.K.o.call(this);
            ij(this);
            delete this.a;
          };
          function jj(a, b) {
            if (sa(a))
              b && (a = r(a, b));
            else if (a && typeof a.handleEvent == "function")
              a = r(a.handleEvent, a);
            else
              throw Error("Invalid listener argument");
            return 2147483647 < Number(0) ? -1 : n.setTimeout(a, 0);
          }
          function kj(a) {
            Pd.call(this);
            this.g = a;
            this.a = {};
          }
          w(kj, Pd);
          var lj = [];
          function mj(a, b, c, d) {
            qa(c) || (c && (lj[0] = c.toString()), c = lj);
            for (var e = 0; e < c.length; e++) {
              var f = ke(b, c[e], d || a.handleEvent, false, a.g || a);
              if (!f)
                break;
              a.a[f.key] = f;
            }
          }
          function nj(a) {
            db(a.a, function(b, c) {
              this.a.hasOwnProperty(c) && te(b);
            }, a);
            a.a = {};
          }
          kj.prototype.o = function() {
            kj.K.o.call(this);
            nj(this);
          };
          kj.prototype.handleEvent = function() {
            throw Error("EventHandler.handleEvent not implemented");
          };
          function oj(a) {
            E.call(this);
            this.a = null;
            this.g = a;
            a = z || bc || ec && !mc("531") && a.tagName == "TEXTAREA";
            this.h = new kj(this);
            mj(this.h, this.g, a ? ["keydown", "paste", "cut", "drop", "input"] : "input", this);
          }
          w(oj, E);
          oj.prototype.handleEvent = function(a) {
            if (a.type == "input")
              z && mc(10) && a.keyCode == 0 && a.j == 0 || (pj(this), xe(this, qj(a)));
            else if (a.type != "keydown" || Yi(a)) {
              var b = a.type == "keydown" ? this.g.value : null;
              z && a.keyCode == 229 && (b = null);
              var c = qj(a);
              pj(this);
              this.a = jj(function() {
                this.a = null;
                this.g.value != b && xe(this, c);
              }, this);
            }
          };
          function pj(a) {
            a.a != null && (n.clearTimeout(a.a), a.a = null);
          }
          function qj(a) {
            a = new Zd(a.a);
            a.type = "input";
            return a;
          }
          oj.prototype.o = function() {
            oj.K.o.call(this);
            this.h.m();
            pj(this);
            delete this.g;
          };
          function rj(a, b) {
            E.call(this);
            a && (this.Oa && sj(this), this.qa = a, this.Na = ke(this.qa, "keypress", this, b), this.Ya = ke(this.qa, "keydown", this.Jb, b, this), this.Oa = ke(this.qa, "keyup", this.Kb, b, this));
          }
          w(rj, E);
          l = rj.prototype;
          l.qa = null;
          l.Na = null;
          l.Ya = null;
          l.Oa = null;
          l.R = -1;
          l.X = -1;
          l.Ua = false;
          var tj = {
            3: 13,
            12: 144,
            63232: 38,
            63233: 40,
            63234: 37,
            63235: 39,
            63236: 112,
            63237: 113,
            63238: 114,
            63239: 115,
            63240: 116,
            63241: 117,
            63242: 118,
            63243: 119,
            63244: 120,
            63245: 121,
            63246: 122,
            63247: 123,
            63248: 44,
            63272: 46,
            63273: 36,
            63275: 35,
            63276: 33,
            63277: 34,
            63289: 144,
            63302: 45
          }, uj = { Up: 38, Down: 40, Left: 37, Right: 39, Enter: 13, F1: 112, F2: 113, F3: 114, F4: 115, F5: 116, F6: 117, F7: 118, F8: 119, F9: 120, F10: 121, F11: 122, F12: 123, "U+007F": 46, Home: 36, End: 35, PageUp: 33, PageDown: 34, Insert: 45 }, vj = !ec || mc("525"), wj = gc && dc;
          l = rj.prototype;
          l.Jb = function(a) {
            if (ec || bc) {
              if (this.R == 17 && !a.ctrlKey || this.R == 18 && !a.altKey || gc && this.R == 91 && !a.metaKey)
                this.X = this.R = -1;
            }
            this.R == -1 && (a.ctrlKey && a.keyCode != 17 ? this.R = 17 : a.altKey && a.keyCode != 18 ? this.R = 18 : a.metaKey && a.keyCode != 91 && (this.R = 91));
            vj && !$i(a.keyCode, this.R, a.shiftKey, a.ctrlKey, a.altKey, a.metaKey) ? this.handleEvent(a) : (this.X = aj(a.keyCode), wj && (this.Ua = a.altKey));
          };
          l.Kb = function(a) {
            this.X = this.R = -1;
            this.Ua = a.altKey;
          };
          l.handleEvent = function(a) {
            var b = a.a, c = b.altKey;
            if (z && a.type == "keypress") {
              var d = this.X;
              var e = d != 13 && d != 27 ? b.keyCode : 0;
            } else
              (ec || bc) && a.type == "keypress" ? (d = this.X, e = 0 <= b.charCode && 63232 > b.charCode && Zi(d) ? b.charCode : 0) : ac && !ec ? (d = this.X, e = Zi(d) ? b.keyCode : 0) : (a.type == "keypress" ? (wj && (c = this.Ua), b.keyCode == b.charCode ? 32 > b.keyCode ? (d = b.keyCode, e = 0) : (d = this.X, e = b.charCode) : (d = b.keyCode || this.X, e = b.charCode || 0)) : (d = b.keyCode || this.X, e = b.charCode || 0), gc && e == 63 && d == 224 && (d = 191));
            var f = d = aj(d);
            d ? 63232 <= d && d in tj ? f = tj[d] : d == 25 && a.shiftKey && (f = 9) : b.keyIdentifier && b.keyIdentifier in uj && (f = uj[b.keyIdentifier]);
            dc && vj && a.type == "keypress" && !$i(f, this.R, a.shiftKey, a.ctrlKey, c, a.metaKey) || (a = f == this.R, this.R = f, b = new xj(f, e, a, b), b.altKey = c, xe(this, b));
          };
          l.N = function() {
            return this.qa;
          };
          function sj(a) {
            a.Na && (te(a.Na), te(a.Ya), te(a.Oa), a.Na = null, a.Ya = null, a.Oa = null);
            a.qa = null;
            a.R = -1;
            a.X = -1;
          }
          l.o = function() {
            rj.K.o.call(this);
            sj(this);
          };
          function xj(a, b, c, d) {
            Zd.call(this, d);
            this.type = "key";
            this.keyCode = a;
            this.j = b;
            this.repeat = c;
          }
          w(xj, Zd);
          function yj(a, b, c, d) {
            this.top = a;
            this.right = b;
            this.bottom = c;
            this.left = d;
          }
          yj.prototype.toString = function() {
            return "(" + this.top + "t, " + this.right + "r, " + this.bottom + "b, " + this.left + "l)";
          };
          yj.prototype.ceil = function() {
            this.top = Math.ceil(this.top);
            this.right = Math.ceil(this.right);
            this.bottom = Math.ceil(this.bottom);
            this.left = Math.ceil(this.left);
            return this;
          };
          yj.prototype.floor = function() {
            this.top = Math.floor(this.top);
            this.right = Math.floor(this.right);
            this.bottom = Math.floor(this.bottom);
            this.left = Math.floor(this.left);
            return this;
          };
          yj.prototype.round = function() {
            this.top = Math.round(this.top);
            this.right = Math.round(this.right);
            this.bottom = Math.round(this.bottom);
            this.left = Math.round(this.left);
            return this;
          };
          function zj(a, b) {
            var c = Sc(a);
            return c.defaultView && c.defaultView.getComputedStyle && (a = c.defaultView.getComputedStyle(a, null)) ? a[b] || a.getPropertyValue(b) || "" : "";
          }
          function Aj(a) {
            try {
              var b = a.getBoundingClientRect();
            } catch (c) {
              return { left: 0, top: 0, right: 0, bottom: 0 };
            }
            z && a.ownerDocument.body && (a = a.ownerDocument, b.left -= a.documentElement.clientLeft + a.body.clientLeft, b.top -= a.documentElement.clientTop + a.body.clientTop);
            return b;
          }
          function Bj(a, b) {
            b = b || Yc(document);
            var c = b || Yc(document);
            var d = Cj(a), e = Cj(c);
            if (!z || 9 <= Number(nc)) {
              g = zj(c, "borderLeftWidth");
              var f = zj(c, "borderRightWidth");
              h = zj(c, "borderTopWidth");
              k = zj(c, "borderBottomWidth");
              f = new yj(parseFloat(h), parseFloat(f), parseFloat(k), parseFloat(g));
            } else {
              var g = Dj(c, "borderLeft");
              f = Dj(c, "borderRight");
              var h = Dj(c, "borderTop"), k = Dj(c, "borderBottom");
              f = new yj(h, f, k, g);
            }
            c == Yc(document) ? (g = d.a - c.scrollLeft, d = d.g - c.scrollTop, !z || 10 <= Number(nc) || (g += f.left, d += f.top)) : (g = d.a - e.a - f.left, d = d.g - e.g - f.top);
            e = a.offsetWidth;
            f = a.offsetHeight;
            h = ec && !e && !f;
            ka(e) && !h || !a.getBoundingClientRect ? a = new Pc(e, f) : (a = Aj(a), a = new Pc(a.right - a.left, a.bottom - a.top));
            e = c.clientHeight - a.height;
            f = c.scrollLeft;
            h = c.scrollTop;
            f += Math.min(g, Math.max(g - (c.clientWidth - a.width), 0));
            h += Math.min(d, Math.max(d - e, 0));
            c = new Oc(f, h);
            b.scrollLeft = c.a;
            b.scrollTop = c.g;
          }
          function Cj(a) {
            var b = Sc(a), c = new Oc(0, 0);
            var d = b ? Sc(b) : document;
            d = !z || 9 <= Number(nc) || Qc(d).a.compatMode == "CSS1Compat" ? d.documentElement : d.body;
            if (a == d)
              return c;
            a = Aj(a);
            d = Qc(b).a;
            b = Yc(d);
            d = d.parentWindow || d.defaultView;
            b = z && mc("10") && d.pageYOffset != b.scrollTop ? new Oc(b.scrollLeft, b.scrollTop) : new Oc(d.pageXOffset || b.scrollLeft, d.pageYOffset || b.scrollTop);
            c.a = a.left + b.a;
            c.g = a.top + b.g;
            return c;
          }
          var Ej = { thin: 2, medium: 4, thick: 6 };
          function Dj(a, b) {
            if ((a.currentStyle ? a.currentStyle[b + "Style"] : null) == "none")
              return 0;
            var c = a.currentStyle ? a.currentStyle[b + "Width"] : null;
            if (c in Ej)
              a = Ej[c];
            else if (/^\d+px?$/.test(c))
              a = parseInt(c, 10);
            else {
              b = a.style.left;
              var d = a.runtimeStyle.left;
              a.runtimeStyle.left = a.currentStyle.left;
              a.style.left = c;
              c = a.style.pixelLeft;
              a.style.left = b;
              a.runtimeStyle.left = d;
              a = +c;
            }
            return a;
          }
          function Fj() {
          }
          oa(Fj);
          Fj.prototype.a = 0;
          function Gj(a) {
            E.call(this);
            this.s = a || Qc();
            this.cb = null;
            this.na = false;
            this.g = null;
            this.L = void 0;
            this.oa = this.Ea = this.Y = null;
          }
          w(Gj, E);
          l = Gj.prototype;
          l.Lb = Fj.Xa();
          l.N = function() {
            return this.g;
          };
          function M(a, b) {
            return a.g ? Vc(b, a.g || a.s.a) : null;
          }
          function Hj(a) {
            a.L || (a.L = new kj(a));
            return a.L;
          }
          l.Za = function(a) {
            if (this.Y && this.Y != a)
              throw Error("Method not supported");
            Gj.K.Za.call(this, a);
          };
          l.kb = function() {
            this.g = this.s.a.createElement("DIV");
          };
          l.render = function(a) {
            if (this.na)
              throw Error("Component already rendered");
            this.g || this.kb();
            a ? a.insertBefore(this.g, null) : this.s.a.body.appendChild(this.g);
            this.Y && !this.Y.na || this.v();
          };
          l.v = function() {
            this.na = true;
            Ij(this, function(a) {
              !a.na && a.N() && a.v();
            });
          };
          l.ya = function() {
            Ij(this, function(a) {
              a.na && a.ya();
            });
            this.L && nj(this.L);
            this.na = false;
          };
          l.o = function() {
            this.na && this.ya();
            this.L && (this.L.m(), delete this.L);
            Ij(this, function(a) {
              a.m();
            });
            this.g && Zc(this.g);
            this.Y = this.g = this.oa = this.Ea = null;
            Gj.K.o.call(this);
          };
          function Ij(a, b) {
            a.Ea && Ha(a.Ea, b, void 0);
          }
          l.removeChild = function(a, b) {
            if (a) {
              var c = q(a) ? a : a.cb || (a.cb = ":" + (a.Lb.a++).toString(36));
              this.oa && c ? (a = this.oa, a = (a !== null && c in a ? a[c] : void 0) || null) : a = null;
              if (c && a) {
                var d = this.oa;
                c in d && delete d[c];
                Na(this.Ea, a);
                b && (a.ya(), a.g && Zc(a.g));
                b = a;
                if (b == null)
                  throw Error("Unable to set parent component");
                b.Y = null;
                Gj.K.Za.call(b, null);
              }
            }
            if (!a)
              throw Error("Child is not in parent component");
            return a;
          };
          function N(a, b) {
            var c = ad(a, "firebaseui-textfield");
            b ? (Vi(a, "firebaseui-input-invalid"), Ui(a, "firebaseui-input"), c && Vi(c, "firebaseui-textfield-invalid")) : (Vi(a, "firebaseui-input"), Ui(a, "firebaseui-input-invalid"), c && Ui(c, "firebaseui-textfield-invalid"));
          }
          function Jj(a, b, c) {
            b = new oj(b);
            Sd(a, za(Td, b));
            mj(Hj(a), b, "input", c);
          }
          function Kj(a, b, c) {
            b = new rj(b);
            Sd(a, za(Td, b));
            mj(Hj(a), b, "key", function(d) {
              d.keyCode == 13 && (d.stopPropagation(), d.preventDefault(), c(d));
            });
          }
          function Lj(a, b, c) {
            b = new gj(b);
            Sd(a, za(Td, b));
            mj(Hj(a), b, "focusin", c);
          }
          function Mj(a, b, c) {
            b = new gj(b);
            Sd(a, za(Td, b));
            mj(Hj(a), b, "focusout", c);
          }
          function O(a, b, c) {
            b = new cj(b);
            Sd(a, za(Td, b));
            mj(Hj(a), b, "action", function(d) {
              d.stopPropagation();
              d.preventDefault();
              c(d);
            });
          }
          function Nj(a) {
            Ui(a, "firebaseui-hidden");
          }
          function Oj(a, b) {
            b && $c(a, b);
            Vi(a, "firebaseui-hidden");
          }
          function Pj(a) {
            return !Ti(a, "firebaseui-hidden") && a.style.display != "none";
          }
          function Qj(a) {
            a = a || {};
            var b = a.email, c = a.disabled, d = '<div class="firebaseui-textfield mdl-textfield mdl-js-textfield mdl-textfield--floating-label"><label class="mdl-textfield__label firebaseui-label" for="ui-sign-in-email-input">';
            d = a.wc ? d + "Enter new email address" : d + "Email";
            d += '</label><input type="email" name="email" id="ui-sign-in-email-input" autocomplete="username" class="mdl-textfield__input firebaseui-input firebaseui-id-email" value="' + ud(b != null ? b : "") + '"' + (c ? "disabled" : "") + '></div><div class="firebaseui-error-wrapper"><p class="firebaseui-error firebaseui-text-input-error firebaseui-hidden firebaseui-id-email-error"></p></div>';
            return B(d);
          }
          function Rj(a) {
            a = a || {};
            a = a.label;
            var b = '<button type="submit" class="firebaseui-id-submit firebaseui-button mdl-button mdl-js-button mdl-button--raised mdl-button--colored">';
            b = a ? b + A(a) : b + "Next";
            return B(b + "</button>");
          }
          function Sj() {
            var a = "" + Rj({ label: D("Sign In") });
            return B(a);
          }
          function Tj() {
            var a = "" + Rj({ label: D("Save") });
            return B(a);
          }
          function Uj() {
            var a = "" + Rj({ label: D("Continue") });
            return B(a);
          }
          function Vj(a) {
            a = a || {};
            a = a.label;
            var b = '<div class="firebaseui-new-password-component"><div class="firebaseui-textfield mdl-textfield mdl-js-textfield mdl-textfield--floating-label"><label class="mdl-textfield__label firebaseui-label" for="ui-sign-in-new-password-input">';
            b = a ? b + A(a) : b + "Choose password";
            return B(b + '</label><input type="password" name="newPassword" id="ui-sign-in-new-password-input" autocomplete="new-password" class="mdl-textfield__input firebaseui-input firebaseui-id-new-password"></div><a href="javascript:void(0)" class="firebaseui-input-floating-button firebaseui-id-password-toggle firebaseui-input-toggle-on firebaseui-input-toggle-blur"></a><div class="firebaseui-error-wrapper"><p class="firebaseui-error firebaseui-text-input-error firebaseui-hidden firebaseui-id-new-password-error"></p></div></div>');
          }
          function Wj() {
            var a = {};
            var b = '<div class="firebaseui-textfield mdl-textfield mdl-js-textfield mdl-textfield--floating-label"><label class="mdl-textfield__label firebaseui-label" for="ui-sign-in-password-input">';
            b = a.current ? b + "Current password" : b + "Password";
            return B(b + '</label><input type="password" name="password" id="ui-sign-in-password-input" autocomplete="current-password" class="mdl-textfield__input firebaseui-input firebaseui-id-password"></div><div class="firebaseui-error-wrapper"><p class="firebaseui-error firebaseui-text-input-error firebaseui-hidden firebaseui-id-password-error"></p></div>');
          }
          function Xj() {
            return B('<a class="firebaseui-link firebaseui-id-secondary-link" href="javascript:void(0)">Trouble signing in?</a>');
          }
          function Yj(a) {
            a = a || {};
            a = a.label;
            var b = '<button class="firebaseui-id-secondary-link firebaseui-button mdl-button mdl-js-button mdl-button--primary">';
            b = a ? b + A(a) : b + "Cancel";
            return B(b + "</button>");
          }
          function Zj(a) {
            var b = "";
            a.F && a.D && (b += '<ul class="firebaseui-tos-list firebaseui-tos"><li class="firebaseui-inline-list-item"><a href="javascript:void(0)" class="firebaseui-link firebaseui-tos-link" target="_blank">Terms of Service</a></li><li class="firebaseui-inline-list-item"><a href="javascript:void(0)" class="firebaseui-link firebaseui-pp-link" target="_blank">Privacy Policy</a></li></ul>');
            return B(b);
          }
          function ak(a) {
            var b = "";
            a.F && a.D && (b += '<p class="firebaseui-tos firebaseui-tospp-full-message">By continuing, you are indicating that you accept our <a href="javascript:void(0)" class="firebaseui-link firebaseui-tos-link" target="_blank">Terms of Service</a> and <a href="javascript:void(0)" class="firebaseui-link firebaseui-pp-link" target="_blank">Privacy Policy</a>.</p>');
            return B(b);
          }
          function bk(a) {
            a = '<div class="firebaseui-info-bar firebaseui-id-info-bar"><p class="firebaseui-info-bar-message">' + A(a.message) + '&nbsp;&nbsp;<a href="javascript:void(0)" class="firebaseui-link firebaseui-id-dismiss-info-bar">Dismiss</a></p></div>';
            return B(a);
          }
          bk.a = "firebaseui.auth.soy2.element.infoBar";
          function ck(a) {
            var b = a.content;
            a = a.Ab;
            return B('<dialog class="mdl-dialog firebaseui-dialog firebaseui-id-dialog' + (a ? " " + ud(a) : "") + '">' + A(b) + "</dialog>");
          }
          function dk(a) {
            var b = a.message;
            return B(ck({ content: td('<div class="firebaseui-dialog-icon-wrapper"><div class="' + ud(a.Ma) + ' firebaseui-dialog-icon"></div></div><div class="firebaseui-progress-dialog-message">' + A(b) + "</div>") }));
          }
          dk.a = "firebaseui.auth.soy2.element.progressDialog";
          function ek(a) {
            var b = '<div class="firebaseui-list-box-actions">';
            a = a.items;
            for (var c = a.length, d = 0; d < c; d++) {
              var e = a[d];
              b += '<button type="button" data-listboxid="' + ud(e.id) + '" class="mdl-button firebaseui-id-list-box-dialog-button firebaseui-list-box-dialog-button">' + (e.Ma ? '<div class="firebaseui-list-box-icon-wrapper"><div class="firebaseui-list-box-icon ' + ud(e.Ma) + '"></div></div>' : "") + '<div class="firebaseui-list-box-label-wrapper">' + A(e.label) + "</div></button>";
            }
            b = "" + ck({ Ab: D("firebaseui-list-box-dialog"), content: td(b + "</div>") });
            return B(b);
          }
          ek.a = "firebaseui.auth.soy2.element.listBoxDialog";
          function fk(a) {
            a = a || {};
            return B(a.tb ? '<div class="mdl-spinner mdl-spinner--single-color mdl-js-spinner is-active firebaseui-busy-indicator firebaseui-id-busy-indicator"></div>' : '<div class="mdl-progress mdl-js-progress mdl-progress__indeterminate firebaseui-busy-indicator firebaseui-id-busy-indicator"></div>');
          }
          fk.a = "firebaseui.auth.soy2.element.busyIndicator";
          function gk(a, b) {
            a = a || {};
            a = a.ga;
            return C(a.S ? a.S : b.hb[a.providerId] ? "" + b.hb[a.providerId] : a.providerId && a.providerId.indexOf("saml.") == 0 ? a.providerId.substring(5) : a.providerId && a.providerId.indexOf("oidc.") == 0 ? a.providerId.substring(5) : "" + a.providerId);
          }
          function hk(a) {
            ik(a, "upgradeElement");
          }
          function jk(a) {
            ik(a, "downgradeElements");
          }
          var kk = ["mdl-js-textfield", "mdl-js-progress", "mdl-js-spinner", "mdl-js-button"];
          function ik(a, b) {
            a && window.componentHandler && window.componentHandler[b] && kk.forEach(function(c) {
              if (Ti(a, c))
                window.componentHandler[b](a);
              Ha(Tc(c, a), function(d) {
                window.componentHandler[b](d);
              });
            });
          }
          function lk(a, b, c) {
            mk.call(this);
            document.body.appendChild(a);
            a.showModal || window.dialogPolyfill.registerDialog(a);
            a.showModal();
            hk(a);
            b && O(this, a, function(f) {
              var g = a.getBoundingClientRect();
              (f.clientX < g.left || g.left + g.width < f.clientX || f.clientY < g.top || g.top + g.height < f.clientY) && mk.call(this);
            });
            if (!c) {
              var d = this.N().parentElement || this.N().parentNode;
              if (d) {
                var e = this;
                this.da = function() {
                  if (a.open) {
                    var f = a.getBoundingClientRect().height, g = d.getBoundingClientRect().height, h = d.getBoundingClientRect().top - document.body.getBoundingClientRect().top, k = d.getBoundingClientRect().left - document.body.getBoundingClientRect().left, p = a.getBoundingClientRect().width, t = d.getBoundingClientRect().width;
                    a.style.top = (h + (g - f) / 2).toString() + "px";
                    f = k + (t - p) / 2;
                    a.style.left = f.toString() + "px";
                    a.style.right = (document.body.getBoundingClientRect().width - f - p).toString() + "px";
                  } else
                    window.removeEventListener("resize", e.da);
                };
                this.da();
                window.addEventListener("resize", this.da, false);
              }
            }
          }
          function mk() {
            var a = nk.call(this);
            a && (jk(a), a.open && a.close(), Zc(a), this.da && window.removeEventListener("resize", this.da));
          }
          function nk() {
            return Vc("firebaseui-id-dialog");
          }
          function ok() {
            Zc(pk.call(this));
          }
          function pk() {
            return M(this, "firebaseui-id-info-bar");
          }
          function qk() {
            return M(this, "firebaseui-id-dismiss-info-bar");
          }
          var rk = { xa: {
            "google.com": "https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg",
            "github.com": "https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/github.svg",
            "facebook.com": "https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/facebook.svg",
            "twitter.com": "https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/twitter.svg",
            password: "https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/mail.svg",
            phone: "https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/phone.svg",
            anonymous: "https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/anonymous.png",
            "microsoft.com": "https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/microsoft.svg",
            "yahoo.com": "https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/yahoo.svg",
            "apple.com": "https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/apple.png",
            saml: "https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/saml.svg",
            oidc: "https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/oidc.svg"
          }, wa: { "google.com": "#ffffff", "github.com": "#333333", "facebook.com": "#3b5998", "twitter.com": "#55acee", password: "#db4437", phone: "#02bd7e", anonymous: "#f4b400", "microsoft.com": "#2F2F2F", "yahoo.com": "#720E9E", "apple.com": "#000000", saml: "#007bff", oidc: "#007bff" }, hb: {
            "google.com": "Google",
            "github.com": "GitHub",
            "facebook.com": "Facebook",
            "twitter.com": "Twitter",
            password: "Password",
            phone: "Phone",
            anonymous: "Guest",
            "microsoft.com": "Microsoft",
            "yahoo.com": "Yahoo",
            "apple.com": "Apple"
          } };
          function sk(a, b, c) {
            Yd.call(this, a, b);
            for (var d in c)
              this[d] = c[d];
          }
          w(sk, Yd);
          function P(a, b, c, d, e) {
            Gj.call(this, c);
            this.fb = a;
            this.eb = b;
            this.Fa = false;
            this.Ga = d || null;
            this.A = this.ca = null;
            this.Z = eb(rk);
            gb(this.Z, e || {});
          }
          w(P, Gj);
          l = P.prototype;
          l.kb = function() {
            var a = hd(this.fb, this.eb, this.Z, this.s);
            hk(a);
            this.g = a;
          };
          l.v = function() {
            P.K.v.call(this);
            Be(Q(this), new sk("pageEnter", Q(this), { pageId: this.Ga }));
            if (this.bb() && this.Z.F) {
              var a = this.Z.F;
              O(this, this.bb(), function() {
                a();
              });
            }
            if (this.ab() && this.Z.D) {
              var b = this.Z.D;
              O(this, this.ab(), function() {
                b();
              });
            }
          };
          l.ya = function() {
            Be(Q(this), new sk("pageExit", Q(this), { pageId: this.Ga }));
            P.K.ya.call(this);
          };
          l.o = function() {
            window.clearTimeout(this.ca);
            this.eb = this.fb = this.ca = null;
            this.Fa = false;
            this.A = null;
            jk(this.N());
            P.K.o.call(this);
          };
          function tk(a) {
            a.Fa = true;
            var b = Ti(a.N(), "firebaseui-use-spinner");
            a.ca = window.setTimeout(function() {
              a.N() && a.A === null && (a.A = hd(fk, { tb: b }, null, a.s), a.N().appendChild(a.A), hk(a.A));
            }, 500);
          }
          l.I = function(a, b, c, d) {
            function e() {
              if (f.T)
                return null;
              f.Fa = false;
              window.clearTimeout(f.ca);
              f.ca = null;
              f.A && (jk(f.A), Zc(f.A), f.A = null);
            }
            var f = this;
            if (f.Fa)
              return null;
            tk(f);
            return a.apply(null, b).then(c, d).then(e, e);
          };
          function Q(a) {
            return a.N().parentElement || a.N().parentNode;
          }
          function uk(a, b, c) {
            Kj(a, b, function() {
              c.focus();
            });
          }
          function vk(a, b, c) {
            Kj(a, b, function() {
              c();
            });
          }
          u(P.prototype, { a: function(a) {
            ok.call(this);
            var b = hd(bk, { message: a }, null, this.s);
            this.N().appendChild(b);
            O(this, qk.call(this), function() {
              Zc(b);
            });
          }, yc: ok, Ac: pk, zc: qk, $: function(a, b) {
            a = hd(dk, { Ma: a, message: b }, null, this.s);
            lk.call(this, a);
          }, h: mk, Cb: nk, Cc: function() {
            return M(this, "firebaseui-tos");
          }, bb: function() {
            return M(this, "firebaseui-tos-link");
          }, ab: function() {
            return M(this, "firebaseui-pp-link");
          }, Dc: function() {
            return M(this, "firebaseui-tos-list");
          } });
          function wk(a, b, c) {
            a = a || {};
            b = a.Va;
            var d = a.ia;
            a = '<div class="mdl-card mdl-shadow--2dp firebaseui-container firebaseui-id-page-sign-in"><form onsubmit="return false;"><div class="firebaseui-card-header"><h1 class="firebaseui-title">Sign in with email</h1></div><div class="firebaseui-card-content"><div class="firebaseui-relative-wrapper">' + Qj(a) + '</div></div><div class="firebaseui-card-actions"><div class="firebaseui-form-actions">' + (b ? Yj(null) : "") + Rj(null) + '</div></div><div class="firebaseui-card-footer">' + (d ? ak(c) : Zj(c)) + "</div></form></div>";
            return B(a);
          }
          wk.a = "firebaseui.auth.soy2.page.signIn";
          function xk(a, b, c) {
            a = a || {};
            b = a.ia;
            a = '<div class="mdl-card mdl-shadow--2dp firebaseui-container firebaseui-id-page-password-sign-in"><form onsubmit="return false;"><div class="firebaseui-card-header"><h1 class="firebaseui-title">Sign in</h1></div><div class="firebaseui-card-content">' + Qj(a) + Wj() + '</div><div class="firebaseui-card-actions"><div class="firebaseui-form-links">' + Xj() + '</div><div class="firebaseui-form-actions">' + Sj() + '</div></div><div class="firebaseui-card-footer">' + (b ? ak(c) : Zj(c)) + "</div></form></div>";
            return B(a);
          }
          xk.a = "firebaseui.auth.soy2.page.passwordSignIn";
          function yk(a, b, c) {
            a = a || {};
            var d = a.Tb;
            b = a.Ta;
            var e = a.ia, f = '<div class="mdl-card mdl-shadow--2dp firebaseui-container firebaseui-id-page-password-sign-up"><form onsubmit="return false;"><div class="firebaseui-card-header"><h1 class="firebaseui-title">Create account</h1></div><div class="firebaseui-card-content">' + Qj(a);
            d ? (a = a || {}, a = a.name, a = '<div class="firebaseui-textfield mdl-textfield mdl-js-textfield mdl-textfield--floating-label"><label class="mdl-textfield__label firebaseui-label" for="ui-sign-in-name-input">First &amp; last name</label><input type="text" name="name" id="ui-sign-in-name-input" autocomplete="name" class="mdl-textfield__input firebaseui-input firebaseui-id-name" value="' + ud(a != null ? a : "") + '"></div><div class="firebaseui-error-wrapper"><p class="firebaseui-error firebaseui-text-input-error firebaseui-hidden firebaseui-id-name-error"></p></div>', a = B(a)) : a = "";
            c = f + a + Vj(null) + '</div><div class="firebaseui-card-actions"><div class="firebaseui-form-actions">' + (b ? Yj(null) : "") + Tj() + '</div></div><div class="firebaseui-card-footer">' + (e ? ak(c) : Zj(c)) + "</div></form></div>";
            return B(c);
          }
          yk.a = "firebaseui.auth.soy2.page.passwordSignUp";
          function zk(a, b, c) {
            a = a || {};
            b = a.Ta;
            a = '<div class="mdl-card mdl-shadow--2dp firebaseui-container firebaseui-id-page-password-recovery"><form onsubmit="return false;"><div class="firebaseui-card-header"><h1 class="firebaseui-title">Recover password</h1></div><div class="firebaseui-card-content"><p class="firebaseui-text">Get instructions sent to this email that explain how to reset your password</p>' + Qj(a) + '</div><div class="firebaseui-card-actions"><div class="firebaseui-form-actions">' + (b ? Yj(null) : "") + Rj({ label: D("Send") }) + '</div></div><div class="firebaseui-card-footer">' + Zj(c) + "</div></form></div>";
            return B(a);
          }
          zk.a = "firebaseui.auth.soy2.page.passwordRecovery";
          function Ak(a, b, c) {
            b = a.G;
            var d = "";
            a = "Follow the instructions sent to <strong>" + (A(a.email) + "</strong> to recover your password");
            d += '<div class="mdl-card mdl-shadow--2dp firebaseui-container firebaseui-id-page-password-recovery-email-sent"><div class="firebaseui-card-header"><h1 class="firebaseui-title">Check your email</h1></div><div class="firebaseui-card-content"><p class="firebaseui-text">' + a + '</p></div><div class="firebaseui-card-actions">';
            b && (d += '<div class="firebaseui-form-actions">' + Rj({ label: D("Done") }) + "</div>");
            d += '</div><div class="firebaseui-card-footer">' + Zj(c) + "</div></div>";
            return B(d);
          }
          Ak.a = "firebaseui.auth.soy2.page.passwordRecoveryEmailSent";
          function Bk(a, b, c) {
            return B('<div class="mdl-card mdl-shadow--2dp firebaseui-container firebaseui-id-page-callback"><div class="firebaseui-callback-indicator-container">' + fk(null, null, c) + "</div></div>");
          }
          Bk.a = "firebaseui.auth.soy2.page.callback";
          function Ck(a, b, c) {
            return B('<div class="firebaseui-container firebaseui-id-page-spinner">' + fk({ tb: true }, null, c) + "</div>");
          }
          Ck.a = "firebaseui.auth.soy2.page.spinner";
          function Dk() {
            return B('<div class="firebaseui-container firebaseui-id-page-blank firebaseui-use-spinner"></div>');
          }
          Dk.a = "firebaseui.auth.soy2.page.blank";
          function Ek(a, b, c) {
            b = "";
            a = "A sign-in email with additional instructions was sent to <strong>" + (A(a.email) + "</strong>. Check your email to complete sign-in.");
            var d = B('<a class="firebaseui-link firebaseui-id-trouble-getting-email-link" href="javascript:void(0)">Trouble getting email?</a>');
            b += '<div class="mdl-card mdl-shadow--2dp firebaseui-container firebaseui-id-page-email-link-sign-in-sent"><form onsubmit="return false;"><div class="firebaseui-card-header"><h1 class="firebaseui-title">Sign-in email sent</h1></div><div class="firebaseui-card-content"><div class="firebaseui-email-sent"></div><p class="firebaseui-text">' + a + '</p></div><div class="firebaseui-card-actions"><div class="firebaseui-form-links">' + d + '</div><div class="firebaseui-form-actions">' + Yj({ label: D("Back") }) + '</div></div><div class="firebaseui-card-footer">' + Zj(c) + "</div></form></div>";
            return B(b);
          }
          Ek.a = "firebaseui.auth.soy2.page.emailLinkSignInSent";
          function Fk(a, b, c) {
            a = `<div class="mdl-card mdl-shadow--2dp firebaseui-container firebaseui-id-page-email-not-received"><form onsubmit="return false;"><div class="firebaseui-card-header"><h1 class="firebaseui-title">Trouble getting email?</h1></div><div class="firebaseui-card-content"><p class="firebaseui-text">Try these common fixes:<ul><li>Check if the email was marked as spam or filtered.</li><li>Check your internet connection.</li><li>Check that you did not misspell your email.</li><li>Check that your inbox space is not running out or other inbox settings related issues.</li></ul></p><p class="firebaseui-text">If the steps above didn't work, you can resend the email. Note that this will deactivate the link in the older email.</p></div><div class="firebaseui-card-actions"><div class="firebaseui-form-links">` + B('<a class="firebaseui-link firebaseui-id-resend-email-link" href="javascript:void(0)">Resend</a>') + '</div><div class="firebaseui-form-actions">' + Yj({ label: D("Back") }) + '</div></div><div class="firebaseui-card-footer">' + Zj(c) + "</div></form></div>";
            return B(a);
          }
          Fk.a = "firebaseui.auth.soy2.page.emailNotReceived";
          function Gk(a, b, c) {
            a = '<div class="mdl-card mdl-shadow--2dp firebaseui-container firebaseui-id-page-email-link-sign-in-confirmation"><form onsubmit="return false;"><div class="firebaseui-card-header"><h1 class="firebaseui-title">Confirm email</h1></div><div class="firebaseui-card-content"><p class="firebaseui-text">Confirm your email to complete sign in</p><div class="firebaseui-relative-wrapper">' + Qj(a) + '</div></div><div class="firebaseui-card-actions"><div class="firebaseui-form-actions">' + Yj(null) + Rj(null) + '</div></div><div class="firebaseui-card-footer">' + Zj(c) + "</div></form></div>";
            return B(a);
          }
          Gk.a = "firebaseui.auth.soy2.page.emailLinkSignInConfirmation";
          function Hk() {
            var a = '<div class="mdl-card mdl-shadow--2dp firebaseui-container firebaseui-id-page-different-device-error"><div class="firebaseui-card-header"><h1 class="firebaseui-title">New device or browser detected</h1></div><div class="firebaseui-card-content"><p class="firebaseui-text">Try opening the link using the same device or browser where you started the sign-in process.</p></div><div class="firebaseui-card-actions"><div class="firebaseui-form-actions">' + Yj({ label: D("Dismiss") }) + "</div></div></div>";
            return B(a);
          }
          Hk.a = "firebaseui.auth.soy2.page.differentDeviceError";
          function Ik() {
            var a = '<div class="mdl-card mdl-shadow--2dp firebaseui-container firebaseui-id-page-anonymous-user-mismatch"><div class="firebaseui-card-header"><h1 class="firebaseui-title">Session ended</h1></div><div class="firebaseui-card-content"><p class="firebaseui-text">The session associated with this sign-in request has either expired or was cleared.</p></div><div class="firebaseui-card-actions"><div class="firebaseui-form-actions">' + Yj({ label: D("Dismiss") }) + "</div></div></div>";
            return B(a);
          }
          Ik.a = "firebaseui.auth.soy2.page.anonymousUserMismatch";
          function Jk(a, b, c) {
            b = "";
            a = "You\u2019ve already used <strong>" + (A(a.email) + "</strong> to sign in. Enter your password for that account.");
            b += '<div class="mdl-card mdl-shadow--2dp firebaseui-container firebaseui-id-page-password-linking"><form onsubmit="return false;"><div class="firebaseui-card-header"><h1 class="firebaseui-title">Sign in</h1></div><div class="firebaseui-card-content"><h2 class="firebaseui-subtitle">You already have an account</h2><p class="firebaseui-text">' + a + "</p>" + Wj() + '</div><div class="firebaseui-card-actions"><div class="firebaseui-form-links">' + Xj() + '</div><div class="firebaseui-form-actions">' + Sj() + '</div></div><div class="firebaseui-card-footer">' + Zj(c) + "</div></form></div>";
            return B(b);
          }
          Jk.a = "firebaseui.auth.soy2.page.passwordLinking";
          function Kk(a, b, c) {
            var d = a.email;
            b = "";
            a = "" + gk(a, c);
            a = D(a);
            d = "You\u2019ve already used <strong>" + (A(d) + ("</strong>. You can connect your <strong>" + (A(a) + ("</strong> account with <strong>" + (A(d) + "</strong> by signing in with email link below.")))));
            a = "For this flow to successfully connect your " + (A(a) + " account with this email, you have to open the link on the same device or browser.");
            b += '<div class="mdl-card mdl-shadow--2dp firebaseui-container firebaseui-id-page-email-link-sign-in-linking"><form onsubmit="return false;"><div class="firebaseui-card-header"><h1 class="firebaseui-title">Sign in</h1></div><div class="firebaseui-card-content"><h2 class="firebaseui-subtitle">You already have an account</h2><p class="firebaseui-text firebaseui-text-justify">' + d + '<p class="firebaseui-text firebaseui-text-justify">' + a + '</p></div><div class="firebaseui-card-actions"><div class="firebaseui-form-actions">' + Sj() + '</div></div><div class="firebaseui-card-footer">' + Zj(c) + "</div></form></div>";
            return B(b);
          }
          Kk.a = "firebaseui.auth.soy2.page.emailLinkSignInLinking";
          function Lk(a, b, c) {
            b = "";
            var d = "" + gk(a, c);
            d = D(d);
            a = "You originally intended to connect <strong>" + (A(d) + "</strong> to your email account but have opened the link on a different device where you are not signed in.");
            d = "If you still want to connect your <strong>" + (A(d) + "</strong> account, open the link on the same device where you started sign-in. Otherwise, tap Continue to sign-in on this device.");
            b += '<div class="mdl-card mdl-shadow--2dp firebaseui-container firebaseui-id-page-email-link-sign-in-linking-different-device"><form onsubmit="return false;"><div class="firebaseui-card-header"><h1 class="firebaseui-title">Sign in</h1></div><div class="firebaseui-card-content"><p class="firebaseui-text firebaseui-text-justify">' + a + '</p><p class="firebaseui-text firebaseui-text-justify">' + d + '</p></div><div class="firebaseui-card-actions"><div class="firebaseui-form-actions">' + Uj() + '</div></div><div class="firebaseui-card-footer">' + Zj(c) + "</div></form></div>";
            return B(b);
          }
          Lk.a = "firebaseui.auth.soy2.page.emailLinkSignInLinkingDifferentDevice";
          function Mk(a, b, c) {
            var d = a.email;
            b = "";
            a = "" + gk(a, c);
            a = D(a);
            d = "You\u2019ve already used <strong>" + (A(d) + ("</strong>. Sign in with " + (A(a) + " to continue.")));
            b += '<div class="mdl-card mdl-shadow--2dp firebaseui-container firebaseui-id-page-federated-linking"><form onsubmit="return false;"><div class="firebaseui-card-header"><h1 class="firebaseui-title">Sign in</h1></div><div class="firebaseui-card-content"><h2 class="firebaseui-subtitle">You already have an account</h2><p class="firebaseui-text">' + d + '</p></div><div class="firebaseui-card-actions"><div class="firebaseui-form-actions">' + Rj({ label: D("Sign in with " + a) }) + '</div></div><div class="firebaseui-card-footer">' + Zj(c) + "</div></form></div>";
            return B(b);
          }
          Mk.a = "firebaseui.auth.soy2.page.federatedLinking";
          function Nk(a, b, c) {
            a = a || {};
            var d = a.kc;
            b = a.yb;
            a = a.Eb;
            var e = '<div class="mdl-card mdl-shadow--2dp firebaseui-container firebaseui-id-page-unauthorized-user"><form onsubmit="return false;"><div class="firebaseui-card-header"><h1 class="firebaseui-title">Not Authorized</h1></div><div class="firebaseui-card-content"><p class="firebaseui-text">';
            d ? (d = "<strong>" + (A(d) + "</strong> is not authorized to view the requested page."), e += d) : e += "User is not authorized to view the requested page.";
            e += "</p>";
            b && (b = "Please contact <strong>" + (A(b) + "</strong> for authorization."), e += '<p class="firebaseui-text firebaseui-id-unauthorized-user-admin-email">' + b + "</p>");
            e += '</div><div class="firebaseui-card-actions"><div class="firebaseui-form-links">';
            a && (e += '<a class="firebaseui-link firebaseui-id-unauthorized-user-help-link" href="javascript:void(0)" target="_blank">Learn More</a>');
            e += '</div><div class="firebaseui-form-actions">' + Yj({ label: D("Back") }) + '</div></div><div class="firebaseui-card-footer">' + Zj(c) + "</div></form></div>";
            return B(e);
          }
          Nk.a = "firebaseui.auth.soy2.page.unauthorizedUser";
          function Ok(a, b, c) {
            b = "";
            a = "To continue sign in with <strong>" + (A(a.email) + "</strong> on this device, you have to recover the password.");
            b += '<div class="mdl-card mdl-shadow--2dp firebaseui-container firebaseui-id-page-unsupported-provider"><form onsubmit="return false;"><div class="firebaseui-card-header"><h1 class="firebaseui-title">Sign in</h1></div><div class="firebaseui-card-content"><p class="firebaseui-text">' + a + '</p></div><div class="firebaseui-card-actions"><div class="firebaseui-form-actions">' + Yj(null) + Rj({ label: D("Recover password") }) + '</div></div><div class="firebaseui-card-footer">' + Zj(c) + "</div></form></div>";
            return B(b);
          }
          Ok.a = "firebaseui.auth.soy2.page.unsupportedProvider";
          function Pk(a) {
            var b = "", c = '<p class="firebaseui-text">for <strong>' + (A(a.email) + "</strong></p>");
            b += '<div class="mdl-card mdl-shadow--2dp firebaseui-container firebaseui-id-page-password-reset"><form onsubmit="return false;"><div class="firebaseui-card-header"><h1 class="firebaseui-title">Reset your password</h1></div><div class="firebaseui-card-content">' + c + Vj(sd(a)) + '</div><div class="firebaseui-card-actions"><div class="firebaseui-form-actions">' + Tj() + "</div></div></form></div>";
            return B(b);
          }
          Pk.a = "firebaseui.auth.soy2.page.passwordReset";
          function Qk(a) {
            a = a || {};
            a = '<div class="mdl-card mdl-shadow--2dp firebaseui-container firebaseui-id-page-password-reset-success"><div class="firebaseui-card-header"><h1 class="firebaseui-title">Password changed</h1></div><div class="firebaseui-card-content"><p class="firebaseui-text">You can now sign in with your new password</p></div><div class="firebaseui-card-actions">' + (a.G ? '<div class="firebaseui-form-actions">' + Uj() + "</div>" : "") + "</div></div>";
            return B(a);
          }
          Qk.a = "firebaseui.auth.soy2.page.passwordResetSuccess";
          function Rk(a) {
            a = a || {};
            a = '<div class="mdl-card mdl-shadow--2dp firebaseui-container firebaseui-id-page-password-reset-failure"><div class="firebaseui-card-header"><h1 class="firebaseui-title">Try resetting your password again</h1></div><div class="firebaseui-card-content"><p class="firebaseui-text">Your request to reset your password has expired or the link has already been used</p></div><div class="firebaseui-card-actions">' + (a.G ? '<div class="firebaseui-form-actions">' + Uj() + "</div>" : "") + "</div></div>";
            return B(a);
          }
          Rk.a = "firebaseui.auth.soy2.page.passwordResetFailure";
          function Sk(a) {
            var b = a.G, c = "";
            a = "Your sign-in email address has been changed back to <strong>" + (A(a.email) + "</strong>.");
            c += '<div class="mdl-card mdl-shadow--2dp firebaseui-container firebaseui-id-page-email-change-revoke-success"><form onsubmit="return false;"><div class="firebaseui-card-header"><h1 class="firebaseui-title">Updated email address</h1></div><div class="firebaseui-card-content"><p class="firebaseui-text">' + a + '</p><p class="firebaseui-text">If you didn\u2019t ask to change your sign-in email, it\u2019s possible someone is trying to access your account and you should <a class="firebaseui-link firebaseui-id-reset-password-link" href="javascript:void(0)">change your password right away</a>.</p></div><div class="firebaseui-card-actions">' + (b ? '<div class="firebaseui-form-actions">' + Uj() + "</div>" : "") + "</div></form></div>";
            return B(c);
          }
          Sk.a = "firebaseui.auth.soy2.page.emailChangeRevokeSuccess";
          function Tk(a) {
            a = a || {};
            a = '<div class="mdl-card mdl-shadow--2dp firebaseui-container firebaseui-id-page-email-change-revoke-failure"><div class="firebaseui-card-header"><h1 class="firebaseui-title">Unable to update your email address</h1></div><div class="firebaseui-card-content"><p class="firebaseui-text">There was a problem changing your sign-in email back.</p><p class="firebaseui-text">If you try again and still can\u2019t reset your email, try asking your administrator for help.</p></div><div class="firebaseui-card-actions">' + (a.G ? '<div class="firebaseui-form-actions">' + Uj() + "</div>" : "") + "</div></div>";
            return B(a);
          }
          Tk.a = "firebaseui.auth.soy2.page.emailChangeRevokeFailure";
          function Uk(a) {
            a = a || {};
            a = '<div class="mdl-card mdl-shadow--2dp firebaseui-container firebaseui-id-page-email-verification-success"><div class="firebaseui-card-header"><h1 class="firebaseui-title">Your email has been verified</h1></div><div class="firebaseui-card-content"><p class="firebaseui-text">You can now sign in with your new account</p></div><div class="firebaseui-card-actions">' + (a.G ? '<div class="firebaseui-form-actions">' + Uj() + "</div>" : "") + "</div></div>";
            return B(a);
          }
          Uk.a = "firebaseui.auth.soy2.page.emailVerificationSuccess";
          function Vk(a) {
            a = a || {};
            a = '<div class="mdl-card mdl-shadow--2dp firebaseui-container firebaseui-id-page-email-verification-failure"><div class="firebaseui-card-header"><h1 class="firebaseui-title">Try verifying your email again</h1></div><div class="firebaseui-card-content"><p class="firebaseui-text">Your request to verify your email has expired or the link has already been used</p></div><div class="firebaseui-card-actions">' + (a.G ? '<div class="firebaseui-form-actions">' + Uj() + "</div>" : "") + "</div></div>";
            return B(a);
          }
          Vk.a = "firebaseui.auth.soy2.page.emailVerificationFailure";
          function Xk(a) {
            var b = a.G, c = "";
            a = "You can now sign in with your new email <strong>" + (A(a.email) + "</strong>.");
            c += '<div class="mdl-card mdl-shadow--2dp firebaseui-container firebaseui-id-page-verify-and-change-email-success"><div class="firebaseui-card-header"><h1 class="firebaseui-title">Your email has been verified and changed</h1></div><div class="firebaseui-card-content"><p class="firebaseui-text">' + a + '</p></div><div class="firebaseui-card-actions">' + (b ? '<div class="firebaseui-form-actions">' + Uj() + "</div>" : "") + "</div></div>";
            return B(c);
          }
          Xk.a = "firebaseui.auth.soy2.page.verifyAndChangeEmailSuccess";
          function Yk(a) {
            a = a || {};
            a = '<div class="mdl-card mdl-shadow--2dp firebaseui-container firebaseui-id-page-verify-and-change-email-failure"><div class="firebaseui-card-header"><h1 class="firebaseui-title">Try updating your email again</h1></div><div class="firebaseui-card-content"><p class="firebaseui-text">Your request to verify and update your email has expired or the link has already been used.</p></div><div class="firebaseui-card-actions">' + (a.G ? '<div class="firebaseui-form-actions">' + Uj() + "</div>" : "") + "</div></div>";
            return B(a);
          }
          Yk.a = "firebaseui.auth.soy2.page.verifyAndChangeEmailFailure";
          function Zk(a) {
            var b = a.factorId, c = a.phoneNumber;
            a = a.G;
            var d = '<div class="mdl-card mdl-shadow--2dp firebaseui-container firebaseui-id-page-revert-second-factor-addition-success"><form onsubmit="return false;"><div class="firebaseui-card-header"><h1 class="firebaseui-title">Removed second factor</h1></div><div class="firebaseui-card-content"><p class="firebaseui-text">';
            switch (b) {
              case "phone":
                b = "The <strong>" + (A(b) + (" " + (A(c) + "</strong> was removed as a second authentication step.")));
                d += b;
                break;
              default:
                d += "The device or app was removed as a second authentication step.";
            }
            d += `</p><p class="firebaseui-text">If you don't recognize this device, someone might be trying to access your account. Consider <a class="firebaseui-link firebaseui-id-reset-password-link" href="javascript:void(0)">changing your password right away</a>.</p></div><div class="firebaseui-card-actions">` + (a ? '<div class="firebaseui-form-actions">' + Uj() + "</div>" : "") + "</div></form></div>";
            return B(d);
          }
          Zk.a = "firebaseui.auth.soy2.page.revertSecondFactorAdditionSuccess";
          function $k(a) {
            a = a || {};
            a = `<div class="mdl-card mdl-shadow--2dp firebaseui-container firebaseui-id-page-revert-second-factor-addition-failure"><div class="firebaseui-card-header"><h1 class="firebaseui-title">Couldn't remove your second factor</h1></div><div class="firebaseui-card-content"><p class="firebaseui-text">Something went wrong removing your second factor.</p><p class="firebaseui-text">Try removing it again. If that doesn't work, contact support for assistance.</p></div><div class="firebaseui-card-actions">` + (a.G ? '<div class="firebaseui-form-actions">' + Uj() + "</div>" : "") + "</div></div>";
            return B(a);
          }
          $k.a = "firebaseui.auth.soy2.page.revertSecondFactorAdditionFailure";
          function al(a) {
            var b = a.zb;
            a = '<div class="mdl-card mdl-shadow--2dp firebaseui-container firebaseui-id-page-recoverable-error"><div class="firebaseui-card-header"><h1 class="firebaseui-title">Error encountered</h1></div><div class="firebaseui-card-content"><p class="firebaseui-text">' + A(a.errorMessage) + '</p></div><div class="firebaseui-card-actions"><div class="firebaseui-form-actions">';
            b && (a += Rj({ label: D("Retry") }));
            return B(a + "</div></div></div>");
          }
          al.a = "firebaseui.auth.soy2.page.recoverableError";
          function bl(a) {
            a = '<div class="mdl-card mdl-shadow--2dp firebaseui-container firebaseui-id-page-unrecoverable-error"><div class="firebaseui-card-header"><h1 class="firebaseui-title">Error encountered</h1></div><div class="firebaseui-card-content"><p class="firebaseui-text">' + A(a.errorMessage) + "</p></div></div>";
            return B(a);
          }
          bl.a = "firebaseui.auth.soy2.page.unrecoverableError";
          function cl(a, b, c) {
            var d = a.Qb;
            b = "";
            a = "Continue with " + (A(a.jc) + "?");
            d = "You originally wanted to sign in with " + A(d);
            b += '<div class="mdl-card mdl-shadow--2dp firebaseui-container firebaseui-id-page-email-mismatch"><form onsubmit="return false;"><div class="firebaseui-card-header"><h1 class="firebaseui-title">Sign in</h1></div><div class="firebaseui-card-content"><h2 class="firebaseui-subtitle">' + a + '</h2><p class="firebaseui-text">' + d + '</p></div><div class="firebaseui-card-actions"><div class="firebaseui-form-actions">' + Yj(null) + Rj({ label: D("Continue") }) + '</div></div><div class="firebaseui-card-footer">' + Zj(c) + "</div></form></div>";
            return B(b);
          }
          cl.a = "firebaseui.auth.soy2.page.emailMismatch";
          function dl(a, b, c) {
            var d = '<div class="firebaseui-container firebaseui-page-provider-sign-in firebaseui-id-page-provider-sign-in firebaseui-use-spinner"><div class="firebaseui-card-content"><form onsubmit="return false;"><ul class="firebaseui-idp-list">';
            a = a.Sb;
            b = a.length;
            for (var e = 0; e < b; e++) {
              var f = { ga: a[e] }, g = c;
              f = f || {};
              var h = f.ga;
              var k = f;
              k = k || {};
              var p = "";
              switch (k.ga.providerId) {
                case "google.com":
                  p += "firebaseui-idp-google";
                  break;
                case "github.com":
                  p += "firebaseui-idp-github";
                  break;
                case "facebook.com":
                  p += "firebaseui-idp-facebook";
                  break;
                case "twitter.com":
                  p += "firebaseui-idp-twitter";
                  break;
                case "phone":
                  p += "firebaseui-idp-phone";
                  break;
                case "anonymous":
                  p += "firebaseui-idp-anonymous";
                  break;
                case "password":
                  p += "firebaseui-idp-password";
                  break;
                default:
                  p += "firebaseui-idp-generic";
              }
              k = '<button class="firebaseui-idp-button mdl-button mdl-js-button mdl-button--raised ' + ud(C(p)) + ' firebaseui-id-idp-button" data-provider-id="' + ud(h.providerId) + '" style="background-color:';
              p = (p = f) || {};
              p = p.ga;
              k = k + ud(Dd(C(p.ta ? p.ta : g.wa[p.providerId] ? "" + g.wa[p.providerId] : p.providerId.indexOf("saml.") == 0 ? "" + g.wa.saml : p.providerId.indexOf("oidc.") == 0 ? "" + g.wa.oidc : "" + g.wa.password))) + '"><span class="firebaseui-idp-icon-wrapper"><img class="firebaseui-idp-icon" alt="" src="';
              var t = f;
              p = g;
              t = t || {};
              t = t.ga;
              p = rd(t.za ? zd(t.za) : p.xa[t.providerId] ? zd(p.xa[t.providerId]) : t.providerId.indexOf("saml.") == 0 ? zd(p.xa.saml) : t.providerId.indexOf("oidc.") == 0 ? zd(p.xa.oidc) : zd(p.xa.password));
              k = k + ud(zd(p)) + '"></span>';
              h.providerId == "password" ? (k += '<span class="firebaseui-idp-text firebaseui-idp-text-long">', h.V ? k += A(h.V) : h.S ? (f = "Sign in with " + A(gk(f, g)), k += f) : k += "Sign in with email", k += '</span><span class="firebaseui-idp-text firebaseui-idp-text-short">', k = h.S ? k + A(h.S) : k + "Email", k += "</span>") : h.providerId == "phone" ? (k += '<span class="firebaseui-idp-text firebaseui-idp-text-long">', h.V ? k += A(h.V) : h.S ? (f = "Sign in with " + A(gk(f, g)), k += f) : k += "Sign in with phone", k += '</span><span class="firebaseui-idp-text firebaseui-idp-text-short">', k = h.S ? k + A(h.S) : k + "Phone", k += "</span>") : h.providerId == "anonymous" ? (k += '<span class="firebaseui-idp-text firebaseui-idp-text-long">', h.V ? k += A(h.V) : h.S ? (f = "Sign in with " + A(gk(f, g)), k += f) : k += "Continue as guest", k += '</span><span class="firebaseui-idp-text firebaseui-idp-text-short">', k = h.S ? k + A(h.S) : k + "Guest", k += "</span>") : (k += '<span class="firebaseui-idp-text firebaseui-idp-text-long">', h.V ? k += A(h.V) : (p = "Sign in with " + A(gk(f, g)), k += p), k += '</span><span class="firebaseui-idp-text firebaseui-idp-text-short">' + (h.S ? A(h.S) : A(gk(f, g))) + "</span>");
              h = B(k + "</button>");
              d += '<li class="firebaseui-list-item">' + h + "</li>";
            }
            d += '</ul></form></div><div class="firebaseui-card-footer firebaseui-provider-sign-in-footer">' + ak(c) + "</div></div>";
            return B(d);
          }
          dl.a = "firebaseui.auth.soy2.page.providerSignIn";
          function el(a, b, c) {
            a = a || {};
            var d = a.Gb, e = a.Va;
            b = a.ia;
            a = a || {};
            a = a.Aa;
            a = '<div class="firebaseui-phone-number"><button class="firebaseui-id-country-selector firebaseui-country-selector mdl-button mdl-js-button"><span class="firebaseui-flag firebaseui-country-selector-flag firebaseui-id-country-selector-flag"></span><span class="firebaseui-id-country-selector-code"></span></button><div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label firebaseui-textfield firebaseui-phone-input-wrapper"><label class="mdl-textfield__label firebaseui-label" for="ui-sign-in-phone-number-input">Phone number</label><input type="tel" name="phoneNumber" id="ui-sign-in-phone-number-input" class="mdl-textfield__input firebaseui-input firebaseui-id-phone-number" value="' + ud(a != null ? a : "") + '"></div></div><div class="firebaseui-error-wrapper"><p class="firebaseui-error firebaseui-text-input-error firebaseui-hidden firebaseui-phone-number-error firebaseui-id-phone-number-error"></p></div>';
            a = '<div class="mdl-card mdl-shadow--2dp firebaseui-container firebaseui-id-page-phone-sign-in-start"><form onsubmit="return false;"><div class="firebaseui-card-header"><h1 class="firebaseui-title">Enter your phone number</h1></div><div class="firebaseui-card-content"><div class="firebaseui-relative-wrapper">' + B(a);
            var f;
            d ? f = B('<div class="firebaseui-recaptcha-wrapper"><div class="firebaseui-recaptcha-container"></div><div class="firebaseui-error-wrapper firebaseui-recaptcha-error-wrapper"><p class="firebaseui-error firebaseui-hidden firebaseui-id-recaptcha-error"></p></div></div>') : f = "";
            f = a + f + '</div></div><div class="firebaseui-card-actions"><div class="firebaseui-form-actions">' + (e ? Yj(null) : "") + Rj({ label: D("Verify") }) + '</div></div><div class="firebaseui-card-footer">';
            b ? (b = '<p class="firebaseui-tos firebaseui-phone-tos">', b = c.F && c.D ? b + 'By tapping Verify, you are indicating that you accept our <a href="javascript:void(0)" class="firebaseui-link firebaseui-tos-link" target="_blank">Terms of Service</a> and <a href="javascript:void(0)" class="firebaseui-link firebaseui-pp-link" target="_blank">Privacy Policy</a>. An SMS may be sent. Message &amp; data rates may apply.' : b + "By tapping Verify, an SMS may be sent. Message &amp; data rates may apply.", c = B(b + "</p>")) : c = B('<p class="firebaseui-tos firebaseui-phone-sms-notice">By tapping Verify, an SMS may be sent. Message &amp; data rates may apply.</p>') + Zj(c);
            return B(f + c + "</div></form></div>");
          }
          el.a = "firebaseui.auth.soy2.page.phoneSignInStart";
          function fl(a, b, c) {
            a = a || {};
            b = a.phoneNumber;
            var d = "";
            a = 'Enter the 6-digit code we sent to <a class="firebaseui-link firebaseui-change-phone-number-link firebaseui-id-change-phone-number-link" href="javascript:void(0)">&lrm;' + (A(b) + "</a>");
            A(b);
            b = d;
            d = B('<div class="firebaseui-textfield mdl-textfield mdl-js-textfield mdl-textfield--floating-label"><label class="mdl-textfield__label firebaseui-label" for="ui-sign-in-phone-confirmation-code-input">6-digit code</label><input type="number" name="phoneConfirmationCode" id="ui-sign-in-phone-confirmation-code-input" class="mdl-textfield__input firebaseui-input firebaseui-id-phone-confirmation-code"></div><div class="firebaseui-error-wrapper"><p class="firebaseui-error firebaseui-text-input-error firebaseui-hidden firebaseui-id-phone-confirmation-code-error"></p></div>');
            c = '<div class="mdl-card mdl-shadow--2dp firebaseui-container firebaseui-id-page-phone-sign-in-finish"><form onsubmit="return false;"><div class="firebaseui-card-header"><h1 class="firebaseui-title">Verify your phone number</h1></div><div class="firebaseui-card-content"><p class="firebaseui-text">' + a + "</p>" + d + '</div><div class="firebaseui-card-actions"><div class="firebaseui-form-actions">' + Yj(null) + Rj({ label: D("Continue") }) + '</div></div><div class="firebaseui-card-footer">' + Zj(c) + "</div></form>";
            a = B('<div class="firebaseui-resend-container"><span class="firebaseui-id-resend-countdown"></span><a href="javascript:void(0)" class="firebaseui-id-resend-link firebaseui-hidden firebaseui-link">Resend</a></div>');
            return B(b + (c + a + "</div>"));
          }
          fl.a = "firebaseui.auth.soy2.page.phoneSignInFinish";
          function gl() {
            return B('<div class="mdl-card mdl-shadow--2dp firebaseui-container firebaseui-id-page-sign-out"><div class="firebaseui-card-header"><h1 class="firebaseui-title">Sign Out</h1></div><div class="firebaseui-card-content"><p class="firebaseui-text">You are now successfully signed out.</p></div></div>');
          }
          gl.a = "firebaseui.auth.soy2.page.signOut";
          function hl(a, b, c) {
            var d = '<div class="firebaseui-container firebaseui-page-select-tenant firebaseui-id-page-select-tenant"><div class="firebaseui-card-content"><form onsubmit="return false;"><ul class="firebaseui-tenant-list">';
            a = a.ec;
            b = a.length;
            for (var e = 0; e < b; e++) {
              var f = a[e];
              var g = "";
              var h = A(f.displayName), k = f.tenantId ? f.tenantId : "top-level-project";
              k = D(k);
              g += '<button class="firebaseui-tenant-button mdl-button mdl-js-button mdl-button--raised firebaseui-tenant-selection-' + ud(k) + ' firebaseui-id-tenant-selection-button"' + (f.tenantId ? 'data-tenant-id="' + ud(f.tenantId) + '"' : "") + 'style="background-color:' + ud(Dd(f.ta)) + '"><span class="firebaseui-idp-icon-wrapper"><img class="firebaseui-idp-icon" alt="" src="' + ud(zd(f.za)) + '"></span><span class="firebaseui-idp-text firebaseui-idp-text-long">';
              f.V ? g += A(f.V) : (f = "Sign in to " + A(f.displayName), g += f);
              g = B(g + ('</span><span class="firebaseui-idp-text firebaseui-idp-text-short">' + h + "</span></button>"));
              d += '<li class="firebaseui-list-item">' + g + "</li>";
            }
            d += '</ul></form></div><div class="firebaseui-card-footer firebaseui-provider-sign-in-footer">' + ak(c) + "</div></div>";
            return B(d);
          }
          hl.a = "firebaseui.auth.soy2.page.selectTenant";
          function il(a, b, c) {
            a = '<div class="mdl-card mdl-shadow--2dp firebaseui-container firebaseui-id-page-provider-match-by-email"><form onsubmit="return false;"><div class="firebaseui-card-header"><h1 class="firebaseui-title">Sign in</h1></div><div class="firebaseui-card-content"><div class="firebaseui-relative-wrapper">' + Qj(null) + '</div></div><div class="firebaseui-card-actions"><div class="firebaseui-form-actions">' + Rj(null) + '</div></div><div class="firebaseui-card-footer">' + ak(c) + "</div></form></div>";
            return B(a);
          }
          il.a = "firebaseui.auth.soy2.page.providerMatchByEmail";
          function jl() {
            return M(this, "firebaseui-id-submit");
          }
          function kl() {
            return M(this, "firebaseui-id-secondary-link");
          }
          function ll(a, b) {
            O(this, jl.call(this), function(d) {
              a(d);
            });
            var c = kl.call(this);
            c && b && O(this, c, function(d) {
              b(d);
            });
          }
          function ml() {
            return M(this, "firebaseui-id-password");
          }
          function nl() {
            return M(this, "firebaseui-id-password-error");
          }
          function ol() {
            var a = ml.call(this), b = nl.call(this);
            Jj(this, a, function() {
              Pj(b) && (N(a, true), Nj(b));
            });
          }
          function pl() {
            var a = ml.call(this);
            var b = nl.call(this);
            Wi(a) ? (N(a, true), Nj(b), b = true) : (N(a, false), Oj(b, C("Enter your password").toString()), b = false);
            return b ? Wi(a) : null;
          }
          function ql(a, b, c, d, e, f) {
            P.call(this, Jk, { email: a }, f, "passwordLinking", { F: d, D: e });
            this.w = b;
            this.H = c;
          }
          m(ql, P);
          ql.prototype.v = function() {
            this.P();
            this.M(this.w, this.H);
            vk(this, this.i(), this.w);
            this.i().focus();
            P.prototype.v.call(this);
          };
          ql.prototype.o = function() {
            this.w = null;
            P.prototype.o.call(this);
          };
          ql.prototype.j = function() {
            return Wi(M(this, "firebaseui-id-email"));
          };
          u(ql.prototype, { i: ml, B: nl, P: ol, u: pl, ea: jl, ba: kl, M: ll });
          var rl = /^[+a-zA-Z0-9_.!#$%&'*\/=?^`{|}~-]+@([a-zA-Z0-9-]+\.)+[a-zA-Z0-9]{2,63}$/;
          function sl() {
            return M(this, "firebaseui-id-email");
          }
          function tl() {
            return M(this, "firebaseui-id-email-error");
          }
          function ul(a) {
            var b = sl.call(this), c = tl.call(this);
            Jj(this, b, function() {
              Pj(c) && (N(b, true), Nj(c));
            });
            a && Kj(this, b, function() {
              a();
            });
          }
          function vl() {
            return Ua(Wi(sl.call(this)) || "");
          }
          function wl() {
            var a = sl.call(this);
            var b = tl.call(this);
            var c = Wi(a) || "";
            c ? rl.test(c) ? (N(a, true), Nj(b), b = true) : (N(a, false), Oj(b, C("That email address isn't correct").toString()), b = false) : (N(a, false), Oj(b, C("Enter your email address to continue").toString()), b = false);
            return b ? Ua(Wi(a)) : null;
          }
          function xl(a, b, c, d, e, f, g) {
            P.call(this, xk, { email: c, ia: !!f }, g, "passwordSignIn", { F: d, D: e });
            this.w = a;
            this.H = b;
          }
          m(xl, P);
          xl.prototype.v = function() {
            this.P();
            this.ea();
            this.ba(this.w, this.H);
            uk(this, this.l(), this.i());
            vk(this, this.i(), this.w);
            Wi(this.l()) ? this.i().focus() : this.l().focus();
            P.prototype.v.call(this);
          };
          xl.prototype.o = function() {
            this.H = this.w = null;
            P.prototype.o.call(this);
          };
          u(xl.prototype, { l: sl, U: tl, P: ul, M: vl, j: wl, i: ml, B: nl, ea: ol, u: pl, ua: jl, pa: kl, ba: ll });
          function R(a, b, c, d, e, f) {
            P.call(this, a, b, d, e || "notice", f);
            this.i = c || null;
          }
          w(R, P);
          R.prototype.v = function() {
            this.i && (this.u(this.i), this.l().focus());
            R.K.v.call(this);
          };
          R.prototype.o = function() {
            this.i = null;
            R.K.o.call(this);
          };
          u(R.prototype, { l: jl, w: kl, u: ll });
          function yl(a, b, c, d, e) {
            R.call(this, Ak, { email: a, G: !!b }, b, e, "passwordRecoveryEmailSent", { F: c, D: d });
          }
          w(yl, R);
          function zl(a, b) {
            R.call(this, Uk, { G: !!a }, a, b, "emailVerificationSuccess");
          }
          w(zl, R);
          function Al(a, b) {
            R.call(this, Vk, { G: !!a }, a, b, "emailVerificationFailure");
          }
          w(Al, R);
          function Bl(a, b, c) {
            R.call(this, Xk, { email: a, G: !!b }, b, c, "verifyAndChangeEmailSuccess");
          }
          w(Bl, R);
          function Cl(a, b) {
            R.call(this, Yk, { G: !!a }, a, b, "verifyAndChangeEmailFailure");
          }
          w(Cl, R);
          function Dl(a, b) {
            R.call(this, $k, { G: !!a }, a, b, "revertSecondFactorAdditionFailure");
          }
          w(Dl, R);
          function El(a) {
            R.call(this, gl, void 0, void 0, a, "signOut");
          }
          w(El, R);
          function Fl(a, b) {
            R.call(this, Qk, { G: !!a }, a, b, "passwordResetSuccess");
          }
          w(Fl, R);
          function Gl(a, b) {
            R.call(this, Rk, { G: !!a }, a, b, "passwordResetFailure");
          }
          w(Gl, R);
          function Hl(a, b) {
            R.call(this, Tk, { G: !!a }, a, b, "emailChangeRevokeFailure");
          }
          w(Hl, R);
          function Il(a, b, c) {
            R.call(this, al, { errorMessage: a, zb: !!b }, b, c, "recoverableError");
          }
          w(Il, R);
          function Jl(a, b) {
            R.call(this, bl, { errorMessage: a }, void 0, b, "unrecoverableError");
          }
          w(Jl, R);
          function Kl(a) {
            if (a.code === "auth/invalid-credential" && a.message && a.message.indexOf("error=consent_required") !== -1)
              return { code: "auth/user-cancelled" };
            if (a.message && a.message.indexOf("HTTP Cloud Function returned an error:") !== -1) {
              var b = JSON.parse(a.message.substring(a.message.indexOf("{"), a.message.lastIndexOf("}") + 1));
              return { code: a.code, message: b && b.error && b.error.message || a.message };
            }
            return a;
          }
          function Ll(a, b, c, d) {
            function e(g) {
              if (!g.name || g.name != "cancel") {
                a: {
                  var h = g.message;
                  try {
                    var k = ((JSON.parse(h).error || {}).message || "").toLowerCase().match(/invalid.+(access|id)_token/);
                    if (k && k.length) {
                      var p = true;
                      break a;
                    }
                  } catch (t) {
                  }
                  p = false;
                }
                if (p)
                  g = Q(b), b.m(), S(a, g, void 0, C("Your sign-in session has expired. Please try again.").toString());
                else {
                  p = g && g.message || "";
                  if (g.code) {
                    if (g.code == "auth/email-already-in-use" || g.code == "auth/credential-already-in-use")
                      return;
                    p = T(g);
                  }
                  b.a(p);
                }
              }
            }
            Ml(a);
            if (d)
              return Nl(a, c), F();
            if (!c.credential)
              throw Error("No credential found!");
            if (!U(a).currentUser && !c.user)
              throw Error("User not logged in.");
            try {
              var f = Ol(a, c);
            } catch (g) {
              return og(g.code || g.message, g), b.a(g.code || g.message), F();
            }
            c = f.then(function(g) {
              Nl(a, g);
            }, e).then(void 0, e);
            V(a, f);
            return F(c);
          }
          function Nl(a, b) {
            if (!b.user)
              throw Error("No user found");
            var c = Mi(W(a));
            Ki(W(a)) && c && tg("Both signInSuccess and signInSuccessWithAuthResult callbacks are provided. Only signInSuccessWithAuthResult callback will be invoked.");
            if (c) {
              c = Mi(W(a));
              var d = yh(X(a)) || void 0;
              wh(sh, X(a));
              var e = false;
              if (qf()) {
                if (!c || c(b, d))
                  e = true, Nc(window.opener.location, Pl(a, d));
                c || window.close();
              } else if (!c || c(b, d))
                e = true, Nc(window.location, Pl(a, d));
              e || a.reset();
            } else {
              c = b.user;
              b = b.credential;
              d = Ki(W(a));
              e = yh(X(a)) || void 0;
              wh(sh, X(a));
              var f = false;
              if (qf()) {
                if (!d || d(c, b, e))
                  f = true, Nc(window.opener.location, Pl(a, e));
                d || window.close();
              } else if (!d || d(c, b, e))
                f = true, Nc(window.location, Pl(a, e));
              f || a.reset();
            }
          }
          function Pl(a, b) {
            a = b || W(a).a.get("signInSuccessUrl");
            if (!a)
              throw Error("No redirect URL has been found. You must either specify a signInSuccessUrl in the configuration, pass in a redirect URL to the widget URL, or return false from the callback.");
            return a;
          }
          function T(a) {
            var b = { code: a.code };
            b = b || {};
            var c = "";
            switch (b.code) {
              case "auth/email-already-in-use":
                c += "The email address is already used by another account";
                break;
              case "auth/requires-recent-login":
                c += Md();
                break;
              case "auth/too-many-requests":
                c += "You have entered an incorrect password too many times. Please try again in a few minutes.";
                break;
              case "auth/user-cancelled":
                c += "Please authorize the required permissions to sign in to the application";
                break;
              case "auth/user-not-found":
                c += "That email address doesn't match an existing account";
                break;
              case "auth/user-token-expired":
                c += Md();
                break;
              case "auth/weak-password":
                c += "Strong passwords have at least 6 characters and a mix of letters and numbers";
                break;
              case "auth/wrong-password":
                c += "The email and password you entered don't match";
                break;
              case "auth/network-request-failed":
                c += "A network error has occurred";
                break;
              case "auth/invalid-phone-number":
                c += Hd();
                break;
              case "auth/invalid-verification-code":
                c += C("Wrong code. Try again.");
                break;
              case "auth/code-expired":
                c += "This code is no longer valid";
                break;
              case "auth/expired-action-code":
                c += "This code has expired.";
                break;
              case "auth/invalid-action-code":
                c += "The action code is invalid. This can happen if the code is malformed, expired, or has already been used.";
            }
            if (b = C(c).toString())
              return b;
            try {
              return JSON.parse(a.message), og("Internal error: " + a.message, void 0), Jd().toString();
            } catch (d) {
              return a.message;
            }
          }
          function Ql(a, b, c) {
            var d = ai[b] && firebase2.auth[ai[b]] ? new firebase2.auth[ai[b]]() : b.indexOf("saml.") == 0 ? new firebase2.auth.SAMLAuthProvider(b) : new firebase2.auth.OAuthProvider(b);
            if (!d)
              throw Error("Invalid Firebase Auth provider!");
            var e = wi(W(a), b);
            if (d.addScope)
              for (var f = 0; f < e.length; f++)
                d.addScope(e[f]);
            e = xi(W(a), b) || {};
            c && (b == firebase2.auth.GoogleAuthProvider.PROVIDER_ID ? a = "login_hint" : b == firebase2.auth.GithubAuthProvider.PROVIDER_ID ? a = "login" : a = (a = ii(W(a), b)) && a.Ob, a && (e[a] = c));
            d.setCustomParameters && d.setCustomParameters(e);
            return d;
          }
          function Rl(a, b, c, d) {
            function e() {
              Dh(new Dg(a.h.tenantId || null), X(a));
              V(a, b.I(r(a.dc, a), [k], function() {
                if ((window.location && window.location.protocol) === "file:")
                  return V(a, Sl(a).then(function(p) {
                    b.m();
                    wh(rh, X(a));
                    L("callback", a, h, F(p));
                  }, f));
              }, g));
            }
            function f(p) {
              wh(rh, X(a));
              if (!p.name || p.name != "cancel")
                switch (p = Kl(p), p.code) {
                  case "auth/popup-blocked":
                    e();
                    break;
                  case "auth/popup-closed-by-user":
                  case "auth/cancelled-popup-request":
                    break;
                  case "auth/credential-already-in-use":
                    break;
                  case "auth/network-request-failed":
                  case "auth/too-many-requests":
                  case "auth/user-cancelled":
                    b.a(T(p));
                    break;
                  case "auth/admin-restricted-operation":
                    b.m();
                    pi(W(a)) ? L("handleUnauthorizedUser", a, h, null, c) : L("callback", a, h, df(p));
                    break;
                  default:
                    b.m(), L("callback", a, h, df(p));
                }
            }
            function g(p) {
              wh(rh, X(a));
              p.name && p.name == "cancel" || (og("signInWithRedirect: " + p.code, void 0), p = T(p), b.Ga == "blank" && Gi(W(a)) ? (b.m(), L("providerSignIn", a, h, p)) : b.a(p));
            }
            var h = Q(b), k = Ql(a, c, d);
            Hi(W(a)) == Ii ? e() : V(a, Tl(a, k).then(function(p) {
              b.m();
              L("callback", a, h, F(p));
            }, f));
          }
          function Ul(a, b) {
            V(a, b.I(r(a.$b, a), [], function(c) {
              b.m();
              return Ll(a, b, c, true);
            }, function(c) {
              c.name && c.name == "cancel" || (og("ContinueAsGuest: " + c.code, void 0), c = T(c), b.a(c));
            }));
          }
          function Vl(a, b, c) {
            function d(f) {
              var g = false;
              f = b.I(r(a.ac, a), [f], function(h) {
                var k = Q(b);
                b.m();
                L("callback", a, k, F(h));
                g = true;
              }, function(h) {
                if (!h.name || h.name != "cancel") {
                  if (!h || h.code != "auth/credential-already-in-use")
                    if (h && h.code == "auth/email-already-in-use" && h.email && h.credential) {
                      var k = Q(b);
                      b.m();
                      L("callback", a, k, df(h));
                    } else
                      h && h.code == "auth/admin-restricted-operation" && pi(W(a)) ? (h = Q(b), b.m(), L("handleUnauthorizedUser", a, h, null, firebase2.auth.GoogleAuthProvider.PROVIDER_ID)) : (h = T(h), b.a(h));
                }
              });
              V(a, f);
              return f.then(function() {
                return g;
              }, function() {
                return false;
              });
            }
            if (c && c.credential && c.clientId === li(W(a))) {
              if (wi(W(a), firebase2.auth.GoogleAuthProvider.PROVIDER_ID).length) {
                try {
                  var e = JSON.parse(atob(c.credential.split(".")[1])).email;
                } catch (f) {
                }
                Rl(a, b, firebase2.auth.GoogleAuthProvider.PROVIDER_ID, e);
                return F(true);
              }
              return d(firebase2.auth.GoogleAuthProvider.credential(c.credential));
            }
            c && b.a(C("The selected credential for the authentication provider is not supported!").toString());
            return F(false);
          }
          function Wl(a, b) {
            var c = b.j(), d = b.u();
            if (c)
              if (d) {
                var e = firebase2.auth.EmailAuthProvider.credential(c, d);
                V(a, b.I(r(a.bc, a), [c, d], function(f) {
                  return Ll(a, b, { user: f.user, credential: e, operationType: f.operationType, additionalUserInfo: f.additionalUserInfo });
                }, function(f) {
                  if (!f.name || f.name != "cancel")
                    switch (f.code) {
                      case "auth/email-already-in-use":
                        break;
                      case "auth/email-exists":
                        N(b.l(), false);
                        Oj(b.U(), T(f));
                        break;
                      case "auth/too-many-requests":
                      case "auth/wrong-password":
                        N(b.i(), false);
                        Oj(b.B(), T(f));
                        break;
                      default:
                        og("verifyPassword: " + f.message, void 0), b.a(T(f));
                    }
                }));
              } else
                b.i().focus();
            else
              b.l().focus();
          }
          function Xl(a) {
            a = hi(W(a));
            return a.length == 1 && a[0] == firebase2.auth.EmailAuthProvider.PROVIDER_ID;
          }
          function Yl(a) {
            a = hi(W(a));
            return a.length == 1 && a[0] == firebase2.auth.PhoneAuthProvider.PROVIDER_ID;
          }
          function S(a, b, c, d) {
            Xl(a) ? d ? L("signIn", a, b, c, d) : Zl(a, b, c) : a && Yl(a) && !d ? L("phoneSignInStart", a, b) : a && Gi(W(a)) && !d ? L("federatedRedirect", a, b, c) : L("providerSignIn", a, b, d, c);
          }
          function $l(a, b, c, d) {
            var e = Q(b);
            V(a, b.I(r(U(a).fetchSignInMethodsForEmail, U(a)), [c], function(f) {
              b.m();
              am(a, e, f, c, d);
            }, function(f) {
              f = T(f);
              b.a(f);
            }));
          }
          function am(a, b, c, d, e, f) {
            c.length || Di(W(a)) && !Di(W(a)) ? Ma(c, firebase2.auth.EmailAuthProvider.EMAIL_PASSWORD_SIGN_IN_METHOD) ? L("passwordSignIn", a, b, d, f) : c.length == 1 && c[0] === firebase2.auth.EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD ? Di(W(a)) ? L("sendEmailLinkForSignIn", a, b, d, function() {
              L("signIn", a, b);
            }) : L("unsupportedProvider", a, b, d) : (c = Zh(c, hi(W(a)))) ? (Bh(new Ag(d), X(a)), L("federatedSignIn", a, b, d, c, e)) : L("unsupportedProvider", a, b, d) : oi(W(a)) ? L("handleUnauthorizedUser", a, b, d, firebase2.auth.EmailAuthProvider.PROVIDER_ID) : Di(W(a)) ? L("sendEmailLinkForSignIn", a, b, d, function() {
              L("signIn", a, b);
            }) : L("passwordSignUp", a, b, d, void 0, void 0, f);
          }
          function bm(a, b, c, d, e, f) {
            var g = Q(b);
            V(a, b.I(r(a.Ib, a), [c, f], function() {
              b.m();
              L("emailLinkSignInSent", a, g, c, d, f);
            }, e));
          }
          function Zl(a, b, c) {
            c ? L("prefilledEmailSignIn", a, b, c) : L("signIn", a, b);
          }
          function cm() {
            return tb(tf(), "oobCode");
          }
          function dm() {
            var a = tb(tf(), "continueUrl");
            return a ? function() {
              Nc(window.location, a);
            } : null;
          }
          function em(a, b) {
            P.call(this, Ik, void 0, b, "anonymousUserMismatch");
            this.i = a;
          }
          m(em, P);
          em.prototype.v = function() {
            var a = this;
            O(this, this.l(), function() {
              a.i();
            });
            this.l().focus();
            P.prototype.v.call(this);
          };
          em.prototype.o = function() {
            this.i = null;
            P.prototype.o.call(this);
          };
          u(em.prototype, { l: kl });
          K.anonymousUserMismatch = function(a, b) {
            var c = new em(function() {
              c.m();
              S(a, b);
            });
            c.render(b);
            Y(a, c);
          };
          function fm(a) {
            P.call(this, Bk, void 0, a, "callback");
          }
          m(fm, P);
          fm.prototype.I = function(a, b, c, d) {
            return a.apply(null, b).then(c, d);
          };
          function gm(a, b, c) {
            if (c.user) {
              var d = { user: c.user, credential: c.credential, operationType: c.operationType, additionalUserInfo: c.additionalUserInfo }, e = zh(X(a)), f = e && e.g;
              if (f && !hm(c.user, f))
                im(a, b, d);
              else {
                var g = e && e.a;
                g ? V(a, c.user.linkWithCredential(g).then(function(h) {
                  d = { user: h.user, credential: g, operationType: h.operationType, additionalUserInfo: h.additionalUserInfo };
                  jm(a, b, d);
                }, function(h) {
                  km(a, b, h);
                })) : jm(a, b, d);
              }
            } else
              c = Q(b), b.m(), Ah(X(a)), S(a, c);
          }
          function jm(a, b, c) {
            Ah(X(a));
            Ll(a, b, c);
          }
          function km(a, b, c) {
            var d = Q(b);
            Ah(X(a));
            c = T(c);
            b.m();
            S(a, d, void 0, c);
          }
          function lm(a, b, c, d) {
            var e = Q(b);
            V(a, U(a).fetchSignInMethodsForEmail(c).then(function(f) {
              b.m();
              f.length ? Ma(f, firebase2.auth.EmailAuthProvider.EMAIL_PASSWORD_SIGN_IN_METHOD) ? L("passwordLinking", a, e, c) : f.length == 1 && f[0] === firebase2.auth.EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD ? L("emailLinkSignInLinking", a, e, c) : (f = Zh(f, hi(W(a)))) ? L("federatedLinking", a, e, c, f, d) : (Ah(X(a)), L("unsupportedProvider", a, e, c)) : (Ah(X(a)), L("passwordRecovery", a, e, c, false, Kd().toString()));
            }, function(f) {
              km(a, b, f);
            }));
          }
          function im(a, b, c) {
            var d = Q(b);
            V(a, mm(a).then(function() {
              b.m();
              L("emailMismatch", a, d, c);
            }, function(e) {
              e.name && e.name == "cancel" || (e = T(e.code), b.a(e));
            }));
          }
          function hm(a, b) {
            if (b == a.email)
              return true;
            if (a.providerData) {
              for (var c = 0; c < a.providerData.length; c++)
                if (b == a.providerData[c].email)
                  return true;
            }
            return false;
          }
          K.callback = function(a, b, c) {
            var d = new fm();
            d.render(b);
            Y(a, d);
            c = c || Sl(a);
            V(a, c.then(function(e) {
              gm(a, d, e);
            }, function(e) {
              if ((e = Kl(e)) && (e.code == "auth/account-exists-with-different-credential" || e.code == "auth/email-already-in-use") && e.email && e.credential)
                Bh(new Ag(e.email, e.credential), X(a)), lm(a, d, e.email);
              else if (e && e.code == "auth/user-cancelled") {
                var f = zh(X(a)), g = T(e);
                f && f.a ? lm(a, d, f.g, g) : f ? $l(a, d, f.g, g) : km(a, d, e);
              } else
                e && e.code == "auth/credential-already-in-use" || (e && e.code == "auth/operation-not-supported-in-this-environment" && Xl(a) ? gm(a, d, { user: null, credential: null }) : e && e.code == "auth/admin-restricted-operation" && pi(W(a)) ? (d.m(), Ah(X(a)), L("handleUnauthorizedUser", a, b, null, null)) : km(a, d, e));
            }));
          };
          function nm(a, b) {
            P.call(this, Hk, void 0, b, "differentDeviceError");
            this.i = a;
          }
          m(nm, P);
          nm.prototype.v = function() {
            var a = this;
            O(this, this.l(), function() {
              a.i();
            });
            this.l().focus();
            P.prototype.v.call(this);
          };
          nm.prototype.o = function() {
            this.i = null;
            P.prototype.o.call(this);
          };
          u(nm.prototype, { l: kl });
          K.differentDeviceError = function(a, b) {
            var c = new nm(function() {
              c.m();
              S(a, b);
            });
            c.render(b);
            Y(a, c);
          };
          function om(a, b, c, d) {
            P.call(this, Sk, { email: a, G: !!c }, d, "emailChangeRevoke");
            this.l = b;
            this.i = c || null;
          }
          m(om, P);
          om.prototype.v = function() {
            var a = this;
            O(this, M(this, "firebaseui-id-reset-password-link"), function() {
              a.l();
            });
            this.i && (this.w(this.i), this.u().focus());
            P.prototype.v.call(this);
          };
          om.prototype.o = function() {
            this.l = this.i = null;
            P.prototype.o.call(this);
          };
          u(om.prototype, { u: jl, B: kl, w: ll });
          function pm() {
            return M(this, "firebaseui-id-new-password");
          }
          function qm() {
            return M(this, "firebaseui-id-password-toggle");
          }
          function rm() {
            this.Ra = !this.Ra;
            var a = qm.call(this), b = pm.call(this);
            this.Ra ? (b.type = "text", Ui(a, "firebaseui-input-toggle-off"), Vi(a, "firebaseui-input-toggle-on")) : (b.type = "password", Ui(a, "firebaseui-input-toggle-on"), Vi(a, "firebaseui-input-toggle-off"));
            b.focus();
          }
          function sm() {
            return M(this, "firebaseui-id-new-password-error");
          }
          function tm() {
            this.Ra = false;
            var a = pm.call(this);
            a.type = "password";
            var b = sm.call(this);
            Jj(this, a, function() {
              Pj(b) && (N(a, true), Nj(b));
            });
            var c = qm.call(this);
            Ui(c, "firebaseui-input-toggle-on");
            Vi(c, "firebaseui-input-toggle-off");
            Lj(this, a, function() {
              Ui(c, "firebaseui-input-toggle-focus");
              Vi(c, "firebaseui-input-toggle-blur");
            });
            Mj(this, a, function() {
              Ui(c, "firebaseui-input-toggle-blur");
              Vi(c, "firebaseui-input-toggle-focus");
            });
            O(this, c, r(rm, this));
          }
          function um() {
            var a = pm.call(this);
            var b = sm.call(this);
            Wi(a) ? (N(a, true), Nj(b), b = true) : (N(a, false), Oj(b, C("Enter your password").toString()), b = false);
            return b ? Wi(a) : null;
          }
          function vm(a, b, c) {
            P.call(this, Pk, { email: a }, c, "passwordReset");
            this.l = b;
          }
          m(vm, P);
          vm.prototype.v = function() {
            this.H();
            this.B(this.l);
            vk(this, this.i(), this.l);
            this.i().focus();
            P.prototype.v.call(this);
          };
          vm.prototype.o = function() {
            this.l = null;
            P.prototype.o.call(this);
          };
          u(vm.prototype, { i: pm, w: sm, M: qm, H: tm, u: um, U: jl, P: kl, B: ll });
          function wm(a, b, c, d, e) {
            P.call(this, Zk, { factorId: a, phoneNumber: c || null, G: !!d }, e, "revertSecondFactorAdditionSuccess");
            this.l = b;
            this.i = d || null;
          }
          m(wm, P);
          wm.prototype.v = function() {
            var a = this;
            O(this, M(this, "firebaseui-id-reset-password-link"), function() {
              a.l();
            });
            this.i && (this.w(this.i), this.u().focus());
            P.prototype.v.call(this);
          };
          wm.prototype.o = function() {
            this.l = this.i = null;
            P.prototype.o.call(this);
          };
          u(wm.prototype, {
            u: jl,
            B: kl,
            w: ll
          });
          function xm(a, b, c, d, e) {
            var f = c.u();
            f && V(a, c.I(r(U(a).confirmPasswordReset, U(a)), [d, f], function() {
              c.m();
              var g = new Fl(e);
              g.render(b);
              Y(a, g);
            }, function(g) {
              ym(a, b, c, g);
            }));
          }
          function ym(a, b, c, d) {
            (d && d.code) == "auth/weak-password" ? (a = T(d), N(c.i(), false), Oj(c.w(), a), c.i().focus()) : (c && c.m(), c = new Gl(), c.render(b), Y(a, c));
          }
          function zm(a, b, c) {
            var d = new om(c, function() {
              V(a, d.I(r(U(a).sendPasswordResetEmail, U(a)), [c], function() {
                d.m();
                d = new yl(c, void 0, H(W(a)), J(W(a)));
                d.render(b);
                Y(a, d);
              }, function() {
                d.a(Id().toString());
              }));
            });
            d.render(b);
            Y(a, d);
          }
          function Am(a, b, c, d) {
            var e = new wm(d.factorId, function() {
              e.I(r(U(a).sendPasswordResetEmail, U(a)), [c], function() {
                e.m();
                e = new yl(c, void 0, H(W(a)), J(W(a)));
                e.render(b);
                Y(a, e);
              }, function() {
                e.a(Id().toString());
              });
            }, d.phoneNumber);
            e.render(b);
            Y(a, e);
          }
          K.passwordReset = function(a, b, c, d) {
            V(a, U(a).verifyPasswordResetCode(c).then(function(e) {
              var f = new vm(e, function() {
                xm(a, b, f, c, d);
              });
              f.render(b);
              Y(a, f);
            }, function() {
              ym(a, b);
            }));
          };
          K.emailChangeRevocation = function(a, b, c) {
            var d = null;
            V(a, U(a).checkActionCode(c).then(function(e) {
              d = e.data.email;
              return U(a).applyActionCode(c);
            }).then(function() {
              zm(a, b, d);
            }, function() {
              var e = new Hl();
              e.render(b);
              Y(a, e);
            }));
          };
          K.emailVerification = function(a, b, c, d) {
            V(a, U(a).applyActionCode(c).then(function() {
              var e = new zl(d);
              e.render(b);
              Y(a, e);
            }, function() {
              var e = new Al();
              e.render(b);
              Y(a, e);
            }));
          };
          K.revertSecondFactorAddition = function(a, b, c) {
            var d = null, e = null;
            V(a, U(a).checkActionCode(c).then(function(f) {
              d = f.data.email;
              e = f.data.multiFactorInfo;
              return U(a).applyActionCode(c);
            }).then(function() {
              Am(a, b, d, e);
            }, function() {
              var f = new Dl();
              f.render(b);
              Y(a, f);
            }));
          };
          K.verifyAndChangeEmail = function(a, b, c, d) {
            var e = null;
            V(a, U(a).checkActionCode(c).then(function(f) {
              e = f.data.email;
              return U(a).applyActionCode(c);
            }).then(function() {
              var f = new Bl(e, d);
              f.render(b);
              Y(a, f);
            }, function() {
              var f = new Cl();
              f.render(b);
              Y(a, f);
            }));
          };
          function Bm(a, b) {
            try {
              var c = typeof a.selectionStart == "number";
            } catch (d) {
              c = false;
            }
            c ? (a.selectionStart = b, a.selectionEnd = b) : z && !mc("9") && (a.type == "textarea" && (b = a.value.substring(0, b).replace(/(\r\n|\r|\n)/g, "\n").length), a = a.createTextRange(), a.collapse(true), a.move("character", b), a.select());
          }
          function Cm(a, b, c, d, e, f) {
            P.call(this, Gk, { email: c }, f, "emailLinkSignInConfirmation", { F: d, D: e });
            this.l = a;
            this.u = b;
          }
          m(Cm, P);
          Cm.prototype.v = function() {
            this.w(this.l);
            this.B(this.l, this.u);
            this.i().focus();
            Bm(this.i(), (this.i().value || "").length);
            P.prototype.v.call(this);
          };
          Cm.prototype.o = function() {
            this.u = this.l = null;
            P.prototype.o.call(this);
          };
          u(Cm.prototype, { i: sl, M: tl, w: ul, H: vl, j: wl, U: jl, P: kl, B: ll });
          K.emailLinkConfirmation = function(a, b, c, d, e, f) {
            var g = new Cm(function() {
              var h = g.j();
              h ? (g.m(), d(a, b, h, c)) : g.i().focus();
            }, function() {
              g.m();
              S(a, b, e || void 0);
            }, e || void 0, H(W(a)), J(W(a)));
            g.render(b);
            Y(a, g);
            f && g.a(f);
          };
          function Dm(a, b, c, d, e) {
            P.call(this, Lk, { ga: a }, e, "emailLinkSignInLinkingDifferentDevice", { F: c, D: d });
            this.i = b;
          }
          m(Dm, P);
          Dm.prototype.v = function() {
            this.u(this.i);
            this.l().focus();
            P.prototype.v.call(this);
          };
          Dm.prototype.o = function() {
            this.i = null;
            P.prototype.o.call(this);
          };
          u(Dm.prototype, { l: jl, u: ll });
          K.emailLinkNewDeviceLinking = function(a, b, c, d) {
            var e = new Pb(c);
            c = e.a.a.get(x.PROVIDER_ID) || null;
            Tb(e, null);
            if (c) {
              var f = new Dm(ii(W(a), c), function() {
                f.m();
                d(a, b, e.toString());
              }, H(W(a)), J(W(a)));
              f.render(b);
              Y(a, f);
            } else
              S(a, b);
          };
          function Em(a) {
            P.call(this, Dk, void 0, a, "blank");
          }
          m(Em, P);
          function Fm(a, b, c, d, e) {
            var f = new Em(), g = new Pb(c), h = g.a.a.get(x.$a) || "", k = g.a.a.get(x.Sa) || "", p = g.a.a.get(x.Qa) === "1", t = Sb(g), I = g.a.a.get(x.PROVIDER_ID) || null;
            g = g.a.a.get(x.vb) || null;
            Gm(a, g);
            var Ca = !vh(th, X(a)), Wk = d || Eh(k, X(a)), ld = (d = Fh(k, X(a))) && d.a;
            I && ld && ld.providerId !== I && (ld = null);
            f.render(b);
            Y(a, f);
            V(a, f.I(function() {
              var ya = F(null);
              ya = t && Ca || Ca && p ? df(Error("anonymous-user-not-found")) : Hm(a, c).then(function(wg) {
                if (I && !ld)
                  throw Error("pending-credential-not-found");
                return wg;
              });
              var md = null;
              return ya.then(function(wg) {
                md = wg;
                return e ? null : U(a).checkActionCode(h);
              }).then(function() {
                return md;
              });
            }, [], function(ya) {
              Wk ? Im(a, f, Wk, c, ld, ya) : p ? (f.m(), L("differentDeviceError", a, b)) : (f.m(), L("emailLinkConfirmation", a, b, c, Jm));
            }, function(ya) {
              var md = void 0;
              if (!ya || !ya.name || ya.name != "cancel")
                switch (f.m(), ya && ya.message) {
                  case "anonymous-user-not-found":
                    L("differentDeviceError", a, b);
                    break;
                  case "anonymous-user-mismatch":
                    L("anonymousUserMismatch", a, b);
                    break;
                  case "pending-credential-not-found":
                    L("emailLinkNewDeviceLinking", a, b, c, Km);
                    break;
                  default:
                    ya && (md = T(ya)), S(a, b, void 0, md);
                }
            }));
          }
          function Jm(a, b, c, d) {
            Fm(a, b, d, c, true);
          }
          function Km(a, b, c) {
            Fm(a, b, c);
          }
          function Im(a, b, c, d, e, f) {
            var g = Q(b);
            b.$("mdl-spinner mdl-spinner--single-color mdl-js-spinner is-active firebaseui-progress-dialog-loading-icon", C("Signing in...").toString());
            var h = null;
            e = (f ? Lm(a, f, c, d, e) : Mm(a, c, d, e)).then(function(k) {
              wh(uh, X(a));
              wh(th, X(a));
              b.h();
              b.$("firebaseui-icon-done", C("Signed in!").toString());
              h = setTimeout(function() {
                b.h();
                Ll(a, b, k, true);
              }, 1e3);
              V(a, function() {
                b && (b.h(), b.m());
                clearTimeout(h);
              });
            }, function(k) {
              b.h();
              b.m();
              if (!k.name || k.name != "cancel") {
                k = Kl(k);
                var p = T(k);
                k.code == "auth/email-already-in-use" || k.code == "auth/credential-already-in-use" ? (wh(uh, X(a)), wh(th, X(a))) : k.code == "auth/invalid-email" ? (p = C("The email provided does not match the current sign-in session.").toString(), L("emailLinkConfirmation", a, g, d, Jm, null, p)) : S(a, g, c, p);
              }
            });
            V(a, e);
          }
          K.emailLinkSignInCallback = Fm;
          function Nm(a, b, c, d, e, f) {
            P.call(this, Kk, { email: a, ga: b }, f, "emailLinkSignInLinking", { F: d, D: e });
            this.i = c;
          }
          m(Nm, P);
          Nm.prototype.v = function() {
            this.u(this.i);
            this.l().focus();
            P.prototype.v.call(this);
          };
          Nm.prototype.o = function() {
            this.i = null;
            P.prototype.o.call(this);
          };
          u(Nm.prototype, { l: jl, u: ll });
          function Om(a, b, c, d) {
            var e = Q(b);
            bm(a, b, c, function() {
              S(a, e, c);
            }, function(f) {
              if (!f.name || f.name != "cancel") {
                var g = T(f);
                f && f.code == "auth/network-request-failed" ? b.a(g) : (b.m(), S(a, e, c, g));
              }
            }, d);
          }
          K.emailLinkSignInLinking = function(a, b, c) {
            var d = zh(X(a));
            Ah(X(a));
            if (d) {
              var e = d.a.providerId, f = new Nm(c, ii(W(a), e), function() {
                Om(a, f, c, d);
              }, H(W(a)), J(W(a)));
              f.render(b);
              Y(a, f);
            } else
              S(a, b);
          };
          function Pm(a, b, c, d, e, f) {
            P.call(this, Ek, { email: a }, f, "emailLinkSignInSent", { F: d, D: e });
            this.u = b;
            this.i = c;
          }
          m(Pm, P);
          Pm.prototype.v = function() {
            var a = this;
            O(this, this.l(), function() {
              a.i();
            });
            O(this, M(this, "firebaseui-id-trouble-getting-email-link"), function() {
              a.u();
            });
            this.l().focus();
            P.prototype.v.call(this);
          };
          Pm.prototype.o = function() {
            this.i = this.u = null;
            P.prototype.o.call(this);
          };
          u(Pm.prototype, { l: kl });
          K.emailLinkSignInSent = function(a, b, c, d, e) {
            var f = new Pm(c, function() {
              f.m();
              L("emailNotReceived", a, b, c, d, e);
            }, function() {
              f.m();
              d();
            }, H(W(a)), J(W(a)));
            f.render(b);
            Y(a, f);
          };
          function Qm(a, b, c, d, e, f, g) {
            P.call(this, cl, { jc: a, Qb: b }, g, "emailMismatch", { F: e, D: f });
            this.l = c;
            this.i = d;
          }
          m(Qm, P);
          Qm.prototype.v = function() {
            this.w(this.l, this.i);
            this.u().focus();
            P.prototype.v.call(this);
          };
          Qm.prototype.o = function() {
            this.i = null;
            P.prototype.o.call(this);
          };
          u(Qm.prototype, { u: jl, B: kl, w: ll });
          K.emailMismatch = function(a, b, c) {
            var d = zh(X(a));
            if (d) {
              var e = new Qm(c.user.email, d.g, function() {
                var f = e;
                Ah(X(a));
                Ll(a, f, c);
              }, function() {
                var f = c.credential.providerId, g = Q(e);
                e.m();
                d.a ? L("federatedLinking", a, g, d.g, f) : L("federatedSignIn", a, g, d.g, f);
              }, H(W(a)), J(W(a)));
              e.render(b);
              Y(a, e);
            } else
              S(a, b);
          };
          function Rm(a, b, c, d, e) {
            P.call(this, Fk, void 0, e, "emailNotReceived", { F: c, D: d });
            this.l = a;
            this.i = b;
          }
          m(Rm, P);
          Rm.prototype.v = function() {
            var a = this;
            O(this, this.u(), function() {
              a.i();
            });
            O(this, this.Da(), function() {
              a.l();
            });
            this.u().focus();
            P.prototype.v.call(this);
          };
          Rm.prototype.Da = function() {
            return M(this, "firebaseui-id-resend-email-link");
          };
          Rm.prototype.o = function() {
            this.i = this.l = null;
            P.prototype.o.call(this);
          };
          u(Rm.prototype, { u: kl });
          K.emailNotReceived = function(a, b, c, d, e) {
            var f = new Rm(function() {
              bm(a, f, c, d, function(g) {
                g = T(g);
                f.a(g);
              }, e);
            }, function() {
              f.m();
              S(a, b, c);
            }, H(W(a)), J(W(a)));
            f.render(b);
            Y(a, f);
          };
          function Sm(a, b, c, d, e, f) {
            P.call(this, Mk, { email: a, ga: b }, f, "federatedLinking", { F: d, D: e });
            this.i = c;
          }
          m(Sm, P);
          Sm.prototype.v = function() {
            this.u(this.i);
            this.l().focus();
            P.prototype.v.call(this);
          };
          Sm.prototype.o = function() {
            this.i = null;
            P.prototype.o.call(this);
          };
          u(Sm.prototype, { l: jl, u: ll });
          K.federatedLinking = function(a, b, c, d, e) {
            var f = zh(X(a));
            if (f && f.a) {
              var g = new Sm(c, ii(W(a), d), function() {
                Rl(a, g, d, c);
              }, H(W(a)), J(W(a)));
              g.render(b);
              Y(a, g);
              e && g.a(e);
            } else
              S(a, b);
          };
          K.federatedRedirect = function(a, b, c) {
            var d = new Em();
            d.render(b);
            Y(a, d);
            b = hi(W(a))[0];
            Rl(a, d, b, c);
          };
          K.federatedSignIn = function(a, b, c, d, e) {
            var f = new Sm(c, ii(W(a), d), function() {
              Rl(a, f, d, c);
            }, H(W(a)), J(W(a)));
            f.render(b);
            Y(a, f);
            e && f.a(e);
          };
          function Tm(a, b, c, d) {
            var e = b.u();
            e ? V(a, b.I(r(a.Xb, a), [c, e], function(f) {
              f = f.user.linkWithCredential(d).then(function(g) {
                return Ll(a, b, { user: g.user, credential: d, operationType: g.operationType, additionalUserInfo: g.additionalUserInfo });
              });
              V(a, f);
              return f;
            }, function(f) {
              if (!f.name || f.name != "cancel")
                switch (f.code) {
                  case "auth/wrong-password":
                    N(b.i(), false);
                    Oj(b.B(), T(f));
                    break;
                  case "auth/too-many-requests":
                    b.a(T(f));
                    break;
                  default:
                    og("signInWithEmailAndPassword: " + f.message, void 0), b.a(T(f));
                }
            })) : b.i().focus();
          }
          K.passwordLinking = function(a, b, c) {
            var d = zh(X(a));
            Ah(X(a));
            var e = d && d.a;
            if (e) {
              var f = new ql(c, function() {
                Tm(a, f, c, e);
              }, function() {
                f.m();
                L("passwordRecovery", a, b, c);
              }, H(W(a)), J(W(a)));
              f.render(b);
              Y(a, f);
            } else
              S(a, b);
          };
          function Um(a, b, c, d, e, f) {
            P.call(this, zk, { email: c, Ta: !!b }, f, "passwordRecovery", { F: d, D: e });
            this.l = a;
            this.u = b;
          }
          m(Um, P);
          Um.prototype.v = function() {
            this.B();
            this.H(this.l, this.u);
            Wi(this.i()) || this.i().focus();
            vk(this, this.i(), this.l);
            P.prototype.v.call(this);
          };
          Um.prototype.o = function() {
            this.u = this.l = null;
            P.prototype.o.call(this);
          };
          u(Um.prototype, { i: sl, w: tl, B: ul, M: vl, j: wl, U: jl, P: kl, H: ll });
          function Vm(a, b) {
            var c = b.j();
            if (c) {
              var d = Q(b);
              V(a, b.I(r(U(a).sendPasswordResetEmail, U(a)), [c], function() {
                b.m();
                var e = new yl(c, function() {
                  e.m();
                  S(a, d);
                }, H(W(a)), J(W(a)));
                e.render(d);
                Y(a, e);
              }, function(e) {
                N(b.i(), false);
                Oj(b.w(), T(e));
              }));
            } else
              b.i().focus();
          }
          K.passwordRecovery = function(a, b, c, d, e) {
            var f = new Um(function() {
              Vm(a, f);
            }, d ? void 0 : function() {
              f.m();
              S(a, b);
            }, c, H(W(a)), J(W(a)));
            f.render(b);
            Y(a, f);
            e && f.a(e);
          };
          K.passwordSignIn = function(a, b, c, d) {
            var e = new xl(function() {
              Wl(a, e);
            }, function() {
              var f = e.M();
              e.m();
              L("passwordRecovery", a, b, f);
            }, c, H(W(a)), J(W(a)), d);
            e.render(b);
            Y(a, e);
          };
          function Wm() {
            return M(this, "firebaseui-id-name");
          }
          function Xm() {
            return M(this, "firebaseui-id-name-error");
          }
          function Ym(a, b, c, d, e, f, g, h, k) {
            P.call(this, yk, { email: d, Tb: a, name: e, Ta: !!c, ia: !!h }, k, "passwordSignUp", { F: f, D: g });
            this.w = b;
            this.H = c;
            this.B = a;
          }
          m(Ym, P);
          Ym.prototype.v = function() {
            this.ea();
            this.B && this.Ja();
            this.ua();
            this.pa(this.w, this.H);
            this.B ? (uk(this, this.i(), this.u()), uk(this, this.u(), this.l())) : uk(this, this.i(), this.l());
            this.w && vk(this, this.l(), this.w);
            Wi(this.i()) ? this.B && !Wi(this.u()) ? this.u().focus() : this.l().focus() : this.i().focus();
            P.prototype.v.call(this);
          };
          Ym.prototype.o = function() {
            this.H = this.w = null;
            P.prototype.o.call(this);
          };
          u(Ym.prototype, { i: sl, U: tl, ea: ul, jb: vl, j: wl, u: Wm, Bc: Xm, Ja: function() {
            var a = Wm.call(this), b = Xm.call(this);
            Jj(this, a, function() {
              Pj(b) && (N(a, true), Nj(b));
            });
          }, M: function() {
            var a = Wm.call(this);
            var b = Xm.call(this);
            var c = Wi(a);
            c = !/^[\s\xa0]*$/.test(c == null ? "" : String(c));
            N(a, c);
            c ? (Nj(b), b = true) : (Oj(b, C("Enter your account name").toString()), b = false);
            return b ? Ua(Wi(a)) : null;
          }, l: pm, ba: sm, lb: qm, ua: tm, P: um, Nb: jl, Mb: kl, pa: ll });
          function Zm(a, b) {
            var c = Ci(W(a)), d = b.j(), e = null;
            c && (e = b.M());
            var f = b.P();
            if (d) {
              if (c)
                if (e)
                  e = cb(e);
                else {
                  b.u().focus();
                  return;
                }
              if (f) {
                var g = firebase2.auth.EmailAuthProvider.credential(d, f);
                V(a, b.I(r(a.Yb, a), [d, f], function(h) {
                  var k = { user: h.user, credential: g, operationType: h.operationType, additionalUserInfo: h.additionalUserInfo };
                  return c ? (h = h.user.updateProfile({ displayName: e }).then(function() {
                    return Ll(a, b, k);
                  }), V(a, h), h) : Ll(a, b, k);
                }, function(h) {
                  if (!h.name || h.name != "cancel") {
                    var k = Kl(h);
                    h = T(k);
                    switch (k.code) {
                      case "auth/email-already-in-use":
                        return $m(a, b, d, k);
                      case "auth/too-many-requests":
                        h = C("Too many account requests are coming from your IP address. Try again in a few minutes.").toString();
                      case "auth/operation-not-allowed":
                      case "auth/weak-password":
                        N(b.l(), false);
                        Oj(b.ba(), h);
                        break;
                      case "auth/admin-restricted-operation":
                        pi(W(a)) ? (h = Q(b), b.m(), L("handleUnauthorizedUser", a, h, d, firebase2.auth.EmailAuthProvider.PROVIDER_ID)) : b.a(h);
                        break;
                      default:
                        k = "setAccountInfo: " + ah(k), og(k, void 0), b.a(h);
                    }
                  }
                }));
              } else
                b.l().focus();
            } else
              b.i().focus();
          }
          function $m(a, b, c, d) {
            function e() {
              var g = T(d);
              N(b.i(), false);
              Oj(b.U(), g);
              b.i().focus();
            }
            var f = U(a).fetchSignInMethodsForEmail(c).then(function(g) {
              g.length ? e() : (g = Q(b), b.m(), L("passwordRecovery", a, g, c, false, Kd().toString()));
            }, function() {
              e();
            });
            V(a, f);
            return f;
          }
          K.passwordSignUp = function(a, b, c, d, e, f) {
            function g() {
              h.m();
              S(a, b);
            }
            var h = new Ym(Ci(W(a)), function() {
              Zm(a, h);
            }, e ? void 0 : g, c, d, H(W(a)), J(W(a)), f);
            h.render(b);
            Y(a, h);
          };
          function an() {
            return M(this, "firebaseui-id-phone-confirmation-code");
          }
          function bn() {
            return M(this, "firebaseui-id-phone-confirmation-code-error");
          }
          function cn() {
            return M(this, "firebaseui-id-resend-countdown");
          }
          function dn(a, b, c, d, e, f, g, h, k) {
            P.call(this, fl, { phoneNumber: e }, k, "phoneSignInFinish", { F: g, D: h });
            this.jb = f;
            this.i = new hj(1e3);
            this.B = f;
            this.P = a;
            this.l = b;
            this.H = c;
            this.M = d;
          }
          m(dn, P);
          dn.prototype.v = function() {
            var a = this;
            this.U(this.jb);
            ke(this.i, "tick", this.w, false, this);
            this.i.start();
            O(this, M(this, "firebaseui-id-change-phone-number-link"), function() {
              a.P();
            });
            O(this, this.Da(), function() {
              a.M();
            });
            this.Ja(this.l);
            this.ea(this.l, this.H);
            this.u().focus();
            P.prototype.v.call(this);
          };
          dn.prototype.o = function() {
            this.M = this.H = this.l = this.P = null;
            ij(this.i);
            se(this.i, "tick", this.w);
            this.i = null;
            P.prototype.o.call(this);
          };
          dn.prototype.w = function() {
            --this.B;
            0 < this.B ? this.U(this.B) : (ij(this.i), se(this.i, "tick", this.w), this.ua(), this.lb());
          };
          u(dn.prototype, {
            u: an,
            pa: bn,
            Ja: function(a) {
              var b = an.call(this), c = bn.call(this);
              Jj(this, b, function() {
                Pj(c) && (N(b, true), Nj(c));
              });
              a && Kj(this, b, function() {
                a();
              });
            },
            ba: function() {
              var a = Ua(Wi(an.call(this)) || "");
              return /^\d{6}$/.test(a) ? a : null;
            },
            Fb: cn,
            U: function(a) {
              $c(cn.call(this), C("Resend code in " + ((9 < a ? "0:" : "0:0") + a)).toString());
            },
            ua: function() {
              Nj(this.Fb());
            },
            Da: function() {
              return M(this, "firebaseui-id-resend-link");
            },
            lb: function() {
              Oj(this.Da());
            },
            Nb: jl,
            Mb: kl,
            ea: ll
          });
          function en(a, b, c, d) {
            function e(g) {
              b.u().focus();
              N(b.u(), false);
              Oj(b.pa(), g);
            }
            var f = b.ba();
            f ? (b.$("mdl-spinner mdl-spinner--single-color mdl-js-spinner is-active firebaseui-progress-dialog-loading-icon", C("Verifying...").toString()), V(a, b.I(r(d.confirm, d), [f], function(g) {
              b.h();
              b.$("firebaseui-icon-done", C("Verified!").toString());
              var h = setTimeout(function() {
                b.h();
                b.m();
                var k = { user: fn(a).currentUser, credential: null, operationType: g.operationType, additionalUserInfo: g.additionalUserInfo };
                Ll(a, b, k, true);
              }, 1e3);
              V(a, function() {
                b && b.h();
                clearTimeout(h);
              });
            }, function(g) {
              if (g.name && g.name == "cancel")
                b.h();
              else {
                var h = Kl(g);
                g = T(h);
                switch (h.code) {
                  case "auth/credential-already-in-use":
                    b.h();
                    break;
                  case "auth/code-expired":
                    h = Q(b);
                    b.h();
                    b.m();
                    L("phoneSignInStart", a, h, c, g);
                    break;
                  case "auth/missing-verification-code":
                  case "auth/invalid-verification-code":
                    b.h();
                    e(g);
                    break;
                  default:
                    b.h(), b.a(g);
                }
              }
            }))) : e(C("Wrong code. Try again.").toString());
          }
          K.phoneSignInFinish = function(a, b, c, d, e, f) {
            var g = new dn(function() {
              g.m();
              L("phoneSignInStart", a, b, c);
            }, function() {
              en(a, g, c, e);
            }, function() {
              g.m();
              S(a, b);
            }, function() {
              g.m();
              L("phoneSignInStart", a, b, c);
            }, Yh(c), d, H(W(a)), J(W(a)));
            g.render(b);
            Y(a, g);
            f && g.a(f);
          };
          var gn = !z && !(y("Safari") && !(Xb() || y("Coast") || y("Opera") || y("Edge") || y("Firefox") || y("FxiOS") || y("Silk") || y("Android")));
          function hn(a, b) {
            if (/-[a-z]/.test(b))
              return null;
            if (gn && a.dataset) {
              if (!(!y("Android") || Xb() || y("Firefox") || y("FxiOS") || y("Opera") || y("Silk") || b in a.dataset))
                return null;
              a = a.dataset[b];
              return a === void 0 ? null : a;
            }
            return a.getAttribute("data-" + String(b).replace(/([A-Z])/g, "-$1").toLowerCase());
          }
          function jn(a, b, c) {
            var d = this;
            a = hd(ek, { items: a }, null, this.s);
            lk.call(this, a, true, true);
            c && (c = kn(a, c)) && (c.focus(), Bj(c, a));
            O(this, a, function(e) {
              if (e = (e = ad(e.target, "firebaseui-id-list-box-dialog-button")) && hn(e, "listboxid"))
                mk.call(d), b(e);
            });
          }
          function kn(a, b) {
            a = (a || document).getElementsByTagName("BUTTON");
            for (var c = 0; c < a.length; c++)
              if (hn(a[c], "listboxid") === b)
                return a[c];
            return null;
          }
          function ln() {
            return M(this, "firebaseui-id-phone-number");
          }
          function mn() {
            return M(this, "firebaseui-id-country-selector");
          }
          function nn() {
            return M(this, "firebaseui-id-phone-number-error");
          }
          function on(a, b) {
            var c = a.a, d = pn("1-US-0", c), e = null;
            b && pn(b, c) ? e = b : d ? e = "1-US-0" : e = 0 < c.length ? c[0].c : null;
            if (!e)
              throw Error("No available default country");
            qn.call(this, e, a);
          }
          function pn(a, b) {
            a = Qh(a);
            return !(!a || !Ma(b, a));
          }
          function rn(a) {
            return a.map(function(b) {
              return { id: b.c, Ma: "firebaseui-flag " + sn(b), label: b.name + " " + ("\u200E+" + b.b) };
            });
          }
          function sn(a) {
            return "firebaseui-flag-" + a.f;
          }
          function tn(a) {
            var b = this;
            jn.call(this, rn(a.a), function(c) {
              qn.call(b, c, a, true);
              b.O().focus();
            }, this.Ba);
          }
          function qn(a, b, c) {
            var d = Qh(a);
            d && (c && (c = Ua(Wi(ln.call(this)) || ""), b = Ph(b, c), b.length && b[0].b != d.b && (c = "+" + d.b + c.substr(b[0].b.length + 1), Xi(ln.call(this), c))), b = Qh(this.Ba), this.Ba = a, a = M(this, "firebaseui-id-country-selector-flag"), b && Vi(a, sn(b)), Ui(a, sn(d)), $c(M(this, "firebaseui-id-country-selector-code"), "\u200E+" + d.b));
          }
          function un(a, b, c, d, e, f, g, h, k, p) {
            P.call(this, el, { Gb: b, Aa: k || null, Va: !!c, ia: !!f }, p, "phoneSignInStart", { F: d, D: e });
            this.H = h || null;
            this.M = b;
            this.l = a;
            this.w = c || null;
            this.pa = g || null;
          }
          m(un, P);
          un.prototype.v = function() {
            this.ea(this.pa, this.H);
            this.P(this.l, this.w || void 0);
            this.M || uk(this, this.O(), this.i());
            vk(this, this.i(), this.l);
            this.O().focus();
            Bm(this.O(), (this.O().value || "").length);
            P.prototype.v.call(this);
          };
          un.prototype.o = function() {
            this.w = this.l = null;
            P.prototype.o.call(this);
          };
          u(un.prototype, { Cb: nk, O: ln, B: nn, ea: function(a, b, c) {
            var d = this, e = ln.call(this), f = mn.call(this), g = nn.call(this), h = a || Vh, k = h.a;
            if (k.length == 0)
              throw Error("No available countries provided.");
            on.call(d, h, b);
            O(this, f, function() {
              tn.call(d, h);
            });
            Jj(this, e, function() {
              Pj(g) && (N(e, true), Nj(g));
              var p = Ua(Wi(e) || ""), t = Qh(this.Ba), I = Ph(h, p);
              p = pn("1-US-0", k);
              I.length && I[0].b != t.b && (t = I[0], qn.call(d, t.b == "1" && p ? "1-US-0" : t.c, h));
            });
            c && Kj(this, e, function() {
              c();
            });
          }, U: function(a) {
            var b = Ua(Wi(ln.call(this)) || "");
            a = a || Vh;
            var c = a.a, d = Ph(Vh, b);
            if (d.length && !Ma(c, d[0]))
              throw Xi(ln.call(this)), ln.call(this).focus(), Oj(nn.call(this), C("The country code provided is not supported.").toString()), Error("The country code provided is not supported.");
            c = Qh(this.Ba);
            d.length && d[0].b != c.b && qn.call(this, d[0].c, a);
            d.length && (b = b.substr(d[0].b.length + 1));
            return b ? new Wh(this.Ba, b) : null;
          }, Ja: mn, ba: function() {
            return M(this, "firebaseui-recaptcha-container");
          }, u: function() {
            return M(this, "firebaseui-id-recaptcha-error");
          }, i: jl, ua: kl, P: ll });
          function vn(a, b, c, d) {
            try {
              var e = b.U(Qi);
            } catch (f) {
              return;
            }
            e ? Oi ? (b.$("mdl-spinner mdl-spinner--single-color mdl-js-spinner is-active firebaseui-progress-dialog-loading-icon", C("Verifying...").toString()), V(a, b.I(r(a.cc, a), [Yh(e), c], function(f) {
              var g = Q(b);
              b.$("firebaseui-icon-done", C("Code sent!").toString());
              var h = setTimeout(function() {
                b.h();
                b.m();
                L("phoneSignInFinish", a, g, e, 15, f);
              }, 1e3);
              V(a, function() {
                b && b.h();
                clearTimeout(h);
              });
            }, function(f) {
              b.h();
              if (!f.name || f.name != "cancel") {
                grecaptcha.reset(Ri);
                Oi = null;
                var g = f && f.message || "";
                if (f.code)
                  switch (f.code) {
                    case "auth/too-many-requests":
                      g = C("This phone number has been used too many times").toString();
                      break;
                    case "auth/invalid-phone-number":
                    case "auth/missing-phone-number":
                      b.O().focus();
                      Oj(b.B(), Hd().toString());
                      return;
                    case "auth/admin-restricted-operation":
                      if (pi(W(a))) {
                        f = Q(b);
                        b.m();
                        L("handleUnauthorizedUser", a, f, Yh(e), firebase2.auth.PhoneAuthProvider.PROVIDER_ID);
                        return;
                      }
                      g = T(f);
                      break;
                    default:
                      g = T(f);
                  }
                b.a(g);
              }
            }))) : Pi ? Oj(b.u(), C("Solve the reCAPTCHA").toString()) : !Pi && d && b.i().click() : (b.O().focus(), Oj(b.B(), Hd().toString()));
          }
          K.phoneSignInStart = function(a, b, c, d) {
            var e = qi(W(a)) || {};
            Oi = null;
            Pi = !(e && e.size === "invisible");
            var f = Yl(a), g = zi(W(a)), h = f ? yi(W(a)) : null;
            g = c && c.a || g && g.c || null;
            c = c && c.Aa || h;
            (h = Ai(W(a))) && Uh(h);
            Qi = h ? new Oh(Ai(W(a))) : Vh;
            var k = new un(function(t) {
              vn(a, k, p, !(!t || !t.keyCode));
            }, Pi, f ? null : function() {
              p.clear();
              k.m();
              S(a, b);
            }, H(W(a)), J(W(a)), f, Qi, g, c);
            k.render(b);
            Y(a, k);
            d && k.a(d);
            e.callback = function(t) {
              k.u() && Nj(k.u());
              Oi = t;
              Pi || vn(a, k, p);
            };
            e["expired-callback"] = function() {
              Oi = null;
            };
            var p = new firebase2.auth.RecaptchaVerifier(Pi ? k.ba() : k.i(), e, fn(a).app);
            V(a, k.I(r(p.render, p), [], function(t) {
              Ri = t;
            }, function(t) {
              t.name && t.name == "cancel" || (t = T(t), k.m(), S(a, b, void 0, t));
            }));
          };
          K.prefilledEmailSignIn = function(a, b, c) {
            var d = new Em();
            d.render(b);
            Y(a, d);
            V(a, d.I(r(U(a).fetchSignInMethodsForEmail, U(a)), [c], function(e) {
              d.m();
              var f = !(!Xl(a) || !wn(a));
              am(a, b, e, c, void 0, f);
            }, function(e) {
              e = T(e);
              d.m();
              L("signIn", a, b, c, e);
            }));
          };
          function xn(a, b, c, d, e) {
            P.call(this, dl, { Sb: b }, e, "providerSignIn", { F: c, D: d });
            this.i = a;
          }
          m(xn, P);
          xn.prototype.v = function() {
            this.l(this.i);
            P.prototype.v.call(this);
          };
          xn.prototype.o = function() {
            this.i = null;
            P.prototype.o.call(this);
          };
          u(xn.prototype, { l: function(a) {
            function b(g) {
              a(g);
            }
            for (var c = this.g ? Tc("firebaseui-id-idp-button", this.g || this.s.a) : [], d = 0; d < c.length; d++) {
              var e = c[d], f = hn(e, "providerId");
              O(this, e, za(b, f));
            }
          } });
          K.providerSignIn = function(a, b, c, d) {
            var e = new xn(function(f) {
              f == firebase2.auth.EmailAuthProvider.PROVIDER_ID ? (e.m(), Zl(a, b, d)) : f == firebase2.auth.PhoneAuthProvider.PROVIDER_ID ? (e.m(), L("phoneSignInStart", a, b)) : f == "anonymous" ? Ul(a, e) : Rl(a, e, f, d);
              Z(a);
              a.l.cancel();
            }, ji(W(a)), H(W(a)), J(W(a)));
            e.render(b);
            Y(a, e);
            c && e.a(c);
            yn(a);
          };
          K.sendEmailLinkForSignIn = function(a, b, c, d) {
            var e = new fm();
            e.render(b);
            Y(a, e);
            bm(a, e, c, d, function(f) {
              e.m();
              f && f.code == "auth/admin-restricted-operation" && pi(W(a)) ? L("handleUnauthorizedUser", a, b, c, firebase2.auth.EmailAuthProvider.PROVIDER_ID) : (f = T(f), L("signIn", a, b, c, f));
            });
          };
          function zn(a, b, c, d, e, f, g) {
            P.call(this, wk, { email: c, Va: !!b, ia: !!f }, g, "signIn", { F: d, D: e });
            this.i = a;
            this.u = b;
          }
          m(zn, P);
          zn.prototype.v = function() {
            this.w(this.i);
            this.B(this.i, this.u || void 0);
            this.l().focus();
            Bm(this.l(), (this.l().value || "").length);
            P.prototype.v.call(this);
          };
          zn.prototype.o = function() {
            this.u = this.i = null;
            P.prototype.o.call(this);
          };
          u(zn.prototype, { l: sl, M: tl, w: ul, H: vl, j: wl, U: jl, P: kl, B: ll });
          K.signIn = function(a, b, c, d) {
            var e = Xl(a), f = new zn(function() {
              var g = f, h = g.j() || "";
              h && $l(a, g, h);
            }, e ? null : function() {
              f.m();
              S(a, b, c);
            }, c, H(W(a)), J(W(a)), e);
            f.render(b);
            Y(a, f);
            d && f.a(d);
          };
          function An(a, b, c, d, e, f, g) {
            P.call(this, Nk, { kc: a, yb: c, Eb: !!d }, g, "unauthorizedUser", { F: e, D: f });
            this.l = b;
            this.i = d;
          }
          m(An, P);
          An.prototype.v = function() {
            var a = this, b = M(this, "firebaseui-id-unauthorized-user-help-link");
            this.i && b && O(this, b, function() {
              a.i();
            });
            O(this, this.u(), function() {
              a.l();
            });
            this.u().focus();
            P.prototype.v.call(this);
          };
          An.prototype.o = function() {
            this.i = this.l = null;
            P.prototype.o.call(this);
          };
          u(An.prototype, { u: kl });
          K.handleUnauthorizedUser = function(a, b, c, d) {
            function e() {
              S(a, b);
            }
            d === firebase2.auth.EmailAuthProvider.PROVIDER_ID ? e = function() {
              Zl(a, b);
            } : d === firebase2.auth.PhoneAuthProvider.PROVIDER_ID && (e = function() {
              L("phoneSignInStart", a, b);
            });
            var f = null, g = null;
            d === firebase2.auth.EmailAuthProvider.PROVIDER_ID && oi(W(a)) ? (f = ui2(W(a)), g = vi(W(a))) : pi(W(a)) && (f = si(W(a)), g = ti(W(a)));
            var h = new An(c, function() {
              h.m();
              e();
            }, f, g, H(W(a)), J(W(a)));
            h.render(b);
            Y(a, h);
          };
          function Bn(a, b, c, d, e, f) {
            P.call(this, Ok, { email: a }, f, "unsupportedProvider", { F: d, D: e });
            this.l = b;
            this.i = c;
          }
          m(Bn, P);
          Bn.prototype.v = function() {
            this.w(this.l, this.i);
            this.u().focus();
            P.prototype.v.call(this);
          };
          Bn.prototype.o = function() {
            this.i = this.l = null;
            P.prototype.o.call(this);
          };
          u(Bn.prototype, { u: jl, B: kl, w: ll });
          K.unsupportedProvider = function(a, b, c) {
            var d = new Bn(c, function() {
              d.m();
              L("passwordRecovery", a, b, c);
            }, function() {
              d.m();
              S(a, b, c);
            }, H(W(a)), J(W(a)));
            d.render(b);
            Y(a, d);
          };
          function Cn(a, b) {
            this.$ = false;
            var c = Dn(b);
            if (En[c])
              throw Error('An AuthUI instance already exists for the key "' + c + '"');
            En[c] = this;
            this.a = a;
            this.u = null;
            this.Y = false;
            Fn(this.a);
            this.h = firebase2.initializeApp({ apiKey: a.app.options.apiKey, authDomain: a.app.options.authDomain }, a.app.name + "-firebaseui-temp").auth();
            if (a = a.emulatorConfig)
              c = a.port, this.h.useEmulator(a.protocol + "://" + a.host + (c === null ? "" : ":" + c), a.options);
            Fn(this.h);
            this.h.setPersistence && this.h.setPersistence(firebase2.auth.Auth.Persistence.SESSION);
            this.oa = b;
            this.ca = new bi();
            this.g = this.T = this.i = this.J = this.O = null;
            this.s = [];
            this.Z = false;
            this.l = Pf.Xa();
            this.j = this.C = null;
            this.da = this.A = false;
          }
          function Fn(a) {
            a && a.INTERNAL && a.INTERNAL.logFramework && a.INTERNAL.logFramework("FirebaseUI-web");
          }
          var En = {};
          function Dn(a) {
            return a || "[DEFAULT]";
          }
          function Sl(a) {
            Z(a);
            a.i || (a.i = Gn(a, function(b) {
              return b && !zh(X(a)) ? F(fn(a).getRedirectResult().then(function(c) {
                return c;
              }, function(c) {
                if (c && c.code == "auth/email-already-in-use" && c.email && c.credential)
                  throw c;
                return Hn(a, c);
              })) : F(U(a).getRedirectResult().then(function(c) {
                return di(W(a)) && !c.user && a.j && !a.j.isAnonymous ? fn(a).getRedirectResult() : c;
              }));
            }));
            return a.i;
          }
          function Y(a, b) {
            Z(a);
            a.g = b;
          }
          var In = null;
          function U(a) {
            Z(a);
            return a.h;
          }
          function fn(a) {
            Z(a);
            return a.a;
          }
          function X(a) {
            Z(a);
            return a.oa;
          }
          function wn(a) {
            Z(a);
            return a.O ? a.O.emailHint : void 0;
          }
          l = Cn.prototype;
          l.nb = function() {
            Z(this);
            return !!Ch(X(this)) || Jn(tf());
          };
          function Jn(a) {
            a = new Pb(a);
            return (a.a.a.get(x.ub) || null) === "signIn" && !!a.a.a.get(x.$a);
          }
          l.start = function(a, b) {
            Kn(this, a, b);
          };
          function Kn(a, b, c, d) {
            Z(a);
            typeof a.a.languageCode !== "undefined" && (a.u = a.a.languageCode);
            var e = "en".replace(/_/g, "-");
            a.a.languageCode = e;
            a.h.languageCode = e;
            a.Y = true;
            typeof a.a.tenantId !== "undefined" && (a.h.tenantId = a.a.tenantId);
            a.ib(c);
            a.O = d || null;
            var f = n.document;
            a.C ? a.C.then(function() {
              f.readyState == "complete" ? Ln(a, b) : le(window, "load", function() {
                Ln(a, b);
              });
            }) : f.readyState == "complete" ? Ln(a, b) : le(window, "load", function() {
              Ln(a, b);
            });
          }
          function Ln(a, b) {
            var c = sf(b, "Could not find the FirebaseUI widget element on the page.");
            c.setAttribute("lang", "en".replace(/_/g, "-"));
            if (In) {
              var d = In;
              Z(d);
              zh(X(d)) && tg("UI Widget is already rendered on the page and is pending some user interaction. Only one widget instance can be rendered per page. The previous instance has been automatically reset.");
              In.reset();
            }
            In = a;
            a.T = c;
            Mn(a, c);
            if (jh(new kh()) && jh(new lh())) {
              b = sf(b, "Could not find the FirebaseUI widget element on the page.");
              c = tf();
              d = Jh(W(a).a, "queryParameterForSignInSuccessUrl");
              c = (c = tb(c, d)) ? zc(Bc(c)).toString() : null;
              a: {
                d = tf();
                var e = Bi(W(a));
                d = tb(d, e) || "";
                for (f in Ni)
                  if (Ni[f].toLowerCase() == d.toLowerCase()) {
                    var f = Ni[f];
                    break a;
                  }
                f = "callback";
              }
              switch (f) {
                case "callback":
                  c && (f = X(a), xh(sh, c, f));
                  a.nb() ? L("callback", a, b) : S(a, b, wn(a));
                  break;
                case "resetPassword":
                  L("passwordReset", a, b, cm(), dm());
                  break;
                case "recoverEmail":
                  L("emailChangeRevocation", a, b, cm());
                  break;
                case "revertSecondFactorAddition":
                  L("revertSecondFactorAddition", a, b, cm());
                  break;
                case "verifyEmail":
                  L("emailVerification", a, b, cm(), dm());
                  break;
                case "verifyAndChangeEmail":
                  L("verifyAndChangeEmail", a, b, cm(), dm());
                  break;
                case "signIn":
                  L("emailLinkSignInCallback", a, b, tf());
                  Nn();
                  break;
                case "select":
                  c && (f = X(a), xh(sh, c, f));
                  S(a, b);
                  break;
                default:
                  throw Error("Unhandled widget operation.");
              }
              b = W(a);
              (b = Li(b).uiShown || null) && b();
            } else
              b = sf(b, "Could not find the FirebaseUI widget element on the page."), f = new Jl(C("The browser you are using does not support Web Storage. Please try again in a different browser.").toString()), f.render(b), Y(a, f);
            b = a.g && a.g.Ga == "blank" && Gi(W(a));
            Ch(X(a)) && !b && (b = Ch(X(a)), Gm(a, b.a), wh(rh, X(a)));
          }
          function Gn(a, b) {
            if (a.A)
              return b(On(a));
            V(a, function() {
              a.A = false;
            });
            if (di(W(a))) {
              var c = new Ve(function(d) {
                V(a, a.a.onAuthStateChanged(function(e) {
                  a.j = e;
                  a.A || (a.A = true, d(b(On(a))));
                }));
              });
              V(a, c);
              return c;
            }
            a.A = true;
            return b(null);
          }
          function On(a) {
            Z(a);
            return di(W(a)) && a.j && a.j.isAnonymous ? a.j : null;
          }
          function V(a, b) {
            Z(a);
            if (b) {
              a.s.push(b);
              var c = function() {
                Qa(a.s, function(d) {
                  return d == b;
                });
              };
              typeof b != "function" && b.then(c, c);
            }
          }
          l.Db = function() {
            Z(this);
            this.Z = true;
          };
          function Pn(a) {
            Z(a);
            var b;
            (b = a.Z) || (a = W(a), a = xi(a, firebase2.auth.GoogleAuthProvider.PROVIDER_ID), b = !(!a || a.prompt !== "select_account"));
            return b;
          }
          function Ml(a) {
            typeof a.a.languageCode !== "undefined" && a.Y && (a.Y = false, a.a.languageCode = a.u);
          }
          function Gm(a, b) {
            a.a.tenantId = b;
            a.h.tenantId = b;
          }
          l.reset = function() {
            Z(this);
            var a = this;
            this.T && this.T.removeAttribute("lang");
            this.J && De(this.J);
            Ml(this);
            this.O = null;
            Nn();
            wh(rh, X(this));
            Z(this);
            this.l.cancel();
            this.i = F({ user: null, credential: null });
            In == this && (In = null);
            this.T = null;
            for (var b = 0; b < this.s.length; b++)
              if (typeof this.s[b] == "function")
                this.s[b]();
              else
                this.s[b].cancel && this.s[b].cancel();
            this.s = [];
            Ah(X(this));
            this.g && (this.g.m(), this.g = null);
            this.L = null;
            this.h && (this.C = mm(this).then(function() {
              a.C = null;
            }, function() {
              a.C = null;
            }));
          };
          function Mn(a, b) {
            a.L = null;
            a.J = new Ee(b);
            a.J.register();
            ke(a.J, "pageEnter", function(c) {
              c = c && c.pageId;
              if (a.L != c) {
                var d = W(a);
                (d = Li(d).uiChanged || null) && d(a.L, c);
                a.L = c;
              }
            });
          }
          l.ib = function(a) {
            Z(this);
            var b = this.ca, c;
            for (c in a)
              try {
                Ih(b.a, c, a[c]);
              } catch (d) {
                og('Invalid config: "' + c + '"', void 0);
              }
            fc && Ih(b.a, "popupMode", false);
            Ai(b);
            !this.da && Ki(W(this)) && (tg("signInSuccess callback is deprecated. Please use signInSuccessWithAuthResult callback instead."), this.da = true);
          };
          function W(a) {
            Z(a);
            return a.ca;
          }
          l.Wb = function() {
            Z(this);
            var a = W(this), b = Jh(a.a, "widgetUrl");
            a = Bi(a);
            var c = b.search(sb);
            for (var d = 0, e, f = []; 0 <= (e = rb(b, d, a, c)); )
              f.push(b.substring(d, e)), d = Math.min(b.indexOf("&", e) + 1 || c, c);
            f.push(b.substr(d));
            b = f.join("").replace(ub, "$1");
            c = "=" + encodeURIComponent("select");
            (a += c) ? (c = b.indexOf("#"), 0 > c && (c = b.length), d = b.indexOf("?"), 0 > d || d > c ? (d = c, e = "") : e = b.substring(d + 1, c), b = [b.substr(0, d), e, b.substr(c)], c = b[1], b[1] = a ? c ? c + "&" + a : a : c, c = b[0] + (b[1] ? "?" + b[1] : "") + b[2]) : c = b;
            W(this).a.get("popupMode") ? (a = (window.screen.availHeight - 600) / 2, b = (window.screen.availWidth - 500) / 2, c = c || "about:blank", a = { width: 500, height: 600, top: 0 < a ? a : 0, left: 0 < b ? b : 0, location: true, resizable: true, statusbar: true, toolbar: false }, a.target = a.target || c.target || "google_popup", a.width = a.width || 690, a.height = a.height || 500, (a = pf(c, a)) && a.focus()) : Nc(window.location, c);
          };
          function Z(a) {
            if (a.$)
              throw Error("AuthUI instance is deleted!");
          }
          l.Wa = function() {
            var a = this;
            Z(this);
            return this.h.app.delete().then(function() {
              var b = Dn(X(a));
              delete En[b];
              a.reset();
              a.$ = true;
            });
          };
          function yn(a) {
            Z(a);
            try {
              Qf(a.l, li(W(a)), Pn(a)).then(function(b) {
                return a.g ? Vl(a, a.g, b) : false;
              });
            } catch (b) {
            }
          }
          l.Ib = function(a, b) {
            Z(this);
            var c = this, d = vf();
            if (!Di(W(this)))
              return df(Error("Email link sign-in should be enabled to trigger email sending."));
            var e = Fi(W(this)), f = new Pb(e.url);
            Qb(f, d);
            b && b.a && (Gh(d, b, X(this)), Tb(f, b.a.providerId));
            Rb(f, Ei(W(this)));
            return Gn(this, function(g) {
              g && ((g = g.uid) ? f.a.a.set(x.Pa, g) : Nb(f.a.a, x.Pa));
              e.url = f.toString();
              return U(c).sendSignInLinkToEmail(a, e);
            }).then(function() {
              var g = X(c), h = {};
              h.email = a;
              xh(th, Yg(d, JSON.stringify(h)), g);
            }, function(g) {
              wh(uh, X(c));
              wh(th, X(c));
              throw g;
            });
          };
          function Hm(a, b) {
            var c = Sb(new Pb(b));
            if (!c)
              return F(null);
            b = new Ve(function(d, e) {
              var f = fn(a).onAuthStateChanged(function(g) {
                f();
                g && g.isAnonymous && g.uid === c ? d(g) : g && g.isAnonymous && g.uid !== c ? e(Error("anonymous-user-mismatch")) : e(Error("anonymous-user-not-found"));
              });
              V(a, f);
            });
            V(a, b);
            return b;
          }
          function Lm(a, b, c, d, e) {
            Z(a);
            var f = e || null, g = firebase2.auth.EmailAuthProvider.credentialWithLink(c, d);
            c = f ? U(a).signInWithEmailLink(c, d).then(function(h) {
              return h.user.linkWithCredential(f);
            }).then(function() {
              return mm(a);
            }).then(function() {
              return Hn(a, { code: "auth/email-already-in-use" }, f);
            }) : U(a).fetchSignInMethodsForEmail(c).then(function(h) {
              return h.length ? Hn(a, { code: "auth/email-already-in-use" }, g) : b.linkWithCredential(g);
            });
            V(a, c);
            return c;
          }
          function Mm(a, b, c, d) {
            Z(a);
            var e = d || null, f;
            b = U(a).signInWithEmailLink(b, c).then(function(g) {
              f = { user: g.user, credential: null, operationType: g.operationType, additionalUserInfo: g.additionalUserInfo };
              if (e)
                return g.user.linkWithCredential(e).then(function(h) {
                  f = { user: h.user, credential: e, operationType: f.operationType, additionalUserInfo: h.additionalUserInfo };
                });
            }).then(function() {
              mm(a);
            }).then(function() {
              return fn(a).updateCurrentUser(f.user);
            }).then(function() {
              f.user = fn(a).currentUser;
              return f;
            });
            V(a, b);
            return b;
          }
          function Nn() {
            var a = tf();
            if (Jn(a)) {
              a = new Pb(a);
              for (var b in x)
                x.hasOwnProperty(b) && Nb(a.a.a, x[b]);
              b = { state: "signIn", mode: "emailLink", operation: "clear" };
              var c = n.document.title;
              n.history && n.history.replaceState && n.history.replaceState(b, c, a.toString());
            }
          }
          l.bc = function(a, b) {
            Z(this);
            var c = this;
            return U(this).signInWithEmailAndPassword(a, b).then(function(d) {
              return Gn(c, function(e) {
                return e ? mm(c).then(function() {
                  return Hn(c, { code: "auth/email-already-in-use" }, firebase2.auth.EmailAuthProvider.credential(a, b));
                }) : d;
              });
            });
          };
          l.Yb = function(a, b) {
            Z(this);
            var c = this;
            return Gn(this, function(d) {
              if (d) {
                var e = firebase2.auth.EmailAuthProvider.credential(a, b);
                return d.linkWithCredential(e);
              }
              return U(c).createUserWithEmailAndPassword(a, b);
            });
          };
          l.ac = function(a) {
            Z(this);
            var b = this;
            return Gn(this, function(c) {
              return c ? c.linkWithCredential(a).then(function(d) {
                return d;
              }, function(d) {
                if (d && d.code == "auth/email-already-in-use" && d.email && d.credential)
                  throw d;
                return Hn(b, d, a);
              }) : U(b).signInWithCredential(a);
            });
          };
          function Tl(a, b) {
            Z(a);
            return Gn(a, function(c) {
              return c && !zh(X(a)) ? c.linkWithPopup(b).then(function(d) {
                return d;
              }, function(d) {
                if (d && d.code == "auth/email-already-in-use" && d.email && d.credential)
                  throw d;
                return Hn(a, d);
              }) : U(a).signInWithPopup(b);
            });
          }
          l.dc = function(a) {
            Z(this);
            var b = this, c = this.i;
            this.i = null;
            return Gn(this, function(d) {
              return d && !zh(X(b)) ? d.linkWithRedirect(a) : U(b).signInWithRedirect(a);
            }).then(function() {
            }, function(d) {
              b.i = c;
              throw d;
            });
          };
          l.cc = function(a, b) {
            Z(this);
            var c = this;
            return Gn(this, function(d) {
              return d ? d.linkWithPhoneNumber(a, b).then(function(e) {
                return new Sf(e, function(f) {
                  if (f.code == "auth/credential-already-in-use")
                    return Hn(c, f);
                  throw f;
                });
              }) : fn(c).signInWithPhoneNumber(a, b).then(function(e) {
                return new Sf(e);
              });
            });
          };
          l.$b = function() {
            Z(this);
            return fn(this).signInAnonymously();
          };
          function Ol(a, b) {
            Z(a);
            return Gn(a, function(c) {
              if (a.j && !a.j.isAnonymous && di(W(a)) && !U(a).currentUser)
                return mm(a).then(function() {
                  b.credential.providerId == "password" && (b.credential = null);
                  return b;
                });
              if (c)
                return mm(a).then(function() {
                  return c.linkWithCredential(b.credential);
                }).then(function(d) {
                  b.user = d.user;
                  b.credential = d.credential;
                  b.operationType = d.operationType;
                  b.additionalUserInfo = d.additionalUserInfo;
                  return b;
                }, function(d) {
                  if (d && d.code == "auth/email-already-in-use" && d.email && d.credential)
                    throw d;
                  return Hn(a, d, b.credential);
                });
              if (!b.user)
                throw Error('Internal error: An incompatible or outdated version of "firebase.js" may be used.');
              return mm(a).then(function() {
                return fn(a).updateCurrentUser(b.user);
              }).then(function() {
                b.user = fn(a).currentUser;
                b.operationType = "signIn";
                b.credential && b.credential.providerId && b.credential.providerId == "password" && (b.credential = null);
                return b;
              });
            });
          }
          l.Xb = function(a, b) {
            Z(this);
            return U(this).signInWithEmailAndPassword(a, b);
          };
          function mm(a) {
            Z(a);
            return U(a).signOut();
          }
          function Hn(a, b, c) {
            Z(a);
            if (b && b.code && (b.code == "auth/email-already-in-use" || b.code == "auth/credential-already-in-use")) {
              var d = ei(W(a));
              return F().then(function() {
                return d(new Nd("anonymous-upgrade-merge-conflict", null, c || b.credential));
              }).then(function() {
                a.g && (a.g.m(), a.g = null);
                throw b;
              });
            }
            return df(b);
          }
          function Qn(a, b, c, d) {
            P.call(this, il, void 0, d, "providerMatchByEmail", { F: b, D: c });
            this.i = a;
          }
          m(Qn, P);
          Qn.prototype.v = function() {
            this.u(this.i);
            this.w(this.i);
            this.l().focus();
            Bm(this.l(), (this.l().value || "").length);
            P.prototype.v.call(this);
          };
          Qn.prototype.o = function() {
            this.i = null;
            P.prototype.o.call(this);
          };
          u(Qn.prototype, { l: sl, H: tl, u: ul, B: vl, j: wl, M: jl, w: ll });
          function Rn(a, b, c, d, e) {
            P.call(this, hl, { ec: b }, e, "selectTenant", { F: c, D: d });
            this.i = a;
          }
          m(Rn, P);
          Rn.prototype.v = function() {
            Sn(this, this.i);
            P.prototype.v.call(this);
          };
          Rn.prototype.o = function() {
            this.i = null;
            P.prototype.o.call(this);
          };
          function Sn(a, b) {
            function c(h) {
              b(h);
            }
            for (var d = a.g ? Tc("firebaseui-id-tenant-selection-button", a.g || a.s.a) : [], e = 0; e < d.length; e++) {
              var f = d[e], g = hn(f, "tenantId");
              O(a, f, za(c, g));
            }
          }
          function Tn(a) {
            P.call(this, Ck, void 0, a, "spinner");
          }
          m(Tn, P);
          function Un(a) {
            this.a = new Hh();
            G(this.a, "authDomain");
            G(this.a, "displayMode", Vn);
            G(this.a, "tenants");
            G(this.a, "callbacks");
            G(this.a, "tosUrl");
            G(this.a, "privacyPolicyUrl");
            for (var b in a)
              if (a.hasOwnProperty(b))
                try {
                  Ih(this.a, b, a[b]);
                } catch (c) {
                  og('Invalid config: "' + b + '"', void 0);
                }
          }
          function Wn(a) {
            a = a.a.get("displayMode");
            for (var b in Xn)
              if (Xn[b] === a)
                return Xn[b];
            return Vn;
          }
          function Yn(a) {
            return a.a.get("callbacks") || {};
          }
          function Zn(a) {
            var b = a.a.get("tosUrl") || null;
            a = a.a.get("privacyPolicyUrl") || null;
            b && !a && tg("Privacy Policy URL is missing, the link will not be displayed.");
            if (b && a) {
              if (typeof b === "function")
                return b;
              if (typeof b === "string")
                return function() {
                  rf(b);
                };
            }
            return null;
          }
          function $n(a) {
            var b = a.a.get("tosUrl") || null, c = a.a.get("privacyPolicyUrl") || null;
            c && !b && tg("Terms of Service URL is missing, the link will not be displayed.");
            if (b && c) {
              if (typeof c === "function")
                return c;
              if (typeof c === "string")
                return function() {
                  rf(c);
                };
            }
            return null;
          }
          function ao(a, b) {
            a = a.a.get("tenants");
            if (!a || !a.hasOwnProperty(b) && !a.hasOwnProperty(bo))
              throw Error("Invalid tenant configuration!");
          }
          function co(a, b, c) {
            a = a.a.get("tenants");
            if (!a)
              throw Error("Invalid tenant configuration!");
            var d = [];
            a = a[b] || a[bo];
            if (!a)
              return og("Invalid tenant configuration: " + (b + " is not configured!"), void 0), d;
            b = a.signInOptions;
            if (!b)
              throw Error("Invalid tenant configuration: signInOptions are invalid!");
            b.forEach(function(e) {
              if (typeof e === "string")
                d.push(e);
              else if (typeof e.provider === "string") {
                var f = e.hd;
                f && c ? (f instanceof RegExp ? f : new RegExp("@" + f.replace(".", "\\.") + "$")).test(c) && d.push(e.provider) : d.push(e.provider);
              } else
                e = "Invalid tenant configuration: signInOption " + (JSON.stringify(e) + " is invalid!"), og(e, void 0);
            });
            return d;
          }
          function eo(a, b, c) {
            a = fo(a, b);
            (b = a.signInOptions) && c && (b = b.filter(function(d) {
              return typeof d === "string" ? c.includes(d) : c.includes(d.provider);
            }), a.signInOptions = b);
            return a;
          }
          function fo(a, b) {
            var c = go;
            var d = d === void 0 ? {} : d;
            ao(a, b);
            a = a.a.get("tenants");
            return wf(a[b] || a[bo], c, d);
          }
          var go = ["immediateFederatedRedirect", "privacyPolicyUrl", "signInFlow", "signInOptions", "tosUrl"], Vn = "optionFirst", Xn = { pc: Vn, oc: "identifierFirst" }, bo = "*";
          function ho(a, b) {
            var c = this;
            this.s = sf(a);
            this.a = {};
            Object.keys(b).forEach(function(d) {
              c.a[d] = new Un(b[d]);
            });
            this.ob = this.g = this.A = this.h = this.i = this.j = null;
            Object.defineProperty(this, "languageCode", { get: function() {
              return this.ob;
            }, set: function(d) {
              this.ob = d || null;
            }, enumerable: false });
          }
          l = ho.prototype;
          l.Ub = function(a, b) {
            var c = this;
            io(this);
            var d = a.apiKey;
            return new Ve(function(e, f) {
              if (c.a.hasOwnProperty(d)) {
                var g = Yn(c.a[d]).selectTenantUiHidden || null;
                if (Wn(c.a[d]) === Vn) {
                  var h = [];
                  b.forEach(function(t) {
                    t = t || "_";
                    var I = c.a[d].a.get("tenants");
                    if (!I)
                      throw Error("Invalid tenant configuration!");
                    (I = I[t] || I[bo]) ? t = { tenantId: t !== "_" ? t : null, V: I.fullLabel || null, displayName: I.displayName, za: I.iconUrl, ta: I.buttonColor } : (og("Invalid tenant configuration: " + (t + " is not configured!"), void 0), t = null);
                    t && h.push(t);
                  });
                  var k = function(t) {
                    t = { tenantId: t, providerIds: co(c.a[d], t || "_") };
                    e(t);
                  };
                  if (h.length === 1) {
                    k(h[0].tenantId);
                    return;
                  }
                  c.g = new Rn(function(t) {
                    io(c);
                    g && g();
                    k(t);
                  }, h, Zn(c.a[d]), $n(c.a[d]));
                } else
                  c.g = new Qn(function() {
                    var t = c.g.j();
                    if (t) {
                      for (var I = 0; I < b.length; I++) {
                        var Ca = co(c.a[d], b[I] || "_", t);
                        if (Ca.length !== 0) {
                          t = { tenantId: b[I], providerIds: Ca, email: t };
                          io(c);
                          g && g();
                          e(t);
                          return;
                        }
                      }
                      c.g.a(Ld({ code: "no-matching-tenant-for-email" }).toString());
                    }
                  }, Zn(c.a[d]), $n(c.a[d]));
                c.g.render(c.s);
                (f = Yn(c.a[d]).selectTenantUiShown || null) && f();
              } else {
                var p = Error("Invalid project configuration: API key is invalid!");
                p.code = "invalid-configuration";
                c.pb(p);
                f(p);
              }
            });
          };
          l.Pb = function(a, b) {
            if (!this.a.hasOwnProperty(a))
              throw Error("Invalid project configuration: API key is invalid!");
            var c = b || void 0;
            ao(this.a[a], b || "_");
            try {
              this.i = firebase2.app(c).auth();
            } catch (e) {
              var d = this.a[a].a.get("authDomain");
              if (!d)
                throw Error("Invalid project configuration: authDomain is required!");
              a = firebase2.initializeApp({ apiKey: a, authDomain: d }, c);
              a.auth().tenantId = b;
              this.i = a.auth();
            }
            return this.i;
          };
          l.Zb = function(a, b) {
            var c = this;
            return new Ve(function(d, e) {
              function f(I, Ca) {
                c.j = new Cn(a);
                Kn(c.j, c.s, I, Ca);
              }
              var g = a.app.options.apiKey;
              c.a.hasOwnProperty(g) || e(Error("Invalid project configuration: API key is invalid!"));
              var h = eo(c.a[g], a.tenantId || "_", b && b.providerIds);
              io(c);
              e = { signInSuccessWithAuthResult: function(I) {
                d(I);
                return false;
              } };
              var k = Yn(c.a[g]).signInUiShown || null, p = false;
              e.uiChanged = function(I, Ca) {
                I === null && Ca === "callback" ? ((I = Vc("firebaseui-id-page-callback", c.s)) && Nj(I), c.h = new Tn(), c.h.render(c.s)) : p || I === null && Ca === "spinner" || Ca === "blank" || (c.h && (c.h.m(), c.h = null), p = true, k && k(a.tenantId));
              };
              h.callbacks = e;
              h.credentialHelper = "none";
              var t;
              b && b.email && (t = { emailHint: b.email });
              c.j ? c.j.Wa().then(function() {
                f(h, t);
              }) : f(h, t);
            });
          };
          l.reset = function() {
            var a = this;
            return F().then(function() {
              a.j && a.j.Wa();
            }).then(function() {
              a.j = null;
              io(a);
            });
          };
          l.Vb = function() {
            var a = this;
            this.h || this.A || (this.A = window.setTimeout(function() {
              io(a);
              a.h = new Tn();
              a.g = a.h;
              a.h.render(a.s);
              a.A = null;
            }, 500));
          };
          l.mb = function() {
            window.clearTimeout(this.A);
            this.A = null;
            this.h && (this.h.m(), this.h = null);
          };
          l.Bb = function() {
            io(this);
            this.g = new El();
            this.g.render(this.s);
            return F();
          };
          function io(a) {
            a.j && a.j.reset();
            a.mb();
            a.g && a.g.m();
          }
          l.pb = function(a) {
            var b = this, c = Ld({ code: a.code }).toString() || a.message;
            io(this);
            var d;
            a.retry && typeof a.retry === "function" && (d = function() {
              b.reset();
              a.retry();
            });
            this.g = new Il(c, d);
            this.g.render(this.s);
          };
          l.Rb = function(a) {
            var b = this;
            return F().then(function() {
              var c = b.i && b.i.app.options.apiKey;
              if (!b.a.hasOwnProperty(c))
                throw Error("Invalid project configuration: API key is invalid!");
              ao(b.a[c], a.tenantId || "_");
              if (!b.i.currentUser || b.i.currentUser.uid !== a.uid)
                throw Error("The user being processed does not match the signed in user!");
              return (c = Yn(b.a[c]).beforeSignInSuccess || null) ? c(a) : a;
            }).then(function(c) {
              if (c.uid !== a.uid)
                throw Error("User with mismatching UID returned.");
              return c;
            });
          };
          v("firebaseui.auth.FirebaseUiHandler", ho);
          v("firebaseui.auth.FirebaseUiHandler.prototype.selectTenant", ho.prototype.Ub);
          v("firebaseui.auth.FirebaseUiHandler.prototype.getAuth", ho.prototype.Pb);
          v("firebaseui.auth.FirebaseUiHandler.prototype.startSignIn", ho.prototype.Zb);
          v("firebaseui.auth.FirebaseUiHandler.prototype.reset", ho.prototype.reset);
          v("firebaseui.auth.FirebaseUiHandler.prototype.showProgressBar", ho.prototype.Vb);
          v("firebaseui.auth.FirebaseUiHandler.prototype.hideProgressBar", ho.prototype.mb);
          v("firebaseui.auth.FirebaseUiHandler.prototype.completeSignOut", ho.prototype.Bb);
          v("firebaseui.auth.FirebaseUiHandler.prototype.handleError", ho.prototype.pb);
          v("firebaseui.auth.FirebaseUiHandler.prototype.processUser", ho.prototype.Rb);
          v("firebaseui.auth.AuthUI", Cn);
          v("firebaseui.auth.AuthUI.getInstance", function(a) {
            a = Dn(a);
            return En[a] ? En[a] : null;
          });
          v("firebaseui.auth.AuthUI.prototype.disableAutoSignIn", Cn.prototype.Db);
          v("firebaseui.auth.AuthUI.prototype.start", Cn.prototype.start);
          v("firebaseui.auth.AuthUI.prototype.setConfig", Cn.prototype.ib);
          v("firebaseui.auth.AuthUI.prototype.signIn", Cn.prototype.Wb);
          v("firebaseui.auth.AuthUI.prototype.reset", Cn.prototype.reset);
          v("firebaseui.auth.AuthUI.prototype.delete", Cn.prototype.Wa);
          v("firebaseui.auth.AuthUI.prototype.isPendingRedirect", Cn.prototype.nb);
          v("firebaseui.auth.AuthUIError", Nd);
          v("firebaseui.auth.AuthUIError.prototype.toJSON", Nd.prototype.toJSON);
          v("firebaseui.auth.CredentialHelper.GOOGLE_YOLO", ni);
          v("firebaseui.auth.CredentialHelper.NONE", ci);
          v("firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID", "anonymous");
          Ve.prototype["catch"] = Ve.prototype.Ca;
          Ve.prototype["finally"] = Ve.prototype.fc;
        }).apply(typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : window);
        if (typeof window !== "undefined") {
          window.dialogPolyfill = require_dialog_polyfill();
        }
      })();
      module.exports = firebaseui;
    }
  });

  // node_modules/firebase/app/dist/index.esm.js
  init_index_esm20174();
  init_index_esm20174();
  var name2 = "firebase";
  var version2 = "9.6.3";
  registerVersion(name2, version2, "app");

  // node_modules/@firebase/auth/dist/esm2017/index.js
  init_index_1679a2b2();
  init_index_esm2017();
  init_index_esm20174();
  init_modules();
  init_index_esm20173();
  init_index_esm20172();

  // firebase.config.js
  var config = {
    apiKey: "AIzaSyCFBkvbRgHSaqz48Odsg2Ugrjnw2Z5spwk",
    authDomain: "airlift-dev-9e6bd.firebaseapp.com",
    projectId: "airlift-dev-9e6bd",
    appId: "1:436809552983:web:ceb56df2538eab9ca27f12",
    databaseUrl: "https://airlift-dev-9e6bd.firebaseio.com"
  };

  // src/index.js
  var firebaseui2 = require_npm();
  var app = initializeApp(config);
  var auth = getAuth(app);
  var ui = new firebaseui2.auth.AuthUI(auth);
  ui.start("#firebaseui-auth-container", {
    callbacks: {
      signInSuccessWithAuthResult: async function(authResult, redirectUrl) {
        document.getElementById("json").innerText = JSON.stringify({
          token: await auth.currentUser.getIdToken(),
          user: auth.currentUser
        });
        return true;
      },
      uiShown: function() {
        document.getElementById("loader").style.display = "none";
      }
    },
    signInFlow: "popup",
    signInOptions: [
      "facebook.com",
      "apple.com",
      "google.com"
    ]
  });
})();
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
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */