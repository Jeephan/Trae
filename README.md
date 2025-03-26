# AI Life Coach 网站

这是一个基于火山方舟 DeepSeek R1 API 的 AI Life Coach 网站。通过与 AI 进行对话，用户可以获得个性化的建议和指导，帮助个人成长。

## 功能特点

- 实时AI对话界面
- 流式响应显示
- 聊天历史记录展示
- 响应式设计，适配各种设备

## 技术栈

- 前端: HTML5, CSS3, JavaScript
- 后端: Node.js
- API: 火山方舟 DeepSeek R1

## 环境配置

项目使用环境变量来存储敏感信息，如API密钥。请按照以下步骤配置：

1. 复制`.env.example`文件并重命名为`.env`
2. 在`.env`文件中填入您的API密钥和其他配置信息
3. 确保`.env`文件已添加到`.gitignore`中，避免将敏感信息提交到版本控制系统

```
# .env文件示例
API_KEY=your_api_key_here
API_URL=your_api_url_here
PORT=3000
```

## 页面结构

### 主页 (index.html)
- 顶部标题栏
- 聊天界面
  - 聊天历史显示区域
  - 输入框和发送按钮
- 响应式设计，适配移动端