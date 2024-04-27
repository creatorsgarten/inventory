interface Menu {
  icon: string;
  name: string;
  to: string;
}

export const menus: Menu[] = [
  {
    icon: "lucide:tag",
    name: "Items",
    to: "/",
  },
  {
    icon: "lucide:container",
    name: "Containers",
    to: "/containers",
  },
  {
    icon: "lucide:cpu",
    name: "Tags",
    to: "/tags",
  },
];
