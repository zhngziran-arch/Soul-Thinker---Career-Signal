import { questions } from '../data/quizData.js'

export const MODEL_VERSION = '2.0'
const workDimensions = [
  { id:'dim_a', name:'身心状态', description:'休息、精力与工作感受', weight:.30 },
  { id:'dim_b', name:'团队支持', description:'沟通、协作与尊重', weight:.25 },
  { id:'dim_c', name:'回报满意度', description:'薪酬、规则与休假', weight:.25 },
  { id:'dim_d', name:'成长空间', description:'技能、业务与发展机会', weight:.20 },
]
// One intervention per concrete signal. The selected answer is attached as evidence.
const interventions = {
  1:['别让周日提前变成周一','下个周日，先把最不想面对的一件事写下来：是某个人、一场会，还是没做完的任务？先找准让你紧绷的那一件，不用一次解决整份工作。','下周再问问自己：想到上班时，有没有轻松一点？如果这种不舒服一直影响生活，找专业人士聊聊也可以。'],
  2:['给下班时间留一道门','下次收到不紧急的临时任务，可以先问清截止时间，再说明你能安排的时间。不必每条消息都用“马上”来回答。','过两周看看：你的晚上和周末，有没有多拿回来一点？如果一直没有，下份工作就要重点问清加班和响应要求。'],
  3:['先把自己照顾好，工作往后排一点','看看这周能不能留出一段完整的休息时间，把不急的事往后放一放。持续或加重的不适，值得认真对待，也可以寻求专业评估。','先看身体和精力有没有缓过来。状态没有好转，就继续找支持，不用催自己赶紧恢复正常。'],
  4:['看看你的电，都耗在哪儿了','挑一天，把最累的三个瞬间记下来：是事情太多、反复返工，还是总在应付人？先试着少接一件、少改一轮，或说清一个要求。','两周后看看，最磨人的那件事有没有变化。一直改不动的话，就值得想想换任务、换团队，或者换工作。'],
  5:['任务总变？先把这次要什么说清楚','接到下一项任务时，确认三件事：要交什么、什么时候交、做到哪一步算完成。聊完顺手发条简短确认，给自己少留一点猜来猜去的空间。','下次交付时，看看标准是不是又变了。如果几次沟通都没用，可以了解一下换团队的可能。'],
  6:['别把每一个卡点都自己扛了','挑一件现在卡住的事，把“需要谁提供什么、最晚什么时候需要”说具体。比起一句“这个做不了”，明确的请求更方便对方接住。','看看这次有没有人给到实际帮助。如果总是没人接，至少你能更清楚：哪些事靠自己努力还不够。'],
  7:['少猜一点脸色，多留一点成果','把近期做成的事记下来，能用结果说的就用结果说。那些和工作无关的比较与站队，能少投入一些就少一些。','到下一次评价时，看看成果有没有被认真对待。如果做得好也说不清好在哪儿，换工作时就要留意这一点。'],
  8:['被冒犯的感受，不用硬吞下去','把发生了什么、让你不舒服的地方记下来，先和一个信得过的人聊聊。在安全的前提下，再决定向谁反映、需要什么帮助。','看看这些行为有没有停止。如果涉及安全，就先找帮助，不用等这份计划做完。'],
  9:['工作加量了，待遇也该聊一聊','列清现在承担的职责和最近做成的两三件事，约一次专门的沟通。把想争取的调整说具体，别只留下一句“希望公司看见我的努力”。','留意对方有没有给出具体答复和时间。一直只有“以后会考虑”，就可以同时看看外面的机会。'],
  10:['工资的事，问个明确日期','把约定金额、实际到账和还差多少列清楚，直接问清剩下的款项什么时候处理。重要的是拿到具体答复。','到说好的日期再看有没有兑现。问题持续时，把自己的生活安排放在前面，必要时找当地专业服务问清处理办法。'],
  11:['“好好干”之外，问清怎么算好','趁下一轮工作开始前，问清最重要的两三个目标，以及谁来判断、什么时候反馈。让自己知道力气该花在哪儿。','下一次反馈时，看看是不是照着说好的标准来。如果标准总在变，别把所有希望都放在下一次承诺上。'],
  12:['先给自己安排一次能休成的假','查一下还有多少假，选一个实际可行的时间，早点把安排提出来。先把这次休息争取下来。','看看休假能不能真正落实。如果每次都卡住，下次面试就别忘了问：大家通常怎么休假？'],
  13:['别只把自己练成公司的熟练工','找一个你感兴趣的岗位，看看它具体要什么。再从自己做过的项目里挑一个，补成能在简历或面试里讲清楚的例子，先做这一小块。','过两到四周，看看自己有没有多一个拿得出手的例子。如果岗位要求差得很远，就先缩小方向，不用什么都学。'],
  14:['公司在变，你也留个后手','把亲眼看到的变化和听来的传闻分开：项目、职责、团队，究竟哪里变了？顺手了解一两个能用上现有经验的岗位方向。','后面继续看具体变化。自己的岗位开始受影响时，就把找机会往前提一点。'],
  15:['“以后有机会”，可以再问具体点','找个合适的时机聊聊：下一步能做什么、还差哪些条件、大概什么时候有机会。给自己定一个再回来看进展的日子。','到了那一天，如果还是只有一句“再等等”，就可以把一部分精力放到外面，不必无限续期。'],
}
const conversationStarters = {
  2:'“这件事最晚什么时候需要？如果明天上午可以，我明早优先处理。”',
  5:'“我确认一下：这次先交 A，周五前完成，B 暂时不做，对吗？”',
  6:'“我这边卡在 X，需要你提供 Y。如果周三前拿到，就能按时推进。”',
  9:'“我现在负责 A 和 B，最近做出了这些结果。我想约个时间，聊聊目前的职责和薪酬是否匹配。”',
  10:'“这次应发和到账还差 X，想确认一下，剩余部分具体哪天能处理？”',
  11:'“这轮最看重哪两个结果？我们什么时候一起看一下进展？”',
  15:'“如果我想往下一步走，具体还需要做到什么？我们能约个时间再聊进展吗？”',
}
const concernNotes = {
  1:'一想到上班就开始紧绷，周日也很难真正休息。值得先找找，最让你难受的究竟是哪一件事。',
  2:'工作正在挤占你的私人时间。下班后能不能真正下班，值得单独拿出来聊。',
  3:'你提到了近期的身体或精力变化。现在可以先把自己的状态放在前面，去留稍后再谈。',
  4:'你在工作里感到的消耗，比成就感更多。先找出最磨人的那部分，会比催自己打起精神更有用。',
  5:'和领导相处这件事，让你费了不少心。可以先看目标和沟通能不能变清楚，再决定要不要继续磨合。',
  6:'遇到困难时很难得到支持，工作就容易变成一个人硬扛。先看一次具体的求助能不能被接住。',
  7:'人际关系和评价方式正在占用你的精力。做事之外还要一直猜人，确实容易累。',
  8:'你提到了不被尊重的处境。这份不舒服值得认真对待，不用急着说服自己忍过去。',
  9:'你在意的是，付出的这些值不值。把多做的事和想要的回报摆到一起，才有得谈。',
  10:'收入的不确定，让留下来也很难踏实。先把金额和时间问清，再安排自己的下一步。',
  11:'如果努力和回报之间总隔着一层猜测，人很容易没劲。先看看评价标准能不能说清楚。',
  12:'连休息都要费一番力气，会让这份工作的消耗更重。先从一次具体的休假安排开始。',
  13:'你担心继续待下去，经验在涨，能带走的本事却没涨多少。这个顾虑值得放到下一步的选择里。',
  14:'你注意到了公司的业务变化。先看它实际影响了什么，同时给自己留一些别的可能。',
  15:'你想往前走，但眼前的路不太清楚。可以再问一次具体安排，也给自己的等待设个期限。',
}

