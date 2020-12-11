<template lang="pug">
  q-page.row.items-center.justify-evenly
    login-form
</template>

<script lang="ts">
import LoginForm from 'components/LoginForm.vue'
import { Vue, Component } from 'vue-property-decorator'

@Component({
  components: { LoginForm }
})
export default class PageIndex extends Vue {

}
</script>
