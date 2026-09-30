import readline from 'node:readline';
import { createClient } from '@supabase/supabase-js';
import fs from 'node:fs';
import path from 'node:path';

// Lees .env bestand uit
const envPath = path.resolve(process.cwd(), '.env');
let supabaseUrl = process.env.VITE_SUPABASE_URL;
let supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (fs.existsSync(envPath)) {
  const content = fs.readFileSync(envPath, 'utf8');
  for (const line of content.split('\n')) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const [key, ...vals] = trimmed.split('=');
      const val = vals.join('=').trim().replace(/^["']|["']$/g, '');
      if (key.trim() === 'VITE_SUPABASE_URL') supabaseUrl = val;
      if (key.trim() === 'VITE_SUPABASE_ANON_KEY') supabaseAnonKey = val;
    }
  }
}

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('\x1b[31m[FOUT] VITE_SUPABASE_URL of VITE_SUPABASE_ANON_KEY ontbreekt in .env\x1b[0m');
  process.exit(1);
}

// Opschonen URL
supabaseUrl = supabaseUrl.replace(/\/rest\/v1\/?$/, '').replace(/\/+$/, '');

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const askQuestion = (query) => new Promise(resolve => rl.question(query, resolve));

async function main() {
  console.log('\n\x1b[36m========================================================\x1b[0m');
  console.log('\x1b[36m  Grill Room Isis - Eerste Beheerder (Admin) Setup      \x1b[0m');
  console.log('\x1b[36m========================================================\x1b[0m\n');

  try {
    const username = await askQuestion('Voer gewenste gebruikersnaam in (bijv. admin): ');
    if (!username || username.trim().length < 3) {
      console.log('\x1b[31m[FOUT] Gebruikersnaam moet minimaal 3 tekens bevatten.\x1b[0m');
      rl.close();
      return;
    }

    const password = await askQuestion('Voer een veilig wachtwoord in (minimaal 12 tekens): ');
    if (!password || password.length < 12) {
      console.log('\x1b[31m[FOUT] Wachtwoord moet minimaal 12 tekens bevatten.\x1b[0m');
      rl.close();
      return;
    }

    const confirmPassword = await askQuestion('Bevestig wachtwoord: ');
    if (password !== confirmPassword) {
      console.log('\x1b[31m[FOUT] Wachtwoorden komen niet overeen.\x1b[0m');
      rl.close();
      return;
    }

    console.log('\nBezig met aanmaken van admin account via Supabase...');

    const { data, error } = await supabase.rpc('create_first_admin', {
      p_username: username.trim().toLowerCase(),
      p_password: password
    });

    if (error) {
      console.error('\x1b[31m[FOUT bij aanroepen database]:', error.message, '\x1b[0m');
      console.log('\x1b[33mTip: Heeft u het migratiescript docs/migrations/01_admin_auth.sql al uitgevoerd in de Supabase SQL Editor?\x1b[0m\n');
    } else if (data && !data.success) {
      console.error('\x1b[31m[GEWEIGERD]:', data.error, '\x1b[0m\n');
    } else {
      console.log('\x1b[32m[SUCCES]:', data?.message || 'Admin succesvol aangemaakt!', '\x1b[0m');
      console.log('\x1b[32mU kunt nu inloggen via het beheerderspaneel (/admin) met deze gegevens.\x1b[0m\n');
    }
  } catch (err) {
    console.error('\x1b[31mOnverwachte fout:', err.message, '\x1b[0m');
  } finally {
    rl.close();
  }
}

main();
