import React from 'react';
import { TableCell, TableRow } from './table';
import { Button } from './button';

const TableUser = ({singleUser, handleChangeUserType}) => {
    const {name, phone, totalParcel, userType, totalSpentAmount, _id, email} = singleUser || {} 
    return (
        <TableRow className="">
            <TableCell className="whitespace-nowrap">{name}</TableCell>
            <TableCell className="whitespace-nowrap">{phone}</TableCell>
            <TableCell className="whitespace-nowrap">{totalParcel}</TableCell>
            <TableCell className="whitespace-nowrap">{totalSpentAmount}</TableCell>
            <TableCell className="whitespace-nowrap flex gap-2">
                <Button disabled={userType === 'deliveryMen'} onClick={() =>handleChangeUserType(singleUser, 'deliveryMen')} className={`bg-red-300 ${userType === 'deliveryMen' && 'bg-slate-400'}`}>Make Delivery Men</Button>
                <Button disabled={userType === 'admin'} onClick={() =>handleChangeUserType(singleUser, 'admin')} className={`bg-green-500 ${userType === 'admin' && 'bg-slate-400'}`}>Make Admin</Button>
            </TableCell>
        </TableRow>
    );
};

export default TableUser;