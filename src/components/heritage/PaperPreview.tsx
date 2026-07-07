import React from 'react'
import type { PaperData } from '@/types/heritage'

interface PaperPreviewProps {
  paper: PaperData
  authorName: string
  institution: string
}

function PaperPreview({ paper, authorName, institution }: PaperPreviewProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      <div className="bg-gradient-to-r from-stone-100 to-amber-50 px-6 py-4 border-b border-stone-200">
        <h3 className="text-lg font-bold text-stone-800 flex items-center gap-2">
          <span>📄</span> 论文预览
        </h3>
      </div>

      <div className="p-6 max-h-[600px] overflow-y-auto paper-content">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-xl font-bold text-gray-900 mb-3 leading-tight">
              {paper.title}
            </h1>
            <p className="text-gray-700 mb-1">{authorName}</p>
            <p className="text-sm text-gray-500">{institution}</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-sm font-medium text-gray-700 mb-2">摘要：</p>
            <p className="text-sm text-gray-600 leading-relaxed">{paper.abstract}</p>
            <p className="text-sm text-gray-600 mt-3">
              <span className="font-medium">关键词：</span>
              {paper.keywords.join('；')}
            </p>
          </div>

          <div className="space-y-6">
            <section>
              <h2 className="text-base font-bold text-gray-900 mb-2">一、引言</h2>
              <p className="text-sm text-gray-700 leading-relaxed indent-8">
                {paper.introduction}
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-gray-900 mb-2">二、研究对象与方法</h2>
              <p className="text-sm text-gray-700 leading-relaxed indent-8">
                {paper.materialsAndMethods}
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-gray-900 mb-2">三、研究结果</h2>
              <p className="text-sm text-gray-700 leading-relaxed indent-8">
                {paper.results}
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-gray-900 mb-2">四、讨论</h2>
              <p className="text-sm text-gray-700 leading-relaxed indent-8">
                {paper.discussion}
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-gray-900 mb-2">五、结论</h2>
              <p className="text-sm text-gray-700 leading-relaxed indent-8">
                {paper.conclusion}
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-gray-900 mb-3">参考文献</h2>
              <div className="space-y-2">
                {paper.references.map((ref, idx) => (
                  <p key={idx} className="text-xs text-gray-600 leading-relaxed">
                    [{idx + 1}] {ref.authors}. {ref.title}
                    {ref.journal && `[J]. ${ref.journal}`}
                    {ref.year && `, ${ref.year}`}
                    {ref.volume && `, ${ref.volume}`}
                    {ref.pages && `: ${ref.pages}`}
                    {ref.publisher && `. ${ref.publisher}`}
                    .
                  </p>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaperPreview
