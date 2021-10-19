import Vue from 'vue'
import App from './App.vue'
import router from './router'

import '@/style/common.scss'

Vue.config.productionTip = false

//组件批量注册全局
import components from '@/components';
Vue.use(components);

import {
  Message,
  MessageBox,
  Form,
  FormItem,
  Input,
  Button,
  Checkbox,
  Link,
  Container,
  Main,
  Menu,
  MenuItem,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Table,
  TableColumn,
  Notification,
  Dialog,
  Pagination,
  Select,
  Option,
  Upload,
  Row,
  Col, 
  Popover,
  Timeline,
  TimelineItem,
  Tabs,
  TabPane,
  Empty
} from 'element-ui'
Vue.use(Form).use(FormItem).use(Input).use(Button).use(Checkbox).use(Link).use(Container).use(Main).use(Menu).use(MenuItem).use(Dropdown).use(DropdownMenu).use(DropdownItem).use(Table)
  .use(TableColumn).use(Dialog).use(Pagination).use(Select).use(Option).use(Upload).use(Row).use(Col).use(Popover).use(Timeline).use(TimelineItem).use(Tabs).use(TabPane).use(Empty)
Vue.prototype.$message = Message;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$notify = Notification;


import { showLoading, hideLoading } from '@/untils/loading'
Vue.prototype.showLoading = showLoading;
Vue.prototype.hideLoading = hideLoading;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
