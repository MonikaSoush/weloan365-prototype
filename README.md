# WeLoan365 Mobile Prototype

A mobile-first React prototype for client demos — works on real iOS & Android devices.

## Stack

| | |
|---|---|
| Framework | React 18 + TypeScript |
| UI Library | MUI v5 (WeLoan365 tokens) |
| Router | React Router v6 |
| Build | Vite (fast HMR) |
| Deploy | Vercel (SPA ready) |

---

## Quick Start

```bash
npm install
npm run dev
```

The terminal shows two URLs:
```
  ➜  Local:   http://localhost:5173/
  ➜  Network: http://192.168.x.x:5173/   ← Share this with your phone
```

### Test on a real device (same WiFi)

1. Run `npm run dev`
2. Copy the **Network URL** from the terminal
3. On the **desktop** app, paste it into the QR panel (right side of the phone frame)
4. **Scan the QR code** on your iOS or Android phone
5. The prototype opens in the mobile browser — add it to your Home Screen for a native feel

> **iOS tip:** Safari → Share → "Add to Home Screen" → full-screen app experience  
> **Android tip:** Chrome → Menu → "Add to Home Screen" → installs as a PWA

---

## Deploy for Client Sharing (Vercel)

```bash
# Install Vercel CLI once
npm i -g vercel

# Deploy (1 command)
vercel --prod
```

Or connect your GitHub repo at **vercel.com** for auto-deploys on every push.

---

## Adding New Screens

### 1 — Copy the template
```bash
cp src/screens/_ScreenTemplate.tsx src/screens/YourScreen.tsx
```

### 2 — Edit the screen
Open `YourScreen.tsx` and replace the content with your design.

### 3 — Register in the router
Open `src/router/AppRouter.tsx` and add:

```tsx
// Import
const YourScreen = lazy(() => import('../screens/YourScreen'))

// Route
<Route path="/your-path" element={<YourScreen />} />
```

### 4 — Navigate to it
From any screen:
```tsx
const navigate = useNavigate()
navigate('/your-path')
```

---

## Project Structure

```
weloan365-prototype/
├── src/
│   ├── screens/
│   │   ├── _ScreenTemplate.tsx   ← Copy this for new screens
│   │   ├── SplashScreen.tsx
│   │   ├── WelcomeScreen.tsx
│   │   └── HomeScreen.tsx
│   ├── components/
│   │   ├── MobileShell.tsx       ← Phone frame (desktop) / full screen (mobile)
│   │   ├── AppHeader.tsx         ← Top nav bar with back button
│   │   └── DevBanner.tsx         ← Dev-only QR code panel
│   ├── router/
│   │   └── AppRouter.tsx         ← Add new routes here
│   ├── theme/
│   │   └── theme.ts              ← MUI v5 + WeLoan365 design tokens
│   ├── App.tsx
│   ├── main.tsx
│   └── main.css                  ← Mobile reset + safe area + animations
├── index.html                    ← Viewport meta, PWA meta, Google Fonts
├── vite.config.ts                ← host:true for LAN access
├── vercel.json                   ← SPA rewrite rule
└── README.md
```

---

## Design Tokens

| Token | Value | Use |
|---|---|---|
| Primary | `#0052CC` | Buttons, links, highlights |
| Primary surface | `#E8F0FE` | Card backgrounds, chips |
| Heading | `#0B0F1A` | H1, H2, H3 |
| Text primary | `#1A1A1A` | Body text |
| Text secondary | `#666666` | Labels, descriptions |
| Text disabled | `#999999` | Placeholder, hints |
| Background | `#F2F5F8` | Page background |
| Surface | `#FFFFFF` | Cards, sheets |
| Border | `#E0E0E0` | Dividers, card borders |
| Button height | `48px` | Standard; large = 52px |
| Border radius | `8px` | Cards, inputs, buttons |
| Spacing grid | `4px` | MUI spacing unit |

---

## Responsive Behavior

| Viewport | Behavior |
|---|---|
| Mobile (`< 768px`) | Full-screen app, no frame |
| Desktop (`≥ 768px`) | iPhone 14 Pro frame (390×844) on dark studio background |

---

## Screen Animation Classes

Add these classNames to your screen root `<Box>`:

| Class | Effect |
|---|---|
| `screen-enter` | Fade in + slide up (default) |
| `screen-slide-in` | Slide in from right |
| `scroll-content` | iOS momentum scroll |
