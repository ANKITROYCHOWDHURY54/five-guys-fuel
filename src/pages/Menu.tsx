import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import fiveguysBurger from "@/assets/hero-burger.jpg";
import littleHamburger from "@/assets/little-hamburger.jpg";
import baconCheeseburger from "@/assets/bacon-cheeseburger.jpg";
import fries from "@/assets/fries.jpg";
import cajunFries from "@/assets/cajun-fries.jpg";
import hotDog from "@/assets/hot-dog.jpg";
import baconDog from "@/assets/bacon-dog.jpg";
import milkshake from "@/assets/milkshake.jpg";

const Menu = () => {
  const menuItems = [
    {
      id: 1,
      name: "Five Guys Burger",
      description: "Two fresh, hand-formed patties hot off the grill, layered with two strips of crispy apple-wood smoked bacon and placed on a soft, toasted sesame seed bun.",
      price: "$12.99",
      category: "Burgers",
      image: fiveguysBurger,
      popular: true,
    },
    {
      id: 2,
      name: "Little Hamburger",
      description: "One fresh, hand-formed patty hot off the grill. Add as many toppings as you want.",
      price: "$8.99",
      category: "Burgers",
      image: littleHamburger,
    },
    {
      id: 3,
      name: "Bacon Cheeseburger",
      description: "Two fresh patties grilled to perfection, layered with two strips of crispy bacon and American cheese.",
      price: "$13.99",
      category: "Burgers",
      image: baconCheeseburger,
      popular: true,
    },
    {
      id: 4,
      name: "Five Guys Style Fries",
      description: "Freshly cut potatoes cooked in 100% peanut oil and served boardwalk-style, extra crispy.",
      price: "$4.99",
      category: "Fries",
      image: fries,
    },
    {
      id: 5,
      name: "Cajun Style Fries",
      description: "Our boardwalk-style fries cooked in 100% peanut oil with a heavy sprinkling of Cajun spice.",
      price: "$5.49",
      category: "Fries",
      image: cajunFries,
    },
    {
      id: 6,
      name: "Hot Dog",
      description: "All-beef Hebrew National hot dog, split and grilled lengthwise for a caramelized exterior.",
      price: "$6.99",
      category: "Hot Dogs",
      image: hotDog,
    },
    {
      id: 7,
      name: "Bacon Dog",
      description: "All-beef Hebrew National hot dog, split and grilled lengthwise with crispy strips of apple-wood smoked bacon.",
      price: "$8.49",
      category: "Hot Dogs",
      image: baconDog,
    },
    {
      id: 8,
      name: "Vanilla Shake",
      description: "Hand-spun vanilla milkshake with or without whipped cream.",
      price: "$4.49",
      category: "Shakes",
      image: milkshake,
    },
  ];

  const categories = ["All", "Burgers", "Fries", "Hot Dogs", "Shakes"];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-primary text-primary-foreground py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Our Menu</h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
            Fresh, never frozen beef. Hand-cut fries. Made-to-order milkshakes.
          </p>
        </div>
      </div>

      {/* Menu Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <Badge
              key={category}
              variant="secondary"
              className="px-6 py-2 text-sm cursor-pointer hover:bg-accent transition-colors"
            >
              {category}
            </Badge>
          ))}
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {menuItems.map((item) => (
            <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video bg-muted relative overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
                {item.popular && (
                  <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
                    Popular
                  </Badge>
                )}
              </div>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-foreground">{item.name}</h3>
                  <span className="text-lg font-bold text-primary">{item.price}</span>
                </div>
                <p className="text-muted-foreground mb-4">{item.description}</p>
                <Badge variant="outline" className="text-xs">
                  {item.category}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <h2 className="text-3xl font-bold text-foreground mb-6">
            Ready to Order?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-primary text-primary-foreground px-8 py-3 rounded-md font-semibold hover:bg-primary/90 transition-colors">
              Order for Pickup
            </button>
            <button className="bg-accent text-accent-foreground px-8 py-3 rounded-md font-semibold hover:bg-accent/90 transition-colors">
              Order for Delivery
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;