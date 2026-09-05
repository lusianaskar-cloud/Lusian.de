# Booking and availability

Lusian owns the booking interface. A scheduling provider owns the truth about
time. Nothing about availability is invented, and no booking is ever reported
that did not happen.

## Shape

```
src/lib/scheduling/
  types.ts          the contract: Slot, ConsultationType, AvailabilityResult, BookingResult
  consultations.ts  the conversations offered (no prices)
  provider.ts       resolves the configured backend, or null
  calcom.ts         Cal.com adapter
  demo.ts           synthetic availability, development only
src/app/api/scheduling/
  availability/     GET  — live, never cached
  book/             POST — validated, honeypotted
```

`getSchedulingProvider()` returning **null** is a first-class state, not an
error. The interface renders completely, says plainly that scheduling is not
connected, and offers to take a written enquiry instead.

## Environment

| Variable | Purpose |
|---|---|
| `SCHEDULING_PROVIDER` | `calcom`, `demo`, or unset. Unset means no booking. |
| `CALCOM_API_KEY` | Cal.com API key. Required for `calcom`. |
| `SCHEDULING_EVENT_AVIATION_INITIAL` | Cal.com event type id for that conversation |
| `SCHEDULING_EVENT_AVIATION_PROJECT` | ” |
| `SCHEDULING_EVENT_PRIVATE_INITIAL` | ” |
| `SCHEDULING_EVENT_PRIVATE_RELOCATION` | ” |
| `CALCOM_API_BASE` | Optional. Defaults to `https://api.cal.com/v2`. |
| `CALCOM_SLOTS_API_VERSION` | Optional. Pins the slots API version header. |
| `CALCOM_BOOKINGS_API_VERSION` | Optional. Pins the bookings API version header. |
| `CALCOM_BOOKING_MANAGE_BASE` | Optional. Base URL for reschedule/cancel links. |

A conversation whose event-type variable is missing reports `not_configured`
for that conversation alone — the rest of the interface keeps working.

> **TODO(client): verify the Cal.com request and response shape against the API
> version you enable.** The adapter parses tolerantly and the version headers
> are configurable so they can be pinned without a code change, but a version
> change can still move fields.

## The demo provider

`SCHEDULING_PROVIDER=demo` produces synthetic availability so the interface can
be reviewed end to end. `getSchedulingProvider()` refuses to return it when
`NODE_ENV` is production, so it cannot reach a live site through configuration.
It exists because the alternative — hard-coding placeholder slots into the UI —
is exactly the trap of showing people times that do not exist.

```bash
SCHEDULING_PROVIDER=demo npm run dev
```

Its `createBooking` reports `confirmationEmailSent: false`, so the confirmation
screen does not claim an email was sent.

## Timezones

The visitor's zone is detected and shown, and can be changed from a curated
list covering Lusian's realistic client base. Every slot is an ISO instant with
an offset; grouping into days uses `Intl.DateTimeFormat` in the selected zone,
never local arithmetic.

## Confirmation

The confirmation screen states only what the provider reported: the reference,
the instant, the zone, and — if and only if the provider says so — that a
confirmation email is on its way. If the provider gives a management URL, a
reschedule link is shown. Otherwise the reference is presented as the way to
change the time.
