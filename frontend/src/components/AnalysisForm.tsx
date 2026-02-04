import { useState, FormEvent } from 'react'
import axios from 'axios'
import { AnalysisResult } from '../App'

interface AnalysisFormProps {
    onAnalysisComplete: (result: AnalysisResult) => void
    setLoading: (loading: boolean) => void
}

export default function AnalysisForm({ onAnalysisComplete, setLoading }: AnalysisFormProps) {
    const [formData, setFormData] = useState({
        username: '',
        followers: '',
        following: '',
        posts: '',
        account_age_days: '',
        verified: '',
        visibility: '',
        has_profile_pic: '',
        bio_text: '',
        bio_links: '',
        dm_activity: ''
    })

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            // Prepare data for API
            const apiData: any = {
                username: formData.username,
            }

            // Add optional fields only if they have values
            if (formData.followers) apiData.followers = parseInt(formData.followers)
            if (formData.following) apiData.following = parseInt(formData.following)
            if (formData.posts) apiData.posts = parseInt(formData.posts)
            if (formData.account_age_days) apiData.account_age_days = parseInt(formData.account_age_days)
            if (formData.verified) apiData.verified = formData.verified === 'yes'
            if (formData.visibility) apiData.visibility = formData.visibility
            if (formData.has_profile_pic) apiData.has_profile_pic = formData.has_profile_pic
            if (formData.bio_text) apiData.bio_text = formData.bio_text
            if (formData.bio_links) apiData.bio_links = formData.bio_links
            if (formData.dm_activity) apiData.dm_activity = formData.dm_activity

            const response = await axios.post('/api/analyze', apiData)
            onAnalysisComplete(response.data)
        } catch (error: any) {
            console.error('Analysis failed:', error)
            const errorMessage = error.response?.data?.detail || error.message || 'Unknown error occurred'
            alert(`Analysis failed: ${errorMessage}. \n\nCheck console for details. Ensure Backend is running.`)
            setLoading(false)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div className="glass rounded-3xl p-6 md:p-8">
            <div className="mb-6">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                    Check Instagram Account
                </h2>
                <p className="text-white/70">
                    Fill in what you know about the account. Only username is required - more details = better accuracy.
                </p>
                <div className="mt-3 p-3 bg-blue-500/20 border border-blue-400/30 rounded-xl">
                    <p className="text-blue-100 text-sm">
                        💡 <strong>Tip:</strong> You can find this info on the Instagram profile without following or messaging them.
                    </p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5" aria-label="Instagram account analysis form">
                {/* Username - Required */}
                <div>
                    <label htmlFor="username" className="block text-white font-semibold mb-2">
                        Instagram Username <span className="text-pink-400" aria-label="required">*</span>
                    </label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                        placeholder="example: @instagram or instagram"
                        aria-required="true"
                        aria-describedby="username-hint"
                        className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    />
                    <p id="username-hint" className="text-white/60 text-sm mt-1">
                        Enter the Instagram username (with or without @)
                    </p>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-3 gap-4">
                    <div>
                        <label htmlFor="followers" className="block text-white font-semibold mb-2 text-sm">Followers</label>
                        <input
                            type="number"
                            id="followers"
                            name="followers"
                            value={formData.followers}
                            onChange={handleChange}
                            placeholder="0"
                            className="w-full bg-white/10 border border-white/20 rounded-xl px-3 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                        />
                    </div>
                    <div>
                        <label className="block text-white font-semibold mb-2 text-sm">Following</label>
                        <input
                            type="number"
                            name="following"
                            value={formData.following}
                            onChange={handleChange}
                            placeholder="0"
                            className="w-full bg-white/10 border border-white/20 rounded-xl px-3 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                        />
                    </div>
                    <div>
                        <label className="block text-white font-semibold mb-2 text-sm">Posts</label>
                        <input
                            type="number"
                            name="posts"
                            value={formData.posts}
                            onChange={handleChange}
                            placeholder="0"
                            className="w-full bg-white/10 border border-white/20 rounded-xl px-3 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                        />
                    </div>
                </div>

                {/* Account Age */}
                <div>
                    <label className="block text-white font-semibold mb-2">Account Age (days)</label>
                    <input
                        type="number"
                        name="account_age_days"
                        value={formData.account_age_days}
                        onChange={handleChange}
                        placeholder="e.g., 365"
                        className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                    />
                </div>

                {/* Verified Status */}
                <div>
                    <label className="block text-white font-semibold mb-2">Verified Status</label>
                    <select
                        name="verified"
                        value={formData.verified}
                        onChange={handleChange}
                        className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                    >
                        <option value="">Unknown</option>
                        <option value="yes">Yes (Blue Check)</option>
                        <option value="no">No</option>
                    </select>
                </div>

                {/* Visibility & Profile Pic */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-white font-semibold mb-2">Visibility</label>
                        <select
                            name="visibility"
                            value={formData.visibility}
                            onChange={handleChange}
                            className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                        >
                            <option value="">Select</option>
                            <option value="public">Public</option>
                            <option value="private">Private</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-white font-semibold mb-2">Profile Picture</label>
                        <select
                            name="has_profile_pic"
                            value={formData.has_profile_pic}
                            onChange={handleChange}
                            className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                        >
                            <option value="">Select</option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                            <option value="suspicious">Suspicious</option>
                        </select>
                    </div>
                </div>

                {/* Bio */}
                <div>
                    <label className="block text-white font-semibold mb-2">Bio Text</label>
                    <textarea
                        name="bio_text"
                        value={formData.bio_text}
                        onChange={handleChange}
                        placeholder="Account bio content..."
                        rows={3}
                        className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all resize-none"
                    />
                </div>

                {/* Bio Links & DM Activity */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-white font-semibold mb-2">Bio Links</label>
                        <select
                            name="bio_links"
                            value={formData.bio_links}
                            onChange={handleChange}
                            className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                        >
                            <option value="">None</option>
                            <option value="yes">Yes</option>
                            <option value="suspicious">Suspicious</option>
                            <option value="multiple">Multiple</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-white font-semibold mb-2">DM Activity</label>
                        <select
                            name="dm_activity"
                            value={formData.dm_activity}
                            onChange={handleChange}
                            className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                        >
                            <option value="">Normal</option>
                            <option value="unsolicited">Unsolicited</option>
                            <option value="suspicious">Suspicious</option>
                        </select>
                    </div>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
                >
                    🔍 Analyze Account Risk
                </button>
            </form>
        </div>
    )
}
