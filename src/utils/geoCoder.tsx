export const getCityName = (locInfo: any) => {
    try {
        const cityComponent = locInfo.results[0].address_components.filter((x: { types: string[]; }) => x.types[0] == "postal_town");
        return cityComponent[0].long_name;    
    } catch (error) {
        console.log(error)
        return getCountryName(locInfo);
    }
}

export const getCountryName = (locInfo: any) => {
    try {
        const countryComponent = locInfo.results[0].address_components.filter((x: { types: string[]; }) => x.types[0] == "country");
        return countryComponent[0].long_name;
    } catch (error) {
        console.log(error)
    }
}