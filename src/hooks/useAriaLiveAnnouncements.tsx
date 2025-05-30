import { useState } from "react"

export function useAriaLiveAnnouncements() {
  const [message, setMessage] = useState<string>("")

  const LiveRegion = (
    <div
      aria-live="assertive"
      className="sr-only"
      aria-atomic="true"
      key={Date.now()}
    >
      {message}
    </div>
  )

  return { setMessage, LiveRegion }
}
