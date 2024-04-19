import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://gpzymqnrxhglplnvdgao.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdwenltcW5yeGhnbHBsbnZkZ2FvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTIyNTAwNjYsImV4cCI6MjAyNzgyNjA2Nn0.H932C99DTX-FnVnNHaTWSy2X9Rqfe6Et11ySd4yB-hU'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)