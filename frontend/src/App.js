import React from 'react';
import {BrowserRouter, Route } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <div className="grid-container">
          <header className="row">
              <div>
                  <a className="brand" href="">amazon</a>
              </div>
              <div>
                  <a href="/cart">Cart</a>
                  <a href="/signin">Sign in</a>
              </div>
              
          </header>
          <main>
            <Route path="/" component={Home} ecact></Route>
              <ul>
                  <li>Product 1</li>
                  <li>Product 2</li>
                  <li>Product 3</li>
                  <li>Product 4</li>
              </ul>

          </main>
          <footer className="row center"> All right reserved</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
