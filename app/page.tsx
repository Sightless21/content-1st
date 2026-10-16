import { NavigationBar } from "@/components/navigation-bar";
import { InstagramProfile } from "@/components/instagram-profile";

export default function Page() {
  return (
    <div className="min-h-screen bg-background">
      {/* Phone-width app column, centered on larger screens */}
      <div className="mx-auto flex min-h-screen w-full max-w-[400px] flex-col border-x border-border sm:border-x">
        {/* Navigation Bar */}
        <NavigationBar />
        {/* My Feed */}
        <main className="flex-1 px-4 py-4">
          <InstagramProfile />
        </main>
      </div>
    </div>
  );
}
