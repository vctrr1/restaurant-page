import ThemeButton from "@/components/theme-button";
import { Button } from "@/components/ui/button";

const Home = () => {
  return (
    <div className="flex h-screen items-center justify-center gap-4">
      <ThemeButton />
      <Button>Test</Button>
    </div>
  );
};

export default Home;
