import { IDefinition } from '../../@types/bizagi/IBizagiStudio';
import { IDefinitionInfo } from '../../@types/app/config/primitives/IDefinitionInfo';

/**
 * Returns a new connector Definition. These are the contents of the 'def/connector.json' file of the connector.
 * @param info An object containing the connector's primitive definition information.
 */
export default function DefinitionFactory(info: IDefinitionInfo): IDefinition {
    const { id, name, description, url, icon, auth, actions } = info;

    return {
        globalguid: id,
        name,
        foldername: name.toLowerCase(),
        description,
        homeurl: url,
        icon,
        version: '1.0.0',
        runtimeversion: '1',
        author: 'Carlos Camilo Lobo Ulloque',
        type: 'custom',
        systemdefinition: {
            properties: [],
            authentications: [
                {
                    authenticationtype: 'custom',
                    name: 'custom',
                    properties: auth
                }
            ]
        },
        actions
    }
};