import React from 'react';
import { Code, Smartphone, Database, Globe, Cloud, Bot } from 'lucide-react';
import Card, { CardHeader, CardContent } from '../components/ui/Card';
import SectionHeader from '../components/ui/SectionHeader';
import SEO from '../components/ui/SEO';
import RevealOnScroll from '../components/ui/RevealOnScroll';

export default function Services() {
  const services = [
    {
      icon: <Globe size={48} />,
      iconColor: "text-blue-400",
      iconBg: "bg-blue-500/10 border-blue-500/20",
      title: "Custom Web Applications",
      description: "We build fast, secure, and scalable web applications using the MERN stack, Next.js, and modern architectural patterns. Our solutions are designed to handle massive traffic while delivering buttery-smooth user experiences that keep your audience engaged."
    },
    {
      icon: <Smartphone size={48} />,
      iconColor: "text-violet-400",
      iconBg: "bg-violet-500/10 border-violet-500/20",
      title: "Mobile App Development",
      description: "Engaging native and cross-platform mobile experiences for iOS and Android using React Native and Flutter. We ensure your app not only looks stunning but also performs flawlessly across all devices and screen sizes."
    },
    {
      icon: <Code size={32} />,
      iconColor: "text-rose-400",
      iconBg: "bg-rose-500/10 border-rose-500/20",
      title: "UI/UX Design",
      description: "Beautiful, intuitive, and conversion-focused interfaces designed meticulously in Figma to delight your users."
    },
    {
      icon: <Bot size={32} />,
      iconColor: "text-amber-400",
      iconBg: "bg-amber-500/10 border-amber-500/20",
      title: "AI & Machine Learning",
      description: "Integrate LLMs, computer vision, and predictive analytics into your products to automate tasks and unlock insights."
    },
    {
      icon: <Database size={32} />,
      iconColor: "text-teal-400",
      iconBg: "bg-teal-500/10 border-teal-500/20",
      title: "API Development",
      description: "Robust RESTful and GraphQL APIs built with Node.js to power your ecosystem and integrate third-party services."
    },
    {
      icon: <Cloud size={32} />,
      iconColor: "text-emerald-400",
      iconBg: "bg-emerald-500/10 border-emerald-500/20",
      title: "Cloud & DevOps",
      description: "Scalable cloud infrastructure on AWS and GCP with automated CI/CD pipelines to ensure rapid, reliable deployments."
    }
  ];

  const featuredServices = services.slice(0, 2);
  const regularServices = services.slice(2);

  return (
    <div className="py-12 px-4 max-w-7xl mx-auto">
      <SEO title="Our Services" description="End-to-end software development services tailored to your business needs." />
      <RevealOnScroll>
        <SectionHeader 
          title="Our Services" 
          subtitle="End-to-end software development services tailored to your business needs. We handle everything from concept to deployment."
          badge="Expertise"
          isMainHeading={true}
        />
      </RevealOnScroll>

      <div className="flex flex-col gap-24 mt-16 mb-24">
        {featuredServices.map((service, idx) => (
          <RevealOnScroll key={idx}>
            <div className={`flex flex-col ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12 lg:gap-24`}>
              <div className="flex-1 space-y-6">
                <div className={`w-20 h-20 rounded-3xl flex items-center justify-center border shadow-inner ${service.iconBg} ${service.iconColor}`}>
                  {service.icon}
                </div>
                <h2 className="text-3xl md:text-4xl font-bold">{service.title}</h2>
                <p className="text-lg text-slate-400 leading-relaxed">
                  {service.description}
                </p>
              </div>
              <div className="flex-1 w-full">
                <div className="aspect-video rounded-2xl bg-slate-800/50 border border-slate-700/50 flex items-center justify-center relative overflow-hidden group">
                  <div className={`absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-700 ${service.iconBg.replace('border-', '')}`}></div>
                  <div className={`transform group-hover:scale-110 transition-transform duration-700 ${service.iconColor}`}>
                    {React.cloneElement(service.icon, { size: 120, opacity: 0.2 })}
                  </div>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
        {regularServices.map((service, idx) => (
          <RevealOnScroll key={idx}>
            <Card hover className="bg-surface-elevated/30 h-full">
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
          </RevealOnScroll>
        ))}
      </div>
    </div>
  );
}
