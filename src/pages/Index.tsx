import { useState } from "react";
import { Header } from "@/components/Header";
import { Navigation } from "@/components/Navigation";
import { DashboardNav } from "@/components/DashboardNav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Droplets, Flame, Package, X } from "lucide-react";

type Tab = "dashboard" | "agua" | "gas" | "materiais" | "gestao" | "relatorio";
type DashboardView = "geral" | "agua" | "gas" | "materiais";

const Index = () => {
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");
  const [dashboardView, setDashboardView] = useState<DashboardView>("geral");

  // Dados de exemplo
  const estoqueAgua = 150;
  const estoqueGas = 85;
  const separacaoCount = 12;
  const retiradaCount = 8;

  const aguaStats = {
    pendente: 180,
    entregue: 1070,
    recebido: 890,
  };

  const gasStats = {
    pendente: 95,
    entregue: 755,
    recebido: 660,
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Sub-header com informações */}
      <div className="bg-white shadow-sm border-b border-slate-200">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="bg-primary text-primary-foreground p-3 rounded-lg hidden sm:block">
                <Package className="h-6 w-6" />
              </div>
              <div>
                <h2 className="font-bold text-lg text-slate-800">Sistema de Almoxarifado</h2>
                <p className="text-sm text-slate-500 mt-1">v.1.2 by Jurandy Santana</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 bg-secondary rounded-full animate-pulse-slow"></div>
                <span className="text-muted-foreground">Conectado</span>
              </div>
              <p className="text-slate-500">Última atualização: há 2 min</p>
            </div>
          </div>
        </div>
      </div>

      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        {/* Conteúdo do Dashboard */}
        {activeTab === "dashboard" && (
          <div className="animate-fade-in">
            <div className="flex justify-between items-start mb-6 flex-wrap gap-4">
              <div>
                <h3 className="text-2xl font-bold text-slate-800">Visão Geral do Almoxarifado</h3>
                <p className="text-sm text-slate-500 mt-1">A página atualiza automaticamente a cada 2 minutos.</p>
              </div>
              <DashboardNav activeView={dashboardView} onViewChange={setDashboardView} />
            </div>

            {/* Visão Geral */}
            {dashboardView === "geral" && (
              <div className="space-y-6">
                {/* Cards principais */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-3 bg-semcas-blue">
                      <CardTitle className="flex items-center gap-2 text-sm font-medium text-white">
                        <Droplets className="h-5 w-5" />
                        Estoque de Água
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6 text-center">
                      <p className="text-4xl font-bold text-semcas-blue">{estoqueAgua}</p>
                      <p className="text-sm text-muted-foreground mt-2">Galões Disponíveis</p>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-3 bg-semcas-teal">
                      <CardTitle className="flex items-center gap-2 text-sm font-medium text-white">
                        <Flame className="h-5 w-5" />
                        Estoque de Gás
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6 text-center">
                      <p className="text-4xl font-bold text-orange-600">{estoqueGas}</p>
                      <p className="text-sm text-muted-foreground mt-2">Botijões Disponíveis</p>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-lg transition-shadow cursor-pointer hover:scale-105 transform duration-200">
                    <CardHeader className="pb-3 bg-semcas-yellow">
                      <CardTitle className="flex items-center gap-2 text-sm font-medium text-white">
                        <Package className="h-5 w-5" />
                        Em Separação
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6 text-center">
                      <p className="text-4xl font-bold text-yellow-600">{separacaoCount}</p>
                      <p className="text-sm text-muted-foreground mt-2">Registros pendentes</p>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-lg transition-shadow cursor-pointer hover:scale-105 transform duration-200">
                    <CardHeader className="pb-3 bg-semcas-green">
                      <CardTitle className="flex items-center gap-2 text-sm font-medium text-white">
                        <Package className="h-5 w-5" />
                        Disponível p/ Retirada
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6 text-center">
                      <p className="text-4xl font-bold text-green-600">{retiradaCount}</p>
                      <p className="text-sm text-muted-foreground mt-2">Registros prontos</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Lista de Materiais */}
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg font-semibold text-slate-800">
                        Materiais do Almoxarifado
                      </CardTitle>
                      <Button variant="outline" size="sm" className="hidden">
                        <X className="w-4 h-4 mr-1" />
                        Limpar Filtro
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                      {/* Exemplo de cards de materiais */}
                      {[1, 2, 3, 4, 5].map((item) => (
                        <Card key={item} className="bg-muted/30 hover:bg-muted/50 cursor-pointer transition-colors">
                          <CardContent className="p-4 text-center">
                            <div className="h-16 flex items-center justify-center mb-2">
                              <Package className="h-10 w-10 text-primary" />
                            </div>
                            <p className="font-semibold text-sm">Material {item}</p>
                            <p className="text-xs text-muted-foreground mt-1">Qtd: {Math.floor(Math.random() * 50) + 10}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Visão de Água */}
            {dashboardView === "agua" && (
              <div className="space-y-6 animate-fade-in">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <Card>
                    <CardContent className="pt-6 text-center">
                      <h3 className="font-semibold text-slate-800 mb-2">Total Pendente (Saldo)</h3>
                      <p className="text-4xl font-bold text-red-600">{aguaStats.pendente}</p>
                      <p className="text-sm text-muted-foreground mt-2">Galões com as unidades</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6 text-center">
                      <h3 className="font-semibold text-slate-800 mb-2">Entregues (Últimos 30 dias)</h3>
                      <p className="text-4xl font-bold text-semcas-blue">{aguaStats.entregue}</p>
                      <p className="text-sm text-muted-foreground mt-2">Galões cheios</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6 text-center">
                      <h3 className="font-semibold text-slate-800 mb-2">Recebidos (Últimos 30 dias)</h3>
                      <p className="text-4xl font-bold text-secondary">{aguaStats.recebido}</p>
                      <p className="text-sm text-muted-foreground mt-2">Galões vazios</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {/* Visão de Gás */}
            {dashboardView === "gas" && (
              <div className="space-y-6 animate-fade-in">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <Card>
                    <CardContent className="pt-6 text-center">
                      <h3 className="font-semibold text-slate-800 mb-2">Total Pendente (Saldo)</h3>
                      <p className="text-4xl font-bold text-red-600">{gasStats.pendente}</p>
                      <p className="text-sm text-muted-foreground mt-2">Botijões com as unidades</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6 text-center">
                      <h3 className="font-semibold text-slate-800 mb-2">Entregues (Últimos 30 dias)</h3>
                      <p className="text-4xl font-bold text-semcas-blue">{gasStats.entregue}</p>
                      <p className="text-sm text-muted-foreground mt-2">Botijões cheios</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6 text-center">
                      <h3 className="font-semibold text-slate-800 mb-2">Recebidos (Últimos 30 dias)</h3>
                      <p className="text-4xl font-bold text-secondary">{gasStats.recebido}</p>
                      <p className="text-sm text-muted-foreground mt-2">Botijões vazios</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {/* Visão de Materiais */}
            {dashboardView === "materiais" && (
              <div className="animate-fade-in">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold text-slate-800">
                      Status dos Materiais
                    </CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">Controle de materiais requisitados e em processo de entrega</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {/* Material Requisitado */}
                      <div className="p-4 bg-blue-50 rounded-lg flex justify-between items-center border border-blue-200">
                        <div className="flex items-center gap-4">
                          <div className="bg-blue-500 p-2 rounded-lg">
                            <Package className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <p className="font-semibold text-slate-800">Material Alimentação</p>
                            <p className="text-sm text-slate-600">CRAS Centro - Requisitado em {new Date().toLocaleDateString()}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="px-3 py-1 bg-blue-500 text-white rounded-full text-xs font-semibold">
                            Requisitado
                          </span>
                        </div>
                      </div>

                      {/* Material Em Separação */}
                      {[1, 2, 3].map((item) => (
                        <div key={item} className="p-4 bg-yellow-50 rounded-lg flex justify-between items-center border border-yellow-200">
                          <div className="flex items-center gap-4">
                            <div className="bg-yellow-500 p-2 rounded-lg">
                              <Package className="h-6 w-6 text-white" />
                            </div>
                            <div>
                              <p className="font-semibold text-slate-800">Material de Limpeza</p>
                              <p className="text-sm text-slate-600">CREAS {item} - Requisitado em {new Date().toLocaleDateString()}</p>
                              <p className="text-xs text-yellow-700 mt-1">Separador: João Silva</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="px-3 py-1 bg-yellow-500 text-white rounded-full text-xs font-semibold">
                              Em Separação
                            </span>
                          </div>
                        </div>
                      ))}

                      {/* Material Disponível para Retirada */}
                      {[1, 2].map((item) => (
                        <div key={item} className="p-4 bg-green-50 rounded-lg flex justify-between items-center border border-green-200">
                          <div className="flex items-center gap-4">
                            <div className="bg-green-500 p-2 rounded-lg">
                              <Package className="h-6 w-6 text-white" />
                            </div>
                            <div>
                              <p className="font-semibold text-slate-800">Material de Expediente</p>
                              <p className="text-sm text-slate-600">CRAS Sul {item} - Pronto desde {new Date().toLocaleDateString()}</p>
                              <p className="text-xs text-green-700 mt-1">Separado por: Maria Santos</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="px-3 py-1 bg-green-500 text-white rounded-full text-xs font-semibold">
                              Disponível p/ Retirada
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        )}

        {/* Outras abas */}
        {activeTab === "agua" && (
          <div className="animate-fade-in">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-2xl font-bold text-slate-800 mb-4">Controle de Água</h3>
                <p className="text-muted-foreground">Conteúdo da aba de Controle de Água será implementado aqui.</p>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "gas" && (
          <div className="animate-fade-in">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-2xl font-bold text-slate-800 mb-4">Controle de Gás</h3>
                <p className="text-muted-foreground">Conteúdo da aba de Controle de Gás será implementado aqui.</p>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "materiais" && (
          <div className="animate-fade-in">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-2xl font-bold text-slate-800 mb-4">Entrega de Materiais</h3>
                <p className="text-muted-foreground">Conteúdo da aba de Entrega de Materiais será implementado aqui.</p>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "gestao" && (
          <div className="animate-fade-in">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-2xl font-bold text-slate-800 mb-4">Gestão de Unidades</h3>
                <p className="text-muted-foreground">Conteúdo da aba de Gestão de Unidades será implementado aqui.</p>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "relatorio" && (
          <div className="animate-fade-in">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-2xl font-bold text-slate-800 mb-4">Gerar Relatório</h3>
                <p className="text-muted-foreground">Conteúdo da aba de Gerar Relatório será implementado aqui.</p>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
