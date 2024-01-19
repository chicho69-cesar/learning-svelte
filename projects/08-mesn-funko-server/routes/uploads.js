const { Router } = require('express')
const { check } = require('express-validator')

const { validateFields, validateFile } = require('../middlewares')
const { loadFile, updateImage, updateImageCloudinary, showImage } = require('../controllers/uploads')
const { allowedCollections } = require('../helpers')

const router = Router()

router.post('/', validateFile, loadFile)

router.put('/:collection/:id/cloudinary', [
  validateFile,
  check('id', 'El id debe de ser de mongo').isMongoId(),
  check('collection').custom((c) => allowedCollections(c, ['users', 'products', 'categories'])),
  validateFields
], updateImageCloudinary)

router.put('/:collection/:id', [
  validateFile,
  check('id', 'El id debe de ser de mongo').isMongoId(),
  check('collection').custom((c) => allowedCollections(c, ['users', 'products', 'categories'])),
  validateFields
], updateImage)

router.get('/:collection/:id', [
  check('id', 'El id debe de ser de mongo').isMongoId(),
  check('collection').custom((c) => allowedCollections(c, ['users', 'products', 'categories'])),
  validateFields
], showImage)

module.exports = router
