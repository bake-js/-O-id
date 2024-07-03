/**
 * Decorator utilizado para forçar a atualização da renderização do elemento customizado.
 *
 * @param {any} target - A classe alvo onde o método decorado está sendo definido.
 * @param {PropertyKey} propertyKey - O nome do método decorado.
 * @param {PropertyDescriptor} descriptor - O descritor da propriedade que define o método decorado.
 * @returns {void}
 */
export declare function repaint(
  target: any,
  propertyKey: PropertyKey,
  descriptor: PropertyDescriptor,
): void;
