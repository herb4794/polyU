import React, { createContext, useEffect, useState } from 'react'
import { ref, onValue } from "firebase/database"
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth'
import { db, auth, firestore } from '../firebase/dbcon'

import { doc, setDoc, getDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';

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
  orderArr: any[]
  product: ContextInterface["product"]
  myself: string
  setMyself: (state: string) => void
  education: string
  setEducation: (state: string) => void
  setAuth: (state: any) => void
  auth: any
  setLoginStatus: (state: boolean) => void
  loginStatus: boolean
  signOut: () => void
  googleLogin: () => void
  setOrderArr: (state: any) => void
  totalQuantity: number
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
  orderArr: [],
  myself: "",
  setMyself: () => { },
  education: "",
  setEducation: () => { },
  setAuth: () => { },
  setLoginStatus: () => { },
  auth: {},
  loginStatus: false,
  signOut: () => { },
  googleLogin: () => { },
  setOrderArr: () => { },
  totalQuantity: 0
})

const ContextProvider: React.FC<{ children: any }> = (props: any) => {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [orderArr, setOrderArr] = useState<any[]>([])
  const [getOrderArr, setGetOrderArr] = useState<any>(() => {
    let order = JSON.parse(localStorage.getItem('order') || '[]')
    return order
  })
  const [myself, setMyself] = useState<string>("")
  const [education, setEducation] = useState<string>("")
  const [auths, setAuth] = useState<any>({})
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
    const starCountRef = ref(db, "product")
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val()
      setProduct(data)
      console.log(data)
    })
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuth(user)
        setLoginStatus(true)
      } else {
        setLoginStatus(false)
      }
    })
    const storedOrder = getOrderFromStorage();
    setOrderArr(storedOrder);
    const stored = JSON.parse(localStorage.getItem("order") || "[]");
    setCartItems(stored);
  }, [loginStatus])

  useEffect(() => {
    localStorage.setItem("order", JSON.stringify(cartItems));
  }, [cartItems]);

  const runSignOut = () => {
    auth.signOut()
  }

  const getOrderFromStorage = (): any[] => {
    return JSON.parse(localStorage.getItem("order") || "[]");
  };

  const totalQuantity = cartItems.reduce((sum, item) => sum + Number(item.quantity || 1), 0);

  const checkUser = async (uid: string, checkState: (uid: string) => void) => {
    const docRef = doc(firestore, 'users', uid)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data())
    } else {
      checkState(uid)
    }
  }

  const runSetOrderArr = (_arr: any) => {
    const currentOrder = getOrderFromStorage()

    const isExist = currentOrder.some(
      (item: any) => item.product_en_name === _arr.product_en_name
    )

    if (isExist) {
      toast.error("Item already in cart", {
        position: "top-center",
        autoClose: 1000,
      })
      return
    }
    const updatedOrder = [...currentOrder, _arr]
    localStorage.setItem("order", JSON.stringify(updatedOrder))
    setOrderArr(updatedOrder)
    toast.success("Item added to cart", {
      position: "top-center",
      autoClose: 1000
    })
  }

  const googleLogin = () => {
    const provider = new GoogleAuthProvider()


    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result)
        const token = credential?.accessToken ?? "undefinded"
        const user = result.user
        const uid = user.uid
        sessionStorage.setItem('token', token)
        sessionStorage.setItem('uid', uid)
        setLoginStatus(true)
        checkUser(uid, async (uid) => {
          await setDoc(doc(firestore, "users", uid), {
            email: user.email,
            imageUrl: user.photoURL,
            method: "google",
            name: user.displayName,
            orders: []
          })
        })
        console.log(user)
        console.log("google")
      }).catch((error: any) => {
        console.log(error)
      })
  }

  const runSetAuth = (_state: { email: string, password: string }) => {
    signInWithEmailAndPassword(auth, _state.email, _state.password)
      .then((userCredential) => {
        const user = userCredential.user
        checkUser(user.uid, async (uid) => {
          await setDoc(doc(firestore, "users", uid), {
            email: user.email,
            imageUrl: user.photoURL,
            method: "local",
            name: user.displayName,
            orders: []
          })
        })
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage)
        console.log(errorCode)
      })
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
  const removeOrderArrFunc = (index: number) => {
    const newOrderArr = orderArr.filter((item: any, i: number) => i !== index)
    setOrderArr(newOrderArr)
  }

  const contextValue: ContextType = {
    auth: auths,
    signOut: runSignOut,
    setAuth: runSetAuth,
    setLoginStatus: runSetLoginStatus,
    loginStatus: loginStatus,
    product: product,
    myself: myself,
    setMyself: runSetself,
    education: education,
    setEducation: runSeteducation,
    googleLogin: googleLogin,
    setOrderArr: runSetOrderArr,
    orderArr: getOrderArr,
    totalQuantity: totalQuantity

  }
  return <ContextObj.Provider value={contextValue}>{props.children}</ContextObj.Provider>
}

export default ContextProvider
