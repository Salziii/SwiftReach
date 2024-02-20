"use client";

import { useEffect, useState } from "react"
import Image, { ImageProps } from "next/image";

interface FallbackImageProps extends ImageProps {
 fallback: ImageProps["src"];
 alt: string;
 src: ImageProps["src"];
}

export default function FallbackImage({
 fallback,
 alt,
 src,
 ...props
}: FallbackImageProps) {
 const [error, setError] = useState<boolean>(false)

 useEffect(() => {
  setError(false)
 }, [src])

 return (
  <Image
   alt={alt}
   onError={() => { setError(true) }}
   src={error ? fallback : src}
   {...props}
  />
 )
}