import Todo from '#models/todo'
import TodoPolicy from '#policies/todo_policy'
import { createTodoValidator } from '#validators/todo'
import type { HttpContext } from '@adonisjs/core/http'

export default class TodosController {
  async index({ response }: HttpContext) {
    return response.ok(await Todo.all())
  }
  async store({ request, response }: HttpContext) {
    const data = await request.validateUsing(createTodoValidator)
    return response.created(await Todo.create(data))
  }
  async show({ params, response }: HttpContext) {
    return response.ok(await Todo.findOrFail(params.id))
  }
  async update({ params, request, response }: HttpContext) {
    const todo = await Todo.findOrFail(params.id)
    todo.merge(request.only(['title', 'completed']))
    return response.ok(await todo.save())
  }
  async destroy({ params, response, bouncer }: HttpContext) {
    const todo = await Todo.findOrFail(params.id)

    // 403 unless this user owns the todo
    await bouncer.with(TodoPolicy).authorize('delete', todo)

    await todo.delete()
    return response.noContent()
  }
}
