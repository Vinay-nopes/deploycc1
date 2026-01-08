# Deployment Guide

This guide will help you deploy your Smart Campus App.
- **Backend (Node.js/Express)** will be hosted on **Render**.
- **Frontend (React)** will be hosted on **Vercel**.
- **Database (MongoDB)** is already hosted on MongoDB Atlas.

## Prerequisites

1.  **GitHub Account**: You need to push this code to a GitHub repository.
2.  **Render Account**: Sign up at [render.com](https://render.com).
3.  **Vercel Account**: Sign up at [vercel.com](https://vercel.com).
4.  **MongoDB URI**: Have your connection string ready.

## Step 1: Push Code to GitHub

1.  Initialize Git (if not already done):
    ```bash
    git init
    git add .
    git commit -m "Prepared for deployment"
    ```
2.  Create a new repository on GitHub (e.g., `smart-campus-app`).
3.  Link and push:
    ```bash
    git remote add origin https://github.com/YOUR_USERNAME/smart-campus-app.git
    git branch -M main
    git push -u origin main
    ```

## Step 2: Deploy Backend to Render

1.  **New Web Service**:
    - Go to Render Dashboard -> New + -> Web Service.
    - Connect your GitHub repository.
2.  **Configuration**:
    - **Name**: `smart-campus-backend` (or similar).
    - **Root Directory**: `backend` (Important!).
    - **Runtime**: Node.js.
    - **Build Command**: `npm install`
    - **Start Command**: `node server.js`
3.  **Environment Variables**:
    - Add a new variable:
        - Key: `MONGO_URI`
        - Value: `your_mongodb_connection_string` (Full string with password)
    - Add another (optional but good practice):
        - Key: `PORT`
        - Value: `10000` (Render sets this automatically, but good to know).
4.  **Deploy**:
    - Click **Create Web Service**.
    - Wait for it to deploy. Once live, copy the **onrender.com URL** (e.g., `https://smart-campus-backend.onrender.com`).

## Step 3: Deploy Frontend to Vercel

1.  **New Project**:
    - Go to Vercel Dashboard -> Add New... -> Project.
    - Import your GitHub repository.
2.  **Configuration**:
    - **Root Directory**: Click `Edit` and select `frontend`.
    - **Framework Preset**: Vite (should detect automatically).
    - **Build Command**: `npm run build` (default).
    - **Output Directory**: `dist` (default).
3.  **Environment Variables**:
    - Add a new variable:
        - Key: `VITE_API_URL`
        - Value: `https://smart-campus-backend.onrender.com` (The URL from Step 2).
4.  **Deploy**:
    - Click **Deploy**.
    - Wait for construction. Once done, you will get a live URL (e.g., `https://smart-campus-app.vercel.app`).

## Verification

1.  Open your Vercel URL.
2.  Try logging in or using a feature.
3.  If it works, your full stack app is live!

## How to Redeploy

If your deployment fails (e.g., due to the previous "Permission denied" error), you need to trigger a new build.

### Option 1: Vercel Dashboard (Easiest)
1.  Go to your **Vercel Dashboard** -> Click on your Project.
2.  Go to the **Deployments** tab.
3.  Find the failed deployment (top of the list).
4.  Click the **three dots** (...) next to it.
5.  Select **Redeploy**.
6.  Click **Redeploy** again in the confirmation popup.

### Option 2: Push a Change (Git)
Making any new commit and pushing it to GitHub will automatically trigger Vercel to build again.
- You can simply change a readme or add a comment to a file.
- Example command:
  ```bash
  git commit --allow-empty -m "Trigger redeploy"
  git push
  ```

