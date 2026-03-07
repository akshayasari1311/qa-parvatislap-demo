# JavaScript to React Hooks Conversion

This document maps the inline JavaScript functions from `new_index.html` to their corresponding React hooks.

## Overview

All inline JavaScript has been converted to reusable React hooks for better maintainability, testability, and React best practices.

## Conversion Map

### 1. **Rain Animation** ☔
**Original:** `createRainDrops()` (lines 45-59)  
**Hook:** `useRain(containerId, dropCount)`  
**Location:** `src/hooks/useRain.ts`  
**Usage:**
```tsx
import { useRain } from '@/hooks/useRain';

function Hero() {
  useRain("rainOverlay", 40);
  return <div id="rainOverlay">...</div>;
}
```

---

### 2. **Theme Toggle** 🌙☀️
**Original:** `initThemeToggle()` (lines 62-103)  
**Hook:** `useTheme()` via `ThemeContext`  
**Location:** `src/contexts/ThemeContext.tsx`  
**Usage:**
```tsx
import { useTheme } from '@/contexts/ThemeContext';

function Header() {
  const { theme, toggleTheme } = useTheme();
  return <button onClick={toggleTheme}>{theme}</button>;
}
```

---

### 3. **Mobile Menu** 📱
**Original:** `initMobileMenu()` (lines 106-138)  
**Hook:** `useMobileMenu()`  
**Location:** `src/hooks/useMobileMenu.ts`  
**Usage:**
```tsx
import { useMobileMenu } from '@/hooks/useMobileMenu';

function Navigation() {
  const { isOpen, openMenu, closeMenu, toggleMenu } = useMobileMenu();
  return (
    <>
      <button onClick={openMenu}>Menu</button>
      {isOpen && <MobileDrawer onClose={closeMenu} />}
    </>
  );
}
```

---

### 4. **Gallery Auto-Scroll** 🎠
**Original:** `initGalleryNavigation()` (lines 141-215)  
**Hook:** `useAutoScrollGallery(scrollSpeed, itemWidth)`  
**Location:** `src/hooks/useAutoScrollGallery.ts`  
**Features:**
- Continuous auto-scroll animation
- Clones items for seamless infinite loop
- Manual navigation with prev/next buttons
- Pause on hover
- Auto-resume after manual interaction

**Usage:**
```tsx
import { useAutoScrollGallery } from '@/hooks/useAutoScrollGallery';

function Gallery() {
  const { containerRef, trackRef, navigatePrev, navigateNext } = useAutoScrollGallery(0.6, 424);
  
  return (
    <div ref={containerRef} className="gallery-container">
      <button onClick={navigatePrev}>←</button>
      <div ref={trackRef} className="gallery-track">
        {/* Gallery items */}
      </div>
      <button onClick={navigateNext}>→</button>
    </div>
  );
}
```

---

### 5. **Image Modal & Carousel** 🖼️
**Original:** `initImageModal()` (lines 253-380)  
**Hooks:** `useImageModal()` + `useCarousel(images, autoScrollDelay)`  
**Location:** 
- `src/hooks/useImageModal.ts`
- `src/hooks/useCarousel.ts`

**Features:**
- Single image modal
- Multi-image carousel with auto-scroll
- Keyboard navigation (Arrow keys, Escape)
- Manual navigation with prev/next
- Auto-resume after manual interaction

**Usage:**
```tsx
import { useImageModal } from '@/hooks/useImageModal';
import { useCarousel } from '@/hooks/useCarousel';

function Gallery() {
  const { isOpen, images, mode, openSingleImage, openCarousel, closeModal } = useImageModal();
  const carousel = useCarousel(images, 2500);
  
  return (
    <>
      <img onClick={() => openSingleImage("/image.jpg")} />
      <div onClick={() => openCarousel(["/img1.jpg", "/img2.jpg"])}>Gallery</div>
      
      {isOpen && mode === 'carousel' && (
        <Modal onClose={closeModal}>
          <button onClick={carousel.handlePrev}>←</button>
          <img src={images[carousel.currentSlide]} />
          <button onClick={carousel.handleNext}>→</button>
        </Modal>
      )}
    </>
  );
}
```

---

### 6. **Booking Widget** 🏔️
**Original:** `initBookingWidget()` (lines 383-414)  
**Hook:** `useBookingWidget(initialCollapsed)`  
**Location:** `src/hooks/useBookingWidget.ts`  
**Usage:**
```tsx
import { useBookingWidget } from '@/hooks/useBookingWidget';

function BookingWidget() {
  const { isCollapsed, toggle, expand, collapse } = useBookingWidget(true);
  
  return (
    <div className={isCollapsed ? 'collapsed' : 'expanded'}>
      <button onClick={toggle}>Toggle</button>
      {!isCollapsed && <BookingForm />}
    </div>
  );
}
```

---

### 7. **WhatsApp Contact** 💬
**Original:** `initWhatsAppContact()` (lines 417-430)  
**Hook:** `useWhatsApp(phoneNumber)`  
**Location:** `src/hooks/useWhatsApp.ts`  
**Usage:**
```tsx
import { useWhatsApp } from '@/hooks/useWhatsApp';

function ContactForm() {
  const { sendMessage, sendFromForm } = useWhatsApp("919082229363");
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    sendFromForm(formData);
  };
  
  return <form onSubmit={handleSubmit}>...</form>;
}
```

---

## Benefits of Hook-Based Approach

### ✅ **Reusability**
- Hooks can be used in multiple components without code duplication
- Easy to share functionality across different parts of the app

### ✅ **Testability**
- Hooks can be tested in isolation
- Mock dependencies easily for unit tests

### ✅ **Maintainability**
- Centralized logic in dedicated files
- Clear separation of concerns
- Easier to debug and update

### ✅ **Type Safety**
- Full TypeScript support
- Autocomplete and IntelliSense in IDE
- Catch errors at compile time

### ✅ **React Best Practices**
- Follows React's Hooks pattern
- Proper cleanup with useEffect return functions
- No direct DOM manipulation in components

### ✅ **Performance**
- Memoized callbacks with useCallback
- Proper dependency arrays
- Efficient cleanup on unmount

---

## Migration Notes

### Original JavaScript Pattern:
```javascript
document.addEventListener('DOMContentLoaded', function() {
    createRainDrops();
    initThemeToggle();
    initMobileMenu();
    initGalleryNavigation();
    initImageModal();
    initBookingWidget();
    initWhatsAppContact();
});
```

### New React Hooks Pattern:
```tsx
function App() {
  return (
    <ThemeProvider>
      <Hero />              {/* Uses useRain() */}
      <Navigation />        {/* Uses useMobileMenu() */}
      <Gallery />           {/* Uses useAutoScrollGallery() */}
      <Modal />            {/* Uses useImageModal() + useCarousel() */}
      <BookingWidget />    {/* Uses useBookingWidget() */}
      <Contact />          {/* Uses useWhatsApp() */}
    </ThemeProvider>
  );
}
```

---

## Future Enhancements

1. **Add Unit Tests** - Test each hook in isolation
2. **Add Storybook** - Document and demo each hook
3. **Performance Monitoring** - Track animation frame rates
4. **Accessibility** - Add ARIA attributes and keyboard shortcuts
5. **Mobile Optimization** - Touch gesture support for galleries

---

## Import Convenience

All hooks can be imported from the index file:

```tsx
import {
  useRain,
  useMobileMenu,
  useAutoScrollGallery,
  useCarousel,
  useBookingWidget,
  useImageModal,
  useWhatsApp
} from '@/hooks';
```







