import { useId } from "preact/hooks";
import AddToCartButton from "deco-sites/fashion/islands/AddToCartButton.tsx";
import Container from "deco-sites/fashion/components/ui/Container.tsx";
import Text from "deco-sites/fashion/components/ui/Text.tsx";
import Breadcrumb from "deco-sites/fashion/components/ui/Breadcrumb.tsx";
import Button from "deco-sites/fashion/components/ui/Button.tsx";
import Image from "deco-sites/std/components/Image.tsx";
import {
  Slider,
  SliderDots,
} from "deco-sites/fashion/components/ui/Slider.tsx";
import SliderJS from "deco-sites/fashion/components/ui/SliderJS.tsx";
import { useOffer } from "deco-sites/fashion/sdk/useOffer.ts";
import { formatPrice } from "deco-sites/fashion/sdk/format.ts";
import type { LoaderReturnType } from "$live/types.ts";
import type { ProductDetailsPage } from "deco-sites/std/commerce/types.ts";
import ViewSendEvent from "deco-sites/fashion/islands/ViewSendEvent.tsx";
import { mapProductToAnalyticsItem } from "deco-sites/std/commerce/utils/productToAnalyticsItem.ts";

import ProductImageZoom from "deco-sites/fashion/islands/ProductImageZoom.tsx";
import Icon from "deco-sites/fashion/components/ui/Icon.tsx";
import AditionalInfo from "../ui/AditionalInfo.tsx";

export type Variant = "front-back" | "slider" | "auto";

export interface Props {
  page: LoaderReturnType<ProductDetailsPage | null>;
  /**
   * @title Product view
   * @description Ask for the developer to remove this option since this is here to help development only and should not be used in production
   */
  variant?: Variant;
}

const WIDTH = 270;
const HEIGHT = 275;
const ASPECT_RATIO = `${WIDTH} / ${HEIGHT}`;

/**
 * Rendered when a not found is returned by any of the loaders run on this page
 */
function NotFound() {
  return (
    <div class="w-full flex justify-center items-center py-28">
      <div class="flex flex-col items-center justify-center gap-6">
        <Text variant="heading-2">Página não encontrada</Text>
        <a href="/">
          <Button>Voltar à página inicial</Button>
        </a>
      </div>
    </div>
  );
}

function ProductInfo({ page }: { page: ProductDetailsPage }) {
  const {
    breadcrumbList,
    product,
  } = page;
  const {
    description,
    productID,
    offers,
    name,
    brand,
    isVariantOf,
  } = product;
  const { price, listPrice, seller, installments } = useOffer(offers);
  const isOnSale = listPrice !== price;
  const saleDiscount = price?.toString() && listPrice?.toString() && Math.round(
    ((listPrice - price) / listPrice) * 100,
  );

  return (
    <>
      {/* Code and name */}
      <div class="mt-4 sm:mt-8 flex flex-col sm:items-start gap-3">
        <div>
          <Text
            tone="subdued"
            variant="caption"
            class="text-sm text-[#848a87] leading-[20px]"
          >
            {brand}
          </Text>
        </div>
        <h1 class="text-[30px] !font-bold leading-6">
          <Text variant="heading-3" class="text-[30px] !font-bold">
            {name}
          </Text>
        </h1>
        <div>
          <div class="flex gap-2 items-center">
            <span class="text-[#fc0] text-[24px] tracking-[0px] font-bold leading-none">
              &#9733;&#9733;&#9733;&#9733;&#9733;
            </span>
            <p class="text-[#848a87] text-base">5 avaliações</p>
          </div>
          <Text class="mt-2 text-[13px] text-[#848a87] font-bold tracking-[0.5px]">
            {product.sku}
          </Text>
        </div>
      </div>
      {/* Prices */}
      <div class="flex items-center gap-2 my-2">
        <div class="flex flex-col gap-1">
          <div class="flex min-h-[12px]">
            {isOnSale && (
              <Text
                class="line-through text-[13px] "
                variant="list-price"
                tone="subdued"
              >
                {formatPrice(listPrice, offers!.priceCurrency!)}
              </Text>
            )}
          </div>

          <div class="max-h-[21px]">
            <Text
              variant="caption"
              class={`text-base font-bold  ${
                isOnSale ? "text-price" : "text-black"
              }`}
            >
              {formatPrice(price, offers!.priceCurrency!)}
            </Text>
            {isOnSale && (
              <Text
                variant="caption"
                tone="subdued"
                class="ml-2.5 bg-discount bg-opacity-[47%] text-discount-text rounded-[4px] px-1.5 py-[3px] font-bold"
              >
                - {saleDiscount}%
              </Text>
            )}
          </div>
          <Text
            variant="caption"
            tone="subdued"
            class="text-[#848a87] !font-bold"
          >
            1 un
          </Text>
        </div>
      </div>
      {/* Sku Selector */}

      {/* Add to Cart and Favorites button */}
      <div class="mt-4 sm:mt-10 flex flex-col sm:max-w-[200px] gap-2">
        {seller && (
          <AddToCartButton
            skuId={productID}
            sellerId={seller}
            price={price ?? 0}
            discount={price && listPrice ? listPrice - price : 0}
            name={product.name ?? ""}
            productGroupId={product.isVariantOf?.productGroupID ?? ""}
          />
        )}
      </div>
      <AditionalInfo />
      <ViewSendEvent
        event={{
          name: "view_item",
          params: {
            items: [
              mapProductToAnalyticsItem({
                product,
                breadcrumbList,
                price,
                listPrice,
              }),
            ],
          },
        }}
      />
    </>
  );
}

