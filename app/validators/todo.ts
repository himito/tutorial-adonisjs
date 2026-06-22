import vine from '@vinejs/vine'

export const createTodoValidator = vine.create({
  title: vine.string().trim().minLength(3).maxLength(255),
  completed: vine.boolean().optional(),
})
