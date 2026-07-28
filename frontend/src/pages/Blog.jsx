import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Card, { CardContent } from '../components/ui/Card';
import { CardSkeleton, PageSkeleton } from '../components/ui/Skeleton';
import SectionHeader from '../components/ui/SectionHeader';
import { Calendar, User, FileText, Sparkles } from 'lucide-react';
import Button from '../components/ui/Button';
import SEO from '../components/ui/SEO';

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/posts`);
        setPosts(res.data);
      } catch (error) {
        console.error('Error fetching posts', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="py-12 px-4">
      <SEO title="Insights & Engineering" description="Thoughts on software development, digital strategy, and the future of technology." />
      <SectionHeader 
        title="Insights & Engineering" 
        subtitle="Thoughts on software development, digital strategy, and the future of technology from the DevForge team."
        badge="Journal"
        isMainHeading={true}
      />

      {loading ? (
        <PageSkeleton className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {Array.from({ length: 6 }).map((_, i) => <CardSkeleton key={i} />)}
        </PageSkeleton>
      ) : posts.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center py-24 border border-slate-800 border-dashed rounded-3xl bg-surface-elevated/10 max-w-4xl mx-auto mt-8">
          <div className="w-24 h-24 rounded-full bg-slate-800/50 flex items-center justify-center mb-6 relative">
            <FileText size={40} className="text-slate-500" />
            <Sparkles size={24} className="text-primary absolute -top-1 -right-1" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-3">Coming Soon</h3>
          <p className="text-slate-400 max-w-md mb-8 leading-relaxed">We're currently writing our first batch of engineering insights and industry thought leadership. Stay tuned!</p>
          <Link to="/contact">
            <Button variant="secondary">Subscribe to Updates</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {posts.map(post => (
            <Link key={post._id} to={`/blog/${post.slug}`}>
              <Card hover className="h-full flex flex-col bg-surface-elevated/20">
                {post.coverImage && (
                  <div className="h-48 w-full overflow-hidden">
                    <img 
                      src={post.coverImage} 
                      alt={post.title}
                      loading="lazy"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}
                <CardContent className="p-6 flex flex-col flex-grow">
                  <h2 className="text-xl font-bold mb-3 hover:text-primary transition-colors">{post.title}</h2>
                  <p className="text-slate-400 text-sm mb-6 flex-grow line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-slate-500 mt-auto pt-4 border-t border-slate-800/50">
                    <div className="flex items-center gap-1.5">
                      <User size={14} />
                      <span>{post.author?.name || 'DevForge Team'}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar size={14} />
                      <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
