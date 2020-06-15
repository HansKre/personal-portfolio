import React from "react";

const useIntersectionObserver = ({
    targetRef,
    onIntersect,
    threshold = 0.1,
    rootMargin = "0px"
}) => {
    React.useEffect(() => {
        const observer = new IntersectionObserver(onIntersect, {
            rootMargin,
            threshold
        });
        const target = targetRef.current;
        target && observer.observe(target);
        return function cleanup() {
            target && observer.unobserve(target);
        };
    });
};
export default useIntersectionObserver;