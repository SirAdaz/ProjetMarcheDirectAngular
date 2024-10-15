import Jours from "./jours.models";

export default interface Marche 
{
    id: number;
    marcheName: string;
    place: string;
    hourly: string;
    imageFileName: string;
    description: Text;
    days: Jours [];
}