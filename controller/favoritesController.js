import pool from '../database/index.js'

export const addfavorite = async (req, res) => {
  const { userid, plantid } = req.body

  try {
    await pool.query(
      `INSERT INTO favoritelist (userid, plantid) 
        VALUES 
          ('${userid}', '${plantid}')`,
    )

    res.status(200).json({ message: 'Add successfully' })
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const deletefavorite = async (req, res) => {
  const { favoritelistid } = req.body

  try {
    await pool.query(
      `DELETE FROM favoritelist 
        WHERE favoritelistid = '${favoritelistid}'`,
    )

    res.status(200).json({ message: 'Delete successfully' })
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const getFavoriteList = async (req, res) => {
  const { userid } = req.params

  try {
    const result = await pool.query(`
        SELECT * FROM 
            (SELECT * FROM favoritelist WHERE userid = '${userid}') AS a 
        LEFT JOIN
            plants
        ON a.plantid = plants.plantid
    `)

    res.status(200).json({ data: result.rows })
  } catch (error) {
    res.status(500).json({ error })
  }
}
