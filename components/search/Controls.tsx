import Icon from "deco-sites/fashion/components/ui/Icon.tsx";
import Button from "deco-sites/fashion/components/ui/Button.tsx";
import Sort from "deco-sites/fashion/components/search/Sort.tsx";
import type { ProductListingPage } from "deco-sites/std/commerce/types.ts";

type Props =
  & Pick<ProductListingPage, "filters" | "sortOptions">
  & {
    displayFilter?: boolean;
  };

function SearchControls(props: Props) {
  const { displayFilter, sortOptions } = props;

  return (
    <div class="flex flex-col items-center justify-between gap-4 sm:(p-0 flex-row h-[53px] border-none) border-b-1 pb-8">
      <div class="order-2 lg:order-1 w-full text-center lg:text-left">
        <b>792</b> produtos encontrados
      </div>

      <div class="flex flex-row items-center justify-between w-full order-1 lg:order-2 lg:p-0 px-6">
        <Button variant="secondary" class={displayFilter ? "" : "sm:hidden"}>
          <Icon id="FilterList" class="text-primary" width={16} height={16} />
          Filtrar por
        </Button>

        {sortOptions.length > 0 && <Sort sortOptions={sortOptions} />}
      </div>
    </div>
  );
}

export default SearchControls;
