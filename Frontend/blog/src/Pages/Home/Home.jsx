import { Nav } from "../../Componentes/Nav";
import { Header } from "../../Componentes/Header";
import { Footer } from "../../Componentes/Footer";
import { Publicaciones } from "../../Componentes/Publicaciones";
import './home.css';
export function Home() {

    return (
        <>
            <div className="container">
                    <Header />
                    <Nav />
                    <Publicaciones />
            </div>
            <Footer />
        </>
    );
}