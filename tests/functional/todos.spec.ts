import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'

test.group('Todos', (group) => {
  group.each.setup(() => testUtils.db().truncate())

  test('list todos', async ({ client }) => {
    const res = await client.get('/todos')
    res.assertOk()
  })
})
