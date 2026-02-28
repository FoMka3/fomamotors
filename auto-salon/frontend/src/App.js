import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { NotificationProvider } from './context/NotificationContext';
import Header from './components/Header';
import Home from './pages/Home';
import Cars from './pages/Cars';
import Cart from './pages/Cart';
import Order from './pages/Order';
import OrderSuccess from './pages/OrderSuccess';
import About from './pages/About';
import Contacts from './pages/Contacts';

function App() {
    return (
        <Router>
            <ThemeProvider>
                <NotificationProvider>
                    <Header />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/cars" element={<Cars />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/order" element={<Order />} />
                        <Route path="/order-success" element={<OrderSuccess />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/contacts" element={<Contacts />} />
                    </Routes>
                </NotificationProvider>
            </ThemeProvider>
        </Router>
    );
}

export default App;