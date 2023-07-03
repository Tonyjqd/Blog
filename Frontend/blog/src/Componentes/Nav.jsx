import '../Css/nav.css';
import { Link, useLocation } from 'react-router-dom';
export function Nav () {
    const location = useLocation();
    const linkStyle = {
        color: "white",
        textDecoration: "none",
    };
    return (
        <nav>
            {!location.pathname.includes('/entrada') && (
            <button id='entrada' className="btn btn-success">
                <Link to="/entrada" style={linkStyle}>
                    Añadir entrada
                </Link>
            </button>
            )}
        </nav>
    )
}
