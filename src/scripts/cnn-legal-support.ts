const API_URL = import.meta.env.PUBLIC_CHAT_API_URL || 'http://localhost:3001/chat';
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;

interface ChatMessage {
  role: 'user' | 'ai';
  content: string;
}

let isWidgetOpen = false;
let isLoading = false;
let abortController: AbortController | null = null;
let messageHistory: ChatMessage[] = [];

function getElements() {
  return {
    icon: document.getElementById('cnn-support-icon') as HTMLButtonElement,
    widget: document.getElementById('cnn-support-widget') as HTMLDivElement,
    messagesContainer: document.getElementById('cnn-support-messages') as HTMLDivElement,
    input: document.getElementById('cnn-support-input') as HTMLInputElement,
    sendButton: document.getElementById('cnn-support-send') as HTMLButtonElement,
    emptyState: document.getElementById('cnn-empty-state') as HTMLDivElement,
    loadingIndicator: document.getElementById('cnn-support-loading') as HTMLDivElement,
  };
}

function hideEmptyState() {
  const { emptyState } = getElements();
  if (emptyState && !emptyState.classList.contains('hidden')) {
    emptyState.classList.add('hidden');
  }
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

function displayMessage(message: ChatMessage, contentDiv?: HTMLDivElement) {
  const { messagesContainer } = getElements();
  
  hideEmptyState();
  
  if (contentDiv) {
    contentDiv.textContent = message.content;
    return contentDiv;
  }
  
  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${message.role === 'user' ? 'user-message' : 'ai-message'}`;
  
  const newContentDiv = document.createElement('div');
  newContentDiv.className = 'message-content';
  newContentDiv.textContent = message.content;
  
  messageDiv.appendChild(newContentDiv);
  messagesContainer.appendChild(messageDiv);
  
  requestAnimationFrame(() => {
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  });
  
  return newContentDiv;
}

function smoothScroll(container: HTMLElement) {
  requestAnimationFrame(() => {
    container.scrollTop = container.scrollHeight;
  });
}

async function fetchWithRetry(url: string, options: RequestInit, retries = MAX_RETRIES): Promise<Response> {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, options);
      if (response.ok || response.status === 400) {
        return response;
      }
      if (i < retries - 1 && response.status >= 500) {
        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY * (i + 1)));
        continue;
      }
      return response;
    } catch (error) {
      if (i < retries - 1) {
        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY * (i + 1)));
        continue;
      }
      throw error;
    }
  }
  throw new Error('Max retries exceeded');
}

async function sendMessage() {
  const { input, sendButton, loadingIndicator, messagesContainer } = getElements();
  const message = input.value.trim();
  
  if (!message || isLoading || message.length === 0) return;
  
  const userMessage: ChatMessage = { role: 'user', content: message };
  messageHistory.push(userMessage);
  displayMessage(userMessage);
  
  input.value = '';
  updateSendButtonState();
  
  isLoading = true;
  sendButton.disabled = true;
  sendButton.classList.remove('is-active');
  input.disabled = true;
  
  hideEmptyState();
  loadingIndicator.classList.remove('hidden');
  
  abortController = new AbortController();
  const startTime = Date.now();
  
  let aiContentDiv: HTMLDivElement | null = null;
  let accumulatedContent = '';
  
  try {
    const response = await fetchWithRetry(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'text/event-stream',
      },
      body: JSON.stringify({
        history: messageHistory.map(msg => ({
          role: msg.role === 'ai' ? 'assistant' : msg.role,
          content: msg.content
        }))
      }),
      signal: abortController.signal,
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }
    
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message ai-message';
    
    aiContentDiv = document.createElement('div');
    aiContentDiv.className = 'message-content';
    aiContentDiv.textContent = '';
    
    messageDiv.appendChild(aiContentDiv);
    messagesContainer.appendChild(messageDiv);
    smoothScroll(messagesContainer);

    const reader = response.body?.getReader();
    const decoder = new TextDecoder();
    
    if (reader) {
      let buffer = '';
      let lastUpdateTime = Date.now();
      const UPDATE_INTERVAL = 50;
      
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        
        buffer = lines.pop() || '';
        
        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed) continue;
          
          if (trimmed.startsWith('data:')) {
            const data = trimmed.startsWith('data: ') ? trimmed.slice(6) : trimmed.slice(5);
            if (data && data !== '[DONE]') {
              accumulatedContent += data;
              
              const now = Date.now();
              if (now - lastUpdateTime >= UPDATE_INTERVAL) {
                aiContentDiv.textContent = accumulatedContent;
                smoothScroll(messagesContainer);
                lastUpdateTime = now;
              }
            }
          }
        }
      }
      
      if (aiContentDiv && accumulatedContent) {
        aiContentDiv.textContent = accumulatedContent;
        smoothScroll(messagesContainer);
      }
    }
    
    if (accumulatedContent) {
      messageHistory.push({ role: 'ai', content: accumulatedContent });
    }
    
    const elapsed = Date.now() - startTime;
    const remainingDelay = Math.max(0, 800 - elapsed);
    await new Promise(resolve => setTimeout(resolve, remainingDelay));
    
    loadingIndicator.classList.add('hidden');
  } catch (error: any) {
    const elapsed = Date.now() - startTime;
    const remainingDelay = Math.max(0, 800 - elapsed);
    await new Promise(resolve => setTimeout(resolve, remainingDelay));
    
    loadingIndicator.classList.add('hidden');
    
    if (error.name === 'AbortError') {
      console.log('Request cancelled by user');
      return;
    }
    
    console.error('Error sending message:', error);
    
    const errorMessage = error.message?.includes('Failed to fetch')
      ? 'Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng.'
      : 'Xin lỗi, đã có lỗi xảy ra. Vui lòng thử lại sau.';
    
    displayMessage({
      role: 'ai',
      content: errorMessage,
    });
  } finally {
    isLoading = false;
    sendButton.disabled = false;
    input.disabled = false;
    input.focus();
    updateSendButtonState();
    abortController = null;
  }
}

function updateSendButtonState() {
  const { input, sendButton } = getElements();
  const hasValidText = input.value.trim().length > 0;
  
  if (hasValidText && !isLoading) {
    sendButton.classList.add('is-active');
    sendButton.disabled = false;
  } else {
    sendButton.classList.remove('is-active');
    sendButton.disabled = true;
  }
}

function initializeChatWidget() {
  const elements = getElements();
  
  if (!elements.icon || !elements.widget) {
    console.error('CNN Legal Support: Required elements not found');
    return;
  }
  
  elements.icon.addEventListener('click', toggleWidget);
  
  elements.sendButton.addEventListener('click', sendMessage);
  
  elements.input.addEventListener('input', updateSendButtonState);
  
  elements.input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      const hasValidText = elements.input.value.trim().length > 0;
      if (hasValidText && !isLoading) {
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

