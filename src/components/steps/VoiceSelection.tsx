
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";

interface VoiceSelectionProps {
  script: string;
  onComplete: (voiceId: string, voiceName: string, voiceSpeed: number) => void;
  onBack: () => void;
}

const VoiceSelection = ({ script, onComplete, onBack }: VoiceSelectionProps) => {
  const [selectedVoice, setSelectedVoice] = useState<string | null>(null);
  const [voiceSpeed, setVoiceSpeed] = useState(1);
  const [isPlaying, setIsPlaying] = useState<string | null>(null);
  const { toast } = useToast();
  
  // Mock voice data
  const voices = [
    { id: "voice1", name: "女聲 - 小美", gender: "female", sample: "/sample1.wav" },
    { id: "voice2", name: "女聲 - 小雲", gender: "female", sample: "/sample2.wav" },
    { id: "voice3", name: "男聲 - 大偉", gender: "male", sample: "/sample3.wav" },
    { id: "voice4", name: "男聲 - 小剛", gender: "male", sample: "/sample4.wav" },
  ];
  
  const playVoiceSample = (voiceId: string) => {
    // Mock playing a sample
    if (isPlaying === voiceId) {
      setIsPlaying(null);
      return;
    }
    
    setIsPlaying(voiceId);
    
    // Simulate audio playback finishing after 3 seconds
    setTimeout(() => {
      if (isPlaying === voiceId) {
        setIsPlaying(null);
      }
    }, 3000);
  };
  
  const handleContinue = () => {
    if (!selectedVoice) {
      toast({
        variant: "destructive",
        title: "錯誤",
        description: "請選擇一種語音聲音",
      });
      return;
    }

    const selectedVoiceObj = voices.find(voice => voice.id === selectedVoice);
    
    if (selectedVoiceObj) {
      onComplete(selectedVoice, selectedVoiceObj.name, voiceSpeed);
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto animate-fade-in">
      <CardHeader>
        <CardTitle>選擇語音</CardTitle>
        <CardDescription>
          為您的文案選擇合適的 AI 語音
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="p-4 bg-gray-50 border rounded-md">
          <h3 className="font-medium mb-2">文案預覽</h3>
          <p className="text-sm text-gray-700">
            {script}
          </p>
        </div>
        
        <div className="space-y-4">
          <h3 className="font-medium">選擇聲音</h3>
          <RadioGroup value={selectedVoice || ""} onValueChange={setSelectedVoice}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {voices.map((voice) => (
                <div 
                  key={voice.id} 
                  className={`flex items-center space-x-2 p-4 border rounded-md cursor-pointer hover:border-studio-purple/50 ${selectedVoice === voice.id ? 'border-studio-purple bg-studio-purple/5' : ''}`}
                  onClick={() => setSelectedVoice(voice.id)}
                >
                  <RadioGroupItem value={voice.id} id={voice.id} className="text-studio-purple" />
                  <div className="flex-1">
                    <Label htmlFor={voice.id} className="cursor-pointer">{voice.name}</Label>
                    <p className="text-xs text-gray-500">
                      {voice.gender === "female" ? "女聲" : "男聲"}
                    </p>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="text-xs"
                    onClick={(e) => {
                      e.stopPropagation();
                      playVoiceSample(voice.id);
                    }}
                  >
                    {isPlaying === voice.id ? "停止" : "試聽"}
                  </Button>
                </div>
              ))}
            </div>
          </RadioGroup>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">語音速度</h3>
            <span className="text-sm text-gray-500">
              {voiceSpeed < 1 ? "較慢" : voiceSpeed > 1 ? "較快" : "正常"}
              {' '}({voiceSpeed.toFixed(1)}x)
            </span>
          </div>
          <Slider
            value={[voiceSpeed]}
            min={0.5}
            max={1.5}
            step={0.1}
            onValueChange={(value) => setVoiceSpeed(value[0])}
            className="w-full"
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          返回
        </Button>
        <Button
          onClick={handleContinue}
          disabled={!selectedVoice}
          className="bg-gradient-studio hover:opacity-90 transition-opacity"
        >
          下一步
        </Button>
      </CardFooter>
    </Card>
  );
};

export default VoiceSelection;
