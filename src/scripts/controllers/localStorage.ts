import PlanilhaVendas from "../models/planilhaVendas";

export class Database {
    private static STORAGE_KEY = 'planilhaVendas';

    static getPlanilhaVendas(): PlanilhaVendas[] {
      const planilhaVendasJson = localStorage.getItem(Database.STORAGE_KEY);
      return planilhaVendasJson ? JSON.parse(planilhaVendasJson) : [];
    }
  
    static addEntry(entry: PlanilhaVendas): void {
      const planilhaVendas = Database.getPlanilhaVendas();
      planilhaVendas.push(entry);
      localStorage.setItem(Database.STORAGE_KEY, JSON.stringify(planilhaVendas));
    }
  
    static removeEntry(id: number): void {
      const planilhaVendas = Database.getPlanilhaVendas().filter((entry) => entry.id !== id);
      localStorage.setItem(Database.STORAGE_KEY, JSON.stringify(planilhaVendas));
    }
  }
  
  export {}; // Exportação vazia para transformar o arquivo em um módulo
  