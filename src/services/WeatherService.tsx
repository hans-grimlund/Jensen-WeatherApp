import { Forecast, TimeSerie } from "../classes/Forecast";

export const getForecast = async (long: number, lat: number) => {
    try {
        const response = await fetch(`https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/${long}/lat/${lat}/data.json`);
        if (response.ok) {
            const json = await response.json();
            let forecasts: Forecast[] = [];

            json.timeSeries.forEach((timeSerie: TimeSerie) => {
                let forecast = new Forecast();
                forecast.validTime = timeSerie.validTime;
                forecast.parameters = timeSerie.parameters;
                forecasts.push(forecast);
            });

            return forecasts;
        }
    } catch (error) {
        console.log(error);
    }
}

export const setFavorite = (lat: number, long: number) => {
    const oldFavorites = window.localStorage.getItem('FAVORITES');
    let favorites: { lat: number, long: number }[] = [];

    if (oldFavorites) {
        const oldFavsJson: { lat: number, long: number }[] = JSON.parse(oldFavorites);
        if (oldFavsJson.filter(f => f.lat == lat && f.long == long).length == 1) {
            window.localStorage.setItem('FAVORITES', JSON.stringify(oldFavsJson.filter(f => f.lat != lat && f.long != long)));
            const oldFavs = window.localStorage.getItem('FAVORITES');
            if (oldFavs) {
                const json: [] = JSON.parse(oldFavs);
                if (json.length == 0) window.localStorage.removeItem('FAVORITES');
            }
            return;
        }
        
        favorites = favorites.concat(oldFavsJson);
    }
    
    favorites.push({ lat: lat, long: long });
    window.localStorage.setItem('FAVORITES', JSON.stringify(favorites));
}

export const getFavorites = () => {
    const oldFavorites = window.localStorage.getItem('FAVORITES');
    if (oldFavorites) {
        const json: { lat: number, long: number }[] = JSON.parse(oldFavorites);
        return json;
    }
}