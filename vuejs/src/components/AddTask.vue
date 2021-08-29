<template>
  <v-dialog v-model="dialog" width="300px">
    <v-card>
      <v-card-title>
        <span class="text-h6">Create Task</span>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="2">
            <v-checkbox v-model="todo.status"></v-checkbox>
          </v-col>

          <v-col cols="10">
            <v-text-field
              label="Title"
              v-model="todo.title"
              required
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="dialog = false">
          Cancel
        </v-btn>
        <v-btn color="blue darken-1" text @click="addNewTask()">
          Add
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import TodoDataService from "../services/todo.service";

export default {
  data: () => ({
    dialog: false,
    todo: {
      title: "",
      status: false
    }
  }),
  props: {},
  methods: {
    showDialog(state) {
      this.dialog = state;
      this.todo.title = "";
      this.todo.status = false;
    },
    addNewTask() {
      console.log(this.todo);
      TodoDataService.create(this.todo)
        .then(response => {
          console.log(response);
          this.dialog = false;
          this.todo.title = "";
          this.todo.status = false;
          this.$emit("refreshTodoList");
          this.$emit("createTask", response);
        })
        .catch(e => {
          console.log("Error");
          console.log(e);
        });
    }
  }
};
</script>

<style></style>
