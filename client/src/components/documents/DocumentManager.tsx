import { useState, useCallback } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { 
  Upload, FileText, Eye, Download, Trash2, CheckCircle, 
  Clock, AlertCircle, FileImage, FileSpreadsheet, 
  FileCode, File, X 
} from "lucide-react";
import { format } from "date-fns";
import { apiRequest } from "@/lib/queryClient";

interface Document {
  id: string;
  clientEmail: string;
  fileName: string;
  fileUrl: string;
  fileSize: number;
  documentType: string;
  status: string;
  uploadedAt: string;
}

interface UploadProgress {
  progress: number;
  fileName: string;
}

const DOCUMENT_TYPES = [
  { value: "w2", label: "W-2 Form" },
  { value: "1099", label: "1099 Form" },
  { value: "receipt", label: "Receipt/Expense" },
  { value: "bank_statement", label: "Bank Statement" },
  { value: "tax_return", label: "Previous Tax Return" },
  { value: "other", label: "Other Document" },
];

const getFileIcon = (fileName: string) => {
  const extension = fileName.split('.').pop()?.toLowerCase();
  switch (extension) {
    case 'pdf':
      return <FileText className="h-5 w-5 text-red-500" />;
    case 'jpg':
    case 'jpeg':
    case 'png':
    case 'gif':
      return <FileImage className="h-5 w-5 text-blue-500" />;
    case 'xlsx':
    case 'xls':
    case 'csv':
      return <FileSpreadsheet className="h-5 w-5 text-green-500" />;
    case 'docx':
    case 'doc':
      return <FileCode className="h-5 w-5 text-blue-600" />;
    default:
      return <File className="h-5 w-5 text-gray-500" />;
  }
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'uploaded':
      return <Badge variant="secondary" className="flex items-center"><Clock className="h-3 w-3 mr-1" />Uploaded</Badge>;
    case 'processing':
      return <Badge variant="default" className="flex items-center"><AlertCircle className="h-3 w-3 mr-1" />Processing</Badge>;
    case 'reviewed':
      return <Badge variant="default" className="bg-green-500 hover:bg-green-600 flex items-center"><CheckCircle className="h-3 w-3 mr-1" />Reviewed</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

const formatFileSize = (bytes: number) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export default function DocumentManager() {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedType, setSelectedType] = useState<string>("");
  const [uploadProgress, setUploadProgress] = useState<UploadProgress | null>(null);

  // Fetch user documents
  const { data: documents = [], isLoading } = useQuery<Document[]>({
    queryKey: ["/api/documents"],
    enabled: !!user,
  });

  // Upload mutation
  const uploadMutation = useMutation({
    mutationFn: async ({ file, documentType }: { file: File; documentType: string }) => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('documentType', documentType);

      // Simulate upload progress
      setUploadProgress({ progress: 0, fileName: file.name });

      const uploadInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (!prev || prev.progress >= 90) {
            clearInterval(uploadInterval);
            return prev;
          }
          return { ...prev, progress: prev.progress + 10 };
        });
      }, 100);

      const response = await fetch('/api/documents', {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });

      clearInterval(uploadInterval);
      setUploadProgress(prev => prev ? { ...prev, progress: 100 } : null);

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Upload failed');
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/documents"] });
      setSelectedFile(null);
      setSelectedType("");
      setTimeout(() => setUploadProgress(null), 1000);
      toast({
        title: "Upload successful",
        description: "Your document has been uploaded successfully.",
      });
    },
    onError: (error: Error) => {
      setUploadProgress(null);
      toast({
        title: "Upload failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleFileSelect = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        toast({
          title: "File too large",
          description: "Please select a file smaller than 10MB.",
          variant: "destructive",
        });
        return;
      }
      setSelectedFile(file);
    }
  }, [toast]);

  const handleUpload = useCallback(() => {
    if (!selectedFile || !selectedType) {
      toast({
        title: "Missing information",
        description: "Please select a file and document type.",
        variant: "destructive",
      });
      return;
    }

    uploadMutation.mutate({ file: selectedFile, documentType: selectedType });
  }, [selectedFile, selectedType, uploadMutation, toast]);

  const clearSelection = useCallback(() => {
    setSelectedFile(null);
    setSelectedType("");
  }, []);

  const handleDownload = useCallback(async (document: Document) => {
    try {
      const response = await fetch(document.fileUrl, {
        credentials: 'include',
      });
      
      if (!response.ok) {
        throw new Error('Download failed');
      }
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = window.document.createElement('a');
      link.href = url;
      link.download = document.fileName;
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      toast({
        title: "Download failed",
        description: "Unable to download the document. Please try again.",
        variant: "destructive",
      });
    }
  }, [toast]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8" data-testid="documents-loading">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        <span className="ml-2">Loading documents...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6" data-testid="document-manager">
      {/* Upload Section */}
      <Card data-testid="card-document-upload">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Upload className="h-5 w-5 mr-2" />
            Upload Documents
          </CardTitle>
          <CardDescription>
            Upload your tax documents, receipts, and other important files. Maximum file size: 10MB.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {uploadProgress && (
            <div className="space-y-2" data-testid="upload-progress">
              <div className="flex items-center justify-between text-sm">
                <span>Uploading: {uploadProgress.fileName}</span>
                <span>{uploadProgress.progress}%</span>
              </div>
              <Progress value={uploadProgress.progress} className="h-2" />
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="file-upload">Select File</Label>
              <div className="relative">
                <Input
                  id="file-upload"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx,.xls,.xlsx"
                  onChange={handleFileSelect}
                  disabled={uploadMutation.isPending}
                  data-testid="input-file-upload"
                />
                {selectedFile && (
                  <div className="flex items-center justify-between mt-2 p-2 bg-muted rounded">
                    <div className="flex items-center space-x-2">
                      {getFileIcon(selectedFile.name)}
                      <span className="text-sm font-medium">{selectedFile.name}</span>
                      <span className="text-xs text-muted-foreground">
                        ({formatFileSize(selectedFile.size)})
                      </span>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={clearSelection}
                      disabled={uploadMutation.isPending}
                      data-testid="button-clear-selection"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Document Type</Label>
              <Select value={selectedType} onValueChange={setSelectedType} disabled={uploadMutation.isPending}>
                <SelectTrigger data-testid="select-document-type">
                  <SelectValue placeholder="Select document type" />
                </SelectTrigger>
                <SelectContent>
                  {DOCUMENT_TYPES.map(type => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-end">
            <Button
              onClick={handleUpload}
              disabled={!selectedFile || !selectedType || uploadMutation.isPending}
              className="flex items-center"
              data-testid="button-upload-document"
            >
              {uploadMutation.isPending ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Document
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Documents List */}
      <Card data-testid="card-documents-list">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center">
              <FileText className="h-5 w-5 mr-2" />
              Your Documents
            </span>
            <Badge variant="outline" data-testid="badge-document-count">
              {documents.length} {documents.length === 1 ? 'document' : 'documents'}
            </Badge>
          </CardTitle>
          <CardDescription>
            Manage your uploaded tax documents and track their processing status
          </CardDescription>
        </CardHeader>
        <CardContent>
          {documents.length === 0 ? (
            <div className="text-center py-12" data-testid="empty-documents">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No documents yet</h3>
              <p className="text-muted-foreground mb-4">
                Upload your first document to get started with your tax preparation
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {documents.map((document) => (
                <div
                  key={document.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                  data-testid={`document-item-${document.id}`}
                >
                  <div className="flex items-center space-x-4 flex-1">
                    {getFileIcon(document.fileName)}
                    <div className="flex-1">
                      <h4 className="font-medium" data-testid={`document-name-${document.id}`}>
                        {document.fileName}
                      </h4>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                        <span>{DOCUMENT_TYPES.find(t => t.value === document.documentType)?.label || document.documentType}</span>
                        <span>{formatFileSize(document.fileSize)}</span>
                        <span>Uploaded {format(new Date(document.uploadedAt), 'MMM d, yyyy')}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStatusBadge(document.status)}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => window.open(document.fileUrl, '_blank')}
                      data-testid={`button-view-${document.id}`}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDownload(document)}
                      data-testid={`button-download-${document.id}`}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}