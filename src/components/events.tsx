function Timeline() {
    const events = [
        { date: "2024-01-01", title: "Event One", description: "Description of event one.", side: "left" },
        { date: "2024-01-02", title: "Event Two", description: "Description of event two.", side: "right" },
        { date: "2024-01-01", title: "Event Three", description: "Description of event one.", side: "left" },
        { date: "2024-01-02", title: "Event Four", description: "Description of event two.", side: "right" },
        // Add more events as needed
    ];

    return (
        <div className="w-full flex flex-col items-center my-8">
            <div className="relative w-full max-w-4xl">
                {/* Vertical Line */}
                <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-0.5 bg-gray-300" />
                {events.map((event, index) => (
                    <div key={index} className={`flex w-full items-center mb-8 ${event.side === 'right' ? 'flex-row-reverse' : ''}`}>
                        {/* Event Container */}
                        <div className={`p-8 w-1/2 flex flex-col ${event.side === 'right' ? 'items-start' : 'items-end'}`}>
                            <h4 className="text-lg font-bold">{event.title}</h4>
                            <p className="text-sm text-gray-600">{event.description}</p>
                        </div>
                        {/* Dot on the Line */}
                        <div className="absolute left-1/2 transform -translate-x-1/2 bg-white border-4 border-gray-300 h-4 w-4 rounded-full" />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Timeline;
