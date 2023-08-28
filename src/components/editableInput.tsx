"use client";

import { useState } from "react";

export default function EditableInput({
  type,
  value,
  onBlurHandle,
}: {
  type: "text";
  value: string;
  onBlurHandle: (value: string) => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  if (isEditing) {
    return (
      <input
        type={type}
        defaultValue={value}
        className="rounded-sm py-1 px-2 bg-transparent shadow-black shadow-sm max-w-full"
        onBlur={(e) => {
          onBlurHandle(e.target.value.trim());
          setIsEditing(false);
        }}
        autoFocus
      />
    );
  }
  return (
    <p onClick={() => setIsEditing(true)} className="max-w-full">
      {value}
    </p>
  );
}
