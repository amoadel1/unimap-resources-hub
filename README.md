# UniMAP Resources Hub

**By Students, For Students**

Production-ready Next.js platform for organizing UniMAP academic resources. The website does **not** host files. It links to external resources such as Google Drive, OneDrive, Box, Telegram, websites, and other educational links.

## Owner

- Owner: ADEL HUSHAM MOHAMEDAIN
- Arabic Name: عادل هشام محمدين
- Role: Founder & Maintainer
- Email: adelalj3le@gmail.com

## Tech Stack

- Next.js 15
- TypeScript
- Tailwind CSS
- Supabase Auth, Postgres, and RLS
- Vercel-ready deployment
- Dark mode
- Arabic and English support

## Features

- Premium responsive public homepage
- Global instant search by programme, owner, intake, platform, and notes
- Dynamic programme pages
- Official UniMAP resources section
- Student resource submission form
- Pending approval queue
- Secure admin dashboard
- Add/edit/delete programmes
- Add/edit/delete resources
- Approve/reject submissions
- Database-driven content management
- Secure headers, input validation, URL validation, honeypot spam protection, and rate limiting

## Local Setup

1. Install Node.js 22+.
2. Install dependencies:

```bash
npm install
```

3. Copy the environment template:

```bash
cp .env.example .env.local
```

4. Add Supabase values to `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

5. Run the database SQL in `supabase/schema.sql`.
6. Start the app:

```bash
npm run dev
```

Open `http://localhost:3000`.

## Documentation

- Supabase setup: `docs/supabase-setup.md`
- Vercel deployment: `docs/vercel-deployment.md`
- Admin setup: `docs/admin-setup.md`

## Important Security Notes

- Never expose `SUPABASE_SERVICE_ROLE_KEY` in browser code.
- Keep RLS enabled on all public tables.
- Only promote trusted users to admin in `profiles`.
- All user submissions stay pending until admin approval.
