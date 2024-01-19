const { response, request } = require('express')
const bcryptjs = require('bcryptjs')

const { User } = require('../models')
const { generateJWT } = require('../helpers')

const getUserById = async (req = request, res = response) => {
  const { id } = req.params
  const user = await User.findById(id)

  res.json(user)
}

const getUsers = async (req = request, res = response) => {
  const { limit = 5, offset = 0 } = req.query
  const query = { status: true }

  const [total, users] = await Promise.all([
    User.countDocuments(query),
    User.find(query)
      .skip(Number(offset))
      .limit(Number(limit))
  ])

  res.json({
    total,
    users
  })
}

const createUser = async (req = request, res = response) => {
  const { name, email, password, rol } = req.body
  const user = new User({ name, email, password, rol })

  // Encriptar la contraseña
  const salt = bcryptjs.genSaltSync()
  user.password = bcryptjs.hashSync(password, salt)

  // Guardar en BD
  await user.save()

  // Generar el JWT
  const token = await generateJWT(user.id)

  res.json({
    user,
    token
  })
}

const updateUser = async (req = request, res = response) => {
  const { id } = req.params
  const { _id, password, google, ...rest } = req.body

  if (password) {
    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync()
    rest.password = bcryptjs.hashSync(password, salt)
  }

  const user = await User.findByIdAndUpdate(id, rest, { new: true })

  res.json(user)
}

const upgradeUser = (req = request, res = response) => {
  res.json({
    msg: 'patch API - usuariosPatch'
  })
}

const deleteUser = async (req = request, res = response) => {
  const { id } = req.params
  const user = await User.findByIdAndUpdate(id, { status: false })

  res.json(user)
}

module.exports = {
  getUsers,
  createUser,
  updateUser,
  upgradeUser,
  deleteUser,
  getUserById
}
