const { createHash } = require('crypto')
const passwordRepository = require('../repositories/password.repository')

class WrongPasswordError extends Error {
  constructor() {
    super("Wrong password.")
  }
}

const hash = (string) => createHash('sha256').update(string).digest('hex')

const checkPassword = async ({ password }) => {

  const passwords = await passwordRepository.getPasswords()
  if (!passwords.some(pwdFromDb => pwdFromDb.value !== undefined && hash(password) === pwdFromDb.value)) {
    throw new WrongPasswordError()
  }
}

module.exports = { checkPassword, WrongPasswordError }