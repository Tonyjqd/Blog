import { Nav } from "../../Componentes/Nav";
import { Header } from "../../Componentes/Header";
import { Footer } from "../../Componentes/Footer";
import { Entrada } from "../../Componentes/Entrada";

export function Formulario() {
    return (
        <>
            <div className="container">
                <Header />
                <Nav />
                <Entrada />
            </div>
            <Footer />
        </>
    );
}