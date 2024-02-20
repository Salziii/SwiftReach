"use client";

import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { useState } from "react";
import YouTube from "react-youtube";

export default function Form({ children, video }: { children: React.ReactNode; video: string; }) {

  const [ended, setEnded] = useState<boolean>(false)

  return <div>
    <div className={ended ? "flex justify-center" : ""}>
      <div className={ended ? "w-1/2 h-1/2" : ""}>
        <AspectRatio ratio={16 / 9}>
          <YouTube
            className="w-full h-full"
            opts={{
              height: '100%',
              width: '100%',
              playerVars: {
                autoplay: 1
              },
            }}
            onEnd={() => setEnded(true)}
            videoId={video}
          />
        </AspectRatio>
      </div>
    </div>
    {
      ended
        ? children
        : <div className="transition-all w-full h-2 flex font-light justify-center">
          Um fortzufahren, Video zu Ende ansehen
        </div>
    }
  </div>
}
