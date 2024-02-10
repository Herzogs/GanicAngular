/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

const validarToken = (req: Request, res: Response, next: NextFunction): void => {
  const headerToken = req.headers.authorization
  console.log('Header token', headerToken)
  if (headerToken === undefined) {
    res.status(400).json({ error: 'Es necesario el token de autenticación' })
  }
  if (headerToken?.startsWith('Bearer ')) {
    try {
      const token = headerToken.slice(7)
      const tokenDecodificado = jwt.verify(token, (process.env.JWT_SECRET ?? 'jwtsecret'))
      console.log('Token decodificado', tokenDecodificado)
      next()
    } catch (error) {
      res.status(400).json({ error: 'El token es inválido' })
    }
  }
}

export default validarToken
