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
/* 难度标准：提示词里只给当前等级那一条。三段并列会让模型分心，还白占一百多字 */
const LEVEL_STANDARD = {
  beginner:'词汇量约 1000 词以内，句子短（8–15 词），以一般现在时和一般过去时为主，内容贴近日常生活。',
  intermediate:'词汇量约 2000–3000 词，句子中等长度，可出现复合句和常见时态混合，内容涉及兴趣、学习、工作、观点。',
  advanced:'词汇量 4000 以上，句子结构多样，可出现抽象话题、论证、科普，但每句仍需独立成句，不要写超长从句堆叠。'
};
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
  "alarm rings":"闹钟响","quiet hour":"安静的一小时","best part":"最好的部分","constantly":"不断地","talented":"有天赋","overnight":"一夜之间","consistency":"坚持","steady":"稳定","regret":"后悔","willpower":"意志力","stubborn":"顽固","cumulative":"累积","anticipation":"期待","intertwined":"交织","reinforced":"强化","spontaneous":"自发","intentional":"有意","thrive":"茁壮成长","reclaim":"重新获得","interruptions":"打扰","disconnect":"断开连接","smells of":"有……的气味","says to herself":"自言自语","looking back":"回顾","starts somewhere":"从某处起步","that was the point":"这正是关键","get you there":"让你达到目标","the evidence is mixed":"证据不一","unwritten rules":"潜规则","neural pathways":"神经通路","driven by":"由……驱动","rather than":"而不是","triggered by":"由……触发","set a goal":"设定目标","find an excuse":"找借口","compare myself to":"跟……比较","add up to":"加起来达到","sign up for":"报名参加","care about":"在意","feel like":"想要","remind myself":"提醒自己","brush my teeth":"刷牙","make breakfast":"做早餐","get dressed":"穿好衣服","point to":"指出","warn of":"警告","spark new ideas":"激发新想法","the boundary dissolves":"界限消失","previously unimaginable":"以前难以想象","unfold automatically":"自动展开"
};

/* ========== 词块的三样附加信息：词性 / 多义 / 助记 ==========
   卡片上只写「中文意思」太薄：同一个短语可能是 v.+n.，也可能有第二个常见义，还缺一个记它的钩子。
   这里给内置文章里的每个词块写死一份（共 67 条）：pos 词性、senses 除卡片意思之外的常见义、mnemonic 助记。
   AI 写出来的文章走另一条路：提示词里要求 AI 按格式输出「词块（词性）：意思；意思｜助记：…」，
   粘贴回来时解析成 lesson.chunkNotes，两边查同一份渲染逻辑（见 chunkMeta）。 */
