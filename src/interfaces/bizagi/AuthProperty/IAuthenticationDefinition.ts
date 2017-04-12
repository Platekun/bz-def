import { IAuthProperty } from '../AuthProperty/IAuthProperty';

export interface IAuthenticationDefinition {    
    authenticationtype: string;
    name: string;
    properties: IAuthProperty;
}