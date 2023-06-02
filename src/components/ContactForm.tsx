import React from "react";
import { useEffect, useState } from 'react'
import { ContactProps } from "../types";

const ContactForm: React.FC<ContactProps> = ({ getDataFromContactForm, dataToContactForm }) => {

    const [payload, setPayload] = useState({
        firstName: "",
        lastName: "",
        active: false
    });

    // Updated lifecycle hook
    useEffect(() => {
        setPayload(dataToContactForm);
    }, [dataToContactForm]);

    // Function to clear form data
    const clear = () => {
        const data = {
            firstName: "",
            lastName: "",
            active: false
        }
        setPayload(data);
        getDataFromContactForm({ formData: data, showContactForm: false });
    }

    // Function to handle save data of contact form
    const save = () => {
        const data = {
            formData: payload,
            showContactForm: false
        }
        getDataFromContactForm(data);
        clear();
    }

    return (
        <>
            <div className="w-screen h-screen flex items-center top-0 absolute bg-gray-300">
                <div className='max-w-4xl mx-auto border border-gray-200 rounded-md py-20 bg-gray-50'>
                    <div className='max-w-xl mx-10'>
                        <h1 className='text-center text-3xl pb-20'>Contact Form</h1>
                        <div className='grid'>
                            <div className='mb-5'>
                                <label htmlFor="email" className='text-gray-600'> Fist Name</label>
                                <input type="text" value={payload.firstName || ''} onChange={($event) => setPayload({ ...payload, firstName: $event.target.value, active: false })} className='border border-gray-200 w-full rounded-md p-1 focus:outline-none' id="email" />
                            </div>
                            <div className='mb-5'>
                                <label htmlFor="name" className='text-gray-600'>Last Name</label>
                                <input type="text" value={payload.lastName || ''} onChange={($event) => setPayload({ ...payload, lastName: $event.target.value, active: false })} className='border border-gray-200 w-full rounded-md p-1 focus:outline-none' id='name' />
                            </div>
                            <div className='flex justify-start w-4/12'>
                                <div className='flex items-center justify-between w-full'>
                                    <span>Status: </span>
                                    <div className="flex">
                                        <div className='flex items-center'>
                                            <label htmlFor="active" className='input px-2 py-1'>Active</label>
                                            <input type="radio" id='active' checked={payload.active || false} onChange={() => setPayload({ ...payload, active: true })} />
                                        </div>

                                        <div className='flex items-center'>
                                            <label htmlFor="inactive" className='input px-2 py-1'>Inactive</label>
                                            <input type="radio" id='inactive' checked={!payload.active || false} onChange={() => setPayload({ ...payload, active: false })} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-center gap-5 pt-16'>
                        <button className='px-8 py-2 hover:bg-blue-300 hover:text-white text-gray-100 bg-blue-500 rounded-full' onClick={() => clear()}>Cancel</button>
                        <button className='px-8 py-2 hover:bg-green-300 hover:text-white text-gray-100 bg-green-500 rounded-full' onClick={() => save()}>Save</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ContactForm;