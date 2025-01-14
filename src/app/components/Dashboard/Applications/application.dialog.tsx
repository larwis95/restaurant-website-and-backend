import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { getApplicationById } from "@/lib/queries/applications/get.applications";
import { putMutationForApplication } from "@/lib/mutations";
import { useSearchParams, useRouter } from "next/navigation";
import titleCase from "@/lib/helpers/titleCase";
import { LoadingSpinner } from "@/components/ui/loading";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export const ApplicationDialog = ({ id }: { id: string }) => {
  const queryClient = useQueryClient();
  const { isPending, data, error } = useQuery({
    queryKey: ["application", id],
    queryFn: () => getApplicationById(id),
  });

  const { mutate } = useMutation({
    mutationKey: ["applications", id],
    mutationFn: putMutationForApplication,
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });

  useEffect(() => {
    if (data && data.status === "unread") {
      mutate({ ...data, status: "read" });
    }
  }, [data, mutate]);

  const searchParams = useSearchParams();
  const searchParamsId = searchParams.get("id");
  const router = useRouter();

  const dialogOpen = searchParamsId !== null && searchParamsId === id;

  const handleDialogClose = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("id");
    params.set("tab", "applications");
    router.push("/dashboard" + "?" + params.toString(), { scroll: false });
  };

  const renderStatus = () => {
    if (!data || error || isPending) return null;
    let baseClass =
      "transition duration-500 p-1 rounded-md w-fit text-bold border-2";
    let className = "";
    switch (data.status) {
      case "unread":
        className = cn(baseClass, "border-yellow-500 text-yellow-500");
        break;
      case "read":
        className = cn(baseClass, "border-blue-500 text-blue-500");
        break;
      case "pending":
        className = cn(baseClass, "border-green-500 text-green-500");
        break;
      case "rejected":
        className = cn(baseClass, "border-red-500 text-red-500");
        break;
    }
    return <span className={className}>{titleCase(data.status)}</span>;
  };

  const handleStatusChange = (status: "pending" | "rejected") => {
    if (!data) return;
    mutate({ ...data, status });
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={handleDialogClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            {data ? titleCase(data.name) + "'s Application" : "Loading..."}
          </DialogTitle>
          <DialogDescription>
            {data ? data.position : "Loading..."}
          </DialogDescription>
          <DialogDescription>
            {data
              ? "Application received: " +
                format(data.createdAt, "MM/dd/yyyy h:mm a")
              : "Loading..."}
          </DialogDescription>
          {renderStatus()}
          <DialogDescription>
            {isPending && <LoadingSpinner className="text-secondary" />}
            {error && "Error loading application"}
          </DialogDescription>
          <DialogClose onClick={handleDialogClose} className="float-right" />
        </DialogHeader>
        {data && !isPending && !error && (
          <div className="flex flex-col gap-2">
            <div className="flex flex-row flex-wrap gap-2 text-md">
              <h3 className="w-full text-lg font-bold">Email and Phone</h3>
              <p>
                {data.email} • {data.phone}
              </p>
            </div>
            <div className="flex flex-col">
              <h3 className="text-lg font-bold">About</h3>
              <p>{data.about}</p>
            </div>
          </div>
        )}
        <DialogFooter>
          <Button
            onClick={() => handleStatusChange("pending")}
            variant="outline"
            className="text-green-500 border-green-500 hover:bg-green-500 hover:text-white transition duration-500"
          >
            Approve
          </Button>
          <Button
            onClick={() => handleStatusChange("rejected")}
            variant="outline"
            className="text-red-500 border-red-500 hover:bg-red-500 hover:text-white transition duration-500"
          >
            Reject
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
