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
            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
              <Target className="text-primary" size={28} />
            </div>
            <h3 className="text-xl font-bold mb-3">Precision</h3>
            <p className="text-slate-400 text-sm">Every pixel and line of code is meticulously crafted to ensure optimal performance and aesthetics.</p>
          </div>
          <div className="text-center px-4">
            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
              <Users className="text-primary" size={28} />
            </div>
            <h3 className="text-xl font-bold mb-3">Collaboration</h3>
            <p className="text-slate-400 text-sm">We work as an extension of your team, ensuring transparency and continuous communication.</p>
          </div>
          <div className="text-center px-4">
            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
              <Award className="text-primary" size={28} />
            </div>
            <h3 className="text-xl font-bold mb-3">Excellence</h3>
            <p className="text-slate-400 text-sm">We don't settle for average. Our standard is industry-leading software that drives measurable results.</p>
          </div>
        </div>
      </RevealOnScroll>

      {/* Team Section */}
      <RevealOnScroll>
        <div className="mt-32">
          <SectionHeader 
            title="Meet the Leadership" 
            subtitle="The brilliant minds guiding our engineering and design teams."
            badge="Team"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: "Elena Rodriguez", role: "Founder & CEO", initials: "ER", color: "text-primary bg-primary/10 border-primary/20", bio: "Former engineering lead at Tech Giants, passionate about scalable architecture." },
              { name: "Marcus Chen", role: "CTO", initials: "MC", color: "text-accent bg-accent/10 border-accent/20", bio: "Distributed systems expert with a love for cloud-native infrastructure." },
              { name: "Sophia Patel", role: "Head of Design", initials: "SP", color: "text-rose-400 bg-rose-500/10 border-rose-500/20", bio: "Award-winning designer obsessed with micro-interactions and usability." },
              { name: "David Kim", role: "Lead AI Engineer", initials: "DK", color: "text-amber-400 bg-amber-500/10 border-amber-500/20", bio: "Machine learning researcher pushing the boundaries of generative AI." }
            ].map((member, i) => (
              <div key={i} className="flex flex-col items-center text-center p-8 rounded-3xl bg-surface-elevated/20 border border-slate-800/50 hover:bg-surface-elevated/40 transition-colors">
                <div className={`w-24 h-24 rounded-full flex items-center justify-center text-2xl font-bold mb-6 border ${member.color}`}>
                  {member.initials}
                </div>
                <h4 className="text-lg font-bold text-white mb-1">{member.name}</h4>
                <p className="text-sm text-primary font-medium mb-4">{member.role}</p>
                <p className="text-sm text-slate-400 leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </RevealOnScroll>
    </div>
  );
}
