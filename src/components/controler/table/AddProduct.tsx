import React from 'react'
import { get, ref, set } from "firebase/database"
import { db, storage } from '../../../firebase/dbcon'
import { getDownloadURL, ref as storageRef, uploadBytes } from "firebase/storage"

const AddProduct = ({ handleOpen }: any) => {

  const handleFileChange = async ({ file, index }: { file?: File | null, index?: number }) => {
    let imageUrl = ""
    if (file) {
      const imageRef = storageRef(storage, `product/product${index}`)
      const imageUrl = await uploadBytes(imageRef, file)
      return imageUrl
    } else {
      return ""
    }
  }


  return (
    <div>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
        <div className="relative p-4 w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Add Product
              </h3>
              <button onClick={() => handleOpen(false)} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
                <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <form
              onSubmit={async (e: any) => {
                e.preventDefault()
                const fileInput = e.target[3]
                const productRef = ref(db, `product0`)
                try {
                  const snapshot = await get(productRef)
                  if (snapshot.exists()) {
                    const data = snapshot.val()
                    const id = data.length
                    let inputObject = {
                      product_description: e.target[0].value,
                      product_discount: e.target[1].value,
                      product_en_brand: e.target[0].value,
                      product_en_description: e.target[0].value,
                      product_en_name: e.target[0].value,
                      product_image: await handleFileChange({ file: fileInput.files[0], index: id }),
                      product_type: "household appliances",
                    }
                    console.log(id)
                    set(ref(db, `product0`), {
                      ...data,
                      [id]: inputObject,
                    })

                  }
                  handleOpen(false)

                } catch (error: any) {
                  console.log("Adding product error: ", error)

                }
              }}
              className="p-4 md:p-5">
              <div className="grid gap-4 mb-4 grid-cols-2">
                <div className="col-span-2">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                  <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Product Name"
                  />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                  <input type="number" name="price" id="price" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Product Price"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">quantity</label>
                  <input type="number" name="price" id="price" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Product Quantity"
                  />
                </div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" >Upload file</label>
                <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file" />
              </div>
              <button type="submit" className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                add
              </button>
            </form>
          </div>
        </div>
      </div>

    </div>
  )
}

export default AddProduct
