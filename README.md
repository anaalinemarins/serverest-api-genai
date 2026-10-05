# ServeRest API - Automacao com GenAI

Projeto inicial de automacao de API REST usando JavaScript + Playwright Test,
com apoio do ChatGPT na estrutura, geracao e revisao do codigo.

## Requisitos

- Node.js 18 ou superior (recomendado)
- npm
- Credenciais de um usuario administrador de teste no ambiente Compass UOL

## Instalar

```bash
npm install
npx playwright install
```

## Configurar credenciais

1. Copie `.env.example` para `.env`.
2. Preencha `ADMIN_EMAIL` e `ADMIN_PASSWORD` com credenciais de teste autorizadas.
3. Nao compartilhe nem versione o arquivo `.env`.

## Executar API-001

```bash
npm run test:api
```

O relatorio HTML e salvo em `playwright-report/`. Para abrir:

```bash
npm run report
```

## Primeiro cenario

| ID | Metodo/endpoint | Cenario | Resultado esperado |
|---|---|---|---|
| API-001 | POST /login | Login com credenciais validas | HTTP 200 e token `authorization` nao vazio |

## Decisoes e validacoes humanas

- O teste recebe credenciais por variaveis de ambiente; nenhum segredo fica no codigo.
- A assercao valida o status HTTP e a presenca/tipo/conteudo do token.
- O nome do campo `authorization` deve ser confirmado no contrato do ambiente Compass.
- O teste nao assume uma mensagem textual de sucesso, pois ela nao e necessaria para validar o criterio deste cenario.
- A execucao real depende de credenciais validas e acesso ao ambiente.

## Uso de GenAI

O ChatGPT foi utilizado para propor a estrutura inicial do projeto, gerar o primeiro teste,
sugerir o uso de variaveis de ambiente e revisar as assercoes. A pessoa responsavel deve
confirmar o contrato do ambiente, configurar credenciais autorizadas e executar o teste.
