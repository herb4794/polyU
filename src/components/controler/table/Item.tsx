import React from 'react'

const Item = ({product_en_name, product_discount, product_quantity} : any) => {
  return (
    <tr>
      <td className="py-3 px-5 border-b border-blue-gray-50">
        <div className="flex items-center gap-4">
          <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-bold">{product_en_name}</p>
        </div>
      </td>
      <td className="py-3 px-5 border-b border-blue-gray-50">
        <p className="block antialiased font-sans text-xs font-medium text-blue-gray-600">${product_discount}</p>
      </td>
      <td className="py-3 px-5 border-b border-blue-gray-50">
        <div className="w-10/12">
          <p className="antialiased font-sans mb-1 block text-xs font-medium text-blue-gray-600">{product_quantity}</p>
          <div className="flex flex-start bg-blue-gray-50 overflow-hidden w-full rounded-sm font-sans text-xs font-medium h-1">
            <div className="flex justify-center items-center h-full bg-gradient-to-tr from-blue-600 to-blue-400 text-white" ></div>
          </div>
        </div>
      </td>
    </tr>
  )
}

export default Item
