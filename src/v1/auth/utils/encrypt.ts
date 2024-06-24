// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcrypt') as typeof import('bcrypt');
const HASH_SALT_ROUNDS = 5;

export function hash(value: string) {
  return bcrypt.hashSync(value, HASH_SALT_ROUNDS);
}

export function compare(value: string, encrypted: string) {
  return bcrypt.compare(value, encrypted);
}
