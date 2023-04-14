import Text from "deco-sites/fashion/components/ui/Text.tsx";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";
import { Picture } from "deco-sites/std/components/Picture.tsx";

export interface Props {
  /** @description icon for newsletter */
  icon: LiveImage;

  /** @description the description a side the icon */
  title: string;
  placeholders?: {
    /** @description the form fields placeholders */
    name: string;
    email: string;
  };
  /** @description the description a side the icon */
  button: string;
}

function Newsletter({ icon, title, placeholders, button }: Props) {
  return (
    <div class="flex flex-col lg:flex-row items-center gap-6">
      <div class="flex flex-row gap-8 max-w-[400px] sm:max-w-max">
        <Picture class="h-5 w-5">
          {icon}
        </Picture>
        <Text
          variant="caption"
          class="text-[#7a7a7a] leading-6 font-bold text-lg "
        >
          {title}
        </Text>
      </div>
      <form class="flex flex-col sm:flex-row items-center gap-2 md:gap-6 font-body text-body w-full sm:w-[408px] text-[#7a7a7a]">
        <input
          class="py-2 px-3 flex-grow bg-transparent border-b-1 border-black outline-none w-full md:w-auto"
          placeholder={placeholders?.name}
        />
        <input
          class="py-2 px-3 flex-grow bg-transparent border-b-1 border-black outline-none w-full md:w-auto"
          placeholder={placeholders?.email}
        />
        <button
          class="py-2 px-3 bg-interactive-inverse rounded-xl bg-red-500 text-white font-button hover:(bg-gray-700 border-2 border-black text-red-500)"
          type="bgutton" // prevent form's default behavior
        >
          {button}
        </button>
      </form>
    </div>
  );
}

export default Newsletter;
