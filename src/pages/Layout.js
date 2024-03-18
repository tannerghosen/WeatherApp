import { Outlet, Link } from "react-router-dom";

const Layout = () => {
    return (
        <>
            <Outlet />
            <div className="linkspan">
            <br></br>
                <span width="100%"><button className="links"><Link to="/">Weather</Link></button> <button className="links"><Link to="/Forecast">5 Day Forecast</Link></button></span>
            </div>
        </>
    )
};

export default Layout;
