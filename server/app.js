import express  from "express";
import bodyParser  from "body-parser";
import mongoose from "mongoose";
import cors  from "cors";
import dotenv  from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import { register } from "./controllers/auth.js";
import userroutes from "./routes/users.js";
import authRoutes from "./routes/auth.js";

/* CONFIGURATION */
const __filename = fileURLToPath(import.meta.url);       
const __dirname = path.dirname(__filename);
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, 'public/assets')));
dotenv.config();  

/* FILE STORAGE */
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/assets");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});
const upload = multer({ storage });

/* Route with files */
app.post("/auth/register", upload.single("picture"), register)

/* ROUTES */
app.use(("/auth") , authRoutes ) ;
app.use("/user", userroutes);


/* MONGO SETUP */     
mongoose.connect(process.env.MONGO_URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
}).then(() => {
    console.log('MongoDB connected');
}).catch(err => console.error('MongoDB connection error:', err));

/* SERVER SETUP */
app.get('/', (req, res) => {
    res.send('Social Media dashboard is running');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});