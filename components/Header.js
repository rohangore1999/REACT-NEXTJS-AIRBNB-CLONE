import Image from 'next/image';
import React, { useState } from 'react';

import { SearchIcon, GlobeAltIcon, MenuIcon, UserCircleIcon, UsersIcon } from '@heroicons/react/solid'

// to style the datepicker
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

import { DateRangePicker } from 'react-date-range';

// NEXT JS ROUTER
import { useRouter } from 'next/router';




function Header({ placeholder }) {
    // state to handle search Input
    const [searchInput, setSearchInput] = useState("");

    // for datetime picker
    const [startDate, setStartDate] = useState(new Date()); //new Date() >> will give us the today's date
    const [endDate, setEndDate] = useState(new Date()); //new Date() >> will give us the today's date


    const selectionRange = {
        startDate: startDate,
        endDate: endDate,
        key: 'selection',
    }

    const handleSelect = (ranges) => {
        setStartDate(ranges.selection.startDate) //it will get start date and passing to our state
        setEndDate(ranges.selection.endDate) //it will get end date and passing to our state
    }

    // to set guest
    const [noOfGuest, setNoOfGuest] = useState(1) // you will book for 1 atleas


    // For Routing using NEXTJS
    // visit the page and also we can send data in url
    const router = useRouter()

    const search = () => {
        router.push({
            // after clicking on search button
            pathname: '/search', // it will redirect to './search' page
            query: {
                // it will pass all the data in URL
                location: searchInput,
                startDate: startDate.toISOString(),
                endDate: endDate.toISOString(),
                noOfGuest: noOfGuest,
            }
        })
    }

    return (
        <header className='sticky z-50 top-0 grid grid-cols-3 bg-white shadow-md p-5 md:px-10'>

            {/* left section - logo */}
            {/* relative because any thing under that container will be relative, if the component is small then child components will also be small */}
            <div onClick={() => router.push('/')} className='relative flex items-center h-10 hover:cursor-pointer my-auto'>
                {/* to convert normal img to WEB-P */}
                <Image layout='fill' objectFit='contain' objectPosition={'left'} src={'https://links.papareact.com/qd3'} />
            </div>


            {/* Middle section - search  */}
            <div className='flex items-center md:border-2 rounded-full py-2 md:shadow-md'>
                <input value={searchInput} onChange={(e) => setSearchInput(e.target.value)} className='outline-none pl-5 bg-transparent flex-grow text-gray-600 placeholder-gray-400'
                    placeholder={placeholder || 'Start your Search'} type={'text'} />
                    {/* if placeholder present the use it else use that */}

                <SearchIcon className='hidden md:inline-flex h-8 bg-red-400 text-white rounded-full p-2 hover:cursor-pointer md:mx-2 hover:scale-125 transistion transform ease-out duration-150 active:scale-90' />
            </div>


            {/* Right section - Icons */}
            <div className='flex items-center space-x-4 justify-end text-gray-500 bg-white'>
                <p className='hidden md:inline-flex cursor-pointer'>Become a host</p>
                <GlobeAltIcon className='hidden h-6 cursor-pointer hover:scale-125 transistion transform ease-out duration-150 active:scale-90' />

                <div className='flex items-center space-x-2 border rounded-full p-2'>
                    <MenuIcon className='h-6 hover:scale-125 transistion transform ease-out duration-150 active:scale-90' />
                    <UserCircleIcon className='h-6 hover:scale-125 transistion transform ease-out duration-150 active:scale-90' />
                </div>
            </div>

            {searchInput && (
                <div className='flex flex-col col-span-3 mx-auto'>
                    {/* as of <header> is grid grid-cols-3 so to take entire row we use flex and flex-col so that to stack one after another and mx-auto it will center   */}
                    <DateRangePicker
                        ranges={[selectionRange]} //mention above the ranges
                        minDate={new Date()} // minDate is today's date so that you cannot book hotel for past date
                        rangeColors={['#FD5B61']}
                        onChange={handleSelect} //this function will receive the value which user is selecting(start date and end date)
                    />
                    <div className='flex items-center border-b mb-4'>
                        {/* flex-grow >>> h2 will take as much space as possible */}
                        <h2 className='text-2xl flex-grow font-semibold'>Number of Guest</h2>
                        <UsersIcon className='h-5' />
                        <input value={noOfGuest} onChange={(e) => { setNoOfGuest(e.target.value) }} type={'number'} min={1} className='w-12 pl-2 outline-none text-lg text-red-400 hover:scale-125 transition transform duration-300 ease-out active:scale-90 bg-transparent' />
                    </div>

                    {/* cancel and search */}
                    <div className='flex'>
                        {/* when click on cancel it will clear the input field */}
                        <button className='flex-grow text-gray-500 hover:scale-125 transition transform duration-300 ease-out active:scale-90 bg-transparent' onClick={() => { setSearchInput("") }}>Cancel</button>

                        <button onClick={search} className='flex-grow text-[#FD5B61] hover:scale-125 transition transform duration-300 ease-out active:scale-90 bg-transparent'>Search</button>
                    </div>
                </div>
            )}
        </header>
    );
}

export default Header;

