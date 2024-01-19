const { response, request } = require('express')
const { Product } = require('../models')

const getProducts = async (req = request, res = response) => {
  const { limit = 5, offset = 0 } = req.query
  const query = { status: true }

  const [total, products] = await Promise.all([
    Product.countDocuments(query),
    Product.find(query)
      .populate('user', 'name')
      .populate('category', 'name')
      .skip(Number(offset))
      .limit(Number(limit))
  ])

  res.json({
    total,
    products
  })
}

const getProduct = async (req = request, res = response) => {
  const { id } = req.params
  const product = await Product.findById(id)
    .populate('user', 'name')
    .populate('category', 'name')

  res.json(product)
}

const createProduct = async (req = request, res = response) => {
  const { status, user, ...body } = req.body

  const productDB = await Product.findOne({ name: body.name })

  if (productDB) {
    return res.status(400).json({
      msg: `El producto ${productDB.name}, ya existe`
    })
  }

  // Generar la data a guardar
  const data = {
    ...body,
    name: body.name,
    user: req.user._id
  }

  const product = new Product(data)

  // Guardar DB
  await product.save()
  await product
    .populate('user', 'name')
    .populate('category', 'name')
    // .execPopulate()

  res.status(201).json(product)
}

const updateProduct = async (req = request, res = response) => {
  const { id } = req.params
  const { status, user, ...data } = req.body

  data.user = req.user._id

  const product = await Product.findByIdAndUpdate(id, data, { new: true })

  await product
    .populate('user', 'name')
    .populate('category', 'name')
    // .execPopulate()

  res.json(product)
}

const deleteProduct = async (req = request, res = response) => {
  const { id } = req.params
  const productDeleted = await Product.findByIdAndUpdate(id, { status: false }, { new: true })

  res.json(productDeleted)
}

module.exports = {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct
}
