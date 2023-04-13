import Icon, {
  AvailableIcons,
} from "deco-sites/fashion/components/ui/Icon.tsx";
import Text from "deco-sites/fashion/components/ui/Text.tsx";
import Container from "deco-sites/fashion/components/ui/Container.tsx";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";
import Image from "deco-sites/std/components/Image.tsx";

import Newsletter from "./Newsletter.tsx";
import type { Props as NewsletterProps } from "./Newsletter.tsx";
import type { ComponentChildren } from "preact";
import {
  Picture,
  Source,
} from "https://denopkg.com/deco-sites/std@1.0.0-rc.13/components/Picture.tsx";

export type IconItem = { icon: AvailableIcons };
export type StringItem = {
  label: string;
  href: string;
};

export type Item = StringItem | IconItem;

export type Section = {
  label: string;
  children: Item[];
};

const isIcon = (item: Item): item is IconItem =>
  // deno-lint-ignore no-explicit-any
  typeof (item as any)?.icon === "string";

function SectionItem({ item }: { item: Item }) {
  return (
    <Text variant="caption" tone="default">
      {isIcon(item)
        ? (
          <Icon
            id={item.icon}
            width={20}
            height={15}
            strokeWidth={1}
          />
        )
        : (
          <a href={item.href}>
            {item.label}
          </a>
        )}
    </Text>
  );
}

function FooterContainer(
  { children, class: _class = "" }: {
    class?: string;
    children: ComponentChildren;
  },
) {
  return <div class={`py-6 px-4 sm:py-12 sm:px-0 ${_class}`}>{children}</div>;
}

export interface Props {
  links: Array<{
    title: string;
    items: Array<{
      icon: AvailableIcons;
      title: string;
      href: string;
    }>;
  }>;
  support: {
    phoneNumber: string;
    openingHours: string[];
  };
  social: Array<{
    icon: AvailableIcons;
    href: string;
  }>;
  copyright: {
    logo: LiveImage;
    lines: string[];
  };
}

function Footer({ links = [], support, social = [], copyright }: Props) {
  return (
    <footer class="w-full flex flex-col divide-y-1 divide-gray-50">
      <FooterContainer class="w-full bg-[#F0E6E6]">
        <Newsletter
          icon={""}
          title={"Inscreva-se e receba nossas promoções e novidades exclusivas"}
          button={"Enviar"}
          placeholders={{
            name: "Primeiro nome",
            email: "Seu e-mail",
          }}
        />
      </FooterContainer>

      <FooterContainer class="bg-white w-full">
        {/* Desktop view */}
        <ul class="hidden sm:flex flex-row gap-20 mx-5">
          {links.map((link) => (
            <li>
              <div>
                <Text
                  variant="heading-3"
                  class="uppercase text-[#7A7A7A]"
                >
                  {link.title}
                </Text>

                <ul
                  class={`flex ${
                    isIcon(link.items[0]) ? "flex-col" : "flex-col"
                  } gap-3 pt-10 flex-wrap`}
                >
                  {link.items.map((item) => (
                    <li class="flex flex-row gap-2">
                      <SectionItem item={item} />
                      <Text class="text-[#7A7A7A] text-sm hover:font-black">
                        {item.title}
                      </Text>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
          <li>
            <div>
              <Text variant="heading-3" class="text-[#7A7A7A]">
                Dúvidas ou Suporte:
              </Text>
              <ul>
                <li class="flex flex-col mt-10 text-body">
                  <Text variant="heading-3" class="font-black">
                    Regiões Metropolitanas
                  </Text>
                  {support.phoneNumber}
                </li>
                <li class="flex flex-col my-10">
                  <Text variant="heading-3" class="font-black">
                    Horários de atendimento:
                  </Text>
                  {support.openingHours.map((hours) => <Text>{hours}</Text>)}
                </li>
              </ul>
              <ul class="flex flex-col">
                <Text variant="heading-3" class="font-bold">
                  Siga-nos nas redes sociais
                </Text>
                <div class="flex flex-row gap-2 mt-5">
                  {social.map((item) => (
                    <li>
                      <Icon
                        media="(min-width: 768px)"
                        id={item.icon}
                        width={30}
                        height={25}
                        strokeWidth={1.5}
                        class="text-red-600"
                      />
                    </li>
                  ))}
                </div>
              </ul>
            </div>
          </li>
        </ul>

        {/* Mobile view */}
        <ul class="flex flex-col sm:hidden sm:flex-row gap-4">
          {links.map((link) => (
            <li>
              <Text variant="body" tone="default-inverse">
                <details>
                  <summary>
                    {link.title}
                  </summary>

                  <ul
                    class={`flex ${
                      isIcon(link.items[0]) ? "flex-row" : "flex-col"
                    } gap-2 px-2 pt-2`}
                  >
                    {link.items.map((item) => (
                      <li>
                        <SectionItem item={item} />
                      </li>
                    ))}
                  </ul>
                </details>
              </Text>
            </li>
          ))}
        </ul>
      </FooterContainer>

      <FooterContainer class="flex justify-between w-full bg-white gap-20">
        <div class="flex flex-col mx-5">
          <Text>
            Aceitamos somente os seguintes cartões de crédito:
          </Text>
          <div class="flex flex-row gap-2 mt-2">
            <Icon
              media="(min-width: 768px)"
              id={"Visa"}
              width={30}
              height={25}
              strokeWidth={0.05}
              class="text-red-600"
            />
            <Icon
              media="(min-width: 768px)"
              id={"Mastercard"}
              width={30}
              height={25}
              strokeWidth={0.05}
              class="text-red-600"
            />
            <Icon
              media="(min-width: 768px)"
              id={"Elo"}
              width={30}
              height={25}
              strokeWidth={0.05}
              class="text-red-600"
            />
          </div>
        </div>
        <div class="text-[#807C78] text-sm mr-5">
          <Text class="text-sm">Certificados e Segurança</Text>
          <Image
            src={copyright.logo}
            alt="logo"
            width={200}
            height={100}
            class="object-fill object-center mx-5"
          />
        </div>
      </FooterContainer>

      <FooterContainer class="flex justify-between w-full bg-[#F8F8F8] gap-20">
        <Image
          src={copyright.logo}
          alt="logo"
          width={200}
          height={100}
          class="object-fill object-center mx-5"
        />
        <ul class="text-[#36403B] text-sm">
          {copyright.lines.map((lines) => <li>{lines}</li>)}
        </ul>
        <div class="text-[#807C78] text-sm mr-5">
          <Text>Desenvolvido por mim mesmo</Text>
        </div>
      </FooterContainer>

      <FooterContainer class="flex justify-between w-full">
        <Text
          class="flex items-center gap-1"
          variant="body"
          tone="default-inverse"
        >
          Powered by{" "}
          <a
            href="https://www.deco.cx"
            aria-label="powered by https://www.deco.cx"
          >
            <Icon id="Deco" height={20} width={60} strokeWidth={0.01} />
          </a>
        </Text>

        <ul class="flex items-center justify-center gap-2">
          <li>
            <a
              href="https://www.instagram.com/deco.cx"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram logo"
            >
              <Icon
                class="text-default-inverse"
                width={32}
                height={32}
                id="Instagram"
                strokeWidth={1}
              />
            </a>
          </li>
          <li>
            <a
              href="http://www.deco.cx/discord"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Discord logo"
            >
              <Icon
                class="text-default-inverse"
                width={32}
                height={32}
                id="Discord"
                strokeWidth={5}
              />
            </a>
          </li>
        </ul>
      </FooterContainer>
    </footer>
  );
}

export default Footer;
