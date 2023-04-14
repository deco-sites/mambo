import Text from "deco-sites/fashion/components/ui/Text.tsx";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";
import Image from "deco-sites/std/components/Image.tsx";

import { useId } from "preact/hooks";

export interface Props {
  image: LiveImage;
}

function Alert({ image }: Props) {
  const id = useId();

  return (
    <div
      id={id}
      class="bg-primary gap-6 scrollbar-none h-[50px] hidden lg:flex"
    >
      <div class="flex justify-center items-center w-full h-full">
        <Image
          class="max-h-full w-full h-[50px] object-fill"
          src={image}
          width={1846}
          height={48}
        />
      </div>
    </div>
  );
}

export default Alert;
