export const WHATSAPP_NUMBER = "34685432669"
export const CONTACT_EMAIL = "alejandrobgn@gmail.com"

export const trackEvent = (action: string, category: string) => {
  // Synchronous tracking with sendBeacon
  if (typeof navigator !== "undefined" && navigator.sendBeacon) {
    navigator.sendBeacon(
      "/api/track",
      JSON.stringify({
        event: action,
        category: category,
        timestamp: Date.now(),
      }),
    )
  }
}

export const openEmailClient = () => {
  const subject = encodeURIComponent("30-minute session")
  window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}`
  trackEvent("email_click", "contact")
}

export const openGmail = () => {
  trackEvent("gmail_click", "contact")
  const subject = encodeURIComponent("30-minute session")
  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(CONTACT_EMAIL)}&su=${subject}`
  window.open(gmailUrl, "_blank", "noopener,noreferrer")
}

export const openWhatsApp = () => {
  const message = encodeURIComponent("Hi Alejandro, I'd like to discuss a project with you.")
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`
  window.open(whatsappUrl, "_blank", "noopener,noreferrer")
  trackEvent("whatsapp_click", "contact")
}

export const openCalendlyExternal = () => {
  window.open("https://calendly.com/alejandrobgn/30min", "_blank", "noopener,noreferrer")
  trackEvent("calendly_open_external", "contact")
}
