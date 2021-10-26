import HashIds from 'hashids';

//don't change this, we won't be able to parse values that have already been hashed
const salt = '6fb6102f-c6a2-44e9-ab3a-96995caa1d8a';

const encodeHash = (value: number) => {
  if (value <= 0) {
    throw new Error('Must be an Int32 value, greater than 0');
  }

  const hasher = new HashIds(salt);

  return hasher.encode(value);
};

const decodeHash = (value: string) => {
  const hasher = new HashIds(salt);

  const result = hasher.decode(value);

  if (result && result.length) {
    return result[0];
  }

  throw new Error('Unable to parse the value to an integer');
};

export { encodeHash, decodeHash };
