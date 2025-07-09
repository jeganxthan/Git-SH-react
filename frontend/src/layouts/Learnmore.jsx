import { useGSAP } from '@gsap/react';
import { ArrowUpTrayIcon, ChatBubbleBottomCenterIcon, UserCircleIcon } from '@heroicons/react/16/solid';
import gsap from 'gsap';
import React from 'react'

const Learnmore = () => {
 useGSAP(() => {
          gsap.from("#text", {
              ease: "power1.inOut",
              opacity: 0,
              y: 0,
          });
  
          gsap.fromTo(
              "#para",
              {
                  opacity: 0,
                  y: 20,
              },
              {
                  ease: "power1.inOut",
                  opacity: 1,
                  y: 10,
                  delay: 1,
                  stagger: 0.2,
              }
          );
      }, []);
  return (
    <div className="how-it-works text-center py-16">
  <h2 className="text-4xl font-bold text-white opacity-1 translate-y-10 " id="text">How GIT-SH Works</h2>
  <div className="steps grid grid-cols-1 md:grid-cols-3 gap-6 mt-14">

    <div className="step text-center">
        <div className="flex items-center justify-center opacity-1 translate-y-10" id="text">
        <UserCircleIcon width={70} height={70}/>
        </div>
      <h3 className="mt-12 text-xl" id="para">Sign Up / Log In</h3>
      <p id="para">Get started by creating an account or logging in to your existing account.</p>
    </div>

    <div className="step text-center">
        <div className="flex items-center justify-center opacity-1 translate-y-10" id="text">
        <ChatBubbleBottomCenterIcon width={70} height={70}/>
        </div>
      <h3 className="mt-12 text-xl" id="para">Chat with Developers</h3>
      <p id="para">Join conversations, share ideas, and collaborate with other devs.</p>
    </div>

    <div className="step text-center " >
        <div className="flex items-center justify-center opacity-1 translate-y-10" id="text">
        <ArrowUpTrayIcon width={70} height={70}/>
        </div>
      <h3 className="mt-12 text-xl" id="para">Share & Tweet Code</h3>
      <p id="para">Share your code snippets and tweet them for feedback from your followers.</p>
    </div>


  </div>
</div>
  )
}

export default Learnmore