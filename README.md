# AION · Neural Workspace

A premium, interactive AI workspace and dashboard built to optimize coding, learning, writing, and creating. AION combines advanced neural aesthetics—featuring glassmorphism, vibrant dark-mode gradients, and smooth micro-animations—with a powerful, stateful interface designed for developers, researchers, and students.

AION runs entirely on the client side, requiring no complex database backend, and is ready for instant deployment to static hosting platforms.

---

## 📂 Project Architecture & Directory Structure

The project has a lightweight, modular structure where content, presentation, and logic are cleanly decoupled:

```text
AION/
├── index.html   # Application entry point and layout shell
├── main.css     # Design system, variable definitions, and transitions
├── app.js       # App state, modular render engine, and interactive logic
└── README.md    # Comprehensive project documentation
```

* **[index.html](file:///c:/Users/yashw/Desktop/AION/index.html)**: Sets up the page head with metadata, loads the Inter and JetBrains Mono Google Fonts, and defines the `#app` mount point.
* **[main.css](file:///c:/Users/yashw/Desktop/AION/main.css)**: Implements CSS custom properties (`--bg-primary`, `--accent-indigo`, etc.), configures layout behaviors, handles media queries for mobile responsiveness, and hosts keyframe animations.
* **[app.js](file:///c:/Users/yashw/Desktop/AION/app.js)**: Contains the single-source-of-truth state machine (`state`), internationalization dictionary (`i18n`), modular render functions (`renderSidebar`, `renderHeader`, `renderMessages`, etc.), and user interaction handlers.

---

## 🌟 Detailed Feature Breakdown

### 1. Collapsible Navigation Sidebar
* **Stateful Chat Groupings**: Organizes historical chats chronologically:
  * **Pinned**: Highlighted conversations anchored to the top of the sidebar.
  * **Today**: Chats created within the current day.
  * **Yesterday**: Conversations from the previous calendar day.
  * **This Week**: Older active logs from the current calendar week.
* **Inline Chat Management**: Hovering over any chat item reveals interactive buttons to:
  * ✏️ **Rename**: Inline prompt to quickly modify the chat title.
  * 📌 **Pin/Unpin**: Toggle pinned status to move conversations to the top section.
  * 🗑️ **Delete**: Instantly purge conversation logs from state.
* **Dynamic Folder Organizers**: Groups chats into categorized workspaces (`Work`, `Study`, `Personal`, `Research`). Users can click **New Folder** to add custom directories.
* **Specialized AI Helpers**: Quick switches to context-specific assistants:
  * 🧠 **AION Core**: Baseline multi-purpose model.
  * 💻 **Code Master**: Optimized programming assistant.
  * ✍️ **Copywriter**: Creative content companion.
  * 🎨 **Image Gen**: Graphics generation assistant (listens to the `/image` prompt).
* **Collapsible Desktop & Mobile Layout**:
  * **Desktop**: Clicking the hamburger icon toggles the `.collapsed` class, smoothly scaling the sidebar width from `280px` to `0px` with transitions, expanding the main workspace to full screen.
  * **Mobile (<=768px)**: The sidebar converts to an off-screen drawer (`transform: translateX(-100%)`) backed by a darkened overlay (`.sidebar-overlay`). Toggling it slides the drawer in smoothly. Clicking the overlay auto-closes it.

### 2. Multi-Agent Chat Workspace
* **Header Configurations**:
  * **Model Selector**: Switch active models between `AION Pro` (maximum performance) and `AION Fast` (low latency).
  * **Compare Answers Mode**: Splits the response panel into a comparison grid, contrasting two different system execution paths (e.g., Offline/Edge priority vs. Cloud compute models).
  * **Branch Chatting**: Tapping **Branch** splits the chat from the active message, adding an inline separator indicating that a new workspace path has been spawned.
  * **Document Exporting**: Provides options to export your chat logs as a formatted PDF, Markdown file, or generate a shareable web link.
  * **Network Status Monitor**: Active listeners track browser internet status. If connection is lost, an offline badge appears with a notification warning that local Edge models have been activated.

### 3. Smart Code Runner & Split Panel
* **Interactive Code Blocks**: Code snippets inside chats display a custom header showing the detected language and action buttons:
  * 📋 **Copy**: Copies the raw code snippet to the clipboard.
  * ▶ **Run**: Runs compile simulations directly inside the card, appending an terminal console output block.
  * ⊞ **Open Panel**: Launches AION's **Split Screen Mode**.
* **Split Editor Panel**: Slides out from the right on desktop, occupying 48% of the screen. It displays the code in a full-height editor window with dedicated tabs (Preview vs Output) and simulation parameters.

### 4. Interactive Input Panel
* **Dynamic Text Area**: The input box dynamically adjusts its rows and box height up to `180px` based on input length to keep content readable.
* **Multi-Format Uploads**: An attachment button (`📎`) accepts local file formats (`.pdf`, `.docx`, `.png`, `.jpg`, `.py`, `.js`). Files are shown as removal-ready chips above the input field.
* **Speech-to-Text Recognition**: Tapping the microphone (`🎙`) leverages the browser's Web Speech API. Supports Indian accents for English, Hindi, and Telugu, streaming text directly into the textarea. Toggling it displays a pulsing red recording indicator.
* **Multilingual UI (i18n)**: Instant localization switcher for:
  * **English**
  * **Hindi (हिंदी)**
  * **Telugu (తెలుగు)**

---

## ⚙️ Settings & Theme Engine

### Theme Customization
* **Dark Theme**: Default theme using highly curated colors:
  * Primary background: `#0A0E1A` (deep dark blue)
  * Secondary background: `#111827`
  * Accents: Indigo (`#6C63FF`), Cyan (`#00D4FF`), Purple (`#9B59B6`), Green (`#00E676`)
* **Light Theme**: Toggled from settings or keyboard shortcut. Swaps root variable mappings:
  * Primary background: `#F0F4FF` (soft ice blue)
  * Secondary background: `#FFFFFF`
  * Primary text: `#0F172A` (deep charcoal)
* **Preference Caching**: When theme changes, student mode is toggled, or language is selected, state is saved to `localStorage` under `aion_prefs` so settings persist upon reload.

---

## ⌨️ Advanced Keyboard Shortcuts

AION provides a built-in hotkey registry for power users:

| Key Combination | Action |
| :--- | :--- |
| `Ctrl` + `N` | Open a New Chat Workspace |
| `Ctrl` + `K` | Focus the Sidebar Search input |
| `Ctrl` + `B` | Toggle Sidebar Collapse (Desktop/Mobile) |
| `Ctrl` + `M` | Toggle Voice Input / Microphone |
| `Ctrl` + `,` | Open the Settings Modal |
| `Ctrl` + `D` | Toggle between Dark and Light Mode |
| `Escape` | Close any active modal overlay |

---

## 💻 Running the Project Locally

Since AION is built entirely on standard Web APIs (HTML5, CSS3, and JavaScript), it does not require a compile step or complex node servers. 

### Method 1: Direct File Access
1. Locate the AION project folder on your computer.
2. Double-click the **[index.html](file:///c:/Users/yashw/Desktop/AION/index.html)** file. It will load in your default browser.

### Method 2: Local Server (Recommended for Speech & API features)
Some browser features (like the Web Speech API) require an HTTP origin rather than direct `file://` access. You can spin up a lightweight server using Python or Node.js:

**Using Python (v3+)**:
```bash
# Navigate to the workspace folder
cd c:/Users/yashw/Desktop/AION

# Start Python's built-in HTTP server
python -m http.server 8080
```
Open your browser and navigate to **`http://localhost:8080/index.html`**.

**Using Node.js**:
```bash
# Install and run a simple server instantly
npx serve .
# Or
npx http-server .
```

---

## 🚀 Deployment to Production (Render)

Deploy AION to Render as a **Static Site** for free hosting and automatic updates:

1. **Push your code to GitHub**:
   * Create a new repository on your GitHub account (leave all checkboxes for README, gitignore, and License unchecked).
   * Run the following commands in your project folder:
     ```bash
     git init
     git add .
     git commit -m "Initial release of AION Workspace"
     git branch -M main
     git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
     git push -u origin main
     ```
2. **Configure Render**:
   * Log in to [Render](https://render.com/).
   * Click **New +** and select **Static Site**.
   * Link your GitHub account and choose the repository you just pushed.
   * Fill out the configurations:
     * **Name**: `aion-neural-workspace`
     * **Branch**: `main`
     * **Build Command**: *Leave blank*
     * **Publish Directory**: `.` (the root folder containing `index.html`)
   * Click **Create Static Site**.
3. **Live Access**: Render will provision a free SSL certificate and deploy your app. The dashboard will display a live URL (e.g. `https://aion-neural-workspace.onrender.com`).
