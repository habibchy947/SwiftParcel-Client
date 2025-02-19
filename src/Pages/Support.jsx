import { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { toast } from "react-hot-toast";
import Lottie from "lottie-react";
import locationIcon from '@/assets/location.json'
import phoneIcon from '@/assets/phone.json'
import mailIcon from '@/assets/mail.json'
import faq from '@/assets/faq.json'
import emailjs from '@emailjs/browser';
export default function Support() {
    const form = useRef();
    const sendEmail = (e) => {
        e.preventDefault();
    
        emailjs
          .sendForm('service_k4fms09', 'template_3d3yrou', form.current, {
            publicKey: '_3N_IId1uTjh9gK1F',
          })
          .then(
            () => {
              console.log('SUCCESS!');
            },
            (error) => {
              console.log('FAILED...', error.text);
            },
          );
          toast.success("Support request submitted successfully!");
      };
    return (
        <div className="">
            <div className="w-11/12 mx-auto pt-28 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-4 items-center">
                <div className="">
                    <div>
                        <h1 className="text-2xl font-semibold mb-8">Contact Info</h1>
                        <div className='flex flex-col space-y-4 justify-start md:justify-start items-start md:items-start'>
                            <div className='flex items-start'>
                                <Lottie className='h-16 w-16' animationData={locationIcon} loop={true}></Lottie>
                                <div>
                                    <h2 className='text-xl font-semibold text-orange-400'>Address</h2>
                                    <span className='dark:text-white'>444, Halisohor, Katalqong Abashik</span>
                                </div>
                            </div>
                            <div className='flex items-start'>
                                <Lottie className='h-12 w-16' animationData={phoneIcon} loop={true}></Lottie>
                                <div>
                                    <h2 className='text-xl font-semibold text-orange-400'>Phone</h2>
                                    <span className='dark:text-white'>01613516358, 01810278085</span>
                                </div>
                            </div>
                            <div className='flex items-start'>
                                <Lottie className='h-12 w-16' animationData={mailIcon} loop={true}></Lottie>
                                <div>
                                    <h2 className='text-xl font-semibold text-orange-400'>Address</h2>
                                    <span className='dark:text-white'>habib2005@gmail.com</span>
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
                        <form ref={form} onSubmit={sendEmail} className="space-y-4">
                            <Input placeholder="Your Name" name="from_name"  required />
                            <Input type="email" placeholder="Your Email" name="from_email"  required />
                            <Input placeholder="Order ID (Optional)" name="orderId"  />
                            <Textarea placeholder="Your Message" name="message" required />
                            <Button type="submit" className="w-full bg-red-500 text-lg font-bold dark:text-white">Submit</Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
            <div className="flex flex-col-reverse gap-12 md:gap-0 md:flex-row w-11/12 mx-auto pt-16">
                <Card className="flex-1">
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
                <div className="flex-1 flex justify-center items-center">
                    <Lottie className="w-96" animationData={faq} loop={true}></Lottie>
                </div>
            </div>
        </div>
    );
}