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
  const highlighted = items.filter((item) => item.highlighted);

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
      <div class="hidden lg:block shadow-lg">
        <div class="flex flex-row justify-between items-center border-b-1 border-default w-full h-[80px]">
          <Container class="flex flex-row gap-20 w-full">
            <a href="/" aria-label="Store logo" class="flex items-center">
              <Icon id="Logo" width={100} height={21} />
            </a>

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

        <Container class="flex flex-row gap-20 w-full h-[48px] items-center">
          <div class="relative flex flex-col items-center group h-full">
            <span class="h-full font-bold cursor-pointer flex flex-row gap-2 text-gray-700 items-center">
              <Icon id="Bars3" width={16} height={16} strokeWidth={1} />
              Todas as categorias
            </span>

            <div class="hidden group-hover:block absolute top-full left-0 rounded-bl-lg">
              <ul class="flex flex-col relative py-2 shadow-lg bg-white w-[270px] z-20">
                {items.map((item) => (
                  <li class="text-sm text-gray-600 hover:text-primary">
                    <a
                      href={item.href}
                      class="flex flex-row gap-2 items-center font-light px-4 py-2 hover:sibling:grid"
                    >
                      <Icon
                        width={24}
                        height={24}
                        id={item.icon!}
                        strokeWidth={0.5}
                      />
                      {item.label}
                    </a>

                    {Boolean(item.children?.length) && (
                      <ul class="absolute bg-[#f8f9fc] h-full hidden hover:grid grid-cols-[200px_200px_200px_200px] gap-6 top-0 left-full px-8 py-4 shadow-lg z-10">
                        {item.children?.map((item) => (
                          <li class="text-default flex flex-col gap-2">
                            <a
                              href={item.href}
                              class="whitespace-nowrap font-bold"
                            >
                              {item.label}
                            </a>

                            {item.children && (
                              <ul class="flex flex-col gap-2">
                                {item.children.map((item) => (
                                  <li class="text-default hover:text-primary">
                                    <a href={item.href}>
                                      {item.label}
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <ul class="flex flex-row gap-12 items-center ml-auto">
            {highlighted.map((item) => (
              <li class="text-sm">
                <a
                  href={item.href}
                  class="flex flex-row gap-2 items-center text-gray-600 hover:text-primary font-light"
                >
                  <Icon
                    width={24}
                    height={24}
                    id={item.icon!}
                    strokeWidth={0.5}
                  />
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </>
  );
}

export default Navbar;
