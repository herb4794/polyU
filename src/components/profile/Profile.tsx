import React, { useState, useEffect } from 'react'
import MyCart from './MyCard'

const Profile = ({ information }: any) => {

  const [gitImage, setGitImage] = useState<any>()
  const goGitHub = () => {
    window.open('https://github.com/herb4794')
  }
  useEffect(() => {
    const getGitImage = async () => {
      try {
        const res = await fetch('https://api.github.com/users/herb4794')
        if (res.ok) {
          const imageObj = await res.json()
          const { avatar_url } = imageObj
          setGitImage(avatar_url)
        }
      } catch (error) {
        throw new Error("Failed to fetch image from GitHub API" + error)
      }

      return (await fetch('https://api.github.com/users/herb4794')).json()
    }

    getGitImage()

  }, [gitImage])

  return (
    <div>

      <article className="font-fira mx-auto max-w-3xl p-4 selection:bg-black selection:text-white">
        <h1 className="font-fira mb-8 text-4xl font-bold dark:text-white sm:mt-16">About Me</h1>

        <img className="float-right w-44 rounded-full" src={gitImage} />

        <p className="text-lg dark:text-neutral-200">👋 Welcome. My name  Lawrence Cheng This blog is my summary.
          I am a Degree student majoring in Information security. My interests and strengths lie in 3-tier web development, native
          and progressive web apps development and system programming.</p>
        <br />
        <h1 className="font-bold text-orange-400 font-sans">Skill Highlights</h1>

        <ol>
          <li className="py-3">Responsive web front-end
            development using <p className="font-bold">HTML5,
              JavaScript/Typescript, CSS, bootstrap,
              Tailwindcss, JSON. </p></li>
          <li className="py-3">Three-tier web development with a
            database using <p className='font-bold'>PHP , SQL and
              Firebase.</p></li>
          <li className="py-3">Native Android/iOS apps
            development (three-tier architecture).</li>
          <li className="py-3">Progressive web apps development
            (three-tier architecture) with<p className='font-bold'>Ionic,
              React and Angular.</p> </li>
          <li className="py-3">Single-player 3D and 2D mobile
            game development using <p className='font-bold'>Unity and
              C#.</p></li>
          <li className="py-3">3D modelling and real-time content
            development with 3ds max,Unity
            and Audition.</li>
          <li className="py-3">Linux server setup, administration
            troubleshooting and system programming.</li>
        </ol>

        <section className="mt-12">
          <h2 className="text-3xl font-bold dark:text-white">Software Projects</h2>
          <ol>
            <li className='py-3'>Web Project: HVAR.mall (e-shop front-end):
              <a className='text-blue-500 no-underline hover:underline' href='https://www.youtube.com/watch?v=6RPHVUDAVK8'>https://www.youtube.com/watch?v=6RPHVUDAVK8</a></li>
            <li className='py-3'>PHP Project: HVAR.mall (e-shop back-end):
              <a className='text-blue-500 no-underline hover:underline' href='https://www.youtube.com/watch?v=uqV5fvZ7c8c'>https://www.youtube.com/watch?v=uqV5fvZ7c8c</a></li>
            <li className='py-3'>Open System Administration:
              Linux administration / System building / Build the OpenAI build within server:
              <a className='text-blue-500 no-underline hover:underline' href='https://www.youtube.com/watch?v=yGM0j6V6zr8'> https://www.youtube.com/watch?v=yGM0j6V6zr8</a></li>
            <li className='py-3'>3D Game Project 1: Meat Castle (Tower defence game):
              <a className='text-blue-500 no-underline hover:underline' href='https://www.youtube.com/watch?v=FxFKnesiCqo'> https://www.youtube.com/watch?v=FxFKnesiCqo</a></li>
            <li className='py-3'>3D Game Project 2: Final Space (Running game):
              <a className='text-blue-500 no-underline hover:underline' href='https://www.youtube.com/watch?v=t8taKGlYyeM'> https://www.youtube.com/watch?v=t8taKGlYyeM</a></li>
            <li className='py-3'>3D Game Project 3: ForestMaze (Action shooting game):
              <a className='text-blue-500 no-underline hover:underline' href='https://www.youtube.com/watch?v=sI9VDIierXk'> https://www.youtube.com/watch?v=sI9VDIierXk</a></li>
          </ol>

          <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2">
            {information?.map((item: any, index: number) => {
              const { title, description, image, url, code } = item
              return (<MyCart key={index} code={code} title={title} description={description} image={image} url={url} />)
            })}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-3xl font-bold dark:text-white"></h2>


          <div className="flex w-full items-center font-sans px-4 py-12">
            <img className="w-10 h-10 rounded-full mr-4" src={gitImage} alt="Avatar of Author" />
            <div className="flex-1 px-2">
              <p className="text-base font-bold md:text-xl leading-none mb-2">Lawrence Cheng</p>
              <p className="text-gray-600 text-xs md:text-base">Information Security by
                <a className="text-green-500 no-underline hover:underline" href="https://www.polyu.edu.hk/education/"> Hong Kong polytechnic University</a>
              </p>
            </div>
            <div className="justify-end">
              <button onClick={goGitHub} className="bg-transparent border border-gray-500 hover:border-green-500 text-xs text-gray-500 hover:text-green-500 font-bold py-2 px-4 rounded-full">Read More</button>
            </div>
          </div>

          <p className="mt-6 text-lg dark:text-neutral-200">
            <blockquote className="border-l-4 border-green-500 italic my-8 pl-8 md:pl-12">Do not go gentle into that good night.</blockquote>
          </p>
        </section>

        <section className="mt-12">
          <h2 className="text-3xl font-bold dark:text-white">Education</h2>
          <p className="mt-6 text-lg dark:text-neutral-200">• 2024 - 2026: Bachelor of Science (Honours) in Information Security</p>
          <p className="mt-6 text-lg dark:text-neutral-200">• 2022 - 2024: Hong Kong College of Technology</p>
        </section>
      </article>

    </div>
  )
}

export default Profile
