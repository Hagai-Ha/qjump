# Qjump

**Skip the wait. Swap your slot.**

Qjump is a web app that helps HMO patients reschedule medical appointments — either **earlier** or **later** — without fighting for a spot. Instead of hunting for a free slot, patients submit a reschedule request and Qjump anonymously matches them with another patient who wants the *opposite* swap. One person wants their appointment sooner, another wants theirs pushed back: everyone wins.

---

## Table of Contents

- [How It Works](#how-it-works)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Project Structure](#project-structure)
- [Data Model](#data-model)
- [Routes](#routes)

---

## How It Works

1. **Log in** with your HMO credentials.
2. **View** your upcoming appointments in one place.
3. **Request** an earlier slot (*precede*) or a later one (*postpone*), choosing the date window that works for you.
4. **Get matched** — Qjump anonymously pairs you with a patient looking for the opposite swap.

---

## Features

- 🔐 **Secure login** backed by Supabase authentication, with protected patient routes.
- 📅 **Appointment dashboard** showing every upcoming appointment for the logged-in patient.
- ⏩ **Precede requests** — ask to move an appointment to an earlier date.
- ⏬ **Postpone requests** — ask to move an appointment to a later date.
- 🗂️ **Request management** — review and cancel your open precede/postpone requests.
- ✅ **Smart date validation** in the request modals so the chosen window is always valid relative to the original appointment.
- 📱 **Responsive UI** built with Mantine, including a collapsible mobile navbar.
- ℹ️ **Informational pages** — How It Works, Clinics, Resources, and Support.

---

## Tech Stack

| Layer | Technology |
| --- | --- |
| Framework | [React 19](https://react.dev/) |
| Build tool | [Vite](https://vite.dev/) |
| UI components | [Mantine](https://mantine.dev/) |
| State management | [MobX](https://mobx.js.org/) + `mobx-react-lite` |
| Routing | [React Router](https://reactrouter.com/) |
| Backend / Auth / DB | [Supabase](https://supabase.com/) |
| Linting | [Oxlint](https://oxc.rs/docs/guide/usage/linter.html) |

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or newer recommended)
- A [Supabase](https://supabase.com/) project (for authentication and data)

### Installation

```bash
# 1. Clone the repository
git clone <repository-url>
cd qjump

# 2. Install dependencies
npm install

# 3. Configure environment variables (see below)
cp .env.example .env

# 4. Start the development server
npm run dev
```

The app will be available at the local URL printed by Vite (typically `http://localhost:5173`).

### Environment Variables

Qjump connects to Supabase using two environment variables. Copy `.env.example` to `.env` and fill in the values from your Supabase project settings:

```env
VITE_SUPABASE_URL=your-supabase-project-url
VITE_SUPABASE_PUBLISHABLE_KEY=your-supabase-publishable-key
```

> These must be prefixed with `VITE_` so Vite exposes them to the client at build time.

---

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server with hot reloading. |
| `npm run build` | Build the app for production into `dist/`. |
| `npm run preview` | Preview the production build locally. |
| `npm run lint` | Run Oxlint across the project. |

---

## Project Structure

```
qjump/
├── public/                  # Static assets
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── AppointmentCard  # A single appointment with reschedule actions
│   │   ├── RequestCard      # A single open precede/postpone request
│   │   ├── PostponeModal    # Form + validation for postpone requests
│   │   ├── PrecedeModal     # Form + validation for precede requests
│   │   ├── LoginForm        # HMO login form
│   │   ├── Navbar / Footer  # App chrome
│   │   ├── Layout           # Shared page layout (navbar + outlet + footer)
│   │   └── ProtectedRoute   # Redirects unauthenticated users
│   ├── pages/               # Route-level views
│   │   ├── HomePage         # Landing page + login
│   │   ├── PatientPage      # Patient's appointment dashboard
│   │   ├── RequestsPage     # Patient's open reschedule requests
│   │   ├── HowItWorks       # Explainer page
│   │   ├── Clinics          # Affiliated clinics
│   │   ├── Resources        # Helpful resources
│   │   ├── Support          # Support / contact
│   │   └── NotFound         # 404 fallback
│   ├── stores/              # MobX state stores
│   │   ├── AuthStore              # Authentication + session state
│   │   ├── AppointmentStore       # Appointments + request submission
│   │   ├── PostponeRequestsStore  # Postpone request list + deletion
│   │   └── PrecedeRequestsStore   # Precede request list + deletion
│   ├── data/                # Supabase client + synthetic dataset (see data/README.md)
│   ├── App.jsx              # App shell + route definitions
│   └── main.jsx             # Entry point
├── .env.example             # Template for environment variables
├── index.html               # HTML entry point
└── vite.config.js           # Vite configuration
```

For details on the sample dataset used during development, see [`src/data/README.md`](src/data/README.md).

---

## Data Model

Qjump reads and writes the following Supabase tables:

| Table | Purpose |
| --- | --- |
| `patients` | Patient profiles, keyed by `patient_id` and linked to an auth `user_id`. |
| `appointments` | Scheduled appointments per patient (date, time, location). |
| `postpone_requests` | Requests to move an appointment to a later date window. |
| `precede_requests` | Requests to move an appointment to an earlier date window. |

Each reschedule request stores the original `appointment_id` along with the patient's desired `start_date` and `end_date` window and the appointment `location`.

---

## Routes

| Path | View | Access |
| --- | --- | --- |
| `/` | Home page + login | Public |
| `/patient/:patientId` | Appointment dashboard | Protected |
| `/patient/:patientId/requests` | Reschedule requests | Protected |
| `/how-it-works` | How It Works | Public |
| `/clinics` | Clinics | Public |
| `/resources` | Resources | Public |
| `/support` | Support | Public |
| `*` | Not Found (404) | Public |

---

<p align="center">Qjump © 2026 — All rights reserved.</p>
