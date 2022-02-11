<template>
  <div class="row q-col-gutter-sm  q-py-sm">
    <!-- <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
      <q-card class="q-ma-xs" style="background-color: #38b1c5; border-radius: 15px; overflow: hidden">
        <q-card-section class="text-h6 text-white">
          Week's View
        </q-card-section>
        <q-card-section class="q-pa-none">
          <div ref="linechart" id="linechart" style="height: 250px; "></div>
        </q-card-section>
      </q-card>
    </div> -->
    <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
      <q-card class="q-ma-xs" style="background-color: #38b1c5; border-radius: 15px; overflow: hidden">
        <q-card-section class="text-h6 text-white">
          Week's View
        </q-card-section>
        <q-card-section class="q-pa-none">
          <div ref="barchart" id="barchart" style="height: 250px"></div>
        </q-card-section>
      </q-card>
    </div>

    <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
      <q-card class="q-ma-xs" style="background-color: #1e88e5; border-radius: 15px; overflow: hidden">
        <q-card-section class="text-h6 text-white">
          Productivity
        </q-card-section>
        <q-card-section class="q-pa-none">
          <div ref="guagechart" id="guageChart" style="height: 250px"></div>
        </q-card-section>
      </q-card>
    </div>

    <q-resize-observer @resize="onResize"/>
  </div>
</template>

<script>
import {defineComponent, defineAsyncComponent} from 'vue';
import { Timesheet } from 'src/models/Timesheet'

