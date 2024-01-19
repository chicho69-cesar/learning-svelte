const { response, request } = require('express')

const isInAdminRole = (req = request, res = response, next) => {
  if (!req.user) {
    return res.status(500).json({
      msg: 'Se quiere verificar el role sin validar el token primero'
    })
  }

  const { rol, name } = req.user

  if (rol !== 'ADMIN_ROLE') {
    return res.status(401).json({
      msg: `${name} no es administrador - No puede hacer esto`
    })
  }

  next()
}

const hasRole = (...roles) => {
  return (req = request, res = response, next) => {
    if (!req.user) {
      return res.status(500).json({
        msg: 'Se quiere verificar el role sin validar el token primero'
      })
    }

    if (!roles.includes(req.user.rol)) {
      return res.status(401).json({
        msg: `El servicio requiere uno de estos roles ${roles}`
      })
    }

    next()
  }
}

module.exports = {
  isInAdminRole,
  hasRole
}
