import React from 'react'
import EmblaCarousel from './EmblaCarousel';
import './Embla.css'

const Section1New = () => {
    const OPTIONS = { dragFree: true, loop: true }

    return (
        <div className='relative overflow-x-hidden'>
            <section className="sandbox__carousel w-full">
                <EmblaCarousel options={OPTIONS} />
            </section>
        </div>
    )
}

export default Section1New