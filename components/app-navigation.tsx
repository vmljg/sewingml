import { Button } from "./ui/button";

export default function AppNavigation() {
  return (
    <div className="pt-gutter bg-background relative hidden h-full flex-col items-center justify-center border-r-4 md:flex">
      <nav className="top-gutter sticky bottom-0 my-auto h-full w-full px-1 py-2">
        <Button variant="outline" size="sm" className="w-full">
          New
        </Button>
        <Button variant="outline" size="sm" className="mt-2 w-full">
          Open
        </Button>
        <Button variant="outline" size="sm" className="mt-2 w-full">
          Save
        </Button>
      </nav>
    </div>
  );
}
