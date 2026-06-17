import { QuizStage, DiagnosticContent, BackRedirectMessage, CopyVariation } from "../types";

export const AVATAR_RESEARCH = {
  profileName: "Mãe Cristã Protetora e Consciente",
  demographics: "Mulheres de 30 a 50 anos, casadas, classe média/alta, com 1 a 3 filhos em idade escolar (5 a 15 anos). Ativas na comunidade religiosa.",
  
  doresConscientes: [
    "O tempo excessivo que o filho passa no celular consumindo conteúdo secular sem filtros.",
    "A sensação de que a igreja local só ensina histórias infantis bíblicas superficiais, sem profundidade racional.",
    "Falta de tempo na rotina diária para sentar e doutrinar os filhos de maneira estruturada.",
    "Dificuldade pessoal em responder perguntas difíceis dos filhos (ex: 'Quem criou Deus?', 'Como o mal existe?', 'A ciência desmente a Bíblia?')."
  ],
  
  doresInconscientes: [
    "Medo vergonhoso de ser culpada perante Deus e a comunidade pelo desvio espiritual do filho.",
    "A percepção silenciosa de que sua própria fé é frágil e incapaz de sustentar um debate intelectual com um adolescente cético.",
    "Inveja oculta de famílias cujos filhos parecem super envolvidos na igreja.",
    "Arrependimento de ter terceirizado a educação moral e espiritual para a escola secular ou internet."
  ],
  
  medosProfundos: [
    "O filho crescer, entrar para a faculdade e declarar-se ateu ou agnóstico (abandono definitivo da fé).",
    "O filho ser cancelado, isolado ou humilhado na escola por defender princípios morais cristãos.",
    "Ver o filho ceder a vícios modernos, depressão e crises existenciais por falta de uma âncora espiritual de verdade."
  ],
  
  desejosSinceros: [
    "A paz de espírito absoluta de saber que o filho defenderá a verdade bíblica mesmo que esteja sozinho na sala de aula.",
    "Ter conversas teológicas profundas e ricas à mesa do jantar, vendo o brilho de convicção real nos olhos do filho.",
    "Deixar um legado de fé geracional inquebrável, garantindo que seus netos e bisnetos também amem a Deus."
  ],
  
  objeçõesComuns: [
    "**'Meu filho é muito novo para isso.'** (Contraponto psicológico: as dúvidas começam antes, plantadas sorrateiramente por desenhos animados e mídias sociais).",
    "**'Eu já levo meu filho à igreja aos domingos, isso basta.'** (Contraponto psicológico: 2 horas de igreja não competem com 40 horas de internet secular por semana).",
    "**'Material de apologética deve ser muito denso e chato.'** (Contraponto psicológico: o Método Convicção Inabalável™ traduz conceitos profundos em dinâmicas lúdicas altamente atrativas)."
  ],

  conflitosInternos: [
    "Proteger vs. Preparar: O desejo de blindar o filho de influências nocivas versus a dura realidade de que ele precisa aprender a contra-argumentar de forma madura.",
    "Autoridade vs. Conexão: Medo de impor regras religiosas e afastar o filho versus medo de ser ausente e vê-lo se perder no relativismo cultural."
  ],

  gatilhosEmocionais: [
    "**Antecipação do Arrependimento**: Imaginar o jantar de daqui a 10 anos, onde o filho adulto diz que não acredita mais em Deus.",
    "**Responsabilidade Espiritual Solene**: Romanos 14:12 e a prestação de contas dos pais em relação às almas que cuidaram.",
    "**Quebra de Ilusão**: Perceber de repente que o 'bom comportamento superficial' do filho na igreja não significa fé enraizada."
  ]
};

