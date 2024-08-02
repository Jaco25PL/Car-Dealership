import { Cars_Card } from "./Cars_Card";
import { Cars } from "../types/cars"

export function Cars_Display ( {cars} : { cars: Cars[] } ) {

    return (
        <Cars_Card cars={cars} />
    )
}