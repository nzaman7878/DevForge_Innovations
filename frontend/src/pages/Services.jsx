import React from 'react';
import { Code, Smartphone, Database, Globe, Cloud, Bot } from 'lucide-react';
import Card, { CardHeader, CardContent } from '../components/ui/Card';
import SectionHeader from '../components/ui/SectionHeader';
import SEO from '../components/ui/SEO';
import RevealOnScroll from '../components/ui/RevealOnScroll';

export default function Services() {
  const services = [
    {
      icon: <Globe size={32} />,
      iconColor: "text-primary",
      iconBg: "bg-primary/10 border-primary/20",
      title: "Custom Web Applications",
      description: "We build fast, secure, and scalable web applications using the MERN stack, Next.js, and modern architectural patterns."
    },
    {
      icon: <Smartphone size={32} />,
      iconColor: "text-accent",
      iconBg: "bg-accent/10 border-accent/20",
      title: "Mobile App Development",
      description: "Engaging native and cross-platform mobile experiences for iOS and Android using React Native and Flutter."
    },
    {
      icon: <Code size={32} />,
      iconColor: "text-highlight",
      iconBg: "bg-highlight/10 border-highlight/20",
      title: "UI/UX Design",
      description: "Beautiful, intuitive, and conversion-focused interfaces designed meticulously in Figma to delight your users."
    },
    {
      icon: <Bot size={32} />,
      iconColor: "text-emerald-400",
      iconBg: "bg-emerald-500/10 border-emerald-500/20",
      title: "AI & Machine Learning",
      description: "Integrate LLMs, computer vision, and predictive analytics into your products to automate tasks and unlock insights."
    },
    {
      icon: <Database size={32} />,
      iconColor: "text-blue-400",
      iconBg: "bg-blue-500/10 border-blue-500/20",
      title: "API Development",
      description: "Robust RESTful and GraphQL APIs built with Node.js to power your ecosystem and integrate third-party services."
    },
    {
      icon: <Cloud size={32} />,
      iconColor: "text-purple-400",
      iconBg: "bg-purple-500/10 border-purple-500/20",
      title: "Cloud & DevOps",
      description: "Scalable cloud infrastructure on AWS and GCP with automated CI/CD pipelines to ensure rapid, reliable deployments."
    }
  ];

  return (
    <div className="py-12 px-4">
      <SEO title="Our Services" description="End-to-end software development services tailored to your business needs." />
      <RevealOnScroll>
        <SectionHeader 
          title="Our Services" 
          subtitle="End-to-end software development services tailored to your business needs. We handle everything from concept to deployment."
          badge="Expertise"
          isMainHeading={true}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, idx) => (
            <Card key={idx} hover className="bg-surface-elevated/30">
              <CardContent className="p-8">
                <div className={`mb-6 w-16 h-16 rounded-2xl flex items-center justify-center border shadow-inner ${service.iconBg} ${service.iconColor}`}>
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-slate-400 leading-relaxed text-sm">
                  {service.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </RevealOnScroll>
    </div>
  );
}
