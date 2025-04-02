import { ContactForm } from "@/components/contact-form"

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Contact Me</h1>

      <div className="max-w-2xl mx-auto">
        <p className="text-center text-muted-foreground mb-8">
          Have a project in mind or want to discuss a photography session? Fill out the form below and I'll get back to
          you as soon as possible.
        </p>

        <ContactForm />
      </div>
    </div>
  )
}

