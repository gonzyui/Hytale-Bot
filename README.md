# ⚔️ Hytale Guild Bot

An unofficial, modular Discord bot designed for **Hytale** communities and guilds. Built with **TypeScript** and **discord.js v14**, it features a clean architecture and real-time data fetching from the Hytale Wiki.

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white) ![Discord.js](https://img.shields.io/badge/Discord.js-5865F2?style=for-the-badge&logo=discord&logoColor=white) ![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)

## ✨ Features

* **🔍 Wiki Integration:**
    * **Smart Search:** Fuzzy search to find items even with partial names.
    * **Visual Embeds:** Automatically fetches high-quality images, descriptions, and links from *hytalewiki.org*.
    * **Commands:**
        * `/find <anything from the game>`: Displays information.

* **⚡ Modern Architecture:**
    * Written in **TypeScript**.
    * **Modular Command Handler:** Easy to add new commands in `src/commands`.
    * **Event Handler:** Separated logic in `src/events`.
    * **Services:** Isolated API logic (Wiki, etc.) for better maintainability.

## 🛠️ Prerequisites

* **Node.js** (v16.9.0 or higher)
* **npm** (or yarn/pnpm)
* A Discord Bot Token & Client ID (from the [Discord Developer Portal](https://discord.com/developers/applications))

## 🚀 Installation & Setup

1.  **Clone the repository**
    ```bash
    git clone https://github.com/gonzyui/hytale-bot.git
    cd hytale-bot
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables**
    Create a `.env` file in the root directory and add your credentials:
    ```env
    DISCORD_TOKEN=your_super_secret_bot_token
    CLIENT_ID=your_bot_application_id
    ```

4.  **Run in Development Mode**
    Uses `ts-node`.
    ```bash
    npm run dev
    ```

5.  **Build for Production**
    Compiles TypeScript to JavaScript in the `dist/` folder.
    ```bash
    npm run build
    npm start
    ```

## 📂 Project Structure

```text
/src
 ├── /commands      # Slash commands
 ├── /events        # Discord events (ready.ts, interactionCreate.ts)
 ├── /services      # External API logic (Wiki fetcher)
 ├── types.ts       # TypeScript interfaces
 └── index.ts       # Bot entry point and handler
```

## 🗺️ Roadmap

As Hytale is still in development (early access), some features are planned for when public APIs or server protocols become available.
- [x] Wiki Integration (Live fetching of Items/Mobs/Blocks).
- [x] Modular Handler (Clean Architecture).
- [ ] `/server <ip>` :
    - Status: ⏸️ **On Hold**.
Reason: Waiting for Hytale's official server protocol documentation (QUIC/UDP) to accurately query player counts and MOTD.
- [ ] `/skin <player>`:
    - Status: ⏸️ **On Hold**.
Reason: Waiting for the official Hytale Avatar API to fetch player models.

## 🤝 Contributing

Contributions are welcome! If you want to add a feature or fix a bug:

1. Fork the project.
2. Create your feature branch (git checkout -b feature/AmazingFeature).
3. Commit your changes (git commit -m 'Add some AmazingFeature').
4. Push to the branch (git push origin feature/AmazingFeature).
5. Open a Pull Request.

## 📄 License
Distributed under the MIT License. See LICENSE for more information.