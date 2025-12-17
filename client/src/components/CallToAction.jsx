import { Button } from 'flowbite-react';

export default function CallToAction() {
  return (
    <div className='flex max-w-[60rem] flex-col sm:flex-row p-3 border-4 border-stroke-1 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center bg-stroke-1'>
        <div className="justify-center flex flex-col">
            <h2 className='text-xl font-serif font-semibold text-white'>
                Are you interested about C👀peration?
            </h2>
            <p className='my-2 font-serif text-white'>
                Checkout my Portfolio and Contact me!
            </p>
            <Button gradientDuoTone='purpleToBlue' className='rounded-tl-xl rounded-bl-none'>
                <a href="https://www.100jsprojects.com" target='_blank' rel='noopener noreferrer'>
                    Ak WebDev
                </a>
            </Button>
        </div>
        <div className="p-7 flex-1">
            <img src="https://bairesdev.mo.cloudinary.net/blog/2023/08/What-Is-JavaScript-Used-For.jpg" />
        </div>
    </div>
  )
}