// Milder answers should not inherit the language of severe situations.
const mildConcernNotes = {
  1:'想到周一有点烦，但休息后通常还能进入状态。先留意最不想面对的那一件事，不必急着给整份工作下结论。',
  2:'工作偶尔会占用你的休息时间。可以留意一下，这是短期忙一阵，还是慢慢变成了常态。',
  3:'你提到了偶尔疲劳。先看看最近有没有休息够，以及哪些安排能让自己轻松一点。',
  4:'工作有做成事的满足，也有应付琐事的疲惫。可以先试着把一点时间留给更有收获的部分。',
  5:'和领导沟通偶尔不太顺，但还有商量的空间。先把下一次任务说清楚，看看配合能不能顺一点。',
  6:'有些事情需要自己摸索，支持来得不算多。可以从一次具体的小求助开始，看看哪些资源能用起来。',
  7:'团队里有一些人际上的小心思，但还没影响所有事情。先顾好自己的工作，也留意它会不会开始影响你的机会。',
  9:'你对现在的回报有一些不满意。可以先整理职责和成果，想清楚自己最想争取什么，再找机会聊。',
  10:'工资偶尔晚到，虽然最后补上了，等钱的时候也会不踏实。可以先问清原因和之后的发薪安排。',
  11:'评价里有一些让你介意的地方。下一轮开始前问清目标，看看规则能不能更透明一点。',
  12:'请假流程有点费事。可以先试着提早安排一次休息，看看实际能不能顺利休成。',
  13:'现在的工作已经做熟了，但新的成长不算多。可以给自己找一个小突破，看看这里还有没有能学的东西。',
  14:'公司比较平稳，增长没有那么快。先想想这个阶段的你，更需要稳定，还是更多新机会。',
  15:'晋升走得有点慢，但岗位还算稳定。你可以问问下一步的安排，再决定愿意等多久。',
}
const level = score => score < 40 ? {label:'优先关注',tone:'risk'} : score < 70 ? {label:'有待改善',tone:'watch'} : {label:'相对稳定',tone:'good'}
const readinessLevel = score => score < 40 ? {label:'需要准备',tone:'risk'} : score < 70 ? {label:'部分具备',tone:'watch'} : {label:'相对充足',tone:'good'}

