import {
  useEffect,
  useState,
} from 'react';

import Hero from '../components/home/Hero';
import FeaturedProducts from '../components/home/FeaturedProducts';
import RecentlyViewed from '../components/home/RecentlyViewed';
import LatestProducts from '../components/home/LatestProducts';
import CategorySection from '../components/home/CategorySection';

import ApiErrorNotice from '../components/ui/ApiErrorNotice';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import TrustStrip from '../components/ui/TrustStrip';
import HowDeliveryWorks from '../components/ui/HowDeliveryWorks';

import {
  getAllProducts,
  getCategories,
} from '../lib/api';

import type {
  Product,
  Category,
} from '../lib/types';

import {
  usePageTitle,
} from '../lib/usePageTitle';

import {
  useStore,
} from '../lib/store';

export default function HomePage() {
  usePageTitle();

  const [
    products,
    setProducts,
  ] = useState<Product[]>([]);

  const [
    categories,
    setCategories,
  ] = useState<Category[]>([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    contentError,
    setContentError,
  ] =
    useState<string | null>(
      null
    );

  const {
    error: storeError,
  } = useStore();

  useEffect(() => {
    async function load() {
      try {
        setContentError(
          null
        );

        const [
          products,
          catRes,
        ] = await Promise.all([
          getAllProducts(),
          getCategories(),
        ]);

        setProducts(
          products
        );

        setCategories(
          catRes.categories ??
            []
        );
      } catch (err) {
        setContentError(
          err instanceof Error
            ? err.message
            : String(err)
        );

        setProducts([]);
        setCategories([]);
      } finally {
        setLoading(
          false
        );
      }
    }

    load();
  }, []);

  if (loading) {
    return (
      <div
        className="
          min-h-screen

          flex
          items-center
          justify-center

          bg-volcanic-950
        "
      >
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="animate-fade-in">

      {/* FORTRESS HERO */}
      <Hero />

      {/* TRUST STRIP */}
      <TrustStrip />

      {/* DELIVERY EXPLANATION */}
      <HowDeliveryWorks />

      {/* API ERRORS */}
      <div
        className="
          max-w-7xl
          mx-auto

          px-4
          sm:px-6
          lg:px-8
        "
      >
        {storeError && (
          <ApiErrorNotice
            title="Tip4Serv Store Error"
            message={
              storeError
            }
          />
        )}

        {contentError && (
          <ApiErrorNotice
            title="Unable to Load Products or Categories"
            message={
              contentError
            }
          />
        )}
      </div>

      {/* FEATURED PRODUCTS */}
      <FeaturedProducts
        products={
          products
        }
      />

      {/* RECENTLY VIEWED */}
      <RecentlyViewed />

      {/* CATEGORIES */}
      <CategorySection
        categories={
          categories
        }
      />

      {/* LATEST PRODUCTS */}
      <LatestProducts
        products={
          products
        }
      />

    </div>
  );
}
