const { test, expect } = require('@playwright/test');

test.describe('Autenticacao - POST /login', () => {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  test('API-001 - Login com credenciais validas', async ({ request }) => {
    const response = await request.post('/login', { data: { email: adminEmail, password: adminPassword } });
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.message).toBeTruthy();
    expect(body.authorization).toBeTruthy();
  });

  test('API-002 - Login com senha invalida', async ({ request }) => {
    const response = await request.post('/login', { data: { email: adminEmail, password: 'SenhaInvalida@123' } });
    expect(response.status()).toBe(401);
    const body = await response.json();
    expect(body.message).toBeTruthy();
  });

  test('API-003 - Login com email nao cadastrado', async ({ request }) => {
    const response = await request.post('/login', { data: { email: 'usuario.nao.cadastrado@example.com', password: 'Teste@123456' } });
    expect(response.status()).toBe(401);
    const body = await response.json();
    expect(body.message).toBeTruthy();
  });

test('API-004 - Login sem email', async ({ request }) => {
  const response = await request.post('/login', {
    data: { password: adminPassword }
  });

  const body = await response.json();

  expect(response.status()).toBe(400);
  expect(body.email).toBe('email é obrigatório');
});

test('API-005 - Login sem senha', async ({ request }) => {
  const response = await request.post('/login', {
    data: { email: adminEmail }
  });

  const body = await response.json();

  expect(response.status()).toBe(400);
  expect(body.password).toBe('password é obrigatório');
});

test('API-006 - Login com payload vazio', async ({ request }) => {
  const response = await request.post('/login', {
    data: {}
  });

  const body = await response.json();

  expect(response.status()).toBe(400);
  expect(body.email).toBe('email é obrigatório');
  expect(body.password).toBe('password é obrigatório');
  expect(body.authorization).toBeUndefined();
});


  test('API-007 - Login com email e senha em tamanho extremo', async ({ request }) => {
    const longEmail = `${'a'.repeat(250)}@example.com`;
    const longPassword = 'A'.repeat(1000);
    const response = await request.post('/login', { data: { email: longEmail, password: longPassword } });
    expect([400, 401]).toContain(response.status());
  });
});
