import { Plus, ChevronDown, Heart, TextAlignJustify } from "lucide-react";
import { ThreadsLogo } from "@/components/logos/threads";
import { Button } from "@/components/ui/button";

export function NavigationBar() {
  return (
    <header className="sticky top-0 z-10 w-full border-b border-border bg-background">
      <div className="flex h-12 w-full items-center px-3">
        {/* Left */}
        <Plus className="h-6 w-6" strokeWidth={2.25} />
        {/* Center */}
        <div className="flex flex-1 justify-center">
          <MyProfile />
          {/* <FeedSwitcher /> */}
        </div>
        {/* Right */}
        <FeedActions />
      </div>
    </header>
  );
}

function MyProfile() {
  return (
    <Button
      variant="link"
      aria-label="Create new post"
      className="flex h-10 w-10 items-center justify-center"
    >
      <span className="text-base font-bold">_1stsecond</span>
      <ChevronDown className="h-4 w-4" strokeWidth={2} />
    </Button>
  );
}

function FeedSwitcher() {
  return (
    <button
      type="button"
      aria-label="Switch feed"
      className="flex h-10 items-center gap-1 rounded-full px-3 transition-colors hover:bg-accent"
    >
      <span className="text-base font-bold">Instagram</span>
    </button>
  );
}

function FeedActions() {
  return (
    <div className="flex items-center gap-2">
      <ThreadsLogo className="h-6 w-6" />
      <TextAlignJustify className="h-6 w-6" strokeWidth={2} />
      {/* <Heart className="h-6 w-6" strokeWidth={2} /> */}
    </div>
  );
}
