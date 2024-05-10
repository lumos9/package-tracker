import { Button } from './ui/button'
import { ArrowRightIcon } from 'lucide-react'
import { TrackingItemProps } from '../../types/chronoItemProps'
import TimeElapsed from './time-elapsed';
import { Separator } from './ui/separator';

export function ShipmentUpdate({
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
    const local_time = new Date(date_UTC + ' ' + time_UTC);

    return (
        <>
            <div className='flex w-full mb-24'>
                {/* Event Container */}
                <div className='pr-4 md:pr-8 w-1/3 md:w-1/2 flex gap-2 flex-col items-end'>
                    <TimeElapsed startDate={utc_date_obj.toLocaleString()} />
                    <div className='flex flex-col md:flex-row items-end gap-2'>
                        <div>{formatDate(utc_date_obj)}</div>
                        <div className='text-muted-foreground'>{formatTime(utc_date_obj) + " " + getTimezone(utc_date_obj)}</div>
                    </div>
                </div>
                <div className='pl-4 md:pl-8 w-2/3 md:w-1/2 flex flex-col gap-2 items-start'>
                    {/* <TimeElapsed startDate={utc_date_obj.toLocaleString()} /> */}
                    <div className='font-medium'>{status}</div>
                    <div className='text-muted-foreground'>{"1 Piece ID: JD014600011540536367"}</div>
                    <div className='text-muted-foreground'>{location.city}, {location.country}</div>
                    <div className='text-muted-foreground flex flex-col md:flex-row items-start gap-0 md:gap-1'>
                        <div>{formatDate(local_time)}</div>
                        <div className='text-muted-foreground'>{formatTime(local_time) + " Local Time"}</div>
                    </div>
                </div>
                {/* Dot on the Line */}
                <div className="absolute left-1/3 md:left-1/2 transform -translate-x-1/2 dark:bg-neutral-600 bg-neutral-400 border size-3 rounded-full" />
            </div>
        </>
    )
}