import router from "./router.js"
import express from "express"
import morgan from "morgan"
import { protect } from "./modules/auth.js"
import { createNewUser, signIn } from "./handlers/user.js"


const app = express()

app.use(express.json())
app.use(morgan('dev'))


app.use('/api', protect, router)


app.use((err, req, res, next) => {
  if(err.type === 'input'){
    res.status(400).json({message: "You entered an incorrect input"})
  } else if(err.type === 'auth'){
    res.status(401).json({message: "You're not authorised"})
  } else {
    res.status(500).json({ message: "Apologies, that's our mistake"})
  }
  
})

app.get('/', (req, res) => {
  const responseBody = {message: "Hey, how you doin??"}
  res.json(responseBody)
  console.log(responseBody)
  });

app.post('/', (req,res) => {
  const responseBody = {message: "POST request to the homepage"}
  res.json(responseBody)
  console.log(responseBody)
})

app.post('/user', createNewUser)
app.post('/signin', signIn)

export default app 