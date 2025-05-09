
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

interface ScriptGenerationProps {
  onComplete: (script: string) => void;
  onBack: () => void;
}

const ScriptGeneration = ({ onComplete, onBack }: ScriptGenerationProps) => {
  const [activeTab, setActiveTab] = useState("generate");
  const [isGenerating, setIsGenerating] = useState(false);
  const [theme, setTheme] = useState("");
  const [keywords, setKeywords] = useState("");
  const [scriptStyle, setScriptStyle] = useState("product");
  const [scriptLength, setScriptLength] = useState("medium");
  const [generatedScript, setGeneratedScript] = useState("");
  const [customScript, setCustomScript] = useState("");
  const { toast } = useToast();

  const scriptStyleOptions = [
    { value: "product", label: "產品介紹" },
    { value: "tutorial", label: "教學說明" },
    { value: "funny", label: "趣味吐槽" },
    { value: "formal", label: "正式演講" },
    { value: "casual", label: "日常對話" },
  ];

  const scriptLengthOptions = [
    { value: "short", label: "簡短 (約 15 秒)" },
    { value: "medium", label: "中等 (約 30 秒)" },
    { value: "long", label: "較長 (約 45-60 秒)" },
  ];

  const handleGenerateScript = () => {
    if (!theme) {
      toast({
        variant: "destructive",
        title: "錯誤",
        description: "請輸入影片主題",
      });
      return;
    }

    setIsGenerating(true);
    
    // Simulate API call to LLM
    setTimeout(() => {
      const mockScripts = {
        product: {
          short: "隆重推出全新升級版 Ultra X 相機，超強夜景模式，讓你在黑暗中也能拍出明亮清晰的照片，快來體驗吧！",
          medium: "各位攝影愛好者注意了！隆重推出全新升級版 Ultra X 相機，搭載業界領先的 5000 萬像素感光元件，超強夜景模式讓你在黑暗中也能拍出明亮清晰的照片。輕巧機身配上長效電池，出遊整天不斷電，絕對是你旅行拍攝的最佳夥伴！立即前往官網了解更多資訊，限時優惠進行中。",
          long: "各位攝影愛好者注意了！今天我要隆重推出期待已久的全新升級版 Ultra X 相機。這款相機搭載了業界領先的 5000 萬像素感光元件，能夠捕捉到肉眼難以察覺的細節。特別值得一提的是它的超強夜景模式，革命性的演算法讓你在黑暗中也能拍出明亮清晰的照片，再也不用擔心光線不足的問題。輕巧的機身設計僅重 320 克，配上長效電池，出遊整天不斷電。防水防塵的特性讓你在各種極端環境下都能放心使用。現在購買還贈送專業收納包和高級保護鏡，絕對是你旅行拍攝的最佳夥伴！立即前往官網了解更多資訊，限時優惠進行中，錯過就要等明年了！",
        },
        tutorial: {
          short: "今天教大家如何使用 Ultra X 相機的夜景模式，只要按下這個按鈕，再調整一下光圈，就能拍出超美的夜景照片！",
          medium: "大家好，今天教大家如何使用 Ultra X 相機的夜景模式。首先，進入相機設定選單，找到場景模式並選擇「夜景」。接著調整 ISO 至 1600 以下避免雜訊，再將光圈開到最大，最後記得使用三腳架保持穩定。按下快門前，啟用 3 秒延時功能避免手震，這樣就能拍出超美的夜景照片了！",
          long: "嗨，攝影愛好者們！今天我要教大家如何使用 Ultra X 相機的夜景模式拍攝出令人驚艷的夜景照片。很多人覺得夜拍很難，但掌握了幾個簡單技巧，就能輕鬆拍出專業級作品。首先，進入相機設定選單，找到場景模式並選擇「夜景」選項。接著重點來了，調整 ISO 感光度，建議控制在 800-1600 之間，這樣可以提高感光度但又不會產生過多雜訊。第三步是將光圈開到最大，一般是 F1.8 或 F2.0，讓更多光線進入。為了避免手震造成模糊，一定要使用三腳架來保持相機穩定。另外，善用相機的延時拍攝功能，設置 3-5 秒延遲，這樣按下快門後不會因為手部動作導致晃動。最後別忘了轉到手動對焦模式，對焦到無限遠處以捕捉整個場景。如果拍攝城市夜景，試著在「藍色時刻」拍攝，也就是日落後 20-30 分鐘，天空呈現深藍色時，這時光線平衡最美。按照這些步驟，相信大家很快就能拍出驚艷朋友圈的夜景照片了！",
        },
        funny: {
          short: "看看我的新相機，超厲害的啦！不過說真的，價格嚇死人，只好吃泡麵一個月了，但為了美照，值得！",
          medium: "看看我的新相機，Ultra X，聽說很厲害，但說實話，我連說明書都看不懂！買回來第一天，我就按錯鍵把全部設定重置了，然後不小心把我家貓拍成了外星生物。這價格嚇死人，買完只好吃泡麵一個月了，但為了美照，犧牲一下胃也值得！誰說當攝影師容易，我的錢包已經哭暈在廁所了。",
          long: "各位觀眾朋友，我要向大家介紹我的新玩具——Ultra X 相機，聽說很厲害，但說實話，我連說明書都看不懂！買回來第一天，我就按錯鍵把全部設定重置了，然後不小心把我家貓拍成了外星生物，牠現在看到我拿相機就躲起來，深受心理創傷。業務說這相機可以拍星空，結果我在陽台對著天空按了半天，只拍到樓上鄰居晾的內褲，還被誤會是變態偷拍。最誇張的是這價格，買完我整個月只能吃泡麵了，朋友聚餐我都只能喝水看他們吃，說自己在「輕斷食」。不過為了美照，犧牲一下胃口和銀行存款也值得！我現在出門都把相機掛在脖子上，雖然啥也不會拍，但至少看起來很專業嘛。誰說當攝影師容易，我的錢包已經哭暈在廁所，正在考慮是否要賣腎升級鏡頭，畢竟人有兩個腎，但 Ultra X 的限量版鏡頭可是絕版啊！",
        },
      };

      // Get script based on selected style and length
      const selectedStyle = scriptStyle as keyof typeof mockScripts;
      const selectedLength = scriptLength as keyof typeof mockScripts[typeof selectedStyle];
      
      // Combine with user theme and keywords
      let script = mockScripts[selectedStyle][selectedLength];
      
      if (theme) {
        script = script.replace(/Ultra X 相機/g, theme);
      }
      
      setGeneratedScript(script);
      setIsGenerating(false);
      
      toast({
        title: "生成成功",
        description: "AI 文案已生成，您可以進行編輯或直接使用",
      });
    }, 2000);
  };

  const handleComplete = () => {
    const finalScript = activeTab === "generate" ? generatedScript : customScript;
    
    if (!finalScript.trim()) {
      toast({
        variant: "destructive",
        title: "錯誤",
        description: "文案內容不能為空",
      });
      return;
    }
    
    onComplete(finalScript);
  };

  return (
    <Card className="w-full max-w-3xl mx-auto animate-fade-in">
      <CardHeader>
        <CardTitle>文案生成</CardTitle>
        <CardDescription>
          生成 AI 文案或自行編寫文案
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full mb-6">
            <TabsTrigger value="generate" className="flex-1">AI 生成文案</TabsTrigger>
            <TabsTrigger value="custom" className="flex-1">自行編寫</TabsTrigger>
          </TabsList>
          
          <TabsContent value="generate" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="theme">影片主題 *</Label>
                <Input
                  id="theme"
                  placeholder="例：新款手機介紹、旅遊景點推薦"
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="keywords">關鍵字（選填）</Label>
                <Input
                  id="keywords"
                  placeholder="例：高性能、優惠價格、限時特價"
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="style">文案風格</Label>
                <Select value={scriptStyle} onValueChange={setScriptStyle}>
                  <SelectTrigger>
                    <SelectValue placeholder="選擇風格" />
                  </SelectTrigger>
                  <SelectContent>
                    {scriptStyleOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="length">文案長度</Label>
                <Select value={scriptLength} onValueChange={setScriptLength}>
                  <SelectTrigger>
                    <SelectValue placeholder="選擇長度" />
                  </SelectTrigger>
                  <SelectContent>
                    {scriptLengthOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-center">
              <Button
                onClick={handleGenerateScript}
                disabled={isGenerating || !theme}
                className="bg-gradient-studio hover:opacity-90 transition-opacity"
              >
                {isGenerating ? "生成中..." : "生成 AI 文案"}
              </Button>
            </div>

            {generatedScript && (
              <div className="space-y-2">
                <Label htmlFor="generated-script">生成結果（可編輯）</Label>
                <Textarea
                  id="generated-script"
                  value={generatedScript}
                  onChange={(e) => setGeneratedScript(e.target.value)}
                  className="min-h-[150px]"
                />
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="custom">
            <div className="space-y-2">
              <Label htmlFor="custom-script">自訂文案</Label>
              <Textarea
                id="custom-script"
                placeholder="在此輸入您的文案內容..."
                value={customScript}
                onChange={(e) => setCustomScript(e.target.value)}
                className="min-h-[200px]"
              />
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          返回
        </Button>
        <Button
          onClick={handleComplete}
          disabled={(activeTab === "generate" && !generatedScript) || (activeTab === "custom" && !customScript)}
          className="bg-gradient-studio hover:opacity-90 transition-opacity"
        >
          下一步
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ScriptGeneration;
