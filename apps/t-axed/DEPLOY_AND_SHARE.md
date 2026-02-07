---
description: Complete Guide: Local -> GitHub -> Vercel -> Users
---

# 🚀 How to Launch T-Axed to the World

This guide covers how to move your code from your laptop to GitHub, deploy it on Vercel, and share it with users.

## Phase 1: Local to GitHub

_Prerequisite: You must have [Git installed](https://git-scm.com/downloads) on your computer._

1.  **Initialize Git (if not done):**
    Open your terminal in the project folder and run:

    ```bash
    git init
    git add .
    git commit -m "Initial launch of T-Axed Green Theme"
    ```

2.  **Create a Repo on GitHub:**
    - Go to [github.com/new](https://github.com/new).
    - Name it `t-axed-pwa`.
    - Make it **Public** (easier for Vercel free tier) or **Private**.
    - Click **Create repository**.

3.  **Link and Push:**
    - Copy the commands GitHub shows you under "…or push an existing repository from the command line". They look like this:
    ```bash
    git remote add origin https://github.com/YOUR_USERNAME/t-axed-pwa.git
    git branch -M main
    git push -u origin main
    ```

    - Run them in your terminal. Your code is now safely in the cloud!

---

## Phase 2: GitHub to Vercel

_This connects your code to a live server._

1.  Go to [vercel.com](https://vercel.com) and **Sign Up/Login with GitHub**.
2.  On your dashboard, click **"Add New..."** -> **"Project"**.
3.  You will see your `t-axed-pwa` repository listed. Click **Import**.
4.  **Configure Project:**
    - **Framework Preset:** It should auto-detect "Vite".
    - **Root Directory:** Leave as `./`.
    - **Environment Variables:** None needed for now.
5.  Click **Deploy**.
6.  Wait ~1 minute. Vercel will build your app and give you a link (e.g., `https://t-axed-pwa.vercel.app`).

---

## Phase 3: sharing with Users

_How to get it on their phones._

1.  **Copy your Vercel URL** (e.g., `t-axed.vercel.app`).
2.  **Send it via WhatsApp/Email** to your users.
3.  **The "App" Experience (PWA):**
    Tell your users to do this one-time setup:
    - **iPhone:** Open link in Safari -> Tap "Share" icon -> Tap **"Add to Home Screen"**.
    - **Android:** Open link in Chrome -> Tap "Menu" (3 dots) -> Tap **"Install App"** or **"Add to Home Screen"**.

This installs T-Axed as a standalone app on their phone. It will work offline, clutter-free, and look exactly like the version you tested!
