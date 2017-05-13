export interface IAction {
    guid: string;
    name: string;
    displayName: string;
    description: string;
    actiontype: string;
    contenttype: string;
    resturl: string;
    httpoperation: string;
    useauthentication: boolean;
    xsdinput: string;
    xsdoutput: string;
}

export interface IAuthProperty {
    name: string;
    datatype: string;
    required: string;
    passwordmode: boolean;
    propertyvalues: Array<any>;
}

interface IAuthenticationDefinition {
    authenticationtype: string;
    name: string;
    properties: IAuthProperty[];
}

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
    systemdefinition: ISystemDefinition;
    actions: IAction[]
}