<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '@/lib/supabaseClient';

const countries = ref({})

async function getCountries() {
  const { data } = await supabase.from('countries').select()
  countries.value = data
}


let { data: countries, error } = await supabase
  .from('countries')
  .select('continent')


onMounted(() => {
  getCountries()
})
</script>

<template>
    <li v-for="country in countries" :key="country.id">{{ country.name }}</li>
</template>
