import { Card, CardContent } from "@/components/ui/card";

const Loading = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <Card className="w-96">
        <CardContent className="p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-foreground mb-2">Loading...</h2>
          <p className="text-muted-foreground">
            Preparing your fresh Five Guys experience
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Loading;