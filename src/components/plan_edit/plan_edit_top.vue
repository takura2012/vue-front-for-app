<script setup>

import { inject, computed, ref, watchEffect} from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();

const props = defineProps({
  plan_id: {
    type: String,
    required: true
  }
});

const plan_id = ref(props.plan_id);
const backgroundStyle = ref({});
// inject план из родителя
const CurrentPlan = inject('CurrentPlan');
// переменная для выбора файла картинки (смена фото)
const selectedFile = ref(null);
let image_changed = false;

const server_url = localStorage.getItem('server_url')
const token = localStorage.getItem('token') ;
// создается линк на картинку с сервера
const imageSrc = () => {
    return server_url+'/get_img/' + CurrentPlan.value.plan_id;
}

// переменная для ссылки на картинку (отслуживается через watchEffect)
const previewImage = ref('');


watchEffect(() => {
  if (CurrentPlan.value) {
    previewImage.value = imageSrc();
  }

});

watchEffect(() => {
  if (CurrentPlan.value) {
    const timestamp = new Date().getTime(); // Для обхода кэша
    backgroundStyle.value = {
      backgroundImage: `url(${server_url}/get_img/${CurrentPlan.value.plan_id}?t=${timestamp})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    };
  } else {
    backgroundStyle.value = {};
  }
});

// нажатие кнопки подтверждение
const renameConfirm = async () => {

// Создание объекта FormData
  const formData = new FormData();

  if (image_changed) {
    const dataURL = previewImage.value;
    const response = await fetch(dataURL);
    const blob = await response.blob();
    formData.append('image', blob);
  }
     
     // Указываем имя файла и его тип (по желанию)
    formData.append('plan_id', CurrentPlan.value.plan_id);
    // console.log(CurrentPlan.value.plan_name);
    formData.append('plan_name', CurrentPlan.value.plan_name);
    // Отправка данных на сервер
    const url = server_url+'/rename_plan';
    const res = await axios.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
      }
    });
    console.log('res status:', res.data.status)

    if (res.data.status == 'OK') {
      const timestamp = new Date().getTime(); // Для обхода кэша
      backgroundStyle.value = {
        backgroundImage: `url(${server_url}/get_img/${CurrentPlan.value.plan_id}?t=${timestamp})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      };
    }

}

// нажатие на превью картинки для смены (открывает диалог выбора файла)
const selectImage = () => {
  const fileInput = document.querySelector('input[type="file"]');
  fileInput.click();
};

// перехват события выбора файла
const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    selectedFile.value = file; // Сохраняем выбранный файл для последующей загрузки

    // Обновляем превью с помощью FileReader
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      previewImage.value = e.target.result; // Обновляем превью изображением из FileReader
      image_changed = true;
      // console.log(previewImage.value);
    };
    fileReader.readAsDataURL(file); // Чтение выбранного файла как URL
  }
};


const delete_plan = async () => {
  console.log('delete:', plan_id.value);
  const server_url = localStorage.getItem('server_url');
  const url = server_url+'/plan_delete';
  try {
    const res = await axios.post(url, {id:plan_id.value},{
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (res.data.status == 'OK') {
      router.push('/plans');
    } else {
      console.log('status:', res.data.status)
    }
  } catch (error) {
    console.log('Catched error:', error);
  }
}

</script>



<template>
    <div v-if="CurrentPlan" class="vp-top-name" :style="backgroundStyle">
        <div class="vp-name">
            <label for="fud" class="utils-block-link shadowed-text">
                {{CurrentPlan.plan_name}}
            </label>
            <input type="checkbox" class="hidden-check" id="fud">
            <div class="vp-modal-blocker"></div>
            <div class="vp-rename-modal">
                <p class="text-24">Rename current Plan</p>
                <input type="text" class="vp-modal-input text-24" v-model="CurrentPlan.plan_name">
                
                <div class="plan-rename-img text-14">
                    <img :src="previewImage" alt="set plan image" @click="selectImage">
                    <input type="file" ref="fileInput" @change="handleFileChange" accept="image/*" style="display: none;">
                </div>
                
                    <label for="fud" @click="renameConfirm()" class="button-modal-confirm">Confirm</label>
                    
                <div class="modal-rename-footer text-14">
                    <button class="button-modal-delete" @click="delete_plan()">Delete</button>
                    Удаленный план восстановить невозможно
                </div>
            </div>
        </div>
        <div v-if="CurrentPlan && CurrentPlan.workouts_count" class="vp-count shadowed-text">{{CurrentPlan.workouts_count}} day workouts plan</div>
    </div>
</template>

<style>

</style>