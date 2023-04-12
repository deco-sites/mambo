export type { Image as LiveImage } from "deco-sites/std/components/types.ts";
import { Picture, Source } from "deco-sites/std/components/Picture.tsx";
import Container from "deco-sites/fashion/components/ui/Container.tsx";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";
export interface Highlight {
  mobile: LiveImage;
  desktop: LiveImage;
  alt: string;
  href: string;
}

export interface Props {
  highlights?: Highlight[];
}

export default function Highlights({ highlights = [] }: Props) {
  return (
    <Container>
      <div class="flex items-center w-full self-center ">
        <div class="grid md:grid-cols-2 lg:grid-cols-5 gap-[20px] max-w-[1528px] mx-9 ">
          {highlights.map(({ href, mobile, desktop, alt }) => (
            <a href={href} class="flex flex-col gap-4 items-center ">
              <Picture>
                <Source
                  media="(max-width: 465px)"
                  fetchPriority="auto"
                  src={mobile}
                  width={333}
                  height={139}
                />
                <Source
                  media="(max-width: 1025px)"
                  fetchPriority="auto"
                  src={mobile}
                  width={333}
                  height={139}
                />
                <Source
                  media="(min-width: 1026px)"
                  fetchPriority="auto"
                  src={desktop}
                  width={290}
                  height={290}
                />
                <img
                  class="w-full h-full object-cover rounded-[10px]"
                  loading="lazy"
                  src={desktop}
                  alt={alt}
                />
              </Picture>
            </a>
          ))}
        </div>
      </div>
    </Container>
  );
}
