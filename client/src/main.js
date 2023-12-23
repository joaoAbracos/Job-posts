import './assets/main.css'
import { createPinia} from "pinia"
import { createApp } from 'vue'
import router from "./router"
import App from './App.vue'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import vueCountryRegionSelect from 'vue3-ts-country-region-select'
const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(vueCountryRegionSelect)
app.component('QuillEditor', QuillEditor)
app.mount('#app')
