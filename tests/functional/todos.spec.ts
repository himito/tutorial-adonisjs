import { TodoFactory } from '#database/factories/todo_factory'
import { UserFactory } from '#database/factories/user_factory'
import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'

test.group('Todos', (group) => {
  group.each.setup(() => testUtils.db().truncate())

  test('list todos', async ({ client }) => {
    const user = await UserFactory.create()
    const res = await client.get('/todos').loginAs(user)
    res.assertOk()
  })

  test('lists all todos', async ({ client, assert }) => {
    await TodoFactory.createMany(3)

    const user = await UserFactory.create()
    const res = await client.get('/todos').loginAs(user)
    res.assertOk()

    // @ts-ignore
    assert.lengthOf(res.body(), 3)
  })

  test('get todo', async ({ client }) => {
    const todo = await TodoFactory.create()

    const user = await UserFactory.create()
    const res = await client.get(`/todos/${todo.id}`).loginAs(user)
    res.assertOk()
  })

  test('create todo', async ({ client }) => {
    const user = await UserFactory.create()
    const res = await client.post('/todos').json({ title: 'Buy groceries' }).loginAs(user)
    res.assertCreated()
  })

  test('update todo', async ({ client }) => {
    const todo = await TodoFactory.create()
    const user = await UserFactory.create()

    const res = await client
      .put(`/todos/${todo.id}`)
      .json({ title: 'Buy groceries and snacks' })
      .loginAs(user)
    res.assertOk()
  })

  test('rejects a too-short title', async ({ client }) => {
    const user = await UserFactory.create()
    const res = await client.post('/todos').json({ title: 'Hi' }).loginAs(user)

    res.assertUnprocessableEntity()
  })

  test('rejects anonymous', async ({ client }) => {
    const res = await client.get('/todos')

    res.assertUnauthorized()
  })

  test('owner-only delete', async ({ client }) => {
    const owner = await UserFactory.create()
    const todo = await TodoFactory.merge({ userId: owner.id }).create()

    const res = await client.delete(`/todos/${todo.id}`).loginAs(owner)

    res.assertNoContent()
  })

  test('owner-only delete (intruder)', async ({ client }) => {
    const intruder = await UserFactory.create()
    const todo = await TodoFactory.create()

    const res = await client.delete(`/todos/${todo.id}`).loginAs(intruder)

    res.assertForbidden()
  })
})
