# Screen Resolution Debug Tool

## 🔍 What This Does

Displays a **fixed overlay** in the **bottom-right corner** showing:
- Current screen width (in pixels)
- Current screen height (in pixels)  
- Active breakpoint (xs, sm, md, lg, xl, 2xl, 3xl)
- Full resolution (e.g., 1920x1080)

## 📦 How It's Added

The debug component is imported in `ClientLayout.tsx`:

```tsx
import { ScreenResolutionDebug } from "@/components/debug/ScreenResolutionDebug";

// Inside JSX:
<ScreenResolutionDebug />
```

## ✅ Usage

1. **Run dev server**:
   ```bash
   npm run dev
   ```

2. **Open browser**: Navigate to http://localhost:3000

3. **See the overlay**: Look at the bottom-right corner

4. **Resize browser**: The values update in real-time

## 🎯 Breakpoint Reference

| Breakpoint | Width Range | Typical Device |
|------------|-------------|----------------|
| **xs** | < 640px | Small phones |
| **sm** | 640px - 768px | Large phones |
| **md** | 768px - 1024px | Tablets |
| **lg** | 1024px - 1280px | Small laptops |
| **xl** | 1280px - 1536px | Laptops |
| **2xl** | 1536px - 2560px | Desktops |
| **3xl** | ≥ 2560px | Ultra-wide/4K |

## 🗑️ How to Remove (3 Easy Steps)

### Option 1: Comment Out (Easiest)

In `src/components/layout/ClientLayout.tsx`:

```tsx
{/* ==========================================
    🔴 DEBUG TOOL - SCREEN RESOLUTION DISPLAY
    Remove this line before production deployment
    ========================================== */}
{/* <ScreenResolutionDebug /> */}  ← Add comment slashes
```

### Option 2: Delete the Line

In `src/components/layout/ClientLayout.tsx`, delete this line:
```tsx
<ScreenResolutionDebug />
```

### Option 3: Delete the Import

In `src/components/layout/ClientLayout.tsx`, delete:
```tsx
import { ScreenResolutionDebug } from "@/components/debug/ScreenResolutionDebug"; // 🔴 DEBUG
```

AND delete the component:
```tsx
<ScreenResolutionDebug />
```

## 🚨 IMPORTANT - Before Production

**⚠️ REMOVE THIS DEBUG TOOL BEFORE DEPLOYING TO PRODUCTION**

It's marked with 🔴 emojis in the code for easy identification.

## 🎨 Styling

The debug overlay:
- Position: Fixed bottom-right
- Z-index: 99998 (below page loader)
- Pointer-events: none (doesn't block clicks)
- Dark theme with neon green accent
- Always visible regardless of theme

## 📱 Mobile Friendly

The overlay is responsive and works on all screen sizes, but you may want to:
- Hide it on mobile devices
- Position it differently for small screens

To hide on mobile, wrap it in:
```tsx
<div className="hidden md:block">
  <ScreenResolutionDebug />
</div>
```

## 🔧 Customization

Edit `src/components/debug/ScreenResolutionDebug.tsx` to:
- Change position (top/bottom, left/right)
- Modify colors
- Add more debug info (device pixel ratio, orientation, etc.)
- Change breakpoint definitions

## Example Output

```
🔍 SCREEN DEBUG
Width: 1920px
Height: 1080px
Breakpoint: 2xl (1536px - 2560px)
1920x1080
```

## Quick Remove Checklist

Before deploying to production:
- [ ] Remove or comment out `<ScreenResolutionDebug />` in `ClientLayout.tsx`
- [ ] Remove import statement (optional, but clean)
- [ ] Test build: `npm run build`
- [ ] Verify no debug overlay appears
- [ ] Deploy! 🚀

