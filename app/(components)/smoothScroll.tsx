import { useEffect } from "react";
import "locomotive-scroll/dist/locomotive-scroll.css";

declare const window: any;

export default function SmoothScrollProvider() {
 useEffect(() => {
  (async () => {
   try {
    const LocomotiveScroll = (await import("locomotive-scroll")).default;
    const dataScrollContainer = document.querySelector(
     "[data-scroll-container]"
    ) as HTMLElement;

    if (!dataScrollContainer) {
     console.warn(
      "locomotive-scroll: [data-scroll-container] dataset was not found. You likely forgot to add it which will prevent Locomotive Scroll to work."
     );
    }

    window.locomotive = new LocomotiveScroll({
     el: dataScrollContainer ?? undefined,
     smooth: true,
    });
   } catch (error) {}
  })();

  return () => {
   window.locomotive?.destroy();
  };
 }, []);
}

// const containerRef = useRef(null);
//   return (
//     <LocomotiveScrollProvider
//       options={{
//         smooth: true
//       }}
//       onLocationChange={(scroll: any) => scroll.scrollTo(0, { duration: 0, disableLerp: true })}
//       containerRef={containerRef}
//     >
//       <div data-scroll-container ref={containerRef}>
//         {children}
//       </div>
//     </LocomotiveScrollProvider>
//   );
