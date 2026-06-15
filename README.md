# UniMAP Resources Hub

A modern, production-ready academic resource management platform built for Universiti Malaysia Perlis (UniMAP).

The platform enables students and administrators to organize, discover, submit, review, and manage academic resources in a centralized and secure environment.

![Next.js](https://img.shields.io/badge/Next.js-15-black)
![React](https://img.shields.io/badge/React-19-61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![TailwindCSS](https://img.shields.io/badge/Tailwind-CSS-38BDF8)
![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E)
![Vercel](https://img.shields.io/badge/Deploy-Vercel-black)
![Status](https://img.shields.io/badge/Status-Production-success)
![License](https://img.shields.io/badge/License-MIT-yellow)

> **By Students, For Students**

---

## Overview

UniMAP Resources Hub is a web-based platform designed to simplify access to academic resources across different programmes and faculties.

Instead of storing files directly, the platform acts as a centralized directory that connects students to trusted external resources such as:

* Google Drive
* OneDrive
* Box
* Telegram
* University portals
* Official UniMAP websites
* Educational platforms

The system includes a public resource directory, programme-specific resource pages, official university resources, student submissions, and an administrative approval workflow.

---

## Live Demo

Production Website:

https://unimap-resources-hub.vercel.app

---

## Key Features

### Public Resource Discovery

* Instant global search
* Programme-based resource browsing
* Responsive modern UI
* Dark mode support
* Official UniMAP resources section
* Resource ownership and intake tracking

### Student Contributions

Students can submit:

* Academic notes
* Shared drives
* Course resources
* Study materials
* Community resources

All submissions require administrator approval before publication.

### Administrative Dashboard

Administrators can:

* Manage programmes
* Add resources manually
* Edit existing resources
* Delete resources
* Review submissions
* Approve or reject resources
* Manage platform content

### Official Resource Support

Special support for:

* Academic calendars
* Course structures
* Programme information
* Forms and documentation
* Library resources
* University portals

---

## Security Features

The platform includes multiple security layers:

* Input validation using Zod
* URL validation
* Honeypot spam protection
* Rate limiting
* Supabase Row Level Security (RLS)
* Server Actions
* Protected admin routes
* Secure authentication
* HTTP security headers

---

## Technology Stack

### Frontend

* Next.js 15
* React 19
* TypeScript
* Tailwind CSS

### Backend

* Next.js Server Actions
* Supabase Authentication
* PostgreSQL Database
* Supabase Storage

### Deployment

* Vercel
* GitHub

---

## Database Structure

### programmes

Stores academic programmes and faculties.

### resources

Stores approved public resources.

### submissions

Stores pending student submissions.

### profiles

Stores administrator roles and permissions.

### rate_limits

Used for anti-spam and abuse prevention.

---

## Project Architecture

```text
app/
├── admin/
├── programme/
├── submit/
├── actions.ts

components/
├── forms/
├── ui/

lib/
├── supabase/
├── security/
├── data/

supabase/
└── schema.sql
```

---

## Installation

### Prerequisites

* Node.js 22+
* Supabase Project
* Git

### Clone Repository

```bash
git clone https://github.com/amoadel1/unimap-resources-hub.git

cd unimap-resources-hub
```

### Install Dependencies

```bash
npm install
```

### Configure Environment Variables

Create:

```bash
.env.local
```

Add:

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url

NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Database Setup

Run:

```sql
supabase/schema.sql
```

inside your Supabase SQL Editor.

### Start Development Server

```bash
npm run dev
```

Visit:

```text
http://localhost:3000
```

---

## Deployment

### Vercel

1. Connect GitHub repository
2. Import project
3. Add environment variables
4. Deploy

The platform is fully optimized for Vercel deployment.

---

## Documentation

Additional setup guides:

* docs/supabase-setup.md
* docs/vercel-deployment.md
* docs/admin-setup.md

---

## Maintainer

### Adel Husham Mohamedain

Founder & Maintainer

Email:

[adelaljaale@gmail.com](mailto:adelalj3le@gmail.com)

GitHub:

https://github.com/amoadel1

---

## Future Roadmap

* Resource analytics
* User accounts
* Faculty dashboards
* Resource ratings
* Bookmarking system
* Advanced search filters
* AI-powered resource recommendations
* Multi-language interface

---

## License

This project is released under the MIT License.

Feel free to use, modify, and distribute the project in accordance with the license terms.
