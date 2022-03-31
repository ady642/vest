"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UnitTestFactory_1 = require("./templates/UnitTestFactory");
const fs = require("fs");
const path = './dummy_data/src/Common/components/Buttons/NattoButton.vue';
const data = fs.readFileSync(path, 'utf8');
const unitTestFactory = new UnitTestFactory_1.default(path, data);
unitTestFactory.lintTestSuites().then((res) => console.log(res));
//# sourceMappingURL=index.js.map