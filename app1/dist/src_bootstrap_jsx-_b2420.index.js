(self["webpackChunkworkflow_task_manager_ui"] = self["webpackChunkworkflow_task_manager_ui"] || []).push([["src_bootstrap_jsx-_b2420"],{

/***/ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js":
/*!***************************************************************************************!*\
  !*** ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js ***!
  \***************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* global __webpack_require__ */
var Refresh = __webpack_require__(/*! react-refresh/runtime */ "./node_modules/react-refresh/runtime.js");

/**
 * Extracts exports from a webpack module object.
 * @param {string} moduleId A Webpack module ID.
 * @returns {*} An exports object from the module.
 */
function getModuleExports(moduleId) {
  if (typeof moduleId === 'undefined') {
    // `moduleId` is unavailable, which indicates that this module is not in the cache,
    // which means we won't be able to capture any exports,
    // and thus they cannot be refreshed safely.
    // These are likely runtime or dynamically generated modules.
    return {};
  }

  var maybeModule = __webpack_require__.c[moduleId];
  if (typeof maybeModule === 'undefined') {
    // `moduleId` is available but the module in cache is unavailable,
    // which indicates the module is somehow corrupted (e.g. broken Webpacak `module` globals).
    // We will warn the user (as this is likely a mistake) and assume they cannot be refreshed.
    console.warn('[React Refresh] Failed to get exports for module: ' + moduleId + '.');
    return {};
  }

  var exportsOrPromise = maybeModule.exports;
  if (typeof Promise !== 'undefined' && exportsOrPromise instanceof Promise) {
    return exportsOrPromise.then(function (exports) {
      return exports;
    });
  }
  return exportsOrPromise;
}

/**
 * Calculates the signature of a React refresh boundary.
 * If this signature changes, it's unsafe to accept the boundary.
 *
 * This implementation is based on the one in [Metro](https://github.com/facebook/metro/blob/907d6af22ac6ebe58572be418e9253a90665ecbd/packages/metro/src/lib/polyfills/require.js#L795-L816).
 * @param {*} moduleExports A Webpack module exports object.
 * @returns {string[]} A React refresh boundary signature array.
 */
function getReactRefreshBoundarySignature(moduleExports) {
  var signature = [];
  signature.push(Refresh.getFamilyByType(moduleExports));

  if (moduleExports == null || typeof moduleExports !== 'object') {
    // Exit if we can't iterate over exports.
    return signature;
  }

  for (var key in moduleExports) {
    if (key === '__esModule') {
      continue;
    }

    signature.push(key);
    signature.push(Refresh.getFamilyByType(moduleExports[key]));
  }

  return signature;
}

/**
 * Creates a helper that performs a delayed React refresh.
 * @returns {function(function(): void): void} A debounced React refresh function.
 */
function createDebounceUpdate() {
  /**
   * A cached setTimeout handler.
   * @type {number | undefined}
   */
  var refreshTimeout;

  /**
   * Performs react refresh on a delay and clears the error overlay.
   * @param {function(): void} callback
   * @returns {void}
   */
  function enqueueUpdate(callback) {
    if (typeof refreshTimeout === 'undefined') {
      refreshTimeout = setTimeout(function () {
        refreshTimeout = undefined;
        Refresh.performReactRefresh();
        callback();
      }, 30);
    }
  }

  return enqueueUpdate;
}

/**
 * Checks if all exports are likely a React component.
 *
 * This implementation is based on the one in [Metro](https://github.com/facebook/metro/blob/febdba2383113c88296c61e28e4ef6a7f4939fda/packages/metro/src/lib/polyfills/require.js#L748-L774).
 * @param {*} moduleExports A Webpack module exports object.
 * @returns {boolean} Whether the exports are React component like.
 */
function isReactRefreshBoundary(moduleExports) {
  if (Refresh.isLikelyComponentType(moduleExports)) {
    return true;
  }
  if (moduleExports === undefined || moduleExports === null || typeof moduleExports !== 'object') {
    // Exit if we can't iterate over exports.
    return false;
  }

  var hasExports = false;
  var areAllExportsComponents = true;
  for (var key in moduleExports) {
    hasExports = true;

    // This is the ES Module indicator flag
    if (key === '__esModule') {
      continue;
    }

    // We can (and have to) safely execute getters here,
    // as Webpack manually assigns harmony exports to getters,
    // without any side-effects attached.
    // Ref: https://github.com/webpack/webpack/blob/b93048643fe74de2a6931755911da1212df55897/lib/MainTemplate.js#L281
    var exportValue = moduleExports[key];
    if (!Refresh.isLikelyComponentType(exportValue)) {
      areAllExportsComponents = false;
    }
  }

  return hasExports && areAllExportsComponents;
}

/**
 * Checks if exports are likely a React component and registers them.
 *
 * This implementation is based on the one in [Metro](https://github.com/facebook/metro/blob/febdba2383113c88296c61e28e4ef6a7f4939fda/packages/metro/src/lib/polyfills/require.js#L818-L835).
 * @param {*} moduleExports A Webpack module exports object.
 * @param {string} moduleId A Webpack module ID.
 * @returns {void}
 */
function registerExportsForReactRefresh(moduleExports, moduleId) {
  if (Refresh.isLikelyComponentType(moduleExports)) {
    // Register module.exports if it is likely a component
    Refresh.register(moduleExports, moduleId + ' %exports%');
  }

  if (moduleExports === undefined || moduleExports === null || typeof moduleExports !== 'object') {
    // Exit if we can't iterate over the exports.
    return;
  }

  for (var key in moduleExports) {
    // Skip registering the ES Module indicator
    if (key === '__esModule') {
      continue;
    }

    var exportValue = moduleExports[key];
    if (Refresh.isLikelyComponentType(exportValue)) {
      var typeID = moduleId + ' %exports% ' + key;
      Refresh.register(exportValue, typeID);
    }
  }
}

/**
 * Compares previous and next module objects to check for mutated boundaries.
 *
 * This implementation is based on the one in [Metro](https://github.com/facebook/metro/blob/907d6af22ac6ebe58572be418e9253a90665ecbd/packages/metro/src/lib/polyfills/require.js#L776-L792).
 * @param {*} prevExports The current Webpack module exports object.
 * @param {*} nextExports The next Webpack module exports object.
 * @returns {boolean} Whether the React refresh boundary should be invalidated.
 */
function shouldInvalidateReactRefreshBoundary(prevExports, nextExports) {
  var prevSignature = getReactRefreshBoundarySignature(prevExports);
  var nextSignature = getReactRefreshBoundarySignature(nextExports);

  if (prevSignature.length !== nextSignature.length) {
    return true;
  }

  for (var i = 0; i < nextSignature.length; i += 1) {
    if (prevSignature[i] !== nextSignature[i]) {
      return true;
    }
  }

  return false;
}

var enqueueUpdate = createDebounceUpdate();
function executeRuntime(moduleExports, moduleId, webpackHot, refreshOverlay, isTest) {
  registerExportsForReactRefresh(moduleExports, moduleId);

  if (webpackHot) {
    var isHotUpdate = !!webpackHot.data;
    var prevExports;
    if (isHotUpdate) {
      prevExports = webpackHot.data.prevExports;
    }

    if (isReactRefreshBoundary(moduleExports)) {
      webpackHot.dispose(
        /**
         * A callback to performs a full refresh if React has unrecoverable errors,
         * and also caches the to-be-disposed module.
         * @param {*} data A hot module data object from Webpack HMR.
         * @returns {void}
         */
        function hotDisposeCallback(data) {
          // We have to mutate the data object to get data registered and cached
          data.prevExports = moduleExports;
        }
      );
      webpackHot.accept(
        /**
         * An error handler to allow self-recovering behaviours.
         * @param {Error} error An error occurred during evaluation of a module.
         * @returns {void}
         */
        function hotErrorHandler(error) {
          if (typeof refreshOverlay !== 'undefined' && refreshOverlay) {
            refreshOverlay.handleRuntimeError(error);
          }

          if (typeof isTest !== 'undefined' && isTest) {
            if (window.onHotAcceptError) {
              window.onHotAcceptError(error.message);
            }
          }

          __webpack_require__.c[moduleId].hot.accept(hotErrorHandler);
        }
      );

      if (isHotUpdate) {
        if (
          isReactRefreshBoundary(prevExports) &&
          shouldInvalidateReactRefreshBoundary(prevExports, moduleExports)
        ) {
          webpackHot.invalidate();
        } else {
          enqueueUpdate(
            /**
             * A function to dismiss the error overlay after performing React refresh.
             * @returns {void}
             */
            function updateCallback() {
              if (typeof refreshOverlay !== 'undefined' && refreshOverlay) {
                refreshOverlay.clearRuntimeErrors();
              }
            }
          );
        }
      }
    } else {
      if (isHotUpdate && typeof prevExports !== 'undefined') {
        webpackHot.invalidate();
      }
    }
  }
}

module.exports = Object.freeze({
  enqueueUpdate: enqueueUpdate,
  executeRuntime: executeRuntime,
  getModuleExports: getModuleExports,
  isReactRefreshBoundary: isReactRefreshBoundary,
  shouldInvalidateReactRefreshBoundary: shouldInvalidateReactRefreshBoundary,
  registerExportsForReactRefresh: registerExportsForReactRefresh,
});


/***/ }),

/***/ "./src/bootstrap.jsx":
/*!***************************!*\
  !*** ./src/bootstrap.jsx ***!
  \***************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom/client */ "./node_modules/react-dom/client.js");
