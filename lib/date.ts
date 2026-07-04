export function formatDateLongPortuguese(value?: string | number | Date): string {
  if (!value) {
    return formatDateLongPortuguese(new Date())
  }

  const parsedDate = parseDateValue(value)
  if (!parsedDate) {
    return typeof value === "string" ? value : new Date().toLocaleDateString("pt-PT")
  }

  const formatted = parsedDate.toLocaleDateString("pt-PT", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })

  return formatted.replace(/(^\d+ de )(.+)( de \d{4}$)/, (_match, prefix, month, suffix) => {
    return `${prefix}${month.charAt(0).toUpperCase()}${month.slice(1)}${suffix}`
  })
}

function parseDateValue(value: string | number | Date): Date | null {
  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? null : value
  }

  if (typeof value === "number") {
    const date = new Date(value)
    return Number.isNaN(date.getTime()) ? null : date
  }

  const trimmed = value.trim()

  if (/^\d{2}\/\d{2}\/\d{4}$/.test(trimmed)) {
    const [day, month, year] = trimmed.split("/").map(Number)
    const parsed = new Date(year, month - 1, day)
    return Number.isNaN(parsed.getTime()) ? null : parsed
  }

  const parsed = new Date(trimmed)
  return Number.isNaN(parsed.getTime()) ? null : parsed
}
