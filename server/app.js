const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const xss = require('xss-clean');
const sanitize = require('express-mongo-sanitize');
const session = require('express-session');

const memberRouter = require('./routes/member-route');
const authRouter = require('./routes/auth-route');

require('dotenv').config();
require('./db');

const port = process.env.PORT || 8080;

app.use(express.static(`${__dirname}/uploads`));

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}));

app.use(session({
    secret: 'session-secret',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24, secure: true },
}))

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(xss());
app.use(sanitize());

app.use('/member', memberRouter);
app.use('/auth', authRouter)

app.listen(port, () => {
    console.log(`server is starting in port ${port} ...`);
});