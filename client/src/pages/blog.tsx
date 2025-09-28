import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "wouter";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BookOpen, Calendar, User, Search, Filter, 
  Plus, Edit, Eye, Trash2, CheckCircle 
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

const CATEGORIES = [
  { value: "all", label: "All Categories", color: "default" },
  { value: "tax-tips", label: "Tax Tips", color: "blue" },
  { value: "regulatory-updates", label: "Regulatory Updates", color: "orange" },
  { value: "planning", label: "Tax Planning", color: "green" },
];

const getCategoryInfo = (category: string) => {
  return CATEGORIES.find(cat => cat.value === category) || CATEGORIES[0];
};

export default function Blog() {
  const { isAuthenticated } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showDrafts, setShowDrafts] = useState(false);

  // Fetch published blog posts for public view
  const { data: publishedPosts = [], isLoading: publishedLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog", { published: true }],
    queryFn: () => fetch("/api/blog?published=true").then(res => res.json()),
  });

  // Fetch all blog posts for admin view (if authenticated)
  const { data: allPosts = [], isLoading: allLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog"],
    enabled: isAuthenticated,
  });

  const posts = showDrafts ? allPosts : publishedPosts;
  const isLoading = showDrafts ? allLoading : publishedLoading;

  // Filter posts based on search and category
  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "MMM d, yyyy");
  };

  const truncateContent = (content: string, maxLength: number = 150) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + "...";
  };

  return (
    <div className="min-h-screen bg-background" data-testid="page-blog">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4" data-testid="text-blog-title">
            Tax Insights & Updates
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="text-blog-description">
            Stay informed with the latest tax tips, regulatory updates, and planning strategies 
            from our experienced tax professionals.
          </p>
        </div>

        {/* Admin Controls */}
        {isAuthenticated && (
          <div className="mb-8 p-4 bg-muted/50 rounded-lg border" data-testid="admin-controls">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Badge variant="outline" className="flex items-center">
                  <User className="h-3 w-3 mr-1" />
                  Admin View
                </Badge>
                <Button
                  variant={showDrafts ? "default" : "outline"}
                  size="sm"
                  onClick={() => setShowDrafts(!showDrafts)}
                  data-testid="button-toggle-drafts"
                >
                  {showDrafts ? "Show Published Only" : "Show All Posts"}
                </Button>
              </div>
              <Link href="/blog/create">
                <Button className="flex items-center" data-testid="button-create-post">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Post
                </Button>
              </Link>
            </div>
          </div>
        )}

        {/* Search and Filter Controls */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
                data-testid="input-search"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
                <TabsList>
                  {CATEGORIES.map((category) => (
                    <TabsTrigger key={category.value} value={category.value} data-testid={`tab-${category.value}`}>
                      {category.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>
          </div>
        </div>

        {/* Posts Grid */}
        {isLoading ? (
          <div className="flex items-center justify-center py-12" data-testid="blog-loading">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <span className="ml-2">Loading articles...</span>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="text-center py-12" data-testid="blog-empty">
            <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">
              {searchTerm || selectedCategory !== "all" ? "No articles found" : "No articles yet"}
            </h3>
            <p className="text-muted-foreground">
              {searchTerm || selectedCategory !== "all" 
                ? "Try adjusting your search or filter criteria" 
                : "Check back soon for tax insights and updates"
              }
            </p>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
            {filteredPosts.map((post) => {
              const categoryInfo = getCategoryInfo(post.category);
              return (
                <Card key={post.id} className="group hover:shadow-lg transition-shadow duration-300" data-testid={`blog-post-${post.id}`}>
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary" className={`bg-${categoryInfo.color}-100 text-${categoryInfo.color}-800`}>
                        {categoryInfo.label}
                      </Badge>
                      {!post.published && (
                        <Badge variant="outline" className="text-orange-600 border-orange-200">
                          Draft
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="group-hover:text-primary transition-colors">
                      <Link href={`/blog/${post.slug}`} data-testid={`link-post-${post.id}`}>
                        {post.title}
                      </Link>
                    </CardTitle>
                    <CardDescription>{post.excerpt}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {post.published && post.publishedAt 
                          ? formatDate(post.publishedAt)
                          : formatDate(post.createdAt)
                        }
                      </div>
                      {post.published && (
                        <div className="flex items-center">
                          <CheckCircle className="h-4 w-4 mr-1 text-green-500" />
                          Published
                        </div>
                      )}
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-4">
                      {truncateContent(post.content.replace(/<[^>]*>/g, ''))}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <Link href={`/blog/${post.slug}`}>
                        <Button variant="outline" size="sm" data-testid={`button-read-${post.id}`}>
                          <Eye className="h-4 w-4 mr-2" />
                          Read More
                        </Button>
                      </Link>
                      
                      {isAuthenticated && (
                        <div className="flex items-center space-x-2">
                          <Link href={`/blog/${post.slug}/edit`}>
                            <Button variant="ghost" size="sm" data-testid={`button-edit-${post.id}`}>
                              <Edit className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700" data-testid={`button-delete-${post.id}`}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {/* Categories Summary */}
        <div className="mt-16 grid md:grid-cols-3 gap-6">
          {CATEGORIES.slice(1).map((category) => {
            const categoryPosts = publishedPosts.filter(post => post.category === category.value);
            return (
              <Card key={category.value} className="text-center" data-testid={`category-summary-${category.value}`}>
                <CardHeader>
                  <CardTitle className="text-lg">{category.label}</CardTitle>
                  <CardDescription>
                    {categoryPosts.length} {categoryPosts.length === 1 ? 'article' : 'articles'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    variant="outline"
                    onClick={() => setSelectedCategory(category.value)}
                    data-testid={`button-view-category-${category.value}`}
                  >
                    View Articles
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      <Footer />
    </div>
  );
}