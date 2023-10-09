import pkg from 'pg'
const { Pool } = pkg

const pool = new Pool({
  connectionString:
    'postgres://foodapp_u8e2_user:IVz1wkwPhBKjR19vTZRSkDTBK5zRmM2i@dpg-ck6hafhi0euc73cfogcg-a.singapore-postgres.render.com/foodapp_u8e2',
    //'postgres://foodapp_u8e2_user:IVz1wkwPhBKjR19vTZRSkDTBK5zRmM2i@dpg-ck6hafhi0euc73cfogcg-a/foodapp_u8e2',
  ssl: 'no-verify',
})

export default pool
