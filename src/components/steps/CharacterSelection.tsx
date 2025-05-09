
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface CharacterSelectionProps {
  videoUrl: string;
  onComplete: (faceData: { x: number; y: number; width: number; height: number }) => void;
  onBack: () => void;
}

const CharacterSelection = ({ videoUrl, onComplete, onBack }: CharacterSelectionProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedFace, setSelectedFace] = useState<{ x: number; y: number; width: number; height: number } | null>(null);
  const { toast } = useToast();

  // Mock face detection data
  const mockFaces = [
    { x: 200, y: 100, width: 120, height: 120 },
    { x: 400, y: 150, width: 100, height: 100 },
  ];

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.addEventListener('loadedmetadata', drawFaces);
    }
    
    return () => {
      if (videoRef.current) {
        videoRef.current.removeEventListener('loadedmetadata', drawFaces);
      }
    };
  }, []);

  const drawFaces = () => {
    if (canvasRef.current && videoRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      // Set canvas dimensions to match video
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw video frame
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      // Draw face rectangles
      mockFaces.forEach((face, index) => {
        ctx.strokeStyle = selectedFace && 
                          face.x === selectedFace.x && 
                          face.y === selectedFace.y ? 
                          '#8B5CF6' : '#3B82F6';
        ctx.lineWidth = 3;
        ctx.strokeRect(face.x, face.y, face.width, face.height);
        
        // Number label
        ctx.fillStyle = selectedFace && 
                        face.x === selectedFace.x && 
                        face.y === selectedFace.y ? 
                        '#8B5CF6' : '#3B82F6';
        ctx.font = '20px Arial';
        ctx.fillText(`${index + 1}`, face.x - 10, face.y - 10);
      });
    }
  };
  
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;
    
    // Check if click is inside any face rectangle
    for (const face of mockFaces) {
      if (
        x >= face.x && 
        x <= face.x + face.width && 
        y >= face.y && 
        y <= face.y + face.height
      ) {
        setSelectedFace(face);
        break;
      }
    }
    
    // Redraw faces with selection
    drawFaces();
  };

  const handleContinue = () => {
    if (selectedFace) {
      toast({
        title: "已選擇角色",
        description: "成功鎖定影片中的角色",
      });
      onComplete(selectedFace);
    } else {
      toast({
        variant: "destructive",
        title: "未選擇角色",
        description: "請點擊選擇一個影片中的角色",
      });
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto animate-fade-in">
      <CardHeader>
        <CardTitle>選擇角色</CardTitle>
        <CardDescription>
          點擊選擇需要進行 AI 對嘴的人物
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative">
          <video 
            ref={videoRef}
            src={videoUrl} 
            controls 
            className="w-full aspect-video rounded-lg bg-black"
          />
          <canvas 
            ref={canvasRef}
            onClick={handleCanvasClick}
            className="absolute top-0 left-0 w-full h-full cursor-crosshair" 
          />
        </div>
        <div className="p-4 bg-blue-50 border border-blue-100 rounded-md">
          <h3 className="font-medium text-blue-800">使用說明</h3>
          <ul className="text-sm text-blue-700 list-disc pl-5 mt-2">
            <li>上方影片中標記了自動檢測到的人臉</li>
            <li>點擊臉部框選區域來選擇要進行 AI 對嘴的角色</li>
            <li>選定的角色會以紫色標記</li>
            <li>確認選好角色後，點擊「下一步」繼續</li>
          </ul>
        </div>
        {selectedFace && (
          <div className="text-center py-2 px-4 bg-studio-purple/10 text-studio-purple rounded-md">
            已選擇角色
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          返回
        </Button>
        <Button
          onClick={handleContinue}
          disabled={!selectedFace}
          className="bg-gradient-studio hover:opacity-90 transition-opacity"
        >
          下一步
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CharacterSelection;
