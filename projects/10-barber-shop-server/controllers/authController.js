import {
  sendEmailPasswordReset,
  sendEmailVerification,
} from '../emails/authEmailService.js'
import User from '../models/User.js'
import { generateJWT, uniqueId } from '../utils/index.js'

const register = async (req, res) => {
  if (Object.entries(req.body).length === 0) {
    const error = new Error('Cuerpo de la petición inválido.')

    return res.status(400).json({
      msg: error.message
    })
  }

  if (Object.values(req.body).includes('')) {
    const error = new Error('Todos los campos son obligatorios')
    
    return res.status(400).json({
      msg: error.message,
    })
  }

  const { email, password, name } = req.body

  const userExist = await User.findOne({ email })
  
  if (userExist) {
    const error = new Error('El usuario ya existe')
    
    return res.status(400).json({
      msg: error.message,
    })
  }

  const MIN_PASSWORD_LENGTH = 8

  if (password.trim().length < 8) {
    const error = new Error(
      `El password debe de contener: ${MIN_PASSWORD_LENGTH} caracteres`
    )

    return res.status(400).json({
      msg: error.message,
    })
  }

  try {
    const user = new User(req.body)
    const result = await user.save()

    const { name, email, token } = result
    sendEmailVerification({ name, email, token })

    return res.status(201).json({
      msg: 'El usuario se creó correctamente, revisa tu email',
    })
  } catch (error) {
    console.log(error)

    return res.status(400).json({
      msg: error.message
    })
  }
}

const verifyAccount = async (req, res) => {
  const { token } = req.params
  
  const user = await User.findOne({ token })

  if (!user) {
    const error = new Error('Hubo un error, token no válido')
    return res.status(401).json({ msg: error.message })
  }

  try {
    user.verified = true
    user.token = ''

    await user.save()
    
    return res.json({
      msg: 'Usuario confirmado correctamente'
    })
  } catch (error) {
    console.log(error)

    return res.status(400).json({
      msg: error.message
    })
  }
}

const login = async (req, res) => {
  if (Object.entries(req.body).length === 0) {
    const error = new Error('Cuerpo de la petición inválido.')

    return res.status(400).json({
      msg: error.message
    })
  }

  if (Object.values(req.body).includes('')) {
    const error = new Error('Todos los campos son obligatorios.')

    return res.status(400).json({
      msg: error.message
    })
  }

  const { email, password } = req.body

  if(!password || !email) {
    const error = new Error('Las credenciales son necesarias.')
    
    return res.status(401).json({
      msg: error.message
    })
  }

  const user = await User.findOne({ email })
  
  if (!user) {
    const error = new Error('El usuario no existe')

    return res.status(401).json({
      msg: error.message
    })
  }

  if (!user.verified) {
    const error = new Error('Tu cuenta no ha sido confirmada aún')

    return res.status(401).json({
      msg: error.message
    })
  }

  if (await user.checkPassword(password)) {
    const token = generateJWT(user._id)
    return res.json({ token })
  } else {
    const error = new Error('El password es incorrecto')
    return res.status(401).json({ msg: error.message })
  }
}

const forgotPassword = async (req, res) => {
  const { email } = req.body

  const user = await User.findOne({ email })
  
  if (!user) {
    const error = new Error('El usuario no existe')
    return res.status(404).json({ msg: error.message })
  }

  try {
    user.token = uniqueId()
    const result = await user.save()

    await sendEmailPasswordReset({
      name: result.name,
      email: result.email,
      token: result.token,
    })

    return res.json({
      msg: 'Hemos enviado un email con las instrucciones',
    })
  } catch (error) {
    console.log(error)

    return res.status(400).json({
      msg: error.message
    })
  }
}

const verifyPasswordResetToken = async (req, res) => {
  const { token } = req.params

  const isValidToken = await User.findOne({ token })

  if (!isValidToken) {
    const error = new Error('Hubo un error, Token no válido')
    return res.status(400).json({ msg: error.message })
  }

  return res.json({ msg: 'Token Válido' })
}

const updatePassword = async (req, res) => {
  const { token } = req.params
  const { password } = req.body

  const user = await User.findOne({ token })
  
  if (!user) {
    const error = new Error('Hubo un error, token no válido.')
    
    return res.status(400).json({
      msg: error.message
    })
  }

  try {
    user.token = ''
    user.password = password

    await user.save()
    
    return res.json({
      msg: 'Contraseña restablecida correctamente.'
    })
  } catch (error) {
    console.log(error)

    return res.status(400).json({
      msg: error.message
    })
  }
}

const user = async (req, res) => {
  const { user } = req
  return res.json(user)
}

const admin = async (req, res) => {
  const { user } = req
  
  if (!user.admin) {
    const error = new Error('Acción no válida')
    return res.status(403).json({ msg: error.message })
  }

  return res.json(user)
}

export {
  admin,
  forgotPassword,
  login,
  register,
  updatePassword,
  user,
  verifyAccount,
  verifyPasswordResetToken
}
