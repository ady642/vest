"use strict";
exports.__esModule = true;
var UnitTestFactory_1 = require("./templates/UnitTestFactory");
var fs = require("fs");
var path = './dummy_data/src/Common/components/Buttons/NattoCategoryButton.vue';
var data = fs.readFileSync(path, 'utf8');
var unitTestFactory = new UnitTestFactory_1["default"](path, data);
console.log(unitTestFactory.test);
