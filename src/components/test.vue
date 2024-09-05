<template>
  <div>
    <input type="file" accept="image/*" @change="handleFileUpload" />
    <button @click="submitFile">Загрузить файл</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const file = ref(null);

const handleFileUpload = (event) => {
  file.value = event.target.files[0];
};

const submitFile = async () => {
  if (!file.value) {
    alert('Пожалуйста, выберите файл!');
    return;
  }

  const formData = new FormData();
  formData.append('file', file.value);

  try {
    const response = await fetch('/upload', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      alert('Файл успешно загружен');
    } else {
      alert('Ошибка при загрузке файла');
    }
  } catch (error) {
    console.error('Ошибка:', error);
    alert('Произошла ошибка при загрузке файла');
  }
};
</script>
