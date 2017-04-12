import { IAuthProperty } from '../AuthProperty/IAuthProperty';
import { IAction } from '../Action/IAction';

export interface IDefinitionInfo {
    id: string;
    name: string;
    description: string;
    url: string;
    icon: string;
    auth: IAuthProperty;
    actions: IAction[];
}
