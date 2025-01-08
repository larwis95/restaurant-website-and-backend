import {
  ItemResponse,
  MenuRequest,
  MenuResponse,
  SpecialRequest,
} from "@/lib/api.types";
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
import React, { useState, createContext, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import MenuItem from "./MenuItem.menu";
import { ISortableProps } from "./Menu.interfaces";
import { data } from "@tensorflow/tfjs";

export const ItemsContext = createContext({
  items: [] as ItemResponse[],
});

export const Sortable: React.FC<ISortableProps> = ({
  items,
  category,
  mutation,
  mutationMap,
}: ISortableProps) => {
  const queryClient = useQueryClient();

  const isMobile = window.innerWidth < 1024;

  const sortMenu = useMutation({
    mutationFn: mutation,
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update items sort order",
        variant: "destructive",
      });
      setActiveId(null);
    },
    onSuccess: () => {
      if (!mutation) return;
      toast({
        title: "Success",
        description: "Items sorted successfully",
      });
      setActiveId(null);
      queryClient.invalidateQueries();
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
      if (!category) {
        return sortMenu.mutate(newItems.map((item) => item._id));
      }
      return sortMenu.mutate({
        name: category,
        items: newItems,
      });
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
            mutationMap={mutationMap}
          />
        ))}

        <DragOverlay>
          {activeId ? (
            <MenuItem
              item={
                clientItems.find((item) => item._id === activeId) ??
                ({} as ItemResponse)
              }
              className={`bg-slate-900 border border-border w-full pointer-events-none`}
              mutationMap={mutationMap}
            />
          ) : null}
        </DragOverlay>
      </SortableContext>
    </DndContext>
  );
};

export default Sortable;