export const QUIZ_STAGES: QuizStage[] = [
  {
    id: 1,
    category: "Demográfico",
    psyObjective: "Iniciação suave e segmentação simples.",
    behaviorLogic: "Perguntas iniciais simples ajudam a prender a atenção.",
    expectedImpact: "Sensação de personalização imediata.",
    title: "Etapa de Identificação",
    subtitle: "Para quem faremos este diagnóstico?",
    question: "Qual é a idade atual do seu filho (ou da criança que você mais se preocupa)?",
    options: [
      { text: "De 5 a 7 anos", points: 3 },
      { text: "De 8 a 10 anos", points: 2 },
      { text: "De 11 a 13 anos", points: 1 },
      { text: "14 anos ou mais", points: 1 }
    ]
  },
  {
    id: 2,
    category: "Autopercepção",
    psyObjective: "Mapeamento inicial de segurança na fé.",
    behaviorLogic: "O usuário avalia de cabeça a fé do filho antes do confronto real.",
    expectedImpact: "Desconforto sutil sobre a real firmeza espiritual.",
    title: "Diagnóstico de Superfície",
    subtitle: "Como você vê a fé dele hoje?",
    question: "De forma sincera, quão forte você sente que é a fé do seu filho atualmente?",
    options: [
      { text: "Firme: Ele ama a Deus e vai à igreja com alegria.", points: 2 },
      { text: "Moderada: Ele vai à igreja, mas quase não fala de Deus em casa.", points: 3 },
      { text: "Frágil: Percebo dúvidas ou desinteresse em orar e ir aos cultos.", points: 4 },
      { text: "Apenas costume: Ele repete minhas palavras, mas sem convicção própria.", points: 5 }
    ]
  },
  {
    id: 3,
    category: "Exposição Digital",
    psyObjective: "Contraste consciente do tempo de tela versus tempo de ensino.",
    behaviorLogic: "Fazer o pai notar o abismo de horas que o celular retém seu filho.",
    expectedImpact: "Preocupação imediata sobre as influências do telefone.",
    title: "Mapeamento de Exposição",
    subtitle: "Tempo de influência externa por dia.",
    question: "Aproximadamente quanto tempo por dia seu filho passa conectado a telas (Celular, YouTube, Tik Tok)?",
    options: [
      { text: "Menos de 1 hora por dia (controle bem rígido)", points: 1 },
      { text: "De 1 a 2 horas por dia (tempo moderado)", points: 3 },
      { text: "De 2 a 4 horas por dia (grande risco de influência externa)", points: 4 },
      { text: "Mais de 4 horas por dia (o celular é o seu principal companheiro)", points: 5 }
    ]
  },
  {
    id: 4,
    category: "Confronto e Dúvida",
    psyObjective: "Testar a habilidade de acolhimento parental sobre dúvidas lógicas.",
    behaviorLogic: "Simular uma crise de fé para avaliar a preparação prática do pai.",
    expectedImpact: "Reconhecer que respostas prontas não bastam hoje em dia.",
    title: "Interrogação Apologética",
    subtitle: "Frente a uma dúvida racional sincera.",
    question: "Se seu filho perguntar: 'Papai/Mamãe, como sabemos se Deus existe mesmo, se ninguém O vê?', qual sua reação?",
    options: [
      { text: "Sei responder de forma simples, mas com argumentos lógicos fortes.", points: 1 },
      { text: "Sei responder o básico, mas sinto que faltaria profundidade.", points: 3 },
      { text: "Usaria respostas espirituais prontas (ex: 'Basta ter fé', 'Sinta o vento').", points: 4 },
      { text: "Mudo de assunto ou confesso que não sei explicar.", points: 5 }
    ]
  },
  {
    id: 5,
    category: "Capacidade Parental",
    psyObjective: "Mostrar a necessidade urgente de capacitação em casa.",
    behaviorLogic: "Chocar o usuário com o dever bíblico de ensinar ativamente.",
    expectedImpact: "Desejo de se preparar melhor para blindar o herdeiro.",
    title: "Autoavaliação de Capacitação",
    subtitle: "Preparo para blindagem espiritual.",
    question: "Qual o seu nível de preparo hoje para defender a fé do seu filho contra o ceticismo da escola ou internet?",
    options: [
      { text: "Consigo rebater argumentos ateus e proteger a mente dele com calma.", points: 1 },
      { text: "Tenho muita fé, mas não sei de provas históricas ou científicas.", points: 3 },
      { text: "Despreparado: Se ele for desafiado na escola, não sei como ajudá-lo.", points: 5 },
      { text: "Nunca parei para pensar nisso (achava que a igreja cuidaria de tudo).", points: 4 }
    ]
  },
  {
    id: 6,
    category: "Convicção",
    psyObjective: "Avaliar o comportamento social sob pressão cultural.",
    behaviorLogic: "Colocar o filho em uma situação real de confronto na sala de aula.",
    expectedImpact: "Apreensão com o risco do filho se silenciar e apostatar.",
    title: "O Teste da Arena de Valores",
    subtitle: "Seu filho diante do escárnio.",
    question: "Imagine que um colega zombe dizendo que 'cultuar a Deus é besteira'. Como seu filho agiria?",
    options: [
      { text: "Saberia explicar o porquê de sua fé sem perder a postura racional.", points: 1 },
      { text: "Ficaria calado com vergonha, guardando a dúvida no coração.", points: 4 },
      { text: "Concordaria com o colega para ser aceito pelo grupo.", points: 5 },
      { text: "Responderia de forma infantil ('Deus é real porque sim'), gerando mais deboche.", points: 3 }
    ]
  },
  {
    id: 7,
    category: "Influência",
    psyObjective: "Definição do real formador da mente do jovem.",
    behaviorLogic: "Mapear o detentor do tempo intelectual ativo da prole.",
    expectedImpact: "Surpresa com a predominância da mídia sobre o lar.",
    title: "Invasão Silenciosa de Valores",
    subtitle: "Quem ensina mais o seu filho por semana?",
    question: "Quem passa a maior parte do tempo ensinando formas de pensar e valores ao seu filho toda semana?",
    options: [
      { text: "A nossa família: Conversamos bastante e temos momentos devocionais.", points: 1 },
      { text: "A escola secular: Passa o dia exposto a professores com visões contrárias.", points: 4 },
      { text: "O celular/Internet: Ele consome canais, influenciadores e jogos sem parar.", points: 5 },
      { text: "Os amigos e o ciclo social da rua ou da escola.", points: 3 }
    ]
  },
  {
    id: 8,
    category: "Valores",
    psyObjective: "Perceber o nível de discernimento moral ativo.",
    behaviorLogic: "Medir o filtro crítico contra agendas sutis nas telas.",
    expectedImpact: "Desejo de equipar o filho com discernimento próprio.",
    title: "Filtro Crítico Ideológico",
    subtitle: "Bloqueio contra agendas sutis nas telas.",
    question: "Ao ver desenhos ou vídeos que zombam dos valores da Bíblia, como seu filho reage?",
    options: [
      { text: "Ele percebe a maldade na hora e comenta comigo sobre o erro.", points: 1 },
      { text: "Ele assiste passivamente, sem notar que o conteúdo ataca sua crença.", points: 4 },
      { text: "Ele começa a achar essa visão moderna mais legal do que o ensino de casa.", points: 5 },
      { text: "Eu não faço ideia, pois não consigo acompanhar de perto o que ele assiste.", points: 5 }
    ]
  },
  {
    id: 9,
    category: "Medo",
    psyObjective: "Vocalizar a dor última do distanciamento espiritual futuro.",
    behaviorLogic: "Ancoragem com estatísticas de abandono para gerar intervenção preventiva.",
    expectedImpact: "Engajamento completo com a solução protetora.",
    title: "Antecipação de Rota de Risco",
    subtitle: "A dor do afastamento de Deus.",
    question: "Sabendo que 7 em cada 10 jovens criados na igreja abandonam a fé ao crescer, qual o risco do seu filho?",
    options: [
      { text: "Seguro: Damos bases excelentes e temos ótima conversa em casa.", points: 1 },
      { text: "Moderado: Ele é bonzinho hoje, mas temo as pressões do amanhã.", points: 4 },
      { text: "Inquietante: Ele já mostra preguiça com a igreja e apego ao profano.", points: 5 },
      { text: "Não sei: Prefiro confiar em Deus sem tomar atitudes práticas no lar.", points: 4 }
    ]
  },
  {
    id: 10,
    category: "Desejo",
    psyObjective: "Abertura para o método de blindagem em família.",
    behaviorLogic: "O pai declara ativa necessidade de suporte, preparando a mente para o resultado.",
    expectedImpact: "Necessidade de obter o método prático agora.",
    title: "O Resgate da Convicção",
    subtitle: "Herança espiritual duradoura.",
    question: "Se você tivesse acesso a materiais práticos de brincadeiras e lógicas cristãs infantis, você usaria no seu lar?",
    options: [
      { text: "Com certeza absoluta! Quero blindar a alma e o futuro do meu herdeiro.", points: 1 },
      { text: "Sim, se for rápido e fácil de encaixar na nossa rotina corrida.", points: 2 },
      { text: "Gostaria de ver primeiro para entender o funcionamento.", points: 3 },
      { text: "Não sinto urgência ou prefiro seguir as coisas do meu próprio jeito.", points: 4 }
    ]
  }
];

