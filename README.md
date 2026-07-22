# WorldScope

WorldScope é um explorador responsivo de países desenvolvido para o desafio de front-end da KNEX.

## Executando localmente

1. Crie uma conta no [REST Countries](https://restcountries.com) e registre `localhost` nas origens permitidas pela chave.
2. Copie `.env.example` para `.env` e adicione sua chave:
   ```bash
   VITE_RESTCOUNTRIES_API_KEY=sua_chave_aqui
   ```
3. Instale e execute:
   ```bash
   npm install
   npm run dev
   ```

## Decisões

- **React + TypeScript + Vite:** uma configuração enxuta e tipada para o cliente.
- **Serviço único de API:** todas as chamadas HTTP ficam em `src/services/countries.ts`; os componentes permanecem focados na interface.
- **Cache:** a lista completa de países é armazenada em cache no `localStorage` por 72 horas. Isso mantém a navegação e a filtragem instantâneas, respeitando o período de cache de três dias documentado pelo REST Countries.
- **Filtros no cliente:** após as três chamadas paginadas à API necessárias para obter a lista completa, a busca, a filtragem e a ordenação não consomem mais cota.
- **i18n:** as strings da interface em inglês e português são centralizadas em `src/i18n`; os nomes dos países em português usam o campo de tradução da API quando disponível.
- **Tema:** os modos claro, escuro e do sistema são persistidos no `localStorage`.

## Estrutura do projeto

`components/` componentes reutilizáveis da interface - `pages/` composição das telas da aplicação - `services/` camada de acesso à API - `hooks/` gerenciamento do estado dos dados - `types/` contratos da API - `utils/` funções utilitárias para exibição e formatação.
