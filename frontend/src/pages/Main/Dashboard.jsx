import React from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import FeaturedHero from '../../components/FeaturedHero';
import CategoryFilter from '../../components/CategoryFilter';
import ProductGrid from '../../components/ProductGrid';

export default function Dashboard() {
  return (
    <DashboardLayout>
      {/* 1. The Large Attention-Grabbing Bento Card */}
      <FeaturedHero />

      {/* 2. The Interactive Horizontal Scroll Categories */}
      <div className="mt-8">
        <CategoryFilter />
      </div>

      {/* 3. The Cascading CSS Grid of Products */}
      <ProductGrid title="Trending Now" />
      
      {/* Tip: Because we made ProductGrid reusable, you can easily add another one later 
          by passing different data to it, like this:
          <ProductGrid title="New Arrivals" products={newArrivalsData} /> 
      */}
    </DashboardLayout>
  );
}