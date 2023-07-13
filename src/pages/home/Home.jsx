import React, { useEffect } from "react";
import { Footer, Slider, Product } from '../../components'


function Home() {

    const url = window.location.href;

    useEffect(() => {
        const scrollToProducts = () => {
            if (url.includes("#products")) {
                window.scrollTo({
                    top: 700,
                    behavior: "smooth",
                });
                return;
            }
        };
        scrollToProducts();
    }, [url]);

    return (
        <div className="w-full mt-20">
            <Slider />

            <Product />
            <div>
                <Footer />
            </div>
        </div>
    )
}

export default Home;