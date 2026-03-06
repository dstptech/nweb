import React from 'react';

export default function Contact() {
  return (
    <div className="bg-white min-h-screen text-gray-900 font-sans selection:bg-blue-100 selection:text-blue-700">
      {/* Hero Section */}
      <section className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-5xl mx-auto">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#ECFDF5] text-[#059669] text-xs font-semibold border border-[#D1FAE5] mb-10">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] mr-2" />
            Open for new engagements
          </div>
          <h1 className="text-[60px] font-extrabold tracking-tight text-[#111827] mb-10 leading-[1.1]">
            Let's Build Something<br />
            <span className="text-[#2563EB]">Exceptional Together</span>
          </h1>
          <p className="text-lg sm:text-xl text-[#6B7280] leading-relaxed max-w-3xl mx-auto font-medium">
            Whether you have a groundbreaking idea or need to scale your existing platform, our team is ready to explore your next big project.
          </p>
        </div>
      </section>

      {/* Get in Touch & Form Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          
          {/* Left: Contact Info */}
          <div className="lg:pr-10 pt-4">
            <h2 className="text-[42px] font-extrabold text-[#111827] mb-8 tracking-tight">Get in Touch</h2>
            <p className="text-[#6B7280] text-[18px] mb-16 leading-relaxed font-medium max-w-md">
              We are serving clients worldwide. Reach out to us for inquiries about our services, partnerships, or just to say hello.
            </p>

            <div className="space-y-10">
              <div className="flex items-center">
                <div className="bg-[#EFF6FF] p-3 rounded-xl mr-6">
                  <svg className="w-5 h-5 text-[#2563EB]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-[16px] font-bold text-[#111827]">Email Us</h3>
                  <p className="text-[#6B7280] text-[13px] mb-0.5 font-medium">Our friendly team is here to help.</p>
                  <a href="mailto:info@padmastechnologies.com" className="text-[#2563EB] font-bold text-[15px] hover:underline decoration-1 underline-offset-4">
                    info@padmastechnologies.com
                  </a>
                </div>
              </div>

              <div className="flex items-center">
                <div className="bg-[#EFF6FF] p-3 rounded-xl mr-6">
                  <svg className="w-5 h-5 text-[#2563EB]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-[16px] font-bold text-[#111827]">LinkedIn</h3>
                  <p className="text-[#6B7280] text-[13px] mb-0.5 font-medium">Connect with us professionally.</p>
                  <a href="https://linkedin.com" className="text-[#2563EB] font-bold text-[15px] hover:underline decoration-1 underline-offset-4">
                    Padmas™ Technologies
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="bg-white p-10 rounded-[20px] border border-[#F3F4F6] shadow-[0_20px_50px_rgba(0,0,0,0.04)]">
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-[14px] font-bold text-[#374151] mb-2">Full Name</label>
                <input
                  type="text"
                  placeholder="Jane Doe"
                  className="w-full px-4 py-3 rounded-xl border border-[#E5E7EB] focus:outline-none focus:ring-1 focus:ring-[#2563EB] focus:border-[#2563EB] transition-all placeholder:text-[#9CA3AF] text-[14px] font-medium bg-[#FAFBFC]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[14px] font-bold text-[#374151] mb-2">Email</label>
                  <input
                    type="email"
                    placeholder="jane@example.com"
                    className="w-full px-4 py-3 rounded-xl border border-[#E5E7EB] focus:outline-none focus:ring-1 focus:ring-[#2563EB] focus:border-[#2563EB] transition-all placeholder:text-[#9CA3AF] text-[14px] font-medium bg-[#FAFBFC]"
                  />
                </div>
                <div>
                  <label className="block text-[14px] font-bold text-[#374151] mb-2">Phone <span className="text-[#9CA3AF] font-normal ml-1">(Optional)</span></label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 987-6543"
                    className="w-full px-4 py-3 rounded-xl border border-[#E5E7EB] focus:outline-none focus:ring-1 focus:ring-[#2563EB] focus:border-[#2563EB] transition-all placeholder:text-[#9CA3AF] text-[14px] font-medium bg-[#FAFBFC]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[14px] font-bold text-[#374151] mb-2">Company <span className="text-[#9CA3AF] font-normal ml-1">(Optional)</span></label>
                <input
                  type="text"
                  placeholder="Your Company Ltd."
                  className="w-full px-4 py-3 rounded-xl border border-[#E5E7EB] focus:outline-none focus:ring-1 focus:ring-[#2563EB] focus:border-[#2563EB] transition-all placeholder:text-[#9CA3AF] text-[14px] font-medium bg-[#FAFBFC]"
                />
              </div>

              <div>
                <label className="block text-[14px] font-bold text-[#374151] mb-2">How can we help you?</label>
                <textarea
                  rows={6}
                  placeholder="Tell us a little about your project..."
                  className="w-full px-4 py-3 rounded-xl border border-[#E5E7EB] focus:outline-none focus:ring-1 focus:ring-[#2563EB] focus:border-[#2563EB] transition-all resize-none placeholder:text-[#9CA3AF] text-[14px] font-medium bg-[#FAFBFC]"
                />
              </div>

              <button className="w-full bg-[#0052CC] hover:bg-[#0747A6] text-white font-bold py-4 rounded-xl transition-all text-[15px] shadow-lg shadow-blue-600/10">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Info Cards Section */}
      <section className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="bg-white px-10 py-5 rounded-[18px] border border-[#E5E7EB] shadow-sm group relative flex flex-col justify-center">
            <div className="bg-[#EFF6FF] w-11 h-11 rounded-xl flex items-center justify-center mb-3 transition-colors">
              <svg className="w-5 h-5 text-[#2563EB]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-[17px] font-bold text-[#111827] mb-1.5 tracking-tight">Email Us Directly</h3>
            <p className="text-[#6B7280] mb-4 text-[13px] font-medium leading-relaxed max-w-[400px]">Prefer email? Shoot us a message and we'll get back to you within 24 hours.</p>
            <a href="mailto:info@padmastechnologies.com" className="text-[#2563EB] font-bold text-[13px] hover:underline decoration-1 underline-offset-4">info@dstptechnologies.com</a>
            <div className="absolute top-5 right-5 text-gray-300 opacity-60 group-hover:opacity-100 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </div>
          </div>

          <div className="bg-white px-10 py-5 rounded-[18px] border border-[#E5E7EB] shadow-sm group relative flex flex-col justify-center">
            <div className="bg-[#EFF6FF] w-11 h-11 rounded-xl flex items-center justify-center mb-3 transition-colors">
              <svg className="w-5 h-5 text-[#2563EB]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </div>
            <h3 className="text-[17px] font-bold text-[#111827] mb-1.5 tracking-tight">Connect on LinkedIn</h3>
            <p className="text-[#6B7280] mb-4 text-[13px] font-medium leading-relaxed max-w-[400px]">Follow our journey, see job updates, and connect with our team professionally.</p>
            <a href="https://linkedin.com" className="text-[#2563EB] font-bold text-[13px] hover:underline decoration-1 underline-offset-4">DSTP™ Technologies</a>
            <div className="absolute top-5 right-5 text-gray-300 opacity-60 group-hover:opacity-100 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 text-center bg-[#002B7F] text-white relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-[-10%] left-[-5%] w-72 h-72 bg-white rounded-full blur-[100px]" />
          <div className="absolute bottom-[-10%] right-[-5%] w-72 h-72 bg-white rounded-full blur-[100px]" />
        </div>

        <div className="max-w-3xl mx-auto relative z-10">
          <h2 className="text-[48px] font-extrabold tracking-[-1.2px] mb-8 leading-[1.2]">
            Let's Start a Meaningful<br />
            Conversation
          </h2>
          <p className="text-[17px] text-blue-100/90 mb-10 max-w-2xl mx-auto leading-relaxed font-medium">
            We don't just write code; we build relationships. Let's discuss how we can bring value to your business today.
          </p>
          <button className="px-8 py-3.5 border-2 border-white text-[16px] font-bold rounded-xl hover:bg-white hover:text-[#002B7F] transition-all duration-300 shadow-xl">
            Schedule a Call
          </button>
        </div>
      </section>
    </div>
  );
}
