import pool from '../database/index.js'
import bcrypt from 'bcrypt'
import { decodeToken, generateToken } from '../auth/authMethod.js'
import randToken from 'rand-token'

export const signin = async (req, res) => {
    let { username, password } = req.body
  try {
    const admin = await pool.query(
      `SELECT * FROM admins WHERE username = '${username}' AND password= '${password}'`,
    )

    if (admin.rows.length == 0) {
      return res.status(401).send('User does not exist!')
    }

    // const isPasswordValid = bcrypt.compareSync(password, admin.rows[0].password)

    // if (!isPasswordValid) {
    //   return res.status(401).send('Wrong username or password!')
    // }

    const accessTokenSecret = process.env.SECRET
    const accessTokenLife = process.env.TOKEN_LIFE

    const dataForAccessToken = {
      admin_id: admin.rows[0].admin_id,
      username: admin.rows[0].username,
      email: admin.rows[0].email,
      role: "admin"
    }

    const accessToken = generateToken(
      dataForAccessToken,
      accessTokenSecret,
      accessTokenLife,
    )

    if (!accessToken) {
      return res.status(401).send('Signin fail. Please try again!')
    }

    return res.status(200).json({
      message: 'Signin successfully.',
      accessToken,
      admin: { admin_id: admin.rows[0].admin_id, username: admin.rows[0].username },
    })

    // const checkExisted = await pool.query(
    //   `SELECT * FROM admins WHERE username = '${username}' AND password = '${password}'`,
    // )
    // if (checkExisted.rows.length > 0)
    //   res.status(200).json({ data: checkExisted.rows[0] })
    // else {
    //   res.status(400).json({ message: 'Wrong username or password!' })
    // }
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const signup = async (req, res) => {
    let { username, password, email, fullname } = req.body;

    try {
      const checkExisted = await pool.query(
        `SELECT * FROM admins WHERE email = '${email}'`,
      );

      if (checkExisted.rows.length > 0)
        res.status(400).json({ message: 'Email existed!' });
      else {
        await pool.query(
          `INSERT INTO admins (username, password, email, fullname)
          VALUES ('${username}', '${password}', '${email}', '${fullname}')`,
        );

        res.status(200).json({ message: 'Signup successfully' });
      }
    } catch (error) {
      res.status(500).json({ error });
    }
  };