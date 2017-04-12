"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ioPresenter_1 = require("../ioPresenter");
var types_1 = require("../xmlTemplates/types");
var templates_1 = require("../xmlTemplates/templates");
var utils_1 = require("../utils");
/**
 * Returns a new connector Action.
 * @param toCamelCase camelCase string transformer.
 * @param action An object containing the connector's primitive action information.
 */
function ActionFactory(toCamelCase, action) {
    return {
        guid: action.id,
        name: action.name,
        displayName: toCamelCase(action.name.replace('-', ' ')),
        description: action.description,
        actiontype: 'custom',
        contenttype: '',
        resturl: '',
        httpoperation: 'notdefined',
        useauthentication: false,
        xsdinput: action.inputs,
        xsdoutput: action.outputs
    };
}
/**
 * Returns a set of connector actions.
 * @param getId UUID generator.
 * @param presenter JSON to XML transformer,
 * @param ActionFactory Factory that creates the new Action.
 * @param actions Array of primitive actions.
 */
function buildActions(getId, presenter, ActionFactory, actions) {
    return actions.map(function (action) { return ({
        id: getId(),
        name: action.name,
        description: action.description,
        inputs: presenter.getIO(action.inputs, 'input'),
        outputs: presenter.getIO(action.outputs, 'output')
    }); })
        .map(function (action) { return ActionFactory(action); });
}
var boundAction = ActionFactory.bind(null, utils_1.toCamelCase);
var ioPresenter = ioPresenter_1.default({ types: types_1.default, templates: templates_1.default, toBase64: utils_1.toBase64 });
exports.default = buildActions.bind(null, utils_1.getId, ioPresenter, boundAction);
