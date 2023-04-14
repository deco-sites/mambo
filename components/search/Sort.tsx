import { useMemo } from "preact/hooks";
import Text from "deco-sites/fashion/components/ui/Text.tsx";
import { ProductListingPage } from "deco-sites/std/commerce/types.ts";
import type { JSX } from "preact";

const SORT_QUERY_PARAM = "sort";

const useSort = () =>
  useMemo(() => {
    const urlSearchParams = new URLSearchParams(window.location?.search);
    return urlSearchParams.get(SORT_QUERY_PARAM) ?? "";
  }, []);

// TODO: Replace with "search utils"
const applySort = (e: JSX.TargetedEvent<HTMLSelectElement, Event>) => {
  const urlSearchParams = new URLSearchParams(window.location.search);

  console.log(e.currentTarget.value);

  urlSearchParams.set(SORT_QUERY_PARAM, e.currentTarget.value);
  window.location.search = urlSearchParams.toString();
};

export type Props = Pick<ProductListingPage, "sortOptions">;

function Sort({ sortOptions }: Props) {
  const sort = useSort();

  return (
    <div class="ml-auto flex flex-row gap-6 items-center justify-center">
      <span class="hidden lg:block text-gray-600">
        Ordernar por
      </span>

      <div class="border-1 border-solid border-gray-200 rounded px-2">
        <select
          id="sort"
          name="sort"
          title="Sort"
          onInput={applySort}
          class="w-min h-[36px] p-0 m-0 text-primary text-button cursor-pointer outline-none bg-transparent"
        >
          {sortOptions.map(({ value, label }) => (
            <option
              key={value}
              value={value}
              selected={value === sort}
              class="text-primary text-button"
            >
              {label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default Sort;
