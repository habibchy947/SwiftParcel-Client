import React from 'react';
import { TableCell, TableRow } from './table';
import moment from 'moment';
import { Button } from './button';
import { Badge } from './badge';
import { Link } from 'react-router-dom';
// import {
//     DropdownMenu,
//     DropdownMenuContent,
//     DropdownMenuGroup,
//     DropdownMenuItem,
//     DropdownMenuLabel,
//     DropdownMenuSeparator,
//     DropdownMenuShortcut,
//     DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
// import { FaRegUser } from 'react-icons/fa6';
// import { MdOutlineDashboard } from 'react-icons/md';
// import { IoLogOutOutline } from 'react-icons/io5';
const TableRowUserParcel = ({ idx, parcel }) => {
    const { parcelType, requestedDeliveryDate, approximateDeliveryDate, bookingDate, deliveryMenId, status, _id } = parcel
    return (
        <TableRow className="" key={idx}>
            <TableCell className="whitespace-nowrap py-1">{parcelType}</TableCell>
            <TableCell className="whitespace-nowrap py-1">{moment(requestedDeliveryDate).format('DD-MM-YYYY')}</TableCell>
            <TableCell className="whitespace-nowrap py-1">{approximateDeliveryDate === 'Not assigned' ? <p className={`text-center text-yellow-500 bg-yellow-50 py-1 rounded-2xl`}>{approximateDeliveryDate}</p> : moment(bookingDate).format('DD-MM-YYYY')}</TableCell>
            <TableCell className="whitespace-nowrap py-1">{moment(bookingDate).format('DD-MM-YYYY')}</TableCell>
            <TableCell className="whitespace-nowrap py-1">{deliveryMenId === 'Not assigned' ? <Badge className={`text-center bg-yellow-50 text-yellow-500 py-1 rounded-2xl`}>{deliveryMenId}</Badge>: {deliveryMenId}}</TableCell>
            <TableCell className="whitespace-nowrap py-1"> <p className={`text-center ${status === 'pending' && 'text-yellow-500 bg-yellow-50'} py-1 rounded-2xl`}>{status}</p></TableCell>
            <TableCell className="space-x-2 py-1 whitespace-nowrap">
                <button disabled={status !== 'pending'} className="px-2  text-center py-1 rounded-sm text-white bg-yellow-500"><Link to={`/parcel/${_id}`}>Update</Link></button>
                <button className="px-2  text-center py-1 rounded-sm text-white bg-red-500">Cancel</button>
                 {status === 'delivered' && <button className="px-2  text-center py-1 rounded-sm text-white bg-green-500">Review</button>}
                <button className="px-4 text-center py-1 rounded-sm text-white bg-red-300">Pay</button>
            </TableCell>
        </TableRow>
    );
};

export default TableRowUserParcel;