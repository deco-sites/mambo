import Header from "deco-sites/fashion/components/header/Header.tsx";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";

import type { Props } from "deco-sites/fashion/components/header/Header.tsx";

function HeaderSection(props: Props) {
  return <Header {...props} />;
}

export default HeaderSection;
