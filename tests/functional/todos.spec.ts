import Todo from '#models/todo'
import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'

test.group('Todos', (group) => {
  group.each.setup(() => testUtils.db().truncate())

  test('list todos', async ({ client }) => {
    const res = await client.get('/todos')
    res.assertOk()
  })

  test('get todo', async ({ client }) => {
    const todo = await Todo.create({ title: 'Buy groceries' })
    const res = await client.get(`/todos/${todo.id}`)
    res.assertOk()
  })

  test('create todo', async ({ client }) => {
    const res = await client.post('/todos').json({ title: 'Buy groceries' })
    res.assertCreated()
  })

  test('update todo', async ({ client }) => {
    const todo = await Todo.create({ title: 'Buy groceries' })
    const res = await client.put(`/todos/${todo.id}`).json({ title: 'Buy groceries and snacks' })
    res.assertOk()
  })

  test('delete todo', async ({ client }) => {
    const todo = await Todo.create({ title: 'Buy groceries' })
    const res = await client.delete(`/todos/${todo.id}`)
    res.assertNoContent()
  })
})
