import { IConfigAction } from './IConfigAction';

interface AuthProperty {
    name: string;
    required: boolean;
    hide: boolean;
}

export interface IConfig {
    name: string;
    description: string;
    url: string;
    icon: string;
    auth: AuthProperty[];
    actions: IConfigAction[];
}