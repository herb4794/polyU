import { ContextObj } from "./store/Context";
import { useContext, useEffect, useState } from "react";
import { mobileDevelopment, socialMedia, webDevelopment } from './assets'
import MyCard from "./components/MyCard";
import Profile from "./components/Profile";

function App() {
  const context = useContext(ContextObj)
  const [ownCard, setOwnCard] = useState<any[]>([
    { title: "Web Project", description: "HVAR.mall (e-shop back-end): A scalable PHP solution for managing products, orders, and customer data, ensuring a seamless shopping experience.", image: webDevelopment, url: "https://github.com/herb4794/firebase_Assignemnt_php", code: ["php", "html", "css", "js"] },
    { title: "Flutter Project", description: "It is my flutter project from year 2 mobile application study, by using flutter to create mobile app of e-comme.", image: mobileDevelopment, url: "https://github.com/herb4794/flutter_project", code: ["flutter", "firebase"] },
    { title: "React Project", description: "My personal website powered by React, delivering a captivating web application experience.", image: socialMedia, url: "https://github.com/herb4794/blog", code: ["react", "ts", "html", "tailwindcss"] },
  ])
  return (
    <div className="min-h-screen dark:bg-neutral-900">

      {/* <header className="fixed inset-x-0 bottom-0 bg-neutral-800 sm:relative"> */}
      {/*   <div className="mx-auto justify-between p-3 sm:flex sm:max-w-4xl sm:p-4"> */}

      {/*     <a href="#" className="hidden items-center gap-1 sm:flex"> */}
      {/*       <img className="inline-block w-8 object-cover" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxMXx8aGVhZHNob3R8ZW58MHwxfHx8MTY5MDI3MTY4Nnww&ixlib=rb-4.0.3&q=80&w=1080" /> */}
      {/*       <span className="font-fira text-lg font-bold text-white">Aleksandr Hovhannisyan</span> */}
      {/*     </a> */}

      {/*     <div className="flex sm:gap-2"> */}
      {/*       <a href="#" */}
      {/*         className="block flex-1 py-2 text-center text-lg text-white hover:bg-neutral-700 sm:hidden sm:px-3">Home</a> */}
      {/*       <a href="#" className="block flex-1 bg-neutral-700 py-2 text-center text-lg text-white sm:px-3">About</a> */}
      {/*       <a href="#" className="block flex-1 py-2 text-center text-lg text-white hover:bg-neutral-700 sm:px-3">Art</a> */}
      {/*       <a href="#" className="block flex-1 py-2 text-center text-lg text-white hover:bg-neutral-700 sm:px-3">Blog</a> */}
      {/*     </div> */}
      {/*   </div> */}
      {/* </header> */}
      <Profile information={ownCard} />

      {/* <section className="container text-center mx-auto px-8 py-8 lg:py-40"> */}
      {/*   <h2 className="block antialiased tracking-normal font-sans text-4xl font-semibold leading-[1.3] text-blue-gray-900 lg:!text-4xl">Lawrence Cheng Profile</h2> */}
      {/*   <p className="block antialiased font-sans text-xl font-normal leading-relaxed text-inherit text-center mt-2 w-full !text-gray-500 ">Side Projects.</p> */}
      {/*   <a href="https://www.material-tailwind.com/" target="_blank">Developed with <b>React</b> by Lawrence Cheng</a>. */}
      {/*   <div className="mt-10 grid grid-cols-1 gap-2 lg:grid-cols-3"> */}
      {/*     {ownCard?.map((item, index) => { */}
      {/*       return <MyCard key={index} {...item} /> */}
      {/*     })} */}
      {/*   </div> */}
      {/* </section> */}

      <section className="font-fira mt-10 bg-neutral-800 p-8 pb-20 sm:pb-8">
        <div className="mx-auto flex flex-col sm:max-w-4xl sm:flex-row sm:justify-between">
          <div className="flex flex-col items-center sm:items-start">
            <h3 className="text-2xl font-bold text-white">Thanks for reading!</h3>
            <p className="mt-2 text-neutral-200">© by Lawrence Cheng</p>
            <p className="mt-2 text-sm text-neutral-200">Last built on Tuesday, October 4, 2026 at 10:28 PM UTC</p>
          </div>

          <div className="mt-8 flex justify-center gap-4">
            {/* <a href="#" className="text-white hover:underline sm:text-lg">Twitter</a> */}
            {/* <a href="#" className="text-white hover:underline sm:text-lg">GitHub</a> */}
            {/* <a href="#" className="text-white hover:underline sm:text-lg">LinkedIn</a> */}
            {/* <a href="#" className="text-white hover:underline sm:text-lg">Sitemap</a> */}
            {/* <a href="#" className="text-white hover:underline sm:text-lg">RSS</a> */}
          </div>
        </div>
      </section>
    </div>

  );
}

export default App;
