const userName = `<span class="ib">MAK</span><span class="ain">SON</span>`;
const botName = `<span class="ib">IBR</span><span class="ain">AIN</span>`;

function sendMessage() {
    const inputField = document.getElementById("user-input");
    const userMessage = inputField.value.trim();

    if (userMessage === "") return;

    // Add user message to chat window
    addMessage(userName, userMessage, 'user-message');

    // Clear input field
    inputField.value = "";

    // Display "Thinking..." message and then the actual response
    addMessage(botName, "Thinking...", 'bot-message');
    setTimeout(() => {
        const botResponse = getBotResponse(userMessage);
        displayTypingEffect(botResponse);
    }, 3000); // Show "Thinking..." for 3 seconds
}

function getBotResponse(userMessage) {
    if (userMessage.toLowerCase() === "date") {
        return `Today's date is: ${new Date().toLocaleDateString()}`;
    }
    return `You said: "${userMessage}"`;
}

function displayTypingEffect(message) {
    const chatWindow = document.getElementById("chat-window");
    const lastMessage = chatWindow.lastElementChild;

    // Check if the last message is the "Thinking..." message
    if (lastMessage && lastMessage.classList.contains('bot-message') && lastMessage.textContent.includes("Thinking...")) {
        lastMessage.innerHTML = `<span class="ib">IBR</span><span class="ain">AIN</span>: <span class="typing-effect message-text"></span>`;
        const typingElement = lastMessage.querySelector(".typing-effect");
        
        let i = 0;
        const typingInterval = setInterval(() => {
            typingElement.innerHTML += message.charAt(i);
            i++;
            if (i > message.length) {
                clearInterval(typingInterval);
                // Remove the typing effect after completing
                setTimeout(() => {
                    lastMessage.innerHTML = `<span class="ib">IBR</span><span class="ain">AIN</span>: ${message}`;
                }, 500); // Optional delay before showing final message
            }
        }, 30); // Adjust typing speed here (milliseconds)
    }
}

function addMessage(sender, message, cssClass) {
    const chatWindow = document.getElementById("chat-window");

    const messageElement = document.createElement("div");
    messageElement.className = `message ${cssClass}`;
    messageElement.innerHTML = `<span class="${cssClass.includes('bot') ? 'ib' : ''}">${sender}</span>: <span class="message-text">${message}</span>`;

    chatWindow.appendChild(messageElement);
    chatWindow.scrollTop = chatWindow.scrollHeight; // Auto-scroll to the bottom
}

// Add event listener for Enter key
document.getElementById("user-input").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
});
