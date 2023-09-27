import pool from '../database/index.js'

export const getAllProducts = async (req, res) => {
    const { storeid, page, pageSize } = req.query
    const offset = (page - 1) * pageSize

    let queryString = `SELECT * FROM product`
    if (page && pageSize)
        queryString = queryString.concat(` OFFSET ${offset} LIMIT ${pageSize}`)
    else if(storeid){
        queryString = `SELECT * FROM product WHERE store_id = '${storeid}'`
    }

    const totalQuery = `SELECT COUNT(*) FROM product`

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

export const getProduct = async (req, res) => {
    const { productid } = req.params
    let query = `SELECT * FROM product WHERE product_id = '${productid}'`

    try {
        const result = await pool.query(query)
        res.status(200).json({ data: result.rows[0] })
    } catch (error) {
        res.status(500).json({ error })
    }
}

export const addProduct = async (req, res) => {
    const {
        name,
        storeid,
        avatar,
        size,
        price,
        discount,
        status,
        rate,
        desc
    } = req.body
    try {
        await pool.query(
            `INSERT INTO product (product_name, store_id, avatar, size, price, discount, status, rate, description)
          VALUES
            ('${name}', '${storeid}', '${avatar}', '${size}', '${price}', '${discount}', '${status}', '${rate}', '${desc}')`,
        )
        res.status(200).json({ message: 'Add product successfully' })
    } catch (error) {
        res.status(500).json({ error })
    }
}

export const editProduct = async (req, res) => {
    const { productid } = req.params
    const {
        name,
        avatar,
        size,
        price,
        discount,
        status,
        rate,
        desc
    } = req.body

    try {
        await pool.query(
            `UPDATE product
        SET
          product_name = '${name}',
          avatar = '${avatar}',
          size = '${size}',
          price = '${price}',
          rate = '${rate}',
          discount = '${discount}',
          status = '${status}',
          description = '${desc}'
        WHERE product_id = '${productid}'`,
        )
        res.status(200).json({ message: 'Edit product successfully' })
    } catch (error) {
        res.status(500).json({ error })
    }
}

export const deleteProduct = async (req, res) => {
    const { productid } = req.params

    try {
        await pool.query(
            `DELETE FROM product
        WHERE product_id = '${productid}'`,
        )
        res.status(200).json({ message: 'Delete product successfully' })
    } catch (error) {
        res.status(500).json({ error })
    }
}