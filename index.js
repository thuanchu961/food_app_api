import express from 'express'
import bodyParser from 'body-parser'
import userRoutes from './routes/userRoutes.js'
import cartRoutes from './routes/cartRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import adminRoutes from './routes/adminRoutes.js'
import storeRoutes from './routes/storeRoutes.js'
import productRoutes from './routes/productRoutes.js'
import cors from 'cors'
import 'dotenv/config'

const app = express()

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors())

app.use('/users', userRoutes) //đã sửa
app.use('/carts', cartRoutes)
app.use('/orders', orderRoutes)
app.use('/admins', adminRoutes) //đã sửa
app.use('/stores', storeRoutes) //đã sửa
app.use('/products', productRoutes) //đã sửa

app.listen(5000, () => {
  console.log('Server running on port 5000')
})
