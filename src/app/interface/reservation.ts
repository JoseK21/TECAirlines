export interface Reservation {
    flight_id: string;
    type: string; // Ida vuelta o solo ida. //
    is_first_class: boolean;
    people_flying: number;
    username: string;
}
