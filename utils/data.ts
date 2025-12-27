export function randomString(prefix = 'user'): string {
  const ts = new Date().getTime();
  const rnd = Math.floor(Math.random() * 1e6);
  return `${prefix}_${ts}_${rnd}`;
}

export function makeTestUser() {
  const username = randomString('jpet');
  const password = randomString('Pass');
  return {
    username,
    password,
    firstName: 'mohamed',
    lastName: 'bar',
    email: `${username}@example.com`,
    phone: '01024503031',
    address1: '123 egypt Street',
    address2: '',
    city: 'cairo',
    state: 'TS',
    zip: '12345',
    country: 'USA',
    languagePreference: 'english',
    favouriteCategoryId: 'FISH'
  };
}
