// Client Component - needed for useState to manage modal visibility
"use client";

import { useState } from "react";

interface DeletePostButtonProps {
  deleteAction: () => void;
}

export default function DeletePostButton({
  deleteAction,
}: DeletePostButtonProps) {
  const [showModal, setShowModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleConfirmDelete() {
    setIsDeleting(true);
    await deleteAction();
    // Redirect happens in Server Action
  }

  return (
    <>
      <button type="button" onClick={() => setShowModal(true)}>
        Delete post
      </button>
      {showModal && <div>{/* Modal content... */}</div>}
    </>
  );
}
