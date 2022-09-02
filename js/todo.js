var app = new Vue({
  el: "#app",
  data: {
    tasks: [],
    task: {
      "tempTitle": null,
      "tempProject": null,
      "tempDueTo": null,
    },
    modoAdicionar: false,
    modoEditar: false,
  },
  methods: {
    getTasks() {
      fetch("http://localhost:3000/tasks")
        .then((response) => response.json())
        .then((tarefasJson) => {
          this.tasks = tarefasJson;
        });
    },
    addTasks() {
      let data = {
        title: this.task.tempTitle,
        project: this.task.tempProject,
        dueTo: this.task.tempDueTo,
      };
      let dataConverted = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      };
      fetch("http://localhost:3000/tasks", dataConverted).then(() => {
        this.getTasks();
      });
    },
    editTasks(tarefaId) {
      this.modoEditar = true;
      const tasking = this.tasks.filter((t) => t.id == tarefaId)[0];
      console.log(tasking)
      this.task.id = tasking.id
      this.task.tempTitle = tasking.title
      this.task.tempProject = tasking.project
      this.task.tempDueTo = tasking.dueTo
    },
    deleteTasks(tarefaId) {
      axios.delete(`http://localhost:3000/tasks/${tarefaId}`).then(() => {
        this.getTasks();
      });
    },
  },
  created() {
    this.getTasks();
  },
});