const CHUNK_META = {
  "wake up": { pos: "v. phr.", senses: ["叫醒（别人）"], mnemonic: "wake 醒 + up 起来：眼帘一起就醒" },
  "get up": { pos: "v. phr.", senses: ["（从座位上）站起来"], mnemonic: "get 得到 + up 向上：把身子从床上拿起来" },
  "brush my teeth": { pos: "v.+n.", senses: [], mnemonic: "brush 是刷子：拿刷子把牙刷一遍" },
  "make breakfast": { pos: "v.+n.", senses: [], mnemonic: "make 是做出来：把早餐做出来" },
  "can't help it": { pos: "v. phr.", senses: ["忍不住做某事（can't help doing）"], mnemonic: "help 不只「帮助」，还作「阻止」：拦不住自己" },
  "get dressed": { pos: "v. phr.", senses: [], mnemonic: "get + dressed（穿好的状态）：让自己进入穿着状态" },
  "it takes me": { pos: "phr.", senses: ["需要（It takes time）"], mnemonic: "主语用 It：那件事花掉我的时间" },
  "to-do list": { pos: "n.", senses: [], mnemonic: "to-do 要去做 + list 清单：要做的排成单" },
  "smells of": { pos: "v. phr.", senses: [], mnemonic: "smell of + 东西：身上带着那东西的味儿" },
  "what can i get for you?": { pos: "phr.", senses: [], mnemonic: "店员问：我能给你拿点什么" },
  "can i have": { pos: "phr.", senses: [], mnemonic: "点单万能句：我能有…吗" },
  "i'll take": { pos: "phr.", senses: [], mnemonic: "决定买下 = 把它拿走" },
  "how much is that?": { pos: "phr.", senses: [], mnemonic: "问价：那个有多少（钱）" },
  "pay with her card": { pos: "v. phr.", senses: ["付钱给某人（pay sb）"], mnemonic: "pay with + 工具：用卡来付" },
  "for the first time": { pos: "prep. phr.", senses: [], mnemonic: "for the first time 头一回；at first 是「一开始」" },
  "says to herself": { pos: "v. phr.", senses: ["心里想（say to oneself）"], mnemonic: "对自己说 → 就成了自言自语" },
  "out of breath": { pos: "prep. phr.", senses: [], mnemonic: "out of + 名词：气都跑出去了" },
  "constantly": { pos: "adv.", senses: [], mnemonic: "constant 持续 + ly：一直地" },
  "say no": { pos: "v. phr.", senses: ["拒绝（say no to sth）"], mnemonic: "嘴上说 no 就是拒绝" },
  "a sense of achievement": { pos: "n. phr.", senses: [], mnemonic: "sense 感觉 + achievement 成就" },
  "give up": { pos: "v. phr.", senses: ["对…不再抱希望（give up on sb）"], mnemonic: "give 交出 + up 向上：举手把东西交出去" },
  "keep going": { pos: "v. phr.", senses: [], mnemonic: "keep 保持 + going 走：一直在走" },
  "care about": { pos: "v. phr.", senses: ["照顾、喜欢（care for）"], mnemonic: "care 关心 + about 关于：心上挂着这事" },
  "get used to": { pos: "v. phr.", senses: [], mnemonic: "used 是用惯了：用久了就习惯；别和 used to do（过去常常）混" },
  "sign up for": { pos: "v. phr.", senses: [], mnemonic: "签下名字 = 报名" },
  "feel like": { pos: "v. phr.", senses: ["摸起来像（feel like silk）"], mnemonic: "感觉像 → 心里想要" },
  "remind myself": { pos: "v. phr.", senses: ["使想起（remind sb of sth）"], mnemonic: "re（再）+ mind（心/想）：再想一遍" },
  "regret": { pos: "v. / n.", senses: ["遗憾（regret to say）"], mnemonic: "re + gret：回头想哭" },
  "keep a promise": { pos: "v.+n.", senses: [], mnemonic: "把承诺留住、不撒手" },
  "find an excuse": { pos: "v.+n.", senses: ["原谅（动词，读 /ɪkˈskjuːz/）"], mnemonic: "找出一条理由，把自己摘出去" },
  "talented": { pos: "adj.", senses: [], mnemonic: "talent + ed：带着天赋" },
  "set a goal": { pos: "v.+n.", senses: [], mnemonic: "set 是放定：把目标钉在那" },
  "that was the point": { pos: "phr.", senses: ["得分、观点（point 作名词）"], mnemonic: "point 指尖处：戳中的那一点" },
  "overnight": { pos: "adv. / adj.", senses: ["过夜的（an overnight stay）"], mnemonic: "over 越过 + night 夜：一夜跨过去" },
  "compare myself to": { pos: "v. phr.", senses: [], mnemonic: "compare 并列对照：把自己摆到别人旁边" },
  "starts somewhere": { pos: "phr.", senses: [], mnemonic: "somewhere 总有个起点" },
  "looking back": { pos: "phr.", senses: [], mnemonic: "回头看 = 回顾" },
  "add up to": { pos: "v. phr.", senses: ["（it adds up）说得通"], mnemonic: "一点点加，最后凑成那个数" },
  "consistency": { pos: "n.", senses: [], mnemonic: "consist 组成 + ency：始终如一" },
  "steady": { pos: "adj. / v.", senses: ["使稳住（动词）"], mnemonic: "站得稳（steady）：别晃" },
  "get you there": { pos: "phr.", senses: [], mnemonic: "把你送到那儿 = 帮你到达" },
  "driven by": { pos: "v. phr.", senses: ["驱动力（drive 作名词）"], mnemonic: "被…推着走" },
  "rather than": { pos: "conj.", senses: [], mnemonic: "宁可这个（rather），而不是那个" },
  "unfold automatically": { pos: "v.+adv.", senses: [], mnemonic: "un（打开）+ fold（折）：折的东西自己摊开" },
  "triggered by": { pos: "v. phr.", senses: ["扳机（trigger 作名词）"], mnemonic: "扣扳机：一碰就启动" },
  "intertwined": { pos: "adj.", senses: [], mnemonic: "inter 相互 + twine 缠：两股绳互相缠住" },
  "anticipation": { pos: "n.", senses: [], mnemonic: "ante 在前 + cip 拿：提前把好事拿到心里" },
  "neural pathways": { pos: "n. phr.", senses: [], mnemonic: "神经走出来的小路，走多了就宽" },
  "reinforced": { pos: "adj. / v.", senses: [], mnemonic: "re + in + force 加力：再加一次" },
  "willpower": { pos: "n.", senses: [], mnemonic: "意志 + 力量，合成一个词" },
  "stubborn": { pos: "adj.", senses: [], mnemonic: "犟得像石头，推不动" },
  "cumulative": { pos: "adj.", senses: [], mnemonic: "cumul 堆 + ative：一点点堆起来" },
  "in other words": { pos: "phr.", senses: [], mnemonic: "换一套词再说一遍" },
  "point to": { pos: "v. phr.", senses: ["表明（证据指向某个结论）"], mnemonic: "手指朝那边 = 指向、指出" },
  "reclaim": { pos: "v.", senses: ["取回（reclaim your baggage）"], mnemonic: "re 再 + claim 要：再要回来" },
  "interruptions": { pos: "n.", senses: [], mnemonic: "inter 中间 + rupt 断：从中间掐断" },
  "previously unimaginable": { pos: "adj. phr.", senses: [], mnemonic: "previously 以前 + 想不到的" },
  "warn of": { pos: "v. phr.", senses: [], mnemonic: "warn 提醒 + of 关于某事" },
  "disconnect": { pos: "v. / n.", senses: ["脱节（名词：a disconnect）"], mnemonic: "dis 分开 + connect 连：把线拔掉" },
  "the boundary dissolves": { pos: "phr.", senses: ["解散（议会 dissolve）"], mnemonic: "界线像糖一样化掉" },
  "spark new ideas": { pos: "v.+n.", senses: ["引发（spark a debate）"], mnemonic: "打个火花，想法就点着" },
  "unwritten rules": { pos: "adj.+n.", senses: [], mnemonic: "没写下来的规矩" },
  "spontaneous": { pos: "adj.", senses: [], mnemonic: "自己（spont）就冒出来" },
  "the evidence is mixed": { pos: "phr.", senses: ["感受复杂的（mixed feelings）"], mnemonic: "证据有说有没 → 不一" },
  "thrive": { pos: "v.", senses: [], mnemonic: "像植物一样往旺里长" },
  "intentional": { pos: "adj.", senses: [], mnemonic: "心里有 intent（打算）→ 有意为之" },
  "in the end": { pos: "phr.", senses: [], mnemonic: "走到尽头那一刻" },
};
/* 查词块附加信息的键：小写、压空格、撇号统一，避免 can't / can’t 查不到 */
function metaKey(s){ return String(s == null ? '' : s).toLowerCase().replace(/[’‘`]/g, "'").replace(/\s+/g, ' ').trim(); }
/* 词性推断：内置表里没有的词块（主要是「我的文章」里自动提上来的短语）也尽量给出词性。
   只在高置信度时给：拿不准就留空，卡片上留「＋ 词性」让用户自己填，
   宁可没有也不乱标——「其他义项」那行写错语义比留白更糟。 */
const POS_PREP = new Set(['in','on','at','for','with','by','of','from','about','under','over','after','before','during','between','into','onto','upon','within','without','through','across','against','toward','towards','behind','beyond','despite','except','inside','outside','since','until','till','per','via','off','up','down','out','around','along','near','like','unlike','among','beside','besides','beneath','toward']);
const POS_PARTICLE = new Set(['up','out','off','on','in','down','away','back','through','over','about','around','along','across','apart','aside','forward','together','by','onto','into']);
const POS_AUX = new Set(['be','am','is','are','was','were','been','being','do','does','did','done','have','has','had','having','can','could','will','would','shall','should','may','might','must','ought']);
const POS_DET = new Set(['a','an','the','this','that','these','those','my','your','his','her','its','our','their','some','any','no','all','every','each','another','other','such','what','which','whose','one','two','three','first','last','same','enough','more','most','few','little','many','much']);
const SUFFIX_N = ['tion','sion','ment','ness','ity','ty','ance','ence','ship','hood','ism','ure','age','ery','dom','ance','ology','ence'];
const SUFFIX_ADJ = ['ous','ful','less','able','ible','ive','al','ic','ish','ent','ant','ary','ory','y','like'];
const SUFFIX_V = ['ize','ise','ify','en','ate'];
/* -ly 结尾却不作副词的常见词，别被后缀规则带偏 */
const LY_ADJ = new Set(['friendly','lovely','lonely','early','daily','weekly','monthly','yearly','likely','unlikely','silly','ugly','holy','jolly','deadly','lively','orderly','costly','elderly','only']);

/* ===== 本地就能给的东西：词性、多义、构词助记 =====
   「我的文章」的词块是自动提上来的，内置 67 条 CHUNK_META 覆盖不到，
   所以这里放三张小表兜底。原则和之前一样：拿不准就不写，宁可留白也不乱标。 */

/* 常见词的词性。比看后缀靠谱（light 是 n./adj./v.，suffix 规则只会猜到一个） */
const WORD_POS_BY = {
  'n.': 'time day week year month hour minute moment morning afternoon evening night word thing people person man woman child friend family home house room door window wall floor table chair bed garden office school class teacher student doctor nurse job work money price cost business company market shop store city town country world place road street car bus train plane airport station hotel restaurant food water tea coffee milk bread rice meat fruit apple egg breakfast lunch dinner party holiday birthday wedding music song movie book story news paper phone computer game sport team ball match weather rain snow wind sun moon sky sea river mountain tree flower animal bird dog cat fish light sound voice picture color shape size number question answer problem idea plan chance reason result change help love life death hope fear dream gift letter message photo video name',
  'v.': 'be have do say go come get make take give see know light think want need use find tell ask work seem feel try leave call keep let begin start end help show hear play run move live believe bring happen write read sit stand lose pay meet include continue learn change lead understand watch follow stop create speak spend grow open walk win offer remember consider appear buy wait serve die send build stay fall cut reach kill remain suggest raise pass sell decide return explain develop carry break receive agree support hit produce eat drink sleep drive fly swim sing dance smile cry laugh study teach discuss travel visit wear clean wash cook listen enjoy prefer hate like love want hope wish plan choose prepare arrive relax worry wonder imagine describe improve practice repeat remember forget',
  'adj.': 'good bad big small large long short high low new old young right left true false sure able important easy hard difficult simple complex happy sad angry tired hungry thirsty busy free full empty quiet loud clean dirty safe dangerous early late strong weak rich poor cheap expensive beautiful ugly nice kind friendly polite rude careful careless clear dark bright light heavy fast slow quick warm cold hot cool dry wet fresh modern common special usual different same deep shallow wide narrow thick thin soft smart clever funny serious honest lazy brave calm proud lucky ready possible necessary useful helpful terrible wonderful excellent perfect',
  'adv.': 'very really quite too also just already still always never often sometimes usually almost enough again soon early late well fast hard quickly slowly easily finally actually probably maybe perhaps certainly exactly nearly hardly together'
};
const WORD_POS = (function(){
  const out = {};
  Object.keys(WORD_POS_BY).forEach(p => {
    WORD_POS_BY[p].split(/\s+/).filter(Boolean).forEach(w => {
      if (!out[w]) out[w] = [p];
      else if (out[w].indexOf(p) < 0) out[w].push(p);
    });
  });
  return out;
})();
function wordPosOf(word){
  const arr = WORD_POS[String(word == null ? '' : word).toLowerCase()];
  return arr ? arr.join(' / ') : '';
}

/* 真正「一词多义」的常见词。只收第二个意思跟第一个明显不同的，
   同一词性的近义改写不算（那会让「其他义项」变成噪音）。 */
const WORD_SENSES = {
  light: '光；轻的；点燃', run: '跑；经营；流动', point: '要点；指向；分数', mean: '意思是；吝啬的；平均值',
  fair: '公平的；集市；相当好', book: '书；预订', right: '右边；正确的；权利', left: '左边；剩下的',
  bank: '银行；河岸', match: '比赛；火柴；相配', spring: '春天；泉水；弹簧', fall: '落下；秋天',
  change: '改变；零钱', order: '顺序；点菜；命令', fine: '好的；罚款；细的', last: '最后的；持续',
  kind: '种类；友善的', board: '板子；董事会；登机', check: '检查；账单；支票', watch: '手表；观看',
  work: '工作；起作用', study: '学习；书房', head: '头；领导；朝向', hand: '手；递交',
  face: '脸；面对', back: '后面；背部；回来', top: '顶部；最上面的', bottom: '底部；最下面的',
  own: '自己的；拥有', state: '状态；陈述；州', rest: '休息；其余', sound: '声音；听起来；健全的',
  matter: '事情；要紧', mind: '头脑；介意', power: '力量；电力', charge: '收费；充电；指控',
  figure: '数字；人物；明白', issue: '问题；发行', company: '公司；陪伴', present: '现在；礼物；出席的',
  still: '仍然；静止的', even: '甚至；平的；偶数', close: '关闭；靠近的', live: '居住；现场的',
  lead: '带领；铅', race: '比赛；种族', train: '训练；火车', plan: '计划；平面图',
  case: '情况；箱子；案件', term: '学期；术语；条款', smart: '聪明的；时髦的', sharp: '锋利的；急剧的',
  odd: '奇怪的；单数的', firm: '公司；坚定的', scale: '规模；天平；鳞片', sense: '感觉；意义',
  touch: '触摸；触动', beat: '打；节拍；打败', stick: '棍子；粘', drop: '落下；一滴',
  plant: '植物；工厂；种植', plain: '平原；朴素的；清楚的', rock: '岩石；摇滚', wave: '波浪；挥手',
  space: '空间；太空', key: '钥匙；关键的', note: '笔记；音符；注意', type: '类型；打字',
  interest: '兴趣；利息', capital: '首都；资本', court: '法庭；球场', date: '日期；约会', class: '班级；阶级',
  party: '聚会；政党', season: '季节；调味', trip: '旅行；绊倒', count: '数数；重要',
  cost: '花费；代价', drive: '开车；驱使', fail: '失败；没通过', fix: '修理；确定的',
  ground: '地面；理由', grow: '生长；变得', hold: '拿着；举行', keep: '保持；饲养',
  land: '土地；降落', lift: '举起；电梯', mark: '记号；分数', miss: '想念；错过',
  pack: '打包；一群', pick: '挑选；采摘', post: '邮寄；职位', press: '按；媒体',
  raise: '举起；提高；筹集', rate: '比率；评价', ring: '戒指；响铃', save: '拯救；节省',
  set: '设置；一套', sign: '签名；迹象', store: '商店；储存',
  strike: '罢工；打击', taste: '味道；品味', tie: '领带；系', track: '轨道；追踪',
  treat: '对待；招待', trust: '信任；信托', turn: '转动；轮到',
  weigh: '称重；权衡', well: '好；井', will: '将要；意愿', yard: '院子；码'
};

/* 构词法助记：拆前后缀 + 词干义，拼成「un-（不）+ happy（快乐）→ 不快乐」这种能记住的一句。
   拆不出东西就不生成——编出来的助记比没有更糟。 */
const PREFIX_META = {
  un: '不', re: '再、重新', dis: '不、分开', pre: '在前', mis: '错误地', over: '在上方、越过、过度', under: '不足、在下面',
  inter: '在…之间', sub: '在下面', trans: '穿过', anti: '反对', non: '非', semi: '半', multi: '多',
  micro: '微', auto: '自己', de: '向下、去除', en: '使…', ex: '向外、前任', im: '不／向里', in: '不／向里',
  out: '超过、向外', bi: '二', tri: '三', pro: '向前、支持', post: '之后', mid: '中间', extra: '额外',
  super: '超', ultra: '极', fore: '预先', self: '自我', well: '好好地',
  ab: '离开', ad: '朝向', circum: '环绕', counter: '反对、对着', hyper: '过度', hypo: '不足、在下',
  il: '不', ir: '不', macro: '大', mal: '坏', meta: '超越、变化', mono: '单', neo: '新',
  omni: '全部', para: '旁边、防护', per: '贯穿', poly: '多', quad: '四', quasi: '类似',
  retro: '向后', tele: '远', uni: '单', vice: '副', cyber: '网络', thermo: '热', dia: '穿过'
};
const SUFFIX_META = {
  tion: '名词：动作或结果', sion: '名词：动作或结果', ment: '名词：结果或状态', ness: '名词：性质',
  ity: '名词：性质', ance: '名词：状态', ence: '名词：状态', ship: '名词：身份或关系', hood: '名词：状态',
  ism: '名词：主义或行为', ure: '名词：结果', age: '名词：集合或行为', ery: '名词：集合或场所',
  dom: '名词：领域或状态', ful: '形容词：充满…的', less: '形容词：没有…的', able: '形容词：能…的',
  ible: '形容词：能…的', ive: '形容词：有…性质的', ous: '形容词：多…的', al: '形容词：…的',
  ic: '形容词：…的', ish: '形容词：略…的', ent: '形容词：…的', ant: '形容词：…的', ary: '形容词：…的',
  like: '形容词：像…的', ize: '动词：使…化', ise: '动词：使…化', ify: '动词：使…', ate: '动词：使…',
  ly: '副词：…地', er: '名词：…的人或物', or: '名词：…的人', ist: '名词：…者',
  ology: '名词：…学', logy: '名词：…学', graphy: '名词：…写法、…记录', phobia: '名词：恐…症',
  cide: '动词：杀…', ward: '副词：向…方向', wards: '副词：向…方向', wise: '副词：在…方面',
  some: '形容词：有…倾向的', proof: '形容词：防…的', free: '形容词：无…的', en: '动词：使…',
  ious: '形容词：多…的', eous: '形容词：有…性质的'
};
/* 常见词根：拆不出前后缀时长单词也能给出一句结构提示（inspect → spect 看）。
   只做提示用，认错词根也就是提示不准，不会写进任何数据。 */
const ROOT_META = {
  spect: '看', spic: '看', vis: '看', vid: '看', dict: '说', ject: '扔', tract: '拉',
  scrib: '写', script: '写', cred: '相信', duct: '引导', duc: '引导', fer: '带来',
  form: '形状', graph: '写、画', log: '说、学科', mit: '送', miss: '送', mov: '动',
  mot: '动', pel: '推', pend: '挂', phon: '声音', press: '压', rupt: '破',
  sens: '感觉', sent: '感觉', sequ: '跟随', serv: '保存、服务', sist: '站', solv: '松开',
  sta: '站', stru: '建造', tain: '握持', tend: '伸展', vac: '空', ven: '来',
  vert: '转', vers: '转', voc: '叫', volv: '卷、转', cept: '拿', cid: '切', cis: '切',
  clud: '关', clus: '关', gress: '走', grad: '走、步', loc: '地方', mand: '命令',
  nov: '新', plic: '折', prim: '第一', temp: '时间', terr: '土地', val: '价值', poss: '能'
};
/* 在词干里找词根：优先长的（mand 比 man 更准），词根不能占满整个词干 */
function findRoot(stem){
  if (!stem || stem.length < 3) return null;
  const keys = Object.keys(ROOT_META).sort((a, b) => b.length - a.length);
  for (const r of keys){
    /* 三字母词根只在词干开头/结尾才算，否则 human 会被认成 man（手） */
    if (r.length <= 3){
      if (stem !== r && !stem.startsWith(r) && !stem.endsWith(r)) continue;
    } else if (stem.indexOf(r) < 0) continue;
    return { root: r, gloss: ROOT_META[r] };
  }
  return null;
}
/* ========== 离线词典（可选）：data/dict.json，由 tools/build-dict.js 从 ECDICT 生成 ==========
   没有这个文件也能正常用，只是少一份中文释义来源；取不到就静默跳过。 */
let OFFLINE_DICT = null;
const DICT_POS_RE = /^\s*(?:n|v|vt|vi|a|adj|adv|prep|conj|pron|num|art|int|abbr|aux|phr)\.\s*/i;
const DICT_SPLIT = /[；;，,、]/;
function dictEntry(chunk){
  if (!OFFLINE_DICT || !chunk) return '';
  const k = String(chunk).toLowerCase().replace(/\s+/g, ' ').trim();
  return (k && OFFLINE_DICT[k]) || '';
}
/* 一条释义的来源不一：内置表写「罩；风帽；面罩」，ECDICT 生成的是「n. 罩, 风帽 | v. 罩上」。
   | 分块（词性），分号分义项；同块里的逗号项是同义词，不再拆开。 */
function dictBlocks(chunk){
  const e = dictEntry(chunk);
  return e ? e.split(/[|\n]+/).map(s => s.trim()).filter(Boolean) : [];
}
function dictSplitItems(text){
  return String(text).replace(DICT_POS_RE, '').split(DICT_SPLIT).map(s => s.trim()).filter(Boolean);
}
function dictParts(chunk){
  const blocks = dictBlocks(chunk);
  return blocks.length ? dictSplitItems(blocks[0]) : [];
}
function dictGloss(chunk){
  const parts = dictParts(chunk);
  return parts.length ? parts[0] : '';
}
function dictSenses(chunk){
  const blocks = dictBlocks(chunk);
  const out = [];
  for (const b of blocks.slice(1)){
    const pos = (b.match(DICT_POS_RE) || [''])[0].trim();
    const first = dictSplitItems(b)[0];
    if (first) out.push(pos ? pos + ' ' + first : first);
  }
  /* 只有一块时，靠分号显式列出的义项才算「其他义项」（例：罩；风帽；面罩） */
  if (!out.length && blocks.length === 1) out.push(...dictParts(chunk).slice(1));
  return out.slice(0, 3);
}
/* 不规则词形表（data/lemma.json）：went → go、children → child，规则推不出来的那批 */
let LEMMA = null;
function lemmaOf(word){
  if (!LEMMA || !word) return '';
  return LEMMA[String(word).toLowerCase()] || '';
}
/* 双击打开（file://）时浏览器禁止 fetch 本地文件，离线词典必然拿不到：
   页面上留一条可关闭的说明（关过就记住），免得让人以为功能坏了。 */
const FILE_TIP_KEY = 'ecChunksFileTipOff';
function offlineDataBlocked(){
  return typeof location !== 'undefined' && !!location && location.protocol === 'file:';
}
function showOfflineTip(){
  const tip = document.getElementById('fileTip');
  if (!tip) return;
  let off = false;
  try {
    off = localStorage.getItem(FILE_TIP_KEY) === '1';
  } catch (e) {
    /* 隐私模式下 localStorage 可能直接抛，那就每次照常显示 */
  }
  if (off) return;
  tip.hidden = false;
  const btn = document.getElementById('btnFileTipClose');
  if (!btn) return;
  btn.onclick = () => {
    tip.hidden = true;
    try {
      localStorage.setItem(FILE_TIP_KEY, '1');
    } catch (e) {
      /* 存不下就算了，至少这次点了会收起 */
    }
  };
}
async function loadOfflineData(){
  /* file:// 下 fetch 本地 json 必定失败，先给提示、省掉两次必输的请求 */
  if (offlineDataBlocked()){
    showOfflineTip();
    return;
  }
  const grab = name => fetch(name).then(res => (res.ok ? res.json() : null)).catch(() => null);
  const [d, l] = await Promise.all([grab('data/dict.json'), grab('data/lemma.json')]);
  let loaded = false;
  if (d && d.words){ OFFLINE_DICT = d.words; loaded = true; }
  if (l && l.words){ LEMMA = l.words; loaded = true; }
  if (!loaded) return;
  try {
    renderAll();
    renderPlan();
    renderLearn();
  } catch (e) {
    /* 直接打开 html 时可能还没初始化完，取不到就按没有数据算 */
  }
}

/* 词干查义：多义表 → 词库 → 内置词块表里的同名单词条目 */
/* 内置三张表（多义 / 词块表 / 词块补充）：构词助记只信这三张，别把大词典搬进来
   —— 词典一变大，re+mote（微尘）这种没人会想到的拆法也会凑出助记。 */
function builtinGloss(word){
  const w = String(word == null ? '' : word).toLowerCase();
  if (!w) return '';
  if (WORD_SENSES[w]) return WORD_SENSES[w].split('；')[0];
  if (CHUNK_GLOSSARY[w]) return CHUNK_GLOSSARY[w];
  const meta = CHUNK_META[w];
  return meta && meta.senses && meta.senses.length ? meta.senses[0] : '';
}
function glossOfWord(word){
  const w = String(word == null ? '' : word).toLowerCase();
  const own = builtinGloss(w);
  if (own) return own;
  const direct = dictGloss(w);
  if (direct) return direct;
  /* went → go：不规则变形先查回原形，再查内置表与词典各一次 */
  const base = lemmaOf(w);
  if (!base || base === w) return '';
  return builtinGloss(base) || dictGloss(base);
}
/* 屈折变化不算构词：reinforced 只是 reinforce 的过去式，把 -ed 当后缀讲等于教错。
   先把它剥回原形（原形要真在内置表或词典里查得到才算数，否则说明这不是屈折），
   助记按原形给，末尾标一句它是谁的变化形式。 */
function inflectBase(w){
  if (w.length < 7) return '';
  const tries = [];
  if (/ied$/.test(w)) tries.push(w.slice(0, -3) + 'y');
  if (/ies$/.test(w)) tries.push(w.slice(0, -3) + 'y');
  if (/ing$/.test(w)){ tries.push(w.slice(0, -3)); tries.push(w.slice(0, -3) + 'e'); }
  if (/ed$/.test(w)){ tries.push(w.slice(0, -2)); tries.push(w.slice(0, -1)); }
  if (/(?:[^s])es$/.test(w)) tries.push(w.slice(0, -2));
  if (/(?:[^su])s$/.test(w)) tries.push(w.slice(0, -1));
  for (const t of tries){
    if (t.length >= 5 && (builtinGloss(t) || dictGloss(t))) return t;
  }
  return '';
}
/* 这些字母组合在别的词中间也常见：in 不是 intentional 的前缀、de 不是 decide 的前缀。
   同时带后缀时，除非认得出词根（invisible 的 vis），否则宁可只讲后半截。 */
const WEAK_PREFIX = new Set(['de', 'en', 'ex', 'in', 'im', 'il', 'ir', 'per', 'pro', 'ad', 'ab', 'di', 'an']);
function buildMorphMnemonic(word, gloss){
  const w = String(word == null ? '' : word).toLowerCase().replace(/[^a-z]/g, '');
  if (w.length < 5) return '';
  const infl = inflectBase(w);
  if (infl){
    const note = buildMorphMnemonic(infl, '');
    return note ? note + '（' + w + ' 是 ' + infl + ' 的变化形式）' : '';
  }
  let pre = Object.keys(PREFIX_META).filter(p => w.startsWith(p) && w.length > p.length + 2).sort((a, b) => b.length - a.length)[0] || '';
  const suf = Object.keys(SUFFIX_META).filter(s => w.endsWith(s) && w.length > s.length + 2).sort((a, b) => b.length - a.length)[0] || '';
  if (!pre && !suf) return '';
  const stem = w.slice(pre ? pre.length : 0, suf ? w.length - suf.length : w.length);
  if (stem.length < 3) return '';
  /* 只有前后缀的时代，conversation / inspector 这类纯词根词一条助记都出不来；认到词根也算有了抓手 */
  const rootHit = findRoot(stem);
  if (!pre && !suf && !rootHit) return '';
  /* 弱前缀 + 后缀：这个前缀多半不是它的前缀，除非认到词根，否则只讲后半截（intentional 就别硬拆） */
  if (pre && suf && WEAK_PREFIX.has(pre) && !rootHit) pre = '';
  /* happi-ness / easi-ly 去后缀后 y 变 i；organiz-ed 少了结尾的 e —— 查义与显示都要还原 */
  const stemAlts = [];
  if (stem.endsWith('i')) stemAlts.push(stem.slice(0, -1) + 'y');
  /* 只给「去 e」的动词补回 e（believ → believe）：随意补会补出 posse（一队）这种真词 */
  if (/[vz]$/.test(stem)) stemAlts.push(stem + 'e');
  let stemShow = stem;
  let stemGloss = builtinGloss(stem) || '';
  if (!stemGloss){
    for (const alt of stemAlts){
      const g = builtinGloss(alt) || (alt.length >= 5 ? dictGloss(alt) : '');
      if (g){ stemGloss = g; stemShow = alt; break; }
    }
  }
  /* 词典的词干：没后缀时至少 5 个字母才认（否则 remote 会被拆成 re + mote＝微尘）；
     有后缀时 4 个字母也认，不然 hopeless / joyful 这些常用词干全查不到 */
  if (!stemGloss && (suf || stem.length >= 5)) stemGloss = dictGloss(stem) || '';
  /* 词干既没意思、也认不出词根，就别硬凑：anticipation 会被拆成 anti- + cipation、conversation 拆成 co- + 共同 */
  if (!stemGloss && !rootHit) return '';
  /* 只有当前缀、没有后缀时，词干太短多半是误拆（remote 拆成 re + mote） */
  if (pre && !suf && !stemGloss && stem.length < 5) return '';
  const bits = [];
  if (pre) bits.push(pre + '-（' + PREFIX_META[pre] + '）');
  if (rootHit) bits.push(rootHit.root + '（' + rootHit.gloss + '）');
  if (stemGloss && (!rootHit || rootHit.root !== stemShow)) bits.push(stemShow + '（' + stemGloss + '）');
  if (!bits.length) bits.push(stemShow);
  if (suf) bits.push('-' + suf + '（' + SUFFIX_META[suf] + '）');
  return bits.join(' + ') + (gloss ? ' → ' + gloss : '');
}

/* 短语里不该参与拼义的小词：它们的意思在短语里几乎从不生效（in the end 的 in / the） */
const PHRASE_SKIP = new Set(['a', 'an', 'the', 'to', 'of', 'in', 'on', 'at', 'for', 'with', 'by', 'from', 'up', 'out', 'off', 'and', 'or', 'but', 'so', 'that', 'this', 'these', 'those', 'my', 'your', 'his', 'her', 'its', 'our', 'their', 'be', 'is', 'are', 'was', 'were', 'a', 'an']);
/* 「the morning light」这种带冠词/介词的长短语，整串查不到意思时退回它的 2–3 词子串，
   比如 "morning light" 在内置表里 → 卡片上就不会只剩一个空意思。
   子串必须正好是「整串剔掉虚词后的骨架」，否则会张冠李戴：
   like to get 曾经因为子串 like to 被判成「差点儿就要」，run for fifteen 因为 run for 被判成「竞选」，
   to-do list 因为 to do 被判成「要做某事」。带冠词介词的写法仍然认（剔掉虚词后骨架相同）。 */
function subChunkGloss(chunk){
  const words = chunkStrictKey(chunk).split(' ').filter(Boolean);
  if (words.length < 2) return '';
  const coreWords = words.filter(w => !PHRASE_SKIP.has(w));
  if (!coreWords.length) return '';
  for (let n = Math.min(3, words.length - 1); n >= 2; n--){
    for (let i = 0; i + n <= words.length; i++){
      const sub = words.slice(i, i + n);
      const subCore = sub.filter(w => !PHRASE_SKIP.has(w));
      /* 子串只留一个实词的不算：like to → 只有 like、run for → 只有 run、to do → 只有 do，
         它们跟整串意思不是一回事（曾经被当成「差点儿就要」「竞选」「要做某事」） */
      if (subCore.length < 2) continue;
      /* 只许丢开头的实词（say good morning → good morning 还行），末尾实词不许丢：
         like to get 丢了 get、run for fifteen 丢了 fifteen、to-do list 丢了 list，全都张冠李戴 */
      if (subCore.join(' ') !== coreWords.slice(coreWords.length - subCore.length).join(' ')) continue;
      const key = sub.join(' ');
      const g = lookupGloss(key);
      if (g) return g;
      const meta = CHUNK_META[key];
      if (meta && meta.senses && meta.senses[0]) return meta.senses[0];
    }
  }
  return '';
}

/* 数字 + 单位这类短语，中文是机械可算的：twenty minutes → 二十分钟、three days → 三天。
   以前只能等用户点「译」或者自己填，现在直接在提取时就带上意思和 num.+n. 词性。 */
const NUM_WORD = {
  one:1, two:2, three:3, four:4, five:5, six:6, seven:7, eight:8, nine:9, ten:10,
  eleven:11, twelve:12, thirteen:13, fourteen:14, fifteen:15, sixteen:16, seventeen:17, eighteen:18, nineteen:19,
  twenty:20, thirty:30, forty:40, fifty:50, sixty:60, seventy:70, eighty:80, ninety:90,
  hundred:100
};
const NUM_UNIT_ZH = {
  second:'秒', seconds:'秒', minute:'分钟', minutes:'分钟', hour:'小时', hours:'小时',
  day:'天', days:'天', week:'周', weeks:'周', month:'个月', months:'个月', year:'年', years:'年',
  time:'次', times:'次', page:'页', pages:'页', word:'个词', words:'个词', step:'步', steps:'步',
  cup:'杯', cups:'杯', bowl:'碗', bowls:'碗', mile:'英里', miles:'英里', kilometer:'公里', kilometers:'公里',
  meter:'米', meters:'米', dollar:'美元', dollars:'美元', yuan:'元', percent:'%（百分之）'
};
const ZH_DIGIT = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
function zhNumber(n){
  if (!(n > 0)) return '';
  if (n < 10) return ZH_DIGIT[n];
  if (n === 10) return '十';
  if (n < 20) return '十' + ZH_DIGIT[n - 10];
  if (n < 100){
    const t = Math.floor(n / 10), r = n % 10;
    return ZH_DIGIT[t] + '十' + (r ? ZH_DIGIT[r] : '');
  }
  if (n < 1000){
    const h = Math.floor(n / 100), r = n % 100;
    return ZH_DIGIT[h] + '百' + (r ? (r < 10 ? '零' : '') + zhNumber(r) : '');
  }
  return '';
}
/* twenty minutes / three days：首部全是数字词、末词是量词才算，别的一律返回空 */
function numPhraseGloss(chunk){
  const words = chunkStrictKey(chunk).split(' ').filter(Boolean);
  /* seven o'clock：数字 + 点钟，也是机械可算的 */
  if (words.length === 2 && words[1] === "o'clock"){
    const h = NUM_WORD[words[0]];
    return h && h >= 1 && h <= 12 ? zhNumber(h) + '点' : '';
  }
  if (words.length < 2 || words.length > 3) return '';
  const unit = NUM_UNIT_ZH[words[words.length - 1]];
  if (!unit) return '';
  let total = 0, seen = 0;
  for (const w of words.slice(0, -1)){
    const v = NUM_WORD[w];
    if (!v) return '';
    total += v; seen++;
  }
  if (!seen || total < 1 || total > 999) return '';
  return zhNumber(total) + unit;
}

/* 词块筛选：2–3 词滑窗会提出「dressed and pack」「takes me twenty」这种碎片，
   卡片上堆一堆没记忆价值的条目反而让人不想看。
   有中文意思的算真语块；没意思的按词组形状判断，明显是碎片的直接丢。
   strict 筛完不足 5 条时再用 loose 规则补，短文章不至于一条都没有。 */
const CHUNK_LINKERS = new Set(['and', 'or', 'but', 'nor', 'so', 'yet']);
const CHUNK_WEAK_MID = new Set(['this', 'that', 'these', 'those', 'my', 'your', 'his', 'her', 'its', 'our', 'their', 'me', 'you', 'him', 'us', 'them', 'some', 'any', 'much', 'many', 'more', 'most', 'such', 'very', 'just', 'also']);
/* 缩写形式（it's / I'll / didn't）自己不成语块，出现在片里就是被切断的半句 */
const CHUNK_CONTRACT = /^(?:i'm|i'll|i've|i'd|you're|you'll|you've|you'd|he's|he'll|she's|she'll|it's|it'll|we're|we'll|we've|we'd|they're|they'll|they've|that's|there's|what's|let's|who's|here's|isn't|aren't|wasn't|weren't|don't|doesn't|didn't|can't|couldn't|won't|wouldn't|shouldn't|haven't|hasn't|hadn't|mustn't)$/;
/* 常见动词原型：用来判断「主语 + 谓语」被切成两词的情况（Sarah walks、fingers hurt） */
const VERB_BASE = new Set(('be am is are was were been being have has had do does did say get make go know take see come think look want give use find tell ask work seem feel try leave call need become mean keep let begin help talk turn start show hear play run move live believe hold bring happen write provide sit stand lose pay meet include continue set learn change lead understand watch follow stop create speak read allow add spend grow open walk win offer remember love consider appear buy wait serve die send expect build stay fall cut reach kill remain suggest raise pass sell require report decide pull explain hope develop carry break receive agree support hit produce eat cover catch draw choose cause point listen realize plan notice drive wear put drink sing sleep wake wash dress enjoy check brush pack arrive return answer visit teach study finish prepare cook clean relax travel forget regret worry hurt improve practice join invite smell taste order smile laugh cry shout argue complain refuse accept promise warn describe mention discuss compare avoid prevent reduce increase achieve manage deserve prefer hate like wish sound complete end close enter climb drop throw push cross guide fill count measure test').split(' '));
const IRREGULAR_VERB = new Set(('felt made kept ran said told took gave went came saw knew thought brought found got had did was were been began broke chose drove ate drank wrote spoke stood held lost paid met sent spent built left led won wore slept woke became grew fell read heard').split(' '));
function isNumberishWord(w){ return !!(NUM_WORD[w] || NUM_UNIT_ZH[w]); }
function isVerbForm(w){
  if (!w) return false;
  if (VERB_BASE.has(w) || IRREGULAR_VERB.has(w)) return true;
  const cand = [];
  if (/[^s]s$/.test(w)) cand.push(w.slice(0, -1));
  if (/(ss|sh|ch|x|z)es$/.test(w)) cand.push(w.slice(0, -2));
  if (/ies$/.test(w)) cand.push(w.slice(0, -3) + 'y');
  if (/ed$/.test(w)){ cand.push(w.slice(0, -2)); cand.push(w.slice(0, -1)); }
  if (/ing$/.test(w)){ cand.push(w.slice(0, -3)); cand.push(w.slice(0, -3) + 'e'); cand.push(w.slice(0, -4)); }
  return cand.some(c => c.length >= 2 && (VERB_BASE.has(c) || IRREGULAR_VERB.has(c)));
}
/* 只能是动词变形的词形（-s/-ed/-ing / 不规则过去式）：这类词做末词时，片多半是「主语 + 谓语」；
   原型动词做末词则常见于名词短语（remote work / software engineer），不能一刀切 */
function isVerbInflection(w){
  if (!w) return false;
  if (IRREGULAR_VERB.has(w)) return true;
  if (/(ss|sh|ch|x|z)es$/.test(w) || /[^s]s$/.test(w)) return true;
  if (/ed$/.test(w)) return true;
  if (/ing$/.test(w) && w.length > 4) return true;
  return false;
}
function chunkMeaningOf(chunk){ return lookupGloss(chunk) || subChunkGloss(chunk) || numPhraseGloss(chunk); }
/* meaning 非空 = 查得到中文，一定是值得记的语块。
   loose=true 时只保留「明显是碎片」的判断（并列连词、缺单位词的数字），用于补足条数。 */
function chunkWorth(chunk, meaning, count, loose){
  const words = chunkStrictKey(chunk).split(' ').filter(Boolean);
  if (!words.length) return false;
  if (meaning) return true;
  if (words.some(w => CHUNK_LINKERS.has(w))) return false;
  if (words.some(w => isNumberishWord(w))) return false;
  if (words.length >= 3){
    if (loose) return true;
    return count >= 2;
  }
  /* 末词是动词变形、首词不是动词 → 这是「主语 + 谓语」被切成两词（Sarah walks / routine helps） */
  if (isVerbInflection(words[words.length - 1]) && !isVerbForm(words[0])) return false;
  if (CHUNK_CONTRACT.test(words[0]) || CHUNK_CONTRACT.test(words[words.length - 1])) return false;
  const [a, b] = words;
  if (loose) return !(POS_DET.has(a) && POS_DET.has(b));
  if (CHUNK_WEAK_MID.has(a) || CHUNK_WEAK_MID.has(b)) return false;
  if (POS_PREP.has(a) || POS_AUX.has(a) || POS_DET.has(a) || POS_PARTICLE.has(a)) return false;
  if (POS_PREP.has(b) || POS_AUX.has(b) || POS_DET.has(b)) return false;
  return true;
}

/* 短语助记：先看整条有没有现成释义（give up 就是放弃），
   整条没有才退回拆词，而且拆词只摆实词、每个词的意思要短到能信。
   以前的教训：拆词拆出来的义常是短语里根本不用的那个义——care about 摆成「小心 + 在...周围」、
   give up 摆成「弹性 + 向上的」，比空着更容易记错。 */
/* 一条释义里能当「词义线索」的部分：剥掉词性前缀，只取第一项 */
function phraseGlossHead(text){
  const bare = String(text == null ? '' : text).replace(DICT_POS_RE, '');
  const first = bare.split(DICT_SPLIT)[0].trim();
  /* 词典条目常带「试图/努力(做)...」这种尾巴，摆在助记里难看，去掉结尾的省略号和句点 */
  return first.replace(/[…\.．。]+$/, '').trim();
}
/* 三单 -s / -es 通常不在词形表里（feels 查不到 feel），可短语里要按原形取义才对：
   feels 直查会落到 felt（毛毯），原形 feel 才是「感觉」 */
function phraseBaseOf(w){
  const cands = [];
  if (/(ss|sh|ch|x|z|o)es$/.test(w)) cands.push(w.slice(0, -2));
  if (/ies$/.test(w)) cands.push(w.slice(0, -3) + 'y');
  if (/[^s]s$/.test(w)) cands.push(w.slice(0, -1));
  /* 规则优先于词形表：data/lemma.json 里 feels 被收成 felt（毛毯），规则给的 feel 才是「感觉」 */
  for (const c of cands){
    if (c.length >= 4 && (builtinGloss(c) || dictGloss(c))) return c;
  }
  const l = lemmaOf(w);
  return l && l !== w && l.length >= 3 ? l : '';
}
function buildPhraseMnemonic(chunk){
  const key = chunkStrictKey(chunk);
  const words = key.split(' ').filter(Boolean);
  if (words.length < 2 || words.length > 3) return '';
  /* 整条先查：词典里的短语条目（coffee shop = 咖啡店）、数字量词（twenty minutes = 二十分钟）
     都比拆词准得多，拆词只作为「整条查不到」时的退路 */
  const whole = phraseGlossHead(chunkMeaningOf(key));
  const bits = [];
  let solid = 0;
  for (const w of words){
    /* 虚词先跳过再查词：词典一上线，in / the / up / off 全都有释义，
       以前靠「查不到」挡住的噪音会全冒出来（in the end → in（在...期间）+ the（那）+ end（结束）） */
    if (PHRASE_SKIP.has(w)) continue;
    /* 屈折形按原形取义：felt 在词典里是「毛毯」，feel 才是「感觉」——短语里出现的一定是后者 */
    const base = phraseBaseOf(w);
    const g = (base && base !== w ? phraseGlossHead(builtinGloss(base)) || phraseGlossHead(dictGloss(base)) : '') || phraseGlossHead(glossOfWord(w));
    /* 释义太长的多半是短语里用不到的生僻义（minutes → 会议记录），宁可只摆词 */
    if (g && g.length <= 3){ bits.push(w + '（' + g + '）'); solid++; }
    else bits.push(w);
  }
  const split = solid >= 2 ? bits.join(' + ') : '';
  /* 整条有现成释义就直接用它：拆词只是退路，两套一起摆反而啰嗦（twenty minutes 只要「二十分钟」） */
  if (whole) return whole.length <= 60 ? whole : whole.slice(0, 60);
  if (!split) return '';
  return split.length <= 60 ? split : '';
}

/* 没有 AI 回答、内置表也查不到时，本地能给的三样东西 */
function autoChunkNote(chunk){
  const words = chunkStrictKey(chunk).split(' ').filter(Boolean);
  const single = words.length === 1 ? words[0] : '';
  const pos = single ? (wordPosOf(single) || inferPos(chunk)) : inferPos(chunk);
  const own = single && WORD_SENSES[single] ? WORD_SENSES[single].split('；').slice(1).filter(Boolean) : [];
  /* 内置多义表没有的词，用离线词典的其余义项兜底 */
  const senses = own.length ? own : (single ? dictSenses(single) : []);
  const mnemonic = single ? buildMorphMnemonic(single, '') : buildPhraseMnemonic(chunk);
  return { pos, inferred: !!pos, senses: senses.slice(0, 3), mnemonic };
}

/* 一个词块大概是什么词性。判不出来返回空串（不猜）。 */
function inferPos(chunk){
  const words = metaKey(chunk).replace(/[^a-z'\-\s]/g, ' ').split(/\s+/).filter(Boolean);
  if (!words.length) return '';
  if (words.length === 1){
    const w = words[0];
    if (NUM_WORD[w]) return 'num.';
    if (w.length < 3) return '';
    /* 表里有的常见词直接查表：light 是 n./v./adj.，后缀规则只猜得到一个 */
    const known = wordPosOf(w);
    if (known) return known;
    if (w.endsWith('ly')) return LY_ADJ.has(w) ? 'adj.' : 'adv.';
    if (/[^aeiou]ing$/.test(w)) return 'v.ing';
    if (/[^e]ed$/.test(w) || /i?ed$/.test(w)) return 'v.ed';
    if (SUFFIX_V.some(s => w.endsWith(s) && w.length > s.length + 2)) return 'v.';
    if (SUFFIX_N.some(s => w.endsWith(s) && w.length > s.length + 2)) return 'n.';
    if (SUFFIX_ADJ.some(s => w.endsWith(s) && w.length > s.length + 2)) return 'adj.';
    if (/(ss|sh|ch|x|z)es$/.test(w) || /[^s]s$/.test(w)) return 'n.';
    return '';
  }
  const first = words[0], last = words[words.length - 1];
  /* twenty minutes 是 num.+n.，不是 n. phr.（POS_DET 里有 one/two/…，会先命中） */
  if (NUM_WORD[first] && NUM_UNIT_ZH[last]) return 'num.+n.';
  if (first === 'to' && words.length > 1) return 'to do';
  if (POS_PREP.has(first) && !POS_AUX.has(first)) return 'prep. phr.';
  if (POS_AUX.has(first)) return 'v. phr.';
  if (POS_DET.has(first)) return 'n. phr.';
  if (POS_PARTICLE.has(last) || POS_PREP.has(last)) return 'v. phr.';
  if (SUFFIX_ADJ.some(s => first.endsWith(s) && first.length > s.length + 2)) return 'adj.+n.';
  if (SUFFIX_N.some(s => last.endsWith(s) && last.length > s.length + 2)) return 'v.+n.';
  if (/[^aeiou]ing$/.test(last)) return 'v.';
  return 'phr.';
}

/* 词块卡片要显示的三样东西：文章自带的 chunkNotes 优先（AI 给的更贴合这篇），其次是内置表，
   两样都没有就按词形推断一个词性；多义和助记没法凭空生成，卡片上留「＋」让用户自己补 */
function chunkMeta(chunk, lesson){
  const key = metaKey(chunk);
  const notes = lesson && lesson.chunkNotes ? lesson.chunkNotes[key] : null;
  const base = notes || CHUNK_META[key] || null;
  /* 本地兜底：词性查表/按词形推断，多义查 WORD_SENSES，助记按构词法拆（拆不出就空着） */
  const auto = autoChunkNote(chunk);
  if (!base){
    return { pos: auto.pos, inferred: !!auto.pos, senses: auto.senses, mnemonic: auto.mnemonic };
  }
  const pos = base.pos || auto.pos;
  const baseSenses = Array.isArray(base.senses) ? base.senses.filter(Boolean) : [];
  return {
    pos,
    inferred: !base.pos && !!pos,
    senses: (baseSenses.length ? baseSenses : auto.senses).slice(0, 3),
    mnemonic: base.mnemonic || auto.mnemonic
  };
}

/* 「忍不住／控制不了」这种写法本身就是两个意思：拆成主意思 + 其他义项，卡片上分两行更好读 */
function splitChunkMeaning(meaning){
  const parts = String(meaning == null ? '' : meaning).split(/\s*[／/]\s*/).filter(Boolean);
  return { main: parts[0] || '', rest: parts.slice(1) };
}

/* 卡片上的「其他义项」：主意思已经写过的别再列一遍（意思就是「轻的」，其他义项又来一条 adj. 轻的）。
   词典释义带词性前缀（adj. 轻的），比的时候先剥掉；差的只是词性和标点也算同一条。 */
function metaSenses(meta, meaning){
  const main = String(splitChunkMeaning(meaning).main || '').replace(/[。.．\s]/g, '').toLowerCase();
  const out = [];
  ((meta && meta.senses) || []).forEach(s => {
    const raw = String(s || '').trim();
    if (!raw) return;
    const bare = raw.replace(DICT_POS_RE, '').replace(/[。.．\s]/g, '').toLowerCase();
    if (!bare) return;
    if (bare === main) return;
    /* 主意思写成「忍不住」、义项是「忍不住做某事」这种包含关系也算重复 */
    if (main.length > 1 && (main.includes(bare) || bare.includes(main))) return;
    if (out.some(x => x.replace(DICT_POS_RE, '').replace(/[。.．\s]/g, '').toLowerCase() === bare)) return;
    out.push(raw);
  });
  return out.slice(0, 3);
}

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
/* 句点不全都是句末：缩写（a.m. / U.S. / Mr.）和小数（3.50）里的点要是也拿来切，
   「We left at 9 a.m. It was cold.」会变成 3 段。做法是把这些点先换成占位符，切完再换回来。
   只换「不是最后一个」的点（a.m. → a\u0001m.），让真正的句末点仍然落在缩写末尾，切点才对得上。 */
const SENT_HOLD = '\u0001';
const SENT_DOT_ABBR = /([A-Za-z])\.(?=[A-Za-z]\.)/g; // a.m. / U.S. / e.g. / i.e.
/* 单个字母 + 句点 + 小写词，说明句子还没完（e.g. a cat 的 g.）：真句末后面跟的是大写 */
const SENT_DOT_SOLO = /([A-Za-z])\.(?=\s+[a-z])/g;
const SENT_DOT_WORD = /\b(Mr|Mrs|Ms|Dr|Prof|St|Jr|Sr|vs|etc|Inc|Ltd|Co|Corp|No|Vol|Fig|Ave|Blvd)\./g;
const SENT_DOT_DEC = /(\d)\.(?=\d)/g; // 3.50
function holdSentenceDots(text){
  return String(text == null ? '' : text)
    .replace(SENT_DOT_ABBR, '$1' + SENT_HOLD)
    .replace(SENT_DOT_SOLO, '$1' + SENT_HOLD)
    .replace(SENT_DOT_WORD, '$1' + SENT_HOLD)
    .replace(SENT_DOT_DEC, '$1' + SENT_HOLD);
}
/* ========== 切句：英文、中文各只有一份规则 ==========
   以前英文有「正则版」和「手写扫描版」两套（一套认缩写和小数、不认句末引号，另一套反过来），
   中文也有两套（其中一套在后行断言里逐个切，会把整串「……」从中间切开）。
   两套切出的句数会不一样，而 locateSentence / zhForSentence / 逐句高亮都靠句下标把英文句
   对到中文句上：差一句就引用到别的句子，或者高亮串到隔壁去。
   现在规则只有这两个正则，列表版（splitEnglishSentences）与保留位置版（splitEnSegments）
   都从它们来，不再各写一套。
   正则用「零个或多个非句末字符」开头：段落以标点开场（"...wait"）时那几个点也不会被丢掉。 */
const EN_SENT_RE = /[^.!?]*[.!?]+["'”’)\]]?/g;
const ZH_SENT_RE = /[^。！？!?…]*(?:[。！？!?]+|…+)["'”’]?/g;
function splitEnglishSentences(text){
  /* 缩写（a.m. / U.S. / Mr.）和小数里的点先换成占位符，切完再换回来 */
  return splitByRegex(holdSentenceDots(text), EN_SENT_RE).map(s => s.split(SENT_HOLD).join('.'));
}
function splitChineseSentences(text){
  return splitByRegex(text, ZH_SENT_RE);
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
/* 译文缓存单独一个键（原来和笔记挤在 STORE_KEY 里）。
   理由：缓存最多 3000 条 × 最多 1000 字符，整盘序列化能到 3MB 量级，和 5MB 配额同一量级；
   一旦写满，先失败的是笔记——而丢缓存只是多联网一次，丢笔记是事故。分开之后两份数据各写各的，
   缓存把配额撑爆也伤不到笔记。 */
const CACHE_KEY = 'ecChunksCache_v1';
/* 缓存体积预算（字符数）：约 2.4MB 的 UTF-16，给笔记留出其余空间 */
const TR_CACHE_BUDGET = 1200000;
/* 4 = 新增 state.mistakes（错题本）。旧版本的程序读不到这个字段，合并云端数据时会把错题本
   整段抹掉，所以版本号要抬上去——让旧版本走「数据比你新，先导出备份」的提示，而不是静默丢数据。
   5 = 新增 state.trCache（译文缓存）。同样理由：旧版读不到，云端整盘合并会把它清空，
   等于每次启动都要重新联网翻译一遍。
   （0.7.2 起 trCache 在落盘时搬到 CACHE_KEY，内存里仍是 state.trCache；旧数据里的内联缓存
   读盘时并进 state.trCache，所以不需要再抬版本号。） */
const DATA_VERSION = 5;
let storageOK = true;

function defaultState(){ return { version: DATA_VERSION, chunks:[], logs:{}, streak:0, lastActive:null, settings:{ currentWeek:1 }, customLessons:[], trash:[], progress:{}, lessonEdits:{}, deletedLessons:{}, mistakes:{}, deletedMistakes:{}, trCache:{} }; }
function normalizeChunk(c){
  /* pos / mem 是可选的展示字段（词性、助记）：老数据没有就是空串，
     收集时从文章词块带过来（见 renderLessonDetail 的 data-collect）。 */
  return { id:c.id||uid(), sentence:c.sentence||'', chunk:c.chunk||'', meaning:c.meaning||'', mine:c.mine||'', source:c.source||'', pos:c.pos||'', mem:c.mem||'', added:c.added||todayStr(), nextReview:c.nextReview||todayStr(), stage:Number.isFinite(c.stage)?c.stage:0, mastered:!!c.mastered, lastReviewed:c.lastReviewed||null };
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
    cloze: Array.isArray(l.cloze) ? l.cloze.filter(Boolean) : [],
    chunkNotes: normalizeChunkNotes(l.chunkNotes)
  };
}
/* 词块附加信息（词性 / 多义 / 助记）跟着文章存，键是小写词块：
   读盘时按白名单裁剪，避免旧数据或云端合并带进奇怪的字段 */
function normalizeChunkNotes(obj){
  const out = {};
  if (!obj || typeof obj !== 'object') return out;
  Object.keys(obj).slice(0, 200).forEach(k => {
    const v = obj[k];
    if (!v || typeof v !== 'object') return;
    const senses = Array.isArray(v.senses) ? v.senses.filter(s => typeof s === 'string' && s.trim()).slice(0, 4).map(s => s.trim().slice(0, 60)) : [];
    out[k] = { pos: String(v.pos || '').slice(0, 20), senses, mnemonic: String(v.mnemonic || '').slice(0, 80) };
  });
  return out;
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
/* 把落在 CACHE_KEY 里的译文缓存并回内存视图 state.trCache。
   老版本把缓存内联写在笔记键里、新版本写在缓存键里，两台机器/两个版本可能各有一份，
   所以按并集读：谁有就留谁，重复的键内容相同。 */
function withSavedCache(st){
  let saved = null;
  try{
    const raw = localStorage.getItem(CACHE_KEY);
    saved = raw ? JSON.parse(raw) : null;
  }catch(e){ saved = null; }
  st.trCache = normalizeTrCache(Object.assign({}, st.trCache || {}, saved || {}));
  return st;
}
function loadState(){
  const readKey = (k) => {
    try{
      const raw = localStorage.getItem(k);
      return raw ? migrate(JSON.parse(raw)) : null;
    }catch(e){ console.warn('读取失败', k, e); return null; }
  };
  const cur = readKey(STORE_KEY);
  if (cur) return withSavedCache(cur);
  /* 旧版本键：读出并迁移后立刻搬到新键、清掉旧键。
     原来的 || 链每次启动都优先读 v2/v1 的老数据，新写入落在新键上，
     用户看到的就是"改了没保存"。 */
  for (const k of [OLD_KEY_V2, OLD_KEY_V1]){
    const st = readKey(k);
    if (!st) continue;
    try{
      localStorage.setItem(STORE_KEY, JSON.stringify(withoutTrCache(st)));
      localStorage.removeItem(k);
    }catch(e){}
    return withSavedCache(st);
  }
  return withSavedCache(defaultState());
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

function withoutTrCache(s){
  /* 浅拷贝后去掉缓存：笔记键要小，也不能让缓存把笔记挤出配额 */
  const out = Object.assign({}, s);
  delete out.trCache;
  return out;
}
/* TR_CACHE_MAX 管条数，这里管体积——长句子能撑到「3000 条 × 1000 字符」的量级，
   只限条数挡不住配额。超预算就从最老的开始删（对象属性顺序即插入顺序）。
   顺便把内存里的 state.trCache 一起削小，之后的每次落盘都不用再重算。 */
function trimTrCache(cache){
  if (!cache || typeof cache !== 'object') return cache;
  const keys = Object.keys(cache);
  let total = 0;
  keys.forEach(k => { total += k.length + String(cache[k]).length; });
  for (let i = 0; total > TR_CACHE_BUDGET && i < keys.length; i++){
    total -= keys[i].length + String(cache[keys[i]]).length;
    delete cache[keys[i]];
  }
  return cache;
}
function writeTrCache(cache){
  const obj = trimTrCache(cache || {});
  let text;
  try{ text = JSON.stringify(obj); }catch(e){ return; }
  for (let attempt = 0; attempt < 2; attempt++){
    try{ localStorage.setItem(CACHE_KEY, text); return; }
    catch(e){
      /* 写不进去（多半是配额满）：砍一半再试一次，还不行就放弃这一次。
         缓存丢了只是多联网一次；笔记那条已经写成功了，不该被它连累。 */
      const keys = Object.keys(obj);
      if (!keys.length || attempt === 1) return;
      for (let i = 0; i < Math.ceil(keys.length / 2); i++) delete obj[keys[i]];
      try{ text = JSON.stringify(obj); }catch(_e){ return; }
    }
  }
}
function writeStateNow(){
  try{ localStorage.setItem(STORE_KEY, JSON.stringify(withoutTrCache(state))); storageOK = true; }
  catch(e){ if (storageOK) toast('本地存储不可用或已满'); storageOK = false; }
  writeTrCache(state.trCache);
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
function addChunk({sentence, chunk, meaning, mine, source, pos, mem}){
  const t = todayStr();
  state.chunks.unshift({ id:uid(), sentence:sentence.trim(), chunk:chunk.trim(), meaning:meaning.trim(), mine:(mine||'').trim(), source:(source||'').trim(), pos:(pos||'').trim(), mem:(mem||'').trim(), added:t, nextReview:addDays(t, INTERVALS[0]), stage:0, mastered:false, lastReviewed:null });
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
  /* 内置表都没有时问离线词典（data/dict.json，没有这个文件就返回空） */
  return dictGloss(k2);
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
        /* 跨标点的候选不要：以前会提出 "end, the quiet" 这种带逗号的碎片，
           既不像语块也没法在原文里高亮，词块卡片上只会显得脏 */
        if (/[,.;:!?"()\[\]…—–]/.test(sent.slice(start, end))) continue;
        const display = slice.map(w => w.word).join(' ');
        if (!candidates.has(phraseLower)){
          candidates.set(phraseLower, { count: 0, sentence: sent, display, sentIdx, meaning: chunkMeaningOf(display) });
        }
        candidates.get(phraseLower).count++;
      }
    }
  });
  /* 有中文意思的排前面：这些是内置表里认得的真语块，卡片上能直接看到释义 */
  const list = Array.from(candidates.values()).sort((a, b) => {
    if (!!b.meaning !== !!a.meaning) return b.meaning ? 1 : -1;
    if (b.count !== a.count) return b.count - a.count;
    return b.display.length - a.display.length;
  });
  const picked = [];
  const rejected = [];
  const seen = new Set();
  /* 双向去重：既排除「已选包含新候选」，也排除「新候选包含已选」 */
  const conflicts = (arr, key) => arr.some(p => {
    const pk = p.chunk.toLowerCase();
    return pk === key || pk.includes(key) || key.includes(pk);
  });
  const toItem = (c) => ({ chunk: c.display, sentence: c.sentence, meaning: c.meaning, sentIdx: c.sentIdx });
  /* 没释义的候选最多占一半名额：有释义的（内置表认得的真语块）才是卡片主体，
     剩下的位置宁可空着，也不塞「habits stubborn」这种切碎的半句 */
  const noMeaningCap = Math.max(3, Math.ceil(limit / 2));
  let noMeaning = 0;
  for (const c of list){
    if (picked.length >= limit) break;
    const key = c.display.toLowerCase();
    if (seen.has(key)) continue;
    if (conflicts(picked, key)) continue;
    seen.add(key);
    if (!c.meaning && noMeaning >= noMeaningCap){ rejected.push(toItem(c)); continue; }
    if (chunkWorth(c.display, c.meaning, c.count, false)) {
      picked.push(toItem(c));
      if (!c.meaning) noMeaning++;
    } else rejected.push(toItem(c));
  }
  /* 内置表没料或文章太短时，严格筛完可能没几条，按 loose 规则补回，最多到 5 条 */
  if (picked.length < 5){
    for (const item of rejected){
      if (picked.length >= Math.min(5, limit)) break;
      if (conflicts(picked, item.chunk.toLowerCase())) continue;
      const c = list.find(x => x.display === item.chunk);
      if (!c || !chunkWorth(c.display, c.meaning, c.count, true)) continue;
      picked.push(item);
    }
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
  { key: 'qianwen', name: '千问', url: 'https://www.qianwen.com/' },
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
  if (e.chunkNotes && typeof e.chunkNotes === 'object'){
    const merged = Object.assign({}, lesson.chunkNotes || {});
    Object.keys(e.chunkNotes).forEach(k => {
      const src = e.chunkNotes[k];
      if (!src || typeof src !== 'object') return;
      const prev = merged[k] || { pos: '', senses: [], mnemonic: '' };
      merged[k] = {
        pos: src.pos || prev.pos || '',
        senses: Array.isArray(src.senses) && src.senses.length ? src.senses.slice(0, 4) : (prev.senses || []),
        mnemonic: src.mnemonic || prev.mnemonic || ''
      };
    });
    lesson.chunkNotes = merged;
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

/* 分句并保留位置：用于「英文第 N 句 ↔ 中文第 N 句」的精确对齐。
   规则与 splitEnglishSentences / splitChineseSentences 完全相同（同一个正则、同样先保护缩写里的点），
   区别只在这里要 start/end。占位符与被它替换的句点等长，所以位置不会偏。 */
function splitSegments(text, re){
  const src = String(text || '');
  const out = [];
  if (!src) return out;
  re.lastIndex = 0;
  let m, last = 0;
  while ((m = re.exec(src)) !== null){
    if (m[0] === ''){ re.lastIndex++; continue; }
    if (!m[0].trim()){ last = m.index + m[0].length; continue; }
    out.push({ text: m[0], start: m.index, end: m.index + m[0].length });
    last = m.index + m[0].length;
  }
  /* 最后一段没有句末标点时它不属于任何匹配，要单独补上——
     列表版（splitByRegex）也是这么补的，两个版本必须给出同样的句子。 */
  const tail = src.slice(last);
  if (tail.trim()) out.push({ text: tail, start: last, end: src.length });
  return out;
}
function splitEnSegments(text){
  return splitSegments(holdSentenceDots(text), EN_SENT_RE).map(seg => ({
    text: seg.text.split(SENT_HOLD).join('.'),
    start: seg.start,
    end: seg.end
  }));
}
function splitZhSegments(text){
  return splitSegments(text, ZH_SENT_RE);
}

/* 逐句对齐后只在本句范围内高亮，避免整段串色（英文高亮了中文却标到别处） */
function highlightZhBySentence(zhText, enText, chunks){
  const zh = String(zhText || '');
  if (!zh) return '';
  if (!chunks || !chunks.length) return esc(zh);
  const zhSegs = splitZhSegments(zh);
  const enSegs = splitEnSegments(enText);
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
    const enSegs = splitEnSegments(text[idx]);
    const zhSegs = splitZhSegments(textZh[idx] || '');
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
    const enSegs = splitEnSegments(en);
    const zhSegs = splitZhSegments(textZh[i] || '');
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
/* 切句只留一份实现在上面（splitEnglishSentences / splitChineseSentences），这两个名字是薄壳。
   以前这里另写了一份手扫版，和上面那份规则不同（那份认缩写和小数、这份认句末引号），
   同一段用两个函数切出的句数会不一样，而下面 locateSentence / zhForSentence 要靠句下标
   把英文句对到中文句上——差一句就引用到别的句子。 */
function splitEnSentences(text){
  return splitEnglishSentences(text);
}
function splitZhSentences(text){
  return splitChineseSentences(text);
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
    /* 词性 / 多义 / 助记：内置文章查 CHUNK_META，AI 写的文章查 lesson.chunkNotes，
       两样都没有就只剩中文意思（不硬编造助记）。 */
    const meta = chunkMeta(c.chunk, lesson);
    const meaningParts = splitChunkMeaning(c.meaning);
    const senses = (meaningParts.rest || []).concat(metaSenses(meta, c.meaning));
    const meaningHtml = c.meaning
      ? esc(meaningParts.main || c.meaning)
      : `<input class="inline-input" data-meaning-idx="${i}" placeholder="补充中文意思（回车保存）" autocomplete="off">
         <div class="inline-tip">也可以点「译」自动翻译 <button class="btn tiny" data-trans-chunk="${i}" type="button">译</button></div>`;
    const exEn = ex.en ? `<div class="ci-sent">${highlightText(ex.en, [{ chunk: c.chunk }])}${speakBtn(ex.en)}</div>` : '';
    const exZh = !ex.en ? ''
      : (ex.zh
          ? `<div class="ci-sent-zh">${esc(ex.zh)}</div>`
          : `<div class="ci-sent-zh"><button class="btn tiny" data-trans-sent="${i}" type="button">翻译例句</button></div>`);
    return `<div class="chunk-item">
      <div class="ci-main">
        <div class="ci-c">${esc(c.chunk)}${meta.pos ? `<span class="ci-pos${meta.inferred ? ' guess' : ''}"${meta.inferred ? ' title="按词形自动推断"' : ''}>${esc(meta.pos)}</span>` : ''}${speakBtn(c.chunk)}</div>
        <div class="ci-m">${meaningHtml}</div>
        ${senses.length ? `<div class="ci-senses"><span class="ci-lbl">其他义项</span>${senses.map(esc).join('；')}</div>` : ''}
        ${meta.mnemonic ? `<div class="ci-mem">助记：${esc(meta.mnemonic)}</div>` : ''}
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
      /* 词性、助记跟着一起进词块本，复习卡片上也能看到 */
      const m = chunkMeta(c.chunk, lesson);
      addChunk({ sentence:c.sentence, chunk:c.chunk, meaning:c.meaning, mine:'', source:lesson.title, pos:m.pos, mem:m.mnemonic });
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
  $('#aAiRaw').value = '';
  pendingChunkNotes = {};   /* 上一次粘的重点词块不带到这一篇 */
  if ($('#aSentCount') && !$('#aSentCount').value) $('#aSentCount').value = '10';
  $('#transStatus').textContent = '';
  updateAlignNote();
  refreshAiPrompt();
  $('#articleModal').hidden = false;
  setTimeout(() => $('#aTitle').focus(), 60);
}
function closeArticleModal(){
  pendingChunkNotes = {};
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
/* 难度中文名用文件顶部已有的 LEVEL_LABEL，不要在这里再声明一份 */
/* 挑哪几个词块塞进提示词：以前取 state.chunks 末尾 limit 条（就是最后加进来的那几条），
   跟掌握度、跟多久没复习都没关系。现在和复习队列同序——到期日早的优先——并且带上中文意思：
   只给英文串的话，AI 不知道这个词是「放弃」还是「分发」，用出来多半不是你要练的那个义。 */
function pickPromptChunks(limit){
  const list = (state.chunks || []).filter(c => c && c.chunk && !c.mastered);
  list.sort((a, b) => String(a.nextReview || '').localeCompare(String(b.nextReview || '')) || String(a.added || '').localeCompare(String(b.added || '')));
  return list.slice(0, limit).map(c => {
    const zh = String(c.meaning || '').split(/[；;，,、]/)[0].trim();
    return zh ? c.chunk + '（' + zh + '）' : c.chunk;
  });
}
/* 句数：界面上填多少就用多少，越界或没填就按 10 句 */
function promptSentCount(){
  const el = $('#aSentCount');
  const n = Number(el && el.value);
  return Number.isFinite(n) && n >= 4 && n <= 30 ? Math.round(n) : 10;
}
/* 要挑几个词块，随句数走：写死「6–12 个」和「每 2–3 句一个搭配」是打架的，
   默认 10 句只有 4 个搭配位，AI 想要凑够 12 个就只能塞孤立单词。约每 1.4 句一个词块最合手。 */
function promptChunkCount(count){
  return Math.min(12, Math.max(4, Math.round(count * 0.7)));
}
function buildAiPrompt(){
  const lvEl = $('#aLevel');
  const level = (lvEl && lvEl.value) || 'intermediate';
  const levelZh = LEVEL_LABEL[level] || LEVEL_LABEL.intermediate;
  const topicEl = $('#aTopic');
  const topic = String((topicEl && topicEl.value) || '').trim() || '日常生活';
  const count = promptSentCount();
  const chunkCount = promptChunkCount(count);
  /* 提示词按用户给的版本落地，只把「等级 / 主题 / 句数」三个参数填进去。
     末尾那行「还没掌握的表达」是可选的补充：词块本空着的时候整行都不出现。 */
  const lines = [
    "你是一位英语教学材料作者。请按照我指定的等级生成一篇英语短文，并附上逐句对应的中文翻译。",
    "",
    "## 参数",
    `- 等级：${levelZh}`,
    `- 主题：${topic}`,
    `- 句数：${count}`,
    "",
    "## 写作要求",
    "1. 英文自然、地道，符合指定等级，不要写成教科书式生硬句子。",
    "2. 每句话只用一个句号、问号或感叹号结尾。不要用分号把多个意思串成一句。",
    "3. 不要在句中写句点：别用缩写句点（Mr.、Mrs.、Dr.、a.m.、p.m.、U.S.、U.K.、e.g.、i.e.、etc.），别写小数（如 3.14），也别用省略号。程序只按句号分句，多一个点就会把句子切碎。",
    "4. 英文句子不要加编号（不要写 1. 2. 3.），每句单独一行即可。",
    `5. 每 1–2 句自然出现一个常用搭配或短语，全文至少 ${chunkCount} 个，方便学习者积累词块（常见短语见下面第 7 条的对照）。`,
    "6. 中文翻译必须逐句对应：英文第 1 句对应中文第 1 句，英文第 2 句对应中文第 2 句，以此类推。句数必须完全一致。",
    "7. 中文翻译通顺自然，不要逐字硬译。常见短语请使用最通用的中文对应，例如：",
    "   - make a decision → 做决定",
    "   - give up → 放弃",
    "   - in the end → 最终",
    "   - look forward to → 期待",
    "   - take care of → 照顾",
    "8. 中文句子也不要加编号，每句单独一行。",
    "",
    "## 难度标准",
    "- " + levelZh + "：" + (LEVEL_STANDARD[level] || LEVEL_STANDARD.intermediate),
    "",
    "## 输出格式（严格遵守，不要添加额外说明）",
    "",
    "### 英文标题",
    "[英文标题]",
    "",
    "### 中文标题",
    "[中文标题]",
    "",
    "### 英文原文",
    "第 1 句。",
    "第 2 句。",
    "第 3 句。",
    "...",
    "",
    "### 中文翻译",
    "第 1 句中文。",
    "第 2 句中文。",
    "第 3 句中文。",
    "...",
    "",
    "### 重点词块（这段会一起导入，格式不要改）",
    `从上面挑 ${chunkCount} 个值得记的搭配或单词，一行一条，严格按这个格式：`,
    "- 词块（词性）：中文意思；另一个常见意思（没有就不写）｜助记：一句话的记忆钩子",
    "",
    "要求：",
    "1. 词性必须标出来，用 n.、v.、adj.、adv.、prep.、conj.、phr. 这些缩写；短语写成 v.+n.、adj.+n.、prep.+n. 这类组合。",
    "2. 一个单词或短语有好几个常见意思时，全都要列出来，用「；」隔开，不要只给一个。",
    "3. 每个词块都要附助记：词根词缀、搭配场景、联想都行，一句话（30 字以内）；不要把中文意思换句话再说一遍（「记住它表示放弃」这种不算助记，会被程序丢掉）。",
    "4. 中文意思用最通用的说法，方便直接收进词块本。",
    "5. 每个词块都必须原样出现在上面的英文原文里（大小写可以不同，词形不要改），没出现在原文里的不要写——程序要回原文里逐条找位置，找不到的词块就丢了。",
    "6. 一行一条，不要加编号，不要在词块前后写别的说明；这一段会被程序逐行解析。",
    "",
    "例如：",
    "- make a decision（v.+n.）：做决定；下定决心｜助记：把选择「做」出来，就不是空想",
    "- in the end（prep. phr.）：最终；最后｜助记：走到路的尽头就是最终"
  ];
  const words = pickPromptChunks(8);
  if (words.length){
    const least = Math.min(3, words.length);
    lines.push(
      "",
      "（重要）下面 " + words.length + " 个是我还没掌握的表达（括号里是我想练的意思），请自然地用进正文，至少用上 " + least + " 个；不要硬塞，也不要单独列成一段：",
      words.map(w => "- " + w).join("\n")
    );
  }
  return lines.join("\n");
}
function refreshAiPrompt(){
  const box = $('#aPrompt');
  if (box) box.value = buildAiPrompt();
}
/* ========== 把 AI 的整段回答拆成「标题 / 英文 / 中文 / 重点词块」 ==========
   提示词输出的是 Markdown 小节（### 英文标题 / ### 英文原文 / ### 中文翻译 / ### 重点词块），
   让用户整段粘进一个框最省事，所以这里按小节切，顺手剥掉 ###、**、[标题]、1. 这些壳子。
   重点词块那节按提示词约定的格式解析成「词性 / 多义 / 助记」，随文章一起存进 lesson.chunkNotes，
   卡片上就能和内置文章一样显示（见 chunkMeta）。解析不出来就只计数，不影响英文和中文。 */
function aiSectionKey(name){
  const t = String(name || '').replace(/[#*【】\[\]]/g, '').trim();
  if (!t) return '';
  if (/英文标题|english\s*title/i.test(t)) return 'titleEn';
  if (/中文标题|chinese\s*title/i.test(t)) return 'titleZh';
  if (/重点词块|词块|短语|表达|phrases|vocab/i.test(t)) return 'skip';
  if (/英文|english/i.test(t)) return 'en';
  if (/中文|chinese|翻译|译文/i.test(t)) return 'zh';
  return '';
}
function cleanAiLine(line){
  return String(line == null ? '' : line)
    .replace(/^\s*[-*•]\s+/, '')
    .replace(/^\s*\d{1,2}\s*[.、)]\s*/, '')
    .replace(/\*\*/g, '')
    .replace(/`/g, '')
    .replace(/^\[(.*)\]$/, '$1')
    .trim();
}
/* AI 写回来的助记先过一遍筛子：把中文意思换句话再说一遍（「记住它表示放弃」）、
   或者只写「记住这个搭配」「多读几遍」，都不是记忆钩子，收进词块本只会在复习卡上占一行。
   宁可这一格空着（卡片上不显示助记那行），也别让用户把复述当成助记去背。 */
const AI_NOTE_BAN = /^(?:记住|牢记|背下|背过|多读|多背|多练|这个|该词|所谓|总之|意思是|就是|它的意思)/;
function cleanAiMnemonic(mnemonic, senses){
  const n = String(mnemonic == null ? '' : mnemonic).replace(/^助记\s*[：:]?\s*/, '').replace(/\s+/g, ' ').trim();
  if (!n || n.length < 4) return '';
  if (AI_NOTE_BAN.test(n)) return '';
  const first = senses && senses[0] ? String(senses[0]).trim() : '';
  /* 助记里直接出现了主意思，多半就是把义项复述了一遍 */
  if (first.length >= 2 && n.indexOf(first) >= 0) return '';
  return n.slice(0, 80);
}
/* 一行重点词块 → { chunk, pos, senses, mnemonic }
   约定格式（见 buildAiPrompt）：「- 词块（词性）：意思；另一个意思｜助记：一句话」，
   也容错没写词性、没写助记、用了半角括号或冒号的版本。 */
function parseChunkLine(line){
  const t = cleanAiLine(line);
  if (!t) return null;
  let head = '';
  let pos = '';
  let body = '';
  const withPos = t.match(/^(.*?)\s*[（(]\s*([^）)]{1,20})\s*[）)]\s*[：:]\s*(.+)$/);
  if (withPos){ head = withPos[1]; pos = withPos[2]; body = withPos[3]; }
  else {
    const plain = t.match(/^(.*?)\s*[：:]\s*(.+)$/);
    if (!plain) return null;
    head = plain[1]; body = plain[2];
  }
  let mnemonic = '';
  const halves = String(body).split(/[｜|]/);
  if (halves.length > 1){
    body = halves.shift();
    mnemonic = halves.join('｜').replace(/^\s*助记\s*[：:]?\s*/, '').trim();
  }
  const senses = String(body).split(/[；;]/).map(s => s.trim()).filter(Boolean);
  const chunk = String(head).replace(/^[-*•\s]+/, '').replace(/[*`]/g, '').trim();
  if (!chunk || !senses.length) return null;
  return { chunk, pos: pos.trim(), senses, mnemonic: cleanAiMnemonic(mnemonic, senses) };
}
/* 小节名和内容挤在同一行的写法：「### 英文标题：A Quiet Morning」「**中文翻译**：…」
   AI 很爱这么写，以前整行被当成正文，标题就丢了。 */
function aiInlineSection(line){
  const m = String(line || '').match(/^\s*(?:#{1,6}\s*)?(?:[-*•]\s*)?(?:\*\*)?(.{1,24}?)(?:\*\*)?\s*[：:]\s*(.+)$/);
  if (!m) return null;
  const key = aiSectionKey(m[1]);
  if (!key) return null;
  return { key, rest: m[2] };
}
function parseAiOutput(raw){
  const text = String(raw || '').replace(/\r\n?/g, '\n');
  if (!text.trim()) return null;
  const out = { titleEn: '', titleZh: '', en: [], zh: [], blockLines: 0, chunks: [], ignored: 0 };
  /* 一个小节标记都没有的时候，就把整段当英文（老提示词、或者用户只贴了正文都能用） */
  let cur = 'en';
  /* 一行内容按当前小节归位；行内小节用同一个入口，保证「标题：内容」和正常写法行为一致 */
  const feed = (key, rawLine) => {
    const t = cleanAiLine(rawLine);
    if (!t) return;
    if (key === 'skip'){
      out.blockLines++;
      const parsedChunk = parseChunkLine(rawLine);
      if (parsedChunk) out.chunks.push(parsedChunk);
      return;
    }
    if (key === 'titleEn'){ if (!out.titleEn) out.titleEn = t; return; }
    if (key === 'titleZh'){ if (!out.titleZh) out.titleZh = t; return; }
    if (key === 'zh'){ out.zh.push(t); return; }
    /* 只对英文段做过滤：「好的，以下是文章」这类中文说明不该混进英文，
       但中文段本来就该是纯中文，不能一刀切 */
    const hasLatin = /[A-Za-z]{2,}/.test(t);
    const hasCjk = /[\u4e00-\u9fa5]/.test(t);
    if (!hasLatin && hasCjk){ out.ignored++; return; }
    out.en.push(t);
  };
  text.split('\n').forEach(line => {
    /* 顺序很重要：先看「小节名：内容」同行写法，再看整行小节名。
       反过来的话「### 英文标题：A Quiet Morning」会被当成小节头，标题就丢了 */
    const inline = aiInlineSection(line);
    if (inline){
      cur = inline.key;
      if (inline.rest && inline.rest.trim()) feed(inline.key, inline.rest);
      return;
    }
    const head = line.match(/^\s*(?:#{1,6}\s*(.+?)|【(.+?)】|\*\*(.{1,20})\*\*)\s*$/);
    if (head){
      const key = aiSectionKey(head[1] || head[2] || head[3]);
      if (key){ cur = key; return; }
    }
    /* 光秃秃一行小节名（「英文原文：」冒号后什么都没写也算） */
    const bare = line.trim();
    if (bare && bare.length <= 16 && !/[。！？；]/.test(bare)){
      const bareKey = aiSectionKey(bare);
      if (bareKey){ cur = bareKey; return; }
    }
    feed(cur, line);
  });
  /* 英文再按行切一遍句子：AI 有时一行塞两句，也有一行忘了写句号 */
  const en = [];
  out.en.forEach(line => {
    const parts = splitEnglishSentences(line);
    if (parts.length) en.push(...parts); else if (line) en.push(line);
  });
  out.en = en;
  out.zh = out.zh.map(s => s.trim()).filter(Boolean);
  return out;
}
/* 粘贴进来的重点词块先存在这里，点「保存文章」时才挂到文章上：
   这时还没有文章对象，也没法知道用户会不会取消。 */
let pendingChunkNotes = {};
function chunkNotesFromParsed(chunks){
  const out = {};
  (chunks || []).forEach(c => {
    const key = metaKey(c.chunk);
    if (!key) return;
    /* chunk 留着原文写法：对齐到自动提取的词块时要用原句里的样子，不能全小写 */
    out[key] = { chunk: c.chunk, pos: c.pos || '', senses: (c.senses || []).slice(0, 4), mnemonic: c.mnemonic || '' };
  });
  return out;
}
/* 词块的两把键：
   strict —— 只去标点、压空格，用来判断「是不是同一个词块」和「在哪一句里」；
   loose  —— 再去掉 the/a/an 这类虚词，用来判断「谁包含谁」（"morning light" 是 "in the morning light" 的一部分）。 */
const CHUNK_MATCH_STOP = new Set(['the', 'a', 'an', 'to', 'of', 'and', 'or', 'my', 'your', 'his', 'her', 'its', 'our', 'their', 'this', 'that']);
function chunkStrictKey(s){
  return metaKey(s).replace(/[^a-z0-9'\s]/g, ' ').replace(/\s+/g, ' ').trim();
}
function chunkLooseKey(s){
  const words = chunkStrictKey(s).split(' ').filter(w => w && !CHUNK_MATCH_STOP.has(w));
  return words.join(' ');
}
/* 这个词块在哪一句里（按完整词序列匹配，"in the end" 不会误配到只含 end 的句子） */
function findChunkSentenceIndex(lesson, chunk){
  const target = ' ' + chunkStrictKey(chunk) + ' ';
  const text = (lesson && Array.isArray(lesson.text)) ? lesson.text : [];
  if (target.trim().length < 3) return -1;
  return text.findIndex(s => (' ' + chunkStrictKey(s) + ' ').includes(target));
}
/* 把 AI 给的重点词块与这篇自动提取出来的词块对齐，然后把词性/多义/助记挂上去：
   这一步以前只做「键完全相同才挂」，而自动提取的是 2–3 词的机械 n-gram（"morning light comes"），
   AI 写的是 "morning light"，十有八九对不上，于是卡片上永远只有中文意思。
   现在的做法：
     1) AI 说是重点、提取却没提出来（或者提成了更长的碎片）的，按原文句子补进来并替换碎片；
     2) 挂信息时严格键 + 包含关系都认；
     3) 中文意思空着的顺手用第一个义项补上。
   返回补了几条中文意思（沿用 applyChunkNotes 的旧语义）。 */
function applyChunkNotes(lesson, notes){
  const keys = Object.keys(notes || {});
  if (!lesson || !keys.length) return 0;
  if (!Array.isArray(lesson.chunks)) lesson.chunks = [];
  if (!lesson.chunkNotes || typeof lesson.chunkNotes !== 'object') lesson.chunkNotes = {};
  const entries = keys.map(k => ({ raw: (notes[k] && notes[k].chunk) || k, key: chunkStrictKey(k), loose: chunkLooseKey(k), note: notes[k] }))
    .filter(e => e.key);

  /* 1) 补齐 AI 提到的词块（替换掉被它包含的机械碎片） */
  entries.forEach(e => {
    const same = lesson.chunks.findIndex(c => chunkStrictKey(c.chunk) === e.key);
    if (same >= 0) return;
    const sentIdx = findChunkSentenceIndex(lesson, e.raw);
    if (sentIdx < 0) return;
    const item = normalizeChunk({
      chunk: e.raw,
      sentence: lesson.text[sentIdx],
      meaning: (e.note.senses || [])[0] || '',
      sentIdx
    });
    const fragment = lesson.chunks.findIndex(c => {
      const ck = chunkLooseKey(c.chunk);
      return ck && e.loose && ck !== e.loose && ck.includes(e.loose);
    });
    /* 以 AI 词块的末词开头的机械碎片（"decision to get" ← "make a decision"）也是跨了边界的，
       和上面那种「包含关系」一样用 AI 说的那个换掉，别在卡片上留一堆没意思的碎片 */
    const tail = e.loose ? e.loose.split(' ').slice(-1)[0] : '';
    const crossed = tail ? lesson.chunks.findIndex(c => {
      const ck = chunkLooseKey(c.chunk);
      const words = ck.split(' ');
      return ck && ck !== e.loose && words.length > 1 && words[0] === tail;
    }) : -1;
    if (fragment >= 0) lesson.chunks.splice(fragment, 1, item);
    else if (crossed >= 0) lesson.chunks.splice(crossed, 1, item);
    else lesson.chunks.push(item);
  });

  /* 1b) AI 已经点名词块时，把跨出边界的机械碎片清掉：
     自动提取按 2–3 词滑动，"I make a decision to get up" 会同时产出 "make a decision"（词典里有）
     和 "decision to get"（跨了意群）。AI 点名的既然更准，这种与它首/末词跨接、又不含它整体的碎片就删掉。 */
  const aiLoose = entries.map(e => e.loose).filter(Boolean);
  if (aiLoose.length){
    lesson.chunks = lesson.chunks.filter(c => {
      const lk = chunkLooseKey(c.chunk);
      if (!lk || aiLoose.indexOf(lk) >= 0) return true;
      const words = lk.split(' ');
      for (const x of aiLoose){
        const xs = x.split(' ');
        if (lk.includes(x) || x.includes(lk)) return false;
        if (words[0] === xs[xs.length - 1]) return false;
        if (xs[0] === words[words.length - 1] && words.length > 1) return false;
      }
      return true;
    });
  }

  /* 2) 逐个挂信息：同一个词块若既在 AI 回答里、又在旧数据里，字段互补 */
  const used = new Set();
  let filled = 0;
  lesson.chunks.forEach(c => {
    const sk = chunkStrictKey(c.chunk);
    const lk = chunkLooseKey(c.chunk);
    const e = entries.find(x => x.key === sk) ||
      entries.find(x => x.loose && lk && (x.loose === lk || lk.includes(x.loose) || x.loose.includes(lk)));
    if (!e) return;
    const key = metaKey(c.chunk);
    const prev = lesson.chunkNotes[key] || { pos: '', senses: [], mnemonic: '' };
    const merged = {
      pos: e.note.pos || prev.pos || '',
      senses: ((e.note.senses && e.note.senses.length) ? e.note.senses : (prev.senses || [])).slice(0, 4),
      mnemonic: e.note.mnemonic || prev.mnemonic || ''
    };
    if (!merged.pos && !merged.senses.length && !merged.mnemonic) return;
    lesson.chunkNotes[key] = merged;
    used.add(key);
    if (!c.meaning && merged.senses[0]){ c.meaning = merged.senses[0]; filled++; }
  });
  /* 3) 原文里找不到对应句子的词块（AI 顺口多列的）也留着信息：
        这次不显示成卡片，但下次编辑、重新分析或换个句子时还能用上 */
  entries.forEach(e => {
    const key = metaKey(e.raw);
    if (!key || used.has(key)) return;
    const n = e.note;
    if (!n || (!n.pos && !(n.senses || []).length && !n.mnemonic)) return;
    lesson.chunkNotes[key] = { pos: n.pos || '', senses: (n.senses || []).slice(0, 4), mnemonic: n.mnemonic || '' };
  });
  return filled;
}
function fillFromAiOutput(){
  const box = $('#aAiRaw');
  const parsed = parseAiOutput(box ? box.value : '');
  if (!parsed || (!parsed.en.length && !parsed.zh.length)){
    toast('没认出内容：把 AI 的整段回答原样粘进来，里面应该带「### 英文原文」和「### 中文翻译」');
    return;
  }
  const tEn = $('#aTitle'); const tZh = $('#aTitleZh');
  /* 这一下就是「用 AI 的这篇替换掉表单里的」，所以标题也直接覆盖：
     以前只在输入框空着时才填，换一篇时旧标题会赖着不走，看着就像「没分好」 */
  if (tEn && parsed.titleEn) tEn.value = parsed.titleEn;
  if (tZh && parsed.titleZh) tZh.value = parsed.titleZh;
  $('#aText').value = parsed.en.join('\n');
  $('#aTextZh').value = parsed.zh.join('\n');
  pendingChunkNotes = chunkNotesFromParsed(parsed.chunks);
  updateAlignNote();

  const noteCount = Object.keys(pendingChunkNotes).length;
  const parts = [`已填入 ${parsed.en.length} 句英文`];
  if (parsed.zh.length) parts.push(`${parsed.zh.length} 句中文`);
  if (noteCount) parts.push(`${noteCount} 个词块带上了词性、多义和助记`);
  else if (parsed.blockLines) parts.push('重点词块那段没认出格式');
  if (parsed.ignored) parts.push(`跳过 ${parsed.ignored} 行说明`);
  toast(parts.join('，'));

  /* 按钮下面写清楚到底分到了什么，免得「填没填」全靠猜 */
  const note = $('#aiParsedNote');
  if (note){
    const bits = [];
    bits.push(parsed.titleEn ? '英文标题「' + esc(parsed.titleEn) + '」' : '英文标题没找到');
    bits.push(parsed.titleZh ? '中文标题「' + esc(parsed.titleZh) + '」' : '中文标题没找到');
    bits.push('英文 ' + parsed.en.length + ' 句');
    bits.push('中文 ' + parsed.zh.length + ' 句');
    if (parsed.chunks.length){
      bits.push('重点词块 ' + parsed.chunks.length + ' 个：' + parsed.chunks.slice(0, 5).map(c => esc(c.chunk) + (c.pos ? '（' + esc(c.pos) + '）' : '')).join('、') + (parsed.chunks.length > 5 ? ' 等' : ''));
    } else if (parsed.blockLines){
      bits.push('重点词块那 ' + parsed.blockLines + ' 行没按「- 词块（词性）：意思｜助记：…」写');
    }
    note.innerHTML = '已识别：' + bits.join(' · ');
    note.className = parsed.chunks.length || !parsed.blockLines ? 'note' : 'note danger';
  }
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
    /* 其他义项也参与搜索：搜「轻的」应该能找到 light。只在这条分支里算，列表平时不白算 */
    list = list.filter(c => (c.chunk + ' ' + c.sentence + ' ' + c.meaning + ' ' + (c.mine||'') + ' ' + (c.source||'') + ' ' + metaSenses(chunkMeta(c.chunk), c.meaning).join(' ')).toLowerCase().includes(q));
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
    /* 词性 / 助记：收集时存了下来就用，老词块没有就回查内置表（AI 写的文章只有本文章里有） */
    const meta = chunkMeta(c.chunk);
    const pos = c.pos || meta.pos;
    const mem = c.mem || meta.mnemonic;
    /* 其他义项不预存：词典是启动后才加载的，换了词典也该跟着变，所以现查 */
    const senses = metaSenses(meta, c.meaning);
    /* 老词块可能没填中文意思，拿离线词典的首义兜底（只显示，不写回数据） */
    const meaning = c.meaning || dictGloss(c.chunk);
    return `<div class="chunk-card">
      <div class="chunk-head"><span class="chunk-title">${esc(c.chunk)}${speakBtn(c.chunk)}</span>${pos ? `<span class="ci-pos">${esc(pos)}</span>` : ''}${badge}<label class="pick" title="勾选后可批量删除"><input type="checkbox" data-pick="${esc(c.id)}"${pickedIds.has(c.id) ? ' checked' : ''}></label></div>
      <p class="sent"><span class="lbl">原句</span>${esc(c.sentence)}${speakBtn(c.sentence)}</p>
      <p><span class="lbl">意思</span>${esc(meaning)}</p>
      ${senses.length ? `<p class="senses"><span class="lbl">其他义项</span>${senses.map(esc).join('；')}</p>` : ''}
      ${mem ? `<p class="mem"><span class="lbl">助记</span>${esc(mem)}</p>` : ''}
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
  /* 揭晓后顺手带上其他义项：记住了「光」，也该想起来它还能当形容词 */
  const rvExtra = metaSenses(chunkMeta(c.chunk), c.meaning);
  box.innerHTML = `
    <div class="rev-mode">
      <button type="button" data-mode="en2zh" class="${reviewMode === 'zh2en' ? '' : 'on'}">英 → 中</button>
      <button type="button" data-mode="zh2en" class="${reviewMode === 'zh2en' ? 'on' : ''}">中 → 英</button>
    </div>
    <div class="review-progress"><span>${reviewState.index + 1} / ${q.length}</span><div class="pbar"><i style="width:${pct}%"></i></div><span>${stageLabel}</span></div>
    <div class="review-card">
      <div class="review-tag">${reviewMode === 'zh2en' ? '看中文，先自己说一遍英文' : (hasChunk ? '先读原句，想想空格里是什么' : '直接看答案吧')}</div>
      ${reviewMode === 'zh2en'
        ? `<p class="rev-prompt-zh">${esc(c.meaning || dictGloss(c.chunk) || '（这个词块还没有中文意思）')}</p>`
        : `<p class="review-sentence">${blankSentence(c.sentence, c.chunk)}</p>`}
      ${reviewState.revealed ? `
        <div class="review-answer">
          <p class="c">${esc(c.chunk)}${speakBtn(c.chunk)}</p><p class="m">${esc(c.meaning || dictGloss(c.chunk))}</p>
          ${rvExtra.length ? `<p class="rev-extra">其他义项：${rvExtra.map(esc).join('；')}</p>` : ''}
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
  if (a.mine && !b.mine) return a;
  /* 分数、复习时间、有没有备注全一样时，必须有一个「与参数顺序无关」的裁决。
     原来这里直接 return a，而 a 永远是「远端」那一条——于是谁先发起同步谁赢：
     两台设备各推一次，这条词块的意思就在两个值之间来回翻（merge 不再幂等）。
     改成比内容定序，两个方向都选出同一条。 */
  return stableStringify(b) > stableStringify(a) ? b : a;
}
function lessonWeight(l){
  const text = Array.isArray(l.text) ? l.text.join(' ').length : 0;
  const chunks = Array.isArray(l.chunks) ? l.chunks.length : 0;
  return text + chunks * 40;
}
function pickLesson(a, b){
  if (!a || !b) return a || b;
  const wa = lessonWeight(a), wb = lessonWeight(b);
  if (wb !== wa) return wb > wa ? b : a;
  /* 同重（比如两边都是同一篇的两种改动）也要按内容定序，理由同 pickChunk：
     返回 a 会让「谁先同步谁赢」，两台设备之间来回翻。 */
  return stableStringify(b) > stableStringify(a) ? b : a;
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
    /* 词块的词性 / 其他义项 / 助记（来自 AI 回答或内置表）：按词块键并集，同一个键本机优先、缺的字段取云端 */
    const notesR = r.chunkNotes && typeof r.chunkNotes === 'object' ? r.chunkNotes : {};
    const notesL = l.chunkNotes && typeof l.chunkNotes === 'object' ? l.chunkNotes : {};
    const notesMerged = {};
    keys(notesR).concat(keys(notesL)).forEach(k => {
      if (notesMerged[k]) return;
      const a = notesL[k] || {}, b = notesR[k] || {};
      const one = {
        pos: a.pos || b.pos || '',
        senses: (Array.isArray(a.senses) && a.senses.length ? a.senses : (Array.isArray(b.senses) ? b.senses : [])).slice(0, 4),
        mnemonic: a.mnemonic || b.mnemonic || ''
      };
      if (one.pos || one.senses.length || one.mnemonic) notesMerged[k] = one;
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
    if (keys(notesMerged).length) entry.chunkNotes = notesMerged;
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
/* 接线帮助函数：元素不存在也不抛错，只把选择器记下来。
   早先这里全是裸的 $('#x').onclick = ...：改页面时漏掉或改名一个 id，init() 就在那一行
   抛 TypeError，后面的接线、renderAll()、定时器全都不执行，表现是「页面能打开但按钮全哑」，
   而且没有任何提示（整个 app.js 只有 2 处 console）。 */
const bindMisses = [];
function bind(target, evt, fn){
  const el = typeof target === 'string' ? $(target) : target;
  if (!el){ if (typeof target === 'string') bindMisses.push(target); return null; }
  el.addEventListener(evt, fn);
  return el;
}

/* 初始化出问题时，一定在界面上留一句看得懂的话：不打开控制台也知道发生了什么、笔记有没有丢 */
function reportUiIssue(title, detail){
  try{
    const prev = document.getElementById('bootIssue');
    if (prev && prev.parentNode) prev.parentNode.removeChild(prev);
    const bar = document.createElement('div');
    bar.id = 'bootIssue';
    bar.setAttribute('role', 'alert');
    bar.style.cssText = 'position:fixed;left:12px;right:12px;bottom:12px;z-index:9999;padding:12px 40px 12px 14px;'
      + 'border-radius:8px;background:#7f1d1d;color:#fff;font:13px/1.6 system-ui,"Microsoft YaHei",sans-serif;'
      + 'white-space:pre-wrap;word-break:break-word;box-shadow:0 6px 24px rgba(0,0,0,.35)';
    const head = document.createElement('div');
    head.style.cssText = 'font-weight:600;margin-bottom:2px';
    head.textContent = title;
    const body = document.createElement('div');
    body.textContent = detail;
    const close = document.createElement('button');
    close.type = 'button';
    close.textContent = '关闭';
    close.style.cssText = 'position:absolute;top:8px;right:10px;border:0;background:none;color:#fff;'
      + 'font:12px system-ui,sans-serif;cursor:pointer;opacity:.85';
    close.onclick = () => { if (bar.parentNode) bar.parentNode.removeChild(bar); };
    bar.appendChild(head); bar.appendChild(body); bar.appendChild(close);
    (document.body || document.documentElement).appendChild(bar);
  }catch(e){}
}

function boot(){
  try{
    init();
  }catch(err){
    console.error('[init] 界面初始化失败', err);
    reportUiIssue('界面初始化失败', ((err && err.message) || String(err))
      + '\n你的笔记还在浏览器本地存储里，没有被删除。刷新页面可以再试一次；反复出现请把这条信息反馈给开发者。');
    throw err;   // 保留完整栈，方便在 DevTools 里看
  }
  if (bindMisses.length){
    /* 只有改过 HTML 才会出现；用户自己处理不了，所以给一条可关闭的提示，不弹窗打断 */
    console.warn('[init] 这些元素没找到，相关操作不会响应：' + bindMisses.join(', '));
    reportUiIssue('界面元素缺失（不影响已有笔记）', bindMisses.join(', ')
      + '\n这些按钮或输入框暂时不会响应。多半是页面文件与脚本版本不一致，刷新或重新安装一般能修好。');
  }
}

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

  bind('#btnAddToday', 'click', () => openModal());
  bind('#btnAddChunks', 'click', () => openModal());
  bind('#btnGoLearn', 'click', () => showPage('learn'));
  bind('#btnGoReview', 'click', () => { reviewState = { queue:[], index:0, revealed:false, goodCount:0, total:0, wrong:[] }; showPage('review'); });

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
  bind('#levelChips', 'click', e => {
    const b = e.target.closest('.chip'); if (!b) return;
    learnState.level = b.dataset.level;
    renderLearnList();
  });

  bind('#btnAddArticle', 'click', () => openArticleModal());

  /* 按等级 + 进度生成复习短文（只用现有语料，不联网） */
  bind('#btnGenLesson', 'click', () => genReviewLessonNow());

  /* 错题本：筛选 chips + 卡片内的事件委托（CSP 不允许内联事件） */
  bindMistakeEvents();

  /* 全站的框选翻译/收词块：只在 document 上绑一次，别在每个 .para 上重复绑 */
  bindGlobalSelection();

  /* 「让 AI 写一篇」：提示词随难度/主题变化，点复制即可粘给任意 AI */
  bind('#btnCopyPrompt', 'click', async () => {
    refreshAiPrompt();
    const box = $('#aPrompt');
    const ok = await copyText(box ? box.value : '');
    toast(ok ? '提示词已复制，粘贴给 AI 就行' : '复制失败：可以点开文本框手动全选复制');
  });
  bind('#btnRefreshPrompt', 'click', () => { refreshAiPrompt(); toast('已按当前难度、主题和句数重新生成'); });
  bind('#btnParseAi', 'click', fillFromAiOutput);
  ['#aLevel', '#aTopic', '#aSentCount'].forEach(sel => {
    const el = $(sel);
    if (!el) return;
    el.addEventListener('input', refreshAiPrompt);
    el.addEventListener('change', refreshAiPrompt);
  });

  /* 逐句翻译 */
  bind('#btnAutoTranslate', 'click', async () => {
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
  });

  bind('#btnClearZh', 'click', () => { $('#aTextZh').value = ''; updateAlignNote(); $('#transStatus').textContent = ''; toast('已清空中文翻译'); });

  bind('#aText', 'input', updateAlignNote);
  bind('#aTextZh', 'input', updateAlignNote);

  /* 保存文章 */
  bind('#articleForm', 'submit', async e => {
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
      const filledNotes = applyChunkNotes(lesson, pendingChunkNotes);
      if (textChanged) clearLessonProg(lesson.id);
      saveState();
      closeArticleModal();
      const updated = textChanged ? '文章已更新，已重新分析' : '文章已更新';
      toast(filledNotes ? `${updated}，${filledNotes} 个词块补上了中文意思` : updated);
      renderLearn();
    } else {
      const newLesson = normalizeLesson({
        id: 'custom_' + uid(),
        title, titleZh: $('#aTitleZh').value.trim(), level: $('#aLevel').value, topic: $('#aTopic').value.trim(),
        text: textArr, textZh: zhArr, minutes, chunks: [], quiz: [], cloze: []
      });
      analyzeLesson(newLesson, { force: true });
      const filledNotes = applyChunkNotes(newLesson, pendingChunkNotes);
      if (!state.customLessons) state.customLessons = [];
      state.customLessons.unshift(newLesson);
      saveState();
      closeArticleModal();
      const parts = [`已添加 ${newLesson.text.length} 句英文`];
      if (newLesson.textZh.filter(Boolean).length) parts.push(`${newLesson.textZh.filter(Boolean).length} 句中文`);
      if (newLesson.chunks.length) parts.push(`识别 ${newLesson.chunks.length} 个词块`);
      if (filledNotes) parts.push(`${filledNotes} 个词块补上了中文意思`);
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
  bind('#articleClose', 'click', closeArticleModal);
  bind('#articleCancel', 'click', closeArticleModal);
  bind('#articleModal', 'click', e => { if (e.target.id === 'articleModal') closeArticleModal(); });

  function toggleManual(li){
    const id = li.dataset.check; const log = ensureLog();
    if (id === 'input')  log.inputDone  = !log.inputDone;
    if (id === 'output') log.outputDone = !log.outputDone;
    touchActivity(); saveState(); renderToday();
  }
  bind('#checklist', 'click', e => { const li = e.target.closest('li.manual'); if (li) toggleManual(li); });
  bind('#checklist', 'keydown', e => {
    const li = e.target.closest('li.manual'); if (!li) return;
    if (e.key === ' ' || e.key === 'Enter'){ e.preventDefault(); toggleManual(li); }
  });

  bind('#chunkForm', 'submit', e => {
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
  bind('#modalClose', 'click', closeModal);
  bind('#modalCancel', 'click', closeModal);
  bind('#modal', 'click', e => { if (e.target.id === 'modal') closeModal(); });

  let searchTimer = null;
  bind('#searchBox', 'input', e => {
    /* 立刻取值，不在定时器里读事件对象 */
    const v = e.target.value;
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => { searchTerm = v.trim(); renderChunks(); }, 150);
  });
  bind('#filterBar', 'click', e => { const b = e.target.closest('button'); if (!b) return; chunkFilter = b.dataset.f; renderChunks(); });
  bind('#sortBy', 'change', e => { sortBy = e.target.value; renderChunks(); });
  bind('#sourceFilter', 'change', e => { chunkSource = e.target.value; renderChunks(); });
  bind('#btnDelPicked', 'click', () => {
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
  });
  bind('#chunkList', 'change', e => {
    const box = e.target.closest('[data-pick]');
    if (!box) return;
    if (box.checked) pickedIds.add(box.dataset.pick); else pickedIds.delete(box.dataset.pick);
  });
  bind('#chunkList', 'click', e => {
    const editBtn = e.target.closest('[data-edit]'); const delBtn = e.target.closest('[data-del]');
    if (editBtn){ const c = state.chunks.find(x => x.id === editBtn.dataset.edit); if (c) openModal(c); }
    if (delBtn) deleteChunk(delBtn.dataset.del);
  });

  bind('#weekSelect', 'change', e => { state.settings.currentWeek = Number(e.target.value); saveState(); renderPlan(); });

  /* 问 AI 的站点：下拉选一个就存；自己填的网址点「保存」（也支持回车） */
  const aiSel = $('#aiSiteSelect');
  bind(aiSel, 'change', () => setAiSite(aiSel.value));
  bind('#btnSaveAiSite', 'click', () => setAiSite($('#aiSiteUrl').value));
  const aiInput = $('#aiSiteUrl');
  bind(aiInput, 'keydown', e => { if (e.key === 'Enter'){ e.preventDefault(); setAiSite(aiInput.value); } });

  bind('#btnExport', 'click', () => {
    /* 备份里不带译文缓存：它是可再生的一次性数据，导入时也从来不读（见下面的按字段合并），
       带上只会把备份文件从几十 KB 撑到几 MB。 */
    const payload = Object.assign(withoutTrCache(state), { exportedAt: new Date().toISOString() });
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
  });

  bind('#btnExportCsv', 'click', exportChunksCsv);
  bind('#btnExportAnki', 'click', exportChunksAnki);

  bind('#btnImport', 'click', () => $('#fileInput').click());
  bind('#fileInput', 'change', e => {
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

  bind('#btnReset', 'click', () => {
    if (!confirm('确定清空全部词块、记录和自定义文章吗？此操作不可恢复。')) return;
    if (!confirm('再确认一次：真的要清空吗？')) return;
    state = defaultState(); saveState();
    reviewState = { queue:[], index:0, revealed:false, goodCount:0, total:0, wrong:[] };
    learnState = { level:'all', lessonId:null, quizAnswers:{}, clozeValues:{}, clozeResults:{}, showTrans:false };
    renderAll(); renderPlan(); renderLearn(); toast('已清空');
  });

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
  /* 离线词典与词形表异步加载，加载完再刷一遍页面（没有 data/ 下的文件就什么都不做） */
  loadOfflineData();

  let lastDay = todayStr();
  setInterval(() => { const now = todayStr(); if (now !== lastDay){ lastDay = now; renderAll(); } }, 60000);
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
else boot();
