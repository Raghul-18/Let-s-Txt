import React from "react";
import Image from 'next/image';

function ChatImage({ imgURL }: { imgURL: string }) {
  return (
    <div className='w-36 sm:w-44 flex justify-center items-center'>
      <Image src={imgURL} className='object-contain' alt="Logo"/>
    </div>
  );
}

export default ChatImage;
