interface Parameter {
    name: string;
    values: number[];
}

export interface TimeSerie {
    validTime: string;
    parameters: Parameter[];
}

export class Forecast {
    validTime = "";
    parameters: Parameter[] = [];
}