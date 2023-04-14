import { useSignal } from "@preact/signals";
import Icon from "deco-sites/fashion/components/ui/Icon.tsx";
import Text from "deco-sites/fashion/components/ui/Text.tsx";

function AditionalInfo() {
  const expanded = useSignal(0);

  return (
    <div class="list-none flex flex-col gap-4 py-4">
      <li onClick={() => expanded.value = 1}>
        <div class={`flex gap-3 `}>
          <Icon
            id="CreditCard"
            class="text-[#f44237]"
            width={16}
            height={16}
            strokeWidth={1}
          />
          <p
            class={`${
              expanded.value === 1
                ? "border-b-4 border-[#f44237]  leading-none"
                : ""
            } hover:text-[#f44237] hover:cursor-pointer`}
          >
            Condições de pagamento
          </p>
        </div>
        {expanded.value === 1 &&
          (
            <div class="flex flex-col gap-4 p-4 card-box-shadow rounded-[6px] mb-5 mt-1 max-w-[510px]">
              <Text class="text-[#f44237] !font-bold">
                Aceitamos as principais bandeiras de cartão de crédito.
              </Text>
              <div class="flex flex-row gap-2 mt-2 justify-center md:justify-start">
                <Icon
                  media="(min-width: 768px)"
                  id={"Visa"}
                  width={30}
                  height={25}
                  strokeWidth={0.05}
                />
                <Icon
                  media="(min-width: 768px)"
                  id={"Mastercard"}
                  width={30}
                  height={25}
                  strokeWidth={0.05}
                />
                <Icon
                  media="(min-width: 768px)"
                  id={"Elo"}
                  width={30}
                  height={25}
                  strokeWidth={0.05}
                />
              </div>
            </div>
          )}
      </li>
      <li onClick={() => expanded.value = 2}>
        <div class={`flex gap-3`}>
          <Icon
            id="Truck"
            class="text-[#f44237]"
            width={16}
            height={16}
            strokeWidth={1}
          />
          <p
            class={`${
              expanded.value === 2
                ? "border-b-4 border-[#f44237]  leading-none"
                : ""
            } hover:text-[#f44237] hover:cursor-pointer`}
          >
            Consultar informações de entrega
          </p>
        </div>
        {expanded.value === 2 &&
          (
            <ul class="flex flex-col gap-4 p-4 mb-5 mt-1">
              <li class="flex gap-4 items-center">
                <Icon
                  id="ShoppingCart"
                  class="text-[#f44237]"
                  width={16}
                  height={16}
                  strokeWidth={2}
                />
                <p class="text-[#f44237] font-bold">
                  Retirar na Loja - Frete Grátis
                </p>
              </li>
              <li class="flex gap-4 items-center">
                <Icon
                  id="Truck"
                  class="text-[#f44237]"
                  width={16}
                  height={16}
                  strokeWidth={2}
                />
                <p class="text-[#f44237] font-bold">
                  Entrega Agendada: A partir de R$ 12,90
                </p>
              </li>
            </ul>
          )}
      </li>
    </div>
  );
}

export default AditionalInfo;