export const SCORING_SYSTEM = {
  maxPoints: 50,
  minPoints: 10,
  classification: [
    {
      level: "Baixo Risco",
      range: [10, 18],
      summary: "Teu filho possui boa base de valores e você se envolve ativamente. No entanto, lembre-se de que a blindagem apologética é um processo ativo e contínuo. Mesmo uma casa limpa e sólida pode ser invadida se as janelas intelectuais forem deixadas abertas para a cultura secular.",
      description: "Seu lar possui uma cultura espiritual ativa. Contudo, a transição da infância para a juventude apresenta demandas intelectuais complexas que exigem treinamento apologético estruturado."
    },
    {
      level: "Atenção",
      range: [19, 28],
      summary: "Existe uma fé de aparência estável, mas baseada meramente em hábitos (ir à igreja, orar mecanicamente) ao invés de CONVICÇÕES estruturadas. Se seu filho for desafiado intelectualmente na escola ou mídias sociais, ele dificilmente saberá defender aquilo que crê.",
      description: "Seu filho ama a Deus, mas não compreende as razões lógicas e históricas de sua crença. Ele expressa a fé dos pais, mas ainda não conquistou uma fé sua própria. Sem bases intelectuais, as primeiras dúvidas na adolescência podem ser devastadoras."
    },
    {
      level: "Vulnerável",
      range: [29, 39],
      summary: "Sinais claros de que as ideias seculares do celular, amigos e escola estão ocupando mais espaço no coração do seu filho do que os ensinamentos da Bíblia. A conexão com as verdades cristãs está enfraquecendo de maneira silenciosa mês a mês.",
      description: "Nível de vulnerabilidade crítico. As horas desmedidas consumindo opiniões de influenciadores digitais e a incapacidade familiar de apresentar respostas apologéticas sólidas estão abrindo caminho para a erosão silenciosa da fé."
    },
    {
      level: "Alto Risco",
      range: [40, 50],
      summary: "Apatia espiritual gritante ou perguntas que ficaram sem resposta já estão gerando um distanciamento perceptível de Deus. O risco do abandono definitivo da fé cristã nos próximos anos é extremamente elevado caso uma intervenção urgente com o Método Convicção Inabalável™ não seja realizada.",
      description: "Estado de Alerta Vermelho Espiritual. Seu filho já consome a cosmovisão secular de forma integrada e passiva, e você se sente incapaz ou sem recursos práticos para mudar essa maré. O afastamento definitivo da fé é o desfecho provável se nada for feito agora."
    }
  ]
};

