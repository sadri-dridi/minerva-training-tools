
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'timesheet', component: () => import('pages/Timesheet.vue') },
      { path: 'taskboard', component: () => import('pages/TaskBoard.vue') }
    ]
  },
  {
    path: '/login',
    component: () => import('pages/Login-1.vue')
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
