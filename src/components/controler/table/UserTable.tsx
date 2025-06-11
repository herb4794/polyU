import React from 'react'

const UserTable = ({ email, name, method }: any) => {
  return (

    <tr>
      <td className="py-3 px-5 border-b border-blue-gray-50">
        <p className="block antialiased font-sans text-xs font-medium text-blue-gray-600">{email}</p>
      </td>
      <td className="py-3 px-5 border-b border-blue-gray-50">
        <div className="w-10/12">
          <p className="antialiased font-sans mb-1 block text-xs font-medium text-blue-gray-600">{name}</p>
          <div className="flex flex-start bg-blue-gray-50 overflow-hidden w-full rounded-sm font-sans text-xs font-medium h-1">
            <div className="flex justify-center items-center h-full bg-gradient-to-tr from-blue-600 to-blue-400 text-white"></div>
          </div>
        </div>
      </td>
      <td className="py-3 px-5 border-b border-blue-gray-50">
        <div className="w-10/12">
          <p className="antialiased font-sans mb-1 block text-xs font-medium text-blue-gray-600">{method}</p>
          <div className="flex flex-start bg-blue-gray-50 overflow-hidden w-full rounded-sm font-sans text-xs font-medium h-1">
            <div className="flex justify-center items-center h-full bg-gradient-to-tr from-blue-600 to-blue-400 text-white"></div>
          </div>
        </div>
      </td>
    </tr >
  )
}

export default UserTable
