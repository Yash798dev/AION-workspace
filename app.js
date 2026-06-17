// AION Neural Workspace — Main JS Complete Integration

// ── STATE ──
const state = {
  currentChat: null,
  sidebarOpen: false,
  darkMode: true,
  language: 'en',
  studentMode: false,
  splitPanel: false,
  isListening: false,
  isTyping: false,
  currentHelper: 'base',
  preferences: {},
  folders: ['Work', 'Study', 'Personal', 'Research'],
  aiHelpers: [
    { id: 'base', name: 'AION Core', icon: '🧠', desc: 'General intelligence' },
    { id: 'code', name: 'Code Master', icon: '💻', desc: 'Expert programmer' },
    { id: 'write', name: 'Copywriter', icon: '✍️', desc: 'Creative writing expert' },
    { id: 'image', name: 'Image Gen', icon: '🎨', desc: 'Draws things (/image)' }
  ],
  chats: {
    pinned: [
      { id: 'p1', title: 'Agentic HR Workflow Orchestration', icon: '📌', folder: 'Work' },
    ],
    today: [
      { id: 't1', title: 'QueueSwap UI Redesign', icon: '💬', folder: 'Work' },
      { id: 't2', title: 'MEAN Stack Authentication setup', icon: '🧠', folder: 'Study' },
    ],
    yesterday: [
      { id: 'y1', title: 'Offline Telugu Voice AI Model', icon: '⚛️', folder: 'Study' },
      { id: 'y2', title: 'HP Victus GPU resource monitoring', icon: '💻', folder: 'Personal' },
    ],
    week: [
      { id: 'w1', title: 'LangGraph vs LangChain comparison', icon: '🤖', folder: 'Research' }
    ]
  }
};

const i18n = {
  en: { newChat: 'New Chat', search: 'Search chats…', today: 'Today', yesterday: 'Yesterday', thisWeek: 'This Week', folders: 'Folders', helpers: 'AI Helpers', pinned: 'Pinned', send: 'Send', placeholder: 'Message AION… (Type /image to draw)', shortcuts: 'Shortcuts', settings: 'Settings', share: 'Share', export: 'Export', studentMode: 'Student Mode', darkMode: 'Dark Mode', language: 'Language', compareMode: 'Compare Answers', branchChat: 'Branch Chat' },
  hi: { newChat: 'नई चैट', search: 'चैट खोजें…', today: 'आज', yesterday: 'कल', thisWeek: 'इस सप्ताह', folders: 'फ़ोल्डर', helpers: 'AI सहायक', pinned: 'पिन किए', send: 'भेजें', placeholder: 'AION को संदेश भेजें…', shortcuts: 'शॉर्टकट', settings: 'सेटिंग्स', share: 'साझा करें', export: 'निर्यात', studentMode: 'छात्र मोड', darkMode: 'डार्क मोड', language: 'भाषा', compareMode: 'जवाब तुलना', branchChat: 'शाखा चैट' },
  te: { newChat: 'కొత్త చాట్', search: 'చాట్‌లు వెతకండి…', today: 'ఈరోజు', yesterday: 'నిన్న', thisWeek: 'ఈ వారం', folders: 'ఫోల్డర్లు', helpers: 'AI సహాయకులు', pinned: 'పిన్ చేసినవి', send: 'పంపు', placeholder: 'AION కు సందేశం…', shortcuts: 'షార్ట్‌కట్లు', settings: 'సెట్టింగ్లు', share: 'పంచుకోండి', export: 'ఎగుమతి', studentMode: 'విద్యార్థి మోడ్', darkMode: 'డార్క్ మోడ్', language: 'భాష', compareMode: 'సమాధానాలు పోల్చండి', branchChat: 'శాఖ చాట్' }
};

function t(key) { return (i18n[state.language] || i18n.en)[key] || key; }

// ── SAMPLE MESSAGES ──
const sampleConversation = [
  { role: 'user', content: 'Explain how multi-agent LangGraph workflows operate.', time: '10:42 AM' },
  { role: 'ai', content: `LangGraph is designed for building stateful, multi-actor applications with LLMs. Unlike simple chains, it treats the workflow as a graph where nodes are agents or tools, and edges determine the conditional routing based on the shared state.\n\nThis is highly effective for applications like your Agentic HR platform, where one agent might vet a resume, and conditionally pass state to an interview agent.`, 
    code: { lang: 'python', body: `from langgraph.graph import StateGraph, END\n\n# Define state schema\nclass AgentState(TypedDict):\n    candidate_data: dict\n    vetting_score: int\n\nworkflow = StateGraph(AgentState)\nworkflow.add_node("vet_resume", vet_agent)\nworkflow.add_node("schedule_interview", interview_agent)\n\nworkflow.add_edge("vet_resume", "schedule_interview")\napp = workflow.compile()` }, time: '10:43 AM' }
];

