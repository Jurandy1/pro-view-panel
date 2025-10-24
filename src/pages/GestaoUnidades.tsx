import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Building2, Trash2, Pencil, Save, XCircle } from "lucide-react";

const GestaoUnidades = () => {
  const [bulkText, setBulkText] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState("");

  // Dados de exemplo
  const unidades = [
    { 
      id: "1", 
      nome: "CRAS Centro", 
      tipo: "CRAS", 
      atendeAgua: true, 
      atendeGas: true, 
      atendeMateriais: true 
    },
    { 
      id: "2", 
      nome: "CREAS Sul", 
      tipo: "CREAS", 
      atendeAgua: true, 
      atendeGas: true, 
      atendeMateriais: true 
    },
    { 
      id: "3", 
      nome: "Abrigo Norte", 
      tipo: "ABRIGO", 
      atendeAgua: false, 
      atendeGas: true, 
      atendeMateriais: true 
    },
  ];

  const handleBulkAdd = () => {
    console.log("Adicionar unidades em lote:", bulkText);
    // Aqui você adicionaria a lógica para salvar no Firebase
  };

  const handleEdit = (id: string, nome: string) => {
    setEditingId(id);
    setEditingName(nome);
  };

  const handleSave = (id: string) => {
    console.log("Salvar unidade:", id, editingName);
    setEditingId(null);
    // Aqui você adicionaria a lógica para salvar no Firebase
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditingName("");
  };

  const handleToggle = (id: string, field: string, value: boolean) => {
    console.log("Toggle:", id, field, value);
    // Aqui você adicionaria a lógica para atualizar no Firebase
  };

  const handleDelete = (id: string, nome: string) => {
    console.log("Deletar unidade:", id, nome);
    // Aqui você adicionaria a lógica para deletar no Firebase
  };

  return (
    <div className="animate-fade-in space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Card de Adicionar em Lote */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Building2 className="h-5 w-5" />
              Adicionar em Lote
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="bulkUnidades" className="text-sm">
                Cole abaixo no formato: TIPO [TAB] NOME
              </Label>
              <p className="text-xs text-muted-foreground mb-2">
                Exemplo:<br />
                CRAS [TAB] CRAS Centro<br />
                CREAS [TAB] CREAS Sul
              </p>
              <Textarea
                id="bulkUnidades"
                placeholder="CRAS	CRAS Centro&#10;CREAS	CREAS Sul"
                rows={8}
                value={bulkText}
                onChange={(e) => setBulkText(e.target.value)}
                className="font-mono text-sm"
              />
            </div>
            <Button onClick={handleBulkAdd} className="w-full">
              Adicionar Unidades
            </Button>
          </CardContent>
        </Card>

        {/* Tabela de Gestão */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Gestão de Unidades</CardTitle>
            <p className="text-sm text-muted-foreground">
              Edite nomes, habilite/desabilite serviços ou remova unidades
            </p>
          </CardHeader>
          <CardContent>
            <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-2">
              <div>
                <Label htmlFor="filtroNome" className="text-xs">Buscar por Nome:</Label>
                <Input
                  id="filtroNome"
                  placeholder="Digite o nome..."
                  className="py-1 px-2 text-sm"
                />
              </div>
              <div>
                <Label htmlFor="filtroTipo" className="text-xs">Filtrar por Tipo:</Label>
                <Input
                  id="filtroTipo"
                  placeholder="Digite o tipo..."
                  className="py-1 px-2 text-sm"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Nome da Unidade</th>
                    <th className="text-left p-2">Tipo</th>
                    <th className="text-center p-2">💧 Água</th>
                    <th className="text-center p-2">🔥 Gás</th>
                    <th className="text-center p-2">📦 Materiais</th>
                    <th className="text-center p-2">Ação</th>
                  </tr>
                </thead>
                <tbody>
                  {unidades.map((unidade) => (
                    <tr key={unidade.id} className="border-b hover:bg-muted/50">
                      <td className="p-2">
                        {editingId === unidade.id ? (
                          <div className="flex items-center gap-2">
                            <Input
                              value={editingName}
                              onChange={(e) => setEditingName(e.target.value)}
                              className="h-8 text-sm"
                              autoFocus
                            />
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleSave(unidade.id)}
                              className="text-green-600 hover:text-green-700 p-1"
                            >
                              <Save className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={handleCancelEdit}
                              className="text-red-600 hover:text-red-700 p-1"
                            >
                              <XCircle className="h-4 w-4" />
                            </Button>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{unidade.nome}</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEdit(unidade.id, unidade.nome)}
                              className="text-slate-600 hover:text-slate-800 p-1"
                            >
                              <Pencil className="h-3 w-3" />
                            </Button>
                          </div>
                        )}
                      </td>
                      <td className="p-2">
                        <span className="px-2 py-1 bg-primary/10 text-primary rounded text-xs font-medium">
                          {unidade.tipo}
                        </span>
                      </td>
                      <td className="p-2 text-center">
                        <input
                          type="checkbox"
                          checked={unidade.atendeAgua}
                          onChange={(e) =>
                            handleToggle(unidade.id, "atendeAgua", e.target.checked)
                          }
                          className="h-4 w-4 cursor-pointer"
                        />
                      </td>
                      <td className="p-2 text-center">
                        <input
                          type="checkbox"
                          checked={unidade.atendeGas}
                          onChange={(e) =>
                            handleToggle(unidade.id, "atendeGas", e.target.checked)
                          }
                          className="h-4 w-4 cursor-pointer"
                        />
                      </td>
                      <td className="p-2 text-center">
                        <input
                          type="checkbox"
                          checked={unidade.atendeMateriais}
                          onChange={(e) =>
                            handleToggle(unidade.id, "atendeMateriais", e.target.checked)
                          }
                          className="h-4 w-4 cursor-pointer"
                        />
                      </td>
                      <td className="p-2 text-center">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(unidade.id, unidade.nome)}
                          className="text-red-600 hover:text-red-700"
                        >
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
    </div>
  );
};

export default GestaoUnidades;
