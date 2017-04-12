import { IPresenter } from '../interfaces/IPresenter';
import { IIO } from '../interfaces/configuration/IIO';

const presenter: IPresenter = {
    init(deps: any): IPresenter {
        this.templates = deps.templates;        
        this.types = deps.types;
        this.toBase64 = deps.toBase64;
        return this;
    },

    //TODO: Allow complex types in the outputs, not primitive only.
    getIO(ios: IIO[], ioType: string): string {
        const xmlIOs: string[] = ios.map(io => this._renderElement(io));
        return this.toBase64(this._renderTemplate(xmlIOs, ioType));
    },

    _renderElement({name, type, qty}: IIO): string {
        const template: string = this.templates[qty];
        const xmlType: string = this.types[type]; 
        
        return template
            .replace('{{name}}', name)
            .replace('{{type}}', xmlType);
    },

    _renderTemplate(ios: string[], ioType: string): string {
        const template: string = this.templates.io;

        let rendered: string = template
            .replace('{{...io}}', ioType)
            .replace('{{...io}}', ioType)
            .replace('{{...ios}}', ios.join(''));
        
        rendered = ioType === 'input' ? 
            rendered.replace('{{...error?}}', '') :
            rendered.replace('{{...error?}}', this.templates['error']);

        return rendered;
    }
}

export default (deps): IPresenter => presenter.init(deps);