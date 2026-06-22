import Todo from '#models/todo'
import type { HttpContext } from '@adonisjs/core/http'

export default class TodosController {
  /**
   * Display a list of todos
   */
  async index({ response }: HttpContext) {
    const todos = await Todo.all()
    return response.ok(todos)
  }
}
