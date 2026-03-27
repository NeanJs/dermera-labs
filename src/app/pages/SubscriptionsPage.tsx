import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { subscriptionKits } from "../../app/data/subscription-kits";
import { Button } from "../../app/components/ui/button";
import { Card } from "../../app/components/ui/card";
import { Check } from "lucide-react";
import {
  ProductCard,
  ProductCardProps,
} from "../../app/components/ProductCard";
import { FilterBar, FilterState } from "../../app/components/FilterBar";
import { getCategories, getProducts } from "../api/products";

// Product images mapping
const kitImages: Record<string, string> = {
  starter:
    "https://images.unsplash.com/photo-1652464945507-687e44a1017a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxza2luY2FyZSUyMGNsZWFuc2VyJTIwYm90dGxlJTIwd2hpdGUlMjBiYWNrZ3JvdW5kfGVufDF8fHx8MTc2OTk2ODE3MXww&ixlib=rb-4.1.0&q=80&w=1080",
  essential:
    "https://images.unsplash.com/photo-1617030557822-c8c35f07c60b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxza2luY2FyZSUyMHByb2R1Y3RzJTIwbmV1dHJhbCUyMGJhY2tncm91bmR8ZW58MXx8fHwxNzY5OTY4MTcyfDA&ixlib=rb-4.1.0&q=80&w=1080",
  advanced:
    "https://images.unsplash.com/photo-1677735476292-0fc57ab097b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZXJ1bSUyMGRyb3BwZXIlMjBib3R0bGUlMjBtaW5pbWFsJTIwd2hpdGV8ZW58MXx8fHwxNzY5OTY4MTcxfDA&ixlib=rb-4.1.0&q=80&w=1080",
  premium:
    "https://images.unsplash.com/photo-1764694187721-a5035d777fdf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBza2luY2FyZSUyMGJvdHRsZSUyMHN0dWRpb3xlbnwxfHx8fDE3Njk5NjgxNzN8MA&ixlib=rb-4.1.0&q=80&w=1080",
};

export function SubscriptionsPage() {
  const [products, setProducts] = useState<[ProductCardProps]>();
  useEffect(() => {
    getCategories().then((data) => {
      console.log(data); // see products in console
      setProducts(data);
    });
  }, []);
  const [sortBy, setSortBy] = useState("recommended");
  const [filters, setFilters] = useState<FilterState>({});

  return (
    <div className="flex-1">
      {/* Header */}
      <section className="bg-neutral-50 py-16 md:py-24 border-b border-neutral-100">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl mb-6 tracking-tight leading-tight">
              Subscription Kits
            </h1>
            <p className="text-lg text-neutral-600 leading-relaxed">
              Choose the perfect monthly subscription for your skincare needs
            </p>
          </div>
        </div>
      </section>

      {/* Filters & Products */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            {/* Product Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {products &&
                products.length > 0 &&
                products?.map((kit) => (
                  <ProductCard
                    key={kit.id}
                    id={kit.id}
                    name={kit.name}
                    tier={kit.tier}
                    price={kit.price}
                    description={kit.description}
                    imageUrl={kitImages[kit.id]}
                    recommended={kit.recommended}
                  />
                ))}
            </div>

            {/* No Results */}
            {!products && (
              <div className="text-center py-16">
                <p className="text-lg text-neutral-600 mb-4">
                  No subscription kits match your filters
                </p>
                <Button
                  variant="outline"
                  onClick={() => setFilters({})}
                  className="border-neutral-300 hover:bg-neutral-50"
                >
                  Clear Filters
                </Button>
              </div>
            )}

            {/* Comparison Table - Detailed View */}
            <div className="mt-20 pt-20 border-t border-neutral-100">
              <div className="text-center mb-12">
                <h2 className="text-3xl mb-4 tracking-tight">
                  Compare All Kits
                </h2>
                <p className="text-lg text-neutral-600">
                  Detailed comparison of features and products
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {subscriptionKits.map((kit) => (
                  <Card
                    key={kit.id}
                    className={`p-10 relative transition-all hover:shadow-lg ${
                      kit.recommended
                        ? "border-2 border-neutral-900 shadow-md"
                        : "border-neutral-100"
                    }`}
                  >
                    {kit.recommended && (
                      <div className="absolute -top-3 left-10">
                        <span className="bg-neutral-900 text-white text-xs font-medium px-4 py-1.5 rounded-full">
                          Most Popular
                        </span>
                      </div>
                    )}

                    <div>
                      <div className="mb-8">
                        <p className="text-xs uppercase tracking-wider text-neutral-500 mb-3 font-medium">
                          {kit.tier}
                        </p>
                        <h2 className="text-2xl font-semibold mb-3 tracking-tight">
                          {kit.name}
                        </h2>
                        <div className="mb-4">
                          <span className="text-4xl font-semibold">
                            ${kit.price}
                          </span>
                          <span className="text-neutral-600">/month</span>
                        </div>
                        <p className="text-base text-neutral-600 leading-relaxed">
                          {kit.description}
                        </p>
                      </div>

                      <div className="mb-8">
                        <h4 className="text-sm font-semibold mb-4">
                          What's Included:
                        </h4>
                        <ul className="space-y-3">
                          {kit.features.map((feature, index) => (
                            <li
                              key={index}
                              className="flex items-start gap-3 text-sm"
                            >
                              <Check className="w-4 h-4 mt-0.5 text-neutral-700 flex-shrink-0" />
                              <span className="text-neutral-600 leading-relaxed">
                                {feature}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mb-8">
                        <h4 className="text-sm font-semibold mb-4">
                          Products:
                        </h4>
                        <div className="space-y-2">
                          {kit.products.slice(0, 5).map((product, index) => (
                            <p
                              key={index}
                              className="text-sm text-neutral-600 leading-relaxed"
                            >
                              • {product.name}{" "}
                              <span className="text-neutral-500">
                                ({product.size})
                              </span>
                            </p>
                          ))}
                          {kit.products.length > 5 && (
                            <p className="text-sm text-neutral-500 italic">
                              + {kit.products.length - 5} more products
                            </p>
                          )}
                        </div>
                      </div>

                      <Button
                        asChild
                        className={`w-full h-12 ${
                          kit.recommended
                            ? "bg-neutral-900 hover:bg-neutral-800"
                            : "border-neutral-300 hover:bg-neutral-50"
                        }`}
                        variant={kit.recommended ? "default" : "outline"}
                      >
                        <Link to={`/subscriptions/${kit.id}`}>
                          View Details
                        </Link>
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="py-16 md:py-24 bg-neutral-50 border-t border-neutral-100">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
              <div>
                <div className="text-3xl mb-4">🇨🇦</div>
                <h3 className="text-base font-semibold mb-2">Made in Canada</h3>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  Premium formulations crafted locally
                </p>
              </div>
              <div>
                <div className="text-3xl mb-4">🔒</div>
                <h3 className="text-base font-semibold mb-2">
                  Secure Payments
                </h3>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  Bank-level encryption for all transactions
                </p>
              </div>
              <div>
                <div className="text-3xl mb-4">📦</div>
                <h3 className="text-base font-semibold mb-2">Free Shipping</h3>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  Delivered to your door every month
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