export const DIAGNOSTICS: Record<string, DiagnosticContent> = {
  "Baixo Risco": {
    level: "Baixo Risco",
    badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    themeColor: "text-emerald-400",
    scoreRange: "De 10 a 18 pontos",
    title: "Convicção Inicial Firme, Mas Necessita Blindagem Preventiva",
    subtitle: "Parabéns por assumir a rédea espiritual do seu lar. Porém, a ausência de sintomas de dúvida não garante imunidade intelectual futura.",
    validation: "Seu diagnóstico indica que você é um pai ou uma mãe extremamente preocupada e intencional. Você não terceirizou a fé de seu filho. No entanto, em termos de Neuromarketing e Psicologia Comportamental, sabemos que o cérebro das crianças busca conformidade social na adolescência.",
    deepAnalysis: "Seu filho hoje tem de 5 a 14 anos e aceita de forma doce os seus ensinamentos. Mas lembre-se: uma fé baseada apenas no amor filial é saudável na infância, mas desmorona sob os primeiros ataques discursivos de professores universitários céticos se não for munida de evidências racionais.",
    riskSignals: [
      "Falta de profundidade apologética: ele sabe que a Bíblia é a Palavra de Deus, mas não saberia listar uma única prova arqueológica ou histórica disso se desafiado.",
      "Anestesia de conforto: a sensação de segurança pode fazer você adiar a imunização intelectual dele contra o relativismo.",
      "Invasão gradual: pequenos desenhos com temas de ocultismo ou ideologias infiltradas nas redes que parecem apenas 'diversão inofensiva'."
    ],
    opportunity: "Você tem o terreno mais fértil que existe em mãos. Seu filho confia em você. Ensinar os 'porquês' lógicos da fé cristã agora, enquanto o coração dele está aberto, garantirá que as defesas intelectuais dele estejam totalmente erguidas ANTES do primeiro ataque.",
    bridgeToOffer: "Embora seu filho esteja no caminho certo, ele precisa de uma metodologia que transforme o ensino bíblico em uma aventura de descobertas racionais. O Método Convicção Inabalável™ ajudará você a elevar a fé do seu filho do nível devocional superficial para o nível apologético inquebrável, com apenas 15 minutos semanais.",
    scoreExplanation: "Sua pontuação reflete que você é um herói espiritual da sua casa. Mas até os melhores exércitos mantêm suas defesas afiadas."
  },
  "Atenção": {
    level: "Atenção",
    badgeColor: "bg-amber-500/10 text-amber-400 border-amber-500/30",
    themeColor: "text-amber-400",
    scoreRange: "De 19 a 28 pontos",
    title: "Fé Baseada em Hábito Superficial (Foco em O Quê, Não em Por Quê)",
    subtitle: "Seu filho aceita as histórias da Bíblia porque você as ensina, mas ele está vulnerável a argumentos intelectuais contrários simples.",
    validation: "O diagnóstico do seu filho acende um sinal amarelo crucial. Ele é um bom garoto, vai aos cultos e repete o jargão da igreja. Mas na psicologia do desenvolvimento, isso é chamado de 'Fé Adquirida'. É a sua fé refletida nele, não a fé dele individual.",
    deepAnalysis: "Quando seu filho for para o colégio ou passar horas no YouTube consumindo canais de divulgação científica mundana, ele será confrontado com mentiras bem embaladas. Sem argumentos racionais estruturados para rebater, o cérebro dele enfrentará um conflito insuportável de dissonância cognitiva, e para escapar desse estresse ele tenderá a abandonar os valores de casa.",
    riskSignals: [
      "Inexistência de defesa racional: o jovem não tem recursos históricos ou científicos para explicar a própria fé e recorre ao silêncio envergonhado.",
      "Saturação de entretenimento secular: as horas semanais de telas superam brutalmente os minutos de conversa produtiva sobre Deus no lar.",
      "Terceirização inocente: achar que os sermões da igreja de 45 minutos aos domingos são suficientes para blindar 168 horas semanais sob bombardeio secular."
    ],
    opportunity: "A mente do seu filho ainda está em fase de estruturação. Ele ainda ouve suas orientações. Se você injetar a vacina apologética do Método Convicção Inabalável™ agora, cada dúvida que surgir no futuro servirá apenas para FORTALECER a fé dele, em vez de destruí-la.",
    bridgeToOffer: "Não espere que as dúvidas apareçam para procurar respostas. O segredo é deitar as fundações de evidências (arqueologia bíblica, ciência da criação, profecias cumpridas) hoje de forma instigante e envolvente. O Método Convicção Inabalável™ foi feito sob medida para pais ocupados que desejam dar essa blindagem aos filhos em casa.",
    scoreExplanation: "Sua pontuação indica um equilíbrio precário: a fé dele é forte para a infância, mas frágil demais para os desafios que virão."
  },
  "Vulnerável": {
    level: "Vulnerável",
    badgeColor: "bg-orange-500/10 text-orange-400 border-orange-500/30",
    themeColor: "text-orange-400",
    scoreRange: "De 29 a 39 pontos",
    title: "Segurança Espiritual em Erosão Silenciosa e Ativa",
    subtitle: "A cultura externa secularizada já comanda mais tempo e autoridade sobre a imaginação do seu filho do que as Escrituras.",
    validation: "Este diagnóstico revela um cenário de vulnerabilidade perigoso. Seus hábitos espirituais familiares perderam ritmo diante do cansaço e do atropelo diário. Em contrapartida, as mídias em telas preencheram o vácuo de forma sedutora e invisível.",
    deepAnalysis: "Seu filho já consome valores anticristãos embalados de forma lúdica no TikTok, Instagram ou séries modernas de streaming, sem que você perceba. A vergonha de opinar moralmente em ambientes escolares e a falta de respostas diretas para as complexidades modernas criam uma apatia silenciosa que logo culminará em rebeldia espiritual aberta.",
    riskSignals: [
      "Desinteresse pela oração, leitura bíblica ou idas aos cultos, mascarados por preguiça ou tédio crônico.",
      "Filosofias seculares assimiladas: o garoto já reproduz conceitos de relativismo moral herdados puramente de influenciadores digitais aleatórios.",
      "Dificuldade crônica dos pais em encontrar as estratégias, tempo ou conhecimento para iniciar conversas difíceis de fé de forma atraente."
    ],
    opportunity: "A maré cultural é forte, mas o elo de sangue e amor entre pais e filhos é a ferramenta de persuasão mais poderosa projetada por Deus. Você só precisa do método certo para reacender o interesse dele pelas verdades bíblicas de forma profundamente envolvente.",
    bridgeToOffer: "Você precisa urgentemente agir antes que a desconexão se torne permanente. O Método Convicção Inabalável™ traduz as dúvidas mais complexas do ceticismo moderno em diálogos empolgantes de 15 minutos, recuperando o coração e a mente do seu filho dos valores dominantes do mundo.",
    scoreExplanation: "Sua pontuação indica que a influência das redes e da escola secular está vencendo a batalha silenciosa no lar. Precisamos agir."
  },
  "Alto Risco": {
    level: "Alto Risco",
    badgeColor: "bg-red-500/10 text-rose-400 border-rose-500/30",
    themeColor: "text-rose-400",
    scoreRange: "De 40 a 50 pontos",
    title: "Alerta Vermelho: Alto Risco de Afastamento Teológico de Longo Prazo",
    subtitle: "Sinais claros de enfraquecimento intelectual da fé. O silêncio e a apatia atuais revelam dúvidas já consolidadas sobre Deus.",
    validation: "Este é um parecer urgente e franco. Neuromarketing e análise comportamental cristã mostram que adolescentes em famílias que pontuam nessa faixa estão a um passo de renunciar formalmente à fé e adentrar em profunda crise de identidade moral secular.",
    deepAnalysis: "O distanciamento espiritual do seu herdeiro não é temporário. É decorrência direta de anos de superexposição ideológica externa desregulada e da escassez de instrução apologética madura no ambiente doméstico. O celular é o verdadeiro mestre teológico da criança hoje. A fé bíblica passou a parecer medieval, sem atrativo, sem lógica e vergonhosa aos olhos dele.",
    riskSignals: [
      "Apatia espiritual profunda ou rejeição explícita a participar de qualquer atividade espiritual em família.",
      "Sentimento de que a Bíblia é obsoleta e a ciência secular moderna é a única e absoluta detentora da verdade existencial.",
      "Barreira comunicativa impermeável: o filho já ridiculariza seus dogmas religiosos ou se recusa a dialogar honestamente sobre fé."
    ],
    opportunity: "Mesmo sob o alerta vermelho, há uma promessa bíblica solene sobre direcionar o caminho da criança (Provérbios 22:6). Nenhuma rebeldia resiste a um método familiar que aborda a apologética com inteligência acadêmica e afeto parental, em vez de mero autoritarismo religioso dogmático.",
    bridgeToOffer: "A pior atitude agora é forçar a religiosidade com severidade estéril. Você precisa desarmar as dúvidas lógicas dele com fatos históricos irrefutáveis. O Método Convicção Inabalável™ oferece a você o manual exato de resgate de convicções para restabelecer a autoridade da Verdade de Deus na mente dele.",
    scoreExplanation: "Sua pontuação revela que as defesas espirituais do seu herdeiro foram totalmente penetradas pela cultura e mídia secular. Requer intervenção imediata."
  }
};

