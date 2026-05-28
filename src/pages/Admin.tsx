import React, { useEffect, useState } from 'react';
import { Lead } from '../data';
import { Download, Users, Briefcase } from 'lucide-react';
import { Button } from '../components/Button';

export default function Admin() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/leads')
      .then(res => res.json())
      .then(data => {
        setLeads(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const exportCSV = () => {
    // Generate CSV from leads
    let csvContent = "data:text/csv;charset=utf-8,";
    // Headers
    const headers = [
      "ID", "Data Cadastro", "Empresa", "Contato", "WhatsApp", "Email", "Cidade/UF", 
      "Segmentos", "Áreas de Interesse", "Serviços Necessários", "Dores/Desafios", "Maior Desafio (Texto)"
    ];
    csvContent += headers.map(h => `"${h}"`).join(",") + "\n";

    // Data rows
    leads.forEach(lead => {
      // Flatten complex objects
      const servicesConcat = Object.entries(lead.services).map(([area, svcs]) => `${area}: [${svcs.join(' | ')}]`).join('; ');
      const painsConcat = Object.entries(lead.painPoints).map(([area, pains]) => `${area}: [${pains.join(' | ')}]`).join('; ');
      
      const row = [
        lead.id || '',
        lead.createdAt ? new Date(lead.createdAt).toLocaleString() : '',
        lead.companyName,
        lead.contactName,
        lead.whatsapp,
        lead.email,
        `${lead.city || ''} / ${lead.state || ''}`,
        lead.segments.join(', '),
        lead.areasOfInterest.join(', '),
        servicesConcat,
        painsConcat,
        lead.biggestChallenge.replace(/\n/g, ' ')
      ];
      csvContent += row.map(v => `"${v}"`).join(",") + "\n";
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `InventarioVisao_Leads_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-[#001220] text-slate-200 p-6 md:p-12">
      <div className="max-w-7xl mx-auto space-y-8">
        
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-3">
              <Briefcase className="w-8 h-8 text-[#00E5FF]" />
              Painel Administrativo
            </h1>
            <p className="text-slate-400 mt-1">Gestão de diagnósticos e captação de leads</p>
          </div>
          <Button onClick={exportCSV} disabled={leads.length === 0} className="w-full md:w-auto">
            <Download className="w-5 h-5 mr-2" /> Exportar Leads (CSV)
          </Button>
        </header>

        {loading ? (
          <div className="text-center py-20">Carregando leads...</div>
        ) : leads.length === 0 ? (
          <div className="bg-[#001D36] border border-[#003366] rounded-2xl p-12 text-center flex flex-col items-center">
            <Users className="w-16 h-16 text-slate-500 mb-4" />
            <h2 className="text-xl font-medium text-white mb-2">Nenhum diagnóstico recebido ainda</h2>
            <p className="text-slate-400">Os dados aparecerão aqui assim que seus clientes iniciarem.</p>
          </div>
        ) : (
          <div className="bg-[#001D36] rounded-2xl border border-[#003366] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-[#00264A] text-slate-300">
                  <tr>
                    <th className="px-6 py-4 font-medium">Data</th>
                    <th className="px-6 py-4 font-medium">Empresa</th>
                    <th className="px-6 py-4 font-medium">Contato</th>
                    <th className="px-6 py-4 font-medium">WhatsApp</th>
                    <th className="px-6 py-4 font-medium">Áreas Solicitadas</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#003366]">
                  {leads.map(lead => (
                    <tr key={lead.id} className="hover:bg-[#002B4D] transition-colors">
                      <td className="px-6 py-4 text-slate-400">
                        {lead.createdAt ? new Date(lead.createdAt).toLocaleDateString() : '-'}
                      </td>
                      <td className="px-6 py-4 font-medium text-white">{lead.companyName}</td>
                      <td className="px-6 py-4 text-slate-300">{lead.contactName}</td>
                      <td className="px-6 py-4 text-[#00E5FF]">{lead.whatsapp}</td>
                      <td className="px-6 py-4 text-slate-400">
                        {lead.areasOfInterest.length > 0 ? (
                          <div className="flex gap-2 flex-wrap">
                            {lead.areasOfInterest.map((a, i) => (
                              <span key={i} className="bg-[#00E5FF]/10 text-[#00E5FF] px-2 py-1 rounded text-xs border border-[#00E5FF]/20">
                                {a}
                              </span>
                            ))}
                          </div>
                        ) : '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="p-4 border-t border-[#003366] flex justify-between items-center text-sm text-slate-400">
              <span>Total de Leads: <strong className="text-white">{leads.length}</strong></span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
