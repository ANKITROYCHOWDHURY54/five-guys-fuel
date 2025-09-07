import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, TrendingUp, Users, MapPin } from "lucide-react";

const Franchise = () => {
  const benefits = [
    "Proven business model with strong ROI",
    "Comprehensive training and ongoing support",
    "Marketing and advertising assistance",
    "Exclusive territory protection",
    "Supply chain management support",
    "Operations manual and systems",
  ];

  const stats = [
    { icon: <TrendingUp className="h-8 w-8" />, value: "1,700+", label: "Locations Worldwide" },
    { icon: <Users className="h-8 w-8" />, value: "25+", label: "Years of Experience" },
    { icon: <MapPin className="h-8 w-8" />, value: "50+", label: "Countries & Territories" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-primary text-primary-foreground py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Join the Five Guys Family
            </h1>
            <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto mb-8">
              Own a piece of the fastest-growing burger franchise in America
            </p>
            <Button size="lg" variant="secondary" className="text-lg px-8 py-3">
              Start Your Journey
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="text-primary mb-4">{stat.icon}</div>
                <div className="text-4xl font-bold text-foreground mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Why Franchise Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Why Choose Five Guys Franchise?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Five Guys has been serving fresh, never-frozen burgers and hand-cut fries since 1986. 
                Our proven business model and commitment to quality have made us one of the most 
                successful burger franchises in the world.
              </p>
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center">
                    <Check className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                    <span className="text-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-muted aspect-square rounded-lg flex items-center justify-center">
              <img
                src="/placeholder.svg"
                alt="Five Guys Restaurant"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Investment Details */}
      <div className="py-16 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Investment Details
            </h2>
            <p className="text-lg text-muted-foreground">
              Everything you need to know about starting your Five Guys franchise
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-center">Initial Investment</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-3xl font-bold text-primary mb-4">$350K - $500K</div>
                <p className="text-muted-foreground">
                  Total investment including franchise fee, equipment, and working capital
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-center">Franchise Fee</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-3xl font-bold text-primary mb-4">$45K</div>
                <p className="text-muted-foreground">
                  One-time franchise fee per location
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-center">Royalty Fee</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-3xl font-bold text-primary mb-4">6%</div>
                <p className="text-muted-foreground">
                  Ongoing royalty based on gross sales
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl opacity-90 mb-8">
            Take the first step towards owning your own Five Guys franchise. 
            Our team is ready to guide you through the process.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-3">
              Request Information
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-3 bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              Schedule a Call
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Franchise;