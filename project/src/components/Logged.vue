<script setup>
import { onMounted, ref } from 'vue'
import Account from './components/Account.vue'
import Auth from './components/Auth.vue'
import { supabase } from './supabase'
import {username} from './Account.vue'

const props = defineProps(['loggedin'])
const { loggedin } = toRefs(props)

username.value = false;

</script>

<template>
    <div>
<p></p>
    </div>
</template>

<style lang="scss" scoped>

</style>