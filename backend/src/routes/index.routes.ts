/* eslint-disable @typescript-eslint/no-var-requires */
import express from 'express'
import fs from 'fs'
import path from 'path'

const router = express.Router()

const routesDirectory = path.join(__dirname, '/')

// Leer todos los archivos en la carpeta 'routes' y agregar rutas
fs.readdirSync(routesDirectory).forEach((file) => {
  if (file !== 'index.routes.ts' && file.endsWith('.routes.ts')) {
    const subRouter = require(path.join(routesDirectory, file)).default
    console.log(`Adding route /${file.replace('.routes.ts', '')}`)
    router.use(`/${file.replace('.routes.ts', '')}`, subRouter)
  }
})

export default router