export const BACK_REDIRECT_MESSAGES: BackRedirectMessage[] = [
  // EXIT MESSAGES (15) - Quando tenta sair, fechar ou mudar de foco
  { id: 1, type: "exit", text: "ATENÇÃO: Seu diagnóstico cristão personalizado está 92% concluído. Sair agora significa deixar a fé do seu filho desprotegida contra dúvidas ocultas da cultura moderna.", triggerContext: "Hover saindo da página (Desktop)" },
  { id: 2, type: "exit", text: "O ceticismo moderno não faz pausas. Se você abandonar o diagnóstico do seu filho agora, você perderá a revelação dos maiores riscos à fé dele.", triggerContext: "Mouse rumo à barra de abas" },
  { id: 3, type: "exit", text: "Espere! Sair agora impede que nosso sistema envie o relatório gratuito de apologética infantil cristã para o seu e-mail.", triggerContext: "Instante de inatividade" },
  { id: 4, type: "exit", text: "Você sabia que 72% dos pais descobrem pontos cegos de altíssimo risco espiritual nas duas últimas perguntas deste quiz?", triggerContext: "Intenção de voltar no navegador" },
  { id: 5, type: "exit", text: "Não terceirize o destino espiritual de quem você ama. Conclua os últimos passos e veja as soluções do Método Convicção Inabalável™.", triggerContext: "Ação de fechar modal" },
  { id: 6, type: "exit", text: "A fé que compreende permanece. Deixar este diagnóstico incompleto é preferir ignorar os riscos que as redes sociais representam ao seu filho hoje.", triggerContext: "Toque prolongado fora do conteúdo" },
  { id: 7, type: "exit", text: "Um lar preparado é uma igreja forte. Volte para responder a próxima pergunta e blinde a herança moral da sua família.", triggerContext: "Clique no botão de fechar" },
  { id: 8, type: "exit", text: "Dúvidas intelectuais começam aos 7 anos de forma silenciosa. Termine o teste para saber se seu filho possui as respostas certas.", triggerContext: "Janela desfocada" },
  { id: 9, type: "exit", text: "Alerta de CRO: Apenas mães realmente intencionais completam esta autoavaliação. Sua família merece esses 45 segundos finais.", triggerContext: "Intenção de encerramento rápido" },
  { id: 10, type: "exit", text: "Como você responderá ao seu herdeiro se ele perguntar de Deus amanhã e você não terminou de estruturar sua própria capacidade?", triggerContext: "Mudança rápida na URL" },
  { id: 11, type: "exit", text: "O Método Convicção Inabalável™ está calculando a pontuação parcial. Não interrompa o fluxo para não corromper sua análise.", triggerContext: "Clique em elemento externo" },
  { id: 12, type: "exit", text: "Não há maior dor para pais do que ver um filho crescer e declarar-se alheio a Cristo. Garanta que você fez o diagnóstico dele.", triggerContext: "Redirecionamento bloqueado" },
  { id: 13, type: "exit", text: "Permaneça firme! Os herdeiros de Deus sofrem influência anticristã agressiva diariamente na escola. Você precisa ver o plano de apoio.", triggerContext: "Ação de recarregar a página" },
  { id: 14, type: "exit", text: "Suas respostas anteriores revelaram vulnerabilidades importantes. Não ignore os sinais de perigo espiritual que você mesma assinalou.", triggerContext: "Histórico de cliques" },
  { id: 15, type: "exit", text: "Sua chamada com a verdade espiritual foi iniciada. Complete o quiz para descobrir a solução que já salvou milhares de famílias.", triggerContext: "Pre-unload trigger" },

  // ABANDONMENT MESSAGES (10) - Após o usuário abandonar a página por ociosidade ou distração
  { id: 16, type: "abandon", text: "Voltamos ao Diagnóstico: Seu herdeiro espiritual não pode esperar enquanto o mundo molda ativamente suas opiniões sobre moralidade.", triggerContext: "1 minuto de ociosidade total" },
  { id: 17, type: "abandon", text: "As telas do celular continuam influenciando a imaginação dele. Retome o diagnóstico para recuperar o controle espiritual do seu lar.", triggerContext: "Aba em segundo plano detectada" },
  { id: 18, type: "abandon", text: "O tempo que seu filho passa online consome sua inocência cristã. Complete as últimas etapas do diagnóstico agora.", triggerContext: "Ociosidade detectada" },
  { id: 19, type: "abandon", text: "Seu questionário está salvo. Dê o clique final para revelar se seu filho está em Baixo Risco, Atenção, Vulnerável ou Alto Risco.", triggerContext: "Retorno de foco" },
  { id: 20, type: "abandon", text: "Uma herança espiritual indestrutível não se constrói com distração. Termine a análise da blindagem teológica dele.", triggerContext: "Notificação push/Toast simulado" },
  { id: 21, type: "abandon", text: "Os desafios de cosmovisão na escola começarão em breve. Você se sentirá confortável sabendo que não concluiu esta análise urgente?", triggerContext: "Sem cliques por 30s" },
  { id: 22, type: "abandon", text: "Prevenir a apostasia intelectual é infinitamente mais simples do que curar o ceticismo doloroso de um filho rebelde adulto. Volte já.", triggerContext: "Deslocamento de cursor" },
  { id: 23, type: "abandon", text: "O diagnóstico é 100% gratuito e confidencial. Não desista do futuro da fé doméstica no meio do caminho.", triggerContext: "Ociosidade noturna" },
  { id: 24, type: "abandon", text: "Deuteronômio 6:7 nos orienta a incutir a verdade ao deitar e ao levantar. O Método Convicção Inabalável™ é o guia prático para isso.", triggerContext: "Desfoque de elemento de foco" },
  { id: 25, type: "abandon", text: "Faltam apenas 3 perguntas simples para revelar se seu lar está verdadeiramente imune ou vulnerável ao relativismo moderno.", triggerContext: "Parada abrupta do fluxo" },

  // RETURN MESSAGES (10) - Mensagens persuasivas para acolher o usuário quando ele retorna focando na janela
  { id: 26, type: "return", text: "Excelente decisão em retornar. Seu diagnóstico está intacto e pronto para revelar os planos práticos de apologética para seu filho.", triggerContext: "Foco da janela ativo" },
  { id: 27, type: "return", text: "Você retomou a tempo. A blindagem da herança da sua igreja e da sua casa depende deste autoconhecimento racional.", triggerContext: "Foco reestabelecido" },
  { id: 28, type: "return", text: "O ceticismo acadêmico não descansa. Que bom que você escolheu continuar. Vamos aos 40 segundos finais desta descoberta guiada.", triggerContext: "Re-entrada da aba" },
  { id: 29, type: "return", text: "A herança moral que seu filho receberá de você durará toda a vida. Estamos honrados em guiar você neste diagnóstico.", triggerContext: "Re-clique na aba" },
  { id: 30, type: "return", text: "Suas respostas anteriores já revelaram pontos cegos sérios. Vamos avançar para ver o diagnóstico final personalizado.", triggerContext: "Mouse retorna ao canvas" },
  { id: 31, type: "return", text: "Sua dedicação espiritual é o temperamento necessário para manter seu herdeiro no caminho reto de Deus. Prossiga com fé.", triggerContext: "Mudança de status ativo" },
  { id: 32, type: "return", text: "Seu diagnóstico prévio aponta para riscos que merecem toda a sua consideração. Conclua para liberar o relatório de segurança espiritual.", triggerContext: "Recuperação de estado" },
  { id: 33, type: "return", text: "Você está demonstrando compromisso real em não terceirizar o destino ético de sua casa para o relativismo social moderno. Continue.", triggerContext: "Retorno pós-distração" },
  { id: 34, type: "return", text: "Bem-vinda de volta. Vamos concluir a análise de como moldar convicções sobre a autoridade da Palavra de Deus em seu filho.", triggerContext: "Gatilho de foco restrito" },
  { id: 35, type: "return", text: "O Método Convicção Inabalável™ está configurando o seu plano de transição para a oferta. Responda à última pergunta com sinceridade.", triggerContext: "Input reset focado" }
];

