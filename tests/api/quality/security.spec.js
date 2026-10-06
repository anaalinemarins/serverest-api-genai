const { test, expect } = require('@playwright/test');
const { validUserPayload } = require('../../../utils/test-data');
const { createUser } = require('../../../utils/api-helpers');

test.describe('Qualidade e seguranca', () => {
  test('API-028 - Senha nao deve ser exposta na resposta de usuario', async ({ request }) => {
    const response = await request.get('/usuarios');
    expect(response.status()).toBe(200);
    const body = await response.json();
    for (const user of body.usuarios) {
      expect(user.password).toBeUndefined();
    }
  });

  test('API-029 - Resposta da API deve possuir Content-Type JSON', async ({ request }) => {
    const response = await request.get('/usuarios');
    expect(response.status()).toBe(200);
    const contentType = response.headers()['content-type'];
    expect(contentType).toContain('application/json');
  });

  test('API-030 - Consistencia apos criar e excluir usuario', async ({ request }) => {
    const payload = validUserPayload();
    const created = await createUser(request, payload);
    expect(created.response.status()).toBe(201);
    const getAfterCreate = await request.get(`/usuarios/${created.body._id}`);
    expect(getAfterCreate.status()).toBe(200);
    const createdBody = await getAfterCreate.json();
    expect(createdBody._id).toBe(created.body._id);
    expect(createdBody.email).toBe(payload.email);
    const deleted = await request.delete(`/usuarios/${created.body._id}`);
    expect(deleted.status()).toBe(200);
    const getAfterDelete = await request.get(`/usuarios/${created.body._id}`);
    expect(getAfterDelete.status()).toBe(400);
  });
});
