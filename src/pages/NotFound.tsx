import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-clinical-content">
      <div className="text-center space-y-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-foreground">404 - Page Not Found</h1>
          <p className="text-xl text-muted-foreground">The page you're looking for doesn't exist.</p>
        </div>
        <div className="text-muted-foreground">
          <a href="/" className="text-primary hover:underline font-medium">
            Return to Dashboard →
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
