import { useState } from 'react';
import { Star, MapPin, Users, Wifi, Car, UtensilsCrossed, ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { PGData } from '@/data/pgData';
import { cn } from '@/lib/utils';
import pgRoom1 from '@/assets/pg-room-1.jpg';
import pgCommonArea from '@/assets/pg-common-area.jpg';
import pgKitchen from '@/assets/pg-kitchen.jpg';
import pgBuilding from '@/assets/pg-building.jpg';

interface PGCardProps {
  pg: PGData;
  onViewDetails: (pgId: string) => void;
}

export default function PGCard({ pg, onViewDetails }: PGCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  // Use actual images instead of placeholder
  const actualImages = [pgRoom1, pgCommonArea, pgKitchen, pgBuilding];

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % actualImages.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + actualImages.length) % actualImages.length);
  };

  const toggleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  const getTopAmenities = (amenities: string[]) => {
    const iconMap: Record<string, JSX.Element> = {
      'WiFi': <Wifi className="h-3 w-3" />,
      'Parking': <Car className="h-3 w-3" />,
      'Meals': <UtensilsCrossed className="h-3 w-3" />
    };
    
    return amenities.slice(0, 3).map(amenity => ({
      name: amenity,
      icon: iconMap[amenity] || <span className="w-3 h-3 bg-primary rounded-full" />
    }));
  };

  return (
    <Card className="hover-lift cursor-pointer group overflow-hidden">
      <div className="relative">
        {/* Image Carousel */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={actualImages[currentImageIndex]}
            alt={pg.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          
          {/* Navigation arrows */}
          {actualImages.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </>
          )}

          {/* Image indicators */}
          {actualImages.length > 1 && (
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
              {actualImages.map((_, index) => (
                <div
                  key={index}
                  className={cn(
                    "w-1.5 h-1.5 rounded-full transition-colors",
                    currentImageIndex === index ? "bg-white" : "bg-white/50"
                  )}
                />
              ))}
            </div>
          )}

          {/* Like button */}
          <button
            onClick={toggleLike}
            className="absolute top-2 right-2 p-1.5 rounded-full bg-white/90 hover:bg-white transition-colors"
          >
            <Heart 
              className={cn(
                "h-4 w-4 transition-colors",
                isLiked ? "fill-red-500 text-red-500" : "text-gray-600"
              )} 
            />
          </button>

          {/* Gender preference badge */}
          <Badge 
            variant="secondary" 
            className="absolute top-2 left-2 bg-white/90 text-foreground"
          >
            {pg.genderPreference}
          </Badge>
        </div>

        <CardContent className="p-4">
          {/* Header */}
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="font-semibold text-lg text-foreground mb-1 line-clamp-1">
                {pg.name}
              </h3>
              <div className="flex items-center text-muted-foreground text-sm">
                <MapPin className="h-3 w-3 mr-1" />
                <span className="line-clamp-1">{pg.location}</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xl font-bold text-foreground">
                ₹{pg.price.toLocaleString()}
              </div>
              <div className="text-xs text-muted-foreground">per month</div>
            </div>
          </div>

          {/* Rating */}
          <div className="flex items-center mb-3">
            <div className="flex items-center bg-success text-success-foreground px-2 py-1 rounded text-xs font-medium">
              <Star className="h-3 w-3 mr-1 fill-current" />
              {pg.rating}
            </div>
            <span className="text-xs text-muted-foreground ml-2">
              ({pg.reviewCount} reviews)
            </span>
          </div>

          {/* Amenities */}
          <div className="flex items-center mb-3 space-x-3">
            {getTopAmenities(pg.amenities).map((amenity, index) => (
              <div key={index} className="flex items-center text-xs text-muted-foreground">
                {amenity.icon}
                <span className="ml-1">{amenity.name}</span>
              </div>
            ))}
            {pg.amenities.length > 3 && (
              <span className="text-xs text-muted-foreground">
                +{pg.amenities.length - 3} more
              </span>
            )}
          </div>

          {/* Room types */}
          <div className="flex items-center mb-4">
            <Users className="h-3 w-3 mr-1 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">
              {pg.roomTypes.map(rt => rt.type).join(', ')}
            </span>
          </div>

          {/* Action button */}
          <Button 
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails(pg.id);
            }}
            className="w-full gradient-primary text-white hover:opacity-90"
            size="sm"
          >
            View Details
          </Button>
        </CardContent>
      </div>
    </Card>
  );
}