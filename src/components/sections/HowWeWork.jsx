import React from 'react';

const steps = [
  {
    number: '1',
    title: 'Discover',
    description: 'We analyze your requirements and understand your core challenges.',
  },
  {
    number: '2',
    title: 'Design',
    description: 'Architecting the solution and creating intuitive UI/UX prototypes.',
  },
  {
    number: '3',
    title: 'Develop',
    description: 'Agile coding sprints with regular updates and quality assurance.',
  },
  {
    number: '4',
    title: 'Scale',
    description: 'Deploy, monitor, and optimize for user growth and stability.',
  },
];

export default function HowWeWork() {
  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-[#001F3F] tracking-tight">
            How We Work
          </h2>
        </div>

        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-10 left-[10%] right-[10%] h-0.5 bg-blue-100" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative flex flex-col items-center text-center group">
                {/* Number Circle */}
                <div className="relative z-10 flex items-center justify-center w-20 h-20 rounded-full bg-[#0056D2] text-white text-xl font-bold shadow-lg mb-8 transition-transform duration-300 group-hover:scale-110">
                  {step.number}
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {step.title}
                </h3>
                <p className="text-gray-500 leading-relaxed max-w-[250px]">
                  {step.description}
                </p>

                {/* Connecting Line (Mobile/Tablet) */}
                {index < steps.length - 1 && (
                  <div className="lg:hidden absolute top-20 left-1/2 -translate-x-1/2 h-12 w-0.5 bg-blue-100 mt-4" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
