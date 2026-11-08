'use client';

import { useState } from 'react';
import { Upload, Loader2, FileImage, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import Image from 'next/image';
import { apiClient } from '@/lib/api/client';

interface MediaUploadProps {
  onUploadComplete?: (url: string, id: string) => void;
  disabled?: boolean;
}

interface UploadedFile {
  url: string;
  id: string;
}

export function MediaUpload({ onUploadComplete, disabled = false }: MediaUploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null);

  const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
  const MAX_SIZE = 5 * 1024 * 1024; // 5MB

  const handleFileSelect = (file: File) => {
    if (!ALLOWED_TYPES.includes(file.type)) {
      setError('Invalid file type. Only JPEG, PNG, WebP, and GIF images are allowed.');
      return;
    }

    if (file.size > MAX_SIZE) {
      setError('File too large. Maximum size is 5MB.');
      return;
    }

    setError(null);
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setUploadedFile(null);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setIsUploading(true);
    setError(null);
    setUploadProgress(0);

    try {
      // Simulate progress (real upload doesn't support progress easily with fetch)
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => Math.min(prev + 10, 90));
      }, 100);

      const formData = new FormData();
      formData.append('file', selectedFile);

      const response = await apiClient.uploadMedia(formData) as any;

      clearInterval(progressInterval);
      setUploadProgress(100);

      const uploadedUrl = response.data?.url || response.url;
      const uploadedId = response.data?.id || response.id;

      if (uploadedUrl) {
        setUploadedFile({ url: uploadedUrl, id: uploadedId });
        onUploadComplete?.(uploadedUrl, uploadedId);
      }
    } catch (err: any) {
      setError(err.message || 'Upload failed');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Media Upload</CardTitle>
        <CardDescription>
          Upload images for your blog posts (JPG, PNG, WebP, GIF - max 5MB)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div
          className="border-2 border-dashed rounded-lg p-6 text-center hover:border-primary transition-colors"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
          <p className="text-sm text-muted-foreground mb-2">
            Drag and drop an image here, or{' '}
            <button
              type="button"
              className="font-medium text-primary hover:underline"
              onClick={() => document.getElementById('file-input')?.click()}
              disabled={disabled}
            >
              browse
            </button>
          </p>
          <input
            id="file-input"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFileSelect(file);
            }}
            disabled={disabled}
          />
          <p className="text-xs text-muted-foreground">
            Supported formats: JPG, PNG, WebP, GIF (max 5MB)
          </p>
        </div>

        {previewUrl && (
          <div className="space-y-2">
            <p className="text-sm font-medium">Preview:</p>
            <div className="relative aspect-video rounded-md overflow-hidden">
              <Image
                src={previewUrl}
                alt="Preview"
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          </div>
        )}

        <div className="flex gap-2">
          <Button
            onClick={handleUpload}
            disabled={isUploading || !selectedFile || disabled}
            className="flex-1"
          >
            {isUploading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                Upload
              </>
            )}
          </Button>
        </div>

        {isUploading && (
          <div className="space-y-2">
            <Progress value={uploadProgress} className="w-full" />
            <p className="text-xs text-muted-foreground">
              {uploadProgress < 90 ? 'Uploading...' : 'Finalizing...'}
            </p>
          </div>
        )}

        {uploadedFile && (
          <Alert className="border-green-200 bg-green-50">
            <FileImage className="h-4 w-4 text-green-600" />
            <AlertDescription>
              <div className="font-medium">Upload successful!</div>
              <div className="text-sm mt-1">
                URL: <a href={uploadedFile.url} target="_blank" rel="noopener noreferrer" className="underline">{uploadedFile.url}</a>
              </div>
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}