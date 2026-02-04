import { AnalysisResult } from '../App'

interface ResultDashboardProps {
    result: AnalysisResult
    onNewAnalysis: () => void
}

export default function ResultDashboard({ result, onNewAnalysis }: ResultDashboardProps) {
    const getRiskColor = (level: string) => {
        if (level === 'High Risk') return 'from-red-500 to-red-700'
        if (level === 'Moderate Risk') return 'from-yellow-500 to-orange-600'
        return 'from-green-500 to-green-700'
    }

    const getRiskBadgeColor = (level: string) => {
        if (level === 'High Risk') return 'bg-red-500/20 text-red-300 border-red-500/50'
        if (level === 'Moderate Risk') return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/50'
        return 'bg-green-500/20 text-green-300 border-green-500/50'
    }

    const getConfidenceColor = (label: string) => {
        if (label === 'High') return 'text-green-400'
        if (label === 'Medium') return 'text-yellow-400'
        return 'text-orange-400'
    }

    // Calculate percentage for circular progress
    const circumference = 2 * Math.PI * 70
    const offset = circumference - (result.risk_score / 100) * circumference

    return (
        <div className="space-y-6 sticky top-24">
            {/* Risk Score Card */}
            <div className="glass rounded-3xl p-8 shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-white">Risk Analysis</h3>
                    <button
                        onClick={onNewAnalysis}
                        className="text-white/70 hover:text-white text-sm font-medium transition-colors"
                    >
                        New Analysis →
                    </button>
                </div>

                {/* Circular Risk Score */}
                <div className="flex flex-col items-center mb-8">
                    <div className="relative w-48 h-48">
                        <svg className="transform -rotate-90 w-48 h-48">
                            <circle
                                cx="96"
                                cy="96"
                                r="70"
                                stroke="rgba(255,255,255,0.1)"
                                strokeWidth="12"
                                fill="none"
                            />
                            <circle
                                cx="96"
                                cy="96"
                                r="70"
                                stroke="url(#gradient)"
                                strokeWidth="12"
                                fill="none"
                                strokeDasharray={circumference}
                                strokeDashoffset={offset}
                                strokeLinecap="round"
                                className="transition-all duration-1000 ease-out"
                            />
                            <defs>
                                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" className={result.risk_score >= 65 ? 'text-red-500' : result.risk_score >= 40 ? 'text-yellow-500' : 'text-green-500'} stopColor="currentColor" />
                                    <stop offset="100%" className={result.risk_score >= 65 ? 'text-red-700' : result.risk_score >= 40 ? 'text-orange-600' : 'text-green-700'} stopColor="currentColor" />
                                </linearGradient>
                            </defs>
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <div className="text-5xl font-black text-white">{result.risk_score}</div>
                            <div className="text-white/60 text-sm font-medium">Risk Score</div>
                        </div>
                    </div>

                    {/* Risk Level Badge */}
                    <div className={`mt-6 px-6 py-3 rounded-full border-2 ${getRiskBadgeColor(result.risk_level)} font-bold text-lg`}>
                        {result.risk_level}
                    </div>
                </div>

                {/* Username & Confidence */}
                <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between bg-white/5 rounded-xl p-4">
                        <span className="text-white/70 font-medium">Username</span>
                        <span className="text-white font-bold">@{result.username}</span>
                    </div>
                    <div className="flex items-center justify-between bg-white/5 rounded-xl p-4">
                        <span className="text-white/70 font-medium">Confidence</span>
                        <span className={`font-bold ${getConfidenceColor(result.confidence_label)}`}>
                            {result.confidence}% ({result.confidence_label})
                        </span>
                    </div>
                </div>
            </div>

            {/* Risk Indicators */}
            <div className="glass rounded-3xl p-8 shadow-2xl">
                <h4 className="text-xl font-bold text-white mb-4 flex items-center">
                    <span className="text-2xl mr-2">⚠️</span>
                    Risk Indicators
                </h4>
                <div className="space-y-3">
                    {result.reasons.map((reason, index) => (
                        <div
                            key={index}
                            className="bg-white/5 rounded-xl p-4 text-white/90 text-sm leading-relaxed border border-white/10 hover:bg-white/10 transition-colors"
                        >
                            {reason}
                        </div>
                    ))}
                </div>
            </div>

            {/* Recommendations */}
            <div className="glass rounded-3xl p-8 shadow-2xl">
                <h4 className="text-xl font-bold text-white mb-4 flex items-center">
                    <span className="text-2xl mr-2">💡</span>
                    Safety Recommendations
                </h4>
                <div className="space-y-3">
                    {result.recommendations.map((recommendation, index) => (
                        <div
                            key={index}
                            className="bg-white/5 rounded-xl p-4 text-white/90 text-sm leading-relaxed border border-white/10 hover:bg-white/10 transition-colors"
                        >
                            {recommendation}
                        </div>
                    ))}
                </div>
            </div>

            {/* Timestamp */}
            <div className="text-center text-white/50 text-sm">
                Analyzed at {new Date(result.timestamp).toLocaleString()}
            </div>
        </div>
    )
}
