/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  todos: {
    index: typeof routes['todos.index']
    store: typeof routes['todos.store']
    show: typeof routes['todos.show']
    update: typeof routes['todos.update']
    destroy: typeof routes['todos.destroy']
  }
  auth: {
    register: typeof routes['auth.register']
    login: typeof routes['auth.login']
  }
  profile: {
    profile: {
      show: typeof routes['profile.profile.show']
    }
    auth: {
      logout: typeof routes['profile.auth.logout']
    }
  }
}
