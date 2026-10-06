function uniqueEmail(prefix = 'qa') {
  return `${prefix}.${Date.now()}@example.com`;
}

function validUserPayload(overrides = {}) {
  return {
    nome: `QA User ${Date.now()}`,
    email: uniqueEmail('qa'),
    password: 'Teste@123456',
    administrador: 'false',
    ...overrides
  };
}

function validAdminPayload(overrides = {}) {
  return {
    nome: `QA Admin ${Date.now()}`,
    email: uniqueEmail('admin'),
    password: 'Teste@123456',
    administrador: 'true',
    ...overrides
  };
}

function validProductPayload(overrides = {}) {
  return {
    nome: `Produto QA ${Date.now()}`,
    preco: 100,
    descricao: 'Produto criado automaticamente para testes',
    quantidade: 10,
    ...overrides
  };
}

module.exports = { uniqueEmail, validUserPayload, validAdminPayload, validProductPayload };
