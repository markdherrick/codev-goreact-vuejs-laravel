import http from "./http-common";

class TodoDataService {
  getAll() {
    return http.get("/todo");
  }

  create(todo) {
    var FormData = require("form-data");
    var data = new FormData();
    data.append("title", todo.title);
    data.append("status", todo.status ? 1 : 0);

    return http
      .post("/todo/add", data)
      .then(function(response) {
        return response;
      })
      .catch(function(error) {
        return error;
      });
  }

  update(id, data) {
    return http.post(`/todo/update/${id}`, data);
  }

  delete(id) {
    return http.delete(`/todo/delete/${id}`);
  }
}

export default new TodoDataService();
