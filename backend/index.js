
import express from "express"
import FileUpload from "express-fileupload"
import cors from "cors"
import ProductRoute from "./routes/ProductRoute.js"



const app = express()
app.use(cors())
app.use(express.json())
app.use(FileUpload())
app.use(express.static('public'));
app.use(ProductRoute);

app.get("/", (req, res)=>{
    res.json({message: "welcome to the backend"})
})

app.listen(5000, ()=>{
    console.log("Server is running on port 5000 ...")
})