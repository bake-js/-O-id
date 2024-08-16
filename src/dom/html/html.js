const html = (strings, ...values) => {
  // Combina valores interpolados, unindo arrays e convertendo para strings
  const combinedValues = values.map((value) =>
    Array.isArray(value) ? value.join("") : value,
  );

  // Cria o conteúdo final do template literal com valores interpolados
  let content = String.raw({ raw: strings }, ...combinedValues);

  // Remove todas as quebras de linha e espaços ao redor
  content = content.replace(/[\n\r]+/g, " "); // Remove quebras de linha
  content = content.replace(/\s+/g, " "); // Substitui múltiplos espaços por um único espaço
  content = content.replace(/>\s+</g, "><"); // Remove espaços entre tags

  // Retorna o conteúdo final, garantindo que espaços ao redor sejam removidos
  return content.trim();
};

export default html;
