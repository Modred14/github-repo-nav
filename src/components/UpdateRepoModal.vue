<template>
  <div>
    <button class="button-up" @click="openModal">Update Repo</button>
    <div v-if="isModalOpen" class="modal">
      <div class="modal-overlay" @click="closeModal"></div>
      <div class="modal-content">
        <div class="details-contain8">
          <div class="modal-header">
            <h2 class="text6">Update Repository</h2>
            <button class="modal-close-button" @click="closeModal">
              &times;
            </button>
          </div>
          <div class="modal-body">
            <div class="form-control">
              <label class="texth">Update Repository Name</label>
              <input
                placeholder="Update Repository Name"
                class="input"
                v-model="name"
              />
            </div>
            <div class="form-control">
              <label class="text2">Update Description</label>
              <input
                placeholder="Update Repository Description"
                class="input"
                v-model="description"
              />
            </div>
          </div>
          <footer class="modal-footer">
            <button class="save1" @click="handleSubmit">Save</button>
            <button class="cancel1" @click="closeModal">Cancel</button>
          </footer>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  repo: Object,
  onUpdate: Function,
});

const isModalOpen = ref(false);
const name = ref(props.repo.name || "");
const description = ref(props.repo.description || "");

const openModal = () => {
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

const handleSubmit = () => {
  props.onUpdate(props.repo.id, {
    name: name.value,
    description: description.value,
  });
  closeModal();
};

// Watch for prop changes and update local state accordingly
watch(
  () => props.repo,
  (newRepo) => {
    name.value = newRepo.name || "";
    description.value = newRepo.description || "";
  }
);
</script>

<style scoped>
@import "./RepositoryDetails.css";
.modal {
  color: black;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
}

.modal-content {
  position: relative;
  background: #fff;
  padding: 2rem;
  /* padding-left: 1rem; */
  border-radius: 10px;
  max-width: 500px;
  width: 100%;
  z-index: 1001;
  font-weight: 600;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-close-button {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  margin-top: -60px;
  margin-right: -25px;
}

.form-control {
  margin-bottom: 1rem;
}

.input {
  font-weight: 600;
  font-size: 18px;
  width: 96.5%;
  margin-bottom: 20px;
  height: 30px;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-top: 10px;
}
.input-language {
  font-weight: 600;
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.private {
  font-weight: 600;
  display: flex;
  align-items: center;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
}

.save1 {
  background-color: rgb(0, 194, 0);
  color: rgb(37, 26, 26);
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 0.5rem;
}
.save1:hover {
  background-color: rgba(0, 133, 0);
  color: aliceblue;
}
.cancel1 {
  background-color: rgb(255, 0, 0);
  color: rgb(71, 9, 9);
  padding: 0.5rem 1rem;
  font-weight: 600;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.cancel1:hover {
  background-color: rgb(180, 0, 0);
  color: #fff;
}
.texth,
.text2 {
  font-size: 20px;
  margin-bottom: 15px;
  font-weight: 700;
}
@media screen and (max-width: 390px) {
  .text6 {
    font-size: 20px;
  }
}
</style>
