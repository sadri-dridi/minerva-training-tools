<template>
  <q-layout view="lHh Lpr lFf" >
    <!-- <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Minerva AP Pro Tools
        </q-toolbar-title>

      </q-toolbar>
    </q-header> -->

    <!-- <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      elevated
      class="bg-primary text-white"
    >
      <q-list>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer> -->
    
    <BottomSidebar v-if="$q.screen.width < 500" :options="options" v-model="selected" :value="selected"/>
    <Sidebar 
      v-else
      menuTitle="Minerva AP" 
      bgColor="#2a2a2a" 
      secondaryColor="#181818" 
      :isMenuOpen="open" 
      menuLogo="logo.png"
      :isSearch="false"
      :menuItems="linksList"
      :profileName="user.name"
      :profileRole="user.email"
      profileImg="https://avatars.githubusercontent.com/u/48040161?v=4"
      />

    <q-page-container  class="bg-secondary ">
      <router-view />
    </q-page-container>

    

  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'
import Sidebar from "components/Sidebar.vue";
import BottomSidebar from "components/BottomSidebar.vue";
import { User } from 'src/models/User'


import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink,
    Sidebar,
    BottomSidebar
  },
  computed: {
    user() {
      let user = User.getUser()
      // let user = {
      //   avatar: "https://avatars.githubusercontent.com/u/48040161?v=4",
      //   name: "Davi Coscarelli",
      //   class: "M25"
      // }
      return user
    },
  },
  created(){
        window.document.body.style.paddingBottom = this.$q.screen.width < 500 ? '70px' : '0px'
    },
  methods: {
    
  },
  watch: {
    
  },
  data() {
    return {
      open: false,
      exit: false,
      linksList: [
        {
          link: '#/',
          name: 'Dashboard',
          tooltip: 'Dashboard',
          icon: 'fas fa-home',
        },
        {
          link: '#/timesheet',
          name: 'Timesheet',
          tooltip: 'Files',
          icon: 'fas fa-stopwatch',
        },
        {
          link: '#/taskboard',
          name: 'Taskboard',
          tooltip: 'Taskboard',
          icon: 'fas fa-clipboard-check',
        },
        {
          link: '#',
          name: 'Analytics',
          tooltip: 'Analytics',
          icon: 'fas fa-chart-pie',
        },
        {
          link: '#',
          name: 'Setting',
          tooltip: 'Setting',
          icon: 'fas fa-cog',
        },
      ],
      selected: this.$route.meta.id,
      options: [
        {
          id: 4,
          icon: "fas fa-cog",
          title: "Setting",
        },
        { 
          id: 3, 
          icon: "fas fa-clipboard-check", 
          title: "Taskboard", 
          path: { name: "taskboard" } },
        {
          id: 1,
          icon: "fas fa-home",
          title: "Home",
          path: { name: "home" } 
        },
        { 
          id: 2, 
          icon: "fas fa-stopwatch", 
          title: "Timesheet" ,
          path: { name: "timesheet" } 
        },
        { id: 5, icon: "fas fa-sign-out-alt", title: "Logout", logout: true },
      ],
    
}}
})
</script>
