#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var path_1 = require("path");
var mkpath_1 = require("mkpath");
var ActionFactory_1 = require("./lib/factories/ActionFactory");
var DefinitionFactory_1 = require("./lib/factories/DefinitionFactory");
var AuthFactory_1 = require("./lib/factories/AuthFactory");
var utils_1 = require("./lib/utils");
var config = require(path_1.resolve('./bzconfig.json'));
try {
    console.info('Building your connection definition...');
    var def = DefinitionFactory_1.default({
        id: utils_1.getId(),
        name: config.name,
        description: config.description,
        url: config.url,
        icon: config.icon,
        auth: AuthFactory_1.default(config.auth),
        actions: ActionFactory_1.default(config.actions)
    });
    mkpath_1.sync('def', parseInt('0777', 8));
    var connectorStream = fs_1.createWriteStream('def/connector.json');
    connectorStream.write(JSON.stringify(def, null, '\t'));
    connectorStream.end();
    var actions = utils_1.getActions(config.actions);
    var actionsStream = fs_1.createWriteStream('def/actions.js');
    actionsStream.write("module.exports = {\n" + actions + "\n};");
    actionsStream.end();
    console.info('Connector definition built.');
}
catch (err) {
    console.error('An error ocurred while building your connector definition', err.message);
}
