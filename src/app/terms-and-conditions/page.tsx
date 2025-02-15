export default function TermsPage() {
    return (
      <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Terms & Conditions</h1>
          
          <div className="space-y-6">
            <section>
              <h2 className="text-2xl font-semibold mb-4">Enrollment Agreement</h2>
              <p className="mb-4">
                By enrolling in the Basal Implants Masterclass, you agree to participate fully in the course 
                and complete all required modules. Payment must be made in full prior to accessing course materials.
              </p>
            </section>
  
            <section>
              <h2 className="text-2xl font-semibold mb-4">Intellectual Property</h2>
              <p className="mb-4">
                All course materials, including videos, presentations, and documents, are the exclusive property 
                of [Your Organization Name]. Unauthorized distribution or reproduction is strictly prohibited.
              </p>
            </section>
  
            <section>
              <h2 className="text-2xl font-semibold mb-4">Refund Policy</h2>
              <p className="mb-4">
                Full refunds will be granted if requested within 24 hours of purchase. No refunds will be issued 
                after course materials have been accessed.
              </p>
            </section>
  
            <section>
              <h2 className="text-2xl font-semibold mb-4">Professional Conduct</h2>
              <p className="mb-4">
                Participants agree to maintain professional decorum in all interactions. The instructors reserve 
                the right to remove any participant for disruptive behavior without refund.
              </p>
            </section>
  
            <section>
              <h2 className="text-2xl font-semibold mb-4">Liability</h2>
              <p className="mb-4">
                While the course provides theoretical and practical knowledge, the instructors are not liable 
                for clinical outcomes resulting from the application of techniques learned in this masterclass.
              </p>
            </section>
          </div>
        </div>
      </div>
    );
  }