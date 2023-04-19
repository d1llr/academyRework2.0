import { gsap } from "gsap";
import { useEffect } from "react";
import { memo } from "react";

const IntroBackGround = memo(({height, width}) => {
    
    let colorArray = [
        "pink",
        "yellow",
        "dodgerblue",
        "green",
        "red",
        "orange",
        "violet"
    ]

    let mm = gsap.matchMedia();
    useEffect(() => {
        mm.add("(orientation: portrait) and (prefers-reduced-motion: no-preference)", (context) => {
            gsap.fromTo(".speedLines line", {
                attr: {
                    y1: 0,
                    y2: "random(20, 200)"
                },
                x: "random(0, 1600)",
                y: -200,
                stroke: gsap.utils.wrap(colorArray)
            }, {
                duration: "0.1",
                y: 600,
                ease: "none",
                stagger: {
                    each: 0.2,
                    repeat: -1,
                    repeatRefresh: true
                }
            }).seek(10)
        });
        
        mm.add("(orientation: landscape) and (prefers-reduced-motion: no-preference)", (context) => {
            gsap.fromTo(".speedLines line", {
                attr: {
                    x1: 0,
                    x2: "random(20, 200)"
                },
                y: "random(0, 600)",
                x: -200,
                stroke: gsap.utils.wrap(colorArray)
            }, {
                duration: "1",
                x: 600,
                ease: "none",
                stagger: {
                    each: 0.2,
                    repeat: -1,
                    repeatRefresh: true
                }
            }).seek(100)
        });
    }, [colorArray])



    return (
        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 600 600" style={{'minWidth':width,'height':height}}>

            <g className="speedLines">

                <line x1="0" y1="0" x2="0" y2="0" />
                <line x1="0" y1="0" x2="0" y2="0" />
                <line x1="0" y1="0" x2="0" y2="0" />
                <line x1="0" y1="0" x2="0" y2="0" />
                <line x1="0" y1="0" x2="0" y2="0" />
                <line x1="0" y1="0" x2="0" y2="0" />
                <line x1="0" y1="0" x2="0" y2="0" />
                <line x1="0" y1="0" x2="0" y2="0" />
                <line x1="0" y1="0" x2="0" y2="0" />


            </g>

        </svg>
    );
})
export default IntroBackGround;