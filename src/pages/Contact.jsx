import { useState } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Mail, MapPin, Clock, CheckCircle2, MessageCircle } from "lucide-react";
import SEO from "../seo/SEO";
import { services } from "../data/services";

const Contact = () => {
  const location = useLocation();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: location.state?.selectedService || "",
    date: "",
    message: ""
  });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = "Full name is required";
    if (!formData.phone.trim()) tempErrors.phone = "Phone number is required";
    if (!formData.email.trim()) {
      tempErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Please enter a valid email";
    }
    if (!formData.service) tempErrors.service = "Please select a service";
    if (!formData.date) tempErrors.date = "Please choose a date";

    if (Object.keys(tempErrors).length > 0) {
      setErrors(tempErrors);
      return;
    }

    // Construct formatted WhatsApp message
    const formattedText = `Hello Chiro Care Clinic, I would like to book an appointment.

Booking Details:
- Name: ${formData.name}
- Phone: ${formData.phone}
- Email: ${formData.email}
- Treatment: ${formData.service}
- Preferred Date: ${formData.date}
${formData.message && formData.message.trim() ? `- Description: ${formData.message}` : ""}`;

    const whatsappUrl = `https://wa.me/916282018754?text=${encodeURIComponent(formattedText)}`;

    // Open WhatsApp URL in a new window/tab
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");

    setIsSubmitted(true);
    setTimeout(() => {
      setFormData({ name: "", phone: "", email: "", service: "", date: "", message: "" });
      setIsSubmitted(false);
    }, 5000);
  };

  return (
    <>
      <SEO 
        title="Contact Us" 
        description="Book your appointment at Chiro Care Ayurvedic Clinic. Get clinic addresses, directions, calling numbers, and operational hours."
        canonicalPath="/contact"
      />

      {/* Compact Hero Banner (60-70vh) */}
      <section className="relative h-[60vh] md:h-[65vh] flex flex-col justify-center items-center bg-gradient-to-br from-[#005D73] to-[#0088A9] text-white text-center px-4 overflow-hidden select-none">
        <div className="absolute inset-0 bg-cover bg-center opacity-10" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&q=80&w=800')" }} />
        <div className="absolute bottom-[-20%] right-[10%] w-96 h-96 bg-[#00C7A0]/15 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto relative z-10 flex flex-col gap-4">
          <span className="text-xs uppercase tracking-[0.25em] text-[#00C7A0] font-extrabold">
            Get in Touch
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight leading-tight">
            Reservations
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-white/80 max-w-xl mx-auto leading-relaxed font-normal mt-1">
            Request an appointment, query therapy plans, or find detailed directions to our center in Kaloor, Ernakulam.
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <section className="py-24 bg-[#F8FCFB] px-4 md:px-8 relative z-10 text-left">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Info Details Section */}
          <div className="lg:col-span-5 flex flex-col gap-8 justify-center">
            <div className="flex flex-col gap-3">
              <span className="text-xs uppercase tracking-[0.25em] font-extrabold text-[#0088A9]">
                Reach Out Directly
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-black text-[#17332E]">
                Contact Information
              </h2>
              <p className="text-xs md:text-sm text-[#17332E]/70 leading-relaxed font-medium mt-1">
                Have questions regarding structural adjustments or custom Ayurvedic massage oils? Speak directly to our front desk team.
              </p>
            </div>

            <div className="flex flex-col gap-5">
              <a
                href="https://www.google.com/maps/search/?api=1&query=Metro+Pillar+567%2C+Banerji+Rd%2C+Kaloor%2C+Ernakulam%2C+Kochi%2C+Kerala+682017"
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-4 items-start text-xs md:text-sm text-[#17332E]/80 font-bold hover:opacity-85 transition-opacity"
              >
                <div className="w-11 h-11 rounded-2xl bg-[#EEF8F6] flex items-center justify-center shrink-0 text-[#0088A9] shadow-inner border border-[#00C7A0]/10">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif font-black text-[#17332E] text-sm mb-1">Clinic Address</h4>
                  <p className="leading-relaxed font-medium text-[#17332E]/70">
                    Chiro Care Ayurvedic Clinic, BRRA 46, Bank Road, Metro pillar.567, Avenue.5th, Kaloor, Ernakulam, Kerala - 682017
                  </p>
                  <span className="text-[10px] text-[#0088A9] font-bold mt-1 block">Open in Google Maps →</span>
                </div>
              </a>

              <div className="flex gap-4 items-start text-xs md:text-sm text-[#17332E]/80 font-bold">
                <div className="w-11 h-11 rounded-2xl bg-[#EEF8F6] flex items-center justify-center shrink-0 text-[#0088A9] shadow-inner border border-[#00C7A0]/10">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif font-black text-[#17332E] text-sm mb-1">Direct Call</h4>
                  <p className="leading-relaxed font-black text-[#0088A9]">+91-6282018754</p>
                  <p className="text-[10px] text-[#17332E]/50 font-bold mt-0.5">Assistance during clinic working hours.</p>
                </div>
              </div>

              <div className="flex gap-4 items-start text-xs md:text-sm text-[#17332E]/80 font-bold">
                <div className="w-11 h-11 rounded-2xl bg-[#EEF8F6] flex items-center justify-center shrink-0 text-[#0088A9] shadow-inner border border-[#00C7A0]/10">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif font-black text-[#17332E] text-sm mb-1">Email Queries</h4>
                  <p className="leading-relaxed font-black text-[#0088A9]">info@chirocareclinic.in</p>
                </div>
              </div>

              <div className="flex gap-4 items-start text-xs md:text-sm text-[#17332E]/80 font-bold">
                <div className="w-11 h-11 rounded-2xl bg-[#EEF8F6] flex items-center justify-center shrink-0 text-[#0088A9] shadow-inner border border-[#00C7A0]/10">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif font-black text-[#17332E] text-sm mb-1">Operational Hours</h4>
                  <p className="leading-relaxed font-medium text-[#17332E]/70">Mon - Sat: 9:00 AM - 8:00 PM</p>
                  <p className="leading-relaxed font-medium text-[#17332E]/70">Sunday: 9:00 AM - 2:00 PM</p>
                </div>
              </div>
            </div>

            {/* Quick action buttons */}
            <div className="grid grid-cols-2 gap-4 mt-2">
              <a
                href="tel:+916282018754"
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#00C7A0] to-[#0088A9] text-white py-4 rounded-xl font-bold text-xs uppercase tracking-wider hover:opacity-95 shadow-md shadow-[#00C7A0]/25 transition-all text-center"
              >
                <Phone className="w-4 h-4" />
                Call Clinic
              </a>
              <a
                href="https://wa.me/916282018754?text=Hello%20Chiro%20Care%20Clinic,%20I'd%20like%20to%20schedule%20an%20appointment."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-[#25D366] text-white py-4 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-[#20ba56] shadow-md shadow-[#25D366]/25 transition-all text-center"
              >
                <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
                  <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 512l148.4-38.9c32.4 17.7 68.9 27 105.8 27 122.4 0 222-99.6 222-222 0-59.3-23-115.1-65.3-157c-1.3-1.3-1.3-1.3-2.6-2.6zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
                </svg>
                WhatsApp
              </a>
            </div>
          </div>

          {/* Form and Map Section */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            <div className="bg-[#EEF8F6] p-8 md:p-10 rounded-[2.5rem] border border-[#00C7A0]/10 shadow-lg relative">
              <h3 className="font-serif text-2xl font-black text-[#17332E] mb-6">
                Appointment Reservation
              </h3>
              
              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.form
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleFormSubmit}
                    className="flex flex-col gap-4 text-[#17332E]"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name */}
                      <div className="flex flex-col">
                        <input
                          type="text"
                          name="name"
                          placeholder="Your Full Name *"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="bg-white px-4 py-3.5 rounded-xl text-xs font-semibold w-full border border-white"
                        />
                        {errors.name && (
                          <span className="text-[10px] text-red-700 mt-1 font-bold">
                            {errors.name}
                          </span>
                        )}
                      </div>

                      {/* Phone */}
                      <div className="flex flex-col">
                        <input
                          type="text"
                          name="phone"
                          placeholder="Phone Number *"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="bg-white px-4 py-3.5 rounded-xl text-xs font-semibold w-full border border-white"
                        />
                        {errors.phone && (
                          <span className="text-[10px] text-red-700 mt-1 font-bold">
                            {errors.phone}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Email */}
                      <div className="flex flex-col">
                        <input
                          type="email"
                          name="email"
                          placeholder="Email Address *"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="bg-white px-4 py-3.5 rounded-xl text-xs font-semibold w-full border border-white"
                        />
                        {errors.email && (
                          <span className="text-[10px] text-red-700 mt-1 font-bold">
                            {errors.email}
                          </span>
                        )}
                      </div>

                      {/* Preferred Date */}
                      <div className="flex flex-col">
                        <input
                          type="date"
                          name="date"
                          value={formData.date}
                          onChange={handleInputChange}
                          className="bg-white px-4 py-3.5 rounded-xl text-xs font-semibold w-full text-[#17332E]/80 border border-white"
                        />
                        {errors.date && (
                          <span className="text-[10px] text-red-700 mt-1 font-bold">
                            {errors.date}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Service Required */}
                    <div className="flex flex-col">
                      <select
                        name="service"
                        value={formData.service}
                        onChange={handleInputChange}
                        className="bg-white px-4 py-3.5 rounded-xl text-xs font-semibold w-full text-[#17332E]/80 border border-white"
                      >
                        <option value="">Select Treatment Required *</option>
                        {services.map((serv) => (
                          <option key={serv.id} value={serv.title}>
                            {serv.title}
                          </option>
                        ))}
                      </select>
                      {errors.service && (
                        <span className="text-[10px] text-red-700 mt-1 font-bold">
                          {errors.service}
                        </span>
                      )}
                    </div>

                    {/* Message */}
                    <textarea
                      name="message"
                      rows="4"
                      placeholder="Brief description of symptoms or request details (optional)"
                      value={formData.message}
                      onChange={handleInputChange}
                      className="bg-white px-4 py-3.5 rounded-xl text-xs font-semibold w-full border border-white"
                    />

                    <button
                      type="submit"
                      className="w-full py-4 bg-gradient-to-r from-[#00C7A0] to-[#0088A9] text-white font-bold text-xs rounded-xl shadow-lg transition-all uppercase tracking-widest mt-2 border border-white/20"
                    >
                      Request Appointment
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center text-center py-12"
                  >
                    <CheckCircle2 className="w-16 h-16 text-[#00C7A0] mb-4 animate-bounce" />
                    <h3 className="font-serif text-2xl font-black text-[#17332E] mb-2">
                      Request Confirmed!
                    </h3>
                    <p className="text-xs md:text-sm text-[#17332E]/70 max-w-sm leading-relaxed font-semibold">
                      Thank you for contacting Chiro Care. A representative will contact you shortly on your provided number to finalize your scheduled time.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Map wrapper */}
            <div className="rounded-[2.5rem] overflow-hidden border border-[#00C7A0]/15 relative h-64 bg-[#EEF8F6] flex items-center justify-center shadow-lg">
              <div className="absolute inset-0 bg-cover bg-center opacity-65" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=800')" }} />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0088A9]/20 to-transparent pointer-events-none" />
              <div className="relative glass-card border border-white/60 p-6 rounded-2xl flex flex-col items-center gap-2 text-center max-w-xs shadow-md">
                <MapPin className="w-7 h-7 text-[#0088A9]" />
                <h4 className="font-serif font-black text-[#17332E] text-sm">Interactive Map Location</h4>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Metro+Pillar+567%2C+Banerji+Rd%2C+Kaloor%2C+Ernakulam%2C+Kochi%2C+Kerala+682017"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-r from-[#00C7A0] to-[#0088A9] text-white px-5 py-2.5 rounded-full text-[10px] font-bold transition-all mt-2"
                >
                  Get Directions in Google Maps
                </a>
              </div>
            </div>

          </div>

        </div>
      </section>
    </>
  );
};

export default Contact;
