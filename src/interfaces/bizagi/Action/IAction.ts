/**
 * 
 */
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