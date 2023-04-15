import Text from "deco-sites/fashion/components/ui/Text.tsx";
import Icon from "deco-sites/fashion/components/ui/Icon.tsx";
import { JSX } from "preact";

interface Props
  extends Omit<JSX.HTMLAttributes<HTMLUListElement>, "class" | "className"> {
  title: string;
  terms: { term: string }[];
}

export default function SearchTermList({ terms, title, ...ulProps }: Props) {
  return (
    <div class="flex flex-col gap-6 md:(w-[15.25rem] max-w-[15.25rem])">
      <span class="font-bold text-sm text-gray-800">{title}</span>

      <ul {...ulProps} class="flex flex-col gap-6">
        {terms.map(({ term }) => (
          <li>
            <a href={`/s?q=${term}`} class="text-gray-500 hover:text-primary">
              {term}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
