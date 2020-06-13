import React from "react";
import Zoom from 'react-reveal/Zoom';
import Reveal from 'react-reveal/Reveal';
import Fade from 'react-reveal/Fade';
import Slide from 'react-reveal/Slide';

const LazyImage = (props) => {

    const aspectRatio = (props.height / props.width) * 100;
    const imgContainerStyles = {
        boxSizing: 'borderBox',
        width: '100%',
        /* maxWidth: '600px', */
        paddingBottom: `${aspectRatio}%`,
        position: 'relative', /* Setting the top, right, bottom, and left properties of a relatively-positioned element will cause it to be adjusted away from its normal position. Other content will not be adjusted to fit into any gap left by the element. */
        overflow: 'hidden', /* The overflow is clipped, and the rest of the content will be invisible */
        background: 'rgba(0, 0, 0, 0.05)',
        border: '2px solid black' /* shorthand for border-width border-style border-color, works for border-*, e.g. border-left as well */
    }

    const imageStyles = {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%'
    }

    const fullStyles = {
        ...imageStyles,
        transition: 'opacity 400ms ease 0ms'
    }
    const thumbStyles = {
        ...imageStyles,
        filter: 'blur(20px)',
        transform: 'scale(1.1)',
        transition: 'visibility 0ms ease 400ms'
    }

    function render(imgContainerStyles) {
        return (<div div style={imgContainerStyles}>

        </div>);
    }

    return (
        /* Placeholder-boxes that are same size as the images we want to render */
        <>
            {props.animate % 4 === 0
                ? (<Slide bottom>
                    {render(imgContainerStyles)}
                </ Slide>)
                : props.animate % 4 === 1
                    ? <>{render(imgContainerStyles)}</>
                    : props.animate % 4 === 2
                        ? (<Zoom>
                            {render(imgContainerStyles)}
                        </ Zoom>)
                        : <>{render(imgContainerStyles)}</>
            }
        </>
    );
}
export default LazyImage;
