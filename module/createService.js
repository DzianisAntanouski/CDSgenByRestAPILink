const fs = require('fs')

const readSchemaFile = () => {
  return new Promise((resolve, reject) => {
    fs.readFile('./db/schema.cds', 'utf-8', (error, data) => {
      if (error) {
        reject(error)
      } else {
        resolve(data)
      }
    })
  })
}

const writeServiceFile = (serviceContent) => {
  return new Promise((resolve, reject) => {
    fs.writeFile('./srv/mySrv.cds', serviceContent, 'utf-8', (error) => {
      if (error) {
        reject(error)
      } else {
        resolve()
      }
    })
  })
}

module.exports = createService = async () => {
  try {
    const schema = await readSchemaFile()
    // const entities = schema.match(/entity\s[a-zA-Z]+/g)
    const entities = schema.match(/entity\s\w+/g)

    let serviceContent = 'using { test } from \'../db/schema.cds\';\n\nservice mySrv {\n'
    entities.forEach(entity => {
      const entityName = entity.split(' ')[1]
      serviceContent += `  entity ${entityName} as select from test.${entityName};\n`
    })
    serviceContent += '}'
    await writeServiceFile(serviceContent)
    console.log('Service created successfully')
  } catch (error) {
    console.error(error)
  }
}