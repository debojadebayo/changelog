import router from "./router"
import express from "express"
import morgan from "morgan"
import { protect } from "./modules/auth"
import { createNewUser, signIn } from "./handlers/user"


const app = express()

app.use(express.json())
app.use(morgan('dev'))

app.get('/', (req, res) => {
    res.send('Hey, how you doin??');
  });

app.post('/', (req,res) => {
  res.send("POST request to the homepage")
})

app.use('/api', protect, router)

app.post('/user', createNewUser)
app.post('/signin', signIn)

app.use((err, req, res, next) => {
  if(err.type === 'input'){
    res.status(400).json({message: "You entered an incorrect input"})
  } else if(err.type === 'auth'){
    res.status(401).json({message: "You're not authorised"})
  } else {
    res.status(500).json({ message: "Apologies, that's our mistake"})
  }

})


export default app 