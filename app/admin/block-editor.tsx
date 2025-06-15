import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Block } from "@/lib/types";
import {
  ConferenceListBlock,
  ConferenceTextBlock,
  ConferenceWithImgBlock,
} from "@/components/conference-blocks";

export function BlockEditor({
  blocks,
  onChange,
}: {
  blocks: Block[];
  onChange: (blocks: Block[]) => void;
}) {
  const updateBlock = (index: number, updated: Partial<Block>) => {
    const current = blocks[index];

    let updatedBlock: Block;

    switch (current.type) {
      case "text":
        updatedBlock = {
          ...current,
          ...(updated as Partial<Extract<Block, { type: "text" }>>),
        };
        break;
      case "list":
        updatedBlock = {
          ...current,
          ...(updated as Partial<Extract<Block, { type: "list" }>>),
        };
        break;
      case "withImg":
        updatedBlock = {
          ...current,
          ...(updated as Partial<Extract<Block, { type: "withImg" }>>),
        };
        break;
      default:
        throw new Error("Unsupported block type");
    }

    const newBlocks = [...blocks];
    newBlocks[index] = updatedBlock;
    onChange(newBlocks);
  };

  const deleteBlock = (index: number) => {
    const newBlocks = [...blocks];
    newBlocks.splice(index, 1);
    onChange(newBlocks);
  };

  const moveBlock = (index: number, direction: "up" | "down") => {
    const newBlocks = [...blocks];
    const target = direction === "up" ? index - 1 : index + 1;
    if (target < 0 || target >= newBlocks.length) return;
    [newBlocks[index], newBlocks[target]] = [newBlocks[target], newBlocks[index]];
    onChange(newBlocks);
  };

  const addBlock = () => {
    onChange([
      ...blocks,
      {
        type: "text",
        text: "",
      },
    ]);
  };

  return (
    <div className="space-y-4">
      {blocks.map((block, index) => (
        <div key={index} className="p-3 border rounded space-y-2">
          <div className="flex justify-between items-center">
            <select
              value={block.type}
              onChange={(e) => {
                const type = e.target.value as Block["type"];
                let newBlock: Block = { type } as any;
                if (type === "text") newBlock = { type, text: "" };
                if (type === "list") newBlock = { type, title: "", items: [] };
                if (type === "withImg")
                  newBlock = { type, text: "", image: "", imagePosition: "right" };
                updateBlock(index, newBlock);
              }}
              className="text-sm border rounded p-1"
            >
              <option value="text">Text</option>
              <option value="list">List</option>
              <option value="withImg">With Image</option>
            </select>

            <div className="flex gap-1">
              <Button variant="ghost" size="icon" onClick={() => moveBlock(index, "up")}>
                ↑
              </Button>
              <Button variant="ghost" size="icon" onClick={() => moveBlock(index, "down")}>
                ↓
              </Button>
              <Button variant="destructive" size="icon" onClick={() => deleteBlock(index)}>
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {block.type === "text" && (
            <Textarea
              placeholder="Text content"
              value={(block as any).text}
              onChange={(e) => updateBlock(index, { text: e.target.value })}
            />
          )}

          {block.type === "list" && (
            <>
              <Input
                placeholder="Title"
                value={(block as any).title || ""}
                onChange={(e) => updateBlock(index, { title: e.target.value })}
              />
              <Textarea
                placeholder="Semicolon separated items"
                value={(block as any).items?.join("; ") || ""}
                onChange={(e) =>
                  updateBlock(index, {
                    items: e.target.value.split(";").map((i) => i.trim()),
                  })
                }
              />
            </>
          )}

          {block.type === "withImg" && (
            <>
              <Textarea
                placeholder="Text"
                value={(block as any).text}
                onChange={(e) => updateBlock(index, { text: e.target.value })}
              />
              <Input
                placeholder="Image URL"
                value={(block as any).image}
                onChange={(e) => updateBlock(index, { image: e.target.value })}
              />
              <select
                value={(block as any).imagePosition || "right"}
                onChange={(e) =>
                  updateBlock(index, { imagePosition: e.target.value as "left" | "right" })
                }
                className="border rounded p-1 text-sm"
              >
                <option value="left">Left</option>
                <option value="right">Right</option>
              </select>
            </>
          )}

          <div className="mt-2 p-2 border rounded">
            <span className="text-xs">Preview:</span>
            {block.type === "text" && <ConferenceTextBlock text={block.text} />}
            {block.type === "list" && (
              <ConferenceListBlock title={block.title} items={block.items} />
            )}
            {block.type === "withImg" && (
              <ConferenceWithImgBlock
                text={block.text}
                image={block.image}
                imagePosition={block.imagePosition}
              />
            )}
          </div>
        </div>
      ))}

      <Button type="button" onClick={addBlock} size="sm">
        <Plus className="w-4 h-4 mr-1" /> Add Block
      </Button>
    </div>
  );
}
