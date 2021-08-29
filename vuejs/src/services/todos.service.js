import axios from "axios";

const API_URL = "http://localhost:8000/api";

class TodoService {
  getTodos() {
    return axios
      .get(API_URL + "/todo")
      .then(function(response) {
        return response;
      })
      .catch(function(error) {
        return error;
      });
  }
  createTodo(todo) {
    var FormData = require("form-data");
    var data = new FormData();
    data.append("title", todo.title);
    data.append("status", todo.status);

    var config = {
      method: "post",
      url: API_URL + "/todo/add",
      data: data
    };

    return axios(config)
      .then(function(response) {
        return response;
      })
      .catch(function(error) {
        return error;
      });
  }
  editTodo(id) {
    return axios
      .get(API_URL + "/todo/edit/" + id)
      .then(function(response) {
        return response;
      })
      .catch(function(error) {
        return error;
      });
  }
  updateTodo(id, todo) {
    var FormData = require("form-data");
    var data = new FormData();
    data.append("title", todo.title);
    data.append("status", todo.status);

    var config = {
      method: "post",
      url: API_URL + "/todo/update/" + id,
      data: data
    };

    return axios(config)
      .then(function(response) {
        return response;
      })
      .catch(function(error) {
        return error;
      });
  }
  deleteTodo(id) {
    return axios
      .delete(API_URL + "/todo/delete/" + id)
      .then(function(response) {
        return response;
      })
      .catch(function(error) {
        return error;
      });
  }
}

export default new TodoService();
