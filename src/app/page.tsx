"use client"

import Timeline from "@/components/events";
import { ShipmentUpdate } from "@/components/shipment-update";
import { TrackingItem } from "@/components/trackingItem";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

class ShipmentManager {
  shipments: any[];
  constructor() {
    this.shipments = [];
  }

  // Method to add a new shipment
  addShipment(trackingId: any, recipient: any, status: any, origin: any, destination: any, updates: any[]) {
    const shipment = {
      trackingId,
      recipient,
      status,
      origin,
      destination,
      updates
    };
    this.shipments.push(shipment);
  }

  // Method to find a shipment by tracking ID
  findShipment(trackingId: any) {
    const shipment = this.shipments.find(s => s.trackingId === trackingId);
    return shipment ? shipment : null; // Return the shipment if found, otherwise return null
  }
}

const shipmentManager = new ShipmentManager();

// Adding some shipments
shipmentManager.addShipment('12345',
  'John Doe',
  'Shipped',
  { city: "Hyderabad", state: "Telangana", country: "India", countryCode: "IN" },
  { city: "Irvine", state: "California", country: "United States", countryCode: "USA" },
  [
    {


    }
  ]);

function isTrackingNumberValid(trackingId: any) {
  // Searching for a shipment
  //const searchTrackingId = '67890';
  const foundShipment = shipmentManager.findShipment(trackingId);

  if (foundShipment) {
    console.log(`Shipment found:`, foundShipment);
    return true;
  } else {
    console.log('Shipment not found.');
    return false;
  }
}

