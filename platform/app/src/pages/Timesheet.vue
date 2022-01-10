<template>
  <q-page class="q-pa-md bg-secondary">
    <div class="row q-px-md q-py-md">
        <h5 class="text-white  text-left">
          Timesheet
        </h5>
      </div>

    <!-- <card-social icon_position="left"/> -->

    <!-- <card-charts/>

    <div class="row q-col-gutter-sm  q-pb-sm">
      <todo-list/>

      <card-time-line/>
    </div> -->
  <table-actions class="q-mt-lg"></table-actions>

  <!-- <q-card class="q-mt-md row bg-primary">
      <q-card-section class="col-12 text-center q-pa-lg">

        <div class="text-body1 q-mt-sm text-grey-7 text-weight-bold">
          © 2020 Davi Coscarelli, Inc. All rights reserved.
        </div>
      </q-card-section>
    </q-card> -->
  </q-page>
</template>

<script>
import {defineComponent,defineAsyncComponent} from 'vue'

export default defineComponent({
  name: 'PageIndex',
  components: {
    CardSocial: defineAsyncComponent(() => import('components/cards/CardSocial')),
    CardCharts: defineAsyncComponent(() => import('components/cards/CardCharts')),
    // CardCharts: () => import('components/cards/CardCharts'),
    TabSocial: defineAsyncComponent(() => import('components/tabs/TabSocial')),
    CardWithImage: defineAsyncComponent(() => import('components/cards/CardWithImage')),
    CardTimeLine: defineAsyncComponent(() => import('components/cards/CardTimeLine')),
    TodoList: defineAsyncComponent(() => import('components/list/TodoList')),
    TableActions: defineAsyncComponent(() => import('components/tables/TableActions')),
  },
  setup() {
    return {
      mode: 'list',
    }
  },

})
</script>
