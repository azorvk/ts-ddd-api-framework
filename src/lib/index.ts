import glob from 'glob'
import path from 'path'

const rootDir = path.dirname(__dirname);

export default {
  filesInsideFolder: (folder: string, withExtension = false) => {
    const ignoredFiles = ['index.js', '_*']
    return glob.sync(`${rootDir}/**/${folder}/*.js`, {
      ignore: ignoredFiles.map(file => `**/${file}`)
    }).map(file => {
      const fileNameWithExtension = file.substring(file.lastIndexOf('/') + 1)
      const fileName = fileNameWithExtension.substring(0, fileNameWithExtension.length - 3)
      return withExtension ? fileNameWithExtension : fileName
    })
  },

  isEmpty: (object: object) => {
    return Object.entries(object).length === 0 && object.constructor === Object
  }

}