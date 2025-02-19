import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { toast } from "react-hot-toast";

export default function Support() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        orderId: "",
        message: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        toast.success("Support request submitted successfully!");
        setFormData({ name: "", email: "", orderId: "", message: "" });
    };

    return (
        <div className="">
            <div className="w-11/12 mx-auto pt-28 grid grid-cols-1 md:grid-cols-2 items-center gap-4">
                <div className="">
                    <div>
                        <div className='flex flex-col space-y-4 justify-start md:justify-start items-start md:items-start'>
                            <div className='flex items-start'>
                                <Lottie className='h-16 w-16' animationData={locationIcon} loop={true}></Lottie>
                                <div>
                                    <h2 className='text-xl font-semibold text-orange-400'>Address</h2>
                                    <span className='text-white'>444, Halisohor, Katalqong Abashik</span>
                                </div>
                            </div>
                            <div className='flex items-start'>
                                <Lottie className='h-12 w-16' animationData={phoneIcon} loop={true}></Lottie>
                                <div>
                                    <h2 className='text-xl font-semibold text-orange-400'>Phone</h2>
                                    <span className='text-white'>01613516358, 01810278085</span>
                                </div>
                            </div>
                            <div className='flex items-start'>
                                <Lottie className='h-12 w-16' animationData={mailIcon} loop={true}></Lottie>
                                <div>
                                    <h2 className='text-xl font-semibold text-orange-400'>Address</h2>
                                    <span className='text-white'>habib2005@gmail.com</span>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle>Contact Support</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <Input placeholder="Your Name" name="name" value={formData.name} onChange={handleChange} required />
                            <Input type="email" placeholder="Your Email" name="email" value={formData.email} onChange={handleChange} required />
                            <Input placeholder="Order ID (Optional)" name="orderId" value={formData.orderId} onChange={handleChange} />
                            <Textarea placeholder="Your Message" name="message" value={formData.message} onChange={handleChange} required />
                            <Button type="submit" className="w-full bg-red-500 text-lg font-bold dark:text-white">Submit</Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
            <div className="">
                <Card>
                    <CardHeader>
                        <CardTitle>Frequently Asked Questions</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="item-1">
                                <AccordionTrigger>How do I book a parcel</AccordionTrigger>
                                <AccordionContent>
                                    Click on the "Book a Parcel" button in your dashboard, fill out the form, and submit.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-2">
                                <AccordionTrigger>How can I track my parcel?</AccordionTrigger>
                                <AccordionContent>
                                    Go to "My Parcels" and check the delivery status.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-3">
                                <AccordionTrigger>What payment methods do you accept?</AccordionTrigger>
                                <AccordionContent>
                                    We accept credit/debit cards via Stripe payment gateway.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-4">
                                <AccordionTrigger>What happens if my delivery is delayed?</AccordionTrigger>
                                <AccordionContent>
                                    Contact support via the form above, and our team will assist you.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-5">
                                <AccordionTrigger>How do I cancel a booking?</AccordionTrigger>
                                <AccordionContent>
                                    If the parcel status is still "Pending," you can cancel it from "My Parcels."
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}