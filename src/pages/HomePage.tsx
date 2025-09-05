import { useState, useMemo } from 'react';
import { Filter, SlidersHorizontal, Grid3X3, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Header from '@/components/Header';
import PGCard from '@/components/PGCard';
import FilterSidebar, { FilterOptions } from '@/components/FilterSidebar';
import { samplePGs } from '@/data/pgData';
import { cn } from '@/lib/utils';
import pgBuilding from '@/assets/pg-building.jpg';

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('recommended');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filters, setFilters] = useState<FilterOptions>({
    priceRange: [5000, 30000],
    cities: [],
    genderPreference: [],
    amenities: [],
    roomTypes: []
  });

  const filteredAndSortedPGs = useMemo(() => {
    let filtered = samplePGs.filter(pg => {
      // Search filter
      const searchMatch = !searchQuery || 
        pg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pg.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pg.city.toLowerCase().includes(searchQuery.toLowerCase());

      // Price filter
      const priceMatch = pg.price >= filters.priceRange[0] && pg.price <= filters.priceRange[1];

      // City filter
      const cityMatch = filters.cities.length === 0 || filters.cities.includes(pg.city);

      // Gender filter
      const genderMatch = filters.genderPreference.length === 0 || 
        filters.genderPreference.includes(pg.genderPreference);

      // Amenities filter
      const amenitiesMatch = filters.amenities.length === 0 ||
        filters.amenities.every(amenity => pg.amenities.includes(amenity));

      // Room types filter
      const roomTypesMatch = filters.roomTypes.length === 0 ||
        filters.roomTypes.some(roomType => 
          pg.roomTypes.some(rt => rt.type === roomType && rt.available)
        );

      return searchMatch && priceMatch && cityMatch && genderMatch && amenitiesMatch && roomTypesMatch;
    });

    // Sort
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered.sort((a, b) => new Date(b.availableFrom).getTime() - new Date(a.availableFrom).getTime());
        break;
      default:
        // Keep original order for recommended
        break;
    }

    return filtered;
  }, [searchQuery, filters, sortBy]);

  const handleViewDetails = (pgId: string) => {
    // Navigation to PG details page would go here
    console.log('Navigate to PG:', pgId);
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.cities.length > 0) count++;
    if (filters.genderPreference.length > 0) count++;
    if (filters.amenities.length > 0) count++;
    if (filters.roomTypes.length > 0) count++;
    if (filters.priceRange[0] !== 5000 || filters.priceRange[1] !== 30000) count++;
    return count;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onSearch={setSearchQuery} searchQuery={searchQuery} />
      
      {/* Hero Section */}
      {!searchQuery && (
        <section className="relative h-96 bg-gradient-to-r from-primary to-primary-hover">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
            style={{ backgroundImage: `url(${pgBuilding})` }}
          />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
            <div className="text-center w-full">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Find Your Perfect PG
              </h1>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Discover comfortable and affordable paying guest accommodations with modern amenities
              </p>
              <div className="flex justify-center space-x-8 text-white">
                <div className="text-center">
                  <div className="text-2xl font-bold">500+</div>
                  <div className="text-sm opacity-90">Verified PGs</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">50+</div>
                  <div className="text-sm opacity-90">Cities</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">10K+</div>
                  <div className="text-sm opacity-90">Happy Residents</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Filter Sidebar */}
          <FilterSidebar
            isOpen={isFilterOpen}
            onClose={() => setIsFilterOpen(false)}
            filters={filters}
            onFiltersChange={setFilters}
            className="w-80 flex-shrink-0"
          />

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Controls Bar */}
            <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="lg:hidden"
                  onClick={() => setIsFilterOpen(true)}
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                  {getActiveFilterCount() > 0 && (
                    <span className="ml-1 bg-primary text-primary-foreground rounded-full px-2 py-0.5 text-xs">
                      {getActiveFilterCount()}
                    </span>
                  )}
                </Button>
                
                <div className="text-sm text-muted-foreground">
                  {filteredAndSortedPGs.length} PGs found
                  {searchQuery && ` for "${searchQuery}"`}
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recommended">Recommended</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="newest">Newest First</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* PG Grid */}
            {filteredAndSortedPGs.length > 0 ? (
              <div className={cn(
                viewMode === 'grid' 
                  ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                  : "space-y-4"
              )}>
                {filteredAndSortedPGs.map((pg) => (
                  <PGCard
                    key={pg.id}
                    pg={pg}
                    onViewDetails={handleViewDetails}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="text-muted-foreground mb-4">
                  <Filter className="h-16 w-16 mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg font-medium mb-2">No PGs found</h3>
                  <p>Try adjusting your filters or search criteria</p>
                </div>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery('');
                    setFilters({
                      priceRange: [5000, 30000],
                      cities: [],
                      genderPreference: [],
                      amenities: [],
                      roomTypes: []
                    });
                  }}
                >
                  Clear all filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
