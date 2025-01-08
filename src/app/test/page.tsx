"use client";
import { ItemRequest, ItemResponse } from "@/lib/api.types";
import { Form } from "../components/Dashboard/Form";

const TestPage = () => {
  return (
    <Form.Root
      itemType="item"
      mutationType="post"
      onClose={() => {}}
      category="Ribs & BBQ"
    >
      <Form.Input label="Name" type="text" value="" name="name" />
      <Form.PriceInput label="Price" value={0} name="price" type="number" />
      <Form.TextArea
        label="Description"
        type="text"
        value=""
        name="description"
      />
      <Form.ImageSelector />
    </Form.Root>
  );
};

export default TestPage;
