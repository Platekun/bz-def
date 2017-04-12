import { IAuthProperty } from '../../interfaces/bizagi/AuthProperty/IAuthProperty';
import { IAuthPropertyInfo } from '../../interfaces/bizagi/AuthProperty/IAuthPropertyInfo';

/**
 * Returns a new Authentication property.
 * @param param An object containing one of the connector's primitive authentication property.
 */
function AuthParam(param: IAuthPropertyInfo): IAuthProperty {
    return {
        name: param.name,
        datatype: '',
        required: param.required,
        passwordmode: param.hide,
        propertyvalues: []
    };
}

/**
 * Returns a set of connector authentication properties.
 * @param AuthParam Array of primitive authentication properties.
 * @param params 
 */
function buildAuth(AuthParam: (param: IAuthPropertyInfo) => IAuthProperty, params: IAuthPropertyInfo[]): IAuthProperty[] {
    return params.map(AuthParam);
}

export default buildAuth.bind(null, AuthParam);