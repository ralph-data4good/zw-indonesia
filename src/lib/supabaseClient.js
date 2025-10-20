// Supabase client setup - currently commented out for mock data phase
// Uncomment and configure when ready to connect to Supabase

/*
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
*/

// Placeholder export for now
export const supabase = null;

// Example query functions for future use:
/*
export async function fetchOrganizations() {
  const { data, error } = await supabase
    .from('organizations')
    .select('*')
    .order('name');
  
  if (error) throw error;
  return data;
}

export async function fetchDirectory(filters = {}) {
  let query = supabase
    .from('directory')
    .select('*');
  
  if (filters.entryType) {
    query = query.eq('entry_type', filters.entryType);
  }
  
  if (filters.verified) {
    query = query.eq('status_badge', 'verified');
  }
  
  const { data, error } = await query.order('name');
  
  if (error) throw error;
  return data;
}

export async function fetchResources(filters = {}) {
  let query = supabase
    .from('resources')
    .select('*');
  
  if (filters.topic) {
    query = query.contains('topics', [filters.topic]);
  }
  
  if (filters.year) {
    query = query.eq('year', filters.year);
  }
  
  if (filters.format) {
    query = query.eq('format', filters.format);
  }
  
  const { data, error } = await query.order('year', { ascending: false });
  
  if (error) throw error;
  return data;
}
*/

