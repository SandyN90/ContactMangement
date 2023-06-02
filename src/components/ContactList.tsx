import { useState } from 'react'
import ContactForm from "./ContactForm";
import { AiOutlinePlus } from 'react-icons/ai';
import {BiUser} from 'react-icons/bi';
import { Contact, ContactFormProps } from '../types';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { addContacts, updateList } from '../store/contactStore';

const ContactList = () => {

    const dispatch = useAppDispatch();
    const [contactList, setContactList] = useState([] as Contact[]);
    const [showContactForm, setShowContactForm] = useState(false);
    const [currentData, setCurrentData] = useState({} as Contact);
    const [editContactData, setEditContactData] = useState({ index: -1, edit: false });

    // Data from store is set to project when ever componet re-render
    const listDataFromStore = useAppSelector((state) => state.contact.contactList);

    // Set contact data from contact form to contact list
    const setData = (data: ContactFormProps) => {
        const { formData, showContactForm } = data;
        const contactListCopy = JSON.parse(JSON.stringify(contactList));
        setShowContactForm(showContactForm);
        if (!(formData.lastName && formData.firstName)) return;

        if (editContactData.edit) {
            contactListCopy.splice(editContactData.index, 1, formData);
            setContactList(() => contactListCopy);
            setEditContactData({ index: -1, edit: false });
            setCurrentData({ firstName: "", lastName: "", active: false });
            const storeData = {
                formData: contactListCopy,
                type: ""
            }
            dispatch(updateList(storeData));
        }
        else {
            setContactList(() => [...contactListCopy, formData]);
            const payload = {
                formData,
                type: ""
            }
            dispatch(addContacts(payload))
        }
    }

    // function to delete particular contact from contact list
    const deleteContact = (index: number) => {
        const contactListCopy = JSON.parse(JSON.stringify(contactList));
        contactListCopy.splice(index, 1);
        const storeData = {
            formData: contactListCopy,
            type: ""
        }
        setContactList(contactListCopy);
        dispatch(updateList(storeData));
    }

    // Function to edit particular contact details from the list
    const editContact = (index: number) => {
        const data = contactList[index];
        setEditContactData({ index, edit: true });
        setShowContactForm(true);
        setCurrentData(data);
    }

    return (
        <div>
            {
                !listDataFromStore.length ? <div className='flex justify-center w-screen pt-20'>
                    <div className="text-center">
                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path vector-effect="non-scaling-stroke" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                        </svg>
                        <h3 className="mt-2 text-sm font-medium text-gray-900">No Contacts Found</h3>
                        <p className="mt-1 text-sm text-gray-500">
                            Get started by creating new Contacts.
                        </p>
                        <div className="mt-6">
                            <button type="button"
                                onClick={() => showContactForm ? setShowContactForm(false) : setShowContactForm(true)}
                                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                <AiOutlinePlus className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                                Create Contact
                            </button>
                        </div>
                    </div>
                </div> :
                    <div className="md:flex md:items-center md:justify-between py-10 mx-4">
                        <div className="flex-1 min-w-0">
                            <h2 className="text-2xl font-bold leading-7 sm:text-3xl sm:truncate">
                                Get Your Contact List Here
                            </h2>
                        </div>
                        <div className="mt-4 flex md:mt-0 md:ml-4">
                            <button type="button"
                                onClick={() => showContactForm ? setShowContactForm(false) : setShowContactForm(true)}
                                className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500">
                                Create New Contact
                                <AiOutlinePlus className="ml-2 h-5 w-5" aria-hidden="true" />
                            </button>
                        </div>

                    </div>

            }

            {showContactForm ? <ContactForm getDataFromContactForm={setData} dataToContactForm={currentData} /> : ""}

            {
                listDataFromStore.length ?
                    <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {listDataFromStore.map((contact, index) =>
                            <li key={index} className="col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200">
                                <div className="flex-1 flex flex-col p-8">
                                    <BiUser className="w-32 h-32 flex-shrink-0 mx-auto rounded-full" />

                                    <h3 className="mt-6 text-gray-900 text-sm font-medium">{contact.firstName + ' ' + contact.lastName}</h3>
                                    <dl className="mt-1 flex-grow flex flex-col justify-between">
                                        <dd className="mt-3">
                                            <span className={`${contact.active ? 'text-green-800 bg-green-100' : 'text-red-800 bg-red-100'} px-2 py-1  text-xs font-medium  rounded-full`}>{contact.active ? "Active" : "Inactive"}</span>
                                        </dd>
                                    </dl>
                                </div>
                                <div>
                                    <div className="-mt-px flex divide-x divide-gray-200 justify-center">
                                        <button className=' w-full px-8 py-2 hover:bg-red-300 hover:text-white text-gray-100 bg-red-500 rounded-b' onClick={() => deleteContact(index)}>Delete</button>
                                        <button className='w-full px-8 py-2 hover:bg-green-300 hover:text-white text-gray-100 bg-green-500 rounded-b' onClick={() => editContact(index)}>edit</button>
                                    </div>
                                </div>
                            </li>
                        )}
                    </ul>
                    : ''
            }
        </div>
    );
}

export default ContactList;
