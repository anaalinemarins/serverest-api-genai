const { test, expect } = require('@playwright/test');
const { validAdminPayload } = require('../../../utils/test-data');
const { createAdminAndLogin, getFirstProduct } = require('../../../utils/api-helpers');

test.describe('Carrinhos - /carrinhos', () => {
  test('API-020 - Listar carrinhos', async ({ request }) => {
    const response = await request.get('/carrinhos');
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.quantidade).toBeGreaterThanOrEqual(0);
    expect(Array.isArray(body.carrinhos)).toBeTruthy();
  });

  test('API-021 - Criar carrinho autenticado', async ({ request }) => {
    const { token } = await createAdminAndLogin(request, validAdminPayload());
    const product = await getFirstProduct(request);
    const response = await request.post('/carrinhos', {
      headers: { Authorization: token },
      data: { produtos: [{ idProduto: product._id, quantidade: 1 }] }
    });
    expect(response.status()).toBe(201);
    const body = await response.json();
    expect(body._id).toBeTruthy();
    await request.delete('/carrinhos/cancelar-compra', { headers: { Authorization: token } });
  });

  test('API-022 - Criar segundo carrinho para o mesmo usuario', async ({ request }) => {
    const { token } = await createAdminAndLogin(request, validAdminPayload());
    const product = await getFirstProduct(request);
    const payload = { produtos: [{ idProduto: product._id, quantidade: 1 }] };
    const first = await request.post('/carrinhos', { headers: { Authorization: token }, data: payload });
    expect(first.status()).toBe(201);
    const second = await request.post('/carrinhos', { headers: { Authorization: token }, data: payload });
    expect(second.status()).toBe(400);
    const body = await second.json();
    expect(body.message).toBeTruthy();
    await request.delete('/carrinhos/cancelar-compra', { headers: { Authorization: token } });
  });

  test('API-023 - Criar carrinho com produto inexistente', async ({ request }) => {
    const { token } = await createAdminAndLogin(request, validAdminPayload());
    const response = await request.post('/carrinhos', {
      headers: { Authorization: token },
      data: { produtos: [{ idProduto: '000000000000000000', quantidade: 1 }] }
    });
    expect(response.status()).toBe(400);
    const body = await response.json();
    expect(body.message).toBeTruthy();
  });

  test('API-024 - Criar carrinho com quantidade acima do estoque', async ({ request }) => {
    const { token } = await createAdminAndLogin(request, validAdminPayload());
    const product = await getFirstProduct(request);
    const response = await request.post('/carrinhos', {
      headers: { Authorization: token },
      data: { produtos: [{ idProduto: product._id, quantidade: product.quantidade + 1 }] }
    });
    expect(response.status()).toBe(400);
    const body = await response.json();
    expect(body.message).toBeTruthy();
  });

  test('API-025 - Concluir compra', async ({ request }) => {
    const { token } = await createAdminAndLogin(request, validAdminPayload());
    const product = await getFirstProduct(request);
    const cart = await request.post('/carrinhos', {
      headers: { Authorization: token },
      data: { produtos: [{ idProduto: product._id, quantidade: 1 }] }
    });
    expect(cart.status()).toBe(201);
    const response = await request.delete('/carrinhos/concluir-compra', { headers: { Authorization: token } });
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.message).toBeTruthy();
  });

  test('API-026 - Cancelar compra', async ({ request }) => {
    const { token } = await createAdminAndLogin(request, validAdminPayload());
    const product = await getFirstProduct(request);
    const cart = await request.post('/carrinhos', {
      headers: { Authorization: token },
      data: { produtos: [{ idProduto: product._id, quantidade: 1 }] }
    });
    expect(cart.status()).toBe(201);
    const response = await request.delete('/carrinhos/cancelar-compra', { headers: { Authorization: token } });
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.message).toBeTruthy();
  });

test('API-027 - Rota protegida com token invalido', async ({ request }) => {
  const response = await request.get('/carrinhos', {
    headers: {
      Authorization: 'Bearer token-invalido'
    }
  });

  const body = await response.json();

  console.log('API-027 STATUS:', response.status());
  console.log('API-027 BODY:', body);

  expect(response.status()).toBe(401);
});
});
