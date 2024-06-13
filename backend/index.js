const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const ws = require('ws');
dotenv.config();
const app = express();
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}));
app.use(express.json());
app.use(cookieParser());
mongoose.connect("mongodb://localhost:27017/company", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));
const port = 3000;
const bcryptSalt = bcrypt.genSaltSync(10);
app.get('/test', (req, res) => {
    res.send('test ok');
});
app.get('/profile', (req, res) => {
    const { token } = req.cookies;
    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userData) => {
        if (err) {
            return res.status(403).json({ message: 'Token verification failed' });
        }
        res.json(userData);
    });
});
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const foundUser = await User.findOne({ username });
    if (foundUser) {
        const isPasswordCorrect = bcrypt.compareSync(password, foundUser.password);
        if (isPasswordCorrect) {
            jwt.sign({ userId: foundUser._id, username }, process.env.JWT_SECRET, {}, (err, token) => {
                if (err) {
                    return res.status(500).json({ message: 'Error signing token' });
                }
                res.cookie('token', token, { sameSite: 'none', secure: true }).json({
                    id: foundUser._id,
                });
            });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    }
});
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        const hashedPassword = bcrypt.hashSync(password, bcryptSalt);
        const createdUser = await User.create({
            username,
            password: hashedPassword
        });
        jwt.sign({ userId: createdUser._id, username }, process.env.JWT_SECRET, {}, (err, token) => {
            if (err) {
                return res.status(500).json({ message: 'Error signing token' });
            }
            res.cookie('token', token, { sameSite: 'none', secure: true }).status(201).json({
                id: createdUser._id,
            });
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
const server = app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
const wss = new ws.WebSocketServer({ server });
wss.on('connection', (connection, req) => {
    const cookies = req.headers.cookie;
    if (cookies) {
        const tokenCookieString = cookies.split(';').find(str => str.startsWith('token='));
        if (tokenCookieString) {
            const token = tokenCookieString.split('=')[1];
            jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userData) => {
                if (err) {
                    return connection.close(1008, 'Token verification failed');
                }
                connection.username = userData.username;
                connection.userId = userData.userId;
            });
        }
    }
});
wss.on('connection', (connection, req) => {
    const cookies = req.headers.cookie;
    if (cookies) {
        const tokenCookieString = cookies.split(';').find(str => str.startsWith('token='));
        if (tokenCookieString) {
            const token = tokenCookieString.split('=')[1];
            jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userData) => {
                if (err) {
                    return connection.close(1008, 'Token verification failed');
                }
                connection.username = userData.username;
                connection.userId = userData.userId;
            });
        }
    }
});
wss.on('connection', (connection, req) => {
    const cookies = req.headers.cookie;
    if (cookies) {
        const tokenCookieString = cookies.split(';').find(str => str.startsWith('token='));
        if (tokenCookieString) {
            const token = tokenCookieString.split('=')[1];
            jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userData) => {
                if (err) {
                    return connection.close(1008, 'Token verification failed');
                }
                connection.username = userData.username;
                connection.userId = userData.userId;
            });
        }
    }
});
wss.on('connection', (connection, req) => {
    const cookies = req.headers.cookie;
    if (cookies) {
        const tokenCookieString = cookies.split(';').find(str => str.startsWith('token='));
        if (tokenCookieString) {
            const token = tokenCookieString.split('=')[1];
            jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userData) => {
                if (err) {
                    return connection.close(1008, 'Token verification failed');
                }
                connection.username = userData.username;
                connection.userId = userData.userId;
            });
        }
    }
    [...wss.clients].forEach(client => {
        client.send(JSON.stringify(
            {
                online: [...wss.clients].map(client => ({
                    userId: client.userId,
                    username: client.username
                }))
            }

        ));
    })
});