function Details({
  page,
  variant,
}: { page: ProductDetailsPage; variant: Variant }) {
  const id = `product-image-gallery:${useId()}`;
  const { product: { image: images = [] } } = page;

  /**
   * Product slider variant
   *
   * Creates a three columned grid on destkop, one for the dots preview, one for the image slider and the other for product info
   * On mobile, there's one single column with 3 rows. Note that the orders are different from desktop to mobile, that's why
   * we rearrange each cell with col-start- directives
   */
  if (variant === "slider") {
    return (
      <>
        <div class="ml-2">
          <Breadcrumb
            itemListElement={page.breadcrumbList?.itemListElement.slice(0, -1)}
          />
        </div>
        <section class="px-2 py-5 sm:p-6 lg:p-12 mx-4 mt-[20px] border leading-[1.15rem] text-base text-[#36403b] rounded-[0.5rem] border-[#dadedc] flex flex-col gap-4 items-start">
          <div
            id={id}
            class={` grid grid-cols-1 gap-4 sm:(grid-cols-[max-content_40vw_40vw] grid-rows-[1fr_auto] justify-center `}
          >
            {/* Image Slider */}
            <div class="relative sm:(col-start-2 col-span-1 row-start-1)">
              <Slider class="gap-6 scrollbar-none">
                {images.map((img, index) => (
                  <Image
                    class={`scroll-snap-center min-w-[100vw] sm:(min-w-[40vw])`}
                    sizes="(max-width: 510px) "
                    style={{ aspectRatio: ASPECT_RATIO }}
                    src={img.url!}
                    alt={img.alternateName}
                    width={WIDTH}
                    height={HEIGHT}
                    // Preload LCP image for better web vitals
                    preload={index === 0}
                    loading={index === 0 ? "eager" : "lazy"}
                  />
                ))}
              </Slider>

              <div class="sm:hidden absolute left-2 top-1/2  rounded-full">
                <Button variant="icon" data-slide="prev" aria-label="Previous">
                  <Icon
                    size={20}
                    class="text-[#f44237]"
                    id="ChevronLeft"
                    strokeWidth={3}
                  />
                </Button>
              </div>
              <div class="sm:hidden absolute right-2 top-1/2 rounded-full">
                <Button variant="icon" data-slide="next" aria-label="Next">
                  <Icon
                    size={20}
                    class="text-[#f44237]"
                    id="ChevronRight"
                    strokeWidth={3}
                  />
                </Button>
              </div>
              <p class="text-center text-[9px]">Imagem meramente ilustrativa</p>
            </div>

            {/* Dots */}
            <SliderDots class="hidden sm:block gap-2 override:(justify-start) overflow-auto px-4 sm:(px-0 flex-col col-start-1 col-span-1 row-start-1)">
              {images.map((img, _) => (
                <Image
                  style={{ aspectRatio: ASPECT_RATIO }}
                  class="group-disabled:(border-interactive) border rounded min-w-[63px] sm:min-w-[100px]"
                  width={63}
                  height={87.5}
                  src={img.url!}
                  alt={img.alternateName}
                />
              ))}
            </SliderDots>

            {/* Product Info */}
            <div class="sm:(pr-0 pl-6 col-start-3 col-span-1 row-start-1)">
              <ProductInfo page={page} />
            </div>
          </div>
          {/* Description card */}
          <div class="mt-4 sm:mt-6">
            <Text variant="caption">
              {page.product.description && (
                <div>
                  <div class="cursor-pointer w-full border-b-2">
                    <h3 class="border-b-2 py-[10px] border-[#f44237] w-min whitespace-nowrap font-bold text-sm text-[#5d6561]">
                      Descrição do Produto
                    </h3>
                  </div>
                  <div class="ml-2 mt-2 text-base text-[#848a87] leading-5 font-normal py-8">
                    {page.product.description}
                  </div>
                </div>
              )}
            </Text>
          </div>
          <SliderJS rootId={id}></SliderJS>
        </section>
      </>
    );
  }

  /**
   * Product front-back variant.
   *
   * Renders two images side by side both on mobile and on desktop. On mobile, the overflow is
   * reached causing a scrollbar to be rendered.
   */
  return (
    <div class="grid grid-cols-1 gap-4 sm:(grid-cols-[50vw_25vw] grid-rows-1 justify-center)">
      {/* Image slider */}
      <Slider class="gap-6 ">
        {[images[0], images[1] ?? images[0]].map((img, index) => (
          <Image
            class={`scroll-snap-center min-w-[100vw] sm:(min-w-[24vw])`}
            sizes="(max-width: 640px) 100vw, 24vw"
            style={{ aspectRatio: ASPECT_RATIO }}
            src={img.url!}
            alt={img.alternateName}
            width={WIDTH}
            height={HEIGHT}
            // Preload LCP image for better web vitals
            preload={index === 0}
            loading={index === 0 ? "eager" : "lazy"}
          />
        ))}
      </Slider>

      {/* Product Info */}
      <div class="px-4 flex flex-col items-start sm:(pr-0 pl-6)">
        <ProductInfo page={page} />
      </div>
    </div>
  );
}

function ProductDetails({ page, variant: maybeVar = "auto" }: Props) {
  /**
   * Showcase the different product views we have on this template. In case there are less
   * than two images, render a front-back, otherwhise render a slider
   * Remove one of them and go with the best suited for your use case.
   */
  const variant = maybeVar === "auto"
    ? page?.product.image?.length && page?.product.image?.length < 2
      ? "front-back"
      : "slider"
    : maybeVar;

  return (
    <Container class="pt-16">
      {page ? <Details page={page} variant={variant} /> : <NotFound />}
    </Container>
  );
}

export default ProductDetails;
