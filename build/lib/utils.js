"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Transform a string to camelCase.
 * @param source Target string
 */
function toCamelCase(source) {
    var indexes = [];
    for (var i = 0; i < source.length; i++) {
        if (source[i] === "-") {
            indexes.push(i);
        }
    }
    for (var i = 0; i < indexes.length; i++) {
        source = source.replace('-', ' ');
    }
    var camelCased = source.replace(/(?:^\w|[A-Z]|\b\w)/g, function (letter, index) {
        return index == 0 ? letter.toLowerCase() : letter.toUpperCase();
    })
        .replace(/\s+/g, '');
    return camelCased;
}
exports.toCamelCase = toCamelCase;
;
/**
 * Generates a UUID.
 * Native implementation taken from Bizagi's connector editor.
 */
function getId() {
    var uuid = [], rand = '0123456789abcdef';
    for (var n = 0; n < 36; n++) {
        var digit = rand.substr(Math.floor(16 * Math.random()), 1);
        uuid[n] = digit;
    }
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
    uuid[14] = '4';
    uuid[19] = rand.substr(3 & uuid[19] | 8, 1);
    return uuid.join('');
}
exports.getId = getId;
;
/**
 * Transform a source string into its base64 form.
 * @param source string to be transformed into base64.
 */
function toBase64(source) {
    return new Buffer(source).toString('base64');
}
exports.toBase64 = toBase64;
/**
 * Returns the contents of the 'actions.js' file of the connector. It contains the implemented actions in a module.exports declaration.
 * @param connector a connector configuration file.
 */
function getActions(actions) {
    var actionsDefinition = actions.map(function (action) {
        return ({ name: "'" + action.name + "'", description: "'" + action.description + "'" });
    })
        .map(function (action) {
        return "\t" + action.name + ": " + action.description + ",\n";
    })
        .reduce(function (sum, action) { return sum + action; }, '');
    return actionsDefinition.substring(0, actionsDefinition.length - 2);
}
exports.getActions = getActions;
;