export const COPY_VARIATIONS: CopyVariation[] = [
  // HEADLINES (10)
  { id: 1, type: "headline", text: "Como blindar a fé de seu filho de forma racional ANTES que as dúvidas e influências do celular destruam sua convicção espiritual para sempre.", psychology: "Alerta de risco invisível preventivo + dor do celular" },
  { id: 2, type: "headline", text: "A Fé Que Permanece: Descubra o nível real de blindagem do seu filho contra o ceticismo mundano com o diagnóstico do Método Convicção Inabalável™.", psychology: "Autoridade metodológica + teste de vulnerabilidade" },
  { id: 3, type: "headline", text: "Seu filho sabe o PORQUÊ ele acredita em Deus, ou ele está apenas repetindo as suas respostas com medo de desagradar você?", psychology: "Provocação psicológica direcionada + fidelidade vs conformidade" },
  { id: 4, type: "headline", text: "Por que 72% de jovens fervorosos na igreja abandonam de vez a fé após entrarem na faculdade — e o segredo prático na infância para evitar isso.", psychology: "Estatística de risco + curiosidade intrínseca + prevenção ativa" },
  { id: 5, type: "headline", text: "O teste definitivo de herança moral: Seu filho tem argumentos intelectuais reais para debater com professores e colegas que caçoam da fé dele?", psychology: "Teste de capacitação na arena de debate + preservação de honra" },
  { id: 6, type: "headline", text: "A Bíblia diz para ensinar a criança no caminho correto... mas será que duas horas semanais na Escola Dominical conseguem competir com 40 horas de telas mundanas?", psychology: "Contraste quantitativo + quebra de terceirização dominical" },
  { id: 7, type: "headline", text: "Método Convicção Inabalável: Como converter histórias bíblicas simples em verdades lógicas indestrutíveis no coração das suas crianças.", psychology: "Conversão conceitual de infantil para maduro" },
  { id: 8, type: "headline", text: "Como dar aos seus filhos a solidez de uma apologética cristã brilhante sem precisar ler centenas de livros densos ou manuais chatos.", psychology: "Facilidade de aplicação + quebra de barreira de complexidade" },
  { id: 9, type: "headline", text: "Antes de entregarem o celular a eles, entreguem fundamentos inabaláveis. Avalie a integridade da fé de seu lar hoje.", psychology: "Cronologia de cautela digital + dever sagrado parental" },
  { id: 10, type: "headline", text: "Construindo uma fé que resiste ao tempo: O plano lógico que impede que a influência da cultura moderna roube a alma e os valores do seu filho.", psychology: "Construção de legado duradouro de valores tradicionais" },

  // SUBHEADLINES (5)
  { id: 11, type: "subheadline", text: "Responda a este diagnóstico de 10 perguntas profundas baseado em psicologia parental e apologética bíblica, e revele o nível de risco teológico do seu herdeiro.", psychology: "Ancoragem profissional científica e teológica" },
  { id: 12, type: "subheadline", text: "Um parecer sério e reservado para pais cristãos que recusam ver seus filhos sucumbirem ao relativismo moral moderno por falta de preparo prático em casa.", psychology: "Firmeza espiritual, apelo à coragem e discrição" },
  { id: 13, type: "subheadline", text: "Descubra os pontos cegos ocultos da educação moral na sua família e receba o relatório preliminar do Método Convicção Inabalável™.", psychology: "Curiosidade sobre os próprios erros + prestígio educacional" },
  { id: 14, type: "subheadline", text: "Prepare o coração e as armas lógicas do seu filho. A resposta dele dirá se a crença dele durará por toda a adolescência ou se desvanecerá rapidamente.", psychology: "Tensão imediata saudável sobre durabilidade de fé" },
  { id: 15, type: "subheadline", text: "Baseado em estatísticas e apologética realista, este diagnóstico revela se a integridade espiritual de sua casa está em estado estável ou em alerta crítico.", psychology: "Rotulação preliminar acadêmica e séria" },

  // CTAs (5)
  { id: 16, type: "cta_initial", text: "Iniciar Diagnóstico Solene de Blindagem Espiritual Gratuitamente", psychology: "Apelo ao dever parental solene e gratuidade" },
  { id: 17, type: "cta_initial", text: "Medir Nível de Vulnerabilidade Teológica do Meu Filho Agora", psychology: "Senso de precaução ativa e urgência de proteção" },
  { id: 18, type: "cta_inter", text: "Confirmar Resposta e Avançar com Intencionalidade", psychology: "Recompensa psicológica sobre o comprometimento materno" },
  { id: 19, type: "cta_final", text: "Gerar Diagnóstico Personalizado e Plano de Blindagem do Herdeiro", psychology: "Criação de expectativa de valor imediato" },
  { id: 20, type: "cta_final", text: "Revelar Parecer e Conhecer o Método Convicção Inabalável™", psychology: "União entre a informação revelada e o veículo com a solução" }
];

