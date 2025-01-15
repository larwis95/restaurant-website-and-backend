import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Delete } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
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
  DeleteApplication,
} from "./applications.rowactions";
import titleCase from "@/lib/helpers/titleCase";
import { UTCDate } from "@date-fns/utc";

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
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <div className="text-xs text-white bg-gray-400 p-1 rounded-full w-6 h-6 flex justify-center items-center float-left"></div>
        </TooltipTrigger>
        <TooltipContent>Unread</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
  read: (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <div className="text-sm text-white bg-blue-400 p-1 rounded-full w-6 h-6 flex justify-center items-center float-left">
            🕮
          </div>
        </TooltipTrigger>
        <TooltipContent>Read</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
  pending: (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <div className="text-sm text-white bg-green-500 p-1 rounded-full w-5 h-5 flex justify-center items-center float-left">
            ✔
          </div>
        </TooltipTrigger>
        <TooltipContent>Accepted</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
  rejected: (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <div className="text-xs text-white bg-red-500 p-1 rounded-full w-5 h-5 flex justify-center items-center float-left">
            &#x2715;
          </div>
        </TooltipTrigger>
        <TooltipContent>Rejected</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
};

const renderStatus = ({ row }: { row: { original: Application } }) => {
  const status = row.original.status;
  return (
    <div className="flex flex-row justify-start items-center">
      {statusMap[status]}
    </div>
  );
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
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          color="gray"
          size="sm"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Position
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="text-left font-medium">{row.original.position}</div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          color="gray"
          size="sm"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date Applied
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const formattedDate = format(
        new UTCDate(row.original.createdAt),
        "MM/dd/yyyy"
      );
      return <div className="text-left font-medium">{formattedDate}</div>;
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          color="gray"
          size="sm"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
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
            <DeleteApplication row={row} />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
