#!/usr/bin/env node
import { createWriteStream } from 'fs';
import { resolve } from 'path';
import { sync } from 'mkpath';

import ActionFactory from './lib/factories/ActionFactory';
import DefinitionFactory from './lib/factories/DefinitionFactory';
import AuthFactory from './lib/factories/AuthFactory';
import { getId, getActions } from './lib/utils';

import { IConfig } from './@types/app/config/IBzConfig';
import { IDefinition, IAuthProperty, IAction } from './@types/bizagi/IBizagiStudio';
import { IDefinitionInfo } from './@types/app/config/primitives/IDefinitionInfo';

const configurationPath = resolve('./bzconfig.json');
const { name, description, url, icon, auth, actions }: IConfig = require(configurationPath);

try {
    console.info('Building your connection definition...');
    
    const authDefinition: IAuthProperty[] = AuthFactory(auth);
    const actionsDefinition: IAction[] = ActionFactory(actions);
    const definitionInfo: IDefinitionInfo = {
        id: getId(),
        name,
        description,
        url,
        icon,
        auth: authDefinition,
        actions: actionsDefinition
    };
    const def = DefinitionFactory(definitionInfo);

    sync('def', parseInt('0777',8));

    const connectorStream = createWriteStream('def/connector.json');
    connectorStream.write(JSON.stringify(def, null, '\t'));
    connectorStream.end();

    const connectorActions = getActions(actions);
    const actionsStream = createWriteStream('def/actions.js');
    actionsStream.write(`module.exports = {\n${connectorActions}\n};`);
    actionsStream.end();

    console.info('Connector definition built.');
} catch(err) {
    console.error('An error ocurred while building your connector definition', err.message);
}

