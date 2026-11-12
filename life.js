const routeNames=['机会捕手','实力变现家','表达增长者','资源连接者','稳健经营者','审慎规划者'];
const avatars=['opportunity-scout.png','skill-monetizer.png','expressive-grower.png','resource-connector.png','steady-operator.png','prudent-planner.png'];
const tags=['opportunity','skill','expression','connection','operation','caution'];
const abilities=[
  '小规模验证新需求时，更容易拿到第一批反馈。',
  '认真交付能更快形成口碑，但别无限加班。',
  '清楚表达价值时，更容易得到信任与订单。',
  '促成互利合作时，更容易积累稳定关系。',
  '梳理流程和成本时，更能守住经营基本盘。',
  '识别风险并守住底线时，更容易避免不必要的损失。'
];
const perks=[{cash:2500,happy:2},{cash:2000,relation:2},{cash:2200,happy:2},{cash:1500,relation:4},{cash:1800,health:2},{cash:2500,health:2}];
const C=(label,result,cash,health,relation,happy,tag='')=>({label,result,delta:{cash,health,relation,happy},tag});
const E=(title,story,kind,...choices)=>({title,story,kind,choices});
const routes=[
  [
    E('校园里的代买需求','刚满 18 岁，你发现同学总在抱怨校外采购麻烦。课业、兼职和第一个小点子同时摆在面前。','事业',
      C('先向十位同学确认需求，再小范围试单','你只服务了几个人，却摸清了真实需求。',2500,-2,1,3,'opportunity'),C('直接进一批货，抢在别人前面开卖','货卖出一部分，剩下的占住了你的钱。',-3500,-3,0,1),C('先做稳定兼职，不急着试卖','收入不多，但你有了观察别人如何做生意的时间。',2500,-1,1,0)),
    E('一个被忽视的细分人群','你发现周围很多人卖同样的东西，却没人照顾夜班学生的需求。','事业',
      C('做一周夜间服务实验','试验规模小，却有第一批回头客。',3500,-4,-1,3,'opportunity'),C('照着热门摊位的品类做','你省了思考时间，也卷进了价格竞争。',1500,-3,0,-1),C('先向夜班学生收集意见','你没立刻赚钱，但把需求记得更清楚。',0,-1,1,2)),
    E('突然出现的合作邀请','一位熟人看中你的观察力，邀请你做推广，条件是先垫钱。','风险',
      C('要求小额试合作和明确结算','合作慢了一点，但你守住了现金。',2000,-1,1,2,'opportunity'),C('相信对方，先把钱垫上','项目有动静，回款却一拖再拖。',-7000,-4,-2,-3),C('拒绝合作，继续做自己的小项目','你错过一部分机会，也保住了节奏。',1000,1,0,1)),
    E('家人需要你回去帮忙','家里突遇一笔支出。你准备扩大的小生意，正好需要同一笔钱。','家庭',
      C('先帮家里解决急事，暂缓扩张','家人感到被支持，你的小项目需要重新安排。',-6500,-2,9,1),C('说明困难，承担一半费用','你守住部分试错资金，也没有躲开责任。',-3200,-1,5,2),C('优先投入生意，等赚到钱再帮忙','扩张有了机会，家里的信任却受损。',3500,-4,-10,-3,'opportunity')),
    E('第一次真正的回头客','有人愿意为你解决的细小问题持续付费。你开始面对“专注还是继续找新机会”。','事业',
      C('聚焦这一项服务，记录复购原因','你没有再追逐热点，服务却渐渐稳定。',5500,-3,1,4,'opportunity'),C('同时开三个新项目','总收入增加了，注意力和睡眠开始吃紧。',7000,-9,-3,-2),C('把服务交给别人，自己继续找点子','你得到自由时间，但交付品质不够稳定。',3200,-1,-2,1)),
    E('身体发出提醒','连续几个月赶单后，你开始频繁失眠。新的热门需求又出现了。','健康',
      C('暂停接新单，先调整作息','收入放缓，睡眠和判断力逐渐恢复。',-2500,11,2,3),C('减少一半工作量，保留老客户','你学会给机会设置上限。',1500,6,1,2,'opportunity'),C('咬牙抓住这波热度','短期赚得更多，身体却透支得很快。',8000,-16,-3,-5)),
    E('把点子变成一条路','24 岁时，你能把某个真实需求做成小事业，也能选择更稳定的岗位。','事业',
      C('把服务做深，维持小规模经营','你终于学会让机会长成稳定收入。',6500,-3,2,5,'opportunity'),C('加入成熟团队，负责需求研究','收入更稳，你也继续发挥洞察力。',4500,2,3,2),C('借钱迅速扩张','规模变大了，债务和压力也随之而来。',10000,-12,-5,-4))
  ],
  [
    E('第一件拿得出手的作品','18 岁，你学会一门能接单的手艺。有人愿意付一点钱，但作品还不够完美。','事业',
      C('按约定交付第一单，再听反馈','客户满意，你也知道了真实标准。',2200,-2,2,3,'skill'),C('继续打磨半年后再发布','作品更细致，但第一笔收入仍没到来。',-1200,-4,0,1),C('先接一份不相关的兼职','你获得生活费，也暂时离专业更远。',2400,-2,0,-1)),
    E('客户提出额外修改','第一位老客户希望免费加很多内容，称做好以后会介绍新单。','事业',
      C('列出免费范围，超出部分报价','你守住交付质量，也学会说清边界。',3000,-2,2,3,'skill'),C('全部免费修改到满意','作品很漂亮，你却连续熬夜。',1000,-8,1,-2),C('直接拒绝，不再合作','省下了时间，也失去一次讨论边界的机会。',0,2,-3,-1)),
    E('低价大单','一家小公司给你不少工作，价格却压得很低。你还没有稳定客户。','事业',
      C('缩小交付范围，签清楚内容','单子变小了，但你按时做好并留下案例。',4000,-3,2,3,'skill'),C('全部接下，靠熬夜补差价','钱进来了，身心负担也很重。',7000,-12,-2,-3),C('放弃大单，专心做作品集','你暂时少赚钱，未来的报价依据更扎实。',-1500,1,0,2)),
    E('家人希望你找稳定工作','家人担心你接单收入不稳定，建议你进入一家固定薪水的公司。','家庭',
      C('试一年稳定工作，业余保留手艺','你缓和了家人的担心，也积累了行业经验。',2600,-3,6,1,'skill'),C('继续独立接单，但每月向家人说明收支','家人开始理解，你也必须对现金流更负责。',1500,-4,5,3),C('觉得不被理解，索性不再沟通','自由还在，家里的距离却拉远了。',2500,-3,-9,-3)),
    E('口碑开始传开','老客户带来新客户，你的时间却只有这么多。','事业',
      C('提高报价，保留精力做关键项目','订单少一点，质量和收入都更可控。',6000,-3,2,4,'skill'),C('所有人都接，争取趁热赚钱','钱明显增加，返工也越来越多。',8500,-11,-2,-3),C('请一位伙伴帮忙交付','你需要花时间教人，未来有了扩展空间。',3000,-4,3,2)),
    E('一双酸痛的手','长期重复劳动让你手腕不适，医生建议减少高强度工作。','健康',
      C('休养并调整工具与流程','短期接单减少，恢复后能继续做这门手艺。',-2500,12,1,2),C('把部分工作交给可信伙伴','你学会把质量标准讲给别人听。',1200,6,2,2,'skill'),C('忍痛赶完订单再说','客户如期收到作品，你的伤却加重了。',6500,-16,-1,-5)),
    E('工作室的第一扇门','24 岁，你有稳定客户，也有机会租一间小工作室。','事业',
      C('先做预约制，不急着扩大固定成本','小步经营让口碑稳稳积累。',5500,-2,2,5,'skill'),C('租下工作室并一次性购齐设备','空间很漂亮，租金压力也真实存在。',-7000,-6,0,3),C('加入成熟团队做资深职员','你获得稳定收入和学习机会。',4300,1,3,1))
  ],
  [
    E('第一次公开讲述','18 岁，你想把一个好用的小服务介绍给更多人，手指却停在发布键上。','事业',
      C('用真实体验做第一条介绍','浏览不算多，却有人认真询问。',1800,-1,2,4,'expression'),C('用夸张承诺换点击','流量来了，你开始担心无法兑现。',2500,-4,-3,0),C('先练习表达，不急着发布','你更熟练了，但还没获得真实反馈。',0,1,0,1)),
    E('一条内容忽然火了','大量陌生人涌来，问的问题远超你原本准备的范围。','事业',
      C('清楚说明能提供什么、不能提供什么','询问人数少一些，留下的客户更适合你。',3800,-2,3,3,'expression'),C('把所有流量都接住','收入上涨，交付风险也在积累。',6000,-9,-4,-2),C('暂时停止更新，整理常见问题','热度过去了，你得到一份扎实的答疑资料。',1000,1,1,1)),
    E('帮朋友推广','朋友希望你帮忙推一个你没用过的产品，愿意给你一笔推广费。','风险',
      C('先亲自试用，再决定是否介绍','你少了一次快钱机会，信任却更稳。',1400,-1,3,3,'expression'),C('凭朋友关系直接推荐','短期收入不错，质疑也随之而来。',5000,-3,-6,-4),C('婉拒推广，帮他改进介绍','没有推广费，朋友却接受了你的建议。',0,1,4,2)),
    E('家里的餐桌越来越安静','你每晚都在回复消息，家人说好久没一起吃一顿完整的饭。','家庭',
      C('规定晚上不接工作消息','有些客户离开，家里重新有了聊天。',-2000,5,8,3),C('安排固定陪伴时间并公开回复时段','你守住了沟通，也让客户知道何时能找到你。',800,2,6,3,'expression'),C('说这只是事业上升期','工作继续快跑，关系却越来越冷。',5000,-5,-10,-3)),
    E('从曝光到成交','你的内容有很多点赞，但实际订单不多。','事业',
      C('找三位用户问清楚为什么没买','你改掉了含糊说法，询问开始更具体。',4600,-2,2,4,'expression'),C('花钱买更多曝光','数字更好看，实际利润仍然有限。',-3000,-4,-1,-2),C('暂时转向稳定工作','收入稳了，个人品牌放慢增长。',2400,1,1,0)),
    E('嗓子和情绪都在抗议','连续直播与沟通让你声音沙哑，看到负面留言也难以入睡。','健康',
      C('暂停直播，调整发布节奏','你恢复了声音，也重新找到表达的乐趣。',-2500,12,2,3),C('把重复问题整理成固定内容','减少消耗的同时，回应仍然清楚。',1000,7,1,2,'expression'),C('继续每天直播','短期收入上涨，疲惫感更重。',7000,-16,-2,-5)),
    E('一次有分量的合作','24 岁，一个品牌邀请你长期合作。报价不错，但它想让你说得比事实更好。','事业',
      C('只接受能如实介绍的合作条款','合作慢一些，你保住了自己的信誉。',5500,-2,3,5,'expression'),C('接受高价并照稿宣传','这次拿到钱，长期信任开始摇晃。',10500,-6,-7,-5),C('退出合作，做自己的小产品','资金吃紧，表达也终于服务于自己的作品。',-2500,-4,1,3))
  ],
  [
    E('把两个人介绍给彼此','18 岁，你发现同学会做设计，附近小店又正好需要新菜单。','事业',
      C('先确认双方需求，再介绍认识','一次小合作成功了，两边都记住了你。',1500,-1,5,4,'connection'),C('直接答应两边包办所有事情','你忙得团团转，还要替别人处理误会。',2500,-6,-3,-2),C('只是把联系方式发给他们','事情省心，合作也没有真正推进。',0,1,1,0)),
    E('第一个小社群','你想把有相似需求的人聚在一起，但维持交流需要时间。','事业',
      C('设定清楚主题与规则，每周一次交流','人数不多，关系却扎实。',1800,-2,6,4,'connection'),C('什么话题都收，先把人数做大','群很热闹，真正有用的交流却少。',2800,-5,-2,-1),C('先参加别人的社群学习','你看到了别人如何处理边界。',300,0,2,1)),
    E('一笔没有写下来的分成','朋友说只要介绍客户就给你分成，但双方都没有留下约定。','风险',
      C('合作前把分工和分成写清楚','你显得有些较真，却避免了后来的误解。',2400,-1,4,3,'connection'),C('相信交情，先把客户介绍过去','成交了，分成却成了说不清的事。',500,-4,-6,-4),C('不参与这单，继续维护关系','你少赚了一笔钱，关系暂时平稳。',0,1,2,1)),
    E('家人不想只听你的安排','你为家人联系了更好的工作机会，对方却说想自己做决定。','家庭',
      C('先听他真正想要什么','你没有替他决定，关系反而更近了。',-500,1,8,3,'connection'),C('把准备好的关系资源交给他自行选择','你给了帮助，也尊重了边界。',0,0,6,2),C('坚持这就是最好的路','机会也许不错，信任却受了伤。',1400,-3,-9,-3)),
    E('社群出现争执','两位合作伙伴在公开场合互相指责，你夹在中间。','事业',
      C('分别核实，再组织有边界的沟通','解决速度慢一点，大家相信你会公平处理。',3600,-3,7,3,'connection'),C('先替关系更近的一方说话','你得到支持，也失去另一边的信任。',4500,-4,-7,-3),C('完全不介入','冲突继续扩大，社群氛围变差。',1500,0,-4,-2)),
    E('照顾所有人太累了','你几乎每天都在帮人解决问题，身体和情绪都发出提醒。','健康',
      C('暂停非紧急求助，留出休息时间','有人不习惯，但你终于有了自己的生活。',-1800,11,1,4),C('建立公开的求助流程','你不再一个人扛下所有事情。',1500,7,4,3,'connection'),C('继续当所有人的联系人','别人感激你，疲劳却更深。',6500,-16,-2,-5)),
    E('把信任做成事业','24 岁，你有机会建立一个正式的合作平台，也能继续做小范围介绍。','事业',
      C('明确收费和责任，先服务熟悉的圈子','平台慢慢长大，边界也更清楚。',5200,-2,6,5,'connection'),C('快速吸纳大量合作伙伴','增长很快，管理和纠纷也一起到来。',8500,-10,-4,-2),C('进入成熟企业做商务工作','你用既有能力换来稳定平台。',4200,0,3,1))
  ],
  [
    E('一家小店的忙乱早晨','18 岁，你在店里兼职，发现排队和备货总会撞在一起。','事业',
      C('做一张简单的备货与排班表','老板愿意试用，你第一次看见流程的价值。',1800,-1,2,3,'operation'),C('自己加班把问题扛下来','顾客少等了，你却一直很累。',2700,-7,0,-1),C('只完成分内工作','你保住精力，但问题仍然存在。',1200,1,0,0)),
    E('流程被别人忽略','你整理了步骤，伙伴却觉得照表做事太麻烦。','事业',
      C('邀请伙伴一起改成更顺手的版本','流程终于真正被使用。',2500,-2,3,3,'operation'),C('要求所有人严格照做','效率提高一些，团队却有怨气。',3200,-4,-5,-2),C('放弃表格，继续靠经验','冲突少了，错误也没有明显减少。',1500,-3,1,0)),
    E('第一次负责收支','老板让你试着负责一小块采购预算，供应商推荐更便宜的大批量方案。','风险',
      C('先核对销量，少量采购','成本控制住了，也没有压出太多库存。',3200,-2,2,3,'operation'),C('一次买满，争取低价','单价低了，卖不完的货占满仓库。',-3500,-4,-1,-2),C('沿用旧方案，暂不改动','没有新风险，也没有获得更多空间。',1300,0,0,0)),
    E('家里希望你更常出现','你负责的店进入旺季，家里却需要你分担照顾任务。','家庭',
      C('重新排班，固定一晚回家','收入少一点，家人知道你会出现。',-1000,2,8,3,'operation'),C('与家人商量临时分工并承担费用','你没有逃避，也让店能继续运转。',-2500,-2,6,1),C('旺季结束后再说','店里运转顺了，家里的难题却拖着。',4500,-5,-9,-3)),
    E('一间自己的小店','你有机会接手一家经营一般的小店，租金不低。','事业',
      C('先试运营三个月，按数据决定是否接手','你看到真正的问题，也控制了投入。',4000,-3,2,4,'operation'),C('立刻签长租并装修','店面焕然一新，现金流变得紧张。',-9000,-7,-1,1),C('留在现有岗位继续积累','收入稳定，你也多了一年学习。',2700,1,1,0)),
    E('没有一天真正休息','店里的每件小事都要你决定，健康开始下滑。','健康',
      C('培养一位能独立值班的伙伴','前期费心，后来你终于能休息。',-1200,10,3,3,'operation'),C('暂停扩张，固定休息日','收入暂缓增长，身体逐渐恢复。',-1800,11,2,3),C('继续亲力亲为','营业额上升，你却越来越难睡好。',7600,-17,-3,-5)),
    E('复制还是守住一家店','24 岁，第二家店的机会出现了。第一家店还需要你亲自盯着。','事业',
      C('先把一家店的标准和现金流做稳','你没有立刻扩张，但经营更踏实。',5200,-2,3,5,'operation'),C('马上开第二家店','收入机会变大，资金与精力都被拉紧。',9800,-12,-4,-3),C('寻找可信经理接手第一家','你拿出时间培养别人，也获得新空间。',3500,-4,4,2))
  ],
  [
    E('第一笔积蓄怎么用','18 岁，你攒下一点钱。有人推荐高收益项目，家里则希望你留着应急。','风险',
      C('留出应急金，只用少量钱了解项目','你没有暴富，却守住了选择权。',1400,1,3,2,'caution'),C('把积蓄全部投入','数字看起来诱人，你也承担了超出能力的风险。',-5000,-3,-4,-4),C('一分钱都不尝试','钱留住了，你仍对市场一无所知。',400,1,1,-1)),
    E('课程和工作的选择','你可以花钱学一项新技能，也可以立刻接一份薪水普通的工作。','事业',
      C('比较课程成果后，边工作边学','进展不快，但能力和现金流都没有断。',1800,-3,2,3,'caution'),C('借钱报最贵的课程','学习很投入，还款压力也一直在。',-7000,-5,-2,-2),C('只求稳定，暂时不学习','生活平稳，你开始担心几年后还会原地踏步。',2700,0,1,-1)),
    E('朋友邀你做合伙人','朋友看中你的谨慎，想让你帮忙管理账目，但合作条款还没写好。','风险',
      C('先写清投入、退出与责任','进度变慢，合作却有了可信的基础。',2600,-1,3,3,'caution'),C('相信友情，先投入再谈','你们很快开工，分歧也很快出现。',-5000,-4,-7,-3),C('完全拒绝，不再讨论','你避开风险，也让朋友觉得被怀疑。',0,1,-3,-1)),
    E('家里的紧急开支','家人生病需要花钱，你刚建立的应急金终于有了用处。','家庭',
      C('用应急金支付，并一起制定后续预算','钱少了，家人感到你可靠。',-5500,-2,9,2,'caution'),C('承担一半，寻找其他援助','你照顾家人，也保留了基本缓冲。',-3000,-2,6,1),C('担心影响规划，暂时不出钱','存款在，家人的失望也在。',1000,-2,-11,-4)),
    E('一次错过的机会','你曾经看好的小生意做起来了，朋友说你当初太保守。','事业',
      C('复盘当时的信息，做一个可控的小实验','你没追回过去，却学会区分谨慎和拖延。',3500,-2,1,4,'caution'),C('为了证明自己，追投更大的项目','行动很快，风险也超过了计划。',-8000,-7,-2,-3),C('告诉自己以后绝不尝试','损失避免了，遗憾却更重。',1500,1,0,-3)),
    E('体检报告上的提醒','长期紧绷让你睡眠变差，检查结果需要进一步复查。','健康',
      C('及时复查并调整作息','花了一些钱，你得到更清楚的身体信息。',-2400,12,2,3,'caution'),C('暂时减轻工作，观察一段时间','压力缓和，但仍要记得复查。',-1000,7,1,2),C('不想打乱计划，继续硬撑','收入照常进来，健康风险也在累积。',6100,-16,-2,-5)),
    E('留有余地的下一步','24 岁，你已经有一定积蓄。稳定岗位和小规模副业都向你敞开。','事业',
      C('保留本职工作，限定预算试一次副业','你迈出新一步，同时保留了退路。',4800,-2,2,5,'caution'),C('把所有积蓄押在副业上','可能赚得快，但一旦失败代价很大。',8700,-11,-4,-3),C('只保留工作，继续等待更确定的时机','生活稳定，探索的心却没有消失。',3200,1,2,-1))
  ]
];

