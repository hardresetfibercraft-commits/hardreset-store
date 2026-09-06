import {
  useState,
  useEffect,
  useMemo,
  useRef,
  useCallback,
} from 'react';

import { useSearchParams } from 'react-router-dom';

import {
  Search,
  X,
  ArrowUpDown,
  LayoutGrid,
  Rows3,
} from 'lucide-react';

import ProductGrid from '../components/products/ProductGrid';
import ApiErrorNotice from '../components/ui/ApiErrorNotice';
import LoadingSpinner from '../components/ui/LoadingSpinner';

import {
  getAllProducts,
  getCategories,
} from '../lib/api';

import { getCategoryIcon } from '../lib/categoryIcons';

import type {
  Product,
  Category,
} from '../lib/types';

import { useT } from '../lib/i18n';
import { usePageTitle } from '../lib/usePageTitle';

type SortOption =
  | 'name'
  | 'price-asc'
  | 'price-desc'
  | 'newest'
  | 'popular';

function normalizeCategory(value?: string | null) {
  return (value ?? '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
    .replace(/\s+/g, ' ');
}

function isHomeCategory(category: Category) {
  const name = normalizeCategory(category.name);
  const slug = normalizeCategory(category.slug);

  return (
    name === 'home' ||
    slug === 'home' ||
    name.endsWith(' home') ||
    slug.endsWith(' home')
  );
}

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const activeSlug = searchParams.get('category');

  const t = useT();

  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const [loading, setLoading] = useState(true);

  const [categoriesError, setCategoriesError] =
    useState<string | null>(null);

  const [productsError, setProductsError] =
    useState<string | null>(null);

  const [search, setSearch] = useState('');

  const [sortBy, setSortBy] =
    useState<SortOption>('name');

  const [currentPage, setCurrentPage] =
    useState(1);

  const [itemsPerPage, setItemsPerPage] =
    useState(24);

  const productGridRef =
    useRef<HTMLDivElement>(null);

  /*
   * ---------------------------------------------------------
   * LOAD CATEGORIES
   * ---------------------------------------------------------
   */

  useEffect(() => {
    async function loadCategories() {
      try {
        setCategoriesError(null);

        const catRes = await getCategories();

        setCategories(
          catRes.categories ?? []
        );
      } catch (err) {
        setCategoriesError(
          err instanceof Error
            ? err.message
            : String(err)
        );

        setCategories([]);
      }
    }

    loadCategories();
  }, []);

  /*
   * ---------------------------------------------------------
   * REMOVE NON-STORE CATEGORIES
   * ---------------------------------------------------------
   *
   * Tip4Serv sends "Home" as a category even though it is
   * not actually a product category.
   */

  const visibleCategories = useMemo(() => {
    return categories.filter((category) => {
      if (category.hide) {
        return false;
      }

      if (isHomeCategory(category)) {
        return false;
      }

      return true;
    });
  }, [categories]);

  /*
   * ---------------------------------------------------------
   * CATEGORY LOOKUP
   * ---------------------------------------------------------
   */

  const categoryIdBySlug = useMemo(() => {
    const map = new Map<string, number>();

    visibleCategories.forEach((category) => {
      if (category.slug) {
        map.set(
          category.slug,
          category.id
        );
      }
    });

    return map;
  }, [visibleCategories]);

  const activeCategory = activeSlug
    ? visibleCategories.find(
        (category) =>
          category.slug === activeSlug
      ) ?? null
    : null;

  const activeCategoryId =
    activeCategory?.id;

  const activeCategoryName =
    activeCategory?.name ?? null;

  /*
   * ---------------------------------------------------------
   * INVALID / HOME CATEGORY URL FIX
   * ---------------------------------------------------------
   *
   * If somebody has an old URL such as:
   *
   * /products?category=home
   *
   * remove it and show All Products instead.
   */

  useEffect(() => {
    if (!activeSlug) {
      return;
    }

    if (categories.length === 0) {
      return;
    }

    const validCategory =
      visibleCategories.some(
        (category) =>
          category.slug === activeSlug
      );

    if (!validCategory) {
      setSearchParams({});
    }
  }, [
    activeSlug,
    categories,
    visibleCategories,
    setSearchParams,
  ]);

  /*
   * ---------------------------------------------------------
   * LOAD PRODUCTS
   * ---------------------------------------------------------
   */

  useEffect(() => {
    let cancelled = false;

    async function loadProducts() {
      setLoading(true);

      try {
        setProductsError(null);

        const products =
          await getAllProducts(
            activeCategoryId
          );

        if (!cancelled) {
          setFilteredProducts(products);
        }
      } catch (err) {
        if (!cancelled) {
          setProductsError(
            err instanceof Error
              ? err.message
              : String(err)
          );

          setFilteredProducts([]);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadProducts();

    return () => {
      cancelled = true;
    };
  }, [activeCategoryId]);

  /*
   * ---------------------------------------------------------
   * PAGE TITLE
   * ---------------------------------------------------------
   */

  usePageTitle(
    activeCategoryName ||
      t('products.page.title_all')
  );

  /*
   * ---------------------------------------------------------
   * SEARCH / SORT / PAGINATION
   * ---------------------------------------------------------
   */

  const {
    filtered,
    totalPages,
    paginatedProducts,
  } = useMemo(() => {
    const results =
      filteredProducts.filter(
        (product) => {
          if (search) {
            const query =
              search.toLowerCase();

            const matchesSearch =
              product.name
                .toLowerCase()
                .includes(query) ||
              (
                product.small_description ||
                ''
              )
                .toLowerCase()
                .includes(query);

            if (!matchesSearch) {
              return false;
            }
          }

          return true;
        }
      );

    const sorted = [...results].sort(
      (a, b) => {
        switch (sortBy) {
          case 'name':
            return a.name.localeCompare(
              b.name
            );

          case 'price-asc':
            return a.price - b.price;

          case 'price-desc':
            return b.price - a.price;

          case 'newest':
            return b.id - a.id;

          case 'popular':
            return (
              (b.id > 9000 ? 1 : 0) -
              (a.id > 9000 ? 1 : 0)
            );

          default:
            return 0;
        }
      }
    );

    const total = Math.ceil(
      sorted.length / itemsPerPage
    );

    const startIndex =
      (currentPage - 1) *
      itemsPerPage;

    const paginated =
      sorted.slice(
        startIndex,
        startIndex + itemsPerPage
      );

    return {
      filtered: sorted,
      totalPages: total,
      paginatedProducts: paginated,
    };
  }, [
    filteredProducts,
    search,
    sortBy,
    currentPage,
    itemsPerPage,
  ]);

  /*
   * Reset pagination whenever filters change.
   */

  useEffect(() => {
    setCurrentPage(1);
  }, [
    search,
    sortBy,
    activeSlug,
    itemsPerPage,
  ]);

  /*
   * ---------------------------------------------------------
   * CATEGORY SELECTION
   * ---------------------------------------------------------
   */

  const setCategory = useCallback(
    (slug: string | null) => {
      if (slug) {
        setSearchParams({
          category: slug,
        });
      } else {
        setSearchParams({});
      }

      /*
       * On mobile, move the user down to
       * the products after selecting a category.
       */

      if (
        window.innerWidth < 1024 &&
        productGridRef.current
      ) {
        setTimeout(() => {
          productGridRef.current
            ?.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
            });
        }, 100);
      }
    },
    [setSearchParams]
  );

  /*
   * ---------------------------------------------------------
   * RENDER
   * ---------------------------------------------------------
   */

  return (
    <div className="pt-24 lg:pt-28 pb-16 animate-fade-in">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* PAGE HEADER */}
        <div className="mb-10">

          <h1 className="text-3xl lg:text-4xl font-bold text-heading mb-3">
            {activeCategoryName ||
              t(
                'products.page.title_all'
              )}
          </h1>

          <p className="text-volcanic-400 text-lg">
            {activeCategoryName
              ? t(
                  'products.page.subtitle_category',
                  {
                    name: activeCategoryName,
                  }
                )
              : t(
                  'products.page.subtitle_all'
                )}
          </p>

          {(activeCategoryName ||
            search) && (
            <p className="text-ark-400 font-medium mt-2">
              {filtered.length}{' '}
              {filtered.length !== 1
                ? t(
                    'products.page.found_plural'
                  )
                : t(
                    'products.page.found_singular'
                  )}
            </p>
          )}

        </div>

        {/* API ERRORS */}
        {categoriesError && (
          <ApiErrorNotice
            title="Erreur chargement categories"
            message={
              categoriesError
            }
          />
        )}

        {productsError && (
          <ApiErrorNotice
            title="Erreur chargement produits"
            message={
              productsError
            }
          />
        )}

        <div className="flex flex-col lg:flex-row gap-8">

          {/* CATEGORY SIDEBAR */}
          <aside className="lg:w-64 flex-shrink-0">

            <div className="lg:sticky lg:top-24 space-y-6">

              <div className="bg-volcanic-900/60 border border-volcanic-800/50 rounded-xl p-4">

                <h2 className="text-sm font-semibold text-heading mb-3 flex items-center gap-2">

                  <LayoutGrid className="w-4 h-4" />

                  {t(
                    'products.page.sidebar_categories'
                  )}

                </h2>

                <div className="space-y-1">

                  {/* ALL PRODUCTS */}
                  <button
                    type="button"
                    onClick={() =>
                      setCategory(null)
                    }
                    className={`
                      w-full
                      flex
                      items-center
                      gap-3
                      px-3
                      py-2.5
                      rounded-lg
                      text-sm
                      font-medium
                      transition-all
                      duration-200

                      ${
                        !activeCategory
                          ? 'bg-ark-600 text-white shadow-lg shadow-ark-600/20'
                          : 'text-volcanic-300 hover:text-heading hover:bg-volcanic-800/60'
                      }
                    `}
                  >

                    <LayoutGrid className="w-4 h-4 flex-shrink-0" />

                    <span>
                      {t(
                        'products.page.title_all'
                      )}
                    </span>

                  </button>

                  {/* REAL PRODUCT CATEGORIES */}
                  {visibleCategories.map(
                    (category) => {
                      const Icon =
                        getCategoryIcon(
                          category.slug ||
                            category.name
                        );

                      const isActive =
                        activeCategory?.slug ===
                        category.slug;

                      return (
                        <button
                          type="button"
                          key={
                            category.id
                          }
                          onClick={() =>
                            setCategory(
                              isActive
                                ? null
                                : category.slug
                            )
                          }
                          className={`
                            w-full
                            flex
                            items-center
                            gap-3
                            px-3
                            py-2.5
                            rounded-lg
                            text-sm
                            font-medium
                            transition-all
                            duration-200

                            ${
                              isActive
                                ? 'bg-ark-600 text-white shadow-lg shadow-ark-600/20'
                                : 'text-volcanic-300 hover:text-heading hover:bg-volcanic-800/60'
                            }
                          `}
                        >

                          <Icon className="w-4 h-4 flex-shrink-0" />

                          <span>
                            {
                              category.name
                            }
                          </span>

                        </button>
                      );
                    }
                  )}

                </div>

              </div>

            </div>

          </aside>

          {/* PRODUCT AREA */}
          <div
            ref={productGridRef}
            className="flex-1 min-w-0 scroll-mt-24"
          >

            {/* SEARCH / SORT CONTROLS */}
            <div className="flex flex-col gap-4 mb-8">

              <div className="flex flex-col sm:flex-row gap-3">

                {/* SEARCH */}
                <div className="relative flex-1 group">

                  <input
                    type="text"
                    placeholder={t(
                      'products.page.search_placeholder'
                    )}
                    value={search}
                    onChange={(event) =>
                      setSearch(
                        event.target.value
                      )
                    }
                    className="input-field pl-11"
                  />

                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-volcanic-500 group-focus-within:text-ark-500 transition-colors" />

                </div>

                {/* SORT */}
                <div className="relative sm:w-56">

                  <select
                    value={sortBy}
                    onChange={(event) =>
                      setSortBy(
                        event.target
                          .value as SortOption
                      )
                    }
                    className="input-field pl-11 appearance-none cursor-pointer"
                  >

                    <option value="name">
                      {t(
                        'products.sort.name'
                      )}
                    </option>

                    <option value="newest">
                      {t(
                        'products.sort.newest'
                      )}
                    </option>

                    <option value="popular">
                      {t(
                        'products.sort.popular'
                      )}
                    </option>

                    <option value="price-asc">
                      {t(
                        'products.sort.price_asc'
                      )}
                    </option>

                    <option value="price-desc">
                      {t(
                        'products.sort.price_desc'
                      )}
                    </option>

                  </select>

                  <ArrowUpDown className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-volcanic-500 pointer-events-none" />

                  <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none">

                    <svg
                      className="w-4 h-4 text-volcanic-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>

                  </div>

                </div>

                {/* ITEMS PER PAGE */}
                <div className="relative sm:w-44">

                  <select
                    value={itemsPerPage}
                    onChange={(event) =>
                      setItemsPerPage(
                        Number(
                          event.target.value
                        )
                      )
                    }
                    className="input-field pl-11 appearance-none cursor-pointer"
                  >

                    <option value={12}>
                      {t(
                        'products.per_page',
                        { n: 12 }
                      )}
                    </option>

                    <option value={24}>
                      {t(
                        'products.per_page',
                        { n: 24 }
                      )}
                    </option>

                    <option value={48}>
                      {t(
                        'products.per_page',
                        { n: 48 }
                      )}
                    </option>

                    <option value={96}>
                      {t(
                        'products.per_page',
                        { n: 96 }
                      )}
                    </option>

                  </select>

                  <Rows3 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-volcanic-500 pointer-events-none" />

                  <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none">

                    <svg
                      className="w-4 h-4 text-volcanic-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>

                  </div>

                </div>

              </div>

              {/* ACTIVE CATEGORY CHIP */}
              {activeCategory && (
                <div className="flex flex-wrap items-center gap-2">

                  <button
                    type="button"
                    onClick={() =>
                      setCategory(null)
                    }
                    className="
                      inline-flex
                      items-center
                      gap-1.5
                      px-3
                      py-1.5
                      text-sm
                      text-volcanic-300
                      bg-volcanic-800/50
                      rounded-lg
                      hover:bg-volcanic-800
                      transition-colors
                    "
                  >

                    <X className="w-3.5 h-3.5" />

                    {
                      activeCategoryName
                    }

                  </button>

                </div>
              )}

            </div>

            {/* PRODUCTS */}
            {loading ? (
              <LoadingSpinner />
            ) : (
              <>

                <ProductGrid
                  products={
                    paginatedProducts
                  }
                />

                {/* PAGINATION */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-12">

                    <button
                      type="button"
                      onClick={() =>
                        setCurrentPage(
                          (page) =>
                            Math.max(
                              1,
                              page - 1
                            )
                        )
                      }
                      disabled={
                        currentPage === 1
                      }
                      className="
                        px-4
                        py-2
                        rounded-lg
                        bg-volcanic-800/60
                        text-volcanic-300
                        hover:bg-volcanic-800
                        hover:text-heading
                        disabled:opacity-40
                        disabled:cursor-not-allowed
                        transition-all
                        duration-200
                      "
                    >
                      {t(
                        'products.pagination.prev'
                      )}
                    </button>

                    <div className="flex items-center gap-2">

                      {Array.from(
                        {
                          length:
                            totalPages,
                        },
                        (_, index) =>
                          index + 1
                      ).map((page) => {
                        if (
                          page === 1 ||
                          page ===
                            totalPages ||
                          (
                            page >=
                              currentPage -
                                1 &&
                            page <=
                              currentPage +
                                1
                          )
                        ) {
                          return (
                            <button
                              type="button"
                              key={page}
                              onClick={() =>
                                setCurrentPage(
                                  page
                                )
                              }
                              className={`
                                w-10
                                h-10
                                rounded-lg
                                font-medium
                                transition-all
                                duration-200

                                ${
                                  currentPage ===
                                  page
                                    ? 'bg-ark-600 text-white shadow-lg shadow-ark-600/20'
                                    : 'bg-volcanic-800/60 text-volcanic-300 hover:bg-volcanic-800 hover:text-heading'
                                }
                              `}
                            >
                              {page}
                            </button>
                          );
                        }

                        if (
                          page ===
                            currentPage -
                              2 ||
                          page ===
                            currentPage +
                              2
                        ) {
                          return (
                            <span
                              key={page}
                              className="text-volcanic-500"
                            >
                              ...
                            </span>
                          );
                        }

                        return null;
                      })}

                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        setCurrentPage(
                          (page) =>
                            Math.min(
                              totalPages,
                              page + 1
                            )
                        )
                      }
                      disabled={
                        currentPage ===
                        totalPages
                      }
                      className="
                        px-4
                        py-2
                        rounded-lg
                        bg-volcanic-800/60
                        text-volcanic-300
                        hover:bg-volcanic-800
                        hover:text-heading
                        disabled:opacity-40
                        disabled:cursor-not-allowed
                        transition-all
                        duration-200
                      "
                    >
                      {t(
                        'products.pagination.next'
                      )}
                    </button>

                  </div>
                )}

              </>
            )}

          </div>

        </div>

      </div>

    </div>
  );
}
