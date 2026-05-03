import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold tracking-tight mb-8 text-center">Contact Us</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
          <div>
            <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>
            <p className="text-muted-foreground mb-8">
              Have questions about your order or our platform? Our support team is here to help you.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <MapPin className="text-primary w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-medium">Headquarters</h3>
                  <p className="text-muted-foreground text-sm">123 Food Street, Culinary District<br/>Dhaka 1212, Bangladesh</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Phone className="text-primary w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-medium">Phone Support</h3>
                  <p className="text-muted-foreground text-sm">+880 1234 567 890</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Mail className="text-primary w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-medium">Email Us</h3>
                  <p className="text-muted-foreground text-sm">support@foodhub.com</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Clock className="text-primary w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-medium">Working Hours</h3>
                  <p className="text-muted-foreground text-sm">Everyday: 9:00 AM - 11:00 PM</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-muted/50 p-8 rounded-lg">
            <h2 className="text-2xl font-semibold mb-6">Send a Message</h2>
            <form className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">Your Name</label>
                <input 
                  id="name"
                  type="text" 
                  className="w-full p-2.5 rounded-md border border-input bg-background text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">Email Address</label>
                <input 
                  id="email"
                  type="email" 
                  className="w-full p-2.5 rounded-md border border-input bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  placeholder="john@example.com"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">Message</label>
                <textarea 
                  id="message"
                  rows={4}
                  className="w-full p-2.5 rounded-md border border-input bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  placeholder="How can we help you?"
                />
              </div>
              <button 
                type="button" 
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 rounded-md font-medium transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
