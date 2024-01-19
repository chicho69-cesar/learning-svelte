const { response, request } = require('express')
const { Category } = require('../models')

const getCategories = async (req = request, res = response) => {
  // const { limite = 5, desde = 0 } = req.query
  const query = { status: true }

  const [total, categories] = await Promise.all([
    Category.countDocuments(query),
    Category.find(query)
      .populate('user', 'name')
      // .skip( Number( desde ) )
      // .limit(Number( limite ))
  ])

  res.json({
    total,
    categories
  })
}

const getCategory = async (req = request, res = response) => {
  const { id } = req.params
  const category = await Category.findById(id)
    .populate('user', 'name')

  res.json(category)

}

const createCategory = async (req = request, res = response) => {
  const { name } = req.body

  const categoryDB = await Category.findOne({ name })

  if (categoryDB) {
    return res.status(400).json({
      msg: `La categoría ${categoryDB.name}, ya existe`
    })
  }

  // Generar la data a guardar
  const data = {
    name,
    user: req.user._id
  }

  const category = new Category(data)

  // Guardar DB
  await category.save()

  await category
    .populate('user', 'name')
    // .execPopulate()

  res.status(201).json(category)
}

const updateCategory = async (req = request, res = response) => {
  const { id } = req.params
  const { status, user, ...data } = req.body

  data.user = req.user._id

  const category = await Category.findByIdAndUpdate(id, data, { new: true })

  res.json(category)
}

const deleteCategory = async (req = request, res = response) => {
  const { id } = req.params
  const categoryDeleted = await Category.findByIdAndUpdate(id, { status: false }, { new: true })

  res.json(categoryDeleted)
}

module.exports = {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory
}
