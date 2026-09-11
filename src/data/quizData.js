export const dimensions = {
  dim_a: {
    id: 'dim_a',
    name: '身心健康与内耗',
    shortName: '身心健康',
    weight: 0.25,
    icon: 'HeartPulse',
    color: '#ef4444', // red
    description: '评估躯体化反应、失眠焦虑与精力耗竭程度'
  },
  dim_b: {
    id: 'dim_b',
    name: '团队生态与领导风格',
    shortName: '团队领导',
    weight: 0.20,
    icon: 'Users',
    color: '#f97316', // orange
    description: '评估管理风格、职场PUA、人际内卷与内耗程度'
  },
  dim_c: {
    id: 'dim_c',
    name: '价值回报与薪酬性价比',
    shortName: '薪酬回报',
    weight: 0.20,
    icon: 'Coins',
    color: '#eab308', // yellow
    description: '评估劳动回报比、发放稳定性与考核透明度'
  },
  dim_d: {
    id: 'dim_d',
    name: '个人成长与发展前景',
    shortName: '成长前景',
    weight: 0.15,
    icon: 'TrendingUp',
    color: '#3b82f6', // blue
    description: '评估技能积累、业务天花板与跳板履历价值'
  },
  dim_e: {
    id: 'dim_e',
    name: '底气缓冲与抗风险能力',
    shortName: '抗风险底气',
    weight: 0.20,
    icon: 'ShieldCheck',
    color: '#10b981', // emerald
    description: '评估个人储蓄跑道、外部求职竞争力与抗压耐受度'
  }
}

export const redFlags = {
  'RF-01': {
    id: 'RF-01',
    title: '身心健康严重亮红灯',
    desc: '已产生明显的躯体化生理反应（重度失眠/脱发/胸闷/抑郁倾向），健康处于不可逆磨损边缘。',
    level: 'CRITICAL'
  },
  'RF-02': {
    id: 'RF-02',
    title: '涉嫌违法违规或严重欠薪',
    desc: '公司存在长期拖欠工资/断缴社保超过2个月，或要求从事违法违规灰色活动。',
    level: 'CRITICAL'
  },
  'RF-03': {
    id: 'RF-03',
    title: '职场暴力与人格侵犯',
    desc: '遭遇极端人身攻击、性骚扰或非法限制人身自由，已触犯人身安全与法律底线。',
    level: 'CRITICAL'
  }
}

export const companyPresets = [
  '现任东家',
  '某大厂核心组',
  '某创业小团队',
  '某外企中国区',
  '某国企/事业单位',
  '某传统民营企业'
]

