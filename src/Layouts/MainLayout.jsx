import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Outlet, useLocation } from "react-router-dom";

const MainLayout = () => {
    const {pathname} = useLocation()
    const isLogin = pathname.includes('/login') || pathname.includes('/signUp')
    return (
        <div className="font-Lato max-w-screen-2xl mx-auto">
            {/* navbar */}
            {
                isLogin || <div>
                <Navbar></Navbar>
                </div>
            }
            <div className="min-h-screen">
            <Outlet></Outlet>
            </div>
            {/* footer */}
            {
                isLogin || <div className="bg-slate-100">
                <Footer></Footer>
                </div>
            }
        </div>
    );
};

export default MainLayout;