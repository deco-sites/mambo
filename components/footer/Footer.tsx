import Newsletter from "./Newsletter.tsx";
import type { ComponentChildren } from "preact";
import Icon from "deco-sites/mambo/components/ui/Icon.tsx";
import type { Props as NewsletterProps } from "./Newsletter.tsx";

export interface Props {
  newsletter: NewsletterProps;
  copyright: string[];
}

function Footer(props: Props) {
  return (
    <footer class="w-full flex flex-col divide-y-1 divide-gray-50 mt-12">
      <FooterContainer class="w-full bg-[#F0E6E6]">
        <Newsletter {...props.newsletter} />
      </FooterContainer>

      <FooterContainer class="w-full bg-white">
        <div class="flex flex-col lg:flex-row items-center gap-6 max-w-[1440px] w-full justify-center lg:justify-between lg:items-start text-gray-700">
          <div class="text-sm flex flex-col gap-2">
            Aceitamos os seguintes cartões de crédito:

            <ul class="flex flex-row gap-4 items-center justify-center lg:justify-start">
              <li>
                <Icon id="Elo" width={24} height={24} strokeWidth={1} />
              </li>
              <li>
                <Icon id="Mastercard" width={24} height={24} strokeWidth={1} />
              </li>
              <li>
                <Icon id="Visa" width={24} height={24} strokeWidth={1} />
              </li>
            </ul>
          </div>

          <div class="text-sm flex flex-col gap-2 items-center">
            Certificados e Segurança
            <img src="/selo-ssl.png" alt="Selo SSL" />
          </div>
        </div>
      </FooterContainer>

      <FooterContainer class="w-full bg-[#E6E6E6] border-t-1 border-solid border-[#f2f7f5]">
        <div class="flex flex-col lg:flex-row gap-6 max-w-[1440px] w-full text-gray-700">
          <Icon id="Logo" width={130} height={28} />

          <div class="flex flex-col gap-2 text-xs">
            {props.copyright.map((str) => <p>{str}</p>)}
          </div>
        </div>
      </FooterContainer>
    </footer>
  );
}

function FooterContainer(
  { children, class: _class = "" }: {
    class?: string;
    children: ComponentChildren;
  },
) {
  return (
    <div
      class={`flex justify-center items-center py-6 px-4 sm:py-12 ${_class}`}
    >
      {children}
    </div>
  );
}

export default Footer;
