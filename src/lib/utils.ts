import { IConfigAction } from '../interfaces/configuration/IConfigAction';
import { IConnectorAction } from '../interfaces/configuration/IConnectorAction';

/**
 * Transform a string to camelCase.
 * @param source Target string 
 */
export function toCamelCase(source: string): string {
    const indexes: Array<number> = [];
    for(let i = 0; i < source.length; i++) {
        if (source[i] === "-") {
            indexes.push(i);
        }
    }

    for(let i = 0; i < indexes.length; i++) {
        source = source.replace('-', ' ');
    }

    const camelCased = source.replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
        return index == 0 ? letter.toLowerCase() : letter.toUpperCase();
    })
    .replace(/\s+/g, '');

    return camelCased;
};

/**
 * Generates a UUID. 
 * Native implementation taken from Bizagi's connector editor.
 */
export function getId(): string {
    const uuid: Array<any> = [],
        rand = '0123456789abcdef';

    for (let n = 0; n < 36; n++) {
        let digit = rand.substr(Math.floor(16 * Math.random()), 1);
        uuid[n] = digit;
    }
    
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
    uuid[14] = '4';
    uuid[19] = rand.substr(3 & uuid[19] | 8, 1);
    
    return uuid.join(''); 
};

/**
 * Transform a source string into its base64 form.
 * @param source string to be transformed into base64.
 */
export function toBase64(source: string): string {
    return new Buffer(source).toString('base64');
}

/**
 * Returns the contents of the 'actions.js' file of the connector. It contains the implemented actions in a module.exports declaration.
 * @param connector a connector configuration file.
 */
export function getActions(actions: IConfigAction[]): string {
    const actionsDefinition = actions.map((action: IConfigAction) => 
            <IConnectorAction> { name: `'${action.name}'`, description: `'${action.description}'` })
        .map((action: IConnectorAction) => {
                return `\t${action.name}: ${action.description},\n`;
            })
            .reduce((sum: string, action: string) => sum + action, '');

    return actionsDefinition.substring(0, actionsDefinition.length - 2);
};