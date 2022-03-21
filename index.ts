import UnitTestFactory from "./templates/UnitTestFactory";
import * as fs from 'fs';
import {getFileName} from "./utils";

const path = './dummy_data/src/Common/components/Badges/NattoBadge.vue'
const data = fs.readFileSync(path, 'utf8')

const unitTestFactory = new UnitTestFactory(getFileName(path), data)
console.log(unitTestFactory.test)
