import { IAuthPropertyInfo } from './primitives/IAuthPropertyInfo';
import { IConfigActionInfo } from './primitives/IConfigActionInfo';

export interface IConfig {
    name: string;
    description: string;
    url: string;
    icon: string;
    auth: IAuthPropertyInfo[];
    actions: IConfigActionInfo[];
}