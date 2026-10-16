import {
  Grid3x3,
  UserPlus,
  MessageSquare,
  Bookmark,
  ChevronDown,
  Link2,
  SquarePlay,
  Repeat,
  SquareUserRound,
  Lock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { AvatarProfile } from "@/components/avatar-profile";
import { PostGrid } from "@/components/post-grid";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";


export function InstagramProfile() {
  return (
    <div className="flex flex-col gap-1">
      {/* Header: avatar + stats */}
      <div className="flex items-center gap-5 px-1">
        <AvatarProfile />
        <div className="flex flex-col flex-1 space-y-2">
          <p className="text-sm font-semibold">_1stsecond</p>
          <div className="flex gap-10">
            <Stat value="128" label="posts" />
            <Stat value="12.4K" label="followers" />
            <Stat value="342" label="following" />
          </div>
        </div>
      </div>

      {/* Bio */}
      <div className="px-1">
        <p className="mt-0.5 text-sm text-foreground/90">
          First impressions, every day.
        </p>
        <p className="mt-0.5 text-sm text-muted-foreground">
          Design · Photography · Coffee
        </p>
        <p className="flex gap-1 mt-0.5 text-sm font-bold items-center">
          <Link2 className="h-4 w-4 rotate-135" strokeWidth={2} />
          link
        </p>
      </div>

      {/* Action buttons */}
      <div className="flex items-center gap-1">
        <Button className="flex-1 bg-[#4D5EF9] rounded-sm">Follow</Button>
        <Button variant="outline" className="flex-1 rounded-sm bg-neutral-100">
          Message
        </Button>
        <Button
          variant="outline"
          className={"rounded-sm bg-neutral-100"}
          size="icon"
          aria-label="Suggested profiles"
        >
          <UserPlus />
        </Button>
      </div>

      {/* Highlights */}
      <div className="flex gap-4 overflow-x-auto px-1 pb-1">
        {["New", "Travel", "Work", "Life", "Food"].map((label) => (
          <div
            key={label}
            className="flex shrink-0 flex-col items-center gap-1.5"
          >
            <div className="flex size-14 items-center justify-center rounded-full border border-border bg-muted/40">
              <span className="text-xs font-medium text-muted-foreground">
                {label}
              </span>
            </div>
            <span className="text-xs text-foreground/80">{label}</span>
          </div>
        ))}
      </div>

      {/* tabs */}
      <div className="w-full">
        {/* tabs */}
        <Tabs defaultValue="posts" className="w-full">
          <TabsList variant="line" className="w-full">
            <TabsTrigger value="posts" className="flex-1">
              <Grid3x3 />
            </TabsTrigger>
            <TabsTrigger value="reels" className="flex-1" disabled>
              <SquarePlay />
            </TabsTrigger>
            <TabsTrigger value="reposts" className="flex-1" disabled>
              <Repeat />
            </TabsTrigger>
            <TabsTrigger value="tagged" className="flex-1" disabled>
              <SquareUserRound />
            </TabsTrigger>
          </TabsList>
          <TabsContent value={"posts"}>
            <PostGrid />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-start">
      <span className="text-base font-semibold">{value}</span>
      <span className="text-sm text-muted-foreground">{label}</span>
    </div>
  );
}
