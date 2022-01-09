
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '',name: 'home', meta: { id: 1, name: 'Dashboard', authRequired: true }, component: () => import('pages/Index.vue') },
      { path: 'timesheet', name: 'timesheet', meta: { id: 2, name: 'Timesheet', authRequired: true }, component: () => import('pages/Timesheet.vue') },
      { path: 'taskboard', name: 'taskboard', meta: { id: 3, name: 'Taskboard', authRequired: true }, component: () => import('pages/TaskBoard.vue') }
    ]
  },
  {
    path: '/auth',
    component: () => import('layouts/LoginLayout.vue'),
    children: [{
      path: 'login',
      name: 'auth.login',
      meta: { name: 'Login', authRequired: false },
      component: () => import('pages/Login.vue')
    }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
