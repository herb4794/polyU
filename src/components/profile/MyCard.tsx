import React from 'react'

const MyCart = ({ title, description, image, url, code }: any) => {
  return (
    <div>

      <section
        onClick={() => { window.location.href = url }}
        className="card cursor-pointer rounded p-5 shadow-sm shadow-black/60 transition hover:-translate-y-2 hover:shadow-md hover:shadow-black/50 dark:bg-neutral-800">
        <header className="flex items-center justify-between dark:text-gray-50">
          <h3 className="text-lg font-bold">{title}</h3>
          <span></span>
        </header>
        <div className="mt-2 dark:text-gray-300">{description}</div>

        <footer className="my-4 flex gap-1">
          {code?.map((item: any, index: number) => {
            return <span key={index} className="bg-neutral-100 px-4 py-1 text-sm dark:bg-neutral-600 dark:text-gray-50">{item}</span>
          })}
        </footer>
      </section>
    </div>
  )
}

export default MyCart
