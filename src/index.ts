import UnitTestFactory from "./templates/UnitTestFactory";
import * as fs from 'fs';

const path = './dummy_data/src/Common/components/Buttons/NattoButton.vue';
const data = fs.readFileSync(path, 'utf8');

const unitTestFactory = new UnitTestFactory(path, data);
unitTestFactory.lintTestSuites().then((res) => console.log(res));
