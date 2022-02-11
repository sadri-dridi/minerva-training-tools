<template>
  <div>
    <q-card style="border-radius: 15px">
      <!-- <q-card-section>
        <div class="text-h6 text-grey-8">
          Timesheet
          <q-btn label="Export" class="float-right text-capitalize text-indigo-8 shadow-3" icon="person"/> 
        </div>
      </q-card-section> -->
      <q-card-section class="q-pa-none"> 
        <q-table 
          :rows="data" 
          :columns="columns" 
          
          row-key="description"

          hide-bottom
          :pagination.sync="paginate"
          hide-pagination
          :loading="loading"
          @request="getData"
          >
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
          <!-- <template v-slot:body-cell-Action="props">
            <q-td :props="props">
              <q-btn icon="edit" size="sm" flat dense/>
              <q-btn icon="delete" size="sm" class="q-ml-sm" flat dense/>
            </q-td>
          </template> -->

          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td
                v-for="col in props.cols"
                :key="col.name"
                :props="props"
              >
                {{ col.value }}
                <q-btn v-if="col.field == 'actions'" size="sm" flat color="primary" round dense @click="openEdit(props.row)" icon="edit" />
              </q-td>
              <!-- <q-td auto-width key="edit">
                
              </q-td> -->
            </q-tr>
            <!-- <q-tr v-show="props.expand" :props="props">
              <q-td colspan="100%">
                <div class="text-left">This is expand slot for row above: {{ props.row.description }}.</div>
              </q-td>
            </q-tr> -->
          </template>

          
          <!-- <template v-slot:body="props">
            <q-tr :props="props">
              <q-td key="description" :props="props">
                {{ props.row.description }}
                <q-icon v-if="props.row.description" class="q-ml-sm" color="primary" name="edit" />
                <q-popup-edit v-model="props.row.description" v-slot="scope" title="Update" buttons label-set="Save" @save="()=>{}">
                  <q-input v-model="scope.value" dense autofocus counter />
                </q-popup-edit> 
              </q-td>

              <q-td key="date" :props="props">
                {{ props.row.date }}
              </q-td>

              <q-td key="hours" :props="props">
                {{ props.row.hours }}
              </q-td>
              
              
            </q-tr>
        </template> -->

        <template v-slot:top>
              
            <div class="flex justify-center col-12 q-mb-md">
              <q-btn
                color="secondary"
                icon="mdi-chevron-left"
                round
                flat
                dense
                padding="none"
                @click="previousPayperiod()"
              />
              <span class="month-year-label text-primary" id="">Pay Period {{
                current_payperiod.payperiod
              }}</span>
              <q-btn
                color="secondary"
                icon="mdi-chevron-right"
                round
                flat
                dense
                padding="none"
                @click="nextPayperiod()"
              />
            </div>

            
            <!-- <q-btn icon="event" round color="primary" v-if="$q.screen.width < 500">
              <q-popup-proxy @before-show="updateProxy" cover transition-show="scale" transition-hide="scale">
                <q-date v-model="proxyDate" :options="optionsFn">
                  <div class="row items-center justify-end q-gutter-sm">
                    <q-btn label="Cancel" color="primary" flat v-close-popup />
                    <q-btn label="OK" color="primary" flat @click="save" v-close-popup />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-btn>  
            
            <q-input filled v-model="date" mask="date" :rules="['date']" v-else>
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy ref="qDateProxy" cover transition-show="scale" transition-hide="scale">
                    <q-date
                      v-model="date"
                      :options="optionsFn"
                    />
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input> -->

              
            
          </template>
        </q-table>
      </q-card-section>
    </q-card>
    <q-page-sticky position="bottom-right" :offset="[18, 18 * ($q.screen.width < 500 ? 5.5 : 1)]">
      <q-btn fab icon="add" style="background-color: #42A5F5" class="text-white" @click="hourDialog = true"/>
    </q-page-sticky>


    <q-dialog v-model="hourDialog" @hide="cleanForm()">
      <q-card style="border-radius: 15px; width: 90%" class="q-px-sm q-pb-sm">
        <q-card-section class="row items-center q-pb-md">
          <q-space />
          <div class="text-h6">{{newHour.id ? 'Edit Hour' : 'Add Hours'}}</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section :class="$q.screen.width < 500 ? 'q-col-gutter-sm' : 'q-col-gutter-md'">
          <q-form @submit="addHour()" class="text-center">
            <q-input label="Date" rounded outlined v-model="newHour.date" mask="##-##-####" :rules="[val => !!val || 'Field is required']" >
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy ref="datePick" cover transition-show="scale" transition-hide="scale">
                    <q-date
                      v-model="newHourDate"
                      mask="MM-DD-YYYY"
                      :options="dateFilter"
                    />
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>

            <q-input label="Hours" rounded outlined v-model="newHour.hours" type="number" :rules="[val => !!val || 'Field is required']"/>
            
            <q-input
              v-model="newHour.description"
              label="Description"
              rounded
              outlined
              type="textarea"
              :rules="[val => !!val || 'Field is required']"
            />
            
            <q-btn v-if="newHour.id" :loading="loadingDelete" class="q-mt-sm q-mr-sm" @click="deleteHour" :size="$q.screen.width < 500 ? 'md' : 'lg'" padding="sm xl" no-caps unelevated rounded outline color="grey-8" label="Delete" />

            <q-btn :loading="loadingCreate" class="q-mt-sm text-white" type="submit" :size="$q.screen.width < 500 ? 'md' : 'lg'" padding="sm xl" no-caps unelevated rounded style="background-color: #42A5F5" :label="newHour.id ? 'Update' : 'Create'" />
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>



    <!-- <div class="q-pa-lg flex flex-center">
        <q-pagination color="grey-8" v-if="data.length" v-model="paginate.page" :max="paginate.rowsNumber" :direction-links="true" @update:model-value="getData($event)">
        </q-pagination>
    </div> -->
  </div>
