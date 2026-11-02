type EditorialPhotoFrameProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  tag: string;
  caption: string;
  aspectClassName?: string;
  imgDataAttr?: "mosaic" | "cap" | "expand" | "ac";
  eager?: boolean;
};

export function EditorialPhotoFrame({
  src,
  alt,
  width,
  height,
  tag,
  caption,
  aspectClassName = "aspect-[16/10]",
  imgDataAttr,
  eager = false,
}: EditorialPhotoFrameProps) {
  const dataProps =
    imgDataAttr === "mosaic"
      ? { "data-mosaic-img": true }
      : imgDataAttr === "cap"
        ? { "data-cap-img": true }
        : imgDataAttr === "expand"
          ? { "data-expand-img": true }
          : imgDataAttr === "ac"
            ? { "data-ac-photo": true }
            : {};

  return (
    <figure className={`relative h-full w-full overflow-hidden bg-[#050b16] ${aspectClassName}`}>
      <img
        {...dataProps}
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={eager ? "eager" : "lazy"}
        className="h-full w-full object-cover will-change-transform"
      />
      <div className="evo-photo-scrim" aria-hidden="true" />

      <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex flex-col items-start gap-1.5 p-4 sm:p-5">
        <span className="evo-chip-info text-evo-small font-semibold">{tag}</span>
        <span className="text-evo-small font-medium text-[#f5f8ff]">{caption}</span>
      </figcaption>
    </figure>
  );
}
