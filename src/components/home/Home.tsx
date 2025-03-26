import React from 'react'
import Header from '../header/Header'
import Profile from '../profile/Profile'

const Home = ({ ownCard }: any) => {
  return (
    <div>
      <div className="min-h-screen dark:bg-neutral-900">

        <Header />

        <Profile information={ownCard} />

        <footer className="mx-auto mt-32 w-full max-w-container px-4 sm:px-6 lg:px-8" aria-labelledby="footer-heading">
          <div className="items-centers grid grid-cols-1 justify-between gap-4 border-t border-gray-100 py-6 md:grid-cols-2">
            <p className="text-sm/6 text-gray-600 max-md:text-center">
              ©
              <a>Create by Lawrence Cheng</a>. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default Home
