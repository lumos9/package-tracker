export interface TrackingItemProps {
    location: {
        city: string
        state?: string
        country: string
    }
    date_UTC: string
    time_UTC: string
    status: string
    description?: string
}