import DashboardHeader from '@/components/ui/DashboardHeader';
import Loading from '@/components/ui/Loading';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import TableUser from '@/components/ui/TableUser';
import useAuth from '@/Hooks/useAuth';
import useAxiosPublic from '@/Hooks/useAxiosPublic';
import useAxiosSecure from '@/Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import toast from 'react-hot-toast';

const AllUsers = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const axiosPublic = useAxiosPublic()
    const itemsPerPage = 5

    const [currentPage, setCurrentPage] = useState(0)


    const { data: allUsersData = {}, refetch, isLoading } = useQuery({
        queryKey: ['allUsers', user?.email, currentPage, itemsPerPage],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/allUsers/${user?.email}?page=${currentPage}&size=${itemsPerPage}`)
            return data
        },
        keepPreviousData: true
    })

    const { allUsers = [], totalUsersCount = 0 } = allUsersData || {}
    // console.log(totalUsersCount)
    // console.log(allUsers)
    const numberOfPage = Math.ceil(totalUsersCount / itemsPerPage)
    const pages = [...Array(numberOfPage).keys()]

    // console.log(pages)
    const handleChangeUserType = async (singleUser, userType) => {
        // console.log(singleUser, userType)
        try {
            const res = await axiosSecure.patch(`/user/updateUserType/${singleUser._id}`, { userType })
            if (res.data.modifiedCount) {
                if (userType === 'deliveryMen') {
                    const deliverMenInfo = {
                        deliveryMenName: singleUser.name,
                        deliveryMenEmail: singleUser.email,
                        deliveryMenImage: singleUser.image,
                        deliveryMenPhone: singleUser.phone,
                        numberOfParcelsDelivered: 0,
                        averageReview: 0
                    }
                    await axiosPublic.post('/deliveryMen', deliverMenInfo)
                        .then(res => {
                            // console.log(res.data)
                            if (res.data.insertedId) {
                                toast.success('deliveryMen saved to database')
                            }
                        })
                }
                toast.success(`User is ${userType} now!`)
                refetch()
            }
        } catch (err) {
            toast.error(err.response?.message || 'Invalid request')
        }
    }

    const handlePrevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1)
        }
    }
    const handleNextPage = () => {
        if (currentPage < pages.length - 1) {
            setCurrentPage(currentPage + 1)
        }
    }
    return (
        <div>
            <Helmet>
                <title>SwiftParcel | All Users</title>
            </Helmet>
            <DashboardHeader title={`All Users (${allUsers.length})`}></DashboardHeader>
            <div className='rounded-md border mt-2 overflow-x-auto '>
                <Table className="w-full table-auto ">
                    <TableHeader className='bg-slate-50'>
                        <TableRow className="font-medium text-md">
                            <TableHead className="whitespace-nowrap">User Name</TableHead>
                            <TableHead className="whitespace-nowrap">Phone Number</TableHead>
                            <TableHead className="whitespace-nowrap">Parcels Booked</TableHead>
                            <TableHead className="whitespace-nowrap">Total spent amount</TableHead>
                            <TableHead className="whitespace-nowrap">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    
                    <TableBody className="">
                        {
                            allUsers.map((singleUser, idx) => <TableUser handleChangeUserType={handleChangeUserType} key={idx} singleUser={singleUser} ></TableUser>)
                        }
                    </TableBody>
                </Table>
            </div>
            <Pagination className='pt-3'>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious onClick={handlePrevPage} />
                    </PaginationItem>
                    {
                        pages.map((page, index) => (
                            <PaginationItem key={index} >
                                <PaginationLink onClick={() => setCurrentPage(page)}
                                    className={currentPage === page ? 'bg-red-400 text-white' : undefined}
                                >{page}</PaginationLink>
                            </PaginationItem>
                        ))
                    }
                    <PaginationItem>
                        <PaginationNext onClick={handleNextPage} />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
};

export default AllUsers;