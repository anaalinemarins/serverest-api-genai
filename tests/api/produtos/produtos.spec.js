const { test, expect } = require('@playwright/test');
const { validAdminPayload, validUserPayload, validProductPayload } = require('../../../utils/test-data');
const { createAdminAndLogin, getFirstProduct } = require('../../../utils/api-helpers');

test.describe('Produtos - /produtos', () => {
  test('API-015 - Listar produtos', async ({ request }) => {
    const response = await request.get('/produtos');
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.quantidade).toBeGreaterThanOrEqual(0);
    expect(Array.isArray(body.produtos)).toBeTruthy();
    expect(body.quantidade).toBe(body.produtos.length);
  });

  test('API-016 - Criar produto com usuario administrador', async ({ request }) => {
    const { token } = await createAdminAndLogin(request, validAdminPayload());
    const response = await request.post('/produtos', { headers: { Authorization: token }, data: validProductPayload() });
    expect(response.status()).toBe(201);
    const body = await response.json();
    expect(body._id).toBeTruthy();
    await request.delete(`/produtos/${body._id}`, { headers: { Authorization: token } });
  });

  test('API-017 - Criar produto sem token', async ({ request }) => {
    const response = await request.post('/produtos', { data: validProductPayload() });
    expect(response.status()).toBe(401);
    const body = await response.json();
    expect(body.message).toBeTruthy();
  });

  test('API-018 - Criar produto com usuario nao administrador', async ({ request }) => {
    const userPayload = validUserPayload();
    const created = await request.post('/usuarios', { data: userPayload });
    expect(created.status()).toBe(201);
    const loginResponse = await request.post('/login', { data: { email: userPayload.email, password: userPayload.password } });
    expect(loginResponse.status()).toBe(200);
    const loginBody = await loginResponse.json();
    const response = await request.post('/produtos', { headers: { Authorization: loginBody.authorization }, data: validProductPayload() });
    expect(response.status()).toBe(403);
    const body = await response.json();
    expect(body.message).toBeTruthy();
  });

  test('API-019 - Editar produto com token invalido', async ({ request }) => {
    const product = await getFirstProduct(request);
    const response = await request.put(`/produtos/${product._id}`, {
      headers: { Authorization: 'Bearer token-invalido' },
      data: validProductPayload({ nome: `${product.nome} alterado` })
    });
    expect(response.status()).toBe(401);
  });

  test('API-019b - Excluir produto com token invalido', async ({ request }) => {
    const product = await getFirstProduct(request);
    const response = await request.delete(`/produtos/${product._id}`, { headers: { Authorization: 'Bearer token-invalido' } });
    expect(response.status()).toBe(401);
  });
});
