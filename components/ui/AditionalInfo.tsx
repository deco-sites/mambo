import Icon from "deco-sites/fashion/components/ui/Icon.tsx";

function AditionalInfo() {
  return (
    <ul class="list-none flex flex-col lg:flex-row gap-4 py-4 text-sm mt-6">
      <li>
        <div class={`flex gap-3 `}>
          <Icon
            id="CreditCard"
            class="text-[#f44237]"
            width={16}
            height={16}
            strokeWidth={2}
          />
          <p class="hover:text-[#f44237] hover:cursor-pointer">
            Condições de pagamento
          </p>
        </div>
      </li>
      <li>
        <div class={`flex gap-3`}>
          <Icon
            id="Truck"
            class="text-[#f44237]"
            width={16}
            height={16}
            strokeWidth={2}
          />
          <p class="hover:text-[#f44237] hover:cursor-pointer">
            Consultar informações de entrega
          </p>
        </div>
      </li>
    </ul>
  );
}

export default AditionalInfo;
