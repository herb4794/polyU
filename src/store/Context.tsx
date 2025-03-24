import React, { createContext, useEffect, useState } from 'react'
import { ref, onValue } from "firebase/database"
import { db } from '../firebase/dbcon'


interface ContextInterface {
  product: {
    porduct_description: string
    product_discount: any
    product_price: any
    product_en_brand: string
    product_en_name: string
    product_image: string
    product_name: string
    product_quantity: string
    product_tc_brand: string
    product_tc_description: string
    product_tc_name: string
    product_type: string
  }[]
}

type ContextType = {
  product: ContextInterface["product"]
  myself: string
  setMyself: (state: string) => void
  education: string
  setEducation: (state: string) => void
  setAuth: (state: any) => void
  auth: any
  setLoginStatus: (state: boolean) => void
  loginStatus: boolean
}

export const ContextObj = createContext<ContextType>({
  product: [{
    product_discount: "",
    product_name: "",
    product_type: "",
    product_image: "",
    product_en_name: "",
    product_tc_name: "",
    product_en_brand: "",
    product_quantity: "",
    product_tc_brand: "",
    porduct_description: "",
    product_tc_description: "",
    product_price: ""
  }],
  myself: "",
  setMyself: () => { },
  education: "",
  setEducation: () => { },
  setAuth: () => { },
  setLoginStatus: () => { },
  auth: {},
  loginStatus: false
})

const ContextProvider: React.FC<{ children: any }> = (props: any) => {

  const [myself, setMyself] = useState<string>("")
  const [education, setEducation] = useState<string>("")
  const [auth, setAuth] = useState<any>({})
  const [loginStatus, setLoginStatus] = useState<boolean>(false)
  const [product, setProduct] = useState<ContextInterface['product']>([{
    product_price: "",
    product_discount: "",
    product_name: "",
    product_type: "",
    product_image: "",
    product_en_name: "",
    product_tc_name: "",
    product_en_brand: "",
    product_quantity: "",
    product_tc_brand: "",
    porduct_description: "",
    product_tc_description: ""
  }])
  useEffect(() => {
    setMyself("Lawrence Cheng")
    setEducation("Hong Kong Polytechnic University")
    const starCountRef = ref(db, "product")
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val()
      setProduct(data)
    })
  }, [])


  const runSetAuth = (_state: any) => {
    setAuth(_state)
  }

  const runSetLoginStatus = (_state: boolean) => {
    setLoginStatus(_state)
  }
  const runSetself = (_state: string) => {
    setMyself(_state)
  }

  const runSeteducation = (_state: string) => {
    setEducation(_state)
  }


  const contextValue: ContextType = {
    auth: auth,
    setAuth: runSetAuth,
    setLoginStatus: runSetLoginStatus,
    loginStatus: loginStatus,
    product: product,
    myself: myself,
    setMyself: runSetself,
    education: education,
    setEducation: runSeteducation
  }
  return <ContextObj.Provider value={contextValue}>{props.children}</ContextObj.Provider>
}

export default ContextProvider
