import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import {
  RejectApplication,
  ApproveApplication,
  ViewApplication,
} from "./applications.rowactions";
import titleCase from "@/lib/helpers/titleCase";

export type Application = {
  _id: string;
  name: string;
  position: string;
  createdAt: Date;
  status: "unread" | "read" | "pending" | "rejected";
  email: string;
  phone: string;
  about: string;
};

const statusMap = {
  unread: (
    <div className="text-xs text-white bg-gray-400 p-1 rounded-full w-5 h-5 float-left"></div>
  ),
  read: (
    <div className="flex flex-col justify-center items-center text-xs text-white bg-blue-400 p-1 rounded-full w-5 h-5">
      ✔
    </div>
  ),
  pending: null,
  rejected: null,
};

const renderStatus = ({ row }: { row: { original: Application } }) => {
  const status = row.original.status;
  return statusMap[status];
};

const copyText = (type: "email" | "phone", value: string) => {
  navigator.clipboard.writeText(value);
  toast({
    title: `Copied ${titleCase(type)}`,
  });
};

export const columns: ColumnDef<Application>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      return <div className="text-left font-medium">{row.original.name}</div>;
    },
  },
  {
    accessorKey: "position",
    header: "Position",
    cell: ({ row }) => {
      return (
        <div className="text-left font-medium">{row.original.position}</div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Date Applied",
    cell: ({ row }) => {
      const formattedDate = format(row.original.createdAt, "MM/dd/yyyy");
      return <div className="text-left font-medium">{formattedDate}</div>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: renderStatus,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const application = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button
              size="sm"
              variant="ghost"
              color="gray"
              className="hover:bg-gray-100"
            >
              <MoreHorizontal size={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => copyText("email", application.email)}
            >
              Copy Email
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => copyText("phone", application.phone)}
            >
              Copy Phone
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <ViewApplication row={row} />
            <ApproveApplication row={row} />
            <RejectApplication row={row} />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
