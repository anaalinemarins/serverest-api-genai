const { test, expect } = require('@playwright/test');
const { validUserPayload } = require('../../../utils/test-data');
const { createUser } = require('../../../utils/api-helpers');

test.describe('Usuarios - /usuarios', () => {
  test('API-008 - Listar usuarios', async ({ request }) => {
    const response = await request.get('/usuarios');
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.quantidade).toBeGreaterThanOrEqual(0);
    expect(Array.isArray(body.usuarios)).toBeTruthy();
    expect(body.quantidade).toBe(body.usuarios.length);
  });

  test('API-009 - Criar usuario valido', async ({ request }) => {
    const payload = validUserPayload();
    const { response, body } = await createUser(request, payload);
    expect(response.status()).toBe(201);
    expect(body.message).toBeTruthy();
    expect(body._id).toBeTruthy();
  });

  test('API-010 - Criar usuario com email duplicado', async ({ request }) => {
    const payload = validUserPayload();
    const first = await createUser(request, payload);
    expect(first.response.status()).toBe(201);
    const second = await createUser(request, payload);
    expect(second.response.status()).toBe(400);
    expect(second.body.message).toBeTruthy();
  });

  test('API-011 - Buscar usuario por ID valido', async ({ request }) => {
    const payload = validUserPayload();
    const created = await createUser(request, payload);
    expect(created.response.status()).toBe(201);
    const response = await request.get(`/usuarios/${created.body._id}`);
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body._id).toBe(created.body._id);
    expect(body.email).toBe(payload.email);
  });

test('API-012 - Buscar usuario por ID inexistente', async ({ request }) => {
  const idInexistente = 'aaaaaaaaaaaaaaaa';
  const response = await request.get(`/usuarios/${idInexistente}`);
  const body = await response.json();
  expect(response.status()).toBe(400);
  expect(body.message).toBe('Usuário não encontrado');
});

  test('API-013 - Editar usuario valido', async ({ request }) => {
    const payload = validUserPayload();
    const created = await createUser(request, payload);
    expect(created.response.status()).toBe(201);
    const updatedPayload = { ...payload, nome: `${payload.nome} Atualizado` };
    const response = await request.put(`/usuarios/${created.body._id}`, { data: updatedPayload });
    expect([200, 201]).toContain(response.status());
    const body = await response.json();
    expect(body.message).toBeTruthy();
    const getResponse = await request.get(`/usuarios/${created.body._id}`);
    expect(getResponse.status()).toBe(200);
    const user = await getResponse.json();
    expect(user.nome).toBe(updatedPayload.nome);
    expect(user.email).toBe(updatedPayload.email);
  });

  test('API-014 - Excluir usuario', async ({ request }) => {
    const payload = validUserPayload();
    const created = await createUser(request, payload);
    expect(created.response.status()).toBe(201);
    const deleteResponse = await request.delete(`/usuarios/${created.body._id}`);
    expect(deleteResponse.status()).toBe(200);
    const getResponse = await request.get(`/usuarios/${created.body._id}`);
    expect(getResponse.status()).toBe(400);
  });
});
