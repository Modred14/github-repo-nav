<template>
  <div v-if="isOpen" class="modal">
    <div class="modal-overlay" @click="onClose"></div>
    <div class="modal-content">
      <div class="details-contain8">
        <div class="details-contain7">
          <div class="modal-header">
            <h2 class="text6">Create New Repository</h2>
            <button class="modal-close-button" @click="onClose">&times;</button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="handleSubmit">
              <div class="form-control">
                <label class="texth">Repository Name</label>
                <input
                  class="input"
                  type="text"
                  placeholder="Enter repository name"
                  v-model="repoDetails.name"
                />
              </div>
              <div class="form-control">
                <label class="texth">Description</label>
                <input
                  class="input"
                  type="text"
                  placeholder="Enter description"
                  v-model="repoDetails.description"
                />
              </div>
              <div class="form-control">
                <label class="texth">Language</label>
                <select class="input-language" v-model="repoDetails.language">
                  <option value="" disabled>Select Language</option>
                  <option v-for="lang in languages" :key="lang" :value="lang">{{ lang }}</option>
                  <option value="Other">Other</option>
                </select>
                <input
                  v-if="repoDetails.language === 'Other'"
                  class="input"
                  type="text"
                  placeholder="Specify Language"
                  v-model="repoDetails.customLanguage"
                />
              </div>
              <div class="form-control">
                <label class="texth">Homepage URL</label>
                <input
                  class="input"
                  type="url"
                  placeholder="https://example.com"
                  v-model="repoDetails.homepage"
                />
              </div>
              <div class="form-control">
                <label class="private">
                  <input
                    type="checkbox"
                    v-model="repoDetails.private"
                  />
                  Private Repository
                </label>
              </div>
              <div class="modal-footer">
                <button type="submit" class="save1">Create Repo</button>
                <button type="button" class="cancel1" @click="onClose">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';

const props = defineProps({
  isOpen: Boolean,
  onClose: Function
});

const repoDetails = reactive({
  name: '',
  description: '',
  private: false,
  language: '',
  customLanguage: '',
  homepage: '',
  license: ''
});

const languages = [
  'HTML', 'CSS', 'JavaScript', 'Python', 'Java', 'C#', 'C++', 'PHP', 'Ruby', 'Go',
  'Swift', 'Kotlin', 'TypeScript', 'Scala', 'Objective-C', 'R', 'Elixir', 'Rust',
  'Perl', 'Dart', 'Lua', 'Haskell', 'Julia', 'Clojure', 'Groovy', 'Shell',
  'Assembly', 'CoffeeScript', 'MATLAB', 'Bash', 'VBA', 'F#', 'Pascal', 'Delphi',
  'Erlang', 'Fortran'
];

const token = import.meta.env.VITE_GITHUB_TOKEN || process.env.VITE_GITHUB_TOKEN;

const handleSubmit = async () => {
  const data = {
    name: repoDetails.name,
    description: repoDetails.description,
    language: repoDetails.language !== 'Other' ? repoDetails.language : undefined,
    customLanguage: repoDetails.language === 'Other' ? repoDetails.customLanguage : undefined,
    private: repoDetails.private,
    homepage: repoDetails.homepage
  };

  try {
    const response = await fetch('https://api.github.com/user/repos', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    const responseData = await response.json();
    if (response.ok) {
      alert('Repository has been created successfully');
      localStorage.setItem(`repo-${responseData.id}`, true);
      props.onClose();
      return responseData;
    } else {
      alert('Failed to create repository');
      props.onClose();
    }
  } catch (error) {
    console.error('Error creating repository:', error);
    alert('Failed to create repository');
    props.onClose();
  }
};
</script>

  
  <style>
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
    width: 96.5%;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 5px;
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
  .save1:hover{
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
  .cancel1:hover{
    background-color: rgb(180, 0, 0);
    color: #fff;
  }
  @media screen and (max-width: 390px) {
    .text6{
      font-size: 20px;
    }
  }
  
  </style>
  