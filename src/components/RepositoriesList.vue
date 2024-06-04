<template>
  <ErrorBoundary>
    <div class="header">
      <section class="GitHubProfile">
        <div>
          <div class="avatar-container">
            <img :src="image" alt="User avatar" />
          </div>
          <div v-if="userProfile" class="user-details">
            <h1 class="name">{{ userProfile.name }}</h1>
            <p>{{ userProfile.bio }}</p>
            <div class="followers-following">
              <p>
                <font-awesome-icon :icon="['fas', 'user-friends']" />
                Followers: {{ userProfile.followers }}
              </p>
              <p>
                <font-awesome-icon :icon="['fas', 'user-friends']" />
                Following: {{ userProfile.following }}
              </p>
              <p class="total-repo">
                🗂️Total Repositories: {{ repositoryCount }}
              </p>
            </div>
            <p>
              GitHub Profile:
              <a
                :href="userProfile.html_url"
                target="_blank"
                rel="noopener noreferrer"
              >
                {{ userProfile.html_url }}
              </a>
            </p>
          </div>
        </div>
      </section>

      <section>
        <h1 class="header-desktop">MY PORTFOLIO</h1>
        <section class="RepositoriesList">
          <h2>My Repositories</h2>
          <input
            type="text"
            placeholder="Search repositories..."
            class="search-repo"
            v-model="searchQuery"
          />
          <ul>
            <li v-for="repo in paginatedRepositories" :key="repo.id">
              <span class="span-name">{{ repo.name.toUpperCase() }}</span>
              <button class="infoBTN">
                <RouterLink class="link" :to="`/repository/${repo.id}`"
                  >DETAILS</RouterLink
                >
              </button>
            </li>
          </ul>
          <div class="grid-box">
            <Paginate
              :currentPage="currentPage"
              :totalPages="totalPages"
              @pageChange="handlePageChange"
            />
            <div class="Test">
              <button class="T404" @click="navigateToInvalidUrl">
                Test 404 page
              </button>
              <ErrorThrower />
              <button class="createRepo" @click="onOpen">Create repo</button>
              <CreateRepo :isOpen="isOpen" @close="onClose" />
            </div>
          </div>
        </section>
      </section>
    </div>
  </ErrorBoundary>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useQuery } from "vue-query";
import { useRouter } from "vue-router";
import axios from "axios";
import { RouterLink } from "vue-router";
// import * as router-link from '../main.js'
// import NotFound from './NotFound.vue'
import image from "/src/assets/image.jpg";
import ErrorBoundary from "./ErrorBoundary.vue";
import ErrorThrower from "./ErrorThrower.vue";
import CreateRepo from "./CreateRepo.vue";
import Paginate from "./Pagination.vue";

const token =
  import.meta.env.VITE_GITHUB_TOKEN || process.env.VITE_GITHUB_TOKEN;

const fetchUserProfile = async () => {
  try {
    const response = await axios.get("https://api.github.com/users/Modred14", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch user profile:", error);
    throw new Error("Failed to fetch user profile");
  }
};

const fetchRepositories = async () => {
  try {
    const response = await axios.get(
      "https://api.github.com/users/Modred14/repos",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch repositories:", error);
    throw new Error("Failed to fetch repositories");
  }
};

const fetchRepositoryCount = async () => {
  try {
    const response = await axios.get("https://api.github.com/users/Modred14", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.public_repos;
  } catch (error) {
    console.error("Failed to fetch repository count:", error);
    throw new Error("Failed to fetch repository count");
  }
};

const currentPage = ref(1);
const perPage = ref(2);
const searchQuery = ref("");
const userProfile = ref(null);
const repositoryCount = ref(0);
const router = useRouter();
const isOpen = ref(false);

const {
  data: repositories,
  isLoading,
  isError,
} = useQuery(["repositories"], fetchRepositories);

onMounted(async () => {
  try {
    const [userData, repoCountData] = await Promise.all([
      fetchUserProfile(),
      fetchRepositoryCount(),
    ]);
    userProfile.value = userData;
    repositoryCount.value = repoCountData;
  } catch (error) {
    console.error("Failed to fetch data:", error);
  }
});

const filteredRepositories = computed(() => {
  return (
    repositories.value?.filter((repo) =>
      repo.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    ) || []
  );
});

const totalItems = computed(() => filteredRepositories.value.length);
const totalPages = computed(() => Math.ceil(totalItems.value / perPage.value));

const paginatedRepositories = computed(() => {
  const lastIndex = currentPage.value * perPage.value;
  const firstIndex = lastIndex - perPage.value;
  return filteredRepositories.value.slice(firstIndex, lastIndex);
});

const handlePageChange = (page) => {
  currentPage.value = page;
};

const navigateToInvalidUrl = () => {
  router.push("/Invalid_url");
};

const onOpen = () => {
  isOpen.value = true;
};

const onClose = () => {
  isOpen.value = false;
};
</script>

<style scoped>
@import "./RepoList.css";
</style>
