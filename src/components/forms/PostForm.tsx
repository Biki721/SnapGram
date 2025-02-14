import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useUserContext } from "@/context/AuthContext";
import { Textarea } from "../ui/textarea";
import Loader from "../shared/Loader";
import FileUploader from "../shared/FileUploader";
import { PostValidation } from "@/lib/validation";
import { Models } from "appwrite";
import { useCreatePost } from "@/lib/react-query/queriesAndMutations";

type PostFormProps = {
  post?: Models.Document;
  action: "Create" | "Update";
};

const PostForm = ({ post }: PostFormProps) => {
  const { mutateAsync: createPost, isPending: isLoadingCreate } =
    useCreatePost();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useUserContext();

  // 1. Define your form.
  const form = useForm<z.infer<typeof PostValidation>>({
    resolver: zodResolver(PostValidation),
    defaultValues: {
      caption: post ? post?.caption : "",
      file: [],
      location: post ? post?.location : "",
      tags: post ? post?.tags.join(",") : "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof PostValidation>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  // Query
  //   const { mutateAsync: createPost, isLoading: isLoadingCreate } =
  //     useCreatePost();
  //   const { mutateAsync: updatePost, isLoading: isLoadingUpdate } =
  //     useUpdatePost();

  //   // Handler
  //   const handleSubmit = async (value: z.infer<typeof PostValidation>) => {
  //     // ACTION = UPDATE
  //     if (post && action === "Update") {
  //       const updatedPost = await updatePost({
  //         ...value,
  //         postId: post.$id,
  //         imageId: post.imageId,
  //         imageUrl: post.imageUrl,
  //       });

  //       if (!updatedPost) {
  //         toast({
  //           title: `${action} post failed. Please try again.`,
  //         });
  //       }
  //       return navigate(`/posts/${post.$id}`);
  //     }

  //     // ACTION = CREATE
  //     const newPost = await createPost({
  //       ...value,
  //       userId: user.id,
  //     });

  //     if (!newPost) {
  //       toast({
  //         title: `${action} post failed. Please try again.`,
  //       });
  //     }
  //     navigate("/");
  //   };

  const handleSubmit = async () => {};

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col gap-9 w-full  max-w-5xl"
      >
        <FormField
          control={form.control}
          name="caption"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Caption</FormLabel>
              <FormControl>
                <Textarea
                  className="shad-textarea custom-scrollbar"
                  {...field}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Add Photos</FormLabel>
              <FormControl>
                <FileUploader
                  fieldChange={field.onChange}
                  mediaUrl={post?.imageUrl}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Add Location</FormLabel>
              <FormControl>
                <Input type="text" className="shad-input" {...field} />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">
                Add Tags (separated by comma " , ")
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Art, Expression, Learn"
                  type="text"
                  className="shad-input"
                  {...field}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        <div className="flex gap-4 items-center justify-end">
          <Button
            type="button"
            className="shad-button_dark_4"
            onClick={() => navigate(-1)}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="shad-button_primary whitespace-nowrap"
            // disabled={isLoadingCreate || isLoadingUpdate}
          >
            {/*    {(isLoadingCreate || isLoadingUpdate) && <Loader />} */}
            {/* // {action} Post */}
            Post
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PostForm;
