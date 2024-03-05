import { FormEvent, useState } from "react";
import { findLocation } from "../../services/LocationService";

interface Props {
    addForecast: (long: number, lat:  number) => void
}

export default ({ addForecast }: Props) => {
    const [searchterm, setSearchterm] = useState("");
    const [resultElement, setResultElement] = useState<JSX.Element>();

    const search = async () => {
        // const response = await findLocation("barrskogsvägen 10 resarö");
        const response = await findLocation(searchterm);
        if (response.status == "ZERO_RESULTS") {
            setResultElement(undefined);
            return;
        }

        const long = response.results[0].geometry.location.lng;
        const lat = response.results[0].geometry.location.lat;

        const resultElement = (
            <div className="col-12 d-flex flex-column mt-4">
                <button onClick={() => { addForecast(long, lat); setSearchterm("")}} className="border btn bg-dark d-flex">
                    {response.results[0].formatted_address}
                </button>
            </div>
        )

        setResultElement(resultElement);
    }

    const submit = (e: FormEvent) => {
        e.preventDefault();
        if (!searchterm) return;
        search();
    }
    
    return (
        <div className="col-12 border p-4 rounded-5 d-flex flex-column justify-content-center">
            <form onSubmit={(e) => submit(e)} className="">
                <div className="input-group">
                    <input value={searchterm} onChange={(e) => setSearchterm(e.target.value)} className="form-control" type="search" />
                    <button className="input-group-text">
                        <span className="material-symbols-outlined">search</span>
                    </button>
                </div>
            </form>
            <div className="">
                {resultElement}
            </div>
        </div>
    )
}