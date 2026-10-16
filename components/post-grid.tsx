"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Plus, X } from "lucide-react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
  sortableKeyboardCoordinates,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const MAX_POSTS = 9;

type Post = { id: string; url: string };

export function PostGrid() {
  const [posts, setPosts] = useState<Post[]>([]);
  const urlsRef = useRef(new Set<string>());

  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 200, tolerance: 5 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  useEffect(() => {
    const urls = urlsRef.current;
    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url));
      urls.clear();
    };
  }, []);

  function handleAdd(event: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? []);
    const remaining = MAX_POSTS - posts.length;

    const newPosts = files.slice(0, remaining).map((file) => {
      const url = URL.createObjectURL(file);
      urlsRef.current.add(url);
      return { id: crypto.randomUUID(), url };
    });

    setPosts((prev) => [...prev, ...newPosts]);
    event.target.value = "";
  }

  function handleRemove(post: Post) {
    URL.revokeObjectURL(post.url);
    urlsRef.current.delete(post.url);
    setPosts((prev) => prev.filter((p) => p.id !== post.id));
  }

  function handleDragEnd({ active, over }: DragEndEvent) {
    if (!over || active.id === over.id) return;

    setPosts((prev) => {
      const oldIndex = prev.findIndex((p) => p.id === active.id);
      const newIndex = prev.findIndex((p) => p.id === over.id);
      return arrayMove(prev, oldIndex, newIndex);
    });
  }

  return (
    <DndContext
      id="post-grid" // กัน hydration mismatch ของ aria id
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={posts.map((p) => p.id)}
        strategy={rectSortingStrategy}
      >
        <div className="grid grid-cols-3 gap-0.5">
          {posts.map((post, index) => (
            <SortablePost
              key={post.id}
              post={post}
              index={index}
              onRemove={handleRemove}
            />
          ))}

          {posts.length < MAX_POSTS && (
            <label
              htmlFor="post-upload"
              className="flex aspect-4/5 cursor-pointer items-center justify-center bg-muted text-muted-foreground hover:bg-muted/70"
            >
              <Plus />
              <input
                id="post-upload"
                type="file"
                accept="image/*"
                multiple
                onChange={handleAdd}
                className="hidden"
              />
            </label>
          )}
        </div>
      </SortableContext>
    </DndContext>
  );
}

function SortablePost({
  post,
  index,
  onRemove,
}: {
  post: Post;
  index: number;
  onRemove: (post: Post) => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: post.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`group relative aspect-[4/5] cursor-grab touch-manipulation overflow-hidden bg-muted active:cursor-grabbing ${
        isDragging ? "z-10 opacity-80 shadow-lg" : ""
      }`}
    >
      <Image
        src={post.url}
        alt={`Post ${index + 1}`}
        fill
        unoptimized
        draggable={false}
        sizes="33vw"
        className="pointer-events-none object-cover"
      />
      <button
        type="button"
        onClick={() => onRemove(post)}
        onPointerDown={(e) => e.stopPropagation()}
        aria-label={`Remove post ${index + 1}`}
        className="absolute right-1 top-1 rounded-full bg-black/60 p-1 text-white transition focus-visible:opacity-100 md:opacity-0 md:group-hover:opacity-100"
      >
        <X className="size-3.5" />
      </button>
    </div>
  );
}
