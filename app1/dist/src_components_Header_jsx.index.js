(self["webpackChunkworkflow_task_manager_ui"] = self["webpackChunkworkflow_task_manager_ui"] || []).push([["src_components_Header_jsx"],{

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
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, "Header 2 from app1 ", token ? token : 'No session');
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

  reactHotLoader.register(Header, "Header", "/Users/handerson/Documents/workspaces/personal/module-federation-demo/app1/src/components/Header.jsx");
  reactHotLoader.register(_default, "default", "/Users/handerson/Documents/workspaces/personal/module-federation-demo/app1/src/components/Header.jsx");
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

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3JjX2NvbXBvbmVudHNfSGVhZGVyX2pzeC5pbmRleC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBO0FBQ0EsY0FBYyxtQkFBTyxDQUFDLHNFQUF1Qjs7QUFFN0M7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQixhQUFhLEdBQUc7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLG9CQUFvQixtQkFBbUI7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLEdBQUc7QUFDZCxhQUFhLFVBQVU7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGFBQWEsa0NBQWtDO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGFBQWEsa0JBQWtCO0FBQy9CLGVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLEdBQUc7QUFDZCxhQUFhLFNBQVM7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxHQUFHO0FBQ2QsV0FBVyxRQUFRO0FBQ25CLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsR0FBRztBQUNkLFdBQVcsR0FBRztBQUNkLGFBQWEsU0FBUztBQUN0QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsa0JBQWtCLDBCQUEwQjtBQUM1QztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixHQUFHO0FBQ3RCLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsT0FBTztBQUMxQixxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFVBQVUsbUJBQW1CO0FBQzdCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzlRRDtBQUNBOztBQUVBLElBQU1FLE1BQU0sR0FBRyxTQUFUQSxNQUFTLEdBQU07RUFDakIseUJBQTRCRCw2REFBaUIsRUFBN0M7RUFBQSxJQUFRRSxlQUFSLHNCQUFRQSxlQUFSOztFQUNBLElBQU1DLEtBQUssR0FBR0QsZUFBZSxFQUE3QjtFQUNBLG9CQUFPLGlKQUFzQkMsS0FBSyxHQUFHQSxLQUFILEdBQVcsWUFBdEMsQ0FBUDtBQUNILENBSkQ7O2NBQU1GO1VBQzBCRDs7O2VBS2pCQztBQUFmLGlFQUFlOzs7Ozs7Ozs7OzBCQU5UQSIsInNvdXJjZXMiOlsid2VicGFjazovL3dvcmtmbG93LXRhc2stbWFuYWdlci11aS8uL25vZGVfbW9kdWxlcy9AcG1tbXdoL3JlYWN0LXJlZnJlc2gtd2VicGFjay1wbHVnaW4vbGliL3J1bnRpbWUvUmVmcmVzaFV0aWxzLmpzIiwid2VicGFjazovL3dvcmtmbG93LXRhc2stbWFuYWdlci11aS8uL3NyYy9jb21wb25lbnRzL0hlYWRlci5qc3giXSwic291cmNlc0NvbnRlbnQiOlsiLyogZ2xvYmFsIF9fd2VicGFja19yZXF1aXJlX18gKi9cbnZhciBSZWZyZXNoID0gcmVxdWlyZSgncmVhY3QtcmVmcmVzaC9ydW50aW1lJyk7XG5cbi8qKlxuICogRXh0cmFjdHMgZXhwb3J0cyBmcm9tIGEgd2VicGFjayBtb2R1bGUgb2JqZWN0LlxuICogQHBhcmFtIHtzdHJpbmd9IG1vZHVsZUlkIEEgV2VicGFjayBtb2R1bGUgSUQuXG4gKiBAcmV0dXJucyB7Kn0gQW4gZXhwb3J0cyBvYmplY3QgZnJvbSB0aGUgbW9kdWxlLlxuICovXG5mdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKG1vZHVsZUlkKSB7XG4gIGlmICh0eXBlb2YgbW9kdWxlSWQgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgLy8gYG1vZHVsZUlkYCBpcyB1bmF2YWlsYWJsZSwgd2hpY2ggaW5kaWNhdGVzIHRoYXQgdGhpcyBtb2R1bGUgaXMgbm90IGluIHRoZSBjYWNoZSxcbiAgICAvLyB3aGljaCBtZWFucyB3ZSB3b24ndCBiZSBhYmxlIHRvIGNhcHR1cmUgYW55IGV4cG9ydHMsXG4gICAgLy8gYW5kIHRodXMgdGhleSBjYW5ub3QgYmUgcmVmcmVzaGVkIHNhZmVseS5cbiAgICAvLyBUaGVzZSBhcmUgbGlrZWx5IHJ1bnRpbWUgb3IgZHluYW1pY2FsbHkgZ2VuZXJhdGVkIG1vZHVsZXMuXG4gICAgcmV0dXJuIHt9O1xuICB9XG5cbiAgdmFyIG1heWJlTW9kdWxlID0gX193ZWJwYWNrX3JlcXVpcmVfXy5jW21vZHVsZUlkXTtcbiAgaWYgKHR5cGVvZiBtYXliZU1vZHVsZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAvLyBgbW9kdWxlSWRgIGlzIGF2YWlsYWJsZSBidXQgdGhlIG1vZHVsZSBpbiBjYWNoZSBpcyB1bmF2YWlsYWJsZSxcbiAgICAvLyB3aGljaCBpbmRpY2F0ZXMgdGhlIG1vZHVsZSBpcyBzb21laG93IGNvcnJ1cHRlZCAoZS5nLiBicm9rZW4gV2VicGFjYWsgYG1vZHVsZWAgZ2xvYmFscykuXG4gICAgLy8gV2Ugd2lsbCB3YXJuIHRoZSB1c2VyIChhcyB0aGlzIGlzIGxpa2VseSBhIG1pc3Rha2UpIGFuZCBhc3N1bWUgdGhleSBjYW5ub3QgYmUgcmVmcmVzaGVkLlxuICAgIGNvbnNvbGUud2FybignW1JlYWN0IFJlZnJlc2hdIEZhaWxlZCB0byBnZXQgZXhwb3J0cyBmb3IgbW9kdWxlOiAnICsgbW9kdWxlSWQgKyAnLicpO1xuICAgIHJldHVybiB7fTtcbiAgfVxuXG4gIHZhciBleHBvcnRzT3JQcm9taXNlID0gbWF5YmVNb2R1bGUuZXhwb3J0cztcbiAgaWYgKHR5cGVvZiBQcm9taXNlICE9PSAndW5kZWZpbmVkJyAmJiBleHBvcnRzT3JQcm9taXNlIGluc3RhbmNlb2YgUHJvbWlzZSkge1xuICAgIHJldHVybiBleHBvcnRzT3JQcm9taXNlLnRoZW4oZnVuY3Rpb24gKGV4cG9ydHMpIHtcbiAgICAgIHJldHVybiBleHBvcnRzO1xuICAgIH0pO1xuICB9XG4gIHJldHVybiBleHBvcnRzT3JQcm9taXNlO1xufVxuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIHNpZ25hdHVyZSBvZiBhIFJlYWN0IHJlZnJlc2ggYm91bmRhcnkuXG4gKiBJZiB0aGlzIHNpZ25hdHVyZSBjaGFuZ2VzLCBpdCdzIHVuc2FmZSB0byBhY2NlcHQgdGhlIGJvdW5kYXJ5LlxuICpcbiAqIFRoaXMgaW1wbGVtZW50YXRpb24gaXMgYmFzZWQgb24gdGhlIG9uZSBpbiBbTWV0cm9dKGh0dHBzOi8vZ2l0aHViLmNvbS9mYWNlYm9vay9tZXRyby9ibG9iLzkwN2Q2YWYyMmFjNmViZTU4NTcyYmU0MThlOTI1M2E5MDY2NWVjYmQvcGFja2FnZXMvbWV0cm8vc3JjL2xpYi9wb2x5ZmlsbHMvcmVxdWlyZS5qcyNMNzk1LUw4MTYpLlxuICogQHBhcmFtIHsqfSBtb2R1bGVFeHBvcnRzIEEgV2VicGFjayBtb2R1bGUgZXhwb3J0cyBvYmplY3QuXG4gKiBAcmV0dXJucyB7c3RyaW5nW119IEEgUmVhY3QgcmVmcmVzaCBib3VuZGFyeSBzaWduYXR1cmUgYXJyYXkuXG4gKi9cbmZ1bmN0aW9uIGdldFJlYWN0UmVmcmVzaEJvdW5kYXJ5U2lnbmF0dXJlKG1vZHVsZUV4cG9ydHMpIHtcbiAgdmFyIHNpZ25hdHVyZSA9IFtdO1xuICBzaWduYXR1cmUucHVzaChSZWZyZXNoLmdldEZhbWlseUJ5VHlwZShtb2R1bGVFeHBvcnRzKSk7XG5cbiAgaWYgKG1vZHVsZUV4cG9ydHMgPT0gbnVsbCB8fCB0eXBlb2YgbW9kdWxlRXhwb3J0cyAhPT0gJ29iamVjdCcpIHtcbiAgICAvLyBFeGl0IGlmIHdlIGNhbid0IGl0ZXJhdGUgb3ZlciBleHBvcnRzLlxuICAgIHJldHVybiBzaWduYXR1cmU7XG4gIH1cblxuICBmb3IgKHZhciBrZXkgaW4gbW9kdWxlRXhwb3J0cykge1xuICAgIGlmIChrZXkgPT09ICdfX2VzTW9kdWxlJykge1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgc2lnbmF0dXJlLnB1c2goa2V5KTtcbiAgICBzaWduYXR1cmUucHVzaChSZWZyZXNoLmdldEZhbWlseUJ5VHlwZShtb2R1bGVFeHBvcnRzW2tleV0pKTtcbiAgfVxuXG4gIHJldHVybiBzaWduYXR1cmU7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIGhlbHBlciB0aGF0IHBlcmZvcm1zIGEgZGVsYXllZCBSZWFjdCByZWZyZXNoLlxuICogQHJldHVybnMge2Z1bmN0aW9uKGZ1bmN0aW9uKCk6IHZvaWQpOiB2b2lkfSBBIGRlYm91bmNlZCBSZWFjdCByZWZyZXNoIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBjcmVhdGVEZWJvdW5jZVVwZGF0ZSgpIHtcbiAgLyoqXG4gICAqIEEgY2FjaGVkIHNldFRpbWVvdXQgaGFuZGxlci5cbiAgICogQHR5cGUge251bWJlciB8IHVuZGVmaW5lZH1cbiAgICovXG4gIHZhciByZWZyZXNoVGltZW91dDtcblxuICAvKipcbiAgICogUGVyZm9ybXMgcmVhY3QgcmVmcmVzaCBvbiBhIGRlbGF5IGFuZCBjbGVhcnMgdGhlIGVycm9yIG92ZXJsYXkuXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb24oKTogdm9pZH0gY2FsbGJhY2tcbiAgICogQHJldHVybnMge3ZvaWR9XG4gICAqL1xuICBmdW5jdGlvbiBlbnF1ZXVlVXBkYXRlKGNhbGxiYWNrKSB7XG4gICAgaWYgKHR5cGVvZiByZWZyZXNoVGltZW91dCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHJlZnJlc2hUaW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJlZnJlc2hUaW1lb3V0ID0gdW5kZWZpbmVkO1xuICAgICAgICBSZWZyZXNoLnBlcmZvcm1SZWFjdFJlZnJlc2goKTtcbiAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgIH0sIDMwKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZW5xdWV1ZVVwZGF0ZTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYWxsIGV4cG9ydHMgYXJlIGxpa2VseSBhIFJlYWN0IGNvbXBvbmVudC5cbiAqXG4gKiBUaGlzIGltcGxlbWVudGF0aW9uIGlzIGJhc2VkIG9uIHRoZSBvbmUgaW4gW01ldHJvXShodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svbWV0cm8vYmxvYi9mZWJkYmEyMzgzMTEzYzg4Mjk2YzYxZTI4ZTRlZjZhN2Y0OTM5ZmRhL3BhY2thZ2VzL21ldHJvL3NyYy9saWIvcG9seWZpbGxzL3JlcXVpcmUuanMjTDc0OC1MNzc0KS5cbiAqIEBwYXJhbSB7Kn0gbW9kdWxlRXhwb3J0cyBBIFdlYnBhY2sgbW9kdWxlIGV4cG9ydHMgb2JqZWN0LlxuICogQHJldHVybnMge2Jvb2xlYW59IFdoZXRoZXIgdGhlIGV4cG9ydHMgYXJlIFJlYWN0IGNvbXBvbmVudCBsaWtlLlxuICovXG5mdW5jdGlvbiBpc1JlYWN0UmVmcmVzaEJvdW5kYXJ5KG1vZHVsZUV4cG9ydHMpIHtcbiAgaWYgKFJlZnJlc2guaXNMaWtlbHlDb21wb25lbnRUeXBlKG1vZHVsZUV4cG9ydHMpKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgaWYgKG1vZHVsZUV4cG9ydHMgPT09IHVuZGVmaW5lZCB8fCBtb2R1bGVFeHBvcnRzID09PSBudWxsIHx8IHR5cGVvZiBtb2R1bGVFeHBvcnRzICE9PSAnb2JqZWN0Jykge1xuICAgIC8vIEV4aXQgaWYgd2UgY2FuJ3QgaXRlcmF0ZSBvdmVyIGV4cG9ydHMuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgdmFyIGhhc0V4cG9ydHMgPSBmYWxzZTtcbiAgdmFyIGFyZUFsbEV4cG9ydHNDb21wb25lbnRzID0gdHJ1ZTtcbiAgZm9yICh2YXIga2V5IGluIG1vZHVsZUV4cG9ydHMpIHtcbiAgICBoYXNFeHBvcnRzID0gdHJ1ZTtcblxuICAgIC8vIFRoaXMgaXMgdGhlIEVTIE1vZHVsZSBpbmRpY2F0b3IgZmxhZ1xuICAgIGlmIChrZXkgPT09ICdfX2VzTW9kdWxlJykge1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgLy8gV2UgY2FuIChhbmQgaGF2ZSB0bykgc2FmZWx5IGV4ZWN1dGUgZ2V0dGVycyBoZXJlLFxuICAgIC8vIGFzIFdlYnBhY2sgbWFudWFsbHkgYXNzaWducyBoYXJtb255IGV4cG9ydHMgdG8gZ2V0dGVycyxcbiAgICAvLyB3aXRob3V0IGFueSBzaWRlLWVmZmVjdHMgYXR0YWNoZWQuXG4gICAgLy8gUmVmOiBodHRwczovL2dpdGh1Yi5jb20vd2VicGFjay93ZWJwYWNrL2Jsb2IvYjkzMDQ4NjQzZmU3NGRlMmE2OTMxNzU1OTExZGExMjEyZGY1NTg5Ny9saWIvTWFpblRlbXBsYXRlLmpzI0wyODFcbiAgICB2YXIgZXhwb3J0VmFsdWUgPSBtb2R1bGVFeHBvcnRzW2tleV07XG4gICAgaWYgKCFSZWZyZXNoLmlzTGlrZWx5Q29tcG9uZW50VHlwZShleHBvcnRWYWx1ZSkpIHtcbiAgICAgIGFyZUFsbEV4cG9ydHNDb21wb25lbnRzID0gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGhhc0V4cG9ydHMgJiYgYXJlQWxsRXhwb3J0c0NvbXBvbmVudHM7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGV4cG9ydHMgYXJlIGxpa2VseSBhIFJlYWN0IGNvbXBvbmVudCBhbmQgcmVnaXN0ZXJzIHRoZW0uXG4gKlxuICogVGhpcyBpbXBsZW1lbnRhdGlvbiBpcyBiYXNlZCBvbiB0aGUgb25lIGluIFtNZXRyb10oaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL21ldHJvL2Jsb2IvZmViZGJhMjM4MzExM2M4ODI5NmM2MWUyOGU0ZWY2YTdmNDkzOWZkYS9wYWNrYWdlcy9tZXRyby9zcmMvbGliL3BvbHlmaWxscy9yZXF1aXJlLmpzI0w4MTgtTDgzNSkuXG4gKiBAcGFyYW0geyp9IG1vZHVsZUV4cG9ydHMgQSBXZWJwYWNrIG1vZHVsZSBleHBvcnRzIG9iamVjdC5cbiAqIEBwYXJhbSB7c3RyaW5nfSBtb2R1bGVJZCBBIFdlYnBhY2sgbW9kdWxlIElELlxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbmZ1bmN0aW9uIHJlZ2lzdGVyRXhwb3J0c0ZvclJlYWN0UmVmcmVzaChtb2R1bGVFeHBvcnRzLCBtb2R1bGVJZCkge1xuICBpZiAoUmVmcmVzaC5pc0xpa2VseUNvbXBvbmVudFR5cGUobW9kdWxlRXhwb3J0cykpIHtcbiAgICAvLyBSZWdpc3RlciBtb2R1bGUuZXhwb3J0cyBpZiBpdCBpcyBsaWtlbHkgYSBjb21wb25lbnRcbiAgICBSZWZyZXNoLnJlZ2lzdGVyKG1vZHVsZUV4cG9ydHMsIG1vZHVsZUlkICsgJyAlZXhwb3J0cyUnKTtcbiAgfVxuXG4gIGlmIChtb2R1bGVFeHBvcnRzID09PSB1bmRlZmluZWQgfHwgbW9kdWxlRXhwb3J0cyA9PT0gbnVsbCB8fCB0eXBlb2YgbW9kdWxlRXhwb3J0cyAhPT0gJ29iamVjdCcpIHtcbiAgICAvLyBFeGl0IGlmIHdlIGNhbid0IGl0ZXJhdGUgb3ZlciB0aGUgZXhwb3J0cy5cbiAgICByZXR1cm47XG4gIH1cblxuICBmb3IgKHZhciBrZXkgaW4gbW9kdWxlRXhwb3J0cykge1xuICAgIC8vIFNraXAgcmVnaXN0ZXJpbmcgdGhlIEVTIE1vZHVsZSBpbmRpY2F0b3JcbiAgICBpZiAoa2V5ID09PSAnX19lc01vZHVsZScpIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIHZhciBleHBvcnRWYWx1ZSA9IG1vZHVsZUV4cG9ydHNba2V5XTtcbiAgICBpZiAoUmVmcmVzaC5pc0xpa2VseUNvbXBvbmVudFR5cGUoZXhwb3J0VmFsdWUpKSB7XG4gICAgICB2YXIgdHlwZUlEID0gbW9kdWxlSWQgKyAnICVleHBvcnRzJSAnICsga2V5O1xuICAgICAgUmVmcmVzaC5yZWdpc3RlcihleHBvcnRWYWx1ZSwgdHlwZUlEKTtcbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBDb21wYXJlcyBwcmV2aW91cyBhbmQgbmV4dCBtb2R1bGUgb2JqZWN0cyB0byBjaGVjayBmb3IgbXV0YXRlZCBib3VuZGFyaWVzLlxuICpcbiAqIFRoaXMgaW1wbGVtZW50YXRpb24gaXMgYmFzZWQgb24gdGhlIG9uZSBpbiBbTWV0cm9dKGh0dHBzOi8vZ2l0aHViLmNvbS9mYWNlYm9vay9tZXRyby9ibG9iLzkwN2Q2YWYyMmFjNmViZTU4NTcyYmU0MThlOTI1M2E5MDY2NWVjYmQvcGFja2FnZXMvbWV0cm8vc3JjL2xpYi9wb2x5ZmlsbHMvcmVxdWlyZS5qcyNMNzc2LUw3OTIpLlxuICogQHBhcmFtIHsqfSBwcmV2RXhwb3J0cyBUaGUgY3VycmVudCBXZWJwYWNrIG1vZHVsZSBleHBvcnRzIG9iamVjdC5cbiAqIEBwYXJhbSB7Kn0gbmV4dEV4cG9ydHMgVGhlIG5leHQgV2VicGFjayBtb2R1bGUgZXhwb3J0cyBvYmplY3QuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gV2hldGhlciB0aGUgUmVhY3QgcmVmcmVzaCBib3VuZGFyeSBzaG91bGQgYmUgaW52YWxpZGF0ZWQuXG4gKi9cbmZ1bmN0aW9uIHNob3VsZEludmFsaWRhdGVSZWFjdFJlZnJlc2hCb3VuZGFyeShwcmV2RXhwb3J0cywgbmV4dEV4cG9ydHMpIHtcbiAgdmFyIHByZXZTaWduYXR1cmUgPSBnZXRSZWFjdFJlZnJlc2hCb3VuZGFyeVNpZ25hdHVyZShwcmV2RXhwb3J0cyk7XG4gIHZhciBuZXh0U2lnbmF0dXJlID0gZ2V0UmVhY3RSZWZyZXNoQm91bmRhcnlTaWduYXR1cmUobmV4dEV4cG9ydHMpO1xuXG4gIGlmIChwcmV2U2lnbmF0dXJlLmxlbmd0aCAhPT0gbmV4dFNpZ25hdHVyZS5sZW5ndGgpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbmV4dFNpZ25hdHVyZS5sZW5ndGg7IGkgKz0gMSkge1xuICAgIGlmIChwcmV2U2lnbmF0dXJlW2ldICE9PSBuZXh0U2lnbmF0dXJlW2ldKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZmFsc2U7XG59XG5cbnZhciBlbnF1ZXVlVXBkYXRlID0gY3JlYXRlRGVib3VuY2VVcGRhdGUoKTtcbmZ1bmN0aW9uIGV4ZWN1dGVSdW50aW1lKG1vZHVsZUV4cG9ydHMsIG1vZHVsZUlkLCB3ZWJwYWNrSG90LCByZWZyZXNoT3ZlcmxheSwgaXNUZXN0KSB7XG4gIHJlZ2lzdGVyRXhwb3J0c0ZvclJlYWN0UmVmcmVzaChtb2R1bGVFeHBvcnRzLCBtb2R1bGVJZCk7XG5cbiAgaWYgKHdlYnBhY2tIb3QpIHtcbiAgICB2YXIgaXNIb3RVcGRhdGUgPSAhIXdlYnBhY2tIb3QuZGF0YTtcbiAgICB2YXIgcHJldkV4cG9ydHM7XG4gICAgaWYgKGlzSG90VXBkYXRlKSB7XG4gICAgICBwcmV2RXhwb3J0cyA9IHdlYnBhY2tIb3QuZGF0YS5wcmV2RXhwb3J0cztcbiAgICB9XG5cbiAgICBpZiAoaXNSZWFjdFJlZnJlc2hCb3VuZGFyeShtb2R1bGVFeHBvcnRzKSkge1xuICAgICAgd2VicGFja0hvdC5kaXNwb3NlKFxuICAgICAgICAvKipcbiAgICAgICAgICogQSBjYWxsYmFjayB0byBwZXJmb3JtcyBhIGZ1bGwgcmVmcmVzaCBpZiBSZWFjdCBoYXMgdW5yZWNvdmVyYWJsZSBlcnJvcnMsXG4gICAgICAgICAqIGFuZCBhbHNvIGNhY2hlcyB0aGUgdG8tYmUtZGlzcG9zZWQgbW9kdWxlLlxuICAgICAgICAgKiBAcGFyYW0geyp9IGRhdGEgQSBob3QgbW9kdWxlIGRhdGEgb2JqZWN0IGZyb20gV2VicGFjayBITVIuXG4gICAgICAgICAqIEByZXR1cm5zIHt2b2lkfVxuICAgICAgICAgKi9cbiAgICAgICAgZnVuY3Rpb24gaG90RGlzcG9zZUNhbGxiYWNrKGRhdGEpIHtcbiAgICAgICAgICAvLyBXZSBoYXZlIHRvIG11dGF0ZSB0aGUgZGF0YSBvYmplY3QgdG8gZ2V0IGRhdGEgcmVnaXN0ZXJlZCBhbmQgY2FjaGVkXG4gICAgICAgICAgZGF0YS5wcmV2RXhwb3J0cyA9IG1vZHVsZUV4cG9ydHM7XG4gICAgICAgIH1cbiAgICAgICk7XG4gICAgICB3ZWJwYWNrSG90LmFjY2VwdChcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEFuIGVycm9yIGhhbmRsZXIgdG8gYWxsb3cgc2VsZi1yZWNvdmVyaW5nIGJlaGF2aW91cnMuXG4gICAgICAgICAqIEBwYXJhbSB7RXJyb3J9IGVycm9yIEFuIGVycm9yIG9jY3VycmVkIGR1cmluZyBldmFsdWF0aW9uIG9mIGEgbW9kdWxlLlxuICAgICAgICAgKiBAcmV0dXJucyB7dm9pZH1cbiAgICAgICAgICovXG4gICAgICAgIGZ1bmN0aW9uIGhvdEVycm9ySGFuZGxlcihlcnJvcikge1xuICAgICAgICAgIGlmICh0eXBlb2YgcmVmcmVzaE92ZXJsYXkgIT09ICd1bmRlZmluZWQnICYmIHJlZnJlc2hPdmVybGF5KSB7XG4gICAgICAgICAgICByZWZyZXNoT3ZlcmxheS5oYW5kbGVSdW50aW1lRXJyb3IoZXJyb3IpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICh0eXBlb2YgaXNUZXN0ICE9PSAndW5kZWZpbmVkJyAmJiBpc1Rlc3QpIHtcbiAgICAgICAgICAgIGlmICh3aW5kb3cub25Ib3RBY2NlcHRFcnJvcikge1xuICAgICAgICAgICAgICB3aW5kb3cub25Ib3RBY2NlcHRFcnJvcihlcnJvci5tZXNzYWdlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBfX3dlYnBhY2tfcmVxdWlyZV9fLmNbbW9kdWxlSWRdLmhvdC5hY2NlcHQoaG90RXJyb3JIYW5kbGVyKTtcbiAgICAgICAgfVxuICAgICAgKTtcblxuICAgICAgaWYgKGlzSG90VXBkYXRlKSB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICBpc1JlYWN0UmVmcmVzaEJvdW5kYXJ5KHByZXZFeHBvcnRzKSAmJlxuICAgICAgICAgIHNob3VsZEludmFsaWRhdGVSZWFjdFJlZnJlc2hCb3VuZGFyeShwcmV2RXhwb3J0cywgbW9kdWxlRXhwb3J0cylcbiAgICAgICAgKSB7XG4gICAgICAgICAgd2VicGFja0hvdC5pbnZhbGlkYXRlKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZW5xdWV1ZVVwZGF0ZShcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogQSBmdW5jdGlvbiB0byBkaXNtaXNzIHRoZSBlcnJvciBvdmVybGF5IGFmdGVyIHBlcmZvcm1pbmcgUmVhY3QgcmVmcmVzaC5cbiAgICAgICAgICAgICAqIEByZXR1cm5zIHt2b2lkfVxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBmdW5jdGlvbiB1cGRhdGVDYWxsYmFjaygpIHtcbiAgICAgICAgICAgICAgaWYgKHR5cGVvZiByZWZyZXNoT3ZlcmxheSAhPT0gJ3VuZGVmaW5lZCcgJiYgcmVmcmVzaE92ZXJsYXkpIHtcbiAgICAgICAgICAgICAgICByZWZyZXNoT3ZlcmxheS5jbGVhclJ1bnRpbWVFcnJvcnMoKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGlzSG90VXBkYXRlICYmIHR5cGVvZiBwcmV2RXhwb3J0cyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgd2VicGFja0hvdC5pbnZhbGlkYXRlKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmZyZWV6ZSh7XG4gIGVucXVldWVVcGRhdGU6IGVucXVldWVVcGRhdGUsXG4gIGV4ZWN1dGVSdW50aW1lOiBleGVjdXRlUnVudGltZSxcbiAgZ2V0TW9kdWxlRXhwb3J0czogZ2V0TW9kdWxlRXhwb3J0cyxcbiAgaXNSZWFjdFJlZnJlc2hCb3VuZGFyeTogaXNSZWFjdFJlZnJlc2hCb3VuZGFyeSxcbiAgc2hvdWxkSW52YWxpZGF0ZVJlYWN0UmVmcmVzaEJvdW5kYXJ5OiBzaG91bGRJbnZhbGlkYXRlUmVhY3RSZWZyZXNoQm91bmRhcnksXG4gIHJlZ2lzdGVyRXhwb3J0c0ZvclJlYWN0UmVmcmVzaDogcmVnaXN0ZXJFeHBvcnRzRm9yUmVhY3RSZWZyZXNoLFxufSk7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQgdXNlQXV0aGVudGljYXRpb24gZnJvbSAnaG9zdC91c2VBdXRoZW50aWNhdGlvbidcblxuY29uc3QgSGVhZGVyID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgZ2V0U2Vzc2lvblRva2VuIH0gPSB1c2VBdXRoZW50aWNhdGlvbigpXG4gICAgY29uc3QgdG9rZW4gPSBnZXRTZXNzaW9uVG9rZW4oKVxuICAgIHJldHVybiA8PkhlYWRlciAyIGZyb20gYXBwMSB7dG9rZW4gPyB0b2tlbiA6ICdObyBzZXNzaW9uJ308Lz5cbn1cblxuZXhwb3J0IGRlZmF1bHQgSGVhZGVyIl0sIm5hbWVzIjpbIlJlYWN0IiwidXNlQXV0aGVudGljYXRpb24iLCJIZWFkZXIiLCJnZXRTZXNzaW9uVG9rZW4iLCJ0b2tlbiJdLCJzb3VyY2VSb290IjoiIn0=