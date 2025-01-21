import Lottie from 'lottie-react';
import bannerImg from '../assets/Home/swiftParcel-Banner.jpg'
import bannerLottie from '../assets/Home/bannerLottie.json'
const Banner = () => {
    return (
        <div
            style={{
                backgroundImage: `url(${bannerImg})`,
            }}
            className="bg-center bg-no-repeat bg-cover bg-blend-overlay bg-opacity-100 max-w-screen-2xl mx-auto text-white hero-overlay">
            <div className='grid grid-cols-1 md:grid-cols-2 w-11/12 mx-auto items-center pt-32 md:pt-16 lg:pt-28 pb-4 md:pb-7 lg:pb-8'>
                <div className="text-center md:text-left">
                    <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold leading-tight">Connecting You to Swift Delivery Solutions</h2>
                    <p className="text-lg lg:text-xl mt-3 mb-10">Efficient parcel booking, management, and tracking for reliable, on-time deliveries.</p>
                    <div className='flex justify-center md:justify-start'>
                        <label className="input input-bordered flex items-center w-2/3 gap-2">
                            <input type="text" className="text-black" placeholder="Search" />
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                className="h-4 w-4 opacity-100">
                                <path
                                    fillRule="evenodd"
                                    d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                                    clipRule="evenodd" />
                            </svg>
                        </label>
                    </div>
                </div>
                <div>
                    <Lottie animationData={bannerLottie} loop={true} className=' lg:h-[400px]' ></Lottie>
                </div>
            </div>
        </div>
    );
};

export default Banner;