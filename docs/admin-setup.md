# Admin Account Setup

## 1. Create Admin User

In Supabase:

1. Go to Authentication.
2. Create a user with the admin email.
3. Set a strong password.

Recommended admin email:

```text
adelalj3le@gmail.com
```

## 2. Promote User to Admin

Copy the user's ID from Supabase Authentication, then run:

```sql
update public.profiles
set is_admin = true,
    full_name = 'ADEL HUSHAM MOHAMEDAIN'
where id = 'YOUR_AUTH_USER_ID';
```

## 3. Sign In

Open:

```text
/admin/login
```

Then sign in with the admin email and password.

## 4. Manage Content

From `/admin`, you can:

- Add programmes
- Edit programmes
- Delete programmes
- Add resources
- Edit resources
- Delete resources
- Add official UniMAP resources
- Approve pending submissions
- Reject pending submissions
- View statistics

Adding a new programme automatically creates a public page:

```text
/programmes/your-programme-slug
```

No code edits are required for normal content management.
