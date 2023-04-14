import Text from "deco-sites/fashion/components/ui/Text.tsx";
import Icon from "deco-sites/fashion/components/ui/Icon.tsx";
import type { BreadcrumbList } from "deco-sites/std/commerce/types.ts";

interface Props {
  itemListElement: BreadcrumbList["itemListElement"];
}

function Item(
  props: { name?: string; item?: string; isActive: boolean },
) {
  const { name, item, isActive } = props;

  if (!name || !item) {
    return null;
  }

  return (
    <li class="whitespace-nowrap overflow-hidden overflow-ellipsis">
      <a href={item} class="hover:underline">
        <Text
          variant="caption"
          class={isActive ? "text-primary" : "text-gray-400"}
        >
          {name}
        </Text>
      </a>
    </li>
  );
}

function Breadcrumb({ itemListElement = [] }: Props) {
  const lastIndex = itemListElement.length - 1;
  return (
    <ul class="flex flex-row gap-2 items-center w-full">
      <Item name="Home" item="/" isActive={false} />

      {itemListElement.map((item, index) => (
        <>
          <li class="mt-0.5">
            <Icon
              width={14}
              height={14}
              strokeWidth={4}
              id="ChevronRight"
              class="text-gray-200"
            />
          </li>

          <Item {...item} isActive={index === lastIndex} />
        </>
      ))}
    </ul>
  );
}

export default Breadcrumb;
