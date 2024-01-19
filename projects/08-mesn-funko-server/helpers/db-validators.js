const { User, Category, Product, Role } = require('../models')

const isValidRole = async (rol = 'USER_ROLE') => {
  const existsRole = await Role.findOne({ rol })

  if (!existsRole) {
    throw new Error(`El rol ${rol} no está registrado en la BD`)
  }
}

const emailExists = async (email = '') => {
  const existsEmail = await User.findOne({ email })

  if (existsEmail) {
    throw new Error(`El correo: ${email}, ya está registrado`)
  }
}

const existsUserById = async (id) => {
  const existsUser = await User.findById(id)

  if (!existsUser) {
    throw new Error(`El id no existe ${id}`)
  }
}

const existsCategoryById = async (id) => {
  const existsCategory = await Category.findById(id)

  if (!existsCategory) {
    throw new Error(`El id no existe ${id}`)
  }
}

const existsProductById = async (id) => {
  const existsProduct = await Product.findById(id)

  if (!existsProduct) {
    throw new Error(`El id no existe ${id}`)
  }
}

const allowedCollections = (collection = '', collections = []) => {
  const isInclude = collections.includes(collection)

  if (!isInclude) {
    throw new Error(`La colección ${collection} no es permitida, ${collections}`)
  }

  return true
}

module.exports = {
  isValidRole,
  emailExists,
  existsUserById,
  existsCategoryById,
  existsProductById,
  allowedCollections
}
