import Image from "next/image";

interface ImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  classes?: string;
}

export default function ImageComponent({
  src,
  alt,
  width,
  height,
  classes,
}: ImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={classes}
    />
  );
}
