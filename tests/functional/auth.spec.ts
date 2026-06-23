import { UserFactory } from '#database/factories/user_factory'
import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'

test.group('Authentication', (group) => {
  group.each.setup(() => testUtils.db().truncate())
  test('should register a new user and return a token', async ({ client, assert }) => {
    const payload = {
      fullName: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123',
      passwordConfirmation: 'password123',
    }

    const response = await client.post('/register').json(payload)

    response.assertCreated()
    response.assertBodyContains({
      user: {
        fullName: payload.fullName,
        email: payload.email,
      },
    })

    const body = response.body()
    assert.exists(body.token)
    assert.isString(body.token)
    assert.isNotEmpty(body.token)
  })

  test('login and return a token', async ({ client, assert }) => {
    const password = 'password123'
    const user = await UserFactory.merge({ password }).create()

    const response = await client.post('/login').json({ email: user.email, password })

    response.assertOk()

    const body = response.body()
    assert.exists(body.token)
    assert.isNotEmpty(body.token)
  })
})
