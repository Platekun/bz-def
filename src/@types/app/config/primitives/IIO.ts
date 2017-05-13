/**
 * An Input/Output of a connector action.
 * @param name Name of the parameter.
 * @param type The value type of the parameter.
 * @param qty How many values you expect from this parameter. Set it either to 'single' or to 'list'.
 */
export interface IIO {            
    name: string,
    type: string,
    qty: string
}