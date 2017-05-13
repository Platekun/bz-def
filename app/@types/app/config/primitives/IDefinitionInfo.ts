import { IAuthProperty, IAction } from '../../../bizagi/IBizagiStudio';

export interface IDefinitionInfo {
    id: string;
    name: string;
    description: string;
    url: string;
    icon: string;
    auth: IAuthProperty[];
    actions: IAction[];
}