export const MOTION_DESIGN_GUIDE = {
  visualTheme: {
    backdrop: "Midnight Slate (Fundo profundo, seguro, que remete à solenidade, eternidade e céu estrelado). Cores escuras reduzem cansaço ocular na leitura densa.",
    accents: "Dourado Nobre (Remete à realeza bíblica, sabedoria pura e valor eterno) e Vermelho Sangue / Alerta (Indicador claro de áreas de perigo existencial).",
    components: "Visual elegante, cantos arredondados suaves, sombras flutuantes para dar percepção de refinamento e prestígio profissional."
  },
  animations: [
    { element: "Transição de Etapas", effect: "Fade sutil deslizante horizontal (X-axis e opacity) com motion, durando exatamente 300ms. Evita sobressaltos e induz um desdobrar de pensamentos.", objective: "Manter o ritmo emocional sem causar fadiga interativa." },
    { element: "Barra de Progresso Dinâmica", effect: "Preenchimento linear dourado contínuo com efeito elástico ('spring'), acompanhado por indicador centesimal.", objective: "Gamificar o avanço, aumentando a satisfação biológica de completar etapas e reduzindo desistência." },
    { element: "Loading Screen de Processamento", effect: "Animação de escaneamento radial simulado, pulsação de ícone com mensagens dinâmicas como 'Calculando aderência apologética', 'Avaliando vulnerabilidade estrutural', 'Consolidando dados de influência digital'.", objective: "Criar tremenda antecipação e percepção de alta ciência por trás do resultado final do quiz." },
    { element: "Microinterações de Seleção", effect: "Ao pairar ou selecionar uma opção, o card realiza um sutil 'escala-up' (1.02) com borda dourada acendendo com brilho de néon escuro.", objective: "Dar feedback tátil digital imediato, retendo o foco nas respostas." }
  ]
};

