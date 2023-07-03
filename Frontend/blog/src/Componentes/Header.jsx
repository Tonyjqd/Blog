import { Link } from "react-router-dom"
import '../Css/header.css'
export function Header() {

    const linkStyle = {
        color: "black",
        textDecoration: "none",
    };

    return (
        <header>
            <h1 className="display1 custom-size">
                <Link to="/home" style={linkStyle} >Gijón exploring</Link>
            </h1>
        </header>
    )
}


