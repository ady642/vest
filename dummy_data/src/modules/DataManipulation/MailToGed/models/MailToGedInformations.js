"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailToGedInformations = exports.MailToGedInformationsItem = void 0;
class MailToGedInformationsItem {
    constructor(label, emailAddress) {
        this.label = label;
        this.emailAddress = emailAddress;
    }
}
exports.MailToGedInformationsItem = MailToGedInformationsItem;
class MailToGedInformations {
    constructor(items, moreInformationLink, state) {
        this.items = items;
        this.moreInformationLink = moreInformationLink;
        this.state = state;
    }
    static loading() {
        return new MailToGedInformations([], '', 'loading');
    }
    static errored() {
        return new MailToGedInformations([], '', 'errored');
    }
    static loaded(payload) {
        return new MailToGedInformations(payload.items, payload.moreInformationLink, 'loaded');
    }
    get isLoading() {
        return this.state === 'loading';
    }
}
exports.MailToGedInformations = MailToGedInformations;
//# sourceMappingURL=MailToGedInformations.js.map