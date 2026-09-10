# interior-Designer-in-Lahore

## Spaces & Places – Luxury Architecture, Interior Design & Construction Studio

Official web platform and digital portfolio for **Spaces & Places**, a premier luxury architectural and interior design firm based in DHA Phase 6, Lahore, Pakistan.

---

### Tech Stack
- **Frontend**: Vue 3 (Composition API), Vite, Vue Router 4, Tailwind CSS, Lucide Icons
- **Backend**: Node.js, Express.js (REST API, CMS, Serverless Functions)
- **Database**: MongoDB Atlas
- **Styling**: Tailored Dark & Light Luxury Theme, Responsive Mobile Drawer, SEO Structured Data (Schema.org)
- **Deployment**: Vercel Edge Network

---

### Studio Contact Information
- **Studio Address**: 5CCA, 5th Floor, Block C, DHA Phase 6, Lahore, Pakistan
- **Phone**: +92 300 1999967
- **Email**: contact@spacezandplaces.com
- **Website**: https://spacezandplaces.com

---

### Local Development

1. **Install Dependencies**:
   ```bash
   cd client && npm install
   cd ../server && npm install
   ```

2. **Run Backend (Port 5000)**:
   ```bash
   cd server && node server.js
   ```

3. **Run Frontend (Port 5173)**:
   ```bash
   cd client && npm run dev
   ```

---

### Vercel Deployment

Configure the following Environment Variables in your Vercel Project Settings:

| Key | Description |
|---|---|
| `MONGODB_URI` | MongoDB Atlas cluster connection string |
| `PORT` | `5000` |
| `JWT_SECRET` | Secret key for admin session authentication |
| `ADMIN_USER` | Admin username for cPanel dashboard |
| `ADMIN_PASSWORD` | Admin password for cPanel dashboard |

Deployment build runs automatically via `vercel.json`:
- **Build Command**: `cd client && npm install && npm run build`
- **Output Directory**: `client/dist`
- **API Serverless Functions**: Handled via `api/index.js`
