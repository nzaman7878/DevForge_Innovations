import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import { Calendar, User, ArrowLeft } from 'lucide-react';
import Button from '../components/ui/Button';
import SEO from '../components/ui/SEO';
import { PageSkeleton } from '../components/ui/Skeleton';

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/posts/${slug}`);
        setPost(res.data);
      } catch (err) {
        console.error(err);
        setError('Post not found');
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [slug]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
      const clientHeight = document.documentElement.clientHeight || window.innerHeight;
      
      const windowHeight = scrollHeight - clientHeight;
      if (windowHeight <= 0) return;
      
      const progress = (scrollTop / windowHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (loading) return (
    <PageSkeleton className="py-12 px-4 max-w-3xl mx-auto w-full space-y-8">
      <div className="h-4 w-40 bg-slate-800/60 rounded animate-pulse" />
      <div className="space-y-4">
        <div className="h-10 bg-slate-800/60 rounded animate-pulse w-3/4" />
        <div className="h-10 bg-slate-800/60 rounded animate-pulse w-1/2" />
      </div>
      <div className="flex gap-4">
        <div className="h-4 w-24 bg-slate-800/60 rounded animate-pulse" />
        <div className="h-4 w-24 bg-slate-800/60 rounded animate-pulse" />
      </div>
      <div className="h-64 bg-slate-800/60 rounded-2xl animate-pulse" />
      <div className="space-y-3">
        {Array.from({ length: 8 }).map((_, i) => <div key={i} className={`h-4 bg-slate-800/60 rounded animate-pulse ${i % 3 === 0 ? 'w-full' : i % 3 === 1 ? 'w-5/6' : 'w-4/5'}`} />)}
      </div>
    </PageSkeleton>
  );
  
  if (error || !post) return (
    <div className="text-center py-24">
      <h2 className="text-2xl font-bold mb-4">{error || 'Something went wrong'}</h2>
      <Link to="/blog">
        <Button variant="secondary">Return to Blog</Button>
      </Link>
    </div>
  );

  return (
    <>
      {/* Scroll Progress Bar */}
      <div 
        className="fixed top-0 left-0 h-[3px] bg-primary shadow-[0_0_10px_rgba(56,189,248,0.7)] transition-all duration-100 ease-out"
        style={{ width: `${scrollProgress}%`, zIndex: 60 }}
      />
      <article className="py-12 px-4 max-w-3xl mx-auto w-full">
      <SEO 
        title={post.title} 
        description={post.excerpt} 
        image={post.coverImage} 
        type="article" 
      />
      <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-primary transition-colors mb-8">
        <ArrowLeft size={16} /> Back to all articles
      </Link>

      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
          {post.title}
        </h1>
        
        <div className="flex flex-wrap items-center gap-6 text-sm text-slate-400 pb-8 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <User size={16} className="text-primary" />
            <span>{post.author?.name || 'DevForge Team'}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar size={16} className="text-primary" />
            <span>{new Date(post.createdAt).toLocaleDateString()}</span>
          </div>
          {post.tags && post.tags.map(tag => (
            <span key={tag} className="px-2.5 py-1 rounded-full bg-slate-800 text-xs font-medium text-slate-300">
              {tag}
            </span>
          ))}
        </div>
      </header>

      {post.coverImage && (
        <div className="w-full h-64 md:h-96 mb-12 rounded-2xl overflow-hidden border border-slate-800">
          <img src={post.coverImage} alt={post.title} loading="lazy" className="w-full h-full object-cover" />
        </div>
      )}

      <div className="prose prose-invert prose-blue max-w-none 
        prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6
        prose-p:text-slate-300 prose-p:leading-relaxed prose-p:mb-6
        prose-a:text-primary prose-a:no-underline hover:prose-a:underline
        prose-code:text-primary prose-code:bg-primary/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
        prose-pre:bg-slate-900 prose-pre:border prose-pre:border-slate-800
        prose-img:rounded-xl">
        <ReactMarkdown>
          {post.content}
        </ReactMarkdown>
      </div>
    </article>
    </>
  );
}
