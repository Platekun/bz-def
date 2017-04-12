import { IIO } from './IIO';

export interface IConfigAction {
    name: string;
    description: string;
    inputs: IIO[];
    outputs: IIO[];
}