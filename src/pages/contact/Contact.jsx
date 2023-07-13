import React, { useEffect, useRef } from "react";
import { IoMdCall } from 'react-icons/io'
import { MdEmail } from 'react-icons/md'
import { ImLocation } from 'react-icons/im'
import { BsInstagram } from 'react-icons/bs'
import emailjs from '@emailjs/browser'
import { toast } from 'react-toastify'

function Contact() {

    useEffect(() => {
        // ANIMASI SLIDE UP DAN SLIDE DOWN
        const element1 = document.querySelector(".animate-slide-up");
        const element2 = document.querySelector(".animate-slide-down");
        element1.classList.add("animate-slide-up-keyframes");
        element2.classList.add("animate-slide-down-keyframes");

    }, [])

    const form = useRef();

    // FUNCTION YG MENGGUNAKAN PACKAGE MANAGER EMAIL JS
    const sendEmail = (e) => {
        e.preventDefault();

        const username = e.target.user_name.value;
        const userEmail = e.target.user_name.value;
        const subject = e.target.subject.value;
        const message = e.target.message.value;

        if (username === "" || userEmail === "" || subject === "" || message === "") {
            return toast.info('Please... type Now!!!')
        }

        const service_id = process.env.REACT_APP_SERVICE_ID;
        const template_id = process.env.REACT_APP_TEMPLATE_ID;
        const public_key = process.env.REACT_APP_PUBLIC_KEY;

        emailjs.sendForm(service_id, template_id, form.current, public_key)
            .then((result) => {
                console.log(result.text);
                toast.success('Submitted!')
                e.target.reset()
            }, (error) => {
                toast.error(error.message)
                console.log(error.text);
            });
    };
    // END FUNCTION YG MENGGUNAKAN PACKAGE MANAGER EMAIL JS


    return (
        <div className="w-full mt-5">
            <div className="flex flex-col w-full md:w-[1000px] mx-auto px-5 mb-7 md:px-0">

                <div className="text-3xl font-semibold md:text-start md:ml-10 mt-24 md:mb-7 mb-5 w-full text-center">
                    <h1 >Contact Us</h1>
                </div>

                <div className="flex md:flex-row flex-col w-full gap-4 justify-center">

                    {/* CONTAINER LEFT */}
                    <form
                        ref={form}
                        onSubmit={sendEmail}
                        autoComplete="off"
                        className="animate-slide-down flex flex-col w-full md:w-[450px] shadow-[#777] shadow-md p-4 rounded-md "
                    >

                        <div className="flex flex-col gap-1 ">
                            <label htmlFor="name" className="font-semibold">
                                Name:
                            </label>
                            <input
                                name="user_name"
                                type="text"
                                placeholder="Full Name"
                                className="w-full border-[1px] border-[#777] outline-blue-500 px-2 py-[7px] rounded-md"
                            />
                        </div>

                        <div className="flex flex-col gap-1 mt-2">
                            <label htmlFor="email" className="font-semibold">
                                Email:
                            </label>

                            <input
                                name="user_email"
                                type="email"
                                placeholder="Yourt active email"
                                className="w-full border-[1px] border-[#777] outline-blue-500 px-2 py-[7px] rounded-md"
                            />
                        </div>

                        <div className="flex flex-col gap-1 mt-2">
                            <label htmlFor="subject" className="font-semibold">
                                Subject:
                            </label>

                            <input
                                name="subject"
                                type="text"
                                placeholder="subject"
                                className="w-full border-[1px] border-[#777] outline-blue-500 px-2 py-[7px] rounded-md"
                            />
                        </div>

                        <div className="flex flex-col gap-1 mt-2">
                            <label htmlFor="message" className="font-semibold">Your Message:</label>
                            <textarea
                                name="message"
                                className="border-[1px] border-[#777] outline-blue-500 rounded-md p-2 h-[120px]"></textarea>
                        </div>

                        <button
                            type="submit"
                            className="w-[150px] bg-blue-500 duration-300 text-white mt-4 p-2 rounded-md hover:bg-blue-600">Send Message</button>
                    </form>
                    {/* END CONTAINER LEFT */}

                    <div className="animate-slide-up w-full md:w-[450px] h-max bg-blue-500 rounded-md p-5 text-white my-5 md:my-0">
                        <h1 className="text-2xl font-semibold">Our Contact Information</h1>
                        <p className="mt-3">Fill the form or contact us via other channels listed below</p>

                        <div className="mt-5 flex flex-col gap-4">
                            <div className="flex items-center gap-1">
                                <IoMdCall />
                                <h1>+628183857768930</h1>
                            </div>

                            <div className="flex item-center gap-1">
                                <MdEmail className="mt-1" />
                                <h1>SupportEshop@gmail.com</h1>
                            </div>
                            <div className="flex items-center gap-1">
                                <ImLocation />
                                <h1>Jakarta,Indonesia</h1>
                            </div>
                            <div className="flex items-center gap-1">
                                <BsInstagram />
                                @hendra89Ms
                            </div>

                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default Contact;