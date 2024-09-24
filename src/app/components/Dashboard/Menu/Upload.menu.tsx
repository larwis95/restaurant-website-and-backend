import { Button } from "@/components/ui/button";
import { postImageMutation } from "@/app/libs/upload/post.upload";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";

const UploadMenu: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const uploadImage = useMutation({
    mutationFn: async (file: File) => await postImageMutation(file),
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Image uploaded successfully",
      });
    },
  });

  const handleUpload = () => {
    if (!file) {
      return;
    }
    uploadImage.mutate(file);
  };

  return (
    <div className="flex flex-row flex-wrap xl:w-3/4 lg:w-3/4 md:w-full sm:w-full justify-end gap-5">
      <Input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="w-1/2"
      />
      <Button variant="outline" onClick={handleUpload}>
        Upload Image
      </Button>
    </div>
  );
};

export default UploadMenu;
