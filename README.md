# Rekapo Admin

> Web-based admin panel for monitoring and managing the Rekapo meeting summarizer platform.

Rekapo Admin is a React SPA that connects to the [Rekapo API](https://rekapo-api.ildf.site) and gives administrators full visibility into users, sessions, system statistics, and logs.

---

## Features

- 📊 **Dashboard** — overview charts (bar, line, pie) with the latest system statistics
- 👥 **User Management** — search, filter, enable/disable accounts, promote/demote admins
- 📈 **User Analytics** — per-user aggregated metrics with time-period filters
- 📋 **Session Management** — browse, search, filter, and delete meeting sessions
- 🔍 **Session Details** — view training data and consent status for individual sessions
- 🖥️ **System Statistics** — paginated statistics table with delete actions
- 📜 **Admin Logs** — real-time log console with level filters, error tracking, and user log search
- 🔐 **Google OAuth** — admin authentication via Google sign-in

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + Vite |
| UI | MUI (Material UI v7) |
| Charts | Recharts |
| Routing | React Router v7 |
| HTTP | Axios |
| Deployment | Vercel |

---

## Project Structure

```
Rekapo_admin/
├── src/
│   ├── pages/
│   │   ├── AdminInterface.jsx     # Dashboard with charts and overview stats
│   │   ├── AdminLogs.jsx          # Log monitoring console
│   │   ├── SystemStatistics.jsx   # System statistics table
│   │   ├── UserManagement.jsx     # User directory and management
│   │   ├── UserAnalytics.jsx      # Aggregated user analytics
│   │   ├── SessionManagement.jsx  # Sessions list with filters
│   │   ├── SessionDetails.jsx     # Individual session detail view
│   │   ├── Login.jsx              # Admin login (Google OAuth)
│   │   └── AuthCallback.jsx       # OAuth callback handler
│   ├── services/
│   │   ├── authService.js         # Auth API calls
│   │   ├── userService.js         # User management API calls
│   │   ├── sessionService.js      # Session API calls
│   │   ├── statisticsService.js   # Statistics API calls
│   │   └── logsService.js         # Logs API calls
│   ├── contexts/
│   │   ├── AuthContext.jsx        # Auth state provider
│   │   └── AdminContext.js        # Admin data provider
│   ├── hooks/
│   │   ├── useAuth.js             # Auth hook
│   │   └── useAdmin.js            # Admin context hook
│   └── components/
│       ├── AdminProvider.jsx       # Top-level provider wrapper
│       └── ProtectedRoute.jsx      # Route guard for authenticated pages
├── vercel.json                     # Vercel deployment config
└── .env.example                    # Environment variable template
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- A running instance of the [Rekapo API](https://github.com/your-username/Rekapo)

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

```bash
cp .env.example .env
```

```env
VITE_API_BASE_URL=https://rekapo-api.ildf.site
```

### 3. Run the dev server

```bash
npm run dev
```

### 4. Build for production

```bash
npm run build
```

The built output is in `dist/` and is ready to deploy to Vercel or any static host.

---

## Pages & API Reference

See [PAGES.md](PAGES.md) for a full breakdown of each page and the API endpoints it calls.

---

## License

This project is licensed under the [MIT License](../Rekapo/LICENSE).
