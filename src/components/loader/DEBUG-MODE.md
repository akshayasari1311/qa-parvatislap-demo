# PageLoader Debug Mode

## Quick Toggle

**File**: `src/components/loader/PageLoader.tsx`

**Line 18**:
```typescript
const DEBUG_MODE = false; // Change to true for debugging
```

---

## 🔴 Enable Debug Mode (Keep Loader Visible)

### Step 1: Edit the File
Open `src/components/loader/PageLoader.tsx`

### Step 2: Change Line 18
```typescript
// BEFORE
const DEBUG_MODE = false;

// AFTER
const DEBUG_MODE = true;  // ✅ Loader stays visible
```

### Step 3: Save & Refresh
- Save the file
- Loader will now stay visible permanently
- You'll see **"🔴 DEBUG MODE ACTIVE"** banner in top-right corner

---

## ✅ Disable Debug Mode (Normal Behavior)

### Step 1: Edit the File
Open `src/components/loader/PageLoader.tsx`

### Step 2: Change Line 18
```typescript
// BEFORE
const DEBUG_MODE = true;

// AFTER
const DEBUG_MODE = false;  // ✅ Auto-hide enabled
```

### Step 3: Save & Refresh
- Save the file
- Loader will auto-hide after page loads (500ms delay)

---

## What Happens in Debug Mode

### Visual Indicators:
✅ **Loader stays visible** - Never fades out  
✅ **Red banner** - "🔴 DEBUG MODE ACTIVE" in top-right  
✅ **Console message** - "🔴 DEBUG MODE: PageLoader will stay visible"

### Behavior:
- Page loads normally underneath
- Loader overlays everything (z-index: 99999)
- Click events are tracked in console
- Theme toggle still works (dark/light)
- Animations continue (spinner, dots)

---

## Use Cases

### 1. Test Loader Design
```typescript
const DEBUG_MODE = true;
```
- Test both light and dark themes
- Check responsiveness across screen sizes
- Verify animations work smoothly
- Test on mobile devices (1080x2340, etc.)

### 2. Test Timing
```typescript
const DEBUG_MODE = false;
// Adjust timeout on line 40
setTimeout(() => {
  setIsLoading(false);
}, 2000); // Change from 500ms to 2000ms
```

### 3. Screenshot/Recording
```typescript
const DEBUG_MODE = true;
```
- Capture loader for documentation
- Record video of loading animation
- Show client different loader states

---

## Visual Examples

### Debug Mode ON:
```
┌─────────────────────────────────────┐
│  🔴 DEBUG MODE ACTIVE    [top-right]│
│                                     │
│         [Logo: Parvati's Lap]       │
│                                     │
│      PARVATI'S LAP                  │
│   Loading your Himalayan experience │
│                                     │
│           [Spinner]                 │
│                                     │
│          • • •  [dots]              │
│                                     │
└─────────────────────────────────────┘
Loader STAYS visible permanently
Console: "🔴 DEBUG MODE: PageLoader will stay visible"
```

### Debug Mode OFF (Normal):
```
Page loads → Loader shows → Fades out after 500ms → Gone ✅
```

---

## Browser Console Messages

### When Debug Mode is ON:
```
🔴 DEBUG MODE: PageLoader will stay visible
🔴 DEBUG MODE: Click detected, but loader stays visible. Set DEBUG_MODE = false to enable auto-hide.
```

### When Debug Mode is OFF:
```
(No debug messages, normal behavior)
```

---

## Testing Checklist

With `DEBUG_MODE = true`:

- [ ] Loader is visible on page load
- [ ] Red "DEBUG MODE ACTIVE" banner shows in top-right
- [ ] Console shows debug message
- [ ] Logo displays correctly
- [ ] "PARVATI'S LAP" text is readable
- [ ] Spinner animates smoothly
- [ ] Three dots bounce
- [ ] Theme toggle changes colors (test dark/light)
- [ ] Responsive on mobile (1080x2340)
- [ ] Responsive on desktop (1920x1080)
- [ ] Click events logged in console

---

## Important Warnings

### ⚠️ Before Production Deployment

**MUST SET TO FALSE**:
```typescript
const DEBUG_MODE = false; // ⚠️ REQUIRED FOR PRODUCTION
```

### Why?
- Users will see permanent loader screen
- Website will be unusable
- Content hidden behind loader
- Looks like site is broken

### Pre-Deploy Checklist:
- [ ] Set `DEBUG_MODE = false` in `PageLoader.tsx`
- [ ] Test that loader auto-hides
- [ ] Remove any console.log statements
- [ ] Build and test: `npm run build`
- [ ] Verify in production preview

---

## Quick Reference

| Setting | Behavior | Use Case |
|---------|----------|----------|
| `DEBUG_MODE = true` | Loader always visible | Testing design, screenshots |
| `DEBUG_MODE = false` | Auto-hide after 500ms | Normal use, production |

---

## Troubleshooting

### Loader Won't Hide
**Problem**: Loader stays visible even with `DEBUG_MODE = false`

**Solutions**:
1. Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
2. Clear cache and reload
3. Check browser console for errors
4. Restart dev server: `npm run dev`

### Can't See Debug Banner
**Problem**: Set `DEBUG_MODE = true` but no red banner

**Solutions**:
1. Check line 18 is saved correctly
2. Verify file saved (check modification timestamp)
3. Refresh browser
4. Check z-index conflicts (banner uses z-index: 100000)

### Loader Looks Different
**Problem**: Colors/animations not matching

**Solutions**:
1. Toggle theme (light/dark) to test both
2. Check browser zoom level (should be 100%)
3. Verify image exists: `/public/images/Parvati's Lap - Luxury Hostel & Villa - logo-updated.png`
4. Clear browser cache

---

## Code Location Reference

| Line | What It Does |
|------|-------------|
| 18 | `const DEBUG_MODE = false` - Main toggle |
| 28-31 | Skip auto-hide logic when debug ON |
| 54 | Prevent component unmount in debug mode |
| 71-87 | Red debug banner display |
| 159-178 | Full instructions (bottom of file) |

---

## Related Files

- `src/components/loader/PageLoader.tsx` - Main component
- `src/components/layout/ClientLayout.tsx` - Where PageLoader is used
- `src/contexts/ThemeContext.tsx` - Theme (light/dark) management

---

## Quick Commands

```bash
# Start dev server
npm run dev

# Test production build
npm run build
npm start

# Open file in VS Code
code src/components/loader/PageLoader.tsx
```

---

## Example Workflow

### Testing Loader Design:
```typescript
1. Set: const DEBUG_MODE = true
2. Save file
3. Open: http://localhost:3000
4. Test theme toggle (light/dark)
5. Test on different screen sizes
6. Take screenshots
7. Set: const DEBUG_MODE = false
8. Save and verify auto-hide works
```

---

**Last Updated**: Added debug mode with visual indicators and console logging  
**File Version**: PageLoader.tsx with DEBUG_MODE toggle  
**Status**: ✅ Ready for use

