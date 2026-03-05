# 🗄️ Elaborate Database Setup Guide (MySQL + XAMPP)

Follow this guide to enable the **Artifact Nexus** database. This setup uses **XAMPP** for local MySQL hosting and **Prisma** for data synchronization.

---

## ⚡ Quick Start Checklist
1. [ ] Start XAMPP Control Panel.
2. [ ] Enable **MySQL** and **Apache**.
3. [ ] Create a database named `timray_db`.
4. [ ] Run `npx prisma db push`.
5. [ ] (Optional) Run seeding to populate products.

---

## 📖 Step-by-Step Instructions

### Step 1: Initialize XAMPP
Open your **XAMPP Control Panel**. Find the rows for **Apache** and **MySQL**. Click the **Start** button for both.
- **Apache**: Necessary for phpMyAdmin (the visual database manager).
- **MySQL**: The core database engine where all your products and orders are stored.

> [!TIP]
> If MySQL fails to start, ensure no other service (like a local MySQL installation or Skype) is using port **3306**.

---

### Step 2: Create the Database Repository
Once MySQL and Apache are running:
1. Click the **Admin** button next to MySQL, or go to [http://localhost/phpmyadmin/](http://localhost/phpmyadmin/).
2. In the left Sidebar, click **New**.
3. Under "Database name", type: `timray_db`.
4. Click **Create**.

---

### Step 3: Synchronize the Artifact Schema
Now that your database exists, you need to tell your code to build the tables.
Open a terminal in the `frontend` directory and run:

```powershell
npx prisma db push
```

**What this does:**
- Scans your `schema.prisma` file.
- Automatically creates tables for `Users`, `Products`, `Orders`, and `Wishlists` in your `timray_db`.
- No manual SQL coding required!

---

### Step 4: Verify Connection
Check your `.env` file in the root of the project. It should look like this:

```env
DATABASE_URL="mysql://root:@localhost:3306/timray_db"
# root: The default username
# @localhost: No password (default XAMPP state)
# /timray_db: The name of the database you just created
```

---

## 🧪 Populating the Archive (Seeding)
If your database is empty and you want to see the products I've designed, you can use the SQL seed:
1. Open [db_setup.sql](file:///c:/Users/USER/Desktop/project/frontend/db_setup.sql).
2. Copy the contents.
3. In **phpMyAdmin**, click the **SQL** tab at the top.
4. Paste the code and click **Go**.

---

## 🛠️ Troubleshooting
- **Error: Can't reach database server**: Ensure the MySQL icon in XAMPP is GREEN.
- **Error: Access denied for user 'root'**: If you've set a password for your local MySQL, update the DATABASE_URL in `.env` to: `mysql://root:YOUR_PASSWORD@localhost:3306/timray_db`.
- **EPERM: operation not permitted**: This usually happens if the server is running while you try to generate Prisma files. Stop the terminal (`Ctrl+C`) and try again.

---

## 🌑 Offline Mode Support
I have implemented a fail-safe in the code. If your database is offline, the app will display:
> "Offline Mode: Unable to sync with the Archive Nexus."

This allows you to continue working on the UI even when the database server is stopped.
