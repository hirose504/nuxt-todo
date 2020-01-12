<template>
  <div>
    <ul>
      <li v-for="todo in todos" :key="todo.index">
        {{ todo.title }}
      </li>
    </ul>
    <v-form ref="form" v-model="valid" @submit.prevent="add">
      <v-text-field
        ref="input"
        v-model="title"
        :rules="titleRules"
        :counter="20"
        label="Title"
        required
      />
      <v-btn :disabled="!valid" color="success" @click="add">ADD</v-btn>
      <v-btn color="error" @click="reset">RESET</v-btn>
    </v-form>
    <v-snackbar v-model="snackbar" top>
      {{ message }}
      <v-btn color="pink" text @click="snackbar = false">
        Close
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Ref } from 'vue-property-decorator'
import { todos } from '~/store'
import { Todo } from '~/types'

@Component({
  fetch() {
    todos.fetch()
  }
})
export default class PageIndex extends Vue {
  @Ref() readonly form!: HTMLFormElement
  @Ref() readonly input!: HTMLInputElement

  valid: boolean = false

  title: string = ''
  titleRules: Function[] = [
    (v: string) => !!v || 'Title is required',
    (v: string) =>
      (v && v.length <= 20) || 'Title must be less than 20 characters'
  ]

  message: string = ''
  snackbar: boolean = false

  get todos(): Todo[] {
    return todos.list
  }

  add() {
    if (this.form.validate()) {
      todos.add(this.title)
      this.input.blur()
      this.message = 'Todo is added.'
      this.snackbar = true
      this.reset()
    }
  }

  reset() {
    this.form.reset()
  }
}
</script>
