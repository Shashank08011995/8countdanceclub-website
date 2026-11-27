# 8count Dance Club website

Static website for 8count Dance Club, now at RR Stay & Cafe, Balaknath Mandir Road, Upper Tapovan, Rishikesh.

- `index.html`, `styles.css`, `script.js`: the whole site (no build step)
- `assets/img`: photos and logo
- `assets/video`: short muted loops cut from performance videos
- `assets/fonts`: self-hosted Unbounded and Manrope fonts

## Edit
- Contact number for WhatsApp bookings: `WHATSAPP` at the top of `script.js`
- Retreat plan, inclusions and copy: the `#retreat` section in `index.html`

## Run locally
```
python -m http.server 8088
```
then open http://localhost:8088

## Deploy
Import this repository in Vercel (Framework preset: Other, no build command, output directory: `.`). Every push to `main` redeploys.
