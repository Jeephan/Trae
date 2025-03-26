document.addEventListener('DOMContentLoaded', () => {
    const chatHistory = document.getElementById('chat-history');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');

    const systemMessage = {
        role: "system",
        content: "你是一位专业的Life Coach，你的目标是通过对话帮助用户成长。请以友善、专业的态度给出建议。"
    };

    let messages = [systemMessage];

    async function sendMessage() {
        const userMessage = userInput.value.trim();
        if (!userMessage) return;

        // 添加用户消息到界面
        appendMessage('user', userMessage);
        userInput.value = '';

        // 更新消息历史
        messages.push({ role: "user", content: userMessage });

        try {
            // 使用相对路径，而不是硬编码的localhost地址
            const response = await fetch('/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                // 跨域凭证
                credentials: 'include',
                body: JSON.stringify({ messages })
            });

            const data = await response.json();
            const aiResponse = data.choices[0].message.content;
            
            // 添加AI回复到界面
            appendMessage('ai', aiResponse);
            
            // 更新消息历史
            messages.push({ role: "assistant", content: aiResponse });
        } catch (error) {
            console.error('Error:', error);
            appendMessage('ai', '抱歉，发生了错误，请稍后重试。');
        }
    }

    function appendMessage(role, content) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${role}-message`;
        messageDiv.textContent = content;
        chatHistory.appendChild(messageDiv);
        chatHistory.scrollTop = chatHistory.scrollHeight;
    }

    sendButton.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });
});