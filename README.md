# Numerical Integration Scientific Platform

A premium Next.js 15 web application for exploring and analyzing numerical integration methods with interactive simulations and analytics.

## Features

- **Multiple Integration Methods**: Rectangle, Trapezoidal, Simpson's Rule, and Gauss-Legendre Quadrature
- **Interactive Simulator**: Real-time calculation with adjustable parameters
- **Analytics Dashboard**: Convergence analysis and performance metrics
- **Educational Resources**: Comprehensive documentation and tutorials
- **Responsive Design**: Beautiful, mobile-friendly interface
- **Production-Ready**: Built with modern best practices

## Tech Stack

- **Framework**: Next.js 15 (React 19)
- **Styling**: Tailwind CSS
- **Visualization**: Recharts
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Language**: TypeScript

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

## Project Structure

```
.
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Home page
│   ├── globals.css              # Global styles
│   ├── methodology/             # Methodology page
│   ├── analytics/               # Analytics dashboard
│   ├── documentation/           # Documentation center
│   └── about/                   # About/recruiter page
├── components/                   # React components
│   ├── ui/                      # UI component library
│   ├── Navbar.tsx               # Navigation bar
│   ├── HeroSection.tsx          # Landing section
│   ├── FormulaSection.tsx       # Methods explanation
│   ├── InteractiveSimulator.tsx # Interactive tool
│   ├── ChartsDashboard.tsx      # Analytics charts
│   ├── RecruiterSection.tsx     # Professional section
│   ├── DocumentationCenter.tsx  # Resources
│   └── Footer.tsx               # Footer
├── lib/                          # Utilities and business logic
│   ├── constants.ts             # Configuration & color palette
│   ├── utils.ts                 # Helper functions
│   ├── numericalMethods.ts      # Integration algorithms
│   ├── analyticalSolution.ts    # Exact solutions
│   └── index.ts                 # Barrel export
├── public/                       # Static assets
└── next.config.ts               # Next.js configuration
```

## Key Modules

### Numerical Methods (`lib/numericalMethods.ts`)

- Rectangle Method (Left, Right, Midpoint)
- Trapezoidal Rule
- Simpson's 1/3 Rule
- Adaptive Integration

### Analytical Solutions (`lib/analyticalSolution.ts`)

- Gauss-Legendre Quadrature
- Common test functions
- Analytical solutions for standard integrals

### UI Components (`components/ui/`)

- Button: Primary, secondary, outline, ghost variants
- Card: Default, elevated, outlined styles
- Input: With labels, error states, helper text
- Slider: Range input with real-time feedback
- Table: Generic typed table component

## Configuration

Edit `lib/constants.ts` to customize:

- Color palette and design tokens
- Spacing and typography scales
- Integration method defaults
- Chart configuration
- Animation durations

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

Proprietary - All rights reserved

## Authors

Espy-Tech Scientific Computing Team
