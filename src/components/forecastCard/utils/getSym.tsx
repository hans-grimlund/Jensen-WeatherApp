export default (symValue: number) => {
    switch (symValue) {
        case 1:
        case 2:
            return "sunny"
        case 3:
        case 4:
            return "partly_cloudy_day"
        case 5:
        case 6:
            return "cloud"
        case 7:
            return "foggy"
        case 8:
        case 18:
            return "rainy"
        case 9:
        case 19:
            return "rainy_light"
        case 10:
        case 20:
            return "rainy_heavy"
        case 11:
        case 21:
            return "thunderstorm"
        case 12:
        case 22:
            return "weather_mix"
        case 13:
        case 14:
        case 23:
        case 24:
            return "rainy_snow"
        case 15:
        case 25:
            return "cloudy_snowing"
        case 16:
        case 26:
            return "weather_snowy"
        case 17:
        case 27:
            return "snowing_heavy"

        default:
            return "";
    }
}