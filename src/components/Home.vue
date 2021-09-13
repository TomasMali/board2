<template>
  <div>
    <!-- Modal Todo-->
    <div
      class="modal fade"
      id="todo"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-scrollable modal-xl">
        <div class="modal-content ">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              Todo for testing
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="form-floating">
              <div class="row">
                <div class="col text-center my-2 mb-4">
                  <button
                    class="btn btn-md btn-primary "
                    type="button"
                    @click="insertTodo"
                  >
                    Nuovo Todo
                  </button>
                </div>
              </div>

              <ul class="list-group">
                <li
                  class="list-group-item"
                  v-for="item in todosForWi"
                  :key="item.id"
                >
                  <div class="row">
                    <div class="col col-1 mt-3">
                      Done
                      <input
                        class="form-check-input me-1"
                        type="checkbox"
                        value=""
                        v-model="item.done"
                        aria-label="..."
                      />

                      <button
                        class="btn btn-sm btn-outline-primary mt-3 mb-2"
                        @click="saveTodo(item)"
                      >
                        Save
                      </button>
                      <button
                        class="btn btn-sm btn-outline-danger"
                        @click="deleteTodo(item.id)"
                      >
                        Delete
                      </button>
                    </div>
                    <div class="col col-11">
                      <textarea
                        :class="{
                          'done-color': item.done,
                          'not-done-color': !item.done,
                        }"
                        class="form-control"
                        id="exampleFormControlTextarea1"
                        v-model="item.todo"
                        rows="6"
                      ></textarea>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-md btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Create Sprint modal -->
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content modal-wi">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Nuovo Sprint</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div>
              <div class="mb-3">
                <label for="recipient-name" class="col-form-label"
                  >Sprint number:</label
                >
                <input
                  type="number"
                  name="createSprint"
                  v-model="newSprint"
                  class="form-control form-control-sm"
                  id="recipient-name"
                />
              </div>

              <div class="mb-3">
                <label for="recipient-name" class="col-form-label"
                  >Data inizio sprint:</label
                >
                <input
                  type="date"
                  name="createSprint"
                  v-model="newStartDate"
                  class="form-control form-control-sm"
                  id="recipient-name"
                />
              </div>
              <div class="mb-3">
                <label for="recipient-name" class="col-form-label"
                  >Data fine sprint:</label
                >
                <input
                  type="date"
                  name="createSprint"
                  v-model="newEndDate"
                  class="form-control form-control-sm"
                  id="recipient-name"
                />
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-sm btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              @click="createSprint"
              class="btn btn-sm  btn-primary"
              data-bs-dismiss="modal"
              :disabled="newStartDate == '' || newEndDate == ''"
            >
              Create sprint
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Create work item modal -->
    <div
      class="modal fade"
      id="workitemModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog  ">
        <div class="modal-content modal-wi">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Nuovo Workitem</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div>
              <div class="mb-3">
                <label for="recipient-name" class="col-form-label"
                  >Workitem:</label
                >
                <input
                  type="number"
                  name="createSprint"
                  v-model.number="wi"
                  class="form-control form-control-sm"
                  id="recipient-name"
                />

                <label for="recipient-name" class="col-form-label"
                  >Description:</label
                >
                <textarea
                  v-model="description"
                  class="form-control form-control-sm"
                  id="message-text"
                >
                </textarea>

                <label for="recipient-name" class="col-form-label"
                  >Story point:</label
                >
                <input
                  type="number"
                  name="createSprint"
                  v-model="days"
                  class="form-control  form-control-sm"
                  id="recipient-name"
                />
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              @click="createWorkitem"
              class="btn btn-primary"
              data-bs-dismiss="modal"
              :disabled="wi < 0 || wi > 999999999 || wi == ''"
            >
              Create Workitem
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- End  -->

    <!-- BOARD ###########################################################-->
    <div class="container px-4 ">
      <!-- CREATE BUTTON -->
      <div class="row ">
        <div class="col-sm mx-2  mb-sm-4">
          <div class="input-group input-group-sm mb-3">
            <label class="input-group-text" for="inputGroupSelect01"
              >Sprint</label
            >
            <select
              class="form-select"
              id="inputGroupSelect01"
              :v-model="actualSprint"
              @change="onChange($event)"
            >
              <option disabled :selected="actualSprint">{{
                actualSprint
              }}</option>
              <option
                v-for="item in sprintsList"
                :key="item.id"
                :value="item.sprint"
                >{{ item.sprint }}</option
              >
            </select>
          </div>
        </div>
        <div class="col-sm mb-3 ">
          <button
            type="button"
            class="btn btn-secondary btn-sm mx-4"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            data-bs-whatever="@mdo"
          >
            Crea sprint
          </button>
          <button
            type="button"
            class="btn btn-secondary btn-sm"
            data-bs-toggle="modal"
            data-bs-target="#workitemModal"
            data-bs-whatever="@mdo"
          >
            Crea Workitem
          </button>
        </div>
      </div>
      <!-- SHOW BOARD LIST-->
      <div class="row g-1 ">
        <div class="col-sm color-col-1  shadow ">
          <div class="mx-1">
            <div class="card-header  text-center mb-4 ">
              <b> To Do </b>
            </div>
            <div class=" dimention-column  ">
              <div v-for="item in wiTodo" :key="item.id">
                <workitem
                  :id="item.id"
                  :wi="item.wi"
                  :sprint="actualSprint"
                  :description="item.description"
                  :days="item.days"
                  :status="item.status"
                  :color="item.color"
                  @workitemChange="workitemUpdate"
                  @delteWi="delteWi"
                  @onTodo="onTodo"
                >
                </workitem>
              </div>
            </div>
          </div>
        </div>

        <div class="col-sm color-col-1 shadow ">
          <div class="mx-1">
            <div class="card-header  text-center mb-4 ">
              <b> Start Working </b>
            </div>
            <div class=" dimention-column mb-3 ">
              <div v-for="item in wiStart" :key="item.id">
                <workitem
                  :id="item.id"
                  :wi="item.wi"
                  :sprint="actualSprint"
                  :description="item.description"
                  :days="item.days"
                  :status="item.status"
                  :color="item.color"
                  @workitemChange="workitemUpdate"
                  @delteWi="delteWi"
                  @onTodo="onTodo"
                >
                </workitem>
              </div>
            </div>
          </div>
        </div>

        <div class="col-sm color-col-1 shadow">
          <div class="mx-1">
            <div class="card-header  text-center mb-4 ">
              <b>Test</b>
            </div>
            <div class=" dimention-column  ">
              <div v-for="item in wiTest" :key="item.id">
                <workitem
                  :id="item.id"
                  :wi="item.wi"
                  :sprint="actualSprint"
                  :description="item.description"
                  :days="item.days"
                  :status="item.status"
                  :color="item.color"
                  @workitemChange="workitemUpdate"
                  @delteWi="delteWi"
                  @onTodo="onTodo"
                >
                </workitem>
              </div>
            </div>
          </div>
        </div>

        <div class="col-sm color-col-1 shadow ">
          <div class="mx-1">
            <div class="card-header  text-center mb-4 ">
              <b>Done</b>
            </div>
            <div class=" dimention-column  ">
              <div v-for="item in wiDone" :key="item.id">
                <workitem
                  :id="item.id"
                  :wi="item.wi"
                  :sprint="actualSprint"
                  :description="item.description"
                  :days="item.days"
                  :status="item.status"
                  :color="item.color"
                  @workitemChange="workitemUpdate"
                  @delteWi="delteWi"
                  @onTodo="onTodo"
                >
                </workitem>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Workitem from "./Workitem.vue";

