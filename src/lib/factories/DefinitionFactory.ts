import { IDefinition } from '../../interfaces/bizagi/definition/IDefinition';
import { IDefinitionInfo } from '../../interfaces/bizagi/Definition/IDefinitionInfo';

/**
 * Returns a new connector Definition. These are the contents of the 'def/connector.json' file of the connector.
 * @param info An object containing the connector's primitive definition information.
 */
function DefinitionFactory(info: IDefinitionInfo): IDefinition {
    return {
        globalguid: info.id,
        name: info.name,
        foldername: info.name.toLowerCase(),
        description: info.description,
        homeurl: info.url,
        icon: info.icon,
        version: '1.0.0',
        runtimeversion: '1',
        author: 'Carlos Camilo Lobo Ulloque',
        type: 'custom',
        systemdefinition: {
            properties: [],
            authentications: [{
                authenticationtype: 'custom',
                name: 'custom',
                properties: info.auth
            }]
        },
        actions: info.actions
    }
};

export default DefinitionFactory;