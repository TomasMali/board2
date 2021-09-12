<template>
  <div>
    <div
      class="modal fade"
      id="todo"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content modal-wi">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Todo for testing</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            {{ desc }}
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
  </div>
</template>

<script>
export default {
  props: ["desc"],
  data() {
    return {};
  },

  methods: {},
};
</script>

<style scoped></style>
