import { Link } from "react-router-dom";
import { Card } from "../../app/components/ui/card";
import { Button } from "../../app/components/ui/button";
import { ImageWithFallback } from "../../app/components/figma/ImageWithFallback";

export interface ProductCardProps {
  id: string;
  name: string;
  tier?: string;
  price?: number;
  description: string;
  imageUrl?: string;
  recommended?: boolean;
}

export function ProductCard({
  id,
  name,
  tier,
  price,
  description,
  imageUrl,
  recommended,
}: ProductCardProps) {
  return (
    <Link to={`/products/${id}`} className="group">
      <Card className="overflow-hidden border-neutral-100 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5">
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-neutral-50">
          {recommended && (
            <div className="absolute top-4 left-4 z-10">
              <span className="bg-neutral-900 text-white text-xs font-medium px-3 py-1.5 rounded-full">
                Most Popular
              </span>
            </div>
          )}
          <ImageWithFallback
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-xs uppercase tracking-wider text-neutral-500 mb-2 font-medium">
            {tier}
          </p>
          <h3 className="text-lg font-semibold mb-2 tracking-tight">{name}</h3>
          <p className="text-sm text-neutral-600 mb-4 leading-relaxed line-clamp-2">
            {description}
          </p>
          <div className="flex items-baseline justify-between">
            {price && (
              <div>
                <span className="text-2xl font-semibold">${price}</span>
                <span className="text-sm text-neutral-600">/month</span>
              </div>
            )}
            <Button
              variant="ghost"
              size="sm"
              className="text-sm hover:bg-neutral-100 group-hover:bg-neutral-100"
            >
              View Details →
            </Button>
          </div>
        </div>
      </Card>
    </Link>
  );
}
