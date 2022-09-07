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

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LEdBQUdBLEtBQUgsR0FBVyxZQUExQixDQUFQO0FBQ0gsQ0FKRDs7Y0FBTUY7VUFDMEJEOzs7ZUFLakJDO0FBQWYsaUVBQWU7Ozs7Ozs7Ozs7MEJBTlRBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd29ya2Zsb3ctdGFzay1tYW5hZ2VyLXVpLy4vbm9kZV9tb2R1bGVzL0BwbW1td2gvcmVhY3QtcmVmcmVzaC13ZWJwYWNrLXBsdWdpbi9saWIvcnVudGltZS9SZWZyZXNoVXRpbHMuanMiLCJ3ZWJwYWNrOi8vd29ya2Zsb3ctdGFzay1tYW5hZ2VyLXVpLy4vc3JjL2NvbXBvbmVudHMvSGVhZGVyLmpzeCJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiBnbG9iYWwgX193ZWJwYWNrX3JlcXVpcmVfXyAqL1xudmFyIFJlZnJlc2ggPSByZXF1aXJlKCdyZWFjdC1yZWZyZXNoL3J1bnRpbWUnKTtcblxuLyoqXG4gKiBFeHRyYWN0cyBleHBvcnRzIGZyb20gYSB3ZWJwYWNrIG1vZHVsZSBvYmplY3QuXG4gKiBAcGFyYW0ge3N0cmluZ30gbW9kdWxlSWQgQSBXZWJwYWNrIG1vZHVsZSBJRC5cbiAqIEByZXR1cm5zIHsqfSBBbiBleHBvcnRzIG9iamVjdCBmcm9tIHRoZSBtb2R1bGUuXG4gKi9cbmZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMobW9kdWxlSWQpIHtcbiAgaWYgKHR5cGVvZiBtb2R1bGVJZCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAvLyBgbW9kdWxlSWRgIGlzIHVuYXZhaWxhYmxlLCB3aGljaCBpbmRpY2F0ZXMgdGhhdCB0aGlzIG1vZHVsZSBpcyBub3QgaW4gdGhlIGNhY2hlLFxuICAgIC8vIHdoaWNoIG1lYW5zIHdlIHdvbid0IGJlIGFibGUgdG8gY2FwdHVyZSBhbnkgZXhwb3J0cyxcbiAgICAvLyBhbmQgdGh1cyB0aGV5IGNhbm5vdCBiZSByZWZyZXNoZWQgc2FmZWx5LlxuICAgIC8vIFRoZXNlIGFyZSBsaWtlbHkgcnVudGltZSBvciBkeW5hbWljYWxseSBnZW5lcmF0ZWQgbW9kdWxlcy5cbiAgICByZXR1cm4ge307XG4gIH1cblxuICB2YXIgbWF5YmVNb2R1bGUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmNbbW9kdWxlSWRdO1xuICBpZiAodHlwZW9mIG1heWJlTW9kdWxlID09PSAndW5kZWZpbmVkJykge1xuICAgIC8vIGBtb2R1bGVJZGAgaXMgYXZhaWxhYmxlIGJ1dCB0aGUgbW9kdWxlIGluIGNhY2hlIGlzIHVuYXZhaWxhYmxlLFxuICAgIC8vIHdoaWNoIGluZGljYXRlcyB0aGUgbW9kdWxlIGlzIHNvbWVob3cgY29ycnVwdGVkIChlLmcuIGJyb2tlbiBXZWJwYWNhayBgbW9kdWxlYCBnbG9iYWxzKS5cbiAgICAvLyBXZSB3aWxsIHdhcm4gdGhlIHVzZXIgKGFzIHRoaXMgaXMgbGlrZWx5IGEgbWlzdGFrZSkgYW5kIGFzc3VtZSB0aGV5IGNhbm5vdCBiZSByZWZyZXNoZWQuXG4gICAgY29uc29sZS53YXJuKCdbUmVhY3QgUmVmcmVzaF0gRmFpbGVkIHRvIGdldCBleHBvcnRzIGZvciBtb2R1bGU6ICcgKyBtb2R1bGVJZCArICcuJyk7XG4gICAgcmV0dXJuIHt9O1xuICB9XG5cbiAgdmFyIGV4cG9ydHNPclByb21pc2UgPSBtYXliZU1vZHVsZS5leHBvcnRzO1xuICBpZiAodHlwZW9mIFByb21pc2UgIT09ICd1bmRlZmluZWQnICYmIGV4cG9ydHNPclByb21pc2UgaW5zdGFuY2VvZiBQcm9taXNlKSB7XG4gICAgcmV0dXJuIGV4cG9ydHNPclByb21pc2UudGhlbihmdW5jdGlvbiAoZXhwb3J0cykge1xuICAgICAgcmV0dXJuIGV4cG9ydHM7XG4gICAgfSk7XG4gIH1cbiAgcmV0dXJuIGV4cG9ydHNPclByb21pc2U7XG59XG5cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgc2lnbmF0dXJlIG9mIGEgUmVhY3QgcmVmcmVzaCBib3VuZGFyeS5cbiAqIElmIHRoaXMgc2lnbmF0dXJlIGNoYW5nZXMsIGl0J3MgdW5zYWZlIHRvIGFjY2VwdCB0aGUgYm91bmRhcnkuXG4gKlxuICogVGhpcyBpbXBsZW1lbnRhdGlvbiBpcyBiYXNlZCBvbiB0aGUgb25lIGluIFtNZXRyb10oaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL21ldHJvL2Jsb2IvOTA3ZDZhZjIyYWM2ZWJlNTg1NzJiZTQxOGU5MjUzYTkwNjY1ZWNiZC9wYWNrYWdlcy9tZXRyby9zcmMvbGliL3BvbHlmaWxscy9yZXF1aXJlLmpzI0w3OTUtTDgxNikuXG4gKiBAcGFyYW0geyp9IG1vZHVsZUV4cG9ydHMgQSBXZWJwYWNrIG1vZHVsZSBleHBvcnRzIG9iamVjdC5cbiAqIEByZXR1cm5zIHtzdHJpbmdbXX0gQSBSZWFjdCByZWZyZXNoIGJvdW5kYXJ5IHNpZ25hdHVyZSBhcnJheS5cbiAqL1xuZnVuY3Rpb24gZ2V0UmVhY3RSZWZyZXNoQm91bmRhcnlTaWduYXR1cmUobW9kdWxlRXhwb3J0cykge1xuICB2YXIgc2lnbmF0dXJlID0gW107XG4gIHNpZ25hdHVyZS5wdXNoKFJlZnJlc2guZ2V0RmFtaWx5QnlUeXBlKG1vZHVsZUV4cG9ydHMpKTtcblxuICBpZiAobW9kdWxlRXhwb3J0cyA9PSBudWxsIHx8IHR5cGVvZiBtb2R1bGVFeHBvcnRzICE9PSAnb2JqZWN0Jykge1xuICAgIC8vIEV4aXQgaWYgd2UgY2FuJ3QgaXRlcmF0ZSBvdmVyIGV4cG9ydHMuXG4gICAgcmV0dXJuIHNpZ25hdHVyZTtcbiAgfVxuXG4gIGZvciAodmFyIGtleSBpbiBtb2R1bGVFeHBvcnRzKSB7XG4gICAgaWYgKGtleSA9PT0gJ19fZXNNb2R1bGUnKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICBzaWduYXR1cmUucHVzaChrZXkpO1xuICAgIHNpZ25hdHVyZS5wdXNoKFJlZnJlc2guZ2V0RmFtaWx5QnlUeXBlKG1vZHVsZUV4cG9ydHNba2V5XSkpO1xuICB9XG5cbiAgcmV0dXJuIHNpZ25hdHVyZTtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgaGVscGVyIHRoYXQgcGVyZm9ybXMgYSBkZWxheWVkIFJlYWN0IHJlZnJlc2guXG4gKiBAcmV0dXJucyB7ZnVuY3Rpb24oZnVuY3Rpb24oKTogdm9pZCk6IHZvaWR9IEEgZGVib3VuY2VkIFJlYWN0IHJlZnJlc2ggZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZURlYm91bmNlVXBkYXRlKCkge1xuICAvKipcbiAgICogQSBjYWNoZWQgc2V0VGltZW91dCBoYW5kbGVyLlxuICAgKiBAdHlwZSB7bnVtYmVyIHwgdW5kZWZpbmVkfVxuICAgKi9cbiAgdmFyIHJlZnJlc2hUaW1lb3V0O1xuXG4gIC8qKlxuICAgKiBQZXJmb3JtcyByZWFjdCByZWZyZXNoIG9uIGEgZGVsYXkgYW5kIGNsZWFycyB0aGUgZXJyb3Igb3ZlcmxheS5cbiAgICogQHBhcmFtIHtmdW5jdGlvbigpOiB2b2lkfSBjYWxsYmFja1xuICAgKiBAcmV0dXJucyB7dm9pZH1cbiAgICovXG4gIGZ1bmN0aW9uIGVucXVldWVVcGRhdGUoY2FsbGJhY2spIHtcbiAgICBpZiAodHlwZW9mIHJlZnJlc2hUaW1lb3V0ID09PSAndW5kZWZpbmVkJykge1xuICAgICAgcmVmcmVzaFRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmVmcmVzaFRpbWVvdXQgPSB1bmRlZmluZWQ7XG4gICAgICAgIFJlZnJlc2gucGVyZm9ybVJlYWN0UmVmcmVzaCgpO1xuICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgfSwgMzApO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBlbnF1ZXVlVXBkYXRlO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBhbGwgZXhwb3J0cyBhcmUgbGlrZWx5IGEgUmVhY3QgY29tcG9uZW50LlxuICpcbiAqIFRoaXMgaW1wbGVtZW50YXRpb24gaXMgYmFzZWQgb24gdGhlIG9uZSBpbiBbTWV0cm9dKGh0dHBzOi8vZ2l0aHViLmNvbS9mYWNlYm9vay9tZXRyby9ibG9iL2ZlYmRiYTIzODMxMTNjODgyOTZjNjFlMjhlNGVmNmE3ZjQ5MzlmZGEvcGFja2FnZXMvbWV0cm8vc3JjL2xpYi9wb2x5ZmlsbHMvcmVxdWlyZS5qcyNMNzQ4LUw3NzQpLlxuICogQHBhcmFtIHsqfSBtb2R1bGVFeHBvcnRzIEEgV2VicGFjayBtb2R1bGUgZXhwb3J0cyBvYmplY3QuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gV2hldGhlciB0aGUgZXhwb3J0cyBhcmUgUmVhY3QgY29tcG9uZW50IGxpa2UuXG4gKi9cbmZ1bmN0aW9uIGlzUmVhY3RSZWZyZXNoQm91bmRhcnkobW9kdWxlRXhwb3J0cykge1xuICBpZiAoUmVmcmVzaC5pc0xpa2VseUNvbXBvbmVudFR5cGUobW9kdWxlRXhwb3J0cykpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICBpZiAobW9kdWxlRXhwb3J0cyA9PT0gdW5kZWZpbmVkIHx8IG1vZHVsZUV4cG9ydHMgPT09IG51bGwgfHwgdHlwZW9mIG1vZHVsZUV4cG9ydHMgIT09ICdvYmplY3QnKSB7XG4gICAgLy8gRXhpdCBpZiB3ZSBjYW4ndCBpdGVyYXRlIG92ZXIgZXhwb3J0cy5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICB2YXIgaGFzRXhwb3J0cyA9IGZhbHNlO1xuICB2YXIgYXJlQWxsRXhwb3J0c0NvbXBvbmVudHMgPSB0cnVlO1xuICBmb3IgKHZhciBrZXkgaW4gbW9kdWxlRXhwb3J0cykge1xuICAgIGhhc0V4cG9ydHMgPSB0cnVlO1xuXG4gICAgLy8gVGhpcyBpcyB0aGUgRVMgTW9kdWxlIGluZGljYXRvciBmbGFnXG4gICAgaWYgKGtleSA9PT0gJ19fZXNNb2R1bGUnKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICAvLyBXZSBjYW4gKGFuZCBoYXZlIHRvKSBzYWZlbHkgZXhlY3V0ZSBnZXR0ZXJzIGhlcmUsXG4gICAgLy8gYXMgV2VicGFjayBtYW51YWxseSBhc3NpZ25zIGhhcm1vbnkgZXhwb3J0cyB0byBnZXR0ZXJzLFxuICAgIC8vIHdpdGhvdXQgYW55IHNpZGUtZWZmZWN0cyBhdHRhY2hlZC5cbiAgICAvLyBSZWY6IGh0dHBzOi8vZ2l0aHViLmNvbS93ZWJwYWNrL3dlYnBhY2svYmxvYi9iOTMwNDg2NDNmZTc0ZGUyYTY5MzE3NTU5MTFkYTEyMTJkZjU1ODk3L2xpYi9NYWluVGVtcGxhdGUuanMjTDI4MVxuICAgIHZhciBleHBvcnRWYWx1ZSA9IG1vZHVsZUV4cG9ydHNba2V5XTtcbiAgICBpZiAoIVJlZnJlc2guaXNMaWtlbHlDb21wb25lbnRUeXBlKGV4cG9ydFZhbHVlKSkge1xuICAgICAgYXJlQWxsRXhwb3J0c0NvbXBvbmVudHMgPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gaGFzRXhwb3J0cyAmJiBhcmVBbGxFeHBvcnRzQ29tcG9uZW50cztcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgZXhwb3J0cyBhcmUgbGlrZWx5IGEgUmVhY3QgY29tcG9uZW50IGFuZCByZWdpc3RlcnMgdGhlbS5cbiAqXG4gKiBUaGlzIGltcGxlbWVudGF0aW9uIGlzIGJhc2VkIG9uIHRoZSBvbmUgaW4gW01ldHJvXShodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svbWV0cm8vYmxvYi9mZWJkYmEyMzgzMTEzYzg4Mjk2YzYxZTI4ZTRlZjZhN2Y0OTM5ZmRhL3BhY2thZ2VzL21ldHJvL3NyYy9saWIvcG9seWZpbGxzL3JlcXVpcmUuanMjTDgxOC1MODM1KS5cbiAqIEBwYXJhbSB7Kn0gbW9kdWxlRXhwb3J0cyBBIFdlYnBhY2sgbW9kdWxlIGV4cG9ydHMgb2JqZWN0LlxuICogQHBhcmFtIHtzdHJpbmd9IG1vZHVsZUlkIEEgV2VicGFjayBtb2R1bGUgSUQuXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuZnVuY3Rpb24gcmVnaXN0ZXJFeHBvcnRzRm9yUmVhY3RSZWZyZXNoKG1vZHVsZUV4cG9ydHMsIG1vZHVsZUlkKSB7XG4gIGlmIChSZWZyZXNoLmlzTGlrZWx5Q29tcG9uZW50VHlwZShtb2R1bGVFeHBvcnRzKSkge1xuICAgIC8vIFJlZ2lzdGVyIG1vZHVsZS5leHBvcnRzIGlmIGl0IGlzIGxpa2VseSBhIGNvbXBvbmVudFxuICAgIFJlZnJlc2gucmVnaXN0ZXIobW9kdWxlRXhwb3J0cywgbW9kdWxlSWQgKyAnICVleHBvcnRzJScpO1xuICB9XG5cbiAgaWYgKG1vZHVsZUV4cG9ydHMgPT09IHVuZGVmaW5lZCB8fCBtb2R1bGVFeHBvcnRzID09PSBudWxsIHx8IHR5cGVvZiBtb2R1bGVFeHBvcnRzICE9PSAnb2JqZWN0Jykge1xuICAgIC8vIEV4aXQgaWYgd2UgY2FuJ3QgaXRlcmF0ZSBvdmVyIHRoZSBleHBvcnRzLlxuICAgIHJldHVybjtcbiAgfVxuXG4gIGZvciAodmFyIGtleSBpbiBtb2R1bGVFeHBvcnRzKSB7XG4gICAgLy8gU2tpcCByZWdpc3RlcmluZyB0aGUgRVMgTW9kdWxlIGluZGljYXRvclxuICAgIGlmIChrZXkgPT09ICdfX2VzTW9kdWxlJykge1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgdmFyIGV4cG9ydFZhbHVlID0gbW9kdWxlRXhwb3J0c1trZXldO1xuICAgIGlmIChSZWZyZXNoLmlzTGlrZWx5Q29tcG9uZW50VHlwZShleHBvcnRWYWx1ZSkpIHtcbiAgICAgIHZhciB0eXBlSUQgPSBtb2R1bGVJZCArICcgJWV4cG9ydHMlICcgKyBrZXk7XG4gICAgICBSZWZyZXNoLnJlZ2lzdGVyKGV4cG9ydFZhbHVlLCB0eXBlSUQpO1xuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIENvbXBhcmVzIHByZXZpb3VzIGFuZCBuZXh0IG1vZHVsZSBvYmplY3RzIHRvIGNoZWNrIGZvciBtdXRhdGVkIGJvdW5kYXJpZXMuXG4gKlxuICogVGhpcyBpbXBsZW1lbnRhdGlvbiBpcyBiYXNlZCBvbiB0aGUgb25lIGluIFtNZXRyb10oaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL21ldHJvL2Jsb2IvOTA3ZDZhZjIyYWM2ZWJlNTg1NzJiZTQxOGU5MjUzYTkwNjY1ZWNiZC9wYWNrYWdlcy9tZXRyby9zcmMvbGliL3BvbHlmaWxscy9yZXF1aXJlLmpzI0w3NzYtTDc5MikuXG4gKiBAcGFyYW0geyp9IHByZXZFeHBvcnRzIFRoZSBjdXJyZW50IFdlYnBhY2sgbW9kdWxlIGV4cG9ydHMgb2JqZWN0LlxuICogQHBhcmFtIHsqfSBuZXh0RXhwb3J0cyBUaGUgbmV4dCBXZWJwYWNrIG1vZHVsZSBleHBvcnRzIG9iamVjdC5cbiAqIEByZXR1cm5zIHtib29sZWFufSBXaGV0aGVyIHRoZSBSZWFjdCByZWZyZXNoIGJvdW5kYXJ5IHNob3VsZCBiZSBpbnZhbGlkYXRlZC5cbiAqL1xuZnVuY3Rpb24gc2hvdWxkSW52YWxpZGF0ZVJlYWN0UmVmcmVzaEJvdW5kYXJ5KHByZXZFeHBvcnRzLCBuZXh0RXhwb3J0cykge1xuICB2YXIgcHJldlNpZ25hdHVyZSA9IGdldFJlYWN0UmVmcmVzaEJvdW5kYXJ5U2lnbmF0dXJlKHByZXZFeHBvcnRzKTtcbiAgdmFyIG5leHRTaWduYXR1cmUgPSBnZXRSZWFjdFJlZnJlc2hCb3VuZGFyeVNpZ25hdHVyZShuZXh0RXhwb3J0cyk7XG5cbiAgaWYgKHByZXZTaWduYXR1cmUubGVuZ3RoICE9PSBuZXh0U2lnbmF0dXJlLmxlbmd0aCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBuZXh0U2lnbmF0dXJlLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgaWYgKHByZXZTaWduYXR1cmVbaV0gIT09IG5leHRTaWduYXR1cmVbaV0pIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBmYWxzZTtcbn1cblxudmFyIGVucXVldWVVcGRhdGUgPSBjcmVhdGVEZWJvdW5jZVVwZGF0ZSgpO1xuZnVuY3Rpb24gZXhlY3V0ZVJ1bnRpbWUobW9kdWxlRXhwb3J0cywgbW9kdWxlSWQsIHdlYnBhY2tIb3QsIHJlZnJlc2hPdmVybGF5LCBpc1Rlc3QpIHtcbiAgcmVnaXN0ZXJFeHBvcnRzRm9yUmVhY3RSZWZyZXNoKG1vZHVsZUV4cG9ydHMsIG1vZHVsZUlkKTtcblxuICBpZiAod2VicGFja0hvdCkge1xuICAgIHZhciBpc0hvdFVwZGF0ZSA9ICEhd2VicGFja0hvdC5kYXRhO1xuICAgIHZhciBwcmV2RXhwb3J0cztcbiAgICBpZiAoaXNIb3RVcGRhdGUpIHtcbiAgICAgIHByZXZFeHBvcnRzID0gd2VicGFja0hvdC5kYXRhLnByZXZFeHBvcnRzO1xuICAgIH1cblxuICAgIGlmIChpc1JlYWN0UmVmcmVzaEJvdW5kYXJ5KG1vZHVsZUV4cG9ydHMpKSB7XG4gICAgICB3ZWJwYWNrSG90LmRpc3Bvc2UoXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBIGNhbGxiYWNrIHRvIHBlcmZvcm1zIGEgZnVsbCByZWZyZXNoIGlmIFJlYWN0IGhhcyB1bnJlY292ZXJhYmxlIGVycm9ycyxcbiAgICAgICAgICogYW5kIGFsc28gY2FjaGVzIHRoZSB0by1iZS1kaXNwb3NlZCBtb2R1bGUuXG4gICAgICAgICAqIEBwYXJhbSB7Kn0gZGF0YSBBIGhvdCBtb2R1bGUgZGF0YSBvYmplY3QgZnJvbSBXZWJwYWNrIEhNUi5cbiAgICAgICAgICogQHJldHVybnMge3ZvaWR9XG4gICAgICAgICAqL1xuICAgICAgICBmdW5jdGlvbiBob3REaXNwb3NlQ2FsbGJhY2soZGF0YSkge1xuICAgICAgICAgIC8vIFdlIGhhdmUgdG8gbXV0YXRlIHRoZSBkYXRhIG9iamVjdCB0byBnZXQgZGF0YSByZWdpc3RlcmVkIGFuZCBjYWNoZWRcbiAgICAgICAgICBkYXRhLnByZXZFeHBvcnRzID0gbW9kdWxlRXhwb3J0cztcbiAgICAgICAgfVxuICAgICAgKTtcbiAgICAgIHdlYnBhY2tIb3QuYWNjZXB0KFxuICAgICAgICAvKipcbiAgICAgICAgICogQW4gZXJyb3IgaGFuZGxlciB0byBhbGxvdyBzZWxmLXJlY292ZXJpbmcgYmVoYXZpb3Vycy5cbiAgICAgICAgICogQHBhcmFtIHtFcnJvcn0gZXJyb3IgQW4gZXJyb3Igb2NjdXJyZWQgZHVyaW5nIGV2YWx1YXRpb24gb2YgYSBtb2R1bGUuXG4gICAgICAgICAqIEByZXR1cm5zIHt2b2lkfVxuICAgICAgICAgKi9cbiAgICAgICAgZnVuY3Rpb24gaG90RXJyb3JIYW5kbGVyKGVycm9yKSB7XG4gICAgICAgICAgaWYgKHR5cGVvZiByZWZyZXNoT3ZlcmxheSAhPT0gJ3VuZGVmaW5lZCcgJiYgcmVmcmVzaE92ZXJsYXkpIHtcbiAgICAgICAgICAgIHJlZnJlc2hPdmVybGF5LmhhbmRsZVJ1bnRpbWVFcnJvcihlcnJvcik7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHR5cGVvZiBpc1Rlc3QgIT09ICd1bmRlZmluZWQnICYmIGlzVGVzdCkge1xuICAgICAgICAgICAgaWYgKHdpbmRvdy5vbkhvdEFjY2VwdEVycm9yKSB7XG4gICAgICAgICAgICAgIHdpbmRvdy5vbkhvdEFjY2VwdEVycm9yKGVycm9yLm1lc3NhZ2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIF9fd2VicGFja19yZXF1aXJlX18uY1ttb2R1bGVJZF0uaG90LmFjY2VwdChob3RFcnJvckhhbmRsZXIpO1xuICAgICAgICB9XG4gICAgICApO1xuXG4gICAgICBpZiAoaXNIb3RVcGRhdGUpIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIGlzUmVhY3RSZWZyZXNoQm91bmRhcnkocHJldkV4cG9ydHMpICYmXG4gICAgICAgICAgc2hvdWxkSW52YWxpZGF0ZVJlYWN0UmVmcmVzaEJvdW5kYXJ5KHByZXZFeHBvcnRzLCBtb2R1bGVFeHBvcnRzKVxuICAgICAgICApIHtcbiAgICAgICAgICB3ZWJwYWNrSG90LmludmFsaWRhdGUoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBlbnF1ZXVlVXBkYXRlKFxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBBIGZ1bmN0aW9uIHRvIGRpc21pc3MgdGhlIGVycm9yIG92ZXJsYXkgYWZ0ZXIgcGVyZm9ybWluZyBSZWFjdCByZWZyZXNoLlxuICAgICAgICAgICAgICogQHJldHVybnMge3ZvaWR9XG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIGZ1bmN0aW9uIHVwZGF0ZUNhbGxiYWNrKCkge1xuICAgICAgICAgICAgICBpZiAodHlwZW9mIHJlZnJlc2hPdmVybGF5ICE9PSAndW5kZWZpbmVkJyAmJiByZWZyZXNoT3ZlcmxheSkge1xuICAgICAgICAgICAgICAgIHJlZnJlc2hPdmVybGF5LmNsZWFyUnVudGltZUVycm9ycygpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoaXNIb3RVcGRhdGUgJiYgdHlwZW9mIHByZXZFeHBvcnRzICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICB3ZWJwYWNrSG90LmludmFsaWRhdGUoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QuZnJlZXplKHtcbiAgZW5xdWV1ZVVwZGF0ZTogZW5xdWV1ZVVwZGF0ZSxcbiAgZXhlY3V0ZVJ1bnRpbWU6IGV4ZWN1dGVSdW50aW1lLFxuICBnZXRNb2R1bGVFeHBvcnRzOiBnZXRNb2R1bGVFeHBvcnRzLFxuICBpc1JlYWN0UmVmcmVzaEJvdW5kYXJ5OiBpc1JlYWN0UmVmcmVzaEJvdW5kYXJ5LFxuICBzaG91bGRJbnZhbGlkYXRlUmVhY3RSZWZyZXNoQm91bmRhcnk6IHNob3VsZEludmFsaWRhdGVSZWFjdFJlZnJlc2hCb3VuZGFyeSxcbiAgcmVnaXN0ZXJFeHBvcnRzRm9yUmVhY3RSZWZyZXNoOiByZWdpc3RlckV4cG9ydHNGb3JSZWFjdFJlZnJlc2gsXG59KTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcclxuaW1wb3J0IHVzZUF1dGhlbnRpY2F0aW9uIGZyb20gJ2hvc3QvdXNlQXV0aGVudGljYXRpb24nXHJcblxyXG5jb25zdCBIZWFkZXIgPSAoKSA9PiB7XHJcbiAgICBjb25zdCB7IGdldFNlc3Npb25Ub2tlbiB9ID0gdXNlQXV0aGVudGljYXRpb24oKVxyXG4gICAgY29uc3QgdG9rZW4gPSBnZXRTZXNzaW9uVG9rZW4oKVxyXG4gICAgcmV0dXJuIDw+SGVhZGVyIHt0b2tlbiA/IHRva2VuIDogJ05vIHNlc3Npb24nfTwvPlxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBIZWFkZXIiXSwibmFtZXMiOlsiUmVhY3QiLCJ1c2VBdXRoZW50aWNhdGlvbiIsIkhlYWRlciIsImdldFNlc3Npb25Ub2tlbiIsInRva2VuIl0sInNvdXJjZVJvb3QiOiIifQ==