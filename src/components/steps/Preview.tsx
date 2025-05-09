
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface PreviewProps {
  videoUrl: string;
  script: string;
  voiceName: string;
  onComplete: () => void;
  onBack: () => void;
}

const Preview = ({ videoUrl, script, voiceName, onComplete, onBack }: PreviewProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSubtitles, setShowSubtitles] = useState(true);
  const [mockResult, setMockResult] = useState<string | null>(null);
  const { toast } = useToast();
  
  const handleProcess = () => {
    setIsProcessing(true);
    
    // Mock processing delay
    setTimeout(() => {
      setMockResult(videoUrl); // In a real app, this would be a new processed video URL
      setIsProcessing(false);
      
      toast({
        title: "處理完成",
        description: "您的影片已成功處理，可以預覽或下載",
      });
    }, 5000);
  };
  
  const handleDownload = () => {
    // In a real app, this would trigger a download of the processed video
    toast({
      title: "下載開始",
      description: "您的影片正在下載中",
    });
  };

  return (
    <Card className="w-full max-w-3xl mx-auto animate-fade-in">
      <CardHeader>
        <CardTitle>預覽與輸出</CardTitle>
        <CardDescription>
          預覽處理結果並輸出最終影片
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="p-4 bg-gray-50 border rounded-md space-y-2">
          <div className="flex justify-between items-center">
            <h3 className="font-medium">設定摘要</h3>
          </div>
          <div className="space-y-1 text-sm">
            <p><span className="font-medium">語音：</span> {voiceName}</p>
            <div>
              <p className="font-medium mb-1">文案：</p>
              <p className="text-gray-700 text-xs">{script}</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="subtitles" 
            checked={showSubtitles} 
            onCheckedChange={(checked) => {
              if (typeof checked === 'boolean') {
                setShowSubtitles(checked);
              }
            }}
          />
          <Label htmlFor="subtitles">在影片中加入字幕</Label>
        </div>

        {!mockResult ? (
          <div className="text-center py-12 border-2 border-dashed rounded-lg">
            {isProcessing ? (
              <div className="space-y-4">
                <div className="animate-spin w-10 h-10 border-4 border-studio-purple border-t-transparent rounded-full mx-auto"></div>
                <p className="text-gray-600">影片處理中，請耐心等待...</p>
                <p className="text-xs text-gray-500">這可能需要幾分鐘時間</p>
              </div>
            ) : (
              <div>
                <p className="text-gray-600 mb-4">點擊下方按鈕開始處理影片</p>
                <Button 
                  onClick={handleProcess}
                  className="bg-gradient-studio hover:opacity-90 transition-opacity"
                >
                  開始處理
                </Button>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <video 
              src={mockResult} 
              controls 
              className="w-full aspect-video rounded-lg border bg-black"
            />
            <div className="flex justify-center">
              <Button 
                onClick={handleDownload}
                className="bg-gradient-studio hover:opacity-90 transition-opacity"
              >
                下載影片
              </Button>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          返回
        </Button>
        <Button
          onClick={onComplete}
          disabled={!mockResult}
          variant="outline"
        >
          完成
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Preview;