/* harmony import */ var containers_Root__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! containers/Root */ "./src/containers/Root.jsx");
/* module decorator */ module = __webpack_require__.hmd(module);
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
/* provided dependency */ var __react_refresh_error_overlay__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/overlay/index.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/overlay/index.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");

(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal["default"].signature : function (a) {
  return a;
};




var rootContainer = document.getElementById('root');
var root = (0,react_dom_client__WEBPACK_IMPORTED_MODULE_1__.createRoot)(rootContainer);
root.render( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(containers_Root__WEBPACK_IMPORTED_MODULE_2__["default"], null));
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(rootContainer, "rootContainer", "D:\\Users\\hcontreras\\Documents\\veritext\\microfrontend\\app1\\src\\bootstrap.jsx");
  reactHotLoader.register(root, "root", "D:\\Users\\hcontreras\\Documents\\veritext\\microfrontend\\app1\\src\\bootstrap.jsx");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

const $ReactRefreshModuleId$ = __webpack_require__.$Refresh$.moduleId;
const $ReactRefreshCurrentExports$ = __react_refresh_utils__.getModuleExports(
	$ReactRefreshModuleId$
);

function $ReactRefreshModuleRuntime$(exports) {
	if (true) {
		let errorOverlay;
		if (typeof __react_refresh_error_overlay__ !== 'undefined') {
			errorOverlay = __react_refresh_error_overlay__;
		}
		let testMode;
		if (typeof __react_refresh_test__ !== 'undefined') {
			testMode = __react_refresh_test__;
		}
		return __react_refresh_utils__.executeRuntime(
			exports,
			$ReactRefreshModuleId$,
			module.hot,
			errorOverlay,
			testMode
		);
	}
}

if (typeof Promise !== 'undefined' && $ReactRefreshCurrentExports$ instanceof Promise) {
	$ReactRefreshCurrentExports$.then($ReactRefreshModuleRuntime$);
} else {
	$ReactRefreshModuleRuntime$($ReactRefreshCurrentExports$);
}

/***/ }),

/***/ "./src/components/Header.jsx":
/*!***********************************!*\
  !*** ./src/components/Header.jsx ***!
  \***********************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var host_useAuthentication__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! host/useAuthentication */ "webpack/container/remote/host/useAuthentication");
/* harmony import */ var host_useAuthentication__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(host_useAuthentication__WEBPACK_IMPORTED_MODULE_1__);
/* module decorator */ module = __webpack_require__.hmd(module);
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
/* provided dependency */ var __react_refresh_error_overlay__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/overlay/index.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/overlay/index.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");

(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal["default"].signature : function (a) {
  return a;
};




var Header = function Header() {
  var _useAuthentication = host_useAuthentication__WEBPACK_IMPORTED_MODULE_1___default()(),
      getSessionToken = _useAuthentication.getSessionToken;

  var token = getSessionToken();
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, "Header ", token ? token : 'No session');
};

