const { expect } = require('@playwright/test');

async function login(request, email, password) {
  const response = await request.post('/login', { data: { email, password } });
  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(body.authorization).toBeTruthy();
  return { token: body.authorization, body };
}

async function createUser(request, payload) {
  const response = await request.post('/usuarios', { data: payload });
  const body = await response.json();
  return { response, body };
}

async function createAdminAndLogin(request, payload) {
  const created = await createUser(request, payload);
  expect(created.response.status()).toBe(201);
  const logged = await login(request, payload.email, payload.password);
  return { userId: created.body._id, token: logged.token };
}

async function getFirstProduct(request) {
  const response = await request.get('/produtos');
  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(body.produtos.length).toBeGreaterThan(0);
  return body.produtos[0];
}

module.exports = { login, createUser, createAdminAndLogin, getFirstProduct };
