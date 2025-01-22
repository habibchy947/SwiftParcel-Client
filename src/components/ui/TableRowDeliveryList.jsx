import React from 'react';
import { TableCell, TableRow } from './table';
import moment from 'moment';
import { Button } from './button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from './dialog';
import Loading from './Loading';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './dropdown-menu';


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

    const position = latitude && longitude ? [latitude, longitude] : null
    if (isDeliveryLisLoading) {
        return <Loading></Loading>
    }
    return (
        <TableRow key={_id} className="">
            <TableCell className="whitespace-nowrap">{userName}</TableCell>
            <TableCell className="whitespace-nowrap">{receiverName}</TableCell>
            <TableCell className="whitespace-nowrap">{phone}</TableCell>
            <TableCell className="whitespace-nowrap">{moment(requestedDeliveryDate).format('DD-MM-YYYY')}</TableCell>
            <TableCell className="whitespace-nowrap">{moment(approximateDeliveryDate).format('DD-MM-YYYY')}</TableCell>
            <TableCell className="whitespace-nowrap">{receiverPhone}</TableCell>
            <TableCell className="whitespace-nowrap">{deliveryAddress}</TableCell>
            <TableCell className="whitespace-nowrap flex flex-col py-1 justify-center gap-1">
                <Dialog>
                    <DialogTrigger asChild>
                        <button variant="outline" className="bg-red-400 text-white px-2 py-1 rounded-sm">View Location</button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                        <DialogTitle></DialogTitle>
                        <DialogDescription></DialogDescription>
                        <MapContainer key={`map-${_id}`} center={position} zoom={12} className='md:w-[620px] w-[357px] h-80 md:h-[500px]' >
                            <TileLayer
                                url='https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=BefSPM9r2086N4GtobHL'
                                attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
                            >
                                <Marker position={position}>
                                    <Popup>
                                        {deliveryAddress}
                                    </Popup>
                                </Marker>
                            </TileLayer>
                        </MapContainer>
                        <DialogFooter className="sm:justify-start">
                            <DialogClose asChild>
                                <Button type="button" variant="secondary">
                                    Close
                                </Button>
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
                <button onClick={() => handleChangeParcelStatus(_id, 'cancelled', 'Cancelled', 'Delivery Cancelled')} disabled={status === 'delivered' || status === 'cancelled'} className={` px-2 py-1 rounded-sm ${status === 'delivered' || status === 'cancelled' || status === 'returned' ? 'bg-slate-400 text-white' : 'text-white bg-red-500'} text-center `}>{status === 'cancelled' ? 'Cancelled' : 'Cancel'}</button>
                <button onClick={() => handleChangeParcelStatus(_id, 'delivered', 'Delivered', 'Parcel has been delivered')} disabled={status === 'delivered' || status === 'cancelled'} className={` px-2 py-1 rounded-sm ${status === 'delivered' || status === 'cancelled' || status === 'returned' ? 'bg-slate-400 text-white' : 'text-white bg-green-500'} text-center `}>{status === 'delivered' ? 'Delivered' : 'Deliver'}</button>
            </TableCell>
        </TableRow>
    );
};

export default TableRowDeliveryList;


