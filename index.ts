import UnitTestFactory from "./templates/UnitTestFactory";
import * as fs from 'fs';

const path = './dummy_data/src/Common/components/Buttons/NattoCategoryButton.vue'
const data = fs.readFileSync(path, 'utf8')

const unitTestFactory = new UnitTestFactory(path, data)
console.log(unitTestFactory.test)
