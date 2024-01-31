export default async ({ username, password }) => {
  return new Promise((resolve, reject) => {
    const nameRegExp = /[A-Za-z][^0-9]*\s?/;
    setTimeout(() => {
      if (username.length >= 1 && password.length > 7) {
        resolve('Success! Meow!'); // 'Success! Meow!'
      } else {
        // throw new Error('wrong format')
        reject('Fail...Rrrrr');
      }
    }, 1000)
  })
}
