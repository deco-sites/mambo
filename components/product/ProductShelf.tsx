import ProductCard from "deco-sites/fashion/components/product/ProductCard.tsx";
import Container from "deco-sites/fashion/components/ui/Container.tsx";
import Text from "deco-sites/fashion/components/ui/Text.tsx";
import {
  Slider,
  SliderDots,
} from "deco-sites/fashion/components/ui/Slider.tsx";
import SliderControllerJS from "deco-sites/fashion/islands/SliderJS.tsx";
import Button from "deco-sites/fashion/components/ui/Button.tsx";
import Icon from "deco-sites/fashion/components/ui/Icon.tsx";
import { useId } from "preact/hooks";
import type { LoaderReturnType } from "$live/types.ts";
import type { Product } from "deco-sites/std/commerce/types.ts";
import ViewSendEvent from "deco-sites/fashion/islands/ViewSendEvent.tsx";
import { mapProductToAnalyticsItem } from "deco-sites/std/commerce/utils/productToAnalyticsItem.ts";
import { useOffer } from "deco-sites/fashion/sdk/useOffer.ts";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";
import Image from "deco-sites/std/components/Image.tsx";
import { tw } from "https://esm.sh/v96/twind@0.16.17/twind.js";

export type Banner = "Left" | "Right";

export interface Props {
  title: string;
  products: LoaderReturnType<Product[] | null>;
  itemsPerPage?: number;
  /** @title Banner */
  Banner?: { image: LiveImage; alt: string; link: string; side: Banner };
}

function ProductShelf({
  title,
  products,
  Banner,
}: Props) {
  const id = useId();

  if (!products || products.length === 0) {
    return null;
  }

  const cluster = products[0].category?.split(">").map((item) =>
    item!.replaceAll(" ", "-").normalize("NFD").replace(
      /[\u0300-\u036f]/g,
      "",
    )
  );

  return (
    <Container
      id={id}
      class={`grid grid-cols-[40px_1fr_40px] font-mont lg:grid-cols-[${
        Banner?.side === "Left" ? "auto_" : ""
      }40px_1fr_40px${
        Banner?.side === "Right" ? "_auto" : ""
      }] grid-rows-[57px_1fr_40px_1fr_20px] items-center py-10 px-5`}
    >
      <div class="row-start-1 h-full items-center flex col-span-full col-end-8 justify-between w-full border-b">
        <h2>
          <Text variant="heading-2" class="text-[#5d6561]">{title}</Text>
        </h2>
        <a
          href={`/${cluster![0]}/${cluster![1]}`}
          class="flex items-center text-[#f44237] text-base leading-6 font-bold"
        >
          Ver mais{" "}
          <Icon
            id="ChevronDown"
            size={18}
            strokeWidth={4}
            class="text-[#f44237]"
          />
        </a>
      </div>

      {Banner && (
        <a
          class={`hidden lg:flex ${
            Banner?.side === "Left" ? "col-start-1 mr-2" : "col-start-8 ml-2"
          } row-start-2 row-end-5 py-3  items-center`}
          href={Banner.link}
        >
          <Image
            class="rounded-[6px]"
            src={Banner.image}
            alt={Banner.alt}
            width={250}
            height={454}
          />
        </a>
      )}

      <Slider
        class={`gap-6 col-span-full ${
          Banner?.side === "Left" ? "lg:col-start-2" : "col-start-1"
        }  row-start-2 row-end-5`}
        snap="snap-center sm:snap-start py-4 block first:ml-6 sm:first:ml-0 last:mr-6 sm:last:mr-0"
      >
        {products?.map((product) => (
          <div class="min-w-[270px] max-w-[270px] sm:min-w-[292px] sm:max-w-[240px]">
            <ProductCard product={product} itemListName={title} />
          </div>
        ))}
      </Slider>
      <>
        <div
          class={`relative z-10 col-start-1 ${
            Banner?.side === "Left" ? "lg:col-start-2" : "col-start-1"
          } row-start-3 flex items-center justify-center  z-10 `}
        >
          <div class="absolute left-[-16px] flex items-center justify-center  bg-interactive-inverse rounded-full button-box-shadow">
            <Button
              variant="icon"
              data-slide="prev"
              class=" h-auto p-[10px]"
              aria-label="Previous item"
            >
              <Icon
                size={16}
                class="text-[#f44237]"
                id="ChevronLeft"
                strokeWidth={2.5}
              />
            </Button>
          </div>
        </div>
        <div class="relative flex items-center justify-center  z-10 col-end-5 row-start-3">
          <div class="absolute right-[-16px] flex items-center justify-center  bg-interactive-inverse rounded-full button-box-shadow">
            <Button
              variant="icon"
              class=" h-auto p-[10px]"
              data-slide="next"
              aria-label="Next item"
            >
              <Icon
                size={16}
                class="text-[#f44237]"
                id="ChevronRight"
                strokeWidth={2.5}
              />
            </Button>
          </div>
        </div>
      </>

      <SliderControllerJS rootId={id} />

      <ViewSendEvent
        event={{
          name: "view_item_list",
          params: {
            item_list_name: title,
            items: products.map((product) =>
              mapProductToAnalyticsItem({
                product,
                ...(useOffer(product.offers)),
              })
            ),
          },
        }}
      />
    </Container>
  );
}

export default ProductShelf;
