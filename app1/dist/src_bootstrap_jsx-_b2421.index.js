"use strict";
(self["webpackChunkworkflow_task_manager_ui"] = self["webpackChunkworkflow_task_manager_ui"] || []).push([["src_bootstrap_jsx-_b2421"],{

/***/ "./src/bootstrap.jsx":
/*!***************************!*\
  !*** ./src/bootstrap.jsx ***!
  \***************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3JjX2Jvb3RzdHJhcF9qc3gtX2IyNDIxLmluZGV4LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFFQSxJQUFNRyxhQUFhLEdBQUdDLFFBQVEsQ0FBQ0MsY0FBVCxDQUF3QixNQUF4QixDQUF0QjtBQUNBLElBQU1DLElBQUksR0FBR0wsNERBQVUsQ0FBQ0UsYUFBRCxDQUF2QjtBQUNBRyxJQUFJLENBQUNDLE1BQUwsZUFBWSwyREFBQyx1REFBRCxPQUFaOzs7Ozs7Ozs7OzBCQUZNSjswQkFDQUc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTE47QUFDQTs7QUFFQSxJQUFNRyxNQUFNLEdBQUcsU0FBVEEsTUFBUyxHQUFNO0VBQ2pCLHlCQUE0QkQsNkRBQWlCLEVBQTdDO0VBQUEsSUFBUUUsZUFBUixzQkFBUUEsZUFBUjs7RUFDQSxJQUFNQyxLQUFLLEdBQUdELGVBQWUsRUFBN0I7RUFDQSxvQkFBTyxxSUFBVUMsS0FBSyxHQUFHQSxLQUFILEdBQVcsWUFBMUIsQ0FBUDtBQUNILENBSkQ7O2NBQU1GO1VBQzBCRDs7O2VBS2pCQztBQUFmLGlFQUFlOzs7Ozs7Ozs7OzBCQU5UQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNITjtBQUNBOztBQUVBLElBQU1QLGFBQWEsR0FBRyxTQUFoQkEsYUFBZ0IsR0FBTTtFQUMxQixvQkFDRSx1SUFDRSwyREFBQyx5REFBRCxPQURGLGVBQ1ksc0VBRFosZUFFRSxrSUFGRixDQURGO0FBTUQsQ0FQRDs7ZUFRZUE7QUFBZixpRUFBZTs7Ozs7Ozs7OzswQkFSVEE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDSE87O0FBRWIsUUFBUSxtQkFBTyxDQUFDLHNFQUFXO0FBQzNCLElBQUksS0FBcUMsRUFBRSxFQUcxQyxDQUFDO0FBQ0Y7QUFDQSxFQUFFLGtCQUFrQjtBQUNwQjtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0EsRUFBRSxtQkFBbUI7QUFDckI7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd29ya2Zsb3ctdGFzay1tYW5hZ2VyLXVpLy4vc3JjL2Jvb3RzdHJhcC5qc3giLCJ3ZWJwYWNrOi8vd29ya2Zsb3ctdGFzay1tYW5hZ2VyLXVpLy4vc3JjL2NvbXBvbmVudHMvSGVhZGVyLmpzeCIsIndlYnBhY2s6Ly93b3JrZmxvdy10YXNrLW1hbmFnZXItdWkvLi9zcmMvY29udGFpbmVycy9Sb290LmpzeCIsIndlYnBhY2s6Ly93b3JrZmxvdy10YXNrLW1hbmFnZXItdWkvLi9ub2RlX21vZHVsZXMvcmVhY3QtZG9tL2NsaWVudC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBjcmVhdGVSb290IH0gZnJvbSAncmVhY3QtZG9tL2NsaWVudCdcclxuaW1wb3J0IFJvb3RDb250YWluZXIgZnJvbSAnY29udGFpbmVycy9Sb290J1xyXG5cclxuY29uc3Qgcm9vdENvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyb290JylcclxuY29uc3Qgcm9vdCA9IGNyZWF0ZVJvb3Qocm9vdENvbnRhaW5lcilcclxucm9vdC5yZW5kZXIoPFJvb3RDb250YWluZXIgLz4pIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xyXG5pbXBvcnQgdXNlQXV0aGVudGljYXRpb24gZnJvbSAnaG9zdC91c2VBdXRoZW50aWNhdGlvbidcclxuXHJcbmNvbnN0IEhlYWRlciA9ICgpID0+IHtcclxuICAgIGNvbnN0IHsgZ2V0U2Vzc2lvblRva2VuIH0gPSB1c2VBdXRoZW50aWNhdGlvbigpXHJcbiAgICBjb25zdCB0b2tlbiA9IGdldFNlc3Npb25Ub2tlbigpXHJcbiAgICByZXR1cm4gPD5IZWFkZXIge3Rva2VuID8gdG9rZW4gOiAnTm8gc2Vzc2lvbid9PC8+XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEhlYWRlciIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcclxuaW1wb3J0IEhlYWRlciBmcm9tICdjb21wb25lbnRzL0hlYWRlcidcclxuXHJcbmNvbnN0IFJvb3RDb250YWluZXIgPSAoKSA9PiB7XHJcbiAgcmV0dXJuIChcclxuICAgIDw+XHJcbiAgICAgIDxIZWFkZXIgLz48IGJyLz5cclxuICAgICAgPD5BcHAgMzwvPlxyXG4gICAgPC8+XHJcbiAgKVxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IFJvb3RDb250YWluZXJcclxuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgbSA9IHJlcXVpcmUoJ3JlYWN0LWRvbScpO1xuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAncHJvZHVjdGlvbicpIHtcbiAgZXhwb3J0cy5jcmVhdGVSb290ID0gbS5jcmVhdGVSb290O1xuICBleHBvcnRzLmh5ZHJhdGVSb290ID0gbS5oeWRyYXRlUm9vdDtcbn0gZWxzZSB7XG4gIHZhciBpID0gbS5fX1NFQ1JFVF9JTlRFUk5BTFNfRE9fTk9UX1VTRV9PUl9ZT1VfV0lMTF9CRV9GSVJFRDtcbiAgZXhwb3J0cy5jcmVhdGVSb290ID0gZnVuY3Rpb24oYywgbykge1xuICAgIGkudXNpbmdDbGllbnRFbnRyeVBvaW50ID0gdHJ1ZTtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIG0uY3JlYXRlUm9vdChjLCBvKTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgaS51c2luZ0NsaWVudEVudHJ5UG9pbnQgPSBmYWxzZTtcbiAgICB9XG4gIH07XG4gIGV4cG9ydHMuaHlkcmF0ZVJvb3QgPSBmdW5jdGlvbihjLCBoLCBvKSB7XG4gICAgaS51c2luZ0NsaWVudEVudHJ5UG9pbnQgPSB0cnVlO1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4gbS5oeWRyYXRlUm9vdChjLCBoLCBvKTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgaS51c2luZ0NsaWVudEVudHJ5UG9pbnQgPSBmYWxzZTtcbiAgICB9XG4gIH07XG59XG4iXSwibmFtZXMiOlsiUmVhY3QiLCJjcmVhdGVSb290IiwiUm9vdENvbnRhaW5lciIsInJvb3RDb250YWluZXIiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwicm9vdCIsInJlbmRlciIsInVzZUF1dGhlbnRpY2F0aW9uIiwiSGVhZGVyIiwiZ2V0U2Vzc2lvblRva2VuIiwidG9rZW4iXSwic291cmNlUm9vdCI6IiJ9