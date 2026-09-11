import type { Paper } from "@/types";

const paper = (id: string, title: string, year: number, venue: string, tags: string[], abstract: string, sourceUrl?: string): Paper => ({ id, title, authors: "Xiwen Yao and collaborators", year, venue, tags, abstract, sourceUrl, status: "unread", rating: 0, progress: 0, importance: "medium" });

export const yaoXiwenPapers: Paper[] = [
  paper("yao-001", "When Deep Learning Meets Metric Learning: Remote Sensing Image Scene Classification via Learning Discriminative CNNs", 2018, "IEEE TGRS", ["姚西文文献", "场景分类", "Metric Learning"], "结合分类损失与度量学习，增强类内紧凑性和类间可分性。"),
  paper("yao-002", "Remote Sensing Image Scene Classification Using Bag of Convolutional Features", 2017, "IEEE GRSL", ["姚西文文献", "场景分类", "CNN"], "将卷积特征组织为特征词袋，兼顾局部信息和整体场景表达。"),
  paper("yao-003", "Exploring Hierarchical Convolutional Features for Hyperspectral Image Classification", 2018, "IEEE TGRS", ["姚西文文献", "高光谱", "多尺度特征"], "利用不同网络层级的特征提升高光谱图像分类。"),
  paper("yao-004", "Oriented R-CNN for Object Detection", 2021, "ICCV", ["姚西文文献", "旋转目标检测", "DOTA"], "通过 Oriented RPN 生成高质量旋转候选框，兼顾精度与速度。", "https://openaccess.thecvf.com/content/ICCV2021/html/Xie_Oriented_R-CNN_for_Object_Detection_ICCV_2021_paper.html"),
  paper("yao-005", "Cross-Scale Feature Fusion for Object Detection in Optical Remote Sensing Images", 0, "IEEE GRSL · 年份待补充", ["姚西文文献", "目标检测", "特征融合"], "通过跨尺度特征融合提升遥感小目标检测能力。"),
  paper("yao-006", "Object Detection in Remote Sensing Images Based on Improved Bounding Box Regression and Multi-Level Features Fusion", 2020, "Remote Sensing", ["姚西文文献", "目标检测", "边界框回归"], "同时改进边界框回归和多层特征融合，提升目标定位精度。"),
  paper("yao-007", "动态特征融合的遥感图像目标检测", 2022, "计算机学报", ["姚西文文献", "目标检测", "动态融合"], "根据图像内容动态调节多尺度特征的融合权重。"),
  paper("yao-008", "Semantic Annotation of High-Resolution Satellite Images via Weakly Supervised Learning", 2016, "IEEE TGRS", ["姚西文文献", "弱监督", "语义标注"], "使用较弱监督信息完成高分辨率卫星影像语义标注。"),
  paper("yao-009", "Automatic Weakly Supervised Object Detection From High Spatial Resolution Remote Sensing Images via Dynamic Curriculum Learning", 2021, "IEEE TGRS", ["姚西文文献", "弱监督", "课程学习"], "由可靠样本逐步学习困难样本，降低弱标签噪声影响。"),
  paper("yao-010", "Progressive Contextual Instance Refinement for Weakly Supervised Object Detection in Remote Sensing Images", 2020, "IEEE TGRS", ["姚西文文献", "弱监督", "上下文"], "利用上下文和渐进式实例优化，缓解只发现目标局部区域的问题。"),
  paper("yao-011", "TCANet: Triple Context-Aware Network for Weakly Supervised Object Detection in Remote Sensing Images", 0, "IEEE TGRS · 年份待补充", ["姚西文文献", "弱监督", "上下文"], "从多种上下文关系中挖掘监督信息，提升弱监督目标定位完整性。"),
  paper("yao-012", "Weakly Supervised Rotation-Invariant Aerial Object Detection Network", 2022, "CVPR", ["姚西文文献", "弱监督", "旋转不变性"], "通过旋转一致性监督提升任意方向目标检测，无需额外标注。", "https://openaccess.thecvf.com/content/CVPR2022/html/Feng_Weakly_Supervised_Rotation-Invariant_Aerial_Object_Detection_Network_CVPR_2022_paper.html"),
  paper("yao-013", "DLA-MatchNet for Few-Shot Remote Sensing Image Scene Classification", 0, "IEEE TGRS · 年份待补充", ["姚西文文献", "少样本", "场景分类"], "通过更有效的特征匹配提升少样本遥感新类别识别。"),
  paper("yao-014", "DFENet for Domain Adaptation Based Remote Sensing Scene Classification", 2022, "IEEE TGRS", ["姚西文文献", "域适应", "场景分类"], "应对不同传感器、地区和数据集之间的分布差异。"),
  paper("yao-015", "Learning Non-Target Knowledge for Few-Shot Semantic Segmentation", 2022, "CVPR", ["姚西文文献", "少样本", "语义分割"], "显式建模背景和干扰物知识，通过排除非目标区域提升少样本分割。", "https://openaccess.thecvf.com/content/CVPR2022/html/Liu_Learning_Non-Target_Knowledge_for_Few-Shot_Semantic_Segmentation_CVPR_2022_paper.html"),
  paper("yao-016", "Multi-grained Temporal Prototype Learning for Few-shot Video Object Segmentation", 2023, "ICCV", ["姚西文文献", "少样本", "视频分割"], "利用帧、片段与长期记忆的多粒度时序原型完成少样本视频分割。", "https://openaccess.thecvf.com/content/ICCV2023/html/Liu_Multi-grained_Temporal_Prototype_Learning_for_Few-shot_Video_Object_Segmentation_ICCV_2023_paper.html"),
  paper("yao-017", "Towards Large-Scale Small Object Detection: Survey and Benchmarks", 2023, "IEEE TPAMI", ["姚西文文献", "小目标检测", "综述"], "面向大规模小目标检测的系统综述与基准研究。", "https://arxiv.org/abs/2207.14096"),
  paper("yao-018", "光学遥感图像目标检测数据集综述", 2023, "遥感学报", ["姚西文文献", "数据集", "综述"], "系统比较公开光学遥感目标检测数据集的规模、类别、分辨率和标注方式。", "https://hgs.publish.founderss.cn/rc-pub/front/front-article/download/47282257/lowqualitypdf/%E5%85%89%E5%AD%A6%E9%81%A5%E6%84%9F%E5%9B%BE%E5%83%8F%E7%9B%AE%E6%A0%87%E6%A3%80%E6%B5%8B%E6%95%B0%E6%8D%AE%E9%9B%86%E7%BB%BC%E8%BF%B0.pdf"),
  paper("yao-019", "MAR20：遥感图像军用飞机目标识别数据集", 2023, "遥感学报", ["姚西文文献", "数据集", "飞机识别"], "建设细粒度军用飞机识别数据集，为算法比较提供统一基础。"),
  paper("yao-020", "面向SAR图像解译的物理可解释深度学习技术进展与探讨", 2022, "雷达学报", ["姚西文文献", "SAR", "可解释深度学习"], "融合 SAR 成像物理模型与数据驱动深度学习，提高物理合理性和可解释性。", "https://www.researchgate.net/profile/Zhongling-Huang/publication/359424199_Progress_and_Perspective_on_Physically_Explainable_Deep_Learning_for_Synthetic_Aperture_Radar_Image_Interpretation/links/6256d7b0709c5c2adb784b21/Progress-and-Perspective-on-Physically-Explainable-Deep-Learning-for-Synthetic-Aperture-Radar-Image-Interpretation.pdf"),
];
