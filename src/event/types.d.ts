/**
 * Decorator utilizado para adicionar um ouvinte de eventos a um elemento customizado.
 * O método decorado será chamado quando o evento especificado ocorrer no elemento.
 *
 * @param {string} event - O nome do evento a ser observado.
 */
export declare const event: {
  [event: string]: (
    query: string,
  ) => (target: any, propertyKey: PropertyKey) => void;
};
