"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SearchPage_vue_1 = require("@/modules/Search/pages/SearchPage.vue");
const MainView_vue_1 = require("@/modules/Search/views/MainView.vue");
const ArboView = () => Promise.resolve().then(() => require('@/modules/Search/views/ArboView.vue'));
const guards_1 = require("@/modules/Search/routes/guards");
const search = [
    {
        path: '/documents',
        name: 'Search',
        component: SearchPage_vue_1.default,
        children: [
            {
                path: '',
                name: 'MainView',
                component: MainView_vue_1.default
            },
            {
                path: 'arbo',
                name: 'ArboView',
                component: ArboView,
                beforeEnter: guards_1.hasFolderSelected,
                props: true
            }
        ]
    }
];
exports.default = search;
//# sourceMappingURL=index.js.map