</template>

<script>
import {defineComponent} from 'vue';
import { Timesheet } from 'src/models/Timesheet'



export default defineComponent({
  name: "TableActions",
  data: () => ({
      data: [],
      pay_periods: [],
      current_payperiod: {},
      loading: false,
      loadingCreate: false,
      loadingDelete: false,
      hourDialog: false,
      columns: [
        {name: 'Description', label: 'Description', field: 'description', sortable: false, align: 'left'},
        {name: 'Date', label: 'Date', field: 'date', sortable: false, align: 'left'},
        {name: 'Hours', label: 'Hours', field: 'hours', sortable: false, align: 'center'},
        {name: 'Actions', label: 'Actions', field: 'actions', sortable: false, align: 'center'},
      ],
      paginate: {
        page: 1,
        rowsPerPage: 14,
        rowsNumber: 0
      },
      filter: "",
      newHour: {},
      newHourDate: ""
    }),
    watch: {
      newHourDate(value){
        console.log("ENTROU")
        this.newHour.date = value
        this.$refs.datePick.hide()
      }
    },
    methods: {
      selectDate(){
        console.log("ENTROU")
        this.$refs.datePick.hide()
      },
      openEdit(data){
        console.log(data)
        this.newHour = data
        this.hourDialog = true
      },
      cleanForm(){
        this.newHour = {}
      },
      nextPayperiod(){
        this.current_payperiod = this.pay_periods.find(payperiod => payperiod.payperiod == this.current_payperiod.payperiod + 1) || this.current_payperiod
        console.log("FICOU ASSIM", this.current_payperiod)
        this.getData()
      },
      previousPayperiod(){
        this.current_payperiod = this.pay_periods.find(payperiod => payperiod.payperiod == this.current_payperiod.payperiod - 1) || this.current_payperiod
        console.log("FICOU ASSIM", this.current_payperiod)
        this.getData()
      },

      dateFilter (date) {
        let date_parsed = new Date(date)
        let current_start_parsed = new Date(this.current_payperiod.date_start)
        let current_end_parsed = new Date(this.current_payperiod.date_end)
        console.log(date_parsed)
        console.log(date_parsed >= current_start_parsed && date_parsed <= current_end_parsed)
        
        return date_parsed >= current_start_parsed && date_parsed <= current_end_parsed
      },

      async addHour() {
        this.loadingCreate = true
        
        // const url = `timesheet?page=${page}&limit=${this.paginate.rowsPerPage}&filter=${this.filter}`
        // const { data } = await this.$http.get(url)
        const created = await Timesheet.add({...this.newHour, payperiod_id: this.current_payperiod.id})
       
        if (created) {
          this.getData()
          // this.paginate.rowsPerPage = data.perPage
          // this.paginate.rowsNumber = Math.ceil(data.total/data.perPage)
          this.loadingCreate = false
          this.hourDialog = false
          this.cleanForm()
        }
      },

      async deleteHour() {
        this.loadingDelete = true
        
        // const url = `timesheet?page=${page}&limit=${this.paginate.rowsPerPage}&filter=${this.filter}`
        // const { data } = await this.$http.get(url)
        const deleted = await Timesheet.remove({...this.newHour})
       
        if (deleted) {
          this.getData()
          // this.paginate.rowsPerPage = data.perPage
          // this.paginate.rowsNumber = Math.ceil(data.total/data.perPage)
          this.loadingDelete = false
          this.hourDialog = false
          this.cleanForm()
        }
      },

      async getData() {
        console.log("chamou2")
        this.loading = true
        
       
        const data = await Timesheet.get(this.current_payperiod)
       
        if (data) {
          console.log(data)
          this.data = data
          // this.paginate.rowsPerPage = data.perPage
          // this.paginate.rowsNumber = Math.ceil(data.total/data.perPage)
          this.loading = false
        }
      },

      async getPayPeriods() {
        try {
          console.log("chamou1")
          let current_date = new Date()
          this.loading = true
          
          // const url = `timesheet?page=${page}&limit=${this.paginate.rowsPerPage}&filter=${this.filter}`
          // const { data } = await this.$http.get(url)
          const data = await Timesheet.getPayPeriods()
        
          if (data) {
            data.map(payperiod => {
              let date_start = new Date(payperiod.date_start)
              let date_end = new Date(payperiod.date_end)
              
              
              if(date_start <= current_date){
                if (date_end >= current_date){
                  this.current_payperiod = payperiod
                  this.getData(payperiod)

                }
              }
            })
            this.pay_periods = data
            this.loading = false

            
          }
          
        } catch (error) {
          console.log(error)
          
        }
      }, 
    },
    mounted(){
      this.getPayPeriods()
    }
})
</script>

<style scoped>

</style>
