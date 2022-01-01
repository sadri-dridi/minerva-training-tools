<template>
  <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
    <q-card class="fit bg-primary text-white" style="border-radius: 15px">
      <q-card-section class="text-h6 q-pb-none">
        <q-item>
          <q-item-section avatar class="">
            <q-icon color="white" name="access_time" style="font-size: 2em;"/>
          </q-item-section>

          <q-item-section>
            <div class="text-h6">Events</div>
          </q-item-section>
        </q-item>
      </q-card-section>
      <q-card-section class="">
        <q-timeline :layout="layout" :side="side" color="secondary">

          <q-timeline-entry
            v-for="(timeline, index) in timeline_list"
            :key="index"
            :title="timeline.title"
            :subtitle="timeline.subtitle" :color="timeline.color" :icon="timeline.icon"
            :side="timeline.side"
          >
            <div>
              {{ timeline.desc }}
            </div>
          </q-timeline-entry>
        </q-timeline>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import {defineComponent} from 'vue'


export default defineComponent({
  name: 'CardTimeLine',
  setup() {
    return {
      timeline_list: [
        {
          title: 'Possible side projects & Performance Reviews',
          side: 'left',
          desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore\n' +
            '                  et dolore magna aliqua.',
          color: "red",
          icon: "thumb_up"
        },
        {
          title: 'End of Q4 - Try to hit target cap for this quarter',
          side: 'left',
          desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore\n' +
            '                  et dolore magna aliqua.',
          color: "orange",
          icon: "done_all"
        }, {
          title: 'New Years!',
          side: 'left',
          desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore\n' +
            '                  et dolore magna aliqua.',
          color: "blue",
          icon: "thumb_up"
        }
      ],
    }
  }
})
</script>
