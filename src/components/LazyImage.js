import React from "react";
import Zoom from 'react-reveal/Zoom';
import Slide from 'react-reveal/Slide';
import Pulse from 'react-reveal/Pulse';
import styled from 'styled-components';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

const ANIM_DURATION = 2000; /* we can pass this into the styled-component directly since it's a constant that doesn't change */
/*
    ${({isLoaded}) => isLoaded && `
        background: blue;
    `}

    background-color: ${({ backgroundColor }) => backgroundColor};
*/
const BaseImage = styled.img`
   width: 100%; /* scales images to fit the container: grows thumbs, shrinks the regulars */
   height: 100%;
`

const ThumbImage = styled(BaseImage)`
    filter: blur(10px);
`;

const FullImage = styled(BaseImage)`
    width: 100%; /* scales images to fit the container: grows thumbs, shrinks the regulars */
    height: 100%;
    position: absolute; /* once it is loaded, the full-sized image is placed into the DOM. We don't want it to occupy own space in the layout, instead, we want it to swap places with the thumb. Hence, we position it exactly on top it. To work properly, we need to set position:relative on the parent, otherwise the html-body will be used as the context. */
    top: 0;
    left: 0;
    transition: opacity ${ANIM_DURATION}ms ease-in 0ms; /* shorthand for property, duration, timing-function, delay */
    opacity: ${props => props.isLoaded === true ? 1 : 0};
    &:hover {
        /* box-shadow: 19px 12px 20px -4px rgba(0,0,0,0.79);
        transition: box-shadow .2s ease-in-out; */
    }
`;

const ImageContainer = styled.div`
    box-sizing: border-box;
    min-width: ${props => props.imgWidth + 'px'};
    min-height: ${props => props.imgHeight + 'px'};
    background: rgba(0, 0, 0, 0.05);
    position: relative; /* needed for position: absolute in the children. Children now use this component as the referenced-context for the position, instead of the body. */
    border: 2px solid black; /* shorthand for border-width border-style border-color, works for border-*, e.g. border-left as well */
    flex: ${props => '0 0 ' + props.imgWidth + 'px'}; /* don't grow or shrink but with the flex-wrap: wrap from the parent, the text-content does not have enough space and wraps */
    box-shadow: 9px 12px 20px -4px rgba(0,0,0,0.79);
    /* filter: 'drop-shadow(0 14px 28px rgba(0, 0, 0, 0.25)) drop-shadow(0 10px 10px rgba(0, 0, 0, 0.1))', */
    /* transition: 'filter 0.5s' */
`

const LazyImage = (props) => {

    const [isLoaded, setIsLoaded] = React.useState(false);
    const [hasIntersected, setHasIntersected] = React.useState(false);
    const imgRef = React.useRef();

    const aspectRatio = (props.height / props.width);
    let imgHeight = window.innerHeight * 0.75;
    let imgWidth = imgHeight / aspectRatio;

    if (imgWidth > props.availableWidth) {
        imgWidth = props.availableWidth * 0.95;
        imgHeight = imgWidth * aspectRatio;
    }

    const imgContainerStyle = {
        boxSizing: 'borderBox',
        minWidth: `${imgWidth}px`,
        minHeight: `${imgHeight}px`,
        background: 'rgba(0, 0, 0, 0.05)',
        position: 'relative', /* needed for position: absolute in the children. Children now use this component as the referenced-context for the position, instead of the body. */
        border: '2px solid black', /* shorthand for border-width border-style border-color, works for border-*, e.g. border-left as well */
        flex: `0 0 ${imgWidth}px`, /* don't grow or shrink but with the flex-wrap: wrap from the parent, the text-content does not have enough space and wraps */
        boxShadow: '9px 12px 20px -4px rgba(0,0,0,0.79)',
        /* filter: 'drop-shadow(0 14px 28px rgba(0, 0, 0, 0.25)) drop-shadow(0 10px 10px rgba(0, 0, 0, 0.1))', */
        /* transition: 'filter 0.5s' */
    }

    const onIntersect = (intersections, observerElement) => {
        const isIntersecting = intersections[0].isIntersecting;
        if (isIntersecting && imgRef.current) {
            setHasIntersected(true);
            observerElement.unobserve(imgRef.current);
        }
    }

    useIntersectionObserver({
        targetRef: imgRef,
        onIntersect: onIntersect
    });

    function render() {
        return (
            <ImageContainer imgHeight={imgHeight} imgWidth={imgWidth} >
                {/* <div style={imgContainerStyle}> */}
                {/* We do not unmount the thumb even after the full img is loaded because it gives a nice backend-blur which we cannot reproduce with box-shadow */}
                <ThumbImage
                    ref={imgRef}
                    key={props.id + 'thumb'}
                    alt={props.alt}
                    src={props.thumb}
                />
                {hasIntersected && <FullImage
                    key={props.id + 'full'}
                    onLoad={() => {
                        setIsLoaded(true);
                    }}
                    alt={props.alt}
                    src={props.src}
                    isLoaded={isLoaded}
                />}
            </ImageContainer>
            /* </div> */
        );
    }

    return (
        /* Placeholder-boxes that are same size as the images we want to render */
        <>
            {props.animate === 0
                ? <>{render()}</>
                : props.animate % 3 === 0
                    ? (<Slide bottom>
                        {render()}
                    </ Slide>)
                    : props.animate % 3 === 1
                        ? (<Pulse>
                            {render()}
                        </Pulse>)
                        /* case: props.animat % 3 === 2*/
                        : (<Zoom>
                            {render()}
                        </ Zoom>)
            }
        </>
    );
}
export default LazyImage;
