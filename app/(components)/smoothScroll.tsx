import { useRef } from 'react';
import { LocomotiveScrollProvider } from 'react-locomotive-scroll';

import 'locomotive-scroll/dist/locomotive-scroll.css';

export default function SmoothScrollProvider({ children }: { children:any }) {
  const containerRef = useRef(null);
  return (
    <LocomotiveScrollProvider
      options={{
        smooth: true
      }}
      onLocationChange={(scroll: any) => scroll.scrollTo(0, { duration: 0, disableLerp: true })}
      containerRef={containerRef}
    >
      <div data-scroll-container ref={containerRef}>
        {children}
      </div>
    </LocomotiveScrollProvider>
  );
}
