<template>
  <ErrorBoundary>
    <Box v-if="repository" class="details-container">
      <Text class="repository-name">{{ repository.name }}</Text>
      <Text class="repository-description">{{ repository.description }}</Text>
      <Box class="repository-details">
        <Text>Stars: {{ repository.stargazers_count }}</Text>
        <Text>Language: {{ repository.language }}</Text>
        <Text>Forks: {{ repository.forks_count }}</Text>
        <Text>Owner: {{ repository.owner.login }}</Text>
        <Text>ID: {{ repository.id }}</Text>
        <Text>Size: {{ repository.size }}</Text>
        <Text>Clone Url: {{ repository.clone_url }}</Text>
        <Text>Website: {{ repository.homepage || "N/A" }}</Text>
        <Text
          >License:
          {{ repository.license ? repository.license.name : "N/A" }}</Text
        >
      </Box>
      <div class="button-grid">
        <UpdateRepoModal :repo="repository" @update="handleUpdate" />
        <div>
          <Button class="button-del" @click="handleDelete(repository.id)">
            Delete Repo
          </Button>
        </div>
      </div>
      <RouterLink to="/" class="go-home-link">HOME</RouterLink>
    </Box>
    <NotFound v-else-if="error" />
    <div v-else-if="!repository && !isLoading" class="details-container">
      <NotFound />
    </div>
    <Box
      class="details-container"
      top="50%"
      text-align="center"
      v-else="isLoading"
    >
      <Spinner top="50%" />
      <Text>Loading repository details...</Text>
    </Box>
  </ErrorBoundary>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter, RouterLink } from "vue-router";
import axios from "axios";
import NotFound from "./NotFound.vue";
import Spinner from "./Spinner.vue";
import UpdateRepoModal from "./UpdateRepoModal.vue";
import ErrorBoundary from "./ErrorBoundary.vue";

const token =
  import.meta.env.VITE_GITHUB_TOKEN || process.env.VITE_GITHUB_TOKEN;

const route = useRoute();
const router = useRouter();
const id = route.params.id;

const repository = ref(null);
const isLoading = ref(true);
const error = ref(null);
const fetchRepository = async (id) => {
  try {
    const response = await axios.get(
      `https://api.github.com/repositories/${id}`
    );
    repository.value = response.data;
  } catch (err) {
    console.error("Error fetching repository:", error);
    error.value =
      "Failed to fetch details. Please check the repository ID or your network connection.";
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchRepository(route.params.id);
});

const handleDelete = async (repoId) => {
  if (
    window.confirm(
      "Are you sure you want to delete this repository? This action cannot be undone."
    )
  ) {
    if (localStorage.getItem(`repo-${repoId}`)) {
      try {
        const response = await axios.delete(
          `https://api.github.com/repos/Modred14/${repoId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (response.status === 204) {
          localStorage.removeItem(`repo-${repoId}`);
          alert("Repository deleted successfully.");
          router.push("/");
        }
      } catch (err) {
        console.error("Error deleting repository:", err);
        alert("Failed to delete repository. Please try again.");
      }
    } else {
      alert("You are not authorized to delete this repo");
    }
  }
};

const handleUpdate = async (repoId, data) => {
  try {
    const response = await axios.patch(
      `https://api.github.com/repos/Modred14/${repository.value.name}`,
      data,
      {
        headers: {
          Authorization: `token ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    repository.value = response.data;
    console.log("Repository updated successfully:", response.data);
    alert(`Repository updated successfully.`);
  } catch (err) {
    console.error("Error updating repository:", err);
    alert(`Error updating repository.`);
  }
};
</script>

<style scoped>
@import "./RepositoryDetails.css";
</style>
