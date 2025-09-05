from fastapi import APIRouter, HTTPException, status

router = APIRouter(prefix="/api/v1/appointments", tags=["Appointments"])


@router.post("/", status_code=status.HTTP_201_CREATED)
def create_appointment(payload: dict):
    # TODO: Add logic to create an appointment
    return {"message": "Appointment created"}


@router.get("/")
def list_appointments():
    # TODO: Add logic to list all appointments
    return {"message": "List of appointments"}


@router.get("/{appointment_id}")
def get_appointment(appointment_id: int):
    # TODO: Add logic to get a specific appointment
    return {"message": f"Appointment with ID {appointment_id}"}


@router.put("/{appointment_id}")
def update_appointment(appointment_id: int, payload: dict):
    # TODO: Add logic to update an appointment
    return {"message": f"Appointment {appointment_id} updated"}


@router.delete("/{appointment_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_appointment(appointment_id: int):
    # TODO: Add logic to delete an appointment
    return {"message": f"Appointment {appointment_id} deleted"}
