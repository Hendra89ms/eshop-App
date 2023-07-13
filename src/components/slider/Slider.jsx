import React, { useEffect, useState } from 'react'
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai'
import { sliderData } from './slider-data'
import './animate.css'

function Slider() {

    useEffect(() => {
        // ANIMATE 
        const element1 = document.querySelector(".animate-slide-up");
        element1.classList.add("animate-slide-up-keyframes");

        setCurrentSlide(0)

    }, [])

    const [currentSlide, setCurrentSlide] = useState(0)
    const slideLength = sliderData.length;

    const prevSLide = () => {
        setCurrentSlide(currentSlide === 0 ? slideLength - 1 : currentSlide - 1);
    }

    const nextSlide = () => {
        setCurrentSlide(currentSlide === slideLength - 1 ? 0 : currentSlide + 1);
    }

    const autoScroll = true;
    let slideInterval;
    let intervalTime = 5000;

    useEffect(() => {
        if (autoScroll) {
            const auto = () => {
                slideInterval = setInterval(nextSlide, intervalTime);
            };
            auto();
        }
        return () => clearInterval(slideInterval);
    }, [currentSlide, slideInterval, autoScroll]);


    return (
        <div className="relative w-full h-[90vh] bg-transparent">

            <div className='text-[orangered] absolute top-[50%]  z-50 cursor-pointer text-lg border-white border-[1px] rounded-full flex items-center justify-center translate-x-[-50%] left-[1.5rem] md:right-[2.5rem] w-[40px] h-[40px]  bg-[#a7a7ac] hover:bg-white duration-800' onClick={prevSLide}>
                <button className='p-2' >
                    <AiOutlineArrowLeft />
                </button>
            </div>

            <div className='text-[orangered] absolute top-[50%]  z-50 cursor-pointer text-lg border-white border-[1px] rounded-full flex items-center justify-center translate-x-[50%] right-[1.5rem] md:right-[2.5rem] w-[40px] h-[40px] bg-[#a7a7ac] hover:bg-white duration-300' onClick={nextSlide}>
                <button className='p-2' >
                    <AiOutlineArrowRight />
                </button>
            </div>

            <div>
                {
                    sliderData.map((slide, index) => {
                        const { image, heading, desc } = slide

                        return (
                            <div
                                key={index}
                                className={`slider-item ${index === currentSlide ? 'active' : ''}`}>
                                {
                                    index === currentSlide && (
                                        <>
                                            <img
                                                src={image}
                                                alt="slide"
                                                className="animate-slide-up w-full h-[90vh] bg-center object-cover absolute top-0 left-0 z-0 "
                                            />
                                            <div className='relative w-full'>
                                                <div className='animate-slide-up absolute md:w-[50%] w-[280px] p-[3rem]  text-white  bg-[#5a5a5a] rounded-md z-[90] bg-opacity-60 left-[50%] top-[12rem] translate-x-[-50%]'>
                                                    <h2 className='text-3xl md:text-4xl font-semibold text-center'>{heading}</h2>
                                                    <p className='mt-2 text-center'>{desc}</p>
                                                    <hr className='text-white text-sm' />
                                                    <div className='w-full flex justify-center items-center'>
                                                        <a href="#products">
                                                            <div
                                                                className='flex justify-center items-center bg-[#1f93ff] mt-4 hover:bg-[#1570c4] duration-300  p-2 rounded-md w-full md:w-[200px] cursor-pointer' >
                                                                Shop Now
                                                            </div>
                                                        </a>
                                                    </div>

                                                </div>
                                            </div>
                                        </>
                                    )
                                }
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Slider