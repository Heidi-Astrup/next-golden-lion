// Client Component - needed for useState to manage image preview
"use client";

import Image from "next/image";
import { useState } from "react";
import { Post } from "../types/types";

interface FormPostProps {
  action: (formData: FormData) => void;
  post?: Post;
}

export default function FormPost({ action, post }: FormPostProps) {
  // Local state for image preview
  const [image, setImage] = useState(post?.image);

  return (
    <form
      action={action}
      className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-4 items-start max-w-[800px] my-5"
    >
      {/* Form fields... */}
    </form>
  );
}
