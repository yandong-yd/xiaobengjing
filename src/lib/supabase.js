import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase =
  supabaseUrl && supabaseKey && !supabaseUrl.includes('your_')
    ? createClient(supabaseUrl, supabaseKey)
    : null

export async function fetchProjects() {
  if (!supabase) return null
  const { data, error } = await supabase.from('projects').select('*').order('created_at', { ascending: false })
  if (error) throw error
  return data
}

export async function fetchProject(id) {
  if (!supabase) return null
  const { data, error } = await supabase.from('projects').select('*').eq('id', id).single()
  if (error) throw error
  return data
}

export async function fetchCases() {
  if (!supabase) return null
  const { data, error } = await supabase.from('cases').select('*').order('created_at', { ascending: false })
  if (error) throw error
  return data
}

export async function fetchCase(id) {
  if (!supabase) return null
  const { data, error } = await supabase.from('cases').select('*').eq('id', id).single()
  if (error) throw error
  return data
}
