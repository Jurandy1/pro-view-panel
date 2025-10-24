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
import { FileText, Download } from "lucide-react";

const GerarRelatorio = () => {
  const [formData, setFormData] = useState({
    tipo: "agua",
    dataInicio: "",
    dataFim: "",
  });

  const handleGerarRelatorio = () => {
    console.log("Gerar relatório:", formData);
    // Aqui você adicionaria a lógica para gerar o PDF
  };

  return (
    <div className="animate-fade-in">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-6 w-6" />
              Gerar Relatório PDF
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Gera um relatório de fornecimento (Água ou Gás) com dados de entregas por unidade e por responsável
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="tipo">Tipo de Relatório</Label>
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
                    <SelectItem value="agua">💧 Relatório de Água</SelectItem>
                    <SelectItem value="gas">🔥 Relatório de Gás</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="dataInicio">Data de Início</Label>
                  <Input
                    id="dataInicio"
                    type="date"
                    value={formData.dataInicio}
                    onChange={(e) =>
                      setFormData({ ...formData, dataInicio: e.target.value })
                    }
                  />
                </div>

                <div>
                  <Label htmlFor="dataFim">Data de Fim</Label>
                  <Input
                    id="dataFim"
                    type="date"
                    value={formData.dataFim}
                    onChange={(e) =>
                      setFormData({ ...formData, dataFim: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>

            <Button 
              onClick={handleGerarRelatorio} 
              className="w-full"
              size="lg"
            >
              <Download className="mr-2 h-5 w-5" />
              Gerar Relatório PDF
            </Button>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm">
              <p className="font-medium text-blue-900 mb-2">ℹ️ Informações sobre o Relatório:</p>
              <ul className="list-disc list-inside space-y-1 text-blue-800">
                <li>O relatório inclui <strong>apenas entregas</strong> no período selecionado</li>
                <li>Apresenta dois quadros: por <strong>Unidade</strong> e por <strong>Responsável</strong></li>
                <li>Os dados são ordenados por quantidade (maior para menor)</li>
                <li>O arquivo PDF será baixado automaticamente</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GerarRelatorio;
