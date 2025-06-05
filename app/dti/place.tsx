export interface Place {
    name: string;
    displayName: string;
    latitude: number;
    longitude: number;
    id?: string;
    osm_type: string;
    osm_id: number;
}