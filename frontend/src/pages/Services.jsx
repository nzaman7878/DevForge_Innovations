import React from 'react';
import { Code, Smartphone, Database, Globe, Cloud, Bot } from 'lucide-react';
import Card, { CardHeader, CardContent } from '../components/ui/Card';
import SectionHeader from '../components/ui/SectionHeader';
import SEO from '../components/ui/SEO';

export default function Services() {
  const services = [
    {
      icon: <Globe className="text-primary" size={32} />,
      title: "Custom Web Applications",
      description: "We build fast, secure, and scalable web applications using the MERN stack, Next.js, and modern architectural patterns."
    },
    {
      icon: <Smartphone className="text-primary" size={32} />,
      title: "Mobile App Development",
      description: "Engaging native and cross-platform mobile experiences for iOS and Android using React Native and Flutter."
    },
    {
      icon: <Code className="text-primary" size={32} />,
      title: "UI/UX Design",
      description: "Beautiful, intuitive, and conversion-focused interfaces designed meticulously in Figma to delight your users."
    },
    {
      icon: <Bot className="text-primary" size={32} />,
      title: "AI & Machine Learning",
      description: "Integrate LLMs, computer vision, and predictive analytics into your products to automate tasks and unlock insights."
    },
    {
      icon: <Database className="text-primary" size={32} />,
      title: "API Development",
      description: "Robust RESTful and GraphQL APIs built with Node.js to power your ecosystem and integrate third-party services."
    },
    {
      icon: <Cloud className="text-primary" size={32} />,
      title: "Cloud & DevOps",
      description: "Scalable cloud infrastructure on AWS and GCP with automated CI/CD pipelines to ensure rapid, reliable deployments."
    }
  ];

  return (
    <div className="py-12 px-4">
      <SEO title="Our Services" description="End-to-end software development services tailored to your business needs." />
      <SectionHeader 
        title="Our Services" 
        subtitle="End-to-end software development services tailored to your business needs. We handle everything from concept to deployment."
        badge="Expertise"
        isMainHeading={true}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, idx) => (
          <Card key={idx} hover className="border-slate-800/80 bg-surface-elevated/30">
            <CardContent className="p-8">
              <div className="mb-6 bg-slate-800/50 w-16 h-16 rounded-2xl flex items-center justify-center border border-slate-700/50 shadow-inner">
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
    </div>
  );
}
