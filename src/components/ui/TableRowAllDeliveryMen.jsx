import React from 'react';
import { TableCell, TableRow } from './table';

const TableRowAllDeliveryMen = ({ deliveryMen, idx }) => {
    const { deliveryMenName,
        deliveryMenEmail,
        deliveryMenImage,
        deliveryMenPhone,
        numberOfParcelsDelivered,
        averageReview } = deliveryMen || {}
    return (
        <TableRow className="">
            <TableCell className="whitespace-nowrap">{deliveryMenName}</TableCell>
            <TableCell className="whitespace-nowrap">{deliveryMenPhone}</TableCell>
            <TableCell className="whitespace-nowrap">{numberOfParcelsDelivered}</TableCell>
            <TableCell className="whitespace-nowrap">{averageReview}</TableCell>
        </TableRow>
    );
};

export default TableRowAllDeliveryMen;