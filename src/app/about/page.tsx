import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
const murrellFamily = "/images/murrell-family.jpg";

export default function About() {
  const timeline = [
    {
      year: "1986",
      title: "The Beginning",
      description: "Jerry and Janie Murrell offered sage advice to the four young Murrell brothers: 'Start a business or go to college.' The business route won and the Murrell family opened a carry-out burger joint in Arlington, Virginia.",
    },
    {
      year: "2003", 
      title: "First Franchise",
      description: "After years of perfecting their craft and building a loyal following, Five Guys opened their first franchise location, marking the beginning of rapid expansion.",
    },
    {
      year: "2010",
      title: "Going International", 
      description: "Five Guys crossed borders, opening locations in the UK and Canada, sharing fresh, never-frozen burgers with the world.",
    },
    {
      year: "Today",
      title: "Global Success",
      description: "With over 1,700 locations worldwide, Five Guys continues to serve fresh, hand-formed burgers and hand-cut fries made to order.",
    },
  ];

  const values = [
    {
      title: "Quality First",
      description: "We never compromise on quality. Fresh, never-frozen beef, hand-cut fries, and made-to-order milkshakes.",
    },
    {
      title: "Family Values",
      description: "Founded by a family, we treat our customers, employees, and franchisees like family.",
    },
    {
      title: "Simplicity",
      description: "We keep it simple - focus on doing a few things exceptionally well rather than many things poorly.",
    },
    {
      title: "Consistency",
      description: "Whether you visit us in Virginia or London, you'll get the same great Five Guys experience every time.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-primary text-primary-foreground py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Our Story</h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
            From a small family business to a global burger phenomenon
          </p>
        </div>
      </div>

      {/* Founder Story */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="aspect-square rounded-lg overflow-hidden">
              <Image
                src={murrellFamily}
                alt="Murrell Family"
                className="w-full h-full object-cover"
                width={600}
                height={600}
              />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                The Murrell Family Legacy
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                In 1986, Jerry and Janie Murrell offered their four sons a choice: start a business 
                or go to college. The boys chose business, and Five Guys was born. What started as 
                a small burger joint in Arlington, Virginia, has grown into one of the world's most 
                beloved burger chains.
              </p>
              <p className="text-lg text-muted-foreground mb-6">
                The Murrell family's commitment to quality, simplicity, and treating customers like 
                family has been the driving force behind Five Guys' success. Every burger is still 
                made the same way Jerry taught his sons - with fresh, never-frozen beef and a 
                dedication to excellence.
              </p>
              <p className="text-lg text-muted-foreground">
                Today, with over 1,700 locations worldwide, the Five Guys family continues to grow, 
                but our values remain the same: quality ingredients, made-to-order food, and treating 
                every customer like family.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="py-16 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Our Journey
            </h2>
            <p className="text-lg text-muted-foreground">
              Key milestones in the Five Guys story
            </p>
          </div>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border transform md:-translate-x-px"></div>
            
            <div className="space-y-12">
              {timeline.map((item, index) => (
                <div key={index} className="relative flex items-center">
                  {/* Timeline dot */}
                  <div className="absolute left-0 md:left-1/2 w-8 h-8 bg-primary rounded-full transform md:-translate-x-1/2 flex items-center justify-center">
                    <div className="w-3 h-3 bg-primary-foreground rounded-full"></div>
                  </div>
                  
                  {/* Content */}
                  <div className={`ml-12 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8 md:ml-1/2'}`}>
                    <Card>
                      <CardContent className="p-6">
                        <div className="text-2xl font-bold text-primary mb-2">{item.year}</div>
                        <h3 className="text-xl font-bold text-foreground mb-3">{item.title}</h3>
                        <p className="text-muted-foreground">{item.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Our Values
            </h2>
            <p className="text-lg text-muted-foreground">
              The principles that guide everything we do
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-8 text-center">
                  <h3 className="text-xl font-bold text-foreground mb-4">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Taste Our Story
          </h2>
          <p className="text-xl opacity-90 mb-8">
            Visit us today and experience the quality and family values that have made Five Guys a global success.
          </p>
          <button className="bg-accent text-accent-foreground px-8 py-3 rounded-md font-semibold hover:bg-accent/90 transition-colors text-lg">
            Find a Location
          </button>
        </div>
      </div>
    </div>
  );
}
