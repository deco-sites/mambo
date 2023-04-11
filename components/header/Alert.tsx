import Text from "deco-sites/fashion/components/ui/Text.tsx";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";
import Image from "deco-sites/std/components/Image.tsx";

import { useId } from "preact/hooks";

export interface Props {
  title: string;
  image: LiveImage;
  interval?: number;
}

function Alert({ title, image }: Props) {
  const id = useId();

  return (
    <div id={id} class="bg-primary gap-6 scrollbar-none h-[50px]  hidden lg:flex font-mont">
      <div class="flex justify-center items-center  w-screen h-full">
        <Text
          class="text-lg"
          variant="caption"
          tone="default-inverse"
        >
          {title}
        </Text>
        <Image
        class="ml-2 max-h-full bg-cover"
          src={image}
          width={65}
          height={40}
        />
      </div>
    </div>
  );
}

export default Alert;
