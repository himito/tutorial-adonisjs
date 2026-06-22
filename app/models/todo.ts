import { TodoSchema } from '#database/schema'
import User from '#models/user'
import { belongsTo } from '@adonisjs/lucid/orm'
import { type BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Todo extends TodoSchema {
  // a todo belongs to a user
  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>
}
