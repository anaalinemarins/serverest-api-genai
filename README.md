# ServeRest API — Automação de Testes com GenAI

Automação de testes de API utilizando **JavaScript + Playwright**, com foco em validação funcional, cenários negativos, autenticação e segurança.

O projeto utiliza a API [ServeRest](https://serverest.dev/) como aplicação de referência e explora o uso de **GenAI como apoio ao processo de criação, análise e evolução dos testes**.

## 🛠️ Tecnologias

- JavaScript
- Node.js
- Playwright
- ServeRest API
- Git / GitHub
- GenAI

## 📋 Cobertura

A suíte possui **31 testes automatizados**, distribuídos nas seguintes áreas:

| Área | Testes | Cobertura |
|---|---|---|
| Autenticação | API-001 a API-007 | Login, credenciais inválidas, campos obrigatórios e dados extremos |
| Usuários | API-008 a API-014 | Criação, consulta, edição, exclusão e duplicidade |
| Produtos | API-015 a API-019b | Consulta, criação, edição e exclusão |
| Carrinhos | API-020 a API-027 | Consulta, criação, compra, cancelamento e autenticação |
| Qualidade e Segurança | API-028 a API-030 | Exposição de dados, Content-Type e consistência |

O cenário API-019 foi dividido em:

- **API-019** — Editar produto com token inválido
- **API-019b** — Excluir produto com token inválido

## 📊 Resultado dos testes

Última execução da suíte completa:

```text
31 testes executados
29 passaram
2 falharam
93,5% de aprovação
```

As duas falhas foram mantidas como **achados de segurança**, pois representam comportamentos observados na API.

### 🔎 Achados

| ID | Cenário | Resultado |
|---|---|---|
| API-027 | Rota protegida com token inválido | API retorna `200 OK` e disponibiliza dados |
| API-028 | Senha não deve ser exposta | API retorna o campo `password` na resposta |

Esses resultados demonstram o uso dos testes automatizados também como ferramenta para **identificação de riscos e possíveis vulnerabilidades**.

## 🚀 Configuração

### Pré-requisitos

- Node.js
- npm

### Instalação

Clone o repositório e instale as dependências:

```bash
npm install
```

Instale os navegadores do Playwright:

```bash
npx playwright install
```

### Variáveis de ambiente

Copie `.env.example` para `.env` e configure as credenciais do usuário administrador:

```env
ADMIN_EMAIL=seu_email
ADMIN_PASSWORD=sua_senha
```

> O arquivo `.env` não deve ser versionado. Mantenha as credenciais protegidas.

## ▶️ Executando os testes

Execute toda a suíte:

```bash
npm run test:api
```

Execute um arquivo específico:

```bash
npx playwright test tests/api/auth/login.spec.js
```

Exemplo:

```bash
npx playwright test tests/api/usuarios/usuarios.spec.js
```

## 📊 Relatório

Após a execução dos testes, abra o relatório HTML:

```bash
npm run test:api:report
```

O relatório apresenta os resultados, duração, erros e detalhes da execução.

## 📁 Estrutura

```text
serverest-api-genai/
│
├── tests/
│   └── api/
│       ├── auth/
│       │   └── login.spec.js
│       ├── usuarios/
│       │   └── usuarios.spec.js
│       ├── produtos/
│       │   └── produtos.spec.js
│       ├── carrinhos/
│       │   └── carrinhos.spec.js
│       └── quality/
│           └── security.spec.js
│
├── .env.example
├── .gitignore
├── package.json
├── playwright.config.js
└── README.md
```

## 🤖 Uso de GenAI

A GenAI foi utilizada como apoio durante o desenvolvimento para:

- Identificação e expansão de cenários de teste;
- Análise de falhas;
- Interpretação das respostas da API;
- Revisão dos testes automatizados;
- Identificação de cenários negativos e riscos de segurança.

Os testes foram **executados e validados contra o comportamento real da API**, utilizando análise crítica do QA para ajustar as expectativas e os cenários.

## 🧪 Estratégia de testes

A suíte contempla:

- Cenários positivos e negativos;
- Validação de status HTTP;
- Validação do conteúdo das respostas;
- Autenticação e autorização;
- Validação de regras de negócio;
- Testes de consistência;
- Testes relacionados à segurança;
- Validação de dados retornados pela API.

## 📌 Próximos passos

- [ ] Adicionar execução em CI/CD;
- [ ] Ampliar cobertura de segurança;
- [ ] Adicionar validação de schema das respostas;
- [ ] Adicionar testes de performance;
- [ ] Melhorar geração e gerenciamento de dados de teste.

## 👩‍💻 Projeto

Projeto desenvolvido como parte da evolução prática em **QA, automação de testes de API e aplicação de GenAI em qualidade de software**.
