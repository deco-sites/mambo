import Container from "deco-sites/fashion/components/ui/Container.tsx";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";
export interface Highlight {
  desktop: LiveImage;
  alt: string;
  href: string;
}

export interface Props {
  highlights?: Highlight[];
}

export default function Highlights({ highlights = [] }: Props) {
  return (
    <Container class="hidden lg:flex py-12">
      <div class="flex items-center w-full self-center ">
        <div class="grid md:grid-cols-2 lg:grid-cols-5 gap-[20px] max-w-[1528px] mx-9 ">
          {highlights.map(({ href, desktop, alt }) => (
            <a href={href} class="flex flex-col gap-4 items-center ">
              <img
                class="w-full h-full object-cover rounded-[10px]"
                loading="lazy"
                src={desktop}
                alt={alt}
              />
            </a>
          ))}
        </div>
      </div>
    </Container>
  );
}
