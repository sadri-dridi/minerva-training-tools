<template>
  <q-card>
    <!-- <q-card-section>
      <div class="text-h6 text-grey-8">
        Timesheet
        <q-btn label="Export" class="float-right text-capitalize text-indigo-8 shadow-3" icon="person"/> 
      </div>
    </q-card-section> -->
    <q-card-section class="q-pa-none">
      <q-table :rows="data" :columns="columns" hide-bottom>
        <!-- <template v-slot:body-cell-Name="props">
          <q-td :props="props">
            <q-item style="max-width: 420px">
              <q-item-section avatar>
                <q-avatar>
                  <img :src="props.row.avatar">
                </q-avatar>
              </q-item-section>

              <q-item-section>
                <q-item-label>{{ props.row.name }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-td>
        </template> -->
        <template v-slot:body-cell-Action="props">
          <q-td :props="props">
            <q-btn icon="edit" size="sm" flat dense/>
            <q-btn icon="delete" size="sm" class="q-ml-sm" flat dense/>
          </q-td>
        </template>
      </q-table>
    </q-card-section>
  </q-card>
</template>

<script>
import {defineComponent} from 'vue'


const data = [
  {
    name: 'Pratik Patel',
    Crated_Date: '15/3/2020',
    Project: 'Minerva AP',
    progress: 80,
    des: 'Creativity Sets'
  },
  {
    name: 'Mayank Patel',
    Crated_Date: '10/2/2018',
    Project: 'Minerva AP',
    progress: 50,
    des: 'Creativity Sets'
  },
  {
    name: 'Mayur Patel',
    Crated_Date: '10/2/2018',
    Project: 'Minerva AP',
    progress: 100,
    des: 'Creativity Sets'
  },
  {
    name: 'Jeff Galbraith',
    Crated_Date: '10/2/2019',
    Project: 'Minerva AP',
    progress: 60,
    des: 'Creativity Sets'
  },
  {
    name: 'Pratik Patel',
    Crated_Date: '10/1/2020',
    Project: 'Minerva AP',
    progress: 30,
    des: 'Creativity Sets'
  },
];

const columns = [
  {name: 'Description', label: 'Description', field: 'des', sortable: true, align: 'left'},
  {name: 'Crated Date', label: 'Crated Date', field: 'Crated_Date', sortable: true, align: 'left'},
  {name: 'Hours', label: 'Hours', field: 'progress', sortable: true, align: 'left'},
  {name: 'Project', label: 'Project', field: 'Project', sortable: true, align: 'left'},
  {name: 'Action', label: '', field: 'Action', sortable: false, align: 'center'}
];


export default defineComponent({
  name: "TableActions",
  setup() {
    return {
      data,
      columns,
    }
  }
})
</script>

<style scoped>

</style>
