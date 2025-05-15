# 📚 Course Publish Platform

Welcome to the Course Publish Platform — a complete solution for publishing courses on YouTube, managing course content, and generating completion certificates. It comes with a robust admin panel to control all aspects of the platform, from user access to course management.

---

## 🚀 Features

- 🔹 🎓 Home, about us, Course & Certificate Pages — Seamless navigation for users to explore courses and generate certificates.
- 🔹 🔐 Authentication — Secure login with NextAuth using credentials or third-party providers.
- 🔹 🛠️ Admin Dashboard — Full control over course content, users, and certificates.
- 🔹 📈 Monitoring & Metrics — Integrated with Prometheus and Grafana for real-time application metrics.
- 🔹 📦 Containerized — Runs in a fully Dockerized environment for consistency and scalability.
- 🔹 ☁️ Image Storage — Integrated with Cloudinary for efficient media management.
- 🔹 🎨 Modern UI — Built with Tailwind CSS and Redux for a smooth frontend experience.

---

## 🧪 Tech Stack

- **Frontend**: React / Next.js / Tailwind CSS
- **Backend**: Node.js / Prisma / PostgreSQL
- **Authentication**: NextAuth
- **Monitoring**: Prometheus + Grafana
- **DevOps**: Docker, Redis
- **Validation**: Zod
- **Media Management**: Clodinary
---

## 📦 Getting Started

### Prerequisites

What the user needs before setup (Node.js, Docker, etc.)

### Installation

1. Clone the repo

```bash
git clone https://github.com/your-username/course-publish-platform.git
cd course-publish-platform
```

2. Install dependencies

```bash
pnpm install
```

3. Set environment variables

```bash
DATABASE_URL=postgresql://user:password@localhost:5432/yourdb
NEXTAUTH_SECRET=your-secret
NEXTAUTH_URL=http://localhost:3000
CLOUDINARY_URL=cloudinary://API_KEY:API_SECRET@CLOUD_NAME
REDIS_URL=redis://localhost:6379
```

4. Run migrations
```bash
npx prisma migrate dev
```

5. Start development server
```bash
pnpm dev
```

6. Visite App
Open http://localhost:3000 in your browser.


## 🤝 Contributing
Contributions are welcome! Feel free to submit issues or pull requests.
