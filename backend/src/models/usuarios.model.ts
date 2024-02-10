import { DataTypes, Model } from 'sequelize'
import { dbConexion } from '../config/dbConexion'

class UsuarioModel extends Model {}

UsuarioModel.init(
  {
    id: {
      type: DataTypes.DOUBLE,
      autoIncrement: true,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    apellido: {
      type: DataTypes.STRING,
      allowNull: true
    },
    direccion: {
      type: DataTypes.STRING,
      allowNull: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    rol: {
      type: DataTypes.ENUM('Administrador', 'Cliente'),
      defaultValue: 'Cliente'
    },
    habilitado: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  },
  {
    sequelize: dbConexion,
    freezeTableName: true,
    modelName: 'usuario',
    timestamps: false
  })
export default UsuarioModel
