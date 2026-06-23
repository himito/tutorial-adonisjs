import type Todo from '#models/todo'
import type User from '#models/user'
import { BasePolicy } from '@adonisjs/bouncer'

export default class TodoPolicy extends BasePolicy {
  delete(user: User, todo: Todo) {
    return user.id === todo.userId
  }
}
