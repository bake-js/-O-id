/**
 * Decorator utilizado para forçar a atualização da renderização do elemento customizado.
 *
 * @param {any} target - O alvo do decorator.
 * @param {PropertyKey} propertyKey - A chave da propriedade.
 * @param {PropertyDescriptor} descriptor - O descritor da propriedade.
 */
export declare function repaint(
  target: any,
  propertyKey: PropertyKey,
  descriptor: PropertyDescriptor,
): void;
