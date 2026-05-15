# Numerical Integration Platform - Development Guide

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

The application will start at `http://localhost:3000`

## Architecture Overview

### Application Structure

- **Next.js 15 App Router**: Modern server and client component pattern
- **TypeScript**: Full type safety across the application
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Smooth animations and transitions
- **Recharts**: Data visualization library

### Core Modules

#### Numerical Methods (`lib/numericalMethods.ts`)

```typescript
// Example usage
import { rectangleMethodMidpoint } from '@/lib/numericalMethods';

const func = (x: number) => Math.sin(x);
const result = rectangleMethodMidpoint(func, 0, Math.PI, 1000);
console.log(result.value); // Integral approximation
```

#### Utilities (`lib/utils.ts`)

```typescript
import { formatDisplay, calculateError } from '@/lib/utils';

const formatted = formatDisplay(3.14159, 2); // "3.14"
const error = calculateError(3.14, 3.14159); // Percentage error
```

### Component Organization

#### UI Components (`components/ui/`)

Reusable, unstyled base components with Tailwind styling:

- **Button**: Multi-variant button component
- **Card**: Flexible container with layout options
- **Input**: Form input with validation states
- **Slider**: Range slider with real-time feedback
- **Table**: Generic table with TypeScript support

#### Page Components (`components/`)

Feature-rich, page-level components:

- **Navbar**: Responsive navigation with mobile menu
- **HeroSection**: Landing page hero with animations
- **FormulaSection**: Educational content display
- **InteractiveSimulator**: Live calculation tool
- **ChartsDashboard**: Analytics and visualizations
- **RecruiterSection**: Professional positioning
- **DocumentationCenter**: Resources and downloads
- **Footer**: Site footer with links

## Development Workflow

### Adding a New Page

1. Create a new directory in `app/`:
   ```bash
   mkdir app/new-page
   ```

2. Create `page.tsx`:
   ```typescript
   'use client';
   
   export default function NewPage() {
     return <div>New Page</div>;
   }
   ```

3. Auto-routed to `/new-page`

### Adding a New Component

1. Create component file in `components/`:
   ```typescript
   'use client';
   
   import React from 'react';
   
   interface Props {
     title: string;
   }
   
   export default function MyComponent({ title }: Props) {
     return <div>{title}</div>;
   }
   ```

2. Import and use in pages or other components

### Styling Guidelines

- Use Tailwind CSS utility classes
- Follow the color palette in `lib/constants.ts`
- Use `clsx` for conditional class names
- Maintain consistent spacing using the SPACING scale

### Type Safety

- All components are fully typed with TypeScript
- Props interfaces are defined for every component
- Use discriminated unions for variant components

## Testing

```bash
# Run tests (when configured)
npm test

# Build check
npm run build

# Type check
npx tsc --noEmit
```

## Deployment

### Vercel (Recommended)

```bash
# Build
npm run build

# Start production server locally
npm start
```

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## Performance Optimization

- Image optimization with Next.js `<Image>` component
- Code splitting with dynamic imports
- CSS-in-JS minimal footprint (Tailwind)
- Efficient re-renders with React hooks
- Server-side rendering for SEO

## Browser DevTools

- React Developer Tools
- Next.js Analytics
- Chrome DevTools

## Common Issues & Solutions

### Port 3000 Already in Use

```bash
npm run dev -- -p 3001
```

### Module Not Found

- Check import paths use `@/` alias
- Verify file extensions (`.ts`, `.tsx`)
- Ensure component is exported as `default`

### TypeScript Errors

```bash
npx tsc --noEmit
```

Fix errors before running the dev server.

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)

## Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

---

**Last Updated**: 2024
**Maintained By**: Espy-Tech Team
