/**
 * We use a custom route at /s?q= to perform the search. This component
 * redirects the user to /s?q={term} when the user either clicks on the
 * button or submits the form. Make sure this page exists in deco.cx/admin
 * of yout site. If not, create a new page on this route and add the appropriate
 * loader.
 *
 * Note that this is the most performatic way to perform a search, since
 * no JavaScript is shipped to the browser!
 */

import SearchTermList from "./SearchTermList.tsx";
import Icon from "deco-sites/fashion/components/ui/Icon.tsx";
import Button from "deco-sites/fashion/components/ui/Button.tsx";
import type { Suggestion } from "deco-sites/std/commerce/types.ts";

// Editable props
export interface EditableProps {
  /**
   * @title Placeholder
   * @description Search bar default placeholder message
   * @default What are you looking for?
   */
  placeholder?: string;

  /**
   * @title Page path
   * @description When user clicks on the search button, navigate it to
   * @default /s
   */
  action?: string;

  /**
   * @title Term name
   * @description Querystring param used when navigating the user
   * @default q
   */
  name?: string;

  /**
   * TODO: Receive querystring from parameter in the server-side
   */
  query?: string;
}

export type Props = EditableProps & {
  /**
   * @title Product suggestions
   * @description Product suggestions displayed on searchs
   */
  suggestions?: Suggestion | null;
};

function Searchbar({
  placeholder = "What are you looking for?",
  action = "/s",
  name = "q",
  query,
  suggestions: _suggestions,
}: Props) {
  const searches = _suggestions?.searches;

  return (
    <form
      id="searchbar"
      action={action}
      class="flex gap-3 px-3 border border-default rounded items-center h-10 w-full relative"
    >
      <Icon
        class="text-subdued"
        id="MagnifyingGlass"
        width={20}
        height={20}
        strokeWidth={0.01}
      />

      <input
        name={name}
        id="search-input"
        autocomplete="off"
        defaultValue={query}
        placeholder={placeholder}
        class="text-xs font-bold flex-grow outline-none w-full focus:sibling:flex"
      />

      {/* the focus:sibling:flex above controls this div visibility */}
      <div class="hidden absolute flex-col gap-6 bg-white border border-default rounded top-full left-0 w-full p-5 mt-1 hover:flex">
        {searches && searches.length > 0 && (
          <SearchTermList title="Os mais buscados" terms={searches} />
        )}
      </div>

      <Button variant="alternative" type="submit" class="-mr-3 h-full">
        Buscar
      </Button>
    </form>
  );
}

export default Searchbar;
