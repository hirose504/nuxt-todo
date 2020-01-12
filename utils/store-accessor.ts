/* eslint-disable import/no-mutable-exports */
import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'
import TodoModule from '~/store/todos'

let todos: TodoModule

function initialiseStores(store: Store<any>): void {
  todos = getModule(TodoModule, store)
}

export { initialiseStores, todos }
