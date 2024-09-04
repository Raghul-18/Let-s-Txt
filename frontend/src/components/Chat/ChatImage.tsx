import React from "react";
import Image from 'next/image';

function ChatImage({ imgURL }: { imgURL: string }) {
  return (
    <div className='w-36 sm:w-44 flex justify-center items-center'>
      <Image 
        src={imgURL} 
        className='object-contain' 
        alt="Chat Image"  // More descriptive alt text
        width={144}       // Explicit width based on w-36 (9rem)
        height={144}      // Explicit height based on w-36 (9rem)
        layout="responsive"  // Ensures the image scales responsively
      />
    </div>
  );
}

export default ChatImage;
