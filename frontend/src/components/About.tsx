export default function About() {
    return (
        <section id="about" className="py-20 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Left: Content */}
                        <div>
                            <div className="inline-block bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-4">
                                <span className="text-white/90 text-sm font-medium">🛡️ About InstaGuard</span>
                            </div>

                            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
                                Protecting Users from Instagram Scams
                            </h2>

                            <div className="space-y-4 text-white/80 text-lg leading-relaxed">
                                <p>
                                    <strong className="text-white">InstaGuard</strong> was created to address the growing problem of Instagram scams,
                                    fake accounts, and phishing attempts that cost users over <strong className="text-white">$770 million</strong> annually.
                                </p>

                                <p>
                                    Our AI-powered platform analyzes multiple risk factors to help you identify suspicious accounts
                                    before you interact with them. Whether it's a fake celebrity account, a phishing scammer, or
                                    an impersonation attempt, InstaGuard gives you the information you need to stay safe.
                                </p>

                                <p>
                                    Built with cutting-edge technology including <strong className="text-white">FastAPI</strong>,
                                    <strong className="text-white"> React</strong>, and <strong className="text-white">TypeScript</strong>,
                                    our platform delivers professional-grade security analysis in a beautiful, easy-to-use interface.
                                </p>
                            </div>

                            {/* Key Points */}
                            <div className="mt-8 space-y-4">
                                <div className="flex items-start">
                                    <div className="text-2xl mr-3">✅</div>
                                    <div>
                                        <div className="text-white font-semibold">No Instagram Login Required</div>
                                        <div className="text-white/70">Analyze accounts without compromising your privacy</div>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <div className="text-2xl mr-3">✅</div>
                                    <div>
                                        <div className="text-white font-semibold">Free to Use</div>
                                        <div className="text-white/70">Get started with unlimited free analyses</div>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <div className="text-2xl mr-3">✅</div>
                                    <div>
                                        <div className="text-white font-semibold">Open Source Ready</div>
                                        <div className="text-white/70">Built with transparency and security in mind</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right: Stats & Info Cards */}
                        <div className="space-y-6">
                            {/* Mission Card */}
                            <div className="glass rounded-2xl p-6">
                                <div className="text-4xl mb-3">🎯</div>
                                <h3 className="text-xl font-bold text-white mb-2">Our Mission</h3>
                                <p className="text-white/70">
                                    To make Instagram safer for everyone by providing free, accessible tools that help users
                                    identify and avoid scams, fake accounts, and fraudulent activity.
                                </p>
                            </div>

                            {/* Technology Card */}
                            <div className="glass rounded-2xl p-6">
                                <div className="text-4xl mb-3">⚙️</div>
                                <h3 className="text-xl font-bold text-white mb-2">Technology Stack</h3>
                                <div className="flex flex-wrap gap-2 mt-3">
                                    <span className="bg-white/10 border border-white/20 px-3 py-1 rounded-full text-sm text-white">FastAPI</span>
                                    <span className="bg-white/10 border border-white/20 px-3 py-1 rounded-full text-sm text-white">React</span>
                                    <span className="bg-white/10 border border-white/20 px-3 py-1 rounded-full text-sm text-white">TypeScript</span>
                                    <span className="bg-white/10 border border-white/20 px-3 py-1 rounded-full text-sm text-white">Tailwind CSS</span>
                                    <span className="bg-white/10 border border-white/20 px-3 py-1 rounded-full text-sm text-white">SQLite</span>
                                    <span className="bg-white/10 border border-white/20 px-3 py-1 rounded-full text-sm text-white">Python</span>
                                </div>
                            </div>

                            {/* Impact Card */}
                            <div className="glass rounded-2xl p-6">
                                <div className="text-4xl mb-3">📈</div>
                                <h3 className="text-xl font-bold text-white mb-2">Real Impact</h3>
                                <div className="grid grid-cols-2 gap-4 mt-3">
                                    <div>
                                        <div className="text-2xl font-bold text-white">50K+</div>
                                        <div className="text-sm text-white/70">Accounts Analyzed</div>
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold text-white">98%</div>
                                        <div className="text-sm text-white/70">Accuracy Rate</div>
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold text-white">2.8s</div>
                                        <div className="text-sm text-white/70">Avg Analysis Time</div>
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold text-white">99.9%</div>
                                        <div className="text-sm text-white/70">Uptime</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom CTA */}
                    <div className="mt-16 text-center glass rounded-3xl p-8">
                        <h3 className="text-2xl font-bold text-white mb-3">
                            Join Thousands of Protected Users
                        </h3>
                        <p className="text-white/70 mb-6">
                            Start using InstaGuard today and never fall victim to Instagram scams again.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button
                                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                                className="bg-white text-purple-600 px-8 py-3 rounded-xl font-bold hover:shadow-xl transition-all duration-300"
                            >
                                Get Started Free
                            </button>
                            <a
                                href="http://127.0.0.1:8000/docs"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-white/10 border-2 border-white/30 text-white px-8 py-3 rounded-xl font-bold hover:bg-white/20 transition-all duration-300"
                            >
                                View API Docs
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
