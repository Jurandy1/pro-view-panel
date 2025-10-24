import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Flame, Trash2 } from "lucide-react";

const ControleGas = () => {
  const [activeTab, setActiveTab] = useState<"movimentacao" | "entrada" | "previsao">("movimentacao");
  const [activeFormTab, setActiveFormTab] = useState<"saida" | "entrada">("saida");
  const [formData, setFormData] = useState({
    unidade: "",
    tipo: "troca",
    qtdEntregue: 0,
    qtdRetorno: 0,
    data: "",
    responsavel: "",
  });
  const [entradaFormData, setEntradaFormData] = useState({
    quantidade: 0,
    data: "",
    responsavel: "",
    notaFiscal: "",
  });

  const unidades = [
    { id: "1", nome: "CRAS Centro", tipo: "CRAS" },
    { id: "2", nome: "CREAS Sul", tipo: "CREAS" },
    { id: "3", nome: "Abrigo Norte", tipo: "ABRIGO" },
  ];

  const statusGas = [
    { unidade: "CRAS Centro", tipo: "CRAS", entregues: 25, recebidos: 22, saldo: 3 },
    { unidade: "CREAS Sul", tipo: "CREAS", entregues: 18, recebidos: 16, saldo: 2 },
    { unidade: "Abrigo Norte", tipo: "ABRIGO", entregues: 15, recebidos: 13, saldo: 2 },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Dados do formulário:", formData);
  };

  const handleEntradaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Dados da entrada:", entradaFormData);
  };

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex flex-wrap gap-2 mb-6">
        <Button 
          variant={activeTab === "movimentacao" ? "default" : "outline"}
          onClick={() => setActiveTab("movimentacao")}
        >
          Lançamentos / Status
        </Button>
        <Button 
          variant={activeTab === "entrada" ? "default" : "outline"}
          onClick={() => setActiveTab("entrada")}
        >
          Entrada de Estoque
        </Button>
        <Button 
          variant={activeTab === "previsao" ? "default" : "outline"}
          onClick={() => setActiveTab("previsao")}
        >
          Previsão
        </Button>
      </div>

      {activeTab === "movimentacao" && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Card de Estoque */}
          <Card className="lg:col-span-1 bg-orange-50 border-orange-200">
            <CardHeader>
              <CardTitle className="text-orange-800 flex items-center gap-2">
                <Flame className="h-5 w-5" />
                Estoque de Gás
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-sm">
                <li className="flex justify-between items-center">
                  <span className="text-slate-600">Estoque Inicial:</span>
                  <strong className="text-lg">100</strong>
                </li>
                <li className="flex justify-between items-center">
                  <span className="text-slate-600">Total de Entradas:</span>
                  <strong className="text-lg text-green-600">+85</strong>
                </li>
                <li className="flex justify-between items-center">
                  <span className="text-slate-600">Total de Saídas:</span>
                  <strong className="text-lg text-red-600">-100</strong>
                </li>
                <li className="flex justify-between items-center text-lg font-bold border-t pt-2 mt-2 border-orange-200">
                  <span className="text-orange-900">Disponível:</span>
                  <strong className="text-2xl text-orange-900">85</strong>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Formulário de Movimentação */}
          <Card className="lg:col-span-1">
            <CardHeader className="border-b">
              <div className="flex gap-2">
                <Button 
                  variant={activeFormTab === "saida" ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setActiveFormTab("saida")}
                >
                  🔥 Saída (Unidades)
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="unidade">Unidade (Apenas habilitadas)</Label>
                <Select
                  value={formData.unidade}
                  onValueChange={(value) =>
                    setFormData({ ...formData, unidade: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a unidade" />
                  </SelectTrigger>
                  <SelectContent>
                    {unidades.map((unidade) => (
                      <SelectItem key={unidade.id} value={unidade.id}>
                        {unidade.nome} ({unidade.tipo})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="tipo">Tipo de Movimentação</Label>
                <Select
                  value={formData.tipo}
                  onValueChange={(value) =>
                    setFormData({ ...formData, tipo: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="troca">Troca (Entregar Cheio / Receber Vazio)</SelectItem>
                    <SelectItem value="entrega">Apenas Saída (Entregar Cheio)</SelectItem>
                    <SelectItem value="retorno">Apenas Retorno (Receber Vazio)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="qtdEntregue">Qtd. Entregue (Cheio)</Label>
                <Input
                  id="qtdEntregue"
                  type="number"
                  min="0"
                  value={formData.qtdEntregue}
                  onChange={(e) =>
                    setFormData({ ...formData, qtdEntregue: parseInt(e.target.value) })
                  }
                />
              </div>

              <div>
                <Label htmlFor="qtdRetorno">Qtd. Recebida (Vazio)</Label>
                <Input
                  id="qtdRetorno"
                  type="number"
                  min="0"
                  value={formData.qtdRetorno}
                  onChange={(e) =>
                    setFormData({ ...formData, qtdRetorno: parseInt(e.target.value) })
                  }
                />
              </div>

              <div>
                <Label htmlFor="data">Data</Label>
                <Input
                  id="data"
                  type="date"
                  value={formData.data}
                  onChange={(e) =>
                    setFormData({ ...formData, data: e.target.value })
                  }
                />
              </div>

              <div>
                <Label htmlFor="responsavel">Responsável (Unidade)</Label>
                <Input
                  id="responsavel"
                  placeholder="Nome de quem recebeu/entregou"
                  value={formData.responsavel}
                  onChange={(e) =>
                    setFormData({ ...formData, responsavel: e.target.value })
                  }
                />
              </div>

              <Button type="submit" className="w-full">
                Salvar Movimentação
              </Button>
              </form>
            </CardContent>
          </Card>

          {/* Tabela de Status */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Status de Botijões (Saldo nas Unidades)</CardTitle>
            <p className="text-sm text-muted-foreground">
              Lista de unidades e saldo de botijões. Passe o mouse na linha para ver o último responsável.
            </p>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <Label htmlFor="busca" className="text-xs">Buscar Unidade:</Label>
              <Input
                id="busca"
                placeholder="Digite o nome da unidade..."
                className="py-1 px-2 text-sm"
              />
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Unidade</th>
                    <th className="text-left p-2">Tipo</th>
                    <th className="text-left p-2">Entregues</th>
                    <th className="text-left p-2">Recebidos</th>
                    <th className="text-left p-2">Saldo (Vazios)</th>
                    <th className="text-center p-2">Ação</th>
                  </tr>
                </thead>
                <tbody>
                  {statusGas.map((item, index) => (
                    <tr key={index} className="border-b hover:bg-muted/50">
                      <td className="p-2 font-medium">{item.unidade}</td>
                      <td className="p-2">
                        <span className="px-2 py-1 bg-semcas-teal/20 text-semcas-teal rounded text-xs">
                          {item.tipo}
                        </span>
                      </td>
                      <td className="p-2 text-green-600 font-semibold">{item.entregues}</td>
                      <td className="p-2 text-orange-600 font-semibold">{item.recebidos}</td>
                      <td className="p-2">
                        <span className={`font-bold ${item.saldo > 2 ? 'text-red-600' : 'text-slate-600'}`}>
                          {item.saldo}
                        </span>
                      </td>
                      <td className="p-2 text-center">
                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === "entrada" && (
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Entrada de Estoque de Gás</CardTitle>
            <p className="text-sm text-muted-foreground">
              Registre compras ou recebimentos de botijões de gás no almoxarifado
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleEntradaSubmit} className="space-y-4">
              <div>
                <Label htmlFor="quantidadeEntrada">Quantidade de Botijões</Label>
                <Input
                  id="quantidadeEntrada"
                  type="number"
                  min="1"
                  placeholder="Ex: 30"
                  value={entradaFormData.quantidade || ""}
                  onChange={(e) =>
                    setEntradaFormData({ ...entradaFormData, quantidade: parseInt(e.target.value) })
                  }
                />
              </div>

              <div>
                <Label htmlFor="dataEntrada">Data da Entrada</Label>
                <Input
                  id="dataEntrada"
                  type="date"
                  value={entradaFormData.data}
                  onChange={(e) =>
                    setEntradaFormData({ ...entradaFormData, data: e.target.value })
                  }
                />
              </div>

              <div>
                <Label htmlFor="responsavelEntrada">Responsável pelo Recebimento</Label>
                <Input
                  id="responsavelEntrada"
                  placeholder="Nome do responsável"
                  value={entradaFormData.responsavel}
                  onChange={(e) =>
                    setEntradaFormData({ ...entradaFormData, responsavel: e.target.value })
                  }
                />
              </div>

              <div>
                <Label htmlFor="notaFiscal">Nota Fiscal (opcional)</Label>
                <Input
                  id="notaFiscal"
                  placeholder="Número da nota fiscal"
                  value={entradaFormData.notaFiscal}
                  onChange={(e) =>
                    setEntradaFormData({ ...entradaFormData, notaFiscal: e.target.value })
                  }
                />
              </div>

              <Button type="submit" className="w-full">
                Salvar Entrada
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      {activeTab === "previsao" && (
        <Card>
          <CardHeader>
            <CardTitle>Previsão de Consumo de Gás</CardTitle>
            <p className="text-sm text-muted-foreground">
              Visualize projeções de consumo baseadas no histórico
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="unidadePrevisao">Selecione uma Unidade</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Todas as unidades" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todas">Todas as unidades</SelectItem>
                      {unidades.map((unidade) => (
                        <SelectItem key={unidade.id} value={unidade.id}>
                          {unidade.nome}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="bg-slate-50 rounded-lg p-8 text-center border-2 border-dashed">
                <p className="text-slate-500">
                  Gráfico de previsão será exibido aqui baseado no histórico de consumo
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ControleGas;
