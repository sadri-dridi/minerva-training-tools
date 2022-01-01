<template>
  <q-page class="q-pa-md bg-secondary">
   
  <div class="row q-px-md q-py-md">
        <h5 class="text-white  text-left">
          Taskboard
        </h5>
      </div>      
    <div
      class="row "
      group="columns"
    >
      <div class="col-3 rounded-borders q-px-xs">
        <q-card class="q-pa-xs custom_bg ">
          <q-item style="cursor: move;" class="q-pa-none text-white q-pa-sm rounded-borders">
            <q-item-section class="text-h6 text-weight-bolder text-color">PLANNED TASKS</q-item-section>
            <q-item-section avatar>
              <q-icon name="more_vert" class="cursor-pointer">
                <q-menu transition-show="fade" transition-hide="fade">
                  <q-list style="min-width: 100px">
                    <q-item clickable>
                      <q-item-section>Remove</q-item-section>
                    </q-item>
                    <q-item clickable>
                      <q-item-section>Option 1</q-item-section>
                    </q-item>
                    <q-item clickable>
                      <q-item-section>Option 2</q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-icon>
            </q-item-section>
          </q-item>
          <q-scroll-area
            :thumb-style="thumbStyle"
            :bar-style="barStyle"
            :style="{'height': getHeight}"
            class="col"
            ref="first"
          >
            <draggable
              class="list-group"
              :list="planned_task"
              group="tasks"
              v-bind="dragOptions"
              @start="drag = true"
              @end="drag = false"
            >
              <q-card
                v-for="(item, index) in planned_task"
                v-bind:key="index"
                class="rounded-borders q-my-sm"
                @mouseover="$set(task_selected_index,'planned',index)"
                @mouseleave="task_selected_index.planned = null"
              >
                <q-card-section class="row q-pa-sm">
                  <div class="col-12">
                    <span class="text-weight-bold text-h6 q-ml-sm">{{ item.title }}</span>
                    <span class="float-right text-grey-8 q-mt-sm">{{ item.label }}
                    <q-icon
                      filled
                      size="xs"
                      name="close"
                      class="absolute-top-right q-mr-md q-mt-xs text-red"
                      v-if="index==task_selected_index.planned"
                      @click="deleteTask('panned', task_selected_index.planned)"
                    />
                    </span>
                  </div>
                </q-card-section>
                <q-card-section class="q-pa-sm">
                  <q-chip dense v-for="(tag, index) in item.tags" :key="index" :color="tag.color" text-color="white">
                    {{ tag.name }}
                  </q-chip>
                </q-card-section>
                <q-card-section class="q-pa-sm text-grey-8">
                  {{ item.description }}
                </q-card-section>
              </q-card>
            </draggable>

            <q-card class="full-width" v-if="add_model.planned">
              <q-card-section>
                <div class="text-h6">
                  Add Task
                </div>
              </q-card-section>
              <q-card-section class="q-pa-sm">
                <q-input dense v-model="add_data.planned.title" label="Title" outlined/>
                <q-input dense class="q-mt-sm" v-model="add_data.planned.label" label="Label" outlined/>
                <q-input dense class="q-mt-sm" v-model="add_data.planned.description" label="Description" outlined/>
              </q-card-section>
              <q-card-actions align="right" class="q-pa-sm text-grey-8">
                <q-btn label="Add" color="indigo-5" class="text-capitalize"></q-btn>
                <q-btn label="Cancel" color="primary" class="text-capitalize" @click="add_model.planned=false"></q-btn>
              </q-card-actions>
            </q-card>
            <q-item v-else>
              <q-btn icon="add" rounded flat label="Add Task" @click="add_model.planned=true"/>
            </q-item>
          </q-scroll-area>

        </q-card>
      </div>

      <div class="col-3 q-px-xs">
        <q-card class="q-pa-xs custom_bg ">
          <q-item style="cursor: move;" class="q-pa-none text-white q-pa-sm">
            <q-item-section class="text-h6 text-weight-bolder text-color">WORK IN PROGRESS</q-item-section>
            <q-item-section avatar>
              <q-icon name="more_vert" class="cursor-pointer">
                <q-menu transition-show="fade" transition-hide="fade">
                  <q-list style="min-width: 100px">
                    <q-item clickable>
                      <q-item-section>Remove</q-item-section>
                    </q-item>
                    <q-item clickable>
                      <q-item-section>Option 1</q-item-section>
                    </q-item>
                    <q-item clickable>
                      <q-item-section>Option 2</q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-icon>
            </q-item-section>
          </q-item>
          <q-scroll-area
            :thumb-style="thumbStyle"
            :bar-style="barStyle"
            :style="{'height': getHeight}"
            class="col"
            ref="first"
          >
            <draggable
              class="list-group"
              :list="wip_task"
              group="tasks"
              v-bind="dragOptions"
              @start="drag = true"
              @end="drag = false"
            >
              <q-card
                v-for="(item, index) in wip_task"
                v-bind:key="index"
                class="rounded-borders q-my-sm"
                @mouseover="task_selected_index.wip = index"
                @mouseleave="task_selected_index.wip = null"
              >
                <q-card-section class="row q-pa-sm">
                  <div class="col-12">
                    <span class="text-weight-bold text-h6 q-ml-sm">{{ item.title }}</span>
                    <span class="float-right text-grey-8 q-mt-sm">{{ item.label }}
                    <q-icon
                      filled
                      size="xs"
                      name="close"
                      class="absolute-top-right q-mr-md q-mt-xs text-red"
                      v-if="index==task_selected_index.wip"
                      @click="deleteTask('wip', task_selected_index.wip)"
                    />
                    </span>
                  </div>
                </q-card-section>
                <q-card-section class="q-pa-sm">
                  <q-chip dense v-for="(tag, index) in item.tags" :key="index" :color="tag.color" text-color="white">
                    {{ tag.name }}
                  </q-chip>
                </q-card-section>
                <q-card-section class="q-pa-sm text-grey-8">
                  {{ item.description }}
                </q-card-section>
              </q-card>
            </draggable>

            <!-- <q-card class="full-width" v-if="add_model.wip">
              <q-card-section>
                <div class="text-h6">
                  Add Task
                </div>
              </q-card-section>
              <q-card-section class="q-pa-sm">
                <q-input dense v-model="add_data.wip.title" label="Title" outlined/>
                <q-input dense class="q-mt-sm" v-model="add_data.wip.label" label="Label" outlined/>
                <q-input dense class="q-mt-sm" v-model="add_data.wip.description" label="Description" outlined/>
              </q-card-section>
              <q-card-actions align="right" class="q-pa-sm text-grey-8">
                <q-btn label="Add" color="indigo-5" class="text-capitalize"></q-btn>
                <q-btn label="Cancel" color="primary" class="text-capitalize" @click="add_model.wip=false"></q-btn>
              </q-card-actions>
            </q-card> -->
            <!-- <q-item v-else>
              <q-btn icon="add" rounded flat label="Add Task" @click="add_model.wip=true"/>
            </q-item> -->
          </q-scroll-area>
        </q-card>
      </div>

      <div class="col-3 q-px-xs">
        <q-card class="q-pa-xs custom_bg2 ">
          <q-item style="cursor: move;" class="q-pa-none text-white q-pa-sm">
            <q-item-section class="text-h6 text-weight-bolder text-color">BLOCKED
            </q-item-section>
            <q-item-section avatar>
              <q-icon name="more_vert" class="cursor-pointer">
                <q-menu transition-show="fade" transition-hide="fade">
                  <q-list style="min-width: 100px">
                    <q-item clickable>
                      <q-item-section>Remove</q-item-section>
                    </q-item>
                    <q-item clickable>
                      <q-item-section>Option 1</q-item-section>
                    </q-item>
                    <q-item clickable>
                      <q-item-section>Option 2</q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-icon>
            </q-item-section>
          </q-item>

          <q-scroll-area
            :thumb-style="thumbStyle"
            :bar-style="barStyle"
            :style="{'height': getHeight}"
            class="col"
            ref="first"
          >
            <draggable
              class="list-group"
              :list="blocked_task"
              group="tasks"
              v-bind="dragOptions"
              @start="drag = true"
              @end="drag = false"
            >
              <q-card
                v-for="(item, index) in blocked_task"
                v-bind:key="index"
                class="rounded-borders q-my-sm"
                @mouseover="task_selected_index.blocked = index"
                @mouseleave="task_selected_index.blocked  = null"
              >
                <q-card-section class="row q-pa-sm">
                  <div class="col-12">
                    <span class="text-weight-bold text-h6 q-ml-sm">{{ item.title }}</span>
                    <span class="float-right text-grey-8 q-mt-sm">{{ item.label }}

                    <q-icon
                      filled
                      size="xs"
                      name="close"
                      class="absolute-top-right q-mr-md q-mt-xs text-red"
                      v-if="index==task_selected_index.blocked"
                      @click="deleteTask('blocked', task_selected_index.blocked)"
                    />
                    </span>
                  </div>
                </q-card-section>
                <q-card-section class="q-pa-sm">
                  <q-chip dense v-for="(tag, index) in item.tags" :key="index" :color="tag.color" text-color="white">
                    {{ tag.name }}
                  </q-chip>
                </q-card-section>
                <q-card-section class="q-pa-sm text-grey-8">
                  {{ item.description }}
                </q-card-section>
              </q-card>
            </draggable>
            <!-- <q-card class="full-width" v-if="add_model.blocked">
              <q-card-section>
                <div class="text-h6">
                  Add Task
                </div>
              </q-card-section>
              <q-card-section class="q-pa-sm">
                <q-input dense v-model="add_data.blocked.title" label="Title" outlined/>
                <q-input dense class="q-mt-sm" v-model="add_data.blocked.label" label="Label" outlined/>
                <q-input dense class="q-mt-sm" v-model="add_data.blocked.description" label="Description" outlined/>
              </q-card-section>
              <q-card-actions align="right" class="q-pa-sm text-grey-8">
                <q-btn label="Add" color="indigo-5" class="text-capitalize"></q-btn>
                <q-btn label="Cancel" color="primary" class="text-capitalize" @click="add_model.blocked=false"></q-btn>
              </q-card-actions>
            </q-card>
            <q-item v-else>
              <q-btn icon="add" rounded flat label="Add Task" @click="add_model.blocked=true"/>
            </q-item> -->
          </q-scroll-area>
        </q-card>
      </div>

      <div class="col-3 q-px-xs">
        <q-card class="q-pa-xs custom_bg2 ">
          <q-item style="cursor: move;" class="q-pa-none text-white q-pa-sm">
            <q-item-section class="text-h6 text-weight-bolder text-color">COMPLETED
            </q-item-section>
            <q-item-section avatar>
              <q-icon name="more_vert" class="cursor-pointer">
                <q-menu transition-show="fade" transition-hide="fade">
                  <q-list style="min-width: 100px">
                    <q-item clickable>
                      <q-item-section>Remove</q-item-section>
                    </q-item>
                    <q-item clickable>
                      <q-item-section>Option 1</q-item-section>
                    </q-item>
                    <q-item clickable>
                      <q-item-section>Option 2</q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-icon>
            </q-item-section>
          </q-item>

          <q-scroll-area
            :thumb-style="thumbStyle"
            :bar-style="barStyle"
            :style="{'height': getHeight}"
            class="col"
            ref="first"
          >
            <draggable
              class="list-group"
              :list="completed_task"
              group="tasks"
              v-bind="dragOptions"
              @start="drag = true"
              @end="drag = false"
            >
              <q-card
                v-for="(item, index) in completed_task"
                v-bind:key="index"
                class="rounded-borders q-my-sm"
                @mouseover="task_selected_index.completed = index"
                @mouseleave="task_selected_index.completed = null"
              >
                <q-card-section class="row q-pa-sm">
                  <div class="col-12">
                    <span class="text-weight-bold text-h6 q-ml-sm">{{ item.title }}</span>
                    <span class="float-right text-grey-8 q-mt-sm">{{ item.label }}
                    <q-icon
                      filled
                      size="xs"
                      name="close"
                      class="absolute-top-right q-mr-md q-mt-xs text-red"
                      v-if="index==task_selected_index.completed"
                      @click="deleteTask('completed', task_selected_index.completed)"
                    />
                    </span>
                  </div>
                </q-card-section>
                <q-card-section class="q-pa-sm">
                  <q-chip dense v-for="(tag, index) in item.tags" :key="index" :color="tag.color" text-color="white">
                    {{ tag.name }}
                  </q-chip>
                </q-card-section>
                <q-card-section class="q-pa-sm text-grey-8">
                  {{ item.description }}
                </q-card-section>
              </q-card>
            </draggable>
            <!-- <q-card class="full-width" v-if="add_model.completed">
              <q-card-section>
                <div class="text-h6">
                  Add Task
                </div>
              </q-card-section>
              <q-card-section class="q-pa-sm">
                <q-input dense v-model="add_data.completed.title" label="Title" outlined/>
                <q-input dense class="q-mt-sm" v-model="add_data.completed.label" label="Label" outlined/>
                <q-input dense class="q-mt-sm" v-model="add_data.completed.description" label="Description" outlined/>
              </q-card-section>
              <q-card-actions align="right" class="q-pa-sm text-grey-8">
                <q-btn label="Add" color="indigo-5" class="text-capitalize"></q-btn>
                <q-btn label="Cancel" color="primary" class="text-capitalize"
                       @click="add_model.completed=false"></q-btn>
              </q-card-actions>
            </q-card>
            <q-item v-else>
              <q-btn icon="add" rounded flat label="Add Task" @click="add_model.completed=true"/>
            </q-item> -->
          </q-scroll-area>
        </q-card>
      </div>

    </div>
    <q-resize-observer @resize="onResize"/>
  </q-page>
