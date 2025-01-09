import { postMutationForMenu } from "./menu/post.menu";
import { putMutatiuonForMenu } from "./menu/put.menu";
import { postSpecial, postActiveSpecial } from "./specials/specials.post";
import { putSpecial, putActiveSpecial } from "./specials/specials.put";
import { deleteSpecial } from "./specials/specials.delete";
import { postMutationForItem } from "./item/post.item";
import { putMutationForItem } from "./item/put.item";
import { deleteMutationForItem } from "./item/delete.item";
import { addSale } from "./sales/post.sales";
import { updateSale } from "./sales/put.sales";
import { deleteSaleByDate } from "./sales/delete.sales";
import { postMutationForApplication } from "./application/post.application";
import { putMutationForApplication } from "./application/put.application";
import { deleteMutationForApplication } from "./application/delete.application";

export {
  postMutationForMenu,
  putMutatiuonForMenu,
  postSpecial,
  putSpecial,
  putActiveSpecial,
  postActiveSpecial,
  deleteSpecial,
  postMutationForItem,
  putMutationForItem,
  deleteMutationForItem,
  addSale,
  updateSale,
  deleteSaleByDate,
  postMutationForApplication,
  putMutationForApplication,
  deleteMutationForApplication,
};
