import Icon from "deco-sites/fashion/components/ui/Icon.tsx";
import Button from "deco-sites/fashion/components/ui/Button.tsx";
import { useUI } from "deco-sites/fashion/sdk/useUI.ts";
import { useCart } from "deco-sites/std/commerce/vtex/hooks/useCart.ts";
import { sendAnalyticsEvent } from "deco-sites/std/commerce/sdk/sendAnalyticsEvent.ts";

function SearchButton() {
  const { displaySearchbar } = useUI();

  return (
    <Button
      variant="icon"
      aria-label="search icon button"
      onClick={() => {
        displaySearchbar.value = !displaySearchbar.peek();
      }}
    >
      <Icon id="MagnifyingGlass" width={20} height={20} strokeWidth={0.1} />
    </Button>
  );
}

function MenuButton() {
  const { displayMenu } = useUI();

  return (
    <Button
      variant="icon"
      class="text-primary"
      aria-label="open menu"
      onClick={() => {
        displayMenu.value = true;
      }}
    >
      <Icon id="Bars3" width={20} height={20} strokeWidth={0.01} />
    </Button>
  );
}

function CartButton() {
  const { displayCart } = useUI();
  const { loading, cart, mapItemsToAnalyticsItems } = useCart();
  const totalItems = cart.value?.items.length || null;
  const dataDeco = displayCart.value ? {} : { "data-deco": "open-cart" };
  const currencyCode = cart.value?.storePreferencesData.currencyCode;
  const total = cart.value?.totalizers.find((item) => item.id === "Items");
  const discounts = cart.value?.totalizers.find((item) =>
    item.id === "Discounts"
  );

  return (
    <div
      {...dataDeco}
      class="relative flex flex-row gap-2 cursor-pointer"
      aria-label="open cart"
      disabled={loading.value}
      onClick={() => {
        displayCart.value = true;
        sendAnalyticsEvent({
          name: "view_cart",
          params: {
            currency: cart.value ? currencyCode! : "",
            value: total?.value
              ? (total?.value - (discounts?.value ?? 0)) / 100
              : 0,

            items: cart.value ? mapItemsToAnalyticsItems(cart.value) : [],
          },
        });
      }}
    >
      <Icon id="ShoppingCart" width={32} height={32} strokeWidth={2} />
      {totalItems && (
        <span class="absolute text-[9px] right-0 top-0 rounded-full bg-badge text-white w-4 h-4 flex items-center justify-center">
          {totalItems}
        </span>
      )}

      <span class="font-bold text-xs block">
        Meu<br />
        Carrinho
      </span>
    </div>
  );
}

function HeaderButton({ variant }: { variant: "cart" | "search" | "menu" }) {
  if (variant === "cart") {
    return <CartButton />;
  }

  if (variant === "search") {
    return <SearchButton />;
  }

  if (variant === "menu") {
    return <MenuButton />;
  }

  return null;
}

export default HeaderButton;