const $=id=>document.getElementById(id),key='moneyTalentLifeV1',talentKey='moneyTalentResultV1';
const flow=[2000,5000,8000,11000,16000,19000,23000]; // 每年基础收入扣除生活开销后的净额，原型调参值。
const names={cash:'财富',health:'健康',relation:'关系',happy:'幸福感'};
const clamp=n=>Math.max(0,Math.min(100,n));
const money=n=>(n<0?'-':'')+'¥'+Math.abs(n).toLocaleString('zh-CN');
const validRoute=n=>Number.isInteger(n)&&n>=0&&n<routes.length;
const query=new URLSearchParams(location.search),queryRoute=Number(query.get('talent'));
let route=null;
try{const saved=localStorage.getItem(talentKey),n=Number(saved);if(saved!==null&&validRoute(n)&&(!query.has('talent')||n===queryRoute))route=n}catch{}
let state=null;
function save(){try{localStorage.setItem(key,JSON.stringify(state))}catch{$('saveStatus').textContent='当前环境无法保存进度，请一次玩完本章。';$('saveStatus').classList.remove('hidden')}}
function load(){try{const s=JSON.parse(localStorage.getItem(key));if(s&&s.version===1&&validRoute(s.route)&&Number.isInteger(s.age)&&s.age>=18&&s.age<=24&&['choice','result','final'].includes(s.phase)&&Number.isFinite(s.cash)&&['health','relation','happy'].every(k=>Number.isInteger(s[k])&&s[k]>=0&&s[k]<=100)&&Array.isArray(s.history)&&s.history.length<=7&&(s.phase!=='result'||s.last&&typeof s.last.text==='string'&&Array.isArray(s.last.changes)))return s}catch{}return null}
function fresh(){return{version:1,route,age:18,cash:3000,health:72,relation:60,happy:62,phase:'choice',history:[],last:null,reason:null}}
function show(id){['intro','game','final'].forEach(x=>$(x).classList.toggle('hidden',x!==id));window.scrollTo(0,0)}
function setImage(id){$(id).src=avatars[route];$(id).alt=routeNames[route]+' Q 版画像'}
function intro(){setImage('introAvatar');$('introTitle').textContent='从普通人开始，走出'+routeNames[route]+'的人生';$('introCopy').textContent=abilities[route];const saved=load();$('begin').textContent=saved&&saved.route===route?'继续这段人生':'从 18 岁开始';show('intro')}
function values(){ $('cash').textContent=money(state.cash);$('health').textContent=state.health;$('relation').textContent=state.relation;$('happy').textContent=state.happy }
function current(){const e=routes[route][state.age-18];$('age').innerHTML=state.age+'<span> 岁</span>';$('yearLabel').textContent='第 '+(state.age-17)+' / 7 年';$('progressBar').style.width=(state.age-18)/7*100+'%';values();setImage('routeAvatar');$('routeName').textContent=routeNames[route];$('routeAbility').textContent=abilities[route];$('eventKind').textContent=e.kind+' · '+state.age+' 岁';$('eventTitle').textContent=e.title;let story=e.story;if(state.age>=22&&state.health<40)story+=' 身体的疲惫已经影响你做决定的余地。';if(state.age>=22&&state.relation<35)story+=' 家人之间尚未修复的隔阂仍在。';$('eventStory').textContent=story;$('options').replaceChildren(...e.choices.map((c,i)=>{const b=document.createElement('button');b.className='choice';b.type='button';const mark=document.createElement('span');mark.textContent=String.fromCharCode(65+i);b.append(mark,document.createTextNode(c.label));b.onclick=()=>choose(i);return b}));$('options').classList.toggle('hidden',state.phase==='result');$('outcome').classList.toggle('hidden',state.phase!=='result');$('next').classList.toggle('hidden',state.phase!=='result');$('next').textContent=state.reason||state.age===24?'查看阶段报告':'进入下一年';if(state.phase==='result')result();show('game')}
function choose(i){if(state.phase!=='choice')return;const e=routes[route][state.age-18],c=e.choices[i],before={cash:state.cash,health:state.health,relation:state.relation,happy:state.happy};for(const k of Object.keys(before))state[k]+=c.delta[k];let perk=false;if(c.tag===tags[route]){perk=true;for(const [k,v] of Object.entries(perks[route]))state[k]+=v}const net=flow[state.age-18],healthPenalty=before.health<35?Math.round(net*.3):0;state.cash+=net-healthPenalty;state.health=clamp(state.health-3);state.relation=clamp(state.relation);state.happy=clamp(state.happy+(before.relation<35?-3:before.relation>=70?2:0));if(state.cash<0)state.cash=Math.round(state.cash*1.08);state.history.push({age:state.age,title:e.title,choice:c.label,perk});state.phase='result';state.last={text:c.result+(perk?' '+routeNames[route]+'的天赋发挥了作用。':''),changes:Object.keys(before).map(k=>({name:names[k],value:state[k]-before[k]})),net,healthPenalty};if(state.health===0)state.reason='你的健康已无法支撑继续前行。';save();current()}
function result(){const l=state.last;$('outcomeText').textContent=l.text;$('changes').replaceChildren(...l.changes.map(c=>{const x=document.createElement('span');x.className=c.value<0?'negative':'';x.textContent=c.name+' '+(c.value>=0?'+':'')+(c.name==='财富'?money(c.value):c.value);return x}));$('settle').textContent='年度基础收支 '+money(l.net)+(l.healthPenalty?'；健康透支使收入减少 '+money(l.healthPenalty):'')+(state.cash<0?'；负债产生 8% 年度成本':'')+'；年龄增长使健康 -3。'}
function final(){setImage('finalAvatar');$('finalTitle').textContent=state.reason?'这一章提前结束':'你的 18–24 岁，刚刚写下开头';$('finalCopy').textContent=state.reason||('作为'+routeNames[route]+'，你完成了人生的第一个阶段。'+(state.cash>=60000?'你建立了初步的经济缓冲。':'你仍在寻找更稳的经济基础。')+(state.health<40?'身体正在提醒你放慢脚步。':'你还有继续尝试的余地。'));$('finalCash').textContent=money(state.cash);$('finalHealth').textContent=state.health;$('finalRelation').textContent=state.relation;$('finalHappy').textContent=state.happy;$('highlights').replaceChildren(...state.history.slice(-3).map(h=>{const li=document.createElement('li');li.textContent=h.age+' 岁：'+h.title+'——'+h.choice;return li}));state.phase='final';save();show('final')}
$('begin').onclick=()=>{const saved=load();state=saved&&saved.route===route?saved:fresh();save();state.phase==='final'?final():current()};
$('next').onclick=()=>{if(state.phase!=='result')return;if(state.reason||state.age===24){final();return}state.age++;state.phase='choice';state.last=null;save();current()};
$('exit').onclick=()=>intro();
$('restart').onclick=()=>{state=fresh();save();current()};
if(route===null){$('intro').classList.remove('hidden');$('introTitle').textContent='先测出你的搞钱天赋';$('introCopy').textContent='完成 24 道测试题后，才能进入对应的人生主线。';$('begin').classList.add('hidden');$('introAvatar').classList.add('hidden')}else intro();
