import React, { useEffect, useState } from 'react'
import EditProduct from './EditProduct'

const Item = ({ product_en_name, product_discount, product_quantity, productId }: any) => {

  const [open, setOpen] = useState<boolean>(false)
  const [editProduct, setEditProduct] = useState<any>(null);

  const handleOpen = (cur: boolean) => {
    setOpen(cur);
  }
  const handleEdit = (item: any) => {
    setEditProduct(item);
    setOpen(true);
  };
  const product = {
    productId,
    product_en_name,
    product_discount,
    product_quantity
  }
  useEffect(() => {

  }, [open])


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
            <div className="flex justify-center items-center h-full bg-gradient-to-tr from-blue-600 to-blue-400 text-white"></div>
          </div>
        </div>
      </td>
      <td className="py-3 px-5 border-b border-blue-gray-50">
        <div className="w-10/12">
          <button onClick={() => handleEdit(product)} data-modal-target="crud-modal" data-modal-toggle="crud-modal" className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
            Edit
          </button>
          {open && editProduct?.productId === product.productId && (
            <EditProduct
              key={productId}
              handleOpen={handleOpen}
              product={editProduct} />)}
          <div className="flex flex-start bg-blue-gray-50 overflow-hidden w-full rounded-sm font-sans text-xs font-medium h-1">
            <div className="flex justify-center items-center h-full bg-gradient-to-tr from-blue-600 to-blue-400 text-white"></div>
          </div>
        </div>
      </td>
    </tr>
  )
}

export default Item
