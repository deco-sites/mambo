import Container from "deco-sites/fashion/components/ui/Container.tsx";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";
import { Picture, Source } from "deco-sites/std/components/Picture.tsx";

export interface Props {
  srcMobile: LiveImage;
  srcDesktop: LiveImage;
  /**
   * @description Image alt text
   */
  alt: string;
  /**
   * @description When you click you go to
   */
  href: string;
}

export default function BannnerGrid({
  srcMobile,
  srcDesktop,
  alt,
  href,
}: Props) {
  return (
    <Container>
      <section class="w-full px-4 mx-auto">
        <a href={href}>
          <Picture>
            <Source
              media="(max-width: 767px)"
              width={320}
              src={srcMobile}
            />
            <Source
              media="(min-width: 768px)"
              width={768}
              src={srcDesktop}
            />
            <img
              class="w-full rounded-lg"
              src={srcDesktop}
              alt={alt}
            />
          </Picture>
        </a>
      </section>
    </Container>
  );
}
