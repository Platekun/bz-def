import { IAuthProperty } from '../../@types/bizagi/IBizagiStudio';
import { IAuthPropertyInfo } from '../../@types/app/config/primitives/IAuthPropertyInfo';

/**
 * Returns a set of connector authentication properties.
 * @param AuthParam Array of primitive authentication properties.
 * @param params 
 */
export default function buildAuth(params: IAuthPropertyInfo[]): IAuthProperty[] {
    return params.map(({ name, required, hide }: IAuthPropertyInfo) => ({
        name,
        datatype: '',
        required,
        passwordmode: hide,
        propertyvalues: []
    }));
}