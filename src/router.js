import { createRouter, createWebHistory } from "vue-router";
import axios from 'axios';

import Start from "./components/start/start.vue";
import Plans from "./components/plans/plans.vue";
import Login from "./components/login/login.vue";
import Test from "./components/test.vue";
import PlanEdit from "./components/plan_edit/plan_edit.vue";


const routes = [
    {path: '/start', component: Start, meta: { requiresAuth: true }},
    {path: '/login', component: Login, alias: '/'},
    {path: '/plans', component: Plans, meta: { requiresAuth: true }},
    {path: '/plan_edit/:plan_id',name: 'PlanEdit', component: PlanEdit, props: true},
    {path: '/test', component: Test}
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

const server_url = localStorage.getItem('server_url')
// Проверка аутентификации перед переходом на защищенные маршруты
router.beforeEach(async (to, from, next) => {
    if (to.meta.requiresAuth) {
      const token = localStorage.getItem('token'); // Получаем токен из localStorage
      console.log('Authorization');
      console.log(token);
      if (!token) {
        // console.log('Токен отсутствует');
        next('/login'); // Если токена нет, перенаправляем на страницу логина
      } else {
        try {
            // console.log('блок try выполняется')
          // Проверяем действительность токена на сервере
          const response = await axios.get(server_url + '/protected', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          console.log('response: ', response.status)
          if (response.status === 200) {
            // console.log('RESPONSE 200');
            next(); // Если токен действителен, разрешаем переход
          } else {
            next('/login'); // В противном случае перенаправляем на логин
          }
        } catch (error) {
            console.log('Ошибка', error)
          next('/login'); // В случае ошибки также перенаправляем на логин
        }
      }
    } else {

        
      next(); // Если маршрут не требует аутентификации, продолжаем переход
    }
  });


export default router;