export function calculateResults(answers, companyName = '目前的工作') {
  const selected = questions.map(q => {
    const option = q.options.find(o => o.id === answers[q.id])
    if (!option) throw new Error(`请完成第 ${q.id} 题后再生成报告。`)
    return { ...q, selected:option, risk:option.score / Math.max(...q.options.map(o=>o.score)) * 100 }
  })
  const byId = Object.fromEntries(selected.map(q=>[q.id,q]))
  const dimensions = workDimensions.map(dim=>{
    const rows=selected.filter(q=>q.dimension===dim.id)
    const max=rows.reduce((n,q)=>n+Math.max(...q.options.map(o=>o.score)),0)
    const risk=Math.round(rows.reduce((n,q)=>n+q.selected.score,0)/max*100)
    const evidence=[...rows].sort((a,b)=>b.risk-a.risk)[0]
    return {...dim,score:100-risk,risk,...level(100-risk),evidence:{questionId:evidence.id,title:evidence.title,answer:evidence.selected.text}}
  })
  const pushScore=Math.round(dimensions.reduce((n,d)=>n+d.risk*d.weight,0))
  const readiness=[
    {id:'cash',questionId:16,name:'生活缓冲',score:byId[16].selected.score*10,detail:byId[16].selected.text},
    {id:'market',questionId:17,name:'求职机会',score:byId[17].selected.score*10,detail:byId[17].selected.text},
    {id:'energy',questionId:18,name:'转变精力',score:byId[18].selected.score*10,detail:byId[18].selected.text},
  ].map(r=>({...r,...readinessLevel(r.score)}))
  const cashTight=answers[16]==='D'
  const cashLimited=['C','D'].includes(answers[16])
  const energyLow=answers[18]==='C'
  const marketLow=answers[17]==='C'
  const alerts=selected.filter(q=>q.selected.redFlag).map(q=>({id:`alert-${q.id}`,questionId:q.id,title:q.dimension==='dim_a'?'你的身心状态值得优先关注':q.dimension==='dim_b'?'你提到了人身尊重或安全问题':'你提到了收入或权益风险',answer:q.selected.text,description:q.dimension==='dim_a'?'这项回答提示你可能需要更多支持。若不适持续或影响日常生活，请优先关注实际状态，寻求专业评估。':q.dimension==='dim_b'?'优先考虑当前安全和可获得的支持，不必等待行动计划结束再寻求帮助。':'先核实具体情况与记录，再向当地适当的专业服务咨询处理方式。'}))
  const ranked=[...dimensions].sort((a,b)=>b.risk-a.risk)
  const primary=ranked[0]
  const strengths=dimensions.filter(d=>d.score>=70)
  let strategy
  if(alerts.length) strategy={id:'support',label:'先照顾好自己，这件事不用一个人扛',tone:'risk',description:'先处理下面特别提醒的事。剩下的安排，可以等你得到支持、腾出一点空间后再做。'}
  else if(energyLow && (pushScore>=30 || dimensions[0].risk>=40)) strategy={id:'recover',label:'先给自己回点电，再想下一站',tone:'watch',description:'你已经很累了，没必要再给自己加一份“必须立刻改变”的任务。先缓一缓，有余力时再往前走。'}
  else if(pushScore>=55 && cashLimited) strategy={id:'prepare',label:'想走可以，先给自己攒点选择权',tone:'watch',description:'这份工作让你不太舒服，但手里的缓冲还要顾着。可以一边保住收入，一边看看机会，让离开慢慢变成一个能选的选项。'}
  else if(pushScore>=55) strategy={id:'explore',label:'可以看看外面了，先聊聊再决定',tone:'watch',description:'你对这份工作的几处不满意，已经值得认真对待。先接触一些机会，听听、比比，等有了具体选择再决定。'}
  else if(primary.risk>=60) strategy={id:'targeted',label:'先解开最拧巴的那一处',tone:'watch',description:`你最介意的部分集中在${primary.name}。其他地方还可以，也不代表这一处就得忍。先试着改变它，再看值不值得留下。`}
  else if(pushScore>=30) strategy={id:'adjust',label:'先试着调一调，但别一直将就',tone:'watch',description:'有些地方已经让你不舒服，但还可以试着调整。挑一件最想改变的事，过段时间再回来看看，别让“再忍忍”没有尽头。'}
  else strategy={id:'stay',label:'现在可以先留下，把日子过得更值一点',tone:'good',description:'从你的回答看，这份工作还有值得保留的地方。不急着做去留决定，先想想接下来最想从这里得到什么。'}

  const constraints=[]
  if(cashTight) constraints.push('你提到手里的钱撑不到三个月，或固定开销比较重。对找工作有信心，也不能替代眼下要用的钱；先把生活安排稳，会更从容。')
  else if(cashLimited) constraints.push('你手里的缓冲大约是三到六个月。可以开始准备下一步，同时看着每月开销和找工作的进展，给自己留点余地。')
  if(marketLow) constraints.push('你提到机会不多，或正在换方向。先看看真正在招什么、愿意和你聊什么，再决定往哪儿使劲。')
  if(energyLow) constraints.push('你现在的精力不太够。这几件事不用一起做，挑最轻的一件开始就好，休息也算正事。')
  if(!constraints.length) constraints.push('从你的回答看，准备上没有特别明显的短板。真要换之前，还是看看具体机会、算算开销，心里会更有底。')

  const candidates=selected.filter(q=>q.id<=15 && q.risk>=30).sort((a,b)=>{
    const priority=q=>q.risk + (q.selected.redFlag?200:0) + (q.dimension==='dim_a'&&energyLow?40:0)
    return priority(b)-priority(a) || a.id-b.id
  })
  const actions=[]
  const usedDims=new Set()
  for(const q of candidates){
    if(actions.length>=2) break
    if(usedDims.has(q.dimension))continue
    usedDims.add(q.dimension)
    const [title,task,review]=interventions[q.id]
    actions.push({id:`q${q.id}`,title,task,review,starter:conversationStarters[q.id]||null,evidence:q.selected.text,questionId:q.id,when:actions.length===0?'现在 · 先做这一件':'本周 · 再推进一步'})
  }
  if(!actions.length) actions.push({id:'maintain',title:'留下来，也给自己要点期待',task:'想想接下来最想得到什么：做一个能写进简历的项目、学会一项本事，还是把生活节奏稳下来？选一件，给这个月留一个自己的目标。',review:'一个月后看看，那件期待有没有往前走一点？如果没有，再想想是目标需要调整，还是这里给不了你想要的。',evidence:byId[13].selected.text,questionId:13,when:'这个月 · 留一点期待'})
  if(cashLimited) actions.push({id:'cash',title:'先算清楚：不上班，钱能撑多久',task:'打开备忘录，写下现在能用的钱、每月必须花的钱和要还的钱。先按没有新收入的情况算一遍，还没确定的奖金或 offer 先别算进去。',review:'等收入或开销有变化，再算一次。手里还比较紧的时候，先留着收入来源，会少一些被时间追着走的压力。',evidence:byId[16].selected.text,questionId:16,when:'找个空当 · 算笔自己的账'})
  else if(energyLow) actions.push({id:'energy',title:'这周少做一点，也可以',task:'从这份清单里只挑一件最轻的小事，比如收藏一个岗位，或者改一行简历。剩下的先放着，给自己留一段不用完成任务的时间。',review:'过一两周，看看自己有没有多一点精神。有了再加一点，没有就先别给自己加码。',evidence:byId[18].selected.text,questionId:18,when:'这周 · 给自己减点量'})
  else actions.push({id:'market',title:marketLow?'先看看，外面到底在招谁':'找几个机会聊聊，别全靠想象',task:marketLow?'先找三个真正感兴趣、还在招聘的岗位。看看共同要求是什么，哪些你做过，哪些还差一点，再挑一个试着联系。':'找几个你愿意了解的岗位聊聊。除了工资，也问问平时做什么、和谁合作、加班是什么情况。聊过之后，才好和现在的工作比较。',review:'过两到四周，看看哪些岗位愿意继续聊、哪些地方不匹配。有反馈就调整，还没有确定的机会时，不用急着给自己定离职日。',evidence:byId[17].selected.text,questionId:17,when:'接下来 2—4 周 · 看看机会'})

  const mainConcern = candidates[0]
  const summary = alerts.length
    ? concernNotes[selected.find(q=>q.selected.redFlag).id]
    : mainConcern ? (mainConcern.risk<60 ? mildConcernNotes[mainConcern.id] || concernNotes[mainConcern.id] : concernNotes[mainConcern.id])
    : '从你的回答看，眼下没有特别突出的工作困扰。可以先把这份工作的好处用起来，也给下一阶段留一点期待。'

  return {
    version:MODEL_VERSION,companyName:companyName.trim()||'目前的工作',pushScore,
    dimensions,readiness,alerts,strategy,constraints,actions,strengths,
    focus:primary.risk>=30?primary:null,
    summary,
    pacing:energyLow?'今天如果已经很累，这份清单先放着也没关系。有余力时，从最轻的一件开始。':null,
    radarData:dimensions.map(d=>({label:d.name,value:d.score})),
    evaluatedAt:new Date().toLocaleDateString('zh-CN',{year:'numeric',month:'long',day:'numeric'}),
  }
}
