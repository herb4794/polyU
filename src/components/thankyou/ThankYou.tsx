import React from 'react'
import { Link } from 'react-router-dom'

const ThankYou = () => {
  return (
    <div className="text-center p-10">
      <h1 className="text-3xl font-bold mb-4">Thank you for your purchase！</h1>
      <p className="text-lg">We have received your order 🎉</p>
      <Link to="/" className="mt-6 inline-block text-blue-600 underline">Back to Home Page</Link>
    </div>
  )
}

export default ThankYou
