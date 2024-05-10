import { Button } from './ui/button'
import { ArrowRightIcon } from 'lucide-react'
import { TrackingItemProps } from '../../types/chronoItemProps'
import TimeElapsed from './time-elapsed';

export function TrackingItem({
    location,
    date_UTC,
    time_UTC,
    status,
    description
}: TrackingItemProps) {
    function utc_to_browser_time(utcString: any) {
        // Convert the string to a Date object assuming UTC timezone
        return new Date(utcString);
    }

    // Function to format the date as "06-May-2024"
    function formatDate(date: any) {
        const day = date.getDate().toString().padStart(2, '0');
        const month = date.toLocaleString('default', { month: 'short' });
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    }

    // Function to format the time as "05:34 PM"
    function formatTime(date: any) {
        const hours = date.getHours();
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const formattedHour = hours % 12 === 0 ? 12 : hours % 12;
        return `${formattedHour.toString().padStart(2, '0')}:${minutes} ${ampm}`;
    }

    // Function to get timezone abbreviation
    function getTimezone(date: any) {
        const short = new Intl.DateTimeFormat('en-US', { timeZoneName: 'short' }).format(date);
        return short.split(' ')[1]; // Extracts the timezone abbreviation
    }

    const utc_date_obj = utc_to_browser_time(date_UTC + ' ' + time_UTC + ' UTC');

    return (
        <>
            <div>{status}</div>
            <div className='absolute size-3 dark:bg-neutral-600 bg-neutral-400 rounded-full mt-1.5 -start-1.5 border border-white dark:border-black' />
            {/* <div>{formatDate(utc_date_obj)}</div> */}
            <div className='text-pretty text-sm md:text-lg flex flex-row gap-2 items-center'>
                <div className='text-pretty text-sm md:text-base text-muted-foreground'>{formatTime(utc_date_obj) + " " + getTimezone(utc_date_obj) + " - "}</div>
                <TimeElapsed startDate={utc_date_obj.toLocaleString()} />
            </div>
            <div>{status}</div>
            <div className='text-pretty text-sm md:text-base text-muted-foreground'>{location.city}, {location.country}</div>
        </>
    )
}