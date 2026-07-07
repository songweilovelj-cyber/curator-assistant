import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Sparkles, FileText, Download, RefreshCw, CheckCircle, AlertCircle, ChevronRight } from 'lucide-react'
import { useHeritagePaperStore } from '@/stores/heritagePaperStore'
import ProjectInfoForm from '@/components/heritage/ProjectInfoForm'
import PaperPreview from '@/components/heritage/PaperPreview'
import type { PaperData, FormatCheckResult } from '@/types/heritage'

const STEPS = [
  { key: 'welcome', label: '开始', icon: '✨' },
  { key: 'project_info', label: '填写信息', icon: '📝' },
  { key: 'generating', label: '生成中', icon: '⚙️' },
  { key: 'review', label: '审核', icon: '🔍' },
  { key: 'final', label: '完成', icon: '🎉' }
]

function HeritagePaperPage() {
  const navigate = useNavigate()
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [generationProgress, setGenerationProgress] = useState(0)
  const [inputValue, setInputValue] = useState('')

  const {
    currentStep,
    messages,
    projectInfo,
    paperData,
    formatCheckResult,
    addMessage,
    setCurrentStep,
    setResearchMode,
    setArtifacts,
    setAuthorInfo,
    setResearchPurpose,
    setResearchMethods,
    setKeyFindings,
    setInnovations,
    setRelatedLiterature,
    setTargetJournal,
    setPaperData,
    setFormatCheckResult,
    resetConversation
  } = useHeritagePaperStore()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, currentStep])

  const getStepIndex = () => STEPS.findIndex(s => s.key === currentStep)

  const generateMockPaper = (): PaperData => {
    const artifacts = projectInfo.artifacts
    const mainArtifact = artifacts[0]

    if (projectInfo.researchMode === 'batch' && artifacts.length > 1) {
      return {
        title: `${mainArtifact.era}${mainArtifact.type}对比研究`,
        abstract: `目的：本文对${artifacts.length}件${mainArtifact.type}进行对比研究，分析其共性与差异。方法：采用类型学分析、比较研究等方法，对${artifacts.length}件器物进行系统对比。结果：研究发现这批${mainArtifact.type}在形制、纹饰、工艺等方面呈现出明显的时代特征和地域特色。结论：本研究对于理解${mainArtifact.era}时期${mainArtifact.type}的发展演变规律具有重要意义。`,
        keywords: [mainArtifact.type, mainArtifact.era, '对比研究', '类型学', '考古研究', '文物保护'],
        introduction: `本文研究对象为${artifacts.length}件${mainArtifact.type}，主要来自${mainArtifact.origin || mainArtifact.collection || '相关考古发掘'}${mainArtifact.era}时期遗址。\n\n关于${mainArtifact.era}时期${mainArtifact.type}的研究，前人已做了大量工作。然而，对于这批具有代表性的器物，尚缺乏系统的对比研究。\n\n本文通过${projectInfo.researchMethods.join('、')}等方法，对这批器物进行综合分析，以期揭示其在类型学序列中的位置及其文化内涵。`,
        materialsAndMethods: `一、研究对象\n本文研究的${artifacts.length}件${mainArtifact.type}基本情况如下：\n\n${artifacts.map((a, i) => `${i + 1}. ${a.name}：${a.type}，${a.era}，${a.origin || a.collection || '出土地点不详'}，${a.description.substring(0, 50)}...`).join('\n\n')}\n\n二、研究方法\n${projectInfo.researchMethods.map((m, i) => `${i + 1}. ${m}`).join('\n')}\n\n通过多学科方法的综合运用，力求全面、客观地揭示这批文物的历史文化价值。`,
        results: `通过系统的研究分析，我们获得了以下主要结果：\n\n一、类型划分\n\n根据形态特征和装饰风格，可将${artifacts.length}件${mainArtifact.type}分为若干类型，各类型呈现出不同的时代特征。\n\n二、共性特征\n\n这批器物在材质选择、制作工艺、纹饰风格等方面表现出高度的一致性，反映了${mainArtifact.era}时期统一的审美观念和技术传统。\n\n三、差异分析\n\n尽管具有共性特征，但各器物之间也存在一定的差异，这些差异可能与年代早晚、功能用途或地域分布有关。`,
        discussion: `一、关于文化内涵\n\n这批${mainArtifact.type}作为${mainArtifact.era}时期的重要物质遗存，其文化内涵十分丰富。它们不仅体现了当时的工艺水平，也反映了社会结构和信仰体系。\n\n二、比较研究意义\n\n通过对比分析，可以看出这批器物与同时期其他地区发现的同类器物之间存在交流与影响关系。${projectInfo.innovations || '本研究为理解这一时期的文化交流提供了新的实物证据。'}\n\n三、学术价值\n\n本研究丰富了对${mainArtifact.era}时期${mainArtifact.type}的认识，为相关研究提供了新的资料和视角。`,
        conclusion: `本文通过对${artifacts.length}件${mainArtifact.type}的对比研究，得出以下主要结论：\n\n一、这批器物具有典型的${mainArtifact.era}时期风格特征，代表了当时的工艺水平和审美取向。\n\n二、通过类型学分析，可将其划分为若干类型，为建立该时期${mainArtifact.type}的类型学序列提供了基础资料。\n\n三、${projectInfo.keyFindings}\n\n四、本研究对于深入了解${mainArtifact.era}时期的社会文化和手工业发展水平具有重要意义。`,
        references: [
          { type: 'J', authors: '张三, 李四', title: `${mainArtifact.era}${mainArtifact.type}研究综述`, journal: '考古', year: '2020', volume: '3', pages: '45-60' },
          { type: 'J', authors: '王五', title: `${mainArtifact.type}的类型学研究`, journal: '文物', year: '2019', volume: '8', pages: '23-35' },
          { type: 'M', authors: '赵六', title: '中国古代青铜器研究', publisher: '文物出版社', year: '2018' },
          { type: 'J', authors: '钱七, 孙八', title: '文物检测分析技术的应用与发展', journal: '文物保护与考古科学', year: '2021', volume: '2', pages: '67-78' },
          { type: 'C', authors: '周九', title: `${mainArtifact.era}考古学文化研究的新进展`, journal: '中国考古学会年会论文集', year: '2022', pages: '112-125' }
        ]
      }
    }

    return {
      title: `${mainArtifact.era}${mainArtifact.name}的初步研究`,
      abstract: `目的：本文对${mainArtifact.era}时期的${mainArtifact.name}进行系统研究，探讨其历史价值与艺术特色。方法：采用${projectInfo.researchMethods.join('、')}等多种研究方法，对该文物的形制、纹饰、工艺特征进行全面分析。结果：研究发现，该${mainArtifact.type}具有典型的${mainArtifact.era}时期风格特征，${projectInfo.keyFindings}。结论：本研究对于理解${mainArtifact.era}时期的${mainArtifact.type}工艺技术和文化内涵具有重要意义，为相关研究提供了新的实物资料。`,
      keywords: [mainArtifact.name, mainArtifact.era, mainArtifact.type, '考古研究', '文物保护'],
      introduction: `${mainArtifact.name}是${mainArtifact.origin ? mainArtifact.origin + '出土' : '发现'}的一件重要${mainArtifact.type}，年代属于${mainArtifact.era}时期。${mainArtifact.description}\n\n关于${mainArtifact.era}时期${mainArtifact.type}的研究，前人已做了不少工作。${projectInfo.relatedLiterature || '已有多位学者从不同角度对这一时期的同类器物进行了探讨。'}然而，对于${mainArtifact.name}这样一件具有鲜明特色的器物，目前尚无专门的系统研究。\n\n本文${projectInfo.researchPurpose}，以期为${mainArtifact.type}研究和${mainArtifact.era}时期的文化研究提供新的资料和视角。`,
      materialsAndMethods: `本文的研究对象为${mainArtifact.collection ? mainArtifact.collection + '藏' : ''}${mainArtifact.name}。该${mainArtifact.type}${mainArtifact.description}\n\n研究方法方面，本文采用了多种研究方法相结合的方式：\n\n${projectInfo.researchMethods.map((m, i) => `${i + 1}. ${m}：通过${m}的方法，对文物进行深入分析。`).join('\n\n')}\n\n通过多学科方法的综合运用，力求全面、客观地揭示这件文物的历史文化价值。`,
      results: `通过系统的研究分析，我们获得了以下主要结果：\n\n一、形制与纹饰特征\n\n${projectInfo.keyFindings}\n\n二、工艺技术分析\n\n经观察分析，该${mainArtifact.type}的制作工艺精湛，体现了${mainArtifact.era}时期高超的工艺水平。其制作流程包括选材、成型、装饰等多个环节，每一环节都表现出匠师们的熟练技艺。\n\n三、年代与分期\n\n根据器物的形制、纹饰风格，并结合考古类型学的研究方法，可以判定这件${mainArtifact.type}属于${mainArtifact.era}时期的典型器物，具有明确的时代特征。`,
      discussion: `一、关于${mainArtifact.name}的文化内涵\n\n${mainArtifact.name}作为${mainArtifact.era}时期的一件重要${mainArtifact.type}，其文化内涵十分丰富。它不仅是一件实用器物，更是当时社会文化、审美观念和宗教信仰的物质载体。\n\n二、与同类器物的比较研究\n\n通过与已知的${mainArtifact.era}时期同类器物相比较，可以看出${mainArtifact.name}在承袭传统的基础上，又具有自身的特点。${projectInfo.innovations || '其独特的装饰风格和制作工艺，为我们研究这一时期的器物演变提供了重要线索。'}\n\n三、研究的学术意义\n\n本研究的学术意义主要体现在以下几个方面：首先，丰富了我们对${mainArtifact.era}时期${mainArtifact.type}的认识；其次，为相关研究提供了新的实物资料；再次，验证和补充了前人的研究成果。`,
      conclusion: `本文通过对${mainArtifact.name}的系统研究，得出以下主要结论：\n\n一、${mainArtifact.name}是${mainArtifact.era}时期的一件重要${mainArtifact.type}，具有重要的历史、艺术和科学价值。\n\n二、该器物的形制、纹饰和工艺特征，充分体现了${mainArtifact.era}时期${mainArtifact.type}制作的高超水平。\n\n三、${projectInfo.keyFindings}\n\n四、本研究对于深入了解${mainArtifact.era}时期的社会文化和手工业发展水平具有重要意义。\n\n由于资料和研究条件的限制，本研究还存在一些不足之处，有待今后进一步深入研究。例如，关于该器物的埋藏背景和使用功能等问题，还需要更多的考古发现和研究来加以验证。`,
      references: [
        { type: 'J', authors: '张三, 李四', title: `${mainArtifact.era}${mainArtifact.type}研究综述`, journal: '考古', year: '2020', volume: '3', pages: '45-60' },
        { type: 'J', authors: '王五', title: `${mainArtifact.type}的类型学研究`, journal: '文物', year: '2019', volume: '8', pages: '23-35' },
        { type: 'M', authors: '赵六', title: '中国古代青铜器研究', publisher: '文物出版社', year: '2018' },
        { type: 'J', authors: '钱七, 孙八', title: '文物检测分析技术的应用与发展', journal: '文物保护与考古科学', year: '2021', volume: '2', pages: '67-78' },
        { type: 'C', authors: '周九', title: `${mainArtifact.era}考古学文化研究的新进展`, journal: '中国考古学会年会论文集', year: '2022', pages: '112-125' }
      ]
    }
  }

  const generateFormatCheckResult = (): FormatCheckResult => {
    const issues: string[] = []
    const hasReference = paperData?.references && paperData.references.length >= 3

    if (!hasReference) {
      issues.push('参考文献数量偏少，建议至少引用5篇以上文献')
    }
    if (paperData && paperData.title.length > 25) {
      issues.push('标题字数超过25字，建议精简')
    }
    if (paperData && paperData.keywords.length < 3) {
      issues.push('关键词数量不足3个')
    }
    issues.push('请确认图表的图注位置是否符合期刊要求（图注在下，表注在上）')
    issues.push('建议在正文中添加必要的图表，增强论文的直观性')
    issues.push('请确认通讯作者及基金项目信息（如有）')

    return {
      titleFormat: paperData ? paperData.title.length <= 25 : true,
      abstractFormat: true,
      keywordCount: paperData ? paperData.keywords.length >= 3 : true,
      sectionStructure: true,
      referenceFormat: hasReference || false,
      figureNumbering: true,
      issues
    }
  }

  const handleStartWriting = () => {
    setCurrentStep('project_info')
  }

  const handleFormSubmit = () => {
    setIsGenerating(true)
    setGenerationProgress(0)
    setCurrentStep('generating')

    addMessage({
      role: 'assistant',
      content: '📝 正在收集您的信息...\n✓ 研究模式：' + (projectInfo.researchMode === 'single' ? '单件研究' : projectInfo.researchMode === 'batch' ? '批量研究' : '类型研究') + '\n✓ 文物数量：' + projectInfo.artifacts.length + '件\n✓ 研究方法：' + projectInfo.researchMethods.join('、'),
      type: 'text'
    })

    const progressSteps = [
      { progress: 20, message: '⚙️ 构建论文框架结构...' },
      { progress: 40, message: '⚙️ 撰写摘要和关键词...' },
      { progress: 60, message: '⚙️ 扩展引言和研究背景...' },
      { progress: 80, message: '⚙️ 组织研究方法与结果...' },
      { progress: 95, message: '⚙️ 完善讨论与结论...' }
    ]

    progressSteps.forEach((step, index) => {
      setTimeout(() => {
        setGenerationProgress(step.progress)
        addMessage({
          role: 'assistant',
          content: step.message,
          type: 'text'
        })
      }, (index + 1) * 600)
    })

    setTimeout(() => {
      const mockPaper = generateMockPaper()
      setPaperData(mockPaper)
      const checkResult = generateFormatCheckResult()
      setFormatCheckResult(checkResult)
      setIsGenerating(false)
      setCurrentStep('review')
      setGenerationProgress(100)

      addMessage({
        role: 'assistant',
        content: '✅ 论文初稿已生成！\n\n您可以在右侧查看论文预览内容。我已经完成了初步的格式校验，发现了' + checkResult.issues.length + '个需要注意的问题（见右侧校验面板）。\n\n请查看论文内容，如需修改可以直接编辑，或告诉我您想要调整的部分。',
        type: 'text'
      })
    }, 3500)
  }

  const handleFinalConfirm = () => {
    setCurrentStep('final')
    addMessage({
      role: 'assistant',
      content: '🎉 恭喜！您的论文已完成所有校验环节！\n\n📋 论文信息汇总：\n• 标题：' + paperData?.title + '\n• 作者：' + (projectInfo.authorInfo.name || '待填写') + '\n• 文物数量：' + projectInfo.artifacts.length + '件\n• 字数：约8000字\n• 参考文献：' + paperData?.references.length + '篇\n\n您现在可以导出Word文档，或继续进行修改。',
      type: 'text'
    })
  }

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    addMessage({
      role: 'user',
      content: inputValue,
      type: 'text'
    })
    setInputValue('')

    setTimeout(() => {
      addMessage({
        role: 'assistant',
        content: `收到您的反馈："${inputValue}"\n\n我已将您的意见记录下来。在审核页面，您可以直接编辑论文内容进行调整。`,
        type: 'text'
      })
    }, 800)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-amber-50/30 to-stone-100">
      {/* 顶部导航 */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm border-b border-stone-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 text-stone-600 hover:text-amber-700 transition-colors"
          >
            <span className="text-xl">←</span>
            <span>返回</span>
          </button>
          <h1 className="text-xl font-bold text-stone-800 flex items-center gap-3">
            <span className="text-2xl">🏛️</span>
            <span>文物期刊论文写作助手</span>
          </h1>
          <button
            onClick={resetConversation}
            className="flex items-center gap-2 text-stone-500 hover:text-amber-700 transition-colors text-sm"
          >
            <RefreshCw className="w-4 h-4" />
            <span>重新开始</span>
          </button>
        </div>
      </header>

      {/* 步骤指示器 */}
      <div className="bg-white border-b border-stone-200">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {STEPS.map((step, index) => {
              const currentIndex = getStepIndex()
              const isCompleted = index < currentIndex
              const isCurrent = index === currentIndex

              return (
                <React.Fragment key={step.key}>
                  <div className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg transition-all ${
                      isCompleted
                        ? 'bg-green-500 text-white'
                        : isCurrent
                        ? 'bg-amber-600 text-white shadow-lg shadow-amber-200'
                        : 'bg-stone-200 text-stone-400'
                    }`}>
                      {isCompleted ? '✓' : step.icon}
                    </div>
                    <span className={`text-xs mt-2 font-medium ${
                      isCurrent ? 'text-amber-700' : isCompleted ? 'text-green-600' : 'text-stone-400'
                    }`}>
                      {step.label}
                    </span>
                  </div>
                  {index < STEPS.length - 1 && (
                    <div className={`flex-1 h-1 mx-4 rounded ${
                      index < currentIndex ? 'bg-green-400' : 'bg-stone-200'
                    }`} />
                  )}
                </React.Fragment>
              )
            })}
          </div>
        </div>
      </div>

      {/* 主内容区 */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-5 gap-8">
          {/* 左侧：表单/对话区 */}
          <div className="col-span-3">
            <div className="bg-white rounded-2xl shadow-lg border border-stone-200 overflow-hidden" style={{ minHeight: '600px' }}>
              {/* 欢迎页 */}
              {currentStep === 'welcome' && (
                <div className="p-8 flex flex-col items-center justify-center h-full">
                  <div className="text-center mb-8">
                    <div className="text-6xl mb-4">🏛️</div>
                    <h2 className="text-2xl font-bold text-stone-800 mb-2">
                      文物期刊论文写作助手
                    </h2>
                    <p className="text-stone-500 max-w-md">
                      帮助您快速生成符合期刊发表规范的文物学术论文，支持单件、批量、类型研究等多种模式。
                    </p>
                  </div>

                  <button
                    onClick={handleStartWriting}
                    className="px-8 py-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-xl font-medium text-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all flex items-center gap-3"
                  >
                    <Sparkles className="w-5 h-5" />
                    开始写作
                    <ChevronRight className="w-5 h-5" />
                  </button>

                  <div className="mt-12 grid grid-cols-3 gap-6 text-center">
                    <div className="p-4 bg-stone-50 rounded-xl">
                      <div className="text-2xl mb-2">📦</div>
                      <div className="text-sm font-medium text-stone-700">单件研究</div>
                      <div className="text-xs text-stone-500 mt-1">深入分析一件文物</div>
                    </div>
                    <div className="p-4 bg-stone-50 rounded-xl">
                      <div className="text-2xl mb-2">📚</div>
                      <div className="text-sm font-medium text-stone-700">批量研究</div>
                      <div className="text-xs text-stone-500 mt-1">对比多件同批文物</div>
                    </div>
                    <div className="p-4 bg-stone-50 rounded-xl">
                      <div className="text-2xl mb-2">🏛️</div>
                      <div className="text-sm font-medium text-stone-700">类型研究</div>
                      <div className="text-xs text-stone-500 mt-1">研究一类文物演变</div>
                    </div>
                  </div>
                </div>
              )}

              {/* 项目信息表单 */}
              {currentStep === 'project_info' && (
                <ProjectInfoForm
                  researchMode={projectInfo.researchMode}
                  artifacts={projectInfo.artifacts}
                  researchPurpose={projectInfo.researchPurpose}
                  researchMethods={projectInfo.researchMethods}
                  keyFindings={projectInfo.keyFindings}
                  innovations={projectInfo.innovations}
                  relatedLiterature={projectInfo.relatedLiterature}
                  targetJournal={projectInfo.targetJournal}
                  authorInfo={projectInfo.authorInfo}
                  onModeChange={setResearchMode}
                  onArtifactsChange={setArtifacts}
                  onResearchChange={(data) => {
                    if (data.purpose !== undefined) setResearchPurpose(data.purpose)
                    if (data.methods !== undefined) setResearchMethods(data.methods)
                    if (data.findings !== undefined) setKeyFindings(data.findings)
                    if (data.innovations !== undefined) setInnovations(data.innovations)
                    if (data.literature !== undefined) setRelatedLiterature(data.literature)
                    if (data.journal !== undefined) setTargetJournal(data.journal)
                  }}
                  onAuthorChange={setAuthorInfo}
                  onSubmit={handleFormSubmit}
                />
              )}

              {/* 生成中 */}
              {currentStep === 'generating' && (
                <div className="p-8 flex flex-col items-center justify-center h-full">
                  <div className="text-center">
                    <div className="relative w-24 h-24 mx-auto mb-6">
                      <div className="absolute inset-0 border-4 border-amber-200 rounded-full" />
                      <div
                        className="absolute inset-0 border-4 border-amber-600 rounded-full"
                        style={{
                          clipPath: `polygon(50% 50%, 50% 0%, ${50 + 50 * Math.sin(generationProgress / 100 * 2 * Math.PI)}% ${50 - 50 * Math.cos(generationProgress / 100 * 2 * Math.PI)}%)`
                        }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xl font-bold text-amber-700">{generationProgress}%</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-stone-800 mb-2">
                      正在生成论文
                    </h3>
                    <p className="text-stone-500">
                      AI 正在根据您的信息撰写论文，请稍候...
                    </p>
                  </div>
                </div>
              )}

              {/* 审核页面 */}
              {currentStep === 'review' && (
                <div className="h-full flex flex-col">
                  {/* 消息列表 */}
                  <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    {messages.slice(1).map(msg => (
                      <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                          msg.role === 'user'
                            ? 'bg-amber-100 text-stone-800'
                            : 'bg-stone-100 text-stone-700'
                        }`}>
                          <p className="whitespace-pre-wrap text-sm leading-relaxed">{msg.content}</p>
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* 输入框 */}
                  <div className="p-4 border-t border-stone-200 bg-stone-50">
                    <div className="flex gap-3">
                      <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="输入您的问题或修改意见..."
                        className="flex-1 px-4 py-3 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
                      />
                      <button
                        onClick={handleSendMessage}
                        disabled={!inputValue.trim()}
                        className="px-6 py-3 bg-amber-600 text-white rounded-xl font-medium hover:bg-amber-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        发送
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* 完成页面 */}
              {currentStep === 'final' && (
                <div className="p-8">
                  <div className="text-center mb-8">
                    <div className="text-6xl mb-4">🎉</div>
                    <h3 className="text-2xl font-bold text-stone-800 mb-2">论文已完成！</h3>
                    <p className="text-stone-500">您的文物学术论文已通过所有校验环节</p>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-8">
                    <div className="bg-stone-50 rounded-xl p-4 text-center">
                      <div className="text-2xl font-bold text-amber-600">~8000</div>
                      <div className="text-xs text-stone-500">总字数</div>
                    </div>
                    <div className="bg-stone-50 rounded-xl p-4 text-center">
                      <div className="text-2xl font-bold text-amber-600">{projectInfo.artifacts.length}</div>
                      <div className="text-xs text-stone-500">文物数量</div>
                    </div>
                    <div className="bg-stone-50 rounded-xl p-4 text-center">
                      <div className="text-2xl font-bold text-amber-600">{paperData?.references.length || 0}</div>
                      <div className="text-xs text-stone-500">参考文献</div>
                    </div>
                  </div>

                  <button
                    className="w-full py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-medium text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-3"
                  >
                    <Download className="w-5 h-5" />
                    导出 Word 文档
                  </button>

                  <button
                    onClick={() => setCurrentStep('review')}
                    className="w-full mt-3 py-3 border-2 border-stone-300 text-stone-600 rounded-xl font-medium hover:bg-stone-50 transition-colors"
                  >
                    继续修改
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* 右侧：预览区 */}
          <div className="col-span-2">
            <div className="sticky top-32">
              {paperData && currentStep === 'review' && (
                <div className="space-y-4">
                  {/* 格式校验面板 */}
                  <div className="bg-white rounded-2xl shadow-lg border border-stone-200 p-6">
                    <h3 className="text-lg font-bold text-stone-800 mb-4 flex items-center gap-2">
                      <FileText className="w-5 h-5 text-amber-600" />
                      格式校验
                    </h3>
                    <div className="space-y-3">
                      {[
                        { label: '标题格式', ok: formatCheckResult?.titleFormat },
                        { label: '摘要结构', ok: formatCheckResult?.abstractFormat },
                        { label: '关键词数量', ok: formatCheckResult?.keywordCount },
                        { label: '章节结构', ok: formatCheckResult?.sectionStructure },
                        { label: '参考文献', ok: formatCheckResult?.referenceFormat }
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-3">
                          {item.ok ? (
                            <CheckCircle className="w-5 h-5 text-green-500" />
                          ) : (
                            <AlertCircle className="w-5 h-5 text-amber-500" />
                          )}
                          <span className={item.ok ? 'text-stone-700' : 'text-stone-500'}>
                            {item.label}
                          </span>
                        </div>
                      ))}
                    </div>
                    {formatCheckResult?.issues.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-stone-200">
                        <h4 className="text-sm font-medium text-stone-700 mb-2">建议：</h4>
                        <ul className="space-y-1">
                          {formatCheckResult.issues.map((issue, i) => (
                            <li key={i} className="text-sm text-stone-500 flex items-start gap-2">
                              <span className="text-amber-500">•</span>
                              {issue}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    <button
                      onClick={handleFinalConfirm}
                      className="w-full mt-4 py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-colors"
                    >
                      确认完成
                    </button>
                  </div>

                  {/* 论文预览 */}
                  <PaperPreview
                    paper={paperData}
                    authorName={projectInfo.authorInfo.name}
                    institution={projectInfo.authorInfo.institution}
                  />
                </div>
              )}

              {currentStep === 'project_info' && !paperData && (
                <div className="bg-white rounded-2xl shadow-lg border border-stone-200 p-6">
                  <h3 className="text-lg font-bold text-stone-800 mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-amber-600" />
                    论文预览
                  </h3>
                  <div className="text-center py-12 text-stone-400">
                    <div className="text-4xl mb-3">📄</div>
                    <p>填写完信息后</p>
                    <p>这里将显示论文预览</p>
                  </div>
                </div>
              )}

              {currentStep === 'final' && paperData && (
                <PaperPreview
                  paper={paperData}
                  authorName={projectInfo.authorInfo.name}
                  institution={projectInfo.authorInfo.institution}
                />
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default HeritagePaperPage
