/**
 * Decorator utilizado para agendar a execução de um método após o método decorado.
 *
 * @param {string | symbol} method - O nome do método a ser agendado para execução.
 */
export declare function joinCut(
  method: string | symbol,
): (
  target: any,
  propertyKey: PropertyKey,
  descriptor: PropertyDescriptor,
) => void;
