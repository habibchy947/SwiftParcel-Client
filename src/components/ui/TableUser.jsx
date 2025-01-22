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
                {userType !== 'deliveryMen' && <button disabled={userType === 'deliveryMen'} onClick={() =>handleChangeUserType(singleUser, 'deliveryMen')} className={`bg-red-300 ${userType === 'deliveryMen' && 'bg-slate-400'} px-2 text-white py-2 rounded-sm`}>Make Delivery Men</button>}
                {userType !== 'admin' && <button disabled={userType === 'admin'} onClick={() =>handleChangeUserType(singleUser, 'admin')} className={`bg-green-500 ${userType === 'admin' && 'bg-slate-400'} px-2 text-white py-2 rounded-sm`}>Make Admin</button>}
            </TableCell>
        </TableRow>
    );
};

export default TableUser;