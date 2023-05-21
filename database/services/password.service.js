const { createHash } = require('crypto')
const passwordRepository = require('../repositories/password.repository')

class WrongPasswordError extends Error {
  constructor() {
    super("Wrong password.")
  }
}

const hash = (string) =>
  createHash('sha256').update(string).digest('hex')

const dbDoesNotContainPassword = ({ passwordFromRequest, passwordsFromDB }) =>
  !passwordsFromDB.some(pwdFromDb => pwdFromDb.value !== undefined && hash(passwordFromRequest) === pwdFromDb.value)

const checkPassword = async ({ password: passwordFromRequest }) => {

  const passwordsFromDB = await passwordRepository.getPasswords()

  if (dbDoesNotContainPassword({ passwordFromRequest, passwordsFromDB })) {
    throw new WrongPasswordError()
  }
}

module.exports = { checkPassword, WrongPasswordError }