// src/pages/CarritoCompraPage.jsx

import React from 'react';
import { useCart } from '../context/CartContext.jsx';
import CarritoCompra from '../components/CarritoCompra.jsx'; 
import { Link, useNavigate } from 'react-router-dom';

export default function CarritoCompraPage() {
    const { items } = useCart();
    const navigate = useNavigate();

    // Función que inicia el flujo de checkout
    const handleCheckoutStart = () => {
        // Redirige a la página de Pedidos (Checkout/Pago)
        navigate('/pedidos'); 
    };

    return (
        <main className="container my-5">
            <h2 className="text-center mb-4">🛒 Carrito de Compras</h2>
            <div className="row justify-content-center">
                <div className="col-12 col-lg-10">
                    <div className="card shadow p-4">
                        {items.length === 0 ? (
                            <div className="text-center p-5">
                                <p className="lead">Tu carrito está vacío.</p>
                                <Link to="/catalogo" className="btn btn-primary">Volver al Catálogo</Link>
                            </div>
                        ) : (
                            // Uso del componente CarritoCompra para la gestión completa
                            <CarritoCompra onCheckout={handleCheckoutStart} />
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}