<template>
  <v-app id="inspire">
    <!-- <v-app-bar app color="white" flat> </v-app-bar> -->

    <v-main class="grey lighten-3 pa-4">
      <v-container>
        <v-row>
          <v-col sm="4"> </v-col>

          <v-col cols="12" sm="4">
            <v-card>
              <v-list flat>
                <v-subheader class="font-weight-bold text-uppercase"
                  >Today's Tasks</v-subheader
                >

                <v-list-item-group>
                  <!-- <v-list-item v-if="loading">
                    <v-list-item-content>
                      <v-progress-circular
                        indeterminate
                        color="primary"
                        class="w-100 text-center"
                      ></v-progress-circular>
                    </v-list-item-content>
                  </v-list-item> -->

                  <v-subheader
                    v-if="todos.length == 0"
                    class="text-center w-100"
                    >No task for today!</v-subheader
                  >

                  <v-list-item
                    v-for="todo in todos"
                    v-bind:key="todo.id"
                    class="pt-1 pb-1"
                    dense
                    v-else
                  >
                    <v-list-item-avatar>
                      <v-checkbox
                        :input-value="todo.status"
                        @click="editStatus(todo.id, todo)"
                      ></v-checkbox>
                    </v-list-item-avatar>

                    <v-list-item-content>
                      <v-list-item-title
                        :class="
                          todo.status ? 'text-decoration-line-through' : ''
                        "
                        >{{ todo.title }}</v-list-item-title
                      >
                    </v-list-item-content>

                    <v-list-item-action>
                      <v-icon @click="deleteTask(todo.id)" color="#EF5350">
                        mdi-delete
                      </v-icon>
                    </v-list-item-action>
                  </v-list-item>
                </v-list-item-group>
              </v-list>

              <v-fab-transition>
                <v-btn
                  color="primary"
                  fab
                  small
                  absolute
                  top
                  right
                  @click="addNewTask()"
                >
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </v-fab-transition>
            </v-card>

            <v-snackbar
              :style="{ 'margin-bottom': calculateAlertMargin(i) }"
              v-for="(s, i) in alerts"
              :key="i"
              v-model="s.show"
              :timeout="s.timeout"
              color="success"
              outlined
              @input="dismissAlert(i)"
            >
              {{ s.message }}
              <v-btn color="blue" text @click="hide(i)"> Close </v-btn>
            </v-snackbar>
          </v-col>

          <v-col sm="4"> </v-col>
        </v-row>
      </v-container>

      <add-task
        ref="addTaskDialog"
        @refreshTodoList="retrieveTodos()"
        @createTask="addAlert"
      ></add-task>
    </v-main>
  </v-app>
</template>

<script>
import AddTask from "./components/AddTask.vue";
import TodoDataService from "./services/todo.service";

export default {
  components: {
    AddTask
  },
  data: () => ({
    todos: [],
    alerts: [],
    loading: false
  }),
  mounted() {
    this.retrieveTodos();
  },
  methods: {
    retrieveTodos() {
      this.loading = true;

      TodoDataService.getAll()
        .then(response => {
          this.todos = response.data;
          this.loading = false;
        })
        .catch(e => {
          console.log(e);
        });
    },
    deleteTask(id) {
      TodoDataService.delete(id)
        .then(response => {
          this.retrieveTodos();
          this.addAlert(response);
        })
        .catch(e => {
          console.log(e);
        });
    },
    editStatus(id, data) {
      let todo = data;

      todo.status = !todo.status;

      TodoDataService.update(id, todo)
        .then(response => {
          this.retrieveTodos();
          this.addAlert(response);
        })
        .catch(e => {
          console.log("Error");
          console.log(e);
        });
    },
    addNewTask() {
      // this.dialog = !this.dialog;
      this.$refs.addTaskDialog.showDialog(true);
    },
    addAlert(response) {
      this.alerts.push({
        message: response.data,
        show: true,
        timeout: 3000
      });
    },
    calculateAlertMargin(i) {
      if (this.alerts.length == 0) {
        return "0px";
      } else {
        return i * 60 + "px";
      }
    },
    hide(i) {
      this.alerts.splice(i, 1);
    },
    dismissAlert(i) {
      if (this.alerts.length == 0) this.alerts = [];
      this.alerts.splice(i, 1);
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
