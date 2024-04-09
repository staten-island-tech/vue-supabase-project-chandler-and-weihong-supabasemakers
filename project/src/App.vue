<script setup>
// import { ref, onMounted } from 'vue'
// import { supabase } from './lib/supabaseClient'

// const countries = ref([
//   {id:0, name:'Chandler country'},
//   {id:1, name:'Weihong country'},
//   {id:2, name:'valorant country'},
// ])

// async function getCountries() {
//   const { data } = await supabase.from('countries').select()
//   countries.value = data
// }

// onMounted(() => {
//   getCountries()
// })

import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <!-- <ul>
    <li v-for="country in countries" :key="country.id">{{ country.name }}</li>
  </ul> --> 
  <div class="wrapper">
      <nav>
        <RouterView to="/"></RouterView>
      </nav>
    </div>
</template>