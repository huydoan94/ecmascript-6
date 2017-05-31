/* eslint-disable */
/******/ (function (modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	let installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__ (moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if (installedModules[moduleId])
/******/ 			{ return installedModules[moduleId].exports; }
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		let module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = '';
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function (module, exports, __webpack_require__) {
        'use strict';

        let _file_reader = __webpack_require__(1);

        let _file_reader2 = _interopRequireDefault(_file_reader);

        function _interopRequireDefault (obj) { return obj && obj.__esModule ? obj : { default: obj }; }

        let contents = new _file_reader2.default().readFile('data/contacts.json');

        document.getElementById('content').innerHTML = contents[0].firstName + ' ' + contents[0].employeeId;
/***/ },
/* 1 */
/***/ function (module, exports) {
        'use strict';

        Object.defineProperty(exports, '__esModule', {
	    value: true
        });

        let _createClass = (function () { function defineProperties (target, props) { for (let i = 0; i < props.length; i++) { let descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }());

        function _classCallCheck (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

        let FileReader = (function () {
	    function FileReader () {
	        _classCallCheck(this, FileReader);
	    }

	    _createClass(FileReader, [{
	        key: 'readFile',
	        value: function readFile (filePath) {
	            let contents = '';

	            // eslint-disable-next-line no-undef
	            let rawFile = new XMLHttpRequest();

	            rawFile.open('GET', filePath, false);
	            rawFile.onreadystatechange = function () {
	                if (rawFile.readyState === 4) {
	                    if (rawFile.status === 200 || rawFile.status === 0) {
	                        contents = rawFile.responseText;
	                    }
	                }
	            };
	            rawFile.send(null);

	            return JSON.parse(contents);
	        }
	    }]);

	    return FileReader;
        }());

        exports.default = FileReader;
/***/ }
/******/ ]);
// # sourceMappingURL=app.bundle.js.map
