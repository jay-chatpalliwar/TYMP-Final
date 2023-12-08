const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
// const routes = require('./routes/routes');
// const fileUpload = require('express-fileupload');
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());
// app.use(fileUpload({
//     useTempFiles : true,
//     tempFileDir : '/tmp/'
// }));
// app.use(routes);

app.use(express.json());
require('dotenv').config();

// console.log(process.env.PORT);
const port = process.env.port || 4000;
app.listen(port ,() =>{
    console.log("App listening on port : " + port);
});
app.use(cors());

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const {addMessage} = require('./controllers/addMessage');
app.post('/addMessage',addMessage);

const {getMessages} = require('./controllers/getMessages');
app.get('/getMessages',cors(),getMessages);

const {Messages} = require('./controllers/message');
app.post('/findMessage',cors(),Messages);

// route
const user = require("./routes/user");
app.use("/", user);
const routes = require("./routes/routes");
app.use("/",routes);

const cloudConnect = require("./config/cloudConnect");
cloudConnect();

const blog = require("./routes/blog");
app.use("/",blog);

const dbConnect = require('./config/database');
dbConnect();