//маршрути
import Main from "./pages/main";
import Examination from "./pages/examination";
import Practice from "./pages/practice";
import Test from "./pages/test";

export const routes = [
     {
         //path: '/examination'+'/:id
         path: '/', //шлях до сторінки
         component: Main //сторінка
     },
     {
         path: '/examination',
         component: Examination
     },
     {
         path: '/practice',
         component: Practice
     },
     {
         path: '/test',
         component: Test
     },
 ]