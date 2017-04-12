"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var presenter = {
    init: function (deps) {
        this.templates = deps.templates;
        this.types = deps.types;
        this.toBase64 = deps.toBase64;
        return this;
    },
    //TODO: Allow complex types in the outputs, not primitive only.
    getIO: function (ios, ioType) {
        var _this = this;
        var xmlIOs = ios.map(function (io) { return _this._renderElement(io); });
        return this.toBase64(this._renderTemplate(xmlIOs, ioType));
    },
    _renderElement: function (_a) {
        var name = _a.name, type = _a.type, qty = _a.qty;
        var template = this.templates[qty];
        var xmlType = this.types[type];
        return template
            .replace('{{name}}', name)
            .replace('{{type}}', xmlType);
    },
    _renderTemplate: function (ios, ioType) {
        var template = this.templates.io;
        var rendered = template
            .replace('{{...io}}', ioType)
            .replace('{{...io}}', ioType)
            .replace('{{...ios}}', ios.join(''));
        rendered = ioType === 'input' ?
            rendered.replace('{{...error?}}', '') :
            rendered.replace('{{...error?}}', this.templates['error']);
        return rendered;
    }
};
exports.default = function (deps) { return presenter.init(deps); };
