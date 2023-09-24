import pool from '../database/index.js'

export const getPlants = async (req, res) => {
  // const { name, category, size, rating, price, page, pageSize } = req.query
  // const { userid } = req.body

  // const offset = (page - 1) * pageSize

  // let finalQuery = ``

  // let query = 'SELECT * FROM plants WHERE 1 = 1'

  // let after = ``
  // if (name) after = ` AND name ILIKE '%${name}%'`
  // if (category) after = after.concat(` AND category = '${category}'`)
  // if (size) after = after.concat(` AND size = '${size}'`)
  // if (rating)
  //   after = after.concat(
  //     ` AND rating >= ${rating} AND rating < ${parseInt(rating) + 1}`,
  //   )

  // let totalQuery = `SELECT COUNT(*) FROM plants WHERE 1 = 1`
  // totalQuery = totalQuery.concat(after)

  // if (userid) {
  //   finalQuery = `
  //     SELECT *, a.plantid, CASE WHEN favoritelistid IS NULL THEN -1 ELSE favoritelistid END AS favoritelistid
  //     FROM
  //       (${query + after}) AS a
  //     LEFT JOIN
  //       (SELECT * FROM favoritelist WHERE userid = '${userid}') AS b
  //     ON a.plantid = b.plantid
  //     `
  //   if (price) finalQuery = finalQuery.concat(` ORDER BY price ${price}`)
  //   else finalQuery = finalQuery.concat(` ORDER BY a.plantid ASC`)
  // } else {
  //   finalQuery = query.concat(after)
  //   if (price) finalQuery = finalQuery.concat(` ORDER BY price ${price}`)
  //   else finalQuery = finalQuery.concat(` ORDER BY plantid ASC`)
  // }

  // if (page && pageSize)
  //   finalQuery = finalQuery.concat(` OFFSET ${offset} LIMIT ${pageSize}`)

  try {
    // const result = await pool.query(finalQuery)
    // const total = await pool.query(totalQuery)

    res
      .status(200)
      .json({ data: 'ok' })
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const getPlant = async (req, res) => {
  const { plantid } = req.params
  const { userid } = req.body
  let query = ''
  if (userid) {
    query = `
    SELECT *, a.plantid, CASE WHEN favoritelistid IS NULL THEN -1 ELSE favoritelistid END AS favoritelistid
    FROM
      (SELECT * FROM plants WHERE plantid = '${plantid}') AS a
    LEFT JOIN
      (SELECT * FROM favoritelist WHERE userid = '${userid}') AS b
    ON a.plantid = b.plantid
    `
  } else {
    query = `
    SELECT *
    FROM
      plants
    WHERE
      plantid = '${plantid}'
    `
  }

  try {
    const result = await pool.query(query)
    res.status(200).json({ data: result.rows[0] })
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const addPlants = async (req, res) => {
  const {
    name,
    category,
    size,
    humidity,
    temperature,
    desc,
    imageurl,
    price,
    stock,
    imagepath,
  } = req.body

  try {
    await pool.query(
      `INSERT INTO
      plants
        ("name", category, "size", humidity, temperature, "desc", imageurl, price, stock, imagepath)
      VALUES
        ('${name}', '${category}', '${size}', '${humidity}', '${temperature}', '${desc}', '${imageurl}', '${price}', '${stock}', '${imagepath}')`,
    )
    res.status(200).json({ message: 'Add successfully' })
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const editPlants = async (req, res) => {
  const { plantid } = req.params
  const { name, category, size, humidity, temperature, desc, price, stock } =
    req.body

  try {
    await pool.query(
      `UPDATE plants
      SET
        name = '${name}',
        category = '${category}',
        size = '${size}',
        humidity = '${humidity}',
        temperature = '${temperature}',
        "desc" = '${desc}',
        price = '${price}',
        stock = '${stock}'
      WHERE plantid = '${plantid}'`,
    )
    res.status(200).json({ message: 'Edit successfully' })
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const deletePlants = async (req, res) => {
  const { plantid } = req.params

  try {
    await pool.query(
      `DELETE FROM plants
      WHERE plantid = '${plantid}'`,
    )
    res.status(200).json({ message: 'Delete successfully' })
  } catch (error) {
    res.status(500).json({ error })
  }
}
