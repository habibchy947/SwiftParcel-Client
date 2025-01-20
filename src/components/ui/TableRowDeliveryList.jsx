import 'leaflet/dist/leaflet.css';
import React, { useEffect, useState } from 'react';
import { TableCell, TableRow } from './table';
import moment from 'moment';
import { Button } from './button';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './dialog';
import { Label } from './label';
import { Input } from './input';
const TableRowDeliveryList = ({ deliveryList }) => {
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
    // const [position, setPosition] = useState([latitude, longitude])
    // useEffect(()=>{

    // },[latitude,longitude])
    const position = [latitude,longitude]
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
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="outline" className="bg-red-400 text-white">View Location</Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                        <DialogTitle>Screen readibiliyt</DialogTitle>
                        {/* main content */}
                        <MapContainer center={position} zoom={12} style={{width: '600px', height: '500px'}}>
                            <TileLayer
                             url='https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=BefSPM9r2086N4GtobHL'
                             attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
                             >
                            </TileLayer>
                            <Marker position={position}>
                                <Popup>{deliveryAddress}</Popup>
                            </Marker>
                        </MapContainer>
                        <DialogFooter className="sm:justify-start">
                            <DialogClose asChild>
                                <Button type="button" variant="secondary">
                                    Close
                                </Button>
                                {/* 22.37884823904678, 91.91728585442843 */}
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
                <button onClick={()=>handleCancelParcel(_id)} disabled={status === 'delivered' || status === 'cancelled'} className={`px-2 ${status === 'delivered' || status === 'cancelled' && 'bg-slate-400'} text-center py-1 rounded-sm text-white bg-red-500`}>Cancel</button>
                <button className="px-2  text-center py-1 rounded-sm text-white bg-green-500">Deliver</button>
            </TableCell>
        </TableRow>
    );
};

export default TableRowDeliveryList;