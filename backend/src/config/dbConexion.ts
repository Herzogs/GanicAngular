import { Dialect, Sequelize } from 'sequelize'

// Obtener valores de las variables de entorno y convertirlos al tipo de dato adecuado
const dbHost = process.env.DB_HOST ?? 'localhost' // Puedes cambiar 'localhost' por el valor por defecto que desees
const dbPort = parseInt(process.env.DB_PORT ?? '3306', 10)
const dbName = process.env.BD_NAME_DATABASE ?? ''
const dbUser = process.env.DB_USER ?? 'root'
const dbPassword = process.env.DB_PASSWORD ?? 'root'
const dbDialect = process.env.DB_DIALECT as Dialect ?? 'mysql' // Puedes cambiar 'mysql' por el dialecto por defecto que desees

// Crear la conexión a la base de datos usando la configuración
const dbConexion = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  dialect: dbDialect, // Asegura que el dialecto sea del tipo correcto
  port: dbPort
})

export { dbConexion }
