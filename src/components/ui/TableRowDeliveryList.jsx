import React, { useEffect, useRef, useState } from 'react';
import { TableCell, TableRow } from './table';
import moment from 'moment';
import { Button } from './button';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './dialog';
import Loading from './Loading';

const TableRowDeliveryList = ({ deliveryList, handleChangeParcelStatus, isDeliveryLisLoading }) => {
    const {
        _id,
        userName,
        email,
        userId,
        phone,
        parcelType,
        weight,
        receiverName,
        receiverPhone,
        deliveryAddress,
        requestedDeliveryDate,
        approximateDeliveryDate,
        deliveryMenId,
        bookingDate,
        latitude,
        longitude,
        price,
        status,
    } = deliveryList || {}
    
    const position = latitude && longitude ? [latitude,longitude] : null
    const [mapVisible, setMapVisible] = useState(Date.now())

    const handleDialogChange = (open) => {
        if(open){
            setMapVisible(Date.now())
        }
    }
    const mapRef = useRef(null)
     if(isDeliveryLisLoading) {
        return <Loading></Loading>
     }
    return (
        <TableRow className="">
            <TableCell className="whitespace-nowrap">{userName}</TableCell>
            <TableCell className="whitespace-nowrap">{receiverName}</TableCell>
            <TableCell className="whitespace-nowrap">{phone}</TableCell>
            <TableCell className="whitespace-nowrap">{moment(requestedDeliveryDate).format('DD-MM-YYYY')}</TableCell>
            <TableCell className="whitespace-nowrap">{moment(approximateDeliveryDate).format('DD-MM-YYYY')}</TableCell>
            <TableCell className="whitespace-nowrap">{receiverPhone}</TableCell>
            <TableCell className="whitespace-nowrap">{deliveryAddress}</TableCell>
            <TableCell className="whitespace-nowrap flex gap-1">
                <Dialog onOpenChange={handleDialogChange}>
                    <DialogTrigger asChild>
                        <Button variant="outline" className="bg-red-400 text-white">View Location</Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                        <DialogTitle></DialogTitle>
                        <DialogDescription></DialogDescription>
                        {
                            position ? (
                                <MapContainer whenReady={(mapInstance) => mapRef.current = mapInstance} key={_id} center={position} zoom={12} style={{width: '600px', height: '500px'}}>
                            <TileLayer
                             url='https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=BefSPM9r2086N4GtobHL'
                             attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
                             >
                            </TileLayer>
                            <Marker position={position}>
                                <Popup>{deliveryAddress}</Popup>
                            </Marker>
                        </MapContainer>
                            ) :
                            ( <p>Location data unavailable</p>)
                        }
                        <DialogFooter className="sm:justify-start">
                            <DialogClose asChild>
                                <Button type="button" variant="secondary">
                                    Close
                                </Button>
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
                <button onClick={()=>handleChangeParcelStatus(_id, 'cancelled', 'Cancelled', 'Delivery Cancelled')} disabled={status === 'delivered' || status === 'cancelled'} className={`px-2 ${status === 'delivered' || status === 'cancelled' || status === 'returned' ? 'bg-slate-400 text-white' : 'text-white bg-red-500'} text-center py-1 rounded-sm `}>{status === 'cancelled' ? 'Cancelled': 'Cancel'}</button>
                <button onClick={()=>handleChangeParcelStatus(_id, 'delivered', 'Delivered', 'Parcel has been delivered')} disabled={status === 'delivered' || status === 'cancelled'} className={`px-2 ${status === 'delivered' || status === 'cancelled' || status === 'returned' ? 'bg-slate-400 text-white' : 'text-white bg-green-500'} text-center py-1 rounded-sm `}>{status === 'delivered' ? 'Delivered': 'Deliver'}</button>
            </TableCell>
        </TableRow>
    );
};

export default TableRowDeliveryList;