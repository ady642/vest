"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UnitTestFactory_1 = require("./templates/UnitTestFactory");
const fs = require("fs");
const path = './dummy_data/src/Common/components/Buttons/NattoCategoryButton.vue';
const data = fs.readFileSync(path, 'utf8');
const unitTestFactory = new UnitTestFactory_1.default(path, data);
console.log(unitTestFactory.test);
//# sourceMappingURL=index.js.map