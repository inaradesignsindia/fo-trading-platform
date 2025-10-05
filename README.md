# F&O Trading Platform

A professional futures and options trading platform built with React and TailwindCSS.

## Features

- **Dashboard**: Real-time portfolio overview and market indices
- **Option Chain**: Advanced options trading interface
- **One Touch Trading**: Quick trading execution
- **Scalper Terminal**: Professional scalping interface
- **Settings**: Comprehensive broker API configuration

## Tech Stack

- React 18
- TailwindCSS
- React Scripts
- Netlify (Deployment)

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

1. Clone the repository

```bash
git clone <your-repo-url>
cd NuralML_Dev
```

2. Install dependencies

```bash
npm install
```

3. Start development server

```bash
npm start
```

4. Build for production

```bash
npm run build
```

## Deployment

This project is configured for automatic deployment to Netlify via GitHub Actions.

### Manual Deployment

1. Build the project: `npm run build`
2. Deploy the `build` folder to Netlify

### Automatic Deployment

Push to the main branch to trigger automatic deployment via GitHub Actions.

## Environment Setup

Create a `.env` file in the root directory for environment-specific variables:

```env
REACT_APP_API_URL=your_api_url_here
REACT_APP_WEBSOCKET_URL=your_websocket_url_here
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## License

Private - All rights reserved.
