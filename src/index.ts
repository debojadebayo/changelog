import app from "./server"
import * as dotenv from "dotenv"

dotenv.config()
const port = 5000

app.listen(port, ()=>{
    console.log(`App listening at port: ${port}`)
})