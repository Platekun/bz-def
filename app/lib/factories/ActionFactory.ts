import PresenterFactory from '../ioPresenter';
import { getId, toCamelCase, toBase64 } from '../utils';

import { IAction } from '../../@types/bizagi/IBizagiStudio';
import { IActionInfo } from '../../@types/app/config/primitives/IActionInfo';
import { IConfigActionInfo } from '../../@types/app/config/primitives/IConfigActionInfo';
import { IPresenter } from '../../@types/app/IPresenter';
import types from  '../../@types/bizagi/ioTypes';
import templates from '../../@types/bizagi/elements';

/**
 * Returns a set of connector actions.
 * @param getId UUID generator.
 * @param presenter JSON to XML transformer,
 * @param actions Array of primitive actions.
 */
function buildActions(getId: () => string, presenter: IPresenter, actions: IConfigActionInfo[]): IAction[] {
    return actions.map((action: IConfigActionInfo) => ({
        id: getId(), 
        name: action.name, 
        description: action.description,
        inputs: presenter.getIO(action.inputs, 'input'), 
        outputs: presenter.getIO(action.outputs, 'output')
    }))
    .map((action: IActionInfo) => ({
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
    }));
}

const ioPresenter = PresenterFactory({types, templates, toBase64});
export default buildActions.bind(null, getId, ioPresenter);