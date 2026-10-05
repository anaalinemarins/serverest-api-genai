const { test, expect } = require('@playwright/test');

test.describe('Autenticacao - POST /login', () => {
  test('API-001 - Login com credenciais validas', async ({ request }) => {
    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;

    expect(
      email,
      'Configure ADMIN_EMAIL no arquivo .env com um usuario de teste valido.'
    ).toBeTruthy();

    expect(
      password,
      'Configure ADMIN_PASSWORD no arquivo .env com a senha do usuario de teste.'
    ).toBeTruthy();

    const response = await request.post('/login', {
      data: { email, password }
    });

    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    // O contrato ServeRest utiliza "authorization" para devolver o token.
    expect(responseBody).toHaveProperty('authorization');
    expect(typeof responseBody.authorization).toBe('string');
    expect(responseBody.authorization.length).toBeGreaterThan(0);
  });
});