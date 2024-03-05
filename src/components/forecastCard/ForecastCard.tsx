import { motion } from "framer-motion"
import { Forecast } from "../../classes/Forecast";
import getSym from "./utils/getSym";

export default (forecasts: Forecast[], location: string, lat: number, long: number, saveFavorite: (lat: number, long: number) => void, close: (lat:number, long: number) => void ) => {
    
    let temps1: number[] = [];
    let temps2: number[] = [];
    let temps3: number[] = [];
    let temps4: number[] = [];
    let temps5: number[] = [];
    let temps6: number[] = [];

    let sym1 = "";
    let sym2 = "";
    let sym3 = "";
    let sym4 = "";
    let sym5 = "";
    let sym6 = "";

    const currentTime = new Date();


    forecasts.forEach(forecast => {
        const forecastTime = new Date(forecast.validTime)

        const forecastDay = forecastTime.getDate();
        const currentDay = currentTime.getDate();

        const setForecastDay = (day: number) => {
            const tempParam = forecast.parameters.filter(p => p.name == 't')[0];
            switch (day) {
                case 2:
                    temps2.push(tempParam.values[0])
                    break;
                case 3:
                    temps3.push(tempParam.values[0])
                    break;
                case 4:
                    temps4.push(tempParam.values[0])
                    break;
                case 5:
                    temps5.push(tempParam.values[0])
                    break;
                case 6:
                    temps6.push(tempParam.values[0])
                    break;
            
                default:
                    break;
            }


            if (forecastTime.getHours() == 13) {
                const symParam = forecast.parameters.filter(p => p.name == 'Wsymb2')[0];
                const sym = symParam.values[0];

                switch (day) {
                    case 2:
                        sym2 = getSym(sym);
                        break;
                    case 3:
                        sym3 = getSym(sym);
                        break;
                    case 4:
                        sym4 = getSym(sym);
                        break;
                    case 5:
                        sym5 = getSym(sym);
                        break;
                    case 6:
                        sym6 = getSym(sym);
                        break;
                
                    default:
                        break;
                }
            }
        }

        switch (forecastDay) {
            case (currentDay):
                const tempParam = forecast.parameters.filter(p => p.name == 't')[0];
                temps1.push(tempParam.values[0])

                if (forecastTime.getHours == currentTime.getHours) {
                    const symParam = forecast.parameters.filter(p => p.name == 'Wsymb2')[0];
                    const sym = symParam.values[0];
                    sym1 = getSym(sym);
                }
                
                break;
            case (currentDay +1):
                setForecastDay(2);
                break;
            case (currentDay +2):
                setForecastDay(3);
                break;
            case (currentDay +3):
                setForecastDay(4);
                break;
            case (currentDay +4):
                setForecastDay(5);
                break;
            case (currentDay +5):
                setForecastDay(6);
                break;
        
            default:
                break;
        }
    });

    const getWeekdayFromToday = (day: number) => {
        return new Date(currentTime.getTime() + (day * 24 * 60 * 60 * 1000)).toLocaleDateString(undefined, { weekday: 'long' });
    }
    
    const day3 = getWeekdayFromToday(2);
    const day4 = getWeekdayFromToday(3);
    const day5 = getWeekdayFromToday(4);
    const day6 = getWeekdayFromToday(5);

    return (
        <div className="col-12 border p-4 rounded-5">
            <div className="d-flex justify-content-between col-12">
                <span className="lead">{location}</span>
                <div className="">
                    <motion.span whileHover={{ scale: 1.2 }} onClick={() => {saveFavorite(lat, long)}} className="material-symbols-outlined me-3" role="button">favorite</motion.span>
                    <motion.span whileHover={{ scale: 1.2 }} onClick={() => {close(lat, long)}} className="material-symbols-outlined" role="button">close</motion.span>
                </div>
            </div>
            <table className="table mt-2">
                <tbody>
                    <tr>
                        <th scope="row">Idag</th>
                        <td>{Math.max(...temps1)}°</td>
                        <td>{Math.min(...temps1)}°</td>
                        <td className="material-symbols-outlined">{sym1}</td>
                    </tr>
                    <tr>
                        <th scope="row">Imorgon</th>
                        <td>{Math.max(...temps2)}°</td>
                        <td>{Math.min(...temps2)}°</td>
                        <td className="material-symbols-outlined">{sym2}</td>
                    </tr>
                    <tr>
                        <th scope="row">{day3}</th>
                        <td>{Math.max(...temps3)}°</td>
                        <td>{Math.min(...temps3)}°</td>
                        <td className="material-symbols-outlined">{sym3}</td>
                    </tr>
                    <tr>
                        <th scope="row">{day4}</th>
                        <td>{Math.max(...temps4)}°</td>
                        <td>{Math.min(...temps4)}°</td>
                        <td className="material-symbols-outlined">{sym4}</td>
                    </tr>
                    <tr>
                        <th scope="row">{day5}</th>
                        <td>{Math.max(...temps5)}°</td>
                        <td>{Math.min(...temps5)}°</td>
                        <td className="material-symbols-outlined">{sym5}</td>
                    </tr>
                    <tr>
                        <th scope="row">{day6}</th>
                        <td>{Math.max(...temps6)}°</td>
                        <td>{Math.min(...temps6)}°</td>
                        <td className="material-symbols-outlined">{sym6}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