export default {
  components: {
    Workitem,
  },
  data() {
    return {
      wiTodo: [],
      wiStart: [],
      wiTest: [],
      wiDone: [],
      sprintsList: [],
      actualSprint: 0,
      newSprint: 0,
      newStartDate: "",
      newEndDate: "",
      description: "",
      days: 0,
      wi: 0,
      error: true,
      isLoading: false,
      wiFromWi: {},
      todosForWi: [],
    };
  },
  methods: {
    updateTodoList() {
      this.workitemUpdate(this.wiFromWi);
    },

    async insertTodo() {
      try {
        await this.$store.dispatch("todo/insertTodos_Action", {
          todo: "",
          done: false,
          workitem: this.wiFromWi.id,
        });

        this.loadTodos();
      } catch (error) {
        this.error = error.message || "Failed to authenticate";
      }
    },

    async saveTodo(item) {
      try {
        await this.$store.dispatch("todo/updateTodos_Action", item);

        this.loadTodos();
      } catch (error) {
        this.error = error.message || "Failed to authenticate";
      }
    },

    async createSprint() {
      try {
        await this.$store.dispatch("workitem/insertSprint", {
          sprint: this.newSprint,
          start: this.newStartDate,
          end: this.newEndDate,
        });

        this.newSprint = 0;
        this.newStartDate = "";
        this.newEndDate = "";

        this.loadSprints();
      } catch (error) {
        this.error = error.message || "Failed to authenticate";
      }
    },

    async createWorkitem() {
      try {
        await this.$store.dispatch("workitem/insertWorkitem", {
          wi: this.wi,
          description: this.description,
          days: this.days,
          sprint: this.actualSprint,
          status: "N",
          color: "yellow",
        });

        this.wi = 0;
        this.description = "";
        this.days = 0;

        this.loadSprints();
      } catch (error) {
        this.error = error.message || "Failed to authenticate";
      }
    },

    async delteWi(id) {
      if (
        confirm("Sei sicuro di voler cancellare questo workitem dal database?")
      ) {
        try {
          await this.$store.dispatch("workitem/deleteWorkitem", { id: id });
          this.loadBoard();
        } catch (error) {
          console.log(error);
        }
      } else return;
    },

    async deleteTodo(id) {
      if (confirm("Sei sicuro di voler cancellare questo todo dal database?")) {
        try {
          await this.$store.dispatch("todo/deleteTodos_Action", { id: id });
          this.loadTodos();
        } catch (error) {
          console.log(error);
        }
      } else return;
    },

    async workitemUpdate(item) {
      try {
        await this.$store.dispatch("workitem/updateWorkitem", item);
        this.loadBoard();
      } catch (error) {
        this.error = error.message || "Failed to authenticate";
      }
    },

    onChange(event) {
      this.actualSprint = event.target.value;
      this.loadBoard();
    },

    async loadTodos() {
      try {
        await this.$store.dispatch("todo/getTodos_Action", {
          workitem: this.wiFromWi.id,
        });
        this.todosForWi = await this.$store.getters["todo/getTodos"];
        //  this.loadBoard();
      } catch (error) {
        console.log(error);
      }
    },

    onTodo(wiFromWi) {
      this.wiFromWi = wiFromWi;
      this.loadTodos();
    },

    async loadBoard() {
      try {
        await this.$store.dispatch("workitem/getWorkitems", {
          sprint: this.actualSprint,
        });

        var wis = this.$store.getters["workitem/getWorkitems"];

        this.wiTodo = wis.filter((el) => {
          return el.sprint == this.actualSprint && el.status === "N";
        });

        this.wiStart = wis.filter((el) => {
          return el.sprint == this.actualSprint && el.status === "S";
        });

        this.wiTest = wis.filter((el) => {
          return el.sprint == this.actualSprint && el.status === "T";
        });

        this.wiDone = wis.filter((el) => {
          return el.sprint == this.actualSprint && el.status === "D";
        });
      } catch (error) {
        console.log(error);
      }
    },
    async loadSprints() {
      try {
        await this.$store.dispatch("workitem/getSprints");
        this.sprintsList = await this.$store.getters["workitem/getSprints"];
        // Default sprint allways the max sprint
        let maxSprint = 0;
        this.sprintsList.forEach((el) => {
          if (Number(el.sprint) > maxSprint) maxSprint = Number(el.sprint);
        });
        this.actualSprint = maxSprint;
        this.loadBoard();
      } catch (error) {
        console.log(error);
      }
    },
    handleError() {
      this.error = null;
      this.typeDialog = null;
    },
  },
  created() {
    this.loadSprints();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.done-color {
  color: brown;
  text-decoration: line-through;
}

.not-done-color {
  color: blue;
}

.color-col-1 {
  background-color: gainsboro;
  margin-left: 8px;
}

.dimention-column {
  height: 680px;
  max-height: calc(100vh - 200px);
  overflow-y: auto;
}

.shadow {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  border-radius: 5px; /* 5px rounded corners */
}

.modal-wi {
  background-color: rgb(207, 213, 219);
}
</style>
