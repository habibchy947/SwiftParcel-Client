import { Card, CardDescription, CardHeader, CardTitle } from "./card";

const FeaureCard = ({feature}) => {
    const {icon, title, description} = feature || {}
    return (
        <Card  className='flex flex-col text-center p-5 bg-slate-50 justify-center items-center'>
            <CardHeader><img className="w-32 h-32" src={icon} alt="" /></CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription className="text-base mt-2">{description}</CardDescription>
        </Card>

    );
};

export default FeaureCard;