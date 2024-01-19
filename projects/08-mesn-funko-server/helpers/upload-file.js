const path = require('node:path')
const { v4: uuidv4 } = require('uuid')

const uploadFile = (files, allowedExtensions = ['png', 'jpg', 'jpeg', 'gif'], folder = '') => {
  return new Promise((resolve, reject) => {
    const { file } = files
    const nameShorted = file.name.split('.')
    const extension = nameShorted[nameShorted.length - 1]

    if (!allowedExtensions.includes(extension)) {
      return reject(`La extensión ${extension} no es permitida - ${allowedExtensions}`)
    }

    const tempName = uuidv4() + '.' + extension
    const uploadPath = path.join(__dirname, '../uploads/', folder, tempName)

    file.mv(uploadPath, (err) => {
      if (err) {
        reject(err)
      }

      resolve(tempName)
    })
  })
}

module.exports = {
  uploadFile
}
