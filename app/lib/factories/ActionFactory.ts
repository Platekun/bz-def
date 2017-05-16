import { IAction } from '../../@types/bizagi/IBizagiStudio';
import { IActionInfo } from '../../@types/app/config/primitives/IActionInfo';
import { IConfigActionInfo } from '../../@types/app/config/primitives/IConfigActionInfo';
import { IPresenter } from '../../@types/app/IPresenter';

interface IActionFactory {
    /**
     * Injects the needed dependencies for the ActionFactory to work.
     * @return The same instance of the object
     */
    init(dependencies: any): IActionFactory;

    /**
     * Returns a set of connector actions.
     * @param getId UUID generator.
     * @param presenter JSON to XML transformer,
     * @param actions Array of primitive actions.
     */
    build(actions: IConfigActionInfo[]): IAction[]
}

const ActionFactory: IActionFactory = {
    init(deps: any): IActionFactory {
        this.getId = deps.getId;
        this.toCamelCase = deps.toCamelCase;
        this.presenter = deps.presenter;
        return this;
    },

    build(actions: IConfigActionInfo[]): IAction[] {
        const { getId, presenter, toCamelCase } = this;

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
};

export default ActionFactory;