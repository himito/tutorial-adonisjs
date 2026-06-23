/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const TodosController = () => import('#controllers/todos_controller')
const AuthController = () => import('#controllers/auth_controller')
const ProfileController = () => import('#controllers/profile_controller')
import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

router.get('/', () => {
  return { hello: 'world' }
})

// Todos routes
// router.get('/todos', [TodosController, 'index']).as('todos.index')
// router.post('/todos', [TodosController, 'store']).as('todos.store')
// router.get('/todos/:id', [TodosController, 'show']).as('todos.show')
// router.put('/todos/:id', [TodosController, 'update']).as('todos.update')
// router.delete('/todos/:id', [TodosController, 'destroy']).as('todos.destroy')

// Auth routes
router.post('register', [AuthController, 'register'])
router.post('login', [AuthController, 'login'])

router
  .group(() => {
    router.get('profile', [ProfileController, 'show'])
    router.post('logout', [AuthController, 'logout'])

    // Using resourceful routes
    router.resource('todos', TodosController).apiOnly().as('todos')
  })
  .use(middleware.auth())
