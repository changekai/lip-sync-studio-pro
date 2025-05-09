
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface VideoUploadProps {
  onComplete: (videoUrl: string) => void;
}

const VideoUpload = ({ onComplete }: VideoUploadProps) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const { toast } = useToast();

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    // Check file type
    if (!["video/mp4", "video/quicktime"].includes(file.type)) {
      toast({
        variant: "destructive",
        title: "檔案格式錯誤",
        description: "請上傳 MP4 或 MOV 格式的影片檔",
      });
      return;
    }

    // Check file size (limit to ~100MB)
    if (file.size > 100 * 1024 * 1024) {
      toast({
        variant: "destructive",
        title: "檔案過大",
        description: "請上傳小於 100MB 的影片檔",
      });
      return;
    }

    // Mock upload progress
    setIsUploading(true);
    const interval = setInterval(() => {
      setUploadProgress((prevProgress) => {
        const newProgress = prevProgress + 10;
        if (newProgress >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          // Create a URL for the file
          const url = URL.createObjectURL(file);
          setVideoUrl(url);
          return 100;
        }
        return newProgress;
      });
    }, 500);
  };

  const handleContinue = () => {
    if (videoUrl) {
      onComplete(videoUrl);
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto animate-fade-in">
      <CardHeader>
        <CardTitle>上傳影片</CardTitle>
        <CardDescription>
          上傳 MP4 或 MOV 格式，建議 1 分鐘以內的短影片
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!videoUrl ? (
          <div
            className={`border-2 border-dashed rounded-lg p-12 text-center ${
              dragActive ? "border-studio-purple bg-studio-purple/5" : "border-gray-300"
            }`}
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
          >
            {isUploading ? (
              <div className="space-y-4">
                <p className="text-gray-500">上傳中...</p>
                <Progress value={uploadProgress} className="h-2 w-full" />
                <p className="text-sm text-gray-500">{uploadProgress}%</p>
              </div>
            ) : (
              <>
                <div className="flex flex-col items-center justify-center space-y-4">
                  <div className="p-4 bg-studio-purple/10 rounded-full">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-10 w-10 text-studio-purple" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor" 
                      strokeWidth={2}
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" 
                      />
                    </svg>
                  </div>
                  <p className="text-lg font-medium">拖放影片至此處，或</p>
                  <label className="cursor-pointer">
                    <span className="px-4 py-2 bg-gradient-studio text-white rounded-md hover:opacity-90 transition-opacity">
                      瀏覽檔案
                    </span>
                    <input
                      type="file"
                      className="hidden"
                      accept="video/mp4,video/quicktime"
                      onChange={handleFileChange}
                    />
                  </label>
                  <p className="text-sm text-gray-500">支援 MP4, MOV 格式，檔案大小限制 100MB</p>
                </div>
              </>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <video 
              src={videoUrl} 
              controls 
              className="w-full aspect-video rounded-lg border bg-black"
            />
            <div className="flex items-center justify-between">
              <Button 
                variant="outline"
                onClick={() => {
                  setVideoUrl(null);
                  setUploadProgress(0);
                }}
              >
                重新上傳
              </Button>
              <p className="text-sm text-gray-500">
                檔案已準備就緒
              </p>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button
          onClick={handleContinue}
          disabled={!videoUrl}
          className="bg-gradient-studio hover:opacity-90 transition-opacity"
        >
          下一步
        </Button>
      </CardFooter>
    </Card>
  );
};

export default VideoUpload;
