<template>
  <div>
    <button @click="selectFolder">Select Folder</button>
    <p v-if="folderPath">Selected Folder: {{ folderPath }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const folderPath = ref('');

async function selectFolder() {
  try {
    const response = await fetch('http://localhost:3001/select-folder');
    const data = await response.json();
    if (!data.canceled) {
      folderPath.value = data.filePath;
    }
  } catch (error) {
    console.error('Error selecting folder:', error);
  }
}
</script>