export default defineComponent({
  name: 'CardCharts',
  setup () {
    return {
      totalHours: 0,
      BarChart: {
        "tooltip": {"show": true},
        "title": {"show": true, "textStyle": {"color": "rgba(0, 0, 0 , .87)", "fontFamily": "sans-serif"}},
        "grid": {"containLabel": true, "bottom": "10%", "top": "5%"},
        "xAxis": {
            "type": 'category',
            "data": [],
            "axisLine": {"lineStyle": {"color": "#ffffff"}},
            "axisTick": {
                "show": true,
                "alignWithLabel": true,
                "lineStyle": {"show": true, "color": "rgba(0, 0, 0 , .54)", "type": "dashed"}
            },
           
        },
        "yAxis": {
            "show": false,
            "type": "value",
            "axisLine": {"lineStyle": {"color": "rgba(0, 0, 0 , .54)", "type": "dashed"}},
            "axisLabel": {"show": false},
            "splitLine": {"lineStyle": {"type": "dashed"}},
            "axisTick": {
                "show": true,
                "lineStyle": {"show": true, "color": "rgba(0, 0, 0 , .54)", "type": "dashed"}
            }
        },
        "series": [{
            "type": "bar",
            "barGap": "-100%",
            "itemStyle": {"normal": {"color": "rgba(0,0,0,0.1)"}},
            "barWidth": "50%"
        }, {"barWidth": "50%", "type": "bar", "itemStyle": {"normal": {"color": "#ffffff"}}}],
        "dataset": {
            "source": []
        }
    },
      LineChart: {
        "tooltip": {"show": true},
        "title": {"show": true, "textStyle": {"color": "rgba(0, 0, 0 , .87)", "fontFamily": "sans-serif"}},
        "grid": {"containLabel": true, "left": "0", "bottom": "0", "right": "0"},
        "xAxis": {
            "show": false,
            "type": "category",
            "axisLine": {"lineStyle": {"color": "rgba(0, 0, 0 , .54)", "type": "dashed"}},
            "axisTick": {
                "show": true,
                "alignWithLabel": true,
                "lineStyle": {"show": true, "color": "rgba(0, 0, 0 , .54)", "type": "dashed"}
            },
            "axisLabel": {"show": false},
            "boundaryGap": false
        },
        "yAxis": {
            "show": false,
            "type": "value",
            "axisLine": {"lineStyle": {"color": "rgba(0, 0, 0 , .54)", "type": "dashed"}},
            "axisLabel": {"show": false},
            "splitLine": {"lineStyle": {"type": "dashed"}},
            "axisTick": {
                "show": true,
                "lineStyle": {"show": true, "color": "rgba(0, 0, 0 , .54)", "type": "dashed"}
            }
        },
        "series": [{"type": "line", "areaStyle": {}, "smooth": true}],
        "dataset": {
            "source": [{"month": "Jan", "Test": 296, "Hours": 548}, {
                "month": "Feb",
                "Test": 1181,
                "Hours": 714
            }, {"month": "Mar", "Test": 235, "Hours": 961}, {
                "month": "Apr",
                "Test": 294,
                "Hours": 580
            }, {"month": "May", "Test": 765, "Hours": 730}, {
                "month": "Jun",
                "Test": 412,
                "Hours": 1249
            }, {"month": "Jul", "Test": 1125, "Hours": 267}, {
                "month": "Aug",
                "Test": 800,
                "Hours": 251
            }, {"month": "Sep", "Test": 948, "Hours": 1043}, {
                "month": "Oct",
                "Test": 1046,
                "Hours": 1118
            }, {"month": "Nov", "Test": 363, "Hours": 573}, {
                "month": "Dec",
                "Test": 909,
                "Hours": 283
            }]
        },
        "color": ["#2196f3"]
    },
    LineChart2: {
        "tooltip": {"show": true},
        "title": {"show": true, "textStyle": {"color": "rgba(0, 0, 0 , .87)", "fontFamily": "sans-serif"}},
        "grid": {"containLabel": true, "left": "0", "bottom": "0", "right": "0"},
        "xAxis": {
            "show": false,
            "type": "category",
            "axisLine": {"lineStyle": {"color": "rgba(0, 0, 0 , .54)", "type": "dashed"}},
            "axisTick": {
                "show": true,
                "alignWithLabel": true,
                "lineStyle": {"show": true, "color": "rgba(0, 0, 0 , .54)", "type": "dashed"}
            },
            "axisLabel": {"show": false},
            "boundaryGap": false
        },
        "yAxis": {
            "show": false,
            "type": "value",
            "axisLine": {"lineStyle": {"color": "rgba(0, 0, 0 , .54)", "type": "dashed"}},
            "axisLabel": {"show": false},
            "splitLine": {"lineStyle": {"type": "dashed"}},
            "axisTick": {
                "show": true,
                "lineStyle": {"show": true, "color": "rgba(0, 0, 0 , .54)", "type": "dashed",}
            }
        },
        "series": [{"type": "line", "areaStyle": {}, "smooth": false,}],
        "dataset": {
            "source": [
              {"day": "02-04-2022", "Time Worked": 3}, 
              {"day": "02-22-2022", "Time Worked": 5},  
              {"day": "02-05-2022", "Time Worked": 6},
              {"day": "02-06-2022", "Time Worked": 3},
              ]
        },
        "color": ["#45c2c5"]
    },
      GuageChart: {
        "tooltip": {"formatter": '{a} <br/>{b} : {c}%'},
        "title": {"show": true, "textStyle": {"color": "rgba(0, 0, 0 , .87)", "fontFamily": "sans-serif"}},
        "grid": {"containLabel": true, "left": "0", "bottom": "0", "right": "0"},
        "xAxis": {
            "show": false,
            "type": "category",
            "axisLine": {"lineStyle": {"color": "rgba(0, 0, 0 , .54)", "type": "dashed"}},
            "axisTick": {
                "show": true,
                "alignWithLabel": true,
                "lineStyle": {"show": true, "color": "rgba(0, 0, 0 , .54)", "type": "dashed"}
            },
            "axisLabel": {"show": false},
            "boundaryGap": false
        },
        "yAxis": {
            "show": false,
            "type": "value",
            "axisLine": {"lineStyle": {"color": "rgba(0, 0, 0 , .54)", "type": "dashed"}},
            "axisLabel": {"show": false},
            "splitLine": {"lineStyle": {"type": "dashed"}},
            "axisTick": {
                "show": true,
                "lineStyle": {"show": true, "color": "rgba(0, 0, 0 , .54)", "type": "dashed"}
            }
        },
        "series": [{"name": 'Pressure',"type": "gauge", "progress": {"show": true}, "detail": {"valueAnimation": true, "formatter": '{value}'}, "data": [{"value": 0, "name": 'score'}]}],
        "color": ["#005ea8"]
      },
      line_chart: null,
      line_chart_2: null,
      bar_chart: null,
      guage_chart: null
    }
  },
  mounted() {
    this.getTimesheet()
  },
  methods: {
    async getTimesheet() {
        try {
          let times = []
          console.log("chamou1")
          let current_date = new Date()
          
          // const url = `timesheet?page=${page}&limit=${this.paginate.rowsPerPage}&filter=${this.filter}`
          // const { data } = await this.$http.get(url)
          const data = await Timesheet.getWeek(current_date.toISOString().slice(0, 10))
          console.log(current_date)
          let start_date = new Date(current_date.toDateString())
          start_date.setDate(start_date.getDate() - 7)

          console.log("WEEK", current_date.toDateString(), start_date.toDateString())
          console.log(data)
        
          if (data) {
            data.map(time => {
              let date = new Date(time.date)
              console.log(date)

              
              if(date <= current_date){
                if (date >= start_date){
                  let workedtime = {"label": date.toLocaleDateString('en-US', { weekday: 'long' }), "max": time.hours, "Hours": time.hours}
                  times.push(workedtime)
                  this.BarChart.dataset.source.push(workedtime)
                  this.BarChart.xAxis.data.push(date.toLocaleDateString('en-US', { weekday: 'long' }))
                  this.totalHours += parseFloat(time.hours)
                }
              }
            })
            console.log("YAY", this.totalHours)
            console.log(this.BarChart.dataset.source)
            this.GuageChart.series[0].data[0].value = ((this.totalHours * 100)/7.5) > 100 ? 100 : ((this.totalHours * 100)/7.5).toFixed(0)

            

            this.init();

            
          }
          
        } catch (error) {
          console.log(error)
          
        }
      }, 
    init() {
      
      console.log("AAAAAA", this.GuageChart)

      // let lineChart = document.getElementById('linechart');
      // echarts.dispose(lineChart);
      // this.line_chart = echarts.init(lineChart, theme);
      // this.line_chart.setOption(this.LineChart2);


      let theme = this.model ? 'dark' : 'light';
      

      let barchart = document.getElementById('barchart');
      echarts.dispose(barchart);
      this.bar_chart = echarts.init(barchart, theme);
      this.bar_chart.setOption(this.BarChart)
      

      let guageChart = document.getElementById('guageChart');
      echarts.dispose(guageChart);
      this.guage_chart = echarts.init(guageChart, theme);
      this.guage_chart.setOption(this.GuageChart)
    },
    onResize() {
      if (this.line_chart) {
        this.line_chart.resize();
      }
      if (this.bar_chart) {
        this.bar_chart.resize();
      }
      if (this.guage_chart) {
        this.guage_chart.resize();
      }
    }
  }
})
</script>


//  "show": false,
//             "type": "category",
//             "axisLine": {"lineStyle": {"color": "rgba(0, 0, 0 , .54)", "type": "dashed"}},
//             "axisTick": {
//                 "show": true,
//                 "alignWithLabel": true,
//                 "lineStyle": {"show": true, "color": "rgba(0, 0, 0 , .54)", "type": "dashed"}
//             },
//             "axisLabel": {"show": false}