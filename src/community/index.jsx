import { Button } from '@/components/ui/button';
import React from 'react';
import DiscordImg from "../assets/Discord.svg"

function Community() {
  return (
    <div className='bg-gradient-to-b from-indigo-800 to-indigo-500 w-screen h-screen'>
      <div className='w-full h-full flex justify-center items-center'>
        <div className='bg-neutral-700 w-[20rem] h-[14rem] p-4 font-semibold'>
           <h1 className='text-lg text-white text-center'>Join Our Community</h1>
           <p className='text-sm text-center text-red-100 mt-4 mb-4'>Friends bailing on Goa? Join our crew for real adventures. Let's make it happen. ✈️🏖️</p>
           <div className='w-full flex justify-center flex-col items-center'>
            
            <a href='https://discord.gg/F2YwDrv5rX' target='blank'>
            <Button>
            <img src={DiscordImg} className='px-2' />
                Join Our Discord Server</Button>
            </a>
           </div>
        </div>
      </div>
    </div>
  );
}

export default Community;
