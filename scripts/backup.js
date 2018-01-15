const { production, development } = require('../env.json')
const { exec } = require('child_process')

const { database: prod } = production
const { database: local } = development
const { name, location, adminName, adminPassword, imageLocation } = prod
const { name: localName, location: localLocation } = local

exec(`mongodump -h ${location} -d ${name} -u ${adminName} -p "${adminPassword}" -o ./dump/`, (err, stdout, stderr) => {
  if (err) {
    console.log('error!', err)
    return
  }

  console.log(`stdout: ${stdout}`)
  console.log(`stderr: ${stderr}`)

  // backup
  exec(`mongorestore --db ${localName} --drop dump/${name}/shows.bson --host=${localLocation}`, (err, stdout, stderr) => {
    if (err) {
      console.log('error!', err)
      return
    }
    console.log(`stdout: ${stdout}`)
    console.log(`stderr: ${stderr}`)
    console.log('\nbackup to local disk complete\n')
  })
})

// backup images
exec(`aws s3 sync ${imageLocation} dump/imagesBak/`, (err, stdout, stderr) => {
  if (err) {
    console.log('error!', err)
    return
  }
  console.log(`stdout: ${stdout}`)
  console.log(`stderr: ${stderr}`)
  console.log('\nupdated images\n')
})
