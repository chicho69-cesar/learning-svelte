const path = require('node:path')
const fs = require('node:fs')
const { response, request } = require('express')

const cloudinary = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL)

const { uploadFile } = require('../helpers')
const { User, Product, Category } = require('../models')

const loadFile = async (req = request, res = response) => {
  try {
    // txt, md
    // const nombre = await subirArchivo( req.files, ['txt','md'], 'textos' )
    const nombre = await uploadFile(req.files, undefined, 'imgs')
    res.json({ nombre })

  } catch (msg) {
    res.status(400).json({ msg })
  }
}

const updateImage = async (req = request, res = response) => {
  const { id, collection } = req.params

  let model

  switch (collection) {
    case 'users':
      model = await User.findById(id)

      if (!model) {
        return res.status(400).json({
          msg: `No existe un usuario con el id ${id}`
        })
      }

      break

    case 'products':
      model = await Product.findById(id)

      if (!model) {
        return res.status(400).json({
          msg: `No existe un producto con el id ${id}`
        })
      }

      break
    
    case 'categories':
      model = await Category.findById(id)

      if (!model) {
        return res.status(400).json({
          msg: `No existe una categoría con el id ${id}`
        })
      }

      break

    default:
      return res.status(500).json({ msg: 'Se me olvidó validar esto' })
  }

  // Limpiar imágenes previas
  if (model.img) {
    // Hay que borrar la imagen del servidor
    const pathImagen = path.join(__dirname, '../uploads', collection, model.img)

    if (fs.existsSync(pathImagen)) {
      fs.unlinkSync(pathImagen)
    }
  }

  const name = await uploadFile(req.files, undefined, collection)
  model.img = name

  await model.save()

  res.json(model)
}

const updateImageCloudinary = async (req = request, res = response) => {
  const { id, collection } = req.params

  let model

  switch (collection) {
    case 'users':
      model = await User.findById(id)

      if (!model) {
        return res.status(400).json({
          msg: `No existe un usuario con el id ${id}`
        })
      }

      break

    case 'products':
      model = await Product.findById(id)

      if (!model) {
        return res.status(400).json({
          msg: `No existe un producto con el id ${id}`
        })
      }

      break

    case 'categories':
      model = await Category.findById(id)

      if (!model) {
        return res.status(400).json({
          msg: `No existe una categoría con el id ${id}`
        })
      }

      break

    default:
      return res.status(500).json({ msg: 'Se me olvidó validar esto' })
  }

  // Limpiar imágenes previas
  if (model.img) {
    const arrayName = model.img.split('/')
    const name = arrayName[arrayName.length - 1]
    const [public_id] = name.split('.')

    cloudinary.uploader.destroy(public_id)
  }

  const { tempFilePath } = req.files.file
  const { secure_url } = await cloudinary.uploader.upload(tempFilePath)
  model.img = secure_url

  await model.save()

  res.json(model)
}

const showImage = async (req = request, res = response) => {
  const { id, collection } = req.params

  let model

  switch (collection) {
    case 'users':
      model = await User.findById(id)

      if (!model) {
        return res.status(400).json({
          msg: `No existe un usuario con el id ${id}`
        })
      }

      break

    case 'products':
      model = await Product.findById(id)

      if (!model) {
        return res.status(400).json({
          msg: `No existe un producto con el id ${id}`
        })
      }

      break

    case 'categories':
      model = await Category.findById(id)

      if (!model) {
        return res.status(400).json({
          msg: `No existe una categoría con el id ${id}`
        })
      }

      break

    default:
      return res.status(500).json({ msg: 'Se me olvidó validar esto' })
  }

  // Limpiar imágenes previas
  if (model.img) {
    // Hay que borrar la imagen del servidor
    const pathImagen = path.join(__dirname, '../uploads', collection, model.img)

    if (fs.existsSync(pathImagen)) {
      return res.sendFile(pathImagen)
    }
  }

  const pathImagen = path.join(__dirname, '../assets/no-image.jpg')
  res.sendFile(pathImagen)
}

module.exports = {
  loadFile,
  updateImage,
  showImage,
  updateImageCloudinary
}
