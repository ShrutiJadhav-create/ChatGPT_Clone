document.addEventListener('DOMContentLoaded', function() {
    const chatMessages = document.getElementById('chat-messages');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');
    
    // Initial welcome message
    // Already in HTML for better initial load
    
    // Function to add a message to the chat
    function addMessage(content, isUser) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        
        // If content is an array (loading dots), handle differently
        if (Array.isArray(content)) {
            contentDiv.className += ' loading-dots';
            content.forEach(dot => {
                contentDiv.appendChild(dot);
            });
        } else {
            const contentP = document.createElement('p');
            contentP.textContent = content;
            contentDiv.appendChild(contentP);
        }
        
        const timestampDiv = document.createElement('div');
        timestampDiv.className = 'message-timestamp';
        timestampDiv.textContent = getCurrentTimestamp();
        
        messageDiv.appendChild(contentDiv);
        messageDiv.appendChild(timestampDiv);
        
        chatMessages.appendChild(messageDiv);
        scrollToBottom();
        
        return messageDiv;
    }
    
    // Function to create loading dots
    function createLoadingDots() {
        const dots = [];
        for (let i = 0; i < 3; i++) {
            const dot = document.createElement('span');
            dots.push(dot);
        }
        return dots;
    }
    
    // Function to get current timestamp
    function getCurrentTimestamp() {
        const now = new Date();
        return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    
    // Function to scroll to the bottom of the chat
    function scrollToBottom() {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // Function to handle bot response
    async function handleBotResponse(userMessage) {
        // Show loading indicator
        const loadingDots = createLoadingDots();
        const loadingMessage = addMessage(loadingDots, false);
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
        
        // Remove loading indicator
        chatMessages.removeChild(loadingMessage);
        
        // Generate bot response (rule-based)
        let botReply = generateBotResponse(userMessage);
        
        // Add bot response
        addMessage(botReply, false);
    }
    
    // Function to generate bot response (rule-based)
    function generateBotResponse(userMessage) {
        const lowerCaseMessage = userMessage.toLowerCase();
        
        if (lowerCaseMessage.includes('hello') || lowerCaseMessage.includes('hi')) {
            return "Hello there! How can I assist you today?";
        } else if (lowerCaseMessage.includes('how are you')) {
            return "I'm just a computer program, so I don't have feelings, but I'm functioning perfectly! How can I help you?";
        } else if (lowerCaseMessage.includes('thank')) {
            return "You're welcome! Is there anything else I can help you with?";
        } else if (lowerCaseMessage.includes('bye') || lowerCaseMessage.includes('goodbye')) {
            return "Goodbye! Feel free to come back if you have more questions.";
        } else if (lowerCaseMessage.includes('help')) {
            return "I can answer questions, provide information, or just chat. What would you like to know?";
        } else if (lowerCaseMessage.includes('name')) {
            return "I'm ChatGPT, an AI language model created to assist you.";
        } else if (lowerCaseMessage.includes('weather')) {
            return "I don't have real-time weather data, but you can check a weather service for the latest updates in your area.";
        } else if (lowerCaseMessage.includes('joke')) {
            const jokes = [
                "Why don't scientists trust atoms? Because they make up everything!",
                "Did you hear about the mathematician who's afraid of negative numbers? He'll stop at nothing to avoid them.",
                "Why don't skeletons fight each other? They don't have the guts."
            ];
            return jokes[Math.floor(Math.random() * jokes.length)];
        } else {
            return "I'm not sure I understand. Could you rephrase that or ask me something else?";
        }
    }
    
    // Function to handle user sending a message
    function handleSendMessage() {
        const message = userInput.value.trim();
        if (message) {
            // Add user message
            addMessage(message, true);
            
            // Clear input
            userInput.value = '';
            
            // Get bot response
            handleBotResponse(message);
        }
    }
    
    // Event listeners
    sendButton.addEventListener('click', handleSendMessage);
    
    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    });
    
    // New chat button functionality
    const newChatBtn = document.querySelector('.new-chat-btn');
    newChatBtn.addEventListener('click', function() {
        // Clear all messages except the initial bot message
        while (chatMessages.children.length > 1) {
            chatMessages.removeChild(chatMessages.lastChild);
        }
    });
    
    // Initial scroll to bottom
    scrollToBottom();
});