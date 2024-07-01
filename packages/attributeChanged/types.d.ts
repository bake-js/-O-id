/**
 * Decorator utilizado para definir um método como manipulador de atributos.
 * O método decorado será chamado sempre que o atributo especificado for alterado.
 *
 * @param {string} attributeName - O nome do atributo a ser observado.
 */
export declare function attributeChanged(
  attributeName: string,
): (target: any, propertKey: PropertyKey) => void;