export const UX_STRATEGY = {
  idealFlow: "Iniciação imediata → Segmentação etária rápida → Ascensão gradual de perguntas de tensão (do celular até o pior medo espiritual) → Clímax (o medo da perda) → Coerência (desejo pela solução) → Coleta de Lead de alta retenção → Párea de Diagnóstico Profundo → Apresentação elegante da solução (Ponte Sem Venda Agressiva).",
  ritmoEmocional: "Curva sinusoidal. Começa calmo com demográficos simples, gera aperto existencial ao expor que o lar carece de apologética científica (Tensão Máxima na pergunta 7, 8 e 9), e alivia a dissonância apresentando a promessa de vitória no final do diagnóstico.",
  tensionCurve: {
    low: "Etapa 1 a 3 (Perguntas ambientais)",
    medium: "Etapa 4 a 6 (Perguntas de capacidade e agressividade cética na escola)",
    high: "Etapa 7 a 9 (Invasão moral das telas do celular, abandono teológico universitário)",
    resolution: "Diagnóstico final (Onde se revela a vulnerabilidade mas aponta-se o caminho do resgate)"
  }
};

export const PRD_DOCUMENT = `
# Product Requirements Document (PRD) — Quiz 'A Fé Que Permanece'

## 1. Visão Geral do Produto
O Quiz \"A Fé Que Permanece\" é uma ferramenta interativa de diagnóstico espiritual e CRO projetada para guiar pais cristãos através de um processo de autorreflexão doloroso e sincero. Ele expõe as deficiências apologéticas do lar católico ou evangélico moderno de forma quantitativa e qualitativa, calculando um índice de risco existencial para a fé do herdeiro moral, antes de apresentar o Método Convicção Inabalável™ como a ponte perfeita de proteção e restauração.

## 2. Objetivos Estratégicos & KPIs
- **Taxa de Conversão de Cliques em Leads (E-mail):** Meta > 55%.
- **Taxa de Conclusão do Quiz (Etapa 1 até 10):** Meta > 75%.
- **CTR de Transição do Diagnóstico para a VSL/Checkout:** Meta > 25%.
- **Tempo Médio de Permanência na Página:** Meta de 3:30 minutos, indicando leitura profunda dos diagnósticos.

## 3. Fluxo de Usuários (User Flow)
1. **Página de Entrada (Landing Headline):** O usuário lê o gancho forte sobre blindagem intelectual contra o mundanismo digital e inicia o quiz voluntariamente.
2. **Funil de Diagnóstico (Interactive Stages):** O usuário responde 10 perguntas profundas. O progresso é acompanhado por uma barra spring-loader estimulante.
3. **Tela de Análise Animada (Calculating Screen):** Animação simulando compilação científica das vulnerabilidades do lar, demorando 4 segundos para elevar a percepção de valor.
4. **Formulário de Gate Real (Lead Capture):** Solicitação do e-mail principal para liberar o parecer sigiloso.
5. **Painel de Diagnóstico Final:** O usuário lê um relatório robusto e personalizado com base em sua pontuação, finalizando com o convite imperdível para conhecer o Método Convicção Inabalável™.

## 4. Regras de Negócio e Cálculo de Scoring
- O questionário possui 10 questões, variando de 1 a 5 pontos por opção.
- **Baixo Risco (10 a 18 pontos):** Herdeiro firme, pai intencional. Necessita blindagem preventiva rápida.
- **Atenção (19 a 28 pontos):** Fé baseada em rotina habitual sem profundidade arqueológica ou apologética.
- **Vulnerável (29 a 39 pontos):** Mídia secular e celular já detêm autoridade moral e moldagem moral clandestina no herdeiro.
- **Alto Risco (40 a 50 pontos):** Distanciamento de Deus já instalado. Risco gritante de apostasia definitiva.

## 5. Requisitos Funcionais de Engenharia
- **Preservação de Estado:** Caso o usuário feche a aba por engano, as respostas anteriores devem ser recordadas no localStorage para evitar fricção de reinício.
- **Sistema de Back Redirect em Sandbox:** Detecção inteligente de intenção de saída (por mouseout do viewport) ou cliques para voltar no histórico, disparando modais de conscientização psicológica baseados na Parte 5.
- **Compatibilidade Responsiva Total:** Ajuste perfeito e confortável para mobile, garantindo toque em área mínima de 44px para as opções de resposta do quiz.
`;

export const BRD_DOCUMENT = `
# Business Requirements Document (BRD) — 'A Fé Que Permanece'

## 1. Contextualização e Oportunidade de Mercado
O nicho de infoprodutos cristãos e metodologias familiares é um dos que mais crescem na América Latina, impulsionado pela alta intencionalidade dos pais conservadores em blindar suas proles contra o marxismo cultural e secularismo agressivo nas universidades. Há uma enorme oportunidade de mercado para metodologias estruturadas e práticas baseadas na apologética clássica adaptada para o lar. Este quiz é o principal canal de aquisição de tráfego frio (MQL - Marketing Qualified Lead).

## 2. Indicadores Financeiros e Metas
- **Custo por Lead (CPL):** Redução estimada de 35% em relação a Landing Pages convencionais com captura de topo de funil direto.
- **CPA (Custo de Aquisição de Cliente) do Curso Core:** Meta de R$ 90,00 para um produto com ticket de R$ 197,00 (ROI inicial de 2.18x).
- **LTV (Lifetime Value) Projetado:** Multiplicação de ticket com as ofertas subsequentes: Clube Convicção (recorrência) e Mentoria do Legado (High Ticket).

## 3. Premissas de Negócio e Gestão de Riscos
- **Qualidade Metodológica Cristã:** O material não deve debandar para disputas denominacionais secundárias (ex: Calvinismo vs Arminianismo), focando estritamente na apologética de sustentação histórica comum do cristianismo.
- **Transparência de CRO:** O quiz deve assegurar confidencialidade estrita de dados nos termos da LGPD, transmitindo credibilidade teológica e tecnológica.
- **Abordagem Emocional Equilibrada:** Evitar o uso exagerado ou manipulativo de táticas de terrorismo espiritual. O medo deve ser instrumentalizado unicamente como gatilho de reflexão racional realista e responsabilidade parental bíblica.
`;
