import { verifyToken } from '../auth/authMethod.js'
import pool from '../database/index.js'

export const isAuth = async (req, res, next) => { //check token
  const accessTokenFromHeader = req.headers.x_authorization

  try {
    if (!accessTokenFromHeader) {
      return res.status(401).send('Access token not found!')
    }

    const accessTokenSecret = process.env.SECRET //key tạo trên render

    const verified = verifyToken(accessTokenFromHeader, accessTokenSecret)
    if (!verified) {
      return res.status(498).send('You do not have access to this feature!')
    }

    const user = await pool.query(
      `SELECT * FROM admins WHERE username = '${verified.payload.username}'`,
    )

    req.user = user
    next() //gọi hàm tiếp theo trong router
  } catch (error) {
    console.log(error)
    return res.status(401).send(error)
  }
}