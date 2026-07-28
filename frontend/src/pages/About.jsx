import React from 'react';
import { Target, Users, Award } from 'lucide-react';
import SEO from '../components/ui/SEO';
import SectionHeader from '../components/ui/SectionHeader';
import RevealOnScroll from '../components/ui/RevealOnScroll';

export default function About() {
  return (
    <div className="py-12 px-4">
      <SEO title="About Us" description="We are a team of passionate engineers, designers, and product strategists." />
      <RevealOnScroll>
        <SectionHeader 
          title="About DevForge" 
          subtitle="We are a team of passionate engineers, designers, and product strategists dedicated to crafting exceptional digital experiences."
          badge="Our Story"
          isMainHeading={true}
        />
      </RevealOnScroll>

      <RevealOnScroll>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
        <div>
          <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
          <p className="text-slate-400 leading-relaxed mb-6">
            At DevForge Innovations, our mission is to empower businesses through technology. We believe that great software is the differentiator in today's digital economy. We don't just write code; we solve complex business problems.
          </p>
          <p className="text-slate-400 leading-relaxed">
            Founded with a vision to bridge the gap between stunning design and robust engineering, we deliver scalable solutions that grow alongside our clients.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-surface-elevated/40 border border-slate-800 rounded-2xl p-6 text-center">
            <div className="text-4xl font-extrabold text-primary mb-2">50+</div>
            <div className="text-sm text-slate-400 font-medium">Projects Shipped</div>
          </div>
          <div className="bg-surface-elevated/40 border border-slate-800 rounded-2xl p-6 text-center">
            <div className="text-4xl font-extrabold text-primary mb-2">15+</div>
            <div className="text-sm text-slate-400 font-medium">Expert Engineers</div>
          </div>
          <div className="bg-surface-elevated/40 border border-slate-800 rounded-2xl p-6 text-center col-span-2">
            <div className="text-4xl font-extrabold text-primary mb-2">99%</div>
            <div className="text-sm text-slate-400 font-medium">Client Satisfaction Rate</div>
          </div>
        </div>
        </div>
      </RevealOnScroll>

      <RevealOnScroll>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="text-center px-4">
          <div className="mx-auto w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mb-6">
            <Target className="text-primary" size={28} />
          </div>
          <h3 className="text-xl font-bold mb-3">Precision</h3>
          <p className="text-slate-400 text-sm">Every pixel and line of code is meticulously crafted to ensure optimal performance and aesthetics.</p>
        </div>
        <div className="text-center px-4">
          <div className="mx-auto w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mb-6">
            <Users className="text-primary" size={28} />
          </div>
          <h3 className="text-xl font-bold mb-3">Collaboration</h3>
          <p className="text-slate-400 text-sm">We work as an extension of your team, ensuring transparency and continuous communication.</p>
        </div>
        <div className="text-center px-4">
          <div className="mx-auto w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mb-6">
            <Award className="text-primary" size={28} />
          </div>
          <h3 className="text-xl font-bold mb-3">Excellence</h3>
          <p className="text-slate-400 text-sm">We don't settle for average. Our standard is industry-leading software that drives measurable results.</p>
          </div>
        </div>
      </RevealOnScroll>
    </div>
  );
}
