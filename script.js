// Get stored username
const username = localStorage.getItem("username");

// If the user is logged in, show the chat
if (username) {
    document.getElementById("login-container").style.display = "none";
    document.getElementById("chat-container").style.display = "block";
    displayMessages();
}

// Function to handle user entering the chat
function enterChat() {
    let usernameInput = document.getElementById("username").value.trim();
    if (usernameInput) {
        localStorage.setItem("username", usernameInput);  // Save username
        document.getElementById("login-container").style.display = "none";  // Hide login
        document.getElementById("chat-container").style.display = "block";  // Show chat
        displayMessages();  // Load saved messages
    } else {
        alert("Please enter a username");
    }
}

// Function to display messages
function displayMessages() {
    let messages = JSON.parse(localStorage.getItem("messages")) || [];
    let chatBox = document.getElementById("chat-box");
    chatBox.innerHTML = "";  // Clear chat box

    // Display all stored messages
    messages.forEach(msg => {
        let messageElement = document.createElement("div");
        messageElement.classList.add("message");
        if (msg.sender === username) {
            messageElement.classList.add("sent");
        }
        messageElement.innerText = `${msg.sender}: ${msg.text}`;
        chatBox.appendChild(messageElement);
    });

    // Scroll to the bottom of the chat container
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Function to send a message
function sendMessage() {
    let messageInput = document.getElementById("message-input");
    let messageText = messageInput.value.trim();

    if (messageText) {
        let messages = JSON.parse(localStorage.getItem("messages")) || [];
        messages.push({ sender: username, text: messageText });
        localStorage.setItem("messages", JSON.stringify(messages));  // Save message

        messageInput.value = "";  // Clear the input field
        displayMessages();  // Display updated messages
    }
}
