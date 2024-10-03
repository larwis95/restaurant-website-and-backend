import { CarouselItem, Button } from "./Hero.types";

export const carouselImages: CarouselItem[] = [
  {
    src: "/images/food/broastedchicken.webp",
    alt: "Broasted Chicken with Broasted Potatoes.",
  },
  {
    src: "/images/food/pizza1.webp",
    alt: "Deep Dish Super Special Pizza.",
  },
  {
    src: "/images/food/pizza2.webp",
    alt: "Deep Dish All-Meat Pizza",
  },
  {
    src: "/images/food/cinnamonbread.webp",
    alt: "Cinnamon Bread.",
  },
  {
    src: "/images/food/fishandchips.webp",
    alt: "Battered Deep Fried Cod with Broasted Potatoes.",
  },
  {
    src: "/images/food/jojobites.webp",
    alt: "JoJo Bites - Garlic Parmensan Bread Bites.",
  },
  {
    src: "/images/food/jojobread.webp",
    alt: "JoJo Bread - Cheesey Garlic Bread.",
  },
  {
    src: "/images/food/ribs.webp",
    alt: "Baby Back Ribs with French Fries.",
  },
  {
    src: "/images/food/salad.webp",
    alt: "Greek Salad with Feta Cheese and Olives.",
  },
  {
    src: "/images/food/sub.webp",
    alt: "Italian Sub Sandwich.",
  },
  {
    src: "/images/food/pulledporksub.webp",
    alt: "Pulled Pork Sub Sandwich.",
  },
  {
    src: "/images/food/wings.webp",
    alt: "Buffalo Wings with Ranch Dressing.",
  },
  {
    src: "/images/food/wings2.webp",
    alt: "Bone-In Traditional Wings with French Fries.",
  },
];

export const buttonConfig: Button[] = [
  {
    title: "Order Online",
    href: "https://order.spoton.com/big-joes-245/imlay-city-mi/6112fc839adef3d75c8d14b4",
    color: "bg-primary",
    textColor: "secondary",
    hoverColor: "hover:bg-secondary",
    hoverTextColor: "hover:text-primary",
  },
  {
    title: "Get Delivery (DoorDash)",
    href: "https://www.doordash.com/store/big-joe's-pizza-chicken-ribs-seafood-imlay-city-2036859/?irgwc=1&pid=27795&srsltid=AfmBOor9WNhkVDP9Vt4_dsbsj0-Dko70-LD_a4EoaftsxsH7aupVtPEa&utm_campaign=Cx_US_AF_AF_IR_ACQ_CUSXXX_10350_&utm_medium=affiliate&utm_source=impactradius",
    color: "bg-secondary",
    textColor: "primary",
    hoverColor: "hover:bg-primary",
    hoverTextColor: "hover:text-secondary",
  },
  {
    title: "📞 810-724-9000",
    href: "tel:+18107249000",
    color: "bg-green-700",
    textColor: "white",
    hoverColor: "hover:bg-primary",
    hoverTextColor: "hover:text-secondary",
  },
];
