import Alert from "./Alert.tsx";
import Navbar from "./Navbar.tsx";
import type { LoaderReturnType } from "$live/types.ts";
import { headerHeight, navbarHeight } from "./constants.ts";
import Modals from "deco-sites/fashion/islands/HeaderModals.tsx";
import type { Suggestion } from "deco-sites/std/commerce/types.ts";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";
import Icon, { AvailableIcons } from "deco-sites/mambo/components/ui/Icon.tsx";
import type { EditableProps as SearchbarProps } from "deco-sites/fashion/components/search/Searchbar.tsx";

export interface NavItem {
  label: string;
  href: string;
  icon: AvailableIcons;
  highlighted: boolean;
  children?: Array<{
    label: string;
    href: string;
    children?: Array<{
      label: string;
      href: string;
    }>;
  }>;
}

export interface Props {
  Alert: LiveImage;

  /** @title Search Bar */
  searchbar?: SearchbarProps;

  /**
   * @title Navigation items
   * @description Navigation items used both on mobile and desktop menus
   */
  navItems?: NavItem[];

  /**
   * @title Enable Top Search terms
   */
  suggestions?: LoaderReturnType<Suggestion | null>;
}

function Header(
  {
    Alert: alert,
    searchbar: _searchbar,
    navItems = [],
    suggestions,
  }: Props,
) {
  const searchbar = { ..._searchbar, suggestions };

  return (
    <header class={`lg:h-[${headerHeight}] h-[${navbarHeight}]`}>
      <div class="bg-default fixed w-full z-50">
        <Alert image={alert} />
        <Navbar items={navItems} searchbar={searchbar} />
      </div>

      <Modals
        menu={{ items: navItems }}
        searchbar={searchbar}
      />
    </header>
  );
}

export default Header;
