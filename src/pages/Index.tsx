import { Header } from "@/components/Header";
import { StatsGrid } from "@/components/StatsGrid";
import { QuickStats } from "@/components/QuickStats";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Droplets, Flame, Package, Calendar } from "lucide-react";

const Index = () => {
  // Dados de exemplo - você pode conectar isso ao seu Firebase
  const aguaData = {
    total: 1250,
    pendente: 180,
    entregue: 1070,
  };

  const gasData = {
    total: 850,
    pendente: 95,
    entregue: 755,
  };

  const materiaisData = {
    total: 3420,
  };

  const quickStats = [
    { label: "Água Pendente", value: aguaData.pendente, unit: "galões", trend: "up" as const },
    { label: "Gás Pendente", value: gasData.pendente, unit: "botijões", trend: "down" as const },
    { label: "Entregas Hoje", value: 45, trend: "up" as const },
    { label: "Estoque Baixo", value: 12, unit: "itens", trend: "neutral" as const },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-6 md:py-8 lg:py-10">
        {/* Título da Página */}
        <div className="mb-6 md:mb-8">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-2">
            Dashboard de Controle
          </h2>
          <div className="flex items-center gap-2 text-sm md:text-base text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>{new Date().toLocaleDateString("pt-BR", { 
              weekday: "long", 
              year: "numeric", 
              month: "long", 
              day: "numeric" 
            })}</span>
          </div>
        </div>

        {/* Cards de Estatísticas Principais */}
        <div className="mb-6 md:mb-8">
          <StatsGrid agua={aguaData} gas={gasData} materiais={materiaisData} />
        </div>

        {/* Estatísticas Rápidas */}
        <div className="mb-6 md:mb-8">
          <QuickStats stats={quickStats} />
        </div>

        {/* Seção de Gráficos/Informações Adicionais */}
        <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
          {/* Card de Água */}
          <Card className="animate-fade-in">
            <CardHeader className="bg-gradient-to-r from-semcas-blue to-semcas-teal">
              <CardTitle className="flex items-center gap-2 text-white">
                <Droplets className="h-5 w-5" />
                Detalhes - Água
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-3 border-b">
                  <span className="text-sm font-medium text-muted-foreground">Total de Galões</span>
                  <span className="text-xl font-bold text-foreground">{aguaData.total}</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b">
                  <span className="text-sm font-medium text-muted-foreground">Pendentes</span>
                  <span className="text-xl font-bold text-yellow-600">{aguaData.pendente}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-muted-foreground">Entregues</span>
                  <span className="text-xl font-bold text-secondary">{aguaData.entregue}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Card de Gás */}
          <Card className="animate-fade-in">
            <CardHeader className="bg-gradient-to-r from-semcas-green to-semcas-lime">
              <CardTitle className="flex items-center gap-2 text-white">
                <Flame className="h-5 w-5" />
                Detalhes - Gás
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-3 border-b">
                  <span className="text-sm font-medium text-muted-foreground">Total de Botijões</span>
                  <span className="text-xl font-bold text-foreground">{gasData.total}</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b">
                  <span className="text-sm font-medium text-muted-foreground">Pendentes</span>
                  <span className="text-xl font-bold text-yellow-600">{gasData.pendente}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-muted-foreground">Entregues</span>
                  <span className="text-xl font-bold text-secondary">{gasData.entregue}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Card de Materiais */}
          <Card className="animate-fade-in lg:col-span-2">
            <CardHeader className="bg-gradient-to-r from-semcas-yellow to-semcas-green">
              <CardTitle className="flex items-center gap-2 text-white">
                <Package className="h-5 w-5" />
                Resumo - Materiais
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-2">Total de Itens</p>
                  <p className="text-3xl font-bold text-foreground">{materiaisData.total}</p>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-2">Categorias</p>
                  <p className="text-3xl font-bold text-foreground">24</p>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-2">Em Estoque</p>
                  <p className="text-3xl font-bold text-secondary">3,180</p>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-2">Estoque Baixo</p>
                  <p className="text-3xl font-bold text-destructive">12</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer Info */}
        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>Sistema de Controle de Almoxarifado - SEMCAS</p>
          <p className="mt-1">Prefeitura de São Luís</p>
        </div>
      </main>
    </div>
  );
};

export default Index;
