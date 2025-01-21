import { Card, CardDescription, CardHeader, CardTitle } from "./card";

const FeaureCard = ({ feature }) => {
    const { icon, title, description } = feature || {}
    return (

        <Card className="flex flex-col items-center text-center lg:text-left justify-center md:justify-start bg-white border border-gray-200 rounded-lg shadow lg:flex-row hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
            <img className="object-cover w-44 pl-3 rounded-t-lg md:h-auto md:w-32 md:rounded-none md:rounded-s-lg" src={icon} alt="" />
            <div className="flex flex-col justify-center p-4 leading-normal">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{description}</p>
            </div>
        </Card>


    );
};

export default FeaureCard;