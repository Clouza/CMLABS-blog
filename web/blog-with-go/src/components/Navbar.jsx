import { Link } from "react-router-dom";

export default function Navbar({ background, headerHeading, headerSubHeading }) {
    const logout = () => {
        sessionStorage.clear();
        window.location.href = "/login";
    };
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light" id="mainNav">
                <div className="container px-4 px-lg-5">
                    <Link to="/" className="navbar-brand" >Blog Go</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive"
                        aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                        <i className="fas fa-bars"></i>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarResponsive">
                        <ul className="navbar-nav ms-auto py-4 py-lg-0">
                            <li className="nav-item"><Link to="/" className="nav-link px-lg-3 py-3 py-lg-4">Home</Link></li>
                            <li className="nav-item"><Link to="/paper" className="nav-link px-lg-3 py-3 py-lg-4">Paper</Link></li>
                            {
                                sessionStorage.getItem("key") != undefined &&
                                <li className="nav-item" onClick={() => logout()}><Link className="nav-link px-lg-3 py-3 py-lg-4">Logout</Link></li>
                            }
                        </ul>
                    </div>
                </div>
            </nav>
            <header className="masthead" style={{ backgroundImage: `url(${background})` }}>
                <div className="container position-relative px-4 px-lg-5">
                    <div className="row gx-4 gx-lg-5 justify-content-center">
                        <div className="col-md-10 col-lg-8 col-xl-7">
                            <div className="site-heading">
                                <h1>{headerHeading}</h1>
                                <span className="subheading">{headerSubHeading}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </header></>
    );
}