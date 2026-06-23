import User from '#models/user'
import factory from '@adonisjs/lucid/factories'
import { TodoFactory } from './todo_factory.ts'

export const UserFactory = factory
  .define(User, async ({ faker }) => {
    return {
      fullName: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    }
  })
  .relation('todos', () => TodoFactory)
  .build()
