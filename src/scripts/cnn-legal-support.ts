const API_URL = import.meta.env.PUBLIC_CHAT_API_URL || 'http://localhost:3001/chat';

interface ChatMessage {
  role: 'user' | 'ai';
  content: string;
}

let isWidgetOpen = false;
let isLoading = false;

function getElements() {
  return {
    icon: document.getElementById('cnn-support-icon') as HTMLButtonElement,
    widget: document.getElementById('cnn-support-widget') as HTMLDivElement,
    closeButton: document.getElementById('cnn-support-close') as HTMLButtonElement,
    messagesContainer: document.getElementById('cnn-support-messages') as HTMLDivElement,
    input: document.getElementById('cnn-support-input') as HTMLInputElement,
    sendButton: document.getElementById('cnn-support-send') as HTMLButtonElement,
  };
}

function toggleWidget() {
  const { icon, widget } = getElements();
  const iconChat = icon.querySelector('.icon-chat') as SVGElement;
  const iconClose = icon.querySelector('.icon-close') as SVGElement;
  
  isWidgetOpen = !isWidgetOpen;
  
  if (isWidgetOpen) {
    widget.style.display = 'flex';
    icon.style.animation = 'none';
    if (iconChat) iconChat.style.display = 'none';
    if (iconClose) iconClose.style.display = 'block';
    setTimeout(() => {
      const input = getElements().input;
      input.focus();
    }, 100);
  } else {
    widget.style.display = 'none';
    icon.style.animation = 'pulse 2s infinite';
    if (iconChat) iconChat.style.display = 'block';
    if (iconClose) iconClose.style.display = 'none';
  }
}

function displayMessage(message: ChatMessage) {
  const { messagesContainer } = getElements();
  
  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${message.role === 'user' ? 'user-message' : 'ai-message'}`;
  
  if (message.role === 'ai') {
    const avatarDiv = document.createElement('div');
    avatarDiv.className = 'ai-avatar';
    avatarDiv.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="28" height="28" style="border-radius: 6px; flex-shrink: 0;">
        <rect width="64" height="64" rx="10" fill="#1c4e8c"/>
        <path d="M16 19h32v5H16zM20 30h24v4H20zM20 40h18v4H20z" fill="#FAF7F0"/>
        <path d="M15 50h34" stroke="#e08738" stroke-width="4" stroke-linecap="round"/>
      </svg>
    `;
    messageDiv.appendChild(avatarDiv);
  }
  
  const contentDiv = document.createElement('div');
  contentDiv.className = 'message-content';
  contentDiv.textContent = message.content;
  
  messageDiv.appendChild(contentDiv);
  messagesContainer.appendChild(messageDiv);
  
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function displayLoadingMessage() {
  const { messagesContainer } = getElements();
  
  const loadingDiv = document.createElement('div');
  loadingDiv.className = 'message ai-message';
  loadingDiv.id = 'loading-message';
  
  const avatarDiv = document.createElement('div');
  avatarDiv.className = 'ai-avatar';
  avatarDiv.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="28" height="28" style="border-radius: 6px; flex-shrink: 0;">
      <rect width="64" height="64" rx="10" fill="#1c4e8c"/>
      <path d="M16 19h32v5H16zM20 30h24v4H20zM20 40h18v4H20z" fill="#FAF7F0"/>
      <path d="M15 50h34" stroke="#e08738" stroke-width="4" stroke-linecap="round"/>
    </svg>
  `;
  loadingDiv.appendChild(avatarDiv);
  
  const contentDiv = document.createElement('div');
  contentDiv.className = 'message-content';
  contentDiv.textContent = 'Đang suy nghĩ...';
  
  loadingDiv.appendChild(contentDiv);
  messagesContainer.appendChild(loadingDiv);
  
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function removeLoadingMessage() {
  const loadingMessage = document.getElementById('loading-message');
  if (loadingMessage) {
    loadingMessage.remove();
  }
}

async function sendMessage() {
  const { input, sendButton } = getElements();
  const message = input.value.trim();
  
  if (!message || isLoading) return;
  
  displayMessage({ role: 'user', content: message });
  input.value = '';
  updateSendButtonState();
  
  isLoading = true;
  sendButton.disabled = true;
  sendButton.classList.remove('is-active');
  input.disabled = true;
  
  displayLoadingMessage();
  
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    removeLoadingMessage();
    
    const { messagesContainer } = getElements();
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message ai-message';
    
    const avatarDiv = document.createElement('div');
    avatarDiv.className = 'ai-avatar';
    avatarDiv.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="28" height="28" style="border-radius: 6px; flex-shrink: 0;">
        <rect width="64" height="64" rx="10" fill="#1c4e8c"/>
        <path d="M16 19h32v5H16zM20 30h24v4H20zM20 40h18v4H20z" fill="#FAF7F0"/>
        <path d="M15 50h34" stroke="#e08738" stroke-width="4" stroke-linecap="round"/>
      </svg>
    `;
    messageDiv.appendChild(avatarDiv);
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    contentDiv.textContent = '';
    
    messageDiv.appendChild(contentDiv);
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    const reader = response.body?.getReader();
    const decoder = new TextDecoder();
    
    if (reader) {
      let buffer = '';
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        
        buffer = lines.pop() || '';
        
        for (const line of lines) {
          if (line.startsWith('data:')) {
            // Axum SSE trả về dạng "data: <từ>", cắt bỏ 6 ký tự đầu ("data: ") để giữ nguyên khoảng trắng của từ
            const data = line.startsWith('data: ') ? line.slice(6) : line.slice(5);
            if (data) {
              contentDiv.textContent += data;
              messagesContainer.scrollTop = messagesContainer.scrollHeight;
            }
          }
        }
      }
    }
  } catch (error) {
    removeLoadingMessage();
    console.error('Error sending message:', error);
    displayMessage({
      role: 'ai',
      content: 'Xin lỗi, đã có lỗi xảy ra. Vui lòng thử lại sau.',
    });
  } finally {
    isLoading = false;
    sendButton.disabled = false;
    input.disabled = false;
    input.focus();
    updateSendButtonState();
  }
}

function updateSendButtonState() {
  const { input, sendButton } = getElements();
  const hasContent = input.value.trim().length > 0;
  sendButton.classList.toggle('is-active', hasContent);
}

function initializeChatWidget() {
  const elements = getElements();
  
  if (!elements.icon || !elements.widget) {
    console.error('CNN Legal Support: Required elements not found');
    return;
  }
  
  elements.icon.addEventListener('click', toggleWidget);
  elements.closeButton.addEventListener('click', toggleWidget);
  
  elements.sendButton.addEventListener('click', sendMessage);
  
  elements.input.addEventListener('input', updateSendButtonState);
  
  elements.input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (elements.input.value.trim().length > 0) {
        sendMessage();
      }
    }
  });
  
  updateSendButtonState();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeChatWidget);
} else {
  initializeChatWidget();
}

// Made with Bob
