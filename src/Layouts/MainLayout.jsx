import Navbar from "@/components/Navbar";
import { Outlet, useLocation } from "react-router-dom";

const MainLayout = () => {
    const {pathname} = useLocation()
    return (
        <div className="font-Lato">
            {/* navbar */}
            {
                pathname !== '/' && <Navbar></Navbar>
            }
            <div className="min-h-screen">
            <Outlet></Outlet>
            </div>
            {/* footer */}
        </div>
    );
};

export default MainLayout;