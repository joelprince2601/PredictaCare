// Update this page (the content is just a fallback if you fail to update the page)

const Index = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-clinical-content">
      <div className="text-center space-y-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-foreground">Welcome to PredictaCare</h1>
          <p className="text-xl text-muted-foreground">AI-Powered Healthcare Risk Prediction Platform</p>
        </div>
        <div className="text-muted-foreground">
          <p>Please navigate to the main dashboard to begin.</p>
          <a href="/" className="text-primary hover:underline font-medium">
            Go to Dashboard →
          </a>
        </div>
      </div>
    </div>
  );
};

export default Index;
