import Text from "deco-sites/fashion/components/ui/Text.tsx";
import Icon from "deco-sites/fashion/components/ui/Icon.tsx";
import Button from "deco-sites/fashion/components/ui/Button.tsx";
import {
  Slider,
  SliderDots,
} from "deco-sites/fashion/components/ui/Slider.tsx";
import SliderControllerJS from "deco-sites/fashion/islands/SliderJS.tsx";
import { Picture, Source } from "deco-sites/std/components/Picture.tsx";
import { useId } from "preact/hooks";
import { animation, keyframes, tw } from "twind/css";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";
import Container from "deco-sites/fashion/components/ui/Container.tsx";

export interface Banner {
  /** @description desktop otimized image [send image 1440x350] */
  desktop: LiveImage;

  /** @description mobile otimized image */
  mobile: LiveImage;
  /** @description Image's alt text */
  alt: string;
  action?: {
    /** @description when user clicks on the image, go to this link */
    href: string;
  };
}

export interface Props {
  images?: Banner[];
  /**
   * @description Check this option when this banner is the biggest image on the screen for image optimizations
   */
  preload?: boolean;
  /**
   * @title Autoplay interval
   * @description time (in seconds) to start the carousel autoplay
   */
  interval?: number;
}

function BannerItem({ image, lcp }: { image: Banner; lcp?: boolean }) {
  const {
    alt,
    mobile,
    desktop,
    action,
  } = image;

  return (
    <div class="relative h-[350px] min-w-[100vw] overflow-y-hidden">
      <a href={action?.href ?? "#"}>
        <Picture class="w-full" preload={lcp}>
          <Source
            media="(max-width: 767px)"
            fetchPriority={lcp ? "high" : "auto"}
            src={mobile}
            width={360}
            height={350}
          />
          <Source
            media="(min-width: 768px)"
            fetchPriority={lcp ? "high" : "auto"}
            src={desktop}
            width={1440}
            height={350}
          />
          <img
            class="object-cover w-full sm:h-full"
            loading={lcp ? "eager" : "lazy"}
            src={desktop}
            alt={alt}
          />
        </Picture>
      </a>
    </div>
  );
}

function ProgressiveDots({ images, interval = 0 }: Props) {
  return (
    <>
      <SliderDots class="relative bottom-[-37px] col-span-full gap-4 z-10 row-start-4 scrollbar-none mx-auto p-2 h-5 rounded-full bg-white shadow-sm">
        {images?.map((_) => (
          <div class="py-6 flex justify-center">
            <div
              class={tw`group-disabled:(bg-[#ff5a11]) w-2.5 h-2.5 rounded-full border-1 border-black`}
            />
          </div>
        ))}
      </SliderDots>
    </>
  );
}

function Controls() {
  return (
    <>
      <div class="hidden md:flex items-center justify-center z-10 col-start-1 row-start-2 bg-[#454545] leading-[1.15rem] text-[128%] outline-none rounded-r-[10px]">
        <Button
          class="flex justify-center items-center m-0 w-8 h-8 font-sans text-center text-black normal-case bg-transparent border-0 hover:cursor-pointer"
          variant="icon"
          data-slide="prev"
          aria-label="Previous item"
        >
          <Icon
            class="text-default-inverse"
            size={20}
            id="ChevronLeft"
            strokeWidth={3}
          />
        </Button>
      </div>
      <div class="hidden md:flex items-center justify-center z-10 col-start-3 row-start-2 bg-[#454545] leading-[1.15rem] text-[128%] outline-none rounded-l-[10px]">
        <Button
          class="flex justify-center items-center m-0 w-8 h-8 font-sans text-center text-black normal-case bg-transparent border-0 hover:cursor-pointer"
          variant="icon"
          data-slide="next"
          aria-label="Next item"
        >
          <Icon
            class="text-default-inverse"
            size={20}
            id="ChevronRight"
            strokeWidth={3}
          />
        </Button>
      </div>
    </>
  );
}

function BannerCarousel({ images, preload, interval }: Props) {
  const id = useId();

  return (
    <Container class="mt-6">
      <div
        id={id}
        class="grid grid-cols-[30px_1fr_30px] sm:grid-cols-[30px_1fr_30px] grid-rows-[1fr_30px_1fr_48px] w-full h-[350px]"
      >
        <Slider class="col-span-full row-span-full scrollbar-none gap-6 rounded-l">
          {images?.map((image, index) => (
            <BannerItem image={image} lcp={index === 0 && preload} />
          ))}
        </Slider>

        <Controls />

        <ProgressiveDots images={images} interval={interval} />

        <SliderControllerJS rootId={id} interval={interval && interval * 1e3} />
      </div>
    </Container>
  );
}

export default BannerCarousel;
