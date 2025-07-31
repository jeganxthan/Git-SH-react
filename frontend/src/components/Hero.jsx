import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import bg from '/bg.png';
import { useNavigate } from 'react-router-dom';

gsap.registerPlugin(useGSAP);
const Hero = () => {
    const navigate = useNavigate(); 
  const handleClick = () => {
    navigate("/learn-more"); 
  };
    const godRef = useRef();
    const textRef = useRef();
    const paraRef = useRef();
    const authRef = useRef();
    const getRef = useRef();

    useGSAP(() => {
        gsap.from(godRef.current, {
            y: 350,
            duration: 1,
            ease: 'power1.inOut',
        });

        gsap.from(textRef.current, {
            ease: "power1.inOut",
            opacity: 0,
            y: -30,
        });

        gsap.fromTo(
            paraRef.current,
            { opacity: 0, y: 20 },
            {
                ease: "power1.inOut",
                opacity: 1,
                y: 0,
                delay: 1,
                stagger: 0.1,
            }
        );

        gsap.from(authRef.current, {
            x: 200,
            duration: 1.5,
            ease: "power1.inOut",
        });

        gsap.from(getRef.current, {
           y: 600,
            duration: 1.5,
            ease: "power1.inOut",
        });
    }, []);

    return (
        
        <div className="h-screen w-screen overflow-hidden flex flex-col">
            <div ref={authRef} className="flex justify-end gap-4 px-6 py-4">
                <button className="text-white bg-gray-700 px-4 py-2 rounded" onClick={()=>navigate("/signup")}>Sign-Up</button>
                <button className="text-white bg-gray-700 px-4 py-2 rounded" onClick={()=>navigate("/login")}>Login</button>
            </div>

            <div className="flex-1 flex flex-col md:flex-row items-center justify-center px-4 md:px-12 relative">

                <div ref={godRef} className="hidden md:block md:w-1/2">
                    <img src={bg} alt="background" className="w-full h-auto object-contain" />
                </div>

                <div className="flex flex-col items-center text-center md:w-1/2">
                    <h1 ref={textRef} className="text-5xl md:text-6xl font-bold mb-6 text-gray-600">
                        GIT-SH
                    </h1>

                    <p ref={paraRef} className="text-lg text-gray-700 max-w-xl">
                        GIT-SH is your one-stop platform for developers to <strong>chat</strong>,{" "}
                        <strong>tweet code snippets</strong>, and{" "}
                        <strong>share code directly</strong> with friends — all in one place.
                    </p>

                    <div ref={getRef} className="mt-8 flex flex-wrap justify-center gap-4">
                        <button className="px-6 py-3 bg-gray-600 text-white rounded hover:bg-gray-700">
                            Get Started
                        </button>
                        <button className="px-6 py-3 border border-gray-600 text-gray-600 rounded hover:bg-blue-50" onClick={handleClick}>
                            Learn More
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
