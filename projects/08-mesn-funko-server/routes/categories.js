const { Router } = require('express')
const { check } = require('express-validator')

const { validateJWT, validateFields, isInAdminRole } = require('../middlewares')
const { 
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory
} = require('../controllers/categories')
const { existsCategoryById } = require('../helpers/db-validators')

const router = Router()

router.get('/', getCategories)

router.get('/:id', [
  check('id', 'No es un id de Mongo válido').isMongoId(),
  check('id').custom(existsCategoryById),
  validateFields,
], getCategory)

router.post('/', [
  validateJWT,
  check('name', 'El nombre es obligatorio').not().isEmpty(),
  validateFields
], createCategory)

router.put('/:id', [
  validateJWT,
  check('name', 'El nombre es obligatorio').not().isEmpty(),
  check('id').custom(existsCategoryById),
  validateFields
], updateCategory)

router.delete('/:id', [
  validateJWT,
  check('id', 'No es un id de Mongo válido').isMongoId(),
  check('id').custom(existsCategoryById),
  validateFields,
], deleteCategory)

module.exports = router
