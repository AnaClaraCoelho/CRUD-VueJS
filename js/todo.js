var app = new Vue({
  el: "#app",
  data: {
    tasks: [],
    tempTitle: "",
    tempProject: "",
    tempDueTo: "",
  },
  methods: {
    getTasks() {
      fetch("http://localhost:3000/tasks")
        .then((response) => response.json())
        .then((tarefasJson) => {
          console.log(tarefasJson);
          this.tasks = tarefasJson;
        });
    },
    addTasks() {
      console.log(this.tempTitle);
      let data_ = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: this.tempTitle,
          project: this.tempProject,
          dueTo: this.tempDueTo,
        }),
      };
      fetch("http://localhost:3000/tasks", data_).then(() => {
        window.location.href = "http://127.0.0.1:5503/tasksList.html";
      });
    },
    editTasks() {},
  },
  created() {
    this.getTasks();
  },
});
