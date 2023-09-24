import pool from '../database/index.js'

export const addToCart = async (req, res) => {
  const { userid, plantid, quantity } = req.body
  try {
    await pool.query(
      `INSERT INTO cart (userid, plantid, quantity) VALUES ('${userid}', '${plantid}', '${quantity}')`,
    )

    res.status(200).json({ message: 'Add successfully' })
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const getCartItems = async (req, res) => {
  const { userid } = req.query
  try {
    const result = await pool.query(
      `SELECT * FROM (SELECT * FROM cart WHERE userid = '${userid}') AS a LEFT JOIN plants ON a.plantid = plants.plantid`,
    )

    res.status(200).json({ data: result.rows })
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const deleteCartItem = async (req, res) => {
  const { id } = req.params

  try {
    await pool.query(
      `DELETE FROM cart 
      WHERE cartitemid = '${id}'`,
    )
    res.status(200).json({ message: 'Delete successfully' })
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const updateCartItem = async (req, res) => {
  const { id } = req.params
  const { quantity } = req.body

  try {
    await pool.query(
      `UPDATE cart 
      SET quantity = '${quantity}'
      WHERE cartitemid = '${id}'`,
    )
    res.status(200).json({ message: 'Update successfully' })
  } catch (error) {
    res.status(500).json({ error })
  }
}
