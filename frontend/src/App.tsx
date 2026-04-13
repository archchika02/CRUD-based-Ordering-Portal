// This is the main Application component
import React from 'react';
import './styles/global.css';

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Ordering Portal</h1>
      </header>
      <main className="app-content">
        <section className="order-section">
          {/* Order components will go here */}
          <p>Welcome to the Ordering Portal.</p>
        </section>
      </main>
    </div>
  );
}

export default App;
