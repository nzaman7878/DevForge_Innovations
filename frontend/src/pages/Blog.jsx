import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Card, { CardContent } from '../components/ui/Card';
import { CardSkeleton, PageSkeleton } from '../components/ui/Skeleton';
import { Calendar, User } from 'lucide-react';
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
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Insights & Engineering</h1>
        <p className="text-lg text-slate-400">
          Thoughts on software development, digital strategy, and the future of technology from the DevForge team.
        </p>
      </div>

      {loading ? (
        <PageSkeleton className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {Array.from({ length: 6 }).map((_, i) => <CardSkeleton key={i} />)}
        </PageSkeleton>
      ) : posts.length === 0 ? (
        <div className="text-center text-slate-500 py-12 border border-slate-800 rounded-2xl bg-surface-elevated/30">
          No blog posts published yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {posts.map(post => (
            <Link key={post._id} to={`/blog/${post.slug}`}>
              <Card hover className="h-full flex flex-col bg-surface-elevated/20 border-slate-800/60">
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
