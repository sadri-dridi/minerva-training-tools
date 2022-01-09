<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex bg-image flex-center">
        <q-card v-bind:style="$q.screen.lt.sm?{'width': '80%'}:{'width':'30%'}" class="bg-secondary text-white" style="border-radius: 25px">
          <q-card-section>
            <q-avatar size="130px" class="absolute-center shadow-10 bg-black">
              <img src="logo.png">
            </q-avatar>
          </q-card-section>
          <q-card-section>
            <div class="text-center q-pt-xl">
              <div class="col text-h6 ellipsis">
                Log in
              </div>
            </div>
          </q-card-section>
          <q-card-section>
            <q-form
              class="q-gutter-md text-white"
              @submit="login()"
            >
              <q-input
                dark
                filled
                v-model="form.email"
                label="Email"
              />

              <q-input
                dark
                type="password"
                filled
                v-model="form.password"
                label="Password"

              />

              <div class="text-center">
                <q-btn label="Login" type="submit" color="primary" class="q-mt-md q-px-xl q-py-md" style="border-radius: 25px" />
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { User } from 'src/models/User'

export default {
  data: () => ({
    form: {},
  }),
  methods: {
    async login() {
      const success = await new User().login(this.form)
      if (success === 401) {
        this.verifyAccount = true

      }else if (success){
        this.$i18n.locale = localStorage.lang 
        window.location.href = '/'
      }else{

      }
    },
  }
}
</script>

<style>

.bg-image {
  background-image: linear-gradient(135deg, #6a0ffd 0%, #c0638f 100%);
}
</style>
