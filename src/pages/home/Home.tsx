import { useEffect, useState } from "react"
import CurrentLocation from "../../components/currentLocation/CurrentLocation"
import ForecastCard from "../../components/forecastCard/ForecastCard"
import Search from "../../components/search/Search"
import { getFavorites, getForecast, setFavorite } from "../../services/WeatherService"
import { getLocationData } from "../../services/LocationService"
import { getCityName } from "../../utils/geoCoder"

export default () => {
    const [forecastCards, setForecastCards] = useState<JSX.Element[]>([])
   
    const saveFavorite = (lat: number, long: number) => {
        setFavorite(lat, long);
    }

    const close = (lat: number, long: number) => {
        const favs = getFavorites();
        if (favs?.some(f => f.lat == lat && f.long == long)) {
            setForecastCards(prevCards =>
                prevCards.filter(c => c.key != lat.toString() + long.toString())
            );
        } else {
            const newArray = forecastCards.filter(c => c.key != lat.toString() + long.toString());
            setForecastCards(newArray)
        }
    }
    
    const addForecast = async (long: number, lat: number) => {
        const forecasts = await getForecast(Number(long.toFixed(6)), Number(lat.toFixed(6)));
        const location = await getLocationData(long, lat);
        if (!location || !forecasts) return;
        
        setForecastCards(prevCards => [...prevCards, (
            <div key={lat.toString() + long.toString()} className="col-12 col-sm-8 col-md-6 col-lg-5 col-xl-4">
                {ForecastCard(forecasts, getCityName(location), Number(lat.toFixed(6)), Number(long.toFixed(6)), saveFavorite, close)}
            </div>
        )])
    }

    useEffect(() => {
        const favs = getFavorites();
        favs?.forEach(fav => {
            addForecast(fav.long, fav.lat);
        });
    }, [])

    return (
        <div className="col-12 d-flex align-items-start p-4 row-gap-4 row">
            <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                <CurrentLocation />
            </div>
            <div className="col-12 col-sm-6 col-md-5 col-lg-4">
                <Search addForecast={addForecast} />
            </div>
            {forecastCards}
        </div>
    )
}