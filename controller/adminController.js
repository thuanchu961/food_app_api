import pool from '../database/index.js'

export const signin = async (req, res) => {
    const { username, password } = req.body
  try {
    const checkExisted = await pool.query(
      `SELECT * FROM admins WHERE username = '${username}' AND password = '${password}'`,
    )
    if (checkExisted.rows.length > 0)
      res.status(200).json({ data: checkExisted.rows[0] })
    else {
      res.status(400).json({ message: 'Wrong username or password!' })
    }
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const signup = async (req, res) => {
    const { username, password, email, fullname } = req.body
    try {
      const checkExisted = await pool.query(
        `SELECT * FROM admins WHERE email = '${email}'`,
      )
      if (checkExisted.rows.length > 0)
        res.status(400).json({ message: 'Email existed!' })
      else {
        await pool.query(
          `INSERT INTO admins (username, password, email, fullname)
          VALUES ('${username}', '${password}', '${email}', '${fullname}')`,
        )
        res.status(200).json({ message: 'Signup successfully' })
      }
    } catch (error) {
      res.status(500).json({ error })
    }
  }