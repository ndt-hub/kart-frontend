# Kart Frontend

A modern web application for ordering desserts, built with React.

## Description

A responsive web application that allows users to browse desserts, add items to their cart, apply discount codes, and place orders. The application features a clean, intuitive interface with a focus on user experience.

## Features

- Product browsing with visual cards
- Interactive shopping cart
- Discount code application system
- Order summary and confirmation
- Responsive design for all devices

## Installation & Setup

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/kart-frontend.git
   cd kart-frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory with the following content:
   ```
   REACT_APP_API_URL=http://localhost:8080
   REACT_APP_API_KEY=apitest
   ```

### Running the Application

1. Start the development server:
   ```
   npm start
   ```

2. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

### Running Tests

Run the test suite:
```
npm test
```

Generate test coverage report:
```
npm test -- --coverage
```

## Project Structure

```
kart-frontend/
├── public/                 # Static files
├── src/                    # Source code
│   ├── components/         # React components
│   │   ├── CartItem/       # Cart item component and tests
│   │   ├── CartSummary/    # Cart summary component and tests
│   │   ├── DiscountSection/# Discount section component and tests
│   │   ├── Modal/          # Modal component and tests
│   │   ├── OrderItem/      # Order item component and tests
│   │   ├── ProductItem/    # Product item component and tests
│   │   └── index.js        # Component barrel file
│   ├── App.js              # Main application component
│   ├── App.css             # Main application styles
│   ├── index.js            # Application entry point
│   └── setupTests.js       # Test configuration
└── package.json            # Project dependencies and scripts
```

## Technologies Used

- React
- CSS
- Axios for API requests
- Jest and React Testing Library for testing

## License

MIT