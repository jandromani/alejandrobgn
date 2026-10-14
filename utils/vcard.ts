import { CONTACT_EMAIL, WHATSAPP_NUMBER } from "./contact"

export interface ContactInfo {
  firstName: string
  lastName: string
  fullName: string
  email: string
  phone?: string
  website: string
  title: string
  note?: string
}

export function generateVCard(contact: ContactInfo): string {
  const vcard = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `FN:${contact.fullName}`,
    `N:${contact.lastName};${contact.firstName};;;`,
    `EMAIL;TYPE=INTERNET:${contact.email}`,
    contact.phone ? `TEL;TYPE=CELL:${contact.phone}` : "",
    `URL:${contact.website}`,
    `TITLE:${contact.title}`,
    contact.note ? `NOTE:${contact.note}` : "",
    "END:VCARD",
  ]
    .filter(Boolean)
    .join("\r\n")

  return vcard
}

export function downloadVCard(contact: ContactInfo) {
  const vcard = generateVCard(contact)
  const blob = new Blob([vcard], { type: "text/vcard;charset=utf-8" })
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = `${contact.firstName}_${contact.lastName}.vcf`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

// Alejandro's contact details
export const ALEJANDRO_CONTACT: ContactInfo = {
  firstName: "Alejandro",
  lastName: "Baratas Garcia-Nieto",
  fullName: "Alejandro Baratas Garcia-Nieto",
  email: CONTACT_EMAIL,
  phone: WHATSAPP_NUMBER,
  website: "https://alejandrobgn.vercel.app",
  title: "AI Systems Architect & Tech Lead",
  note: "AI Systems Architect & Tech Lead | Agentic systems, AI governance, and observability for enterprise AI platforms.",
}
