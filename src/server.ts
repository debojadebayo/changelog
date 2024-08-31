import router from "./router"
import express from "express"
import morgan from "morgan"
import { protect } from "./modules/auth"
import { createNewUser, signIn } from "./handlers/user"


const app = express()

app.use(express.json())
app.use(morgan('dev'))

app.get('/', (req, res) => {
    res.send('Hello, World!');
  });

app.use('/api', protect, router)

app.post('/user', createNewUser)
app.post('/signin', signIn)


export default app 