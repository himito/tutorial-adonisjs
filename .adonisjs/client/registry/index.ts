/* eslint-disable prettier/prettier */
import type { AdonisEndpoint } from '@tuyau/core/types'
import type { Registry } from './schema.d.ts'
import type { ApiDefinition } from './tree.d.ts'

const placeholder: any = {}

const routes = {
  'auth.register': {
    methods: ["POST"],
    pattern: '/register',
    tokens: [{"old":"/register","type":0,"val":"register","end":""}],
    types: placeholder as Registry['auth.register']['types'],
  },
  'auth.login': {
    methods: ["POST"],
    pattern: '/login',
    tokens: [{"old":"/login","type":0,"val":"login","end":""}],
    types: placeholder as Registry['auth.login']['types'],
  },
  'profile.show': {
    methods: ["GET","HEAD"],
    pattern: '/profile',
    tokens: [{"old":"/profile","type":0,"val":"profile","end":""}],
    types: placeholder as Registry['profile.show']['types'],
  },
  'auth.logout': {
    methods: ["POST"],
    pattern: '/logout',
    tokens: [{"old":"/logout","type":0,"val":"logout","end":""}],
    types: placeholder as Registry['auth.logout']['types'],
  },
  'todos.index': {
    methods: ["GET","HEAD"],
    pattern: '/todos',
    tokens: [{"old":"/todos","type":0,"val":"todos","end":""}],
    types: placeholder as Registry['todos.index']['types'],
  },
  'todos.store': {
    methods: ["POST"],
    pattern: '/todos',
    tokens: [{"old":"/todos","type":0,"val":"todos","end":""}],
    types: placeholder as Registry['todos.store']['types'],
  },
  'todos.show': {
    methods: ["GET","HEAD"],
    pattern: '/todos/:id',
    tokens: [{"old":"/todos/:id","type":0,"val":"todos","end":""},{"old":"/todos/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['todos.show']['types'],
  },
  'todos.update': {
    methods: ["PUT","PATCH"],
    pattern: '/todos/:id',
    tokens: [{"old":"/todos/:id","type":0,"val":"todos","end":""},{"old":"/todos/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['todos.update']['types'],
  },
  'todos.destroy': {
    methods: ["DELETE"],
    pattern: '/todos/:id',
    tokens: [{"old":"/todos/:id","type":0,"val":"todos","end":""},{"old":"/todos/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['todos.destroy']['types'],
  },
} as const satisfies Record<string, AdonisEndpoint>

export { routes }

export const registry = {
  routes,
  $tree: {} as ApiDefinition,
}

declare module '@tuyau/core/types' {
  export interface UserRegistry {
    routes: typeof routes
    $tree: ApiDefinition
  }
}
