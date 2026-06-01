# Susanah & Abhinav — RSVP Site Setup Guide

## What you have
- `index.html` — The full wedding RSVP website (coastal watercolor theme)
- `google-apps-script.js` — The backend script that saves RSVPs to Google Sheets
- `vercel.json` — Vercel deployment config

---

## STEP 1 — Set up Google Sheets + Apps Script

### 1a. Create your Google Sheet
1. Go to **sheets.google.com** → click **+ Blank**
2. Name it: `Susanah & Abhinav RSVPs`
3. Copy the Sheet URL from your browser (you'll need this)

### 1b. Open Apps Script
1. In your new Google Sheet, click **Extensions → Apps Script**
2. Delete everything in the default `Code.gs` file
3. Open `google-apps-script.js` (from this folder) and **paste the entire contents** into Code.gs
4. Click the **Save** icon (💾) or press `Ctrl+S`
5. Name the project: `RSVP Handler`

### 1c. Deploy the Apps Script as a Web App
1. Click **Deploy → New deployment**
2. Click the ⚙️ gear icon next to "Select type" → choose **Web app**
3. Set these options:
   - **Description**: `RSVP Handler v1`
   - **Execute as**: `Me`
   - **Who has access**: `Anyone` ← **important!**
4. Click **Deploy**
5. If prompted, click **Authorize access** and sign in with your Google account
6. **Copy the Web App URL** — it looks like:
   `https://script.google.com/macros/s/AKfycb.../exec`

---

## STEP 2 — Connect the website to your Sheet

1. Open `index.html` in any text editor (TextEdit, Notepad, VS Code)
2. Find this line near the bottom:
   ```
   const APPS_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';
   ```
3. Replace `YOUR_GOOGLE_APPS_SCRIPT_URL_HERE` with your Web App URL from Step 1c
4. Save the file

**Example:**
```javascript
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbXXXXXX/exec';
```

---

## STEP 3 — Deploy to Vercel

### Option A: Drag & Drop (Easiest — no account needed)
1. Go to **vercel.com**
2. Sign up / log in (free)
3. Click **Add New → Project**
4. Drag the entire `rsvp-site` folder onto the upload area
5. Click **Deploy**
6. Vercel gives you a URL like `https://rsvp-site-abc.vercel.app` — share this!

### Option B: GitHub (Recommended for updates)
1. Create a free account at **github.com**
2. Click **New repository** → name it `rsvp-site` → click **Create**
3. Upload your files (drag them into the repository page)
4. Go to **vercel.com** → **Add New → Project**
5. Click **Import Git Repository** → connect GitHub → select `rsvp-site`
6. Click **Deploy**
7. Any time you update `index.html` on GitHub, Vercel auto-redeploys ✨

### Option C: Vercel CLI (For developers)
```bash
npm i -g vercel
cd rsvp-site
vercel
```

---

## STEP 4 — (Optional) Custom Domain
If you want `rsvp.susanah-abhinav.com` or similar:
1. In Vercel dashboard → your project → **Settings → Domains**
2. Add your domain and follow DNS instructions

---

## Testing it works

1. Open your Vercel URL
2. Fill in the form and click **Confirm RSVP**
3. Check your Google Sheet — a new row should appear within seconds!

The columns will be:
| Timestamp | Name | Email | Guests | Dietary Notes |

---

## Customising the site

All editable text is near the top of `index.html`:
- **Names**: search for `Susanah` and `Abhinav`
- **Date**: search for `3 October 2026`
- **Location**: search for `Singapore`
- **Max guests**: in the `<select>` block, add/remove `<option>` lines

---

## Need help?
If anything isn't working:
1. Check the Google Sheet — did the **RSVPs** tab appear?
2. Make sure the Apps Script URL is pasted correctly (no extra spaces)
3. Check the Apps Script is deployed with **"Anyone"** access

