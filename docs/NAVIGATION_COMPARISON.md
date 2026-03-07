# Navigation Design Comparison

## Expected Design (from legacy HTML)

### Logo Specifications:
- **Logo Icon (mountain)**: 69px × 37px
- **Logo Text ("PARVATI'S LAP")**: height 169px (auto width)
- **Logo spacing**: 12px gap (mr-3 = 0.75rem = 12px)

### Layout:
- **Mobile**: Hamburger left, Logo centered, empty right
- **Desktop**: Logo left, Menu center-right, Theme toggle far right
- **Height**: 80px (h-20 = 5rem) on mobile, 160px (2xl:h-40 = 10rem) on 2xl screens

### Navigation Items:
- Font size: text-xs (0.75rem) on desktop, 2xl:text-3xl on large screens
- Color: text-secondary
- Hover: hover:text-forest-green
- Font weight: font-light
- Letter spacing: tracking-wide

### Theme Toggle:
- Icon size: text-lg (1.125rem), 2xl: text-[30px]
- Label size: text-sm (0.875rem), 2xl: text-[30px]
- Background: glass-bg with backdrop blur
- Padding: p-2

### CSS Classes Applied:
```css
.glass-bg { 
    background: rgba(248, 253, 248, 0.95); 
    backdrop-filter: blur(8px); 
    -webkit-backdrop-filter: blur(8px); 
}

.theme-dark .glass-bg { 
    background: rgba(0,0,0,0.95); 
}

.border-theme { 
    border-color: var(--border-color); 
}
```

## Current Next.js Implementation

The SiteHeader component should match exactly. If there are differences, possible causes:

1. **Tailwind v4 Arbitrary Values**: Classes like `h-[169px]` might not be processing correctly
2. **CSS Variables**: Theme variables might not be applied
3. **Image Paths**: `/images/...` should work but might have loading issues
4. **Global CSS**: Glass-bg styles might not be imported properly

## Debug Steps:

1. Inspect the rendered HTML in browser DevTools
2. Check if `h-[169px]` class is being applied and calculated correctly
3. Verify image paths resolve correctly
4. Check if CSS variables are defined
5. Ensure globals.css is imported in layout

## Quick Fix Options:

### Option 1: Use explicit Tailwind classes
Replace `h-[169px]` with a more standard approach or add to Tailwind config

### Option 2: Use inline styles for critical measurements
```tsx
<img 
  src="/images/Parvati's Lap - Luxury Hostel & Villa - logo-text.png"
  alt="PARVATI'S LAP"
  style={{ height: '169px', width: 'auto' }}
  className="[@media(min-width:2560px)]:h-[373px] [@media(min-width:2560px)]:ml-[15px]"
/>
```

### Option 3: Add custom CSS class
In globals.css:
```css
.logo-text {
  height: 169px;
  width: auto;
}

@media (min-width: 2560px) {
  .logo-text {
    height: 373px;
    margin-left: 15px;
  }
}
```

## Testing Checklist:

- [ ] Logo icon renders at 69×37px
- [ ] Logo text renders at 169px height
- [ ] Navigation menu items are text-xs
- [ ] Theme toggle button visible and functional
- [ ] Mobile hamburger menu works
- [ ] Glass background effect visible
- [ ] Responsive breakpoints work (2xl)
- [ ] Theme variables apply correctly







