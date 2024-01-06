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

    const admin = await pool.query(
      `SELECT * FROM admins WHERE admin_id = '${verified.payload.admin_id}'`,
    );

    const user = await pool.query(
      `SELECT * FROM users WHERE user_id = '${verified.payload.user_id}'`,
    );

    // Kiểm tra và gán quyền truy cập vào req.user
    if (admin.rows.length > 0) {
      req.user = admin;
    } else if (user.rows.length > 0) {
      req.user = user;
    } else {
      return res.status(401).send('User not found!');
    }

    if (req.user.role == "admin") {
      // Thực hiện các chức năng dành cho admin
      // console.log('Admin access');
      next();
    } else {
      // Thực hiện các chức năng dành cho user
      // console.log('User access');
      next();
    }

    // req.user = user
     //gọi hàm tiếp theo trong router
  } catch (error) {
    console.log(error)
    return res.status(401).send(error)
  }
}