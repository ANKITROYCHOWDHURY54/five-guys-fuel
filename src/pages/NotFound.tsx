import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-6 max-w-md mx-auto px-4">
        <div className="relative">
          <h1 className="text-9xl font-bold text-primary/20">404</h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center">
              <div className="text-4xl">🍔</div>
            </div>
          </div>
        </div>
        
        <h2 className="text-3xl font-bold text-foreground">Oops! Page Not Found</h2>
        
        <p className="text-lg text-muted-foreground">
          Looks like this burger went missing! The page you're looking for doesn't exist.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <Button size="lg" className="w-full sm:w-auto">
              <Home className="mr-2 h-5 w-5" />
              Go Home
            </Button>
          </Link>
          <Button 
            variant="outline" 
            size="lg" 
            onClick={() => window.history.back()}
            className="w-full sm:w-auto"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Go Back
          </Button>
        </div>
        
        <div className="mt-8 p-4 bg-card rounded-lg border">
          <p className="text-sm text-muted-foreground">
            Need help? Try searching for what you're looking for or visit our{" "}
            <Link to="/menu" className="text-primary hover:underline">
              menu page
            </Link>{" "}
            to see our delicious offerings.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
