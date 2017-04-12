"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Returns a new Authentication property.
 * @param param An object containing one of the connector's primitive authentication property.
 */
function AuthParam(param) {
    return {
        name: param.name,
        datatype: '',
        required: param.required,
        passwordmode: param.hide,
        propertyvalues: []
    };
}
/**
 * Returns a set of connector authentication properties.
 * @param AuthParam Array of primitive authentication properties.
 * @param params
 */
function buildAuth(AuthParam, params) {
    return params.map(AuthParam);
}
exports.default = buildAuth.bind(null, AuthParam);
