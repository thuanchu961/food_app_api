import pool from '../database/index.js'

export const order = async (req, res) => {
  const { userid, products } = req.body
  try {
    const order = await pool.query(
      `INSERT INTO orders (userid) VALUES ('${userid}') RETURNING orderid`,
    )
    const orderid = order.rows[0].orderid

    products.map(async (product) => {
      await pool.query(
        `INSERT INTO orderdetail (orderid, plantid, quantity, price) VALUES ('${orderid}', '${product.plantid}', '${product.quantity}', '${product.price}')`,
      )
    })

    await pool.query(`DELETE FROM cart WHERE userid = '${userid}'`)

    res.status(200).json({ message: 'Order successfully' })
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const getAllOrders = async (req, res) => {
  const { page, pageSize } = req.query
  const offset = (page - 1) * pageSize

  let queryString = `SELECT * FROM orders INNER JOIN users ON orders.userid = users.userid`
  if (page && pageSize)
    queryString = queryString.concat(` OFFSET ${offset} LIMIT ${pageSize}`)

  const totalQuery = `SELECT COUNT(*) FROM orders INNER JOIN users ON orders.userid = users.userid`

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
      `SELECT * FROM orders WHERE userid = '${userid}' AND status = '${status}'`,
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
      `SELECT *, a.price AS orderprice FROM (SELECT * FROM orderdetail WHERE orderid = '${orderid}') AS a LEFT JOIN plants ON a.plantid = plants.plantid`,
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
      WHERE orderid = '${orderid}'`,
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
