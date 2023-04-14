import { Product } from "deco-sites/std/commerce/types.ts";

import ProductCard from "./ProductCard.tsx";

export interface Columns {
  mobile?: number;
  desktop?: number;
}

export interface Props {
  products: Product[] | null;
  /**
   * @description Number of products per line on grid
   */
  columns: Columns;
}

function ProductGallery({ columns, products }: Props) {
  const { desktop = 5, mobile = 2 } = columns ?? {};

  return (
    <div
      class={`grid grid-cols-${mobile} gap-2 items-center sm:(grid-cols-${desktop} gap-0)`}
    >
      {products?.map((product, index) => (
        <div class="hover:sm:(border-primary) sm:(px-4 py-8) border-1 border-solid rounded h-full border-transparent">
          <ProductCard product={product} preload={index === 0} />
        </div>
      ))}
    </div>
  );
}

export default ProductGallery;
