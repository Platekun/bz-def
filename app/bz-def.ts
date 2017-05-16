#!/usr/bin/env node
import { createWriteStream } from 'fs';
import { resolve } from 'path';
import { sync } from 'mkpath';

import PresenterFactory from './lib/ioPresenter';
import ActionFactory from './lib/factories/ActionFactory';
import types from  './@types/bizagi/ioTypes';
import templates from './@types/bizagi/elements';

import AuthFactory from './lib/factories/AuthFactory';
import DefinitionFactory from './lib/factories/DefinitionFactory';

import { getId, getActions, toCamelCase, toBase64 } from './lib/utils';

import { IConfig } from './@types/app/config/IBzConfig';
import { IDefinition, IAuthProperty, IAction } from './@types/bizagi/IBizagiStudio';
import { IDefinitionInfo } from './@types/app/config/primitives/IDefinitionInfo';

import { gray, cyan, green, red, yellow, white } from 'chalk';
const { log } = console;

try {
    const configurationPath = resolve('./bzconfig.json');
    const { name, description, url, icon, auth, actions }: IConfig = require(configurationPath);
    
    log(yellow.bold(`Starting definition process ... ✈`));
    
    log(cyan(`Getting auth properties...`));
    const authDef: IAuthProperty[] = AuthFactory(auth);
    const authProps = authDef.map(prop => prop.name).reduce((item, acc) => `${item} ${acc}`);
    log(gray(`✎ Connector authentication is given by:`), white.bold(`${authProps}`));

    log(cyan(`Getting connector actions...`));
    const presenter = PresenterFactory({types, templates, toBase64});
    const actionsDef: IAction[] = ActionFactory
        .init({ presenter, getId, toCamelCase })
        .build(actions);
    const actionsProps = actionsDef.map(prop => prop.name).reduce((item, acc) => `${item} ${acc}`);
    log(gray(`✎ The Implemented actions are:`), white.bold(`${actionsProps}`));

    log(cyan(`Creating connector contract...`));
    const defInfo: IDefinitionInfo = {
        id: getId(),
        name,
        description,
        url,
        icon,
        auth: authDef,
        actions: actionsDef
    };
    const def = DefinitionFactory(defInfo);
    log(green.bold(`✔ Connector contract created`));

    log(cyan(`Logging contract...`));
    
    sync(`def`, parseInt(`0777`, 8));
    logConnectorDef(def);
    logConnectorActions(actions);
    log(green.bold(`✿ Connector contract logged successfully ✿`));

} catch(err) {
    log(red.bold(`✘ An error ocurred while building your connector definition.\n${err.message}`));
}

function logConnectorDef(def) {
    const stream = createWriteStream(`def/connector.json`);
    stream.write(JSON.stringify(def, null, '\t'));
    stream.end();
}

function logConnectorActions(actions) {
    const connectorActions = getActions(actions);
    const stream = createWriteStream(`def/actions.js`);
    stream.write(`module.exports = {\n${connectorActions}\n};`);
    stream.end();
}