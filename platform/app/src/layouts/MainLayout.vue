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
    <VueSidebarMenuAkahon 
      menuTitle="Minerva AP" 
      bgColor="#2a2a2a" 
      secondaryColor="#181818" 
      :isMenuOpen="open" 
      menuLogo="logo.png"
      :isSearch="false"
      :menuItems="linksList"
      :profileName="user.name"
      :profileRole="user.class"
      :profileImg="user.avatar"
      />

    <q-page-container  class="bg-secondary ">
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'
import VueSidebarMenuAkahon from "vue-sidebar-menu-akahon";


import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink,
    VueSidebarMenuAkahon
  },
  computed: {
    user() {
      // let user = User.getPlan()
      let user = {
        avatar: "https://avatars.githubusercontent.com/u/48040161?v=4",
        name: "Davi Coscarelli",
        class: "M25"
      }
      return user
    },
  },
  mounted() {
    // if (this.$q.screen.sm){
    //   this.open = false
    // }
  },
  setup () {
    const leftDrawerOpen = ref(false)

    return {
      leftDrawerOpen,
      open: true,
      linksList: [
        {
          link: '/',
          name: 'Dashboard',
          tooltip: 'Dashboard',
          icon: 'bx-grid-alt',
        },
        {
          link: '/timesheet',
          name: 'Timesheet',
          tooltip: 'Files',
          icon: 'bx-timer',
        },
        {
          link: '/taskboard',
          name: 'Taskboard',
          tooltip: 'Taskboard',
          icon: 'bx-task',
        },
        {
          link: '#',
          name: 'Analytics',
          tooltip: 'Analytics',
          icon: 'bx-pie-chart-alt-2',
        },
        {
          link: '#',
          name: 'Setting',
          tooltip: 'Setting',
          icon: 'bx-cog',
        },
      ],
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})
</script>
