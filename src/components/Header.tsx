import { useState } from 'react';
import { Search, Menu, X, MapPin, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface HeaderProps {
  onSearch?: (query: string) => void;
  searchQuery?: string;
}

export default function Header({ onSearch, searchQuery = '' }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(localSearchQuery);
  };

  return (
    <header className="bg-card border-b shadow-card sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">P</span>
              </div>
              <span className="text-xl font-bold text-foreground">PGNest</span>
            </a>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <form onSubmit={handleSearch} className="flex w-full">
              <div className="relative flex-1">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search by location, PG name..."
                  value={localSearchQuery}
                  onChange={(e) => setLocalSearchQuery(e.target.value)}
                  className="pl-10 pr-4 h-10 border-border focus:ring-2 focus:ring-primary"
                />
              </div>
              <Button 
                type="submit" 
                className="ml-2 h-10 px-6 gradient-primary hover:opacity-90 text-white"
              >
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </form>
          </div>

          {/* Navigation - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" className="text-foreground hover:text-primary">
              List Your PG
            </Button>
            <Button variant="ghost" className="text-foreground hover:text-primary">
              <Phone className="h-4 w-4 mr-2" />
              Help
            </Button>
            <Button className="gradient-secondary text-white hover:opacity-90">
              Sign In
            </Button>
          </div>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-4">
          <form onSubmit={handleSearch} className="flex">
            <div className="relative flex-1">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="Search location, PG name..."
                value={localSearchQuery}
                onChange={(e) => setLocalSearchQuery(e.target.value)}
                className="pl-10 pr-4 h-10"
              />
            </div>
            <Button type="submit" className="ml-2 h-10 px-4 gradient-primary text-white">
              <Search className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-card">
          <div className="px-4 py-3 space-y-3">
            <Button variant="ghost" className="w-full justify-start text-foreground">
              List Your PG
            </Button>
            <Button variant="ghost" className="w-full justify-start text-foreground">
              <Phone className="h-4 w-4 mr-2" />
              Help
            </Button>
            <Button className="w-full gradient-secondary text-white">
              Sign In
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}