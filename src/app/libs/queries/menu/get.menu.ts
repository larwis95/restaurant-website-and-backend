import { MenuResponse } from "../../api.types";

export const fetchAllMenus = async (): Promise<MenuResponse[]> => {
  const response = await fetch(`/api/menu`);
  const data = await response.json();
  return data;
};

export const fetchMenu = async (id: string): Promise<MenuResponse> => {
  const response = await fetch(`/api/menu/${id}`);
  const data = await response.json();
  return data;
};
