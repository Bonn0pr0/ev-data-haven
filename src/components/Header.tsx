import { Button } from "@/components/ui/button";
import { Search, User, Menu, BarChart3 } from "lucide-react";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="p-2 bg-gradient-primary rounded-lg">
            <BarChart3 className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            EV Analytics
          </span>
        </div>
        
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#" className="text-foreground hover:text-primary transition-colors">
            Thị Trường
          </a>
          <a href="#" className="text-foreground hover:text-primary transition-colors">
            Phân Tích
          </a>
          <a href="#" className="text-foreground hover:text-primary transition-colors">
            API
          </a>
          <a href="#" className="text-foreground hover:text-primary transition-colors">
            Tài Liệu
          </a>
        </nav>
        
        <div className="flex items-center space-x-4">
          <div className="hidden sm:flex items-center bg-muted rounded-lg px-3 py-2 max-w-xs">
            <Search className="h-4 w-4 text-muted-foreground mr-2" />
            <input 
              type="text" 
              placeholder="Tìm kiếm dữ liệu..." 
              className="bg-transparent text-sm outline-none flex-1"
            />
          </div>
          <Button variant="ghost" size="sm" className="hidden sm:flex">
            <User className="h-4 w-4 mr-2" />
            Đăng Nhập
          </Button>
          <Button size="sm" className="bg-gradient-primary hover:opacity-90">
            Bắt Đầu
          </Button>
          <Button variant="ghost" size="sm" className="md:hidden">
            <Menu className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;