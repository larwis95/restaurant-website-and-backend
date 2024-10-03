import { ItemResponse } from "@/app/libs/api.types";
import {
  DndContext,
  closestCenter,
  TouchSensor,
  MouseSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useState, createContext } from "react";
import { useMutation } from "@tanstack/react-query";
import { putMutatiuonForMenu } from "@/app/libs/mutations/menu/put.menu";
import { toast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import MenuItem from "./MenuItem.menu";

export const ItemsContext = createContext({
  items: [] as ItemResponse[],
});

export const Sortable = ({
  items,
  category,
}: {
  items: ItemResponse[];
  category: string;
}) => {
  const queryClient = useQueryClient();
  const sortMenu = useMutation({
    mutationFn: async ({
      category,
      items,
    }: {
      category: string;
      items: ItemResponse[];
    }) => {
      await putMutatiuonForMenu(category, items);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update items sort order",
        variant: "destructive",
      });
      setActiveId(null);
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Items sorted successfully",
      });
      setActiveId(null);
      queryClient.invalidateQueries({
        queryKey: ["fullMenu"],
      });
    },
  });
  const [activeId, setActiveId] = useState(null);
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 250,
      tolerance: 5,
    },
  });
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  });
  const sensors = useSensors(touchSensor, mouseSensor);

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = items.findIndex((item) => item._id === active.id);
      const newIndex = items.findIndex((item) => item._id === over.id);
      const newItems = arrayMove(items, oldIndex, newIndex);
      sortMenu.mutate({ category, items: newItems });
    }
  };

  const handleDragStart = (event: any) => {
    const { active } = event;
    setActiveId(active.id);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
    >
      <SortableContext
        items={items.map((item) => item._id)}
        strategy={horizontalListSortingStrategy}
      >
        {items.map((item) => (
          <MenuItem key={item._id} item={item} />
        ))}

        <DragOverlay>
          {activeId ? (
            <MenuItem
              item={items.find((item) => item._id === activeId) as ItemResponse}
              className={`bg-slate-900 border border-border w-full bg-opacity-40 pointer-events-none`}
            />
          ) : null}
        </DragOverlay>
      </SortableContext>
    </DndContext>
  );
};

export default Sortable;
