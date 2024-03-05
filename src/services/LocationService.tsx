import { mapsKey, mapsApi } from "../secrets/api";

export const setCurrentLocation = () => {
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
            position => {
                window.localStorage.setItem('CURRENT_POSITION', JSON.stringify(
                    { long: position.coords.longitude.toFixed(6),
                        lat: position.coords.latitude.toFixed(6) }))
            },
            error => {
                console.log(error.message);
            }
        );
    }

}

export const getCurrentLocation = () => {
    const locString = window.localStorage.getItem('CURRENT_POSITION');
    if (locString) return JSON.parse(locString);
}

export const getLocationData = async (long:number, lat:number) => {
    try {
        const response = await fetch(`${mapsApi}?latlng=${lat},${long}&key=${mapsKey}`)
        if (response.ok) {
            const json = await response.json();
            return json;
        }
    } catch (error) {
        
    }
}

export const findLocation = async (searchterm: string) => {
    try {
        const response = await fetch(`${mapsApi}?address=${searchterm}&key=${mapsKey}`)
        if (response.ok) {
            const json = await response.json();
            return json;
        }
    } catch (error) {
        console.log(error);
    }
}