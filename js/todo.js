var app = new Vue({
  el: "#app",
  data: {
    search: '',
    loading: false,
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
      this.loading = true
      fetch("http://localhost:3000/tasks")
        .then((response) => response.json())
        .then((tarefasJson) => {
          this.tasks = tarefasJson;
          this.loading = false
        });
    },
    addTasks() {
      let dataConverted = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: this.task.tempTitle,
          project: this.task.tempProject,
          dueTo: this.task.tempDueTo,
        }),
      };
      fetch("http://localhost:3000/tasks/", dataConverted).then(() => {
        this.getTasks();
        this.modoAdicionar = false
      });
    },
    editTasks(tarefaId) {
      this.modoEditar = true;
      const tasking = this.tasks.filter((t) => t.id == tarefaId)[0];
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
    printTask() {
      let dataConverted = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: this.task.tempTitle,
          project: this.task.tempProject,
          dueTo: this.task.tempDueTo,
        }),
      };
      fetch(`http://localhost:3000/tasks/${this.task.id}`, dataConverted).then(
        () => {
          this.getTasks();
          this.modoEditar = false
        });
    },

  },
  created() {
    this.getTasks();
  },

  computed: {
    searchBar() {
      return this.tasks.filter((el) =>
        el.title.toLowerCase().includes(this.search.toLowerCase())
      )
    }
  },
});
