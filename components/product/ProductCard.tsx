import Image from "deco-sites/std/components/Image.tsx";
import Text from "deco-sites/fashion/components/ui/Text.tsx";
import Avatar from "deco-sites/fashion/components/ui/Avatar.tsx";
import Button from "deco-sites/fashion/components/ui/Button.tsx";
import WishlistIcon from "deco-sites/fashion/islands/WishlistButton.tsx";
import { useOffer } from "deco-sites/fashion/sdk/useOffer.ts";
import { formatPrice } from "deco-sites/fashion/sdk/format.ts";
import { useVariantPossibilities } from "deco-sites/fashion/sdk/useVariantPossiblities.ts";
import type { Product } from "deco-sites/std/commerce/types.ts";
import Icon from "deco-sites/fashion/components/ui/Icon.tsx";

/**
 * A simple, inplace sku selector to be displayed once the user hovers the product card
 * It takes the user to the pdp once the user clicks on a given sku. This is interesting to
 * remove JS from the frontend
 */
function Sizes(product: Product) {
  const possibilities = useVariantPossibilities(product);
  const options = Object.entries(
    possibilities["TAMANHO"] ?? possibilities["Tamanho"] ?? {},
  );

  return (
    <ul class="flex justify-center items-center gap-2">
      {options.map(([value, urls]) => {
        const url = urls.find((url) => url === product.url) || urls[0];

        return (
          <a href={url}>
            <Avatar
              class="bg-default"
              variant="abbreviation"
              content={value}
              disabled={url === product.url}
            />
          </a>
        );
      })}
    </ul>
  );
}

interface Props {
  product: Product;
  /** Preload card image */
  preload?: boolean;

  /** @description used for analytics event */
  itemListName?: string;
}

function ProductCard({ product, preload, itemListName }: Props) {
  const {
    url,
    productID,
    name,
    image: images,
    offers,
    isVariantOf,
  } = product;
  const [front, back] = images ?? [];
  const { listPrice, price, seller } = useOffer(offers);

  return (
    <div
      data-deco="view-product"
      id={`product-card-${productID}`}
      class=" group max-w-[240px]"
    >
      <a href={url} aria-label="product link">
        <div class="relative w-full">
          <div class="absolute flex justify-center  top-0 left-0 bg-white w-[34px] h-[34px] px-0  rounded-full shadow">
            <WishlistIcon
              productId={isVariantOf?.productGroupID}
              sku={productID}
              title={name}
            />
          </div>
          <div class="p-10">
            <Image
              src={front.url!}
              alt={front.alternateName}
              width={200}
              height={279}
              class=" w-full"
              preload={preload}
              loading={preload ? "eager" : "lazy"}
              sizes=""
            />
          </div>

          {seller && (
            <div
              class="absolute bottom-0 hidden sm:group-hover:flex flex-col gap-2 w-full p-2 bg-opacity-10"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                backdropFilter: "blur(2px)",
              }}
            >
              <Sizes {...product} />
              <Button as="a" href={product.url}>
                <Icon
                  id="Heart"
                  width={20}
                  height={20}
                  strokeWidth={2}
                  fill="black"
                />
              </Button>
              {/* FIXME: Understand why fresh breaks rendering this component */}
              {
                /* <SendEventButton
                as="a"
                href={product.url}
                event={{
                  name: "select_item",
                  params: {
                    item_list_name: itemListName,
                    items: [
                      mapProductToAnalyticsItem({
                        product,
                        price,
                        listPrice,
                      }),
                    ],
                  },
                }}
              >
                Visualizar Produto
              </SendEventButton> */
              }
            </div>
          )}
        </div>

        <div class="flex flex-col gap-1 py-2">
          <Text
            class="overflow-hidden overflow-ellipsis whitespace-nowrap"
            variant="caption"
          >
            {name}
          </Text>
          <div class="flex items-center gap-2">
            <div class="flex flex-col gap-1">
              <Text
                class="line-through"
                variant="list-price"
                tone="subdued"
              >
                {formatPrice(listPrice, offers!.priceCurrency!)}
              </Text>
              <Text variant="caption" tone="price">
                {formatPrice(price, offers!.priceCurrency!)}
              </Text>
            </div>

            <Text variant="caption" tone="subdued">
              -25%
            </Text>
            `
          </div>
        </div>
      </a>
    </div>
  );
}

export default ProductCard;
