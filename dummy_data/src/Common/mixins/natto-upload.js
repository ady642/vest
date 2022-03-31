"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
const uploadMixin = {
    data() {
        return {
            fileList: [],
            length: 0,
            className: ''
        };
    },
    methods: {
        change() {
            // determine the number of uploaded files
            this.length = document.querySelector(this.className).files.length;
            if (this.length > 0) {
                Array.from(document.querySelector(this.className).files).forEach((file) => {
                    if (this.fileList.indexOf(file) === -1) {
                        this.fileList.push(file);
                    }
                });
            }
        },
        emitFilesEvent() {
            const formData = new FormData();
            if (this.fileList.length > 0) {
                this.fileList.forEach((file) => {
                    formData.append('file', file);
                });
                if (formData.getAll('file').length === this.length && this.length > 0) {
                    this.$emit('on-files-change', formData.getAll('file'));
                    this.fileList = [];
                }
            }
        }
    }
};
exports.default = uploadMixin;
//# sourceMappingURL=natto-upload.js.map