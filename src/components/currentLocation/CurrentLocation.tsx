import { useEffect, useState } from "react";
import { getCityName, getCountryName } from "../../utils/geoCoder";
import Loading from "../loading/Loading";
import { getCurrentLocation, getLocationData } from "../../services/LocationService";
import { getForecast } from "../../services/WeatherService";

export default () => {
    const [loading, setLoading] = useState(true);
    const [currentTemp, setCurrentTemp] = useState(0);
    const [currentDate, setCurrentDate] = useState("");
    const [currentLocation, setCurrentLocation] = useState("");

    const getWeatherFromMyLoc = async () => {
        // const myLoc = { long: 14.65324, lat: 58.22672 };
        const myLoc = getCurrentLocation();
        const myForecasts = await getForecast(myLoc.long, myLoc.lat);
        if (!myForecasts) return;
        setCurrentTemp(myForecasts[0].parameters[10].values[0]);
        const locInfo = await getLocationData(myLoc.long, myLoc.lat);
        setCurrentLocation(`${getCityName(locInfo)}, ${getCountryName(locInfo)}`);
    }

    function startTime() {
        setCurrentDate(new Date().toLocaleString());
        setTimeout(startTime, 1000);
    }

    useEffect(() => {
        try {
            startTime();
            if (getCurrentLocation()) getWeatherFromMyLoc();
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }, [])

    if (loading) return <Loading />

    return (
        <div className="col-12 d-flex flex-column border p-4 rounded-5">
            <div className="d-flex align-items-center">
                <span className="lead me-4">{currentLocation}</span>
                <span>{currentDate.toLocaleString()}</span>
            </div>
            <div className="mt-4">
                <div className="d-flex">
                    <span>Currently</span>
                    <span className="ms-2">{currentTemp}°</span>
                </div>
            </div>
        </div>
    )
}