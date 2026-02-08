import React, { useState, useEffect } from 'react';
import { Calendar, TrendingUp, Clock, Frown, Smile, ArrowLeft } from 'lucide-react';
import { playClickSound } from '../utils/soundUtils';

const PersonalPage = ({ onNavigate }) => {
    const [messages, setMessages] = useState([]);
    const [filteredMessages, setFilteredMessages] = useState([]);
    const [stats, setStats] = useState(null);
    const [nickname, setNickname] = useState('');
    const [period, setPeriod] = useState('all');
    const [messageFilter, setMessageFilter] = useState('all'); // all, anxiety, happy
    const [loading, setLoading] = useState(true);
    const userId = localStorage.getItem('user_id');

    useEffect(() => {
        if (userId) {
            fetchUserMessages();
            fetchUserStats(period);
        }
    }, [userId, period]);

    useEffect(() => {
        // Filter messages based on messageFilter
        if (messageFilter === 'all') {
            setFilteredMessages(messages);
        } else if (messageFilter === 'anxiety') {
            setFilteredMessages(messages.filter(msg => msg.message_id === 1));
        } else if (messageFilter === 'happy') {
            setFilteredMessages(messages.filter(msg => msg.message_id === 2));
        }
    }, [messages, messageFilter]);

    const fetchUserMessages = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/user/messages/${userId}`);
            const data = await response.json();
            
            if (response.ok) {
                setMessages(data.messages || []);
                setNickname(data.nickname);
            }
        } catch (error) {
            console.error('Error fetching messages:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchUserStats = async (selectedPeriod) => {
        try {
            const response = await fetch(
                `http://localhost:5000/api/user/stats/${userId}?period=${selectedPeriod}`
            );
            const data = await response.json();
            
            if (response.ok) {
                setStats(data);
            }
        } catch (error) {
            console.error('Error fetching stats:', error);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getTagColor = () => {
        return 'personal-chip';
    };

    const getMessageTypeInfo = (messageId) => {
        if (messageId === 1) {
            return {
                label: 'Anxiety',
                icon: '💭',
                color: 'message-anxiety',
                textColor: 'text-red-400'
            };
        } else if (messageId === 2) {
            return {
                label: 'Happy Moment',
                icon: '✨',
                color: 'message-happy',
                textColor: 'text-green-400'
            };
        }
        return {
            label: 'Unknown',
            icon: '❓',
            color: 'message-unknown',
            textColor: 'text-gray-400'
        };
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center personal-page">
                <div className="text-2xl">Loading...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen p-8 personal-page">
            <div className="max-w-7xl mx-auto">
                <div className="mb-6">
                    <button
                        aria-label="Back to Dashboard"
                        onClick={() => {
                            playClickSound();
                            onNavigate('dashboard');
                        }}
                        className="personal-button personal-back-button"
                    >
                        <ArrowLeft size={18} />
                    </button>
                </div>
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-bold mb-4 personal-title">
                        {nickname}'s Personal Journey
                    </h1>
                    <p className="text-xl personal-subtitle">
                        Track your emotional timeline and insights
                    </p>
                </div>

                {/* Period Selector */}
                <div className="flex justify-center gap-4 mb-8">
                    {['all', 'year', 'month', 'week'].map((p) => (
                        <button
                            key={p}
                            onClick={() => setPeriod(p)}
                            className={`px-6 py-3 rounded-lg font-semibold transition-all personal-button ${
                                period === p ? 'active' : ''
                            }`}
                        >
                            {p.charAt(0).toUpperCase() + p.slice(1)}
                        </button>
                    ))}
                </div>

                {/* Message Type Filter */}
                <div className="flex justify-center gap-4 mb-8">
                    <button
                        onClick={() => setMessageFilter('all')}
                        className={`px-6 py-3 rounded-lg font-semibold transition-all flex items-center gap-2 personal-button ${
                            messageFilter === 'all' ? 'active' : ''
                        }`}
                    >
                        All Messages
                    </button>
                    <button
                        onClick={() => setMessageFilter('anxiety')}
                        className={`px-6 py-3 rounded-lg font-semibold transition-all flex items-center gap-2 personal-button ${
                            messageFilter === 'anxiety' ? 'active' : ''
                        }`}
                    >
                        <Frown size={20} />
                        Anxiety
                    </button>
                    <button
                        onClick={() => setMessageFilter('happy')}
                        className={`px-6 py-3 rounded-lg font-semibold transition-all flex items-center gap-2 personal-button ${
                            messageFilter === 'happy' ? 'active' : ''
                        }`}
                    >
                        <Smile size={20} />
                        Happy
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                    {/* Message Type Statistics */}
                    <div className="personal-card rounded-2xl p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <TrendingUp size={28} />
                            <h2 className="text-2xl font-bold">
                                Message Types
                            </h2>
                        </div>
                        
                        {stats && stats.message_types && stats.message_types.length > 0 ? (
                            <div className="space-y-6">
                                {stats.message_types.map((item, index) => {
                                    const typeInfo = getMessageTypeInfo(item.message_id);
                                    return (
                                        <div key={index} className="space-y-2">
                                            <div className="flex justify-between text-sm items-center">
                                                <span className="font-semibold flex items-center gap-2">
                                                    <span className="text-2xl">{typeInfo.icon}</span>
                                                    {typeInfo.label}
                                                </span>
                                                <span className="text-lg font-bold">{item.count}</span>
                                            </div>
                                            <div className="w-full rounded-full h-4 overflow-hidden personal-track">
                                                <div
                                                    className={`${typeInfo.color} h-full rounded-full transition-all duration-500`}
                                                    style={{ width: `${(item.count / messages.length) * 100}%` }}
                                                />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <p className="text-center py-10 personal-muted">No data available</p>
                        )}
                    </div>

                    {/* Tag Statistics - Bar Chart */}
                    <div className="personal-card rounded-2xl p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <TrendingUp size={28} />
                            <h2 className="text-2xl font-bold">
                                Top Tags
                            </h2>
                        </div>
                        
                        {stats && stats.tag_stats && stats.tag_stats.length > 0 ? (
                            <div className="space-y-4">
                                {stats.tag_stats.slice(0, 5).map((item, index) => {
                                    const maxCount = stats.tag_stats[0].count;
                                    const percentage = (item.count / maxCount) * 100;
                                    
                                    return (
                                        <div key={index} className="space-y-2">
                                            <div className="flex justify-between text-sm">
                                                <span className="font-semibold">{item.tag}</span>
                                                <span>{item.count} times</span>
                                            </div>
                                            <div className="w-full rounded-full h-3 overflow-hidden personal-track">
                                                <div
                                                    className={`${getTagColor(item.tag)} h-full rounded-full transition-all duration-500`}
                                                    style={{ width: `${percentage}%` }}
                                                />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <p className="text-center py-10 personal-muted">No data available</p>
                        )}
                    </div>
                </div>

                {/* Timeline */}
                <div className="personal-card rounded-2xl p-8">
                    <div className="flex items-center gap-3 mb-8">
                        <Clock size={28} />
                        <h2 className="text-2xl font-bold">
                            Your Timeline  
                        </h2>
                        <span className="text-sm ml-auto personal-muted">
                            Showing {filteredMessages.length} of {messages.length} messages
                        </span>
                    </div>

                    {filteredMessages.length > 0 ? (
                        <div className="space-y-6">
                            {filteredMessages.map((message, index) => {
                                const typeInfo = getMessageTypeInfo(message.message_id);
                                return (
                                    <div
                                        key={message.id}
                                        className="relative pl-8 pb-8 border-l-2 personal-timeline-border last:border-l-0 last:pb-0"
                                    >
                                        {/* Timeline dot */}
                                        <div className="absolute left-[-9px] top-0 w-4 h-4 personal-timeline-dot rounded-full border-4" />
                                        
                                        <div className="personal-panel rounded-xl p-6 transition-all">
                                            <div className="flex items-center gap-3 mb-3 flex-wrap">
                                                <span className={`${typeInfo.color} px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1 personal-chip`}> 
                                                    <span>{typeInfo.icon}</span>
                                                    {typeInfo.label}
                                                </span>
                                                <span className={`${getTagColor(message.tag)} px-3 py-1 rounded-full text-sm font-semibold`}>
                                                    {message.tag || 'Life'}
                                                </span>
                                                <span className="text-sm flex items-center gap-2 personal-muted">
                                                    <Calendar size={16} />
                                                    {formatDate(message.created_at)}
                                                </span>
                                            </div>
                                            <p className="text-lg leading-relaxed">
                                                {message.description}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <p className="text-xl personal-muted">
                                {messageFilter === 'all' 
                                    ? "Your journey starts here. Share your first thought!"
                                    : `No ${messageFilter === 'anxiety' ? 'anxiety' : 'happy'} messages found.`}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PersonalPage;
