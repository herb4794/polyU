import React from 'react'
import { IoMdSettings } from "react-icons/io";

const DbFooter = () => {

  return (
    <div className="text-blue-gray-600">
      <footer className="py-2">
        <div className="flex w-full flex-wrap items-center justify-center gap-6 px-2 md:justify-between">
          <p className="block antialiased font-sans text-sm leading-normal font-normal text-inherit">© 2025, made with
            <div className="-mt-0.5 inline-block h-2.6 w-3.5">
              <IoMdSettings />
            </div>
            by <a href="https://www.creative-tim.com" target="_blank" className="transition-colors hover:text-blue-500">Lawrence Cheng</a> for a better web. </p>
          <ul className="flex items-center gap-4">
            <li>
              <a href="#" className="block antialiased font-sans text-sm leading-normal py-0.5 px-1 font-normal text-inherit transition-colors hover:text-blue-500">Blog</a>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  )
}

export default DbFooter
