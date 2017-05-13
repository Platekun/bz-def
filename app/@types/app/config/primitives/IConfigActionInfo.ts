import { IIO } from './IIO';

export interface IConfigActionInfo {
    name: string;
    description: string;
    inputs: IIO[];
    outputs: IIO[];
}