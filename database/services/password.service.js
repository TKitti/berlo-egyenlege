const { createHash } = require('crypto')
const passwordRepository = require('../repositories/password.repository')

const hash = (string) =>
  createHash('sha256').update(string).digest('hex')

const isPasswordAccepted = (passwordFromRequest, passwordsFromDB) =>
  passwordFromRequest && passwordsFromDB && passwordsFromDB.some(pwdFromDb => pwdFromDb.value && hash(passwordFromRequest) === pwdFromDb.value)

const checkPassword = async (passwordFromRequest) => {

  const passwordsFromDB = await passwordRepository.getPasswords()

  if (!isPasswordAccepted(passwordFromRequest, passwordsFromDB)) {
    throw new Error("Wrong password.")
  }
}

module.exports = { checkPassword }