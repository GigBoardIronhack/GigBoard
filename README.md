# GigBoard

[![Deploy](https://img.shields.io/badge/Deploy-gig--board--lz4a.vercel.app-4B5563)](https://gig-board-lz4a.vercel.app)

**GigBoard** is a platform designed to connect agencies and promoters in the entertainment industry, making it easier to manage and promote live events.

---

## 🚀 Main Features

1. 🎟️ **Event Management**: Easily create, edit, and delete events.
2. 🧑‍💼 **Dual Role Support**: Separate flows for agencies and promoters.
3. 📊 **Dashboard**: Key stats and metrics.
4. 🔐 **Secure Authentication**: With JSON Web Tokens (JWT) and role-based access control.
5. 💻 **Responsive Design**: Adapts to any device and resolution.
6. 🌐 **Internationalization**: Multi-language support for a better user experience.

---

## 🛠️ Technologies Used

- **Frontend**: React + Vite
- **Styling**: Tailwind CSS
- **Backend**: Node.js + Express
- **Database**: MongoDB + Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **State Management**: React Context
- **Animations**: Framer Motion
- **Deployment**: Vercel (frontend) + Render (backend)

---

## ⚙️ Installation & Setup

1. **Clone the repository**:

```bash
git clone https://github.com/GigBoardIronhack/GigBoard.git
```

2. **Install dependencies**:

```bash
cd GigBoard
npm install
```

3. **Set up environment variables**:

Create a `.env` file at the root of the frontend and add:

```env
VITE_API_URL=http://localhost:3000
```

4. **Start the development server**:

```bash
npm run dev
```

> The app will be available at `http://localhost:5173`

---

## 👀 Online Demo

Access the deployed version here:  
🔗 [https://gig-board-lz4a.vercel.app](https://gig-board-lz4a.vercel.app)

### Test accounts available:

#### 📌 Agency
- **Email**: `agency@agency.com`  
- **Password**: `aA1.`

#### 📌 Promoter
- **Email**: `promotor@promotor.com`  
- **Password**: `aA1.`

💡 *Feel free to create new profiles, but if you want something quick, you can use the accounts above to explore the demo. The initial load may take up to a minute since the backend is hosted on Render.*

---

## 🤝 Contributions

Would you like to contribute?

1. Fork the project
2. Create a branch (`git checkout -b feature/new-feature`)
3. Make your changes and commit (`git commit -m "New feature"`)
4. Push your changes (`git push origin feature/new-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT** license. See the `LICENSE` file for more details.

---

**Developed with passion by the GigBoardIronhack team.** ✨
