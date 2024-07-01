/**
 * Decorator utilizado para renderizar o conteúdo do elemento customizado.
 *
 * @param {Function} component - Uma função assíncrona que retorna o conteúdo HTML a ser renderizado.
 * @returns {Function} - Uma função que aplica o decorator a um elemento alvo.
 */
export declare function paint(
  component: (target: any) => string,
): (constructor: CustomElementConstructor) => void;
