const { Router } = require('express')
const { check } = require('express-validator')

const {
  validateFields,
  validateJWT,
  isInAdminRole,
  hasRole,
} = require('../middlewares')
const { isValidRole, emailExists, existsUserById } = require('../helpers/db-validators')
const { 
  getUsers,
  updateUser,
  createUser,
  deleteUser,
  upgradeUser,
  getUserById 
} = require('../controllers/users')

const router = Router()

router.get('/', getUsers)

router.put('/:id', [
  check('id', 'No es un ID válido').isMongoId(),
  check('id').custom(existsUserById),
  check('rol').custom(isValidRole),
  validateFields
], updateUser)

router.post('/', [
  check('name', 'El nombre es obligatorio').not().isEmpty(),
  check('password', 'El password debe de ser más de 6 letras').isLength({ min: 6 }),
  check('email', 'El correo no es válido').isEmail(),
  check('email').custom(emailExists),
  // check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE','USER_ROLE']),
  check('rol').custom(isValidRole),
  validateFields
], createUser)

router.delete('/:id', [
  validateJWT,
  // esAdminRole,
  hasRole('ADMIN_ROLE'/* , 'SALES_ROLE', 'MANAGEMENT_ROLE' */),
  check('id', 'No es un ID válido').isMongoId(),
  check('id').custom(existsUserById),
  validateFields
], deleteUser)

router.get('/:id', [
  validateJWT,
  // esAdminRole,
  check('id', 'No es un ID válido').isMongoId(),
  check('id').custom(existsUserById),
  validateFields
], getUserById)

router.patch('/', upgradeUser)

module.exports = router