// ── RENDER COMPONENT SYSTEM ──
function renderSidebar() {
  return `
  <div class="sidebar" id="sidebar">
    <div class="sidebar-header">
      <a class="logo" href="#">
        <div class="logo-icon">🧠</div>
        <div><div class="logo-text">AION</div><div class="logo-sub">Neural Workspace</div></div>
      </a>
      <button class="new-chat-btn" title="${t('newChat')}" onclick="newChat()">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
      </button>
    </div>
    <div class="sidebar-search">
      <div class="search-input-wrap">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        <input class="search-input" placeholder="${t('search')}" id="sidebarSearch" oninput="searchChats(this.value)">
      </div>
    </div>
    <nav class="sidebar-nav" id="sidebarNav">
      ${renderChatGroups()}
      ${renderHelpers()}
      ${renderFolders()}
    </nav>
    <div class="sidebar-footer">
      <div class="plan-badge" onclick="openModal('upi')">
        <div class="plan-title">⚡ Free Plan</div>
        <div class="plan-desc">Upgrade for unlimited chats</div>
        <div class="plan-upgrade">Upgrade →</div>
      </div>
      <div class="user-row" onclick="openModal('settings')">
        <div class="user-avatar">Y</div>
        <div><div class="user-name">Yashwanth</div><div class="user-email">student@example.com</div></div>
        <div class="user-chevron">⚙</div>
      </div>
    </div>
  </div>
  <div class="sidebar-overlay" id="sidebarOverlay" onclick="closeSidebar()"></div>`;
}

function renderHelpers() {
  let html = `<div class="chat-group"><div class="chat-group-label">🤖 ${t('helpers')}</div>`;
  state.aiHelpers.forEach(h => {
    html += `<div class="helper-item ${state.currentHelper === h.id ? 'active' : ''}" onclick="setHelper('${h.id}')"><span class="helper-icon">${h.icon}</span>${h.name}</div>`;
  });
  return html + '</div>';
}

function renderChatGroups() {
  let html = '';
  if (state.chats.pinned.length > 0) {
    html += `<div class="chat-group"><div class="chat-group-label">📌 ${t('pinned')}</div>`;
    state.chats.pinned.forEach(c => { html += renderChatItem(c, true); });
    html += '</div>';
  }
  const groups = [{ key: 'today', label: t('today') }, { key: 'yesterday', label: t('yesterday') }, { key: 'week', label: t('thisWeek') }];
  groups.forEach(g => {
    if (state.chats[g.key] && state.chats[g.key].length > 0) {
      html += `<div class="chat-group"><div class="chat-group-label">${g.label}</div>`;
      state.chats[g.key].forEach(c => { html += renderChatItem(c); });
      html += '</div>';
    }
  });
  return html;
}

function renderChatItem(chat, pinned = false) {
  return `
  <div class="chat-item${state.currentChat === chat.id ? ' active' : ''}" onclick="selectChat('${chat.id}', '${chat.title.replace(/'/g,"\\'")}')">
    <span class="chat-item-icon">${chat.icon}</span>
    <span class="chat-item-text">${chat.title}</span>
    ${pinned ? '<span class="chat-item-pin">📌</span>' : ''}
    <div class="chat-item-actions">
      <button class="chat-action-btn" title="Rename" onclick="renameChat(event,'${chat.id}')">✏</button>
      <button class="chat-action-btn" title="${pinned ? 'Unpin' : 'Pin'}" onclick="pinChat(event,'${chat.id}')">📌</button>
      <button class="chat-action-btn" title="Delete" onclick="deleteChat(event,'${chat.id}')">🗑</button>
    </div>
  </div>`;
}

function renderFolders() {
  let html = `<div class="chat-group"><div class="chat-group-label">📁 ${t('folders')}</div>`;
  state.folders.forEach(f => { html += `<div class="folder-item" onclick="openFolder('${f}')"><span class="folder-icon">📁</span>${f}<span class="folder-count">2</span></div>`; });
  html += `<div class="folder-item" onclick="createFolder()" style="color:var(--text-muted)"><span class="folder-icon">➕</span>New Folder</div></div>`;
  return html;
}

function renderHeader(title = 'AION Workspace') {
  return `
  <div class="chat-header" id="chatHeader">
    <button class="menu-toggle" id="menuToggle" onclick="toggleSidebar()"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg></button>
    <div class="chat-title" id="chatTitle">${title}</div>
    <div class="offline-badge" id="offlineBadge"><span>●</span> Offline</div>
    ${state.studentMode ? '<span class="student-mode-badge">🎓 Student</span>' : ''}
    <div class="header-actions">
      <select class="model-selector" id="modelSelector" onchange="changeModel(this.value)"><option value="aion-pro">AION Pro</option><option value="aion-fast">AION Fast</option></select>
      <button class="header-btn" onclick="toggleCompare()" title="${t('compareMode')}"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="9" height="20" rx="1"/><rect x="13" y="2" width="9" height="20" rx="1"/></svg><span>${t('compareMode')}</span></button>
      <button class="header-btn accent" onclick="branchChat()" title="${t('branchChat')}"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="6" y1="3" x2="6" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/></svg><span>Branch</span></button>
      <button class="header-btn" onclick="openModal('export')" title="${t('export')}"><span>${t('export')}</span></button>
      <button class="header-btn" onclick="openModal('settings')" title="Settings">⚙</button>
    </div>
  </div>`;
}

