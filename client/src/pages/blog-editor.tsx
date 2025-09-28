import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Link, useParams, useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { 
  ArrowLeft, Save, Eye, Globe, Clock, 
  CheckCircle, AlertCircle, FileText 
} from "lucide-react";
import { apiRequest } from "@/lib/queryClient";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  authorId: string;
  published: boolean;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

const blogPostSchema = z.object({
  title: z.string().min(1, "Title is required").max(200, "Title must be less than 200 characters"),
  slug: z.string().min(1, "Slug is required").max(100, "Slug must be less than 100 characters")
    .regex(/^[a-z0-9-]+$/, "Slug can only contain lowercase letters, numbers, and hyphens"),
  excerpt: z.string().min(1, "Excerpt is required").max(500, "Excerpt must be less than 500 characters"),
  content: z.string().min(1, "Content is required"),
  category: z.enum(["tax-tips", "regulatory-updates", "planning"], {
    required_error: "Please select a category",
  }),
});

type BlogPostFormData = z.infer<typeof blogPostSchema>;

const CATEGORIES = [
  { value: "tax-tips", label: "Tax Tips" },
  { value: "regulatory-updates", label: "Regulatory Updates" },
  { value: "planning", label: "Tax Planning" },
];

const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
};

export default function BlogEditor() {
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [, setLocation] = useLocation();
  const params = useParams();
  const slug = params.slug as string;
  const isEditing = !!slug;

  const [isPreviewMode, setIsPreviewMode] = useState(false);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      setLocation("/blog");
    }
  }, [isAuthenticated, setLocation]);

  // Fetch existing blog post if editing
  const { data: existingPost, isLoading } = useQuery<BlogPost>({
    queryKey: ["/api/blog", slug],
    queryFn: () => fetch(`/api/blog/${slug}`).then(res => res.json()),
    enabled: isEditing && !!slug,
  });

  const form = useForm<BlogPostFormData>({
    resolver: zodResolver(blogPostSchema),
    defaultValues: {
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      category: "tax-tips",
    },
  });

  // Populate form with existing data when editing
  useEffect(() => {
    if (existingPost) {
      form.reset({
        title: existingPost.title,
        slug: existingPost.slug,
        excerpt: existingPost.excerpt,
        content: existingPost.content,
        category: existingPost.category as any,
      });
    }
  }, [existingPost, form]);

  // Auto-generate slug from title
  const watchTitle = form.watch("title");
  useEffect(() => {
    if (watchTitle && !isEditing) {
      const newSlug = generateSlug(watchTitle);
      form.setValue("slug", newSlug);
    }
  }, [watchTitle, form, isEditing]);

  // Save draft mutation
  const saveDraftMutation = useMutation({
    mutationFn: async (data: BlogPostFormData) => {
      let response;
      if (isEditing) {
        response = await apiRequest("PATCH", `/api/blog/${existingPost?.id}`, data);
      } else {
        response = await apiRequest("POST", "/api/blog", { ...data, authorId: "56e1c1fb-0005-4689-8e99-a94bcd7bf020", published: false });
      }
      return response.json();
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["/api/blog"] });
      const post = isEditing ? existingPost : response.blogPost;
      toast({
        title: "Draft saved",
        description: "Your blog post has been saved as a draft.",
      });
      if (!isEditing) {
        setLocation(`/blog/${post.slug}/edit`);
      }
    },
    onError: (error: any) => {
      toast({
        title: "Save failed",
        description: error.message || "Failed to save the blog post.",
        variant: "destructive",
      });
    },
  });

  // Publish mutation
  const publishMutation = useMutation({
    mutationFn: async (data: BlogPostFormData) => {
      let postId = existingPost?.id;
      
      if (!isEditing) {
        // Create new post first
        const response = await apiRequest("POST", "/api/blog", { ...data, authorId: "56e1c1fb-0005-4689-8e99-a94bcd7bf020", published: false });
        const responseData = await response.json();
        postId = responseData.blogPost.id;
      } else {
        // Update existing post
        await apiRequest("PATCH", `/api/blog/${postId}`, data);
      }
      
      // Then publish it
      const publishResponse = await apiRequest("PATCH", `/api/blog/${postId}/publish`);
      return publishResponse.json();
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["/api/blog"] });
      toast({
        title: "Post published",
        description: "Your blog post has been published successfully.",
      });
      setLocation(`/blog/${response.slug}`);
    },
    onError: (error: any) => {
      toast({
        title: "Publish failed",
        description: error.message || "Failed to publish the blog post.",
        variant: "destructive",
      });
    },
  });

  const onSaveDraft = (data: BlogPostFormData) => {
    saveDraftMutation.mutate(data);
  };

  const onPublish = (data: BlogPostFormData) => {
    publishMutation.mutate(data);
  };

  if (!isAuthenticated) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background" data-testid="page-blog-editor-loading">
        <Navbar />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-muted rounded w-1/3"></div>
            <div className="h-12 bg-muted rounded"></div>
            <div className="h-32 bg-muted rounded"></div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background" data-testid="page-blog-editor">
      <Navbar />
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link href="/blog">
              <Button variant="outline" data-testid="button-back-to-blog">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Blog
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-foreground" data-testid="text-editor-title">
                {isEditing ? "Edit Post" : "Create New Post"}
              </h1>
              {existingPost && (
                <div className="flex items-center space-x-2 mt-1">
                  {existingPost.published ? (
                    <Badge variant="default" className="bg-green-500">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Published
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="text-orange-600 border-orange-200">
                      <Clock className="h-3 w-3 mr-1" />
                      Draft
                    </Badge>
                  )}
                </div>
              )}
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              onClick={() => setIsPreviewMode(!isPreviewMode)}
              data-testid="button-toggle-preview"
            >
              <Eye className="h-4 w-4 mr-2" />
              {isPreviewMode ? "Edit" : "Preview"}
            </Button>
          </div>
        </div>

        {isPreviewMode ? (
          /* Preview Mode */
          <Card data-testid="preview-mode">
            <CardHeader>
              <div className="flex items-center space-x-2 mb-2">
                <Badge variant="secondary">
                  {CATEGORIES.find(cat => cat.value === form.watch("category"))?.label}
                </Badge>
                <Badge variant="outline" className="text-orange-600 border-orange-200">
                  Preview Mode
                </Badge>
              </div>
              <CardTitle className="text-3xl">{form.watch("title") || "Untitled"}</CardTitle>
              <CardDescription className="text-lg">{form.watch("excerpt")}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="prose prose-lg max-w-none">
                <div dangerouslySetInnerHTML={{ __html: form.watch("content") || "<p>No content yet...</p>" }} />
              </div>
            </CardContent>
          </Card>
        ) : (
          /* Edit Mode */
          <Form {...form}>
            <form className="space-y-8">
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                  <Card data-testid="card-post-content">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <FileText className="h-5 w-5 mr-2" />
                        Post Content
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Enter post title..." 
                                {...field} 
                                data-testid="input-title"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="slug"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>URL Slug</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="url-friendly-slug" 
                                {...field} 
                                data-testid="input-slug"
                              />
                            </FormControl>
                            <FormDescription>
                              This will be used in the URL: /blog/{field.value || "your-slug"}
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="excerpt"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Excerpt</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Brief description of the post..." 
                                className="min-h-[100px]"
                                {...field} 
                                data-testid="textarea-excerpt"
                              />
                            </FormControl>
                            <FormDescription>
                              A short summary that appears in the blog listing and social shares.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="content"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Content</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Write your blog post content here..." 
                                className="min-h-[400px] font-mono text-sm"
                                {...field} 
                                data-testid="textarea-content"
                              />
                            </FormControl>
                            <FormDescription>
                              You can use HTML tags for formatting. For better editing experience, consider using a markdown editor.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                  </Card>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  <Card data-testid="card-post-settings">
                    <CardHeader>
                      <CardTitle>Post Settings</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Category</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger data-testid="select-category">
                                  <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {CATEGORIES.map((category) => (
                                  <SelectItem key={category.value} value={category.value}>
                                    {category.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Separator />

                      <div className="space-y-3">
                        <h4 className="font-medium">Publishing Actions</h4>
                        <div className="space-y-2">
                          <Button
                            type="button"
                            variant="outline"
                            className="w-full justify-start"
                            onClick={form.handleSubmit(onSaveDraft)}
                            disabled={saveDraftMutation.isPending}
                            data-testid="button-save-draft"
                          >
                            {saveDraftMutation.isPending ? (
                              <>
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
                                Saving...
                              </>
                            ) : (
                              <>
                                <Save className="h-4 w-4 mr-2" />
                                Save Draft
                              </>
                            )}
                          </Button>
                          
                          <Button
                            type="button"
                            className="w-full justify-start"
                            onClick={form.handleSubmit(onPublish)}
                            disabled={publishMutation.isPending}
                            data-testid="button-publish"
                          >
                            {publishMutation.isPending ? (
                              <>
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
                                Publishing...
                              </>
                            ) : (
                              <>
                                <Globe className="h-4 w-4 mr-2" />
                                Publish Post
                              </>
                            )}
                          </Button>
                        </div>
                      </div>

                      {form.formState.errors && Object.keys(form.formState.errors).length > 0 && (
                        <>
                          <Separator />
                          <div className="space-y-2">
                            <div className="flex items-center text-destructive">
                              <AlertCircle className="h-4 w-4 mr-2" />
                              <span className="font-medium">Form Errors</span>
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Please fix the errors above before publishing.
                            </div>
                          </div>
                        </>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </form>
          </Form>
        )}
      </div>

      <Footer />
    </div>
  );
}