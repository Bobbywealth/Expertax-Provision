import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { Link, useParams } from "wouter";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Calendar, User, ArrowLeft, Edit, Share2, 
  BookmarkPlus, Clock, CheckCircle 
} from "lucide-react";
import { format } from "date-fns";

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

const CATEGORIES = {
  "tax-tips": { label: "Tax Tips", color: "blue" },
  "regulatory-updates": { label: "Regulatory Updates", color: "orange" },
  "planning": { label: "Tax Planning", color: "green" },
};

export default function BlogPost() {
  const { isAuthenticated } = useAuth();
  const params = useParams();
  const slug = params.slug as string;

  const { data: post, isLoading, error } = useQuery<BlogPost>({
    queryKey: ["/api/blog", slug],
    queryFn: () => fetch(`/api/blog/${slug}`).then(res => {
      if (!res.ok) throw new Error('Post not found');
      return res.json();
    }),
    enabled: !!slug,
  });

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "MMMM d, yyyy 'at' h:mm a");
  };

  const getCategoryInfo = (category: string) => {
    return CATEGORIES[category as keyof typeof CATEGORIES] || { label: category, color: "gray" };
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background" data-testid="page-blog-post-loading">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-muted rounded w-3/4"></div>
            <div className="h-4 bg-muted rounded w-1/2"></div>
            <div className="space-y-3">
              <div className="h-4 bg-muted rounded"></div>
              <div className="h-4 bg-muted rounded w-5/6"></div>
              <div className="h-4 bg-muted rounded w-4/6"></div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-background" data-testid="page-blog-post-error">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Article Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The article you're looking for doesn't exist or has been removed.
            </p>
            <Link href="/blog">
              <Button data-testid="button-back-to-blog">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Blog
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Don't show unpublished posts to non-authenticated users
  if (!post.published && !isAuthenticated) {
    return (
      <div className="min-h-screen bg-background" data-testid="page-blog-post-unpublished">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Article Not Available</h1>
            <p className="text-muted-foreground mb-6">
              This article is not yet published or is no longer available.
            </p>
            <Link href="/blog">
              <Button data-testid="button-back-to-blog-unpublished">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Blog
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const categoryInfo = getCategoryInfo(post.category);

  return (
    <div className="min-h-screen bg-background" data-testid="page-blog-post">
      <Navbar />
      
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <Link href="/blog">
              <Button variant="outline" data-testid="button-back-to-blog">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Blog
              </Button>
            </Link>
            
            {isAuthenticated && (
              <div className="flex items-center space-x-2">
                {!post.published && (
                  <Badge variant="outline" className="text-orange-600 border-orange-200" data-testid="badge-draft">
                    <Clock className="h-3 w-3 mr-1" />
                    Draft
                  </Badge>
                )}
                <Link href={`/blog/${post.slug}/edit`}>
                  <Button variant="outline" size="sm" data-testid="button-edit-post">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                </Link>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className={`bg-${categoryInfo.color}-100 text-${categoryInfo.color}-800`} data-testid="badge-category">
                {categoryInfo.label}
              </Badge>
              {post.published && (
                <div className="flex items-center text-green-600" data-testid="status-published">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Published
                </div>
              )}
            </div>
            
            <h1 className="text-4xl font-bold text-foreground leading-tight" data-testid="text-post-title">
              {post.title}
            </h1>
            
            <p className="text-xl text-muted-foreground" data-testid="text-post-excerpt">
              {post.excerpt}
            </p>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center" data-testid="post-date">
                  <Calendar className="h-4 w-4 mr-1" />
                  {post.published && post.publishedAt 
                    ? formatDate(post.publishedAt)
                    : `Created ${formatDate(post.createdAt)}`
                  }
                </div>
                {post.updatedAt !== post.createdAt && (
                  <div className="flex items-center" data-testid="post-updated">
                    <Clock className="h-4 w-4 mr-1" />
                    Updated {formatDate(post.updatedAt)}
                  </div>
                )}
              </div>
              
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" data-testid="button-share">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
                <Button variant="outline" size="sm" data-testid="button-bookmark">
                  <BookmarkPlus className="h-4 w-4 mr-2" />
                  Save
                </Button>
              </div>
            </div>
          </div>
        </header>

        <Separator className="mb-8" />

        {/* Content */}
        <div className="prose prose-lg max-w-none" data-testid="post-content">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>

        <Separator className="my-8" />

        {/* Footer */}
        <footer className="space-y-6">
          <div className="bg-muted/50 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-2">Need Tax Help?</h3>
            <p className="text-muted-foreground mb-4">
              Our experienced tax professionals are here to help you navigate complex tax situations 
              and maximize your savings.
            </p>
            <div className="flex space-x-4">
              <Link href="/appointments">
                <Button data-testid="button-schedule-consultation">
                  Schedule Consultation
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" data-testid="button-contact-us">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="text-center">
            <Link href="/blog">
              <Button variant="outline" data-testid="button-more-articles">
                View More Articles
              </Button>
            </Link>
          </div>
        </footer>
      </article>

      <Footer />
    </div>
  );
}