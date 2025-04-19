# 💻 Personal Web Desktop (PWD)

This is a school project developed as a Single Page Application (SPA), where the user interacts with a desktop-like web environment that supports multiple applications running in movable, stackable windows. The project focuses on frontend architecture, user experience, and real-time communication using WebSockets.

## 🚀 Main Features

- Launch and manage multiple applications in draggable windows
- Desktop-style interface with a dock for sub-app shortcuts
- Chat functionality using WebSocket integration
- Memory game application
- A creative, custom-built application
- Optional offline support and Progressive Web App (PWA) features

## 🧩 Sub-Applications

### 🧠 MemoryApp
A classic memory game where the user flips cards to find matching pairs. Includes at least one additional custom feature for enhanced functionality.

### 💬 MessagesApp
A chat application using WebSockets, designed to simulate real-time communication similar to WhatsApp or Signal. This app was extended with at least one extra feature (e.g., emoji support or message encryption).

### 🛠️ CustomApp-Youtube
A creative, custom-made application built entirely by the developer. This could be an "About me" window or a project that uses a browser API or external integration. The purpose is to demonstrate creativity and self-direction.

## 🧱 Technologies Used

- JavaScript (ES6+)
- HTML5, CSS3
- WebSockets
- Progressive Web App (PWA)
- Service Workers (for offline functionality)
- Modular component structure

## 🗃️ Project Structure

```bash
📁 Component/
├── 📁 MemoryApp/         # Memory game application
├── 📁 MessagesApp/       # WebSocket-based chat app
├── 📁 CustomApp-Youtube/ # Custom self-made app
├── 📁 Docker/            # (Optional) Docker setup or environment
├── 📁 Windows/           # Window management logic
└── 📄 README.md          # This file
