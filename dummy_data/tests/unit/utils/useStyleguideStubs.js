"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const useElementStubs_1 = require("./useElementStubs");
const vue_1 = require("vue");
const { ElTable } = (0, useElementStubs_1.default)();
const components = [
    {
        template: '<div><slot/></div>',
        name: 'MpCard'
    },
    {
        template: '<div><slot/></div>',
        name: 'MpPagination'
    },
    {
        template: '<div><slot/></div>',
        name: 'MpTabs',
        props: ['tabItems']
    },
    {
        template: '<div><slot/></div>',
        name: 'MpBreadcrumb',
        props: ['breadcrumbItems', 'ellipsed']
    },
    {
        template: '<div><slot/></div>',
        name: 'MpButton',
        props: ['type', 'icon', 'disabled']
    },
    {
        template: '<slot/>',
        name: 'MpIcon',
        props: ['name']
    },
    {
        template: '<button />',
        name: 'MpAdvancedSearchBtn'
    },
    {
        name: 'MpInCard'
    },
    {
        name: 'MpHighlight'
    },
    {
        name: 'MpRadio',
        props: ['label']
    },
    {
        name: 'MpTable',
        components: { ElTable },
        template: `<div><slot/><slot name="empty"/><ElTable ref="ElTableInstance" /></div>`,
        props: [
            'cellClassName',
            'rowClassName',
            'isSelection',
            'data',
            'highlightRowOnClick'
        ],
        setup: () => ({
            ElTableInstance: (0, vue_1.ref)()
        })
    },
    {
        template: '<div><slot name="prefix"/><slot /><slot name="append"/></div>',
        name: 'MpInput',
        props: ['modelValue']
    },
    {
        template: '<div><slot /><slot name="subHeader" /></div>',
        name: 'MpTitle'
    }
];
const useStyleguide = () => {
    const result = {};
    const template = '<div><slot/></div>';
    components.forEach((element) => {
        result[element.name] = {
            ...element,
            template: element.template ?? template
        };
    });
    return result;
};
exports.default = useStyleguide;
//# sourceMappingURL=useStyleguideStubs.js.map