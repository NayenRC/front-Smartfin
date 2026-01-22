import { createClient } from '@supabase/supabase-js';
import { CollectedData } from '../types';

const supabaseUrl = process.env.SUPABASE_URL || 'https://xyzcompany.supabase.co';
const supabaseKey = process.env.SUPABASE_ANON_KEY || 'public-anon-key';

export const supabase = createClient(supabaseUrl, supabaseKey);

// Simulate Auth for demo purposes if no real credentials are provided
export const signUpUser = async (email: string, password: string) => {
  if (supabaseUrl === 'https://xyzcompany.supabase.co') {
    console.log('Simulating Supabase SignUp:', email);
    // Return a fake user object after a delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { data: { user: { id: 'fake-user-id', email } }, error: null };
  }

  return await supabase.auth.signUp({
    email,
    password,
  });
};

export const saveOnboardingData = async (userId: string, data: CollectedData) => {
  if (supabaseUrl === 'https://xyzcompany.supabase.co') {
    console.log('Simulating Data Save for User:', userId, data);
    return { error: null };
  }

  // Example table structure
  const table = data.type === 'EXPENSE' ? 'expenses' : 'goals';
  
  return await supabase
    .from(table)
    .insert([{ 
      user_id: userId,
      amount: data.amount, 
      category: data.category, 
      created_at: new Date() 
    }]);
};