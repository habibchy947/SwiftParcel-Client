import { Button } from '@/components/ui/button';
import errorImg from '../assets/404 error with portals.gif'
import { useNavigate } from 'react-router-dom';
const ErrorPage = () => {
    const navigate = useNavigate()
    return (
        <div className='py-14 flex flex-col justify-center items-center'>
            <img className="w-[400px]" src={errorImg} alt="" />
            <p className='text-2xl mb-2 font-semibold'>The page you are looking for isn't found</p>
            <div className='flex gap-3'>
            <Button asChild><button onClick={()=>navigate(-1)} className='bg-red-700 text-white'>Go back</button></Button>
            <Button asChild><button onClick={()=>navigate('/')} className='bg-red-400 text-white'>Back Home</button></Button>
            </div>
        </div>
    );
};

export default ErrorPage;