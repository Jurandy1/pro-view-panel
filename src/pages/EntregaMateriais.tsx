import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Package, FileDown, CheckCircle } from "lucide-react";

const EntregaMateriais = () => {
  const [formData, setFormData] = useState({
    unidade: "",
    tipoMaterial: "alimento",
    data: "",
    arquivo: null as File | null,
    observacao: "",
    responsavel: "",
  });

  const unidades = [
    { id: "1", nome: "CRAS Centro", tipo: "CRAS" },
    { id: "2", nome: "CREAS Sul", tipo: "CREAS" },
    { id: "3", nome: "Abrigo Norte", tipo: "ABRIGO" },
  ];

  const materiais = [
    {
      unidade: "CRAS Centro",
      tipo: "Alimento",
      dataRequisicao: "10/01/2025",
      status: "requisitado",
      separador: null,
    },
    {
      unidade: "CREAS Sul",
      tipo: "Limpeza",
      dataRequisicao: "09/01/2025",
      status: "separacao",
      separador: "João Silva",
    },
    {
      unidade: "Abrigo Norte",
      tipo: "Expediente",
      dataRequisicao: "08/01/2025",
      status: "retirada",
      separador: "Maria Santos",
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Dados do formulário:", formData);
  };

  const getStatusBadge = (status: string) => {
    const badges = {
      requisitado: "px-3 py-1 bg-blue-500 text-white rounded-full text-xs font-semibold",
      separacao: "px-3 py-1 bg-yellow-500 text-white rounded-full text-xs font-semibold",
      retirada: "px-3 py-1 bg-green-500 text-white rounded-full text-xs font-semibold",
    };
    const labels = {
      requisitado: "📝 Requisitado",
      separacao: "⏳ Em Separação",
      retirada: "✅ Disponível",
    };
    return (
      <span className={badges[status as keyof typeof badges]}>
        {labels[status as keyof typeof labels]}
      </span>
    );
  };

  return (
    <div className="animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Formulário de Registro */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Registrar Requisição de Material
            </CardTitle>
          </CardHeader>
          <CardContent>
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
                <Label htmlFor="tipoMaterial">Tipo de Material</Label>
                <Select
                  value={formData.tipoMaterial}
                  onValueChange={(value) =>
                    setFormData({ ...formData, tipoMaterial: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="alimento">Alimento</SelectItem>
                    <SelectItem value="expediente">Expediente</SelectItem>
                    <SelectItem value="limpeza">Limpeza</SelectItem>
                    <SelectItem value="outros">Outros</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="data">Data da Requisição</Label>
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
                <Label htmlFor="arquivo">Anexar Pedido (PDF ou Excel)</Label>
                <Input
                  id="arquivo"
                  type="file"
                  accept=".pdf,.xlsx,.xls"
                  className="text-sm"
                  onChange={(e) =>
                    setFormData({ ...formData, arquivo: e.target.files?.[0] || null })
                  }
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Opcional. Anexe o arquivo do pedido.
                </p>
              </div>

              <div>
                <Label htmlFor="observacao">Observação:</Label>
                <Textarea
                  id="observacao"
                  placeholder="Alguma observação sobre esta requisição... (Opcional)"
                  value={formData.observacao}
                  onChange={(e) =>
                    setFormData({ ...formData, observacao: e.target.value })
                  }
                />
              </div>

              <div>
                <Label htmlFor="responsavel">Responsável pelo Lançamento</Label>
                <Input
                  id="responsavel"
                  placeholder="Nome de quem lançou"
                  value={formData.responsavel}
                  onChange={(e) =>
                    setFormData({ ...formData, responsavel: e.target.value })
                  }
                />
              </div>

              <Button type="submit" className="w-full">
                Registrar Requisição
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Tabela de Status */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Status dos Materiais</CardTitle>
            <p className="text-sm text-muted-foreground">
              Controle de materiais requisitados, em separação, disponíveis e entregues.
            </p>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <Label htmlFor="busca" className="text-xs">
                Buscar Status ou Unidade:
              </Label>
              <Input
                id="busca"
                placeholder="Digite 'requisitado', 'separacao' ou nome..."
                className="py-1 px-2 text-sm"
              />
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Unidade</th>
                    <th className="text-left p-2">Tipo</th>
                    <th className="text-left p-2">Data Requisição</th>
                    <th className="text-left p-2">Status</th>
                    <th className="text-center p-2">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {materiais.map((item, index) => (
                    <tr key={index} className="border-b hover:bg-muted/50">
                      <td className="p-2 font-medium">{item.unidade}</td>
                      <td className="p-2">
                        <span className="px-2 py-1 bg-primary/10 text-primary rounded text-xs">
                          {item.tipo}
                        </span>
                      </td>
                      <td className="p-2">{item.dataRequisicao}</td>
                      <td className="p-2">{getStatusBadge(item.status)}</td>
                      <td className="p-2">
                        <div className="flex justify-center gap-2">
                          {item.status === "requisitado" && (
                            <Button variant="outline" size="sm">
                              Iniciar Separação
                            </Button>
                          )}
                          {item.status === "separacao" && (
                            <>
                              <Button variant="outline" size="sm">
                                <FileDown className="h-4 w-4 mr-1" />
                                Download
                              </Button>
                              <Button variant="default" size="sm" className="bg-green-600 hover:bg-green-700">
                                Marcar Pronto
                              </Button>
                            </>
                          )}
                          {item.status === "retirada" && (
                            <Button variant="default" size="sm" className="bg-blue-600 hover:bg-blue-700">
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Entregue
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EntregaMateriais;
