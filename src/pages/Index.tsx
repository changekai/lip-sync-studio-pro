
import { useState } from "react";
import Header from "@/components/Header";
import StepIndicator from "@/components/StepIndicator";
import VideoUpload from "@/components/steps/VideoUpload";
import CharacterSelection from "@/components/steps/CharacterSelection";
import ScriptGeneration from "@/components/steps/ScriptGeneration";
import VoiceSelection from "@/components/steps/VoiceSelection";
import Preview from "@/components/steps/Preview";

const STEPS = [
  { id: 1, title: "上傳影片" },
  { id: 2, title: "選擇角色" },
  { id: 3, title: "文案生成" },
  { id: 4, title: "選擇語音" },
  { id: 5, title: "預覽與輸出" }
];

const Index = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [selectedFace, setSelectedFace] = useState<{ x: number; y: number; width: number; height: number } | null>(null);
  const [script, setScript] = useState("");
  const [voiceId, setVoiceId] = useState("");
  const [voiceName, setVoiceName] = useState("");
  const [voiceSpeed, setVoiceSpeed] = useState(1);
  
  const handleVideoUpload = (url: string) => {
    setVideoUrl(url);
    setCurrentStep(2);
  };
  
  const handleCharacterSelect = (faceData: { x: number; y: number; width: number; height: number }) => {
    setSelectedFace(faceData);
    setCurrentStep(3);
  };
  
  const handleScriptGeneration = (generatedScript: string) => {
    setScript(generatedScript);
    setCurrentStep(4);
  };
  
  const handleVoiceSelect = (id: string, name: string, speed: number) => {
    setVoiceId(id);
    setVoiceName(name);
    setVoiceSpeed(speed);
    setCurrentStep(5);
  };
  
  const handleComplete = () => {
    // Reset all states to start again
    setCurrentStep(1);
    setVideoUrl(null);
    setSelectedFace(null);
    setScript("");
    setVoiceId("");
    setVoiceName("");
    setVoiceSpeed(1);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <StepIndicator currentStep={currentStep} steps={STEPS} />
        
        <div className="mt-8">
          {currentStep === 1 && (
            <VideoUpload onComplete={handleVideoUpload} />
          )}
          
          {currentStep === 2 && videoUrl && (
            <CharacterSelection 
              videoUrl={videoUrl}
              onComplete={handleCharacterSelect}
              onBack={() => setCurrentStep(1)}
            />
          )}
          
          {currentStep === 3 && (
            <ScriptGeneration 
              onComplete={handleScriptGeneration}
              onBack={() => setCurrentStep(2)}
            />
          )}
          
          {currentStep === 4 && (
            <VoiceSelection 
              script={script}
              onComplete={handleVoiceSelect}
              onBack={() => setCurrentStep(3)}
            />
          )}
          
          {currentStep === 5 && videoUrl && (
            <Preview 
              videoUrl={videoUrl}
              script={script}
              voiceName={voiceName}
              onComplete={handleComplete}
              onBack={() => setCurrentStep(4)}
            />
          )}
        </div>
      </main>
      
      <footer className="py-6 px-4 sm:px-6 lg:px-8 border-t">
        <div className="text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Lip Sync Studio Pro - 這是一個 MVP 版本
        </div>
      </footer>
    </div>
  );
};

export default Index;
