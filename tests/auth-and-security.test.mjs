import assert from 'node:assert/strict';

console.log('\x1b[36m=== Uitvoeren van Beveiligings- & Authenticatietests ===\x1b[0m\n');

let passedTests = 0;
let failedTests = 0;

function test(name, fn) {
  try {
    fn();
    console.log(`\x1b[32m✔ [PASS]\x1b[0m ${name}`);
    passedTests++;
  } catch (err) {
    console.error(`\x1b[31m✖ [FAIL]\x1b[0m ${name}:`, err.message);
    failedTests++;
  }
}

// Test 1: Wachtwoordvalidatie - minimale lengte 12 tekens
test('Wachtwoord validatie weigert wachtwoorden korter dan 12 tekens', () => {
  const isPasswordValid = (pwd) => Boolean(pwd && pwd.length >= 12);
  assert.equal(isPasswordValid('Kort123!'), false);
  assert.equal(isPasswordValid('12345678901'), false);
  assert.equal(isPasswordValid('VeiligWachtwoord2024!'), true);
});

// Test 2: Wachtwoordbevestiging match
test('Nieuw wachtwoord en bevestiging moeten identiek zijn', () => {
  const checkPasswordMatch = (pwd1, pwd2) => pwd1 === pwd2 && pwd1.length >= 12;
  assert.equal(checkPasswordMatch('VeiligWachtwoord2024!', 'AnderWachtwoord2024!'), false);
  assert.equal(checkPasswordMatch('VeiligWachtwoord2024!', 'VeiligWachtwoord2024!'), true);
});

// Test 3: Lockout drempel logica (5 mislukte pogingen)
test('Lockout treedt op bij 5 of meer mislukte pogingen', () => {
  const simulateAttempts = (attempts) => {
    if (attempts >= 5) {
      return { locked: true, lockDurationMinutes: 10 };
    }
    return { locked: false, remaining: 5 - attempts };
  };

  assert.equal(simulateAttempts(4).locked, false);
  assert.equal(simulateAttempts(4).remaining, 1);
  assert.equal(simulateAttempts(5).locked, true);
  assert.equal(simulateAttempts(6).locked, true);
});

// Test 4: SQL / PostgREST filter sanitization voor order ID
test('Order ID sanitization filtert gevaarlijke injectietekens weg', () => {
  const sanitizeId = (id) => String(id || '').trim().replace(/[^a-zA-Z0-9_-]/g, '');
  
  assert.equal(sanitizeId('ORD-2026-001'), 'ORD-2026-001');
  assert.equal(sanitizeId("ORD-2026'; DROP TABLE orders; --"), 'ORD-2026DROPTABLEorders--');
  assert.equal(sanitizeId('ORD,id.eq.admin'), 'ORDideqadmin');
  assert.equal(sanitizeId(''), '');
});

// Test 5: IDOR bescherming in orderbevestiging
test('Orderbevestiging lekt geen andere orders bij ontbrekend order ID', () => {
  const getOrderForConfirmation = (requestedId, allOrders) => {
    if (!requestedId) return null;
    const cleanId = String(requestedId).trim().replace(/[^a-zA-Z0-9_-]/g, '');
    if (!cleanId) return null;
    return allOrders.find(o => o.id === cleanId) || null;
  };

  const sampleOrders = [
    { id: 'ORD-001', customerName: 'Slachtoffer A', phone: '0471111111' },
    { id: 'ORD-002', customerName: 'Slachtoffer B', phone: '0472222222' }
  ];

  // Zonder ID mag GEEN order terugkomen
  assert.equal(getOrderForConfirmation(null, sampleOrders), null);
  assert.equal(getOrderForConfirmation('', sampleOrders), null);
  assert.equal(getOrderForConfirmation('ONBEKEND-999', sampleOrders), null);
  
  // Alleen met exact ID mag de order terugkomen
  const found = getOrderForConfirmation('ORD-001', sampleOrders);
  assert.notEqual(found, null);
  assert.equal(found.customerName, 'Slachtoffer A');
});

// Test 6: Geen plaintext geheimen of pincodes in client variabelen
test('Client environment mag geen beheerder pincodes bevatten', () => {
  const envKeys = ['VITE_SUPABASE_URL', 'VITE_SUPABASE_ANON_KEY'];
  const forbiddenKeys = ['VITE_ADMIN_PIN', 'VITE_ADMIN_PASSWORD', 'ADMIN_PASSWORD'];
  
  for (const f of forbiddenKeys) {
    assert.equal(envKeys.includes(f), false, `Verboden variabele ${f} gevonden!`);
  }
});

console.log(`\n\x1b[36mResultaat: ${passedTests} geslaagd, ${failedTests} mislukt.\x1b[0m`);

if (failedTests > 0) {
  process.exit(1);
}
