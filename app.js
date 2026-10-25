/* 语境词块本 · 应用主体
 *
 * 这里原来写在 ec-chunks-fixed.html 的一个 script 标签里。抽成独立文件是为了能用 CSP 关掉
 * inline script：页面上还有内联 style 属性，所以 style-src 仍留 unsafe-inline，但脚本一旦允许
 * 内联，“转义漏一处”就等于任意代码执行，风险不成比例。
 *
 * 约定：本文件由 ESLint 直接检查（npm run lint）；HTML 里不允许再出现内联脚本，
 * npm run lint:html 会拦。
 */
/* ========== 内置材料（保持原样） ========== */
const LEVEL_LABEL = { beginner:'初级', intermediate:'中级', advanced:'高级' };
const LESSONS = [
  { id:'b1', level:'beginner', topic:'日常生活', title:'A Morning Routine', titleZh:'晨间习惯', minutes:4,
    text:[
      "Every morning, I wake up at seven o'clock. I don't like to get up early, but I have to. First, I brush my teeth and wash my face. Then I make breakfast — usually eggs and toast.",
      "While I eat, I check my phone. I know it's not a good habit, but I can't help it. After breakfast, I get dressed and pack my bag.",
      "I leave home at about eight fifteen. It takes me twenty minutes to walk to the station. On the train, I listen to music or read a book. I try to enjoy this quiet time before work starts.",
      "When I arrive at the office, I make a cup of coffee and say good morning to my colleagues. Then I sit down and look at my to-do list. I pick the most important task and start there. This small routine helps me feel ready for the day."
    ],
    textZh:[
      "每天早上我七点醒来。我不喜欢早起，但又不得不起来。首先，我刷牙、洗脸。然后我做早餐——通常是鸡蛋和吐司。",
      "吃饭的时候，我会看手机。我知道这不是个好习惯，但我就是控制不住。早餐后，我穿好衣服、收拾好包。",
      "我大约八点一刻出门。走到车站要花我二十分钟。在火车上，我听音乐或者看书。我试着享受上班开始前这段安静的时光。",
      "到办公室后，我泡一杯咖啡，跟同事们说早上好。然后我坐下来看我的待办清单。我挑出最重要的任务，从那里开始。这个小小的习惯让我觉得为新的一天做好了准备。"
    ],
    chunks:[
      { chunk:'wake up', sentence:"I wake up at seven o'clock.", meaning:'醒来' },
      { chunk:'get up', sentence:"I don't like to get up early.", meaning:'起床' },
      { chunk:'brush my teeth', sentence:'First, I brush my teeth and wash my face.', meaning:'刷牙' },
      { chunk:'make breakfast', sentence:'Then I make breakfast.', meaning:'做早餐' },
      { chunk:"can't help it", sentence:"I know it's not a good habit, but I can't help it.", meaning:'忍不住／控制不了' },
      { chunk:'get dressed', sentence:'After breakfast, I get dressed and pack my bag.', meaning:'穿好衣服' },
      { chunk:'It takes me', sentence:'It takes me twenty minutes to walk to the station.', meaning:'我花……时间' },
      { chunk:'to-do list', sentence:'Then I sit down and look at my to-do list.', meaning:'待办清单' }
    ],
    quiz:[
      { q:'What does the writer usually make for breakfast?', options:['Rice','Eggs and toast','Only coffee','Nothing'], answer:1, explain:'原文：Then I make breakfast — usually eggs and toast.' },
      { q:'How does the writer get to the station?', options:['By bus','By bike','On foot','By car'], answer:2, explain:'原文：It takes me twenty minutes to walk to the station.' },
      { q:'What does the writer do on the train?', options:['Sleep','Work','Listen to music or read','Eat breakfast'], answer:2, explain:'原文：On the train, I listen to music or read a book.' },
      { q:'What helps the writer feel ready for the day?', options:['Coffee','The small routine','Music','Talking to colleagues'], answer:1, explain:'原文：This small routine helps me feel ready for the day.' }
    ],
    cloze:[
      { before:'I', after:'at seven every morning.', answer:'wake up', hint:'醒来' },
      { before:'It', after:'me twenty minutes to get there.', answer:'takes', hint:'花费' },
      { before:"I know it's a bad habit, but I", after:'help it.', answer:"can't", hint:'忍不住' }
    ]
  },
  { id:'b2', level:'beginner', topic:'日常对话', title:'At the Coffee Shop', titleZh:'在咖啡店', minutes:4,
    text:[
      "Sarah walks into a small coffee shop near her office. It's her first time here. The place smells of fresh coffee and warm bread.",
      "\"Hi, what can I get for you?\" the barista asks with a smile.",
      "\"Can I have a medium latte, please?\" Sarah says. \"And do you have anything to eat? I'm really hungry.\"",
      "\"Sure. We have croissants, muffins, and sandwiches. The chicken sandwich is popular.\"",
      "\"I'll take the chicken sandwich, then. How much is that?\"",
      "\"That's eight dollars fifty.\"",
      "Sarah pays with her card and waits by the counter. A few minutes later, the barista calls her name. \"Medium latte for Sarah!\"",
      "She takes her coffee and sandwich to a table by the window. The sun is shining, and the shop is quiet. She opens her notebook and starts writing. For the first time in weeks, she feels calm.",
      "\"I think I'll come here again,\" she says to herself."
    ],
    textZh:[
      "Sarah 走进办公室附近一家小小的咖啡店。这是她第一次来这里。店里弥漫着新鲜咖啡和热面包的香味。",
      "\"你好，您要点什么？\"咖啡师微笑着问道。",
      "\"请给我一杯中杯拿铁，好吗？\"Sarah 说，\"另外你们有什么吃的吗？我真的很饿。\"",
      "\"当然有。我们有可颂、玛芬和三明治。鸡肉三明治很受欢迎。\"",
      "\"那我要鸡肉三明治吧。多少钱？\"",
      "\"八块五。\"",
      "Sarah 刷卡付了钱，在柜台旁等着。几分钟后，咖啡师叫了她的名字：\"Sarah 的中杯拿铁！\"",
      "她端着咖啡和三明治走到靠窗的桌子。阳光正好，店里很安静。她打开笔记本开始写东西。这是几周以来，她第一次感到平静。",
      "\"我想我还会再来这里，\"她自言自语道。"
    ],
    chunks:[
      { chunk:'smells of', sentence:'The place smells of fresh coffee and warm bread.', meaning:'有……的气味' },
      { chunk:'what can I get for you?', sentence:'"Hi, what can I get for you?" the barista asks.', meaning:'您要点什么？' },
      { chunk:'Can I have', sentence:'"Can I have a medium latte, please?"', meaning:'我可以要……吗？' },
      { chunk:"I'll take", sentence:'"I\'ll take the chicken sandwich, then."', meaning:'我要……' },
      { chunk:'How much is that?', sentence:'"How much is that?"', meaning:'多少钱？' },
      { chunk:'pay with her card', sentence:'Sarah pays with her card and waits by the counter.', meaning:'刷卡付钱' },
      { chunk:'for the first time', sentence:'For the first time in weeks, she feels calm.', meaning:'第一次' },
      { chunk:'says to herself', sentence:'"I think I\'ll come here again," she says to herself.', meaning:'自言自语' }
    ],
    quiz:[
      { q:'Where is the coffee shop?', options:["Near Sarah's home",'Near her office','In a mall','At a station'], answer:1, explain:'原文：Sarah walks into a small coffee shop near her office.' },
      { q:'What does Sarah order to eat?', options:['A croissant','A muffin','A chicken sandwich','Only bread'], answer:2, explain:'原文：I\'ll take the chicken sandwich, then.' },
      { q:'How does Sarah pay?', options:['With cash','With her card','With her phone','With a check'], answer:1, explain:'原文：Sarah pays with her card.' },
      { q:'How does Sarah feel at the end?', options:['Stressed','Calm','Angry','Tired'], answer:1, explain:'原文：For the first time in weeks, she feels calm.' }
    ],
    cloze:[
      { before:'The place', after:'of fresh coffee.', answer:'smells', hint:'有……的气味' },
      { before:'', after:'I have a medium latte?', answer:'Can', hint:'我可以要……吗' },
      { before:'', after:'much is that?', answer:'How', hint:'多少钱' }
    ]
  },
  { id:'i1', level:'intermediate', topic:'兴趣与坚持', title:'Why I Started Running', titleZh:'我为什么开始跑步', minutes:5,
    text:[
      "Three years ago, I couldn't run for more than two minutes without getting out of breath. I was sitting at a desk all day, and my back hurt constantly. One evening, a friend invited me to join a short run in the park. I almost said no, but something made me agree.",
      "The first run was terrible. My legs felt heavy, and I kept checking my watch, hoping it would be over soon. But when I finished, I felt a strange sense of achievement. I had done something difficult, and I hadn't given up.",
      "I decided to keep going. At first, I ran twice a week. I didn't care about speed — I just wanted to show up. Slowly, my body got used to it. After a month, I could run for fifteen minutes without stopping. After three months, I signed up for a 5K race.",
      "Running has changed more than my body. It has taught me that progress is rarely fast. On days when I don't feel like going out, I remind myself that I've never regretted a run. I've only regretted the days I stayed on the sofa.",
      "Now running is part of who I am. It's not about being the fastest. It's about keeping a promise to myself."
    ],
    textZh:[
      "三年前，我跑不了两分钟就上气不接下气。我整天坐在书桌前，背一直在疼。一天晚上，一个朋友邀请我去公园跑一小段。我差点就拒绝了，但不知怎么的，我答应了。",
      "第一次跑步很糟糕。我的腿很沉，我不断看表，希望快点结束。但跑完之后，我感到一种奇怪的成就感。我做成了一件很难的事，而且我没有放弃。",
      "我决定继续下去。一开始，我每周跑两次。我不在乎速度——我只想出现在那里。慢慢地，我的身体习惯了。一个月后，我能不停地跑十五分钟。三个月后，我报名参加了一场 5 公里比赛。",
      "跑步改变的不只是我的身体。它教会我，进步很少是快速的。在我不想出门的日子里，我提醒自己，我从来没有后悔跑过步。我只后悔过待在沙发上的那些天。",
      "现在跑步已经是我的一部分。它跟跑得最快无关，而是关于信守对自己的承诺。"
    ],
    chunks:[
      { chunk:'out of breath', sentence:"I couldn't run for more than two minutes without getting out of breath.", meaning:'上气不接下气' },
      { chunk:'constantly', sentence:'My back hurt constantly.', meaning:'不断地／一直' },
      { chunk:'say no', sentence:'I almost said no, but something made me agree.', meaning:'拒绝' },
      { chunk:'a sense of achievement', sentence:'I felt a strange sense of achievement.', meaning:'成就感' },
      { chunk:'give up', sentence:"I had done something difficult, and I hadn't given up.", meaning:'放弃' },
      { chunk:'keep going', sentence:'I decided to keep going.', meaning:'坚持下去' },
      { chunk:'care about', sentence:"I didn't care about speed.", meaning:'在意' },
      { chunk:'get used to', sentence:'Slowly, my body got used to it.', meaning:'习惯' },
      { chunk:'sign up for', sentence:'After three months, I signed up for a 5K race.', meaning:'报名参加' },
      { chunk:'feel like', sentence:"On days when I don't feel like going out...", meaning:'想要' },
      { chunk:'remind myself', sentence:'I remind myself that I have never regretted a run.', meaning:'提醒自己' },
      { chunk:'regret', sentence:"I've never regretted a run.", meaning:'后悔' },
      { chunk:'keep a promise', sentence:"It's about keeping a promise to myself.", meaning:'遵守承诺' }
    ],
    quiz:[
      { q:'Why did the writer start running?', options:["Doctor's advice",'A friend invited him','He wanted to lose weight','He was training for a race'], answer:1, explain:'原文：One evening, a friend invited me to join a short run in the park.' },
      { q:'How did the first run feel?', options:['Easy','Terrible','Exciting','Too short'], answer:1, explain:'原文：The first run was terrible.' },
      { q:'What did the writer care about at first?', options:['Speed','Distance','Showing up','Time'], answer:2, explain:'原文：I just wanted to show up.' },
      { q:'What has running taught the writer?', options:['Progress is rarely fast','Speed is everything','Running is easy','Rest is more important'], answer:0, explain:'原文：It has taught me that progress is rarely fast.' },
      { q:'What does the writer never regret?', options:['The days on the sofa','A run','The first race','Resting'], answer:1, explain:'原文：I\'ve never regretted a run.' }
    ],
    cloze:[
      { before:'I could not run without getting out of', after:'.', answer:'breath', hint:'上气不接下气' },
      { before:'I decided to keep', after:'.', answer:'going', hint:'坚持' },
      { before:"I've never", after:'a run.', answer:'regretted', hint:'后悔' }
    ]
  },
  { id:'i2', level:'intermediate', topic:'学习与成长', title:'Learning a New Skill', titleZh:'学一门新技能', minutes:5,
    text:[
      "Last year, I decided to learn how to play the guitar. I had wanted to do it for years, but I always found an excuse. I was too busy, too old, or simply not talented enough.",
      "This time, I set a small goal: practice for ten minutes every day. Ten minutes felt almost too easy, but that was the point. I wanted to build the habit first, not become a musician overnight.",
      "The beginning was frustrating. My fingers hurt, and the sounds I made were awful. I often compared myself to people online who seemed to learn in weeks. But then I reminded myself that everyone starts somewhere.",
      "After two months, something changed. I could play a few simple songs, and the pain in my fingers had mostly gone. More importantly, I started to enjoy the process. I stopped worrying about how fast I was learning.",
      "Looking back, I think the secret was consistency. Ten minutes a day added up to more than five hours a month. It wasn't much, but it was steady. And steady, it turns out, is what actually gets you there."
    ],
    textZh:[
      "去年，我决定学弹吉他。我想学这个已经想了很多年，但我总能找到借口。我太忙、太老了，或者就是不够有天赋。",
      "这一次，我设了一个小目标：每天练十分钟。十分钟感觉几乎太容易了，但这正是关键。我想先养成习惯，而不是一夜之间成为音乐家。",
      "开始的时候很让人挫败。我的手指疼，弹出来的声音也很难听。我常常拿自己跟网上那些似乎几周就能学会的人比较。但后来我提醒自己，每个人都是从某个地方起步的。",
      "两个月后，有些东西变了。我能弹几首简单的歌，手指的疼痛也基本消失了。更重要的是，我开始享受这个过程。我不再担心自己学得有多快。",
      "回头看，我认为秘诀就是坚持。每天十分钟加起来，一个月超过五小时。这不算多，但很稳定。而稳定，事实证明，才是真正带你到达目标的东西。"
    ],
    chunks:[
      { chunk:'find an excuse', sentence:'I always found an excuse.', meaning:'找借口' },
      { chunk:'talented', sentence:'I was too busy, too old, or simply not talented enough.', meaning:'有天赋的' },
      { chunk:'set a goal', sentence:'This time, I set a small goal.', meaning:'设定目标' },
      { chunk:'that was the point', sentence:'Ten minutes felt almost too easy, but that was the point.', meaning:'这正是关键' },
      { chunk:'overnight', sentence:'I wanted to build the habit first, not become a musician overnight.', meaning:'一夜之间' },
      { chunk:'compare myself to', sentence:'I often compared myself to people online.', meaning:'拿自己跟……比较' },
      { chunk:'starts somewhere', sentence:'I reminded myself that everyone starts somewhere.', meaning:'从某处起步' },
      { chunk:'Looking back', sentence:'Looking back, I think the secret was consistency.', meaning:'回顾' },
      { chunk:'add up to', sentence:'Ten minutes a day added up to more than five hours a month.', meaning:'加起来达到' },
      { chunk:'consistency', sentence:'I think the secret was consistency.', meaning:'坚持／连贯' },
      { chunk:'steady', sentence:"It wasn't much, but it was steady.", meaning:'稳定的' },
      { chunk:'get you there', sentence:'Steady is what actually gets you there.', meaning:'让你达到目标' }
    ],
    quiz:[
      { q:"Why didn't the writer learn guitar earlier?", options:['No money','Always found an excuse','No teacher','Too old'], answer:1, explain:'原文：I always found an excuse.' },
      { q:'What was the daily goal?', options:['30 minutes','1 hour','10 minutes','5 minutes'], answer:2, explain:'原文：practice for ten minutes every day.' },
      { q:'What happened after two months?', options:['He quit','He could play simple songs','He became famous','His fingers still hurt badly'], answer:1, explain:'原文：After two months... I could play a few simple songs.' },
      { q:'What was the secret?', options:['Talent','Money','Consistency','A good teacher'], answer:2, explain:'原文：I think the secret was consistency.' }
    ],
    cloze:[
      { before:'I always found an', after:'.', answer:'excuse', hint:'借口' },
      { before:'I set a small', after:'.', answer:'goal', hint:'目标' },
      { before:'Ten minutes a day', after:'up to more than five hours a month.', answer:'added', hint:'加起来' }
    ]
  },
  { id:'a1', level:'advanced', topic:'科普', title:'The Science of Habits', titleZh:'习惯的科学', minutes:6,
    text:[
      "Every day, roughly forty percent of what we do is driven by habit rather than conscious decision. We don't decide to brush our teeth or check our phones; these actions unfold automatically, triggered by cues we barely notice.",
      "Neuroscientists describe habits as loops with three parts: a cue, a routine, and a reward. The cue signals the brain to enter automatic mode. The routine is the behavior itself. The reward tells the brain whether this loop is worth remembering. Over time, the cue and reward become intertwined until a powerful sense of anticipation emerges.",
      "This explains why habits are so hard to break. They aren't just behaviors; they're neural pathways that have been reinforced thousands of times. Willpower alone rarely works, because it demands conscious effort against an automatic process.",
      "But the same mechanism that makes habits stubborn also makes them useful. If we can design the right cues and rewards, we can build habits that work for us rather than against us. Research suggests that the most effective approach is to start small — so small that the behavior feels almost trivial. The goal is not intensity but repetition, because it is repetition that rewires the brain.",
      "In other words, lasting change is rarely dramatic. It is quiet, cumulative, and often invisible in the moment."
    ],
    textZh:[
      "每一天，我们所做的事情中大约有百分之四十是由习惯而非有意识的决定所驱动的。我们并不会决定去刷牙或者看手机；这些行为自动地展开，由我们几乎注意不到的线索触发。",
      "神经科学家把习惯描述为由三部分组成的回路：线索、惯例和奖励。线索示意大脑进入自动模式。惯例是行为本身。奖励则告诉大脑这个回路是否值得记住。随着时间推移，线索和奖励交织在一起，直到一种强烈的期待感浮现出来。",
      "这就解释了为什么习惯如此难以打破。它们不只是行为，而是被强化了数千次的神经通路。单靠意志力很少管用，因为它要求在自动化的过程面前付出有意识的努力。",
      "但让习惯变得顽固的同一套机制，也让它们变得有用。如果我们能设计出正确的线索和奖励，就能建立起为我们服务、而不是与我们作对的习惯。研究表明，最有效的方法是：从小处开始——小到这种行为感觉几乎微不足道。目标不是强度，而是重复，因为是重复在重塑大脑。",
      "换句话说，持久的改变很少是戏剧性的。它是安静的、累积的，而且常常在当下不可见。"
    ],
    chunks:[
      { chunk:'driven by', sentence:'Forty percent of what we do is driven by habit.', meaning:'由……驱动' },
      { chunk:'rather than', sentence:'Driven by habit rather than conscious decision.', meaning:'而不是' },
      { chunk:'unfold automatically', sentence:'These actions unfold automatically.', meaning:'自动展开' },
      { chunk:'triggered by', sentence:'Triggered by cues we barely notice.', meaning:'由……触发' },
      { chunk:'intertwined', sentence:'The cue and reward become intertwined.', meaning:'交织在一起' },
      { chunk:'anticipation', sentence:'A powerful sense of anticipation emerges.', meaning:'期待' },
      { chunk:'neural pathways', sentence:"They're neural pathways that have been reinforced.", meaning:'神经通路' },
      { chunk:'reinforced', sentence:'Neural pathways that have been reinforced thousands of times.', meaning:'被强化' },
      { chunk:'willpower', sentence:'Willpower alone rarely works.', meaning:'意志力' },
      { chunk:'stubborn', sentence:'The same mechanism that makes habits stubborn also makes them useful.', meaning:'顽固的' },
      { chunk:'cumulative', sentence:'It is quiet, cumulative, and often invisible.', meaning:'累积的' },
      { chunk:'In other words', sentence:'In other words, lasting change is rarely dramatic.', meaning:'换句话说' }
    ],
    quiz:[
      { q:'What percentage of daily actions is driven by habit?', options:['20%','40%','60%','80%'], answer:1, explain:'原文：roughly forty percent of what we do is driven by habit.' },
      { q:'Which is NOT part of the habit loop?', options:['Cue','Routine','Reward','Punishment'], answer:3, explain:'原文：a cue, a routine, and a reward —— 三个部分，没有 punishment。' },
      { q:'Why is willpower alone rarely enough?', options:["It's too strong",'It demands conscious effort',"It's unlimited","It's automatic"], answer:1, explain:'原文：it demands conscious effort against an automatic process.' },
      { q:'What is the most effective approach to building habits?', options:['Start small','Go intense','Rely on willpower','Avoid rewards'], answer:0, explain:'原文：the most effective approach is to start small.' },
      { q:'What rewires the brain?', options:['Intensity','Repetition','Rest','Punishment'], answer:1, explain:'原文：it is repetition that rewires the brain.' }
    ],
    cloze:[
      { before:'Forty percent of what we do is', after:'by habit.', answer:'driven', hint:'驱动' },
      { before:'Habits are neural pathways that have been', after:'.', answer:'reinforced', hint:'强化' },
      { before:'Lasting change is quiet and', after:'.', answer:'cumulative', hint:'累积的' }
    ]
  },
  { id:'a2', level:'advanced', topic:'观点讨论', title:'Remote Work: Freedom or Isolation?', titleZh:'远程办公：自由还是孤立？', minutes:6,
    text:[
      "When the pandemic forced millions of people to work from home, it seemed like a temporary experiment. Five years later, remote work has become a permanent feature of many industries — and a source of ongoing debate.",
      "Supporters point to clear benefits. Without a commute, employees reclaim hours each week. They report greater control over their schedules and fewer interruptions. Companies save on office space, and hiring is no longer limited by geography. For many, remote work has made it possible to balance career and family in ways that were previously unimaginable.",
      "Critics, however, warn of subtler costs. Remote workers often struggle to disconnect; the boundary between office and home dissolves. Informal conversations — the kind that spark new ideas — happen less often. New employees, in particular, may find it hard to learn the unwritten rules of a workplace they rarely visit. Some studies suggest that remote collaboration reduces spontaneous innovation.",
      "The evidence is mixed, and the answer likely depends on the work itself. A software engineer writing code alone may thrive at home. A team designing a product together may lose something essential. What matters most, researchers argue, is not whether work is remote, but whether it is intentional — designed with the work's real needs in mind, rather than simply carried over from an office.",
      "In the end, remote work is neither a paradise nor a prison. It is a tool, and like any tool, its value depends on how deliberately we use it."
    ],
    textZh:[
      "当疫情迫使数百万人居家办公时，这看起来像是一场临时的实验。五年之后，远程办公已经成为许多行业的一项永久特征——也是持续争论的来源。",
      "支持者指出了显而易见的好处。没有了通勤，员工每周能重新赢回好几个小时。他们表示对日程有更强的掌控，被打断的次数也更少。公司节省了办公空间，招聘也不再受地理位置的限制。对许多人来说，远程办公让平衡事业与家庭成为可能，而这在以前是难以想象的。",
      "然而，批评者警告说，还有更微妙的代价。远程工作者常常难以真正“断开连接”；办公室与家之间的界限消失了。那种能激发新想法的非正式交谈，发生得越来越少。尤其是新员工，可能会发现很难学会一个他们很少到访的职场里的潜规则。一些研究表明，远程协作减少了自发性的创新。",
      "证据是混杂的，答案很可能取决于工作本身。一个独自写代码的软件工程师可能在家如鱼得水。而一个共同设计产品的团队，可能会失去某些本质的东西。研究人员认为，最重要的不是工作是否远程，而是它是否是有意为之——围绕工作的真实需求来设计，而不是简单地从办公室照搬过来。",
      "最终，远程办公既不是天堂，也不是牢笼。它是一种工具，而像任何工具一样，它的价值取决于我们有多有意识地使用它。"
    ],
    chunks:[
      { chunk:'point to', sentence:'Supporters point to clear benefits.', meaning:'指出' },
      { chunk:'reclaim', sentence:'Without a commute, employees reclaim hours each week.', meaning:'重新获得' },
      { chunk:'interruptions', sentence:'They report greater control and fewer interruptions.', meaning:'打扰' },
      { chunk:'previously unimaginable', sentence:'In ways that were previously unimaginable.', meaning:'以前难以想象的' },
      { chunk:'warn of', sentence:'Critics, however, warn of subtler costs.', meaning:'警告' },
      { chunk:'disconnect', sentence:'Remote workers often struggle to disconnect.', meaning:'断开连接／放松' },
      { chunk:'the boundary dissolves', sentence:'The boundary between office and home dissolves.', meaning:'界限消失' },
      { chunk:'spark new ideas', sentence:'Informal conversations spark new ideas.', meaning:'激发新想法' },
      { chunk:'unwritten rules', sentence:'Learn the unwritten rules of a workplace.', meaning:'潜规则' },
      { chunk:'spontaneous', sentence:'Remote collaboration reduces spontaneous innovation.', meaning:'自发的' },
      { chunk:'the evidence is mixed', sentence:'The evidence is mixed.', meaning:'证据不一' },
      { chunk:'thrive', sentence:'A software engineer may thrive at home.', meaning:'茁壮成长' },
      { chunk:'intentional', sentence:'What matters is whether it is intentional.', meaning:'有意的' },
      { chunk:'In the end', sentence:'In the end, remote work is neither a paradise nor a prison.', meaning:'最终' }
    ],
    quiz:[
      { q:'What do supporters say about remote work?', options:['It saves commute time','It reduces pay','It increases interruptions','It limits hiring'], answer:0, explain:'原文：Without a commute, employees reclaim hours each week.' },
      { q:'What is a subtle cost critics mention?', options:['Higher salaries','Difficulty disconnecting','More commute','Larger offices'], answer:1, explain:'原文：Remote workers often struggle to disconnect.' },
      { q:'According to researchers, what matters most?', options:['Whether work is remote','Office size',"Whether it's intentional",'Company age'], answer:2, explain:'原文：whether it is intentional.' },
      { q:"What is the writer's conclusion?", options:['Remote work is always better','Remote work is a tool','Offices should return','Remote work is temporary'], answer:1, explain:'原文：It is a tool, and like any tool, its value depends on how deliberately we use it.' }
    ],
    cloze:[
      { before:'Employees', after:'hours each week.', answer:'reclaim', hint:'重新获得' },
      { before:'The boundary between office and home', after:'.', answer:'dissolves', hint:'消失' },
      { before:'The evidence is', after:'.', answer:'mixed', hint:'不一的' }
    ]
  }
];

