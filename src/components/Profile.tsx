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

        <p className="text-lg dark:text-neutral-200">👋 Welcome. This blog is my summary. <kbd className="rounded bg-neutral-200/50 p-1">e</kbd>
          I am a Degree student majoring in Information security. My interests and strengths lie in 3-tier web development, native
          and progressive web apps development and system programming.</p>
        <br />
        <h1 className="font-bold font-sans">Skill Highlights</h1>

        <ol>
          <li className="py-3">Responsive web front-end
            development using HTML5,
            JavaScript, CSS, bootstrap,
            Tailwindcss, JSON.</li>
          <li className="py-3">Three-tier web development with a
            database using PHP , SQL and
            Firebase.</li>
          <li className="py-3">Native Android/iOS apps
            development (three-tier architecture).</li>
          <li className="py-3">Progressive web apps development
            (three-tier architecture) with Ionic,
            React and Angular.</li>
          <li className="py-3">Single-player 3D and 2D mobile
            game development using Unity and
            C#.</li>
          <li className="py-3">3D modelling and real-time content
            development with 3ds max, Unity
            and Audition.</li>
          <li className="py-3">Linux server setup, administration
            and troubleshooting.</li>
        </ol>

        <section className="mt-12">
          <h2 className="text-3xl font-bold dark:text-white">Software Projects</h2>
          <ol>
            <li className='py-3'>Web Project: HVAR.mall (e-shop front-end):
              <a className='text-blue-500 no-underline hover:underline' href='https://www.youtube.com/watch?v=6RPHVUDAVK8'>https://www.youtube.com/watch?v=6RPHVUDAVK8</a></li>
            <li className='py-3'>PHP Project: HVAR.mall (e-shop back-end):
              <a className='text-blue-500 no-underline hover:underline' href='https://www.youtube.com/watch?v=uqV5fvZ7c8c'>https://www.youtube.com/watch?v=uqV5fvZ7c8c</a></li>
            <li className='py-3'>Open System Administration:
              Linux administration / System building / Build the OpenAI build within server
              <a className='text-blue-500 no-underline hover:underline' href='https://www.youtube.com/watch?v=yGM0j6V6zr8'>https://www.youtube.com/watch?v=yGM0j6V6zr8</a></li>
            <li className='py-3'>3D Game Project 1: Meat Castle (Tower defence game)
              <a className='text-blue-500 no-underline hover:underline' href='https://www.youtube.com/watch?v=FxFKnesiCqo'>https://www.youtube.com/watch?v=FxFKnesiCqo</a></li>
            <li className='py-3'>3D Game Project 2: Final Space (Running game)
              <a className='text-blue-500 no-underline hover:underline' href='https://www.youtube.com/watch?v=t8taKGlYyeM'>https://www.youtube.com/watch?v=t8taKGlYyeM</a></li>
            <li className='py-3'>3D Game Project 3: ForestMaze (Action shooting game)
              <a className='text-blue-500 no-underline hover:underline' href='https://www.youtube.com/watch?v=sI9VDIierXk'>https://www.youtube.com/watch?v=sI9VDIierXk</a></li>
          </ol>

          <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2">
            {information?.map((item: any, index: number) => {
              const { title, description, image, url, code } = item
              return (<MyCart key={index} code={code} title={title} description={description} image={image} url={url} />)

            })}


            {/* <section className="flex flex-col items-center justify-center"> */}
            {/*   <header> */}
            {/*     <h3 className="text-xl font-bold dark:text-white">Want to  wsee more of my work</h3> */}
            {/*     <h4 className="text-center text-lg dark:text-neutral-200">Check out my other repos:</h4> */}
            {/*   </header> */}
            {/*   <div className="mt-4"> */}
            {/*     <a href="#"> */}
            {/*       <svg className="h-12 text-black dark:text-white" role="img" viewBox="0 0 24 24" */}
            {/*         xmlns="http://www.w3.org/2000/svg"> */}
            {/*         <title>GitHub</title> */}
            {/*         <path fill="currentColor" */}
            {/*           d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"> */}
            {/*         </path> */}
            {/*       </svg> */}
            {/*     </a> */}
            {/*   </div> */}
            {/* </section> */}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-3xl font-bold dark:text-white"></h2>


          <div className="flex w-full items-center font-sans px-4 py-12">
            <img className="w-10 h-10 rounded-full mr-4" src={gitImage} alt="Avatar of Author" />
            <div className="flex-1 px-2">
              <p className="text-base font-bold md:text-xl leading-none mb-2">Lawrence Cheng</p>
              <p className="text-gray-600 text-xs md:text-base">Information Security by
                <a className="text-green-500 no-underline hover:underline" href="https://www.polyu.edu.hk/education/"> PolyU</a>
              </p>
            </div>
            <div className="justify-end">
              <button onClick={goGitHub} className="bg-transparent border border-gray-500 hover:border-green-500 text-xs text-gray-500 hover:text-green-500 font-bold py-2 px-4 rounded-full">Read More</button>
            </div>
          </div>

          <p className="mt-6 text-lg dark:text-neutral-200">
            <blockquote className="border-l-4 border-green-500 italic my-8 pl-8 md:pl-12">In all things seen, in all things not Eternal essence, never forgot Whole and complete, one of a kind Undivided, body and mind.</blockquote>
          </p>
        </section>

        <section className="mt-12">
          <h2 className="text-3xl font-bold dark:text-white">Education</h2>
          <p className="mt-6 text-lg dark:text-neutral-200">• 2024- 2026: Bachelor of Science (Honours) in Information Security</p>
          <p className="mt-6 text-lg dark:text-neutral-200">• 2022-2024: Hong Kong College of Technology</p>
        </section>
      </article>

    </div>
  )
}

export default Profile
