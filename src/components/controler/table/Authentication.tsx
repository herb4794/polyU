import React, { useEffect, useState } from 'react'
import Sidebar from '../../sidebar/Sidebar'
import HeaderDashboard from '../HeaderDashboard'
import Item from './Item'
import { collection, doc, getDocs, onSnapshot } from "firebase/firestore";
import { firestore } from '../../../firebase/dbcon';
import UserTable from './UserTable'

const Authentication = () => {

  const [userData, setUserData] = useState<any>()


  useEffect(() => {

    const getData = async () => {
      const result = await getDocs(collection(firestore, "users"));

      const newData: any = [];
      result.forEach((doc: any) => {
        const source = doc.data();
        newData.push(source);
      });

      setUserData(newData);
    };

    getData()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50/50">
      <Sidebar />
      <div className='p-4 xl:ml-80'>
        <HeaderDashboard />

        <div className="p-6 overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                <th className="border-b border-blue-gray-50 py-3 px-6 text-left">
                  <p className="block antialiased font-sans text-[11px] font-medium uppercase text-blue-gray-400">Email</p>
                </th>
                <th className="border-b border-blue-gray-50 py-3 px-6 text-left">
                  <p className="block antialiased font-sans text-[11px] font-medium uppercase text-blue-gray-400">Name</p>
                </th>
                <th className="border-b border-blue-gray-50 py-3 px-6 text-left">
                  <p className="block antialiased font-sans text-[11px] font-medium uppercase text-blue-gray-400">MEthod</p>
                </th>
              </tr>
            </thead>
            <tbody>
              {
                userData ? userData.map((res : any) => {
                  return <UserTable email={res.email} name={res.name} method={res.method} />
                }) : null
              }
            </tbody>
          </table>
        </div>

      </div>

    </div>
  )
}

export default Authentication
