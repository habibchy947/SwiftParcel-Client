import React from 'react';

const Drawer = () => {
    const [sidebarOpen, setSideBarOpen] = useState(false)
    const toggleDrawer = () => {
        setSideBarOpen(!sidebarOpen)
    }

    return (
        <div className="">
            <div aria-label="close-sidebar" onClick={toggleDrawer} className={`fixed inset-0 z-40 bg-black transition-all duration-300 ${sidebarOpen ? 'opacity-50 visible' : 'opacity-0 invisible'}`}>
            </div>
            <div className={`fixed  top-0 z-50 left-0 w-68 p-4 h-full text-black shadow-lg bg-gray-50 transform transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} overflow-y-auto`}>
                <button onClick={toggleDrawer} className="lg:hidden text-black ">close</button>
                <div className="rounded-md bg-white shadow-md text-black p-2">
                    {/* websites title */}

                </div>
                <div className="divider mb-0"></div>

                {/* sidbar content */}
                <div className="space-y-2">
                    



                </div>
            </div>
            {/* main contsan */}
            <div className={`flex-1 p-3 transition-transform duration-300 lg:ml-60 ${sidebarOpen ? 'lg:ml-64' : ''}`}>
                <button onClick={toggleDrawer}
                    className="p-2 text-black text-lg rounded-md lg:hidden"
                >
                 Open
                </button>
                {/* main page content */}
                <div className=" lg:mt-0">
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    );
};
export default Drawer;