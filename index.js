"use strict";
exports.__esModule = true;
var UnitTestFactory_1 = require("./templates/UnitTestFactory");
var fs = require("fs");
var utils_1 = require("./utils");
var path = './dummy_data/src/Common/components/Dropdown/NattoDropdown.vue';
var data = fs.readFileSync(path, 'utf8');
var unitTestFactory = new UnitTestFactory_1["default"]((0, utils_1.getFileName)(path), data);
console.log(unitTestFactory.test);
