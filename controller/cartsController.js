import pool from '../database/index.js'

export const addToCart = async (req, res) => {
  const { userid, productid, quantity } = req.body
  try {
    const checkExisted = await pool.query(
      `SELECT * FROM cart WHERE product_id = ${productid} AND user_id = ${userid}`,
    )
    if(checkExisted.rows.length > 0){
      const cartId = checkExisted.rows[0].id;
      await pool.query(
        `UPDATE cart SET quantity = quantity + ${quantity} WHERE id = ${cartId}`,
      )
      res.status(200).json({ message: 'Update quantity  successfully' })
    }else{
      await pool.query(
        `INSERT INTO cart (user_id, product_id, quantity) VALUES (${userid}, ${productid}, ${quantity})`,
      )
      res.status(200).json({ message: 'Add to cart successfully' })
    }

  } catch (error) {
    res.status(500).json({ error })
  }
}

export const getCartItems = async (req, res) => {
  const { userid } = req.query
  try {
    const result = await pool.query(
      `SELECT a.*, p.*, s.store_name, s.address
      FROM (
        SELECT *
        FROM cart
        WHERE user_id = '${userid}'
      ) AS a
      LEFT JOIN product p ON a.product_id = p.product_id
      LEFT JOIN store s ON p.store_id = s.store_id`,
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
      WHERE id = ${id}`,
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
      SET quantity = ${quantity}
      WHERE id = ${id}`,
    )
    res.status(200).json({ message: 'Update successfully' })
  } catch (error) {
    res.status(500).json({ error })
  }
}
