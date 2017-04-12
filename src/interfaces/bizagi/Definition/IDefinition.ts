import { IAction } from '../Action/IAction';
import { IAuthenticationDefinition } from '../AuthProperty/IAuthenticationDefinition';

interface ISystemDefinition {
    properties: Array<any>;
    authentications: IAuthenticationDefinition[];
}

export interface IDefinition {
    globalguid: string;
    name: string;
    foldername: string;
    description: string;
    homeurl: string;
    icon: string;
    version: string;
    runtimeversion: string;
    author: string;
    type: string;
    systemdefinition: ISystemDefinition
    actions: IAction[]
}
