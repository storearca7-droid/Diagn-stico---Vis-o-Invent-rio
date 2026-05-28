export interface Lead {
  id?: string;
  createdAt?: string;
  companyName: string;
  contactName: string;
  whatsapp: string;
  email: string;
  city: string;
  state: string;
  segments: string[];
  areasOfInterest: string[];
  services: Record<string, string[]>;
  painPoints: Record<string, string[]>;
  biggestChallenge: string;
}

export const SEGMENTS = [
  "Supermercado",
  "Mercado",
  "Padaria",
  "Delicatessen",
  "Farmácia",
  "Material de Construção",
  "Restaurante",
  "Outro",
];

export const AREAS_OF_INTEREST = [
  "Estoque e Inventário",
  "Fiscal e Cadastro",
  "Gestão e Inteligência",
  "Financeiro",
  "Tecnologia e Sistemas",
  "Processos Operacionais",
  "Redução de Perdas"
];

export const SERVICES_BY_AREA: Record<string, { services: string[], painQuestion: string, pains: string[] }> = {
  "Estoque e Inventário": {
    services: [
      "Inventário físico", "Inventário digital", "Auditoria de estoque", "Controle de estoque",
      "Análise de ruptura", "Curva ABC", "Prevenção de perdas", "Excesso de mercadoria",
      "Layoutização de loja", "Organização de estoque"
    ],
    painQuestion: "Qual seu maior problema hoje?",
    pains: [
      "Estoque não bate", "Falta produto", "Excesso de mercadoria",
      "Perdas e desvios", "Compras erradas", "Falta controle"
    ]
  },
  "Fiscal e Cadastro": {
    services: [
      "Entrada de notas fiscais", "Conferência de notas", "Cadastro de produtos",
      "Revisão tributária", "Código de barras / EAN", "SPED Fiscal",
      "SPED Contribuições", "Organização fiscal", "Reforma Tributária"
    ],
    painQuestion: "Quais dificuldades fiscais você possui?",
    pains: [
      "Cadastro errado", "Imposto elevado", "Problemas fiscais",
      "Produtos sem organização", "Erros em notas fiscais"
    ]
  },
  "Gestão e Inteligência": {
    services: [
      "Relatórios gerenciais", "Diagnóstico financeiro", "CMV",
      "Análise de margem", "Indicadores", "Análise de compras",
      "Análise de vendas", "Árvore Mercadológica", "Gestão estratégica"
    ],
    painQuestion: "O que você deseja melhorar?",
    pains: [
      "Lucro", "Controle", "Indicadores", "Gestão",
      "Processos", "Compras", "Margem"
    ]
  },
  "Financeiro": {
    services: [
      "BPO Financeiro", "Conciliação bancária", "Controle de contas a pagar",
      "Controle de contas a receber", "Fluxo de caixa", "Relatórios financeiros"
    ],
    painQuestion: "Qual sua maior dor financeira?",
    pains: [
      "Dinheiro não sobra", "Falta organização", "Problemas no fluxo de caixa",
      "Falta de controle financeiro", "Não sei minha lucratividade"
    ]
  },
  "Tecnologia e Sistemas": {
    services: [
      "Dashboards e BI", "Sistemas personalizados", "Aplicativos para varejo",
      "Automação de processos", "Integração de dados", "Chatbots", "Suporte de sistemas"
    ],
    painQuestion: "O que você deseja automatizar?",
    pains: [
      "Relatórios", "Gestão", "Atendimento", "Processos", "Controle operacional"
    ]
  }
};
