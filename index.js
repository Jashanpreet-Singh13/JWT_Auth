const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const path = require('path')

const authRoutes = require('./routes/auth');
const applicationRoutes = require('./routes/application');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cookieParser());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, "views"));

app.use('/', authRoutes);
app.use('/', applicationRoutes);


app.listen(PORT, () => console.log(`Server listening on PORT:${PORT}`));

