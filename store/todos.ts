import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import { Todo } from '~/types'

@Module({ name: 'todos', namespaced: true, stateFactory: true })
export default class TodoModule extends VuexModule {
  list: Todo[] = []

  @Mutation
  private setList(list: Todo[]) {
    this.list = list
  }

  @Mutation
  private addTodo(todo: Todo) {
    this.list.push(todo)
  }

  @Action
  fetch() {
    const list: Todo[] = [{ title: 'aaaa' }, { title: 'bbbb' }]
    this.setList(list)
  }

  @Action
  add(title: string) {
    this.addTodo({ title })
  }
}
