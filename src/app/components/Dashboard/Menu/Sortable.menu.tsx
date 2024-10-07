import { ItemResponse } from "@/lib/api.types";
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
  rectSortingStrategy,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useState, createContext, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { putMutatiuonForMenu } from "@/lib/mutations/menu/put.menu";
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

  const isMobile = window.innerWidth < 1024;

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
      queryClient.invalidateQueries();
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Items sorted successfully",
      });
      setActiveId(null);
    },
  });

  const [clientItems, setClientItems] = useState(items);
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

  useEffect(() => {
    setClientItems(items);
  }, [items]);

  const sensors = useSensors(touchSensor, mouseSensor);

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = clientItems.findIndex((item) => item._id === active.id);
      const newIndex = clientItems.findIndex((item) => item._id === over.id);
      const newItems = arrayMove(clientItems, oldIndex, newIndex);
      setClientItems(newItems);
      sortMenu.mutate({ category, items: newItems });
    }
    setActiveId(null);
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
        items={clientItems.map((item) => item._id)}
        strategy={isMobile ? verticalListSortingStrategy : rectSortingStrategy}
      >
        {clientItems.map((item) => (
          <MenuItem
            key={item._id}
            item={item}
            currentlyDragged={activeId === item._id}
          />
        ))}

        <DragOverlay>
          {activeId ? (
            <MenuItem
              item={
                clientItems.find(
                  (item) => item._id === activeId
                ) as ItemResponse
              }
              className={`bg-slate-900 border border-border w-full pointer-events-none`}
            />
          ) : null}
        </DragOverlay>
      </SortableContext>
    </DndContext>
  );
};

export default Sortable;