__signature__(Header, "useAuthentication{{ getSessionToken }}", function () {
  return [(host_useAuthentication__WEBPACK_IMPORTED_MODULE_1___default())];
});

var _default = Header;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(Header, "Header", "D:\\Users\\hcontreras\\Documents\\veritext\\microfrontend\\app1\\src\\components\\Header.jsx");
  reactHotLoader.register(_default, "default", "D:\\Users\\hcontreras\\Documents\\veritext\\microfrontend\\app1\\src\\components\\Header.jsx");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

const $ReactRefreshModuleId$ = __webpack_require__.$Refresh$.moduleId;
const $ReactRefreshCurrentExports$ = __react_refresh_utils__.getModuleExports(
	$ReactRefreshModuleId$
);

function $ReactRefreshModuleRuntime$(exports) {
	if (true) {
		let errorOverlay;
		if (typeof __react_refresh_error_overlay__ !== 'undefined') {
			errorOverlay = __react_refresh_error_overlay__;
		}
		let testMode;
		if (typeof __react_refresh_test__ !== 'undefined') {
			testMode = __react_refresh_test__;
		}
		return __react_refresh_utils__.executeRuntime(
			exports,
			$ReactRefreshModuleId$,
			module.hot,
			errorOverlay,
			testMode
		);
	}
}

if (typeof Promise !== 'undefined' && $ReactRefreshCurrentExports$ instanceof Promise) {
	$ReactRefreshCurrentExports$.then($ReactRefreshModuleRuntime$);
} else {
	$ReactRefreshModuleRuntime$($ReactRefreshCurrentExports$);
}

/***/ }),

/***/ "./src/containers/Root.jsx":
/*!*********************************!*\
  !*** ./src/containers/Root.jsx ***!
  \*********************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var components_Header__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! components/Header */ "./src/components/Header.jsx");
/* module decorator */ module = __webpack_require__.hmd(module);
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
/* provided dependency */ var __react_refresh_error_overlay__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/overlay/index.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/overlay/index.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");

(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal["default"].signature : function (a) {
  return a;
};




var RootContainer = function RootContainer() {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(components_Header__WEBPACK_IMPORTED_MODULE_1__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, "App 3"));
};

var _default = RootContainer;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(RootContainer, "RootContainer", "D:\\Users\\hcontreras\\Documents\\veritext\\microfrontend\\app1\\src\\containers\\Root.jsx");
  reactHotLoader.register(_default, "default", "D:\\Users\\hcontreras\\Documents\\veritext\\microfrontend\\app1\\src\\containers\\Root.jsx");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

const $ReactRefreshModuleId$ = __webpack_require__.$Refresh$.moduleId;
const $ReactRefreshCurrentExports$ = __react_refresh_utils__.getModuleExports(
	$ReactRefreshModuleId$
);

function $ReactRefreshModuleRuntime$(exports) {
	if (true) {
		let errorOverlay;
		if (typeof __react_refresh_error_overlay__ !== 'undefined') {
			errorOverlay = __react_refresh_error_overlay__;
		}
		let testMode;
		if (typeof __react_refresh_test__ !== 'undefined') {
			testMode = __react_refresh_test__;
		}
		return __react_refresh_utils__.executeRuntime(
			exports,
			$ReactRefreshModuleId$,
			module.hot,
			errorOverlay,
			testMode
		);
	}
}

if (typeof Promise !== 'undefined' && $ReactRefreshCurrentExports$ instanceof Promise) {
	$ReactRefreshCurrentExports$.then($ReactRefreshModuleRuntime$);
} else {
	$ReactRefreshModuleRuntime$($ReactRefreshCurrentExports$);
}

/***/ }),

/***/ "./node_modules/react-dom/client.js":
/*!******************************************!*\
  !*** ./node_modules/react-dom/client.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var m = __webpack_require__(/*! react-dom */ "webpack/sharing/consume/default/react-dom/react-dom");