export const questions = [
  // ================= 维度 A: 身心健康与内耗 (4题) =================
  {
    id: 1,
    dimension: 'dim_a',
    title: '周日晚上的生理与情绪反应？',
    scenario: '一想到周一早晨要面对工作与打卡，你的第一生理与心理反馈是：',
    options: [
      {
        id: 'A',
        text: '内心平和，甚至对新一周的工作有些规划和期待',
        score: 0
      },
      {
        id: 'B',
        text: '略微烦躁，但刷刷手机或睡个好觉周一就能正常进入状态',
        score: 4
      },
      {
        id: 'C',
        text: '严重焦虑、失眠或胃痛胸闷，产生强烈的“不想面对明天”排斥感',
        score: 10,
        redFlag: 'RF-01'
      }
    ]
  },
  {
    id: 2,
    dimension: 'dim_a',
    title: '当前工作对你私人生活的侵占程度？',
    scenario: '下班后、周末以及法定节假日的工作响应状态：',
    options: [
      {
        id: 'A',
        text: '下班即断联，能充分享受个人生活、兴趣与完整周末',
        score: 0
      },
      {
        id: 'B',
        text: '偶尔需要处理紧急工作或短期加班，在可接受合理范围内',
        score: 3
      },
      {
        id: 'C',
        text: '频繁无休止加班，休息日也必须随时秒回消息，精神长期紧绷',
        score: 7
      },
      {
        id: 'D',
        text: '几乎没有个人生活，作息严重紊乱，身心处于崩溃边缘',
        score: 10
      }
    ]
  },
  {
    id: 3,
    dimension: 'dim_a',
    title: '近 3 个月以来，你的身体健康状况变化？',
    scenario: '工作对你身体机能造成的直接影响：',
    options: [
      {
        id: 'A',
        text: '精力充沛，体检指标正常，生活作息规律',
        score: 0
      },
      {
        id: 'B',
        text: '偶有疲劳，属于普通职场人的常见轻度亚健康',
        score: 4
      },
      {
        id: 'C',
        text: '出现明显脱发、内分泌失调、频繁偏头痛或肠胃不适等改变',
        score: 8
      },
      {
        id: 'D',
        text: '确诊中重度情绪障碍（抑郁/重度焦虑）或出现严重躯体化病症',
        score: 10,
        redFlag: 'RF-01'
      }
    ]
  },
  {
    id: 4,
    dimension: 'dim_a',
    title: '工作时“充实成就感”与“内耗憋屈”的时间占比？',
    scenario: '统计一个典型工作周的真实心情分布：',
    options: [
      {
        id: 'A',
        text: '70% 以上时间是充实、投入且有正向正反馈的',
        score: 0
      },
      {
        id: 'B',
        text: '苦乐参半，一半时间在做事，一半时间应付琐事',
        score: 4
      },
      {
        id: 'C',
        text: '80% 以上时间在叹气、压抑、假装忙碌或无意义内耗',
        score: 9
      }
    ]
  },

  // ================= 维度 B: 团队生态与领导风格 (4题) =================
  {
    id: 5,
    dimension: 'dim_b',
    title: '直属领导的日常管理风格与沟通模式？',
    scenario: '与直接上级的日常协作和指令下发过程：',
    options: [
      {
        id: 'A',
        text: '目标清晰，能提供业务指导与资源支持，愿意倾听与兜底',
        score: 0
      },
      {
        id: 'B',
        text: '就事论事，偶有情绪化但能讲通道理，管理中规中矩',
        score: 3
      },
      {
        id: 'C',
        text: '喜怒无常、微观监控细节、喜欢无休止画大饼却从不兑现',
        score: 7
      },
      {
        id: 'D',
        text: '经常贬低或打压下属，忽视下属贡献，出现问题时推卸责任',
        score: 10
      }
    ]
  },
  {
    id: 6,
    dimension: 'dim_b',
    title: '当遇到合理业务困难或阻碍寻求协助时？',
    scenario: '跨部门或组内协作求助时的真实反馈：',
    options: [
      {
        id: 'A',
        text: '团队协作顺畅，同事或领导能快速响应并给到实质性支持',
        score: 0
      },
      {
        id: 'B',
        text: '各自为政，多数情况需自己硬抗摸索，但无人故意使绊子',
        score: 4
      },
      {
        id: 'C',
        text: '互相踢皮球推诿，甚至借机冷嘲热讽或作为争权夺利的把柄',
        score: 9
      }
    ]
  },
  {
    id: 7,
    dimension: 'dim_b',
    title: '你所在部门/公司的政治斗争与内卷氛围？',
    scenario: '公司内部的评价标准与人际关系复杂度：',
    options: [
      {
        id: 'A',
        text: '氛围简单透明，以实际能力、业务交付和数据说话',
        score: 0
      },
      {
        id: 'B',
        text: '存在部分小团体或站队，但做好本职工作仍能独善其身',
        score: 4
      },
      {
        id: 'C',
        text: '派系林立，站队比做事重要，日常充斥着表演式加班与形式主义',
        score: 9
      }
    ]
  },
  {
    id: 8,
    dimension: 'dim_b',
    title: '公司的企业文化与要求是否触及你的底线？',
    scenario: '公司规章制度、老板价值观与你的道德契合度：',
    options: [
      {
        id: 'A',
        text: '高度认同，价值观契合，工作具备职业自豪感',
        score: 0
      },
      {
        id: 'B',
        text: '某些务虚口号或洗脑文化不太感冒，但未违背底线',
        score: 3
      },
      {
        id: 'C',
        text: '充斥虚伪奉承、狼性剥削或灰色边缘操作，感到心理排斥',
        score: 8
      },
      {
        id: 'D',
        text: '要求从事明显违规/违法活动（如造假、欺诈或侵犯权益）',
        score: 10,
        redFlag: 'RF-02'
      }
    ]
  },

  // ================= 维度 C: 价值回报与薪酬性价比 (4题) =================
  {
    id: 9,
    dimension: 'dim_c',
    title: '当前薪酬待遇与你的实际付出及行业水平对比？',
    scenario: '评估当前到手薪资、福利与个人劳动强度的匹配度：',
    options: [
      {
        id: 'A',
        text: '待遇优厚，明显高于行业同级别水平，钱给得相当到位',
        score: 0
      },
      {
        id: 'B',
        text: '符合行业中位数水平，虽无大惊喜但也算过得去',
        score: 3
      },
      {
        id: 'C',
        text: '明显同工不同酬，承担核心职责却领低薪，涨薪承诺屡屡落空',
        score: 7
      },
      {
        id: 'D',
        text: '薪水微薄，付出与回报严重倒挂，甚至存在变相降薪与恶意扣款',
        score: 10
      }
    ]
  },
  {
    id: 10,
    dimension: 'dim_c',
    title: '薪酬发放与社保公积金的规范性与稳定性？',
    scenario: '每月发薪日以及法定福利的合规程度：',
    options: [
      {
        id: 'A',
        text: '每月准时足额发放，五险一金全额高标准缴纳',
        score: 0
      },
      {
        id: 'B',
        text: '偶尔延迟 1~3 天，但最终都能全额补发到位',
        score: 3
      },
      {
        id: 'C',
        text: '经常无故推迟发薪，年终奖或绩效随意打折克扣',
        score: 7
      },
      {
        id: 'D',
        text: '已经发生连续拖欠工资或断缴社保超过 2 个月',
        score: 10,
        redFlag: 'RF-02'
      }
    ]
  },
  {
    id: 11,
    dimension: 'dim_c',
    title: '绩效考核与升职加薪规则的透明度与公正性？',
    scenario: '当你努力做出突出成果时，拿到奖励的确定性：',
    options: [
      {
        id: 'A',
        text: '考核指标量化清晰，公平公正，出成果就能拿到对应回报',
        score: 0
      },
      {
        id: 'B',
        text: '有一定人情偏向，但总体上依然根据实力与业绩说话',
        score: 4
      },
      {
        id: 'C',
        text: '全凭领导个人喜好或裙带关系决定，黑箱操作严重',
        score: 9
      }
    ]
  },
  {
    id: 12,
    dimension: 'dim_c',
    title: '公司的休假制度与基本劳动关怀保障？',
    scenario: '请年假、病假或合理休息时的公司态度：',
    options: [
      {
        id: 'A',
        text: '制度人性化，带薪假充足，请假自由无需战战兢兢',
        score: 0
      },
      {
        id: 'B',
        text: '规章制度严格，流程较繁琐但大体依法合规',
        score: 3
      },
      {
        id: 'C',
        text: '变相克扣假期，请假如审犯人，甚至连基本劳保均无保障',
        score: 8
      }
    ]
  },

  // ================= 维度 D: 个人成长与未来前景 (3题) =================
  {
    id: 13,
    dimension: 'dim_d',
    title: '在这家公司继续深耕 1~2 年，你的核心竞争力预期？',
    scenario: '评估当前岗位对你个人未来职业身价的赋能价值：',
    options: [
      {
        id: 'A',
        text: '能主导核心大项目，技术/管理技能显著进阶，履历大幅增值',
        score: 0
      },
      {
        id: 'B',
        text: '成为熟练工，在当前岗位游刃有余，但突破性成长有限',
        score: 4
      },
      {
        id: 'C',
        text: '严重退化，每天处理低价值打杂，彻底与外部市场需求脱节',
        score: 9
      }
    ]
  },
  {
    id: 14,
    dimension: 'dim_d',
    title: '公司所在赛道前景与当前整体经营状况？',
    scenario: '公司业务的发展势头与现金流健康度：',
    options: [
      {
        id: 'A',
        text: '朝阳赛道/成长期，业务快速扩张，现金流充沛稳定',
        score: 0
      },
      {
        id: 'B',
        text: '成熟平稳行业，增长乏力但基本盘稳固，短期无倒闭风险',
        score: 4
      },
      {
        id: 'C',
        text: '夕阳衰退行业，业务萎缩严重，开始裁员锁HC或变相赶人',
        score: 9
      }
    ]
  },
  {
    id: 15,
    dimension: 'dim_d',
    title: '公司内部是否有清晰可见的晋升空间与通道？',
    scenario: '向上发展的通道是否通畅：',
    options: [
      {
        id: 'A',
        text: '晋升机制通畅，业务在扩张，上面有明确的发展坑位',
        score: 0
      },
      {
        id: 'B',
        text: '坑位较为饱和，升职较慢，但岗位稳定性较高',
        score: 4
      },
      {
        id: 'C',
        text: '彻底封死天花板，管理层固化，再努力也是原地踏步',
        score: 9
      }
    ]
  },

  // ================= 维度 E: 底气缓冲与抗风险能力 (3题) =================
  // 注意：此维度分数越高代表底气越足 (0=无底气, 10=底气拉满)
  {
    id: 16,
    dimension: 'dim_e',
    title: '若明天零收入，可用活期存款/现金流能支撑多久正常生活？',
    scenario: '个人财务安全跑道储备情况（排除不可变现资产）：',
    options: [
      {
        id: 'A',
        text: '12 个月以上，固定支出可控，或有明确的家庭支持',
        score: 10
      },
      {
        id: 'B',
        text: '6 ~ 12 个月，有一定的可用资金储备',
        score: 7
      },
      {
        id: 'C',
        text: '3 ~ 6 个月，可以支撑一段时间的过渡',
        score: 4
      },
      {
        id: 'D',
        text: '不足 3 个月，或有较高的固定支出与还款负担',
        score: 0
      }
    ]
  },
  {
    id: 17,
    dimension: 'dim_e',
    title: '在当前求职市场中，你所在岗位的竞争度与机会反馈？',
    scenario: '评估个人在劳动力市场中的流通性与吸引力：',
    options: [
      {
        id: 'A',
        text: '近期有猎头接触或内推机会，现有技能与目标岗位较匹配',
        score: 10
      },
      {
        id: 'B',
        text: '有可展示的项目或作品，但还需要验证实际求职反馈',
        score: 6
      },
      {
        id: 'C',
        text: '目标岗位机会较少，或正处于转型期，求职时间不确定',
        score: 2
      }
    ]
  },
  {
    id: 18,
    dimension: 'dim_e',
    title: '你当前的精神耐受力与重新出发的心理能量？',
    scenario: '面对新环境面试、适应新团队的心态储备：',
    options: [
      {
        id: 'A',
        text: '精力充沛，心态积极，对未来充满期待，随时能开启新征程',
        score: 10
      },
      {
        id: 'B',
        text: '有些疲惫，休息后可能有更多精力投入求职',
        score: 6
      },
      {
        id: 'C',
        text: '近期明显疲惫，很难再投入面试或适应新环境，需要先休息',
        score: 2
      }
    ]
  }
]
