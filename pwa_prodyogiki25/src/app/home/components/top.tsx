import React from 'react'
import Image from 'next/image'

export default function Top() {
  return (
    <div>
            <div className="top-7 left-3 flex flex-row absolute">
              <div className="w-12 h-16 flex flex-row">
                <Image width={149} height={149} src="/images/logo.png" alt="" />
              </div>
              <div className="flex flex-col pt-3 ml-2">
                <div className="text-white">Hello,</div>
                <div className="text-white -mt-1 text-opacity-70 text-[15px]">Welcome to PRODYOGIKI&apos;25</div>
              </div>
            </div>
      
    </div>
  )
}
