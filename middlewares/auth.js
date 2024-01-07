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

    if(verified.payload.role === "admin"){
      const admin = await pool.query(
        `SELECT * FROM admins WHERE admin_id = '${verified.payload.admin_id}'`,
      );
      req.user = admin;
      next();
    }else{
      const user = await pool.query(
        `SELECT * FROM users WHERE user_id = '${verified.payload.user_id}'`,
      );
      req.user = user;
      next();
    }
    // req.user = user
     //gọi hàm tiếp theo trong router
  } catch (error) {
    console.log(error)
    return res.status(401).send(error)
  }
}