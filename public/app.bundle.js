/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _fileReader = __webpack_require__(1);
	
	var _fileReader2 = _interopRequireDefault(_fileReader);
	
	var _treeOperations = __webpack_require__(2);
	
	var _treeOperations2 = _interopRequireDefault(_treeOperations);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var contacts = new _fileReader2.default().readFile('data/contacts.json');
	
	var tree = new _treeOperations2.default();
	tree.addAllElements(contacts);

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var FileReader = function () {
	    function FileReader() {
	        _classCallCheck(this, FileReader);
	    }
	
	    _createClass(FileReader, [{
	        key: 'readFile',
	        value: function readFile(filePath) {
	            var contents = '';
	
	            // eslint-disable-next-line no-undef
	            var rawFile = new XMLHttpRequest();
	
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
	}();
	
	exports.default = FileReader;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _card = __webpack_require__(3);
	
	var _card2 = _interopRequireDefault(_card);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Tree = function () {
	    function Tree() {
	        _classCallCheck(this, Tree);
	    }
	
	    _createClass(Tree, [{
	        key: 'addAllElements',
	        value: function addAllElements(contacts) {
	            var _this = this;
	
	            contacts.forEach(function (contact) {
	                _this.addElement(contact);
	            });
	        }
	    }, {
	        key: 'addElement',
	        value: function addElement(contact) {
	            var element = void 0;
	
	            if (contact.hasOwnProperty('superiorId')) {
	                element = document.getElementById(contact.superiorId);
	            } else {
	                element = document.getElementById('tree');
	            }
	
	            if (typeof element !== 'undefined' && element != null) {
	                var aCard = new _card2.default(contact.id, contact.firstName + ' ' + contact.lastName, contact.department, contact.employeeId, contact.avatar);
	
	                var li = element.appendChild(document.createElement('li'));
	                li.innerHTML = aCard.getCard();
	
	                var ul = li.appendChild(document.createElement('ul'));
	                ul.setAttribute('id', contact.id);
	            }
	        }
	    }]);
	
	    return Tree;
	}();
	
	exports.default = Tree;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Card = function () {
	    function Card(cardID, fullName, departmentName, email, avatarPath) {
	        _classCallCheck(this, Card);
	
	        this.cardID = cardID;
	        this.fullName = fullName;
	        this.departmentName = departmentName;
	        this.email = email;
	        this.avatarPath = avatarPath;
	    }
	
	    _createClass(Card, [{
	        key: "getCard",
	        value: function getCard() {
	            return "\n                <div class=\"card\">\n                    <div class=\"card__avatar\">\n                        <img class=\"card__avatar__img\" src=\"images/" + this.avatarPath + "\">\n                    </div>\n                    <div class=\"card__detail\">\n                        <h1 class=\"card__name\">" + this.fullName + "</h1>\n                        <p class=\"card__department\">" + this.departmentName + "</p>\n                        <a class=\"card__email\" href=\"#\">" + this.email + "</a>\n                        <p class=\"card__email-domain\">@kms-technology.com</p>\n                    </div>\n                </div>\n        ";
	        }
	    }, {
	        key: "getCardID",
	        value: function getCardID() {
	            return this.cardID;
	        }
	    }]);
	
	    return Card;
	}();
	
	exports.default = Card;

/***/ })
/******/ ]);
//# sourceMappingURL=app.bundle.js.map