if (false) {} else {
  var i = m.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
  exports.createRoot = function(c, o) {
    i.usingClientEntryPoint = true;
    try {
      return m.createRoot(c, o);
    } finally {
      i.usingClientEntryPoint = false;
    }
  };
  exports.hydrateRoot = function(c, h, o) {
    i.usingClientEntryPoint = true;
    try {
      return m.hydrateRoot(c, h, o);
    } finally {
      i.usingClientEntryPoint = false;
    }
  };
}


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Ozs7Ozs7MEJBRk1KOzBCQUNBRzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTE47QUFDQTs7QUFFQSxJQUFNRyxNQUFNLEdBQUcsU0FBVEEsTUFBUyxHQUFNO0VBQ2pCLHlCQUE0QkQsNkRBQWlCLEVBQTdDO0VBQUEsSUFBUUUsZUFBUixzQkFBUUEsZUFBUjs7RUFDQSxJQUFNQyxLQUFLLEdBQUdELGVBQWUsRUFBN0I7RUFDQSxvQkFBTyxxSUFBVUMsS0FBSyxHQUFHQSxLQUFILEdBQVcsWUFBMUIsQ0FBUDtBQUNILENBSkQ7O2NBQU1GO1VBQzBCRDs7O2VBS2pCQztBQUFmLGlFQUFlOzs7Ozs7Ozs7OzBCQU5UQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDSE47QUFDQTs7QUFFQSxJQUFNUCxhQUFhLEdBQUcsU0FBaEJBLGFBQWdCLEdBQU07RUFDMUIsb0JBQ0UsdUlBQ0UsMkRBQUMseURBQUQsT0FERixlQUNZLHNFQURaLGVBRUUsa0lBRkYsQ0FERjtBQU1ELENBUEQ7O2VBUWVBO0FBQWYsaUVBQWU7Ozs7Ozs7Ozs7MEJBUlRBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNITzs7QUFFYixRQUFRLG1CQUFPLENBQUMsc0VBQVc7QUFDM0IsSUFBSSxLQUFxQyxFQUFFLEVBRzFDLENBQUM7QUFDRjtBQUNBLEVBQUUsa0JBQWtCO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQSxFQUFFLG1CQUFtQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93b3JrZmxvdy10YXNrLW1hbmFnZXItdWkvLi9ub2RlX21vZHVsZXMvQHBtbW13aC9yZWFjdC1yZWZyZXNoLXdlYnBhY2stcGx1Z2luL2xpYi9ydW50aW1lL1JlZnJlc2hVdGlscy5qcyIsIndlYnBhY2s6Ly93b3JrZmxvdy10YXNrLW1hbmFnZXItdWkvLi9zcmMvYm9vdHN0cmFwLmpzeCIsIndlYnBhY2s6Ly93b3JrZmxvdy10YXNrLW1hbmFnZXItdWkvLi9zcmMvY29tcG9uZW50cy9IZWFkZXIuanN4Iiwid2VicGFjazovL3dvcmtmbG93LXRhc2stbWFuYWdlci11aS8uL3NyYy9jb250YWluZXJzL1Jvb3QuanN4Iiwid2VicGFjazovL3dvcmtmbG93LXRhc2stbWFuYWdlci11aS8uL25vZGVfbW9kdWxlcy9yZWFjdC1kb20vY2xpZW50LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qIGdsb2JhbCBfX3dlYnBhY2tfcmVxdWlyZV9fICovXG52YXIgUmVmcmVzaCA9IHJlcXVpcmUoJ3JlYWN0LXJlZnJlc2gvcnVudGltZScpO1xuXG4vKipcbiAqIEV4dHJhY3RzIGV4cG9ydHMgZnJvbSBhIHdlYnBhY2sgbW9kdWxlIG9iamVjdC5cbiAqIEBwYXJhbSB7c3RyaW5nfSBtb2R1bGVJZCBBIFdlYnBhY2sgbW9kdWxlIElELlxuICogQHJldHVybnMgeyp9IEFuIGV4cG9ydHMgb2JqZWN0IGZyb20gdGhlIG1vZHVsZS5cbiAqL1xuZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cyhtb2R1bGVJZCkge1xuICBpZiAodHlwZW9mIG1vZHVsZUlkID09PSAndW5kZWZpbmVkJykge1xuICAgIC8vIGBtb2R1bGVJZGAgaXMgdW5hdmFpbGFibGUsIHdoaWNoIGluZGljYXRlcyB0aGF0IHRoaXMgbW9kdWxlIGlzIG5vdCBpbiB0aGUgY2FjaGUsXG4gICAgLy8gd2hpY2ggbWVhbnMgd2Ugd29uJ3QgYmUgYWJsZSB0byBjYXB0dXJlIGFueSBleHBvcnRzLFxuICAgIC8vIGFuZCB0aHVzIHRoZXkgY2Fubm90IGJlIHJlZnJlc2hlZCBzYWZlbHkuXG4gICAgLy8gVGhlc2UgYXJlIGxpa2VseSBydW50aW1lIG9yIGR5bmFtaWNhbGx5IGdlbmVyYXRlZCBtb2R1bGVzLlxuICAgIHJldHVybiB7fTtcbiAgfVxuXG4gIHZhciBtYXliZU1vZHVsZSA9IF9fd2VicGFja19yZXF1aXJlX18uY1ttb2R1bGVJZF07XG4gIGlmICh0eXBlb2YgbWF5YmVNb2R1bGUgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgLy8gYG1vZHVsZUlkYCBpcyBhdmFpbGFibGUgYnV0IHRoZSBtb2R1bGUgaW4gY2FjaGUgaXMgdW5hdmFpbGFibGUsXG4gICAgLy8gd2hpY2ggaW5kaWNhdGVzIHRoZSBtb2R1bGUgaXMgc29tZWhvdyBjb3JydXB0ZWQgKGUuZy4gYnJva2VuIFdlYnBhY2FrIGBtb2R1bGVgIGdsb2JhbHMpLlxuICAgIC8vIFdlIHdpbGwgd2FybiB0aGUgdXNlciAoYXMgdGhpcyBpcyBsaWtlbHkgYSBtaXN0YWtlKSBhbmQgYXNzdW1lIHRoZXkgY2Fubm90IGJlIHJlZnJlc2hlZC5cbiAgICBjb25zb2xlLndhcm4oJ1tSZWFjdCBSZWZyZXNoXSBGYWlsZWQgdG8gZ2V0IGV4cG9ydHMgZm9yIG1vZHVsZTogJyArIG1vZHVsZUlkICsgJy4nKTtcbiAgICByZXR1cm4ge307XG4gIH1cblxuICB2YXIgZXhwb3J0c09yUHJvbWlzZSA9IG1heWJlTW9kdWxlLmV4cG9ydHM7XG4gIGlmICh0eXBlb2YgUHJvbWlzZSAhPT0gJ3VuZGVmaW5lZCcgJiYgZXhwb3J0c09yUHJvbWlzZSBpbnN0YW5jZW9mIFByb21pc2UpIHtcbiAgICByZXR1cm4gZXhwb3J0c09yUHJvbWlzZS50aGVuKGZ1bmN0aW9uIChleHBvcnRzKSB7XG4gICAgICByZXR1cm4gZXhwb3J0cztcbiAgICB9KTtcbiAgfVxuICByZXR1cm4gZXhwb3J0c09yUHJvbWlzZTtcbn1cblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBzaWduYXR1cmUgb2YgYSBSZWFjdCByZWZyZXNoIGJvdW5kYXJ5LlxuICogSWYgdGhpcyBzaWduYXR1cmUgY2hhbmdlcywgaXQncyB1bnNhZmUgdG8gYWNjZXB0IHRoZSBib3VuZGFyeS5cbiAqXG4gKiBUaGlzIGltcGxlbWVudGF0aW9uIGlzIGJhc2VkIG9uIHRoZSBvbmUgaW4gW01ldHJvXShodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svbWV0cm8vYmxvYi85MDdkNmFmMjJhYzZlYmU1ODU3MmJlNDE4ZTkyNTNhOTA2NjVlY2JkL3BhY2thZ2VzL21ldHJvL3NyYy9saWIvcG9seWZpbGxzL3JlcXVpcmUuanMjTDc5NS1MODE2KS5cbiAqIEBwYXJhbSB7Kn0gbW9kdWxlRXhwb3J0cyBBIFdlYnBhY2sgbW9kdWxlIGV4cG9ydHMgb2JqZWN0LlxuICogQHJldHVybnMge3N0cmluZ1tdfSBBIFJlYWN0IHJlZnJlc2ggYm91bmRhcnkgc2lnbmF0dXJlIGFycmF5LlxuICovXG5mdW5jdGlvbiBnZXRSZWFjdFJlZnJlc2hCb3VuZGFyeVNpZ25hdHVyZShtb2R1bGVFeHBvcnRzKSB7XG4gIHZhciBzaWduYXR1cmUgPSBbXTtcbiAgc2lnbmF0dXJlLnB1c2goUmVmcmVzaC5nZXRGYW1pbHlCeVR5cGUobW9kdWxlRXhwb3J0cykpO1xuXG4gIGlmIChtb2R1bGVFeHBvcnRzID09IG51bGwgfHwgdHlwZW9mIG1vZHVsZUV4cG9ydHMgIT09ICdvYmplY3QnKSB7XG4gICAgLy8gRXhpdCBpZiB3ZSBjYW4ndCBpdGVyYXRlIG92ZXIgZXhwb3J0cy5cbiAgICByZXR1cm4gc2lnbmF0dXJlO1xuICB9XG5cbiAgZm9yICh2YXIga2V5IGluIG1vZHVsZUV4cG9ydHMpIHtcbiAgICBpZiAoa2V5ID09PSAnX19lc01vZHVsZScpIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIHNpZ25hdHVyZS5wdXNoKGtleSk7XG4gICAgc2lnbmF0dXJlLnB1c2goUmVmcmVzaC5nZXRGYW1pbHlCeVR5cGUobW9kdWxlRXhwb3J0c1trZXldKSk7XG4gIH1cblxuICByZXR1cm4gc2lnbmF0dXJlO1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBoZWxwZXIgdGhhdCBwZXJmb3JtcyBhIGRlbGF5ZWQgUmVhY3QgcmVmcmVzaC5cbiAqIEByZXR1cm5zIHtmdW5jdGlvbihmdW5jdGlvbigpOiB2b2lkKTogdm9pZH0gQSBkZWJvdW5jZWQgUmVhY3QgcmVmcmVzaCBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gY3JlYXRlRGVib3VuY2VVcGRhdGUoKSB7XG4gIC8qKlxuICAgKiBBIGNhY2hlZCBzZXRUaW1lb3V0IGhhbmRsZXIuXG4gICAqIEB0eXBlIHtudW1iZXIgfCB1bmRlZmluZWR9XG4gICAqL1xuICB2YXIgcmVmcmVzaFRpbWVvdXQ7XG5cbiAgLyoqXG4gICAqIFBlcmZvcm1zIHJlYWN0IHJlZnJlc2ggb24gYSBkZWxheSBhbmQgY2xlYXJzIHRoZSBlcnJvciBvdmVybGF5LlxuICAgKiBAcGFyYW0ge2Z1bmN0aW9uKCk6IHZvaWR9IGNhbGxiYWNrXG4gICAqIEByZXR1cm5zIHt2b2lkfVxuICAgKi9cbiAgZnVuY3Rpb24gZW5xdWV1ZVVwZGF0ZShjYWxsYmFjaykge1xuICAgIGlmICh0eXBlb2YgcmVmcmVzaFRpbWVvdXQgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICByZWZyZXNoVGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICByZWZyZXNoVGltZW91dCA9IHVuZGVmaW5lZDtcbiAgICAgICAgUmVmcmVzaC5wZXJmb3JtUmVhY3RSZWZyZXNoKCk7XG4gICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICB9LCAzMCk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGVucXVldWVVcGRhdGU7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGFsbCBleHBvcnRzIGFyZSBsaWtlbHkgYSBSZWFjdCBjb21wb25lbnQuXG4gKlxuICogVGhpcyBpbXBsZW1lbnRhdGlvbiBpcyBiYXNlZCBvbiB0aGUgb25lIGluIFtNZXRyb10oaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL21ldHJvL2Jsb2IvZmViZGJhMjM4MzExM2M4ODI5NmM2MWUyOGU0ZWY2YTdmNDkzOWZkYS9wYWNrYWdlcy9tZXRyby9zcmMvbGliL3BvbHlmaWxscy9yZXF1aXJlLmpzI0w3NDgtTDc3NCkuXG4gKiBAcGFyYW0geyp9IG1vZHVsZUV4cG9ydHMgQSBXZWJwYWNrIG1vZHVsZSBleHBvcnRzIG9iamVjdC5cbiAqIEByZXR1cm5zIHtib29sZWFufSBXaGV0aGVyIHRoZSBleHBvcnRzIGFyZSBSZWFjdCBjb21wb25lbnQgbGlrZS5cbiAqL1xuZnVuY3Rpb24gaXNSZWFjdFJlZnJlc2hCb3VuZGFyeShtb2R1bGVFeHBvcnRzKSB7XG4gIGlmIChSZWZyZXNoLmlzTGlrZWx5Q29tcG9uZW50VHlwZShtb2R1bGVFeHBvcnRzKSkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIGlmIChtb2R1bGVFeHBvcnRzID09PSB1bmRlZmluZWQgfHwgbW9kdWxlRXhwb3J0cyA9PT0gbnVsbCB8fCB0eXBlb2YgbW9kdWxlRXhwb3J0cyAhPT0gJ29iamVjdCcpIHtcbiAgICAvLyBFeGl0IGlmIHdlIGNhbid0IGl0ZXJhdGUgb3ZlciBleHBvcnRzLlxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHZhciBoYXNFeHBvcnRzID0gZmFsc2U7XG4gIHZhciBhcmVBbGxFeHBvcnRzQ29tcG9uZW50cyA9IHRydWU7XG4gIGZvciAodmFyIGtleSBpbiBtb2R1bGVFeHBvcnRzKSB7XG4gICAgaGFzRXhwb3J0cyA9IHRydWU7XG5cbiAgICAvLyBUaGlzIGlzIHRoZSBFUyBNb2R1bGUgaW5kaWNhdG9yIGZsYWdcbiAgICBpZiAoa2V5ID09PSAnX19lc01vZHVsZScpIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIC8vIFdlIGNhbiAoYW5kIGhhdmUgdG8pIHNhZmVseSBleGVjdXRlIGdldHRlcnMgaGVyZSxcbiAgICAvLyBhcyBXZWJwYWNrIG1hbnVhbGx5IGFzc2lnbnMgaGFybW9ueSBleHBvcnRzIHRvIGdldHRlcnMsXG4gICAgLy8gd2l0aG91dCBhbnkgc2lkZS1lZmZlY3RzIGF0dGFjaGVkLlxuICAgIC8vIFJlZjogaHR0cHM6Ly9naXRodWIuY29tL3dlYnBhY2svd2VicGFjay9ibG9iL2I5MzA0ODY0M2ZlNzRkZTJhNjkzMTc1NTkxMWRhMTIxMmRmNTU4OTcvbGliL01haW5UZW1wbGF0ZS5qcyNMMjgxXG4gICAgdmFyIGV4cG9ydFZhbHVlID0gbW9kdWxlRXhwb3J0c1trZXldO1xuICAgIGlmICghUmVmcmVzaC5pc0xpa2VseUNvbXBvbmVudFR5cGUoZXhwb3J0VmFsdWUpKSB7XG4gICAgICBhcmVBbGxFeHBvcnRzQ29tcG9uZW50cyA9IGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBoYXNFeHBvcnRzICYmIGFyZUFsbEV4cG9ydHNDb21wb25lbnRzO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBleHBvcnRzIGFyZSBsaWtlbHkgYSBSZWFjdCBjb21wb25lbnQgYW5kIHJlZ2lzdGVycyB0aGVtLlxuICpcbiAqIFRoaXMgaW1wbGVtZW50YXRpb24gaXMgYmFzZWQgb24gdGhlIG9uZSBpbiBbTWV0cm9dKGh0dHBzOi8vZ2l0aHViLmNvbS9mYWNlYm9vay9tZXRyby9ibG9iL2ZlYmRiYTIzODMxMTNjODgyOTZjNjFlMjhlNGVmNmE3ZjQ5MzlmZGEvcGFja2FnZXMvbWV0cm8vc3JjL2xpYi9wb2x5ZmlsbHMvcmVxdWlyZS5qcyNMODE4LUw4MzUpLlxuICogQHBhcmFtIHsqfSBtb2R1bGVFeHBvcnRzIEEgV2VicGFjayBtb2R1bGUgZXhwb3J0cyBvYmplY3QuXG4gKiBAcGFyYW0ge3N0cmluZ30gbW9kdWxlSWQgQSBXZWJwYWNrIG1vZHVsZSBJRC5cbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5mdW5jdGlvbiByZWdpc3RlckV4cG9ydHNGb3JSZWFjdFJlZnJlc2gobW9kdWxlRXhwb3J0cywgbW9kdWxlSWQpIHtcbiAgaWYgKFJlZnJlc2guaXNMaWtlbHlDb21wb25lbnRUeXBlKG1vZHVsZUV4cG9ydHMpKSB7XG4gICAgLy8gUmVnaXN0ZXIgbW9kdWxlLmV4cG9ydHMgaWYgaXQgaXMgbGlrZWx5IGEgY29tcG9uZW50XG4gICAgUmVmcmVzaC5yZWdpc3Rlcihtb2R1bGVFeHBvcnRzLCBtb2R1bGVJZCArICcgJWV4cG9ydHMlJyk7XG4gIH1cblxuICBpZiAobW9kdWxlRXhwb3J0cyA9PT0gdW5kZWZpbmVkIHx8IG1vZHVsZUV4cG9ydHMgPT09IG51bGwgfHwgdHlwZW9mIG1vZHVsZUV4cG9ydHMgIT09ICdvYmplY3QnKSB7XG4gICAgLy8gRXhpdCBpZiB3ZSBjYW4ndCBpdGVyYXRlIG92ZXIgdGhlIGV4cG9ydHMuXG4gICAgcmV0dXJuO1xuICB9XG5cbiAgZm9yICh2YXIga2V5IGluIG1vZHVsZUV4cG9ydHMpIHtcbiAgICAvLyBTa2lwIHJlZ2lzdGVyaW5nIHRoZSBFUyBNb2R1bGUgaW5kaWNhdG9yXG4gICAgaWYgKGtleSA9PT0gJ19fZXNNb2R1bGUnKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICB2YXIgZXhwb3J0VmFsdWUgPSBtb2R1bGVFeHBvcnRzW2tleV07XG4gICAgaWYgKFJlZnJlc2guaXNMaWtlbHlDb21wb25lbnRUeXBlKGV4cG9ydFZhbHVlKSkge1xuICAgICAgdmFyIHR5cGVJRCA9IG1vZHVsZUlkICsgJyAlZXhwb3J0cyUgJyArIGtleTtcbiAgICAgIFJlZnJlc2gucmVnaXN0ZXIoZXhwb3J0VmFsdWUsIHR5cGVJRCk7XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogQ29tcGFyZXMgcHJldmlvdXMgYW5kIG5leHQgbW9kdWxlIG9iamVjdHMgdG8gY2hlY2sgZm9yIG11dGF0ZWQgYm91bmRhcmllcy5cbiAqXG4gKiBUaGlzIGltcGxlbWVudGF0aW9uIGlzIGJhc2VkIG9uIHRoZSBvbmUgaW4gW01ldHJvXShodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svbWV0cm8vYmxvYi85MDdkNmFmMjJhYzZlYmU1ODU3MmJlNDE4ZTkyNTNhOTA2NjVlY2JkL3BhY2thZ2VzL21ldHJvL3NyYy9saWIvcG9seWZpbGxzL3JlcXVpcmUuanMjTDc3Ni1MNzkyKS5cbiAqIEBwYXJhbSB7Kn0gcHJldkV4cG9ydHMgVGhlIGN1cnJlbnQgV2VicGFjayBtb2R1bGUgZXhwb3J0cyBvYmplY3QuXG4gKiBAcGFyYW0geyp9IG5leHRFeHBvcnRzIFRoZSBuZXh0IFdlYnBhY2sgbW9kdWxlIGV4cG9ydHMgb2JqZWN0LlxuICogQHJldHVybnMge2Jvb2xlYW59IFdoZXRoZXIgdGhlIFJlYWN0IHJlZnJlc2ggYm91bmRhcnkgc2hvdWxkIGJlIGludmFsaWRhdGVkLlxuICovXG5mdW5jdGlvbiBzaG91bGRJbnZhbGlkYXRlUmVhY3RSZWZyZXNoQm91bmRhcnkocHJldkV4cG9ydHMsIG5leHRFeHBvcnRzKSB7XG4gIHZhciBwcmV2U2lnbmF0dXJlID0gZ2V0UmVhY3RSZWZyZXNoQm91bmRhcnlTaWduYXR1cmUocHJldkV4cG9ydHMpO1xuICB2YXIgbmV4dFNpZ25hdHVyZSA9IGdldFJlYWN0UmVmcmVzaEJvdW5kYXJ5U2lnbmF0dXJlKG5leHRFeHBvcnRzKTtcblxuICBpZiAocHJldlNpZ25hdHVyZS5sZW5ndGggIT09IG5leHRTaWduYXR1cmUubGVuZ3RoKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBmb3IgKHZhciBpID0gMDsgaSA8IG5leHRTaWduYXR1cmUubGVuZ3RoOyBpICs9IDEpIHtcbiAgICBpZiAocHJldlNpZ25hdHVyZVtpXSAhPT0gbmV4dFNpZ25hdHVyZVtpXSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG52YXIgZW5xdWV1ZVVwZGF0ZSA9IGNyZWF0ZURlYm91bmNlVXBkYXRlKCk7XG5mdW5jdGlvbiBleGVjdXRlUnVudGltZShtb2R1bGVFeHBvcnRzLCBtb2R1bGVJZCwgd2VicGFja0hvdCwgcmVmcmVzaE92ZXJsYXksIGlzVGVzdCkge1xuICByZWdpc3RlckV4cG9ydHNGb3JSZWFjdFJlZnJlc2gobW9kdWxlRXhwb3J0cywgbW9kdWxlSWQpO1xuXG4gIGlmICh3ZWJwYWNrSG90KSB7XG4gICAgdmFyIGlzSG90VXBkYXRlID0gISF3ZWJwYWNrSG90LmRhdGE7XG4gICAgdmFyIHByZXZFeHBvcnRzO1xuICAgIGlmIChpc0hvdFVwZGF0ZSkge1xuICAgICAgcHJldkV4cG9ydHMgPSB3ZWJwYWNrSG90LmRhdGEucHJldkV4cG9ydHM7XG4gICAgfVxuXG4gICAgaWYgKGlzUmVhY3RSZWZyZXNoQm91bmRhcnkobW9kdWxlRXhwb3J0cykpIHtcbiAgICAgIHdlYnBhY2tIb3QuZGlzcG9zZShcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEEgY2FsbGJhY2sgdG8gcGVyZm9ybXMgYSBmdWxsIHJlZnJlc2ggaWYgUmVhY3QgaGFzIHVucmVjb3ZlcmFibGUgZXJyb3JzLFxuICAgICAgICAgKiBhbmQgYWxzbyBjYWNoZXMgdGhlIHRvLWJlLWRpc3Bvc2VkIG1vZHVsZS5cbiAgICAgICAgICogQHBhcmFtIHsqfSBkYXRhIEEgaG90IG1vZHVsZSBkYXRhIG9iamVjdCBmcm9tIFdlYnBhY2sgSE1SLlxuICAgICAgICAgKiBAcmV0dXJucyB7dm9pZH1cbiAgICAgICAgICovXG4gICAgICAgIGZ1bmN0aW9uIGhvdERpc3Bvc2VDYWxsYmFjayhkYXRhKSB7XG4gICAgICAgICAgLy8gV2UgaGF2ZSB0byBtdXRhdGUgdGhlIGRhdGEgb2JqZWN0IHRvIGdldCBkYXRhIHJlZ2lzdGVyZWQgYW5kIGNhY2hlZFxuICAgICAgICAgIGRhdGEucHJldkV4cG9ydHMgPSBtb2R1bGVFeHBvcnRzO1xuICAgICAgICB9XG4gICAgICApO1xuICAgICAgd2VicGFja0hvdC5hY2NlcHQoXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBbiBlcnJvciBoYW5kbGVyIHRvIGFsbG93IHNlbGYtcmVjb3ZlcmluZyBiZWhhdmlvdXJzLlxuICAgICAgICAgKiBAcGFyYW0ge0Vycm9yfSBlcnJvciBBbiBlcnJvciBvY2N1cnJlZCBkdXJpbmcgZXZhbHVhdGlvbiBvZiBhIG1vZHVsZS5cbiAgICAgICAgICogQHJldHVybnMge3ZvaWR9XG4gICAgICAgICAqL1xuICAgICAgICBmdW5jdGlvbiBob3RFcnJvckhhbmRsZXIoZXJyb3IpIHtcbiAgICAgICAgICBpZiAodHlwZW9mIHJlZnJlc2hPdmVybGF5ICE9PSAndW5kZWZpbmVkJyAmJiByZWZyZXNoT3ZlcmxheSkge1xuICAgICAgICAgICAgcmVmcmVzaE92ZXJsYXkuaGFuZGxlUnVudGltZUVycm9yKGVycm9yKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAodHlwZW9mIGlzVGVzdCAhPT0gJ3VuZGVmaW5lZCcgJiYgaXNUZXN0KSB7XG4gICAgICAgICAgICBpZiAod2luZG93Lm9uSG90QWNjZXB0RXJyb3IpIHtcbiAgICAgICAgICAgICAgd2luZG93Lm9uSG90QWNjZXB0RXJyb3IoZXJyb3IubWVzc2FnZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgX193ZWJwYWNrX3JlcXVpcmVfXy5jW21vZHVsZUlkXS5ob3QuYWNjZXB0KGhvdEVycm9ySGFuZGxlcik7XG4gICAgICAgIH1cbiAgICAgICk7XG5cbiAgICAgIGlmIChpc0hvdFVwZGF0ZSkge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgaXNSZWFjdFJlZnJlc2hCb3VuZGFyeShwcmV2RXhwb3J0cykgJiZcbiAgICAgICAgICBzaG91bGRJbnZhbGlkYXRlUmVhY3RSZWZyZXNoQm91bmRhcnkocHJldkV4cG9ydHMsIG1vZHVsZUV4cG9ydHMpXG4gICAgICAgICkge1xuICAgICAgICAgIHdlYnBhY2tIb3QuaW52YWxpZGF0ZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGVucXVldWVVcGRhdGUoXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIEEgZnVuY3Rpb24gdG8gZGlzbWlzcyB0aGUgZXJyb3Igb3ZlcmxheSBhZnRlciBwZXJmb3JtaW5nIFJlYWN0IHJlZnJlc2guXG4gICAgICAgICAgICAgKiBAcmV0dXJucyB7dm9pZH1cbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgZnVuY3Rpb24gdXBkYXRlQ2FsbGJhY2soKSB7XG4gICAgICAgICAgICAgIGlmICh0eXBlb2YgcmVmcmVzaE92ZXJsYXkgIT09ICd1bmRlZmluZWQnICYmIHJlZnJlc2hPdmVybGF5KSB7XG4gICAgICAgICAgICAgICAgcmVmcmVzaE92ZXJsYXkuY2xlYXJSdW50aW1lRXJyb3JzKCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChpc0hvdFVwZGF0ZSAmJiB0eXBlb2YgcHJldkV4cG9ydHMgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHdlYnBhY2tIb3QuaW52YWxpZGF0ZSgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5mcmVlemUoe1xuICBlbnF1ZXVlVXBkYXRlOiBlbnF1ZXVlVXBkYXRlLFxuICBleGVjdXRlUnVudGltZTogZXhlY3V0ZVJ1bnRpbWUsXG4gIGdldE1vZHVsZUV4cG9ydHM6IGdldE1vZHVsZUV4cG9ydHMsXG4gIGlzUmVhY3RSZWZyZXNoQm91bmRhcnk6IGlzUmVhY3RSZWZyZXNoQm91bmRhcnksXG4gIHNob3VsZEludmFsaWRhdGVSZWFjdFJlZnJlc2hCb3VuZGFyeTogc2hvdWxkSW52YWxpZGF0ZVJlYWN0UmVmcmVzaEJvdW5kYXJ5LFxuICByZWdpc3RlckV4cG9ydHNGb3JSZWFjdFJlZnJlc2g6IHJlZ2lzdGVyRXhwb3J0c0ZvclJlYWN0UmVmcmVzaCxcbn0pO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgY3JlYXRlUm9vdCB9IGZyb20gJ3JlYWN0LWRvbS9jbGllbnQnXHJcbmltcG9ydCBSb290Q29udGFpbmVyIGZyb20gJ2NvbnRhaW5lcnMvUm9vdCdcclxuXHJcbmNvbnN0IHJvb3RDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncm9vdCcpXHJcbmNvbnN0IHJvb3QgPSBjcmVhdGVSb290KHJvb3RDb250YWluZXIpXHJcbnJvb3QucmVuZGVyKDxSb290Q29udGFpbmVyIC8+KSIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcclxuaW1wb3J0IHVzZUF1dGhlbnRpY2F0aW9uIGZyb20gJ2hvc3QvdXNlQXV0aGVudGljYXRpb24nXHJcblxyXG5jb25zdCBIZWFkZXIgPSAoKSA9PiB7XHJcbiAgICBjb25zdCB7IGdldFNlc3Npb25Ub2tlbiB9ID0gdXNlQXV0aGVudGljYXRpb24oKVxyXG4gICAgY29uc3QgdG9rZW4gPSBnZXRTZXNzaW9uVG9rZW4oKVxyXG4gICAgcmV0dXJuIDw+SGVhZGVyIHt0b2tlbiA/IHRva2VuIDogJ05vIHNlc3Npb24nfTwvPlxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBIZWFkZXIiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXHJcbmltcG9ydCBIZWFkZXIgZnJvbSAnY29tcG9uZW50cy9IZWFkZXInXHJcblxyXG5jb25zdCBSb290Q29udGFpbmVyID0gKCkgPT4ge1xyXG4gIHJldHVybiAoXHJcbiAgICA8PlxyXG4gICAgICA8SGVhZGVyIC8+PCBici8+XHJcbiAgICAgIDw+QXBwIDM8Lz5cclxuICAgIDwvPlxyXG4gIClcclxufVxyXG5leHBvcnQgZGVmYXVsdCBSb290Q29udGFpbmVyXHJcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIG0gPSByZXF1aXJlKCdyZWFjdC1kb20nKTtcbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIGV4cG9ydHMuY3JlYXRlUm9vdCA9IG0uY3JlYXRlUm9vdDtcbiAgZXhwb3J0cy5oeWRyYXRlUm9vdCA9IG0uaHlkcmF0ZVJvb3Q7XG59IGVsc2Uge1xuICB2YXIgaSA9IG0uX19TRUNSRVRfSU5URVJOQUxTX0RPX05PVF9VU0VfT1JfWU9VX1dJTExfQkVfRklSRUQ7XG4gIGV4cG9ydHMuY3JlYXRlUm9vdCA9IGZ1bmN0aW9uKGMsIG8pIHtcbiAgICBpLnVzaW5nQ2xpZW50RW50cnlQb2ludCA9IHRydWU7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBtLmNyZWF0ZVJvb3QoYywgbyk7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIGkudXNpbmdDbGllbnRFbnRyeVBvaW50ID0gZmFsc2U7XG4gICAgfVxuICB9O1xuICBleHBvcnRzLmh5ZHJhdGVSb290ID0gZnVuY3Rpb24oYywgaCwgbykge1xuICAgIGkudXNpbmdDbGllbnRFbnRyeVBvaW50ID0gdHJ1ZTtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIG0uaHlkcmF0ZVJvb3QoYywgaCwgbyk7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIGkudXNpbmdDbGllbnRFbnRyeVBvaW50ID0gZmFsc2U7XG4gICAgfVxuICB9O1xufVxuIl0sIm5hbWVzIjpbIlJlYWN0IiwiY3JlYXRlUm9vdCIsIlJvb3RDb250YWluZXIiLCJyb290Q29udGFpbmVyIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsInJvb3QiLCJyZW5kZXIiLCJ1c2VBdXRoZW50aWNhdGlvbiIsIkhlYWRlciIsImdldFNlc3Npb25Ub2tlbiIsInRva2VuIl0sInNvdXJjZVJvb3QiOiIifQ==