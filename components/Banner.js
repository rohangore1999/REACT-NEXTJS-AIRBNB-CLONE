import React from 'react';
import Image from 'next/image';

function Banner() {
    return (
        <div className='relative h-[300px] sm:h-[400px] lg:h-[500px] xl:h-[600px] 2xl:h-[700px]'>
            {/* relative because any thing under that container will be relative, if the component is small then child components will also be small */}
            <Image objectFit='cover' layout='fill' src={'https://links.papareact.com/0fm'} alt=""/>

            <div className='absolute top-1/2 w-full text-center'>
                {/* top-1/2 >> half of the page */}
                <p className='text-sm sm:text-lg'>Not sure where to go? Perfect.</p>

                <button className='text-purple-500 bg-white px-10 py-4 shadow-md  rounded-full font-bold my-3 hover:shadow-xl active:scale-90 transition duration-150'>Im Flexible</button>
            </div>
        </div>
    );
}

export default Banner;