function renderWelcome() {
  const suggestions = [
    { icon: '🤖', text: 'Design a multi-agent architecture using LangGraph', tag: 'Architecture' },
    { icon: '🧠', text: 'Explain model quantization for edge devices', tag: 'Learning' },
    { icon: '✍️', text: 'Write an Angular service for MEAN stack', tag: 'Code' },
    { icon: '🎨', text: '/image an abstract logo representing "balance and exchange"', tag: 'Design' }
  ];
  return `
  <div class="welcome-screen">
    <div class="welcome-logo">🧠</div>
    <div class="welcome-title">How can AION help you today?</div>
    <div class="welcome-sub">Your intelligent neural workspace — code, learn, write, and create faster.</div>
    <div class="suggestions-grid">
      ${suggestions.map(s => `<div class="suggestion-card" onclick="sendSuggestion('${s.text.replace(/'/g,"\\'")}')"><div class="suggestion-icon">${s.icon}</div><div class="suggestion-text">${s.text}</div><div class="suggestion-tag">${s.tag}</div></div>`).join('')}
    </div>
    <div style="font-size:12px;color:var(--text-muted)">Press <kbd>Ctrl+K</kbd> to search • <kbd>Ctrl+N</kbd> for new chat</div>
  </div>`;
}

function renderMessages(msgs) {
  return msgs.map(msg => {
    if (msg.role === 'user') {
      return `
      <div class="message-group">
        <div class="message"><div class="message-header"><div class="msg-avatar user">Y</div><div class="msg-name">You</div><div class="msg-time">${msg.time}</div></div>
        <div class="message-body"><p>${msg.content}</p></div>
        <div class="msg-actions"><button class="msg-action" title="Copy" onclick="copyText(this)">📋</button><button class="msg-action" title="Branch" onclick="branchFromMsg()">⑂</button></div></div>
      </div>`;
    } else {
      let codeBlock = '';
      if (msg.code) {
        codeBlock = `
        <div class="code-block"><div class="code-header"><span class="code-lang">${msg.code.lang}</span><div class="code-actions"><button class="code-btn" onclick="copyCode(this)">📋 Copy</button><button class="code-btn" onclick="runCode(this)">▶ Run</button><button class="code-btn" onclick="openSplit(this)">⊞ Open Panel</button></div></div>
        <pre class="code-body">${escapeHtml(msg.code.body)}</pre></div>`;
      }
      return `
      <div class="message-group">
        <div class="message"><div class="message-header"><div class="msg-avatar ai">🧠</div><div class="msg-name">AION</div><div class="msg-time">${msg.time}</div></div>
        <div class="message-body"><p>${msg.content}</p>${codeBlock}</div>
        <div class="msg-actions"><button class="msg-action" title="Copy" onclick="copyText(this)">📋</button><button class="msg-action" title="Compare" onclick="compareAnswer()">⚖</button><button class="msg-action" title="Branch" onclick="branchFromMsg()">⑂</button></div></div>
      </div>`;
    }
  }).join('');
}

function renderInputArea() {
  return `
  <div class="input-area"><div class="input-wrap-outer">
    <div class="input-files-preview" id="filesPreview"></div>
    <div class="input-box" id="inputBox">
      <textarea class="chat-textarea" id="chatInput" placeholder="${t('placeholder')}" rows="1" onkeydown="handleInputKey(event)" oninput="autoResize(this); updateCharCount()"></textarea>
      <div class="input-footer">
        <div class="input-tools">
          <button class="input-tool-btn" title="Attach file">📎<input type="file" multiple accept=".pdf,.docx,.png,.jpg,.py,.js" onchange="handleFileUpload(event)"></button>
          <button class="input-tool-btn voice-btn" id="voiceBtn" title="Voice input (Indian accent)" onclick="toggleVoice()">🎙</button>
          <button class="input-tool-btn" title="Student mode flashcards" onclick="openModal('student')">🎓</button>
          <button class="input-tool-btn" title="Language" onclick="openModal('language')">🌐</button>
          <span class="char-count" id="charCount"></span>
        </div>
        <button class="send-btn" id="sendBtn" onclick="sendMessage()" title="${t('send')} (Enter)"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg></button>
      </div>
    </div>
    <div class="input-hint">Press <kbd>Enter</kbd> to send · <kbd>Shift+Enter</kbd> for new line</div>
  </div></div>
  <button class="scroll-bottom-btn" id="scrollBottomBtn" onclick="scrollToBottom()">↓</button>`;
}

// ── BOTTOM NAV (mobile ≤767px restructured nav — not a shrunk desktop nav) ──
function renderBottomNav() {
  return `
  <nav class="bottom-nav" id="bottomNav" aria-label="Mobile navigation">
    <button class="bottom-nav-btn active" id="bnHome" onclick="bottomNavSelect('home')" aria-label="Home">
      <span class="nav-icon">🏠</span><span>Home</span>
    </button>
    <button class="bottom-nav-btn" id="bnChats" onclick="bottomNavSelect('chats')" aria-label="Chats">
      <span class="nav-icon">💬</span><span>Chats</span>
    </button>
    <button class="bottom-nav-btn" id="bnNew" onclick="newChat(); bottomNavSelect('home')" aria-label="New chat">
      <span class="nav-icon">✏️</span><span>New</span>
    </button>
    <button class="bottom-nav-btn" id="bnHelpers" onclick="bottomNavSelect('helpers'); openModal('helpers')" aria-label="AI Helpers">
      <span class="nav-icon">🤖</span><span>Helpers</span>
    </button>
    <button class="bottom-nav-btn" id="bnSettings" onclick="bottomNavSelect('settings'); openModal('settings')" aria-label="Settings">
      <span class="nav-icon">⚙️</span><span>Settings</span>
    </button>
  </nav>`;
}

function bottomNavSelect(tab) {
  document.querySelectorAll('.bottom-nav-btn').forEach(b => b.classList.remove('active'));
  const map = { home: 'bnHome', chats: 'bnChats', new: 'bnNew', helpers: 'bnHelpers', settings: 'bnSettings' };
  if (map[tab]) document.getElementById(map[tab])?.classList.add('active');
  // 'chats' tab opens the sidebar drawer
  if (tab === 'chats') toggleSidebar();
}

// ── INITIALIZATION ──
function buildApp() {
  document.getElementById('app').innerHTML = `
    ${renderSidebar()}
    <div class="main" id="mainArea">
      ${renderHeader()}
      <div class="chat-messages" id="chatMessages" onscroll="handleScroll()">${renderWelcome()}</div>
      ${renderInputArea()}
    </div>
    <div class="split-panel" id="splitPanel" style="display:none">
      <div class="split-panel-header"><span class="split-panel-title">Code Editor</span>
        <div class="split-panel-tabs"><button class="panel-tab active">Preview</button><button class="panel-tab">Output</button></div>
        <button class="split-panel-close" onclick="closeSplitPanel()">×</button>
      </div>
      <div class="split-panel-body" id="splitPanelBody"></div>
    </div>
    <div class="modal-overlay" id="modalOverlay" onclick="handleOverlayClick(event)"><div class="modal" id="modal"></div></div>
    <div class="toast-container" id="toastContainer"></div>
    ${renderBottomNav()}`;
  attachKeyboardShortcuts();
  checkOnlineStatus();
  loadPreferences();
}

// ── INTERACTIONS ──
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebarOverlay');
  // Mobile breakpoint: 767px (matches CSS max-width: 767px)
  if (window.innerWidth <= 767) {
    state.sidebarOpen = sidebar.classList.toggle('open');
    overlay.classList.toggle('open', state.sidebarOpen);
    sidebar.classList.remove('collapsed');
  } else {
    const isCollapsed = sidebar.classList.toggle('collapsed');
    state.sidebarOpen = !isCollapsed;
    sidebar.classList.remove('open');
    overlay.classList.remove('open');
  }
}
function closeSidebar() {
  if (window.innerWidth <= 767) {
    state.sidebarOpen = false;
    document.getElementById('sidebar').classList.remove('open');
    document.getElementById('sidebarOverlay').classList.remove('open');
    // Deselect "Chats" bottom nav tab after drawer closes
    document.querySelectorAll('.bottom-nav-btn').forEach(b => b.classList.remove('active'));
    document.getElementById('bnHome')?.classList.add('active');
  }
}

function setHelper(id) {
  state.currentHelper = id;
  document.getElementById('sidebarNav').innerHTML = renderChatGroups() + renderHelpers() + renderFolders();
  showToast(`Switched to ${state.aiHelpers.find(h=>h.id===id).name}`, 'success', '🤖');
}

function selectChat(id, title) {
  state.currentChat = id;
  document.getElementById('chatTitle').textContent = title;
  closeSidebar();
  const msgs = document.getElementById('chatMessages');
  msgs.innerHTML = renderMessages(sampleConversation);
  scrollToBottom();
  document.querySelectorAll('.chat-item').forEach(el => el.classList.toggle('active', el.querySelector('.chat-item-text')?.textContent === title));
}

function newChat() {
  state.currentChat = null;
  document.getElementById('chatTitle').textContent = 'AION Workspace';
  document.getElementById('chatMessages').innerHTML = renderWelcome();
  document.getElementById('chatInput').value = '';
  document.getElementById('filesPreview').innerHTML = '';
  closeSidebar();
  document.getElementById('chatInput').focus();
}

function sendSuggestion(text) { document.getElementById('chatInput').value = text; sendMessage(); }

function sendMessage() {
  const input = document.getElementById('chatInput');
  const text = input.value.trim();
  if (!text) return;
  
  const msgs = document.getElementById('chatMessages');
  if (msgs.querySelector('.welcome-screen')) { msgs.innerHTML = ''; state.currentChat = 'new_' + Date.now(); }
  
  const now = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
  
  const userMsg = document.createElement('div');
  userMsg.className = 'message-group';
  userMsg.innerHTML = renderMessages([{ role: 'user', content: escapeHtml(text), time: now }]);
  msgs.appendChild(userMsg);
  
  input.value = ''; autoResize(input); updateCharCount(); scrollToBottom();
  
  const typing = document.createElement('div');
  typing.className = 'message-group'; typing.id = 'typingIndicator';
  typing.innerHTML = `<div class="typing-indicator"><div class="msg-avatar ai">🧠</div><div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div></div>`;
  msgs.appendChild(typing); scrollToBottom();
  
  setTimeout(() => {
    typing.remove();
    const aiMsg = document.createElement('div');
    aiMsg.className = 'message-group';
    
    if (text.startsWith('/image')) {
      const prompt = text.replace('/image', '').trim();
      aiMsg.innerHTML = `
        <div class="message"><div class="message-header"><div class="msg-avatar ai">🎨</div><div class="msg-name">Image Gen</div><div class="msg-time">${now}</div></div>
        <div class="message-body"><p>I generated the image based on your prompt: <em>"${escapeHtml(prompt)}"</em></p>
        <div class="generated-image-box"><div class="image-loading">🎨<br>Rendering matrix...</div></div></div></div>`;
      setTimeout(() => {
        const box = aiMsg.querySelector('.generated-image-box');
        if(box) box.innerHTML = `<img src="https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&w=800&q=80" alt="Generated visual" style="width:100%; height:auto;">`;
        scrollToBottom();
      }, 2000);
    } else {
      const helperName = state.aiHelpers.find(h => h.id === state.currentHelper).name;
      const codeData = (text.toLowerCase().includes('code') || text.toLowerCase().includes('script') || state.currentHelper === 'code') 
        ? { lang: 'javascript', body: 'console.log("Running in AION Workspace");\n// Advanced algorithms generated here' } : null;
      aiMsg.innerHTML = renderMessages([{ role: 'ai', content: `[${helperName}] I have analyzed your request regarding "${escapeHtml(text.substring(0,30))}...". Here is the optimal solution path structured for your workspace.`, time: now, code: codeData }]);
    }
    
    msgs.appendChild(aiMsg);
    scrollToBottom();
  }, 1200 + Math.random() * 800);
}

function handleInputKey(e) { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } }
function autoResize(el) { el.style.height = 'auto'; el.style.height = Math.min(el.scrollHeight, 180) + 'px'; }
function updateCharCount() { const count = document.getElementById('charCount'); const len = document.getElementById('chatInput').value.length; count.textContent = len > 100 ? `${len}` : ''; }
function handleScroll() { const msgs = document.getElementById('chatMessages'); const btn = document.getElementById('scrollBottomBtn'); const atBottom = msgs.scrollHeight - msgs.scrollTop - msgs.clientHeight < 50; btn?.classList.toggle('visible', !atBottom); }
function scrollToBottom() { const msgs = document.getElementById('chatMessages'); if (msgs) msgs.scrollTop = msgs.scrollHeight; }

function handleFileUpload(event) {
  const files = Array.from(event.target.files);
  const preview = document.getElementById('filesPreview');
  files.forEach(file => {
    const ext = file.name.split('.').pop().toLowerCase();
    const icons = { pdf: '📄', docx: '📝', png: '🖼', jpg: '🖼', py: '🐍', js: '🟨' };
    const chip = document.createElement('div');
    chip.className = 'file-chip';
    chip.innerHTML = `${icons[ext] || '📎'} ${file.name} <button class="file-chip-remove" onclick="this.parentElement.remove()">×</button>`;
    preview.appendChild(chip);
  });
  showToast(`${files.length} file(s) attached`, 'success', '📎');
}

function toggleVoice() {
  if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) return showToast('Voice input not supported', 'error', '🎙');
  const btn = document.getElementById('voiceBtn');
  state.isListening = !state.isListening;
  btn.classList.toggle('listening', state.isListening);
  if (state.isListening) {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = state.language === 'hi' ? 'hi-IN' : state.language === 'te' ? 'te-IN' : 'en-IN';
    recognition.onresult = (e) => { document.getElementById('chatInput').value = e.results[0][0].transcript; autoResize(document.getElementById('chatInput')); };
    recognition.onend = () => { state.isListening = false; btn.classList.remove('listening'); };
    recognition.start();
    showToast('Listening… speak now', 'info', '🎙');
  }
}

// ── MODALS ──
function openModal(type) {
  const overlay = document.getElementById('modalOverlay');
  const modal = document.getElementById('modal');
  
  if (type === 'settings') {
    modal.innerHTML = `
      <div class="modal-header"><div class="modal-title">⚙ Settings</div><button class="modal-close" onclick="closeModal()">×</button></div>
      <div class="modal-body">
        <div class="settings-tabs"><button class="settings-tab active">General</button><button class="settings-tab" onclick="showToast('Memory settings unavailable','info')">AI Memory</button></div>
        <div class="setting-row"><div><div class="setting-label">🎓 Student Mode</div><div class="setting-desc">Flashcards & simplified explanations</div></div><div class="toggle ${state.studentMode?'on':''}" onclick="toggleStudentMode(this)"></div></div>
        <div class="setting-row"><div><div class="setting-label">🌙 Dark Mode</div></div><div class="toggle ${state.darkMode?'on':''}" onclick="toggleDarkMode(this)"></div></div>
        <div class="setting-row"><div><div class="setting-label">⊞ Split Panel</div></div><div class="toggle ${state.splitPanel?'on':''}" onclick="toggleSplitPanel(this)"></div></div>
      </div>`;
  } else if (type === 'student') {
    modal.innerHTML = `
      <div class="modal-header"><div class="modal-title">🎓 Student Mode</div><button class="modal-close" onclick="closeModal()">×</button></div>
      <div class="modal-body">
        <div class="setting-row" style="cursor:pointer;padding:12px;background:var(--bg-tertiary);border-radius:var(--radius-md);border:1px solid var(--border)" onclick="studentAction('Explain Like I\\'m 10')">
          <div><div class="setting-label">🔢 Explain Like I'm 10</div><div class="setting-desc">Simplify hard concepts</div></div><span style="color:var(--text-muted)">→</span>
        </div>
        <div style="margin-top:16px" class="flashcard" onclick="flipFlashcard(this)">
          <div class="flashcard-q">What is model quantization?</div>
          <div class="flashcard-a" style="display:none">It's a technique to reduce the memory footprint of an AI model by lowering the precision of its weights, making it perfect for edge devices like low-end mobile phones.</div>
          <span class="flashcard-flip-hint">Tap to flip →</span>
        </div>
      </div>`;
  } else if (type === 'upi') {
    modal.innerHTML = `
      <div class="modal-header"><div class="modal-title">⚡ Upgrade to AION Pro</div><button class="modal-close" onclick="closeModal()">×</button></div>
      <div class="modal-body"><div class="price-display"><div class="price-amount">₹49<span style="font-size:20px">/mo</span></div><div class="price-period">Student Plan</div></div>
      <div class="upi-options">${['GPay','PhonePe','Paytm'].map(n=>`<div class="upi-opt" onclick="closeModal();showToast('Opening ${n}','info')"><div class="upi-opt-icon">📱</div><div class="upi-opt-name">${n}</div></div>`).join('')}</div>
      <button class="pay-btn" onclick="closeModal();showToast('Secure Gateway (Demo)','success')">🔒 Pay ₹49 Securely</button></div>`;
  } else if (type === 'language') {
    modal.innerHTML = `
      <div class="modal-header"><div class="modal-title">🌐 Language</div><button class="modal-close" onclick="closeModal()">×</button></div>
      <div class="modal-body">${[['English','en'],['हिंदी','hi'],['తెలుగు','te']].map(([n,c])=>`<div class="setting-row" style="cursor:pointer;padding:12px;background:var(--bg-tertiary);border-radius:var(--radius-md);border:1px solid ${state.language===c?'var(--accent-indigo)':'var(--border)'}" onclick="setLanguage('${c}')"><div class="setting-label">${n}</div>${state.language===c?'<span style="color:var(--accent-indigo)">✓</span>':''}</div>`).join('')}</div>`;
  } else if (type === 'export') {
    modal.innerHTML = `
      <div class="modal-header"><div class="modal-title">📤 Export</div><button class="modal-close" onclick="closeModal()">×</button></div>
      <div class="modal-body">${['PDF Document','Markdown','Share Link'].map(fmt=>`<div class="setting-row" style="cursor:pointer;padding:12px;background:var(--bg-tertiary);border-radius:var(--radius-md);border:1px solid var(--border)" onclick="closeModal();showToast('Exporting ${fmt}','success')"><div class="setting-label">${fmt}</div></div>`).join('')}</div>`;
  } else if (type === 'keyboard') {
    modal.innerHTML = `<div class="modal-header"><div class="modal-title">⌨ Shortcuts</div><button class="modal-close" onclick="closeModal()">×</button></div><div class="modal-body"><div class="shortcut-grid">${[['New chat',['Ctrl','N']],['Search',['Ctrl','K']],['Settings',['Ctrl',',']],['Voice',['Ctrl','M']]].map(([d,k])=>`<div class="shortcut-item"><span class="shortcut-desc">${d}</span><span class="shortcut-keys">${k.map(x=>`<kbd>${x}</kbd>`).join('+')}</span></div>`).join('')}</div></div>`;
  } else if (type === 'helpers') {
    /* Mobile bottom-nav "Helpers" — equivalent of sidebar AI Helper list */
    modal.innerHTML = `
      <div class="modal-header"><div class="modal-title">🤖 AI Helpers</div><button class="modal-close" onclick="closeModal()">×</button></div>
      <div class="modal-body">${state.aiHelpers.map(h=>`
        <div class="setting-row" style="cursor:pointer;padding:12px;background:${state.currentHelper===h.id?'rgba(59,130,246,0.12)':'var(--bg-tertiary)'};border-radius:var(--radius-md);border:1px solid ${state.currentHelper===h.id?'var(--accent-indigo)':'var(--border)'};margin-bottom:8px" onclick="setHelper('${h.id}');closeModal()">
          <div><div class="setting-label">${h.icon} ${h.name}</div><div class="setting-desc">${h.desc}</div></div>
          ${state.currentHelper===h.id?'<span style="color:var(--accent-indigo)">✓</span>':''}
        </div>`).join('')}</div>`;
  }
  overlay.classList.add('open');
}

function closeModal() { document.getElementById('modalOverlay').classList.remove('open'); }
function handleOverlayClick(e) { if (e.target === e.currentTarget) closeModal(); }

// ── TOGGLES & SETTINGS ──
function toggleDarkMode(el) { state.darkMode = !state.darkMode; el.classList.toggle('on', state.darkMode); document.body.classList.toggle('light-mode', !state.darkMode); showToast(state.darkMode ? 'Dark mode on' : 'Light mode on', 'info', '🌙'); savePreferences(); }
function toggleStudentMode(el) { state.studentMode = !state.studentMode; el.classList.toggle('on', state.studentMode); showToast(state.studentMode ? '🎓 Student mode on!' : 'Student mode off', 'info', '🎓'); const header = document.getElementById('chatHeader'); if (header) header.outerHTML = renderHeader(document.getElementById('chatTitle')?.textContent || 'AION'); savePreferences(); }
function setLanguage(code) { state.language = code; savePreferences(); closeModal(); buildApp(); showToast('Language updated', 'success', '🌐'); }

function flipFlashcard(el) {
  const q = el.querySelector('.flashcard-q'); const a = el.querySelector('.flashcard-a');
  if (a.style.display === 'none') { q.style.display = 'none'; a.style.display = 'block'; el.querySelector('.flashcard-flip-hint').textContent = 'Tap to flip back ←'; } 
  else { q.style.display = 'block'; a.style.display = 'none'; el.querySelector('.flashcard-flip-hint').textContent = 'Tap to flip →'; }
}

function studentAction(action) { closeModal(); document.getElementById('chatInput').value = action + ': '; document.getElementById('chatInput').focus(); }

// ── SPLIT PANEL & CODE ──
function toggleSplitPanel(el) {
  state.splitPanel = !state.splitPanel; if(el) el.classList.toggle('on', state.splitPanel);
  const panel = document.getElementById('splitPanel');
  if (state.splitPanel) { panel.style.display = 'flex'; document.getElementById('splitPanelBody').innerHTML = `<div style="text-align:center;padding:40px;color:var(--text-muted);font-size:13px">Click "Open Panel" on any code block</div>`; } 
  else { panel.style.display = 'none'; }
}
function closeSplitPanel() { state.splitPanel = false; document.getElementById('splitPanel').style.display = 'none'; }
function openSplit(btn) {
  const code = btn.closest('.code-block').querySelector('.code-body').textContent;
  const panel = document.getElementById('splitPanel'); panel.style.display = 'flex'; state.splitPanel = true;
  document.getElementById('splitPanelBody').innerHTML = `<pre style="font-family:'JetBrains Mono',monospace;font-size:13px;color:var(--text-secondary);white-space:pre-wrap">${code}</pre><div style="margin-top:16px;padding:12px;background:#050810;border-radius:var(--radius-md);font-family:'JetBrains Mono',monospace;font-size:12px;color:var(--accent-green)">> Process exited with code 0</div>`;
  showToast('Code opened in panel', 'info', '⊞');
}
function copyCode(btn) { navigator.clipboard?.writeText(btn.closest('.code-block').querySelector('.code-body').textContent).then(() => { btn.textContent = '✓ Copied!'; setTimeout(() => btn.innerHTML = '📋 Copy', 1500); showToast('Code copied!', 'success'); }); }
function runCode(btn) {
  const block = btn.closest('.code-block'); let output = block.querySelector('.code-output');
  if (!output) { output = document.createElement('div'); output.className = 'code-output'; block.appendChild(output); }
  output.textContent = '> Executing compilation workflow...\n> Success!';
  showToast('Execution successful', 'success', '▶');
}
function copyText(btn) { navigator.clipboard?.writeText(btn.closest('.message').querySelector('.message-body')?.textContent || '').then(() => showToast('Copied to clipboard!', 'success', '📋')); }

// ── BRANCH & COMPARE ──
function branchChat() {
  const msgs = document.getElementById('chatMessages');
  const indicator = document.createElement('div'); indicator.className = 'message-group';
  indicator.innerHTML = `<div class="branch-indicator"><div class="branch-dot"></div><div class="branch-line"></div><span>⑂ Chat branched from here</span><div class="branch-line"></div></div>`;
  msgs.appendChild(indicator); scrollToBottom(); showToast('New branch created', 'success', '⑂');
}
function branchFromMsg() { branchChat(); }
function compareAnswer() {
  const msgs = document.getElementById('chatMessages');
  const compare = document.createElement('div'); compare.className = 'message-group';
  compare.innerHTML = `<div class="message"><div class="message-header"><div class="msg-avatar ai">🧠</div><div class="msg-name">AION Comparison</div></div><div class="message-body"><div class="compare-grid"><div class="compare-card"><div class="compare-label">Approach A: Offline Priority</div><div style="font-size:13px;color:var(--text-secondary)">Optimized for edge execution using quantized models. Best for hardware constrained environments.</div></div><div class="compare-card"><div class="compare-label">Approach B: Cloud Native</div><div style="font-size:13px;color:var(--text-secondary)">Relies on server-side compute. High latency but handles complex, large parameter tasks easily.</div></div></div></div></div>`;
  msgs.appendChild(compare); scrollToBottom();
}
function toggleCompare() { compareAnswer(); showToast('Comparison mode active', 'info', '⚖'); }

// ── CHAT MANAGEMENT ──
function renameChat(e, id) { e.stopPropagation(); const n = prompt('Rename chat:'); if (n) { for (const g of Object.values(state.chats)) { const c = g.find(x => x.id === id); if (c) { c.title = n; break; } } document.getElementById('sidebarNav').innerHTML = renderChatGroups() + renderHelpers() + renderFolders(); } }
function pinChat(e, id) { e.stopPropagation(); for (const [k, g] of Object.entries(state.chats)) { if (k==='pinned') continue; const i = g.findIndex(x=>x.id===id); if (i!==-1) { state.chats.pinned.push(g.splice(i,1)[0]); break; } } document.getElementById('sidebarNav').innerHTML = renderChatGroups() + renderHelpers() + renderFolders(); showToast('Pinned', 'success', '📌'); }
function deleteChat(e, id) { e.stopPropagation(); for (const g of Object.values(state.chats)) { const i = g.findIndex(x=>x.id===id); if (i!==-1) { g.splice(i,1); break; } } document.getElementById('sidebarNav').innerHTML = renderChatGroups() + renderHelpers() + renderFolders(); showToast('Deleted', 'info', '🗑'); }
function openFolder(n) { showToast(`Opened ${n}`, 'info', '📁'); }
function createFolder() { const n = prompt('Folder name:'); if (n) { state.folders.push(n); document.getElementById('sidebarNav').innerHTML = renderChatGroups() + renderHelpers() + renderFolders(); } }
function searchChats(q) {
  if (!q) { document.getElementById('sidebarNav').innerHTML = renderChatGroups() + renderHelpers() + renderFolders(); return; }
  const f = Object.values(state.chats).flat().filter(c => c.title.toLowerCase().includes(q.toLowerCase()));
  document.getElementById('sidebarNav').innerHTML = f.length === 0 ? `<div style="padding:20px;text-align:center;font-size:13px;color:var(--text-muted)">No chats found</div>` : `<div class="chat-group"><div class="chat-group-label">Search Results</div>${f.map(c => renderChatItem(c)).join('')}</div>`;
}

// ── UTILITIES ──
function attachKeyboardShortcuts() {
  document.addEventListener('keydown', (e) => {
    if (e.ctrlKey || e.metaKey) {
      switch(e.key) { case 'n': e.preventDefault(); newChat(); break; case 'k': e.preventDefault(); document.getElementById('sidebarSearch')?.focus(); break; case 'b': e.preventDefault(); toggleSidebar(); break; case ',': e.preventDefault(); openModal('settings'); break; case 'd': e.preventDefault(); document.body.classList.toggle('light-mode'); break; case 'm': e.preventDefault(); toggleVoice(); break; }
    }
    if (e.key === 'Escape') closeModal();
  });
}
function checkOnlineStatus() {
  const badge = document.getElementById('offlineBadge');
  const update = () => badge?.classList.toggle('show', !navigator.onLine);
  window.addEventListener('online', update); window.addEventListener('offline', () => { update(); showToast('You are offline. Edge models activated.', 'info', '📶'); });
  update();
}
function loadPreferences() { try { const s = localStorage.getItem('aion_prefs'); if (s) { const p = JSON.parse(s); state.darkMode = p.darkMode ?? true; state.language = p.language ?? 'en'; state.studentMode = p.studentMode ?? false; if (!state.darkMode) document.body.classList.add('light-mode'); } } catch(e) {} }
function savePreferences() { try { localStorage.setItem('aion_prefs', JSON.stringify({ darkMode: state.darkMode, language: state.language, studentMode: state.studentMode })); } catch(e) {} }
function escapeHtml(str) { return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
function changeModel(v) { showToast(`Switched to ${v}`, 'info', '🤖'); }

document.addEventListener('DOMContentLoaded', buildApp);