import Filters from "deco-sites/fashion/components/search/Filters.tsx";
import Container from "deco-sites/fashion/components/ui/Container.tsx";
import Button from "deco-sites/fashion/components/ui/Button.tsx";
import Text from "deco-sites/fashion/components/ui/Text.tsx";
import Icon from "deco-sites/fashion/components/ui/Icon.tsx";
import SearchControls from "deco-sites/fashion/islands/SearchControls.tsx";
import ViewSendEvent from "deco-sites/fashion/islands/ViewSendEvent.tsx";
import { mapProductToAnalyticsItem } from "deco-sites/std/commerce/utils/productToAnalyticsItem.ts";
import { useOffer } from "deco-sites/fashion/sdk/useOffer.ts";
import ProductGallery, { Columns } from "../product/ProductGallery.tsx";
import type { LoaderReturnType } from "$live/types.ts";
import type { ProductListingPage } from "deco-sites/std/commerce/types.ts";
import Breadcrumb from "deco-sites/fashion/components/ui/Breadcrumb.tsx";

export interface Props {
  page: LoaderReturnType<ProductListingPage | null>;
  /**
   * @description Use drawer for mobile like behavior on desktop. Aside for rendering the filters alongside the products
   */
  variant?: "aside" | "drawer";
  /**
   * @description Number of products per line on grid
   */
  columns: Columns;
}

function NotFound() {
  return (
    <div class="w-full flex justify-center items-center py-10">
      <Text>Not Found!</Text>
    </div>
  );
}

function Result({
  page,
  variant,
  columns,
}: Omit<Props, "page"> & { page: ProductListingPage }) {
  const { products, filters, breadcrumb, pageInfo, sortOptions } = page;

  // page title
  const hasBreadcrumbs = breadcrumb.itemListElement.length > 0;
  const lastBreadcrumbIndex = breadcrumb.itemListElement.length - 1;
  const lastBreadcrumb = breadcrumb.itemListElement[lastBreadcrumbIndex];
  const searchPageTitle = "Resultados da sua pesquisa";
  const pageTitle = hasBreadcrumbs ? lastBreadcrumb.name : searchPageTitle;

  return (
    <>
      <Container class="px-4 py-6">
        <div class="flex flex-row items-center sm:p-0 mb-16 lg:mb-6">
          <Breadcrumb itemListElement={breadcrumb?.itemListElement} />
        </div>

        <div class="flex flex-row gap-8">
          {variant === "aside" && filters.length > 0 && (
            <aside class="hidden sm:block w-min min-w-[290px] p-4 border-1 border-solid border-gray-200 rounded">
              <div class="border-b-1 border-solid border-gray-200 pb-4 mb-4 font-bold text-lg">
                Filtrar por
              </div>

              <Filters filters={filters} />
            </aside>
          )}

          <div class="flex flex-col flex-grow gap-8">
            <div class="flex flex-col gap-2">
              <h1 class="font-bold text-center w-full text-2xl lg:text-3xl">
                {pageTitle}
              </h1>

              <SearchControls
                filters={filters}
                sortOptions={sortOptions}
                displayFilter={variant === "drawer"}
              />
            </div>

            <ProductGallery products={products} columns={columns} />

            <div class="flex flex-row items-center justify-center gap-2 mt-4">
              <a
                title="Anterior"
                rel="prev"
                href={pageInfo.previousPage ?? "#"}
              >
                <Button
                  disabled={!pageInfo.previousPage}
                  variant="icon"
                  aria-label="previous page"
                >
                  <Icon
                    id="ChevronLeft"
                    width={20}
                    height={20}
                    strokeWidth={2}
                  />
                </Button>
              </a>
              <Text variant="caption">
                {pageInfo.currentPage + 1}
              </Text>
              <a title="Próxima" rel="next" href={pageInfo.nextPage ?? "#"}>
                <Button
                  disabled={!pageInfo.nextPage}
                  variant="icon"
                  aria-label="next page"
                >
                  <Icon
                    id="ChevronRight"
                    width={20}
                    height={20}
                    strokeWidth={2}
                  />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </Container>

      <ViewSendEvent
        event={{
          name: "view_item_list",
          params: {
            // TODO: get category name from search or cms setting
            item_list_name: "",
            item_list_id: "",
            items: page.products?.map((product) => mapProductToAnalyticsItem({
              ...(useOffer(product.offers)),
              product,
              breadcrumbList: page.breadcrumb,
            })),
          },
        }}
      />
    </>
  );
}

function SearchResult({ page, ...props }: Props) {
  if (!page) {
    return <NotFound />;
  }

  return <Result {...props} page={page} />;
}

export default SearchResult;
