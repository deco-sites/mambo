import Text from "deco-sites/fashion/components/ui/Text.tsx";
import Avatar from "deco-sites/fashion/components/ui/Avatar.tsx";
import type {
  Filter,
  FilterToggle,
  ProductListingPage,
} from "deco-sites/std/commerce/types.ts";

interface Props {
  filters: ProductListingPage["filters"];
}

const isToggle = (filter: Filter): filter is FilterToggle =>
  filter["@type"] === "FilterToggle";

function FilterValues({ key, values }: FilterToggle) {
  const flexDirection = key === "tamanho" || key === "cor"
    ? "flex-row"
    : "flex-col";

  return (
    <div class={`flex flex-wrap gap-2 ${flexDirection}`}>
      {values.map(({ label, value, url, selected, quantity }) => {
        if (key === "cor") {
          return (
            <a href={url} title={value}>
              <Avatar
                // deno-lint-ignore no-explicit-any
                content={value as any}
                disabled={selected}
                variant="color"
              />
            </a>
          );
        }

        if (key === "tamanho") {
          return (
            <a href={url} title={label}>
              <Avatar
                content={label}
                disabled={selected}
                variant="abbreviation"
              />
            </a>
          );
        }

        return (
          <a href={url} class="flex items-center gap-2">
            <input
              type="checkbox"
              checked={selected}
              onChange={() => (window.location.href = url)}
            />
            <Text variant="caption">{label}</Text>
            <Text tone="subdued" variant="caption">
              ({quantity})
            </Text>
          </a>
        );
      })}
    </div>
  );
}

function Filters({ filters }: Props) {
  const lastFilterIndex = filters.length - 1;

  return (
    <ul class="flex flex-col gap-6">
      {filters
        .filter(isToggle)
        .map((filter, index) => {
          const isLast = index === lastFilterIndex;
          const border = isLast
            ? "border-b-1 border-solid border-gray-200 pb-6"
            : "";

          return (
            <li class={`flex flex-col gap-4 ${border}`}>
              <span class="text-body text-default font-semibold">
                {filter.label}
              </span>

              <div class="h-full max-h-[240px] overflow-scroll">
                <FilterValues {...filter} />
              </div>
            </li>
          );
        })}
    </ul>
  );
}

export default Filters;
