/**
 * Esta instância de `EventTarget` é utilizada para centralizar a emissão e escuta de eventos
 * dentro do módulo Echo, permitindo a comunicação entre diferentes componentes sem depender
 * diretamente do DOM.
 *
 * @description
 * O `target` serve como o ponto central para o Event Bus no módulo Echo, facilitando a
 * comunicação desacoplada entre componentes. Com ele, eventos podem ser despachados e ouvidos
 * de forma eficiente, promovendo um sistema de eventos robusto e modular.
 */
export const target = new EventTarget();
