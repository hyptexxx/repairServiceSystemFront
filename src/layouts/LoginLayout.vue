<template lang="pug">
  q-layout(view="lHh Lpr lFf")
    q-page-container
      router-view
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class LoginLayout extends Vue {

}
</script>
