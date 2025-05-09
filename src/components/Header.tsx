
import { useToast } from "@/hooks/use-toast";

const Header = () => {
  const { toast } = useToast();
  
  const handleBetaClick = () => {
    toast({
      title: "Beta 版本",
      description: "感謝您使用 Lip Sync Studio Pro！目前處於測試階段，支援 1 分鐘以內的短影片。",
    });
  };

  return (
    <header className="w-full py-6 px-4 sm:px-6 lg:px-8 border-b">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold studio-gradient-text">Lip Sync Studio Pro</h1>
          <span 
            onClick={handleBetaClick}
            className="ml-2 text-xs bg-studio-purple/10 text-studio-purple px-2 py-0.5 rounded-full cursor-pointer hover:bg-studio-purple/20 transition-colors"
          >
            Beta
          </span>
        </div>
        <div>
          <button className="text-sm text-gray-600 hover:text-gray-900 mr-4">
            說明文檔
          </button>
          <button className="text-sm text-gray-600 hover:text-gray-900">
            聯繫我們
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
