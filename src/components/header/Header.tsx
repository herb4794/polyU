import React, { useState, useContext, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ContextObj } from '../../store/Context'


const SignInModal = ({ open, handler }: any) => {

  const { setAuth } = useContext(ContextObj)
  const formRef = useRef<any>()


  return (
    <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal={open}>

      <div className="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden={open}></div>

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">

          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                  <img className="mx-auto h-10 w-auto" src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/How_to_use_icon.svg/2214px-How_to_use_icon.svg.png" alt="Your Blow" />
                  <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">For the machine God</h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                  <form ref={formRef} className="space-y-6" >
                    <div>
                      <label className="block text-sm/6 font-medium text-gray-900">Email address</label>
                      <div className="mt-2">
                        <input type="email" name="email" id="email" required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between">
                        <label className="block text-sm/6 font-medium text-gray-900">Password</label>
                        <div className="text-sm">
                          <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">{/* Forgot password? */}</a>
                        </div>
                      </div>
                      <div className="mt-2">
                        <input type="password" name="password" id="password" required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                      </div>
                    </div>

                    <div>
                      <button type="submit" onClick={() => {
                        const email = formRef.current[0].value
                        const password = formRef.current[1].value
                        setAuth({ email, password })
                        handler()
                      }} className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
                    </div>
                  </form>

                  <p className="mt-10 text-center text-sm/6 text-gray-500">
                    {/* Not a member? */}
                    {/* <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Start a 14 day free trial</a> */}
                  </p>
                </div>
              </div>
              <div className="sm:flex sm:items-start">

              </div>
            </div>
            <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button type="button" onClick={handler} className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}



const Header = () => {

  const [open, setOpen] = useState<boolean>(false)
  const { loginStatus, signOut } = useContext(ContextObj)
  const handleOpen = () => {
    setOpen((cur) => !cur)
    console.log(open)
  }

  return (
    <div>

      {open ? <SignInModal open={open} handler={handleOpen} /> : null}
      <header>
        <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
          <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            <div className="flex items-center">
              <img src="https://i.redd.it/is-there-a-more-correct-lore-accurate-way-for-the-adeptus-v0-zl789e1341kd1.jpg?width=600&format=pjpg&auto=webp&s=ecb01f404f35f5ed8e2dc541a33440f89f9ca2e6" className="mr-3 h-6 sm:h-9" alt="Blow Logo" />
              <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Blow</span>
            </div>
            {
              loginStatus !== true ?
                <button type='button' onClick={handleOpen} className="flex items-center lg:order-2">
                  <a className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">Log in</a>
                </button> :
                <button type='button' onClick={signOut} className="flex items-center lg:order-2">
                  <a className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">Log out</a>
                </button>
            }
            <div className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1" id="mobile-menu-2">
              <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                <li>
                  <Link to={'/'} className="block py-2 pr-4 pl-3 text-white rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 dark:text-white" aria-current="page">Home</Link>
                </li>
                {loginStatus ?
                  <li>
                    <Link to={'/panel'} className="block py-2 pr-4 pl-3 text-white rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 dark:text-white" aria-current="page">Panel</Link>
                  </li> : null}
              </ul>
            </div>
          </div>
        </nav>
      </header>

    </div>
  )
}

export default Header
