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
    <div class="flex flex-col lg:flex-row items-center gap-6 max-w-[1440px] w-full justify-center">
      <div class="flex flex-row gap-6 items-center w-full md:w-auto lg:w-full text-[#7a7a7a] font-bold text-body">
        <img alt="mail icon" src={icon} />
        {title}
      </div>

      <form class="w-full sm:w-auto flex flex-col sm:flex-row items-center gap-2 md:gap-6 text-[#7a7a7a]">
        <input
          class="w-full md:w-[166px] py-2 px-3 border-b-1 border-black outline-none text-sm bg-transparent"
          placeholder={placeholders?.name}
        />
        <input
          class="w-full md:w-[166px] py-2 px-3 border-b-1 border-black outline-none text-sm bg-transparent"
          placeholder={placeholders?.email}
        />
        <button
          class="py-1 px-3 bg-interactive-inverse rounded-xl bg-red-500 text-white font-button border-2 border-transparent hover:(bg-gray-700 border-black text-red-500)"
          type="button"
        >
          {button}
        </button>
      </form>
    </div>
  );
}

export default Newsletter;
