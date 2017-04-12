import PresenterFactory from '../ioPresenter';
import types from '../xmlTemplates/types';
import templates from '../xmlTemplates/templates';
import { IAction } from '../../interfaces/bizagi/Action/IAction';
import { IActionInfo } from '../../interfaces/bizagi/Action/IActionInfo';
import { IConfigAction } from '../../interfaces/configuration/IConfigAction'
import { IPresenter } from '../../interfaces/IPresenter';
import { getId, toCamelCase, toBase64 } from '../utils';

/**
 * Returns a new connector Action.
 * @param toCamelCase camelCase string transformer.
 * @param action An object containing the connector's primitive action information.
 */
function ActionFactory(toCamelCase: (str: string) => string, action: IActionInfo): IAction  {
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
function buildActions(getId: () => string, presenter: IPresenter, ActionFactory: (IActionInfo) => IAction, actions: IConfigAction[]): IAction[] {
    return actions.map((action: IConfigAction) => <IActionInfo> { 
        id: getId(), 
        name: action.name, 
        description: action.description,
        inputs: presenter.getIO(action.inputs, 'input'), 
        outputs: presenter.getIO(action.outputs, 'output')
    })
    .map((action: IActionInfo) => ActionFactory(action));
}
const boundAction = ActionFactory.bind(null, toCamelCase);
const ioPresenter = PresenterFactory({types, templates, toBase64});
export default buildActions.bind(null, getId, ioPresenter, boundAction);