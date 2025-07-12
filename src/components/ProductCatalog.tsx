'use client'

import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { productService, Product } from "@/lib/supabase";
import { normalizeSlug } from "@/lib/utils";

const ProductCatalog = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsData, categoriesData] = await Promise.all([
          productService.getAllProducts(),
          productService.getAllCategories()
        ]);
        
        setProducts(productsData);
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Group products by category
  const productsByCategory = products.reduce((acc, product) => {
    const category = product.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(product);
    return acc;
  }, {} as Record<string, Product[]>);

  if (loading) {
    return (
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Katalog Produk Lengkap
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Memuat produk...
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-card rounded-lg p-6 animate-pulse">
                <div className="h-48 bg-muted rounded-lg mb-4"></div>
                <div className="h-4 bg-muted rounded mb-2"></div>
                <div className="h-4 bg-muted rounded w-3/4"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Katalog Produk Lengkap
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Pilihan produk berkualitas tinggi untuk semua kebutuhan interior dan dekorasi Anda
          </p>
        </div>

        <Tabs defaultValue={normalizeSlug(categories[0] || '')} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            {categories.map((category) => (
              <TabsTrigger 
                key={category} 
                value={normalizeSlug(category)} 
                className="text-sm lg:text-base"
              >
                {category === "SAND BLAST" ? "🔳 Sand Blast Series" : 
                 category === "KACA FILM" ? "🌐 Kaca Film Series" : 
                 "🧩 Stiker & Vinyl Series"}
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map((category) => {
            const gridClass = 
              category === "SAND BLAST" ? "grid md:grid-cols-2 lg:grid-cols-4 gap-6" :
              category === "KACA FILM" ? "grid md:grid-cols-2 lg:grid-cols-3 gap-6" :
              "grid md:grid-cols-2 lg:grid-cols-3 gap-6";

            return (
              <TabsContent key={category} value={normalizeSlug(category)}>
                <div className={gridClass}>
                  {productsByCategory[category]?.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </TabsContent>
            );
          })}
        </Tabs>
      </div>
    </section>
  );
};

export default ProductCatalog;