</template>

<script>
import Vue from "vue";
import draggable from "vuedraggable";
import {ref} from 'vue'

import {defineComponent} from 'vue'


let planned_task = [
  {
    title: 'Creativity Sets',
    label: '15 mins',
    tags: [{name: 'Warning', color: 'warning'}],
    description: '5 sets'
  },
  {
    title: 'Accomplishment Splitting',
    label: '10 mins',
    tags: [{name: 'On-time', color: 'positive'}],
    description: '2 sets'
  },
  {
    title: 'Written',
    label: '10 mins',
    tags: [{name: 'Warning', color: 'warning'}],
    description: '1 set'
  }
];
let wip_task = [
  {
    title: 'Enrollments',
    label: '30 mins',
    tags: [{name: 'On-time', color: 'positive'}],
    description: '2 sets'
  }
];
let blocked_task = [
  {
    title: 'Creativity',
    label: '30 mins',
    tags: [{name: 'Error', color: 'negative'}],
    description: 'Set with error, flag now!'
  },
];
let completed_task = [
  {
    title: 'Enrollments',
    label: '15 mins',
    tags: [],
    description: '1 set'
  },
  {
    title: 'Accomplishment',
    label: '15 mins',
    tags: [],
    description: '2 sets'
  }
];

export default defineComponent({
  name: "TaskBoard",
  component:{
    draggable
  },
  setup() {
    const size = ref({width: '200px', height: '200px'});


    return {
      task_selected_index: {
        blocked: ref(null),
        completed: ref(null),
        planned: ref(null),
        wip: ref(null)
      },
      thumbStyle: {
        right: ref('4px'),
        borderRadius: ref('5px'),
        backgroundColor: ref('#027be3'),
        width: ref('5px'),
        opacity: ref(0.75)
      },
      add_model: {
        blocked: ref(false),
        completed: ref(false),
        planned: ref(false),
        wip: ref(false)
      },
      add_data: {
        blocked: ref({}),
        completed: ref({}),
        planned: ref({}),
        wip: ref({})
      },
      size,
      barStyle: {
        right: ref('2px'),
        borderRadius: ref('9px'),
        backgroundColor: ref('#027be3'),
        width: ref('9px'),
        opacity: ref(0.2)
      },
      planned_task,
      wip_task,
      blocked_task,
      completed_task,

      deleteTask(name, index) {
        if (name == 'panned') {
          this.planned_task.splice(index, 1)
        }
        if (name == 'wip') {
          this.wip_task.splice(index, 1)
        }
        if (name == 'completed') {
          this.completed_task.splice(index, 1)
        }
        if (name == 'blocked') {
          this.blocked_task.splice(index, 1)
        }
      },

      onResize(size_dynamic) {
        size.value = size_dynamic;
      },
    };
  },
  computed: {
    dragOptions() {
      return {
        animation: 200,
        group: "description",
        disabled: false,
        ghostClass: "ghost"
      };
    },
    getHeight() {
      return this.size.height - 90 + 'px'
    }
  }
})
</script>

<style scoped>
.custom_bg {
  background-image: linear-gradient(to bottom, #a18cd1 0%, #fbc2eb 100%);
}

.custom_bg2 {
  background-image: linear-gradient(to bottom, #4facfe 0%, #00f2fe 100%);
}

.custom_bg3 {
  background-image: linear-gradient(to right, #74ebd5 0%, #9face6 100%);
}

.custom_bg4 {
  background-image: linear-gradient(to bottom, #a18cd1 0%, #fbc2eb 100%);
}

.text-color {
  color: white
}
</style>
