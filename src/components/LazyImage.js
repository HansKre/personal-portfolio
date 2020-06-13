import React from "react";
import Zoom from 'react-reveal/Zoom';
import Slide from 'react-reveal/Slide';

const LazyImage = (props) => {

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
        /* maxWidth: `${imgWidth}px`, */
        /* width: '100%', */
        /* maxWidth: '600px', */
        /* paddingBottom: `${aspectRatio}%`, */
        /* position: 'relative', */ /* Setting the top, right, bottom, and left properties of a relatively-positioned element will cause it to be adjusted away from its normal position. Other content will not be adjusted to fit into any gap left by the element. */
        /* overflow: 'hidden', */ /* The overflow is clipped, and the rest of the content will be invisible */
        background: 'rgba(0, 0, 0, 0.05)',
        border: '2px solid black', /* shorthand for border-width border-style border-color, works for border-*, e.g. border-left as well */
        flex: `0 0 ${imgWidth}px`, /* don't grow or shrink but with the flex-wrap: wrap from the parent, the text-content does not have enough space and wraps */
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
    }

    const imageStyle = {
        width: '100%', /* scales images to fit the container: grows thumbs, shrinks the regulars */
        height: '100%'
    }

    const fullStyle = {
        ...imageStyle,
        transition: 'opacity 400ms ease 0ms'
    }

    const thumbStyle = {
        ...imageStyle,
        filter: 'blur(10px)',
        /* transform: 'scale(1.1)', */
        transition: 'visibility 0ms ease 400ms'
    }

    function render(imgContainerStyle) {
        return (<div style={imgContainerStyle}>
            <img
                key={props.key}
                src={props.thumb}
                alt={props.alt}
                style={thumbStyle}
            />
            {/* <p>{props.id + ' , ' + props.thumb + ' , ' + props.width + '(' + imgWidth + '), ' + props.height + '(' + imgHeight + '), ' + aspectRatio} </p> */}
        </div>);
    }

    return (
        /* Placeholder-boxes that are same size as the images we want to render */
        <>
            {props.animate % 4 === 0
                ? <>{render(imgContainerStyle)}</>
                : props.animate % 4 === 1
                    ? (<Slide bottom>
                        {render(imgContainerStyle)}
                    </ Slide>)
                    : props.animate % 4 === 2
                        ? <>{render(imgContainerStyle)}</>
                        : (<Zoom>
                            {render(imgContainerStyle)}
                        </ Zoom>)
            }
        </>
    );
}
export default LazyImage;
