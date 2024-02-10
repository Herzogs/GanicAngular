import { DataTypes, Model } from 'sequelize'
import { dbConexion } from '../config/dbConexion'

class SandwichModel extends Model {}

SandwichModel.init(
  {
    id: {
      type: DataTypes.DOUBLE,
      autoIncrement: true,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: true
    },
    precio: {
      type: DataTypes.DECIMAL(10, 2)
    },
    clasificacion: {
      type: DataTypes.ENUM('Clásico', 'Vegetariano', 'Vegano', 'Especial'),
      defaultValue: 'Clásico'
    },
    imagen: {
      type: DataTypes.STRING,
      allowNull: true
    }
  },
  {
    sequelize: dbConexion,
    freezeTableName: true,
    modelName: 'sandwich',
    timestamps: false
  })
export default SandwichModel
