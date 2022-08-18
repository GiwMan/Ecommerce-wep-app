import express from 'express';
import products from './data/Products.js';
import dotenv from "dotenv"
import connectDatabase from './config/MongoDb.js';
import ImportData from './DataImport.js';
import productRoute from './Routes/ProductRoutes.js';
import { errorHandler, notFound } from './Middleware/Error.js';
import userRoute from './Routes/UserRoutes.js';


dotenv.config();
connectDatabase();
const app = express();

app.use(express.json());
app.use(express.urlencoded({
    extended: true
  }));
//API
app.use("/api/import", ImportData);
app.use("/api/products", productRoute);
app.use("/api/users", userRoute);


// error handler
app.use(notFound);
app.use(errorHandler);


app.get("/",(req,res)=> {
    res.send("API is running")
});

const PORT = process.env.PORT || 1000;

app.listen(PORT, console.log(`server running in  port ${PORT}`));

