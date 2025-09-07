import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const features = [
    "Fresh, never-frozen beef",
    "Hand-cut fries cooked in peanut oil",
    "Made-to-order milkshakes",
    "15+ free toppings",
    "Peanuts while you wait",
    "Quality ingredients only"
  ];

  const testimonials = [
    {
      name: "Sarah M.",
      rating: 5,
      comment: "Best burgers in town! Fresh ingredients and amazing fries every time.",
      location: "New York, NY"
    },
    {
      name: "Mike R.", 
      rating: 5,
      comment: "Five Guys never disappoints. Consistent quality and great service.",
      location: "Los Angeles, CA"
    },
    {
      name: "Jessica L.",
      rating: 5,
      comment: "Love the customizable options. You can build your perfect burger!",
      location: "Chicago, IL"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative bg-primary text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-accent/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Fresh. Made to Order. <span className="text-accent">Five Guys.</span>
              </h1>
              <p className="text-xl md:text-2xl opacity-90 mb-8">
                Hand-formed burgers, fresh-cut fries, and made-to-order milkshakes using only the finest ingredients.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/menu">
                  <Button size="lg" variant="secondary" className="text-lg px-8 py-3 w-full sm:w-auto">
                    View Our Menu
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="text-lg px-8 py-3 w-full sm:w-auto bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                  Order Online
                </Button>
              </div>
            </div>
            <div className="bg-muted/10 aspect-square rounded-lg flex items-center justify-center">
              <img
                src="/placeholder.svg"
                alt="Five Guys Burger"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              What Makes Us Different
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Since 1986, we've been committed to serving the freshest, highest quality burgers and fries. Here's what sets us apart.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center p-4 bg-background rounded-lg border border-border">
                <div className="w-2 h-2 bg-primary rounded-full mr-4 flex-shrink-0"></div>
                <span className="text-foreground font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Items */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Customer Favorites
            </h2>
            <p className="text-lg text-muted-foreground">
              Try our most popular menu items
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video bg-muted">
                <img src="/placeholder.svg" alt="Five Guys Burger" className="w-full h-full object-cover" />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-2">Five Guys Burger</h3>
                <p className="text-muted-foreground mb-4">Two fresh, hand-formed patties with your choice of toppings</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-primary">$12.99</span>
                  <Badge>Most Popular</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video bg-muted">
                <img src="/placeholder.svg" alt="Five Guys Fries" className="w-full h-full object-cover" />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-2">Five Guys Style Fries</h3>
                <p className="text-muted-foreground mb-4">Fresh-cut potatoes cooked in 100% peanut oil</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-primary">$4.99</span>
                  <Badge variant="secondary">Fresh Cut</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video bg-muted">
                <img src="/placeholder.svg" alt="Five Guys Milkshake" className="w-full h-full object-cover" />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-2">Milkshakes</h3>
                <p className="text-muted-foreground mb-4">Hand-spun with real ice cream and mix-ins</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-primary">$4.49</span>
                  <Badge variant="outline">Made Fresh</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-16 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              What Our Customers Say
            </h2>
            <p className="text-lg text-muted-foreground">
              Real reviews from real customers
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-accent fill-current" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 italic">"{testimonial.comment}"</p>
                  <div className="flex items-center">
                    <div>
                      <div className="font-semibold text-foreground">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground flex items-center">
                        <MapPin className="h-3 w-3 mr-1" />
                        {testimonial.location}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Location CTA */}
      <div className="py-16 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Find Your Nearest Five Guys
          </h2>
          <p className="text-xl opacity-90 mb-8">
            Over 1,700 locations worldwide. Fresh burgers are always within reach.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-3">
              <MapPin className="mr-2 h-5 w-5" />
              Find a Location
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-3 bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              <Clock className="mr-2 h-5 w-5" />
              Order for Pickup
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
