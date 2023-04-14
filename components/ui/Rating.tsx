import Container from "./Container.tsx";
import Text from "deco-sites/fashion/components/ui/Text.tsx";
import Button from "deco-sites/fashion/components/ui/Button.tsx";
import Icon from "./Icon.tsx";

function Rating() {
  return (
    <Container class="w-full p-8">
      <section class="p-8 border leading-[1.15rem] text-base text-[#36403b] rounded-[0.5rem] border-[#dadedc] flex flex-col gap-4 items-start">
        <Text
          variant="heading-2"
          class="text-[#3f3f40] text-[1.17em] !font-bold"
        >
          Avaliações
        </Text>
        <div class="flex flex-wrap justify-around w-full gap-4">
          <ol class="">
            <li class="flex items-center gap-[12px]">
              <p>5 estrelas</p>{" "}
              <div class="relative w-[128px] h-[4px] bg-[#f7f9fa]">
                <div class={`absolute h-[4px] w-[${1 / 2 * 100}%] bg-[#fc0]`} />
              </div>
              <p>1</p>
            </li>
            <li class="flex items-center gap-[12px]">
              <p>4 estrelas</p>{" "}
              <div class="relative w-[128px] h-[4px] bg-[#f7f9fa]">
                <div class={`absolute h-[4px] w-[${0 / 2 * 100}%] bg-[#fc0]`} />
              </div>
              <p>0</p>
            </li>
            <li class="flex items-center gap-[12px]">
              <p>3 estrelas</p>{" "}
              <div class="relative w-[128px] h-[4px] bg-[#f7f9fa]">
                <div class={`absolute h-[4px] w-[${1 / 2 * 100}%] bg-[#fc0]`} />
              </div>
              <p>1</p>
            </li>
            <li class="flex items-center gap-[12px]">
              <p>2 estrelas</p>{" "}
              <div class="relative w-[128px] h-[4px] bg-[#f7f9fa]">
                <div class={`absolute h-[4px] w-[${0 / 2 * 100}%] bg-[#fc0]`} />
              </div>
              <p>0</p>
            </li>
            <li class="flex items-center gap-[12px]">
              <p>1 estrelas</p>{" "}
              <div class="relative w-[128px] h-[4px] bg-[#f7f9fa]">
                <div class={`absolute h-[4px] w-[${0 / 2 * 100}%] bg-[#fc0]`} />
              </div>
              <p>0</p>
            </li>
          </ol>
          <div class="flex flex-col items-center">
            <div class="flex items-center gap-1">
              <span class="text-[#fc0] text-[24px] tracking-[0px] font-bold leading-none">
                &#9733;&#9733;&#9733;&#9733;<span class="text-[#eee] text-[24px] tracking-[0px] font-bold leading-none">
                  &#9733;
                </span>
              </span>
              <p>4.0</p>
            </div>
            <p class="m-4">2 avaliações</p>
          </div>
          <div class="flex gap-3 items-center">
            <span class="border-[0.125rem] border-[#fc0] w-[4rem] h-[4rem] rounded-full flex items-center justify-center">
              80%
            </span>
            <p>Recomendam este produto</p>
          </div>
        </div>
        <div class="w-full border-b border-[#dadedc] my-4" />
        <div>
          <div class="flex items-center justify-between w-full flex-wrap gap-1">
            <span class="text-[#fc0] text-[24px] tracking-[0px] font-bold leading-none">
              &#9733;&#9733;&#9733;&#9733;&#9733;
            </span>
            <p>Enviado há 6 meses</p>
          </div>
          <p class="my-5 text-[20px]">Competitivo.</p>
          <p class="font-bold text-sm">
            Você recomendaria esse produto a um amigo?
          </p>
          <p class="text-sm mb-4">Sim</p>
          <div class="flex flex-wrap gap-4">
            <p>
              <span class="font-bold">Por</span> Vivian C.
            </p>
            <p>
              <span class="font-bold">De</span> São Paulo - SP
            </p>
          </div>
        </div>
        <div class="w-full border-b border-[#dadedc] my-4" />
        <div>
          <div class="flex items-center justify-between w-full flex-wrap gap-1">
            <span class="text-[#fc0] text-[24px] group tracking-[0px] font-bold leading-none">
              &#9733;&#9733;&#9733;<span class="text-[#eee] text-[24px] tracking-[0px] font-bold leading-none">
                &#9733;&#9733;
              </span>
            </span>
            <p>Enviado há 6 meses</p>
          </div>
          <p class="my-5 text-[20px]">Normal.</p>
          <p class="font-bold text-sm">
            Você recomendaria esse produto a um amigo?
          </p>
          <p class="text-sm mb-4">Sim</p>
          <div class="flex flex-wrap gap-4">
            <p>
              <span class="font-bold">Por</span> Vivian C.
            </p>
            <p>
              <span class="font-bold">De</span> São Paulo - SP
            </p>
          </div>
        </div>
        <div class="w-full border-b border-[#dadedc] mt-4" />
        <div class="flex flex-col w-full items-start">
          <div class="self-end text-[#848a87] flex items-center gap-3">
            <p class="font-normal">1 - 1 de 1</p>
            <div class="flex gap-1">
              <Button class="border-2  h-auto p-1 !border-[#dadedc] bg-[#f2f7f5]">
                <Icon
                  size={20}
                  id="ChevronLeft"
                  class="text-[#848a87]"
                  strokeWidth={4}
                />
              </Button>
              <Button class="border-2 h-auto p-1  !border-[#dadedc] bg-[#f2f7f5]">
                <Icon
                  size={20}
                  id="ChevronRight"
                  class="text-[#848a87]"
                  strokeWidth={4}
                />
              </Button>
            </div>
          </div>
          <Button variant="alternative" class="h-[40px]">
            ESCREVER AVALIAÇÃO
          </Button>
        </div>
      </section>
    </Container>
  );
}

export default Rating;