/* ========== 内置词典 ========== */
const CHUNK_GLOSSARY = {
  "wake up":"醒来","get up":"起床","give up":"放弃","keep going":"继续/坚持","look for":"寻找","find out":"查明","take care of":"照顾","come up with":"想出","put off":"推迟","turn on":"打开","turn off":"关闭","carry out":"执行","break down":"出故障","break up":"分手","call off":"取消","check out":"结账","cheer up":"振作","clean up":"清理","come across":"偶遇","cut down":"削减","deal with":"处理","depend on":"依赖","eat out":"外出就餐","end up":"最终","fall asleep":"入睡","fall behind":"落后","figure out":"弄清楚","fill in":"填写","fill out":"填表","focus on":"专注","get along":"相处","get away":"离开","get back":"回来","get in":"进入","get off":"下车","get on":"上车","get out":"出去","get over":"克服","get through":"熬过","give in":"屈服","give out":"分发","go ahead":"继续","go away":"走开","go back":"回去","go on":"继续","go out":"出去","go over":"复习","grow up":"长大","hand in":"上交","hand out":"分发","hang out":"闲逛","hang up":"挂电话","hold on":"稍等","hurry up":"快点","keep on":"继续","keep up":"跟上","lay off":"解雇","let down":"让失望","look after":"照顾","look at":"看","look forward to":"期待","look into":"调查","look out":"小心","look up":"查阅","make up":"编造","move on":"继续前进","pass away":"去世","pass out":"昏倒","pay back":"偿还","pick up":"拿起","point out":"指出","put away":"收起","put down":"放下","put on":"穿上","put up":"举起","run away":"逃跑","run into":"偶遇","run out of":"用完","set off":"出发","set up":"建立","show up":"出现","shut down":"关闭","sit down":"坐下","stand up":"站起来","stay up":"熬夜","take away":"拿走","take off":"起飞","take on":"承担","take over":"接管","take up":"占用","talk about":"谈论","think about":"考虑","throw away":"扔掉","try on":"试穿","try out":"尝试","turn around":"转身","turn down":"拒绝","turn into":"变成","turn out":"结果","turn up":"出现","warm up":"热身","work out":"锻炼","write down":"写下",
  "a sense of achievement":"成就感","to-do list":"待办清单","out of breath":"上气不接下气","in the end":"最终","in other words":"换句话说","at first":"起初","at least":"至少","at once":"立刻","by chance":"偶然","for example":"例如","in fact":"事实上","in front of":"在……前面","in general":"通常","in order to":"为了","on purpose":"故意","on time":"准时","right away":"立刻","so far":"到目前为止","as well":"也","at all":"根本","at last":"最后","in addition":"此外","in advance":"提前","in charge of":"负责","in common":"共同","in danger":"处于危险中","in detail":"详细地","in need":"需要","in public":"公开地","in return":"作为回报","in short":"简而言之","in time":"及时","in trouble":"有麻烦","of course":"当然","on average":"平均","on foot":"步行","on sale":"出售","on the other hand":"另一方面","on the way":"在路上","out of date":"过时","out of order":"出故障","out of work":"失业","up to date":"最新的","as a result":"结果","as usual":"像往常一样","at the same time":"同时","by the way":"顺便说","first of all":"首先","in my opinion":"我认为","no longer":"不再","to be honest":"老实说","what's more":"而且",
  "make a decision":"做决定","make a difference":"有影响","make a living":"谋生","make a mistake":"犯错","make friends":"交朋友","make money":"赚钱","make sense":"有意义","make sure":"确保","take a break":"休息","take a look":"看一看","take a walk":"散步","take action":"行动","take care":"保重","take place":"发生","take part in":"参加","take pride in":"以……为荣","take time":"花时间","pay attention to":"注意","get in touch":"联系","keep in touch":"保持联系","keep calm":"保持冷静","keep quiet":"保持安静","keep a promise":"信守承诺","lose weight":"减肥","catch a cold":"感冒","have fun":"玩得开心","have to":"必须","used to":"过去常常","can't help it":"忍不住","can't help":"忍不住",
  "be aware of":"意识到","be fond of":"喜欢","be good at":"擅长","be interested in":"对……感兴趣","be proud of":"自豪","be ready for":"准备好","be responsible for":"负责","be similar to":"相似","be used to":"习惯","be afraid of":"害怕","be busy with":"忙于","be different from":"不同","be famous for":"著名","be full of":"充满","be known for":"闻名","be short of":"缺少","be sure about":"确定","be tired of":"厌倦","be worried about":"担心",
  "constantly":"不断地","talented":"有天赋","overnight":"一夜之间","consistency":"坚持","steady":"稳定","regret":"后悔","willpower":"意志力","stubborn":"顽固","cumulative":"累积","anticipation":"期待","intertwined":"交织","reinforced":"强化","spontaneous":"自发","intentional":"有意","thrive":"茁壮成长","reclaim":"重新获得","interruptions":"打扰","disconnect":"断开连接","smells of":"有……的气味","says to herself":"自言自语","looking back":"回顾","starts somewhere":"从某处起步","that was the point":"这正是关键","get you there":"让你达到目标","the evidence is mixed":"证据不一","unwritten rules":"潜规则","neural pathways":"神经通路","driven by":"由……驱动","rather than":"而不是","triggered by":"由……触发","set a goal":"设定目标","find an excuse":"找借口","compare myself to":"跟……比较","add up to":"加起来达到","sign up for":"报名参加","care about":"在意","feel like":"想要","remind myself":"提醒自己","brush my teeth":"刷牙","make breakfast":"做早餐","get dressed":"穿好衣服","point to":"指出","warn of":"警告","spark new ideas":"激发新想法","the boundary dissolves":"界限消失","previously unimaginable":"以前难以想象","unfold automatically":"自动展开"
};

