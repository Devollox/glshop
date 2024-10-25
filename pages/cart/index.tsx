import React, { useEffect, useState } from "react";
import TapBar from "@/components/tapbar";
import Page from "@/components/page";
import MainContent from "@/components/maincontent";
import { cartService, CartItem } from "@/pages/cart/cartservice";

const Cart: React.FC = () => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    useEffect(() => {
        const subscription = cartService.cartItems$.subscribe((items) => {
            setCartItems(items);
        });

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    const handleRemove = (itemToRemove: CartItem) => {
        cartService.removeFromCart(itemToRemove);
    };

    return (
        <>
            <Page title="Cart">
                <MainContent height="100%" margin="100px 0 0 0">
                    <div>
                        {cartItems.length === 0 ? (
                            <p>Корзина пуста</p>
                        ) : (
                            cartItems.map((item) => (
                                <div key={item.slug}>
                                    <span>{item.name}</span>
                                    <span>{item.price} руб.</span>
                                    <button onClick={() => handleRemove(item)}>Удалить</button>
                                </div>
                            ))
                        )}
                    </div>
                </MainContent>
                <TapBar catalog=".5" cart="1" main=".5" />
            </Page>
        </>
    );
};

export default Cart;
