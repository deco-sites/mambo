import Container from "deco-sites/fashion/components/ui/Container.tsx";
import Text from "deco-sites/fashion/components/ui/Text.tsx";
import Button from "deco-sites/fashion/components/ui/Button.tsx";
import Icon from "./Icon.tsx";

function QuestionAndAnswer() {
  return (
    <Container class="w-full p-8 font-mont">
      <section class="p-8 border rounded-[0.5rem] border-[#dadedc] flex flex-col gap-4 items-start">
        <Text
          variant="heading-2"
          class="text-[#3f3f40] text-[1.17em] font-bold"
        >
          Perguntas & Respostas
        </Text>
        <Text class="text-base text-[#36403b] tracking-normal">
          Tem alguma dúvida sobre este produto? Pergunte ao lojista e a outros
          compradores!
        </Text>
        <Button variant="alternative" class="h-[40px]">FAZER PERGUNTA</Button>
        <div class="w-full border-b border-[#dadedc]" />
        <Text class="text-base text-[#36403b] tracking-normal font-normal">
          Este produto ainda não possui Perguntas e Respostas.
        </Text>
        <div class="self-end text-[#848a87] flex items-center gap-3">
          <p class="font-normal">1 - 0 de 0</p>
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
      </section>
    </Container>
  );
}

export default QuestionAndAnswer;