/* ========== 工具 ========== */
const $  = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
const WEEKDAYS = ['周日','周一','周二','周三','周四','周五','周六'];
function esc(s){ return String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
function escapeRegExp(s){ return String(s).replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }
function uid(){ return Date.now().toString(36) + Math.random().toString(36).slice(2, 7); }
function fmtDate(dt){ return dt.getFullYear() + '-' + String(dt.getMonth()+1).padStart(2,'0') + '-' + String(dt.getDate()).padStart(2,'0'); }
function todayStr(){ return fmtDate(new Date()); }
function addDays(dateStr, n){ const [y,m,d] = dateStr.split('-').map(Number); const dt = new Date(y, m-1, d); dt.setDate(dt.getDate() + n); return fmtDate(dt); }
function lastNDays(n){ const arr=[], base=todayStr(); for(let i=n-1;i>=0;i--) arr.push(addDays(base,-i)); return arr; }
function shuffle(arr){ const a = arr.slice(); for (let i = a.length - 1; i > 0; i--){ const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
function sleep(ms){ return new Promise(r => setTimeout(r, ms)); }
let toastTimer = null;
function toast(msg, action){
  const el = $('#toast');
  if (!el) return;
  if (action && action.label && typeof action.run === 'function'){
    el.classList.add('has-act');
    el.innerHTML = '';
    const span = document.createElement('span');
    span.textContent = msg;
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'toast-act';
    btn.textContent = action.label;
    btn.onclick = () => { el.classList.remove('show', 'has-act'); clearTimeout(toastTimer); action.run(); };
    el.appendChild(span);
    el.appendChild(btn);
  } else {
    el.classList.remove('has-act');
    el.textContent = msg;
  }
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), action ? 7000 : 2600);
}

/* ========== 朗读（浏览器自带语音合成） ========== */
let speechVoice = null;
function pickEnVoice(){
  try{
    const vs = (window.speechSynthesis && window.speechSynthesis.getVoices()) || [];
    speechVoice = vs.find(v => /^en[-_]/i.test(v.lang)) || null;
  }catch(e){ speechVoice = null; }
  return speechVoice;
}
function speak(text, lang){
  const t = String(text || '').trim();
  if (!t) return;
  if (!window.speechSynthesis || typeof SpeechSynthesisUtterance === 'undefined'){ toast('当前浏览器不支持朗读'); return; }
  try{
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(t);
    u.lang = lang || 'en-US';
    u.rate = 0.95;
    const v = speechVoice || pickEnVoice();
    if (v) u.voice = v;
    window.speechSynthesis.speak(u);
  }catch(e){ toast('朗读失败'); }
}
function speakBtn(text, lang){
  const t = String(text || '').trim();
  if (!t) return '';
  return `<button class="spk" type="button" data-speak="${esc(t)}" data-lang="${esc(lang || 'en-US')}" title="朗读" aria-label="朗读">🔊</button>`;
}

/* ========== 分段（按 . ! ? 切分） ========== */
/* 用「匹配位置」计算剩余尾巴，避免原先「join 后 replace/slice」在句间有空格时错位 */
function splitByRegex(text, re){
  const clean = String(text || '').replace(/\s+/g, ' ').trim();
  if (!clean) return [];
  re.lastIndex = 0;
  const out = [];
  let last = 0, m;
  while ((m = re.exec(clean)) !== null){
    if (m[0] === ''){ re.lastIndex++; continue; }
    const s = m[0].trim();
    if (s) out.push(s);
    last = m.index + m[0].length;
  }
  if (!out.length) return [clean];
  const remaining = clean.slice(last).trim();
  if (remaining) out.push(remaining);
  return out;
}
function splitEnglishSentences(text){
  return splitByRegex(text, /[^.!?]+[.!?]+["'”’]?/g);
}

function splitChineseSentences(text){
  return splitByRegex(text, /[^。！？!?]+[。！？!?]+["'”’]?/g);
}

function alignSentences(en, zh){
  const n = Math.max(en.length, zh.length);
  const outEn = [], outZh = [];
  for (let i = 0; i < n; i++){
    const e = (en[i] || '').trim();
    const z = (zh[i] || '').trim();
    if (!e && !z) continue;
    outEn.push(e);
    outZh.push(z);
  }
  return { en: outEn, zh: outZh };
}

/* ========== 在线翻译 ========== */
async function fetchWithTimeout(url, ms = 12000){
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), ms);
  try { return await fetch(url, { signal: ctrl.signal }); }
  finally { clearTimeout(timer); }
}

/* 同一句只翻一次：既省时间，也避免免费接口限流 */
const transCache = new Map();
async function translateOne(text){
  const q = String(text || '').trim();
  if (!q) return '';
  if (transCache.has(q)) return transCache.get(q);
  const out = await translateOneRaw(q);
  if (out){
    if (transCache.size >= 600) transCache.clear();
    transCache.set(q, out);
  }
  return out;
}
async function translateOneRaw(q){
  try {
    const url = 'https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=zh-CN&dt=t&q=' + encodeURIComponent(q);
    const res = await fetchWithTimeout(url, 9000);
    if (res.ok){
      const data = await res.json();
      if (Array.isArray(data) && Array.isArray(data[0])){
        const out = data[0].map(x => Array.isArray(x) ? x[0] : '').join('').trim();
        if (out) return out;
      }
    }
  } catch(e){}
  try {
    const chunk = q.slice(0, 480);
    const url = 'https://api.mymemory.translated.net/get?q=' + encodeURIComponent(chunk) + '&langpair=en|zh-CN';
    const res = await fetchWithTimeout(url, 9000);
    if (res.ok){
      const data = await res.json();
      if (data && data.responseData && data.responseData.translatedText){
        const out = String(data.responseData.translatedText).trim();
        if (out && !/MYMEMORY WARNING/i.test(out)) return out;
      }
    }
  } catch(e){}
  return '';
}

async function translateSentences(sentences, onProgress){
  const results = [];
  for (let i = 0; i < sentences.length; i++){
    const t = await translateOne(sentences[i]);
    results.push(t || '');
    if (onProgress) onProgress(i + 1, sentences.length);
    await sleep(100);
  }
  return results;
}

async function translateChunkMeaning(chunk){
  const q = String(chunk || '').trim();
  if (!q) return '';
  const cached = lookupGloss(q);
  if (cached) return cached;
  const t = await translateOne(q);
  if (!t) return '';
  return t.replace(/[。，、；：！？\s]+$/g, '').replace(/^[\s。，、；：！？]+/, '').trim();
}

/* ---------- 会落盘的译文缓存 ----------
   翻译接口偶尔抽风，但更常见的是同一段英文被反复翻：同一课重开一次、同一道题的解析点两次。
   只放在内存 Map 里，关掉程序就没了，下次还得再等一遍网络。这里把它存进 state.trCache：
   重开程序、甚至离线，都能直接看到以前翻过的中文。 */
function trCacheGet(text){
  const q = String(text || '').replace(/\s+/g, ' ').trim();
  if (!q) return '';
  const hit = state.trCache && state.trCache[q];
  return typeof hit === 'string' ? hit : '';
}
function trCacheSet(en, zh){
  const q = String(en || '').replace(/\s+/g, ' ').trim();
  const out = String(zh || '').trim();
  if (!q || !out) return;
  if (!state.trCache || typeof state.trCache !== 'object') state.trCache = {};
  const keys = Object.keys(state.trCache);
  if (keys.length >= TR_CACHE_MAX && !(q in state.trCache)) delete state.trCache[keys[0]];
  state.trCache[q.slice(0, 400)] = out.slice(0, 600);
}
/* 先查本机缓存，再走网络，翻到就落盘。界面上所有「显示成中文」的地方都走这一个入口。 */
async function stateTranslate(text){
  const q = String(text || '').replace(/\s+/g, ' ').trim();
  if (!q) return '';
  const hit = trCacheGet(q);
  if (hit) return hit;
  const t = await translateOne(q);
  if (t){ trCacheSet(q, t); saveState(); }
  return t;
}

/* ========== 存储 ========== */
const STORE_KEY = 'ecChunksApp_v3';
const OLD_KEY_V2 = 'ecChunksApp_v2';
const OLD_KEY_V1 = 'ecChunksApp_v1';
/* 4 = 新增 state.mistakes（错题本）。旧版本的程序读不到这个字段，合并云端数据时会把错题本
   整段抹掉，所以版本号要抬上去——让旧版本走「数据比你新，先导出备份」的提示，而不是静默丢数据。
   5 = 新增 state.trCache（译文缓存）。同样理由：旧版读不到，云端整盘合并会把它清空，
   等于每次启动都要重新联网翻译一遍。 */
const DATA_VERSION = 5;
let storageOK = true;

function defaultState(){ return { version: DATA_VERSION, chunks:[], logs:{}, streak:0, lastActive:null, settings:{ currentWeek:1 }, customLessons:[], trash:[], progress:{}, lessonEdits:{}, deletedLessons:{}, mistakes:{}, deletedMistakes:{}, trCache:{} }; }
function normalizeChunk(c){
  return { id:c.id||uid(), sentence:c.sentence||'', chunk:c.chunk||'', meaning:c.meaning||'', mine:c.mine||'', source:c.source||'', added:c.added||todayStr(), nextReview:c.nextReview||todayStr(), stage:Number.isFinite(c.stage)?c.stage:0, mastered:!!c.mastered, lastReviewed:c.lastReviewed||null };
}
function normalizeLesson(l){
  const text = Array.isArray(l.text) ? l.text.filter(Boolean) : (typeof l.text === 'string' ? l.text.split(/\n\s*\n/).map(s=>s.trim()).filter(Boolean) : []);
  const textZh = Array.isArray(l.textZh) ? l.textZh : (typeof l.textZh === 'string' ? l.textZh.split(/\n\s*\n/).map(s=>s.trim()).filter(Boolean) : []);
  const aligned = alignSentences(text, textZh);
  return {
    id: l.id || ('custom_' + uid()), custom: true,
    level: ['beginner','intermediate','advanced'].includes(l.level)?l.level:'intermediate',
    topic: l.topic || '', title: l.title || '未命名文章', titleZh: l.titleZh || '',
    minutes: Number.isFinite(l.minutes) && l.minutes > 0 ? l.minutes : 3,
    text: aligned.en, textZh: aligned.zh,
    chunks: Array.isArray(l.chunks) ? l.chunks.filter(Boolean) : [],
    quiz: Array.isArray(l.quiz) ? l.quiz.filter(Boolean) : [],
    cloze: Array.isArray(l.cloze) ? l.cloze.filter(Boolean) : []
  };
}
/* 译文缓存是「英文原文 → 中文」，只用来省一次联网，丢了解释不丢数据，所以可以限制长度。
   超了就按插入顺序淘汰最老的（对象属性顺序即插入顺序，字符串键安全）。 */
const TR_CACHE_MAX = 3000;
function normalizeTrCache(obj){
  const out = {};
  if (!obj || typeof obj !== 'object') return out;
  Object.keys(obj).forEach(k => {
    const v = obj[k];
    if (!k || typeof v !== 'string' || !v) return;
    out[k.slice(0, 400)] = v.slice(0, 600);
  });
  const keys = Object.keys(out);
  if (keys.length > TR_CACHE_MAX){
    const cut = keys.length - TR_CACHE_MAX;
    for (let i = 0; i < cut; i++) delete out[keys[i]];
  }
  return out;
}
/* 读到比本程序更新的数据版本时记在这里，由 init 提醒一次（见文件末尾） */
let newerDataVersion = 0;
function migrate(obj){
  const base = defaultState();
  if (!obj || typeof obj !== 'object') return base;
  /* 之前完全没看 obj.version：用新版本写过、又用旧版本打开时，
     这里会安静地把不认识的字段剪掉。现在至少让用户知道发生了这件事。 */
  if (Number.isFinite(obj.version) && obj.version > DATA_VERSION) newerDataVersion = Number(obj.version);
  return { version: DATA_VERSION, chunks: Array.isArray(obj.chunks) ? obj.chunks.filter(Boolean).map(normalizeChunk) : [], logs: obj.logs && typeof obj.logs === 'object' ? obj.logs : {}, streak: Number.isFinite(obj.streak) ? obj.streak : 0, lastActive: obj.lastActive || null, settings: Object.assign({ currentWeek: 1 }, obj.settings || {}), customLessons: Array.isArray(obj.customLessons) ? obj.customLessons.filter(Boolean).map(normalizeLesson) : [], trash: Array.isArray(obj.trash) ? obj.trash.filter(Boolean).slice(0, 100) : [], progress: obj.progress && typeof obj.progress === 'object' ? obj.progress : {}, lessonEdits: obj.lessonEdits && typeof obj.lessonEdits === 'object' ? obj.lessonEdits : {}, mistakes: obj.mistakes && typeof obj.mistakes === 'object' ? obj.mistakes : {}, trCache: normalizeTrCache(obj.trCache), deletedLessons: obj.deletedLessons && typeof obj.deletedLessons === 'object' ? obj.deletedLessons : {}, deletedMistakes: obj.deletedMistakes && typeof obj.deletedMistakes === 'object' ? obj.deletedMistakes : {} };
}
function loadState(){
  const readKey = (k) => {
    try{
      const raw = localStorage.getItem(k);
      return raw ? migrate(JSON.parse(raw)) : null;
    }catch(e){ console.warn('读取失败', k, e); return null; }
  };
  const cur = readKey(STORE_KEY);
  if (cur) return cur;
  /* 旧版本键：读出并迁移后立刻搬到新键、清掉旧键。
     原来的 || 链每次启动都优先读 v2/v1 的老数据，新写入落在新键上，
     用户看到的就是"改了没保存"。 */
  for (const k of [OLD_KEY_V2, OLD_KEY_V1]){
    const st = readKey(k);
    if (!st) continue;
    try{
      localStorage.setItem(STORE_KEY, JSON.stringify(st));
      localStorage.removeItem(k);
    }catch(e){}
    return st;
  }
  return defaultState();
}
let state = loadState();
function pruneLogs(){ const cutoff = addDays(todayStr(), -400); let n = 0; Object.keys(state.logs).forEach(d => { if (d < cutoff){ delete state.logs[d]; n++; } }); return n; }
/* ---------- 落盘 ----------
   状态是整盘序列化后写 localStorage，写一次的成本随笔记变大而线性上升。
   复习时连点「记住了 / 没记住」，一秒钟能触发十几次 saveState，主线程就被这些同步写卡得一顿一顿。
   所以：距上次落盘超过 SAVE_WINDOW_MS 就立刻写（常规操作永远是即时可见的），
   窗口内的连续改动合并成一次尾写；切后台 / 关窗口 / 离开页面时 flushSave() 把最后一次补上。
   不再因为一次失败就永久停写：每次保存都重试，恢复后自动继续。 */
const SAVE_WINDOW_MS = 250;
let saveTimer = null;
let saveDirty = false;
let lastSaveAt = 0;
let saveSoonTimer = null;

function writeStateNow(){
  try{ localStorage.setItem(STORE_KEY, JSON.stringify(state)); storageOK = true; }
  catch(e){ if (storageOK) toast('本地存储不可用或已满'); storageOK = false; }
  lastSaveAt = Date.now();
  saveDirty = false;
  try{ scheduleCloudPush(); }catch(e){}
}

function saveState(){
  saveDirty = true;
  if (saveTimer) return;
  if (Date.now() - lastSaveAt >= SAVE_WINDOW_MS){ writeStateNow(); return; }
  saveTimer = setTimeout(() => { saveTimer = null; if (saveDirty) writeStateNow(); }, SAVE_WINDOW_MS);
}

/* 立刻落盘：页面隐藏 / 关闭前调用，防止合并窗口里的最后一次改动丢掉 */
function flushSave(){
  if (saveTimer){ clearTimeout(saveTimer); saveTimer = null; }
  if (saveDirty) writeStateNow();
}

/* 逐字填空这类高频输入再单独压一道：连续输入时不必每个按键都排队 */
function saveSoon(){ clearTimeout(saveSoonTimer); saveSoonTimer = setTimeout(() => { saveSoonTimer = null; saveState(); }, 400); }
function getEffectiveStreak(){ if (!state.lastActive) return 0; const t = todayStr(); if (state.lastActive === t || state.lastActive === addDays(t, -1)) return state.streak || 0; return 0; }
function touchActivity(){ const t = todayStr(); if (state.lastActive === t) return; if (state.lastActive === addDays(t, -1)) state.streak = (state.streak || 0) + 1; else state.streak = 1; state.lastActive = t; saveState(); }
function getLog(dateStr = todayStr()){ return state.logs[dateStr] || { inputDone:false, outputDone:false, reviewed:0 }; }
function ensureLog(dateStr = todayStr()){ if (!state.logs[dateStr]) state.logs[dateStr] = { inputDone:false, outputDone:false, reviewed:0 }; return state.logs[dateStr]; }
/* 数据都在本机 localStorage，攒到一定量就提醒导出一次（每天最多提醒一次） */
function maybeNagBackup(){
  if (!state.settings) state.settings = { currentWeek: 1 };
  if (state.chunks.length < 20) return;
  const today = todayStr();
  if (state.settings.lastNag === today) return;
  const last = state.settings.exportedAt ? Date.parse(state.settings.exportedAt) : 0;
  const stale = !last || (Date.now() - last) > 7 * 86400000;
  if (!stale) return;
  state.settings.lastNag = today;
  saveState();
  toast(`已攒 ${state.chunks.length} 个词块，建议到「统计 → 导出备份」存一份`);
}

/* ========== 业务 ========== */
const INTERVALS = [2, 4, 7, 14, 30];
function addChunk({sentence, chunk, meaning, mine, source}){
  const t = todayStr();
  state.chunks.unshift({ id:uid(), sentence:sentence.trim(), chunk:chunk.trim(), meaning:meaning.trim(), mine:(mine||'').trim(), source:(source||'').trim(), added:t, nextReview:addDays(t, INTERVALS[0]), stage:0, mastered:false, lastReviewed:null });
  touchActivity(); saveState();
}
function updateChunk(id, data){
  const c = state.chunks.find(x => x.id === id); if (!c) return;
  Object.assign(c, { sentence: data.sentence.trim(), chunk: data.chunk.trim(), meaning: data.meaning.trim(), mine: (data.mine||'').trim(), source: (data.source||'').trim() });
  saveState();
}
/* ========== 回收站：删除可撤销 ========== */
function pushTrash(items){
  if (!Array.isArray(state.trash)) state.trash = [];
  const at = new Date().toISOString();
  (items || []).forEach(c => { if (c) state.trash.unshift(Object.assign({}, c, { deletedAt: at })); });
  if (state.trash.length > 100) state.trash.length = 100;
}
function restoreTrashMany(ids){
  const set = new Set(ids || []);
  if (!set.size || !Array.isArray(state.trash)) return 0;
  const back = [];
  for (let i = state.trash.length - 1; i >= 0; i--){
    if (set.has(state.trash[i].id)) back.unshift(state.trash.splice(i, 1)[0]);
  }
  if (!back.length) return 0;
  back.forEach(t => state.chunks.unshift(normalizeChunk(t)));
  saveState(); renderAll(); renderTrash();
  return back.length;
}
function restoreTrash(id){
  const n = restoreTrashMany([id]);
  if (n) toast('已恢复');
}
function emptyTrash(){
  if (!Array.isArray(state.trash) || !state.trash.length) return;
  if (!confirm('清空回收站？清空后这些词块无法再恢复。')) return;
  state.trash = [];
  saveState(); renderTrash(); toast('回收站已清空');
}
function renderTrash(){
  const card = $('#trashCard'); const box = $('#trashList');
  if (!card || !box) return;
  const list = Array.isArray(state.trash) ? state.trash : [];
  card.hidden = !list.length;
  if (!list.length){ box.innerHTML = ''; return; }
  box.innerHTML = list.slice(0, 20).map(t => `<div class="trash-item">
      <span class="ti-c">${esc(t.chunk || '')}</span>
      <span class="ti-m">${esc(t.meaning || '')}</span>
      <span class="ti-m">${esc(String(t.deletedAt || '').slice(0, 10))}</span>
      <button class="btn small ti-btn" type="button" data-restore="${esc(t.id)}">恢复</button>
    </div>`).join('')
    + `<div style="margin-top:10px;"><button class="btn small danger" id="btnEmptyTrash" type="button">清空回收站</button></div>`;
  box.querySelectorAll('[data-restore]').forEach(b => { b.onclick = () => restoreTrash(b.dataset.restore); });
  const eb = $('#btnEmptyTrash'); if (eb) eb.onclick = emptyTrash;
}

function deleteChunk(id){
  const c = state.chunks.find(x => x.id === id);
  if (!c) return;
  if (!confirm('确定删除「' + c.chunk + '」吗？可在右下角点「撤销」恢复。')) return;
  pushTrash([c]);
  state.chunks = state.chunks.filter(x => x.id !== id);
  pickedIds.delete(id);
  saveState(); renderAll(); renderTrash();
  toast('已删除「' + c.chunk + '」', { label: '撤销', run: () => restoreTrash(id) });
}
function getDueChunks(){
  const t = todayStr();
  return state.chunks.filter(c => !c.mastered && c.nextReview <= t).sort((a, b) => a.nextReview.localeCompare(b.nextReview) || a.added.localeCompare(b.added));
}
function gradeChunk(id, grade){
  const c = state.chunks.find(x => x.id === id); if (!c) return false;
  const t = todayStr(); c.lastReviewed = t;
  if (grade === 'good'){ c.stage = (c.stage || 0) + 1; if (c.stage >= INTERVALS.length){ c.mastered = true; c.nextReview = addDays(t, 3650); } else { c.nextReview = addDays(t, INTERVALS[c.stage]); } }
  else if (grade === 'hard'){ c.nextReview = addDays(t, 1); }
  else { c.stage = 0; c.nextReview = addDays(t, 1); }
  const log = ensureLog(t); log.reviewed = (log.reviewed || 0) + 1;
  touchActivity(); saveState(); return true;
}
function blankSentence(sentence, chunk){
  if (!chunk) return esc(sentence);
  const PH = '__BLANK__'; let replaced;
  try{ replaced = sentence.replace(new RegExp(escapeRegExp(chunk), 'gi'), PH); }catch(e){ return esc(sentence); }
  if (replaced === sentence) return esc(sentence);
  return esc(replaced).split(PH).join('<span class="blank">______</span>');
}
function sentenceHasChunk(sentence, chunk){ if (!chunk) return false; return sentence.toLowerCase().includes(chunk.toLowerCase()); }
function stageDots(stage, mastered){
  let html = '<div class="dots" title="记忆阶段">';
  for (let i = 0; i < INTERVALS.length; i++) html += `<i class="${(mastered || i < stage) ? 'on' : ''}"></i>`;
  return html + '</div>';
}

function lookupGloss(chunk){
  if (!chunk) return '';
  const k = String(chunk).toLowerCase().replace(/\s+/g, ' ').trim();
  if (CHUNK_GLOSSARY[k]) return CHUNK_GLOSSARY[k];
  const k2 = k.replace(/^[^a-z]+|[^a-z]+$/g, '');
  if (CHUNK_GLOSSARY[k2]) return CHUNK_GLOSSARY[k2];
  const stripped = k2.replace(/\b(my|your|his|her|its|our|their|me|you|him|us|them)\b/g, '').replace(/\s+/g, ' ').trim();
  if (CHUNK_GLOSSARY[stripped]) return CHUNK_GLOSSARY[stripped];
  const words = k2.split(' ');
  if (words.length === 1 && CHUNK_GLOSSARY[words[0]]) return CHUNK_GLOSSARY[words[0]];
  return '';
}

/* ========== 提取词块（带句子索引） ========== */
const STOPWORDS = new Set(('the a an and or but if then so because as than that this these those there here when where why how what which who whom whose while with without within into onto upon from to of in on at by for about against between through during before after above below up down out off over under again further once i you he she it we they me him her us them my your his its our their mine yours hers ours theirs myself yourself himself herself itself ourselves yourselves themselves am is are was were be been being have has had do does did will would shall should may might must can could not no nor very too also just only even still already always never often sometimes usually really quite rather almost enough much many more most few fewer little less least some any all both each every either neither one two three first second third last next other another such same own different new old good bad big small large long short high low right left true false sure certain able possible important necessary easy hard difficult simple complex').split(/\s+/));

function extractChunks(textArr, limit = 18){
  if (!textArr || !textArr.length) return [];
  const candidates = new Map();
  textArr.forEach((sent, sentIdx) => {
    if (!sent) return;
    const wordMatches = [];
    const re = /[A-Za-z]+(?:['-][A-Za-z]+)*/g;
    let m;
    while ((m = re.exec(sent)) !== null) wordMatches.push({ word: m[0], lower: m[0].toLowerCase(), index: m.index });
    for (let n = 2; n <= 3; n++){
      for (let i = 0; i <= wordMatches.length - n; i++){
        const slice = wordMatches.slice(i, i + n);
        if (STOPWORDS.has(slice[0].lower)) continue;
        if (STOPWORDS.has(slice[slice.length - 1].lower)) continue;
        if (slice.every(w => STOPWORDS.has(w.lower))) continue;
        const phraseLower = slice.map(w => w.lower).join(' ');
        if (phraseLower.replace(/\s/g, '').length < 5) continue;
        const start = slice[0].index;
        const end = slice[slice.length - 1].index + slice[slice.length - 1].word.length;
        const display = sent.slice(start, end);
        if (!candidates.has(phraseLower)){
          candidates.set(phraseLower, { count: 0, sentence: sent, display, sentIdx });
        }
        candidates.get(phraseLower).count++;
      }
    }
  });
  const list = Array.from(candidates.values()).sort((a, b) => {
    if (b.count !== a.count) return b.count - a.count;
    return b.display.length - a.display.length;
  });
  const picked = [];
  const seen = new Set();
  for (const c of list){
    const key = c.display.toLowerCase();
    if (seen.has(key)) continue;
    /* 双向去重：既排除「已选包含新候选」，也排除「新候选包含已选」（原实现只有单向，会重复收录） */
    if (picked.some(p => {
      const pk = p.chunk.toLowerCase();
      return pk === key || pk.includes(key) || key.includes(pk);
    })) continue;
    picked.push({ chunk: c.display, sentence: c.sentence, meaning: lookupGloss(c.display), sentIdx: c.sentIdx });
    seen.add(key);
    if (picked.length >= limit) break;
  }
  return picked;
}

/* ========== 生成题目（带句索引、中文意思） ========== */
function generateQuizFromChunks(chunks, count = 4){
  if (!chunks || chunks.length < 4) return [];
  const valid = chunks.filter(c => c.sentence && c.chunk && c.sentence.toLowerCase().includes(c.chunk.toLowerCase()));
  if (valid.length < 2) return [];
  const quiz = [];
  const used = new Set();
  const allChunks = Array.from(new Set(chunks.map(c => c.chunk)));
  for (const c of valid){
    if (quiz.length >= count) break;
    if (used.has(c.chunk.toLowerCase())) continue;
    const others = allChunks.filter(x => x.toLowerCase() !== c.chunk.toLowerCase());
    if (others.length < 3) continue;
    const distractors = shuffle(others).slice(0, 3);
    const options = shuffle([c.chunk, ...distractors]);
    const answer = options.indexOf(c.chunk);
    let blanked;
    try{ blanked = c.sentence.replace(new RegExp(escapeRegExp(c.chunk), 'gi'), '______'); }
    catch(e){ continue; }
    if (blanked === c.sentence) continue;
    quiz.push({
      q: blanked, options, answer,
      explain: `原句：${c.sentence}`,
      sentIdx: (typeof c.sentIdx === 'number') ? c.sentIdx : null,
      correctMeaning: c.meaning || ''
    });
    used.add(c.chunk.toLowerCase());
  }
  return quiz;
}

function generateClozeFromChunks(chunks, count = 3){
  if (!chunks || !chunks.length) return [];
  const out = [];
  const used = new Set();
  for (const c of chunks){
    if (out.length >= count) break;
    if (!c.chunk || !c.sentence) continue;
    const key = c.chunk.toLowerCase();
    if (used.has(key)) continue;
    const sent = c.sentence.trim();
    const idx = sent.toLowerCase().indexOf(key);
    if (idx === -1) continue;
    const before = sent.slice(0, idx);
    const after = sent.slice(idx + c.chunk.length);
    if (!before && !after) continue;
    out.push({ before, after, answer: c.chunk, hint: c.meaning || '…' });
    used.add(key);
  }
  return out;
}

function analyzeLesson(lesson, { force = false, keepMeaning = false } = {}){
  if (!lesson) return;
  const oldMeanings = new Map();
  if (keepMeaning && Array.isArray(lesson.chunks)){
    lesson.chunks.forEach(c => { if (c.chunk && c.meaning) oldMeanings.set(c.chunk.toLowerCase(), c.meaning); });
  }
  if (lesson.text && lesson.text.length){
    const aligned = alignSentences(lesson.text, lesson.textZh || []);
    lesson.text = aligned.en;
    lesson.textZh = aligned.zh;
  }
  if (force || !lesson.chunks || !lesson.chunks.length){
    const extracted = extractChunks(lesson.text, 18);
    extracted.forEach(c => {
      const old = oldMeanings.get(c.chunk.toLowerCase());
      if (old) c.meaning = old;
    });
    if (extracted.length) lesson.chunks = extracted;
    else if (force) lesson.chunks = [];
  } else {
    lesson.chunks.forEach(c => {
      if (!c.meaning){ const g = lookupGloss(c.chunk); if (g) c.meaning = g; }
      if (typeof c.sentIdx !== 'number'){
        const idx = lesson.text.findIndex(s => s.toLowerCase().includes(c.chunk.toLowerCase()));
        if (idx >= 0) c.sentIdx = idx;
      }
    });
  }
  if (force || !lesson.quiz || !lesson.quiz.length){
    const quiz = generateQuizFromChunks(lesson.chunks, 4);
    /* force 重算时即使结果为空也要清空，否则旧题目会残留并指向已删除的句子/词块 */
    if (quiz.length) lesson.quiz = quiz;
    else if (force) lesson.quiz = [];
  }
  if (force || !lesson.cloze || !lesson.cloze.length){
    const cloze = generateClozeFromChunks(lesson.chunks, 3);
    if (cloze.length) lesson.cloze = cloze;
    else if (force) lesson.cloze = [];
  }
}

/* ========== 中文高亮（只在对应句子里高亮） ========== */
function normalizeMeaningVariants(meaning){
  if (!meaning) return [];
  const raw = String(meaning).trim();
  if (!raw) return [];
  const set = new Set();
  const clean = s => String(s)
    .replace(/[（(【\[][^）)】\]]*[）)】\]]/g, ' ')
    .replace(/…+|\.{2,}|—+/g, ' ')
    .replace(/[\/／|、；;，,。.！!？?：:·]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  const push = s => { const v = clean(s); if (v && v.replace(/\s/g, '').length >= 2) set.add(v); };
  push(raw);
  raw.split(/[\/／|、；;，,（）()【】\[\]]+|…+|\.{2,}/).forEach(push);
  /* 去掉开头的「的/地/得/了」再试一次，例如「的气味」→「气味」 */
  Array.from(set).forEach(v => {
    const trimmed = v.replace(/^[的地得了着过]/, '').trim();
    if (trimmed.length >= 2) set.add(trimmed);
  });
  return Array.from(set).sort((a, b) => b.length - a.length);
}

/* 最长公共子串：意思和译文措辞不完全一致时，用它兜底定位（>=2 个字符才采用） */
function longestCommonSubstring(a, b){
  const s1 = String(a || ''), s2 = String(b || '');
  if (!s1 || !s2) return '';
  let prev = new Array(s2.length + 1).fill(0), cur = new Array(s2.length + 1).fill(0);
  let best = 0, end = 0;
  for (let i = 1; i <= s1.length; i++){
    for (let j = 1; j <= s2.length; j++){
      if (s1[i - 1] === s2[j - 1]){
        cur[j] = prev[j - 1] + 1;
        if (cur[j] > best){ best = cur[j]; end = i; }
      } else cur[j] = 0;
    }
    const tmp = prev; prev = cur; cur = tmp; cur.fill(0);
  }
  return best >= 2 ? s1.slice(end - best, end) : '';
}

/* 分析一段中文：哪些词块意思能定位（高亮），哪些定位不到（列在下面当小标签） */
function zhAnalysis(text, chunks){
  const plain = String(text || '');
  const marks = [];
  const gloss = [];
  (chunks || []).forEach(c => {
    if (!c || !c.chunk) return;
    if (!c.meaning){ return; }
    const variants = normalizeMeaningVariants(c.meaning);
    let hit = '';
    for (const v of variants){ if (v && plain.includes(v)){ hit = v; break; } }
    if (!hit){
      let best = '';
      variants.forEach(v => {
        const sub = longestCommonSubstring(v, plain);
        if (sub.length > best.length) best = sub;
      });
      if (best) hit = best;
    }
    if (hit) marks.push(hit);
    else gloss.push({ chunk: c.chunk, meaning: c.meaning });
  });
  return { marks, gloss };
}

function highlightZh(text, chunks){
  if (!text) return '';
  let html = esc(text);
  if (!chunks || !chunks.length) return html;

  const { marks: found } = zhAnalysis(text, chunks);
  const candidates = new Set(found.filter(Boolean));
  if (!candidates.size) return html;

  const sorted = Array.from(candidates).sort((a, b) => b.length - a.length);
  const marks = [];
  sorted.forEach(m => {
    const target = esc(m);
    if (!target) return;
    const parts = html.split(target);
    if (parts.length < 2) return;
    let out = parts[0];
    for (let i = 1; i < parts.length; i++){
      const idx = marks.length;
      marks.push(target);
      out += '\u0002' + idx + '\u0002' + parts[i];
    }
    html = out;
  });
  return html.replace(/\u0002(\d+)\u0002/g, (_, i) => `<mark class="hl-zh">${marks[Number(i)]}</mark>`);
}

/* 译文里定位不到的词块，在中文下面列成小标签，避免「英文高亮了中文没高亮」完全没有交代 */
function zhGlossHtml(text, chunks){
  const { gloss } = zhAnalysis(text, chunks);
  if (!gloss.length) return '';
  return `<div class="zh-gloss">${gloss.map(g => `<span class="zg"><b>${esc(g.chunk)}</b>｜${esc(g.meaning)}</span>`).join('')}</div>`;
}

/* ========== 合并学习材料 ========== */
function allLessons(){ return LESSONS.concat(state.customLessons || []); }
function getLessonById(id){ return allLessons().find(l => l.id === id); }
function findSentence(para, chunk){
  if (!chunk) return para;
  const sents = para.match(/[^.!?]+[.!?]+["'”’]?\s*/g) || [para];
  const lower = chunk.toLowerCase();
  for (const s of sents){ if (s.toLowerCase().includes(lower)) return s.trim(); }
  return para;
}

/* ========== 学习页 ========== */
let learnState = { level:'all', lessonId:null, quizAnswers:{}, clozeValues:{}, clozeResults:{}, showTrans:false };
/* 语法解读的展开状态：单独放，不塞进 learnState——那个对象在几个地方被整个重写，
   塞进去会在换页面时被顺手清掉，用户会看到「刚点开的语法自己收起了」。 */
let grammarState = { all:false, open:{} };
/* 每句「翻译」按钮的展开状态。和 learnState.showTrans（全局显示翻译）分开：
   全局开关重渲染后仍然生效，而单句点开的不该被全局状态一并清掉。 */
let transState = { open:{} };

/* 学习进度（答题/填空/判定）落进 state.progress，learnState 只做视图缓存。
   之前这些字段是纯内存的：刷新一次，做过的题和填过的空全没了。 */
function lessonProg(id){
  if (!id) return { quiz:{}, cloze:{}, clozeRes:{} };
  if (!state.progress || typeof state.progress !== 'object') state.progress = {};
  let p = state.progress[id];
  if (!p || typeof p !== 'object'){ p = { quiz:{}, cloze:{}, clozeRes:{} }; state.progress[id] = p; }
  if (!p.quiz || typeof p.quiz !== 'object') p.quiz = {};
  if (!p.cloze || typeof p.cloze !== 'object') p.cloze = {};
  if (!p.clozeRes || typeof p.clozeRes !== 'object') p.clozeRes = {};
  learnState.quizAnswers[id] = p.quiz;
  learnState.clozeValues[id] = p.cloze;
  learnState.clozeResults[id] = p.clozeRes;
  return p;
}

/* 内置文章上的用户改动（全文译文 / 词块意思 / 例句译文 / 补充词块）单独存一层 overrides。
   内置语料是模块级常量，直接改它既不报错也不落盘，刷新后看起来像"白改了"。 */
function rememberLessonEdit(lesson, mutate){
  if (!lesson) return;
  if (lesson.custom){ saveState(); return; }
  if (!state.lessonEdits || typeof state.lessonEdits !== 'object') state.lessonEdits = {};
  if (!state.lessonEdits[lesson.id] || typeof state.lessonEdits[lesson.id] !== 'object') state.lessonEdits[lesson.id] = {};
  try{ mutate(state.lessonEdits[lesson.id]); }catch(e){ return; }
  saveState();
}

/* 重新分析 / 改正文之后清空这一课的做题记录；清的是内部字典，
   这样 learnState 里已经指向它的引用不会悬空 */
function clearLessonProg(id){
  const p = lessonProg(id);
  Object.keys(p.quiz).forEach(k => delete p.quiz[k]);
  Object.keys(p.cloze).forEach(k => delete p.cloze[k]);
  Object.keys(p.clozeRes).forEach(k => delete p.clozeRes[k]);
  return p;
}

/* ========== 错题本 ==========
   理解题答错、填空答错都在这里留一条：题干、上次的答案、正确答案一起存快照，
   所以原文后来改了、甚至被删了，条目照样能看、能就地重做。
   唯一 id 是「文章id|题型|题号」：同一题反复错只累加次数，不会攒出一堆重复卡片。
   云同步是按并集合并的，所以「订正」用 fixed 标记而不是删条目——删了下次同步会被云端复活。 */
const MISTAKE_KIND_LABEL = { quiz: '理解题', cloze: '填空' };
let mistakeFilter = 'open';          /* open 待订正 / fixed 已订正 / all 全部 */
const mistakeRetry = {};             /* id -> { picked, ok }：只在内存里，刷新即清 */

function mistakeKey(lessonId, kind, idx){ return lessonId + '|' + kind + '|' + Number(idx); }
function ensureMistakes(){
  if (!state.mistakes || typeof state.mistakes !== 'object') state.mistakes = {};
  return state.mistakes;
}
function getMistakes(){ return Object.values(ensureMistakes()).filter(m => m && m.id); }

/* 记一条错题。payload 只带「题目快照」，次数和时间由这里管，避免被调用方覆盖 */
function recordMistake(lesson, kind, idx, payload){
  if (!lesson || !lesson.id) return null;
  const box = ensureMistakes();
  const id = mistakeKey(lesson.id, kind, idx);
  const prev = box[id] || null;
  const rec = Object.assign({
    id,
    lessonId: lesson.id,
    lessonTitle: lesson.title || '未命名文章',
    kind, idx: Number(idx),
    wrong: 0, fixed: false, at: ''
  }, prev || {}, payload || {});
  rec.wrong = (Number(prev && prev.wrong) || 0) + 1;
  rec.fixed = false;                       /* 又错了，重新算待订正 */
  rec.at = new Date().toISOString();
  box[id] = rec;
  delete mistakeRetry[id];
  /* 进过「清空已订正」的题又错了：墓碑要撤掉，否则下次云同步它会被过滤掉，白记 */
  if (state.deletedMistakes) delete state.deletedMistakes[id];
  return rec;
}
function findMistake(lessonId, kind, idx){ return ensureMistakes()[mistakeKey(lessonId, kind, idx)] || null; }

/* 清空已订正的错题。删掉而不是留标记，是为了让本子真的短下来；
   删过的 id 记进 deletedMistakes 当墓碑，否则云同步的并集合并会把它搬回来。 */
function clearFixedMistakes(){
  const box = ensureMistakes();
  const ids = Object.keys(box).filter(id => box[id] && box[id].fixed);
  if (!ids.length){ toast('没有已订正的错题'); return 0; }
  if (!confirm('清掉 ' + ids.length + ' 条已订正的错题？待订正的不受影响，清掉后不能恢复。')) return 0;
  const at = new Date().toISOString();
  if (!state.deletedMistakes || typeof state.deletedMistakes !== 'object') state.deletedMistakes = {};
  ids.forEach(id => { delete box[id]; state.deletedMistakes[id] = at; delete mistakeRetry[id]; });
  saveState();
  renderMistakes();
  toast('已清空 ' + ids.length + ' 条已订正的错题');
  return ids.length;
}
/* 手动点「已订正」或重做时答对了都走这里；返回 true 表示状态真的变了 */
function setMistakeFixed(id, fixed){
  const rec = ensureMistakes()[id];
  if (!rec) return false;
  const next = !!fixed;
  if (!!rec.fixed === next) return false;
  rec.fixed = next;
  if (next) rec.fixedAt = new Date().toISOString(); else delete rec.fixedAt;
  return true;
}
/* 删文章时把它名下的错题一起清掉，否则错题本里会留下点不开的死条目 */
function dropLessonMistakes(lessonId){
  const box = ensureMistakes();
  Object.keys(box).forEach(id => { if (box[id] && box[id].lessonId === lessonId) delete box[id]; });
}
function fmtMistakeTime(iso){
  const d = new Date(String(iso || ''));
  if (isNaN(d.getTime())) return '';
  return (d.getMonth() + 1) + '月' + d.getDate() + '日 ' + String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0');
}
function updateMistakeCount(n){
  const el = $('#mistakeCount');
  if (!el) return;
  const v = Number.isFinite(n) ? n : getMistakes().filter(m => !m.fixed).length;
  el.textContent = v ? String(v) : '';
}
function optionText(m, i){
  const n = Number(i);
  if (!Number.isFinite(n) || n < 0 || !Array.isArray(m.options) || m.options[n] == null) return '';
  return String.fromCharCode(65 + n) + '. ' + m.options[n];
}
/* 错题对应的英文原句：填空是 before+answer+after，理解题是解析里引用的那句 */
function mistakeSentence(m){
  if (!m) return '';
  if (m.kind === 'cloze') return String((m.before || '') + (m.answer || '') + (m.after || '')).replace(/\s+/g, ' ').trim();
  if (m.sentence) return String(m.sentence).trim();
  const lesson = getLessonById(m.lessonId);
  const q = lesson && (lesson.quiz || [])[Number(m.idx)];
  if (q && q.explain) return String(q.explain).replace(/^(原句|原文)\s*[：:]\s*/, '').trim();
  return '';
}

/* 让 AI 讲讲这道题。不改课程数据、不上传任何东西——
   只把「题目 + 我的答案 + 正确答案 + 原句 + 所在段落」拼成一段中文提示词，复制到剪贴板后打开 AI 站点。
   用网页而不是 API：桌面版把 window.open 交给系统浏览器（electron/main.js 的 setWindowOpenHandler），
   这样不用在本地存任何 API Key。 */
/* 可选的 AI 站点。默认给几个常见的，设置里可以自己填 URL（存在 state.settings.aiUrl）。
   只做「打开网页 + 复制提示词」，不碰 API Key，所以换站点只是换一个网址。 */
const AI_SITES = [
  { key: 'deepseek', name: 'DeepSeek', url: 'https://chat.deepseek.com/' },
  { key: 'chatgpt', name: 'ChatGPT', url: 'https://chatgpt.com/' },
  { key: 'kimi', name: 'Kimi', url: 'https://kimi.moonshot.cn/' },
  { key: 'doubao', name: '豆包', url: 'https://www.doubao.com/chat/' },
  { key: 'yuanbao', name: '腾讯元宝', url: 'https://yuanbao.tencent.com/chat/' }
];
const AI_HELPER_URL = 'https://chat.deepseek.com/';
/* 站内配置优先，其次默认。留空/非法一律退回默认，免得点了「问 AI」打开一个怪地址 */
function aiHelperUrl(){
  const raw = state && state.settings && state.settings.aiUrl;
  const u = typeof raw === 'string' ? raw.trim() : '';
  if (!u) return AI_HELPER_URL;
  if (!/^https?:\/\/[^\s]+$/i.test(u)) return AI_HELPER_URL;
  return u;
}
function aiSiteName(){
  const u = aiHelperUrl();
  const hit = AI_SITES.find(s => s.url === u);
  if (hit) return hit.name;
  try{ return new URL(u).hostname; }catch(e){ return 'AI 站点'; }
}
/* 设置卡片：下拉选常见站点，或者自己填网址。填的不合法就不保存，别让「问 AI」把人带到坏地址 */
function renderAiCard(){
  const now = $('#aiSiteNow');
  if (now) now.textContent = aiSiteName();
  const sel = $('#aiSiteSelect');
  const inp = $('#aiSiteUrl');
  const cur = state && state.settings && state.settings.aiUrl ? String(state.settings.aiUrl) : '';
  if (sel) sel.value = cur || AI_HELPER_URL;
  if (inp) inp.value = cur;
}
function setAiSite(raw){
  const u = String(raw == null ? '' : raw).trim();
  if (u && !/^https?:\/\/[^\s]+$/i.test(u)){ toast('网址要以 http:// 或 https:// 开头'); return false; }
  if (u){
    state.settings.aiUrl = u;
    if (!AI_SITES.some(s => s.url === u)) AI_SITES.push({ key: 'custom', name: aiSiteName(), url: u });
  } else {
    delete state.settings.aiUrl;
  }
  saveState();
  renderAiCard();
  toast(u ? '问 AI 会打开 ' + aiSiteName() : '已改回默认站点');
  return true;
}
function buildMistakeAiPrompt(m){
  const lines = ['我在练英语精读，这道题做错了，请用中文帮我讲清楚。', ''];
  lines.push('【题型】' + (MISTAKE_KIND_LABEL[m.kind] || '题目'));
  const lesson = getLessonById(m.lessonId);
  if (lesson) lines.push('【来自文章】《' + (lesson.title || '') + '》');
  const sent = mistakeSentence(m);
  if (sent) lines.push('【原句】' + sent);
  if (m.kind === 'quiz'){
    lines.push('【题目】' + String(m.q || ''));
    (m.options || []).forEach((o, i) => lines.push('  ' + String.fromCharCode(65 + i) + '. ' + o));
    lines.push('【我选的】' + (optionText(m, m.my) || '（空着）'));
    lines.push('【正确答案】' + (optionText(m, m.answer) || ''));
  } else {
    lines.push('【带空的句子】' + (m.before || '') + '______' + (m.after || ''));
    lines.push('【我填的】' + (m.my || '（空着）'));
    lines.push('【正确答案】' + String(m.answer || ''));
    if (m.hint) lines.push('【提示】' + m.hint);
  }
  if (lesson && sent){
    const hit = locateSentence(lesson, sent);
    if (hit){
      lines.push('【这一段原文】' + String(lesson.text[hit.para] || ''));
      const zh = (lesson.textZh || [])[hit.para];
      if (zh) lines.push('【这一段参考译文】' + zh);
    }
  }
  lines.push('');
  lines.push('请回答三件事：1) 为什么正确答案是这个——从句子结构和上下文讲；');
  lines.push('2) 我选的（或我填的）错在哪里；3) 这句里值得记住的语法点或固定搭配，每个配一个简短例句。');
  return lines.join('\n');
}

/* 「这句的翻译和语法怎么讲」也交给 AI：正文每句的语法框、解析里的原句都走这里。
   带上现成的参考译文和本地规则命中的语法点，AI 就不用从零猜这句在说什么。 */
function buildSentenceAiPrompt(o){
  const opt = o || {};
  const sentence = String(opt.sentence || '').trim();
  const lines = ['我在读一篇英语文章，请用中文讲清楚下面这句。', ''];
  if (opt.title) lines.push('【文章】《' + opt.title + '》');
  lines.push('【句子】' + sentence);
  if (opt.zh) lines.push('【参考译文】' + opt.zh);
  if (opt.tags && opt.tags.length) lines.push('【这句里的语法点】' + opt.tags.join('、'));
  if (opt.question) lines.push('【相关题目】' + opt.question);
  lines.push('');
  lines.push('请回答三件事：1) 这句怎么划分结构（主句、从句、各修饰成分分别是什么）；');
  lines.push('2) 上面列的语法点在句子里具体落在哪个词上、为什么这里要用它；');
  lines.push('3) 值得记住的搭配和更自然的说法，各配一两个短例句。');
  return lines.join('\n');
}

/* 复制提示词 + 打开 AI 站点。
   顺序不能反：浏览器里等 await 之后再 window.open 会被当成弹窗拦掉，所以先开窗再复制。 */
function askAiWith(prompt){
  const win = window.open(aiHelperUrl(), '_blank');
  copyText(prompt).then(ok => {
    if (ok && win) toast('提示词已复制，粘贴到 ' + aiSiteName() + ' 的对话框就能问');
    else if (ok) toast('提示词已复制；新窗口被拦了，请自己打开 ' + aiSiteName());
    else toast('没能复制提示词，请手动选中文字复制');
  });
}

function mistakeCardHtml(m){
  const retry = mistakeRetry[m.id];
  const kindLabel = MISTAKE_KIND_LABEL[m.kind] || '题目';
  const head = '<div class="mistake-head"><span class="badge ' + (m.fixed ? 'ok' : 'due') + '">' + (m.fixed ? '已订正' : '待订正') + '</span>'
    + '<span class="badge wait">' + kindLabel + '</span>'
    + '<button class="mistake-src" type="button" data-mopen="' + esc(m.lessonId) + '" title="回到原文这一句">《' + esc(m.lessonTitle) + '》</button>'
    + '<span class="mistake-meta">' + esc(fmtMistakeTime(m.at)) + (Number(m.wrong) > 1 ? ' · 错过 ' + Number(m.wrong) + ' 次' : '') + '</span></div>';
  let body;
  if (m.kind === 'quiz'){
    const opts = Array.isArray(m.options) ? m.options : [];
    const optsHtml = opts.map((o, oi) => {
      let cls = 'opt';
      if (retry){ if (oi === Number(m.answer)) cls += ' correct'; else if (oi === Number(retry.picked)) cls += ' wrong'; }
      return '<button class="' + cls + '" type="button" data-mpick="' + oi + '">' + String.fromCharCode(65 + oi) + '. ' + esc(o) + '</button>';
    }).join('');
    body = '<p class="mistake-q">' + esc(m.q || '') + '</p>' + optsHtml;
  } else {
    const cls = retry ? (retry.ok ? 'ok' : 'no') : '';
    const val = retry ? esc(retry.picked) : '';
    body = '<div class="cloze-item">' + esc(m.before || '')
      + '<input class="' + cls + '" data-mblank value="' + val + '" placeholder="…" autocomplete="off" spellcheck="false">'
      + esc(m.after || '') + (m.hint ? '<span class="hint">（' + esc(m.hint) + '）</span>' : '') + '</div>'
      + '<button class="btn small" type="button" data-mcheck>对答案</button>';
  }
  const myAnswer = m.kind === 'quiz' ? optionText(m, m.my) : String(m.my || '');
  const rightAnswer = m.kind === 'quiz' ? optionText(m, m.answer) : String(m.answer || '');
  const ans = '<p class="mistake-ans">上次：<b class="no">' + esc(myAnswer || '（空着）') + '</b> · 正确答案：<b class="ok">' + esc(rightAnswer) + '</b></p>';
  const note = retry
    ? '<p class="note" style="color:' + (retry.ok ? 'var(--brand-2)' : 'var(--danger)') + '">' + (retry.ok ? '这次答对了，已自动标为已订正。' : '还是不对，回原文再看一眼。') + '</p>'
    : '';
  const foot = '<div class="mistake-foot"><button class="btn small ghost" type="button" data-mai="' + esc(m.id) + '">让 AI 讲讲</button>'
    + '<button class="btn small' + (m.fixed ? ' ghost' : '') + '" type="button" data-mfix="' + esc(m.id) + '">' + (m.fixed ? '移回待订正' : '标记已订正') + '</button></div>';
  return '<div class="card mistake-card' + (m.fixed ? ' fixed' : '') + '" data-mid="' + esc(m.id) + '">' + head + body + ans + note + foot + '</div>';
}
function renderMistakes(){
  const all = getMistakes().sort((a, b) => String(b.at || '').localeCompare(String(a.at || '')));
  const openList = all.filter(m => !m.fixed);
  const fixedList = all.filter(m => m.fixed);
  updateMistakeCount(openList.length);
  const chips = $('#mistakeChips');
  if (chips){
    chips.innerHTML = [['open', '待订正 ' + openList.length], ['fixed', '已订正 ' + fixedList.length], ['all', '全部 ' + all.length]]
      .map(p => '<button class="chip' + (mistakeFilter === p[0] ? ' on' : '') + '" data-mf="' + p[0] + '" type="button">' + p[1] + '</button>').join('')
      + (fixedList.length ? '<button class="chip chip-clear" data-mclear="fixed" type="button">清空已订正</button>' : '');
  }
  const box = $('#mistakeBody');
  if (!box) return;
  const list = mistakeFilter === 'fixed' ? fixedList : (mistakeFilter === 'all' ? all : openList);
  if (!list.length){
    const msg = !all.length
      ? '错题本是空的。理解题答错、填空答错时会自动记到这里，可以就地重做。'
      : (mistakeFilter === 'fixed' ? '还没有已订正的错题。' : '没有待订正的错题，去「学习」里继续读吧。');
    box.innerHTML = '<div class="card"><p class="note" style="margin:0">' + msg + '</p></div>';
    return;
  }
  box.innerHTML = list.map(mistakeCardHtml).join('');
}
function bindMistakeEvents(){
  const box = $('#mistakeBody');
  if (box){
    box.addEventListener('click', e => {
      const card = e.target.closest && e.target.closest('[data-mid]');
      if (!card) return;
      const id = card.dataset.mid;
      const rec = ensureMistakes()[id];
      if (!rec) return;
      if (e.target.closest('[data-mpick]')){
        const oi = Number(e.target.closest('[data-mpick]').dataset.mpick);
        const ok = oi === Number(rec.answer);
        mistakeRetry[id] = { picked: oi, ok };
        if (ok) setMistakeFixed(id, true);
        saveState(); renderMistakes();
        if (ok) toast('答对了，已移到「已订正」');
        return;
      }
      if (e.target.closest('[data-mcheck]')){
        const inp = card.querySelector('[data-mblank]');
        const val = inp ? String(inp.value || '').trim() : '';
        if (!val){ toast('先把答案填上'); if (inp) inp.focus(); return; }
        const ok = val.toLowerCase() === String(rec.answer || '').trim().toLowerCase();
        mistakeRetry[id] = { picked: val, ok };
        if (ok) setMistakeFixed(id, true);
        saveState(); renderMistakes();
        if (ok) toast('答对了，已移到「已订正」');
        return;
      }
      if (e.target.closest('[data-mfix]')){
        const now = !rec.fixed;
        setMistakeFixed(id, now);
        saveState(); renderMistakes();
        toast(now ? '已标为订正' : '已移回待订正');
        return;
      }
      if (e.target.closest('[data-mopen]')){
        const lid = rec.lessonId;
        if (!getLessonById(lid)){ toast('这篇原文已经不在了（可能被删掉了）'); return; }
        window.showPage('learn');
        window.openLesson(lid);
        return;
      }
      if (e.target.closest('[data-mai]')){
        askAiWith(buildMistakeAiPrompt(rec));
        return;
      }
    });
  }
  const chips = $('#mistakeChips');
  if (chips) chips.addEventListener('click', e => {
    if (e.target.closest && e.target.closest('[data-mclear]')){ clearFixedMistakes(); return; }
    const b = e.target.closest && e.target.closest('[data-mf]');
    if (!b) return;
    mistakeFilter = b.dataset.mf;
    renderMistakes();
  });
}

function applyLessonEdits(lesson){
  if (!lesson || !state.lessonEdits) return lesson;
  const e = state.lessonEdits[lesson.id];
  if (!e || typeof e !== 'object') return lesson;
  if (Array.isArray(lesson.textZh) && e.textZh && typeof e.textZh === 'object'){
    Object.keys(e.textZh).forEach(i => { const v = e.textZh[i]; if (v) lesson.textZh[Number(i)] = v; });
  }
  if (Array.isArray(lesson.chunks)){
    lesson.chunks.forEach(c => {
      const k = String(c.chunk || '').toLowerCase();
      if (e.chunkMeaning && e.chunkMeaning[k]) c.meaning = e.chunkMeaning[k];
      if (e.chunkSentZh && e.chunkSentZh[k]) c.sentZh = e.chunkSentZh[k];
      const cs = e.chunkSentence && e.chunkSentence[k];
      if (cs){
        if (cs.sentence) c.sentence = cs.sentence;
        if (typeof cs.sentIdx === 'number') c.sentIdx = cs.sentIdx;
      }
    });
    (Array.isArray(e.extraChunks) ? e.extraChunks : []).forEach(x => {
      if (!x || !x.chunk) return;
      const k = String(x.chunk).toLowerCase();
      if (lesson.chunks.some(c => String(c.chunk || '').toLowerCase() === k)) return;
      lesson.chunks.push(Object.assign({}, x));
    });
  }
  return lesson;
}

function highlightText(text, chunks){
  let html = esc(text);
  const marks = [];
  const sorted = (chunks || []).slice().sort((a, b) => b.chunk.length - a.chunk.length);
  sorted.forEach(c => {
    const target = esc(c.chunk); let re;
    try{ re = new RegExp(escapeRegExp(target), 'gi'); }catch(e){ return; }
    html = html.replace(re, m => { const i = marks.length; marks.push(m); return '\u0001' + i + '\u0001'; });
  });
  return html.replace(/\u0001(\d+)\u0001/g, (_, i) => `<mark class="hl">${marks[Number(i)]}</mark>`);
}

/* 分句并保留位置：用于「英文第 N 句 ↔ 中文第 N 句」的精确对齐 */
const EN_SENT_RE = /[^.!?]+[.!?]+["'”’]?/g;
const ZH_SENT_RE = /[^。！？!?]+[。！？!?]+["'”’]?/g;
function splitSegments(text, re){
  const src = String(text || '');
  const out = [];
  if (!src) return out;
  re.lastIndex = 0;
  let m;
  while ((m = re.exec(src)) !== null){
    if (m[0] === ''){ re.lastIndex++; continue; }
    if (!m[0].trim()) continue;
    out.push({ text: m[0], start: m.index, end: m.index + m[0].length });
  }
  return out;
}

/* 逐句对齐后只在本句范围内高亮，避免整段串色（英文高亮了中文却标到别处） */
function highlightZhBySentence(zhText, enText, chunks){
  const zh = String(zhText || '');
  if (!zh) return '';
  if (!chunks || !chunks.length) return esc(zh);
  const zhSegs = splitSegments(zh, ZH_SENT_RE);
  const enSegs = splitSegments(String(enText || ''), EN_SENT_RE);
  if (!zhSegs.length) return highlightZh(zh, chunks);
  const aligned = enSegs.length > 0 && enSegs.length === zhSegs.length;
  let html = '';
  let cursor = 0;
  zhSegs.forEach((seg, j) => {
    if (seg.start > cursor) html += esc(zh.slice(cursor, seg.start));
    const scope = aligned
      ? chunks.filter(c => c && c.chunk && sentenceHasChunk(enSegs[j].text, c.chunk))
      : chunks.filter(c => c && c.chunk && zhAnalysis(seg.text, [c]).marks.length);
    html += scope.length ? highlightZh(seg.text, scope) : esc(seg.text);
    cursor = seg.end;
  });
  if (cursor < zh.length) html += esc(zh.slice(cursor));
  return html;
}

/* 例句：英文句 + 它对应的中文译文（优先用文章自带译文，取不到就在界面上给「翻译例句」按钮） */
function exampleFor(c, lesson){
  const chunk = String((c && c.chunk) || '').trim();
  if (!chunk) return { en:'', zh:'', idx:-1 };
  const text = (lesson && lesson.text) || [];
  const textZh = (lesson && lesson.textZh) || [];
  const raw = String((c && c.sentence) || '').trim();
  const rawOk = /[A-Za-z]{2,}/.test(raw) && sentenceHasChunk(raw, chunk);
  const idx = text.findIndex(s => s && sentenceHasChunk(s, chunk));
  if (idx >= 0){
    const enSegs = splitSegments(text[idx], EN_SENT_RE);
    const zhSegs = splitSegments(textZh[idx] || '', ZH_SENT_RE);
    const j = enSegs.findIndex(seg => sentenceHasChunk(seg.text, chunk));
    let en = j >= 0 ? enSegs[j].text.trim() : (rawOk ? raw : String(text[idx]).trim());
    let zh = '';
    if (j >= 0 && zhSegs.length === enSegs.length) zh = zhSegs[j].text.trim();
    else if (rawOk && enSegs.length === zhSegs.length){
      const k = enSegs.findIndex(seg => seg.text.trim() === raw);
      if (k >= 0) zh = zhSegs[k].text.trim();
    }
    if (!zh) zh = String(textZh[idx] || '').trim();
    if (!zh) zh = String((c && c.sentZh) || '').trim();
    return { en, zh, idx };
  }
  return { en: rawOk ? raw : '', zh: String((c && c.sentZh) || '').trim(), idx: -1 };
}

function isChunkCollected(chunk){ return state.chunks.some(c => c.chunk.toLowerCase() === chunk.toLowerCase()); }
function filterLessons(){
  const all = allLessons();
  if (learnState.level === 'custom') return all.filter(l => l.custom);
  if (learnState.level === 'all') return all;
  return all.filter(l => l.level === learnState.level);
}

/* ========== 按「等级 + 学习进度」自动生成复习短文 ==========
   不联网、不调 AI：从现有语料（内置 6 篇 + 你的文章）里挑出
   包含你「到期 / 未掌握词块」的现成句子，连同原配中文一起拼成一篇短文，
   所以英文和译文都是地道语料，不会出现机翻腔。 */
function snippetFromLesson(lesson, chunkText){
  const chunk = String(chunkText || '').trim();
  if (!chunk) return null;
  const text = (lesson && lesson.text) || [];
  const textZh = (lesson && lesson.textZh) || [];
  for (let i = 0; i < text.length; i++){
    const en = String(text[i] || '');
    if (!sentenceHasChunk(en, chunk)) continue;
    const enSegs = splitSegments(en, EN_SENT_RE);
    const zhSegs = splitSegments(textZh[i] || '', ZH_SENT_RE);
    const j = enSegs.findIndex(seg => sentenceHasChunk(seg.text, chunk));
    if (j < 0) continue;
    const zh = (zhSegs.length === enSegs.length) ? zhSegs[j].text.trim() : String(textZh[i] || '').trim();
    return { en: enSegs[j].text.trim(), zh };
  }
  return null;
}

/* 没手动选难度时，按积累量猜等级 */
function guessLevel(){
  const total = state.chunks.length;
  const mastered = state.chunks.filter(c => c.mastered).length;
  if (total >= 60 || mastered >= 25) return 'advanced';
  if (total >= 20 || mastered >= 8) return 'intermediate';
  return 'beginner';
}

function findSnippet(chunkText, level, corpus){
  const src = corpus || allLessons().filter(l => !String(l.id).startsWith('gen_'));
  const same = level ? src.filter(l => l.level === level) : src;
  const other = level ? src.filter(l => l.level !== level) : [];
  for (const group of [same, other]){
    const base = (group === same) ? 0 : 1000;
    for (let li = 0; li < group.length; li++){
      const snip = snippetFromLesson(group[li], chunkText);
      if (snip) return Object.assign(snip, { order: base + li });
    }
  }
  return null;
}

function buildGenLesson(){
  const manual = ['beginner','intermediate','advanced'].includes(learnState.level) ? learnState.level : '';
  const level = manual || guessLevel();
  const corpus = allLessons().filter(l => !String(l.id).startsWith('gen_'));
  const dueIds = new Set(getDueChunks().map(c => c.id));
  /* 目标词块排序：到期 → 未掌握 → 已掌握 */
  const pool = state.chunks.slice().sort((a, b) => {
    const ad = dueIds.has(a.id) ? 0 : (a.mastered ? 2 : 1);
    const bd = dueIds.has(b.id) ? 0 : (b.mastered ? 2 : 1);
    if (ad !== bd) return ad - bd;
    return String(a.nextReview || '').localeCompare(String(b.nextReview || ''));
  });
  const picked = [];
  const usedSent = new Set(), usedChunk = new Set();
  const target = 12;
  for (const c of pool){
    if (picked.length >= target) break;
    const key = String(c.chunk || '').toLowerCase().trim();
    if (!key || usedChunk.has(key)) continue;
    const snip = findSnippet(c.chunk, level, corpus);
    if (!snip) continue;
    const sentKey = snip.en.toLowerCase();
    if (usedSent.has(sentKey)) continue;      /* 同一句只收一次 */
    usedSent.add(sentKey); usedChunk.add(key);
    picked.push({ en: snip.en, zh: snip.zh || '', order: snip.order, chunk: c.chunk, meaning: c.meaning || lookupGloss(c.chunk) });
  }
  if (picked.length < 3) return null;
  /* 按来源文章的先后排序，让同一篇里的句子挨在一起，读起来更像一篇文章 */
  picked.sort((a, b) => a.order - b.order);
  const text = [], textZh = [], chunks = [];
  picked.forEach((p, i) => {
    text.push(p.en);
    textZh.push(p.zh);
    chunks.push({ chunk: p.chunk, sentence: p.en, meaning: p.meaning, sentIdx: i });
  });
  const lesson = normalizeLesson({
    id: 'gen_' + uid(),
    title: '复习短文 · ' + (LEVEL_LABEL[level] || '混合'),
    titleZh: '按你的学习进度自动拼装',
    level, topic: '复习',
    minutes: Math.max(2, Math.round(text.length / 3)),
    text, textZh, chunks, quiz: [], cloze: []
  });
  lesson.generated = true;
  lesson.quiz = generateQuizFromChunks(lesson.chunks, 4);
  lesson.cloze = generateClozeFromChunks(lesson.chunks, 3);
  return lesson;
}

/* 生成并存成「我的文章」里的一篇（重复生成会替换上一篇自动短文） */
function genReviewLessonNow(){
  if (!state.chunks.length){ toast('先去读一篇、收几个词块，再来生成'); return null; }
  const lesson = buildGenLesson();
  if (!lesson){
    toast('现有语料里凑不出足够句子，先多收几个词块或换个难度');
    return null;
  }
  state.customLessons = (state.customLessons || []).filter(l => !String(l.id).startsWith('gen_'));
  state.customLessons.unshift(lesson);
  saveState();
  learnState.level = 'custom';
  learnState.showTrans = true;
  if (typeof window.showPage === 'function') window.showPage('learn');
  window.openLesson(lesson.id);
  toast(`已生成 ${lesson.text.length} 句复习短文（${LEVEL_LABEL[lesson.level] || '混合'}）`);
  return lesson;
}

function renderLearnList(){
  const grid = $('#lessonGrid');
  const list = filterLessons();
  $$('#levelChips .chip').forEach(b => b.classList.toggle('on', b.dataset.level === learnState.level));
  /* 继续上次阅读 */
  const bar = $('#resumeBar');
  if (bar){
    const lastId = state.settings && state.settings.lastLessonId;
    const last = lastId ? getLessonById(lastId) : null;
    if (last){
      bar.innerHTML = `<button class="btn small" type="button" data-resume="${esc(last.id)}">📖 继续上次阅读：${esc(last.title)}</button>`;
      bar.querySelector('[data-resume]').onclick = () => window.openLesson(last.id);
    } else {
      bar.innerHTML = '';
    }
  }
  if (!list.length){
    grid.innerHTML = `<div class="empty" style="grid-column:1/-1;"><p class="big">${learnState.level === 'custom' ? '你还没有添加自己的文章' : '这里还没有内容'}</p><p class="sub">${learnState.level === 'custom' ? '点上面的「添加我的英文文章」' : '换一个难度试试'}</p></div>`;
    return;
  }
  grid.innerHTML = list.map(l => {
    const lvClass = l.custom ? 'custom' : l.level;
    const lvText = l.custom ? '我的文章' : LEVEL_LABEL[l.level];
    const chunkCount = (l.chunks || []).length;
    const gotCount = (l.chunks || []).filter(c => c && isChunkCollected(c.chunk)).length;
    const gotText = chunkCount ? `<span>已收 <b>${gotCount}</b> / ${chunkCount} 个词块</span>` : '<span>暂无词块</span>';
    const tools = l.custom ? `
      <div class="card-tools">
        <button class="card-tool-btn" data-edit-lesson="${esc(l.id)}" title="编辑" type="button">✎</button>
        <button class="card-tool-btn del" data-del-lesson="${esc(l.id)}" title="删除" type="button">✕</button>
      </div>` : '';
    return `
      <div class="lesson-card" data-lesson="${esc(l.id)}" role="button" tabindex="0">
        ${tools}
        <span class="lv ${lvClass}">${lvText}</span>
        <p class="t">${esc(l.title)}</p>
        <p class="zh">${esc(l.titleZh || '')}${l.titleZh && l.topic ? ' · ' : ''}${esc(l.topic || '')}</p>
        <div class="meta">
          <span>约 <b>${l.minutes}</b> 分钟</span>
          ${gotText}
          ${l.quiz.length ? `<span><b>${l.quiz.length}</b> 道理解题</span>` : ''}
          ${l.cloze.length ? `<span><b>${l.cloze.length}</b> 道填空题</span>` : ''}
        </div>
      </div>`;
  }).join('');
}

window.openLesson = function(id){
  const lesson = getLessonById(id);
  if (!lesson){ toast('文章不存在'); return; }
  learnState.lessonId = id;
  learnState.showTrans = false;
  grammarState = { all:false, open:{} };
  transState = { open:{} };
  if (!state.settings) state.settings = { currentWeek: 1 };
  state.settings.lastLessonId = id;
  saveState();
  renderLearn();
  window.scrollTo({ top: 0, behavior: 'smooth' });
};
window.editLesson = function(id){ const l = getLessonById(id); if (l) openArticleModal(l); };
window.removeLesson = function(id){ deleteArticle(id); };

function renderLearn(){
  const list = $('#learnList');
  const detail = $('#learnDetail');
  if (learnState.lessonId){
    const lesson = getLessonById(learnState.lessonId);
    if (lesson){ list.hidden = true; detail.hidden = false; renderLessonDetail(lesson); return; }
    learnState.lessonId = null;
  }
  list.hidden = false; detail.hidden = true;
  renderLearnList();
}

/* ========== 把一句话对回正文 ==========
   数据里 lesson.text 存的是「段」，一段里可能有四五个句子，而题目解析引用的却是其中某一句。
   好在 textZh 与 text 是逐段、逐句一一对应的（33 段里 29 段句数完全相等），于是：
   先切句 → 找到这句在段里的下标 → 取中文段的同一句，就能白拿现成的人工翻译。
   这一步不联网，所以「解析里的原句中文」不用再点按钮。 */
function splitEnSentences(text){
  const s = String(text || '');
  const out = [];
  let buf = '';
  for (let i = 0; i < s.length; i++){
    buf += s[i];
    if (s[i] === '.' || s[i] === '!' || s[i] === '?'){
      /* 句末引号、右括号属于上一句（'"Hi." he said' 不该在引号后面断开） */
      while (i + 1 < s.length && /["'”’)\]]/.test(s[i + 1])){ buf += s[++i]; }
      out.push(buf.trim()); buf = '';
    }
  }
  if (buf.trim()) out.push(buf.trim());
  return out.filter(Boolean);
}
function splitZhSentences(text){
  return String(text || '').split(/(?<=[。！？…])/).map(s => s.trim()).filter(Boolean);
}
/* 比大小写、标点、空白：引用段落与原文的差别常常只有标点和空格 */
function normEnKey(s){
  return String(s || '').toLowerCase().replace(/[^a-z0-9']+/g, ' ').replace(/\s+/g, ' ').trim();
}
/* 返回 { para, sent }：para 是段下标，sent 是段内句下标（对不上句给 -1），找不到返回 null */
function locateSentence(lesson, enText){
  const text = (lesson && lesson.text) || [];
  const key = normEnKey(enText);
  if (!key) return null;
  for (let i = 0; i < text.length; i++){
    const para = String(text[i] || '');
    if (!para) continue;
    const pKey = normEnKey(para);
    if (!pKey) continue;
    if (pKey.includes(key)){
      const sent = splitEnSentences(para).findIndex(s => {
        const sKey = normEnKey(s);
        return sKey && (sKey.includes(key) || key.includes(sKey));
      });
      return { para: i, sent: sent };
    }
    /* 反过来：引用里把整段带上了（作者把两句解释合成一句时） */
    if (pKey.length > 20 && key.includes(pKey)) return { para: i, sent: -1 };
  }
  return null;
}
/* 一句英文 → 现成中文。scope 为 sentence 表示取到了这一句，paragraph 表示只取到整段 */
function zhForSentence(lesson, enText){
  const hit = locateSentence(lesson, enText);
  if (!hit) return null;
  const zhPara = ((lesson && lesson.textZh) || [])[hit.para] || '';
  if (!zhPara) return null;
  if (hit.sent >= 0){
    const enList = splitEnSentences(lesson.text[hit.para]);
    const zhList = splitZhSentences(zhPara);
    if (enList.length && enList.length === zhList.length && zhList[hit.sent]) return { zh: zhList[hit.sent], scope: 'sentence', para: hit.para };
  }
  return { zh: zhPara, scope: 'paragraph', para: hit.para };
}

/* 解析：清晰的中文解析布局 */
function buildQuizExplain(q, lesson, qi){
  const ansLetter = String.fromCharCode(65 + q.answer);
  const ansText = q.options[q.answer];

  let zhMeaning = q.correctMeaning || '';
  if (!zhMeaning){
    const chunk = lesson.chunks.find(c => c.chunk.toLowerCase() === ansText.toLowerCase());
    if (chunk && chunk.meaning) zhMeaning = chunk.meaning;
  }
  if (!zhMeaning) zhMeaning = lookupGloss(ansText);

  /* 数据里写的是「原文：」，早期代码只剥了「原句：」，于是界面上原样带出前缀。
     两个都剥，另外容忍半角冒号和多余空格。 */
  const origSentence = q.explain ? String(q.explain).replace(/^(原句|原文)\s*[：:]\s*/, '').trim() : '';

  /* 原句的中文：先认 q.sentIdx，认不到就把这句对回正文段落。
     内置文章一条 sentIdx 都没有（只有自动出题会写），所以以前这里恒为空、
     用户只能点按钮重新翻一遍——而这句中文其实正文里早就有了。 */
  let zhTrans = '';
  let zhTransScope = 'sentence';
  if (typeof q.sentIdx === 'number' && lesson.textZh && lesson.textZh[q.sentIdx]){
    zhTrans = lesson.textZh[q.sentIdx];
  } else if (origSentence){
    const hit = zhForSentence(lesson, origSentence);
    if (hit){ zhTrans = hit.zh; zhTransScope = hit.scope; }
  }

  let html = '<div class="quiz-explain">';
  html += '<div class="exp-head">';
  html += `<div class="exp-icon">✓</div>`;
  html += '<div class="exp-main">';
  html += `<div class="exp-answer">${ansLetter}. ${esc(ansText)}</div>`;
  if (zhMeaning) html += `<div class="exp-answer-zh"><span class="zh-mark">中文</span>${esc(zhMeaning)}</div>`;
  html += '</div></div>';

  if (origSentence){
    html += '<div class="exp-section en-text">';
    html += '<span class="exp-label-tag en">原句</span>';
    html += `<div class="exp-text">${esc(origSentence)}</div>`;
    html += '</div>';
  }
  if (zhTrans){
    html += '<div class="exp-section tr-text">';
    /* 句数对不上时只能给整段译文，写清楚，别让人以为只翻了这一句 */
    html += '<span class="exp-label-tag tr">' + (zhTransScope === 'paragraph' ? '本段译文' : '翻译') + '</span>';
    html += `<div class="exp-text">${esc(zhTrans)}</div>`;
    html += '</div>';
  }

  /* 这里原本还有一块「中文」，把题干、正确答案、原句再各翻一遍。
     但原句的中文上面「翻译」那一行已经给了，正确答案的中文也在头部，
     再列一遍只是把解析撑长一倍（同一句中文一屏里出现两次），所以整块去掉。
     需要更细的讲解就点下面的「让 AI 讲讲这句」——那比再翻译一遍有用。 */
  if (origSentence){
    html += '<div class="exp-actions">';
    html += `<button class="btn tiny ghost" data-qai="${qi}" type="button">让 AI 讲讲这句</button>`;
    html += '</div>';
  }

  html += '</div>';
  return html;
}

/* 填空题的「正确答案 + 解析」内容 */
function clozeResHtml(item, ok, lesson, idx){
  const rawAns = String((item && item.answer) || '');
  const ans = rawAns.trim().toLowerCase();
  const info = ((lesson && lesson.chunks) || []).find(c => c.chunk && c.chunk.toLowerCase() === ans);
  const meaning = (info && info.meaning) || (item && item.hint) || '';
  const full = `${(item && item.before) || ''}${rawAns}${(item && item.after) || ''}`.replace(/\s+/g, ' ').trim();
  /* 填对填错都值得知道这句在说什么。填空本来就是从正文里挖出来的句子，
     所以先问正文：对得上就直接用那句现成的中文，一次网都不用发。 */
  const localZh = full ? zhForSentence(lesson, full) : null;
  const cachedZh = localZh ? localZh.zh : (full ? trCacheGet(full) : '');
  const zhLabel = localZh && localZh.scope === 'paragraph' ? '本段：' : '';
  let zhPart = '';
  if (full){
    zhPart = cachedZh
      ? `<span class="cr-zh">${esc(zhLabel + cachedZh)}</span>`
      : (Number.isFinite(Number(idx))
          ? `<span class="cr-zh" data-cloze-zh-box="${idx}" hidden></span><button class="btn tiny ghost" data-cloze-zh="${idx}" data-cloze-zh-auto="1" type="button">句意</button>`
          : '');
  }
  return `<span class="cr-ans ${ok ? 'ok' : 'no'}">${ok ? '✓ 正确' : '✗ 正确答案'}</span>` +
    `<span class="cr-word">${esc(rawAns)}</span>` +
    (meaning ? `<span class="cr-m">${esc(meaning)}</span>` : '') +
    (full ? `<span class="cr-sent">原句：${esc(full)}</span>` : '') +
    zhPart;
}

/* 上一篇 / 下一篇：按当前难度筛选的顺序走，省得每次返回列表 */
function buildLessonNav(lesson){
  const list = filterLessons();
  const idx = list.findIndex(l => l.id === lesson.id);
  if (idx < 0 || list.length < 2) return '';
  const prev = idx > 0 ? list[idx - 1] : null;
  const next = idx < list.length - 1 ? list[idx + 1] : null;
  if (!prev && !next) return '';
  return `<div class="lesson-nav">
    ${prev ? `<button class="btn small" type="button" data-nav="${esc(prev.id)}">← ${esc(prev.title)}</button>` : '<span></span>'}
    ${next ? `<button class="btn small" type="button" data-nav="${esc(next.id)}">${esc(next.title)} →</button>` : '<span></span>'}
  </div>`;
}

/* ========== 文章详情页 ==========
   详情页原来是「算数据 + 拼 HTML + 绑事件」三百多行挤在一个函数里：改一处排版要往下翻两百行
   才找得到对应的绑定，漏改就是「点了没反应」。现在按块拆开——每个 render* 只拼自己那一段 HTML，
   bindLessonDetailEvents 只挂事件，renderLessonDetail 只做编排。
   拆的只是位置，不是行为：模板与绑定代码逐字保留。 */

/* ========== 语法解读 ==========
   本地没有语法引擎，在线语法 API 要么收费要么慢，所以这里用一组「结构特征 → 中文说明」的规则。
   原则是宁可漏、不瞎猜：命中的关键词一定真的构成那种结构；没命中只说明「没检测到典型结构」，
   所以文案都写「提示」「可能」，不写成判卷式的断言。 */
const GRAMMAR_RULES = [
  { t: '定语从句', re: /\b(which|who|whom|whose)\b/i, n: 'which/who/whom/whose 引导从句，修饰它前面的名词。' },
  { t: '状语从句', re: /\b(because|since|although|though|even though|whereas|unless|as soon as|until|whenever|so that)\b/i, n: '连词引导从句，说明原因、条件、时间或让步。' },
  { t: '宾语从句', re: /\b(think|thought|say|said|know|knew|believe|believed|find|found|show|showed|tell|told|hope|realize|realized|mean|means|meant|notice|noticed|wonder|wondered|learn|learned)\b[^.;?!]{0,30}\b(that|what|whether|if|how|why|when|where)\b/i, n: '动词后面接了一整句作宾语，从句要用陈述语序。' },
  { t: '主语从句', re: /^(what|whether|how|why|that|whoever)\b[^.;?!]{6,}/i, n: '整句作主语，谓语动词一般用单数。' },
  { t: '表语从句', re: /\b(is|was|are|were|seems|seem|becomes|become)\s+(that|what|because|why|whether|how)\b/i, n: '系动词后面的从句说明主语是什么。' },
  { t: 'There be 句型', re: /\bthere\s+(is|are|was|were|has been|have been)\b/i, n: '表示「有」，真正的主语在 be 后面。' },
  { t: '现在完成时', re: /\b(have|has|ve)\s+(not\s+)?(been|done|gone|made|seen|taken|written|spoken|known|given|found|heard|left|lost|met|paid|read|run|said|sold|sent|shown|told|thought|won|built|brought|bought|caught|chosen|driven|eaten|felt|fought|kept|led|lent|meant|put|risen|sat|slept|spent|stood|taught|understood|worn|\w+ed)\b/i, n: 'have/has + 过去分词：已经完成，或从过去持续到现在。' },
  { t: '过去完成时', re: /\bhad\s+(been|done|gone|made|seen|taken|written|spoken|known|given|found|heard|left|lost|met|paid|read|run|said|sold|sent|shown|told|thought|won|built|brought|bought|kept|meant|put|sat|slept|spent|stood|taught|understood|\w+ed)\b/i, n: 'had + 过去分词：在过去某个时间点之前就已完成。' },
  { t: '一般将来时', re: /\b(will|shall|going to)\b/i, n: 'will / be going to 表示将来的动作或打算。' },
  { t: '过去进行时', re: /\b(was|were)\s+\w+ing\b/i, n: 'was/were + 动词 ing：过去某一刻正在发生。' },
  { t: '现在进行时', re: /\b(is|are|am)\s+\w+ing\b/i, n: 'be + 动词 ing：此刻正在发生。' },
  { t: '被动语态', re: /\b(is|are|was|were|be|been|being)\s+(built|brought|bought|caught|chosen|done|driven|eaten|felt|found|given|gone|heard|held|kept|known|left|lost|made|meant|met|paid|put|read|said|seen|sent|shown|sold|spoken|spent|taught|taken|told|thought|understood|won|written|\w+ed)\b/i, n: 'be + 过去分词：主语是动作的承受者，常和 by 连用。' },
  { t: '不定式', re: /\b(want|wants|wanted|need|needs|needed|decide|decided|try|tried|hope|hoped|plan|planned|refuse|refused|learn|learned|manage|managed|fail|failed|afford|afforded|choose|chose|promise|promised|begin|began|start|started|like|love|hate|forget|forgot|remember|remembered)\s+(not\s+)?to\s+\w+/i, n: '动词 + to do：不定式作宾语。' },
  { t: '目的状语', re: /^\s*to\s+\w+/i, n: '句首的 to do 常表示「为了……」。' },
  { t: '动名词', re: /\b(enjoy|enjoys|enjoyed|finish|finished|mind|avoid|practice|practiced|suggest|suggested|keep|kept|consider|considered|imagine|stop|quit|give up|gave up)\s+\w+ing\b/i, n: '动词 + doing：动名词作宾语。' },
  { t: '分词作状语', re: /,\s*\w+ing\b/i, n: '逗号后的 -ing 短语说明伴随动作或原因。' },
  { t: '情态动词', re: /\b(can|could|may|might|must|should|would|ought to|have to|has to|had to|able to)\b/i, n: '表示能力、推测、义务或礼貌，后面跟动词原形。' },
  { t: '比较结构', re: /\b(more|less|better|worse|bigger|smaller|faster|slower|easier|harder|higher|lower|longer|shorter|older|younger|stronger|weaker|fewer)\s+\w+\s+than\b|\bas\s+\w+\s+as\b/i, n: '比较级 + than，或 as … as 表示比较。' },
  { t: 'it 作形式主语', re: /\bit\s+(is|was|seems|seem|becomes|become)\b[^.;?!]{0,30}\bto\s+\w+/i, n: 'it 先占主语位置，真正的主语是后面的 to do。' },
  { t: '虚拟/条件', re: /\bif\b[^.;?!]{0,60}\b(would|could|were)\b/i, n: 'if 从句 + would/could：表示假设（可能是虚拟语气）。' },
  { t: '否定句', re: /\b(not|never|nothing|nobody|none|neither|nor)\b/i, n: '否定结构，注意它否定的范围。' },
  { t: '程度修饰', re: /\b(very|really|quite|rather|extremely|too|enough|fairly|pretty)\b/i, n: '副词修饰形容词或动词，表示程度。' }
];
/* 一条句子最多给 4 条提示：再多就不是「解读」，而是把整句重新讲一遍。 */
const GRAMMAR_MAX_TAGS = 4;
function grammarTags(sentence){
  const s = String(sentence || '');
  if (!s) return [];
  const out = [];
  for (let i = 0; i < GRAMMAR_RULES.length && out.length < GRAMMAR_MAX_TAGS; i++){
    const r = GRAMMAR_RULES[i];
    if (out.some(x => x.t === r.t)) continue;
    if (r.re.test(s)) out.push({ t: r.t, n: r.n });
  }
  return out;
}
function grammarHtml(sentence){
  const s = String(sentence || '');
  const words = s.split(/\s+/).filter(Boolean).length;
  const tags = grammarTags(s);
  let html = '<div class="gm-body">';
  if (words >= 26) html += '<p class="gm-tip">这句有 ' + words + ' 个词，先找主谓，再看连接词把句子切成了几段。</p>';
  if (!tags.length){
    html += '<p class="gm-tip">没命中常见的复杂结构，多半是简单句：主语 + 动词 + 宾语。</p>';
  } else {
    html += '<ul class="gm-list">' + tags.map(t => '<li><b>' + esc(t.t) + '</b><span>' + esc(t.n) + '</span></li>').join('') + '</ul>';
  }
  html += '<p class="gm-note">按结构关键词自动匹配，只作阅读提示，不是逐词语法标注。</p></div>';
  return html;
}

/* 逐句对照：英文 + 中文译文（中文里的词块高亮只算本句的） */
function renderParaBlocks(lesson, textZh){
  /* 逐句渲染，每句中文只高亮属于本句的词块 */
  const paras = lesson.text.map((p, i) => {
    if (!p) return '';
    const zh = textZh[i] || '';
    const zhChunks = (lesson.chunks || []).filter(c => {
      if (typeof c.sentIdx === 'number') return c.sentIdx === i;
      /* 内置文章的词块没有句索引：先按整段相等比较，再用「本段英文是否包含该词块」兜底，
         否则整段 p 与单句 c.sentence 互相 includes 永远不成立，中文高亮会全部失效 */
      if (c.sentence && p && (p.includes(c.sentence) || c.sentence.includes(p))) return true;
      if (c.chunk && p) return p.toLowerCase().includes(c.chunk.toLowerCase());
      return false;
    });
    /* 每句的翻译开关：与全局「显示翻译」是「或」的关系——全局开着就都露出来，
       全局关着也能单独点开一句。译文框永远渲染（没有中文时是「自动翻译本句」），
       这样按钮先切换 hidden 就行，不用重渲染，不会丢滚动位置。 */
    const trOpen = !!(learnState.showTrans || transState.open[i]);
    const transBlock = zh
      ? `<div class="para-trans${trOpen ? '' : ' hidden'}" data-trans-box="${i}"><p class="para-zh">${highlightZhBySentence(zh, p, zhChunks)}</p>${zhGlossHtml(zh, zhChunks)}</div>`
      : `<p class="para-trans missing${trOpen ? '' : ' hidden'}" data-trans-box="${i}">这一句还没有中文翻译 <button class="btn tiny" data-trans-para="${i}" type="button">自动翻译本句</button></p>`;
    const gmOpen = grammarState.all || !!grammarState.open[i];
    /* 「问 AI」与「语法」并排放在每句下面这一行：语法框默认收起，
       把入口藏进框里等于让人先展开才看得见。 */
    const grammarBlock = `<div class="pg-row">
        <button class="btn tiny ghost" data-trans-toggle="${i}" aria-expanded="${trOpen}" type="button">${trOpen ? '收起翻译' : '翻译'}</button>
        <button class="btn tiny ghost" data-grammar="${i}" aria-expanded="${gmOpen}" type="button">${gmOpen ? '收起语法' : '语法'}</button>
        <button class="btn tiny ghost" data-gai="${i}" type="button">问 AI</button>
      </div>
      <div class="grammar-box" data-grammar-box="${i}"${gmOpen ? '' : ' hidden'}>${grammarHtml(p)}</div>`;
    return `<div class="para-block">
      <p class="para"><span class="sent-idx">${i + 1}</span>${highlightText(p, lesson.chunks)}${speakBtn(p)}</p>
      ${transBlock}
      ${grammarBlock}
    </div>`;
  }).join('');
  return paras;
}

/* 重点词块列表：意思缺失给输入框，没收录给「收进词块本」 */
function renderChunkRows(lesson){
  const chunkRows = lesson.chunks.length ? lesson.chunks.map((c, i) => {
    const collected = isChunkCollected(c.chunk);
    const ex = exampleFor(c, lesson);
    const meaningHtml = c.meaning
      ? esc(c.meaning)
      : `<input class="inline-input" data-meaning-idx="${i}" placeholder="补充中文意思（回车保存）" autocomplete="off">
         <div class="inline-tip">也可以点「译」自动翻译 <button class="btn tiny" data-trans-chunk="${i}" type="button">译</button></div>`;
    const exEn = ex.en ? `<div class="ci-sent">${highlightText(ex.en, [{ chunk: c.chunk }])}${speakBtn(ex.en)}</div>` : '';
    const exZh = !ex.en ? ''
      : (ex.zh
          ? `<div class="ci-sent-zh">${esc(ex.zh)}</div>`
          : `<div class="ci-sent-zh"><button class="btn tiny" data-trans-sent="${i}" type="button">翻译例句</button></div>`);
    return `<div class="chunk-item">
      <div class="ci-main">
        <div class="ci-c">${esc(c.chunk)}${speakBtn(c.chunk)}</div>
        <div class="ci-m">${meaningHtml}</div>
        ${exEn}${exZh}
      </div>
      <button class="btn small ${collected ? '' : 'primary'}" data-collect="${i}" ${collected ? 'disabled' : ''} type="button">${collected ? '已收录' : '＋ 收进词块本'}</button>
    </div>`;
  }).join('') : `<div class="empty" style="padding:16px;"><p class="sub">${lesson.custom ? '在原文里选中词块，即可直接加进词块本' : '暂无预设词块'}</p></div>`;
  return chunkRows;
}

/* 理解题：已答的题标出对错并展开解析 */
function renderQuizItems(lesson, answers){
  const quizList = lesson.quiz || [];
  const quizHtml = quizList.map((q, qi) => {
    const picked = answers[qi];
    const opts = q.options.map((o, oi) => {
      let cls = 'opt';
      if (picked !== undefined){ if (oi === q.answer) cls += ' correct'; else if (oi === picked) cls += ' wrong'; }
      return `<button class="${cls}" data-qi="${qi}" data-oi="${oi}" ${picked !== undefined ? 'disabled' : ''} type="button"><span class="q-idx">${String.fromCharCode(65 + oi)}.</span> ${esc(o)}</button>`;
    }).join('');
    const explainBlock = picked !== undefined ? buildQuizExplain(q, lesson, qi) : '';
    return `<div class="quiz-item"><p class="quiz-q"><span class="q-idx">${qi + 1}.</span> ${esc(q.q)}</p>${opts}${explainBlock}</div>`;
  }).join('');
  return quizHtml;
}

/* 填空练习：上一轮的判定结果就地展开 */
function renderClozeItems(lesson, prog){
  const clozeList = lesson.cloze || [];
  const clozeVals = prog.cloze || {};
  const clozeRes = prog.clozeRes || {};
  const clozeHtml = clozeList.map((c, i) => {
    const val = clozeVals[i] || '';
    const st = clozeRes[i];
    const cls = st === undefined ? '' : (st ? 'ok' : 'no');
    /* 每题一个「看答案」：判这一题、只展开这一题的答案。以前只有卡片头一颗「检查答案」，
       一点就把全部题的答案摊开——那正是最碍眼的地方。 */
    return `<div class="cloze-item">${esc(c.before)}<input class="${cls}" data-cloze="${i}" value="${esc(val)}" placeholder="…" autocomplete="off" spellcheck="false">${esc(c.after)}<span class="hint">（${esc(c.hint || '…')}）</span><button class="btn tiny ghost" data-cloze-check="${i}" type="button">${st === undefined ? '看这题答案' : '再判一次'}</button><div class="cloze-res" data-cloze-res="${i}"${st === undefined ? ' hidden' : ''}>${st === undefined ? '' : clozeResHtml(c, st, lesson, i)}</div></div>`;
  }).join('');
  return clozeHtml;
}

/* 详情页骨架：标题头 + 三张卡片 + 上/下一篇 */
function lessonDetailHtml(lesson, ctx){
  const textZh = ctx.textZh;
  const hasZh = ctx.hasZh;
  const missingZh = ctx.missingZh;
  const quizList = ctx.quizList;
  const hasQuiz = ctx.hasQuiz;
  const hasCloze = ctx.hasCloze;
  const answeredCount = ctx.answeredCount;
  const correctCount = ctx.correctCount;
  const paras = ctx.paras;
  const chunkRows = ctx.chunkRows;
  const quizHtml = ctx.quizHtml;
  const clozeHtml = ctx.clozeHtml;
  const lvClass = lesson.custom ? 'custom' : lesson.level;
  const lvText = lesson.custom ? '我的文章' : LEVEL_LABEL[lesson.level];

  const navHtml = buildLessonNav(lesson);

  return `
    <div class="reading-head">
      <button class="btn small ghost" id="btnBackList" type="button">← 返回列表</button>
      <div class="info">
        <h2>${esc(lesson.title)}</h2>
        <div class="meta">
          <span class="lv ${lvClass}">${lvText}</span>
          ${lesson.titleZh ? `<span>${esc(lesson.titleZh)}</span>` : ''}
          <span>约 ${lesson.minutes} 分钟</span>
          <span>${lesson.text.length} 句 / ${textZh.filter(Boolean).length} 句中文</span>
        </div>
      </div>
      ${lesson.custom ? `<div class="head-tools">
        <button class="btn small" id="btnReanalyze" type="button">重新分析</button>
        <button class="btn small" id="btnEditLesson" type="button">编辑文章</button>
        <button class="btn small danger" id="btnDeleteLesson" type="button">删除</button>
      </div>` : ''}
    </div>
    <div class="select-hint">每句英文对应一句中文，中文里的词块意思会同步绿色高亮。页面上任意英文都可以框选：随手翻译，或收进词块本。</div>
    <div class="card">
      <div class="card-head">
        <h3>逐句对照</h3>
        <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;">
          <span class="note" style="margin:0;">绿色高亮 = 重点词块</span>
          <button class="btn small ${grammarState.all ? 'primary' : ''}" id="btnToggleGrammar" type="button">${grammarState.all ? '收起全部语法' : '全部语法'}</button>
          ${lesson.custom && missingZh ? `<button class="btn small" id="btnTranslateAll" type="button">逐句自动翻译</button>` : ''}
          ${hasZh ? `<button class="btn small ${learnState.showTrans ? 'primary' : ''}" id="btnToggleTrans" type="button">${learnState.showTrans ? '隐藏翻译' : '显示翻译'}</button>` : ''}
        </div>
      </div>
      ${paras}
    </div>
    <div class="card">
      <div class="card-head"><h3>重点词块</h3><span class="note" style="margin:0;">收录后第 2 天开始复习</span></div>
      ${chunkRows}
    </div>
    ${hasQuiz ? `<div class="card"><div class="card-head"><h3>理解题</h3><span class="quiz-score">已答 <b>${answeredCount}</b> / ${quizList.length}，正确 <b>${correctCount}</b></span></div>${quizHtml}</div>` : ''}
    ${hasCloze ? `<div class="card"><div class="card-head"><h3>填空练习</h3><button class="btn small" id="btnCheckCloze" type="button">全部检查</button></div><p class="note" style="margin:-4px 0 8px;">每题下面都有「看这题答案」，只想对一题就点那一题。</p>${clozeHtml}</div>` : ''}
    ${navHtml}
  `;
}

/* 详情页上的全部交互：导航、翻译、答题、填空、收录、选中加词块 */
function bindLessonDetailEvents(lesson, prog, ctx){
  const detail = $('#learnDetail');
  const clozeList = ctx.clozeList;
  /* 统一走 window.openLesson：这个函数是挂到 window 上的（内联 onclick 也要用），
     裸写 openLesson 只是碰巧靠全局对象解析到，换个作用域就会报 no-undef。 */
  detail.querySelectorAll('[data-nav]').forEach(b => { b.onclick = () => window.openLesson(b.dataset.nav); });

  $('#btnBackList').onclick = () => {
    learnState.lessonId = null; learnState.showTrans = false;
    renderLearn();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const tBtn = $('#btnToggleTrans');
  if (tBtn) tBtn.onclick = () => {
    learnState.showTrans = !learnState.showTrans;
    /* 全局开关压过单句开关：关掉时把单句的展开状态一起清掉，
       否则点了「隐藏翻译」还有几句赖着不走 */
    if (!learnState.showTrans) transState.open = {};
    /* 同时改 hidden 属性和 class，避免重渲染后两种状态互相打架 */
    detail.querySelectorAll('.para-trans').forEach(el => {
      el.hidden = !learnState.showTrans;
      el.classList.toggle('hidden', !learnState.showTrans);
    });
    detail.querySelectorAll('[data-trans-toggle]').forEach(b => {
      b.textContent = learnState.showTrans ? '收起翻译' : '翻译';
      b.setAttribute('aria-expanded', String(learnState.showTrans));
    });
    tBtn.textContent = learnState.showTrans ? '隐藏翻译' : '显示翻译';
    tBtn.classList.toggle('primary', learnState.showTrans);
  };

  const allBtn = $('#btnTranslateAll');
  if (allBtn) allBtn.onclick = async () => {
    allBtn.disabled = true;
    allBtn.innerHTML = '<span class="loading-dot"></span>逐句翻译中…';
    try {
      const results = await translateSentences(lesson.text, (i, n) => {
        allBtn.innerHTML = `<span class="loading-dot"></span>翻译中 ${i}/${n}`;
      });
      const merged = results.map((t, i) => {
        const existing = (lesson.textZh && lesson.textZh[i]) || '';
        return existing && existing.trim() ? existing : (t || '');
      });
      lesson.textZh = merged;
      rememberLessonEdit(lesson, e => {
        e.textZh = e.textZh || {};
        merged.forEach((t, i) => { if (t) e.textZh[i] = t; });
      });
      learnState.showTrans = true;
      renderLearn();
      toast('逐句翻译完成');
    } catch(e){
      toast('翻译失败，请检查网络后重试');
      allBtn.disabled = false;
      allBtn.textContent = '逐句自动翻译';
    }
  };

    detail.querySelectorAll('[data-trans-para]').forEach(btn => {
    btn.onclick = async () => {
      const i = Number(btn.dataset.transPara);
      if (!lesson.text[i]) return;
      btn.disabled = true;
      btn.innerHTML = '<span class="loading-dot"></span>翻译中…';
      const t = await translateOne(lesson.text[i]);
      if (!t){ toast('翻译失败，请稍后重试'); btn.disabled = false; btn.textContent = '自动翻译本句'; return; }
      if (!lesson.textZh) lesson.textZh = [];
      lesson.textZh[i] = t;
      rememberLessonEdit(lesson, e => { e.textZh = e.textZh || {}; e.textZh[i] = t; });
      learnState.showTrans = true;
      renderLearn();
      toast('本句已翻译');
    };
  });

  detail.querySelectorAll('[data-trans-chunk]').forEach(btn => {
    btn.onclick = async (e) => {
      e.stopPropagation();
      const idx = Number(btn.dataset.transChunk);
      const target = lesson.chunks[idx];
      if (!target) return;
      btn.disabled = true;
      btn.innerHTML = '<span class="loading-dot"></span>';
      const t = await translateChunkMeaning(target.chunk);
      if (!t){ toast('翻译失败，请手动填写'); btn.disabled = false; btn.textContent = '译'; return; }
      target.meaning = t;
      rememberLessonEdit(lesson, e => {
        e.chunkMeaning = e.chunkMeaning || {};
        e.chunkMeaning[String(target.chunk).toLowerCase()] = t;
      });
      renderLessonDetail(lesson);
      toast('已翻译：' + t);
    };
  });

  /* 例句没有现成译文时，点一下就翻（内置文章的译文记在 state.lessonEdits 里） */
  detail.querySelectorAll('[data-trans-sent]').forEach(btn => {
    btn.onclick = async (e) => {
      e.stopPropagation();
      const idx = Number(btn.dataset.transSent);
      const item = lesson.chunks[idx];
      if (!item) return;
      const ex = exampleFor(item, lesson);
      if (!ex.en) return;
      btn.disabled = true;
      btn.innerHTML = '<span class="loading-dot"></span>翻译中…';
      const t = await translateOne(ex.en);
      if (!t){ toast('翻译失败，请稍后重试'); btn.disabled = false; btn.textContent = '翻译例句'; return; }
      item.sentZh = t;
      rememberLessonEdit(lesson, e => {
        e.chunkSentZh = e.chunkSentZh || {};
        e.chunkSentZh[String(item.chunk).toLowerCase()] = t;
      });
      renderLessonDetail(lesson);
      toast('例句已翻译');
    };
  });

  if (lesson.custom){
    const eBtn = $('#btnEditLesson'); const dBtn = $('#btnDeleteLesson'); const rBtn = $('#btnReanalyze');
    if (eBtn) eBtn.onclick = () => openArticleModal(lesson);
    if (dBtn) dBtn.onclick = () => deleteArticle(lesson.id);
    if (rBtn) rBtn.onclick = () => {
      if (!confirm('重新分析会重新识别词块、生成题目。已补充的词块意思会保留。继续吗？')) return;
      analyzeLesson(lesson, { force: true, keepMeaning: true });
      clearLessonProg(lesson.id);
      saveState();
      renderLearn();
      toast('已重新分析');
    };
  }

  /* 每句的翻译开关：只改 hidden，不重渲染（重渲染会丢滚动位置）。
     这句还没有译文时，框里就是「自动翻译本句」，点开就能翻。 */
  detail.querySelectorAll('[data-trans-toggle]').forEach(btn => {
    btn.onclick = () => {
      const i = Number(btn.dataset.transToggle);
      const box = detail.querySelector('[data-trans-box="' + i + '"]');
      if (!box) return;
      /* 译文的显隐是靠 .hidden 这个 class（渲染时就带上了），不是 hidden 属性，
         所以两个都要改——只改属性的话 class 还在，看起来像点了没反应 */
      const show = box.classList.contains('hidden');
      box.classList.toggle('hidden', !show);
      box.hidden = !show;
      btn.textContent = show ? '收起翻译' : '翻译';
      btn.setAttribute('aria-expanded', String(show));
      if (show) transState.open[i] = true; else delete transState.open[i];
    };
  });

  /* 语法解读：按句展开/收起。只改 hidden，不重渲染——重渲染会丢焦点和滚动位置 */
  detail.querySelectorAll('[data-grammar]').forEach(btn => {
    btn.onclick = () => {
      const i = Number(btn.dataset.grammar);
      const box = detail.querySelector('[data-grammar-box="' + i + '"]');
      if (!box) return;
      box.hidden = !box.hidden;
      btn.textContent = box.hidden ? '语法' : '收起语法';
      btn.setAttribute('aria-expanded', String(!box.hidden));
      if (box.hidden) delete grammarState.open[i]; else grammarState.open[i] = true;
    };
  });
  const gmAll = $('#btnToggleGrammar');
  if (gmAll) gmAll.onclick = () => {
    const open = !grammarState.all;
    grammarState.all = open;
    grammarState.open = {};
    detail.querySelectorAll('[data-grammar-box]').forEach(box => { box.hidden = !open; });
    detail.querySelectorAll('[data-grammar]').forEach(b => {
      b.textContent = open ? '收起语法' : '语法';
      b.setAttribute('aria-expanded', String(open));
    });
    gmAll.textContent = open ? '收起全部语法' : '全部语法';
    gmAll.classList.toggle('primary', open);
  };

  /* 解析里的原句、正文每句的语法：想细讲就交给 AI。
     中文译文不用再翻译一遍——正文里本来就有，AI 拿到的是「句子 + 现成译文 + 命中的语法点」。 */
  detail.querySelectorAll('[data-qai]').forEach(btn => {
    btn.onclick = () => {
      const q = (lesson.quiz || [])[Number(btn.dataset.qai)];
      if (!q) return;
      const orig = String(q.explain || '').replace(/^(原句|原文)\s*[：:]\s*/, '').trim();
      if (!orig){ toast('这道题没有原句可讲'); return; }
      const hit = zhForSentence(lesson, orig);
      askAiWith(buildSentenceAiPrompt({ title: lesson.title, sentence: orig, zh: hit ? hit.zh : '', question: q.q }));
    };
  });
  detail.querySelectorAll('[data-gai]').forEach(btn => {
    btn.onclick = () => {
      const i = Number(btn.dataset.gai);
      const sent = (lesson.text || [])[i] || '';
      if (!sent){ toast('这句是空的'); return; }
      askAiWith(buildSentenceAiPrompt({
        title: lesson.title,
        sentence: sent,
        zh: (lesson.textZh || [])[i] || '',
        tags: grammarTags(sent).map(t => t.t)
      }));
    };
  });

  /* 填空题的句意：同样先问正文（对得上就不用联网），对不上才自动补一句，
     仍然不用点——按钮只留作重试 */
  const translateClozeZh = async btn => {
    if (!btn || btn.disabled) return;
    const i = Number(btn.dataset.clozeZh);
    const item = clozeList[i];
    const box = detail.querySelector('[data-cloze-zh-box="' + i + '"]');
    if (!item || !box) return;
    const full = String((item.before || '') + (item.answer || '') + (item.after || '')).replace(/\s+/g, ' ').trim();
    box.hidden = false;
    btn.disabled = true;
    btn.textContent = '翻译中';
    let zh = full ? trCacheGet(full) : '';
    if (!zh && full){ const hit = zhForSentence(lesson, full); if (hit) zh = hit.zh; }
    if (!zh && full) zh = await stateTranslate(full);
    if (!btn.isConnected) return;
    box.textContent = zh || '翻译失败';
    btn.disabled = false;
    btn.textContent = zh ? '重新翻' : '句意';
  };
  const clozeZhBtns = Array.from(detail.querySelectorAll('[data-cloze-zh]'));
  clozeZhBtns.forEach(btn => { btn.onclick = () => translateClozeZh(btn); });
  if (clozeZhBtns.some(b => b.dataset.clozeZhAuto === '1')){
    (async () => {
      for (let k = 0; k < clozeZhBtns.length; k++){
        const btn = clozeZhBtns[k];
        if (!btn.isConnected) return;
        if (btn.dataset.clozeZhAuto !== '1') continue;
        await translateClozeZh(btn);
        await sleep(120);
      }
    })();
  }

  detail.querySelectorAll('[data-meaning-idx]').forEach(inp => {
    const saveMeaning = () => {
      const idx = Number(inp.dataset.meaningIdx);
      const val = inp.value.trim();
      if (!val) return;
      const target = lesson.chunks[idx];
      if (!target) return;
      target.meaning = val;
      rememberLessonEdit(lesson, e => {
        e.chunkMeaning = e.chunkMeaning || {};
        e.chunkMeaning[String(target.chunk).toLowerCase()] = val;
      });
      renderLessonDetail(lesson);
      toast('已补充意思，中文高亮已更新');
    };
    inp.addEventListener('blur', saveMeaning);
    inp.addEventListener('keydown', e => {
      if (e.key === 'Enter'){ e.preventDefault(); inp.blur(); }
    });
  });

  detail.querySelectorAll('[data-collect]').forEach(btn => {
    btn.onclick = () => {
      const idx = Number(btn.dataset.collect); const c = lesson.chunks[idx];
      if (isChunkCollected(c.chunk)){ toast('词块本里已经有这个表达了'); return; }
      if (!c.meaning){
        toast('请先补充中文意思，或点「译」自动翻译');
        const inp = detail.querySelector(`[data-meaning-idx="${idx}"]`);
        if (inp) inp.focus();
        return;
      }
      addChunk({ sentence:c.sentence, chunk:c.chunk, meaning:c.meaning, mine:'', source:lesson.title });
      renderAll(); renderLessonDetail(lesson); toast('已收进词块本');
    };
  });

  detail.querySelectorAll('.opt').forEach(btn => {
    btn.onclick = () => {
      if (btn.disabled) return;
      const qi = Number(btn.dataset.qi); const oi = Number(btn.dataset.oi);
      if (prog.quiz[qi] !== undefined) return;
      prog.quiz[qi] = oi;
      /* 答错的顺手记进错题本（题干和选项存快照，原文改了也能回看） */
      const qItem = (lesson.quiz || [])[qi];
      if (qItem && oi !== Number(qItem.answer)) recordMistake(lesson, 'quiz', qi, { q: qItem.q, options: (qItem.options || []).slice(), answer: Number(qItem.answer), my: oi });
      saveState();
      renderLessonDetail(lesson);
    };
  });

  detail.querySelectorAll('[data-cloze]').forEach(inp => {
    inp.oninput = () => {
      const idx = Number(inp.dataset.cloze);
      prog.cloze[idx] = inp.value;
      inp.classList.remove('ok', 'no');
      /* 改了答案就把上一轮判定收起来，避免「✓ 正确」误导 */
      delete prog.clozeRes[idx];
      saveSoon();
      const res = detail.querySelector(`[data-cloze-res="${idx}"]`);
      if (res) res.hidden = true;
    };
  });

  /* 判一题：只展开这一题的答案，别的题保持原样。
     返回 true / false 表示对错，返回 undefined 表示空着没判。 */
  function judgeCloze(i){
    const item = clozeList[i];
    const inp = detail.querySelector('[data-cloze="' + i + '"]');
    if (!item || !inp) return;
    const my = String(inp.value || '').trim();
    if (!my){ toast('先填一下这题'); inp.focus(); return; }
    const ok = my.toLowerCase() === String(item.answer || '').trim().toLowerCase();
    prog.clozeRes[i] = ok;
    inp.classList.remove('ok', 'no');
    inp.classList.add(ok ? 'ok' : 'no');
    const res = detail.querySelector('[data-cloze-res="' + i + '"]');
    if (res){ res.innerHTML = clozeResHtml(item, ok, lesson, i); res.hidden = false; }
    /* 错题规则和「全部检查」完全一致：答错进本子、答对自动订正 */
    if (ok){
      const done = findMistake(lesson.id, 'cloze', i);
      if (done && !done.fixed) setMistakeFixed(done.id, true);
    } else {
      recordMistake(lesson, 'cloze', i, { before: item.before, after: item.after, hint: item.hint || '', answer: String(item.answer || ''), my });
    }
    saveState();
    return ok;
  }

  detail.querySelectorAll('[data-cloze-check]').forEach(btn => {
    btn.onclick = () => {
      const ok = judgeCloze(Number(btn.dataset.clozeCheck));
      if (ok === undefined) return;
      toast(ok ? '答对了' : '答错了，正确答案就在这题下面');
    };
  });

  const checkBtn = $('#btnCheckCloze');
  if (checkBtn) checkBtn.onclick = () => {
    Object.keys(prog.clozeRes).forEach(k => delete prog.clozeRes[k]);
    let checked = 0, correct = 0, blank = 0;
    clozeList.forEach((item, i) => {
      if (!item) return;
      const inp = detail.querySelector('[data-cloze="' + i + '"]');
      const my = inp ? String(inp.value || '').trim() : '';
      /* 空着的题既不判也不展开答案：一次把所有答案摊开正是要避免的 */
      if (!my){ blank++; return; }
      const ok = my.toLowerCase() === String(item.answer || '').trim().toLowerCase();
      prog.clozeRes[i] = ok;
      checked++;
      if (ok) correct++;
      if (ok){
        const done = findMistake(lesson.id, 'cloze', i);
        if (done && !done.fixed) setMistakeFixed(done.id, true);
      } else {
        recordMistake(lesson, 'cloze', i, { before: item.before, after: item.after, hint: item.hint || '', answer: String(item.answer || ''), my });
      }
    });
    saveState();
    /* 重渲染，让判过的题稳定显示正确答案与解析（答题状态也一并保留） */
    renderLessonDetail(lesson);
    toast('对了 ' + correct + ' / ' + checked + ' 题' + (blank ? '，还有 ' + blank + ' 题没填' : ''));
  };
}

function renderLessonDetail(lesson){
  const detail = $('#learnDetail');
  /* 先把上次的改动（译文/意思/例句）盖回内存对象上：analyzeLesson(force) 会重建 chunks */
  applyLessonEdits(lesson);
  const prog = lessonProg(lesson.id);
  const answers = prog.quiz;
  const textZh = lesson.textZh || [];
  const hasZh = textZh.some(z => z && z.trim());
  const missingZh = lesson.text.some((_, i) => !(textZh[i] || '').trim());
  const quizList = lesson.quiz || [];
  const clozeList = lesson.cloze || [];
  const hasQuiz = quizList.length > 0;
  const hasCloze = clozeList.length > 0;
  const answeredCount = Object.keys(answers).length;
  const correctCount = Object.entries(answers).filter(([qi, oi]) => quizList[Number(qi)] && quizList[Number(qi)].answer === oi).length;

  const ctx = {
    textZh, hasZh, missingZh, quizList, clozeList, hasQuiz, hasCloze, answeredCount, correctCount,
    paras: renderParaBlocks(lesson, textZh),
    chunkRows: renderChunkRows(lesson),
    quizHtml: renderQuizItems(lesson, answers),
    clozeHtml: renderClozeItems(lesson, prog)
  };
  detail.innerHTML = lessonDetailHtml(lesson, ctx);
  bindLessonDetailEvents(lesson, prog, ctx);
}


/* ========== 框选：随手翻译 / 收进词块本 ==========
   以前只在文章正文的 .para 上绑了 pointerup，于是「框选加词块」只有正文能用：题干、选项、
   解析、词块例句里的英文选中了都没反应。现在只在 document 上绑一次，由「选区起点落在哪种元素上」
   决定给哪套界面：
   - 正文 .para：原来的编辑窗口（能改词块、能补中文、能回写到这一课）
   - 其它任何位置：先给翻译（框选就是为了看意思），要收进词块本再点一下，进同一个编辑窗口 */
function bindGlobalSelection(){
  const fire = (e) => {
    const t = e && e.target;
    /* 点小窗自己身上的按钮时不要再算一遍选区，否则刚点开就被自己的 pointerup 顶掉 */
    if (t && t.closest && t.closest('#selPopup, #selBar')) return;
    handleGlobalSelection();
  };
  if (window.PointerEvent){
    document.addEventListener('pointerup', fire);
  } else {
    document.addEventListener('mouseup', fire);
    document.addEventListener('touchend', fire);
  }
}
function isCoarsePointer(){
  try { return !!(window.matchMedia && window.matchMedia('(pointer: coarse)').matches); } catch(e){ return false; }
}
/* 选区里常粘上句子序号（.sent-idx）和朗读按钮的 🔊：这两样既不是英文，也不该送给翻译接口，
   否则整段复制去翻译会翻出「1每早…🔊」这种怪结果。样式上已经把它们设成不可选中，这里再兜一层 */
function cleanSelectionText(raw, startEl){
  let t = String(raw || '').replace(/\s+/g, ' ').replace(/[\u{1F509}\u{1F50A}]/gu, '').trim();
  const para = startEl && startEl.closest ? startEl.closest('.para') : null;
  const badge = para ? para.querySelector('.sent-idx') : null;
  const idx = badge ? String(badge.textContent || '').trim() : '';
  /* 只在「序号后面紧跟字母」时剥，避免把正文里以数字开头的句子（2024 was …）也吃掉 */
  if (idx && t.indexOf(idx) === 0 && /[A-Za-z]/.test(t.charAt(idx.length))) t = t.slice(idx.length).trim();
  /* 题干「1. 」与选项「A. 」同理：Firefox/Safari 对 user-select 的处理不一致，字符串上也兜一层 */
  if (startEl && startEl.closest && startEl.closest('.quiz-q, .opt')) t = t.replace(/^(\d{1,2}|[A-Za-z])[.、)]\s*/, '').trim();
  return t;
}
/* 选区三件套：文本、起点元素、屏幕位置。缺一件就当没选 */
function readSelection(){
  const sel = window.getSelection ? window.getSelection() : null;
  if (!sel || sel.isCollapsed || !sel.rangeCount) return null;
  let node = null, rect = null;
  try {
    const range = sel.getRangeAt(0);
    node = range.startContainer;
    if (node && node.nodeType === 3) node = node.parentNode;
    rect = range.getBoundingClientRect();
  } catch(e){}
  if (!node || !node.closest) return null;
  const text = cleanSelectionText(sel.toString(), node);
  if (!text || !/[a-zA-Z]/.test(text)) return null;
  if (!rect || (!rect.width && !rect.height)){
    try { rect = node.getBoundingClientRect(); } catch(e){ rect = { top:0, left:0, right:0, bottom:0 }; }
  }
  return { text: text, node: node, rect: rect };
}
/* 选区所在的「那一行字」，拿去当词块的例句。找不到就退回选区本身 */
function contextSentence(node, text){
  let el = node;
  for (let depth = 0; el && depth < 6; depth++){
    if (el.nodeType === 1){
      const cls = String(el.className || '');
      const isBlock = /^(P|LI|TD|TH|BLOCKQUOTE|H1|H2|H3|H4|LABEL)$/.test(el.tagName || '') ||
        /(^|\s)(quiz-q|opt|exp-text|exp-answer|cr-sent|cr-word|ci-c|ci-m|ci-sent|ci-sent-zh|para-zh)(\s|$)/.test(cls);
      if (isBlock){
        const t = String(el.textContent || '').replace(/\s+/g, ' ').trim();
        if (t && t.length >= text.length) return t.slice(0, 240);
      }
    }
    el = el.parentElement;
  }
  return text;
}
/* 当前页面叫什么，词块的来源写它，回头在词块本里能认出来自哪儿 */
function pageLabel(){
  let name = '';
  try {
    const act = document.querySelector('.page.active');
    if (act) name = String(act.id || '').replace(/^page-/, '');
    const tab = name ? document.querySelector('.tab[data-page="' + name + '"]') : null;
    if (tab) name = String(tab.textContent || '').replace(/\d+\s*$/, '').trim() || name;
  } catch(e){}
  return name ? ('页面：' + name) : '页面摘录';
}

function handleGlobalSelection(){
  /* 触摸屏上选区要等一会儿才稳定，留长一点的延迟 */
  setTimeout(() => {
    const info = readSelection();
    if (!info){ hideSelPopup(); hideSelBar(); return; }
    const paraEl = info.node.closest('.para');
    const lesson = paraEl ? getLessonById(learnState.lessonId) : null;
    /* 正文里的短词块走「先编辑再保存」；太长（整段）就走翻译条，别让人在小输入框里编辑一长句 */
    if (paraEl && lesson && info.text.length >= 2 && info.text.length <= 80){
      hideSelBar();
      /* .para 里带一个 .sent-idx 序号，textContent 会把它粘在句首，先剥掉 */
      const paraText = paraEl.textContent.replace(/^\s*\d+\s*/, '');
      showSelPopup(info.rect, info.text, findSentence(paraText, info.text), lesson);
      return;
    }
    hideSelPopup();
    showSelBar(info.rect, info.text, contextSentence(info.node, info.text));
  }, isCoarsePointer() ? 60 : 10);
}

/* 把浮动小窗放在选区附近：先量真实尺寸。原来写死 220 高度，长例句/小屏会溢出屏幕 */
function positionFloat(el, rect){
  el.style.top = '-9999px'; el.style.left = '0px';
  const vv = window.visualViewport;
  const viewTop = vv ? vv.offsetTop : 0;
  const viewH = vv ? vv.height : window.innerHeight;
  const viewW = vv ? vv.width : window.innerWidth;
  const h = el.offsetHeight || 220;
  const w = el.offsetWidth || 310;
  const gap = 12;
  const minTop = viewTop + gap;
  const maxTop = viewTop + viewH - h - gap;
  let top;
  if (rect.top - h - gap >= minTop) top = rect.top - h - gap;                       /* 上方放得下 */
  else if (rect.bottom + gap + h <= viewTop + viewH - gap) top = rect.bottom + gap;  /* 否则放下方 */
  else top = Math.max(minTop, Math.min(maxTop, rect.top - h / 2));                   /* 都放不下就夹住 */
  const left = Math.max(gap, Math.min(viewW - w - gap, rect.left));
  el.style.top = Math.round(top) + 'px';
  el.style.left = Math.round(left) + 'px';
}

/* 任意英文的翻译条。lesson 可能是 null —— 说明这句话不属于任何一篇文章 */
function showSelBar(rect, text, contextText){
  const el = $('#selBar');
  if (!el) return;
  const short = text.length > 60 ? text.slice(0, 60) + '…' : text;
  el.innerHTML = `
    <div class="sb-head">
      <span class="sb-text" title="${esc(text)}">${esc(short)}</span>
      <button class="sb-x" id="sbClose" type="button" aria-label="关闭">×</button>
    </div>
    <div class="sb-out" id="sbOut" hidden></div>
    <div class="sb-actions">
      <button class="btn small" id="sbTrans" type="button">翻译</button>
      <button class="btn small primary" id="sbChunk" type="button">＋ 词块本</button>
    </div>`;
  el.hidden = false;
  positionFloat(el, rect);
  const out = $('#sbOut');
  const doTrans = async () => {
    out.hidden = false;
    out.classList.remove('err');
    const cached = trCacheGet(text);
    if (cached){ out.textContent = cached; return; }
    out.innerHTML = '<span class="loading-dot"></span>翻译中…';
    const t = await stateTranslate(text.length > 300 ? text.slice(0, 300) : text);
    out.textContent = t || '翻译失败（没网，或这段太长）';
    out.classList.toggle('err', !t);
  };
  $('#sbClose').onclick = hideSelBar;
  $('#sbTrans').onclick = doTrans;
  $('#sbChunk').onclick = () => {
    const guess = lookupGloss(text) || trCacheGet(text) || '';
    const src = pageLabel();
    hideSelBar();
    showSelPopup(rect, text, contextText || text, null, { meaning: guess, source: src });
  };
  /* 框选就是为了看意思，别让人再点一下；关掉也只是一次点击 */
  doTrans();
}
function hideSelBar(){ const el = $('#selBar'); if (el) el.hidden = true; }

function showSelPopup(rect, chunkText, sentence, lesson, opts){
  const el = $('#selPopup');
  const o = opts || {};
  const guess = o.meaning || lookupGloss(chunkText);
  el.innerHTML = `
    <div class="sp-head">${lesson ? '添加词块' : '收进词块本'}</div>
    <input class="sp-input" id="spChunk" value="${esc(chunkText)}" placeholder="词块">
    <input class="sp-input" id="spMeaning" value="${esc(guess)}" placeholder="中文意思（必填）">
    <div class="sp-sentence">${esc(sentence)}</div>
    <div class="sp-actions">
      <button class="btn small ghost" id="spCancel" type="button">取消</button>
      <button class="btn small" id="spTrans" type="button">自动翻译</button>
      <button class="btn small primary" id="spSave" type="button">保存</button>
    </div>
  `;
  el.hidden = false;
  positionFloat(el, rect);
  $('#spCancel').onclick = hideSelPopup;
  $('#spTrans').onclick = async () => {
    const btn = $('#spTrans');
    btn.disabled = true;
    btn.innerHTML = '<span class="loading-dot"></span>翻译中';
    const t = await translateChunkMeaning($('#spChunk').value.trim() || chunkText);
    btn.disabled = false;
    btn.textContent = '自动翻译';
    if (t) $('#spMeaning').value = t;
    else toast('翻译失败，请手动填写');
  };
  $('#spSave').onclick = () => {
    const chunk = $('#spChunk').value.trim(); const meaning = $('#spMeaning').value.trim();
    if (!chunk || !meaning){ toast('词块和意思都要填'); return; }
    if (isChunkCollected(chunk)){ toast('词块本里已经有这个表达了'); hideSelPopup(); return; }
    addChunk({ sentence, chunk, meaning, mine:'', source: lesson ? lesson.title : (o.source || '页面摘录') });
    renderAll();
    /* 只有来自正文的词块才回写这一课：题目、解析里的词块不属于任何一句，塞进去会污染高亮 */
    if (lesson && Array.isArray(lesson.chunks)){
      const exists = lesson.chunks.find(c => c.chunk.toLowerCase() === chunk.toLowerCase());
      const sidx = lesson.text.findIndex(s => s.toLowerCase().includes(chunk.toLowerCase()));
      if (exists){ exists.meaning = meaning; exists.sentence = sentence; if (sidx >= 0) exists.sentIdx = sidx; }
      else lesson.chunks.push({ chunk, sentence, meaning, sentIdx: sidx >= 0 ? sidx : undefined });
      rememberLessonEdit(lesson, e => {
        const k = chunk.toLowerCase();
        e.chunkMeaning = e.chunkMeaning || {};
        e.chunkMeaning[k] = meaning;
        if (sidx >= 0){
          e.chunkSentence = e.chunkSentence || {};
          e.chunkSentence[k] = { sentence, sentIdx: sidx };
        }
        e.extraChunks = Array.isArray(e.extraChunks) ? e.extraChunks : [];
        if (!e.extraChunks.some(x => String(x.chunk || '').toLowerCase() === k)){
          e.extraChunks.push(Object.assign({ chunk, sentence, meaning }, sidx >= 0 ? { sentIdx: sidx } : {}));
        }
      });
    }
    hideSelPopup();
    if (lesson) renderLessonDetail(lesson);
    toast('已收进词块本');
  };
  setTimeout(() => { const m = $('#spMeaning'); if (m && !m.value && !isCoarsePointer()) m.focus(); }, 60);
}
function hideSelPopup(){ const el = $('#selPopup'); if (el) el.hidden = true; }

/* ========== 文章管理 ========== */
function openArticleModal(lesson){
  $('#articleModalTitle').textContent = lesson ? '编辑文章' : '添加我的文章';
  $('#aId').value = lesson ? lesson.id : '';
  $('#aTitle').value = lesson ? lesson.title : '';
  $('#aTitleZh').value = lesson ? (lesson.titleZh || '') : '';
  $('#aLevel').value = lesson ? lesson.level : 'intermediate';
  $('#aTopic').value = lesson ? (lesson.topic || '') : '';
  $('#aText').value = lesson ? (lesson.text || []).join('\n') : '';
  /* 用 map 保留空位，缺译的那句留成空行，再次保存时不会让后面的译文整体前移 */
  $('#aTextZh').value = lesson ? (lesson.textZh || []).map(z => z || '').join('\n') : '';
  $('#transStatus').textContent = '';
  updateAlignNote();
  refreshAiPrompt();
  $('#articleModal').hidden = false;
  setTimeout(() => $('#aTitle').focus(), 60);
}
function closeArticleModal(){
  $('#articleModal').hidden = true;
  $('#articleForm').reset();
  $('#aId').value = '';
  $('#alignNote').textContent = '';
  $('#transStatus').textContent = '';
}
function deleteArticle(id){
  const lesson = getLessonById(id); if (!lesson) return;
  if (!confirm(`确定删除文章《${lesson.title}》吗？\n\n已经收进词块本的词块不会被删除。`)) return;
  state.customLessons = state.customLessons.filter(l => l.id !== id);
  if (state.progress) delete state.progress[id];
  if (state.lessonEdits) delete state.lessonEdits[id];
  dropLessonMistakes(id);
  /* 删掉的 id 留个墓碑：云同步是按并集合并的，没有墓碑的话下次同步
     会把这篇从云端「复活」回来。 */
  if (!state.deletedLessons) state.deletedLessons = {};
  state.deletedLessons[id] = new Date().toISOString();
  saveState();
  learnState.lessonId = null; learnState.showTrans = false;
  renderLearn(); toast('文章已删除');
}

/* 中文输入框：每句一行时按行切（保留空行位置）；单行时按标点切 */
function splitZhInput(value){
  const raw = String(value || '');
  if (!raw.trim()) return [];
  if (/\n/.test(raw.trim())) return raw.split('\n').map(s => s.trim());
  return splitChineseSentences(raw);
}

function updateAlignNote(){
  const en = splitEnglishSentences($('#aText').value);
  const zh = splitZhInput($('#aTextZh').value);
  const note = $('#alignNote');
  if (!en.length && !zh.length){ note.textContent = ''; return; }
  if (!zh.length){
    note.innerHTML = `英文 <b>${en.length}</b> 句，暂无中文翻译。保存时会逐句自动翻译。`;
    return;
  }
  if (en.length === zh.length){
    note.innerHTML = `英文 <b>${en.length}</b> 句，中文 <b>${zh.length}</b> 句，已一一对应。`;
  } else {
    note.innerHTML = `英文 <b>${en.length}</b> 句，中文 <b>${zh.length}</b> 句，数量不一致，将按顺序对齐，缺少的句子留空。`;
  }
}

/* ========== 「让 AI 写一篇」提示词 ==========
   用户常常不知道该拿什么文章来练。这里生成一段能直接粘给任意 AI 的提示词：
   难度、主题、长度、输出格式（英文逐句 + 中文逐句，正好对上下面两个输入框）都写死，
   再把词块本里还没掌握的表达式塞进去，让 AI 顺手把它们用上。 */
const LEVEL_BRIEF = {
  beginner: '初级：以最常用的 1500 词为主，句子短（8–14 词），避免从句套从句',
  intermediate: '中级：以 3000 词以内的常用词为主，句子 10–18 词，可以用简单从句',
  advanced: '高级：可以用到 5000 词左右的地道表达，句子 12–22 词，允许复杂结构'
};
function pickPromptChunks(limit){
  const list = (state.chunks || []).filter(c => c && c.chunk && !c.mastered);
  return list.slice(-limit).map(c => c.chunk);
}
function buildAiPrompt(){
  const lvEl = $('#aLevel');
  const level = (lvEl && lvEl.value) || 'intermediate';
  const topicEl = $('#aTopic');
  const topic = String((topicEl && topicEl.value) || '').trim() || '日常生活';
  const words = pickPromptChunks(10);
  const lines = [
    '你是英语学习材料作者。请为中文母语者写一篇用于「语块精读」的英文短文。',
    '',
    '要求：',
    '- 难度：' + (LEVEL_BRIEF[level] || LEVEL_BRIEF.intermediate),
    '- 主题：' + topic,
    '- 长度：10–14 句，130–200 词；前后连贯成一篇完整短文，不要写成互不相关的例句',
    '- 用自然地道的真实表达，不要生僻词，不要标题、编号、加粗或任何 Markdown 符号',
    '- 每句在句号/问号/感叹号处结束，别用分号把好几层意思连成一长句（要能逐句翻译）'
  ];
  if (words.length) lines.push('- 请自然地用上这些表达（能用几个算几个，不要硬塞）：' + words.join('、'));
  lines.push('');
  lines.push('输出格式：严格两段，用下面两个标记分开，标记本身照抄。');
  lines.push('【英文】');
  lines.push('一行一句英文，共 10–14 行。');
  lines.push('【中文】');
  lines.push('与英文逐行一一对应的中文翻译，行数必须与英文完全相同，不要合并或拆分句子。');
  return lines.join('\n');
}
function refreshAiPrompt(){
  const box = $('#aPrompt');
  if (box) box.value = buildAiPrompt();
}
/* 复制到剪贴板：优先异步剪贴板，没有权限就退回到隐藏 textarea + execCommand */
async function copyText(text){
  const s = String(text == null ? '' : text);
  if (!s) return false;
  try{
    if (navigator.clipboard && navigator.clipboard.writeText){ await navigator.clipboard.writeText(s); return true; }
  }catch(e){ /* 没有权限就走下面的降级路径 */ }
  try{
    const ta = document.createElement('textarea');
    ta.value = s;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.top = '-1000px';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    if (ta.setSelectionRange) ta.setSelectionRange(0, s.length);
    const ok = document.execCommand('copy');
    document.body.removeChild(ta);
    return !!ok;
  }catch(e){ return false; }
}

/* ========== 渲染：今日 / 词块本 / 复习 / 统计 / 计划（保持原样） ========== */
function renderToday(){
  const d = new Date();
  $('#todayDate').textContent = `${d.getFullYear()}年${d.getMonth()+1}月${d.getDate()}日 · ${WEEKDAYS[d.getDay()]}`;
  const h = d.getHours();
  $('#greeting').textContent = h < 11 ? '早上好，今天学一点' : h < 18 ? '下午好，今天学一点' : '晚上好，今天学一点';
  const t = todayStr();
  const todayChunks = state.chunks.filter(c => c.added === t);
  const due = getDueChunks(); const log = getLog(t);
  $('#sTodayNew').textContent = todayChunks.length;
  $('#sDue').textContent = due.length;
  $('#sTotal').textContent = state.chunks.length;
  $('#streakNum').textContent = getEffectiveStreak();
  const collectDone = todayChunks.length >= 3;
  const reviewDone = due.length === 0 || (log.reviewed || 0) > 0;
  const items = [
    { id:'input', label:'输入 15 分钟（读或听感兴趣的内容）', done: !!log.inputDone, manual: true },
    { id:'collect', label:'收集 3–5 个词块', done: collectDone, manual: false, hint: collectDone ? '已收集 ' + todayChunks.length + ' 个' : `${todayChunks.length}/3` },
    { id:'output', label:'用新词块造句或说 1 分钟', done: !!log.outputDone, manual: true },
    { id:'review', label:'复习到期词块', done: reviewDone, manual: false, hint: due.length === 0 ? '无到期' : (log.reviewed ? `已复习 ${log.reviewed}` : `剩 ${due.length}`) }
  ];
  $('#checklist').innerHTML = items.map(it => `
    <li class="${it.done ? 'done' : ''} ${it.manual ? 'manual' : ''}" data-check="${it.id}" ${it.manual ? 'role="checkbox" tabindex="0" aria-checked="' + it.done + '"' : ''}>
      <span class="box">${it.done ? '✓' : ''}</span><span class="txt">${esc(it.label)}</span>
      ${it.hint ? `<span class="hint">${esc(it.hint)}</span>` : ''}
    </li>`).join('');
  $('#dueBadge').textContent = due.length;
  /* 今日页快捷入口：继续上次阅读 / 生成复习短文 / 开始复习 / 去学习 */
  const quick = $('#todayQuick');
  if (quick){
    const lastId = state.settings && state.settings.lastLessonId;
    const last = lastId ? getLessonById(lastId) : null;
    quick.innerHTML = `<div style="display:flex;gap:9px;flex-wrap:wrap;align-items:center;">
      ${last ? `<button class="btn small" type="button" data-quick="resume">📖 继续：${esc(last.title)}</button>` : ''}
      <button class="btn small" type="button" data-quick="gen">✨ 生成复习短文</button>
      <button class="btn small" type="button" data-quick="review">🔁 开始复习${due.length ? `（${due.length}）` : ''}</button>
      <button class="btn small ghost" type="button" data-quick="learn">📚 去学习</button>
    </div>`;
    quick.querySelectorAll('[data-quick]').forEach(b => {
      b.onclick = () => {
        const k = b.dataset.quick;
        if (k === 'resume' && last){ if (window.showPage) window.showPage('learn'); window.openLesson(last.id); return; }
        if (k === 'gen'){ genReviewLessonNow(); return; }
        if (k === 'review'){
          reviewState = { queue:[], index:0, revealed:false, goodCount:0, total:0, wrong:[] };
          if (window.showPage) window.showPage('review');
          return;
        }
        if (window.showPage) window.showPage('learn');
      };
    });
  }
  const prev = due.slice(0, 5);
  $('#duePreview').innerHTML = prev.length ? prev.map((c, i) => `
    <div class="mini"><span class="idx">${i+1}</span><div><div class="c">${esc(c.chunk)}</div><div class="m">${esc(c.meaning)}</div></div></div>`).join('')
    : `<div class="empty"><p class="big">没有到期的词块</p><p class="sub">休息一下，或者去记录新的表达</p></div>`;
  $('#todayList').innerHTML = todayChunks.length ? todayChunks.map(c => `
    <div class="mini"><span class="idx">·</span><div><div class="c">${esc(c.chunk)}</div><div class="m">${esc(c.meaning)}</div></div></div>`).join('')
    : `<div class="empty"><p class="big">今天还没记录词块</p><p class="sub">读一段、听一段，挑 1 个最有用的表达记下来</p></div>`;
}

let chunkFilter = 'all'; let searchTerm = ''; let sortBy = 'new'; let chunkSource = 'all';
/* 批量删除的勾选状态。之前只存在 DOM 里，而搜索/筛选/排序都会重渲染列表，
   勾了一半再动一下筛选，选择就被静默清空了。 */
let pickedIds = new Set();
function renderChunks(){
  const t = todayStr(); let list = state.chunks.slice();
  if (chunkFilter === 'due') list = list.filter(c => !c.mastered && c.nextReview <= t);
  if (chunkFilter === 'mastered') list = list.filter(c => c.mastered);
  /* 来源筛选 */
  const srcSel = $('#sourceFilter');
  if (srcSel){
    const sources = Array.from(new Set(state.chunks.map(c => String(c.source || '').trim()).filter(Boolean))).sort((a, b) => a.localeCompare(b, 'zh'));
    if (chunkSource !== 'all' && !sources.includes(chunkSource)) chunkSource = 'all';
    srcSel.innerHTML = '<option value="all">全部来源</option>' + sources.map(s => `<option value="${esc(s)}">${esc(s)}</option>`).join('');
    srcSel.value = chunkSource;
  }
  if (chunkSource !== 'all') list = list.filter(c => String(c.source || '').trim() === chunkSource);
  if (searchTerm){
    const q = searchTerm.toLowerCase();
    list = list.filter(c => (c.chunk + ' ' + c.sentence + ' ' + c.meaning + ' ' + (c.mine||'') + ' ' + (c.source||'')).toLowerCase().includes(q));
  }
  if (sortBy === 'new') list.sort((a, b) => b.added.localeCompare(a.added));
  else if (sortBy === 'due') list.sort((a, b) => { if (a.mastered !== b.mastered) return a.mastered ? 1 : -1; return a.nextReview.localeCompare(b.nextReview); });
  else list.sort((a, b) => a.chunk.localeCompare(b.chunk, 'en'));
  $$('#filterBar button').forEach(b => b.classList.toggle('on', b.dataset.f === chunkFilter));
  const dueCount = state.chunks.filter(c => !c.mastered && c.nextReview <= t).length;
  $('#chunkCount').textContent = `共 ${state.chunks.length} 条 · 待复习 ${dueCount} 条`;
  const box = $('#chunkList');
  if (!list.length){
    box.innerHTML = `<div class="empty"><p class="big">${state.chunks.length ? '没有匹配的词块' : '词块本还是空的'}</p><p class="sub">${state.chunks.length ? '换个关键词试试' : '去「学习」页读一篇'}</p></div>`;
    return;
  }
  box.innerHTML = list.map(c => {
    const isDue = !c.mastered && c.nextReview <= t;
    const badge = c.mastered ? '<span class="badge ok">已掌握</span>' : isDue ? '<span class="badge due">今日待复习</span>' : `<span class="badge wait">${esc(c.nextReview)} 复习</span>`;
    return `<div class="chunk-card">
      <div class="chunk-head"><span class="chunk-title">${esc(c.chunk)}${speakBtn(c.chunk)}</span>${badge}<label class="pick" title="勾选后可批量删除"><input type="checkbox" data-pick="${esc(c.id)}"${pickedIds.has(c.id) ? ' checked' : ''}></label></div>
      <p class="sent"><span class="lbl">原句</span>${esc(c.sentence)}${speakBtn(c.sentence)}</p>
      <p><span class="lbl">意思</span>${esc(c.meaning)}</p>
      ${c.mine ? `<p class="mine"><span class="lbl">我的</span>${esc(c.mine)}</p>` : ''}
      <div class="chunk-foot">
        <span>${c.source ? '来源：' + esc(c.source) : '来源：—'}</span>
        <span>收录于 ${esc(c.added)}</span>
        ${stageDots(c.stage || 0, c.mastered)}
        <div class="foot-btns"><button class="btn small" data-edit="${c.id}" type="button">编辑</button><button class="btn small danger" data-del="${c.id}" type="button">删除</button></div>
      </div>
    </div>`;
  }).join('');
}

let reviewState = { queue:[], index:0, revealed:false, goodCount:0, total:0, wrong:[] };
/* 复习方向：en2zh = 看英文原句想词块；zh2en = 看中文说英文 */
let reviewMode = 'en2zh';
function enterReview(){
  if (reviewState.index >= reviewState.queue.length){
    const due = getDueChunks();
    reviewState = { queue: due.map(c => c.id), index:0, revealed:false, goodCount:0, total: due.length, wrong: [] };
  }
  renderReview();
}
function resetReviewQueue(){
  const due = getDueChunks();
  reviewState = { queue: due.map(c => c.id), index:0, revealed:false, goodCount:0, total: due.length, wrong: [] };
  renderReview();
}
/* 只练这一轮没记住的 */
function startWrongReview(){
  const ids = Array.from(new Set(reviewState.wrong || []));
  if (!ids.length){ toast('这次没有需要重练的词块'); return; }
  reviewState = { queue: ids, index:0, revealed:false, goodCount:0, total: ids.length, wrong: [] };
  renderReview();
}
function renderReview(){
  const box = $('#reviewBody'); const q = reviewState.queue;
  if (!state.chunks.length){
    box.innerHTML = `<div class="card" style="text-align:center;padding:40px 20px;"><div class="empty"><p class="big">还没有词块</p><p class="sub">先去「学习」页读一篇</p></div><button class="btn primary" id="rvGoLearn" style="margin-top:12px;" type="button">去学习</button></div>`;
    $('#rvGoLearn').onclick = () => window.showPage('learn');
    return;
  }
  if (!q.length){
    box.innerHTML = `<div class="card" style="text-align:center;padding:40px 20px;"><div class="empty"><p class="big">今天没有到期复习 🎉</p><p class="sub">休息一下，或者随机复习几个旧词块</p></div><button class="btn primary" id="rvRandom" style="margin-top:14px;" type="button">随机复习 5 个</button></div>`;
    $('#rvRandom').onclick = startRandomReview;
    return;
  }
  if (reviewState.index >= q.length){
    const wrongCount = Array.from(new Set(reviewState.wrong || [])).length;
    /* 复习收尾：抽 2 个刚复习过的词块，让你造一句自己的话（写进「我的句子」） */
    const taskChunks = Array.from(new Set(q)).slice(0, 2)
      .map(id => state.chunks.find(x => x.id === id))
      .filter(Boolean);
    const taskHtml = taskChunks.length ? `<div class="mine-task">
        <p class="mt-title">✍️ 收尾：用这几个词块各写一句自己的话</p>
        ${taskChunks.map(c => `<label><b>${esc(c.chunk)}</b>${c.meaning ? '　' + esc(c.meaning) : ''}</label>
          <input data-mine="${esc(c.id)}" value="${esc(c.mine || '')}" placeholder="写一句你自己的英文句子…" autocomplete="off">`).join('')}
        <button class="btn primary" id="btnSaveMine" type="button">保存造句</button>
      </div>` : '';
    box.innerHTML = `<div class="card" style="text-align:center;padding:40px 20px 26px;"><div class="empty"><p class="big">本轮复习完成 ✓</p><p class="sub">共 ${reviewState.total} 个词块，记住 ${reviewState.goodCount} 个${wrongCount ? `，还有 ${wrongCount} 个没记住` : ''}</p></div>
      ${wrongCount ? `<button class="btn primary" id="rvWrong" style="margin-top:14px;" type="button">只练这次没记住的（${wrongCount}）</button>` : ''}
      <div><button class="btn primary" id="rvAgain" style="margin-top:10px;" type="button">看看还有没有到期的</button></div>
      ${taskHtml}</div>`;
    if ($('#rvWrong')) $('#rvWrong').onclick = startWrongReview;
    $('#rvAgain').onclick = resetReviewQueue;
    const sm = $('#btnSaveMine');
    if (sm) sm.onclick = () => {
      let n = 0;
      box.querySelectorAll('[data-mine]').forEach(inp => {
        const ch = state.chunks.find(x => x.id === inp.dataset.mine);
        const v = inp.value.trim();
        if (ch && v){ ch.mine = v; n++; }
      });
      if (!n){ toast('先写一句再保存'); return; }
      const log = ensureLog();
      log.outputDone = true;      /* 顺手把「今日流程 → 输出」勾上 */
      touchActivity(); saveState(); renderToday();
      toast(`已保存 ${n} 句；今日「输出」已完成 ✓`);
    };
    return;
  }
  const c = state.chunks.find(x => x.id === q[reviewState.index]);
  if (!c){ reviewState.index++; renderReview(); return; }
  const pct = Math.round((reviewState.index / q.length) * 100);
  const stageLabel = c.mastered ? '已掌握' : `第 ${(c.stage || 0) + 1} 次复习`;
  const hasChunk = sentenceHasChunk(c.sentence, c.chunk);
  box.innerHTML = `
    <div class="rev-mode">
      <button type="button" data-mode="en2zh" class="${reviewMode === 'zh2en' ? '' : 'on'}">英 → 中</button>
      <button type="button" data-mode="zh2en" class="${reviewMode === 'zh2en' ? 'on' : ''}">中 → 英</button>
    </div>
    <div class="review-progress"><span>${reviewState.index + 1} / ${q.length}</span><div class="pbar"><i style="width:${pct}%"></i></div><span>${stageLabel}</span></div>
    <div class="review-card">
      <div class="review-tag">${reviewMode === 'zh2en' ? '看中文，先自己说一遍英文' : (hasChunk ? '先读原句，想想空格里是什么' : '直接看答案吧')}</div>
      ${reviewMode === 'zh2en'
        ? `<p class="rev-prompt-zh">${esc(c.meaning || '（这个词块还没有中文意思）')}</p>`
        : `<p class="review-sentence">${blankSentence(c.sentence, c.chunk)}</p>`}
      ${reviewState.revealed ? `
        <div class="review-answer">
          <p class="c">${esc(c.chunk)}${speakBtn(c.chunk)}</p><p class="m">${esc(c.meaning)}</p>
          ${c.sentence ? `<p class="mine" style="font-style:normal;font-size:12.5px;">原句：${esc(c.sentence)}${speakBtn(c.sentence)}</p>` : ''}
          ${c.mine ? `<p class="mine">我的句子：${esc(c.mine)}</p>` : ''}
          ${c.source ? `<p class="mine" style="font-style:normal;font-size:12.5px;">来源：${esc(c.source)}</p>` : ''}
        </div>
        <div class="grade-btns">
          <button class="btn g-again" data-grade="again" type="button">没记住</button>
          <button class="btn g-hard" data-grade="hard" type="button">有点模糊</button>
          <button class="btn g-good" data-grade="good" type="button">记住了</button>
        </div>
        <div class="kbd-hint"><kbd>1</kbd> 没记住 <kbd>2</kbd> 模糊 <kbd>3</kbd> 记住</div>
      ` : `<button class="btn primary" id="btnReveal" style="margin-top:8px;padding:12px 30px;" type="button">显示答案</button><div class="kbd-hint">按 <kbd>空格</kbd> 揭晓</div>`}
    </div>`;
  if (!reviewState.revealed){
    $('#btnReveal').onclick = () => { reviewState.revealed = true; renderReview(); };
  } else {
    $$('[data-grade]').forEach(btn => { btn.onclick = () => applyGrade(btn.dataset.grade, c); });
  }
  /* 切换复习方向：重置「已揭晓」，从当前这张卡重新问一遍 */
  box.querySelectorAll('[data-mode]').forEach(b => {
    b.onclick = () => { reviewMode = b.dataset.mode; reviewState.revealed = false; renderReview(); };
  });
}
function applyGrade(grade, chunk){
  if (!chunk) return;
  if (grade === 'good') reviewState.goodCount++;
  else if ((reviewState.wrong || []).indexOf(chunk.id) < 0) reviewState.wrong.push(chunk.id);
  gradeChunk(chunk.id, grade);
  reviewState.index++; reviewState.revealed = false;
  renderReview();
}
function startRandomReview(){
  const pool = state.chunks.filter(c => !c.mastered);
  if (!pool.length){ toast('还没有可复习的词块'); return; }
  /* 用 Fisher–Yates，sort(random-0.5) 是有偏抽样 */
  const picked = shuffle(pool).slice(0, 5);
  reviewState = { queue: picked.map(c => c.id), index:0, revealed:false, goodCount:0, total: picked.length, wrong: [] };
  renderReview();
}

/* ========== 导出：CSV / Anki ========== */
function downloadText(name, text, mime){
  const blob = new Blob([text], { type: (mime || 'text/plain') + ';charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = name;
  document.body.appendChild(a); a.click(); document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
function csvCell(v){
  const s = String(v == null ? '' : v);
  return /[",\n\r]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
}
function exportChunksCsv(){
  if (!state.chunks.length){ toast('词块本还是空的'); return; }
  const head = ['词块', '意思', '原句', '我的句子', '来源', '收录日期', '下次复习', '记忆阶段', '已掌握'];
  const rows = state.chunks.map(c => [
    c.chunk, c.meaning, c.sentence, c.mine, c.source, c.added, c.nextReview,
    String((c.stage || 0) + 1), c.mastered ? '是' : '否'
  ]);
  const csv = '\ufeff' + [head].concat(rows).map(r => r.map(csvCell).join(',')).join('\r\n');
  downloadText(`词块本-${todayStr()}.csv`, csv, 'text/csv');
  toast(`已导出 ${state.chunks.length} 条 CSV`);
}
function blankForAnki(sentence, chunk){
  const s = String(sentence || ''), k = String(chunk || '');
  if (!k) return s;
  try { return s.replace(new RegExp(escapeRegExp(k), 'gi'), '______'); } catch(e){ return s; }
}
function exportChunksAnki(){
  if (!state.chunks.length){ toast('词块本还是空的'); return; }
  const clean = v => String(v == null ? '' : v).replace(/\t/g, ' ').replace(/\r?\n/g, ' ');
  const lines = state.chunks.map(c => {
    const front = blankForAnki(c.sentence, c.chunk) || c.chunk;
    const back = `${c.chunk}　${c.meaning || ''}${c.mine ? '　｜　我的：' + c.mine : ''}`;
    return clean(front) + '\t' + clean(back);
  });
  downloadText(`词块本-Anki-${todayStr()}.txt`, '\ufeff' + lines.join('\r\n'), 'text/tab-separated-values');
  toast(`已导出 ${state.chunks.length} 条；Anki 导入时选「制表符」分隔`);
}

function renderStats(){
  const due = getDueChunks();
  const mastered = state.chunks.filter(c => c.mastered).length;
  $('#tTotal').textContent = state.chunks.length;
  $('#tMastered').textContent = mastered;
  $('#tDue').textContent = due.length;
  $('#tStreak').textContent = getEffectiveStreak();
  const days = lastNDays(7);
  const counts = days.map(d => state.chunks.filter(c => c.added === d).length);
  const max = Math.max(1, ...counts);
  $('#chart').innerHTML = days.map((d, i) => {
    const v = counts[i]; const hPct = Math.round((v / max) * 100); const label = d.slice(5).replace('-', '/');
    return `<div class="col"><div class="bar ${v === 0 ? 'zero' : ''}" style="height:${v === 0 ? 4 : Math.max(10, hPct)}%">${v > 0 ? `<span>${v}</span>` : ''}</div><div class="lbl">${label}</div></div>`;
  }).join('');
  const weekNew = counts.reduce((a, b) => a + b, 0);
  const todayReviewed = getLog().reviewed || 0;
  $('#weekStat').textContent = `本周新增 ${weekNew} 个，今日复习 ${todayReviewed} 个。`;
  const labels = ['新收录','第 1 次','第 2 次','第 3 次','第 4 次','已掌握'];
  const values = [0,1,2,3,4].map(s => state.chunks.filter(c => !c.mastered && (c.stage || 0) === s).length);
  values.push(mastered);
  const total = Math.max(1, state.chunks.length);
  $('#dist').innerHTML = labels.map((name, i) => {
    const v = values[i]; const pct = Math.round((v / total) * 100);
    return `<div class="row"><span class="name">${name}</span><span class="track"><i style="width:${pct}%"></i></span><span class="val">${v}</span></div>`;
  }).join('');
  renderTrash();
  renderCloudCard();
  renderAiCard();
  updateMistakeCount();
}

const PLAN = [
  { w:1, theme:'建立习惯', input:'分级读物／慢速播客／兴趣短视频', collect:'日常动作、喜好、感受', output:'每天 2–3 句', check:'能坚持 5 天，词本 15–20 条' },
  { w:2, theme:'高频功能词块', input:'日常对话、vlog、简易故事', collect:'请求、同意、拒绝、计划', output:'说 30 秒“我的一天”', check:'遮中文能说出 15 个词块' },
  { w:3, theme:'学习／工作场景', input:'学习类视频、短文章', collect:'安排、任务、问题、解决', output:'写 5 句本周安排', check:'能用 5 个词块造句' },
  { w:4, theme:'听力精听入门', input:'1–2 分钟短视频／播客', collect:'反复出现的动词搭配', output:'跟读＋复述 1 分钟', check:'60–80 条，复习完成率 ≥70%' },
  { w:5, theme:'口语输出加量', input:'生活类 vlog／剧集片段', collect:'口语常用短句、回应', output:'每天自言自语 1 分钟', check:'能连续说 1 分钟' },
  { w:6, theme:'兴趣深度内容', input:'科技／健身／游戏／美食', collect:'领域高频词块', output:'写 80 词兴趣短文', check:'能用 10 个词块写一段' },
  { w:7, theme:'真实任务模拟', input:'无字幕短视频／短新闻', collect:'同义替换、连接词', output:'看 2 分钟视频后复述', check:'能复述大意并说出 5 个表达' },
  { w:8, theme:'复盘与升级', input:'混合材料', collect:'只保留真正会用的', output:'录 1–2 分钟自我介绍', check:'总词块 150–250，定下周期' }
];
function renderPlan(){
  const cur = state.settings.currentWeek || 1;
  $('#planBody').innerHTML = PLAN.map(p => `<tr class="${p.w === cur ? 'current' : ''}"><td>第 ${p.w} 周</td><td>${esc(p.theme)}</td><td>${esc(p.input)}</td><td>${esc(p.collect)}</td><td>${esc(p.output)}</td><td>${esc(p.check)}</td></tr>`).join('');
  $('#weekSelect').value = String(cur);
}

function openModal(chunk){
  $('#modalTitle').textContent = chunk ? '编辑词块' : '记录新词块';
  $('#fId').value = chunk ? chunk.id : '';
  $('#fSentence').value = chunk ? chunk.sentence : '';
  $('#fChunk').value = chunk ? chunk.chunk : '';
  $('#fMeaning').value = chunk ? chunk.meaning : '';
  $('#fMine').value = chunk ? (chunk.mine || '') : '';
  $('#fSource').value = chunk ? (chunk.source || '') : '';
  $('#modal').hidden = false;
  setTimeout(() => { (chunk ? $('#fChunk') : $('#fSentence')).focus(); }, 60);
}
function closeModal(){ $('#modal').hidden = true; $('#chunkForm').reset(); $('#fId').value = ''; }

function renderAll(){ renderToday(); renderChunks(); renderStats(); }

/* ========== 云同步（Supabase，可选；不配置就完全本地） ==========
   设计：本地 localStorage 仍是主存储（断网可用），云端只作镜像。
   配置与 token 存在独立的 key（ecChunksCloud_v1），不跟着 state 一起同步。 */
const CLOUD_KEY = 'ecChunksCloud_v1';
var cloudCfg = loadCloudCfg();
var cloudEnabledRuntime = false;   /* init 之后才允许自动推送 */
var cloudApplyGuard = false;       /* 正在应用远端数据时，不要回推 */
var cloudPushTimer = null;
var cloudBusy = false;

function loadCloudCfg(){
  /* lastHash: 上次同步成功时的内容指纹（判新旧用，不吃时钟）
     lastRemoteAt: 上次同步时云端那条的 updated_at（只用来显示）
     lastError: 上次同步失败的原因（以前是静默吞掉，用户完全看不见） */
  const base = { url:'', anonKey:'', email:'', accessToken:'', refreshToken:'', expiresAt:0, userId:'', auto:true, lastSyncAt:'', lastHash:'', lastRemoteAt:'', lastError:'' };
  try{
    const raw = localStorage.getItem(CLOUD_KEY);
    if (raw) return Object.assign(base, JSON.parse(raw) || {});
  }catch(e){}
  return base;
}
function saveCloudCfg(){ try{ localStorage.setItem(CLOUD_KEY, JSON.stringify(cloudCfg)); }catch(e){} }
/* 同步失败要留痕迹：以前 cloudBootSync 直接 catch(e){}，用户只知道「没同步上」，
   不知道是 token 过期、网络不通还是 SQL 没建表。 */
function setCloudError(e){
  const msg = (e && e.message) ? e.message : String(e);
  cloudCfg.lastError = msg.slice(0, 200) + ' · ' + new Date().toLocaleString();
  try{ saveCloudCfg(); }catch(_e){}
  try{ console.warn('[cloud]', msg); }catch(_e){}
}
function cloudBase(){ return String(cloudCfg.url || '').replace(/\/+$/, ''); }
function cloudReady(){ return !!(cloudCfg.url && cloudCfg.anonKey); }
function cloudLoggedIn(){ return !!(cloudCfg.accessToken && cloudCfg.userId); }

/* ---------------- 同步判新旧：不再看本机时钟 ----------------
   原来用 Date.parse(远端 updated_at) 和本机 lastSyncAt 比大小。两台设备的钟
   差几分钟，判断就会错，于是「本机明明改过却被远端覆盖」。
   现在改成内容指纹：上次同步成功时把状态算一个 hash 存下来，
   之后谁的 hash 和它不同，谁就是改过的一边。时钟只用来显示。 */
function stableStringify(v){
  if (v === null || typeof v !== 'object') return JSON.stringify(v);
  if (Array.isArray(v)) return '[' + v.map(stableStringify).join(',') + ']';
  return '{' + Object.keys(v).sort().map(k => JSON.stringify(k) + ':' + stableStringify(v[k])).join(',') + '}';
}
function cloudHash(obj){
  const s = stableStringify(obj || {});
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++){ h ^= s.charCodeAt(i); h = Math.imul(h, 0x01000193); }
  return (h >>> 0).toString(16) + '-' + s.length.toString(16);
}

/* ---------------- 合并：不再整盘覆盖 ----------------
   applyCloudRow 以前是 state = migrate(row.data)，本机独有的词块/进度一次全没。
   现在按并集合并：词块按 id 去重取更熟的那条，日志按天取并，进度/译文按题合并，
   删除用 trash / deletedLessons 当墓碑。原则是「宁可多留一条，也不悄悄删笔记」。 */
function chunkScore(c){ return (c && c.mastered ? 1000 : 0) + (Number(c && c.stage) || 0) * 10; }
function pickChunk(a, b){
  const sa = chunkScore(a), sb = chunkScore(b);
  if (sa !== sb) return sb > sa ? b : a;
  const la = String(a.lastReviewed || ''), lb = String(b.lastReviewed || '');
  if (la !== lb) return lb > la ? b : a;
  if (!a.mine && b.mine) return b;   // 同分时保留带自己备注的那条
  return a;
}
function lessonWeight(l){
  const text = Array.isArray(l.text) ? l.text.join(' ').length : 0;
  const chunks = Array.isArray(l.chunks) ? l.chunks.length : 0;
  return text + chunks * 40;
}
function pickLesson(a, b){
  if (!a || !b) return a || b;
  return lessonWeight(b) > lessonWeight(a) ? b : a;
}
function mergeStates(local, remote){
  const L = migrate(local || {}), R = migrate(remote || {});
  const keys = (o) => Object.keys(o || {});

  /* 墓碑：任一边删过就算删过 */
  const goneLessons = Object.assign({}, R.deletedLessons || {}, L.deletedLessons || {});
  const goneChunks = new Set();
  [R.trash, L.trash].forEach(list => (Array.isArray(list) ? list : []).forEach(c => { if (c && c.id) goneChunks.add(c.id); }));

  const chunkMap = new Map();
  R.chunks.forEach(c => { if (c && c.id && !goneChunks.has(c.id)) chunkMap.set(c.id, c); });
  L.chunks.forEach(c => {
    if (!c || !c.id || goneChunks.has(c.id)) return;
    chunkMap.set(c.id, chunkMap.has(c.id) ? pickChunk(chunkMap.get(c.id), c) : c);
  });

  const logs = {};
  keys(R.logs).concat(keys(L.logs)).forEach(d => {
    if (logs[d]) return;
    const r = R.logs[d] || {}, l = L.logs[d] || {};
    logs[d] = {
      inputDone: !!(r.inputDone || l.inputDone),
      outputDone: !!(r.outputDone || l.outputDone),
      reviewed: Math.max(Number(r.reviewed) || 0, Number(l.reviewed) || 0)
    };
  });

  const lessonMap = new Map();
  R.customLessons.forEach(l => { if (l && l.id && !goneLessons[l.id]) lessonMap.set(l.id, l); });
  L.customLessons.forEach(l => {
    if (!l || !l.id || goneLessons[l.id]) return;
    lessonMap.set(l.id, lessonMap.has(l.id) ? pickLesson(lessonMap.get(l.id), l) : l);
  });

  const progress = {};
  keys(R.progress).concat(keys(L.progress)).forEach(id => {
    if (progress[id] || goneLessons[id]) return;
    const r = R.progress[id] || {}, l = L.progress[id] || {};
    progress[id] = {
      quiz: Object.assign({}, r.quiz || {}, l.quiz || {}),
      cloze: Object.assign({}, r.cloze || {}, l.cloze || {}),
      clozeRes: Object.assign({}, r.clozeRes || {}, l.clozeRes || {})
    };
  });

  const lessonEdits = {};
  keys(R.lessonEdits).concat(keys(L.lessonEdits)).forEach(id => {
    if (lessonEdits[id] || goneLessons[id]) return;
    const r = R.lessonEdits[id] || {}, l = L.lessonEdits[id] || {};
    const extra = [];
    (Array.isArray(r.extraChunks) ? r.extraChunks : []).concat(Array.isArray(l.extraChunks) ? l.extraChunks : []).forEach(x => {
      if (x && !extra.some(y => String(y.chunk || '').toLowerCase() === String(x.chunk || '').toLowerCase())) extra.push(x);
    });
    const entry = {
      chunkMeaning: Object.assign({}, r.chunkMeaning || {}, l.chunkMeaning || {}),
      chunkSentZh: Object.assign({}, r.chunkSentZh || {}, l.chunkSentZh || {}),
      chunkSentence: Object.assign({}, r.chunkSentence || {}, l.chunkSentence || {}),
      extraChunks: extra
    };
    /* 不要留 undefined：JSON.stringify 会丢掉这个键，下次启动重算的指纹就和存下来的
       对不上，白触发一次「本机改过了」的同步。有值才写。 */
    const zh = Array.isArray(l.textZh) && l.textZh.length ? l.textZh : r.textZh;
    if (Array.isArray(zh) && zh.length) entry.textZh = zh;
    lessonEdits[id] = entry;
  });

  /* 错题本：按 id 并集合并。次数取大值（两边算的是同一次错，加起来会虚高），
     订正状态取「任一边订正过」，其余字段跟着更晚的那条走。 */
  /* 清空已订正的错题也要留墓碑：并集合并会把清掉的条目从云端搬回来 */
  const goneMistakes = Object.assign({}, R.deletedMistakes || {}, L.deletedMistakes || {});
  const mistakes = {};
  keys(R.mistakes).concat(keys(L.mistakes)).forEach(id => {
    if (mistakes[id]) return;
    if (goneLessons[String(id).split('|')[0]]) return;
    if (goneMistakes[id]) return;
    const r = R.mistakes[id], l = L.mistakes[id];
    if (!r || !l){ mistakes[id] = Object.assign({}, r || l); return; }
    const later = String(l.at || '') >= String(r.at || '') ? l : r;
    mistakes[id] = Object.assign({}, later, {
      wrong: Math.max(Number(r.wrong) || 1, Number(l.wrong) || 1),
      fixed: !!(r.fixed || l.fixed),
      at: later.at
    });
  });

  /* 译文缓存：纯并集，本机已有的同一条优先（谁先翻出来的都一样，不值当比较） */
  const trCache = normalizeTrCache(Object.assign({}, R.trCache || {}, L.trCache || {}));

  const trashMap = new Map();
  L.trash.concat(R.trash).forEach(c => { if (c && c.id && !trashMap.has(c.id)) trashMap.set(c.id, c); });

  return {
    version: DATA_VERSION,
    chunks: Array.from(chunkMap.values()),
    logs,
    streak: Math.max(Number(L.streak) || 0, Number(R.streak) || 0),
    lastActive: String(L.lastActive || '') >= String(R.lastActive || '') ? (L.lastActive || null) : (R.lastActive || null),
    /* 设置类以本机为准：一周几天这种，谁在用谁的 */
    settings: Object.assign({}, R.settings || {}, L.settings || {}),
    customLessons: Array.from(lessonMap.values()),
    trash: Array.from(trashMap.values()).slice(0, 100),
    progress,
    lessonEdits,
    mistakes,
    trCache,
    deletedLessons: goneLessons,
    deletedMistakes: goneMistakes
  };
}

/* ---- 基础请求 ---- */
async function cloudRaw(path, opts){
  const o = opts || {};
  const headers = Object.assign({ 'apikey': cloudCfg.anonKey, 'Content-Type': 'application/json' }, o.headers || {});
  if (o.auth !== false && cloudCfg.accessToken) headers['Authorization'] = 'Bearer ' + cloudCfg.accessToken;
  return fetch(cloudBase() + path, { method: o.method || 'GET', headers, body: o.body });
}
async function cloudRefreshToken(force){
  if (!cloudCfg.refreshToken) return false;
  if (!force && cloudCfg.accessToken && Date.now() < (Number(cloudCfg.expiresAt) - 60000)) return true;
  const res = await cloudRaw('/auth/v1/token?grant_type=refresh_token', {
    method:'POST', auth:false, body: JSON.stringify({ refresh_token: cloudCfg.refreshToken })
  });
  if (!res.ok) return false;
  const j = await res.json().catch(() => ({}));
  if (!j.access_token) return false;
  cloudCfg.accessToken = j.access_token;
  cloudCfg.refreshToken = j.refresh_token || cloudCfg.refreshToken;
  cloudCfg.expiresAt = Date.now() + Number(j.expires_in || 3600) * 1000;
  if (j.user && j.user.id) cloudCfg.userId = j.user.id;
  saveCloudCfg();
  return true;
}

/* ---- 登录 / 注册 ---- */
async function cloudAuth(mode, email, password){
  const path = mode === 'signup' ? '/auth/v1/signup' : '/auth/v1/token?grant_type=password';
  const res = await cloudRaw(path, { method:'POST', auth:false, body: JSON.stringify({ email, password }) });
  const j = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(j.error_description || j.msg || j.error || ('HTTP ' + res.status));
  const tok = j.access_token || (j.session && j.session.access_token);
  const rt = j.refresh_token || (j.session && j.session.refresh_token);
  const uid = (j.user && j.user.id) || (j.session && j.session.user && j.session.user.id);
  if (!tok) throw new Error('注册成功，但需要在邮箱里点确认链接后才能登录');
  cloudCfg.email = email;
  cloudCfg.accessToken = tok;
  cloudCfg.refreshToken = rt || '';
  cloudCfg.expiresAt = Date.now() + Number(j.expires_in || 3600) * 1000;
  cloudCfg.userId = uid || '';
  saveCloudCfg();
}

/* ---- 上行 / 下行 ---- */
async function cloudPush(manual){
  if (!cloudReady() || !cloudLoggedIn()){ if (manual) toast('先在上面配置并登录云同步'); return false; }
  if (cloudBusy) { if (manual) toast('正在同步中，请稍候'); return false; }
  cloudBusy = true;
  try{
    let res = await cloudRaw('/rest/v1/states?on_conflict=user_id', {
      method:'POST',
      headers:{ 'Prefer':'resolution=merge-duplicates,return=minimal' },
      body: JSON.stringify([{ user_id: cloudCfg.userId, data: state, updated_at: new Date().toISOString() }])
    });
    if (res.status === 401 && (await cloudRefreshToken(true))){
      res = await cloudRaw('/rest/v1/states?on_conflict=user_id', {
        method:'POST',
        headers:{ 'Prefer':'resolution=merge-duplicates,return=minimal' },
        body: JSON.stringify([{ user_id: cloudCfg.userId, data: state, updated_at: new Date().toISOString() }])
      });
    }
    if (!res.ok) throw new Error((await res.text()).slice(0, 160) || ('HTTP ' + res.status));
    cloudCfg.lastSyncAt = new Date().toISOString();
    cloudCfg.lastHash = cloudHash(state);   // 记下这次同步出去的内容指纹
    cloudCfg.lastError = '';
    saveCloudCfg(); renderCloudCard();
    if (manual) toast('已上传到云端');
    return true;
  }catch(e){
    setCloudError(e);
    if (manual) toast('上传失败：' + (e && e.message ? e.message : e));
    return false;
  }finally{ cloudBusy = false; }
}

async function cloudPullRow(){
  if (!cloudReady() || !cloudLoggedIn()) return null;
  let res = await cloudRaw('/rest/v1/states?user_id=eq.' + encodeURIComponent(cloudCfg.userId) + '&select=data,updated_at');
  if (res.status === 401 && (await cloudRefreshToken(true))){
    res = await cloudRaw('/rest/v1/states?user_id=eq.' + encodeURIComponent(cloudCfg.userId) + '&select=data,updated_at');
  }
  if (!res.ok) throw new Error((await res.text()).slice(0, 160) || ('HTTP ' + res.status));
  const rows = await res.json();
  return (Array.isArray(rows) && rows.length) ? rows[0] : null;
}

/* 把云端数据并进本机（不再整盘替换）。返回是否真的有变化。 */
function applyCloudRow(row){
  if (!row || !row.data) return false;
  const before = cloudHash(state);
  const merged = mergeStates(state, row.data);
  cloudApplyGuard = true;
  try{
    state = merged;
    saveState();
  }finally{ cloudApplyGuard = false; }
  cloudCfg.lastRemoteAt = row.updated_at || '';
  cloudCfg.lastError = '';
  cloudCfg.lastSyncAt = new Date().toISOString();
  cloudCfg.lastHash = cloudHash(state);
  saveCloudCfg();
  const changed = cloudHash(state) !== before;
  if (changed){ renderAll(); renderPlan(); renderLearn(); }
  renderCloudCard();
  return changed;
}

async function cloudRestore(manual){
  try{
    const row = await cloudPullRow();
    if (!row){ if (manual) toast('云端还没有数据，先点「立即上传」'); return false; }
    const changed = applyCloudRow(row);
    /* 合并完把结果回传，免得云端一直停在旧版本 */
    if (cloudHash(state) !== cloudHash(migrate(row.data))) await cloudPush(false);
    if (manual) toast(changed ? '已把云端数据合并进本机' : '云端的和本机已经一样了');
    return true;
  }catch(e){
    setCloudError(e);
    if (manual) toast('读取失败：' + (e && e.message ? e.message : e));
    renderCloudCard();
    return false;
  }
}

function scheduleCloudPush(){
  if (!cloudCfg || !cloudEnabledRuntime || cloudApplyGuard) return;
  if (!cloudCfg.auto || !cloudReady() || !cloudLoggedIn()) return;
  clearTimeout(cloudPushTimer);
  cloudPushTimer = setTimeout(() => { cloudPush(false); }, 3000);
}

/* 打开页面时的自动同步。
   三处改动：①「谁改过」不再用本机时钟判断，改用上次同步时存的内容指纹；
   ②两边都改过时不再二选一覆盖，直接合并；
   ③失败不再静默，写到设置卡片里。 */
async function cloudBootSync(){
  if (!cloudReady() || !cloudLoggedIn() || !cloudCfg.auto) return;
  try{
    if (!(await cloudRefreshToken(false))) return;
    const row = await cloudPullRow();
    if (!row){ await cloudPush(false); return; }
    const remoteHash = cloudHash(migrate(row.data));
    const localHash = cloudHash(state);
    const lastHash = cloudCfg.lastHash || '';
    const remoteChanged = remoteHash !== lastHash;
    const localChanged = localHash !== lastHash;

    if (remoteHash === localHash){
      /* 内容本来就一样（比如第一次升级上来，还没有指纹）：只补记录 */
      cloudCfg.lastHash = localHash;
      cloudCfg.lastRemoteAt = row.updated_at || '';
      cloudCfg.lastError = '';
      saveCloudCfg();
    } else if (!remoteChanged && !localChanged){
      /* 本机没动、云端也还是上次那份 */
    } else {
      const bothChanged = remoteChanged && localChanged;
      if (remoteChanged) applyCloudRow(row);          // 合并，不覆盖
      if (cloudHash(state) !== remoteHash){
        await cloudPush(false);                       // 合并后本机还有云端没有的，回传
      }
      if (bothChanged) toast('云端和本机都改过，已自动合并（不会覆盖本机词块）');
    }
    renderCloudCard();
  }catch(e){
    setCloudError(e);
    renderCloudCard();
  }
}

/* ---- 设置卡片 ---- */
function renderCloudCard(){
  const box = $('#cloudBody'); const status = $('#cloudStatus');
  if (!box) return;
  const logged = cloudLoggedIn();
  if (status){
    const lastErr = logged && cloudCfg.lastError ? (' · 上次同步失败：' + cloudCfg.lastError) : '';
    status.textContent = logged ? ('已登录 ' + (cloudCfg.email || '') + (cloudCfg.lastSyncAt ? ' · 上次同步 ' + new Date(cloudCfg.lastSyncAt).toLocaleString() : '') + lastErr)
      : (cloudReady() ? '已填配置，未登录' : '未连接（不配置则纯本地）');
    status.style.color = lastErr ? 'var(--danger, #c0392b)' : (logged ? 'var(--brand-2)' : 'var(--muted)');
  }
  if (!cloudReady()){
    box.innerHTML = `
      <p class="note" style="margin-top:0;">可选功能：把词块本同步到 Supabase（免费额度足够个人用），换设备不用导出导入。不填则一切照旧，只在本机。</p>
      <label>Supabase 项目地址<input id="cUrl" placeholder="https://xxxx.supabase.co" value="${esc(cloudCfg.url)}"></label>
      <label>anon public key<input id="cKey" placeholder="eyJhbGciOi..." value="${esc(cloudCfg.anonKey)}"></label>
      <div style="display:flex;gap:9px;flex-wrap:wrap;">
        <button class="btn small primary" id="cSaveCfg" type="button">保存配置</button>
      </div>
      <details style="margin-top:12px;"><summary style="cursor:pointer;font-size:13px;color:var(--muted);">第一次用？点这里看建表 SQL 与步骤</summary>
        <pre style="white-space:pre-wrap;font-size:12px;line-height:1.6;background:var(--surface-2);border:1px solid var(--line);border-radius:10px;padding:10px;overflow:auto;">1) 打开 supabase.com 新建项目；
2) 左侧 SQL Editor → 粘贴下面这段并 Run：

create table if not exists public.states (
  user_id uuid primary key references auth.users(id) on delete cascade,
  data jsonb not null,
  updated_at timestamptz not null default now()
);
alter table public.states enable row level security;
create policy "own select" on public.states for select using (auth.uid() = user_id);
create policy "own insert" on public.states for insert with check (auth.uid() = user_id);
create policy "own update" on public.states for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

3) Project Settings → API：复制 URL 和 anon public key 填到上面；
4) 保存配置 → 下面用邮箱 + 密码注册/登录（若项目开了邮箱验证，先去邮箱点确认链接）。</pre>
      </details>`;
    $('#cSaveCfg').onclick = () => {
      cloudCfg.url = ($('#cUrl').value || '').trim();
      cloudCfg.anonKey = ($('#cKey').value || '').trim();
      if (!/^https?:\/\//.test(cloudCfg.url)){ toast('项目地址要以 https:// 开头'); return; }
      saveCloudCfg(); renderCloudCard(); toast('配置已保存');
    };
    return;
  }
  if (!logged){
    box.innerHTML = `
      <p class="note" style="margin-top:0;">已配置：${esc(cloudBase())}</p>
      <label>邮箱<input id="cEmail" type="email" placeholder="you@example.com" value="${esc(cloudCfg.email || '')}" autocomplete="username"></label>
      <label>密码（至少 6 位）<input id="cPass" type="password" placeholder="******" autocomplete="current-password"></label>
      <div style="display:flex;gap:9px;flex-wrap:wrap;">
        <button class="btn small primary" id="cLogin" type="button">登录</button>
        <button class="btn small" id="cSignup" type="button">注册</button>
        <button class="btn small ghost" id="cReset" type="button">改配置</button>
      </div>`;
    const doAuth = async mode => {
      const email = ($('#cEmail').value || '').trim();
      const pass = $('#cPass').value || '';
      if (!email || !pass){ toast('邮箱和密码都要填'); return; }
      try{
        await cloudAuth(mode, email, pass);
        renderCloudCard(); toast(mode === 'signup' ? '注册并登录成功' : '登录成功');
        await cloudBootSync();
      }catch(e){
        const msg = (e && e.message) ? e.message : String(e);
        toast(/^注册成功/.test(msg) ? msg : ((mode === 'signup' ? '注册失败：' : '登录失败：') + msg));
      }
    };
    $('#cLogin').onclick = () => doAuth('login');
    $('#cSignup').onclick = () => doAuth('signup');
    $('#cReset').onclick = () => { cloudCfg.url = ''; cloudCfg.anonKey = ''; saveCloudCfg(); renderCloudCard(); };
    return;
  }
  box.innerHTML = `
    <p class="note" style="margin-top:0;">账号：${esc(cloudCfg.email || cloudCfg.userId)} · 云端地址：${esc(cloudBase())}</p>
    <label style="display:flex;align-items:center;gap:8px;font-weight:400;color:var(--ink);">
      <input type="checkbox" id="cAuto" style="width:auto;margin:0;" ${cloudCfg.auto ? 'checked' : ''}> 自动同步（改动后 3 秒内上传）
    </label>
    <div style="display:flex;gap:9px;flex-wrap:wrap;margin-top:6px;">
      <button class="btn small primary" id="cPush" type="button">立即上传</button>
      <button class="btn small" id="cPull" type="button">从云端合并</button>
      <button class="btn small danger" id="cLogout" type="button">退出登录</button>
    </div>`;
  $('#cAuto').onchange = e => { cloudCfg.auto = !!e.target.checked; saveCloudCfg(); toast(cloudCfg.auto ? '已开启自动同步' : '已关闭自动同步'); };
  $('#cPush').onclick = () => cloudPush(true);
  /* 以前这里写的是「用云端数据覆盖本地」，确实会整盘替换 —— 现在改成合并：
     云端有的缺的补过来，本机独有的保留。 */
  $('#cPull').onclick = () => { if (confirm('把云端的数据并进本机？\n\n云端有、本机没有的会补过来；本机独有的不会删除。')) cloudRestore(true); };
  $('#cLogout').onclick = () => {
    cloudCfg.accessToken = ''; cloudCfg.refreshToken = ''; cloudCfg.expiresAt = 0; cloudCfg.userId = '';
    /* 顺手把同步指纹与错误清掉：换了账号还带着上一个账号的指纹会误判「没变化」 */
    cloudCfg.lastHash = ''; cloudCfg.lastRemoteAt = ''; cloudCfg.lastError = '';
    saveCloudCfg(); renderCloudCard(); toast('已退出登录');
  };
}

/* ========== 初始化 ========== */
function init(){
  if (pruneLogs()) saveState();
  if (newerDataVersion){
    toast(`这份数据是更新版本的程序写的（v${newerDataVersion}），当前版本可能读不全。建议先导出一份备份。`);
  }

  function showPage(name){
    $$('.tab').forEach(t => {
      const on = t.dataset.page === name;
      t.classList.toggle('active', on);
      t.setAttribute('aria-selected', on ? 'true' : 'false');
    });
    $$('.page').forEach(p => p.classList.toggle('active', p.id === 'page-' + name));
    if (name === 'today')  renderToday();
    if (name === 'learn')  renderLearn();
    if (name === 'chunks') renderChunks();
    if (name === 'review') enterReview();
    if (name === 'stats')  renderStats();
    if (name === 'plan')   renderPlan();
    if (name === 'mistakes') renderMistakes();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  window.showPage = showPage;
  $$('.tab').forEach(tab => { tab.onclick = () => showPage(tab.dataset.page); });

  $('#btnAddToday').onclick  = () => openModal();
  $('#btnAddChunks').onclick = () => openModal();
  $('#btnGoLearn').onclick   = () => showPage('learn');
  $('#btnGoReview').onclick  = () => { reviewState = { queue:[], index:0, revealed:false, goodCount:0, total:0, wrong:[] }; showPage('review'); };

  /* 文章卡片：原来是内联 onclick/onkeydown，CSP 只允许 'self' 脚本后那一整片会失效，
     改成事件委托。编辑/删除按钮嵌在卡片里，所以先判按钮再判卡片。 */
  const lessonGrid = $('#lessonGrid');
  if (lessonGrid) {
    lessonGrid.addEventListener('click', e => {
      const edit = e.target.closest('[data-edit-lesson]');
      if (edit) { window.editLesson(edit.dataset.editLesson); return; }
      const del = e.target.closest('[data-del-lesson]');
      if (del) { window.removeLesson(del.dataset.delLesson); return; }
      const card = e.target.closest('.lesson-card[data-lesson]');
      if (card) window.openLesson(card.dataset.lesson);
    });
    lessonGrid.addEventListener('keydown', e => {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      const card = e.target.closest('.lesson-card[data-lesson]');
      if (!card) return;
      e.preventDefault();
      window.openLesson(card.dataset.lesson);
    });
  }
  $('#levelChips').addEventListener('click', e => {
    const b = e.target.closest('.chip'); if (!b) return;
    learnState.level = b.dataset.level;
    renderLearnList();
  });

  $('#btnAddArticle').onclick = () => openArticleModal();

  /* 按等级 + 进度生成复习短文（只用现有语料，不联网） */
  $('#btnGenLesson').onclick = () => genReviewLessonNow();

  /* 错题本：筛选 chips + 卡片内的事件委托（CSP 不允许内联事件） */
  bindMistakeEvents();

  /* 全站的框选翻译/收词块：只在 document 上绑一次，别在每个 .para 上重复绑 */
  bindGlobalSelection();

  /* 「让 AI 写一篇」：提示词随难度/主题变化，点复制即可粘给任意 AI */
  const btnCopyPrompt = $('#btnCopyPrompt');
  if (btnCopyPrompt) btnCopyPrompt.onclick = async () => {
    refreshAiPrompt();
    const box = $('#aPrompt');
    const ok = await copyText(box ? box.value : '');
    toast(ok ? '提示词已复制，粘贴给 AI 就行' : '复制失败：可以点开文本框手动全选复制');
  };
  const btnRefreshPrompt = $('#btnRefreshPrompt');
  if (btnRefreshPrompt) btnRefreshPrompt.onclick = () => { refreshAiPrompt(); toast('已按当前难度和主题重新生成'); };
  ['#aLevel', '#aTopic'].forEach(sel => {
    const el = $(sel);
    if (!el) return;
    el.addEventListener('input', refreshAiPrompt);
    el.addEventListener('change', refreshAiPrompt);
  });

  /* 逐句翻译 */
  $('#btnAutoTranslate').onclick = async () => {
    const en = splitEnglishSentences($('#aText').value);
    if (!en.length){ toast('请先粘贴英文原文'); return; }
    const btn = $('#btnAutoTranslate');
    const status = $('#transStatus');
    btn.disabled = true;
    status.innerHTML = '<span class="loading-dot"></span>正在逐句翻译…';
    try {
      const results = await translateSentences(en, (i, n) => {
        status.innerHTML = `<span class="loading-dot"></span>翻译中 ${i}/${n} 句`;
      });
      const success = results.filter(Boolean).length;
      if (!success){
        status.textContent = '翻译失败：免费接口暂时不可用，请检查网络。';
        toast('翻译失败');
        return;
      }
      $('#aTextZh').value = results.map(t => t || '').join('\n');
      updateAlignNote();
      status.textContent = `翻译完成 ${success}/${en.length} 句，每句一行。`;
      toast(`翻译完成 ${success}/${en.length} 句`);
    } catch(e){
      status.textContent = '翻译失败：' + (e && e.message ? e.message : '网络异常');
    } finally {
      btn.disabled = false;
    }
  };

  $('#btnClearZh').onclick = () => { $('#aTextZh').value = ''; updateAlignNote(); $('#transStatus').textContent = ''; toast('已清空中文翻译'); };

  $('#aText').addEventListener('input', updateAlignNote);
  $('#aTextZh').addEventListener('input', updateAlignNote);

  /* 保存文章 */
  $('#articleForm').addEventListener('submit', async e => {
    e.preventDefault();
    const id = $('#aId').value;
    const title = $('#aTitle').value.trim();
    const textRaw = $('#aText').value;
    if (!title){ toast('请填写英文标题'); return; }
    if (!textRaw.trim()){ toast('请填写英文原文'); return; }

    let textArr = splitEnglishSentences(textRaw);
    let zhArr = splitZhInput($('#aTextZh').value);
    if (!textArr.length){ toast('请填写英文原文'); return; }

    /* 只补「缺译文」的句子：全部为空时逐句翻，部分缺失时也只翻缺的那几句 */
    const needTranslate = textArr.map((_, i) => i).filter(i => !(zhArr[i] || '').trim());
    if (needTranslate.length){
      const submitBtn = $('#articleSubmit');
      const status = $('#transStatus');
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span class="loading-dot"></span>逐句翻译中…';
      try {
        const results = await translateSentences(needTranslate.map(i => textArr[i]), (i, n) => {
          submitBtn.innerHTML = `<span class="loading-dot"></span>翻译 ${i}/${n}`;
          status.innerHTML = `<span class="loading-dot"></span>保存前逐句翻译 ${i}/${n}`;
        });
        needTranslate.forEach((i, k) => {
          const t = results[k];
          if (t && !(zhArr[i] || '').trim()) zhArr[i] = t;
        });
        const success = needTranslate.filter(i => (zhArr[i] || '').trim()).length;
        if (success){
          status.textContent = `保存前已补译 ${success}/${needTranslate.length} 句。`;
        } else {
          status.textContent = '自动翻译失败，中文为空保存。';
        }
      } catch(err){
        status.textContent = '自动翻译失败，中文为空保存。';
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = '保存文章';
      }
    }

    const aligned = alignSentences(textArr, zhArr);
    textArr = aligned.en;
    zhArr = aligned.zh;

    const wordCount = textArr.join(' ').split(/\s+/).filter(Boolean).length;
    const minutes = Math.max(2, Math.round(wordCount / 180));

    if (id){
      const lesson = getLessonById(id);
      if (!lesson){ toast('文章不存在'); return; }
      const oldText = (lesson.text || []).join(' ');
      const textChanged = oldText !== textArr.join(' ');

      lesson.title = title;
      lesson.titleZh = $('#aTitleZh').value.trim();
      lesson.level = $('#aLevel').value;
      lesson.topic = $('#aTopic').value.trim();
      lesson.text = textArr;
      lesson.textZh = zhArr;
      lesson.minutes = minutes;

      analyzeLesson(lesson, { force: textChanged, keepMeaning: true });
      if (textChanged) clearLessonProg(lesson.id);
      saveState();
      closeArticleModal();
      toast(textChanged ? '文章已更新，已重新分析' : '文章已更新');
      renderLearn();
    } else {
      const newLesson = normalizeLesson({
        id: 'custom_' + uid(),
        title, titleZh: $('#aTitleZh').value.trim(), level: $('#aLevel').value, topic: $('#aTopic').value.trim(),
        text: textArr, textZh: zhArr, minutes, chunks: [], quiz: [], cloze: []
      });
      analyzeLesson(newLesson, { force: true });
      if (!state.customLessons) state.customLessons = [];
      state.customLessons.unshift(newLesson);
      saveState();
      closeArticleModal();
      const parts = [`已添加 ${newLesson.text.length} 句英文`];
      if (newLesson.textZh.filter(Boolean).length) parts.push(`${newLesson.textZh.filter(Boolean).length} 句中文`);
      if (newLesson.chunks.length) parts.push(`识别 ${newLesson.chunks.length} 个词块`);
      if (newLesson.quiz.length) parts.push(`生成 ${newLesson.quiz.length} 道题`);
      if (newLesson.cloze.length) parts.push(`${newLesson.cloze.length} 道填空`);
      toast(parts.join('，'));
      learnState.level = 'custom';
      learnState.lessonId = newLesson.id;
      learnState.showTrans = true;
      renderLearn();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });
  $('#articleClose').onclick  = closeArticleModal;
  $('#articleCancel').onclick = closeArticleModal;
  $('#articleModal').addEventListener('click', e => { if (e.target.id === 'articleModal') closeArticleModal(); });

  function toggleManual(li){
    const id = li.dataset.check; const log = ensureLog();
    if (id === 'input')  log.inputDone  = !log.inputDone;
    if (id === 'output') log.outputDone = !log.outputDone;
    touchActivity(); saveState(); renderToday();
  }
  $('#checklist').addEventListener('click', e => { const li = e.target.closest('li.manual'); if (li) toggleManual(li); });
  $('#checklist').addEventListener('keydown', e => {
    const li = e.target.closest('li.manual'); if (!li) return;
    if (e.key === ' ' || e.key === 'Enter'){ e.preventDefault(); toggleManual(li); }
  });

  $('#chunkForm').addEventListener('submit', e => {
    e.preventDefault();
    const id = $('#fId').value;
    const data = {
      sentence: $('#fSentence').value.trim(), chunk: $('#fChunk').value.trim(), meaning: $('#fMeaning').value.trim(),
      mine: $('#fMine').value.trim(), source: $('#fSource').value.trim()
    };
    if (!data.sentence || !data.chunk || !data.meaning){ toast('原句、词块、意思都要填哦'); return; }
    if (!id && !sentenceHasChunk(data.sentence, data.chunk)){
      if (!confirm('原句里没有找到这个词块，复习挖空会失效。仍要保存吗？')) return;
    }
    const dup = !id && state.chunks.find(c => c.chunk.toLowerCase() === data.chunk.toLowerCase() && !c.mastered);
    if (id){ updateChunk(id, data); toast('已更新'); }
    /* 重复的不要再插一条：改成更新已有那条。列表里出现两份同词块，
       复习时两边各记一套 stage，很容易被问第二遍也判不清谁是谁。 */
    else if (dup){ updateChunk(dup.id, data); toast('这个词块已经收过了，已更新内容'); }
    else { addChunk(data); toast('已收录'); }
    closeModal();
    renderAll();
    if (learnState.lessonId){ const l = getLessonById(learnState.lessonId); if (l) renderLessonDetail(l); }
  });
  $('#modalClose').onclick  = closeModal;
  $('#modalCancel').onclick = closeModal;
  $('#modal').addEventListener('click', e => { if (e.target.id === 'modal') closeModal(); });

  let searchTimer = null;
  $('#searchBox').addEventListener('input', e => {
    /* 立刻取值，不在定时器里读事件对象 */
    const v = e.target.value;
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => { searchTerm = v.trim(); renderChunks(); }, 150);
  });
  $('#filterBar').addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; chunkFilter = b.dataset.f; renderChunks(); });
  $('#sortBy').addEventListener('change', e => { sortBy = e.target.value; renderChunks(); });
  $('#sourceFilter').addEventListener('change', e => { chunkSource = e.target.value; renderChunks(); });
  $('#btnDelPicked').onclick = () => {
    /* 只删当前还存在的：翻过筛选之后，Set 里可能留着已删除的 id */
    const ids = Array.from(pickedIds).filter(x => state.chunks.some(c => c.id === x));
    if (!ids.length){ toast('先勾选要删除的词块'); return; }
    if (!confirm(`确定删除选中的 ${ids.length} 个词块吗？可在右下角点「撤销」恢复。`)) return;
    const set = new Set(ids);
    const removed = state.chunks.filter(c => set.has(c.id));
    pushTrash(removed);
    state.chunks = state.chunks.filter(c => !set.has(c.id));
    pickedIds.clear();
    saveState(); renderAll(); renderTrash();
    toast(`已删除 ${removed.length} 个词块`, { label: '撤销', run: () => { if (restoreTrashMany(removed.map(r => r.id))) toast('已恢复'); } });
  };
  $('#chunkList').addEventListener('change', e => {
    const box = e.target.closest('[data-pick]');
    if (!box) return;
    if (box.checked) pickedIds.add(box.dataset.pick); else pickedIds.delete(box.dataset.pick);
  });
  $('#chunkList').addEventListener('click', e => {
    const editBtn = e.target.closest('[data-edit]'); const delBtn = e.target.closest('[data-del]');
    if (editBtn){ const c = state.chunks.find(x => x.id === editBtn.dataset.edit); if (c) openModal(c); }
    if (delBtn) deleteChunk(delBtn.dataset.del);
  });

  $('#weekSelect').addEventListener('change', e => { state.settings.currentWeek = Number(e.target.value); saveState(); renderPlan(); });

  /* 问 AI 的站点：下拉选一个就存；自己填的网址点「保存」（也支持回车） */
  const aiSel = $('#aiSiteSelect');
  if (aiSel) aiSel.addEventListener('change', () => setAiSite(aiSel.value));
  const aiSave = $('#btnSaveAiSite');
  if (aiSave) aiSave.onclick = () => setAiSite($('#aiSiteUrl').value);
  const aiInput = $('#aiSiteUrl');
  if (aiInput) aiInput.addEventListener('keydown', e => { if (e.key === 'Enter'){ e.preventDefault(); setAiSite(aiInput.value); } });

  $('#btnExport').onclick = () => {
    const payload = Object.assign({}, state, { exportedAt: new Date().toISOString() });
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `词块本备份-${todayStr()}.json`;
    document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
    if (!state.settings) state.settings = { currentWeek: 1 };
    state.settings.exportedAt = new Date().toISOString();
    state.settings.lastNag = todayStr();
    saveState();
    toast('已导出备份');
  };

  $('#btnExportCsv').onclick = exportChunksCsv;
  $('#btnExportAnki').onclick = exportChunksAnki;

  $('#btnImport').onclick = () => $('#fileInput').click();
  $('#fileInput').addEventListener('change', e => {
    const input = e.target;
    const file = input.files && input.files[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      /* finally 里重置，取消导入后再次选择同一个文件也能触发 change */
      try{
        const obj = JSON.parse(ev.target.result);
        if (!obj || !Array.isArray(obj.chunks)) throw new Error('格式不正确');
        const ok = confirm(`检测到备份：${obj.chunks.length} 个词块，${(obj.customLessons || []).length} 篇自定义文章。\n\n点「确定」= 合并到现有数据\n点「取消」= 放弃`);
        if (!ok) return;
        const map = new Map(state.chunks.map(c => [c.id, c]));
        obj.chunks.filter(Boolean).forEach(c => { const n = normalizeChunk(c); map.set(n.id, n); });
        state.chunks = Array.from(map.values()).sort((a, b) => b.added.localeCompare(a.added));
        if (Array.isArray(obj.customLessons)){
          const lmap = new Map((state.customLessons || []).map(l => [l.id, l]));
          obj.customLessons.filter(Boolean).forEach(l => { const n = normalizeLesson(l); lmap.set(n.id, n); });
          state.customLessons = Array.from(lmap.values());
        }
        if (obj.logs && typeof obj.logs === 'object') state.logs = Object.assign({}, state.logs, obj.logs);
        if (obj.lastActive && (!state.lastActive || obj.lastActive > state.lastActive)){
          state.lastActive = obj.lastActive;
          state.streak = Number.isFinite(obj.streak) ? obj.streak : state.streak;
        }
        if (obj.settings && obj.settings.currentWeek) state.settings.currentWeek = obj.settings.currentWeek;
        /* 备份里的错题也合并：换台机器恢复不该把错题本丢掉 */
        if (obj.mistakes && typeof obj.mistakes === 'object'){
          const mbox = ensureMistakes();
          Object.keys(obj.mistakes).forEach(id => {
            const src = obj.mistakes[id];
            if (!src || typeof src !== 'object' || !src.id) return;
            const cur = mbox[id];
            if (!cur){ mbox[id] = Object.assign({}, src); return; }
            mbox[id] = Object.assign({}, src, cur, {
              wrong: Math.max(Number(cur.wrong) || 1, Number(src.wrong) || 1),
              fixed: !!(cur.fixed || src.fixed)
            });
          });
        }
        saveState(); renderAll(); renderPlan(); renderLearn();
        toast('导入成功');
      }catch(err){ toast('导入失败：' + err.message); }
      finally { input.value = ''; }
    };
    reader.readAsText(file);
  });

  $('#btnReset').onclick = () => {
    if (!confirm('确定清空全部词块、记录和自定义文章吗？此操作不可恢复。')) return;
    if (!confirm('再确认一次：真的要清空吗？')) return;
    state = defaultState(); saveState();
    reviewState = { queue:[], index:0, revealed:false, goodCount:0, total:0, wrong:[] };
    learnState = { level:'all', lessonId:null, quizAnswers:{}, clozeValues:{}, clozeResults:{}, showTrans:false };
    renderAll(); renderPlan(); renderLearn(); toast('已清空');
  };

  document.addEventListener('mousedown', e => {
    const sp = $('#selPopup');
    if (sp && !sp.hidden && !sp.contains(e.target)) hideSelPopup();
    const sb = $('#selBar');
    if (sb && !sb.hidden && !sb.contains(e.target)) hideSelBar();
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape'){
      if (!$('#modal').hidden){ closeModal(); return; }
      if (!$('#articleModal').hidden){ closeArticleModal(); return; }
      const sp = $('#selPopup'); if (sp && !sp.hidden){ hideSelPopup(); return; }
      const sb = $('#selBar'); if (sb && !sb.hidden){ hideSelBar(); return; }
    }
    if (!$('#modal').hidden || !$('#articleModal').hidden) return;
    if (!$('#page-review').classList.contains('active')) return;
    if (e.target && e.target.closest && e.target.closest('input, textarea, select')) return;
    const q = reviewState.queue;
    if (!q.length || reviewState.index >= q.length) return;
    if (!reviewState.revealed){
      if (e.code === 'Space' || e.key === 'Enter'){ e.preventDefault(); reviewState.revealed = true; renderReview(); }
      return;
    }
    if (e.key === '1' || e.key === '2' || e.key === '3'){
      e.preventDefault();
      const grade = { '1':'again', '2':'hard', '3':'good' }[e.key];
      const c = state.chunks.find(x => x.id === q[reviewState.index]);
      applyGrade(grade, c);
    }
  });

  /* 朗读：全站代理，任何带 data-speak 的按钮都生效 */
  document.addEventListener('click', e => {
    const b = e.target.closest && e.target.closest('[data-speak]');
    if (!b) return;
    e.preventDefault(); e.stopPropagation();
    speak(b.dataset.speak, b.dataset.lang);
  });
  if (window.speechSynthesis){
    try{
      pickEnVoice();
      window.speechSynthesis.onvoiceschanged = pickEnVoice;
    }catch(err){}
  }
  /* 切后台 / 关窗口前把合并窗口里的最后一次改动补落盘（见 saveState） */
  try{
    document.addEventListener('visibilitychange', () => { if (document.hidden) flushSave(); });
    window.addEventListener('pagehide', flushSave);
    window.addEventListener('beforeunload', flushSave);
  }catch(e){}

  renderAll(); renderPlan(); renderLearn();
  maybeNagBackup();
  /* 初始化完成后再允许自动上云，避免启动时的渲染触发一堆推送 */
  cloudEnabledRuntime = true;
  if (cloudReady() && cloudLoggedIn() && cloudCfg.auto) cloudBootSync();

  let lastDay = todayStr();
  setInterval(() => { const now = todayStr(); if (now !== lastDay){ lastDay = now; renderAll(); } }, 60000);
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
else init();
