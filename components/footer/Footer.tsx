import Icon, {
  AvailableIcons,
} from "deco-sites/fashion/components/ui/Icon.tsx";
import Text from "deco-sites/fashion/components/ui/Text.tsx";
import Container from "deco-sites/fashion/components/ui/Container.tsx";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";
import Image from "deco-sites/std/components/Image.tsx";
import { useState } from "preact/hooks";

import Newsletter from "./Newsletter.tsx";
import type { Props as NewsletterProps } from "./Newsletter.tsx";
import type { ComponentChildren } from "preact";
import { useSignal } from "@preact/signals";

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

export interface Link {
  title: string;
  items: Array<{
    icon: AvailableIcons;
    title: string;
    href: string;
  }>;
}

export interface Props {
  links: Link[];
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

export interface FooterItem {
  title: string;
  children: ComponentChildren;
}

function FooterMobileItem({ title, children }: FooterItem) {
  const expanded = useSignal(false);
  return (
    <li class="divide-y-1 divide-gray-300 ">
      <div
        class="flex flex-row justify-between items-center py-2 px-4"
        onClick={() => expanded.value = !expanded.value}
      >
        <Text class=" text-[#36403b] !font-bold text-body leading-6 ">
          {title}
        </Text>
        <Icon
          id={expanded.value ? "ChevronUp" : "ChevronDown"}
          width={20}
          height={15}
          strokeWidth={2}
        />
      </div>
      {expanded.value && (
        <ul
          class={`flex flex-col gap-2 px-2 py-4`}
        >
          {children}
        </ul>
      )}
    </li>
  );
}

function Footer({ links = [], support, social = [], copyright }: Props) {
  const [expanded, setExpanded] = useState(0);

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
        <ul class="hidden sm:flex flex-row justify-center gap-20 mx-5">
          {links.map((link) => (
            <li>
              <div>
                <Text variant="heading-3" class="uppercase text-footer-title">
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
                      <Text class="text-footer-title text-sm hover:text-[#36403b]">
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
                  <Text variant="heading-3" class="text-[#36403b] !font-bold">
                    Regiões Metropolitanas
                  </Text>
                  {support.phoneNumber}
                </li>
                <li class="flex flex-col my-10">
                  <Text variant="heading-3" class="text-[#36403b] !font-bold">
                    Horários de atendimento:
                  </Text>
                  {support.openingHours.map((hours) => <Text>{hours}</Text>)}
                </li>
              </ul>
              <ul class="flex flex-col">
                <Text
                  variant="heading-3"
                  class="text-[#36403b] text-footer-title"
                >
                  Siga-nos nas redes sociais
                </Text>
                <div class="flex flex-row gap-10 mt-10">
                  {social.map((item) => (
                    <li>
                      <Icon
                        media="(min-width: 768px)"
                        id={item.icon}
                        width={35}
                        height={30}
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
          <li class="divide-y-1 divide-gray-300">
            {links.map((link) => {
              return (
                <FooterMobileItem {...link}>
                  {link.items.map((item) => (
                    <li class={`flex flex-col `}>
                      <div class="flex text-footer-title gap-2 text-sm items-center hover:text-[#36403b]">
                        <SectionItem item={item} />
                        <Text class="text-gray-500 md:text-footer-title text-sm leading-5 hover:text-[#36403b]">
                          {item.title}
                        </Text>
                      </div>
                    </li>
                  ))}
                </FooterMobileItem>
              );
            })}
            <FooterMobileItem title="Dúvidas ou Suporte">
              <li class="flex flex-col  text-body">
                <Text variant="heading-3" class="text-[#36403b] !font-bold">
                  Regiões Metropolitanas
                </Text>
                {support.phoneNumber}
              </li>
              <li class="flex flex-col ">
                <Text variant="heading-3" class="text-[#36403b] !font-bold">
                  Horários de atendimento:
                </Text>
                {support.openingHours.map((hours) => <Text>{hours}</Text>)}
              </li>
            </FooterMobileItem>
            <FooterMobileItem title="Nossas redes">
              <div class="flex flex-row gap-2 ">
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
            </FooterMobileItem>
          </li>
        </ul>
      </FooterContainer>

      <FooterContainer class="flex flex-col md:flex-row justify-between w-full bg-white gap-20">
        <div class="flex flex-col mx-5">
          <Text>
            Aceitamos somente os seguintes cartões de crédito:
          </Text>
          <div class="flex flex-row gap-2 mt-2 justify-center md:justify-start">
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
        <div class="flex flex-col text-[#807C78] text-sm  md:mr-5 gap-2">
          <Text class="text-sm">Certificados e Segurança</Text>
          <Image
            src={copyright.logo}
            alt="logo"
            width={200}
            height={100}
            class="object-fill object-center mr-10"
          />
        </div>
      </FooterContainer>

      <FooterContainer class="flex flex-col md:flex-row justify-between w-full bg-[#F8F8F8] gap-20">
        <Image
          src={copyright.logo}
          alt="logo"
          width={200}
          height={100}
          class="object-fill object-center mx-5 flex self-center"
        />
        <ul class="text-[#36403B] text-sm flex flex-col text-center self-center">
          {copyright.lines.map((lines) => <li>{lines}</li>)}
        </ul>
        <div class="text-[#807C78] text-sm mr-5 flex self-center">
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
