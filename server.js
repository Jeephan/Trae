const express = require('express');
const cors = require('cors');
const axios = require('axios');
const dotenv = require('dotenv');

// 加载环境变量
dotenv.config();

const app = express();

// 配置CORS选项
const corsOptions = {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static('public'));
app.use(express.static('.'));

// API配置 - 从环境变量中读取
const API_KEY = process.env.API_KEY;
const API_URL = process.env.API_URL;

app.post('/chat', async (req, res) => {
    try {
        const response = await axios.post(API_URL, {
            model: "deepseek-r1-250120",
            messages: req.body.messages,
            temperature: 0.6,
            stream: false // 暂时关闭流式响应以便调试
        }, {
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json'
            },
            timeout: 60000
        });
        
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});