const data = [
  {
    "date_utc": "09-May-2024",
    "time_utc": "16:05",
    "status": "Delivered",
    "location": {
      "city": "Santa Ana",
      "country": "USA"
    },
    "description": "Delivered",
    "pieceId": "someid"
  },
  {
    "date_utc": "09-May-2024",
    "time_utc": "10:53",
    "status": "Shipment is out with courier for delivery",
    "location": {
      "city": "Santa Ana",
      "country": "USA"
    },
    "description": "Shipment is out with courier for delivery",
    "pieceId": "someid"
  },
  {
    "date_utc": "08-May-2024",
    "time_utc": "12:51",
    "status": "Shipment is on hold",
    "location": {
      "city": "Santa Ana",
      "country": "USA"
    },
    "description": "Shipment is on hold",
    "pieceId": "someid"
  },
  {
    "date_utc": "08-May-2024",
    "time_utc": "11:39",
    "status": "Arrived at DHL Delivery Facility",
    "location": {
      "city": "Santa Ana",
      "country": "USA"
    },
    "description": "Arrived at DHL Delivery Facility",
    "pieceId": "someid"
  },
  {
    "date_utc": "08-May-2024",
    "time_utc": "10:37",
    "status": "Shipment has departed from a DHL facility",
    "location": {
      "city": "Los Angeles Gateway",
      "country": "USA"
    },
    "description": "Shipment has departed from a DHL facility",
    "pieceId": "someid"
  },
  {
    "date_utc": "08-May-2024",
    "time_utc": "09:31",
    "status": "Shipment is on hold",
    "location": {
      "city": "Los Angeles Gateway",
      "country": "USA"
    },
    "description": "Shipment is on hold",
    "pieceId": "someid"
  },
  {
    "date_utc": "08-May-2024",
    "time_utc": "09:29",
    "status": "Arrived at DHL Sort Facility",
    "location": {
      "city": "Los Angeles Gateway",
      "country": "USA"
    },
    "description": "Arrived at DHL Sort Facility",
    "pieceId": "someid"
  },
  {
    "date_utc": "07-May-2024",
    "time_utc": "20:06",
    "status": "Shipment has departed from a DHL facility",
    "location": {
      "city": "Leipzig",
      "country": "Germany"
    },
    "description": "Shipment has departed from a DHL facility",
    "pieceId": "someid"
  },
  {
    "date_utc": "07-May-2024",
    "time_utc": "20:04",
    "status": "Shipment is in transit to destination",
    "location": {
      "city": "Leipzig",
      "country": "Germany"
    },
    "description": "Shipment is in transit to destination",
    "pieceId": "someid"
  },
  {
    "date_utc": "06-May-2024",
    "time_utc": "19:09",
    "status": "Shipment has departed from a DHL facility",
    "location": {
      "city": "Hyderabad",
      "country": "India"
    },
    "description": "Shipment has departed from a DHL facility",
    "pieceId": "someid"
  },
  {
    "date_utc": "06-May-2024",
    "time_utc": "17:46",
    "status": "Processed at HYDERABAD - INDIA",
    "location": {
      "city": "Hyderabad",
      "country": "India"
    },
    "description": "Processed at HYDERABAD - INDIA",
    "pieceId": "someid"
  },
  {
    "date_utc": "06-May-2024",
    "time_utc": "17:34",
    "status": "Shipment picked up",
    "location": {
      "city": "Hyderabad",
      "country": "India"
    },
    "description": "Shipment picked up",
    "pieceId": "someid"
  }
];

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [message, setMessage] = useState('');
  const [trackingInfoFound, setTrackingInfoFound] = useState(false);
  const [shipment, setShipment] = useState<any>()
  const router = useRouter();

  const handleSearch = () => {
    if (isTrackingNumberValid(searchTerm)) {
      setMessage("")
      setTrackingInfoFound(true)
      const shipment = shipmentManager.findShipment(searchTerm);
      setShipment(shipment)
      //router.push(`/search?query=${encodeURIComponent(searchTerm)}`);
    } else {
      setTrackingInfoFound(false)
      setMessage(`'${searchTerm}' is not a valid tracking number`)
    }
  };

  const clearSearch = () => {
    setTrackingInfoFound(false)
    setMessage("")
    setShipment(undefined)
    setSearchTerm("")
  }

  return (
    <main className="flex flex-col gap-8 items-center w-full p-4 md:p-8">
      {
        !trackingInfoFound && (
          <div className="w-full flex flex-row gap-2 items-center justify-center">
            <Input
              type="text"
              placeholder="Enter your tracking number"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {/* <Input
          placeholder="Enter your tracking number"
        // value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
        // onChange={(event) =>
        //   table.getColumn("email")?.setFilterValue(event.target.value)
        // }
        /> */}
            {
              searchTerm && (
                <Button variant={"outline"} onClick={clearSearch}><X /></Button>
              )
            }
            <Button onClick={handleSearch}>Track</Button>
          </div>
        )
      }
      {
        message && (
          <div>{message}</div>
        )
      }
      {
        shipment && (
          <>
            <div className="w-full flex flex-col gap-8 items-center">
              <div>{shipment.trackingId}</div>
              <div className="w-full flex flex-row items-center justify-between">
                <div className="flex flex-col gap-2 items-center">
                  <div className="leading-7 font-medium">{shipment.origin.city}</div>
                  <div className="text-muted-foreground">{shipment.origin.state}, {shipment.origin.country}</div>
                </div>
                <div className="flex flex-col gap-2 items-center">
                  <div className="leading-7 font-medium">{shipment.destination.city}</div>
                  <div className="text-muted-foreground">{shipment.destination.state}, {shipment.destination.country}</div>
                </div>
              </div>
              <div className="w-full flex flex-col items-start gap-4">
                <div className="text-xl md:text-2xl font-bold">Updates</div>
                {/* <ol className='relative border-s dark:border-neutral-600 border-neutral-400 ml-[11.5px] flex flex-col gap-8'>
                {
                  data?.map((update, index) =>
                    <li key={index} className='ms-7'>
                      <TrackingItem
                        key={index}
                        location={update.location}
                        description={update.description}
                        status={update.status}
                        date_UTC={update.date_utc}
                        time_UTC={update.time_utc} />
                      
                    </li>
                  )
                }
              </ol> */}
                <div className="w-full flex flex-col my-8">
                  <div className="relative w-full">
                    {/* Vertical Line */}
                    <div className="absolute left-1/3 md:left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-0.5 border-s dark:border-neutral-600 border-neutral-400" />
                    {
                      data?.map((update, index) =>
                        <ShipmentUpdate
                          key={index}
                          location={update.location}
                          description={update.description}
                          status={update.status}
                          date_UTC={update.date_utc}
                          time_UTC={update.time_utc} />
                      )
                    }
                  </div>
                </div>
              </div>
            </div>
            {/* <Timeline /> */}
          </>
        )
      }
    </main >
  );
}
