import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Outlet, useLocation } from "react-router-dom";

const MainLayout = () => {
    const {pathname} = useLocation()
    return (
        <div className="font-Lato">
            {/* navbar */}
            {/* {
                pathname !== '/' && <Navbar></Navbar>
            } */}
            <div className="max-w-screen-2xl mx-auto">
            <Navbar></Navbar>
            </div>
            <div className="min-h-screen">
            <Outlet></Outlet>
            </div>
            {/* footer */}
            <div className="bg-slate-100">
            <Footer></Footer>
            </div>
        </div>
    );
};

export default MainLayout;