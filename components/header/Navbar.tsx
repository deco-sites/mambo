import { navbarHeight } from "./constants.ts";
import type { INavItem } from "./NavItem.tsx";
import Icon from "deco-sites/fashion/components/ui/Icon.tsx";
import HeaderButton from "deco-sites/fashion/islands/HeaderButton.tsx";
import Container from "deco-sites/fashion/components/ui/Container.tsx";
import Searchbar from "deco-sites/fashion/components/search/Searchbar.tsx";
import type { Props as SearchbarProps } from "deco-sites/fashion/components/search/Searchbar.tsx";

function Navbar({ items, searchbar }: {
  items: INavItem[];
  searchbar: SearchbarProps;
}) {
  const highlighted = items;

  return (
    <>
      {/* Mobile Version */}
      <div
        class={`lg:hidden flex flex-row justify-between items-center h-[${navbarHeight}] border-b-1 border-default w-full px-2 gap-2`}
      >
        <HeaderButton variant="menu" />

        <a
          href="/"
          class={`flex-grow inline-flex items-center min-h-[${navbarHeight}]`}
          aria-label="Mambo delivery"
        >
          <Icon id="Logo" width={100} height={21} />
        </a>
      </div>

      {/* Desktop Version */}
      <div class="shadow-lg">
        <div class="hidden lg:flex flex-row justify-between items-center border-b-1 border-default w-full h-[80px]">
          <Container class="flex flex-row gap-20 w-full">
            <div class="flex-none">
              <a href="/" aria-label="Store logo" class="block">
                <Icon id="Logo" width={100} height={21} />
              </a>
            </div>

            <Searchbar {...searchbar} />

            <div class="flex-none flex items-center justify-end gap-8 text-gray-700">
              <a href="#" aria-label="Log in">
                <div class="flex flex-row gap-2">
                  <Icon id="User" width={32} height={32} strokeWidth={0.4} />

                  <span class="font-bold text-xs block">
                    Entre ou<br />
                    cadastre-se
                  </span>
                </div>
              </a>

              <a href="#" aria-label="Log in">
                <div class="flex flex-row gap-2">
                  <Icon id="MapPin" width={32} height={32} strokeWidth={2} />

                  <span class="text-xs block">
                    Retirar em:<br />
                    <b>Brooklin</b>
                  </span>
                </div>
              </a>

              <a href="#" aria-label="Log in">
                <div class="flex flex-row gap-2">
                  <Icon id="Heart" width={32} height={32} strokeWidth={2} />

                  <span class="font-bold text-xs block">
                    Minha<br />
                    Lista
                  </span>
                </div>
              </a>

              <HeaderButton variant="cart" />
            </div>
          </Container>
        </div>

        <Container class="flex flex-row gap-20 w-full h-[48px]">
          <div>
            <h1>ok</h1>
          </div>
        </Container>
      </div>
    </>
  );
}

export default Navbar;
