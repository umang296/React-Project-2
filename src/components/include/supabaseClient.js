import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ccvwhqvtkjhvkhprpayi.supabase.co';
const supabaseAnonKey = 'sb_publishable_q6ajxV1M7jJcwvndtGNAuw_-gWswS_d';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);