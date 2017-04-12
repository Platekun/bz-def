#!/usr/bin/env node
import { createWriteStream } from 'fs';
import { resolve } from 'path';
import { sync } from 'mkpath';
import ActionFactory from './lib/factories/ActionFactory';
import DefinitionFactory from './lib/factories/DefinitionFactory';
import AuthFactory from './lib/factories/AuthFactory';
import { IConfig } from './interfaces/configuration/IConfig';
import { IDefinition } from './interfaces/bizagi/Definition/IDefinition';
import { getId, getActions } from './lib/utils';

const config: IConfig = require(resolve('./bzconfig.json'));

try {
    console.info('Building your connection definition...');
    const def: IDefinition = DefinitionFactory({
        id: getId(),
        name: config.name,
        description: config.description,
        url: config.url,
        icon: config.icon,
        auth: AuthFactory(config.auth),
        actions: ActionFactory(config.actions)
    });

    sync('def', parseInt('0777',8));

    const connectorStream = createWriteStream('def/connector.json');
    connectorStream.write(JSON.stringify(def, null, '\t'));
    connectorStream.end();

    const actions = getActions(config.actions);
    const actionsStream = createWriteStream('def/actions.js');
    actionsStream.write(`module.exports = {\n${actions}\n};`);
    actionsStream.end();

    console.info('Connector definition built.');
} catch(err) {
    console.error('An error ocurred while building your connector definition', err.message);
}

