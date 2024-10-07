import { FunctionComponent, ReactNode, useState } from 'react'
import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'

interface CarouselProps {
  slides: ReactNode[]
}

const Carousel: FunctionComponent<CarouselProps> = ({ slides }) => {
  const [loaded, setLoaded] = useState(false)
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    created() {
      setLoaded(true)
    },
    breakpoints: {
      '(min-width: 800px)': {
        slides: { perView: 2, spacing: 50 },
      },
      '(min-width: 1000px)': {
        slides: { perView: 3, spacing: 50 },
      },
    },
    slides: { perView: 1 },
    loop: true,
  })

  const handlePrevClick = (e: React.MouseEvent<SVGSVGElement>) => {
    e.stopPropagation()
    instanceRef.current!.prev()
  }

  const handleNextClick = (e: React.MouseEvent<SVGSVGElement>) => {
    e.stopPropagation()
    instanceRef.current!.next()
  }

  return (
    <>
      <div className='relative'>
        <div ref={sliderRef} className='keen-slider'>
          {slides.map((SlideElement, index) => (
            <div className='keen-slider__slide py-5' key={index}>
              {SlideElement}
            </div>
          ))}
        </div>
        {loaded && instanceRef.current && (
          <div className='absolute top-1/2 -translate-y-1/2 flex w-full justify-between'>
            <ChevronLeftIcon className='w-10 cursor-pointer relative -left-7' onClick={(e) => handlePrevClick(e)} />
            <ChevronRightIcon className='w-10 cursor-pointer relative -right-7' onClick={(e) => handleNextClick(e)} />
          </div>
        )}
      </div>
    </>
  )
}

export default Carousel
