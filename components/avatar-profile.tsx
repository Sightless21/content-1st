"use client";

import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { Plus } from "lucide-react";

export function AvatarProfile() {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const urlRef = useRef<string | null>(null);
  
  useEffect(() => {
    return () => {
      if (urlRef.current) URL.revokeObjectURL(urlRef.current);
    };
  }, []);

  function handleUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;

    // revoke URL เก่าก่อนสร้างใหม่
    if (urlRef.current) URL.revokeObjectURL(urlRef.current);

    const url = URL.createObjectURL(selectedFile);
    urlRef.current = url;
    setPreviewUrl(url);
  }

  return (
    <div className="rounded-full bg-linear-to-tr from-amber-400 via-rose-500 to-fuchsia-500 p-0.75">
      <div className="rounded-full bg-background p-0.5">
        <label
          htmlFor="profile"
          className="relative flex size-20 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-muted text-2xl font-semibold text-muted-foreground"
        >
          {previewUrl ? (
            <Image
              src={previewUrl}
              alt="Profile"
              fill
              unoptimized
              className="object-cover"
              sizes="80px"
            />
          ) : (
            <Plus />
          )}
        </label>

        <input
          type="file"
          name="profile"
          id="profile"
          accept="image/*"
          onChange={handleUpload}
          className="hidden"
        />
      </div>
    </div>
  );
}
