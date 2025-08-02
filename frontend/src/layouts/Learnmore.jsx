import { useGSAP } from '@gsap/react';
import { ArrowUpTrayIcon, ChatBubbleBottomCenterIcon, UserCircleIcon } from '@heroicons/react/16/solid';
import gsap from 'gsap';
import { MoveLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Learnmore = () => {
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(-1);
  };
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
    <div className="text-center py-16">
      <div className="flex items-center justify-center space-x-4 relative">
        <button
          onClick={handleBackClick}
          className="p-2 bg-gray-800 rounded-full text-white hover:bg-gray-600 transition duration-300 absolute md:left-10 left-2"
        >
          <MoveLeft className="w-6 h-6" />
        </button>
        <h2 className="text-4xl font-bold text-white opacity-1 transform translate-y-0">
          How GIT-SH Works
        </h2>
      </div>
      <div className="steps grid grid-cols-1 md:grid-cols-3 gap-6 mt-14">
        <div className="step text-center">
          <div className="flex items-center justify-center opacity-1 translate-y-10" id="text">
            <UserCircleIcon width={70} height={70} />
          </div>
          <h3 className="mt-12 text-xl" id="para">Sign Up / Log In</h3>
          <p id="para">Get started by creating an account or logging in to your existing account.</p>
        </div>

        <div className="step text-center">
          <div className="flex items-center justify-center opacity-1 translate-y-10" id="text">
            <ChatBubbleBottomCenterIcon width={70} height={70} />
          </div>
          <h3 className="mt-12 text-xl" id="para">Chat with Developers</h3>
          <p id="para">Join conversations, share ideas, and collaborate with other devs.</p>
        </div>

        <div className="step text-center " >
          <div className="flex items-center justify-center opacity-1 translate-y-10" id="text">
            <ArrowUpTrayIcon width={70} height={70} />
          </div>
          <h3 className="mt-12 text-xl" id="para">Share & Tweet Code</h3>
          <p id="para">Share your code snippets and tweet them for feedback from your followers.</p>
        </div>


      </div>
    </div>
  )
}

export default Learnmore