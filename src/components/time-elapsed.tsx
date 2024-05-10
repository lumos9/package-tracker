import React, { useState, useEffect } from 'react';

const TimeElapsed = ({ startDate }: any) => {
    const [now, setNow] = useState(new Date());

    useEffect(() => {
        const timerId = setInterval(() => {
            setNow(new Date()); // Update the current time every second
        }, 1000);

        return () => clearInterval(timerId); // Clear the interval on component unmount
    }, []);

    const getElapsedTime = (start: any, current: any) => {
        const ms = current - start; // difference in milliseconds
        const seconds = Math.floor((ms / 1000) % 60);
        const minutes = Math.floor((ms / (1000 * 60)) % 60);
        const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
        const days = Math.floor(ms / (1000 * 60 * 60 * 24));

        return `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
    };

    const getElapsedTimeShort = (start: any, current: any) => {
        const ms = current - start; // difference in milliseconds
        const seconds = Math.floor(ms / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        const years = Math.floor(days / 365);

        // Return the largest unit
        if (years > 0) return `${years}y`;
        if (days > 0) return `${days}d`;
        if (hours > 0) return `${hours}h`;
        if (minutes > 0) return `${minutes}m`;
        return `${seconds}s`;
    };

    // Parse the start date from a string
    const startDateParsed = new Date(startDate);
    //const elapsedTime = getElapsedTime(startDateParsed, now);
    const elapsedTimeShort = getElapsedTimeShort(startDateParsed, now);

    return (
        <div>
            {/* <h1>Time Elapsed</h1> */}
            {/* <p>From {startDate} to now:</p> */}
            <p className='text-muted-foreground'>{elapsedTimeShort} ago</p>
        </div>
    );
};

export default TimeElapsed;
