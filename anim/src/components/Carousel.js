import React, { Children, useState } from 'react';
import classes from './Carousel.module.css'

const widthSpan = 100.1

function Carousel(props) {
    const [sliderPosition, setSliderPosition] = useState(0);
    const [swiped, setSwiped] = useState(false);
    const [mouseStartPosition, setMouseStartPosition] = useState(0);
    const [mouseEndPosition, setMouseEndPosition] = useState(0);
    const [mouseClicked, setMouseClicked] = useState(false);
    const [mouseSwiped, setMouseSwiped] = useState(false);

    const { children, infinite } = props;

    const prevSlideHandler = () => {
        let newPosition = sliderPosition;
        if (newPosition > 0) {
            newPosition = newPosition - 1;
        } else if (infinite) {
            newPosition = children.length - 1;
        }
        translateFullSlides(newPosition);
        setSliderPosition(newPosition);
    }

    const nextSlideHandler = () => {
        let newPosition = sliderPosition;
        if (newPosition < children.length - 1) {
            newPosition = newPosition + 1;
        } else if (infinite) {
            newPosition = 0;
        }
        translateFullSlides(newPosition);
        setSliderPosition(newPosition);
    }

    const jumpToSlideHandler = (id) => {
        translateFullSlides(id);
        setSliderPosition(id)
    }

    const speedUpAnimation = () => {
        for (let i = Math.max(0, sliderPosition - 2); i < Math.min(children.length, sliderPosition + 3); i++) {
            let elem = document.getElementById(`carouselitem` + i);
            elem.classList.add(classes.FastAnimation);
        }
    }

    const slowDownAnimation = () => {
        for (let i = Math.max(0, sliderPosition - 2); i < Math.min(children.length, sliderPosition + 3); i++) {
            let elem = document.getElementById(`carouselitem` + i);
            elem.classList.remove(classes.FastAnimation);
        }
    }


    const mouseStartHandler = (e) => {
        e.preventDefault();
        speedUpAnimation();
        setMouseStartPosition(e.clientX);
        setMouseEndPosition(e.clientX);
        setMouseClicked(true);
    }

    const mouseMoveHandler = (e) => {
        e.preventDefault();
        var frameWidth = document.getElementById('DisplayFrame').offsetWidth;
        if (mouseClicked === true) {
            setMouseEndPosition(e.clientX);
            let translateDist = (mouseEndPosition - mouseStartPosition) / frameWidth * 100;
            translatePartialSlides(translateDist);
            setMouseSwiped(true);
        }
    }

    const mouseEndHandler = (e) => {
        slowDownAnimation();
        if (mouseSwiped === true) {
            if (mouseStartPosition - mouseEndPosition > 100) {
                nextSlideHandler();
            } else if (mouseStartPosition - mouseEndPosition < -100) {
                prevSlideHandler();
            } else {
                jumpToSlideHandler(sliderPosition);
            }
        }
        setMouseClicked(false);
        setMouseSwiped(false);
    }

    const translatePartialSlides = (toTranslate) => {
        let currentTranslation = -sliderPosition * widthSpan;
        let totalTranslation = currentTranslation + toTranslate;
        for (var i = 0; i < children.length; i++) {
            let elem = document.getElementById(`carouselitem` + i);
            elem.style.transform = `translateX(` + totalTranslation + `%)`
        }
    }

    const translateFullSlides = (newPosition) => {
        let toTranslate = -widthSpan * newPosition;
        for (var i = 0; i < children.length; i++) {
            let elem = document.getElementById(`carouselitem` + i);
            elem.style.transform = `translateX(` + toTranslate + `%)`;
        }
    }

    const displayItems = Children.map(children, (child, index) => (
        <div className={classes.CarouselItem} id={`carouselitem` + index}>{child}</div>
    ));

    return (
        <div>
            <div className={classes.Container}>
                <div 
                    className={classes.DisplayFrame}
                    id="DisplayFrame"
                    onMouseDown={(e) => mouseStartHandler(e)}
                    onMouseMove={(e) => mouseMoveHandler(e)}
                    onMouseUp={(e) => mouseEndHandler(e)}
                    onMouseLeave={(e) => mouseEndHandler(e)}
                    >
                    {displayItems}
                </div>
            </div>
        </div>
    )
}

export default Carousel;