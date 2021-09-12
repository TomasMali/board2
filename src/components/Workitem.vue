<template>
  <div>
    <div></div>

    <div class="card my-2 " :class="color">
      <div class="card-header" id="del">
        <h5 style="display: inline">
          <span class="badge bg-secondary">{{ wi }}</span>
        </h5>
        [{{ days }}]

        <div id="v-model-select" class="mx-1 demo" style="display: inline">
          <select
            :v-model="color"
            name="option"
            @change="onColorChange($event)"
          >
            <option value=""> {{ color }} </option>
            <option v-for="item in colors" :key="item" :value="item">
              {{ item }}
            </option>
          </select>
        </div>

        <div id="v-model-select" class="mx-1 demo" style="display: inline">
          <select
            :v-model="status"
            name="option"
            @change="onStatusChange($event)"
          >
            <option disabled selected value=""> {{ status }} </option>

            <option v-for="item in statusList" :key="item" :value="item">
              {{ item !== status ? item : "" }}
            </option>
          </select>
        </div>

        <button
          type="button"
          class="btn btn-link p-0 m-0"
          @click="$emit('delteWi', id)"
        >
          Del
        </button>
      </div>
      <div class="card-body  ">
        <div
          type="button"
          data-bs-toggle="modal"
          data-bs-target="#todo"
          data-bs-whatever="@mdo"
          @click="onDescClick"
        >
          <blockquote class="blockquote mb-0">
            <footer class="blockquote-footer">
              <small>
                {{ description }}
              </small>
            </footer>
          </blockquote>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    "id",
    "wi",
    "description",
    "days",
    "sprint",
    "status",
    "color",
    "todo",
  ],
  emits: ["workitemChange", "delteWi"],
  data() {
    return {
      colore: "red",
      colors: ["gold", "blue", "pink", "yellow", "cyan", "teal", "yell2"],

      statusList: ["N", "S", "T", "D"],
    };
  },
  methods: {
    onColorChange(event) {
      const colorToEmit = event.target.value;
      this.$emit("workitemChange", {
        id: this.id,
        wi: this.wi,
        description: this.description,
        days: this.days,
        sprint: this.sprint,
        status: this.status,
        color: colorToEmit,
        todo: this.todo,
      });
    },
    onStatusChange(event) {
      const statusToEmit = event.target.value;
      this.$emit("workitemChange", {
        id: this.id,
        wi: this.wi,
        description: this.description,
        days: this.days,
        sprint: this.sprint,
        status: statusToEmit,
        color: this.color,
        todo: this.todo,
      });
    },
    onDescClick() {
      this.$emit("onTodo", {
        id: this.id,
        wi: this.wi,
        description: this.description,
        days: this.days,
        sprint: this.sprint,
        status: this.status,
        color: this.color,
        todo: this.todo,
      });
    },
  },
  computed: {},
};
</script>

<style scoped>
#del {
  display: inline-block;
}
.gold {
  background-color: gold;
}
.pink {
  background-color: #efadce;
}
.yellow {
  background-color: yellow;
}
.yell2 {
  background-color: #ffe69c;
}
.blue {
  background-color: #6ea8fe;
}

.cyan {
  background-color: #6edff6;
}

.teal {
  background-color: #79dfc1;
}
</style>
