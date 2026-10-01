"use client";

import { useState } from "react";
import { t } from "@/i18n/en";
import { validateCategoryName } from "@/domain/validation";

interface CategoryManagerProps {
  categories: string[];
  onAdd: (name: string) => void;
  onRename: (from: string, to: string) => void;
  onDelete: (name: string) => void;
}

export function CategoryManager({
  categories,
  onAdd,
  onRename,
  onDelete,
}: CategoryManagerProps) {
  const [open, setOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [addError, setAddError] = useState<string | null>(null);

  function handleAdd(event: React.FormEvent) {
    event.preventDefault();
    const result = validateCategoryName(newName, categories);
    if (!result.ok || !result.name) {
      setAddError(t.errors[result.error!]);
      return;
    }
    onAdd(result.name);
    setNewName("");
    setAddError(null);
  }

  return (
    <div className="rounded-lg border border-zinc-200 bg-white">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-medium text-zinc-700"
      >
        {t.categories.manage}
        <span aria-hidden="true" className="text-zinc-400">
          {open ? "−" : "+"}
        </span>
      </button>

      {open && (
        <div className="flex flex-col gap-3 border-t border-zinc-100 p-4">
          <form onSubmit={handleAdd} className="flex gap-2">
            <input
              type="text"
              value={newName}
              placeholder={t.categories.addPlaceholder}
              onChange={(e) => {
                setNewName(e.target.value);
                setAddError(null);
              }}
              className="min-h-10 flex-1 rounded-md border border-zinc-200 px-3 text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-accent-filament/30"
            />
            <button
              type="submit"
              className="min-h-10 rounded-md bg-accent-filament px-4 text-sm font-semibold text-white"
            >
              {t.categories.add}
            </button>
          </form>
          {addError && <p className="text-xs text-red-600">{addError}</p>}

          {categories.length === 0 ? (
            <p className="text-sm text-zinc-500">{t.categories.empty}</p>
          ) : (
            <ul className="flex flex-col gap-2">
              {categories.map((category) => (
                <CategoryRow
                  key={category}
                  category={category}
                  categories={categories}
                  onRename={onRename}
                  onDelete={onDelete}
                />
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

function CategoryRow({
  category,
  categories,
  onRename,
  onDelete,
}: {
  category: string;
  categories: string[];
  onRename: (from: string, to: string) => void;
  onDelete: (name: string) => void;
}) {
  const [renaming, setRenaming] = useState(false);
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const [renameValue, setRenameValue] = useState(category);
  const [renameError, setRenameError] = useState<string | null>(null);

  function handleRenameSubmit(event: React.FormEvent) {
    event.preventDefault();
    const result = validateCategoryName(renameValue, categories, category);
    if (!result.ok || !result.name) {
      setRenameError(t.errors[result.error!]);
      return;
    }
    onRename(category, result.name);
    setRenaming(false);
    setRenameError(null);
  }

  if (renaming) {
    return (
      <li>
        <form onSubmit={handleRenameSubmit} className="flex gap-2">
          <input
            type="text"
            value={renameValue}
            onChange={(e) => {
              setRenameValue(e.target.value);
              setRenameError(null);
            }}
            autoFocus
            className="min-h-9 flex-1 rounded-md border border-zinc-200 px-3 text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-accent-filament/30"
          />
          <button
            type="submit"
            className="min-h-9 rounded-md border border-zinc-200 px-3 text-sm font-medium text-zinc-700"
          >
            {t.categories.save}
          </button>
          <button
            type="button"
            onClick={() => {
              setRenaming(false);
              setRenameValue(category);
              setRenameError(null);
            }}
            className="min-h-9 rounded-md px-3 text-sm font-medium text-zinc-500"
          >
            {t.categories.cancel}
          </button>
        </form>
        {renameError && <p className="mt-1 text-xs text-red-600">{renameError}</p>}
      </li>
    );
  }

  return (
    <li className="flex items-center justify-between gap-2 text-sm">
      <span className="text-zinc-900">{category}</span>
      {confirmingDelete ? (
        <span className="flex items-center gap-2">
          <span className="text-xs text-zinc-600">{t.categories.confirmDelete}</span>
          <button
            type="button"
            onClick={() => onDelete(category)}
            className="font-medium text-red-600"
          >
            {t.categories.confirmDeleteYes}
          </button>
          <button
            type="button"
            onClick={() => setConfirmingDelete(false)}
            className="font-medium text-zinc-500"
          >
            {t.categories.confirmDeleteNo}
          </button>
        </span>
      ) : (
        <span className="flex gap-3">
          <button
            type="button"
            onClick={() => setRenaming(true)}
            className="font-medium text-zinc-600"
          >
            {t.categories.rename}
          </button>
          <button
            type="button"
            onClick={() => setConfirmingDelete(true)}
            className="font-medium text-red-600"
          >
            {t.categories.delete}
          </button>
        </span>
      )}
    </li>
  );
}
