import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Database, Plus, Trash2 } from "lucide-react";

interface Dataset {
  id: string;
  title: string;
  description: string;
  category: string;
  provider: string;
  size: string;
  format: string;
  price: number;
  downloads: number;
  rating: number;
  created_at: string;
}

const Staff = () => {
  const { signOut } = useAuth();
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const [loading, setLoading] = useState(false);
  
  // Form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [provider, setProvider] = useState("");
  const [size, setSize] = useState("");
  const [format, setFormat] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    fetchDatasets();
  }, []);

  const fetchDatasets = async () => {
    try {
      const { data, error } = await supabase
        .from("ev_datasets")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setDatasets(data || []);
    } catch (error) {
      console.error("Error fetching datasets:", error);
      toast.error("Không thể tải danh sách datasets");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !category) {
      toast.error("Vui lòng điền đầy đủ thông tin bắt buộc");
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase
        .from("ev_datasets")
        .insert({
          title,
          description,
          category,
          provider,
          size,
          format,
          price: parseFloat(price) || 0,
        });

      if (error) throw error;

      toast.success("Đã thêm dataset thành công!");
      
      // Reset form
      setTitle("");
      setDescription("");
      setCategory("");
      setProvider("");
      setSize("");
      setFormat("");
      setPrice("");
      
      // Refresh list
      fetchDatasets();
    } catch (error) {
      console.error("Error adding dataset:", error);
      toast.error("Có lỗi xảy ra khi thêm dataset");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from("ev_datasets")
        .delete()
        .eq("id", id);

      if (error) throw error;

      toast.success("Đã xóa dataset!");
      fetchDatasets();
    } catch (error) {
      console.error("Error deleting dataset:", error);
      toast.error("Không thể xóa dataset");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-3">
              <Database className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-4xl font-bold">Staff Dashboard</h1>
                <p className="text-muted-foreground">Quản lý dữ liệu xe điện</p>
              </div>
            </div>
            <Button onClick={signOut} variant="outline">
              Đăng xuất
            </Button>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Thêm Dataset Mới
              </CardTitle>
              <CardDescription>
                Thêm dữ liệu mới về xe điện vào hệ thống
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="grid gap-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="title">Tiêu đề *</Label>
                    <Input
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="VD: Dữ liệu Sạc EV Toàn Cầu"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="category">Danh mục *</Label>
                    <Select value={category} onValueChange={setCategory} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn danh mục" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Charging Infrastructure">Cơ sở hạ tầng sạc</SelectItem>
                        <SelectItem value="Battery Technology">Công nghệ pin</SelectItem>
                        <SelectItem value="Market Analysis">Phân tích thị trường</SelectItem>
                        <SelectItem value="Vehicle Performance">Hiệu suất xe</SelectItem>
                        <SelectItem value="Environmental Impact">Tác động môi trường</SelectItem>
                        <SelectItem value="Policy & Regulations">Chính sách</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="description">Mô tả</Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Mô tả chi tiết về dataset..."
                    rows={3}
                  />
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="provider">Nhà cung cấp</Label>
                    <Input
                      id="provider"
                      value={provider}
                      onChange={(e) => setProvider(e.target.value)}
                      placeholder="VD: Tesla Research"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="size">Kích thước</Label>
                    <Input
                      id="size"
                      value={size}
                      onChange={(e) => setSize(e.target.value)}
                      placeholder="VD: 250 MB"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="format">Định dạng</Label>
                    <Input
                      id="format"
                      value={format}
                      onChange={(e) => setFormat(e.target.value)}
                      placeholder="VD: CSV, JSON"
                    />
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="price">Giá (USD)</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="0.00"
                  />
                </div>

                <Button type="submit" disabled={loading} className="w-full md:w-auto">
                  {loading ? "Đang xử lý..." : "Thêm Dataset"}
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Danh Sách Datasets</CardTitle>
              <CardDescription>
                Tất cả datasets trong hệ thống ({datasets.length})
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {datasets.map((dataset) => (
                  <div
                    key={dataset.id}
                    className="flex items-start justify-between p-4 border rounded-lg hover:bg-accent transition-colors"
                  >
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">{dataset.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{dataset.description}</p>
                      <div className="flex flex-wrap gap-2 text-xs">
                        <span className="px-2 py-1 bg-primary/10 rounded">{dataset.category}</span>
                        {dataset.size && <span className="px-2 py-1 bg-muted rounded">{dataset.size}</span>}
                        {dataset.format && <span className="px-2 py-1 bg-muted rounded">{dataset.format}</span>}
                        {dataset.price > 0 && <span className="px-2 py-1 bg-green-100 text-green-700 rounded">${dataset.price}</span>}
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(dataset.id)}
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                {datasets.length === 0 && (
                  <p className="text-center text-muted-foreground py-8">
                    Chưa có dataset nào. Hãy thêm dataset đầu tiên!
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Staff;
