import { TodoFactory } from '#database/factories/todo_factory'
import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'

test.group('Todos', (group) => {
  group.each.setup(() => testUtils.db().truncate())

  test('list todos', async ({ client }) => {
    const res = await client.get('/todos')
    res.assertOk()
  })

  test('lists all todos', async ({ client, assert }) => {
    await TodoFactory.createMany(3)
    const res = await client.get('/todos')
    res.assertOk()

    // @ts-ignore
    assert.lengthOf(res.body(), 3)
  })

  test('get todo', async ({ client }) => {
    const todo = await TodoFactory.create()
    const res = await client.get(`/todos/${todo.id}`)
    res.assertOk()
  })

  test('create todo', async ({ client }) => {
    const res = await client.post('/todos').json({ title: 'Buy groceries' })
    res.assertCreated()
  })

  test('update todo', async ({ client }) => {
    const todo = await TodoFactory.create()
    const res = await client.put(`/todos/${todo.id}`).json({ title: 'Buy groceries and snacks' })
    res.assertOk()
  })

  test('delete todo', async ({ client }) => {
    const todo = await TodoFactory.create()
    const res = await client.delete(`/todos/${todo.id}`)
    res.assertNoContent()
  })

  test('rejects a too-short title', async ({ client }) => {
    const res = await client.post('/todos').json({ title: 'Hi' })

    res.assertUnprocessableEntity()
  })

  test('rejects anonymous', async ({ client }) => {
    const res = await client.get('/todos')

    res.assertUnauthorized()
  }).pin()
})
