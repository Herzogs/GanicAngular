/* eslint-disable @typescript-eslint/restrict-template-expressions */
import 'dotenv/config'
import express from 'express'
import indexRouter from './routes/index.routes'
import cors from 'cors'
import morgan from 'morgan'
// import apicache from 'apicache'

const port: string | undefined = process.env.PORT
const app = express()
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({
  credentials: true,
  origin: ['http://localhost:4200'],
  methods: ['GET', 'POST']
}))
app.use('/api', indexRouter)
app.use('/static', express.static('public/images'))

app.listen(port, () => { console.log(`Server is listening on port $ ${port}`) })
