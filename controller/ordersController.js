import pool from '../database/index.js'

export const order = async (req, res) => {
  const { userid, products, total_price } = req.body
  try {
    const order = await pool.query(
      `INSERT INTO orders (user_id, status, total_price) VALUES ('${userid}', '0', '${total_price}') RETURNING order_id`,
    )
    const orderid = order.rows[0].order_id

    // products.map(async (product) => {

    // })
    for(const product of products){
      await pool.query(
        `INSERT INTO order_details (order_id, product_id, quantity, price) VALUES ('${orderid}', '${product.product_id}', '${product.quantity}', '${product.price}')`,
      )
    }

    await pool.query(`DELETE FROM cart WHERE user_id = '${userid}'`)

    res.status(200).json({ message: 'Order successfully' })
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const getAllOrders = async (req, res) => {
  const { page, pageSize } = req.query
  const offset = (page - 1) * pageSize

  let queryString = `SELECT * FROM orders INNER JOIN users ON orders.user_id = users.user_id`
  if (page && pageSize)
    queryString = queryString.concat(` OFFSET ${offset} LIMIT ${pageSize}`)

  const totalQuery = `SELECT COUNT(*) FROM orders INNER JOIN users ON orders.user_id = users.user_id`

  try {
    const result = await pool.query(queryString)
    const total = await pool.query(totalQuery)

    res
      .status(200)
      .json({ data: result.rows, total: parseInt(total.rows[0].count) })
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const getOrdersByUserId = async (req, res) => {
  const { userid, status } = req.body

  try {
    const result = await pool.query(
      `SELECT * FROM orders WHERE user_id = '${userid}' AND status = '${status}'`,
    )

    res.status(200).json({ data: result.rows })
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const getOrderDetail = async (req, res) => {
  const { orderid } = req.params

  try {
    const result = await pool.query(
      `SELECT od.*, p.*
      FROM order_details od
      INNER JOIN product p ON od.product_id = p.product_id
      WHERE od.order_id = '${orderid}'`,
    )

    res.status(200).json({ data: result.rows })
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const changeStatus = async (req, res) => {
  const { orderid } = req.params
  const { status } = req.body

  try {
    await pool.query(
      `UPDATE orders
      SET status = '${status}'
      WHERE order_id = '${orderid}'`,
    )

    res.status(200).json({ message: 'Change successfully' })
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const getDetailByUserId = async (req, res) => {
  const { userid, status } = req.body

  try {
    const result = await pool.query(
      `SELECT *, a.price AS orderprice FROM (SELECT * FROM orderdetail) AS a LEFT JOIN plants ON a.plantid = plants.plantid`,
    )

    res.status(200).json({ data: result.rows })
  } catch (error) {
    res.status(500).json({ error })
  }
}
