import bannerImg from '../assets/Home/swiftParcel-Banner.jpg'
import Navbar from './Navbar';
const Banner = () => {
    return (
        <div
        style={{
            backgroundImage: `url(${bannerImg})`,
          }}
         className="bg-center bg-no-repeat bg-cover max-w-screen-2xl mx-auto text-white">
            <div className='w-11/12 mx-auto bg-base-100 text-black sticky'><Navbar></Navbar></div>
            <div className="w-8/12 mx-auto text-center">
            <h2 className="text-5xl font-bold">Connecting You to Swift Delivery Solutions</h2>
            <p className="text-xl mt-3 mb-10">Efficient parcel booking, management, and tracking for reliable, on-time deliveries.</p>
            </div>
        </div>
    );
};

export default Banner;