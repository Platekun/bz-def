import { IIO } from './config/primitives/IIO';

export interface IPresenter {
    init(deps: any): IPresenter;
    getIO(ios: IIO[], ioType: string): string;
    _renderElement(io: IIO): string;
    _renderTemplate(ios, ioType): string
}