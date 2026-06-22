import { test } from '@japa/runner'

test.group('Health', () => {
  test('server is alive', async ({ client }) => {
    const res = await client.get('/')
    res.assertOk()
  })
})
