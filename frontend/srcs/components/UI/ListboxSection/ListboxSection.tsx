import React from "react";
import { Listbox, ListboxItem, ListboxSection, cn } from "@nextui-org/react";
import { ListboxWrapper } from "./ListboxWrapper";
import { AddNoteIcon } from "./AddNoteIcon.tsx";
import { CopyDocumentIcon } from "./CopyDocumentIcon.tsx";
import { EditDocumentIcon } from "./EditDocumentIcon.tsx";
import { DeleteDocumentIcon } from "./DeleteDocumentIcon.tsx";

export default function SearchListboxSection() {
  const iconClasses =
    "text-xl text-default-500 pointer-events-none flex-shrink-0";

  return (
    <ListboxWrapper>
      <Listbox variant="flat" aria-label="Listbox menu with sections">
        <ListboxSection title="Users" showDivider>
          <ListboxItem
            key="new"
            description="Create a new file"
            startContent={<AddNoteIcon className={iconClasses} />}
          >
            New file
          </ListboxItem>
          <ListboxItem
            key="copy"
            description="Copy the file link"
            startContent={<CopyDocumentIcon className={iconClasses} />}
          >
            Copy link
          </ListboxItem>
          <ListboxItem
            key="edit"
            description="Allows you to edit the file"
            startContent={<EditDocumentIcon className={iconClasses} />}
          >
            Edit file
          </ListboxItem>
        </ListboxSection>
        <ListboxSection title="Settings">
          <ListboxItem
            key="delete"
            className="text-danger"
            color="danger"
            description="Permanently delete the file"
            startContent={
              <DeleteDocumentIcon className={cn(iconClasses, "text-danger")} />
            }
          >
            Delete file
          </ListboxItem>
        </ListboxSection>
      </Listbox>
    </ListboxWrapper>
  );
}
