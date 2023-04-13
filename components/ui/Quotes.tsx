import Container from "./Container.tsx";
import Image from "deco-sites/std/components/Image.tsx";
import {
  Slider,
  SliderDots,
} from "deco-sites/fashion/components/ui/Slider.tsx";
import SliderControllerJS from "deco-sites/fashion/islands/SliderJS.tsx";
import Icon from "deco-sites/fashion/components/ui/Icon.tsx";
import Button from "deco-sites/fashion/components/ui/Button.tsx";
import { tw } from "https://esm.sh/v96/twind@0.16.17/twind.js";
import Text from "deco-sites/fashion/components/ui/Text.tsx";
import { useId } from "preact/hooks";

export interface Props {
  testimony: QuotesItem[];
}

export interface QuotesItem {
  name: string;
  message: string;
}

function Dots({ testimony }: Props) {
  return (
    <>
      <SliderDots class="col-span-full self-center gap-4 z-10 row-start-5 scrollbar-none mx-auto p-2 rounded-full ">
        {testimony?.map((_) => (
          <div
            class={tw`group-disabled:(bg-[#424242]) bg-[#AAAAAA] w-[16px] h-[16px] rounded-full`}
          />
        ))}
      </SliderDots>
    </>
  );
}

function Controls() {
  return (
    <>
      <div class="flex mt-[45px] justify-center z-10 col-start-1 row-start-3 row-end-5 leading-[1.15rem] text-[128%] outline-none rounded-r-[10px]">
        <Button
          class="flex justify-center items-center m-0 w-8 h-8 font-sans text-center text-black normal-case bg-transparent border-0 hover:cursor-pointer"
          variant="icon"
          data-slide="prev"
          aria-label="Previous item"
        >
          <Icon
            class=""
            size={20}
            id="ChevronLeft"
            strokeWidth={3}
          />
        </Button>
      </div>
      <div class="flex justify-center mt-[45px] z-10 col-start-3 row-start-3 row-end-5 leading-[1.15rem] text-[128%] outline-none rounded-l-[10px]">
        <Button
          class="flex justify-center items-center m-0 w-8 h-8 font-sans text-center text-black normal-case bg-transparent border-0 hover:cursor-pointer"
          variant="icon"
          data-slide="next"
          aria-label="Next item"
        >
          <Icon
            class=""
            size={20}
            id="ChevronRight"
            strokeWidth={3}
          />
        </Button>
      </div>
    </>
  );
}

function QuotesItem({ name, message }: QuotesItem) {
  return (
    <div class="flex flex-col items-center scroll-snap-center min-w-[75vw] sm:(min-w-[470px])">
      <div class="flex flex-col items-center">
        <Image
          src="https://mambodelivery.vtexassets.com/_v/public/assets/v1/published/yourviews.yourviewsreviews@0.81.0/public/react/d30e15a23e08f09fd62e87f4d5fe5f49.png"
          width={50}
          height={50}
        />
        <Text variant="heading-3">{name}</Text>
        <span class="text-[#fc0] text-[24px] tracking-[0px] font-bold leading-none">
          &#9733;&#9733;&#9733;&#9733;&#9733;
        </span>
      </div>
      <Text class="mt-[70px] mb-[15px] min-h-[150px] text-center max-w-[470px]">
        {message}
      </Text>
    </div>
  );
}

function Quotes({ testimony }: Props) {
  const id = useId();
  return (
    <Container id={id}>
      <section class="grid max-w-[606px] grid-cols-[48px_1fr_48px] grid-rows-[48px_1fr_48px_1fr_30px] px-[5px] pb-[50px] sm:px-5">
        <h2 class="text-center row-start-1 col-span-full text-[#3f3f40] text-[25px] font-bold m-[18px]">
          Depoimentos
        </h2>
        <Slider class="gap-6 pt-[50px] col-start-2 col-end-3 row-start-2 row-end-5 scrollbar-none">
          {testimony.map((testimony) => (
            <QuotesItem name={testimony.name} message={testimony.message} />
          ))}
        </Slider>
        <Controls />
        <Dots testimony={testimony} />
        <SliderControllerJS rootId={id} />
      </section>
    </Container>
  );
}

export default Quotes;
