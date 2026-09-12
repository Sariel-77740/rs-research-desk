import type { Course } from "@/types";

const meeting = (id: string, weekday: string, weeks: string, periods: string, classroom: string) => ({ id, weekday, weeks, periods, classroom });

export const courses: Course[] = [
  { id: "course-001", code: "M03L21004", name: "科技论文和报告的设计、组织与撰写", school: "航海学院", teacher: "陈效鹏", className: "01", credits: "", meetings: [meeting("m1", "周一", "第3-6周", "7-10节", "长安-教学西楼D座-教西D-301")], deadlines: [], notes: "", attachments: [] },
  { id: "course-002", code: "M09L11206", name: "目标跟踪研究前沿", school: "自动化学院", teacher: "李天成", className: "01", credits: "", meetings: [meeting("m1", "周二", "第2周", "7-10节", "长安-教学东楼B座-教东B1-301"), meeting("m2", "周二", "第6周", "7-10节", "长安-教学东楼B座-教东B1-101"), meeting("m3", "周二", "第7-9周", "7-10节", "长安-教学东楼D座-教东D1-403"), meeting("m4", "周四", "第3-5周", "7-10节", "长安-教学东楼B座-教东B1-401")], deadlines: [], notes: "", attachments: [] },
  { id: "course-003", code: "M09L11226", name: "深度学习从原理到应用", school: "自动化学院", teacher: "夏辰", className: "01", credits: "", meetings: [meeting("m1", "周六", "第2-9周", "1-4节", "长安-教学西楼C座-教西C2-201")], deadlines: [], notes: "", attachments: [] },
  { id: "course-004", code: "M09M11083", name: "模式识别方法", school: "自动化学院", teacher: "张绍武", className: "01", credits: "", meetings: [meeting("m1", "周三", "第6-16周", "11-13节", "长安-教学东楼D座-教东D1-203")], deadlines: [], notes: "", attachments: [] },
  { id: "course-005", code: "M09M11161", name: "深度学习与遥感图像分析", school: "自动化学院", teacher: "黄钟冷", className: "01", credits: "", meetings: [meeting("m1", "周五", "第2-9周", "11-12节", "长安-教学东楼D座-教东D2-205"), meeting("m2", "周六", "第2-9周", "11-12节", "长安-教学东楼D座-教东D2-205")], deadlines: [], notes: "", attachments: [] },
  { id: "course-006", code: "M09M11249", name: "计算机视觉前沿进展", school: "自动化学院", teacher: "", className: "01", credits: "", meetings: [meeting("m1", "周三", "第6-13周", "节次待补充", "地点待补充")], deadlines: [], notes: "", attachments: [] },
  { id: "course-007", code: "M11G11002", name: "数值分析", school: "数学与统计学院", teacher: "王振海", className: "07", credits: "", meetings: [meeting("m1", "周二", "第3-14周", "3-4节", "长安-教学西楼A座-教西A-201"), meeting("m2", "周四", "第3-14周", "3-4节", "长安-教学西楼A座-教西A-201")], deadlines: [], notes: "", attachments: [] },
  { id: "course-008", code: "M11G11004", name: "数理统计", school: "数学与统计学院", teacher: "唐亚宁", className: "08", credits: "", meetings: [meeting("m1", "周三", "第3-14周", "1-2节", "长安-教学西楼A座-教西A-303"), meeting("m2", "周五", "第3-14周", "1-2节", "长安-教学西楼A座-教西A-303")], deadlines: [], notes: "", attachments: [] },
];
