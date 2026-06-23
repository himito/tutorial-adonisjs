import Todo from '#models/todo'
import factory from '@adonisjs/lucid/factories'
import { UserFactory } from './user_factory.ts'

export const TodoFactory = factory
  .define(Todo, async ({ faker }) => {
    return {
      title: faker.lorem.sentence(),
      completed: faker.datatype.boolean(),
    }
  })
  .relation('user', () => UserFactory)
  .build()
