import React from "react";
import Fade from 'react-reveal/Fade';

import images from '../data/dummyImages.json';
import LazyImage from "./LazyImage";

const Content = ({ styles }) => {
    const dummyPost = {
        title: `Here's a blog post title`,
        summary:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    };

    const posts = Array(20).fill(dummyPost);

    const contentStyle = {
        paddingTop: styles.showSidebar ? 20 : styles.topBarHeight + 20,
        paddingRight: 20,
        paddingBottom: styles.showSidebar ? 20 : styles.footerMenuHeight + 20,
        paddingLeft: styles.showSidebar ? styles.sidebarWidth + 20 : 20,
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center'
    };

    function uid() {
        return Math.floor(Math.random() * 10000000);
    }

    /* try out the animations here: https://www.react-reveal.com/examples/common/fade/ */
    return (
        <div style={contentStyle}>
            {posts.map((post, i) => {
                let left = i % 2 === 0;
                return (
                    <React.Fragment key={uid()}>
                        <Fade key={uid()} left={left} right={!left}>
                            <div style={{ marginBottom: 40 }}>
                                <h2 style={{ marginBottom: 0 }}>{post.title}</h2>
                                <p>{post.summary}</p>
                            </div>
                        </Fade>
                        {i < images.length
                            ? (
                                <LazyImage
                                    key={uid()}
                                    id={images[i].id}
                                    src={images[i].urls.regular}
                                    thumb={images[i].urls.thumb}
                                    height={images[i].height}
                                    width={images[i].width}
                                    alt={images[i].alt_description}
                                    animate={i} /* let component pick the animation based on index */
                                    availableWidth={window.innerWidth - contentStyle.paddingRight - contentStyle.paddingLeft}
                                />
                            )
                            : (
                                <LazyImage
                                    key={uid()}
                                    id={images[images.length - 1].id + uid()}
                                    src={images[images.length - 1].urls.regular}
                                    thumb={images[images.length - 1].urls.thumb}
                                    height={images[images.length - 1].height}
                                    width={images[images.length - 1].width}
                                    alt={images[images.length - 1].alt_description}
                                    animate={i}
                                    availableWidth={window.innerWidth - contentStyle.paddingRight - contentStyle.paddingLeft}
                                />
                            )
                        }
                    </React.Fragment>
                );
            })}
        </div>
    );
};

export default Content;