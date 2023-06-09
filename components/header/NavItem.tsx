import { headerHeight } from "./constants.ts";
import Image from "deco-sites/std/components/Image.tsx";
import Text from "deco-sites/fashion/components/ui/Text.tsx";
import Icon, { AvailableIcons } from "deco-sites/mambo/components/ui/Icon.tsx";

export interface INavItem {
  label: string;
  href: string;
  icon?: AvailableIcons;
  highlighted?: boolean;
  children?: Array<{
    label: string;
    href: string;
    children?: Array<{
      label: string;
      href: string;
    }>;
  }>;
}

function NavItem({ item }: { item: INavItem }) {
  const { href, label, children } = item;

  return (
    <li class="group flex items-center">
      <a href={href} class="px-4 py-3">
        <Text
          class="group-hover:border-black border-solid border-b border-white"
          variant="menu"
        >
          {label}
        </Text>
      </a>

      {children && children.length > 0 &&
        (
          <div
            class={`fixed invisible hover:visible group-hover:visible bg-default z-50 flex items-start justify-center gap-6 border-t-1 border-b-2 border-default w-screen mt-[${headerHeight}]`}
            style={{ top: "0px", left: "0px" }}
          >
            <ul class="flex items-start justify-center gap-6">
              {children.map((node) => (
                <li class="p-6">
                  <a class="hover:underline" href={node.href}>
                    <Text variant="menu">{node.label}</Text>
                  </a>

                  <ul class="flex flex-col gap-1 mt-4">
                    {node.children?.map((leaf) => (
                      <li>
                        <a class="hover:underline" href={leaf.href}>
                          <Text variant="caption">{leaf.label}</Text>
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        )}
    </li>
  );
}

export default NavItem;
