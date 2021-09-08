<template>
  <div>
    <!-- Start sprint modal -->
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
            >
              Create sprint
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- Start work item modal -->
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
                  v-model="wi"
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
            >
              Create Workitem
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- End work item modal -->
    <div class="container px-4 ">
      <div class="row ">
        <div class="col mx-2  mb-4">
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
              <option selected>{{ actualSprint }}</option>
              <option
                v-for="item in sprintsList"
                :key="item.id"
                :value="item.sprint"
                >{{ item.sprint }}</option
              >
            </select>
          </div>
        </div>
        <div class="col">
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

      <div class="row g-1 ">
        <div class="col color-col-1  shadow ">
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
                >
                </workitem>
              </div>
            </div>
          </div>
        </div>

        <div class="col color-col-1 shadow ">
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
                >
                </workitem>
              </div>
            </div>
          </div>
        </div>

        <div class="col color-col-1 shadow">
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
                >
                </workitem>
              </div>
            </div>
          </div>
        </div>

        <div class="col color-col-1 shadow ">
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
      description: "",
      days: 0,
      wi: 0,
      error: true,
      isLoading: false,
    };
  },
  methods: {
    async createSprint() {
      console.log(this.newSprint);

      try {
        await this.$store.dispatch("workitem/insertSprint", {
          sprint: this.newSprint,
        });

        this.newSprint = 0;

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
      console.log(id);

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
        this.sprintsList = this.$store.getters["workitem/getSprints"];

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
    this.actualSprint = 23;
    this.loadSprints();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
