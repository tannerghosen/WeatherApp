import { Outlet, Link } from "react-router-dom";

const Layout = () => {
    return (
        <>
            <Outlet />
            <div className="linkspan">
                <b>Pages</b>
            <br></br>
            <span width="100%"><Link to="/">Weather</Link> <Link to="/Forecast">5 Day Forecast</Link></span>
            </div>
        </>
    )
};

export default Layout;
