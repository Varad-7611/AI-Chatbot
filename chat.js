document.addEventListener("DOMContentLoaded", function () {
    const chatContainer = document.querySelector(".message-list");
    const chatForm = document.querySelector(".chat-form");
    const chatTextarea = document.querySelector(".chat-textarea");
    const themeToggle = document.getElementById("theme-toggle");
    const typingIndicator = document.getElementById("typing-indicator");
    const body = document.body;
  
    // Load saved theme
    const currentTheme = localStorage.getItem("theme") || "dark-theme";
    body.classList.add(currentTheme);
    themeToggle.textContent = currentTheme === "dark-theme" ? "🌙 Dark Mode" : " 🌞Light Mode";
  
    themeToggle.addEventListener("click", function () {
      if (body.classList.contains("dark-theme")) {
        body.classList.replace("dark-theme", "light-theme");
        themeToggle.textContent = "🌞Light Mode";
        localStorage.setItem("theme", "light-theme");
      } else {
        body.classList.replace("light-theme", "dark-theme");
        themeToggle.textContent = "🌙 Dark Mode";
        localStorage.setItem("theme", "dark-theme");
      }
    });

    // message Send by chat bot
    function formatAIResponse(text) {
      const paragraphs = text
        .split(/\n\s*\n+/)
        .map(para => {
          para = para
            .replace(/\*\*(.+?)\*\*/g, '<b>$1</b>')
            .replace(/\n?\s*\*\s+/g, '<br>• ')
            .replace(/\n+/g, '<br><br>');
          return `<p style="margin-bottom: 1.2em;">${para.trim()}</p>`;
        });
  
      return paragraphs.join('');
    }
  
    function createChatBubble(message, sender) {
      const div = document.createElement("div");
      div.classList.add("message", sender);
      div.innerHTML = message;
      chatContainer.appendChild(div);
      chatContainer.scrollTo({ top: chatContainer.scrollHeight, behavior: "smooth" });
    }
  
    // API call to get AI response
    async function fetchAIResponse(userMessage) {
        const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:generateContent?key=YOUR_API_KEY";
      
  
      const requestBody = {
        contents: [{ parts: [{ text: userMessage }] }]
      };
  
      typingIndicator.style.display = "block";
  
      try {
        const response = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestBody),
        });
  
        const data = await response.json();
        const aiResponse = data?.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't understand that.";
        createChatBubble(formatAIResponse(aiResponse), "assistant");
      } catch (error) {
        createChatBubble("Error: Unable to get response. Try again later.", "assistant");
      } finally {
        typingIndicator.style.display = "none";
      }
    }
  
    // Handle user message submission
    function handleUserMessage(event) {
      event.preventDefault();
      const userMessage = chatTextarea.value.trim();
      if (userMessage === "") return;
  
      createChatBubble(`<p>${userMessage}</p>`, "user");
      chatTextarea.value = "";
      fetchAIResponse(userMessage);
    }
  
    chatForm.addEventListener("submit", handleUserMessage);
  
    chatTextarea.addEventListener("input", function () {
      this.style.height = "auto";
      this.style.height = `${this.scrollHeight}px`;
    });
  });

  

