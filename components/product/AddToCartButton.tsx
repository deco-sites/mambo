import Button from "deco-sites/fashion/components/ui/Button.tsx";
import {
  Options as UseAddToCartProps,
  useAddToCart,
} from "deco-sites/fashion/sdk/useAddToCart.ts";

interface Props extends UseAddToCartProps {
  /**
   * @description Product id
   */
  sellerId: string;
}

function AddToCartButton(
  { skuId, sellerId, discount, price, productGroupId, name }: Props,
) {
  const props = useAddToCart({
    skuId,
    sellerId,
    discount,
    price,
    productGroupId,
    name,
  });

  return (
    <Button
      variant="alternative"
      data-deco="add-to-cart"
      {...props}
      class="w-full h-[48px] !text-base !font-bold"
    >
      Adicionar
    </Button>
  );
}

export default AddToCartButton;
