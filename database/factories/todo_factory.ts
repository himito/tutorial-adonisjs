import Todo from '#models/todo'
import factory from '@adonisjs/lucid/factories'

export const TodoFactory = factory
  .define(Todo, async ({ faker }) => {
    return {
      title: faker.lorem.sentence(),
      completed: faker.datatype.boolean(),
    }
  })
  .build()
