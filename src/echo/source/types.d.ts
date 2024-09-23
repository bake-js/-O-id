declare global {
  namespace JSX {
    interface IntrinsicElements {
      /**
       * O componente `o-echo-source` interage com o Echo Event Bus para reagir a eventos
       * e gerenciar ações com base nas mudanças de atributos.
       *
       * @description
       * O atributo `on` especifica o evento ao qual o `o-echo-source` deve reagir, podendo ser usado
       * em sistemas onde componentes necessitam se comunicar e reagir a eventos disparados por outros
       * componentes ou APIs externas.
       *
       * @example
       * <o-text-field name="cidade" label="Cidade" readonly>
       *   <o-echo-source on="viaCEP/success:setter/value|prop=localidade"></o-echo-source>
       * </o-text-field>
       */
      "o-echo-source": {
        /** O atributo `on` define o evento ao qual o componente reage, no formato `target/event:action|prop=property`. */
        on: string;
      };
    }
  }
}
