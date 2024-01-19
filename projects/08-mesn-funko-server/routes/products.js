const { Router } = require('express')
const { check } = require('express-validator')

const { validateJWT, validateFields, isInAdminRole } = require('../middlewares')
const { 
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/products')
const { existsCategoryById, existsProductById } = require('../helpers/db-validators')

const router = Router()

router.get('/', getProducts)

router.get('/:id', [
  check('id', 'No es un id de Mongo válido').isMongoId(),
  check('id').custom(existsProductById),
  validateFields,
], getProduct)

router.post('/', [
  validateJWT,
  check('name', 'El nombre es obligatorio').not().isEmpty(),
  check('category', 'No es un id de Mongo').isMongoId(),
  check('category').custom(existsCategoryById),
  validateFields
], createProduct)

router.put('/:id', [
  validateJWT,
  // check('category','No es un id de Mongo').isMongoId(),
  check('id').custom(existsProductById),
  validateFields
], updateProduct)

router.delete('/:id', [
  validateJWT,
  isInAdminRole,
  check('id', 'No es un id de Mongo válido').isMongoId(),
  check('id').custom(existsProductById),
  validateFields,
], deleteProduct)

module.exports = router
