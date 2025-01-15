import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  putMutationForApplication,
  deleteMutationForApplication,
} from "@/lib/mutations";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { toast } from "@/hooks/use-toast";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

type Application = {
  _id: string;
  name: string;
  position: string;
  createdAt: Date;
  status: "unread" | "read" | "pending" | "rejected";
  email: string;
  phone: string;
  about: string;
};

export const RejectApplication = ({
  row,
}: {
  row: { original: Application };
}) => {
  const { _id, name } = row.original;
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationKey: ["applications", _id],
    mutationFn: putMutationForApplication,
    onSuccess: () => {
      queryClient.invalidateQueries();
      toast({
        title: "Success",
        description: `${name} has been rejected`,
      });
    },
  });

  return (
    <DropdownMenuItem
      onClick={() => {
        mutate({ ...row.original, status: "rejected" });
      }}
    >
      Reject
    </DropdownMenuItem>
  );
};

export const ApproveApplication = ({
  row,
}: {
  row: { original: Application };
}) => {
  const { _id, name } = row.original;
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationKey: ["applications", _id],
    mutationFn: putMutationForApplication,
    onSuccess: () => {
      queryClient.invalidateQueries();
      toast({
        title: "Success",
        description: `${name} has been approved`,
      });
    },
  });

  return (
    <DropdownMenuItem
      onClick={() => {
        mutate({ ...row.original, status: "pending" });
      }}
    >
      Approve
    </DropdownMenuItem>
  );
};

export const ViewApplication = ({
  row,
}: {
  row: { original: Application };
}) => {
  const { _id } = row.original;
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const handleView = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("id", _id);
    router.replace(pathname + "?" + params.toString(), { scroll: false });
  };

  return <DropdownMenuItem onClick={handleView}>View</DropdownMenuItem>;
};

export const DeleteApplication = ({
  row,
}: {
  row: { original: Application };
}) => {
  const { _id, name } = row.original;
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationKey: ["applications", _id],
    mutationFn: deleteMutationForApplication,
    onSuccess: () => {
      queryClient.invalidateQueries();
      toast({
        title: "Success",
        description: `Application for ${name} has been deleted`,
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to delete application for ${name}: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  return (
    <DropdownMenuItem
      onClick={() => {
        mutate(_id);
      }}
      className="text-red-500"
    >
      Delete
    </DropdownMenuItem>
  );
};
