# Circles App Theming System

This document explains the theming system used in the Circles application.

## Overview

The app supports light and dark modes with proper handling of form elements and other UI components.

## Implementation

### Core Components

- **NextThemeProvider**: Wraps the application and provides theme context (light/dark mode)
- **ThemeToggle**: UI component to toggle between light and dark modes

### CSS Variables

Theme colors are defined as CSS variables in `globals.css`:
- Base colors (light and dark blues, greens, etc.)
- Theme semantic colors (background, foreground, primary, etc.)
- Form element colors (input background, text, border, etc.)

### Usage in Components

#### For regular elements

```jsx
// Using theme colors with Tailwind classes
<div className="bg-background text-foreground">
  <h1 className="text-primary">Hello World</h1>
</div>
```

#### For Form Elements

Form elements have special handling to ensure they work well in both light and dark modes:

```jsx
// For inputs
<input 
  type="text"
  className="form-input" 
  placeholder="Enter text"
/>
```

## Adding New Theme Colors

1. Add the new color to the CSS variables in `globals.css`
2. Add it to both light and dark mode sections
3. Add the color to the Tailwind config in `tailwind.config.mjs`

## Best Practices

- Use semantic color names (`primary`, `background`) rather than literal colors
- For elements that need opacity variants, use the RGB variables
- For form elements, use the `form-input` class to ensure proper styling in both light and dark modes
- Test your components in both light and dark modes

## Notes About Form Elements

Form elements like inputs, textareas, and selects have browser-specific styling that can be difficult to override. The theming system includes special handling for these elements to ensure they follow the theme correctly in both light and dark modes.
