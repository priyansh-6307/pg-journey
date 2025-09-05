import { useState } from 'react';
import { Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { amenitiesList } from '@/data/pgData';
import { cn } from '@/lib/utils';

export interface FilterOptions {
  priceRange: [number, number];
  cities: string[];
  genderPreference: string[];
  amenities: string[];
  roomTypes: string[];
}

interface FilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  className?: string;
}

const cities = ['Bangalore', 'Delhi', 'Mumbai', 'Pune'];
const genderOptions = ['Male', 'Female', 'Co-ed'];
const roomTypeOptions = ['Single Sharing', 'Double Sharing', 'Triple Sharing'];

export default function FilterSidebar({ 
  isOpen, 
  onClose, 
  filters, 
  onFiltersChange,
  className 
}: FilterSidebarProps) {
  const [localFilters, setLocalFilters] = useState<FilterOptions>(filters);

  const updateFilter = <K extends keyof FilterOptions>(
    key: K,
    value: FilterOptions[K]
  ) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const toggleArrayFilter = <K extends keyof FilterOptions>(
    key: K,
    value: string
  ) => {
    const currentValues = localFilters[key] as string[];
    const newValues = currentValues.includes(value)
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value];
    updateFilter(key, newValues as FilterOptions[K]);
  };

  const clearAllFilters = () => {
    const resetFilters: FilterOptions = {
      priceRange: [5000, 30000],
      cities: [],
      genderPreference: [],
      amenities: [],
      roomTypes: []
    };
    setLocalFilters(resetFilters);
    onFiltersChange(resetFilters);
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (localFilters.cities.length > 0) count++;
    if (localFilters.genderPreference.length > 0) count++;
    if (localFilters.amenities.length > 0) count++;
    if (localFilters.roomTypes.length > 0) count++;
    if (localFilters.priceRange[0] !== 5000 || localFilters.priceRange[1] !== 30000) count++;
    return count;
  };

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Price Range */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <Label className="text-sm font-medium">Price Range</Label>
          <span className="text-xs text-muted-foreground">
            ₹{localFilters.priceRange[0].toLocaleString()} - ₹{localFilters.priceRange[1].toLocaleString()}
          </span>
        </div>
        <Slider
          value={localFilters.priceRange}
          onValueChange={(value) => updateFilter('priceRange', value as [number, number])}
          min={5000}
          max={30000}
          step={1000}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-muted-foreground mt-1">
          <span>₹5,000</span>
          <span>₹30,000</span>
        </div>
      </div>

      {/* Cities */}
      <div>
        <Label className="text-sm font-medium mb-3 block">City</Label>
        <div className="space-y-2">
          {cities.map((city) => (
            <div key={city} className="flex items-center space-x-2">
              <Checkbox
                id={`city-${city}`}
                checked={localFilters.cities.includes(city)}
                onCheckedChange={() => toggleArrayFilter('cities', city)}
              />
              <Label htmlFor={`city-${city}`} className="text-sm font-normal">
                {city}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Gender Preference */}
      <div>
        <Label className="text-sm font-medium mb-3 block">Gender Preference</Label>
        <div className="space-y-2">
          {genderOptions.map((gender) => (
            <div key={gender} className="flex items-center space-x-2">
              <Checkbox
                id={`gender-${gender}`}
                checked={localFilters.genderPreference.includes(gender)}
                onCheckedChange={() => toggleArrayFilter('genderPreference', gender)}
              />
              <Label htmlFor={`gender-${gender}`} className="text-sm font-normal">
                {gender}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Room Types */}
      <div>
        <Label className="text-sm font-medium mb-3 block">Room Type</Label>
        <div className="space-y-2">
          {roomTypeOptions.map((roomType) => (
            <div key={roomType} className="flex items-center space-x-2">
              <Checkbox
                id={`room-${roomType}`}
                checked={localFilters.roomTypes.includes(roomType)}
                onCheckedChange={() => toggleArrayFilter('roomTypes', roomType)}
              />
              <Label htmlFor={`room-${roomType}`} className="text-sm font-normal">
                {roomType}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Amenities */}
      <div>
        <Label className="text-sm font-medium mb-3 block">Amenities</Label>
        <div className="space-y-2 max-h-40 overflow-y-auto">
          {amenitiesList.map((amenity) => (
            <div key={amenity} className="flex items-center space-x-2">
              <Checkbox
                id={`amenity-${amenity}`}
                checked={localFilters.amenities.includes(amenity)}
                onCheckedChange={() => toggleArrayFilter('amenities', amenity)}
              />
              <Label htmlFor={`amenity-${amenity}`} className="text-sm font-normal">
                {amenity}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Clear Filters */}
      {getActiveFilterCount() > 0 && (
        <Button
          variant="outline"
          onClick={clearAllFilters}
          className="w-full"
        >
          Clear All Filters ({getActiveFilterCount()})
        </Button>
      )}
    </div>
  );

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={onClose}
        />
      )}

      {/* Desktop Sidebar */}
      <div className={cn("hidden lg:block", className)}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center">
                <Filter className="h-4 w-4 mr-2" />
                Filters
                {getActiveFilterCount() > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    {getActiveFilterCount()}
                  </Badge>
                )}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <FilterContent />
          </CardContent>
        </Card>
      </div>

      {/* Mobile Drawer */}
      <div 
        className={cn(
          "lg:hidden fixed top-0 right-0 h-full w-80 bg-background z-50 transform transition-transform duration-300 ease-in-out border-l",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold flex items-center">
              <Filter className="h-4 w-4 mr-2" />
              Filters
              {getActiveFilterCount() > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {getActiveFilterCount()}
                </Badge>
              )}
            </h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="p-4 overflow-y-auto h-full pb-20">
          <FilterContent />
        </div>
      </div>
    </>
  );
}