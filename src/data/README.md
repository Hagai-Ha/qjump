# Medical Clinic Synthetic Dataset

This directory contains synthetically generated data representing a medical clinic's user registration system and appointment schedules. It consists of two relational tables saved in standard CSV format.

## Dataset Overview

### 1. `users.csv`
Contains unique demographic information for registered clinic patients. 
* **Total Records:** 10,000 patients.
* **Key Characteristics:**
    * **Geographic Focus:** Restricted entirely to Israeli names and regional city hubs.
    * **Age Profile:** Adult population only (Ages 18 to 90 relative to the generation benchmark date of July 2026).
    * **Uniqueness Rules:** Every record features a unique 9-digit `patientId` (Primary Key) and a unique, deterministic email address formulated from the patient's name.

**Columns:**
* `patientId`: Unique 9-digit identification string (Primary Key).
* `firstName` / `middleName` / `lastName`: Patient name components (Middle names are mostly `null`).
* `dateOfBirth`: Patient birthday formatted as `YYYY-MM-DD`.
* `email`: Unique email address using realistic Israeli enterprise or commercial domains (`gmail.com`, `walla.co.il`, etc.).
* `phone`: Simulated cell phone number (`05X-XXXXXXX`).
* `address`: The patient's city of residence.

---

### 2. `appointments.csv`
Contains the complete matrix of operational time slots across all clinical facilities over a 3-month operational window.
* **Total Records:** 28,020 time slots.
* **Key Characteristics:**
    * **Timeframe Constraints:** Valid from **2026-07-09** through **2026-10-09**.
    * **Operating Hours:** 15-minute intervals between `07:00` and `16:15` on Sunday through Thursday. 
    * **Weekend/Shifts:** Clinics are fully closed on **Saturdays**. On **Fridays**, operating hours are shortened, ending early at `12:00`.
    * **Relational Integrity:** Appointments are assigned strictly to patients living within that specific location's city. Every patient has between 1 and 5 total appointments. Exactly 1% of the total slots are intentionally left unassigned (`null`) to simulate open availability or cancellations.

**Columns:**
* `appointmentId`: Unique 12-digit identification string (Primary Key).
* `date`: Date of the appointment (`YYYY-MM-DD`).
* `time`: Time of the appointment (`HH:MM`).
* `location`: The city clinic where the appointment takes place.
* `patientId`: Foreign key mapping back to `users.csv`. A blank/empty value indicates an unassigned, available slot.

---

## Relationship & Schema Map

| USERS Table (Primary) | Relationship | APPOINTMENTS Table (Foreign) | Validation Rule |
| :--- | :---: | :--- | :--- |
| `patientId` (PK) | ── 1-to-Many ──► | `patientId` (FK) | Can be blank (1% unassigned) |
| `address` | ────────────────► | `location` | Must match exactly (Same City) |
---

## Important Notice

> ⚠️ **Disclaimer:** This dataset is **synthetic data meant for education and demonstration purposes only**. All names, phone numbers, email addresses, and schedule combinations are programmatically generated using random distributions. Any resemblance to real individuals, active email accounts, or actual medical records is entirely coincidental.